import { useState } from 'react';
import { X } from 'lucide-react';
import { useVocabulary } from '../../contexts/VocabularyContext';

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddWordModal({ isOpen, onClose }: AddWordModalProps) {
  const { addWord } = useVocabulary();
  const [germanWord, setGermanWord] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!germanWord.trim() || !englishTranslation.trim()) {
      alert('Please fill in both German word and English translation');
      return;
    }

    setIsSubmitting(true);
    try {
      await addWord({
        germanWord: germanWord.trim(),
        englishTranslation: englishTranslation.trim(),
        contextSentence: contextSentence.trim() || undefined,
        difficultyLevel,
      });

      // Reset form
      setGermanWord('');
      setEnglishTranslation('');
      setContextSentence('');
      setDifficultyLevel('beginner');
      onClose();
    } catch (error) {
      console.error('Error adding word:', error);
      alert('Failed to add word. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setGermanWord('');
      setEnglishTranslation('');
      setContextSentence('');
      setDifficultyLevel('beginner');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-800">Add New Word</h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="germanWord" className="block text-sm font-semibold text-gray-700 mb-1">
              German Word *
            </label>
            <input
              id="germanWord"
              type="text"
              value={germanWord}
              onChange={(e) => setGermanWord(e.target.value)}
              placeholder="e.g., das Brot"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duolingo-green focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label htmlFor="englishTranslation" className="block text-sm font-semibold text-gray-700 mb-1">
              English Translation *
            </label>
            <input
              id="englishTranslation"
              type="text"
              value={englishTranslation}
              onChange={(e) => setEnglishTranslation(e.target.value)}
              placeholder="e.g., the bread"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duolingo-green focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label htmlFor="contextSentence" className="block text-sm font-semibold text-gray-700 mb-1">
              Context Sentence (optional)
            </label>
            <textarea
              id="contextSentence"
              value={contextSentence}
              onChange={(e) => setContextSentence(e.target.value)}
              placeholder="e.g., Ich möchte ein Brot kaufen."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-duolingo-green focus:border-transparent resize-none"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Difficulty Level
            </label>
            <div className="flex gap-2">
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficultyLevel(level)}
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold capitalize transition-colors disabled:opacity-50 ${
                    difficultyLevel === level
                      ? 'bg-duolingo-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Adding...
                </>
              ) : (
                'Add Word'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
