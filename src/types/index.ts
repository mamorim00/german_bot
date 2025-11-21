export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface Correction {
  text: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'cultural';
  explanation?: string;
  example?: string;
}

export interface Tip {
  id: string;
  type: 'phrase' | 'grammar' | 'vocabulary' | 'cultural';
  title: string;
  content: string;
  german?: string;
  english?: string;
}

export interface ConversationResponse {
  response: string;
  corrections: Correction[];
  hasErrors: boolean;
  audioUrl?: string;
  tips?: Tip[];
  positiveReinforcement?: string;
}

export interface CharacterPersona {
  name: string;
  occupation: string;
  personality: string[];
  catchphrases: string[];
  avatar: string;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  prompt: string;
  character: CharacterPersona;
  commonPhrases: Array<{ german: string; english: string }>;
}

export type CharacterMood = 'happy' | 'thinking' | 'celebrating' | 'encouraging';
