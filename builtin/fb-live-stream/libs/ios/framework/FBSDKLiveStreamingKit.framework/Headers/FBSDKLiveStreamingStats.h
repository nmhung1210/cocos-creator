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
  A container for stats relating to the current live stream.
 */
@interface FBSDKLiveStreamingStats : NSObject

#pragma mark - Properties

/**
  The number of milliseconds that have ellapsed since the start time of the
  current live stream. This includes time when the live stream is paused.
 */
@property (nonatomic, assign, readonly) long timeElapsedSinceStartInMilliseconds;

/**
  The time when the current live stream started.
 */
@property (nonatomic, strong, readonly) NSDate *streamStartTime;

#pragma mark - Public Methods

/**
  Convenience method to build Live Streaming Stats with a specific start time.
 - Parameter streamStartTime: The time when the current live stream started.
 */
- (instancetype)initWithStreamStartTime:(NSDate *)streamStartTime;

@end
