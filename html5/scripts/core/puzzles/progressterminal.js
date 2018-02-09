class ProgressTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.game.save();

    hh.stage.setImage(
      "progressPane",
      "interface/progress." + hh.game.userChapter + ".svg"
    );

    hh.stage.fadeIn(hh.stage.billboard("progressPane"), 0.5, 0.3);
  }
}
