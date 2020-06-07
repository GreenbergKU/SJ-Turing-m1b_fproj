window.onload = setUpGame();
var game;

function setUpGame() {
    var playerA = new Player("playerA");
    var playerB = new Player("playerB");
    game = new Game(playerA, playerB); 
    game.startGame();
}