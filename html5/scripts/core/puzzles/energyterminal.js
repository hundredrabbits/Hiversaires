class EnergyTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.templateEnergyInterface();

    hh.setHidden(hh.billboard("overlay"), false);

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
        if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
          hh.puzzleState[hh.currentPuzzle.id] = 0;
          hh.userEnergy += 1;
        } else if (hh.userEnergy > 0) {
          hh.puzzleState[hh.currentPuzzle.id] = 1;
          hh.userEnergy -= 1;
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
      hh.puzzleState[hh.currentPuzzle.id] == 1 ? "filled" : "empty"
    );
    hh.showModifier();
  }
}
