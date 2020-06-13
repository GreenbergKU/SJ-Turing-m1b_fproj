var game;
document.onload = retrieveFromStorage();

document.addEventListener("keydown", delegateDealvsSlap);

function delegateDealvsSlap(event) {
    console.log("@Handle: delegateDvsS")
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
  
function retrieveFromStorage() {
    console.log("@retrieveFromStorage")
    var player1, player2;
    if (localStorage.getItem("slap-jack:playerWins") !== null  ) {
        // (player1 = "playerA", 
        // player1 = "playerB" ) :
        var player1 = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[0].wins;
        var player2 = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[1].wins;  
        console.log(player1)
    };
    setUpGame(player1, player2);
};

function setUpGame(player1, player2) {  
    console.log('@setUpGame');    
     var playerA = new Player("playerA", player1);
     var playerB = new Player("playerB", player2);   
    //var playerA = new Player(player1);
    //var playerB = new Player(player2);
    game = new Game(playerA, playerB);
    cardCreation();
    displayWins();
};   

function cardCreation() {
    console.log("@cardCreation")
    game.createDeck();
    game.dealCards(game.deckCards.card);
    game.shuffle(game.playerA.hand);
    game.shuffle(game.playerB.hand);
};

function displayWins() {
    console.log("@displayWins")
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
    console.log("@userDealCard", player)   
    if (game.playersTurn === player) {
        // game.endGameCondition ? game.endGameCheck(player) : 
        game.takeTurn();
        displayGame(player);
    };
};

function userSlapCard(player) {
    console.log("@userSlapCard", player)
    if (!game.slapOccured) {
        game.updateSlap(player);
    };
    !game.endGameCondition ? game.checkWinConditions(player) : 
    game.checkForWinner(player)
    console.log("@userSlap: !game.endGame = ", !game.endGameCondition)
    // game.endGameCondition ? game.checkForLastChance() :
    // !game.lastChance ? game.checkWinConditions(player) : game.checkForWinner(player);   
};

function displayCard() {
    console.log("@displayCard()")
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
    console.log("@toggleTurnBorder")
    document.getElementById('playerA').style.backgroundColor = "transparent";
    document.getElementById('playerB').style.backgroundColor = "transparent";    
    document.getElementById(`${game.playersTurn.id}`).style.backgroundColor="gold";
};

function displayMessage(player) {
    console.log("@displayMessage", game.slap)
    if (game.slapOccured) {
        var other = player === game.playerA ? game.playerB : game.playerA;
        var goodSlapMsg = `${game.slap} ${player.id} takes the pile!`;
        var badSlapMsg = `${game.slap} ${player.id} forfeits a card to ${other.id}!`;
        var winMsg = `WIN! CONGRATULATIONS ${player.id}! YOU'RE THE WINNER!`;      
        document.querySelector('h1').classList.toggle('hidden');
        document.querySelector('h1').innerText = game.goodSlap ? goodSlapMsg : badSlapMsg;
        clearMessage(5000);   
    };  
};    

function clearMessage(milliseconds) {
    console.log("@clearMessage")    
    var centerImg = document.getElementById('center-pile'); 
    setTimeout(function clearDelay() {
       document.querySelector('h1').classList.toggle("hidden"); 
        if (centerImg.src.includes("11-4")) {
            centerImg.src=""; 
        };   
    }, milliseconds);
};


//********* RETRIEVE FROM STORAGE() notes *************** 
//     var retrievedPlayers = localStorage.getItem("slap-jack:playerWins") 
//     var savedSlapJackPlayers = JSON.parse(retrievedPlayers);
//     var playerA = savedSlapJackPlayers[0];
//     var playerB = savedSlapJackPlayers[1];
//     setUpGame(playerA, playerB); 
// }
   // localStorage.getItem("slap-jack:playerWins") !== null ?  
    //     ( playerA = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[0],
    //     playerB = JSON.parse(localStorage.getItem("slap-jack:playerWins"))[1]   
    //     ) :  "playerA", "playerB";        
    // setUpGame(playerA, playerB);
    // };
     

//********* DISPLAY CARD() notes 
// var imgAllTags = document.getElementsByTagName("img");
// var card = game.centerPile.slice(-1);
// game.slapOccured ? imgAllTags[1].src = "" :
// imgAllTags[1].src = `${card[0].filepath}.png`;

//  *********** DISPLAY MESSAGE() notes   
// document.querySelector('h1').innerText = game.goodSlap ? goodSlapMsg : badSlapMsg;
// 

// ********* CLEAR MESSAGE() notes
// MDN- setTIMEOUT 
//document.getElementById('centerPile').src="";
// function stateChange(newState) {
//     setTimeout(function () {
//         if (newState == -1) {
//             alert('VIDEO HAS STOPPED');
//         }
//     }, 5000);
// }
        //header.innerText="";
        //header.style.backgroundColor="transparent";
        //header.style.border="transparent";
        // header.classList.toggle("hidden");
        // var header = document.querySelector('h1');
