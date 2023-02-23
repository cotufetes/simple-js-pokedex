//HTML variables
let pokedexOpen = '<div class="pokedex">';
let screenOpen = '<div class="screen">';
let pokemonOpen = '<div class="one-pokemon">';
let divClose = '</div>';
let headlineOpen = '<h3>';
let headlineClose = '</h3>';
let parOpen = '<p>';
let parClose = '</p>';
let bigPokemonText = '<span class="big-pokemon"> - Wow, that\'s big!</span>';

//Text strings
let pokemonHeightText = 'Height: ';
let heightUnit = ' m';

//Pokemon list
let pokemonList = [];

pokemonList = [
  {
  name: 'Bulbasaur',
  height: 0.7,
  type: ['grass', 'poison']
  },
  {
  name: 'Ivysaur',
  height: 1,
  type: ['grass','poison']
  },
  {
  name: 'Venusaur',
  height: 2,
  type: ['grass','poison']
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
  type: ['fire','flying']
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

//Pokedex

document.write(pokedexOpen + screenOpen);

for (let pokemon = 0; pokemon < pokemonList.length; pokemon++) {
      document.write(pokemonOpen + headlineOpen + pokemonList[pokemon].name + headlineClose + parOpen);
  
  if (pokemonList[pokemon].height >= 1.5) {
    document.write(pokemonHeightText + pokemonList[pokemon].height + heightUnit + bigPokemonText);
  } else {
    document.write(pokemonHeightText + pokemonList[pokemon].height + heightUnit);                  
  }
  
  document.write(parClose + divClose);
}

document.write(divClose + divClose);