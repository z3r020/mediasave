import { NextRequest } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

const allowed = new Set(["jpg", "png", "webp"]);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  const format = String(form.get("format") || "webp");

  const max =
    Number(process.env.MAX_UPLOAD_MB || 100) * 1024 * 1024;

  if (
    !(file instanceof File) ||
    !file.type.startsWith("image/")
  ) {
    return Response.json(
      { error: "Please upload an image." },
      { status: 415 }
    );
  }

  if (!allowed.has(format) || file.size > max) {
    return Response.json(
      { error: "Unsupported format or file too large." },
      { status: 400 }
    );
  }

  try {
    let image = sharp(
      Buffer.from(await file.arrayBuffer())
    ).rotate();

    if (format === "jpg") {
      image = image.jpeg({ quality: 88 });
    } else if (format === "png") {
      image = image.png({ compressionLevel: 8 });
    } else {
      image = image.webp({ quality: 88 });
    }

    const output = await image.toBuffer();

    return new Response(new Uint8Array(output), {
      headers: {
        "Content-Type":
          format === "jpg"
            ? "image/jpeg"
            : `image/${format}`,
        "Content-Disposition": `attachment; filename="mediasave.${format}"`,
      },
    });
  } catch {
    return Response.json(
      { error: "Image conversion failed." },
      { status: 500 }
    );
  }
}
