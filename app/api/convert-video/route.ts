import { NextRequest } from "next/server";
import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export const runtime = "nodejs";

const allowed = new Set(["mp4", "webm"]);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const format = String(form.get("format") || "mp4");
  const compress = String(form.get("compress") || "false") === "true";

  const max =
    Number(process.env.MAX_UPLOAD_MB || 100) * 1024 * 1024;

  if (
    !(file instanceof File) ||
    !file.type.startsWith("video/")
  ) {
    return Response.json(
      { error: "Please upload a video file." },
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

  const input = path.join(
    process.cwd(),
    "tmp",
    `${id}.in`
  );

  const output = path.join(
    process.cwd(),
    "tmp",
    `${id}.${format}`
  );

  await fs.writeFile(
    input,
    Buffer.from(await file.arrayBuffer())
  );

  const args: string[] = ["-y", "-i", input];

  if (compress) {
    args.push(
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "fast",
      "-c:a",
      "aac",
      "-b:a",
      "128k"
    );
  } else if (format === "webm") {
    args.push(
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "32",
      "-b:v",
      "0",
      "-c:a",
      "libopus"
    );
  } else {
    args.push(
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-b:a",
      "128k"
    );
  }

  args.push(output);

  try {
    await run("ffmpeg", args, 300000);

    const data = await fs.readFile(output);

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type":
          format === "webm"
            ? "video/webm"
            : "video/mp4",
        "Content-Disposition": `attachment; filename="mediasave.${format}"`,
      },
    });
  } catch {
    return Response.json(
      { error: "FFmpeg processing failed." },
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
  cmd: string,
  args: string[],
  timeout: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(cmd, args, {
      stdio: ["ignore", "ignore", "pipe"],
    });

    let errorOutput = "";

    process.stderr.on("data", (data: Buffer) => {
      errorOutput += data.toString();
    });

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
        reject(
          new Error(errorOutput.slice(-1000))
        );
      }
    });
  });
}
