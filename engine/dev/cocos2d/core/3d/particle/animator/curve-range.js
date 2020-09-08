
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/curve-range.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = exports.Mode = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _curve = require("../curve");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var SerializableTable = CC_EDITOR && [["mode", "constant", "multiplier"], ["mode", "curve", "multiplier"], ["mode", "curveMin", "curveMax", "multiplier"], ["mode", "constantMin", "constantMax", "multiplier"]];
var Mode = (0, _CCEnum["default"])({
  Constant: 0,
  Curve: 1,
  TwoCurves: 2,
  TwoConstants: 3
});
/**
 * !#en The curve range of target value.
 * !#zh 目标值的曲线范围
 * @class CurveRange
 */

exports.Mode = Mode;
var CurveRange = (_dec = (0, _CCClassDecorator.ccclass)('cc.CurveRange'), _dec2 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curve.AnimationCurve
}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  /**
   * !#en Curve type.
   * !#zh 曲线类型。
   * @property {Mode} mode
   */

  /**
   * !#en The curve to use when mode is Curve.
   * !#zh 当 mode 为 Curve 时，使用的曲线。
   * @property {AnimationCurve} curve
   */

  /**
   * !#en The lower limit of the curve to use when mode is TwoCurves
   * !#zh 当 mode 为 TwoCurves 时，使用的曲线下限。
   * @property {AnimationCurve} curveMin
   */

  /**
   * !#en The upper limit of the curve to use when mode is TwoCurves
   * !#zh 当 mode 为 TwoCurves 时，使用的曲线上限。
   * @property {AnimationCurve} curveMax
   */

  /**
   * !#en When mode is Constant, the value of the curve.
   * !#zh 当 mode 为 Constant 时，曲线的值。
   * @property {Number} constant
   */

  /**
   * !#en The lower limit of the curve to use when mode is TwoConstants
   * !#zh 当 mode 为 TwoConstants 时，曲线的下限。
   * @property {Number} constantMin
   */

  /**
   * !#en The upper limit of the curve to use when mode is TwoConstants
   * !#zh 当 mode 为 TwoConstants 时，曲线的上限。
   * @property {Number} constantMax
   */

  /**
   * !#en Coefficients applied to curve interpolation.
   * !#zh 应用于曲线插值的系数。
   * @property {Number} multiplier
   */
  function CurveRange() {
    _initializerDefineProperty(this, "mode", _descriptor, this);

    _initializerDefineProperty(this, "curve", _descriptor2, this);

    _initializerDefineProperty(this, "curveMin", _descriptor3, this);

    _initializerDefineProperty(this, "curveMax", _descriptor4, this);

    _initializerDefineProperty(this, "constant", _descriptor5, this);

    _initializerDefineProperty(this, "constantMin", _descriptor6, this);

    _initializerDefineProperty(this, "constantMax", _descriptor7, this);

    _initializerDefineProperty(this, "multiplier", _descriptor8, this);
  }

  var _proto = CurveRange.prototype;

  _proto.evaluate = function evaluate(time, rndRatio) {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.curve.evaluate(time) * this.multiplier;

      case Mode.TwoCurves:
        return (0, _valueTypes.lerp)(this.curveMin.evaluate(time), this.curveMax.evaluate(time), rndRatio) * this.multiplier;

      case Mode.TwoConstants:
        return (0, _valueTypes.lerp)(this.constantMin, this.constantMax, rndRatio);
    }
  };

  _proto.getMax = function getMax() {
    switch (this.mode) {
      case Mode.Constant:
        return this.constant;

      case Mode.Curve:
        return this.multiplier;

      case Mode.TwoConstants:
        return this.constantMax;

      case Mode.TwoCurves:
        return this.multiplier;
    }

    return 0;
  };

  return CurveRange;
}(), _class3.Mode = Mode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Constant;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "curve", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "curveMin", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "curveMax", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curve.AnimationCurve();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "constant", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "constantMin", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "constantMax", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "multiplier", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
})), _class2)) || _class);
exports["default"] = CurveRange;
CC_EDITOR && (CurveRange.prototype._onBeforeSerialize = function (props) {
  return SerializableTable[this.mode];
});
cc.CurveRange = CurveRange;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL2N1cnZlLXJhbmdlLnRzIl0sIm5hbWVzIjpbIlNlcmlhbGl6YWJsZVRhYmxlIiwiQ0NfRURJVE9SIiwiTW9kZSIsIkNvbnN0YW50IiwiQ3VydmUiLCJUd29DdXJ2ZXMiLCJUd29Db25zdGFudHMiLCJDdXJ2ZVJhbmdlIiwidHlwZSIsIkFuaW1hdGlvbkN1cnZlIiwiZXZhbHVhdGUiLCJ0aW1lIiwicm5kUmF0aW8iLCJtb2RlIiwiY29uc3RhbnQiLCJjdXJ2ZSIsIm11bHRpcGxpZXIiLCJjdXJ2ZU1pbiIsImN1cnZlTWF4IiwiY29uc3RhbnRNaW4iLCJjb25zdGFudE1heCIsImdldE1heCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiX29uQmVmb3JlU2VyaWFsaXplIiwicHJvcHMiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsR0FBR0MsU0FBUyxJQUFJLENBQ25DLENBQUUsTUFBRixFQUFVLFVBQVYsRUFBc0IsWUFBdEIsQ0FEbUMsRUFFbkMsQ0FBRSxNQUFGLEVBQVUsT0FBVixFQUFtQixZQUFuQixDQUZtQyxFQUduQyxDQUFFLE1BQUYsRUFBVSxVQUFWLEVBQXNCLFVBQXRCLEVBQWtDLFlBQWxDLENBSG1DLEVBSW5DLENBQUUsTUFBRixFQUFVLGFBQVYsRUFBeUIsYUFBekIsRUFBd0MsWUFBeEMsQ0FKbUMsQ0FBdkM7QUFPTyxJQUFNQyxJQUFJLEdBQUcsd0JBQUs7QUFDckJDLEVBQUFBLFFBQVEsRUFBRSxDQURXO0FBRXJCQyxFQUFBQSxLQUFLLEVBQUUsQ0FGYztBQUdyQkMsRUFBQUEsU0FBUyxFQUFFLENBSFU7QUFJckJDLEVBQUFBLFlBQVksRUFBRTtBQUpPLENBQUwsQ0FBYjtBQU9QOzs7Ozs7O0lBTXFCQyxxQkFEcEIsK0JBQVEsZUFBUixXQVNJLGdDQUFTO0FBQ05DLEVBQUFBLElBQUksRUFBRU47QUFEQSxDQUFULFdBVUEsZ0NBQVM7QUFDTk0sRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FVQSxnQ0FBUztBQUNORCxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVCxXQVVBLGdDQUFTO0FBQ05ELEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFUO0FBbkNEOzs7Ozs7QUFVQTs7Ozs7O0FBVUE7Ozs7OztBQVVBOzs7Ozs7QUFVQTs7Ozs7O0FBUUE7Ozs7OztBQVNBOzs7Ozs7QUFRQTs7Ozs7QUFRQSx3QkFBZTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBRWQ7Ozs7U0FFREMsV0FBQSxrQkFBVUMsSUFBVixFQUFnQkMsUUFBaEIsRUFBMEI7QUFDdEIsWUFBUSxLQUFLQyxJQUFiO0FBQ0ksV0FBS1gsSUFBSSxDQUFDQyxRQUFWO0FBQ0ksZUFBTyxLQUFLVyxRQUFaOztBQUNKLFdBQUtaLElBQUksQ0FBQ0UsS0FBVjtBQUNJLGVBQU8sS0FBS1csS0FBTCxDQUFXTCxRQUFYLENBQW9CQyxJQUFwQixJQUE0QixLQUFLSyxVQUF4Qzs7QUFDSixXQUFLZCxJQUFJLENBQUNHLFNBQVY7QUFDSSxlQUFPLHNCQUFLLEtBQUtZLFFBQUwsQ0FBY1AsUUFBZCxDQUF1QkMsSUFBdkIsQ0FBTCxFQUFtQyxLQUFLTyxRQUFMLENBQWNSLFFBQWQsQ0FBdUJDLElBQXZCLENBQW5DLEVBQWlFQyxRQUFqRSxJQUE2RSxLQUFLSSxVQUF6Rjs7QUFDSixXQUFLZCxJQUFJLENBQUNJLFlBQVY7QUFDSSxlQUFPLHNCQUFLLEtBQUthLFdBQVYsRUFBdUIsS0FBS0MsV0FBNUIsRUFBeUNSLFFBQXpDLENBQVA7QUFSUjtBQVVIOztTQUVEUyxTQUFBLGtCQUFVO0FBQ04sWUFBUSxLQUFLUixJQUFiO0FBQ0ksV0FBS1gsSUFBSSxDQUFDQyxRQUFWO0FBQ0ksZUFBTyxLQUFLVyxRQUFaOztBQUNKLFdBQUtaLElBQUksQ0FBQ0UsS0FBVjtBQUNJLGVBQU8sS0FBS1ksVUFBWjs7QUFDSixXQUFLZCxJQUFJLENBQUNJLFlBQVY7QUFDSSxlQUFPLEtBQUtjLFdBQVo7O0FBQ0osV0FBS2xCLElBQUksQ0FBQ0csU0FBVjtBQUNJLGVBQU8sS0FBS1csVUFBWjtBQVJSOztBQVVBLFdBQU8sQ0FBUDtBQUNIOzs7YUF4R01kLE9BQU9BOzs7OztXQVVQQSxJQUFJLENBQUNDOzs7Ozs7O1dBVUosSUFBSU0scUJBQUo7Ozs7Ozs7V0FVRyxJQUFJQSxxQkFBSjs7Ozs7OztXQVVBLElBQUlBLHFCQUFKOzs2RUFPVmE7Ozs7O1dBQ1U7O2dGQU9WQTs7Ozs7V0FDYTs7Z0ZBUWJBOzs7OztXQUNhOzsrRUFPYkE7Ozs7O1dBQ1k7Ozs7QUFrQ2pCckIsU0FBUyxLQUFLTSxVQUFVLENBQUNnQixTQUFYLENBQXFCQyxrQkFBckIsR0FBMEMsVUFBU0MsS0FBVCxFQUFlO0FBQUMsU0FBT3pCLGlCQUFpQixDQUFDLEtBQUthLElBQU4sQ0FBeEI7QUFBcUMsQ0FBcEcsQ0FBVDtBQUVBYSxFQUFFLENBQUNuQixVQUFILEdBQWdCQSxVQUFoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XG5pbXBvcnQgRW51bSAgZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NFbnVtJztcbmltcG9ydCB7IGxlcnAgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gJy4uL2N1cnZlJztcblxuY29uc3QgU2VyaWFsaXphYmxlVGFibGUgPSBDQ19FRElUT1IgJiYgW1xuICAgIFsgXCJtb2RlXCIsIFwiY29uc3RhbnRcIiwgXCJtdWx0aXBsaWVyXCIgXSxcbiAgICBbIFwibW9kZVwiLCBcImN1cnZlXCIsIFwibXVsdGlwbGllclwiIF0sXG4gICAgWyBcIm1vZGVcIiwgXCJjdXJ2ZU1pblwiLCBcImN1cnZlTWF4XCIsIFwibXVsdGlwbGllclwiIF0sXG4gICAgWyBcIm1vZGVcIiwgXCJjb25zdGFudE1pblwiLCBcImNvbnN0YW50TWF4XCIsIFwibXVsdGlwbGllclwiXVxuXTtcblxuZXhwb3J0IGNvbnN0IE1vZGUgPSBFbnVtKHtcbiAgICBDb25zdGFudDogMCxcbiAgICBDdXJ2ZTogMSxcbiAgICBUd29DdXJ2ZXM6IDIsXG4gICAgVHdvQ29uc3RhbnRzOiAzLFxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgY3VydmUgcmFuZ2Ugb2YgdGFyZ2V0IHZhbHVlLlxuICogISN6aCDnm67moIflgLznmoTmm7Lnur/ojIPlm7RcbiAqIEBjbGFzcyBDdXJ2ZVJhbmdlXG4gKi9cbkBjY2NsYXNzKCdjYy5DdXJ2ZVJhbmdlJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnZlUmFuZ2Uge1xuICAgIHN0YXRpYyBNb2RlID0gTW9kZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ3VydmUgdHlwZS5cbiAgICAgKiAhI3poIOabsue6v+exu+Wei+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IE1vZGUsXG4gICAgfSlcbiAgICBtb2RlID0gTW9kZS5Db25zdGFudDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGN1cnZlIHRvIHVzZSB3aGVuIG1vZGUgaXMgQ3VydmUuXG4gICAgICogISN6aCDlvZMgbW9kZSDkuLogQ3VydmUg5pe277yM5L2/55So55qE5puy57q/44CCXG4gICAgICogQHByb3BlcnR5IHtBbmltYXRpb25DdXJ2ZX0gY3VydmVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBBbmltYXRpb25DdXJ2ZSxcbiAgICB9KVxuICAgIGN1cnZlID0gbmV3IEFuaW1hdGlvbkN1cnZlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsb3dlciBsaW1pdCBvZiB0aGUgY3VydmUgdG8gdXNlIHdoZW4gbW9kZSBpcyBUd29DdXJ2ZXNcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29DdXJ2ZXMg5pe277yM5L2/55So55qE5puy57q/5LiL6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtBbmltYXRpb25DdXJ2ZX0gY3VydmVNaW5cbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBBbmltYXRpb25DdXJ2ZSxcbiAgICB9KVxuICAgIGN1cnZlTWluID0gbmV3IEFuaW1hdGlvbkN1cnZlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1cHBlciBsaW1pdCBvZiB0aGUgY3VydmUgdG8gdXNlIHdoZW4gbW9kZSBpcyBUd29DdXJ2ZXNcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29DdXJ2ZXMg5pe277yM5L2/55So55qE5puy57q/5LiK6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtBbmltYXRpb25DdXJ2ZX0gY3VydmVNYXhcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBBbmltYXRpb25DdXJ2ZSxcbiAgICB9KVxuICAgIGN1cnZlTWF4ID0gbmV3IEFuaW1hdGlvbkN1cnZlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZW4gbW9kZSBpcyBDb25zdGFudCwgdGhlIHZhbHVlIG9mIHRoZSBjdXJ2ZS5cbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBDb25zdGFudCDml7bvvIzmm7Lnur/nmoTlgLzjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY29uc3RhbnRcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBjb25zdGFudCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBsb3dlciBsaW1pdCBvZiB0aGUgY3VydmUgdG8gdXNlIHdoZW4gbW9kZSBpcyBUd29Db25zdGFudHNcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29Db25zdGFudHMg5pe277yM5puy57q/55qE5LiL6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvbnN0YW50TWluXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgY29uc3RhbnRNaW4gPSAwO1xuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB1cHBlciBsaW1pdCBvZiB0aGUgY3VydmUgdG8gdXNlIHdoZW4gbW9kZSBpcyBUd29Db25zdGFudHNcbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29Db25zdGFudHMg5pe277yM5puy57q/55qE5LiK6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvbnN0YW50TWF4XG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgY29uc3RhbnRNYXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBDb2VmZmljaWVudHMgYXBwbGllZCB0byBjdXJ2ZSBpbnRlcnBvbGF0aW9uLlxuICAgICAqICEjemgg5bqU55So5LqO5puy57q/5o+S5YC855qE57O75pWw44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IG11bHRpcGxpZXJcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBtdWx0aXBsaWVyID0gMTtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcblxuICAgIH1cblxuICAgIGV2YWx1YXRlICh0aW1lLCBybmRSYXRpbykge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubW9kZSkge1xuICAgICAgICAgICAgY2FzZSBNb2RlLkNvbnN0YW50OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0YW50O1xuICAgICAgICAgICAgY2FzZSBNb2RlLkN1cnZlOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnZlLmV2YWx1YXRlKHRpbWUpICogdGhpcy5tdWx0aXBsaWVyO1xuICAgICAgICAgICAgY2FzZSBNb2RlLlR3b0N1cnZlczpcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVycCh0aGlzLmN1cnZlTWluLmV2YWx1YXRlKHRpbWUpLCB0aGlzLmN1cnZlTWF4LmV2YWx1YXRlKHRpbWUpLCBybmRSYXRpbykgKiB0aGlzLm11bHRpcGxpZXI7XG4gICAgICAgICAgICBjYXNlIE1vZGUuVHdvQ29uc3RhbnRzOlxuICAgICAgICAgICAgICAgIHJldHVybiBsZXJwKHRoaXMuY29uc3RhbnRNaW4sIHRoaXMuY29uc3RhbnRNYXgsIHJuZFJhdGlvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1heCAoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIE1vZGUuQ29uc3RhbnQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RhbnQ7XG4gICAgICAgICAgICBjYXNlIE1vZGUuQ3VydmU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGllcjtcbiAgICAgICAgICAgIGNhc2UgTW9kZS5Ud29Db25zdGFudHM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RhbnRNYXg7XG4gICAgICAgICAgICBjYXNlIE1vZGUuVHdvQ3VydmVzOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpcGxpZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufVxuXG5DQ19FRElUT1IgJiYgKEN1cnZlUmFuZ2UucHJvdG90eXBlLl9vbkJlZm9yZVNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHByb3BzKXtyZXR1cm4gU2VyaWFsaXphYmxlVGFibGVbdGhpcy5tb2RlXTt9KTtcblxuY2MuQ3VydmVSYW5nZSA9IEN1cnZlUmFuZ2U7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==