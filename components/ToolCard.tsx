import Link from "next/link";

function ToolIcon({ icon }: { icon: string }) {
  const common =
    "h-6 w-6 stroke-current stroke-[1.7] fill-none";

  switch (icon) {
    case "video":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <rect x="3" y="5" width="13" height="14" rx="3" />
          <path d="m16 10 5-3v10l-5-3z" />
        </svg>
      );

    case "audio":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M4 10v4" />
          <path d="M8 7v10" />
          <path d="M12 4v16" />
          <path d="M16 7v10" />
          <path d="M20 10v4" />
        </svg>
      );

    case "image":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <circle cx="8.5" cy="9" r="1.5" />
          <path d="m4 17 5-5 3.5 3 2.5-2.5 5 5" />
        </svg>
      );

    case "compress":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M8 3v5H3" />
          <path d="M16 3v5h5" />
          <path d="M8 21v-5H3" />
          <path d="M16 21v-5h5" />
          <path d="m8 8-5-5" />
          <path d="m16 8 5-5" />
          <path d="m8 16-5 5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <path d="M15 4v10.5a4.5 4.5 0 1 1-3-4.24" />
          <path d="M15 4c.8 2.7 2.3 4.1 5 4.5" />
        </svg>
      );

    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <rect x="3" y="6" width="18" height="12" rx="4" />
          <path d="m10 9 5 3-5 3z" />
        </svg>
      );

    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" className="fill-current" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

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
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-300 shadow-lg shadow-cyan-950/20 transition duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
          <ToolIcon icon={icon} />
        </div>

        <h3 className="mt-5 text-lg font-bold tracking-tight transition group-hover:text-cyan-300">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {desc}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-cyan-400 transition group-hover:text-cyan-300">
          Open tool
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
