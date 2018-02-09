"use strict";

class Stage {
  constructor(root) {
    this.root = root;
    this.billboardsByID = new Map();
    this.triggersByID = new Map();
  }

  start() {
    this.billboards = this.root.appendChild(
      document.createElement("billboards")
    );
    if (DEBUG_SHOW_BILLBOARDS) {
      $(this.billboards).addClass("debug");
    }

    this.triggers = this.root.appendChild(document.createElement("triggers"));
    if (DEBUG_SHOW_TRIGGERS) {
      $(this.triggers).addClass("debug");
    }

    for (let id of [
      "viewMain",
      "vignette",
      "overlay",
      "illusion",
      "menuBlack",
      "menuCredit1",
      "menuCredit2",
      "menuCredit3",
      "menuCredit4",
      "menuLogo",
      "menuControls",
      "clockShadow",
      "clockFace",
      "progressPane",
      "ententeScreen",
      "interfaceDimclockAlert",
      "interfaceDimclock",
      "interfaceFuseAlert",
      "interfaceFuse1",
      "interfaceSealAlert",
      "interfaceSeal1",
      "interfaceSeal2",
      "interfaceAudio",
      "interfaceSave",
      "interfaceIllusion",
      "interfaceIndicatorRight",
      "interfaceIndicatorForward",
      "interfaceIndicatorLeft"
    ]) {
      let billboard = this.billboards.appendChild(
        document.createElement("billboard")
      );
      billboard.id = id;
      if (DEBUG_SHOW_BILLBOARDS) {
        billboard.innerText = id;
      }
      this.billboardsByID.set(id, billboard);
    }

    function handleClick(event) {
      hiversaires[event.currentTarget.id](); // Ugh. Temporary. It's temporary!
    }

    for (let id of ["moveRight", "moveLeft", "moveForward", "action"]) {
      let trigger = this.triggers.appendChild(
        document.createElement("trigger")
      );
      trigger.id = id;
      if (DEBUG_SHOW_TRIGGERS) {
        trigger.innerText = id;
      }
      trigger.addEventListener("click", handleClick);
      this.triggersByID.set(id, trigger);
    }

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
  }

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
}
