// @ts-ignore
import { Request, Response } from "express";
// @ts-ignore
import { prisma } from "@repo/db";
import { toMicros } from "@repo/utils";

export const userController = {
  // Get all users
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      console.error("[getAll Users Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Create or sync a user
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { clerkUserId } = req.body;

      if (!clerkUserId) {
        res.status(400).json({ error: "clerkUserId is required" });
        return;
      }

      // We use upsert so that if the user already exists, it just returns them
      const user = await prisma.user.upsert({
        where: { clerkUserId },
        update: {},
        create: { clerkUserId },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error("[create User Error]", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update user data (e.g., credits)
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { credits } = req.body;

      const clerkUserId = Array.isArray(id) ? id[0] : id;

      if (credits === undefined) {
        res.status(400).json({ error: "Nothing to update. Provide credits." });
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { clerkUserId },
        data: { credits: toMicros(credits) },
      });

      res.json(updatedUser);
    } catch (error: any) {
      console.error("[update User Error]", error);
      if (error.code === 'P2025') {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
