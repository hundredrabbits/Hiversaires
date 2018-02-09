class Door extends Puzzle {
  constructor(id, info, defaultState, fadeDuration = 0) {
    super(id, info, defaultState);
    this.fadeDuration = fadeDuration;
  }

  openDoor() {
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), false);
    hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("overlay"),
      this.fadeDuration,
      0
    );
  }

  walkThroughDoor() {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (hiversaires.game.userNodeID == 1) {
      hiversaires.game.userNodeID = 103;
    } else if (hiversaires.game.userNodeID == 11) {
      hiversaires.game.userNodeID = 48;
      hiversaires.game.userOrientation = 2;
    } else if (hiversaires.game.userNodeID == 13) {
      hiversaires.game.userNodeID = 12;
    } else if (hiversaires.game.userNodeID == 12) {
      hiversaires.game.userNodeID = 13;
    } else if (hiversaires.game.userNodeID == 16) {
      hiversaires.game.userNodeID = 22;
    } else if (
      hiversaires.game.userNodeID == 20 &&
      hiversaires.game.puzzleState[37] > 0
    ) {
      hiversaires.game.userNodeID = 116;
      hiversaires.game.userOrientation = 1;
    } else if (hiversaires.game.userNodeID == 23) {
      // Fold Gate
      hiversaires.game.userNodeID = 22;
    } else if (hiversaires.game.userNodeID == 25) {
      hiversaires.game.userNodeID = 31;
      hiversaires.game.userOrientation = 2;
    } else if (hiversaires.game.userNodeID == 27) {
      hiversaires.game.userNodeID = 32;
      hiversaires.game.userOrientation = 1;
    } else if (hiversaires.game.userNodeID == 35) {
      hiversaires.game.userNodeID = 31;
      hiversaires.game.userOrientation = 0;
    } else if (
      hiversaires.game.userNodeID == 39 &&
      hiversaires.game.puzzleState[5] == 1 &&
      hiversaires.game.puzzleState[31] == 1
    ) {
      hiversaires.game.userNodeID = 34;
    } else if (hiversaires.game.userNodeID == 39) {
      hiversaires.game.userNodeID = 45;
    } else if (hiversaires.game.userNodeID == 46) {
      hiversaires.game.userNodeID = 85;
      hiversaires.game.userOrientation = 2;
    } else if (hiversaires.game.userNodeID == 48) {
      hiversaires.game.userNodeID = 11;
      hiversaires.game.userOrientation = 2;
    } else if (hiversaires.game.userNodeID == 52) {
      hiversaires.game.userNodeID = 32;
      hiversaires.game.userOrientation = 3;
    } else if (hiversaires.game.userNodeID == 61) {
      hiversaires.game.userNodeID = 72;
    } else if (hiversaires.game.userNodeID == 62) {
      hiversaires.game.userNodeID = 77;
    } else if (hiversaires.game.userNodeID == 69) {
      hiversaires.game.userNodeID = 72;
    } else if (hiversaires.game.userNodeID == 76) {
      hiversaires.game.userNodeID = 87;
    } else if (hiversaires.game.userNodeID == 77) {
      hiversaires.game.userNodeID = 62;
    } else if (hiversaires.game.userNodeID == 79) {
      hiversaires.game.userNodeID = 112;
    } else if (hiversaires.game.userNodeID == 85) {
      hiversaires.game.userNodeID = 46;
      hiversaires.game.userOrientation = 0;
    } else if (hiversaires.game.userNodeID == 87) {
      hiversaires.game.userNodeID = 76;
    } else if (hiversaires.game.userNodeID == 112) {
      hiversaires.game.userNodeID = 79;
    } else if (hiversaires.game.userNodeID == 113) {
      hiversaires.game.userNodeID = 50;
    } else if (hiversaires.game.userNodeID == 50) {
      hiversaires.game.userNodeID = 113;
    } else if (hiversaires.game.userNodeID == 142) {
      hiversaires.game.userNodeID = 143;
      hiversaires.game.userOrientation = 3;
    } else if (hiversaires.game.userNodeID == 143) {
      hiversaires.game.userNodeID = 142;
      hiversaires.game.userOrientation = 1;
    }

    // Easter Eggs

    hiversaires.actionCheck();
    hiversaires.moveCheck();
  }
}
