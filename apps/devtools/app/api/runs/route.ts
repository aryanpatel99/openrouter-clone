import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { TelemetryData } from "@/lib/telemetry";

const GATEWAY_CWD = process.env.GATEWAY_CWD || path.resolve(process.cwd(), "../../apps/api-gateway");
const FILE_PATH = path.join(GATEWAY_CWD, ".devtools", "generations.json");

export async function GET() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return NextResponse.json({ runs: [] } satisfies TelemetryData);
    }

    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    const data: TelemetryData = JSON.parse(raw);

    // Return runs in reverse chronological order
    data.runs.reverse();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ runs: [] } satisfies TelemetryData);
  }
}
