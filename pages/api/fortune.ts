import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';
import { PROMPTS, IMPORTANT_POLICY } from '@/prompts';

export const config = {
  api: {
    bodyParser: true,
    responseLimit: false,
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Debug: APIキーの存在確認
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set');
} else {
  console.log('OPENAI_API_KEY is configured, length:', process.env.OPENAI_API_KEY.length);
  console.log('API Key starts with:', process.env.OPENAI_API_KEY.substring(0, 10) + '...');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
  const { question, cards } = req.body;

  const prompt = `
${IMPORTANT_POLICY}

${PROMPTS.character}

${PROMPTS.style}

${PROMPTS.technique}

【問い】
${question}

【引かれたカード】
- ${cards[0].position}：${cards[0].cardName}（${cards[0].isReversed ? "逆位置" : "正位置"}）
- ${cards[1].position}：${cards[1].cardName}（${cards[1].isReversed ? "逆位置" : "正位置"}）
- ${cards[2].position}：${cards[2].cardName}（${cards[2].isReversed ? "逆位置" : "正位置"}）
`;

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
    max_tokens: 800,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      res.write(content);
    }
  }
  res.end();
  } catch (error: unknown) {
    console.error('OpenAI API Error:', error);
    const message = typeof error === 'object' && error && 'message' in error ? (error as { message: string }).message : 'Internal Server Error';
    
    // APIキーエラーの場合、詳細情報をログ出力
    if (message.includes('API key') || message.includes('401')) {
      console.error('API Key issue detected. Current key starts with:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    }
    
    res.status(500).json({ error: message });
  }
} 