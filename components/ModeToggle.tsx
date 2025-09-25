function ModeToggle({ value, onChange }: { value: "quick" | "deep"; onChange: (v: any) => void }) {
  return (
    <div className="inline-flex glass rounded-xl2 overflow-hidden">
      {["quick", "deep"].map(m => (
        <button 
          key={m}
          onClick={() => onChange(m as any)}
          className={`px-3 py-1 text-sm transition-colors ${
            value === m ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/70"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

export default ModeToggle;
