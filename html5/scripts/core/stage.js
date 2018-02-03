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
      this.billboardsByID[id] = billboard;
    }

    function handleClick(event) {
      hiversaires.dozenal[event.currentTarget.id](); // Ugh. Temporary. It's temporary!
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
      this.triggersByID[id] = trigger;
    }
  }
}
