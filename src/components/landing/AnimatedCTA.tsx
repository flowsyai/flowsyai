import React, { useEffect, useRef } from 'react';
import {
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
  useInView,
  useAnimation,
} from '@/lib/motion-wrapper';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const AnimatedCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Animate elements when they come into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');

      // Text reveal animation for heading using CSS
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll('.char');
        chars.forEach((char, index) => {
          const element = char as HTMLElement;
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px) rotateX(90deg)';
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          element.style.transitionDelay = `${index * 0.03}s`;

          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateX(0)';
          }, 100);
        });
      }

      // Text reveal animation for paragraph using CSS
      if (textRef.current) {
        textRef.current.style.opacity = '0';
        textRef.current.style.transform = 'translateY(20px)';
        textRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        textRef.current.style.transitionDelay = '0.5s';

        setTimeout(() => {
          if (textRef.current) {
            textRef.current.style.opacity = '1';
            textRef.current.style.transform = 'translateY(0)';
          }
        }, 100);
      }
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  // Split text into characters for animation
  useEffect(() => {
    if (headingRef.current) {
      const originalText = headingRef.current.innerText;
      const words = originalText.split(' ');

      // Clear the heading
      headingRef.current.innerHTML = '';

      // Create spans for each word and character
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word inline-block';

        // Add characters
        Array.from(word).forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.className = 'char inline-block';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
        });

        headingRef.current?.appendChild(wordSpan);

        // Add space after word (except last word)
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.className = 'char inline-block';
          spaceSpan.innerHTML = '&nbsp;';
          headingRef.current?.appendChild(spaceSpan);
        }
      });
    }
  }, []);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      {/* Content Container */}
      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        <MotionDiv
          className="max-w-4xl mx-auto text-center"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Icon */}
          <MotionDiv
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-tr from-primary via-gold to-primary flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 0 rgba(0, 120, 255, 0)',
                '0 0 30px rgba(0, 120, 255, 0.5)',
                '0 0 0 rgba(0, 120, 255, 0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10 text-background" />
          </MotionDiv>

          {/* Heading with character animation */}
          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 perspective-500"
          >
            Transform Your AI Capabilities Today
          </h2>

          {/* Subheading */}
          <p
            ref={textRef}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Join the growing community of businesses leveraging our platform to create powerful,
            integrated AI solutions that drive innovation and efficiency.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-gold text-background font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out text-base sm:text-lg px-10 py-7"
          >
            <span className="flex items-center justify-center">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </Button>

          {/* Trust indicators */}
          <MotionDiv
            className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <span className="text-sm text-muted-foreground">
              Trusted by innovative companies worldwide
            </span>

            {/* Company logos would go here */}
            <div className="flex flex-wrap justify-center gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-8 bg-muted/30 rounded-md"></div>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default AnimatedCTA;
