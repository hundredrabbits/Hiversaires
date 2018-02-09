class KillTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id]++;
        if (hh.puzzleState[hh.currentPuzzle.id] > 50) {
          hh.wipePlayerProgress();
          hh.newGame();
        }
      }.bind(this)
    );
  }
}
