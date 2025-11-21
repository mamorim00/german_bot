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
    const { message, theme, conversationHistory } = req.body;

    if (!message || !theme) {
      return res.status(400).json({ error: 'Message and theme are required' });
    }

    const systemPrompt = `Du bist ein freundlicher deutscher Sprachlehrer. Du führst ein Gespräch zum Thema: ${theme.prompt}

Deine Aufgaben:
1. Analysiere den deutschen Text des Lernenden auf Fehler (Grammatik, Vokabular, Aussprache)
2. Antworte natürlich und ermutigend auf Deutsch
3. Gib konstruktives Feedback zu Fehlern

Format deine Antwort als JSON:
{
  "response": "Deine natürliche Antwort auf Deutsch",
  "corrections": [
    {
      "text": "Beschreibung der Korrektur",
      "type": "grammar" | "vocabulary" | "pronunciation"
    }
  ],
  "hasErrors": boolean
}

Sei geduldig, ermutigend und hilfsbereit. Feiere auch kleine Erfolge!`;

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
