'use strict'

/* Variable que se utiliza para el carrusel, aqui se encuentran los 2 modos
automatico y manual*/
var swiper = new Swiper(".inicio-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

var swiper = new Swiper(".productos-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

fetch('http://localhost:3000/CPromos')
.then(response => response.json())
.then(data => {
    
    // Procesar los datos y llenar dinámicamente las tarjetas
    const tarjetasContainer = document.getElementById('box-container');

    console.log(data.length);
    const num = Math.floor(Math.random() * (data.length - 2));

    for (let i = num; i < num+3 && i < data.length; i++) {
        const promo = data[i];
        
        // Crear una tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('box');

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
        boton.href = '../Public/Promociones.html';
        boton.classList.add('btn');
        boton.textContent = 'ver promociones';
        

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

        // Agregar la tarjeta al contenedor
        tarjetasContainer.appendChild(tarjeta);
    }
}).catch(error => console.error('Error al obtener datos:', error));
