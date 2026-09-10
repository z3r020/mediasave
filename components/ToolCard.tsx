import Link from "next/link";

export default function ToolCard({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055] hover:shadow-cyan-950/20"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/20" />

      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-2xl shadow-lg transition group-hover:border-cyan-400/20">
          {icon}
        </div>

        <h3 className="mt-5 text-lg font-bold tracking-tight transition group-hover:text-cyan-300">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {desc}
        </p>

        <div className="mt-5 text-sm font-semibold text-cyan-400 transition group-hover:text-cyan-300">
          Open tool →
        </div>
      </div>
    </Link>
  );
}
