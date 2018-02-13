"use strict";

class EndgameDoor extends Door {
  constructor(id, fuseIDs) {
    super(id);
    this.fuseIDs = fuseIDs;
  }

  setup() {
    super.setup();
    if (this.isUnlocked) {
      hiversaires.setModifier("open");
      hiversaires.showModifier();
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

  performAction() {
    this.walkThroughDoor();
  }
}
