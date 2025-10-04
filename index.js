//variables
const pokemonCard = document.querySelector("#pokemon-card")
const pokemonList = document.querySelector("#pokemon-list")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const pokemonType = document.querySelector("#pokemon-type")
const pokemonAttacks = document.querySelector("#attack-list")
const welcomeMessage = document.querySelector("#welcome-message")
const pokemonImg = document.querySelector("#display-pokemon-img")
//button variables
const fireButton = document.querySelector("#fire")
const waterButton = document.querySelector("#water")
const grassButton = document.querySelector("#grass")
const electricButton = document.querySelector("#electric")

//display functions

function listPokemon(pokemon) {
   for (let i = 0; i < pokemon.length; i++) {
   const li = document.createElement("li");
   li.innerText = pokemon[i].name;
   li.dataset.id = pokemon[i].id
   pokemonList.appendChild(li);
   
   li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
   }
}
   

function renderPokemon(displayPokemon) {
      //css style changes
      pokemonCard.classList.remove('initial-render')
      pokemonCard.classList.add('pokemon-card')
      welcomeMessage.innerText = ""
      pokemonImg.classList.remove('hidden')

      //info for display
      pokemonName.innerText = displayPokemon.name
      pokemonId.innerText = "No: " + displayPokemon.id 
      pokemonType.innerText = "Type: " + displayPokemon.type
      pokemonImg.src = displayPokemon.img
}

function updatePokemonList(pokemon) {
   pokemonList.innerText = "";
   for (let i = 0; i < pokemon.length; i++) {
   const li = document.createElement("li");
   li.innerText = pokemon[i].name;
   li.dataset.id = pokemon[i].id
   pokemonList.appendChild(li);
   
   li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
   }
}

//eventListeners

fireButton.addEventListener('click', (e) => fetchPokemonByType(e))
waterButton.addEventListener('click', (e) => fetchPokemonByType(e))
grassButton.addEventListener('click', (e) => fetchPokemonByType(e))
electricButton.addEventListener('click', (e) => fetchPokemonByType(e))

//fetch requests
fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))

function fetchPokemonForDisplay(pokemonId) {
      fetch(`http://localhost:3000/pokemon/${pokemonId}`)
      .then(res => res.json())
      .then(displayPokemon => renderPokemon(displayPokemon))
   
}

function fetchPokemonByType(e) {
   fetch("http://localhost:3000/pokemon")
   .then(res => res.json())
   .then(pokemon => {
         const pokemonByType = pokemon.filter((pokemon) =>
         pokemon.type === e.target.id)
         updatePokemonList(pokemonByType)

   })
}
