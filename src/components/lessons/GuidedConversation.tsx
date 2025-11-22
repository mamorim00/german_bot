import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, Lightbulb, CheckCircle, MessageCircle } from 'lucide-react';
import { useLearning } from '../../contexts/LearningContext';
import { speakGerman } from '../../utils/germanSpeech';

interface AnswerOption {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface ConversationStep {
  id: number;
  aiMessage: string;
  prompt: string;
  hints?: string[];
  expectedPhrases?: string[];
  options?: AnswerOption[];
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

  const speakText = async (text: string) => {
    await speakGerman(text, {
      rate: 0.85,
    });
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

  const handleOptionSelect = async (option: AnswerOption) => {
    if (isLoading) return;

    setIsLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: option.text }]);

    // Add AI feedback response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: option.feedback,
        },
      ]);

      // If correct, mark step as complete and move to next
      if (option.isCorrect && !completedSteps.has(currentStep)) {
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
            setIsLoading(false);
          }, 1500);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 sm:p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🎯</span>
            <span className="hidden sm:inline">Guided Practice</span>
            <span className="sm:hidden">Practice</span>
          </h2>
          <div className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full">
            Step {currentStep + 1}/{conversationSteps.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-3">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500"
            style={{
              width: `${((currentStep + 1) / conversationSteps.length) * 100}%`,
            }}
          />
        </div>

        {/* Current Prompt */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Your task:</p>
          <p className="text-sm sm:text-base text-gray-900 dark:text-white font-medium">
            {currentStepData.prompt}
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 flex flex-col" style={{ height: 'calc(100vh - 400px)', minHeight: '400px', maxHeight: '600px' }}>
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 sm:gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-md ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                } p-3 sm:p-4 rounded-2xl shadow-sm`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 opacity-70" />
                    <button
                      onClick={() => speakText(message.content)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      aria-label="Play audio"
                    >
                      <Volume2 className="w-5 h-5 opacity-70 hover:opacity-100" />
                    </button>
                  </div>
                )}
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                {message.feedback && (
                  <div className="mt-2 pt-2 border-t border-white/20">
                    <p className="text-xs sm:text-sm opacity-90">💡 {message.feedback}</p>
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
          <div className="px-3 sm:px-6 pb-3 sm:pb-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors p-2 -ml-2"
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium">
                {showHints ? 'Hide hints' : 'Need a hint? 💡'}
              </span>
            </button>
            {showHints && (
              <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 p-3 sm:p-4 rounded-lg space-y-2 animate-fade-in">
                {currentStepData.hints.map((hint, index) => (
                  <p key={index} className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    • {hint}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Multiple Choice Options or Input Form */}
        {currentStepData.options && currentStepData.options.length > 0 ? (
          <div className="p-3 sm:p-6 pt-0 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
              Choose your response:
            </p>
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              {currentStepData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isLoading || allStepsCompleted}
                  className="w-full px-4 py-4 sm:py-5 text-left bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-98 shadow-sm hover:shadow-md"
                >
                  <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white leading-relaxed">
                    {option.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-3 sm:p-6 pt-0 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Antworten Sie auf Deutsch..."
                className="flex-1 px-4 py-3 sm:py-3 text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isLoading || allStepsCompleted}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || allStepsCompleted}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Send className="w-4 h-4" />
                <span>Send</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Completion Button */}
      {allStepsCompleted && (
        <div className="flex justify-center px-4 sm:px-0 animate-fade-in">
          <button
            onClick={onComplete}
            className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Continue to Free Practice →</span>
          </button>
        </div>
      )}
    </div>
  );
};
