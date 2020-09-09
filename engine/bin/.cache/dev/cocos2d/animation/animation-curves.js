
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-curves.js';
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
var bezierByTime = require('./bezier').bezierByTime;

var binarySearch = require('../core/utils/binary-search').binarySearchEpsilon;

var WrapModeMask = require('./types').WrapModeMask;

var WrappedInfo = require('./types').WrappedInfo;
/**
 * Compute a new ratio by curve type
 * @param {Number} ratio - The origin ratio
 * @param {Array|String} type - If it's Array, then ratio will be computed with bezierByTime. If it's string, then ratio will be computed with cc.easing function
 */


function computeRatioByType(ratio, type) {
  if (typeof type === 'string') {
    var func = cc.easing[type];

    if (func) {
      ratio = func(ratio);
    } else {
      cc.errorID(3906, type);
    }
  } else if (Array.isArray(type)) {
    // bezier curve
    ratio = bezierByTime(type, ratio);
  }

  return ratio;
} //
// 动画数据类，相当于 AnimationClip。
// 虽然叫做 AnimCurve，但除了曲线，可以保存任何类型的值。
//
// @class AnimCurve
//
//


var AnimCurve = cc.Class({
  name: 'cc.AnimCurve',
  //
  // @method sample
  // @param {number} time
  // @param {number} ratio - The normalized time specified as a number between 0.0 and 1.0 inclusive.
  // @param {AnimationState} state
  //
  sample: function sample(time, ratio, state) {},
  onTimeChangedManually: undefined
});
/**
 * 当每两帧之前的间隔都一样的时候可以使用此函数快速查找 index
 */

function quickFindIndex(ratios, ratio) {
  var length = ratios.length - 1;
  if (length === 0) return 0;
  var start = ratios[0];
  if (ratio < start) return 0;
  var end = ratios[length];
  if (ratio > end) return ~ratios.length;
  ratio = (ratio - start) / (end - start);
  var eachLength = 1 / length;
  var index = ratio / eachLength;
  var floorIndex = index | 0;
  var EPSILON = 1e-6;

  if (index - floorIndex < EPSILON) {
    return floorIndex;
  } else if (floorIndex + 1 - index < EPSILON) {
    return floorIndex + 1;
  }

  return ~(floorIndex + 1);
} //
//
// @class DynamicAnimCurve
//
// @extends AnimCurve
//


var DynamicAnimCurve = cc.Class({
  name: 'cc.DynamicAnimCurve',
  "extends": AnimCurve,
  ctor: function ctor() {
    // cache last frame index
    this._cachedIndex = 0;
  },
  properties: {
    // The object being animated.
    // @property target
    // @type {object}
    target: null,
    // The name of the property being animated.
    // @property prop
    // @type {string}
    prop: '',
    // The values of the keyframes. (y)
    // @property values
    // @type {any[]}
    values: [],
    // The keyframe ratio of the keyframe specified as a number between 0.0 and 1.0 inclusive. (x)
    // @property ratios
    // @type {number[]}
    ratios: [],
    // @property types
    // @param {object[]}
    // Each array item maybe type:
    // - [x, x, x, x]: Four control points for bezier
    // - null: linear
    types: []
  },
  _findFrameIndex: binarySearch,
  _lerp: undefined,
  _lerpNumber: function _lerpNumber(from, to, t) {
    return from + (to - from) * t;
  },
  _lerpObject: function _lerpObject(from, to, t) {
    return from.lerp(to, t);
  },
  _lerpQuat: function () {
    var out = cc.quat();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  _lerpVector2: function () {
    var out = cc.v2();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  _lerpVector3: function () {
    var out = cc.v3();
    return function (from, to, t) {
      return from.lerp(to, t, out);
    };
  }(),
  sample: function sample(time, ratio, state) {
    var values = this.values;
    var ratios = this.ratios;
    var frameCount = ratios.length;

    if (frameCount === 0) {
      return;
    } // only need to refind frame index when ratio is out of range of last from ratio and to ratio.


    var shoudRefind = true;
    var cachedIndex = this._cachedIndex;

    if (cachedIndex < 0) {
      cachedIndex = ~cachedIndex;

      if (cachedIndex > 0 && cachedIndex < ratios.length) {
        var _fromRatio = ratios[cachedIndex - 1];
        var _toRatio = ratios[cachedIndex];

        if (ratio > _fromRatio && ratio < _toRatio) {
          shoudRefind = false;
        }
      }
    }

    if (shoudRefind) {
      this._cachedIndex = this._findFrameIndex(ratios, ratio);
    } // evaluate value


    var value;
    var index = this._cachedIndex;

    if (index < 0) {
      index = ~index;

      if (index <= 0) {
        value = values[0];
      } else if (index >= frameCount) {
        value = values[frameCount - 1];
      } else {
        var fromVal = values[index - 1];

        if (!this._lerp) {
          value = fromVal;
        } else {
          var fromRatio = ratios[index - 1];
          var toRatio = ratios[index];
          var type = this.types[index - 1];
          var ratioBetweenFrames = (ratio - fromRatio) / (toRatio - fromRatio);

          if (type) {
            ratioBetweenFrames = computeRatioByType(ratioBetweenFrames, type);
          } // calculate value


          var toVal = values[index];
          value = this._lerp(fromVal, toVal, ratioBetweenFrames);
        }
      }
    } else {
      value = values[index];
    }

    this.target[this.prop] = value;
  }
});
DynamicAnimCurve.Linear = null;

DynamicAnimCurve.Bezier = function (controlPoints) {
  return controlPoints;
};
/**
 * Event information,
 * @class EventInfo
 *
 */


var EventInfo = function EventInfo() {
  this.events = [];
};
/**
 * @param {Function} [func] event function
 * @param {Object[]} [params] event params
 */


EventInfo.prototype.add = function (func, params) {
  this.events.push({
    func: func || '',
    params: params || []
  });
};
/**
 *
 * @class EventAnimCurve
 *
 * @extends AnimCurve
 */


var EventAnimCurve = cc.Class({
  name: 'cc.EventAnimCurve',
  "extends": AnimCurve,
  properties: {
    /**
     * The object being animated.
     * @property target
     * @type {object}
     */
    target: null,

    /** The keyframe ratio of the keyframe specified as a number between 0.0 and 1.0 inclusive. (x)
     * @property ratios
     * @type {number[]}
     */
    ratios: [],

    /**
     * @property events
     * @type {EventInfo[]}
     */
    events: [],
    _wrappedInfo: {
      "default": function _default() {
        return new WrappedInfo();
      }
    },
    _lastWrappedInfo: null,
    _ignoreIndex: NaN
  },
  _wrapIterations: function _wrapIterations(iterations) {
    if (iterations - (iterations | 0) === 0) iterations -= 1;
    return iterations | 0;
  },
  sample: function sample(time, ratio, state) {
    var length = this.ratios.length;
    var currentWrappedInfo = state.getWrappedInfo(state.time, this._wrappedInfo);
    var direction = currentWrappedInfo.direction;
    var currentIndex = binarySearch(this.ratios, currentWrappedInfo.ratio);

    if (currentIndex < 0) {
      currentIndex = ~currentIndex - 1; // if direction is inverse, then increase index

      if (direction < 0) currentIndex += 1;
    }

    if (this._ignoreIndex !== currentIndex) {
      this._ignoreIndex = NaN;
    }

    currentWrappedInfo.frameIndex = currentIndex;

    if (!this._lastWrappedInfo) {
      this._fireEvent(currentIndex);

      this._lastWrappedInfo = new WrappedInfo(currentWrappedInfo);
      return;
    }

    var wrapMode = state.wrapMode;

    var currentIterations = this._wrapIterations(currentWrappedInfo.iterations);

    var lastWrappedInfo = this._lastWrappedInfo;

    var lastIterations = this._wrapIterations(lastWrappedInfo.iterations);

    var lastIndex = lastWrappedInfo.frameIndex;
    var lastDirection = lastWrappedInfo.direction;
    var interationsChanged = lastIterations !== -1 && currentIterations !== lastIterations;

    if (lastIndex === currentIndex && interationsChanged && length === 1) {
      this._fireEvent(0);
    } else if (lastIndex !== currentIndex || interationsChanged) {
      direction = lastDirection;

      do {
        if (lastIndex !== currentIndex) {
          if (direction === -1 && lastIndex === 0 && currentIndex > 0) {
            if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = length;
            }

            lastIterations++;
          } else if (direction === 1 && lastIndex === length - 1 && currentIndex < length - 1) {
            if ((wrapMode & WrapModeMask.PingPong) === WrapModeMask.PingPong) {
              direction *= -1;
            } else {
              lastIndex = -1;
            }

            lastIterations++;
          }

          if (lastIndex === currentIndex) break;
          if (lastIterations > currentIterations) break;
        }

        lastIndex += direction;
        cc.director.getAnimationManager().pushDelayEvent(this, '_fireEvent', [lastIndex]);
      } while (lastIndex !== currentIndex && lastIndex > -1 && lastIndex < length);
    }

    this._lastWrappedInfo.set(currentWrappedInfo);
  },
  _fireEvent: function _fireEvent(index) {
    if (index < 0 || index >= this.events.length || this._ignoreIndex === index) return;
    var eventInfo = this.events[index];
    var events = eventInfo.events;

    if (!this.target.isValid) {
      return;
    }

    var components = this.target._components;

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var funcName = event.func;

      for (var j = 0; j < components.length; j++) {
        var component = components[j];
        var func = component[funcName];
        if (func) func.apply(component, event.params);
      }
    }
  },
  onTimeChangedManually: function onTimeChangedManually(time, state) {
    this._lastWrappedInfo = null;
    this._ignoreIndex = NaN;
    var info = state.getWrappedInfo(time, this._wrappedInfo);
    var direction = info.direction;
    var frameIndex = binarySearch(this.ratios, info.ratio); // only ignore when time not on a frame index

    if (frameIndex < 0) {
      frameIndex = ~frameIndex - 1; // if direction is inverse, then increase index

      if (direction < 0) frameIndex += 1;
      this._ignoreIndex = frameIndex;
    }
  }
});

if (CC_TEST) {
  cc._Test.DynamicAnimCurve = DynamicAnimCurve;
  cc._Test.EventAnimCurve = EventAnimCurve;
  cc._Test.quickFindIndex = quickFindIndex;
}

module.exports = {
  AnimCurve: AnimCurve,
  DynamicAnimCurve: DynamicAnimCurve,
  EventAnimCurve: EventAnimCurve,
  EventInfo: EventInfo,
  computeRatioByType: computeRatioByType,
  quickFindIndex: quickFindIndex
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hbmltYXRpb24vYW5pbWF0aW9uLWN1cnZlcy5qcyJdLCJuYW1lcyI6WyJiZXppZXJCeVRpbWUiLCJyZXF1aXJlIiwiYmluYXJ5U2VhcmNoIiwiYmluYXJ5U2VhcmNoRXBzaWxvbiIsIldyYXBNb2RlTWFzayIsIldyYXBwZWRJbmZvIiwiY29tcHV0ZVJhdGlvQnlUeXBlIiwicmF0aW8iLCJ0eXBlIiwiZnVuYyIsImNjIiwiZWFzaW5nIiwiZXJyb3JJRCIsIkFycmF5IiwiaXNBcnJheSIsIkFuaW1DdXJ2ZSIsIkNsYXNzIiwibmFtZSIsInNhbXBsZSIsInRpbWUiLCJzdGF0ZSIsIm9uVGltZUNoYW5nZWRNYW51YWxseSIsInVuZGVmaW5lZCIsInF1aWNrRmluZEluZGV4IiwicmF0aW9zIiwibGVuZ3RoIiwic3RhcnQiLCJlbmQiLCJlYWNoTGVuZ3RoIiwiaW5kZXgiLCJmbG9vckluZGV4IiwiRVBTSUxPTiIsIkR5bmFtaWNBbmltQ3VydmUiLCJjdG9yIiwiX2NhY2hlZEluZGV4IiwicHJvcGVydGllcyIsInRhcmdldCIsInByb3AiLCJ2YWx1ZXMiLCJ0eXBlcyIsIl9maW5kRnJhbWVJbmRleCIsIl9sZXJwIiwiX2xlcnBOdW1iZXIiLCJmcm9tIiwidG8iLCJ0IiwiX2xlcnBPYmplY3QiLCJsZXJwIiwiX2xlcnBRdWF0Iiwib3V0IiwicXVhdCIsIl9sZXJwVmVjdG9yMiIsInYyIiwiX2xlcnBWZWN0b3IzIiwidjMiLCJmcmFtZUNvdW50Iiwic2hvdWRSZWZpbmQiLCJjYWNoZWRJbmRleCIsImZyb21SYXRpbyIsInRvUmF0aW8iLCJ2YWx1ZSIsImZyb21WYWwiLCJyYXRpb0JldHdlZW5GcmFtZXMiLCJ0b1ZhbCIsIkxpbmVhciIsIkJlemllciIsImNvbnRyb2xQb2ludHMiLCJFdmVudEluZm8iLCJldmVudHMiLCJwcm90b3R5cGUiLCJhZGQiLCJwYXJhbXMiLCJwdXNoIiwiRXZlbnRBbmltQ3VydmUiLCJfd3JhcHBlZEluZm8iLCJfbGFzdFdyYXBwZWRJbmZvIiwiX2lnbm9yZUluZGV4IiwiTmFOIiwiX3dyYXBJdGVyYXRpb25zIiwiaXRlcmF0aW9ucyIsImN1cnJlbnRXcmFwcGVkSW5mbyIsImdldFdyYXBwZWRJbmZvIiwiZGlyZWN0aW9uIiwiY3VycmVudEluZGV4IiwiZnJhbWVJbmRleCIsIl9maXJlRXZlbnQiLCJ3cmFwTW9kZSIsImN1cnJlbnRJdGVyYXRpb25zIiwibGFzdFdyYXBwZWRJbmZvIiwibGFzdEl0ZXJhdGlvbnMiLCJsYXN0SW5kZXgiLCJsYXN0RGlyZWN0aW9uIiwiaW50ZXJhdGlvbnNDaGFuZ2VkIiwiUGluZ1BvbmciLCJkaXJlY3RvciIsImdldEFuaW1hdGlvbk1hbmFnZXIiLCJwdXNoRGVsYXlFdmVudCIsInNldCIsImV2ZW50SW5mbyIsImlzVmFsaWQiLCJjb21wb25lbnRzIiwiX2NvbXBvbmVudHMiLCJpIiwiZXZlbnQiLCJmdW5jTmFtZSIsImoiLCJjb21wb25lbnQiLCJhcHBseSIsImluZm8iLCJDQ19URVNUIiwiX1Rlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxZQUFZLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQVAsQ0FBb0JELFlBQXpDOztBQUVBLElBQU1FLFlBQVksR0FBR0QsT0FBTyxDQUFDLDZCQUFELENBQVAsQ0FBdUNFLG1CQUE1RDs7QUFDQSxJQUFNQyxZQUFZLEdBQUdILE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUJHLFlBQXhDOztBQUNBLElBQU1DLFdBQVcsR0FBR0osT0FBTyxDQUFDLFNBQUQsQ0FBUCxDQUFtQkksV0FBdkM7QUFFQTs7Ozs7OztBQUtBLFNBQVNDLGtCQUFULENBQTZCQyxLQUE3QixFQUFvQ0MsSUFBcEMsRUFBMEM7QUFDdEMsTUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLFFBQUlDLElBQUksR0FBR0MsRUFBRSxDQUFDQyxN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QUFBLFVBQVUsR0FBRyxDQUFDQSxVQUFELEdBQWMsQ0FBM0IsQ0FEZ0IsQ0FHaEI7O0FBQ0EsVUFBSUYsU0FBUyxHQUFHLENBQWhCLEVBQW1CRSxVQUFVLElBQUksQ0FBZDtBQUVuQixXQUFLUixZQUFMLEdBQW9CUSxVQUFwQjtBQUNIO0FBQ0o7QUEvSnlCLENBQVQsQ0FBckI7O0FBbUtBLElBQUl5QixPQUFKLEVBQWE7QUFDVG5HLEVBQUFBLEVBQUUsQ0FBQ29HLEtBQUgsQ0FBUzlFLGdCQUFULEdBQTRCQSxnQkFBNUI7QUFDQXRCLEVBQUFBLEVBQUUsQ0FBQ29HLEtBQUgsQ0FBU3JDLGNBQVQsR0FBMEJBLGNBQTFCO0FBQ0EvRCxFQUFBQSxFQUFFLENBQUNvRyxLQUFILENBQVN2RixjQUFULEdBQTBCQSxjQUExQjtBQUNIOztBQUVEd0YsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JqRyxFQUFBQSxTQUFTLEVBQUVBLFNBREU7QUFFYmlCLEVBQUFBLGdCQUFnQixFQUFFQSxnQkFGTDtBQUdieUMsRUFBQUEsY0FBYyxFQUFFQSxjQUhIO0FBSWJOLEVBQUFBLFNBQVMsRUFBRUEsU0FKRTtBQUtiN0QsRUFBQUEsa0JBQWtCLEVBQUVBLGtCQUxQO0FBTWJpQixFQUFBQSxjQUFjLEVBQUVBO0FBTkgsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cbmNvbnN0IGJlemllckJ5VGltZSA9IHJlcXVpcmUoJy4vYmV6aWVyJykuYmV6aWVyQnlUaW1lO1xuXG5jb25zdCBiaW5hcnlTZWFyY2ggPSByZXF1aXJlKCcuLi9jb3JlL3V0aWxzL2JpbmFyeS1zZWFyY2gnKS5iaW5hcnlTZWFyY2hFcHNpbG9uO1xuY29uc3QgV3JhcE1vZGVNYXNrID0gcmVxdWlyZSgnLi90eXBlcycpLldyYXBNb2RlTWFzaztcbmNvbnN0IFdyYXBwZWRJbmZvID0gcmVxdWlyZSgnLi90eXBlcycpLldyYXBwZWRJbmZvO1xuXG4vKipcbiAqIENvbXB1dGUgYSBuZXcgcmF0aW8gYnkgY3VydmUgdHlwZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhdGlvIC0gVGhlIG9yaWdpbiByYXRpb1xuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IHR5cGUgLSBJZiBpdCdzIEFycmF5LCB0aGVuIHJhdGlvIHdpbGwgYmUgY29tcHV0ZWQgd2l0aCBiZXppZXJCeVRpbWUuIElmIGl0J3Mgc3RyaW5nLCB0aGVuIHJhdGlvIHdpbGwgYmUgY29tcHV0ZWQgd2l0aCBjYy5lYXNpbmcgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVJhdGlvQnlUeXBlIChyYXRpbywgdHlwZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBjYy5lYXNpbmdbdHlwZV07XG4gICAgICAgIGlmIChmdW5jKSB7XG4gICAgICAgICAgICByYXRpbyA9IGZ1bmMocmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzOTA2LCB0eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICAgIC8vIGJlemllciBjdXJ2ZVxuICAgICAgICByYXRpbyA9IGJlemllckJ5VGltZSh0eXBlLCByYXRpbyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhdGlvO1xufVxuXG4vL1xuLy8g5Yqo55S75pWw5o2u57G777yM55u45b2T5LqOIEFuaW1hdGlvbkNsaXDjgIJcbi8vIOiZveeEtuWPq+WBmiBBbmltQ3VydmXvvIzkvYbpmaTkuobmm7Lnur/vvIzlj6/ku6Xkv53lrZjku7vkvZXnsbvlnovnmoTlgLzjgIJcbi8vXG4vLyBAY2xhc3MgQW5pbUN1cnZlXG4vL1xuLy9cbnZhciBBbmltQ3VydmUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkFuaW1DdXJ2ZScsXG5cbiAgICAvL1xuICAgIC8vIEBtZXRob2Qgc2FtcGxlXG4gICAgLy8gQHBhcmFtIHtudW1iZXJ9IHRpbWVcbiAgICAvLyBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSBUaGUgbm9ybWFsaXplZCB0aW1lIHNwZWNpZmllZCBhcyBhIG51bWJlciBiZXR3ZWVuIDAuMCBhbmQgMS4wIGluY2x1c2l2ZS5cbiAgICAvLyBAcGFyYW0ge0FuaW1hdGlvblN0YXRlfSBzdGF0ZVxuICAgIC8vXG4gICAgc2FtcGxlOiBmdW5jdGlvbiAodGltZSwgcmF0aW8sIHN0YXRlKSB7fSxcblxuICAgIG9uVGltZUNoYW5nZWRNYW51YWxseTogdW5kZWZpbmVkXG59KTtcblxuLyoqXG4gKiDlvZPmr4/kuKTluKfkuYvliY3nmoTpl7TpmpTpg73kuIDmoLfnmoTml7blgJnlj6/ku6Xkvb/nlKjmraTlh73mlbDlv6vpgJ/mn6Xmib4gaW5kZXhcbiAqL1xuZnVuY3Rpb24gcXVpY2tGaW5kSW5kZXggKHJhdGlvcywgcmF0aW8pIHtcbiAgICB2YXIgbGVuZ3RoID0gcmF0aW9zLmxlbmd0aCAtIDE7XG5cbiAgICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gMDtcblxuICAgIHZhciBzdGFydCA9IHJhdGlvc1swXTtcbiAgICBpZiAocmF0aW8gPCBzdGFydCkgcmV0dXJuIDA7XG5cbiAgICB2YXIgZW5kID0gcmF0aW9zW2xlbmd0aF07XG4gICAgaWYgKHJhdGlvID4gZW5kKSByZXR1cm4gfnJhdGlvcy5sZW5ndGg7XG5cbiAgICByYXRpbyA9IChyYXRpbyAtIHN0YXJ0KSAvIChlbmQgLSBzdGFydCk7XG5cbiAgICB2YXIgZWFjaExlbmd0aCA9IDEgLyBsZW5ndGg7XG4gICAgdmFyIGluZGV4ID0gcmF0aW8gLyBlYWNoTGVuZ3RoO1xuICAgIHZhciBmbG9vckluZGV4ID0gaW5kZXggfCAwO1xuICAgIHZhciBFUFNJTE9OID0gMWUtNjtcblxuICAgIGlmICgoaW5kZXggLSBmbG9vckluZGV4KSA8IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIGZsb29ySW5kZXg7XG4gICAgfVxuICAgIGVsc2UgaWYgKChmbG9vckluZGV4ICsgMSAtIGluZGV4KSA8IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIGZsb29ySW5kZXggKyAxO1xuICAgIH1cblxuICAgIHJldHVybiB+KGZsb29ySW5kZXggKyAxKTtcbn1cblxuLy9cbi8vXG4vLyBAY2xhc3MgRHluYW1pY0FuaW1DdXJ2ZVxuLy9cbi8vIEBleHRlbmRzIEFuaW1DdXJ2ZVxuLy9cbnZhciBEeW5hbWljQW5pbUN1cnZlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5EeW5hbWljQW5pbUN1cnZlJyxcbiAgICBleHRlbmRzOiBBbmltQ3VydmUsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgLy8gY2FjaGUgbGFzdCBmcmFtZSBpbmRleFxuICAgICAgICB0aGlzLl9jYWNoZWRJbmRleCA9IDA7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICAvLyBUaGUgb2JqZWN0IGJlaW5nIGFuaW1hdGVkLlxuICAgICAgICAvLyBAcHJvcGVydHkgdGFyZ2V0XG4gICAgICAgIC8vIEB0eXBlIHtvYmplY3R9XG4gICAgICAgIHRhcmdldDogbnVsbCxcblxuICAgICAgICAvLyBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgYmVpbmcgYW5pbWF0ZWQuXG4gICAgICAgIC8vIEBwcm9wZXJ0eSBwcm9wXG4gICAgICAgIC8vIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgIHByb3A6ICcnLFxuXG4gICAgICAgIC8vIFRoZSB2YWx1ZXMgb2YgdGhlIGtleWZyYW1lcy4gKHkpXG4gICAgICAgIC8vIEBwcm9wZXJ0eSB2YWx1ZXNcbiAgICAgICAgLy8gQHR5cGUge2FueVtdfVxuICAgICAgICB2YWx1ZXM6IFtdLFxuXG4gICAgICAgIC8vIFRoZSBrZXlmcmFtZSByYXRpbyBvZiB0aGUga2V5ZnJhbWUgc3BlY2lmaWVkIGFzIGEgbnVtYmVyIGJldHdlZW4gMC4wIGFuZCAxLjAgaW5jbHVzaXZlLiAoeClcbiAgICAgICAgLy8gQHByb3BlcnR5IHJhdGlvc1xuICAgICAgICAvLyBAdHlwZSB7bnVtYmVyW119XG4gICAgICAgIHJhdGlvczogW10sXG5cbiAgICAgICAgLy8gQHByb3BlcnR5IHR5cGVzXG4gICAgICAgIC8vIEBwYXJhbSB7b2JqZWN0W119XG4gICAgICAgIC8vIEVhY2ggYXJyYXkgaXRlbSBtYXliZSB0eXBlOlxuICAgICAgICAvLyAtIFt4LCB4LCB4LCB4XTogRm91ciBjb250cm9sIHBvaW50cyBmb3IgYmV6aWVyXG4gICAgICAgIC8vIC0gbnVsbDogbGluZWFyXG4gICAgICAgIHR5cGVzOiBbXSxcbiAgICB9LFxuXG4gICAgX2ZpbmRGcmFtZUluZGV4OiBiaW5hcnlTZWFyY2gsXG4gICAgX2xlcnA6IHVuZGVmaW5lZCxcblxuICAgIF9sZXJwTnVtYmVyIChmcm9tLCB0bywgdCkge1xuICAgICAgICByZXR1cm4gZnJvbSArICh0byAtIGZyb20pICogdDtcbiAgICB9LFxuXG4gICAgX2xlcnBPYmplY3QgKGZyb20sIHRvLCB0KSB7XG4gICAgICAgIHJldHVybiBmcm9tLmxlcnAodG8sIHQpO1xuICAgIH0sXG5cbiAgICBfbGVycFF1YXQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBvdXQgPSBjYy5xdWF0KCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLmxlcnAodG8sIHQsIG91dCk7XG4gICAgICAgIH07XG4gICAgfSkoKSxcblxuICAgIF9sZXJwVmVjdG9yMjogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG91dCA9IGNjLnYyKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLmxlcnAodG8sIHQsIG91dCk7XG4gICAgICAgIH07XG4gICAgfSkoKSxcblxuICAgIF9sZXJwVmVjdG9yMzogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IG91dCA9IGNjLnYzKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZnJvbSwgdG8sIHQpIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tLmxlcnAodG8sIHQsIG91dCk7XG4gICAgICAgIH07XG4gICAgfSkoKSxcblxuICAgIHNhbXBsZSAodGltZSwgcmF0aW8sIHN0YXRlKSB7XG4gICAgICAgIGxldCB2YWx1ZXMgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgbGV0IHJhdGlvcyA9IHRoaXMucmF0aW9zO1xuICAgICAgICBsZXQgZnJhbWVDb3VudCA9IHJhdGlvcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGZyYW1lQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgbmVlZCB0byByZWZpbmQgZnJhbWUgaW5kZXggd2hlbiByYXRpbyBpcyBvdXQgb2YgcmFuZ2Ugb2YgbGFzdCBmcm9tIHJhdGlvIGFuZCB0byByYXRpby5cbiAgICAgICAgbGV0IHNob3VkUmVmaW5kID0gdHJ1ZTtcbiAgICAgICAgbGV0IGNhY2hlZEluZGV4ID0gdGhpcy5fY2FjaGVkSW5kZXg7XG4gICAgICAgIGlmIChjYWNoZWRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIGNhY2hlZEluZGV4ID0gfmNhY2hlZEluZGV4O1xuICAgICAgICAgICAgaWYgKGNhY2hlZEluZGV4ID4gMCAmJiBjYWNoZWRJbmRleCA8IHJhdGlvcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbVJhdGlvID0gcmF0aW9zW2NhY2hlZEluZGV4IC0gMV07XG4gICAgICAgICAgICAgICAgbGV0IHRvUmF0aW8gPSByYXRpb3NbY2FjaGVkSW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChyYXRpbyA+IGZyb21SYXRpbyAmJiByYXRpbyA8IHRvUmF0aW8pIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdWRSZWZpbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2hvdWRSZWZpbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZEluZGV4ID0gdGhpcy5fZmluZEZyYW1lSW5kZXgocmF0aW9zLCByYXRpbyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBldmFsdWF0ZSB2YWx1ZVxuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuX2NhY2hlZEluZGV4O1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgICBpbmRleCA9IH5pbmRleDtcblxuICAgICAgICAgICAgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID49IGZyYW1lQ291bnQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlc1tmcmFtZUNvdW50IC0gMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbVZhbCA9IHZhbHVlc1tpbmRleCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9sZXJwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZnJvbVZhbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmcm9tUmF0aW8gPSByYXRpb3NbaW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvUmF0aW8gPSByYXRpb3NbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHRoaXMudHlwZXNbaW5kZXggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGlvQmV0d2VlbkZyYW1lcyA9IChyYXRpbyAtIGZyb21SYXRpbykgLyAodG9SYXRpbyAtIGZyb21SYXRpbyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhdGlvQmV0d2VlbkZyYW1lcyA9IGNvbXB1dGVSYXRpb0J5VHlwZShyYXRpb0JldHdlZW5GcmFtZXMsIHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b1ZhbCA9IHZhbHVlc1tpbmRleF07XG5cbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9sZXJwKGZyb21WYWwsIHRvVmFsLCByYXRpb0JldHdlZW5GcmFtZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzW2luZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0W3RoaXMucHJvcF0gPSB2YWx1ZTtcbiAgICB9XG59KTtcblxuRHluYW1pY0FuaW1DdXJ2ZS5MaW5lYXIgPSBudWxsO1xuRHluYW1pY0FuaW1DdXJ2ZS5CZXppZXIgPSBmdW5jdGlvbiAoY29udHJvbFBvaW50cykge1xuICAgIHJldHVybiBjb250cm9sUG9pbnRzO1xufTtcblxuXG4vKipcbiAqIEV2ZW50IGluZm9ybWF0aW9uLFxuICogQGNsYXNzIEV2ZW50SW5mb1xuICpcbiAqL1xudmFyIEV2ZW50SW5mbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmV2ZW50cyA9IFtdO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZnVuY10gZXZlbnQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0W119IFtwYXJhbXNdIGV2ZW50IHBhcmFtc1xuICovXG5FdmVudEluZm8ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChmdW5jLCBwYXJhbXMpIHtcbiAgICB0aGlzLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgZnVuYzogZnVuYyB8fCAnJyxcbiAgICAgICAgcGFyYW1zOiBwYXJhbXMgfHwgW11cbiAgICB9KTtcbn07XG5cblxuLyoqXG4gKlxuICogQGNsYXNzIEV2ZW50QW5pbUN1cnZlXG4gKlxuICogQGV4dGVuZHMgQW5pbUN1cnZlXG4gKi9cbnZhciBFdmVudEFuaW1DdXJ2ZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuRXZlbnRBbmltQ3VydmUnLFxuICAgIGV4dGVuZHM6IEFuaW1DdXJ2ZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvYmplY3QgYmVpbmcgYW5pbWF0ZWQuXG4gICAgICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgICAgICogQHR5cGUge29iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgIHRhcmdldDogbnVsbCxcblxuICAgICAgICAvKiogVGhlIGtleWZyYW1lIHJhdGlvIG9mIHRoZSBrZXlmcmFtZSBzcGVjaWZpZWQgYXMgYSBudW1iZXIgYmV0d2VlbiAwLjAgYW5kIDEuMCBpbmNsdXNpdmUuICh4KVxuICAgICAgICAgKiBAcHJvcGVydHkgcmF0aW9zXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJbXX1cbiAgICAgICAgICovXG4gICAgICAgIHJhdGlvczogW10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBldmVudHNcbiAgICAgICAgICogQHR5cGUge0V2ZW50SW5mb1tdfVxuICAgICAgICAgKi9cbiAgICAgICAgZXZlbnRzOiBbXSxcblxuICAgICAgICBfd3JhcHBlZEluZm86IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdyYXBwZWRJbmZvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2xhc3RXcmFwcGVkSW5mbzogbnVsbCxcblxuICAgICAgICBfaWdub3JlSW5kZXg6IE5hTlxuICAgIH0sXG5cbiAgICBfd3JhcEl0ZXJhdGlvbnM6IGZ1bmN0aW9uIChpdGVyYXRpb25zKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zIC0gKGl0ZXJhdGlvbnMgfCAwKSA9PT0gMCkgaXRlcmF0aW9ucyAtPSAxO1xuICAgICAgICByZXR1cm4gaXRlcmF0aW9ucyB8IDA7XG4gICAgfSxcblxuICAgIHNhbXBsZTogZnVuY3Rpb24gKHRpbWUsIHJhdGlvLCBzdGF0ZSkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5yYXRpb3MubGVuZ3RoO1xuXG4gICAgICAgIHZhciBjdXJyZW50V3JhcHBlZEluZm8gPSBzdGF0ZS5nZXRXcmFwcGVkSW5mbyhzdGF0ZS50aW1lLCB0aGlzLl93cmFwcGVkSW5mbyk7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBjdXJyZW50V3JhcHBlZEluZm8uZGlyZWN0aW9uO1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gYmluYXJ5U2VhcmNoKHRoaXMucmF0aW9zLCBjdXJyZW50V3JhcHBlZEluZm8ucmF0aW8pO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4IDwgMCkge1xuICAgICAgICAgICAgY3VycmVudEluZGV4ID0gfmN1cnJlbnRJbmRleCAtIDE7XG5cbiAgICAgICAgICAgIC8vIGlmIGRpcmVjdGlvbiBpcyBpbnZlcnNlLCB0aGVuIGluY3JlYXNlIGluZGV4XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkgY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faWdub3JlSW5kZXggIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5faWdub3JlSW5kZXggPSBOYU47XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50V3JhcHBlZEluZm8uZnJhbWVJbmRleCA9IGN1cnJlbnRJbmRleDtcblxuICAgICAgICBpZiAoIXRoaXMuX2xhc3RXcmFwcGVkSW5mbykge1xuICAgICAgICAgICAgdGhpcy5fZmlyZUV2ZW50KGN1cnJlbnRJbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0V3JhcHBlZEluZm8gPSBuZXcgV3JhcHBlZEluZm8oY3VycmVudFdyYXBwZWRJbmZvKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB3cmFwTW9kZSA9IHN0YXRlLndyYXBNb2RlO1xuICAgICAgICB2YXIgY3VycmVudEl0ZXJhdGlvbnMgPSB0aGlzLl93cmFwSXRlcmF0aW9ucyhjdXJyZW50V3JhcHBlZEluZm8uaXRlcmF0aW9ucyk7XG5cbiAgICAgICAgdmFyIGxhc3RXcmFwcGVkSW5mbyA9IHRoaXMuX2xhc3RXcmFwcGVkSW5mbztcbiAgICAgICAgdmFyIGxhc3RJdGVyYXRpb25zID0gdGhpcy5fd3JhcEl0ZXJhdGlvbnMobGFzdFdyYXBwZWRJbmZvLml0ZXJhdGlvbnMpO1xuICAgICAgICB2YXIgbGFzdEluZGV4ID0gbGFzdFdyYXBwZWRJbmZvLmZyYW1lSW5kZXg7XG4gICAgICAgIHZhciBsYXN0RGlyZWN0aW9uID0gbGFzdFdyYXBwZWRJbmZvLmRpcmVjdGlvbjtcblxuICAgICAgICB2YXIgaW50ZXJhdGlvbnNDaGFuZ2VkID0gbGFzdEl0ZXJhdGlvbnMgIT09IC0xICYmIGN1cnJlbnRJdGVyYXRpb25zICE9PSBsYXN0SXRlcmF0aW9ucztcblxuICAgICAgICBpZiAobGFzdEluZGV4ID09PSBjdXJyZW50SW5kZXggJiYgaW50ZXJhdGlvbnNDaGFuZ2VkICYmIGxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fZmlyZUV2ZW50KDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGxhc3RJbmRleCAhPT0gY3VycmVudEluZGV4IHx8IGludGVyYXRpb25zQ2hhbmdlZCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gbGFzdERpcmVjdGlvbjtcblxuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIGlmIChsYXN0SW5kZXggIT09IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAtMSAmJiBsYXN0SW5kZXggPT09IDAgJiYgY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh3cmFwTW9kZSAmIFdyYXBNb2RlTWFzay5QaW5nUG9uZykgPT09IFdyYXBNb2RlTWFzay5QaW5nUG9uZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiAqPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RJbmRleCA9IGxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEl0ZXJhdGlvbnMgKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAxICYmIGxhc3RJbmRleCA9PT0gbGVuZ3RoIC0gMSAmJiBjdXJyZW50SW5kZXggPCBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHdyYXBNb2RlICYgV3JhcE1vZGVNYXNrLlBpbmdQb25nKSA9PT0gV3JhcE1vZGVNYXNrLlBpbmdQb25nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uICo9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RJdGVyYXRpb25zICsrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RJbmRleCA9PT0gY3VycmVudEluZGV4KSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RJdGVyYXRpb25zID4gY3VycmVudEl0ZXJhdGlvbnMpIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxhc3RJbmRleCArPSBkaXJlY3Rpb247XG5cbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBbmltYXRpb25NYW5hZ2VyKCkucHVzaERlbGF5RXZlbnQodGhpcywgJ19maXJlRXZlbnQnLCBbbGFzdEluZGV4XSk7XG4gICAgICAgICAgICB9IHdoaWxlIChsYXN0SW5kZXggIT09IGN1cnJlbnRJbmRleCAmJiBsYXN0SW5kZXggPiAtMSAmJiBsYXN0SW5kZXggPCBsZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFdyYXBwZWRJbmZvLnNldChjdXJyZW50V3JhcHBlZEluZm8pO1xuICAgIH0sXG5cbiAgICBfZmlyZUV2ZW50OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmV2ZW50cy5sZW5ndGggfHwgdGhpcy5faWdub3JlSW5kZXggPT09IGluZGV4KSByZXR1cm47XG5cbiAgICAgICAgdmFyIGV2ZW50SW5mbyA9IHRoaXMuZXZlbnRzW2luZGV4XTtcbiAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50SW5mby5ldmVudHM7XG4gICAgICAgIFxuICAgICAgICBpZiAoICF0aGlzLnRhcmdldC5pc1ZhbGlkICkgeyBcbiAgICAgICAgICAgIHJldHVybjsgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBjb21wb25lbnRzID0gdGhpcy50YXJnZXQuX2NvbXBvbmVudHM7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7ICBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICB2YXIgZnVuY05hbWUgPSBldmVudC5mdW5jO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbXBvbmVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1tqXTtcbiAgICAgICAgICAgICAgICB2YXIgZnVuYyA9IGNvbXBvbmVudFtmdW5jTmFtZV07XG5cbiAgICAgICAgICAgICAgICBpZiAoZnVuYykgZnVuYy5hcHBseShjb21wb25lbnQsIGV2ZW50LnBhcmFtcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25UaW1lQ2hhbmdlZE1hbnVhbGx5OiBmdW5jdGlvbiAodGltZSwgc3RhdGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdFdyYXBwZWRJbmZvID0gbnVsbDtcbiAgICAgICAgdGhpcy5faWdub3JlSW5kZXggPSBOYU47XG5cbiAgICAgICAgdmFyIGluZm8gPSBzdGF0ZS5nZXRXcmFwcGVkSW5mbyh0aW1lLCB0aGlzLl93cmFwcGVkSW5mbyk7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBpbmZvLmRpcmVjdGlvbjtcbiAgICAgICAgdmFyIGZyYW1lSW5kZXggPSBiaW5hcnlTZWFyY2godGhpcy5yYXRpb3MsIGluZm8ucmF0aW8pO1xuXG4gICAgICAgIC8vIG9ubHkgaWdub3JlIHdoZW4gdGltZSBub3Qgb24gYSBmcmFtZSBpbmRleFxuICAgICAgICBpZiAoZnJhbWVJbmRleCA8IDApIHtcbiAgICAgICAgICAgIGZyYW1lSW5kZXggPSB+ZnJhbWVJbmRleCAtIDE7XG5cbiAgICAgICAgICAgIC8vIGlmIGRpcmVjdGlvbiBpcyBpbnZlcnNlLCB0aGVuIGluY3JlYXNlIGluZGV4XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uIDwgMCkgZnJhbWVJbmRleCArPSAxO1xuXG4gICAgICAgICAgICB0aGlzLl9pZ25vcmVJbmRleCA9IGZyYW1lSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLl9UZXN0LkR5bmFtaWNBbmltQ3VydmUgPSBEeW5hbWljQW5pbUN1cnZlO1xuICAgIGNjLl9UZXN0LkV2ZW50QW5pbUN1cnZlID0gRXZlbnRBbmltQ3VydmU7XG4gICAgY2MuX1Rlc3QucXVpY2tGaW5kSW5kZXggPSBxdWlja0ZpbmRJbmRleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQW5pbUN1cnZlOiBBbmltQ3VydmUsXG4gICAgRHluYW1pY0FuaW1DdXJ2ZTogRHluYW1pY0FuaW1DdXJ2ZSxcbiAgICBFdmVudEFuaW1DdXJ2ZTogRXZlbnRBbmltQ3VydmUsXG4gICAgRXZlbnRJbmZvOiBFdmVudEluZm8sXG4gICAgY29tcHV0ZVJhdGlvQnlUeXBlOiBjb21wdXRlUmF0aW9CeVR5cGUsXG4gICAgcXVpY2tGaW5kSW5kZXg6IHF1aWNrRmluZEluZGV4XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=