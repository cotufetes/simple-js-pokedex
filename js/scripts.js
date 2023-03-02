//IIFE to stabilise Pokémon list
let pokemonRepository = (function () {
  let pokemonArray = [
    {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass', ' poison']
    },
    {
      name: 'Ivysaur',
      height: 1,
      type: ['grass',' poison']
      },
    {
    name: 'Venusaur',
    height: 2,
    type: ['grass',' poison']
    },
    {
    name: 'Charmander',
    height: 0.6,
    type: 'fire'
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      type: 'fire'
      },
    {
    name: 'Charizard',
    height: 1.7,
    type: ['fire',' flying']
    },
    {
    name: 'Squirtle',
    height: 0.5,
    type: 'water'
    },
    {
      name: 'Wartortle',
      height: 1,
      type: 'water'
      },
    {
    name: 'Blastoise',
    height: 1.6,
    type: 'water'
    }
  ];
  
  // Add pokémon to the list if it's an object with specific keys
  function add(pokemon){ 
    if (typeof pokemon === 'object' &&
       'name' in pokemon &&
       'height' in pokemon &&
       'type' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokémon');
    }
  }
  
  //Retrieve list
  function getAll(){ 
    return pokemonArray;
  }
  
  //Create list items for each pokemon and display them as buttons
  function addPokemonItem(pokemon){ 
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');
    pokemonItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonItem);
  };
  
  return {
    add,
    getAll,
    addPokemonItem
  };
})();

//Display pokemon list by calling getAll & forEach functions and returning created items
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addPokemonItem(pokemon)
});