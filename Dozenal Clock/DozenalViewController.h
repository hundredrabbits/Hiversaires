//
//  DozenalViewController.h
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DozenalViewController : UIViewController <UITextFieldDelegate>

// Debug

@property (weak, nonatomic) IBOutlet UILabel *debugOrientation;
@property (weak, nonatomic) IBOutlet UILabel *debugNode;
@property (weak, nonatomic) IBOutlet UILabel *debugAction;

// Movement

@property (weak, nonatomic) IBOutlet UIButton *moveLeft;
@property (weak, nonatomic) IBOutlet UIButton *moveRight;
@property (weak, nonatomic) IBOutlet UIButton *moveForward;
@property (weak, nonatomic) IBOutlet UIImageView *viewMain;

- (IBAction)moveLeft:(id)sender;
- (IBAction)moveRight:(id)sender;
- (IBAction)moveForward:(id)sender;

// Actions

@property (weak, nonatomic) IBOutlet UIButton *action1;
@property (weak, nonatomic) IBOutlet UIButton *action2;
@property (weak, nonatomic) IBOutlet UIButton *action3;
@property (weak, nonatomic) IBOutlet UIButton *action4;
@property (weak, nonatomic) IBOutlet UIButton *action5;

- (IBAction)action1:(id)sender;
- (IBAction)action2:(id)sender;
- (IBAction)action3:(id)sender;
- (IBAction)action4:(id)sender;
- (IBAction)action5:(id)sender;

// Graphics

@property (weak, nonatomic) IBOutlet UIImageView *graphic1;
@property (weak, nonatomic) IBOutlet UIImageView *graphic2;
@property (weak, nonatomic) IBOutlet UIImageView *graphic3;
@property (weak, nonatomic) IBOutlet UIImageView *graphic4;
@property (weak, nonatomic) IBOutlet UIImageView *graphic5;
@property (weak, nonatomic) IBOutlet UIImageView *graphic6;
@property (weak, nonatomic) IBOutlet UIImageView *graphic7;
@property (weak, nonatomic) IBOutlet UIImageView *graphic8;
@property (weak, nonatomic) IBOutlet UIImageView *graphic9;
@property (weak, nonatomic) IBOutlet UIImageView *graphic10;

// Interface

@property (weak, nonatomic) IBOutlet UIImageView *interfaceFuseBackground;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceFuse1;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceSealBackground;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceSeal1;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceSeal2;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceAudio;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceDimclockBackground;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceDimclock;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceSave;
@property (weak, nonatomic) IBOutlet UIImageView *interfaceIllusion;

@property (weak, nonatomic) IBOutlet UIImageView *vignette;




@end

