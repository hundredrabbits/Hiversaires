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
  let recordsByChapter = {};
  recordsByChapter[Chapter.act1] = "music_act1";
  recordsByChapter[Chapter.act2] = "music_act2";
  recordsByChapter[Chapter.act3] = "music_act3";
  recordsByChapter[Chapter.act4] = "music_act4";
  recordsByChapter[Chapter.act5] = "music_act5";
  recordsByChapter[Chapter.credit] = "music_credit";
  return recordsByChapter;
})();

const ambienceByZone = (function() {
  let ambienceByZone = {};
  ambienceByZone[Zone.antechannel] = "ambient_antechannel";
  ambienceByZone[Zone.capsule] = "ambient_capsule";
  ambienceByZone[Zone.circular] = "ambient_circular";
  ambienceByZone[Zone.entente] = null;
  ambienceByZone[Zone.forest] = "ambient_forest";
  ambienceByZone[Zone.metamondst] = "ambient_metamondst";
  ambienceByZone[Zone.nataniev] = "ambient_nataniev";
  ambienceByZone[Zone.rainre] = "ambient_rainre";
  ambienceByZone[Zone.stones] = "ambient_stones";
  ambienceByZone[Zone.studio] = "ambient_studio";
  return ambienceByZone;
})();

class SubjectType {}
setEnumValues(SubjectType, ["walk", "puzzle", "noOp"]);

class Node {
  constructor(id, zone, subjects) {
    this.id = id;
    this.zone = zone;
    this.subjects = subjects;
  }
}

const nodesByID = (function() {
  let nodesByID = {};

  function addNode(id, zone, subject0, subject1, subject2, subject3) {
    nodesByID[id] = new Node(id, zone, [
      subject0,
      subject1,
      subject2,
      subject3
    ]);
  }

  function to(node, orientation) {
    return orientation != null ? node + "|" + orientation : node.toString();
  }

  function pz(puzzleID) {
    return "act" + puzzleID;
  }

  const noOp = "0";

  // ====================
  // Forest ( 0 - 11 )
  // ====================

  addNode(0, Zone.forest, to(1), noOp, noOp, noOp);
  addNode(1, Zone.forest, to(2), noOp, pz(28), noOp);

  // addNode(1, Zone.forest, to(46), noOp, noOp, noOp);

  addNode(2, Zone.forest, to(3), noOp, to(1), noOp);
  addNode(3, Zone.forest, to(11), to(10, 2), to(2), to(4, 0));
  addNode(4, Zone.forest, to(5), noOp, to(3, 1), noOp);
  addNode(5, Zone.forest, to(6), noOp, to(4), pz(4));
  addNode(6, Zone.forest, to(7, 1), noOp, to(5), noOp);
  addNode(7, Zone.forest, to(12), to(8, 0), pz(1), to(6, 2));
  addNode(8, Zone.forest, to(9, 2), noOp, to(7, 3), noOp);
  addNode(9, Zone.forest, to(8, 2), noOp, to(10, 0), noOp);

  addNode(10, Zone.forest, to(3, 3), noOp, to(9, 0), noOp);
  addNode(11, Zone.forest, pz(25), noOp, to(3), noOp);
  addNode(12, Zone.forest, pz(3), noOp, to(7), to(14, 0));
  addNode(13, Zone.studio, to(17), to(15), pz(3), pz(2));
  addNode(14, Zone.forest, to(18), noOp, to(12, 1), noOp);
  addNode(15, Zone.studio, to(16), noOp, noOp, to(13));
  addNode(16, Zone.studio, to(21), pz(7), to(15), to(17));
  addNode(17, Zone.studio, to(20), to(16), to(13), noOp);
  addNode(18, Zone.forest, pz(31), pz(2), to(14), noOp);
  addNode(19, Zone.studio, noOp, to(20), pz(5), noOp);

  addNode(20, Zone.studio, pz(6), to(21), to(17), to(19));
  addNode(21, Zone.studio, pz(35), noOp, to(16), to(20));
  addNode(22, Zone.circular, noOp, to(23), noOp, to(16));
  addNode(23, Zone.circular, to(30), pz(16), to(24), pz(7));
  addNode(24, Zone.circular, to(23), noOp, to(25), noOp);
  addNode(25, Zone.circular, to(24), noOp, to(26), pz(8));
  addNode(26, Zone.circular, to(25), noOp, to(27), noOp);
  addNode(27, Zone.circular, to(26), noOp, to(28), pz(9));
  addNode(28, Zone.circular, to(27), noOp, to(29), pz(40));
  addNode(29, Zone.circular, to(28), noOp, to(30), to(33, 0));

  addNode(30, Zone.circular, to(29), noOp, to(23), noOp);
  addNode(31, Zone.circular, to(25, 1), noOp, to(35), noOp);
  addNode(32, Zone.studio, noOp, to(52), noOp, to(27, 1));
  addNode(33, Zone.circular, pz(14), noOp, to(29, 1), noOp);
  addNode(34, Zone.entente, pz(37), noOp, noOp, to(39));
  addNode(35, Zone.stones, pz(8), to(38), to(36), noOp);
  addNode(36, Zone.stones, to(35), to(37), noOp, noOp);
  addNode(37, Zone.stones, to(38), to(39), noOp, to(36));
  addNode(38, Zone.stones, pz(12), noOp, to(37), to(35));
  addNode(39, Zone.stones, pz(10), pz(11), to(40), to(37));

  addNode(40, Zone.stones, to(39), noOp, to(41), noOp);
  addNode(41, Zone.stones, to(40), noOp, noOp, to(42));
  addNode(42, Zone.stones, noOp, to(41), to(44), to(43));
  addNode(43, Zone.stones, noOp, to(42), noOp, pz(35));
  addNode(44, Zone.stones, to(42), noOp, to(46), noOp);
  addNode(45, Zone.rainre, pz(13), noOp, pz(1), to(39));
  addNode(46, Zone.stones, to(44), noOp, pz(15), noOp);
  addNode(47, Zone.antechannel, noOp, to(48), to(77), noOp);
  addNode(48, Zone.antechannel, pz(25), noOp, to(49), to(47));
  addNode(49, Zone.antechannel, to(48), noOp, pz(21), to(77));
  addNode(50, Zone.nataniev, noOp, noOp, pz(41), noOp);
  addNode(51, Zone.nataniev, noOp, noOp, to(64), noOp);

  addNode(52, Zone.antechannel, to(54), to(53), noOp, pz(9));
  addNode(53, Zone.antechannel, to(55), to(84), noOp, to(52));
  addNode(54, Zone.antechannel, to(57), to(55), to(52), noOp);
  addNode(55, Zone.antechannel, pz(39), to(56), to(53), to(54));
  addNode(56, Zone.antechannel, to(58), noOp, to(84), to(55));
  addNode(57, Zone.antechannel, to(59), noOp, to(54), noOp);
  addNode(58, Zone.antechannel, to(60), noOp, to(56), noOp);
  addNode(59, Zone.antechannel, to(61), noOp, to(57), noOp);

  addNode(60, Zone.antechannel, to(62), noOp, to(56), noOp);
  addNode(61, Zone.antechannel, noOp, noOp, to(59), pz(19));
  addNode(62, Zone.antechannel, pz(26), noOp, to(60), noOp);
  addNode(63, Zone.metamondst, to(73), to(69), noOp, to(67));
  addNode(64, Zone.nataniev, to(63), noOp, noOp, noOp);
  addNode(65, Zone.entente, noOp, noOp, pz(46), noOp);
  addNode(67, Zone.metamondst, to(74), to(63), noOp, to(70));
  addNode(69, Zone.metamondst, pz(18), pz(19), noOp, to(63));

  addNode(70, Zone.metamondst, to(75), to(67), noOp, noOp);
  addNode(72, Zone.metamondst, noOp, to(61), noOp, to(69));
  addNode(73, Zone.metamondst, to(81), noOp, to(63), noOp);
  addNode(74, Zone.metamondst, to(80), noOp, to(67), noOp);
  addNode(75, Zone.metamondst, to(76), noOp, to(70), noOp);
  addNode(76, Zone.metamondst, noOp, noOp, to(75), pz(30));
  addNode(77, Zone.antechannel, to(47), to(49), pz(26), pz(27));
  addNode(78, Zone.metamondst, to(83), noOp, noOp, to(81));
  addNode(79, Zone.capsule, noOp, pz(33), to(87), noOp);

  addNode(80, Zone.metamondst, to(85), noOp, to(74), noOp);
  addNode(81, Zone.metamondst, to(82), to(78), to(73), noOp);
  addNode(82, Zone.metamondst, noOp, to(83), to(81), pz(20));
  addNode(83, Zone.metamondst, noOp, noOp, to(78), to(82));
  addNode(84, Zone.antechannel, to(56), noOp, pz(47), to(53));
  addNode(85, Zone.metamondst, pz(15), noOp, to(80), to(86));
  addNode(86, Zone.metamondst, noOp, to(85), noOp, pz(1));
  addNode(87, Zone.capsule, to(79), pz(30), noOp, to(88));
  addNode(88, Zone.capsule, noOp, to(87), noOp, to(141));

  addNode(89, Zone.entente, pz(42), noOp, to(90), noOp);
  addNode(90, Zone.entente, to(89), noOp, to(91), noOp);
  addNode(91, Zone.entente, to(90), pz(23), to(103), noOp);

  addNode(92, Zone.entente, to(91), noOp, to(93), noOp);
  addNode(93, Zone.entente, to(92), noOp, to(94), noOp);
  addNode(94, Zone.entente, to(93), noOp, to(95), noOp);
  addNode(95, Zone.entente, to(94), pz(24), to(96), noOp);
  addNode(96, Zone.entente, to(95), noOp, to(97), noOp);
  addNode(97, Zone.entente, to(96), noOp, to(98), noOp);
  addNode(98, Zone.entente, to(97), to(99), to(65), to(101));
  addNode(99, Zone.entente, noOp, to(100), noOp, to(98));
  addNode(100, Zone.entente, noOp, pz(44), noOp, to(99));
  addNode(101, Zone.entente, noOp, to(98), pz(38), to(102));
  addNode(102, Zone.entente, noOp, to(101), noOp, pz(45));
  addNode(103, Zone.entente, to(91), noOp, pz(43), noOp);

  addNode(104, Zone.entente, noOp, to(100), noOp, to(105));
  addNode(105, Zone.entente, noOp, to(104), pz(24), to(106));
  addNode(106, Zone.entente, noOp, to(105), noOp, to(107));
  addNode(107, Zone.entente, noOp, to(106), noOp, to(108));
  addNode(108, Zone.entente, noOp, to(107), noOp, to(109));
  addNode(109, Zone.entente, noOp, to(108), noOp, to(110));
  addNode(110, Zone.entente, noOp, to(109), noOp, to(111));
  addNode(111, Zone.entente, noOp, to(110), noOp, to(1, 0));

  addNode(112, Zone.nataniev, to(115), to(113), noOp, pz(33));
  addNode(113, Zone.nataniev, to(114), pz(36), pz(40), to(112));
  addNode(114, Zone.nataniev, noOp, noOp, to(113), to(115));
  addNode(115, Zone.nataniev, noOp, to(114), to(112), noOp);
  addNode(116, Zone.entente, noOp, noOp, noOp, to(20, 2));

  addNode(141, Zone.entente, noOp, to(88), noOp, to(142));
  addNode(142, Zone.entente, noOp, to(141), noOp, pz(54));
  addNode(143, Zone.nataniev, noOp, pz(54), noOp, noOp);
  return nodesByID;
})();

const PuzzleType = {};
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
  constructor(id, type, defaultState) {
    this.id = id;
    this.type = type;
    this.defaultState = defaultState != null ? defaultState : 0;
  }
}

const puzzlesByID = (function() {
  let puzzlesByID = {};

  function addPuzzle(id, type, defaultState) {
    puzzlesByID[id] = new Puzzle(id, type, defaultState);
  }

  addPuzzle(1, PuzzleType.clockTerminal);
  addPuzzle(2, PuzzleType.energyTerminal);
  addPuzzle(3, PuzzleType.energyDoor);
  addPuzzle(4, PuzzleType.sealTerminal);
  addPuzzle(5, PuzzleType.sealDoor);
  addPuzzle(6, PuzzleType.energyDoor);
  addPuzzle(7, PuzzleType.clockDoor);
  addPuzzle(8, PuzzleType.clockDoor);
  addPuzzle(9, PuzzleType.clockDoor);
  addPuzzle(10, PuzzleType.energyTerminal);
  addPuzzle(11, PuzzleType.energyDoor);
  addPuzzle(12, PuzzleType.sealTerminal);
  addPuzzle(13, PuzzleType.sealTerminal);
  addPuzzle(14, PuzzleType.killTerminal);
  addPuzzle(15, PuzzleType.sealDoor);
  addPuzzle(16, PuzzleType.progressTerminal);
  addPuzzle(17, PuzzleType.illusion); // act17 studio Illusion
  addPuzzle(18, PuzzleType.energyTerminal);
  addPuzzle(19, PuzzleType.energyDoor, 13);
  addPuzzle(20, PuzzleType.sealTerminal);
  addPuzzle(21, PuzzleType.sealTerminal);
  addPuzzle(22, PuzzleType.illusion); // act22 stones Illusion
  addPuzzle(23, PuzzleType.ententeTerminal, 15);
  addPuzzle(24, PuzzleType.ententeTerminal);
  addPuzzle(25, PuzzleType.sealDoor);
  addPuzzle(26, PuzzleType.energyDoor);
  addPuzzle(27, PuzzleType.energyTerminal);

  // Studio Lock

  addPuzzle(28, PuzzleType.energyDoor);
  addPuzzle(29, PuzzleType.illusion); // act29 metamondst Illusion
  addPuzzle(30, PuzzleType.energyDoor);

  // Collectibles

  addPuzzle(31, PuzzleType.energyTerminal, 1);
  addPuzzle(32, PuzzleType.illusion); // act32 antech Illusion
  addPuzzle(33, PuzzleType.energyDoor);
  addPuzzle(34, PuzzleType.audioTerminal, 1);
  addPuzzle(35, PuzzleType.audioTerminal, 1);
  addPuzzle(36, PuzzleType.energyTerminal);
  addPuzzle(37, PuzzleType.energyTerminal);
  addPuzzle(38, PuzzleType.energyTerminal, 1); // Entente Fuse
  addPuzzle(39, PuzzleType.energyTerminal, 1);
  addPuzzle(40, PuzzleType.endgameDoor);
  addPuzzle(41, PuzzleType.endgameCredit);

  // Entente Puzzle

  addPuzzle(42, PuzzleType.entente);
  addPuzzle(43, PuzzleType.entente);
  addPuzzle(44, PuzzleType.entente);
  addPuzzle(45, PuzzleType.entente);
  addPuzzle(46, PuzzleType.entente);

  // Spare Fuse

  addPuzzle(47, PuzzleType.energyTerminal);
  addPuzzle(48, PuzzleType.illusion);
  addPuzzle(49, PuzzleType.illusion);
  addPuzzle(50, PuzzleType.illusion);
  addPuzzle(51, PuzzleType.illusion);
  addPuzzle(52, PuzzleType.illusion);
  addPuzzle(53, PuzzleType.illusion);
  addPuzzle(54, PuzzleType.timeDoor);
  return puzzlesByID;
})();
