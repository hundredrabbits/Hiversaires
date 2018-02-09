class Illusion extends Puzzle {
  appear() {
    // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

    hiversaires.stage.billboard("illusion").className =
      "node_" +
      hiversaires.game.userNodeID +
      "_" +
      hiversaires.game.userOrientation;

    hiversaires.stage.setAlpha("illusion", 1);
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("illusion"), 0.5, 1);

    hiversaires.game.puzzleState[this.id] = 1;
    hiversaires.illusionInterface();
  }
}
