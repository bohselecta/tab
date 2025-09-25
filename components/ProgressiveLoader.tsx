"use client";
import { useState, useEffect } from "react";

interface ProgressiveLoaderProps {
  isGenerating: boolean;
  stage: "skeleton" | "enriching" | "complete";
  className?: string;
}

export default function ProgressiveLoader({ isGenerating, stage, className = "" }: ProgressiveLoaderProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  if (!isGenerating) return null;

  const getMessage = () => {
    switch (stage) {
      case "skeleton":
        return "Building site structure";
      case "enriching":
        return "Sharpening copy";
      case "complete":
        return "Complete";
      default:
        return "Generating";
    }
  };

  return (
    <div className={`flex items-center gap-3 text-sm opacity-80 ${className}`}>
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-web rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-web rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="w-2 h-2 bg-web rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
      </div>
      <span>{getMessage()}{dots}</span>
    </div>
  );
}
