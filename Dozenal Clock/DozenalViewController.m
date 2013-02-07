//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "DozenalViewController.h"
#import "DozenalViewController_WorldNode.h"

NSString        *worldOrientation[4] = {@"north",@"east",@"south",@"west"};

NSArray			*worldPath;
NSMutableArray	*worldActions;

NSString        *worldNodeImg = @"empty";
NSString		*worldNodeImgId;

int             userNode = 0;
int             userOrientation;
int             userAction = 0;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
	worldPath = [self worldPaths];
	worldActions = [self worldActions];
	[self actionCheck];
    [self moveCheck];
	
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

// ====================
// Movement
// ====================

- (IBAction)moveLeft:(id)sender {
    
    userOrientation = userOrientation == 0 ? 3 : userOrientation-1;
    
    [self moveCheck];
    
}

- (IBAction)moveRight:(id)sender {
    
    userOrientation = userOrientation < 3 ? userOrientation+1 : 0;
    
    [self moveCheck];
    
}

- (IBAction)moveForward:(id)sender {
	
    userNode = [ worldPath[userNode][userOrientation] intValue] > 0 ? [ worldPath[userNode][userOrientation] intValue] : userNode;
    
    [self moveCheck];
    
}

- (IBAction)moveAction:(id)sender {
    
    //userAction = [worldNode[userNode][userOrientation][10] intValue];
    
    [self actionCheck];

}

- (IBAction)moveReturn:(id)sender {
    
    userAction = 0;
    
    [self actionCheck];
    [self moveCheck];
    
}

// ====================
// Checks
// ====================

- (void)moveCheck
{
	// Debug
	self.debugOrientation.text = worldOrientation[userOrientation];
    self.debugNode.text = [NSString stringWithFormat:@"%d",userNode];
	
	
	
    self.moveForward.hidden = worldPath[userNode][userOrientation] ? NO : YES;
	
	self.moveAction.hidden = YES;

	[self fadeOut:_interfaceVignette t:1];
	
	// Graphics
	worldNodeImgId = [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ];
	worldNodeImg = [NSString stringWithFormat:@"%@%@%@", @"node.", worldNodeImgId, @".jpg"];
	self.viewMain.image = [UIImage imageNamed:worldNodeImg];
    
	
}

- (void)actionCheck
{
    
	[self solveCheck];
    
    self.moveLeft.hidden = userAction ? YES : NO;
    self.moveRight.hidden = userAction ? YES : NO;
    self.moveForward.hidden = userAction ? YES : NO;
    self.moveReturn.hidden = userAction ? NO : YES;
    self.moveAction.hidden = userAction ? YES : NO;
	
	self.action1.hidden = YES;
	self.action2.hidden = YES;
	self.action3.hidden = YES;
	self.action4.hidden = YES;
	
    if( userAction ){
        
        [self actionRouting];
		[self fadeIn:_interfaceVignette t:1];
		[self fadeIn:_moveReturn t:1];
		
    }
    
}

- (void)solveCheck
{
		
}


// ====================
// Interactions
// ====================

- (void)actionRouting
{
	
	self.action1.hidden = NO;
	self.action2.hidden = NO;
    	
}


- (void)actionItem
{
	
	
}

- (IBAction)action1:(id)sender {
	
	// Increment
	
	[self solveCheck];
	
}

- (IBAction)action2:(id)sender {
	
	// Decrement
	
	[self solveCheck];
	
}

- (IBAction)action3:(id)sender {
	
	
	[self solveCheck];
	
}

- (IBAction)action4:(id)sender {
	
	
	[self solveCheck];
	
}




// ====================
// Tools
// ====================

-(void)fadeIn:(UIView*)viewToFadeIn t:(NSTimeInterval)duration
{
	[UIView beginAnimations: @"Fade In" context:nil];
	[UIView setAnimationDuration:duration];
	viewToFadeIn.alpha = 1;
	[UIView commitAnimations];
}

-(void)fadeOut:(UIView*)viewToFadeOut t:(NSTimeInterval)duration
{
	
	[UIView beginAnimations: @"Fade Out" context:nil];
	[UIView setAnimationDuration:duration];
	viewToFadeOut.alpha = 0;
	[UIView commitAnimations];
}



@end