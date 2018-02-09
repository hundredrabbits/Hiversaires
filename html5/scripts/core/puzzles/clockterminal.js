class ClockTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setCurrentAction(
      function() {
        hh.game.puzzleState[hh.currentPuzzle.id] =
          (hh.game.puzzleState[hh.currentPuzzle.id] + 1) % 3;
        hiversaires.music.playEffect("action_EnergyActive");
        this.templateClockUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate(hh);
  }

  templateClockUpdate(hh) {
    hh.templateClockInterface();

    hh.stage.setImage(
      "clockFace",
      "interface/dimclock.state" + hh.game.puzzleState[1] + ".svg"
    );

    hh.stage.fadeIn(hh.stage.billboard("clockShadow"), 1.5, 0.5);
    hh.stage.fadeIn(hh.stage.billboard("clockFace"), 0.5, 0.5);
  }
}
