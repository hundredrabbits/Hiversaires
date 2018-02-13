"use strict";

class Walkthrough {
  constructor(responder) {
    this.responder = responder;
    this.playthrough = [];
  }

  playEntireGame() {
    const { left, right, center, forward, back, action } = Input;
    hiversaires.game.wipePlayerProgress();
    hiversaires.refreshNode();
    for (const input in this.playthrough) {
      this.responder(input);
    }
  }
}
