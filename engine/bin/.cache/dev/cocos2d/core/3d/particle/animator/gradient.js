
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/gradient.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.Gradient = exports.AlphaKey = exports.ColorKey = void 0;

var _CCClassDecorator = require("../../../platform/CCClassDecorator");

var _CCEnum = _interopRequireDefault(require("../../../platform/CCEnum"));

var _valueTypes = require("../../../value-types");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp, _dec2, _class4, _class5, _descriptor3, _descriptor4, _temp2, _dec3, _dec4, _dec5, _dec6, _class7, _class8, _descriptor5, _descriptor6, _descriptor7, _class9, _temp3;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var Mode = (0, _CCEnum["default"])({
  Blend: 0,
  Fixed: 1
});
/**
 * !#en The color key of gradient.
 * !#zh color 关键帧
 * @class ColorKey
 */

var ColorKey = (_dec = (0, _CCClassDecorator.ccclass)('cc.ColorKey'), _dec(_class = (_class2 = (_temp = function ColorKey() {
  _initializerDefineProperty(this, "color", _descriptor, this);

  _initializerDefineProperty(this, "time", _descriptor2, this);
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "color", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return cc.Color.WHITE.clone();
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
/**
 * !#en The alpha key of gradient.
 * !#zh alpha 关键帧
 * @class AlphaKey
 */

exports.ColorKey = ColorKey;
var AlphaKey = (_dec2 = (0, _CCClassDecorator.ccclass)('cc.AlphaKey'), _dec2(_class4 = (_class5 = (_temp2 = function AlphaKey() {
  _initializerDefineProperty(this, "alpha", _descriptor3, this);

  _initializerDefineProperty(this, "time", _descriptor4, this);
}, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "alpha", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class5.prototype, "time", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class5)) || _class4);
/**
 * !#en The gradient data of color.
 * !#zh 颜色渐变数据
 * @class Gradient
 */

exports.AlphaKey = AlphaKey;
var Gradient = (_dec3 = (0, _CCClassDecorator.ccclass)('cc.Gradient'), _dec4 = (0, _CCClassDecorator.property)({
  type: [ColorKey]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: [AlphaKey]
}), _dec6 = (0, _CCClassDecorator.property)({
  type: Mode
}), _dec3(_class7 = (_class8 = (_temp3 = _class9 = /*#__PURE__*/function () {
  function Gradient() {
    _initializerDefineProperty(this, "colorKeys", _descriptor5, this);

    _initializerDefineProperty(this, "alphaKeys", _descriptor6, this);

    _initializerDefineProperty(this, "mode", _descriptor7, this);

    this._color = null;
    this._color = cc.Color.WHITE.clone();
  }

  var _proto = Gradient.prototype;

  _proto.setKeys = function setKeys(colorKeys, alphaKeys) {
    this.colorKeys = colorKeys;
    this.alphaKeys = alphaKeys;
  };

  _proto.sortKeys = function sortKeys() {
    if (this.colorKeys.length > 1) {
      this.colorKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }

    if (this.alphaKeys.length > 1) {
      this.alphaKeys.sort(function (a, b) {
        return a.time - b.time;
      });
    }
  };

  _proto.evaluate = function evaluate(time) {
    this.getRGB(time);

    this._color._fastSetA(this.getAlpha(time));

    return this._color;
  };

  _proto.randomColor = function randomColor() {
    var c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
    var a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];

    this._color.set(c.color);

    this._color._fastSetA(a.alpha);

    return this._color;
  };

  _proto.getRGB = function getRGB(time) {
    if (this.colorKeys.length > 1) {
      time = (0, _valueTypes.repeat)(time, 1);

      for (var i = 1; i < this.colorKeys.length; ++i) {
        var preTime = this.colorKeys[i - 1].time;
        var curTime = this.colorKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.colorKeys[i].color;
          }

          var factor = (time - preTime) / (curTime - preTime);
          this.colorKeys[i - 1].color.lerp(this.colorKeys[i].color, factor, this._color);
          return this._color;
        }
      }

      var lastIndex = this.colorKeys.length - 1;

      if (time < this.colorKeys[0].time) {
        cc.Color.BLACK.lerp(this.colorKeys[0].color, time / this.colorKeys[0].time, this._color);
      } else if (time > this.colorKeys[lastIndex].time) {
        this.colorKeys[lastIndex].color.lerp(cc.Color.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time), this._color);
      } // console.warn('something went wrong. can not get gradient color.');

    } else if (this.colorKeys.length === 1) {
      this._color.set(this.colorKeys[0].color);

      return this._color;
    } else {
      this._color.set(cc.Color.WHITE);

      return this._color;
    }
  };

  _proto.getAlpha = function getAlpha(time) {
    if (this.alphaKeys.length > 1) {
      time = (0, _valueTypes.repeat)(time, 1);

      for (var i = 1; i < this.alphaKeys.length; ++i) {
        var preTime = this.alphaKeys[i - 1].time;
        var curTime = this.alphaKeys[i].time;

        if (time >= preTime && time < curTime) {
          if (this.mode === Mode.Fixed) {
            return this.alphaKeys[i].alpha;
          }

          var factor = (time - preTime) / (curTime - preTime);
          return (0, _valueTypes.lerp)(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
        }
      }

      var lastIndex = this.alphaKeys.length - 1;

      if (time < this.alphaKeys[0].time) {
        return (0, _valueTypes.lerp)(255, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
      } else if (time > this.alphaKeys[lastIndex].time) {
        return (0, _valueTypes.lerp)(this.alphaKeys[lastIndex].alpha, 255, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
      }
    } else if (this.alphaKeys.length === 1) {
      return this.alphaKeys[0].alpha;
    } else {
      return 255;
    }
  };

  return Gradient;
}(), _class9.Mode = Mode, _temp3), (_descriptor5 = _applyDecoratedDescriptor(_class8.prototype, "colorKeys", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class8.prototype, "alphaKeys", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class8.prototype, "mode", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Mode.Blend;
  }
})), _class8)) || _class7);
exports.Gradient = Gradient;
cc.ColorKey = ColorKey;
cc.AlphaKey = AlphaKey;
cc.Gradient = Gradient;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL2dyYWRpZW50LnRzIl0sIm5hbWVzIjpbIk1vZGUiLCJCbGVuZCIsIkZpeGVkIiwiQ29sb3JLZXkiLCJwcm9wZXJ0eSIsImNjIiwiQ29sb3IiLCJXSElURSIsImNsb25lIiwiQWxwaGFLZXkiLCJHcmFkaWVudCIsInR5cGUiLCJfY29sb3IiLCJzZXRLZXlzIiwiY29sb3JLZXlzIiwiYWxwaGFLZXlzIiwic29ydEtleXMiLCJsZW5ndGgiLCJzb3J0IiwiYSIsImIiLCJ0aW1lIiwiZXZhbHVhdGUiLCJnZXRSR0IiLCJfZmFzdFNldEEiLCJnZXRBbHBoYSIsInJhbmRvbUNvbG9yIiwiYyIsIk1hdGgiLCJ0cnVuYyIsInJhbmRvbSIsInNldCIsImNvbG9yIiwiYWxwaGEiLCJpIiwicHJlVGltZSIsImN1clRpbWUiLCJtb2RlIiwiZmFjdG9yIiwibGVycCIsImxhc3RJbmRleCIsIkJMQUNLIiwiQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFFQSxJQUFNQSxJQUFJLEdBQUcsd0JBQUs7QUFDZEMsRUFBQUEsS0FBSyxFQUFFLENBRE87QUFFZEMsRUFBQUEsS0FBSyxFQUFFO0FBRk8sQ0FBTCxDQUFiO0FBS0E7Ozs7OztJQU1hQyxtQkFEWiwrQkFBUSxhQUFSOzs7O2lGQUdJQzs7Ozs7V0FDT0MsRUFBRSxDQUFDQyxLQUFILENBQVNDLEtBQVQsQ0FBZUMsS0FBZjs7eUVBRVBKOzs7OztXQUNNOzs7QUFHWDs7Ozs7OztJQU1hSyxvQkFEWiwrQkFBUSxhQUFSOzs7O21GQUdJTDs7Ozs7V0FDTzs7eUVBRVBBOzs7OztXQUNNOzs7QUFHWDs7Ozs7OztJQU1hTSxvQkFEWiwrQkFBUSxhQUFSLFdBS0ksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFLENBQUNSLFFBQUQ7QUFEQSxDQUFULFdBS0EsZ0NBQVM7QUFD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S0FBS3pCLFNBQUwsQ0FBZUUsTUFBZixHQUF3QixDQUExQzs7QUFDQSxVQUFJSSxJQUFJLEdBQUcsS0FBS04sU0FBTCxDQUFlLENBQWYsRUFBa0JNLElBQTdCLEVBQW1DO0FBQy9CLGVBQU8sc0JBQUssR0FBTCxFQUFVLEtBQUtOLFNBQUwsQ0FBZSxDQUFmLEVBQWtCa0IsS0FBNUIsRUFBbUNaLElBQUksR0FBRyxLQUFLTixTQUFMLENBQWUsQ0FBZixFQUFrQk0sSUFBNUQsQ0FBUDtBQUNILE9BRkQsTUFFTyxJQUFJQSxJQUFJLEdBQUcsS0FBS04sU0FBTCxDQUFleUIsU0FBZixFQUEwQm5CLElBQXJDLEVBQTJDO0FBQzlDLGVBQU8sc0JBQUssS0FBS04sU0FBTCxDQUFleUIsU0FBZixFQUEwQlAsS0FBL0IsRUFBc0MsR0FBdEMsRUFBMkMsQ0FBQ1osSUFBSSxHQUFHLEtBQUtOLFNBQUwsQ0FBZXlCLFNBQWYsRUFBMEJuQixJQUFsQyxLQUEyQyxJQUFJLEtBQUtOLFNBQUwsQ0FBZXlCLFNBQWYsRUFBMEJuQixJQUF6RSxDQUEzQyxDQUFQO0FBQ0g7QUFDSixLQW5CRCxNQW1CTyxJQUFJLEtBQUtOLFNBQUwsQ0FBZUUsTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUNwQyxhQUFPLEtBQUtGLFNBQUwsQ0FBZSxDQUFmLEVBQWtCa0IsS0FBekI7QUFDSCxLQUZNLE1BRUE7QUFDSCxhQUFPLEdBQVA7QUFDSDtBQUNKOzs7YUEzR01qQyxPQUFPQTs7Ozs7V0FLRixJQUFJMEMsS0FBSjs7Ozs7OztXQUtBLElBQUlBLEtBQUo7Ozs7Ozs7V0FLTDFDLElBQUksQ0FBQ0M7Ozs7QUErRmhCSSxFQUFFLENBQUNGLFFBQUgsR0FBY0EsUUFBZDtBQUNBRSxFQUFFLENBQUNJLFFBQUgsR0FBY0EsUUFBZDtBQUNBSixFQUFFLENBQUNLLFFBQUgsR0FBY0EsUUFBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XG5pbXBvcnQgRW51bSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0VudW0nO1xuaW1wb3J0IHsgbGVycCwgcmVwZWF0IH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXG5cbmNvbnN0IE1vZGUgPSBFbnVtKHtcbiAgICBCbGVuZDogMCxcbiAgICBGaXhlZDogMSxcbn0pO1xuXG4vKipcbiAqICEjZW4gVGhlIGNvbG9yIGtleSBvZiBncmFkaWVudC5cbiAqICEjemggY29sb3Ig5YWz6ZSu5binXG4gKiBAY2xhc3MgQ29sb3JLZXlcbiAqL1xuQGNjY2xhc3MoJ2NjLkNvbG9yS2V5JylcbmV4cG9ydCBjbGFzcyBDb2xvcktleSB7XG5cbiAgICBAcHJvcGVydHlcbiAgICBjb2xvciA9IGNjLkNvbG9yLldISVRFLmNsb25lKCk7XG5cbiAgICBAcHJvcGVydHlcbiAgICB0aW1lID0gMDtcbn1cblxuLyoqXG4gKiAhI2VuIFRoZSBhbHBoYSBrZXkgb2YgZ3JhZGllbnQuXG4gKiAhI3poIGFscGhhIOWFs+mUruW4p1xuICogQGNsYXNzIEFscGhhS2V5XG4gKi9cbkBjY2NsYXNzKCdjYy5BbHBoYUtleScpXG5leHBvcnQgY2xhc3MgQWxwaGFLZXkge1xuXG4gICAgQHByb3BlcnR5XG4gICAgYWxwaGEgPSAxO1xuXG4gICAgQHByb3BlcnR5XG4gICAgdGltZSA9IDA7XG59XG5cbi8qKlxuICogISNlbiBUaGUgZ3JhZGllbnQgZGF0YSBvZiBjb2xvci5cbiAqICEjemgg6aKc6Imy5riQ5Y+Y5pWw5o2uXG4gKiBAY2xhc3MgR3JhZGllbnRcbiAqL1xuQGNjY2xhc3MoJ2NjLkdyYWRpZW50JylcbmV4cG9ydCBjbGFzcyBHcmFkaWVudCB7XG5cbiAgICBzdGF0aWMgTW9kZSA9IE1vZGU7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbQ29sb3JLZXldLFxuICAgIH0pXG4gICAgY29sb3JLZXlzID0gbmV3IEFycmF5KCk7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBbQWxwaGFLZXldLFxuICAgIH0pXG4gICAgYWxwaGFLZXlzID0gbmV3IEFycmF5KCk7XG5cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBNb2RlLFxuICAgIH0pXG4gICAgbW9kZSA9IE1vZGUuQmxlbmQ7XG5cbiAgICBfY29sb3IgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLl9jb2xvciA9IGNjLkNvbG9yLldISVRFLmNsb25lKCk7XG4gICAgfVxuXG4gICAgc2V0S2V5cyAoY29sb3JLZXlzLCBhbHBoYUtleXMpIHtcbiAgICAgICAgdGhpcy5jb2xvcktleXMgPSBjb2xvcktleXM7XG4gICAgICAgIHRoaXMuYWxwaGFLZXlzID0gYWxwaGFLZXlzO1xuICAgIH1cblxuICAgIHNvcnRLZXlzICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sb3JLZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3JLZXlzLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWxwaGFLZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuYWxwaGFLZXlzLnNvcnQoKGEsIGIpID0+IGEudGltZSAtIGIudGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBldmFsdWF0ZSAodGltZSkge1xuICAgICAgICB0aGlzLmdldFJHQih0aW1lKTtcbiAgICAgICAgdGhpcy5fY29sb3IuX2Zhc3RTZXRBKHRoaXMuZ2V0QWxwaGEodGltZSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgfVxuXG4gICAgcmFuZG9tQ29sb3IgKCkge1xuICAgICAgICBjb25zdCBjID0gdGhpcy5jb2xvcktleXNbTWF0aC50cnVuYyhNYXRoLnJhbmRvbSgpICogdGhpcy5jb2xvcktleXMubGVuZ3RoKV07XG4gICAgICAgIGNvbnN0IGEgPSB0aGlzLmFscGhhS2V5c1tNYXRoLnRydW5jKE1hdGgucmFuZG9tKCkgKiB0aGlzLmFscGhhS2V5cy5sZW5ndGgpXTtcbiAgICAgICAgdGhpcy5fY29sb3Iuc2V0KGMuY29sb3IpO1xuICAgICAgICB0aGlzLl9jb2xvci5fZmFzdFNldEEoYS5hbHBoYSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICB9XG5cbiAgICBnZXRSR0IgKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY29sb3JLZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRpbWUgPSByZXBlYXQodGltZSwgMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuY29sb3JLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlVGltZSA9IHRoaXMuY29sb3JLZXlzW2kgLSAxXS50aW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1clRpbWUgPSB0aGlzLmNvbG9yS2V5c1tpXS50aW1lO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lID49IHByZVRpbWUgJiYgdGltZSA8IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTW9kZS5GaXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sb3JLZXlzW2ldLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9ICh0aW1lIC0gcHJlVGltZSkgLyAoY3VyVGltZSAtIHByZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9yS2V5c1tpIC0gMV0uY29sb3IubGVycCh0aGlzLmNvbG9yS2V5c1tpXS5jb2xvciwgZmFjdG9yLCB0aGlzLl9jb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmNvbG9yS2V5cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHRpbWUgPCB0aGlzLmNvbG9yS2V5c1swXS50aW1lKSB7XG4gICAgICAgICAgICAgICAgY2MuQ29sb3IuQkxBQ0subGVycCh0aGlzLmNvbG9yS2V5c1swXS5jb2xvciwgdGltZSAvIHRoaXMuY29sb3JLZXlzWzBdLnRpbWUsIHRoaXMuX2NvbG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZSA+IHRoaXMuY29sb3JLZXlzW2xhc3RJbmRleF0udGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JLZXlzW2xhc3RJbmRleF0uY29sb3IubGVycChjYy5Db2xvci5CTEFDSywgKHRpbWUgLSB0aGlzLmNvbG9yS2V5c1tsYXN0SW5kZXhdLnRpbWUpIC8gKDEgLSB0aGlzLmNvbG9yS2V5c1tsYXN0SW5kZXhdLnRpbWUpLCB0aGlzLl9jb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ3NvbWV0aGluZyB3ZW50IHdyb25nLiBjYW4gbm90IGdldCBncmFkaWVudCBjb2xvci4nKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvbG9yS2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh0aGlzLmNvbG9yS2V5c1swXS5jb2xvcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQoY2MuQ29sb3IuV0hJVEUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0QWxwaGEgKHRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxwaGFLZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRpbWUgPSByZXBlYXQodGltZSwgMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMuYWxwaGFLZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlVGltZSA9IHRoaXMuYWxwaGFLZXlzW2kgLSAxXS50aW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1clRpbWUgPSB0aGlzLmFscGhhS2V5c1tpXS50aW1lO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lID49IHByZVRpbWUgJiYgdGltZSA8IGN1clRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gTW9kZS5GaXhlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxwaGFLZXlzW2ldLmFscGhhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY3RvciA9ICh0aW1lIC0gcHJlVGltZSkgLyAoY3VyVGltZSAtIHByZVRpbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGVycCh0aGlzLmFscGhhS2V5c1tpIC0gMV0uYWxwaGEgLCB0aGlzLmFscGhhS2V5c1tpXS5hbHBoYSAsIGZhY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbGFzdEluZGV4ID0gdGhpcy5hbHBoYUtleXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0aW1lIDwgdGhpcy5hbHBoYUtleXNbMF0udGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZXJwKDI1NSwgdGhpcy5hbHBoYUtleXNbMF0uYWxwaGEsIHRpbWUgLyB0aGlzLmFscGhhS2V5c1swXS50aW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGltZSA+IHRoaXMuYWxwaGFLZXlzW2xhc3RJbmRleF0udGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsZXJwKHRoaXMuYWxwaGFLZXlzW2xhc3RJbmRleF0uYWxwaGEsIDI1NSwgKHRpbWUgLSB0aGlzLmFscGhhS2V5c1tsYXN0SW5kZXhdLnRpbWUpIC8gKDEgLSB0aGlzLmFscGhhS2V5c1tsYXN0SW5kZXhdLnRpbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFscGhhS2V5cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFscGhhS2V5c1swXS5hbHBoYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAyNTU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNjLkNvbG9yS2V5ID0gQ29sb3JLZXk7XG5jYy5BbHBoYUtleSA9IEFscGhhS2V5O1xuY2MuR3JhZGllbnQgPSBHcmFkaWVudDtcblxuIl0sInNvdXJjZVJvb3QiOiIvIn0=