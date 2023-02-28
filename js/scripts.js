//Open Pokedex
document.write('<div class="pokedex"> <div class="screen">');


//Pokemon list
let pokemonList = [];

pokemonList = [
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
  type: ['fire']
  },
  {
  name: 'Charmeleon',
  height: 1.1,
  type: ['fire']
  },
  {
  name: 'Charizard',
  height: 1.7,
  type: ['fire',' flying']
  },
  {
  name: 'Squirtle',
  height: 0.5,
  type: ['water']
  },
  {
  name: 'Wartortle',
  height: 1,
  type: ['water']
  },
  {
  name: 'Blastoise',
  height: 1.6,
  type: ['water']
  }
];

//Display list
pokemonList.forEach(function(pokemon){

  function pokemonNumber(pokemonIndex) {
    pokemonIndex = pokemonList.indexOf(pokemon);
    return '#' + (pokemonIndex + 1) + ' '
  }
  
  document.write('<div class="one-pokemon"> <h3>' + pokemonNumber() + pokemon.name + '</h3>');
  
  if (pokemon.height > 1.5) {
    document.write('<p> Height: ' + pokemon.height + ' m' + '<span class="big-pokemon"> - Wow, that\'s big!</span></p>');
  } else {
    document.write('<p> Height: ' + pokemon.height + ' m </p>');
  } 

  document.write('<p> Type: ' + pokemon.type + '</p> </div>');
});


//Close Pokedex
document.write('</div></div>');