import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Spring smoothing for zero jitter
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 origin-left z-[100] pointer-events-none shadow-[0_0_12px_rgba(168,85,247,0.6)]"
    />
  );
}
