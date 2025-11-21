import { Trophy, Star, Flame, Zap, Award, Lock } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { useLearning } from '../../contexts/LearningContext';
import { achievementBadges } from '../../data/gamifiedLessons';

export default function AchievementsPage() {
  const { getTotalXP } = useProgress();
  const { userLessonProgress, userLevel } = useLearning();

  const totalXP = getTotalXP();
  const masteredLessons = userLessonProgress.filter(p => p.status === 'mastered').length;

  // Calculate earned badges based on completed lessons
  const earnedBadges = Object.entries(achievementBadges).filter(() => {
    // Check if user has completed the related lesson
    const lessonCompleted = userLessonProgress.some(p =>
      p.status === 'completed' || p.status === 'mastered'
    );
    return lessonCompleted;
  });

  const streakDays = 7; // TODO: Calculate from user data
  const currentStreak = { days: streakDays, xp: streakDays * 10 };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Stats */}
      <div className="card bg-gradient-to-br from-duolingo-yellow via-duolingo-green to-duolingo-blue text-white p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">
              🏆 Hall of Fame
            </h1>
            <p className="text-lg opacity-90">
              Your legendary journey through German
            </p>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold">{totalXP}</div>
            <div className="text-sm uppercase tracking-wide opacity-75">Total XP</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-6 h-6" />
              <span className="text-2xl font-bold">{earnedBadges.length}</span>
            </div>
            <div className="text-sm opacity-90">Badges Earned</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-6 h-6" />
              <span className="text-2xl font-bold">{masteredLessons}</span>
            </div>
            <div className="text-sm opacity-90">Lessons Mastered</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6" />
              <span className="text-2xl font-bold">{currentStreak.days}</span>
            </div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-6 h-6" />
              <span className="text-2xl font-bold uppercase">{userLevel}</span>
            </div>
            <div className="text-sm opacity-90">Current Level</div>
          </div>
        </div>
      </div>

      {/* Daily Streak Challenge */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Daily Streak</h2>
              <p className="text-gray-600">Keep the fire burning! +{currentStreak.xp} XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-orange-500">{currentStreak.days}</div>
            <div className="text-sm text-gray-600">days</div>
          </div>
        </div>

        {/* Streak Calendar */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-16 h-20 rounded-lg flex flex-col items-center justify-center ${
                i < currentStreak.days
                  ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Flame className={`w-6 h-6 ${i < currentStreak.days ? 'animate-pulse' : ''}`} />
              <div className="text-xs mt-1">Day {i + 1}</div>
            </div>
          ))}
        </div>

        {currentStreak.days >= 7 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border-2 border-orange-300">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-orange-800">🔥 FIRE WEEK! Bonus: +100 XP</span>
            </div>
          </div>
        )}
      </div>

      {/* Badge Collection */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Award className="w-7 h-7 text-duolingo-yellow" />
          Badge Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(achievementBadges).map(([key, badge]) => {
            const isEarned = earnedBadges.some(([k]) => k === key);

            return (
              <div
                key={key}
                className={`relative group ${
                  isEarned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-duolingo-yellow'
                    : 'bg-gray-50 border-2 border-gray-200'
                } rounded-xl p-4 transition-all hover:scale-105 hover:shadow-lg`}
              >
                {/* Badge Icon */}
                <div className="text-center mb-3">
                  <div
                    className={`text-6xl mb-2 ${
                      !isEarned && 'grayscale opacity-40'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  {!isEarned && (
                    <Lock className="w-6 h-6 text-gray-400 mx-auto" />
                  )}
                </div>

                {/* Badge Info */}
                <div className="text-center">
                  <h3 className={`font-bold text-sm mb-1 ${
                    isEarned ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs mb-2 ${
                    isEarned ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {badge.description}
                  </p>

                  {isEarned ? (
                    <div className="flex items-center justify-center gap-1 text-xs text-duolingo-yellow font-bold">
                      <Zap className="w-4 h-4" />
                      +{badge.xp_bonus} XP
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">Locked</div>
                  )}
                </div>

                {/* Hover Tooltip */}
                {isEarned && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="font-bold mb-1">Unlocks:</div>
                    <div>{badge.unlocks}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Level Progress */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Level Progress</h2>

        <div className="space-y-4">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((level, idx) => {
            const isCompleted = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(userLevel) > idx;
            const isCurrent = userLevel === level;
            const isLocked = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(userLevel) < idx;

            return (
              <div key={level} className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg ${
                    isCompleted
                      ? 'bg-gradient-to-br from-duolingo-green to-green-600 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-br from-duolingo-blue to-blue-600 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : isLocked ? <Lock className="w-6 h-6" /> : level}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold ${isCurrent ? 'text-duolingo-blue' : 'text-gray-700'}`}>
                      {level} Level {isCurrent && '(Current)'}
                    </span>
                    {isCompleted && <span className="text-sm text-duolingo-green font-bold">Completed!</span>}
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isCompleted
                          ? 'bg-gradient-to-r from-duolingo-green to-green-600 w-full'
                          : isCurrent
                          ? 'bg-gradient-to-r from-duolingo-blue to-blue-600 w-3/4'
                          : 'w-0'
                      } transition-all duration-500`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="card bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center p-8">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-2">
          "Die Grenzen meiner Sprache bedeuten die Grenzen meiner Welt"
        </h3>
        <p className="text-lg opacity-90">
          "The limits of my language mean the limits of my world" - Ludwig Wittgenstein
        </p>
        <p className="text-sm opacity-75 mt-4">
          Keep pushing your boundaries! You're doing amazing! 🚀
        </p>
      </div>
    </div>
  );
}
