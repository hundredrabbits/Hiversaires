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

    for (const id of [
      "viewMain",
      "modifier",
      "vignette",
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
      "hudDimclockAlert",
      "hudDimclock",
      "hudFuseAlert",
      "hudFuse1",
      "hudSealAlert",
      "hudSeal1",
      "hudSeal2",
      "hudAudio",
      "hudSave",
      "hudIllusion",
      "hudStepRight",
      "hudStepForward",
      "hudStepLeft"
    ]) {
      const billboard = new Billboard(id, DEBUG_SHOW_BILLBOARDS);
      this.billboards.appendChild(billboard.element);
      this.billboardsByID.set(id, billboard);
    }

    function handleClick(event) {
      if (this.triggerMap.has(event.currentTarget.id)) {
        this.responder(this.triggerMap.get(event.currentTarget.id));
      }
    }

    for (const id of ["moveRight", "moveLeft", "moveForward", "action"]) {
      const trigger = new Trigger(id, DEBUG_SHOW_TRIGGERS);
      this.triggers.appendChild(trigger.element);
      trigger.element.addEventListener("click", handleClick.bind(this));
      this.triggersByID.set(id, trigger);
    }

    this.billboard("hudStepRight").alpha = 0;
    this.billboard("hudStepForward").alpha = 0;
    this.billboard("hudStepLeft").alpha = 0;
    this.billboard("hudDimclockAlert").alpha = 0;
    this.billboard("hudSealAlert").alpha = 0;
    this.billboard("hudFuseAlert").alpha = 0;

    this.billboard("hudStepRight").image = "interface/footstep.svg";
    this.billboard("hudStepForward").image = "interface/footstep.svg";
    this.billboard("hudStepLeft").image = "interface/footstep.svg";
    this.billboard("hudDimclockAlert").image = "interface/alert.svg";
    this.billboard("clockShadow").image = "interface/dimclock.shadow.svg";
    this.billboard("hudSealAlert").image = "interface/alert.svg";
    this.billboard("hudFuseAlert").image = "interface/alert.svg";

    this.billboard("menuBlack").text = "<contents></contents>";
    this.billboard("menuCredit1").text =
      "<contents><h1>Development</h1><h2>Devine Lu Linvega</h2><h1>Technical Assistance</h1><h2>Sven Bergstr&ouml;m</h2><h2>Jeremy Sachs</h2></contents>";
    this.billboard("menuCredit2").text =
      "<contents><h1>Audio</h1><h2>Aliceffekt</h2></contents>";
    this.billboard("menuCredit3").text =
      "<contents><h1>Testing</h1><h2>Offal</h2><h2>Tekgo</h2><h2>Orihaus</h2><h2>Minikomi</h2><h2>John Eternal</h2><h2>Richard E Flanagan</h2></contents>";
    this.billboard("menuCredit4").text =
      "<contents><h1>See You</h1><h2>wiki.xxiivv.com/nataniev</h2></contents>";

    this.billboard("vignette").image = "interface/vignette.svg";
    this.billboard("hudSave").image = "interface/save.svg";
    this.billboard("menuLogo").image = "interface/menu.logo.svg";
    this.billboard("menuControls").image = "interface/menu.controls.svg";
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
    const viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    const viewMainX = viewMain.css("left").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ left: (viewMainX - 15).toString() + "px" });
    this.billboard("hudStepLeft").alpha = 1;

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("hudStepLeft"), 0.5, 0);
  }

  animateTurnRight() {
    const viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    const viewMainX = viewMain.css("left").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ left: (viewMainX + 15).toString() + "px" });
    this.billboard("hudStepRight").alpha = 1;

    viewMain.animate({ opacity: 1, left: viewMainX + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("hudStepRight"), 0.5, 0);
  }

  animateStepForward() {
    const viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    const viewMainY = viewMain.css("top").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ top: (viewMainY + 2).toString() + "px" });
    this.billboard("hudStepForward").alpha = 1;

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("hudStepForward"), 0.5, 0);
  }

  animateStepBackward() {
    const viewMain = $(this.billboard("viewMain").element);
    viewMain.finish();
    const viewMainY = viewMain.css("top").split("px")[0];
    this.billboard("viewMain").alpha = 0.5;
    viewMain.css({ top: (viewMainY - 2).toString() + "px" });
    this.billboard("hudStepForward").alpha = 1;

    viewMain.animate({ opacity: 1, top: viewMainY + "px" }, 0.2 * 1000);

    this.fadeOut(this.billboard("hudStepForward"), 0.5, 0);
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
      display: value ? "none" : "",
      "pointer-events": value ? "none" : ""
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

  set text(value) {
    $(this.element)
      .addClass("credit")
      .html(value);
  }
}

class Trigger extends Visual {
  constructor(id, debug) {
    super("trigger", id, debug);
    this._cursorID = null;
  }

  get cursor() {
    return this._cursorID;
  }

  set cursor(value) {
    if (this._cursorID != value) {
      if (this._cursorID != null) {
        $(this.element).removeClass(this._cursorID);
      }
      this._cursorID = value;
      if (this._cursorID != null) {
        $(this.element).addClass(this._cursorID);
      }
    }
  }
}
