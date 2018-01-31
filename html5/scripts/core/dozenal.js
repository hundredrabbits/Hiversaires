class Dozenal {
  constructor() {
    // Puzzle
    this.puzzleTerminal = 0;
    this.puzzleState;

    // User Storage

    this.userActionStorage;
    this.userSettings;
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

  get forwardSubject() {
    return nodesByID[this.userNodeId][this.userOrientation];
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
    this.setHidden(hiversaires.stage.triggersByID["action"], value == null);
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

    this.setHidden(
      hiversaires.stage.triggersByID["moveForward"],
      !this.forwardSubject
    );

    this.setImage(
      hiversaires.stage.billboardsByID["viewMain"],
      "node/node." +
        (this.userNodeId * 4 + this.userOrientation)
          .toString()
          .padStart(4, "0") +
        ".jpg"
    );

    this.illusionCheck();

    // Trigger Action

    if (this.forwardSubject.indexOf("act") != -1) {
      this.userAction = this.forwardSubject;
      this.userActionId = parseInt(this.userAction.replace(/act/g, ""));
      this.actionCheck();
    }

    hiversaires.music.setAmbience(
      ambienceByZone[nodesByID[this.userNodeId][4]]
    );
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

    if (this.forwardSubject.indexOf("|") == -1) {
      this.userNodeId =
        parseInt(this.forwardSubject) > 0
          ? parseInt(this.forwardSubject)
          : this.userNodeId;
    } else {
      let temp = this.forwardSubject.split("|");
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
    if (this.forwardSubject.indexOf("|") == -1) {
      this.userNodeId =
        parseInt(this.forwardSubject) > 0
          ? parseInt(this.forwardSubject)
          : this.userNodeId;
    } else {
      let temp = this.forwardSubject.split("|");
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
    this.setHidden(hiversaires.stage.triggersByID["moveLeft"], false);
    this.setHidden(hiversaires.stage.triggersByID["moveRight"], false);
    this.setHidden(
      hiversaires.stage.triggersByID["moveForward"],
      !this.userAction
    );

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

    this.userActionStorage[this.userActionId] = (
      parseInt(this.userActionStorage[this.userActionId]) + 1
    ).toString();

    // Exceptions

    if (this.userAction == "act1") {
      this.userActionStorage[this.userActionId] =
        parseInt(this.userActionStorage[this.userActionId]) > 2
          ? "0"
          : this.userActionStorage[this.userActionId];
      hiversaires.music.playEffect("action_EnergyActive");
      this.templateClockUpdate();
    }
    if (this.userAction == "act5") {
      this.userActionStorage[this.userActionId] =
        parseInt(this.userActionStorage[this.userActionId]) > 1 ? "0" : "2";
      hiversaires.music.playEffect("action_EnergyActive");
      this.templateUpdateStudioTerminal();
    }

    if (puzzlesByID[this.userActionId] == "audioTerminal") {
      this.userActionStorage[this.userActionId] =
        parseInt(this.userActionStorage[this.userActionId]) > 1 ? "0" : "1";
      this.templateAudioUpdate();
    }

    if (puzzlesByID[this.userActionId] == "killTerminal") {
      this.templateKillUpdate();
    }
  }

  action2() {
    // Door to display action3

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);

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
    } else if (
      this.userNodeId == 20 &&
      parseInt(this.userActionStorage[37]) > 0
    ) {
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
      this.userActionStorage[5] == "2" &&
      this.userActionStorage[31] == "1"
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

    if (this.userActionStorage[this.userActionId] == "1") {
      this.userActionStorage[this.userActionId] = "0";
      this.userEnergy += 1;
    } else if (this.userEnergy > 0) {
      this.userActionStorage[this.userActionId] = "1";
      this.userEnergy -= 1;
    } else {
      this.templateEnergyAlert();
    }

    this.templateEnergyUpdate();
  }

  action5() {
    // Seal Action

    if (
      this.userActionStorage[this.userActionId] == "1" ||
      this.sealCount() > 0
    ) {
      if (this.userActionStorage[this.userActionId] != "1") {
        hiversaires.music.playEffect("action_SealActive");
        this.userActionStorage[this.userActionId] = "1";
      } else {
        hiversaires.music.playEffect("action_SealInactive");
        this.userActionStorage[this.userActionId] = "0";
      }
    } else {
      hiversaires.music.playEffect("action_EnergyStack");
      this.templateSealAlert();
      console.log("No more seal slots.");
    }

    this.templateSealUpdate();
  }

  actionReset() {
    this.setAlpha(hiversaires.stage.billboardsByID["menu1"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["menu2"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["menu3"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["menu4"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["menu5"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["menu6"], 0);

    this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["clockFace"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["clockShadow"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["ententeScreen"], 0);

    this.setCurrentAction(null);
  }

  actionTemplate() {
    this.actionReset();

    if (puzzlesByID[this.userActionId] == "clockTerminal") {
      this.templateClockTerminal();
    }
    if (puzzlesByID[this.userActionId] == "sealTerminal") {
      this.templateSealTerminal();
    }
    if (puzzlesByID[this.userActionId] == "energyTerminal") {
      this.templateEnergyTerminal();
    }
    if (puzzlesByID[this.userActionId] == "sealDoor") {
      this.templateSealDoor();
    }
    if (puzzlesByID[this.userActionId] == "energyDoor") {
      this.templateEnergyDoor();
    }
    if (puzzlesByID[this.userActionId] == "clockDoor") {
      this.templateClockDoor();
    }
    if (puzzlesByID[this.userActionId] == "progressTerminal") {
      this.templateProgressTerminal();
    }
    if (puzzlesByID[this.userActionId] == "audioTerminal") {
      this.templateAudioTerminal();
    }
    if (puzzlesByID[this.userActionId] == "killTerminal") {
      this.templateKillTerminal();
    }
    if (puzzlesByID[this.userActionId] == "endgameDoor") {
      this.templateEndgameDoor();
    }
    if (puzzlesByID[this.userActionId] == "endgameCredit") {
      this.templateEndgameCredit();
    }
    if (puzzlesByID[this.userActionId] == "timeDoor") {
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

    let now = Date.now();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    if (
      (parseInt(currentHours) == 15 && parseInt(currentMinutes) == 7) ||
      this.userNodeId == 143
    ) {
      this.userActionStorage[54] = "1";
      this.templateUpdateDoorknob(
        142,
        143,
        hiversaires.stage.triggersByID["action2"]
      );
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
      hiversaires.stage.billboardsByID["interfaceDimclock"],
      "interface/clock." + parseInt(this.userActionStorage[1]) + ".svg"
    );
    this.setHidden(
      hiversaires.stage.billboardsByID["interfaceDimclock"],
      false
    );
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceDimclock"], 1);
    this.fadeOut(hiversaires.stage.billboardsByID["interfaceDimclock"], 3, 0.5);
  }

  templateClockDoor() {
    this.prefPositioning();
    this.templateVignette();

    // Display Interactions

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], true);

    this.templateClockInterface();

    // Audio

    hiversaires.music.playEffect("action_DoorInit");

    // Templates

    this.puzzleState = 0;

    if (this.userAction == "act7") {
      if (
        parseInt(this.userActionStorage[1]) == 1 ||
        parseInt(this.userActionStorage[1]) == 2
      ) {
        this.puzzleState = 1;
      }
    }

    if (this.userAction == "act8") {
      if (
        parseInt(this.userActionStorage[1]) == 1 ||
        parseInt(this.userActionStorage[1]) == 0
      ) {
        this.puzzleState = 1;
      }
    }

    if (this.userAction == "act9") {
      if (
        parseInt(this.userActionStorage[1]) == 2 ||
        parseInt(this.userActionStorage[1]) == 0
      ) {
        this.puzzleState = 1;
      }
    }

    if (this.puzzleState == 1) {
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
      hiversaires.stage.billboardsByID["clockShadow"],
      "interface/dimclock.shadow.svg"
    );

    this.setImage(
      hiversaires.stage.billboardsByID["clockFace"],
      "interface/dimclock.state" + this.userActionStorage[1] + ".svg"
    );

    this.fadeIn(hiversaires.stage.billboardsByID["clockShadow"], 0.5, 1.5);
    this.fadeIn(hiversaires.stage.billboardsByID["clockFace"], 0.5, 0.5);
  }

  templateClockAlert() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceDimclockAlert"],
      "interface/alert.svg"
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceDimclockAlert"],
      1.0
    );
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceDimclockAlert"],
      0.5,
      0.5
    );
  }

  templateSealTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 0);

    this.setCurrentAction("action5");

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate();
  }

  templateSealInterface() {
    this.userSeal = this.sealCount();

    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSeal1"],
      "interface/seal.0.svg"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSeal2"],
      "interface/seal.0.svg"
    );

    if (this.userSeal == 1) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal1"],
        "interface/seal." + this.sealFind(1) + ".svg"
      );
    } else if (this.userSeal == 0) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal1"],
        "interface/seal." + this.sealFind(1) + ".svg"
      );
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal2"],
        "interface/seal." + this.sealFind(2) + ".svg"
      );
    }

    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal1"], false);
    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal2"], false);

    this.setAlpha(hiversaires.stage.billboardsByID["interfaceSeal1"], 1);
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceSeal2"], 1);

    this.fadeOut(hiversaires.stage.billboardsByID["interfaceSeal1"], 3, 0.5);
    this.fadeOut(hiversaires.stage.billboardsByID["interfaceSeal2"], 3, 0.5);
  }

  templateSealDoor() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], true);

    hiversaires.music.playEffect("action_DoorInit");
    this.templateSealInterface();

    if (
      parseInt(this.userActionStorage[4]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 1 : Forest + Rainre in Stones
      if (this.userNodeId == 46 || this.userNodeId == 85) {
        this.templateUpdateDoorknob(
          46,
          85,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        this.userChapter = Chapter.act2;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[20]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      if (this.userNodeId == 11 || this.userNodeId == 48) {
        this.templateUpdateDoorknob(
          48,
          11,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(11, "0487", "act25");
        this.templateUpdateNode(48, "0488", "act25");
        this.userChapter = Chapter.act3;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[21]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      if (this.userNodeId == 46 || this.userNodeId == 85) {
        this.templateUpdateDoorknob(
          46,
          85,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        this.userChapter = Chapter.act4;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[21]) == 1 &&
      parseInt(this.userActionStorage[12]) == 1
    ) {
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

    this.fadeOut(hiversaires.stage.billboardsByID["overlay"], 0, 0.5);

    if (parseInt(this.userActionStorage[this.userActionId]) != 1) {
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
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSealAlert"],
      "interface/alert.svg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceSealAlert"], 1.0);
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceSealAlert"],
      0.5,
      0.5
    );
  }

  templateEnergyTerminal() {
    this.prefPositioning();
    this.templateVignette();
    this.templateEnergyInterface();

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);

    this.setCurrentAction("action2");

    this.isFuseAction = true;

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyInterface() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceFuse1"],
      "interface/fuse." + this.userEnergy + ".svg"
    );

    this.setHidden(hiversaires.stage.billboardsByID["interfaceFuse1"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceFuse1"], 1);

    this.fadeOut(hiversaires.stage.billboardsByID["interfaceFuse1"], 3, 0.5);
  }

  templateEnergyDoor() {
    this.prefPositioning();
    this.templateVignette();

    // Display Interactions

    this.setHidden(hiversaires.stage.billboardsByID["overlay"], true);

    // Audio

    hiversaires.music.playEffect("action_DoorInit");
    this.templateEnergyInterface();

    // Templates

    if (this.userAction == "act3") {
      this.puzzleTerminal = 2;
    }
    if (this.userAction == "act6") {
      this.puzzleTerminal = 37;
    }

    if (this.userAction == "act11") {
      this.puzzleTerminal = 10;
    }
    if (this.userAction == "act19") {
      this.puzzleTerminal = 18;
    }
    if (this.userAction == "act26") {
      this.puzzleTerminal = 27;
    }

    if (this.userAction == "act28") {
      this.puzzleTerminal = 5;
    }
    if (this.userAction == "act30") {
      this.puzzleTerminal = 5;
    }
    if (this.userAction == "act33") {
      this.puzzleTerminal = 47;
    } // Antech fuse for Capsule door

    if (parseInt(this.userActionStorage[this.puzzleTerminal]) > 0) {
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

      if (
        this.userActionStorage[5] == "2" &&
        this.userActionStorage[31] == "1"
      ) {
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

    if (parseInt(this.userActionStorage[this.userActionId]) == 1) {
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
      this.userActionStorage[37] = "1";
    }
  }

  templateEnergyAlert() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceFuseAlert"],
      "interface/alert.svg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceFuseAlert"], 1.0);
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceFuseAlert"],
      0.5,
      1.5
    );
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

    if (this.userActionStorage[this.userActionId] == "1") {
      this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
      this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1.0);
      this.templateUpdateNode(21, "0543", "act35");
      this.templateUpdateNode(43, "0544", "act35");
      hiversaires.music.volume = 1;
    } else {
      this.setHidden(hiversaires.stage.billboardsByID["overlay"], true);
      this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 0);
      hiversaires.music.volume = 0;
    }
  }

  templateAudioInterface() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceAudio"],
      "interface/music." +
        (this.userActionStorage[35] == "1" ? "on" : "off") +
        ".svg"
    );

    this.setHidden(hiversaires.stage.billboardsByID["interfaceAudio"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceAudio"], 1);

    this.fadeOut(hiversaires.stage.billboardsByID["interfaceAudio"], 3, 0.5);
  }

  templateEntenteTerminal1() {
    this.prefPositioning();

    let targetGraphic = "";

    if (parseInt(this.userActionStorage[23]) > 17) {
      targetGraphic = "Left";
    } else if (parseInt(this.userActionStorage[23]) < 17) {
      targetGraphic = "Right";
    } else if (parseInt(this.userActionStorage[23]) == 17) {
      targetGraphic = "Right";
    }

    this.setImage(
      hiversaires.stage.billboardsByID["ententeScreen"],
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(hiversaires.stage.billboardsByID["ententeScreen"], 0, 1);
  }

  templateEntenteTerminal2() {
    this.prefPositioning();

    let targetGraphic = "";

    if (parseInt(this.userActionStorage[24]) > 17) {
      targetGraphic = "Left2";
    } else if (parseInt(this.userActionStorage[24]) < 17) {
      targetGraphic = "Right2";
    } else if (parseInt(this.userActionStorage[24]) == 17) {
      targetGraphic = "Straight";
    }

    this.setImage(
      hiversaires.stage.billboardsByID["ententeScreen"],
      "interface/entente" + targetGraphic + ".svg"
    );
    this.fadeIn(hiversaires.stage.billboardsByID["ententeScreen"], 0, 1);
  }

  templateEntentePart1Incr() {
    if (this.userActionStorage[23] == "17") {
      this.userNodeId = 93;
      this.userAction = null;
      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNodeId = 89;
      this.userAction = null;

      if (parseInt(this.userActionStorage[23]) < 21) {
        this.userActionStorage[23] = parseInt(
          this.userActionStorage[23] + 3
        ).toString();
      }

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateEntentePart1Decr() {
    this.userNodeId = 103;
    this.userAction = null;

    if (parseInt(this.userActionStorage[23]) > 14) {
      this.userActionStorage[23] = parseInt(
        this.userActionStorage[23] - 1
      ).toString();
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Incr() {
    this.userNodeId = 94;
    this.userOrientation = 2;
    this.userAction = null;

    if (parseInt(this.userActionStorage[24]) < 23) {
      this.userActionStorage[24] = parseInt(
        this.userActionStorage[24] + 4
      ).toString();
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Decr() {
    this.userNodeId = 95;
    this.userOrientation = 2;
    this.userAction = null;

    if (parseInt(this.userActionStorage[24]) > 14) {
      this.userActionStorage[24] = parseInt(
        this.userActionStorage[24] - 1
      ).toString();
    }

    this.actionCheck();
    this.moveCheck();
    this.actionReset();
  }

  templateEntentePart2Exit() {
    if (
      parseInt(this.userActionStorage[23]) == 17 &&
      parseInt(this.userActionStorage[24]) == 17
    ) {
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
    if (parseInt(this.userActionStorage[14]) > 50) {
      this.wipePlayerProgress();
      this.newGame();
    }
  }

  templateEndgameDoor() {
    this.prefPositioning();

    if (
      parseInt(this.userActionStorage[47]) == 1 &&
      parseInt(this.userActionStorage[36]) == 1
    ) {
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

    this.setHidden(hiversaires.stage.triggersByID["moveForward"], true);
    this.setHidden(hiversaires.stage.triggersByID["moveLeft"], true);
    this.setHidden(hiversaires.stage.triggersByID["moveRight"], true);

    this.setHidden(hiversaires.stage.triggersByID["actionCredit"], false);

    this.setImage(
      hiversaires.stage.billboardsByID["menu1"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu1"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu1"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["menu1"], 1.0, 3);

    this.setImage(
      hiversaires.stage.billboardsByID["menu2"],
      "menu/menu.credit1.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu2"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu2"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["menu2"], 6.0, 1);

    this.setImage(
      hiversaires.stage.billboardsByID["menu3"],
      "menu/menu.credit2.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu3"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu3"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["menu3"], 10.0, 1);

    this.setImage(
      hiversaires.stage.billboardsByID["menu4"],
      "menu/menu.credit3.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu4"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu4"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["menu4"], 16.0, 1);

    this.setImage(
      hiversaires.stage.billboardsByID["menu5"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu5"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu5"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["menu5"], 20.0, 1);

    if (this.userEnergy == 1) {
      this.setImage(
        hiversaires.stage.billboardsByID["menu6"],
        "menu/menu.credit4.png"
      );
      this.setAlpha(hiversaires.stage.billboardsByID["menu6"], 0.0);
      this.setHidden(hiversaires.stage.billboardsByID["menu6"], false);

      this.fadeIn(hiversaires.stage.billboardsByID["menu6"], 24.0, 1);
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
    this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["overlay"], true);

    if (parseInt(this.userActionStorage[5]) == 2) {
      this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1.0);
      this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
      this.templateUpdateNode(19, "0489", "act5");

      this.userChapter = Chapter.act5;
      this.updateMusic();
    } else {
      if (
        this.userActionStorage[12] == "1" &&
        this.userActionStorage[21] == "1"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
        this.templateUpdateNode(19, "0536", "act5");
      } else if (
        this.userActionStorage[12] == "1" &&
        this.userActionStorage[21] == "0"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
        this.templateUpdateNode(19, "0542", "act5");
      } else if (
        this.userActionStorage[12] == "0" &&
        this.userActionStorage[21] == "1"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);
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
      this.setImage(
        hiversaires.stage.billboardsByID["overlay"],
        "node/node." + img + ".jpg"
      );
    }

    // Fadeins

    if (puzzlesByID[this.userActionId] == "sealTerminal") {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0.2, 0.1);
    } else if (puzzlesByID[this.userActionId] == "audioTerminal") {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0.3, 0.5);
    } else if (puzzlesByID[this.userActionId] == "sealDoor") {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0.0, 1.0);
    } else if (puzzlesByID[this.userActionId] == "progressTerminal") {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0.3, 0.5);
    } else if (this.userActionId == 28) {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0.5, 1);
    } else {
      this.fadeIn(hiversaires.stage.billboardsByID["overlay"], 0, 0.0);
    }
  }

  templateVignette() {
    this.prefPositioning();

    this.setImage(
      hiversaires.stage.billboardsByID["vignette"],
      "interface/vignette.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["vignette"], 1.0);
    this.fadeOut(hiversaires.stage.billboardsByID["vignette"], 0, 1.0);
  }

  templateSaveInterface() {
    this.prefPositioning();

    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSave"],
      "interface/save.svg"
    );
    this.setHidden(hiversaires.stage.billboardsByID["interfaceSave"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceSave"], 1);
    this.fadeOut(hiversaires.stage.billboardsByID["interfaceSave"], 3, 0.5);
  }

  illusionCheck() {
    this.prefPositioning();

    let nodeIllusion = 0;
    let nodeIllusionAction;

    if (Math.random() * 10 > 7) {
      if (this.userNodeId == 15 && this.userOrientation == 0) {
        nodeIllusion = 554;
        nodeIllusionAction = 17;
      } // studio
      if (this.userNodeId == 43 && this.userOrientation == 2) {
        nodeIllusion = 555;
        nodeIllusionAction = 22;
      } // stones
      if (this.userNodeId == 73 && this.userOrientation == 2) {
        nodeIllusion = 556;
        nodeIllusionAction = 29;
      } // metamo
      if (this.userNodeId == 58 && this.userOrientation == 1) {
        nodeIllusion = 557;
        nodeIllusionAction = 32;
      } // antech
      if (this.userNodeId == 114 && this.userOrientation == 2) {
        nodeIllusion = 558;
        nodeIllusionAction = 48;
      } // natani
      if (this.userNodeId == 91 && this.userOrientation == 0) {
        nodeIllusion = 559;
        nodeIllusionAction = 49;
      } // entent
      if (this.userNodeId == 88 && this.userOrientation == 3) {
        nodeIllusion = 560;
        nodeIllusionAction = 50;
      } // capsul
      if (this.userNodeId == 33 && this.userOrientation == 2) {
        nodeIllusion = 561;
        nodeIllusionAction = 51;
      } // circle
      if (this.userNodeId == 9 && this.userOrientation == 1) {
        nodeIllusion = 562;
        nodeIllusionAction = 52;
      } // forest
    }

    if (nodeIllusion > 0 && this.userChapter == Chapter.act5) {
      this.setImage(
        hiversaires.stage.billboardsByID["overlay"],
        "node/node.0" + nodeIllusion + ".jpg"
      );
      this.setAlpha(hiversaires.stage.billboardsByID["overlay"], 1);
      this.setHidden(hiversaires.stage.billboardsByID["overlay"], false);

      this.fadeOut(hiversaires.stage.billboardsByID["overlay"], 1, 0.5);

      this.userActionStorage[nodeIllusionAction] = "1";

      this.illusionInterface();
    }
  }

  illusionInterface() {
    this.prefPositioning();

    let illusionCount = 0;

    illusionCount += parseInt(this.userActionStorage[17]);
    illusionCount += parseInt(this.userActionStorage[22]);
    illusionCount += parseInt(this.userActionStorage[29]);
    illusionCount += parseInt(this.userActionStorage[32]);
    illusionCount += parseInt(this.userActionStorage[48]);
    illusionCount += parseInt(this.userActionStorage[49]);
    illusionCount += parseInt(this.userActionStorage[50]);
    illusionCount += parseInt(this.userActionStorage[51]);
    illusionCount += parseInt(this.userActionStorage[52]);

    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIllusion"],
      "interface/illusion." + illusionCount + ".svg"
    );
    this.setHidden(
      hiversaires.stage.billboardsByID["interfaceIllusion"],
      false
    );
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceIllusion"], 1);
    this.fadeOut(hiversaires.stage.billboardsByID["interfaceIllusion"], 3, 0.5);
  }

  // ====================
  // Counters
  // ====================

  sealCount() {
    let count = 0;
    count += parseInt(this.userActionStorage[4]);
    count += parseInt(this.userActionStorage[12]);
    count += parseInt(this.userActionStorage[13]);
    count += parseInt(this.userActionStorage[20]);
    count += parseInt(this.userActionStorage[21]);
    count = 2 - count;

    return count;
  }

  sealFind(rank) {
    let sealFound = 0;

    if (parseInt(this.userActionStorage[4]) > 0) {
      sealFound = 4;
    } else if (parseInt(this.userActionStorage[12]) > 0) {
      sealFound = 12;
    } else if (parseInt(this.userActionStorage[13]) > 0) {
      sealFound = 13;
    } else if (parseInt(this.userActionStorage[20]) > 0) {
      sealFound = 20;
    } else if (parseInt(this.userActionStorage[21]) > 0) {
      sealFound = 21;
    }

    if (rank == 2) {
      if (parseInt(this.userActionStorage[4]) > 0 && sealFound != 4) {
        sealFound = 4;
      } else if (parseInt(this.userActionStorage[12]) > 0 && sealFound != 12) {
        sealFound = 12;
      } else if (parseInt(this.userActionStorage[13]) > 0 && sealFound != 13) {
        sealFound = 13;
      } else if (parseInt(this.userActionStorage[20]) > 0 && sealFound != 20) {
        sealFound = 20;
      } else if (parseInt(this.userActionStorage[21]) > 0 && sealFound != 21) {
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
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      1
    );

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      0,
      0.5
    );
  }

  animateTurnRight() {
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      1
    );

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      0,
      0.5
    );
  }

  animateStepForward() {
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      1
    );

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      0,
      0.5
    );
  }

  animateStepBackward() {
    hiversaires.music.playEffect("footstep_turn");
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      1
    );

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      0,
      0.5
    );
  }

  // ====================
  // Audio
  // ====================

  playFootStep() {
    this.userFootstep += 1;
    if (
      this.forwardSubject.indexOf("|") != -1 ||
      parseInt(this.forwardSubject) > 0
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
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      "interface/interfaceMove.indicator.svg"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      "interface/interfaceMove.indicator.svg"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      "interface/interfaceMove.indicator.svg"
    );
  }

  prefPositioning() {
    // Core

    // Movement

    this.setHidden(hiversaires.stage.triggersByID["actionCredit"], true);

    // Graphics

    // Style - Interface - Fuse

    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      0
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      0
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      0
    );
  }

  menuHome() {
    this.setImage(
      hiversaires.stage.billboardsByID["menu2"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu2"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu2"], false);

    this.setImage(
      hiversaires.stage.billboardsByID["menu3"],
      "menu/menu.logo.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu3"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu3"], false);

    this.setImage(
      hiversaires.stage.billboardsByID["menu4"],
      "menu/menu.controls.svg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["menu4"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["menu4"], false);

    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal1"], true);
    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal2"], true);
    this.setHidden(hiversaires.stage.billboardsByID["interfaceFuse1"], true);

    this.fadeOut(hiversaires.stage.billboardsByID["menu2"], 0, 2.0);
    this.fadeOut(hiversaires.stage.billboardsByID["menu3"], 3, 2.0);
    this.fadeOut(hiversaires.stage.billboardsByID["menu4"], 8, 1.0);

    hiversaires.music.volume = 1; // Music
  }

  prefSave() {
    this.prefPositioning();
    console.log("- [progress:saving..]");

    let saveObject = {
      userSettings: {
        userNode: this.userNodeId,
        userOrientation: this.userOrientation,
        userChapter: this.userChapter,
        userEnergy: this.userEnergy
      },
      userActionStorage: this.userActionStorage
    };

    if (!DEBUG_DONT_SAVE) {
      localStorage.save = JSON.stringify(saveObject);
    }

    console.log("- [progress:saved.]");

    this.templateSaveInterface();
  }

  prefLoad() {
    // Load Game

    let saveObject = null;
    try {
      saveObject = JSON.parse(localStorage.save);
    } catch (error) {}

    if (saveObject != null) {
      console.log("- [progress:loading..]");

      // Settings
      let userSettings = saveObject.userSettings;
      this.userNodeId = userSettings.userNode;
      this.userOrientation = userSettings.userOrientation;
      this.userChapter = userSettings.userChapter;
      this.userEnergy = userSettings.userEnergy;

      this.updateMusic();

      // Storage
      this.userActionStorage = saveObject.userActionStorage;
    } else {
      // New Game

      console.log("- [progress:creating..]");

      this.userActionStorage = [];
      for (let i = 0; i < 102; i++) {
        this.userActionStorage[i] = "0";
      }

      this.userActionStorage[1] = "0"; // Dimclock Position
      this.userActionStorage[2] = "0";
      this.userActionStorage[5] = "0";
      this.userActionStorage[23] = "0";
      this.userActionStorage[24] = "0";

      this.userActionStorage[31] = "1"; // Fuse in Forest
      this.userActionStorage[38] = "1"; // Fuse in Entente
      this.userActionStorage[39] = "1"; // Fuse in Antechannel

      this.userActionStorage[34] = "1"; // Audio 1
      this.userActionStorage[35] = "1"; // Audio 2

      this.userActionStorage[23] = "15"; // Entente 1
      this.userActionStorage[19] = "13"; // Entente 2

      this.userActionStorage[101] = null;

      // Default Location

      this.userNodeId = 1;
      this.userOrientation = 0;
      this.userChapter = Chapter.act1;
      this.userEnergy = 0;

      this.updateMusic();

      console.log("- [progress:created.]");
    }
  }

  wipePlayerProgress() {
    localStorage.clear();
  }

  actionCredit() {
    // TODO: link to 100r.co
  }
}
