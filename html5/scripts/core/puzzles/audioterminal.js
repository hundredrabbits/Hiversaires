class AudioTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setCurrentAction(
      function() {
        hh.game.puzzleState[hh.currentPuzzle.id] =
          (hh.game.puzzleState[hh.currentPuzzle.id] + 1) % 2;
        this.templateAudioUpdate(hh);
      }.bind(this)
    );

    this.templateAudioUpdate(hh);
  }

  templateAudioUpdate(hh) {
    hh.templateAudioInterface();
    if (hh.game.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("on");
      hh.showModifier(0.3, 0.1);
      hiversaires.music.volume = 1;
    } else {
      hh.hideModifier(0.3, 0);
      hiversaires.music.volume = 0;
    }
  }
}
