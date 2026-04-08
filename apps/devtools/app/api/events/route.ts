import { NextResponse } from "next/server";

const encoder = new TextEncoder();

// Store connected SSE clients
const clients = new Set<ReadableStreamDefaultController>();

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);

      // Send initial connection event
      const msg = `data: ${JSON.stringify({ type: "connected" })}\n\n`;
      controller.enqueue(encoder.encode(msg));
    },
    cancel(controller) {
      clients.delete(controller);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

// Called by notify POST — broadcast to all SSE clients
export function broadcastUpdate() {
  const message = `data: ${JSON.stringify({ type: "update", timestamp: Date.now() })}\n\n`;
  const encoded = encoder.encode(message);
  for (const controller of clients) {
    try {
      controller.enqueue(encoded);
    } catch {
      clients.delete(controller);
    }
  }
}


