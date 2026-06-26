/* ============================================================
   AlexitoFind — explore.js
   Swipe Card System — Drag · Touch · Keyboard · Buttons
   ============================================================ */

'use strict';

const ExploreApp = (() => {
  // ── State ──────────────────────────────────────────────────
  let profiles        = [];
  let currentIndex    = 0;
  let isDragging      = false;
  let startX          = 0;
  let startY          = 0;
  let currentX        = 0;
  let currentY        = 0;
  let topCard         = null;
  let actionLocked    = false;
  let historyStack    = [];

  // ── Config ─────────────────────────────────────────────────
  const SWIPE_THRESHOLD   = 85;
  const ROTATION_MAX      = 22;
  const ROTATION_FACTOR   = 0.075;
  const ANIMATION_MS      = 480;

  // ── Elements ───────────────────────────────────────────────
  let cardStack  = null;
  let noMoreEl   = null;
  let progressEl = null;

  // ── Init ───────────────────────────────────────────────────
  function init() {
    cardStack  = document.getElementById('af-card-stack');
    noMoreEl   = document.getElementById('af-no-more-cards');
    progressEl = document.getElementById('af-explore-progress');

    if (!cardStack) return;

    profiles     = [...USERS];
    currentIndex = 0;

    _renderCards();
    _bindActionButtons();
    _bindKeyboard();
  }

  // ── Render card stack ──────────────────────────────────────
  function _renderCards() {
    cardStack.innerHTML = '';
    const visible = Math.min(3, profiles.length - currentIndex);

    if (visible === 0) { _showEmpty(); return; }

    for (let i = visible - 1; i >= 0; i--) {
      const card = _buildCard(profiles[currentIndex + i], i);
      cardStack.appendChild(card);
    }

    _updateProgress();
    _bindTopCardEvents();
  }

  // ── Build a single card ────────────────────────────────────
  function _buildCard(p, stackIdx) {
    const card = document.createElement('div');
    card.className = 'af-card';
    card.dataset.userId = p.id;

    // Stack positions
    const scales  = [1,      0.96,   0.92];
    const offsets = ['0px', '12px', '24px'];
    card.style.cssText = `
      z-index: ${5 - stackIdx};
      transform: scale(${scales[stackIdx]}) translateY(${offsets[stackIdx]});
      transition: transform 0.3s var(--af-spring);
    `;

    const interests = p.interests.slice(0, 3)
      .map(i => `<span class="af-card-tag">${i}</span>`).join('');

    const verifiedIcon = p.verified
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00C897" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`
      : '';

    card.innerHTML = `
      <img class="af-card-img" src="${p.avatar}" alt="${p.name}"
           onerror="this.src='${generateAvatarSVG(p.name + ' ' + p.lastName, 400)}';this.style.objectFit='cover'"
           draggable="false">
      <div class="af-card-overlay"></div>
      <div class="af-card-like-indicator" id="ci-like-${p.id}">ME GUSTA ❤️</div>
      <div class="af-card-nope-indicator" id="ci-nope-${p.id}">PASAR ✕</div>
      <div class="af-card-super-indicator" id="ci-super-${p.id}">SUPER ⭐</div>
      <div class="af-card-info">
        <div class="af-card-name">
          ${p.name}, ${p.age}
          ${verifiedIcon}
        </div>
        <div class="af-card-meta">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${p.city} &middot; ${p.distance}
          ${p.online ? '<span style="color:#4CD964;font-size:0.75rem">● En línea</span>' : ''}
        </div>
        <div class="af-card-description">${p.bio}</div>
        <div class="af-card-tags">${interests}</div>
      </div>
    `;
    return card;
  }

  // ── Bind events on top card ────────────────────────────────
  function _bindTopCardEvents() {
    topCard = cardStack.querySelector('.af-card:last-child');
    if (!topCard) return;

    // Touch
    topCard.addEventListener('touchstart', _onTouchStart, { passive: true });
    topCard.addEventListener('touchmove',  _onTouchMove,  { passive: false });
    topCard.addEventListener('touchend',   _onTouchEnd);

    // Mouse
    topCard.addEventListener('mousedown', _onMouseDown);
  }

  // ── Touch handlers ─────────────────────────────────────────
  function _onTouchStart(e) {
    if (actionLocked) return;
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY;
    isDragging = true;
    topCard.style.transition = 'none';
  }

  function _onTouchMove(e) {
    if (!isDragging || actionLocked) return;
    e.preventDefault();
    const t = e.touches[0];
    currentX = t.clientX - startX;
    currentY = t.clientY - startY;
    _applyDragTransform();
  }

  function _onTouchEnd() {
    if (!isDragging || actionLocked) return;
    isDragging = false;
    _evaluateRelease();
  }

  // ── Mouse handlers ─────────────────────────────────────────
  function _onMouseDown(e) {
    if (actionLocked) return;
    startX = e.clientX; startY = e.clientY;
    isDragging = true;
    topCard.style.transition = 'none';
    topCard.style.cursor = 'grabbing';

    const onMove = (ev) => {
      if (!isDragging) return;
      currentX = ev.clientX - startX;
      currentY = ev.clientY - startY;
      _applyDragTransform();
    };

    const onUp = () => {
      if (!isDragging) return;
      isDragging = false;
      if (topCard) topCard.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
      _evaluateRelease();
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
  }

  // ── Apply drag transform ───────────────────────────────────
  function _applyDragTransform() {
    if (!topCard) return;
    const rot = Math.min(Math.max(currentX * ROTATION_FACTOR, -ROTATION_MAX), ROTATION_MAX);
    topCard.style.transform = `translateX(${currentX}px) translateY(${currentY}px) rotate(${rot}deg)`;

    // Indicators
    const progress = Math.abs(currentX) / SWIPE_THRESHOLD;
    const superProgress = Math.min(-currentY / SWIPE_THRESHOLD, 1) * (Math.abs(currentX) < 50 ? 1 : 0);

    _setIndicator('like',  Math.min(currentX  / SWIPE_THRESHOLD, 1));
    _setIndicator('nope',  Math.min(-currentX / SWIPE_THRESHOLD, 1));
    _setIndicator('super', Math.max(superProgress, 0));
  }

  function _setIndicator(type, opacity) {
    const p = profiles[currentIndex];
    if (!p) return;
    const el = document.getElementById(`ci-${type}-${p.id}`);
    if (el) el.style.opacity = Math.max(0, Math.min(opacity, 1));
  }

  // ── Evaluate swipe on release ──────────────────────────────
  function _evaluateRelease() {
    if (!topCard || actionLocked) return;

    if (currentX > SWIPE_THRESHOLD)  { _swipe('right'); }
    else if (currentX < -SWIPE_THRESHOLD) { _swipe('left');  }
    else if (currentY < -SWIPE_THRESHOLD && Math.abs(currentX) < 55) { _swipe('up'); }
    else {
      // Snap back
      topCard.style.transition = `transform 0.4s var(--af-spring)`;
      topCard.style.transform  = 'scale(1) translateY(0)';
      _setIndicator('like', 0);
      _setIndicator('nope', 0);
      _setIndicator('super', 0);
      currentX = 0; currentY = 0;
    }
  }

  // ── Perform swipe ──────────────────────────────────────────
  function _swipe(direction) {
    if (!topCard || actionLocked) return;
    actionLocked = true;

    const p = profiles[currentIndex];
    historyStack.push({ profile: p, index: currentIndex });

    // Reset indicators
    ['like','nope','super'].forEach(t => _setIndicator(t, 0));

    topCard.style.transition = `transform ${ANIMATION_MS}ms var(--af-ease-in), opacity ${ANIMATION_MS}ms ease`;

    if (direction === 'right') {
      topCard.style.transform = 'translateX(160%) rotate(26deg)';
      topCard.style.opacity   = '0';
      _handleLike(p);
    } else if (direction === 'left') {
      topCard.style.transform = 'translateX(-160%) rotate(-26deg)';
      topCard.style.opacity   = '0';
      _handleNope(p);
    } else {
      topCard.style.transform = 'translateY(-160%) scale(0.75)';
      topCard.style.opacity   = '0';
      _handleSuperLike(p);
    }

    topCard.addEventListener('transitionend', () => {
      topCard.remove();
      currentIndex++;
      currentX = 0; currentY = 0;
      actionLocked = false;
      _renderCards();
    }, { once: true });

    // Safety fallback
    setTimeout(() => {
      if (actionLocked) {
        actionLocked = false;
        currentIndex++;
        currentX = 0; currentY = 0;
        _renderCards();
      }
    }, ANIMATION_MS + 200);
  }

  // ── Action handlers ────────────────────────────────────────
  function _handleLike(p) {
    p.liked = true;
    // 35% match probability
    if (Math.random() < 0.35) {
      addMatch(p.userId || p.id);
      setTimeout(() => _showMatchModal(p), 550);
    }
  }

  function _handleNope(p) {
    // Silent nope — no toast needed
  }

  function _handleSuperLike(p) {
    p.superLiked = true;
    if (typeof Toast !== 'undefined') {
      Toast.show(`⭐ Super Like enviado a ${p.name}!`, 'default', 2500);
    }
  }

  // ── Match Modal ────────────────────────────────────────────
  function _showMatchModal(p) {
    if (typeof Modal === 'undefined') return;
    Modal.create({
      isMatch: true,
      content: `
        <div style="text-align:center;padding:8px 0 4px">
          <div style="font-size:3.5rem;line-height:1;margin-bottom:12px;animation:heartbeat 1.4s ease-in-out infinite">💘</div>
          <h2 style="font-family:var(--af-font-display);font-size:2rem;font-weight:900;color:white;margin-bottom:6px;letter-spacing:-0.03em">¡Es un Match!</h2>
          <p style="color:rgba(255,255,255,0.88);margin-bottom:28px;font-size:1rem">
            Tú y <strong>${p.name}</strong> se gustaron mutuamente ✨
          </p>
          <div style="display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:32px">
            <div style="text-align:center">
              <img src="${CURRENT_USER.avatar}" alt="Tú"
                style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:4px solid white;box-shadow:0 8px 24px rgba(0,0,0,0.3)"
                onerror="this.src='${generateAvatarSVG(CURRENT_USER.name, 80)}'">
              <p style="color:rgba(255,255,255,0.9);font-size:0.8rem;margin-top:8px;font-weight:600">Tú</p>
            </div>
            <div style="font-size:2.5rem;animation:float 2s ease-in-out infinite">💞</div>
            <div style="text-align:center">
              <img src="${p.avatar}" alt="${p.name}"
                style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:4px solid white;box-shadow:0 8px 24px rgba(0,0,0,0.3)"
                onerror="this.src='${generateAvatarSVG(p.name + ' ' + p.lastName, 80)}'">
              <p style="color:rgba(255,255,255,0.9);font-size:0.8rem;margin-top:8px;font-weight:600">${p.name}</p>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px;padding:0 4px">
            <a href="messages.html"
              style="display:block;background:white;color:var(--af-primary);font-weight:700;font-size:0.9375rem;
                     padding:14px;border-radius:999px;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,0.2)">
              💬 Enviar Mensaje
            </a>
            <button onclick="this.closest('.af-modal-overlay').classList.remove('active');document.body.style.overflow=''"
              style="background:rgba(255,255,255,0.22);color:white;border:2px solid rgba(255,255,255,0.4);
                     font-weight:600;font-size:0.9rem;padding:12px;border-radius:999px;cursor:pointer;
                     font-family:var(--af-font)">
              Seguir Explorando →
            </button>
          </div>
        </div>
      `,
    });
  }

  // ── Progress bar ───────────────────────────────────────────
  function _updateProgress() {
    if (!progressEl) return;
    const pct = Math.round((currentIndex / profiles.length) * 100);
    progressEl.style.width = pct + '%';
  }

  // ── Empty state ────────────────────────────────────────────
  function _showEmpty() {
    if (noMoreEl) noMoreEl.style.display = 'flex';
  }

  // ── Action Buttons ─────────────────────────────────────────
  function _bindActionButtons() {
    const btns = {
      'btn-nope':   () => _swipe('left'),
      'btn-like':   () => _swipe('right'),
      'btn-super':  () => _swipe('up'),
      'btn-rewind': _rewind,
      'btn-boost':  _boost,
    };

    Object.entries(btns).forEach(([id, fn]) => {
      document.getElementById(id)?.addEventListener('click', fn);
    });
  }

  // ── Rewind ─────────────────────────────────────────────────
  function _rewind() {
    if (historyStack.length === 0) {
      Toast.warning('No hay perfiles anteriores', 2000);
      return;
    }
    const last = historyStack.pop();
    last.profile.liked = false;
    last.profile.superLiked = false;
    currentIndex = last.index;
    _renderCards();
    Toast.show('⏪ Perfil recuperado', 'default', 1800);
  }

  // ── Boost ──────────────────────────────────────────────────
  function _boost() {
    Toast.show('🚀 ¡Boost activado! Serás el primero en tu zona', 'success', 3000);
  }

  // ── Keyboard shortcuts ─────────────────────────────────────
  function _bindKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft')  _swipe('left');
      if (e.key === 'ArrowRight') _swipe('right');
      if (e.key === 'ArrowUp')    _swipe('up');
      if (e.key === 'Backspace' || e.key === 'ArrowDown') _rewind();
    });
  }

  return { init };
})();

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ExploreApp.init);
} else {
  ExploreApp.init();
}
