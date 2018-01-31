function makeNode(op0, op1, op2, op3, zone) {
  return [op0, op1, op2, op3, zone];
}

function makePuzzle(type) {
  return type;
}

class World {
  constructor() {
    this.nodesByID = {};
    this.puzzlesByID = {};

    {
      let node = this.nodesByID;

      for (let i = 0; i < 150; i++) {
        node[i] = ["0", "0", "0", "0", Zone.forest];
      }

      // ====================
      // Forest ( 0 - 11 )
      // ====================

      node[0] = makeNode("1", "0", "0", "0", Zone.forest);
      node[1] = makeNode("2", "0", "act28", "0", Zone.forest);

      // node[1] = makeNode("46", "0", "0", "0", Zone.forest);

      node[2] = makeNode("3", "0", "1", "0", Zone.forest);
      node[3] = makeNode("11", "10|2", "2", "4|0", Zone.forest);
      node[4] = makeNode("5", "0", "3|1", "0", Zone.forest);
      node[5] = makeNode("6", "0", "4", "act4", Zone.forest);
      node[6] = makeNode("7|1", "0", "5", "0", Zone.forest);
      node[7] = makeNode("12", "8|0", "act1", "6|2", Zone.forest);
      node[8] = makeNode("9|2", "0", "7|3", "0", Zone.forest);
      node[9] = makeNode("8|2", "0", "10|0", "0", Zone.forest);

      node[10] = makeNode("3|3", "0", "9|0", "0", Zone.forest);
      node[11] = makeNode("act25", "0", "3", "0", Zone.forest);
      node[12] = makeNode("act3", "0", "7", "14|0", Zone.forest);
      node[13] = makeNode("17", "15", "act3", "act2", Zone.studio);
      node[14] = makeNode("18", "0", "12|1", "0", Zone.forest);
      node[15] = makeNode("16", "0", "0", "13", Zone.studio);
      node[16] = makeNode("21", "act7", "15", "17", Zone.studio);
      node[17] = makeNode("20", "16", "13", "0", Zone.studio);
      node[18] = makeNode("act31", "act2", "14", "0", Zone.forest);
      node[19] = makeNode("0", "20", "act5", "0", Zone.studio);

      node[20] = makeNode("act6", "21", "17", "19", Zone.studio);
      node[21] = makeNode("act35", "0", "16", "20", Zone.studio);
      node[22] = makeNode("0", "23", "0", "16", Zone.circular);
      node[23] = makeNode("30", "act16", "24", "act7", Zone.circular);
      node[24] = makeNode("23", "0", "25", "0", Zone.circular);
      node[25] = makeNode("24", "0", "26", "act8", Zone.circular);
      node[26] = makeNode("25", "0", "27", "0", Zone.circular);
      node[27] = makeNode("26", "0", "28", "act9", Zone.circular);
      node[28] = makeNode("27", "0", "29", "act40", Zone.circular);
      node[29] = makeNode("28", "0", "30", "33|0", Zone.circular);

      node[30] = makeNode("29", "0", "23", "0", Zone.circular);
      node[31] = makeNode("25|1", "0", "35", "0", Zone.circular);
      node[32] = makeNode("0", "52", "0", "27|1", Zone.studio);
      node[33] = makeNode("act14", "0", "29|1", "0", Zone.circular);
      node[34] = makeNode("act37", "0", "0", "39", Zone.entente);
      node[35] = makeNode("act8", "38", "36", "0", Zone.stones);
      node[36] = makeNode("35", "37", "0", "0", Zone.stones);
      node[37] = makeNode("38", "39", "0", "36", Zone.stones);
      node[38] = makeNode("act12", "0", "37", "35", Zone.stones);
      node[39] = makeNode("act10", "act11", "40", "37", Zone.stones);

      node[40] = makeNode("39", "0", "41", "0", Zone.stones);
      node[41] = makeNode("40", "0", "0", "42", Zone.stones);
      node[42] = makeNode("0", "41", "44", "43", Zone.stones);
      node[43] = makeNode("0", "42", "0", "act35", Zone.stones);
      node[44] = makeNode("42", "0", "46", "0", Zone.stones);
      node[45] = makeNode("act13", "0", "act1", "39", Zone.rainre);
      node[46] = makeNode("44", "0", "act15", "0", Zone.stones);
      node[47] = makeNode("0", "48", "77", "0", Zone.antechannel);
      node[48] = makeNode("act25", "0", "49", "47", Zone.antechannel);
      node[49] = makeNode("48", "0", "act21", "77", Zone.antechannel);
      node[50] = makeNode("0", "0", "act41", "0", Zone.nataniev);
      node[51] = makeNode("0", "0", "64", "0", Zone.nataniev);

      node[52] = makeNode("54", "53", "0", "act9", Zone.antechannel);
      node[53] = makeNode("55", "84", "0", "52", Zone.antechannel);
      node[54] = makeNode("57", "55", "52", "0", Zone.antechannel);
      node[55] = makeNode("act39", "56", "53", "54", Zone.antechannel);
      node[56] = makeNode("58", "0", "84", "55", Zone.antechannel);
      node[57] = makeNode("59", "0", "54", "0", Zone.antechannel);
      node[58] = makeNode("60", "0", "56", "0", Zone.antechannel);
      node[59] = makeNode("61", "0", "57", "0", Zone.antechannel);

      node[60] = makeNode("62", "0", "56", "0", Zone.antechannel);
      node[61] = makeNode("0", "0", "59", "act19", Zone.antechannel);
      node[62] = makeNode("act26", "0", "60", "0", Zone.antechannel);
      node[63] = makeNode("73", "69", "0", "67", Zone.metamondst);
      node[64] = makeNode("63", "0", "0", "0", Zone.nataniev);
      node[65] = makeNode("0", "0", "act46", "0", Zone.entente);
      node[67] = makeNode("74", "63", "0", "70", Zone.metamondst);
      node[69] = makeNode("act18", "act19", "0", "63", Zone.metamondst);

      node[70] = makeNode("75", "67", "0", "0", Zone.metamondst);
      node[72] = makeNode("0", "61", "0", "69", Zone.metamondst);
      node[73] = makeNode("81", "0", "63", "0", Zone.metamondst);
      node[74] = makeNode("80", "0", "67", "0", Zone.metamondst);
      node[75] = makeNode("76", "0", "70", "0", Zone.metamondst);
      node[76] = makeNode("0", "0", "75", "act30", Zone.metamondst);
      node[77] = makeNode("47", "49", "act26", "act27", Zone.antechannel);
      node[78] = makeNode("83", "0", "0", "81", Zone.metamondst);
      node[79] = makeNode("0", "act33", "87", "0", Zone.capsule);

      node[80] = makeNode("85", "0", "74", "0", Zone.metamondst);
      node[81] = makeNode("82", "78", "73", "0", Zone.metamondst);
      node[82] = makeNode("0", "83", "81", "act20", Zone.metamondst);
      node[83] = makeNode("0", "0", "78", "82", Zone.metamondst);
      node[84] = makeNode("56", "0", "act47", "53", Zone.antechannel);
      node[85] = makeNode("act15", "0", "80", "86", Zone.metamondst);
      node[86] = makeNode("0", "85", "0", "act1", Zone.metamondst);
      node[87] = makeNode("79", "act30", "0", "88", Zone.capsule);
      node[88] = makeNode("0", "87", "0", "141", Zone.capsule);

      node[89] = makeNode("act42", "0", "90", "0", Zone.entente);
      node[90] = makeNode("89", "0", "91", "0", Zone.entente);
      node[91] = makeNode("90", "act23", "103", "0", Zone.entente);

      node[92] = makeNode("91", "0", "93", "0", Zone.entente);
      node[93] = makeNode("92", "0", "94", "0", Zone.entente);
      node[94] = makeNode("93", "0", "95", "0", Zone.entente);
      node[95] = makeNode("94", "act24", "96", "0", Zone.entente);
      node[96] = makeNode("95", "0", "97", "0", Zone.entente);
      node[97] = makeNode("96", "0", "98", "0", Zone.entente);
      node[98] = makeNode("97", "99", "65", "101", Zone.entente);
      node[99] = makeNode("0", "100", "0", "98", Zone.entente);
      node[100] = makeNode("0", "act44", "0", "99", Zone.entente);
      node[101] = makeNode("0", "98", "act38", "102", Zone.entente);
      node[102] = makeNode("0", "101", "0", "act45", Zone.entente);
      node[103] = makeNode("91", "0", "act43", "0", Zone.entente);

      node[104] = makeNode("0", "100", "0", "105", Zone.entente);
      node[105] = makeNode("0", "104", "act24", "106", Zone.entente);
      node[106] = makeNode("0", "105", "0", "107", Zone.entente);
      node[107] = makeNode("0", "106", "0", "108", Zone.entente);
      node[108] = makeNode("0", "107", "0", "109", Zone.entente);
      node[109] = makeNode("0", "108", "0", "110", Zone.entente);
      node[110] = makeNode("0", "109", "0", "111", Zone.entente);
      node[111] = makeNode("0", "110", "0", "1|0", Zone.entente);

      node[112] = makeNode("115", "113", "0", "act33", Zone.nataniev);
      node[113] = makeNode("114", "act36", "act40", "112", Zone.nataniev);
      node[114] = makeNode("0", "0", "113", "115", Zone.nataniev);
      node[115] = makeNode("0", "114", "112", "0", Zone.nataniev);
      node[116] = makeNode("0", "0", "0", "20|2", Zone.entente);

      node[141] = makeNode("0", "88", "0", "142", Zone.entente);
      node[142] = makeNode("0", "141", "0", "act54", Zone.entente);
      node[143] = makeNode("0", "act54", "0", "0", Zone.nataniev);
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
