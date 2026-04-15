import "dotenv/config";
// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";

// BigInt JSON serialization fix
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use("/api/webhooks", express.raw({ type: "application/json" }));
app.use(express.json());

// Health check
app.get("/health", (_req: any, res: any) => {
  res.json({ status: "ok", service: "primary-backend" });
});

import { router } from "./routes/index.ts";
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Primary Backend running at http://localhost:${PORT}`);
});

export default app;
