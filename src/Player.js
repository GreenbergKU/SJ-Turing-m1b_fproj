class Player {
  constructor(id, wins, hand) {
    this.id = id;
    this.wins = wins || 0;
    this.hand = hand || [];
    this.slapped = false;
  };

  playCard() {                              
    console.log("playCard")
    console.log( 
      "B centerPile.length", game.centerPile.length, 
      "B this.hand", this.hand.length, 
      "B playerA hand", game.playerA.hand.length,
      "B playerB hand", game.playerB.hand.length,

    ) //before the function

    game.centerPile.push(this.hand.shift());

    console.log(    
      "A centerPile.length", game.centerPile.length, 
      "A this.hand", this.hand.length, 
      "A playerA hand", game.playerA.hand.length,
      "A playerB hand", game.playerB.hand.length,
      
    )  //after the function fires
  };
  
  toggleSlap() {                                    
    console.log("toggleSlap")
    //return
    this.slapped = !this.slapped; 
  };
  
  updatePlayerWins(player, game) {      
    console.log("@ updPlayerWins")
    this.wins++;
    console.log("updWins: player=", player, "this.wins=", this.wins, "game=", game)
    var savedSlapJackPlayers = [];
    this.saveToStorage(game, savedSlapJackPlayers);
  }

  // saveToStorage(player, savedPlayers) {        console.log("saveToStorage")

  //   var stringifiedSlapJack = JSON.stringify({"id": player.id, "wins": player.wins});
  //   localStorage.setItem('slap-jack: playerWins', stringifiedSlapJack);
  // };
  
  saveToStorage(game, savedPlayers) {        
    console.log("saveToStorage");
    var savedPlayers = [];
    var playerA = {"id" : game.playerA.id, "wins": game.playerA.wins}; 
    var playerB = {"id" : game.playerB.id, "wins": game.playerB.wins};  
 // var stringifiedSlapJackSinglePlayer = JSON.stringify(player);
 // localStorage.setItem('slap-jack: playerWins', stringifiedSlapJackSinglePlayer)  
    savedPlayers.push(playerA, playerB); 
    var stringifiedSlapJackPlayers = JSON.stringify(savedPlayers);   
    localStorage.setItem('slap-jack:playerWins', stringifiedSlapJackPlayers)
  };
  
};
   // if (this.hand.length > 0) { 
