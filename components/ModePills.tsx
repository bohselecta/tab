interface ModePillsProps {
  mode: "video" | "audio" | "web";
  className?: string;
}

export default function ModePills({ mode, className = "" }: ModePillsProps) {
  const modeConfig = {
    video: { color: "bg-video", label: "VIDEO" },
    audio: { color: "bg-audio", label: "AUDIO" },
    web: { color: "bg-web", label: "WEB" }
  };

  const config = modeConfig[mode];

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} text-white ${className}`}>
      {config.label}
    </span>
  );
}
