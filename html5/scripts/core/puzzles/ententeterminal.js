class EntenteTerminal extends Puzzle {
  constructor(id, axis, defaultState) {
    super(id, {}, defaultState);
    this.axis = axis;
  }

  setup() {
    let targetGraphic = "";

    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 23
    ) {
      if (hiversaires.game.puzzleState[23] > 17) {
        targetGraphic = "Left";
      } else if (hiversaires.game.puzzleState[23] < 17) {
        targetGraphic = "Right";
      } else if (hiversaires.game.puzzleState[23] == 17) {
        targetGraphic = "Right";
      }
    }

    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 24
    ) {
      if (hiversaires.game.puzzleState[24] > 17) {
        targetGraphic = "Left2";
      } else if (hiversaires.game.puzzleState[24] < 17) {
        targetGraphic = "Right2";
      } else if (hiversaires.game.puzzleState[24] == 17) {
        targetGraphic = "Straight";
      }
    }

    hiversaires.stage.setImage(
      "ententeScreen",
      "interface/entente" + targetGraphic + ".svg"
    );
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("ententeScreen"),
      1,
      0
    );
  }
}
