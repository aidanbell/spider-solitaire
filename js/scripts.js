/*----- CONSTANTS -----*/
const suits = ['s', 'h', 'c', 'd'];
const values = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13];

/*----- APP'S STATE (VARIABLES)-----*/

let noOfSuits = 1;
let suitsInPlay = suits.slice(0, (noOfSuits));

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
/*----- FUNCTIONS -----*/
function init() {
  buildDeck();
  shuffleDeck();
}

let buildDeck = () => {
  let repeat = (4 / noOfSuits) * noOfDecks;
  for (i = 0; i < repeat; i++) {
    for (suit in suitsInPlay) {
      for (value in values) {
        deck.push(`${suits[suit]}_${values[value]}`)
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

function initialDeal() {
  let num = 54;
  let colId = 0;
  for (i = 0; i < 54; i++) {
    columns[colId].push(deck.shift());
    colId === 9 ? colId = 0 : colId += 1;
  }
}
init();
initialDeal();
console.log(columns[1]);
