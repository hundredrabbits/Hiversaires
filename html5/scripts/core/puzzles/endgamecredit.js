"use strict";

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

    hiversaires.stage.billboard("menuBlack").alpha = 0.0;
    hiversaires.stage.billboard("menuBlack").hidden = false;

    hiversaires.stage.fadeIn(hiversaires.stage.billboard("menuBlack"), 3, 1.0);

    hiversaires.stage.billboard("menuCredit1").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit1").hidden = false;

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit1"),
      1,
      6.0
    );

    hiversaires.stage.billboard("menuCredit2").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit2").hidden = false;

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit2"),
      1,
      10.0
    );

    hiversaires.stage.billboard("menuCredit3").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit3").hidden = false;

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
      hiversaires.stage.billboard("menuCredit4").alpha = 0.0;
      hiversaires.stage.billboard("menuCredit4").hidden = false;

      hiversaires.stage.fadeIn(
        hiversaires.stage.billboard("menuCredit4"),
        1,
        24.0
      );
    }
  }
}
