//
//  DozenalViewController.m
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "DozenalViewController.h"

NSString        *worldOrientation[4] = {@"north",@"east",@"south",@"west"};
NSString        *worldNode[200][4][2] = {0};

int             userNode = 0;
int             userOrientation = 0;

@interface DozenalViewController ()
@end

@implementation DozenalViewController


- (void)viewDidLoad
{
    
    [super viewDidLoad];
    
    worldNode[1][2][0] = @"2";
    
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

- (IBAction)moveLeft:(id)sender {
    
    userOrientation = userOrientation < 3 ? userOrientation+1 : 0;
    
    [self moveCheck];
    
}

- (IBAction)moveRight:(id)sender {
    
    userOrientation = userOrientation == 0 ? 3 : userOrientation-1;
    
    [self moveCheck];
    
}


- (void)moveCheck
{
    
    self.moveForward.hidden = worldNode[1][userOrientation][0] ? NO : YES;

    self.label.text = worldOrientation[userOrientation];
    
}




@end
