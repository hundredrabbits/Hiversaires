class Illusion extends Puzzle {
  appear(hh) {
    // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

    hh.billboard("illusion").className =
      "node_" + hh.userNodeID + "_" + hh.userOrientation;

    hh.setAlpha("illusion", 1);
    hh.fadeOut(hh.billboard("illusion"), 0.5, 1);

    if (hh.userChapter == Chapter.act5) {
      hh.puzzleState[this.id] = 1;
      hh.illusionInterface();
    }
  }
}
