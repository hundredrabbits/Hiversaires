class StudioDoor extends Door {
  constructor(id, fadeDuration) {
    super(id, fadeDuration);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");

    if (this.isUnlocked()) {
      hiversaires.setCurrentAction(this.openDoor.bind(this));
      hiversaires.setModifier("open");
    }
  }

  isUnlocked() {
    return hiversaires.game.puzzleState.studio;
  }
}
