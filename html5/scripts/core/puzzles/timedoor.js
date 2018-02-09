class TimeDoor extends Door {
  constructor(id) {
    super(id);
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
      hiversaires.game.puzzleState.timeDoor = true;
    }

    if (hiversaires.game.puzzleState.timeDoor) {
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }
}
