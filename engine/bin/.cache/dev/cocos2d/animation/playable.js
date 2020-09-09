
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/playable.js';
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
var js = cc.js;

var debug = require('../core/CCDebug');
/**
 * @class Playable
 *
 */


function Playable() {
  this._isPlaying = false;
  this._isPaused = false;
  this._stepOnce = false;
}

var prototype = Playable.prototype;
/**
 * !#en Is playing or paused in play mode?
 * !#zh 当前是否正在播放。
 * @property isPlaying
 * @type {boolean}
 * @default false
 * @readOnly
 */

js.get(prototype, 'isPlaying', function () {
  return this._isPlaying;
}, true);
/**
 * !#en Is currently paused? This can be true even if in edit mode(isPlaying == false).
 * !#zh 当前是否正在暂停
 * @property isPaused
 * @type {boolean}
 * @default false
 * @readOnly
 */

js.get(prototype, 'isPaused', function () {
  return this._isPaused;
}, true); // virtual

var virtual = function virtual() {};
/**
 * @method onPlay
 * @private
 */


prototype.onPlay = virtual;
/**
 * @method onPause
 * @private
 */

prototype.onPause = virtual;
/**
 * @method onResume
 * @private
 */

prototype.onResume = virtual;
/**
 * @method onStop
 * @private
 */

prototype.onStop = virtual;
/**
 * @method onError
 * @param {string} errorCode
 * @private
 */

prototype.onError = virtual; // public

/**
 * !#en Play this animation.
 * !#zh 播放动画。
 * @method play
 */

prototype.play = function () {
  if (this._isPlaying) {
    if (this._isPaused) {
      this._isPaused = false;
      this.onResume();
    } else {
      this.onError(debug.getError(3912));
    }
  } else {
    this._isPlaying = true;
    this.onPlay();
  }
};
/**
 * !#en Stop this animation.
 * !#zh 停止动画播放。
 * @method stop
 */


prototype.stop = function () {
  if (this._isPlaying) {
    this._isPlaying = false;
    this.onStop(); // need reset pause flag after onStop

    this._isPaused = false;
  }
};
/**
 * !#en Pause this animation.
 * !#zh 暂停动画。
 * @method pause
 */


prototype.pause = function () {
  if (this._isPlaying && !this._isPaused) {
    this._isPaused = true;
    this.onPause();
  }
};
/**
 * !#en Resume this animation.
 * !#zh 重新播放动画。
 * @method resume
 */


prototype.resume = function () {
  if (this._isPlaying && this._isPaused) {
    this._isPaused = false;
    this.onResume();
  }
};
/**
 * !#en Perform a single frame step.
 * !#zh 执行一帧动画。
 * @method step
 */


prototype.step = function () {
  this.pause();
  this._stepOnce = true;

  if (!this._isPlaying) {
    this.play();
  }
};

module.exports = Playable;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hbmltYXRpb24vcGxheWFibGUuanMiXSwibmFtZXMiOlsianMiLCJjYyIsImRlYnVnIiwicmVxdWlyZSIsIlBsYXlhYmxlIiwiX2lzUGxheWluZyIsIl9pc1BhdXNlZCIsIl9zdGVwT25jZSIsInByb3RvdHlwZSIsImdldCIsInZpcnR1YWwiLCJvblBsYXkiLCJvblBhdXNlIiwib25SZXN1bWUiLCJvblN0b3AiLCJvbkVycm9yIiwicGxheSIsImdldEVycm9yIiwic3RvcCIsInBhdXNlIiwicmVzdW1lIiwic3RlcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUNBLElBQU1FLEtBQUssR0FBR0MsT0FBTyxDQUFDLGlCQUFELENBQXJCO0FBRUE7Ozs7OztBQUlBLFNBQVNDLFFBQVQsR0FBcUI7QUFDakIsT0FBS0MsVUFBTCxHQUFrQixLQUFsQjtBQUNBLE9BQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7O0FBRUQsSUFBSUMsU0FBUyxHQUFHSixRQUFRLENBQUNJLFNBQXpCO0FBRUE7Ozs7Ozs7OztBQVFBUixFQUFFLENBQUNTLEdBQUgsQ0FBT0QsU0FBUCxFQUFrQixXQUFsQixFQUErQixZQUFZO0FBQ3ZDLFNBQU8sS0FBS0gsVUFBWjtBQUNILENBRkQsRUFFRyxJQUZIO0FBSUE7Ozs7Ozs7OztBQVFBTCxFQUFFLENBQUNTLEdBQUgsQ0FBT0QsU0FBUCxFQUFrQixVQUFsQixFQUE4QixZQUFZO0FBQ3RDLFNBQU8sS0FBS0YsU0FBWjtBQUNILENBRkQsRUFFRyxJQUZILEdBSUE7O0FBRUEsSUFBSUksT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWSxDQUFFLENBQTVCO0FBQ0E7Ozs7OztBQUlBRixTQUFTLENBQUNHLE1BQVYsR0FBbUJELE9BQW5CO0FBQ0E7Ozs7O0FBSUFGLFNBQVMsQ0FBQ0ksT0FBVixHQUFvQkYsT0FBcEI7QUFDQTs7Ozs7QUFJQUYsU0FBUyxDQUFDSyxRQUFWLEdBQXFCSCxPQUFyQjtBQUNBOzs7OztBQUlBRixTQUFTLENBQUNNLE1BQVYsR0FBbUJKLE9BQW5CO0FBQ0E7Ozs7OztBQUtBRixTQUFTLENBQUNPLE9BQVYsR0FBb0JMLE9BQXBCLEVBRUE7O0FBRUE7Ozs7OztBQUtBRixTQUFTLENBQUNRLElBQVYsR0FBaUIsWUFBWTtBQUN6QixNQUFJLEtBQUtYLFVBQVQsRUFBcUI7QUFDakIsUUFBSSxLQUFLQyxTQUFULEVBQW9CO0FBQ2hCLFdBQUtBLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxXQUFLTyxRQUFMO0FBQ0gsS0FIRCxNQUlLO0FBQ0QsV0FBS0UsT0FBTCxDQUFhYixLQUFLLENBQUNlLFFBQU4sQ0FBZSxJQUFmLENBQWI7QUFDSDtBQUNKLEdBUkQsTUFTSztBQUNELFNBQUtaLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLTSxNQUFMO0FBQ0g7QUFDSixDQWREO0FBZ0JBOzs7Ozs7O0FBS0FILFNBQVMsQ0FBQ1UsSUFBVixHQUFpQixZQUFZO0FBQ3pCLE1BQUksS0FBS2IsVUFBVCxFQUFxQjtBQUNqQixTQUFLQSxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBS1MsTUFBTCxHQUZpQixDQUlqQjs7QUFDQSxTQUFLUixTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7QUFDSixDQVJEO0FBVUE7Ozs7Ozs7QUFLQUUsU0FBUyxDQUFDVyxLQUFWLEdBQWtCLFlBQVk7QUFDMUIsTUFBSSxLQUFLZCxVQUFMLElBQW1CLENBQUMsS0FBS0MsU0FBN0IsRUFBd0M7QUFDcEMsU0FBS0EsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtNLE9BQUw7QUFDSDtBQUNKLENBTEQ7QUFPQTs7Ozs7OztBQUtBSixTQUFTLENBQUNZLE1BQVYsR0FBbUIsWUFBWTtBQUMzQixNQUFJLEtBQUtmLFVBQUwsSUFBbUIsS0FBS0MsU0FBNUIsRUFBdUM7QUFDbkMsU0FBS0EsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtPLFFBQUw7QUFDSDtBQUNKLENBTEQ7QUFPQTs7Ozs7OztBQUtBTCxTQUFTLENBQUNhLElBQVYsR0FBaUIsWUFBWTtBQUN6QixPQUFLRixLQUFMO0FBQ0EsT0FBS1osU0FBTCxHQUFpQixJQUFqQjs7QUFDQSxNQUFJLENBQUMsS0FBS0YsVUFBVixFQUFzQjtBQUNsQixTQUFLVyxJQUFMO0FBQ0g7QUFDSixDQU5EOztBQVFBTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJuQixRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IGNjLmpzO1xuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9jb3JlL0NDRGVidWcnKTtcblxuLyoqXG4gKiBAY2xhc3MgUGxheWFibGVcbiAqXG4gKi9cbmZ1bmN0aW9uIFBsYXlhYmxlICgpIHtcbiAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3N0ZXBPbmNlID0gZmFsc2U7XG59XG5cbnZhciBwcm90b3R5cGUgPSBQbGF5YWJsZS5wcm90b3R5cGU7XG5cbi8qKlxuICogISNlbiBJcyBwbGF5aW5nIG9yIHBhdXNlZCBpbiBwbGF5IG1vZGU/XG4gKiAhI3poIOW9k+WJjeaYr+WQpuato+WcqOaSreaUvuOAglxuICogQHByb3BlcnR5IGlzUGxheWluZ1xuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAZGVmYXVsdCBmYWxzZVxuICogQHJlYWRPbmx5XG4gKi9cbmpzLmdldChwcm90b3R5cGUsICdpc1BsYXlpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzUGxheWluZztcbn0sIHRydWUpO1xuXG4vKipcbiAqICEjZW4gSXMgY3VycmVudGx5IHBhdXNlZD8gVGhpcyBjYW4gYmUgdHJ1ZSBldmVuIGlmIGluIGVkaXQgbW9kZShpc1BsYXlpbmcgPT0gZmFsc2UpLlxuICogISN6aCDlvZPliY3mmK/lkKbmraPlnKjmmoLlgZxcbiAqIEBwcm9wZXJ0eSBpc1BhdXNlZFxuICogQHR5cGUge2Jvb2xlYW59XG4gKiBAZGVmYXVsdCBmYWxzZVxuICogQHJlYWRPbmx5XG4gKi9cbmpzLmdldChwcm90b3R5cGUsICdpc1BhdXNlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNQYXVzZWQ7XG59LCB0cnVlKTtcblxuLy8gdmlydHVhbFxuXG52YXIgdmlydHVhbCA9IGZ1bmN0aW9uICgpIHt9O1xuLyoqXG4gKiBAbWV0aG9kIG9uUGxheVxuICogQHByaXZhdGVcbiAqL1xucHJvdG90eXBlLm9uUGxheSA9IHZpcnR1YWw7XG4vKipcbiAqIEBtZXRob2Qgb25QYXVzZVxuICogQHByaXZhdGVcbiAqL1xucHJvdG90eXBlLm9uUGF1c2UgPSB2aXJ0dWFsO1xuLyoqXG4gKiBAbWV0aG9kIG9uUmVzdW1lXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90b3R5cGUub25SZXN1bWUgPSB2aXJ0dWFsO1xuLyoqXG4gKiBAbWV0aG9kIG9uU3RvcFxuICogQHByaXZhdGVcbiAqL1xucHJvdG90eXBlLm9uU3RvcCA9IHZpcnR1YWw7XG4vKipcbiAqIEBtZXRob2Qgb25FcnJvclxuICogQHBhcmFtIHtzdHJpbmd9IGVycm9yQ29kZVxuICogQHByaXZhdGVcbiAqL1xucHJvdG90eXBlLm9uRXJyb3IgPSB2aXJ0dWFsO1xuXG4vLyBwdWJsaWNcblxuLyoqXG4gKiAhI2VuIFBsYXkgdGhpcyBhbmltYXRpb24uXG4gKiAhI3poIOaSreaUvuWKqOeUu+OAglxuICogQG1ldGhvZCBwbGF5XG4gKi9cbnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vblJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKGRlYnVnLmdldEVycm9yKDM5MTIpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vblBsYXkoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqICEjZW4gU3RvcCB0aGlzIGFuaW1hdGlvbi5cbiAqICEjemgg5YGc5q2i5Yqo55S75pKt5pS+44CCXG4gKiBAbWV0aG9kIHN0b3BcbiAqL1xucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xuICAgICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vblN0b3AoKTtcblxuICAgICAgICAvLyBuZWVkIHJlc2V0IHBhdXNlIGZsYWcgYWZ0ZXIgb25TdG9wXG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuIFBhdXNlIHRoaXMgYW5pbWF0aW9uLlxuICogISN6aCDmmoLlgZzliqjnlLvjgIJcbiAqIEBtZXRob2QgcGF1c2VcbiAqL1xucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vblBhdXNlKCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuIFJlc3VtZSB0aGlzIGFuaW1hdGlvbi5cbiAqICEjemgg6YeN5paw5pKt5pS+5Yqo55S744CCXG4gKiBAbWV0aG9kIHJlc3VtZVxuICovXG5wcm90b3R5cGUucmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLl9pc1BsYXlpbmcgJiYgdGhpcy5faXNQYXVzZWQpIHtcbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vblJlc3VtZSgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogISNlbiBQZXJmb3JtIGEgc2luZ2xlIGZyYW1lIHN0ZXAuXG4gKiAhI3poIOaJp+ihjOS4gOW4p+WKqOeUu+OAglxuICogQG1ldGhvZCBzdGVwXG4gKi9cbnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLl9zdGVwT25jZSA9IHRydWU7XG4gICAgaWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5YWJsZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9