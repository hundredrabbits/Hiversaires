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
int				puzzleTerminal = 0;
int				puzzleState;

// User Storage

NSMutableArray	*userActionStorage;
NSMutableArray	*userSettings;
int             userNode = 1;
int             userOrientation = 0;
int				userProgress = 1;
int				userEnergy = 0;

// User Temp

NSString        *userAction;
NSString		*userAmbient;
int				userSeal = 0;
int				userActionId;
int				userFootstep = 0;

// Misc

NSArray			*temp;

float			screenWidthHalf = 100;
float			screenHeightHalf = 100;
float			screenWidthThird = 100;
float			screenWidthFifth = 100;
float			screenHeightThird = 100;
float			screenWidthFourth = 100;
float			screenHeightFourth = 100;
float			screenHeight = 0;
float			screenWidth = 0;

CGRect			screenBound;

NSUserDefaults *memory;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
	[self newGame];
	
}

- (void)newGame
{
	[self prefPositioning];
	
	worldPath			= [self worldPath];
	worldActionType		= [self worldActionType];
	
	[self prefLoad];
	
	[self actionCheck];
    [self moveCheck];
	[self menuHome];
	
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
	
	[self debugUpdate];
	
    self.moveForward.hidden = worldPath[userNode][userOrientation] ? NO : YES;
	
	worldNodeImgId = [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ];
	worldNodeImg = [NSString stringWithFormat:@"%@%@%@", @"node.", worldNodeImgId, @".jpg"];
	
        //fetch the full file name
    NSString *imgFile = [[NSBundle mainBundle] pathForResource:worldNodeImg ofType:nil];
        //make sure the old image is "dereferenced"
    self.viewMain.image = nil;
        //now assign it
    self.viewMain.image = [UIImage imageWithContentsOfFile:imgFile];
	
	[self illusionCheck];
	
	// Trigger Action
	
	if ([worldPath[userNode][userOrientation] rangeOfString:@"act"].location != NSNotFound) {
		userAction = worldPath[userNode][userOrientation];
		userActionId  = [[userAction stringByReplacingOccurrencesOfString:@"act" withString:@""] intValue];
		[self actionCheck];
	}
	
	[self audioAmbientCheck: worldPath[userNode][4] ];
	
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
		temp = [worldPath[userNode][userOrientation] componentsSeparatedByString:@"|"];
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
		
	// Binary button
	
	userActionStorage[userActionId] = [NSString stringWithFormat:@"%d", [ userActionStorage[userActionId] intValue]+1 ];	
	
	NSLog(@"storage: %@", userActionStorage[14]);
	
	// Exceptions
	
	if([userAction isEqual: @"act1"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 2 ? @"0" : userActionStorage[userActionId]; [self audioClockTurn];  [self templateClockUpdate]; }
	if([userAction isEqual: @"act5"]){	userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 1 ? @"0" : @"2"; [self templateUpdateStudioTerminal]; [self audioTerminalActive];}
	
	if( [worldActionType[userActionId] isEqual: @"audioTerminal"] ){
		userActionStorage[userActionId] = [userActionStorage[userActionId] intValue] > 1 ? @"0" : @"1";
		[self templateAudioUpdate];
	}
	
	if( [worldActionType[userActionId] isEqual: @"killTerminal"] ){
		[self templateKillUpdate];
	}

}

- (IBAction)action2:(id)sender { // Door to display action3
	
	self.graphic1.hidden = NO;
	self.action3.hidden = NO;
	self.action2.hidden = YES;
	self.action3.alpha = 1.0;
	[self templateEnergyUpdate];
		
}

- (IBAction)action3:(id)sender { // Warp Action
	
	[self audioDoorEnter];
	
	if		( userNode == 1  ){	userNode = 103; }
	else if	( userNode == 11 ){ userNode = 48; userOrientation = 2; }
	else if	( userNode == 13 ){ userNode = 12; }
	else if	( userNode == 12 ){	userNode = 13; }
	else if ( userNode == 16 ){	userNode = 22; }
	else if	( userNode == 20 && [userActionStorage[37] intValue] > 0 ){ userNode = 116; userOrientation = 1;} // Fold Gate
	else if	( userNode == 23 ){	userNode = 22; }
	else if	( userNode == 25 ){	userNode = 31; userOrientation = 2;}
	else if	( userNode == 27 ){	userNode = 32; userOrientation = 1;}
	else if	( userNode == 35 ){	userNode = 31; userOrientation = 0;}
	else if	( userNode == 39 && [userActionStorage[5] isEqual: @"2"] && [userActionStorage[31] isEqual: @"1"] ) { userNode = 34; }
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
	else if	( userNode == 79 ){	userNode = 112;}
	else if	( userNode == 85 ){	userNode = 46; userOrientation = 0; }
	else if	( userNode == 87 ){	userNode = 76; }
	else if	( userNode == 112){	userNode = 79;}
	else if	( userNode == 113){	userNode = 50;}
	
	// Easter Eggs
	
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
	else{
		[self templateEnergyWarning];
	}
	
	[self templateEnergyUpdate];
	
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
		[self templateSealWarning];
		NSLog(@"No more seal slots.");
	}
	
	[self templateSealUpdate];
	
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
	
	[self rotate:self.action1 t:1.0 d:0];
	[self rotate:self.action3 t:1.0 d:0];
	[self rotate:self.graphic1 t:1.0 d:0];
	[self rotate:self.graphic2 t:1.0 d:0];
	[self rotate:self.graphic3 t:1.0 d:0];
	
	self.graphic1.alpha = 0;
	self.graphic2.alpha = 0;
	self.graphic3.alpha = 0;
	self.graphic4.alpha = 0;
	self.graphic5.alpha = 0;
	self.graphic6.alpha = 0;
	self.graphic7.alpha = 0;
	self.graphic8.alpha = 0;
	self.graphic9.alpha = 0;
	self.graphic10.alpha = 0;
	
	self.action1.alpha = 0;
	self.action2.alpha = 0;
	self.action3.alpha = 0;
	self.action4.alpha = 0;
	self.action5.alpha = 0;
	
}

- (void)actionTemplate
{
	
	[self actionReset];
	
	if( [worldActionType[userActionId] isEqual: @"clockTerminal"] )		{ [self templateClockTerminal]; }
	if( [worldActionType[userActionId] isEqual: @"sealTerminal"] )		{ [self templateSealTerminal];	}
	if( [worldActionType[userActionId] isEqual: @"energyTerminal"] )	{ [self templateEnergyTerminal]; }
	if( [worldActionType[userActionId] isEqual: @"sealDoor"] )			{ [self templateSealDoor]; }
	if( [worldActionType[userActionId] isEqual: @"energyDoor"] )		{ [self templateEnergyDoor]; }
	if( [worldActionType[userActionId] isEqual: @"clockDoor"] )			{ [self templateClockDoor]; }
	if( [worldActionType[userActionId] isEqual: @"progressTerminal"] )	{ [self templateProgressTerminal]; }
	if( [worldActionType[userActionId] isEqual: @"audioTerminal"] )		{ [self templateAudioTerminal]; }
	if( [worldActionType[userActionId] isEqual: @"killTerminal"] )		{ [self templateKillTerminal]; }
	if( [worldActionType[userActionId] isEqual: @"endgameDoor"] )		{ [self templateEndgameDoor]; }
	if( [worldActionType[userActionId] isEqual: @"endgameCredit"] )		{ [self templateEndgameCredit]; }
	
	if( [userAction isEqual: @"act23"] )								{ [self templateEntenteTerminal1]; }
	if( [userAction isEqual: @"act24"] )								{ [self templateEntenteTerminal2]; }
	if( [userAction isEqual: @"act43"] )								{ [self templateEntentePart1Incr]; }
	if( [userAction isEqual: @"act42"] )								{ [self templateEntentePart1Decr]; }
	if([userAction isEqual: @"act45"])									{ [self templateEntentePart2Incr]; }
	if([userAction isEqual: @"act44"])									{ [self templateEntentePart2Decr]; }
	if([userAction isEqual: @"act46"])									{ [self templateEntentePart2Exit]; }
	
}

- (void)clock{}

- (void)templateClockTerminal{
	
	[self prefPositioning];
	[self templateVignette];
	
	self.action1.hidden = NO;
	self.action1.alpha = 1.0;
	
	self.graphic5.alpha = 0;
	self.graphic4.alpha = 0;
	
	[self audioClockInit];
	
	[self templateClockUpdate];
	
}


- (void) templateClockInterface
{
	
	self.interfaceDimclock.image = [UIImage imageNamed: [NSString stringWithFormat:@"clock.%d.png", [userActionStorage[1] intValue]] ];
	self.interfaceDimclock.hidden = NO;
	self.interfaceDimclock.alpha = 1;
	[self fadeOut:self.interfaceDimclock d:3 t:0.5];
	
}


- (void) templateClockDoor
{
	[self prefPositioning];
	[self templateVignette];
	
	// Display Interactions
	
	self.action3.hidden = YES;
	self.graphic1.hidden = YES;
	
	[self templateClockInterface];
	
	// Audio
	
	[self audioDoorInit];
	
	// Templates
	
	puzzleState = 0;
	
	if([userAction isEqual: @"act7"]){
		if( [userActionStorage[1] intValue] == 1 || [userActionStorage[1] intValue] == 2 ){
			puzzleState = 1;
		}
	}
	
	if([userAction isEqual: @"act8"]){
		if( [userActionStorage[1] intValue] == 1 || [userActionStorage[1] intValue] == 0 ){
			puzzleState = 1;
		}
	}
	
	if([userAction isEqual: @"act9"]){
		if( [userActionStorage[1] intValue] == 2 || [userActionStorage[1] intValue] == 0 ){
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
		
	}
	else{
		[self templateClockWarning];
	}
	
}

- (void)templateClockUpdate
{
	
	[self templateClockInterface];
	
	self.graphic4.frame = CGRectMake(0, 0, screenWidth, screenHeight); // interface
	self.graphic4.image = [UIImage imageNamed:[NSString stringWithFormat:@"interface.dimclock.shadow.png"] ];

	self.graphic5.frame = CGRectMake(0, 0, screenWidth, screenHeight); // interface
	self.graphic5.image = [UIImage imageNamed:[NSString stringWithFormat:@"interface.dimclock.state%@.png", userActionStorage[1] ] ];
	NSLog(@"%@",userActionStorage[1]);
	
	[self fadeIn:self.graphic4 d:0.5 t:1.5];
	[self fadeIn:self.graphic5 d:0.5 t:0.5];
	
}

- (void)templateClockWarning
{
	self.interfaceDimclockBackground.image = [UIImage imageNamed:@"interfaceFuse.warning.png"];
	self.interfaceDimclockBackground.alpha = 1.0;
	[self fadeOut:self.interfaceDimclockBackground d:0.5 t:0.5];
}


- (void)seal{}

- (void)templateSealTerminal
{
	[self prefPositioning];
	[self templateVignette];
	
	self.graphic1.hidden = NO;
	self.graphic1.alpha = 0;
	self.action5.hidden = NO;
	self.action5.alpha = 1.0;
	
	[self audioSealInit];
	[self templateSealUpdate];
}

- (void)templateSealInterface
{
	userSeal = [self sealCount];
	
	self.interfaceSeal1.image = [UIImage imageNamed:@"seal.0.png"];
	self.interfaceSeal2.image = [UIImage imageNamed:@"seal.0.png"];
	
	if( userSeal == 1 ){
		self.interfaceSeal1.image = [UIImage imageNamed:[NSString stringWithFormat:@"seal.%d.png",[self sealFind:1]] ];
	}
	else if( userSeal == 0 ){
		self.interfaceSeal1.image = [UIImage imageNamed:[NSString stringWithFormat:@"seal.%d.png",[self sealFind:1]] ];
		self.interfaceSeal2.image = [UIImage imageNamed:[NSString stringWithFormat:@"seal.%d.png",[self sealFind:2]] ];
	}
	
	self.interfaceSeal1.hidden = NO;
	self.interfaceSeal2.hidden = NO;
	
	self.interfaceSeal1.alpha = 1;
	self.interfaceSeal2.alpha = 1;
	
	[self fadeOut:self.interfaceSeal1 d:3 t:0.5];
	[self fadeOut:self.interfaceSeal2 d:3 t:0.5];
}

- (void)templateSealDoor
{
	[self prefPositioning];
	[self templateVignette];
	
	self.action3.hidden = YES;
	self.graphic1.hidden = YES;
	
	[self audioDoorInit];
	[self templateSealInterface];
	
	if ( ([userActionStorage[4] intValue] == 1 && [userActionStorage[13] intValue] == 1) ) { // Act 1 : Forest + Rainre in Stones
		if( userNode == 46 || userNode == 85 ){
			[self templateUpdateDoorknob:46:85:_action2];
			[self  templateUpdateNode:46:@"0486":@"act15"];
			[self  templateUpdateNode:85:@"0485":@"act15"];
			if( userProgress < 2){ [self musicPlayer:@"act2"];}
			userProgress = 2;
			[self prefSave];
		}
	}
	else if ( [userActionStorage[20] intValue] == 1 && [userActionStorage[13] intValue] == 1 ) { // Act 2 : Metamondst + Rainre in Forest
		if( userNode == 11 || userNode == 48 ){
			[self templateUpdateDoorknob:48:11:_action2];
			[self templateUpdateNode:11:@"0487":@"act25"];
			[self templateUpdateNode:48:@"0488":@"act25"];
			if( userProgress < 3){ [self musicPlayer:@"act3"];}
			userProgress = 3;
			[self prefSave];
		}
	}
	else if ( ([userActionStorage[21] intValue] == 1 && [userActionStorage[13] intValue] == 1) ) { // Act 3 : Forest + Rainre in Metamondst
		if( userNode == 46 || userNode == 85 ){
			[self templateUpdateDoorknob:46:85:_action2];
			[self  templateUpdateNode:46:@"0486":@"act15"];
			[self  templateUpdateNode:85:@"0485":@"act15"];
			if( userProgress < 4){ [self musicPlayer:@"act4"];}
			userProgress = 4;
			[self prefSave];
		}
	}
	else if ( [userActionStorage[21] intValue] == 1 && [userActionStorage[12] intValue] == 1 ) { // Act 4 : Antechannel + Stones in Studio
		if( userNode == 19 ){
			self.action1.alpha = 1.0;
			self.action1.hidden = NO;
			[self templateUpdateStudioTerminal];
			
			[self prefSave];
		}
	}
	else if ( [userAction isEqual: @"act5"] && userNode == 19 ){ // Studio Terminal
		[self templateUpdateStudioTerminal];
	}
	else{
		[self templateSealWarning];
	}
}

- (void)templateSealUpdate
{
	
	[self templateSealInterface];
	
	userSeal = [self sealCount];
	
	[self fadeOut:self.graphic1 d:0 t:0.5];
	
	if( [userActionStorage[userActionId] intValue] != 1 ){ return; }
		
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

- (void)templateSealWarning
{
	self.interfaceSealBackground.image = [UIImage imageNamed:@"interfaceFuse.warning.png"];
	self.interfaceSealBackground.alpha = 1.0;
	[self fadeOut:self.interfaceSealBackground d:0.5 t:0.5];
}

- (void)energy{}

- (void)templateEnergyTerminal
{
	[self prefPositioning];
	[self templateVignette];
	[self templateEnergyInterface];
	
	self.graphic1.hidden = NO;
	self.action2.hidden = NO;
	self.action2.alpha = 1.0;
	self.action4.hidden = NO;
	
	[self audioEnergyInit];
}

- (void)templateEnergyInterface
{
	
	if( userEnergy == 3 ){
		self.interfaceFuse1.image = [UIImage imageNamed:@"fuse.3.png"];
	}
	else if( userEnergy == 2 ){
		self.interfaceFuse1.image = [UIImage imageNamed:@"fuse.2.png"];
	}
	else if( userEnergy == 1 ){
		self.interfaceFuse1.image = [UIImage imageNamed:@"fuse.1.png"];
	}
	else if( userEnergy == 0 ){
		self.interfaceFuse1.image = [UIImage imageNamed:@"fuse.0.png"];
	}
	
	self.interfaceFuse1.hidden = NO;
	self.interfaceFuse1.alpha = 1;
	
	[self fadeOut:self.interfaceFuse1 d:3 t:0.5];
}



- (void)templateEnergyDoor
{
	[self prefPositioning];
	[self templateVignette];

	// Display Interactions
	
	self.action3.hidden = YES;
	self.graphic1.hidden = YES;
	
	// Audio
	
	[self audioDoorInit];
	[self templateEnergyInterface];
	
	// Templates
	
	if([userAction isEqual: @"act3"]) { puzzleTerminal = 2;  }
	if([userAction isEqual: @"act6"]) { puzzleTerminal = 37; }

	if([userAction isEqual: @"act11"]){ puzzleTerminal = 10; }
	if([userAction isEqual: @"act19"]){ puzzleTerminal = 18; }
	if([userAction isEqual: @"act26"]){ puzzleTerminal = 27; }
	
	if([userAction isEqual: @"act28"]){ puzzleTerminal = 5;  }
	if([userAction isEqual: @"act30"]){ puzzleTerminal = 5;  }
	if([userAction isEqual: @"act33"]){ puzzleTerminal = 47; } // Antech fuse for Capsule door
	
	if( [userActionStorage[puzzleTerminal] intValue] > 0 ){
		
		self.action2.hidden = NO;
		self.action2.alpha = 1.0;
		
		[self  templateUpdateNode:1:@"0531":@"act28"];
		[self  templateUpdateNode:12:@"0470":@"act3"];
		[self  templateUpdateNode:13:@"0471":@"act3"];
		[self  templateUpdateNode:20:@"0080":@"act6"];
		[self  templateUpdateNode:69:@"0478":@"act19"];
		[self  templateUpdateNode:61:@"0479":@"act19"];
		[self  templateUpdateNode:62:@"0480":@"act26"];
		[self  templateUpdateNode:77:@"0481":@"act26"];
		[self  templateUpdateNode:76:@"0482":@"act30"];
		[self  templateUpdateNode:79:@"0534":@"act33"];
		[self  templateUpdateNode:112:@"0535":@"act33"];
		[self  templateUpdateNode:87:@"0483":@"act30"];
		
		// Nether Door
		
		if( [userActionStorage[5] isEqual: @"2"] && [userActionStorage[31] isEqual:@"1"] ){ // Replace 10 by actual act
			[self  templateUpdateNode:39:@"0491":@"act11"];
		}
		else{
			[self  templateUpdateNode:39:@"0490":@"act11"];
		}
		
		
		
		self.action3.alpha = 1.0;
		
	}
	else{
		[self templateEnergyWarning];
		[self audioDoorInactive];
	}
	
}

- (void)templateEnergyUpdate
{
	
	[self templateEnergyInterface];
	
	self.action4.alpha = 1.0;
	
	if( [userActionStorage[userActionId] intValue] == 1 ){
		[self templateUpdateNode:18:@"0516":@"act2"];
		[self templateUpdateNode:18:@"0529":@"act31"];
		[self templateUpdateNode:13:@"0517":@"act2"];
		[self templateUpdateNode:34:@"0537":@"act37"];
		[self templateUpdateNode:55:@"0539":@"act39"];
		[self templateUpdateNode:69:@"0518":@"act18"];
		[self templateUpdateNode:39:@"0519":@"act10"];
		[self templateUpdateNode:77:@"0520":@"act27"];
		[self templateUpdateNode:84:@"0527":@"act47"];
		[self templateUpdateNode:101:@"0532":@"act38"];
		[self templateUpdateNode:113:@"0551":@"act36"];
	}
	else{
		[self templateUpdateNode:18:@"0521":@"act2"];
		[self templateUpdateNode:18:@"0530":@"act31"];
		[self templateUpdateNode:13:@"0522":@"act2"];
		[self templateUpdateNode:34:@"0538":@"act37"];
		[self templateUpdateNode:55:@"0540":@"act39"];
		[self templateUpdateNode:69:@"0523":@"act18"];
		[self templateUpdateNode:39:@"0524":@"act10"];
		[self templateUpdateNode:77:@"0525":@"act27"];
		[self templateUpdateNode:84:@"0526":@"act47"];
		[self templateUpdateNode:101:@"0533":@"act38"];
		[self templateUpdateNode:113:@"0552":@"act36"];
	}
	
	// Extras
	
	if( [userAction isEqual: @"act37"] ){
		userActionStorage[37] = @"1";
	}	
	
}

- (void)templateEnergyWarning
{
	self.interfaceFuseBackground.image = [UIImage imageNamed:@"interfaceFuse.warning.png"];
	self.interfaceFuseBackground.alpha = 1.0;
	[self fadeOut:self.interfaceFuseBackground d:0.5 t:1.5];
}

- (void)progress{}


- (void)templateProgressTerminal
{
	[self prefPositioning];
	[self templateVignette];
	
	if( userProgress == 1 ){ [self templateUpdateNode:23:@"0545":@"act16"]; }
	if( userProgress == 2 ){ [self templateUpdateNode:23:@"0546":@"act16"]; }
	if( userProgress == 3 ){ [self templateUpdateNode:23:@"0547":@"act16"]; }
	if( userProgress == 4 ){ [self templateUpdateNode:23:@"0548":@"act16"]; }
	if( userProgress == 5 ){ [self templateUpdateNode:23:@"0549":@"act16"]; }

}

- (void)templateAudioTerminal
{
	[self prefPositioning];
	[self templateVignette];
	
	self.action1.alpha = 1.0;
	self.action1.hidden = NO;
	
	[self templateAudioUpdate];
	
}

- (void)templateAudioUpdate
{
	[self templateAudioInterface];

	if( [userActionStorage[userActionId] isEqual: @"1"] ){
		self.graphic1.hidden = NO;
		self.graphic1.alpha = 1.0;
		[self templateUpdateNode:21 :@"0543" :@"act35"];
		[self templateUpdateNode:43 :@"0544" :@"act34"];
		[self audioVolume:100];
	}
	else{
		self.graphic1.hidden = YES;
		self.graphic1.alpha = 0;
		[self audioVolume:0];
	}
	
}


- (void)templateAudioInterface
{
	if( [userActionStorage[35] isEqual: @"1"] ){
		self.interfaceAudio.image = [UIImage imageNamed:@"interfaceAudio.sfx1.png"];
	}
	else{
		self.interfaceAudio.image = [UIImage imageNamed:@"interfaceAudio.sfx0.png"];
	}
	
	self.interfaceAudio.hidden = NO;
	self.interfaceAudio.alpha = 1;
	
	[self fadeOut:self.interfaceAudio d:3 t:0.5];
	
}


- (void)entente{}

- (void)templateEntenteTerminal1
{
	[self prefPositioning];
	
	NSString *targetGraphic = [[NSMutableString alloc] init];
	
	if( [ userActionStorage[23] intValue] > 17 )		{ targetGraphic = @"Left"; }
	else if( [ userActionStorage[23] intValue] < 17 )	{ targetGraphic = @"Right"; }
	else if( [ userActionStorage[23] intValue] == 17 )	{ targetGraphic = @"Right"; }
	
	self.graphic1.image = [UIImage imageNamed:[NSString stringWithFormat:@"entente%@.png", targetGraphic ] ];
	[self fadeIn:self.graphic1 d:0 t:1];

}



- (void)templateEntenteTerminal2
{
	[self prefPositioning];
	
	NSString *targetGraphic = [[NSMutableString alloc] init];
	
	if( [ userActionStorage[24] intValue] > 17 )		{ targetGraphic = @"Left2"; }
	else if( [ userActionStorage[24] intValue] < 17 )	{ targetGraphic = @"Right2"; }
	else if( [ userActionStorage[24] intValue] == 17 )	{ targetGraphic = @"Straight"; }
	
	self.graphic1.image = [UIImage imageNamed:[NSString stringWithFormat:@"entente%@.png", targetGraphic ] ];
	[self fadeIn:self.graphic1 d:0 t:1];

}

- (void)templateEntentePart1Incr
{
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
		
		if( [ userActionStorage[23] intValue] < 21 ){ userActionStorage[23] = [NSString stringWithFormat:@"%d", [ userActionStorage[23] intValue]+3 ];}
		
		NSLog(@"%@",userActionStorage[23]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
	}
}

- (void)templateEntentePart1Decr
{
	userNode = 103;
	userAction = nil;
	
	if( [ userActionStorage[23] intValue] > 14 ){ userActionStorage[23] = [NSString stringWithFormat:@"%d", [ userActionStorage[23] intValue]-1 ]; }
	
	NSLog(@"%@",userActionStorage[23]);
	
	[self actionCheck];
	[self moveCheck];
	[self actionReset];
}

- (void)templateEntentePart2Incr
{
	userNode = 94;
	userOrientation = 2;
	userAction = nil;
	
	if( [ userActionStorage[24] intValue] < 23 ){
		userActionStorage[24] = [NSString stringWithFormat:@"%d", [ userActionStorage[24] intValue]+4 ];
	}
	
	NSLog(@"%@",userActionStorage[24]);
	
	[self actionCheck];
	[self moveCheck];
	[self actionReset];
}

- (void)templateEntentePart2Decr
{
	userNode = 95;
	userOrientation = 2;
	userAction = nil;
	
	if( [ userActionStorage[24] intValue] > 14 ){
		userActionStorage[24] = [NSString stringWithFormat:@"%d", [ userActionStorage[24] intValue]-1 ];
	}
	
	NSLog(@"%@",userActionStorage[24]);
	
	[self actionCheck];
	[self moveCheck];
	[self actionReset];
}

- (void)templateEntentePart2Exit
{
	if( [userActionStorage[23] intValue] == 17 && [userActionStorage[24] intValue] == 17 ){
		userNode = 107;
		userOrientation = 3;
		NSLog(@"OUT!");
		userAction = nil;
		
		NSLog(@"%@",userActionStorage[24]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
	}
	else{
		userNode = 93;
		userAction = nil;
		
		NSLog(@"%@",userActionStorage[24]);
		
		[self actionCheck];
		[self moveCheck];
		[self actionReset];
	}
}

- (void)kill{}

- (void)templateKillTerminal
{
	[self prefPositioning];
	
	self.action1.hidden = NO;
	self.action1.alpha = 1.0;
	
}

- (void)templateKillUpdate{
	
	if( [userActionStorage[14] intValue] > 50 ){
		
		NSString *appDomain = [[NSBundle mainBundle] bundleIdentifier];
		[[NSUserDefaults standardUserDefaults] removePersistentDomainForName:appDomain];
		
		[self newGame];
		
	}
	
	
}

- (void)endgame{}

- (void)templateEndgameDoor
{
	[self prefPositioning];
	
	if( [userActionStorage[47] intValue] == 1 && [userActionStorage[36] intValue] == 1 ){
		[self templateUpdateNode:113:@"0550":@"act40"];
		self.action3.hidden = NO;
		self.action3.alpha = 1;
	}
	else {
		[self templateEnergyWarning];
	}
	
}

- (void)templateEndgameCredit
{
	[self prefPositioning];
	
	[self musicPlayer:@"credit"];
	
	_moveForward.hidden = YES;
	_moveLeft.hidden = YES;
	_moveRight.hidden = YES;
	_action1.hidden = YES;
	_action2.hidden = YES;
	_action3.hidden = YES;
	_action4.hidden = YES;
	_actionCredit.hidden = NO;
	
	CGRect screenBound = [[UIScreen mainScreen] bounds];
	
	self.graphic1.image = [UIImage imageNamed:@"menu.black.jpg"];
	self.graphic1.alpha	 = 0.0;
	self.graphic1.hidden = NO;
	
	[self fadeIn:self.graphic1 d:1.0 t:3];
	
	self.graphic2.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic2.image = [UIImage imageNamed:@"menu.credit1.png"];
	self.graphic2.alpha	 = 0.0;
	self.graphic2.hidden = NO;

	[self fadeIn:self.graphic2 d:6.0 t:1];
	
	self.graphic3.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic3.image = [UIImage imageNamed:@"menu.credit2.png"];
	self.graphic3.alpha	 = 0.0;
	self.graphic3.hidden = NO;
	
	[self fadeIn:self.graphic3 d:10.0 t:1];
	
	self.graphic4.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic4.image = [UIImage imageNamed:@"menu.credit3.png"];
	self.graphic4.alpha	 = 0.0;
	self.graphic4.hidden = NO;
	
	[self fadeIn:self.graphic4 d:16.0 t:1];
	
	self.graphic5.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic5.image = [UIImage imageNamed:@"menu.black.jpg"];
	self.graphic5.alpha	 = 0.0;
	self.graphic5.hidden = NO;
	
	[self fadeIn:self.graphic5 d:20.0 t:1];
	
	if( userEnergy == 1){
		self.graphic6.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic6.image = [UIImage imageNamed:@"menu.credit4.png"];
		self.graphic6.alpha	 = 0.0;
		self.graphic6.hidden = NO;
		
		[self fadeIn:self.graphic6 d:24.0 t:1];
	}
	else{
		self.graphic6.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
		self.graphic6.image = [UIImage imageNamed:@"menu.credit5.png"];
		self.graphic6.alpha	 = 0.0;
		self.graphic6.hidden = NO;
		
		[self fadeIn:self.graphic6 d:24.0 t:1];
	}
	
	[self fadeIn:self.actionCredit d:24.0 t:1];
	
	
}
















// ====================
// Actions with interactions
// ====================

- (void)extra{}

- (void)templateUpdateDoorknob :(int)side1 :(int)side2 :(UIView*)knob
{
	if( userNode == side1 || userNode == side2 ){
		knob.hidden = NO;
		knob.alpha = 1.0;
	}
}

- (void)templateUpdateStudioTerminal
{
	
	
	self.graphic1.alpha = 0.0;
	self.graphic1.hidden = YES;
	
	if( [userActionStorage[5] intValue] == 2 ){
		self.graphic1.alpha = 1.0;
		self.graphic1.hidden = NO;
		[self templateUpdateNode:19:@"0489":@"act5"];
		
		userProgress = 5;
		if( userProgress == 5){ [self musicPlayer:@"act5"];}
	}
	else {
	
		if( [userActionStorage[12] isEqual: @"1"] && [userActionStorage[21] isEqual: @"1"] ){
			self.graphic1.alpha = 1.0;
			self.graphic1.hidden = NO;
			[self templateUpdateNode:19:@"0536":@"act5"];
		}
		else if( [userActionStorage[12] isEqual: @"1"] && [userActionStorage[21] isEqual: @"0"] ){
			self.graphic1.alpha = 1.0;
			self.graphic1.hidden = NO;
			[self templateUpdateNode:19:@"0542":@"act5"];
		}
		else if( [userActionStorage[12] isEqual: @"0"] && [userActionStorage[21] isEqual: @"1"] ){
			self.graphic1.alpha = 1.0;
			self.graphic1.hidden = NO;
			[self templateUpdateNode:19:@"0541":@"act5"];
		}
		
		if( userProgress == 5 ){
			userProgress = 4;
		}
		
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
		[self fadeIn:self.graphic1 d:0 t:1];
	}
	
	if ( [userActionStorage[13] intValue] == 1 ) {
		[self fadeIn:self.graphic2 d:0 t:1];
	}
		
}

- (void)templateUpdateNode :(int)node :(NSString*)img :(NSString*)act
{
	if( userNode == node && [userAction isEqual: act]){
		self.graphic1.image = [UIImage imageNamed: [NSString stringWithFormat:@"node.%@.jpg", img] ];
	}
	
	// Fadeins
	
	if( [worldActionType[userActionId] isEqual: @"sealTerminal"] ){
		[self fadeIn:self.graphic1 d:0.2 t:0.1];
	}
	else if( [worldActionType[userActionId] isEqual: @"audioTerminal"] ){
		[self fadeIn:self.graphic1 d:0.3 t:0.5];
	}
	else if( [worldActionType[userActionId] isEqual: @"sealDoor"] ){
		[self fadeIn:self.graphic1 d:0.0 t:1.0];
	}
	else if( [worldActionType[userActionId] isEqual: @"progressTerminal"] ){
		[self fadeIn:self.graphic1 d:0.3 t:0.5];
	}
	else if( userActionId == 28){
		[self fadeIn:self.graphic1 d:0.5 t:1];
	}
	else{
		[self fadeIn:self.graphic1 d:0 t:0.0];
	}

}

- (void)templateVignette
{
	[self prefPositioning];
	
	self.vignette.image = [UIImage imageNamed:@"vignette.png"];
	self.vignette.alpha = 1.0;
	[self fadeOut:self.vignette d:0 t:1.0];
}

- (void) templateSaveInterface
{
	[self prefPositioning];
	
	self.interfaceSave.image = [UIImage imageNamed: @"save.png"];
	self.interfaceSave.hidden = NO;
	self.interfaceSave.alpha = 1;
	[self fadeOut:self.interfaceSave d:3 t:0.5];
	
}

- (void)debugUpdate
{
	self.debugNode.text = [NSString stringWithFormat:@"%d", userNode];
	self.debugOrientation.text = [NSString stringWithFormat:@"%d", userOrientation];
	self.debugAction.text = [NSString stringWithFormat:@"%@", worldPath[userNode][userOrientation]];
	
	self.debugNode.hidden = YES;
	self.debugOrientation.hidden = YES;
	self.debugAction.hidden = YES;
}

- (void)illusion {}

- (void)illusionCheck
{
	
	[self prefPositioning];
	
	int rand10 = arc4random() % 10;
	int nodeIllusion = 0;
	int nodeIllusionAction;
	
	if( rand10 > 7 ){
		
		if( userNode == 15  && userOrientation == 0 ) { nodeIllusion = 554; nodeIllusionAction = 17;  } // studio
		if( userNode == 43  && userOrientation == 2 ) { nodeIllusion = 555; nodeIllusionAction = 22;  } // stones
		if( userNode == 73  && userOrientation == 2 ) { nodeIllusion = 556; nodeIllusionAction = 29;  } // metamo
		if( userNode == 58  && userOrientation == 1 ) { nodeIllusion = 557; nodeIllusionAction = 32;  } // antech
		if( userNode == 114 && userOrientation == 2 ) { nodeIllusion = 558; nodeIllusionAction = 48;  } // natani
		if( userNode == 91  && userOrientation == 0 ) { nodeIllusion = 559; nodeIllusionAction = 49;  } // entent
		if( userNode == 88  && userOrientation == 3 ) { nodeIllusion = 560; nodeIllusionAction = 50;  } // capsul
		if( userNode == 33  && userOrientation == 2 ) { nodeIllusion = 561; nodeIllusionAction = 51;  } // circle
		if( userNode == 9   && userOrientation == 1 ) { nodeIllusion = 562; nodeIllusionAction = 52;  } // forest
		
	}
	
	if( nodeIllusion > 0 && userProgress > 4 ){
		
		self.graphic1.image = [UIImage imageNamed: [NSString stringWithFormat:@"node.0%d.jpg", nodeIllusion] ];
		self.graphic1.alpha = 1;
		self.graphic1.hidden = NO;

		[self fadeOut:self.graphic1 d:1 t:0.5];
		
		userActionStorage[nodeIllusionAction] = @"1";

		[self illusionInterface];
		
	}
	
}

- (void)illusionInterface
{
	[self prefPositioning];
	
	int illusionCount = 0;
	
	illusionCount += [userActionStorage[17] intValue];
	illusionCount += [userActionStorage[22] intValue];
	illusionCount += [userActionStorage[29] intValue];
	illusionCount += [userActionStorage[32] intValue];
	illusionCount += [userActionStorage[48] intValue];
	illusionCount += [userActionStorage[49] intValue];
	illusionCount += [userActionStorage[50] intValue];
	illusionCount += [userActionStorage[51] intValue];
	illusionCount += [userActionStorage[52] intValue];	
	
	self.interfaceIllusion.image = [UIImage imageNamed: [NSString stringWithFormat:@"illusion.%d.png", illusionCount] ];
	self.interfaceIllusion.hidden = NO;
	self.interfaceIllusion.alpha = 1;
	[self fadeOut:self.interfaceIllusion d:3 t:0.5];
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

- (int)sealFind :(int)rank
{
	
	int sealFound = 0;
	
	if		( [userActionStorage[4] intValue] > 0 ){ sealFound = 4; }
	else if	( [userActionStorage[12] intValue] > 0 ){ sealFound = 12; }
	else if	( [userActionStorage[13] intValue] > 0 ){ sealFound = 13; }
	else if	( [userActionStorage[14] intValue] > 0 ){ sealFound = 14; }
	else if	( [userActionStorage[20] intValue] > 0 ){ sealFound = 20; }
	else if	( [userActionStorage[21] intValue] > 0 ){ sealFound = 21; }
	
	if(rank == 2){
		if		( [userActionStorage[4] intValue] > 0 && sealFound != 4 ){ sealFound = 4; }
		else if	( [userActionStorage[12] intValue] > 0 && sealFound != 12  ){ sealFound = 12; }
		else if	( [userActionStorage[13] intValue] > 0 && sealFound != 13  ){ sealFound = 13; }
		else if	( [userActionStorage[14] intValue] > 0 && sealFound != 14  ){ sealFound = 14; }
		else if	( [userActionStorage[20] intValue] > 0 && sealFound != 20  ){ sealFound = 20; }
		else if	( [userActionStorage[21] intValue] > 0 && sealFound != 21  ){ sealFound = 21; }
	}
	
	return sealFound;
	
}

// ====================
// Tools
// ====================

-(void)fadeIn:(UIView*)viewToFadeIn d:(NSTimeInterval)delay t:(NSTimeInterval)duration
{
	[UIView beginAnimations: @"Fade In" context:nil];
	[UIView setAnimationDuration:duration];
	[UIView setAnimationDelay:delay];
	viewToFadeIn.alpha = 1;
	[UIView commitAnimations];
}

-(void)fadeOut:(UIView*)viewToFadeOut d:(NSTimeInterval)delay t:(NSTimeInterval)duration
{
	[UIView beginAnimations: @"Fade Out" context:nil];
	[UIView setAnimationDuration:duration];
	[UIView setAnimationDelay:delay];
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

- (void)audioAmbientCheck :(NSString*)nodeAmbient
{
	
	if( userAmbient != nodeAmbient ){
		userAmbient = nodeAmbient;
		
		if( [nodeAmbient isEqual: @"forest"] )		{ [self ambientForest]; }
		if( [nodeAmbient isEqual: @"studio"] )		{ [self ambientStudio]; }
		if( [nodeAmbient isEqual: @"stones"] )		{ [self ambientStones]; }
		if( [nodeAmbient isEqual: @"antechannel"] )	{ [self ambientAntechannel]; }
		if( [nodeAmbient isEqual: @"metamondst"] )	{ [self ambientMetamondst]; }
		if( [nodeAmbient isEqual: @"circular"] )	{ [self ambientCircular]; }
		if( [nodeAmbient isEqual: @"entente"] )		{ [self ambientEntente]; }
		if( [nodeAmbient isEqual: @"rainre"] )		{ [self ambientRainre]; }
		if( [nodeAmbient isEqual: @"capsule"] )		{ [self ambientCapsule]; }
		if( [nodeAmbient isEqual: @"nataniev"] )	{ [self ambientNataniev]; }
		
	}
	
}

// ====================
// Preferences
// ====================

-(void) prefPositioning
{
	
	CGRect screenBound = [[UIScreen mainScreen] bounds];
	
	//
	
	screenWidth = screenBound.size.width;
	screenWidthHalf = screenBound.size.width/2;
	screenWidthThird = screenBound.size.width/3;
	screenWidthFifth = screenBound.size.width/5;
	
	screenHeight = screenBound.size.height;
	screenHeightHalf = screenBound.size.height/2;
	screenHeightThird = screenBound.size.height/3;
	screenHeightFourth = screenBound.size.height/4;
	int screenPadding = screenBound.size.width/24;
	
	// Core
	
	self.viewMain.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.viewMain.exclusiveTouch = YES;
	
	self.vignette.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	
	// Movement
	
	self.moveForward.frame = CGRectMake( screenWidthFifth, 0, screenWidthFifth*3, screenHeight );
	self.moveRight.frame = CGRectMake( screenWidthFifth*4, 0, screenWidthFifth, screenHeight );
	self.moveLeft.frame = CGRectMake(0, 0, screenWidthFifth, screenHeight );
	
//	[self.moveRight setImage:[UIImage imageNamed: [NSString stringWithFormat:@"tempYes.png"] ] forState:UIControlStateNormal];
//	[self.moveLeft setImage:[UIImage imageNamed: [NSString stringWithFormat:@"tempYes.png"] ] forState:UIControlStateNormal];
//	[self.moveForward setImage:[UIImage imageNamed: [NSString stringWithFormat:@"tempNo.png"] ] forState:UIControlStateNormal];
	
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
	// Action Credit
	self.actionCredit.frame = CGRectMake( screenWidthThird, screenHeightThird, screenWidthThird, screenHeightThird );
	self.actionCredit.alpha = 0;
	self.actionCredit.hidden = YES;
	
	
	// Graphics
	
	self.graphic1.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height); // full
	
	
	// Style - Interface - Fuse
	
	self.interfaceFuseBackground.frame = CGRectMake(screenPadding, screenBound.size.height-(screenBound.size.width/12), screenBound.size.width/12, screenBound.size.width/12);
	self.interfaceSealBackground.frame = CGRectMake(screenBound.size.width - (screenBound.size.width/12) - screenPadding, screenBound.size.height-(screenBound.size.width/12), screenBound.size.width/12, screenBound.size.width/12); //CGRectMake(screenPadding, screenBound.size.height-(screenBound.size.width/12), screenBound.size.width/12, screenBound.size.width/12);
	self.interfaceDimclockBackground.frame = CGRectMake( ((screenBound.size.width/12)*4) + screenPadding, screenBound.size.height-(screenBound.size.width/12), screenBound.size.width/12, screenBound.size.width/12);
	
	self.interfaceFuse1.frame = CGRectMake(screenPadding, screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	self.interfaceSeal1.frame = CGRectMake(screenBound.size.width - (screenBound.size.width/12) - screenPadding, screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	self.interfaceSeal2.frame = CGRectMake(screenBound.size.width - (screenBound.size.width/12) - screenPadding, screenBound.size.height-(screenBound.size.width/12)*2 - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	
	self.interfaceAudio.frame = CGRectMake(screenPadding + ((screenBound.size.width/12)*2), screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	
	self.interfaceDimclock.frame = CGRectMake(screenPadding + ((screenBound.size.width/12)*4), screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	
	self.interfaceSave.frame = CGRectMake(screenPadding + ((screenBound.size.width/12)*6), screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	
	self.interfaceIllusion.frame = CGRectMake(screenPadding + ((screenBound.size.width/12)*8), screenBound.size.height-(screenBound.size.width/12) - screenPadding, screenBound.size.width/12, screenBound.size.width/12);
	
	
}

- (void)menuHome
{
	CGRect screenBound = [[UIScreen mainScreen] bounds];
	
	self.graphic2.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic2.image = [UIImage imageNamed:@"menu.black.jpg"];
	self.graphic2.alpha	 = 1.0;
	self.graphic2.hidden = NO;
	
	self.graphic3.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic3.image = [UIImage imageNamed:@"menu.logo.png"];
	self.graphic3.alpha	 = 1.0;
	self.graphic3.hidden = NO;
	
	self.graphic4.frame = CGRectMake(0, 0, screenBound.size.width, screenBound.size.height);
	self.graphic4.image = [UIImage imageNamed:@"menu.controls.png"];
	self.graphic4.alpha	 = 1.0;
	self.graphic4.hidden = NO;
	
	self.interfaceSeal1.hidden = YES;
	self.interfaceSeal2.hidden = YES;
	self.interfaceFuse1.hidden = YES;
	
	[self fadeOut:self.graphic2 d:0 t:2.0];
	[self fadeOut:self.graphic3 d:3 t:2.0];
	[self fadeOut:self.graphic4 d:8 t:1.0];
	
	[self audioVolume:100]; // Music
	
}

- (void)prefSave
{
	[self prefPositioning];
	NSLog(@"- [progress:saving..]");
	
	userSettings	= [NSMutableArray arrayWithObjects:@"0",@"0",@"0",@"0",nil];
	userSettings[0] = [NSString stringWithFormat:@"%d", userNode];
	userSettings[1] = [NSString stringWithFormat:@"%d", userOrientation];
	userSettings[2] = [NSString stringWithFormat:@"%d", userProgress];
	userSettings[3] = [NSString stringWithFormat:@"%d", userEnergy];
	
	[[NSUserDefaults standardUserDefaults] setObject:userSettings forKey:@"slot0"];
	[[NSUserDefaults standardUserDefaults] setObject:userActionStorage forKey:@"slot1"];
	
//	NSLog(@"%@",[[NSUserDefaults standardUserDefaults] objectForKey:@"slot0"]);
//	NSLog(@"%@",[[NSUserDefaults standardUserDefaults] objectForKey:@"slot1"]);
	
	NSLog(@"- [progress:saved.]");
	
	[self templateSaveInterface];
	
	
}

- (void)prefLoad
{
	
	// Load Game
	
	if( [[NSUserDefaults standardUserDefaults] objectForKey:@"slot1"] && [[NSUserDefaults standardUserDefaults] objectForKey:@"slot0"] ){
		
		NSLog(@"- [progress:loading..]");
		
		// Settings
		userSettings	= [[NSUserDefaults standardUserDefaults] objectForKey:@"slot0"];
		userNode		= [userSettings[0] intValue];
		userOrientation = [userSettings[1] intValue];
		userProgress	= [userSettings[2] intValue];
		userEnergy		= [userSettings[3] intValue];
		NSLog(@"%@",[[NSUserDefaults standardUserDefaults] objectForKey:@"slot0"]);
		
		// Storage
		userActionStorage = [[NSUserDefaults standardUserDefaults] objectForKey:@"slot1"];
		NSLog(@"%@",[[NSUserDefaults standardUserDefaults] objectForKey:@"slot1"]);
		
		NSLog(@"- [progress:loaded.]");
		
	}
	
	// New Game
	
	else{
		
		NSLog(@"- [progress:creating..]");
		
		userActionStorage	= [NSMutableArray arrayWithObjects:@"",@"1",@"0",@"",@"",@"0",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"0",@"0",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",@"",nil];
		
		userActionStorage[1] = @"0"; // Dimclock Position
		
		userActionStorage[31] = @"1"; // Fuse in Forest
		userActionStorage[38] = @"1"; // Fuse in Entente
		userActionStorage[39] = @"1"; // Fuse in Antechannel
		
		userActionStorage[34] = @"1"; // Audio 1
		userActionStorage[35] = @"1"; // Audio 2
		
		userActionStorage[23] = @"15"; // Entente 1
		userActionStorage[19] = @"13"; // Entente 2
		
		// Default Location
		
		userNode = 1;
		userOrientation = 0;
		userProgress = 1;
		userEnergy = 0;
		
		[self musicPlayer:@"act1"];
		

		NSLog(@"- [progress:created.]");
	}

}


- (IBAction)actionCredit:(id)sender {
	
	[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://wiki.xxiivv.com/Mileantres"]];
	
}
@end