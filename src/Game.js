class Game {
  constructor(player1, player2) {
    this.playerA = player1;
    this.playerB = player2;
    this.centerPile = [];
    this.card = {};
    this.deckCards = [];
    this.playersTurn = this.playerA;
    this.goodSlap = false;
    this.slapOccured = false;
    this.endGameCondition = false;
    this.slapOpportunity = '';
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

  shuffle(deck) {                              console.log('shuffleDeck');          
    var randomIndex, randomCard;
    for (var i = deck.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * deck.length);      
      randomCard = deck.splice(randomIndex, 1);       
      deck.push(randomCard[0]);
    };     
    return deck;
  }; 

  dealCards(deck) {              console.log('dealCards');  
    this.shuffle(deck);
    var i;
    while((i = deck.shift()) !== undefined) {
      deck.length % 2 === 0 ? 
      this.playerA.hand.push(i) :
      this.playerB.hand.push(i);           
    };
  }; 

  takeTurn() {              console.log('taketurn')  
    this.playersTurn.playCard();
    this.toggleTurn(); 
    //INFINATE LOOP WARNING - if no bugs...
    this.checkGameStatus() ? alert("endGame=true") : null;
  };

  toggleTurn() {         console.log('function toggleTurn')              
     this.playersTurn = this.playersTurn === this.playerA ? this.playerB : this.playerA;
     toggleTurnBorder();
  };

  updateSlap(player) {           console.log("updateSlap")
    this.slapOccured = !this.slapOccured;
    player.toggleSlap();
    game.checkWinConditions(game.playerB);
  };

  checkWinConditions(player) {
    console.log("@checkWinConditions()")
    var card1 = this.centerPile[this.centerPile.length-1];     
    if (this.centerPile.length > 0 || this.endGameCondition) {  
      if (card1.number === 11) {
        this.slapOpportunity = "SLAP-JACK!";
      };
    }; 
    if (this.centerPile.length > 1 && this.endGameCondition === false) { 
      var card2 = this.centerPile[this.centerPile.length-2];   
      if (card2.number === card1.number) {
        this.slapOpportunity = "DOUBLES!";
      }; 
    };   
    if (this.centerPile.length > 2 && this.endGameCondition === false) {
      var card3 = this.centerPile[this.centerPile.length-3];
      if (card3.number === card1.number) {
        this.slapOpportunity =  "SANDWICH!";  
      };
    };
    this.defineCurrentPlay(player);  
  };

  defineCurrentPlay(player) {
    if (this.slapOpportunity !== undefined) {
      this.slapOpportunity = "BAD-SLAP!";
      this.goodSlap =  true;
    };
    displayMessage(player);
    this.slapDelegation(player);
  };
  
  slapDelegation(player) {                          console.log('slapDelegation')
    this.player = player === game.playerA ? game.playerB : game.playerA;
    this.goodSlap ? this.goodSlapAction(player) : this.player.hand.push(player.hand.shift());
    this.updateGame(player);
  };
   
  goodSlapAction(player) {          console.log('goodSlapAction')               
    player.hand.push(this.shuffle(this.centerPile));
    // for (var i = 0; i < this.centerPile.length; i++) {
    //   player.hand.push(this.centerPile[i])
    // }
    // this.shuffle(player.hand)
  };
    
  updateGame(player) {
    this.updateSlap(player);
    this.goodSlap = "";
  };

  checkGameStatus() {      console.log('checkGameStatus')
    this.endGameCondition = this.playerA.hand.length === 0 || 
    this.playerB.hand.length === 0;
    //listener: userDeal listens for only the player with cards
    //display switches to no card for 'lastChancePlayer'
    //winConditions begins checking every round for potential winner 
    //potential outcomes w/ the 1 potential slap:
    //FOR 'LastChancePlayer': 
    //if potential slap and 'lastChancePlayer' is first to slap, 
        // endGame = false, game returns to normal rules, centerPile = player.hand
    //if potential slap and no slap, 'lastChancePlayer' looses
    //if potential slap and BAD-SLAP by 'lastChance', they loose
    //FOR DEALER
    //if potential slap and DEALER wins slap, DEALER wins, 
  };


};

// OTHER TODO:
//SAVE TO STORAGE

