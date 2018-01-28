class Dozenal {
  constructor() {
    // Puzzle
    this.puzzleTerminal = 0;
    this.puzzleState;

    // User Storage

    this.userActionStorage;
    this.userSettings;
    this.userNode = 1;
    this.userOrientation = 0;
    this.userProgress = 1;
    this.userEnergy = 0;

    // User Temp

    this.userAction;
    this.userAmbient;
    this.userSeal = 0;
    this.userActionId;
    this.userFootstep = 0;

    // Misc

    this.currentAction = null;
    this.screenWidth = 0;
    this.screenHeight = 0;
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

    // this.userNode = 88;

    this.actionCheck();
    this.moveCheck();
    this.menuHome();
  }

  get forwardSubject() {
    return hiversaires.world.nodesByID[this.userNode][this.userOrientation];
  }

  getScreenBounds() {
    return { x: 0, y: 0, width: 9, height: 16 };
  }

  setBounds(subject, x, y, width, height) {
    $(subject).css({
      left: x * 100 / 9 + "%",
      top: y * 100 / 16 + "%",
      width: width * 100 / 9 + "%",
      height: height * 100 / 16 + "%"
    });
  }

  setImage(subject, url) {
    if (url) {
      hiversaires.artBook.setArt(subject, "media/graphics/" + url);
    } else {
      hiversaires.artBook.removeArt(subject);
    }
  }

  _updateInteractive(subject) {
    let value =
      $(subject).css("opacity") != 0 && $(subject).css("display") != "none";
    $(subject).css({ "pointer-events": value ? "inherit" : "none" });
  }

  setAlpha(subject, value) {
    $(subject).css({ opacity: value });
    this._updateInteractive(subject);
  }

  setHidden(subject, value) {
    $(subject).css({ display: value ? "none" : "block" });
    this._updateInteractive(subject);
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
        (this.userNode * 4 + this.userOrientation).toString().padStart(4, "0") +
        ".jpg"
    );

    this.illusionCheck();

    // Trigger Action

    if (this.forwardSubject.indexOf("act") != -1) {
      this.userAction = this.forwardSubject;
      this.userActionId = parseInt(this.userAction.replace(/act/g, ""));
      this.actionCheck();
    }

    this.audioAmbientCheck(hiversaires.world.nodesByID[this.userNode][4]);
  }

  moveLeft() {
    hiversaires.music.playEffect("footstep_turn");

    this.userOrientation =
      this.userOrientation == 0 ? 3 : this.userOrientation - 1;

    this.turnLeft();
    this.moveCheck();
  }

  moveRight() {
    hiversaires.music.playEffect("footstep_turn");

    this.userOrientation =
      this.userOrientation < 3 ? this.userOrientation + 1 : 0;

    this.turnRight();
    this.moveCheck();
  }

  moveForward() {
    this.playFootStep();

    if (this.forwardSubject.indexOf("|") == -1) {
      this.userNode =
        parseInt(this.forwardSubject) > 0
          ? parseInt(this.forwardSubject)
          : this.userNode;
    } else {
      let temp = this.forwardSubject.split("|");
      this.userNode = parseInt(temp[0]) > 0 ? parseInt(temp[0]) : this.userNode;
      this.userOrientation = parseInt(temp[1]);
    }

    this.turnForward();
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

    this.currentAction = null;
    this.setHidden(hiversaires.stage.triggersByID["action1"], true);
    this.setHidden(hiversaires.stage.triggersByID["action2"], true);
    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.triggersByID["action4"], true);
    this.setHidden(hiversaires.stage.triggersByID["action5"], true);

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

    if (hiversaires.world.puzzlesByID[this.userActionId] == "audioTerminal") {
      this.userActionStorage[this.userActionId] =
        parseInt(this.userActionStorage[this.userActionId]) > 1 ? "0" : "1";
      this.templateAudioUpdate();
    }

    if (hiversaires.world.puzzlesByID[this.userActionId] == "killTerminal") {
      this.templateKillUpdate();
    }
  }

  action2() {
    // Door to display action3

    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
    this.setHidden(hiversaires.stage.triggersByID["action2"], true);
    this.setHidden(hiversaires.stage.triggersByID["action3"], false);
    this.currentAction = "action3";
    this.templateEnergyUpdate();
  }

  action3() {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (this.userNode == 1) {
      this.userNode = 103;
    } else if (this.userNode == 11) {
      this.userNode = 48;
      this.userOrientation = 2;
    } else if (this.userNode == 13) {
      this.userNode = 12;
    } else if (this.userNode == 12) {
      this.userNode = 13;
    } else if (this.userNode == 16) {
      this.userNode = 22;
    } else if (
      this.userNode == 20 &&
      parseInt(this.userActionStorage[37]) > 0
    ) {
      this.userNode = 116;
      this.userOrientation = 1;
    } else if (this.userNode == 23) {
      // Fold Gate
      this.userNode = 22;
    } else if (this.userNode == 25) {
      this.userNode = 31;
      this.userOrientation = 2;
    } else if (this.userNode == 27) {
      this.userNode = 32;
      this.userOrientation = 1;
    } else if (this.userNode == 35) {
      this.userNode = 31;
      this.userOrientation = 0;
    } else if (
      this.userNode == 39 &&
      this.userActionStorage[5] == "2" &&
      this.userActionStorage[31] == "1"
    ) {
      this.userNode = 34;
    } else if (this.userNode == 39) {
      this.userNode = 45;
    } else if (this.userNode == 45) {
      this.userNode = 51;
    } else if (this.userNode == 46) {
      this.userNode = 85;
      this.userOrientation = 2;
    } else if (this.userNode == 48) {
      this.userNode = 11;
      this.userOrientation = 2;
    } else if (this.userNode == 51) {
      this.userNode = 45;
    } else if (this.userNode == 52) {
      this.userNode = 32;
      this.userOrientation = 3;
    } else if (this.userNode == 61) {
      this.userNode = 72;
    } else if (this.userNode == 62) {
      this.userNode = 77;
    } else if (this.userNode == 69) {
      this.userNode = 72;
    } else if (this.userNode == 76) {
      this.userNode = 87;
    } else if (this.userNode == 77) {
      this.userNode = 62;
    } else if (this.userNode == 79) {
      this.userNode = 112;
    } else if (this.userNode == 85) {
      this.userNode = 46;
      this.userOrientation = 0;
    } else if (this.userNode == 87) {
      this.userNode = 76;
    } else if (this.userNode == 112) {
      this.userNode = 79;
    } else if (this.userNode == 113) {
      this.userNode = 50;
    } else if (this.userNode == 142) {
      this.userNode = 143;
      this.userOrientation = 3;
    } else if (this.userNode == 143) {
      this.userNode = 142;
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
      this.templateEnergyWarning();
    }

    this.templateEnergyUpdate();
  }

  action5() {
    // Seal Action

    if (
      this.userActionStorage[this.userActionId] == "1" ||
      this.sealCount() > 0
    ) {
      if (!this.userActionStorage[this.userActionId] == "1") {
        hiversaires.music.playEffect("action_SealActive");
        this.userActionStorage[this.userActionId] = "1";
      } else {
        hiversaires.music.playEffect("action_SealInactive");
        this.userActionStorage[this.userActionId] = "0";
      }
    } else {
      hiversaires.music.playEffect("action_EnergyStack");
      this.templateSealWarning();
      console.log("No more seal slots.");
    }

    this.templateSealUpdate();
  }

  actionReset() {
    this.setImage(hiversaires.stage.triggersByID["action1"], null);
    this.setImage(hiversaires.stage.triggersByID["action2"], null);
    this.setImage(hiversaires.stage.triggersByID["action3"], null);
    this.setImage(hiversaires.stage.triggersByID["action4"], null);
    this.setImage(hiversaires.stage.triggersByID["action5"], null);

    this.setBounds(hiversaires.stage.triggersByID["action1"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.triggersByID["action2"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.triggersByID["action3"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.triggersByID["action4"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.triggersByID["action5"], 0, 0, 0, 0);

    this.setBounds(hiversaires.stage.billboardsByID["graphic1"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic2"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic3"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic4"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic5"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic6"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic7"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic8"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic9"], 0, 0, 0, 0);
    this.setBounds(hiversaires.stage.billboardsByID["graphic10"], 0, 0, 0, 0);

    this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic2"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic3"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic4"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic5"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic6"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic7"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic8"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic9"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic10"], 0);

    this.currentAction = null;
    this.setHidden(hiversaires.stage.triggersByID["action1"], true);
    this.setHidden(hiversaires.stage.triggersByID["action2"], true);
    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.triggersByID["action4"], true);
    this.setHidden(hiversaires.stage.triggersByID["action5"], true);
  }

  actionTemplate() {
    this.actionReset();

    if (hiversaires.world.puzzlesByID[this.userActionId] == "clockTerminal") {
      this.templateClockTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "sealTerminal") {
      this.templateSealTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "energyTerminal") {
      this.templateEnergyTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "sealDoor") {
      this.templateSealDoor();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "energyDoor") {
      this.templateEnergyDoor();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "clockDoor") {
      this.templateClockDoor();
    }
    if (
      hiversaires.world.puzzlesByID[this.userActionId] == "progressTerminal"
    ) {
      this.templateProgressTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "audioTerminal") {
      this.templateAudioTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "killTerminal") {
      this.templateKillTerminal();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "endgameDoor") {
      this.templateEndgameDoor();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "endgameCredit") {
      this.templateEndgameCredit();
    }
    if (hiversaires.world.puzzlesByID[this.userActionId] == "timeDoor") {
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
      this.userNode == 143
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

    this.setHidden(hiversaires.stage.triggersByID["action1"], false);
    this.currentAction = "action1";

    this.setAlpha(hiversaires.stage.billboardsByID["graphic5"], 0);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic4"], 0);

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate();
  }

  templateClockInterface() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceDimclock"],
      "clock/clock." + parseInt(this.userActionStorage[1]) + ".png"
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

    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], true);

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
      this.setHidden(hiversaires.stage.triggersByID["action2"], false);
      this.currentAction = "action2";

      this.templateUpdateNode(16, "0472", "act7");
      this.templateUpdateNode(23, "0473", "act7");
      this.templateUpdateNode(25, "0474", "act8");
      this.templateUpdateNode(35, "0475", "act8");
      this.templateUpdateNode(27, "0476", "act9");
      this.templateUpdateNode(52, "0477", "act9");
    } else {
      this.templateClockWarning();
    }
  }

  templateClockUpdate() {
    this.templateClockInterface();

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic4"],
      0,
      0,
      this.screenWidth,
      this.screenHeight
    ); // interface
    this.setImage(
      hiversaires.stage.billboardsByID["graphic4"],
      "interface/interface.dimclock.shadow.png"
    );

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic5"],
      0,
      0,
      this.screenWidth,
      this.screenHeight
    ); // interface
    this.setImage(
      hiversaires.stage.billboardsByID["graphic5"],
      "interface/interface.dimclock.state" + this.userActionStorage[1] + ".png"
    );

    this.fadeIn(hiversaires.stage.billboardsByID["graphic4"], 0.5, 1.5);
    this.fadeIn(hiversaires.stage.billboardsByID["graphic5"], 0.5, 0.5);
  }

  templateClockWarning() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceDimclockBackground"],
      "interface/interfaceFuse.warning.png"
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceDimclockBackground"],
      1.0
    );
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceDimclockBackground"],
      0.5,
      0.5
    );
  }

  templateSealTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 0);
    this.setHidden(hiversaires.stage.triggersByID["action5"], false);
    this.currentAction = "action5";

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate();
  }

  templateSealInterface() {
    this.userSeal = this.sealCount();

    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSeal1"],
      "seal/seal.0.png"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSeal2"],
      "seal/seal.0.png"
    );

    if (this.userSeal == 1) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal1"],
        "seal/seal." + this.sealFind(1) + ".png"
      );
    } else if (this.userSeal == 0) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal1"],
        "seal/seal." + this.sealFind(1) + ".png"
      );
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceSeal2"],
        "seal/seal." + this.sealFind(2) + ".png"
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

    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], true);

    hiversaires.music.playEffect("action_DoorInit");
    this.templateSealInterface();

    if (
      parseInt(this.userActionStorage[4]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 1 : Forest + Rainre in Stones
      if (this.userNode == 46 || this.userNode == 85) {
        this.templateUpdateDoorknob(
          46,
          85,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        if (this.userProgress < 2) {
          hiversaires.music.setRecord(Records.act2);
        }
        this.userProgress = 2;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[20]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      if (this.userNode == 11 || this.userNode == 48) {
        this.templateUpdateDoorknob(
          48,
          11,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(11, "0487", "act25");
        this.templateUpdateNode(48, "0488", "act25");
        if (this.userProgress < 3) {
          hiversaires.music.setRecord(Records.act3);
        }
        this.userProgress = 3;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[21]) == 1 &&
      parseInt(this.userActionStorage[13]) == 1
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      if (this.userNode == 46 || this.userNode == 85) {
        this.templateUpdateDoorknob(
          46,
          85,
          hiversaires.stage.triggersByID["action2"]
        );
        this.templateUpdateNode(46, "0486", "act15");
        this.templateUpdateNode(85, "0485", "act15");
        if (this.userProgress < 4) {
          hiversaires.music.setRecord(Records.act4);
        }
        this.userProgress = 4;
        this.prefSave();
      }
    } else if (
      parseInt(this.userActionStorage[21]) == 1 &&
      parseInt(this.userActionStorage[12]) == 1
    ) {
      // Act 4 : Antechannel + Stones in Studio
      if (this.userNode == 19) {
        this.setHidden(hiversaires.stage.triggersByID["action1"], false);
        this.currentAction = "action1";
        this.templateUpdateStudioTerminal();

        this.prefSave();
      }
    } else if (this.userAction == "act5" && this.userNode == 19) {
      // Studio Terminal
      this.templateUpdateStudioTerminal();
    } else {
      this.templateSealWarning();
    }
  }

  templateSealUpdate() {
    this.templateSealInterface();

    this.userSeal = this.sealCount();

    this.fadeOut(hiversaires.stage.billboardsByID["graphic1"], 0, 0.5);

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

  templateSealWarning() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceSealBackground"],
      "interface/interfaceFuse.warning.png"
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceSealBackground"],
      1.0
    );
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceSealBackground"],
      0.5,
      0.5
    );
  }

  templateEnergyTerminal() {
    this.prefPositioning();
    this.templateVignette();
    this.templateEnergyInterface();

    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
    this.setHidden(hiversaires.stage.triggersByID["action2"], false);
    this.currentAction = "action2";
    // this.setHidden(hiversaires.stage.triggersByID["action4"], false);
    this.isFuseAction = true;

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyInterface() {
    if (this.userEnergy == 3) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceFuse1"],
        "fuse/fuse.3.png"
      );
    } else if (this.userEnergy == 2) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceFuse1"],
        "fuse/fuse.2.png"
      );
    } else if (this.userEnergy == 1) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceFuse1"],
        "fuse/fuse.1.png"
      );
    } else if (this.userEnergy == 0) {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceFuse1"],
        "fuse/fuse.0.png"
      );
    }

    this.setHidden(hiversaires.stage.billboardsByID["interfaceFuse1"], false);
    this.setAlpha(hiversaires.stage.billboardsByID["interfaceFuse1"], 1);

    this.fadeOut(hiversaires.stage.billboardsByID["interfaceFuse1"], 3, 0.5);
  }

  templateEnergyDoor() {
    this.prefPositioning();
    this.templateVignette();

    // Display Interactions

    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], true);

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
      this.setHidden(hiversaires.stage.triggersByID["action2"], false);
      this.currentAction = "action2";

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
      // this.setAlpha(hiversaires.stage.triggersByID["action3"], 1.0); // !
    } else {
      this.templateEnergyWarning();
    }
  }

  templateEnergyUpdate() {
    this.templateEnergyInterface();

    if (this.isFuseAction) {
      this.setHidden(hiversaires.stage.triggersByID["action4"], false);
      this.currentAction = "action4";
      this.setHidden(hiversaires.stage.triggersByID["action3"], true);
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

  templateEnergyWarning() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceFuseBackground"],
      "interface/interfaceFuse.warning.png"
    );
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceFuseBackground"],
      1.0
    );
    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceFuseBackground"],
      0.5,
      1.5
    );
  }

  templateProgressTerminal() {
    this.prefPositioning();
    this.templateVignette();
    this.prefSave();

    if (this.userProgress == 1) {
      this.templateUpdateNode(23, "0545", "act16");
    }
    if (this.userProgress == 2) {
      this.templateUpdateNode(23, "0546", "act16");
    }
    if (this.userProgress == 3) {
      this.templateUpdateNode(23, "0547", "act16");
    }
    if (this.userProgress == 4) {
      this.templateUpdateNode(23, "0548", "act16");
    }
    if (this.userProgress == 5) {
      this.templateUpdateNode(23, "0549", "act16");
    }
  }

  templateAudioTerminal() {
    this.prefPositioning();
    this.templateVignette();

    this.setHidden(hiversaires.stage.triggersByID["action1"], false);
    this.currentAction = "action1";

    this.templateAudioUpdate();
  }

  templateAudioUpdate() {
    this.templateAudioInterface();

    if (this.userActionStorage[this.userActionId] == "1") {
      this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
      this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1.0);
      this.templateUpdateNode(21, "0543", "act35");
      this.templateUpdateNode(43, "0544", "act35");
      hiversaires.music.volume = 1;
    } else {
      this.setHidden(hiversaires.stage.billboardsByID["graphic1"], true);
      this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 0);
      hiversaires.music.volume = 0;
    }
  }

  templateAudioInterface() {
    if (this.userActionStorage[35] == "1") {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceAudio"],
        "interface/interfaceAudio.sfx1.png"
      );
    } else {
      this.setImage(
        hiversaires.stage.billboardsByID["interfaceAudio"],
        "interface/interfaceAudio.sfx0.png"
      );
    }

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
      hiversaires.stage.billboardsByID["graphic1"],
      "entente/entente" + targetGraphic + ".png"
    );
    this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0, 1);
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
      hiversaires.stage.billboardsByID["graphic1"],
      "entente/entente" + targetGraphic + ".png"
    );
    this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0, 1);
  }

  templateEntentePart1Incr() {
    if (this.userActionStorage[23] == "17") {
      this.userNode = 93;
      this.userAction = null;
      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNode = 89;
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
    this.userNode = 103;
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
    this.userNode = 94;
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
    this.userNode = 95;
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
      this.userNode = 107;
      this.userOrientation = 3;
      this.userAction = null;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    } else {
      this.userNode = 93;
      this.userAction = null;

      this.actionCheck();
      this.moveCheck();
      this.actionReset();
    }
  }

  templateKillTerminal() {
    this.prefPositioning();

    this.setHidden(hiversaires.stage.triggersByID["action1"], false);
    this.currentAction = "action1";
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
      this.setHidden(hiversaires.stage.triggersByID["action3"], false);
      this.currentAction = "action3";
    } else {
      this.templateEnergyWarning();
    }
  }

  templateEndgameCredit() {
    this.prefPositioning();

    hiversaires.music.setRecord(Records.credit);

    this.setHidden(hiversaires.stage.triggersByID["moveForward"], true);
    this.setHidden(hiversaires.stage.triggersByID["moveLeft"], true);
    this.setHidden(hiversaires.stage.triggersByID["moveRight"], true);
    this.setHidden(hiversaires.stage.triggersByID["action1"], true);
    this.setHidden(hiversaires.stage.triggersByID["action2"], true);
    this.setHidden(hiversaires.stage.triggersByID["action3"], true);
    this.setHidden(hiversaires.stage.triggersByID["action4"], true);
    this.setHidden(hiversaires.stage.triggersByID["actionCredit"], false);

    let screenBound = this.getScreenBounds();

    this.setImage(
      hiversaires.stage.billboardsByID["graphic1"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 1.0, 3);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic2"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic2"],
      "menu/menu.credit1.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic2"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic2"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["graphic2"], 6.0, 1);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic3"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic3"],
      "menu/menu.credit2.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic3"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic3"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["graphic3"], 10.0, 1);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic4"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic4"],
      "menu/menu.credit3.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic4"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic4"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["graphic4"], 16.0, 1);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic5"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic5"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic5"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic5"], false);

    this.fadeIn(hiversaires.stage.billboardsByID["graphic5"], 20.0, 1);

    if (this.userEnergy == 1) {
      this.setBounds(
        hiversaires.stage.billboardsByID["graphic6"],
        0,
        0,
        screenBound.width,
        screenBound.height
      );
      this.setImage(
        hiversaires.stage.billboardsByID["graphic6"],
        "menu/menu.credit4.png"
      );
      this.setAlpha(hiversaires.stage.billboardsByID["graphic6"], 0.0);
      this.setHidden(hiversaires.stage.billboardsByID["graphic6"], false);

      this.fadeIn(hiversaires.stage.billboardsByID["graphic6"], 24.0, 1);
    }
  }

  // ====================
  // Actions with interactions
  // ====================

  templateUpdateDoorknob(side1, side2, knob) {
    if (this.userNode == side1 || this.userNode == side2) {
      this.setHidden(knob, false);
      this.setAlpha(knob, 1.0);
    }
  }

  templateUpdateStudioTerminal() {
    this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 0.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic1"], true);

    if (parseInt(this.userActionStorage[5]) == 2) {
      this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1.0);
      this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
      this.templateUpdateNode(19, "0489", "act5");

      this.userProgress = 5;
      if (this.userProgress == 5) {
        hiversaires.music.setRecord(Records.act5);
      }
    } else {
      if (
        this.userActionStorage[12] == "1" &&
        this.userActionStorage[21] == "1"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
        this.templateUpdateNode(19, "0536", "act5");
      } else if (
        this.userActionStorage[12] == "1" &&
        this.userActionStorage[21] == "0"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
        this.templateUpdateNode(19, "0542", "act5");
      } else if (
        this.userActionStorage[12] == "0" &&
        this.userActionStorage[21] == "1"
      ) {
        this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1.0);
        this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);
        this.templateUpdateNode(19, "0541", "act5");
      }

      if (this.userProgress == 5) {
        this.userProgress = 4;
      }
    }
  }

  templateUpdateNode(node, img, act) {
    if (this.userNode == node && this.userAction == act) {
      this.setImage(
        hiversaires.stage.billboardsByID["graphic1"],
        "node/node." + img + ".jpg"
      );
    }

    // Fadeins

    if (hiversaires.world.puzzlesByID[this.userActionId] == "sealTerminal") {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0.2, 0.1);
    } else if (
      hiversaires.world.puzzlesByID[this.userActionId] == "audioTerminal"
    ) {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0.3, 0.5);
    } else if (hiversaires.world.puzzlesByID[this.userActionId] == "sealDoor") {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0.0, 1.0);
    } else if (
      hiversaires.world.puzzlesByID[this.userActionId] == "progressTerminal"
    ) {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0.3, 0.5);
    } else if (this.userActionId == 28) {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0.5, 1);
    } else {
      this.fadeIn(hiversaires.stage.billboardsByID["graphic1"], 0, 0.0);
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
      "save.png"
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
      if (this.userNode == 15 && this.userOrientation == 0) {
        nodeIllusion = 554;
        nodeIllusionAction = 17;
      } // studio
      if (this.userNode == 43 && this.userOrientation == 2) {
        nodeIllusion = 555;
        nodeIllusionAction = 22;
      } // stones
      if (this.userNode == 73 && this.userOrientation == 2) {
        nodeIllusion = 556;
        nodeIllusionAction = 29;
      } // metamo
      if (this.userNode == 58 && this.userOrientation == 1) {
        nodeIllusion = 557;
        nodeIllusionAction = 32;
      } // antech
      if (this.userNode == 114 && this.userOrientation == 2) {
        nodeIllusion = 558;
        nodeIllusionAction = 48;
      } // natani
      if (this.userNode == 91 && this.userOrientation == 0) {
        nodeIllusion = 559;
        nodeIllusionAction = 49;
      } // entent
      if (this.userNode == 88 && this.userOrientation == 3) {
        nodeIllusion = 560;
        nodeIllusionAction = 50;
      } // capsul
      if (this.userNode == 33 && this.userOrientation == 2) {
        nodeIllusion = 561;
        nodeIllusionAction = 51;
      } // circle
      if (this.userNode == 9 && this.userOrientation == 1) {
        nodeIllusion = 562;
        nodeIllusionAction = 52;
      } // forest
    }

    if (nodeIllusion > 0 && this.userProgress > 4) {
      this.setImage(
        hiversaires.stage.billboardsByID["graphic1"],
        "node/node.0" + nodeIllusion + ".jpg"
      );
      this.setAlpha(hiversaires.stage.billboardsByID["graphic1"], 1);
      this.setHidden(hiversaires.stage.billboardsByID["graphic1"], false);

      this.fadeOut(hiversaires.stage.billboardsByID["graphic1"], 1, 0.5);

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
      "illusion/illusion." + illusionCount + ".png"
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
    this.userSeal = 0;
    this.userSeal += parseInt(this.userActionStorage[4]);
    this.userSeal += parseInt(this.userActionStorage[12]);
    this.userSeal += parseInt(this.userActionStorage[13]);
    this.userSeal += parseInt(this.userActionStorage[20]);
    this.userSeal += parseInt(this.userActionStorage[21]);
    this.userSeal = 2 - this.userSeal;

    return this.userSeal;
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
      .transition({ opacity: 1 }, duration * 1000);
  }

  fadeOut(viewToFadeOut, delay, duration) {
    $(viewToFadeOut)
      .finish()
      .delay(delay * 1000)
      .transition({ opacity: 0 }, duration * 1000);
  }

  turnLeft() {
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      1
    );

    viewMain.transition({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      0,
      0.5
    );
  }

  turnRight() {
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      1
    );

    viewMain.transition({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      0,
      0.5
    );
  }

  turnForward() {
    let viewMain = $(hiversaires.stage.billboardsByID["viewMain"]);
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.setAlpha(viewMain, 0.5);
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.setAlpha(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      1
    );

    viewMain.transition({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

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

  audioAmbientCheck(nodeAmbient) {
    if (this.userAmbient != nodeAmbient) {
      this.userAmbient = nodeAmbient;

      if (nodeAmbient == "forest") {
        hiversaires.music.setAmbience(Ambience.forest);
      }
      if (nodeAmbient == "studio") {
        hiversaires.music.setAmbience(Ambience.studio);
      }
      if (nodeAmbient == "stones") {
        hiversaires.music.setAmbience(Ambience.stones);
      }
      if (nodeAmbient == "antechannel") {
        hiversaires.music.setAmbience(Ambience.antechannel);
      }
      if (nodeAmbient == "metamondst") {
        hiversaires.music.setAmbience(Ambience.metamondst);
      }
      if (nodeAmbient == "circular") {
        hiversaires.music.setAmbience(Ambience.circular);
      }
      if (nodeAmbient == "entente") {
        hiversaires.music.setAmbience(Ambience.circular);
      }
      if (nodeAmbient == "rainre") {
        hiversaires.music.setAmbience(Ambience.rainre);
      }
      if (nodeAmbient == "capsule") {
        hiversaires.music.setAmbience(Ambience.capsule);
      }
      if (nodeAmbient == "nataniev") {
        hiversaires.music.setAmbience(Ambience.nataniev);
      }
    }
  }

  // ====================
  // Preferences
  // ====================

  templateStart() {
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      "interface/interfaceMove.indicator.png"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      "interface/interfaceMove.indicator.png"
    );
    this.setImage(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      "interface/interfaceMove.indicator.png"
    );
  }

  prefPositioning() {
    let screenBound = this.getScreenBounds();

    //

    this.screenWidth = screenBound.width;
    this.screenWidthHalf = screenBound.width / 2;
    this.screenWidthThird = screenBound.width / 3;
    this.screenWidthFifth = screenBound.width / 5;

    this.screenHeight = screenBound.height;
    this.screenHeightHalf = screenBound.height / 2;
    this.screenHeightThird = screenBound.height / 3;
    this.screenHeightFourth = screenBound.height / 4;
    let screenPadding = screenBound.width / 24;

    // Core

    this.setBounds(
      hiversaires.stage.billboardsByID["viewMain"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );

    this.setBounds(
      hiversaires.stage.billboardsByID["vignette"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );

    // Movement

    this.setBounds(
      hiversaires.stage.triggersByID["moveForward"],
      this.screenWidthFifth,
      0,
      this.screenWidthFifth * 3,
      this.screenHeight
    );
    this.setBounds(
      hiversaires.stage.triggersByID["moveRight"],
      this.screenWidthFifth * 4,
      0,
      this.screenWidthFifth,
      this.screenHeight
    );
    this.setBounds(
      hiversaires.stage.triggersByID["moveLeft"],
      0,
      0,
      this.screenWidthFifth,
      this.screenHeight
    );

    // Action Clock Terminal
    this.setBounds(
      hiversaires.stage.triggersByID["action1"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    // Action Clock Terminal
    this.setBounds(
      hiversaires.stage.triggersByID["action2"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    // Action Door
    this.setBounds(
      hiversaires.stage.triggersByID["action3"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    // Action Energy Terminal
    this.setBounds(
      hiversaires.stage.triggersByID["action4"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    // Action Seal Terminal
    this.setBounds(
      hiversaires.stage.triggersByID["action5"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    // Action Credit
    this.setBounds(
      hiversaires.stage.triggersByID["actionCredit"],
      this.screenWidthThird,
      this.screenHeightThird,
      this.screenWidthThird,
      this.screenHeightThird
    );
    this.setHidden(hiversaires.stage.triggersByID["actionCredit"], true);

    // Graphics

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic1"],
      0,
      0,
      screenBound.width,
      screenBound.height
    ); // full

    // Style - Interface - Fuse

    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceFuseBackground"],
      screenPadding,
      screenBound.height - screenBound.width / 12,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceSealBackground"],
      screenBound.width - screenBound.width / 12 - screenPadding,
      screenBound.height - screenBound.width / 12,
      screenBound.width / 12,
      screenBound.width / 12
    );
    /*
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceSealBackground"],
      screenPadding,
      screenBound.height - screenBound.width / 12,
      screenBound.width / 12,
      screenBound.width / 12
    );
    /**/
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceDimclockBackground"],
      screenBound.width / 12 * 4 + screenPadding,
      screenBound.height - screenBound.width / 12,
      screenBound.width / 12,
      screenBound.width / 12
    );

    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceFuse1"],
      screenPadding,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceSeal1"],
      screenBound.width - screenBound.width / 12 - screenPadding,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceSeal2"],
      screenBound.width - screenBound.width / 12 - screenPadding,
      screenBound.height - screenBound.width / 12 * 2 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );

    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceAudio"],
      screenPadding + screenBound.width / 12 * 2,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceDimclock"],
      screenPadding + screenBound.width / 12 * 4,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceSave"],
      screenPadding + screenBound.width / 12 * 6,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceIllusion"],
      screenPadding + screenBound.width / 12 * 8,
      screenBound.height - screenBound.width / 12 - screenPadding,
      screenBound.width / 12,
      screenBound.width / 12
    );

    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceIndicatorRight"],
      this.screenWidthFifth * 4,
      this.screenHeight - screenBound.width / 12,
      this.screenWidthFifth,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceIndicatorForward"],
      this.screenWidthFifth,
      this.screenHeight - screenBound.width / 12,
      this.screenWidthFifth * 3,
      screenBound.width / 12
    );
    this.setBounds(
      hiversaires.stage.billboardsByID["interfaceIndicatorLeft"],
      0,
      this.screenHeight - screenBound.width / 12,
      this.screenWidthFifth,
      screenBound.width / 12
    );

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
    let screenBound = this.getScreenBounds();

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic2"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic2"],
      "menu/menu.black.jpg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic2"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic2"], false);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic3"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic3"],
      "menu/menu.logo.png"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic3"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic3"], false);

    this.setBounds(
      hiversaires.stage.billboardsByID["graphic4"],
      0,
      0,
      screenBound.width,
      screenBound.height
    );
    this.setImage(
      hiversaires.stage.billboardsByID["graphic4"],
      "menu/menu.controls.svg"
    );
    this.setAlpha(hiversaires.stage.billboardsByID["graphic4"], 1.0);
    this.setHidden(hiversaires.stage.billboardsByID["graphic4"], false);

    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal1"], true);
    this.setHidden(hiversaires.stage.billboardsByID["interfaceSeal2"], true);
    this.setHidden(hiversaires.stage.billboardsByID["interfaceFuse1"], true);

    this.fadeOut(hiversaires.stage.billboardsByID["graphic2"], 0, 2.0);
    this.fadeOut(hiversaires.stage.billboardsByID["graphic3"], 3, 2.0);
    this.fadeOut(hiversaires.stage.billboardsByID["graphic4"], 8, 1.0);

    hiversaires.music.volume = 1; // Music
  }

  prefSave() {
    this.prefPositioning();
    console.log("- [progress:saving..]");

    let saveObject = {
      userSettings: {
        userNode: this.userNode,
        userOrientation: this.userOrientation,
        userProgress: this.userProgress,
        userEnergy: this.userEnergy
      },
      userActionStorage: this.userActionStorage
    };

    localStorage.save = JSON.stringify(saveObject);

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
      this.userNode = userSettings.userNode;
      this.userOrientation = userSettings.userOrientation;
      this.userProgress = userSettings.userProgress;
      this.userEnergy = userSettings.userEnergy;

      // Storage
      this.userActionStorage = saveObject.userActionStorage;
    } else {
      // New Game

      console.log("- [progress:creating..]");

      this.userActionStorage = [];
      for (let i = 0; i < 102; i++) {
        this.userActionStorage[i] = "";
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

      this.userNode = 1;
      this.userOrientation = 0;
      this.userProgress = 1;
      this.userEnergy = 0;

      hiversaires.music.setRecord(Records.act1);

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
