import { useState, useEffect } from 'react';
import { ArrowLeft, Book, MessageCircle, CheckCircle, GraduationCap, Dumbbell } from 'lucide-react';
import { useLearning } from '../../contexts/LearningContext';
import LessonChat from './LessonChat';

interface LessonDetailProps {
  lessonId: string;
  onClose: () => void;
}

export default function LessonDetail({ lessonId, onClose }: LessonDetailProps) {
  const { lessons, userLessonProgress, startLesson, completeLesson, homework, homeworkSubmissions } = useLearning();
  const [activeTab, setActiveTab] = useState<'learn' | 'vocabulary' | 'practice' | 'exercises' | 'review'>('learn');
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const lesson = lessons.find(l => l.id === lessonId);
  const progress = userLessonProgress.find(p => p.lesson_id === lessonId);
  const lessonHomework = homework.filter(h => h.lesson_id === lessonId);

  useEffect(() => {
    if (lesson && (!progress || progress.status === 'not_started')) {
      startLesson(lessonId);
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="card text-center py-12">
          <p className="text-gray-500">Lesson not found</p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-duolingo-green text-white rounded-lg hover:bg-green-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const objectives = Array.isArray(lesson.objectives) ? lesson.objectives : [];
  const grammarTopics = Array.isArray(lesson.grammar_topics) ? lesson.grammar_topics : [];
  const vocabularyList = Array.isArray(lesson.vocabulary_list) ? lesson.vocabulary_list : [];
  const exercises = Array.isArray(lesson.exercises) ? lesson.exercises : [];
  const conversationPrompts = Array.isArray(lesson.conversation_prompts) ? lesson.conversation_prompts : [];

  const handleExerciseSubmit = () => {
    let correct = 0;
    exercises.forEach((ex: any, idx: number) => {
      const userAnswer = exerciseAnswers[idx]?.toLowerCase().trim();
      const correctAnswer = ex.answer.toLowerCase().trim();
      if (userAnswer === correctAnswer) {
        correct++;
      }
    });

    const score = exercises.length > 0 ? (correct / exercises.length) * 100 : 0;
    setShowResults(true);
    completeLesson(lessonId, score);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-duolingo-green text-white rounded-full text-sm font-bold">
              {lesson.level}
            </span>
            <span className="text-gray-600">Lesson {lesson.lesson_number}</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-800">{lesson.title}</h1>
          <p className="text-gray-600 mt-1">{lesson.description}</p>
        </div>
        {progress && progress.score > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Your Score</p>
            <p className="text-3xl font-bold text-duolingo-green">{Math.round(progress.score)}%</p>
          </div>
        )}
      </div>

      {/* Lesson Progress Steps */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {[
          { id: 'learn', label: '1. Learn', icon: GraduationCap, color: 'blue' },
          { id: 'vocabulary', label: '2. Vocabulary', icon: Book, color: 'purple' },
          { id: 'practice', label: '3. Practice', icon: MessageCircle, color: 'green' },
          { id: 'exercises', label: '4. Exercises', icon: Dumbbell, color: 'orange' },
          { id: 'review', label: '5. Review', icon: CheckCircle, color: 'yellow' },
        ].map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeTab === step.id;
          const colorClasses = {
            blue: 'bg-duolingo-blue',
            purple: 'bg-duolingo-purple',
            green: 'bg-duolingo-green',
            orange: 'bg-orange-500',
            yellow: 'bg-duolingo-yellow',
          };
          return (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setActiveTab(step.id as any)}
                className={`flex flex-col items-center transition-all ${
                  isActive ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                    isActive ? colorClasses[step.color as keyof typeof colorClasses] + ' text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                  {step.label}
                </span>
              </button>
              {idx < 4 && (
                <div className="w-8 h-0.5 bg-gray-300 mx-2 mb-6"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tab Description */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">
          {activeTab === 'learn' && '📚 Start here: Review objectives and grammar topics'}
          {activeTab === 'vocabulary' && '📖 Learn the key words and phrases for this lesson'}
          {activeTab === 'practice' && '💬 Practice with AI: Have conversations using the vocabulary'}
          {activeTab === 'exercises' && '✏️ Test your knowledge with interactive exercises'}
          {activeTab === 'review' && '✅ Complete homework and review your progress'}
        </p>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* Objectives */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Learning Objectives</h2>
              <ul className="space-y-2">
                {objectives.map((obj: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-duolingo-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grammar Topics */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Grammar Topics</h2>
              <div className="flex flex-wrap gap-2">
                {grammarTopics.map((topic: any, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-duolingo-blue bg-opacity-10 text-duolingo-blue rounded-lg font-semibold"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Conversation Prompts */}
            {conversationPrompts.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Practice Scenarios</h2>
                <div className="space-y-2">
                  {conversationPrompts.map((prompt: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-duolingo-purple mt-0.5" />
                      <p className="text-gray-700">{prompt}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'vocabulary' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Vocabulary List</h2>
            <p className="text-gray-600 mb-6">
              📚 Study these {vocabularyList.length} words before moving to the Practice section. Each word is worth XP!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vocabularyList.map((word: any, idx: number) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xl font-bold text-gray-800">{word.german}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-white rounded text-xs font-semibold text-gray-600">
                        {word.type}
                      </span>
                      {word.xp && (
                        <span className="px-2 py-1 bg-duolingo-blue text-white rounded text-xs font-bold">
                          +{word.xp} XP
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600">{word.english}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">💬 AI Conversation Practice</h2>
            <p className="text-gray-600 mb-6">
              Practice what you've learned by chatting with your AI tutor! The conversation will adapt to your level and help you use the vocabulary from this lesson.
            </p>
            <LessonChat
              lessonId={lessonId}
              lessonTitle={lesson.title}
              conversationPrompts={conversationPrompts as any}
              vocabularyList={vocabularyList as any}
              themeId={lesson.theme_id}
            />
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Practice Exercises</h2>
            {exercises.map((exercise: any, idx: number) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-duolingo-green text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <span className="px-3 py-1 bg-white rounded text-sm font-semibold capitalize">
                    {exercise.type?.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-800 font-semibold">{exercise.question}</p>

                {exercise.options && (
                  <div className="space-y-2">
                    {exercise.options.map((option: string, optIdx: number) => (
                      <button
                        key={optIdx}
                        onClick={() => setExerciseAnswers({ ...exerciseAnswers, [idx]: option })}
                        className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                          exerciseAnswers[idx] === option
                            ? 'border-duolingo-green bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {!exercise.options && (
                  <input
                    type="text"
                    value={exerciseAnswers[idx] || ''}
                    onChange={(e) => setExerciseAnswers({ ...exerciseAnswers, [idx]: e.target.value })}
                    placeholder="Type your answer..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duolingo-green focus:border-transparent"
                  />
                )}

                {showResults && (
                  <div
                    className={`p-3 rounded-lg ${
                      exerciseAnswers[idx]?.toLowerCase().trim() === exercise.answer.toLowerCase().trim()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {exerciseAnswers[idx]?.toLowerCase().trim() === exercise.answer.toLowerCase().trim()
                      ? '✓ Correct!'
                      : `✗ Correct answer: ${exercise.answer}`}
                  </div>
                )}
              </div>
            ))}

            {!showResults && exercises.length > 0 && (
              <button
                onClick={handleExerciseSubmit}
                className="w-full px-6 py-3 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
              >
                Submit Answers
              </button>
            )}
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📝 Review & Homework</h2>

            {/* Progress Summary */}
            <div className="p-6 bg-gradient-to-r from-duolingo-green to-green-600 text-white rounded-xl">
              <h3 className="text-2xl font-bold mb-2">🎯 Your Progress</h3>
              {progress && progress.score > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-50">Current Score:</span>
                    <span className="text-3xl font-bold">{Math.round(progress.score)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-50">Status:</span>
                    <span className="text-xl font-semibold">
                      {progress.status === 'mastered' && '👑 Mastered!'}
                      {progress.status === 'completed' && '🎉 Completed!'}
                      {progress.status === 'in_progress' && '📖 In Progress'}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-green-50">Complete the exercises to see your progress here!</p>
              )}
            </div>

            {/* Homework Assignments */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Homework Assignments</h3>
              {lessonHomework.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No homework assignments for this lesson yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Focus on mastering the exercises and practice conversations!</p>
                </div>
              ) : (
                lessonHomework.map(hw => {
                  const submission = homeworkSubmissions.find(s => s.homework_id === hw.id);
                  return (
                    <div key={hw.id} className="p-4 border-2 border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-gray-800">{hw.title}</h3>
                        <span className="px-3 py-1 bg-duolingo-purple text-white rounded-full text-sm font-bold">
                          {hw.points} pts
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{hw.description}</p>
                      {submission && (
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-sm font-semibold text-green-800">
                            ✓ Submitted {new Date(submission.submitted_at).toLocaleDateString()}
                          </p>
                          {submission.score !== null && (
                            <p className="text-sm text-green-700">Score: {Math.round(submission.score)}%</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Next Steps */}
            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-3">🚀 What's Next?</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Review any exercises you got wrong</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Practice more conversations to reinforce vocabulary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Try to score 90%+ on exercises to MASTER this lesson</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Move on to the next lesson when you're ready!</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
