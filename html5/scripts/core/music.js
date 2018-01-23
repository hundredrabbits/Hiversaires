class Music {
  constructor() {
    this.playingTracksByRole = {};
    this._trackCatalog = {};
    this.ambience = null;
    this.record = null;
    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.analyser.connect(this.context.destination);
    this.data = new Uint8Array(this.analyser.frequencyBinCount);
    requestAnimationFrame(this.updateData.bind(this));
  }

  updateData() {
    requestAnimationFrame(this.updateData.bind(this));
    this.analyser.getByteFrequencyData(this.data);
    const length = this.data.length;
    let count = 0;
    const total = length * 0xff;
    for (let i = 0; i < length; i++) {
      count += this.data[i];
    }
    this.magnitude = count / total;
  }

  playEffect(name) {
    // console.info("Effect: ",name);
    let track = this.fetchTrack(
      name,
      "effect",
      "media/audio/effect/" + name + ".mp3",
      false,
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
        true,
        true
      );
      this.playingTracksByRole[role] = newTrack;
      if (DEBUG_NO_MUSIC) {
        console.info(role, ":", name, "(off by debug)");
      } else {
        console.info(role, ":", name);
        newTrack.play();
      }
    }
  }

  fetchTrack(name, role, src, loop, analyze) {
    let audioId = role + "_" + name;
    if (!(audioId in this._trackCatalog)) {
      this._trackCatalog[audioId] = new Track(name, role, src, loop, analyze);
    }
    return this._trackCatalog[audioId];
  }
}

class Track {
  constructor(name, role, src, loop, analyze) {
    this.audio = new Audio();
    this.name = name;
    this.role = role;
    this.audio.src = src;
    this.audio.loop = loop;
    this.lastTimePlayed = 0;
    if (analyze) {
      this.node = hiversaires.music.context.createMediaElementSource(
        this.audio
      );
    }
  }

  get src() {
    return this.audio.src;
  }

  get loop() {
    return this.audio.loop;
  }

  play() {
    this.lastTimePlayed = hiversaires.game.time;
    if (this.node != null) {
      this.node.connect(hiversaires.music.analyser);
    }
    this.audio.currentTime = 0;
    this.audio.play();
  }

  pause() {
    if (this.node != null) {
      this.node.disconnect();
    }
    this.audio.pause();
  }
}
