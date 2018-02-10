"use strict";

class Hiversaires {
  constructor() {
    this.element = document.createElement("hiversaires");
    document.body.appendChild(this.element);
    window.hiversaires = this;
    window.hh = this;
    this.keyboard = new Keyboard(this.responder.bind(this));
    this.artBook = new ArtBook();
    this.game = new Game();
    this.music = new Music();
    this.stage = new Stage(this.element, this.responder.bind(this));
    this.interface = new Interface();
    this.walkthrough = new Walkthrough();
  }

  responder(input) {
    if (this.game.userChapter == Chapter.credit) {
      return;
    }

    switch (input) {
      case Input.left:
        this.moveLeft();
        break;
      case Input.right:
        this.moveRight();
        break;
      case Input.forward:
        this.moveForward();
        break;
      case Input.back:
        this.moveBackward();
        break;
      case Input.action:
        this.action();
        break;
      case Input.center:
        if (this.currentPuzzle != null && this.currentPuzzle.active) {
          this.action();
        } else {
          this.moveForward();
        }
        break;
    }
  }

  start() {
    this.stage.start();
    this.game.start();
    this.walkthrough.start();

    if (DEBUG_START_FRESH) {
      this.game.wipePlayerProgress();
    }
    this.game.load();
    this.updateMusic();
    this.moveCheck();
    this.interface.menuHome();
  }

  get currentNode() {
    return nodesByID.get(this.game.userNodeID);
  }

  get currentSubject() {
    return this.currentNode.subjects[this.game.userOrientation];
  }

  get currentPuzzle() {
    let subject = this.currentSubject;
    if (subject != null && subject.type == SubjectType.puzzle) {
      return puzzlesByID.get(subject.puzzleID);
    }
    return null;
  }

  get currentSeals() {
    return this.game.puzzleState.seals;
  }

  get currentFuses() {
    return this.game.puzzleState.fuses;
  }

  updateMusic() {
    this.music.setRecord(recordsByChapter.get(this.game.userChapter));
  }

  moveCheck() {
    this.stage.billboard("menuBlack").hidden = true;
    this.stage.billboard("menuCredit1").hidden = true;
    this.stage.billboard("menuCredit2").hidden = true;
    this.stage.billboard("menuCredit3").hidden = true;
    this.stage.billboard("menuCredit4").hidden = true;
    this.stage.billboard("menuLogo").hidden = true;
    this.stage.billboard("menuControls").hidden = true;

    this.stage.billboard("overlay").alpha = 0;
    this.stage.billboard("clockFace").alpha = 0;
    this.stage.billboard("clockShadow").alpha = 0;
    this.stage.billboard("progressPane").alpha = 0;
    this.stage.billboard("ententeScreen").alpha = 0;
    this.stage.billboard("illusion").alpha = 0;

    this.stage.trigger("action").hidden = true;

    this.stage.trigger("moveForward").hidden =
      this.currentSubject.type == SubjectType.none;

    this.stage.billboard("viewMain").image =
      "node/" + this.game.userNodeID + "." + this.game.userOrientation + ".jpg";

    if (Math.random() < 0.3 && this.currentSubject.illusionID != null) {
      puzzlesByID.get(this.currentSubject.illusionID).appear();
    }

    if (this.currentPuzzle != null) {
      this.currentPuzzle.setup();
      this.stage.trigger("action").hidden = !this.currentPuzzle.active;
    }

    this.music.setAmbience(ambienceByZone.get(this.currentNode.zone));

    // console.log(
    //   this.game.userNodeID,
    //   this.game.userOrientation,
    //   this.currentSubject
    // );
  }

  moveLeft() {
    this.music.playEffect("footstep_turn");
    this.game.userOrientation = (this.game.userOrientation + 4 - 1) % 4;
    this.stage.animateTurnLeft();
    this.moveCheck();
  }

  moveRight() {
    this.music.playEffect("footstep_turn");
    this.game.userOrientation = (this.game.userOrientation + 4 + 1) % 4;
    this.stage.animateTurnRight();
    this.moveCheck();
  }

  moveForward() {
    this.playFootStep();

    if (this.currentSubject.type == SubjectType.node) {
      let { nodeID, orientation } = this.currentSubject;
      this.game.userNodeID = nodeID;
      if (orientation != null) {
        this.game.userOrientation = orientation;
      }
    }

    this.stage.animateStepForward();
    this.moveCheck();
  }

  moveBackward() {
    this.music.playEffect("footstep_turn");

    this.game.userOrientation = (this.game.userOrientation + 4 + 2) % 4;

    if (this.currentSubject.type == SubjectType.node) {
      let { nodeID, orientation } = this.currentSubject;
      this.game.userNodeID = nodeID;
      if (orientation != null) {
        this.game.userOrientation = orientation;
      }
    } else if (
      this.currentPuzzle != null &&
      this.currentPuzzle instanceof Door
    ) {
      // As long as it's active, perform the door's action until you walked through it
      let lastSubject = this.currentSubject;
      while (this.currentSubject == lastSubject && this.currentPuzzle.active) {
        this.currentPuzzle.performAction();
      }
    }

    this.game.userOrientation = (this.game.userOrientation + 4 + 2) % 4;

    this.stage.animateStepBackward();
    this.moveCheck();
  }

  warpTo(node, orientation) {
    this.game.userNodeID = node;
    this.game.userOrientation = orientation % 4;
    this.moveCheck();
  }

  action() {
    if (this.currentPuzzle != null && this.currentPuzzle.active) {
      this.currentPuzzle.performAction();
    }
  }

  setModifier(modifier) {
    this.stage.billboard("overlay").image =
      "node/" +
      this.game.userNodeID +
      "." +
      this.game.userOrientation +
      "." +
      modifier +
      ".jpg";
  }

  showModifier(fadeDuration = 0, fadeDelay = 0) {
    this.stage.billboard("overlay").hidden = false;
    this.stage.fadeIn(this.stage.billboard("overlay"), fadeDuration, fadeDelay);
  }

  hideModifier(fadeDuration = 0, fadeDelay = 0) {
    this.stage.billboard("overlay").hidden = false;
    this.stage.fadeOut(
      this.stage.billboard("overlay"),
      fadeDuration,
      fadeDelay
    );
  }

  playFootStep() {
    this.game.userFootstep += 1;
    let effect = "footstep_collide";
    if (this.currentSubject.type == SubjectType.node) {
      effect =
        this.game.userFootstep % 2 == 1 ? "footstep_left" : "footstep_right";
    }
    this.music.playEffect(effect);
  }
}
