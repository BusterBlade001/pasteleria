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

        const updatedName = document.getElementById('profile-name').value;
        const updatedEmail = document.getElementById('profile-email').value;
        const updatedBirthdate = document.getElementById('profile-birthdate').value;

        const updatedUser = {
            name: updatedName,
            email: updatedEmail,
            birthdate: updatedBirthdate
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const profileMessage = document.getElementById('profile-message');
        profileMessage.textContent = '¡Tu perfil ha sido actualizado con éxito!';
        profileMessage.className = 'success';
        
        console.log('Perfil actualizado:', updatedUser);
    });
});