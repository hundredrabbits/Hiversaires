class SealDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setHidden(hh.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    hh.templateSealInterface();

    const seals = hh.currentSeals;
    const containsForest = seals.indexOf(Zone.forest) != -1;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;
    const containsRainre = seals.indexOf(Zone.rainre) != -1;
    const containsMetamondst = seals.indexOf(Zone.metamondst) != -1;

    let modifier = null;

    if (
      containsForest &&
      containsRainre &&
      (hh.userNodeID == 46 || hh.userNodeID == 85)
    ) {
      // Act 1 : Forest + Rainre in Stones
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act2;
      hh.setModifier("open");
      hh.prefSave();
    } else if (
      containsMetamondst &&
      containsRainre &&
      (hh.userNodeID == 11 || hh.userNodeID == 48)
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act3;
      hh.setModifier("open");
      hh.prefSave();
    } else if (
      containsAntechannel &&
      containsRainre &&
      (hh.userNodeID == 46 || hh.userNodeID == 85)
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act4;
      hh.setModifier("open");
      hh.prefSave();
    } else if (containsAntechannel && containsStones && hh.userNodeID == 1) {
      // Act 4 : Antechannel + Stones in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
      hh.prefSave();
    } else {
      hh.templateSealAlert();
    }
  }
}
