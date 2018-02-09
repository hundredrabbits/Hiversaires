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
    this.currentAction = null;
  }

  start() {
    setTimeout(this.onTic.bind(this), 50);
    if (DEBUG_LOG_GHOST) {
      this.save(0);
    }
    this.time = 0;
    this.load(this.state);
  }

  save() {
    if (DEBUG_DONT_SAVE) {
      console.log("DEBUG_DONT_SAVE : did not save state.");
      return;
    }

    let saveObject = {
      userState: {
        userNodeID: this.userNodeID,
        userOrientation: this.userOrientation,
        userChapter: this.userChapter,
        userEnergy: this.userEnergy
      },
      puzzleState: this.puzzleState
    };

    if (!DEBUG_DONT_SAVE) {
      localStorage.save = JSON.stringify(saveObject);
    }

    console.log("saved state.");

    hiversaires.showSaveInterface();
  }

  load() {
    let saveObject = null;
    try {
      saveObject = JSON.parse(localStorage.save);
    } catch (error) {}

    if (saveObject != null) {
      // Settings
      let userState = saveObject.userState;
      this.userNodeID = userState.userNodeID;
      this.userOrientation = userState.userOrientation;
      this.userChapter = userState.userChapter;
      this.userEnergy = userState.userEnergy;
      this.sessionKillCount = 0;

      // Storage
      this.puzzleState = saveObject.puzzleState;

      console.log("loaded state.");

      console.log(this.puzzleState);
    } else {
      // New Game

      this.puzzleState = {
        seals: [],
        fuses: [31, 38, 39],
        illusions: [],
        clock: 0,
        audio: true,
        studio: false,
        secret: false,
        timeDoor: false,
        maze: { x: 15, y: 0 }
      };

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
  }

  onTic() {
    setTimeout(this.onTic.bind(this), 50);
    this.time += 1;
  }
}
