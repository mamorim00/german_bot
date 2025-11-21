import { Message } from '../types/index';
import { Volume2, User, Bot } from 'lucide-react';

interface ConversationViewProps {
  messages: Message[];
  onPlayAudio?: (audioUrl: string) => void;
}

export default function ConversationView({ messages, onPlayAudio }: ConversationViewProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          <p className="text-lg font-semibold mb-2">Start your conversation!</p>
          <p className="text-sm">Tap the microphone to begin speaking in German</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-10 h-10 bg-gradient-to-br from-duolingo-green to-duolingo-light-green rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}

            <div
              className={`max-w-[70%] rounded-2xl p-4 ${
                message.role === 'user'
                  ? 'bg-duolingo-blue text-white'
                  : 'bg-white shadow-md text-gray-800'
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed">{message.content}</p>

              {message.audioUrl && onPlayAudio && (
                <button
                  onClick={() => onPlayAudio(message.audioUrl!)}
                  className="mt-2 flex items-center gap-2 text-xs opacity-70 hover:opacity-100 transition-opacity"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Play audio</span>
                </button>
              )}

              <span className="text-xs opacity-60 block mt-2">
                {new Date(message.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {message.role === 'user' && (
              <div className="w-10 h-10 bg-gradient-to-br from-duolingo-blue to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
