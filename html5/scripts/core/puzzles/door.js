"use strict";

class Door extends Puzzle {
  constructor(id, fadeDuration = 0) {
    super(id);
    this.fadeDuration = fadeDuration;
  }

  openDoor() {
    hiversaires.stage.billboard("overlay").hidden = false;
    hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("overlay"),
      this.fadeDuration,
      0
    );
  }

  walkThroughDoor() {
    hiversaires.music.playEffect("action_DoorActive");
    let subject = hiversaires.currentSubject;
    let changed = false;
    if (this.isSecretUnlocked) {
      changed = true;
      hiversaires.game.userNodeID = subject.secretNodeID;
      if (subject.secretOrientation != null) {
        hiversaires.game.userOrientation = subject.secretOrientation;
      }
    } else if (this.isUnlocked) {
      changed = true;
      hiversaires.game.userNodeID = subject.nodeID;
      if (subject.orientation != null) {
        hiversaires.game.userOrientation = subject.orientation;
      }
    }

    if (changed) {
      hiversaires.actionCheck();
      hiversaires.moveCheck();
    }
  }

  get isUnlocked() {
    return false;
  }

  get isSecretUnlocked() {
    return false;
  }
}
