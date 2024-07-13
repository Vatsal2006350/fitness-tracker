import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: "sk-proj-RnFJoiRf4bTUZnF1jQkLT3BlbkFJOM8cSyrpSF8DQW0WlPvZ",
});

export const runtime = 'edge';

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Request completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    // Stream the response
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error processing chat request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process request' }),
    };
  }
}
