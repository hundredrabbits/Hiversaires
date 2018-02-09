class SealDoor extends Door {
  constructor(id, seals, fadeDuration) {
    super(id, fadeDuration);
    this.seals = seals;
  }

  setup() {
    hiversaires.flashVignette();

    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.showSealInterface();

    const seals = hiversaires.currentSeals;
    const containsForest = seals.includes(Zone.forest);
    const containsAntechannel = seals.includes(Zone.antechannel);
    const containsStones = seals.includes(Zone.stones);
    const containsRainre = seals.includes(Zone.rainre);
    const containsMetamondst = seals.includes(Zone.metamondst);

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
      hiversaires.showSealAlert();
    }
  }
}
