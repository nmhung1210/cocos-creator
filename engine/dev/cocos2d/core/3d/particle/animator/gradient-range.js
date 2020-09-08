
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/gradient-range.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _gradient = require("./gradient");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _class3, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var GRADIENT_MODE_FIX = 0;
var GRADIENT_MODE_BLEND = 1;
var GRADIENT_RANGE_MODE_COLOR = 0;
var GRADIENT_RANGE_MODE_TWO_COLOR = 1;
var GRADIENT_RANGE_MODE_RANDOM_COLOR = 2;
var GRADIENT_RANGE_MODE_GRADIENT = 3;
var GRADIENT_RANGE_MODE_TWO_GRADIENT = 4;
var SerializableTable = CC_EDITOR && [["_mode", "color"], ["_mode", "gradient"], ["_mode", "colorMin", "colorMax"], ["_mode", "gradientMin", "gradientMax"], ["_mode", "gradient"]];
var Mode = (0, _CCEnum["default"])({
  Color: 0,
  Gradient: 1,
  TwoColors: 2,
  TwoGradients: 3,
  RandomColor: 4
});
/**
 * !#en The gradient range of color.
 * !#zh 颜色值的渐变范围
 * @class GradientRange
 */

var GradientRange = (_dec = (0, _CCClassDecorator.ccclass)('cc.GradientRange'), _dec2 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _gradient.Gradient
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _gradient.Gradient
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _gradient.Gradient
}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
  function GradientRange() {
    _initializerDefineProperty(this, "_mode", _descriptor, this);

    _initializerDefineProperty(this, "_color", _descriptor2, this);

    _initializerDefineProperty(this, "color", _descriptor3, this);

    _initializerDefineProperty(this, "colorMin", _descriptor4, this);

    _initializerDefineProperty(this, "colorMax", _descriptor5, this);

    _initializerDefineProperty(this, "gradient", _descriptor6, this);

    _initializerDefineProperty(this, "gradientMin", _descriptor7, this);

    _initializerDefineProperty(this, "gradientMax", _descriptor8, this);
  }

  var _proto = GradientRange.prototype;

  _proto.evaluate = function evaluate(time, rndRatio) {
    switch (this._mode) {
      case Mode.Color:
        return this.color;

      case Mode.TwoColors:
        this.colorMin.lerp(this.colorMax, rndRatio, this._color);
        return this._color;

      case Mode.RandomColor:
        return this.gradient.randomColor();

      case Mode.Gradient:
        return this.gradient.evaluate(time);

      case Mode.TwoGradients:
        this.gradientMin.evaluate(time).lerp(this.gradientMax.evaluate(time), rndRatio, this._color);
        return this._color;

      default:
        return this.color;
    }
  };

  _createClass(GradientRange, [{
    key: "mode",

    /**
     * !#en Gradient type.
     * !#zh 渐变色类型。
     * @property {Mode} mode
     */
    get: function get() {
      return this._mode;
    },
    set: function set(m) {
      if (CC_EDITOR) {
        if (m === Mode.RandomColor) {
          if (this.gradient.colorKeys.length === 0) {
            this.gradient.colorKeys.push(new _gradient.ColorKey());
          }

          if (this.gradient.alphaKeys.length === 0) {
            this.gradient.alphaKeys.push(new _gradient.AlphaKey());
          }
        }
      }

      this._mode = m;
    }
  }]);

  return GradientRange;
}(), _class3.Mode = Mode, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_mode", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Color;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "mode"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "colorMin", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "colorMax", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gradient", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradient.Gradient();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "gradientMin", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradient.Gradient();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "gradientMax", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradient.Gradient();
  }
})), _class2)) || _class);
exports["default"] = GradientRange;
CC_EDITOR && (GradientRange.prototype._onBeforeSerialize = function (props) {
  return SerializableTable[this._mode];
});
cc.GradientRange = GradientRange;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL2dyYWRpZW50LXJhbmdlLnRzIl0sIm5hbWVzIjpbIkdSQURJRU5UX01PREVfRklYIiwiR1JBRElFTlRfTU9ERV9CTEVORCIsIkdSQURJRU5UX1JBTkdFX01PREVfQ09MT1IiLCJHUkFESUVOVF9SQU5HRV9NT0RFX1RXT19DT0xPUiIsIkdSQURJRU5UX1JBTkdFX01PREVfUkFORE9NX0NPTE9SIiwiR1JBRElFTlRfUkFOR0VfTU9ERV9HUkFESUVOVCIsIkdSQURJRU5UX1JBTkdFX01PREVfVFdPX0dSQURJRU5UIiwiU2VyaWFsaXphYmxlVGFibGUiLCJDQ19FRElUT1IiLCJNb2RlIiwiQ29sb3IiLCJHcmFkaWVudCIsIlR3b0NvbG9ycyIsIlR3b0dyYWRpZW50cyIsIlJhbmRvbUNvbG9yIiwiR3JhZGllbnRSYW5nZSIsInR5cGUiLCJldmFsdWF0ZSIsInRpbWUiLCJybmRSYXRpbyIsIl9tb2RlIiwiY29sb3IiLCJjb2xvck1pbiIsImxlcnAiLCJjb2xvck1heCIsIl9jb2xvciIsImdyYWRpZW50IiwicmFuZG9tQ29sb3IiLCJncmFkaWVudE1pbiIsImdyYWRpZW50TWF4IiwibSIsImNvbG9yS2V5cyIsImxlbmd0aCIsInB1c2giLCJDb2xvcktleSIsImFscGhhS2V5cyIsIkFscGhhS2V5IiwicHJvcGVydHkiLCJjYyIsIldISVRFIiwiY2xvbmUiLCJwcm90b3R5cGUiLCJfb25CZWZvcmVTZXJpYWxpemUiLCJwcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsQ0FBMUI7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxDQUE1QjtBQUVBLElBQU1DLHlCQUF5QixHQUFHLENBQWxDO0FBQ0EsSUFBTUMsNkJBQTZCLEdBQUcsQ0FBdEM7QUFDQSxJQUFNQyxnQ0FBZ0MsR0FBRyxD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UUMsRUFBRSxDQUFDNUIsS0FBSCxDQUFTNkIsS0FBVCxDQUFlQyxLQUFmOzswRUFNUkg7Ozs7O1dBQ09DLEVBQUUsQ0FBQzVCLEtBQUgsQ0FBUzZCLEtBQVQsQ0FBZUMsS0FBZjs7NkVBT1BIOzs7OztXQUNVQyxFQUFFLENBQUM1QixLQUFILENBQVM2QixLQUFULENBQWVDLEtBQWY7OzZFQU9WSDs7Ozs7V0FDVUMsRUFBRSxDQUFDNUIsS0FBSCxDQUFTNkIsS0FBVCxDQUFlQyxLQUFmOzs7Ozs7O1dBVUEsSUFBSTdCLGtCQUFKOzs7Ozs7O1dBVUcsSUFBSUEsa0JBQUo7Ozs7Ozs7V0FVQSxJQUFJQSxrQkFBSjs7OztBQXNCbEJILFNBQVMsS0FBS08sYUFBYSxDQUFDMEIsU0FBZCxDQUF3QkMsa0JBQXhCLEdBQTZDLFVBQVNDLEtBQVQsRUFBZTtBQUFDLFNBQU9wQyxpQkFBaUIsQ0FBQyxLQUFLYSxLQUFOLENBQXhCO0FBQXNDLENBQXhHLENBQVQ7QUFFQWtCLEVBQUUsQ0FBQ3ZCLGFBQUgsR0FBbUJBLGFBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcbmltcG9ydCBFbnVtIGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDRW51bSc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCB7IEdyYWRpZW50LCBBbHBoYUtleSwgQ29sb3JLZXkgfSBmcm9tICcuL2dyYWRpZW50JztcblxuY29uc3QgR1JBRElFTlRfTU9ERV9GSVggPSAwO1xuY29uc3QgR1JBRElFTlRfTU9ERV9CTEVORCA9IDE7XG5cbmNvbnN0IEdSQURJRU5UX1JBTkdFX01PREVfQ09MT1IgPSAwO1xuY29uc3QgR1JBRElFTlRfUkFOR0VfTU9ERV9UV09fQ09MT1IgPSAxO1xuY29uc3QgR1JBRElFTlRfUkFOR0VfTU9ERV9SQU5ET01fQ09MT1IgPSAyO1xuY29uc3QgR1JBRElFTlRfUkFOR0VfTU9ERV9HUkFESUVOVCA9IDM7XG5jb25zdCBHUkFESUVOVF9SQU5HRV9NT0RFX1RXT19HUkFESUVOVCA9IDQ7XG5cbmNvbnN0IFNlcmlhbGl6YWJsZVRhYmxlID0gQ0NfRURJVE9SICYmIFtcbiAgICBbIFwiX21vZGVcIiwgXCJjb2xvclwiIF0sXG4gICAgWyBcIl9tb2RlXCIsIFwiZ3JhZGllbnRcIiBdLFxuICAgIFsgXCJfbW9kZVwiLCBcImNvbG9yTWluXCIsIFwiY29sb3JNYXhcIiBdLFxuICAgIFsgXCJfbW9kZVwiLCBcImdyYWRpZW50TWluXCIsIFwiZ3JhZGllbnRNYXhcIl0sXG4gICAgWyBcIl9tb2RlXCIsIFwiZ3JhZGllbnRcIiBdXG5dO1xuXG5jb25zdCBNb2RlID0gRW51bSh7XG4gICAgQ29sb3I6IDAsXG4gICAgR3JhZGllbnQ6IDEsXG4gICAgVHdvQ29sb3JzOiAyLFxuICAgIFR3b0dyYWRpZW50czogMyxcbiAgICBSYW5kb21Db2xvcjogNCxcbn0pO1xuXG4vKipcbiAqICEjZW4gVGhlIGdyYWRpZW50IHJhbmdlIG9mIGNvbG9yLlxuICogISN6aCDpopzoibLlgLznmoTmuJDlj5jojIPlm7RcbiAqIEBjbGFzcyBHcmFkaWVudFJhbmdlXG4gKi9cbkBjY2NsYXNzKCdjYy5HcmFkaWVudFJhbmdlJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYWRpZW50UmFuZ2Uge1xuXG4gICAgc3RhdGljIE1vZGUgPSBNb2RlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX21vZGUgPSBNb2RlLkNvbG9yO1xuICAgIC8qKlxuICAgICAqICEjZW4gR3JhZGllbnQgdHlwZS5cbiAgICAgKiAhI3poIOa4kOWPmOiJsuexu+Wei+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TW9kZX0gbW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IE1vZGUsXG4gICAgfSlcbiAgICBnZXQgbW9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlO1xuICAgIH1cblxuICAgIHNldCBtb2RlIChtKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGlmIChtID09PSBNb2RlLlJhbmRvbUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JhZGllbnQuY29sb3JLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYWRpZW50LmNvbG9yS2V5cy5wdXNoKG5ldyBDb2xvcktleSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JhZGllbnQuYWxwaGFLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyYWRpZW50LmFscGhhS2V5cy5wdXNoKG5ldyBBbHBoYUtleSgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZSA9IG07XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX2NvbG9yID0gY2MuQ29sb3IuV0hJVEUuY2xvbmUoKTtcbiAgICAvKiogXG4gICAgICogISNlbiBUaGUgY29sb3Igd2hlbiBtb2RlIGlzIENvbG9yLlxuICAgICAqICEjemgg5b2TIG1vZGUg5Li6IENvbG9yIOaXtueahOminOiJsuOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q29sb3J9IGNvbG9yXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgY29sb3IgPSBjYy5Db2xvci5XSElURS5jbG9uZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBMb3dlciBjb2xvciBsaW1pdCB3aGVuIG1vZGUgaXMgVHdvQ29sb3JzLlxuICAgICAqICEjemgg5b2TIG1vZGUg5Li6IFR3b0NvbG9ycyDml7bnmoTpopzoibLkuIvpmZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0NvbG9yfSBjb2xvck1pblxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGNvbG9yTWluID0gY2MuQ29sb3IuV0hJVEUuY2xvbmUoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVXBwZXIgY29sb3IgbGltaXQgd2hlbiBtb2RlIGlzIFR3b0NvbG9ycy5cbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29Db2xvcnMg5pe255qE6aKc6Imy5LiK6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtDb2xvcn0gY29sb3JNYXhcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBjb2xvck1heCA9IGNjLkNvbG9yLldISVRFLmNsb25lKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbG9yIGdyYWRpZW50IHdoZW4gbW9kZSBpcyBHcmFkaWVudFxuICAgICAqICEjemgg5b2TIG1vZGUg5Li6IEdyYWRpZW50IOaXtueahOminOiJsua4kOWPmOOAglxuICAgICAqIEBwcm9wZXJ0eSB7R3JhZGllbnR9IGdyYWRpZW50XG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogR3JhZGllbnQsXG4gICAgfSlcbiAgICBncmFkaWVudCA9IG5ldyBHcmFkaWVudCgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBMb3dlciBjb2xvciBncmFkaWVudCBsaW1pdCB3aGVuIG1vZGUgaXMgVHdvR3JhZGllbnRzLlxuICAgICAqICEjemgg5b2TIG1vZGUg5Li6IFR3b0dyYWRpZW50cyDml7bnmoTpopzoibLmuJDlj5jkuIvpmZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0dyYWRpZW50fSBncmFkaWVudE1pblxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEdyYWRpZW50LFxuICAgIH0pXG4gICAgZ3JhZGllbnRNaW4gPSBuZXcgR3JhZGllbnQoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVXBwZXIgY29sb3IgZ3JhZGllbnQgbGltaXQgd2hlbiBtb2RlIGlzIFR3b0dyYWRpZW50cy5cbiAgICAgKiAhI3poIOW9kyBtb2RlIOS4uiBUd29HcmFkaWVudHMg5pe255qE6aKc6Imy5riQ5Y+Y5LiK6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtHcmFkaWVudH0gZ3JhZGllbnRNYXhcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBHcmFkaWVudCxcbiAgICB9KVxuICAgIGdyYWRpZW50TWF4ID0gbmV3IEdyYWRpZW50KCk7XG5cbiAgICBldmFsdWF0ZSAodGltZSwgcm5kUmF0aW8pIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9tb2RlKSB7XG4gICAgICAgICAgICBjYXNlIE1vZGUuQ29sb3I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3I7XG4gICAgICAgICAgICBjYXNlIE1vZGUuVHdvQ29sb3JzOlxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JNaW4ubGVycCh0aGlzLmNvbG9yTWF4LCBybmRSYXRpbywgdGhpcy5fY29sb3IpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICAgICAgICAgIGNhc2UgTW9kZS5SYW5kb21Db2xvcjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ncmFkaWVudC5yYW5kb21Db2xvcigpO1xuICAgICAgICAgICAgY2FzZSBNb2RlLkdyYWRpZW50OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdyYWRpZW50LmV2YWx1YXRlKHRpbWUpO1xuICAgICAgICAgICAgY2FzZSBNb2RlLlR3b0dyYWRpZW50czpcbiAgICAgICAgICAgICAgICB0aGlzLmdyYWRpZW50TWluLmV2YWx1YXRlKHRpbWUpLmxlcnAodGhpcy5ncmFkaWVudE1heC5ldmFsdWF0ZSh0aW1lKSwgcm5kUmF0aW8sIHRoaXMuX2NvbG9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5DQ19FRElUT1IgJiYgKEdyYWRpZW50UmFuZ2UucHJvdG90eXBlLl9vbkJlZm9yZVNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHByb3BzKXtyZXR1cm4gU2VyaWFsaXphYmxlVGFibGVbdGhpcy5fbW9kZV07fSk7XG5cbmNjLkdyYWRpZW50UmFuZ2UgPSBHcmFkaWVudFJhbmdlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=