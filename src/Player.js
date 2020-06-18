class Player {
  constructor(id, wins, hand) {
    this.id = id;
    this.wins = wins || 0;
    this.hand = hand || [];
    this.slapped = false;
  };

  playCard() {                              
    game.centerPile.push(this.hand.shift());
  };
  
  toggleSlap() {                                    
    this.slapped = !this.slapped; 
  };
  
  updatePlayerWins(player, game) {      
    this.wins++;
    var savedSlapJackPlayers = [];
    this.saveToStorage(game, savedSlapJackPlayers);
  };
  
  saveToStorage(game, savedPlayers) {        
    var savedPlayers = [];
    var playerA = {"id" : game.playerA.id, "wins": game.playerA.wins}; 
    var playerB = {"id" : game.playerB.id, "wins": game.playerB.wins};  
    savedPlayers.push(playerA, playerB); 
    var stringifiedSlapJackPlayers = JSON.stringify(savedPlayers);   
    localStorage.setItem('slap-jack:playerWins', stringifiedSlapJackPlayers);
  }; 
};

