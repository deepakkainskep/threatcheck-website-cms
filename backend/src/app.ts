import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";
const clean = (v: any): any =>
  Array.isArray(v)
    ? v.map(clean)
    : v && typeof v === "object"
      ? Object.fromEntries(
          Object.entries(v)
            .filter(([k]) => !k.startsWith("$") && !k.includes("."))
            .map(([k, val]) => [k, clean(val)]),
        )
      : v;
export const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: [env.cmsUrl, env.publicUrl], credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use((req, res, next) => {
  req.body = clean(req.body);
  next();
});
app.use(apiLimiter);
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.get("/health", (req, res) =>
  res.json({ success: true, data: { status: "ok" } }),
);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), env.uploadDir), {
    fallthrough: false,
  }),
);
app.use("/assets", (req, res) =>
  res.status(404).json({
    success: false,
    message:
      "Legacy static asset not found. Images have been migrated to cloud storage.",
  }),
);
app.use("/api/v1", routes);
app.use(notFound);
app.use(errorHandler);
