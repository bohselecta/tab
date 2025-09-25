interface PaletteBadgeProps {
  palette?: { primary: string; accent: string };
  className?: string;
}

export default function PaletteBadge({ palette, className = "" }: PaletteBadgeProps) {
  if (!palette) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      <div 
        className="w-4 h-4 rounded-full border border-glassStroke"
        style={{ backgroundColor: palette.primary }}
        aria-label={`Primary color: ${palette.primary}`}
      />
      <div 
        className="w-4 h-4 rounded-full border border-glassStroke"
        style={{ backgroundColor: palette.accent }}
        aria-label={`Accent color: ${palette.accent}`}
      />
    </div>
  );
}
