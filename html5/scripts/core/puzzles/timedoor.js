class TimeDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if ((currentHours == 15 && currentMinutes == 7) || hh.userNodeID == 143) {
      hh.puzzleState[54] = 1;
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }
}
