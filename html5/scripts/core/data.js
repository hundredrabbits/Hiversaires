"use strict";

class Chapter {}
setEnumValues(Chapter, ["act1", "act2", "act3", "act4", "act5", "credit"]);

class Zone {}
setEnumValues(Zone, [
  "antechannel",
  "capsule",
  "circular",
  "entente",
  "forest",
  "metamondst",
  "nataniev",
  "rainre",
  "stones",
  "studio"
]);

const recordsByChapter = (function() {
  let recordsByChapter = new Map();
  recordsByChapter.set(Chapter.act1, "music_act1");
  recordsByChapter.set(Chapter.act2, "music_act2");
  recordsByChapter.set(Chapter.act3, "music_act3");
  recordsByChapter.set(Chapter.act4, "music_act4");
  recordsByChapter.set(Chapter.act5, "music_act5");
  recordsByChapter.set(Chapter.credit, "music_credit");
  return Object.freeze(recordsByChapter);
})();

const ambienceByZone = (function() {
  let ambienceByZone = new Map();
  ambienceByZone.set(Zone.antechannel, "ambient_antechannel");
  ambienceByZone.set(Zone.capsule, "ambient_capsule");
  ambienceByZone.set(Zone.circular, "ambient_circular");
  ambienceByZone.set(Zone.entente, null); // Weird omission, eh?
  ambienceByZone.set(Zone.forest, "ambient_forest");
  ambienceByZone.set(Zone.metamondst, "ambient_metamondst");
  ambienceByZone.set(Zone.nataniev, "ambient_nataniev");
  ambienceByZone.set(Zone.rainre, "ambient_rainre");
  ambienceByZone.set(Zone.stones, "ambient_stones");
  ambienceByZone.set(Zone.studio, "ambient_studio");
  return Object.freeze(ambienceByZone);
})();

class SubjectType {}
setEnumValues(SubjectType, ["node", "puzzle", "none"]);

class Node {
  constructor(id, zone, subjects) {
    this.id = id;
    this.zone = zone;
    this.subjects = subjects;
    Object.freeze(this);
  }
}

const nodesByID = (function() {
  let nodesByID = new Map();

  function addNode(id, zone, subject0, subject1, subject2, subject3) {
    nodesByID.set(
      id,
      Object.freeze(
        new Node(id, zone, [subject0, subject1, subject2, subject3])
      )
    );
  }

  function node(nodeID, orientation) {
    return Object.freeze({
      type: SubjectType.node,
      nodeID: nodeID,
      orientation: orientation
    });
  }

  function puzzle(puzzleID) {
    return Object.freeze({ type: SubjectType.puzzle, puzzleID: puzzleID });
  }

  const none = Object.freeze({ type: SubjectType.none });

  // ====================
  // Forest ( 0 - 11 )
  // ====================

  addNode(0, Zone.forest, node(1), none, none, none);
  addNode(1, Zone.forest, node(2), none, puzzle(28), none);

  // addNode(1, Zone.forest, node(46), none, none, none);

  addNode(2, Zone.forest, node(3), none, node(1), none);
  addNode(3, Zone.forest, node(11), node(10, 2), node(2), node(4, 0));
  addNode(4, Zone.forest, node(5), none, node(3, 1), none);
  addNode(5, Zone.forest, node(6), none, node(4), puzzle(4));
  addNode(6, Zone.forest, node(7, 1), none, node(5), none);
  addNode(7, Zone.forest, node(12), node(8, 0), puzzle(1), node(6, 2));
  addNode(8, Zone.forest, node(9, 2), none, node(7, 3), none);
  addNode(9, Zone.forest, node(8, 2), none, node(10, 0), none);

  addNode(10, Zone.forest, node(3, 3), none, node(9, 0), none);
  addNode(11, Zone.forest, puzzle(25), none, node(3), none);
  addNode(12, Zone.forest, puzzle(3), none, node(7), node(14, 0));
  addNode(13, Zone.studio, node(17), node(15), puzzle(3), puzzle(2));
  addNode(14, Zone.forest, node(18), none, node(12, 1), none);
  addNode(15, Zone.studio, node(16), none, none, node(13));
  addNode(16, Zone.studio, node(21), puzzle(7), node(15), node(17));
  addNode(17, Zone.studio, node(20), node(16), node(13), none);
  addNode(18, Zone.forest, puzzle(31), puzzle(2), node(14), none);
  addNode(19, Zone.studio, none, node(20), puzzle(5), none);

  addNode(20, Zone.studio, puzzle(6), node(21), node(17), node(19));
  addNode(21, Zone.studio, puzzle(35), none, node(16), node(20));
  addNode(22, Zone.circular, none, node(23), none, node(16));
  addNode(23, Zone.circular, node(30), puzzle(16), node(24), puzzle(7));
  addNode(24, Zone.circular, node(23), none, node(25), none);
  addNode(25, Zone.circular, node(24), none, node(26), puzzle(8));
  addNode(26, Zone.circular, node(25), none, node(27), none);
  addNode(27, Zone.circular, node(26), none, node(28), puzzle(9));
  addNode(28, Zone.circular, node(27), none, node(29), none /*puzzle(40)*/);
  addNode(29, Zone.circular, node(28), none, node(30), node(33, 0));

  addNode(30, Zone.circular, node(29), none, node(23), none);
  addNode(31, Zone.circular, node(25, 1), none, node(35), none);
  addNode(32, Zone.studio, none, node(52), none, node(27, 1));
  addNode(33, Zone.circular, puzzle(14), none, node(29, 1), none);
  addNode(34, Zone.entente, puzzle(37), none, none, node(39));
  addNode(35, Zone.stones, puzzle(8), node(38), node(36), none);
  addNode(36, Zone.stones, node(35), node(37), none, none);
  addNode(37, Zone.stones, node(38), node(39), none, node(36));
  addNode(38, Zone.stones, puzzle(12), none, node(37), node(35));
  addNode(39, Zone.stones, puzzle(10), puzzle(11), node(40), node(37));

  addNode(40, Zone.stones, node(39), none, node(41), none);
  addNode(41, Zone.stones, node(40), none, none, node(42));
  addNode(42, Zone.stones, none, node(41), node(44), node(43));
  addNode(43, Zone.stones, none, node(42), none, puzzle(35));
  addNode(44, Zone.stones, node(42), none, node(46), none);
  addNode(45, Zone.rainre, puzzle(13), none, puzzle(1), node(39));
  addNode(46, Zone.stones, node(44), none, puzzle(15), none);
  addNode(47, Zone.antechannel, none, node(48), node(77), none);
  addNode(48, Zone.antechannel, puzzle(25), none, node(49), node(47));
  addNode(49, Zone.antechannel, node(48), none, puzzle(21), node(77));
  addNode(50, Zone.nataniev, none, none, puzzle(41), none);
  addNode(51, Zone.nataniev, none, none, node(64), none);

  addNode(52, Zone.antechannel, node(54), node(53), none, puzzle(9));
  addNode(53, Zone.antechannel, node(55), node(84), none, node(52));
  addNode(54, Zone.antechannel, node(57), node(55), node(52), none);
  addNode(55, Zone.antechannel, puzzle(39), node(56), node(53), node(54));
  addNode(56, Zone.antechannel, node(58), none, node(84), node(55));
  addNode(57, Zone.antechannel, node(59), none, node(54), none);
  addNode(58, Zone.antechannel, node(60), none, node(56), none);
  addNode(59, Zone.antechannel, node(61), none, node(57), none);

  addNode(60, Zone.antechannel, node(62), none, node(56), none);
  addNode(61, Zone.antechannel, none, none, node(59), puzzle(19));
  addNode(62, Zone.antechannel, puzzle(26), none, node(60), none);
  addNode(63, Zone.metamondst, node(73), node(69), none, node(67));
  addNode(64, Zone.nataniev, node(63), none, none, none);
  addNode(65, Zone.entente, none, none, puzzle(46), none);
  addNode(67, Zone.metamondst, node(74), node(63), none, node(70));
  addNode(69, Zone.metamondst, puzzle(18), puzzle(19), none, node(63));

  addNode(70, Zone.metamondst, node(75), node(67), none, none);
  addNode(72, Zone.metamondst, none, node(61), none, node(69));
  addNode(73, Zone.metamondst, node(81), none, node(63), none);
  addNode(74, Zone.metamondst, node(80), none, node(67), none);
  addNode(75, Zone.metamondst, node(76), none, node(70), none);
  addNode(76, Zone.metamondst, none, none, node(75), puzzle(30));
  addNode(77, Zone.antechannel, node(47), node(49), puzzle(26), puzzle(27));
  addNode(78, Zone.metamondst, node(83), none, none, node(81));
  addNode(79, Zone.capsule, none, puzzle(33), node(87), none);

  addNode(80, Zone.metamondst, node(85), none, node(74), none);
  addNode(81, Zone.metamondst, node(82), node(78), node(73), none);
  addNode(82, Zone.metamondst, none, node(83), node(81), puzzle(20));
  addNode(83, Zone.metamondst, none, none, node(78), node(82));
  addNode(84, Zone.antechannel, node(56), none, puzzle(47), node(53));
  addNode(85, Zone.metamondst, puzzle(15), none, node(80), node(86));
  addNode(86, Zone.metamondst, none, node(85), none, puzzle(1));
  addNode(87, Zone.capsule, node(79), puzzle(30), none, node(88));
  addNode(88, Zone.capsule, none, node(87), none, node(141));

  addNode(89, Zone.entente, puzzle(42), none, node(90), none);
  addNode(90, Zone.entente, node(89), none, node(91), none);
  addNode(91, Zone.entente, node(90), puzzle(23), node(103), none);

  addNode(92, Zone.entente, node(91), none, node(93), none);
  addNode(93, Zone.entente, node(92), none, node(94), none);
  addNode(94, Zone.entente, node(93), none, node(95), none);
  addNode(95, Zone.entente, node(94), puzzle(24), node(96), none);
  addNode(96, Zone.entente, node(95), none, node(97), none);
  addNode(97, Zone.entente, node(96), none, node(98), none);
  addNode(98, Zone.entente, node(97), node(99), node(65), node(101));
  addNode(99, Zone.entente, none, node(100), none, node(98));
  addNode(100, Zone.entente, none, puzzle(44), none, node(99));
  addNode(101, Zone.entente, none, node(98), puzzle(38), node(102));
  addNode(102, Zone.entente, none, node(101), none, puzzle(45));
  addNode(103, Zone.entente, node(91), none, puzzle(43), none);

  addNode(104, Zone.entente, none, node(100), none, node(105));
  addNode(105, Zone.entente, none, node(104), puzzle(24), node(106));
  addNode(106, Zone.entente, none, node(105), none, node(107));
  addNode(107, Zone.entente, none, node(106), none, node(108));
  addNode(108, Zone.entente, none, node(107), none, node(109));
  addNode(109, Zone.entente, none, node(108), none, node(110));
  addNode(110, Zone.entente, none, node(109), none, node(111));
  addNode(111, Zone.entente, none, node(110), none, node(1, 0));

  addNode(112, Zone.nataniev, node(115), node(113), none, puzzle(33));
  addNode(113, Zone.nataniev, node(114), puzzle(36), puzzle(40), node(112));
  addNode(114, Zone.nataniev, none, none, node(113), node(115));
  addNode(115, Zone.nataniev, none, node(114), node(112), none);
  addNode(116, Zone.entente, none, none, none, node(20, 2));

  addNode(141, Zone.entente, none, node(88), none, node(142));
  addNode(142, Zone.entente, none, node(141), none, puzzle(54));
  addNode(143, Zone.nataniev, none, puzzle(54), none, none);
  return Object.freeze(nodesByID);
})();

const PuzzleType = new Map();
setEnumValues(PuzzleType, [
  "clockTerminal",
  "energyTerminal",
  "energyDoor",
  "sealTerminal",
  "sealDoor",
  "clockDoor",
  "killTerminal",
  "progressTerminal",
  "illusion",
  "ententeTerminal",
  "audioTerminal",
  "endgameDoor",
  "endgameCredit",
  "entente",
  "timeDoor"
]);

class Puzzle {
  constructor(id, type, info, defaultState) {
    this.id = id;
    this.type = type;
    this.info = Object.freeze(info);
    this.defaultState = defaultState != null ? defaultState : 0;
    this.state = { value: this.defaultState }; // boxed, so it can be mutated
    Object.freeze(this);
  }
}

const puzzlesByID = (function() {
  let puzzlesByID = new Map();

  function addPuzzle(id, type, info, defaultState) {
    puzzlesByID.set(
      id,
      Object.freeze(new Puzzle(id, type, info, defaultState))
    );
  }

  addPuzzle(1, PuzzleType.clockTerminal, {});
  addPuzzle(2, PuzzleType.energyTerminal, {});
  addPuzzle(3, PuzzleType.energyDoor, {});
  addPuzzle(4, PuzzleType.sealTerminal, {});
  addPuzzle(5, PuzzleType.sealDoor, {});
  addPuzzle(6, PuzzleType.energyDoor, {});
  addPuzzle(7, PuzzleType.clockDoor, {});
  addPuzzle(8, PuzzleType.clockDoor, {});
  addPuzzle(9, PuzzleType.clockDoor, {});
  addPuzzle(10, PuzzleType.energyTerminal, {});
  addPuzzle(11, PuzzleType.energyDoor, {});
  addPuzzle(12, PuzzleType.sealTerminal, {});
  addPuzzle(13, PuzzleType.sealTerminal, {});
  addPuzzle(14, PuzzleType.killTerminal, {});
  addPuzzle(15, PuzzleType.sealDoor, {});
  addPuzzle(16, PuzzleType.progressTerminal, {});
  addPuzzle(17, PuzzleType.illusion, { nodeID: 15, orientation: 0 }); // studio
  addPuzzle(18, PuzzleType.energyTerminal, {});
  addPuzzle(19, PuzzleType.energyDoor, {}, 13);
  addPuzzle(20, PuzzleType.sealTerminal, {});
  addPuzzle(21, PuzzleType.sealTerminal, {});
  addPuzzle(22, PuzzleType.illusion, { nodeID: 43, orientation: 2 }); // stones
  addPuzzle(23, PuzzleType.ententeTerminal, {}, 15);
  addPuzzle(24, PuzzleType.ententeTerminal, {});
  addPuzzle(25, PuzzleType.sealDoor, {});
  addPuzzle(26, PuzzleType.energyDoor, {});
  addPuzzle(27, PuzzleType.energyTerminal, {});

  // Studio Lock

  addPuzzle(28, PuzzleType.energyDoor, {});
  addPuzzle(29, PuzzleType.illusion, { nodeID: 73, orientation: 2 }); // metamondst
  addPuzzle(30, PuzzleType.energyDoor, {});

  // Collectibles

  addPuzzle(31, PuzzleType.energyTerminal, {}, 1);
  addPuzzle(32, PuzzleType.illusion, { nodeID: 58, orientation: 1 }); // antechannel
  addPuzzle(33, PuzzleType.energyDoor, {});
  addPuzzle(34, PuzzleType.audioTerminal, {}, 1);
  addPuzzle(35, PuzzleType.audioTerminal, {}, 1);
  addPuzzle(36, PuzzleType.energyTerminal, {});
  addPuzzle(37, PuzzleType.energyTerminal, {});
  addPuzzle(38, PuzzleType.energyTerminal, {}, 1); // Entente Fuse
  addPuzzle(39, PuzzleType.energyTerminal, {}, 1);
  addPuzzle(40, PuzzleType.endgameDoor, {});
  addPuzzle(41, PuzzleType.endgameCredit, {});

  // Entente Puzzle

  addPuzzle(42, PuzzleType.entente, {});
  addPuzzle(43, PuzzleType.entente, {});
  addPuzzle(44, PuzzleType.entente, {});
  addPuzzle(45, PuzzleType.entente, {});
  addPuzzle(46, PuzzleType.entente, {});

  // Spare Fuse

  addPuzzle(47, PuzzleType.energyTerminal, {});
  addPuzzle(48, PuzzleType.illusion, { nodeID: 114, orientation: 2 });
  addPuzzle(49, PuzzleType.illusion, { nodeID: 91, orientation: 0 });
  addPuzzle(50, PuzzleType.illusion, { nodeID: 88, orientation: 3 });
  addPuzzle(51, PuzzleType.illusion, { nodeID: 33, orientation: 2 });
  addPuzzle(52, PuzzleType.illusion, { nodeID: 9, orientation: 1 });

  addPuzzle(54, PuzzleType.timeDoor, {});
  return Object.freeze(puzzlesByID);
})();

// Technically we could key illusions by zone, but that's not guaranteed forever
const illusionPuzzles = (function() {
  let illusionPuzzles = new Map();
  console.log(puzzlesByID.values(), puzzlesByID.size);
  for (let puzzle of puzzlesByID.values()) {
    if (puzzle.type == PuzzleType.illusion) {
      if (!illusionPuzzles.has(puzzle.info.nodeID)) {
        illusionPuzzles.set(puzzle.info.nodeID, new Map());
      }
      illusionPuzzles
        .get(puzzle.info.nodeID)
        .set(puzzle.info.orientation, puzzle);
    }
  }
  for (let sub of illusionPuzzles.values()) {
    Object.freeze(sub);
  }
  return Object.freeze(illusionPuzzles);
})();
