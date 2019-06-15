'use strict'

class ProgressTerminal extends Puzzle {
  constructor (id) {
    super(id)
  }

  setup () {
    hiversaires.interface.flashVignette()
    hiversaires.game.save()

    hiversaires.stage.billboard('progressPane').image =
      'interface/progress.' + hiversaires.game.userChapter + '.svg'

    hiversaires.stage.fadeIn(
      hiversaires.stage.billboard('progressPane'),
      0.5,
      0.3
    )
  }
}
