class SealTerminal extends Puzzle {
  constructor(id, seal, defaultState) {
    super(id, {}, defaultState);
    this.seal = seal;
  }

  setup() {
    hiversaires.templateVignette();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), false);
    hiversaires.stage.setAlpha("overlay", 0);

    hiversaires.setCurrentAction(
      function() {
        if (
          hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] == 1 ||
          hiversaires.currentSeals.length < 2
        ) {
          if (hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] != 1) {
            hiversaires.music.playEffect("action_SealActive");
            hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] = 1;
          } else {
            hiversaires.music.playEffect("action_SealInactive");
            hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] = 0;
          }
        } else {
          hiversaires.music.playEffect("action_EnergyStack");
          hiversaires.templateSealAlert();
          console.log("No more seal slots.");
        }

        this.templateSealUpdate();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate();
  }

  templateSealUpdate() {
    hiversaires.templateSealInterface();
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("overlay"), 0.5, 0);
    if (hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] == 1) {
      hiversaires.setModifier("seal." + hiversaires.currentSeals.length);
      hiversaires.showModifier(0.1, 0.2);
    } else {
      hiversaires.hideModifier(0.1, 0.2);
    }
  }
}
