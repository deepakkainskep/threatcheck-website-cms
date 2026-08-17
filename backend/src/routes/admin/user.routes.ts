import { Router } from "express";
import { User } from "../../models/User.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { userCreate } from "../../validators/schemas.js";
import { hashPassword } from "../../utils/password.js";
import { ok, created } from "../../utils/response.js";
import { AppError } from "../../middlewares/error.middleware.js";
import { audit } from "../../services/auditLog.service.js";
const r = Router();
r.get("/", async (req, res) =>
  ok(res, await User.find().select("-passwordHash -refreshTokenHash")),
);
r.post("/", validate(userCreate), async (req, res, next) => {
  try {
    const data = await User.create({
      ...req.body,
      passwordHash: await hashPassword(req.body.password),
    });
    await audit(req, "created user", "user", String(data._id));
    created(res, {
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      disabled: data.disabled,
    });
  } catch (e: any) {
    next(e.code === 11000 ? new AppError(409, "Email already exists") : e);
  }
});
r.put("/:id", async (req, res, next) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) throw new AppError(404, "Not found");
    if (target.role === "SUPERADMIN" && req.body.disabled)
      throw new AppError(403, "Cannot disable SUPERADMIN");
    const patch: any = { ...req.body };
    delete patch.password;
    if (req.body.password)
      patch.passwordHash = await hashPassword(req.body.password);
    const data = await User.findByIdAndUpdate(req.params.id, patch, {
      returnDocument: "after",
    }).select("-passwordHash -refreshTokenHash");
    await audit(req, "updated user", "user", req.params.id);
    ok(res, data);
  } catch (e) {
    next(e);
  }
});
r.delete("/:id", async (req, res, next) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) throw new AppError(404, "Not found");
    if (target.role === "SUPERADMIN")
      throw new AppError(403, "Cannot delete SUPERADMIN");
    await target.deleteOne();
    await audit(req, "deleted user", "user", req.params.id);
    ok(res, { deleted: true });
  } catch (e) {
    next(e);
  }
});
export default r;
