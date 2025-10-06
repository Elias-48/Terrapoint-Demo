document.addEventListener('DOMContentLoaded', () => {
  // Utilidad para marcar inputs inválidos con Bootstrap
  function markInvalid(input, message) {
    input.classList.add('is-invalid');
    let fb = input.parentElement.querySelector('.invalid-feedback');
    if (!fb) {
      fb = document.createElement('div');
      fb.className = 'invalid-feedback';
      input.parentElement.appendChild(fb);
    }
    fb.textContent = message || 'Este campo es obligatorio';
  }
  function clearInvalid(input) {
    input.classList.remove('is-invalid');
    const fb = input.parentElement.querySelector('.invalid-feedback');
    if (fb) fb.textContent = '';
  }
  function isEmpty(input) {
    return !input.value || input.value.trim() === '';
  }

  // Validación Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail');
      const pass = document.getElementById('loginPassword');
      let ok = true;

      [email, pass].forEach(inp => clearInvalid(inp));

      if (isEmpty(email)) { markInvalid(email, 'Ingresa tu correo'); ok = false; }
      if (isEmpty(pass)) { markInvalid(pass, 'Ingresa tu contraseña'); ok = false; }

      if (ok) {
        window.location.href = 'usuario.html';
      }
    });
  }

  // Validación Registro
  const regForm = document.getElementById('registerForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('regNombre');
      const apellido = document.getElementById('regApellido');
      const correo = document.getElementById('regCorreo');
      const edad = document.getElementById('regEdad');
      const pass1 = document.getElementById('regPass');
      const pass2 = document.getElementById('regPass2');

      let ok = true;
      [nombre, apellido, correo, edad, pass1, pass2].forEach(inp => clearInvalid(inp));

      if (isEmpty(nombre)) { markInvalid(nombre, 'Ingresa tu nombre'); ok = false; }
      if (isEmpty(apellido)) { markInvalid(apellido, 'Ingresa tu apellido'); ok = false; }
      if (isEmpty(correo)) { markInvalid(correo, 'Ingresa tu correo'); ok = false; }
      if (isEmpty(edad)) { markInvalid(edad, 'Ingresa tu edad'); ok = false; }
      if (isEmpty(pass1)) { markInvalid(pass1, 'Crea una contraseña'); ok = false; }
      if (isEmpty(pass2)) { markInvalid(pass2, 'Confirma tu contraseña'); ok = false; }
      if (!isEmpty(pass1) && !isEmpty(pass2) && pass1.value !== pass2.value) {
        markInvalid(pass2, 'Las contraseñas no coinciden');
        ok = false;
      }

      if (ok) {
        window.location.href = 'usuario.html';
      }
    });
  }
});
