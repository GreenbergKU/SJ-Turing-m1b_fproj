

//********** GLOBAL VARIABLES ******************** */
//**************** QUERYSELECTORS ****************** */

//************* GLOBAL VARIABLES ******************** */
var game;
var player = new Player;
document.onload = setUpGame();

//************ EVENT LISTENERS ********************* */
//document.addEventListener("keydown", delegateSlapDown);
document.addEventListener("keydown", delegateDealvsSlap);

//*************** EVENT HANDLERS ****************** */



function delegateDealvsSlap(event) {
    console.log("Handle-helper: delegateDealerDown")
    // if (game.checkGameStatus() === false) {
    //     alert("gameStatus = false");
    // }

    if (event.key === "q") {
        game.takeTurn()
        player = game.playerA
        console.log("'q'event.key:", event.key)
    }
    if (event.key === "p") {
        player = game.playerB;
        game.takeTurn();
        
        console.log("'p'event.key:", event.key)
    };
    if (event.key === "f") {       
        player = game.playerA;
        if (game.timeToSlap) {
            game.updateSlap(player);
            //slapDelegation(player);
        };

        console.log("'f'event.key:", event.key);
        console.log("A-handler: Post-UpdSlap", player)
    }

    if (event.key === "j") {       
        player = game.playerB
        if (game.timeToSlap) {
            game.updateSlap(player);
            //slapDelegation(player);
        };
        
        console.log("'j'event.key", event.key);
        console.log("B-handler: Post-UpdSlap", player)
    };
};


function setUpGame() {          console.log('startGame'); 
    var playerA = new Player("playerA");
    var playerB = new Player("playerB");
    game = new Game(playerA, playerB); 
    game.createDeck();
    game.dealCards(game.deckCards.card)
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

function slapDelegation(player) {          console.log('slapDelegation')
    player = game.playerA.slapped ? game.playerA : game.playerB;
    otherPlayer = game.playerA.slapped ? game.playerB : game.playerA
    // should be taken care of by event listener
    timeToSlap ? goodSlapAction(player) : 
    player.push(otherPlayer.hand.shift());
updateSlap();
  //WORD THIS BETTER!!!!!!!!!
};

displayCard()

//*************** HELPER FUNCTIONS ****************** */
  //// NEED TO DO THIS!!!
// function twoSlapDecider() {             
//     console.log('twoSlapDecider')
// };

      

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
