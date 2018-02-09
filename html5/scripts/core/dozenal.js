"use strict";

class Dozenal {
  constructor() {
    this.puzzleState;
    this.userNodeID = 1;
    this.userOrientation = 0;
    this.userChapter = Chapter.act1;
    this.userEnergy = 0;
    this.userFootstep = 0;
    this.currentAction = null;
  }

  install() {}

  start() {
    this.newGame();
  }

  newGame() {
    this.setAlpha("interfaceIndicatorRight", 0);
    this.setAlpha("interfaceIndicatorForward", 0);
    this.setAlpha("interfaceIndicatorLeft", 0);
    this.setAlpha("interfaceDimclockAlert", 0);
    this.setAlpha("interfaceSealAlert", 0);
    this.setAlpha("interfaceFuseAlert", 0);

    this.setImage("interfaceIndicatorRight", "interface/footstep.svg");
    this.setImage("interfaceIndicatorForward", "interface/footstep.svg");
    this.setImage("interfaceIndicatorLeft", "interface/footstep.svg");
    this.setImage("interfaceDimclockAlert", "interface/alert.svg");
    this.setImage("clockShadow", "interface/dimclock.shadow.svg");
    this.setImage("interfaceSealAlert", "interface/alert.svg");
    this.setImage("interfaceFuseAlert", "interface/alert.svg");
    this.setImage("menuBlack", "menu/menu.black.svg");
    this.setImage("menuCredit1", "menu/menu.credit1.svg");
    this.setImage("menuCredit2", "menu/menu.credit2.svg");
    this.setImage("menuCredit3", "menu/menu.credit3.svg");
    this.setImage("menuCredit4", "menu/menu.credit4.svg");
    this.setImage("vignette", "interface/vignette.svg");
    this.setImage("interfaceSave", "interface/save.svg");
    this.setImage("menuBlack", "menu/menu.black.svg");
    this.setImage("menuLogo", "menu/menu.logo.svg");
    this.setImage("menuControls", "menu/menu.controls.svg");

    if (DEBUG_START_FRESH) {
      this.wipePlayerProgress();
    }
    this.prefLoad();

    this.actionCheck();
    this.moveCheck();
    this.menuHome();
  }

  get currentNode() {
    return nodesByID.get(this.userNodeID);
  }

  get currentSubject() {
    return this.currentNode.subjects[this.userOrientation];
  }

  get currentPuzzle() {
    let subject = this.currentSubject;
    if (subject != null && subject.type == SubjectType.puzzle) {
      return puzzlesByID.get(subject.puzzleID);
    }
    return null;
  }

  get currentSeals() {
    let sealsFound = [];
    for (let puzzle of puzzlesByID.values()) {
      if (puzzle instanceof SealTerminal && this.puzzleState[puzzle.id] > 0) {
        sealsFound.push(puzzle.info.seal);
      }
    }
    return sealsFound;
  }

  billboard(id) {
    return hiversaires.stage.billboardsByID.get(id);
  }

  trigger(id) {
    return hiversaires.stage.triggersByID.get(id);
  }

  setImage(billboardID, url) {
    let subject = this.billboard(billboardID);
    if (url) {
      hiversaires.artBook.setArt(subject, "media/graphics/" + url);
    } else {
      hiversaires.artBook.removeArt(subject);
    }
  }

  setAlpha(billboardID, value) {
    let subject = this.billboard(billboardID);
    $(subject)
      .finish()
      .css({ opacity: value });
  }

  setHidden(subject, value) {
    $(subject).css({
      display: value ? "none" : "block",
      "pointer-events": value ? "none" : "inherit"
    });
  }

  setCurrentAction(value) {
    this.currentAction = value;
    this.setHidden(this.trigger("action"), value == null);
  }

  updateMusic() {
    hiversaires.music.setRecord(recordsByChapter.get(this.userChapter));
  }

  // ====================
  // Movement
  // ====================

  moveCheck() {
    this.actionReset();

    this.setHidden(
      this.trigger("moveForward"),
      this.currentSubject.type == SubjectType.none
    );

    this.setImage(
      "viewMain",
      "node/" + this.userNodeID + "." + this.userOrientation + ".jpg"
    );

    this.illusionCheck();

    if (this.currentSubject.type == SubjectType.puzzle) {
      this.actionCheck();
    }

    hiversaires.music.setAmbience(ambienceByZone.get(this.currentNode.zone));

    console.log(this.userNodeID, this.userOrientation, this.currentSubject);
  }

  moveLeft() {
    if (this.userChapter == Chapter.credit) {
      return;
    }
    hiversaires.music.playEffect("footstep_turn");
    this.userOrientation = (this.userOrientation + 4 - 1) % 4;
    this.animateTurnLeft();
    this.moveCheck();
  }

  moveRight() {
    if (this.userChapter == Chapter.credit) {
      return;
    }
    hiversaires.music.playEffect("footstep_turn");
    this.userOrientation = (this.userOrientation + 4 + 1) % 4;
    this.animateTurnRight();
    this.moveCheck();
  }

  moveForward() {
    if (this.userChapter == Chapter.credit) {
      return;
    }
    this.playFootStep();

    if (this.currentSubject.type == SubjectType.node) {
      let { nodeID, orientation } = this.currentSubject;
      this.userNodeID = nodeID;
      if (orientation != null) {
        this.userOrientation = orientation;
      }
    }

    this.animateStepForward();
    this.moveCheck();
  }

  warpTo(node, orientation) {
    this.userNodeID = node;
    this.userOrientation = orientation % 4;
    this.moveCheck();
  }

  moveBackward() {
    if (this.userChapter == Chapter.credit) {
      return;
    }
    hiversaires.music.playEffect("footstep_turn");

    this.userOrientation = (this.userOrientation + 4 + 2) % 4;

    if (this.currentSubject.type == SubjectType.node) {
      let { nodeID, orientation } = this.currentSubject;
      this.userNodeID = nodeID;
      if (orientation != null) {
        this.userOrientation = orientation;
      }
    }

    this.userOrientation = (this.userOrientation + 4 + 2) % 4;

    this.animateStepBackward();
    this.moveCheck();
  }

  // ====================
  // Interactions
  // ====================

  actionCheck() {
    this.setHidden(this.trigger("moveForward"), this.currentPuzzle == null);

    this.setCurrentAction(null);

    if (this.currentPuzzle != null) {
      this.actionReset();
      this.currentPuzzle.setup(this);
    }
  }

  action() {
    if (this.userChapter == Chapter.credit) {
      return;
    }
    if (this.currentAction != null) {
      this.currentAction(this);
    }
  }

  actionReset() {
    this.setHidden(this.billboard("menuBlack"), true);
    this.setHidden(this.billboard("menuCredit1"), true);
    this.setHidden(this.billboard("menuCredit2"), true);
    this.setHidden(this.billboard("menuCredit3"), true);
    this.setHidden(this.billboard("menuCredit4"), true);
    this.setHidden(this.billboard("menuLogo"), true);
    this.setHidden(this.billboard("menuControls"), true);

    this.setAlpha("overlay", 0);
    this.setAlpha("clockFace", 0);
    this.setAlpha("clockShadow", 0);
    this.setAlpha("progressPane", 0);
    this.setAlpha("ententeScreen", 0);
    this.setAlpha("illusion", 0);

    this.setCurrentAction(null);
  }

  templateClockInterface() {
    this.setImage(
      "interfaceDimclock",
      "interface/clock." + this.puzzleState[1] + ".svg"
    );
    this.setAlpha("interfaceDimclock", 1);
    this.fadeOut(this.billboard("interfaceDimclock"), 0.5, 3);
  }

  templateClockAlert() {
    this.setAlpha("interfaceDimclockAlert", 1.0);
    this.fadeOut(this.billboard("interfaceDimclockAlert"), 0.5, 0.5);
  }

  templateSealInterface() {
    let seals = this.currentSeals;

    console.log(seals);

    this.setImage(
      "interfaceSeal1",
      "interface/seal." + (seals[0] == null ? "none" : seals[0]) + ".svg"
    );
    this.setImage(
      "interfaceSeal2",
      "interface/seal." + (seals[1] == null ? "none" : seals[1]) + ".svg"
    );

    this.setHidden(this.billboard("interfaceSeal1"), false);
    this.setHidden(this.billboard("interfaceSeal2"), false);

    this.setAlpha("interfaceSeal1", 1);
    this.setAlpha("interfaceSeal2", 1);

    this.fadeOut(this.billboard("interfaceSeal1"), 0.5, 3);
    this.fadeOut(this.billboard("interfaceSeal2"), 0.5, 3);
  }

  templateSealAlert() {
    this.setAlpha("interfaceSealAlert", 1.0);
    this.fadeOut(this.billboard("interfaceSealAlert"), 0.5, 0.5);
  }

  templateEnergyInterface() {
    this.setImage(
      "interfaceFuse1",
      "interface/fuse." + this.userEnergy + ".svg"
    );

    this.setHidden(this.billboard("interfaceFuse1"), false);
    this.setAlpha("interfaceFuse1", 1);

    this.fadeOut(this.billboard("interfaceFuse1"), 0.5, 3);
  }

  checkConditions(conditions) {
    for (let condition of conditions) {
      let state = this.puzzleState[condition.puzzleID];
      let passes = true;
      switch (condition.type) {
        case ConditionType.equals:
          passes = state == condition.value;
          break;
        case ConditionType.doesNotEqual:
          passes = state != condition.value;
          break;
        case ConditionType.isLessThan:
          passes = state < condition.value;
          break;
        case ConditionType.isLessThanOrEqualTo:
          passes = state <= condition.value;
          break;
        case ConditionType.isGreaterThan:
          passes = state > condition.value;
          break;
        case ConditionType.isGreaterThanOrEqualTo:
          passes = state >= condition.value;
          break;
      }
      if (!passes) {
        return false;
      }
    }
    return true;
  }

  templateEnergyAlert() {
    this.setAlpha("interfaceFuseAlert", 1.0);
    this.fadeOut(this.billboard("interfaceFuseAlert"), 1.5, 0.5);
  }

  templateAudioInterface() {
    this.setImage(
      "interfaceAudio",
      "interface/music." + (this.puzzleState[35] == 1 ? "on" : "off") + ".svg"
    );

    this.setAlpha("interfaceAudio", 1);
    this.fadeOut(this.billboard("interfaceAudio"), 0.5, 3);
  }

  // ====================
  // Actions with interactions
  // ====================

  setModifier(modifier) {
    this.setImage(
      "overlay",
      "node/" +
        this.userNodeID +
        "." +
        this.userOrientation +
        "." +
        modifier +
        ".jpg"
    );
  }

  showModifier(fadeDuration = 0, fadeDelay = 0) {
    this.setHidden(this.billboard("overlay"), false);
    this.fadeIn(this.billboard("overlay"), fadeDuration, fadeDelay);
  }

  hideModifier(fadeDuration = 0, fadeDelay = 0) {
    this.setHidden(this.billboard("overlay"), false);
    this.fadeOut(this.billboard("overlay"), fadeDuration, fadeDelay);
  }

  updateNode(node, img, puzzleID) {
    if (this.userNodeID == node && this.currentPuzzle.id == puzzleID) {
      this.setImage("overlay", "node_old/node." + img + ".jpg");
    }
  }

  templateVignette() {
    this.setAlpha("vignette", 1.0);
    this.fadeOut(this.billboard("vignette"), 1.0, 0);
  }

  templateSaveInterface() {
    this.setHidden(this.billboard("interfaceSave"), false);
    this.setAlpha("interfaceSave", 1);
    this.fadeOut(this.billboard("interfaceSave"), 0.5, 3);
  }

  illusionCheck() {
    if (Math.random() < 0.3) {
      return;
    }

    for (let puzzle of puzzlesByID.values()) {
      if (
        puzzle instanceof Illusion &&
        puzzle.info.nodeID == this.userNodeID &&
        puzzle.info.orientation == this.userOrientation
      ) {
        puzzle.appear(this);
        break;
      }
    }
  }

  illusionInterface() {
    let illusionCount = 0;

    for (let puzzle of puzzlesByID.values()) {
      if (puzzle instanceof Illusion) {
        illusionCount += this.puzzleState[puzzle.id];
      }
    }

    this.setImage(
      "interfaceIllusion",
      "interface/illusion." + illusionCount + ".svg"
    );
    this.setAlpha("interfaceIllusion", 1);
    this.fadeOut(this.billboard("interfaceIllusion"), 0.5, 3);
  }

  // ====================
  // Tools
  // ====================

  fadeIn(viewToFadeIn, duration, delay, skipLast = true) {
    if (skipLast) {
      $(viewToFadeIn).finish();
    }
    $(viewToFadeIn)
      .delay(delay * 1000)
      .animate({ opacity: 1 }, duration * 1000);
  }

  fadeOut(viewToFadeOut, duration, delay, skipLast = true) {
    if (skipLast) {
      $(viewToFadeOut).finish();
    }
    $(viewToFadeOut)
      .delay(delay * 1000)
      .animate({ opacity: 0 }, duration * 1000);
  }

  animateTurnLeft() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.setAlpha("interfaceIndicatorLeft", 1);

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorLeft"), 0.5, 0);
  }

  animateTurnRight() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.setAlpha("interfaceIndicatorRight", 1);

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorRight"), 0.5, 0);
  }

  animateStepForward() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.setAlpha("interfaceIndicatorForward", 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0.5, 0);
  }

  animateStepBackward() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.setAlpha("interfaceIndicatorForward", 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0.5, 0);
  }

  // ====================
  // Audio
  // ====================

  playFootStep() {
    this.userFootstep += 1;
    let effect = "footstep_collide";
    if (this.currentSubject.type == SubjectType.node) {
      effect = this.userFootstep % 2 == 1 ? "footstep_left" : "footstep_right";
    }
    hiversaires.music.playEffect(effect);
  }

  // ====================
  // Preferences
  // ====================

  menuHome() {
    this.setAlpha("menuBlack", 1.0);
    this.setHidden(this.billboard("menuBlack"), false);

    this.setAlpha("menuLogo", 1.0);
    this.setHidden(this.billboard("menuLogo"), false);

    this.setAlpha("menuControls", 1.0);
    this.setHidden(this.billboard("menuControls"), false);

    this.setHidden(this.billboard("interfaceSeal1"), true);
    this.setHidden(this.billboard("interfaceSeal2"), true);
    this.setHidden(this.billboard("interfaceFuse1"), true);
    this.setHidden(this.billboard("interfaceSave"), true);

    this.fadeOut(this.billboard("menuBlack"), 2.0, 0);
    this.fadeOut(this.billboard("menuLogo"), 2.0, 3);
    this.fadeOut(this.billboard("menuControls"), 1.0, 8);

    hiversaires.music.volume = 1; // Music
  }

  prefSave() {
    let saveObject = {
      userSettings: {
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

    this.templateSaveInterface();
  }

  prefLoad() {
    // Load Game

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

      this.updateMusic();

      // Storage
      this.puzzleState = saveObject.puzzleState;

      console.log("loaded state.");
    } else {
      // New Game

      this.puzzleState = [];
      for (let puzzle of puzzlesByID.values()) {
        this.puzzleState[puzzle.id] = puzzle.defaultState;
      }

      console.log(this.puzzleState);

      // Default Location

      this.userNodeID = 1;
      this.userOrientation = 0;
      this.userChapter = Chapter.act1;
      this.userEnergy = 0;

      this.updateMusic();

      console.log("created state.");
    }
  }

  wipePlayerProgress() {
    localStorage.clear();
    console.log("wiped state.");
  }
}
