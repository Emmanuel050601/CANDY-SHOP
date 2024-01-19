//Hacemos referencia al formulario
const form = document.getElementById("buscarPromos");
//hacemos referencia a la tabla
const dataBook = document.getElementById("tabla");

//eventlistener para cuando se preciona un boton del tipo submit
form.addEventListener("submit", async (event) => {
    //evitamos que se reinicie la pagina al precionar el boton
    event.preventDefault();
    //traemos los datos del formulario
    const productData = eventToPromosData(event);

    //lo tranformamos en formato JSON para la consulta
    //Ejecutamos una accion de la api por medio del fetch
    const prod = productData.replace(/\s/g, '%20');
    const consultaNom = await fetch("http://localhost:3000/CSPromos/"+prod);
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
    if(nombre == ""){
        alert("No se han ingresado datos de búsqueda");
    }
    return nombre;
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
    const respuesta = await fetch("http://localhost:3000/CPromos");
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
function addPromoToTable(promo){

    
    const row = dataBook.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.innerHTML = promo.promocion_id;
    cell2.innerHTML = promo.nombre;
    cell3.innerHTML = promo.descripcion;
    cell4.innerHTML = promo.fecha_inicio;
    cell5.innerHTML = promo.fecha_final;
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
        var descripcion = fila.cells[2].textContent;
        var fechaIni = fila.cells[3].textContent;
        var fechafin = fila.cells[4].textContent;
        localStorage.setItem('idPromo', id);
        localStorage.setItem('productopromo', nombre);
        localStorage.setItem('description', descripcion);
        localStorage.setItem('fechaIni', fechaIni);
        localStorage.setItem('fechaFin', fechafin);
        window.location = "ActDelPromo.html";
      }
    });

//
function ventanaInsertar(){
    console.log("Prueba");
    window.location = "insertarPromo.html";
}