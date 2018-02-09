class ProgressTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.flashVignette();
    hiversaires.game.save();

    hiversaires.stage.setImage(
      "progressPane",
      "interface/progress." + hiversaires.game.userChapter + ".svg"
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("progressPane"),
      0.5,
      0.3
    );
  }
}
