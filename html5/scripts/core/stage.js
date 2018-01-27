class Stage {
  constructor(root) {
    this.root = root;
    this.billboardsByID = {};
    this.triggersByID = {};
  }

  start() {
    for (let id of [
      "viewMain",
      "vignette",
      "graphic1",
      "graphic2",
      "graphic3",
      "graphic4",
      "graphic5",
      "graphic6",
      "graphic7",
      "graphic8",
      "graphic9",
      "graphic10",
      "interfaceDimclockBackground",
      "interfaceDimclock",
      "interfaceFuseBackground",
      "interfaceFuse1",
      "interfaceSealBackground",
      "interfaceSeal1",
      "interfaceSeal2",
      "interfaceAudio",
      "interfaceSave",
      "interfaceIllusion",
      "interfaceIndicatorRight",
      "interfaceIndicatorForward",
      "interfaceIndicatorLeft"
    ]) {
      let billboard = this.root.appendChild(
        document.createElement("billboard")
      );
      billboard.id = id;
      this.billboardsByID[id] = billboard;
    }

    function handleClick(event) {
      hiversaires.dozenal[event.currentTarget.id](); // Ugh. Temporary. It's temporary!
    }

    for (let id of [
      "moveRight",
      "moveLeft",
      "moveForward",
      "action1",
      "action2",
      "action3",
      "action4",
      "action5",
      "actionCredit"
    ]) {
      let trigger = this.root.appendChild(document.createElement("trigger"));
      trigger.id = id;
      trigger.addEventListener("click", handleClick);
      this.triggersByID[id] = trigger;
    }
  }
}
