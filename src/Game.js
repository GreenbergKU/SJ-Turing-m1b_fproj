class Game {
  constructor(player1, player2) {
    this.playerA = player1;
    this.playerB = player2;
    this.centerPile = [];
    this.deckCards = [];  
    this.playersTurn = this.playerA;
    this.underDog; 
    this.slap; 
    this.goodSlap = null;
    this.slapOccured = false;
    this.endGameCondition = false;
  };
  
  createDeck() {          
    console.log('createDeck');
    var card = {};
    this.deckCards.card = [];
    for (var number = 13; number > 0; number--) {
      for (var suit = 4; suit > 0; suit--) {
        card = {
          id: `${number}-${suit}`,
          number: number,
          suit: suit,
          filepath: `./assets/deckCard/${number}-${suit}`
        };
        this.deckCards.card.push(card);
      }; 
    };  
  }; 

  shuffle(deck) {                              
    console.log('shuffleDeck');          
    var randomIndex, randomCard;
    for (var i = deck.length; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * deck.length);      
      randomCard = deck.splice(randomIndex, 1);       
      deck.push(randomCard[0]);
    };     
    return deck;
  }; 

  dealCards(deck) {              
    console.log('dealCards');  
    this.shuffle(deck);
    var i;
    while((i = deck.shift()) !== undefined) {
      deck.length % 2 === 0 ? 
      this.playerA.hand.push(i) :
      this.playerB.hand.push(i);           
    };
  }; 

  takeTurn() {              
    console.log('@taketurn')
    this.playersTurn.playCard();
    this.toggleTurn();   
    //this.endGameCondition ? this.checkForLastChance() : this.toggleTurn();    
    this.checkGameStatus();

  };
 
  toggleTurn() {         
    console.log('function toggleTurn')  
    this.endGameCondition ? this.playersTurn :
    this.playersTurn = this.playersTurn === this.playerA ? this.playerB : this.playerA  
  };

  updateSlap(player) {           
    console.log("updateSlap","B", this.slapOccured)
    this.slapOccured = !this.slapOccured;
    //this.goodSlap = this.lastChance ? true : false;
    player.toggleSlap();
    console.log("@update-A: sO, gS, LC",this.slapOccured, this.goodSlap, this.lastChance)
  };

  checkWinConditions(player) {
    console.log("@checkWinConditions()")
    this.slap = "";

    if (this.centerPile.length > 0 || this.endGameCondition) {
      var card1 = this.centerPile[this.centerPile.length-1];    
      if (card1.number === 11) {
        this.slap = "SLAP-JACK!";
      };
    }; 
    if (this.centerPile.length > 1 && this.endGameCondition === false) { 
      var card2 = this.centerPile[this.centerPile.length-2];   
      if (card2.number === card1.number) {
        this.slap = "DOUBLES!";
      }; 
    };   
    if (this.centerPile.length > 2 && this.endGameCondition === false) {
      var card3 = this.centerPile[this.centerPile.length-3];
      if (card3.number === card1.number) {
        this.slap =  "SANDWICH!";  
      };
    };
    this.defineCurrentPlay(player);  
  };

  defineCurrentPlay(player) {
    console.log("@defineCurrentPlay")
    if (this.slapOccured && this.slap === "") {
      this.slap = "BAD-SLAP!";
      this.goodSlap = false;
    } else 
    this.goodSlap = true;
    displayGame(player);
    this.slapDelegation(player);
  };
  
  slapDelegation(player) {                          
    console.log('slapDelegation', "this", this.player, "other", player)
    this.player = player === game.playerA ? game.playerB : game.playerA;
    console.log('slapDelegation', "this", this.player, "other", player)
    this.goodSlap ? this.goodSlapAction(player) : this.player.hand.push(player.hand.shift());
    this.resetSlap(player);
  };
   
  goodSlapAction(player) {          
    console.log('goodSlapAction')               
    for (var i = 0; i < this.centerPile.length; i++) {
      player.hand.push(this.centerPile[i]);
    };
    this.shuffle(player.hand);
    this.centerPile = [];
    //annimation of some sort here
  };
    
  resetSlap(player) {
    console.log("@1resetSlap")
    if (this.endGameCondition) {
      this.checkGameStatus();
      displayCard(player)
      this.toggleTurn();      
    }; 
    this.slap = "";
    this.goodSlap = null;
    console.log("@2resetSlap")
    this.updateSlap(player);
    toggleTurnBorder();
  };

  checkGameStatus() { 
    console.log('checkGameStatus')
    this.endGameCondition = false;
    //this.lastChance = false;  
    if (this.playerA.hand.length === 0 || this.playerB.hand.length === 0) {
      this.endGameCondition = true;
      this.activateEndGame();
      // if (this.lastChance) {
      //   this.checklastChance();
      //};
    };
  };  
  /***********KEEP************* */    
      //this.triggerEndGameChanges();
      // if (this.playersTurn.hand.length === 0 && !this.slapOccured) {
      //   this.playersTurn.hand = this.shuffle(this.centerPile);
      //   this.centerPile = [];
      // };
      //this.checkForLastChance();
      //this.underDog = this.playerA.hand.length === 0 ? this.playerA : this.playerB;
  //********KEEP*********** */
  
  //triggerEndGameChanges() {           console.log('@endGameChanges')  
    //this.playersTurn = this.playerA.hand.length === 0 ? this.playerB : this.playerA; 
    //this.underDog = this.playerA.hand.length === 0 ? this.playerA : this.playerB;
  //};
    
    // return this.playersTurn
    // return this.underDog, this.playersTurn   
    // (could be conditional of toggle turn) // <- tried that but messes up reg cycle
    
  // checkForLastChance() {
  //   this.centerPile.length > 0 ? 
  //   (this.lastChance = this.centerPile[this.centerPile.length-1].number === 11 ? 
  //     true : false) : null;   
  // };

  
  
  //******************************************* */
  //********** END GAME SECTION ****************/
  //******************************************* */

  //checkGameStatus() fires activateEndGame()
  activateEndGame() {
    console.log("@activateEndGame")
    // this.endGameCondition = true;   
    //triggerPlayerTurn
    this.playersTurn = this.playerA.hand.length === 0 ? this.playerB : this.playerA;
    this.underDog = this.playerA.hand.length === 0 ? this.playerA : this.playerB; 
  };
    //should include this.winner = null
    
    //this.underDog.slapped && !this.goodSlap ? this.winner = this.playersTurn:undefined;
    //this.endgameCondition = this.underDog.slapped && this.goodSlap ? false:true;
  
  //   this.checkGameStatus() ? 
  //  this.triggerEndGameTurn();
  //   //this.checkGameStatus();
  // endGameController(player) 
  //   console.log("space");
  
    // @trigger: playersTurn reassigned,
    // @listener (key === "player") => handle;
    // @handle: if (endGame = true) => endGameController(player),
  
    // @handle => takeTurn, (Fully dependant on playerTurn!!)
    //           => toggleTurn  (Fully dependant on playerTurn!!)

    //***********************//
    //**** @DisplayGame *****//
   
              //    => card (centerPile => dependant on centerPile.length, game.slapOccured && game.goodSlap)
                               // => discarded card MUST be in centerPile before slice
                            //*** is an ENDGAME conditional present */
              
              //   => border  // Fully dependant on playerTurn!!

              //   => message  // dependant on game.slap, game.slapOccured, and game.goodSlap
                              // and player.Id of current Slap
    
      //**** @DisplayGame *****//
      //***********************//


      // @updateSlap => resetSlap
  
    
      //centerPile -BeforePlay
      //check playersTurn.hand is hand.length === 1
    
    endGameCheck(player) {
      console.log("@endGameCheck()")
      var hand = this.playersTurn.hand;
      // if (this.playersTurn.hand[0].number === 11) {
      //   console.log("1", this.playersTurn.hand[0].number)
      //   this.triggerLastChance(player); 
      // } else if (hand.length === 1) {
      //   console.log("2", hand.length === 1)
      //   this.goodSlapAction(this.playersTurn);
      // };
      this.playersTurn.hand[0].number === 11 ? this.triggerLastChance(player) 
        //console.log("1", this.playersTurn.hand[0].number)        
        : hand.length === 1 ? this.goodSlapAction(this.playersTurn) 
          : null;
        this.checkForSlap(player);
        //console.log("2", hand.length === 1)
      // if (nextcard != 11jack && hand.length === 1) {}
    }; 

    checkForSlap(player) {
      // if (this.slapOccured && this.lastChance) {
      //   this.goodSlap = true; 
      // };
      // if (this.slapOccured && !this.lastChance) {
      //   this.goodSlap = false;
      // };
      if (this.slapOccured) {
        this.goodSlap = this.lastChance ? true:false;
      };
      // if (this.slapOccured && !this.lastChance) {
      //   this.goodSlap = false;
      // };

      // if (this.playersTurn.slapped && !this.lastChance) {

      // } else if (this.underDog.slapped && !this.lastChance) {
      //   this.goodSlap = false;
      //};
      
      this.checkLastChance(player);
    
    };
  
    //   if (hand.length === 1) {  
    //     //hand.length > 1 && hand[0].number !== 11 ? this.takeTurn()// !(LCrd) && !(pickUP)
    //       hand[0].number === 11 ? this.triggerLastChance() : this.goodSlapAction(this.playersTurn)
    //   }; 
    //    if (hand[0].number === 11) {
    //     this.triggerLastChance();}
    //    else 
    //       if (this hand.lenth === 0) {
    //   } else 
    //   //this.checkForGameOver();
    // };

    triggerLastChance() {
      console.log("@triggerLastChance()")
      this.lastChance = true;
      //this.slapOccured === this.goodSlap ? true : false;
      //this.playersTurn = this.playersTurn.slapped || !this.underDog.slapped
      //!this.underDog.slapped ? this.playersTurn = this.winner : this.endGameCondition = true;
    };



    checkLastChance(player) { 
      console.log("@checklastChance")
      // this.goodSlap = this.slapOccured && this.lastChance ? true:false; 
      if (this.underDog.slapped && this.goodSlap) {
        this.lastChance = false;
        this.checkWinConditions(player); 
        //this.lastChance = false;
      }
      else if (this.slapOccured) {
      this.checkForWinner() 
      };
    };

    checkForWinner() {
      console.log("@checkforWinner")
      // this.winner = this.playersTurn.slapped && !this.goodSlap ? null : undefined;
      // this.winner = this.underDog.slapped && !this.goodSlap ? this.playersTurn : undefined;
      // this.gameOver = this.winner !== undefined ? true : false;

      this.winner = this.playersTurn.slapped && this.goodSlap ? this.playersTurn 
        : this.underDog.slapped && !this.goodSlap ? this.playersTurn 
        : this.playersTurn.slapped && !this.goodSlap;
       
      //this.gameOver = this.winner === undefined ? false : true;
      
      if (this.winner === this.playersTurn) {
        this.slap = "WINNER!"
        this.gameOver = true;
        displayMessage(this.playersTurn)
        this.winner.updatePlayerWins(this.winner, this);
        askPlayAgain();
      };
      
      if (this.winner === null) {
        //this.playersTurn.id = "GAME OVER!";
        this.slap = "DRAW!";
        this.gameOver = true;
        displayMessage(this.playersTurn);
        askPlayAgain();
        //alert("GAME-OVER-NULL")
      };
    };

    checkForNoSlap() {
      if (!this.slapOccured) {
        this.slapOccured = true;
        this.gameOver = true;
        this.winner = null;
        //this.checkForWinner();
        this.slap = "DRAW!";
        this.playersTurn.id = "GAME OVER!";
        displayMessage(this.playersTurn);

      };
    };
};
    
  // checkForWinner(player) {

  //   console.log("@checkForWinner")
  //   if (this.lastChance && this.slapOccured) { //? // this.slapOccured && //LC && Occured/good 
  //       // LC = true        // sO = true
  //       player.hand.length === 0 ? this.checkWinConditions(player) : this.winner = player 
  //   }   //if (playerSlap = underDog)  // game = regular rules  ELSE  // playersTurn = WINNER
  //   else if (this.lastChance && !this.slapOccured) {
  //             //LC = true    &&    //sO !== true      
  //     player === this.underDog ? this.winner = player : this.winner = null;
  //   } // if(playerSlap = underDog) //player = WINNER! ELSE // NO WINNER(draw!)
  //   if (this.winner != undefined) {
  //     alert("GAME OVER!"); //displayMessage win 
  //     console.log("this: ", this)
  //     player.updatePlayerWins(player, this);         
  //   } 
  //   else this.checkWinConditions(player)    
  // }; 
  
      // if (hand.length > 1 && hand[0].number !== 11 ) { this.takeTurn()}
      
      // hand[0].number === 11 ? beginLastRound() : pickUpCenterPile();
      //   this.playersTurn.hand[0].number === 11 ? 
          

   
   
  
    // (1 card) picking up center pile... player.hand.push(this.centerPile[i]);

      
  
      //centerPile (winCondition)
    // checkForJacks(player) {
    //   this.playersTurn
    //   this.centerPile.length > 0 ? 
    //   (this.lastChance = this.centerPile[this.centerPile.length-1].number === 11 ? 
    //     true : false) : null;
    //};
     
 

      
    //   this.playersTurn.takeTurn()
    // }
    
    
    //this.defineEndGamePlay(player);  
    
  
    //defineEndGamePlay(player) {

      //this.slap = "";
      //this.goodSlap;
    //};
    //FUNCTIONING FULLY DEPENDANT ON PLAYERS TURN
    
    
    
  //   checkForWinner(player) {
  //     debugger
  //     console.log("@checkForWinner")
  //     if (this.lastChance && this.slapOccured) { //? // this.slapOccured && //LC && Occured/good 
  //         // LC = true        // sO = true
  //         player.hand.length === 0 ? this.checkWinConditions(player) : this.winner = player 
  //     }   //if (playerSlap = underDog)  // game = regular rules  ELSE  // playersTurn = WINNER
  //     else if (this.lastChance && !this.slapOccured) {
  //               //LC = true    &&    //sO !== true      
  //       player === this.underDog ? this.winner = player : this.winner = null;
  //     } // if(playerSlap = underDog) //player = WINNER! ELSE // NO WINNER(draw!)
  //     if (this.winner != undefined) {
  //       alert("GAME OVER!"); //displayMessage win 
  //       console.log("this: ", this)
  //       player.updatePlayerWins(player, this);         
  //     }
  //     else this.checkWinConditions(player)     
  //   };
  // }; 

    


// OTHER TODO:
//SAVE TO STORAGE

 
  // this.playerA.hand.length !== 0 ?
    // (this.playersTurn = this.playerB, this.underDog=this.PlayerA):
    // (this.playersTurn = this.playerA, this.underDog=this.PlayerB);

    //Switch !== to ===
    //For testing, this.playersTurn starts at playerA by default
    //after END GAME CHANGES: this.playersTurn = playerB
  
//CHECK FOR WINNER NOTEs

  // checkForWinner(player) {
  //   console.log("@checkForWinner")
  //   this.lastChance && this.slapOccured && this.goodSlap ? 
  //       player.hand.length === 0 ? this.checkWinConditions(player) : this.winner = player 
  //   : this.lastChance && this.slapOccured === this.underDog.slapped ? this.winner = player
  //       : this.lastChance && this.underDog.slapped ? this.winner = player : this.checkWinConditions(player)          
    
  //   if (this.winner === this.playerA || this.winner === this.playerB) {    
  //     alert("GAME OVER!"); //displayMessage win 
  //     console.log("this: ", this)
  //     player.updateWins(player, this);
  //   };
  //};