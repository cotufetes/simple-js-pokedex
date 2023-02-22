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

for (let pokemon = 0; pokemon < pokemonList.length; pokemon++) {
  if (pokemonList[pokemon].height >= 1.5) {
    document.write('<h3>' + pokemonList[pokemon].name + '</h3> <p>> Height: ' + pokemonList[pokemon].height + ' m - <b>Wow, that\'s big!</b></p>');
  } else {
    document.write('<h3>' + pokemonList[pokemon].name + '</h3> <p>> Height: ' + pokemonList[pokemon].height + ' m</p>');
  }
}