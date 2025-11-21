import { Tip } from '../types/index';
import { Lightbulb, MessageCircle, BookOpen, Globe } from 'lucide-react';

interface TipsPanelProps {
  tips: Tip[];
  commonPhrases?: Array<{ german: string; english: string }>;
}

export default function TipsPanel({ tips, commonPhrases }: TipsPanelProps) {
  const getIcon = (type: Tip['type']) => {
    switch (type) {
      case 'phrase':
        return <MessageCircle className="w-4 h-4" />;
      case 'grammar':
        return <BookOpen className="w-4 h-4" />;
      case 'vocabulary':
        return <Lightbulb className="w-4 h-4" />;
      case 'cultural':
        return <Globe className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getColor = (type: Tip['type']) => {
    switch (type) {
      case 'phrase':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'grammar':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'vocabulary':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'cultural':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="card bg-gradient-to-br from-white to-warm-bg">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-duolingo-yellow" />
        <h3 className="text-lg font-display font-bold text-gray-800">
          Helpful Tips & Phrases
        </h3>
      </div>

      {/* Contextual Tips */}
      {tips.length > 0 && (
        <div className="space-y-2 mb-4">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className={`p-3 rounded-lg border-2 ${getColor(tip.type)} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(tip.type)}
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-wide mb-1">
                    {tip.title}
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {tip.content}
                  </p>
                  {tip.german && tip.english && (
                    <div className="mt-2 text-xs space-y-1">
                      <p className="font-semibold">🇩🇪 {tip.german}</p>
                      <p className="opacity-75">🇬🇧 {tip.english}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Common Phrases for this scenario */}
      {commonPhrases && commonPhrases.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            Common Phrases
          </h4>
          <div className="space-y-2">
            {commonPhrases.map((phrase, index) => (
              <div
                key={index}
                className="p-2 bg-white rounded-lg border border-gray-200 hover:border-duolingo-blue transition-colors"
              >
                <p className="text-sm font-medium text-gray-800">
                  {phrase.german}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {phrase.english}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tips.length === 0 && (!commonPhrases || commonPhrases.length === 0) && (
        <p className="text-sm text-gray-500 text-center py-4">
          Keep practicing! Tips will appear here based on your conversation.
        </p>
      )}
    </div>
  );
}
