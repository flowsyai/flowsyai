import React, { useState, useEffect, useRef } from 'react';
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

import { Button } from '@/components/ui/button';
import { useInView } from 'react-intersection-observer';
import {
  Bot,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Search,
  FileText,
  BarChart,
  Code,
} from 'lucide-react';

// Realistic demo data
const realQueries = [
  'Analyze market trends for AI integration platforms and generate a detailed report',
  'Create a marketing strategy for launching a new AI automation product',
  'Summarize the latest research in machine learning and provide implementation recommendations',
  'Generate a business plan for an AI technology startup focused on industrial automation',
  'Develop a workflow for integrating AI systems into existing production processes',
];

// Detailed bot responses
const detailedBotResponses = {
  'Research Bot': {
    name: 'Research Bot',
    icon: <Search className="w-4 h-4" />,
    color: 'primary',
    response:
      'I analyzed 237 research articles and market reports from the last 6 months. Main trends indicate a 34% growth in AI integration platform adoption in the industrial sector. Companies implementing these solutions report an average efficiency increase of 27%.',
  },
  'Analytics Bot': {
    name: 'Analytics Bot',
    icon: <BarChart className="w-4 h-4" />,
    color: 'gold',
    response:
      'Analiza datelor arată o corelație puternică (r=0.78) între implementarea sistemelor AI integrate și reducerea costurilor operaționale. Segmentele de piață cu cea mai rapidă creștere sunt: producție (42%), sănătate (38%), și servicii financiare (31%).',
  },
  'Content Bot': {
    name: 'Content Bot',
    icon: <FileText className="w-4 h-4" />,
    color: 'platinum',
    response:
      'Am structurat informațiile într-un format coerent și am generat un raport detaliat cu secțiuni pentru tendințe de piață, analiză competitivă, oportunități de creștere și recomandări strategice. Raportul include vizualizări de date și studii de caz relevante.',
  },
  'Technical Bot': {
    name: 'Technical Bot',
    icon: <Code className="w-4 h-4" />,
    color: 'primary',
    response:
      'Am identificat arhitecturile tehnice optime pentru implementarea platformelor de integrare AI. Recomand o abordare bazată pe microservicii cu API-uri RESTful pentru integrare și un sistem de orchestrare pentru gestionarea fluxurilor de lucru AI.',
  },
};

// Răspuns final integrat
const integratedResponse = `
# Raport Complet: Tendințe în Platformele de Integrare AI

## Rezumat Executiv
Piața platformelor de integrare AI a crescut cu 34% în ultimele 12 luni, cu o adopție accelerată în sectoarele de producție (42%), sănătate (38%) și servicii financiare (31%).

## Tendințe Cheie
1. **Automatizare end-to-end** - Companiile caută soluții complete care integrează multiple sisteme AI
2. **Orchestrare inteligentă** - Platformele care oferă rutare inteligentă a sarcinilor între diferiți agenți AI sunt în creștere
3. **Scalabilitate enterprise** - Soluțiile care pot scala de la departamente individuale la întreaga organizație sunt preferate

## Analiză Competitivă
Am analizat 15 platforme principale și am identificat 3 lideri de piață care oferă cele mai robuste capabilități de integrare.

## Recomandări Strategice
1. Focalizare pe soluții verticale pentru industriile cu creștere rapidă
2. Dezvoltarea capabilităților de orchestrare pentru gestionarea fluxurilor complexe
3. Implementarea unei arhitecturi bazate pe microservicii pentru flexibilitate și scalabilitate

## Implementare Tehnică
Arhitectura recomandată include un sistem de orchestrare central, API-uri pentru integrare și un dashboard unificat pentru monitorizare și analiză.
`;

const EnhancedInteractiveDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(realQueries[0]);
  const [showBotResponses, setShowBotResponses] = useState(false);
  const [showFinalResponse, setShowFinalResponse] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [expandedBot, setExpandedBot] = useState<string | null>(null);

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  // Efect pentru animația de typing
  useEffect(() => {
    if (showFinalResponse && integratedResponse) {
      setIsTyping(true);
      let i = 0;
      const speed = 5; // milisecunde per caracter

      const typeWriter = () => {
        if (i < integratedResponse.length) {
          setTypedText(integratedResponse.substring(0, i + 1));
          i++;
          typingRef.current = setTimeout(typeWriter, speed);
        } else {
          setIsTyping(false);
        }
      };

      typeWriter();

      return () => {
        if (typingRef.current) clearTimeout(typingRef.current);
      };
    }
  }, [showFinalResponse]);

  // Gestionarea auto-play pentru demo
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStep < 4) {
          setCurrentStep(prev => prev + 1);

          // Arată răspunsurile boților la pasul corespunzător
          if (currentStep === 1) {
            setTimeout(() => setShowBotResponses(true), 800);
          }

          // Arată răspunsul final la pasul corespunzător
          if (currentStep === 3) {
            setTimeout(() => setShowFinalResponse(true), 800);
          }
        } else {
          // Resetează demo-ul după finalizare
          setIsAutoPlaying(false);
          setTimeout(() => {
            setCurrentStep(0);
            setShowBotResponses(false);
            setShowFinalResponse(false);
            setTypedText('');
          }, 5000);
        }
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStep, isAutoPlaying]);

  // Pornește demo-ul când secțiunea devine vizibilă
  useEffect(() => {
    if (inView && !isPlaying) {
      setIsPlaying(true);
    }
  }, [inView, isPlaying]);

  const startDemo = () => {
    setCurrentStep(0);
    setShowBotResponses(false);
    setShowFinalResponse(false);
    setTypedText('');
    setIsAutoPlaying(true);
    setExpandedBot(null);
  };

  const goToStep = (index: number) => {
    // Oprește auto-play dacă utilizatorul navighează manual
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }

    setCurrentStep(index);

    // Arată/ascunde răspunsurile boților în funcție de pas
    setShowBotResponses(index >= 2);
    setShowFinalResponse(index >= 4);

    if (index < 4) {
      setTypedText('');
    } else if (index === 4 && !typedText) {
      setIsTyping(true);
      let i = 0;
      const speed = 5;

      const typeWriter = () => {
        if (i < integratedResponse.length) {
          setTypedText(integratedResponse.substring(0, i + 1));
          i++;
          typingRef.current = setTimeout(typeWriter, speed);
        } else {
          setIsTyping(false);
        }
      };

      typeWriter();
    }
  };

  const toggleBotExpansion = (botName: string) => {
    if (expandedBot === botName) {
      setExpandedBot(null);
    } else {
      setExpandedBot(botName);
    }
  };

  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Fundal subtil */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background"></div>

        {/* Puncte animate în fundal */}
        {[...Array(20)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: 2 + Math.random() * 4 + 'px',
              height: 2 + Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <MotionH2
            className="text-3xl md:text-4xl font-medium mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Demo interactiv
          </MotionH2>

          <MotionP
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experimentează cum platforma noastră integrează multiple sisteme AI pentru a oferi
            răspunsuri comprehensive și inteligente.
          </MotionP>
        </div>

        {/* Interfața demo */}
        <div className="max-w-5xl mx-auto bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden shadow-xl">
          {/* Header demo */}
          <div className="bg-muted p-4 border-b border-border flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-gold"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <div className="text-sm font-medium">AI Flow Integration Platform</div>
            <div className="w-16"></div> {/* Spațiu pentru aliniere */}
          </div>

          {/* Conținut demo */}
          <div className="p-6">
            {/* Pași demo */}
            <div className="flex justify-between items-center mb-8 relative">
              {[
                { id: 'input', label: 'Input', icon: <MessageSquare className="w-5 h-5" /> },
                { id: 'routing', label: 'Routing', icon: <BrainCircuit className="w-5 h-5" /> },
                { id: 'processing', label: 'Processing', icon: <Bot className="w-5 h-5" /> },
                { id: 'integration', label: 'Integration', icon: <Zap className="w-5 h-5" /> },
                { id: 'output', label: 'Output', icon: <Sparkles className="w-5 h-5" /> },
              ].map((step, index) => (
                <React.Fragment key={step.id}>
                  <MotionButton
                    className={`flex flex-col items-center relative z-10 ${
                      currentStep >= index ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                    onClick={() => goToStep(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        currentStep >= index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-sm">{step.label}</span>
                  </MotionButton>

                  {index < 4 && (
                    <div className="flex-1 h-1 bg-muted relative z-0">
                      <MotionDiv
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: currentStep > index ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Vizualizare demo */}
            <div className="bg-background/50 rounded-lg p-6 mb-8 min-h-[400px]">
              {/* Pasul 1: Input utilizator */}
              <SafeAnimatePresence>
                {currentStep >= 0 && (
                  <MotionDiv
                    key="user-input"
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="bg-card p-4 rounded-lg rounded-tl-none">
                          <p className="text-foreground">{selectedQuery}</p>
                        </div>

                        {/* Selector de query-uri */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {realQueries.map((query, idx) => (
                            <button
                              key={idx}
                              type="button"
                              className={`text-xs px-3 py-1.5 rounded-full ${
                                selectedQuery === query
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                              }`}
                              onClick={() => setSelectedQuery(query)}
                            >
                              Query {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>

              {/* Pasul 2-3: Procesare boți */}
              <SafeAnimatePresence>
                {currentStep >= 2 && showBotResponses && (
                  <MotionDiv
                    key="bot-responses"
                    className="mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, staggerChildren: 0.1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.values(detailedBotResponses).map((bot, idx) => (
                        <MotionDiv
                          key={bot.name}
                          className={`bg-card/50 border border-border rounded-lg p-4 transition-all duration-300 ${
                            expandedBot === bot.name ? 'col-span-2' : ''
                          }`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          onClick={() => toggleBotExpansion(bot.name)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full bg-${bot.color}/20 flex items-center justify-center`}
                            >
                              {bot.icon}
                            </div>
                            <span className="font-medium">{bot.name}</span>
                            <div className="flex-1"></div>
                            <MotionDiv
                              animate={{ rotate: expandedBot === bot.name ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </MotionDiv>
                          </div>
                          <p className="text-sm text-muted-foreground">{bot.response}</p>
                        </MotionDiv>
                      ))}
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>

              {/* Pasul 4-5: Răspuns final integrat */}
              <SafeAnimatePresence>
                {currentStep >= 4 && showFinalResponse && (
                  <MotionDiv
                    key="final-response"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-card p-4 rounded-lg rounded-tl-none">
                          <div className="prose prose-invert max-w-none">
                            {isTyping ? (
                              <>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: typedText.replace(/\n/g, '<br>'),
                                  }}
                                />
                                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
                              </>
                            ) : (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: typedText.replace(/\n/g, '<br>'),
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                )}
              </SafeAnimatePresence>
            </div>

            {/* Controale demo */}
            <div className="flex justify-center">
              <Button
                onClick={startDemo}
                className="bg-gradient-to-r from-primary to-gold text-white hover:from-primary/90 hover:to-gold/90"
                disabled={isAutoPlaying}
              >
                {isAutoPlaying ? 'Demo Running...' : 'Start Interactive Demo'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Descriere demo */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This interactive demonstration shows how our platform processes requests through
            multiple specialized AI systems and integrates their responses into a comprehensive
            answer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EnhancedInteractiveDemo;
