"use strict";

class EntenteTerminal extends Puzzle {
  constructor(id, axis) {
    super(id, {});
    this.axis = axis;
  }

  setup() {
    let axisValue = hiversaires.game.userMaze[this.axis];
    let axisGoal = hiversaires.game.userMazeGoal[this.axis];
    let targetGraphic = ententeIcons.get(Math.sign(axisGoal - axisValue));
    hiversaires.stage.billboard("ententeScreen").image =
      "interface/entente." + this.axis + "." + targetGraphic + ".svg";
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("ententeScreen"),
      1,
      0
    );
  }
}
