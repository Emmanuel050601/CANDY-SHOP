const mostrarMasButton = document.getElementById('mostrarMas');
const contenido = document.getElementById('products');

let cont = 0;
const tarjetasPorMostrar = 3; // Número de tarjetas para mostrar inicialmente y en cada clic de "Mostrar más"

const mostrarSiguientesTarjetas = () => {
   const tarjetasOcultas = document.querySelectorAll('.card-product.hidden');

   tarjetasOcultas.forEach(tarjeta => {
       if (cont < tarjetasPorMostrar) {
           tarjeta.classList.remove('hidden');
           cont++;
       }else{
        setTimeout(function() {
            cont = 0;
        }, 1000);
       }
   });

    // Ocultar el botón "Mostrar más" si se han mostrado todas las tarjetas
   if (cont >= tarjetasOcultas.length && tarjetasOcultas.length == 0) {
       //mostrarMasButton.style.display = 'none';
        mostrarMasButton.innerText = "Mostrar menos";


   }else{
       tarjetasOcultas.forEach( tarjeta =>{
           if(tarjetasOcultas.length <= 3){
               tarjeta.classList.remove('hidden');
           }
       });
       
   }
};

mostrarMasButton.addEventListener('click', mostrarSiguientesTarjetas);


fetch('http://localhost:3000/CProducts')
.then(response => response.json())
.then(data => {
    let cont = 0;
    // Procesar los datos y llenar dinámicamente las tarjetas
    const tarjetasContainer = document.getElementById('card-container');
    const numTarjetas = document.querySelectorAll('.card-product').length;
    
    if(numTarjetas != 0) cont = numTarjetas;

    data.forEach(producto=> {
        // Crear una tarjeta
        const tarjeta = document.createElement('div');
        
        if(cont < 3){ tarjeta.classList.add('card-product'); }
        else { tarjeta.classList.add('card-product', 'hidden'); }

        const contImg = document.createElement('div');
        contImg.classList.add('image-container');

        const imagen = document.createElement('img');
        imagen.src = "../../Images/Productos/"+producto.nombre+".png";
        
        const contenido = document.createElement('div');
        contenido.classList.add('info-container');

        const nombre = document.createElement('h2');
        nombre.classList.add('nombre-producto');
        nombre.innerText = `  ${producto.nombre}`;

        const precio = document.createElement('p');
        precio.classList.add('precio-producto');
        precio.innerText = `$ ${producto.precio}.00`;

        const detalles = document.createElement('div');
        detalles.classList.add('details');

        const contenidoEmpaque = document.createElement('h3');
        contenidoEmpaque.classList.add('contenido');
        contenidoEmpaque.innerHTML = `Contenido: ${producto.contenido}`;

        const marca = document.createElement('p');
        marca.classList.add('marca');
        marca.innerText = `Marca: ${producto.marca}`;

        const stock = document.createElement('p');
        stock.classList.add('stock');
        stock.innerText = `Stock: ${producto.stock} unidades`;

        tarjeta.appendChild(contImg);
        contImg.appendChild(imagen);

        tarjeta.appendChild(contenido);
        contenido.appendChild(nombre);
        contenido.appendChild(precio);

        tarjeta.appendChild(detalles);
        detalles.appendChild(contenidoEmpaque);
        detalles.appendChild(marca);
        detalles.appendChild(stock);

        tarjetasContainer.appendChild(tarjeta);
        cont++;

    });
}).catch(error => console.error('Error al obtener datos:', error));