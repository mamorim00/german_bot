import { useState, useEffect, useRef } from 'react';
import ThemeSelector from './components/ThemeSelector';
import Character from './components/Character';
import VoiceRecorder from './components/VoiceRecorder';
import ConversationView from './components/ConversationView';
import FeedbackPanel from './components/FeedbackPanel';
import { Theme, Message, Correction, CharacterMood } from './types/index';
import { ArrowLeft, Sparkles } from 'lucide-react';

function App() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [characterMood, setCharacterMood] = useState<CharacterMood>('happy');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const conversationHistoryRef = useRef<Array<{ role: string; content: string }>>([]);

  useEffect(() => {
    // Greet the user when a theme is selected
    if (selectedTheme && messages.length === 0) {
      const greeting = getGreeting();
      addMessage('assistant', greeting);
    }
  }, [selectedTheme]);

  const getGreeting = () => {
    const greetings = [
      'Hallo! Ich freue mich, mit dir zu üben. Wie geht es dir?',
      'Guten Tag! Lass uns zusammen Deutsch üben!',
      'Hey! Schön, dass du da bist. Sollen wir anfangen?',
      'Hallo! Bereit für ein Gespräch auf Deutsch?',
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const addMessage = (role: 'user' | 'assistant', content: string, audioUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      audioUrl,
    };
    setMessages((prev) => [...prev, newMessage]);
    conversationHistoryRef.current.push({ role, content });
  };

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setMessages([]);
    setCorrections([]);
    conversationHistoryRef.current = [];
    setCharacterMood('happy');
  };

  const handleTranscription = async (text: string) => {
    if (!selectedTheme) return;

    // Add user message
    addMessage('user', text);
    setIsProcessing(true);
    setCharacterMood('thinking');

    try {
      // Send to conversation API
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          theme: selectedTheme,
          conversationHistory: conversationHistoryRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Update corrections
      setCorrections(data.corrections || []);
      setHasErrors(data.hasErrors || false);

      // Set character mood based on errors
      if (!data.hasErrors) {
        setCharacterMood('celebrating');
      } else {
        setCharacterMood('encouraging');
      }

      // Get TTS for the response
      const audioBlob = await textToSpeech(data.response);
      const audioUrl = URL.createObjectURL(audioBlob);

      // Add assistant message
      addMessage('assistant', data.response, audioUrl);

      // Auto-play the response
      playAudio(audioUrl);

      // Reset mood after celebration
      setTimeout(() => {
        setCharacterMood('happy');
      }, 3000);
    } catch (error) {
      console.error('Conversation error:', error);
      alert('Failed to process your message. Please try again.');
      setCharacterMood('happy');
    } finally {
      setIsProcessing(false);
    }
  };

  const textToSpeech = async (text: string): Promise<Blob> => {
    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('TTS failed');
    }

    return await response.blob();
  };

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.onplay = () => setIsSpeaking(true);
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = () => setIsSpeaking(false);

    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
      setIsSpeaking(false);
    });
  };

  const resetConversation = () => {
    setSelectedTheme(null);
    setMessages([]);
    setCorrections([]);
    setCharacterMood('happy');
    conversationHistoryRef.current = [];
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  if (!selectedTheme) {
    return (
      <div className="min-h-screen bg-warm-bg py-12">
        <ThemeSelector onSelectTheme={handleThemeSelect} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={resetConversation}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Change Theme</span>
          </button>

          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 ${selectedTheme.color} rounded-full`}></div>
            <h2 className="text-xl font-display font-bold text-gray-800">
              {selectedTheme.name}
            </h2>
          </div>

          <div className="w-32"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Left Column - Character & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <Character mood={characterMood} isSpeaking={isSpeaking} />
          </div>

          <div className="card">
            <VoiceRecorder
              onTranscription={handleTranscription}
              isDisabled={isProcessing}
            />
          </div>

          {messages.length > 0 && (
            <div className="card bg-gradient-to-br from-duolingo-green to-duolingo-light-green text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-display font-bold">Progress</h3>
              </div>
              <p className="text-sm opacity-90">
                {messages.filter(m => m.role === 'user').length} messages sent
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Conversation & Feedback */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card h-[500px] flex flex-col p-0">
            <ConversationView messages={messages} onPlayAudio={playAudio} />
          </div>

          {corrections.length > 0 && (
            <FeedbackPanel corrections={corrections} hasErrors={hasErrors} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
