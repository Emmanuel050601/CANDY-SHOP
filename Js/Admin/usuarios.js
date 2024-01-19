document.addEventListener("DOMContentLoaded", async function() {

    try {
        const tablaUsuarios = document.getElementById('tablaUsuarios');
        const response = await fetch('http://localhost:3000/CUsers');
        const data = await response.json();

        // Limpiar la tabla (excepto la primera fila que es el encabezado)
        while (tablaUsuarios.rows.length > 1) {
            tablaUsuarios.deleteRow(1);
        }

        // Insertar los datos en la tabla
        data.forEach(usuarios => {
            const row = tablaUsuarios.insertRow();
            const cellId = row.insertCell(0);
            const cellNombreUsuario = row.insertCell(1);

            cellId.innerHTML = usuarios.id_user; // Propiedades según tu estructura de datos
            cellNombreUsuario.innerHTML = usuarios.nombre; // Propiedades según tu estructura de datos
        });
        const filas = tablaUsuarios.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        // Agregar evento click a cada fila
        for (let i = 0; i < filas.length; i++) {
            filas[i].addEventListener('click', async function() {
                // Resaltar la fila seleccionada
                deseleccionarFilas();
                this.classList.add('seleccionada');
                
                // Obtener datos de la fila seleccionada (ID)
                const idUsuario = this.cells[0].innerText;
                console.log('Usuario seleccionado - ID: ' + idUsuario);

                if (idUsuario) {
                    const url = new URL(window.location.href);
                    url.searchParams.set('id', idUsuario); // Agregar el ID al parámetro 
                    window.location.href = url.toString(); // Redirigir a la URL modificada
                }
            });
        } 

        // Función para deseleccionar todas las filas
        function deseleccionarFilas() {
            for (let i = 0; i < filas.length; i++) {
                filas[i].classList.remove('seleccionada');
            }
        }
    } catch (error) {
        console.error('Hubo un error al obtener los datos de la API:', error);
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idUsuario = urlParams.get('id'); // Obtiene el valor del parámetro 'fila' del URL

        if (idUsuario) {
            window.location.href = 'editarUsuario.html?id='+idUsuario;
        } else {
            console.log('No se encontró el parámetro "fila" en el URL.');
        }
    } catch (error) {
        console.error('Hubo un error al obtener los datos de la API:', error);
    }
});

function agregar(){
    window.location.href = "../../Html/Admin/nuevoUsuario.html";
}