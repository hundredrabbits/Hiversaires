class Entente extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup() {
    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 43
    ) {
      console.log("templateEntentePart1Incr");
      this.templateEntentePart1Incr();
    }
    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 42
    ) {
      console.log("templateEntentePart1Decr");
      this.templateEntentePart1Decr();
    }
    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 45
    ) {
      console.log("templateEntentePart2Incr");
      this.templateEntentePart2Incr();
    }
    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 44
    ) {
      console.log("templateEntentePart2Decr");
      this.templateEntentePart2Decr();
    }
    if (
      hiversaires.currentPuzzle != null &&
      hiversaires.currentPuzzle.id == 46
    ) {
      console.log("templateEntentePart2Exit");
      this.templateEntentePart2Exit();
    }
  }

  templateEntentePart1Incr() {
    if (hiversaires.game.puzzleState[23] == 17) {
      hiversaires.game.userNodeID = 93;
      hiversaires.actionCheck();
      hiversaires.moveCheck();
      hiversaires.actionReset();
    } else {
      hiversaires.game.userNodeID = 89;

      if (hiversaires.game.puzzleState[23] < 21) {
        hiversaires.game.puzzleState[23] = hiversaires.game.puzzleState[23] + 3;
      }

      hiversaires.actionCheck();
      hiversaires.moveCheck();
      hiversaires.actionReset();
    }
  }

  templateEntentePart1Decr() {
    hiversaires.game.userNodeID = 103;

    if (hiversaires.game.puzzleState[23] > 14) {
      hiversaires.game.puzzleState[23] = hiversaires.game.puzzleState[23] - 1;
    }

    hiversaires.actionCheck();
    hiversaires.moveCheck();
    hiversaires.actionReset();
  }

  templateEntentePart2Incr() {
    hiversaires.game.userNodeID = 94;
    hiversaires.game.userOrientation = 2;

    if (hiversaires.game.puzzleState[24] < 23) {
      hiversaires.game.puzzleState[24] = hiversaires.game.puzzleState[24] + 4;
    }

    hiversaires.actionCheck();
    hiversaires.moveCheck();
    hiversaires.actionReset();
  }

  templateEntentePart2Decr() {
    hiversaires.game.userNodeID = 95;
    hiversaires.game.userOrientation = 2;

    if (hiversaires.game.puzzleState[24] > 14) {
      hiversaires.game.puzzleState[24] = hiversaires.game.puzzleState[24] - 1;
    }

    hiversaires.actionCheck();
    hiversaires.moveCheck();
    hiversaires.actionReset();
  }

  templateEntentePart2Exit() {
    if (
      hiversaires.game.puzzleState[23] == 17 &&
      hiversaires.game.puzzleState[24] == 17
    ) {
      hiversaires.game.userNodeID = 107;
      hiversaires.game.userOrientation = 3;

      hiversaires.actionCheck();
      hiversaires.moveCheck();
      hiversaires.actionReset();
    } else {
      hiversaires.game.userNodeID = 93;

      hiversaires.actionCheck();
      hiversaires.moveCheck();
      hiversaires.actionReset();
    }
  }
}
