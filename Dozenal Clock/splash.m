//
//  splash.m
//  Entaloneralie
//
//  Created by Devine Lu Linvega on 2013-06-06.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "splash.h"


#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

AVAudioPlayer *audioPlayerSplash;

@implementation splash

- (void)viewDidLoad
{
    [super viewDidLoad];
	[self splashTemplate];
	[self splashAnimate];
	[self audioPlayerSplash:@"splash.tune.wav"];
	[NSTimer scheduledTimerWithTimeInterval:5.0 target:self selector:@selector(splashClose) userInfo:nil repeats:NO];
}

- (void) splashTemplate
{
	CGRect screen = [[UIScreen mainScreen] bounds];
	float screenMargin = screen.size.width/4;

	[self setImage:self.splashLogo :@"splash.logo.png"];
	self.splashLogo.frame = CGRectMake(screenMargin, (screen.size.height/2)-(screenMargin/2)-10, screen.size.width-(2*screenMargin), screenMargin/2);
	self.splashLogo.alpha = 0;
	
	[self setImage:self.splashLoader :@"splash.load.png"];
	self.splashLoader.frame = CGRectMake( (screen.size.width/2)-5, screen.size.height-(screenMargin/2), 10, 10);
	
	[self setImage:self.splashSupport :@"splash.support.png"];
	self.splashSupport.frame = CGRectMake(screenMargin, screen.size.height-( screen.size.width-(2*screenMargin) ) , screen.size.width-(2*screenMargin), screen.size.width-(2*screenMargin));
	self.splashSupport.alpha = 0;
	
	self.btnSplashSupport.frame = CGRectMake(screenMargin, screen.size.height-( screen.size.width-(2*screenMargin) ) , screen.size.width-(2*screenMargin), screen.size.width-(2*screenMargin));

	[self.navigationController setNavigationBarHidden:YES];
}

- (void) splashAnimate
{
	CGRect screen = [[UIScreen mainScreen] bounds];
	float screenMargin = screen.size.width/4;
	
	[UIView beginAnimations: @"Splash Intro" context:nil];
	[UIView setAnimationDuration:2.5];
	[UIView setAnimationDelay:0];
	self.splashLogo.frame = CGRectMake(screenMargin, (screen.size.height/2)-(screenMargin/2), screen.size.width-(2*screenMargin), screenMargin/2);
	self.splashLogo.alpha = 1;
	self.splashSupport.alpha = 1;
	[UIView commitAnimations];
	
	blinker = [NSTimer scheduledTimerWithTimeInterval:0.04 target:self selector:@selector(blink) userInfo:nil repeats:YES];
}

- (void) blink
{
	if( self.splashLoader.alpha == 0 ){
		self.splashLoader.alpha = 1;
	}
	else{
		self.splashLoader.alpha = 0;
	}
	
}

- (void) splashClose
{
	[blinker invalidate];
	[audioPlayerSplash stop];
	[self performSegueWithIdentifier: @"begin" sender: self];
}

- (IBAction)btnSplashSupport:(id)sender {
	[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://wiki.xxiivv.com/Hiversaires+support"]];
}

-(void)setImage :(UIImageView*)viewName :(NSString*)imageName
{
    NSString *imgFile = [[NSBundle mainBundle] pathForResource:imageName ofType:nil];
    viewName.image = nil;
	viewName.image = [UIImage imageWithContentsOfFile:imgFile];
}
-(void)audioPlayerSplash: (NSString *)filename;
{
	NSString *resourcePath = [[NSBundle mainBundle] resourcePath];
	resourcePath = [resourcePath stringByAppendingString: [NSString stringWithFormat:@"/%@", filename] ];
	NSError* err;
	audioPlayerSplash = [[AVAudioPlayer alloc] initWithContentsOfURL: [NSURL fileURLWithPath:resourcePath] error:&err];
	
	audioPlayerSplash.volume = 0.5;
	audioPlayerSplash.numberOfLoops = 0;
	audioPlayerSplash.currentTime = 0;
	
	if(err)	{ NSLog(@"%@",err); }
	else	{
		[audioPlayerSplash prepareToPlay];
		[audioPlayerSplash play];
	}
}

@end
