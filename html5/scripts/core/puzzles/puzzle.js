class Puzzle {
  constructor(id, info, defaultState) {
    this.id = id;
    this.info = Object.freeze(info);
    this.defaultState = defaultState != null ? defaultState : 0;
    this._state = { value: this.defaultState }; // boxed, so it can be mutated
  }

  get state() {
    return this._state.value;
  }

  set state(value) {
    this._state.value = value;
  }

  setup(hh) {}
}
