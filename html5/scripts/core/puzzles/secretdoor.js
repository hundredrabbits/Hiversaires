"use strict";

class SecretDoor extends Door {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.interface.flashVignette();
    hiversaires.stage.billboard("overlay").hidden = true;
    hiversaires.music.playEffect("action_DoorInit");

    if (this.isUnlocked) {
      hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    }
  }

  get isUnlocked() {
    return hiversaires.game.puzzleState.secret;
  }
}
