class SecretTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState.secret = !hiversaires.game.puzzleState
          .secret;
        this.templateSecretUpdate();
      }.bind(this)
    );

    this.templateSecretUpdate();
  }

  templateSecretUpdate() {
    if (hiversaires.game.puzzleState.secret) {
      hiversaires.setModifier("on");
      hiversaires.showModifier(0.3, 0.1);
    } else {
      hiversaires.hideModifier(0.3, 0);
    }
  }
}
