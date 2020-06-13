class Player {
  constructor(id, wins, hand) {
    this.id = id;
    this.wins = wins || 0;
    this.hand = hand || [];
    this.slapped = false;
  };

  playCard() {                              console.log("playCard")
    console.log( 
      "B centerPile.length", game.centerPile.length, 
      "B this.hand", this.hand.length, 
      "B game.playerA.hand", game.playerA.hand.length,
    ) //before the function

    game.centerPile.push(this.hand.shift());

    console.log(    
      "A centerPile.length", game.centerPile.length, 
      "A this.hand", this.hand.length, 
      "A game.playerA.hand", game.playerA.hand.length,
    )  //after the function fires
  };
  
  toggleSlap() {                                    console.log("toggleSlap")
    return this.slapped = !this.slapped; 
  };
  
  updatePlayerWins() {      console.log("@ updPlayerWins")
    this.wins++
  }

  saveToStorage(player) {        console.log("saveToStorage")

    var stringifiedSlapJack = JSON.stringify({"id": player.id, "wins": player.wins});
    localStorage.setItem('slap-jack:playerWins', stringifiedSlapJack);
  };
  
  
  
};
   // if (this.hand.length > 0) { 
