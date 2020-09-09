
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/emitter/shape-module.js';
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

var _curveRange = _interopRequireDefault(require("../animator/curve-range"));

var _particleGeneralFunction = require("../particle-general-function");

var _enum = require("../enum");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var _intermediVec = new _valueTypes.Vec3(0, 0, 0);

var _intermediArr = new Array();

var _unitBoxExtent = new _valueTypes.Vec3(0.5, 0.5, 0.5);
/**
 * !#en The shape module of 3d particle.
 * !#zh 3D 粒子的发射形状模块
 * @class ShapeModule
 */


var ShapeModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.ShapeModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.ShapeType
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _enum.EmitLocation
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _enum.ArcMode
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  _createClass(ShapeModule, [{
    key: "shapeType",

    /**
     * !#en The enable of shapeModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */

    /**
     * !#en Particle emitter type.
     * !#zh 粒子发射器类型。
     * @property {ShapeType} shapeType
     */
    get: function get() {
      return this._shapeType;
    },
    set: function set(val) {
      this._shapeType = val;

      switch (this._shapeType) {
        case _enum.ShapeType.Box:
          if (this.emitFrom === _enum.EmitLocation.Base) {
            this.emitFrom = _enum.EmitLocation.Volume;
          }

          break;

        case _enum.ShapeType.Cone:
          if (this.emitFrom === _enum.EmitLocation.Edge) {
            this.emitFrom = _enum.EmitLocation.Base;
          }

          break;

        case _enum.ShapeType.Sphere:
        case _enum.ShapeType.Hemisphere:
          if (this.emitFrom === _enum.EmitLocation.Base || this.emitFrom === _enum.EmitLocation.Edge) {
            this.emitFrom = _enum.EmitLocation.Volume;
          }

          break;
      }
    }
    /**
     * !#en The emission site of the particle.
     * !#zh 粒子从发射器哪个部位发射。
     * @property {EmitLocation} emitFrom
     */

  }, {
    key: "angle",

    /**
     * !#en The angle between the axis of the cone and the generatrix<bg>
     * Determines the opening and closing of the cone launcher
     * !#zh 圆锥的轴与母线的夹角<bg>。
     * 决定圆锥发射器的开合程度。
     * @property {Number} angle
     */
    get: function get() {
      return Math.round((0, _valueTypes.toDegree)(this._angle) * 100) / 100;
    },
    set: function set(val) {
      this._angle = (0, _valueTypes.toRadian)(val);
    }
  }, {
    key: "arc",

    /**
     * !#en Particle emitters emit in a fan-shaped range.
     * !#zh 粒子发射器在一个扇形范围内发射。
     * @property {Number} arc
     */
    get: function get() {
      return (0, _valueTypes.toDegree)(this._arc);
    },
    set: function set(val) {
      this._arc = (0, _valueTypes.toRadian)(val);
    }
    /**
     * !#en How particles are emitted in the sector range.
     * !#zh 粒子在扇形范围内的发射方式。
     * @property {ArcMode} arcMode
     */

  }, {
    key: "position",

    /**
     * !#en Particle Emitter Position
     * !#zh 粒子发射器位置。
     * @property {Vec3} position
     */
    get: function get() {
      return this._position;
    },
    set: function set(val) {
      this._position = val;
      this.constructMat();
    }
  }, {
    key: "rotation",

    /**
     * !#en Particle emitter rotation angle.
     * !#zh 粒子发射器旋转角度。
     * @property {Vec3} rotation
     */
    get: function get() {
      return this._rotation;
    },
    set: function set(val) {
      this._rotation = val;
      this.constructMat();
    }
  }, {
    key: "scale",

    /**
     * !#en Particle emitter scaling
     * !#zh 粒子发射器缩放比例。
     * @property {Vec3} scale
     */
    get: function get() {
      return this._scale;
    },
    set: function set(val) {
      this._scale = val;
      this.constructMat();
    }
    /**
     * !#en The direction of particle movement is determined based on the initial direction of the particles.
     * !#zh 根据粒子的初始方向决定粒子的移动方向。
     * @property {Boolean} alignToDirection
     */

  }]);

  function ShapeModule() {
    _initializerDefineProperty(this, "enable", _descriptor, this);

    _initializerDefineProperty(this, "_shapeType", _descriptor2, this);

    _initializerDefineProperty(this, "emitFrom", _descriptor3, this);

    _initializerDefineProperty(this, "radius", _descriptor4, this);

    _initializerDefineProperty(this, "radiusThickness", _descriptor5, this);

    _initializerDefineProperty(this, "_angle", _descriptor6, this);

    _initializerDefineProperty(this, "_arc", _descriptor7, this);

    _initializerDefineProperty(this, "arcMode", _descriptor8, this);

    _initializerDefineProperty(this, "arcSpread", _descriptor9, this);

    _initializerDefineProperty(this, "arcSpeed", _descriptor10, this);

    _initializerDefineProperty(this, "length", _descriptor11, this);

    _initializerDefineProperty(this, "boxThickness", _descriptor12, this);

    _initializerDefineProperty(this, "_position", _descriptor13, this);

    _initializerDefineProperty(this, "_rotation", _descriptor14, this);

    _initializerDefineProperty(this, "_scale", _descriptor15, this);

    _initializerDefineProperty(this, "alignToDirection", _descriptor16, this);

    _initializerDefineProperty(this, "randomDirectionAmount", _descriptor17, this);

    _initializerDefineProperty(this, "sphericalDirectionAmount", _descriptor18, this);

    _initializerDefineProperty(this, "randomPositionAmount", _descriptor19, this);

    this.mat = null;
    this.Quat = null;
    this.particleSystem = null;
    this.lastTime = null;
    this.totalAngle = null;
    this.mat = new _valueTypes.Mat4();
    this.quat = new _valueTypes.Quat();
    this.particleSystem = null;
    this.lastTime = 0;
    this.totalAngle = 0;
  }

  var _proto = ShapeModule.prototype;

  _proto.onInit = function onInit(ps) {
    this.particleSystem = ps;
    this.constructMat();
    this.lastTime = this.particleSystem._time;
  };

  _proto.constructMat = function constructMat() {
    _valueTypes.Quat.fromEuler(this.quat, this._rotation.x, this._rotation.y, this._rotation.z);

    _valueTypes.Mat4.fromRTS(this.mat, this.quat, this._position, this._scale);
  };

  _proto.emit = function emit(p) {
    switch (this.shapeType) {
      case _enum.ShapeType.Box:
        boxEmit(this.emitFrom, this.boxThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Circle:
        circleEmit(this.radius, this.radiusThickness, this.generateArcAngle(), p.position, p.velocity);
        break;

      case _enum.ShapeType.Cone:
        coneEmit(this.emitFrom, this.radius, this.radiusThickness, this.generateArcAngle(), this._angle, this.length, p.position, p.velocity);
        break;

      case _enum.ShapeType.Sphere:
        sphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      case _enum.ShapeType.Hemisphere:
        hemisphereEmit(this.emitFrom, this.radius, this.radiusThickness, p.position, p.velocity);
        break;

      default:
        console.warn(this.shapeType + ' shapeType is not supported by ShapeModule.');
    }

    if (this.randomPositionAmount > 0) {
      p.position.x += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.y += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
      p.position.z += (0, _valueTypes.randomRange)(-this.randomPositionAmount, this.randomPositionAmount);
    }

    _valueTypes.Vec3.transformQuat(p.velocity, p.velocity, this.quat);

    _valueTypes.Vec3.transformMat4(p.position, p.position, this.mat);

    if (this.sphericalDirectionAmount > 0) {
      var sphericalVel = _valueTypes.Vec3.normalize(_intermediVec, p.position);

      _valueTypes.Vec3.lerp(p.velocity, p.velocity, sphericalVel, this.sphericalDirectionAmount);
    }

    this.lastTime = this.particleSystem._time;
  };

  _proto.generateArcAngle = function generateArcAngle() {
    if (this.arcMode === _enum.ArcMode.Random) {
      return (0, _valueTypes.randomRange)(0, this._arc);
    }

    var angle = this.totalAngle + 2 * Math.PI * this.arcSpeed.evaluate(this.particleSystem._time, 1) * (this.particleSystem._time - this.lastTime);
    this.totalAngle = angle;

    if (this.arcSpread !== 0) {
      angle = Math.floor(angle / (this._arc * this.arcSpread)) * this._arc * this.arcSpread;
    }

    switch (this.arcMode) {
      case _enum.ArcMode.Loop:
        return (0, _valueTypes.repeat)(angle, this._arc);

      case _enum.ArcMode.PingPong:
        return (0, _valueTypes.pingPong)(angle, this._arc);
    }
  };

  return ShapeModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_shapeType", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.ShapeType.Cone;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeType", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeType"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "emitFrom", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.EmitLocation.Volume;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "radiusThickness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_angle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _valueTypes.toRadian)(25);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "angle", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "angle"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "_arc", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return (0, _valueTypes.toRadian)(360);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "arc", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "arc"), _class2.prototype), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "arcMode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.ArcMode.Random;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "arcSpread", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "arcSpeed", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "length", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "boxThickness", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "_position", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "position", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "position"), _class2.prototype), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "_rotation", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(0, 0, 0);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotation", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "_scale", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _valueTypes.Vec3(1, 1, 1);
  }
}), _applyDecoratedDescriptor(_class2.prototype, "scale", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "scale"), _class2.prototype), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "alignToDirection", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "randomDirectionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "sphericalDirectionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "randomPositionAmount", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class2)) || _class);
exports["default"] = ShapeModule;

function sphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      _valueTypes.Vec3.copy(dir, pos);

      _valueTypes.Vec3.normalize(dir, dir);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _valueTypes.Vec3.scale(pos, pos, radius);

      _valueTypes.Vec3.copy(dir, pos);

      break;

    default:
      console.warn(emitFrom + ' is not supported for sphere emitter.');
  }
}

function hemisphereEmit(emitFrom, radius, radiusThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenSphere)(pos, radius * (1 - radiusThickness), radius);

      if (pos.z > 0) {
        pos.z *= -1;
      }

      _valueTypes.Vec3.copy(dir, pos);

      _valueTypes.Vec3.normalize(dir, dir);

      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.randomUnitVector)(pos);

      _valueTypes.Vec3.scale(pos, pos, radius);

      if (pos.z < 0) {
        pos.z *= -1;
      }

      _valueTypes.Vec3.copy(dir, pos);

      break;

    default:
      console.warn(emitFrom + ' is not supported for hemisphere emitter.');
  }
}

function coneEmit(emitFrom, radius, radiusThickness, theta, angle, length, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Base:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _valueTypes.Vec3.normalize(dir, dir);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Shell:
      (0, _particleGeneralFunction.fixedAngleUnitVector2)(pos, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle);

      _valueTypes.Vec3.normalize(dir, dir);

      _valueTypes.Vec2.scale(pos, pos, radius);

      pos.z = 0;
      break;

    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

      _valueTypes.Vec2.scale(dir, pos, Math.sin(angle));

      dir.z = -Math.cos(angle) * radius;

      _valueTypes.Vec3.normalize(dir, dir);

      pos.z = 0;

      _valueTypes.Vec3.add(pos, pos, _valueTypes.Vec3.scale(_intermediVec, dir, length * (0, _valueTypes.random)() / -dir.z));

      break;

    default:
      console.warn(emitFrom + ' is not supported for cone emitter.');
  }
}

function boxEmit(emitFrom, boxThickness, pos, dir) {
  switch (emitFrom) {
    case _enum.EmitLocation.Volume:
      (0, _particleGeneralFunction.randomPointInCube)(pos, _unitBoxExtent); // randomPointBetweenCube(pos, Vec3.multiply(_intermediVec, _unitBoxExtent, boxThickness), _unitBoxExtent);

      break;

    case _enum.EmitLocation.Shell:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _valueTypes.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    case _enum.EmitLocation.Edge:
      _intermediArr.splice(0, _intermediArr.length);

      _intermediArr.push((0, _valueTypes.randomRange)(-0.5, 0.5));

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      _intermediArr.push((0, _particleGeneralFunction.randomSign)() * 0.5);

      (0, _particleGeneralFunction.randomSortArray)(_intermediArr);
      applyBoxThickness(_intermediArr, boxThickness);

      _valueTypes.Vec3.set(pos, _intermediArr[0], _intermediArr[1], _intermediArr[2]);

      break;

    default:
      console.warn(emitFrom + ' is not supported for box emitter.');
  }

  _valueTypes.Vec3.copy(dir, _particleGeneralFunction.particleEmitZAxis);
}

function circleEmit(radius, radiusThickness, theta, pos, dir) {
  (0, _particleGeneralFunction.randomPointBetweenCircleAtFixedAngle)(pos, radius * (1 - radiusThickness), radius, theta);

  _valueTypes.Vec3.normalize(dir, pos);
}

function applyBoxThickness(pos, thickness) {
  if (thickness.x > 0) {
    pos[0] += 0.5 * (0, _valueTypes.randomRange)(-thickness.x, thickness.x);
    pos[0] = (0, _valueTypes.clamp)(pos[0], -0.5, 0.5);
  }

  if (thickness.y > 0) {
    pos[1] += 0.5 * (0, _valueTypes.randomRange)(-thickness.y, thickness.y);
    pos[1] = (0, _valueTypes.clamp)(pos[1], -0.5, 0.5);
  }

  if (thickness.z > 0) {
    pos[2] += 0.5 * (0, _valueTypes.randomRange)(-thickness.z, thickness.z);
    pos[2] = (0, _valueTypes.clamp)(pos[2], -0.5, 0.5);
  }
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL2VtaXR0ZXIvc2hhcGUtbW9kdWxlLnRzIl0sIm5hbWVzIjpbIl9pbnRlcm1lZGlWZWMiLCJWZWMzIiwiX2ludGVybWVkaUFyciIsIkFycmF5IiwiX3VuaXRCb3hFeHRlbnQiLCJTaGFwZU1vZHVsZSIsInR5cGUiLCJTaGFwZVR5cGUiLCJFbWl0TG9jYXRpb24iLCJBcmNNb2RlIiwiQ3VydmVSYW5nZSIsIl9zaGFwZVR5cGUiLCJ2YWwiLCJCb3giLCJlbWl0RnJvbSIsIkJhc2UiLCJWb2x1bWUiLCJDb25lIiwiRWRnZSIsIlNwaGVyZSIsIkhlbWlzcGhlcmUiLCJNYXRoIiwicm91bmQiLCJfYW5nbGUiLCJfYXJjIiwiX3Bvc2l0aW9uIiwiY29uc3RydWN0TWF0IiwiX3JvdGF0aW9uIiwiX3NjYWxlIiwibWF0IiwiUXVhdCIsInBhcnRpY2xlU3lzdGVtIiwibGFzdFRpbWUiLCJ0b3RhbEFuZ2xlIiwiTWF0NCIsInF1YXQiLCJvbkluaXQiLCJwcyIsIl90aW1lIiwiZnJvbUV1bGVyIiwieCIsInkiLCJ6IiwiZnJvbVJUUyIsImVtaXQiLCJwIiwic2hhcGVUeXBlIiwiYm94RW1pdCIsImJveFRoaWNrbmVzcyIsInBvc2l0aW9uIiwidmVsb2NpdHkiLCJDaXJjbGUiLCJjaXJjbGVFbWl0IiwicmFkaXVzIiwicmFkaXVzVGhpY2tuZXNzIiwiZ2VuZXJhdGVBcmNBbmdsZSIsImNvbmVFbWl0IiwibGVuZ3RoIiwic3BoZXJlRW1pdCIsImhlbWlzcGhlcmVFbWl0IiwiY29uc29sZSIsIndhcm4iLCJyYW5kb21Qb3NpdGlvbkFtb3VudCIsInRyYW5zZm9ybVF1YXQiLCJ0cmFuc2Zvcm1NYXQ0Iiwic3BoZXJpY2FsRGlyZWN0aW9uQW1vdW50Iiwic3BoZXJpY2FsVmVsIiwibm9ybWFsaXplIiwibGVycCIsImFyY01vZGUiLCJSYW5kb20iLCJhbmdsZSIsIlBJIiwiYXJjU3BlZWQiLCJldmFsdWF0ZSIsImFyY1NwcmVhZCIsImZsb29yIiwiTG9vcCIsIlBpbmdQb25nIiwicHJvcGVydHkiLCJwb3MiLCJkaXIiLCJjb3B5IiwiU2hlbGwiLCJzY2FsZSIsInRoZXRhIiwiVmVjMiIsInNpbiIsImNvcyIsImFkZCIsInNwbGljZSIsInB1c2giLCJhcHBseUJveFRoaWNrbmVzcyIsInNldCIsInBhcnRpY2xlRW1pdFpBeGlzIiwidGhpY2tuZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtBQUNBLElBQU1BLGFBQWEsR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUF0Qjs7QUFDQSxJQUFNQyxhQUFhLEdBQUcsSUFBSUMsS0FBSixFQUF0Qjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsSUFBSUgsZ0JBQUosQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixHQUFuQixDQUF2QjtBQUVBOzs7Ozs7O0lBTXFCSSxzQkFEcEIsK0JBQVEsZ0JBQVIsV0FtQkksZ0NBQVM7QUFDTkMsRUFBQUEsSUFBSSxFQUFFQztBQURBLENBQVQsV0FrQ0EsZ0NBQVM7QUFDTkQsRUFBQUEsSUFBSSxFQUFFRTtBQURBLENBQVQsV0FvRUEsZ0NBQVM7QUFDTkYsRUFBQUEsSUFBSSxFQUFFRztBQURBLENBQVQsV0FrQkEsZ0NBQVM7QUFDTkgsRUFBQUEsSUFBSSxFQUFFSTtBQURBLENBQVQ7Ozs7QUF4SUQ7Ozs7OztBQVdBOzs7Ozt3QkFRd0I7QUFDcEIsYUFBTyxLQUFLQyxVQUFaO0FBQ0g7c0JBRXFCQyxLQUFLO0FBQ3ZCLFdBQUtELFVBQUwsR0FBa0JDLEdBQWxCOztBQUNBLGNBQVEsS0FBS0QsVUFBYjtBQUNJLGFBQUtKLGdCQUFVTSxHQUFmO0FBQ0ksY0FBSSxLQUFLQyxRQUFMLEtBQWtCTixtQkFBYU8sSUFBbkMsRUFBeUM7QUFDckMsaUJBQUtELFFBQUwsR0FBZ0JOLG1CQUFhUSxNQUE3QjtBQUNIOztBQUNEOztBQUNKLGFBQUtULGdCQUFVVSxJQUFmO0FBQ0ksY0FBSSxLQUFLSCxRQUFMLEtBQWtCTixtQkFBYVUsSUFBbkMsRUFBeUM7QUFDckMsaUJBQUtKLFFBQUwsR0FBZ0JOLG1CQUFhTyxJQUE3QjtBQUNIOztBQUNEOztBQUNKLGFBQUtSLGdCQUFVWSxNQUFmO0FBQ0EsYUFBS1osZ0JBQVVhLFVBQWY7QUFDSSxjQUFJLEtBQUtOLFFBQUwsS0FBa0JOLG1CQUFhTyxJQUEvQixJQUF1QyxLQUFLRCxRQUFMLEtBQWtCTixtQkFBYVUsSUFBMUUsRUFBZ0Y7QUFDNUUsaUJBQUtKLFFBQUwsR0FBZ0JOLG1CQUFhUSxNQUE3QjtBQUNIOztBQUNEO0FBaEJSO0FBa0JIO0FBRUQ7Ozs7Ozs7OztBQW1DQTs7Ozs7Ozt3QkFRYTtBQUNULGFBQU9LLElBQUksQ0FBQ0MsS0FBTCxDQUFXLDBCQUFTLEtBQUtDLE1BQWQsSUFBd0IsR0FBbkMsSUFBMEMsR0FBakQ7QUFDSDtzQkFFVVgsS0FBSztBQUNaLFdBQUtXLE1BQUwsR0FBYywwQkFBU1gsR0FBVCxDQUFkO0FBQ0g7Ozs7QUFLRDs7Ozs7d0JBTVc7QUFDUCxhQUFPLDBCQUFTLEtBQUtZLElBQWQsQ0FBUDtBQUNIO3NCQUVRWixLQUFLO0FBQ1YsV0FBS1ksSUFBTCxHQUFZLDBCQUFTWixHQUFULENBQVo7QUFDSDtBQUVEOzs7Ozs7Ozs7QUFpREE7Ozs7O3dCQU1nQjtBQUNaLGFBQU8sS0FBS2EsU0FBWjtBQUNIO3NCQUNhYixLQUFLO0FBQ2YsV0FBS2EsU0FBTCxHQUFpQmIsR0FBakI7QUFDQSxXQUFLYyxZQUFMO0FBQ0g7Ozs7QUFLRDs7Ozs7d0JBTWdCO0FBQ1osYUFBTyxLQUFLQyxTQUFaO0FBQ0g7c0JBQ2FmLEtBQUs7QUFDZixXQUFLZSxTQUFMLEdBQWlCZixHQUFqQjtBQUNBLFdBQUtjLFlBQUw7QUFDSDs7OztBQUtEOzs7Ozt3QkFNYTtBQUNULGFBQU8sS0FBS0UsTUFBWjtBQUNIO3NCQUNVaEIsS0FBSztBQUNaLFdBQUtnQixNQUFMLEdBQWNoQixHQUFkO0FBQ0EsV0FBS2MsWUFBTDtBQUNIO0FBRUQ7Ozs7Ozs7O0FBcUNBLHlCQUFlO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsU0FOZkcsR0FNZSxHQU5ULElBTVM7QUFBQSxTQUxmQyxJQUtlLEdBTFIsSUFLUTtBQUFBLFNBSmZDLGNBSWUsR0FKRSxJQUlGO0FBQUEsU0FIZkMsUUFHZSxHQUhKLElBR0k7QUFBQSxTQUZmQyxVQUVlLEdBRkYsSUFFRTtBQUNYLFNBQUtKLEdBQUwsR0FBVyxJQUFJSyxnQkFBSixFQUFYO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLElBQUlMLGdCQUFKLEVBQVo7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLElBQXRCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDSDs7OztTQUVERyxTQUFBLGdCQUFRQyxFQUFSLEVBQVk7QUFDUixTQUFLTixjQUFMLEdBQXNCTSxFQUF0QjtBQUNBLFNBQUtYLFlBQUw7QUFDQSxTQUFLTSxRQUFMLEdBQWdCLEtBQUtELGNBQUwsQ0FBb0JPLEtBQXBDO0FBQ0g7O1NBRURaLGVBQUEsd0JBQWdCO0FBQ1pJLHFCQUFLUyxTQUFMLENBQWUsS0FBS0osSUFBcEIsRUFBMEIsS0FBS1IsU0FBTCxDQUFlYSxDQUF6QyxFQUE0QyxLQUFLYixTQUFMLENBQWVjLENBQTNELEVBQThELEtBQUtkLFNBQUwsQ0FBZWUsQ0FBN0U7O0FBQ0FSLHFCQUFLUyxPQUFMLENBQWEsS0FBS2QsR0FBbEIsRUFBdUIsS0FBS00sSUFBNUIsRUFBa0MsS0FBS1YsU0FBdkMsRUFBa0QsS0FBS0csTUFBdkQ7QUFDSDs7U0FFRGdCLE9BQUEsY0FBTUMsQ0FBTixFQUFTO0FBQ0wsWUFBUSxLQUFLQyxTQUFiO0FBQ0ksV0FBS3ZDLGdCQUFVTSxHQUFmO0FBQ0lrQyxRQUFBQSxPQUFPLENBQUMsS0FBS2pDLFFBQU4sRUFBZ0IsS0FBS2tDLFlBQXJCLEVBQW1DSCxDQUFDLENBQUNJLFFBQXJDLEVBQStDSixDQUFDLENBQUNLLFFBQWpELENBQVA7QUFDQTs7QUFDSixXQUFLM0MsZ0JBQVU0QyxNQUFmO0FBQ0lDLFFBQUFBLFVBQVUsQ0FBQyxLQUFLQyxNQUFOLEVBQWMsS0FBS0MsZUFBbkIsRUFBb0MsS0FBS0MsZ0JBQUwsRUFBcEMsRUFBNkRWLENBQUMsQ0FBQ0ksUUFBL0QsRUFBeUVKLENBQUMsQ0FBQ0ssUUFBM0UsQ0FBVjtBQUNBOztBQUNKLFdBQUszQyxnQkFBVVUsSUFBZjtBQUNJdUMsUUFBQUEsUUFBUSxDQUFDLEtBQUsxQyxRQUFOLEVBQWdCLEtBQUt1QyxNQUFyQixFQUE2QixLQUFLQyxlQUFsQyxFQUFtRCxLQUFLQyxnQkFBTCxFQUFuRCxFQUE0RSxLQUFLaEMsTUFBakYsRUFBeUYsS0FBS2tDLE1BQTlGLEVBQXNHWixDQUFDLENBQUNJLFFBQXhHLEVBQWtISixDQUFDLENBQUNLLFFBQXBILENBQVI7QUFDQTs7QUFDSixXQUFLM0MsZ0JBQVVZLE1BQWY7QUFDSXVDLFFBQUFBLFVBQVUsQ0FBQyxLQUFLNUMsUUFBTixFQUFnQixLQUFLdUMsTUFBckIsRUFBNkIsS0FBS0MsZUFBbEMsRUFBbURULENBQUMsQ0FBQ0ksUUFBckQsRUFBK0RKLENBQUMsQ0FBQ0ssUUFBakUsQ0FBVjtBQUNBOztBQUNKLFdBQUszQyxnQkFBVWEsVUFBZjtBQUNJdUMsUUFBQUEsY0FBYyxDQUFDLEtBQUs3QyxRQUFOLEVBQWdCLEtBQUt1QyxNQUFyQixFQUE2QixLQUFLQyxlQUFsQyxFQUFtRFQsQ0FBQyxDQUFDSSxRQUFyRCxFQUErREosQ0FBQyxDQUFDSyxRQUFqRSxDQUFkO0FBQ0E7O0FBQ0o7QUFDSVUsUUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsS0FBS2YsU0FBTCxHQUFpQiw2Q0FBOUI7QUFqQlI7O0FBbUJBLFFBQUksS0FBS2dCLG9CQUFMLEdBQTRCLENBQWhDLEVBQW1DO0FBQy9CakIsTUFBQUEsQ0FBQyxDQUFDSSxRQUFGLENBQVdULENBQVgsSUFBZ0IsNkJBQVksQ0FBQyxLQUFLc0Isb0JBQWxCLEVBQXdDLEtBQUtBLG9CQUE3QyxDQUFoQjtBQUNBakIsTUFBQUEsQ0FBQyxDQUFDSSxRQUFGLENBQVdSLENBQVgsSUFBZ0IsNkJBQVksQ0FBQyxLQUFLcUIsb0JBQWxCLEVBQXdDLEtBQUtBLG9CQUE3QyxDQUFoQjtBQUNBakIsTUFBQUEsQ0FBQyxDQUFDSSxRQUFGLENBQVdQLENBQVgsSUFBZ0IsNkJBQVksQ0FBQyxLQUFLb0Isb0JBQWxCLEVBQXdDLEtBQUtBLG9CQUE3QyxDQUFoQjtBQUNIOztBQUNEN0QscUJBQUs4RCxhQUFMLENBQW1CbEIsQ0FBQyxDQUFDSyxRQUFyQixFQUErQkwsQ0FBQyxDQUFDSyxRQUFqQyxFQUEyQyxLQUFLZixJQUFoRDs7QUFDQWxDLHFCQUFLK0QsYUFBTCxDQUFtQm5CLENBQUMsQ0FBQ0ksUUFBckIsRUFBK0JKLENBQUMsQ0FBQ0ksUUFBakMsRUFBMkMsS0FBS3BCLEdBQWhEOztBQUNBLFFBQUksS0FBS29DLHdCQUFMLEdBQWdDLENBQXBDLEVBQXVDO0FBQ25DLFVBQU1DLFlBQVksR0FBR2pFLGlCQUFLa0UsU0FBTCxDQUFlbkUsYUFBZixFQUE4QjZDLENBQUMsQ0FBQ0ksUUFBaEMsQ0FBckI7O0FBQ0FoRCx1QkFBS21FLElBQUwsQ0FBVXZCLENBQUMsQ0FBQ0ssUUFBWixFQUFzQkwsQ0FBQyxDQUFDSyxRQUF4QixFQUFrQ2dCLFlBQWxDLEVBQWdELEtBQUtELHdCQUFyRDtBQUNIOztBQUNELFNBQUtqQyxRQUFMLEdBQWdCLEtBQUtELGNBQUwsQ0FBb0JPLEtBQXBDO0FBQ0g7O1NBRURpQixtQkFBQSw0QkFBb0I7QUFDaEIsUUFBSSxLQUFLYyxPQUFMLEtBQWlCNUQsY0FBUTZELE1BQTdCLEVBQXFDO0FBQ2pDLGFBQU8sNkJBQVksQ0FBWixFQUFlLEtBQUs5QyxJQUFwQixDQUFQO0FBQ0g7O0FBQ0QsUUFBSStDLEtBQUssR0FBRyxLQUFLdEMsVUFBTCxHQUFrQixJQUFJWixJQUFJLENBQUNtRCxFQUFULEdBQWMsS0FBS0MsUUFBTCxDQUFjQyxRQUFkLENBQXVCLEtBQUszQyxjQUFMLENBQW9CTyxLQUEzQyxFQUFrRCxDQUFsRCxDQUFkLElBQXNFLEtBQUtQLGNBQUwsQ0FBb0JPLEtBQXBCLEdBQTRCLEtBQUtOLFFBQXZHLENBQTlCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQnNDLEtBQWxCOztBQUNBLFFBQUksS0FBS0ksU0FBTCxLQUFtQixDQUF2QixFQUEwQjtBQUN0QkosTUFBQUEsS0FBSyxHQUFHbEQsSUFBSSxDQUFDdUQsS0FBTCxDQUFXTCxLQUFLLElBQUksS0FBSy9DLElBQUwsR0FBWSxLQUFLbUQsU0FBckIsQ0FBaEIsSUFBbUQsS0FBS25ELElBQXhELEdBQStELEtBQUttRCxTQUE1RTtBQUNIOztBQUNELFlBQVEsS0FBS04sT0FBYjtBQUNJLFdBQUs1RCxjQUFRb0UsSUFBYjtBQUNJLGVBQU8sd0JBQU9OLEtBQVAsRUFBYyxLQUFLL0MsSUFBbkIsQ0FBUDs7QUFDSixXQUFLZixjQUFRcUUsUUFBYjtBQUNJLGVBQU8sMEJBQVNQLEtBQVQsRUFBZ0IsS0FBSy9DLElBQXJCLENBQVA7QUFKUjtBQU1IOzs7b0ZBdFRBdUQ7Ozs7O1dBQ1E7OytFQUVSQTs7Ozs7V0FDWXhFLGdCQUFVVTs7Ozs7OztXQTRDWlQsbUJBQWFROzsyRUFPdkIrRDs7Ozs7V0FDUTs7b0ZBYVJBOzs7OztXQUNpQjs7MkVBRWpCQTs7Ozs7V0FDUSwwQkFBUyxFQUFUOzsyREFTUkEsbUxBU0FBOzs7OztXQUNNLDBCQUFTLEdBQVQ7O3lEQU9OQTs7Ozs7V0FpQlN0RSxjQUFRNkQ7OzhFQU9qQlM7Ozs7O1dBQ1c7Ozs7Ozs7V0FVRCxJQUFJckUsc0JBQUo7OzRFQVNWcUU7Ozs7O1dBQ1E7O2tGQU9SQTs7Ozs7V0FDYyxJQUFJOUUsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWY7OytFQUVkOEU7Ozs7O1dBQ1csSUFBSTlFLGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmOzs4REFPWDhFLDRMQVNBQTs7Ozs7V0FDVyxJQUFJOUUsZ0JBQUosQ0FBUyxDQUFULEVBQVksQ0FBWixFQUFlLENBQWY7OzhEQU9YOEUseUxBU0FBOzs7OztXQUNRLElBQUk5RSxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZjs7MkRBT1I4RSxnTUFjQUE7Ozs7O1dBQ2tCOzsyRkFPbEJBOzs7OztXQUN1Qjs7OEZBT3ZCQTs7Ozs7V0FDMEI7OzBGQU0xQkE7Ozs7O1dBQ3NCOzs7OztBQStFM0IsU0FBU3JCLFVBQVQsQ0FBcUI1QyxRQUFyQixFQUErQnVDLE1BQS9CLEVBQXVDQyxlQUF2QyxFQUF3RDBCLEdBQXhELEVBQTZEQyxHQUE3RCxFQUFrRTtBQUM5RCxVQUFRbkUsUUFBUjtBQUNJLFNBQUtOLG1CQUFhUSxNQUFsQjtBQUNJLDZEQUF5QmdFLEdBQXpCLEVBQThCM0IsTUFBTSxJQUFJLElBQUlDLGVBQVIsQ0FBcEMsRUFBOERELE1BQTlEOztBQUNBcEQsdUJBQUtpRixJQUFMLENBQVVELEdBQVYsRUFBZUQsR0FBZjs7QUFDQS9FLHVCQUFLa0UsU0FBTCxDQUFlYyxHQUFmLEVBQW9CQSxHQUFwQjs7QUFDQTs7QUFDSixTQUFLekUsbUJBQWEyRSxLQUFsQjtBQUNJLHFEQUFpQkgsR0FBakI7O0FBQ0EvRSx1QkFBS21GLEtBQUwsQ0FBV0osR0FBWCxFQUFnQkEsR0FBaEIsRUFBcUIzQixNQUFyQjs7QUFDQXBELHVCQUFLaUYsSUFBTCxDQUFVRCxHQUFWLEVBQWVELEdBQWY7O0FBQ0E7O0FBQ0o7QUFDSXBCLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhL0MsUUFBUSxHQUFHLHVDQUF4QjtBQVpSO0FBY0g7O0FBRUQsU0FBUzZDLGNBQVQsQ0FBeUI3QyxRQUF6QixFQUFtQ3VDLE1BQW5DLEVBQTJDQyxlQUEzQyxFQUE0RDBCLEdBQTVELEVBQWlFQyxHQUFqRSxFQUFzRTtBQUNsRSxVQUFRbkUsUUFBUjtBQUNJLFNBQUtOLG1CQUFhUSxNQUFsQjtBQUNJLDZEQUF5QmdFLEdBQXpCLEVBQThCM0IsTUFBTSxJQUFJLElBQUlDLGVBQVIsQ0FBcEMsRUFBOERELE1BQTlEOztBQUNBLFVBQUkyQixHQUFHLENBQUN0QyxDQUFKLEdBQVEsQ0FBWixFQUFlO0FBQ1hzQyxRQUFBQSxHQUFHLENBQUN0QyxDQUFKLElBQVMsQ0FBQyxDQUFWO0FBQ0g7O0FBQ0R6Qyx1QkFBS2lGLElBQUwsQ0FBVUQsR0FBVixFQUFlRCxHQUFmOztBQUNBL0UsdUJBQUtrRSxTQUFMLENBQWVjLEdBQWYsRUFBb0JBLEdBQXBCOztBQUNBOztBQUNKLFNBQUt6RSxtQkFBYTJFLEtBQWxCO0FBQ0kscURBQWlCSCxHQUFqQjs7QUFDQS9FLHVCQUFLbUYsS0FBTCxDQUFXSixHQUFYLEVBQWdCQSxHQUFoQixFQUFxQjNCLE1BQXJCOztBQUNBLFVBQUkyQixHQUFHLENBQUN0QyxDQUFKLEdBQVEsQ0FBWixFQUFlO0FBQ1hzQyxRQUFBQSxHQUFHLENBQUN0QyxDQUFKLElBQVMsQ0FBQyxDQUFWO0FBQ0g7O0FBQ0R6Qyx1QkFBS2lGLElBQUwsQ0FBVUQsR0FBVixFQUFlRCxHQUFmOztBQUNBOztBQUNKO0FBQ0lwQixNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYS9DLFFBQVEsR0FBRywyQ0FBeEI7QUFsQlI7QUFvQkg7O0FBRUQsU0FBUzBDLFFBQVQsQ0FBbUIxQyxRQUFuQixFQUE2QnVDLE1BQTdCLEVBQXFDQyxlQUFyQyxFQUFzRCtCLEtBQXRELEVBQTZEZCxLQUE3RCxFQUFvRWQsTUFBcEUsRUFBNEV1QixHQUE1RSxFQUFpRkMsR0FBakYsRUFBc0Y7QUFDbEYsVUFBUW5FLFFBQVI7QUFDSSxTQUFLTixtQkFBYU8sSUFBbEI7QUFDSSx5RUFBcUNpRSxHQUFyQyxFQUEwQzNCLE1BQU0sSUFBSSxJQUFJQyxlQUFSLENBQWhELEVBQTBFRCxNQUExRSxFQUFrRmdDLEtBQWxGOztBQUNBQyx1QkFBS0YsS0FBTCxDQUFXSCxHQUFYLEVBQWdCRCxHQUFoQixFQUFxQjNELElBQUksQ0FBQ2tFLEdBQUwsQ0FBU2hCLEtBQVQsQ0FBckI7O0FBQ0FVLE1BQUFBLEdBQUcsQ0FBQ3ZDLENBQUosR0FBUSxDQUFDckIsSUFBSSxDQUFDbUUsR0FBTCxDQUFTakIsS0FBVCxDQUFELEdBQW1CbEIsTUFBM0I7O0FBQ0FwRCx1QkFBS2tFLFNBQUwsQ0FBZWMsR0FBZixFQUFvQkEsR0FBcEI7O0FBQ0FELE1BQUFBLEdBQUcsQ0FBQ3RDLENBQUosR0FBUSxDQUFSO0FBQ0E7O0FBQ0osU0FBS2xDLG1CQUFhMkUsS0FBbEI7QUFDSSwwREFBc0JILEdBQXRCLEVBQTJCSyxLQUEzQjs7QUFDQUMsdUJBQUtGLEtBQUwsQ0FBV0gsR0FBWCxFQUFnQkQsR0FBaEIsRUFBcUIzRCxJQUFJLENBQUNrRSxHQUFMLENBQVNoQixLQUFULENBQXJCOztBQUNBVSxNQUFBQSxHQUFHLENBQUN2QyxDQUFKLEdBQVEsQ0FBQ3JCLElBQUksQ0FBQ21FLEdBQUwsQ0FBU2pCLEtBQVQsQ0FBVDs7QUFDQXRFLHVCQUFLa0UsU0FBTCxDQUFlYyxHQUFmLEVBQW9CQSxHQUFwQjs7QUFDQUssdUJBQUtGLEtBQUwsQ0FBV0osR0FBWCxFQUFnQkEsR0FBaEIsRUFBcUIzQixNQUFyQjs7QUFDQTJCLE1BQUFBLEdBQUcsQ0FBQ3RDLENBQUosR0FBUSxDQUFSO0FBQ0E7O0FBQ0osU0FBS2xDLG1CQUFhUSxNQUFsQjtBQUNJLHlFQUFxQ2dFLEdBQXJDLEVBQTBDM0IsTUFBTSxJQUFJLElBQUlDLGVBQVIsQ0FBaEQsRUFBMEVELE1BQTFFLEVBQWtGZ0MsS0FBbEY7O0FBQ0FDLHVCQUFLRixLQUFMLENBQVdILEdBQVgsRUFBZ0JELEdBQWhCLEVBQXFCM0QsSUFBSSxDQUFDa0UsR0FBTCxDQUFTaEIsS0FBVCxDQUFyQjs7QUFDQVUsTUFBQUEsR0FBRyxDQUFDdkMsQ0FBSixHQUFRLENBQUNyQixJQUFJLENBQUNtRSxHQUFMLENBQVNqQixLQUFULENBQUQsR0FBbUJsQixNQUEzQjs7QUFDQXBELHVCQUFLa0UsU0FBTCxDQUFlYyxHQUFmLEVBQW9CQSxHQUFwQjs7QUFDQUQsTUFBQUEsR0FBRyxDQUFDdEMsQ0FBSixHQUFRLENBQVI7O0FBQ0F6Qyx1QkFBS3dGLEdBQUwsQ0FBU1QsR0FBVCxFQUFjQSxHQUFkLEVBQW1CL0UsaUJBQUttRixLQUFMLENBQVdwRixhQUFYLEVBQTBCaUYsR0FBMUIsRUFBK0J4QixNQUFNLEdBQUcseUJBQVQsR0FBb0IsQ0FBQ3dCLEdBQUcsQ0FBQ3ZDLENBQXhELENBQW5COztBQUNBOztBQUNKO0FBQ0lrQixNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYS9DLFFBQVEsR0FBRyxxQ0FBeEI7QUF6QlI7QUEyQkg7O0FBRUQsU0FBU2lDLE9BQVQsQ0FBa0JqQyxRQUFsQixFQUE0QmtDLFlBQTVCLEVBQTBDZ0MsR0FBMUMsRUFBK0NDLEdBQS9DLEVBQW9EO0FBQ2hELFVBQVFuRSxRQUFSO0FBQ0ksU0FBS04sbUJBQWFRLE1BQWxCO0FBQ0ksc0RBQWtCZ0UsR0FBbEIsRUFBdUI1RSxjQUF2QixFQURKLENBRUk7O0FBQ0E7O0FBQ0osU0FBS0ksbUJBQWEyRSxLQUFsQjtBQUNJakYsTUFBQUEsYUFBYSxDQUFDd0YsTUFBZCxDQUFxQixDQUFyQixFQUF3QnhGLGFBQWEsQ0FBQ3VELE1BQXRDOztBQUNBdkQsTUFBQUEsYUFBYSxDQUFDeUYsSUFBZCxDQUFtQiw2QkFBWSxDQUFDLEdBQWIsRUFBa0IsR0FBbEIsQ0FBbkI7O0FBQ0F6RixNQUFBQSxhQUFhLENBQUN5RixJQUFkLENBQW1CLDZCQUFZLENBQUMsR0FBYixFQUFrQixHQUFsQixDQUFuQjs7QUFDQXpGLE1BQUFBLGFBQWEsQ0FBQ3lGLElBQWQsQ0FBbUIsNkNBQWUsR0FBbEM7O0FBQ0Esb0RBQWdCekYsYUFBaEI7QUFDQTBGLE1BQUFBLGlCQUFpQixDQUFDMUYsYUFBRCxFQUFnQjhDLFlBQWhCLENBQWpCOztBQUNBL0MsdUJBQUs0RixHQUFMLENBQVNiLEdBQVQsRUFBYzlFLGFBQWEsQ0FBQyxDQUFELENBQTNCLEVBQWdDQSxhQUFhLENBQUMsQ0FBRCxDQUE3QyxFQUFrREEsYUFBYSxDQUFDLENBQUQsQ0FBL0Q7O0FBQ0E7O0FBQ0osU0FBS00sbUJBQWFVLElBQWxCO0FBQ0loQixNQUFBQSxhQUFhLENBQUN3RixNQUFkLENBQXFCLENBQXJCLEVBQXdCeEYsYUFBYSxDQUFDdUQsTUFBdEM7O0FBQ0F2RCxNQUFBQSxhQUFhLENBQUN5RixJQUFkLENBQW1CLDZCQUFZLENBQUMsR0FBYixFQUFrQixHQUFsQixDQUFuQjs7QUFDQXpGLE1BQUFBLGFBQWEsQ0FBQ3lGLElBQWQsQ0FBbUIsNkNBQWUsR0FBbEM7O0FBQ0F6RixNQUFBQSxhQUFhLENBQUN5RixJQUFkLENBQW1CLDZDQUFlLEdBQWxDOztBQUNBLG9EQUFnQnpGLGFBQWhCO0FBQ0EwRixNQUFBQSxpQkFBaUIsQ0FBQzFGLGFBQUQsRUFBZ0I4QyxZQUFoQixDQUFqQjs7QUFDQS9DLHVCQUFLNEYsR0FBTCxDQUFTYixHQUFULEVBQWM5RSxhQUFhLENBQUMsQ0FBRCxDQUEzQixFQUFnQ0EsYUFBYSxDQUFDLENBQUQsQ0FBN0MsRUFBa0RBLGFBQWEsQ0FBQyxDQUFELENBQS9EOztBQUNBOztBQUNKO0FBQ0kwRCxNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYS9DLFFBQVEsR0FBRyxvQ0FBeEI7QUF4QlI7O0FBMEJBYixtQkFBS2lGLElBQUwsQ0FBVUQsR0FBVixFQUFlYSwwQ0FBZjtBQUNIOztBQUVELFNBQVMxQyxVQUFULENBQXFCQyxNQUFyQixFQUE2QkMsZUFBN0IsRUFBOEMrQixLQUE5QyxFQUFxREwsR0FBckQsRUFBMERDLEdBQTFELEVBQStEO0FBQzNELHFFQUFxQ0QsR0FBckMsRUFBMEMzQixNQUFNLElBQUksSUFBSUMsZUFBUixDQUFoRCxFQUEwRUQsTUFBMUUsRUFBa0ZnQyxLQUFsRjs7QUFDQXBGLG1CQUFLa0UsU0FBTCxDQUFlYyxHQUFmLEVBQW9CRCxHQUFwQjtBQUNIOztBQUVELFNBQVNZLGlCQUFULENBQTRCWixHQUE1QixFQUFpQ2UsU0FBakMsRUFBNEM7QUFDeEMsTUFBSUEsU0FBUyxDQUFDdkQsQ0FBVixHQUFjLENBQWxCLEVBQXFCO0FBQ2pCd0MsSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxJQUFVLE1BQU0sNkJBQVksQ0FBQ2UsU0FBUyxDQUFDdkQsQ0FBdkIsRUFBMEJ1RCxTQUFTLENBQUN2RCxDQUFwQyxDQUFoQjtBQUNBd0MsSUFBQUEsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTLHVCQUFNQSxHQUFHLENBQUMsQ0FBRCxDQUFULEVBQWMsQ0FBQyxHQUFmLEVBQW9CLEdBQXBCLENBQVQ7QUFDSDs7QUFDRCxNQUFJZSxTQUFTLENBQUN0RCxDQUFWLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakJ1QyxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILElBQVUsTUFBTSw2QkFBWSxDQUFDZSxTQUFTLENBQUN0RCxDQUF2QixFQUEwQnNELFNBQVMsQ0FBQ3RELENBQXBDLENBQWhCO0FBQ0F1QyxJQUFBQSxHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVMsdUJBQU1BLEdBQUcsQ0FBQyxDQUFELENBQVQsRUFBYyxDQUFDLEdBQWYsRUFBb0IsR0FBcEIsQ0FBVDtBQUNIOztBQUNELE1BQUllLFNBQVMsQ0FBQ3JELENBQVYsR0FBYyxDQUFsQixFQUFxQjtBQUNqQnNDLElBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsSUFBVSxNQUFNLDZCQUFZLENBQUNlLFNBQVMsQ0FBQ3JELENBQXZCLEVBQTBCcUQsU0FBUyxDQUFDckQsQ0FBcEMsQ0FBaEI7QUFDQXNDLElBQUFBLEdBQUcsQ0FBQyxDQUFELENBQUgsR0FBUyx1QkFBTUEsR0FBRyxDQUFDLENBQUQsQ0FBVCxFQUFjLENBQUMsR0FBZixFQUFvQixHQUFwQixDQUFUO0FBQ0g7QUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gZnJvbSAnLi4vLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcic7XG5pbXBvcnQgeyBjbGFtcCwgTWF0NCwgcGluZ1BvbmcsIFF1YXQsIHJhbmRvbSwgcmFuZG9tUmFuZ2UsIHJlcGVhdCwgdG9EZWdyZWUsIHRvUmFkaWFuLCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IEN1cnZlUmFuZ2UgZnJvbSAnLi4vYW5pbWF0b3IvY3VydmUtcmFuZ2UnO1xuaW1wb3J0IHsgZml4ZWRBbmdsZVVuaXRWZWN0b3IyLCBwYXJ0aWNsZUVtaXRaQXhpcywgcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlQXRGaXhlZEFuZ2xlLCByYW5kb21Qb2ludEJldHdlZW5TcGhlcmUsIHJhbmRvbVBvaW50SW5DdWJlLCByYW5kb21TaWduLCByYW5kb21Tb3J0QXJyYXksIHJhbmRvbVVuaXRWZWN0b3IgfSBmcm9tICcuLi9wYXJ0aWNsZS1nZW5lcmFsLWZ1bmN0aW9uJztcbmltcG9ydCB7IFNoYXBlVHlwZSwgRW1pdExvY2F0aW9uLCBBcmNNb2RlIH0gZnJvbSAnLi4vZW51bSc7XG5cbi8vIHRzbGludDpkaXNhYmxlOiBtYXgtbGluZS1sZW5ndGhcbmNvbnN0IF9pbnRlcm1lZGlWZWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcbmNvbnN0IF9pbnRlcm1lZGlBcnIgPSBuZXcgQXJyYXkoKTtcbmNvbnN0IF91bml0Qm94RXh0ZW50ID0gbmV3IFZlYzMoMC41LCAwLjUsIDAuNSk7XG5cbi8qKlxuICogISNlbiBUaGUgc2hhcGUgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDnmoTlj5HlsITlvaLnirbmqKHlnZdcbiAqIEBjbGFzcyBTaGFwZU1vZHVsZVxuICovXG5AY2NjbGFzcygnY2MuU2hhcGVNb2R1bGUnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGVNb2R1bGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIHNoYXBlTW9kdWxlLlxuICAgICAqICEjemgg5piv5ZCm5ZCv55SoXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBlbmFibGUgPSBmYWxzZTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zaGFwZVR5cGUgPSBTaGFwZVR5cGUuQ29uZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgZW1pdHRlciB0eXBlLlxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo57G75Z6L44CCXG4gICAgICogQHByb3BlcnR5IHtTaGFwZVR5cGV9IHNoYXBlVHlwZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFNoYXBlVHlwZSxcbiAgICB9KVxuICAgIHB1YmxpYyBnZXQgc2hhcGVUeXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXBlVHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNoYXBlVHlwZSAodmFsKSB7XG4gICAgICAgIHRoaXMuX3NoYXBlVHlwZSA9IHZhbDtcbiAgICAgICAgc3dpdGNoICh0aGlzLl9zaGFwZVR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLkJveDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbWl0RnJvbSA9PT0gRW1pdExvY2F0aW9uLkJhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0RnJvbSA9IEVtaXRMb2NhdGlvbi5Wb2x1bWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQ29uZTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbWl0RnJvbSA9PT0gRW1pdExvY2F0aW9uLkVkZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0RnJvbSA9IEVtaXRMb2NhdGlvbi5CYXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLlNwaGVyZTpcbiAgICAgICAgICAgIGNhc2UgU2hhcGVUeXBlLkhlbWlzcGhlcmU6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdEZyb20gPT09IEVtaXRMb2NhdGlvbi5CYXNlIHx8IHRoaXMuZW1pdEZyb20gPT09IEVtaXRMb2NhdGlvbi5FZGdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdEZyb20gPSBFbWl0TG9jYXRpb24uVm9sdW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGVtaXNzaW9uIHNpdGUgb2YgdGhlIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q5LuO5Y+R5bCE5Zmo5ZOq5Liq6YOo5L2N5Y+R5bCE44CCXG4gICAgICogQHByb3BlcnR5IHtFbWl0TG9jYXRpb259IGVtaXRGcm9tXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogRW1pdExvY2F0aW9uLFxuICAgIH0pXG4gICAgZW1pdEZyb20gPSBFbWl0TG9jYXRpb24uVm9sdW1lO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIHJhZGl1cy5cbiAgICAgKiAhI3poIOeykuWtkOWPkeWwhOWZqOWNiuW+hOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByYWRpdXNcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICByYWRpdXMgPSAxO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIGVtaXNzaW9uIHBvc2l0aW9uIChub3QgdmFsaWQgZm9yIEJveCB0eXBlIGVtaXR0ZXJzKe+8mjxiZz5cbiAgICAgKiAtIDAgbWVhbnMgZW1pdHRlZCBmcm9tIHRoZSBzdXJmYWNlO1xuwqDCoMKgwqDCoCogLSAxIG1lYW5zIGxhdW5jaCBmcm9tIHRoZSBjZW50ZXI7XG7CoMKgwqDCoMKgKiAtIDAgfiAxIGluZGljYXRlcyBlbWlzc2lvbiBmcm9tIHRoZSBjZW50ZXIgdG8gdGhlIHN1cmZhY2UuXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajlj5HlsITkvY3nva7vvIjlr7kgQm94IOexu+Wei+eahOWPkeWwhOWZqOaXoOaViO+8ie+8mjxiZz5cbiAgICAgKiAtIDAg6KGo56S65LuO6KGo6Z2i5Y+R5bCE77ybXG4gICAgICogLSAxIOihqOekuuS7juS4reW/g+WPkeWwhO+8m1xuICAgICAqIC0gMCB+IDEg5LmL6Ze06KGo56S65Zyo5Lit5b+D5Yiw6KGo6Z2i5LmL6Ze05Y+R5bCE44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGl1c1RoaWNrbmVzc1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHJhZGl1c1RoaWNrbmVzcyA9IDE7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfYW5nbGUgPSB0b1JhZGlhbigyNSk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBhbmdsZSBiZXR3ZWVuIHRoZSBheGlzIG9mIHRoZSBjb25lIGFuZCB0aGUgZ2VuZXJhdHJpeDxiZz5cbiAgICAgKiBEZXRlcm1pbmVzIHRoZSBvcGVuaW5nIGFuZCBjbG9zaW5nIG9mIHRoZSBjb25lIGxhdW5jaGVyXG4gICAgICogISN6aCDlnIbplKXnmoTovbTkuI7mr43nur/nmoTlpLnop5I8Ymc+44CCXG4gICAgICog5Yaz5a6a5ZyG6ZSl5Y+R5bCE5Zmo55qE5byA5ZCI56iL5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ2xlXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IGFuZ2xlICgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQodG9EZWdyZWUodGhpcy5fYW5nbGUpICogMTAwKSAvIDEwMDtcbiAgICB9XG5cbiAgICBzZXQgYW5nbGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9hbmdsZSA9IHRvUmFkaWFuKHZhbCk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX2FyYyA9IHRvUmFkaWFuKDM2MCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXJzIGVtaXQgaW4gYSBmYW4tc2hhcGVkIHJhbmdlLlxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo5Zyo5LiA5Liq5omH5b2i6IyD5Zu05YaF5Y+R5bCE44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFyY1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBhcmMgKCkge1xuICAgICAgICByZXR1cm4gdG9EZWdyZWUodGhpcy5fYXJjKTtcbiAgICB9XG5cbiAgICBzZXQgYXJjICh2YWwpIHtcbiAgICAgICAgdGhpcy5fYXJjID0gdG9SYWRpYW4odmFsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEhvdyBwYXJ0aWNsZXMgYXJlIGVtaXR0ZWQgaW4gdGhlIHNlY3RvciByYW5nZS5cbiAgICAgKiAhI3poIOeykuWtkOWcqOaJh+W9ouiMg+WbtOWGheeahOWPkeWwhOaWueW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7QXJjTW9kZX0gYXJjTW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEFyY01vZGUsXG4gICAgfSlcbiAgICBhcmNNb2RlID0gQXJjTW9kZS5SYW5kb207XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbnRyb2xzIHRoZSBkaXNjcmV0ZSBpbnRlcnZhbHMgYXJvdW5kIHRoZSBhcmNzIHdoZXJlIHBhcnRpY2xlcyBtaWdodCBiZSBnZW5lcmF0ZWQuXG4gICAgICogISN6aCDmjqfliLblj6/og73kuqfnlJ/nspLlrZDnmoTlvKflkajlm7TnmoTnprvmlaPpl7TpmpTjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYXJjU3ByZWFkXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgYXJjU3ByZWFkID0gMDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHNwZWVkIGF0IHdoaWNoIHBhcnRpY2xlcyBhcmUgZW1pdHRlZCBhcm91bmQgdGhlIGNpcmN1bWZlcmVuY2UuXG4gICAgICogISN6aCDnspLlrZDmsr/lnIblkajlj5HlsITnmoTpgJ/luqbjgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGFyY1NwZWVkXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICB9KVxuICAgIGFyY1NwZWVkID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQXhpcyBsZW5ndGggZnJvbSB0b3Agb2YgY29uZSB0byBib3R0b20gb2YgY29uZSA8Ymc+LlxuwqDCoMKgwqDCoCogRGV0ZXJtaW5lcyB0aGUgaGVpZ2h0IG9mIHRoZSBjb25lIGVtaXR0ZXIuXG4gICAgICogISN6aCDlnIbplKXpobbpg6jmiKrpnaLot53nprvlupXpg6jnmoTovbTplb88Ymc+44CCXG4gICAgICog5Yaz5a6a5ZyG6ZSl5Y+R5bCE5Zmo55qE6auY5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGxlbmd0aCA9IDU7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXIgZW1pc3Npb24gbG9jYXRpb24gKGZvciBib3gtdHlwZSBwYXJ0aWNsZSBlbWl0dGVycykuXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajlj5HlsITkvY3nva7vvIjpkojlr7kgQm94IOexu+Wei+eahOeykuWtkOWPkeWwhOWZqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYm94VGhpY2tuZXNzXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgYm94VGhpY2tuZXNzID0gbmV3IFZlYzMoMCwgMCwgMCk7XG5cbiAgICBAcHJvcGVydHlcbiAgICBfcG9zaXRpb24gPSBuZXcgVmVjMygwLCAwLCAwKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgRW1pdHRlciBQb3NpdGlvblxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo5L2N572u44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBwb3NpdGlvblxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcbiAgICB9XG4gICAgc2V0IHBvc2l0aW9uICh2YWwpIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB2YWw7XG4gICAgICAgIHRoaXMuY29uc3RydWN0TWF0KCk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX3JvdGF0aW9uID0gbmV3IFZlYzMoMCwgMCwgMCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhcnRpY2xlIGVtaXR0ZXIgcm90YXRpb24gYW5nbGUuXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajml4vovazop5LluqbjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IHJvdGF0aW9uXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHJvdGF0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0aW9uO1xuICAgIH1cbiAgICBzZXQgcm90YXRpb24gKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IHZhbDtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXQoKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBfc2NhbGUgPSBuZXcgVmVjMygxLCAxLCAxKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgZW1pdHRlciBzY2FsaW5nXG4gICAgICogISN6aCDnspLlrZDlj5HlsITlmajnvKnmlL7mr5TkvovjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IHNjYWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZ2V0IHNjYWxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgIH1cbiAgICBzZXQgc2NhbGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9zY2FsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RNYXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkaXJlY3Rpb24gb2YgcGFydGljbGUgbW92ZW1lbnQgaXMgZGV0ZXJtaW5lZCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBkaXJlY3Rpb24gb2YgdGhlIHBhcnRpY2xlcy5cbiAgICAgKiAhI3poIOagueaNrueykuWtkOeahOWIneWni+aWueWQkeWGs+WumueykuWtkOeahOenu+WKqOaWueWQkeOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYWxpZ25Ub0RpcmVjdGlvblxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGFsaWduVG9EaXJlY3Rpb24gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHBhcnRpY2xlIGdlbmVyYXRpb24gZGlyZWN0aW9uIHJhbmRvbWx5LlxuICAgICAqICEjemgg57KS5a2Q55Sf5oiQ5pa55ZCR6ZqP5py66K6+5a6a44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhbmRvbURpcmVjdGlvbkFtb3VudFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHJhbmRvbURpcmVjdGlvbkFtb3VudCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEludGVycG9sYXRpb24gYmV0d2VlbiB0aGUgY3VycmVudCBlbWlzc2lvbiBkaXJlY3Rpb24gYW5kIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUgY3VycmVudCBwb3NpdGlvbiB0byB0aGUgY2VudGVyIG9mIHRoZSBub2RlLlxuICAgICAqICEjemgg6KGo56S65b2T5YmN5Y+R5bCE5pa55ZCR5LiO5b2T5YmN5L2N572u5Yiw57uT54K55Lit5b+D6L+e57q/5pa55ZCR55qE5o+S5YC844CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNwaGVyaWNhbERpcmVjdGlvbkFtb3VudFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHNwaGVyaWNhbERpcmVjdGlvbkFtb3VudCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB0aGUgcGFydGljbGUgZ2VuZXJhdGlvbiBwb3NpdGlvbiByYW5kb21seSAoc2V0dGluZyB0aGlzIHZhbHVlIHRvIGEgdmFsdWUgb3RoZXIgdGhhbiAwIHdpbGwgY2F1c2UgdGhlIHBhcnRpY2xlIGdlbmVyYXRpb24gcG9zaXRpb24gdG8gZXhjZWVkIHRoZSBnZW5lcmF0b3Igc2l6ZSByYW5nZSlcbiAgICAgKiAhI3poIOeykuWtkOeUn+aIkOS9jee9rumaj+acuuiuvuWumu+8iOiuvuWumuatpOWAvOS4uumdniAwIOS8muS9v+eykuWtkOeUn+aIkOS9jee9rui2heWHuueUn+aIkOWZqOWkp+Wwj+iMg+WbtO+8ieOAglxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHJhbmRvbVBvc2l0aW9uQW1vdW50ID0gMDtcblxuICAgIG1hdCA9IG51bGw7XG4gICAgUXVhdCA9IG51bGw7XG4gICAgcGFydGljbGVTeXN0ZW0gPSBudWxsO1xuICAgIGxhc3RUaW1lID0gbnVsbDtcbiAgICB0b3RhbEFuZ2xlID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5tYXQgPSBuZXcgTWF0NCgpO1xuICAgICAgICB0aGlzLnF1YXQgPSBuZXcgUXVhdCgpO1xuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgICAgIHRoaXMudG90YWxBbmdsZSA9IDA7XG4gICAgfVxuXG4gICAgb25Jbml0IChwcykge1xuICAgICAgICB0aGlzLnBhcnRpY2xlU3lzdGVtID0gcHM7XG4gICAgICAgIHRoaXMuY29uc3RydWN0TWF0KCk7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aGlzLnBhcnRpY2xlU3lzdGVtLl90aW1lO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdE1hdCAoKSB7XG4gICAgICAgIFF1YXQuZnJvbUV1bGVyKHRoaXMucXVhdCwgdGhpcy5fcm90YXRpb24ueCwgdGhpcy5fcm90YXRpb24ueSwgdGhpcy5fcm90YXRpb24ueik7XG4gICAgICAgIE1hdDQuZnJvbVJUUyh0aGlzLm1hdCwgdGhpcy5xdWF0LCB0aGlzLl9wb3NpdGlvbiwgdGhpcy5fc2NhbGUpO1xuICAgIH1cblxuICAgIGVtaXQgKHApIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnNoYXBlVHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQm94OlxuICAgICAgICAgICAgICAgIGJveEVtaXQodGhpcy5lbWl0RnJvbSwgdGhpcy5ib3hUaGlja25lc3MsIHAucG9zaXRpb24sIHAudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuQ2lyY2xlOlxuICAgICAgICAgICAgICAgIGNpcmNsZUVtaXQodGhpcy5yYWRpdXMsIHRoaXMucmFkaXVzVGhpY2tuZXNzLCB0aGlzLmdlbmVyYXRlQXJjQW5nbGUoKSwgcC5wb3NpdGlvbiwgcC52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5Db25lOlxuICAgICAgICAgICAgICAgIGNvbmVFbWl0KHRoaXMuZW1pdEZyb20sIHRoaXMucmFkaXVzLCB0aGlzLnJhZGl1c1RoaWNrbmVzcywgdGhpcy5nZW5lcmF0ZUFyY0FuZ2xlKCksIHRoaXMuX2FuZ2xlLCB0aGlzLmxlbmd0aCwgcC5wb3NpdGlvbiwgcC52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFNoYXBlVHlwZS5TcGhlcmU6XG4gICAgICAgICAgICAgICAgc3BoZXJlRW1pdCh0aGlzLmVtaXRGcm9tLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXNUaGlja25lc3MsIHAucG9zaXRpb24sIHAudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTaGFwZVR5cGUuSGVtaXNwaGVyZTpcbiAgICAgICAgICAgICAgICBoZW1pc3BoZXJlRW1pdCh0aGlzLmVtaXRGcm9tLCB0aGlzLnJhZGl1cywgdGhpcy5yYWRpdXNUaGlja25lc3MsIHAucG9zaXRpb24sIHAudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4odGhpcy5zaGFwZVR5cGUgKyAnIHNoYXBlVHlwZSBpcyBub3Qgc3VwcG9ydGVkIGJ5IFNoYXBlTW9kdWxlLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJhbmRvbVBvc2l0aW9uQW1vdW50ID4gMCkge1xuICAgICAgICAgICAgcC5wb3NpdGlvbi54ICs9IHJhbmRvbVJhbmdlKC10aGlzLnJhbmRvbVBvc2l0aW9uQW1vdW50LCB0aGlzLnJhbmRvbVBvc2l0aW9uQW1vdW50KTtcbiAgICAgICAgICAgIHAucG9zaXRpb24ueSArPSByYW5kb21SYW5nZSgtdGhpcy5yYW5kb21Qb3NpdGlvbkFtb3VudCwgdGhpcy5yYW5kb21Qb3NpdGlvbkFtb3VudCk7XG4gICAgICAgICAgICBwLnBvc2l0aW9uLnogKz0gcmFuZG9tUmFuZ2UoLXRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQsIHRoaXMucmFuZG9tUG9zaXRpb25BbW91bnQpO1xuICAgICAgICB9XG4gICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChwLnZlbG9jaXR5LCBwLnZlbG9jaXR5LCB0aGlzLnF1YXQpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQocC5wb3NpdGlvbiwgcC5wb3NpdGlvbiwgdGhpcy5tYXQpO1xuICAgICAgICBpZiAodGhpcy5zcGhlcmljYWxEaXJlY3Rpb25BbW91bnQgPiAwKSB7XG4gICAgICAgICAgICBjb25zdCBzcGhlcmljYWxWZWwgPSBWZWMzLm5vcm1hbGl6ZShfaW50ZXJtZWRpVmVjLCBwLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIFZlYzMubGVycChwLnZlbG9jaXR5LCBwLnZlbG9jaXR5LCBzcGhlcmljYWxWZWwsIHRoaXMuc3BoZXJpY2FsRGlyZWN0aW9uQW1vdW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gdGhpcy5wYXJ0aWNsZVN5c3RlbS5fdGltZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUFyY0FuZ2xlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXJjTW9kZSA9PT0gQXJjTW9kZS5SYW5kb20pIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21SYW5nZSgwLCB0aGlzLl9hcmMpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMudG90YWxBbmdsZSArIDIgKiBNYXRoLlBJICogdGhpcy5hcmNTcGVlZC5ldmFsdWF0ZSh0aGlzLnBhcnRpY2xlU3lzdGVtLl90aW1lLCAxKSAqICh0aGlzLnBhcnRpY2xlU3lzdGVtLl90aW1lIC0gdGhpcy5sYXN0VGltZSk7XG4gICAgICAgIHRoaXMudG90YWxBbmdsZSA9IGFuZ2xlO1xuICAgICAgICBpZiAodGhpcy5hcmNTcHJlYWQgIT09IDApIHtcbiAgICAgICAgICAgIGFuZ2xlID0gTWF0aC5mbG9vcihhbmdsZSAvICh0aGlzLl9hcmMgKiB0aGlzLmFyY1NwcmVhZCkpICogdGhpcy5fYXJjICogdGhpcy5hcmNTcHJlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLmFyY01vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgQXJjTW9kZS5Mb29wOlxuICAgICAgICAgICAgICAgIHJldHVybiByZXBlYXQoYW5nbGUsIHRoaXMuX2FyYyk7XG4gICAgICAgICAgICBjYXNlIEFyY01vZGUuUGluZ1Bvbmc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBpbmdQb25nKGFuZ2xlLCB0aGlzLl9hcmMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzcGhlcmVFbWl0IChlbWl0RnJvbSwgcmFkaXVzLCByYWRpdXNUaGlja25lc3MsIHBvcywgZGlyKSB7XG4gICAgc3dpdGNoIChlbWl0RnJvbSkge1xuICAgICAgICBjYXNlIEVtaXRMb2NhdGlvbi5Wb2x1bWU6XG4gICAgICAgICAgICByYW5kb21Qb2ludEJldHdlZW5TcGhlcmUocG9zLCByYWRpdXMgKiAoMSAtIHJhZGl1c1RoaWNrbmVzcyksIHJhZGl1cyk7XG4gICAgICAgICAgICBWZWMzLmNvcHkoZGlyLCBwb3MpO1xuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGlyLCBkaXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlNoZWxsOlxuICAgICAgICAgICAgcmFuZG9tVW5pdFZlY3Rvcihwb3MpO1xuICAgICAgICAgICAgVmVjMy5zY2FsZShwb3MsIHBvcywgcmFkaXVzKTtcbiAgICAgICAgICAgIFZlYzMuY29weShkaXIsIHBvcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlbWl0RnJvbSArICcgaXMgbm90IHN1cHBvcnRlZCBmb3Igc3BoZXJlIGVtaXR0ZXIuJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoZW1pc3BoZXJlRW1pdCAoZW1pdEZyb20sIHJhZGl1cywgcmFkaXVzVGhpY2tuZXNzLCBwb3MsIGRpcikge1xuICAgIHN3aXRjaCAoZW1pdEZyb20pIHtcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uVm9sdW1lOlxuICAgICAgICAgICAgcmFuZG9tUG9pbnRCZXR3ZWVuU3BoZXJlKHBvcywgcmFkaXVzICogKDEgLSByYWRpdXNUaGlja25lc3MpLCByYWRpdXMpO1xuICAgICAgICAgICAgaWYgKHBvcy56ID4gMCkge1xuICAgICAgICAgICAgICAgIHBvcy56ICo9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmVjMy5jb3B5KGRpciwgcG9zKTtcbiAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKGRpciwgZGlyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEVtaXRMb2NhdGlvbi5TaGVsbDpcbiAgICAgICAgICAgIHJhbmRvbVVuaXRWZWN0b3IocG9zKTtcbiAgICAgICAgICAgIFZlYzMuc2NhbGUocG9zLCBwb3MsIHJhZGl1cyk7XG4gICAgICAgICAgICBpZiAocG9zLnogPCAwKSB7XG4gICAgICAgICAgICAgICAgcG9zLnogKj0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBWZWMzLmNvcHkoZGlyLCBwb3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZW1pdEZyb20gKyAnIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGhlbWlzcGhlcmUgZW1pdHRlci4nKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbmVFbWl0IChlbWl0RnJvbSwgcmFkaXVzLCByYWRpdXNUaGlja25lc3MsIHRoZXRhLCBhbmdsZSwgbGVuZ3RoLCBwb3MsIGRpcikge1xuICAgIHN3aXRjaCAoZW1pdEZyb20pIHtcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uQmFzZTpcbiAgICAgICAgICAgIHJhbmRvbVBvaW50QmV0d2VlbkNpcmNsZUF0Rml4ZWRBbmdsZShwb3MsIHJhZGl1cyAqICgxIC0gcmFkaXVzVGhpY2tuZXNzKSwgcmFkaXVzLCB0aGV0YSk7XG4gICAgICAgICAgICBWZWMyLnNjYWxlKGRpciwgcG9zLCBNYXRoLnNpbihhbmdsZSkpO1xuICAgICAgICAgICAgZGlyLnogPSAtTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUoZGlyLCBkaXIpO1xuICAgICAgICAgICAgcG9zLnogPSAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlNoZWxsOlxuICAgICAgICAgICAgZml4ZWRBbmdsZVVuaXRWZWN0b3IyKHBvcywgdGhldGEpO1xuICAgICAgICAgICAgVmVjMi5zY2FsZShkaXIsIHBvcywgTWF0aC5zaW4oYW5nbGUpKTtcbiAgICAgICAgICAgIGRpci56ID0gLU1hdGguY29zKGFuZ2xlKTtcbiAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKGRpciwgZGlyKTtcbiAgICAgICAgICAgIFZlYzIuc2NhbGUocG9zLCBwb3MsIHJhZGl1cyk7XG4gICAgICAgICAgICBwb3MueiA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uVm9sdW1lOlxuICAgICAgICAgICAgcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlQXRGaXhlZEFuZ2xlKHBvcywgcmFkaXVzICogKDEgLSByYWRpdXNUaGlja25lc3MpLCByYWRpdXMsIHRoZXRhKTtcbiAgICAgICAgICAgIFZlYzIuc2NhbGUoZGlyLCBwb3MsIE1hdGguc2luKGFuZ2xlKSk7XG4gICAgICAgICAgICBkaXIueiA9IC1NYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShkaXIsIGRpcik7XG4gICAgICAgICAgICBwb3MueiA9IDA7XG4gICAgICAgICAgICBWZWMzLmFkZChwb3MsIHBvcywgVmVjMy5zY2FsZShfaW50ZXJtZWRpVmVjLCBkaXIsIGxlbmd0aCAqIHJhbmRvbSgpIC8gLWRpci56KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlbWl0RnJvbSArICcgaXMgbm90IHN1cHBvcnRlZCBmb3IgY29uZSBlbWl0dGVyLicpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYm94RW1pdCAoZW1pdEZyb20sIGJveFRoaWNrbmVzcywgcG9zLCBkaXIpIHtcbiAgICBzd2l0Y2ggKGVtaXRGcm9tKSB7XG4gICAgICAgIGNhc2UgRW1pdExvY2F0aW9uLlZvbHVtZTpcbiAgICAgICAgICAgIHJhbmRvbVBvaW50SW5DdWJlKHBvcywgX3VuaXRCb3hFeHRlbnQpO1xuICAgICAgICAgICAgLy8gcmFuZG9tUG9pbnRCZXR3ZWVuQ3ViZShwb3MsIFZlYzMubXVsdGlwbHkoX2ludGVybWVkaVZlYywgX3VuaXRCb3hFeHRlbnQsIGJveFRoaWNrbmVzcyksIF91bml0Qm94RXh0ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEVtaXRMb2NhdGlvbi5TaGVsbDpcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIuc3BsaWNlKDAsIF9pbnRlcm1lZGlBcnIubGVuZ3RoKTtcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21SYW5nZSgtMC41LCAwLjUpKTtcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21SYW5nZSgtMC41LCAwLjUpKTtcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21TaWduKCkgKiAwLjUpO1xuICAgICAgICAgICAgcmFuZG9tU29ydEFycmF5KF9pbnRlcm1lZGlBcnIpO1xuICAgICAgICAgICAgYXBwbHlCb3hUaGlja25lc3MoX2ludGVybWVkaUFyciwgYm94VGhpY2tuZXNzKTtcbiAgICAgICAgICAgIFZlYzMuc2V0KHBvcywgX2ludGVybWVkaUFyclswXSwgX2ludGVybWVkaUFyclsxXSwgX2ludGVybWVkaUFyclsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBFbWl0TG9jYXRpb24uRWRnZTpcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIuc3BsaWNlKDAsIF9pbnRlcm1lZGlBcnIubGVuZ3RoKTtcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21SYW5nZSgtMC41LCAwLjUpKTtcbiAgICAgICAgICAgIF9pbnRlcm1lZGlBcnIucHVzaChyYW5kb21TaWduKCkgKiAwLjUpO1xuICAgICAgICAgICAgX2ludGVybWVkaUFyci5wdXNoKHJhbmRvbVNpZ24oKSAqIDAuNSk7XG4gICAgICAgICAgICByYW5kb21Tb3J0QXJyYXkoX2ludGVybWVkaUFycik7XG4gICAgICAgICAgICBhcHBseUJveFRoaWNrbmVzcyhfaW50ZXJtZWRpQXJyLCBib3hUaGlja25lc3MpO1xuICAgICAgICAgICAgVmVjMy5zZXQocG9zLCBfaW50ZXJtZWRpQXJyWzBdLCBfaW50ZXJtZWRpQXJyWzFdLCBfaW50ZXJtZWRpQXJyWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS53YXJuKGVtaXRGcm9tICsgJyBpcyBub3Qgc3VwcG9ydGVkIGZvciBib3ggZW1pdHRlci4nKTtcbiAgICB9XG4gICAgVmVjMy5jb3B5KGRpciwgcGFydGljbGVFbWl0WkF4aXMpO1xufVxuXG5mdW5jdGlvbiBjaXJjbGVFbWl0IChyYWRpdXMsIHJhZGl1c1RoaWNrbmVzcywgdGhldGEsIHBvcywgZGlyKSB7XG4gICAgcmFuZG9tUG9pbnRCZXR3ZWVuQ2lyY2xlQXRGaXhlZEFuZ2xlKHBvcywgcmFkaXVzICogKDEgLSByYWRpdXNUaGlja25lc3MpLCByYWRpdXMsIHRoZXRhKTtcbiAgICBWZWMzLm5vcm1hbGl6ZShkaXIsIHBvcyk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5Qm94VGhpY2tuZXNzIChwb3MsIHRoaWNrbmVzcykge1xuICAgIGlmICh0aGlja25lc3MueCA+IDApIHtcbiAgICAgICAgcG9zWzBdICs9IDAuNSAqIHJhbmRvbVJhbmdlKC10aGlja25lc3MueCwgdGhpY2tuZXNzLngpO1xuICAgICAgICBwb3NbMF0gPSBjbGFtcChwb3NbMF0sIC0wLjUsIDAuNSk7XG4gICAgfVxuICAgIGlmICh0aGlja25lc3MueSA+IDApIHtcbiAgICAgICAgcG9zWzFdICs9IDAuNSAqIHJhbmRvbVJhbmdlKC10aGlja25lc3MueSwgdGhpY2tuZXNzLnkpO1xuICAgICAgICBwb3NbMV0gPSBjbGFtcChwb3NbMV0sIC0wLjUsIDAuNSk7XG4gICAgfVxuICAgIGlmICh0aGlja25lc3MueiA+IDApIHtcbiAgICAgICAgcG9zWzJdICs9IDAuNSAqIHJhbmRvbVJhbmdlKC10aGlja25lc3MueiwgdGhpY2tuZXNzLnopO1xuICAgICAgICBwb3NbMl0gPSBjbGFtcChwb3NbMl0sIC0wLjUsIDAuNSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=