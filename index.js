//variables
let allPokemon = []

let displayedPokemon


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


function listPokemon(pokeData) {
   
    welcomeMessageContainer.innerHTML = `<p class="welcome-message"> 
    Welcome to the world of Pokemon! 
    </p>`

      const li = document.createElement("li");
        li.innerText = pokeData.name;
        li.dataset.id = pokeData.id;
        li.dataset.type = pokeData.types[0].type.name
        pokemonList.appendChild(li);

        li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
     }


   function listPokemonByType(pokeData) {

       const li = document.createElement("li");
         li.innerText = pokeData.name;
         li.dataset.id = pokeData.id;
         li.dataset.type = pokeData.types[0].type.name
         pokemonList.appendChild(li);

         li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
   }



       

function renderPokemon(displayPokemon) {
    displayedPokemon = displayPokemon
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
      fetchPokemonByType(e.target.value)
   }
   )

//populate sidebar pokemon list
// function updatePokemonList(pokemon) {
//    pokemonList.innerText = "";
//    for (let i = 0; i < pokemon.length; i++) {
//    const li = document.createElement("li");
//    li.innerText = pokemon[i].name;
//    li.dataset.id = pokemon[i].id
//    pokemonList.appendChild(li);
   
//    li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id))
//    }
// }


//catch a new pokemon
// function handleSubmitNewPokemon(e){
//    e.preventDefault();
//    const newPokemon = {
//       "id" : e.target.newPokeId.value,
//       "name" : e.target.newPokeName.value,
//       "type" : e.target.newPokeType.value,
//       "img" : e.target.newPokePic.value
//    }

//    addNewPokemon(newPokemon)
//    renderPokemon(newPokemon)
// }

//eventListeners


//filter buttons
// allButton.addEventListener('click', (e) => fetchAllPokemon())
//fireButton.addEventListener('click', (e) => console.log(e))
// waterButton.addEventListener('click', (e) => fetchPokemonByType(e))
// grassButton.addEventListener('click', (e) => fetchPokemonByType(e))
// electricButton.addEventListener('click', (e) => fetchPokemonByType(e))

//form submission
form.addEventListener('submit', (e) => handleSubmitNewPokemon(e))



//error function
// function renderUncaught(pokemonId) {
//    error.classList.remove('hidden')
//    error.innerText = "Pokemon no. " + pokemonId + " not yet caught"
// }


//fetch requests
function fetchAllPokemon() {
fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
.then(res => res.json())
.then(data => {
   data.results.forEach(function(pokemon){
    fetchPokemonData(pokemon)
   })
})
}


function fetchPokemonData(pokemon){
      let url = pokemon.url
    fetch(url)
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
      //console.log(pokeData
      listPokemonByType(pokeData)
    })      
}







 







   
   
 


// function addNewPokemon(newPokemon){
// fetch('http://localhost:3000/pokemon',{
//       method: 'POST',
//       headers: {
//          'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(newPokemon)
//    }).then(res => res.json())
//    .then(newPokemon => alert("You caught " + newPokemon.name))
// }
