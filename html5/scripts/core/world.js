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

      node[0] = ["1", "0", "0", "0", Zone.forest];
      node[1] = ["2", "0", "act28", "0", Zone.forest];

      //  node[1]     = ["46", "0", "0", "0", Zone.forest];

      node[2] = ["3", "0", "1", "0", Zone.forest];
      node[3] = ["11", "10|2", "2", "4|0", Zone.forest];
      node[4] = ["5", "0", "3|1", "0", Zone.forest];
      node[5] = ["6", "0", "4", "act4", Zone.forest];
      node[6] = ["7|1", "0", "5", "0", Zone.forest];
      node[7] = ["12", "8|0", "act1", "6|2", Zone.forest];
      node[8] = ["9|2", "0", "7|3", "0", Zone.forest];
      node[9] = ["8|2", "0", "10|0", "0", Zone.forest];

      node[10] = ["3|3", "0", "9|0", "0", Zone.forest];
      node[11] = ["act25", "0", "3", "0", Zone.forest];
      node[12] = ["act3", "0", "7", "14|0", Zone.forest];
      node[13] = ["17", "15", "act3", "act2", Zone.studio];
      node[14] = ["18", "0", "12|1", "0", Zone.forest];
      node[15] = ["16", "0", "0", "13", Zone.studio];
      node[16] = ["21", "act7", "15", "17", Zone.studio];
      node[17] = ["20", "16", "13", "0", Zone.studio];
      node[18] = ["act31", "act2", "14", "0", Zone.forest];
      node[19] = ["0", "20", "act5", "0", Zone.studio];

      node[20] = ["act6", "21", "17", "19", Zone.studio];
      node[21] = ["act35", "0", "16", "20", Zone.studio];
      node[22] = ["0", "23", "0", "16", Zone.circular];
      node[23] = ["30", "act16", "24", "act7", Zone.circular];
      node[24] = ["23", "0", "25", "0", Zone.circular];
      node[25] = ["24", "0", "26", "act8", Zone.circular];
      node[26] = ["25", "0", "27", "0", Zone.circular];
      node[27] = ["26", "0", "28", "act9", Zone.circular];
      node[28] = ["27", "0", "29", "act40", Zone.circular];
      node[29] = ["28", "0", "30", "33|0", Zone.circular];

      node[30] = ["29", "0", "23", "0", Zone.circular];
      node[31] = ["25|1", "0", "35", "0", Zone.circular];
      node[32] = ["0", "52", "0", "27|1", Zone.studio];
      node[33] = ["act14", "0", "29|1", "0", Zone.circular];
      node[34] = ["act37", "0", "0", "39", Zone.entente];
      node[35] = ["act8", "38", "36", "0", Zone.stones];
      node[36] = ["35", "37", "0", "0", Zone.stones];
      node[37] = ["38", "39", "0", "36", Zone.stones];
      node[38] = ["act12", "0", "37", "35", Zone.stones];
      node[39] = ["act10", "act11", "40", "37", Zone.stones];

      node[40] = ["39", "0", "41", "0", Zone.stones];
      node[41] = ["40", "0", "0", "42", Zone.stones];
      node[42] = ["0", "41", "44", "43", Zone.stones];
      node[43] = ["0", "42", "0", "act35", Zone.stones];
      node[44] = ["42", "0", "46", "0", Zone.stones];
      node[45] = ["act13", "0", "act1", "39", Zone.rainre];
      node[46] = ["44", "0", "act15", "0", Zone.stones];
      node[47] = ["0", "48", "77", "0", Zone.antechannel];
      node[48] = ["act25", "0", "49", "47", Zone.antechannel];
      node[49] = ["48", "0", "act21", "77", Zone.antechannel];
      node[50] = ["0", "0", "act41", "0", Zone.nataniev];
      node[51] = ["0", "0", "64", "0", Zone.nataniev];

      node[52] = ["54", "53", "0", "act9", Zone.antechannel];
      node[53] = ["55", "84", "0", "52", Zone.antechannel];
      node[54] = ["57", "55", "52", "0", Zone.antechannel];
      node[55] = ["act39", "56", "53", "54", Zone.antechannel];
      node[56] = ["58", "0", "84", "55", Zone.antechannel];
      node[57] = ["59", "0", "54", "0", Zone.antechannel];
      node[58] = ["60", "0", "56", "0", Zone.antechannel];
      node[59] = ["61", "0", "57", "0", Zone.antechannel];

      node[60] = ["62", "0", "56", "0", Zone.antechannel];
      node[61] = ["0", "0", "59", "act19", Zone.antechannel];
      node[62] = ["act26", "0", "60", "0", Zone.antechannel];
      node[63] = ["73", "69", "0", "67", Zone.metamondst];
      node[64] = ["63", "0", "0", "0", Zone.nataniev];
      node[65] = ["0", "0", "act46", "0", Zone.entente];
      node[67] = ["74", "63", "0", "70", Zone.metamondst];
      node[69] = ["act18", "act19", "0", "63", Zone.metamondst];

      node[70] = ["75", "67", "0", "0", Zone.metamondst];
      node[72] = ["0", "61", "0", "69", Zone.metamondst];
      node[73] = ["81", "0", "63", "0", Zone.metamondst];
      node[74] = ["80", "0", "67", "0", Zone.metamondst];
      node[75] = ["76", "0", "70", "0", Zone.metamondst];
      node[76] = ["0", "0", "75", "act30", Zone.metamondst];
      node[77] = ["47", "49", "act26", "act27", Zone.antechannel];
      node[78] = ["83", "0", "0", "81", Zone.metamondst];
      node[79] = ["0", "act33", "87", "0", Zone.capsule];

      node[80] = ["85", "0", "74", "0", Zone.metamondst];
      node[81] = ["82", "78", "73", "0", Zone.metamondst];
      node[82] = ["0", "83", "81", "act20", Zone.metamondst];
      node[83] = ["0", "0", "78", "82", Zone.metamondst];
      node[84] = ["56", "0", "act47", "53", Zone.antechannel];
      node[85] = ["act15", "0", "80", "86", Zone.metamondst];
      node[86] = ["0", "85", "0", "act1", Zone.metamondst];
      node[87] = ["79", "act30", "0", "88", Zone.capsule];
      node[88] = ["0", "87", "0", "141", Zone.capsule];

      node[89] = ["act42", "0", "90", "0", Zone.entente];
      node[90] = ["89", "0", "91", "0", Zone.entente];
      node[91] = ["90", "act23", "103", "0", Zone.entente];

      node[92] = ["91", "0", "93", "0", Zone.entente];
      node[93] = ["92", "0", "94", "0", Zone.entente];
      node[94] = ["93", "0", "95", "0", Zone.entente];
      node[95] = ["94", "act24", "96", "0", Zone.entente];
      node[96] = ["95", "0", "97", "0", Zone.entente];
      node[97] = ["96", "0", "98", "0", Zone.entente];
      node[98] = ["97", "99", "65", "101", Zone.entente];
      node[99] = ["0", "100", "0", "98", Zone.entente];
      node[100] = ["0", "act44", "0", "99", Zone.entente];
      node[101] = ["0", "98", "act38", "102", Zone.entente];
      node[102] = ["0", "101", "0", "act45", Zone.entente];
      node[103] = ["91", "0", "act43", "0", Zone.entente];

      node[104] = ["0", "100", "0", "105", Zone.entente];
      node[105] = ["0", "104", "act24", "106", Zone.entente];
      node[106] = ["0", "105", "0", "107", Zone.entente];
      node[107] = ["0", "106", "0", "108", Zone.entente];
      node[108] = ["0", "107", "0", "109", Zone.entente];
      node[109] = ["0", "108", "0", "110", Zone.entente];
      node[110] = ["0", "109", "0", "111", Zone.entente];
      node[111] = ["0", "110", "0", "1|0", Zone.entente];

      node[112] = ["115", "113", "0", "act33", Zone.nataniev];
      node[113] = ["114", "act36", "act40", "112", Zone.nataniev];
      node[114] = ["0", "0", "113", "115", Zone.nataniev];
      node[115] = ["0", "114", "112", "0", Zone.nataniev];
      node[116] = ["0", "0", "0", "20|2", Zone.entente];

      node[141] = ["0", "88", "0", "142", Zone.entente];
      node[142] = ["0", "141", "0", "act54", Zone.entente];
      node[143] = ["0", "act54", "0", "0", Zone.nataniev];
    }

    {
      let puzzle = this.puzzlesByID;
      puzzle[0] = "";
      puzzle[1] = "clockTerminal";
      puzzle[2] = "energyTerminal";
      puzzle[3] = "energyDoor";
      puzzle[4] = "sealTerminal";
      puzzle[5] = "sealDoor";
      puzzle[6] = "energyDoor";
      puzzle[7] = "clockDoor";
      puzzle[8] = "clockDoor";
      puzzle[9] = "clockDoor";
      puzzle[10] = "energyTerminal";
      puzzle[11] = "energyDoor";
      puzzle[12] = "sealTerminal";
      puzzle[13] = "sealTerminal";
      puzzle[14] = "killTerminal";
      puzzle[15] = "sealDoor";
      puzzle[16] = "progressTerminal";
      puzzle[17] = "illusion"; // act17 studio Illusion
      puzzle[18] = "energyTerminal";
      puzzle[19] = "energyDoor";
      puzzle[20] = "sealTerminal";
      puzzle[21] = "sealTerminal";
      puzzle[22] = "illusion"; // act22 stones Illusion
      puzzle[23] = "ententeTerminal";
      puzzle[24] = "ententeTerminal";
      puzzle[25] = "sealDoor";
      puzzle[26] = "energyDoor";
      puzzle[27] = "energyTerminal";

      // Studio Lock

      puzzle[28] = "energyDoor";
      puzzle[29] = "illusion"; // act29 metamondst Illusion
      puzzle[30] = "energyDoor";

      // Collectibles

      puzzle[31] = "energyTerminal";
      puzzle[32] = "illusion"; // act32 antech Illusion
      puzzle[33] = "energyDoor";
      puzzle[34] = "audioTerminal";
      puzzle[35] = "audioTerminal";
      puzzle[36] = "energyTerminal";
      puzzle[37] = "energyTerminal";
      puzzle[38] = "energyTerminal"; // Entente Fuse
      puzzle[39] = "energyTerminal";
      puzzle[40] = "endgameDoor";
      puzzle[41] = "endgameCredit";

      // Entente Puzzle

      puzzle[42] = "entente";
      puzzle[43] = "entente";
      puzzle[44] = "entente";
      puzzle[45] = "entente";
      puzzle[46] = "entente";

      // Spare Fuse

      puzzle[47] = "energyTerminal";
      puzzle[48] = "illusion";
      puzzle[49] = "illusion";
      puzzle[50] = "illusion";
      puzzle[51] = "illusion";
      puzzle[52] = "illusion";
      puzzle[53] = "illusion";
      puzzle[54] = "timeDoor";
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
