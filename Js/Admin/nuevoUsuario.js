async function agregar(){
    const nombre = document.getElementById('nombre').value;
    const contra = document.getElementById('pass').value;
    const tipo = document.getElementById('tipo').innerText;

    try{
        const response = await fetch('http://localhost:3000/PUsers',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "nombre":nombre,
                "pass":contra
            })
        });
        if(response.ok){
            alert('Usuario agregado');

            if(tipo == "Crear Cuenta"){
                alert("Inicia sesión con el usuario registrado");
                window.location.href = "../../Html/Public/Accede.html";
            }else{
                window.location.href = "../../Html/Admin/usuarios.html";
            }
        }else {
            console.error('Error al agregar el usuario:', response.statusText);
        }
    }catch(error){
        console.log('Hubo un error al realizar la solicitud POST:', error);
    }
}

function regresar(){
    window.location.href = "../../Html/Admin/usuarios.html";
} 