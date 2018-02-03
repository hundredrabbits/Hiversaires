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
    if (this.puzzleState[4] > 0) {
      sealsFound.push(Zone.forest);
    }
    if (this.puzzleState[12] > 0) {
      sealsFound.push(Zone.stones);
    }
    if (this.puzzleState[13] > 0) {
      sealsFound.push(Zone.rainre);
    }
    if (this.puzzleState[20] > 0) {
      sealsFound.push(Zone.metamondst);
    }
    if (this.puzzleState[21] > 0) {
      sealsFound.push(Zone.antechannel);
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
  }

  moveLeft() {
    hiversaires.music.playEffect("footstep_turn");
    this.userOrientation = (this.userOrientation + 4 - 1) % 4;
    this.animateTurnLeft();
    this.moveCheck();
  }

  moveRight() {
    hiversaires.music.playEffect("footstep_turn");
    this.userOrientation = (this.userOrientation + 4 + 1) % 4;
    this.animateTurnRight();
    this.moveCheck();
  }

  moveForward() {
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
    this.setHidden(this.trigger("moveLeft"), false);
    this.setHidden(this.trigger("moveRight"), false);
    this.setHidden(this.trigger("moveForward"), this.currentPuzzle == null);

    this.setCurrentAction(null);

    this.isFuseAction = false;

    if (this.currentPuzzle) {
      this.actionTemplate();
    }
  }

  action() {
    if (this.currentAction != null) {
      this.currentAction();
    }
  }

  openDoor() {
    this.setHidden(this.billboard("overlay"), false);
    this.setCurrentAction(this.walkThroughDoor);
    this.templateEnergyUpdate();
  }

  walkThroughDoor() {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (this.userNodeID == 1) {
      this.userNodeID = 103;
    } else if (this.userNodeID == 11) {
      this.userNodeID = 48;
      this.userOrientation = 2;
    } else if (this.userNodeID == 13) {
      this.userNodeID = 12;
    } else if (this.userNodeID == 12) {
      this.userNodeID = 13;
    } else if (this.userNodeID == 16) {
      this.userNodeID = 22;
    } else if (this.userNodeID == 20 && this.puzzleState[37] > 0) {
      this.userNodeID = 116;
      this.userOrientation = 1;
    } else if (this.userNodeID == 23) {
      // Fold Gate
      this.userNodeID = 22;
    } else if (this.userNodeID == 25) {
      this.userNodeID = 31;
      this.userOrientation = 2;
    } else if (this.userNodeID == 27) {
      this.userNodeID = 32;
      this.userOrientation = 1;
    } else if (this.userNodeID == 35) {
      this.userNodeID = 31;
      this.userOrientation = 0;
    } else if (
      this.userNodeID == 39 &&
      this.puzzleState[5] == 2 &&
      this.puzzleState[31] == 1
    ) {
      this.userNodeID = 34;
    } else if (this.userNodeID == 39) {
      this.userNodeID = 45;
    } else if (this.userNodeID == 45) {
      this.userNodeID = 51;
    } else if (this.userNodeID == 46) {
      this.userNodeID = 85;
      this.userOrientation = 2;
    } else if (this.userNodeID == 48) {
      this.userNodeID = 11;
      this.userOrientation = 2;
    } else if (this.userNodeID == 51) {
      this.userNodeID = 45;
    } else if (this.userNodeID == 52) {
      this.userNodeID = 32;
      this.userOrientation = 3;
    } else if (this.userNodeID == 61) {
      this.userNodeID = 72;
    } else if (this.userNodeID == 62) {
      this.userNodeID = 77;
    } else if (this.userNodeID == 69) {
      this.userNodeID = 72;
    } else if (this.userNodeID == 76) {
      this.userNodeID = 87;
    } else if (this.userNodeID == 77) {
      this.userNodeID = 62;
    } else if (this.userNodeID == 79) {
      this.userNodeID = 112;
    } else if (this.userNodeID == 85) {
      this.userNodeID = 46;
      this.userOrientation = 0;
    } else if (this.userNodeID == 87) {
      this.userNodeID = 76;
    } else if (this.userNodeID == 112) {
      this.userNodeID = 79;
    } else if (this.userNodeID == 113) {
      this.userNodeID = 50;
    } else if (this.userNodeID == 142) {
      this.userNodeID = 143;
      this.userOrientation = 3;
    } else if (this.userNodeID == 143) {
      this.userNodeID = 142;
      this.userOrientation = 1;
    }

    // Easter Eggs

    this.actionCheck();
    this.moveCheck();
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
    this.setAlpha("ententeScreen", 0);
    this.setAlpha("illusion", 0);

    this.setCurrentAction(null);
  }

  actionTemplate() {
    this.actionReset();

    if (this.currentPuzzle.type == PuzzleType.clockTerminal) {
      this.templateClockTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.sealTerminal) {
      this.templateSealTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.energyTerminal) {
      this.templateEnergyTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.sealDoor) {
      this.templateSealDoor();
    }
    if (this.currentPuzzle.type == PuzzleType.energyDoor) {
      this.templateEnergyDoor();
    }
    if (this.currentPuzzle.type == PuzzleType.clockDoor) {
      this.templateClockDoor();
    }
    if (this.currentPuzzle.type == PuzzleType.progressTerminal) {
      this.templateProgressTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.audioTerminal) {
      this.templateAudioTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.killTerminal) {
      this.templateKillTerminal();
    }
    if (this.currentPuzzle.type == PuzzleType.endgameDoor) {
      this.templateEndgameDoor();
    }
    if (this.currentPuzzle.type == PuzzleType.endgameCredit) {
      this.templateEndgameCredit();
    }
    if (this.currentPuzzle.type == PuzzleType.timeDoor) {
      this.templateTimeDoor();
    }

    if (this.currentPuzzle.id == 23) {
      this.templateEntenteTerminal1();
    }
    if (this.currentPuzzle.id == 24) {
      this.templateEntenteTerminal2();
    }
    if (this.currentPuzzle.id == 43) {
      this.templateEntentePart1Incr();
    }
    if (this.currentPuzzle.id == 42) {
      this.templateEntentePart1Decr();
    }
    if (this.currentPuzzle.id == 45) {
      this.templateEntentePart2Incr();
    }
    if (this.currentPuzzle.id == 44) {
      this.templateEntentePart2Decr();
    }
    if (this.currentPuzzle.id == 46) {
      this.templateEntentePart2Exit();
    }
  }

  templateTimeDoor() {
    this.templateVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if ((currentHours == 15 && currentMinutes == 7) || this.userNodeID == 143) {
      this.puzzleState[54] = 1;
      this.templateUpdateDoorknob(142, 143);
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }

  templateClockTerminal() {
    this.templateVignette();

    this.setCurrentAction(function() {
      this.puzzleState[this.currentPuzzle.id] =
        (this.puzzleState[this.currentPuzzle.id] + 1) % 3;
      hiversaires.music.playEffect("action_EnergyActive");
      this.templateClockUpdate();
    });

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate();
  }

  templateClockInterface() {
    this.setImage(
      "interfaceDimclock",
      "interface/clock." + this.puzzleState[1] + ".svg"
    );
    this.setHidden(this.billboard("interfaceDimclock"), false);
    this.setAlpha("interfaceDimclock", 1);
    this.fadeOut(this.billboard("interfaceDimclock"), 3, 0.5);
  }

  templateClockDoor() {
    this.templateVignette();

    // Display Interactions

    this.setHidden(this.billboard("overlay"), true);

    this.templateClockInterface();

    // Audio

    hiversaires.music.playEffect("action_DoorInit");

    // Templates

    let doorUnlocked = false;

    switch (this.currentPuzzle.id) {
      case 7:
        doorUnlocked = this.puzzleState[1] == 1 || this.puzzleState[1] == 2;
        break;
      case 8:
        doorUnlocked = this.puzzleState[1] == 1 || this.puzzleState[1] == 0;
        break;
      case 9:
        doorUnlocked = this.puzzleState[1] == 2 || this.puzzleState[1] == 0;
        break;
    }

    if (doorUnlocked) {
      this.setCurrentAction(this.openDoor);

      this.templateUpdateNode(16, "0472", 7);
      this.templateUpdateNode(23, "0473", 7);
      this.templateUpdateNode(25, "0474", 8);
      this.templateUpdateNode(35, "0475", 8);
      this.templateUpdateNode(27, "0476", 9);
      this.templateUpdateNode(52, "0477", 9);
    } else {
      this.templateClockAlert();
    }
  }

  templateClockUpdate() {
    this.templateClockInterface();

    this.setImage(
      "clockFace",
      "interface/dimclock.state" + this.puzzleState[1] + ".svg"
    );

    this.fadeIn(this.billboard("clockShadow"), 0.5, 1.5);
    this.fadeIn(this.billboard("clockFace"), 0.5, 0.5);
  }

  templateClockAlert() {
    this.setAlpha("interfaceDimclockAlert", 1.0);
    this.fadeOut(this.billboard("interfaceDimclockAlert"), 0.5, 0.5);
  }

  templateSealTerminal() {
    this.templateVignette();

    this.setHidden(this.billboard("overlay"), false);
    this.setAlpha("overlay", 0);

    this.setCurrentAction(function() {
      if (
        this.puzzleState[this.currentPuzzle.id] == 1 ||
        this.currentSeals.length < 2
      ) {
        if (this.puzzleState[this.currentPuzzle.id] != 1) {
          hiversaires.music.playEffect("action_SealActive");
          this.puzzleState[this.currentPuzzle.id] = 1;
        } else {
          hiversaires.music.playEffect("action_SealInactive");
          this.puzzleState[this.currentPuzzle.id] = 0;
        }
      } else {
        hiversaires.music.playEffect("action_EnergyStack");
        this.templateSealAlert();
        console.log("No more seal slots.");
      }

      this.templateSealUpdate();
    });

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate();
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

    this.fadeOut(this.billboard("interfaceSeal1"), 3, 0.5);
    this.fadeOut(this.billboard("interfaceSeal2"), 3, 0.5);
  }

  templateSealDoor() {
    this.templateVignette();

    this.setHidden(this.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    this.templateSealInterface();

    if (this.puzzleState[4] == 1 && this.puzzleState[13] == 1) {
      // Act 1 : Forest + Rainre in Stones
      if (this.userNodeID == 46 || this.userNodeID == 85) {
        this.templateUpdateDoorknob(46, 85);
        this.templateUpdateNode(46, "0486", 15);
        this.templateUpdateNode(85, "0485", 15);
        this.userChapter = Chapter.act2;
        this.prefSave();
      }
    } else if (this.puzzleState[20] == 1 && this.puzzleState[13] == 1) {
      // Act 2 : Metamondst + Rainre in Forest
      if (this.userNodeID == 11 || this.userNodeID == 48) {
        this.templateUpdateDoorknob(48, 11);
        this.templateUpdateNode(11, "0487", 25);
        this.templateUpdateNode(48, "0488", 25);
        this.userChapter = Chapter.act3;
        this.prefSave();
      }
    } else if (this.puzzleState[21] == 1 && this.puzzleState[13] == 1) {
      // Act 3 : Forest + Rainre in Metamondst
      if (this.userNodeID == 46 || this.userNodeID == 85) {
        this.templateUpdateDoorknob(46, 85);
        this.templateUpdateNode(46, "0486", 15);
        this.templateUpdateNode(85, "0485", 15);
        this.userChapter = Chapter.act4;
        this.prefSave();
      }
    } else if (this.puzzleState[21] == 1 && this.puzzleState[12] == 1) {
      // Act 4 : Antechannel + Stones in Studio
      if (this.userNodeID == 19) {
        this.setCurrentAction(function() {
          this.puzzleState[this.currentPuzzle.id]++;
          this.puzzleState[this.currentPuzzle.id] =
            this.puzzleState[this.currentPuzzle.id] > 1 ? 0 : 2;
          hiversaires.music.playEffect("action_EnergyActive");
          this.templateUpdateStudioTerminal();
        });
        this.templateUpdateStudioTerminal();
        this.prefSave();
      }
    } else if (this.currentPuzzle.id == 5 && this.userNodeID == 19) {
      // Studio Terminal
      this.templateUpdateStudioTerminal();
    } else {
      this.templateSealAlert();
    }
  }

  templateSealUpdate() {
    this.templateSealInterface();

    this.fadeOut(this.billboard("overlay"), 0, 0.5);

    if (this.puzzleState[this.currentPuzzle.id] != 1) {
      return;
    }

    if (this.currentSeals.length == 1) {
      this.templateUpdateNode(5, "0493", 4);
      this.templateUpdateNode(38, "0496", 12);
      this.templateUpdateNode(45, "0502", 13);
      this.templateUpdateNode(49, "0505", 21);
      this.templateUpdateNode(82, "0499", 20);
    } else {
      this.templateUpdateNode(5, "0494", 4);
      this.templateUpdateNode(38, "0497", 12);
      this.templateUpdateNode(45, "0503", 13);
      this.templateUpdateNode(49, "0506", 21);
      this.templateUpdateNode(82, "0500", 20);
    }
  }

  templateSealAlert() {
    this.setAlpha("interfaceSealAlert", 1.0);
    this.fadeOut(this.billboard("interfaceSealAlert"), 0.5, 0.5);
  }

  templateEnergyTerminal() {
    this.templateVignette();
    this.templateEnergyInterface();

    this.setHidden(this.billboard("overlay"), false);

    this.setCurrentAction(this.openDoor);

    this.isFuseAction = true;

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyInterface() {
    this.setImage(
      "interfaceFuse1",
      "interface/fuse." + this.userEnergy + ".svg"
    );

    this.setHidden(this.billboard("interfaceFuse1"), false);
    this.setAlpha("interfaceFuse1", 1);

    this.fadeOut(this.billboard("interfaceFuse1"), 3, 0.5);
  }

  templateEnergyDoor() {
    this.templateVignette();

    // Display Interactions

    this.setHidden(this.billboard("overlay"), true);

    // Audio

    hiversaires.music.playEffect("action_DoorInit");
    this.templateEnergyInterface();

    // Templates

    let puzzleTerminal = null;

    if (this.currentPuzzle.id == 3) {
      puzzleTerminal = 2;
    }
    if (this.currentPuzzle.id == 6) {
      puzzleTerminal = 37;
    }

    if (this.currentPuzzle.id == 11) {
      puzzleTerminal = 10;
    }
    if (this.currentPuzzle.id == 19) {
      puzzleTerminal = 18;
    }
    if (this.currentPuzzle.id == 26) {
      puzzleTerminal = 27;
    }

    if (this.currentPuzzle.id == 28) {
      puzzleTerminal = 5;
    }
    if (this.currentPuzzle.id == 30) {
      puzzleTerminal = 5;
    }
    if (this.currentPuzzle.id == 33) {
      puzzleTerminal = 47;
    } // Antechannel fuse for Capsule door

    if (puzzleTerminal != null && this.puzzleState[puzzleTerminal] > 0) {
      this.setCurrentAction(this.openDoor);

      this.templateUpdateNode(1, "0531", 28);
      this.templateUpdateNode(12, "0470", 3);
      this.templateUpdateNode(13, "0471", 3);
      this.templateUpdateNode(20, "0080", 6);
      this.templateUpdateNode(69, "0478", 19);
      this.templateUpdateNode(61, "0479", 19);
      this.templateUpdateNode(62, "0480", 26);
      this.templateUpdateNode(77, "0481", 26);
      this.templateUpdateNode(76, "0482", 30);
      this.templateUpdateNode(79, "0534", 33);
      this.templateUpdateNode(112, "0535", 33);
      this.templateUpdateNode(87, "0483", 30);

      // Nether Door

      if (this.puzzleState[5] == 2 && this.puzzleState[31] == 1) {
        // Replace 10 by actual act
        this.templateUpdateNode(39, "0491", 11);
      } else {
        this.templateUpdateNode(39, "0490", 11);
      }
    } else {
      this.templateEnergyAlert();
    }
  }

  templateEnergyUpdate() {
    this.templateEnergyInterface();

    if (this.isFuseAction) {
      this.setCurrentAction(function() {
        if (this.puzzleState[this.currentPuzzle.id] == 1) {
          this.puzzleState[this.currentPuzzle.id] = 0;
          this.userEnergy += 1;
        } else if (this.userEnergy > 0) {
          this.puzzleState[this.currentPuzzle.id] = 1;
          this.userEnergy -= 1;
        } else {
          this.templateEnergyAlert();
        }

        this.templateEnergyUpdate();
      });
    }

    if (this.puzzleState[this.currentPuzzle.id] == 1) {
      this.templateUpdateNode(18, "0516", 2);
      this.templateUpdateNode(18, "0529", 31);
      this.templateUpdateNode(13, "0517", 2);
      this.templateUpdateNode(34, "0537", 37);
      this.templateUpdateNode(55, "0539", 39);
      this.templateUpdateNode(69, "0518", 18);
      this.templateUpdateNode(39, "0519", 10);
      this.templateUpdateNode(77, "0520", 27);
      this.templateUpdateNode(84, "0527", 47);
      this.templateUpdateNode(101, "0532", 38);
      this.templateUpdateNode(113, "0551", 36);
      this.templateUpdateNode(142, "0576", 54);
      this.templateUpdateNode(143, "0577", 54);
    } else {
      this.templateUpdateNode(18, "0521", 2);
      this.templateUpdateNode(18, "0530", 31);
      this.templateUpdateNode(13, "0522", 2);
      this.templateUpdateNode(34, "0538", 37);
      this.templateUpdateNode(55, "0540", 39);
      this.templateUpdateNode(69, "0523", 18);
      this.templateUpdateNode(39, "0524", 10);
      this.templateUpdateNode(77, "0525", 27);
      this.templateUpdateNode(84, "0526", 47);
      this.templateUpdateNode(101, "0533", 38);
      this.templateUpdateNode(113, "0552", 36);
      this.templateUpdateNode(142, "0571", 54);
      this.templateUpdateNode(143, "0573", 54);
    }

    // Extras

    if (this.currentPuzzle.id == 37) {
      this.puzzleState[37] = 1;
    }
  }

  templateEnergyAlert() {
    this.setAlpha("interfaceFuseAlert", 1.0);
    this.fadeOut(this.billboard("interfaceFuseAlert"), 0.5, 1.5);
  }

  templateProgressTerminal() {
    this.templateVignette();
    this.prefSave();

    if (this.userChapter == Chapter.act1) {
      this.templateUpdateNode(23, "0545", 16);
    }
    if (this.userChapter == Chapter.act2) {
      this.templateUpdateNode(23, "0546", 16);
    }
    if (this.userChapter == Chapter.act3) {
      this.templateUpdateNode(23, "0547", 16);
    }
    if (this.userChapter == Chapter.act4) {
      this.templateUpdateNode(23, "0548", 16);
    }
    if (this.userChapter == Chapter.act5) {
      this.templateUpdateNode(23, "0549", 16);
    }
  }

  templateAudioTerminal() {
    this.templateVignette();
    this.setCurrentAction(function() {
      this.puzzleState[this.currentPuzzle.id] =
        (this.puzzleState[this.currentPuzzle.id] + 1) % 2;
      this.templateAudioUpdate();
    });

    this.templateAudioUpdate();
  }

  templateAudioUpdate() {
    this.templateAudioInterface();

    if (this.puzzleState[this.currentPuzzle.id] == 1) {
      this.setHidden(this.billboard("overlay"), false);
      this.setAlpha("overlay", 1.0);
      this.templateUpdateNode(21, "0543", 35);
      this.templateUpdateNode(43, "0544", 35);
      hiversaires.music.volume = 1;
    } else {
      this.setHidden(this.billboard("overlay"), true);
      this.setAlpha("overlay", 0);
      hiversaires.music.volume = 0;
    }
  }

  templateAudioInterface() {
    this.setImage(
      "interfaceAudio",
      "interface/music." + (this.puzzleState[35] == 1 ? "on" : "off") + ".svg"
    );

    this.setHidden(this.billboard("interfaceAudio"), false);
    this.setAlpha("interfaceAudio", 1);

    this.fadeOut(this.billboard("interfaceAudio"), 3, 0.5);
  }

  templateEntenteTerminal1() {
    let targetGraphic = "";

    if (this.puzzleState[23] > 17) {
      targetGraphic = "Left";
    } else if (this.puzzleState[23] < 17) {
      targetGraphic = "Right";
    } else if (this.puzzleState[23] == 17) {
      targetGraphic = "Right";
    }

    this.setImage(
      "ententeScreen",
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(this.billboard("ententeScreen"), 0, 1);
  }

  templateEntenteTerminal2() {
    let targetGraphic = "";

    if (this.puzzleState[24] > 17) {
      targetGraphic = "Left2";
    } else if (this.puzzleState[24] < 17) {
      targetGraphic = "Right2";
    } else if (this.puzzleState[24] == 17) {
      targetGraphic = "Straight";
    }

    this.setImage(
      "ententeScreen",
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(this.billboard("ententeScreen"), 0, 1);
  }

  templateEntentePart1Incr() {
    if (this.puzzleState[23] == 17) {
      this.userNodeID = 93;
      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNodeID = 89;

      if (this.puzzleState[23] < 21) {
        this.puzzleState[23] = this.puzzleState[23] + 3;
      }

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateEntentePart1Decr() {
    this.userNodeID = 103;

    if (this.puzzleState[23] > 14) {
      this.puzzleState[23] = this.puzzleState[23] - 1;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Incr() {
    this.userNodeID = 94;
    this.userOrientation = 2;

    if (this.puzzleState[24] < 23) {
      this.puzzleState[24] = this.puzzleState[24] + 4;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Decr() {
    this.userNodeID = 95;
    this.userOrientation = 2;

    if (this.puzzleState[24] > 14) {
      this.puzzleState[24] = this.puzzleState[24] - 1;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Exit() {
    if (this.puzzleState[23] == 17 && this.puzzleState[24] == 17) {
      this.userNodeID = 107;
      this.userOrientation = 3;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNodeID = 93;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateKillTerminal() {
    this.setCurrentAction(function() {
      this.puzzleState[this.currentPuzzle.id]++;
      if (this.puzzleState[this.currentPuzzle.id] > 50) {
        this.wipePlayerProgress();
        this.newGame();
      }
    });
  }

  templateEndgameDoor() {
    if (this.puzzleState[47] == 1 && this.puzzleState[36] == 1) {
      this.templateUpdateNode(113, "0550", 40);
      this.setCurrentAction(this.walkThroughDoor);
    } else {
      this.templateEnergyAlert();
    }
  }

  templateEndgameCredit() {
    this.userChapter = Chapter.credit;
    this.updateMusic();

    this.setHidden(this.trigger("moveForward"), true);
    this.setHidden(this.trigger("moveLeft"), true);
    this.setHidden(this.trigger("moveRight"), true);

    this.setAlpha("menuBlack", 0.0);
    this.setHidden(this.billboard("menuBlack"), false);

    this.fadeIn(this.billboard("menuBlack"), 1.0, 3);

    this.setAlpha("menuCredit1", 0.0);
    this.setHidden(this.billboard("menuCredit1"), false);

    this.fadeIn(this.billboard("menuCredit1"), 6.0, 1);

    this.setAlpha("menuCredit2", 0.0);
    this.setHidden(this.billboard("menuCredit2"), false);

    this.fadeIn(this.billboard("menuCredit2"), 10.0, 1);

    this.setAlpha("menuCredit3", 0.0);
    this.setHidden(this.billboard("menuCredit3"), false);

    this.fadeIn(this.billboard("menuCredit3"), 16.0, 1);

    this.fadeIn(this.billboard("menuBlack"), 20.0, 1, false);

    if (this.userEnergy == 1) {
      this.setAlpha("menuCredit4", 0.0);
      this.setHidden(this.billboard("menuCredit4"), false);

      this.fadeIn(this.billboard("menuCredit4"), 24.0, 1);
    }
  }

  // ====================
  // Actions with interactions
  // ====================

  templateUpdateDoorknob(side1, side2) {
    if (this.userNodeID == side1 || this.userNodeID == side2) {
      this.setCurrentAction(this.openDoor);
    }
  }

  templateUpdateStudioTerminal() {
    this.setAlpha("overlay", 0.0);
    this.setHidden(this.billboard("overlay"), true);

    if (this.puzzleState[5] == 2) {
      this.setAlpha("overlay", 1.0);
      this.setHidden(this.billboard("overlay"), false);
      this.templateUpdateNode(19, "0489", 5);

      this.userChapter = Chapter.act5;
      this.updateMusic();
    } else {
      if (this.puzzleState[12] == 1 && this.puzzleState[21] == 1) {
        this.setAlpha("overlay", 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0536", 5);
      } else if (this.puzzleState[12] == 1 && this.puzzleState[21] == 0) {
        this.setAlpha("overlay", 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0542", 5);
      } else if (this.puzzleState[12] == 0 && this.puzzleState[21] == 1) {
        this.setAlpha("overlay", 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0541", 5);
      }

      if (this.userChapter == Chapter.act5) {
        this.userChapter = Chapter.act4;
        this.updateMusic();
      }
    }
  }

  templateUpdateNode(node, img, puzzleID) {
    if (this.userNodeID == node && this.currentPuzzle.id == puzzleID) {
      this.setImage("overlay", "node_old/node." + img + ".jpg");
    }

    // Fadeins

    if (this.currentPuzzle.type == PuzzleType.sealTerminal) {
      this.fadeIn(this.billboard("overlay"), 0.2, 0.1);
    } else if (this.currentPuzzle.type == PuzzleType.audioTerminal) {
      this.fadeIn(this.billboard("overlay"), 0.3, 0.5);
    } else if (this.currentPuzzle.type == PuzzleType.sealDoor) {
      this.fadeIn(this.billboard("overlay"), 0.0, 1.0);
    } else if (this.currentPuzzle.type == PuzzleType.progressTerminal) {
      this.fadeIn(this.billboard("overlay"), 0.3, 0.5);
    } else if (this.currentPuzzle.id == 28) {
      this.fadeIn(this.billboard("overlay"), 0.5, 1);
    } else {
      this.fadeIn(this.billboard("overlay"), 0, 0.0);
    }
  }

  templateVignette() {
    this.setAlpha("vignette", 1.0);
    this.fadeOut(this.billboard("vignette"), 0, 1.0);
  }

  templateSaveInterface() {
    this.setHidden(this.billboard("interfaceSave"), false);
    this.setAlpha("interfaceSave", 1);
    this.fadeOut(this.billboard("interfaceSave"), 3, 0.5);
  }

  illusionCheck() {
    let nodeIllusionAction = null;

    if (Math.random() * 10 > 7) {
      // forest
      if (this.userNodeID == 9 && this.userOrientation == 1) {
        nodeIllusionAction = 52;
      }

      // studio
      if (this.userNodeID == 15 && this.userOrientation == 0) {
        nodeIllusionAction = 17;
      }

      // circle
      if (this.userNodeID == 33 && this.userOrientation == 2) {
        nodeIllusionAction = 51;
      }

      // stones
      if (this.userNodeID == 43 && this.userOrientation == 2) {
        nodeIllusionAction = 22;
      }

      // antechannel
      if (this.userNodeID == 58 && this.userOrientation == 1) {
        nodeIllusionAction = 32;
      }

      // metamondst
      if (this.userNodeID == 73 && this.userOrientation == 2) {
        nodeIllusionAction = 29;
      }

      // capsule
      if (this.userNodeID == 88 && this.userOrientation == 3) {
        nodeIllusionAction = 50;
      }

      // entente
      if (this.userNodeID == 91 && this.userOrientation == 0) {
        nodeIllusionAction = 49;
      }

      // nataniev
      if (this.userNodeID == 114 && this.userOrientation == 2) {
        nodeIllusionAction = 48;
      }
    }

    if (nodeIllusionAction != null) {
      // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

      this.billboard("illusion").className =
        "node_" + this.userNodeID + "_" + this.userOrientation;
      this.setAlpha("illusion", 1);
      this.setHidden(this.billboard("illusion"), false);

      this.fadeOut(this.billboard("illusion"), 1, 0.5);

      if (this.userChapter == Chapter.act5) {
        this.puzzleState[nodeIllusionAction] = 1;
        this.illusionInterface();
      }
    }
  }

  illusionInterface() {
    let illusionCount = 0;

    illusionCount += this.puzzleState[17];
    illusionCount += this.puzzleState[22];
    illusionCount += this.puzzleState[29];
    illusionCount += this.puzzleState[32];
    illusionCount += this.puzzleState[48];
    illusionCount += this.puzzleState[49];
    illusionCount += this.puzzleState[50];
    illusionCount += this.puzzleState[51];
    illusionCount += this.puzzleState[52];

    this.setImage(
      "interfaceIllusion",
      "interface/illusion." + illusionCount + ".svg"
    );
    this.setHidden(this.billboard("interfaceIllusion"), false);
    this.setAlpha("interfaceIllusion", 1);
    this.fadeOut(this.billboard("interfaceIllusion"), 3, 0.5);
  }

  // ====================
  // Tools
  // ====================

  fadeIn(viewToFadeIn, delay, duration, skipLast = true) {
    if (skipLast) {
      $(viewToFadeIn).finish();
    }
    $(viewToFadeIn)
      .delay(delay * 1000)
      .animate({ opacity: 1 }, duration * 1000);
  }

  fadeOut(viewToFadeOut, delay, duration, skipLast = true) {
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

    this.fadeOut(this.billboard("interfaceIndicatorLeft"), 0, 0.5);
  }

  animateTurnRight() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.setAlpha("interfaceIndicatorRight", 1);

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorRight"), 0, 0.5);
  }

  animateStepForward() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.setAlpha("interfaceIndicatorForward", 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0, 0.5);
  }

  animateStepBackward() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha("viewMain", 0.5);
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.setAlpha("interfaceIndicatorForward", 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0, 0.5);
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

    this.fadeOut(this.billboard("menuBlack"), 0, 2.0);
    this.fadeOut(this.billboard("menuLogo"), 3, 2.0);
    this.fadeOut(this.billboard("menuControls"), 8, 1.0);

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
