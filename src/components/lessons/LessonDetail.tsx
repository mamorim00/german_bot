import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Film,
  Target,
  MessageCircle,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useLearning } from '../../contexts/LearningContext';
import { ScenarioIntro } from './ScenarioIntro';
import { GuidedConversation } from './GuidedConversation';
import LessonChat from './LessonChat';
import { ChallengeStage } from './ChallengeStage';
import { ReflectionStage } from './ReflectionStage';

interface KeyPhrase {
  german: string;
  english: string;
  pronunciation?: string;
}

interface DialogueLine {
  speaker: string;
  german: string;
  english: string;
}

interface ConversationStep {
  id: number;
  aiMessage: string;
  prompt: string;
  hints?: string[];
  expectedPhrases?: string[];
}

interface LessonDetailProps {
  lessonId: string;
  onClose: () => void;
  onOpenLesson?: (lessonId: string) => void;
}

type Stage = 1 | 2 | 3 | 4 | 5;

export default function LessonDetail({ lessonId, onClose, onOpenLesson }: LessonDetailProps) {
  const { lessons, userLessonProgress, startLesson, completeLesson } = useLearning();
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set());
  const [challengeScore, setChallengeScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);

  const lesson = lessons.find((l) => l.id === lessonId);
  const progress = userLessonProgress.find((p) => p.lesson_id === lessonId);

  useEffect(() => {
    if (lesson && (!progress || progress.status === 'not_started')) {
      startLesson(lessonId);
    }
    // Load saved progress if exists
    if (progress?.current_stage) {
      setCurrentStage(progress.current_stage as Stage);
    }
    if (progress?.completed_stages) {
      setCompletedStages(new Set(progress.completed_stages as number[]));
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Lesson not found</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Parse lesson data
  const vocabularyList = Array.isArray(lesson.vocabulary_list) ? lesson.vocabulary_list : [];
  const conversationPrompts = Array.isArray(lesson.conversation_prompts)
    ? lesson.conversation_prompts
    : [];
  const grammarTopics: string[] = Array.isArray(lesson.grammar_topics) ? lesson.grammar_topics as unknown as string[] : [];

  // Prepare data for new components
  const scenarioContext: string =
    (typeof lesson.scenario_context === 'string' ? lesson.scenario_context : null) ||
    `You're learning about ${lesson.theme_id.replace(/-/g, ' ')}. Get ready to have real conversations!`;

  const keyPhrases: KeyPhrase[] =
    (Array.isArray(lesson.key_phrases) ? lesson.key_phrases as unknown as KeyPhrase[] : null) ||
    vocabularyList.slice(0, 5).map((word: any) => ({
      german: word.german,
      english: word.english,
      pronunciation: word.pronunciation,
    }));

  const exampleDialogue: DialogueLine[] =
    (Array.isArray(lesson.example_dialogue) ? lesson.example_dialogue as unknown as DialogueLine[] : null) || [
    { speaker: 'AI', german: 'Guten Tag!', english: 'Good day!' },
    { speaker: 'You', german: 'Hallo! Wie geht es dir?', english: 'Hello! How are you?' },
    { speaker: 'AI', german: 'Mir geht es gut, danke!', english: "I'm doing well, thanks!" },
  ];

  const conversationScripts: ConversationStep[] =
    (Array.isArray(lesson.conversation_scripts) ? lesson.conversation_scripts as unknown as ConversationStep[] : null) ||
    conversationPrompts.slice(0, 3).map((prompt: any, idx: number) => ({
      id: idx + 1,
      aiMessage: `Let's practice! ${prompt}`,
      prompt: prompt,
      hints: [`Try using vocabulary from this lesson`, `Don't worry about mistakes!`],
      expectedPhrases: [],
    }));

  const challengeScenario: string =
    (typeof lesson.challenge_scenario === 'string' ? lesson.challenge_scenario : null) ||
    `Surprise! The person responds in an unexpected way. Show how you'd handle this situation naturally!`;

  const challengeDescription =
    'Now for the fun part! You\'ll face an unexpected twist in the conversation. Use what you\'ve learned to respond naturally and creatively.';

  // Stage configuration
  const stages = [
    {
      number: 1,
      name: 'Scenario Intro',
      icon: Film,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
    },
    {
      number: 2,
      name: 'Guided Practice',
      icon: Target,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
    },
    {
      number: 3,
      name: 'Free Conversation',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    },
    {
      number: 4,
      name: 'Challenge',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    },
    {
      number: 5,
      name: 'Reflection',
      icon: Sparkles,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    },
  ];

  const currentStageInfo = stages[currentStage - 1];

  const handleStageComplete = (stage: Stage) => {
    const newCompleted = new Set(completedStages);
    newCompleted.add(stage);
    setCompletedStages(newCompleted);

    // Calculate XP for completing stage
    const stageXP = 50;
    setTotalXP((prev) => prev + stageXP);

    // Move to next stage if not last
    if (stage < 5) {
      setCurrentStage((stage + 1) as Stage);
    }
  };

  const handleChallengeComplete = (score: number) => {
    setChallengeScore(score);
    handleStageComplete(4);
  };

  const handleLessonFinish = () => {
    // Calculate final score and complete lesson
    const finalScore = (completedStages.size / 5) * 70 + (challengeScore / 100) * 30;
    completeLesson(lessonId, finalScore);
    onClose();
  };

  const handleNextLesson = (nextLessonId: string) => {
    // Calculate final score and complete current lesson
    const finalScore = (completedStages.size / 5) * 70 + (challengeScore / 100) * 30;
    completeLesson(lessonId, finalScore);
    // Open next lesson if callback provided
    if (onOpenLesson) {
      onOpenLesson(nextLessonId);
    } else {
      onClose();
    }
  };

  const canGoToStage = (stage: Stage): boolean => {
    // Can only go to current stage or completed stages
    return stage <= currentStage || completedStages.has(stage);
  };

  const goToPreviousStage = () => {
    if (currentStage > 1) {
      setCurrentStage((currentStage - 1) as Stage);
    }
  };

  const goToNextStage = () => {
    if (currentStage < 5 && completedStages.has(currentStage)) {
      setCurrentStage((currentStage + 1) as Stage);
    }
  };

  const findNextLesson = () => {
    const currentLessonIndex = lessons.findIndex((l) => l.id === lessonId);
    if (currentLessonIndex >= 0 && currentLessonIndex < lessons.length - 1) {
      return lessons[currentLessonIndex + 1].id;
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-bold">
                  {lesson.level}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Lesson {lesson.lesson_number}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
            </div>
            {totalXP > 0 && (
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-600 dark:text-gray-400">XP Earned</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  +{totalXP}
                </p>
              </div>
            )}
          </div>

          {/* Progress Bar with Stages */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isCompleted = completedStages.has(stage.number);
                const isCurrent = currentStage === stage.number;
                const isAccessible = canGoToStage(stage.number as Stage);

                return (
                  <div key={stage.number} className="flex items-center flex-1">
                    <button
                      onClick={() => isAccessible && setCurrentStage(stage.number as Stage)}
                      disabled={!isAccessible}
                      className={`flex flex-col items-center transition-all ${
                        isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-2 transition-all ${
                          isCurrent
                            ? `bg-gradient-to-r ${stage.color} text-white scale-110 shadow-lg`
                            : isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                        }`}
                      >
                        {isCompleted ? (
                          <div className="text-2xl">✓</div>
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold text-center hidden md:block ${
                          isCurrent
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {stage.name}
                      </span>
                    </button>
                    {idx < stages.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                          completedStages.has(stage.number)
                            ? 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stage Info */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stage {currentStage} of 5: <span className="font-semibold">{currentStageInfo.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stage Content */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div
          className={`bg-gradient-to-r ${currentStageInfo.bgColor} p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 mb-8`}
        >
          {currentStage === 1 && (
            <ScenarioIntro
              scenarioContext={scenarioContext}
              keyPhrases={keyPhrases}
              exampleDialogue={exampleDialogue}
              onComplete={() => handleStageComplete(1)}
            />
          )}

          {currentStage === 2 && (
            <GuidedConversation
              conversationSteps={conversationScripts}
              lessonTheme={lesson.theme_id}
              vocabularyList={vocabularyList}
              onComplete={() => handleStageComplete(2)}
            />
          )}

          {currentStage === 3 && (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                  <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  Free Conversation Practice
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  Now it's your turn! Have a natural conversation using what you've learned.
                </p>
              </div>
              <LessonChat
                lessonId={lessonId}
                lessonTitle={lesson.title}
                conversationPrompts={conversationPrompts as any}
                vocabularyList={vocabularyList as any}
                themeId={lesson.theme_id}
              />
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => handleStageComplete(3)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Ready for the Challenge! 🚀
                </button>
              </div>
            </div>
          )}

          {currentStage === 4 && (
            <ChallengeStage
              challengeScenario={challengeScenario}
              challengeDescription={challengeDescription}
              lessonTheme={lesson.theme_id}
              vocabularyList={vocabularyList}
              onComplete={handleChallengeComplete}
            />
          )}

          {currentStage === 5 && (
            <ReflectionStage
              lessonTitle={lesson.title}
              learnedPhrases={keyPhrases.map((p: any) => p.german)}
              conversationTopics={conversationPrompts.map((p: any) =>
                typeof p === 'string' ? p : p.prompt
              )}
              grammarPoints={grammarTopics}
              challengeScore={challengeScore}
              xpEarned={totalXP}
              badges={challengeScore >= 90 ? ['Conversation Master'] : []}
              nextLessonId={findNextLesson()}
              onFinish={handleLessonFinish}
              onNextLesson={handleNextLesson}
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {currentStage < 5 && (
          <div className="flex justify-between items-center">
            <button
              onClick={goToPreviousStage}
              disabled={currentStage === 1}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Stage
            </button>

            <button
              onClick={goToNextStage}
              disabled={!completedStages.has(currentStage)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                completedStages.has(currentStage)
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              Next Stage
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
