"use strict";

class KillTerminal extends Puzzle {
  constructor(id, max) {
    super(id);
    this.max = max;
  }

  performAction() {
    hiversaires.game.userKillCount++;
    if (hiversaires.game.userKillCount > this.max) {
      hiversaires.game.wipePlayerProgress();
      hiversaires.refreshNode();
    }
  }
}
