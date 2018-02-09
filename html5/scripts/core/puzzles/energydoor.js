class EnergyDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setHidden(hh.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hh.templateEnergyInterface();

    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setCurrentAction(
        function() {
          this.openDoor(hh);
          hh.templateEnergyInterface();
        }.bind(this)
      );
      let modifier = "open";
      let secret = hh.currentPuzzle.info.secret;
      if (secret != null && hh.checkConditions(secret.conditions)) {
        modifier = "secret";
      }
      hh.setModifier(modifier);
    } else {
      hh.templateEnergyAlert();
    }
  }
}
