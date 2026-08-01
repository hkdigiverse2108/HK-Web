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
    const totalFrames = isMobile
      ? (content && content.hero && content.hero.mobileFrameCount) || 848
      : (content && content.hero && content.hero.frameCount) || 391;
      
    // Wait for at most 40 frames to unblock UI quickly
    const targetFramesToWait = Math.min(totalFrames, 40);
    
    // Use globally cached frames if they exist
    const frames = window.preloadedFrames || [];
    const images = [];
    let loadedCount = 0;
    let isDissolving = false;

    const startDissolve = () => {
      if (!isMountedRef.current || isDissolving) return;
      isDissolving = true;
      setProgress(100);
      setStatus("Ready");
      
      // Expose globally so HeroSection can use them even if not all frames are loaded yet
      window.preloadedFrames = frames;

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
      }, 600);
    };

    const updateProgress = () => {
      if (!isMountedRef.current || isDissolving) return;
      loadedCount++;
      
      const percent = Math.min(100, Math.round((loadedCount / targetFramesToWait) * 100));
      setProgress(percent);

      if (percent < 25) {
        setStatus("Preloading cinematic assets...");
      } else if (percent < 60) {
        setStatus("Rendering canvas frames...");
      } else if (percent < 90) {
        setStatus("Synchronizing interactions...");
      } else {
        setStatus("Calibrating hardware...");
      }

      if (loadedCount >= targetFramesToWait) {
        const fontTimeout = setTimeout(startDissolve, 800);
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

    // Extreme Fallback: If 4 seconds pass, force dissolve anyway
    const maxWaitTimeout = setTimeout(() => {
      if (!isDissolving) {
        console.warn("Preloader timeout reached. Forcing dissolve.");
        startDissolve();
      }
    }, 4000);

    // Preload each frame image
    for (let i = 0; i < totalFrames; i++) {
      // If frame already exists from a previous load, use it
      if (frames[i] && frames[i].complete) {
        if (!isDissolving) updateProgress();
        continue;
      }
      
      const img = new Image();
      const frameNum = i.toString().padStart(4, '0');
      const dirName = isMobile ? 'frames_mobile' : 'frames';
      img.src = `/media/images/${dirName}/frame_${frameNum}.jpg`;
      
      img.onload = () => {
        frames[i] = img;
        if (!isMountedRef.current) return;
        // Even if we are dissolving, we keep loading them in the background and adding to frames
        if (!isDissolving) updateProgress();
      };
      
      img.onerror = () => {
        console.error(`Failed to load frame ${frameNum}`);
        if (!isMountedRef.current) return;
        if (!isDissolving) updateProgress();
      };
      
      images.push(img);
    }

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
