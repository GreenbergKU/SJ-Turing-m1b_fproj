class Game {
  constructor(playerA, playerB, deck) {
    this.playerA = playerA;
    this.playerB = playerB;
    // this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i})
    // this.deck = createDeck;
    this.centerPile = [];
    this.deck = deck || [];
  };

  startGame() {
    this.makeDeck();
    this.shuffle(this.deck);
    this.dealCards(this.deck);
  };

  //NOT USING THIS - DONE INSIDE CONSTRUCTOR INSTEAD
  // createDeck() {
  //   this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i});
  //   console.log("A", this.deck);
  //   return this.cardDeck
  // };
 
  shuffle(array) {    
      // THIS WORKS WITHOUT A PARAMETER (typed game.shuffle())
      // NOW TRYING TO REPLACE remove this...
      // WORKS DYNAMICALLY  (** MUST TYPE: < game.shuffle(game.cardDeck) > **)
    console.log("array before shuffle:", "'array' =", array)
    console.log("1:", this, "2:", )
      // replace cardDeck with array so it can be used with any array, can remove variables too {
    var randomIndex, randomCard;
    for (var i = array.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * array.length);
          // getRandomIndex from ROMCOM
      randomCard = array.splice(randomIndex, 1);
          // removes card @ randomIndex, returns array of (1)
      array.push(randomCard[0]);
          // removed card goes back into the cardDeck array @ the end, loop is iterating over array as it was when the loop first began, therefore gauranteeing that the cards removed by this function, will not be removed again.    
          // console.log("cardDeck after shuffle = ", this.cardDeck, "array = ", array)
    };
       console.log("array after shuffle:", "'array' =", array)
    return array
  }; 

  makeDeck() {
    var card = {number:suit};
    for (var number = 13; number > 0; number--) {
      for (var suit = 4; suit > 0; suit--) {
        card = {
          id: `${number}:${suit}`,
          number: number,
          suit: suit
        }; this.deck.push(card);
      };
    }; return this.deck 
  }; 

  dealCards(array) {
    this.shuffle(array);
    // for(var i = array.length -1; i > 0; i--) {
    //   i % 2 === 0 ? this.playerA.hand.push(array.shift())
    var i;
    while((i = array.shift()) !== undefined) {
       if (array.length % 2 === 0) {
       this.playerA.hand.push(i);
       } else this.playerB.hand.push(i); 
      console.log(i);
      // return this.playerA.hand, this.playerB.hand
    };  
  };

  
  

};
