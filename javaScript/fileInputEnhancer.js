// fileInputEnhancer.js
// Adds an English label next to native file inputs and updates it on selection.
(function(){
  function isHidden(input){
    try {
      if (input.hasAttribute('hidden')) return true;
      if (input.classList && input.classList.contains('d-none')) return true;
      const style = window.getComputedStyle(input);
      if (style.display === 'none' || style.visibility === 'hidden') return true;
      if (input.offsetParent === null) return true;
    } catch(e) {}
    return false;
  }

  function enhanceInput(input){
    if (input.__enhanced) return; // avoid duplicate
    if (input.getAttribute('data-no-enhance') === 'true') return; // opted out
    if (isHidden(input)) return; // skip hidden controls
    input.__enhanced = true;

    // Set aria-label in English
    input.setAttribute('aria-label', 'Select file');

    // Create status line
    const status = document.createElement('small');
    status.className = 'text-muted d-block mt-1 file-input-status';
    status.textContent = 'Select file | No file selected';

    // Insert after input
    input.insertAdjacentElement('afterend', status);

    input.addEventListener('change', () => {
      const files = input.files;
      if (!files || files.length === 0) {
        status.textContent = 'Select file | No file selected';
      } else if (files.length === 1) {
        status.textContent = `Selected: ${files[0].name}`;
      } else {
        status.textContent = `${files.length} files selected`;
      }
    });
  }

  function init(){
    document.querySelectorAll('input[type="file"]').forEach(enhanceInput);
    // Observe DOM for dynamically added file inputs
    const obs = new MutationObserver(muts => {
      muts.forEach(m => {
        m.addedNodes && m.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.matches && node.matches('input[type="file"]')) enhanceInput(node);
            node.querySelectorAll && node.querySelectorAll('input[type="file"]').forEach(enhanceInput);
          }
        });
      });
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
