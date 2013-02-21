#import "DozenalViewController_WorldNode.h"

@implementation DozenalViewController (Math)


-(NSMutableArray*) worldPath
{
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"",nil];
	
	// ====================
	// Forest ( 0 - 11 )
	// ====================	

	node[0]		= [NSArray arrayWithObjects: @"1", @"0", @"0", @"0", nil];
	node[1]		= [NSArray arrayWithObjects: @"2", @"doc1", @"0", @"0", nil];	// Doc 1
	node[2]		= [NSArray arrayWithObjects: @"3", @"0", @"1", @"0", nil];
	node[3]		= [NSArray arrayWithObjects: @"11", @"10", @"2", @"4", nil];
	node[4]		= [NSArray arrayWithObjects: @"5", @"3", @"0", @"0", nil];
	node[5]		= [NSArray arrayWithObjects: @"6", @"0", @"4", @"doc2", nil];	// Doc 2
	node[6]		= [NSArray arrayWithObjects: @"0", @"7", @"5", @"0", nil];
	node[7]		= [NSArray arrayWithObjects: @"12", @"8", @"act1", @"6", nil];	// Act 1
	node[8]		= [NSArray arrayWithObjects: @"0", @"0", @"9", @"7", nil];
	node[9]		= [NSArray arrayWithObjects: @"8", @"doc3", @"10", @"0", nil];	// Doc 3
	node[10]	= [NSArray arrayWithObjects: @"9", @"0", @"doc4", @"3", nil];	// Doc 4
	node[11]	= [NSArray arrayWithObjects: @"0", @"0", @"3", @"0", nil];	// 
	node[12]	= [NSArray arrayWithObjects: @"act3", @"act2", @"7", @"0", nil];	// Act 2 + act3
	
	// ====================
	// Studio ( 12 - 22 )
	// ====================
	
	node[13]	= [NSArray arrayWithObjects: @"17", @"15", @"act4", @"0", nil];		//
	node[14]	= [NSArray arrayWithObjects: @"18", @"13", @"doc5", @"0", nil];		// doc5
	node[15]	= [NSArray arrayWithObjects: @"16", @"doc6", @"doc7", @"13", nil];	// doc6 + doc7
	node[16]	= [NSArray arrayWithObjects: @"21", @"22", @"15", @"17", nil];		//
	node[17]	= [NSArray arrayWithObjects: @"20", @"16", @"13", @"0", nil];		//
	node[18]	= [NSArray arrayWithObjects: @"19", @"17", @"0", @"act3", nil];	// act3
	node[19]	= [NSArray arrayWithObjects: @"0", @"20", @"0", @"0", nil];		//
	node[20]	= [NSArray arrayWithObjects: @"13", @"21", @"17", @"19", nil];	// act4
	node[21]	= [NSArray arrayWithObjects: @"0", @"doc8", @"16", @"20", nil];		// doc8
	node[22]	= [NSArray arrayWithObjects: @"0", @"act5", @"0", @"16", nil];		// act5
	
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