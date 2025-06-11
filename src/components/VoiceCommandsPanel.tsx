import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MotionDiv, SafeAnimatePresence } from '@/lib/motion-wrapper';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Settings,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Headphones,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface VoiceCommand {
  id: string;
  command: string;
  description: string;
  example: string;
  category: 'creation' | 'navigation' | 'editing' | 'execution';
}

interface VoiceCommandsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceCommand?: (command: string, params?: { transcript: string; confidence: number }) => void;
}

const VoiceCommandsPanel: React.FC<VoiceCommandsPanelProps> = ({
  isOpen,
  onClose,
  onVoiceCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('commands');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const voiceCommands: VoiceCommand[] = useMemo(
    () => [
      {
        id: '1',
        command: 'add node',
        description: 'Add a new node to the workflow',
        example: 'Add a trigger node',
        category: 'creation',
      },
      {
        id: '2',
        command: 'connect nodes',
        description: 'Connect two nodes together',
        example: 'Connect node A to node B',
        category: 'editing',
      },
      {
        id: '3',
        command: 'run workflow',
        description: 'Execute the current workflow',
        example: 'Run the workflow',
        category: 'execution',
      },
      {
        id: '4',
        command: 'save workflow',
        description: 'Save the current workflow',
        example: 'Save this workflow as email automation',
        category: 'editing',
      },
      {
        id: '5',
        command: 'delete node',
        description: 'Remove a node from the workflow',
        example: 'Delete the email node',
        category: 'editing',
      },
      {
        id: '6',
        command: 'zoom in',
        description: 'Zoom into the workflow canvas',
        example: 'Zoom in',
        category: 'navigation',
      },
      {
        id: '7',
        command: 'zoom out',
        description: 'Zoom out of the workflow canvas',
        example: 'Zoom out',
        category: 'navigation',
      },
      {
        id: '8',
        command: 'center view',
        description: 'Center the workflow view',
        example: 'Center the view',
        category: 'navigation',
      },
    ],
    []
  );

  const speak = useCallback(
    (text: string) => {
      if (synthRef.current && voiceEnabled) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        synthRef.current.speak(utterance);
      }
    },
    [voiceEnabled]
  );

  const processVoiceCommand = useCallback(
    async (transcript: string) => {
      setIsProcessing(true);
      setLastCommand(transcript);

      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const lowerTranscript = transcript.toLowerCase();
      let commandExecuted = false;

      // Match voice commands
      for (const cmd of voiceCommands) {
        if (lowerTranscript.includes(cmd.command)) {
          commandExecuted = true;

          if (onVoiceCommand) {
            onVoiceCommand(cmd.command, { transcript, confidence });
          }

          if (voiceEnabled) {
            speak(`Executing ${cmd.command}`);
          }

          toast.success(`Voice command executed: ${cmd.command}`);
          break;
        }
      }

      if (!commandExecuted) {
        if (voiceEnabled) {
          speak('Command not recognized. Please try again.');
        }
        toast.error('Command not recognized. Please try a different phrase.');
      }

      setIsProcessing(false);
    },
    [voiceCommands, onVoiceCommand, confidence, voiceEnabled, speak]
  );

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        (
          window as {
            webkitSpeechRecognition?: new () => SpeechRecognition;
            SpeechRecognition?: new () => SpeechRecognition;
          }
        ).webkitSpeechRecognition ||
        (
          window as {
            webkitSpeechRecognition?: new () => SpeechRecognition;
            SpeechRecognition?: new () => SpeechRecognition;
          }
        ).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: {
        resultIndex: number;
        results: {
          [index: number]: {
            [index: number]: { transcript: string; confidence: number };
            isFinal: boolean;
          };
        };
      }) => {
        let transcript = '';
        let confidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          confidence = event.results[i][0].confidence;
        }

        setCurrentTranscript(transcript);
        setConfidence(confidence * 100);

        if (event.results[event.results.length - 1].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: { error: string }) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Voice recognition error. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setCurrentTranscript('');
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [processVoiceCommand]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setCurrentTranscript('');
      setConfidence(0);
      recognitionRef.current.start();

      if (voiceEnabled) {
        speak('Listening for your command');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setCurrentTranscript('');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'creation':
        return <Sparkles className="h-4 w-4 text-purple-500" />;
      case 'navigation':
        return <Zap className="h-4 w-4 text-blue-500" />;
      case 'editing':
        return <Settings className="h-4 w-4 text-green-500" />;
      case 'execution':
        return <Play className="h-4 w-4 text-orange-500" />;
      default:
        return <Brain className="h-4 w-4 text-primary" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'creation':
        return 'bg-purple-500/10 text-purple-500';
      case 'navigation':
        return 'bg-blue-500/10 text-blue-500';
      case 'editing':
        return 'bg-green-500/10 text-green-500';
      case 'execution':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const tabs = [
    { id: 'commands', label: 'Commands', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <SafeAnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
        onClick={onClose}
      >
        <MotionDiv
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="premium-card bg-card border border-border-alt rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 border-b border-border-alt">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <Mic className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Voice Commands</h3>
                  <p className="text-sm text-muted-foreground">Control your workflow with voice</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setVoiceEnabled(!voiceEnabled)}>
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Voice Control Section */}
          <div className="p-6 border-b border-border-alt">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`w-16 h-16 rounded-full ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                >
                  {isProcessing ? (
                    <Brain className="h-6 w-6 animate-spin" />
                  ) : isListening ? (
                    <MicOff className="h-6 w-6" />
                  ) : (
                    <Mic className="h-6 w-6" />
                  )}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Click to start'}
                </p>
              </div>

              {(currentTranscript || lastCommand) && (
                <div className="flex-1 max-w-md">
                  <div className="p-4 bg-background/50 rounded-lg border border-border-alt">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        {isListening ? 'Current Input' : 'Last Command'}
                      </span>
                      {confidence > 0 && (
                        <Badge className="bg-primary/10 text-primary">
                          {Math.round(confidence)}% confidence
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentTranscript || lastCommand}
                    </p>
                    {confidence > 0 && <Progress value={confidence} className="h-1 mt-2" />}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-4">
            <div className="flex gap-2">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 ${activeTab === tab.id ? 'bg-primary' : ''}`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'commands' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {voiceCommands.map(command => (
                    <div
                      key={command.id}
                      className="p-4 bg-background/30 rounded-lg border border-border-alt"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(command.category)}
                        <span className="font-medium text-foreground">{command.command}</span>
                        <Badge className={getCategoryColor(command.category)}>
                          {command.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{command.description}</p>
                      <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        Example: "{command.example}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="p-4 bg-background/30 rounded-lg">
                  <h4 className="font-medium text-foreground mb-3">Voice Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Voice Feedback</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                      >
                        {voiceEnabled ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">Language</span>
                      <Button variant="outline" size="sm">
                        English (US)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-500">
                      Tips for Better Recognition
                    </span>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Speak clearly and at a normal pace</li>
                    <li>• Use the exact command phrases shown</li>
                    <li>• Ensure your microphone is working properly</li>
                    <li>• Minimize background noise</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </MotionDiv>
      </MotionDiv>
    </SafeAnimatePresence>
  );
};

export default VoiceCommandsPanel;
