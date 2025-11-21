import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Zap, Trophy, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLearning } from '../../contexts/LearningContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isChallenge?: boolean;
}

interface ChallengeStageProps {
  challengeScenario: string;
  challengeDescription: string;
  lessonTheme: string;
  vocabularyList: any[];
  onComplete: (score: number) => void;
}

export const ChallengeStage: React.FC<ChallengeStageProps> = ({
  challengeScenario,
  challengeDescription,
  lessonTheme,
  vocabularyList,
  onComplete,
}) => {
  const { user } = useAuth();
  const { getAdaptiveDifficultyPrompt } = useLearning();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [challengeActive, setChallengeActive] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [challengeScore, setChallengeScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const MIN_MESSAGES = 3; // Minimum messages to complete challenge
  const MAX_MESSAGES = 10; // Maximum messages before auto-complete

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startChallenge = () => {
    setChallengeActive(true);
    setMessages([
      {
        role: 'assistant',
        content: challengeScenario,
        isChallenge: true,
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setMessageCount((prev) => prev + 1);

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          theme: lessonTheme,
          conversationHistory: messages,
          challengeMode: true,
          challengeContext: challengeDescription,
          userLevel: user?.current_level || 'A1',
          adaptivePrompt: getAdaptiveDifficultyPrompt(),
          vocabularyList: vocabularyList,
        }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.response,
          },
        ]);

        // Update score based on response quality
        if (data.qualityScore) {
          setChallengeScore((prev) => prev + data.qualityScore);
        }
      }
    } catch (error) {
      console.error('Error in challenge:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Entschuldigung, there was an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const finishChallenge = () => {
    // Calculate final score (0-100)
    const baseScore = Math.min(100, (messageCount / MIN_MESSAGES) * 70);
    const qualityBonus = Math.min(30, challengeScore);
    const finalScore = Math.round(baseScore + qualityBonus);
    onComplete(finalScore);
  };

  const canFinish = messageCount >= MIN_MESSAGES;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Challenge Header */}
      {!challengeActive ? (
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-8 rounded-xl border-2 border-orange-300 dark:border-orange-700">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">⚡</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Challenge Time!
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {challengeDescription}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              What to expect:
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>An unexpected twist in your conversation scenario</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Use what you've learned creatively</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>There's no single "right" answer - be natural!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Have at least {MIN_MESSAGES} exchanges to complete</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startChallenge}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Zap className="w-6 h-6" />
              Start Challenge
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Indicator */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400 animate-pulse" />
                <span className="font-bold text-gray-900 dark:text-white">
                  Challenge Active
                </span>
              </div>
              <div className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                {messageCount}/{MIN_MESSAGES} messages
                {canFinish && (
                  <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.isChallenge
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    } p-4 rounded-2xl shadow-sm ${
                      message.isChallenge ? 'border-2 border-yellow-400' : ''
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        {message.isChallenge && (
                          <Zap className="w-4 h-4 text-yellow-300" />
                        )}
                        <button
                          onClick={() => speakText(message.content)}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-0">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Handle the challenge in German..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>

          {/* Finish Button */}
          {canFinish && (
            <div className="flex justify-center">
              <button
                onClick={finishChallenge}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Trophy className="w-6 h-6" />
                Complete Challenge
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
