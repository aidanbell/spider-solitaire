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
        let obj = {};
        obj.suit = suits[suit];
        obj.value = values[value];
        deck.push(obj);
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
  // Deals 44 cards face down
  for (i = 0; i < 44; i++) {
    columns[colIdx].push(deck.shift());
    let card = columns[colIdx][columns[colIdx].length -1];
    let newCard = document.createElement("img");
    newCard.className = "card large fd";
    newCard.id = `${card.suit}-${card.value}`;
    newCard.src = suitPath['b'];
    document.querySelector(`.column#c0${colIdx}`).appendChild(newCard);
    colIdx === 9 ? colIdx = 0 : colIdx += 1;
  }
  // Deals the reimaing 10 face up
  for (i = 0; i < 10; i++) {
    columns[colIdx].push(deck.shift());
    let card = columns[colIdx][columns[colIdx].length -1];
    let newCard = document.createElement("img");
    newCard.className = "card large fu";
    newCard.id = `${card.suit}-${card.value}`;
    newCard.src = `${suitPath[card.suit]}${newCard.id}.svg`;
    document.querySelector(`.column#c0${colIdx}`).appendChild(newCard);
    colIdx === 9 ? colIdx = 0 : colIdx += 1;
  }
}


function facedown(x, y) {

}


function isLastInCol(locX, locY) {
  return (locY === columns[locX].length -1) ? true : false;
}

function isFaceUp(card) {
  if (card.classList.contains('fu')) {
    return true;
  } else {
    return false;
  }
}

function getCard(locX, locY) {
  return columns[locX][locY];
}

function select(card) {
  if (isFaceUp(card) === false) return;
  if (document.querySelectorAll('.active').length === 1) return;
   card.classList.add('active')
}

function move(card) {

}

function handleClick(evt) {
  let card = event.target.id;
  let colId = event.target.parentNode.id;
  let col = parseInt(colId.split('c0')[1]);
  console.log(isFaceUp(event.target))
  select(event.target);
  console.log(card);
  console.log(col);
}
init();
