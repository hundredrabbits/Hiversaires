"use strict";

class KillTerminal extends Puzzle {
  constructor(id, max) {
    super(id);
    this.max = max;
  }

  performAction() {
    hiversaires.game.sessionKillCount++;
    if (hiversaires.game.sessionKillCount > this.max) {
      hiversaires.game.wipePlayerProgress();
      hiversaires.newGame();
    }
  }
}
