class Door extends Puzzle {
  openDoor(hh) {
    hh.setHidden(hh.billboard("overlay"), false);
    hh.setCurrentAction(this.walkThroughDoor.bind(this));

    if (hh.currentPuzzle instanceof SealDoor) {
      hh.fadeIn(hh.billboard("overlay"), 1.0, 0.0);
    } else if (hh.currentPuzzle.id == 28) {
      hh.fadeIn(hh.billboard("overlay"), 1, 0.5);
    } else {
      hh.fadeIn(hh.billboard("overlay"), 0.0, 0);
    }
  }

  walkThroughDoor(hh) {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (hh.userNodeID == 1) {
      hh.userNodeID = 103;
    } else if (hh.userNodeID == 11) {
      hh.userNodeID = 48;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 13) {
      hh.userNodeID = 12;
    } else if (hh.userNodeID == 12) {
      hh.userNodeID = 13;
    } else if (hh.userNodeID == 16) {
      hh.userNodeID = 22;
    } else if (hh.userNodeID == 20 && hh.puzzleState[37] > 0) {
      hh.userNodeID = 116;
      hh.userOrientation = 1;
    } else if (hh.userNodeID == 23) {
      // Fold Gate
      hh.userNodeID = 22;
    } else if (hh.userNodeID == 25) {
      hh.userNodeID = 31;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 27) {
      hh.userNodeID = 32;
      hh.userOrientation = 1;
    } else if (hh.userNodeID == 35) {
      hh.userNodeID = 31;
      hh.userOrientation = 0;
    } else if (
      hh.userNodeID == 39 &&
      hh.puzzleState[5] == 1 &&
      hh.puzzleState[31] == 1
    ) {
      hh.userNodeID = 34;
    } else if (hh.userNodeID == 39) {
      hh.userNodeID = 45;
    } else if (hh.userNodeID == 46) {
      hh.userNodeID = 85;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 48) {
      hh.userNodeID = 11;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 52) {
      hh.userNodeID = 32;
      hh.userOrientation = 3;
    } else if (hh.userNodeID == 61) {
      hh.userNodeID = 72;
    } else if (hh.userNodeID == 62) {
      hh.userNodeID = 77;
    } else if (hh.userNodeID == 69) {
      hh.userNodeID = 72;
    } else if (hh.userNodeID == 76) {
      hh.userNodeID = 87;
    } else if (hh.userNodeID == 77) {
      hh.userNodeID = 62;
    } else if (hh.userNodeID == 79) {
      hh.userNodeID = 112;
    } else if (hh.userNodeID == 85) {
      hh.userNodeID = 46;
      hh.userOrientation = 0;
    } else if (hh.userNodeID == 87) {
      hh.userNodeID = 76;
    } else if (hh.userNodeID == 112) {
      hh.userNodeID = 79;
    } else if (hh.userNodeID == 113) {
      hh.userNodeID = 50;
    } else if (hh.userNodeID == 50) {
      hh.userNodeID = 113;
    } else if (hh.userNodeID == 142) {
      hh.userNodeID = 143;
      hh.userOrientation = 3;
    } else if (hh.userNodeID == 143) {
      hh.userNodeID = 142;
      hh.userOrientation = 1;
    }

    // Easter Eggs

    hh.actionCheck();
    hh.moveCheck();
  }
}
