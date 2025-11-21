/**
 * Utility for German text-to-speech with proper German accent
 */

let germanVoice: SpeechSynthesisVoice | null = null;
let voicesLoaded = false;

/**
 * Get the best available German voice from the browser
 */
export const getGermanVoice = (): Promise<SpeechSynthesisVoice | null> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(null);
      return;
    }

    // If we already have a voice cached, return it
    if (voicesLoaded && germanVoice) {
      resolve(germanVoice);
      return;
    }

    const selectBestGermanVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      if (voices.length === 0) {
        resolve(null);
        return;
      }

      // Filter for German voices
      const germanVoices = voices.filter(voice =>
        voice.lang.startsWith('de') || voice.lang.startsWith('de-DE')
      );

      if (germanVoices.length === 0) {
        console.warn('No German voices available, speech may have incorrect accent');
        resolve(null);
        return;
      }

      // Prioritize voices in this order:
      // 1. German voices that are marked as local/default
      // 2. German voices with "Google" in the name (usually good quality)
      // 3. Any German voice

      const localGermanVoice = germanVoices.find(v => v.localService && v.default);
      if (localGermanVoice) {
        germanVoice = localGermanVoice;
        voicesLoaded = true;
        console.log('Selected German voice:', germanVoice.name);
        resolve(germanVoice);
        return;
      }

      const googleGermanVoice = germanVoices.find(v =>
        v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('deutsch')
      );
      if (googleGermanVoice) {
        germanVoice = googleGermanVoice;
        voicesLoaded = true;
        console.log('Selected German voice:', germanVoice.name);
        resolve(germanVoice);
        return;
      }

      // Prefer female voices as they tend to be clearer for learning
      const femaleGermanVoice = germanVoices.find(v =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('anna') ||
        v.name.toLowerCase().includes('petra')
      );
      if (femaleGermanVoice) {
        germanVoice = femaleGermanVoice;
        voicesLoaded = true;
        console.log('Selected German voice:', germanVoice.name);
        resolve(germanVoice);
        return;
      }

      // Fall back to first German voice
      germanVoice = germanVoices[0];
      voicesLoaded = true;
      console.log('Selected German voice:', germanVoice.name);
      resolve(germanVoice);
    };

    // Voices might not be loaded immediately
    if (window.speechSynthesis.getVoices().length > 0) {
      selectBestGermanVoice();
    } else {
      // Wait for voices to load
      window.speechSynthesis.onvoiceschanged = () => {
        selectBestGermanVoice();
      };

      // Timeout after 2 seconds
      setTimeout(() => {
        if (!voicesLoaded) {
          selectBestGermanVoice();
        }
      }, 2000);
    }
  });
};

/**
 * Speak German text with proper German accent
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
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Get the best German voice
  const voice = await getGermanVoice();

  const utterance = new SpeechSynthesisUtterance(text);

  // Set the German voice if available
  if (voice) {
    utterance.voice = voice;
  }

  // Always set the language to German
  utterance.lang = 'de-DE';

  // Apply options
  utterance.rate = options?.rate ?? 0.85; // Slightly slower for learning
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
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
