
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-state.js';
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

var Playable = require('./playable');

var Types = require('./types');

var WrappedInfo = Types.WrappedInfo;
var WrapMode = Types.WrapMode;
var WrapModeMask = Types.WrapModeMask;
/**
 * !#en
 * The AnimationState gives full control over animation playback process.
 * In most cases the Animation Component is sufficient and easier to use. Use the AnimationState if you need full control.
 * !#zh
 * AnimationState 完全控制动画播放过程。<br/>
 * 大多数情况下 动画组件 是足够和易于使用的。如果您需要更多的动画控制接口，请使用 AnimationState。
 * @class AnimationState
 * @extends Playable
 *
 */

/**
 * @method constructor
 * @param {AnimationClip} clip
 * @param {String} [name]
 */

function AnimationState(clip, name) {
  Playable.call(this); // Mark whether the current frame is played.
  // When set new time to animation state, we should ensure the frame at the specified time being played at next update.

  this._currentFramePlayed = false;
  this._delay = 0;
  this._delayTime = 0;
  this._wrappedInfo = new WrappedInfo();
  this._lastWrappedInfo = null;
  this._process = process;
  this._clip = clip;
  this._name = name || clip && clip.name;
  /**
   * @property animator
   * @type {AnimationAnimator}
   * @private
   */

  this.animator = null;
  /**
   * !#en The curves list.
   * !#zh 曲线列表。
   * @property curves
   * @type {Object[]}
   */

  this.curves = []; // http://www.w3.org/TR/web-animations/#idl-def-AnimationTiming

  /**
   * !#en The start delay which represents the number of seconds from an animation's start time to the start of
   * the active interval.
   * !#zh 延迟多少秒播放。
   *
   * @property delay
   * @type {Number}
   * @default 0
   */

  this.delay = 0;
  /**
   * !#en The animation's iteration count property.
   *
   * A real number greater than or equal to zero (including positive infinity) representing the number of times
   * to repeat the animation node.
   *
   * Values less than zero and NaN values are treated as the value 1.0 for the purpose of timing model
   * calculations.
   *
   * !#zh 迭代次数，指动画播放多少次后结束, normalize time。 如 2.5（2次半）
   *
   * @property repeatCount
   * @type {Number}
   * @default 1
   */

  this.repeatCount = 1;
  /**
   * !#en The iteration duration of this animation in seconds. (length)
   * !#zh 单次动画的持续时间，秒。
   *
   * @property duration
   * @type {Number}
   * @readOnly
   */

  this.duration = 1;
  /**
   * !#en The animation's playback speed. 1 is normal playback speed.
   * !#zh 播放速率。
   * @property speed
   * @type {Number}
   * @default: 1.0
   */

  this.speed = 1;
  /**
   * !#en
   * Wrapping mode of the playing animation.
   * Notice : dynamic change wrapMode will reset time and repeatCount property
   * !#zh
   * 动画循环方式。
   * 需要注意的是，动态修改 wrapMode 时，会重置 time 以及 repeatCount
   *
   * @property wrapMode
   * @type {WrapMode}
   * @default: WrapMode.Normal
   */

  this.wrapMode = WrapMode.Normal;
  /**
   * !#en The current time of this animation in seconds.
   * !#zh 动画当前的时间，秒。
   * @property time
   * @type {Number}
   * @default 0
   */

  this.time = 0; // Animation as event target

  this._target = null;
  this._lastframeEventOn = false;

  this.emit = function () {
    var args = new Array(arguments.length);

    for (var i = 0, l = args.length; i < l; i++) {
      args[i] = arguments[i];
    }

    cc.director.getAnimationManager().pushDelayEvent(this, '_emit', args);
  };
}

js.extend(AnimationState, Playable);
var proto = AnimationState.prototype;

proto._emit = function (type, state) {
  if (this._target && this._target.isValid) {
    this._target.emit(type, type, state);
  }
};

proto.on = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      this._lastframeEventOn = true;
    }

    return this._target.on(type, callback, target);
  } else {
    return null;
  }
};

proto.once = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      this._lastframeEventOn = true;
    }

    var self = this;
    return this._target.once(type, function (event) {
      callback.call(target, event);
      self._lastframeEventOn = false;
    });
  } else {
    return null;
  }
};

proto.off = function (type, callback, target) {
  if (this._target && this._target.isValid) {
    if (type === 'lastframe') {
      if (!this._target.hasEventListener(type)) {
        this._lastframeEventOn = false;
      }
    }

    this._target.off(type, callback, target);
  }
};

proto._setEventTarget = function (target) {
  this._target = target;
};

proto.onPlay = function () {
  // replay
  this.setTime(0);
  this._delayTime = this._delay;
  cc.director.getAnimationManager().addAnimation(this);

  if (this.animator) {
    this.animator.addAnimation(this);
  }

  this.emit('play', this);
};

proto.onStop = function () {
  if (!this.isPaused) {
    cc.director.getAnimationManager().removeAnimation(this);
  }

  if (this.animator) {
    this.animator.removeAnimation(this);
  }

  this.emit('stop', this);
};

proto.onResume = function () {
  cc.director.getAnimationManager().addAnimation(this);
  this.emit('resume', this);
};

proto.onPause = function () {
  cc.director.getAnimationManager().removeAnimation(this);
  this.emit('pause', this);
};

proto.setTime = function (time) {
  this._currentFramePlayed = false;
  this.time = time || 0;
  var curves = this.curves;

  for (var i = 0, l = curves.length; i < l; i++) {
    var curve = curves[i];

    if (curve.onTimeChangedManually) {
      curve.onTimeChangedManually(time, this);
    }
  }
};

function process() {
  // sample
  var info = this.sample();

  if (this._lastframeEventOn) {
    var lastInfo;

    if (!this._lastWrappedInfo) {
      lastInfo = this._lastWrappedInfo = new WrappedInfo(info);
    } else {
      lastInfo = this._lastWrappedInfo;
    }

    if (this.repeatCount > 1 && (info.iterations | 0) > (lastInfo.iterations | 0)) {
      this.emit('lastframe', this);
    }

    lastInfo.set(info);
  }

  if (info.stopped) {
    this.stop();
    this.emit('finished', this);
  }
}

function simpleProcess() {
  var time = this.time;
  var duration = this.duration;

  if (time > duration) {
    time = time % duration;
    if (time === 0) time = duration;
  } else if (time < 0) {
    time = time % duration;
    if (time !== 0) time += duration;
  }

  var ratio = time / duration;
  var curves = this.curves;

  for (var i = 0, len = curves.length; i < len; i++) {
    var curve = curves[i];
    curve.sample(time, ratio, this);
  }

  if (this._lastframeEventOn) {
    if (this._lastIterations === undefined) {
      this._lastIterations = ratio;
    }

    if (this.time > 0 && this._lastIterations > ratio || this.time < 0 && this._lastIterations < ratio) {
      this.emit('lastframe', this);
    }

    this._lastIterations = ratio;
  }
}

proto.update = function (delta) {
  // calculate delay time
  if (this._delayTime > 0) {
    this._delayTime -= delta;

    if (this._delayTime > 0) {
      // still waiting
      return;
    }
  } // make first frame perfect
  //var playPerfectFirstFrame = (this.time === 0);


  if (this._currentFramePlayed) {
    this.time += delta * this.speed;
  } else {
    this._currentFramePlayed = true;
  }

  this._process();
};

proto._needRevers = function (currentIterations) {
  var wrapMode = this.wrapMode;
  var needRevers = false;

  if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
    var isEnd = currentIterations - (currentIterations | 0) === 0;

    if (isEnd && currentIterations > 0) {
      currentIterations -= 1;
    }

    var isOddIteration = currentIterations & 1;

    if (isOddIteration) {
      needRevers = !needRevers;
    }
  }

  if ((wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse) {
    needRevers = !needRevers;
  }

  return needRevers;
};

proto.getWrappedInfo = function (time, info) {
  info = info || new WrappedInfo();
  var stopped = false;
  var duration = this.duration;
  var repeatCount = this.repeatCount;
  var currentIterations = time > 0 ? time / duration : -(time / duration);

  if (currentIterations >= repeatCount) {
    currentIterations = repeatCount;
    stopped = true;
    var tempRatio = repeatCount - (repeatCount | 0);

    if (tempRatio === 0) {
      tempRatio = 1; // 如果播放过，动画不复位
    }

    time = tempRatio * duration * (time > 0 ? 1 : -1);
  }

  if (time > duration) {
    var tempTime = time % duration;
    time = tempTime === 0 ? duration : tempTime;
  } else if (time < 0) {
    time = time % duration;
    if (time !== 0) time += duration;
  }

  var needRevers = false;
  var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;

  if (shouldWrap) {
    needRevers = this._needRevers(currentIterations);
  }

  var direction = needRevers ? -1 : 1;

  if (this.speed < 0) {
    direction *= -1;
  } // calculate wrapped time


  if (shouldWrap && needRevers) {
    time = duration - time;
  }

  info.ratio = time / duration;
  info.time = time;
  info.direction = direction;
  info.stopped = stopped;
  info.iterations = currentIterations;
  return info;
};

proto.sample = function () {
  var info = this.getWrappedInfo(this.time, this._wrappedInfo);
  var curves = this.curves;

  for (var i = 0, len = curves.length; i < len; i++) {
    var curve = curves[i];
    curve.sample(info.time, info.ratio, this);
  }

  return info;
};
/**
 * !#en The clip that is being played by this animation state.
 * !#zh 此动画状态正在播放的剪辑。
 * @property clip
 * @type {AnimationClip}
 * @final
 */


js.get(proto, 'clip', function () {
  return this._clip;
});
/**
 * !#en The name of the playing animation.
 * !#zh 动画的名字
 * @property name
 * @type {String}
 * @readOnly
 */

js.get(proto, 'name', function () {
  return this._name;
});
js.obsolete(proto, 'AnimationState.length', 'duration');
js.getset(proto, 'curveLoaded', function () {
  return this.curves.length > 0;
}, function () {
  this.curves.length = 0;
});
js.getset(proto, 'wrapMode', function () {
  return this._wrapMode;
}, function (value) {
  this._wrapMode = value;
  if (CC_EDITOR) return; // dynamic change wrapMode will need reset time to 0

  this.time = 0;

  if (value & WrapModeMask.Loop) {
    this.repeatCount = Infinity;
  } else {
    this.repeatCount = 1;
  }
});
js.getset(proto, 'repeatCount', function () {
  return this._repeatCount;
}, function (value) {
  this._repeatCount = value;
  var shouldWrap = this._wrapMode & WrapModeMask.ShouldWrap;
  var reverse = (this.wrapMode & WrapModeMask.Reverse) === WrapModeMask.Reverse;

  if (value === Infinity && !shouldWrap && !reverse) {
    this._process = simpleProcess;
  } else {
    this._process = process;
  }
});
js.getset(proto, 'delay', function () {
  return this._delay;
}, function (value) {
  this._delayTime = this._delay = value;
});
cc.AnimationState = module.exports = AnimationState;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hbmltYXRpb24vYW5pbWF0aW9uLXN0YXRlLmpzIl0sIm5hbWVzIjpbImpzIiwiY2MiLCJQbGF5YWJsZSIsInJlcXVpcmUiLCJUeXBlcyIsIldyYXBwZWRJbmZvIiwiV3JhcE1vZGUiLCJXcmFwTW9kZU1hc2siLCJBbmltYXRpb25TdGF0ZSIsImNsaXAiLCJuYW1lIiwiY2FsbCIsIl9jdXJyZW50RnJhbWVQbGF5ZWQiLCJfZGVsYXkiLCJfZGVsYXlUaW1lIiwiX3dyYXBwZWRJbmZvIiwiX2xhc3RXcmFwcGVkSW5mbyIsIl9wcm9jZXNzIiwicHJvY2VzcyIsIl9jbGlwIiwiX25hbWUiLCJhbmltYXRvciIsImN1cnZlcyIsImRlbGF5IiwicmVwZWF0Q291bnQiLCJkdXJhdGlvbiIsInNwZWVkIiwid3JhcE1vZGUiLCJOb3JtYWwiLCJ0aW1lIiwiX3RhcmdldCIsIl9sYXN0ZnJhbWVFdmVudE9uIiwiZW1pdCIsImFyZ3MiLCJBcnJheSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImkiLCJsIiwiZGlyZWN0b3IiLCJnZXRBbmltYXRpb25NYW5hZ2VyIiwicHVzaERlbGF5RXZlbnQiLCJleHRlbmQiLCJwcm90byIsInByb3RvdHlwZSIsIl9lbWl0IiwidHlwZSIsInN0YXRlIiwiaXNWYWxpZCIsIm9uIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwic2VsZiIsImV2ZW50Iiwib2ZmIiwiaGFzRXZlbnRMaXN0ZW5lciIsIl9zZXRFdmVudFRhcmdldCIsIm9uUGxheSIsInNldFRpbWUiLCJhZGRBbmltYXRpb24iLCJvblN0b3AiLCJpc1BhdXNlZCIsInJlbW92ZUFuaW1hdGlvbiIsIm9uUmVzdW1lIiwib25QYXVzZSIsImN1cnZlIiwib25UaW1lQ2hhbmdlZE1hbnVhbGx5IiwiaW5mbyIsInNhbXBsZSIsImxhc3RJbmZvIiwiaXRlcmF0aW9ucyIsInNldCIsInN0b3BwZWQiLCJzdG9wIiwic2ltcGxlUHJvY2VzcyIsInJhdGlvIiwibGVuIiwiX2xhc3RJdGVyYXRpb25zIiwidW5kZWZpbmVkIiwidXBkYXRlIiwiZGVsdGEiLCJfbmVlZFJldmVycyIsImN1cnJlbnRJdGVyYXRpb25zIiwibmVlZFJldmVycyIsIlBpbmdQb25nIiwiaXNFbmQiLCJpc09kZEl0ZXJhdGlvbiIsIlJldmVyc2UiLCJnZXRXcmFwcGVkSW5mbyIsInRlbXBSYXRpbyIsInRlbXBUaW1lIiwic2hvdWxkV3JhcCIsIl93cmFwTW9kZSIsIlNob3VsZFdyYXAiLCJkaXJlY3Rpb24iLCJnZXQiLCJvYnNvbGV0ZSIsImdldHNldCIsInZhbHVlIiwiQ0NfRURJVE9SIiwiTG9vcCIsIkluZmluaXR5IiwiX3JlcGVhdENvdW50IiwicmV2ZXJzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsRUFBRSxDQUFDRCxFQUFaOztBQUNBLElBQUlFLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBdEI7O0FBRUEsSUFBSUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFuQjs7QUFDQSxJQUFJRSxXQUFXLEdBQUdELEtBQUssQ0FBQ0MsV0FBeEI7QUFDQSxJQUFJQyxRQUFRLEdBQUdGLEtBQUssQ0FBQ0UsUUFBckI7QUFDQSxJQUFJQyxZQUFZLEdBQUdILEtBQUssQ0FBQ0csWUFBekI7QUFFQTs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7OztBQUtBLFNBQVNDLGNBQVQsQ0FBeUJDLElBQXpCLEVBQStCQyxJQUEvQixFQUFxQztBQUNqQ1IsRUFBQUEsUUFBUSxDQUFDUyxJQUFULENBQWMsSUFBZCxFQURpQyxDQUdqQztBQUNBOztBQUNBLE9BQUtDLG1CQUFMLEdBQTJCLEtBQTNCO0FBRUEsT0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS0MsWUFBTCxHQUFvQixJQUFJVixXQUFKLEVBQXBCO0FBQ0Es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LE1BR0s7QUFDRCxTQUFLOUUsV0FBTCxHQUFtQixDQUFuQjtBQUNIO0FBRUosQ0FuQkw7QUFzQkF4QixFQUFFLENBQUNrRyxNQUFILENBQVV2RCxLQUFWLEVBQWlCLGFBQWpCLEVBQ0ksWUFBWTtBQUNSLFNBQU8sS0FBSzRELFlBQVo7QUFDSCxDQUhMLEVBSUksVUFBVUosS0FBVixFQUFpQjtBQUNiLE9BQUtJLFlBQUwsR0FBb0JKLEtBQXBCO0FBRUEsTUFBSVAsVUFBVSxHQUFHLEtBQUtDLFNBQUwsR0FBaUJ0RixZQUFZLENBQUN1RixVQUEvQztBQUNBLE1BQUlVLE9BQU8sR0FBRyxDQUFDLEtBQUs3RSxRQUFMLEdBQWdCcEIsWUFBWSxDQUFDaUYsT0FBOUIsTUFBMkNqRixZQUFZLENBQUNpRixPQUF0RTs7QUFDQSxNQUFJVyxLQUFLLEtBQUtHLFFBQVYsSUFBc0IsQ0FBQ1YsVUFBdkIsSUFBcUMsQ0FBQ1ksT0FBMUMsRUFBbUQ7QUFDL0MsU0FBS3ZGLFFBQUwsR0FBZ0IwRCxhQUFoQjtBQUNILEdBRkQsTUFHSztBQUNELFNBQUsxRCxRQUFMLEdBQWdCQyxPQUFoQjtBQUNIO0FBQ0osQ0FmTDtBQWtCQWxCLEVBQUUsQ0FBQ2tHLE1BQUgsQ0FBVXZELEtBQVYsRUFBaUIsT0FBakIsRUFDSSxZQUFZO0FBQ1IsU0FBTyxLQUFLOUIsTUFBWjtBQUNILENBSEwsRUFJSSxVQUFVc0YsS0FBVixFQUFpQjtBQUNiLE9BQUtyRixVQUFMLEdBQWtCLEtBQUtELE1BQUwsR0FBY3NGLEtBQWhDO0FBQ0gsQ0FOTDtBQVVBbEcsRUFBRSxDQUFDTyxjQUFILEdBQW9CaUcsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEcsY0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbnZhciBqcyA9IGNjLmpzO1xudmFyIFBsYXlhYmxlID0gcmVxdWlyZSgnLi9wbGF5YWJsZScpO1xuXG52YXIgVHlwZXMgPSByZXF1aXJlKCcuL3R5cGVzJyk7XG52YXIgV3JhcHBlZEluZm8gPSBUeXBlcy5XcmFwcGVkSW5mbztcbnZhciBXcmFwTW9kZSA9IFR5cGVzLldyYXBNb2RlO1xudmFyIFdyYXBNb2RlTWFzayA9IFR5cGVzLldyYXBNb2RlTWFzaztcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgQW5pbWF0aW9uU3RhdGUgZ2l2ZXMgZnVsbCBjb250cm9sIG92ZXIgYW5pbWF0aW9uIHBsYXliYWNrIHByb2Nlc3MuXG4gKiBJbiBtb3N0IGNhc2VzIHRoZSBBbmltYXRpb24gQ29tcG9uZW50IGlzIHN1ZmZpY2llbnQgYW5kIGVhc2llciB0byB1c2UuIFVzZSB0aGUgQW5pbWF0aW9uU3RhdGUgaWYgeW91IG5lZWQgZnVsbCBjb250cm9sLlxuICogISN6aFxuICogQW5pbWF0aW9uU3RhdGUg5a6M5YWo5o6n5Yi25Yqo55S75pKt5pS+6L+H56iL44CCPGJyLz5cbiAqIOWkp+WkmuaVsOaDheWGteS4iyDliqjnlLvnu4Tku7Yg5piv6Laz5aSf5ZKM5piT5LqO5L2/55So55qE44CC5aaC5p6c5oKo6ZyA6KaB5pu05aSa55qE5Yqo55S75o6n5Yi25o6l5Y+j77yM6K+35L2/55SoIEFuaW1hdGlvblN0YXRl44CCXG4gKiBAY2xhc3MgQW5pbWF0aW9uU3RhdGVcbiAqIEBleHRlbmRzIFBsYXlhYmxlXG4gKlxuICovXG5cbi8qKlxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBbmltYXRpb25DbGlwfSBjbGlwXG4gKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gKi9cbmZ1bmN0aW9uIEFuaW1hdGlvblN0YXRlIChjbGlwLCBuYW1lKSB7XG4gICAgUGxheWFibGUuY2FsbCh0aGlzKTtcbiAgICBcbiAgICAvLyBNYXJrIHdoZXRoZXIgdGhlIGN1cnJlbnQgZnJhbWUgaXMgcGxheWVkLlxuICAgIC8vIFdoZW4gc2V0IG5ldyB0aW1lIHRvIGFuaW1hdGlvbiBzdGF0ZSwgd2Ugc2hvdWxkIGVuc3VyZSB0aGUgZnJhbWUgYXQgdGhlIHNwZWNpZmllZCB0aW1lIGJlaW5nIHBsYXllZCBhdCBuZXh0IHVwZGF0ZS5cbiAgICB0aGlzLl9jdXJyZW50RnJhbWVQbGF5ZWQgPSBmYWxzZTtcbiAgICBcbiAgICB0aGlzLl9kZWxheSA9IDA7XG4gICAgdGhpcy5fZGVsYXlUaW1lID0gMDtcblxuICAgIHRoaXMuX3dyYXBwZWRJbmZvID0gbmV3IFdyYXBwZWRJbmZvKCk7XG4gICAgdGhpcy5fbGFzdFdyYXBwZWRJbmZvID0gbnVsbDtcblxuICAgIHRoaXMuX3Byb2Nlc3MgPSBwcm9jZXNzO1xuXG4gICAgdGhpcy5fY2xpcCA9IGNsaXA7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWUgfHwgKGNsaXAgJiYgY2xpcC5uYW1lKTtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSBhbmltYXRvclxuICAgICAqIEB0eXBlIHtBbmltYXRpb25BbmltYXRvcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuYW5pbWF0b3IgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgY3VydmVzIGxpc3QuXG4gICAgICogISN6aCDmm7Lnur/liJfooajjgIJcbiAgICAgKiBAcHJvcGVydHkgY3VydmVzXG4gICAgICogQHR5cGUge09iamVjdFtdfVxuICAgICAqL1xuICAgIHRoaXMuY3VydmVzID0gW107XG5cbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi93ZWItYW5pbWF0aW9ucy8jaWRsLWRlZi1BbmltYXRpb25UaW1pbmdcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHN0YXJ0IGRlbGF5IHdoaWNoIHJlcHJlc2VudHMgdGhlIG51bWJlciBvZiBzZWNvbmRzIGZyb20gYW4gYW5pbWF0aW9uJ3Mgc3RhcnQgdGltZSB0byB0aGUgc3RhcnQgb2ZcbiAgICAgKiB0aGUgYWN0aXZlIGludGVydmFsLlxuICAgICAqICEjemgg5bu26L+f5aSa5bCR56eS5pKt5pS+44CCXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgZGVsYXlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICB0aGlzLmRlbGF5ID0gMDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGFuaW1hdGlvbidzIGl0ZXJhdGlvbiBjb3VudCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEEgcmVhbCBudW1iZXIgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHplcm8gKGluY2x1ZGluZyBwb3NpdGl2ZSBpbmZpbml0eSkgcmVwcmVzZW50aW5nIHRoZSBudW1iZXIgb2YgdGltZXNcbiAgICAgKiB0byByZXBlYXQgdGhlIGFuaW1hdGlvbiBub2RlLlxuICAgICAqXG4gICAgICogVmFsdWVzIGxlc3MgdGhhbiB6ZXJvIGFuZCBOYU4gdmFsdWVzIGFyZSB0cmVhdGVkIGFzIHRoZSB2YWx1ZSAxLjAgZm9yIHRoZSBwdXJwb3NlIG9mIHRpbWluZyBtb2RlbFxuICAgICAqIGNhbGN1bGF0aW9ucy5cbiAgICAgKlxuICAgICAqICEjemgg6L+t5Luj5qyh5pWw77yM5oyH5Yqo55S75pKt5pS+5aSa5bCR5qyh5ZCO57uT5p2fLCBub3JtYWxpemUgdGltZeOAgiDlpoIgMi4177yIMuasoeWNiu+8iVxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHJlcGVhdENvdW50XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAZGVmYXVsdCAxXG4gICAgICovXG4gICAgdGhpcy5yZXBlYXRDb3VudCA9IDE7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBpdGVyYXRpb24gZHVyYXRpb24gb2YgdGhpcyBhbmltYXRpb24gaW4gc2Vjb25kcy4gKGxlbmd0aClcbiAgICAgKiAhI3poIOWNleasoeWKqOeUu+eahOaMgee7reaXtumXtO+8jOenkuOAglxuICAgICAqXG4gICAgICogQHByb3BlcnR5IGR1cmF0aW9uXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZE9ubHlcbiAgICAgKi9cbiAgICB0aGlzLmR1cmF0aW9uID0gMTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGFuaW1hdGlvbidzIHBsYXliYWNrIHNwZWVkLiAxIGlzIG5vcm1hbCBwbGF5YmFjayBzcGVlZC5cbiAgICAgKiAhI3poIOaSreaUvumAn+eOh+OAglxuICAgICAqIEBwcm9wZXJ0eSBzcGVlZFxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlZmF1bHQ6IDEuMFxuICAgICAqL1xuICAgIHRoaXMuc3BlZWQgPSAxO1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFdyYXBwaW5nIG1vZGUgb2YgdGhlIHBsYXlpbmcgYW5pbWF0aW9uLlxuICAgICAqIE5vdGljZSA6IGR5bmFtaWMgY2hhbmdlIHdyYXBNb2RlIHdpbGwgcmVzZXQgdGltZSBhbmQgcmVwZWF0Q291bnQgcHJvcGVydHlcbiAgICAgKiAhI3poXG4gICAgICog5Yqo55S75b6q546v5pa55byP44CCXG4gICAgICog6ZyA6KaB5rOo5oSP55qE5piv77yM5Yqo5oCB5L+u5pS5IHdyYXBNb2RlIOaXtu+8jOS8mumHjee9riB0aW1lIOS7peWPiiByZXBlYXRDb3VudFxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHdyYXBNb2RlXG4gICAgICogQHR5cGUge1dyYXBNb2RlfVxuICAgICAqIEBkZWZhdWx0OiBXcmFwTW9kZS5Ob3JtYWxcbiAgICAgKi9cbiAgICB0aGlzLndyYXBNb2RlID0gV3JhcE1vZGUuTm9ybWFsO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgY3VycmVudCB0aW1lIG9mIHRoaXMgYW5pbWF0aW9uIGluIHNlY29uZHMuXG4gICAgICogISN6aCDliqjnlLvlvZPliY3nmoTml7bpl7TvvIznp5LjgIJcbiAgICAgKiBAcHJvcGVydHkgdGltZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHRoaXMudGltZSA9IDA7XG5cbiAgICAvLyBBbmltYXRpb24gYXMgZXZlbnQgdGFyZ2V0XG4gICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcbiAgICB0aGlzLl9sYXN0ZnJhbWVFdmVudE9uID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBbmltYXRpb25NYW5hZ2VyKCkucHVzaERlbGF5RXZlbnQodGhpcywgJ19lbWl0JywgYXJncyk7XG4gICAgfTtcbn1cbmpzLmV4dGVuZChBbmltYXRpb25TdGF0ZSwgUGxheWFibGUpO1xuXG52YXIgcHJvdG8gPSBBbmltYXRpb25TdGF0ZS5wcm90b3R5cGU7XG5cbnByb3RvLl9lbWl0ID0gZnVuY3Rpb24gKHR5cGUsIHN0YXRlKSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuaXNWYWxpZCkge1xuICAgICAgICB0aGlzLl90YXJnZXQuZW1pdCh0eXBlLCB0eXBlLCBzdGF0ZSk7XG4gICAgfVxufTtcblxucHJvdG8ub24gPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgIGlmICh0aGlzLl90YXJnZXQgJiYgdGhpcy5fdGFyZ2V0LmlzVmFsaWQpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsYXN0ZnJhbWUnKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0ZnJhbWVFdmVudE9uID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0Lm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcblxucHJvdG8ub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuX3RhcmdldCAmJiB0aGlzLl90YXJnZXQuaXNWYWxpZCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2xhc3RmcmFtZScpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RmcmFtZUV2ZW50T24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldC5vbmNlKHR5cGUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgIHNlbGYuX2xhc3RmcmFtZUV2ZW50T24gPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG5wcm90by5vZmYgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgIGlmICh0aGlzLl90YXJnZXQgJiYgdGhpcy5fdGFyZ2V0LmlzVmFsaWQpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdsYXN0ZnJhbWUnKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RhcmdldC5oYXNFdmVudExpc3RlbmVyKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdGZyYW1lRXZlbnRPbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RhcmdldC5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgfVxufTtcblxucHJvdG8uX3NldEV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbn07XG5cbnByb3RvLm9uUGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyByZXBsYXlcbiAgICB0aGlzLnNldFRpbWUoMCk7XG4gICAgdGhpcy5fZGVsYXlUaW1lID0gdGhpcy5fZGVsYXk7XG4gICAgXG4gICAgY2MuZGlyZWN0b3IuZ2V0QW5pbWF0aW9uTWFuYWdlcigpLmFkZEFuaW1hdGlvbih0aGlzKTtcblxuICAgIGlmICh0aGlzLmFuaW1hdG9yKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0b3IuYWRkQW5pbWF0aW9uKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmVtaXQoJ3BsYXknLCB0aGlzKTtcbn07XG5cbnByb3RvLm9uU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuaXNQYXVzZWQpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QW5pbWF0aW9uTWFuYWdlcigpLnJlbW92ZUFuaW1hdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hbmltYXRvcikge1xuICAgICAgICB0aGlzLmFuaW1hdG9yLnJlbW92ZUFuaW1hdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLmVtaXQoJ3N0b3AnLCB0aGlzKTtcbn07XG5cbnByb3RvLm9uUmVzdW1lID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLmRpcmVjdG9yLmdldEFuaW1hdGlvbk1hbmFnZXIoKS5hZGRBbmltYXRpb24odGhpcyk7XG4gICAgdGhpcy5lbWl0KCdyZXN1bWUnLCB0aGlzKTtcbn07XG5cbnByb3RvLm9uUGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2MuZGlyZWN0b3IuZ2V0QW5pbWF0aW9uTWFuYWdlcigpLnJlbW92ZUFuaW1hdGlvbih0aGlzKTtcbiAgICB0aGlzLmVtaXQoJ3BhdXNlJywgdGhpcyk7XG59O1xuXG5wcm90by5zZXRUaW1lID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICB0aGlzLl9jdXJyZW50RnJhbWVQbGF5ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRpbWUgPSB0aW1lIHx8IDA7XG5cbiAgICB2YXIgY3VydmVzID0gdGhpcy5jdXJ2ZXM7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjdXJ2ZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBjdXJ2ZSA9IGN1cnZlc1tpXTtcbiAgICAgICAgaWYgKGN1cnZlLm9uVGltZUNoYW5nZWRNYW51YWxseSkge1xuICAgICAgICAgICAgY3VydmUub25UaW1lQ2hhbmdlZE1hbnVhbGx5KHRpbWUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gcHJvY2VzcyAoKSB7XG4gICAgLy8gc2FtcGxlXG4gICAgdmFyIGluZm8gPSB0aGlzLnNhbXBsZSgpO1xuXG4gICAgaWYgKHRoaXMuX2xhc3RmcmFtZUV2ZW50T24pIHtcbiAgICAgICAgdmFyIGxhc3RJbmZvO1xuICAgICAgICBpZiAoIXRoaXMuX2xhc3RXcmFwcGVkSW5mbykge1xuICAgICAgICAgICAgbGFzdEluZm8gPSB0aGlzLl9sYXN0V3JhcHBlZEluZm8gPSBuZXcgV3JhcHBlZEluZm8oaW5mbyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0SW5mbyA9IHRoaXMuX2xhc3RXcmFwcGVkSW5mbztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlcGVhdENvdW50ID4gMSAmJiAoKGluZm8uaXRlcmF0aW9ucyB8IDApID4gKGxhc3RJbmZvLml0ZXJhdGlvbnMgfCAwKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnbGFzdGZyYW1lJywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsYXN0SW5mby5zZXQoaW5mbyk7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uc3RvcHBlZCkge1xuICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdmaW5pc2hlZCcsIHRoaXMpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2ltcGxlUHJvY2VzcyAoKSB7XG4gICAgdmFyIHRpbWUgPSB0aGlzLnRpbWU7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbjtcblxuICAgIGlmICh0aW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgdGltZSA9IHRpbWUgJSBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRpbWUgPT09IDApIHRpbWUgPSBkdXJhdGlvbjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGltZSA8IDApIHtcbiAgICAgICAgdGltZSA9IHRpbWUgJSBkdXJhdGlvbjtcbiAgICAgICAgaWYgKHRpbWUgIT09IDApIHRpbWUgKz0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgdmFyIHJhdGlvID0gdGltZSAvIGR1cmF0aW9uO1xuXG4gICAgdmFyIGN1cnZlcyA9IHRoaXMuY3VydmVzO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjdXJ2ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGN1cnZlID0gY3VydmVzW2ldO1xuICAgICAgICBjdXJ2ZS5zYW1wbGUodGltZSwgcmF0aW8sIHRoaXMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXN0ZnJhbWVFdmVudE9uKSB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0SXRlcmF0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0SXRlcmF0aW9ucyA9IHJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCh0aGlzLnRpbWUgPiAwICYmIHRoaXMuX2xhc3RJdGVyYXRpb25zID4gcmF0aW8pIHx8ICh0aGlzLnRpbWUgPCAwICYmIHRoaXMuX2xhc3RJdGVyYXRpb25zIDwgcmF0aW8pKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2xhc3RmcmFtZScsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEl0ZXJhdGlvbnMgPSByYXRpbztcbiAgICB9XG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xuICAgIC8vIGNhbGN1bGF0ZSBkZWxheSB0aW1lXG5cbiAgICBpZiAodGhpcy5fZGVsYXlUaW1lID4gMCkge1xuICAgICAgICB0aGlzLl9kZWxheVRpbWUgLT0gZGVsdGE7XG4gICAgICAgIGlmICh0aGlzLl9kZWxheVRpbWUgPiAwKSB7XG4gICAgICAgICAgICAvLyBzdGlsbCB3YWl0aW5nXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYWtlIGZpcnN0IGZyYW1lIHBlcmZlY3RcblxuICAgIC8vdmFyIHBsYXlQZXJmZWN0Rmlyc3RGcmFtZSA9ICh0aGlzLnRpbWUgPT09IDApO1xuICAgIGlmICh0aGlzLl9jdXJyZW50RnJhbWVQbGF5ZWQpIHtcbiAgICAgICAgdGhpcy50aW1lICs9IChkZWx0YSAqIHRoaXMuc3BlZWQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEZyYW1lUGxheWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9jZXNzKCk7XG59O1xuXG5wcm90by5fbmVlZFJldmVycyA9IGZ1bmN0aW9uIChjdXJyZW50SXRlcmF0aW9ucykge1xuICAgIHZhciB3cmFwTW9kZSA9IHRoaXMud3JhcE1vZGU7XG4gICAgdmFyIG5lZWRSZXZlcnMgPSBmYWxzZTtcblxuICAgIGlmICgod3JhcE1vZGUgJiBXcmFwTW9kZU1hc2suUGluZ1BvbmcpID09PSBXcmFwTW9kZU1hc2suUGluZ1BvbmcpIHtcbiAgICAgICAgdmFyIGlzRW5kID0gY3VycmVudEl0ZXJhdGlvbnMgLSAoY3VycmVudEl0ZXJhdGlvbnMgfCAwKSA9PT0gMDtcbiAgICAgICAgaWYgKGlzRW5kICYmIChjdXJyZW50SXRlcmF0aW9ucyA+IDApKSB7XG4gICAgICAgICAgICBjdXJyZW50SXRlcmF0aW9ucyAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlzT2RkSXRlcmF0aW9uID0gY3VycmVudEl0ZXJhdGlvbnMgJiAxO1xuICAgICAgICBpZiAoaXNPZGRJdGVyYXRpb24pIHtcbiAgICAgICAgICAgIG5lZWRSZXZlcnMgPSAhbmVlZFJldmVycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoKHdyYXBNb2RlICYgV3JhcE1vZGVNYXNrLlJldmVyc2UpID09PSBXcmFwTW9kZU1hc2suUmV2ZXJzZSkge1xuICAgICAgICBuZWVkUmV2ZXJzID0gIW5lZWRSZXZlcnM7XG4gICAgfVxuICAgIHJldHVybiBuZWVkUmV2ZXJzO1xufTtcblxucHJvdG8uZ2V0V3JhcHBlZEluZm8gPSBmdW5jdGlvbiAodGltZSwgaW5mbykge1xuICAgIGluZm8gPSBpbmZvIHx8IG5ldyBXcmFwcGVkSW5mbygpO1xuICAgIFxuICAgIHZhciBzdG9wcGVkID0gZmFsc2U7XG4gICAgdmFyIGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbjtcbiAgICB2YXIgcmVwZWF0Q291bnQgPSB0aGlzLnJlcGVhdENvdW50O1xuXG4gICAgdmFyIGN1cnJlbnRJdGVyYXRpb25zID0gdGltZSA+IDAgPyAodGltZSAvIGR1cmF0aW9uKSA6IC0odGltZSAvIGR1cmF0aW9uKTtcbiAgICBpZiAoY3VycmVudEl0ZXJhdGlvbnMgPj0gcmVwZWF0Q291bnQpIHtcbiAgICAgICAgY3VycmVudEl0ZXJhdGlvbnMgPSByZXBlYXRDb3VudDtcblxuICAgICAgICBzdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRlbXBSYXRpbyA9IHJlcGVhdENvdW50IC0gKHJlcGVhdENvdW50IHwgMCk7XG4gICAgICAgIGlmICh0ZW1wUmF0aW8gPT09IDApIHtcbiAgICAgICAgICAgIHRlbXBSYXRpbyA9IDE7ICAvLyDlpoLmnpzmkq3mlL7ov4fvvIzliqjnlLvkuI3lpI3kvY1cbiAgICAgICAgfVxuICAgICAgICB0aW1lID0gdGVtcFJhdGlvICogZHVyYXRpb24gKiAodGltZSA+IDAgPyAxIDogLTEpO1xuICAgIH1cblxuICAgIGlmICh0aW1lID4gZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHRlbXBUaW1lID0gdGltZSAlIGR1cmF0aW9uO1xuICAgICAgICB0aW1lID0gdGVtcFRpbWUgPT09IDAgPyBkdXJhdGlvbiA6IHRlbXBUaW1lO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aW1lIDwgMCkge1xuICAgICAgICB0aW1lID0gdGltZSAlIGR1cmF0aW9uO1xuICAgICAgICBpZiAodGltZSAhPT0gMCApIHRpbWUgKz0gZHVyYXRpb247XG4gICAgfVxuXG4gICAgdmFyIG5lZWRSZXZlcnMgPSBmYWxzZTtcbiAgICB2YXIgc2hvdWxkV3JhcCA9IHRoaXMuX3dyYXBNb2RlICYgV3JhcE1vZGVNYXNrLlNob3VsZFdyYXA7XG4gICAgaWYgKHNob3VsZFdyYXApIHtcbiAgICAgICAgbmVlZFJldmVycyA9IHRoaXMuX25lZWRSZXZlcnMoY3VycmVudEl0ZXJhdGlvbnMpO1xuICAgIH1cblxuICAgIHZhciBkaXJlY3Rpb24gPSBuZWVkUmV2ZXJzID8gLTEgOiAxO1xuICAgIGlmICh0aGlzLnNwZWVkIDwgMCkge1xuICAgICAgICBkaXJlY3Rpb24gKj0gLTE7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHdyYXBwZWQgdGltZVxuICAgIGlmIChzaG91bGRXcmFwICYmIG5lZWRSZXZlcnMpIHtcbiAgICAgICAgdGltZSA9IGR1cmF0aW9uIC0gdGltZTtcbiAgICB9XG5cbiAgICBpbmZvLnJhdGlvID0gdGltZSAvIGR1cmF0aW9uO1xuICAgIGluZm8udGltZSA9IHRpbWU7XG4gICAgaW5mby5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgaW5mby5zdG9wcGVkID0gc3RvcHBlZDtcbiAgICBpbmZvLml0ZXJhdGlvbnMgPSBjdXJyZW50SXRlcmF0aW9ucztcblxuICAgIHJldHVybiBpbmZvO1xufTtcblxucHJvdG8uc2FtcGxlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbmZvID0gdGhpcy5nZXRXcmFwcGVkSW5mbyh0aGlzLnRpbWUsIHRoaXMuX3dyYXBwZWRJbmZvKTtcbiAgICB2YXIgY3VydmVzID0gdGhpcy5jdXJ2ZXM7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGN1cnZlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY3VydmUgPSBjdXJ2ZXNbaV07XG4gICAgICAgIGN1cnZlLnNhbXBsZShpbmZvLnRpbWUsIGluZm8ucmF0aW8sIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmZvO1xufTtcblxuXG4vKipcbiAqICEjZW4gVGhlIGNsaXAgdGhhdCBpcyBiZWluZyBwbGF5ZWQgYnkgdGhpcyBhbmltYXRpb24gc3RhdGUuXG4gKiAhI3poIOatpOWKqOeUu+eKtuaAgeato+WcqOaSreaUvueahOWJqui+keOAglxuICogQHByb3BlcnR5IGNsaXBcbiAqIEB0eXBlIHtBbmltYXRpb25DbGlwfVxuICogQGZpbmFsXG4gKi9cbmpzLmdldChwcm90bywgJ2NsaXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NsaXA7XG59KTtcblxuLyoqXG4gKiAhI2VuIFRoZSBuYW1lIG9mIHRoZSBwbGF5aW5nIGFuaW1hdGlvbi5cbiAqICEjemgg5Yqo55S755qE5ZCN5a2XXG4gKiBAcHJvcGVydHkgbmFtZVxuICogQHR5cGUge1N0cmluZ31cbiAqIEByZWFkT25seVxuICovXG5qcy5nZXQocHJvdG8sICduYW1lJywgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xufSk7XG5cbmpzLm9ic29sZXRlKHByb3RvLCAnQW5pbWF0aW9uU3RhdGUubGVuZ3RoJywgJ2R1cmF0aW9uJyk7XG5cbmpzLmdldHNldChwcm90bywgJ2N1cnZlTG9hZGVkJyxcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnZlcy5sZW5ndGggPiAwO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmN1cnZlcy5sZW5ndGggPSAwO1xuICAgIH1cbik7XG5cblxuanMuZ2V0c2V0KHByb3RvLCAnd3JhcE1vZGUnLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dyYXBNb2RlO1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3dyYXBNb2RlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuO1xuXG4gICAgICAgIC8vIGR5bmFtaWMgY2hhbmdlIHdyYXBNb2RlIHdpbGwgbmVlZCByZXNldCB0aW1lIHRvIDBcbiAgICAgICAgdGhpcy50aW1lID0gMDtcblxuICAgICAgICBpZiAodmFsdWUgJiBXcmFwTW9kZU1hc2suTG9vcCkge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXBlYXRDb3VudCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuKTtcblxuanMuZ2V0c2V0KHByb3RvLCAncmVwZWF0Q291bnQnLFxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlcGVhdENvdW50O1xuICAgIH0sXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3JlcGVhdENvdW50ID0gdmFsdWU7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2hvdWxkV3JhcCA9IHRoaXMuX3dyYXBNb2RlICYgV3JhcE1vZGVNYXNrLlNob3VsZFdyYXA7XG4gICAgICAgIHZhciByZXZlcnNlID0gKHRoaXMud3JhcE1vZGUgJiBXcmFwTW9kZU1hc2suUmV2ZXJzZSkgPT09IFdyYXBNb2RlTWFzay5SZXZlcnNlO1xuICAgICAgICBpZiAodmFsdWUgPT09IEluZmluaXR5ICYmICFzaG91bGRXcmFwICYmICFyZXZlcnNlKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm9jZXNzID0gc2ltcGxlUHJvY2VzcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MgPSBwcm9jZXNzO1xuICAgICAgICB9XG4gICAgfVxuKTtcblxuanMuZ2V0c2V0KHByb3RvLCAnZGVsYXknLCBcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWxheTtcbiAgICB9LFxuICAgIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kZWxheVRpbWUgPSB0aGlzLl9kZWxheSA9IHZhbHVlO1xuICAgIH1cbik7XG5cblxuY2MuQW5pbWF0aW9uU3RhdGUgPSBtb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvblN0YXRlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=