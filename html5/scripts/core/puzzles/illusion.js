class Illusion extends Puzzle {
  appear(hh) {
    // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

    hh.stage.billboard("illusion").className =
      "node_" + hh.game.userNodeID + "_" + hh.game.userOrientation;

    hh.stage.setAlpha("illusion", 1);
    hh.stage.fadeOut(hh.stage.billboard("illusion"), 0.5, 1);

    if (hh.game.userChapter == Chapter.act5) {
      hh.game.puzzleState[this.id] = 1;
      hh.illusionInterface();
    }
  }
}
