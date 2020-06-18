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
    console.log('createDeck');
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
    console.log('shuffleDeck');          
    var randomIndex, randomCard;
    for (var i = deck.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * deck.length);      
      randomCard = deck.splice(randomIndex, 1);       
      deck.push(randomCard[0]);
    };     
    return deck;
  }; 

  dealCards(deck) {              
    console.log('dealCards');  
    this.shuffle(deck);
    var i;
    while((i = deck.shift()) !== undefined) {
      deck.length % 2 === 0 ? this.playerA.hand.push(i) : this.playerB.hand.push(i);           
    };
  }; 

  takeTurn() {              
    console.log('@taketurn')
    this.playersTurn.playCard();
    this.toggleTurn();   
    this.checkGameStatus();
  };
 
  toggleTurn() {         
    console.log('function toggleTurn')  
    this.endGameCondition ? this.playersTurn :
    this.playersTurn = this.playersTurn === this.playerA ? this.playerB : this.playerA  
  };

  updateSlap(player) {           
    console.log("updateSlap","B", this.slapOccured)
    this.slapOccured = !this.slapOccured;
    player.toggleSlap();
    console.log("@update-A: sO, gS, LC",this.slapOccured, this.goodSlap, this.lastChance)
  };

  checkWinConditions(player) {
    console.log("@checkWinConditions()")
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
    console.log("@defineCurrentPlay")
    if (this.slapOccured && this.slap === "") {
      this.slap = "BAD-SLAP!";
      this.goodSlap = false;
    } else 
    this.goodSlap = true;
    displayGame(player);
    this.slapDelegation(player);
  };
  
  slapDelegation(player) {                          
    console.log('slapDelegation', "this", this.player, "other", player)
    this.player = player === game.playerA ? game.playerB : game.playerA;
    console.log('slapDelegation', "this", this.player, "other", player)
    this.goodSlap ? this.goodSlapAction(player) : this.player.hand.push(player.hand.shift());
    this.resetSlap(player);
  };
   
  goodSlapAction(player) {          
    console.log('goodSlapAction')               
    for (var i = 0; i < this.centerPile.length; i++) {
      player.hand.push(this.centerPile[i]);
    };
    this.shuffle(player.hand);
    this.centerPile = [];
  };
    
  resetSlap(player) {
    console.log("@1resetSlap")
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
    console.log('checkGameStatus')
    this.endGameCondition = false;
    if (this.playerA.hand.length === 0 || this.playerB.hand.length === 0) {
      this.endGameCondition = true;
      this.activateEndGame();
    };
  };  

  //********** END GAME SECTION ****************/

  activateEndGame() {
    console.log("@activateEndGame")
    this.playersTurn = this.playerA.hand.length === 0 ? this.playerB : this.playerA;
    this.underDog = this.playerA.hand.length === 0 ? this.playerA : this.playerB; 
  };
    
  endGameCheck(player) {
    console.log("@endGameCheck()")
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
    console.log("@triggerLastChance()")
    this.lastChance = true;
  };

  checkLastChance(player) { 
    console.log("@checklastChance")
    if (this.underDog.slapped && this.goodSlap) {
      this.lastChance = false;
      this.checkWinConditions(player); 
    }
    else if (this.slapOccured) {
      this.checkForWinner(); 
    };
  };

  checkForWinner() {
    console.log("@checkforWinner")
    this.winner = this.playersTurn.slapped && this.goodSlap ? this.playersTurn 
      : this.underDog.slapped && !this.goodSlap ? this.playersTurn 
      : this.playersTurn.slapped && !this.goodSlap;
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
    };
  };
};

