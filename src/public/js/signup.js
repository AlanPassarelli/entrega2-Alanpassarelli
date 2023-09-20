const formData = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    age: parseInt(document.getElementById('age').value),
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
};

fetch('/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then((response) => {
    if (response.status === 200) {
        // El inicio de sesión fue exitoso, redireccionar o realizar acciones adicionales aquí
    } else {
        // El inicio de sesión falló, manejar el error aquí
    }
})
.catch((error) => {
    console.error('Hubo un error al enviar los datos:', error);
});

