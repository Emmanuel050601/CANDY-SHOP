//Hacemos referencia a los botones
const bInsert = document.getElementById("buttonInsert");
const bBack = document.getElementById("buttonBack");

//Referenciamos al formulario de html
const form = document.getElementById("insertProduct");
//Generamos un eventListener para evitar que se reinicie la pagina al precionar un boton del formulario
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evitar el envío normal del formulario
});

//eventListener del boton par actualizar
bInsert.addEventListener("click", async (event) => {
    const info = getDataForm();
    if(info != ''){
        const infoTransformed = JSON.stringify(info);
        //Ejecutamos una accion de la api por medio del fetch
        const act = await fetch("http://localhost:3000/PProducts",{
            //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
            method: "POST",
            headers: {
                "Content-Type": "application/json",            
            },
            body: infoTransformed,    
        }
        );
        alert("Se añadio el producto");
    }else{
        alert("Revisa la información ingresada");
    }
});

bBack.addEventListener("click", async(event) =>{
    window.location = "AdminProductos.html";
});

//Funcion que saca la informacion de la tabla de productos
function getDataForm(){
    const fid = document.getElementById("idproducto").value;
    const fproduct =document.getElementById("producto").value;
    const fmarca= document.getElementById("marca").value;
    const fcontenido = document.getElementById("contenido").value ;
    const fprecio = document.getElementById("precio").value;
    const fstock = document.getElementById("stock").value;

    if(fid =='' || fproduct =='' || fmarca=='' || fcontenido=='' || 
       fprecio=='' || fstock==''){
        return '';
    }
    else{
        return {
            product_id:fid,
            nombre:fproduct,
            marca:fmarca,
            contenido:fcontenido,
            precio: fprecio,
            stock: fstock
        }
    }
};

//Funciones para subir imagenes
function arch(event){
    console.log("Entre al evento de imagenes");
    const fproduct =document.getElementById("producto").value;
    const file  = document.getElementById('file');
    const extension = file.files[0].name.split('.')[1];
    let nuevo_nombre = fproduct+".png";//+extension+"";
    file.files[0].name = nuevo_nombre;
    const formData = new FormData();
    formData.append(fproduct, file.files[0], nuevo_nombre);
    console.log(`nombre creado desde javascript: ${nuevo_nombre} `);
}

function subirArchivo(){
    const info = getDataForm();
    if(info == ''){
        alert("Ingresa la información, antes de subir la imagen");
    }
    else {
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
}