// LoginIdioma.js - Language switcher for iniciar-sesion.html
(function(){
  const STORAGE_KEY = 'preferred-language-login';
  const SUPPORTED = ['es','en'];

  // i18n dictionary for the login page
  const t = {
    es: {
      'login.nav.signup_link': '¿No tienes cuenta? Regístrate',
      'login.nav.back_home': 'Volver al inicio',
      'login.title': 'Iniciar sesión',
      'login.email.label': 'Correo',
      'login.email.placeholder': 'correo@ejemplo.com',
      'login.password.label': 'Contraseña',
      'login.password.placeholder': '••••••••',
      'login.submit': 'Iniciar sesión',
      'login.signup_link': '¿No tienes cuenta? Regístrate'
    },
    en: {
      'login.nav.signup_link': "Don't have an account? Sign up",
      'login.nav.back_home': 'Back to home',
      'login.title': 'Sign in',
      'login.email.label': 'Email',
      'login.email.placeholder': 'email@example.com',
      'login.password.label': 'Password',
      'login.password.placeholder': '••••••••',
      'login.submit': 'Sign in',
      'login.signup_link': "Don't have an account? Sign up"
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
        if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });
  }

  function init(){
    const ddToggle = document.getElementById('lang-dropdown-toggle');
    const ddFlag = document.getElementById('lang-dropdown-flag');
    const ddLabel = document.getElementById('lang-dropdown-label');
    const ddItems = document.querySelectorAll('.lang-item');

    let lang = localStorage.getItem(STORAGE_KEY) || 'en';
    if (!SUPPORTED.includes(lang)) lang = 'en';

    const updateDropdownUI = (code) => {
      if (!ddToggle || !ddFlag || !ddLabel) return;
      const isEn = code === 'en';
      ddFlag.src = isEn ? '../img/BanderaEN.svg.png' : '../img/BanderaES.svg.png';
      ddFlag.alt = isEn ? 'EN' : 'ES';
      ddLabel.textContent = isEn ? 'EN' : 'ES';
    };

    // Initial apply
    applyTranslations(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    updateDropdownUI(lang);

    // Dropdown item clicks
    if (ddItems && ddItems.length){
      ddItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const code = item.getAttribute('data-lang');
          if (!SUPPORTED.includes(code)) return;
          localStorage.setItem(STORAGE_KEY, code);
          applyTranslations(code);
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
