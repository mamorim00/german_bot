import { CharacterMood } from '../types/index';
import { Smile, Sparkles, ThumbsUp, Lightbulb } from 'lucide-react';

interface CharacterProps {
  mood: CharacterMood;
  isSpeaking?: boolean;
}

export default function Character({ mood, isSpeaking }: CharacterProps) {
  const getMoodEmoji = () => {
    switch (mood) {
      case 'happy':
        return <Smile className="w-12 h-12 text-duolingo-yellow" />;
      case 'celebrating':
        return <Sparkles className="w-12 h-12 text-duolingo-purple" />;
      case 'encouraging':
        return <ThumbsUp className="w-12 h-12 text-duolingo-green" />;
      case 'thinking':
        return <Lightbulb className="w-12 h-12 text-duolingo-orange" />;
      default:
        return <Smile className="w-12 h-12 text-duolingo-yellow" />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'happy':
        return 'bg-gradient-to-br from-yellow-400 to-orange-400';
      case 'celebrating':
        return 'bg-gradient-to-br from-purple-400 to-pink-400';
      case 'encouraging':
        return 'bg-gradient-to-br from-green-400 to-emerald-400';
      case 'thinking':
        return 'bg-gradient-to-br from-blue-400 to-cyan-400';
      default:
        return 'bg-gradient-to-br from-yellow-400 to-orange-400';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-32 h-32 ${getMoodColor()} rounded-full shadow-lg flex items-center justify-center ${
          isSpeaking ? 'animate-pulse' : 'animate-bounce-soft'
        } transition-all duration-300`}
      >
        {getMoodEmoji()}

        {/* Decorative circles */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white rounded-full opacity-60"></div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-display font-bold text-gray-800">
          Hallo! 👋
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Ich bin dein Sprachlehrer
        </p>
      </div>

      {isSpeaking && (
        <div className="mt-3 flex gap-1">
          <div className="w-2 h-2 bg-duolingo-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-duolingo-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-duolingo-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      )}
    </div>
  );
}
