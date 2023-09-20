// esta funcion se ejecuta con el evento submit del formulario
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.status === 200) {
            console.log("Inicio de sesión exitoso");
            const message = data.message; // Mensaje de bienvenida con nombre y apellido
    
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: message, // Mostrar el mensaje de bienvenida
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                // Redirigir al usuario a la página de inicio o realizar otras acciones necesarias
                window.location.href = "/";
            });
            
        } else if (response.status === 401) {
            // Contraseña incorrecta, muestra un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña incorrecta. Por favor, verifica tus credenciales.'
            });
        } else {
            // Otro código de estado, muestra un mensaje de error genérico
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error al intentar iniciar sesión'
            });
        }

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al intentar iniciar sesión'
        });
    }
});