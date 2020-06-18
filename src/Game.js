class Game {
  constructor(player1, player2) {
    this.playerA = player1;
    this.playerB = player2;
    this.centerPile = [];
    this.deckCards = [];  
    this.playersTurn = this.playerA;
    this.underDog; 
    this.slap; 
    this.goodSlap = null;
    this.slapOccured = false;
    this.endGameCondition = false;
  };
  
  createDeck() {          
    var card = {};
    this.deckCards.card = [];
    for (var number = 13; number > 0; number--) {
      for (var suit = 4; suit > 0; suit--) {
        card = {
          id: `${number}-${suit}`,
          number: number,
          suit: suit,
          filepath: `./assets/deckCard/${number}-${suit}`
        };
        this.deckCards.card.push(card);
      }; 
    };  
  }; 

  shuffle(deck) {                              
    var randomIndex, randomCard;
    for (var i = deck.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * deck.length);      
      randomCard = deck.splice(randomIndex, 1);       
      deck.push(randomCard[0]);
    };     
    return deck;
  }; 

  dealCards(deck) {              
    this.shuffle(deck);
    var i;
    while((i = deck.shift()) !== undefined) {
      deck.length % 2 === 0 ? this.playerA.hand.push(i) : this.playerB.hand.push(i);           
    };
  }; 

  takeTurn() {              
    this.playersTurn.playCard();
    this.toggleTurn();   
    this.checkGameStatus();
  };
 
  toggleTurn() {         
    this.endGameCondition ? this.playersTurn :
    this.playersTurn = this.playersTurn === this.playerA ? this.playerB : this.playerA  
  };

  updateSlap(player) {           
    this.slapOccured = !this.slapOccured;
    player.toggleSlap();
  };

  checkWinConditions(player) {
    this.slap = "";
    if (this.centerPile.length > 0 || this.endGameCondition) {
      var card1 = this.centerPile[this.centerPile.length-1];    
      if (card1.number === 11) {
        this.slap = "SLAP-JACK!";
      };
    }; 
    if (this.centerPile.length > 1 && this.endGameCondition === false) { 
      var card2 = this.centerPile[this.centerPile.length-2];   
      if (card2.number === card1.number) {
        this.slap = "DOUBLES!";
      }; 
    };   
    if (this.centerPile.length > 2 && this.endGameCondition === false) {
      var card3 = this.centerPile[this.centerPile.length-3];
      if (card3.number === card1.number) {
        this.slap =  "SANDWICH!";  
      };
    };
    this.defineCurrentPlay(player);  
  };

  defineCurrentPlay(player) {
    if (this.slapOccured && this.slap === "") {
      this.slap = "BAD-SLAP!";
      this.goodSlap = false;
    } else 
    this.goodSlap = true;
    displayGame(player);
    this.slapDelegation(player);
  };
  
  slapDelegation(player) {                          
    this.player = player === game.playerA ? game.playerB : game.playerA;
    this.goodSlap ? this.goodSlapAction(player) : this.player.hand.push(player.hand.shift());
    this.resetSlap(player);
  };
   
  goodSlapAction(player) {          
    for (var i = 0; i < this.centerPile.length; i++) {
      player.hand.push(this.centerPile[i]);
    };
    this.shuffle(player.hand);
    this.centerPile = [];
  };
    
  resetSlap(player) {
    if (this.endGameCondition) {
      this.checkGameStatus();
      displayCard(player);
      this.toggleTurn();      
    }; 
    this.slap = "";
    this.goodSlap = null;
    this.updateSlap(player);
    toggleTurnBorder();
  };

  checkGameStatus() { 
    this.endGameCondition = false;
    if (this.playerA.hand.length === 0 || this.playerB.hand.length === 0) {
      this.endGameCondition = true;
      this.activateEndGame();
    };
  };  

  //********** END GAME SECTION ****************/

  activateEndGame() {
    this.playersTurn = this.playerA.hand.length === 0 ? this.playerB : this.playerA;
    this.underDog = this.playerA.hand.length === 0 ? this.playerA : this.playerB; 
  };
    
  endGameCheck(player) {
    var hand = this.playersTurn.hand;
    this.playersTurn.hand[0].number === 11 ? this.triggerLastChance(player) 
      : hand.length === 1 ? this.goodSlapAction(this.playersTurn) : null;
    this.checkForSlap(player);
  }; 

  checkForSlap(player) {
    if (this.slapOccured) {
      this.goodSlap = this.lastChance ? true:false;
    };
    this.checkLastChance(player);
  };

  triggerLastChance() {
    this.lastChance = true;
  };

  checkLastChance(player) { 
    if (this.underDog.slapped && this.goodSlap) {
      this.lastChance = false;
      this.checkWinConditions(player); 
    } else if (this.slapOccured) {
      this.checkForWinner(); 
    };
  };

  checkForWinner() {
    this.winner = this.playersTurn.slapped && this.goodSlap ? this.playersTurn 
      : this.underDog.slapped && !this.goodSlap ? this.playersTurn 
      : this.playersTurn.slapped && !this.goodSlap;
    this.displayWinner();
  };

  displayWinner() {
    if (this.winner === this.playersTurn) {
      this.slap = "WINNER!";
      this.gameOver = true;
      displayMessage(this.playersTurn);
      this.winner.updatePlayerWins(this.winner, this);
      askPlayAgain();
    };
    if (this.winner === null) {
      this.slap = "DRAW!";
      this.gameOver = true;
      displayMessage(this.playersTurn);
      askPlayAgain();
    };
  };

  checkForNoSlap() {
    if (!this.slapOccured) {
      this.slapOccured = true;
      this.gameOver = true;
      this.winner = null;
      this.slap = "DRAW!";
      this.playersTurn.id = "GAME OVER!";
      displayMessage(this.playersTurn);
      askPlayAgain();
    };
  };

};

