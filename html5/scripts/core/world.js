function makeNode(zone, op0, op1, op2, op3) {
  return [op0, op1, op2, op3, zone];
}

function makePuzzle(type) {
  return type;
}

function to(node, orientation) {
  return orientation != null ? node + "|" + orientation : node.toString();
}

function pz(puzzleID) {
  return "act" + puzzleID;
}

class World {
  constructor() {
    this.nodesByID = {};
    this.puzzlesByID = {};

    {
      let node = this.nodesByID;

      for (let i = 0; i < 150; i++) {
        node[i] = makeNode(Zone.forest, to(0), to(0), to(0), to(0));
      }

      // ====================
      // Forest ( 0 - 11 )
      // ====================

      node[0] = makeNode(Zone.forest, to(1), to(0), to(0), to(0));
      node[1] = makeNode(Zone.forest, to(2), to(0), pz(28), to(0));

      // node[1] = makeNode(Zone.forest, to(46), to(0), to(0), to(0));

      node[2] = makeNode(Zone.forest, to(3), to(0), to(1), to(0));
      node[3] = makeNode(Zone.forest, to(11), to(10, 2), to(2), to(4, 0));
      node[4] = makeNode(Zone.forest, to(5), to(0), to(3, 1), to(0));
      node[5] = makeNode(Zone.forest, to(6), to(0), to(4), pz(4));
      node[6] = makeNode(Zone.forest, to(7, 1), to(0), to(5), to(0));
      node[7] = makeNode(Zone.forest, to(12), to(8, 0), pz(1), to(6, 2));
      node[8] = makeNode(Zone.forest, to(9, 2), to(0), to(7, 3), to(0));
      node[9] = makeNode(Zone.forest, to(8, 2), to(0), to(10, 0), to(0));

      node[10] = makeNode(Zone.forest, to(3, 3), to(0), to(9, 0), to(0));
      node[11] = makeNode(Zone.forest, pz(25), to(0), to(3), to(0));
      node[12] = makeNode(Zone.forest, pz(3), to(0), to(7), to(14, 0));
      node[13] = makeNode(Zone.studio, to(17), to(15), pz(3), pz(2));
      node[14] = makeNode(Zone.forest, to(18), to(0), to(12, 1), to(0));
      node[15] = makeNode(Zone.studio, to(16), to(0), to(0), to(13));
      node[16] = makeNode(Zone.studio, to(21), pz(7), to(15), to(17));
      node[17] = makeNode(Zone.studio, to(20), to(16), to(13), to(0));
      node[18] = makeNode(Zone.forest, pz(31), pz(2), to(14), to(0));
      node[19] = makeNode(Zone.studio, to(0), to(20), pz(5), to(0));

      node[20] = makeNode(Zone.studio, pz(6), to(21), to(17), to(19));
      node[21] = makeNode(Zone.studio, pz(35), to(0), to(16), to(20));
      node[22] = makeNode(Zone.circular, to(0), to(23), to(0), to(16));
      node[23] = makeNode(Zone.circular, to(30), pz(16), to(24), pz(7));
      node[24] = makeNode(Zone.circular, to(23), to(0), to(25), to(0));
      node[25] = makeNode(Zone.circular, to(24), to(0), to(26), pz(8));
      node[26] = makeNode(Zone.circular, to(25), to(0), to(27), to(0));
      node[27] = makeNode(Zone.circular, to(26), to(0), to(28), pz(9));
      node[28] = makeNode(Zone.circular, to(27), to(0), to(29), pz(40));
      node[29] = makeNode(Zone.circular, to(28), to(0), to(30), to(33, 0));

      node[30] = makeNode(Zone.circular, to(29), to(0), to(23), to(0));
      node[31] = makeNode(Zone.circular, to(25, 1), to(0), to(35), to(0));
      node[32] = makeNode(Zone.studio, to(0), to(52), to(0), to(27, 1));
      node[33] = makeNode(Zone.circular, pz(14), to(0), to(29, 1), to(0));
      node[34] = makeNode(Zone.entente, pz(37), to(0), to(0), to(39));
      node[35] = makeNode(Zone.stones, pz(8), to(38), to(36), to(0));
      node[36] = makeNode(Zone.stones, to(35), to(37), to(0), to(0));
      node[37] = makeNode(Zone.stones, to(38), to(39), to(0), to(36));
      node[38] = makeNode(Zone.stones, pz(12), to(0), to(37), to(35));
      node[39] = makeNode(Zone.stones, pz(10), pz(11), to(40), to(37));

      node[40] = makeNode(Zone.stones, to(39), to(0), to(41), to(0));
      node[41] = makeNode(Zone.stones, to(40), to(0), to(0), to(42));
      node[42] = makeNode(Zone.stones, to(0), to(41), to(44), to(43));
      node[43] = makeNode(Zone.stones, to(0), to(42), to(0), pz(35));
      node[44] = makeNode(Zone.stones, to(42), to(0), to(46), to(0));
      node[45] = makeNode(Zone.rainre, pz(13), to(0), pz(1), to(39));
      node[46] = makeNode(Zone.stones, to(44), to(0), pz(15), to(0));
      node[47] = makeNode(Zone.antechannel, to(0), to(48), to(77), to(0));
      node[48] = makeNode(Zone.antechannel, pz(25), to(0), to(49), to(47));
      node[49] = makeNode(Zone.antechannel, to(48), to(0), pz(21), to(77));
      node[50] = makeNode(Zone.nataniev, to(0), to(0), pz(41), to(0));
      node[51] = makeNode(Zone.nataniev, to(0), to(0), to(64), to(0));

      node[52] = makeNode(Zone.antechannel, to(54), to(53), to(0), pz(9));
      node[53] = makeNode(Zone.antechannel, to(55), to(84), to(0), to(52));
      node[54] = makeNode(Zone.antechannel, to(57), to(55), to(52), to(0));
      node[55] = makeNode(Zone.antechannel, pz(39), to(56), to(53), to(54));
      node[56] = makeNode(Zone.antechannel, to(58), to(0), to(84), to(55));
      node[57] = makeNode(Zone.antechannel, to(59), to(0), to(54), to(0));
      node[58] = makeNode(Zone.antechannel, to(60), to(0), to(56), to(0));
      node[59] = makeNode(Zone.antechannel, to(61), to(0), to(57), to(0));

      node[60] = makeNode(Zone.antechannel, to(62), to(0), to(56), to(0));
      node[61] = makeNode(Zone.antechannel, to(0), to(0), to(59), pz(19));
      node[62] = makeNode(Zone.antechannel, pz(26), to(0), to(60), to(0));
      node[63] = makeNode(Zone.metamondst, to(73), to(69), to(0), to(67));
      node[64] = makeNode(Zone.nataniev, to(63), to(0), to(0), to(0));
      node[65] = makeNode(Zone.entente, to(0), to(0), pz(46), to(0));
      node[67] = makeNode(Zone.metamondst, to(74), to(63), to(0), to(70));
      node[69] = makeNode(Zone.metamondst, pz(18), pz(19), to(0), to(63));

      node[70] = makeNode(Zone.metamondst, to(75), to(67), to(0), to(0));
      node[72] = makeNode(Zone.metamondst, to(0), to(61), to(0), to(69));
      node[73] = makeNode(Zone.metamondst, to(81), to(0), to(63), to(0));
      node[74] = makeNode(Zone.metamondst, to(80), to(0), to(67), to(0));
      node[75] = makeNode(Zone.metamondst, to(76), to(0), to(70), to(0));
      node[76] = makeNode(Zone.metamondst, to(0), to(0), to(75), pz(30));
      node[77] = makeNode(Zone.antechannel, to(47), to(49), pz(26), pz(27));
      node[78] = makeNode(Zone.metamondst, to(83), to(0), to(0), to(81));
      node[79] = makeNode(Zone.capsule, to(0), pz(33), to(87), to(0));

      node[80] = makeNode(Zone.metamondst, to(85), to(0), to(74), to(0));
      node[81] = makeNode(Zone.metamondst, to(82), to(78), to(73), to(0));
      node[82] = makeNode(Zone.metamondst, to(0), to(83), to(81), pz(20));
      node[83] = makeNode(Zone.metamondst, to(0), to(0), to(78), to(82));
      node[84] = makeNode(Zone.antechannel, to(56), to(0), pz(47), to(53));
      node[85] = makeNode(Zone.metamondst, pz(15), to(0), to(80), to(86));
      node[86] = makeNode(Zone.metamondst, to(0), to(85), to(0), pz(1));
      node[87] = makeNode(Zone.capsule, to(79), pz(30), to(0), to(88));
      node[88] = makeNode(Zone.capsule, to(0), to(87), to(0), to(141));

      node[89] = makeNode(Zone.entente, pz(42), to(0), to(90), to(0));
      node[90] = makeNode(Zone.entente, to(89), to(0), to(91), to(0));
      node[91] = makeNode(Zone.entente, to(90), pz(23), to(103), to(0));

      node[92] = makeNode(Zone.entente, to(91), to(0), to(93), to(0));
      node[93] = makeNode(Zone.entente, to(92), to(0), to(94), to(0));
      node[94] = makeNode(Zone.entente, to(93), to(0), to(95), to(0));
      node[95] = makeNode(Zone.entente, to(94), pz(24), to(96), to(0));
      node[96] = makeNode(Zone.entente, to(95), to(0), to(97), to(0));
      node[97] = makeNode(Zone.entente, to(96), to(0), to(98), to(0));
      node[98] = makeNode(Zone.entente, to(97), to(99), to(65), to(101));
      node[99] = makeNode(Zone.entente, to(0), to(100), to(0), to(98));
      node[100] = makeNode(Zone.entente, to(0), pz(44), to(0), to(99));
      node[101] = makeNode(Zone.entente, to(0), to(98), pz(38), to(102));
      node[102] = makeNode(Zone.entente, to(0), to(101), to(0), pz(45));
      node[103] = makeNode(Zone.entente, to(91), to(0), pz(43), to(0));

      node[104] = makeNode(Zone.entente, to(0), to(100), to(0), to(105));
      node[105] = makeNode(Zone.entente, to(0), to(104), pz(24), to(106));
      node[106] = makeNode(Zone.entente, to(0), to(105), to(0), to(107));
      node[107] = makeNode(Zone.entente, to(0), to(106), to(0), to(108));
      node[108] = makeNode(Zone.entente, to(0), to(107), to(0), to(109));
      node[109] = makeNode(Zone.entente, to(0), to(108), to(0), to(110));
      node[110] = makeNode(Zone.entente, to(0), to(109), to(0), to(111));
      node[111] = makeNode(Zone.entente, to(0), to(110), to(0), to(1, 0));

      node[112] = makeNode(Zone.nataniev, to(115), to(113), to(0), pz(33));
      node[113] = makeNode(Zone.nataniev, to(114), pz(36), pz(40), to(112));
      node[114] = makeNode(Zone.nataniev, to(0), to(0), to(113), to(115));
      node[115] = makeNode(Zone.nataniev, to(0), to(114), to(112), to(0));
      node[116] = makeNode(Zone.entente, to(0), to(0), to(0), to(20, 2));

      node[141] = makeNode(Zone.entente, to(0), to(88), to(0), to(142));
      node[142] = makeNode(Zone.entente, to(0), to(141), to(0), pz(54));
      node[143] = makeNode(Zone.nataniev, to(0), pz(54), to(0), to(0));
    }

    {
      let puzzle = this.puzzlesByID;
      puzzle[0] = makePuzzle("");
      puzzle[1] = makePuzzle("clockTerminal");
      puzzle[2] = makePuzzle("energyTerminal");
      puzzle[3] = makePuzzle("energyDoor");
      puzzle[4] = makePuzzle("sealTerminal");
      puzzle[5] = makePuzzle("sealDoor");
      puzzle[6] = makePuzzle("energyDoor");
      puzzle[7] = makePuzzle("clockDoor");
      puzzle[8] = makePuzzle("clockDoor");
      puzzle[9] = makePuzzle("clockDoor");
      puzzle[10] = makePuzzle("energyTerminal");
      puzzle[11] = makePuzzle("energyDoor");
      puzzle[12] = makePuzzle("sealTerminal");
      puzzle[13] = makePuzzle("sealTerminal");
      puzzle[14] = makePuzzle("killTerminal");
      puzzle[15] = makePuzzle("sealDoor");
      puzzle[16] = makePuzzle("progressTerminal");
      puzzle[17] = makePuzzle("illusion"); // act17 studio Illusion
      puzzle[18] = makePuzzle("energyTerminal");
      puzzle[19] = makePuzzle("energyDoor");
      puzzle[20] = makePuzzle("sealTerminal");
      puzzle[21] = makePuzzle("sealTerminal");
      puzzle[22] = makePuzzle("illusion"); // act22 stones Illusion
      puzzle[23] = makePuzzle("ententeTerminal");
      puzzle[24] = makePuzzle("ententeTerminal");
      puzzle[25] = makePuzzle("sealDoor");
      puzzle[26] = makePuzzle("energyDoor");
      puzzle[27] = makePuzzle("energyTerminal");

      // Studio Lock

      puzzle[28] = makePuzzle("energyDoor");
      puzzle[29] = makePuzzle("illusion"); // act29 metamondst Illusion
      puzzle[30] = makePuzzle("energyDoor");

      // Collectibles

      puzzle[31] = makePuzzle("energyTerminal");
      puzzle[32] = makePuzzle("illusion"); // act32 antech Illusion
      puzzle[33] = makePuzzle("energyDoor");
      puzzle[34] = makePuzzle("audioTerminal");
      puzzle[35] = makePuzzle("audioTerminal");
      puzzle[36] = makePuzzle("energyTerminal");
      puzzle[37] = makePuzzle("energyTerminal");
      puzzle[38] = makePuzzle("energyTerminal"); // Entente Fuse
      puzzle[39] = makePuzzle("energyTerminal");
      puzzle[40] = makePuzzle("endgameDoor");
      puzzle[41] = makePuzzle("endgameCredit");

      // Entente Puzzle

      puzzle[42] = makePuzzle("entente");
      puzzle[43] = makePuzzle("entente");
      puzzle[44] = makePuzzle("entente");
      puzzle[45] = makePuzzle("entente");
      puzzle[46] = makePuzzle("entente");

      // Spare Fuse

      puzzle[47] = makePuzzle("energyTerminal");
      puzzle[48] = makePuzzle("illusion");
      puzzle[49] = makePuzzle("illusion");
      puzzle[50] = makePuzzle("illusion");
      puzzle[51] = makePuzzle("illusion");
      puzzle[52] = makePuzzle("illusion");
      puzzle[53] = makePuzzle("illusion");
      puzzle[54] = makePuzzle("timeDoor");
    }
  }
}

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
