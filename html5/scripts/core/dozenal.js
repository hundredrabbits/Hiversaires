class Dozenal {
  constructor() {
    
    // User Storage

    this.puzzleState;
    this.userNodeId = 1;
    this.userOrientation = 0;
    this.userChapter = Chapter.act1;
    this.userEnergy = 0;

    // User Temp

    this.userAction;
    this.userSeal = 0;
    this.userActionId;
    this.userFootstep = 0;

    // Misc

    this.screenWidth = 9;
    this.screenHeight = 16;

    this.currentAction = null;
  }

  install() {}

  start() {
    this.newGame();
  }

  newGame() {
    // this.wipePlayerProgress(); // remove for release
    this.prefPositioning();
    this.templateStart();

    this.prefLoad();

    // this.userNodeId = 88;

    this.actionCheck();
    this.moveCheck();
    this.menuHome();
  }

  get currentNode() {
    return nodesByID[this.userNodeId];
  }

  get currentSubject() {
    return this.currentNode.subjects[this.userOrientation];
  }

  get currentPuzzle() {
    return puzzlesByID[this.userActionId];
  }

  billboard(id) {
    return hiversaires.stage.billboardsByID[id];
  }

  trigger(id) {
    return hiversaires.stage.triggersByID[id];
  }

  setImage(subject, url) {
    if (url) {
      hiversaires.artBook.setArt(subject, "media/graphics/" + url);
    } else {
      hiversaires.artBook.removeArt(subject);
    }
  }

  setAlpha(subject, value) {
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
    hiversaires.music.setRecord(recordsByChapter[this.userChapter]);
  }

  // ====================
  // Movement
  // ====================

  moveCheck() {
    this.actionReset();

    this.userAction = null;

    this.setHidden(this.trigger("moveForward"), !this.currentSubject);

    this.setImage(
      this.billboard("viewMain"),
      "node/node." +
        (this.userNodeId * 4 + this.userOrientation)
          .toString()
          .padStart(4, "0") +
        ".jpg"
    );

    this.illusionCheck();

    // Trigger Action

    if (this.currentSubject.indexOf("act") != -1) {
      this.userAction = this.currentSubject;
      this.userActionId = parseInt(this.userAction.replace(/act/g, ""));
      this.actionCheck();
    }

    hiversaires.music.setAmbience(ambienceByZone[this.currentNode.zone]);
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

    if (this.currentSubject.indexOf("|") == -1) {
      this.userNodeId =
        parseInt(this.currentSubject) > 0
          ? parseInt(this.currentSubject)
          : this.userNodeId;
    } else {
      let temp = this.currentSubject.split("|");
      this.userNodeId =
        parseInt(temp[0]) > 0 ? parseInt(temp[0]) : this.userNodeId;
      this.userOrientation = parseInt(temp[1]);
    }

    this.animateStepForward();
    this.moveCheck();
  }

  warpTo(node, orientation) {
    this.userNodeId = node;
    this.userOrientation = orientation % 4;
    this.moveCheck();
  }

  moveBackward() {
    this.userOrientation = (this.userOrientation + 4 + 2) % 4;
    if (this.currentSubject.indexOf("|") == -1) {
      this.userNodeId =
        parseInt(this.currentSubject) > 0
          ? parseInt(this.currentSubject)
          : this.userNodeId;
    } else {
      let temp = this.currentSubject.split("|");
      this.userNodeId =
        parseInt(temp[0]) > 0 ? parseInt(temp[0]) : this.userNodeId;
      this.userOrientation = parseInt(temp[1]);
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
    this.setHidden(this.trigger("moveForward"), !this.userAction);

    this.setCurrentAction(null);

    this.isFuseAction = false;

    if (this.userAction) {
      this.actionTemplate();
    }
  }

  action() {
    if (this[this.currentAction] != null) {
      this[this.currentAction]();
    }
  }

  action1() {
    // Binary button

    this.puzzleState[this.userActionId]++;

    // Exceptions

    if (this.userAction == "act1") {
      this.puzzleState[this.userActionId] =
        this.puzzleState[this.userActionId] > 2
          ? 0
          : this.puzzleState[this.userActionId];
      hiversaires.music.playEffect("action_EnergyActive");
      this.templateClockUpdate();
    }
    if (this.userAction == "act5") {
      this.puzzleState[this.userActionId] =
        this.puzzleState[this.userActionId] > 1 ? 0 : 2;
      hiversaires.music.playEffect("action_EnergyActive");
      this.templateUpdateStudioTerminal();
    }

    if (this.currentPuzzle.type == PuzzleType.audioTerminal) {
      this.puzzleState[this.userActionId] =
        this.puzzleState[this.userActionId] > 1 ? 0 : 1;
      this.templateAudioUpdate();
    }

    if (this.currentPuzzle.type == PuzzleType.killTerminal) {
      this.templateKillUpdate();
    }
  }

  action2() {
    // Door to display action3

    this.setHidden(this.billboard("overlay"), false);

    this.setCurrentAction("action3");
    this.templateEnergyUpdate();
  }

  action3() {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (this.userNodeId == 1) {
      this.userNodeId = 103;
    } else if (this.userNodeId == 11) {
      this.userNodeId = 48;
      this.userOrientation = 2;
    } else if (this.userNodeId == 13) {
      this.userNodeId = 12;
    } else if (this.userNodeId == 12) {
      this.userNodeId = 13;
    } else if (this.userNodeId == 16) {
      this.userNodeId = 22;
    } else if (this.userNodeId == 20 && this.puzzleState[37] > 0) {
      this.userNodeId = 116;
      this.userOrientation = 1;
    } else if (this.userNodeId == 23) {
      // Fold Gate
      this.userNodeId = 22;
    } else if (this.userNodeId == 25) {
      this.userNodeId = 31;
      this.userOrientation = 2;
    } else if (this.userNodeId == 27) {
      this.userNodeId = 32;
      this.userOrientation = 1;
    } else if (this.userNodeId == 35) {
      this.userNodeId = 31;
      this.userOrientation = 0;
    } else if (
      this.userNodeId == 39 &&
      this.puzzleState[5] == 2 &&
      this.puzzleState[31] == 1
    ) {
      this.userNodeId = 34;
    } else if (this.userNodeId == 39) {
      this.userNodeId = 45;
    } else if (this.userNodeId == 45) {
      this.userNodeId = 51;
    } else if (this.userNodeId == 46) {
      this.userNodeId = 85;
      this.userOrientation = 2;
    } else if (this.userNodeId == 48) {
      this.userNodeId = 11;
      this.userOrientation = 2;
    } else if (this.userNodeId == 51) {
      this.userNodeId = 45;
    } else if (this.userNodeId == 52) {
      this.userNodeId = 32;
      this.userOrientation = 3;
    } else if (this.userNodeId == 61) {
      this.userNodeId = 72;
    } else if (this.userNodeId == 62) {
      this.userNodeId = 77;
    } else if (this.userNodeId == 69) {
      this.userNodeId = 72;
    } else if (this.userNodeId == 76) {
      this.userNodeId = 87;
    } else if (this.userNodeId == 77) {
      this.userNodeId = 62;
    } else if (this.userNodeId == 79) {
      this.userNodeId = 112;
    } else if (this.userNodeId == 85) {
      this.userNodeId = 46;
      this.userOrientation = 0;
    } else if (this.userNodeId == 87) {
      this.userNodeId = 76;
    } else if (this.userNodeId == 112) {
      this.userNodeId = 79;
    } else if (this.userNodeId == 113) {
      this.userNodeId = 50;
    } else if (this.userNodeId == 142) {
      this.userNodeId = 143;
      this.userOrientation = 3;
    } else if (this.userNodeId == 143) {
      this.userNodeId = 142;
      this.userOrientation = 1;
    }

    // Easter Eggs

    this.userAction = null;

    this.actionCheck();
    this.moveCheck();
  }

  action4() {
    // Fuse(energy) Action

    if (this.puzzleState[this.userActionId] == 1) {
      this.puzzleState[this.userActionId] = 0;
      this.userEnergy += 1;
    } else if (this.userEnergy > 0) {
      this.puzzleState[this.userActionId] = 1;
      this.userEnergy -= 1;
    } else {
      this.templateEnergyAlert();
    }

    this.templateEnergyUpdate();
  }

  action5() {
    // Seal Action

    if (this.puzzleState[this.userActionId] == 1 || this.sealCount() > 0) {
      if (this.puzzleState[this.userActionId] != 1) {
        hiversaires.music.playEffect("action_SealActive");
        this.puzzleState[this.userActionId] = 1;
      } else {
        hiversaires.music.playEffect("action_SealInactive");
        this.puzzleState[this.userActionId] = 0;
      }
    } else {
      hiversaires.music.playEffect("action_EnergyStack");
      this.templateSealAlert();
      console.log("No more seal slots.");
    }

    this.templateSealUpdate();
  }

  actionReset() {
    this.setAlpha(this.billboard("menu1"), 0);
    this.setAlpha(this.billboard("menu2"), 0);
    this.setAlpha(this.billboard("menu3"), 0);
    this.setAlpha(this.billboard("menu4"), 0);
    this.setAlpha(this.billboard("menu5"), 0);
    this.setAlpha(this.billboard("menu6"), 0);

    this.setAlpha(this.billboard("overlay"), 0);
    this.setAlpha(this.billboard("clockFace"), 0);
    this.setAlpha(this.billboard("clockShadow"), 0);
    this.setAlpha(this.billboard("ententeScreen"), 0);

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

    if (this.userAction == "act23") {
      this.templateEntenteTerminal1();
    }
    if (this.userAction == "act24") {
      this.templateEntenteTerminal2();
    }
    if (this.userAction == "act43") {
      this.templateEntentePart1Incr();
    }
    if (this.userAction == "act42") {
      this.templateEntentePart1Decr();
    }
    if (this.userAction == "act45") {
      this.templateEntentePart2Incr();
    }
    if (this.userAction == "act44") {
      this.templateEntentePart2Decr();
    }
    if (this.userAction == "act46") {
      this.templateEntentePart2Exit();
    }
  }

  templateTimeDoor() {
    this.prefPositioning();
    this.templateVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if ((currentHours == 15 && currentMinutes == 7) || this.userNodeId == 143) {
      this.puzzleState[54] = 1;
      this.templateUpdateDoorknob(142, 143, this.trigger("action2"));
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }

  templateClockTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setCurrentAction("action1");

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate();
  }

  templateClockInterface() {
    this.setImage(
      this.billboard("interfaceDimclock"),
      "interface/clock." + this.puzzleState[1] + ".svg"
    );
    this.setHidden(this.billboard("interfaceDimclock"), false);
    this.setAlpha(this.billboard("interfaceDimclock"), 1);
    this.fadeOut(this.billboard("interfaceDimclock"), 3, 0.5);
  }

  templateClockDoor() {
    this.prefPositioning();
    this.templateVignette();

    // Display Interactions

    this.setHidden(this.billboard("overlay"), true);

    this.templateClockInterface();

    // Audio

    hiversaires.music.playEffect("action_DoorInit");

    // Templates

    let doorUnlocked = false;

    if (this.userAction == "act7") {
      if (this.puzzleState[1] == 1 || this.puzzleState[1] == 2) {
        doorUnlocked = true;
      }
    }

    if (this.userAction == "act8") {
      if (this.puzzleState[1] == 1 || this.puzzleState[1] == 0) {
        doorUnlocked = true;
      }
    }

    if (doorUnlocked.userAction == "act9") {
      if (this.puzzleState[1] == 2 || this.puzzleState[1] == 0) {
        doorUnlocked = true;
      }
    }

    if (doorUnlocked) {
      this.setCurrentAction("action2");

      this.templateUpdateNode(16, "0472", "act7");
      this.templateUpdateNode(23, "0473", "act7");
      this.templateUpdateNode(25, "0474", "act8");
      this.templateUpdateNode(35, "0475", "act8");
      this.templateUpdateNode(27, "0476", "act9");
      this.templateUpdateNode(52, "0477", "act9");
    } else {
      this.templateClockAlert();
    }
  }

  templateClockUpdate() {
    this.templateClockInterface();

    this.setImage(
      this.billboard("clockShadow"),
      "interface/dimclock.shadow.svg"
    );

    this.setImage(
      this.billboard("clockFace"),
      "interface/dimclock.state" + this.puzzleState[1] + ".svg"
    );

    this.fadeIn(this.billboard("clockShadow"), 0.5, 1.5);
    this.fadeIn(this.billboard("clockFace"), 0.5, 0.5);
  }

  templateClockAlert() {
    this.setImage(
      this.billboard("interfaceDimclockAlert"),
      "interface/alert.svg"
    );
    this.setAlpha(this.billboard("interfaceDimclockAlert"), 1.0);
    this.fadeOut(this.billboard("interfaceDimclockAlert"), 0.5, 0.5);
  }

  templateSealTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(this.billboard("overlay"), false);
    this.setAlpha(this.billboard("overlay"), 0);

    this.setCurrentAction("action5");

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate();
  }

  templateSealInterface() {
    this.userSeal = this.sealCount();

    this.setImage(this.billboard("interfaceSeal1"), "interface/seal.0.svg");
    this.setImage(this.billboard("interfaceSeal2"), "interface/seal.0.svg");

    if (this.userSeal == 1) {
      this.setImage(
        this.billboard("interfaceSeal1"),
        "interface/seal." + this.sealFind(1) + ".svg"
      );
    } else if (this.userSeal == 0) {
      this.setImage(
        this.billboard("interfaceSeal1"),
        "interface/seal." + this.sealFind(1) + ".svg"
      );
      this.setImage(
        this.billboard("interfaceSeal2"),
        "interface/seal." + this.sealFind(2) + ".svg"
      );
    }

    this.setHidden(this.billboard("interfaceSeal1"), false);
    this.setHidden(this.billboard("interfaceSeal2"), false);

    this.setAlpha(this.billboard("interfaceSeal1"), 1);
    this.setAlpha(this.billboard("interfaceSeal2"), 1);

    this.fadeOut(this.billboard("interfaceSeal1"), 3, 0.5);
    this.fadeOut(this.billboard("interfaceSeal2"), 3, 0.5);
  }

  templateSealDoor() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(this.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    this.templateSealInterface();

    if (this.puzzleState[4] == 1 && this.puzzleState[13] == 1) {
      // Act 1 : Forest + Rainre in Stones
      if (this.userNodeId == 46 || this.userNodeId == 85) {
        this.templateUpdateDoorknob(46, 85, this.trigger("action2"));
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        this.userChapter = Chapter.act2;
        this.prefSave();
      }
    } else if (this.puzzleState[20] == 1 && this.puzzleState[13] == 1) {
      // Act 2 : Metamondst + Rainre in Forest
      if (this.userNodeId == 11 || this.userNodeId == 48) {
        this.templateUpdateDoorknob(48, 11, this.trigger("action2"));
        this.templateUpdateNode(11, "0487", "act25");
        this.templateUpdateNode(48, "0488", "act25");
        this.userChapter = Chapter.act3;
        this.prefSave();
      }
    } else if (this.puzzleState[21] == 1 && this.puzzleState[13] == 1) {
      // Act 3 : Forest + Rainre in Metamondst
      if (this.userNodeId == 46 || this.userNodeId == 85) {
        this.templateUpdateDoorknob(46, 85, this.trigger("action2"));
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        this.userChapter = Chapter.act4;
        this.prefSave();
      }
    } else if (this.puzzleState[21] == 1 && this.puzzleState[12] == 1) {
      // Act 4 : Antechannel + Stones in Studio
      if (this.userNodeId == 19) {
        this.setCurrentAction("action1");
        this.templateUpdateStudioTerminal();

        this.prefSave();
      }
    } else if (this.userAction == "act5" && this.userNodeId == 19) {
      // Studio Terminal
      this.templateUpdateStudioTerminal();
    } else {
      this.templateSealAlert();
    }
  }

  templateSealUpdate() {
    this.templateSealInterface();

    this.userSeal = this.sealCount();

    this.fadeOut(this.billboard("overlay"), 0, 0.5);

    if (this.puzzleState[this.userActionId] != 1) {
      return;
    }

    if (this.userSeal == 1) {
      this.templateUpdateNode(5, "0493", "act4");
      this.templateUpdateNode(38, "0496", "act12");
      this.templateUpdateNode(45, "0502", "act13");
      this.templateUpdateNode(49, "0505", "act21");
      this.templateUpdateNode(82, "0499", "act20");
    } else {
      this.templateUpdateNode(5, "0494", "act4");
      this.templateUpdateNode(38, "0497", "act12");
      this.templateUpdateNode(45, "0503", "act13");
      this.templateUpdateNode(49, "0506", "act21");
      this.templateUpdateNode(82, "0500", "act20");
    }
  }

  templateSealAlert() {
    this.setImage(this.billboard("interfaceSealAlert"), "interface/alert.svg");
    this.setAlpha(this.billboard("interfaceSealAlert"), 1.0);
    this.fadeOut(this.billboard("interfaceSealAlert"), 0.5, 0.5);
  }

  templateEnergyTerminal() {
    this.prefPositioning();
    this.templateVignette();
    this.templateEnergyInterface();

    this.setHidden(this.billboard("overlay"), false);

    this.setCurrentAction("action2");

    this.isFuseAction = true;

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyInterface() {
    this.setImage(
      this.billboard("interfaceFuse1"),
      "interface/fuse." + this.userEnergy + ".svg"
    );

    this.setHidden(this.billboard("interfaceFuse1"), false);
    this.setAlpha(this.billboard("interfaceFuse1"), 1);

    this.fadeOut(this.billboard("interfaceFuse1"), 3, 0.5);
  }

  templateEnergyDoor() {
    this.prefPositioning();
    this.templateVignette();

    // Display Interactions

    this.setHidden(this.billboard("overlay"), true);

    // Audio

    hiversaires.music.playEffect("action_DoorInit");
    this.templateEnergyInterface();

    // Templates

    let puzzleTerminal = null;

    if (this.userAction == "act3") {
      puzzleTerminal = 2;
    }
    if (this.userAction == "act6") {
      puzzleTerminal = 37;
    }

    if (this.userAction == "act11") {
      puzzleTerminal = 10;
    }
    if (this.userAction == "act19") {
      puzzleTerminal = 18;
    }
    if (this.userAction == "act26") {
      puzzleTerminal = 27;
    }

    if (this.userAction == "act28") {
      puzzleTerminal = 5;
    }
    if (this.userAction == "act30") {
      puzzleTerminal = 5;
    }
    if (this.userAction == "act33") {
      puzzleTerminal = 47;
    } // Antechannel fuse for Capsule door

    if (puzzleTerminal != null && this.puzzleState[puzzleTerminal] > 0) {
      this.setCurrentAction("action2");

      this.templateUpdateNode(1, "0531", "act28");
      this.templateUpdateNode(12, "0470", "act3");
      this.templateUpdateNode(13, "0471", "act3");
      this.templateUpdateNode(20, "0080", "act6");
      this.templateUpdateNode(69, "0478", "act19");
      this.templateUpdateNode(61, "0479", "act19");
      this.templateUpdateNode(62, "0480", "act26");
      this.templateUpdateNode(77, "0481", "act26");
      this.templateUpdateNode(76, "0482", "act30");
      this.templateUpdateNode(79, "0534", "act33");
      this.templateUpdateNode(112, "0535", "act33");
      this.templateUpdateNode(87, "0483", "act30");

      // Nether Door

      if (this.puzzleState[5] == 2 && this.puzzleState[31] == 1) {
        // Replace 10 by actual act
        this.templateUpdateNode(39, "0491", "act11");
      } else {
        this.templateUpdateNode(39, "0490", "act11");
      }
    } else {
      this.templateEnergyAlert();
    }
  }

  templateEnergyUpdate() {
    this.templateEnergyInterface();

    if (this.isFuseAction) {
      this.setCurrentAction("action4");
    }

    if (this.puzzleState[this.userActionId] == 1) {
      this.templateUpdateNode(18, "0516", "act2");
      this.templateUpdateNode(18, "0529", "act31");
      this.templateUpdateNode(13, "0517", "act2");
      this.templateUpdateNode(34, "0537", "act37");
      this.templateUpdateNode(55, "0539", "act39");
      this.templateUpdateNode(69, "0518", "act18");
      this.templateUpdateNode(39, "0519", "act10");
      this.templateUpdateNode(77, "0520", "act27");
      this.templateUpdateNode(84, "0527", "act47");
      this.templateUpdateNode(101, "0532", "act38");
      this.templateUpdateNode(113, "0551", "act36");
      this.templateUpdateNode(142, "0576", "act54");
      this.templateUpdateNode(143, "0577", "act54");
    } else {
      this.templateUpdateNode(18, "0521", "act2");
      this.templateUpdateNode(18, "0530", "act31");
      this.templateUpdateNode(13, "0522", "act2");
      this.templateUpdateNode(34, "0538", "act37");
      this.templateUpdateNode(55, "0540", "act39");
      this.templateUpdateNode(69, "0523", "act18");
      this.templateUpdateNode(39, "0524", "act10");
      this.templateUpdateNode(77, "0525", "act27");
      this.templateUpdateNode(84, "0526", "act47");
      this.templateUpdateNode(101, "0533", "act38");
      this.templateUpdateNode(113, "0552", "act36");
      this.templateUpdateNode(142, "0571", "act54");
      this.templateUpdateNode(143, "0573", "act54");
    }

    // Extras

    if (this.userAction == "act37") {
      this.puzzleState[37] = 1;
    }
  }

  templateEnergyAlert() {
    this.setImage(this.billboard("interfaceFuseAlert"), "interface/alert.svg");
    this.setAlpha(this.billboard("interfaceFuseAlert"), 1.0);
    this.fadeOut(this.billboard("interfaceFuseAlert"), 0.5, 1.5);
  }

  templateProgressTerminal() {
    this.prefPositioning();
    this.templateVignette();
    this.prefSave();

    if (this.userChapter == Chapter.act1) {
      this.templateUpdateNode(23, "0545", "act16");
    }
    if (this.userChapter == Chapter.act2) {
      this.templateUpdateNode(23, "0546", "act16");
    }
    if (this.userChapter == Chapter.act3) {
      this.templateUpdateNode(23, "0547", "act16");
    }
    if (this.userChapter == Chapter.act4) {
      this.templateUpdateNode(23, "0548", "act16");
    }
    if (this.userChapter == Chapter.act5) {
      this.templateUpdateNode(23, "0549", "act16");
    }
  }

  templateAudioTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setCurrentAction("action1");

    this.templateAudioUpdate();
  }

  templateAudioUpdate() {
    this.templateAudioInterface();

    if (this.puzzleState[this.userActionId] == 1) {
      this.setHidden(this.billboard("overlay"), false);
      this.setAlpha(this.billboard("overlay"), 1.0);
      this.templateUpdateNode(21, "0543", "act35");
      this.templateUpdateNode(43, "0544", "act35");
      hiversaires.music.volume = 1;
    } else {
      this.setHidden(this.billboard("overlay"), true);
      this.setAlpha(this.billboard("overlay"), 0);
      hiversaires.music.volume = 0;
    }
  }

  templateAudioInterface() {
    this.setImage(
      this.billboard("interfaceAudio"),
      "interface/music." + (this.puzzleState[35] == 1 ? "on" : "off") + ".svg"
    );

    this.setHidden(this.billboard("interfaceAudio"), false);
    this.setAlpha(this.billboard("interfaceAudio"), 1);

    this.fadeOut(this.billboard("interfaceAudio"), 3, 0.5);
  }

  templateEntenteTerminal1() {
    this.prefPositioning();

    let targetGraphic = "";

    if (this.puzzleState[23] > 17) {
      targetGraphic = "Left";
    } else if (this.puzzleState[23] < 17) {
      targetGraphic = "Right";
    } else if (this.puzzleState[23] == 17) {
      targetGraphic = "Right";
    }

    this.setImage(
      this.billboard("ententeScreen"),
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(this.billboard("ententeScreen"), 0, 1);
  }

  templateEntenteTerminal2() {
    this.prefPositioning();

    let targetGraphic = "";

    if (this.puzzleState[24] > 17) {
      targetGraphic = "Left2";
    } else if (this.puzzleState[24] < 17) {
      targetGraphic = "Right2";
    } else if (this.puzzleState[24] == 17) {
      targetGraphic = "Straight";
    }

    this.setImage(
      this.billboard("ententeScreen"),
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(this.billboard("ententeScreen"), 0, 1);
  }

  templateEntentePart1Incr() {
    if (this.puzzleState[23] == 17) {
      this.userNodeId = 93;
      this.userAction = null;
      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNodeId = 89;
      this.userAction = null;

      if (this.puzzleState[23] < 21) {
        this.puzzleState[23] = this.puzzleState[23] + 3;
      }

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateEntentePart1Decr() {
    this.userNodeId = 103;
    this.userAction = null;

    if (this.puzzleState[23] > 14) {
      this.puzzleState[23] = this.puzzleState[23] - 1;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Incr() {
    this.userNodeId = 94;
    this.userOrientation = 2;
    this.userAction = null;

    if (this.puzzleState[24] < 23) {
      this.puzzleState[24] = this.puzzleState[24] + 4;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Decr() {
    this.userNodeId = 95;
    this.userOrientation = 2;
    this.userAction = null;

    if (this.puzzleState[24] > 14) {
      this.puzzleState[24] = this.puzzleState[24] - 1;
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Exit() {
    if (this.puzzleState[23] == 17 && this.puzzleState[24] == 17) {
      this.userNodeId = 107;
      this.userOrientation = 3;
      this.userAction = null;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNodeId = 93;
      this.userAction = null;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateKillTerminal() {
    this.prefPositioning();

    this.setCurrentAction("action1");
  }

  templateKillUpdate() {
    if (this.puzzleState[14] > 50) {
      this.wipePlayerProgress();
      this.newGame();
    }
  }

  templateEndgameDoor() {
    this.prefPositioning();

    if (this.puzzleState[47] == 1 && this.puzzleState[36] == 1) {
      this.templateUpdateNode(113, "0550", "act40");

      this.setCurrentAction("action3");
    } else {
      this.templateEnergyAlert();
    }
  }

  templateEndgameCredit() {
    this.prefPositioning();

    this.userChapter = Chapter.credit;
    this.updateMusic();

    this.setHidden(this.trigger("moveForward"), true);
    this.setHidden(this.trigger("moveLeft"), true);
    this.setHidden(this.trigger("moveRight"), true);

    this.setHidden(this.trigger("actionCredit"), false);

    this.setImage(this.billboard("menu1"), "menu/menu.black.jpg");
    this.setAlpha(this.billboard("menu1"), 0.0);
    this.setHidden(this.billboard("menu1"), false);

    this.fadeIn(this.billboard("menu1"), 1.0, 3);

    this.setImage(this.billboard("menu2"), "menu/menu.credit1.png");
    this.setAlpha(this.billboard("menu2"), 0.0);
    this.setHidden(this.billboard("menu2"), false);

    this.fadeIn(this.billboard("menu2"), 6.0, 1);

    this.setImage(this.billboard("menu3"), "menu/menu.credit2.png");
    this.setAlpha(this.billboard("menu3"), 0.0);
    this.setHidden(this.billboard("menu3"), false);

    this.fadeIn(this.billboard("menu3"), 10.0, 1);

    this.setImage(this.billboard("menu4"), "menu/menu.credit3.png");
    this.setAlpha(this.billboard("menu4"), 0.0);
    this.setHidden(this.billboard("menu4"), false);

    this.fadeIn(this.billboard("menu4"), 16.0, 1);

    this.setImage(this.billboard("menu5"), "menu/menu.black.jpg");
    this.setAlpha(this.billboard("menu5"), 0.0);
    this.setHidden(this.billboard("menu5"), false);

    this.fadeIn(this.billboard("menu5"), 20.0, 1);

    if (this.userEnergy == 1) {
      this.setImage(this.billboard("menu6"), "menu/menu.credit4.png");
      this.setAlpha(this.billboard("menu6"), 0.0);
      this.setHidden(this.billboard("menu6"), false);

      this.fadeIn(this.billboard("menu6"), 24.0, 1);
    }
  }

  // ====================
  // Actions with interactions
  // ====================

  templateUpdateDoorknob(side1, side2, knob) {
    if (this.userNodeId == side1 || this.userNodeId == side2) {
      this.setHidden(knob, false);
      this.setAlpha(knob, 1.0);
    }
  }

  templateUpdateStudioTerminal() {
    this.setAlpha(this.billboard("overlay"), 0.0);
    this.setHidden(this.billboard("overlay"), true);

    if (this.puzzleState[5] == 2) {
      this.setAlpha(this.billboard("overlay"), 1.0);
      this.setHidden(this.billboard("overlay"), false);
      this.templateUpdateNode(19, "0489", "act5");

      this.userChapter = Chapter.act5;
      this.updateMusic();
    } else {
      if (this.puzzleState[12] == 1 && this.puzzleState[21] == 1) {
        this.setAlpha(this.billboard("overlay"), 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0536", "act5");
      } else if (this.puzzleState[12] == 1 && this.puzzleState[21] == 0) {
        this.setAlpha(this.billboard("overlay"), 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0542", "act5");
      } else if (this.puzzleState[12] == 0 && this.puzzleState[21] == 1) {
        this.setAlpha(this.billboard("overlay"), 1.0);
        this.setHidden(this.billboard("overlay"), false);
        this.templateUpdateNode(19, "0541", "act5");
      }

      if (this.userChapter == Chapter.act5) {
        this.userChapter = Chapter.act4;
        this.updateMusic();
      }
    }
  }

  templateUpdateNode(node, img, act) {
    if (this.userNodeId == node && this.userAction == act) {
      this.setImage(this.billboard("overlay"), "node/node." + img + ".jpg");
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
    } else if (this.userActionId == 28) {
      this.fadeIn(this.billboard("overlay"), 0.5, 1);
    } else {
      this.fadeIn(this.billboard("overlay"), 0, 0.0);
    }
  }

  templateVignette() {
    this.prefPositioning();

    this.setImage(this.billboard("vignette"), "interface/vignette.png");
    this.setAlpha(this.billboard("vignette"), 1.0);
    this.fadeOut(this.billboard("vignette"), 0, 1.0);
  }

  templateSaveInterface() {
    this.prefPositioning();

    this.setImage(this.billboard("interfaceSave"), "interface/save.svg");
    this.setHidden(this.billboard("interfaceSave"), false);
    this.setAlpha(this.billboard("interfaceSave"), 1);
    this.fadeOut(this.billboard("interfaceSave"), 3, 0.5);
  }

  illusionCheck() {
    this.prefPositioning();

    let nodeIllusion = 0;
    let nodeIllusionAction;

    if (Math.random() * 10 > 7) {

      // forest
      if (this.userNodeId == 9 && this.userOrientation == 1) {
        nodeIllusion = 562;
        nodeIllusionAction = 52;
      }

      // studio
      if (this.userNodeId == 15 && this.userOrientation == 0) {
        nodeIllusion = 554;
        nodeIllusionAction = 17;
      }

      // circle
      if (this.userNodeId == 33 && this.userOrientation == 2) {
        nodeIllusion = 561;
        nodeIllusionAction = 51;
      }

      // stones
      if (this.userNodeId == 43 && this.userOrientation == 2) {
        nodeIllusion = 555;
        nodeIllusionAction = 22;
      }

      // antechannel
      if (this.userNodeId == 58 && this.userOrientation == 1) {
        nodeIllusion = 557;
        nodeIllusionAction = 32;
      }

      // metamondst
      if (this.userNodeId == 73 && this.userOrientation == 2) {
        nodeIllusion = 556;
        nodeIllusionAction = 29;
      }

      // capsule
      if (this.userNodeId == 88 && this.userOrientation == 3) {
        nodeIllusion = 560;
        nodeIllusionAction = 50;
      }

      // entente
      if (this.userNodeId == 91 && this.userOrientation == 0) {
        nodeIllusion = 559;
        nodeIllusionAction = 49;
      }

      // nataniev
      if (this.userNodeId == 114 && this.userOrientation == 2) {
        nodeIllusion = 558;
        nodeIllusionAction = 48;
      }
    }

    if (nodeIllusion > 0 && this.userChapter == Chapter.act5) {
      this.setImage(
        this.billboard("overlay"),
        "node/node.0" + nodeIllusion + ".jpg"
      );
      this.setAlpha(this.billboard("overlay"), 1);
      this.setHidden(this.billboard("overlay"), false);

      this.fadeOut(this.billboard("overlay"), 1, 0.5);

      this.puzzleState[nodeIllusionAction] = 1;

      this.illusionInterface();
    }
  }

  illusionInterface() {
    this.prefPositioning();

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
      this.billboard("interfaceIllusion"),
      "interface/illusion." + illusionCount + ".svg"
    );
    this.setHidden(this.billboard("interfaceIllusion"), false);
    this.setAlpha(this.billboard("interfaceIllusion"), 1);
    this.fadeOut(this.billboard("interfaceIllusion"), 3, 0.5);
  }

  // ====================
  // Counters
  // ====================

  sealCount() {
    let count = 0;
    count += this.puzzleState[4];
    count += this.puzzleState[12];
    count += this.puzzleState[13];
    count += this.puzzleState[20];
    count += this.puzzleState[21];
    count = 2 - count;

    return count;
  }

  sealFind(rank) {
    let sealFound = 0;

    if (this.puzzleState[4] > 0) {
      sealFound = 4;
    } else if (this.puzzleState[12] > 0) {
      sealFound = 12;
    } else if (this.puzzleState[13] > 0) {
      sealFound = 13;
    } else if (this.puzzleState[20] > 0) {
      sealFound = 20;
    } else if (this.puzzleState[21] > 0) {
      sealFound = 21;
    }

    if (rank == 2) {
      if (this.puzzleState[4] > 0 && sealFound != 4) {
        sealFound = 4;
      } else if (this.puzzleState[12] > 0 && sealFound != 12) {
        sealFound = 12;
      } else if (this.puzzleState[13] > 0 && sealFound != 13) {
        sealFound = 13;
      } else if (this.puzzleState[20] > 0 && sealFound != 20) {
        sealFound = 20;
      } else if (this.puzzleState[21] > 0 && sealFound != 21) {
        sealFound = 21;
      }
    }

    return sealFound;
  }

  // ====================
  // Tools
  // ====================

  fadeIn(viewToFadeIn, delay, duration) {
    $(viewToFadeIn)
      .finish()
      .delay(delay * 1000)
      .animate({ opacity: 1 }, duration * 1000);
  }

  fadeOut(viewToFadeOut, delay, duration) {
    $(viewToFadeOut)
      .finish()
      .delay(delay * 1000)
      .animate({ opacity: 0 }, duration * 1000);
  }

  animateTurnLeft() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.setAlpha(this.billboard("interfaceIndicatorLeft"), 1);

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorLeft"), 0, 0.5);
  }

  animateTurnRight() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.setAlpha(this.billboard("interfaceIndicatorRight"), 1);

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorRight"), 0, 0.5);
  }

  animateStepForward() {
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.setAlpha(this.billboard("interfaceIndicatorForward"), 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0, 0.5);
  }

  animateStepBackward() {
    hiversaires.music.playEffect("footstep_turn");
    let viewMain = $(this.billboard("viewMain"));
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.setAlpha(this.billboard("interfaceIndicatorForward"), 1);

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0, 0.5);
  }

  // ====================
  // Audio
  // ====================

  playFootStep() {
    this.userFootstep += 1;
    if (
      this.currentSubject.indexOf("|") != -1 ||
      parseInt(this.currentSubject) > 0
    ) {
      if (this.userFootstep & 1) {
        hiversaires.music.playEffect("footstep_left");
      } else {
        hiversaires.music.playEffect("footstep_right");
      }
    } else {
      hiversaires.music.playEffect("footstep_collide");
    }
  }

  // ====================
  // Preferences
  // ====================

  templateStart() {
    this.setImage(
      this.billboard("interfaceIndicatorRight"),
      "interface/interfaceMove.indicator.svg"
    );
    this.setImage(
      this.billboard("interfaceIndicatorForward"),
      "interface/interfaceMove.indicator.svg"
    );
    this.setImage(
      this.billboard("interfaceIndicatorLeft"),
      "interface/interfaceMove.indicator.svg"
    );
  }

  prefPositioning() {
    // Core

    // Movement

    this.setHidden(this.trigger("actionCredit"), true);

    // Graphics

    // Style - Interface - Fuse

    this.setAlpha(this.billboard("interfaceIndicatorRight"), 0);
    this.setAlpha(this.billboard("interfaceIndicatorForward"), 0);
    this.setAlpha(this.billboard("interfaceIndicatorLeft"), 0);
  }

  menuHome() {
    this.setImage(this.billboard("menu2"), "menu/menu.black.jpg");
    this.setAlpha(this.billboard("menu2"), 1.0);
    this.setHidden(this.billboard("menu2"), false);

    this.setImage(this.billboard("menu3"), "menu/menu.logo.png");
    this.setAlpha(this.billboard("menu3"), 1.0);
    this.setHidden(this.billboard("menu3"), false);

    this.setImage(this.billboard("menu4"), "menu/menu.controls.svg");
    this.setAlpha(this.billboard("menu4"), 1.0);
    this.setHidden(this.billboard("menu4"), false);

    this.setHidden(this.billboard("interfaceSeal1"), true);
    this.setHidden(this.billboard("interfaceSeal2"), true);
    this.setHidden(this.billboard("interfaceFuse1"), true);

    this.fadeOut(this.billboard("menu2"), 0, 2.0);
    this.fadeOut(this.billboard("menu3"), 3, 2.0);
    this.fadeOut(this.billboard("menu4"), 8, 1.0);

    hiversaires.music.volume = 1; // Music
  }

  prefSave() {
    this.prefPositioning();
    let saveObject = {
      userSettings: {
        userNode: this.userNodeId,
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
      this.userNodeId = userSettings.userNode;
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
      for (let id in puzzlesByID) {
        this.puzzleState[id] = puzzlesByID[id].defaultState;
      }

      console.log(this.puzzleState);

      // Default Location

      this.userNodeId = 1;
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

  actionCredit() {
    // TODO: link to 100r.co
  }
}
