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
 NS_ENUM(NSUInteger, FBSDKLiveStreamingStatusCode)
  The different types of status messages the FBSDKLiveStreamingManager can be in.
 */
typedef NS_ENUM(NSUInteger, FBSDKLiveStreamingStatusCode)
{
  /** The Live Streaming Manager has just been created, but a stream has not started yet. */
  FBSDKLiveStreamingStatusCodeCreated = 0,
  /** A new live stream is being initialized. */
  FBSDKLiveStreamingStatusCodeInitializing,
  /** There is a live stream in progress. */
  FBSDKLiveStreamingStatusCodeRunning,
  /** There is a live stream in progress, but it is currently paused. */
  FBSDKLiveStreamingStatusCodePaused,
  /** The current live stream is ending. */
  FBSDKLiveStreamingStatusCodeEnding,
  /** The last live stream has ended. */
  FBSDKLiveStreamingStatusCodeCompleted,
};

/**
  A container for status from the FBSDKLiveStreamingManager.
 */
@interface FBSDKLiveStreamingStatus : NSObject

#pragma mark - Properties

/**
  The status code for this Live Streaming Status.
 */
@property (nonatomic, assign, readonly) FBSDKLiveStreamingStatusCode code;

#pragma mark - Public Methods

/**
  Convenience method to build a new Live Streaming Status with a specific status code.
 - Parameter code: The staus code for this Live Streaming Status.
 */
+ (instancetype)statusWithCode:(FBSDKLiveStreamingStatusCode)code;

/**
  Convenience method to get a string representation of a Live Streaming Status.
 - Parameter code: The status code to describe.
 */
+ (NSString *)stringForStatusCode:(FBSDKLiveStreamingStatusCode)code;

@end
