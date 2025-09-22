document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const birthdate = document.getElementById('birthdate').value;
    const isDuocStudent = document.getElementById('duoc-student').checked;
    const discountCode = document.getElementById('discount-code').value.toUpperCase();

    const registrationMessage = document.getElementById('registration-message');
    registrationMessage.className = '';
    registrationMessage.textContent = '';

    const today = new Date();
    const birthDateObj = new Date(birthdate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

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

    registrationMessage.textContent = message;
    registrationMessage.classList.add('success');

    // Simular inicio de sesión
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name, email, birthdate }));

    // Redireccionar al index para ver el cambio en la navegación
    window.location.href = 'index.html';
});