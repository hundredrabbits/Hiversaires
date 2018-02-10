"use strict";

class SealTerminal extends Puzzle {
  constructor(id, seal) {
    super(id, {});
    this.seal = seal;
  }

  setup() {
    hiversaires.interface.flashVignette();
    hiversaires.music.playEffect("action_SealInit");
    this.update();
  }

  update() {
    hiversaires.interface.showSeal();
    if (hiversaires.currentSeals.has(this.seal)) {
      hiversaires.setModifier("seal." + hiversaires.currentSeals.size);
      hiversaires.showModifier(0.1, 0.1);
    } else {
      hiversaires.hideModifier(0.2, 0.2);
    }
  }

  performAction() {
    let seals = hiversaires.currentSeals;
    if (seals.has(this.seal)) {
      hiversaires.music.playEffect("action_SealInactive");
      seals.delete(this.seal);
    } else if (seals.size < 2) {
      hiversaires.music.playEffect("action_SealActive");
      seals.add(this.seal);
    } else {
      hiversaires.music.playEffect("action_EnergyStack");
      hiversaires.interface.showSealAlert();
    }
    this.update();
  }
}
