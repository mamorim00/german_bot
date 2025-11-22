import { MessageCircle, Book, TrendingUp, Trophy, BookOpen } from 'lucide-react';

interface NavigationProps {
  currentPage: 'practice' | 'lessons' | 'vocabulary' | 'progress' | 'achievements';
  onPageChange: (page: 'practice' | 'lessons' | 'vocabulary' | 'progress' | 'achievements') => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'practice' as const, icon: MessageCircle, label: 'Practice', color: 'text-duolingo-blue' },
    { id: 'lessons' as const, icon: BookOpen, label: 'Lessons', color: 'text-duolingo-green' },
    { id: 'vocabulary' as const, icon: Book, label: 'Vocabulary', color: 'text-duolingo-purple' },
    { id: 'progress' as const, icon: TrendingUp, label: 'Progress', color: 'text-green-600' },
    { id: 'achievements' as const, icon: Trophy, label: 'Achievements', color: 'text-duolingo-yellow' },
  ];

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:block bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                    isActive
                      ? `${item.color} bg-gray-50`
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-current rounded-t"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom (App-like) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-bottom">
        <div className="flex items-center justify-around px-2 pb-1 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                  isActive
                    ? `${item.color} bg-gray-50`
                    : 'text-gray-500 active:bg-gray-100'
                }`}
              >
                <Icon className={`${isActive ? 'w-6 h-6' : 'w-5 h-5'} transition-all`} />
                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-current rounded-b"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden h-20"></div>
    </>
  );
}
