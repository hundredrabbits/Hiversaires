"use strict";

class SecretDoor extends Door {
  constructor(id) {
    super(id);
  }

  setup() {
    super.setup();
    hiversaires.interface.flashVignette();
    hiversaires.stage.billboard("overlay").hidden = true;
    hiversaires.music.playEffect("action_DoorInit");
  }

  get isUnlocked() {
    return hiversaires.game.puzzleState.secret;
  }

  performAction() {
    this.walkThroughDoor();
  }
}
