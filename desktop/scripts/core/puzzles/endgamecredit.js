"use strict";

class EndgameCredit extends Puzzle {
  constructor(id) {
    super(id);
  }

  performAction() {
    hiversaires.game.userChapter = Chapter.credit;
    hiversaires.updateMusic();
    hiversaires.interface.showCreditsMenu();
  }
}
