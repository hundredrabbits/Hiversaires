class EndgameCredit extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(this.showCredits.bind(this));
  }

  showCredits(hh) {
    hh.userChapter = Chapter.credit;
    hh.updateMusic();

    hh.setAlpha("menuBlack", 0.0);
    hh.setHidden(hh.billboard("menuBlack"), false);

    hh.fadeIn(hh.billboard("menuBlack"), 3, 1.0);

    hh.setAlpha("menuCredit1", 0.0);
    hh.setHidden(hh.billboard("menuCredit1"), false);

    hh.fadeIn(hh.billboard("menuCredit1"), 1, 6.0);

    hh.setAlpha("menuCredit2", 0.0);
    hh.setHidden(hh.billboard("menuCredit2"), false);

    hh.fadeIn(hh.billboard("menuCredit2"), 1, 10.0);

    hh.setAlpha("menuCredit3", 0.0);
    hh.setHidden(hh.billboard("menuCredit3"), false);

    hh.fadeIn(hh.billboard("menuCredit3"), 1, 16.0);

    hh.fadeIn(hh.billboard("menuBlack"), 1, 20.0, false);

    if (hh.userEnergy == 1) {
      hh.setAlpha("menuCredit4", 0.0);
      hh.setHidden(hh.billboard("menuCredit4"), false);

      hh.fadeIn(hh.billboard("menuCredit4"), 1, 24.0);
    }
  }
}
