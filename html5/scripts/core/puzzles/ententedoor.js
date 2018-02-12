"use strict";

class EntenteDoor extends Door {
  constructor(id, goal) {
    super(id, 0, true);
    this.goal = goal;
  }

  get isUnlocked() {
    return true;
  }

  setup() {
    super.setup();
    if (
      hiversaires.currentSubject.effect == MazeEffect.exit &&
      this.isAlternateUnlocked
    ) {
      hiversaires.setModifier("exit");
      hiversaires.showModifier();
    }
  }

  get isAlternateUnlocked() {
    let subject = hiversaires.currentSubject;
    if (subject.alternateNodeID == null) {
      return false;
    }
    let userMaze = hiversaires.game.userMaze;
    if (subject.effect == MazeEffect.exit) {
      return (
        userMaze.get(MazeAxis.x) == this.goal.get(MazeAxis.x) &&
        userMaze.get(MazeAxis.y) == this.goal.get(MazeAxis.y)
      );
    }
    let axis = subject.axis;
    return userMaze.get(axis) == this.goal.get(axis);
  }

  performAction() {
    let subject = hiversaires.currentSubject;
    let isAlternateUnlocked = this.isAlternateUnlocked;
    let userMaze = hiversaires.game.userMaze;
    if (!isAlternateUnlocked) {
      let axis = subject.axis;
      let amount = subject.amount;
      let axisValue = userMaze.get(axis);
      let axisGoal = this.goal.get(axis);
      switch (subject.effect) {
        case MazeEffect.incr:
          if (axisValue < axisGoal + 2 * amount) {
            userMaze.set(axis, userMaze.get(axis) + amount);
            if (DEBUG_PRINT_MAZE) {
              console.log(
                "Adding",
                amount,
                "to",
                axis,
                "so now it's",
                userMaze.get(axis)
              );
            }
          }
          break;
        case MazeEffect.decr:
          if (axisValue > axisGoal - 2 * amount) {
            userMaze.set(axis, userMaze.get(axis) - amount);
            if (DEBUG_PRINT_MAZE) {
              console.log(
                "Taking",
                amount,
                "from",
                axis,
                "so now it's",
                userMaze.get(axis)
              );
            }
          }
          break;
      }
    }
    this.walkThroughDoor();
    if (isAlternateUnlocked && subject.effect == MazeEffect.exit) {
      userMaze.set(MazeAxis.x, 0);
      userMaze.set(MazeAxis.y, 0);
    }
  }
}
