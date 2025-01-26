
/* menu desplegable */
let menu = document.querySelector('#menu-icon');
let menulist = document.querySelector('.menulist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    menulist.classList.toggle('open');
};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    menulist.classList.remove('open');
};
/* Audio en imagenes */
const imagenes = document.querySelectorAll('.imagen');

imagenes.forEach(imagen => {
    const tiempo = parseFloat(imagen.getAttribute('data-time'));
    const audioSrc = imagen.getAttribute('data-audio');

    const audio = new Audio(audioSrc);

    imagen.addEventListener('mouseover', function(){
        audio.currentTime = tiempo;
        audio.play();
    });

    imagen.addEventListener('mouseout', function(){
        audio.pause();
        audio.currentTime = tiempo;
    });
});
/* auto video */
const videos = document.querySelectorAll('video');

videos.forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0;
    });
});
