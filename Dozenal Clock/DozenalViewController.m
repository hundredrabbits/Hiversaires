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
int				userActionId;
int				userProgress = 1;

int				userSeal = 0;
int				userEnergy = 0;
int				userFold = 0;

int				userFootstep = 0;

float			screenWidthHalf = 100;
float			screenHeightHalf = 100;
float			screenWidthThird = 100;
float			screenHeightThird = 100;
float			screenWidthFourth = 100;
float			screenHeightFourth = 100;
float			screenHeight = 0;
float			screenWidth = 0;

CGRect			screenBound;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
	worldPath = [self worldPath];
	worldActionType = [self worldActionType];
	
	userActionStorage = [NSMutableArray arrayWithObjects:@"",@"1",@"0",@"",@"",@"0",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",nil];
	
	// Starting fuses
	userActionStorage[31] = @"1";
	userActionStorage[47] = @"1";
	
	[self ambientForest];
	
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
	
	userAction = nil;
	
	self.debugNode.text = [NSString stringWithFormat:@"%d", userNode];
	self.debugOrientation.text = [NSString stringWithFormat:@"%d", userOrientation];
	self.debugAction.text = [NSString stringWithFormat:@"%@", worldPath[userNode][userOrientation]];

    self.moveForward.hidden = worldPath[userNode][userOrientation] ? NO : YES;
	
	worldNodeImgId = [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ];
	worldNodeImg = [NSString stringWithFormat:@"%@%@%@", @"node.", worldNodeImgId, @".jpg"];
	self.viewMain.image = [UIImage imageNamed:worldNodeImg];
	
	// Trigger Action
	
	if ([worldPath[userNode][userOrientation] rangeOfString:@"act"].location != NSNotFound) {
		userAction = worldPath[userNode][userOrientation];
		userActionId  = [[userAction stringByReplacingOccurrencesOfString:@"act" withString:@""] intValue];
		[self actionCheck];
	}
	
	// Resize
	
	[self prefPositioning];
	
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

// ====================
// Interactions
// ====================

- (void)actionCheck
{
        
    self.moveLeft.hidden = NO;
    self.moveRight.hidden = NO;
    self.moveForward.hidden = userAction ? YES : NO;
	
	self.action1.hidden = YES;
	self.action2.hidden = YES;
	self.action3.hidden = YES;
	self.action4.hidden = YES;
	self.action5.hidden = YES;
	
    if( userAction ){
	
		[self actionTemplate];
		
    }
    
}

- (IBAction)action1:(id)sender {
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];	
	
	// Exceptions
	
	if([userAction isEqual: @"act1"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 2 ? @"0" : userActionStorage[userActionId]; [self audioClockTurn];  [self templateUpdateClock]; }
	if([userAction isEqual: @"act5"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 1 ? @"0" : @"2"; [self templateUpdateStudioTerminal]; [self audioTerminalActive];}
	
}

- (IBAction)action2:(id)sender { // Door to display action3
	
	self.graphic1.hidden = NO;
	self.action3.hidden = NO;
	self.action2.hidden = YES;
	self.action3.alpha = 1.0;
	[self templateUpdateEnergy];
		
}

- (IBAction)action3:(id)sender { // Warp Action
	
	[self audioDoorEnter];
	
	if	( userNode == 1 ){	userNode = 103; }
	else if	( userNode == 11 ){ userNode = 48; userOrientation = 2; }
	else if	( userNode == 13 ){ userNode = 12; }
	else if	( userNode == 12 ){	userNode = 13; }
	else if ( userNode == 16 ){	userNode = 22; }
	else if	( userNode == 20 ){	userNode = 20; userOrientation = 2; userFold = ( userFold == 1 ) ? 0 : 1; }
	else if	( userNode == 23 ){	userNode = 22; }
	else if	( userNode == 25 ){	userNode = 31; userOrientation = 2;}
	else if	( userNode == 27 ){	userNode = 32; userOrientation = 1;}
	else if	( userNode == 35 ){	userNode = 31; userOrientation = 0;}
	else if	( userNode == 39 && userFold == 1 ) { userNode = 34; }
	else if	( userNode == 39 ){	userNode = 45; }
	else if	( userNode == 45 ){	userNode = 51; }
	else if	( userNode == 46 ){	userNode = 85; userOrientation = 2; }
	else if	( userNode == 48 ){	userNode = 11; userOrientation = 2; }
	else if	( userNode == 51 ){	userNode = 45; }
	else if	( userNode == 52 ){	userNode = 32; userOrientation = 3;}
	else if	( userNode == 61 ){	userNode = 72; }
	else if	( userNode == 62 ){	userNode = 77; }
	else if	( userNode == 69 ){	userNode = 72; }
	else if	( userNode == 76 ){	userNode = 87; }
	else if	( userNode == 77 ){	userNode = 62; }
	else if	( userNode == 85 ){	userNode = 46; userOrientation = 0; }
	else if	( userNode == 87 ){	userNode = 76; }
	
	userAction = nil;
	
	[self actionCheck];
	[self moveCheck];
	
}

- (IBAction)action4:(id)sender { // Fuse(energy) Action

	if( [userActionStorage[userActionId] isEqual: @"1"] ){
		userActionStorage[userActionId] = @"0";
		userEnergy += 1;
	}
	else if( userEnergy > 0 ){
		userActionStorage[userActionId] = @"1";
		userEnergy -= 1;
	}
	
	NSLog(@"%d", userEnergy );
	
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
	self.graphic5.frame = CGRectMake(0, 0, 0, 0);
	self.graphic6.frame = CGRectMake(0, 0, 0, 0);
	self.graphic7.frame = CGRectMake(0, 0, 0, 0);
	self.graphic8.frame = CGRectMake(0, 0, 0, 0);
	self.graphic9.frame = CGRectMake(0, 0, 0, 0);
	self.graphic10.frame = CGRectMake(0, 0, 0, 0);
	self.graphic11.frame = CGRectMake(0, 0, 0, 0);
	self.graphic12.frame = CGRectMake(0, 0, 0, 0);
	self.graphic13.frame = CGRectMake(0, 0, 0, 0);
	self.graphic14.frame = CGRectMake(0, 0, 0, 0);
	self.graphic15.frame = CGRectMake(0, 0, 0, 0);
	self.graphic16.frame = CGRectMake(0, 0, 0, 0);
	self.graphic17.frame = CGRectMake(0, 0, 0, 0);
	
	[self rotate:self.action1 t:1.0 d:0];
	[self rotate:self.action3 t:1.0 d:0];
	[self rotate:self.graphic1 t:1.0 d:0];
	[self rotate:self.graphic2 t:1.0 d:0];
	[self rotate:self.graphic3 t:1.0 d:0];
	
	[self fadeOut:self.graphic1 t:0];
	[self fadeOut:self.graphic2 t:0];
	[self fadeOut:self.graphic3 t:0];
	[self fadeOut:self.graphic4 t:0];
	[self fadeOut:self.graphic5 t:0];
	[self fadeOut:self.graphic6 t:0];
	[self fadeOut:self.graphic7 t:0];
	[self fadeOut:self.graphic8 t:0];
	[self fadeOut:self.graphic9 t:0];
	[self fadeOut:self.graphic10 t:0];
	[self fadeOut:self.graphic11 t:0];
	[self fadeOut:self.graphic12 t:0];
	[self fadeOut:self.graphic13 t:0];
	[self fadeOut:self.graphic14 t:0];
	[self fadeOut:self.graphic15 t:0];
	[self fadeOut:self.graphic16 t:0];
	[self fadeOut:self.graphic17 t:0];
	
	[self fadeOut:self.action1 t:0];
	[self fadeOut:self.action2 t:0];
	[self fadeOut:self.action3 t:0];
	[self fadeOut:self.action4 t:0];
	[self fadeOut:self.action5 t:0];
	
}

- (void)actionTemplate
{
	
	[self actionReset];
	
	// ====================
	// Clock Terminal
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"clockTerminal"]){
		
		[self audioClockInit];
		
		self.action1.hidden = NO;
		self.action1.alpha = 1.0;
		
		[self templateUpdateClock];
		
	}
	
	// ====================
	// Seal Terminal
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"sealTerminal"]){
		
		self.graphic1.hidden = NO;
		
		[self audioSealInit];
		[self templateUpdateSeal];
		
	}
	
	// ====================
	// Energy Terminal
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"energyTerminal"]){
		
		self.graphic1.hidden = NO;
		
		// Terminal Doorknob
		
		self.action2.hidden = NO;
		self.action2.alpha = 1.0;
		
		self.action4.hidden = NO;
		
		// Audio
		
		[self audioEnergyInit];
		
	}
	
	// ====================
	// Seal Door
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"sealDoor"] ){
		
		[self audioDoorInit];
		
		self.action3.hidden = YES;
		self.graphic1.hidden = YES;
		
		if ( ([userActionStorage[4] intValue] == 1 && [userActionStorage[13] intValue] == 1) ) { // Act 1 : Forest + Rainre in Stones
			
			[self templateUpdateDoorknob:46:85:_action2];
			
			[self  templateUpdateNode:46:@"0486":@"act15"];
			[self  templateUpdateNode:85:@"0485":@"act15"];
			[self templateAmbientAssoc:46:@"metamondst":@"act15"];
			[self templateAmbientAssoc:85:@"stones":@"act15"];
			
			userProgress = 2;
			
		}
		
		if ( [userActionStorage[20] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) { // Act 2 : Metamondst + Rainre in Forest
			
			[self templateUpdateDoorknob:48:11:_action2];
			
			[self  templateUpdateNode:11:@"0487":@"act25"];
			[self  templateUpdateNode:48:@"0488":@"act25"];
			[self templateAmbientAssoc:11:@"antechannel":@"act25"];
			[self templateAmbientAssoc:48:@"forest":@"act25"];
			
			userProgress = 3;
			
		}
		
		if ( ([userActionStorage[21] intValue] == 1 && [userActionStorage[13] intValue] == 1) ) { // Act 3 : Forest + Rainre in Metamondst
			
			[self templateUpdateDoorknob:46:85:_action2];
			
			[self  templateUpdateNode:46:@"0486":@"act15"];
			[self  templateUpdateNode:85:@"0485":@"act15"];
			[self templateAmbientAssoc:46:@"metamondst":@"act15"];
			[self templateAmbientAssoc:85:@"stones":@"act15"];
			
			userProgress = 4;
			
		}
		
		if ( [userActionStorage[21] intValue] == 1 && [userActionStorage[12] intValue] == 1 ) { // Act 4 : Antechannel + Stones in Studio
			
			self.action1.alpha = 1.0;
			self.action1.hidden = NO;
			
			[self templateUpdateStudioTerminal];
			
			userProgress = 5;
			
		}
		
		
	}
	
	// ====================
	// Energy Door
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"energyDoor"]){
		
		// Display Interactions
		
		self.action3.hidden = YES;
		self.graphic1.hidden = YES;
		
		// Audio
		
		[self audioDoorInit];
		
		// Templates
		
		if([userAction isEqual: @"act3"]) { puzzleTerminal = 2;  }
		if([userAction isEqual: @"act11"]){ puzzleTerminal = 10; }
		if([userAction isEqual: @"act19"]){ puzzleTerminal = 18; }
		if([userAction isEqual: @"act26"]){ puzzleTerminal = 27; }
		
		if([userAction isEqual: @"act28"]){ puzzleTerminal = 5;  }
		if([userAction isEqual: @"act29"]){ puzzleTerminal = 5;  }
		if([userAction isEqual: @"act30"]){ puzzleTerminal = 5;  }
		
		if( [userActionStorage[puzzleTerminal] intValue] == 1 ){
			
			self.action2.hidden = NO;
			self.action2.alpha = 1.0;
			
			[self  templateUpdateNode:12:@"0470":@"act3"];
			[self  templateUpdateNode:13:@"0471":@"act3"];
			[self  templateUpdateNode:69:@"0478":@"act19"];
			[self  templateUpdateNode:61:@"0479":@"act19"];
			[self  templateUpdateNode:62:@"0480":@"act26"];
			[self  templateUpdateNode:77:@"0481":@"act26"];
			[self  templateUpdateNode:76:@"0482":@"act30"];
			[self  templateUpdateNode:87:@"0483":@"act30"];
			
			[self templateAmbientAssoc:12:@"studio":@"act3"];
			[self templateAmbientAssoc:13:@"forest":@"act3"];
			[self templateAmbientAssoc:69:@"antechannel":@"act19"];
			[self templateAmbientAssoc:61:@"metamondst":@"act19"];
			
			// Nether Door
			
			if( [userActionStorage[5] isEqual: @"2"] && userFold == 1 ){
				[self  templateUpdateNode:39:@"0491":@"act11"];
				[self templateAmbientAssoc:39:@"nether":@"act11"];
			}
			else{
				[self  templateUpdateNode:39:@"0490":@"act11"];
				[self templateAmbientAssoc:39:@"rainre":@"act11"];
			}
			
			self.action3.alpha = 1.0;
			
		}
		else{
			[self audioDoorInactive];
		}
		
	}
	
	
	// ====================
	// Clock Door
	// ====================
	
	if( [worldActionType[userActionId] isEqual: @"clockDoor"]){
		
		// Display Interactions
		
		self.action3.hidden = YES;
		self.graphic1.hidden = YES;
		
		// Audio
		
		[self audioDoorInit];
		
		// Templates
		
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
			
			self.action2.hidden = NO;
			self.action2.alpha = 1.0;
			
			[self  templateUpdateNode:16:@"0472":@"act7"];
			[self  templateUpdateNode:23:@"0473":@"act7"];
			[self  templateUpdateNode:25:@"0474":@"act8"];
			[self  templateUpdateNode:35:@"0475":@"act8"];
			[self  templateUpdateNode:27:@"0476":@"act9"];
			[self  templateUpdateNode:52:@"0477":@"act9"];
			
			[self templateAmbientAssoc:16:@"circular":@"act7"];
			[self templateAmbientAssoc:23:@"studio":@"act7"];
			[self templateAmbientAssoc:25:@"stones":@"act8"];
			[self templateAmbientAssoc:35:@"circular":@"act8"];
			[self templateAmbientAssoc:27:@"antechannel":@"act9"];
			[self templateAmbientAssoc:52:@"circular":@"act9"];
			
		}
		
	}
	
	if( [userAction isEqual: @"act22"] ){ // Unlock Map
		
		userActionStorage[22] = @"1";
		NSLog(@"map unlocked");
		
	}
	
	// ====================
	// Entente
	// ====================
	
	if( [userAction isEqual: @"act23"] ){ // Display Location Part I
		
		if( [ userActionStorage[23] intValue] > 17 ){
			self.graphic1.image = [UIImage imageNamed:@"ententeHi.png"];
		}
		else if( [ userActionStorage[23] intValue] < 17 ){
			self.graphic1.image = [UIImage imageNamed:@"ententeLo.png"];
		}
		else{
			self.graphic1.image = [UIImage imageNamed:@"ententeOn.png"];
		}
		
		self.graphic1.frame = CGRectMake(116, 200, 90, 90);
		[self fadeHalf:self.graphic1 t:1];
		
	}
	
	if( [userAction isEqual: @"act24"] ){ // Display Location Part II
		
		if( [ userActionStorage[24] intValue] > 17 ){
			self.graphic1.image = [UIImage imageNamed:@"ententeHi.png"];
		}
		else if( [ userActionStorage[24] intValue] < 17 ){
			self.graphic1.image = [UIImage imageNamed:@"ententeLo.png"];
		}
		else{
			self.graphic1.image = [UIImage imageNamed:@"ententeOn.png"];
		}
		
		NSLog(@"%@",userActionStorage[24]);
		
		self.graphic1.frame = CGRectMake(116, 200, 90, 90);
		[self fadeHalf:self.graphic1 t:1];
		
	}
	
	if( [userAction isEqual: @"act43"] ){ // Part I - Increment +3
		
		if( [userActionStorage[23] isEqual: @"17"] ){
			userNode = 93;
			userAction = nil;
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
		}
		else{
			userNode = 89;
			userAction = nil;
			
			if( [ userActionStorage[23] intValue] < 30 ){
				userActionStorage[23] = [NSString stringWithFormat:@"%d", [ userActionStorage[23] intValue]+3 ];
			}
			
			NSLog(@"%@",userActionStorage[23]);
			
			[self actionCheck];
			[self moveCheck];
			[self actionReset];
		}
		
	}
	
	if([userAction isEqual: @"act42"]){ // Part I - Decrement -1
		
		userNode = 103;
		userAction = nil;
		
		if( [ userActionStorage[23] intValue] > 0 ){
			userActionStorage[23] = [NSString stringWithFormat:@"%d", [ userActionStorage[23] intValue]-1 ];
		}
		
		NSLog(@"%@",userActionStorage[23]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
		
	}
	
	if([userAction isEqual: @"act44"]){ // Part II - Decrement -1
		
		userNode = 91;
		userOrientation = 2;
		userAction = nil;
		
		if( [ userActionStorage[24] intValue] > 0 ){
			userActionStorage[24] = [NSString stringWithFormat:@"%d", [ userActionStorage[24] intValue]-1 ];
		}
		
		NSLog(@"%@",userActionStorage[24]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
		
	}
	
	if([userAction isEqual: @"act45"]){ // Part II - Increment +4
		
		userNode = 91;
		userOrientation = 2;
		userAction = nil;
		
		if( [ userActionStorage[24] intValue] < 32 ){
			userActionStorage[24] = [NSString stringWithFormat:@"%d", [ userActionStorage[24] intValue]+4 ];
		}
		
		NSLog(@"%@",userActionStorage[24]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
		
	}
	
	if([userAction isEqual: @"act46"]){ // Part II - Exit
		
		if( [userActionStorage[23] intValue] == 17 && [userActionStorage[24] intValue] == 17 ){
			userNode = 104;
			userOrientation = 3;
			NSLog(@"OUT!");
		}
		else{
			userNode = 92;
		}
		
		userAction = nil;
		
		NSLog(@"%@",userActionStorage[24]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
		
	}
	
	// ====================
	// Fold Gate
	// ====================
	
	if([userAction isEqual: @"act6"] ){ // Fold Gate
		
		self.action3.hidden = YES;
		self.graphic1.hidden = YES;
		[self templateUpdateNode:20:@"0528":@"act6"];
		
		[self templateUpdateDoorknob:20:20:_action2];
		
	}
	
	// ====================
	// Progress Terminal
	// ====================
	
	if([userAction isEqual: @"act16"]){
		
		CGRect screenBound = [[UIScreen mainScreen] bounds];
		
		self.graphic1.image = [UIImage imageNamed:@"progress_shadows.png"];
		
		self.graphic2.image = [UIImage imageNamed:@"progress_act1_seal1.png"];
		self.graphic3.image = [UIImage imageNamed:@"progress_act1_seal2.png"];
		self.graphic4.image = [UIImage imageNamed:@"progress_act1_door.png"];
		
		self.graphic5.image = [UIImage imageNamed:@"progress_act2_seal1.png"];
		self.graphic6.image = [UIImage imageNamed:@"progress_act2_seal2.png"];
		self.graphic7.image = [UIImage imageNamed:@"progress_act2_door.png"];
		
		self.graphic8.image = [UIImage imageNamed:@"progress_act3_seal1.png"];
		self.graphic9.image = [UIImage imageNamed:@"progress_act3_seal2.png"];
		self.graphic10.image = [UIImage imageNamed:@"progress_act3_door.png"];
		
		self.graphic11.image = [UIImage imageNamed:@"progress_act4_seal1.png"];
		self.graphic12.image = [UIImage imageNamed:@"progress_act4_seal2.png"];
		self.graphic13.image = [UIImage imageNamed:@"progress_act5_door.png"];
		
		
		self.graphic1.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic2.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic3.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic4.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic5.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic6.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic7.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic8.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic9.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic10.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic11.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic12.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic13.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic14.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic15.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic16.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic17.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		
		[self fadeIn:self.graphic1 t:1];
		
		if( userProgress == 1 ){
			if( ![userActionStorage[4] isEqual: @"1"] ){ [self fadeIn:self.graphic2 t:1]; }
			else if( ![userActionStorage[13] isEqual: @"1"] ){ [self fadeIn:self.graphic3 t:1]; }
			else if( [userActionStorage[4] isEqual: @"1"] && [userActionStorage[13] isEqual: @"1"] ){ [self fadeIn:self.graphic4 t:1]; }
		}
		if( userProgress == 2 ){
			if( ![userActionStorage[13] isEqual: @"1"] ){ [self fadeIn:self.graphic5 t:1]; }
			else if( ![userActionStorage[20] isEqual: @"1"] ){ [self fadeIn:self.graphic6 t:1]; }
			else if( [userActionStorage[13] isEqual: @"1"] && [userActionStorage[20] isEqual: @"1"] ){ [self fadeIn:self.graphic7 t:1]; }
		}
		if( userProgress == 3 ){
			if( ![userActionStorage[21] isEqual: @"1"] ){ [self fadeIn:self.graphic8 t:1]; }
			else if( ![userActionStorage[13] isEqual: @"1"] ){ [self fadeIn:self.graphic9 t:1]; }
			else if( [userActionStorage[21] isEqual: @"1"] && [userActionStorage[13] isEqual: @"1"] ){ [self fadeIn:self.graphic10 t:1]; }
		}
		if( userProgress == 4 ){
			if( ![userActionStorage[12] isEqual: @"1"] ){ [self fadeIn:self.graphic11 t:1]; }
			else if( ![userActionStorage[21] isEqual: @"1"] ){ [self fadeIn:self.graphic12 t:1]; }
			else if( [userActionStorage[12] isEqual: @"1"] && [userActionStorage[21] isEqual: @"1"] ){ [self fadeIn:self.graphic13 t:1]; }
		}
		
		
		
		
		self.graphic1.alpha = 0.5;
		self.graphic1.hidden = NO;
		
		//if( [userActionStorage[22] isEqual: @"1"] ){	[self fadeIn:self.graphic13 t:1]; }
		
	}
	
}


// ====================
// Actions with interactions
// ====================


- (void)templateUpdateDoorknob :(int)side1 :(int)side2 :(UIView*)knob
{
	if( userNode == side1 || userNode == side2 ){
		knob.hidden = NO;
		knob.alpha = 1.0;
	}
}

- (void)templateUpdateClock
{
	[self rotate:self.graphic3 t:0 d:0];
	self.graphic3.alpha = 0.0;
	
	self.graphic2.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic3.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic4.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic5.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic6.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic7.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic8.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic9.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface
	self.graphic10.frame = CGRectMake(screenWidthHalf/2, screenHeightHalf-(screenWidthHalf/2), screenWidthHalf, screenWidthHalf); // interface	
	
	// Bridge
	
	
	// Shadows
	
	self.graphic2.image = [UIImage imageNamed:@"clock_shadows.png"];
	
	// Selector
	
	self.graphic3.image = [UIImage imageNamed:@"clock_selector.png"];
	
	// Location
	
	if( userNode == 7 ){ self.graphic4.image = [UIImage imageNamed:@"clock_loc_forest.png"]; }
	if( userNode == 86){ self.graphic4.image = [UIImage imageNamed:@"clock_loc_metamondst.png"]; }
	if( userNode == 45){ self.graphic4.image = [UIImage imageNamed:@"clock_loc_rainre.png"]; }
	
	// Seals
	
	if( [userActionStorage[4]  isEqual: @"1"] ){ self.graphic5.image = [UIImage imageNamed:@"clock_forest.png"]; [self fadeDelay:self.graphic5 d:0.7 t:0.5]; }
	if( [userActionStorage[21] isEqual: @"1"] ){ self.graphic6.image = [UIImage imageNamed:@"clock_antechannel.png"]; [self fadeDelay:self.graphic6 d:0.7 t:0.5]; }
	if( [userActionStorage[20] isEqual: @"1"] ){ self.graphic7.image = [UIImage imageNamed:@"clock_metamondst.png"]; [self fadeDelay:self.graphic7 d:0.7 t:0.5]; }
	if( [userActionStorage[13] isEqual: @"1"] ){ self.graphic8.image = [UIImage imageNamed:@"clock_rainre.png"]; [self fadeDelay:self.graphic8 d:0.7 t:0.5]; }
	if( [userActionStorage[12] isEqual: @"1"] ){ self.graphic9.image = [UIImage imageNamed:@"clock_stones.png"]; [self fadeDelay:self.graphic9 d:0.7 t:0.5]; }
	if( [userActionStorage[20] isEqual: @"1"] ){ self.graphic10.image= [UIImage imageNamed:@"clock_studio.png"]; [self fadeDelay:self.graphic10 d:0.7 t:0.5]; }
	
	// Fade in
	
	[self fadeDelay:self.graphic2 d:0.1 t:0.5];
	[self fadeDelay:self.graphic3 d:0.2 t:0.2];
	[self fadeDelay:self.graphic4 d:0.5 t:0.5];
	
	[self rotate:self.graphic3 t:0.2 d:( [userActionStorage[userActionId] intValue] *120 )];
	
	
}

- (void)templateUpdateSeal
{
	
	self.action5.hidden = NO;
	self.action5.alpha = 1.0;
	
	
	userSeal = [self sealCount];
	self.graphic1.alpha = 0;
	
	if( [userActionStorage[userActionId] intValue] == 1 ){
		
		if( userSeal == 1 ){
			[self  templateUpdateNode:5:@"0493":@"act4"];
			[self  templateUpdateNode:38:@"0496":@"act12"];
			[self  templateUpdateNode:45:@"0502":@"act13"];
			[self  templateUpdateNode:49:@"0505":@"act21"];
			[self  templateUpdateNode:82:@"0499":@"act20"];
		}
		else{
			[self  templateUpdateNode:5:@"0494":@"act4"];
			[self  templateUpdateNode:38:@"0497":@"act12"];
			[self  templateUpdateNode:45:@"0503":@"act13"];
			[self  templateUpdateNode:49:@"0506":@"act21"];
			[self  templateUpdateNode:82:@"0500":@"act20"];
		}
		
	}
	
}

- (void)templateUpdateEnergy
{
	
	self.action4.alpha = 1.0;
	
	if( [userActionStorage[userActionId] intValue] == 1 ){
		[self templateUpdateNode:18:@"0516":@"act2"];
		[self templateUpdateNode:18:@"0529":@"act31"];
		[self templateUpdateNode:13:@"0517":@"act2"];
		[self templateUpdateNode:69:@"0518":@"act18"];
		[self templateUpdateNode:39:@"0519":@"act10"];
		[self templateUpdateNode:77:@"0520":@"act27"];
		[self templateUpdateNode:84:@"0527":@"act47"];
	}
	else{
		[self templateUpdateNode:18:@"0521":@"act2"];
		[self templateUpdateNode:18:@"0530":@"act31"];
		[self templateUpdateNode:13:@"0522":@"act2"];
		[self templateUpdateNode:69:@"0523":@"act18"];
		[self templateUpdateNode:39:@"0524":@"act10"];
		[self templateUpdateNode:77:@"0525":@"act27"];
		[self templateUpdateNode:84:@"0526":@"act47"];
	}
	
}

- (void)templateUpdateStudioTerminal
{
	
	if( [userActionStorage[userActionId] intValue] == 2 ){
		
		self.graphic1.alpha = 1.0;
		self.graphic1.hidden = NO;
		[self templateUpdateNode:19:@"0489":@"act5"];
		
	}
	else{
		
		self.graphic1.alpha = 0.0;
		self.graphic1.hidden = YES;
		
	}
	
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

- (void)templateUpdateNode :(int)node :(NSString*)img :(NSString*)act
{
	if( userNode == node && [userAction isEqual: act]){
		self.graphic1.image = [UIImage imageNamed: [NSString stringWithFormat:@"node.%@.jpg", img] ];
	}
	[self fadeIn:self.graphic1 t:0.0];

}

- (void)templateAmbientAssoc :(int)node :(NSString*)track :(NSString*)act
{
	if( userNode == node && [userAction isEqual: act]){
		
		if( [track isEqual: @"forest"])			{ [self ambientForest]; }
		if( [track isEqual: @"studio"])			{ [self ambientStudio]; }
		if( [track isEqual: @"circular"])		{ [self ambientCircular]; }
		if( [track isEqual: @"antechannel"])	{ [self ambientAntechannel]; }
		if( [track isEqual: @"metamondst"])		{ [self ambientMetamondst]; }
		if( [track isEqual: @"stones"])			{ [self ambientStones]; }
		if( [track isEqual: @"rainre"])			{ [self ambientRainre]; }
		
	}
	
}

// ====================
// Counters
// ====================

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

// ====================
// Tools
// ====================

-(void)fadeDelay:(UIView*)viewToFadeIn d:(NSTimeInterval)delay t:(NSTimeInterval)duration
{
	[UIView beginAnimations: @"Fade Delay" context:nil];
	[UIView setAnimationDuration:duration];
	[UIView setAnimationDelay:delay];
	viewToFadeIn.alpha = 1;
	[UIView commitAnimations];
}

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

- (void)rotate:(UIView *)viewToRotate t:(NSTimeInterval)duration d:(CGFloat)degrees
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



-(void) prefPositioning
{
	
	CGRect screenBound = [[UIScreen mainScreen] bounds];
	
	//
	
	screenWidth = screenBound.size.width;
	screenWidthHalf = screenBound.size.width/2;
	screenWidthThird = screenBound.size.width/3;
	
	screenHeight = screenBound.size.height;
	screenHeightHalf = screenBound.size.height/2;
	screenHeightThird = screenBound.size.height/3;
	screenHeightFourth = screenBound.size.height/4;
	
	// Core
	
	self.viewMain.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	
	// Movement
	
	self.moveForward.frame = CGRectMake( screenWidthThird, 0, screenWidthThird, screenHeight );
	self.moveRight.frame = CGRectMake( screenWidthThird*2, 0, screenWidthThird, screenHeight );
	self.moveLeft.frame = CGRectMake(0, 0, screenWidthThird, screenHeight );	
	
	//[self.action3 setImage:[UIImage imageNamed: [NSString stringWithFormat:@"tempYes.png"] ] forState:UIControlStateNormal];
	
	// Action Clock Terminal
	self.action1.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	// Action Clock Terminal
	self.action2.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	// Action Door
	self.action3.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	// Action Energy Terminal
	self.action4.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	// Action Seal Terminal
	self.action5.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	
	
	// Graphics
	self.graphic1.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height); // full
	
}

@end