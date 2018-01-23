class Game {
  constructor() {
    this.time = 0;
  }

  start() {
    setTimeout(this.onTic.bind(this), 50);
    if (DEBUG_LOG_GHOST) {
      this.save(0);
    }
    this.load(this.state);
  }

  save(id) {
    if (DEBUG_DONT_SAVE) {
      return;
    }
    localStorage;
  }

  load(id) {
    localStorage;
  }

  erase() {
    localStorage.clear();
  }

  onTic() {
    setTimeout(this.onTic.bind(this), 50);
    this.time += this.gameSpeed;
  }
}
