"use strict";

class EntenteProgressTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.interface.flashVignette();
    hiversaires.game.save();

    hiversaires.stage.billboard("ententeScreen").image =
      "interface/progress.entente.svg";

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("ententeScreen"),
      0.5,
      0.3
    );
  }
}
