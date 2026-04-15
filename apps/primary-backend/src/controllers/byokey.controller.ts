// @ts-ignore
import { Request, Response } from "express";
// @ts-ignore
import { prisma } from "@repo/db";

export const byoKeyController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, providerId, encryptedKey } = req.body;

      const byoKey = await prisma.userProviderKey.create({
        data: { userId, providerId, encryptedKey },
      });
      
      res.status(201).json(byoKey);
    } catch (error) {
      console.error("[create ByoKey Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
