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

  //Logs pokémon details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
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

      //Adds visibility class to modal container
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.add('is-visible');

      //Closes modal when clicking x button
      let closeButtonElement = document.querySelector('.modal-close');
      closeButtonElement.addEventListener('click', hideModal);

      //Closes modal when clicking on overlay
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    });
  } //Modal ends

  //Removes visibility class from modal
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //Closes modal when pressing ESC key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
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