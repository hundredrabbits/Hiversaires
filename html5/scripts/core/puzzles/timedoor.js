class TimeDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (
      (currentHours == 15 && currentMinutes == 7) ||
      hiversaires.game.userNodeID == 143
    ) {
      hiversaires.game.puzzleState[54] = 1;
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }
}
