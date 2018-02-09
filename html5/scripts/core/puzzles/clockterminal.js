class ClockTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id] =
          (hh.puzzleState[hh.currentPuzzle.id] + 1) % 3;
        hiversaires.music.playEffect("action_EnergyActive");
        this.templateClockUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate(hh);
  }

  templateClockUpdate(hh) {
    hh.templateClockInterface();

    hh.setImage(
      "clockFace",
      "interface/dimclock.state" + hh.puzzleState[1] + ".svg"
    );

    hh.fadeIn(hh.billboard("clockShadow"), 1.5, 0.5);
    hh.fadeIn(hh.billboard("clockFace"), 0.5, 0.5);
  }
}
