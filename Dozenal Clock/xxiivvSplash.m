//
//  splash.m
//  Entaloneralie
//
//  Created by Devine Lu Linvega on 2013-06-06.
//  Copyright (c) 2013 XXIIVV. All rights reserved.
//

#import "xxiivvSplash.h"

#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

AVAudioPlayer *audioPlayerSplash;

UIImageView * logoView;
UIView * ecosystemContainer;
NSString* applicationName;
NSString *supportUrl;

@implementation splash

- (void)viewDidLoad
{
	[super viewDidLoad];
	[self start];
}

-(void)start
{
	applicationName = @"hiversaires";
	supportUrl = [NSString stringWithFormat:@"http://wiki.xxiivv.com/%@",applicationName];
	
	[self splashTemplate];
	[self audioPlayerSplash:@"splash.tune.wav"];
	[self apiContact:applicationName:@"analytics":@"launch":@"1"];
	[NSTimer scheduledTimerWithTimeInterval:4.25 target:self selector:@selector(splashClose) userInfo:nil repeats:NO]; // Uncomment
	
	[self ecosystemCheck:[[self apiContact:applicationName:@"ecosystem":@"":@""] componentsSeparatedByString:@"|"]];
}

- (void) splashTemplate
{
	CGRect screen = [[UIScreen mainScreen] bounds];
	float screenMargin = screen.size.width/8;
	
	// Create logo
	logoView = [[UIImageView alloc] initWithFrame:CGRectMake((screen.size.width/2)-60, (screen.size.height/2)-60, 120, 120)];
	logoView.image = [UIImage imageNamed:@"splash.logo.png"];
	logoView.contentMode = UIViewContentModeCenter;
	logoView.contentMode = UIViewContentModeScaleAspectFit;
	[self.view addSubview:logoView];
	
	// Create Support button
	UIButton * supportButton = [[UIButton alloc] initWithFrame:CGRectMake(0, screen.size.height*0.80, screen.size.width, screenMargin)];
	[supportButton setTitle:@"APPLICATION SUPPORT" forState:UIControlStateNormal];
	supportButton.titleLabel.font = [UIFont fontWithName:@"DINAlternate-Bold" size:10];
	[supportButton addTarget:self action:@selector(launchSupport) forControlEvents:UIControlEventTouchUpInside];
	[supportButton setTitleColor:[UIColor colorWithWhite:1 alpha:0.5] forState:UIControlStateNormal];
	[self.view addSubview:supportButton];
	
	// Set default
	logoView.frame = CGRectMake((screen.size.width/2)-60, (screen.size.height/2)-62.5, 120, 120);
	logoView.alpha = 0;
	supportButton.alpha = 0;
	
	// Animate
	[UIView beginAnimations:nil context:NULL];
	[UIView setAnimationDuration:1];
	[UIView setAnimationDelay:0];
	logoView.frame = CGRectMake((screen.size.width/2)-60, (screen.size.height/2)-60, 120, 120);
	logoView.alpha = 1;
	supportButton.alpha = 1;
	[UIView commitAnimations];
	
	ecosystemContainer = [[UIView alloc] initWithFrame:CGRectMake( (screen.size.width/2)-(screenMargin/2), -1*(screenMargin/2), screenMargin, screen.size.height)];
	[self.view addSubview:ecosystemContainer];
}

-(void)ecosystemCheck :(NSArray*)schemesList
{
	if([schemesList count] < 2 ){
		return;
	}
	
	CGFloat schemeIconTile = (ecosystemContainer.frame.size.width/4);
	CGFloat schemeIconSize = (ecosystemContainer.frame.size.width/4)-5;
	
	// Create dots
	int count = 0;
	for (NSString* schemeName in schemesList) {
		
		NSString * schemeString = [NSString stringWithFormat:@"%@://",schemeName];
		BOOL installed = [[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:schemeString]];
		
		UIView * schemeView = [[UIView alloc] initWithFrame:CGRectMake( (schemeIconTile * (count % 4)), ecosystemContainer.frame.size.height - ((count/4)+1) * schemeIconTile, schemeIconSize, schemeIconSize)];
		schemeView.layer.cornerRadius = schemeIconSize/2;
		schemeView.alpha = 0;
		
		if( installed ) {
			if( [schemeName isEqualToString:applicationName] ){ schemeView.backgroundColor = [UIColor whiteColor]; }
			else{ schemeView.backgroundColor = [UIColor colorWithWhite:1 alpha:0.5]; }
		}else {
			schemeView.backgroundColor = [UIColor colorWithWhite:1 alpha:0.15];
		}
		
		[ecosystemContainer addSubview:schemeView];
		count += 1;
	}
	
	// Animate dots
	count = 0;
	for (UIView* targetView in [ecosystemContainer subviews] ) {
		[UIView beginAnimations:nil context:NULL];
		[UIView setAnimationDuration:0.2];
		[UIView setAnimationDelay:(0.08 * count)];
		targetView.alpha = 1;
		[UIView commitAnimations];
		count += 1;
	}
}

- (void) splashClose
{
	[self performSegueWithIdentifier: @"skip" sender: self];
}

-(void)launchSupport
{
	[[UIApplication sharedApplication] openURL:[NSURL URLWithString:supportUrl]];
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

-(NSString*)apiContact:(NSString*)source :(NSString*)method :(NSString*)term :(NSString*)value
{
	NSString *post = [NSString stringWithFormat:@"values={\"term\":\"%@\",\"value\":\"%@\"}",term,value];
	NSData *postData = [post dataUsingEncoding:NSASCIIStringEncoding allowLossyConversion:YES];
	
	NSString *postLength = [NSString stringWithFormat:@"%lu", (unsigned long)[postData length]];
	
	NSMutableURLRequest *request = [[NSMutableURLRequest alloc] init];
	[request setURL:[NSURL URLWithString:[NSString stringWithFormat:@"http://api.xxiivv.com/%@/%@",source,method]]];
	[request setHTTPMethod:@"POST"];
	[request setValue:postLength forHTTPHeaderField:@"Content-Length"];
	[request setValue:@"application/x-www-form-urlencoded;charset=UTF-8" forHTTPHeaderField:@"Content-Type"];
	[request setHTTPBody:postData];
	
	NSURLResponse *response;
	NSData *POSTReply = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:nil];
	NSString *theReply = [[NSString alloc] initWithBytes:[POSTReply bytes] length:[POSTReply length] encoding: NSASCIIStringEncoding];
	NSLog(@"&  API | %@: %@",method, theReply);
	
	return theReply;
}

- (BOOL)prefersStatusBarHidden {
	return YES;
}

@end
