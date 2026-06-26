/* ============================================================
   AlexitoFind — messages.js
   Chat & Messaging Logic
   ============================================================ */

'use strict';

const MessagesApp = (() => {
  let activeConvId = null;
  let activeConv   = null;
  let typingTimer  = null;

  // ── Initialize list view ───────────────────────────────────
  function initList() {
    const list = document.getElementById('af-chat-list');
    if (!list) return;

    // Show skeleton
    list.innerHTML = Skeleton.chatList(5);

    // Simulate network delay
    setTimeout(() => _renderList(list), 700);
  }

  // ── Render conversation list ───────────────────────────────
  function _renderList(container) {
    const convs = getConversationsWithUsers();

    if (!convs.length) {
      container.innerHTML = `
        <div class="af-empty">
          <div class="af-empty-icon">💬</div>
          <h3 class="af-empty-title">Sin mensajes aún</h3>
          <p class="af-empty-subtitle">Haz match con alguien para comenzar a chatear</p>
          <a href="explore.html" class="af-btn af-btn-primary af-btn-sm" style="margin-top:8px">Explorar</a>
        </div>
      `;
      return;
    }

    container.innerHTML = convs.map(conv => {
      const u = conv.user;
      const onlineDot = u.online
        ? `<span style="position:absolute;bottom:0;right:0;width:12px;height:12px;
              background:var(--af-online);border-radius:50%;border:2px solid white;z-index:2"></span>`
        : '';

      return `
        <div class="af-chat-item" onclick="MessagesApp.openConversation('${conv.id}')" id="chat-item-${conv.id}">
          <div class="af-avatar af-avatar-md" style="position:relative;flex-shrink:0">
            <img class="af-avatar-img" src="${u.avatar}" alt="${u.name}"
              onerror="this.src='${generateAvatarSVG(u.name + ' ' + u.lastName, 48)}'">
            ${onlineDot}
          </div>
          <div class="af-chat-content">
            <div class="af-chat-name">${u.name}</div>
            <div class="af-chat-preview${conv.unread > 0 ? ' unread' : ''}">${_escapeHtml(conv.lastMessage)}</div>
          </div>
          <div class="af-chat-meta">
            <div class="af-chat-time">${conv.lastTime}</div>
            ${conv.unread > 0 ? `<div class="af-chat-badge">${conv.unread}</div>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Open a conversation ────────────────────────────────────
  function openConversation(convId) {
    activeConvId = convId;
    activeConv   = CONVERSATIONS.find(c => c.id === convId);
    if (!activeConv) return;

    markConversationRead(convId);
    Navigation.updateBadges();

    const user = getUserById(activeConv.userId);
    const listView = document.getElementById('af-messages-list-view');
    const chatView = document.getElementById('af-messages-chat-view');

    if (listView && chatView) {
      listView.style.display   = 'none';
      chatView.style.display   = 'flex';
      chatView.style.flexDirection = 'column';
      chatView.style.height    = '100%';

      // Header
      const headerName   = document.getElementById('af-chat-header-name');
      const headerSub    = document.getElementById('af-chat-header-sub');
      const headerAvatar = document.getElementById('af-chat-header-avatar');

      if (headerName)   headerName.textContent = user.name;
      if (headerSub)    headerSub.textContent  = user.online ? 'En línea' : 'Última vez hace 1h';
      if (headerAvatar) {
        headerAvatar.src = user.avatar;
        headerAvatar.alt = user.name;
        headerAvatar.onerror = () => { headerAvatar.src = generateAvatarSVG(user.name + ' ' + user.lastName, 40); };
      }

      _renderMessages();
      initSendButton();
    }
  }

  // ── Render chat bubbles ────────────────────────────────────
  function _renderMessages() {
    const container = document.getElementById('af-messages-container');
    if (!container || !activeConv) return;

    container.innerHTML = activeConv.messages.map((msg, i) => {
      const isOut = msg.from === 0;
      return `
        <div class="af-message ${isOut ? 'outgoing' : 'incoming'}" style="animation:slideUp var(--af-base) var(--af-ease-out) ${i * 40}ms both">
          <div>
            <div class="af-message-bubble">${_escapeHtml(msg.text)}</div>
            <div class="af-message-time">${msg.time}${isOut ? ' ✓✓' : ''}</div>
          </div>
        </div>
      `;
    }).join('');

    // Scroll to bottom
    setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
  }

  // ── Send a message ─────────────────────────────────────────
  function sendMessage(text) {
    if (!text.trim() || !activeConv) return;

    const now = new Date();
    const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const msg  = { id: 'm' + Date.now(), from: 0, text: text.trim(), time, read: false };

    activeConv.messages.push(msg);
    activeConv.lastMessage = text.trim();
    activeConv.lastTime    = time;

    _renderMessages();
    _simulateReply();
  }

  // ── Typing indicator + reply simulation ───────────────────
  function _simulateReply() {
    const container = document.getElementById('af-messages-container');
    if (!container || !activeConv) return;

    const delay = 1400 + Math.random() * 2000;

    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'af-message incoming';
    typing.id = 'typing-indicator';
    typing.innerHTML = `
      <div>
        <div class="af-message-bubble" style="padding:12px 18px">
          <span style="display:inline-flex;gap:3px;align-items:center">
            <span style="width:6px;height:6px;background:var(--af-gray-400);border-radius:50%;animation:pulse 1.2s ease-in-out 0ms infinite"></span>
            <span style="width:6px;height:6px;background:var(--af-gray-400);border-radius:50%;animation:pulse 1.2s ease-in-out 200ms infinite"></span>
            <span style="width:6px;height:6px;background:var(--af-gray-400);border-radius:50%;animation:pulse 1.2s ease-in-out 400ms infinite"></span>
          </span>
        </div>
      </div>
    `;

    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      typing.remove();

      const replies = [
        '😊 ¡Qué interesante! Cuéntame más...',
        '¡Me encanta! Yo también pienso lo mismo 🙌',
        'Sí, totalmente de acuerdo contigo',
        '¿De verdad? ¡No lo sabía! 😮',
        'Jaja, eso es genial 😄',
        '¡Wow! Me parece increíble',
        'Qué buena vibra tienes 🌟',
        'Me parece perfecto ✨ ¿y qué más?',
      ];

      const user = getUserById(activeConv.userId);
      const now  = new Date();
      const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const text = replies[Math.floor(Math.random() * replies.length)];
      const replyMsg = { id: 'm' + Date.now(), from: activeConv.userId, text, time, read: false };

      activeConv.messages.push(replyMsg);
      activeConv.lastMessage = text;
      activeConv.lastTime    = time;

      _renderMessages();
    }, delay);
  }

  // ── Bind send button & input ───────────────────────────────
  function initSendButton() {
    const sendBtn = document.getElementById('af-send-btn');
    const input   = document.getElementById('af-message-input');
    if (!sendBtn || !input) return;

    // Remove old listeners by cloning
    const newBtn   = sendBtn.cloneNode(true);
    const newInput = input.cloneNode(true);
    sendBtn.parentNode.replaceChild(newBtn, sendBtn);
    input.parentNode.replaceChild(newInput, input);

    function handleSend() {
      const text = newInput.value.trim();
      if (!text) return;
      sendMessage(text);
      newInput.value = '';
      newInput.focus();
    }

    newBtn.addEventListener('click', handleSend);
    newInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
  }

  // ── Back to list ───────────────────────────────────────────
  function backToList() {
    const listView = document.getElementById('af-messages-list-view');
    const chatView = document.getElementById('af-messages-chat-view');
    if (listView && chatView) {
      listView.style.display = 'block';
      chatView.style.display = 'none';
    }
    activeConvId = null;
    activeConv   = null;
    clearTimeout(typingTimer);
    initList();
  }

  // ── Helpers ────────────────────────────────────────────────
  function _escapeHtml(str) {
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  return { initList, openConversation, backToList, sendMessage, initSendButton };
})();
