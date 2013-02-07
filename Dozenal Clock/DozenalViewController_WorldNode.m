#import "DozenalViewController_WorldNode.h"

NSString *hello[200][4][20] = {0};
NSString *node[200][4][20] = {0};
NSDictionary *world;

@implementation DozenalViewController (Math)
-(NSMutableArray*) add {
    
	hello[100][2][4] = @"!hey there";
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"String1",@"String2",@"String3",nil];
	
//	node[0][1] = [NSMutableArray arrayWithObjects:
//				  @"nodeNext",
//				  @"actionId",
//				  @"actionName",
//				  @"actionValue",
//				  @"actionSolution",
//				  nil];
	
	// =====================
	// Forest ( 0 - 11 )
	// ====================	
	
	node[0]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[0][0]	= [NSMutableArray arrayWithObjects:@"1",nil];
	
	node[1]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[1][0]	= [NSMutableArray arrayWithObjects:@"2",nil];
	node[1][2]	= [NSMutableArray arrayWithObjects:@"0",nil];
	
	node[2]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[2][0]	= [NSMutableArray arrayWithObjects:@"3",nil];
	node[2][2]	= [NSMutableArray arrayWithObjects:@"1",nil];
	
	node[3]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[3][0]	= [NSMutableArray arrayWithObjects:@"11",nil];
	node[3][1]	= [NSMutableArray arrayWithObjects:@"10",nil];
	node[3][2]	= [NSMutableArray arrayWithObjects:@"2",nil];
	node[3][3]	= [NSMutableArray arrayWithObjects:@"4",nil];
	
	node[4]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[4][0]	= [NSMutableArray arrayWithObjects:@"5",nil];
	node[4][1]	= [NSMutableArray arrayWithObjects:@"3",nil];
	
	node[5]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[5][0]	= [NSMutableArray arrayWithObjects:@"6",nil];
	node[5][2]	= [NSMutableArray arrayWithObjects:@"4",nil];
	
	node[6]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[6][1]	= [NSMutableArray arrayWithObjects:@"7",nil];
	node[6][2]	= [NSMutableArray arrayWithObjects:@"5",nil];
	
	node[7]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[7][1]	= [NSMutableArray arrayWithObjects:@"8",nil];
	node[7][3]	= [NSMutableArray arrayWithObjects:@"6",nil];
	
	node[8]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[8][2]	= [NSMutableArray arrayWithObjects:@"9",nil];
	node[8][3]	= [NSMutableArray arrayWithObjects:@"7",nil];
	
	node[9]		= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[9][0]	= [NSMutableArray arrayWithObjects:@"8",nil];
	node[9][2]	= [NSMutableArray arrayWithObjects:@"10",nil];
	
	node[10]	= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[10][0]	= [NSMutableArray arrayWithObjects:@"9",nil];
	node[10][3]	= [NSMutableArray arrayWithObjects:@"3",nil];
	
	node[11]	= [NSMutableArray arrayWithObjects:[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],[NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil],nil];
	node[11][2]	= [NSMutableArray arrayWithObjects:@"3",nil];
	
	return node;
}


@end