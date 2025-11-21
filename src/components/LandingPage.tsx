import { useState } from 'react';
import { MessageCircle, Trophy, BookOpen, TrendingUp, User, Sparkles } from 'lucide-react';
import AuthModal from './auth/AuthModal';

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-bg via-white to-duolingo-light-green">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🇩🇪</span>
              <span className="text-2xl font-display font-bold text-gray-800">
                German Learning AI
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => openAuth('login')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-6 py-2 bg-duolingo-green text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Master German Through
            <span className="block text-duolingo-green mt-2">
              AI-Powered Conversations
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice real-world German conversations with AI characters. Get instant feedback,
            build vocabulary, and track your progress—all at your own pace.
          </p>
          <button
            onClick={() => openAuth('signup')}
            className="px-8 py-4 bg-duolingo-green text-white text-lg rounded-xl hover:bg-green-600 transition-all transform hover:scale-105 font-bold shadow-lg"
          >
            Start Learning Now - It's Free!
          </button>
          <p className="text-sm text-gray-500 mt-4">No credit card required</p>
        </div>

        {/* Demo Preview */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-duolingo-blue" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">8 Scenarios</h3>
              <p className="text-sm text-gray-600">Coffee shops, restaurants, hotels, and more</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-duolingo-purple" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Characters</h3>
              <p className="text-sm text-gray-600">Each with unique personalities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-duolingo-green" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Instant Feedback</h3>
              <p className="text-sm text-gray-600">Grammar, vocabulary, and pronunciation tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-16">
            Everything You Need to Learn German
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-duolingo-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Voice Conversations</h3>
              <p className="text-gray-600">
                Practice speaking with AI using voice input and get natural audio responses
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-duolingo-purple" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vocabulary Builder</h3>
              <p className="text-gray-600">
                Save words, review with flashcards, and use spaced repetition for retention
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-duolingo-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                See your improvement over time with detailed stats and accuracy metrics
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-duolingo-yellow" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Achievements</h3>
              <p className="text-gray-600">
                Earn badges and celebrate milestones as you progress through your journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-duolingo-light-green to-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-duolingo-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose a Scenario</h3>
              <p className="text-gray-600">
                Pick from 8 real-world situations like ordering at a café or booking a hotel
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-duolingo-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Have a Conversation</h3>
              <p className="text-gray-600">
                Speak naturally with an AI character who responds like a real German speaker
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-duolingo-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Feedback & Improve</h3>
              <p className="text-gray-600">
                Receive instant corrections, tips, and track your progress over time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center text-gray-900 mb-4">
            Practice Real-World Scenarios
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Each scenario features a unique AI character with their own personality and catchphrases
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '☕', name: 'Coffee Shop', character: 'Lena the Barista' },
              { icon: '🍽️', name: 'Restaurant', character: 'Markus the Waiter' },
              { icon: '🛒', name: 'Supermarket', character: 'Frau Schmidt' },
              { icon: '🚂', name: 'Train Station', character: 'Herr Müller' },
              { icon: '🏨', name: 'Hotel', character: 'Anna the Receptionist' },
              { icon: '🏥', name: 'Doctor', character: 'Dr. Weber' },
              { icon: '💼', name: 'Workplace', character: 'Stefan' },
              { icon: '🎉', name: 'Social', character: 'Julia' },
            ].map((scenario) => (
              <div key={scenario.name} className="card text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-2">{scenario.icon}</div>
                <h3 className="font-bold text-gray-900">{scenario.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{scenario.character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-duolingo-green to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Ready to Start Your German Journey?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of learners improving their German every day
          </p>
          <button
            onClick={() => openAuth('signup')}
            className="px-8 py-4 bg-white text-duolingo-green text-lg rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-bold shadow-lg"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🇩🇪</span>
            <span className="text-xl font-display font-bold">German Learning AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            Master German through AI-powered conversations
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Built with Claude Code
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}
