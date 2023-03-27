//IIFE STARTS
let pokemonRepository = (function () {
  let pokemonArray = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
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
    pokemonItem.classList.add('list-group-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');
    pokemonButton.classList.add('btn');
    pokemonButton.setAttribute('data-toggle', 'modal');
    pokemonButton.setAttribute('data-target', '#pokemonModal');

    pokemonItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonItem);

    //Logs pokémon details in the console when their button is clicked
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  //Logs pokémon details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  //Fetches pokémon list from API and adds pokémons as objects
  function loadList() {
    let listLoader = document.getElementById("list-loader");
    listLoader.removeAttribute('hidden');

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

        listLoader.setAttribute('hidden', '');
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
  
  //Gets data from detailsURL and returns specific pokémon details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(details){
      // Adds pokémon details to item
      item.id = details.id;
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e){
      console.error(e);
    });
  }

  //Displays modal
  function showModal(item) {

    pokemonRepository.loadDetails(item).then(function () {

      //Assigns pokemon details to respective classes
      let pokemonImage = document.querySelector('.pokemon-image');
      pokemonImage.src = item.imageUrl;
      
      let pokemonId = document.querySelector('.pokemon-id');
      pokemonId.innerText = '#' + item.id;

      let pokemonName = document.querySelector('.pokemon-name');
      pokemonName.innerText = item.name;

      let pokemonHeight = document.querySelector('.pokemon-height');
      pokemonHeight.innerText = '> ' + (item.height/10) + ' m';

      let itemTypes = "";
      item.types.forEach(function(types) {
        itemTypes += ["<li>" + types.type.name + "</li>"];
      });
      let pokemonTypes = document.querySelector('.pokemon-types');
      pokemonTypes.innerHTML = itemTypes;
    });

  } //Modal ends

  //Matches search input to pokemon name and hides buttons not matching
  function searchPokemon() {
    let searchInput = document.getElementById('search-input');
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll('.list-group-item');

    allPokemon.forEach(function(pokemon) {
      let pokemonText = pokemon.querySelector('.pokemon-button').innerText.toLowerCase();

      if (pokemonText.includes(searchText)) {
        let searchList = document.querySelector('.pokemon-list');
        searchList.classList.add('search-list');
        pokemon.style.display = 'inline-block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  }  

  //Triggers search function as input is typed
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });
  
  //Makes functions accessible outside IIFE
  return {
    add,
    getAll,
    addPokemonItem,
    loadList,
    loadDetails, 
    showModal
  };
})(); //IIFE ENDS

//Displays pokemon list by loading list, then calling getAll & forEach functions and returning created items
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addPokemonItem(pokemon)
  });
});