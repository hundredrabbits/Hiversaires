"use strict";

class Walkthrough {
  constructor(responder) {
    this._running = false;
    this.responder = responder;
    this.recordedPlaythrough = [
      [
        "forward","forward","left","forward","forward","left","action","right","forward","forward","right",
        "action","left","left","forward","left","forward","forward","action","action","right",
        "action","action","right","forward","forward","left","action","action","left","action",
        "action","right","forward","right","forward","action","action","forward","right","forward",
        "forward","right","action","action","forward","forward","left","forward","forward","left",
        "action","action","right","action","action","left","action","right","right","action",
        "right","forward","right","action","action","left","left","forward","forward","right",
        "forward","left","forward","forward","action","action","forward","forward","forward","left",
        "forward","forward","left","action","action","right","action","action","forward","right",
        "forward","forward","forward","left","forward","left","action","action","left","left",
        "forward","right","forward","action","action","forward","left","forward","forward","forward",
        "forward","left","action","action","forward","forward","left","forward","right","action",
        "action","left","action","action","forward","right","forward","forward","right","action",
        "right","forward","forward","left","forward","action","action","forward","right","forward",
        "action","action","forward","left","forward","forward","forward","forward","left","action",
        "action","forward","left","forward","forward","forward","forward","left","action","action",
        "forward","forward","right","forward","forward","forward","left","action","left","forward",
        "forward","forward","left","forward","action","action","forward","right","forward","forward",
        "forward","forward","right","action","action","forward","left","forward","forward","forward",
        "forward","left","action","action","forward","forward","left","forward","action","action",
        "right","forward","forward","right","action","action","right","forward","forward","right",
        "forward","action","right","forward","forward","forward","forward","left","forward","action",
        "action","forward","right","forward","action","action","left","action","action","forward",
        "forward","right","forward","forward","right","forward","forward","forward","left","action",
        "action","forward","forward","right","forward","forward","forward","left","action","left",
        "forward","forward","forward","left","forward","action","action","forward","right","forward",
        "forward","forward","left","forward","forward","left","forward","forward","forward","action",
        "action","right","forward","right","action","right","forward","left","action","action",
        "forward","forward","right","forward","forward","right","forward","forward","forward","left",
        "action","action","forward","right","action","action","left","forward","forward","right",
        "forward","forward","forward","action","action","forward","forward","right","forward","left",
        "forward","forward","action","action","right","action","action","left","action","right",
        "right","action","right","forward","forward","right","forward","action","left","forward",
        "right","action","action","forward","left","forward","forward","left","action","action",
        "forward","forward","right","forward","left","forward","left","action","left","forward",
        "forward","right","forward","left","action","action","forward","right","forward","forward",
        "right","action","action","forward","left","forward","left","action","right","right",
        "forward","left","forward","action","action","left","action","right","right","action",
        "right","forward","right","action","action","left","left","forward","forward","right",
        "forward","left","forward","forward","action","action","forward","forward","forward","left",
        "forward","forward","left","action","action","right","action","action","forward","right",
        "forward","forward","forward","left","forward","forward","left","forward","forward","forward",
        "action","action","right","forward","right","action","right","forward","left","action",
        "action","forward","forward","right","forward","forward","right","forward","forward","forward",
        "left","action","action","forward","forward","right","forward","forward","forward","left",
        "action","left","forward","forward","forward","left","forward","action","action","forward",
        "right","forward","forward","forward","left","forward","forward","left","forward","forward",
        "forward","action","action","left","action","action","right","right","forward","left",
        "forward","action","action","forward","forward","forward","action","action","forward","forward",
        "left","right","action","forward","forward","forward","left","left","forward","forward",
        "action","forward","right","right","action","forward","forward","forward","left","right",
        "forward","forward","forward","right","forward","left","action","action","right","forward",
        "action","left","right","forward","forward","forward","right","forward","forward","action",
        "left","right","forward","forward","forward","right","forward","forward","action","left",
        "right","forward","forward","forward","right","forward","forward","action","left","right",
        "forward","forward","forward","right","forward","forward","action","left","right","forward",
        "forward","forward","left","forward","forward","action","left","right","forward","forward",
        "forward","left","forward","forward","action","left","right","forward","forward","forward",
        "left","forward","forward","action","left","right","forward","forward","forward","forward",
        "action","forward","forward","forward","forward","forward","forward","forward","right","forward",
        "forward","forward","forward","left","action","action","right","right","forward","left",
        "forward","forward","action","action","right","action","action","right","forward","forward",
        "left","action","action","left","action","action","right","forward","right","forward",
        "action","action","forward","right","forward","forward","right","action","action","forward",
        "forward","left","forward","forward","left","action","action","right","action","action",
        "left","action","left","forward","right","action","action","left","forward","forward",
        "right","forward","action","action","forward","left","forward","forward","left","action",
        "action","forward","forward","right","forward","action","left","left","forward","forward",
        "forward","right","action","action","left","action","action","forward","action","left",
        "left","forward","action","action","left","action","action","right","forward","right",
        "forward","action","action","forward","left","forward","forward","forward","forward","left",
        "action","action","forward","forward","forward","right","action","action","right","forward",
        "forward","right","forward","forward","forward","forward","left","action","action","forward",
        "right","action","action","left","forward","forward","forward","right","forward","forward",
        "left","action","action","right","forward","right","action","action","forward","action",
        "action","right","action","action",
      ]
    ];
  }

  get running() {
    return this._running;
  }

  playEntireGame(speed = 250) {
    hiversaires.game.wipePlayerProgress();
    hiversaires.refreshNode();

    const flattenedPlaythrough = [].concat.apply([], this.recordedPlaythrough);

    let index = 0;
    function next() {
      this.responder(flattenedPlaythrough[index]);
      index++;
      if (index > flattenedPlaythrough.length) {
        clearInterval(intervalID);
        this._running = false;
        console.log("Walkthrough complete");
      }
    }
    // For a game once called "Dozenal Clock", it's kind of odd
    // that this is the only timer it contains. -RM
    const intervalID = setInterval(next.bind(this), speed);
    this._running = true;
  }

  beginRecording() {
    hiversaires.game.wipePlayerProgress();
    hiversaires.refreshNode();
    this.playthroughs = [];
    this.playthrough = [];
    this.checkpoint();
    // Hijacks the keyboard responder. At the moment I choose not to care. -RM
    const keyboardResponder = hiversaires.keyboard.responder;
    function captureKey(input) {
      this.playthrough.push(input);
      keyboardResponder(input);
    }
    hiversaires.keyboard.responder = captureKey.bind(this);
    function onKey(event) {
      if (event.keyCode == 32) {
        this.checkpoint();
      }
    }
    document.addEventListener("keyup", onKey.bind(this));
  }

  checkpoint() {
    if (this.playthrough.length == 0) {
      return;
    }
    const game = hiversaires.game;
    this.playthroughs.push({
      nodeID: game.userNodeID,
      orientation: game.userOrientation,
      chapter: game.userChapter,
      playthrough: this.playthrough
    });
    this.playthrough = [];

    const savedPlaythrough = JSON.stringify(this.playthroughs);
    localStorage.savedPlaythrough = savedPlaythrough;
    
    console.clear();
    console.log(savedPlaythrough);
  }
}
