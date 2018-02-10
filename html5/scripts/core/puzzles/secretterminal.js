"use strict";

class SecretTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.interface.flashVignette();
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState.secret = !hiversaires.game.puzzleState
          .secret;
        this.update();
      }.bind(this)
    );

    this.update();
  }

  update() {
    if (hiversaires.game.puzzleState.secret) {
      hiversaires.setModifier("on");
      hiversaires.showModifier(0.3, 0.1);
    } else {
      hiversaires.hideModifier(0.3, 0);
    }
  }
}
