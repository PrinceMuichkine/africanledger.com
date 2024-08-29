import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();

  try {
    const input = `Translate to ${targetLanguage}: ${text}`;
    const response = await hf.textGeneration({
      model: "lelapa/InkubaLM-0.4B",
      inputs: input,
      parameters: {
        max_new_tokens: 1000,
        return_full_text: false,
      },
    });

    const translatedText = response.generated_text;
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation failed:', error);
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}