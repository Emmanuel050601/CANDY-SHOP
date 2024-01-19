//Hacemos referencia al formulario
const form = document.getElementById("buscarProducto");
//hacemos referencia a la tabla
const dataBook = document.getElementById("tabla");
//eventlistener para cuando se preciona un boton del tipo submit
form.addEventListener("submit", async (event) => {
    //evitamos que se reinicie la pagina al precionar el boton
    event.preventDefault();
    //traemos los datos del formulario
    const productData = eventToPromosData(event);
    //lo tranformamos en formato JSON para la consulta
    const prodcutDataTransformed = JSON.stringify(productData);
    //Ejecutamos una accion de la api por medio del fetch
    const consultaNom = await fetch("http://localhost:3000/CSProducts",{
        //utilizamos el metodo post por que el metodo get no admite solicitudes con body por medio dle fecth
        method: "POST",
        headers: {
            "Content-Type": "application/json",            
        },
        body: prodcutDataTransformed,    
    }
    );
    //guaradamos lo que nos devolvio la consulta
    const consulta = await consultaNom.json();
    //eliminamos lo que exista en la tabl
    deleteRows();
    //actualizamos la tabla con lo que se consulto
    actualizarTablaTitulo(consulta);
});

//Metodo que extrae la informacion a patir de un evento
function eventToPromosData(event){
    const elements = event.target.elements;
    const nombre = elements.producto.value;
    return {
        nombre: nombre
    };
}

//funcion asincrona que manda llamar la funcion que dibuja la tabla con la consulta hecha por el usuario
async function actualizarTablaTitulo(consulta){
    dibujarTabla(consulta);
}
//Metodo que manda llamar la funcion dibuja tabla con la consulta en la api de todo
async function actualizarTabla(){
    const productos= await obtenerPromosApi();
    dibujarTabla(productos);
}
//consulta la api con el get de todo lo que tiene 
async function obtenerPromosApi(){
    const respuesta = await fetch("http://localhost:3000/CProducts");
    const libros = await respuesta.json();
    return libros;

}

//funcion que registro por registro dibuja en la tabla

async function dibujarTabla(productos){
    productos.forEach(producto => {
        addPromoToTable(producto)
    });

} 

//Funcion que da los valores y escribe en la tabla html
function addPromoToTable(producto){

    
    const row = dataBook.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    
    cell1.innerHTML = producto.product_id;
    cell2.innerHTML = producto.nombre;
    cell3.innerHTML = producto.marca;
    cell4.innerHTML = producto.contenido;
    cell5.innerHTML = producto.precio;
    cell6.innerHTML = producto.stock;
}

//Funcion que elimina los renglones de la tabla html
function deleteRows() {
    const num = document.getElementById("tabla").rows.length;
    for(i = 1; i< num; i++){
        document.getElementById("tabla").deleteRow(1);
    }
}

//Mandamos llamar un eventListener para que cuando la pagina se refresque o abra ejecute una accion
document.addEventListener("DOMContentLoaded", () => {
    actualizarTabla();
});
//EventListener de la tabla que al hacer click en un registro eejecute una accion
dataBook.addEventListener('click', function(e){
    if (e.target.tagName === 'TD') {
        // Obtiene la fila actual
        
        var fila = e.target.parentNode;
        
        // Obtiene los datos de la fila
        var id = fila.cells[0].textContent;
        var nombre = fila.cells[1].textContent;
        var marca = fila.cells[2].textContent;
        var contenido = fila.cells[3].textContent;
        var precio = fila.cells[4].textContent;
        var stock = fila.cells[5].textContent;
        localStorage.setItem('idProduct', id);
        localStorage.setItem('producto', nombre);
        localStorage.setItem('marca', marca);
        localStorage.setItem('contenido', contenido);
        localStorage.setItem('precio', precio);
        localStorage.setItem('stock', stock);
        window.location = "ActDelProduct.html";
      }
    });

 function ventanaInsertar(){
    window.location = "insertarProduct.html";
 }   