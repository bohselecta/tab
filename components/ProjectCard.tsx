import Link from "next/link";

export default function ProjectCard({ spec }:{ spec: any }) {
  const modeColor =
    spec.mode === "video" ? "#08B0D5" :
    spec.mode === "audio" ? "#F632B3" : "#7CFF8C";

  return (
    <div className="glass p-4 rounded-xl2 border" style={{ borderColor: `${modeColor}40` }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: modeColor }} />
          <h4 className="font-semibold">{spec.title}</h4>
        </div>
        <span className="text-xs text-white/60">{new Date(spec.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="p mt-2 line-clamp-3">{spec.summary}</p>
      <div className="mt-3 flex gap-2">
        <Link href={`/project/${spec.id}`} className="btn btn-primary">Open</Link>
        <Link href={`/project/${spec.id}?preview=1`} className="btn">Preview</Link>
      </div>
    </div>
  );
}
