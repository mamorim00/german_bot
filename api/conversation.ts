import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      message,
      theme,
      conversationHistory,
      guidedMode,
      currentStep,
      challengeMode,
      userLevel,
      adaptivePrompt
    } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Handle new lesson format (guided/challenge mode)
    if (guidedMode && currentStep) {
      const systemPrompt = `Du bist ein freundlicher deutscher Sprachlehrer für ${userLevel || 'A1'} Lernende.

AUFGABE: Führe ein geführtes Gespräch zum Thema "${theme}".

AKTUELLER SCHRITT:
${currentStep.prompt}

${currentStep.expectedPhrases ? `ERWARTETE PHRASEN: ${currentStep.expectedPhrases.join(', ')}` : ''}

${adaptivePrompt || ''}

ANWEISUNGEN:
1. Antworte natürlich auf Deutsch
2. Gib konstruktives Feedback wenn der Lernende Fehler macht
3. Ermutige den Lernenden
4. Halte die Antworten kurz und fokussiert auf den aktuellen Schritt
5. Verwende passende Grammatik und Vokabular für ${userLevel || 'A1'} Level

ANTWORT-FORMAT (JSON):
{
  "response": "Deine Antwort auf Deutsch",
  "feedback": "Kurzes Feedback zur Antwort des Lernenden (optional)"
}`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...(conversationHistory || []).map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: messages as any,
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const responseContent = completion.choices[0].message.content;
      const parsedResponse = JSON.parse(responseContent || '{}');

      return res.status(200).json(parsedResponse);
    }

    // Handle challenge mode
    if (challengeMode) {
      const systemPrompt = `Du bist ein deutscher Muttersprachler in einer unerwarteten Gesprächssituation.

THEMA: ${theme}
LEVEL: ${userLevel || 'A1'}

${adaptivePrompt || ''}

ANWEISUNGEN:
1. Antworte natürlich auf die Situation
2. Sei authentisch und spontan
3. Halte das Gespräch interessant mit unerwarteten Wendungen
4. Verwende passende Grammatik für ${userLevel || 'A1'} Level

ANTWORT-FORMAT (JSON):
{
  "response": "Deine natürliche Antwort auf Deutsch"
}`;

      const messages = [
        { role: 'system', content: systemPrompt },
        ...(conversationHistory || []).map((msg: any) => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: messages as any,
        response_format: { type: 'json_object' },
        temperature: 0.8,
      });

      const responseContent = completion.choices[0].message.content;
      const parsedResponse = JSON.parse(responseContent || '{}');

      return res.status(200).json(parsedResponse);
    }

    // Handle old conversation practice format
    if (!theme || !theme.character) {
      return res.status(400).json({ error: 'Theme with character is required for practice mode' });
    }

    const systemPrompt = `Du bist ${theme.character.name}, ein/e ${theme.character.occupation}.

PERSÖNLICHKEIT: Du bist ${theme.character.personality.join(', ')}.

DEINE AUFGABE: Du führst ein natürliches Gespräch zum Thema: ${theme.prompt}

CHARAKTERISTIKA:
- Verwende gelegentlich deine typischen Sätze: ${theme.character.catchphrases.join(' | ')}
- Sprich natürlich mit Füllwörtern wie "na ja", "also", "hmm", "ach so"
- Stelle Nachfragen und zeige echtes Interesse am Gespräch
- Passe deinen Ton an die Situation an (formell im Hotel/Restaurant, locker mit Freunden)
- Nutze umgangssprachliche Ausdrücke, wenn es passt
- Referenziere frühere Aussagen im Gespräch

LERNBETREUUNG:
1. Analysiere den deutschen Text des Lernenden gründlich
2. Identifiziere Fehler in: Grammatik, Vokabular, Aussprache, und kulturelle Nuancen
3. Gib detailliertes, konstruktives Feedback mit Erklärungen
4. Biete Verbesserungsvorschläge und Beispiele
5. Feiere Erfolge! Erwähne, was gut gemacht wurde
6. Gib hilfreiche Tipps für das aktuelle Gesprächsthema

ANTWORT-FORMAT (JSON):
{
  "response": "Deine natürliche, charakteristische Antwort auf Deutsch mit Füllwörtern und Persönlichkeit",
  "corrections": [
    {
      "text": "Kurze Beschreibung des Fehlers oder der Verbesserung",
      "type": "grammar" | "vocabulary" | "pronunciation" | "cultural",
      "explanation": "Detaillierte Erklärung WARUM es falsch/besser ist",
      "example": "Ein konkretes Beispiel für die korrekte Verwendung"
    }
  ],
  "hasErrors": boolean,
  "positiveReinforcement": "Spezifisches Lob für etwas, das der Lernende gut gemacht hat (wenn zutreffend)",
  "tips": [
    {
      "id": "unique-id",
      "type": "phrase" | "grammar" | "vocabulary" | "cultural",
      "title": "Kurzer Titel",
      "content": "Hilfreicher Tipp bezogen auf das aktuelle Gespräch",
      "german": "Deutsche Phrase (optional)",
      "english": "Englische Übersetzung (optional)"
    }
  ]
}

WICHTIG:
- Sei authentisch und natürlich, nicht roboterhaft
- Halte das Gespräch am Laufen mit Fragen
- Sei geduldig und ermutigend
- Variiere deine Antworten
- Mach es zu einem echten Gespräch, nicht zu einem Test!`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages as any,
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const responseContent = completion.choices[0].message.content;
    const parsedResponse = JSON.parse(responseContent || '{}');

    return res.status(200).json(parsedResponse);
  } catch (error: any) {
    console.error('Conversation error:', error);
    return res.status(500).json({
      error: 'Failed to process conversation',
      details: error.message
    });
  }
}
