import { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useVocabulary } from '../../contexts/VocabularyContext';

interface FlashcardReviewProps {
  onClose: () => void;
}

export default function FlashcardReview({ onClose }: FlashcardReviewProps) {
  const { dueWords, reviewWord } = useVocabulary();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isReviewing, setIsReviewing] = useState(false);

  const currentWord = dueWords[currentIndex];

  if (!currentWord) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="card text-center py-12">
          <CheckCircle className="w-16 h-16 text-duolingo-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Great Job!</h2>
          <p className="text-gray-600 mb-4">
            You've reviewed all {reviewedCount} words.
          </p>
          <p className="text-lg font-semibold text-duolingo-green mb-6">
            Accuracy: {reviewedCount > 0 ? Math.round((correctCount / reviewedCount) * 100) : 0}%
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Back to Vocabulary
          </button>
        </div>
      </div>
    );
  }

  const handleReview = async (correct: boolean) => {
    if (isReviewing) return;

    setIsReviewing(true);
    try {
      await reviewWord(currentWord.id, correct);
      setReviewedCount(prev => prev + 1);
      if (correct) setCorrectCount(prev => prev + 1);

      // Move to next card
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setIsReviewing(false);
      }, 500);
    } catch (error) {
      console.error('Error reviewing word:', error);
      setIsReviewing(false);
    }
  };

  const progressPercentage = ((currentIndex / dueWords.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600">Progress</p>
          <p className="text-lg font-bold text-gray-800">
            {currentIndex + 1} / {dueWords.length}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-600">Correct</p>
          <p className="text-lg font-bold text-duolingo-green">
            {correctCount} / {reviewedCount}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-duolingo-green transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="perspective-1000">
        <div
          className={`relative h-96 cursor-pointer transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={() => !isReviewing && setIsFlipped(!isFlipped)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card - German word */}
          <div
            className="absolute inset-0 card backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-duolingo-blue to-blue-600 text-white"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-sm uppercase tracking-wide opacity-75 mb-4">German</p>
            <h2 className="text-4xl font-display font-bold text-center mb-6">
              {currentWord.german_word}
            </h2>
            {currentWord.context_sentence && !isFlipped && (
              <p className="text-lg text-center opacity-90 italic">
                "{currentWord.context_sentence}"
              </p>
            )}
            <p className="text-sm opacity-75 mt-8">Click to reveal</p>
          </div>

          {/* Back of card - English translation */}
          <div
            className="absolute inset-0 card backface-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-duolingo-green to-green-600 text-white rotate-y-180"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm uppercase tracking-wide opacity-75 mb-4">English</p>
            <h2 className="text-4xl font-display font-bold text-center mb-6">
              {currentWord.english_translation}
            </h2>
            {currentWord.context_sentence && (
              <p className="text-lg text-center opacity-90 italic mb-4">
                "{currentWord.context_sentence}"
              </p>
            )}
            <div className="flex items-center gap-2 mt-8">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {currentWord.difficulty_level}
              </span>
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                Reviewed {currentWord.times_reviewed}x
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Review Buttons */}
      {isFlipped && (
        <div className="flex gap-4 animate-fade-in">
          <button
            onClick={() => handleReview(false)}
            disabled={isReviewing}
            className="flex-1 px-6 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all transform hover:scale-105 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            <XCircle className="w-6 h-6" />
            Incorrect
          </button>
          <button
            onClick={() => handleReview(true)}
            disabled={isReviewing}
            className="flex-1 px-6 py-4 bg-duolingo-green text-white rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
          >
            <CheckCircle className="w-6 h-6" />
            Correct
          </button>
        </div>
      )}

      {!isFlipped && (
        <div className="text-center">
          <button
            onClick={() => setIsFlipped(true)}
            className="px-6 py-3 bg-white text-duolingo-blue rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Show Answer
          </button>
        </div>
      )}
    </div>
  );
}
