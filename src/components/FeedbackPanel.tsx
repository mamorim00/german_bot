import { Correction } from '../types/index';
import { CheckCircle2, AlertCircle, Lightbulb, BookOpen, Volume2, Globe } from 'lucide-react';

interface FeedbackPanelProps {
  corrections: Correction[];
  hasErrors: boolean;
  positiveReinforcement?: string;
}

export default function FeedbackPanel({ corrections, hasErrors, positiveReinforcement }: FeedbackPanelProps) {
  if (corrections.length === 0 && !positiveReinforcement) {
    return null;
  }

  const getIcon = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return <BookOpen className="w-5 h-5" />;
      case 'vocabulary':
        return <Lightbulb className="w-5 h-5" />;
      case 'pronunciation':
        return <Volume2 className="w-5 h-5" />;
      case 'cultural':
        return <Globe className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getColor = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'vocabulary':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'pronunciation':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'cultural':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getTypeLabel = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return 'Grammar';
      case 'vocabulary':
        return 'Vocabulary';
      case 'pronunciation':
        return 'Pronunciation';
      case 'cultural':
        return 'Cultural Tip';
      default:
        return type;
    }
  };

  return (
    <div className="card bg-gradient-to-br from-warm-bg to-white">
      <div className="flex items-center gap-3 mb-4">
        {hasErrors ? (
          <>
            <AlertCircle className="w-6 h-6 text-duolingo-orange" />
            <h3 className="text-lg font-display font-bold text-gray-800">
              Let's improve together! 💪
            </h3>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-6 h-6 text-duolingo-green" />
            <h3 className="text-lg font-display font-bold text-gray-800">
              Sehr gut! 🎉
            </h3>
          </>
        )}
      </div>

      {/* Positive Reinforcement */}
      {positiveReinforcement && !hasErrors && (
        <div className="mb-4 p-3 bg-duolingo-green bg-opacity-10 rounded-xl border-2 border-duolingo-green border-opacity-20">
          <p className="text-sm font-medium text-duolingo-green">
            {positiveReinforcement}
          </p>
        </div>
      )}

      {/* Corrections and Feedback */}
      <div className="space-y-3">
        {corrections.map((correction, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border-2 ${getColor(correction.type)} transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(correction.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wide">
                    {getTypeLabel(correction.type)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed font-medium mb-2">
                  {correction.text}
                </p>

                {/* Detailed Explanation */}
                {correction.explanation && (
                  <div className="mt-2 p-2 bg-white bg-opacity-50 rounded-lg">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <span className="font-semibold">Why: </span>
                      {correction.explanation}
                    </p>
                  </div>
                )}

                {/* Example */}
                {correction.example && (
                  <div className="mt-2 p-2 bg-white bg-opacity-50 rounded-lg">
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Example: </span>
                      {correction.example}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Encouragement */}
      {!hasErrors && corrections.length === 0 && (
        <div className="mt-4 p-3 bg-duolingo-green bg-opacity-10 rounded-xl text-center">
          <p className="text-sm font-semibold text-duolingo-green">
            Keep up the great work! Continue practicing! 🚀
          </p>
        </div>
      )}

      {hasErrors && (
        <div className="mt-4 p-3 bg-duolingo-yellow bg-opacity-10 rounded-xl text-center">
          <p className="text-sm font-medium text-gray-700">
            Don't worry! Making mistakes is how we learn. Keep practicing! 💡
          </p>
        </div>
      )}
    </div>
  );
}
