
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/curve.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.evalOptCurve = evalOptCurve;
exports.AnimationCurve = exports.OptimizedKey = exports.Keyframe = void 0;

var _CCEnum = _interopRequireDefault(require("../../platform/CCEnum"));

var _valueTypes = require("../../value-types");

var _CCClassDecorator = require("../../platform/CCClassDecorator");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp, _dec2, _dec3, _dec4, _dec5, _class4, _class5, _descriptor5, _descriptor6, _descriptor7, _temp2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var LOOK_FORWARD = 3;
var WrapMode = (0, _CCEnum["default"])({
  Default: 0,
  Once: 1,
  Loop: 2,
  PingPong: 3,
  ClampForever: 4
});
var Keyframe = (_dec = (0, _CCClassDecorator.ccclass)('cc.Keyframe'), _dec(_class = (_class2 = (_temp = function Keyframe(time, value, inTangent, outTangent) {
  _initializerDefineProperty(this, "time", _descriptor, this);

  _initializerDefineProperty(this, "value", _descriptor2, this);

  _initializerDefineProperty(this, "inTangent", _descriptor3, this);

  _initializerDefineProperty(this, "outTangent", _descriptor4, this);

  this.time = time || 0;
  this.value = value || 0;
  this.inTangent = inTangent || 0;
  this.outTangent = outTangent || 0;
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inTangent", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "outTangent", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
exports.Keyframe = Keyframe;

var OptimizedKey = /*#__PURE__*/function () {
  function OptimizedKey() {
    this.index = 0;
    this.time = 0;
    this.endTime = 0;
    this.coefficient = null;
    this.index = -1;
    this.time = 0;
    this.endTime = 0;
    this.coefficient = new Float32Array(4);
  }

  var _proto = OptimizedKey.prototype;

  _proto.evaluate = function evaluate(T) {
    var t = T - this.time;
    return evalOptCurve(t, this.coefficient);
  };

  return OptimizedKey;
}();

exports.OptimizedKey = OptimizedKey;

function evalOptCurve(t, coefs) {
  return t * (t * (t * coefs[0] + coefs[1]) + coefs[2]) + coefs[3];
}

var defaultKFStart = new Keyframe(0, 1, 0, 0);
var defaultKFEnd = new Keyframe(1, 1, 0, 0);
/**
 * !#en The animation curve of 3d particle.
 * !#zh 3D 粒子动画曲线
 * @class AnimationCurve
 */

var AnimationCurve = (_dec2 = (0, _CCClassDecorator.ccclass)('cc.AnimationCurve'), _dec3 = (0, _CCClassDecorator.property)({
  "default": [],
  type: [Keyframe]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: cc.Enum(WrapMode),
  visible: false
}), _dec5 = (0, _CCClassDecorator.property)({
  type: cc.Enum(WrapMode),
  visible: false
}), _dec2(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function () {
  function AnimationCurve(keyFrames) {
    if (keyFrames === void 0) {
      keyFrames = null;
    }

    _initializerDefineProperty(this, "keyFrames", _descriptor5, this);

    _initializerDefineProperty(this, "preWrapMode", _descriptor6, this);

    _initializerDefineProperty(this, "postWrapMode", _descriptor7, this);

    this.cachedKey = null;

    if (keyFrames) {
      this.keyFrames = keyFrames;
    } else {
      this.keyFrames.push(defaultKFStart);
      this.keyFrames.push(defaultKFEnd);
    }

    this.cachedKey = new OptimizedKey();
  }

  var _proto2 = AnimationCurve.prototype;

  _proto2.addKey = function addKey(keyFrame) {
    if (this.keyFrames == null) {
      this.keyFrames = [];
    }

    this.keyFrames.push(keyFrame);
  } // cubic Hermite spline
  ;

  _proto2.evaluate_slow = function evaluate_slow(time) {
    var wrappedTime = time;
    var wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
    var startTime = this.keyFrames[0].time;
    var endTime = this.keyFrames[this.keyFrames.length - 1].time;

    switch (wrapMode) {
      case WrapMode.Loop:
        wrappedTime = (0, _valueTypes.repeat)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.PingPong:
        wrappedTime = (0, _valueTypes.pingPong)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.ClampForever:
        wrappedTime = (0, _valueTypes.clamp)(time, startTime, endTime);
        break;
    }

    var preKFIndex = 0;

    if (wrappedTime > this.keyFrames[0].time) {
      if (wrappedTime >= this.keyFrames[this.keyFrames.length - 1].time) {
        preKFIndex = this.keyFrames.length - 2;
      } else {
        for (var i = 0; i < this.keyFrames.length - 1; i++) {
          if (wrappedTime >= this.keyFrames[0].time && wrappedTime <= this.keyFrames[i + 1].time) {
            preKFIndex = i;
            break;
          }
        }
      }
    }

    var keyframe0 = this.keyFrames[preKFIndex];
    var keyframe1 = this.keyFrames[preKFIndex + 1];
    var t = (0, _valueTypes.inverseLerp)(keyframe0.time, keyframe1.time, wrappedTime);
    var dt = keyframe1.time - keyframe0.time;
    var m0 = keyframe0.outTangent * dt;
    var m1 = keyframe1.inTangent * dt;
    var t2 = t * t;
    var t3 = t2 * t;
    var a = 2 * t3 - 3 * t2 + 1;
    var b = t3 - 2 * t2 + t;
    var c = t3 - t2;
    var d = -2 * t3 + 3 * t2;
    return a * keyframe0.value + b * m0 + c * m1 + d * keyframe1.value;
  };

  _proto2.evaluate = function evaluate(time) {
    var wrappedTime = time;
    var wrapMode = time < 0 ? this.preWrapMode : this.postWrapMode;
    var startTime = this.keyFrames[0].time;
    var endTime = this.keyFrames[this.keyFrames.length - 1].time;

    switch (wrapMode) {
      case WrapMode.Loop:
        wrappedTime = (0, _valueTypes.repeat)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.PingPong:
        wrappedTime = (0, _valueTypes.pingPong)(time - startTime, endTime - startTime) + startTime;
        break;

      case WrapMode.ClampForever:
        wrappedTime = (0, _valueTypes.clamp)(time, startTime, endTime);
        break;
    }

    if (wrappedTime >= this.cachedKey.time && wrappedTime < this.cachedKey.endTime) {
      return this.cachedKey.evaluate(wrappedTime);
    } else {
      var leftIndex = this.findIndex(this.cachedKey, wrappedTime);
      var rightIndex = leftIndex + 1;

      if (rightIndex === this.keyFrames.length) {
        rightIndex -= 1;
      }

      this.calcOptimizedKey(this.cachedKey, leftIndex, rightIndex);
      return this.cachedKey.evaluate(wrappedTime);
    }
  };

  _proto2.calcOptimizedKey = function calcOptimizedKey(optKey, leftIndex, rightIndex) {
    var lhs = this.keyFrames[leftIndex];
    var rhs = this.keyFrames[rightIndex];
    optKey.index = leftIndex;
    optKey.time = lhs.time;
    optKey.endTime = rhs.time;
    var dx = rhs.time - lhs.time;
    var dy = rhs.value - lhs.value;
    var length = 1 / (dx * dx);
    var d1 = lhs.outTangent * dx;
    var d2 = rhs.inTangent * dx;
    optKey.coefficient[0] = (d1 + d2 - dy - dy) * length / dx;
    optKey.coefficient[1] = (dy + dy + dy - d1 - d1 - d2) * length;
    optKey.coefficient[2] = lhs.outTangent;
    optKey.coefficient[3] = lhs.value;
  };

  _proto2.findIndex = function findIndex(optKey, t) {
    var cachedIndex = optKey.index;

    if (cachedIndex !== -1) {
      var cachedTime = this.keyFrames[cachedIndex].time;

      if (t > cachedTime) {
        for (var i = 0; i < LOOK_FORWARD; i++) {
          var currIndex = cachedIndex + i;

          if (currIndex + 1 < this.keyFrames.length && this.keyFrames[currIndex + 1].time > t) {
            return currIndex;
          }
        }
      } else {
        for (var _i = 0; _i < LOOK_FORWARD; _i++) {
          var _currIndex = cachedIndex - _i;

          if (_currIndex >= 0 && this.keyFrames[_currIndex - 1].time <= t) {
            return _currIndex - 1;
          }
        }
      }
    }

    var left = 0;
    var right = this.keyFrames.length;
    var mid = Math.floor((left + right) / 2);

    while (right - left > 1) {
      if (this.keyFrames[mid].time >= t) {
        right = mid;
      } else {
        left = mid + 1;
      }

      mid = Math.floor((left + right) / 2);
    }

    return left;
  };

  return AnimationCurve;
}(), _temp2), (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "keyFrames", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "preWrapMode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapMode.Loop;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class5.prototype, "postWrapMode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return WrapMode.Loop;
  }
})), _class5)) || _class4);
exports.AnimationCurve = AnimationCurve;
cc.Keyframe = Keyframe;
cc.AnimationCurve = AnimationCurve;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2N1cnZlLnRzIl0sIm5hbWVzIjpbIkxPT0tfRk9SV0FSRCIsIldyYXBNb2RlIiwiRGVmYXVsdCIsIk9uY2UiLCJMb29wIiwiUGluZ1BvbmciLCJDbGFtcEZvcmV2ZXIiLCJLZXlmcmFtZSIsInRpbWUiLCJ2YWx1ZSIsImluVGFuZ2VudCIsIm91dFRhbmdlbnQiLCJwcm9wZXJ0eSIsIk9wdGltaXplZEtleSIsImluZGV4IiwiZW5kVGltZSIsImNvZWZmaWNpZW50IiwiRmxvYXQzMkFycmF5IiwiZXZhbHVhdGUiLCJUIiwidCIsImV2YWxPcHRDdXJ2ZSIsImNvZWZzIiwiZGVmYXVsdEtGU3RhcnQiLCJkZWZhdWx0S0ZFbmQiLCJBbmltYXRpb25DdXJ2ZSIsInR5cGUiLCJjYyIsIkVudW0iLCJ2aXNpYmxlIiwia2V5RnJhbWVzIiwiY2FjaGVkS2V5IiwicHVzaCIsImFkZEtleSIsImtleUZyYW1lIiwiZXZhbHVhdGVfc2xvdyIsIndyYXBwZWRUaW1lIiwid3JhcE1vZGUiLCJwcmVXcmFwTW9kZSIsInBvc3RXcmFwTW9kZSIsInN0YXJ0VGltZSIsImxlbmd0aCIsInByZUtGSW5kZXgiLCJpIiwia2V5ZnJhbWUwIiwia2V5ZnJhbWUxIiwiZHQiLCJtMCIsIm0xIiwidDIiLCJ0MyIsImEiLCJiIiwiYyIsImQiLCJsZWZ0SW5kZXgiLCJmaW5kSW5kZXgiLCJyaWdodEluZGV4IiwiY2FsY09wdGltaXplZEtleSIsIm9wdEtleSIsImxocyIsInJocyIsImR4IiwiZHkiLCJkMSIsImQyIiwiY2FjaGVkSW5kZXgiLCJjYWNoZWRUaW1lIiwiY3VyckluZGV4IiwibGVmdCIsInJpZ2h0IiwibWlkIiwiTWF0aCIsImZsb29yIiwiQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksR0FBRyxDQUFyQjtBQUVBLElBQU1D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QUFMLENBQWV5QyxHQUFmLEVBQW9CL0QsSUFBcEIsSUFBNEJZLENBQWhDLEVBQW1DO0FBQy9Ca0QsUUFBQUEsS0FBSyxHQUFHQyxHQUFSO0FBQ0gsT0FGRCxNQUVPO0FBQ0hGLFFBQUFBLElBQUksR0FBR0UsR0FBRyxHQUFHLENBQWI7QUFDSDs7QUFDREEsTUFBQUEsR0FBRyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxDQUFDSixJQUFJLEdBQUdDLEtBQVIsSUFBaUIsQ0FBNUIsQ0FBTjtBQUNIOztBQUNELFdBQU9ELElBQVA7QUFDSDs7Ozs7Ozs7V0FwS1csSUFBSUssS0FBSjs7Ozs7OztXQU1FekUsUUFBUSxDQUFDRzs7Ozs7OztXQU1SSCxRQUFRLENBQUNHOzs7O0FBMko1QnVCLEVBQUUsQ0FBQ3BCLFFBQUgsR0FBY0EsUUFBZDtBQUNBb0IsRUFBRSxDQUFDRixjQUFILEdBQW9CQSxjQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbnVtICBmcm9tICcuLi8uLi9wbGF0Zm9ybS9DQ0VudW0nO1xuaW1wb3J0IHsgY2xhbXAsIGludmVyc2VMZXJwLCBwaW5nUG9uZywgcmVwZWF0IH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgY2NjbGFzcyAsIHByb3BlcnR5fSBmcm9tICcuLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcblxuY29uc3QgTE9PS19GT1JXQVJEID0gMztcblxuY29uc3QgV3JhcE1vZGUgPSBFbnVtKHtcbiAgICBEZWZhdWx0OiAwLFxuICAgIE9uY2U6IDEsXG4gICAgTG9vcDogMixcbiAgICBQaW5nUG9uZzogMyxcbiAgICBDbGFtcEZvcmV2ZXI6IDQsXG59KTtcblxuQGNjY2xhc3MoJ2NjLktleWZyYW1lJylcbmV4cG9ydCBjbGFzcyBLZXlmcmFtZSB7XG4gICAgQHByb3BlcnR5XG4gICAgdGltZSA9IDA7XG5cbiAgICBAcHJvcGVydHlcbiAgICB2YWx1ZSA9IDA7XG5cbiAgICBAcHJvcGVydHlcbiAgICBpblRhbmdlbnQgPSAwO1xuXG4gICAgQHByb3BlcnR5XG4gICAgb3V0VGFuZ2VudCA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvciAodGltZSwgdmFsdWUsIGluVGFuZ2VudCwgb3V0VGFuZ2VudCkge1xuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lIHx8IDA7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZSB8fCAwO1xuICAgICAgICB0aGlzLmluVGFuZ2VudCA9IGluVGFuZ2VudCB8fCAwO1xuICAgICAgICB0aGlzLm91dFRhbmdlbnQgPSBvdXRUYW5nZW50IHx8IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgT3B0aW1pemVkS2V5IHtcbiAgICBpbmRleCA9IDA7XG4gICAgdGltZSA9IDA7XG4gICAgZW5kVGltZSA9IDA7XG4gICAgY29lZmZpY2llbnQgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuZW5kVGltZSA9IDA7XG4gICAgICAgIHRoaXMuY29lZmZpY2llbnQgPSBuZXcgRmxvYXQzMkFycmF5KDQpO1xuICAgIH1cblxuICAgIGV2YWx1YXRlIChUKSB7XG4gICAgICAgIGNvbnN0IHQgPSBUIC0gdGhpcy50aW1lO1xuICAgICAgICByZXR1cm4gZXZhbE9wdEN1cnZlKHQsIHRoaXMuY29lZmZpY2llbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWxPcHRDdXJ2ZSAodCwgY29lZnMpIHtcbiAgICByZXR1cm4gKHQgKiAodCAqICh0ICogY29lZnNbMF0gKyBjb2Vmc1sxXSkgKyBjb2Vmc1syXSkpICsgY29lZnNbM107XG59XG5cbmNvbnN0IGRlZmF1bHRLRlN0YXJ0ID0gbmV3IEtleWZyYW1lKDAsIDEsIDAsIDApO1xuY29uc3QgZGVmYXVsdEtGRW5kID0gbmV3IEtleWZyYW1lKDEsIDEsIDAsIDApO1xuXG5cbi8qKlxuICogISNlbiBUaGUgYW5pbWF0aW9uIGN1cnZlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDliqjnlLvmm7Lnur9cbiAqIEBjbGFzcyBBbmltYXRpb25DdXJ2ZVxuICovXG5AY2NjbGFzcygnY2MuQW5pbWF0aW9uQ3VydmUnKVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQ3VydmUge1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICB0eXBlOiBbS2V5ZnJhbWVdLFxuICAgIH0pXG4gICAga2V5RnJhbWVzID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuRW51bShXcmFwTW9kZSksXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0pXG4gICAgcHJlV3JhcE1vZGUgPSBXcmFwTW9kZS5Mb29wO1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuRW51bShXcmFwTW9kZSksXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgIH0pXG4gICAgcG9zdFdyYXBNb2RlID0gV3JhcE1vZGUuTG9vcDtcblxuICAgIGNhY2hlZEtleSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvciAoa2V5RnJhbWVzID0gbnVsbCkge1xuICAgICAgICBpZiAoa2V5RnJhbWVzKSB7XG4gICAgICAgICAgICB0aGlzLmtleUZyYW1lcyA9IGtleUZyYW1lc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5rZXlGcmFtZXMucHVzaChkZWZhdWx0S0ZTdGFydCk7XG4gICAgICAgICAgICB0aGlzLmtleUZyYW1lcy5wdXNoKGRlZmF1bHRLRkVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWNoZWRLZXkgPSBuZXcgT3B0aW1pemVkS2V5KCk7XG4gICAgfVxuXG4gICAgYWRkS2V5IChrZXlGcmFtZSkge1xuICAgICAgICBpZiAodGhpcy5rZXlGcmFtZXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5rZXlGcmFtZXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleUZyYW1lcy5wdXNoKGtleUZyYW1lKTtcbiAgICB9XG5cbiAgICAvLyBjdWJpYyBIZXJtaXRlIHNwbGluZVxuICAgIGV2YWx1YXRlX3Nsb3cgKHRpbWUpIHtcbiAgICAgICAgbGV0IHdyYXBwZWRUaW1lID0gdGltZTtcbiAgICAgICAgY29uc3Qgd3JhcE1vZGUgPSB0aW1lIDwgMCA/IHRoaXMucHJlV3JhcE1vZGUgOiB0aGlzLnBvc3RXcmFwTW9kZTtcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy5rZXlGcmFtZXNbMF0udGltZTtcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IHRoaXMua2V5RnJhbWVzW3RoaXMua2V5RnJhbWVzLmxlbmd0aCAtIDFdLnRpbWU7XG4gICAgICAgIHN3aXRjaCAod3JhcE1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuTG9vcDpcbiAgICAgICAgICAgICAgICB3cmFwcGVkVGltZSA9IHJlcGVhdCh0aW1lIC0gc3RhcnRUaW1lLCBlbmRUaW1lIC0gc3RhcnRUaW1lKSArIHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuUGluZ1Bvbmc6XG4gICAgICAgICAgICAgICAgd3JhcHBlZFRpbWUgPSBwaW5nUG9uZyh0aW1lIC0gc3RhcnRUaW1lLCBlbmRUaW1lIC0gc3RhcnRUaW1lKSArIHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuQ2xhbXBGb3JldmVyOlxuICAgICAgICAgICAgICAgIHdyYXBwZWRUaW1lID0gY2xhbXAodGltZSwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJlS0ZJbmRleCA9IDA7XG4gICAgICAgIGlmICh3cmFwcGVkVGltZSA+IHRoaXMua2V5RnJhbWVzWzBdLnRpbWUpIHtcbiAgICAgICAgICAgIGlmICh3cmFwcGVkVGltZSA+PSB0aGlzLmtleUZyYW1lc1t0aGlzLmtleUZyYW1lcy5sZW5ndGggLSAxXS50aW1lKSB7XG4gICAgICAgICAgICAgICAgcHJlS0ZJbmRleCA9IHRoaXMua2V5RnJhbWVzLmxlbmd0aCAtIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMua2V5RnJhbWVzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAod3JhcHBlZFRpbWUgPj0gdGhpcy5rZXlGcmFtZXNbMF0udGltZSAmJiB3cmFwcGVkVGltZSA8PSB0aGlzLmtleUZyYW1lc1tpICsgMV0udGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlS0ZJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlmcmFtZTAgPSB0aGlzLmtleUZyYW1lc1twcmVLRkluZGV4XTtcbiAgICAgICAgY29uc3Qga2V5ZnJhbWUxID0gdGhpcy5rZXlGcmFtZXNbcHJlS0ZJbmRleCArIDFdO1xuXG4gICAgICAgIGNvbnN0IHQgPSBpbnZlcnNlTGVycChrZXlmcmFtZTAudGltZSwga2V5ZnJhbWUxLnRpbWUsIHdyYXBwZWRUaW1lKTtcbiAgICAgICAgY29uc3QgZHQgPSBrZXlmcmFtZTEudGltZSAtIGtleWZyYW1lMC50aW1lO1xuXG4gICAgICAgIGNvbnN0IG0wID0ga2V5ZnJhbWUwLm91dFRhbmdlbnQgKiBkdDtcbiAgICAgICAgY29uc3QgbTEgPSBrZXlmcmFtZTEuaW5UYW5nZW50ICogZHQ7XG5cbiAgICAgICAgY29uc3QgdDIgPSB0ICogdDtcbiAgICAgICAgY29uc3QgdDMgPSB0MiAqIHQ7XG5cbiAgICAgICAgY29uc3QgYSA9IDIgKiB0MyAtIDMgKiB0MiArIDE7XG4gICAgICAgIGNvbnN0IGIgPSB0MyAtIDIgKiB0MiArIHQ7XG4gICAgICAgIGNvbnN0IGMgPSB0MyAtIHQyO1xuICAgICAgICBjb25zdCBkID0gLTIgKiB0MyArIDMgKiB0MjtcblxuICAgICAgICByZXR1cm4gYSAqIGtleWZyYW1lMC52YWx1ZSArIGIgKiBtMCArIGMgKiBtMSArIGQgKiBrZXlmcmFtZTEudmFsdWU7XG4gICAgfVxuXG4gICAgZXZhbHVhdGUgKHRpbWUpIHtcbiAgICAgICAgbGV0IHdyYXBwZWRUaW1lID0gdGltZTtcbiAgICAgICAgY29uc3Qgd3JhcE1vZGUgPSB0aW1lIDwgMCA/IHRoaXMucHJlV3JhcE1vZGUgOiB0aGlzLnBvc3RXcmFwTW9kZTtcbiAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gdGhpcy5rZXlGcmFtZXNbMF0udGltZTtcbiAgICAgICAgY29uc3QgZW5kVGltZSA9IHRoaXMua2V5RnJhbWVzW3RoaXMua2V5RnJhbWVzLmxlbmd0aCAtIDFdLnRpbWU7XG4gICAgICAgIHN3aXRjaCAod3JhcE1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuTG9vcDpcbiAgICAgICAgICAgICAgICB3cmFwcGVkVGltZSA9IHJlcGVhdCh0aW1lIC0gc3RhcnRUaW1lLCBlbmRUaW1lIC0gc3RhcnRUaW1lKSArIHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuUGluZ1Bvbmc6XG4gICAgICAgICAgICAgICAgd3JhcHBlZFRpbWUgPSBwaW5nUG9uZyh0aW1lIC0gc3RhcnRUaW1lLCBlbmRUaW1lIC0gc3RhcnRUaW1lKSArIHN0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgV3JhcE1vZGUuQ2xhbXBGb3JldmVyOlxuICAgICAgICAgICAgICAgIHdyYXBwZWRUaW1lID0gY2xhbXAodGltZSwgc3RhcnRUaW1lLCBlbmRUaW1lKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAod3JhcHBlZFRpbWUgPj0gdGhpcy5jYWNoZWRLZXkudGltZSAmJiB3cmFwcGVkVGltZSA8IHRoaXMuY2FjaGVkS2V5LmVuZFRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEtleS5ldmFsdWF0ZSh3cmFwcGVkVGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsZWZ0SW5kZXggPSB0aGlzLmZpbmRJbmRleCh0aGlzLmNhY2hlZEtleSwgd3JhcHBlZFRpbWUpO1xuICAgICAgICAgICAgbGV0IHJpZ2h0SW5kZXggPSBsZWZ0SW5kZXggKyAxO1xuICAgICAgICAgICAgaWYgKHJpZ2h0SW5kZXggPT09IHRoaXMua2V5RnJhbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJpZ2h0SW5kZXggLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY09wdGltaXplZEtleSh0aGlzLmNhY2hlZEtleSwgbGVmdEluZGV4LCByaWdodEluZGV4KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhY2hlZEtleS5ldmFsdWF0ZSh3cmFwcGVkVGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxjT3B0aW1pemVkS2V5IChvcHRLZXksIGxlZnRJbmRleCwgcmlnaHRJbmRleCkge1xuICAgICAgICBjb25zdCBsaHMgPSB0aGlzLmtleUZyYW1lc1tsZWZ0SW5kZXhdO1xuICAgICAgICBjb25zdCByaHMgPSB0aGlzLmtleUZyYW1lc1tyaWdodEluZGV4XTtcbiAgICAgICAgb3B0S2V5LmluZGV4ID0gbGVmdEluZGV4O1xuICAgICAgICBvcHRLZXkudGltZSA9IGxocy50aW1lO1xuICAgICAgICBvcHRLZXkuZW5kVGltZSA9IHJocy50aW1lO1xuXG4gICAgICAgIGNvbnN0IGR4ID0gcmhzLnRpbWUgLSBsaHMudGltZTtcbiAgICAgICAgY29uc3QgZHkgPSByaHMudmFsdWUgLSBsaHMudmFsdWU7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IDEgLyAoZHggKiBkeCk7XG4gICAgICAgIGNvbnN0IGQxID0gbGhzLm91dFRhbmdlbnQgKiBkeDtcbiAgICAgICAgY29uc3QgZDIgPSByaHMuaW5UYW5nZW50ICogZHg7XG5cbiAgICAgICAgb3B0S2V5LmNvZWZmaWNpZW50WzBdID0gKGQxICsgZDIgLSBkeSAtIGR5KSAqIGxlbmd0aCAvIGR4O1xuICAgICAgICBvcHRLZXkuY29lZmZpY2llbnRbMV0gPSAoZHkgKyBkeSArIGR5IC0gZDEgLSBkMSAtIGQyKSAqIGxlbmd0aDtcbiAgICAgICAgb3B0S2V5LmNvZWZmaWNpZW50WzJdID0gbGhzLm91dFRhbmdlbnQ7XG4gICAgICAgIG9wdEtleS5jb2VmZmljaWVudFszXSA9IGxocy52YWx1ZTtcbiAgICB9XG5cbiAgICBmaW5kSW5kZXggKG9wdEtleSwgdCkge1xuICAgICAgICBjb25zdCBjYWNoZWRJbmRleCA9IG9wdEtleS5pbmRleDtcbiAgICAgICAgaWYgKGNhY2hlZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgY2FjaGVkVGltZSA9IHRoaXMua2V5RnJhbWVzW2NhY2hlZEluZGV4XS50aW1lO1xuICAgICAgICAgICAgaWYgKHQgPiBjYWNoZWRUaW1lKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBMT09LX0ZPUldBUkQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJySW5kZXggPSBjYWNoZWRJbmRleCArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJySW5kZXggKyAxIDwgdGhpcy5rZXlGcmFtZXMubGVuZ3RoICYmIHRoaXMua2V5RnJhbWVzW2N1cnJJbmRleCArIDFdLnRpbWUgPiB0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VyckluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IExPT0tfRk9SV0FSRDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJJbmRleCA9IGNhY2hlZEluZGV4IC0gaTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJJbmRleCA+PSAwICYmIHRoaXMua2V5RnJhbWVzW2N1cnJJbmRleCAtIDFdLnRpbWUgPD0gdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlZnQgPSAwO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLmtleUZyYW1lcy5sZW5ndGg7XG4gICAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG4gICAgICAgIHdoaWxlIChyaWdodCAtIGxlZnQgPiAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5rZXlGcmFtZXNbbWlkXS50aW1lID49IHQpIHtcbiAgICAgICAgICAgICAgICByaWdodCA9IG1pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IG1pZCArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtaWQgPSBNYXRoLmZsb29yKChsZWZ0ICsgcmlnaHQpIC8gMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxlZnQ7XG4gICAgfVxufVxuXG5jYy5LZXlmcmFtZSA9IEtleWZyYW1lO1xuY2MuQW5pbWF0aW9uQ3VydmUgPSBBbmltYXRpb25DdXJ2ZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==