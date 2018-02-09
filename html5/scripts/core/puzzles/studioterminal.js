class StudioTerminal extends Puzzle {
  constructor(id, info, defaultState) {
    super(id, info, defaultState);
  }

  setup(hh) {
    hh.templateVignette();
    hh.stage.setHidden(hh.stage.billboard("overlay"), true);
    hiversaires.music.playEffect("action_DoorInit");
    hh.templateSealInterface();

    const seals = hh.currentSeals;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;

    if (containsStones && containsAntechannel) {
      // Act 4 : Antechannel + Stones in Studio
      hh.setCurrentAction(
        function() {
          hh.game.puzzleState[hh.currentPuzzle.id] =
            (hh.game.puzzleState[hh.currentPuzzle.id] + 1) % 2;
          hiversaires.music.playEffect("action_EnergyActive");
          this.templateUpdateStudioTerminal(hh);
        }.bind(this)
      );
      hh.game.save();
    }

    this.templateUpdateStudioTerminal(hh);
  }

  templateUpdateStudioTerminal(hh) {
    const seals = hh.currentSeals;
    const containsAntechannel = seals.indexOf(Zone.antechannel) != -1;
    const containsStones = seals.indexOf(Zone.stones) != -1;

    let modifier = null;

    if (hh.game.puzzleState[this.id] == 1) {
      modifier = "unlocked";
      hh.game.userChapter = Chapter.act5;
      hh.updateMusic();
    } else {
      if (containsStones && containsAntechannel) {
        modifier = "both";
      } else if (containsStones && !containsAntechannel) {
        modifier = "stones";
      } else if (!containsStones && containsAntechannel) {
        modifier = "antechannel";
      }

      if (hh.game.userChapter == Chapter.act5) {
        hh.game.userChapter = Chapter.act4;
        hh.updateMusic();
      }
    }

    if (modifier != null) {
      hh.setModifier(modifier);
      hh.showModifier();
    } else {
      hh.hideModifier();
    }
  }
}
