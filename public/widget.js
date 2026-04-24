(function () {
  const N8N_WEBHOOK = 'https://n8n.aussieai.shop/webhook/aussie-chatbot';
  const BOT_NAME = 'Aria';
  const BOT_AVATAR = '⚡';

  const sessionId = 'sess_' + Math.random().toString(36).slice(2);
  let messages = [];
  let isOpen = false;

  const styles = `
    #aussie-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #f5a623; border: none; cursor: pointer;
      font-size: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      transition: transform 0.2s; display: flex; align-items: center; justify-content: center;
    }
    #aussie-chat-btn:hover { transform: scale(1.1); }
    #aussie-chat-window {
      position: fixed; bottom: 96px; right: 24px; z-index: 99998;
      width: 360px; height: 520px; background: #fff;
      border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      display: none; flex-direction: column; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #aussie-chat-window.open { display: flex; }
    .aussie-header {
      background: #1a1a18; color: #fff; padding: 16px 18px;
      display: flex; align-items: center; gap: 12px;
    }
    .aussie-header-avatar { font-size: 24px; }
    .aussie-header-name { font-weight: 700; font-size: 15px; }
    .aussie-header-status { font-size: 12px; color: #f5a623; margin-top: 2px; }
    .aussie-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 10px; background: #f8f8f6;
    }
    .aussie-msg { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.5; }
    .aussie-msg.bot { background: #fff; color: #1a1a18; border-bottom-left-radius: 4px; align-self: flex-start; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .aussie-msg.user { background: #f5a623; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }
    .aussie-typing { display: flex; gap: 4px; padding: 10px 14px; background: #fff; border-radius: 12px; border-bottom-left-radius: 4px; width: fit-content; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .aussie-typing span { width: 7px; height: 7px; background: #aaa; border-radius: 50%; animation: aussie-bounce 1.2s infinite; }
    .aussie-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aussie-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes aussie-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
    .aussie-input-area { padding: 12px; background: #fff; border-top: 1px solid #eee; display: flex; gap: 8px; }
    .aussie-input {
      flex: 1; border: 1px solid #e0e0e0; border-radius: 24px; padding: 10px 16px;
      font-size: 14px; outline: none; transition: border-color 0.2s;
    }
    .aussie-input:focus { border-color: #f5a623; }
    .aussie-send {
      width: 40px; height: 40px; background: #f5a623; border: none; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s; flex-shrink: 0;
    }
    .aussie-send:hover { background: #e09510; }
    .aussie-send svg { width: 18px; height: 18px; fill: #fff; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  const btn = document.createElement('button');
  btn.id = 'aussie-chat-btn';
  btn.innerHTML = '💬';
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'aussie-chat-window';
  win.innerHTML = `
    <div class="aussie-header">
      <div class="aussie-header-avatar">${BOT_AVATAR}</div>
      <div>
        <div class="aussie-header-name">${BOT_NAME} — AussieAI</div>
        <div class="aussie-header-status">● Online now</div>
      </div>
    </div>
    <div class="aussie-messages" id="aussie-msgs"></div>
    <div class="aussie-input-area">
      <input class="aussie-input" id="aussie-input" type="text" placeholder="Ask me anything..." />
      <button class="aussie-send" id="aussie-send">
        <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(win);

  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    btn.innerHTML = isOpen ? '✕' : '💬';
    if (isOpen && messages.length === 0) sendGreeting();
  });

  function sendGreeting() {
    addBotMessage("Hi! I'm Aria from AussieAI. What kind of business do you run?");
  }

  function addBotMessage(text) {
    const el = document.createElement('div');
    el.className = 'aussie-msg bot';
    el.textContent = text;
    document.getElementById('aussie-msgs').appendChild(el);
    scrollBottom();
    messages.push({ role: 'assistant', content: text });
  }

  function addUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'aussie-msg user';
    el.textContent = text;
    document.getElementById('aussie-msgs').appendChild(el);
    scrollBottom();
    messages.push({ role: 'user', content: text });
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'aussie-typing';
    el.id = 'aussie-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('aussie-msgs').appendChild(el);
    scrollBottom();
  }

  function hideTyping() {
    const el = document.getElementById('aussie-typing');
    if (el) el.remove();
  }

  function scrollBottom() {
    const msgs = document.getElementById('aussie-msgs');
    msgs.scrollTop = msgs.scrollHeight;
  }

  const GREETINGS = /^(hey|hi|hello|yo|sup|g'day|hiya|howdy|heya|helo|hii|helo|hey there|hi there)[\s!.]*$/i;

  async function sendMessage(text) {
    // Intercept pure greetings mid-conversation — handle locally
    if (GREETINGS.test(text.trim()) && messages.length > 0) {
      addUserMessage(text);
      setTimeout(() => {
        const lastBot = messages.filter(m => m.role === 'assistant').pop();
        // Re-ask the last bot question naturally
        const reask = lastBot
          ? lastBot.content.replace(/^(hi|hey|hello|g'day)[^a-z]*/i, '').trim()
          : "What kind of business do you run?";
        addBotMessage("Hey! 😊 " + reask);
      }, 600);
      return;
    }

    addUserMessage(text);
    showTyping();

    try {
      const res = await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, sessionId })
      });
      const data = await res.json();
      hideTyping();
      addBotMessage(data.reply || "Sorry mate, something went wrong. Try again!");
    } catch (e) {
      hideTyping();
      addBotMessage("Oops, connection issue. Try again in a sec mate!");
    }
  }

  document.getElementById('aussie-send').addEventListener('click', () => {
    const input = document.getElementById('aussie-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendMessage(text);
  });

  document.getElementById('aussie-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('aussie-send').click();
  });
})();
