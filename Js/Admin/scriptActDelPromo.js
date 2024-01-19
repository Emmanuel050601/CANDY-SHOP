//Importamos las variables del otro JavaScript
var id = localStorage.getItem('idPromo');
var producto = localStorage.getItem('productopromo');
var descripcion = localStorage.getItem('description');
var fechaIni = localStorage.getItem('fechaIni');
var fechaFin = localStorage.getItem('fechaFin');
//Ingresamos el contenido de las variables importadas en los campos del formulario
document.getElementById("id").value = id;
document.getElementById("producto").value = producto;
document.getElementById("descripcion").value = descripcion;
document.getElementById("fechaini").value = fechaIni;
document.getElementById("fechafin").value = fechaFin;
//Hacemos referencia a los botones
const bUpdate = document.getElementById("buttonUpdate");
const bDelete = document.getElementById("buttonDelete");
const bBack = document.getElementById("buttonBack");

//Referenciamos al formulario de html
const form = document.getElementById("actDelPromo");
//Generamos un eventListener para evitar que se reinicie la pagina al precionar un boton del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío normal del formulario
});

//eventListener del boton par actualizar
bUpdate.addEventListener("click", async (event) => {
    const info = getDataForm();
    console.log(info);
    const infoTransformed = JSON.stringify(info);
    //Ejecutamos una accion de la api por medio del fetch
    const act = await fetch("http://localhost:3000/PuPromos",{
        //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
        method: "PUT",
        headers: {
            "Content-Type": "application/json",            
        },
        body: infoTransformed,    
    }
    );
    alert("Se actualizo");

});

//eventListener del boton eliminar
bDelete.addEventListener("click", async (event) => {
    var quest = confirm("¿Desea eliminar?");
    if(quest){
    const info = getId();
    console.log(info);
    const infoTransformed = JSON.stringify(info);
    //Ejecutamos una accion de la api por medio del fetch
    const act = await fetch("http://localhost:3000/DelPromos",{
        //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",            
        },
        body: infoTransformed,    
    }
    );
    alert("Se elimino");
    window.location="AdminPromo.html"
}
});

bBack.addEventListener("click", async(event) =>{
    window.location = "AdminPromo.html";
});
//Funcion que saca la informacion de la tabla de productos
function getDataForm(){
    
    const fid = document.getElementById("id").value ;
    const fproduct =document.getElementById("producto").value;
    const fdesc= document.getElementById("descripcion").value;
    const ffechai = document.getElementById("fechaini").value ;
    const ffechaf = document.getElementById("fechafin").value;
    console.log(fid);
    console.log(fproduct);
    console.log(fdesc);
    console.log(ffechai);
    console.log(ffechaf);
    return {
        promocion_id: fid,
        nombre: fproduct,
        descripcion: fdesc,
        fecha_inicio: ffechai,
        fecha_final: ffechaf
    };
};

function getId(){
    const fid = document.getElementById("id").value;
    return{
        promocion_id:fid
    }
}
