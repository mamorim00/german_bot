import { useState } from 'react';
import { BookOpen, Play, CheckCircle, Lock, Trophy, Clock, Target } from 'lucide-react';
import { useLearning } from '../../contexts/LearningContext';
import LessonDetail from './LessonDetail';

export default function LessonsPage() {
  const { lessons, userLessonProgress, userLevel, loading, getRecommendedLessons } = useLearning();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-duolingo-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <LessonDetail
        lessonId={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onOpenLesson={(lessonId) => setSelectedLesson(lessonId)}
      />
    );
  }

  const recommendedLessons = getRecommendedLessons();
  const filteredLessons = filterLevel === 'all'
    ? lessons
    : lessons.filter(l => l.level === filterLevel);

  const getLessonProgress = (lessonId: string) => {
    return userLessonProgress.find(p => p.lesson_id === lessonId);
  };

  const getLessonStatus = (lessonId: string) => {
    const progress = getLessonProgress(lessonId);
    if (!progress) return 'not_started';
    return progress.status;
  };

  const isLessonLocked = (lesson: typeof lessons[0]) => {
    // Lesson is locked if it's above user level
    const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const userLevelIndex = levelOrder.indexOf(userLevel);
    const lessonLevelIndex = levelOrder.indexOf(lesson.level);

    return lessonLevelIndex > userLevelIndex + 1;
  };

  const getStatusIcon = (status: string, locked: boolean) => {
    if (locked) return <Lock className="w-5 h-5 text-gray-400" />;
    if (status === 'mastered') return <Trophy className="w-5 h-5 text-duolingo-yellow" />;
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-duolingo-green" />;
    if (status === 'in_progress') return <Play className="w-5 h-5 text-duolingo-blue" />;
    return <Play className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (status: string, locked: boolean) => {
    if (locked) return 'bg-gray-100 border-gray-300';
    if (status === 'mastered') return 'bg-yellow-50 border-duolingo-yellow';
    if (status === 'completed') return 'bg-green-50 border-duolingo-green';
    if (status === 'in_progress') return 'bg-blue-50 border-duolingo-blue';
    return 'bg-white border-gray-200 hover:border-duolingo-green';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-duolingo-green" />
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-800">Lesson Plans</h1>
            <p className="text-gray-600">Your current level: <span className="font-bold text-duolingo-green">{userLevel}</span></p>
          </div>
        </div>

        {/* Level filter */}
        <div className="flex gap-2">
          {['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`px-4 py-2 rounded-lg font-semibold uppercase text-sm transition-colors ${
                filterLevel === level
                  ? 'bg-duolingo-green text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Lessons */}
      {recommendedLessons.length > 0 && (
        <div className="card bg-gradient-to-br from-duolingo-green to-green-600 text-white">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-6 h-6" />
            <h2 className="text-2xl font-display font-bold">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedLessons.map(lesson => {
              const progress = getLessonProgress(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson.id)}
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-opacity-30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="px-2 py-1 bg-white bg-opacity-30 rounded text-xs font-bold">
                      {lesson.level} - Lesson {lesson.lesson_number}
                    </span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold mb-1">{lesson.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{lesson.description}</p>
                  {progress && (
                    <div className="mt-2 text-xs">
                      Score: {Math.round(progress.score)}%
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Lessons */}
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">All Lessons</h2>

        {filteredLessons.length === 0 ? (
          <div className="card text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No lessons available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Group by level */}
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => {
              const levelLessons = filteredLessons.filter(l => l.level === level);
              if (levelLessons.length === 0) return null;

              return (
                <div key={level} className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-700">{level} Level</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {levelLessons.map(lesson => {
                      const status = getLessonStatus(lesson.id);
                      const locked = isLessonLocked(lesson);
                      const progress = getLessonProgress(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => !locked && setSelectedLesson(lesson.id)}
                          disabled={locked}
                          className={`border-2 rounded-xl p-4 text-left transition-all ${getStatusColor(status, locked)} ${
                            !locked && 'hover:shadow-lg transform hover:scale-105'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(status, locked)}
                              <span className="font-bold text-gray-700">
                                Lesson {lesson.lesson_number}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{lesson.estimated_duration_minutes}min</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-lg text-gray-800 mb-2">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {lesson.description}
                          </p>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex flex-wrap gap-1">
                              {(Array.isArray(lesson.grammar_topics) ? lesson.grammar_topics : []).slice(0, 2).map((topic: any, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded text-gray-700">
                                  {topic}
                                </span>
                              ))}
                            </div>
                            {progress && !locked && (
                              <span className="font-semibold text-duolingo-green">
                                {Math.round(progress.score)}%
                              </span>
                            )}
                          </div>

                          {locked && (
                            <div className="mt-3 text-sm text-gray-500 italic">
                              Complete more {userLevel} lessons to unlock
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
