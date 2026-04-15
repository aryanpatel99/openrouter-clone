// @ts-ignore
import { Router } from "express";
import { 
  userController, 
  apiKeyController, 
  byoKeyController,
  webhookController
} from "../controllers/index.ts";

export const router = Router();

// User Core
router.get("/users", userController.getAll);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);

// Entity Creation Endpoints
router.post("/apikeys", apiKeyController.create);
router.post("/byokeys", byoKeyController.create);

// Clerk Webhook
router.post("/webhooks/clerk", webhookController.handleClerkWebhook);
