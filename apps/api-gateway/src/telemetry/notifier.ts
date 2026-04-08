const DEVTOOLS_URL = process.env.DEVTOOLS_URL || "http://localhost:4983";

export async function notifyDevtools(): Promise<void> {
  try {
    await fetch(`${DEVTOOLS_URL}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: Date.now() }),
      signal: AbortSignal.timeout(1000),
    });
  } catch {
    // DevTools server might not be running — silently ignore
  }
}
