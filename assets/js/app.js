/* ============================================================
   AlexitoFind — app.js
   General App Initialization & Shared Page Logic
   ============================================================ */

'use strict';

// ============================================================
// SVG AVATAR GENERATOR (Covers missing photos)
// ============================================================
function generateAvatarSVG(name, size) {
  size = size || 96;
  const parts = (name || 'U').split(' ');
  const initials = (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  const gradients = [
    ['#FD267A','#FF655B'],
    ['#6366F1','#A855F7'],
    ['#0EA5E9','#38BDF8'],
    ['#10B981','#34D399'],
    ['#F59E0B','#FBBF24'],
    ['#EF4444','#F97316'],
    ['#EC4899','#F43F5E'],
    ['#8B5CF6','#6366F1'],
  ];
  const idx = initials.charCodeAt(0) % gradients.length;
  const [c1, c2] = gradients[idx];
  const fontSize = Math.round(size * 0.36);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="g${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size/2}" fill="url(#g${idx})"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
      fill="white" font-family="Poppins,Inter,system-ui,sans-serif"
      font-weight="700" font-size="${fontSize}px">${initials}</text>
  </svg>`;

  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

// ============================================================
// GLOBAL IMAGE FALLBACK
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function onError() {
      const name = this.dataset.name || this.alt || 'U';
      const size = Math.max(this.naturalWidth || 96, 48);
      this.src = generateAvatarSVG(name, size);
      this.removeEventListener('error', onError);
    });
  });
});

// ============================================================
// NAVIGATION HELPER — Used by all pages
// ============================================================
function buildBottomNav(activePage) {
  const items = [
    { href: 'dashboard.html',     icon: navIcons.home,     label: 'Inicio',    key: 'dashboard'      },
    { href: 'explore.html',       icon: navIcons.explore,  label: 'Explorar',  key: 'explore'        },
    { href: 'messages.html',      icon: navIcons.messages, label: 'Mensajes',  key: 'messages',  badge: true },
    { href: 'notifications.html', icon: navIcons.notif,    label: 'Alertas',   key: 'notifications', badge: true },
    { href: 'profile.html',       icon: navIcons.profile,  label: 'Perfil',    key: 'profile'        },
  ];

  return `
    <nav class="af-bottom-nav" role="navigation" aria-label="Navegación principal">
      <div class="af-bottom-nav-inner">
        ${items.map(item => `
          <a href="${item.href}" class="af-nav-item${activePage === item.key ? ' active' : ''}"
             aria-label="${item.label}" ${activePage === item.key ? 'aria-current="page"' : ''}>
            <div class="af-nav-icon" style="position:relative">
              ${item.icon}
              ${item.badge ? `<span class="af-nav-badge" data-badge="${item.key}" style="display:none">0</span>` : ''}
            </div>
            <span class="af-nav-label">${item.label}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;
}

function buildSidebar(activePage) {
  const items = [
    { href: 'dashboard.html',     icon: navIcons.home,     label: 'Inicio',         key: 'dashboard'      },
    { href: 'explore.html',       icon: navIcons.explore,  label: 'Explorar',       key: 'explore'        },
    { href: 'messages.html',      icon: navIcons.messages, label: 'Mensajes',       key: 'messages',  badge: true },
    { href: 'notifications.html', icon: navIcons.notif,    label: 'Notificaciones', key: 'notifications', badge: true },
    { href: 'profile.html',       icon: navIcons.profile,  label: 'Mi Perfil',      key: 'profile'        },
    { href: 'settings.html',      icon: navIcons.settings, label: 'Configuración',  key: 'settings'       },
  ];

  const u = CURRENT_USER;

  return `
    <aside class="af-sidebar" role="complementary" aria-label="Barra lateral">
      <div class="af-sidebar-logo">
        <div class="af-sidebar-logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </div>
        <span class="af-sidebar-logo-text">AlexitoFind</span>
      </div>

      <nav class="af-sidebar-nav">
        ${items.map(item => `
          <a href="${item.href}" class="af-sidebar-item${activePage === item.key ? ' active' : ''}"
             aria-current="${activePage === item.key ? 'page' : 'false'}">
            <span class="af-sidebar-item-icon">${item.icon}</span>
            <span>${item.label}</span>
            ${item.badge ? `<span class="af-badge af-sidebar-item-badge" data-badge="${item.key}" style="display:none">0</span>` : ''}
          </a>
        `).join('')}
      </nav>

      <div class="af-sidebar-footer">
        <a href="profile.html" class="af-sidebar-user" style="text-decoration:none">
          <div class="af-avatar af-avatar-md">
            <img class="af-avatar-img" src="${u.avatar}" alt="${u.name}"
              onerror="this.src=generateAvatarSVG('${u.name}', 48)">
          </div>
          <div class="af-sidebar-user-info">
            <div class="af-sidebar-user-name">${u.name} ${u.lastName}</div>
            <div class="af-sidebar-user-handle">Ver perfil →</div>
          </div>
        </a>
      </div>
    </aside>
  `;
}

// ============================================================
// ICON LIBRARY (SVG inline)
// ============================================================
const navIcons = {
  home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  explore: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  messages: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  notif: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  profile: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  back: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>`,
  x: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  star: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  rewind: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>`,
  boost: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  send: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  edit: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  location: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  verified: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00C897" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
};
