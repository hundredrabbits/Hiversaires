#import "DozenalViewController_WorldNode.h"

@implementation DozenalViewController (Math)


-(NSMutableArray*) worldPath
{
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"",nil];
	
	int myCount = 0;
	
	while ( myCount < 100 )
	{
		myCount++;
		node[myCount] = [NSArray arrayWithObjects: @"0", @"0", @"0", @"0", nil];
	}
	
	// ====================
	// Forest ( 0 - 11 )
	// ====================	

	node[0]		= [NSArray arrayWithObjects: @"1", @"0", @"0", @"0", nil];
	
	// Warp
	//node[0]		= [NSArray arrayWithObjects: @"46", @"0", @"0", @"0", nil];
	
	node[1]		= [NSArray arrayWithObjects: @"2", @"doc1", @"0", @"0", nil];	// Doc 1
	node[2]		= [NSArray arrayWithObjects: @"3", @"0", @"1", @"0", nil];
	node[3]		= [NSArray arrayWithObjects: @"11", @"10|2", @"2", @"4|0", nil];
	node[4]		= [NSArray arrayWithObjects: @"5", @"0", @"3|1", @"0", nil];
	node[5]		= [NSArray arrayWithObjects: @"6", @"0", @"4", @"act4", nil];	// Doc 2
	node[6]		= [NSArray arrayWithObjects: @"7|1", @"0", @"5", @"0", nil];
	node[7]		= [NSArray arrayWithObjects: @"12", @"8|0", @"act1", @"6|2", nil];	// Act 1
	node[8]		= [NSArray arrayWithObjects: @"9|2", @"0", @"7|3", @"0", nil];
	node[9]		= [NSArray arrayWithObjects: @"8|2", @"doc3", @"10|0", @"0", nil];	// Doc 3
	node[10]	= [NSArray arrayWithObjects: @"3|3", @"0", @"9|0", @"0", nil];	// Doc 4
	node[11]	= [NSArray arrayWithObjects: @"0", @"0", @"3", @"0", nil];	// 
	node[12]	= [NSArray arrayWithObjects: @"act3", @"act2", @"7", @"0", nil];	// Act 2 + act3
	
	// ====================
	// Studio ( 12 - 22 )
	// ====================
	
	node[13]	= [NSArray arrayWithObjects: @"17", @"15", @"act3", @"act2", nil];
	node[14]	= [NSArray arrayWithObjects: @"18", @"13", @"doc5", @"0", nil];
	node[15]	= [NSArray arrayWithObjects: @"16", @"doc6", @"doc7", @"13", nil];
	node[16]	= [NSArray arrayWithObjects: @"21", @"act7", @"15", @"17", nil];
	node[17]	= [NSArray arrayWithObjects: @"20", @"16", @"13", @"0", nil];
	node[18]	= [NSArray arrayWithObjects: @"19", @"17", @"0", @"act3", nil];
	node[19]	= [NSArray arrayWithObjects: @"0", @"20", @"act5", @"0", nil];
	node[20]	= [NSArray arrayWithObjects: @"act6", @"21", @"17", @"19", nil];
	node[21]	= [NSArray arrayWithObjects: @"act14", @"doc8", @"16", @"20", nil];
	
	// ====================
	// Studio ( 12 - 22 )
	// ====================
	
	node[22]	= [NSArray arrayWithObjects: @"0", @"23", @"0", @"16", nil];		// act5
	node[23]	= [NSArray arrayWithObjects: @"30", @"0", @"24", @"act7", nil];		// act5
	node[24]	= [NSArray arrayWithObjects: @"23", @"0", @"25", @"0", nil];		// act5
	node[25]	= [NSArray arrayWithObjects: @"24", @"0", @"26", @"act8", nil];		// act5
	node[26]	= [NSArray arrayWithObjects: @"25", @"0", @"27", @"0", nil];		// act5
	node[27]	= [NSArray arrayWithObjects: @"26", @"0", @"28", @"act9", nil];		// act5
	node[28]	= [NSArray arrayWithObjects: @"27", @"0", @"29", @"0", nil];		// act5
	node[29]	= [NSArray arrayWithObjects: @"28", @"0", @"30", @"0", nil];		// act5
	node[30]	= [NSArray arrayWithObjects: @"29", @"0", @"23", @"0", nil];		// act5
	
	// Stones
	
	node[31]	= [NSArray arrayWithObjects: @"25|1", @"0", @"35", @"0", nil];
	node[32]	= [NSArray arrayWithObjects: @"0", @"0", @"35", @"0", nil];	
	node[33]	= [NSArray arrayWithObjects: @"0", @"0", @"29|1", @"0", nil];	
	node[34]	= [NSArray arrayWithObjects: @"0", @"0", @"35", @"0", nil];		
	node[35]	= [NSArray arrayWithObjects: @"act8", @"38", @"36", @"0", nil];		
	node[36]	= [NSArray arrayWithObjects: @"35", @"37", @"0", @"0", nil];		
	node[37]	= [NSArray arrayWithObjects: @"38", @"39", @"0", @"36", nil];		
	node[38]	= [NSArray arrayWithObjects: @"act12", @"0", @"37", @"35", nil];		
	node[39]	= [NSArray arrayWithObjects: @"act10", @"act11", @"40", @"37", nil];
	node[40]	= [NSArray arrayWithObjects: @"39", @"0", @"41", @"0", nil];
	node[41]	= [NSArray arrayWithObjects: @"40", @"0", @"0", @"42", nil];
	node[42]	= [NSArray arrayWithObjects: @"0", @"41", @"44", @"43", nil];
	node[43]	= [NSArray arrayWithObjects: @"0", @"42", @"0", @"0", nil];
	node[44]	= [NSArray arrayWithObjects: @"42", @"0", @"46", @"0", nil];
	node[45]	= [NSArray arrayWithObjects: @"act13", @"0", @"0", @"39", nil];
	node[46]	= [NSArray arrayWithObjects: @"44", @"0", @"act15", @"0", nil];
	
	node[63]	= [NSArray arrayWithObjects: @"73", @"69", @"64", @"67", nil];
	node[64]	= [NSArray arrayWithObjects: @"63", @"0", @"0", @"0", nil];
	node[67]	= [NSArray arrayWithObjects: @"74", @"63", @"0", @"70", nil];
	
	node[69]	= [NSArray arrayWithObjects: @"act18", @"act19", @"0", @"63", nil];
	
	node[70]	= [NSArray arrayWithObjects: @"75", @"67", @"0", @"0", nil];
	node[73]	= [NSArray arrayWithObjects: @"act17", @"0", @"63", @"0", nil];
	node[74]	= [NSArray arrayWithObjects: @"80", @"0", @"67", @"0", nil];
	node[75]	= [NSArray arrayWithObjects: @"76", @"0", @"70", @"0", nil];
	node[76]	= [NSArray arrayWithObjects: @"0", @"0", @"75", @"act16", nil];
	node[80]	= [NSArray arrayWithObjects: @"85", @"0", @"74", @"0", nil];
	node[85]	= [NSArray arrayWithObjects: @"0", @"0", @"80", @"86", nil];
	node[86]	= [NSArray arrayWithObjects: @"0", @"85", @"0", @"act1", nil];
	
	return node;
}

- (NSMutableArray*) worldAction
{
	
	NSMutableArray *puzzle = [NSMutableArray arrayWithObjects:@"",nil];
	
	// ====================
	// Forest ( 1 - 3 )
	// ====================
	
	puzzle[1]		= @"2";
	puzzle[2]		= @"4";
	puzzle[3]		= @"13"; // Movement Node
	puzzle[4]		= @"-";
	puzzle[5]		= @"-";
	puzzle[6]		= @"-";
	puzzle[7]		= @"-";
	puzzle[8]		= @"-";
	puzzle[9]		= @"-";
	puzzle[10]		= @"-";
	puzzle[11]		= @"-";
	puzzle[12]		= @"-";
	puzzle[13]		= @"-";
	puzzle[14]		= @"-";
	puzzle[15]		= @"-";
	puzzle[16]		= @"-";
	puzzle[17]		= @"-";
	puzzle[18]		= @"-";
	puzzle[19]		= @"-";
	puzzle[20]		= @"-";
	puzzle[21]		= @"-";
	
	return puzzle;
}


- (NSMutableArray*) worldDocument
{
	
	NSMutableArray *document = [NSMutableArray arrayWithObjects:@"",nil];
	
	// ====================
	// Forest ( 1 - 3 )
	// ====================
	
	document[1]		= [NSArray arrayWithObjects: @"Document1", @"Text", @"Graphic", nil];
	document[2]		= [NSArray arrayWithObjects: @"Document2", @"Text", @"Graphic", nil];
	document[3]		= [NSArray arrayWithObjects: @"Document3", @"Text", @"Graphic", nil];
	document[4]		= [NSArray arrayWithObjects: @"Document1", @"Text", @"Graphic", nil];
	
	// ====================
	// Studio ( 1 - 3 )
	// ====================
	
	document[5]		= [NSArray arrayWithObjects: @"Document1", @"Text", @"Graphic", nil];
	document[6]		= [NSArray arrayWithObjects: @"Document2", @"Text", @"Graphic", nil];
	document[7]		= [NSArray arrayWithObjects: @"Document3", @"Text", @"Graphic", nil];
	document[8]		= [NSArray arrayWithObjects: @"Document1", @"Text", @"Graphic", nil];
	
	
	return document;
}

@end