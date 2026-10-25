import React, { useState } from 'react';
import { Camera, Sparkles, CheckCircle2 } from 'lucide-react';

interface PhotoSlotProps {
  label: string;
  tagText?: string;
  alt: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide' | 'tall';
  src?: string;
  overlayBadge?: string;
  className?: string;
}

export const PhotoSlot: React.FC<PhotoSlotProps> = ({
  label,
  tagText,
  alt,
  aspectRatio = 'video',
  src,
  overlayBadge,
  className = '',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-[16/10]',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    tall: 'aspect-[4/5]',
  }[aspectRatio];

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[#171717] border border-[#2a2a2a] group transition-all duration-500 hover:border-[#d4b874]/60 ${aspectClasses} ${className}`}
      style={{ minHeight: '160px' }}
    >
      {/* Background ambient gradient to prevent layout shift and pure white flash */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#121212] via-[#1a1a1a] to-[#252525] opacity-90" />

      {src && !error ? (
        <>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              loaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30 pointer-events-none" />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#242424] border border-[#d4b874]/30 flex items-center justify-center text-[#d4b874] mb-3 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <Camera className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#d4b874] mb-1">
            Espaço para Fotografia
          </span>
          <p className="text-xs text-[#9ca3af] max-w-[220px] leading-relaxed">
            {label}
          </p>
        </div>
      )}

      {/* Required Prompt Tag Label [COLOQUE AQUI: ...] */}
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#121212]/80 backdrop-blur-md text-[#d4b874] border border-[#d4b874]/40 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#d4b874]" />
          {tagText || label}
        </span>
      </div>

      {overlayBadge && (
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#64b5a6]/90 text-[#121212] shadow-md backdrop-blur-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {overlayBadge}
          </span>
        </div>
      )}
    </div>
  );
};
