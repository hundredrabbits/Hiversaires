class StudioTerminal extends Puzzle {
  constructor(id) {
    super(id);
  }

  setup() {
    hiversaires.templateVignette();
    hiversaires.stage.setHidden(hiversaires.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hiversaires.templateSealInterface();

    const seals = hiversaires.currentSeals;
    const containsAntechannel = seals.includes(Zone.antechannel);
    const containsStones = seals.includes(Zone.stones);

    if (containsStones && containsAntechannel) {
      // Act 4 : Antechannel + Stones in Studio
      hiversaires.setCurrentAction(
        function() {
          hiversaires.game.puzzleState.studio = !hiversaires.game.puzzleState
            .studio;
          hiversaires.music.playEffect("action_EnergyActive");
          this.templateUpdateStudioTerminal();
        }.bind(this)
      );
      hiversaires.game.save();
    }

    this.templateUpdateStudioTerminal();
  }

  templateUpdateStudioTerminal() {
    const seals = hiversaires.currentSeals;
    const containsAntechannel = seals.includes(Zone.antechannel);
    const containsStones = seals.includes(Zone.stones);

    let modifier = null;

    if (hiversaires.game.puzzleState.studio) {
      modifier = "unlocked";
      hiversaires.game.userChapter = Chapter.act5;
      hiversaires.updateMusic();
    } else {
      if (containsStones && containsAntechannel) {
        modifier = "both";
      } else if (containsStones && !containsAntechannel) {
        modifier = "stones";
      } else if (!containsStones && containsAntechannel) {
        modifier = "antechannel";
      }

      if (hiversaires.game.userChapter == Chapter.act5) {
        hiversaires.game.userChapter = Chapter.act4;
        hiversaires.updateMusic();
      }
    }

    if (modifier != null) {
      hiversaires.setModifier(modifier);
      hiversaires.showModifier();
    } else {
      hiversaires.hideModifier();
    }
  }
}
