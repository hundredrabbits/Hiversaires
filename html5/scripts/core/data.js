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

const nodesByID = (function() {
  function makeNode(zone, op0, op1, op2, op3) {
    return [op0, op1, op2, op3, zone];
  }

  function to(node, orientation) {
    return orientation != null ? node + "|" + orientation : node.toString();
  }

  function pz(puzzleID) {
    return "act" + puzzleID;
  }

  let nodesByID = {};

  for (let i = 0; i < 150; i++) {
    nodesByID[i] = makeNode(Zone.forest, to(0), to(0), to(0), to(0));
  }

  // ====================
  // Forest ( 0 - 11 )
  // ====================

  nodesByID[0] = makeNode(Zone.forest, to(1), to(0), to(0), to(0));
  nodesByID[1] = makeNode(Zone.forest, to(2), to(0), pz(28), to(0));

  // nodesByID[1] = makeNode(Zone.forest, to(46), to(0), to(0), to(0));

  nodesByID[2] = makeNode(Zone.forest, to(3), to(0), to(1), to(0));
  nodesByID[3] = makeNode(Zone.forest, to(11), to(10, 2), to(2), to(4, 0));
  nodesByID[4] = makeNode(Zone.forest, to(5), to(0), to(3, 1), to(0));
  nodesByID[5] = makeNode(Zone.forest, to(6), to(0), to(4), pz(4));
  nodesByID[6] = makeNode(Zone.forest, to(7, 1), to(0), to(5), to(0));
  nodesByID[7] = makeNode(Zone.forest, to(12), to(8, 0), pz(1), to(6, 2));
  nodesByID[8] = makeNode(Zone.forest, to(9, 2), to(0), to(7, 3), to(0));
  nodesByID[9] = makeNode(Zone.forest, to(8, 2), to(0), to(10, 0), to(0));

  nodesByID[10] = makeNode(Zone.forest, to(3, 3), to(0), to(9, 0), to(0));
  nodesByID[11] = makeNode(Zone.forest, pz(25), to(0), to(3), to(0));
  nodesByID[12] = makeNode(Zone.forest, pz(3), to(0), to(7), to(14, 0));
  nodesByID[13] = makeNode(Zone.studio, to(17), to(15), pz(3), pz(2));
  nodesByID[14] = makeNode(Zone.forest, to(18), to(0), to(12, 1), to(0));
  nodesByID[15] = makeNode(Zone.studio, to(16), to(0), to(0), to(13));
  nodesByID[16] = makeNode(Zone.studio, to(21), pz(7), to(15), to(17));
  nodesByID[17] = makeNode(Zone.studio, to(20), to(16), to(13), to(0));
  nodesByID[18] = makeNode(Zone.forest, pz(31), pz(2), to(14), to(0));
  nodesByID[19] = makeNode(Zone.studio, to(0), to(20), pz(5), to(0));

  nodesByID[20] = makeNode(Zone.studio, pz(6), to(21), to(17), to(19));
  nodesByID[21] = makeNode(Zone.studio, pz(35), to(0), to(16), to(20));
  nodesByID[22] = makeNode(Zone.circular, to(0), to(23), to(0), to(16));
  nodesByID[23] = makeNode(Zone.circular, to(30), pz(16), to(24), pz(7));
  nodesByID[24] = makeNode(Zone.circular, to(23), to(0), to(25), to(0));
  nodesByID[25] = makeNode(Zone.circular, to(24), to(0), to(26), pz(8));
  nodesByID[26] = makeNode(Zone.circular, to(25), to(0), to(27), to(0));
  nodesByID[27] = makeNode(Zone.circular, to(26), to(0), to(28), pz(9));
  nodesByID[28] = makeNode(Zone.circular, to(27), to(0), to(29), pz(40));
  nodesByID[29] = makeNode(Zone.circular, to(28), to(0), to(30), to(33, 0));

  nodesByID[30] = makeNode(Zone.circular, to(29), to(0), to(23), to(0));
  nodesByID[31] = makeNode(Zone.circular, to(25, 1), to(0), to(35), to(0));
  nodesByID[32] = makeNode(Zone.studio, to(0), to(52), to(0), to(27, 1));
  nodesByID[33] = makeNode(Zone.circular, pz(14), to(0), to(29, 1), to(0));
  nodesByID[34] = makeNode(Zone.entente, pz(37), to(0), to(0), to(39));
  nodesByID[35] = makeNode(Zone.stones, pz(8), to(38), to(36), to(0));
  nodesByID[36] = makeNode(Zone.stones, to(35), to(37), to(0), to(0));
  nodesByID[37] = makeNode(Zone.stones, to(38), to(39), to(0), to(36));
  nodesByID[38] = makeNode(Zone.stones, pz(12), to(0), to(37), to(35));
  nodesByID[39] = makeNode(Zone.stones, pz(10), pz(11), to(40), to(37));

  nodesByID[40] = makeNode(Zone.stones, to(39), to(0), to(41), to(0));
  nodesByID[41] = makeNode(Zone.stones, to(40), to(0), to(0), to(42));
  nodesByID[42] = makeNode(Zone.stones, to(0), to(41), to(44), to(43));
  nodesByID[43] = makeNode(Zone.stones, to(0), to(42), to(0), pz(35));
  nodesByID[44] = makeNode(Zone.stones, to(42), to(0), to(46), to(0));
  nodesByID[45] = makeNode(Zone.rainre, pz(13), to(0), pz(1), to(39));
  nodesByID[46] = makeNode(Zone.stones, to(44), to(0), pz(15), to(0));
  nodesByID[47] = makeNode(Zone.antechannel, to(0), to(48), to(77), to(0));
  nodesByID[48] = makeNode(Zone.antechannel, pz(25), to(0), to(49), to(47));
  nodesByID[49] = makeNode(Zone.antechannel, to(48), to(0), pz(21), to(77));
  nodesByID[50] = makeNode(Zone.nataniev, to(0), to(0), pz(41), to(0));
  nodesByID[51] = makeNode(Zone.nataniev, to(0), to(0), to(64), to(0));

  nodesByID[52] = makeNode(Zone.antechannel, to(54), to(53), to(0), pz(9));
  nodesByID[53] = makeNode(Zone.antechannel, to(55), to(84), to(0), to(52));
  nodesByID[54] = makeNode(Zone.antechannel, to(57), to(55), to(52), to(0));
  nodesByID[55] = makeNode(Zone.antechannel, pz(39), to(56), to(53), to(54));
  nodesByID[56] = makeNode(Zone.antechannel, to(58), to(0), to(84), to(55));
  nodesByID[57] = makeNode(Zone.antechannel, to(59), to(0), to(54), to(0));
  nodesByID[58] = makeNode(Zone.antechannel, to(60), to(0), to(56), to(0));
  nodesByID[59] = makeNode(Zone.antechannel, to(61), to(0), to(57), to(0));

  nodesByID[60] = makeNode(Zone.antechannel, to(62), to(0), to(56), to(0));
  nodesByID[61] = makeNode(Zone.antechannel, to(0), to(0), to(59), pz(19));
  nodesByID[62] = makeNode(Zone.antechannel, pz(26), to(0), to(60), to(0));
  nodesByID[63] = makeNode(Zone.metamondst, to(73), to(69), to(0), to(67));
  nodesByID[64] = makeNode(Zone.nataniev, to(63), to(0), to(0), to(0));
  nodesByID[65] = makeNode(Zone.entente, to(0), to(0), pz(46), to(0));
  nodesByID[67] = makeNode(Zone.metamondst, to(74), to(63), to(0), to(70));
  nodesByID[69] = makeNode(Zone.metamondst, pz(18), pz(19), to(0), to(63));

  nodesByID[70] = makeNode(Zone.metamondst, to(75), to(67), to(0), to(0));
  nodesByID[72] = makeNode(Zone.metamondst, to(0), to(61), to(0), to(69));
  nodesByID[73] = makeNode(Zone.metamondst, to(81), to(0), to(63), to(0));
  nodesByID[74] = makeNode(Zone.metamondst, to(80), to(0), to(67), to(0));
  nodesByID[75] = makeNode(Zone.metamondst, to(76), to(0), to(70), to(0));
  nodesByID[76] = makeNode(Zone.metamondst, to(0), to(0), to(75), pz(30));
  nodesByID[77] = makeNode(Zone.antechannel, to(47), to(49), pz(26), pz(27));
  nodesByID[78] = makeNode(Zone.metamondst, to(83), to(0), to(0), to(81));
  nodesByID[79] = makeNode(Zone.capsule, to(0), pz(33), to(87), to(0));

  nodesByID[80] = makeNode(Zone.metamondst, to(85), to(0), to(74), to(0));
  nodesByID[81] = makeNode(Zone.metamondst, to(82), to(78), to(73), to(0));
  nodesByID[82] = makeNode(Zone.metamondst, to(0), to(83), to(81), pz(20));
  nodesByID[83] = makeNode(Zone.metamondst, to(0), to(0), to(78), to(82));
  nodesByID[84] = makeNode(Zone.antechannel, to(56), to(0), pz(47), to(53));
  nodesByID[85] = makeNode(Zone.metamondst, pz(15), to(0), to(80), to(86));
  nodesByID[86] = makeNode(Zone.metamondst, to(0), to(85), to(0), pz(1));
  nodesByID[87] = makeNode(Zone.capsule, to(79), pz(30), to(0), to(88));
  nodesByID[88] = makeNode(Zone.capsule, to(0), to(87), to(0), to(141));

  nodesByID[89] = makeNode(Zone.entente, pz(42), to(0), to(90), to(0));
  nodesByID[90] = makeNode(Zone.entente, to(89), to(0), to(91), to(0));
  nodesByID[91] = makeNode(Zone.entente, to(90), pz(23), to(103), to(0));

  nodesByID[92] = makeNode(Zone.entente, to(91), to(0), to(93), to(0));
  nodesByID[93] = makeNode(Zone.entente, to(92), to(0), to(94), to(0));
  nodesByID[94] = makeNode(Zone.entente, to(93), to(0), to(95), to(0));
  nodesByID[95] = makeNode(Zone.entente, to(94), pz(24), to(96), to(0));
  nodesByID[96] = makeNode(Zone.entente, to(95), to(0), to(97), to(0));
  nodesByID[97] = makeNode(Zone.entente, to(96), to(0), to(98), to(0));
  nodesByID[98] = makeNode(Zone.entente, to(97), to(99), to(65), to(101));
  nodesByID[99] = makeNode(Zone.entente, to(0), to(100), to(0), to(98));
  nodesByID[100] = makeNode(Zone.entente, to(0), pz(44), to(0), to(99));
  nodesByID[101] = makeNode(Zone.entente, to(0), to(98), pz(38), to(102));
  nodesByID[102] = makeNode(Zone.entente, to(0), to(101), to(0), pz(45));
  nodesByID[103] = makeNode(Zone.entente, to(91), to(0), pz(43), to(0));

  nodesByID[104] = makeNode(Zone.entente, to(0), to(100), to(0), to(105));
  nodesByID[105] = makeNode(Zone.entente, to(0), to(104), pz(24), to(106));
  nodesByID[106] = makeNode(Zone.entente, to(0), to(105), to(0), to(107));
  nodesByID[107] = makeNode(Zone.entente, to(0), to(106), to(0), to(108));
  nodesByID[108] = makeNode(Zone.entente, to(0), to(107), to(0), to(109));
  nodesByID[109] = makeNode(Zone.entente, to(0), to(108), to(0), to(110));
  nodesByID[110] = makeNode(Zone.entente, to(0), to(109), to(0), to(111));
  nodesByID[111] = makeNode(Zone.entente, to(0), to(110), to(0), to(1, 0));

  nodesByID[112] = makeNode(Zone.nataniev, to(115), to(113), to(0), pz(33));
  nodesByID[113] = makeNode(Zone.nataniev, to(114), pz(36), pz(40), to(112));
  nodesByID[114] = makeNode(Zone.nataniev, to(0), to(0), to(113), to(115));
  nodesByID[115] = makeNode(Zone.nataniev, to(0), to(114), to(112), to(0));
  nodesByID[116] = makeNode(Zone.entente, to(0), to(0), to(0), to(20, 2));

  nodesByID[141] = makeNode(Zone.entente, to(0), to(88), to(0), to(142));
  nodesByID[142] = makeNode(Zone.entente, to(0), to(141), to(0), pz(54));
  nodesByID[143] = makeNode(Zone.nataniev, to(0), pz(54), to(0), to(0));
  return nodesByID;
})();

const puzzlesByID = (function() {
  function makePuzzle(type) {
    return type;
  }

  let puzzlesByID = {};

  puzzlesByID[0] = makePuzzle("");
  puzzlesByID[1] = makePuzzle("clockTerminal");
  puzzlesByID[2] = makePuzzle("energyTerminal");
  puzzlesByID[3] = makePuzzle("energyDoor");
  puzzlesByID[4] = makePuzzle("sealTerminal");
  puzzlesByID[5] = makePuzzle("sealDoor");
  puzzlesByID[6] = makePuzzle("energyDoor");
  puzzlesByID[7] = makePuzzle("clockDoor");
  puzzlesByID[8] = makePuzzle("clockDoor");
  puzzlesByID[9] = makePuzzle("clockDoor");
  puzzlesByID[10] = makePuzzle("energyTerminal");
  puzzlesByID[11] = makePuzzle("energyDoor");
  puzzlesByID[12] = makePuzzle("sealTerminal");
  puzzlesByID[13] = makePuzzle("sealTerminal");
  puzzlesByID[14] = makePuzzle("killTerminal");
  puzzlesByID[15] = makePuzzle("sealDoor");
  puzzlesByID[16] = makePuzzle("progressTerminal");
  puzzlesByID[17] = makePuzzle("illusion"); // act17 studio Illusion
  puzzlesByID[18] = makePuzzle("energyTerminal");
  puzzlesByID[19] = makePuzzle("energyDoor");
  puzzlesByID[20] = makePuzzle("sealTerminal");
  puzzlesByID[21] = makePuzzle("sealTerminal");
  puzzlesByID[22] = makePuzzle("illusion"); // act22 stones Illusion
  puzzlesByID[23] = makePuzzle("ententeTerminal");
  puzzlesByID[24] = makePuzzle("ententeTerminal");
  puzzlesByID[25] = makePuzzle("sealDoor");
  puzzlesByID[26] = makePuzzle("energyDoor");
  puzzlesByID[27] = makePuzzle("energyTerminal");

  // Studio Lock

  puzzlesByID[28] = makePuzzle("energyDoor");
  puzzlesByID[29] = makePuzzle("illusion"); // act29 metamondst Illusion
  puzzlesByID[30] = makePuzzle("energyDoor");

  // Collectibles

  puzzlesByID[31] = makePuzzle("energyTerminal");
  puzzlesByID[32] = makePuzzle("illusion"); // act32 antech Illusion
  puzzlesByID[33] = makePuzzle("energyDoor");
  puzzlesByID[34] = makePuzzle("audioTerminal");
  puzzlesByID[35] = makePuzzle("audioTerminal");
  puzzlesByID[36] = makePuzzle("energyTerminal");
  puzzlesByID[37] = makePuzzle("energyTerminal");
  puzzlesByID[38] = makePuzzle("energyTerminal"); // Entente Fuse
  puzzlesByID[39] = makePuzzle("energyTerminal");
  puzzlesByID[40] = makePuzzle("endgameDoor");
  puzzlesByID[41] = makePuzzle("endgameCredit");

  // Entente Puzzle

  puzzlesByID[42] = makePuzzle("entente");
  puzzlesByID[43] = makePuzzle("entente");
  puzzlesByID[44] = makePuzzle("entente");
  puzzlesByID[45] = makePuzzle("entente");
  puzzlesByID[46] = makePuzzle("entente");

  // Spare Fuse

  puzzlesByID[47] = makePuzzle("energyTerminal");
  puzzlesByID[48] = makePuzzle("illusion");
  puzzlesByID[49] = makePuzzle("illusion");
  puzzlesByID[50] = makePuzzle("illusion");
  puzzlesByID[51] = makePuzzle("illusion");
  puzzlesByID[52] = makePuzzle("illusion");
  puzzlesByID[53] = makePuzzle("illusion");
  puzzlesByID[54] = makePuzzle("timeDoor");
  return puzzlesByID;
})();
