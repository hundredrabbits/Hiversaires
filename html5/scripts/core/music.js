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
      for (let key in this.playingTracksByRole) {
        this.playingTracksByRole[key].volume = value;
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
      this.playingTracksByRole["ambience"] == null ||
      this.playingTracksByRole["ambience"].name != name
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
      this.playingTracksByRole["record"] == null ||
      this.playingTracksByRole["record"].name != name
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
    let oldTrack = this.playingTracksByRole[role];

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
      this.playingTracksByRole[role] = newTrack;
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
    let audioId = role + "_" + name;
    if (!(audioId in this._trackCatalog)) {
      this._trackCatalog[audioId] = new Track(name, role, src, loop);
    }
    return this._trackCatalog[audioId];
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
