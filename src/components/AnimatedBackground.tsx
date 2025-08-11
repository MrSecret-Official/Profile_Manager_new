'use client';

import React, { useEffect, useRef } from 'react';
import { BackgroundSettings } from '@/types/profile';

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  backgroundSettings: BackgroundSettings;
}

export function AnimatedBackground({ backgroundSettings }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainDropsRef = useRef<RainDrop[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRainDrops = () => {
      if (!backgroundSettings.rainEnabled) {
        rainDropsRef.current = [];
        return;
      }

      const drops: RainDrop[] = [];
      const numDrops = 150;

      for (let i = 0; i < numDrops; i++) {
        drops.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 2,
          length: Math.random() * 15 + 10,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }

      rainDropsRef.current = drops;
    };

    const drawBackground = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (backgroundSettings.customImage) {
        // If custom image is set, draw it
        const img = new Image();
        img.onload = () => {
          ctx.globalAlpha = 0.8;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
        };
        img.src = backgroundSettings.customImage;
      } else if (backgroundSettings.useDefaultRain) {
        // Default rain background - simple gray gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#2a2a2a');
        gradient.addColorStop(0.5, '#1a1a1a');
        gradient.addColorStop(1, '#0a0a0a');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle texture overlay
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 100; i++) {
          ctx.fillRect(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            1,
            1
          );
        }
        ctx.globalAlpha = 1;
      } else {
        // Simple gray background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const drawRain = () => {
      if (!backgroundSettings.rainEnabled || rainDropsRef.current.length === 0) {
        return;
      }

      ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
      ctx.lineWidth = 1;

      rainDropsRef.current.forEach(drop => {
        ctx.globalAlpha = drop.opacity;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 2, drop.y + drop.length);
        ctx.stroke();

        // Update drop position
        drop.y += drop.speed;
        drop.x -= 0.5;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + drop.length) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < -10) {
          drop.x = canvas.width + 10;
        }
      });

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      drawBackground();
      drawRain();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createRainDrops();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createRainDrops();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [backgroundSettings]);

  // Show canvas only if rain is enabled or custom image is set
  const shouldShowCanvas = backgroundSettings.rainEnabled || backgroundSettings.customImage || backgroundSettings.useDefaultRain;

  if (!shouldShowCanvas) {
    return (
      <div
        className="fixed inset-0 -z-10 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
        style={{ pointerEvents: 'none' }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
