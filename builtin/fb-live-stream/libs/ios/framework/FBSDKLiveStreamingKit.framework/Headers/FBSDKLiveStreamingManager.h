// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
//
// You are hereby granted a non-exclusive, worldwide, royalty-free license to use,
// copy, modify, and distribute this software in source code or binary form for use
// in connection with the web services and APIs provided by Facebook.
//
// As with any software that integrates with the Facebook platform, your use of
// this software is subject to the Facebook Developer Principles and Policies
// [http://developers.facebook.com/policy/]. This copyright notice shall be
// included in all copies or substantial portions of the software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#import <Foundation/Foundation.h>

#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingCapability.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingConfig.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingError.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingObserver.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingStats.h>
#import <FBSDKLiveStreamingKit/FBSDKLiveStreamingStatus.h>

/**
  Notification indicating that the `liveStreamingStatus` has changed.

  The userInfo dictionary of the notification will contain the key
  `FBSDKLiveStreamingStatusKey` - the updated status
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingStatusUpdateNotification;

/**
  Notification indicating that the `liveStreamingError` has changed.

  The userInfo dictionary of the notification will contain keys
  `FBSDKLiveStreamingErrorKey` - the specific error
  `FBSDKLiveStreamingStatusKey` - the status before the error
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingErrorNotification;

/**
  Notification indicating that a live stream has started.
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingStartedNotification;

/**
  Notification indicating that a live stream has ended.
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingEndedNotification;

/**
  Key in notification's userInfo object for getting the new error.

  If there is no error, the key will not be present.
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingErrorKey;

/**
  Key in notification's userInfo object for getting the status.
 */
FBSDK_EXTERN NSString *const FBSDKLiveStreamingStatusKey;

/**
  The manager for Facebook Live Streams.
 */
@interface FBSDKLiveStreamingManager : NSObject

#pragma mark - Properties

/**
  The configuration settings that were used to start the current live stream or
  last live stream if no stream is running.
  Will be nil until a stream has been started.
 */
@property (nonatomic, strong, readonly) FBSDKLiveStreamingConfig *liveStreamingConfig;

/**
  The last error thrown by the Live Streaming Manager.
 */
@property (nonatomic, strong, readonly) FBSDKLiveStreamingError *liveStreamingError;

/**
  The live streaming stats from the current live stream or the last live stream
  if no stream is running.
 */
@property (nonatomic, strong, readonly) FBSDKLiveStreamingStats *liveStreamingStats;

/**
  The current status of the Live Streaming Manager.
 */
@property (nonatomic, strong, readonly) FBSDKLiveStreamingStatus *liveStreamingStatus;

/**
  Returns if the player grant the app permission to use the mic.
 */
@property (nonatomic, readonly) BOOL canUseMic;

/**
  Is the mic enabled for the current live stream. Can only be changed if the
  player grants the app permission and useMic is set to YES in the passed in
  liveStreamingConfig.
 */
@property (nonatomic, assign) BOOL micEnabled;

/**
  Returns if the player grant the app permission to use the camera.
 */
@property (nonatomic, readonly) BOOL canUseCamera;

/**
  Is the camera enabled for the current live stream. Can only be changed if the
  player grants the app permission and useCamera is set to YES in the passed in
  liveStreamingConfig.
 */
@property (nonatomic, assign) BOOL cameraEnabled;

/**
  A view containing the contents of the front-facing camera. If the camera has
  not been enabled, this property is nil.
 */
@property (nonatomic, readonly) UIView *cameraView;

#pragma mark - Public Methods

/**
  Get the current live stream manager instance or create one if there was no previous instance.
 */
+ (FBSDKLiveStreamingManager *)getInstance;

+ (instancetype)new NS_UNAVAILABLE;

- (instancetype)init NS_UNAVAILABLE;

/**
  Check if the current device can start a live stream, returning the reason if the device is not stream capable.

 Must be called on the main thread.
 */
- (FBSDKLiveStreamingCapability *)getLiveStreamingCapability;

/**
  Check if the current device can start a live stream.

 Must be called on the main thread.
 */
- (BOOL)isStreamingCapable;

/**
  Check if the manager is in a state to start a new livestream.

 Must be called on the main thread.
 */
- (BOOL)isReadyToStartNewStream;

/**
  Check if there is a live stream in progress.
 */
- (BOOL)isStreaming;

/**
  Check if the current live stream is paused.
 */
- (BOOL)isPaused;

/**
  Start a new livestream with the given config.

 Must be called on the main thread.
 */
- (FBSDKLiveStreamingStatus *)startLiveStreamWithLiveStreamingConfig:(FBSDKLiveStreamingConfig*)liveStreamingConfig;

/**
  End the current live stream.
 */
- (FBSDKLiveStreamingStatus *)stopLiveStreaming;

/**
  Pause the current live stream.
 */
- (FBSDKLiveStreamingStatus *)pauseLiveStreaming;

/**
  Resume a paused live stream.
 */
- (FBSDKLiveStreamingStatus *)continueLiveStreaming;

/**
  Add the given observer to the list of items listening to Live Streaming
  Notifications. Make sure to call removeObserver for the same obsever.
 */
- (void)addObserver:(id <FBSDKLiveStreamingObserver>)liveStreamingObserver;

/**
  Removes the observer from the list of items listening to Live Streaming Notifiations.
 */
- (void)removeObserver:(id <FBSDKLiveStreamingObserver>)liveStreamingObserver;

@end
