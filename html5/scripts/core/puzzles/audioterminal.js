"use strict";

class AudioTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.interface.flashVignette();
    this.update();
  }

  update() {
    hiversaires.interface.showAudio();
    if (hiversaires.game.puzzleState.audio) {
      hiversaires.setModifier("on");
      hiversaires.showModifier(0.3, 0.1);
      hiversaires.music.volume = 1;
    } else {
      hiversaires.hideModifier(0.3, 0);
      hiversaires.music.volume = 0;
    }
  }

  get active() {
    return true;
  }

  performAction() {
    hiversaires.game.puzzleState.audio = !hiversaires.game.puzzleState.audio;
    this.update();
  }
}
