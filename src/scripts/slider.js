/* Carrusel */
const btnIzq = document.querySelector(".btn-izq");
const btnDer = document.querySelector(".btn-der");
const slider = document.getElementById("slider");
const seccion = document.querySelectorAll(".carrusel-seccion")

btnIzq.addEventListener("click", e => moverIzquierda());
btnDer.addEventListener("click", e => moverDerecha());

setInterval(() => {
    moverDerecha()
}, 3000)

let operacion = 0;
let contador = 0;
let widthImg = 100 / seccion.length;

function moverDerecha(){
    if(contador >= seccion.length-1){
        contador = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`
        /* slider.style.transition = "none" */
        return;
    } 
        contador ++;
        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`
        slider.style.transition = "all ease .6s"
    
}
function moverIzquierda(){
    contador --;
    if(contador < 0){
        contador = seccion.length-1;
        operacion = widthImg * (seccion.length-1)
        slider.style.transform = `translate(-${operacion}%)`
        /* slider.style.transition = "none" */
        return;
    } 
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`
        slider.style.transition = "all ease .6s"
    
}

/* Para hacer rotar las img */
const discos = document.querySelectorAll('.rotar');

discos.forEach((imagen) => {

    let rotacion = 0; 
    let intervalo;
    
    imagen.addEventListener('mouseover', () => {
        intervalo = setInterval(() => {
            rotacion += 5; 
            imagen.style.transform = `rotate(${rotacion}deg)`;
        }, 25); 
    });
    
    imagen.addEventListener('mouseout', () => {
        clearInterval(intervalo);
    });
})
