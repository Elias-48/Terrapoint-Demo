// RegisterIdioma.js - Language switcher for registrarse.html
(function(){
  const STORAGE_KEY = 'preferred-language-register';
  const SUPPORTED = ['es','en'];

  const t = {
    es: {
      'register.nav.signin_link': '¿Ya tienes cuenta? Inicia sesión',
      'register.nav.back_home': 'Volver al inicio',
      'register.title': 'Registrarse',
      'register.first_name.label': 'Nombre',
      'register.first_name.placeholder': 'Tu nombre',
      'register.last_name.label': 'Apellido',
      'register.last_name.placeholder': 'Tu apellido',
      'register.email.label': 'Correo',
      'register.email.placeholder': 'correo@ejemplo.com',
      'register.age.label': 'Edad',
      'register.age.placeholder': 'Tu edad',
      'register.phone.label': 'Teléfono (opcional)',
      'register.phone.placeholder': 'Tu teléfono',
      'register.password.label': 'Contraseña',
      'register.password.placeholder': 'Crea una contraseña',
      'register.password2.label': 'Confirmar contraseña',
      'register.password2.placeholder': 'Repite la contraseña',
      'register.submit': 'Registrarme',
      'register.signin_link': '¿Ya tienes cuenta? Inicia sesión'
    },
    en: {
      'register.nav.signin_link': 'Already have an account? Sign in',
      'register.nav.back_home': 'Back to home',
      'register.title': 'Sign up',
      'register.first_name.label': 'First name',
      'register.first_name.placeholder': 'Your first name',
      'register.last_name.label': 'Last name',
      'register.last_name.placeholder': 'Your last name',
      'register.email.label': 'Email',
      'register.email.placeholder': 'email@example.com',
      'register.age.label': 'Age',
      'register.age.placeholder': 'Your age',
      'register.phone.label': 'Phone (optional)',
      'register.phone.placeholder': 'Your phone',
      'register.password.label': 'Password',
      'register.password.placeholder': 'Create a password',
      'register.password2.label': 'Confirm password',
      'register.password2.placeholder': 'Repeat the password',
      'register.submit': 'Sign up',
      'register.signin_link': 'Already have an account? Sign in'
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
