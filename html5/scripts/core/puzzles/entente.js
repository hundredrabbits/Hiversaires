"use strict";

class Entente extends Puzzle {
  constructor(id, effect) {
    super(id);
    this.effect = effect;
  }

  setup() {
    switch (hiversaires.currentSubject.effect) {
      case MazeEffect.incrX:
        this.incrX();
        break;
      case MazeEffect.decrX:
        this.decrX();
        break;
      case MazeEffect.incrY:
        this.incrY();
        break;
      case MazeEffect.decrY:
        this.decrY();
        break;
      case MazeEffect.exitY:
        this.exitY();
        break;
    }

    hiversaires.actionCheck();
    hiversaires.moveCheck();
    hiversaires.actionReset();
  }

  incrX() {
    if (this.mazeX == 17) {
      hiversaires.game.userNodeID = 93;
    } else {
      hiversaires.game.userNodeID = 89;
      if (this.mazeX < 21) {
        this.mazeX = this.mazeX + 3;
      }
    }
  }

  decrX() {
    hiversaires.game.userNodeID = 103;
    if (this.mazeX > 14) {
      this.mazeX = this.mazeX - 1;
    }
  }

  incrY() {
    hiversaires.game.userNodeID = 94;
    hiversaires.game.userOrientation = 2;
    if (this.mazeY < 23) {
      this.mazeY = this.mazeY + 4;
    }
  }

  decrY() {
    hiversaires.game.userNodeID = 95;
    hiversaires.game.userOrientation = 2;
    if (this.mazeY > 14) {
      this.mazeY = this.mazeY - 1;
    }
  }

  exitY() {
    if (this.mazeX == 17 && this.mazeY == 17) {
      hiversaires.game.userNodeID = 107;
      hiversaires.game.userOrientation = 3;
    } else {
      hiversaires.game.userNodeID = 93;
    }
  }

  get mazeX() {
    return hiversaires.game.puzzleState.maze.x;
  }

  set mazeX(value) {
    hiversaires.game.puzzleState.maze.x = value;
  }

  get mazeY() {
    return hiversaires.game.puzzleState.maze.y;
  }

  set mazeY(value) {
    hiversaires.game.puzzleState.maze.y = value;
  }
}
