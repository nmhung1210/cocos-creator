
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/limit-velocity-overtime.js';
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

var _enum = require("../enum");

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var LIMIT_VELOCITY_RAND_OFFSET = 23541;

var _temp_v3 = cc.v3();

var _temp_v3_1 = cc.v3();

function dampenBeyondLimit(vel, limit, dampen) {
  var sgn = Math.sign(vel);
  var abs = Math.abs(vel);

  if (abs > limit) {
    abs = (0, _valueTypes.lerp)(abs, limit, dampen);
  }

  return abs * sgn;
}
/**
 * !#en The limit velocity module of 3d particle.
 * !#zh 3D 粒子的限速模块
 * @class LimitVelocityOvertimeModule
 */


var LimitVelocityOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.LimitVelocityOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.Space
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec6 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  /**
   * !#en The enable of LimitVelocityOvertimeModule.
   * !#zh 是否启用
   * @property {Boolean} enable
   */

  /**
   * !#en The coordinate system used when calculating the lower speed limit.
   * !#zh 计算速度下限时采用的坐标系。
   * @property {Space} space
   */

  /**
   * !#en Whether to limit the three axes separately.
   * !#zh 是否三个轴分开限制。
   * @property {Boolean} separateAxes
   */

  /**
   * !#en Lower speed limit
   * !#zh 速度下限。
   * @property {CurveRange} limit
   */

  /**
   * !#en Lower speed limit in X direction.
   * !#zh X 轴方向上的速度下限。
   * @property {CurveRange} limitX
   */

  /**
   * !#en Lower speed limit in Y direction.
   * !#zh Y 轴方向上的速度下限。
   * @property {CurveRange} limitY
   */

  /**
   * !#en Lower speed limit in Z direction.
   * !#zh Z 轴方向上的速度下限。
   * @property {CurveRange} limitZ
   */

  /**
   * !#en Interpolation of current speed and lower speed limit.
   * !#zh 当前速度与速度下限的插值。
   * @property {Number} dampen
   */
  // TODO:functions related to drag are temporarily not supported
  function LimitVelocityOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "space", _descriptor2, this);

    _initializerDefineProperty(this, "separateAxes", _descriptor3, this);

    _initializerDefineProperty(this, "limit", _descriptor4, this);

    _initializerDefineProperty(this, "limitX", _descriptor5, this);

    _initializerDefineProperty(this, "limitY", _descriptor6, this);

    _initializerDefineProperty(this, "limitZ", _descriptor7, this);

    _initializerDefineProperty(this, "dampen", _descriptor8, this);

    this.drag = null;
    this.multiplyDragByParticleSize = false;
    this.multiplyDragByParticleVelocity = false;
    this.rotation = null;
    this.needTransform = false;
    this.rotation = new _valueTypes.Quat();
    this.needTransform = false;
  }

  var _proto = LimitVelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = calculateTransform(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
    var dampedVel = _temp_v3;

    if (this.separateAxes) {
      _valueTypes.Vec3.set(_temp_v3_1, this.limitX.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitY.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.limitZ.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)));

      if (this.needTransform) {
        _valueTypes.Vec3.transformQuat(_temp_v3_1, _temp_v3_1, this.rotation);
      }

      _valueTypes.Vec3.set(dampedVel, dampenBeyondLimit(p.ultimateVelocity.x, _temp_v3_1.x, this.dampen), dampenBeyondLimit(p.ultimateVelocity.y, _temp_v3_1.y, this.dampen), dampenBeyondLimit(p.ultimateVelocity.z, _temp_v3_1.z, this.dampen));
    } else {
      _valueTypes.Vec3.normalize(dampedVel, p.ultimateVelocity);

      _valueTypes.Vec3.scale(dampedVel, dampedVel, dampenBeyondLimit(p.ultimateVelocity.len(), this.limit.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + LIMIT_VELOCITY_RAND_OFFSET)), this.dampen));
    }

    _valueTypes.Vec3.copy(p.ultimateVelocity, dampedVel);
  };

  return LimitVelocityOvertimeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "space", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "separateAxes", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "limitX", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "limitY", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "limitZ", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dampen", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 3;
  }
})), _class2)) || _class);
exports["default"] = LimitVelocityOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL2xpbWl0LXZlbG9jaXR5LW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIkxJTUlUX1ZFTE9DSVRZX1JBTkRfT0ZGU0VUIiwiX3RlbXBfdjMiLCJjYyIsInYzIiwiX3RlbXBfdjNfMSIsImRhbXBlbkJleW9uZExpbWl0IiwidmVsIiwibGltaXQiLCJkYW1wZW4iLCJzZ24iLCJNYXRoIiwic2lnbiIsImFicyIsIkxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJyYW5nZSIsImRyYWciLCJtdWx0aXBseURyYWdCeVBhcnRpY2xlU2l6ZSIsIm11bHRpcGx5RHJhZ0J5UGFydGljbGVWZWxvY2l0eSIsInJvdGF0aW9uIiwibmVlZFRyYW5zZm9ybSIsIlF1YXQiLCJ1cGRhdGUiLCJzcGFjZSIsIndvcmxkVHJhbnNmb3JtIiwiY2FsY3VsYXRlVHJhbnNmb3JtIiwiYW5pbWF0ZSIsInAiLCJub3JtYWxpemVkVGltZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsImRhbXBlZFZlbCIsInNlcGFyYXRlQXhlcyIsIlZlYzMiLCJzZXQiLCJsaW1pdFgiLCJldmFsdWF0ZSIsInJhbmRvbVNlZWQiLCJsaW1pdFkiLCJsaW1pdFoiLCJ0cmFuc2Zvcm1RdWF0IiwidWx0aW1hdGVWZWxvY2l0eSIsIngiLCJ5IiwieiIsIm5vcm1hbGl6ZSIsInNjYWxlIiwibGVuIiwiY29weSIsInByb3BlcnR5IiwiTG9jYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSwwQkFBMEIsR0FBRyxLQUFuQzs7QUFFQSxJQUFNQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsRUFBSCxFQUFqQjs7QUFDQSxJQUFNQyxVQUFVLEdBQUdGLEVBQUUsQ0FBQ0MsRUFB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QU9SbUM7Ozs7O1dBQ1EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InO1xuaW1wb3J0IHsgbGVycCwgcHNldWRvUmFuZG9tLCBWZWMzLCBRdWF0IH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgU3BhY2UgfSBmcm9tICcuLi9lbnVtJztcbmltcG9ydCBDdXJ2ZVJhbmdlIGZyb20gJy4vY3VydmUtcmFuZ2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZTogbWF4LWxpbmUtbGVuZ3RoXG5jb25zdCBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCA9IDIzNTQxO1xuXG5jb25zdCBfdGVtcF92MyA9IGNjLnYzKCk7XG5jb25zdCBfdGVtcF92M18xID0gY2MudjMoKTtcblxuZnVuY3Rpb24gZGFtcGVuQmV5b25kTGltaXQgKHZlbCwgbGltaXQsIGRhbXBlbikge1xuICAgIGNvbnN0IHNnbiA9IE1hdGguc2lnbih2ZWwpO1xuICAgIGxldCBhYnMgPSBNYXRoLmFicyh2ZWwpO1xuICAgIGlmIChhYnMgPiBsaW1pdCkge1xuICAgICAgICBhYnMgPSBsZXJwKGFicywgbGltaXQsIGRhbXBlbik7XG4gICAgfVxuICAgIHJldHVybiBhYnMgKiBzZ247XG59XG5cbi8qKlxuICogISNlbiBUaGUgbGltaXQgdmVsb2NpdHkgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDnmoTpmZDpgJ/mqKHlnZdcbiAqIEBjbGFzcyBMaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGVcbiAqL1xuQGNjY2xhc3MoJ2NjLkxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZScpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIExpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZS5cbiAgICAgKiAhI3poIOaYr+WQpuWQr+eUqFxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZW5hYmxlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb29yZGluYXRlIHN5c3RlbSB1c2VkIHdoZW4gY2FsY3VsYXRpbmcgdGhlIGxvd2VyIHNwZWVkIGxpbWl0LlxuICAgICAqICEjemgg6K6h566X6YCf5bqm5LiL6ZmQ5pe26YeH55So55qE5Z2Q5qCH57O744CCXG4gICAgICogQHByb3BlcnR5IHtTcGFjZX0gc3BhY2VcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBTcGFjZSxcbiAgICB9KVxuICAgIHNwYWNlID0gU3BhY2UuTG9jYWw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZXRoZXIgdG8gbGltaXQgdGhlIHRocmVlIGF4ZXMgc2VwYXJhdGVseS5cbiAgICAgKiAhI3poIOaYr+WQpuS4ieS4qui9tOWIhuW8gOmZkOWItuOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2VwYXJhdGVBeGVzXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgc2VwYXJhdGVBeGVzID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIExvd2VyIHNwZWVkIGxpbWl0XG4gICAgICogISN6aCDpgJ/luqbkuIvpmZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGxpbWl0XG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXG4gICAgfSlcbiAgICBsaW1pdCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIExvd2VyIHNwZWVkIGxpbWl0IGluIFggZGlyZWN0aW9uLlxuICAgICAqICEjemggWCDovbTmlrnlkJHkuIrnmoTpgJ/luqbkuIvpmZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGxpbWl0WFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgIH0pXG4gICAgbGltaXRYID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gTG93ZXIgc3BlZWQgbGltaXQgaW4gWSBkaXJlY3Rpb24uXG4gICAgICogISN6aCBZIOi9tOaWueWQkeS4iueahOmAn+W6puS4i+mZkOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gbGltaXRZXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXG4gICAgfSlcbiAgICBsaW1pdFkgPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBMb3dlciBzcGVlZCBsaW1pdCBpbiBaIGRpcmVjdGlvbi5cbiAgICAgKiAhI3poIFog6L205pa55ZCR5LiK55qE6YCf5bqm5LiL6ZmQ44CCXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBsaW1pdFpcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgICAgICByYW5nZTogWy0xLCAxXSxcbiAgICB9KVxuICAgIGxpbWl0WiA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEludGVycG9sYXRpb24gb2YgY3VycmVudCBzcGVlZCBhbmQgbG93ZXIgc3BlZWQgbGltaXQuXG4gICAgICogISN6aCDlvZPliY3pgJ/luqbkuI7pgJ/luqbkuIvpmZDnmoTmj5LlgLzjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZGFtcGVuXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZGFtcGVuID0gMztcblxuICAgIC8vIFRPRE86ZnVuY3Rpb25zIHJlbGF0ZWQgdG8gZHJhZyBhcmUgdGVtcG9yYXJpbHkgbm90IHN1cHBvcnRlZFxuICAgIGRyYWcgPSBudWxsO1xuXG4gICAgbXVsdGlwbHlEcmFnQnlQYXJ0aWNsZVNpemUgPSBmYWxzZTtcblxuICAgIG11bHRpcGx5RHJhZ0J5UGFydGljbGVWZWxvY2l0eSA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSByb3RhdGlvbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBuZWVkVHJhbnNmb3JtID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMucm90YXRpb24gPSBuZXcgUXVhdCgpO1xuICAgICAgICB0aGlzLm5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB1cGRhdGUgKHNwYWNlOiBudW1iZXIsIHdvcmxkVHJhbnNmb3JtOiBNYXQ0KSB7XG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGNhbGN1bGF0ZVRyYW5zZm9ybShzcGFjZSwgdGhpcy5zcGFjZSwgd29ybGRUcmFuc2Zvcm0sIHRoaXMucm90YXRpb24pO1xuICAgIH1cblxuICAgIGFuaW1hdGUgKHApIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcbiAgICAgICAgY29uc3QgZGFtcGVkVmVsID0gX3RlbXBfdjM7XG4gICAgICAgIGlmICh0aGlzLnNlcGFyYXRlQXhlcykge1xuICAgICAgICAgICAgVmVjMy5zZXQoX3RlbXBfdjNfMSwgdGhpcy5saW1pdFguZXZhbHVhdGUobm9ybWFsaXplZFRpbWUsIHBzZXVkb1JhbmRvbShwLnJhbmRvbVNlZWQgKyBMSU1JVF9WRUxPQ0lUWV9SQU5EX09GRlNFVCkpISxcbiAgICAgICAgICAgIHRoaXMubGltaXRZLmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgTElNSVRfVkVMT0NJVFlfUkFORF9PRkZTRVQpKSEsXG4gICAgICAgICAgICB0aGlzLmxpbWl0Wi5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIExJTUlUX1ZFTE9DSVRZX1JBTkRfT0ZGU0VUKSkhKTtcbiAgICAgICAgICAgIGlmICh0aGlzLm5lZWRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQoX3RlbXBfdjNfMSwgX3RlbXBfdjNfMSwgdGhpcy5yb3RhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBWZWMzLnNldChkYW1wZWRWZWwsXG4gICAgICAgICAgICAgICAgZGFtcGVuQmV5b25kTGltaXQocC51bHRpbWF0ZVZlbG9jaXR5LngsIF90ZW1wX3YzXzEueCwgdGhpcy5kYW1wZW4pLFxuICAgICAgICAgICAgICAgIGRhbXBlbkJleW9uZExpbWl0KHAudWx0aW1hdGVWZWxvY2l0eS55LCBfdGVtcF92M18xLnksIHRoaXMuZGFtcGVuKSxcbiAgICAgICAgICAgICAgICBkYW1wZW5CZXlvbmRMaW1pdChwLnVsdGltYXRlVmVsb2NpdHkueiwgX3RlbXBfdjNfMS56LCB0aGlzLmRhbXBlbikpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGFtcGVkVmVsLCBwLnVsdGltYXRlVmVsb2NpdHkpO1xuICAgICAgICAgICAgVmVjMy5zY2FsZShkYW1wZWRWZWwsIGRhbXBlZFZlbCwgZGFtcGVuQmV5b25kTGltaXQocC51bHRpbWF0ZVZlbG9jaXR5LmxlbigpLCB0aGlzLmxpbWl0LmV2YWx1YXRlKG5vcm1hbGl6ZWRUaW1lLCBwc2V1ZG9SYW5kb20ocC5yYW5kb21TZWVkICsgTElNSVRfVkVMT0NJVFlfUkFORF9PRkZTRVQpKSwgdGhpcy5kYW1wZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBWZWMzLmNvcHkocC51bHRpbWF0ZVZlbG9jaXR5LCBkYW1wZWRWZWwpO1xuICAgIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==