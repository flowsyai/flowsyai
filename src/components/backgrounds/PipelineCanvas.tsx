import React, { useEffect, useRef } from 'react';

interface PipelineCanvasProps {
  className?: string;
}

const PipelineCanvas: React.FC<PipelineCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pipeline animation variables
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      hue: number;
      speed: number;
      trail: Array<{ x: number; y: number; alpha: number }>;
    }> = [];

    const nodes: Array<{
      x: number;
      y: number;
      size: number;
      hue: number;
      pulse: number;
      connections: number[];
    }> = [];

    const pipelines: Array<{
      start: { x: number; y: number };
      end: { x: number; y: number };
      progress: number;
      speed: number;
      hue: number;
      width: number;
    }> = [];

    // Create network nodes
    const createNode = (x?: number, y?: number) => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        hue: Math.random() * 60 + 200,
        pulse: Math.random() * Math.PI * 2,
        connections: [],
      };
    };

    // Create flowing particle
    const createParticle = (x?: number, y?: number) => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        life: 0,
        maxLife: Math.random() * 300 + 200,
        size: Math.random() * 2 + 1,
        hue: Math.random() * 60 + 200,
        speed: Math.random() * 2 + 1,
        trail: [],
      };
    };

    // Initialize network nodes
    for (let i = 0; i < 12; i++) {
      nodes.push(createNode());
    }

    // Create connections between nodes
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200 && Math.random() < 0.3) {
            node.connections.push(j);
            pipelines.push({
              start: { x: node.x, y: node.y },
              end: { x: otherNode.x, y: otherNode.y },
              progress: Math.random(),
              speed: Math.random() * 0.01 + 0.005,
              hue: (node.hue + otherNode.hue) / 2,
              width: Math.random() * 3 + 1,
            });
          }
        }
      });
    });

    // Initialize flowing particles
    for (let i = 0; i < 40; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      time += 0.01;

      // Clear canvas completely every 15 seconds for performance
      if (Math.floor(time * 100) % 1500 === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        // Clear canvas with subtle fade - more transparent for better visibility
        ctx.fillStyle = 'rgba(20, 20, 20, 0.02)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update pipeline flows
      pipelines.forEach(pipeline => {
        pipeline.progress += pipeline.speed;
        if (pipeline.progress > 1) {
          pipeline.progress = 0;
        }
      });

      // Update nodes pulse
      nodes.forEach(node => {
        node.pulse += 0.05;
      });

      // Update flowing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        // Update trail
        particle.trail.unshift({ x: particle.x, y: particle.y, alpha: 1 });
        if (particle.trail.length > 8) {
          particle.trail.pop();
        }

        // Update position with flow field
        particle.x += particle.vx + Math.sin(time + particle.y * 0.005) * 0.5;
        particle.y += particle.vy + Math.cos(time + particle.x * 0.005) * 0.5;
        particle.life++;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Remove old particles
        if (particle.life > particle.maxLife) {
          particles.splice(i, 1);
          particles.push(createParticle());
        }
      }

      // Draw pipeline connections
      pipelines.forEach(pipeline => {
        const gradient = ctx.createLinearGradient(
          pipeline.start.x,
          pipeline.start.y,
          pipeline.end.x,
          pipeline.end.y
        );
        gradient.addColorStop(0, `hsla(${pipeline.hue}, 80%, 60%, 0.2)`);
        gradient.addColorStop(0.5, `hsla(${pipeline.hue}, 80%, 70%, 0.5)`);
        gradient.addColorStop(1, `hsla(${pipeline.hue}, 80%, 60%, 0.2)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = pipeline.width;
        ctx.beginPath();
        ctx.moveTo(pipeline.start.x, pipeline.start.y);
        ctx.lineTo(pipeline.end.x, pipeline.end.y);
        ctx.stroke();

        // Draw flowing energy along pipeline
        const flowX = pipeline.start.x + (pipeline.end.x - pipeline.start.x) * pipeline.progress;
        const flowY = pipeline.start.y + (pipeline.end.y - pipeline.start.y) * pipeline.progress;

        ctx.shadowColor = `hsl(${pipeline.hue}, 80%, 80%)`;
        ctx.shadowBlur = 20;
        ctx.fillStyle = `hsla(${pipeline.hue}, 90%, 80%, 0.9)`;
        ctx.beginPath();
        ctx.arc(flowX, flowY, pipeline.width * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw network nodes
      nodes.forEach(node => {
        const pulseSize = node.size + Math.sin(node.pulse) * 2;

        // Node glow
        ctx.shadowColor = `hsl(${node.hue}, 70%, 60%)`;
        ctx.shadowBlur = 20;

        // Outer ring
        ctx.strokeStyle = `hsla(${node.hue}, 70%, 60%, 0.5)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize + 5, 0, Math.PI * 2);
        ctx.stroke();

        // Inner core
        ctx.fillStyle = `hsla(${node.hue}, 80%, 70%, 0.9)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
      });

      // Draw flowing particles with trails
      particles.forEach(particle => {
        // Draw trail
        particle.trail.forEach((point, index) => {
          const alpha = (1 - index / particle.trail.length) * 0.5;
          const size = particle.size * alpha;

          ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${alpha})`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw main particle
        const alpha = 1 - particle.life / particle.maxLife;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.shadowBlur = 8;
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none pipeline-canvas z-[1] ${className}`}
    />
  );
};

export default PipelineCanvas;
