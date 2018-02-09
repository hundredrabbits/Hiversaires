class SealDoor extends Door {
  constructor(id, info, defaultState, fadeDuration) {
    super(id, info, defaultState, fadeDuration);
  }

  setup(hh) {
    hh.templateVignette();

    hh.stage.setHidden(hh.stage.billboard("overlay"), true);

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
      (hh.game.userNodeID == 46 || hh.game.userNodeID == 85)
    ) {
      // Act 1 : Forest + Rainre in Stones
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.game.userChapter = Chapter.act2;
      hh.setModifier("open");
      hh.game.save();
    } else if (
      containsMetamondst &&
      containsRainre &&
      (hh.game.userNodeID == 11 || hh.game.userNodeID == 48)
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.game.userChapter = Chapter.act3;
      hh.setModifier("open");
      hh.game.save();
    } else if (
      containsAntechannel &&
      containsRainre &&
      (hh.game.userNodeID == 46 || hh.game.userNodeID == 85)
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.game.userChapter = Chapter.act4;
      hh.setModifier("open");
      hh.game.save();
    } else if (
      containsAntechannel &&
      containsStones &&
      hh.game.userNodeID == 1
    ) {
      // Act 4 : Antechannel + Stones in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
      hh.game.save();
    } else if (
      containsAntechannel &&
      containsStones &&
      (hh.game.userNodeID == 76 || hh.game.userNodeID == 87)
    ) {
      // Act 4 : Antechannel + Stones in Metamondst
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
    } else {
      hh.templateSealAlert();
    }
  }
}
