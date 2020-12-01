var cardArray = [];
var playerCards = [];
var dealerCards = [];
var playerStartCardCount = 2;
var dealerStartCardCount = 1;
var playerScore = {};
var dealerScore = {};

function resetTheDecks() {
  cardArray = [];
  playerCards = [];
  dealerCards = [];
  var suits = ["clubs", "spades", "hearts", "diamonds"];
  for(var i = 0; i < suits.length; i++) {
    for(var j = 1; j <= 13; j++) {
      var cardDetails = {};
      if(j == 1) {
        cardDetails.name = "ace";
        cardDetails.value = j;
        cardDetails.hiValue = 11;
      } else if (j > 10) {
        if(j == 11) {
          cardDetails.name = "jack";
          cardDetails.value = 10;
          cardDetails.hiValue = 10;
        } else if (j == 12) {
          cardDetails.name = "queen";
          cardDetails.value = 10;
          cardDetails.hiValue = 10;
        } else if (j == 13) {
          cardDetails.name = "king";
          cardDetails.value = 10;
          cardDetails.hiValue = 10;
        }
      } else {
        cardDetails.name = j;
        cardDetails.value = j;
        cardDetails.hiValue = j;
      }
      cardDetails.suit = suits[i]; 
      cardArray.push(cardDetails);
    }
  }
}

function getRandomCard() {
  var randomCard = null;
  var rand = Math.floor(Math.random() * cardArray.length);
  return cardArray[rand];
}

function drawCard(user) {
  var card = getRandomCard();
  if(user === 'player') {
    playerCards.push(card);
  } else if (user === 'dealer') {
    dealerCards.push(card);
  }
}

function calculateScore(cards) {
  var lowScore = 0;
  var highScore = 0;
  for(var i = 0; i < cards.length; i++) {
    lowScore = lowScore + cards[i].value;
    highScore = highScore + cards[i].hiValue;
  }
  return {"lowScore": lowScore, "highScore": highScore};
}

function playerDrawCard() {
  drawCard("player");
}

function dealerDrawCard() {
  drawCard("dealer");
}

function displayCards(user, cards) {
  var htmlString = '';
  var template = jQuery('#cardTemplate').html();
  Mustache.parse(template);
  var rendered = Mustache.render(template, cards);
  if(user === 'player') {
    jQuery('.playercards').html(rendered);
  } else if (user === 'dealer') {
    jQuery('.dealercards').html(rendered);
  }
}

function updateScore(user, cards) {
  var scores = calculateScore(cards);
  var htmlString = ''; 
  var highScore = scores.highScore;
  var lowScore = scores.lowScore;
  if(lowScore === highScore) {
    htmlString = lowScore;
  } else if (lowScore < highScore && highScore < 21) {
    htmlString = lowScore + " or " + highScore;
  } else if (lowScore < highScore && highScore > 21) {
    htmlString = lowScore;
  }
  if(user === 'player') {
      playerScore = scores;
    jQuery('.playertotal').html(htmlString);
  } else if (user === 'dealer') {
      dealerScore = scores;
    jQuery('.dealertotal').html(htmlString);
  }
}

function checkForWinner(){
    if (playerScore.lowScore > 21 && playerScore.highScore > 21){
      DisableControls();
      alert("You are bust. Thanks for playing");
    } else if (playerScore.lowScore === 21 || playerScore.highScore === 21) {
      alert("You have 21, you win! Thanks for playing!");
      DisableControls();
    } else if (dealerScore.lowScore > 21 && dealerScore.highScore > 21){
      DisableControls();
      alert("Dealer is bust, you win! Thanks for playing");
    } else if (dealerScore.lowScore === 21 || dealerScore.highScore === 21) {
      alert("Dealer has 21, you lose! Thanks for playing!");
      DisableControls();
    }
}

function startGame() {
  resetTheDecks();
  jQuery('#hit, #stick').removeAttr('disabled');
  for(var i =0; i< playerStartCardCount; i++){
    drawCard("player");
  }
  for(var j=0; j < dealerStartCardCount; j++){
    drawCard("dealer");
  }
  displayCards("player", playerCards);
  displayCards("dealer", dealerCards);
  updateScore("player", playerCards);
  updateScore("dealer", dealerCards);
  jQuery('#gamearea').show();
  checkForWinner();
}

function playerHits() {
  drawCard("player");
  displayCards("player", playerCards);
  updateScore("player", playerCards);
  checkForWinner();
}

function playerSticks() {
  DisableControls();
  var playerScores = calculateScore(playerCards);
  var dealerScores = calculateScore(dealerCards);
  var delay = 1000; //1 second
  if((dealerScores.lowScore <= playerScores.lowScore || dealerScores.highScore <= playerScores.highScore) && (dealerScores.lowScore < 21 || dealerScores.highScore < 21)) {
    setTimeout(function() {
      drawCard("dealer");
      displayCards("dealer", dealerCards);
      updateScore("dealer", dealerCards);
      checkForWinner();
      playerSticks();
    }, delay);
  } 
  if ((dealerScores.lowScore > playerScores.lowScore || dealerScores.highScore > playerScores.highScore) && (dealerScores.lowScore < 21 && dealerScores.highScore < 21)) {
    alert("Dealer has higher hand, you lose. Thanks for playing.");
  }
}

function DisableControls() {
  jQuery('#hit, #stick').attr('disabled', 'true');
}

jQuery('document').ready(function(){
  jQuery('#startGame').click(function(){
    startGame();
  });
  jQuery('#hit').click(function(){
    playerHits();
  });
  jQuery('#stick').click(function(){
    playerSticks();
  });
});