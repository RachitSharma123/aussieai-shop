(function () {
  const API_ENDPOINT = '/api/chat';
  const BOT_NAME = 'Aria';
  const sessionId = 'chat_' + Math.random().toString(36).slice(2);
  const messages = [];
  let isOpen = false;
  let isSending = false;

  const styles = `
    .aussie-chat-launcher {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 1000;
      display: inline-flex;
      width: 62px;
      height: 62px;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(31, 26, 16, 0.12);
      border-radius: 999px;
      color: #1f1a10;
      background: linear-gradient(135deg, #ffc85d, #f4a62a);
      box-shadow: 0 18px 42px rgba(44, 54, 51, 0.22);
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .aussie-chat-launcher:hover {
      transform: translateY(-2px);
      box-shadow: 0 22px 48px rgba(44, 54, 51, 0.26);
    }

    .aussie-chat-launcher svg {
      width: 27px;
      height: 27px;
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2.2;
    }

    .aussie-chat-panel {
      position: fixed;
      right: 22px;
      bottom: 96px;
      z-index: 1000;
      display: grid;
      width: min(372px, calc(100vw - 28px));
      height: min(500px, calc(100vh - 140px));
      grid-template-rows: auto 1fr auto;
      overflow: hidden;
      border: 1px solid rgba(46, 125, 99, 0.18);
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.94);
      box-shadow: 0 28px 70px rgba(44, 54, 51, 0.24);
      backdrop-filter: blur(22px);
      opacity: 0;
      pointer-events: none;
      transform: translateY(14px) scale(0.98);
      transition: opacity 0.22s ease, transform 0.22s ease;
    }

    .aussie-chat-panel.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }

    .aussie-chat-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid rgba(23, 33, 31, 0.08);
      background:
        radial-gradient(circle at 12% 0%, rgba(244, 166, 42, 0.2), transparent 42%),
        linear-gradient(135deg, rgba(238, 247, 242, 0.95), rgba(255, 249, 236, 0.92));
    }

    .aussie-chat-mark {
      display: grid;
      width: 42px;
      height: 42px;
      place-items: center;
      border-radius: 15px;
      color: #1f1a10;
      font-size: 0.82rem;
      font-weight: 900;
      background: linear-gradient(135deg, #ffd47a, #f4a62a);
      box-shadow: 0 12px 24px rgba(244, 166, 42, 0.2);
    }

    .aussie-chat-title {
      min-width: 0;
      flex: 1;
      color: #17211f;
      font-size: 0.96rem;
      font-weight: 850;
      line-height: 1.2;
    }

    .aussie-chat-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 3px;
      color: #155c49;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .aussie-chat-status::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #2e7d63;
      box-shadow: 0 0 0 5px rgba(46, 125, 99, 0.1);
    }

    .aussie-chat-close {
      display: grid;
      width: 36px;
      height: 36px;
      place-items: center;
      border: 1px solid rgba(23, 33, 31, 0.08);
      border-radius: 999px;
      color: #17211f;
      background: rgba(255, 255, 255, 0.72);
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 850;
    }

    .aussie-chat-messages {
      display: flex;
      min-height: 0;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      padding: 16px;
      background:
        radial-gradient(circle at 90% 14%, rgba(47, 111, 237, 0.08), transparent 34%),
        linear-gradient(180deg, rgba(255, 249, 236, 0.62), rgba(238, 247, 242, 0.5));
    }

    .aussie-chat-message {
      max-width: 86%;
      border: 1px solid rgba(23, 33, 31, 0.08);
      border-radius: 17px;
      padding: 10px 12px;
      color: #17211f;
      font-size: 0.9rem;
      line-height: 1.45;
      white-space: pre-wrap;
      word-break: break-word;
      box-shadow: 0 8px 20px rgba(44, 54, 51, 0.06);
    }

    .aussie-chat-message.bot {
      align-self: flex-start;
      border-bottom-left-radius: 6px;
      background: rgba(255, 255, 255, 0.88);
    }

    .aussie-chat-message.user {
      align-self: flex-end;
      border-color: rgba(244, 166, 42, 0.38);
      border-bottom-right-radius: 6px;
      background: linear-gradient(135deg, rgba(255, 207, 109, 0.96), rgba(244, 166, 42, 0.92));
      font-weight: 650;
    }

    .aussie-chat-starters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 2px;
    }

    .aussie-chat-starter {
      border: 1px solid rgba(46, 125, 99, 0.16);
      border-radius: 999px;
      padding: 8px 10px;
      color: #155c49;
      background: rgba(255, 255, 255, 0.72);
      cursor: pointer;
      font: inherit;
      font-size: 0.78rem;
      font-weight: 800;
    }

    .aussie-chat-typing {
      display: inline-flex;
      width: fit-content;
      gap: 5px;
      align-items: center;
      border: 1px solid rgba(23, 33, 31, 0.08);
      border-radius: 16px;
      border-bottom-left-radius: 6px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 8px 20px rgba(44, 54, 51, 0.06);
    }

    .aussie-chat-typing span {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: #2e7d63;
      animation: aussieChatPulse 1.2s ease-in-out infinite;
    }

    .aussie-chat-typing span:nth-child(2) {
      animation-delay: 0.15s;
    }

    .aussie-chat-typing span:nth-child(3) {
      animation-delay: 0.3s;
    }

    .aussie-chat-form {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid rgba(23, 33, 31, 0.08);
      background: rgba(255, 255, 255, 0.92);
    }

    .aussie-chat-input {
      min-width: 0;
      flex: 1;
      border: 1px solid rgba(23, 33, 31, 0.12);
      border-radius: 999px;
      padding: 12px 14px;
      color: #17211f;
      background: rgba(248, 246, 240, 0.88);
      font: inherit;
      outline: none;
    }

    .aussie-chat-input:focus {
      border-color: rgba(244, 166, 42, 0.54);
      box-shadow: 0 0 0 3px rgba(244, 166, 42, 0.13);
    }

    .aussie-chat-send {
      display: grid;
      width: 44px;
      height: 44px;
      flex: 0 0 auto;
      place-items: center;
      border: 0;
      border-radius: 999px;
      color: #1f1a10;
      background: linear-gradient(135deg, #ffc85d, #f4a62a);
      cursor: pointer;
      box-shadow: 0 10px 22px rgba(244, 166, 42, 0.24);
    }

    .aussie-chat-send:disabled {
      cursor: wait;
      opacity: 0.65;
    }

    .aussie-chat-send svg {
      width: 19px;
      height: 19px;
      fill: currentColor;
    }

    @keyframes aussieChatPulse {
      0%, 80%, 100% {
        transform: translateY(0);
        opacity: 0.45;
      }
      40% {
        transform: translateY(-5px);
        opacity: 1;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .aussie-chat-launcher,
      .aussie-chat-panel,
      .aussie-chat-typing span {
        animation: none !important;
        transition: none !important;
      }
    }

    @media (max-width: 640px) {
      .aussie-chat-launcher {
        right: 16px;
        bottom: 16px;
      }

      .aussie-chat-panel {
        right: 12px;
        bottom: 88px;
        width: calc(100vw - 24px);
        height: min(540px, calc(100vh - 116px));
        border-radius: 20px;
      }
    }
  `;

  function iconChat() {
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.7 8.3 9.7 9.7 0 0 1-4.2-.95L3 20l1.35-4.35A8.1 8.1 0 0 1 3.6 12 8.4 8.4 0 0 1 12.3 3.7 8.4 8.4 0 0 1 21 11.5Z"/><path d="M8.1 10.2h8.1M8.1 13.5h5.5"/></svg>';
  }

  function iconSend() {
    return '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 20.4 22 12 3 3.6v6.8l11.6 1.6L3 13.6v6.8Z"/></svg>';
  }

  function scrollToBottom() {
    const messagesEl = document.querySelector('[data-aussie-chat-messages]');
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function addMessage(role, text) {
    const messagesEl = document.querySelector('[data-aussie-chat-messages]');
    const messageEl = document.createElement('div');
    messageEl.className = `aussie-chat-message ${role === 'user' ? 'user' : 'bot'}`;
    messageEl.textContent = text;
    messagesEl.appendChild(messageEl);
    scrollToBottom();

    if (role === 'user' || role === 'assistant') {
      messages.push({ role, content: text });
    }
  }

  function addGreeting() {
    if (messages.length) return;

    addMessage('assistant', "Hi, I'm Aria from Aussie AI. Tell me what is slowing your team down and I can suggest what to automate first.");

    const messagesEl = document.querySelector('[data-aussie-chat-messages]');
    const starters = document.createElement('div');
    starters.className = 'aussie-chat-starters';
    ['Missed calls', 'Website chat', 'Workflow admin'].forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'aussie-chat-starter';
      button.textContent = label;
      button.addEventListener('click', () => sendMessage(label));
      starters.appendChild(button);
    });
    messagesEl.appendChild(starters);
    scrollToBottom();
  }

  function setTyping(isTyping) {
    const messagesEl = document.querySelector('[data-aussie-chat-messages]');
    const existing = document.querySelector('[data-aussie-chat-typing]');

    if (!isTyping && existing) {
      existing.remove();
      return;
    }

    if (isTyping && !existing) {
      const typing = document.createElement('div');
      typing.className = 'aussie-chat-typing';
      typing.dataset.aussieChatTyping = 'true';
      typing.setAttribute('aria-label', `${BOT_NAME} is typing`);
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(typing);
      scrollToBottom();
    }
  }

  function setSending(nextValue) {
    isSending = nextValue;
    const sendButton = document.querySelector('[data-aussie-chat-send]');
    const input = document.querySelector('[data-aussie-chat-input]');
    if (sendButton) sendButton.disabled = nextValue;
    if (input) input.disabled = nextValue;
  }

  function openChat() {
    const panel = document.querySelector('[data-aussie-chat-panel]');
    const launcher = document.querySelector('[data-aussie-chat-launcher]');
    isOpen = true;
    panel.classList.add('open');
    launcher.setAttribute('aria-expanded', 'true');
    addGreeting();
    window.setTimeout(() => document.querySelector('[data-aussie-chat-input]')?.focus(), 80);
  }

  function closeChat() {
    const panel = document.querySelector('[data-aussie-chat-panel]');
    const launcher = document.querySelector('[data-aussie-chat-launcher]');
    isOpen = false;
    panel.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    document.querySelector('.aussie-chat-starters')?.remove();
    addMessage('user', trimmed);
    setSending(true);
    setTyping(true);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 26000);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          sessionId,
          page: window.location.pathname,
          messages,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Chat request failed');
      }

      addMessage('assistant', data.reply || 'I can help with that. What kind of workflow are you trying to improve?');
    } catch (error) {
      const fallback = error.name === 'AbortError'
        ? 'That took too long to reply. Please try again or use the contact form.'
        : 'Chat is being connected. The contact form is the quickest path right now.';
      addMessage('assistant', fallback);
    } finally {
      window.clearTimeout(timeout);
      setTyping(false);
      setSending(false);
    }
  }

  function init() {
    if (document.querySelector('[data-aussie-chat-launcher]')) return;

    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    const launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'aussie-chat-launcher';
    launcher.dataset.aussieChatLauncher = 'true';
    launcher.setAttribute('aria-label', 'Open Aussie AI chat');
    launcher.setAttribute('aria-controls', 'aussie-chat-panel');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = iconChat();
    document.body.appendChild(launcher);

    const panel = document.createElement('section');
    panel.id = 'aussie-chat-panel';
    panel.className = 'aussie-chat-panel';
    panel.dataset.aussieChatPanel = 'true';
    panel.setAttribute('aria-label', 'Aussie AI chat assistant');
    panel.innerHTML = `
      <header class="aussie-chat-header">
        <div class="aussie-chat-mark">AI</div>
        <div class="aussie-chat-title">
          <div>${BOT_NAME} at Aussie AI</div>
          <div class="aussie-chat-status">AI assistant</div>
        </div>
        <button class="aussie-chat-close" type="button" data-aussie-chat-close aria-label="Close chat">x</button>
      </header>
      <div class="aussie-chat-messages" data-aussie-chat-messages aria-live="polite"></div>
      <form class="aussie-chat-form" data-aussie-chat-form>
        <input class="aussie-chat-input" data-aussie-chat-input type="text" autocomplete="off" maxlength="900" placeholder="Ask what AI can automate..." aria-label="Chat message" />
        <button class="aussie-chat-send" data-aussie-chat-send type="submit" aria-label="Send message">${iconSend()}</button>
      </form>
    `;
    document.body.appendChild(panel);

    launcher.addEventListener('click', () => {
      if (isOpen) closeChat();
      else openChat();
    });

    panel.querySelector('[data-aussie-chat-close]').addEventListener('click', closeChat);
    panel.querySelector('[data-aussie-chat-form]').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = panel.querySelector('[data-aussie-chat-input]');
      const value = input.value;
      input.value = '';
      sendMessage(value);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen) closeChat();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
