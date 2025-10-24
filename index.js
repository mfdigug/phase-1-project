//global content variables
let allPokemon = []
let displayedPokemon
let pokemonByType = []

//DOM variables
const pokemonList = document.querySelector("#pokemon-list")
const welcomeMessageContainer = document.querySelector(".welcome-message-container")
const pokemonCard = document.querySelector("#pokemon-card")


//initialise
fetchAllPokemon();


//display functions
function listPokemon(pokeData) {
 
   welcomeMessageContainer.innerHTML = `<p class="welcome-message"> 
   Welcome to the world of Pokemon! 
   </p>`

   const li = document.createElement("li");
   li.innerText = pokeData.name;
   pokemonList.appendChild(li);
   li.addEventListener('click', (e) => renderPokemon(e.target.textContent))
      
   if(welcomeMessageContainer.classList.contains('hidden')){
      renderPokemon(pokemonList.firstElementChild.textContent)
   }
      
}
       

function renderPokemon(displayPokemon) {
   displayedPokemon = allPokemon.find(pokeData => pokeData.name === displayPokemon)
   let secondType
   if(displayedPokemon.types[1]) {
   secondType = displayedPokemon.types[1].type.name
   } else {
      secondType = ""
   }
   
   //clear type classes from previous renders
   pokemonCard.classList.remove('normal', 'water', 'fire', 'electric', 'grass', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy');
   
   //css changes
   welcomeMessageContainer.classList.add('hidden');
   pokemonCard.classList.remove('hidden')
   pokemonCard.classList.add('pokemon-card')
   pokemonCard.classList.add(displayedPokemon.types[0].type.name) 
  
   //pokemon card content
   pokemonCard.innerHTML = `
      <div id="pokemon-card-header">
      <div id="type-icon"></div>
      <h2 id="pokemon-name"> ${displayedPokemon.name}</h2>
      </div>

      <img id="display-pokemon-img" src="${displayedPokemon.sprites.front_default}">

      <div id="specifications">
      No: ${displayedPokemon.id}
      Ht: ${displayedPokemon.height/10}m
      Wt: ${displayedPokemon.weight/10}kg <br>
      Type(s): ${displayedPokemon.types[0].type.name} ${secondType}
      </div>

      <div id="stats-list">

      hp: ${displayedPokemon.stats[0].base_stat}
      <div class="stats-container"><div class="hp-fill" style="width:${displayedPokemon.stats[0].base_stat}%"></div></div><br>
     
      attack: ${displayedPokemon.stats[1].base_stat}
      <div class="stats-container"><div class="attack-fill" style="width:${displayedPokemon.stats[1].base_stat}%"></div></div><br>

      defense: ${displayedPokemon.stats[2].base_stat}
      <div class="stats-container"><div class="defense-fill" style="width:${displayedPokemon.stats[2].base_stat}%"></div></div><br>

      speed: ${displayedPokemon.stats[5].base_stat}
      <div class="stats-container"><div class="speed-fill" style="width:${displayedPokemon.stats[5].base_stat}%"></div></div>
      </div>

      <div id="attack-list">
      &#8213; ${displayedPokemon.moves[0].move.name} &#8213;<br>
      &#8213; ${displayedPokemon.moves[1].move.name} &#8213;
      </div>
   `
};

//global event listeners
document.addEventListener('keydown', (e) => {   
   if (!displayedPokemon) {
      let newDisplayPoke = allPokemon.find(pokeData => pokeData.id === 1)
      renderPokemon(newDisplayPoke.name)
      } else if (displayedPokemon && e.key === "ArrowDown") {
      let newDisplayPoke = allPokemon.find(pokeData => pokeData.id === displayedPokemon.id + 1)
      renderPokemon(newDisplayPoke.name)  
      } else if (displayedPokemon && e.key === "ArrowUp") {
      let newDisplayPoke = allPokemon.find(pokeData => pokeData.id === displayedPokemon.id - 1)
      renderPokemon(newDisplayPoke.name)
      }
   })


   document.getElementById('pokemon-types').addEventListener('change', (e) => {
      pokemonList.innerHTML = ""
      if(e.target.value === "all"){
         allPokemon.forEach(pokeData => listPokemon(pokeData))
      } else {
         pokemonByType = allPokemon.filter(pokeData => pokeData.types[0].type.name === e.target.value)
         pokemonByType.forEach(pokeData => listPokemon(pokeData))
      }}
   )

//fetch requests
async function fetchAllPokemon() {
   const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
   const data = await res.json()
   data.results.forEach(pokemon => {
         fetchPokemonData(pokemon)
   })
}
  
async function fetchPokemonData(pokemon){
   const res = await fetch(pokemon.url)
   const pokeData = await res.json()
   allPokemon = [...allPokemon, pokeData]
   listPokemon(pokeData)
}