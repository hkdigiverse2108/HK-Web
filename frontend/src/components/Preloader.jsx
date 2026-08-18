import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useContent } from '../context/ContentContext';

export default function Preloader({ onComplete }) {
  const { content } = useContent();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing systems...");
  const isMountedRef = useRef(true);
  const timelineRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    const isMobile = window.innerWidth < 768;
    const totalFrames = isMobile ? 289 : 264;
    const folder = isMobile
      ? '/media/images/frames_webp_mobile'
      : '/media/images/frames_webp';
      
    let isDissolving = false;

    const startDissolve = () => {
      if (!isMountedRef.current || isDissolving) return;
      isDissolving = true;
      setProgress(100);
      setStatus("Calibrating hardware...");

      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        const tl = gsap.timeline({
          onComplete: () => {
            if (isMountedRef.current) {
              onComplete();
            }
          }
        });
        timelineRef.current = tl;
        tl.to('.preloader-logo', { opacity: 0, scale: 0.95, duration: 0.8, ease: "power4.out" })
          .to('.preloader-progress', { opacity: 0, y: 10, duration: 0.5, ease: "power4.out" }, "-=0.6")
          .to('.preloader-bg', { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 1.2, ease: "power4.inOut" }, "-=0.3");
      }, 400);
    };

    const loadFrames = () => {
      setStatus("Preloading visual frames...");
      const images = new Array(totalFrames);
      let loadedCount = 0;
      let nextIndex = 1;
      const CONCURRENCY = 16;

      const handleFrameFinished = (index, img) => {
        if (!isMountedRef.current) return;
        images[index - 1] = img;
        loadedCount++;
        
        const pct = Math.min(99, Math.round((loadedCount / totalFrames) * 100));
        setProgress(pct);
        
        if (pct < 30) {
          setStatus("Buffering visual assets...");
        } else if (pct < 70) {
          setStatus("Calibrating canvas matrices...");
        } else {
          setStatus("Synchronizing interactions...");
        }

        if (loadedCount >= totalFrames) {
          window.preloadedFrames = images;
          window.preloadedFrameCount = totalFrames;

          const fontTimeout = setTimeout(startDissolve, 300);
          document.fonts.ready
            .then(() => {
              clearTimeout(fontTimeout);
              startDissolve();
            })
            .catch(() => {
              clearTimeout(fontTimeout);
              startDissolve();
            });
        }
      };

      const loadNext = () => {
        if (nextIndex > totalFrames) return;
        const i = nextIndex++;
        const img = new Image();
        const pad = String(i).padStart(4, '0');
        img.src = `${folder}/frame_${pad}.webp`;
        
        img.onload = () => {
          handleFrameFinished(i, img);
          loadNext();
        };
        img.onerror = () => {
          handleFrameFinished(i, null);
          loadNext();
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext();
      }
    };

    // Extreme Fallback: If 20 seconds pass, force dissolve anyway
    const maxWaitTimeout = setTimeout(() => {
      if (!isDissolving) {
        console.warn("Preloader safety timeout reached.");
        startDissolve();
      }
    }, 20000);

    loadFrames();

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (maxWaitTimeout) clearTimeout(maxWaitTimeout);
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [onComplete, content]);

  return (
    <div className="preloader-bg fixed inset-0 w-full h-full bg-[#000000] z-[9999] flex flex-col items-center justify-center select-none overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
      {/* Sleek geometric SVG logo */}
      <div className="preloader-logo flex flex-col items-center mb-12">
        <img src="/media/images/hk-logo.png" alt="HK Logo" className="w-16 h-16 object-contain mb-6" />
        <span className="font-display tracking-[0.4em] text-xs uppercase font-light text-neutral-400">
          HariKrushn Digiverse
        </span>
      </div>

      {/* Progress percentage & status */}
      <div className="preloader-progress flex flex-col items-center font-mono">
        <div className="text-4xl md:text-5xl font-light tracking-widest text-white mb-2">
          {progress}%
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-sans mt-2 animate-pulse">
          {status}
        </div>
      </div>
    </div>
  );
}
