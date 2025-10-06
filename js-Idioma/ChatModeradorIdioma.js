// ChatModeradorIdioma.js - Language switcher for chat-moderador.html
(function(){
  const STORAGE_KEY = 'preferred-language-moderator'; // reuse to stay consistent with other pages
  const SUPPORTED = ['es','en'];

  const t = {
    es: {
      // Navbar (reuse mod.* keys for consistency)
      'mod.nav.greeting': 'Hola, Moderador',
      'mod.nav.logout': 'Salir',

      // Chat header
      'chat.title': 'Chat Moderador',
      'chat.search.open': 'Buscar usuario',
      'chat.search.close': 'Cerrar búsqueda',
      'chat.search.placeholder': 'Buscar usuario...',
      'chat.header.placeholder': 'Selecciona un usuario',
      'chat.input.placeholder': 'Escribe un mensaje...',
      'chat.send': 'Enviar',
      'chat.no_results': 'Sin resultados',
    },
    en: {
      // Navbar
      'mod.nav.greeting': 'Hello, Moderator',
      'mod.nav.logout': 'Log out',

      // Chat header
      'chat.title': 'Moderator Chat',
      'chat.search.open': 'Search user',
      'chat.search.close': 'Close search',
      'chat.search.placeholder': 'Search user...',
      'chat.header.placeholder': 'Select a user',
      'chat.input.placeholder': 'Type a message...',
      'chat.send': 'Send',
      'chat.no_results': 'No results',
    }
  };

  function applyTranslations(lang){
    const dict = t[lang] || t.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = dict[key];
      if (typeof val === 'string') {
        const attrList = el.getAttribute('data-i18n-attr');
        if (attrList) {
          attrList.split(',').map(s => s.trim()).filter(Boolean).forEach(attrName => {
            try { el.setAttribute(attrName, val); } catch(_){ }
          });
        } else if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });
    // Notify pages that i18n content changed
    try { document.dispatchEvent(new CustomEvent('chat-i18n-changed', { detail: { lang } })); } catch(_) {}
  }

  function init(){
    // Elements for dropdown
    const ddToggle = document.getElementById('lang-dropdown-toggle');
    const ddFlag = document.getElementById('lang-dropdown-flag');
    const ddLabel = document.getElementById('lang-dropdown-label');
    const ddItems = document.querySelectorAll('.lang-item');

    // Default to English
    let lang = localStorage.getItem(STORAGE_KEY) || 'en';
    if (!SUPPORTED.includes(lang)) lang = 'en';

    const updateDropdownUI = (code) => {
      if (!ddToggle || !ddFlag || !ddLabel) return;
      const isEn = code === 'en';
      ddFlag.src = isEn ? '../img/BanderaEN.svg.png' : '../img/BanderaES.svg.png';
      ddFlag.alt = isEn ? 'EN' : 'ES';
      ddLabel.textContent = isEn ? 'EN' : 'ES';
    };

    // Apply on load
    applyTranslations(lang);
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    updateDropdownUI(lang);

    // Wire dropdown clicks
    if (ddItems && ddItems.length){
      ddItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const code = item.getAttribute('data-lang');
          if (!SUPPORTED.includes(code)) return;
          localStorage.setItem(STORAGE_KEY, code);
          applyTranslations(code);
          document.documentElement.lang = code;
          updateDropdownUI(code);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
