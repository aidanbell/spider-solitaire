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

let cardsToMove = [];
let cardsToRemove;


/*----- CACHED ELEMENT REFERENCES -----*/


/*----- EVENT LISTENERS -----*/
document.querySelector('.game-board').addEventListener('click', handleClick);



/*----- FUNCTIONS -----*/
function init() {
  buildDeck();
  shuffleDeck();
  initialDeal();
}

// Builds the deck based on input of how many suits are to be played
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

// Shuffles the deck once it has been created
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


function isFaceUp(card) {
  if (card.classList.contains('fu')) {
    return true;
  } else {
    return false;
  }
}


function select(card, col) {
  if (isFaceUp(card) === false) return;
  card.classList.add('active')
  let thisCard = parseId(card.id);
   // console.log(thisCard.suit);
   // console.log(columns[col][l-1].suit);
   // console.log(thisCard.value);
   // console.log(columns[col][l-1].value);
  for (l = columns[col].length - 1; l >= 0; l--) {
   if (columns[col][l].value === thisCard.value) {
     cardsToMove = columns[col][l];

   }
  }
}

function move(card, colId, col) {
  if (card.classList.contains('active')) {
    card.classList.remove('active')
    return;
  }
  if (isSound(parseId(card.id)) === false) return;
  console.log(isSound(parseId(card.id)));
  let selected = document.querySelector('.active');
  let dest = document.querySelector(`#${colId}`)
  selected.parentNode.removeChild(selected);
  dest.appendChild(selected);
  selected.classList.remove('active');
  columns[col].push(cardsToMove);
}

function updateColumn() {

}

function isSound(card) {
  let active = document.querySelector('.active');
  let activeId = parseId(active.id);
  // let prev = parseId(active.previousSibling.id);
  if (card.value === activeId.value + 1) {
    return true;
  } else {
    return false;
  }
}

function parseId(cardId) {
  let cardArr = cardId.split('-');
  let cardObj = {
    'suit': cardArr[0],
    'value': parseInt(cardArr[1])
  }
  return cardObj;
}

function handleClick(evt) {
  let card = event.target;
  let colId = event.target.parentNode.id;
  let col = parseInt(colId.split('c0')[1]);
  document.querySelectorAll('.active').length === 0 ? select(card, col) : move(card, colId, col);
  // console.log(isFaceUp(event.target))
  // console.log(card);
  // console.log(col);
}
init();
