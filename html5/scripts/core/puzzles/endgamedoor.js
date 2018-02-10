"use strict";

class EndgameDoor extends Door {
  constructor(id, fuseIDs) {
    super(id);
    this.fuseIDs = fuseIDs;
  }

  setup() {
    if (this.isUnlocked) {
      hiversaires.setModifier("open");
      hiversaires.showModifier();
      hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    } else {
      hiversaires.interface.showEnergyAlert();
    }
  }

  get isUnlocked() {
    const fuses = hiversaires.currentFuses;
    for (let fuseID of this.fuseIDs) {
      if (!fuses.has(fuseID)) {
        return false;
      }
    }
    return true;
  }
}
