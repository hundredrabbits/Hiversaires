'use strict'

class Door extends Puzzle {
  constructor (id, fadeDuration = 0, silent = false) {
    super(id)
    this.fadeDuration = fadeDuration
    this.silent = silent
    this._isOpen = { value: false }
  }

  setup () {
    this.isOpen = false
  }

  openDoor () {
    this.isOpen = true
    hiversaires.showModifier(this.fadeDuration)
  }

  walkThroughDoor () {
    if (this.silent) {
      hiversaires.playFootStep()
    } else {
      hiversaires.music.playEffect('action_DoorActive')
    }
    const subject = hiversaires.currentSubject
    let changed = false
    if (this.isAlternateUnlocked) {
      changed = true
      hiversaires.game.userNodeID = subject.alternateNodeID
      if (subject.alternateOrientation != null) {
        hiversaires.game.userOrientation = subject.alternateOrientation
      }
    } else if (this.isUnlocked) {
      changed = true
      hiversaires.game.userNodeID = subject.nodeID
      if (subject.orientation != null) {
        hiversaires.game.userOrientation = subject.orientation
      }
    }

    if (changed) {
      this.isOpen = false
      hiversaires.refreshNode()
    }
  }

  get isUnlocked () {
    return false
  }

  get isAlternateUnlocked () {
    return false
  }

  get active () {
    return this.isUnlocked || this.isAlternateUnlocked
  }

  get isOpen () {
    return this._isOpen.value
  }

  set isOpen (value) {
    this._isOpen.value = value
  }

  performAction () {
    if (this.isOpen) {
      this.walkThroughDoor()
    } else {
      this.openDoor()
    }
  }
}
