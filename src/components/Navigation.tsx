import { MessageCircle, Book, TrendingUp, Trophy } from 'lucide-react';

interface NavigationProps {
  currentPage: 'practice' | 'vocabulary' | 'progress' | 'achievements';
  onPageChange: (page: 'practice' | 'vocabulary' | 'progress' | 'achievements') => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'practice' as const, icon: MessageCircle, label: 'Practice', color: 'text-duolingo-blue' },
    { id: 'vocabulary' as const, icon: Book, label: 'Vocabulary', color: 'text-duolingo-purple' },
    { id: 'progress' as const, icon: TrendingUp, label: 'Progress', color: 'text-duolingo-green' },
    { id: 'achievements' as const, icon: Trophy, label: 'Achievements', color: 'text-duolingo-yellow' },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
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
  );
}
