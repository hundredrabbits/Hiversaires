//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "DozenalViewController.h"
#import "DozenalViewController_WorldNode.h"
#import "DozenalViewController_Templates.h"

// Extras
#define M_PI   3.14159265358979323846264338327950288   /* pi */
#define DEGREES_TO_RADIANS(angle) (angle / 180.0 * M_PI)

// World
NSArray			*worldPath;
NSArray			*worldActionType;
NSArray			*worldDocument;
NSString        *worldNodeImg = @"empty";
NSString		*worldNodeImgId;

// Puzzle
int				puzzleTerminal;
int				puzzleState;

// User
int             userId;
NSString        *userAction;
int             userNode = 0;
int             userOrientation;
NSMutableArray	*userActionStorage;
NSString        *userActionType;
int				userActionId;

int				userSeal = 0;
int				userEnergy = 0;
int				userFold = 1;


@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
	worldPath = [self worldPath];
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
	[self loadTemplates];
	
	// ====================
	// Clock Terminal
	// ====================
	
	if([userAction isEqual: @"act1"]){
		
		[self.action1 setImage:[UIImage imageNamed:@"action0101.png"] forState:UIControlStateNormal];
		 self.action1.frame = CGRectMake(80, 140, 160, 160);
		[self fadeIn:self.action1 t:1];
		[self rotate:self.action1 t:2 d:( [userActionStorage[userActionId] intValue] *120 )];

		[self fadeIn:self.graphic1 t:1];
		 self.graphic1.image = [UIImage imageNamed:@"action0102.png"];
		 self.graphic1.frame = CGRectMake(80, 140, 160, 160);
		[self dimClock];
		
	}
	
	// ====================
	// Seal Terminal
	// ====================
	
	if( [userAction isEqual: @"act13"] || [userAction isEqual: @"act4"] ){
		
		[self.action5 setImage:[UIImage imageNamed:@"seal64_forest.png"] forState:UIControlStateNormal];
		
		self.action5.frame = CGRectMake(128, 180, 64, 64);
		self.graphic1.frame = CGRectMake(128, 244, 64, 16);
		
		[self fadeHalf:self.action5 t:1];
		[self fadeHalf:self.graphic1 t:1];
		
		[self templateUpdateSeal];
		
	}
		
	// ====================
	// Energy Terminal
	// ====================
	
	if( [userAction isEqual: @"act2"] || [userAction isEqual: @"act10"] || [userAction isEqual: @"act18"] ){
		
		self.graphic1.image = [UIImage imageNamed:@"energy_slot0.png"];		
		self.graphic2.image = [UIImage imageNamed:@"energy_userslot0.png"];
		
		self.graphic1.frame = CGRectMake(99, 174, 128, 128);
		self.graphic2.frame = CGRectMake(99, 174, 128, 128);
		self.action4.frame = CGRectMake(99, 174, 128, 128);
		
		[self fadeIn:self.action4 t:1];
		[self fadeIn:self.graphic1 t:0.4];
		[self fadeIn:self.graphic2 t:1.0];
		
		[self templateUpdateEnergy];
		
	}
	
	// ====================
	// Seal Gate
	// ====================
	
	if( [userAction isEqual: @"act15"] ){
		
		if ( [userActionStorage[4] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) {
			
			if( userNode == 46 ){
				userNode = 85;
				userOrientation = 2;
			}
			else{
				userNode = 46;
				userOrientation = 0;
			}
			
			userAction = nil;
			
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
		}
		
		NSLog(@"%d-%d",[userActionStorage[4] intValue],[userActionStorage[13] intValue]);
		
	}

	// ====================
	// Energy Gate
	// ====================
	
	if([userAction isEqual: @"act3"] || [userAction isEqual: @"act11"] || [userAction isEqual: @"act19"]){
		
		if([userAction isEqual: @"act3"]){ puzzleTerminal = 2; }
		if([userAction isEqual: @"act11"]){ puzzleTerminal = 10; }
		if([userAction isEqual: @"act19"]){ puzzleTerminal = 18; }
		
		if( [userActionStorage[puzzleTerminal] intValue] > 1 ){
			[self.action3 setImage:[UIImage imageNamed:@"door_unlocked.png"] forState:UIControlStateNormal];
			self.action3.frame = CGRectMake(104, 144, 128, 128);
			[self fadeHalf:self.action3 t:1];
		}
		else{
			self.graphic1.image = [UIImage imageNamed:@"door_locked.png"];
			[self fadeHalf:self.graphic1 t:1];
			self.graphic1.frame = CGRectMake(104, 144, 128, 128);
		}
		
	}

	// ====================
	// Clock Doors
	// ====================
	
	if( [userAction isEqual: @"act7"] || [userAction isEqual: @"act8"] || [userAction isEqual: @"act9"]){
		
		puzzleState = 0;
		
		if([userAction isEqual: @"act7"]){
			if( [userActionStorage[1] intValue] == 2 || [userActionStorage[1] intValue] == 0 ){
				puzzleState = 1;
			}
		}
		
		if([userAction isEqual: @"act8"]){
			if( [userActionStorage[1] intValue] == 1 || [userActionStorage[1] intValue] == 2 ){
				puzzleState = 1;
			}
		}
		
		if([userAction isEqual: @"act9"]){
			if( [userActionStorage[1] intValue] == 1 || [userActionStorage[1] intValue] == 0 ){
				puzzleState = 1;
			}
		}
		
		if( puzzleState == 1 ){
			[self.action3 setImage:[UIImage imageNamed:@"door_unlocked.png"] forState:UIControlStateNormal];
			self.action3.frame = CGRectMake(104, 144, 128, 128);
			[self fadeHalf:self.action3 t:1];
		}
		else{
			self.graphic1.image = [UIImage imageNamed:@"door_locked.png"];
			[self fadeHalf:self.graphic1 t:1];
			self.graphic1.frame = CGRectMake(104, 144, 128, 128);
		}
		
	}
	
	// ====================
	// Fold Gate
	// ====================
	
	if([userAction isEqual: @"act6"]){ // Fold Gate
		
		userNode = 13;
		userAction = nil;
		userFold = ( userFold > 3 ) ? userFold = 1 : userFold+1;
		
		NSLog(@"%d",userFold);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
		
	}
	
}

- (void)actionAnimation:sender
{
	if([userAction isEqual: @"act1"]){
		[self rotate:sender t:1.0 d:( [userActionStorage[userActionId] intValue] *120 )];
	}
	
}

- (void)actionRouting
{
	
	userActionType = [userAction substringWithRange:NSMakeRange(0, 3)];
	userActionId  = [[userAction stringByReplacingOccurrencesOfString:userActionType withString:@""] intValue];

	self.action1.hidden = NO;
	self.action2.hidden = NO;
	self.action3.hidden = NO;
	self.action4.hidden = NO;
	self.action5.hidden = NO;
    	
}

- (IBAction)action1:(id)sender {
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];	
	
	// [self energyCount]
	
	// Exceptions
	
	if([userAction isEqual: @"act1"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 2 ? @"0" : userActionStorage[userActionId]; }
	if([userAction isEqual: @"act10"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > [self energyCount] ? @"0" : userActionStorage[userActionId]; }
	
	[self actionAnimation:sender];
	
	NSLog(@"Action1");
	
}

- (IBAction)action2:(id)sender { // Decrement
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]-1 ];
	NSLog(@"Action2");
	
}

- (IBAction)action3:(id)sender {

	if		( userNode == 13 ){ userNode = 12; }
	else if	( userNode == 12 ){	userNode = 13; }
	else if ( userNode == 16 ){	userNode = 22; }
	else if	( userNode == 23 ){	userNode = 22; }
	else if	( userNode == 25 ){	userNode = 31; userOrientation = 2;}
	else if	( userNode == 27 ){	userNode = 32; userOrientation = 1;}
	else if	( userNode == 35 ){	userNode = 31; userOrientation = 0;}
	else if	( userNode == 39 ){	userNode = 45; }
	else if	( userNode == 52 ){	userNode = 32; userOrientation = 3;}
	else if	( userNode == 61 ){	userNode = 72; }
	else if	( userNode == 69 ){	userNode = 72; }
	
	userAction = nil;
	
	[self actionCheck];
	[self moveCheck];
	
	NSLog(@"Action3: from %d", userNode);
	
}

- (IBAction)action4:(id)sender {
	
	userActionStorage[userActionId] = [self energyCount] > 0 ? [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ] : @"0" ;
	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 4 ? 0 : userActionStorage[userActionId];
	[self templateUpdateEnergy];
	
	NSLog(@"Action4");
	
}

- (IBAction)action5:(id)sender {
	
	NSLog(@"%@",userActionStorage[userActionId]);
	userActionStorage[userActionId] = ![userActionStorage[userActionId] isEqual: @"1"] ? @"1" : @"0";
	
	[self templateUpdateSeal];
	
	NSLog(@"Action5");
	
	
}

- (void)actionReset
{
	
	[_action1 setTitle:@"" forState:UIControlStateNormal];
	[_action2 setTitle:@"" forState:UIControlStateNormal];
	[_action3 setTitle:@"" forState:UIControlStateNormal];
	[_action4 setTitle:@"" forState:UIControlStateNormal];
	[_action5 setTitle:@"" forState:UIControlStateNormal];
	
	[self.action1 setImage: nil forState: UIControlStateNormal];
	[self.action2 setImage: nil forState: UIControlStateNormal];
	[self.action3 setImage: nil forState: UIControlStateNormal];
	[self.action4 setImage: nil forState: UIControlStateNormal];
	[self.action5 setImage: nil forState: UIControlStateNormal];
	
	self.action1.frame = CGRectMake(0, 0, 0, 0);
	self.action2.frame = CGRectMake(0, 0, 0, 0);
	self.action3.frame = CGRectMake(0, 0, 0, 0);
	self.action4.frame = CGRectMake(0, 0, 0, 0);
	self.action5.frame = CGRectMake(0, 0, 0, 0);
	
	self.graphic1.frame = CGRectMake(0, 0, 0, 0);
	self.graphic2.frame = CGRectMake(0, 0, 0, 0);
	self.graphic3.frame = CGRectMake(0, 0, 0, 0);
	self.graphic4.frame = CGRectMake(0, 0, 0, 0);
	
	[self rotate:self.action1 t:1.0 d:0];
	[self rotate:self.action3 t:1.0 d:0];
	
	[self fadeOut:self.graphic1 t:0];
	[self fadeOut:self.graphic2 t:0];
	[self fadeOut:self.graphic3 t:0];
	[self fadeOut:self.graphic4 t:0];
	
	[self fadeOut:self.action1 t:0];
	[self fadeOut:self.action2 t:0];
	[self fadeOut:self.action3 t:0];
	[self fadeOut:self.action4 t:0];
	[self fadeOut:self.action5 t:0];
	
	
}

// ====================
// DimClock
// ====================

-(void)dimClock
{
	
	self.graphic4.frame = CGRectMake(160, 320, 32, 32);
	self.graphic3.frame = CGRectMake(130, 320, 32, 32);
	
	if( [userActionStorage[userActionId] intValue] == 0 ){
		
		[self fadeIn:self.graphic3 t:2];
		self.graphic3.image = [UIImage imageNamed:@"seal32_studio.png"];
		
		[self fadeIn:self.graphic4 t:2];
		self.graphic4.image = [UIImage imageNamed:@"seal32_antech.png"];
		
	}
	else if ( [userActionStorage[userActionId] intValue] == 1 ){
		
		[self fadeIn:self.graphic3 t:2];
		self.graphic3.image = [UIImage imageNamed:@"seal32_antech.png"];
		
		[self fadeIn:self.graphic4 t:2];
		self.graphic4.image = [UIImage imageNamed:@"seal32_stones.png"];
	
	}
	else if ( [userActionStorage[userActionId] intValue] == 2 ){
		
		[self fadeIn:self.graphic3 t:2];
		self.graphic3.image = [UIImage imageNamed:@"seal32_stones.png"];
		
		[self fadeIn:self.graphic4 t:2];
		self.graphic4.image = [UIImage imageNamed:@"seal32_studio.png"];
		
	}
	
}

// ====================
// Actions with interactions
// ====================

- (void)templateUpdateSeal
{
	userSeal = [self sealCount];
	self.action5.alpha = [userActionStorage[userActionId] intValue] == 1 ? 1.0 : 0.2;
	self.graphic1.image = [UIImage imageNamed: [NSString stringWithFormat:@"seal_userslot%d.png", userSeal ] ];
	
}

- (void)templateUpdateEnergy
{
	
	userEnergy = [self energyCount];
	self.graphic2.alpha = 0.3;
	self.graphic1.image = [UIImage imageNamed: [NSString stringWithFormat:@"energy_slot%d.png", [userActionStorage[userActionId] intValue] ] ];
	self.graphic2.image = [UIImage imageNamed: [NSString stringWithFormat:@"energy_userslot%d.png", userEnergy] ];

}

// ====================
// Counters
// ====================

- (int)energyCount
{
	userEnergy = 0;
	userEnergy += [userActionStorage[2] intValue];
	userEnergy += [userActionStorage[10] intValue];
	userEnergy += [userActionStorage[18] intValue];
	userEnergy = 4-userEnergy;
	
	return userEnergy;
}

- (int)sealCount
{
	
	userSeal = 0;
	userSeal += [userActionStorage[4] intValue];
	userSeal += [userActionStorage[13] intValue];
	userSeal = 2-userSeal;
	
	return userSeal;
	
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
-(void)fadeHalf:(UIView*)viewToFadeOut t:(NSTimeInterval)duration
{
	[UIView beginAnimations: @"Fade Half" context:nil];
	[UIView setAnimationDuration:duration];
	viewToFadeOut.alpha = 0.2;
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