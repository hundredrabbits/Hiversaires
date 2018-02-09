class EntenteTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    let targetGraphic = "";

    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 23) {
      if (hh.game.puzzleState[23] > 17) {
        targetGraphic = "Left";
      } else if (hh.game.puzzleState[23] < 17) {
        targetGraphic = "Right";
      } else if (hh.game.puzzleState[23] == 17) {
        targetGraphic = "Right";
      }
    }

    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 24) {
      if (hh.game.puzzleState[24] > 17) {
        targetGraphic = "Left2";
      } else if (hh.game.puzzleState[24] < 17) {
        targetGraphic = "Right2";
      } else if (hh.game.puzzleState[24] == 17) {
        targetGraphic = "Straight";
      }
    }

    hh.stage.setImage(
      "ententeScreen",
      "interface/entente" + targetGraphic + ".svg"
    );
    hh.stage.fadeIn(hh.stage.billboard("ententeScreen"), 1, 0);
  }
}
