class EnergyDoor extends Door {
  constructor(id, fuseIDs) {
    super(id);
    this.fuseIDs = fuseIDs;
  }

  setup() {
    hiversaires.flashVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.showEnergyInterface();

    if (this.isUnlocked()) {
      hiversaires.setCurrentAction(
        function() {
          this.openDoor();
          hiversaires.showEnergyInterface();
        }.bind(this)
      );
      hiversaires.setModifier("open");
    } else {
      hiversaires.showEnergyAlert();
    }
  }

  isUnlocked() {
    const fuses = hiversaires.game.puzzleState.fuses;
    let unlocked = true;
    for (let fuseID of this.fuseIDs) {
      if (!fuses.includes(fuseID)) {
        unlocked = false;
        break;
      }
    }
    return unlocked;
  }
}
