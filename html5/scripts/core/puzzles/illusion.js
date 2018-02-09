class Illusion extends Puzzle {
  constructor(id, nodeID, orientation) {
    super(id);
    this.nodeID = nodeID;
    this.orientation = orientation;
  }

  appear() {
    // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

    hiversaires.stage.billboard("illusion").className =
      "node_" +
      hiversaires.game.userNodeID +
      "_" +
      hiversaires.game.userOrientation;

    hiversaires.stage.setAlpha("illusion", 1);
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("illusion"), 0.5, 1);

    if (!hiversaires.game.puzzleState.illusions.includes(this.id)) {
      hiversaires.game.puzzleState.illusions.push(this.id);
    }
    hiversaires.illusionInterface();
  }
}
