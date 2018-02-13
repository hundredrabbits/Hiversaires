"use strict";

class Game {
  constructor() {
    this.time = 0;

    this.puzzleState;
    this.userNodeID = 1;
    this.userOrientation = 0;
    this.userChapter = Chapter.act1;
    this.userEnergy = 0;
    this.userFootstep = 0;

    this.userMaze = new Map([[MazeAxis.x, 0], [MazeAxis.y, 0]]);
  }

  start() {
    setTimeout(this.onTic.bind(this), 50);
    this.time = 0;
    if (DEBUG_START_FRESH) {
      this.game.wipePlayerProgress();
    } else {
      this.load();
    }
  }

  get savedData() {
    try {
      return JSON.parse(localStorage.save);
    } catch (error) {}
    return null;
  }

  set savedData(object) {
    localStorage.save = JSON.stringify(object);
  }

  save() {
    if (DEBUG_DONT_SAVE) {
      console.log("DEBUG_DONT_SAVE : did not save state.");
      return;
    }

    const saveObject = {
      userState: {
        userNodeID: this.userNodeID,
        userOrientation: this.userOrientation,
        userChapter: this.userChapter,
        userEnergy: this.userEnergy
      },
      puzzleState: Object.assign({}, this.puzzleState)
    };

    saveObject.puzzleState.seals = Array.from(this.puzzleState.seals);
    saveObject.puzzleState.fuses = Array.from(this.puzzleState.fuses);
    saveObject.puzzleState.illusions = Array.from(this.puzzleState.illusions);

    if (!DEBUG_DONT_SAVE) {
      this.savedData = saveObject;
    }

    console.log("saved state.");

    hiversaires.interface.showSave();
  }

  load() {
    const saveObject = this.savedData;
    if (saveObject != null) {
      // Settings
      const userState = saveObject.userState;
      this.userNodeID = userState.userNodeID;
      this.userOrientation = userState.userOrientation;
      this.userChapter = userState.userChapter;
      this.userEnergy = userState.userEnergy;
      this.sessionKillCount = 0;

      // Storage
      this.puzzleState = Object.assign({}, saveObject.puzzleState);
      this.puzzleState.seals = new Set(saveObject.puzzleState.seals);
      this.puzzleState.fuses = new Set(saveObject.puzzleState.fuses);
      this.puzzleState.illusions = new Set(saveObject.puzzleState.illusions);

      console.log("loaded state.");

      console.log(this.puzzleState);
    } else {
      // New Game

      this.puzzleState = createDefaultState();

      this.userNodeID = 1;
      this.userOrientation = 0;
      this.userChapter = Chapter.act1;
      this.userEnergy = 0;

      console.log("created state.");
    }
  }

  wipePlayerProgress() {
    localStorage.clear();
    console.log("wiped state.");
    this.load();
  }

  onTic() {
    setTimeout(this.onTic.bind(this), 50);
    this.time += 1;
  }
}
