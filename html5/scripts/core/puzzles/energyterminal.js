"use strict";

class EnergyTerminal extends Puzzle {
  constructor(id, filledOnNewGame) {
    super(id);
    this.filledOnNewGame = filledOnNewGame;
  }

  setup() {
    hiversaires.interface.flashVignette();
    hiversaires.interface.showEnergy();

    hiversaires.stage.billboard("overlay").hidden = false;

    hiversaires.setCurrentAction(
      function() {
        this.updateFuse();
        hiversaires.interface.showEnergy();
        this.update();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");
  }

  update() {
    hiversaires.setCurrentAction(
      function() {
        if (hiversaires.currentFuses.has(this.id)) {
          hiversaires.currentFuses.delete(this.id);
          hiversaires.game.userEnergy += 1;
        } else if (hiversaires.game.userEnergy > 0) {
          hiversaires.currentFuses.add(this.id);
          hiversaires.game.userEnergy -= 1;
        } else {
          hiversaires.interface.showEnergyAlert();
        }
        this.updateFuse();
        hiversaires.interface.showEnergy();
      }.bind(this)
    );
  }

  updateFuse() {
    hiversaires.setModifier(
      hiversaires.currentFuses.has(this.id) ? "filled" : "empty"
    );
    hiversaires.showModifier();
  }
}
