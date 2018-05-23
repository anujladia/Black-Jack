// 
// Black Jack
// by Anuj Ladia
// Game on JS 
// for newbies on JS 
//

//card variables
let suits = ["Spade", "Heart", "Diamond", "Club"];
let values = ["Ace", "King", "Queen", "Jack", 
        "Ten", "Nine", "Eight", "Seven", "Six",
        "Five", "Four", "Three", "Two"]; 

//dom variables
let text = document.getElementById('text'),
    play = document.getElementById('play'),
    hit = document.getElementById('hit'),
    stay = document.getElementById('stay');

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

//hide these buttons before the game is started
hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

play.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  
  play.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  showStatus();
});

hit.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndGame();
  showStatus();
});

stay.addEventListener('click', function() {
  gameOver = true;
  checkForEndGame();
  showStatus();
});

// function of nested for loop to create the deck of cards 
function createDeck() {
  let deck = [];
  for( i = 0; i < suits.length; i++ ) {
    for( j = 0; j < values.length; j++) {
      // here we create a object of cards
      let card = {
        suit: suits[i],
        value: values[j]
      };  
      deck.push(card);  //creating array of objects of cards 
    }
  } 
  return deck;
}

//changing the card in object value to string
function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  
  for( let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if( card.value === 'Ace') {
      hasAce = true;
    }
    
    //because Ace can carry 1 or 11 points
    if( hasAce && score + 10 < 21 ) {
      score += 10;
    }
  
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndGame() {
  updateScores();
  
  if(gameOver) {
    //let dealer take cards
    while(dealerScore < playerScore && 
      dealerScore <= 21 && 
      playerScore <= 21) {
        dealerCards.push(getNextCard());
        updateScores();
      }
  }
  
  if(playerScore == 21) {
    playerWon = true;
    gameOver = true;
  }
  
  if(playerScore > 21) {
    playerWon = false;
    gameOver = true;
  } 
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } 
  else if(gameOver) {
    if(playerScore >= dealerScore) {
      playerWon = true;
    } 
    else {
      playerWon = false;
    }
  }
}

function showStatus() {
  if(!gameStarted) {
    text.innerText = 'Welcome to Black Jack';
    return;
  }
  
  let dealerCardString = '';
  for( let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n'; 
  }
  
  let playerCardString = '';
  for( let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n'; 
  }
  
  updateScores();
  
  text.innerText = 
    'Dealer has:\n' +
      dealerCardString + 
      '(score : ' + dealerScore + ')\n\n' + 
      
    'Player has:\n' +
      playerCardString + 
      '(score : ' + playerScore + ')\n\n'; 
      
  if(gameOver) {
    
    if(playerWon) {
      if(playerScore === 21 ){
        text.innerText += "You got a Black Jack \nYou Win!"; 
      }
      else {
        text.innerText += "You Win!";  
      }
    } else {
      text.innerText += "Dealer Wins!";
    }
    
    play.style.display = 'inline';
    hit.style.display = 'none';
    stay.style.display = 'none';
  }
}

function shuffleDeck(deck) {
  for( let i = 0; i < deck.length; i++) {
    let swap = Math.trunc(Math.random() * deck.length);
    let temp = deck[swap];
    deck[swap] = deck[i];
    deck[i] = temp;
  }  
}

function getNextCard() {
  return deck.shift();  
}

