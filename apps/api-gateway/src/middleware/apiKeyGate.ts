import type { Request, Response, NextFunction } from "express";
import { prisma } from "@repo/db";
import crypto from "crypto";

declare global {
  namespace Express {
    interface Request {
      apiKey?: {
        id: number;
        userId: number;
        name: string;
        rateLimitRPM: number;
        rateLimitTPM: number;
        budgetLimit?: bigint | null;
        creditsUsed: bigint;
        isActive: boolean;
      };
      user?: {
        id: number;
        clerkUserId: string;
      };
    }
  }
}

export async function apiKeyGate(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("[API Key Gate] Missing or invalid auth header:", authHeader?.substring(0, 20));
      res.status(401).json({
        error: {
          message: "Missing or invalid authorization header",
          type: "invalid_request_error",
          code: "invalid_api_key",
        },
      });
      return;
    }

    const token = authHeader.slice(7).trim(); // Remove "Bearer " prefix
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    console.log("[API Key Gate] Looking for key hash:", tokenHash.substring(0, 16) + "...");

    // Find the API key in database
    const apiKey = await prisma.platformUserApiKey.findUnique({
      where: { keyHash: tokenHash },
      include: { user: true },
    });

    if (!apiKey) {
      console.log("[API Key Gate] No API key found for hash");
      res.status(401).json({
        error: {
          message: "Invalid API key",
          type: "invalid_request_error",
          code: "invalid_api_key",
        },
      });
      return;
    }

    console.log("[API Key Gate] Found API key:", apiKey.name, "for user:", apiKey.user.clerkUserId);

    if (!apiKey.isActive) {
      console.log("[API Key Gate] API key is inactive");
      res.status(401).json({
        error: {
          message: "API key is inactive",
          type: "invalid_request_error",
          code: "invalid_api_key",
        },
      });
      return;
    }

    // Update last used timestamp
    await prisma.platformUserApiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    });

    console.log("[API Key Gate] ✓ Authentication successful");

    // Attach API key and user info to request
    req.apiKey = {
      id: apiKey.id,
      userId: apiKey.userId,
      name: apiKey.name,
      rateLimitRPM: apiKey.rateLimitRPM,
      rateLimitTPM: apiKey.rateLimitTPM,
      budgetLimit: apiKey.budgetLimit,
      creditsUsed: apiKey.creditsUsed,
      isActive: apiKey.isActive,
    };

    req.user = {
      id: apiKey.user.id,
      clerkUserId: apiKey.user.clerkUserId,
    };

    next();
  } catch (error) {
    console.error("[API Key Gate] Error:", error);
    res.status(500).json({
      error: {
        message: "Internal server error",
        type: "server_error",
      },
    });
  }
}
