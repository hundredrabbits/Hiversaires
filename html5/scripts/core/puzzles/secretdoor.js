class SecretDoor extends Door {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");

    if (hiversaires.game.puzzleState.secret) {
      hiversaires.setCurrentAction(this.walkThroughDoor.bind(this));
    }
  }
}
