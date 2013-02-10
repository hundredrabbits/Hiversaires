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
	node[7]		= [NSArray arrayWithObjects: @"0", @"8", @"act1", @"6", nil];	// Act 1
	node[8]		= [NSArray arrayWithObjects: @"0", @"0", @"9", @"7", nil];
	node[9]		= [NSArray arrayWithObjects: @"8", @"doc3", @"10", @"0", nil];	// Doc3
	node[10]	= [NSArray arrayWithObjects: @"9", @"0", @"doc4", @"3", nil];	// Doc4
	node[11]	= [NSArray arrayWithObjects: @"act2", @"0", @"3", @"0", nil];	// Act 2
	
	return node;
}

- (NSMutableArray*) worldAction
{
	
	NSMutableArray *puzzle = [NSMutableArray arrayWithObjects:@"",nil];
	
	// ====================
	// Forest ( 1 - 3 )
	// ====================
	
	puzzle[1]		= [NSArray arrayWithObjects: @"Monolith", @"1", @"0", nil];
	puzzle[2]		= [NSArray arrayWithObjects: @"Monolith", @"3", @"0", nil];
	puzzle[3]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[4]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[5]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[6]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[7]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[8]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[9]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[10]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	puzzle[11]		= [NSArray arrayWithObjects: @"Name", @"Solution", @"State", nil];
	
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
	
	
	return document;
}


@end