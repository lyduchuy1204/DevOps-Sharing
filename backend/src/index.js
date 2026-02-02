import cors from "cors";
import express from "express";
import os from "node:os";
import { buildHelloMessage } from "@repo/shared";

const app = express();

app.use(cors());
app.use(express.json());

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

app.use((_req, res) => {
  res.status(404).json({ error: "Not Found" });
});

const port = Number.parseInt(process.env.PORT ?? "3001", 10);
app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});
