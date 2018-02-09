class EnergyTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.templateEnergyInterface();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), false);

    hiversaires.setCurrentAction(
      function() {
        this.templateUpdateFuse();
        hiversaires.templateEnergyInterface();
        this.templateEnergyUpdate();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyUpdate() {
    hiversaires.setCurrentAction(
      function() {
        if (hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] == 1) {
          hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] = 0;
          hiversaires.game.userEnergy += 1;
        } else if (hiversaires.game.userEnergy > 0) {
          hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] = 1;
          hiversaires.game.userEnergy -= 1;
        } else {
          hiversaires.templateEnergyAlert();
        }

        this.templateUpdateFuse();
        hiversaires.templateEnergyInterface();
      }.bind(this)
    );
  }

  templateUpdateFuse() {
    hiversaires.setModifier(
      hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] == 1
        ? "filled"
        : "empty"
    );
    hiversaires.showModifier();
  }
}
