import { useEffect, useState } from 'react';
import { Trophy, Star, Zap, Award, Sparkles } from 'lucide-react';

interface LessonCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  xpEarned: number;
  badge?: {
    name: string;
    icon: string;
    description: string;
  };
  lessonTitle: string;
}

export default function LessonCompletionModal({
  isOpen,
  onClose,
  score,
  xpEarned,
  badge,
  lessonTitle,
}: LessonCompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [animateXP, setAnimateXP] = useState(false);
  const [animateBadge, setAnimateBadge] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger animations in sequence
      setTimeout(() => setAnimateScore(true), 300);
      setTimeout(() => setAnimateXP(true), 800);
      if (badge) {
        setTimeout(() => setAnimateBadge(true), 1300);
      }
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
      setAnimateScore(false);
      setAnimateXP(false);
      setAnimateBadge(false);
    }
  }, [isOpen, badge]);

  if (!isOpen) return null;

  const isMastered = score >= 90;
  const isCompleted = score >= 70;
  const isPassed = score >= 50;

  const getGrade = () => {
    if (score >= 90) return { text: 'MASTERED!', color: 'text-duolingo-yellow', emoji: '👑' };
    if (score >= 70) return { text: 'COMPLETED!', color: 'text-duolingo-green', emoji: '🎉' };
    if (score >= 50) return { text: 'PASSED!', color: 'text-duolingo-blue', emoji: '✅' };
    return { text: 'TRY AGAIN', color: 'text-orange-500', emoji: '💪' };
  };

  const grade = getGrade();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      {/* Confetti Animation */}
      {showConfetti && isPassed && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              {['🎉', '⭐', '💫', '🏆', '✨'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Top Badge/Trophy */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 bg-gradient-to-br from-duolingo-yellow to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            {isMastered ? (
              <Trophy className="w-14 h-14 text-white" />
            ) : isCompleted ? (
              <Star className="w-14 h-14 text-white" />
            ) : (
              <Award className="w-14 h-14 text-white" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-16 text-center">
          {/* Grade */}
          <div className={`text-5xl font-display font-bold mb-2 ${grade.color} ${
            animateScore ? 'animate-scale-in' : 'opacity-0'
          }`}>
            {grade.emoji} {grade.text}
          </div>

          <p className="text-gray-600 mb-6">
            {lessonTitle}
          </p>

          {/* Score Display */}
          <div className={`mb-6 ${animateScore ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="inline-block bg-gradient-to-r from-duolingo-green to-green-600 text-white px-8 py-4 rounded-2xl">
              <div className="text-6xl font-bold">{Math.round(score)}%</div>
              <div className="text-sm uppercase tracking-wide">Your Score</div>
            </div>
          </div>

          {/* XP Reward */}
          <div className={`mb-6 transition-all duration-500 ${
            animateXP ? 'transform scale-100 opacity-100' : 'transform scale-0 opacity-0'
          }`}>
            <div className="flex items-center justify-center gap-3 bg-duolingo-blue bg-opacity-10 border-2 border-duolingo-blue rounded-xl p-4">
              <Zap className="w-8 h-8 text-duolingo-blue" />
              <div className="text-left">
                <div className="text-3xl font-bold text-duolingo-blue">+{xpEarned} XP</div>
                <div className="text-sm text-gray-600">Experience Earned</div>
              </div>
            </div>
          </div>

          {/* Badge Unlock */}
          {badge && (
            <div className={`mb-6 transition-all duration-700 ${
              animateBadge ? 'transform scale-100 opacity-100' : 'transform scale-0 opacity-0'
            }`}>
              <div className="bg-gradient-to-br from-duolingo-yellow to-orange-500 text-white rounded-xl p-6 relative overflow-hidden">
                {/* Sparkle Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-white opacity-10 animate-spin-slow" />
                </div>

                <div className="relative z-10">
                  <div className="text-6xl mb-3 animate-bounce">{badge.icon}</div>
                  <div className="text-2xl font-bold mb-1">NEW BADGE UNLOCKED!</div>
                  <div className="text-lg mb-2">{badge.name}</div>
                  <div className="text-sm opacity-90">{badge.description}</div>
                </div>
              </div>
            </div>
          )}

          {/* Encouragement Message */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="text-gray-700 font-medium">
              {isMastered && "Incredible! You're a natural! 🌟"}
              {isCompleted && !isMastered && "Great job! Keep up the momentum! 🚀"}
              {isPassed && !isCompleted && "Good effort! Practice makes perfect! 💪"}
              {!isPassed && "Don't give up! You'll get it next time! 💙"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isPassed ? (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-duolingo-blue text-white rounded-xl hover:bg-blue-600 transition-colors font-bold"
              >
                Try Again
              </button>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-bold"
                >
                  Review Lesson
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-duolingo-green to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-bold"
                >
                  Next Lesson →
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
