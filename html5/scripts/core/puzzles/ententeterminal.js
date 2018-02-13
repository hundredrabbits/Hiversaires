"use strict";

class EntenteTerminal extends Puzzle {
  constructor(id, axis, goal) {
    super(id, {});
    this.axis = axis;
    this.goal = goal;
  }

  setup() {
    const axisValue = hiversaires.game.userMaze.get(this.axis);
    const axisGoal = this.goal.get(this.axis);
    const targetGraphic = ententeIcons.get(Math.sign(axisGoal - axisValue));
    hiversaires.stage.billboard("ententeScreen").image =
      "interface/entente." + this.axis + "." + targetGraphic + ".svg";
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("ententeScreen"),
      1,
      0
    );
  }
}
