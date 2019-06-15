'use strict'

class ClockTerminal extends Puzzle {
  constructor (id) {
    super(id)
  }

  setup () {
    hiversaires.interface.flashVignette()
    hiversaires.music.playEffect('action_EnergyInit')
    this.update()
  }

  update () {
    hiversaires.interface.showClock()

    hiversaires.stage.billboard('clockFace').image =
      'interface/dimclock.state' + hiversaires.game.puzzleState.clock + '.svg'

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard('clockShadow'),
      1.5,
      0.5
    )
    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard('clockFace'),
      0.5,
      0.5
    )
  }

  performAction () {
    hiversaires.game.puzzleState.clock =
      (hiversaires.game.puzzleState.clock + 1) % 3
    hiversaires.music.playEffect('action_EnergyActive')
    this.update()
  }
}
