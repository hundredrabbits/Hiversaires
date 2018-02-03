"use strict";

class Music {
  constructor() {
    this.playingTracksByRole = new Map();
    this._trackCatalog = new Map();
    this.ambience = null;
    this.record = null;
    this._volume = 1;
  }

  get volume() {
    return this._volume;
  }

  set volume(value) {
    if (this._volume != value) {
      this._volume = value;
      for (let track of this.playingTracksByRole.values()) {
        track.volume = value;
      }
    }
  }

  playEffect(name) {
    // console.info("Effect: ",name);
    let track = this.fetchTrack(
      name,
      "effect",
      "media/audio/effect/" + name + ".mp3",
      false
    );
    if (hiversaires.game.time - track.lastTimePlayed > 5) {
      track.play();
    }
  }

  setAmbience(name) {
    if (this.ambience == name) {
      return;
    }
    this.ambience = name;
    if (
      this.playingTracksByRole.get("ambience") == null ||
      this.playingTracksByRole.get("ambience").name != name
    ) {
      this.playAmbience();
    }
  }

  setRecord(name) {
    if (this.record == name) {
      return;
    }
    this.record = name;
    if (
      this.playingTracksByRole.get("record") == null ||
      this.playingTracksByRole.get("record").name != name
    ) {
      this.playRecord();
    }
  }

  playRecord() {
    this.switchAudio("record", this.record);
  }

  playAmbience() {
    this.switchAudio("ambience", this.ambience);
  }

  switchAudio(role, name) {
    let oldTrack = this.playingTracksByRole.get(role);

    if (oldTrack != null) {
      if (oldTrack.name == name) {
        return;
      }
      oldTrack.pause();
    }

    if (name != null) {
      let newTrack = this.fetchTrack(
        name,
        role,
        "media/audio/" + role + "/" + name + ".mp3",
        true
      );
      this.playingTracksByRole.set(role, newTrack);
      newTrack.volume = this._volume;
      if (DEBUG_NO_MUSIC) {
        console.info(role, ":", name, "(off by debug)");
      } else {
        console.info(role, ":", name);
        newTrack.play();
      }
    }
  }

  fetchTrack(name, role, src, loop) {
    let audioID = role + "_" + name;
    if (!this._trackCatalog.has(audioID)) {
      this._trackCatalog.set(audioID, new Track(name, role, src, loop));
    }
    return this._trackCatalog.get(audioID);
  }
}

class Track extends Audio {
  constructor(name, role, src, loop) {
    super();
    this.name = name;
    this.role = role;
    this.src = src;
    this.loop = loop;
    this.lastTimePlayed = 0;
  }

  play() {
    this.lastTimePlayed = hiversaires.game.time;
    this.currentTime = 0;
    super.play();
  }
}
