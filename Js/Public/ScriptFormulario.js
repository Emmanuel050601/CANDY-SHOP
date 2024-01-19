function enviarMail() {
    var respuesta;
    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');


    if (nombre.value.trim() === '' || telefono.value.trim() === '' || 
        email.value.trim() === '' || asunto.value.trim() === '' ) {
        alert('Por favor, complete todos los campos antes de enviar el formulario.');
    } else{

        const formData = {
            nombre: nombre.value,
            telefono: telefono.value,
            email: email.value,
            asunto: asunto.value,
            mensaje: mensaje.value
        };

        // Enviar datos al servidor Node.js
        fetch('http://localhost:3000/enviar-correo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            limpiarFormulario();
            alert('Formulario enviado con éxito, pronto nos comunicaremos con usted');
            respuesta = true;
        })
        .catch((error) => {
            console.error('Error al enviar el formulario:', error);
        });
    }
}

function limpiarFormulario() {
    // Restablecer los valores de los campos del formulario a vacío
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('asunto').value = '';
    document.getElementById('mensaje').value = '';
}