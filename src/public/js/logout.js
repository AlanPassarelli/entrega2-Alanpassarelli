
// Selecciona el botón de "Cerrar sesión" en tu interfaz de usuario
const logoutButton = document.getElementById('logoutButton');

// Agrega un evento click al botón de "Cerrar sesión"
logoutButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/sessions/logout', {
            method: 'GET',
        });

        const data = await response.json();

        if (response.status === 200) {
            // La sesión se cerró exitosamente, muestra un mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Cerrado Correctamente',
                text: 'Tu sesión se ha cerrado con éxito.',
                showConfirmButton: false,
                timer: 1500, // Cierra automáticamente el mensaje después de 1.5 segundos
            }).then(() => {
                // Redirige al usuario a la página de inicio de sesión
                window.location.href = '/login';
            });
        } else {
            // Maneja el error si es necesario
            console.error('Error al cerrar sesión:', data.resultado);
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
});




