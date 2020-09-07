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
 NS_ENUM(NSUInteger, FBSDKLiveStreamingErrorCode)
  The different types of errors that can be thrown by the FBSDKLiveStreamingManager.
 */
typedef NS_ENUM(NSUInteger, FBSDKLiveStreamingErrorCode)
{
  /** No error, used to initialize the live streaming manager error property. */
  FBSDKLiveStreamingErrorCodeNoError = 0,
  /** An uncategorized error was thrown. */
  FBSDKLiveStreamingErrorCodeGeneric,
  /** Attempting to start a live stream when the device is not currently capable of streaming. */
  FBSDKLiveStreamingErrorCodeNotStreamCapable,
  /** Attempting to start a live stream while a stream is already in progress. */
  FBSDKLiveStreamingErrorCodeAlreadyStreaming,
  /** The user declined to start a live stream. */
  FBSDKLiveStreamingErrorCodeUserDeclined,
  /** An error occured with ReplayKit. */
  FBSDKLiveStreamingErrorCodeReplayKitError,
  /** A failure occured during stream setup. */
  FBSDKLiveStreamingErrorCodeSetupFailure,
  /** Streams paused for a long time will end automatically. Attempting to continue one of these streams will result in this error. */
  FBSDKLiveStreamingErrorCodeLongPause,
  /** There was a failure during the broadcast that could not be recovered. */
  FBSDKLiveStreamingErrorCodeBroadcastFailure,
};

/**
  A container for errors thrown by the FBSDKLiveStreamingManager.
 */
@interface FBSDKLiveStreamingError : NSObject

#pragma mark - Properties

/**
  The error code for this Live Streaming Error.
 */
@property (nonatomic, assign, readonly) FBSDKLiveStreamingErrorCode code;

/**
  The exact error if one was thrown.
 */
@property (nonatomic, copy, readonly) NSError *error;

#pragma mark - Public Methods

/**
  Convenience method to build a new Live Streaming Error with a specific error code.
 - Parameter code: The error code for this Live Streaming Error.
 */
+ (instancetype)errorWithCode:(FBSDKLiveStreamingErrorCode)code;

/**
  Convenience method to build a new Live Streaming Error with a specific error code and NSError.
 - Parameter code: The error code for this Live Streaming Error.
 - Parameter error: The error thrown.
 */
+ (instancetype)errorWithCode:(FBSDKLiveStreamingErrorCode)code error:(NSError *)error;

/**
  Convenience method to get a string representation of a Live Streaming Error.
 - Parameter code: The error code to describe.
 */
+ (NSString *)stringForErrorCode:(FBSDKLiveStreamingErrorCode)code;

@end
