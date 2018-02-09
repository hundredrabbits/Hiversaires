class ClockTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.templateVignette();

    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState.clock =
          (hiversaires.game.puzzleState.clock + 1) % 3;
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
      "interface/dimclock.state" + hiversaires.game.puzzleState.clock + ".svg"
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
