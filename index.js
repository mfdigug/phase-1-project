//variables
let allPokemon = []
let displayedPokemon

//display variables
const pokemonList = document.querySelector("#pokemon-list")
const welcomeMessageContainer = document.querySelector(".welcome-message-container")

//pokemon card variables
const pokemonCard = document.querySelector("#pokemon-card")


//initialise
fetchAllPokemon();

function listPokemon(pokeData) {
  
    welcomeMessageContainer.innerHTML = `<p class="welcome-message"> 
    Welcome to the world of Pokemon! 
    </p>`

      const li = document.createElement("li");
      li.innerText = pokeData.name;
      li.dataset.id = pokeData.id;
      li.dataset.type = pokeData.types[0].type.name
      pokemonList.appendChild(li);
   if(welcomeMessageContainer.classList.contains('hidden')){
      fetchPokemonForDisplay(pokemonList.firstElementChild.dataset.id)
      }
      li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
     }
       

function renderPokemon(displayPokemon) {
   displayedPokemon = displayPokemon;

    //clear type classes from previous renders
    pokemonCard.classList.remove('normal', 'water', 'fire', 'electric', 'grass', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy');

   //css changes
   welcomeMessageContainer.classList.add('hidden');
   pokemonCard.classList.remove('hidden')
   pokemonCard.classList.add('pokemon-card')
   pokemonCard.classList.add(displayPokemon.types[0].type.name) 
  
   //pokemon card content
   pokemonCard.innerHTML = `
      <div id="pokemon-card-header">
      <div id="type-icon"></div>
      <h2 id="pokemon-name"> ${displayPokemon.name}</h2>
      </div>

      <img id="display-pokemon-img" src="${displayPokemon.sprites.front_default}">

      <div id="specifications">
      No: ${displayPokemon.id}
      Type: ${displayPokemon.types[0].type.name}
      Ht: ${displayPokemon.height/10}m
      Wt: ${displayPokemon.weight/10}kg
      </div>

      <div id="stats-list">

      hp: ${displayPokemon.stats[0].base_stat}
      <div class="stats-container"><div class="hp-fill" style="width:${displayPokemon.stats[0].base_stat}%"></div></div><br>
     
      attack: ${displayPokemon.stats[1].base_stat}
      <div class="stats-container"><div class="attack-fill" style="width:${displayPokemon.stats[1].base_stat}%"></div></div><br>

      defense: ${displayPokemon.stats[2].base_stat}
      <div class="stats-container"><div class="defense-fill" style="width:${displayPokemon.stats[2].base_stat}%"></div></div><br>

      speed: ${displayPokemon.stats[5].base_stat}
      <div class="stats-container"><div class="speed-fill" style="width:${displayPokemon.stats[5].base_stat}%"></div></div>
      </div>

      <div id="attack-list">
      &#8213; ${displayPokemon.moves[0].move.name} &#8213;<br>
      &#8213; ${displayPokemon.moves[1].move.name} &#8213;
      </div>
   `
};

//global event listeners
document.addEventListener('keydown', (e) => {   
   if (!displayedPokemon) {
      fetchPokemonForDisplay(1)
      } else if (displayedPokemon && e.key === "ArrowDown") {
      let newId = displayedPokemon.id + 1
      fetchPokemonForDisplay(newId)  
      } else if (displayedPokemon && e.key === "ArrowUp") {
      let newId = displayedPokemon.id - 1
      fetchPokemonForDisplay(newId) 
      }
   })


   document.getElementById('pokemon-types').addEventListener('change', (e) => {
      pokemonList.innerHTML = ""
      if(e.target.value === "all"){
         fetchAllPokemon()
      } else {
      fetchPokemonByType(e.target.value)
      }}
   )



//fetch requests
function fetchAllPokemon() {
fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
.then(res => res.json())
.then(data => {
   data.results.forEach(pokemon => {
         fetchPokemonData(pokemon)
      })
   })
}

function fetchPokemonData(pokemon){
    fetch(pokemon.url)
    .then(res => res.json())
    .then(pokeData => {
      listPokemon(pokeData)
   })      
}

function fetchPokemonForDisplay(id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(displayPokemon => renderPokemon(displayPokemon))
}

function fetchPokemonByType(selectedType) {
   fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
   .then(res => res.json())
   .then(data => {
      data.results.forEach(function(pokemon){
    fetchPokemonDataByType(pokemon, selectedType)
   })
})
}

function fetchPokemonDataByType(pokemon, selectedType) {
   let url = pokemon.url
    fetch(url)
    .then(res => res.json())
    .then(pokeData => {
      if(pokeData.types[0].type.name === selectedType)
      listPokemon(pokeData)
    })      
}

