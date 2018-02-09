class SecretTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id] =
          (hh.puzzleState[hh.currentPuzzle.id] + 1) % 2;
        this.templateSecretUpdate(hh);
      }.bind(this)
    );

    this.templateSecretUpdate(hh);
  }

  templateSecretUpdate(hh) {
    if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("on");
      hh.showModifier(0.3, 0.1);
    } else {
      hh.hideModifier(0.3, 0);
    }
  }
}
