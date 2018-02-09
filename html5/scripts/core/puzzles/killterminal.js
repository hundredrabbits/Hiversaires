class KillTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    hiversaires.setCurrentAction(
      function() {
        hiversaires.game.puzzleState[hiversaires.currentPuzzle.id]++;
        if (hiversaires.game.puzzleState[hiversaires.currentPuzzle.id] > 50) {
          hiversaires.game.wipePlayerProgress();
          hiversaires.newGame();
        }
      }.bind(this)
    );
  }
}
