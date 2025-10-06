// IndexIdioma.js - Language switcher for index.html
(function () {
  const STORAGE_KEY = 'preferred-language-index';
  const SUPPORTED = ['es', 'en'];

  // Dictionary: keys map to element data-i18n attributes
  const t = {
    es: {

      'map.title': 'Mapa Satelital Interactivo',
      'map.subtitle': 'Utilizando datos precisos de la NASA para mostrar zonas de alta contaminación y áreas verdes en tiempo real.',
      'map.input': 'Ej: Av Industrial D 21, Chimbote',
      'map.searchBtn': 'Buscar',
      'map.select.label': 'Tipo de contaminación:',
      'map.saveBtn': 'Guardar',
      'map.option.air': 'Aire',
      'map.option.trash': 'Basura',
      'map.option.noise': 'Ruido',
      'map.option.water': 'Agua',
      'map.option.other': 'Otros',
      'map.legend.air': 'Aire',
      'map.legend.trash': 'Basura',
      'map.legend.noise': 'Ruido',
      'map.legend.water': 'Agua',
      'map.legend.other': 'Otros',

  'nav.inicio': 'Inicio',
      'nav.mapa': 'Mapa',
      'nav.datos': 'Datos',
      'nav.comunidad': 'Comunidad',
      'nav.login': 'Iniciar sesión',
      'nav.signup': 'Registrarse',

      'hero.title': 'Monitoreo ambiental con datos satelitales',
      'hero.subtitle': 'Visualiza mapas en vivo de contaminación, calidad del aire y ecosistemas gracias a datos de la NASA. Únete a la lucha por un planeta sostenible con precisión basada en tecnología avanzada.',
      'hero.btn.map': 'Explorar mapa',
      'hero.btn.game': 'Recompensas',

      'map.title': 'Mapa Satelital Interactivo',
      'map.subtitle': 'Utilizando datos precisos de la NASA para mostrar zonas de alta contaminación y áreas verdes en tiempo real.',


      // Aire - tarjetas
      'air.card1.title': 'Calidad del Aire',
      'air.card1.status': 'Buena',
      'air.card1.small': 'Basado en PM2.5, NO2 y O3 (Datos simulados acorde a estándares de la EPA)',
      'air.card1.extra': 'La calidad del aire es saludable para la población general.',

      'air.card2.title': 'Contaminación',
      'air.card2.status': 'Alta',
      'air.card2.small': 'Alta - Niveles elevados de CO2 y partículas PM10.',
      'air.card2.extra': 'Puede haber riesgos para personas sensibles.',

      'air.card3.title': 'Zonas verdes',
      'air.card3.status': 'Saludable',
      'air.card3.small': 'Saludables - Aumento en vegetación detectado por NDVI.',
      'air.card3.extra': 'Recomendado limitar actividades al aire libre.',

      'air.card4.title': 'Temperatura global',
      'air.card4.status': 'Aumentando',
      'air.card4.small': 'Aumentando - Comparado con 1970s (Anomalía térmica).',
      'air.card4.extra': 'La exposición prolongada puede ser peligrosa.',

      'community.title': 'Comentarios de la Comunidad',
      'community.subtitle': 'Escucha cómo EcoStellar está cambiando vidas con datos precisos y acciones reales.',

      'resources.title': 'Recursos Ambientales',
      'resources.subtitle': 'Aprende más sobre el medio ambiente con artículos precisos basados en ciencia.',

      'gamification.title': 'Gamificación y Recompensas',
      'gamification.subtitle': 'Gana puntos limpiando zonas contaminadas, formando comunidades y completando retos ecológicos. ¡Cada acción cuenta con precisión!',

      'levels.title': 'Premios y Niveles',
      'levels.subtitle': 'Súmate a la gamificación: avanza de nivel y desbloquea insignias, certificados y reconocimientos.',
      'levels.see.rewards': 'Ver detalles de recompensas',
      // Levels - cards (ES)
      'levels.1.badge': 'Nivel 1',
      'levels.1.name': 'Ecoamigable',
      'levels.1.desc': 'Tu primer paso hacia la acción ambiental.',
      'levels.1.item1': 'Insignia Ecoamigable',
      'levels.1.item2': 'Certificado de participación',
      'levels.1.item3': 'Tips ecológicos',

      'levels.2.badge': 'Nivel 2',
      'levels.2.name': 'Colaborador',
      'levels.2.desc': 'Participa en comunidades y suma reportes.',
      'levels.2.item1': 'Insignia Colaborador',
      'levels.2.item2': 'Jornadas comunitarias',
      'levels.2.item3': 'Plantón o semillas',

      'levels.3.badge': 'Nivel 3',
      'levels.3.name': 'Guardián Verde',
      'levels.3.item1': 'Insignia Guardián Verde',
      'levels.3.item2': 'Certificado municipal',
      'levels.3.item3': 'Kit ambiental',

      'levels.4.badge': 'Nivel 4',
      'levels.4.name': 'Héroe Ambiental',
      'levels.4.desc': 'Liderazgo e impacto sostenido.',
      'levels.4.item1': 'Insignia Héroe',
      'levels.4.item2': 'Reconocimiento oficial',
      'levels.4.item3': 'Plantones adicionales',

      'footer.form.title': 'Contacta con Terrapoint',
      'footer.cta': 'Vuélvete un aliado ambiental...',
      'footer.form.name': 'Tu nombre',
      'footer.form.email': 'Tu email',
      'footer.form.message': 'Tu mensaje',
      'footer.form.send': 'Enviar',
      'footer.credits': '2025 Terrapoint — Salvemos el planeta con datos precisos.'
      ,
      // Comunidad - tarjetas
      'community.card1.text': 'Terrapoint me ayudó a entender la contaminación en mi ciudad. ¡He reducido mi huella ecológica gracias a sus datos precisos de la NASA!',
      'community.card1.author': '- Ana L., Ciudadana, Madrid',
      'community.card2.text': 'Participando en la gamificación, mi comunidad plantó 500 árboles. Los mapas satelitales nos guiaron perfectamente.',
      'community.card2.author': '- Juan P., Activista, Bogotá',
      'community.card3.text': 'La precisión con datos satelitales de la NASA es asombrosa. Terrapoint es mi aliada en sostenibilidad, con métricas reales.',
      'community.card3.author': '- Maria S., Científica, Santiago',

      // Recursos - tarjetas
      'resources.card1.title': 'Cambio Climático',
      'resources.card1.text': 'Descubre los impactos del cambio climático en los ecosistemas, con datos de temperatura global.',
      'resources.card2.title': 'Calidad del Aire',
      'resources.card2.text': 'Monitorea partículas PM2.5 y gases tóxicos con índices precisos como AQI.',
      'resources.card3.title': 'Protección de Ecosistemas',
      'resources.card3.text': 'Estrategias para preservar biodiversidad y zonas verdes mediante datos satelitales.',

      // Gamificación - tarjetas
      'gam.card1.title': 'Acciones Ecológicas',
      'gam.card1.text': 'Registra limpiezas y plantaciones para puntos basados en impacto real.',
      'gam.card2.title': 'Comunidades',
      'gam.card2.text': 'Únete o crea grupos para desafíos colaborativos con métricas precisas.',
      'gam.card3.title': 'Certificados',
      'gam.card3.text': 'Obtén credenciales digitales por logros validados por datos satelitales.'
    },
    en: {
      'nav.inicio': 'Home',
      'nav.mapa': 'Map',
      'nav.datos': 'Data',
      'nav.comunidad': 'Community',
      'nav.login': 'Sign in',
      'nav.signup': 'Sign up',


        'map.title': 'Interactive Satellite Map',
  'map.subtitle': 'Using accurate NASA data to show high pollution zones and green areas in real time.',
  'map.input': 'E.g.: Industrial Av. D 21, Chimbote',
  'map.searchBtn': 'Search',
  'map.select.label': 'Type of pollution:',
  'map.saveBtn': 'Save',
  'map.option.air': 'Air',
  'map.option.trash': 'Trash',
  'map.option.noise': 'Noise',
  'map.option.water': 'Water',
  'map.option.other': 'Other',
  'map.legend.air': 'Air',
  'map.legend.trash': 'Trash',
  'map.legend.noise': 'Noise',
  'map.legend.water': 'Water',
  'map.legend.other': 'Other',
      'hero.title': 'Environmental monitoring with satellite data',
      'hero.subtitle': 'View live maps of pollution, air quality, and ecosystems thanks to NASA data. Join the fight for a sustainable planet with accuracy powered by advanced technology.',
      'hero.btn.game': 'Rewards',
      'hero.btn.map': 'Explore map',

      'map.title': 'Interactive Satellite Map',
      'map.subtitle': 'Using accurate NASA data to show high-pollution areas and green zones in real time.',

      // Air - cards
      'air.card1.title': 'Air Quality',
      'air.card1.status': 'Good',
      'air.card1.small': 'Based on PM2.5, NO2 and O3 (Simulated data per EPA standards)',
      'air.card1.extra': 'Air quality is healthy for the general population.',

      'air.card2.title': 'Pollution',
      'air.card2.status': 'High',
      'air.card2.small': 'High — Elevated CO2 levels and PM10 particles.',
      'air.card2.extra': 'There may be risks for sensitive people.',

      'air.card3.title': 'Green areas',
      'air.card3.status': 'Healthy',
      'air.card3.small': 'Healthy — Increase in vegetation detected by NDVI.',
      'air.card3.extra': 'It is recommended to limit outdoor activities.',

      'air.card4.title': 'Global temperature',
      'air.card4.status': 'Rising',
      'air.card4.small': 'Rising — Compared to the 1970s (Thermal anomaly).',
      'air.card4.extra': 'Prolonged exposure can be dangerous.',

      'community.title': 'Community Comments',
      'community.subtitle': 'Hear how EcoStellar is changing lives with accurate data and real actions.',

      'resources.title': 'Environmental Resources',
      'resources.subtitle': 'Learn more about the environment with accurate science-based articles.',

      'gamification.title': 'Gamification and Rewards',
      'gamification.subtitle': 'Earn points by cleaning polluted areas, forming communities, and completing eco challenges. Every action counts with precision!',

      'levels.title': 'Awards and Levels',
      'levels.subtitle': 'Join gamification: level up and unlock badges, certificates, and recognitions.',
      'levels.see.rewards': 'See reward details',
      // Levels - cards (EN)
      'levels.1.badge': 'Level 1',
      'levels.1.name': 'Eco-friendly',
      'levels.1.desc': 'Your first step towards environmental action.',
      'levels.1.item1': 'Eco-friendly badge',
      'levels.1.item2': 'Participation certificate',
      'levels.1.item3': 'Eco tips',

      'levels.2.badge': 'Level 2',
      'levels.2.name': 'Contributor',
      'levels.2.desc': 'Join communities and add reports.',
      'levels.2.item1': 'Contributor badge',
      'levels.2.item2': 'Community events',
      'levels.2.item3': 'Saplings or seeds',

      'levels.3.badge': 'Level 3',
      'levels.3.name': 'Green Guardian',
      'levels.3.desc': 'Verified reports and volunteering.',
      'levels.3.item1': 'Green Guardian badge',
      'levels.3.item2': 'Municipal certificate',
      'levels.3.item3': 'Environmental kit',

      'levels.4.badge': 'Level 4',
      'levels.4.name': 'Environmental Hero',
      'levels.4.desc': 'Leadership and sustained impact.',
      'levels.4.item1': 'Hero badge',
      'levels.4.item2': 'Official recognition',
      'levels.4.item3': 'Additional saplings',

      'footer.form.title': 'Contact Terrapoint',
      'footer.cta': 'Become an environmental ally...',
      'footer.form.name': 'Your name',
      'footer.form.email': 'Your email',
      'footer.form.message': 'Your message',
      'footer.form.send': 'Send',
      'footer.credits': '2025 Terrapoint — Let’s save the planet with accurate data.'
      ,
      // Community - cards
      'community.card1.text': 'Terrapoint helped me understand pollution in my city. I have reduced my footprint thanks to its accurate NASA-powered data!',
      'community.card1.author': '- Ana L., Citizen, Madrid',
      'community.card2.text': 'By joining gamification, my community planted 500 trees. The satellite maps guided us perfectly.',
      'community.card2.author': '- Juan P., Activist, Bogotá',
      'community.card3.text': 'The accuracy with NASA satellite data is amazing. Terrapoint is my ally in sustainability with real metrics.',
      'community.card3.author': '- Maria S., Scientist, Santiago',

      // Resources - cards
      'resources.card1.title': 'Climate Change',
      'resources.card1.text': 'Discover the impacts of climate change on ecosystems, with global temperature data.',
      'resources.card2.title': 'Air Quality',
      'resources.card2.text': 'Monitor PM2.5 particles and toxic gases with accurate indices like AQI.',
      'resources.card3.title': 'Ecosystem Protection',
      'resources.card3.text': 'Strategies to preserve biodiversity and green areas using satellite data.',

      // Gamification - cards
      'gam.card1.title': 'Eco Actions',
      'gam.card1.text': 'Record cleanups and tree planting for points based on real impact.',
      'gam.card2.title': 'Communities',
      'gam.card2.text': 'Join or create groups for collaborative challenges with accurate metrics.',
      'gam.card3.title': 'Certificates',
      'gam.card3.text': 'Earn digital credentials for achievements validated by satellite data.'
    }
  };

  function applyTranslations(lang) {
    const dict = t[lang] || t.es;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = dict[key];
      if (typeof val === 'string') {
        if (el.tagName === 'INPUT' && 'placeholder' in el) {
          el.placeholder = val;
        } else if (el.tagName === 'TEXTAREA' && 'placeholder' in el) {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    });
    // Keep language select consistent on every apply
    const select = document.getElementById('lang-select-index');
    if (select) {
      let optEs = select.querySelector('option[value="es"]');
      let optEn = select.querySelector('option[value="en"]');
      if (!optEs) { optEs = document.createElement('option'); optEs.value = 'es'; select.appendChild(optEs); }
      if (!optEn) { optEn = document.createElement('option'); optEn.value = 'en'; select.appendChild(optEn); }
      optEs.textContent = 'ES';
      optEn.textContent = 'EN';
      // Ensure order EN / ES
      if (optEn.nextSibling !== optEs) {
        select.insertBefore(optEn, select.firstChild);
        select.appendChild(optEs);
      }
      // Update flag class and current value
      select.classList.toggle('lang-en', lang === 'en');
      select.classList.toggle('lang-es', lang === 'es');
      if (['es', 'en'].includes(lang)) select.value = lang;
    }
  }

  function init() {
    const select = document.getElementById('lang-select-index');
    const ddToggle = document.getElementById('lang-dropdown-toggle');
    const ddFlag = document.getElementById('lang-dropdown-flag');
    const ddLabel = document.getElementById('lang-dropdown-label');
    const ddItems = document.querySelectorAll('.lang-item');
    // Default to English when no preference stored
    const storedIndex = localStorage.getItem(STORAGE_KEY);
    let lang = storedIndex || 'en';
    if (!SUPPORTED.includes(lang)) lang = 'en';

    const updateDropdownUI = (code) => {
      if (!ddToggle || !ddFlag || !ddLabel) return;
      const isEn = code === 'en';
      ddFlag.src = isEn ? '../img/BanderaEN.svg.png' : '../img/BanderaES.svg.png';
      ddFlag.alt = isEn ? 'EN' : 'ES';
      ddLabel.textContent = isEn ? 'EN' : 'ES';
    };

    if (select) {
      // Ensure options and labels are correct
      let optEs = select.querySelector('option[value="es"]');
      let optEn = select.querySelector('option[value="en"]');
      if (!optEs) {
        optEs = document.createElement('option');
        optEs.value = 'es';
        select.appendChild(optEs);
      }
      if (!optEn) {
        optEn = document.createElement('option');
        optEn.value = 'en';
        select.appendChild(optEn);
      }
      optEs.textContent = 'ES';
      optEn.textContent = 'EN';

      // Set current value and flag class
      select.value = lang;
      select.classList.toggle('lang-en', lang === 'en');
      select.classList.toggle('lang-es', lang === 'es');

      // Handle changes (native select)
      select.addEventListener('change', () => {
        const v = select.value;
        if (!SUPPORTED.includes(v)) return; // ignore invalid
        localStorage.setItem(STORAGE_KEY, v);
        applyTranslations(v);
        // Re-assert labels and selection
        optEs.textContent = 'ES';
        optEn.textContent = 'EN';
        select.value = v;
        // Update flag class
        select.classList.toggle('lang-en', v === 'en');
        select.classList.toggle('lang-es', v === 'es');
        updateDropdownUI(v);
      });
    }

    // Initial apply
    applyTranslations(lang);
    if (select) select.value = lang;
    // Persist initial language to override any stale value
    localStorage.setItem(STORAGE_KEY, lang);
    // Update custom dropdown visuals
    updateDropdownUI(lang);

    // Handle changes (custom dropdown)
    if (ddItems && ddItems.length) {
      ddItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const code = item.getAttribute('data-lang');
          if (!SUPPORTED.includes(code)) return;
          localStorage.setItem(STORAGE_KEY, code);
          applyTranslations(code);
          updateDropdownUI(code);
          if (select) {
            select.value = code;
            select.classList.toggle('lang-en', code === 'en');
            select.classList.toggle('lang-es', code === 'es');
          }
        });
      });
    }
  }
  // Do not sync with other keys or listeners to avoid external overrides

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
