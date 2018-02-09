class KillTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(
      function() {
        hh.game.puzzleState[hh.currentPuzzle.id]++;
        if (hh.game.puzzleState[hh.currentPuzzle.id] > 50) {
          hh.game.wipePlayerProgress();
          hh.newGame();
        }
      }.bind(this)
    );
  }
}
