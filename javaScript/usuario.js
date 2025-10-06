document.addEventListener('DOMContentLoaded', () => {
  // Perfil: previsualización de imagen
  const fileInput = document.getElementById('profileUpload');
  const previewImg = document.getElementById('profilePreview');
  if (fileInput && previewImg) {
    const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const MAX_MB = 5; // tamaño máximo sugerido
    fileInput.addEventListener('change', () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      if (!ALLOWED_MIME.includes(file.type)) {
        alert('Formato no permitido. Sube una imagen JPG, PNG, GIF o WEBP.');
        fileInput.value = '';
        return;
      }
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > MAX_MB) {
        alert(`La imagen es muy grande (${sizeMB.toFixed(1)} MB). Máximo ${MAX_MB} MB.`);
        fileInput.value = '';
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      previewImg.src = objectUrl;
      previewImg.alt = 'Foto de perfil seleccionada';
      previewImg.onload = () => { URL.revokeObjectURL(objectUrl); };
    });
  }

  // Reporte: validación simple e inline alert
  const reportForm = document.getElementById('reportForm');
  const reportDesc = document.getElementById('reportDesc');
  const reportLoc = document.getElementById('reportLoc');
  const reportType = document.getElementById('reportType');
  const reportAlert = document.getElementById('reportAlert');

  function showReportAlert(msg) {
    if (!reportAlert) return;
    if (!msg) {
      reportAlert.classList.add('d-none');
      reportAlert.textContent = '';
    } else {
      reportAlert.classList.remove('d-none');
      reportAlert.textContent = msg;
    }
  }

  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = (reportDesc?.value || '').trim();
      const loc = (reportLoc?.value || '').trim();
      const type = (reportType?.value || '').trim();

      if (!desc || !loc || !type) {
        showReportAlert('Por favor, rellena todos los campos obligatorios.');
        return;
      }

      // Si necesitas enviar los datos, aquí va la lógica.
      // Por ahora, solo limpiamos y mostramos éxito básico.
      showReportAlert();
      reportForm.reset();
      alert('Reporte enviado. ¡Gracias!');
    });
  }
});
