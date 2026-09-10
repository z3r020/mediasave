import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/75 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="group text-xl font-black tracking-tight"
        >
          Media<span className="text-cyan-400 transition group-hover:text-cyan-300">Save</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            href="/video-downloader"
            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Video
          </Link>

          <Link
            href="/audio-converter"
            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Audio
          </Link>

          <Link
            href="/image-converter"
            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Image
          </Link>

          <Link
            href="/compress-video"
            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Compress
          </Link>

          <Link
            href="/blog"
            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
