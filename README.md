# German Language Learning App 🇩🇪

A friendly, interactive German language learning app featuring voice conversations with an AI teacher. Practice real-world scenarios like ordering coffee, shopping, and more!

## Features

- **Voice Conversations** - Real-time speech recognition and natural voice interactions
- **8 Theme-Based Scenarios** - Coffee shop, restaurant, grocery store, train station, hotel, doctor's office, workplace, and social gatherings
- **AI-Powered Feedback** - Instant corrections on grammar, vocabulary, and pronunciation
- **Friendly Character** - Animated AI teacher with different moods and reactions
- **Duolingo-Inspired Design** - Warm, encouraging UI with bright colors and smooth animations
- **Progress Tracking** - Monitor your conversation practice

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom warm color palette
- **AI**: OpenAI GPT-4 for conversations
- **Speech**: OpenAI Whisper for transcription, TTS for voice responses
- **Deployment**: Vercel with serverless functions

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd german_bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

Note: In development, the API routes won't work locally since they require Vercel's serverless environment. See the "Local Development with API" section below.

## Building for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel**

   Add your OpenAI API key in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add `OPENAI_API_KEY` with your API key value

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Local Development with API

To test the API routes locally, use Vercel's development server:

```bash
npm install -g vercel
vercel dev
```

This will start a local server that mimics Vercel's serverless environment.

## Project Structure

```
german_bot/
├── api/                          # Vercel serverless functions
│   ├── conversation.ts          # GPT-4 conversation endpoint
│   ├── transcribe.ts            # Whisper speech-to-text
│   └── speak.ts                 # OpenAI TTS endpoint
├── src/
│   ├── components/              # React components
│   │   ├── Character.tsx        # AI teacher avatar
│   │   ├── ConversationView.tsx # Chat display
│   │   ├── ThemeSelector.tsx    # Scenario picker
│   │   ├── VoiceRecorder.tsx    # Audio recording
│   │   └── FeedbackPanel.tsx    # Grammar corrections
│   ├── lib/
│   │   └── themes.ts            # Conversation scenarios
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── App.tsx                  # Main application
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tailwind styles
├── public/                       # Static assets
├── .env.example                 # Example environment variables
├── vercel.json                  # Vercel configuration
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json
```

## How It Works

1. **Select a Theme** - Choose from 8 real-world conversation scenarios
2. **Start Speaking** - Tap the microphone and speak in German
3. **AI Listens** - OpenAI Whisper transcribes your speech
4. **Get Feedback** - GPT-4 analyzes your German for errors
5. **Hear Response** - The AI teacher responds with voice and text
6. **Learn & Improve** - Review corrections and keep practicing

## Conversation Themes

- ☕ **Kaffeehaus** - Coffee shop orders and small talk
- 🍽️ **Restaurant** - Making reservations and ordering meals
- 🛒 **Supermarkt** - Shopping for groceries
- 🚂 **Bahnhof** - Train station and public transport
- 🏨 **Hotel** - Check-in and hotel services
- 🏥 **Arztpraxis** - Doctor's office visits
- 💼 **Arbeitsplatz** - Professional workplace conversations
- 🎉 **Freunde treffen** - Casual social gatherings

## Customization

### Adding New Themes

Edit `src/lib/themes.ts` to add new conversation scenarios:

```typescript
{
  id: 'my-theme',
  name: 'Theme Name',
  description: 'Brief description',
  icon: '🎯',
  color: 'bg-blue-500',
  prompt: 'Conversation context for the AI...',
}
```

### Changing Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  'duolingo-green': '#58CC02',
  // Add your custom colors...
}
```

## API Endpoints

### POST `/api/conversation`
Analyzes German text and generates teacher response
- **Body**: `{ message, theme, conversationHistory }`
- **Returns**: `{ response, corrections[], hasErrors }`

### POST `/api/transcribe`
Converts audio to German text
- **Body**: FormData with audio file
- **Returns**: `{ transcription }`

### POST `/api/speak`
Converts German text to speech
- **Body**: `{ text }`
- **Returns**: Audio file (MP3)

## Browser Compatibility

- Chrome/Edge: Full support (Web Speech API + MediaRecorder)
- Firefox: Full support
- Safari: Requires HTTPS for microphone access
- Mobile: Tested on iOS Safari and Android Chrome

## Troubleshooting

**Microphone not working?**
- Ensure HTTPS is enabled (required for microphone access)
- Check browser permissions for microphone access
- Try a different browser (Chrome/Edge recommended)

**API errors?**
- Verify your OpenAI API key is set correctly
- Check API key has sufficient credits
- Review Vercel function logs for errors

**Build errors?**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version (18+ required)

## License

MIT License - feel free to use this project for learning and inspiration!

## Acknowledgments

- Inspired by Duolingo's friendly learning approach
- Powered by OpenAI's GPT-4, Whisper, and TTS APIs
- Built with React, TypeScript, and Tailwind CSS

## Contributing

Contributions are welcome! Feel free to:
- Add new conversation themes
- Improve the UI/UX
- Add more languages
- Enhance the feedback system

---

**Happy learning! Viel Erfolg! 🎉**
