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
      userSettings: {
        userNodeID: this.userNodeID,
        userOrientation: this.userOrientation,
        userChapter: this.userChapter,
        userEnergy: this.userEnergy
      },
      puzzleState: this.puzzleState
    };

    this.derivePuzzleState2();

    let saveObject2 = {
      userState: {
        userNodeID: this.userNodeID,
        userOrientation: this.userOrientation,
        userChapter: this.userChapter,
        userEnergy: this.userEnergy
      },
      puzzleState: this.newState
    };

    if (!DEBUG_DONT_SAVE) {
      localStorage.save = JSON.stringify(saveObject);
      localStorage.save2 = JSON.stringify(saveObject2);
    }

    console.log("saved state.");

    hiversaires.templateSaveInterface();
  }

  load() {
    let saveObject = null;
    try {
      saveObject = JSON.parse(localStorage.save);
    } catch (error) {}

    if (saveObject != null) {
      // Settings
      let userSettings = saveObject.userSettings;
      this.userNodeID = userSettings.userNodeID;
      this.userOrientation = userSettings.userOrientation;
      this.userChapter = userSettings.userChapter;
      this.userEnergy = userSettings.userEnergy;

      // Storage
      this.puzzleState = saveObject.puzzleState;

      this.derivePuzzleState2();

      console.log("loaded state.");

      console.log(this.newState);
    } else {
      // New Game

      this.puzzleState = [];
      for (let puzzle of puzzlesByID.values()) {
        this.puzzleState[puzzle.id] = puzzle.defaultState;
      }

      this.newState = {
        seals: [],
        fuses: [31, 38, 39],
        illusions: [],
        clock: 0,
        audio: true,
        studio: false,
        maze: { x: 15, y: 0 }
      };

      this.userNodeID = 1;
      this.userOrientation = 0;
      this.userChapter = Chapter.act1;
      this.userEnergy = 0;

      console.log("created state.");
    }
  }

  derivePuzzleState2() {
    this.newState = {
      seals: [],
      fuses: [],
      illusions: [],
      clock: null,
      audio: null,
      studio: null,
      maze: {}
    };

    for (let puzzle of puzzlesByID.values()) {
      let state = this.puzzleState[puzzle.id];

      if (puzzle instanceof SealTerminal) {
        if (state == 1) {
          this.newState.seals.push(puzzle.seal); // seal
        }
      } else if (puzzle instanceof ClockTerminal) {
        this.newState.clock = state;
      } else if (puzzle instanceof EnergyTerminal) {
        if (state == 1) {
          this.newState.fuses.push(puzzle.id);
        }
      } else if (puzzle instanceof StudioTerminal) {
        this.newState.studio = state == 1;
      } else if (puzzle instanceof AudioTerminal) {
        this.newState.audio = state == 1;
      } else if (puzzle instanceof EntenteTerminal) {
        this.newState.maze[puzzle.axis] = state; // axis
      }
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
