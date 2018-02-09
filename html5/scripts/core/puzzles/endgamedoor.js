class EndgameDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    if (
      hiversaires.checkConditions(hiversaires.currentPuzzle.info.conditions)
    ) {
      hiversaires.setModifier("open");
      hiversaires.showModifier();
      hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    } else {
      hiversaires.templateEnergyAlert();
    }
  }
}
