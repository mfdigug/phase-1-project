//variables
const pokemonCard = document.querySelector("#pokemon-card")
const pokemonList = document.querySelector("#pokemon-list")
const pokemonName = document.querySelector("#pokemon-name")
const pokemonId = document.querySelector("#pokemon-id")
const pokemonType = document.querySelector("#pokemon-type")
const pokemonAttacks = document.querySelector("#attack-list")
const welcomeMessage = document.querySelector("#welcome-message")
const pokemonImg = document.querySelector("#display-pokemon-img")
const error = document.querySelector(".error")
const form = document.querySelector("form")


//button variables
const fireButton = document.querySelector("#fire")
const waterButton = document.querySelector("#water")
const grassButton = document.querySelector("#grass")
const electricButton = document.querySelector("#electric")


//display functions

function listPokemon(pokemon) {
   pokemonCard.classList.add('initial-render');
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
      pokemonCard.classList.remove('initial-render')
      welcomeMessage.innerHTML = "";
      pokemonCard.classList.add('pokemon-card')
      pokemonImg.classList.remove('hidden')

      //info for display
      pokemonName.innerText = displayPokemon.name
      pokemonId.innerText = "No: " + displayPokemon.id 
      pokemonType.innerText = "Type: " + displayPokemon.type
      pokemonImg.src = displayPokemon.img
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

function handleSubmitNewPokemon(e){
   e.preventDefault();
   console.log(e)
   console.log(e.target.newPokeId.value)
   console.log(e.target.newPokeName.value);
   console.log(e.target.newPokeType.value)
}

//eventListeners

let id = 0;
//arrow keys
document.addEventListener('keydown', (e) => {
      if (e.key === "ArrowDown") {   
         id += 1;
         fetchPokemonForDisplay(id)
      } else if (e.key === "ArrowUp") {
         id -= 1;
         fetchPokemonForDisplay(id)
      }  
   })

//filter buttons
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

fetch("http://localhost:3000/pokemon")
.then(res => res.json())
.then(pokemon => listPokemon(pokemon))


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


