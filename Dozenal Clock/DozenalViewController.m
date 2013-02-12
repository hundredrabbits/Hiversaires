//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "DozenalViewController.h"
#import "DozenalViewController_WorldNode.h"

// Extras
#define M_PI   3.14159265358979323846264338327950288   /* pi */
#define DEGREES_TO_RADIANS(angle) (angle / 180.0 * M_PI)

// World
NSArray			*worldPath;
NSArray			*worldAction;
NSArray			*worldDocument;
NSString        *worldNodeImg = @"empty";
NSString		*worldNodeImgId;

// User
int             userId;
NSString        *userAction;
int             userNode = 0;
int             userOrientation;
NSMutableArray	*userActionStorage;
NSString        *userActionType;
int				userActionId;


@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
	worldPath = [self worldPath];
	worldAction = [self worldAction];
	worldDocument = [self worldDocument];
	
	userActionStorage = [NSMutableArray arrayWithObjects:@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",nil];
	
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

- (void)moveCheck
{
	self.debugNode.text = [NSString stringWithFormat:@"%d", userNode];
	self.debugOrientation.text = [NSString stringWithFormat:@"%d", userOrientation];
	self.debugAction.text = [NSString stringWithFormat:@"%@", worldPath[userNode][userOrientation]];
	
	self.moveAction.hidden = YES; [self fadeOut:_interfaceVignette t:1];
    self.moveForward.hidden = worldPath[userNode][userOrientation] ? NO : YES;
	self.moveAction.hidden = [[NSCharacterSet letterCharacterSet] characterIsMember:[worldPath[userNode][userOrientation] characterAtIndex:0]] ? NO : YES;
	
	worldNodeImgId = [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ];
	worldNodeImg = [NSString stringWithFormat:@"%@%@%@", @"node.", worldNodeImgId, @".jpg"];
	self.viewMain.image = [UIImage imageNamed:worldNodeImg];
    
}

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
    
    userAction = worldPath[userNode][userOrientation];
    	
    [self actionCheck];

}

- (IBAction)moveReturn:(id)sender {
    
    userAction = nil;
    
    [self actionCheck];
    [self moveCheck];
	[self actionReset];
    
}


// ====================
// Solution
// ====================

- (void)solveCheck
{
	
	self.debugAction.text = userActionStorage[userActionId];
	self.debugActionValue.text = worldAction[userActionId][1];
	
	// 3 Consoles
	
	// 2 Consoles
	
	// 1 Console
	if( ([ worldAction[userActionId] count]-2) == 1){
		if( [ worldAction[userActionId][1] intValue] == [userActionStorage[userActionId] intValue] && [worldAction[userActionId][2] intValue] == [userActionStorage[[worldAction[userActionId][2] intValue]] intValue] ){
			[self solveRouter];
		}
	}
	
	// Default
	
}

- (void)solveRouter
{
	
	if(userActionId == 2){
		[self solveState2];
	}
	
	
}

- (void)solveState2
{
	userNode = 12;
	userAction = nil;
	[self actionCheck];
	[self moveCheck];
	
}

// ====================
// Interactions
// ====================

- (void)actionCheck
{
    
    self.moveLeft.hidden = userAction ? YES : NO;
    self.moveRight.hidden = userAction ? YES : NO;
    self.moveForward.hidden = userAction ? YES : NO;
    self.moveReturn.hidden = userAction ? NO : YES;
    self.moveAction.hidden = userAction ? YES : NO;
	
	self.action1.hidden = YES;
	self.action2.hidden = YES;
	self.action3.hidden = YES;
	self.action4.hidden = YES;
	self.action5.hidden = YES;
	
    if( userAction ){
        
		[self actionTemplate];
        [self actionRouting];
		[self fadeIn:_interfaceVignette t:1];
		[self fadeIn:_moveReturn t:1];
		
    }
    
}

- (void)actionTemplate
{
	
	[self actionReset];
	
	if([userAction isEqual: @"act1"]){
		
		// Action 1
		[self.action1 setImage:[UIImage imageNamed:@"action0101.png"] forState:UIControlStateNormal];
		 self.action1.frame = CGRectMake(90, 200, 140, 140);
		[self fadeIn:self.action1 t:1];
		[self rotate:self.action1 t:1 d:( [userActionStorage[userActionId] intValue] *120 )];

		// Graphic 1
		[self fadeIn:self.graphic1 t:2];
		 self.graphic1.image = [UIImage imageNamed:@"action0102.png"];
		 self.graphic1.frame = CGRectMake(90, 200, 140, 140);
		
	}
	
}

- (void)actionAnimation:sender
{
	if([userAction isEqual: @"act1"]){
		[self rotate:sender t:0.5 d:( [userActionStorage[userActionId] intValue] *120 )];
	}
}

- (void)actionRouting
{
	
	userActionType = [userAction substringWithRange:NSMakeRange(0, 3)];
	userActionId  = [[userAction stringByReplacingOccurrencesOfString:userActionType withString:@""] intValue];
	
	if ([userAction rangeOfString:@"act"].location != NSNotFound) {
		[self solveCheck];
	}
	else if ([userAction rangeOfString:@"doc"].location != NSNotFound) {
		//NSLog(@"%@", worldDocument[userActionId]);
	}

	self.action1.hidden = NO;
	self.action2.hidden = NO;
    	
}

- (IBAction)action1:(id)sender {
	
	// Increment
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];	
	[self actionAnimation:sender];
	[self solveCheck];
	
}

- (IBAction)action2:(id)sender {
	
	// Decrement
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]-1 ];
	
	[self solveCheck];
	
}

- (IBAction)action3:(id)sender {
	
	[self solveCheck];
	
}

- (IBAction)action4:(id)sender {
	
	[self solveCheck];
	
}

- (IBAction)action5:(id)sender {
}

- (void)actionReset
{
	[self.action1 setImage: nil forState: UIControlStateNormal];
	self.action1.frame = CGRectMake(170, 20, 75, 75);
	[self rotate:self.action1 t:1.0 d:0];
	[self fadeOut:self.action1 t:0];
	[self fadeOut:self.graphic1 t:0];
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
- (void)rotate:(UIButton *)viewToRotate t:(NSTimeInterval)duration d:(CGFloat)degrees
{
	[UIView beginAnimations:nil context:NULL];
	[UIView setAnimationDuration:duration];
	[UIView setAnimationCurve:UIViewAnimationCurveEaseIn];
	[UIView setAnimationBeginsFromCurrentState:YES];
	CGAffineTransform transform = CGAffineTransformMakeRotation(DEGREES_TO_RADIANS(degrees));
	viewToRotate.transform = transform;
	[UIView commitAnimations];
}

@end