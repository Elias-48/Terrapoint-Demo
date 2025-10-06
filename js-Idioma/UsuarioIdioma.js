// UsuarioIdioma.js - Language switcher for usuario.html
(function(){
  const STORAGE_KEY = 'preferred-language-user';
  const SUPPORTED = ['es','en'];

  const t = {
    es: {
      'user.nav.greeting': 'Hola, Elías Rivera',
      'user.nav.level': 'Nivel 2 · Colaborador',
      'user.nav.logout': 'Salir',

      'user.profile.title': 'Tu perfil',
      'user.profile.upload.label': 'Subir nueva foto',
      'user.profile.upload.help': 'Formatos permitidos: JPG, JPEG, PNG, GIF, WEBP. Máx. 5 MB.',
      // File input custom control
      'user.file.select_button': 'Seleccionar archivo',
      'user.file.no_file': 'Ningún archivo seleccionado',
      'user.file.selected': 'Seleccionado: {name}',

      'user.progress.title': 'Tu progreso',
      'user.progress.level': 'Nivel 2: Colaborador',
      'user.progress.to_next': '45% hacia el siguiente nivel',
      'user.progress.aria': 'Progreso de nivel',
      'user.progress.item1': 'Insignia Colaborador',
      'user.progress.item2': 'Participación en jornadas',
      'user.progress.item3': 'Plantón o semillas',

      'user.report.title': 'Reporte de contaminación',
      'user.report.desc.label': 'Descripción del hecho',
      'user.report.desc.placeholder': 'Describe lo que ocurrió...',
      'user.report.loc.label': 'Ubicación / dirección exacta',
      'user.report.loc.placeholder': 'Calle, número, ciudad',
      'user.report.type.label': 'Tipo de contaminación',
      'user.report.type.placeholder': 'Selecciona una opción...',
      'user.report.type.air': 'Aire (humo de quema, polvo, olor fuerte, humo de vehículos)',
      'user.report.type.trash': 'Basura (bolsas tiradas, escombros, montón de residuos)',
      'user.report.type.noise': 'Ruido (música muy alta, maquinaria, bocinas, construcción)',
      'user.report.type.water': 'Agua (color extraño, mal olor, espuma, aceite en la superficie)',
      'user.report.type.other': 'Otro (describe el caso)',
      'user.report.photo.label': 'Evidencia fotográfica',
      'user.report.submit': 'Enviar',

      'user.map.title': 'Mapa Satelital',
      'user.map.subtitle': 'Vista principal del mapa para tus reportes y exploración de tu zona.',

      'user.chat.title': 'Comunicación con moderador',
      'user.chat.sample.meta': 'Moderador · 10:20',
      'user.chat.sample.text': 'Hola, cuéntanos sobre tu reporte.',
      'user.chat.input': 'Escribe un mensaje...',
      'user.chat.send': 'Enviar',

      'user.news.title': 'Novedades',
      'user.news.card1.title': 'Limpieza comunitaria este fin de semana',
      'user.news.card1.text': 'Únete a la jornada de limpieza en el parque central. Trae guantes y bolsas reutilizables.'
    },
    en: {
      'user.nav.greeting': 'Hello, Elias Rivera',
      'user.nav.level': 'Level 2 · Contributor',
      'user.nav.logout': 'Log out',

      'user.profile.title': 'Your profile',
      'user.profile.upload.label': 'Upload new photo',
      'user.profile.upload.help': 'Allowed formats: JPG, JPEG, PNG, GIF, WEBP. Max 5 MB.',
      // File input custom control
      'user.file.select_button': 'Select file',
      'user.file.no_file': 'No file selected',
      'user.file.selected': 'Selected: {name}',

      'user.progress.title': 'Your progress',
      'user.progress.level': 'Level 2: Contributor',
      'user.progress.to_next': '45% to next level',
      'user.progress.aria': 'Level progress',
      'user.progress.item1': 'Contributor badge',
      'user.progress.item2': 'Community events',
      'user.progress.item3': 'Sapling or seeds',

      'user.report.title': 'Pollution report',
      'user.report.desc.label': 'Description of the event',
      'user.report.desc.placeholder': 'Describe what happened...',
      'user.report.loc.label': 'Location / exact address',
      'user.report.loc.placeholder': 'Street, number, city',
      'user.report.type.label': 'Type of pollution',
      'user.report.type.placeholder': 'Choose an option...',
      'user.report.type.air': 'Air (burning smoke, dust, strong odor, vehicle smoke)',
      'user.report.type.trash': 'Trash (litter, debris, pile of waste)',
      'user.report.type.noise': 'Noise (very loud music, machinery, horns, construction)',
      'user.report.type.water': 'Water (odd color, bad odor, foam, oil on the surface)',
      'user.report.type.other': 'Other (describe the case)',
      'user.report.photo.label': 'Photo evidence',
      'user.report.submit': 'Send',

      'user.map.title': 'Satellite Map',
      'user.map.subtitle': 'Main map view for your reports and local exploration.',

      'user.chat.title': 'Contact with the moderator',
      'user.chat.sample.meta': 'Moderator · 10:20',
      'user.chat.sample.text': 'Hello, tell us about your report.',
      'user.chat.input': 'Type a message...',
      'user.chat.send': 'Send',

      'user.news.title': 'News',
      'user.news.card1.title': 'Community cleanup this weekend',
      'user.news.card1.text': 'Join the cleanup day at the central park. Bring gloves and reusable bags.'
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
            try { el.setAttribute(attrName, val); } catch (_) {}
          });
        } else if ((el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && 'placeholder' in el) {
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
