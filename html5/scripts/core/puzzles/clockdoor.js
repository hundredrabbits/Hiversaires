class ClockDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.stage.setHidden(hh.stage.billboard("overlay"), true);
    hh.templateClockInterface();
    hiversaires.music.playEffect("action_DoorInit");
    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
    } else {
      hh.templateClockAlert();
    }
  }
}
