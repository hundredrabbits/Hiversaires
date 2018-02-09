class EndgameDoor extends Door {
  constructor(id, fuseIDs) {
    super(id);
    this.fuseIDs = fuseIDs;
  }

  setup() {
    if (this.isUnlocked()) {
      hiversaires.setModifier("open");
      hiversaires.showModifier();
      hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    } else {
      hiversaires.templateEnergyAlert();
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
