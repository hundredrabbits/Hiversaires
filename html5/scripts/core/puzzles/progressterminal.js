class ProgressTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();
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
