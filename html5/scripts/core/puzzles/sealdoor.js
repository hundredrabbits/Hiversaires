class SealDoor extends Door {
  constructor(id, info, defaultState, fadeDuration) {
    super(id, info, defaultState, fadeDuration);
  }

  setup() {
    hiversaires.templateVignette();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.templateSealInterface();

    const seals = hiversaires.currentSeals;
    const containsForest = seals.indexOf(Zone.forest) != -1;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;
    const containsRainre = seals.indexOf(Zone.rainre) != -1;
    const containsMetamondst = seals.indexOf(Zone.metamondst) != -1;

    let modifier = null;

    if (
      containsForest &&
      containsRainre &&
      (hiversaires.game.userNodeID == 46 || hiversaires.game.userNodeID == 85)
    ) {
      // Act 1 : Forest + Rainre in Stones
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.game.userChapter = Chapter.act2;
      hiversaires.setModifier("open");
      hiversaires.game.save();
    } else if (
      containsMetamondst &&
      containsRainre &&
      (hiversaires.game.userNodeID == 11 || hiversaires.game.userNodeID == 48)
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.game.userChapter = Chapter.act3;
      hiversaires.setModifier("open");
      hiversaires.game.save();
    } else if (
      containsAntechannel &&
      containsRainre &&
      (hiversaires.game.userNodeID == 46 || hiversaires.game.userNodeID == 85)
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.game.userChapter = Chapter.act4;
      hiversaires.setModifier("open");
      hiversaires.game.save();
    } else if (
      containsAntechannel &&
      containsStones &&
      hiversaires.game.userNodeID == 1
    ) {
      // Act 4 : Antechannel + Stones in Forest
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
      hiversaires.game.save();
    } else if (
      containsAntechannel &&
      containsStones &&
      (hiversaires.game.userNodeID == 76 || hiversaires.game.userNodeID == 87)
    ) {
      // Act 4 : Antechannel + Stones in Metamondst
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
    } else {
      hiversaires.templateSealAlert();
    }
  }
}
