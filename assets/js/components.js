/* ============================================================
   AlexitoFind — components.js
   Reusable UI Logic: Toast · Modal · Loader · Skeleton
   Dropdown · Navigation · Topbar · Toggles
   ============================================================ */

'use strict';

// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
const Toast = (() => {
  let container = null;

  function _getContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'af-toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    return container;
  }

  function show(message, type = 'default', duration = 3200) {
    const c = _getContainer();
    const toast = document.createElement('div');

    const icons = { success: '✓', error: '✕', warning: '⚠', match: '💘', default: 'ℹ' };
    const typeClass = type !== 'default' ? ` af-toast-${type}` : '';

    toast.className = `af-toast${typeClass}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <span class="af-toast-icon">${icons[type] || icons.default}</span>
      <span style="flex:1">${message}</span>
    `;

    c.appendChild(toast);

    const timeout = setTimeout(() => dismiss(toast), duration);
    toast.addEventListener('click', () => { clearTimeout(timeout); dismiss(toast); });
    return toast;
  }

  function dismiss(toast) {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    // Fallback removal
    setTimeout(() => toast.remove(), 600);
  }

  return {
    show,
    success: (msg, dur) => show(msg, 'success', dur),
    error:   (msg, dur) => show(msg, 'error',   dur),
    warning: (msg, dur) => show(msg, 'warning', dur),
    match:   (name)     => show(`🎉 ¡Es un Match con ${name}!`, 'match', 4500),
  };
})();

// ============================================================
// MODAL SYSTEM
// ============================================================
const Modal = (() => {
  function open(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close(id);
    }, { once: true });
  }

  function close(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function create({ title = '', content = '', isMatch = false, onClose } = {}) {
    const id = 'modal-dyn-' + Date.now();
    const overlay = document.createElement('div');
    overlay.className = 'af-modal-overlay';
    overlay.id = id;
    overlay.innerHTML = `
      <div class="af-modal${isMatch ? ' af-modal-match' : ''}">
        <div class="af-modal-handle"></div>
        ${title ? `<h3 class="af-modal-title">${title}</h3>` : ''}
        <div class="af-modal-body">${content}</div>
      </div>
    `;
    document.body.appendChild(overlay);
    // Defer to allow paint
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add('active')));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        setTimeout(() => { overlay.remove(); if (onClose) onClose(); }, 400);
      }
    });
    return {
      id,
      close() {
        overlay.classList.remove('active');
        setTimeout(() => { overlay.remove(); if (onClose) onClose(); }, 400);
      },
    };
  }

  return { open, close, create };
})();

// ============================================================
// LOADER
// ============================================================
const Loader = (() => {
  let el = null;

  function show(text = 'Cargando...') {
    if (!el) {
      el = document.createElement('div');
      el.className = 'af-loader-overlay';
      el.innerHTML = `
        <div class="af-spinner-brand"></div>
        <p style="font-size:0.875rem;color:var(--af-gray-500);font-weight:600;margin-top:8px">${text}</p>
      `;
      document.body.appendChild(el);
    }
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('active')));
  }

  function hide() {
    if (!el) return;
    el.classList.remove('active');
  }

  return { show, hide };
})();

// ============================================================
// SKELETON LOADING
// ============================================================
const Skeleton = {
  chatList(count = 5) {
    return Array(count).fill(`
      <div style="display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--af-gray-100)">
        <div class="af-skeleton af-skeleton-circle" style="width:48px;height:48px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:8px">
          <div class="af-skeleton af-skeleton-text" style="width:45%"></div>
          <div class="af-skeleton af-skeleton-text sm" style="width:70%"></div>
        </div>
        <div class="af-skeleton af-skeleton-text" style="width:32px;height:10px"></div>
      </div>
    `).join(''),

  },

  card() {
    return `<div class="af-skeleton af-skeleton-card" style="position:absolute;inset:0"></div>`;
  },

  notifications(count = 4) {
    return Array(count).fill(`
      <div style="display:flex;align-items:flex-start;gap:12px;padding:16px;border-bottom:1px solid var(--af-gray-100)">
        <div class="af-skeleton af-skeleton-circle" style="width:42px;height:42px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:8px">
          <div class="af-skeleton af-skeleton-text" style="width:80%"></div>
          <div class="af-skeleton af-skeleton-text sm" style="width:30%"></div>
        </div>
      </div>
    `).join(''),
  },
};

// Fix: chatList returns string, not object
const _origChatList = Skeleton.chatList;
Skeleton.chatList = function(count = 5) {
  return Array(count).fill(`
    <div style="display:flex;align-items:center;gap:12px;padding:16px;border-bottom:1px solid var(--af-gray-100)">
      <div class="af-skeleton af-skeleton-circle" style="width:48px;height:48px;flex-shrink:0"></div>
      <div style="flex:1;display:flex;flex-direction:column;gap:8px">
        <div class="af-skeleton af-skeleton-text" style="width:45%"></div>
        <div class="af-skeleton af-skeleton-text sm" style="width:70%"></div>
      </div>
      <div class="af-skeleton af-skeleton-text" style="width:32px;height:10px"></div>
    </div>
  `).join('');
};

// ============================================================
// DROPDOWN MANAGER
// ============================================================
const Dropdown = {
  init() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-dropdown]');
      if (trigger) {
        e.stopPropagation();
        const targetId = trigger.dataset.dropdown;
        const menu = document.getElementById(targetId);
        const wrap = trigger.closest('.af-dropdown');
        const isOpen = wrap ? wrap.classList.contains('open') : false;
        // Close all
        document.querySelectorAll('.af-dropdown.open').forEach(d => d.classList.remove('open'));
        if (!isOpen) {
          if (wrap) wrap.classList.add('open');
          else if (menu) menu.style.display = 'block';
        }
        return;
      }
      document.querySelectorAll('.af-dropdown.open').forEach(d => d.classList.remove('open'));
    });
  },
};

// ============================================================
// NAVIGATION — Active State Manager
// ============================================================
const Navigation = {
  init() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-href]').forEach(el => {
      if (el.dataset.navHref === current) el.classList.add('active');
      else el.classList.remove('active');
    });
    // Also match standard hrefs
    document.querySelectorAll('.af-nav-item, .af-sidebar-item').forEach(el => {
      const href = (el.getAttribute('href') || '').split('/').pop();
      if (href && href === current) el.classList.add('active');
    });
    // Update badge counts
    this.updateBadges();
  },

  updateBadges() {
    if (typeof getUnreadNotificationsCount === 'function') {
      const n = getUnreadNotificationsCount();
      document.querySelectorAll('[data-badge="notifications"]').forEach(b => {
        b.textContent = n > 9 ? '9+' : n;
        b.style.display = n > 0 ? 'flex' : 'none';
      });
    }
    if (typeof getUnreadMessagesCount === 'function') {
      const m = getUnreadMessagesCount();
      document.querySelectorAll('[data-badge="messages"]').forEach(b => {
        b.textContent = m > 9 ? '9+' : m;
        b.style.display = m > 0 ? 'flex' : 'none';
      });
    }
  },
};

// ============================================================
// TOPBAR SCROLL EFFECT
// ============================================================
const Topbar = {
  init() {
    const bar = document.querySelector('.af-topbar');
    if (!bar) return;
    const area = document.querySelector('.af-page-content') || window;
    const onScroll = () => {
      const y = area === window ? window.scrollY : area.scrollTop;
      bar.classList.toggle('scrolled', y > 8);
    };
    area.addEventListener('scroll', onScroll, { passive: true });
  },
};

// ============================================================
// TOGGLE SWITCHES
// ============================================================
function initToggles() {
  document.querySelectorAll('.af-toggle-input').forEach(input => {
    // Thumb is moved by CSS :checked sibling — JS handles change events if needed
    input.addEventListener('change', () => {
      const key = input.dataset.settingKey;
      if (key && typeof APP_SETTINGS !== 'undefined') {
        const [section, prop] = key.split('.');
        if (APP_SETTINGS[section]) APP_SETTINGS[section][prop] = input.checked;
      }
    });
  });
}

// ============================================================
// AVATAR PLACEHOLDER GENERATOR (SVG)
// ============================================================
function generateAvatarSVG(name, size = 48) {
  const initials = name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  const colors = [
    ['#FD267A','#FF655B'], ['#6366F1','#A855F7'], ['#0EA5E9','#06B6D4'],
    ['#10B981','#34D399'], ['#F59E0B','#FBBF24'], ['#EF4444','#F97316'],
  ];
  const idx = initials.charCodeAt(0) % colors.length;
  const [c1, c2] = colors[idx];
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient></defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#g)"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
        fill="white" font-family="Poppins,Inter,sans-serif"
        font-weight="700" font-size="${Math.round(size*0.36)}px">${initials}</text>
    </svg>
  `)}`;
}

// ============================================================
// IMAGE ERROR FALLBACK
// ============================================================
function initImageFallbacks() {
  document.querySelectorAll('img[data-name]').forEach(img => {
    img.addEventListener('error', () => {
      const name = img.dataset.name || '?';
      const size = img.width || 48;
      img.src = generateAvatarSVG(name, Math.max(size, 48));
      img.onerror = null;
    });
  });
}

// ============================================================
// LAZY IMAGE LOADING
// ============================================================
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '120px' });
  document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
}

// ============================================================
// APP INITIALIZATION
// ============================================================
function initApp() {
  Navigation.init();
  Topbar.init();
  Dropdown.init();
  initToggles();
  initLazyImages();
  initImageFallbacks();
}

// Auto-boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
