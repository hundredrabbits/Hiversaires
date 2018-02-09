class SealTerminal extends Puzzle {
  constructor(id, seal) {
    super(id, {});
    this.seal = seal;
  }

  setup() {
    hiversaires.flashVignette();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), false);
    hiversaires.stage.setAlpha("overlay", 0);

    hiversaires.setCurrentAction(
      function() {
        let seals = hiversaires.game.puzzleState.seals;
        let index = seals.indexOf(this.seal);

        if (index != -1 || seals.length < 2) {
          if (index == -1) {
            hiversaires.music.playEffect("action_SealActive");
            seals.push(this.seal);
          } else {
            hiversaires.music.playEffect("action_SealInactive");
            seals.splice(index, 1);
          }
        } else {
          hiversaires.music.playEffect("action_EnergyStack");
          hiversaires.showSealAlert();
          console.log("No more seal slots.");
        }

        this.update();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_SealInit");
    this.update();
  }

  update() {
    hiversaires.showSealInterface();
    if (hiversaires.game.puzzleState.seals.includes(this.seal)) {
      hiversaires.setModifier("seal." + hiversaires.currentSeals.length);
      hiversaires.showModifier(0.1, 0.1);
    } else {
      hiversaires.hideModifier(0.2, 0.2);
    }
  }
}
