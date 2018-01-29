class Keyboard {
  constructor() {
    this.locks = [];
    this.history = "";
  }

  onKey(event) {
    if (this.locks.length > 0) {
      console.warn("Keyboard has locks: ", this.locks);
      return;
    }

    switch (event.keyCode) {
      case 37: // left
        hiversaires.dozenal.moveLeft();
        break;
      case 39: // right
        hiversaires.dozenal.moveRight();
        break;
      case 38: // up
        if (hiversaires.dozenal.currentAction != null) {
          hiversaires.dozenal.action();
        } else {
          hiversaires.dozenal.moveForward();
        }
        break;
      case 40: // down
        hiversaires.dozenal.moveBackward();
        break;
    }

    this.record(event.key);
  }

  lock(lockName) {
    console.log("Added lock: ", lockName);
    this.locks.push(lockName);
  }

  unlock(lockName) {
    let target = this.locks.indexOf(lockName);
    if (target > -1) {
      this.locks.splice(target, 1);
      console.info("Unlocked: ", lockName);
    } else {
      console.warn("No lock named: ", lockName);
    }
  }

  record(key) {
    if (this.history.length > 30) {
      this.history = this.history.substr(this.history.length - 30, 30);
    }
    this.history += event.key;
  }
}
