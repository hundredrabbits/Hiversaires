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

int             userNode;
int             userOrientation;
int             userAction = 0;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
    
    worldNode[0][0][1] = @"The Hugly Bathroom";
    worldNode[0][2][0] = @"2";
        worldNode[0][3][11] = @"puzzle 1";
        worldNode[0][3][10] = @"1";
    
    worldNode[2][0][1] = @"The Dicusting Kitchen";
    worldNode[2][0][0] = @"0";
    
    
    [self moveCheck];
    [self actionCheck];
    
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
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


- (void)moveCheck
{
    
    self.moveForward.hidden = worldNode[userNode][userOrientation][0] ? NO : YES;
    self.moveAction.hidden = worldNode[userNode][userOrientation][11] ? NO : YES;
    [_moveAction setTitle:worldNode[userNode][userOrientation][11] forState:UIControlStateNormal];
    
    self.debugOrientation.text = worldOrientation[userOrientation];
    self.debugNode.text = [NSString stringWithFormat:@"%d",userNode];
    self.debugLocation.text = worldNode[userNode][0][1];
    
    worldNodeImg = [NSString stringWithFormat:@"%@%d%@", @"node", userNode, @".jpg"];
    
    self.viewMain.image = [UIImage imageNamed:worldNodeImg];
    self.viewMain.frame = CGRectMake( (userOrientation*320*-1 ) , 10.0, 1280.0, 460.0);
    
}

- (void)actionCheck
{
    
    self.debugAction.text = userAction ? worldNode[userNode][userOrientation][11] : 0;
    
    self.moveLeft.hidden = userAction ? YES : NO;
    self.moveRight.hidden = userAction ? YES : NO;
    self.moveForward.hidden = userAction ? YES : NO;
    self.moveReturn.hidden = userAction ? NO : YES;

}


@end
