const pokemonCard = document.querySelector(".pokemon-card")
const pokemonList = document.querySelector("#pokemon-list")
const pokemonName = document.querySelector("#pokemon-name")


function renderPokemon(pokemon) {
   pokemonName.innerText = pokemon[0].name;
   
}

function listPokemon(pokemon) {
   for (let i = 0; i < pokemon.length; i++) {
   const li = document.createElement("li");
   li.innerText = pokemon[i].name;
   pokemonList.appendChild(li);
   }  
}

fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))

fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => renderPokemon(pokemon))