class Door extends Puzzle {
  constructor(id, info, defaultState, fadeDuration = 0) {
    super(id, info, defaultState);
    this.fadeDuration = fadeDuration;
  }

  openDoor(hh) {
    hh.stage.setHidden(hh.stage.billboard("overlay"), false);
    hh.setCurrentAction(this.walkThroughDoor.bind(this));
    hh.stage.fadeIn(hh.stage.billboard("overlay"), this.fadeDuration, 0);
  }

  walkThroughDoor(hh) {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (hh.game.userNodeID == 1) {
      hh.game.userNodeID = 103;
    } else if (hh.game.userNodeID == 11) {
      hh.game.userNodeID = 48;
      hh.game.userOrientation = 2;
    } else if (hh.game.userNodeID == 13) {
      hh.game.userNodeID = 12;
    } else if (hh.game.userNodeID == 12) {
      hh.game.userNodeID = 13;
    } else if (hh.game.userNodeID == 16) {
      hh.game.userNodeID = 22;
    } else if (hh.game.userNodeID == 20 && hh.game.puzzleState[37] > 0) {
      hh.game.userNodeID = 116;
      hh.game.userOrientation = 1;
    } else if (hh.game.userNodeID == 23) {
      // Fold Gate
      hh.game.userNodeID = 22;
    } else if (hh.game.userNodeID == 25) {
      hh.game.userNodeID = 31;
      hh.game.userOrientation = 2;
    } else if (hh.game.userNodeID == 27) {
      hh.game.userNodeID = 32;
      hh.game.userOrientation = 1;
    } else if (hh.game.userNodeID == 35) {
      hh.game.userNodeID = 31;
      hh.game.userOrientation = 0;
    } else if (
      hh.game.userNodeID == 39 &&
      hh.game.puzzleState[5] == 1 &&
      hh.game.puzzleState[31] == 1
    ) {
      hh.game.userNodeID = 34;
    } else if (hh.game.userNodeID == 39) {
      hh.game.userNodeID = 45;
    } else if (hh.game.userNodeID == 46) {
      hh.game.userNodeID = 85;
      hh.game.userOrientation = 2;
    } else if (hh.game.userNodeID == 48) {
      hh.game.userNodeID = 11;
      hh.game.userOrientation = 2;
    } else if (hh.game.userNodeID == 52) {
      hh.game.userNodeID = 32;
      hh.game.userOrientation = 3;
    } else if (hh.game.userNodeID == 61) {
      hh.game.userNodeID = 72;
    } else if (hh.game.userNodeID == 62) {
      hh.game.userNodeID = 77;
    } else if (hh.game.userNodeID == 69) {
      hh.game.userNodeID = 72;
    } else if (hh.game.userNodeID == 76) {
      hh.game.userNodeID = 87;
    } else if (hh.game.userNodeID == 77) {
      hh.game.userNodeID = 62;
    } else if (hh.game.userNodeID == 79) {
      hh.game.userNodeID = 112;
    } else if (hh.game.userNodeID == 85) {
      hh.game.userNodeID = 46;
      hh.game.userOrientation = 0;
    } else if (hh.game.userNodeID == 87) {
      hh.game.userNodeID = 76;
    } else if (hh.game.userNodeID == 112) {
      hh.game.userNodeID = 79;
    } else if (hh.game.userNodeID == 113) {
      hh.game.userNodeID = 50;
    } else if (hh.game.userNodeID == 50) {
      hh.game.userNodeID = 113;
    } else if (hh.game.userNodeID == 142) {
      hh.game.userNodeID = 143;
      hh.game.userOrientation = 3;
    } else if (hh.game.userNodeID == 143) {
      hh.game.userNodeID = 142;
      hh.game.userOrientation = 1;
    }

    // Easter Eggs

    hh.actionCheck();
    hh.moveCheck();
  }
}
