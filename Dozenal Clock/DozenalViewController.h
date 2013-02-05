//
//  DozenalViewController.h
//  Dozenal Clock
//
//  Created by Devine Lu Linvega on 2013-01-31.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DozenalViewController : UIViewController <UITextFieldDelegate>

@property (weak, nonatomic) IBOutlet UILabel *debugOrientation;
@property (weak, nonatomic) IBOutlet UILabel *debugNode;
@property (weak, nonatomic) IBOutlet UILabel *debugLocation;
@property (weak, nonatomic) IBOutlet UILabel *debugAction;

//

@property (weak, nonatomic) IBOutlet UIButton *moveLeft;
@property (weak, nonatomic) IBOutlet UIButton *moveRight;
@property (weak, nonatomic) IBOutlet UIButton *moveForward;
@property (weak, nonatomic) IBOutlet UIButton *moveAction;
@property (weak, nonatomic) IBOutlet UIButton *moveReturn;
@property (weak, nonatomic) IBOutlet UIImageView *viewMain;

- (IBAction)moveLeft:(id)sender;
- (IBAction)moveRight:(id)sender;
- (IBAction)moveForward:(id)sender;
- (IBAction)moveAction:(id)sender;
- (IBAction)moveReturn:(id)sender;

@end

