import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  title: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforePromptTag: string;
  afterPromptTag: string;
  beforeImgSrc?: string;
  afterImgSrc?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  title,
  beforeLabel = 'Antes',
  afterLabel = 'Depois',
  beforePromptTag,
  afterPromptTag,
  beforeImgSrc,
  afterImgSrc,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-medium text-[#9ca3af] px-1">
        <span className="flex items-center gap-1 text-[#e5e5e5]">
          <span className="w-2 h-2 rounded-full bg-[#d4b874]"></span>
          {title}
        </span>
        <span className="text-[11px] text-[#64b5a6]">Arraste para comparar</span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[#171717] border border-[#2a2a2a] select-none cursor-ew-resize group hover:border-[#d4b874]/50 transition-colors"
      >
        {/* AFTER (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          {afterImgSrc ? (
            <img
              src={afterImgSrc}
              alt={afterLabel}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a221f] to-[#121212] p-4 text-center">
              <span className="text-[#64b5a6] text-xs font-semibold uppercase tracking-wider mb-1">
                Resultado Transformador
              </span>
              <p className="text-[11px] text-[#9ca3af] max-w-[200px]">
                {afterPromptTag}
              </p>
            </div>
          )}
          <div className="absolute bottom-3 right-3 z-10">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#64b5a6] text-[#121212] uppercase tracking-wider shadow">
              {afterLabel}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] px-2 py-0.5 rounded bg-black/70 text-[#d4b874] border border-[#d4b874]/30 backdrop-blur-xs">
              {afterPromptTag}
            </span>
          </div>
        </div>

        {/* BEFORE (Clipped layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          >
            {beforeImgSrc ? (
              <img
                src={beforeImgSrc}
                alt={beforeLabel}
                className="w-full h-full object-cover filter brightness-95"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#261f18] to-[#141414] p-4 text-center">
                <span className="text-[#d4b874] text-xs font-semibold uppercase tracking-wider mb-1">
                  Condição Inicial
                </span>
                <p className="text-[11px] text-[#9ca3af] max-w-[200px]">
                  {beforePromptTag}
                </p>
              </div>
            )}
            <div className="absolute bottom-3 left-3 z-10">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#2a2a2a] text-[#e5e5e5] uppercase tracking-wider border border-[#444]">
                {beforeLabel}
              </span>
            </div>
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/70 text-[#d4b874] border border-[#d4b874]/30 backdrop-blur-xs">
                {beforePromptTag}
              </span>
            </div>
          </div>
        </div>

        {/* Divider Bar */}
        <div
          className="absolute inset-y-0 w-1 bg-[#d4b874] shadow-[0_0_12px_rgba(212,184,116,0.8)] cursor-ew-resize z-20"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-[#121212] border-2 border-[#d4b874] flex items-center justify-center text-[#d4b874] shadow-lg">
            <span className="text-[10px] font-bold leading-none select-none">‹ ›</span>
          </div>
        </div>
      </div>
    </div>
  );
};
