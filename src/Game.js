class Game {
  constructor(playerA, playerB) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i})
    // this.deck = createDeck;
    this.centerPile = [];
  };
  //NOT USING THIS - DONE INSIDE CONSTRUCTOR INSTEAD
  createDeck() {
    this.cardDeck = Array.from(new Array(52), function(x,i) {x+=i; return i});
    console.log("A", this.deck);
    return this.cardDeck
  }


};








// this.cardDeck
// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
// Array.from({length: 52}, (x, i) => i); 
// console.log("A", Array.from(new Array(52), function(x,i) {x+=i; return i}));

