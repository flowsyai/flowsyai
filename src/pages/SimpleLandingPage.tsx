import React, { useEffect, useState } from 'react';
import {
  SafeAnimatePresence,
  MotionDiv,
  MotionSection,
  MotionH1,
  MotionH2,
  MotionP,
  MotionButton,
  MotionLi,
  MotionTr,
} from '@/lib/motion-wrapper';

import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Layers, Code } from 'lucide-react';

const SimpleLandingPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20">
        {/* Simple Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-600/5 to-transparent"></div>
        </div>

        {/* Subtle Animated Dots */}
        <div className="absolute inset-0 z-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <MotionDiv
              key={i}
              className="absolute rounded-full bg-blue-500"
              style={{
                width: 3 + Math.random() * 4,
                height: 3 + Math.random() * 4,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto max-w-5xl z-10">
          <SafeAnimatePresence>
            {isLoaded && (
              <>
                {/* Logo/Icon */}
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mb-8"
                >
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-3">
                    <img
                      src="/flowsy-new-logo.png"
                      alt="FlowsyAI Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </MotionDiv>

                {/* Headline */}
                <MotionH1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold text-center mb-6"
                >
                  Unify Your <span className="text-blue-400">AI Experience</span>
                </MotionH1>

                {/* Subheadline */}
                <MotionP
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl text-slate-300 text-center max-w-2xl mx-auto mb-12"
                >
                  Seamlessly integrate multiple AI bots into a single powerful solution to enhance
                  your applications.
                </MotionP>

                {/* CTA Button */}
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-center"
                >
                  <Link
                    to="/dashboard"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center transition-all duration-300 group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </MotionDiv>
              </>
            )}
          </SafeAnimatePresence>
        </div>

        {/* Scroll Indicator */}
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <MotionDiv
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center"
          >
            <MotionDiv
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2"
            />
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            Key Features
          </MotionH2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layers className="w-8 h-8 text-blue-400" />,
                title: 'Unified Integration',
                description:
                  'Combine multiple AI bots into a single cohesive solution with our intuitive platform.',
              },
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: 'Enhanced Performance',
                description:
                  'Significantly improve your applications with our advanced AI orchestration capabilities.',
              },
              {
                icon: <Code className="w-8 h-8 text-blue-400" />,
                title: 'Simple Implementation',
                description:
                  'Easy-to-use API and interface for seamless integration with your existing systems.',
              },
            ].map((feature, index) => (
              <MotionDiv
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="bg-slate-700/50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            How It Works
          </MotionH2>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <MotionDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2"
            >
              <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-slate-600">Demo Video Placeholder</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Simple Integration Process</h3>
                <p className="text-slate-300">
                  Our platform makes it easy to connect multiple AI bots and create powerful
                  workflows.
                </p>
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 space-y-6"
            >
              {[
                { number: '01', text: 'Connect your AI bots to our platform' },
                { number: '02', text: 'Configure interactions between bots' },
                { number: '03', text: 'Deploy your unified solution' },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-blue-500/10 text-blue-400 font-bold px-3 py-2 rounded">
                    {step.number}
                  </div>
                  <p className="text-slate-300 pt-2">{step.text}</p>
                </div>
              ))}
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-slate-800 to-slate-900 p-10 rounded-lg border border-slate-700 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your AI Experience?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the growing community of developers who are enhancing their applications with our
              unified AI solution.
            </p>
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg inline-flex items-center transition-all duration-300 group"
            >
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default SimpleLandingPage;
