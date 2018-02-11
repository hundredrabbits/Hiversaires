"use strict";

class Entente extends Puzzle {
  constructor(id, effect) {
    super(id);
    this.effect = effect;

    this.minX = -1;
    this.maxX = 6;
    this.incrX = 3;
    this.decrX = 1;
    this.goalX = 2;
    this.minY = 14;
    this.maxY = 23;
    this.incrY = 4;
    this.decrY = 1;
    this.goalY = 17;

    this.incrXNodeID = 89;
    this.decrXNodeID = 103;
    this.part2NodeID = 92;
    this.incrYNodeID = 94;
    this.decrYNodeID = 95;
    this.incrYOrientation = 2;
    this.decrYOrientation = 2;
    this.exitNodeID = 107;
    this.exitOrientation = 3;
  }

  setup() {
    if (hiversaires.game.userMaze == null) {
      hiversaires.game.userMaze = { x: 0, y: 0 };
    }

    switch (hiversaires.currentSubject.effect) {
      case MazeEffect.incrX:
        if (this.mazeX == this.goalX) {
          hiversaires.game.userNodeID = this.part2NodeID;
        } else {
          hiversaires.game.userNodeID = this.incrXNodeID;
          if (this.mazeX < this.maxX) {
            this.mazeX += this.incrX;
          }
        }
        break;
      case MazeEffect.decrX:
        hiversaires.game.userNodeID = this.decrXNodeID;
        if (this.mazeX > this.minX) {
          this.mazeX -= this.decrX;
        }
        break;
      case MazeEffect.incrY:
        hiversaires.game.userNodeID = this.incrYNodeID;
        hiversaires.game.userOrientation = this.incrYOrientation;
        if (this.mazeY < this.maxY) {
          this.mazeY += this.incrY;
        }
        break;
      case MazeEffect.decrY:
        hiversaires.game.userNodeID = this.decrYNodeID;
        hiversaires.game.userOrientation = this.decrYOrientation;
        if (this.mazeY > this.minY) {
          this.mazeY -= this.decrY;
        }
        break;
      case MazeEffect.exitY:
        hiversaires.game.userNodeID = this.part2NodeID;
        if (this.mazeX == this.goalX && this.mazeY == this.goalY) {
          hiversaires.game.userNodeID = this.exitNodeID;
          hiversaires.game.userOrientation = this.exitOrientation;
          [this.mazeX, this.mazeY] = [0, 0];
        }
        break;
    }

    hiversaires.moveCheck();
  }

  get mazeX() {
    return hiversaires.game.userMaze[MazeAxis.x];
  }

  set mazeX(value) {
    hiversaires.game.userMaze[MazeAxis.x] = value;
  }

  get mazeY() {
    return hiversaires.game.userMaze[MazeAxis.y];
  }

  set mazeY(value) {
    hiversaires.game.userMaze[MazeAxis.y] = value;
  }
}
