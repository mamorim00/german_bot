import { Theme } from '../types/index';
import { themes } from '../lib/themes';

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme) => void;
  selectedTheme?: Theme;
}

export default function ThemeSelector({ onSelectTheme, selectedTheme }: ThemeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-gray-800 mb-3">
          Wähle ein Thema! 🎯
        </h1>
        <p className="text-lg text-gray-600">
          Pick a conversation scenario to practice your German
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelectTheme(theme)}
            className={`card text-left group hover:shadow-xl transition-all ${
              selectedTheme?.id === theme.id ? 'ring-4 ring-duolingo-green scale-105' : ''
            }`}
          >
            <div className={`w-16 h-16 ${theme.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {theme.icon}
            </div>
            <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
              {theme.name}
            </h3>
            <p className="text-sm text-gray-600">
              {theme.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
