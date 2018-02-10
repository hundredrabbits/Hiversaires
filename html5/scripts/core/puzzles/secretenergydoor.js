"use strict";

class SecretEnergyDoor extends EnergyDoor {
  constructor(id, fuseIDs, secretFuseIDs) {
    super(id, fuseIDs);
    this.secretFuseIDs = secretFuseIDs;
  }

  openDoor() {
    super.openDoor();
    hiversaires.interface.showEnergy();
  }

  setup() {
    super.setup();
    if (this.isSecretUnlocked) {
      hiversaires.interface.flashVignette();
      hiversaires.stage.billboard("overlay").hidden = true;
      hiversaires.music.playEffect("action_DoorInit");
      hiversaires.interface.showEnergy();
      hiversaires.setModifier("secret");
    } else {
      super.setup();
    }
  }

  get isSecretUnlocked() {
    if (!hiversaires.game.puzzleState.studio) {
      return false;
    }

    const fuses = hiversaires.currentFuses;
    for (let fuseID of this.secretFuseIDs) {
      if (!fuses.has(fuseID)) {
        return false;
      }
    }

    return this.isUnlocked;
  }
}
