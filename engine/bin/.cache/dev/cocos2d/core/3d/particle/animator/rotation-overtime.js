
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/rotation-overtime.js';
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

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var ROTATION_OVERTIME_RAND_OFFSET = 125292;
/**
 * !#en The rotation module of 3d particle.
 * !#zh 3D 粒子的旋转模块
 * @class RotationOvertimeModule
 */

var RotationOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.RotationOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  _createClass(RotationOvertimeModule, [{
    key: "separateAxes",

    /**
     * !#en The enable of RotationOvertimeModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */

    /**
     * !#en Whether to set the rotation of three axes separately (not currently supported)
     * !#zh 是否三个轴分开设定旋转（暂不支持）。
     * @property {Boolean} separateAxes
     */
    get: function get() {
      return this._separateAxes;
    },
    set: function set(val) {
      if (!val) {
        this._separateAxes = val;
      } else {
        console.error('rotation overtime separateAxes is not supported!');
      }
    }
    /**
     * !#en Set rotation around X axis.
     * !#zh 绕 X 轴设定旋转。
     * @property {CurveRange} x
     */

  }]);

  function RotationOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "_separateAxes", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);
  }

  var _proto = RotationOvertimeModule.prototype;

  _proto.animate = function animate(p, dt) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    if (!this._separateAxes) {
      p.rotation.x += this.z.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET)) * dt;
    } else {
      // TODO: separateAxes is temporarily not supported!
      var rotationRand = (0, _valueTypes.pseudoRandom)(p.randomSeed + ROTATION_OVERTIME_RAND_OFFSET);
      p.rotation.x += this.x.evaluate(normalizedTime, rotationRand) * dt;
      p.rotation.y += this.y.evaluate(normalizedTime, rotationRand) * dt;
      p.rotation.z += this.z.evaluate(normalizedTime, rotationRand) * dt;
    }
  };

  return RotationOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_separateAxes", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "separateAxes"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = RotationOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL3JvdGF0aW9uLW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIlJPVEFUSU9OX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiUm90YXRpb25PdmVydGltZU1vZHVsZSIsInR5cGUiLCJDdXJ2ZVJhbmdlIiwicmFuZ2UiLCJyYWRpYW4iLCJfc2VwYXJhdGVBeGVzIiwidmFsIiwiY29uc29sZSIsImVycm9yIiwiYW5pbWF0ZSIsInAiLCJkdCIsIm5vcm1hbGl6ZWRUaW1lIiwicmVtYWluaW5nTGlmZXRpbWUiLCJzdGFydExpZmV0aW1lIiwicm90YXRpb24iLCJ4IiwieiIsImV2YWx1YXRlIiwicmFuZG9tU2VlZCIsInJvdGF0aW9uUmFuZCIsInkiLCJwcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSw2QkFBNkIsR0FBRyxNQUF0QztBQUVBOzs7Ozs7SUFNcUJDLGlDQURwQiwrQkFBUSwyQkFBUixXQXNDSSxnQ0FBUztBQUNOQyxFQUFBQSxJQUFJLEVBQUVDLHNCQURBO0FBRU5DLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUwsQ0FGRDtBQUdOQyxFQUFBQSxNQUFNLEVBQUU7QUFIRixDQUFULFdBWUEsZ0NBQVM7QUFDTkgsRUFBQUEsSUFBSSxFQUFFQyxzQkFEQTtBQUVOQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBRkQ7QUFHTkMsRUFBQUEsTUFBTSxFQUFFO0FBSEYsQ0FBVCxXQVlBLGdDQUFTO0FBQ05ILEVBQUFBLElBQUksRUFBRUMsc0JBREE7QUFFTkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTCxDQUZEO0FBR05DLEVBQUFBLE1BQU0sRUFBRTtBQUhGLENBQVQ7Ozs7QUEzREQ7Ozs7OztBQVdBOzs7Ozt3QkFNb0I7QUFDaEIsYUFBTyxLQUFLQyxhQUFaO0FBQ0g7c0JBRWlCQyxLQUFLO0FBQ25CLFVBQUksQ0FBQ0EsR0FBTCxFQUFVO0FBQ04sYUFBS0QsYUFBTCxHQUFxQkMsR0FBckI7QUFDSCxPQUZELE1BR0s7QUFDREMsUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsa0RBQWQ7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozs7O0FBb0NBLG9DQUFlO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFFZDs7OztTQUVEQyxVQUFBLGlCQUFTQyxDQUFULEVBQVlDLEVBQVosRUFBZ0I7QUFDWixRQUFNQyxjQUFjLEdBQUcsSUFBSUYsQ0FBQyxDQUFDRyxpQkFBRixHQUFzQkgsQ0FBQyxDQUFDSSxhQUFuRDs7QUFDQSxRQUFJLENBQUMsS0FBS1QsYUFBVixFQUF5QjtBQUNyQkssTUFBQUEsQ0FBQyxDQUFDSyxRQUFGLENBQVdDLENBQVgsSUFBZ0IsS0FBS0MsQ0FBTCxDQUFPQyxRQUFQLENBQWdCTixjQUFoQixFQUFnQyw4QkFBYUYsQ0FBQyxDQUFDUyxVQUFGLEdBQWVwQiw2QkFBNUIsQ0FBaEMsSUFBOEZZLEVBQTlHO0FBQ0gsS0FGRCxNQUdLO0FBQ0Q7QUFDQSxVQUFNUyxZQUFZLEdBQUcsOEJBQWFWLENBQUMsQ0FBQ1MsVUFBRixHQUFlcEIsNkJBQTVCLENBQXJCO0FBQ0FXLE1BQUFBLENBQUMsQ0FBQ0ssUUFBRixDQUFXQyxDQUFYLElBQWdCLEtBQUtBLENBQUwsQ0FBT0UsUUFBUCxDQUFnQk4sY0FBaEIsRUFBZ0NRLFlBQWhDLElBQWdEVCxFQUFoRTtBQUNBRCxNQUFBQSxDQUFDLENBQUNLLFFBQUYsQ0FBV00sQ0FBWCxJQUFnQixLQUFLQSxDQUFMLENBQU9ILFFBQVAsQ0FBZ0JOLGNBQWhCLEVBQWdDUSxZQUFoQyxJQUFnRFQsRUFBaEU7QUFDQUQsTUFBQUEsQ0FBQyxDQUFDSyxRQUFGLENBQVdFLENBQVgsSUFBZ0IsS0FBS0EsQ0FBTCxDQUFPQyxRQUFQLENBQWdCTixjQUFoQixFQUFnQ1EsWUFBaEMsSUFBZ0RULEVBQWhFO0FBQ0g7QUFDSjs7O29GQTdFQVc7Ozs7O1dBQ1E7O2tGQUVSQTs7Ozs7V0FDZTs7a0VBT2ZBOzs7OztXQXdCRyxJQUFJcEIsc0JBQUo7Ozs7Ozs7V0FZQSxJQUFJQSxzQkFBSjs7Ozs7OztXQVlBLElBQUlBLHNCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcbmltcG9ydCB7IHBzZXVkb1JhbmRvbSB9IGZyb20gJy4uLy4uLy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vY3VydmUtcmFuZ2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXG5jb25zdCBST1RBVElPTl9PVkVSVElNRV9SQU5EX09GRlNFVCA9IDEyNTI5MjtcblxuLyoqXG4gKiAhI2VuIFRoZSByb3RhdGlvbiBtb2R1bGUgb2YgM2QgcGFydGljbGUuXG4gKiAhI3poIDNEIOeykuWtkOeahOaXi+i9rOaooeWdl1xuICogQGNsYXNzIFJvdGF0aW9uT3ZlcnRpbWVNb2R1bGVcbiAqL1xuQGNjY2xhc3MoJ2NjLlJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm90YXRpb25PdmVydGltZU1vZHVsZSB7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBlbmFibGUgb2YgUm90YXRpb25PdmVydGltZU1vZHVsZS5cbiAgICAgKiAhI3poIOaYr+WQpuWQr+eUqFxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZW5hYmxlID0gZmFsc2U7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2VwYXJhdGVBeGVzID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZXRoZXIgdG8gc2V0IHRoZSByb3RhdGlvbiBvZiB0aHJlZSBheGVzIHNlcGFyYXRlbHkgKG5vdCBjdXJyZW50bHkgc3VwcG9ydGVkKVxuICAgICAqICEjemgg5piv5ZCm5LiJ5Liq6L205YiG5byA6K6+5a6a5peL6L2s77yI5pqC5LiN5pSv5oyB77yJ44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBzZXBhcmF0ZUF4ZXNcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgc2VwYXJhdGVBeGVzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcGFyYXRlQXhlcztcbiAgICB9XG5cbiAgICBzZXQgc2VwYXJhdGVBeGVzICh2YWwpIHtcbiAgICAgICAgaWYgKCF2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcGFyYXRlQXhlcyA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JvdGF0aW9uIG92ZXJ0aW1lIHNlcGFyYXRlQXhlcyBpcyBub3Qgc3VwcG9ydGVkIScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgcm90YXRpb24gYXJvdW5kIFggYXhpcy5cbiAgICAgKiAhI3poIOe7lSBYIOi9tOiuvuWumuaXi+i9rOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0geFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgICAgICByYWRpYW46IHRydWUsXG4gICAgfSlcbiAgICB4ID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHJvdGF0aW9uIGFyb3VuZCBZIGF4aXMuXG4gICAgICogISN6aCDnu5UgWSDovbTorr7lrprml4vovazjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHlcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgICAgICByYW5nZTogWy0xLCAxXSxcbiAgICAgICAgcmFkaWFuOiB0cnVlLFxuICAgIH0pXG4gICAgeSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCByb3RhdGlvbiBhcm91bmQgWiBheGlzLlxuICAgICAqICEjemgg57uVIFog6L206K6+5a6a5peL6L2s44CCXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB6XG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXG4gICAgICAgIHJhZGlhbjogdHJ1ZSxcbiAgICB9KVxuICAgIHogPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgY29uc3RydWN0b3IgKCkge1xuXG4gICAgfVxuXG4gICAgYW5pbWF0ZSAocCwgZHQpIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXBhcmF0ZUF4ZXMpIHtcbiAgICAgICAgICAgIHAucm90YXRpb24ueCArPSB0aGlzLnouZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBST1RBVElPTl9PVkVSVElNRV9SQU5EX09GRlNFVCkpICogZHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBzZXBhcmF0ZUF4ZXMgaXMgdGVtcG9yYXJpbHkgbm90IHN1cHBvcnRlZCFcbiAgICAgICAgICAgIGNvbnN0IHJvdGF0aW9uUmFuZCA9IHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBST1RBVElPTl9PVkVSVElNRV9SQU5EX09GRlNFVCk7XG4gICAgICAgICAgICBwLnJvdGF0aW9uLnggKz0gdGhpcy54LmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCByb3RhdGlvblJhbmQpICogZHQ7XG4gICAgICAgICAgICBwLnJvdGF0aW9uLnkgKz0gdGhpcy55LmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCByb3RhdGlvblJhbmQpICogZHQ7XG4gICAgICAgICAgICBwLnJvdGF0aW9uLnogKz0gdGhpcy56LmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCByb3RhdGlvblJhbmQpICogZHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==