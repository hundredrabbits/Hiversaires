"use strict";

class ClockDoor extends Door {
  constructor(id, lockValue) {
    super(id);
    this.lockValue = lockValue;
  }

  setup() {
    super.setup();
    hiversaires.interface.flashVignette();

    hiversaires.interface.showClock();
    hiversaires.music.playEffect("action_DoorInit");
    if (this.isUnlocked) {
      hiversaires.setModifier("open");
    } else {
      hiversaires.interface.showClockAlert();
    }
  }

  get isUnlocked() {
    return hiversaires.game.puzzleState.clock != this.lockValue;
  }
}
