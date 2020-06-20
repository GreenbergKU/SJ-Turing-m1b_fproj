var game;
document.onload = retrieveFromStorage();

//document.querySelector("button").addEventListener("click", displayRules);
document.querySelector("button").addEventListener("click", toggleRules);

document.addEventListener("keydown", delegateDealvsSlap);

function delegateDealvsSlap(event) {
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
    if (game.gameOver && event.code === "Space") {
        retrieveFromStorage();
    };
};
  
function retrieveFromStorage() {
    var player1, player2;
    if (localStorage.getItem("slap-jack:playerWins") !== null) {
        document.querySelector('h1').innerText = "2 PLAYER SLAP-JACK!"
        var player1 = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[0].wins;
        var player2 = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[1].wins;  
    };
    setUpGame(player1, player2);
};

function setUpGame(player1, player2) {  
     var playerA = new Player("playerA", player1);
     var playerB = new Player("playerB", player2);   
    game = new Game(playerA, playerB);
    cardCreation();
    displayWins();
};   

function cardCreation() {
    game.createDeck();
    game.dealCards(game.deckCards.card);
    game.shuffle(game.playerA.hand);
    game.shuffle(game.playerB.hand);
};

function displayWins() {
    document.getElementById('winsA').innerText = `${game.playerA.wins} WINS`;
    document.getElementById('winsB').innerText = `${game.playerB.wins} WINS`;    
    clearMessage(4000);
    displayGame();
};

function displayGame(player) {
    displayCard();
    toggleTurnBorder();
    displayMessage(player);    
};

function userDealCard(player) {
    if (game.playersTurn === player) {
        if (game.lastChance) {
            game.checkForNoSlap();
        } else if (game.endGameCondition && !game.gameOver) {
            game.endGameCheck();
        };
        if (!game.gameOver) {
            game.takeTurn();
            displayGame(player);
        };    
    };
};
    
function userSlapCard(player) {
    if (!game.slapOccured) {
        game.updateSlap(player);
    };
    if (!game.gameOver) {
        game.endGameCondition ? game.endGameCheck(player) : game.checkWinConditions(player);
    };
};

function displayCard() {
    document.getElementById(`${game.playerA.id}`).src="./assets/deckCard/back.png";
    document.getElementById(`${game.playerB.id}`).src="./assets/deckCard/back.png";
    if (game.centerPile.length > 0) {
        var middlePile = document.getElementById("center-pile");
        var playerCard = game.centerPile.slice(-1);
        middlePile.src = game.slapOccured && game.goodSlap ? "" : `${playerCard[0].filepath}.png`;
    };
    if (game.endGameCondition) {
        document.getElementById(`${game.playersTurn.id}`).src="./assets/deckCard/back.png";
        document.getElementById(`${game.underDog.id}`).src="";  
    };   
};

function toggleTurnBorder() {
    document.getElementById('playerA').style.backgroundColor = "transparent";
    document.getElementById('playerB').style.backgroundColor = "transparent";    
    document.getElementById(`${game.playersTurn.id}`).style.backgroundColor="gold";
};

function displayMessage(player) {
    if (game.slapOccured) {
        var header = document.querySelector('h1');
        var other = player === game.playerA ? game.playerB : game.playerA;
        var goodSlapMsg = `${game.slap} ${player.id} takes the pile!`;
        var badSlapMsg = `${game.slap} ${player.id} forfeits a card to ${other.id}!`; 
        header.classList.toggle('hidden');
        game.gameOver ? displayGameOverMsg(player) : header.innerText = game.goodSlap ? goodSlapMsg : badSlapMsg;
        clearMessage(3000);   
    };
};

function displayGameOverMsg(player) {
    var winMsg =`${game.slap} ${player.id} YOU WIN!`; 
    var drawMsg = `It's a ${game.slap}, ${player.id}`; 
    document.querySelector('h1').innerText = game.slap === "WINNER!" ? winMsg : drawMsg;
};

function clearMessage(milliseconds) {
    var centerImg = document.getElementById('center-pile'); 
    if (!game.gameOver) {
        setTimeout(function clearDelay() {
        document.querySelector('h1').classList.toggle("hidden"); 
            if (centerImg.src.includes("again")) {
                centerImg.src=""; 
            };           
        }, milliseconds);
    };
};

function askPlayAgain() { 
    document.getElementById("center-pile").src = "./assets/deckCard/game-over.png";
};

function shortcut() {
    for (var i = 0; i < game.playerB.hand.length; i++) {
        game.playerA.hand.push(game.playerB.hand[i]);
    };
    game.playerB.hand = [];
    game.shuffle(game.playerA.hand);
    game.checkGameStatus();
    displayGame(game.playersTurn);
};

// function displayRules() {
//     document.querySelector("main").classList.add("hidden");
//     document.querySelector(".h1-wrapper").classList.add("hidden");
//     document.querySelector(".rules").classList.remove("hidden");
//     document.querySelector("#rules-txt").classList.add("hidden");
//     document.querySelector("#done-txt").classList.remove("hidden");
// };

function toggleRules() {
    document.querySelector("main").classList.toggle("hidden");
    document.querySelector(".h1-wrapper").classList.toggle("hidden");
    document.querySelector("h1").classList.toggle("hidden");
    document.querySelector(".rules").classList.toggle("hidden");
    document.querySelector("#rules-txt").classList.toggle("hidden");
    document.querySelector("#done-txt").classList.toggle("hidden");
};