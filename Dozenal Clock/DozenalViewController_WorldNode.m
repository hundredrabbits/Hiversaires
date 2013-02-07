#import "DozenalViewController_WorldNode.h"

NSString *hello[200][4][20] = {0};
NSString *node[200][4][20] = {0};
NSDictionary *world;

@implementation DozenalViewController (Math)
-(NSMutableArray*) add {
    
	hello[100][2][4] = @"!hey there";
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"String1",@"String2",@"String3",nil];
	
	NSMutableArray *nodeOrientation = [NSMutableArray arrayWithObjects:0,1,2,3,nil];
//	NSMutableArray *orientationStarage = [NSMutableArray arrayWithObjects:0,1,2,3,4,5,6,7,8,9,nil];
	
//	int nodeCount = 0;
//	int orientationCount = 4;
//	
//	while ( nodeCount < 30 ) // Create 70 Nodes
//	{
//		node[nodeCount] = nodeOrientation;
//		
//		nodeCount++;
//	}
	
	// Forest ( 0 - 11 )
	node[0] = [NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil];
	
	node[0][2] = [NSMutableArray arrayWithObjects:@"0",@"1",@"2",@"3",nil];
	node[0][2][2] = @"!!!";
	
	
	node[2] = nodeOrientation;
	node[2][0] = @"else";
	node[2][1] = @"else";
	node[2][2] = @"else";
	
		
	return node;
}
@end