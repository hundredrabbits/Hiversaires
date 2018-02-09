class AudioTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState.audio = !hiversaires.game.puzzleState
          .audio;
        this.templateAudioUpdate();
      }.bind(this)
    );

    this.templateAudioUpdate();
  }

  templateAudioUpdate() {
    hiversaires.templateAudioInterface();
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
