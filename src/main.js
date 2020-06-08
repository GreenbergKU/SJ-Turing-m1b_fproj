document.onload = setUpGame();

//var playerA, playerB, game;
var game;





function setUpGame() {
    var playerA = new Player("playerA");
    var playerB = new Player("playerB");
    game = new Game(playerA, playerB); 
    game.createDeck();
    game.dealCards(game.deckCards)
}

function startGame() {
    
}