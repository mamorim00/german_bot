import { Correction } from '../types/index';
import { CheckCircle2, AlertCircle, Lightbulb, BookOpen } from 'lucide-react';

interface FeedbackPanelProps {
  corrections: Correction[];
  hasErrors: boolean;
}

export default function FeedbackPanel({ corrections, hasErrors }: FeedbackPanelProps) {
  if (corrections.length === 0) {
    return null;
  }

  const getIcon = (type: Correction['type']) => {
    switch (type) {
      case 'grammar':
        return <BookOpen className="w-5 h-5" />;
      case 'vocabulary':
        return <Lightbulb className="w-5 h-5" />;
      case 'pronunciation':
        return <AlertCircle className="w-5 h-5" />;
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
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
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
                    {correction.type}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {correction.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!hasErrors && (
        <div className="mt-4 p-3 bg-duolingo-green bg-opacity-10 rounded-xl text-center">
          <p className="text-sm font-semibold text-duolingo-green">
            Keep up the great work! Continue practicing! 🚀
          </p>
        </div>
      )}
    </div>
  );
}
