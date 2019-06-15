'use strict'

class Walkthrough {
  constructor (responder) {
    this._running = false
    this.responder = responder

    const inputs = new Map([
      ['a', Input.action],
      ['l', Input.left],
      ['r', Input.right],
      ['f', Input.forward],
      ['b', Input.backward]
    ])
    this.recordedPlaythrough = [].concat.apply(
      [],
      [
        'fflfflarffrallflffaaraarfflaalaarfrfaafrffraafflfflaaraalarrarfraallffrflff',
        'aaf3lfflaaraafrf3lflaallfrfaaflf4laafflfraalaafrffrarfflfaafrfaaflf4laa',
        'flf4laaffrf3lalf3lfaafrf4raaflf4laafflfaarffraarffrfarf4lf',
        'aafrfaalaaffrffrf3laaffrf3lalf3lfaafrf3lfflf3aarfrarflaaffrffrf3laafraalffrf3',
        'aaffrflffaaraalarrarffrfalfraaflfflaaffrflfla',
        'lffrflaafrffraaflflarrflfaalarrarfraallffrflff',
        'aaf3lfflaaraafrf3lfflf3aarfrarflaaffrffrf3laaffrf3lalf3lfaafrf3lfflf3aalaarrflf',
        'aaf3aafflraf3llffafrraf3lrf3rflaarfalrf3rffalrf3rffalrf3rffalrf3rffalrf3lffalrf3lffalrf3lffalrf4af7rf4laarrflffaaraarfflaa',
        'laarfrfaafrffraafflfflaaraalalfraalffrfaaflfflaaffrfallf3raalaarffaarrffrfallfaa',
        'laarfrfaaflf4laaf3raarffrf4laafraalf3rfflaarfraafaaraa'
      ]
        .join('')
        .replace(/([a-z]\d*)/g, '$1,')
        .split(',')
        .map(function (step) {
          const token = step.charAt(0)
          const amount = step.length > 1 ? parseInt(step.substr(1)) : 1
          let output = []
          for (let i = 0; i < amount; i++) {
            output.push(inputs.get(token))
          }
          return output
        })
    )
  }

  get running () {
    return this._running
  }

  playEntireGame (speed = 250) {
    hiversaires.game.erase()
    hiversaires.refreshNode()

    let index = 0
    function next () {
      this.responder(this.recordedPlaythrough[index])
      index++
      if (index > this.recordedPlaythrough.length) {
        clearInterval(intervalID)
        this._running = false
        console.log('Walkthrough complete')
      }
    }
    // For a game once called "Dozenal Clock", it's kind of odd
    // that this is the only timer it contains. -RM
    const intervalID = setInterval(next.bind(this), speed)
    this._running = true
  }

  beginRecording () {
    hiversaires.game.erase()
    hiversaires.refreshNode()
    this.playthroughs = []
    this.playthrough = []
    this.checkpoint()
    // Hijacks the keyboard responder. At the moment I choose not to care. -RM
    const keyboardResponder = hiversaires.keyboard.responder
    function captureKey (input) {
      this.playthrough.push(input)
      keyboardResponder(input)
    }
    hiversaires.keyboard.responder = captureKey.bind(this)
    function onKey (event) {
      if (event.keyCode == 32) {
        this.checkpoint()
      }
    }
    document.addEventListener('keyup', onKey.bind(this))
  }

  checkpoint () {
    if (this.playthrough.length == 0) {
      return
    }
    const game = hiversaires.game
    this.playthroughs.push({
      nodeID: game.userNodeID,
      orientation: game.userOrientation,
      chapter: game.userChapter,
      playthrough: this.playthrough
    })
    this.playthrough = []

    const savedPlaythrough = JSON.stringify(this.playthroughs)
    localStorage.savedPlaythrough = savedPlaythrough

    console.clear()
    console.log(savedPlaythrough)
  }
}
