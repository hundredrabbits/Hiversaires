#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>

#import "DozenalViewController_templates.h"

AVAudioPlayer *playerSounds;
AVAudioPlayer *playerAmbient;
AVAudioPlayer *playerMusic;
float userVolumeMusic = 1;

NSString* resourcePath = @"";

@implementation DozenalViewController (Audio)

// ====================
// Movement
// ====================

-(void)audioFootLeft
{
	NSLog(@"[audioFootLeft]");
	[self soundPlayer:@"footstep_left"];
}

-(void)audioFootRight
{
	NSLog(@"[audioFootRight]");
	[self soundPlayer:@"footstep_right"];
}

-(void)audioTurn
{
	NSLog(@"[audioTurn]");
	[self soundPlayer:@"footstep_turn"];
}

-(void)audioReturn
{
	NSLog(@"[audioReturn]");
	[self soundPlayer:@"action_return"];
}

-(void)audioCollide
{
	NSLog(@"[audioCollide]");
	[self soundPlayer:@"footstep_collide"];
}

// ====================
// Energy
// ====================

-(void)audioEnergyInit
{
	NSLog(@"[audioEnergyInit]");
	[self soundPlayer:@"action_EnergyInit"];
}

-(void)audioEnergyActive
{
	NSLog(@"[audioEnergyActive]");
	[self soundPlayer:@"action_EnergyActive"];
}

-(void)audioEnergyInactive
{
	NSLog(@"[audioEnergyInactive]");
	[self soundPlayer:@"action_EnergyInactive"];
}

-(void)audioEnergyStack
{
	NSLog(@"[audioEnergyStack]");
	[self soundPlayer:@"action_EnergyStack"];
}

// ====================
// Seals
// ====================

-(void)audioSealInit
{
	NSLog(@"[audioSealInit]");
	[self soundPlayer:@"action_SealInit"];
}

-(void)audioSealActive
{
	NSLog(@"[audioSealActive]");
	[self soundPlayer:@"action_SealActive"];
}

-(void)audioSealInactive
{
	NSLog(@"[audioSealInactive]");
	[self soundPlayer:@"action_SealInactive"];
}

-(void)audioSealStack
{
	NSLog(@"[audioSealStack]");
}

// ====================
// Clock
// ====================

-(void)audioClockInit
{
	NSLog(@"[audioClockInit]");
	[self soundPlayer:@"action_EnergyInit"];
}

-(void)audioClockActive
{
	NSLog(@"[audioClockActive]");
	[self soundPlayer:@"action_EnergyActive"];
}

-(void)audioClockInactive
{
	NSLog(@"[audioClockInactive]");
	[self soundPlayer:@"action_EnergyInactive"];
}

-(void)audioClockTurn
{
	NSLog(@"[audioClockTurn]");
	[self soundPlayer:@"action_EnergyActive"];
}

// ====================
// Terminal
// ====================

-(void)audioTerminalInit
{
	NSLog(@"[audioTerminalInit]");
	[self soundPlayer:@"action_EnergyInit"];
}

-(void)audioTerminalActive
{
	NSLog(@"[audioTerminalActive]");
	[self soundPlayer:@"action_EnergyActive"];
}

-(void)audioTerminalInactive
{
	NSLog(@"[audioTerminalInactive]");
	[self soundPlayer:@"action_EnergyInactive"];
}

// ====================
// Doors
// ====================

-(void)audioDoorInit
{
	NSLog(@"[audioDoorInit]");
	[self soundPlayer:@"action_DoorInit"];
}

-(void)audioDoorActive
{
	NSLog(@"[audioDoorActive]");
	[self soundPlayer:@"action_DoorActive"];
}

-(void)audioDoorInactive
{
	NSLog(@"[audioDoorInactive]");
}

-(void)audioDoorEnter
{
	NSLog(@"[audioDoorEnter]");
	[self soundPlayer:@"action_DoorActive"];
}

// ====================
// Doors
// ====================

-(void)audioMiscActive
{
	NSLog(@"[audioMiscActive]");
	[self soundPlayer:@"action_EnergyActive"];
}


-(void)audioMiscInactive
{
	NSLog(@"[audioMiscInactive]");
	[self soundPlayer:@"action_EnergyInactive"];
}


// ====================
// Music
// ====================

-(void)musicAct1
{
	[self musicPlayer:@"act1"];
}

// ====================
// Ambient
// ====================

-(void)ambientForest
{
	NSLog(@"[ambientForest]");
	[self ambientPlayer:@"ambient_forest"];
}

-(void)ambientStudio
{
	NSLog(@"[ambientStudio]");
	[self ambientPlayer:@"ambient_studio"];
}

-(void)ambientCircular
{
	NSLog(@"[ambientCircular]");
	[self ambientPlayer:@"ambient_circular"];
}

-(void)ambientStones
{
	NSLog(@"[ambientStones]");
	[self ambientPlayer:@"ambient_stones"];
}

-(void)ambientMetamondst
{
	NSLog(@"[ambientMetamondst]");
	[self ambientPlayer:@"ambient_metamondst"];
}

-(void)ambientAntechannel
{
	NSLog(@"[ambientAntechannel]");
	[self ambientPlayer:@"ambient_antechannel"];
}

-(void)ambientCapsule
{
	NSLog(@"[ambientCapsule]");
	[self ambientPlayer:@"ambient_capsule"];
}

-(void)ambientNether
{
	NSLog(@"[ambientNether]");
	[self ambientPlayer:@"ambient_capsule"];
}

-(void)ambientEntente
{
	NSLog(@"[ambientEntente]");
	[self ambientPlayer:@"ambient_circular"];
}

-(void)ambientRainre
{
	NSLog(@"[ambientRainre]");
	[self ambientPlayer:@"ambient_rainre"];
}

-(void)ambientNataniev
{
	NSLog(@"[ambientRainre]");
	[self ambientPlayer:@"ambient_nataniev"];
}

-(void)soundPlayer: (NSString *)filename;
{
    if( userVolumeMusic == 0 ){ return; }
	resourcePath = [[NSBundle mainBundle] resourcePath];
	resourcePath = [resourcePath stringByAppendingString: [NSString stringWithFormat:@"/%@.mp3", filename] ];
	NSError* err;
	playerSounds = [[AVAudioPlayer alloc] initWithContentsOfURL: [NSURL fileURLWithPath:resourcePath] error:&err];
	if(err)	{ NSLog(@"%@",err); }
	else	{
		[playerSounds play];
	}
}

-(void)ambientPlayer: (NSString *)filename;
{
    if( userVolumeMusic == 0 ){ return; }
	resourcePath = [[NSBundle mainBundle] resourcePath];
	resourcePath = [resourcePath stringByAppendingString: [NSString stringWithFormat:@"/%@.mp3", filename] ];
	NSError* err;
	playerAmbient = [[AVAudioPlayer alloc] initWithContentsOfURL: [NSURL fileURLWithPath:resourcePath] error:&err];
	if(err)	{ NSLog(@"%@",err); }
	else	{
		playerAmbient.numberOfLoops = -1; //infinite
		[playerAmbient play];
		playerAmbient.volume = userVolumeMusic/5;
	}
	NSLog(@"[ambient.volume: %f]",playerAmbient.volume);
}

-(void)musicPlayer: (NSString *)filename;
{
    if( userVolumeMusic == 0 ){ return; }
	resourcePath = [[NSBundle mainBundle] resourcePath];
	resourcePath = [resourcePath stringByAppendingString: [NSString stringWithFormat:@"/music_%@.mp3", filename] ];
	NSError* err;
	playerMusic = [[AVAudioPlayer alloc] initWithContentsOfURL: [NSURL fileURLWithPath:resourcePath] error:&err];
	if(err)	{ NSLog(@"%@",err); }
	else	{
		playerMusic.numberOfLoops = -1; //infinite
		[playerMusic play];
		playerMusic.volume = userVolumeMusic;
	}
	NSLog(@"[music.volume: %f]",playerMusic.volume);
}

- (void)audioVolume :(int)volume
{
	userVolumeMusic = [[NSNumber numberWithInt: volume] floatValue];
    userVolumeMusic = userVolumeMusic/100;
	
    if( userVolumeMusic == 0 ){
        [playerAmbient stop];
        [playerMusic stop];
        [playerSounds stop];
    }
    else{
        [playerAmbient play];
        [playerMusic play];
        [playerSounds play];
        playerAmbient.volume = userVolumeMusic/5;
        playerMusic.volume = userVolumeMusic;
        playerSounds.volume = userVolumeMusic;
    }
    
    playerMusic.volume = userVolumeMusic;
    NSLog(@"%f",playerMusic.volume);
	NSLog(@"[audio.volume: %f]",playerMusic.volume);
}





@end