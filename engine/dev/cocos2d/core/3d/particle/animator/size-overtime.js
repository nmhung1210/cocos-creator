
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/size-overtime.js';
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

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var SIZE_OVERTIME_RAND_OFFSET = 39825;
/**
 * !#en The size module of 3d particle.
 * !#zh 3D 粒子的大小模块
 * @class SizeOvertimeModule
 */

var SizeOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.SizeOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  function SizeOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "separateAxes", _descriptor2, this);

    _initializerDefineProperty(this, "size", _descriptor3, this);

    _initializerDefineProperty(this, "x", _descriptor4, this);

    _initializerDefineProperty(this, "y", _descriptor5, this);

    _initializerDefineProperty(this, "z", _descriptor6, this);
  }

  var _proto = SizeOvertimeModule.prototype;

  _proto.animate = function animate(particle) {
    if (!this.separateAxes) {
      _valueTypes.Vec3.scale(particle.size, particle.startSize, this.size.evaluate(1 - particle.remainingLifetime / particle.startLifetime, (0, _valueTypes.pseudoRandom)(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET)));
    } else {
      var currLifetime = 1 - particle.remainingLifetime / particle.startLifetime;
      var sizeRand = (0, _valueTypes.pseudoRandom)(particle.randomSeed + SIZE_OVERTIME_RAND_OFFSET);
      particle.size.x = particle.startSize.x * this.x.evaluate(currLifetime, sizeRand);
      particle.size.y = particle.startSize.y * this.y.evaluate(currLifetime, sizeRand);
      particle.size.z = particle.startSize.z * this.z.evaluate(currLifetime, sizeRand);
    }
  };

  return SizeOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = SizeOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL3NpemUtb3ZlcnRpbWUudHMiXSwibmFtZXMiOlsiU0laRV9PVkVSVElNRV9SQU5EX09GRlNFVCIsIlNpemVPdmVydGltZU1vZHVsZSIsInR5cGUiLCJDdXJ2ZVJhbmdlIiwiYW5pbWF0ZSIsInBhcnRpY2xlIiwic2VwYXJhdGVBeGVzIiwiVmVjMyIsInNjYWxlIiwic2l6ZSIsInN0YXJ0U2l6ZSIsImV2YWx1YXRlIiwicmVtYWluaW5nTGlmZXRpbWUiLCJzdGFydExpZmV0aW1lIiwicmFuZG9tU2VlZCIsImN1cnJMaWZldGltZSIsInNpemVSYW5kIiwieCIsInkiLCJ6IiwicHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSx5QkFBeUIsR0FBRyxLQUFsQztBQUVBOzs7Ozs7SUFNcUJDLDZCQURwQiwrQkFBUSx1QkFBUixXQXdCSSxnQ0FBUztBQUNOQyxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVCxXQVVBLGdDQUFTO0FBQ05ELEVBQUFBLElBQUksRUFBRUM7QUFEQSxDQUFULFdBVUEsZ0NBQVM7QUFDTkQsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FVQSxnQ0FBUztBQUNORCxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVDs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FLREMsVUFBQSxpQkFBU0MsUUFBVCxFQUFtQjtBQUNmLFFBQUksQ0FBQyxLQUFLQyxZQUFWLEVBQXdCO0FBQ3BCQyx1QkFBS0MsS0FBTCxDQUFXSCxRQUFRLENBQUNJLElBQXBCLEVBQTBCSixRQUFRLENBQUNLLFNBQW5DLEVBQThDLEtBQUtELElBQUwsQ0FBVUUsUUFBVixDQUFtQixJQUFJTixRQUFRLENBQUNPLGlCQUFULEdBQTZCUCxRQUFRLENBQUNRLGFBQTdELEVBQTRFLDhCQUFhUixRQUFRLENBQUNTLFVBQVQsR0FBc0JkLHlCQUFuQyxDQUE1RSxDQUE5QztBQUNILEtBRkQsTUFFTztBQUNILFVBQU1lLFlBQVksR0FBRyxJQUFJVixRQUFRLENBQUNPLGlCQUFULEdBQTZCUCxRQUFRLENBQUNRLGFBQS9EO0FBQ0EsVUFBTUcsUUFBUSxHQUFHLDhCQUFhWCxRQUFRLENBQUNTLFVBQVQsR0FBc0JkLHlCQUFuQyxDQUFqQjtBQUNBSyxNQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY1EsQ0FBZCxHQUFrQlosUUFBUSxDQUFDSyxTQUFULENBQW1CTyxDQUFuQixHQUF1QixLQUFLQSxDQUFMLENBQU9OLFFBQVAsQ0FBZ0JJLFlBQWhCLEVBQThCQyxRQUE5QixDQUF6QztBQUNBWCxNQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY1MsQ0FBZCxHQUFrQmIsUUFBUSxDQUFDSyxTQUFULENBQW1CUSxDQUFuQixHQUF1QixLQUFLQSxDQUFMLENBQU9QLFFBQVAsQ0FBZ0JJLFlBQWhCLEVBQThCQyxRQUE5QixDQUF6QztBQUNBWCxNQUFBQSxRQUFRLENBQUNJLElBQVQsQ0FBY1UsQ0FBZCxHQUFrQmQsUUFBUSxDQUFDSyxTQUFULENBQW1CUyxDQUFuQixHQUF1QixLQUFLQSxDQUFMLENBQU9SLFFBQVAsQ0FBZ0JJLFlBQWhCLEVBQThCQyxRQUE5QixDQUF6QztBQUNIO0FBQ0o7OztvRkE3REFJOzs7OztXQUNROztpRkFPUkE7Ozs7O1dBQ2M7Ozs7Ozs7V0FVUixJQUFJakIsc0JBQUo7Ozs7Ozs7V0FVSCxJQUFJQSxzQkFBSjs7Ozs7OztXQVVBLElBQUlBLHNCQUFKOzs7Ozs7O1dBVUEsSUFBSUEsc0JBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InO1xuaW1wb3J0IHsgcHNldWRvUmFuZG9tLCBWZWMzIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi9jdXJ2ZS1yYW5nZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcbmNvbnN0IFNJWkVfT1ZFUlRJTUVfUkFORF9PRkZTRVQgPSAzOTgyNTtcblxuLyoqXG4gKiAhI2VuIFRoZSBzaXplIG1vZHVsZSBvZiAzZCBwYXJ0aWNsZS5cbiAqICEjemggM0Qg57KS5a2Q55qE5aSn5bCP5qih5Z2XXG4gKiBAY2xhc3MgU2l6ZU92ZXJ0aW1lTW9kdWxlXG4gKi9cbkBjY2NsYXNzKCdjYy5TaXplT3ZlcnRpbWVNb2R1bGUnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2l6ZU92ZXJ0aW1lTW9kdWxlIHtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGVuYWJsZSBvZiBTaXplT3ZlcnRpbWVNb2R1bGUuXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGVuYWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBEZWNpZGUgd2hldGhlciB0byBjb250cm9sIHBhcnRpY2xlIHNpemUgaW5kZXBlbmRlbnRseSBvbiBlYWNoIGF4aXMuXG4gICAgICogISN6aCDlhrPlrprmmK/lkKblnKjmr4/kuKrovbTkuIrni6znq4vmjqfliLbnspLlrZDlpKflsI/jgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHNlcGFyYXRlQXhlc1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHNlcGFyYXRlQXhlcyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBEZWZpbmUgYSBjdXJ2ZSB0byBkZXRlcm1pbmUgdGhlIHNpemUgY2hhbmdlIG9mIHBhcnRpY2xlcyBkdXJpbmcgdGhlaXIgbGlmZSBjeWNsZS5cbiAgICAgKiAhI3poIOWumuS5ieS4gOadoeabsue6v+adpeWGs+WumueykuWtkOWcqOWFtueUn+WRveWRqOacn+S4reeahOWkp+Wwj+WPmOWMluOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gc2l6ZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgfSlcbiAgICBzaXplID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gRGVmaW5lcyBhIGN1cnZlIHRvIGRldGVybWluZSB0aGUgc2l6ZSBjaGFuZ2Ugb2YgcGFydGljbGVzIGluIHRoZSBYLWF4aXMgZGlyZWN0aW9uIGR1cmluZyB0aGVpciBsaWZlIGN5Y2xlLlxuICAgICAqICEjemgg5a6a5LmJ5LiA5p2h5puy57q/5p2l5Yaz5a6a57KS5a2Q5Zyo5YW255Sf5ZG95ZGo5pyf5LitIFgg6L205pa55ZCR5LiK55qE5aSn5bCP5Y+Y5YyW44CCXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB4XG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICB9KVxuICAgIHggPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBEZWZpbmVzIGEgY3VydmUgdG8gZGV0ZXJtaW5lIHRoZSBzaXplIGNoYW5nZSBvZiBwYXJ0aWNsZXMgaW4gdGhlIFktYXhpcyBkaXJlY3Rpb24gZHVyaW5nIHRoZWlyIGxpZmUgY3ljbGUuXG4gICAgICogISN6aCDlrprkuYnkuIDmnaHmm7Lnur/mnaXlhrPlrprnspLlrZDlnKjlhbbnlJ/lkb3lkajmnJ/kuK0gWSDovbTmlrnlkJHkuIrnmoTlpKflsI/lj5jljJbjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHlcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgeSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERlZmluZXMgYSBjdXJ2ZSB0byBkZXRlcm1pbmUgdGhlIHNpemUgY2hhbmdlIG9mIHBhcnRpY2xlcyBpbiB0aGUgWi1heGlzIGRpcmVjdGlvbiBkdXJpbmcgdGhlaXIgbGlmZSBjeWNsZS5cbiAgICAgKiAhI3poIOWumuS5ieS4gOadoeabsue6v+adpeWGs+WumueykuWtkOWcqOWFtueUn+WRveWRqOacn+S4rSBaIOi9tOaWueWQkeS4iueahOWkp+Wwj+WPmOWMluOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gelxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgfSlcbiAgICB6ID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIGFuaW1hdGUgKHBhcnRpY2xlKSB7XG4gICAgICAgIGlmICghdGhpcy5zZXBhcmF0ZUF4ZXMpIHtcbiAgICAgICAgICAgIFZlYzMuc2NhbGUocGFydGljbGUuc2l6ZSwgcGFydGljbGUuc3RhcnRTaXplLCB0aGlzLnNpemUuZXZhbHVhdGUoMSAtIHBhcnRpY2xlLnJlbWFpbmluZ0xpZmV0aW1lIC8gcGFydGljbGUuc3RhcnRMaWZldGltZSwgcHNldWRvUmFuZG9tKHBhcnRpY2xlLnJhbmRvbVNlZWQgKyBTSVpFX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY3VyckxpZmV0aW1lID0gMSAtIHBhcnRpY2xlLnJlbWFpbmluZ0xpZmV0aW1lIC8gcGFydGljbGUuc3RhcnRMaWZldGltZTtcbiAgICAgICAgICAgIGNvbnN0IHNpemVSYW5kID0gcHNldWRvUmFuZG9tKHBhcnRpY2xlLnJhbmRvbVNlZWQgKyBTSVpFX09WRVJUSU1FX1JBTkRfT0ZGU0VUKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnNpemUueCA9IHBhcnRpY2xlLnN0YXJ0U2l6ZS54ICogdGhpcy54LmV2YWx1YXRlKGN1cnJMaWZldGltZSwgc2l6ZVJhbmQpO1xuICAgICAgICAgICAgcGFydGljbGUuc2l6ZS55ID0gcGFydGljbGUuc3RhcnRTaXplLnkgKiB0aGlzLnkuZXZhbHVhdGUoY3VyckxpZmV0aW1lLCBzaXplUmFuZCk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5zaXplLnogPSBwYXJ0aWNsZS5zdGFydFNpemUueiAqIHRoaXMuei5ldmFsdWF0ZShjdXJyTGlmZXRpbWUsIHNpemVSYW5kKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9