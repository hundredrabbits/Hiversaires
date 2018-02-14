"use strict";

class Interface {
  constructor() {}

  showClock() {
    hiversaires.stage.billboard("hudDimclock").image =
      "interface/clock." + hiversaires.game.puzzleState.clock + ".svg";
    hiversaires.stage.billboard("hudDimclock").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("hudDimclock"),
      0.5,
      3
    );
  }

  showClockAlert() {
    hiversaires.stage.billboard("hudDimclockAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("hudDimclockAlert"),
      0.5,
      0.5
    );
  }

  showSeal() {
    let seal1 = null;
    let seal2 = null;
    for (const seal of hiversaires.currentSeals) {
      if (seal1 == null) {
        seal1 = seal;
      } else if (SealOrder.indexOf(seal) > SealOrder.indexOf(seal1)) {
        seal2 = seal;
      } else {
        seal2 = seal1;
        seal1 = seal;
      }
    }

    hiversaires.stage.billboard("hudSeal1").image =
      "interface/seal." + (seal1 == null ? "none" : seal1) + ".svg";
    hiversaires.stage.billboard("hudSeal2").image =
      "interface/seal." + (seal2 == null ? "none" : seal2) + ".svg";

    hiversaires.stage.billboard("hudSeal1").hidden = false;
    hiversaires.stage.billboard("hudSeal2").hidden = false;

    hiversaires.stage.billboard("hudSeal1").alpha = 1;
    hiversaires.stage.billboard("hudSeal2").alpha = 1;

    hiversaires.stage.fadeOut(hiversaires.stage.billboard("hudSeal1"), 0.5, 3);
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("hudSeal2"), 0.5, 3);
  }

  showSealAlert() {
    hiversaires.stage.billboard("hudSealAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("hudSealAlert"),
      0.5,
      0.5
    );
  }

  showEnergy() {
    hiversaires.stage.billboard("hudFuse1").image =
      "interface/fuse." + hiversaires.game.userEnergy + ".svg";

    hiversaires.stage.billboard("hudFuse1").hidden = false;
    hiversaires.stage.billboard("hudFuse1").alpha = 1;

    hiversaires.stage.fadeOut(hiversaires.stage.billboard("hudFuse1"), 0.5, 3);
  }

  showEnergyAlert() {
    hiversaires.stage.billboard("hudFuseAlert").alpha = 1.0;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("hudFuseAlert"),
      1.5,
      0.5
    );
  }

  showAudio() {
    hiversaires.stage.billboard("hudAudio").image =
      "interface/music." +
      (hiversaires.game.puzzleState.audio ? "on" : "off") +
      ".svg";

    hiversaires.stage.billboard("hudAudio").alpha = 1;
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("hudAudio"), 0.5, 3);
  }

  showIllusion() {
    hiversaires.stage.billboard("hudIllusion").image =
      "interface/illusion." +
      hiversaires.game.puzzleState.illusions.size +
      ".svg";
    hiversaires.stage.billboard("hudIllusion").alpha = 1;
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("hudIllusion"),
      0.5,
      3
    );
  }

  hideMenu() {
    hiversaires.stage.billboard("menuBlack").hidden = true;
    hiversaires.stage.billboard("menuCredit1").hidden = true;
    hiversaires.stage.billboard("menuCredit2").hidden = true;
    hiversaires.stage.billboard("menuCredit3").hidden = true;
    hiversaires.stage.billboard("menuCredit4").hidden = true;
    hiversaires.stage.billboard("menuLogo").hidden = true;
    hiversaires.stage.billboard("menuControls").hidden = true;
  }

  showHomeMenu() {
    hiversaires.stage.billboard("menuBlack").alpha = 1.0;
    hiversaires.stage.billboard("menuBlack").hidden = false;

    hiversaires.stage.billboard("menuLogo").alpha = 1.0;
    hiversaires.stage.billboard("menuLogo").hidden = false;

    hiversaires.stage.billboard("menuControls").alpha = 1.0;
    hiversaires.stage.billboard("menuControls").hidden = false;

    hiversaires.stage.billboard("hudSeal1").hidden = true;
    hiversaires.stage.billboard("hudSeal2").hidden = true;
    hiversaires.stage.billboard("hudFuse1").hidden = true;
    hiversaires.stage.billboard("hudSave").hidden = true;

    hiversaires.stage.fadeOut(hiversaires.stage.billboard("menuBlack"), 2.0, 0);
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("menuLogo"), 2.0, 3);
    hiversaires.stage.fadeOut(
      hiversaires.stage.billboard("menuControls"),
      1.0,
      8
    );

    hiversaires.music.volume = 1; // Music
  }

  showCreditsMenu() {
    hiversaires.stage.billboard("menuBlack").alpha = 0.0;
    hiversaires.stage.billboard("menuBlack").hidden = false;

    hiversaires.stage.fadeIn(hiversaires.stage.billboard("menuBlack"), 3, 1.0);

    hiversaires.stage.billboard("menuCredit1").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit1").hidden = false;

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit1"),
      1,
      6.0
    );

    hiversaires.stage.billboard("menuCredit2").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit2").hidden = false;

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit2"),
      1,
      10.0
    );

    hiversaires.stage.billboard("menuCredit3").alpha = 0.0;
    hiversaires.stage.billboard("menuCredit3").hidden = false;

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuCredit3"),
      1,
      16.0
    );

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard("menuBlack"),
      1,
      20.0,
      false
    );

    if (hiversaires.game.userEnergy == 1) {
      hiversaires.stage.billboard("menuCredit4").alpha = 0.0;
      hiversaires.stage.billboard("menuCredit4").hidden = false;

      hiversaires.stage.fadeIn(
        hiversaires.stage.billboard("menuCredit4"),
        1,
        24.0
      );
    }
  }

  flashVignette() {
    hiversaires.stage.billboard("vignette").alpha = 1.0;
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("vignette"), 1.0, 0);
  }

  showSave() {
    hiversaires.stage.billboard("hudSave").hidden = false;
    hiversaires.stage.billboard("hudSave").alpha = 1;
    hiversaires.stage.fadeOut(hiversaires.stage.billboard("hudSave"), 0.5, 3);
  }
}
