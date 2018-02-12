"use strict";

class EnergyTerminal extends Puzzle {
  constructor(id, filledOnNewGame) {
    super(id);
    this.filledOnNewGame = filledOnNewGame;
    this._isOpen = { value: false };
  }

  setup() {
    this.isOpen = false;
    hiversaires.interface.flashVignette();
    hiversaires.interface.showEnergy();
    hiversaires.music.playEffect("action_EnergyInit");

    hiversaires.preloadModifier("filled");
    hiversaires.preloadModifier("empty");
  }

  get isOpen() {
    return this._isOpen.value;
  }

  set isOpen(value) {
    this._isOpen.value = value;
  }

  performAction() {
    if (!this.isOpen) {
      this.isOpen = true;
    } else if (hiversaires.currentFuses.has(this.id)) {
      hiversaires.currentFuses.delete(this.id);
      hiversaires.game.userEnergy += 1;
    } else if (hiversaires.game.userEnergy > 0) {
      hiversaires.currentFuses.add(this.id);
      hiversaires.game.userEnergy -= 1;
    } else {
      hiversaires.interface.showEnergyAlert();
    }
    hiversaires.interface.showEnergy();
    hiversaires.setModifier(
      hiversaires.currentFuses.has(this.id) ? "filled" : "empty"
    );
    hiversaires.showModifier();
  }
}
