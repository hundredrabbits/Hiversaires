//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "DozenalViewController.h"

NSString        *worldOrientation[4] = {@"north",@"east",@"south",@"west"};
NSString        *worldNode[200][4][20] = {0};
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
    
	// The Forest Terminal
	
    worldNode[0][0][1] = @"Forest Terminal";
    worldNode[0][0][0] = @"1";
	
    worldNode[1][0][0] = @"2";
    worldNode[1][2][0] = @"0";
	
    worldNode[2][0][0] = @"3";
    worldNode[2][2][0] = @"1";
	
    worldNode[3][3][0] = @"4";
    worldNode[3][1][0] = @"10";
    worldNode[3][0][0] = @"11";
    worldNode[3][2][0] = @"2";
	
    worldNode[4][0][0] = @"5";
    worldNode[4][1][0] = @"3";
	
    worldNode[5][0][0] = @"6";
    worldNode[5][2][0] = @"4";
	
    worldNode[6][1][0] = @"7";
    worldNode[6][2][0] = @"5";
	
    worldNode[7][1][0] = @"8";
    worldNode[7][3][0] = @"6";
	
    worldNode[8][2][0] = @"9";
    worldNode[8][3][0] = @"6";
	
    worldNode[9][0][0] = @"8";
    worldNode[9][2][0] = @"10";
	
    worldNode[10][3][0] = @"3";
    worldNode[10][0][0] = @"9";
	
    worldNode[11][2][0] = @"3";
    
    [self actionCheck];
    [self moveCheck];
	
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

// Movement

- (IBAction)moveLeft:(id)sender {
    
    userOrientation = userOrientation == 0 ? 3 : userOrientation-1;
    
    [self moveCheck];
    
}

- (IBAction)moveRight:(id)sender {
    
    userOrientation = userOrientation < 3 ? userOrientation+1 : 0;
    
    [self moveCheck];
    
}

- (IBAction)moveForward:(id)sender {
    
    userNode = [ worldNode[userNode][userOrientation][0] intValue];
    
    [self moveCheck];
    
}

- (IBAction)moveAction:(id)sender {
    
    userAction = [worldNode[userNode][userOrientation][10] intValue];
    
    [self actionCheck];

}

- (IBAction)moveReturn:(id)sender {
    
    userAction = 0;
    
    [self actionCheck];
    [self moveCheck];
    
}

// Check

- (void)moveCheck
{
    
    self.moveForward.hidden = worldNode[userNode][userOrientation][0] ? NO : YES;
    self.moveAction.hidden = worldNode[userNode][userOrientation][11] ? NO : YES;
    [_moveAction setTitle:worldNode[userNode][userOrientation][11] forState:UIControlStateNormal];
    
    self.debugOrientation.text = worldOrientation[userOrientation];
    self.debugNode.text = [NSString stringWithFormat:@"%d",userNode];
    self.debugLocation.text = worldNode[userNode][0][1];
    
	worldNodeImgId = [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ];
	
	
    worldNodeImg = [NSString stringWithFormat:@"%@%@%@", @"node.", worldNodeImgId, @".jpg"];
    
    self.viewMain.image = [UIImage imageNamed:worldNodeImg];
    //self.viewMain.frame = CGRectMake( (userOrientation*320*-1 ) , 10.0, 1280.0, 460.0);
	
	NSLog( @"%@", [NSString stringWithFormat:@"%04d", (userNode*4)+userOrientation ]);
	
}

- (void)actionCheck
{
    
    self.debugAction.text = userAction ? worldNode[userNode][userOrientation][11] : 0;
    
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
    }
    
}

// Interaction

- (void)actionRouting
{
	
	// Puzzle 1
	if( worldNode[userNode][userOrientation][10] == @"1" ){
		self.action1.hidden = NO;
		self.action2.hidden = NO;
	}
    	
}


- (void)actionItem
{
	
    NSLog(@"%@ - %@",@"Load Item Interface", worldNode[userNode][userOrientation][11] );
	
}


- (IBAction)action1:(id)sender {
	
	NSLog( @"Action?" );
	
}

- (IBAction)action2:(id)sender {
	
	NSLog( @"Action?" );
	
}

- (IBAction)action3:(id)sender {
	
	NSLog( @"Action?" );
	
}

- (IBAction)action4:(id)sender {
	
	NSLog( @"Action?" );
	
}
@end