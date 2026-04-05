import { NextRequest, NextResponse } from 'next/server';
import { SOFIA_SYSTEM_PROMPT } from '@/lib/sofia-prompt';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, page } = (await req.json()) as {
      messages: ChatMessage[];
      page?: string;
    };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Inject page context into system prompt
    const contextLine = page
      ? `\n\n## CONTEXTO ACTUAL\nEl visitante está en la página: ${page}`
      : '';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SOFIA_SYSTEM_PROMPT + contextLine,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return NextResponse.json({ error: 'AI service error' }, { status: 502 });
    }

    const data = await response.json();
    const text =
      data.content
        ?.filter((c: { type: string }) => c.type === 'text')
        .map((c: { text: string }) => c.text)
        .join('') || '';

    // Extract special tags
    const projectMatch = text.match(/\[PROJECT:(\w[\w-]*)\]/);
    const ctaMatch = text.match(/\[CTA:(\w+)\]/);
    const leadMatch = text.match(/\[LEAD:([^|]+)\|([^\]]+)\]/);

    // Clean tags from display text
    const cleanText = text
      .replace(/\[PROJECT:\w[\w-]*\]/g, '')
      .replace(/\[CTA:\w+\]/g, '')
      .replace(/\[LEAD:[^\]]+\]/g, '')
      .trim();

    return NextResponse.json({
      message: cleanText,
      project: projectMatch ? projectMatch[1] : null,
      cta: ctaMatch ? ctaMatch[1] : null,
      lead: leadMatch
        ? { name: leadMatch[1].trim(), phone: leadMatch[2].trim() }
        : null,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
