"use strict";

class EntenteTerminal extends Puzzle {
  constructor(id, axis) {
    super(id, {});
    this.axis = axis;
  }

  setup() {
    if (hiversaires.game.userMaze == null) {
      hiversaires.game.userMaze = { x: 0, y: 0 };
    }
    
    let targetGraphic = "";
    let axisValue = hiversaires.game.userMaze[this.axis];

    if (this.axis == MazeAxis.x) {
      if (axisValue > 2) {
        targetGraphic = "Left";
      } else if (axisValue < 2) {
        targetGraphic = "Right";
      } else if (axisValue == 2) {
        targetGraphic = "Right";
      }
    } else if (this.axis == MazeAxis.y) {
      if (axisValue > 17) {
        targetGraphic = "Left2";
      } else if (axisValue < 17) {
        targetGraphic = "Right2";
      } else if (axisValue == 17) {
        targetGraphic = "Straight";
      }
    }

    hiversaires.stage.billboard("ententeScreen").image =
      "interface/entente" + targetGraphic + ".svg";
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("ententeScreen"),
      1,
      0
    );
  }
}
