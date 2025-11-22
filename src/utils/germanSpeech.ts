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
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Call the speak API to get German audio
    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate speech');
    }

    // Create audio from the response
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    currentAudio = audio;

    // Apply volume
    audio.volume = options?.volume ?? 1.0;

    // Apply playback rate (speed)
    audio.playbackRate = options?.rate ?? 1.0;

    // Setup event handlers
    if (options?.onStart) {
      audio.addEventListener('play', options.onStart);
    }

    if (options?.onEnd) {
      audio.addEventListener('ended', () => {
        options.onEnd?.();
        URL.revokeObjectURL(audioUrl);
      });
    } else {
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      });
    }

    // Play the audio
    await audio.play();
  } catch (error) {
    console.error('Error speaking German text:', error);
    // Fallback to browser speech synthesis if API fails
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
