const tarjetasContainer = document.getElementById('box-container');
const mostrarMasButton = document.getElementById('mostrarMas');

let cont = 0;
const tarjetasPorMostrar = 4; // Número de tarjetas para mostrar inicialmente y en cada clic de "Mostrar más"

const mostrarSiguientesTarjetas = () => {
    const tarjetasOcultas = document.querySelectorAll('.box.hidden');
   
    
    tarjetasOcultas.forEach(tarjeta => {
        if (cont < tarjetasPorMostrar) {
            tarjeta.classList.remove('hidden');
            cont++;
        }
    });

    // Ocultar el botón "Mostrar más" si se han mostrado todas las tarjetas
    if (cont >= tarjetasOcultas.length && tarjetasOcultas.length == 0) {
        mostrarMasButton.style.display = 'none';
    }else{
        tarjetasOcultas.forEach( tarjeta =>{
            if(tarjetasOcultas.length <= 4){
                tarjeta.classList.remove('hidden');
            }
        });
        
    }
};

mostrarMasButton.addEventListener('click', mostrarSiguientesTarjetas);

function mostrarInfo(btn) {
    var box = btn.parentNode.parentNode;
    var details = box.querySelector('.details');
    if (btn.innerText == 'Ver Producto') {
        details.style.height = '120px';
        btn.innerText = 'Ver Menos';
    } else {
        details.style.height = '0px';
        btn.innerText = 'Ver producto';
    }
}



fetch('http://localhost:3000/CPromos')
.then(response => response.json())
.then(data => {
    
    // Procesar los datos y llenar dinámicamente las tarjetas
    const tarjetasContainer = document.getElementById('box-container');
    let cont = 0;
    console.log(data.length);

    data.forEach(promo=> {
        // Crear una tarjeta
        const tarjeta = document.createElement('div');
        
        if(cont < 4){ tarjeta.classList.add('box'); }
        else { tarjeta.classList.add('box', 'hidden'); }

        const imagen = document.createElement('img');
        imagen.src = "../../Images/Productos/"+promo.nombre+".png";
        
        const contenido = document.createElement('div');
        contenido.classList.add('content');

        const nombre = document.createElement('h3');
        const icono = document.createElement('i');
        icono.classList.add('fa', 'fa-shopping-cart');

        const texto = document.createElement('span');
        texto.innerText = `  ${promo.nombre}`;

        const descrip = document.createElement('div');
        descrip.classList.add('descripcion');
        descrip.textContent = promo.descripcion;

        const fechas = document.createElement('div');
        fechas.classList.add('fechas');
        
        const fechaInicio = document.createElement('span');
        fechaInicio.classList.add('fecha_inicio');
        fechaInicio.textContent = `Fecha de inicio: ${promo.fecha_inicio}`;

        const salto = document.createElement('br');

        const fechaFinal = document.createElement('span');
        fechaFinal.classList.add('fecha_final');
        fechaFinal.textContent = `Fecha de termino: ${promo.fecha_final}`;

        const boton = document.createElement('a');
        boton.classList.add('btn');
        boton.setAttribute("onclick", "mostrarInfo(this)");
        boton.innerText = 'Ver producto';

        const details = document.createElement('div');
        details.classList.add('details');
        details.id = 'details';

        const precioNormal = document.createElement('h3');
        precioNormal.classList.add('precio');
        precioNormal.innerText = `Precio regular: $${promo.precio}`; 

        const contenidoEmpaque = document.createElement('h3');
        contenidoEmpaque.classList.add('contenido');
        contenidoEmpaque.innerText = `Contenido: ${promo.contenido}`;

        const marca = document.createElement('p');
        marca.classList.add('marca');
        marca.innerText = promo.marca;

        const stock = document.createElement('p');
        stock.classList.add('stock');
        stock.innerText = `Stock: ${promo.stock} en existencia`;
               

        // Agregar elementos a la tarjeta
        tarjeta.appendChild(imagen);
        tarjeta.appendChild(contenido);
        nombre.appendChild(icono);
        nombre.appendChild(texto);
        contenido.appendChild(nombre);
        contenido.appendChild(descrip);
        contenido.appendChild(fechas);
        fechas.appendChild(fechaInicio);
        fechas.appendChild(salto);
        fechas.appendChild(fechaFinal);
        contenido.appendChild(boton);

        tarjeta.appendChild(details);
        details.appendChild(precioNormal);
        details.appendChild(contenidoEmpaque);
        details.appendChild(marca);
        details.appendChild(stock);

        // Agregar la tarjeta al contenedor
        tarjetasContainer.appendChild(tarjeta);
        cont++;

    });
}).catch(error => console.error('Error al obtener datos:', error));

/**
 * .box:hover .details {
    height: 120px;
}
 */
