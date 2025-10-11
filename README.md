This is my read me file for my pokedex card app

When this page loads using the db.json file for data, the user should get a welcome message and see a list of existing pokemon in the database.

The user should be able to view more detailed information about each pokemon by either:
- clicking on a pokemon name in the left hand side list OR
- pressing the up or down arrow keys to navigate through pokemon ids
Either action should reveal more information about the pokemon including its type, stats, attacks and an image.

The user can filter the list of pokemon by type by clicking on one of the type buttons in the header nav menu.

The user can add a newly captured pokemon by adding information into the 'Add a Pokemon' form in the footer and clicking 'submit'. This will trigger:
- a push request to the db.json file, adding a pokemon to the database (persisting) - this means the pokemon will also appear in the list on the left hand side and the card can be navigated to using the above mentioned events (click, keypress)
- an alert to confirm for the user they have 'caught' the newly added pokemon
- call renderPokemon so they can see the pokemon they just added


Credits

Pokemon stats and images drawn from: https://pokemondb.net/pokedex/

Pokemon ball icon 
<a href="https://www.flaticon.com/free-icons/pokeball" title="pokeball icons">Pokeball icons created by Nikita Golubev - Flaticon</a>

Pokemon type icons:
https://bulbapedia.bulbagarden.net/wiki/Type#In_the_TCG