import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono transition-all cursor-pointer hover:scale-105 active:scale-95 ${
        copied ? "text-emerald-300 border-emerald-500/50" : "text-zinc-300 hover:text-white"
      } ${className}`}
      aria-label={copied ? "Copied to clipboard" : `Copy ${label || text}`}
      title={copied ? "Copied to clipboard" : `Copy ${label || text}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-red-400" />
          <span>{label || "Copy"}</span>
        </>
      )}
    </button>
  );
};

export default CopyButton;
