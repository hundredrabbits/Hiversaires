class AudioTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.flashVignette();
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState.audio = !hiversaires.game.puzzleState
          .audio;
        this.update();
      }.bind(this)
    );

    this.update();
  }

  update() {
    hiversaires.showAudioInterface();
    if (hiversaires.game.puzzleState.audio) {
      hiversaires.setModifier("on");
      hiversaires.showModifier(0.3, 0.1);
      hiversaires.music.volume = 1;
    } else {
      hiversaires.hideModifier(0.3, 0);
      hiversaires.music.volume = 0;
    }
  }
}
