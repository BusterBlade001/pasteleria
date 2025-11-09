document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const isDuocStudent = document.getElementById('duoc-student').checked;
    const discountCode = document.getElementById('discount-code').value.toUpperCase();

    const registrationMessage = document.getElementById('registration-message');
    registrationMessage.className = '';
    registrationMessage.textContent = '';
    
    // --- INICIO DE LAS VALIDACIONES REQUERIDAS (IE1.2.1 y IE1.2.2) ---
    
    // 1. Validación de campos vacíos
    if (!name || !email || !birthdate) {
        registrationMessage.textContent = 'Error: Todos los campos obligatorios (Nombre, Email, Fecha de Nacimiento) deben ser completados.';
        registrationMessage.classList.add('error');
        return;
    }

    // 2. Validación de formato de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        registrationMessage.textContent = 'Error: Por favor, introduce un formato de correo electrónico válido (ej: usuario@dominio.cl).';
        registrationMessage.classList.add('error');
        return;
    }

    const today = new Date();
    const birthDateObj = new Date(birthdate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    
    // 3. Validación de edad mínima (18 años)
    const MIN_AGE = 18;
    if (age < MIN_AGE) {
        registrationMessage.textContent = `Error: Debes ser mayor de ${MIN_AGE} años para registrarte en Pastelería Mil Sabores.`;
        registrationMessage.classList.add('error');
        return;
    }
    
    // --- FIN DE LAS VALIDACIONES ---

    const isAdmin = email === 'admin@pasteleria.cl';

    let message = `¡Bienvenido, ${name}! Tu registro ha sido exitoso.`;
    
    if (age >= 50) {
        message += ' Como eres mayor de 50 años, recibirás un 50% de descuento en todos tus productos.';
    } else if (discountCode === 'FELICES50') {
        message += ' Gracias por usar el código "FELICES50". ¡Disfrutarás de un 10% de descuento de por vida!';
    }

    if (isDuocStudent && email.endsWith('@duocuc.cl')) {
        message += ' ¡Y como estudiante de Duoc UC, te regalaremos una torta en tu cumpleaños!';
    }
    // Sugerencia/Aviso personalizado para estudiantes Duoc que usan otro email
    else if (isDuocStudent && !email.endsWith('@duocuc.cl')) {
         message += ' Aviso: Marcaste ser estudiante de Duoc UC, pero tu email no termina en "@duocuc.cl". Asegúrate de que tu correo sea el correcto para recibir tu torta de cumpleaños.';
    }


    registrationMessage.textContent = message;
    registrationMessage.classList.add('success');

    // Simular inicio de sesión
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name, email, birthdate }));

    // Redireccionar al index para ver el cambio en la navegación
    window.location.href = 'index.html';
});