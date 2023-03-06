//IIFE STARTS
let pokemonRepository = (function () {
  let pokemonArray = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=30';
  
  // Adds pokémon to the list if it's an object with specific keys
  function add(pokemon){ 
    if (typeof pokemon === 'object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonArray.push(pokemon);
    } else {
      console.log('Invalid Pokémon');
    }
  }
  
  //Retrieves list
  function getAll(){ 
    return pokemonArray;
  }
  
  //Creates list items for each pokemon and turns them into buttons
  function addPokemonItem(pokemon){ 
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');
    pokemonItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonItem);

    //Logs pokémon details in the console when their button is clicked
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  //Logs pokémon details in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      console.log(pokemon);
    });
  }

  //Fetches pokémon list from API and adds pokémons as objects
  function loadList() {
    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
  //Returns specific pokémon details 
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      // Adds pokémon details to item
      item.id = details.id;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }
  
  //Makes functions accessible outside IIFE
  return {
    add,
    getAll,
    addPokemonItem,
    loadList,
    loadDetails
  };
})(); //IIFE ENDS

//Displays pokemon list by loading list, then calling getAll & forEach functions and returning created items
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addPokemonItem(pokemon)
  });
});