"use strict";

class SealDoor extends Door {
  constructor(id, locks, fadeDuration) {
    super(id, fadeDuration);
    this.locks = locks;
  }

  setup() {
    super.setup();
    hiversaires.interface.flashVignette();



    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.interface.showSeal();

    if (this.isUnlocked) {
      hiversaires.game.userChapter = this.matchedLock().chapter;
      hiversaires.setModifier("open");
      hiversaires.game.save();
    } else {
      hiversaires.interface.showSealAlert();
    }
  }

  get isUnlocked() {
    return this.matchedLock() != null;
  }

  matchedLock() {
    const seals = hiversaires.currentSeals;
    for (let lock of this.locks) {
      let locked = false;
      for (let seal of lock.seals) {
        if (!seals.has(seal)) {
          locked = true;
          break;
        }
      }
      if (!locked) {
        return lock;
      }
    }
    return null;
  }
}
