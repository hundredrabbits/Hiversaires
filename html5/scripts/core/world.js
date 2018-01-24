class World {
  constructor() {
    this.nodesByID = {};
    this.puzzlesByID = {};

    {
      let node = this.nodesByID;

      for (let i = 0; i < 150; i++) {
        node[i] = ["0", "0", "0", "0", "silence"];
      }

      // ====================
      // Forest ( 0 - 11 )
      // ====================

      node[0] = ["1", "0", "0", "0", "forest"];
      node[1] = ["2", "0", "act28", "0", "forest"];

      //  node[1]     = ["46", "0", "0", "0", "forest"];

      node[2] = ["3", "0", "1", "0", "forest"];
      node[3] = ["11", "10|2", "2", "4|0", "forest"];
      node[4] = ["5", "0", "3|1", "0", "forest"];
      node[5] = ["6", "0", "4", "act4", "forest"];
      node[6] = ["7|1", "0", "5", "0", "forest"];
      node[7] = ["12", "8|0", "act1", "6|2", "forest"];
      node[8] = ["9|2", "0", "7|3", "0", "forest"];
      node[9] = ["8|2", "0", "10|0", "0", "forest"];

      node[10] = ["3|3", "0", "9|0", "0", "forest"];
      node[11] = ["act25", "0", "3", "0", "forest"];
      node[12] = ["act3", "0", "7", "14|0", "forest"];
      node[13] = ["17", "15", "act3", "act2", "studio"];
      node[14] = ["18", "0", "12|1", "0", "forest"];
      node[15] = ["16", "0", "0", "13", "studio"];
      node[16] = ["21", "act7", "15", "17", "studio"];
      node[17] = ["20", "16", "13", "0", "studio"];
      node[18] = ["act31", "act2", "14", "0", "forest"];
      node[19] = ["0", "20", "act5", "0", "studio"];

      node[20] = ["act6", "21", "17", "19", "studio"];
      node[21] = ["act35", "0", "16", "20", "studio"];
      node[22] = ["0", "23", "0", "16", "circular"];
      node[23] = ["30", "act16", "24", "act7", "circular"];
      node[24] = ["23", "0", "25", "0", "circular"];
      node[25] = ["24", "0", "26", "act8", "circular"];
      node[26] = ["25", "0", "27", "0", "circular"];
      node[27] = ["26", "0", "28", "act9", "circular"];
      node[28] = ["27", "0", "29", "act40", "circular"];
      node[29] = ["28", "0", "30", "33|0", "circular"];

      node[30] = ["29", "0", "23", "0", "circular"];
      node[31] = ["25|1", "0", "35", "0", "circular"];
      node[32] = ["0", "52", "0", "27|1", "studio"];
      node[33] = ["act14", "0", "29|1", "0", "circular"];
      node[34] = ["act37", "0", "0", "39", "entente"];
      node[35] = ["act8", "38", "36", "0", "stones"];
      node[36] = ["35", "37", "0", "0", "stones"];
      node[37] = ["38", "39", "0", "36", "stones"];
      node[38] = ["act12", "0", "37", "35", "stones"];
      node[39] = ["act10", "act11", "40", "37", "stones"];

      node[40] = ["39", "0", "41", "0", "stones"];
      node[41] = ["40", "0", "0", "42", "stones"];
      node[42] = ["0", "41", "44", "43", "stones"];
      node[43] = ["0", "42", "0", "act35", "stones"];
      node[44] = ["42", "0", "46", "0", "stones"];
      node[45] = ["act13", "0", "act1", "39", "rainre"];
      node[46] = ["44", "0", "act15", "0", "stones"];
      node[47] = ["0", "48", "77", "0", "antechannel"];
      node[48] = ["act25", "0", "49", "47", "antechannel"];
      node[49] = ["48", "0", "act21", "77", "antechannel"];
      node[50] = ["0", "0", "act41", "0", "nataniev"];
      node[51] = ["0", "0", "64", "0", "nataniev"];

      node[52] = ["54", "53", "0", "act9", "antechannel"];
      node[53] = ["55", "84", "0", "52", "antechannel"];
      node[54] = ["57", "55", "52", "0", "antechannel"];
      node[55] = ["act39", "56", "53", "54", "antechannel"];
      node[56] = ["58", "0", "84", "55", "antechannel"];
      node[57] = ["59", "0", "54", "0", "antechannel"];
      node[58] = ["60", "0", "56", "0", "antechannel"];
      node[59] = ["61", "0", "57", "0", "antechannel"];

      node[60] = ["62", "0", "56", "0", "antechannel"];
      node[61] = ["0", "0", "59", "act19", "antechannel"];
      node[62] = ["act26", "0", "60", "0", "antechannel"];
      node[63] = ["73", "69", "0", "67", "metamondst"];
      node[64] = ["63", "0", "0", "0", "nataniev"];
      node[65] = ["0", "0", "act46", "0", "entente"];
      node[67] = ["74", "63", "0", "70", "metamondst"];
      node[69] = ["act18", "act19", "0", "63", "metamondst"];

      node[70] = ["75", "67", "0", "0", "metamondst"];
      node[72] = ["0", "61", "0", "69", "metamondst"];
      node[73] = ["81", "0", "63", "0", "metamondst"];
      node[74] = ["80", "0", "67", "0", "metamondst"];
      node[75] = ["76", "0", "70", "0", "metamondst"];
      node[76] = ["0", "0", "75", "act30", "metamondst"];
      node[77] = ["47", "49", "act26", "act27", "antechannel"];
      node[78] = ["83", "0", "0", "81", "metamondst"];
      node[79] = ["0", "act33", "87", "0", "capsule"];

      node[80] = ["85", "0", "74", "0", "metamondst"];
      node[81] = ["82", "78", "73", "0", "metamondst"];
      node[82] = ["0", "83", "81", "act20", "metamondst"];
      node[83] = ["0", "0", "78", "82", "metamondst"];
      node[84] = ["56", "0", "act47", "53", "antechannel"];
      node[85] = ["act15", "0", "80", "86", "metamondst"];
      node[86] = ["0", "85", "0", "act1", "metamondst"];
      node[87] = ["79", "act30", "0", "88", "capsule"];
      node[88] = ["0", "87", "0", "141", "capsule"];

      node[89] = ["act42", "0", "90", "0", "entente"];
      node[90] = ["89", "0", "91", "0", "entente"];
      node[91] = ["90", "act23", "103", "0", "entente"];

      node[92] = ["91", "0", "93", "0", "entente"];
      node[93] = ["92", "0", "94", "0", "entente"];
      node[94] = ["93", "0", "95", "0", "entente"];
      node[95] = ["94", "act24", "96", "0", "entente"];
      node[96] = ["95", "0", "97", "0", "entente"];
      node[97] = ["96", "0", "98", "0", "entente"];
      node[98] = ["97", "99", "65", "101", "entente"];
      node[99] = ["0", "100", "0", "98", "entente"];
      node[100] = ["0", "act44", "0", "99", "entente"];
      node[101] = ["0", "98", "act38", "102", "entente"];
      node[102] = ["0", "101", "0", "act45", "entente"];
      node[103] = ["91", "0", "act43", "0", "entente"];

      node[104] = ["0", "100", "0", "105", "entente"];
      node[105] = ["0", "104", "act24", "106", "entente"];
      node[106] = ["0", "105", "0", "107", "entente"];
      node[107] = ["0", "106", "0", "108", "entente"];
      node[108] = ["0", "107", "0", "109", "entente"];
      node[109] = ["0", "108", "0", "110", "entente"];
      node[110] = ["0", "109", "0", "111", "entente"];
      node[111] = ["0", "110", "0", "1|0", "entente"];

      node[112] = ["115", "113", "0", "act33", "nataniev"];
      node[113] = ["114", "act36", "act40", "112", "nataniev"];
      node[114] = ["0", "0", "113", "115", "nataniev"];
      node[115] = ["0", "114", "112", "0", "nataniev"];
      node[116] = ["0", "0", "0", "20|2", "entente"];

      node[141] = ["0", "88", "0", "142", "entente"];
      node[142] = ["0", "141", "0", "act54", "entente"];
      node[143] = ["0", "act54", "0", "0", "nataniev"];
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
