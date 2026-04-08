import fs from "fs";
import path from "path";
import type { TelemetryData, Run } from "./types.ts";

const DEVTOOLS_DIR = path.join(process.cwd(), ".devtools");
const FILE_PATH = path.join(DEVTOOLS_DIR, "generations.json");

function ensureDir(): void {
  if (!fs.existsSync(DEVTOOLS_DIR)) {
    fs.mkdirSync(DEVTOOLS_DIR, { recursive: true });
  }
}

export function readTelemetry(): TelemetryData {
  ensureDir();
  if (!fs.existsSync(FILE_PATH)) {
    return { runs: [] };
  }

  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(raw) as TelemetryData;
  } catch {
    return { runs: [] };
  }
}

export function writeTelemetry(data: TelemetryData): void {
  ensureDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function saveRun(run: Run): void {
  const data = readTelemetry();

  const idx = data.runs.findIndex((r) => r.id === run.id);
  if (idx >= 0) {
    data.runs[idx] = run;
  } else {
    data.runs.push(run);
  }

  writeTelemetry(data);
}

export function clearTelemetry(): void {
  writeTelemetry({ runs: [] });
}
