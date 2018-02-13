"use strict";

class Walkthrough {
  constructor(responder) {
    this.responder = responder;
    this.recordedPlaythrough = [
      ["center","center","left","center","center","left","center","right","center","center","right","center","left","left","center","left","center","center","center","center","right","center","center","right","center","center","left","center","center","left","center","center","right","center","right","center","center","center","center","right","center","center","right","center","center","center","center","left","center","center","left","center","center","right","center","center","left","center","right","right","center","right","center","right","center","center","left","left","center","center","right","center","left","center","center","center","center","center","center","center","left","center","center","left","center","center","right","center","center","center","right","center","center","center","left","center","left","center","center","left","left","center","right","center","center","center","center","left","center","center","center","center","left","center","center","center","center","left","center","right","center","center","left","center","center","center","right","center","center","right","center","right","center","center","left","center","center","center","center","right","center","center","center","center","left","center","center","center","center","left","center","center","center","left","center","center","center","center","left","center","center","center","center","right","center","center","center","left","center","left","center","center","center","left","center","center","center","center","right","center","center","center","center","right","center","center","center","left","center","center","center","center","left","center"],
      ["center","center","center","left","center","center","center","right","center","center","right","center","center","right","center","center","right","center","center","right","center","center","center","center","left","center","center","center","center","right","center","center","center","left","center","center","center","center","right","center","center","right","center","center","center","left","center","center","center","center","right","center","center","center","left","center"],
      ["left","center","center","center","left","center","center","center","center","right","center","center","center","left","center","center","left","center","center","center","center","center","right","center","right","center","right","center","left","center","center","center","center","right","center","center","right","center","center","center","left","center","center","center","right","center","center","left","center","center","right","center","center","center","center","center","center","center","right","center","left","center","center","center","center","right","center","center","left","center"],
      ["right","right","center","right","center","center","right","center","center","left","center","right","center","center","center","left","center","center","left","center","center","center","center","right","center","left","center","left","center","left","center","center","right","center","left","center","center","center","right","center","center","right","center","center","center","left","center","left","center"],
      ["right","right","center","left","center","center","center","left","center","right","right","center","right","center","right","center","center","left","left","center","center","right","center","left","center","center","center","center","center","center","center","left","center","center","left","center","center","right","center","center","center","right","center","center","center","left","center","center","left","center","center","center","center","center","right","center","right","center","right","center","left","center","center","center","center","right","center","center","right","center","center","center","left","center","center","center","center","right","center","center","center","left","center","left","center","center","center","left","center","center","center","center","right","center","center","center","left","center","center","left","center","center","center","center","center","left","center","center","right","right","center","left","center","center","center"],
      ["center","center","center","center","center","center","center","left","right","center","center","center","center","left","left","center","center","center","center","right","right","center","center","center","center","left","right","center","center","center","right","center","left","center","center","right","center","center","left","right","center","center","center","right","center","center","center","left","right","center","center","center","right","center","center","center","left","right","center","center","center","right","center","center","center","left","right","center","center","center","right","center","center","center","left","right","center","center","center","left","center","center","center","left","right","center","center","center","left","center","center","center","left","right","center","center","center","left","center","center","center","left","right","center","center","center","center","center","center","center","center","center","center"],
      ["center","center","right","center","center","center","center","left","center","center","right","right","center","left","center","center","center","center","right","center","center","right","center","center","left","center","center","left","center","center","right","center","right","center","center","center","center","right","center","center","right","center","center","center","center","left","center","center","left","center","center","right","center","center","left","center","left","center","right","center","center","left","center","center","right","center","center","center","center","left","center","center","left","center","center","center","center","right","center","center"],
      ["left","left","center","center","center","right","center","center","left","center","center","center","center","left","left","center","center","center","left","center","center","right","center","right","center","center","center","center","left","center","center","center","center","left","center","center","center","center","center","right","center","center","left","left","left","left"],
      ["right","center","center","right","center","center","center","center","left","center","center","center","right","center","center","left","center","center","center","right","center","center","left","center","center","right","center","right","center","center","center","center","center","right","center","center"],
    ];
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
        console.log("Walkthrough complete");
      }
    }
    // For a game once called "Dozenal Clock", it's kind of odd
    // that this is the only timer it contains. -RM
    const intervalID = setInterval(next.bind(this), speed);
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
