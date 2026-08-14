import { app } from "./app.js";import{connectDatabase}from"./config/database.js";import{env}from"./config/env.js";
connectDatabase().then(()=>app.listen(env.port,()=>console.log(`ThreatCheck API running on http://localhost:${env.port}`))).catch(err=>{console.error("Startup failed",err.message);process.exit(1)});
