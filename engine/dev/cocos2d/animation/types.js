
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/types.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var WrapModeMask = {
  Loop: 1 << 1,
  ShouldWrap: 1 << 2,
  // Reserved: 1 << 3,
  PingPong: 1 << 4 | 1 << 1 | 1 << 2,
  // Loop, ShouldWrap
  Reverse: 1 << 5 | 1 << 2 // ShouldWrap

};
/**
 * !#en Specifies how time is treated when it is outside of the keyframe range of an Animation.
 * !#zh 动画使用的循环模式。
 * @enum WrapMode
 * @memberof cc
 */

var WrapMode = cc.Enum({
  /**
   * !#en Reads the default wrap mode set higher up.
   * !#zh 向 Animation Component 或者 AnimationClip 查找 wrapMode
   * @property {Number} Default
   */
  Default: 0,

  /**
   * !#en All iterations are played as specified.
   * !#zh 动画只播放一遍
   * @property {Number} Normal
   */
  Normal: 1,

  /**
   * !#en All iterations are played in the reverse direction from the way they are specified.
   * !#zh 从最后一帧或结束位置开始反向播放，到第一帧或开始位置停止
   * @property {Number} Reverse
   */
  Reverse: WrapModeMask.Reverse,

  /**
   * !#en When time reaches the end of the animation, time will continue at the beginning.
   * !#zh 循环播放
   * @property {Number} Loop
   */
  Loop: WrapModeMask.Loop,

  /**
   * !#en All iterations are played in the reverse direction from the way they are specified.
   * And when time reaches the start of the animation, time will continue at the ending.
   * !#zh 反向循环播放
   * @property {Number} LoopReverse
   */
  LoopReverse: WrapModeMask.Loop | WrapModeMask.Reverse,

  /**
   * !#en Even iterations are played as specified, odd iterations are played in the reverse direction from the way they
   * are specified.
   * !#zh 从第一帧播放到最后一帧，然后反向播放回第一帧，到第一帧后再正向播放，如此循环
   * @property {Number} PingPong
   */
  PingPong: WrapModeMask.PingPong,

  /**
   * !#en Even iterations are played in the reverse direction from the way they are specified, odd iterations are played
   * as specified.
   * !#zh 从最后一帧开始反向播放，其他同 PingPong
   * @property {Number} PingPongReverse
   */
  PingPongReverse: WrapModeMask.PingPong | WrapModeMask.Reverse
});
cc.WrapMode = WrapMode; // For internal

function WrappedInfo(info) {
  if (info) {
    this.set(info);
    return;
  }

  this.ratio = 0;
  this.time = 0;
  this.direction = 1;
  this.stopped = true;
  this.iterations = 0;
  this.frameIndex = undefined;
}

WrappedInfo.prototype.set = function (info) {
  this.ratio = info.ratio;
  this.time = info.time;
  this.direction = info.direction;
  this.stopped = info.stopped;
  this.iterations = info.iterations;
  this.frameIndex = info.frameIndex;
};

module.exports = {
  WrapModeMask: WrapModeMask,
  WrapMode: WrapMode,
  WrappedInfo: WrappedInfo
};
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hbmltYXRpb24vdHlwZXMuanMiXSwibmFtZXMiOlsiV3JhcE1vZGVNYXNrIiwiTG9vcCIsIlNob3VsZFdyYXAiLCJQaW5nUG9uZyIsIlJldmVyc2UiLCJXcmFwTW9kZSIsImNjIiwiRW51bSIsIkRlZmF1bHQiLCJOb3JtYWwiLCJMb29wUmV2ZXJzZSIsIlBpbmdQb25nUmV2ZXJzZSIsIldyYXBwZWRJbmZvIiwiaW5mbyIsInNldCIsInJhdGlvIiwidGltZSIsImRpcmVjdGlvbiIsInN0b3BwZWQiLCJpdGVyYXRpb25zIiwiZnJhbWVJbmRleCIsInVuZGVmaW5lZCIsInByb3RvdHlwZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUlBLFlBQVksR0FBRztBQUNmQyxFQUFBQSxJQUFJLEVBQUUsS0FBSyxDQURJO0FBRWZDLEVBQUFBLFVBQVUsRUFBRSxLQUFLLENBRkY7QUFHZjtBQUNBQyxFQUFBQSxRQUFRLEVBQUUsS0FBSyxDQUFMLEdBQVMsS0FBSyxDQUFkLEdBQWtCLEtBQUssQ0FKbEI7QUFJc0I7QUFDckNDLEVBQUFBLE9BQU8sRUFBRSxLQUFLLENBQUwsR0FBUyxLQUFLLENBTFIsQ0FLZ0I7O0FBTGhCLENBQW5CO0FBUUE7Ozs7Ozs7QUFNQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBRW5COzs7OztBQUtBQyxFQUFBQSxPQUFPLEVBQUUsQ0FQVTs7QUFTbkI7Ozs7O0FBS0FDLEVBQUFBLE1BQU0sRUFBRSxDQWRXOztBQWdCbkI7Ozs7O0FBS0FMLEVBQUFBLE9BQU8sRUFBRUosWUFBWSxDQUFDSSxPQXJCSDs7QUF1Qm5COzs7OztBQUtBSCxFQUFBQSxJQUFJLEVBQUVELFlBQVksQ0FBQ0MsSUE1QkE7O0FBOEJuQjs7Ozs7O0FBTUFTLEVBQUFBLFdBQVcsRUFBRVYsWUFBWSxDQUFDQyxJQUFiLEdBQW9CRCxZQUFZLENBQUNJLE9BcEMzQjs7QUFzQ25COzs7Ozs7QUFNQUQsRUFBQUEsUUFBUSxFQUFFSCxZQUFZLENBQUNHLFFBNUNKOztBQThDbkI7Ozs7OztBQU1BUSxFQUFBQSxlQUFlLEVBQUVYLFlBQVksQ0FBQ0csUUFBYixHQUF3QkgsWUFBWSxDQUFDSTtBQXBEbkMsQ0FBUixDQUFmO0FBdURBRSxFQUFFLENBQUNELFFBQUgsR0FBY0EsUUFBZCxFQUVBOztBQUNBLFNBQVNPLFdBQVQsQ0FBc0JDLElBQXRCLEVBQTRCO0FBQ3hCLE1BQUlBLElBQUosRUFBVTtBQUNOLFNBQUtDLEdBQUwsQ0FBU0QsSUFBVDtBQUNBO0FBQ0g7O0FBRUQsT0FBS0UsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLQyxJQUFMLEdBQVksQ0FBWjtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxPQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLE9BQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCQyxTQUFsQjtBQUNIOztBQUVEVCxXQUFXLENBQUNVLFNBQVosQ0FBc0JSLEdBQXRCLEdBQTRCLFVBQVVELElBQVYsRUFBZ0I7QUFDeEMsT0FBS0UsS0FBTCxHQUFhRixJQUFJLENBQUNFLEtBQWxCO0FBQ0EsT0FBS0MsSUFBTCxHQUFZSCxJQUFJLENBQUNHLElBQWpCO0FBQ0EsT0FBS0MsU0FBTCxHQUFpQkosSUFBSSxDQUFDSSxTQUF0QjtBQUNBLE9BQUtDLE9BQUwsR0FBZUwsSUFBSSxDQUFDSyxPQUFwQjtBQUNBLE9BQUtDLFVBQUwsR0FBa0JOLElBQUksQ0FBQ00sVUFBdkI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCUCxJQUFJLENBQUNPLFVBQXZCO0FBQ0gsQ0FQRDs7QUFTQUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2J4QixFQUFBQSxZQUFZLEVBQVpBLFlBRGE7QUFFYkssRUFBQUEsUUFBUSxFQUFSQSxRQUZhO0FBR2JPLEVBQUFBLFdBQVcsRUFBWEE7QUFIYSxDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBXcmFwTW9kZU1hc2sgPSB7XG4gICAgTG9vcDogMSA8PCAxLFxuICAgIFNob3VsZFdyYXA6IDEgPDwgMixcbiAgICAvLyBSZXNlcnZlZDogMSA8PCAzLFxuICAgIFBpbmdQb25nOiAxIDw8IDQgfCAxIDw8IDEgfCAxIDw8IDIsICAvLyBMb29wLCBTaG91bGRXcmFwXG4gICAgUmV2ZXJzZTogMSA8PCA1IHwgMSA8PCAyLCAgICAgIC8vIFNob3VsZFdyYXBcbn07XG5cbi8qKlxuICogISNlbiBTcGVjaWZpZXMgaG93IHRpbWUgaXMgdHJlYXRlZCB3aGVuIGl0IGlzIG91dHNpZGUgb2YgdGhlIGtleWZyYW1lIHJhbmdlIG9mIGFuIEFuaW1hdGlvbi5cbiAqICEjemgg5Yqo55S75L2/55So55qE5b6q546v5qih5byP44CCXG4gKiBAZW51bSBXcmFwTW9kZVxuICogQG1lbWJlcm9mIGNjXG4gKi9cbnZhciBXcmFwTW9kZSA9IGNjLkVudW0oe1xuXG4gICAgLyoqXG4gICAgICogISNlbiBSZWFkcyB0aGUgZGVmYXVsdCB3cmFwIG1vZGUgc2V0IGhpZ2hlciB1cC5cbiAgICAgKiAhI3poIOWQkSBBbmltYXRpb24gQ29tcG9uZW50IOaIluiAhSBBbmltYXRpb25DbGlwIOafpeaJviB3cmFwTW9kZVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBEZWZhdWx0XG4gICAgICovXG4gICAgRGVmYXVsdDogMCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWxsIGl0ZXJhdGlvbnMgYXJlIHBsYXllZCBhcyBzcGVjaWZpZWQuXG4gICAgICogISN6aCDliqjnlLvlj6rmkq3mlL7kuIDpgY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTm9ybWFsXG4gICAgICovXG4gICAgTm9ybWFsOiAxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBbGwgaXRlcmF0aW9ucyBhcmUgcGxheWVkIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbiBmcm9tIHRoZSB3YXkgdGhleSBhcmUgc3BlY2lmaWVkLlxuICAgICAqICEjemgg5LuO5pyA5ZCO5LiA5bin5oiW57uT5p2f5L2N572u5byA5aeL5Y+N5ZCR5pKt5pS+77yM5Yiw56ys5LiA5bin5oiW5byA5aeL5L2N572u5YGc5q2iXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJldmVyc2VcbiAgICAgKi9cbiAgICBSZXZlcnNlOiBXcmFwTW9kZU1hc2suUmV2ZXJzZSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gV2hlbiB0aW1lIHJlYWNoZXMgdGhlIGVuZCBvZiB0aGUgYW5pbWF0aW9uLCB0aW1lIHdpbGwgY29udGludWUgYXQgdGhlIGJlZ2lubmluZy5cbiAgICAgKiAhI3poIOW+queOr+aSreaUvlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMb29wXG4gICAgICovXG4gICAgTG9vcDogV3JhcE1vZGVNYXNrLkxvb3AsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFsbCBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uIGZyb20gdGhlIHdheSB0aGV5IGFyZSBzcGVjaWZpZWQuXG4gICAgICogQW5kIHdoZW4gdGltZSByZWFjaGVzIHRoZSBzdGFydCBvZiB0aGUgYW5pbWF0aW9uLCB0aW1lIHdpbGwgY29udGludWUgYXQgdGhlIGVuZGluZy5cbiAgICAgKiAhI3poIOWPjeWQkeW+queOr+aSreaUvlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBMb29wUmV2ZXJzZVxuICAgICAqL1xuICAgIExvb3BSZXZlcnNlOiBXcmFwTW9kZU1hc2suTG9vcCB8IFdyYXBNb2RlTWFzay5SZXZlcnNlLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBFdmVuIGl0ZXJhdGlvbnMgYXJlIHBsYXllZCBhcyBzcGVjaWZpZWQsIG9kZCBpdGVyYXRpb25zIGFyZSBwbGF5ZWQgaW4gdGhlIHJldmVyc2UgZGlyZWN0aW9uIGZyb20gdGhlIHdheSB0aGV5XG4gICAgICogYXJlIHNwZWNpZmllZC5cbiAgICAgKiAhI3poIOS7juesrOS4gOW4p+aSreaUvuWIsOacgOWQjuS4gOW4p++8jOeEtuWQjuWPjeWQkeaSreaUvuWbnuesrOS4gOW4p++8jOWIsOesrOS4gOW4p+WQjuWGjeato+WQkeaSreaUvu+8jOWmguatpOW+queOr1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQaW5nUG9uZ1xuICAgICAqL1xuICAgIFBpbmdQb25nOiBXcmFwTW9kZU1hc2suUGluZ1BvbmcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEV2ZW4gaXRlcmF0aW9ucyBhcmUgcGxheWVkIGluIHRoZSByZXZlcnNlIGRpcmVjdGlvbiBmcm9tIHRoZSB3YXkgdGhleSBhcmUgc3BlY2lmaWVkLCBvZGQgaXRlcmF0aW9ucyBhcmUgcGxheWVkXG4gICAgICogYXMgc3BlY2lmaWVkLlxuICAgICAqICEjemgg5LuO5pyA5ZCO5LiA5bin5byA5aeL5Y+N5ZCR5pKt5pS+77yM5YW25LuW5ZCMIFBpbmdQb25nXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBpbmdQb25nUmV2ZXJzZVxuICAgICAqL1xuICAgIFBpbmdQb25nUmV2ZXJzZTogV3JhcE1vZGVNYXNrLlBpbmdQb25nIHwgV3JhcE1vZGVNYXNrLlJldmVyc2Vcbn0pO1xuXG5jYy5XcmFwTW9kZSA9IFdyYXBNb2RlO1xuXG4vLyBGb3IgaW50ZXJuYWxcbmZ1bmN0aW9uIFdyYXBwZWRJbmZvIChpbmZvKSB7XG4gICAgaWYgKGluZm8pIHtcbiAgICAgICAgdGhpcy5zZXQoaW5mbyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJhdGlvID0gMDtcbiAgICB0aGlzLnRpbWUgPSAwO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gMTtcbiAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xuICAgIHRoaXMuaXRlcmF0aW9ucyA9IDA7XG4gICAgdGhpcy5mcmFtZUluZGV4ID0gdW5kZWZpbmVkO1xufVxuXG5XcmFwcGVkSW5mby5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGluZm8pIHtcbiAgICB0aGlzLnJhdGlvID0gaW5mby5yYXRpbztcbiAgICB0aGlzLnRpbWUgPSBpbmZvLnRpbWU7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBpbmZvLmRpcmVjdGlvbjtcbiAgICB0aGlzLnN0b3BwZWQgPSBpbmZvLnN0b3BwZWQ7XG4gICAgdGhpcy5pdGVyYXRpb25zID0gaW5mby5pdGVyYXRpb25zO1xuICAgIHRoaXMuZnJhbWVJbmRleCA9IGluZm8uZnJhbWVJbmRleDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFdyYXBNb2RlTWFzayxcbiAgICBXcmFwTW9kZSxcbiAgICBXcmFwcGVkSW5mb1xufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9