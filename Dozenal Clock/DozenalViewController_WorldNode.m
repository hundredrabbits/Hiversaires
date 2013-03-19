#import "DozenalViewController_WorldNode.h"

@implementation DozenalViewController (Math)


-(NSMutableArray*) worldPath
{
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"",nil];
	
	int myCount = 0;
	
	while ( myCount < 140 )
	{
		myCount++;
		node[myCount] = [NSArray arrayWithObjects: @"0", @"0", @"0", @"0", @"silence", nil];
	}
	
	// ====================
	// Forest ( 0 - 11 )
	// ====================	

	node[0]		= [NSArray arrayWithObjects: @"1", @"0", @"0", @"0", @"forest", nil];
	node[1]		= [NSArray arrayWithObjects: @"2", @"0", @"act28", @"0", @"forest", nil];
	
	node[2]		= [NSArray arrayWithObjects: @"3", @"0", @"1", @"0", @"forest", nil];
	node[3]		= [NSArray arrayWithObjects: @"11", @"10|2", @"2", @"4|0", @"forest", nil];
	node[4]		= [NSArray arrayWithObjects: @"5", @"0", @"3|1", @"0", @"forest", nil];
	node[5]		= [NSArray arrayWithObjects: @"6", @"0", @"4", @"act4", @"forest", nil];
	node[6]		= [NSArray arrayWithObjects: @"7|1", @"0", @"5", @"0", @"forest", nil];
	node[7]		= [NSArray arrayWithObjects: @"12", @"8|0", @"act1", @"6|2", @"forest", nil];	
	node[8]		= [NSArray arrayWithObjects: @"9|2", @"0", @"7|3", @"0", @"forest", nil];
	node[9]		= [NSArray arrayWithObjects: @"8|2", @"act32", @"10|0", @"0", @"forest", nil];
	
	node[10]	= [NSArray arrayWithObjects: @"3|3", @"0", @"9|0", @"0", @"studio", nil];	
	node[11]	= [NSArray arrayWithObjects: @"act25", @"0", @"3", @"0", @"studio", nil];	
	node[12]	= [NSArray arrayWithObjects: @"act3", @"0", @"7", @"14|0", @"studio", nil];
	node[13]	= [NSArray arrayWithObjects: @"17", @"15", @"act3", @"act2", @"studio", nil];
	node[14]	= [NSArray arrayWithObjects: @"18", @"0", @"12|1", @"0", @"studio", nil];
	node[15]	= [NSArray arrayWithObjects: @"16", @"0", @"act33", @"13", @"studio", nil];
	node[16]	= [NSArray arrayWithObjects: @"21", @"act7", @"15", @"17", @"studio", nil];
	node[17]	= [NSArray arrayWithObjects: @"20", @"16", @"13", @"0", @"studio", nil];
	node[18]	= [NSArray arrayWithObjects: @"act31", @"act2", @"14", @"0", @"studio", nil];
	node[19]	= [NSArray arrayWithObjects: @"0", @"20", @"act5", @"0", @"studio", nil];
	
	node[20]	= [NSArray arrayWithObjects: @"act6", @"21", @"17", @"19", @"silence", nil];
	node[21]	= [NSArray arrayWithObjects: @"0", @"0", @"16", @"20", @"studio", nil];
	node[22]	= [NSArray arrayWithObjects: @"0", @"23", @"0", @"16", @"silence", nil];		
	node[23]	= [NSArray arrayWithObjects: @"30", @"act16", @"24", @"act7", @"silence", nil];		
	node[24]	= [NSArray arrayWithObjects: @"23", @"0", @"25", @"0", @"silence", nil];		
	node[25]	= [NSArray arrayWithObjects: @"24", @"0", @"26", @"act8", @"silence", nil];		
	node[26]	= [NSArray arrayWithObjects: @"25", @"0", @"27", @"0", @"silence", nil];		
	node[27]	= [NSArray arrayWithObjects: @"26", @"0", @"28", @"act9", @"silence", nil];		
	node[28]	= [NSArray arrayWithObjects: @"27", @"0", @"29", @"act40", @"silence", nil];		
	node[29]	= [NSArray arrayWithObjects: @"28", @"0", @"30", @"33|0", @"silence", nil];	// Must add act40 somewhere in circ
	
	node[30]	= [NSArray arrayWithObjects: @"29", @"0", @"23", @"0", @"silence", nil];		
	node[31]	= [NSArray arrayWithObjects: @"25|1", @"0", @"35", @"0", @"silence", nil];
	node[32]	= [NSArray arrayWithObjects: @"0", @"52", @"35", @"27|1", @"silence", nil];	
	node[33]	= [NSArray arrayWithObjects: @"0", @"0", @"29|1", @"0", @"silence", nil];	
	node[34]	= [NSArray arrayWithObjects: @"0", @"0", @"0", @"39", @"silence", nil];		
	node[35]	= [NSArray arrayWithObjects: @"act8", @"38", @"36", @"0", @"silence", nil];		
	node[36]	= [NSArray arrayWithObjects: @"35", @"37", @"0", @"0", @"silence", nil];		
	node[37]	= [NSArray arrayWithObjects: @"38", @"39", @"0", @"36", @"silence", nil];
	node[38]	= [NSArray arrayWithObjects: @"act12", @"0", @"37", @"35", @"silence", nil];		
	node[39]	= [NSArray arrayWithObjects: @"act10", @"act11", @"40", @"37", @"silence", nil];
	
	node[40]	= [NSArray arrayWithObjects: @"39", @"0", @"41", @"0", @"silence", nil];
	node[41]	= [NSArray arrayWithObjects: @"40", @"0", @"0", @"42", @"silence", nil];
	node[42]	= [NSArray arrayWithObjects: @"0", @"41", @"44", @"43", @"silence", nil];
	node[43]	= [NSArray arrayWithObjects: @"0", @"42", @"0", @"act34", @"silence", nil];
	node[44]	= [NSArray arrayWithObjects: @"42", @"0", @"46", @"0", @"silence", nil];
	node[45]	= [NSArray arrayWithObjects: @"act13", @"0", @"act1", @"39", @"silence", nil];
	node[46]	= [NSArray arrayWithObjects: @"44", @"0", @"act15", @"0", @"silence", nil];
	node[47]	= [NSArray arrayWithObjects: @"act38", @"48", @"77", @"0", @"silence", nil];
	node[48]	= [NSArray arrayWithObjects: @"act25", @"0", @"49", @"47", @"silence", nil];
	node[49]	= [NSArray arrayWithObjects: @"48", @"act22", @"act21", @"77", @"silence", nil];
	node[51]	= [NSArray arrayWithObjects: @"0", @"act35", @"0", @"0", @"silence", nil];
	
	node[52]	= [NSArray arrayWithObjects: @"54", @"53", @"0", @"act9", @"silence", nil];
	node[53]	= [NSArray arrayWithObjects: @"55", @"84", @"0", @"52", @"silence", nil];
	node[54]	= [NSArray arrayWithObjects: @"57", @"55", @"52", @"0", @"silence", nil];
	node[55]	= [NSArray arrayWithObjects: @"0", @"56", @"53", @"54", @"silence", nil];
	node[56]	= [NSArray arrayWithObjects: @"58", @"0", @"84", @"55", @"silence", nil];
	node[57]	= [NSArray arrayWithObjects: @"59", @"0", @"54", @"0", @"silence", nil];
	node[58]	= [NSArray arrayWithObjects: @"60", @"0", @"56", @"0", @"silence", nil];
	node[59]	= [NSArray arrayWithObjects: @"61", @"0", @"57", @"0", @"silence", nil];
	
	node[60]	= [NSArray arrayWithObjects: @"62", @"0", @"56", @"0", @"silence", nil];
	node[61]	= [NSArray arrayWithObjects: @"0", @"0", @"59", @"act19", @"silence", nil];
	node[62]	= [NSArray arrayWithObjects: @"act26", @"0", @"60", @"0", @"silence", nil];
	node[63]	= [NSArray arrayWithObjects: @"73", @"69", @"0", @"67", @"silence", nil];
	node[64]	= [NSArray arrayWithObjects: @"63", @"0", @"0", @"0", @"silence", nil];
	node[65]	= [NSArray arrayWithObjects: @"0", @"0", @"act46", @"0", @"silence", nil];
	node[67]	= [NSArray arrayWithObjects: @"74", @"63", @"0", @"70", @"silence", nil];
	node[69]	= [NSArray arrayWithObjects: @"act18", @"act19", @"0", @"63", @"silence", nil];
	
	node[70]	= [NSArray arrayWithObjects: @"75", @"67", @"0", @"0", @"silence", nil];
	node[72]	= [NSArray arrayWithObjects: @"0", @"61", @"0", @"69", @"silence", nil];
	node[73]	= [NSArray arrayWithObjects: @"81", @"0", @"63", @"0", @"silence", nil];
	node[74]	= [NSArray arrayWithObjects: @"80", @"0", @"67", @"0", @"silence", nil];
	node[75]	= [NSArray arrayWithObjects: @"76", @"0", @"70", @"0", @"silence", nil];
	node[76]	= [NSArray arrayWithObjects: @"0", @"0", @"75", @"act30", @"silence", nil];
	node[77]	= [NSArray arrayWithObjects: @"47", @"49", @"act26", @"act27", @"silence", nil];
	node[78]	= [NSArray arrayWithObjects: @"83", @"0", @"0", @"81", @"silence", nil];
	node[79]	= [NSArray arrayWithObjects: @"0", @"0", @"87", @"0", @"silence", nil];
	
	node[80]	= [NSArray arrayWithObjects: @"85", @"0", @"74", @"0", @"silence", nil];
	node[81]	= [NSArray arrayWithObjects: @"82", @"78", @"73", @"0", @"silence", nil];
	node[82]	= [NSArray arrayWithObjects: @"0", @"83", @"81", @"act20", @"silence", nil];
	node[83]	= [NSArray arrayWithObjects: @"act37", @"0", @"78", @"82", @"silence", nil];
	node[84]	= [NSArray arrayWithObjects: @"56", @"0", @"act47", @"53", @"silence", nil];
	node[85]	= [NSArray arrayWithObjects: @"act15", @"0", @"80", @"86", @"silence", nil];
	node[86]	= [NSArray arrayWithObjects: @"0", @"85", @"0", @"act1", @"silence", nil];
	node[87]	= [NSArray arrayWithObjects: @"79", @"act30", @"act39", @"88", @"silence", nil];
	node[88]	= [NSArray arrayWithObjects: @"0", @"87", @"0", @"0", @"silence", nil];
		
	node[89]	= [NSArray arrayWithObjects: @"act42", @"0", @"90", @"0", @"silence", nil];
	node[90]	= [NSArray arrayWithObjects: @"89", @"0", @"91", @"0", @"silence", nil];
	node[91]	= [NSArray arrayWithObjects: @"90", @"act23", @"103", @"act31", @"silence", nil];
	
	node[103]	= [NSArray arrayWithObjects: @"91", @"0", @"act43", @"0", @"silence", nil];
	
	node[92]	= [NSArray arrayWithObjects: @"91", @"0", @"93", @"0", @"silence", nil];
	node[93]	= [NSArray arrayWithObjects: @"92", @"0", @"94", @"0", @"silence", nil];
	node[94]	= [NSArray arrayWithObjects: @"93", @"0", @"95", @"0", @"silence", nil];
	node[95]	= [NSArray arrayWithObjects: @"94", @"act24", @"96", @"0", @"silence", nil];
	node[96]	= [NSArray arrayWithObjects: @"95", @"0", @"97", @"0", @"silence", nil];
	node[97]	= [NSArray arrayWithObjects: @"96", @"0", @"98", @"0", @"silence", nil];
	node[98]	= [NSArray arrayWithObjects: @"97", @"99", @"65", @"101", @"silence", nil];
	node[99]	= [NSArray arrayWithObjects: @"0", @"100", @"0", @"98", @"silence", nil];
	node[100]	= [NSArray arrayWithObjects: @"0", @"act44", @"0", @"99", @"silence", nil];
	node[101]	= [NSArray arrayWithObjects: @"0", @"98", @"act32", @"102", @"silence", nil];
	node[102]	= [NSArray arrayWithObjects: @"0", @"101", @"0", @"act45", @"silence", nil];
	
	node[104]	= [NSArray arrayWithObjects: @"0", @"100", @"0", @"105", @"silence", nil];
	node[105]	= [NSArray arrayWithObjects: @"0", @"104", @"act24", @"106", @"silence", nil];
	node[106]	= [NSArray arrayWithObjects: @"0", @"105", @"0", @"107", @"silence", nil];
	node[107]	= [NSArray arrayWithObjects: @"0", @"106", @"0", @"108", @"silence", nil];
	node[108]	= [NSArray arrayWithObjects: @"0", @"107", @"0", @"109", @"silence", nil];
	node[109]	= [NSArray arrayWithObjects: @"0", @"108", @"0", @"110", @"silence", nil];
	node[110]	= [NSArray arrayWithObjects: @"0", @"109", @"0", @"111", @"silence", nil];
	node[111]	= [NSArray arrayWithObjects: @"0", @"110", @"0", @"1|0", @"silence", nil];
	
	return node;
}

- (NSMutableArray*) worldActionType
{
	
	NSMutableArray *puzzle = [NSMutableArray arrayWithObjects:@"",nil];
	
	puzzle[0]		= @"";
	puzzle[1]		= @"clockTerminal";
	puzzle[2]		= @"energyTerminal";
	puzzle[3]		= @"energyDoor";
	puzzle[4]		= @"sealTerminal";
	puzzle[5]		= @"sealDoor";
	puzzle[6]		= @"foldDoor";
	puzzle[7]		= @"clockDoor";
	puzzle[8]		= @"clockDoor";
	puzzle[9]		= @"clockDoor";
	puzzle[10]		= @"energyTerminal";
	puzzle[11]		= @"energyDoor";
	puzzle[12]		= @"sealTerminal";
	puzzle[13]		= @"sealTerminal";
	puzzle[14]		= @"sealTerminal";
	puzzle[15]		= @"sealDoor";
	puzzle[16]		= @"progressReport";
	puzzle[17]		= @"audioMusicPlayer";
	puzzle[18]		= @"energyTerminal";
	puzzle[19]		= @"energyDoor";
	puzzle[20]		= @"sealTerminal";
	puzzle[21]		= @"sealTerminal";
	puzzle[22]		= @"worldMap";
	puzzle[23]		= @"ententeTerminal";
	puzzle[24]		= @"ententeTerminal";
	puzzle[25]		= @"sealDoor";
	puzzle[26]		= @"energyDoor";
	puzzle[27]		= @"energyTerminal";
	
	// Studio Lock
	
	puzzle[28]		= @"energyDoor"; 
	puzzle[29]		= @"energyDoor";
	puzzle[30]		= @"energyDoor";
	
	// Collectibles
	
	puzzle[31]		= @"energyTerminal";
	puzzle[32]		= @"energyTerminal";
	puzzle[33]		= @"collectible";
	puzzle[34]		= @"collectible";
	puzzle[35]		= @"collectible";
	puzzle[36]		= @"collectible";
	puzzle[37]		= @"collectible";
	puzzle[38]		= @"collectible";
	puzzle[39]		= @"collectible";
	puzzle[40]		= @"collectible";
	puzzle[41]		= @"collectible";
	
	// Entente Puzzle
	
	puzzle[42]		= @"entente";
	puzzle[43]		= @"entente";
	puzzle[44]		= @"entente";
	puzzle[45]		= @"entente";
	puzzle[46]		= @"entente";
	
	// Spare Fuse
	
	puzzle[47]		= @"energyTerminal";
	
	
	return puzzle;
}

@end