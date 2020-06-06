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
  };
 
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


}
