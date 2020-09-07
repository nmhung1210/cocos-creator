#import "FacebookLive.h"
#include "platform/CCApplication.h"
#import <Bolts/Bolts.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingKit.h>
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "base/CCScheduler.h"
#include <string>
@interface FacebookLive ()<FBSDKLiveStreamingObserver>
@property(nullable,retain) FBSDKLiveStreamingConfig* _liveStreamingConfig;
@end
@implementation FacebookLive
static FBSDKLiveStreamingConfig *_liveStreamingConfig;
-(FacebookLive *)init{
    self = [super init];
    FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
    [liveStreamManager addObserver:self];
    _liveStreamingConfig = [FBSDKLiveStreamingConfig new];
    _liveStreamingConfig.useMic = YES;
    _liveStreamingConfig.useCamera = YES;
    return self;
}

-(void) startLive{
    FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
    FBSDKLiveStreamingCapability *liveStreamingCapability = [liveStreamManager getLiveStreamingCapability];
    if (liveStreamingCapability.code != FBSDKLiveStreamingCapabilityCodeReady) {
        NSLog(@"%@", liveStreamingCapability);
        return;
    }
    
    if ([liveStreamManager isReadyToStartNewStream]) {
        [liveStreamManager startLiveStreamWithLiveStreamingConfig:_liveStreamingConfig];
    }
}

-(void)stopLive{
    FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
    [liveStreamManager stopLiveStreaming];
}

-(void) resumeLive{
    FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
    [liveStreamManager continueLiveStreaming];
}

-(void) pauseLive{
    FBSDKLiveStreamingManager *liveStreamManager = [FBSDKLiveStreamingManager getInstance];
    [liveStreamManager pauseLiveStreaming];
}

- (void)onLiveStreamingEnded:(NSNotification *)notification {
    
}

- (void)onLiveStreamingError:(NSNotification *)notification {
    FBSDKLiveStreamingStatus *status = (FBSDKLiveStreamingStatus *)notification.userInfo[FBSDKLiveStreamingStatusKey];
    NSString *execStr = [NSString stringWithFormat:@"fb.liveStream._live_error_received('%lu')",(unsigned long)status.code];
    std::string str = [execStr UTF8String];
    cocos2d::Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
        se::ScriptEngine::getInstance()->evalString(str.c_str());
    });
}

- (void)onLiveStreamingStarted:(NSNotification *)notification {

}

- (void)onLiveStreamingStatus:(NSNotification *)notification {
    FBSDKLiveStreamingStatus *status = (FBSDKLiveStreamingStatus *)notification.userInfo[FBSDKLiveStreamingStatusKey];
    NSString *execStr = [NSString stringWithFormat:@"fb.liveStream._live_status_changed('%lu')",(unsigned long)status.code];
    std::string str = [execStr UTF8String];
    cocos2d::Application::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
        se::ScriptEngine::getInstance()->evalString(str.c_str());
    });
}

+(FacebookLive *) getInstance{
    static FacebookLive *fbInstance;
    
    @synchronized(self)
    {
        if (!fbInstance){
            fbInstance = [[FacebookLive alloc] init];
        }
        return fbInstance;
    }
}

+(void)startLive{
    [[FacebookLive getInstance] startLive];
}

+(void)resumeLive{
    [[FacebookLive getInstance] resumeLive];
}

+(void)stopLive{
    [[FacebookLive getInstance] stopLive];
}

+(void)pauseLive{
    [[FacebookLive getInstance] pauseLive];
}

+(void) setMicStatus:(BOOL) status{
    _liveStreamingConfig.useMic = status;
}

+(void)setCameraStatus:(BOOL)status{
    _liveStreamingConfig.useCamera = status;
}

@end
