//variables

const pokemonCard = document.querySelector("#pokemon-card")
const pokemonList = document.querySelector("#pokemon-list")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const pokemonType = document.querySelector("#pokemon-type")
const pokemonAttacks = document.querySelector("#attack-list")
const welcomeMessage = document.querySelector("#welcome-message")
//const pokemonImg = document.querySelector("#display-pokemon-img")

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
      welcomeMessage.classList.add('hidden')

      //info for display
      pokemonName.innerText = displayPokemon.name
      pokemonId.innerText = "No: " + displayPokemon.id 
      pokemonType.innerText = "Type: " + displayPokemon.type
      
      const pokemonImg = document.createElement("img")
      pokemonImg.src = displayPokemon.img
      pokemonCard.append(pokemonImg)
   }


//fetch requests
fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))

function fetchPokemonForDisplay(pokemonId) {
      fetch(`http://localhost:3000/pokemon/${pokemonId}`)
      .then(res => res.json())
      .then(displayPokemon => renderPokemon(displayPokemon))
   
   }