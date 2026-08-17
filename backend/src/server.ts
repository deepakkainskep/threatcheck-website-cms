import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";

connectDatabase()
  .then(() =>
    app.listen(env.port, "0.0.0.0", () =>
      console.log(`ThreatCheck API running on http://0.0.0.0:${env.port}`),
    ),
  )
  .catch((err) => {
    console.error("Startup failed", err.message);
    process.exit(1);
  });
