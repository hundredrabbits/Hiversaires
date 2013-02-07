#import "DozenalViewController_WorldNode.h"

NSString *hello[200][4][20] = {0};
NSString *arrayTest[200][4][20] = {0};
NSDictionary *world;

@implementation DozenalViewController (Math)
-(NSMutableArray*) add {
    
	hello[100][2][4] = @"!hey there";
	
	NSMutableArray *arrayTest = [NSMutableArray arrayWithObjects:@"String1",@"String2",nil];
	
	NSMutableArray *node1 = [NSMutableArray arrayWithObjects:0,1,2,3,nil];
	
	
	arrayTest[1] = @"Overrride";
	arrayTest[2] = @"dsfadsf";
	arrayTest[3] = @"sdf";
	arrayTest[4] = node1;
	
	arrayTest[4][0] = @"test";
	arrayTest[4][1] = @"test";
	arrayTest[4][2] = @"test";
	arrayTest[4][3] = @"test";
		
	NSLog(@"%@",arrayTest);
	
	
	return arrayTest;
}
@end