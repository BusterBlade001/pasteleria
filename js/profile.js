document.addEventListener('DOMContentLoaded', () => {
    let user = JSON.parse(localStorage.getItem('currentUser')) || {
        name: 'Usuario Invitado',
        email: 'invitado@mail.cl',
        birthdate: ''
    };

    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-email').value = user.email;
    if (user.birthdate) {
        document.getElementById('profile-birthdate').value = user.birthdate;
    }

    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const updatedName = document.getElementById('profile-name').value.trim();
        const updatedEmail = document.getElementById('profile-email').value.trim();
        const updatedBirthdate = document.getElementById('profile-birthdate').value;

        const profileMessage = document.getElementById('profile-message');
        profileMessage.className = '';
        profileMessage.textContent = '';
        
        // VALIDACIÓN: Campos vacíos
        if (!updatedName || !updatedEmail || !updatedBirthdate) {
            profileMessage.textContent = 'Error: Todos los campos obligatorios deben ser completados.';
            profileMessage.classList.add('error');
            return;
        }

        // VALIDACIÓN: Formato de Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(updatedEmail)) {
            profileMessage.textContent = 'Error: Por favor, introduce un formato de correo electrónico válido.';
            profileMessage.classList.add('error');
            return;
        }
        
        const updatedUser = {
            name: updatedName,
            email: updatedEmail,
            birthdate: updatedBirthdate
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        profileMessage.textContent = '¡Tu perfil ha sido actualizado con éxito!';
        profileMessage.className = 'success';
        
        console.log('Perfil actualizado:', updatedUser);
    });
});