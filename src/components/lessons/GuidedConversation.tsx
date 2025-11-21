import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Lightbulb, CheckCircle, MessageCircle } from 'lucide-react';
import { useLearning } from '../../contexts/LearningContext';

interface ConversationStep {
  id: number;
  aiMessage: string;
  prompt: string;
  hints?: string[];
  expectedPhrases?: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  feedback?: string;
}

interface GuidedConversationProps {
  conversationSteps: ConversationStep[];
  lessonTheme: string;
  vocabularyList: any[];
  onComplete: () => void;
}

export const GuidedConversation: React.FC<GuidedConversationProps> = ({
  conversationSteps,
  lessonTheme,
  vocabularyList,
  onComplete,
}) => {
  const { getAdaptiveDifficultyPrompt, userLevel } = useLearning();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStepData = conversationSteps[currentStep];
  const allStepsCompleted = completedSteps.size === conversationSteps.length;

  useEffect(() => {
    // Initialize with first AI message
    if (messages.length === 0 && currentStepData) {
      setMessages([
        {
          role: 'assistant',
          content: currentStepData.aiMessage,
        },
      ]);
    }
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

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
          guidedMode: true,
          currentStep: currentStepData,
          userLevel: userLevel || 'A1',
          adaptivePrompt: getAdaptiveDifficultyPrompt(),
          vocabularyList: vocabularyList,
        }),
      });

      const data = await response.json();

      if (data.response) {
        // Check if user's response was appropriate for the step
        const isStepComplete = checkStepCompletion(userMessage, currentStepData);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.response,
            feedback: data.feedback,
          },
        ]);

        // If step completed, mark it and move to next
        if (isStepComplete && !completedSteps.has(currentStep)) {
          const newCompleted = new Set(completedSteps);
          newCompleted.add(currentStep);
          setCompletedSteps(newCompleted);

          // Move to next step after a brief delay
          if (currentStep < conversationSteps.length - 1) {
            setTimeout(() => {
              setCurrentStep(currentStep + 1);
              setShowHints(false);
              // Add next step's AI message
              setMessages((prev) => [
                ...prev,
                {
                  role: 'assistant',
                  content: conversationSteps[currentStep + 1].aiMessage,
                },
              ]);
            }, 1500);
          }
        }
      }
    } catch (error) {
      console.error('Error in guided conversation:', error);
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

  const checkStepCompletion = (userMessage: string, step: ConversationStep): boolean => {
    if (!step.expectedPhrases || step.expectedPhrases.length === 0) {
      return true; // Auto-complete if no expected phrases
    }

    const normalizedMessage = userMessage.toLowerCase();
    return step.expectedPhrases.some((phrase) =>
      normalizedMessage.includes(phrase.toLowerCase())
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            Guided Practice
          </h2>
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Step {currentStep + 1} of {conversationSteps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / conversationSteps.length) * 100}%`,
            }}
          />
        </div>

        {/* Current Prompt */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your task:</p>
          <p className="text-gray-900 dark:text-white font-medium">
            {currentStepData.prompt}
          </p>
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
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                } p-4 rounded-2xl shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'assistant' && (
                    <>
                      <MessageCircle className="w-4 h-4 opacity-70" />
                      <button
                        onClick={() => speakText(message.content)}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">{message.content}</p>
                {message.feedback && (
                  <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-600">
                    <p className="text-sm opacity-90">💡 {message.feedback}</p>
                  </div>
                )}
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

        {/* Hints Section */}
        {currentStepData.hints && currentStepData.hints.length > 0 && (
          <div className="px-6 pb-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-medium">
                {showHints ? 'Hide hints' : 'Need a hint?'}
              </span>
            </button>
            {showHints && (
              <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg space-y-1">
                {currentStepData.hints.map((hint, index) => (
                  <p key={index} className="text-sm text-amber-800 dark:text-amber-300">
                    • {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response in German..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading || allStepsCompleted}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || allStepsCompleted}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Completion Button */}
      {allStepsCompleted && (
        <div className="flex justify-center">
          <button
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <CheckCircle className="w-6 h-6" />
            Continue to Free Practice
          </button>
        </div>
      )}
    </div>
  );
};
