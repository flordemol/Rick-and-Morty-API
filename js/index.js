const URL = 'https://rickandmortyapi.com/api/character';
let characters = []; // va a contener todos los personajes globales de la aplicacion

// Trae los personajes de una URL
const fetchCharacters = async (url = URL) => {
   try {
       const response = await fetch(url, {method: 'GET'})
       const { results: characters } = await response.json();
       return characters;
   } catch (err){
        console.error(err);
   }
}

const showMessage = () => {
    // Mostrar mensaje en un span
    document.querySelector('#message').innerHTML = "No hay personajes";
    document.querySelector('#input').disabled = true;
}

const del = (id) => {
    document.getElementById(id).remove();
    // Modifica characters que es global
    characters = characters.filter(character => character.id != id);
    characters.length === 0 ? showMessage() : null;
}


// Parametros, destructuring de characters
const createNode = ({id, image, name, species,gender, status}) => {
    // Columna con info del personaje
    const node = `
        <div class="col-md-4 col-12" id="${id}">
            <div class="card mt-5 ml-3">
                <img src="${image}"/>
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Especie: ${species}</p>
                    <p class="card-text">${status === "Alive" ? "Vivito y coleando" : "Dead"}</p>
                    
                    <button onClick="del(${id})" class="btn btn-danger btn-block">Borrar</button>
                </div>
            </div>
        </div>
    `;
      
    document.getElementById('apiR').insertAdjacentHTML("beforeend", node)
}

// Función encargada de buscar un personaje por nombre
const searchCharacter = () => {
    const {value : name} = document.querySelector('#input');

    document.getElementById('apiR').innerHTML = "";
    const filtrado = [];
    for(let character of characters){
        let char = character.name.toLowerCase();
        if(char.indexOf(name.toLowerCase()) !== -1){
            filtrado.push(character);
        }
    }
    iterateCharacters(filtrado);
}

// Iterate characters
const iterateCharacters = (characters) =>{
    characters.map((character) => {createNode(character)});
}
  

// ... carga el DOM
const start = async () => {
    document.getElementById("find").addEventListener("click", searchCharacter);
    document.querySelector('#input').addEventListener('keyup', searchCharacter);
    characters = await fetchCharacters();
    iterateCharacters(characters);
}

window.onload = start();