class Keyboard {
  constructor() {
    this.locks = [];
    this.history = "";
  }

  listen_onkeydown(event) {}

  listen_onkeyup(event) {
    if (this.locks.length > 0) {
      console.warn("Keyboard has locks: ", this.locks);
      return;
    }

    switch (event.keyCode) {
    // TODO
    }

    this.record(event.key);
  }

  lock(lock_name) {
    console.log("Added lock: ", lock_name);
    this.locks.push(lock_name);
  }

  unlock(lock_name) {
    var target = this.locks.indexOf(lock_name);
    if (target > -1) {
      this.locks.splice(target, 1);
      console.info("Unlocked: ", lock_name);
    } else {
      console.warn("No lock named: ", lock_name);
    }
  }

  record(key) {
    if (this.history.length > 30) {
      this.history = this.history.substr(this.history.length - 30, 30);
    }
    this.history += event.key;
  }
}
