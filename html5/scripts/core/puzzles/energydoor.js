"use strict";

class EnergyDoor extends Door {
  constructor(id, fuseIDs) {
    super(id);
    this.fuseIDs = fuseIDs;
  }

  openDoor() {
    super.openDoor();
    hiversaires.interface.showEnergy();
  }

  setup() {
    super.setup();
    hiversaires.interface.flashVignette();

    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.interface.showEnergy();

    if (this.isUnlocked) {
      hiversaires.setModifier("open");
    } else {
      hiversaires.interface.showEnergyAlert();
    }
  }

  get isUnlocked() {
    const fuses = hiversaires.currentFuses;
    for (const fuseID of this.fuseIDs) {
      if (!fuses.has(fuseID)) {
        return false;
      }
    }
    return true;
  }
}
