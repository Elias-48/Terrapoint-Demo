// ModeradorIdioma.js - Language switcher for moderador.html
(function(){
  const STORAGE_KEY = 'preferred-language-moderator';
  const SUPPORTED = ['es','en'];

  let __currentDict = null;
  const t = {
    es: {
      // Navbar
      'mod.nav.greeting': 'Hola, Moderador',
      'mod.nav.logout': 'Salir',
      'mod.nav.chat': 'Chat',

      // Sidebar chat
      'mod.sidebar.chats': 'Chats',
      'mod.sidebar.search': 'Buscar',
      'mod.sidebar.search.placeholder': 'Buscar por usuario o reportante...',
      'mod.sidebar.search.help': 'Escribe para filtrar. Se puede buscar por nombre del usuario o del reportante.',
      'mod.sidebar.header.name': 'Selecciona un chat',
      'mod.sidebar.header.info': '',
      'mod.sidebar.input': 'Escribe un mensaje...',
      'mod.sidebar.send': 'Enviar',
      'mod.sidebar.results': 'Resultados',
      'mod.sidebar.close': 'Cerrar',

      // Reports list
      'mod.reports.title': 'Reportes recibidos',
      'mod.reports.r1.title': 'Derrame de residuos',
      'mod.reports.r2.title': 'Quema de basura',
      'mod.reports.addr': 'Dirección: Av. Central 123, Zona Industrial',
      'mod.reports.desc': 'Descripción: Mancha de aceite cerca del río.',
      'mod.reports.by': 'Reportado por:',
      'mod.reports.accept': 'Aceptar',
      'mod.reports.reject': 'Rechazar',
      'mod.reports.chat': 'Chat del reporte',

      // Admin
      'mod.admin.title': 'Panel de administración',
      'mod.admin.tabs.reports': 'Reportes',      
      'mod.admin.tabs.news': 'Novedades',
      'mod.admin.tabs.comments': 'Comentarios',
      'mod.admin.tabs.resources': 'Recursos',
      'mod.admin.tabs.gam': 'Gamificación',
      'mod.admin.tabs.indices': 'Índices',
      'mod.admin.tabs.users': 'Usuarios',

      // Common
      'mod.common.image': 'Imagen',
      'mod.common.image.help': 'Formatos: JPG, JPEG, PNG, GIF, WEBP. Máx. 5 MB.',
      'mod.common.save': 'Guardar',
      'mod.common.reset': 'Limpiar',
      'mod.common.restore': 'Restablecer',
      'mod.common.edit': 'Editar',
      'mod.common.delete': 'Eliminar',

      // File controls
      'mod.file.select_button': 'Seleccionar archivo',
      'mod.file.no_file': 'Ningún archivo seleccionado',
      'mod.file.selected': 'Seleccionado: {name}',

      // Generic table
      'mod.accepted.title': 'Reportes aceptados',
      'mod.table.title': 'Título',
      'mod.table.address': 'Dirección',
      'mod.table.date': 'Fecha',
      'mod.table.status': 'Estado',
      'mod.table.actions': 'Acciones',

      // News
      'mod.news.title.label': 'Título',
      'mod.news.title.placeholder': 'Título de la novedad',
      'mod.news.content.label': 'Contenido',
      'mod.news.content.placeholder': 'Descripción',
      'mod.news.image.label': 'Imagen',
      'mod.news.image.placeholder': 'Imagen',
      'mod.table.image': 'Imagen',
      'mod.table.content': 'Contenido',
      'mod.news.published': 'Publicados en Novedades',

      // Users
      'mod.users.summary.total': 'Total usuarios',
      'mod.users.summary.common_level': 'Nivel más común',
      'mod.users.summary.avg_points': 'Puntos promedio',
      'mod.users.summary.active': 'Usuarios activos',
      'mod.users.search.label': 'Buscar',
      'mod.users.search.placeholder': 'Nombre, nivel o puntos',
      'mod.users.filter.level': 'Filtrar por nivel (demo)',
      'mod.users.export': 'Exportar (demo)',
      'mod.users.table.user': 'Usuario',
      'mod.users.table.level': 'Nivel',
      'mod.users.table.points': 'Puntos',
      'mod.users.empty': 'Sin usuarios cargados.',
      'mod.pagination.prev': 'Anterior',
      'mod.pagination.next': 'Siguiente',
      'mod.users.promote': 'Subir nivel',
      'mod.users.max_level': 'Ya está en el nivel máximo.',

      // Level labels
      'mod.level.1': 'Nivel 1 · Ecoamigable',
      'mod.level.2': 'Nivel 2 · Colaborador',
      'mod.level.3': 'Nivel 3 · Guardián Verde',
      'mod.level.4': 'Nivel 4 · Héroe Ambiental',

      // Comments
      'mod.comments.author.label': 'Autor',
      'mod.comments.author.placeholder': 'Nombre del autor',
      'mod.comments.text.label': 'Comentario',
      'mod.comments.text.placeholder': 'Escribe el comentario',
      'mod.comments.published': 'Publicados en Comentarios',
      'mod.comments.table.author': 'Autor',
      'mod.comments.table.text': 'Comentario',

      // Resources
      'mod.res.title.label': 'Título',
      'mod.res.title.placeholder': 'Título del recurso',
      'mod.res.desc.label': 'Descripción',
      'mod.res.desc.placeholder': 'Descripción',
      'mod.res.published': 'Publicados en Recursos',
      'mod.res.table.desc': 'Descripción',

      // Gamification
      'mod.gam.title.label': 'Título',
      'mod.gam.title.placeholder': 'Título de la tarjeta',
      'mod.gam.desc.label': 'Descripción',
      'mod.gam.desc.placeholder': 'Descripción',
      'mod.gam.published': 'Publicados en Gamificación',
      'mod.gam.table.desc': 'Descripción',

      // Indices
      'mod.idx.air.label': 'Calidad del aire (%)',
      'mod.idx.poll.label': 'Contaminación (%)',
      'mod.idx.green.label': 'Zonas verdes (%)',
      'mod.idx.temp.label': 'Temp. global (%)',
      'mod.idx.save': 'Guardar índices',
      'mod.idx.published': 'Índices publicados',
      'mod.idx.col.air': 'Calidad del aire',
      'mod.idx.col.poll': 'Contaminación',
      'mod.idx.col.green': 'Zonas verdes',
      'mod.idx.col.temp': 'Temp. global',
      'mod.idx.edit_form': 'Editar en formulario',

      // Modal
      'mod.modal.user.title': 'Detalle de usuario',
      'mod.modal.close': 'Cerrar',
      'mod.modal.close.btn': 'Cerrar',
      'mod.modal.user.name': 'Nombre:',
      'mod.modal.user.level': 'Nivel:',
      'mod.modal.user.points': 'Puntos:'
    },
    en: {
      // Navbar
      'mod.nav.greeting': 'Hello, Moderator',
      'mod.nav.logout': 'Log out',
      'mod.nav.chat': 'Chat',

      // Sidebar chat
      'mod.sidebar.chats': 'Chats',
      'mod.sidebar.search': 'Search',
      'mod.sidebar.search.placeholder': 'Search by user or reporter...',
      'mod.sidebar.search.help': 'Type to filter. You can search by user or reporter name.',
      'mod.sidebar.header.name': 'Select a chat',
      'mod.sidebar.header.info': '',
      'mod.sidebar.input': 'Type a message...',
      'mod.sidebar.send': 'Send',
      'mod.sidebar.results': 'Results',
      'mod.sidebar.close': 'Close',

      // Reports list
      'mod.reports.title': 'Received reports',
      'mod.reports.r1.title': 'Waste spill',
      'mod.reports.r2.title': 'Trash burning',
      'mod.reports.addr': 'Address: Av. Central 123, Industrial Zone',
      'mod.reports.desc': 'Description: Oil stain near the river.',
      'mod.reports.by': 'Reported by:',
      'mod.reports.accept': 'Accept',
      'mod.reports.reject': 'Reject',
      'mod.reports.chat': 'Report chat',

      // Admin
      'mod.admin.title': 'Administration panel',
      'mod.admin.tabs.reports': 'Reports',
      'mod.admin.tabs.news': 'News',
      'mod.admin.tabs.comments': 'Comments',
      'mod.admin.tabs.resources': 'Resources',
      'mod.admin.tabs.gam': 'Gamification',
      'mod.admin.tabs.indices': 'Indexes',
      'mod.admin.tabs.users': 'Users',

      // Common
      'mod.common.image': 'Image',
      'mod.common.image.help': 'Formats: JPG, JPEG, PNG, GIF, WEBP. Max 5 MB.',
      'mod.common.save': 'Save',
      'mod.common.reset': 'Clear',
      'mod.common.restore': 'Restore',
      'mod.common.edit': 'Edit',
      'mod.common.delete': 'Delete',

      // File controls
      'mod.file.select_button': 'Select file',
      'mod.file.no_file': 'No file selected',
      'mod.file.selected': 'Selected: {name}',

      // Generic table
      'mod.accepted.title': 'Accepted reports',
      'mod.table.title': 'Title',
      'mod.table.address': 'Address',
      'mod.table.date': 'Date',
      'mod.table.status': 'Status',
      'mod.table.actions': 'Actions',

      // News
      'mod.news.title.label': 'Title',
      'mod.news.title.placeholder': 'News title',
      'mod.news.content.label': 'Content',
      'mod.news.content.placeholder': 'Description',
      'mod.news.published': 'Published in News',
      'mod.news.empty': 'No news loaded.',
      'mod.table.image': 'Image',
      'mod.news.table.image': 'Image',   
      'mod.table.content': 'Content',

      

      // Users
      'mod.users.summary.total': 'Total users',
      'mod.users.summary.common_level': 'Most common level',
      'mod.users.summary.avg_points': 'Average points',
      'mod.users.summary.active': 'Active users',
      'mod.users.search.label': 'Search',
      'mod.users.search.placeholder': 'Name, level or points',
      'mod.users.filter.level': 'Filter by level (demo)',
      'mod.users.export': 'Export (demo)',
      'mod.users.table.user': 'User',
      'mod.users.table.level': 'Level',
      'mod.users.table.points': 'Points',
      'mod.users.empty': 'No users loaded.',
      'mod.pagination.prev': 'Previous',
      'mod.pagination.next': 'Next',
      'mod.users.promote': 'Promote level',
      'mod.users.max_level': 'Already at maximum level.',

      // Level labels
      'mod.level.1': 'Level 1 · Eco-friendly',
      'mod.level.2': 'Level 2 · Contributor',
      'mod.level.3': 'Level 3 · Green Guardian',
      'mod.level.4': 'Level 4 · Environmental Hero',

      // Comments
      'mod.comments.author.label': 'Author',
      'mod.comments.author.placeholder': 'Author name',
      'mod.comments.text.label': 'Comment',
      'mod.comments.text.placeholder': 'Write the comment',
      'mod.comments.published': 'Published in Comments',
      'mod.comments.table.author': 'Author',
      'mod.comments.table.text': 'Comment',
      'mod.comments.empty': 'No comments loaded.',
      'mod.comments.delete': 'Delete',
      'mod.comments.edit': 'Edit',

      // Resources
      'mod.res.title.label': 'Title',
      'mod.res.title.placeholder': 'Resource title',
      'mod.res.desc.label': 'Description',
      'mod.res.desc.placeholder': 'Description',
      'mod.res.published': 'Published in Resources',
      'mod.res.table.desc': 'Description',

      // Gamification
      'mod.gam.title.label': 'Title',
      'mod.gam.title.placeholder': 'Card title',
      'mod.gam.desc.label': 'Description',
      'mod.gam.desc.placeholder': 'Description',
      'mod.gam.published': 'Published in Gamification',
      'mod.gam.table.desc': 'Description',

      // Indices
      'mod.idx.air.label': 'Air quality (%)',
      'mod.idx.poll.label': 'Pollution (%)',
      'mod.idx.green.label': 'Green areas (%)',
      'mod.idx.temp.label': 'Global temp. (%)',
      'mod.idx.save': 'Save indexes',
      'mod.idx.published': 'Published indexes',
      'mod.idx.col.air': 'Air quality',
      'mod.idx.col.poll': 'Pollution',
      'mod.idx.col.green': 'Green areas',
      'mod.idx.col.temp': 'Global temp.',
      'mod.idx.edit_form': 'Edit in form',

      // Modal
      'mod.modal.user.title': 'User details',
      'mod.modal.close': 'Close',
      'mod.modal.close.btn': 'Close',
      'mod.modal.user.name': 'Name:',
      'mod.modal.user.level': 'Level:',
      'mod.modal.user.points': 'Points:'
    }
  };

  function applyTranslations(lang){
    const dict = t[lang] || t.en;
    __currentDict = dict;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const val = dict[key];
      if (typeof val === 'string') {
        const attrList = el.getAttribute('data-i18n-attr');
        if (attrList) {
          attrList.split(',').map(s => s.trim()).filter(Boolean).forEach(attrName => {
            try { el.setAttribute(attrName, val); } catch(_){}
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

    let lang = localStorage.getItem(STORAGE_KEY) || document.documentElement.lang || 'es';
    if (!SUPPORTED.includes(lang)) lang = 'en';

    const updateDropdownUI = (code) => {
      if (!ddToggle || !ddFlag || !ddLabel) return;
      const isEn = code === 'en';
      ddFlag.src = isEn ? '../img/BanderaEN.svg.png' : '../img/BanderaES.svg.png';
      ddFlag.alt = isEn ? 'EN' : 'ES';
      ddLabel.textContent = isEn ? 'EN' : 'ES';
    };

    // Expose helper globally
    window.ModeratorI18N = {
      apply: (code) => { applyTranslations(code || document.documentElement.lang); },
      getLang: () => document.documentElement.lang,
      setLang: (code) => {
        if (!SUPPORTED.includes(code)) return;
        localStorage.setItem(STORAGE_KEY, code);
        applyTranslations(code);
        updateDropdownUI(code);
      },
      get: (key, fallback='') => {
        try { return (__currentDict && __currentDict[key]) || fallback || key; } catch(_) { return fallback || key; }
      }
    };

    // Initial apply
    applyTranslations(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    updateDropdownUI(lang);
    try { window.dispatchEvent(new CustomEvent('moderator-i18n-ready', { detail: { lang } })); } catch(_) {}

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
          try { window.dispatchEvent(new CustomEvent('moderator-i18n-ready', { detail: { lang: code } })); } catch(_) {}
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
