/*----- CONSTANTS -----*/
const suits = ['s', 'h', 'c', 'd'];
const values = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13];
const suitPath = {
  's': "card-deck-css/images/spades/",
  'h': "card-deck-css/images/hearts/",
  'c': "card-deck-css/images/clubs/",
  'd': "card-deck-css/images/diamonds/",
  'b': "card-deck-css/images/backs/blue.svg"
}

/*----- APP'S STATE (VARIABLES)-----*/

let noOfSuits = 1;
let suitsInPlay = suits.slice(0, (noOfSuits)); //['s']
// to access for Paths
// suitPath[suitsInPlay[0]]

let noOfDecks = 2;
let deck = [];
let columns = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]

let stock = []
let home = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
}


/*----- CACHED ELEMENT REFERENCES -----*/


/*----- EVENT LISTENERS -----*/
document.querySelector('.game-board').addEventListener('click', handleClick);



/*----- FUNCTIONS -----*/
function init() {
  buildDeck();
  shuffleDeck();
  initialDeal();
}

let buildDeck = () => {
  let repeat = (4 / noOfSuits) * noOfDecks;
  for (i = 0; i < repeat; i++) {
    for (suit in suitsInPlay) {
      for (value in values) {
        deck.push(`${suits[suit]}-${values[value]}`)
      }
    }
  }
}

function shuffleDeck() {
  let i = 0, j = 0, temp = null;

  for (i = deck.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

//  Adds 54 cards to the column array, one column at a time.
function initialDeal() {
  let num = 54;
  let colIdx = 0;
  for (i = 0; i < 54; i++) {
    columns[colIdx].push(deck.shift());
    colIdx === 9 ? colIdx = 0 : colIdx += 1;
  }
}

// TODO facedown and faceup only deal with inital dealing of cards.
//      Either rename and make them specific to the initialDeal
//      or retool them to be universal

function facedown(locX, locY) {
  let col = `c0${locX}`;
  let newCard = document.createElement("img");
  newCard.src = suitPath['b'];
  newCard.className = "card large";
  newCard.id = `${locX}-${locY}`;
  document.querySelector(`.column#${col}`).appendChild(newCard);
}

function faceup(locX, locY) {
  let card = getCard(locX, locY);
  let cardArr = card.split('-');
  let currSuit = cardArr[0];
  let col = `c0${locX}`;
  let newCardImgPath = `${suitPath[currSuit]}${card}.svg`;
  let newCard = document.createElement("img");
  newCard.src = newCardImgPath;
  newCard.className = "card large";
  newCard.id = `${locX}-${locY}`;
  document.querySelector(`.column#${col}`).appendChild(newCard);
}

function isLastInCol(locX, locY) {
  return (locY === columns[locX].length -1) ? true : false;
}

function getCard(locX, locY) {
  return columns[locX][locY];
}

function renderBoard() {
  for (locX = 0; locX <= 9; locX++) {
    for (locY = 0; locY <= columns[locX].length - 1; locY++) {
      if (isLastInCol(locX, locY) === true) {
        faceup(locX, locY);
      } else {
        facedown(locX, locY);
      }
    }
  }
}

function handleClick(evt) {
  let coords = event.target.id;
  let coordArr = coords.split('-');
  let locX = coordArr[0];
  let locY = coordArr[1];
  console.log(columns[locX][locY]);
}
init();
renderBoard();
