import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="text-lg font-black">
            Media<span className="text-cyan-400">Save</span>
          </Link>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            © {new Date().getFullYear()} MediaSave. Use only files you own
            or have permission to process.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/privacy"
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Privacy
          </Link>

          <Link
            href="/terms"
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Terms
          </Link>

          <Link
            href="/dmca"
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            DMCA
          </Link>

          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
