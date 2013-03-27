#import "DozenalViewController.h"

@interface DozenalViewController (Templates)

-(void) audioVolume :(int)volume :(int)userNode;

-(void) audioFootLeft;
-(void) audioFootRight;
-(void) audioTurn;
-(void) audioReturn;
-(void) audioCollide;

-(void) audioClockInit;
-(void) audioClockActive;
-(void) audioClockInactive;
-(void) audioClockTurn;

-(void) audioSealInit;
-(void) audioSealActive;
-(void) audioSealInactive;
-(void) audioSealStack;

-(void) audioEnergyInit;
-(void) audioEnergyActive;
-(void) audioEnergyInactive;
-(void) audioEnergyStack;

-(void) audioTerminalInit;
-(void) audioTerminalActive;
-(void) audioTerminalInactive;

-(void) audioDoorInit;
-(void) audioDoorActive;
-(void) audioDoorInactive;
-(void) audioDoorEnter;

-(void) ambientPlayer;
-(void) ambientForest;
-(void) ambientStudio;
-(void) ambientCircular;
-(void) ambientAntechannel;
-(void) ambientStones;
-(void) ambientMetamondst;
-(void) ambientRainre;

-(void) musicPlayer:(NSString*)act;


@end