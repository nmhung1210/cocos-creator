//
//  FacebookAN.m
//  fb_live_stream-mobile
//
//  Created by wzm on 17/07/2018.
//

#import "FacebookAN.h"
#import <Foundation/Foundation.h>
#import <FBAudienceNetwork/FBAudienceNetwork.h>
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"

typedef enum ADS_TYPE {
    BANNER = 1,
    REWARDEDVIDEO = 2,
    INTERSTITIAL = 3,
}ADS_TYPE;

typedef enum BANNER_POSITION {
    ALIGN_PARENT_TOP =  1,
    ALIGN_PARENT_BOTTOM = 2,
}BANNER_POSITION;

typedef enum BANNER_SIZE {
    AD_INTERSTITIAL = 1,
    BANNER_HEIGHT_50 = 2,
    BANNER_HEIGHT_90 = 3,
    RECTANGLE_HEIGHT_250 = 4,
}BANNER_SIZE;

@interface FacebookAN ()<FBInterstitialAdDelegate,FBAdViewDelegate,FBRewardedVideoAdDelegate>

@property (nonatomic, strong) FBInterstitialAd *interstitialAd;
@property (nonatomic,strong)FBAdView *adView;
@property (nonatomic,strong)UIWindow *window;
@end
@implementation FacebookAN
#pragma mark - FacebookAN Method
-(FacebookAN *)init{
    self = [super init];
    self.adList = [[NSMutableDictionary alloc] init];
    self.window = [[UIApplication sharedApplication] windows][0];
    return self;
}

-(id)getAd:(NSString *)placementId{
    return [self.adList objectForKey:placementId];;
}

-(id)removeAd:(NSString *)placementId{
    id ad = [self.adList objectForKey:placementId];
    if(ad != NULL){
        [self.adList removeObjectForKey:placementId];
    }
    return ad;
}

-(void) show:(NSString *)placementId{
    id ad =[self getAd:placementId];
    if(ad != NULL){
        if([ad isKindOfClass:[FBInterstitialAd class]]){
            FBInterstitialAd *interAd = (FBInterstitialAd *)ad;
            [interAd showAdFromRootViewController:NULL];
        }else if([ad isKindOfClass:[FBRewardedVideoAd class]]){
            FBRewardedVideoAd *rewardAd = (FBRewardedVideoAd *)ad;
            [rewardAd showAdFromRootViewController:self.window.rootViewController animated:NO];
        }
    }
}

-(void) load:(NSString *)placementId{
    id ad =[self getAd:placementId];
    if(ad != NULL){
        if([ad isKindOfClass:[FBInterstitialAd class]]){
            FBInterstitialAd *interAd = (FBInterstitialAd *)ad;
            [interAd loadAd];
        }else if([ad isKindOfClass:[FBRewardedVideoAd class]]){
            FBRewardedVideoAd *rewardAd = (FBRewardedVideoAd *)ad;
            [rewardAd loadAd];
        }else if([ad isKindOfClass:[FBAdView class]]){
            FBAdView *banner = (FBAdView *)ad;
            [banner loadAd];
        }
    }
}

-(bool)_isExist:(NSString *)placementId{
    return [self.adList objectForKey:placementId] != NULL;
}

-(void)destroy:(NSString *)placementId{
    id ad = [self getAd:placementId];
    if(ad != NULL && [ad isKindOfClass:[FBAdView class]]){
        FBAdView *banner = (FBAdView *)ad;
        [banner removeFromSuperview];
    }
}

-(void)addRewardAd:(NSString *)placementId{
    FBRewardedVideoAd *ad = [[FBRewardedVideoAd alloc] initWithPlacementID:placementId];
    ad.delegate = self;
    [self.adList setValue:ad forKey:placementId];
    [self handlerMessageToGame:@"onCreated" withAdsId:placementId];
}

-(void)addInterstitalAd:(NSString *)placementId{
    FBInterstitialAd *view = [[FBInterstitialAd alloc] initWithPlacementID:placementId];
    view.delegate = self;
    [self.adList setValue:view forKey:placementId];
    [self handlerMessageToGame:@"onCreated" withAdsId:placementId];
}

-(void)addBanner:(NSString *)placementId withSize:(NSString *)size andPosition:(NSString *)position{
    int intSize = [size intValue];
    FBAdSize adSize = kFBAdSizeHeight50Banner;
    switch (intSize) {
        case AD_INTERSTITIAL:
            adSize = kFBAdSizeInterstitial;
            break;
        case BANNER_HEIGHT_50:
            adSize = kFBAdSizeHeight50Banner;
            break;
        case BANNER_HEIGHT_90:
            adSize = kFBAdSizeHeight90Banner;
            break;
    }
    
    FBAdView *ad = [[FBAdView alloc] initWithPlacementID:placementId adSize:adSize rootViewController:self.window.rootViewController];
    ad.autoresizingMask =
    UIViewAutoresizingFlexibleRightMargin |
    UIViewAutoresizingFlexibleLeftMargin|
    UIViewAutoresizingFlexibleWidth |
    UIViewAutoresizingFlexibleTopMargin;
    
    int intPosition = [position intValue];
    CGSize viewSize = self.window.rootViewController.view.bounds.size;
    CGRect adFrame = CGRectMake(0,0,viewSize.width,adSize.size.height);
    switch (intPosition) {
        case ALIGN_PARENT_TOP:
            adFrame.origin.y = 0;
            break;
        case ALIGN_PARENT_BOTTOM:
            adFrame.origin.y = viewSize.height - adSize.size.height;
            break;
    }
    ad.frame = adFrame;
    ad.delegate = self;
    [self.adList setValue:ad forKey:placementId];
    [self.window.rootViewController.view addSubview:ad];
    [self handlerMessageToGame:@"onCreated" withAdsId:placementId];
}

-(void)handlerMessageToGame :(NSString *)eventName withAdsId:(NSString *)placementId{
    NSString *execStr = [NSString stringWithFormat:@"cc.Ads._eventReceiver('%@','%@')",eventName,placementId];
    se::ScriptEngine::getInstance()->evalString([execStr UTF8String]);
}

-(void)handlerMessageToGame :(NSString *)eventName withAdsId:(NSString *)placementId andErrorCode:(NSString *)code{
    NSString *execStr = [NSString stringWithFormat:@"cc.Ads._eventReceiver('%@','%@','%@')",eventName,placementId,code];
    se::ScriptEngine::getInstance()->evalString([execStr UTF8String]);
}

#pragma mark - FacebookAN static Methods
+ (FacebookAN *)getInstance
{
    static FacebookAN *fbInstance;
    
    @synchronized(self)
    {
        if (!fbInstance){
            fbInstance = [[FacebookAN alloc] init];
        }
        return fbInstance;
    }
}

+(void)loadAd:(NSString *)placementId{
    [[FacebookAN getInstance] load:placementId];
}
+(void)showAd:(NSString *)placementId{
    [[FacebookAN getInstance] show:placementId];
}
+(void)destroyAd:(NSString *)placementId{
    [[FacebookAN getInstance] destroy:placementId];
}

+(void)createAd:(NSString *)placementId withSize:(NSString *)size andPosition:(NSString *)position{
    [[FacebookAN getInstance] addBanner:placementId withSize:size andPosition:position];
}

+(void)createAd:(NSString *)type withId:(NSString *)placementId{
    if([type intValue] == INTERSTITIAL){
        [[FacebookAN getInstance] addInterstitalAd:placementId];
    }else if([type intValue] == REWARDEDVIDEO){
        [[FacebookAN getInstance] addRewardAd:placementId];
    }
}


#pragma mark - FBInterstitialAdDelegate implementation

- (void)interstitialAdDidLoad:(FBInterstitialAd *)interstitialAd
{
    NSLog(@"Interstitial ad was loaded. Can present now.");
    [self handlerMessageToGame:@"onAdLoaded" withAdsId:interstitialAd.placementID];
}

- (void)interstitialAd:(FBInterstitialAd *)interstitialAd didFailWithError:(NSError *)error
{
    NSLog(@"Interstitial failed to load with error: %@", error.description);
    NSString *errorCode = [NSString stringWithFormat:@"%ld",(long)error.code];
    [self handlerMessageToGame:@"onError" withAdsId:interstitialAd.placementID andErrorCode:errorCode];
}

- (void)interstitialAdDidClick:(FBInterstitialAd *)interstitialAd
{
    NSLog(@"Interstitial was clicked.");
    [self handlerMessageToGame:@"onAdClicked" withAdsId:interstitialAd.placementID];
}

- (void)interstitialAdDidClose:(FBInterstitialAd *)interstitialAd
{
    NSLog(@"Interstitial closed.");
    
    // Optional, Cleaning up.
    [self handlerMessageToGame:@"onInterstitialDismissed" withAdsId:interstitialAd.placementID];
}

- (void)interstitialAdWillClose:(FBInterstitialAd *)interstitialAd
{
    NSLog(@"Interstitial will close.");
    [self handlerMessageToGame:@"onInterstitialWillClose" withAdsId:interstitialAd.placementID];
}

- (void)interstitialAdWillLogImpression:(FBInterstitialAd *)interstitialAd
{
    NSLog(@"Interstitial impression is being captured.");
    [self handlerMessageToGame:@"onLoggingImpression" withAdsId:interstitialAd.placementID];
}


#pragma mark - FBRewardedVideoAdDelegate implementation

- (void)rewardedVideoAdDidLoad:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video ad was loaded. Can present now.");
    [self handlerMessageToGame:@"onAdLoaded" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAd:(FBRewardedVideoAd *)rewardedVideoAd didFailWithError:(NSError *)error
{
    NSLog(@"Rewarded video failed to load with error: %@", error.description);
    NSString *errorCode = [NSString stringWithFormat:@"%ld",(long)error.code];
    [self handlerMessageToGame:@"onError" withAdsId:rewardedVideoAd.placementID andErrorCode:errorCode];
}

- (void)rewardedVideoAdDidClick:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video was clicked.");
    [self handlerMessageToGame:@"onAdClicked" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAdDidClose:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video closed.");
    [self handlerMessageToGame:@"onRewardedVideoClosed" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAdWillClose:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video will close.");
    [self handlerMessageToGame:@"onRewardedVideoWillClose" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAdWillLogImpression:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video impression is being captured.");
    [self handlerMessageToGame:@"onLoggingImpression" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAdVideoComplete:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video was completed successfully.");
    [self handlerMessageToGame:@"onRewardedVideoCompleted" withAdsId:rewardedVideoAd.placementID];
}

- (void)rewardedVideoAdServerRewardDidSucceed:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video server side reward succeeded.");
    [self handlerMessageToGame:@"onRewardedVideoServerRewardSucceed" withAdsId:rewardedVideoAd.placementID];
    //optional, cleanup
}

- (void)rewardedVideoAdServerRewardDidFail:(FBRewardedVideoAd *)rewardedVideoAd
{
    NSLog(@"Rewarded video server side reward failed.");
    [self handlerMessageToGame:@"onRewardedVideoServerRewardFail" withAdsId:rewardedVideoAd.placementID];
    //optional, cleanup
}

#pragma mark - FBAdViewDelegate implementation

// Implement this function if you want to change the viewController after the FBAdView
// is created. The viewController will be used to present the modal view (such as the
// in-app browser that can appear when an ad is clicked).
//- (UIViewController *)viewControllerForPresentingModalView
//{
//    return self;
//}

- (void)adViewDidClick:(FBAdView *)adView
{
    NSLog(@"Ad was clicked.");
    [self handlerMessageToGame:@"onAdClicked" withAdsId:adView.placementID];
}

- (void)adViewDidFinishHandlingClick:(FBAdView *)adView
{
    NSLog(@"Ad did finish click handling.");
}

- (void)adViewDidLoad:(FBAdView *)adView
{
    NSLog(@"Ad was loaded.");
    // Now that the ad was loaded, show the view in case it was hidden before.
    [self handlerMessageToGame:@"onAdLoaded" withAdsId:adView.placementID];
}

- (void)adView:(FBAdView *)adView didFailWithError:(NSError *)error
{
    NSLog(@"Ad failed to load with error: %@", error);
    NSString *errorCode = [NSString stringWithFormat:@"%ld",(long)error.code];
    [self handlerMessageToGame:@"onError" withAdsId:adView.placementID andErrorCode:errorCode];
}

- (void)adViewWillLogImpression:(FBAdView *)adView
{
    NSLog(@"Ad impression is being captured.");
    [self handlerMessageToGame:@"onLoggingImpression" withAdsId:adView.placementID];
}

@end
