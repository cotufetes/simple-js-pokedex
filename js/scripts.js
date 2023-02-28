//IIFE to stabilise Pokémon list
let pokemonRepository = (function () {
  let pokemonList = [
    {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass', ' poison']
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
    name: 'Blastoise',
    height: 1.6,
    type: 'water'
    }
  ];
  
  function add(pokemon){
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }
  
  function getAll(){
    return pokemonList;
  }
  
  return {
    add,
    getAll
  };
})();

//Example of adding a Pokémon to the list
pokemonRepository.add({
  name: 'Caterpie',
  height: 0.3,
  type: 'bug'
});

//forEach function to show each pokemon
function showPokemon(pokemon){
  document.write('<div class="one-pokemon"><h3>' + pokemon.name + '</h3>');
  
  if (pokemon.height > 1.5) {
    document.write('<p>Height: ' + pokemon.height + ' m' + '<span class="big-pokemon"> - Wow, that\'s big!</span></p>');
  } else {
    document.write('<p>Height: ' + pokemon.height + ' m</p>');
  } 

  document.write('<p>Type: ' + pokemon.type + '</p></div>');
};

//Open Pokédex
document.write('<div class="pokedex"><div class="screen">');

//Display list by calling getAll & forEach functions
pokemonRepository.getAll().forEach(showPokemon);

//Close Pokédex
document.write('</div></div>');