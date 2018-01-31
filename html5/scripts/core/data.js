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
setEnumValues(SubjectType, ["walk", "puzzle", "none"]);

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

  // ====================
  // Forest ( 0 - 11 )
  // ====================

  addNode(0, Zone.forest, to(1), to(0), to(0), to(0));
  addNode(1, Zone.forest, to(2), to(0), pz(28), to(0));

  // addNode(1, Zone.forest, to(46), to(0), to(0), to(0));

  addNode(2, Zone.forest, to(3), to(0), to(1), to(0));
  addNode(3, Zone.forest, to(11), to(10, 2), to(2), to(4, 0));
  addNode(4, Zone.forest, to(5), to(0), to(3, 1), to(0));
  addNode(5, Zone.forest, to(6), to(0), to(4), pz(4));
  addNode(6, Zone.forest, to(7, 1), to(0), to(5), to(0));
  addNode(7, Zone.forest, to(12), to(8, 0), pz(1), to(6, 2));
  addNode(8, Zone.forest, to(9, 2), to(0), to(7, 3), to(0));
  addNode(9, Zone.forest, to(8, 2), to(0), to(10, 0), to(0));

  addNode(10, Zone.forest, to(3, 3), to(0), to(9, 0), to(0));
  addNode(11, Zone.forest, pz(25), to(0), to(3), to(0));
  addNode(12, Zone.forest, pz(3), to(0), to(7), to(14, 0));
  addNode(13, Zone.studio, to(17), to(15), pz(3), pz(2));
  addNode(14, Zone.forest, to(18), to(0), to(12, 1), to(0));
  addNode(15, Zone.studio, to(16), to(0), to(0), to(13));
  addNode(16, Zone.studio, to(21), pz(7), to(15), to(17));
  addNode(17, Zone.studio, to(20), to(16), to(13), to(0));
  addNode(18, Zone.forest, pz(31), pz(2), to(14), to(0));
  addNode(19, Zone.studio, to(0), to(20), pz(5), to(0));

  addNode(20, Zone.studio, pz(6), to(21), to(17), to(19));
  addNode(21, Zone.studio, pz(35), to(0), to(16), to(20));
  addNode(22, Zone.circular, to(0), to(23), to(0), to(16));
  addNode(23, Zone.circular, to(30), pz(16), to(24), pz(7));
  addNode(24, Zone.circular, to(23), to(0), to(25), to(0));
  addNode(25, Zone.circular, to(24), to(0), to(26), pz(8));
  addNode(26, Zone.circular, to(25), to(0), to(27), to(0));
  addNode(27, Zone.circular, to(26), to(0), to(28), pz(9));
  addNode(28, Zone.circular, to(27), to(0), to(29), pz(40));
  addNode(29, Zone.circular, to(28), to(0), to(30), to(33, 0));

  addNode(30, Zone.circular, to(29), to(0), to(23), to(0));
  addNode(31, Zone.circular, to(25, 1), to(0), to(35), to(0));
  addNode(32, Zone.studio, to(0), to(52), to(0), to(27, 1));
  addNode(33, Zone.circular, pz(14), to(0), to(29, 1), to(0));
  addNode(34, Zone.entente, pz(37), to(0), to(0), to(39));
  addNode(35, Zone.stones, pz(8), to(38), to(36), to(0));
  addNode(36, Zone.stones, to(35), to(37), to(0), to(0));
  addNode(37, Zone.stones, to(38), to(39), to(0), to(36));
  addNode(38, Zone.stones, pz(12), to(0), to(37), to(35));
  addNode(39, Zone.stones, pz(10), pz(11), to(40), to(37));

  addNode(40, Zone.stones, to(39), to(0), to(41), to(0));
  addNode(41, Zone.stones, to(40), to(0), to(0), to(42));
  addNode(42, Zone.stones, to(0), to(41), to(44), to(43));
  addNode(43, Zone.stones, to(0), to(42), to(0), pz(35));
  addNode(44, Zone.stones, to(42), to(0), to(46), to(0));
  addNode(45, Zone.rainre, pz(13), to(0), pz(1), to(39));
  addNode(46, Zone.stones, to(44), to(0), pz(15), to(0));
  addNode(47, Zone.antechannel, to(0), to(48), to(77), to(0));
  addNode(48, Zone.antechannel, pz(25), to(0), to(49), to(47));
  addNode(49, Zone.antechannel, to(48), to(0), pz(21), to(77));
  addNode(50, Zone.nataniev, to(0), to(0), pz(41), to(0));
  addNode(51, Zone.nataniev, to(0), to(0), to(64), to(0));

  addNode(52, Zone.antechannel, to(54), to(53), to(0), pz(9));
  addNode(53, Zone.antechannel, to(55), to(84), to(0), to(52));
  addNode(54, Zone.antechannel, to(57), to(55), to(52), to(0));
  addNode(55, Zone.antechannel, pz(39), to(56), to(53), to(54));
  addNode(56, Zone.antechannel, to(58), to(0), to(84), to(55));
  addNode(57, Zone.antechannel, to(59), to(0), to(54), to(0));
  addNode(58, Zone.antechannel, to(60), to(0), to(56), to(0));
  addNode(59, Zone.antechannel, to(61), to(0), to(57), to(0));

  addNode(60, Zone.antechannel, to(62), to(0), to(56), to(0));
  addNode(61, Zone.antechannel, to(0), to(0), to(59), pz(19));
  addNode(62, Zone.antechannel, pz(26), to(0), to(60), to(0));
  addNode(63, Zone.metamondst, to(73), to(69), to(0), to(67));
  addNode(64, Zone.nataniev, to(63), to(0), to(0), to(0));
  addNode(65, Zone.entente, to(0), to(0), pz(46), to(0));
  addNode(67, Zone.metamondst, to(74), to(63), to(0), to(70));
  addNode(69, Zone.metamondst, pz(18), pz(19), to(0), to(63));

  addNode(70, Zone.metamondst, to(75), to(67), to(0), to(0));
  addNode(72, Zone.metamondst, to(0), to(61), to(0), to(69));
  addNode(73, Zone.metamondst, to(81), to(0), to(63), to(0));
  addNode(74, Zone.metamondst, to(80), to(0), to(67), to(0));
  addNode(75, Zone.metamondst, to(76), to(0), to(70), to(0));
  addNode(76, Zone.metamondst, to(0), to(0), to(75), pz(30));
  addNode(77, Zone.antechannel, to(47), to(49), pz(26), pz(27));
  addNode(78, Zone.metamondst, to(83), to(0), to(0), to(81));
  addNode(79, Zone.capsule, to(0), pz(33), to(87), to(0));

  addNode(80, Zone.metamondst, to(85), to(0), to(74), to(0));
  addNode(81, Zone.metamondst, to(82), to(78), to(73), to(0));
  addNode(82, Zone.metamondst, to(0), to(83), to(81), pz(20));
  addNode(83, Zone.metamondst, to(0), to(0), to(78), to(82));
  addNode(84, Zone.antechannel, to(56), to(0), pz(47), to(53));
  addNode(85, Zone.metamondst, pz(15), to(0), to(80), to(86));
  addNode(86, Zone.metamondst, to(0), to(85), to(0), pz(1));
  addNode(87, Zone.capsule, to(79), pz(30), to(0), to(88));
  addNode(88, Zone.capsule, to(0), to(87), to(0), to(141));

  addNode(89, Zone.entente, pz(42), to(0), to(90), to(0));
  addNode(90, Zone.entente, to(89), to(0), to(91), to(0));
  addNode(91, Zone.entente, to(90), pz(23), to(103), to(0));

  addNode(92, Zone.entente, to(91), to(0), to(93), to(0));
  addNode(93, Zone.entente, to(92), to(0), to(94), to(0));
  addNode(94, Zone.entente, to(93), to(0), to(95), to(0));
  addNode(95, Zone.entente, to(94), pz(24), to(96), to(0));
  addNode(96, Zone.entente, to(95), to(0), to(97), to(0));
  addNode(97, Zone.entente, to(96), to(0), to(98), to(0));
  addNode(98, Zone.entente, to(97), to(99), to(65), to(101));
  addNode(99, Zone.entente, to(0), to(100), to(0), to(98));
  addNode(100, Zone.entente, to(0), pz(44), to(0), to(99));
  addNode(101, Zone.entente, to(0), to(98), pz(38), to(102));
  addNode(102, Zone.entente, to(0), to(101), to(0), pz(45));
  addNode(103, Zone.entente, to(91), to(0), pz(43), to(0));

  addNode(104, Zone.entente, to(0), to(100), to(0), to(105));
  addNode(105, Zone.entente, to(0), to(104), pz(24), to(106));
  addNode(106, Zone.entente, to(0), to(105), to(0), to(107));
  addNode(107, Zone.entente, to(0), to(106), to(0), to(108));
  addNode(108, Zone.entente, to(0), to(107), to(0), to(109));
  addNode(109, Zone.entente, to(0), to(108), to(0), to(110));
  addNode(110, Zone.entente, to(0), to(109), to(0), to(111));
  addNode(111, Zone.entente, to(0), to(110), to(0), to(1, 0));

  addNode(112, Zone.nataniev, to(115), to(113), to(0), pz(33));
  addNode(113, Zone.nataniev, to(114), pz(36), pz(40), to(112));
  addNode(114, Zone.nataniev, to(0), to(0), to(113), to(115));
  addNode(115, Zone.nataniev, to(0), to(114), to(112), to(0));
  addNode(116, Zone.entente, to(0), to(0), to(0), to(20, 2));

  addNode(141, Zone.entente, to(0), to(88), to(0), to(142));
  addNode(142, Zone.entente, to(0), to(141), to(0), pz(54));
  addNode(143, Zone.nataniev, to(0), pz(54), to(0), to(0));
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
  constructor(id, type) {
    this.id = id;
    this.type = type;
  }
}

const puzzlesByID = (function() {
  let puzzlesByID = {};

  function addPuzzle(id, type) {
    puzzlesByID[id] = new Puzzle(id, type);
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
  addPuzzle(19, PuzzleType.energyDoor);
  addPuzzle(20, PuzzleType.sealTerminal);
  addPuzzle(21, PuzzleType.sealTerminal);
  addPuzzle(22, PuzzleType.illusion); // act22 stones Illusion
  addPuzzle(23, PuzzleType.ententeTerminal);
  addPuzzle(24, PuzzleType.ententeTerminal);
  addPuzzle(25, PuzzleType.sealDoor);
  addPuzzle(26, PuzzleType.energyDoor);
  addPuzzle(27, PuzzleType.energyTerminal);

  // Studio Lock

  addPuzzle(28, PuzzleType.energyDoor);
  addPuzzle(29, PuzzleType.illusion); // act29 metamondst Illusion
  addPuzzle(30, PuzzleType.energyDoor);

  // Collectibles

  addPuzzle(31, PuzzleType.energyTerminal);
  addPuzzle(32, PuzzleType.illusion); // act32 antech Illusion
  addPuzzle(33, PuzzleType.energyDoor);
  addPuzzle(34, PuzzleType.audioTerminal);
  addPuzzle(35, PuzzleType.audioTerminal);
  addPuzzle(36, PuzzleType.energyTerminal);
  addPuzzle(37, PuzzleType.energyTerminal);
  addPuzzle(38, PuzzleType.energyTerminal); // Entente Fuse
  addPuzzle(39, PuzzleType.energyTerminal);
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
