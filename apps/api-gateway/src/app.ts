import "dotenv/config";
import express, { type Request, type Response } from "express";
import { llmRouter } from "./router/llm-router.ts";
import type { NormalizedChatRequest } from "@repo/types";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Test Gateway running at http://localhost:${PORT}`);
  console.log(`Test endpoint: POST http://localhost:${PORT}/chat/completions`);
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
  },
);
