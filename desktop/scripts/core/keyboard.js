"use strict";

class Keyboard {
  constructor(responder) {
    this.responder = responder;
    document.addEventListener("keyup", this.onKey.bind(this));
    this.keyMap = new Map();
    this.keyMap.set(37, Input.left); // left arrow
    this.keyMap.set(39, Input.right); // right arrow
    this.keyMap.set(38, Input.center); // up arrow
    this.keyMap.set(40, Input.back); // down arrow
  }

  onKey(event) {
    if (this.keyMap.has(event.keyCode)) {
      this.responder(this.keyMap.get(event.keyCode));
      event.preventDefault();
    }
  }
}
