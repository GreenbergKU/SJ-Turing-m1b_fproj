window.onload = setUpGame();

var game;

function setUpGame() {
    game = new Game((new Player("playerA")), (new Player("playerB")));
    game.shuffle(game.cardDeck);   
}
