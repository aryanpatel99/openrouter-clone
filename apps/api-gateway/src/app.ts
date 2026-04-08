import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import { llmRouter } from "./router/llm-router.ts";
import type { NormalizedChatRequest } from "@repo/types";

class ApiGateway {
  private app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3001;

    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.post("/chat/completions", this.handleChatCompletions);
  }

  private handleChatCompletions = async (
    req: Request,
    res: Response,
  ): Promise<any> => {
    const authorization = req.headers["authorization"];

    const normalized: NormalizedChatRequest = {
      model_slug: ["google/gemini-3.1-pro", "google/gemini-2.5-pro", "google/gemini-2.5-flash"],
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

    console.log("normalized:", normalized);

    const response = await llmRouter.callLlm(normalized);

    console.log("response from llm router:");
    console.log(response);
    res.json(response);
  };

  start(): void {
    this.app.listen(this.port, () => {
      console.log(`API Gateway running at http://localhost:${this.port}`);
      console.log(`POST http://localhost:${this.port}/chat/completions`);
    });
  }
}

const gateway = new ApiGateway();
gateway.start();
