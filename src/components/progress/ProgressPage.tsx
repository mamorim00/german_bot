import { TrendingUp, MessageCircle, Clock, Target, Calendar } from 'lucide-react';
import { useProgress } from '../../contexts/ProgressContext';
import { themes } from '../../lib/themes';
import { Theme } from '../../types/index';

export default function ProgressPage() {
  const { userProgress, conversationHistory, getTotalXP, loading } = useProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-duolingo-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalConversations = userProgress.reduce((sum, p) => sum + p.conversations_count, 0);
  const totalMessages = userProgress.reduce((sum, p) => sum + p.total_messages, 0);
  const totalCorrect = userProgress.reduce((sum, p) => sum + p.correct_messages, 0);
  const totalTimeMinutes = Math.floor(
    userProgress.reduce((sum, p) => sum + p.total_time_seconds, 0) / 60
  );
  const overallAccuracy = totalMessages > 0 ? Math.round((totalCorrect / totalMessages) * 100) : 0;

  const getThemeName = (themeId: string) => {
    const theme = themes.find((t: Theme) => t.id === themeId);
    return theme ? theme.name : themeId;
  };

  const getThemeIcon = (themeId: string) => {
    const theme = themes.find((t: Theme) => t.id === themeId);
    return theme ? theme.icon : '📚';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="w-8 h-8 text-duolingo-green" />
        <h1 className="text-3xl font-display font-bold text-gray-800">My Progress</h1>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-gradient-to-br from-duolingo-green to-green-600 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-3xl font-bold">{getTotalXP()}</span>
          </div>
          <p className="text-sm opacity-90">Total XP</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-8 h-8 text-duolingo-blue" />
            <span className="text-3xl font-bold text-gray-800">{totalConversations}</span>
          </div>
          <p className="text-sm text-gray-600">Conversations</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-duolingo-purple" />
            <span className="text-3xl font-bold text-gray-800">{totalTimeMinutes}</span>
          </div>
          <p className="text-sm text-gray-600">Minutes Practiced</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-duolingo-yellow" />
            <span className="text-3xl font-bold text-gray-800">{overallAccuracy}%</span>
          </div>
          <p className="text-sm text-gray-600">Overall Accuracy</p>
        </div>
      </div>

      {/* Theme Progress */}
      <div className="card">
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">Progress by Theme</h2>

        {userProgress.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Start a conversation to see your progress!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProgress.map((progress) => {
              const accuracy = progress.total_messages > 0
                ? Math.round((progress.correct_messages / progress.total_messages) * 100)
                : 0;
              const avgTimeMinutes = Math.round(progress.total_time_seconds / 60 / progress.conversations_count);

              return (
                <div key={progress.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{getThemeIcon(progress.theme_id)}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{getThemeName(progress.theme_id)}</h3>
                      <p className="text-sm text-gray-500">
                        {progress.conversations_count} {progress.conversations_count === 1 ? 'conversation' : 'conversations'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-lg font-bold text-duolingo-green">{accuracy}%</p>
                      <p className="text-xs text-gray-600">Accuracy</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-duolingo-blue">{progress.total_messages}</p>
                      <p className="text-xs text-gray-600">Messages</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-duolingo-purple">{avgTimeMinutes}m</p>
                      <p className="text-xs text-gray-600">Avg Time</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-duolingo-green transition-all"
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent Conversations */}
      <div className="card">
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">Recent Conversations</h2>

        {conversationHistory.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Your conversation history will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {conversationHistory.map((conversation) => {
              const messageCount = Array.isArray(conversation.messages) ? conversation.messages.length : 0;
              const date = new Date(conversation.created_at);
              const formattedDate = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={conversation.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getThemeIcon(conversation.theme_id)}</span>
                      <span className="font-semibold text-gray-800">
                        {getThemeName(conversation.theme_id)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {messageCount} messages
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.floor(conversation.duration_seconds / 60)}m {conversation.duration_seconds % 60}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {Math.round(conversation.accuracy_score)}% accuracy
                    </span>
                    <span className="font-semibold text-duolingo-green">
                      +{conversation.xp_earned} XP
                    </span>
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
