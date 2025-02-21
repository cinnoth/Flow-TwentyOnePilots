const form = document.getElementById("letras__form");
const search = document.getElementById("buscar");
const result = document.getElementById("resultados");

const apiURL = "https://api.lyrics.ovh";


form.addEventListener("submit", e =>{
    e.preventDefault();
    searchValue = search.value.trim();

    if(!searchValue){
        alert("Sin resultados.")
    } else{
        beginSearch(searchValue)
    }
});

// Funcion de buscar
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    displayData(data);
}

//Resultados de busqueda
function displayData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}">Letra</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

// Obtener las letras
result.addEventListener("click", e => {
    const clickedElement = e.target;

    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`;
}

