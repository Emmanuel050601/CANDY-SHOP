
const user = document.getElementById("user");
const pass = document.getElementById("pass1");

async function iniciar(){
    if(user.value != "" && pass.value != ""){
        const info = getDataForm();
        const infoTransformed = JSON.stringify(info);
        //Ejecutamos una accion de la api por medio del fetch
        const act = await fetch("http://localhost:3000/CUsuario",{
            //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
            method: "POST",
            headers: {
                "Content-Type": "application/json",            
            },
            body: infoTransformed,    
        });
        const consulta = await act.json();

        if(consulta[0] != undefined && pass.value == consulta[0].pass){
            alert(`¡Bienvenido a DulciWeb ${user.value}!`);
            window.location = "../Admin/AdminProductos.html";
        }
        else{
            alert(`Usuario o contraseña incorrectos`);
        }

    }
    else{
        alert("Ingresa los valores necesarios");
    }
}

function getDataForm(){
    const usuario = user.value;
    return {
        nombre:usuario
    }
};


