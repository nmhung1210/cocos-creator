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

/**
 NS_ENUM(NSUInteger, FBSDKLiveStreamingCapabilityCode)
  The different types of capabilities for the current device.
 */
typedef NS_ENUM(NSUInteger, FBSDKLiveStreamingCapabilityCode)
{
  /** The device is capable of streaming. */
  FBSDKLiveStreamingCapabilityCodeReady = 0,
  /** The device is not running the minimum iOS version of iOS 11. */
  FBSDKLiveStreamingCapabilityCodeBelowMinimumOS,
  /** The Facebook App could not be found on the device. */
  FBSDKLiveStreamingCapabilityCodeAppNotFound,
  /** The Facebook App found on the device is not up to date. */
  FBSDKLiveStreamingCapabilityCodeExtensionNotFound,
  /**
    ReplayKit has denied access to the recorder. See for possible reasons:
    https://developer.apple.com/documentation/replaykit/rpscreenrecorder/1620992-available?language=objc
  */
  FBSDKLiveStreamingCapabilityCodeRecordingUnavailable,
  /** ReplayKit is not fully supported on simulator. Please test on device. */
  FBSDKLiveStreamingCapabilityCodeOnSimulator,
};

/**
  A container for the capabilities for the current device.
 */
@interface FBSDKLiveStreamingCapability : NSObject

#pragma mark - Properties

/**
  The capbility code for this container.
 */
@property (nonatomic, assign, readonly) FBSDKLiveStreamingCapabilityCode code;

#pragma mark - Public Methods

/**
  Convenience method to build a new Live Streaming Capability with a specific capability code.
 - Parameter code: The capability code for this Live Streaming Capability.
 */
+ (instancetype)capabilityWithCode:(FBSDKLiveStreamingCapabilityCode)code;

@end
