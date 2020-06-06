class Player {
  constructor(id, wins, hand) {
    this.id = id;
    this.wins = wins || 0;
    this.hand = hand || [];
  };

  playCard() {
    if (this.hand > 0) {
      this.hand.shift();
    };
  };

  saveToStorage() {
    this.wins
  }

};
