class ProgressTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.prefSave();

    hh.setImage(
      "progressPane",
      "interface/progress." + hh.userChapter + ".svg"
    );

    hh.fadeIn(hh.billboard("progressPane"), 0.5, 0.3);
  }
}
