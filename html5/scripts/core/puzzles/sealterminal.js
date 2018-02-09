class SealTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setHidden(hh.billboard("overlay"), false);
    hh.setAlpha("overlay", 0);

    hh.setCurrentAction(
      function() {
        if (
          hh.puzzleState[hh.currentPuzzle.id] == 1 ||
          hh.currentSeals.length < 2
        ) {
          if (hh.puzzleState[hh.currentPuzzle.id] != 1) {
            hiversaires.music.playEffect("action_SealActive");
            hh.puzzleState[hh.currentPuzzle.id] = 1;
          } else {
            hiversaires.music.playEffect("action_SealInactive");
            hh.puzzleState[hh.currentPuzzle.id] = 0;
          }
        } else {
          hiversaires.music.playEffect("action_EnergyStack");
          hh.templateSealAlert();
          console.log("No more seal slots.");
        }

        this.templateSealUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate(hh);
  }

  templateSealUpdate(hh) {
    hh.templateSealInterface();
    hh.fadeOut(hh.billboard("overlay"), 0.5, 0);
    if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("seal." + hh.currentSeals.length);
      hh.showModifier(0.1, 0.2);
    } else {
      hh.hideModifier(0.1, 0.2);
    }
  }
}
