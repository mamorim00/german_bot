import React, { useState } from 'react';
import { Volume2, PlayCircle, CheckCircle } from 'lucide-react';

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

interface ScenarioIntroProps {
  scenarioContext: string;
  keyPhrases: KeyPhrase[];
  exampleDialogue: DialogueLine[];
  onComplete: () => void;
}

export const ScenarioIntro: React.FC<ScenarioIntroProps> = ({
  scenarioContext,
  keyPhrases,
  exampleDialogue,
  onComplete,
}) => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const [completedPhrases, setCompletedPhrases] = useState<Set<number>>(new Set());

  const speakText = (text: string, index: number) => {
    if ('speechSynthesis' in window) {
      setPlayingAudio(index);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.8;
      utterance.onend = () => setPlayingAudio(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const togglePhraseCompletion = (index: number) => {
    const newCompleted = new Set(completedPhrases);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedPhrases(newCompleted);
  };

  const allPhrasesReviewed = completedPhrases.size === keyPhrases.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Scenario Context */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🎬</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Scenario
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {scenarioContext}
            </p>
          </div>
        </div>
      </div>

      {/* Key Phrases Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">🗝️</span>
            Essential Phrases
          </h3>
          <button
            onClick={() => setShowTranslations(!showTranslations)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showTranslations ? 'Hide' : 'Show'} Translations
          </button>
        </div>

        <div className="space-y-3">
          {keyPhrases.map((phrase, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-2 transition-all ${
                completedPhrases.has(index)
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => speakText(phrase.german, index)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      disabled={playingAudio === index}
                    >
                      <Volume2
                        className={`w-5 h-5 ${playingAudio === index ? 'animate-pulse' : ''}`}
                      />
                    </button>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {phrase.german}
                    </p>
                  </div>
                  {showTranslations && (
                    <div className="ml-8 space-y-1">
                      <p className="text-gray-600 dark:text-gray-400">
                        {phrase.english}
                      </p>
                      {phrase.pronunciation && (
                        <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                          {phrase.pronunciation}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => togglePhraseCompletion(index)}
                  className={`ml-4 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    completedPhrases.has(index)
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                  }`}
                >
                  {completedPhrases.has(index) && <CheckCircle className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
          Click the checkmark when you feel comfortable with each phrase
        </p>
      </div>

      {/* Example Dialogue */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          Example Conversation
        </h3>

        <div className="bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 space-y-4">
          {exampleDialogue.map((line, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                line.speaker === 'You' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-md ${
                  line.speaker === 'You'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                } p-4 rounded-2xl shadow-sm`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-semibold opacity-70">
                    {line.speaker}
                  </p>
                  <button
                    onClick={() => speakText(line.german, 1000 + index)}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="font-medium mb-1">{line.german}</p>
                {showTranslations && (
                  <p className="text-sm opacity-75">{line.english}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center italic">
          Listen to how the conversation flows naturally
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onComplete}
          disabled={!allPhrasesReviewed}
          className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
            allPhrasesReviewed
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {allPhrasesReviewed
            ? "I'm Ready to Practice! 🚀"
            : 'Review all phrases to continue'}
        </button>
      </div>
    </div>
  );
};
