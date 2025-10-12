//variables
let allPokemon = []
//fetch data variables


//display variables
const pokemonList = document.querySelector("#pokemon-list")
const welcomeMessageContainer = document.querySelector(".welcome-message-container")

//pokemon card variables
const pokemonCard = document.querySelector("#pokemon-card")
const form = document.querySelector("form")

//button variables
// const allButton = document.querySelector("#all")
// const fireButton = document.querySelector("#fire")
// const waterButton = document.querySelector("#water")
// const grassButton = document.querySelector("#grass")
// const electricButton = document.querySelector("#electric")


//initialise
fetchAllPokemon();

//display functions
function listPokemon(allPokemon) {
   console.log(allPokemon)
   
   welcomeMessageContainer.innerHTML = `<p class="welcome-message"> 
   Welcome to the world of Pokemon! 
   </p>`

   for (let i = 0; i < allPokemon.length; i++) {
      const li = document.createElement("li");
      li.innerText = allPokemon[i].name;
      li.dataset.url = allPokemon[i].url;
      pokemonList.appendChild(li);
      
      li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.url)
      )
   }

}
   

function renderPokemon(displayPokemon) {
   
   //clear type classes from previous renders
   pokemonCard.classList.remove('normal', 'water', 'fire', 'electric', 'grass', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy');
   //new variables
   let pokemonType1 = displayPokemon.types[0].type.name;
   //css changes
   welcomeMessageContainer.classList.add('hidden');
   pokemonCard.classList.remove('hidden')
   pokemonCard.classList.add('pokemon-card')
   pokemonCard.classList.add(pokemonType1) 
  
   //pokemon card content
   pokemonCard.innerHTML = `
      <div id="pokemon-card-header">
      <div id="type-icon"></div>
      <h2 id="pokemon-name"> ${displayPokemon.name}</h2>
      </div>

      <img id="display-pokemon-img" src="${displayPokemon.sprites.front_default}">

      <div id="specifications">
      No: ${displayPokemon.id}
      Type: ${pokemonType1}
      Ht: ${displayPokemon.height/10}m
      Wt: ${displayPokemon.weight/10}kg
      </div>

      <div id="stats-list">
      hp: ${displayPokemon.stats[0].base_stat} <br>
      attack: ${displayPokemon.stats[1].base_stat} <br>
      defense: ${displayPokemon.stats[2].base_stat} <br>
      speed: ${displayPokemon.stats[5].base_stat} <br>
      </div>

      <div id="attack-list">
      ${displayPokemon.moves[0].move.name}
      ${displayPokemon.moves[1].move.name}
      </div>
   `
};

//populate sidebar pokemon list
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


//catch a new pokemon
function handleSubmitNewPokemon(e){
   e.preventDefault();
   const newPokemon = {
      "id" : e.target.newPokeId.value,
      "name" : e.target.newPokeName.value,
      "type" : e.target.newPokeType.value,
      "img" : e.target.newPokePic.value
   }

   addNewPokemon(newPokemon)
   renderPokemon(newPokemon)
}

//eventListeners

//using up and down arrow keys
let id = 0;
document.addEventListener('keydown', (e) => {
      if (pokemonId.innerText <= 0) {
         pokemonId.innerText = 1
         fetchPokemonForDisplay(pokemonId.innerText)
      } else if (e.key === "ArrowDown") {   
         id = parseInt(pokemonId.innerText, 10)
         id += 1;
         pokemonId.innerText = id;
         fetchPokemonForDisplay(pokemonId.innerText)   
      } else if (e.key === "ArrowUp") {
         id = parseInt(pokemonId.innerText, 10)
         id -= 1;
         pokemonId.innerText = id;
         fetchPokemonForDisplay(pokemonId.innerText)   
      }  
   })

//filter buttons
// allButton.addEventListener('click', (e) => fetchAllPokemon())
// fireButton.addEventListener('click', (e) => fetchPokemonByType(e))
// waterButton.addEventListener('click', (e) => fetchPokemonByType(e))
// grassButton.addEventListener('click', (e) => fetchPokemonByType(e))
// electricButton.addEventListener('click', (e) => fetchPokemonByType(e))

//form submission
form.addEventListener('submit', (e) => handleSubmitNewPokemon(e))



//error function
function renderUncaught(pokemonId) {
   error.classList.remove('hidden')
   error.innerText = "Pokemon no. " + pokemonId + " not yet caught"
}


//fetch requests
function fetchAllPokemon() {
fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
.then(res => res.json())
.then(data => {
   allPokemon = data.results;
   listPokemon(allPokemon)
})
}

function fetchPokemonForDisplay(displayPokemonURL) {
      fetch(`${displayPokemonURL}`)
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

function addNewPokemon(newPokemon){
fetch('http://localhost:3000/pokemon',{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newPokemon)
   }).then(res => res.json())
   .then(newPokemon => alert("You caught " + newPokemon.name))
}


