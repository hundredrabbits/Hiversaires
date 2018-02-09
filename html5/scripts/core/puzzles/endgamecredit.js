class EndgameCredit extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(this.showCredits.bind(this));
  }

  showCredits(hh) {
    hh.game.userChapter = Chapter.credit;
    hh.updateMusic();

    hh.stage.setAlpha("menuBlack", 0.0);
    hh.stage.setHidden(hh.stage.billboard("menuBlack"), false);

    hh.stage.fadeIn(hh.stage.billboard("menuBlack"), 3, 1.0);

    hh.stage.setAlpha("menuCredit1", 0.0);
    hh.stage.setHidden(hh.stage.billboard("menuCredit1"), false);

    hh.stage.fadeIn(hh.stage.billboard("menuCredit1"), 1, 6.0);

    hh.stage.setAlpha("menuCredit2", 0.0);
    hh.stage.setHidden(hh.stage.billboard("menuCredit2"), false);

    hh.stage.fadeIn(hh.stage.billboard("menuCredit2"), 1, 10.0);

    hh.stage.setAlpha("menuCredit3", 0.0);
    hh.stage.setHidden(hh.stage.billboard("menuCredit3"), false);

    hh.stage.fadeIn(hh.stage.billboard("menuCredit3"), 1, 16.0);

    hh.stage.fadeIn(hh.stage.billboard("menuBlack"), 1, 20.0, false);

    if (hh.game.userEnergy == 1) {
      hh.stage.setAlpha("menuCredit4", 0.0);
      hh.stage.setHidden(hh.stage.billboard("menuCredit4"), false);

      hh.stage.fadeIn(hh.stage.billboard("menuCredit4"), 1, 24.0);
    }
  }
}
