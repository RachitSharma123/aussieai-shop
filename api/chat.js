const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'deepseek/deepseek-chat';
const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_ITEMS = 10;
const REQUEST_TIMEOUT_MS = 22000;

const SYSTEM_PROMPT = `You are Aria, the website assistant for Aussie AI in Melbourne.

Aussie AI builds custom AI agents, workflow automation, missed-call follow-up, inbox support, CRM/tool integrations, websites with AI chat, smart forms, booking flows and lead capture for Australian businesses.

Keep replies concise, practical and friendly. Ask one clear question at a time. Help visitors identify what repetitive admin, enquiries, missed calls, bookings, inbox work, CRM updates or follow-up they could automate.

If someone wants pricing, a quote, a demo or an audit, invite them to leave their email or use the contact form. Do not invent prices, guarantees, case studies, team size or unavailable integrations. Do not provide legal, medical or financial advice.`;

function sendJson(response, status, payload) {
  response.status(status).json(payload);
}

function getHeader(request, name) {
  const headers = request.headers || {};
  return headers[name] || headers[name.toLowerCase()] || '';
}

function isAllowedOrigin(origin) {
  if (!origin) return true;

  try {
    const host = new URL(origin).hostname;
    return ['aussieai.shop', 'www.aussieai.shop', 'localhost', '127.0.0.1'].includes(host);
  } catch {
    return false;
  }
}

async function readBody(request) {
  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
    return request.body;
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body || '{}');
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function cleanMessage(message) {
  if (!message || typeof message !== 'object') return null;
  if (!['user', 'assistant'].includes(message.role)) return null;
  if (typeof message.content !== 'string') return null;

  const content = message.content.trim().slice(0, MAX_MESSAGE_LENGTH);
  if (!content) return null;

  return { role: message.role, content };
}

function cleanMessages(rawMessages) {
  const source = Array.isArray(rawMessages) ? rawMessages : [];
  return source
    .map(cleanMessage)
    .filter(Boolean)
    .slice(-MAX_HISTORY_ITEMS);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(getHeader(request, 'origin'))) {
    return sendJson(response, 403, { error: 'Request origin is not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return sendJson(response, 503, { error: 'Chat is not configured yet' });
  }

  let body;
  try {
    body = await readBody(request);
  } catch {
    return sendJson(response, 400, { error: 'Invalid JSON body' });
  }

  const messages = cleanMessages(body.messages);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === 'user');

  if (!latestUserMessage) {
    return sendJson(response, 422, { error: 'A user message is required' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const openRouterResponse = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'https://aussieai.shop',
        'X-OpenRouter-Title': 'Aussie AI',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature: 0.35,
        max_tokens: 420,
      }),
    });

    const data = await openRouterResponse.json().catch(() => ({}));

    if (!openRouterResponse.ok) {
      return sendJson(response, 502, { error: 'AI service is unavailable right now' });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return sendJson(response, 502, { error: 'AI service returned an empty reply' });
    }

    return sendJson(response, 200, { reply });
  } catch (error) {
    if (error?.name === 'AbortError') {
      return sendJson(response, 504, { error: 'AI service timed out' });
    }

    return sendJson(response, 502, { error: 'AI service is unavailable right now' });
  } finally {
    clearTimeout(timeout);
  }
}
