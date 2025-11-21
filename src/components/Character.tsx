import { CharacterMood, CharacterPersona } from '../types/index';
import { Smile, Sparkles, ThumbsUp, Lightbulb } from 'lucide-react';

interface CharacterProps {
  mood: CharacterMood;
  isSpeaking?: boolean;
  persona?: CharacterPersona;
}

export default function Character({ mood, isSpeaking, persona }: CharacterProps) {
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

  const getMoodMessage = () => {
    if (!persona) return '';
    switch (mood) {
      case 'celebrating':
        return persona.catchphrases[Math.floor(Math.random() * persona.catchphrases.length)];
      case 'encouraging':
        return 'Kein Problem! Übung macht den Meister!';
      case 'thinking':
        return 'Hmm, lass mich nachdenken...';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-32 h-32 ${getMoodColor()} rounded-full shadow-lg flex items-center justify-center ${
          isSpeaking ? 'animate-pulse' : 'animate-bounce-soft'
        } transition-all duration-300`}
      >
        {persona ? (
          <span className="text-6xl">{persona.avatar}</span>
        ) : (
          getMoodEmoji()
        )}

        {/* Decorative circles */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full opacity-80"></div>
        <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-white rounded-full opacity-60"></div>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-2xl font-display font-bold text-gray-800">
          {persona ? persona.name : 'Hallo!'} 👋
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {persona ? persona.occupation : 'Ich bin dein Sprachlehrer'}
        </p>
        {persona && (
          <div className="mt-2 flex flex-wrap gap-1 justify-center">
            {persona.personality.slice(0, 3).map((trait) => (
              <span
                key={trait}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>

      {getMoodMessage() && mood !== 'happy' && (
        <div className="mt-3 max-w-xs text-center">
          <p className="text-sm italic text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            "{getMoodMessage()}"
          </p>
        </div>
      )}

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
