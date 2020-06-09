

//********** GLOBAL VARIABLES ******************** */
//**************** QUERYSELECTORS ****************** */

//************* GLOBAL VARIABLES ******************** */
var game;
// var player = new Player;
document.onload = setUpGame();

//************ EVENT LISTENERS ********************* */
document.addEventListener("keydown", delegateDealvsSlap);

//*************** EVENT HANDLERS ****************** */



function delegateDealvsSlap(event) {
    console.log("Handle-helper: delegateDealerDown")
    // if (game.checkGameStatus() === false) {
    //     alert("gameStatus = false");
    // }

    if (event.key === "q") {
        if (game.playersTurn === game.playerA) {
            game.takeTurn()
        };
        console.log("'q'event.key:", event.key)
    }
    if (event.key === "p") {
        if (game.playersTurn === game.playerB) {
            game.takeTurn()
        };
        console.log("'p'event.key:", event.key)
    };
    if (event.key === "f") {       
        //player = game.playerA;
        if (game.timeToSlap) {
            game.updateSlap(playerA);
            game.slapDelegation(playerA);
        };

        console.log("'f'event.key:", event.key);
        console.log("A-handler: Post-UpdSlap", player)
    }

    if (event.key === "j") {       
        //player = game.playerB
        if (game.timeToSlap) {
            game.updateSlap(playerB);
            game.slapDelegation(playerB);
        };
        
        console.log("'j'event.key", event.key);
        console.log("B-handler: Post-UpdSlap")
    };
};


function setUpGame() {       console.log('startGame');
    var playerA = new Player("playerA");
    var playerB = new Player("playerB");
    game = new Game(playerA, playerB);
    
    // could move these to Game.js
    game.createDeck();
    game.dealCards(game.deckCards.card)
    game.shuffle(game.playerA.hand);
    game.shuffle(game.playerB.hand)
    toggleTurnBorder();

    //might be done in listener
};

//******************* OTHER FUNCTIONS ************** */


// HANDLED BY HANDLER
// function eventHandler() {            console.log('eventHandler')
//     if (event)  //{
//         //if (simultaniousSlaps) {
//             //twoSlapDecider();
//             // NO NEED, not updating if already true
//    //};
//     updateSlap(player);
//     };
// };

function displayCard() {
    var imgAllTags = document.getElementsByTagName("img");
    var card = game.playersTurn.hand.slice(0,1);
    imgAllTags[1].src = `${card[0].filepath}.png`;
//addChangeBorder

console.log(card, card[0].filepath);
// border = image border, cardimg = img 
// var centerPileImg = imgAllTags[1].src  
// var interPath = `${filepath}.png`
//var filepath = card[0].filepath
}


//*************** HELPER FUNCTIONS ****************** */
  //// NEED TO DO THIS!!!
// function twoSlapDecider() {             
//     console.log('twoSlapDecider')
// };
function toggleTurnBorder() {
    document.getElementById('playerA').style.backgroundColor = "transparent";
    document.getElementById('playerB').style.backgroundColor = "transparent";
    document.getElementById(`${game.playersTurn.id}`).style.backgroundColor="gold";
};
// NOT READY YET
// function displayMessage() {
//     var messageList = []
//         var gameStart = "Cards have been delt, Player 1 it's your turn!";
//         var slapJack = "";
//         var doubles = "";
//         var sandwich = '';
//         var badSlap = '';
    
// };



// PROJECT NOTES/OLD CODE

// function filterDownDealvsSlap(event) {
//     console.log("Handle: filterDownDealvsSlap");
//     console.log(event, event.code, event.key);
//     if (event.code === "KeyQ" || "KeyP") { 
//         delegateDealerDown(event)
//     }
//     if (event.code === "KeyF" || "KeyJ") { 
//         delegateSlapDown(event);
//     } //else event.preventDefault();      
    // var dealQP = [];
    // var slapFJ = [];    
    // dealQP.push(event)
    // } else if (event.code === "KeyP") { 
    //     dealQP.push(event)
    // } 
        //     slapFJ.push(event)
    // } else if (event.code === "KeyJ") { 
    //     slapFJ.push(event)
    // };
    // console.log(
    //     "key=q", event.key != 'q',
    //     "key'q'", event.key === "q",
    //     "KeyQ", event.code === "KeyQ", 
    //     )
        // event.preventDefault();       
//     event.key == ("q" || "p") ? delegateDealerDown(event) : 
//     delegateSlapDown(event);
//};
        // 
    //         "(event.key:", event.key,")"
    //     );
