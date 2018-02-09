class EndgameDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setModifier("open");
      hh.showModifier();
      hh.setCurrentAction(this.walkThroughDoor.bind(this));
    } else {
      hh.templateEnergyAlert();
    }
  }
}
