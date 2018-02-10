"use strict";

class Interface {
  constructor() {}

  showClock() {
    hiversaires.stage.billboard("interfaceDimclock").image =
      "interface/clock." + hiversaires.game.puzzleState.clock + ".svg";
    hiversaires.stage.billboard("interfaceDimclock").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceDimclock"),
      0.5,
      3
    );
  }

  showClockAlert() {
    hiversaires.stage.billboard("interfaceDimclockAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceDimclockAlert"),
      0.5,
      0.5
    );
  }

  showSeal() {
    let seal1 = null;
    let seal2 = null;
    for (let seal of hiversaires.currentSeals) {
      if (seal1 == null) {
        seal1 = seal;
      } else if (SealOrder.indexOf(seal) > SealOrder.indexOf(seal1)) {
        seal2 = seal;
      } else {
        seal2 = seal1;
        seal1 = seal;
      }
    }

    hiversaires.stage.billboard("interfaceSeal1").image =
      "interface/seal." + (seal1 == null ? "none" : seal1) + ".svg";
    hiversaires.stage.billboard("interfaceSeal2").image =
      "interface/seal." + (seal2 == null ? "none" : seal2) + ".svg";

    hiversaires.stage.billboard("interfaceSeal1").hidden = false;
    hiversaires.stage.billboard("interfaceSeal2").hidden = false;

    hiversaires.stage.billboard("interfaceSeal1").alpha = 1;
    hiversaires.stage.billboard("interfaceSeal2").alpha = 1;

    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceSeal1"),
      0.5,
      3
    );
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceSeal2"),
      0.5,
      3
    );
  }

  showSealAlert() {
    hiversaires.stage.billboard("interfaceSealAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceSealAlert"),
      0.5,
      0.5
    );
  }

  showEnergy() {
    hiversaires.stage.billboard("interfaceFuse1").image =
      "interface/fuse." + hiversaires.game.userEnergy + ".svg";

    hiversaires.stage.billboard("interfaceFuse1").hidden = false;
    hiversaires.stage.billboard("interfaceFuse1").alpha = 1;

    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceFuse1"),
      0.5,
      3
    );
  }

  showEnergyAlert() {
    hiversaires.stage.billboard("interfaceFuseAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceFuseAlert"),
      1.5,
      0.5
    );
  }

  showAudio() {
    hiversaires.stage.billboard("interfaceAudio").image =
      "interface/music." +
      (hiversaires.game.puzzleState.audio ? "on" : "off") +
      ".svg";

    hiversaires.stage.billboard("interfaceAudio").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceAudio"),
      0.5,
      3
    );
  }

  showIllusion() {
    hiversaires.stage.billboard("interfaceIllusion").image =
      "interface/illusion." +
      hiversaires.game.puzzleState.illusions.size +
      ".svg";
    hiversaires.stage.billboard("interfaceIllusion").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceIllusion"),
      0.5,
      3
    );
  }

  menuHome() {
    hiversaires.stage.billboard("menuBlack").alpha = 1.0;
    hiversaires.stage.billboard("menuBlack").hidden = false;

    hiversaires.stage.billboard("menuLogo").alpha = 1.0;
    hiversaires.stage.billboard("menuLogo").hidden = false;

    hiversaires.stage.billboard("menuControls").alpha = 1.0;
    hiversaires.stage.billboard("menuControls").hidden = false;

    hiversaires.stage.billboard("interfaceSeal1").hidden = true;
    hiversaires.stage.billboard("interfaceSeal2").hidden = true;
    hiversaires.stage.billboard("interfaceFuse1").hidden = true;
    hiversaires.stage.billboard("interfaceSave").hidden = true;

    hiversaires.stage.fadeOut(hiversaires.stage.billboard("menuBlack"), 2.0, 0);
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("menuLogo"), 2.0, 3);
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("menuControls"),
      1.0,
      8
    );

    hiversaires.music.volume = 1; // Music
  }

  flashVignette() {
    hiversaires.stage.billboard("vignette").alpha = 1.0;
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("vignette"), 1.0, 0);
  }

  showSave() {
    hiversaires.stage.billboard("interfaceSave").hidden = false;
    hiversaires.stage.billboard("interfaceSave").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("interfaceSave"),
      0.5,
      3
    );
  }
}
