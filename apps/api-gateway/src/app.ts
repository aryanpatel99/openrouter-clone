import "dotenv/config";
import express, { type Request, type Response } from "express";
import { llmRouter } from "./llmrouter.ts";
import fs from "fs";
import path from "path";
import { addClient, removeClient } from "../devtools/emitter.ts";
import { runLLM } from "../devtools/trace.ts";
import { boolean } from "zod";
import { NormalizedChatRequest } from "../types/model_data.ts";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ensure folder exists
const dir = path.join(process.cwd(), ".devtools");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Serve DevTools UI
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders?.();

  addClient(res);

  req.on("close", () => {
    removeClient(res);
  });
});

// trigger LLM
app.get("/run", async (req, res) => {
  await runLLM({
    model: "fake-model",
    input: "hello",
    stream: false,
  });

  res.send("LLM executed");
});

app.listen(PORT, () => {
  console.log(`Test Gateway running at http://localhost:${PORT}`);
  console.log(`Test endpoint: POST http://localhost:${PORT}/chat/completions`);
  console.log(`SSE devtools endpoint: http://localhost:${PORT}/events`);
  console.log(`Trigger test flow: GET http://localhost:${PORT}/run`);
});

//  we need to change the shape of the request body :
//  we also need to add  image & video.

app.post(
  "/chat/completions",
  async (req: Request, res: Response): Promise<any> => {
    const authorization = req.headers["authorization"]; // e.g., Bearer gateway-sk-12345

    const normalized: NormalizedChatRequest = {
      model_slug: ["google/gemini-3.1-pro","google/gemini-2.5-pro", "google/gemini-2.5-flash"],
      messages: [
        { role: "system", content: "You are a helpful AI." },
        { role: "user", content: "capital of India" },
      ],

      temperature: 0.7,
      retry: 2,

      provider: "cheap",
      streaming: true,

      preset: false,
      message_transform: true,
    };
    console.log("normalized:",normalized)

    const response = await llmRouter.callLlm(normalized);

    console.log("response from llm router:");
    console.log(response);
    res.json(response);
    //   console.log("model provider speed map:", modelProviderSpeedMap);
  },
);
