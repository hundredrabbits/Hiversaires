class SecretEnergyDoor extends EnergyDoor {
  constructor(id, fuseIDs) {
    super(id, fuseIDs);
  }

  setup() {
    if (this.isSecretUnlocked() && this.isUnlocked()) {
      hiversaires.flashVignette();
      hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
      hiversaires.music.playEffect("action_DoorInit");
      hiversaires.showEnergyInterface();

      hiversaires.setCurrentAction(
        function() {
          this.openDoor();
          hiversaires.showEnergyInterface();
        }.bind(this)
      );

      hiversaires.setModifier("secret");
    } else {
      super.setup();
    }
  }

  isSecretUnlocked() {
    return (
      hiversaires.game.puzzleState.studio &&
      hiversaires.game.puzzleState.fuses.includes(31)
    );
  }
}
