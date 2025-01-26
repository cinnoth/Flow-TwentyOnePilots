/* Validación de formulario */
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    let esValido = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const motivo = document.getElementById('motivo');
    const mensaje = document.getElementById('mensaje');

    // Limpiar los mensajes de error previos
    document.querySelectorAll('.error').forEach(error => error.textContent = '');
    document.querySelectorAll('.campo__field').forEach(campo => campo.classList.remove('error-border'));

    // Validación
    if (name.value.trim() === '') {
        esValido = false;
        document.getElementById('error-name').textContent = 'El nombre es obligatorio.';
        name.classList.add('error-border');
    }

    const emailExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.value.trim() === '' || !emailExpresion.test(email.value)) {
        esValido = false;
        document.getElementById('error-email').textContent = 'Ingrese un correo válido.';
        email.classList.add('error-border');
    }

    if (motivo.value === '') {
        esValido = false;
        document.getElementById('error-motivo').textContent = 'Seleccione el motivo de su mensaje.';
        motivo.classList.add('error-border');
    }

    if (mensaje.value.trim() === '') {
        esValido = false;
        document.getElementById('error-mensaje').textContent = 'Escribe tu mensaje.';
        mensaje.classList.add('error-border');
    }

    // Si todo es válido, enviar los datos a Formspree
    if (esValido) {
        const datos = {
            name: name.value,
            email: email.value,
            motivo: motivo.value,
            mensaje: mensaje.value,
        };

        enviarFormulario(datos)
            .then((respuesta) => {
                alert('¡Mensaje enviado con éxito!');
                formulario.reset();
            })
            .catch((error) => {
                alert('Ocurrió un error al enviar el mensaje: ' + error);
            });
    }
});

// Función para enviar datos usando Fetch y Formspree
function enviarFormulario(datos) {
    const endpoint = 'https://formspree.io/f/xdkaopzw';

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then((response) => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('No se pudo enviar el formulario');
            }
        });
}
