//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>
#import "DozenalViewController.h"
#import "DozenalViewController_WorldNode.h"
#import "DozenalViewController_Templates.h"

// Extras
#define M_PI   3.14159265358979323846264338327950288   /* pi */
#define DEGREES_TO_RADIANS(angle) (angle / 180.0 * M_PI)

// World
NSArray			*worldPath;
NSArray			*worldActionType;
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
int				userCollectible = 1;

int				userFootstep = 0;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
	worldPath = [self worldPath];
	worldActionType = [self worldActionType];
	
	userActionStorage = [NSMutableArray arrayWithObjects:@"",@"0",@"",@"",@"",@"0",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",nil];
	
//	userActionStorage[12] = @"1";
//	userActionStorage[21] = @"1";
	
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
	[self actionReset];
	
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
    
	[self audioTurn];
	
    userOrientation = userOrientation == 0 ? 3 : userOrientation-1;

	[self turnLeft];
    [self moveCheck];
    
}

- (IBAction)moveRight:(id)sender {
    
	[self audioTurn];
	
    userOrientation = userOrientation < 3 ? userOrientation+1 : 0;
    
	[self turnRight];
    [self moveCheck];
    
}

- (IBAction)moveForward:(id)sender {
	
    [self audioRouterMove];
	
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
    
	[self audioReturn];
	
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
	
	// ====================
	// Clock Terminal
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"clockTerminal"]){
		
		[self audioClockInit];
		
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
	
	if( [worldActionType[userActionId] isEqual: @"sealTerminal"]){
		
		[self audioSealInit];
		
		[self.action5 setImage:[UIImage imageNamed:@"seal64_forest.png"] forState:UIControlStateNormal];
		
		self.action5.frame = CGRectMake(128, 180, 64, 64);
		self.graphic1.frame = CGRectMake(128, 232, 64, 16);
		
		[self fadeHalf:self.action5 t:1];
		[self fadeHalf:self.graphic1 t:1];
		
		[self templateUpdateSeal];
		
	}
		
	// ====================
	// Energy Terminal
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"energyTerminal"]){
		
		[self audioEnergyInit];
		
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
	
	if( [worldActionType[userActionId] isEqual: @"sealDoor"] ){
		
		[self audioDoorInit];
		
		// Forest + Rainre ( Stones Monolith )
		
		if ( [userActionStorage[4] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) {
			
			if( userNode == 46 )	{ userNode = 85; userOrientation = 2; }
			else if( userNode == 85 )	{ userNode = 46; userOrientation = 0; }
			userAction = nil;
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
			[self vibrate];
		}
		
		// Antechannel + Rainre ( Metamondst Door )
		
		if ( [userActionStorage[21] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) {
			
			if( userNode == 85 )	{ userNode = 46; userOrientation = 0; }
			else if( userNode == 46 )	{ userNode = 85; userOrientation = 2; }
			userAction = nil;
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
			[self vibrate];
		}
		
		// Metamondst + Rainre ( Forest Monolith )
		
		if ( [userActionStorage[20] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) {
			
			if( userNode == 11 )		{ userNode = 48; userOrientation = 2; }
			else if( userNode == 48 )	{ userNode = 11; userOrientation = 2; }
			userAction = nil;
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
			[self vibrate];
			
		}
		else if( userActionId == 25 ){
			
			[self templateUpdateForestGate];
			
		}
		
		// Antechannel + Stones ( Studio Terminal )
		
		if ( [userActionStorage[21] intValue] == 1 && [userActionStorage[12] intValue] == 1 ) {
			
			[self.action1 setImage:[UIImage imageNamed:@"tempYes.png"] forState:UIControlStateNormal];
			self.action1.frame = CGRectMake(80, 140, 160, 160);
			[self fadeIn:self.action1 t:1];
			
			[self templateUpdateStudioTerminal];
			[self vibrate];
			
		}
		else if( userActionId == 5 ){
			
			[self templateUpdateStudioTerminal];
			
		}
		
	}

	// ====================
	// Energy Door
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"energyDoor"]){
		
		[self audioDoorInit];
		
		if([userAction isEqual: @"act3"]){ puzzleTerminal = 2; }
		if([userAction isEqual: @"act11"]){ puzzleTerminal = 10; }
		if([userAction isEqual: @"act19"]){ puzzleTerminal = 18; }
		if([userAction isEqual: @"act26"]){ puzzleTerminal = 27; }
		
		if([userAction isEqual: @"act28"]){ puzzleTerminal = 5; }
		if([userAction isEqual: @"act29"]){ puzzleTerminal = 5; }
		if([userAction isEqual: @"act30"]){ puzzleTerminal = 5; }
		
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
		
		// Studio Puzzle
		
	}
	

	// ====================
	// Clock Door
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"clockDoor"]){
		
		[self audioDoorInit];
		
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
		
		[self templateUpdateClockDoor];
		
		if( puzzleState == 1 ){
			
			self.action3.frame = CGRectMake(75, 100, 170, 200);
			[self fadeHalf:self.action3 t:1];
			
			self.graphic1.frame = CGRectMake(143, 175, 35, 35);
			self.graphic1.image = [UIImage imageNamed:@"door_dotunlocked.png"];
			[self fadeIn:self.graphic1 t:1];
			
		}
		
		
		
	}
	
	// ====================
	// Collectible
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"collectible"]){
		
		[self audioCollectibleInit];
		
		if( [userActionStorage[5] intValue] > 1 && ![userActionStorage[userActionId] isEqual: @"1"] ){
			userActionStorage[userActionId] = @"1";
			NSLog(@"Collectible #%d Unlocked", userActionId);
		}
		else if( [userActionStorage[5] intValue] > 1 && [userActionStorage[userActionId] isEqual: @"1"] ){
			NSLog(@"Collectible #%d already Unlocked", userActionId);
		}
		else{
			NSLog(@"Collectibles Inactive");
		}
		
	}
	
	// ====================
	// Progress Report | Endgame
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"progressReport"]){
		
		[self audioTerminalInit];
		
		NSLog(@"Collectibles: %d/%d",[self collectibleCount], 10);
		
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
	
	// Exceptions
	
	if([userAction isEqual: @"act1"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 2 ? @"0" : userActionStorage[userActionId]; [self audioClockTurn]; }
	if([userAction isEqual: @"act5"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 1 ? @"0" : @"2"; [self templateUpdateStudioTerminal]; [self audioTerminalActive];}
	
	[self actionAnimation:sender];
	
}

- (IBAction)action2:(id)sender { // Decrement
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]-1 ];
	NSLog(@"Action2");
	
}

- (IBAction)action3:(id)sender { // Warp Action
	
	[self audioDoorEnter];
	
	if	( userNode == 1 ){	userNode = 66; }
	else if	( userNode == 13 ){ userNode = 12; }
	else if	( userNode == 12 ){	userNode = 13; }
	else if ( userNode == 16 ){	userNode = 22; }
	else if	( userNode == 23 ){	userNode = 22; }
	else if	( userNode == 25 ){	userNode = 31; userOrientation = 2;}
	else if	( userNode == 27 ){	userNode = 32; userOrientation = 1;}
	else if	( userNode == 35 ){	userNode = 31; userOrientation = 0;}
	else if	( userNode == 39 ){	userNode = 45; }
	else if	( userNode == 45 ){	userNode = 51; }
	else if	( userNode == 46 ){	userNode = 1; }
	else if	( userNode == 51 ){	userNode = 45; }
	else if	( userNode == 52 ){	userNode = 32; userOrientation = 3;}
	else if	( userNode == 61 ){	userNode = 72; }
	else if	( userNode == 62 ){	userNode = 77; }
	else if	( userNode == 69 ){	userNode = 72; }
	else if	( userNode == 76 ){	userNode = 87; }
	else if	( userNode == 77 ){	userNode = 62; }
	else if	( userNode == 87 ){	userNode = 76; }
	
	userAction = nil;
	
	[self actionCheck];
	[self moveCheck];
	
}

- (IBAction)action4:(id)sender { // Energy Action
	
	if( [self energyCount] > 0 ){
		userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];
	}
	else{
		[self audioEnergyStack];
		userActionStorage[userActionId] = @"0";
	}
	
	if( [userActionStorage[userActionId] intValue] > 4 ){
		[self audioEnergyInactive];
		userActionStorage[userActionId] = 0;
	}
	else{
		[self audioEnergyActive];
		userActionStorage[userActionId] = userActionStorage[userActionId];
	}
	
	[self templateUpdateEnergy];
	
}

- (IBAction)action5:(id)sender { // Seal Action
	
	if( [userActionStorage[userActionId] isEqual:@"1"] || [self sealCount] > 0 ){
		if( ![userActionStorage[userActionId] isEqual: @"1"] ){
			[self audioSealActive];
			userActionStorage[userActionId] = @"1";
		}
		else{
			[self audioSealInactive];
			userActionStorage[userActionId] = @"0";
		}
	}
	else{
		[self audioEnergyStack];
		NSLog(@"No more seal slots.");
	}
	
	[self templateUpdateSeal];
	
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

- (void)templateUpdateStudioTerminal
{
	
	[self fadeHalf:self.graphic1 t:1];
	self.graphic1.image = [UIImage imageNamed:@"seal32_antech.png"];
	self.graphic1.frame = CGRectMake(135, 130, 45, 45);
	
	[self fadeHalf:self.graphic2 t:1];
	self.graphic2.image = [UIImage imageNamed:@"seal32_stones.png"];
	self.graphic2.frame = CGRectMake(185, 130, 45, 45);
	
	if ( [userActionStorage[21] intValue] == 1 ) {
		[self fadeIn:self.graphic1 t:1];
	}
	
	if ( [userActionStorage[12] intValue] == 1 ) {
		[self fadeIn:self.graphic2 t:1];
	}
	
	if( [userActionStorage[userActionId] intValue] == 2 ){
		[self.action1 setImage:[UIImage imageNamed:@"tempYes.png"] forState:UIControlStateNormal];
	}
	else{
		[self.action1 setImage:[UIImage imageNamed:@"tempNo.png"] forState:UIControlStateNormal];
	}
	
	NSLog(@"worked");
	

}

- (void)templateUpdateForestGate
{
	
	[self fadeHalf:self.graphic1 t:1];
	self.graphic1.image = [UIImage imageNamed:@"seal32_metamondst.png"];
	self.graphic1.frame = CGRectMake(115, 140, 90, 90);
	
	[self fadeHalf:self.graphic2 t:1];
	self.graphic2.image = [UIImage imageNamed:@"seal32_rainre.png"];
	self.graphic2.frame = CGRectMake(115, 260, 90, 90);
	
	if ( [userActionStorage[20] intValue] == 1 ) {
		[self fadeIn:self.graphic1 t:1];
	}
	
	if ( [userActionStorage[13] intValue] == 1 ) {
		[self fadeIn:self.graphic2 t:1];
	}
		
}

-(void)templateUpdateClockDoor
{
	
	self.graphic2.frame = CGRectMake(85, 140, 35, 35);
	self.graphic3.frame = CGRectMake(198, 140, 35, 35);
	self.graphic4.frame = CGRectMake(143, 237, 35, 35);
	
	self.graphic2.image = [UIImage imageNamed:@"door_dot.png"];
	self.graphic3.image = [UIImage imageNamed:@"door_dot.png"];
	self.graphic4.image = [UIImage imageNamed:@"door_dot.png"];
	
	if( [userActionStorage[1] intValue] == 0 ){
		[self fadeIn:self.graphic2 t:1];
		[self fadeIn:self.graphic3 t:1];
	}
	else if( [userActionStorage[1] intValue] == 1 ){
		[self fadeIn:self.graphic3 t:1];
		[self fadeIn:self.graphic4 t:1];
	}
	else if( [userActionStorage[1] intValue] == 2 ){
		[self fadeIn:self.graphic2 t:1];
		[self fadeIn:self.graphic4 t:1];
	}
	
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
	userEnergy += [userActionStorage[27] intValue];
	userEnergy = 4-userEnergy;
	
	return userEnergy;
}

- (int)sealCount
{
	userSeal = 0;
	userSeal += [userActionStorage[4] intValue];
	userSeal += [userActionStorage[12] intValue];
	userSeal += [userActionStorage[13] intValue];
	userSeal += [userActionStorage[14] intValue];
	userSeal += [userActionStorage[20] intValue];
	userSeal += [userActionStorage[21] intValue];
	userSeal = 2-userSeal;
	
	return userSeal;
}

- (int)collectibleCount
{
	userCollectible = 0;
	userCollectible += [userActionStorage[31] intValue];
	userCollectible += [userActionStorage[32] intValue];
	userCollectible += [userActionStorage[33] intValue];
	userCollectible += [userActionStorage[34] intValue];
	userCollectible += [userActionStorage[35] intValue];
	userCollectible += [userActionStorage[37] intValue];
	userCollectible += [userActionStorage[38] intValue];
	userCollectible += [userActionStorage[39] intValue];
	userCollectible += [userActionStorage[40] intValue];
	userCollectible += [userActionStorage[41] intValue];
	
	return userCollectible;
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
	self.viewMain.transform = CGAffineTransformMakeTranslation(-15, 0);
	
	[UIView beginAnimations: @"Turn Left" context:nil];
	[UIView setAnimationDuration:0.2];
	self.viewMain.transform = CGAffineTransformMakeTranslation(0, 0);
	self.viewMain.alpha = 1;
	[UIView commitAnimations];
}

-(void)turnRight
{
	self.viewMain.alpha = 0.5;
	self.viewMain.transform = CGAffineTransformMakeTranslation(15, 0);
	
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

-(void)vibrate
{
	AudioServicesPlaySystemSound(kSystemSoundID_Vibrate);
}

// ====================
// Audio
// ====================

-(void)audioRouterMove
{
	userFootstep += 1;
	if ( [worldPath[userNode][userOrientation] rangeOfString:@"|"].location != NSNotFound || [worldPath[userNode][userOrientation] intValue] > 0) {
		if (userFootstep & 1) {
			[self audioFootLeft];
		} else {
			[self audioFootRight];
		}
	}
	else {
		[self audioCollide];
	}	
}

@end