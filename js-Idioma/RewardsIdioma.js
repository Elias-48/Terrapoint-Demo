// RewardsIdioma.js - Language switcher for recompensas.html
(function(){
  const STORAGE_KEY = 'preferred-language-rewards';
  const SUPPORTED = ['es','en'];

  const t = {
    es: {
      // Navbar
      'rewards.nav.home': 'Inicio',
      'rewards.nav.map': 'Mapa',
      'rewards.nav.data': 'Datos',
      'rewards.nav.community': 'Comunidad',
      'rewards.nav.back_home': 'Volver al inicio',

      // Header
      'rewards.header.title': 'Tus Recompensas en TERRAPOINT',
      'rewards.header.subtitle': 'Cada reporte cuenta. Sube de nivel, gana reconocimiento y ayuda a tu comunidad.',
      'rewards.header.how': '¿Cómo funciona?',

      // Common labels
      'rewards.req': 'Requisito:',
      'rewards.rewards': 'Recompensas:',
      'rewards.details': 'Ver detalles',

      // About section
      'rewards.about.aria': 'Información sobre el sistema de recompensas de TERRAPOINT',
      'rewards.about.title': 'Acerca del Sistema de Recompensas',
      'rewards.about.h3.1': '1. Propósito del sistema de recompensas',
      'rewards.about.p1': 'El sistema de recompensas busca motivar y fidelizar a los ciudadanos en el uso de TERRAPOINT, transformando acciones cotidianas (como reportar basura o un foco de contaminación) en logros visibles y reconocidos. No solo refuerza la participación individual, sino que también crea un sentido de comunidad, donde cada persona ve que sus aportes generan resultados concretos.',
      'rewards.about.h3.2': '2. Tipos de recompensas',
      'rewards.about.p2': 'Las recompensas se dividen en tres categorías principales:',
      'rewards.about.catA': 'a) Recompensas Digitales:',
      'rewards.about.catA.li1': 'Insignias: gráficas llamativas y coleccionables para cada logro alcanzado.',
      'rewards.about.catA.li2': 'Certificados digitales: emitidos por la plataforma y, en alianza, por las municipalidades o autoridades ambientales.',
      'rewards.about.catA.li3': 'Reconocimiento en rankings comunitarios: destacar a los usuarios más activos en la app.',
      'rewards.about.catB': 'b) Recompensas Materiales (en alianza con municipalidades y empresas):',
      'rewards.about.catB.li1': 'Plantones o semillas: para sembrar en la comunidad.',
      'rewards.about.catB.li2': 'Kits ambientales: bolsas reutilizables, polos, guantes, botellas eco.',
      'rewards.about.catB.li3': 'Entradas o invitaciones: a talleres, ferias y actividades verdes.',
      'rewards.about.catC': 'c) Recompensas Sociales/Comunitarias:',
      'rewards.about.catC.li1': 'Mención pública: en campañas locales o en la web de la municipalidad.',
      'rewards.about.catC.li2': 'Rol de liderazgo comunitario: en acciones colaborativas.',
      'rewards.about.catC.li3': 'Oportunidad de proponer proyectos ambientales: que reciban apoyo local.',
      'rewards.about.h3.3': '3. Mecánica de avance',
      'rewards.about.h3.3.li1': 'Progresiva y transparente: cada acción suma puntos visibles en la app.',
      'rewards.about.h3.3.li2': 'Gamificación real: desbloqueo de insignias, barra de progreso, retos semanales y rankings.',
      'rewards.about.h3.3.li3': 'Verificación comunitaria: reportes validados por otros usuarios o moderadores para evitar abusos.',
      'rewards.about.h3.4': '4. Impacto esperado',
      'rewards.about.h3.4.li1': 'Motivar la acción sostenida: los usuarios no solo reportan una vez, sino que se mantienen activos gracias al progreso visible.',
      'rewards.about.h3.4.li2': 'Generar reconocimiento tangible: cada persona ve que su aporte es valorado por la plataforma y por la comunidad.',
      'rewards.about.h3.4.li3': 'Conectar con las autoridades: la municipalidad se convierte en aliado, entregando recompensas materiales y validando certificados oficiales.',

      // Level 1
      'rewards.l1.title': 'Ecoamigable',
      'rewards.l1.subtitle': 'Primer paso hacia la acción ambiental.',
      'rewards.l1.req': 'Realizar tu primer reporte en la plataforma.',
      'rewards.l1.r1': 'Insignia "Ecoamigable"',
      'rewards.l1.r2': 'Certificado de participación',
      'rewards.l1.tip2': 'Constancia digital descargable que valida tu inicio en TERRAPOINT.',
      'rewards.l1.r3': 'Acceso a tips ecológicos',
      'rewards.l1.cta1': 'Reportar ahora',

      // Level 2
      'rewards.l2.title': 'Colaborador Ambiental',
      'rewards.l2.subtitle': 'Únete a tu comunidad y participa activamente.',
      'rewards.l2.req': 'Unirte a una comunidad y realizar 3 reportes adicionales.',
      'rewards.l2.r1': 'Insignia "Colaborador"',
      'rewards.l2.r2': 'Participación en jornadas comunitarias',
      'rewards.l2.tip2': 'Invitaciones a limpiezas y eventos locales organizados por la comunidad.',
      'rewards.l2.r3': 'Entrega de plantón/semilla',
      'rewards.l2.cta1': 'Unirme a comunidad',

      // Level 3
      'rewards.l3.title': 'Guardián Verde',
      'rewards.l3.subtitle': 'Tu compromiso ya protege a tu entorno.',
      'rewards.l3.req': 'Alcanzar 10 reportes verificados y participar en al menos una jornada de voluntariado.',
      'rewards.l3.r1': 'Insignia "Guardián Verde"',
      'rewards.l3.r2': 'Certificado municipal',
      'rewards.l3.tip2': 'Certificado oficial avalado por la municipalidad local.',
      'rewards.l3.r3': 'Kit ambiental',
      'rewards.l3.cta1': 'Participar en campaña',

      // Level 4
      'rewards.l4.title': 'Héroe Ambiental',
      'rewards.l4.subtitle': 'Lidera acciones y mantiene impacto.',
      'rewards.l4.req': 'Liderar una acción comunitaria, 25 reportes verificados y 1 mes de actividad sostenida.',
      'rewards.l4.r1': 'Insignia "Héroe Ambiental"',
      'rewards.l4.r2': 'Reconocimiento oficial',
      'rewards.l4.tip2': 'Mención pública en eventos o medios de comunicación locales.',
      'rewards.l4.r3': 'Plantones adicionales',
      'rewards.l4.r4': 'Invitación a diseñar campañas',
      'rewards.l4.tip4': 'Oportunidad de colaborar en el diseño de campañas ambientales locales.',
      'rewards.l4.cta1': 'Liderar acción',

      // CTA final
      'rewards.cta.title': '¡Tu impacto ambiental comienza hoy! ',
      'rewards.cta.text': 'Cada acción, por pequeña que sea, contribuye a un futuro más verde. Únete a TERRAPOINT y empieza a ganar recompensas mientras proteges nuestro planeta.',
      'rewards.cta.button': 'Unirme Ahora y Reportar',

      // Foot text
      'rewards.foot': 'Las recompensas combinan reconocimiento digital (insignias, certificados) con incentivos reales (plantones, kits y menciones). Avanza subiendo tu nivel para recibir beneficios crecientes y participar en acciones con impacto tangible.',

      // Footer (reuse from index)
      'footer.form.title': 'Contacta con Terrapoint',
      'nav.login': 'Iniciar sesión',
      'nav.signup': 'Registrarse',
      'footer.form.name': 'Tu nombre',
      'footer.form.email': 'Tu email',
      'footer.form.message': 'Tu mensaje',
      'footer.form.send': 'Enviar',
      'footer.cta': 'Vuélvete un aliado ambiental...',
      'footer.credits': '2025 Terrapoint — Salvemos el planeta con datos precisos.'
    },
    en: {
      // Navbar
      'rewards.nav.home': 'Home',
      'rewards.nav.map': 'Map',
      'rewards.nav.data': 'Data',
      'rewards.nav.community': 'Community',
      'rewards.nav.back_home': 'Back to home',

      // Header
      'rewards.header.title': 'Your Rewards in TERRAPOINT',
      'rewards.header.subtitle': 'Every report counts. Level up, gain recognition, and help your community.',
      'rewards.header.how': 'How it works?',

      // Common labels
      'rewards.req': 'Requirement:',
      'rewards.rewards': 'Rewards:',
      'rewards.details': 'See details',

      // About section
      'rewards.about.aria': 'Information about TERRAPOINT rewards system',
      'rewards.about.title': 'About the Rewards System',
      'rewards.about.h3.1': '1. Purpose of the rewards system',
      'rewards.about.p1': 'The rewards system aims to motivate and retain citizens using TERRAPOINT, turning everyday actions (such as reporting trash or a pollution hotspot) into visible and recognized achievements. It not only strengthens individual participation, but also creates a sense of community, where everyone sees that their contributions generate concrete results.',
      'rewards.about.h3.2': '2. Types of rewards',
      'rewards.about.p2': 'Rewards are divided into three main categories:',
      'rewards.about.catA': 'a) Digital Rewards:',
      'rewards.about.catA.li1': 'Badges: eye-catching, collectible graphics for each achievement.',
      'rewards.about.catA.li2': 'Digital certificates: issued by the platform and, in partnership, by municipalities or environmental authorities.',
      'rewards.about.catA.li3': 'Recognition in community rankings: highlight the most active users in the app.',
      'rewards.about.catB': 'b) Material Rewards (in partnership with municipalities and companies):',
      'rewards.about.catB.li1': 'Saplings or seeds: to plant in the community.',
      'rewards.about.catB.li2': 'Environmental kits: reusable bags, shirts, gloves, eco bottles.',
      'rewards.about.catB.li3': 'Tickets or invitations: to workshops, fairs, and green activities.',
      'rewards.about.catC': 'c) Social/Community Rewards:',
      'rewards.about.catC.li1': 'Public mention: in local campaigns or on the municipality website.',
      'rewards.about.catC.li2': 'Community leadership role: in collaborative actions.',
      'rewards.about.catC.li3': 'Opportunity to propose environmental projects: that receive local support.',
      'rewards.about.h3.3': '3. Advancement mechanics',
      'rewards.about.h3.3.li1': 'Progressive and transparent: each action adds points visible in the app.',
      'rewards.about.h3.3.li2': 'Real gamification: unlocking badges, progress bar, weekly challenges, and rankings.',
      'rewards.about.h3.3.li3': 'Community verification: reports validated by other users or moderators to prevent abuse.',
      'rewards.about.h3.4': '4. Expected impact',
      'rewards.about.h3.4.li1': 'Motivate sustained action: users not only report once, but remain active thanks to visible progress.',
      'rewards.about.h3.4.li2': 'Generate tangible recognition: everyone sees that their contribution is valued by the platform and the community.',
      'rewards.about.h3.4.li3': 'Connect with authorities: the municipality becomes an ally, providing material rewards and validating official certificates.',

      // Level 1
      'rewards.l1.title': 'Eco-friendly',
      'rewards.l1.subtitle': 'First step towards environmental action.',
      'rewards.l1.req': 'Make your first report on the platform.',
      'rewards.l1.r1': '“Eco-friendly” badge',
      'rewards.l1.r2': 'Participation certificate',
      'rewards.l1.tip2': 'Downloadable digital certificate that validates your start in TERRAPOINT.',
      'rewards.l1.r3': 'Access to eco tips',
      'rewards.l1.cta1': 'Report now',

      // Level 2
      'rewards.l2.title': 'Environmental Contributor',
      'rewards.l2.subtitle': 'Join your community and participate actively.',
      'rewards.l2.req': 'Join a community and make 3 additional reports.',
      'rewards.l2.r1': '“Contributor” badge',
      'rewards.l2.r2': 'Participation in community events',
      'rewards.l2.tip2': 'Invitations to cleanups and local events organized by the community.',
      'rewards.l2.r3': 'Delivery of sapling/seed',
      'rewards.l2.cta1': 'Join community',

      // Level 3
      'rewards.l3.title': 'Green Guardian',
      'rewards.l3.subtitle': 'Your commitment already protects your environment.',
      'rewards.l3.req': 'Reach 10 verified reports and participate in at least one volunteer event.',
      'rewards.l3.r1': '“Green Guardian” badge',
      'rewards.l3.r2': 'Municipal certificate',
      'rewards.l3.tip2': 'Official certificate endorsed by the local municipality.',
      'rewards.l3.r3': 'Environmental kit',
      'rewards.l3.cta1': 'Join a campaign',

      // Level 4
      'rewards.l4.title': 'Environmental Hero',
      'rewards.l4.subtitle': 'Lead actions and maintain impact.',
      'rewards.l4.req': 'Lead a community action, 25 verified reports and 1 month of sustained activity.',
      'rewards.l4.r1': '“Environmental Hero” badge',
      'rewards.l4.r2': 'Official recognition',
      'rewards.l4.tip2': 'Public mention in events or local media.',
      'rewards.l4.r3': 'Additional saplings',
      'rewards.l4.r4': 'Invitation to design campaigns',
      'rewards.l4.tip4': 'Opportunity to collaborate in designing local environmental campaigns.',
      'rewards.l4.cta1': 'Lead action',

      // CTA final
      'rewards.cta.title': 'Your environmental impact starts today!',
      'rewards.cta.text': 'Every action, no matter how small, contributes to a greener future. Join TERRAPOINT and start earning rewards while protecting our planet.',
      'rewards.cta.button': 'Join now and report',

      // Foot text
      'rewards.foot': 'Rewards combine digital recognition (badges, certificates) with real incentives (saplings, kits, and mentions). Level up to receive increasing benefits and participate in actions with tangible impact.',

      // Footer (reuse from index)
      'footer.form.title': 'Contact Terrapoint',
      'nav.login': 'Sign in',
      'nav.signup': 'Sign up',
      'footer.form.name': 'Your name',
      'footer.form.email': 'Your email',
      'footer.form.message': 'Your message',
      'footer.form.send': 'Send',
      'footer.cta': 'Become an environmental ally...',
      'footer.credits': '2025 Terrapoint — Let’s save the planet with accurate data.'
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
        // If element requests attribute translation
        const attrList = el.getAttribute('data-i18n-attr');
        if (attrList) {
          // Can be a single attribute name or comma-separated list
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
