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

let dealsRemaining = deck.length;
let cardRun = [];


/*----- CACHED ELEMENT REFERENCES -----*/


/*----- EVENT LISTENERS -----*/
document.querySelector('.game-board').addEventListener('click', handleClick);
document.querySelector('#deck').addEventListener('click', dealMore);


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

function dealMore() {
  for (i = 0; i < 10; i++) {
    columns[i].push(deck.shift());
    let card = columns[i][columns[i].length -1];
    let newCard = document.createElement("img");
    newCard.className = "card large fu";
    newCard.id = `${card.suit}-${card.value}`;
    newCard.src = `${suitPath[card.suit]}${newCard.id}.svg`;
    document.querySelector(`.column#c0${i}`).appendChild(newCard);
  }
}

function isFaceUp(card) {
  if (card.classList.contains('fu')) {
    return true;
  } else {
    return false;
  }
}


function select(card, colId, col) {
  isRun(card, colId);
  isComplete(card);
  if (isFaceUp(card) === false) return;
  if (cardRun.length > 1) {
    for (i = 0; i <= cardRun.length - 1; i++) {
      cardRun[i].classList.add('active');
      cardRun[0].classList.add('first');
      cardRun[cardRun.length - 1].classList.add('end');
    }
    return;
  } else if (cardRun.length === 0) {
    return;
  }
  card.classList.add('active')
}

function move(card, colId) {
  // function to deselect active card on second click
  if (card.classList.contains('active')) {
    cardRun.forEach(function(c){
      c.classList.remove('active', 'first', 'end');

    })
    return;
    // card.classList.remove('active')
    // return;
  }
  // checks ifSound to see if the move is allowed
  if (isSound(card) === false) return;
  //moves cards based on cardRun array
  // for card in cardRun {
  let dest = document.getElementById(colId);
  for (i = 0; i <= cardRun.length - 1; i++) {
    dest.appendChild(cardRun[i]);
    cardRun[i].classList.remove('active', 'first', 'end')
  }
  updateData();
  flipCard();
}



function updateColumn(col) {
  let column = document.getElementById(`c0${col}`);
  let current = column.querySelector('.card');
  let colCount = column.childElementCount;
  let tempArr = [];

  for (i = 0; i < colCount - 1; i++) {
    let tempCard = parseId(current.id);
    tempArr.push(tempCard);
    current = current.nextSibling;
  }
  columns[col] = [];
  columns.splice(col, 1, tempArr);
}

function updateData() {
  for (t = 0; t < 10; t++) {
    updateColumn(t);
  }
}

function isSound(card) {
  let current = parseId(card.id)
  let active = document.querySelector('.active');
  let activeId = parseId(active.id);
  // let prev = parseId(active.previousSibling.id);
  if (current.value === activeId.value + 1) {
    return true;
  } else if (card.classList.contains('empty')) {
    return true;
  } else {
    return false;
  }
}

function runComplete() {
  cardRun.forEach(function(c) {
    c.parentNode.removeChild(c);
  })
  let homeArr = document.querySelectorAll('.home-wrapper .empty');
  console.log(homeArr);
  homeArr[homeArr.length - 1].src = suitPath['b'];
  flipCard();
}

function isRun(card, colId) {
  cardRun = [];
  let cardTemp = card;
  while (cardTemp.nextSibling !== null) {
    if (parseId(cardTemp.id).value === parseId(cardTemp.nextSibling.id).value + 1) {
      cardRun.push(cardTemp);
      cardTemp = cardTemp.nextSibling;
    } else {
      cardRun = [];
    }
  }
  cardRun.push(cardTemp);
  cardRun.length > 1 ? true : false;
}

function isComplete(card) {
  if (parseId(cardRun[0].id).value === 13 && cardRun.length === 13) {
    console.log('Done');
    runComplete();
  }
}

function isEmpty(card) {
  if (card.classList.contains('empty')) {
    return true;
  } else {
    return false;
  }
}

function flipCard() {
  for (i = 0; i < columns.length; i++) {
    let col = document.getElementById(`c0${i}`);
    if (col.lastChild.classList.contains('fd')) {
      let card = parseId(col.lastChild.id);
      col.lastChild.src = `${suitPath[card.suit]}${col.lastChild.id}.svg`;
      col.lastChild.classList.remove('fd');
      col.lastChild.classList.add('fu');
    }
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
  document.querySelectorAll('.active').length === 0 ? select(card, colId, col) : move(card, colId);
}
init();
