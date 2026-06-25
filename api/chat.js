import { generateSystemPrompt, buildScopedContext } from '../src/services/aiContext.js';

export const config = {
  runtime: 'edge',
};

const CEREBRAS_URL = 'https://api.cerebras.ai/v1/chat/completions';

export default async function handler(req) {
  // Hanya ijinkan method POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 1. CORS / Origin Check
  const origin = req.headers.get('origin');
  if (!origin) {
    return new Response(JSON.stringify({ error: 'Forbidden: Missing Origin header.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(origin);
    const hostname = url.hostname;
    const isAllowed = 
      hostname === 'localhost' || 
      hostname === '127.0.0.1' ||
      hostname.includes('hery2606') ||
      hostname.endsWith('.github.io') ||
      hostname.endsWith('.vercel.app') ||
      hostname.includes('motionfolio');
       
    if (!isAllowed) {
      return new Response(JSON.stringify({ error: 'Forbidden: Unauthorized origin.' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Forbidden: Invalid Origin header.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Ambil CEREBRAS_API_KEY dari env server
  const apiKey = process.env.CEREBRAS_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error: CEREBRAS_API_KEY is missing.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    const { messages, vibe, freeMode } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid payload: messages must be an array.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Reconstruct System Prompt on the Server Side
    // Discard any incoming client-side system messages to prevent prompt injection / payload hijacking.
    const cleanHistory = messages.filter(m => m.role !== 'system');
    
    // Find the latest user message from the clean history to build context
    const latestUserMessage = [...cleanHistory].reverse().find(m => m.role === 'user')?.content || '';
    
    const systemPrompt = generateSystemPrompt(vibe || 'ramah', !!freeMode);
    const scopedContext = buildScopedContext(latestUserMessage);

    const conversation = [
      { role: "system", content: systemPrompt },
      ...(scopedContext ? [{ role: 'system', content: scopedContext }] : []),
      ...cleanHistory
    ];

    // Panggil API Cerebras hulu (upstream) dengan mode stream
    const upstreamResponse = await fetch(CEREBRAS_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: conversation,
        model: 'gpt-oss-120b',
        max_tokens: 1024,
        temperature: 0.35,
        stream: true,
      }),
    });

    if (!upstreamResponse.ok) {
      return new Response(
        JSON.stringify({ error: `Upstream service error: ${upstreamResponse.statusText}` }),
        {
          status: upstreamResponse.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Alirkan stream mentah langsung kembali ke klien
    return new Response(upstreamResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
