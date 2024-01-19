document.addEventListener("DOMContentLoaded", async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const idUsuario = urlParams.get('id');
    const idInput = document.getElementById('id');
    const nombreInput = document.getElementById('nombre');
    const passInput = document.getElementById('pass');

    try{
            const responseAll = await fetch('http://localhost:3000/CUser/' + idUsuario);
            const datos = await responseAll.json();

            const primerUsuario = datos[0]; // Obtener el primer elemento del array

            idInput.value = primerUsuario.id_user;
            nombreInput.value = primerUsuario.nombre;
            passInput.value = primerUsuario.pass;
            
        }catch(error){
            console.error('Hubo un error al obtener los datos de la API:', error);
        }    
});

function regresar(){
    window.location.href = "../../Html/Admin/usuarios.html";
}  

async function eliminar(){
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const idUsuario = urlParams.get('id');

        const response = await fetch('http://localhost:3000/DelUser/'+idUsuario,{
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Usuario eliminado exitosamente');
            window.location.href = "usuarios.html";
        } else {
            alert('Error al eliminar el usuario');
        }
    } catch (error) {
        console.error('Hubo un error al intentar eliminar el usuario:', error);
        alert('Hubo un error al intentar eliminar el usuario');
    }
}

async function actualizar(){
    const idInput = document.getElementById('id').value;
    const nombreInput = document.getElementById('nombre').value;
    const passInput = document.getElementById('pass').value;
    
    try{
        const response = await fetch('http://localhost:3000/PuUser',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id_user":idInput,
                "nombre":nombreInput,
                "pass":passInput
            })
        });
        if (response.ok) {
            alert('Usuario actualizado');
            window.location.href = "usuarios.html";
        } else {
            console.error('Error al modificar el usuario:', response.statusText);
        }
    }catch(error) {
        console.log('Hubo un error al realizar la solicitud PUT:', error);
    }
}