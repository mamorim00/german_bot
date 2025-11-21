import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Star,
  TrendingUp,
  BookOpen,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Award,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReflectionStageProps {
  lessonTitle: string;
  learnedPhrases: string[];
  conversationTopics: string[];
  grammarPoints: string[];
  challengeScore: number;
  xpEarned: number;
  badges?: string[];
  nextLessonId?: string;
  onFinish: () => void;
}

export const ReflectionStage: React.FC<ReflectionStageProps> = ({
  lessonTitle,
  learnedPhrases,
  conversationTopics,
  grammarPoints,
  challengeScore,
  xpEarned,
  badges = [],
  nextLessonId,
  onFinish,
}) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateXP, setAnimateXP] = useState(0);

  useEffect(() => {
    setShowConfetti(true);
    // Animate XP counter
    const duration = 2000;
    const steps = 50;
    const increment = xpEarned / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= xpEarned) {
        setAnimateXP(xpEarned);
        clearInterval(timer);
      } else {
        setAnimateXP(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [xpEarned]);

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🏆';
    if (score >= 75) return '⭐';
    if (score >= 60) return '👍';
    return '💪';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding Performance!';
    if (score >= 75) return 'Great Job!';
    if (score >= 60) return 'Well Done!';
    return 'Keep Practicing!';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Celebration Header */}
      <div className="relative bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl border-2 border-purple-300 dark:border-purple-700 overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-bounce text-4xl absolute top-4 left-1/4">🎉</div>
            <div
              className="animate-bounce text-4xl absolute top-8 right-1/4"
              style={{ animationDelay: '0.2s' }}
            >
              ✨
            </div>
            <div
              className="animate-bounce text-4xl absolute top-12 left-1/3"
              style={{ animationDelay: '0.4s' }}
            >
              🌟
            </div>
          </div>
        )}

        <div className="relative text-center">
          <div className="text-6xl mb-4">{getScoreEmoji(challengeScore)}</div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {getScoreMessage(challengeScore)}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            You've completed: <span className="font-semibold">{lessonTitle}</span>
          </p>
        </div>
      </div>

      {/* XP and Score Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* XP Earned */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-300 dark:border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">XP Earned</p>
              <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                +{animateXP}
              </p>
            </div>
            <Sparkles className="w-12 h-12 text-yellow-500" />
          </div>
        </div>

        {/* Challenge Score */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-300 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Challenge Score
              </p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {challengeScore}%
              </p>
            </div>
            <Trophy className="w-12 h-12 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Badges Earned */}
      {badges.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Badges Earned
          </h3>
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 px-4 py-2 rounded-full border border-purple-300 dark:border-purple-700 flex items-center gap-2"
              >
                <Star className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-gray-900 dark:text-white">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What You Learned */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          What You Learned
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phrases */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              Key Phrases
            </h4>
            <ul className="space-y-2">
              {learnedPhrases.slice(0, 5).map((phrase, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conversation Topics */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              Conversations
            </h4>
            <ul className="space-y-2">
              {conversationTopics.map((topic, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Grammar */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              Grammar
            </h4>
            <ul className="space-y-2">
              {grammarPoints.map((point, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Encouragement Message */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          You're building real conversation skills! Remember, the best way to improve is to{' '}
          <span className="font-semibold text-green-700 dark:text-green-400">
            keep practicing
          </span>{' '}
          and don't be afraid to make mistakes. Every conversation makes you better! 💪
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        {nextLessonId && (
          <button
            onClick={() => navigate(`/lessons/${nextLessonId}`)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            Next Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onFinish}
          className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
