/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let i = 0; i < games.length; i++) {
    var gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    var game = games[i];
    gameCard.innerHTML = `
    <img src = "${game.img}" class = "game-img">
    <h3 class = "game-name"> Name: ${game.name} </h3>
    <p class = "game-description"> Description: ${game.description} </p>
    <p class = "game-pledged"> Pledge: ${game.pledged} </p>
    <p class = "game-goal"> Goal: ${game.goal} </p> 
    <p class = "game-backers"> Backers: ${game.backers} </p> `;

    document.getElementById("games-container").appendChild(gameCard);
  }
}

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");
const totalContributions = GAMES_JSON.reduce((cur, game) => {
  return cur + game.backers;
}, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((cur, game) => {
  return cur + game.pledged;
}, 0);

const convertedTotalRaised = totalRaised.toLocaleString();
raisedCard.innerHTML = `$${convertedTotalRaised}`;

const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((cur, game) => {
  return cur + 1;
}, 0);
gamesCard.innerHTML = totalGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);
  let listOfUnfundedOnly = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  addGamesToPage(listOfUnfundedOnly);
}

function filterFundedOnly() {
  deleteChildElements(gamesContainer);
  let listOfFundedOnly = GAMES_JSON.filter((game) => {
    return game.pledged > game.goal;
  });
  addGamesToPage(listOfFundedOnly);
}

function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly);

const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

const descriptionContainer = document.getElementById("description-container");
const numOfUnfunded = GAMES_JSON.reduce((cur, game) => {
  if (game.pledged < game.goal) {
    cur++;
  }
  return cur;
}, 0);

const numOfFunded = GAMES_JSON.reduce((cur, game) => {
  if (game.pledged > game.goal) {
    cur++;
  }
  return cur;
}, 0);

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${numOfFunded} ${
  numOfFunded > 1 ? "games" : "game"
}. Currently, ${numOfUnfunded} ${
  numOfUnfunded > 1 ? "games" : "game"
} remains unfunded. We need your help to fund these amazing games!`;

const displayStrElement = document.createElement("p");
displayStrElement.innerHTML = displayStr;
descriptionContainer.appendChild(displayStrElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

let [firstGame, secondGame, ...remainingGames] = sortedGames;

const topGameElement = document.createElement("p");
topGameElement.innerHTML = `${firstGame.name}`;
document.getElementById("first-game").append(topGameElement);

const SecondTopGameElement = document.createElement("p");
SecondTopGameElement.innerHTML = `${secondGame.name}`;
document.getElementById("second-game").append(SecondTopGameElement);
