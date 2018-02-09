class ClockTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.templateVignette();

    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] =
          (hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] + 1) % 3;
        hiversaires.music.playEffect("action_EnergyActive");
        this.templateClockUpdate();
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate();
  }

  templateClockUpdate() {
    hiversaires.templateClockInterface();

    hiversaires.stage.setImage(
      "clockFace",
      "interface/dimclock.state" + hiversaires.game.puzzleState[1] + ".svg"
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("clockShadow"),
      1.5,
      0.5
    );
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("clockFace"),
      0.5,
      0.5
    );
  }
}
