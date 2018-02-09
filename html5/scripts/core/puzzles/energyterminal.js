class EnergyTerminal extends Puzzle {
  constructor(id) {
    super(id);
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
        let index = hiversaires.game.puzzleState.fuses.indexOf(this.id);

        if (index != -1) {
          hiversaires.game.puzzleState.fuses.splice(index, 1);
          hiversaires.game.userEnergy += 1;
        } else if (hiversaires.game.userEnergy > 0) {
          hiversaires.game.puzzleState.fuses.push(this.id);
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
      hiversaires.game.puzzleState.fuses.indexOf(this.id) != -1
        ? "filled"
        : "empty"
    );
    hiversaires.showModifier();
  }
}
