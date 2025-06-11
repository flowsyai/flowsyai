import React, { useState, useRef, useEffect } from 'react';
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

import {
  Send,
  Bot,
  User,
  Sparkles,
  Zap,
  BrainCircuit,
  MessageSquare,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIResponse {
  content: string;
  delay: number;
}

function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let particlesInstance: { destroy: () => void } | null = null;

    const initParticles = async () => {
      await loadSlim(tsParticles);

      particlesInstance = await tsParticles.load({
        id: 'tsparticles-ai-demo',
        options: {
          background: { color: 'transparent' },
          fpsLimit: 60,
          particles: {
            number: {
              value: 30,
              density: { enable: true, width: 800, height: 600 },
            },
            color: {
              value: ['#0078FF', '#FFCC33', '#D6DAE3'],
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.2,
              random: true,
              anim: {
                enable: true,
                speed: 0.3,
                opacity_min: 0.05,
                sync: false,
              },
            },
            size: {
              value: 2,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                size_min: 0.5,
                sync: false,
              },
            },
            links: {
              enable: true,
              color: '#0078FF',
              opacity: 0.1,
              distance: 80,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.3,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'bounce' },
            },
          },
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onHover: { enable: true, mode: 'repulse' },
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 60, duration: 0.4 },
            },
          },
          detectRetina: true,
        },
      });
    };

    initParticles();

    return () => {
      if (particlesInstance) {
        particlesInstance.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}

const InteractiveAIDemo: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "👋 Welcome to AI Flow! I'm your intelligent assistant ready to demonstrate our powerful workflow automation platform. I can show you how to build AI workflows, connect multiple models, automate business processes, and scale your operations. What would you like to explore first?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Response Generator - Simulates intelligent responses
  const generateAIResponse = (userInput: string): AIResponse => {
    const input = userInput.toLowerCase();

    // Workflow-related responses
    if (input.includes('workflow') || input.includes('automation') || input.includes('process')) {
      return {
        content: `Great question about workflows! Bot Architect Studio allows you to create visual AI workflows by connecting different AI agents. For example, you could create a workflow that:

• Takes text input → Analyzes sentiment → Generates response → Formats output
• Processes images → Extracts text → Translates → Summarizes
• Monitors data → Detects patterns → Sends alerts → Updates dashboard

Each workflow is built using drag-and-drop nodes, making complex AI orchestration accessible to everyone. Would you like me to show you a specific workflow example?`,
        delay: 2000,
      };
    }

    // Platform capabilities
    if (
      input.includes('what can') ||
      input.includes('capabilities') ||
      input.includes('features')
    ) {
      return {
        content: `Bot Architect Studio offers powerful AI orchestration capabilities:

🤖 **50+ AI Agents**: Text analysis, image generation, data processing, and more
🔗 **Visual Workflow Builder**: Drag-and-drop interface for creating complex automations
⚡ **Real-time Processing**: Instant results with live data flow visualization
🎯 **Smart Routing**: Automatically directs tasks to the most suitable AI agent
📊 **Analytics Dashboard**: Monitor performance and optimize your workflows
🔧 **Custom Integrations**: Connect with your existing tools and APIs

The platform is designed to make AI accessible to everyone, from beginners to enterprise teams. What specific use case are you interested in?`,
        delay: 2500,
      };
    }

    // Pricing and plans
    if (
      input.includes('price') ||
      input.includes('cost') ||
      input.includes('plan') ||
      input.includes('subscription')
    ) {
      return {
        content: `We offer flexible pricing to suit different needs:

💫 **Starter (Free)**: 3 AI agents, 5 workflows, basic templates
🚀 **Professional ($29/month)**: 15 AI agents, unlimited workflows, premium features
🏢 **Enterprise ($99/month)**: Unlimited everything, custom integrations, 24/7 support

All plans include our visual workflow builder, real-time processing, and community support. Plus, we offer a 30-day money-back guarantee. Would you like to start with our free tier to explore the platform?`,
        delay: 2000,
      };
    }

    // Getting started
    if (
      input.includes('start') ||
      input.includes('begin') ||
      input.includes('how to') ||
      input.includes('tutorial')
    ) {
      return {
        content: `Getting started is easy! Here's your path to AI automation success:

1️⃣ **Sign up** for a free account (takes 30 seconds)
2️⃣ **Choose a template** from our library of pre-built workflows
3️⃣ **Customize** by dragging and dropping AI agents
4️⃣ **Test** your workflow with sample data
5️⃣ **Deploy** and start automating your tasks

Our visual interface means no coding required! You can create your first workflow in under 5 minutes. Want me to guide you through creating a specific type of workflow?`,
        delay: 2200,
      };
    }

    // AI and technology
    if (
      input.includes('ai') ||
      input.includes('artificial intelligence') ||
      input.includes('machine learning') ||
      input.includes('technology')
    ) {
      return {
        content: `Bot Architect Studio leverages cutting-edge AI technology:

🧠 **Multiple AI Models**: We integrate GPT, Claude, Gemini, and specialized models
🔄 **Intelligent Orchestration**: Our system automatically routes tasks to the best AI for each job
⚡ **Real-time Processing**: Advanced caching and optimization for instant results
🛡️ **Enterprise Security**: End-to-end encryption and SOC 2 compliance
📈 **Continuous Learning**: Our platform improves based on usage patterns

The magic happens when different AI models work together - each contributing their strengths to solve complex problems. It's like having a team of AI specialists at your fingertips!`,
        delay: 2300,
      };
    }

    // Examples and use cases
    if (
      input.includes('example') ||
      input.includes('use case') ||
      input.includes('demo') ||
      input.includes('show me')
    ) {
      return {
        content: `Here are some popular workflow examples our users love:

📝 **Content Creation Pipeline**:
Input topic → Research → Write article → Generate images → Format for social media

📊 **Data Analysis Workflow**:
Upload CSV → Clean data → Analyze patterns → Generate insights → Create visualizations

🎯 **Customer Support Automation**:
Receive inquiry → Classify urgency → Route to specialist → Generate response → Follow up

🔍 **Market Research Assistant**:
Input company name → Gather data → Analyze competitors → Generate report → Send summary

Each workflow can be customized for your specific needs. Which type of automation interests you most?`,
        delay: 2400,
      };
    }

    // Default intelligent response
    const responses = [
      `That's an interesting question! Bot Architect Studio can help with a wide variety of AI automation tasks. Our platform connects multiple AI models to create powerful workflows that would be impossible with a single AI.

Whether you're looking to automate content creation, data analysis, customer support, or any other process, our visual workflow builder makes it simple to orchestrate complex AI operations.

What specific challenge are you trying to solve? I'd love to suggest a workflow that could help!`,

      `I'd be happy to help you explore that! Bot Architect Studio specializes in making AI accessible through visual workflows.

Our platform allows you to combine different AI capabilities - like text analysis, image generation, data processing, and more - into seamless automated processes.

Could you tell me more about what you're hoping to accomplish? I can suggest specific AI agents and workflow patterns that might be perfect for your needs.`,

      `Great question! The power of Bot Architect Studio lies in its ability to orchestrate multiple AI systems working together. Instead of using just one AI model, you can create workflows that leverage the best of each specialized AI.

For example, you might use one AI for text analysis, another for image generation, and a third for data visualization - all connected in a single, automated workflow.

What type of project or automation are you considering? I can help you design the perfect AI workflow!`,
    ];

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      delay: 1800,
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Generate AI response
    const response = generateAIResponse(inputValue);

    // Simulate typing delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, response.delay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'How do AI workflows work?',
    'What can I automate?',
    'Show me pricing plans',
    'How do I get started?',
  ];

  return (
    <section
      id="interactive-demo"
      className="py-24 md:py-32 relative overflow-hidden conversion-hero"
    >
      {/* Particles Background */}
      <ParticlesBackground />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <MotionDiv
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Live Demo Badge */}
          <MotionDiv
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="social-proof-badge px-6 py-3 rounded-full flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-sm font-semibold">Live Interactive Demo</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </MotionDiv>

          <MotionDiv
            className="w-20 h-20 mx-auto mb-8 rounded-full premium-card flex items-center justify-center border border-primary/20 shadow-lg premium-shadow relative overflow-hidden group wow-factor-animation"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <MotionDiv
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-sapphire to-primary bg-[length:200%_200%] animate-gradient-slow"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-background animate-pulse-scale" />
              </div>
            </MotionDiv>
          </MotionDiv>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-serif">
            Try <span className="premium-gradient-text">AI Flow</span> Right Now
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the power of AI workflow automation firsthand. Chat with our intelligent
            assistant to explore features, see real examples, and discover how AI Flow can transform
            your business processes in minutes.
          </p>
        </MotionDiv>

        {/* Interactive Chat Interface */}
        <MotionDiv
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="interactive-demo-container rounded-3xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary/10 via-sapphire/10 to-emerald/10 p-6 border-b border-border-alt">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary via-sapphire to-emerald flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AI Flow Assistant</h3>
                    <p className="text-sm text-muted-foreground">Powered by Advanced AI Models</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Live Demo</span>
                  </div>
                  <div className="social-proof-badge px-3 py-1 rounded-full">
                    <span className="text-xs font-medium">Try Free</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-background/50">
              <SafeAnimatePresence>
                {messages.map(message => (
                  <MotionDiv
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-sapphire to-primary'
                            : 'bg-gradient-to-r from-primary to-gold'
                        }`}
                      >
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-background" />
                        ) : (
                          <Bot className="w-4 h-4 text-background" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-sapphire to-primary text-background'
                            : 'bg-card border border-border-alt text-foreground'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-2 opacity-70 ${
                            message.type === 'user' ? 'text-background/70' : 'text-muted-foreground'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </SafeAnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-gold flex items-center justify-center">
                      <Bot className="w-4 h-4 text-background" />
                    </div>
                    <div className="bg-card border border-border-alt rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce typing-dot-2"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce typing-dot-3"></div>
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border-alt bg-card/30">
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <MotionDiv
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-muted-foreground mb-3" id="ai-demo-description">
                    Try asking:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="text-xs px-3 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20 micro-interaction"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </MotionDiv>
              )}

              {/* Input Field */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about AI workflows, features, pricing..."
                    className="pr-12 bg-background/50 border-border-alt focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
                    disabled={isTyping}
                    aria-label="AI assistant chat input"
                    aria-describedby="ai-demo-description"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message to AI assistant"
                  className="bg-gradient-to-r from-primary to-sapphire text-background hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-50"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Footer Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  This AI assistant demonstrates our platform's natural language capabilities.
                  <span className="text-primary"> Real workflows can be even more powerful!</span>
                </p>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Call to Action */}
        <MotionDiv
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="premium-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 premium-gradient-text">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Join 10,000+ professionals who've already automated their workflows with AI Flow.
              Start building your first AI workflow in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="conversion-cta text-white font-bold rounded-xl px-8 py-6 text-lg"
                asChild
              >
                <Link to="/ai-workflow-studio/new">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="premium-card border-2 border-primary/30 rounded-xl px-8 py-6 text-lg"
                asChild
              >
                <Link to="/pricing">View Pricing Plans</Link>
              </Button>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default InteractiveAIDemo;
