class EndgameCredit extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.setCurrentAction(this.showCredits.bind(this));
  }

  showCredits() {
    hiversaires.game.userChapter = Chapter.credit;
    hiversaires.updateMusic();

    hiversaires.stage.setAlpha("menuBlack", 0.0);
    hiversaires.stage.setHidden(
      hiversaires.stage.billboard("menuBlack"),
      false
    );

    hiversaires.stage.fadeIn(hiversaires.stage.billboard("menuBlack"), 3, 1.0);

    hiversaires.stage.setAlpha("menuCredit1", 0.0);
    hiversaires.stage.setHidden(
      hiversaires.stage.billboard("menuCredit1"),
      false
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit1"),
      1,
      6.0
    );

    hiversaires.stage.setAlpha("menuCredit2", 0.0);
    hiversaires.stage.setHidden(
      hiversaires.stage.billboard("menuCredit2"),
      false
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit2"),
      1,
      10.0
    );

    hiversaires.stage.setAlpha("menuCredit3", 0.0);
    hiversaires.stage.setHidden(
      hiversaires.stage.billboard("menuCredit3"),
      false
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit3"),
      1,
      16.0
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuBlack"),
      1,
      20.0,
      false
    );

    if (hiversaires.game.userEnergy == 1) {
      hiversaires.stage.setAlpha("menuCredit4", 0.0);
      hiversaires.stage.setHidden(
        hiversaires.stage.billboard("menuCredit4"),
        false
      );

      hiversaires.stage.fadeIn(
        hiversaires.stage.billboard("menuCredit4"),
        1,
        24.0
      );
    }
  }
}
