function __moderadorInit(){
  // Simple store using localStorage
  const STORE_KEY = 'terrapoint_mod';
  const state = loadState();
  
  // Function to add a new report to the left of existing ones
  function addNewReport(reportData) {
    const reportsContainer = document.querySelector('.d-flex.flex-nowrap.overflow-auto');
    if (!reportsContainer) return;
    
    // Create a unique ID for the new report
    const reportId = 'r' + (document.querySelectorAll('[data-report-id]').length + 1);
    
    // Create the report HTML
    const reportHtml = `
      <div style="width: 250px; flex-shrink: 0;">
        <div class="card h-100" data-report-id="${reportId}" style="font-size: 0.7rem;">
          <img src="${reportData.imageUrl || '../img/default-report.png'}" class="card-img-top" alt="Evidencia" style="height: 140px; object-fit: cover; border-bottom: 1px solid rgba(0,0,0,.125);">
          <div class="card-body p-1">
            <h6 class="card-title mb-2" style="font-size: 0.9rem; min-height: 2em; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${reportData.title || 'Nuevo Reporte'}</h6>
            <p class="small text-muted mb-2 mt-2" style="font-size: 0.8rem; line-height: 1.3; min-height: 2em; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${reportData.address || 'Sin dirección'}</p>
            <p class="small text-muted mb-1" style="font-size: 0.6rem;"><small class="text-muted">Por: <span>${reportData.reporter || 'Anónimo'}</span></small></p>
            <div class="d-flex flex-wrap g-0" style="gap: 4px; margin-top: 0.5rem;">
              <a href="#" class="btn btn-gradient btn-sm flex-grow-1" style="font-size: 0.8rem; padding: 0.25rem 0.4rem; min-width: 0;" data-action="accept" data-i18n="mod.reports.accept">Aceptar</a>
              <a href="#" class="btn btn-orange btn-sm flex-grow-1" style="font-size: 0.8rem; padding: 0.25rem 0.4rem; min-width: 0;" data-action="reject" data-i18n="mod.reports.reject">Rechazar</a>
              <button type="button" class="btn btn-outline-secondary btn-sm flex-grow-1" style="font-size: 0.8rem; padding: 0.25rem 0.4rem; min-width: 0;" data-action="chat" data-report-id="${reportId}" data-chat-name="${reportData.title || 'Nuevo Reporte'}" data-chat-info="${reportData.address || 'Sin dirección'}" data-reporter="${reportData.reporter || 'Anónimo'}">
                <span data-i18n="mod.reports.chat" style="font-size: 0.6rem;">Chat del reporte</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = reportHtml.trim();
    const newReport = temp.firstChild;
    
    // Add event listeners to the buttons
    const setupReportHandlers = (element) => {
      element.querySelector('[data-action="accept"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        // Handle accept action
        console.log('Aceptar reporte:', reportId);
        element.remove();
      });
      
      element.querySelector('[data-action="reject"]')?.addEventListener('click', (e) => {
        e.preventDefault();
        // Handle reject action
        console.log('Rechazar reporte:', reportId);
        element.remove();
      });
      
      // Add chat handler if needed
      const chatBtn = element.querySelector('[data-action="chat"]');
      if (chatBtn) {
        chatBtn.addEventListener('click', (e) => {
          e.preventDefault();
          // Handle chat action
          console.log('Abrir chat para reporte:', reportId);
        });
      }
  // Re-aplicar i18n tras render
  if (window.ModeratorI18N) window.ModeratorI18N.apply();
    };
    
    // Insert the new report at the beginning of the container
    if (reportsContainer.firstChild) {
      reportsContainer.insertBefore(newReport, reportsContainer.firstChild);
    } else {
      reportsContainer.appendChild(newReport);
    }
    
    // Set up event handlers for the new report
    setupReportHandlers(newReport);
    
    return reportId;
  }
  
  // Expose the function to the global scope for testing
  window.addNewReport = addNewReport;
  
  // Initialize reports container and setup event delegation
  document.addEventListener('DOMContentLoaded', () => {
    // Setup event delegation for existing report buttons
    document.querySelector('.d-flex.flex-nowrap.overflow-auto')?.addEventListener('click', (e) => {
      const target = e.target.closest('[data-action]');
      if (!target) return;
      
      const action = target.getAttribute('data-action');
      const reportId = target.closest('[data-report-id]')?.getAttribute('data-report-id');
      
      if (!reportId) return;
      
      if (action === 'accept') {
        e.preventDefault();
        console.log('Aceptar reporte:', reportId);
        target.closest('[style*="width: 250px"]')?.remove();
      } else if (action === 'reject') {
        e.preventDefault();
        console.log('Rechazar reporte:', reportId);
        target.closest('[style*="width: 250px"]')?.remove();
      } else if (action === 'chat') {
        e.preventDefault();
        console.log('Abrir chat para reporte:', reportId);
        // Add chat handling logic here
      }
    });
  });

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return { news: [], comments: [], resources: [], gam: [], chats: [], users: [], indices: { air: 75, poll: 40, green: 60, temp: 55 } };
      const parsed = JSON.parse(raw);
      // defaults
      parsed.news ||= [];
      parsed.comments ||= [];
      parsed.resources ||= [];
      parsed.gam ||= [];
      parsed.chats ||= [];
      parsed.users ||= [];
      parsed.indices ||= { air: 75, poll: 40, green: 60, temp: 55 };
      return parsed;
    } catch (e) {
      console.error('Error loading state', e);
      return { news: [], comments: [], resources: [], gam: [], chats: [], users: [], indices: { air: 75, poll: 40, green: 60, temp: 55 } };
    }
  }
  function saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  // UTIL: create element helper
  function el(tag, className, html) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  // UTIL: show inline alerts
  function showAlert(id, msg) {
    const box = document.getElementById(id);
    if (!box) return;
    if (!msg) {
      box.classList.add('d-none');
      box.textContent = '';
    } else {
      box.classList.remove('d-none');
      box.textContent = msg;
    }
  }
  // UTIL: read image file to dataURL (max 5MB)
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) { resolve(null); return; }
      const maxBytes = 5 * 1024 * 1024;
      if (file.size > maxBytes) {
        reject(new Error('La imagen excede 5 MB'));
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('No se pudo leer la imagen'));
      reader.readAsDataURL(file);
    });
  }

  // ------------------ NOVEDADES ------------------
  const formNews = document.getElementById('formNews');
  const newsList = document.getElementById('newsList');
  const newsReset = document.getElementById('newsReset');
  const newsTableBody = document.getElementById('newsTableBody');
  function renderNews() {
    if (!newsList) return;
    newsList.innerHTML = '';
    if (newsTableBody) newsTableBody.innerHTML = '';
    state.news.forEach((n, idx) => {
      const col = el('div', 'col-md-6 col-lg-4');
      const card = el('div', 'card h-100');
      if (n.img) {
        const img = el('img', 'card-img-top');
        img.src = n.img; img.alt = n.title || 'Novedad';
        card.appendChild(img);
      }
      const body = el('div', 'card-body');
      body.appendChild(el('h5', 'card-title', n.title || 'Sin título'));
      body.appendChild(el('p', 'card-text', n.text || ''));
      const actions = el('div', 'd-flex gap-2');
      const btnEdit = el('button', 'btn btn-sm btn-gradient', '');
      btnEdit.setAttribute('data-i18n','mod.common.edit'); btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => {
        document.getElementById('newsTitle').value = n.title || '';
        document.getElementById('newsText').value = n.text || '';
        const f = document.getElementById('newsImgFile'); if (f) f.value = '';
        formNews.dataset.editIndex = idx;
      };
      const btnDel = el('button', 'btn btn-sm btn-outline-danger', '');
      btnDel.setAttribute('data-i18n','mod.common.delete'); btnDel.textContent = 'Eliminar';
      btnDel.onclick = () => {
        if (!confirm('¿Eliminar esta novedad?')) return;
        state.news.splice(idx,1); saveState(); renderNews();
      };
      actions.appendChild(btnEdit); actions.appendChild(btnDel);
      body.appendChild(actions);
      card.appendChild(body); col.appendChild(card); newsList.appendChild(col);

      // table row
      if (newsTableBody) {
        const tr = el('tr');
        tr.appendChild(el('td', '', n.title || ''));
        const tdImg = el('td');
        if (n.img) {
          const img = el('img');
          img.src = n.img; img.alt = n.title || 'img';
          img.style.maxWidth = '64px'; img.style.height = 'auto';
          tdImg.appendChild(img);
        } else { tdImg.textContent = ''; }
        tr.appendChild(tdImg);
        tr.appendChild(el('td', '', n.text || ''));
        const tdAct = el('td');
        const tEdit = el('button', 'btn btn-sm btn-gradient me-1', ''); tEdit.setAttribute('data-i18n','mod.common.edit'); tEdit.textContent='Editar';
        tEdit.onclick = btnEdit.onclick;
        const tDel = el('button', 'btn btn-sm btn-outline-danger', ''); tDel.setAttribute('data-i18n','mod.common.delete'); tDel.textContent='Eliminar';
        tDel.onclick = btnDel.onclick;
        tdAct.appendChild(tEdit); tdAct.appendChild(tDel);
        tr.appendChild(tdAct);
        newsTableBody.appendChild(tr);
      }
    });
  }
  if (formNews) {
    formNews.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('newsTitle').value.trim();
      const text = document.getElementById('newsText').value.trim();
      const file = document.getElementById('newsImgFile').files[0];
      if (!title || !text) { showAlert('newsAlert', 'Completa título y contenido.'); return; }
      const editIdx = formNews.dataset.editIndex;
      try {
        let dataUrl = null;
        if (file) dataUrl = await fileToDataUrl(file);
        if (editIdx !== undefined) {
          const current = state.news[Number(editIdx)] || {};
          state.news[Number(editIdx)] = { title, img: dataUrl || current.img || '', text };
          delete formNews.dataset.editIndex;
        } else {
          if (!dataUrl) { showAlert('newsAlert', 'Selecciona una imagen para la novedad.'); return; }
          state.news.unshift({ title, img: dataUrl, text });
        }
        saveState(); renderNews(); formNews.reset(); showAlert('newsAlert');
        const inputFile = document.getElementById('newsImgFile'); if (inputFile) inputFile.value = '';
      } catch(err) {
        showAlert('newsAlert', err.message || 'Error con la imagen.');
      }
    });
    newsReset && newsReset.addEventListener('click', () => { formNews.reset(); delete formNews.dataset.editIndex; showAlert('newsAlert'); const f=document.getElementById('newsImgFile'); if (f) f.value=''; });
  }

  // ------------------ COMENTARIOS ------------------
  const formComments = document.getElementById('formComments');
  const commentsList = document.getElementById('commentsList');
  const cReset = document.getElementById('cReset');
  const commentsTableBody = document.getElementById('commentsTableBody');
  function renderComments() {
    if (!commentsList) return;
    commentsList.innerHTML = '';
    if (commentsTableBody) commentsTableBody.innerHTML = '';
    state.comments.forEach((c, idx) => {
      const col = el('div', 'col-md-6 col-lg-4');
      const card = el('div', 'card h-100');
      const body = el('div', 'card-body');
      body.appendChild(el('h6', 'card-subtitle mb-2 text-muted', c.author || 'Anónimo'));
      body.appendChild(el('p', 'card-text', c.text || ''));
      const actions = el('div', 'd-flex gap-2');
      const btnEdit = el('button', 'btn btn-sm btn-gradient', '');
      btnEdit.setAttribute('data-i18n', 'mod.common.edit');
      btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => {
        document.getElementById('cAuthor').value = c.author || '';
        document.getElementById('cText').value = c.text || '';
        formComments.dataset.editIndex = idx;
      };
      const btnDel = el('button', 'btn btn-sm btn-outline-danger', '');
      btnDel.setAttribute('data-i18n', 'mod.common.delete');
      btnDel.textContent = 'Eliminar';
      btnDel.onclick = () => {
        if (!confirm('¿Eliminar este comentario?')) return;
        state.comments.splice(idx,1); saveState(); renderComments();
      };
      actions.appendChild(btnEdit); actions.appendChild(btnDel);
      body.appendChild(actions);
      card.appendChild(body); col.appendChild(card); commentsList.appendChild(col);

      // table row
      if (commentsTableBody) {
        const tr = el('tr');
        tr.appendChild(el('td', '', c.author || ''));
        tr.appendChild(el('td', '', c.text || ''));
        const tdAct = el('td');
        const tEdit = el('button', 'btn btn-sm btn-gradient me-1', '');
        tEdit.setAttribute('data-i18n', 'mod.common.edit');
        tEdit.textContent = 'Editar';
        tEdit.onclick = btnEdit.onclick;
        const tDel = el('button', 'btn btn-sm btn-outline-danger', '');
        tDel.setAttribute('data-i18n', 'mod.common.delete');
        tDel.textContent = 'Eliminar';
        tDel.onclick = btnDel.onclick;
        tdAct.appendChild(tEdit); tdAct.appendChild(tDel);
        tr.appendChild(tdAct);
        commentsTableBody.appendChild(tr);
      }
    });
    if (window.ModeratorI18N) window.ModeratorI18N.apply();
  }
  if (formComments) {
    formComments.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('cAuthor').value.trim();
      const text = document.getElementById('cText').value.trim();
      if (!author || !text) { showAlert('commentsAlert', 'Completa autor y comentario.'); return; }
      const editIdx = formComments.dataset.editIndex;
      if (editIdx !== undefined) {
        state.comments[Number(editIdx)] = { author, text };
        delete formComments.dataset.editIndex;
      } else {
        state.comments.unshift({ author, text });
      }
      saveState(); renderComments(); formComments.reset(); showAlert('commentsAlert');
    });
    cReset && cReset.addEventListener('click', () => { formComments.reset(); delete formComments.dataset.editIndex; showAlert('commentsAlert'); });
  }

  // ------------------ RECURSOS ------------------
  const formResources = document.getElementById('formResources');
  const resourcesList = document.getElementById('resourcesList');
  const rReset = document.getElementById('rReset');
  const resourcesTableBody = document.getElementById('resourcesTableBody');
  function renderResources() {
    if (!resourcesList) return;
    resourcesList.innerHTML = '';
    if (resourcesTableBody) resourcesTableBody.innerHTML = '';
    state.resources.forEach((r, idx) => {
      const col = el('div', 'col-md-6 col-lg-4');
      const card = el('div', 'card h-100');
      if (r.img) {
        const img = el('img', 'card-img-top');
        img.src = r.img; img.alt = r.title || 'Recurso';
        card.appendChild(img);
      }
      const body = el('div', 'card-body');
      body.appendChild(el('h5', 'card-title', r.title || 'Sin título'));
      body.appendChild(el('p', 'card-text', r.text || ''));
      const actions = el('div', 'd-flex gap-2');
      const btnEdit = el('button', 'btn btn-sm btn-gradient', '');
      btnEdit.setAttribute('data-i18n', 'mod.common.edit');
      btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => {
        document.getElementById('rTitle').value = r.title || '';
        document.getElementById('rText').value = r.text || '';
        const f = document.getElementById('rImgFile'); if (f) f.value = '';
        formResources.dataset.editIndex = idx;
      };
      const btnDel = el('button', 'btn btn-sm btn-outline-danger', '');
      btnDel.setAttribute('data-i18n', 'mod.common.delete');
      btnDel.textContent = 'Eliminar';
      btnDel.onclick = () => {
        if (!confirm('¿Eliminar este recurso?')) return;
        state.resources.splice(idx,1); saveState(); renderResources();
      };
      actions.appendChild(btnEdit); actions.appendChild(btnDel);
      body.appendChild(actions);
      card.appendChild(body); col.appendChild(card); resourcesList.appendChild(col);

      // table row
      if (resourcesTableBody) {
        const tr = el('tr');
        tr.appendChild(el('td', '', r.title || ''));
        const tdImg = el('td');
        if (r.img) {
          const img = el('img');
          img.src = r.img; img.alt = r.title || 'img';
          img.style.maxWidth = '64px'; img.style.height = 'auto';
          tdImg.appendChild(img);
        }
        tr.appendChild(tdImg);
        tr.appendChild(el('td', '', r.text || ''));
        const tdAct = el('td');
        const tEdit = el('button', 'btn btn-sm btn-gradient me-1', '');
        tEdit.setAttribute('data-i18n', 'mod.common.edit');
        tEdit.textContent = 'Editar';
        tEdit.onclick = btnEdit.onclick;
        const tDel = el('button', 'btn btn-sm btn-outline-danger', '');
        tDel.setAttribute('data-i18n', 'mod.common.delete');
        tDel.textContent = 'Eliminar';
        tDel.onclick = btnDel.onclick;
        tdAct.appendChild(tEdit); tdAct.appendChild(tDel);
        tr.appendChild(tdAct);
        resourcesTableBody.appendChild(tr);
      }
    });
    if (window.ModeratorI18N) window.ModeratorI18N.apply();
  }
  if (formResources) {
    formResources.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('rTitle').value.trim();
      const text = document.getElementById('rText').value.trim();
      const file = document.getElementById('rImgFile').files[0];
      if (!title || !text) { showAlert('resourcesAlert', 'Completa título y descripción.'); return; }
      const editIdx = formResources.dataset.editIndex;
      try {
        let dataUrl = null;
        if (file) dataUrl = await fileToDataUrl(file);
        if (editIdx !== undefined) {
          const current = state.resources[Number(editIdx)] || {};
          state.resources[Number(editIdx)] = { title, img: dataUrl || current.img || '', text };
          delete formResources.dataset.editIndex;
        } else {
          if (!dataUrl) { showAlert('resourcesAlert', 'Selecciona una imagen para el recurso.'); return; }
          state.resources.unshift({ title, img: dataUrl, text });
        }
        saveState(); renderResources(); formResources.reset(); showAlert('resourcesAlert');
        const inputFile = document.getElementById('rImgFile'); if (inputFile) inputFile.value = '';
      } catch(err) { showAlert('resourcesAlert', err.message || 'Error con la imagen.'); }
    });
    rReset && rReset.addEventListener('click', () => { formResources.reset(); delete formResources.dataset.editIndex; showAlert('resourcesAlert'); const f=document.getElementById('rImgFile'); if (f) f.value=''; });
  }

  // ------------------ GAMIFICACIÓN ------------------
  const formGam = document.getElementById('formGam');
  const gamList = document.getElementById('gamList');
  const gReset = document.getElementById('gReset');
  const gamTableBody = document.getElementById('gamTableBody');
  function renderGam() {
    if (!gamList) return;
    gamList.innerHTML = '';
    if (gamTableBody) gamTableBody.innerHTML = '';
    state.gam.forEach((g, idx) => {
      const col = el('div', 'col-md-6 col-lg-4');
      const card = el('div', 'card h-100');
      if (g.img) {
        const img = el('img', 'card-img-top');
        img.src = g.img; img.alt = g.title || 'Gamificación';
        card.appendChild(img);
      }
      const body = el('div', 'card-body');
      body.appendChild(el('h5', 'card-title', g.title || 'Sin título'));
      body.appendChild(el('p', 'card-text', g.text || ''));
      const actions = el('div', 'd-flex gap-2');
      const btnEdit = el('button', 'btn btn-sm btn-gradient', '');
      btnEdit.setAttribute('data-i18n', 'mod.common.edit');
      btnEdit.textContent = 'Editar';
      btnEdit.onclick = () => {
        document.getElementById('gTitle').value = g.title || '';
        document.getElementById('gText').value = g.text || '';
        const f = document.getElementById('gImgFile'); if (f) f.value = '';
        formGam.dataset.editIndex = idx;
      };
      const btnDel = el('button', 'btn btn-sm btn-outline-danger', '');
      btnDel.setAttribute('data-i18n', 'mod.common.delete');
      btnDel.textContent = 'Eliminar';
      btnDel.onclick = () => {
        if (!confirm('¿Eliminar esta tarjeta?')) return;
        state.gam.splice(idx,1); saveState(); renderGam();
      };
      actions.appendChild(btnEdit); actions.appendChild(btnDel);
      body.appendChild(actions);
      card.appendChild(body); col.appendChild(card); gamList.appendChild(col);

      // table row
      if (gamTableBody) {
        const tr = el('tr');
        tr.appendChild(el('td', '', g.title || ''));
        const tdImg = el('td');
        if (g.img) {
          const img = el('img');
          img.src = g.img; img.alt = g.title || 'img';
          img.style.maxWidth = '64px'; img.style.height = 'auto';
          tdImg.appendChild(img);
        }
        tr.appendChild(tdImg);
        tr.appendChild(el('td', '', g.text || ''));
        const tdAct = el('td');
        const tEdit = el('button', 'btn btn-sm btn-gradient me-1', '');
        tEdit.setAttribute('data-i18n', 'mod.common.edit');
        tEdit.textContent = 'Editar';
        tEdit.onclick = btnEdit.onclick;
        const tDel = el('button', 'btn btn-sm btn-outline-danger', '');
        tDel.setAttribute('data-i18n', 'mod.common.delete');
        tDel.textContent = 'Eliminar';
        tDel.onclick = btnDel.onclick;
        tdAct.appendChild(tEdit); tdAct.appendChild(tDel);
        tr.appendChild(tdAct);
        gamTableBody.appendChild(tr);
      }
    });
    if (window.ModeratorI18N) window.ModeratorI18N.apply();
  }
  if (formGam) {
    formGam.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('gTitle').value.trim();
      const text = document.getElementById('gText').value.trim();
      const file = document.getElementById('gImgFile').files[0];
      if (!title || !text) { showAlert('gamAlert', 'Completa título y descripción.'); return; }
      const editIdx = formGam.dataset.editIndex;
      try {
        let dataUrl = null;
        if (file) dataUrl = await fileToDataUrl(file);
        if (editIdx !== undefined) {
          const current = state.gam[Number(editIdx)] || {};
          state.gam[Number(editIdx)] = { title, img: dataUrl || current.img || '', text };
          delete formGam.dataset.editIndex;
        } else {
          if (!dataUrl) { showAlert('gamAlert', 'Selecciona una imagen para la tarjeta.'); return; }
          state.gam.unshift({ title, img: dataUrl, text });
        }
        saveState(); renderGam(); formGam.reset(); showAlert('gamAlert');
        const inputFile = document.getElementById('gImgFile'); if (inputFile) inputFile.value = '';
      } catch(err) { showAlert('gamAlert', err.message || 'Error con la imagen.'); }
    });
    gReset && gReset.addEventListener('click', () => { formGam.reset(); delete formGam.dataset.editIndex; showAlert('gamAlert'); const f=document.getElementById('gImgFile'); if (f) f.value=''; });
  }

  // ------------------ ÍNDICES ------------------
  const formIdx = document.getElementById('formIdx');
  const idxReset = document.getElementById('idxReset');
  const indicesTableBody = document.getElementById('indicesTableBody');
  function loadIndicesToForm() {
    if (!formIdx) return;
    document.getElementById('idxAir').value = state.indices.air;
    document.getElementById('idxPoll').value = state.indices.poll;
    document.getElementById('idxGreen').value = state.indices.green;
    document.getElementById('idxTemp').value = state.indices.temp;
  }
  function renderIndicesTable() {
    if (!indicesTableBody) return;
    indicesTableBody.innerHTML = '';
    const tr = el('tr');
    tr.appendChild(el('td', '', `${state.indices.air}%`));
    tr.appendChild(el('td', '', `${state.indices.poll}%`));
    tr.appendChild(el('td', '', `${state.indices.green}%`));
    tr.appendChild(el('td', '', `${state.indices.temp}%`));
    const tdAct = el('td');
    const btnEdit = el('button', 'btn btn-sm btn-gradient me-2', ''); btnEdit.setAttribute('data-i18n','mod.idx.edit_form'); btnEdit.textContent='Editar en formulario';
    btnEdit.onclick = () => { loadIndicesToForm(); document.getElementById('tab-indices')?.click(); };
    const btnDefault = el('button', 'btn btn-sm btn-outline-secondary', ''); btnDefault.setAttribute('data-i18n','mod.common.restore'); btnDefault.textContent='Restablecer';
    btnDefault.onclick = () => { state.indices = { air:75, poll:40, green:60, temp:55 }; saveState(); loadIndicesToForm(); renderIndicesTable(); };
    tdAct.appendChild(btnEdit); tdAct.appendChild(btnDefault);
    tr.appendChild(tdAct);
    indicesTableBody.appendChild(tr);
  }
  if (formIdx) {
    formIdx.addEventListener('submit', (e) => {
      e.preventDefault();
      const air = Number(document.getElementById('idxAir').value);
      const poll = Number(document.getElementById('idxPoll').value);
      const green = Number(document.getElementById('idxGreen').value);
      const temp = Number(document.getElementById('idxTemp').value);
      state.indices = { air, poll, green, temp };
      saveState();
      renderIndicesTable();
      alert('Índices guardados');
    });
    idxReset && idxReset.addEventListener('click', () => { state.indices = { air:75, poll:40, green:60, temp:55 }; saveState(); loadIndicesToForm(); renderIndicesTable(); });
  }

  // ------------------ USUARIOS (niveles) ------------------
  const usersTableBody = document.getElementById('usersTableBody');
  const usersEmpty = document.getElementById('usersEmpty');
  const usersSearch = document.getElementById('usersSearch');

  function getLevelLabel(level){
    const i18n = window.ModeratorI18N;
    const key = `mod.level.${level}`;
    if (i18n && typeof i18n.get === 'function') {
      return i18n.get(key, `Nivel ${level}`);
    }
    return `Nivel ${level}`;
  }

  function seedUsersIfEmpty() {
    if (!state.users || state.users.length === 0) {
      state.users = [
        { id: 'u1', name: 'Elías Rivera', level: 2, points: 230 },
        { id: 'u2', name: 'María López', level: 3, points: 560 }
      ];
      saveState();
    }
  }

  function levelBadge(level) {
    const label = getLevelLabel(level);
    let cls = 'bg-secondary';
    if (level === 1) cls = 'bg-success';
    else if (level === 2) cls = 'bg-primary';
    else if (level === 3) cls = 'bg-success';
    else if (level === 4) cls = 'bg-info';
    return `<span class="badge ${cls}">${label}</span>`;
  }

  function renderUsers(filter = '') {
    if (!usersTableBody) return;
    const q = (filter || '').toLowerCase();
    const items = state.users.filter(u => {
      const byName = (u.name || '').toLowerCase().includes(q);
      const byLevel = getLevelLabel(u.level).toLowerCase().includes(q);
      const byPoints = String(u.points).includes(q);
      return !q || byName || byLevel || byPoints;
    });
    usersTableBody.innerHTML = '';
    if (items.length === 0) {
      usersEmpty?.classList.remove('d-none');
      return;
    }
    usersEmpty?.classList.add('d-none');
    items.forEach(u => {
      const tr = el('tr');
      tr.innerHTML = `
        <td>${u.name}</td>
        <td class="text-center">${levelBadge(u.level)}</td>
        <td class="text-end">
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-gradient" data-i18n="mod.users.promote" data-action="promote" data-id="${u.id}">Subir nivel</button>
          </div>
        </td>`;
      usersTableBody.appendChild(tr);
    });
    if (window.ModeratorI18N) window.ModeratorI18N.apply();
  }

  // Seed y render inicial de usuarios si existe el tab
  if (usersTableBody) {
    seedUsersIfEmpty();
    renderUsers('');
  }

  // Búsqueda
  usersSearch?.addEventListener('input', () => {
    renderUsers(usersSearch.value.trim());
  });

  // Re-render Users table when language is applied/switched
  try {
    window.addEventListener('moderator-i18n-ready', function(){
      if (usersTableBody) renderUsers(usersSearch?.value.trim() || '');
    });
  } catch(_) {}

  // Re-render on tab activation to ensure correct language in badges
  (function(){
    const tabUsersBtn = document.getElementById('tab-usuarios');
    if (!tabUsersBtn) return;
    tabUsersBtn.addEventListener('shown.bs.tab', function(){
      renderUsers(usersSearch?.value.trim() || '');
    });
  })();

  // Acciones básicas (demo): promover nivel
  document.addEventListener('click', (ev) => {
    const t = ev.target;
    if (!t?.closest) return;
    const btn = t.closest('[data-action][data-id]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    const u = state.users.find(x => x.id === id);
    if (!u) return;
    if (action === 'promote') {
      if (u.level < 4) {
        u.level += 1;
        u.points += 50; // bonus demostrativo
        saveState();
        renderUsers(usersSearch?.value.trim() || '');
      } else {
        const i18n = window.ModeratorI18N;
        const msg = (i18n && typeof i18n.get === 'function') ? i18n.get('mod.users.max_level', 'Ya está en el nivel máximo.') : 'Ya está en el nivel máximo.';
        alert(msg);
      }
    }
  });

  // Initial renders
  renderNews();
  renderComments();
  renderResources();
  renderGam();
  loadIndicesToForm();
  renderIndicesTable();

  // Estado inicial del chat: sin selección, mostrar placeholder en conversación
  showChatMode();
  renderEmptyChatPlaceholder();

  // Layout: chat desde arriba: ocupar toda la altura del viewport
  function adjustChatSidebar() {
    const sidebar = document.getElementById('chatSidebar');
    if (!sidebar) return;
    sidebar.style.paddingTop = '0px';
    sidebar.style.top = '0px';
    sidebar.style.height = '100vh';
  }
  adjustChatSidebar();
  window.addEventListener('resize', adjustChatSidebar);
  window.addEventListener('scroll', adjustChatSidebar, { passive: true });
  // Reaccionar también a cambios de tamaño de la navbar (por i18n o dropdown)
  (function(){
    const navbar = document.querySelector('nav.navbar');
    if (navbar && typeof ResizeObserver !== 'undefined') {
      try {
        const ro = new ResizeObserver(() => adjustChatSidebar());
        ro.observe(navbar);
      } catch(_) {}
    }
    // Fallback: ajustar después de cambios de idioma que puedan cambiar alturas
    document.addEventListener('DOMContentLoaded', adjustChatSidebar);
  })();

  // Drawer móvil: controles de apertura/cierre
  const chatSidebarEl = document.getElementById('chatSidebar');
  const chatOverlayEl = document.getElementById('chatOverlay');
  const openChatBtn = document.getElementById('openChatBtn');
  function isMobile() { return window.matchMedia('(max-width: 991.98px)').matches; }
  function openChatDrawer() {
    if (!chatSidebarEl) return;
    if (isMobile()) {
      chatSidebarEl.classList.add('open');
      chatOverlayEl?.classList.add('visible');
      document.body.classList.add('no-scroll');
    }
  }
  function closeChatDrawer() {
    if (!chatSidebarEl) return;
    if (isMobile()) {
      chatSidebarEl.classList.remove('open');
      chatOverlayEl?.classList.remove('visible');
      document.body.classList.remove('no-scroll');
    }
  }
  openChatBtn?.addEventListener('click', openChatDrawer);
  chatOverlayEl?.addEventListener('click', closeChatDrawer);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChatDrawer(); });

  // Al cambiar a escritorio, asegurarse de limpiar estados del drawer
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      chatSidebarEl?.classList.remove('open');
      chatOverlayEl?.classList.remove('visible');
      document.body.classList.remove('no-scroll');
    }
  });

  // ------------------ CHAT (multi-usuario) ------------------
  const chatListEl = document.getElementById('chatList');
  const chatMessagesEl = document.getElementById('chatMessages');
  const chatHeaderName = document.getElementById('chatHeaderName');
  const chatHeaderInfo = document.getElementById('chatHeaderInfo');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatSearch = document.getElementById('chatSearch');
  const chatConvWrap = document.getElementById('chatConvWrap');
  const chatListWrap = document.getElementById('chatListWrap');
  const chatSearchWrap = document.getElementById('chatSearchWrap');
  let activeChatId = null;

  function renderEmptyChatPlaceholder(){
    if (!chatMessagesEl) return;
    chatMessagesEl.innerHTML = `
      <div class="chat-placeholder w-100 h-100 d-flex align-items-center justify-content-center">
        <div class="text-center text-muted">
          <div class="display-6" data-i18n="mod.sidebar.header.name">Selecciona un chat</div>
        </div>
      </div>`;
  }

  function ensureChatStructure(c) {
    // retro-compatibilidad por si faltan campos nuevos
    c.messages ||= [];
    return c;
  }

  // Helpers to toggle between conversation and list modes
  function showChatMode() {
    if (chatConvWrap) chatConvWrap.style.display = 'flex';
    if (chatSearchWrap) chatSearchWrap.style.display = 'none';
    if (chatListWrap) chatListWrap.style.display = 'none';
    if (chatListEl) chatListEl.style.display = 'none';
    if (chatSearch) chatSearch.value = '';
    // Oculta el botón cerrar
    const chatCloseListBtn = document.getElementById('chatCloseListBtn');
    if (chatCloseListBtn) chatCloseListBtn.style.display = 'none';
    // Chat ocupa todo el espacio
    if (chatSidebarEl) chatSidebarEl.style.flexDirection = 'column';
    if (chatConvWrap) chatConvWrap.style.flex = '1 1 auto';
  }
  function showListMode() {
    if (chatConvWrap) chatConvWrap.style.display = 'none';
    if (chatSearchWrap) chatSearchWrap.style.display = 'block';
    if (chatListWrap) {
      chatListWrap.style.display = 'block';
      chatListWrap.style.flex = '1 1 auto';
      chatListWrap.style.overflow = 'auto';
    }
    if (chatListEl) chatListEl.style.display = 'block';
    // Muestra el botón cerrar
    const chatCloseListBtn = document.getElementById('chatCloseListBtn');
    if (chatCloseListBtn) chatCloseListBtn.style.display = '';
  }

  function seedChatsIfEmpty() {
    if (!state.chats || state.chats.length === 0) {
      state.chats = [
        {
          id: 'u1',
          name: 'Elías Rivera',
          lastSeen: 'hoy 11:10',
          messages: [
            { from: 'user', text: 'Hola, envié un reporte de humo en mi zona.', time: '11:10' },
          ],
        },
        {
          id: 'u2',
          name: 'María López',
          lastSeen: 'hoy 09:45',
          messages: [
            { from: 'user', text: '¿Revisaron mi reporte de agua?', time: '09:45' },
            { from: 'mod', text: 'Estamos verificando, gracias por avisar.', time: '09:50' },
          ],
        },
      ];
      saveState();
    }
  }

  function renderChatList(filter = '') {
    if (!chatListEl) return;
    const qRaw = (filter || '');
    const q = qRaw.toLowerCase();
    chatListEl.innerHTML = '';
    // Mostrar lista solo cuando hay texto en búsqueda
    if (!q && qRaw !== '*') {
      chatListEl.style.display = 'none';
      return;
    }
    const items = (qRaw === '*')
      ? state.chats.slice()
      : state.chats.filter(c => {
          const name = (c.name || '').toLowerCase();
          const reporter = (c.reporter || '').toLowerCase();
          return name.includes(q) || reporter.includes(q);
        });
    if (items.length === 0) {
      const empty = el('div', 'list-group-item text-muted small', 'Sin resultados');
      chatListEl.appendChild(empty);
    } else {
      items.forEach(c => {
        const a = el('button', 'list-group-item list-group-item-action d-flex justify-content-between align-items-center');
        a.type = 'button';
        a.innerHTML = `
          <div>
            <div class="fw-semibold">${c.name || 'Chat'}</div>
            <small class="text-muted">${c.reporter ? `Reportado por: ${c.reporter}` : (c.lastSeen || '')}</small>
          </div>
          <span class="badge bg-secondary rounded-pill">${c.messages?.length || 0}</span>
        `;
        a.onclick = () => selectChat(c.id);
        chatListEl.appendChild(a);
      });
    }
    chatListEl.style.display = 'block';
  }

  function formatTimeNow() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${hh}:${mm}`;
  }

  function selectChat(id) {
    activeChatId = id;
    const chat = ensureChatStructure(state.chats.find(c => c.id === id) || {});
    if (!chat) return;
    if (chatHeaderName) chatHeaderName.textContent = chat.name;
    if (chatHeaderInfo) {
      const infoParts = [];
      if (chat.reporter) infoParts.push(`Reportado por: ${chat.reporter}`);
      if (chat.info) infoParts.push(chat.info);
      const composed = infoParts.join(' · ');
      chatHeaderInfo.textContent = composed || (chat.lastSeen ? `Último mensaje: ${chat.lastSeen}` : '');
    }
    renderChatMessages(chat);
    // Al seleccionar, volver a modo conversación
    showChatMode();
    // En móvil, abrir el drawer
    openChatDrawer();
  }

  function renderChatMessages(chat) {
    if (!chatMessagesEl) return;
    // Si no hay chat seleccionado, mostrar placeholder grande.
    if (!chat || !Array.isArray(chat.messages)) {
      renderEmptyChatPlaceholder();
      return;
    }
    chatMessagesEl.innerHTML = '';
    chat.messages.forEach(m => {
      const wrapper = el('div', `d-flex mb-2 ${m.from === 'mod' ? 'justify-content-end' : 'justify-content-start'}`);
      const bubble = el('div', `p-2 rounded ${m.from === 'mod' ? 'bg-success text-white' : 'bg-light'}`);
      bubble.style.maxWidth = '75%';
      bubble.innerHTML = `<div>${m.text}</div><div class="small text-muted mt-1">${m.time || ''}</div>`;
      wrapper.appendChild(bubble);
      chatMessagesEl.appendChild(wrapper);
    });
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }

  function sendMessage() {
    const txt = (chatInput?.value || '').trim();
    if (!txt || !activeChatId) return;
    const chat = state.chats.find(c => c.id === activeChatId);
    if (!chat) return;
    const now = formatTimeNow();
    chat.messages.push({ from: 'mod', text: txt, time: now });
    chat.lastSeen = `hoy ${now}`;
    chatInput.value = '';
    saveState();
    renderChatMessages(chat);
    renderChatList(chatSearch?.value || '');
  }

  // Hook events
  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatInput) chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); sendMessage(); } });
  const chatOpenListBtn = document.getElementById('chatOpenListBtn');
  if (chatOpenListBtn) chatOpenListBtn.addEventListener('click', () => {
    // Abrir panel de búsqueda y resultados
    showListMode();
    renderChatList('*');
    setTimeout(() => chatSearch?.focus(), 0);
  });
  if (chatSearch) {
    chatSearch.addEventListener('input', () => {
      const val = chatSearch.value.trim();
      if (!val) {
        // sin texto: ocultar resultados hasta que el usuario pulse Buscar de nuevo
        if (chatListEl) chatListEl.style.display = 'none';
        return;
      }
      if (chatListWrap && chatListWrap.style.display === 'none') chatListWrap.style.display = 'block';
      renderChatList(val);
    });
  }
  const chatCloseListBtn = document.getElementById('chatCloseListBtn');
  if (chatCloseListBtn) chatCloseListBtn.addEventListener('click', () => {
    showChatMode();
  });

  // Delegated fallback (por si algún listener directo falla)
  document.addEventListener('click', (ev) => {
    const t = ev.target;
    if (!t) return;
    if (t.id === 'chatOpenListBtn' || t.closest?.('#chatOpenListBtn')) {
      renderChatList('*');
      showListMode();
    } else if (t.id === 'chatCloseListBtn' || t.closest?.('#chatCloseListBtn')) {
      showChatMode();
    } else if (t.closest?.('[data-report-id][data-chat-name]')) {
      // Click en "Chat del reporte"
      const btn = t.closest('[data-report-id][data-chat-name]');
      const reportId = btn.getAttribute('data-report-id');
      const name = btn.getAttribute('data-chat-name') || `Reporte ${reportId}`;
      const info = btn.getAttribute('data-chat-info') || '';
      const reporter = btn.getAttribute('data-reporter') || '';
      const chatId = `rep:${reportId}`;
      let c = state.chats.find(x => x.id === chatId);
      if (!c) {
        c = { id: chatId, name, info, reporter, messages: [], lastSeen: '' };
        state.chats.unshift(c);
        saveState();
      } else {
        // actualizar info/nombre en caso cambien
        c.name = name;
        c.info = info;
        c.reporter = reporter;
        saveState();
      }
      selectChat(chatId);
      openChatDrawer();
    }
  });

  // Init
  if (chatListEl) {
    seedChatsIfEmpty();
    renderChatList(''); // inicia sin resultados visibles
    // Estado inicial: sin chat seleccionado y vista de conversación con placeholder
    showChatMode();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', __moderadorInit);
} else {
  __moderadorInit();
}
