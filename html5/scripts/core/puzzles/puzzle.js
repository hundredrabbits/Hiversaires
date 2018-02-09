class Puzzle {
  constructor(id, info, defaultState) {
    this.id = id;
    this.info = Object.freeze(info);
    this.defaultState = defaultState != null ? defaultState : 0;
    this._state = { value: this.defaultState }; // boxed, so it can be mutated
  }

  get state() {
    return this._state.value;
  }

  set state(value) {
    this._state.value = value;
  }

  setup(hh) {}
}

class Door extends Puzzle {
  openDoor(hh) {
    hh.setHidden(hh.billboard("overlay"), false);
    hh.setCurrentAction(this.walkThroughDoor.bind(this));

    if (hh.currentPuzzle instanceof SealDoor) {
      hh.fadeIn(hh.billboard("overlay"), 1.0, 0.0);
    } else if (hh.currentPuzzle.id == 28) {
      hh.fadeIn(hh.billboard("overlay"), 1, 0.5);
    } else {
      hh.fadeIn(hh.billboard("overlay"), 0.0, 0);
    }
  }

  walkThroughDoor(hh) {
    // Warp Action

    hiversaires.music.playEffect("action_DoorActive");

    if (hh.userNodeID == 1) {
      hh.userNodeID = 103;
    } else if (hh.userNodeID == 11) {
      hh.userNodeID = 48;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 13) {
      hh.userNodeID = 12;
    } else if (hh.userNodeID == 12) {
      hh.userNodeID = 13;
    } else if (hh.userNodeID == 16) {
      hh.userNodeID = 22;
    } else if (hh.userNodeID == 20 && hh.puzzleState[37] > 0) {
      hh.userNodeID = 116;
      hh.userOrientation = 1;
    } else if (hh.userNodeID == 23) {
      // Fold Gate
      hh.userNodeID = 22;
    } else if (hh.userNodeID == 25) {
      hh.userNodeID = 31;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 27) {
      hh.userNodeID = 32;
      hh.userOrientation = 1;
    } else if (hh.userNodeID == 35) {
      hh.userNodeID = 31;
      hh.userOrientation = 0;
    } else if (
      hh.userNodeID == 39 &&
      hh.puzzleState[5] == 1 &&
      hh.puzzleState[31] == 1
    ) {
      hh.userNodeID = 34;
    } else if (hh.userNodeID == 39) {
      hh.userNodeID = 45;
    } else if (hh.userNodeID == 46) {
      hh.userNodeID = 85;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 48) {
      hh.userNodeID = 11;
      hh.userOrientation = 2;
    } else if (hh.userNodeID == 52) {
      hh.userNodeID = 32;
      hh.userOrientation = 3;
    } else if (hh.userNodeID == 61) {
      hh.userNodeID = 72;
    } else if (hh.userNodeID == 62) {
      hh.userNodeID = 77;
    } else if (hh.userNodeID == 69) {
      hh.userNodeID = 72;
    } else if (hh.userNodeID == 76) {
      hh.userNodeID = 87;
    } else if (hh.userNodeID == 77) {
      hh.userNodeID = 62;
    } else if (hh.userNodeID == 79) {
      hh.userNodeID = 112;
    } else if (hh.userNodeID == 85) {
      hh.userNodeID = 46;
      hh.userOrientation = 0;
    } else if (hh.userNodeID == 87) {
      hh.userNodeID = 76;
    } else if (hh.userNodeID == 112) {
      hh.userNodeID = 79;
    } else if (hh.userNodeID == 113) {
      hh.userNodeID = 50;
    } else if (hh.userNodeID == 50) {
      hh.userNodeID = 113;
    } else if (hh.userNodeID == 142) {
      hh.userNodeID = 143;
      hh.userOrientation = 3;
    } else if (hh.userNodeID == 143) {
      hh.userNodeID = 142;
      hh.userOrientation = 1;
    }

    // Easter Eggs

    hh.actionCheck();
    hh.moveCheck();
  }
}

class ClockTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id] =
          (hh.puzzleState[hh.currentPuzzle.id] + 1) % 3;
        hiversaires.music.playEffect("action_EnergyActive");
        this.templateClockUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");

    this.templateClockUpdate(hh);
  }

  templateClockUpdate(hh) {
    hh.templateClockInterface();

    hh.setImage(
      "clockFace",
      "interface/dimclock.state" + hh.puzzleState[1] + ".svg"
    );

    hh.fadeIn(hh.billboard("clockShadow"), 1.5, 0.5);
    hh.fadeIn(hh.billboard("clockFace"), 0.5, 0.5);
  }
}

class SealTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setHidden(hh.billboard("overlay"), false);
    hh.setAlpha("overlay", 0);

    hh.setCurrentAction(
      function() {
        if (
          hh.puzzleState[hh.currentPuzzle.id] == 1 ||
          hh.currentSeals.length < 2
        ) {
          if (hh.puzzleState[hh.currentPuzzle.id] != 1) {
            hiversaires.music.playEffect("action_SealActive");
            hh.puzzleState[hh.currentPuzzle.id] = 1;
          } else {
            hiversaires.music.playEffect("action_SealInactive");
            hh.puzzleState[hh.currentPuzzle.id] = 0;
          }
        } else {
          hiversaires.music.playEffect("action_EnergyStack");
          hh.templateSealAlert();
          console.log("No more seal slots.");
        }

        this.templateSealUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_SealInit");
    this.templateSealUpdate(hh);
  }

  templateSealUpdate(hh) {
    hh.templateSealInterface();
    hh.fadeOut(hh.billboard("overlay"), 0.5, 0);
    if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("seal." + hh.currentSeals.length);
      hh.showModifier(0.1, 0.2);
    } else {
      hh.hideModifier(0.1, 0.2);
    }
  }
}

class SecretTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id] =
          (hh.puzzleState[hh.currentPuzzle.id] + 1) % 2;
        this.templateSecretUpdate(hh);
      }.bind(this)
    );

    this.templateSecretUpdate(hh);
  }

  templateSecretUpdate(hh) {
    if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("on");
      hh.showModifier(0.3, 0.1);
    } else {
      hh.hideModifier(0.3, 0);
    }
  }
}

class EnergyTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.templateEnergyInterface();

    hh.setHidden(hh.billboard("overlay"), false);

    hh.setCurrentAction(
      function() {
        this.templateUpdateFuse(hh);
        hh.templateEnergyInterface();
        this.templateEnergyUpdate(hh);
      }.bind(this)
    );

    hiversaires.music.playEffect("action_EnergyInit");
  }

  templateEnergyUpdate(hh) {
    hh.setCurrentAction(
      function() {
        if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
          hh.puzzleState[hh.currentPuzzle.id] = 0;
          hh.userEnergy += 1;
        } else if (hh.userEnergy > 0) {
          hh.puzzleState[hh.currentPuzzle.id] = 1;
          hh.userEnergy -= 1;
        } else {
          hh.templateEnergyAlert();
        }

        this.templateUpdateFuse(hh);
        hh.templateEnergyInterface();
      }.bind(this)
    );
  }

  templateUpdateFuse(hh) {
    hh.setModifier(
      hh.puzzleState[hh.currentPuzzle.id] == 1 ? "filled" : "empty"
    );
    hh.showModifier();
  }
}

class SealDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    hh.setHidden(hh.billboard("overlay"), true);

    hiversaires.music.playEffect("action_DoorInit");
    hh.templateSealInterface();

    const seals = hh.currentSeals;
    const containsForest = seals.indexOf(Zone.forest) != -1;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;
    const containsRainre = seals.indexOf(Zone.rainre) != -1;
    const containsMetamondst = seals.indexOf(Zone.metamondst) != -1;

    let modifier = null;

    if (
      containsForest &&
      containsRainre &&
      (hh.userNodeID == 46 || hh.userNodeID == 85)
    ) {
      // Act 1 : Forest + Rainre in Stones
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act2;
      hh.setModifier("open");
      hh.prefSave();
    } else if (
      containsMetamondst &&
      containsRainre &&
      (hh.userNodeID == 11 || hh.userNodeID == 48)
    ) {
      // Act 2 : Metamondst + Rainre in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act3;
      hh.setModifier("open");
      hh.prefSave();
    } else if (
      containsAntechannel &&
      containsRainre &&
      (hh.userNodeID == 46 || hh.userNodeID == 85)
    ) {
      // Act 3 : Forest + Rainre in Metamondst
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.userChapter = Chapter.act4;
      hh.setModifier("open");
      hh.prefSave();
    } else if (containsAntechannel && containsStones && hh.userNodeID == 1) {
      // Act 4 : Antechannel + Stones in Forest
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
      hh.prefSave();
    } else {
      hh.templateSealAlert();
    }
  }
}

class StudioTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setHidden(hh.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hh.templateSealInterface();

    const seals = hh.currentSeals;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;

    if (containsStones && containsAntechannel) {
      // Act 4 : Antechannel + Stones in Studio
      hh.setCurrentAction(
        function() {
          hh.puzzleState[hh.currentPuzzle.id] =
            (hh.puzzleState[hh.currentPuzzle.id] + 1) % 2;
          hiversaires.music.playEffect("action_EnergyActive");
          this.templateUpdateStudioTerminal(hh);
        }.bind(this)
      );
      hh.prefSave();
    }

    this.templateUpdateStudioTerminal(hh);
  }

  templateUpdateStudioTerminal(hh) {
    const seals = hh.currentSeals;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;

    let modifier = null;

    if (hh.puzzleState[this.id] == 1) {
      modifier = "unlocked";
      hh.userChapter = Chapter.act5;
      hh.updateMusic();
    } else {
      if (containsStones && containsAntechannel) {
        modifier = "both";
      } else if (containsStones && !containsAntechannel) {
        modifier = "stones";
      } else if (!containsStones && containsAntechannel) {
        modifier = "antechannel";
      }

      if (hh.userChapter == Chapter.act5) {
        hh.userChapter = Chapter.act4;
        hh.updateMusic();
      }
    }

    if (modifier != null) {
      hh.setModifier(modifier);
      hh.showModifier();
    } else {
      hh.hideModifier();
    }
  }
}

class SecretDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setHidden(hh.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");

    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setCurrentAction(this.walkThroughDoor.bind(this));
    }
  }
}

class EnergyDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setHidden(hh.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hh.templateEnergyInterface();

    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setCurrentAction(
        function() {
          this.openDoor(hh);
          hh.templateEnergyInterface();
        }.bind(this)
      );
      let modifier = "open";
      let secret = hh.currentPuzzle.info.secret;
      if (secret != null && hh.checkConditions(secret.conditions)) {
        modifier = "secret";
      }
      hh.setModifier(modifier);
    } else {
      hh.templateEnergyAlert();
    }
  }
}

class ClockDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setHidden(hh.billboard("overlay"), true);
    hh.templateClockInterface();
    hiversaires.music.playEffect("action_DoorInit");
    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
    } else {
      hh.templateClockAlert();
    }
  }
}

class ProgressTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.prefSave();

    hh.setImage(
      "progressPane",
      "interface/progress." + hh.userChapter + ".svg"
    );

    hh.fadeIn(hh.billboard("progressPane"), 0.5, 0.3);
  }
}

class AudioTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id] =
          (hh.puzzleState[hh.currentPuzzle.id] + 1) % 2;
        this.templateAudioUpdate(hh);
      }.bind(this)
    );

    this.templateAudioUpdate(hh);
  }

  templateAudioUpdate(hh) {
    hh.templateAudioInterface();
    if (hh.puzzleState[hh.currentPuzzle.id] == 1) {
      hh.setModifier("on");
      hh.showModifier(0.3, 0.1);
      hiversaires.music.volume = 1;
    } else {
      hh.hideModifier(0.3, 0);
      hiversaires.music.volume = 0;
    }
  }
}

class KillTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(
      function() {
        hh.puzzleState[hh.currentPuzzle.id]++;
        if (hh.puzzleState[hh.currentPuzzle.id] > 50) {
          hh.wipePlayerProgress();
          hh.newGame();
        }
      }.bind(this)
    );
  }
}

class EndgameDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    if (hh.checkConditions(hh.currentPuzzle.info.conditions)) {
      hh.setModifier("open");
      hh.showModifier();
      hh.setCurrentAction(this.walkThroughDoor.bind(this));
    } else {
      hh.templateEnergyAlert();
    }
  }
}

class EndgameCredit extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.setCurrentAction(this.showCredits.bind(this));
  }

  showCredits(hh) {
    hh.userChapter = Chapter.credit;
    hh.updateMusic();

    hh.setAlpha("menuBlack", 0.0);
    hh.setHidden(hh.billboard("menuBlack"), false);

    hh.fadeIn(hh.billboard("menuBlack"), 3, 1.0);

    hh.setAlpha("menuCredit1", 0.0);
    hh.setHidden(hh.billboard("menuCredit1"), false);

    hh.fadeIn(hh.billboard("menuCredit1"), 1, 6.0);

    hh.setAlpha("menuCredit2", 0.0);
    hh.setHidden(hh.billboard("menuCredit2"), false);

    hh.fadeIn(hh.billboard("menuCredit2"), 1, 10.0);

    hh.setAlpha("menuCredit3", 0.0);
    hh.setHidden(hh.billboard("menuCredit3"), false);

    hh.fadeIn(hh.billboard("menuCredit3"), 1, 16.0);

    hh.fadeIn(hh.billboard("menuBlack"), 1, 20.0, false);

    if (hh.userEnergy == 1) {
      hh.setAlpha("menuCredit4", 0.0);
      hh.setHidden(hh.billboard("menuCredit4"), false);

      hh.fadeIn(hh.billboard("menuCredit4"), 1, 24.0);
    }
  }
}

class TimeDoor extends Door {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();

    const now = new Date(Date.now());
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    if ((currentHours == 15 && currentMinutes == 7) || hh.userNodeID == 143) {
      hh.puzzleState[54] = 1;
      hh.setCurrentAction(this.openDoor.bind(this));
      hh.setModifier("open");
    } else {
      console.log("Door locked, wait for time.");
    }

    console.log("Current Time:", currentHours, currentMinutes);
  }
}

class EntenteTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    let targetGraphic = "";

    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 23) {
      if (hh.puzzleState[23] > 17) {
        targetGraphic = "Left";
      } else if (hh.puzzleState[23] < 17) {
        targetGraphic = "Right";
      } else if (hh.puzzleState[23] == 17) {
        targetGraphic = "Right";
      }
    }

    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 24) {
      if (hh.puzzleState[24] > 17) {
        targetGraphic = "Left2";
      } else if (hh.puzzleState[24] < 17) {
        targetGraphic = "Right2";
      } else if (hh.puzzleState[24] == 17) {
        targetGraphic = "Straight";
      }
    }

    hh.setImage("ententeScreen", "interface/entente" + targetGraphic + ".svg");
    hh.fadeIn(hh.billboard("ententeScreen"), 1, 0);
  }
}

class Entente extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 43) {
      console.log("templateEntentePart1Incr");
      this.templateEntentePart1Incr(hh);
    }
    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 42) {
      console.log("templateEntentePart1Decr");
      this.templateEntentePart1Decr(hh);
    }
    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 45) {
      console.log("templateEntentePart2Incr");
      this.templateEntentePart2Incr(hh);
    }
    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 44) {
      console.log("templateEntentePart2Decr");
      this.templateEntentePart2Decr(hh);
    }
    if (hh.currentPuzzle != null && hh.currentPuzzle.id == 46) {
      console.log("templateEntentePart2Exit");
      this.templateEntentePart2Exit(hh);
    }
  }

  templateEntentePart1Incr(hh) {
    if (hh.puzzleState[23] == 17) {
      hh.userNodeID = 93;
      hh.actionCheck();
      hh.moveCheck();
      hh.actionReset();
    } else {
      hh.userNodeID = 89;

      if (hh.puzzleState[23] < 21) {
        hh.puzzleState[23] = hh.puzzleState[23] + 3;
      }

      hh.actionCheck();
      hh.moveCheck();
      hh.actionReset();
    }
  }

  templateEntentePart1Decr(hh) {
    hh.userNodeID = 103;

    if (hh.puzzleState[23] > 14) {
      hh.puzzleState[23] = hh.puzzleState[23] - 1;
    }

    hh.actionCheck();
    hh.moveCheck();
    hh.actionReset();
  }

  templateEntentePart2Incr(hh) {
    hh.userNodeID = 94;
    hh.userOrientation = 2;

    if (hh.puzzleState[24] < 23) {
      hh.puzzleState[24] = hh.puzzleState[24] + 4;
    }

    hh.actionCheck();
    hh.moveCheck();
    hh.actionReset();
  }

  templateEntentePart2Decr(hh) {
    hh.userNodeID = 95;
    hh.userOrientation = 2;

    if (hh.puzzleState[24] > 14) {
      hh.puzzleState[24] = hh.puzzleState[24] - 1;
    }

    hh.actionCheck();
    hh.moveCheck();
    hh.actionReset();
  }

  templateEntentePart2Exit(hh) {
    if (hh.puzzleState[23] == 17 && hh.puzzleState[24] == 17) {
      hh.userNodeID = 107;
      hh.userOrientation = 3;

      hh.actionCheck();
      hh.moveCheck();
      hh.actionReset();
    } else {
      hh.userNodeID = 93;

      hh.actionCheck();
      hh.moveCheck();
      hh.actionReset();
    }
  }
}

class Illusion extends Puzzle {
  appear(hh) {
    // TODO: By solving the jQuery add/remove CSS class problem, we could support multiple illusions

    hh.billboard("illusion").className =
      "node_" + hh.userNodeID + "_" + hh.userOrientation;

    hh.setAlpha("illusion", 1);
    hh.fadeOut(hh.billboard("illusion"), 0.5, 1);

    if (hh.userChapter == Chapter.act5) {
      hh.puzzleState[this.id] = 1;
      hh.illusionInterface();
    }
  }
}
