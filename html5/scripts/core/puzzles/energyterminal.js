class EnergyTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.flashVignette();
    hiversaires.showEnergyInterface();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), false);

    hiversaires.setCurrentAction(
      function() {
        this.updateFuse();
        hiversaires.showEnergyInterface();
        this.update();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");
  }

  update() {
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
          hiversaires.showEnergyAlert();
        }

        this.updateFuse();
        hiversaires.showEnergyInterface();
      }.bind(this)
    );
  }

  updateFuse() {
    hiversaires.setModifier(
      hiversaires.game.puzzleState.fuses.indexOf(this.id) != -1
        ? "filled"
        : "empty"
    );
    hiversaires.showModifier();
  }
}
