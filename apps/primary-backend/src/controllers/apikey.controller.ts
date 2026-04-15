// @ts-ignore
import { Request, Response } from "express";
// @ts-ignore
import { prisma } from "@repo/db";
import crypto from "crypto";

export const apiKeyController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, name, rateLimitRPM = 60, rateLimitTPM = 10000, budgetLimit } = req.body;
      
      const keyHash = crypto.randomUUID(); // Basic implementation placeholder

      const apiKey = await prisma.platformUserApiKey.create({
        data: { 
          userId, 
          keyHash, 
          name, 
          rateLimitRPM, 
          rateLimitTPM, 
          budgetLimit 
        },
      });
      res.status(201).json(apiKey);
    } catch (error) {
      console.error("[create ApiKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
