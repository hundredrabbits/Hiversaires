#import "DozenalViewController_WorldNode.h"

NSString *hello[200][4][20] = {0};
NSString *node[200][4][20] = {0};
NSDictionary *world;

@implementation DozenalViewController (Math)
-(NSMutableArray*) add {
    
	hello[100][2][4] = @"!hey there";
	
	NSMutableArray *node = [NSMutableArray arrayWithObjects:@"String1",@"String2",nil];
	
	NSMutableArray *nodeOrientation = [NSMutableArray arrayWithObjects:0,1,2,3,nil];	
	
	int nodeCount = 0;
	
	while ( nodeCount < 70 )
	{
		
		node[nodeCount] = nodeOrientation;
		nodeCount++;
		
	}
	
	// Forest ( 0 - 11 )
	
	node[1] = @"Overrride";
	node[2] = @"dsfadsf";
	node[3] = @"sdf";
	node[4] = nodeOrientation;
	
	node[4][0] = @"north";
	node[4][1] = @"east";
	node[4][2] = @"south";
	node[4][3] = @"west";
	
	node[5] = @"west";
	
		
	NSLog(@"%@",node);
	
	
	return node;
}
@end