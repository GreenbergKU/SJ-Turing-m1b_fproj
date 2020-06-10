var game;
document.onload = setUpGame();

document.addEventListener("keydown", delegateDealvsSlap);

function delegateDealvsSlap(event) {
    console.log("Handle-helper: delegateDealerDown")   // }
    if (event.key === "q") {
        userDealCard(game.playerA);   
    };
    if (event.key === "p") {
        userDealCard(game.playerB); 
    };
    if (event.key === "f") {
        userSlapCard(game.playerA);           
    };
    if (event.key === "j") {
        userSlapCard(game.playerB);    
    };
};

function setUpGame() {       
    console.log('startGame');
    var playerA = new Player("playerA");
    var playerB = new Player("playerB");
    game = new Game(playerA, playerB);
    cardCreation();
};

function cardCreation() {
    game.createDeck();
    game.dealCards(game.deckCards.card);
    game.shuffle(game.playerA.hand);
    game.shuffle(game.playerB.hand);
};

function userDealCard(player) {
    if (game.playersTurn === player) {
        game.takeTurn();
        displayCard();
        toggleTurnBorder();
    };
};

function userSlapCard(player) {
    if (game.slapOccured === false) {
        game.updateSlap(player);        
        displayMessage(player);
        displayCard();
    };
};

function displayCard() {
    var imgAllTags = document.getElementsByTagName("img");
    var card = game.centerPile.slice(-1);
    game.slapOccured ? imgAllTags[1].src = "" :
    imgAllTags[1].src = `${card[0].filepath}.png`;
};

function toggleTurnBorder() {
    document.getElementById('playerA').style.backgroundColor = "transparent";
    document.getElementById('playerB').style.backgroundColor = "transparent";
    document.getElementById(`${game.playersTurn.id}`).style.backgroundColor="gold";
};

function displayMessage(player) {
    console.log("@displayMessage")
    var headerMsg = document.querySelector('h1');    
    this.player = player === game.playerA ? game.playerB : game.playerA;
    var goodSlapMsg = `${game.slapOpportunity} ${player} forfeits a card to ${$this.player}!`;
    var badSlapMsg = `${game.slapOpportunity} ${player} takes the pile!`
    var winMsg = `WIN! CONGRATULATIONS ${player}! YOU'RE THE WINNER!`
    headerMsg.innerText = game.winner !== "" ? winMsg :
    game.slapOpportunity === "BAD-SLAP" ? badSlapMsg : goodSlapMsg;
};
