export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface Correction {
  text: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation';
}

export interface ConversationResponse {
  response: string;
  corrections: Correction[];
  hasErrors: boolean;
  audioUrl?: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  prompt: string;
}

export type CharacterMood = 'happy' | 'thinking' | 'celebrating' | 'encouraging';
