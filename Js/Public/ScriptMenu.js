'use strict'

/* Variables para la navegacion del menu hamburguesa, utilizado para que la pagina sea responsiva*/
let menu = document.querySelector('#menu-bar');
let navmenu = document.querySelector('.navbar');

/* Evento del menu*/
menu.addEventListener('click', ()=>{
    menu.classList.toggle('fa-times');
    navmenu.classList.toggle('active');
});

function cerrarSesion(){
    // Redirige a la página de inicio o login
    window.location.replace("../Public/Accede.html");

    // Elimina la opción de regresar a la página donde la sesión estaba abierta
    if (history.replaceState) {
        history.replaceState({}, document.title, window.location.href);
    }
}