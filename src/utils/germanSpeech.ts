/**
 * Utility for German text-to-speech with proper German accent
 * Uses OpenAI TTS API for high-quality native German pronunciation
 */

let currentAudio: HTMLAudioElement | null = null;

/**
 * Speak German text with native German pronunciation using OpenAI TTS
 * @param text - The German text to speak
 * @param options - Optional speech synthesis options
 */
export const speakGerman = async (
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onStart?: () => void;
  }
): Promise<void> => {
  try {
    console.log('🔊 speakGerman called with text:', text.substring(0, 50) + '...');

    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    // Call the speak API to get German audio
    console.log('📡 Fetching audio from /api/speak...');
    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    console.log('📡 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ API error:', errorData);
      throw new Error(`Failed to generate speech: ${errorData.error || response.statusText}`);
    }

    // Create audio from the response
    const audioBlob = await response.blob();
    console.log('📦 Audio blob size:', audioBlob.size, 'bytes, type:', audioBlob.type);

    if (audioBlob.size === 0) {
      throw new Error('Received empty audio blob');
    }

    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('🎵 Created audio URL:', audioUrl);

    const audio = new Audio(audioUrl);
    currentAudio = audio;

    // Apply volume
    audio.volume = options?.volume ?? 1.0;

    // Setup event handlers BEFORE playing
    audio.addEventListener('loadeddata', () => {
      console.log('✅ Audio loaded successfully');
    });

    audio.addEventListener('play', () => {
      console.log('▶️ Audio playing');
      options?.onStart?.();
    });

    audio.addEventListener('ended', () => {
      console.log('⏹️ Audio ended');
      options?.onEnd?.();
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
    });

    audio.addEventListener('error', (e) => {
      console.error('❌ Audio playback error:', e);
      console.error('Audio error details:', {
        error: audio.error,
        networkState: audio.networkState,
        readyState: audio.readyState,
      });
      URL.revokeObjectURL(audioUrl);
      currentAudio = null;
      // Fallback to browser TTS on audio element error
      fallbackToSpeechSynthesis(text, options);
    });

    // Play the audio
    console.log('🎬 Attempting to play audio...');
    try {
      await audio.play();
      console.log('✅ Audio play() succeeded');
    } catch (playError) {
      console.error('❌ Audio play() failed:', playError);
      // Try to provide more context about the error
      if (playError instanceof Error) {
        console.error('Error name:', playError.name);
        console.error('Error message:', playError.message);
      }
      throw playError;
    }
  } catch (error) {
    console.error('❌ Error in speakGerman:', error);
    // Fallback to browser speech synthesis if API fails
    console.log('🔄 Falling back to browser speech synthesis...');
    fallbackToSpeechSynthesis(text, options);
  }
};

/**
 * Fallback to browser's speech synthesis if API fails
 */
const fallbackToSpeechSynthesis = (
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onStart?: () => void;
  }
): void => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = options?.rate ?? 0.85;
  utterance.pitch = options?.pitch ?? 1.0;
  utterance.volume = options?.volume ?? 1.0;

  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }

  if (options?.onStart) {
    utterance.onstart = options.onStart;
  }

  window.speechSynthesis.speak(utterance);
};

/**
 * Stop any ongoing speech
 */
export const stopSpeaking = (): void => {
  // Stop API audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Stop browser speech synthesis
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
