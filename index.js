const pokemonCard = document.querySelector(".pokemon-card")



function renderPokemon(pokemon) {
   document.querySelector("#pokemon-name").innerText = pokemon[0].name
   document.querySelector("p").innerText = pokemon[0].type
}


fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => renderPokemon(pokemon))