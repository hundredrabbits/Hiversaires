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
    
	NSLog(@"%d",[ worldPath[userNode][userOrientation] intValue]);
	
}

- (IBAction)moveLeft:(id)sender {
    
    userOrientation = userOrientation == 0 ? 3 : userOrientation-1;

	[self turnLeft];
    [self moveCheck];
    
}

- (IBAction)moveRight:(id)sender {
    
    userOrientation = userOrientation < 3 ? userOrientation+1 : 0;
    
	[self turnRight];
    [self moveCheck];
    
}

- (IBAction)moveForward:(id)sender {
	
	if ([worldPath[userNode][userOrientation] rangeOfString:@"|"].location == NSNotFound) {
		userNode = [ worldPath[userNode][userOrientation] intValue] > 0 ? [ worldPath[userNode][userOrientation] intValue] : userNode;
	} else {
		NSArray *temp = [worldPath[userNode][userOrientation] componentsSeparatedByString:@"|"];
		userNode = [ worldPath[userNode][userOrientation] intValue] > 0 ? [ temp[0] intValue] : userNode;
		userOrientation = [ temp[1] intValue ];
	}
	
	[self turnForward];
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
	self.debugActionValue.text = [NSString stringWithFormat:@"%@", worldAction[userActionId]];
	[self solveRouter];
	
}

- (void)solveRouter
{
	// trying to solve userActionId for door puzzles
	
	if ( userActionId == 3 ) {
		[self solveAction3];
	}
	
}

- (void)solveAction3
{
	if( userActionId == 3 && [userActionStorage[1] isEqual: worldAction[1] ] && [userActionStorage[2] isEqual: worldAction[2] ] ){
		userActionStorage[3] = @"SOLVED";
	}
	else{
		userActionStorage[3] = [NSString stringWithFormat:@"%d", [userActionStorage[3] intValue]];
	}
	
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
        
        [self actionRouting];
		[self actionTemplate];
		[self fadeIn:_interfaceVignette t:1];
		[self fadeIn:_moveReturn t:1];
		
    }
    
}

- (void)actionTemplate
{
	
	[self actionReset];
	
	// I. Dimensional Clock I
	
	if([userAction isEqual: @"act1"]){
		
		[self.action1 setImage:[UIImage imageNamed:@"action0101.png"] forState:UIControlStateNormal];
		 self.action1.frame = CGRectMake(90, 200, 140, 140);
		[self fadeIn:self.action1 t:1];
		[self rotate:self.action1 t:1 d:( [userActionStorage[userActionId] intValue] *120 )];

		[self fadeIn:self.graphic1 t:2];
		 self.graphic1.image = [UIImage imageNamed:@"action0102.png"];
		 self.graphic1.frame = CGRectMake(90, 200, 140, 140);
		
	}
	
	// II. Current Gauge
	
	if([userAction isEqual: @"act2"]){
		
		[self.action1 setImage:[UIImage imageNamed:@"tempYes.png"] forState:UIControlStateNormal];
		self.action1.frame = CGRectMake(145, 240, 40, 20);
		[self fadeIn:self.action1 t:1];
		
		[self.action2 setImage:[UIImage imageNamed:@"tempNo.png"] forState:UIControlStateNormal];
		self.action2.frame = CGRectMake(145, 265, 40, 20);
		[self fadeIn:self.action2 t:1];

		
	}
	
	// III. Dimensional Gate I - I.e
	
	if([userAction isEqual: @"act3"]){
		
		if( [userActionStorage[userActionId] isEqual: @"SOLVED"] ){
			[self.action3 setImage:[UIImage imageNamed:@"tempYes.png"] forState:UIControlStateNormal];
			self.action3.frame = CGRectMake(158, 220, 20, 20);
			[self fadeIn:self.action3 t:1];
		}
		else{
			self.graphic1.image = [UIImage imageNamed:@"tempNo.png"];
			[self fadeIn:self.graphic1 t:2];
			self.graphic1.frame = CGRectMake(158, 220, 20, 20);
		}
		
	}	
	
	if([userAction isEqual: @"act4"]){
		
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
		NSLog(@"%@", worldDocument[userActionId]);
	}

	self.action1.hidden = NO;
	self.action2.hidden = NO;
	self.action3.hidden = NO;
    	
}

- (IBAction)action1:(id)sender {
	
	// Increment
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];
	
	// Exceptions
	
	if([userAction isEqual: @"act1"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 2 ? @"0" : userActionStorage[userActionId]; }
	
	[self actionAnimation:sender];
	[self solveCheck];
	
}

- (IBAction)action2:(id)sender {
	
	// Decrement
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]-1 ];
	
	[self solveCheck];
	
}

- (IBAction)action3:(id)sender {

	userNode = 13;
	userAction = nil;
	
	[self actionCheck];
	[self moveCheck];
	
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
	
	[self.action3 setImage: nil forState: UIControlStateNormal];
	self.action3.frame = CGRectMake(170, 20, 75, 75);
	[self rotate:self.action3 t:1.0 d:0];
	
	[self fadeOut:self.graphic1 t:0];
	
	[self fadeOut:self.action1 t:0];
	[self fadeOut:self.action2 t:0];
	
	
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

-(void)turnLeft
{
	self.viewMain.alpha = 0.5;
	self.viewMain.transform = CGAffineTransformMakeTranslation(-10, 0);
	
	[UIView beginAnimations: @"Turn Left" context:nil];
	[UIView setAnimationDuration:0.2];
	self.viewMain.transform = CGAffineTransformMakeTranslation(0, 0);
	self.viewMain.alpha = 1;
	[UIView commitAnimations];
}

-(void)turnRight
{
	self.viewMain.alpha = 0.5;
	self.viewMain.transform = CGAffineTransformMakeTranslation(10, 0);
	
	[UIView beginAnimations: @"Turn Right" context:nil];
	[UIView setAnimationDuration:0.2];
	self.viewMain.transform = CGAffineTransformMakeTranslation(0, 0);
	self.viewMain.alpha = 1;
	[UIView commitAnimations];
}

-(void)turnForward
{
	self.viewMain.alpha = 0.5;
	self.viewMain.transform = CGAffineTransformMakeTranslation(0, 2);
	
	[UIView beginAnimations: @"Turn Right" context:nil];
	[UIView setAnimationDuration:0.2];
	self.viewMain.transform = CGAffineTransformMakeTranslation(0, 0);
	self.viewMain.alpha = 1;
	[UIView commitAnimations];
}

@end