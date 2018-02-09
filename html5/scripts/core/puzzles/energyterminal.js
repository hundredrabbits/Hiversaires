class EnergyTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.templateEnergyInterface();

    hh.stage.setHidden(hh.stage.billboard("overlay"), false);

    hh.setCurrentAction(
      function() {
        this.templateUpdateFuse(hh);
        hh.templateEnergyInterface();
        this.templateEnergyUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyUpdate(hh) {
    hh.setCurrentAction(
      function() {
        if (hh.game.puzzleState[hh.currentPuzzle.id] == 1) {
          hh.game.puzzleState[hh.currentPuzzle.id] = 0;
          hh.game.userEnergy += 1;
        } else if (hh.game.userEnergy > 0) {
          hh.game.puzzleState[hh.currentPuzzle.id] = 1;
          hh.game.userEnergy -= 1;
        } else {
          hh.templateEnergyAlert();
        }

        this.templateUpdateFuse(hh);
        hh.templateEnergyInterface();
      }.bind(this)
    );
  }

  templateUpdateFuse(hh) {
    hh.setModifier(
      hh.game.puzzleState[hh.currentPuzzle.id] == 1 ? "filled" : "empty"
    );
    hh.showModifier();
  }
}
