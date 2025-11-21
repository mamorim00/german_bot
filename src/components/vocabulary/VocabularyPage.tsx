import { useState } from 'react';
import { Book, Plus, Trash2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useVocabulary } from '../../contexts/VocabularyContext';
import AddWordModal from './AddWordModal';
import FlashcardReview from './FlashcardReview';

export default function VocabularyPage() {
  const { words, dueWords, removeWord, loading } = useVocabulary();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [filter, setFilter] = useState<'all' | 'due' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredWords = words.filter(word => {
    if (filter === 'all') return true;
    if (filter === 'due') return dueWords.some(w => w.id === word.id);
    return word.difficulty_level === filter;
  });

  const getProgressColor = (word: typeof words[0]) => {
    if (word.times_correct === 0) return 'bg-gray-200';
    if (word.times_correct < 3) return 'bg-yellow-200';
    if (word.times_correct < 5) return 'bg-green-200';
    return 'bg-duolingo-green';
  };

  const getDifficultyBadge = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700',
    };
    return colors[level as keyof typeof colors] || colors.beginner;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-duolingo-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showReview && dueWords.length > 0) {
    return <FlashcardReview onClose={() => setShowReview(false)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Book className="w-8 h-8 text-duolingo-purple" />
          <h1 className="text-3xl font-display font-bold text-gray-800">My Vocabulary</h1>
        </div>
        <div className="flex gap-3">
          {dueWords.length > 0 && (
            <button
              onClick={() => setShowReview(true)}
              className="px-4 py-2 bg-duolingo-yellow text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold flex items-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Review {dueWords.length} {dueWords.length === 1 ? 'Word' : 'Words'}
            </button>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Word
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Words</p>
          <p className="text-3xl font-bold text-gray-800">{words.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Due for Review</p>
          <p className="text-3xl font-bold text-duolingo-yellow">{dueWords.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Mastered</p>
          <p className="text-3xl font-bold text-duolingo-green">
            {words.filter(w => w.times_correct >= 5).length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Learning</p>
          <p className="text-3xl font-bold text-duolingo-blue">
            {words.filter(w => w.times_correct > 0 && w.times_correct < 5).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'due', 'beginner', 'intermediate', 'advanced'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
              filter === f
                ? 'bg-duolingo-green text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Words List */}
      {filteredWords.length === 0 ? (
        <div className="card text-center py-12">
          <Book className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {filter === 'all'
              ? "You haven't added any words yet. Start building your vocabulary!"
              : `No ${filter} words found.`}
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Add Your First Word
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWords.map(word => {
            const isDue = dueWords.some(w => w.id === word.id);
            return (
              <div
                key={word.id}
                className={`card hover:shadow-lg transition-shadow ${
                  isDue ? 'border-2 border-duolingo-yellow' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {word.german_word}
                    </h3>
                    <p className="text-gray-600">{word.english_translation}</p>
                  </div>
                  <button
                    onClick={() => removeWord(word.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {word.context_sentence && (
                  <p className="text-sm text-gray-500 italic mb-3">
                    "{word.context_sentence}"
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyBadge(word.difficulty_level || 'beginner')}`}>
                    {word.difficulty_level || 'beginner'}
                  </span>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{word.times_correct}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-gray-600">
                        {word.times_reviewed - word.times_correct}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(word)} transition-all`}
                    style={{ width: `${Math.min(100, (word.times_correct / 5) * 100)}%` }}
                  />
                </div>

                {isDue && (
                  <div className="mt-2 flex items-center gap-1 text-sm text-duolingo-yellow">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">Ready to review!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Word Modal */}
      <AddWordModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
