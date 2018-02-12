"use strict";

class Walkthrough {
  constructor(responder) {
    this.responder = responder;
    this.playthrough = [];
  }

  playEntireGame() {
    let { left, right, center, forward, back, action } = Input;
    hiversaires.game.wipePlayerProgress();
    hiversaires.refreshNode();
    for (let input in this.playthrough) {
      this.responder(input);
    }
  }
}
