//Hacemos referencia a los botones
const bInsert = document.getElementById("buttonInsert");
const bBack = document.getElementById("buttonBack");

//Referenciamos al formulario de html
const form = document.getElementById("insertPromo");
//Generamos un eventListener para evitar que se reinicie la pagina al precionar un boton del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío normal del formulario
});

//eventListener del boton par actualizar
bInsert.addEventListener("click", async (event) => {
    const info = getDataForm();
    console.log(info);
    const infoTransformed = JSON.stringify(info);
    //Ejecutamos una accion de la api por medio del fetch
    const act = await fetch("http://localhost:3000/PPromos",{
        //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
        method: "POST",
        headers: {
            "Content-Type": "application/json",            
        },
        body: infoTransformed,    
    }
    );
    alert("Se añadio la nueva promoción");

});

bBack.addEventListener("click", async(event) =>{
    window.location = "AdminPromo.html";
});
//Funcion que saca la informacion de la tabla de promociones
function getDataForm(){
    const fproduct =document.getElementById("producto").value;
    const fdesc= document.getElementById("descripcion").value;
    const ffechai = document.getElementById("fechaini").value ;
    const ffechaf = document.getElementById("fechafin").value;
    console.log(ffechai);
    console.log(ffechaf);
    return {
        id_product:fproduct,
        descripcion: fdesc,
        fecha_inicio: ffechai,
        fecha_final: ffechaf
    };
};
