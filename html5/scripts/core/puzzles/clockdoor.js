class ClockDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.templateClockInterface();
    hiversaires.music.playEffect("action_DoorInit");
    if (
      hiversaires.checkConditions(hiversaires.currentPuzzle.info.conditions)
    ) {
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
    } else {
      hiversaires.templateClockAlert();
    }
  }
}
