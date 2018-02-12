"use strict";

class EntenteDoor extends Door {
  constructor(id) {
    super(id, 0, true);
  }

  get isUnlocked() {
    return true;
  }

  get isAlternateUnlocked() {
    return false;
  }

  performAction() {
    this.walkThroughDoor();
  }
}
