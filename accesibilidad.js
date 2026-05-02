/*
 * accesibilidad.js — RETROTERM.AI
 * Mejoras de accesibilidad en tiempo de ejecución
 * WCAG 2.1 nivel AA
 */
(function () {

  /* 1. SKIP LINK — inyectar si no existe ya */
  if (!document.querySelector('.skip-link')) {
    var skip = document.createElement('a');
    skip.href = '#main-content';
    skip.className = 'skip-link';
    skip.textContent = '→ Saltar al contenido principal';
    // Evitar que el skip link dispare listeners de hashchange de navegación interna
    skip.addEventListener('click', function(e) {
      var target = document.getElementById('main-content');
      if (target) {
        e.preventDefault();
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView();
      }
    });
    document.body.insertBefore(skip, document.body.firstChild);
  }

  /* 2. ELEMENTO <main> — envolver el contenido principal si no existe ya */
  if (!document.querySelector('main')) {
    var contentEl =
      document.querySelector('article') ||
      document.querySelector('.articulo') ||
      document.querySelector('.pantalla') ||
      document.querySelector('.wrap') ||
      document.querySelector('.main-layout');
    if (contentEl) {
      var mainEl = document.createElement('main');
      mainEl.id = 'main-content';
      contentEl.parentNode.insertBefore(mainEl, contentEl);
      mainEl.appendChild(contentEl);
      /* mover todos los siblings que sean secciones de contenido dentro de main */
      var sibling = mainEl.nextSibling;
      while (sibling) {
        var next = sibling.nextSibling;
        var tag = sibling.nodeType === 1 ? sibling.tagName.toLowerCase() : '';
        if (tag === 'section' || (sibling.classList && sibling.classList.contains('pantalla'))) {
          mainEl.appendChild(sibling);
        }
        sibling = next;
      }
    }
  } else if (!document.getElementById('main-content')) {
    document.querySelector('main').id = 'main-content';
  }

  /* 2b. HAMBURGUESA — aria-expanded sincronizado con estado del menú */
  var hamburguesa = document.querySelector('.hamburguesa');
  var menuToggleInput = document.getElementById('menu-toggle');
  if (hamburguesa && menuToggleInput) {
    hamburguesa.setAttribute('aria-expanded', menuToggleInput.checked ? 'true' : 'false');
    menuToggleInput.addEventListener('change', function () {
      hamburguesa.setAttribute('aria-expanded', menuToggleInput.checked ? 'true' : 'false');
      hamburguesa.setAttribute('aria-label', menuToggleInput.checked ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });
  } else if (hamburguesa) {
    /* fallback: escuchar clicks directamente si no hay checkbox */
    var _menuOpen = false;
    hamburguesa.setAttribute('aria-expanded', 'false');
    hamburguesa.addEventListener('click', function () {
      _menuOpen = !_menuOpen;
      hamburguesa.setAttribute('aria-expanded', _menuOpen ? 'true' : 'false');
      hamburguesa.setAttribute('aria-label', _menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });
  }

  /* 3. CANVAS DECORATIVO — aria-hidden */
  var canvas = document.getElementById('bg-canvas');
  if (canvas) {
    canvas.setAttribute('aria-hidden', 'true');
    canvas.setAttribute('role', 'presentation');
    canvas.setAttribute('focusable', 'false');
  }

  /* 4. VIDEOS DECORATIVOS — aria-hidden + title */
  document.querySelectorAll('video[autoplay][muted]').forEach(function (v) {
    v.setAttribute('aria-hidden', 'true');
    v.setAttribute('role', 'presentation');
    if (!v.hasAttribute('title')) v.setAttribute('title', 'Vídeo decorativo');
  });

  /* 5. IMÁGENES SIN ALT — marcar como decorativas */
  document.querySelectorAll('img:not([alt])').forEach(function (img) {
    img.setAttribute('alt', '');
    img.setAttribute('role', 'presentation');
  });

  /* 6. INPUTS SIN LABEL — cubre inputs con y sin id (ej: .gsearch en defi) */
  document.querySelectorAll('input, textarea').forEach(function (el) {
    if (el.getAttribute('aria-label')) return;
    if (el.id && document.querySelector('label[for="' + el.id + '"]')) return;
    var text = el.getAttribute('placeholder') ||
               (el.closest('[data-label]') && el.closest('[data-label]').dataset.label);
    if (text) {
      el.setAttribute('aria-label', text.replace(/^[>\s]+/, '').trim());
    }
  });

  /* 7. BOTONES ICON-ONLY — aria-label por símbolo/emoji */
  var symbolMap = {
    '☰': 'Abrir menú',
    '×': 'Cerrar',
    '✕': 'Cerrar',
    '✓': 'Confirmar',
    '▶': 'Reproducir',
    '◀': 'Anterior',
    '↺': 'Actualizar',
    '⬅': 'Deshacer movimiento',
    '⚠': 'Revelar solución',
    /* Editor CODE_CRT */
    '💾': 'Guardar',
    '⬇': 'Descargar HTML',
    '🔍': 'Buscar y reemplazar',
    '⛶': 'Expandir preview',
    '⤢': 'Pantalla completa',
    /* Sidebar CODE_CRT */
    '📁': 'Explorador de archivos',
    '🔎': 'Buscar en código',
    '⚡': 'Snippets',
    '🟡': 'Cambiar tema',
    '⌨': 'Atajos de teclado',
    '⚙': 'Ajustes'
  };

  document.querySelectorAll('button:not([aria-label])').forEach(function (btn) {
    var text = btn.textContent.trim();
    if (symbolMap[text]) {
      btn.setAttribute('aria-label', symbolMap[text]);
    }
  });

  /* 8. DIV/SPAN CON onclick que actúan como botón (sidebar icons del editor)
        → role="button" + tabindex + activación por teclado + aria-label desde data-tip */
  document.querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(textarea)').forEach(function (el) {
    var tag = el.tagName.toLowerCase();
    if (tag !== 'div' && tag !== 'span' && tag !== 'li') return;
    if (!el.getAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.getAttribute('aria-label')) {
      var tip = el.getAttribute('data-tip') || el.getAttribute('title');
      if (tip) el.setAttribute('aria-label', tip);
    }
    if (!el.dataset.a11yKey) {
      el.dataset.a11yKey = '1';
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    }
  });

  /* 9. TABLAS SIN SCOPE */
  document.querySelectorAll('th:not([scope])').forEach(function (th) {
    th.setAttribute('scope', th.closest('thead') ? 'col' : 'row');
  });

  /* 10. LIVE REGION para chat / asistente */
  var chatOut = document.getElementById('chat-output') ||
                document.querySelector('.chat-messages') ||
                document.querySelector('[id*="chat"]');
  if (chatOut && !chatOut.getAttribute('aria-live')) {
    chatOut.setAttribute('aria-live', 'polite');
    chatOut.setAttribute('aria-atomic', 'false');
    chatOut.setAttribute('aria-relevant', 'additions');
  }

  /* 11. TICKER de precios — decorativo, no interrumpir */
  var ticker = document.getElementById('ticker-track') ||
               document.querySelector('.ticker-track');
  if (ticker && !ticker.getAttribute('aria-live')) {
    ticker.setAttribute('aria-live', 'off');
    ticker.setAttribute('aria-label', 'Ticker de precios en tiempo real');
  }

  /* 12. ESTADO WebSocket (defi) — live region polite */
  var wslabel = document.getElementById('wslabel');
  if (wslabel && !wslabel.getAttribute('aria-live')) {
    wslabel.setAttribute('aria-live', 'polite');
    wslabel.setAttribute('aria-atomic', 'true');
  }

  /* 13. LINKS EXTERNOS — aviso lectores de pantalla */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    if (!a.getAttribute('aria-label') && !a.querySelector('.sr-only')) {
      var span = document.createElement('span');
      span.className = 'sr-only';
      span.textContent = ' (abre en nueva pestaña)';
      a.appendChild(span);
    }
  });

  /* 14. IFRAMES SIN TÍTULO */
  document.querySelectorAll('iframe:not([title])').forEach(function (fr) {
    fr.setAttribute('title', 'Área de previsualización del código');
  });

})();
