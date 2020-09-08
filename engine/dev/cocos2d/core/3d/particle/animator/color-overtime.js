
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/color-overtime.js';
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

var _valueTypes = require("../../../value-types");

var _gradientRange = _interopRequireDefault(require("./gradient-range"));

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var COLOR_OVERTIME_RAND_OFFSET = 91041;
/**
 * !#en The color over time module of 3d particle.
 * !#zh 3D 粒子颜色变化模块
 * @class ColorOvertimeModule
 */

var ColorOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.ColorOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function ColorOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "color", _descriptor2, this);
  }

  var _proto = ColorOvertimeModule.prototype;

  _proto.animate = function animate(particle) {
    if (this.enable) {
      particle.color.set(particle.startColor);
      particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, (0, _valueTypes.pseudoRandom)(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
    }
  };

  return ColorOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "color", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = ColorOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL2NvbG9yLW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIkNPTE9SX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiQ29sb3JPdmVydGltZU1vZHVsZSIsInR5cGUiLCJHcmFkaWVudFJhbmdlIiwiYW5pbWF0ZSIsInBhcnRpY2xlIiwiZW5hYmxlIiwiY29sb3IiLCJzZXQiLCJzdGFydENvbG9yIiwibXVsdGlwbHkiLCJldmFsdWF0ZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsInJhbmRvbVNlZWQiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSwwQkFBMEIsR0FBRyxLQUFuQztBQUVBOzs7Ozs7SUFNcUJDLDhCQURwQiwrQkFBUSx3QkFBUixXQWdCSSxnQ0FBUztBQUNOQyxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVDs7Ozs7Ozs7O1NBS0RDLFVBQUEsaUJBQVNDLFFBQVQsRUFBbUI7QUFDZixRQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYkQsTUFBQUEsUUFBUSxDQUFDRSxLQUFULENBQWVDLEdBQWYsQ0FBbUJILFFBQVEsQ0FBQ0ksVUFBNUI7QUFDQUosTUFBQUEsUUFBUSxDQUFDRSxLQUFULENBQWVHLFFBQWYsQ0FBd0IsS0FBS0gsS0FBTCxDQUFXSSxRQUFYLENBQW9CLE1BQU1OLFFBQVEsQ0FBQ08saUJBQVQsR0FBNkJQLFFBQVEsQ0FBQ1EsYUFBaEUsRUFBK0UsOEJBQWFSLFFBQVEsQ0FBQ1MsVUFBVCxHQUFzQmQsMEJBQW5DLENBQS9FLENBQXhCO0FBQ0g7QUFDSjs7O29GQWxCQWU7Ozs7O1dBQ1E7Ozs7Ozs7V0FVRCxJQUFJWix5QkFBSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcidcbmltcG9ydCB7IHBzZXVkb1JhbmRvbSwgQ29sb3IgfSBmcm9tICcuLi8uLi8uLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgR3JhZGllbnRSYW5nZSBmcm9tICcuL2dyYWRpZW50LXJhbmdlJztcblxuY29uc3QgQ09MT1JfT1ZFUlRJTUVfUkFORF9PRkZTRVQgPSA5MTA0MTtcblxuLyoqXG4gKiAhI2VuIFRoZSBjb2xvciBvdmVyIHRpbWUgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDpopzoibLlj5jljJbmqKHlnZdcbiAqIEBjbGFzcyBDb2xvck92ZXJ0aW1lTW9kdWxlXG4gKi9cbkBjY2NsYXNzKCdjYy5Db2xvck92ZXJ0aW1lTW9kdWxlJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yT3ZlcnRpbWVNb2R1bGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIENvbG9yT3ZlcnRpbWVNb2R1bGUuXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGVuYWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcGFyYW1ldGVyIG9mIGNvbG9yIGNoYW5nZSBvdmVyIHRpbWUsIHRoZSBsaW5lYXIgZGlmZmVyZW5jZSBiZXR3ZWVuIGVhY2gga2V5IGNoYW5nZXMuXG4gICAgICogISN6aCDpopzoibLpmo/ml7bpl7Tlj5jljJbnmoTlj4LmlbDvvIzlkITkuKoga2V5IOS5i+mXtOe6v+aAp+W3ruWAvOWPmOWMluOAglxuICAgICAqIEB0eXBlIHtHcmFkaWVudFJhbmdlfSBjb2xvclxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXG4gICAgfSlcbiAgICBjb2xvciA9IG5ldyBHcmFkaWVudFJhbmdlKCk7XG5cbiAgICBhbmltYXRlIChwYXJ0aWNsZSkge1xuICAgICAgICBpZiAodGhpcy5lbmFibGUpIHtcbiAgICAgICAgICAgIHBhcnRpY2xlLmNvbG9yLnNldChwYXJ0aWNsZS5zdGFydENvbG9yKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLmNvbG9yLm11bHRpcGx5KHRoaXMuY29sb3IuZXZhbHVhdGUoMS4wIC0gcGFydGljbGUucmVtYWluaW5nTGlmZXRpbWUgLyBwYXJ0aWNsZS5zdGFydExpZmV0aW1lLCBwc2V1ZG9SYW5kb20ocGFydGljbGUucmFuZG9tU2VlZCArIENPTE9SX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=