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
  An observer protocol for listening to notifications sent from the FBSDKLiveStreamingManager
 */
@protocol FBSDKLiveStreamingObserver <NSObject>

@required

/**
  Notification indicating that the FBSDKLiveStreamingManager has thrown a new error.

  The userInfo dictionary of the notification will contain keys
  `FBSDKLiveStreamingErrorKey` - the specific error
  `FBSDKLiveStreamingStatusKey` - the status before the error
 */
- (void)onLiveStreamingError:(NSNotification *)notification;

/**
  Notification indicating that the status of the FBSDKLiveStreamingManager has changed.

  The userInfo dictionary of the notification will contain the key
  `FBSDKLiveStreamingStatusKey` - the updated status
 */
- (void)onLiveStreamingStatus:(NSNotification *)notification;

/**
  Notification indicating that a live stream has started.
 */
- (void)onLiveStreamingStarted:(NSNotification *)notification;

/**
  Notification indicating that a live stream has ended.
 */
- (void)onLiveStreamingEnded:(NSNotification *)notification;

@end
