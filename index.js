//variables

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

function listPokemon(pokemon) {
   pokemonCard.classList.add('initial-render');
   header.classList.add('hidden')
   error.classList.add('hidden')
   for (let i = 0; i < pokemon.length; i++) {
      const li = document.createElement("li");
      li.innerText = pokemon[i].name;
      li.dataset.id = pokemon[i].id
      pokemonList.appendChild(li);
      
      li.addEventListener('click', (e) => fetchPokemonForDisplay(e.target.dataset.id)
   )}

}
   

function renderPokemon(displayPokemon) {
  
   //css style changes
      error.classList.add('hidden')
      welcomeMessage.innerHTML = "";
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
      pokemonType.innerText = "Type: " + displayPokemon.type;
      pokemonHeight.innerText = "Ht: " + displayPokemon.ht;
      pokemonWeight.innerText = "Wt: " + displayPokemon.wt;
      pokemonImg.src = displayPokemon.img

      stats.innerHTML = `
      <div>hp: ${displayPokemon.hp}</div>
      <div>attack: ${displayPokemon.attack}</div>
      <div>defense: ${displayPokemon.defense}</div>
      <div>speed: ${displayPokemon.speed}</div>
      `
      attack1.innerText = displayPokemon.attack1
      attack2.innerText = displayPokemon.attack2

      if(displayPokemon.type === "grass") {
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/2/2e/Grass-attack.png"
      } else if (displayPokemon.type === "fire") {
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/a/ad/Fire-attack.png"

      } else if (displayPokemon.type === "water") {
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/thumb/1/11/Water-attack.png/40px-Water-attack.png"
      } else if (displayPokemon.type === "electric") {
         typeIcon.src = "https://archives.bulbagarden.net/media/upload/0/04/Lightning-attack.png"
      }


};

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
         fetchPokemonForDisplay(id)
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
fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))
}

function fetchPokemonForDisplay(pokemonId) {
      fetch(`http://localhost:3000/pokemon/${pokemonId}`)
      .then(res => {
         if(res.status !== 200) 
            { renderUncaught(pokemonId) }
            return res.json()
      })
      .then(displayPokemon => renderPokemon(displayPokemon))
      //.catch(err => console.log(err))
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


