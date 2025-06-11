import React, { useEffect } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
} from '@/lib/motion-wrapper';
import { useAnimation } from '@/lib/motion-hooks';

import { useInView } from 'react-intersection-observer';
import { Bot, BrainCircuit, Zap, Sparkles } from 'lucide-react';

const CapabilitiesAnimation: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const capabilities = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: 'Multiple AI Integration',
      description: 'Conectează și orchestrează multiple sisteme AI într-o interfață unificată.',
    },
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      title: 'Intelligent Routing',
      description: 'Direcționează automat fiecare cerere către cel mai potrivit AI.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-time Processing',
      description: 'Procesare în timp real cu răspunsuri rapide și eficiente.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Enhanced Outputs',
      description: 'Răspunsuri comprehensive care integrează multiple capabilități AI.',
    },
  ];

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/5 to-background"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <MotionDiv
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground font-serif">
            Advanced <span className="premium-gradient-text">AI Capabilities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make Bot Architect Studio the leading platform for
            AI workflow orchestration
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.2,
                  },
                },
              }}
              className="group"
            >
              <div className="premium-card bg-card/60 backdrop-blur-lg border border-border-alt shadow-xl rounded-2xl p-6 flex flex-col items-center text-center h-full group-hover:scale-105 transition-all duration-300">
                <MotionDiv
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/10 to-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(0, 120, 255, 0)',
                      '0 0 20px rgba(0, 120, 255, 0.3)',
                      '0 0 0 rgba(0, 120, 255, 0)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  <div className="text-primary group-hover:text-gold transition-colors duration-300">
                    {capability.icon}
                  </div>
                </MotionDiv>
                <h3 className="text-xl font-semibold mb-4 text-foreground">{capability.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Animație centrală */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
          }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Linii de conexiune animate */}
            {[...Array(8)].map((_, i) => (
              <MotionDiv
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-0.5 bg-primary/30 origin-left"
                style={{ rotate: `${i * 45}deg` }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Nod central */}
            <MotionDiv
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 rgba(0, 120, 255, 0)',
                  '0 0 30px rgba(0, 120, 255, 0.5)',
                  '0 0 0 rgba(0, 120, 255, 0)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <BrainCircuit className="w-10 h-10 text-background" />
            </MotionDiv>

            {/* Noduri periferice */}
            {[...Array(6)].map((_, i) => {
              const angle = i * 60 * (Math.PI / 180);
              const x = Math.cos(angle) * 100;
              const y = Math.sin(angle) * 100;

              return (
                <MotionDiv
                  key={i}
                  className="absolute w-10 h-10 rounded-full bg-card flex items-center justify-center border border-primary/30"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <Bot className="w-5 h-5 text-primary" />
                </MotionDiv>
              );
            })}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default CapabilitiesAnimation;
