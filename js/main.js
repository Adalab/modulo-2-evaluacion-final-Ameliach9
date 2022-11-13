"use strict";
//querySelectors

const charactersList = document.querySelector('.js_all_characters');

//Global var
let characters = [];
let favorites = [];

//FUNCTIONS


//Función que pinta para poder pasar parámetros, se usan en el bucle para pintar a todos los personajes
 function renderFirstCharacter (character){
  return `
  <li class="characters__Article js_characters" >
  <article class="characters__Article__Item" id="=${character.char_id}">
      <img src="${character.img}" alt="" class="characters__img">
      <h3 class="characters__name">${character.name}</h3>
      <p class="characters__status">${character.status}</p>
  </article>
  </li>`;
}

charactersList.innerHTML = '';

//bucle recorre el array y va pintando a todos los personajes 
function renderCharacters (){ 
  for (let i= 0; i < characters.length; i++) {
    charactersList.innerHTML += renderFirstCharacter (characters[i]); 
  }
  const charactersArticle = document.querySelectorAll('.js_characters');
  for( const eachCharacterArticle of charactersArticle)
  eachCharacterArticle.addEventListener('click', handleClickCharacters);
}


//el querySelectorAll crea un array con todos los elementos article de cada personaje 
//se crea un bucle for para poner un event listener a cada article 
// arriba se le asigna la clase a todos los article que se generan
//se crea el evento al que se le va a añadir el listener
function handleClickCharacters(event) {
event.currentTarget.classList.toggle('selected');
console.log(event.currentTarget.char_id);

const selectedCharacter = characters.find(  
  (eachCharacterObj)  => eachCharacterObj.id === event.currentTarget.char_id);

console.log(selectedCharacter);
favorites.push(selectedCharacter);

//renderFavoriteCharacters(); usaré esto como función luego 
}


//API
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    characters = data;
    renderCharacters ();
  });

  //Events
