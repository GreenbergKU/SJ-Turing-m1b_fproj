
class Game {
  constructor(playerA, playerB, centerPile) {
    this.playerA = playerA;
    this.playerB = playerB;
    // this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i})
    this.centerPile = centerPile || [];
    this.deckCards = [];
    this.playersTurn = this.playerA;
    // playerA goes 1st by default
  };

  startGame() {  
    this.setDefaults();   
    this.makeDeck();
    this.shuffle(this.deckCards);
    this.dealCards(this.deckCards);
  };

  setDefaults() {
    this.playerB.playersTurn = false;
    this.playerA.playersTurn = true; 
  };

  makeDeck() {
    var card = {};
    for (var number = 13; number > 0; number--) {
      for (var suit = 4; suit > 0; suit--) {
        card = {
          id: `${number}:${suit}`,
          number: number,
          suit: suit
        }; this.deckCards.push(card);
      };
    }; return this.deckCards
  }; 
  
  shuffle(array) {    
          //console.log("array before shuffle:", "'array' =", array)
          //console.log("1:", this, "2:", )
    var randomIndex, randomCard;
    for (var i = array.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * array.length);      
      randomCard = array.splice(randomIndex, 1);       
      array.push(randomCard[0]);
    }; 
        // console.log("array after shuffle:", "'array' =", array)
    return array
  }; 

  dealCards(array) {
    this.shuffle(array);
    var i;
    while((i = array.shift()) !== undefined) {
      array.length % 2 === 0 ? 
      this.playerA.hand.push(i) :
      this.playerB.hand.push(i) 
      console.log(i);
    };  
  };

  calculateTurn() {
        console.log(
          "turnA ? = ", this.playerA.playersTurn, 
          "turnB ? = ", this.playerB.playersTurn,
        )
    this.playerA.playersTurn ? game.playerA.playCard() : game.playerB.playCard();
    this.toggleTurn();
    this.centerPile
  };

  toggleTurn() {
    this.playerA.playersTurn = !this.playerA.playersTurn;
    this.playerB.playersTurn = !this.playerB.playersTurn;
  };

};


// this.playerA.hand.push(array.shift())
// var playerA = game.playerA;
// var playerB = game.playerB;
// var deck = game.deck;

      // return this.playerA.hand, this.playerB.hand

      //NOT USING THIS - DONE INSIDE CONSTRUCTOR INSTEAD
  // createDeck() {
  //   this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i});
  //   console.log("A", this.deck);
  //   return this.cardDeck
  // };
  // THIS WORKS WITHOUT A PARAMETER (typed game.shuffle())
  // NOW TRYING TO REPLACE remove this...
  // WORKS DYNAMICALLY  (** MUST TYPE: < game.shuffle(game.deck) > **)
  // replace cardDeck with array so it can be used with any array, can remove variables too {
  // getRandomIndex from ROMCOM
  // removes card @ randomIndex, returns array of (1)
  // removed card goes back into the cardDeck array @ the end, loop is iterating over array as it was when the loop first began, therefore gauranteeing that the cards removed by this function, will not be removed again.    
  // console.log("cardDeck after shuffle = ", this.cardDeck, "array = ", array)


// OLD SHUFFLE METHOD
  // dealCards(array) {
  //   this.shuffle(array);
  //   // for(var i = array.length -1; i > 0; i--) {
  //   //   i % 2 === 0 ? this.playerA.hand.push(array.shift())
  //   var i;
  //   while((i = array.shift()) !== undefined) {
  //     if (array.length % 2 === 0) {
  //       this.playerA.hand.push(i);
  //     } else 
  //     this.playerB.hand.push(i); 
  //       console.log(i);
  //     // return this.playerA.hand, this.playerB.hand
  //   };  
  // };

      // for(var i = array.length -1; i > 0; i--) {
    //   i % 2 === 0 ? this.playerA.hand.push(array.shift())