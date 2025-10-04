const pokemonCard = document.querySelector(".pokemon-card")
const pokemonList = document.querySelector("#pokemon-list")
const pokemonName = document.querySelector("#pokemon-name")




function listPokemon(pokemon) {
   for (let i = 0; i < pokemon.length; i++) {
   const li = document.createElement("li");
   li.innerText = pokemon[i].name;
   li.dataset.id = pokemon[i].id
   pokemonList.appendChild(li);
   

   li.addEventListener('click', (e) => console.log(e))
   }   
   //function fetchPokemonforDisplay(pokemonForDisplay) {
   //   fetch(`http://localhost:3000/pokemon/${pokemonForDisplay}`)
   //   .then(res => res.json())
    //  .then(displayPokemon => console.log(displayPokemon))
   
   //}

   //function renderPokemon(pokemonForDisplay) {
   //   pokemonName.innerText = pokemonForDisplay;
   //}

}

fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))