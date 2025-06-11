import React, { useEffect, useRef } from 'react';

interface PipelineBackgroundProps {
  className?: string;
}

// Utility functions from util.js
const { PI, cos, sin, abs, sqrt, pow, round, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const TAU = 2 * PI;
const TO_RAD = PI / 180;
const floor = (n: number) => n | 0;
const rand = (n: number) => n * random();
const randIn = (min: number, max: number) => rand(max - min) + min;
const randRange = (n: number) => n - rand(2 * n);
const fadeIn = (t: number, m: number) => t / m;
const fadeOut = (t: number, m: number) => (m - t) / m;
const fadeInOut = (t: number, m: number) => {
  const hm = 0.5 * m;
  return abs((t + hm) % m - hm) / hm;
};

const PipelineBackground: React.FC<PipelineBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;

    if (!container || !canvasA || !canvasB) return;

    const ctxA = canvasA.getContext('2d');
    const ctxB = canvasB.getContext('2d');

    if (!ctxA || !ctxB) return;

    // Pipeline configuration - Optimized for better text readability
    const pipeCount = 15; // Reduced from 30
    const pipePropCount = 8;
    const pipePropsLength = pipeCount * pipePropCount;
    const turnCount = 8;
    const turnAmount = (360 / turnCount) * TO_RAD;
    const turnChanceRange = 80; // Increased for less frequent turns
    const baseSpeed = 0.3; // Reduced speed
    const rangeSpeed = 0.7; // Reduced speed range
    const baseTTL = 80; // Shorter life
    const rangeTTL = 120; // Shorter life range
    const baseWidth = 1.5; // Thinner pipes
    const rangeWidth = 2.5; // Thinner pipes
    const baseHue = 180;
    const rangeHue = 60;
    const backgroundColor = 'hsla(150,80%,1%,0.95)'; // More transparent

    const center: number[] = [];
    let tick = 0;
    let pipeProps: Float32Array;

    const resize = () => {
      const { innerWidth, innerHeight } = window;

      canvasA.width = innerWidth;
      canvasA.height = innerHeight;
      ctxA.drawImage(canvasB, 0, 0);

      canvasB.width = innerWidth;
      canvasB.height = innerHeight;
      ctxB.drawImage(canvasA, 0, 0);

      center[0] = 0.5 * canvasA.width;
      center[1] = 0.5 * canvasA.height;
    };

    const initPipe = (i: number) => {
      const x = rand(canvasA.width);
      const y = center[1];
      const direction = round(rand(1)) ? HALF_PI : TAU - HALF_PI;
      const speed = baseSpeed + rand(rangeSpeed);
      const life = 0;
      const ttl = baseTTL + rand(rangeTTL);
      const width = baseWidth + rand(rangeWidth);
      const hue = baseHue + rand(rangeHue);

      pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i);
    };

    const initPipes = () => {
      pipeProps = new Float32Array(pipePropsLength);

      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        initPipe(i);
      }
    };

    const drawPipe = (x: number, y: number, life: number, ttl: number, width: number, hue: number) => {
      ctxA.save();
      ctxA.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.08})`; // Reduced opacity
      ctxA.beginPath();
      ctxA.arc(x, y, width, 0, TAU);
      ctxA.stroke();
      ctxA.closePath();
      ctxA.restore();
    };

    const checkBounds = (x: number, y: number) => {
      if (x > canvasA.width) x = 0;
      if (x < 0) x = canvasA.width;
      if (y > canvasA.height) y = 0;
      if (y < 0) y = canvasA.height;
      return { x, y };
    };

    const updatePipe = (i: number) => {
      const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;

      let x = pipeProps[i];
      let y = pipeProps[i2];
      let direction = pipeProps[i3];
      const speed = pipeProps[i4];
      let life = pipeProps[i5];
      const ttl = pipeProps[i6];
      const width = pipeProps[i7];
      const hue = pipeProps[i8];

      drawPipe(x, y, life, ttl, width, hue);

      life++;
      x += cos(direction) * speed;
      y += sin(direction) * speed;

      const turnChance = !(tick % round(rand(turnChanceRange))) && (!(round(x) % 6) || !(round(y) % 6));
      const turnBias = round(rand(1)) ? -1 : 1;
      direction += turnChance ? turnAmount * turnBias : 0;

      pipeProps[i] = x;
      pipeProps[i2] = y;
      pipeProps[i3] = direction;
      pipeProps[i5] = life;

      const bounds = checkBounds(x, y);
      if (life > ttl) initPipe(i);
    };

    const updatePipes = () => {
      tick++;

      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        updatePipe(i);
      }
    };

    const render = () => {
      // Clear background more frequently for better text readability
      ctxB.save();
      ctxB.fillStyle = backgroundColor;
      ctxB.fillRect(0, 0, canvasB.width, canvasB.height);
      ctxB.restore();

      // Clear canvas A periodically to prevent accumulation
      if (tick % 300 === 0) {
        ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
      }

      ctxB.save();
      ctxB.filter = 'blur(8px)'; // Reduced blur for better text readability
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();

      ctxB.save();
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const draw = () => {
      updatePipes();
      render();
      animationRef.current = requestAnimationFrame(draw);
    };

    const setup = () => {
      resize();
      initPipes();
      draw();
    };

    setup();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        ref={canvasARef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasBRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: 1
        }}
      />
    </div>
  );
};

export default PipelineBackground;
