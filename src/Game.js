
class Game {
  constructor(player1, player2) {
    this.playerA = player1;
    this.playerB = player2;
    this.centerPile = [];
    this.card = {};
    this.deckCards = [];
    this.slap = [];
    this.playersTurn = this.playerA
      // playerA goes 1st by default
    this.timeToSlap = false;
    // this.player = this.playerA || this.playerB
      // might be unneccessary
    this.slapOccured = false;
    this.endGameCondition = false;
  };

  //should happen on main js
  // startGame() {          
  //   this.createDeck();
  //   this.dealCards(this.deckCards.card);   
  // };

  createDeck() {          console.log('createDeck');
    var card = {};
     this.deckCards.card = []
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
      console.log("createDeck()=this.deckCards:", this.deckCards.card,
      "this.deckCards.card[0]:", this.deckCards.card[0])
  }; 

  shuffle(deck) {                              console.log('shuffleDeck');
    console.log("shuffle():", this.deckCards.card[0], )          
    var randomIndex, randomCard;
    for (var i = deck.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * deck.length);      
      randomCard = deck.splice(randomIndex, 1);       
      deck.push(randomCard[0]);
    };     
    return deck
  }; 

  dealCards(deck) {              console.log('dealCards');  
    this.shuffle(deck);
    var i;
    while((i = deck.shift()) !== undefined) {
      deck.length % 2 === 0 ? 
      this.playerA.hand.push(i) :
      this.playerB.hand.push(i);           
    };  console.log(this.playerA.hand)
  }; 

  takeTurn() {              console.log('taketurn')
   
    //this.checkGameStatus();  Added to eventHandlers
    this.card = this.playersTurn.hand.slice(0,1);
    displayCard(this.card)
    this.playersTurn.playCard();
    this.toggleTurn(); 
    this.checkWinConditions();
    //INFINATE LOOP WARNING - if no bugs...
    this.checkGameStatus() ? 
    alert("roundComplete- endGame=False") : alert("endGame=true") 
  };

  toggleTurn() {         console.log('function toggleTurn')
     this.playerA.playersTurn = !this.playerA.playersTurn;
     this.playerB.playersTurn = !this.playerB.playersTurn;                           
    return this.playersTurn = this.playerA.playersTurn ? this.playerA : this.playerB;
  };

  updateSlap(player) {           console.log("updateSlap")
    this.slapOccured = !this.slapOccured;
    //this.slap.push(player)
    console.log("updSlap: player= ", player);
    player.toggleSlap()
  };

  checkWinConditions() {          console.log("chWinConditions")                     
    console.log("before:","TIME to SLAP = ", this.timeToSlap) ;
    console.log("this.playersTurn:", this.playersTurn);
    //console.log("0", (this.centerPile.slice(-3))[0])
    // var i;
    // while((i = this.centerPile.slice(-3)) !== undefined) {
    this.timeToSlap =
      (
        this.centerPile.length > 2 ? 
        ((this.centerPile.slice(-3))[2].number === 11 ||
        (this.centerPile.slice(-3))[1].number === (this.centerPile.slice(-3))[2].number ||  
        (this.centerPile.slice(-3))[0].number === (this.centerPile.slice(-3))[2].number) :    
    
        this.centerPile.length > 1 ? 
        ((this.centerPile.slice(-3))[1].number === 11 ||   
        (this.centerPile.slice(-3))[0].number === (this.centerPile.slice(-3))[1].number) :
   
        this.centerPile.length === 1 ? 
        (this.centerPile.slice(-3))[0].number === 11 : false
      ) ? true : false
    
      
      this.timeToSlap ? this.checkForSlap() : null;
  
        console.log("after:","TIME to SLAP = ", this.timeToSlap)         
  };

  checkGameStatus() {      console.log('checkGameStatus')
    this.endGameCondition = this.playerA.hand === 0 || 
    this.playerB.hand === 0 ? true : false;
        // check players hands for cards (could be done in playCard)
        // boolean for endGameCondition()
    //     console.log("player", player.length) //= `this.${player[0]}`)
    // return this.endGameCondition = player.hand === 0 || 
    // player.hand === 0 ? true : false;
  
  }
//   checkForSlap() {        
//     console.log("checkForSlap")
//     this.slapOccured ? this.slapDelegation() 
// } 
  
      // ...!   if (slap occurs) {updateSlap()}
      // slapped must be updated by this time
  slapDelegation() {                          console.log('slapDelegation')
    this.player = this.playerA.slapped ? this.playerA : this.playerB;
    this.otherPlayer = this.playerA.slapped ? this.playerB : this.playerA
    // should be taken care of by event listener
    this.timeToSlap ? this.goodSlapAction(this.player) : 
    this.player.push(this.otherPlayer.hand.shift());
  updateSlap();
        //WORD THIS BETTER!!!!!!!!!
        /// currently on both main.js and game.js
    };
   
  goodSlapAction(player) {                  console.log('goodSlapAction')
    player.push(this.shuffle(this.centerPile));
  };
    
};

 // this.playerA.playersTurn ? game.playerA.playCard() : game.playerB.playCard();

//  createDeck() {
//     var card = {};
//     for (var number = 13; number > 0; number--) {
//       for (var suit = 4; suit > 0; suit--) {
//         card = {
//           id: `${number}:${suit}`,
//           number: number,
//           suit: suit
//         }; this.deckCards.push(card);
//       };
//     };  
    
//     return this.deckCards
//   }; 

  //should be happening within constructor
  // setGameDefaults() {
  //   this.playerB.playersTurn = false;
  //   this.playerA.playersTurn = true; 
  // };


       //console.log("array before shuffle:", "'array' =", array)
         //console.log("1:", this, "2:", )
        // console.log("array after shuffle:", "'array' =", array)

      // "conditionSlice = ", conditionSlice,
      //  "0", conditionSlice[0].id,
      //   "1", conditionSlice[1].number,
      //    "2", conditionSlice[2].length,
         
      //    "A centerPile.length", game.centerPile.length,  
         
    //    "B centerPile.length", game.centerPile.length, 

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