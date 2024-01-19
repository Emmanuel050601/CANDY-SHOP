console.log(localStorage);
//Importamos las variables del otro JavaScript
var id = localStorage.getItem('idProduct');
var producto = localStorage.getItem('producto');
var marca = localStorage.getItem('marca');
var contenido = localStorage.getItem('contenido');
var precio = localStorage.getItem('precio');
var stock = localStorage.getItem('stock');


//Ingresamos el contenido de las variables importadas en los campos del formulario
document.getElementById("id").value = id;
document.getElementById("producto").value = producto;
document.getElementById("marca").value = marca;
document.getElementById("contenido").value = contenido;
document.getElementById("precio").value = precio;
document.getElementById("stock").value = stock;
//Hacemos referencia a los botones
const bUpdate = document.getElementById("buttonUpdate");
const bDelete = document.getElementById("buttonDelete");
const bBack = document.getElementById("buttonBack");

//Referenciamos al formulario de html
const form = document.getElementById("actDelProduct");
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
    const act = await fetch("http://localhost:3000/PuProducts",{
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
    const act = await fetch("http://localhost:3000/DelProducts",{
        //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",            
        },
        body: infoTransformed,    
    }
    );
    alert("Se elimino");
    window.location="AdminProductos.html"
}
});

bBack.addEventListener("click", async(event) =>{
    window.location = "AdminProductos.html";
});

//Funcion que saca la informacion de la tabla de productos
function getDataForm(){
    
    const fid = document.getElementById("id").value ;
    const fproduct =document.getElementById("producto").value;
    const fmarca= document.getElementById("marca").value;
    const fcontent = document.getElementById("contenido").value ;
    const fcost = document.getElementById("precio").value;
    const fstock = parseInt(document.getElementById("stock").value);
    return {
        product_id: fid,
        nombre: fproduct,
        marca: fmarca,
        contenido: fcontent,
        precio: fcost,
        stock: fstock
    };
};

function getId(){
    const fid = document.getElementById("id").value;
    return{
        id:fid
    }
}

//Funciones para subir imagenes
function arch(event){
    console.log("Entre al evento de imagenes");
    const fproduct =document.getElementById("producto").value;
    const file  = document.getElementById('file');
    const extension = file.files[0].name.split('.')[1];
    let nuevo_nombre = fproduct+".png";
    file.files[0].name = nuevo_nombre;
    const formData = new FormData();
    formData.append(fproduct, file.files[0], nuevo_nombre);
    console.log(`nombre creado desde javascript: ${nuevo_nombre} `);
}

function subirArchivo(){
    var formData = new FormData(document.getElementById('uploadForm'));
    const customFileName = document.getElementById("producto").value;
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];

    // Cambiar el nombre del archivo en FormData
    if (customFileName && file) {
        const nuevoNombre = customFileName + '.' + file.name.split('.').pop();
        formData.set('file', file, nuevoNombre);
    }
    
    // Puedes usar Fetch API o XMLHttpRequest para enviar el formulario al servidor
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
        alert("La imagen se subió correctamente");
    })
    .catch(error => console.error('Error:', error));
}