class Stage {
  constructor(root) {
    this.root = root;
    this.billboardsByID = {};
    this.triggersByID = {};
  }

  start() {
    this.billboards = this.root.appendChild(
      document.createElement("billboards")
    );
    if (DEBUG_SHOW_BILLBOARDS) {
      this.billboards.className = "debug";
    }

    this.triggers = this.root.appendChild(document.createElement("triggers"));
    if (DEBUG_SHOW_TRIGGERS) {
      this.triggers.className = "debug";
    }

    for (let id of [
      "viewMain",
      "vignette",
      "overlay",
      "menu1",
      "menu2",
      "menu3",
      "menu4",
      "menu5",
      "menu6",
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

    for (let id of [
      "moveRight",
      "moveLeft",
      "moveForward",
      "action",
      "actionCredit"
    ]) {
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
