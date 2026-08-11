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
    const videoUrl = isMobile
      ? '/media/videos/hero_scroll_mobile.mp4'
      : '/media/videos/hero_scroll.mp4';
      
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
      }, 600);
    };

    const loadVideo = async () => {
      try {
        setStatus("Preloading cinematic assets...");
        const response = await fetch(videoUrl);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        const reader = response.body.getReader();
        const contentLength = +(response.headers.get('Content-Length') || 0);
        
        let receivedLength = 0;
        let chunks = [];
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          receivedLength += value.length;
          
          if (contentLength) {
            const percent = Math.min(99, Math.round((receivedLength / contentLength) * 100));
            setProgress(percent);
            
            if (percent < 30) {
              setStatus("Buffering cinematic stream...");
            } else if (percent < 70) {
              setStatus("Decompressing visual vectors...");
            } else {
              setStatus("Synchronizing interactions...");
            }
          } else {
            setProgress(prev => Math.min(99, prev + 1));
          }
        }
        
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const objectURL = URL.createObjectURL(blob);
        window.preloadedVideoURL = objectURL;
        
        const fontTimeout = setTimeout(startDissolve, 400);
        document.fonts.ready
          .then(() => {
            clearTimeout(fontTimeout);
            startDissolve();
          })
          .catch(() => {
            clearTimeout(fontTimeout);
            startDissolve();
          });
      } catch (err) {
        console.error("Video preloading failed, falling back to direct URL", err);
        window.preloadedVideoURL = videoUrl;
        startDissolve();
      }
    };

    // Extreme Fallback: If 30 seconds pass, force dissolve anyway
    const maxWaitTimeout = setTimeout(() => {
      if (!isDissolving) {
        console.warn("Preloader safety timeout reached.");
        startDissolve();
      }
    }, 30000);

    loadVideo();

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
