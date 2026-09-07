import { NextRequest } from "next/server";
import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const allowed = new Set(["mp3", "wav", "ogg"]);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const format = String(form.get("format") || "mp3");

  const max =
    Number(process.env.MAX_UPLOAD_MB || 100) * 1024 * 1024;

  if (
    !(file instanceof File) ||
    !file.type.match(/^(audio|video)\//)
  ) {
    return Response.json(
      { error: "Upload an audio or video file." },
      { status: 415 }
    );
  }

  if (!allowed.has(format) || file.size > max) {
    return Response.json(
      { error: "Unsupported format or file too large." },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID();
  const input = path.join(process.cwd(), "tmp", `${id}.in`);
  const output = path.join(
    process.cwd(),
    "tmp",
    `${id}.${format}`
  );

  await fs.writeFile(
    input,
    Buffer.from(await file.arrayBuffer())
  );

  try {
    const codec =
      format === "mp3"
        ? "libmp3lame"
        : format === "ogg"
          ? "libvorbis"
          : "pcm_s16le";

    await run(
      "ffmpeg",
      [
        "-y",
        "-i",
        input,
        "-vn",
        "-c:a",
        codec,
        output,
      ],
      300000
    );

    const data = await fs.readFile(output);

    const contentType =
      format === "mp3"
        ? "audio/mpeg"
        : format === "ogg"
          ? "audio/ogg"
          : "audio/wav";

    return new Response(data, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="mediasave.${format}"`,
      },
    });
  } catch {
    return Response.json(
      { error: "Audio conversion failed." },
      { status: 500 }
    );
  } finally {
    await Promise.allSettled([
      fs.unlink(input),
      fs.unlink(output),
    ]);
  }
}

function run(
  command: string,
  args: string[],
  timeout: number
) {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(command, args);

    const timer = setTimeout(() => {
      process.kill("SIGKILL");
      reject(new Error("timeout"));
    }, timeout);

    process.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    process.on("close", (code) => {
      clearTimeout(timer);

      if (code === 0) {
        resolve();
      } else {
        reject(new Error("ffmpeg failed"));
      }
    });
  });
}
