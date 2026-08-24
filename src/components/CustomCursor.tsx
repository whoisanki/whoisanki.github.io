import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom tracker on non-touch (mouse / trackpad) devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button' ||
          target.dataset.interactive === 'true';

        setIsHovered(Boolean(isInteractive));
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        {/* Outer Round Tracker Ring */}
        <motion.div
          className="fixed top-0 left-0 rounded-full border border-white/50 backdrop-blur-[1px]"
          animate={{
            x: pos.x - (isHovered ? 24 : 16),
            y: pos.y - (isHovered ? 24 : 16),
            width: isHovered ? 48 : 32,
            height: isHovered ? 48 : 32,
            backgroundColor: isHovered
              ? 'rgba(255, 255, 255, 0.14)'
              : 'rgba(255, 255, 255, 0.04)',
            borderColor: isHovered
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(255, 255, 255, 0.35)',
            scale: isClicking ? 0.8 : 1
          }}
          transition={{
            type: 'spring',
            damping: 26,
            stiffness: 340,
            mass: 0.12
          }}
        />

        {/* Center Precision Target Dot */}
        <motion.div
          className="fixed top-0 left-0 rounded-full bg-white shadow-sm shadow-white/50"
          animate={{
            x: pos.x - (isHovered ? 3 : 2.5),
            y: pos.y - (isHovered ? 3 : 2.5),
            width: isHovered ? 6 : 5,
            height: isHovered ? 6 : 5,
            scale: isClicking ? 1.3 : 1
          }}
          transition={{
            type: 'spring',
            damping: 38,
            stiffness: 600,
            mass: 0.03
          }}
        />
      </div>
    </AnimatePresence>
  );
};
