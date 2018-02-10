"use strict";

class Stage {
  constructor(root, responder) {
    this.root = root;
    this.responder = responder;
    this.billboardsByID = new Map();
    this.triggersByID = new Map();

    this.triggerMap = new Map();
    this.triggerMap.set("moveLeft", Input.left);
    this.triggerMap.set("moveRight", Input.right);
    this.triggerMap.set("moveForward", Input.forward);
    this.triggerMap.set("action", Input.action);
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
      let billboard = new Billboard(id, DEBUG_SHOW_BILLBOARDS);
      this.billboards.appendChild(billboard.element);
      this.billboardsByID.set(id, billboard);
    }

    function handleClick(event) {
      if (this.triggerMap.has(event.currentTarget.id)) {
        this.responder(this.triggerMap.get(event.currentTarget.id));
      }
    }

    for (let id of ["moveRight", "moveLeft", "moveForward", "action"]) {
      let trigger = new Trigger(id, DEBUG_SHOW_TRIGGERS);
      this.triggers.appendChild(trigger.element);
      trigger.element.addEventListener("click", handleClick.bind(this));
      this.triggersByID.set(id, trigger);
    }

    this.billboard("interfaceIndicatorRight").alpha = 0;
    this.billboard("interfaceIndicatorForward").alpha = 0;
    this.billboard("interfaceIndicatorLeft").alpha = 0;
    this.billboard("interfaceDimclockAlert").alpha = 0;
    this.billboard("interfaceSealAlert").alpha = 0;
    this.billboard("interfaceFuseAlert").alpha = 0;

    this.billboard("interfaceIndicatorRight").image = "interface/footstep.svg";
    this.billboard("interfaceIndicatorForward").image =
      "interface/footstep.svg";
    this.billboard("interfaceIndicatorLeft").image = "interface/footstep.svg";
    this.billboard("interfaceDimclockAlert").image = "interface/alert.svg";
    this.billboard("clockShadow").image = "interface/dimclock.shadow.svg";
    this.billboard("interfaceSealAlert").image = "interface/alert.svg";
    this.billboard("interfaceFuseAlert").image = "interface/alert.svg";
    this.billboard("menuBlack").image = "menu/menu.black.svg";
    this.billboard("menuCredit1").image = "menu/menu.credit1.svg";
    this.billboard("menuCredit2").image = "menu/menu.credit2.svg";
    this.billboard("menuCredit3").image = "menu/menu.credit3.svg";
    this.billboard("menuCredit4").image = "menu/menu.credit4.svg";
    this.billboard("vignette").image = "interface/vignette.svg";
    this.billboard("interfaceSave").image = "interface/save.svg";
    this.billboard("menuBlack").image = "menu/menu.black.svg";
    this.billboard("menuLogo").image = "menu/menu.logo.svg";
    this.billboard("menuControls").image = "menu/menu.controls.svg";
  }

  fadeIn(viewToFadeIn, duration, delay, skipLast = true) {
    if (skipLast) {
      $(viewToFadeIn.element).finish();
    }
    $(viewToFadeIn.element)
      .delay(delay * 1000)
      .animate({ opacity: 1 }, duration * 1000);
  }

  fadeOut(viewToFadeOut, duration, delay, skipLast = true) {
    if (skipLast) {
      $(viewToFadeOut.element).finish();
    }
    $(viewToFadeOut.element)
      .delay(delay * 1000)
      .animate({ opacity: 0 }, duration * 1000);
  }

  animateTurnLeft() {
    let viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.billboard("interfaceIndicatorLeft").alpha = 1;

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorLeft"), 0.5, 0);
  }

  animateTurnRight() {
    let viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    let viewMainX = viewMain.css("left").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.billboard("interfaceIndicatorRight").alpha = 1;

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorRight"), 0.5, 0);
  }

  animateStepForward() {
    let viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.billboard("interfaceIndicatorForward").alpha = 1;

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0.5, 0);
  }

  animateStepBackward() {
    let viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    let viewMainY = viewMain.css("top").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.billboard("interfaceIndicatorForward").alpha = 1;

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("interfaceIndicatorForward"), 0.5, 0);
  }

  billboard(id) {
    return hiversaires.stage.billboardsByID.get(id);
  }

  trigger(id) {
    return hiversaires.stage.triggersByID.get(id);
  }
}

class Visual {
  constructor(tagName, id, debug) {
    this.element = document.createElement(tagName);
    this.element.id = id;
    if (debug) {
      this.element.innerText = id;
    }
    this._hidden = false;
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(value) {
    this._hidden = value;
    $(this.element).css({
      display: value ? "none" : "block",
      "pointer-events": value ? "none" : "inherit"
    });
  }
}

class Billboard extends Visual {
  constructor(id, debug) {
    super("billboard", id, debug);
    this._alpha = 1;
  }

  get image() {
    return this._url;
  }

  set image(url) {
    this._url = url;
    if (url) {
      hiversaires.artBook.setArt(this.element, "media/graphics/" + url);
    } else {
      hiversaires.artBook.removeArt(this.element);
    }
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(value) {
    this._alpha = value;
    $(this.element)
      .finish()
      .css({ opacity: value });
  }

  set className(value) {
    this.element.className = value;
  }
}

class Trigger extends Visual {
  constructor(id, debug) {
    super("trigger", id, debug);
  }
}
