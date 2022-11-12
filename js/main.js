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
  <li class="characters__Article" >
  <article class="characters__Article__Item">
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
    // const element = array[index];
    charactersList.innerHTML += renderFirstCharacter (characters[i]); 
  }
}


//API
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    characters = data;
    renderCharacters ();
  });
