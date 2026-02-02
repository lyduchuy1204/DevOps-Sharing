import cors from "cors";
import express from "express";
import os from "node:os";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { buildHelloMessage } from "@repo/shared";

import { openapiSpec } from "./openapi.js";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJSDoc({ definition: openapiSpec, apis: [] });
app.get("/api/openapi.json", (_req, res) => res.status(200).json(swaggerSpec));
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      url: "/api/openapi.json"
    }
  })
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/hello", (req, res) => {
  const name = typeof req.query?.name === "string" ? req.query.name : "world";

  res.status(200).json({
    message: buildHelloMessage(name),
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/hello", (req, res) => {
  const name = typeof req.body?.name === "string" ? req.body.name : "world";

  res.status(200).json({
    message: buildHelloMessage(name),
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/info", (_req, res) => {
  res.status(200).json({
    service: "backend",
    node: process.version,
    hostname: os.hostname(),
    platform: process.platform,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/add", (req, res) => {
  const a = Number(req.query?.a);
  const b = Number(req.query?.b);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).json({ error: "Invalid query. Use numbers: /api/add?a=1&b=2" });
  }

  return res.status(200).json({ a, b, sum: a + b });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const port = Number.parseInt(process.env.PORT ?? "3001", 10);
app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});
