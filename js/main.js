"use strict";
//querySelectors

const charactersList = document.querySelector(".js_all_characters");
const favoritesListEl = document.querySelector(".js-favorites");
const searchCharacter = document.querySelector(".js-input");
const form = document.querySelector(".js-form");
const searchBtn = document.querySelector(".js-button");
const resetBtn = document.querySelector(".js-reset");

//---------------------GLOBAL VARIABLES--------------------
let characters = [];
let favoriteCharacters = [];

//----------------------FUNCTIONS--------------------------

//Función que pinta para poder pasar parámetros, se usan en el bucle para pintar a todos los personajes
function renderFirstCharacter(character) {
  return `
  <li class="characters__Article js_characters" id="${character.char_id}" >
  <article class="characters__Article__Item">
      <img src="${character.img}" alt="" class="characters__img">
      <h3 class="characters__name">${character.name}</h3>
      <p class="characters__status">${character.status}</p>
  </article>
  </li>`;
}

charactersList.innerHTML = "";

//bucle recorre el array y va pintando a todos los personajes
function renderCharacters(characters) {
  let html = "";
  for (let i = 0; i < characters.length; i++) {
    html += renderFirstCharacter(characters[i]);
  }
  charactersList.innerHTML = html;
  addCharacterListener();
}

function addCharacterListener() {
  const charactersArticle = document.querySelectorAll(".js_characters");
  for (const eachCharacterArticle of charactersArticle) {
    eachCharacterArticle.addEventListener("click", handleClickCharacters);
  }
}

function renderfavoriteCharacters() {
  let html = "";

  for (let i = 0; i < favoriteCharacters.length; i++) {
    html += renderFirstCharacter(favoriteCharacters[i]);
  }
  favoritesListEl.innerHTML = html;
}

//el querySelectorAll crea un array con todos los elementos article de cada personaje
//se crea un bucle for para poner un event listener a cada article
// arriba se le asigna la clase a todos los article que se generan
//se crea el evento al que se le va a añadir el listener

//---------------------------------EVENTOS-----------------------------------


function handleClickCharacters(event) {
  event.currentTarget.classList.toggle("selected");
  console.log(event.currentTarget.id);

  const selectedCharacter = characters.find(
    (eachCharacterObj) =>
      parseInt(eachCharacterObj.char_id) === parseInt(event.currentTarget.id)
  );
  //characters.forEach(characters => {debugger;}) me ayudó a ver qué se le estaba asignando y resolver el undefined
  console.log(selectedCharacter);
  //
  const characterInFavIndex = favoriteCharacters.findIndex(
    (eachCharacterObj) =>
      parseInt(eachCharacterObj.char_id) === parseInt(event.currentTarget.id)
  );
  console.log(characterInFavIndex);

  if (characterInFavIndex === -1) {
    favoriteCharacters.push(selectedCharacter);

    localStorage.setItem("favoriteChar", JSON.stringify(favoriteCharacters));
  }
                            //----------------BONUS-------------------
  else {
    favoriteCharacters.splice(characterInFavIndex, 1);
    localStorage.setItem("favoriteChar", JSON.stringify(favoriteCharacters));
  }
  renderfavoriteCharacters();
}

function handleSearchBtn(event) {
  event.preventDefault();
  const searchCharacter = document.querySelector(".js-input");
  const inputValue = searchCharacter.value.toLowerCase();
  console.log(inputValue);
  const searchedNameList = characters.filter((character) =>
  character.name.toLowerCase().includes(inputValue));
  renderCharacters(searchedNameList);
  console.log(searchedNameList);
 }
searchBtn.addEventListener("click", handleSearchBtn);

//BONUS----
function handleResetBtn (event){
  event.preventDefault();
  localStorage.removeItem("favoriteChar");
  favoriteCharacters.length = [];
  renderCharacters(characters);
  favoritesListEl.innerHTML = "";
}
  

resetBtn.addEventListener('click', handleResetBtn);

//-----------------------------API (cuando se carga la página)-----------


fetch("https://breakingbadapi.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    characters = data;
    renderCharacters(characters);
  });

const savedFav = JSON.parse(localStorage.getItem("favoriteChar"));
console.log(savedFav);
if (savedFav !== null) {
  favoriteCharacters = savedFav;
  renderfavoriteCharacters();
}
