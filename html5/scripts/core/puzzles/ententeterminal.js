class EntenteTerminal extends Puzzle {
  constructor(id, axis) {
    super(id, {});
    this.axis = axis;
  }

  setup() {
    let targetGraphic = "";

    let axisValue = hiversaires.game.puzzleState.maze[this.axis];

    if (this.axis == "x") {
      if (axisValue > 17) {
        targetGraphic = "Left";
      } else if (axisValue < 17) {
        targetGraphic = "Right";
      } else if (axisValue == 17) {
        targetGraphic = "Right";
      }
    } else if (this.axis == "y") {
      if (axisValue > 17) {
        targetGraphic = "Left2";
      } else if (axisValue < 17) {
        targetGraphic = "Right2";
      } else if (axisValue == 17) {
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
