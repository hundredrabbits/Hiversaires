class KillTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.sessionKillCount++;
        if (hiversaires.game.sessionKillCount > 50) {
          hiversaires.game.wipePlayerProgress();
          hiversaires.newGame();
        }
      }.bind(this)
    );
  }
}
