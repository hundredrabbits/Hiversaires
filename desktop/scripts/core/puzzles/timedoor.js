"use strict";

class TimeDoor extends Door {
  constructor(id, hours, minutes) {
    super(id);
    this.hours = hours;
    this.minutes = minutes;
  }

  setup() {
    super.setup();
    hiversaires.interface.flashVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if (currentHours == this.hours && currentMinutes == this.minutes) {
      hiversaires.game.puzzleState.timeDoor = true;
    }

    if (this.isUnlocked) {
      hiversaires.setModifier("open");
    }
  }

  get isUnlocked() {
    return hiversaires.game.puzzleState.timeDoor;
  }
}
