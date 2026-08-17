import { Router } from "express";
import auth from "./auth.routes.js";
import users from "./admin/user.routes.js";
import media from "./admin/media.routes.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { adminRoutes, publicRoutes, publicFormRoutes } from "./crudFactory.js";
import { Blog } from "../models/Blog.js";
import { Insight } from "../models/Insight.js";
import { CaseStudy } from "../models/CaseStudy.js";
import { Resource } from "../models/Resource.js";
import { Integration } from "../models/Integration.js";
import { Framework } from "../models/Framework.js";
import { DemoRequest } from "../models/DemoRequest.js";
import { ContactSubmission } from "../models/ContactSubmission.js";
import {
  blogLike,
  caseStudy,
  resource,
  taxonomy,
  demoRequest,
  contactSubmission,
} from "../validators/schemas.js";
const r = Router();
r.use("/auth", auth);
r.use("/public/blogs", publicRoutes(Blog));
r.use("/public/insights", publicRoutes(Insight));
r.use("/public/case-studies", publicRoutes(CaseStudy));
r.use("/public/resources", publicRoutes(Resource));
r.use("/public/integrations", publicRoutes(Integration));
r.use("/public/frameworks", publicRoutes(Framework));
r.use("/public/demo-requests", publicFormRoutes(DemoRequest, demoRequest));
r.use(
  "/public/contacts",
  publicFormRoutes(ContactSubmission, contactSubmission),
);
r.use("/admin", requireAuth, requireRole("ADMIN", "SUPERADMIN"));
r.use("/admin/blogs", adminRoutes(Blog, "blog", blogLike));
r.use("/admin/insights", adminRoutes(Insight, "insight", blogLike));
r.use("/admin/case-studies", adminRoutes(CaseStudy, "caseStudy", caseStudy));
r.use("/admin/resources", adminRoutes(Resource, "resource", resource));
r.use("/admin/integrations", adminRoutes(Integration, "integration", taxonomy));
r.use("/admin/frameworks", adminRoutes(Framework, "framework", taxonomy));
r.use(
  "/admin/demo-requests",
  adminRoutes(DemoRequest, "demoRequest", demoRequest),
);
r.use(
  "/admin/contacts",
  adminRoutes(ContactSubmission, "contactSubmission", contactSubmission),
);
r.use("/admin/media", media);
r.use("/admin/users", requireRole("SUPERADMIN"), users);
export default r;
