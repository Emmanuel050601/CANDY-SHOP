// Obtén referencias a los elementos relevantes
const contenedorExterno = document.getElementById('contenedor-seleccion');
const divInterno = document.getElementById('seleccion');

// Ajusta la posición del div interno al hacer scroll
window.addEventListener('scroll', function () {
    const posicionScroll = window.scrollY;
  
    // Calcula los límites del desplazamiento dentro del contenedor
    const limiteSuperior = 0;
    const limiteInferior = contenedorExterno.clientHeight - divInterno.clientHeight;
  
    // Ajusta la posición superior del div interno dentro de los límites
    divInterno.style.top = `${Math.min(Math.max(posicionScroll-90, limiteSuperior), limiteInferior)}px`;
});
