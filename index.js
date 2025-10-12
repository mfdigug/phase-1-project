//variables
let allPokemon = []
//fetch data variables


//display variables
const pokemonList = document.querySelector("#pokemon-list")
const welcomeMessage = document.querySelector("#welcome-message")

//pokemon card variables
const pokemonCard = document.querySelector("#pokemon-card")
const header = document.querySelector('#pokemon-card-header')
const typeIcon = document.querySelector('#type-icon')
const pokemonImg = document.querySelector("#display-pokemon-img")
const error = document.querySelector(".error")
const form = document.querySelector("form")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const pokemonType = document.querySelector("#pokemon-type")
const pokemonHeight = document.querySelector("#pokemon-height")
const pokemonWeight = document.querySelector("#pokemon-weight")
const specifications = document.querySelector('#specifications')
const stats = document.querySelector('#stats-list')
const attacks = document.querySelector("#attack-list")
const attack1 = document.querySelector("#attack1")
const attack2 = document.querySelector("#attack2")

//button variables
const allButton = document.querySelector("#all")
const fireButton = document.querySelector("#fire")
const waterButton = document.querySelector("#water")
const grassButton = document.querySelector("#grass")
const electricButton = document.querySelector("#electric")


//initialise
fetchAllPokemon();

//display functions

function listPokemon(allPokemon) {
   pokemonCard.classList.add('initial-render');
   header.classList.add('hidden')
   error.classList.add('hidden')
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
  console.log(displayPokemon)


   // css style changes
   error.classList.add('hidden')
   welcomeMessage.classList.add('hidden');
   pokemonCard.classList.remove('initial-render')
   pokemonCard.classList.remove('hidden')
     pokemonCard.classList.add('pokemon-card')
     header.classList.remove('hidden')
     pokemonImg.classList.remove('hidden')
     typeIcon.classList.remove('hidden')
     specifications.classList.remove('hidden')
     specifications.classList.add('specifications')
     stats.classList.remove('hidden')
     stats.classList.add('stats-list')
     attacks.classList.remove('hidden')
     attacks.classList.add('attack-list')


      //info for display
      pokemonName.innerText = displayPokemon.name;
      pokemonId.innerText = displayPokemon.id; 
     // pokemonType.innerText = "Types: " + displayPokemon.types;
      pokemonHeight.innerText = "Ht: " + displayPokemon.height/10 + "m";
      pokemonWeight.innerText = "Wt: " + displayPokemon.weight/10 + "kg";
      pokemonImg.src = displayPokemon.sprites.front_default

      stats.innerHTML = `
      <div>hp: ${displayPokemon.stats[0].base_stat}</div>
      <div>attack: ${displayPokemon.stats[1].base_stat}</div>
      <div>defense: ${displayPokemon.stats[2].base_stat}</div>
      <div>speed: ${displayPokemon.stats[5].base_stat}</div>
      `
      attack1.innerText = displayPokemon.moves[0].move.name;
      attack2.innerText = displayPokemon.moves[1].move.name;




      if(displayPokemon.types[0].type.name === "grass") {
         pokemonCard.style.backgroundColor = "#a8fd9dff";
         attacks.style.backgroundColor = "green"
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/2/2e/Grass-attack.png";
      } else if (displayPokemon.type === "fire") {
         pokemonCard.style.backgroundColor = "#f68080ff";
         attacks.style.backgroundColor = "red"
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/a/ad/Fire-attack.png"

      } else if (displayPokemon.type === "water") {
         pokemonCard.style.backgroundColor = "#a9deffff";
         attacks.style.backgroundColor = "blue";
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/thumb/1/11/Water-attack.png/40px-Water-attack.png"
      } else if (displayPokemon.type === "electric") {
         pokemonCard.style.backgroundColor = "#f3f592ff";
         attacks.style.backgroundColor = "#c4c709ff";
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/0/04/Lightning-attack.png"
      }


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
allButton.addEventListener('click', (e) => fetchAllPokemon())
fireButton.addEventListener('click', (e) => fetchPokemonByType(e))
waterButton.addEventListener('click', (e) => fetchPokemonByType(e))
grassButton.addEventListener('click', (e) => fetchPokemonByType(e))
electricButton.addEventListener('click', (e) => fetchPokemonByType(e))

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


