import { NextResponse } from "next/server";
import { broadcastUpdate } from "../events/route";

export async function POST() {
  broadcastUpdate();
  return NextResponse.json({ ok: true });
}
