import { useState, useEffect, useRef } from 'react';
import { Send, Loader, Plus, Sparkles } from 'lucide-react';
import { useVocabulary } from '../../contexts/VocabularyContext';
import { useLearning } from '../../contexts/LearningContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  translation?: string;
}

interface LessonChatProps {
  lessonId: string;
  lessonTitle: string;
  conversationPrompts: string[];
  vocabularyList: Array<{ german: string; english: string; type: string }>;
  themeId: string;
}

export default function LessonChat({
  lessonTitle,
  conversationPrompts,
  vocabularyList,
  themeId,
}: LessonChatProps) {
  const { addWord } = useVocabulary();
  const { getAdaptiveDifficultyPrompt } = useLearning();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [detectedWords, setDetectedWords] = useState<Array<{ german: string; english: string }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `Hallo! Willkommen zum "${lessonTitle}" Übungsgespräch. Let's practice together! Choose a scenario below or just start chatting in German. 😊`,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
  };

  const extractNewVocabulary = (germanText: string): Array<{ german: string; english: string }> => {
    const words: Array<{ german: string; english: string }> = [];

    // Simple word extraction - look for words in the conversation that might be new
    const germanWords = germanText
      .split(/[\s,.!?;:]+/)
      .filter(word => word.length > 2)
      .map(word => word.trim());

    // Check against lesson vocabulary
    germanWords.forEach(word => {
      const vocabItem = vocabularyList.find(
        v => v.german.toLowerCase().includes(word.toLowerCase())
      );
      if (vocabItem) {
        words.push({ german: vocabItem.german, english: vocabItem.english });
      }
    });

    return words;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build context-aware system prompt
      const adaptivePrompt = getAdaptiveDifficultyPrompt();
      const lessonContext = `You are helping the student practice German in a lesson about "${lessonTitle}" (theme: ${themeId}). Focus on these vocabulary words: ${vocabularyList.map(v => v.german).join(', ')}. ${adaptivePrompt}`;

      const systemPrompt = `${lessonContext}\n\nRespond in German with occasional English explanations for difficult concepts. Keep responses conversational and educational. If the user makes a mistake, gently correct them and explain why.`;

      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          conversationHistory,
          systemPrompt,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Extract vocabulary from the conversation
      const newWords = extractNewVocabulary(data.response);
      if (newWords.length > 0) {
        setDetectedWords(prev => {
          const combined = [...prev, ...newWords];
          // Remove duplicates
          return combined.filter((word, idx, arr) =>
            arr.findIndex(w => w.german === word.german) === idx
          );
        });
      }
    } catch (error) {
      console.error('Error in lesson chat:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Entschuldigung! There was an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToVocabulary = async (word: { german: string; english: string }) => {
    try {
      await addWord({
        germanWord: word.german,
        englishTranslation: word.english,
        themeId: themeId,
        difficultyLevel: 'beginner',
      });
      // Remove from detected words after adding
      setDetectedWords(prev => prev.filter(w => w.german !== word.german));
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border-2 border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-duolingo-green to-green-600 text-white rounded-t-lg">
        <Sparkles className="w-6 h-6" />
        <div>
          <h3 className="font-bold text-lg">AI Practice Chat</h3>
          <p className="text-sm text-green-50">Practice {lessonTitle} with your AI tutor</p>
        </div>
      </div>

      {/* Conversation Prompts */}
      {conversationPrompts.length > 0 && messages.length <= 1 && (
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
          <p className="text-sm font-semibold text-blue-800 mb-2">🎯 Try these scenarios:</p>
          <div className="flex flex-wrap gap-2">
            {conversationPrompts.slice(0, 3).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptSelect(prompt)}
                className="px-3 py-2 bg-white text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors border border-blue-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Detected Vocabulary Panel */}
      {detectedWords.length > 0 && (
        <div className="px-6 py-3 bg-yellow-50 border-b border-yellow-100">
          <p className="text-sm font-semibold text-yellow-800 mb-2">💡 New vocabulary detected:</p>
          <div className="flex flex-wrap gap-2">
            {detectedWords.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleAddToVocabulary(word)}
                className="group flex items-center gap-2 px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm hover:bg-yellow-100 transition-colors border border-yellow-200"
              >
                <span className="font-bold">{word.german}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-600">{word.english}</span>
                <Plus className="w-4 h-4 text-yellow-600 group-hover:scale-110 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-duolingo-green text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              {message.translation && (
                <p className="text-sm mt-2 opacity-75 italic">{message.translation}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <Loader className="w-5 h-5 text-gray-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-6 py-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type in German... (or choose a scenario above)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duolingo-green focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Tip: The AI will adjust to your level and help you practice the vocabulary from this lesson!
        </p>
      </form>
    </div>
  );
}
