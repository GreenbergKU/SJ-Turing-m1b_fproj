class Player {
  constructor(id, wins, hand) {
    this.id = id;
    this.wins = wins || 0;
    this.hand = hand || [];
  };

  playCard() {
    console.log(  //before the function
      "B centerPile.length", game.centerPile.length, 
      "B this.hand", this.hand.length, 
      "B game.playerA.hand", game.playerA.hand.length,
    )
    game.centerPile.push(this.hand.shift());
    console.log(    //after the function fires
      "A centerPile.length", game.centerPile.length, 
      "A this.hand", this.hand.length, 
      "A game.playerA.hand", game.playerA.hand.length,
    )
  };
  

  saveToStorage() {
    this.wins
  }


};
   // if (this.hand.length > 0) {