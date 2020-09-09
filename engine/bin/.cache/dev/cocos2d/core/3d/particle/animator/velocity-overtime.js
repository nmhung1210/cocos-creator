
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/animator/velocity-overtime.js';
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

var _particleGeneralFunction = require("../particle-general-function");

var _curveRange = _interopRequireDefault(require("./curve-range"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var VELOCITY_OVERTIME_RAND_OFFSET = 197866;

var _temp_v3 = cc.v3();
/**
 * !#en The velocity module of 3d particle.
 * !#zh 3D 粒子的速度模块
 * @class VelocityOvertimeModule
 */


var VelocityOvertimeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.VelocityOvertimeModule'), _dec2 = (0, _CCClassDecorator.property)({
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
   * !#en The enable of VelocityOvertimeModule.
   * !#zh 是否启用
   * @property {Boolean} enable
   */

  /**
   * !#en Coordinate system used in speed calculation.
   * !#zh 速度计算时采用的坐标系。
   * @property {Space} space
   */

  /**
   * !#en Velocity component in X axis direction
   * !#zh X 轴方向上的速度分量。
   * @property {CurveRange} x
   */

  /**
   * !#en Velocity component in Y axis direction
   * !#zh Y 轴方向上的速度分量。
   * @property {CurveRange} y
   */

  /**
   * !#en Velocity component in Z axis direction
   * !#zh Z 轴方向上的速度分量。
   * @property {CurveRange} z
   */

  /**
   * !#en Speed correction factor (only supports CPU particles).
   * !#zh 速度修正系数（只支持 CPU 粒子）。
   * @property {CurveRange} speedModifier
   */
  function VelocityOvertimeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "space", _descriptor2, this);

    _initializerDefineProperty(this, "x", _descriptor3, this);

    _initializerDefineProperty(this, "y", _descriptor4, this);

    _initializerDefineProperty(this, "z", _descriptor5, this);

    _initializerDefineProperty(this, "speedModifier", _descriptor6, this);

    this.rotation = null;
    this.needTransform = false;
    this.rotation = new _valueTypes.Quat();
    this.speedModifier.constant = 1;
    this.needTransform = false;
  }

  var _proto = VelocityOvertimeModule.prototype;

  _proto.update = function update(space, worldTransform) {
    this.needTransform = (0, _particleGeneralFunction.calculateTransform)(space, this.space, worldTransform, this.rotation);
  };

  _proto.animate = function animate(p) {
    var normalizedTime = 1 - p.remainingLifetime / p.startLifetime;

    var vel = _valueTypes.Vec3.set(_temp_v3, this.x.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)), this.y.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)), this.z.evaluate(normalizedTime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)));

    if (this.needTransform) {
      _valueTypes.Vec3.transformQuat(vel, vel, this.rotation);
    }

    _valueTypes.Vec3.add(p.animatedVelocity, p.animatedVelocity, vel);

    _valueTypes.Vec3.add(p.ultimateVelocity, p.velocity, p.animatedVelocity);

    _valueTypes.Vec3.scale(p.ultimateVelocity, p.ultimateVelocity, this.speedModifier.evaluate(1 - p.remainingLifetime / p.startLifetime, (0, _valueTypes.pseudoRandom)(p.randomSeed + VELOCITY_OVERTIME_RAND_OFFSET)));
  };

  return VelocityOvertimeModule;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "x", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "y", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "z", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "speedModifier", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = VelocityOvertimeModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2FuaW1hdG9yL3ZlbG9jaXR5LW92ZXJ0aW1lLnRzIl0sIm5hbWVzIjpbIlZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUIiwiX3RlbXBfdjMiLCJjYyIsInYzIiwiVmVsb2NpdHlPdmVydGltZU1vZHVsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJyYW5nZSIsInJvdGF0aW9uIiwibmVlZFRyYW5zZm9ybSIsIlF1YXQiLCJzcGVlZE1vZGlmaWVyIiwiY29uc3RhbnQiLCJ1cGRhdGUiLCJzcGFjZSIsIndvcmxkVHJhbnNmb3JtIiwiYW5pbWF0ZSIsInAiLCJub3JtYWxpemVkVGltZSIsInJlbWFpbmluZ0xpZmV0aW1lIiwic3RhcnRMaWZldGltZSIsInZlbCIsIlZlYzMiLCJzZXQiLCJ4IiwiZXZhbHVhdGUiLCJyYW5kb21TZWVkIiwieSIsInoiLCJ0cmFuc2Zvcm1RdWF0IiwiYWRkIiwiYW5pbWF0ZWRWZWxvY2l0eSIsInVsdGltYXRlVmVsb2NpdHkiLCJ2ZWxvY2l0eSIsInNjYWxlIiwicHJvcGVydHkiLCJMb2NhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLDZCQUE2QixHQUFHLE1BQXRDOztBQUVBLElBQU1DLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxFQUFILEVBQWpCO0FBRUE7Ozs7Ozs7SUFNcUJDLGlDQURwQiwrQkFBUSwyQkFBUixXQWdCSSxnQ0FBUztBQUNOQyxFQUFBQSxJQUFJLEVBQUVDO0FBREEsQ0FBVCxXQVVBLGdDQUFTO0FBQ05ELEVBQUFBLElBQUksRUFBRUUsc0JBREE7QUFFTkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTDtBQUZELENBQVQsV0FXQSxnQ0FBUztBQUNOSCxFQUFBQSxJQUFJLEVBQUVFLHNCQURBO0FBRU5DLEVBQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUw7QUFGRCxDQUFULFdBV0EsZ0NBQVM7QUFDTkgsRUFBQUEsSUFBSSxFQUFFRSxzQkFEQTtBQUVOQyxFQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMO0FBRkQsQ0FBVCxXQVdBLGdDQUFTO0FBQ05ILEVBQUFBLElBQUksRUFBRUUsc0JBREE7QUFFTkMsRUFBQUEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFGLEVBQUssQ0FBTDtBQUZELENBQVQ7QUF4REQ7Ozs7OztBQVFBOzs7Ozs7QUFVQTs7Ozs7O0FBV0E7Ozs7OztBQVdBOzs7Ozs7QUFXQTs7Ozs7QUFjQSxvQ0FBZTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLFNBSGZDLFFBR2UsR0FISixJQUdJO0FBQUEsU0FGZkMsYUFFZSxHQUZDLEtBRUQ7QUFDWCxTQUFLRCxRQUFMLEdBQWdCLElBQUlFLGdCQUFKLEVBQWhCO0FBQ0EsU0FBS0MsYUFBTCxDQUFtQkMsUUFBbkIsR0FBOEIsQ0FBOUI7QUFDQSxTQUFLSCxhQUFMLEdBQXFCLEtBQXJCO0FBQ0g7Ozs7U0FFREksU0FBQSxnQkFBUUMsS0FBUixFQUFlQyxjQUFmLEVBQStCO0FBQzNCLFNBQUtOLGFBQUwsR0FBcUIsaURBQW1CSyxLQUFuQixFQUEwQixLQUFLQSxLQUEvQixFQUFzQ0MsY0FBdEMsRUFBc0QsS0FBS1AsUUFBM0QsQ0FBckI7QUFDSDs7U0FFRFEsVUFBQSxpQkFBU0MsQ0FBVCxFQUFZO0FBQ1IsUUFBTUMsY0FBYyxHQUFHLElBQUlELENBQUMsQ0FBQ0UsaUJBQUYsR0FBc0JGLENBQUMsQ0FBQ0csYUFBbkQ7O0FBQ0EsUUFBTUMsR0FBRyxHQUFHQyxpQkFBS0MsR0FBTCxDQUFTdkIsUUFBVCxFQUFtQixLQUFLd0IsQ0FBTCxDQUFPQyxRQUFQLENBQWdCUCxjQUFoQixFQUFnQyw4QkFBYUQsQ0FBQyxDQUFDUyxVQUFGLEdBQWUzQiw2QkFBNUIsQ0FBaEMsQ0FBbkIsRUFBZ0gsS0FBSzRCLENBQUwsQ0FBT0YsUUFBUCxDQUFnQlAsY0FBaEIsRUFBZ0MsOEJBQWFELENBQUMsQ0FBQ1MsVUFBRixHQUFlM0IsNkJBQTVCLENBQWhDLENBQWhILEVBQTZNLEtBQUs2QixDQUFMLENBQU9ILFFBQVAsQ0FBZ0JQLGNBQWhCLEVBQWdDLDhCQUFhRCxDQUFDLENBQUNTLFVBQUYsR0FBZTNCLDZCQUE1QixDQUFoQyxDQUE3TSxDQUFaOztBQUNBLFFBQUksS0FBS1UsYUFBVCxFQUF3QjtBQUNwQmEsdUJBQUtPLGFBQUwsQ0FBbUJSLEdBQW5CLEVBQXdCQSxHQUF4QixFQUE2QixLQUFLYixRQUFsQztBQUNIOztBQUNEYyxxQkFBS1EsR0FBTCxDQUFTYixDQUFDLENBQUNjLGdCQUFYLEVBQTZCZCxDQUFDLENBQUNjLGdCQUEvQixFQUFpRFYsR0FBakQ7O0FBQ0FDLHFCQUFLUSxHQUFMLENBQVNiLENBQUMsQ0FBQ2UsZ0JBQVgsRUFBNkJmLENBQUMsQ0FBQ2dCLFFBQS9CLEVBQXlDaEIsQ0FBQyxDQUFDYyxnQkFBM0M7O0FBQ0FULHFCQUFLWSxLQUFMLENBQVdqQixDQUFDLENBQUNlLGdCQUFiLEVBQStCZixDQUFDLENBQUNlLGdCQUFqQyxFQUFtRCxLQUFLckIsYUFBTCxDQUFtQmMsUUFBbkIsQ0FBNEIsSUFBSVIsQ0FBQyxDQUFDRSxpQkFBRixHQUFzQkYsQ0FBQyxDQUFDRyxhQUF4RCxFQUF1RSw4QkFBYUgsQ0FBQyxDQUFDUyxVQUFGLEdBQWUzQiw2QkFBNUIsQ0FBdkUsQ0FBbkQ7QUFDSDs7O29GQS9FQW9DOzs7OztXQUNROzs7Ozs7O1dBVUQ5QixZQUFNK0I7Ozs7Ozs7V0FXVixJQUFJOUIsc0JBQUo7Ozs7Ozs7V0FXQSxJQUFJQSxzQkFBSjs7Ozs7OztXQVdBLElBQUlBLHNCQUFKOzs7Ozs7O1dBV1ksSUFBSUEsc0JBQUoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9IGZyb20gJy4uLy4uLy4uL3BsYXRmb3JtL0NDQ2xhc3NEZWNvcmF0b3InO1xuaW1wb3J0IHsgcHNldWRvUmFuZG9tLCBRdWF0LCBWZWMzIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgU3BhY2UgfSBmcm9tICcuLi9lbnVtJztcbmltcG9ydCB7IGNhbGN1bGF0ZVRyYW5zZm9ybSB9IGZyb20gJy4uL3BhcnRpY2xlLWdlbmVyYWwtZnVuY3Rpb24nO1xuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi9jdXJ2ZS1yYW5nZSc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcbmNvbnN0IFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUID0gMTk3ODY2O1xuXG5jb25zdCBfdGVtcF92MyA9IGNjLnYzKCk7XG5cbi8qKlxuICogISNlbiBUaGUgdmVsb2NpdHkgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDnmoTpgJ/luqbmqKHlnZdcbiAqIEBjbGFzcyBWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlXG4gKi9cbkBjY2NsYXNzKCdjYy5WZWxvY2l0eU92ZXJ0aW1lTW9kdWxlJylcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUuXG4gICAgICogISN6aCDmmK/lkKblkK/nlKhcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGVuYWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBDb29yZGluYXRlIHN5c3RlbSB1c2VkIGluIHNwZWVkIGNhbGN1bGF0aW9uLlxuICAgICAqICEjemgg6YCf5bqm6K6h566X5pe26YeH55So55qE5Z2Q5qCH57O744CCXG4gICAgICogQHByb3BlcnR5IHtTcGFjZX0gc3BhY2VcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBTcGFjZSxcbiAgICB9KVxuICAgIHNwYWNlID0gU3BhY2UuTG9jYWw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFZlbG9jaXR5IGNvbXBvbmVudCBpbiBYIGF4aXMgZGlyZWN0aW9uXG4gICAgICogISN6aCBYIOi9tOaWueWQkeS4iueahOmAn+W6puWIhumHj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0geFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgIH0pXG4gICAgeCA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFZlbG9jaXR5IGNvbXBvbmVudCBpbiBZIGF4aXMgZGlyZWN0aW9uXG4gICAgICogISN6aCBZIOi9tOaWueWQkeS4iueahOmAn+W6puWIhumHj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0geVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgIH0pXG4gICAgeSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFZlbG9jaXR5IGNvbXBvbmVudCBpbiBaIGF4aXMgZGlyZWN0aW9uXG4gICAgICogISN6aCBaIOi9tOaWueWQkeS4iueahOmAn+W6puWIhumHj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gelxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgIH0pXG4gICAgeiA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNwZWVkIGNvcnJlY3Rpb24gZmFjdG9yIChvbmx5IHN1cHBvcnRzIENQVSBwYXJ0aWNsZXMpLlxuICAgICAqICEjemgg6YCf5bqm5L+u5q2j57O75pWw77yI5Y+q5pSv5oyBIENQVSDnspLlrZDvvInjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHNwZWVkTW9kaWZpZXJcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgICAgICByYW5nZTogWy0xLCAxXSxcbiAgICB9KVxuICAgIHNwZWVkTW9kaWZpZXIgPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgcm90YXRpb24gPSBudWxsO1xuICAgIG5lZWRUcmFuc2Zvcm0gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBRdWF0KCk7XG4gICAgICAgIHRoaXMuc3BlZWRNb2RpZmllci5jb25zdGFudCA9IDE7XG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZSAoc3BhY2UsIHdvcmxkVHJhbnNmb3JtKSB7XG4gICAgICAgIHRoaXMubmVlZFRyYW5zZm9ybSA9IGNhbGN1bGF0ZVRyYW5zZm9ybShzcGFjZSwgdGhpcy5zcGFjZSwgd29ybGRUcmFuc2Zvcm0sIHRoaXMucm90YXRpb24pO1xuICAgIH1cblxuICAgIGFuaW1hdGUgKHApIHtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFRpbWUgPSAxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZTtcbiAgICAgICAgY29uc3QgdmVsID0gVmVjMy5zZXQoX3RlbXBfdjMsIHRoaXMueC5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSksIHRoaXMueS5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSksIHRoaXMuei5ldmFsdWF0ZShub3JtYWxpemVkVGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSkpO1xuICAgICAgICBpZiAodGhpcy5uZWVkVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQodmVsLCB2ZWwsIHRoaXMucm90YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIFZlYzMuYWRkKHAuYW5pbWF0ZWRWZWxvY2l0eSwgcC5hbmltYXRlZFZlbG9jaXR5LCB2ZWwpO1xuICAgICAgICBWZWMzLmFkZChwLnVsdGltYXRlVmVsb2NpdHksIHAudmVsb2NpdHksIHAuYW5pbWF0ZWRWZWxvY2l0eSk7XG4gICAgICAgIFZlYzMuc2NhbGUocC51bHRpbWF0ZVZlbG9jaXR5LCBwLnVsdGltYXRlVmVsb2NpdHksIHRoaXMuc3BlZWRNb2RpZmllci5ldmFsdWF0ZSgxIC0gcC5yZW1haW5pbmdMaWZldGltZSAvIHAuc3RhcnRMaWZldGltZSwgcHNldWRvUmFuZG9tKHAucmFuZG9tU2VlZCArIFZFTE9DSVRZX09WRVJUSU1FX1JBTkRfT0ZGU0VUKSkpO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=