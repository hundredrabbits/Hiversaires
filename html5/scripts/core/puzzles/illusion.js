"use strict";

class Illusion extends Puzzle {
  constructor(id, nodeID, orientation) {
    super(id);
    this.nodeID = nodeID;
    this.orientation = orientation;
  }

  appear() {
    hiversaires.stage.billboard("illusion").className =
      "node_" +
      hiversaires.game.userNodeID +
      "_" +
      hiversaires.game.userOrientation;

    hiversaires.stage.billboard("illusion").alpha = 1;
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("illusion"), 0.5, 1);

    hiversaires.game.puzzleState.illusions.add(hiversaires.game.userNodeID);
    hiversaires.interface.showIllusion();
  }
}
