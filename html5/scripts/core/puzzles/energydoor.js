class EnergyDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.templateEnergyInterface();

    if (
      hiversaires.checkConditions(hiversaires.currentPuzzle.info.conditions)
    ) {
      hiversaires.setCurrentAction(
        function() {
          this.openDoor();
          hiversaires.templateEnergyInterface();
        }.bind(this)
      );
      let modifier = "open";
      let secret = hiversaires.currentPuzzle.info.secret;
      if (secret != null && hiversaires.checkConditions(secret.conditions)) {
        modifier = "secret";
      }
      hiversaires.setModifier(modifier);
    } else {
      hiversaires.templateEnergyAlert();
    }
  }
}
