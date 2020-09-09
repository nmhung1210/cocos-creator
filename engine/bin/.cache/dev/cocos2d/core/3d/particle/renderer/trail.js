
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/renderer/trail.js';
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

var _gfx = _interopRequireDefault(require("../../../../renderer/gfx"));

var _pool = _interopRequireDefault(require("../../../../renderer/memop/pool"));

var _curveRange = _interopRequireDefault(require("../animator/curve-range"));

var _gradientRange = _interopRequireDefault(require("../animator/gradient-range"));

var _enum = require("../enum");

var _utils = _interopRequireDefault(require("../utils"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

// tslint:disable: max-line-length
var PRE_TRIANGLE_INDEX = 1;
var NEXT_TRIANGLE_INDEX = 1 << 2;
var DIRECTION_THRESHOLD = Math.cos((0, _valueTypes.toRadian)(100));
var _temp_trailEle = {
  position: cc.v3(),
  velocity: cc.v3()
};

var _temp_quat = cc.quat();

var _temp_xform = cc.mat4();

var _temp_Vec3 = cc.v3();

var _temp_Vec3_1 = cc.v3();

var _temp_color = cc.color(); // var barycentric = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // <wireframe debug>
// var _bcIdx = 0;


var ITrailElement = function ITrailElement() {
  this.position = void 0;
  this.lifetime = void 0;
  this.width = void 0;
  this.velocity = void 0;
  this.color = void 0;
}; // the valid element is in [start,end) range.if start equals -1,it represents the array is empty.


var TrailSegment = /*#__PURE__*/function () {
  function TrailSegment(maxTrailElementNum) {
    this.start = void 0;
    this.end = void 0;
    this.trailElements = [];
    this.start = -1;
    this.end = -1;
    this.trailElements = [];

    while (maxTrailElementNum--) {
      this.trailElements.push({
        position: cc.v3(),
        lifetime: 0,
        width: 0,
        velocity: cc.v3(),
        direction: 0,
        color: cc.color()
      });
    }
  }

  var _proto = TrailSegment.prototype;

  _proto.getElement = function getElement(idx) {
    if (this.start === -1) {
      return null;
    }

    if (idx < 0) {
      idx = (idx + this.trailElements.length) % this.trailElements.length;
    }

    if (idx >= this.trailElements.length) {
      idx %= this.trailElements.length;
    }

    return this.trailElements[idx];
  };

  _proto.addElement = function addElement() {
    if (this.trailElements.length === 0) {
      return null;
    }

    if (this.start === -1) {
      this.start = 0;
      this.end = 1;
      return this.trailElements[0];
    }

    if (this.start === this.end) {
      this.trailElements.splice(this.end, 0, {
        position: cc.v3(),
        lifetime: 0,
        width: 0,
        velocity: cc.v3(),
        direction: 0,
        color: cc.color()
      });
      this.start++;
      this.start %= this.trailElements.length;
    }

    var newEleLoc = this.end++;
    this.end %= this.trailElements.length;
    return this.trailElements[newEleLoc];
  };

  _proto.iterateElement = function iterateElement(target, f, p, dt) {
    var end = this.start >= this.end ? this.end + this.trailElements.length : this.end;

    for (var i = this.start; i < end; i++) {
      if (f(target, this.trailElements[i % this.trailElements.length], p, dt)) {
        this.start++;
        this.start %= this.trailElements.length;
      }
    }

    if (this.start === end) {
      this.start = -1;
      this.end = -1;
    }
  };

  _proto.count = function count() {
    if (this.start < this.end) {
      return this.end - this.start;
    } else {
      return this.trailElements.length + this.end - this.start;
    }
  };

  _proto.clear = function clear() {
    this.start = -1;
    this.end = -1;
  };

  return TrailSegment;
}();
/**
 * !#en The trail module of 3d particle.
 * !#zh 3D 粒子拖尾模块
 * @class TrailModule
 */


var TrailModule = (_dec = (0, _CCClassDecorator.ccclass)('cc.TrailModule'), _dec2 = (0, _CCClassDecorator.property)({
  type: _enum.TrailMode
}), _dec3 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec4 = (0, _CCClassDecorator.property)({
  type: _enum.Space
}), _dec5 = (0, _CCClassDecorator.property)({
  type: _enum.TextureMode
}), _dec6 = (0, _CCClassDecorator.property)({
  type: _curveRange["default"]
}), _dec7 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec8 = (0, _CCClassDecorator.property)({
  type: _gradientRange["default"]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function () {
  _createClass(TrailModule, [{
    key: "enable",

    /**
     * !#en The enable of trailModule.
     * !#zh 是否启用
     * @property {Boolean} enable
     */
    get: function get() {
      return this._enable;
    },
    set: function set(val) {
      if (val) {
        this._createTrailData();
      }

      if (val && !this._enable) {
        this._enable = val;

        this._particleSystem._assembler._updateTrailMaterial();
      }

      this._enable = val;

      this._particleSystem._assembler._updateTrailEnable(this._enable);
    }
    /**
     * !#en Sets how particles generate trajectories.
     * !#zh 设定粒子生成轨迹的方式。
     * @property {TrailMode} mode
     */

  }, {
    key: "minParticleDistance",

    /**
     * !#en Minimum spacing between each track particle
     * !#zh 每个轨迹粒子之间的最小间距。
     * @property {Number} minParticleDistance
     */
    get: function get() {
      return this._minParticleDistance;
    },
    set: function set(val) {
      this._minParticleDistance = val;
      this._minSquaredDistance = val * val;
    }
  }, {
    key: "space",

    /**
     * !#en The coordinate system of trajectories.
     * !#zh 轨迹设定时的坐标系。
     * @property {Space} space
     */
    get: function get() {
      return this._space;
    },
    set: function set(val) {
      this._space = val;

      if (this._particleSystem) {
        this._particleSystem._assembler._updateTrailMaterial();
      }
    }
    /**
     * !#en Whether the particle itself exists.
     * !#zh 粒子本身是否存在。
     * @property {Boolean} existWithParticles
     */

  }]);

  function TrailModule() {
    _initializerDefineProperty(this, "_enable", _descriptor, this);

    _initializerDefineProperty(this, "mode", _descriptor2, this);

    _initializerDefineProperty(this, "lifeTime", _descriptor3, this);

    _initializerDefineProperty(this, "_minParticleDistance", _descriptor4, this);

    _initializerDefineProperty(this, "_space", _descriptor5, this);

    _initializerDefineProperty(this, "existWithParticles", _descriptor6, this);

    _initializerDefineProperty(this, "textureMode", _descriptor7, this);

    _initializerDefineProperty(this, "widthFromParticle", _descriptor8, this);

    _initializerDefineProperty(this, "widthRatio", _descriptor9, this);

    _initializerDefineProperty(this, "colorFromParticle", _descriptor10, this);

    _initializerDefineProperty(this, "colorOverTrail", _descriptor11, this);

    _initializerDefineProperty(this, "colorOvertime", _descriptor12, this);

    this._particleSystem = null;
    this._minSquaredDistance = 0;
    this._vertSize = 0;
    this._trailNum = 0;
    this._trailLifetime = 0;
    this.vbOffset = 0;
    this.ibOffset = 0;
    this._trailSegments = null;
    this._particleTrail = null;
    this._ia = null;
    this._gfxVFmt = null;
    this._vbF32 = null;
    this._vbUint32 = null;
    this._iBuffer = null;
    this._needTransform = null;
    this._defaultMat = null;
    this._material = null;
    this._gfxVFmt = new _gfx["default"].VertexFormat([{
      name: _gfx["default"].ATTR_POSITION,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 3
    }, {
      name: _gfx["default"].ATTR_TEX_COORD,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 4
    }, //{ name: gfx.ATTR_TEX_COORD2, type: gfx.ATTR_TYPE_FLOAT32, num: 3 }, // <wireframe debug>
    {
      name: _gfx["default"].ATTR_TEX_COORD1,
      type: _gfx["default"].ATTR_TYPE_FLOAT32,
      num: 3
    }, {
      name: _gfx["default"].ATTR_COLOR,
      type: _gfx["default"].ATTR_TYPE_UINT8,
      num: 4,
      normalize: true
    }]);
    this._vertSize = this._gfxVFmt._bytes;
    this._particleTrail = new _utils["default"](); // Map<Particle, TrailSegment>();
  }

  var _proto2 = TrailModule.prototype;

  _proto2.onInit = function onInit(ps) {
    this._particleSystem = ps;
    this.minParticleDistance = this._minParticleDistance;
    var burstCount = 0;

    for (var _iterator = _createForOfIteratorHelperLoose(ps.bursts), _step; !(_step = _iterator()).done;) {
      var b = _step.value;
      burstCount += b.getMaxCount(ps);
    }

    this.lifeTime.constant = 1;
    this._trailNum = Math.ceil(ps.startLifetime.getMax() * this.lifeTime.getMax() * 60 * (ps.rateOverTime.getMax() * ps.duration + burstCount));
    this._trailSegments = new _pool["default"](function () {
      return new TrailSegment(10);
    }, Math.ceil(ps.rateOverTime.getMax() * ps.duration));

    if (this._enable) {
      this.enable = this._enable;

      this._updateMaterial();
    }
  };

  _proto2.onEnable = function onEnable() {};

  _proto2.onDisable = function onDisable() {};

  _proto2.destroy = function destroy() {
    if (this._trailSegments) {
      this._trailSegments.clear(function (obj) {
        obj.trailElements.length = 0;
      });

      this._trailSegments = null;
    }
  };

  _proto2.clear = function clear() {
    if (this.enable) {
      var trailIter = this._particleTrail.values();

      var trail = trailIter.next();

      while (!trail.done) {
        trail.value.clear();
        trail = trailIter.next();
      }

      this._particleTrail.clear();

      this.updateTrailBuffer();
    }
  };

  _proto2._createTrailData = function _createTrailData() {
    var model = this._particleSystem._assembler._model;

    if (model) {
      model.createTrailData(this._gfxVFmt, this._trailNum);
      var subData = model._subDatas[1];
      this._vbF32 = subData.getVData();
      this._vbUint32 = subData.getVData(Uint32Array);
      this._iBuffer = subData.iData;
    }
  };

  _proto2._updateMaterial = function _updateMaterial() {
    if (this._particleSystem) {
      var mat = this._particleSystem.trailMaterial;

      if (mat) {
        this._material = mat;
      } else {
        this._material = this._particleSystem._assembler._defaultTrailMat;
      }
    }
  };

  _proto2.update = function update() {
    this._trailLifetime = this.lifeTime.evaluate(this._particleSystem._time, 1);

    if (this.space === _enum.Space.World && this._particleSystem._simulationSpace === _enum.Space.Local) {
      this._needTransform = true;

      this._particleSystem.node.getWorldMatrix(_temp_xform);

      this._particleSystem.node.getWorldRotation(_temp_quat);
    } else {
      this._needTransform = false;
    }
  };

  _proto2.animate = function animate(p, scaledDt) {
    if (!this._trailSegments) {
      return;
    }

    var trail = this._particleTrail.get(p);

    if (!trail) {
      trail = this._trailSegments.alloc();

      this._particleTrail.set(p, trail);

      return;
    }

    var lastSeg = trail.getElement(trail.end - 1);

    if (this._needTransform) {
      _valueTypes.Vec3.transformMat4(_temp_Vec3, p.position, _temp_xform);
    } else {
      _valueTypes.Vec3.copy(_temp_Vec3, p.position);
    }

    if (lastSeg) {
      trail.iterateElement(this, this._updateTrailElement, p, scaledDt);

      if (_valueTypes.Vec3.squaredDistance(lastSeg.position, _temp_Vec3) < this._minSquaredDistance) {
        return;
      }
    }

    lastSeg = trail.addElement();

    if (!lastSeg) {
      return;
    }

    _valueTypes.Vec3.copy(lastSeg.position, _temp_Vec3);

    lastSeg.lifetime = 0;

    if (this.widthFromParticle) {
      lastSeg.width = p.size.x * this.widthRatio.evaluate(0, 1);
    } else {
      lastSeg.width = this.widthRatio.evaluate(0, 1);
    }

    var trailNum = trail.count();

    if (trailNum === 2) {
      var lastSecondTrail = trail.getElement(trail.end - 2);

      _valueTypes.Vec3.subtract(lastSecondTrail.velocity, lastSeg.position, lastSecondTrail.position);
    } else if (trailNum > 2) {
      var _lastSecondTrail = trail.getElement(trail.end - 2);

      var lastThirdTrail = trail.getElement(trail.end - 3);

      _valueTypes.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, _lastSecondTrail.position);

      _valueTypes.Vec3.subtract(_temp_Vec3_1, lastSeg.position, _lastSecondTrail.position);

      _valueTypes.Vec3.subtract(_lastSecondTrail.velocity, _temp_Vec3_1, _temp_Vec3);

      if (_valueTypes.Vec3.equals(cc.Vec3.ZERO, _lastSecondTrail.velocity)) {
        _valueTypes.Vec3.copy(_lastSecondTrail.velocity, _temp_Vec3);
      }
    }

    if (this.colorFromParticle) {
      lastSeg.color.set(p.color);
    } else {
      lastSeg.color.set(this.colorOvertime.evaluate(0, 1));
    }
  };

  _proto2._updateTrailElement = function _updateTrailElement(trail, trailEle, p, dt) {
    trailEle.lifetime += dt;

    if (trail.colorFromParticle) {
      trailEle.color.set(p.color);
      trailEle.color.multiply(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    } else {
      trailEle.color.set(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
    }

    if (trail.widthFromParticle) {
      trailEle.width = p.size.x * trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
    } else {
      trailEle.width = trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
    }

    return trailEle.lifetime > trail._trailLifetime;
  };

  _proto2.removeParticle = function removeParticle(p) {
    var trail = this._particleTrail.get(p);

    if (trail && this._trailSegments) {
      trail.clear();

      this._trailSegments.free(trail);

      this._particleTrail["delete"](p);
    }
  };

  _proto2.updateTrailBuffer = function updateTrailBuffer() {
    this.vbOffset = 0;
    this.ibOffset = 0;

    for (var _iterator2 = _createForOfIteratorHelperLoose(this._particleTrail.keys()), _step2; !(_step2 = _iterator2()).done;) {
      var p = _step2.value;

      var trailSeg = this._particleTrail.get(p);

      if (trailSeg.start === -1) {
        continue;
      }

      var indexOffset = this.vbOffset * 4 / this._vertSize;
      var end = trailSeg.start >= trailSeg.end ? trailSeg.end + trailSeg.trailElements.length : trailSeg.end;
      var trailNum = end - trailSeg.start; // const lastSegRatio = Vec3.distance(trailSeg.getTailElement()!.position, p.position) / this._minParticleDistance;

      var textCoordSeg = 1 / trailNum
      /*- 1 + lastSegRatio*/
      ;
      var startSegEle = trailSeg.trailElements[trailSeg.start];

      this._fillVertexBuffer(startSegEle, this.colorOverTrail.evaluate(1, 1), indexOffset, 1, 0, NEXT_TRIANGLE_INDEX);

      for (var i = trailSeg.start + 1; i < end; i++) {
        var segEle = trailSeg.trailElements[i % trailSeg.trailElements.length];
        var j = i - trailSeg.start;

        this._fillVertexBuffer(segEle, this.colorOverTrail.evaluate(1 - j / trailNum, 1), indexOffset, 1 - j * textCoordSeg, j, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
      }

      if (this._needTransform) {
        _valueTypes.Vec3.transformMat4(_temp_trailEle.position, p.position, _temp_xform);
      } else {
        _valueTypes.Vec3.copy(_temp_trailEle.position, p.position);
      }

      if (trailNum === 1 || trailNum === 2) {
        var lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);

        _valueTypes.Vec3.subtract(lastSecondTrail.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._vbF32[this.vbOffset - this._vertSize / 4 - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - this._vertSize / 4 - 2] = lastSecondTrail.velocity.z;
        this._vbF32[this.vbOffset - 4] = lastSecondTrail.velocity.x;
        this._vbF32[this.vbOffset - 3] = lastSecondTrail.velocity.y;
        this._vbF32[this.vbOffset - 2] = lastSecondTrail.velocity.z;

        _valueTypes.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);

        this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
      } else if (trailNum > 2) {
        var _lastSecondTrail2 = trailSeg.getElement(trailSeg.end - 1);

        var lastThirdTrail = trailSeg.getElement(trailSeg.end - 2);

        _valueTypes.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.subtract(_temp_Vec3_1, _temp_trailEle.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.normalize(_temp_Vec3, _temp_Vec3);

        _valueTypes.Vec3.normalize(_temp_Vec3_1, _temp_Vec3_1);

        _valueTypes.Vec3.subtract(_lastSecondTrail2.velocity, _temp_Vec3_1, _temp_Vec3);

        _valueTypes.Vec3.normalize(_lastSecondTrail2.velocity, _lastSecondTrail2.velocity);

        this._checkDirectionReverse(_lastSecondTrail2, lastThirdTrail);

        this.vbOffset -= this._vertSize / 4 * 2;
        this.ibOffset -= 6; //_bcIdx = (_bcIdx - 6 + 9) % 9;  // <wireframe debug>

        this._fillVertexBuffer(_lastSecondTrail2, this.colorOverTrail.evaluate(textCoordSeg, 1), indexOffset, textCoordSeg, trailNum - 1, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);

        _valueTypes.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, _lastSecondTrail2.position);

        _valueTypes.Vec3.normalize(_temp_trailEle.velocity, _temp_trailEle.velocity);

        this._checkDirectionReverse(_temp_trailEle, _lastSecondTrail2);
      }

      if (this.widthFromParticle) {
        _temp_trailEle.width = p.size.x * this.widthRatio.evaluate(0, 1);
      } else {
        _temp_trailEle.width = this.widthRatio.evaluate(0, 1);
      }

      _temp_trailEle.color = p.color;

      if (_valueTypes.Vec3.equals(_temp_trailEle.velocity, cc.Vec3.ZERO)) {
        this.ibOffset -= 3;
      } else {
        this._fillVertexBuffer(_temp_trailEle, this.colorOverTrail.evaluate(0, 1), indexOffset, 0, trailNum, PRE_TRIANGLE_INDEX);
      }
    }

    this._updateIA(this.ibOffset);
  };

  _proto2._fillVertexBuffer = function _fillVertexBuffer(trailSeg, colorModifer, indexOffset, xTexCoord, trailEleIdx, indexSet) {
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 0;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 0; // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;

    _temp_color.set(trailSeg.color);

    _temp_color.multiply(colorModifer);

    this._vbUint32[this.vbOffset++] = _temp_color._val;
    this._vbF32[this.vbOffset++] = trailSeg.position.x;
    this._vbF32[this.vbOffset++] = trailSeg.position.y;
    this._vbF32[this.vbOffset++] = trailSeg.position.z;
    this._vbF32[this.vbOffset++] = 1;
    this._vbF32[this.vbOffset++] = trailSeg.width;
    this._vbF32[this.vbOffset++] = xTexCoord;
    this._vbF32[this.vbOffset++] = 1; // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
    // _bcIdx %= 9;

    this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
    this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
    this._vbUint32[this.vbOffset++] = _temp_color._val;

    if (indexSet & PRE_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx - 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
    }

    if (indexSet & NEXT_TRIANGLE_INDEX) {
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
      this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 2;
    }
  };

  _proto2._updateIA = function _updateIA(count) {
    if (this._particleSystem && this._particleSystem._assembler) {
      this._particleSystem._assembler.updateIA(1, count, true, true);
    }
  };

  _proto2._checkDirectionReverse = function _checkDirectionReverse(currElement, prevElement) {
    if (_valueTypes.Vec3.dot(currElement.velocity, prevElement.velocity) < DIRECTION_THRESHOLD) {
      currElement.direction = 1 - prevElement.direction;
    } else {
      currElement.direction = prevElement.direction;
    }
  };

  return TrailModule;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_enable", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "enable", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "enable"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.TrailMode.Particles;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lifeTime", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_minParticleDistance", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 0.1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "minParticleDistance", [_CCClassDecorator.property], Object.getOwnPropertyDescriptor(_class2.prototype, "minParticleDistance"), _class2.prototype), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_space", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.World;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "space", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "space"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "existWithParticles", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "textureMode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.TextureMode.Stretch;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "widthFromParticle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "widthRatio", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "colorFromParticle", [_CCClassDecorator.property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "colorOverTrail", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "colorOvertime", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
})), _class2)) || _class);
exports["default"] = TrailModule;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3JlbmRlcmVyL3RyYWlsLnRzIl0sIm5hbWVzIjpbIlBSRV9UUklBTkdMRV9JTkRFWCIsIk5FWFRfVFJJQU5HTEVfSU5ERVgiLCJESVJFQ1RJT05fVEhSRVNIT0xEIiwiTWF0aCIsImNvcyIsIl90ZW1wX3RyYWlsRWxlIiwicG9zaXRpb24iLCJjYyIsInYzIiwidmVsb2NpdHkiLCJfdGVtcF9xdWF0IiwicXVhdCIsIl90ZW1wX3hmb3JtIiwibWF0NCIsIl90ZW1wX1ZlYzMiLCJfdGVtcF9WZWMzXzEiLCJfdGVtcF9jb2xvciIsImNvbG9yIiwiSVRyYWlsRWxlbWVudCIsImxpZmV0aW1lIiwid2lkdGgiLCJUcmFpbFNlZ21lbnQiLCJtYXhUcmFpbEVsZW1lbnROdW0iLCJzdGFydCIsImVuZCIsInRyYWlsRWxlbWVudHMiLCJwdXNoIiwiZGlyZWN0aW9uIiwiZ2V0RWxlbWVudCIsImlkeCIsImxlbmd0aCIsImFkZEVsZW1lbnQiLCJzcGxpY2UiLCJuZXdFbGVMb2MiLCJpdGVyYXRlRWxlbWVudCIsInRhcmdldCIsImYiLCJwIiwiZHQiLCJpIiwiY291bnQiLCJjbGVhciIsIlRyYWlsTW9kdWxlIiwidHlwZSIsIlRyYWlsTW9kZSIsIkN1cnZlUmFuZ2UiLCJTcGFjZSIsIlRleHR1cmVNb2RlIiwiR3JhZGllbnRSYW5nZSIsIl9lbmFibGUiLCJ2YWwiLCJfY3JlYXRlVHJhaWxEYXRhIiwiX3BhcnRpY2xlU3lzdGVtIiwiX2Fzc2VtYmxlciIsIl91cGRhdGVUcmFpbE1hdGVyaWFsIiwiX3VwZGF0ZVRyYWlsRW5hYmxlIiwiX21pblBhcnRpY2xlRGlzdGFuY2UiLCJfbWluU3F1YXJlZERpc3RhbmNlIiwiX3NwYWNlIiwiX3ZlcnRTaXplIiwiX3RyYWlsTnVtIiwiX3RyYWlsTGlmZXRpbWUiLCJ2Yk9mZnNldCIsImliT2Zmc2V0IiwiX3RyYWlsU2VnbWVudHMiLCJfcGFydGljbGVUcmFpbCIsIl9pYSIsIl9nZnhWRm10IiwiX3ZiRjMyIiwiX3ZiVWludDMyIiwiX2lCdWZmZXIiLCJfbmVlZFRyYW5zZm9ybSIsIl9kZWZhdWx0TWF0IiwiX21hdGVyaWFsIiwiZ2Z4IiwiVmVydGV4Rm9ybWF0IiwibmFtZSIsIkFUVFJfUE9TSVRJT04iLCJBVFRSX1RZUEVfRkxPQVQzMiIsIm51bSIsIkFUVFJfVEVYX0NPT1JEIiwiQVRUUl9URVhfQ09PUkQxIiwiQVRUUl9DT0xPUiIsIkFUVFJfVFlQRV9VSU5UOCIsIm5vcm1hbGl6ZSIsIl9ieXRlcyIsIk1hcFV0aWxzIiwib25Jbml0IiwicHMiLCJtaW5QYXJ0aWNsZURpc3RhbmNlIiwiYnVyc3RDb3VudCIsImJ1cnN0cyIsImIiLCJnZXRNYXhDb3VudCIsImxpZmVUaW1lIiwiY29uc3RhbnQiLCJjZWlsIiwic3RhcnRMaWZldGltZSIsImdldE1heCIsInJhdGVPdmVyVGltZSIsImR1cmF0aW9uIiwiUG9vbCIsImVuYWJsZSIsIl91cGRhdGVNYXRlcmlhbCIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwiZGVzdHJveSIsIm9iaiIsInRyYWlsSXRlciIsInZhbHVlcyIsInRyYWlsIiwibmV4dCIsImRvbmUiLCJ2YWx1ZSIsInVwZGF0ZVRyYWlsQnVmZmVyIiwibW9kZWwiLCJfbW9kZWwiLCJjcmVhdGVUcmFpbERhdGEiLCJzdWJEYXRhIiwiX3N1YkRhdGFzIiwiZ2V0VkRhdGEiLCJVaW50MzJBcnJheSIsImlEYXRhIiwibWF0IiwidHJhaWxNYXRlcmlhbCIsIl9kZWZhdWx0VHJhaWxNYXQiLCJ1cGRhdGUiLCJldmFsdWF0ZSIsIl90aW1lIiwic3BhY2UiLCJXb3JsZCIsIl9zaW11bGF0aW9uU3BhY2UiLCJMb2NhbCIsIm5vZGUiLCJnZXRXb3JsZE1hdHJpeCIsImdldFdvcmxkUm90YXRpb24iLCJhbmltYXRlIiwic2NhbGVkRHQiLCJnZXQiLCJhbGxvYyIsInNldCIsImxhc3RTZWciLCJWZWMzIiwidHJhbnNmb3JtTWF0NCIsImNvcHkiLCJfdXBkYXRlVHJhaWxFbGVtZW50Iiwic3F1YXJlZERpc3RhbmNlIiwid2lkdGhGcm9tUGFydGljbGUiLCJzaXplIiwieCIsIndpZHRoUmF0aW8iLCJ0cmFpbE51bSIsImxhc3RTZWNvbmRUcmFpbCIsInN1YnRyYWN0IiwibGFzdFRoaXJkVHJhaWwiLCJlcXVhbHMiLCJaRVJPIiwiY29sb3JGcm9tUGFydGljbGUiLCJjb2xvck92ZXJ0aW1lIiwidHJhaWxFbGUiLCJtdWx0aXBseSIsInJlbWFpbmluZ0xpZmV0aW1lIiwicmVtb3ZlUGFydGljbGUiLCJmcmVlIiwia2V5cyIsInRyYWlsU2VnIiwiaW5kZXhPZmZzZXQiLCJ0ZXh0Q29vcmRTZWciLCJzdGFydFNlZ0VsZSIsIl9maWxsVmVydGV4QnVmZmVyIiwiY29sb3JPdmVyVHJhaWwiLCJzZWdFbGUiLCJqIiwieSIsInoiLCJfY2hlY2tEaXJlY3Rpb25SZXZlcnNlIiwiX3VwZGF0ZUlBIiwiY29sb3JNb2RpZmVyIiwieFRleENvb3JkIiwidHJhaWxFbGVJZHgiLCJpbmRleFNldCIsIl92YWwiLCJ1cGRhdGVJQSIsImN1cnJFbGVtZW50IiwicHJldkVsZW1lbnQiLCJkb3QiLCJwcm9wZXJ0eSIsIlBhcnRpY2xlcyIsIlN0cmV0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0EsSUFBTUEsa0JBQWtCLEdBQUcsQ0FBM0I7QUFDQSxJQUFNQyxtQkFBbUIsR0FBRyxLQUFLLENBQWpDO0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLDBCQUFTLEdBQVQsQ0FBVCxDQUE1QjtBQUVBLElBQU1DLGNBQWMsR0FBRztBQUFFQyxFQUFBQSxRQUFRLEVBQUVDLEVBQUUsQ0FBQ0MsRUFBSCxFQUFaO0FBQXFCQyxFQUFBQSxRQUFRLEVBQUVGLEVBQUUsQ0FBQ0MsRUFBSDtBQUEvQixDQUF2Qjs7QUFDQSxJQUFNRSxVQUFVLEdB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O3FGQXBkQStKOzs7OztXQUNTOzs0REFPVEE7Ozs7O1dBMkJNOUksZ0JBQVUrSTs7Ozs7OztXQVVOLElBQUk5SSxzQkFBSjs7eUZBRVY2STs7Ozs7V0FDc0I7O3lFQU90QkEsbU1BVUFBOzs7OztXQUNRNUksWUFBTW9GOzt1T0EwQmR3RDs7Ozs7V0FDb0I7Ozs7Ozs7V0FVUDNJLGtCQUFZNkk7O3NGQU96QkY7Ozs7O1dBQ21COzs7Ozs7O1dBV1AsSUFBSTdJLHNCQUFKOzt1RkFPWjZJOzs7OztXQUNtQjs7Ozs7OztXQVVILElBQUkxSSx5QkFBSjs7Ozs7OztXQVVELElBQUlBLHlCQUFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2NjbGFzcywgcHJvcGVydHkgfSBmcm9tICcuLi8uLi8uLi9wbGF0Zm9ybS9DQ0NsYXNzRGVjb3JhdG9yJztcbmltcG9ydCB7IFZlYzMsIHRvUmFkaWFuLCBDb2xvcn0gZnJvbSAnLi4vLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi8uLi8uLi9yZW5kZXJlci9nZngnO1xuaW1wb3J0IFBvb2wgZnJvbSAnLi4vLi4vLi4vLi4vcmVuZGVyZXIvbWVtb3AvcG9vbCc7XG5pbXBvcnQgQ3VydmVSYW5nZSBmcm9tICcuLi9hbmltYXRvci9jdXJ2ZS1yYW5nZSc7XG5pbXBvcnQgR3JhZGllbnRSYW5nZSBmcm9tICcuLi9hbmltYXRvci9ncmFkaWVudC1yYW5nZSc7XG5pbXBvcnQgeyBTcGFjZSwgVGV4dHVyZU1vZGUsIFRyYWlsTW9kZSB9IGZyb20gJy4uL2VudW0nO1xuaW1wb3J0IE1hcFV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuLy8gdHNsaW50OmRpc2FibGU6IG1heC1saW5lLWxlbmd0aFxuY29uc3QgUFJFX1RSSUFOR0xFX0lOREVYID0gMTtcbmNvbnN0IE5FWFRfVFJJQU5HTEVfSU5ERVggPSAxIDw8IDI7XG5jb25zdCBESVJFQ1RJT05fVEhSRVNIT0xEID0gTWF0aC5jb3ModG9SYWRpYW4oMTAwKSk7XG5cbmNvbnN0IF90ZW1wX3RyYWlsRWxlID0geyBwb3NpdGlvbjogY2MudjMoKSwgdmVsb2NpdHk6IGNjLnYzKCkgfTtcbmNvbnN0IF90ZW1wX3F1YXQgPSBjYy5xdWF0KCk7XG5jb25zdCBfdGVtcF94Zm9ybSA9IGNjLm1hdDQoKTtcbmNvbnN0IF90ZW1wX1ZlYzMgPSBjYy52MygpO1xuY29uc3QgX3RlbXBfVmVjM18xID0gY2MudjMoKTtcbmNvbnN0IF90ZW1wX2NvbG9yID0gY2MuY29sb3IoKTtcblxuLy8gdmFyIGJhcnljZW50cmljID0gWzEsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDFdOyAvLyA8d2lyZWZyYW1lIGRlYnVnPlxuLy8gdmFyIF9iY0lkeCA9IDA7XG5cblxuY2xhc3MgSVRyYWlsRWxlbWVudCB7XG4gICAgcG9zaXRpb247XG4gICAgbGlmZXRpbWU7XG4gICAgd2lkdGg7XG4gICAgdmVsb2NpdHk7XG4gICAgY29sb3I7XG59XG5cbi8vIHRoZSB2YWxpZCBlbGVtZW50IGlzIGluIFtzdGFydCxlbmQpIHJhbmdlLmlmIHN0YXJ0IGVxdWFscyAtMSxpdCByZXByZXNlbnRzIHRoZSBhcnJheSBpcyBlbXB0eS5cbmNsYXNzIFRyYWlsU2VnbWVudCB7XG4gICAgc3RhcnQ7XG4gICAgZW5kO1xuICAgIHRyYWlsRWxlbWVudHMgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yIChtYXhUcmFpbEVsZW1lbnROdW0pIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IC0xO1xuICAgICAgICB0aGlzLmVuZCA9IC0xO1xuICAgICAgICB0aGlzLnRyYWlsRWxlbWVudHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKG1heFRyYWlsRWxlbWVudE51bS0tKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWlsRWxlbWVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGNjLnYzKCksXG4gICAgICAgICAgICAgICAgbGlmZXRpbWU6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgdmVsb2NpdHk6IGNjLnYzKCksXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjYy5jb2xvcigpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRFbGVtZW50IChpZHgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgICAgICAgaWR4ID0gKGlkeCArIHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGgpICUgdGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWR4ID49IHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlkeCAlPSB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWlsRWxlbWVudHNbaWR4XTtcbiAgICB9XG5cbiAgICBhZGRFbGVtZW50ICgpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zdGFydCA9IDA7XG4gICAgICAgICAgICB0aGlzLmVuZCA9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFpbEVsZW1lbnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0ID09PSB0aGlzLmVuZCkge1xuICAgICAgICAgICAgdGhpcy50cmFpbEVsZW1lbnRzLnNwbGljZSh0aGlzLmVuZCwgMCwge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBjYy52MygpLFxuICAgICAgICAgICAgICAgIGxpZmV0aW1lOiAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgIHZlbG9jaXR5OiBjYy52MygpLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogMCxcbiAgICAgICAgICAgICAgICBjb2xvcjogY2MuY29sb3IoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGFydCsrO1xuICAgICAgICAgICAgdGhpcy5zdGFydCAlPSB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld0VsZUxvYyA9IHRoaXMuZW5kKys7XG4gICAgICAgIHRoaXMuZW5kICU9IHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYWlsRWxlbWVudHNbbmV3RWxlTG9jXTtcbiAgICB9XG5cbiAgICBpdGVyYXRlRWxlbWVudCAodGFyZ2V0LCBmLCBwLCBkdCkge1xuICAgICAgICBjb25zdCBlbmQgPSB0aGlzLnN0YXJ0ID49IHRoaXMuZW5kID8gdGhpcy5lbmQgKyB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoIDogdGhpcy5lbmQ7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChmKHRhcmdldCwgdGhpcy50cmFpbEVsZW1lbnRzW2kgJSB0aGlzLnRyYWlsRWxlbWVudHMubGVuZ3RoXSwgcCwgZHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgJT0gdGhpcy50cmFpbEVsZW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGFydCA9PT0gZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmVuZCA9IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY291bnQgKCkge1xuICAgICAgICBpZiAodGhpcy5zdGFydCA8IHRoaXMuZW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbmQgLSB0aGlzLnN0YXJ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhaWxFbGVtZW50cy5sZW5ndGggKyB0aGlzLmVuZCAtIHRoaXMuc3RhcnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSAtMTtcbiAgICAgICAgdGhpcy5lbmQgPSAtMTtcbiAgICB9XG59XG5cbi8qKlxuICogISNlbiBUaGUgdHJhaWwgbW9kdWxlIG9mIDNkIHBhcnRpY2xlLlxuICogISN6aCAzRCDnspLlrZDmi5blsL7mqKHlnZdcbiAqIEBjbGFzcyBUcmFpbE1vZHVsZVxuICovXG5AY2NjbGFzcygnY2MuVHJhaWxNb2R1bGUnKVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhaWxNb2R1bGUge1xuXG4gICAgQHByb3BlcnR5XG4gICAgX2VuYWJsZSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZW5hYmxlIG9mIHRyYWlsTW9kdWxlLlxuICAgICAqICEjemgg5piv5ZCm5ZCv55SoXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBlbmFibGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgZW5hYmxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuYWJsZTtcbiAgICB9XG5cbiAgICBzZXQgZW5hYmxlICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fY3JlYXRlVHJhaWxEYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmICF0aGlzLl9lbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuYWJsZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9hc3NlbWJsZXIuX3VwZGF0ZVRyYWlsTWF0ZXJpYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2VuYWJsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci5fdXBkYXRlVHJhaWxFbmFibGUodGhpcy5fZW5hYmxlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgaG93IHBhcnRpY2xlcyBnZW5lcmF0ZSB0cmFqZWN0b3JpZXMuXG4gICAgICogISN6aCDorr7lrprnspLlrZDnlJ/miJDovajov7nnmoTmlrnlvI/jgIJcbiAgICAgKiBAcHJvcGVydHkge1RyYWlsTW9kZX0gbW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFRyYWlsTW9kZSxcbiAgICB9KVxuICAgIG1vZGUgPSBUcmFpbE1vZGUuUGFydGljbGVzO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBMaWZlIGN5Y2xlIG9mIHRyYWplY3RvcnkuXG4gICAgICogISN6aCDovajov7nlrZjlnKjnmoTnlJ/lkb3lkajmnJ/jgIJcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGxpZmVUaW1lXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICB9KVxuICAgIGxpZmVUaW1lID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9taW5QYXJ0aWNsZURpc3RhbmNlID0gMC4xO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBNaW5pbXVtIHNwYWNpbmcgYmV0d2VlbiBlYWNoIHRyYWNrIHBhcnRpY2xlXG4gICAgICogISN6aCDmr4/kuKrovajov7nnspLlrZDkuYvpl7TnmoTmnIDlsI/pl7Tot53jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbWluUGFydGljbGVEaXN0YW5jZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGdldCBtaW5QYXJ0aWNsZURpc3RhbmNlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pblBhcnRpY2xlRGlzdGFuY2U7XG4gICAgfVxuXG4gICAgc2V0IG1pblBhcnRpY2xlRGlzdGFuY2UgKHZhbCkge1xuICAgICAgICB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlID0gdmFsO1xuICAgICAgICB0aGlzLl9taW5TcXVhcmVkRGlzdGFuY2UgPSB2YWwgKiB2YWw7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX3NwYWNlID0gU3BhY2UuV29ybGQ7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb29yZGluYXRlIHN5c3RlbSBvZiB0cmFqZWN0b3JpZXMuXG4gICAgICogISN6aCDovajov7norr7lrprml7bnmoTlnZDmoIfns7vjgIJcbiAgICAgKiBAcHJvcGVydHkge1NwYWNlfSBzcGFjZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFNwYWNlLFxuICAgIH0pXG4gICAgZ2V0IHNwYWNlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwYWNlO1xuICAgIH1cblxuICAgIHNldCBzcGFjZSAodmFsKSB7XG4gICAgICAgIHRoaXMuX3NwYWNlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9hc3NlbWJsZXIuX3VwZGF0ZVRyYWlsTWF0ZXJpYWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gV2hldGhlciB0aGUgcGFydGljbGUgaXRzZWxmIGV4aXN0cy5cbiAgICAgKiAhI3poIOeykuWtkOacrOi6q+aYr+WQpuWtmOWcqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZXhpc3RXaXRoUGFydGljbGVzXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgZXhpc3RXaXRoUGFydGljbGVzID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSB0ZXh0dXJlIGZpbGwgbWV0aG9kXG4gICAgICogISN6aCDorr7lrprnurnnkIbloavlhYXmlrnlvI/jgIJcbiAgICAgKiBAcHJvcGVydHkge1RleHR1cmVNb2RlfSB0ZXh0dXJlTW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFRleHR1cmVNb2RlLFxuICAgIH0pXG4gICAgdGV4dHVyZU1vZGUgPSBUZXh0dXJlTW9kZS5TdHJldGNoO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIHRvIHVzZSBwYXJ0aWNsZSB3aWR0aFxuICAgICAqICEjemgg5piv5ZCm5L2/55So57KS5a2Q55qE5a695bqm44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSB3aWR0aEZyb21QYXJ0aWNsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIHdpZHRoRnJvbVBhcnRpY2xlID0gdHJ1ZTtcblxuXG4gICAgLyoqXG4gICAgICogISNlbiBDdXJ2ZXMgdGhhdCBjb250cm9sIHRyYWNrIGxlbmd0aFxuICAgICAqICEjemgg5o6n5Yi26L2o6L+56ZW/5bqm55qE5puy57q/44CCXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSB3aWR0aFJhdGlvXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICB9KVxuICAgIHdpZHRoUmF0aW8gPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIHRvIHVzZSBwYXJ0aWNsZSBjb2xvclxuICAgICAqICEjemgg5piv5ZCm5L2/55So57KS5a2Q55qE6aKc6Imy44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBjb2xvckZyb21QYXJ0aWNsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGNvbG9yRnJvbVBhcnRpY2xlID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb2xvciBvZiB0cmFqZWN0b3JpZXMuXG4gICAgICogISN6aCDovajov7nnmoTpopzoibLjgIJcbiAgICAgKiBAcHJvcGVydHkge0dyYWRpZW50UmFuZ2V9IGNvbG9yT3ZlclRyYWlsXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogR3JhZGllbnRSYW5nZSxcbiAgICB9KVxuICAgIGNvbG9yT3ZlclRyYWlsID0gbmV3IEdyYWRpZW50UmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gVHJhamVjdG9yaWVzIGNvbG9yIG92ZXIgdGltZS5cbiAgICAgKiAhI3poIOi9qOi/uemaj+aXtumXtOWPmOWMlueahOminOiJsuOAglxuICAgICAqIEBwcm9wZXJ0eSB7R3JhZGllbnRSYW5nZX0gY29sb3JPdmVydGltZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEdyYWRpZW50UmFuZ2UsXG4gICAgfSlcbiAgICBjb2xvck92ZXJ0aW1lID0gbmV3IEdyYWRpZW50UmFuZ2UoKTtcblxuICAgIF9wYXJ0aWNsZVN5c3RlbSA9IG51bGw7XG4gICAgX21pblNxdWFyZWREaXN0YW5jZSA9IDA7XG4gICAgX3ZlcnRTaXplID0gMDtcbiAgICBfdHJhaWxOdW0gPSAwO1xuICAgIF90cmFpbExpZmV0aW1lID0gMDtcbiAgICB2Yk9mZnNldCA9IDA7XG4gICAgaWJPZmZzZXQgPSAwO1xuICAgIF90cmFpbFNlZ21lbnRzID0gbnVsbDtcbiAgICBfcGFydGljbGVUcmFpbCA9IG51bGw7XG4gICAgX2lhID0gbnVsbDtcbiAgICBfZ2Z4VkZtdCA9IG51bGw7XG4gICAgX3ZiRjMyID0gbnVsbDtcbiAgICBfdmJVaW50MzIgPSBudWxsO1xuICAgIF9pQnVmZmVyID0gbnVsbDtcbiAgICBfbmVlZFRyYW5zZm9ybSA9IG51bGw7XG4gICAgX2RlZmF1bHRNYXQgPSBudWxsO1xuICAgIF9tYXRlcmlhbCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2dmeFZGbXQgPSBuZXcgZ2Z4LlZlcnRleEZvcm1hdChbXG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1BPU0lUSU9OLCB0eXBlOiBnZnguQVRUUl9UWVBFX0ZMT0FUMzIsIG51bTogM30sXG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRCwgdHlwZTogZ2Z4LkFUVFJfVFlQRV9GTE9BVDMyLCBudW06IDR9LFxuICAgICAgICAgICAgLy97IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRDIsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzIH0sIC8vIDx3aXJlZnJhbWUgZGVidWc+XG4gICAgICAgICAgICB7IG5hbWU6IGdmeC5BVFRSX1RFWF9DT09SRDEsIHR5cGU6IGdmeC5BVFRSX1RZUEVfRkxPQVQzMiwgbnVtOiAzfSxcbiAgICAgICAgICAgIHsgbmFtZTogZ2Z4LkFUVFJfQ09MT1IsIHR5cGU6IGdmeC5BVFRSX1RZUEVfVUlOVDgsIG51bTogNCwgbm9ybWFsaXplOiB0cnVlIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX3ZlcnRTaXplID0gdGhpcy5fZ2Z4VkZtdC5fYnl0ZXM7XG5cbiAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbCA9IG5ldyBNYXBVdGlscygpOyAvLyBNYXA8UGFydGljbGUsIFRyYWlsU2VnbWVudD4oKTtcbiAgICB9XG5cbiAgICBvbkluaXQgKHBzKSB7XG4gICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtID0gcHM7XG4gICAgICAgIHRoaXMubWluUGFydGljbGVEaXN0YW5jZSA9IHRoaXMuX21pblBhcnRpY2xlRGlzdGFuY2U7XG4gICAgICAgIGxldCBidXJzdENvdW50ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBiIG9mIHBzLmJ1cnN0cykge1xuICAgICAgICAgICAgYnVyc3RDb3VudCArPSBiLmdldE1heENvdW50KHBzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpZmVUaW1lLmNvbnN0YW50ID0gMTtcbiAgICAgICAgdGhpcy5fdHJhaWxOdW0gPSBNYXRoLmNlaWwocHMuc3RhcnRMaWZldGltZS5nZXRNYXgoKSAqIHRoaXMubGlmZVRpbWUuZ2V0TWF4KCkgKiA2MCAqIChwcy5yYXRlT3ZlclRpbWUuZ2V0TWF4KCkgKiBwcy5kdXJhdGlvbiArIGJ1cnN0Q291bnQpKTtcbiAgICAgICAgdGhpcy5fdHJhaWxTZWdtZW50cyA9IG5ldyBQb29sKCgpID0+IG5ldyBUcmFpbFNlZ21lbnQoMTApLCBNYXRoLmNlaWwocHMucmF0ZU92ZXJUaW1lLmdldE1heCgpICogcHMuZHVyYXRpb24pKTtcbiAgICAgICAgaWYgKHRoaXMuX2VuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUgPSB0aGlzLl9lbmFibGU7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgfVxuXG4gICAgZGVzdHJveSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl90cmFpbFNlZ21lbnRzKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFpbFNlZ21lbnRzLmNsZWFyKChvYmopID0+IHsgb2JqLnRyYWlsRWxlbWVudHMubGVuZ3RoID0gMDsgfSk7XG4gICAgICAgICAgICB0aGlzLl90cmFpbFNlZ21lbnRzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5hYmxlKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFpbEl0ZXIgPSB0aGlzLl9wYXJ0aWNsZVRyYWlsLnZhbHVlcygpO1xuICAgICAgICAgICAgbGV0IHRyYWlsID0gdHJhaWxJdGVyLm5leHQoKTtcbiAgICAgICAgICAgIHdoaWxlICghdHJhaWwuZG9uZSkge1xuICAgICAgICAgICAgICAgIHRyYWlsLnZhbHVlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdHJhaWwgPSB0cmFpbEl0ZXIubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbC5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmFpbEJ1ZmZlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NyZWF0ZVRyYWlsRGF0YSAoKSB7XG4gICAgICAgIGxldCBtb2RlbCA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9hc3NlbWJsZXIuX21vZGVsO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1vZGVsKSB7XG4gICAgICAgICAgICBtb2RlbC5jcmVhdGVUcmFpbERhdGEodGhpcy5fZ2Z4VkZtdCwgdGhpcy5fdHJhaWxOdW0pO1xuXG4gICAgICAgICAgICBsZXQgc3ViRGF0YSA9IG1vZGVsLl9zdWJEYXRhc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3ZiRjMyID0gc3ViRGF0YS5nZXRWRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5fdmJVaW50MzIgPSBzdWJEYXRhLmdldFZEYXRhKFVpbnQzMkFycmF5KTtcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXIgPSBzdWJEYXRhLmlEYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcnRpY2xlU3lzdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBtYXQgPSB0aGlzLl9wYXJ0aWNsZVN5c3RlbS50cmFpbE1hdGVyaWFsO1xuICAgICAgICAgICAgaWYgKG1hdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hdGVyaWFsID0gbWF0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbCA9IHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9hc3NlbWJsZXIuX2RlZmF1bHRUcmFpbE1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSAoKSB7XG4gICAgICAgIHRoaXMuX3RyYWlsTGlmZXRpbWUgPSB0aGlzLmxpZmVUaW1lLmV2YWx1YXRlKHRoaXMuX3BhcnRpY2xlU3lzdGVtLl90aW1lLCAxKTtcbiAgICAgICAgaWYgKHRoaXMuc3BhY2UgPT09IFNwYWNlLldvcmxkICYmIHRoaXMuX3BhcnRpY2xlU3lzdGVtLl9zaW11bGF0aW9uU3BhY2UgPT09IFNwYWNlLkxvY2FsKSB7XG4gICAgICAgICAgICB0aGlzLl9uZWVkVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3BhcnRpY2xlU3lzdGVtLm5vZGUuZ2V0V29ybGRNYXRyaXgoX3RlbXBfeGZvcm0pO1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0ubm9kZS5nZXRXb3JsZFJvdGF0aW9uKF90ZW1wX3F1YXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmVlZFRyYW5zZm9ybSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYW5pbWF0ZSAocCwgc2NhbGVkRHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl90cmFpbFNlZ21lbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRyYWlsID0gdGhpcy5fcGFydGljbGVUcmFpbC5nZXQocCk7XG4gICAgICAgIGlmICghdHJhaWwpIHtcbiAgICAgICAgICAgIHRyYWlsID0gdGhpcy5fdHJhaWxTZWdtZW50cy5hbGxvYygpO1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVUcmFpbC5zZXQocCwgdHJhaWwpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0U2VnID0gdHJhaWwuZ2V0RWxlbWVudCh0cmFpbC5lbmQgLSAxKTtcbiAgICAgICAgaWYgKHRoaXMuX25lZWRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChfdGVtcF9WZWMzLCBwLnBvc2l0aW9uLCBfdGVtcF94Zm9ybSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNvcHkoX3RlbXBfVmVjMywgcC5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTZWcpIHtcbiAgICAgICAgICAgIHRyYWlsLml0ZXJhdGVFbGVtZW50KHRoaXMsIHRoaXMuX3VwZGF0ZVRyYWlsRWxlbWVudCwgcCwgc2NhbGVkRHQpO1xuICAgICAgICAgICAgaWYgKFZlYzMuc3F1YXJlZERpc3RhbmNlKGxhc3RTZWcucG9zaXRpb24sIF90ZW1wX1ZlYzMpIDwgdGhpcy5fbWluU3F1YXJlZERpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxhc3RTZWcgPSB0cmFpbC5hZGRFbGVtZW50KCk7XG4gICAgICAgIGlmICghbGFzdFNlZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFZlYzMuY29weShsYXN0U2VnLnBvc2l0aW9uLCBfdGVtcF9WZWMzKTtcbiAgICAgICAgbGFzdFNlZy5saWZldGltZSA9IDA7XG4gICAgICAgIGlmICh0aGlzLndpZHRoRnJvbVBhcnRpY2xlKSB7XG4gICAgICAgICAgICBsYXN0U2VnLndpZHRoID0gcC5zaXplLnggKiB0aGlzLndpZHRoUmF0aW8uZXZhbHVhdGUoMCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0U2VnLndpZHRoID0gdGhpcy53aWR0aFJhdGlvLmV2YWx1YXRlKDAsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYWlsTnVtID0gdHJhaWwuY291bnQoKTtcbiAgICAgICAgaWYgKHRyYWlsTnVtID09PSAyKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2Vjb25kVHJhaWwgPSB0cmFpbC5nZXRFbGVtZW50KHRyYWlsLmVuZCAtIDIpO1xuICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIGxhc3RTZWcucG9zaXRpb24sIGxhc3RTZWNvbmRUcmFpbC5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhaWxOdW0gPiAyKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2Vjb25kVHJhaWwgPSB0cmFpbC5nZXRFbGVtZW50KHRyYWlsLmVuZCAtIDIpO1xuICAgICAgICAgICAgY29uc3QgbGFzdFRoaXJkVHJhaWwgPSB0cmFpbC5nZXRFbGVtZW50KHRyYWlsLmVuZCAtIDMpO1xuICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF9WZWMzLCBsYXN0VGhpcmRUcmFpbC5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QoX3RlbXBfVmVjM18xLCBsYXN0U2VnLnBvc2l0aW9uLCBsYXN0U2Vjb25kVHJhaWwucG9zaXRpb24pO1xuICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIF90ZW1wX1ZlYzNfMSwgX3RlbXBfVmVjMyk7XG4gICAgICAgICAgICBpZiAoVmVjMy5lcXVhbHMoY2MuVmVjMy5aRVJPLCBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkpKSB7XG4gICAgICAgICAgICAgICAgVmVjMy5jb3B5KGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eSwgX3RlbXBfVmVjMyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sb3JGcm9tUGFydGljbGUpIHtcbiAgICAgICAgICAgIGxhc3RTZWcuY29sb3Iuc2V0KHAuY29sb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdFNlZy5jb2xvci5zZXQodGhpcy5jb2xvck92ZXJ0aW1lLmV2YWx1YXRlKDAsIDEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF91cGRhdGVUcmFpbEVsZW1lbnQgKHRyYWlsLCB0cmFpbEVsZSwgcCwgZHQpIHtcbiAgICAgICAgdHJhaWxFbGUubGlmZXRpbWUgKz0gZHQ7XG4gICAgICAgIGlmICh0cmFpbC5jb2xvckZyb21QYXJ0aWNsZSkge1xuICAgICAgICAgICAgdHJhaWxFbGUuY29sb3Iuc2V0KHAuY29sb3IpO1xuICAgICAgICAgICAgdHJhaWxFbGUuY29sb3IubXVsdGlwbHkodHJhaWwuY29sb3JPdmVydGltZS5ldmFsdWF0ZSgxLjAgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lLCAxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFpbEVsZS5jb2xvci5zZXQodHJhaWwuY29sb3JPdmVydGltZS5ldmFsdWF0ZSgxLjAgLSBwLnJlbWFpbmluZ0xpZmV0aW1lIC8gcC5zdGFydExpZmV0aW1lLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYWlsLndpZHRoRnJvbVBhcnRpY2xlKSB7XG4gICAgICAgICAgICB0cmFpbEVsZS53aWR0aCA9IHAuc2l6ZS54ICogdHJhaWwud2lkdGhSYXRpby5ldmFsdWF0ZSh0cmFpbEVsZS5saWZldGltZSAvIHRyYWlsLl90cmFpbExpZmV0aW1lLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYWlsRWxlLndpZHRoID0gdHJhaWwud2lkdGhSYXRpby5ldmFsdWF0ZSh0cmFpbEVsZS5saWZldGltZSAvIHRyYWlsLl90cmFpbExpZmV0aW1lLCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJhaWxFbGUubGlmZXRpbWUgPiB0cmFpbC5fdHJhaWxMaWZldGltZTtcbiAgICB9XG5cbiAgICByZW1vdmVQYXJ0aWNsZSAocCkge1xuICAgICAgICBjb25zdCB0cmFpbCA9IHRoaXMuX3BhcnRpY2xlVHJhaWwuZ2V0KHApO1xuICAgICAgICBpZiAodHJhaWwgJiYgdGhpcy5fdHJhaWxTZWdtZW50cykge1xuICAgICAgICAgICAgdHJhaWwuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuX3RyYWlsU2VnbWVudHMuZnJlZSh0cmFpbCk7XG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWNsZVRyYWlsLmRlbGV0ZShwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVRyYWlsQnVmZmVyICgpIHtcbiAgICAgICAgdGhpcy52Yk9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuaWJPZmZzZXQgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuX3BhcnRpY2xlVHJhaWwua2V5cygpKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFpbFNlZyA9IHRoaXMuX3BhcnRpY2xlVHJhaWwuZ2V0KHApO1xuICAgICAgICAgICAgaWYgKHRyYWlsU2VnLnN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXhPZmZzZXQgPSB0aGlzLnZiT2Zmc2V0ICogNCAvIHRoaXMuX3ZlcnRTaXplO1xuICAgICAgICAgICAgY29uc3QgZW5kID0gdHJhaWxTZWcuc3RhcnQgPj0gdHJhaWxTZWcuZW5kID8gdHJhaWxTZWcuZW5kICsgdHJhaWxTZWcudHJhaWxFbGVtZW50cy5sZW5ndGggOiB0cmFpbFNlZy5lbmQ7XG4gICAgICAgICAgICBjb25zdCB0cmFpbE51bSA9IGVuZCAtIHRyYWlsU2VnLnN0YXJ0O1xuICAgICAgICAgICAgLy8gY29uc3QgbGFzdFNlZ1JhdGlvID0gVmVjMy5kaXN0YW5jZSh0cmFpbFNlZy5nZXRUYWlsRWxlbWVudCgpIS5wb3NpdGlvbiwgcC5wb3NpdGlvbikgLyB0aGlzLl9taW5QYXJ0aWNsZURpc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgdGV4dENvb3JkU2VnID0gMSAvICh0cmFpbE51bSAvKi0gMSArIGxhc3RTZWdSYXRpbyovKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0U2VnRWxlID0gdHJhaWxTZWcudHJhaWxFbGVtZW50c1t0cmFpbFNlZy5zdGFydF07XG4gICAgICAgICAgICB0aGlzLl9maWxsVmVydGV4QnVmZmVyKHN0YXJ0U2VnRWxlLCB0aGlzLmNvbG9yT3ZlclRyYWlsLmV2YWx1YXRlKDEsIDEpLCBpbmRleE9mZnNldCwgMSwgMCwgTkVYVF9UUklBTkdMRV9JTkRFWCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdHJhaWxTZWcuc3RhcnQgKyAxOyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdFbGUgPSB0cmFpbFNlZy50cmFpbEVsZW1lbnRzW2kgJSB0cmFpbFNlZy50cmFpbEVsZW1lbnRzLmxlbmd0aF07XG4gICAgICAgICAgICAgICAgY29uc3QgaiA9IGkgLSB0cmFpbFNlZy5zdGFydDtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxsVmVydGV4QnVmZmVyKHNlZ0VsZSwgdGhpcy5jb2xvck92ZXJUcmFpbC5ldmFsdWF0ZSgxIC0gaiAvIHRyYWlsTnVtLCAxKSwgaW5kZXhPZmZzZXQsIDEgLSBqICogdGV4dENvb3JkU2VnLCBqLCBQUkVfVFJJQU5HTEVfSU5ERVggfCBORVhUX1RSSUFOR0xFX0lOREVYKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9uZWVkVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KF90ZW1wX3RyYWlsRWxlLnBvc2l0aW9uLCBwLnBvc2l0aW9uLCBfdGVtcF94Zm9ybSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZlYzMuY29weShfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgcC5wb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhaWxOdW0gPT09IDEgfHwgdHJhaWxOdW0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0U2Vjb25kVHJhaWwgPSB0cmFpbFNlZy5nZXRFbGVtZW50KHRyYWlsU2VnLmVuZCAtIDEpO1xuICAgICAgICAgICAgICAgIFZlYzMuc3VidHJhY3QobGFzdFNlY29uZFRyYWlsLnZlbG9jaXR5LCBfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gdGhpcy5fdmVydFNpemUgLyA0IC0gNF0gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gdGhpcy5fdmVydFNpemUgLyA0IC0gM10gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gdGhpcy5fdmVydFNpemUgLyA0IC0gMl0gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkuejtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gNF0gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueDtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gM10gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkueTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0IC0gMl0gPSBsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHkuejtcbiAgICAgICAgICAgICAgICBWZWMzLnN1YnRyYWN0KF90ZW1wX3RyYWlsRWxlLnZlbG9jaXR5LCBfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0RpcmVjdGlvblJldmVyc2UoX3RlbXBfdHJhaWxFbGUsIGxhc3RTZWNvbmRUcmFpbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRyYWlsTnVtID4gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RTZWNvbmRUcmFpbCA9IHRyYWlsU2VnLmdldEVsZW1lbnQodHJhaWxTZWcuZW5kIC0gMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRoaXJkVHJhaWwgPSB0cmFpbFNlZy5nZXRFbGVtZW50KHRyYWlsU2VnLmVuZCAtIDIpO1xuICAgICAgICAgICAgICAgIFZlYzMuc3VidHJhY3QoX3RlbXBfVmVjMywgbGFzdFRoaXJkVHJhaWwucG9zaXRpb24sIGxhc3RTZWNvbmRUcmFpbC5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgVmVjMy5zdWJ0cmFjdChfdGVtcF9WZWMzXzEsIF90ZW1wX3RyYWlsRWxlLnBvc2l0aW9uLCBsYXN0U2Vjb25kVHJhaWwucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKF90ZW1wX1ZlYzMsIF90ZW1wX1ZlYzMpO1xuICAgICAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKF90ZW1wX1ZlYzNfMSwgX3RlbXBfVmVjM18xKTtcbiAgICAgICAgICAgICAgICBWZWMzLnN1YnRyYWN0KGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eSwgX3RlbXBfVmVjM18xLCBfdGVtcF9WZWMzKTtcbiAgICAgICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShsYXN0U2Vjb25kVHJhaWwudmVsb2NpdHksIGxhc3RTZWNvbmRUcmFpbC52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tEaXJlY3Rpb25SZXZlcnNlKGxhc3RTZWNvbmRUcmFpbCwgbGFzdFRoaXJkVHJhaWwpO1xuICAgICAgICAgICAgICAgIHRoaXMudmJPZmZzZXQgLT0gdGhpcy5fdmVydFNpemUgLyA0ICogMjtcbiAgICAgICAgICAgICAgICB0aGlzLmliT2Zmc2V0IC09IDY7XG4gICAgICAgICAgICAgICAgLy9fYmNJZHggPSAoX2JjSWR4IC0gNiArIDkpICUgOTsgIC8vIDx3aXJlZnJhbWUgZGVidWc+XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsbFZlcnRleEJ1ZmZlcihsYXN0U2Vjb25kVHJhaWwsIHRoaXMuY29sb3JPdmVyVHJhaWwuZXZhbHVhdGUodGV4dENvb3JkU2VnLCAxKSwgaW5kZXhPZmZzZXQsIHRleHRDb29yZFNlZywgdHJhaWxOdW0gLSAxLCBQUkVfVFJJQU5HTEVfSU5ERVggfCBORVhUX1RSSUFOR0xFX0lOREVYKTtcbiAgICAgICAgICAgICAgICBWZWMzLnN1YnRyYWN0KF90ZW1wX3RyYWlsRWxlLnZlbG9jaXR5LCBfdGVtcF90cmFpbEVsZS5wb3NpdGlvbiwgbGFzdFNlY29uZFRyYWlsLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShfdGVtcF90cmFpbEVsZS52ZWxvY2l0eSwgX3RlbXBfdHJhaWxFbGUudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrRGlyZWN0aW9uUmV2ZXJzZShfdGVtcF90cmFpbEVsZSwgbGFzdFNlY29uZFRyYWlsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoRnJvbVBhcnRpY2xlKSB7XG4gICAgICAgICAgICAgICAgX3RlbXBfdHJhaWxFbGUud2lkdGggPSBwLnNpemUueCAqIHRoaXMud2lkdGhSYXRpby5ldmFsdWF0ZSgwLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RlbXBfdHJhaWxFbGUud2lkdGggPSB0aGlzLndpZHRoUmF0aW8uZXZhbHVhdGUoMCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGVtcF90cmFpbEVsZS5jb2xvciA9IHAuY29sb3I7XG5cbiAgICAgICAgICAgIGlmIChWZWMzLmVxdWFscyhfdGVtcF90cmFpbEVsZS52ZWxvY2l0eSwgY2MuVmVjMy5aRVJPKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWJPZmZzZXQgLT0gMztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsbFZlcnRleEJ1ZmZlcihfdGVtcF90cmFpbEVsZSwgdGhpcy5jb2xvck92ZXJUcmFpbC5ldmFsdWF0ZSgwLCAxKSwgaW5kZXhPZmZzZXQsIDAsIHRyYWlsTnVtLCBQUkVfVFJJQU5HTEVfSU5ERVgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUlBKHRoaXMuaWJPZmZzZXQpO1xuICAgIH1cblxuICAgIF9maWxsVmVydGV4QnVmZmVyICh0cmFpbFNlZywgY29sb3JNb2RpZmVyLCBpbmRleE9mZnNldCwgeFRleENvb3JkLCB0cmFpbEVsZUlkeCwgaW5kZXhTZXQpIHtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnBvc2l0aW9uLng7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy5wb3NpdGlvbi55O1xuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcucG9zaXRpb24uejtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IDA7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy53aWR0aDtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHhUZXhDb29yZDtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IDA7XG4gICAgICAgIC8vIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSBiYXJ5Y2VudHJpY1tfYmNJZHgrK107ICAvLyA8d2lyZWZyYW1lIGRlYnVnPlxuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdO1xuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdO1xuICAgICAgICAvLyBfYmNJZHggJT0gOTtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnZlbG9jaXR5Lng7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy52ZWxvY2l0eS55O1xuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcudmVsb2NpdHkuejtcbiAgICAgICAgX3RlbXBfY29sb3Iuc2V0KHRyYWlsU2VnLmNvbG9yKTtcbiAgICAgICAgX3RlbXBfY29sb3IubXVsdGlwbHkoY29sb3JNb2RpZmVyKTtcbiAgICAgICAgdGhpcy5fdmJVaW50MzJbdGhpcy52Yk9mZnNldCsrXSA9IF90ZW1wX2NvbG9yLl92YWw7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy5wb3NpdGlvbi54O1xuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcucG9zaXRpb24ueTtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnBvc2l0aW9uLno7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSAxO1xuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcud2lkdGg7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB4VGV4Q29vcmQ7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSAxO1xuICAgICAgICAvLyB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gYmFyeWNlbnRyaWNbX2JjSWR4KytdOyAgLy8gPHdpcmVmcmFtZSBkZWJ1Zz5cbiAgICAgICAgLy8gdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IGJhcnljZW50cmljW19iY0lkeCsrXTtcbiAgICAgICAgLy8gdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IGJhcnljZW50cmljW19iY0lkeCsrXTtcbiAgICAgICAgLy8gX2JjSWR4ICU9IDk7XG4gICAgICAgIHRoaXMuX3ZiRjMyW3RoaXMudmJPZmZzZXQrK10gPSB0cmFpbFNlZy52ZWxvY2l0eS54O1xuICAgICAgICB0aGlzLl92YkYzMlt0aGlzLnZiT2Zmc2V0KytdID0gdHJhaWxTZWcudmVsb2NpdHkueTtcbiAgICAgICAgdGhpcy5fdmJGMzJbdGhpcy52Yk9mZnNldCsrXSA9IHRyYWlsU2VnLnZlbG9jaXR5Lno7XG4gICAgICAgIHRoaXMuX3ZiVWludDMyW3RoaXMudmJPZmZzZXQrK10gPSBfdGVtcF9jb2xvci5fdmFsO1xuICAgICAgICBpZiAoaW5kZXhTZXQgJiBQUkVfVFJJQU5HTEVfSU5ERVgpIHtcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXJbdGhpcy5pYk9mZnNldCsrXSA9IGluZGV4T2Zmc2V0ICsgMiAqIHRyYWlsRWxlSWR4O1xuICAgICAgICAgICAgdGhpcy5faUJ1ZmZlclt0aGlzLmliT2Zmc2V0KytdID0gaW5kZXhPZmZzZXQgKyAyICogdHJhaWxFbGVJZHggLSAxO1xuICAgICAgICAgICAgdGhpcy5faUJ1ZmZlclt0aGlzLmliT2Zmc2V0KytdID0gaW5kZXhPZmZzZXQgKyAyICogdHJhaWxFbGVJZHggKyAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleFNldCAmIE5FWFRfVFJJQU5HTEVfSU5ERVgpIHtcbiAgICAgICAgICAgIHRoaXMuX2lCdWZmZXJbdGhpcy5pYk9mZnNldCsrXSA9IGluZGV4T2Zmc2V0ICsgMiAqIHRyYWlsRWxlSWR4O1xuICAgICAgICAgICAgdGhpcy5faUJ1ZmZlclt0aGlzLmliT2Zmc2V0KytdID0gaW5kZXhPZmZzZXQgKyAyICogdHJhaWxFbGVJZHggKyAxO1xuICAgICAgICAgICAgdGhpcy5faUJ1ZmZlclt0aGlzLmliT2Zmc2V0KytdID0gaW5kZXhPZmZzZXQgKyAyICogdHJhaWxFbGVJZHggKyAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZUlBIChjb3VudCkge1xuICAgICAgICBpZiAodGhpcy5fcGFydGljbGVTeXN0ZW0gJiYgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlcikge1xuICAgICAgICAgICAgdGhpcy5fcGFydGljbGVTeXN0ZW0uX2Fzc2VtYmxlci51cGRhdGVJQSgxLCBjb3VudCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2hlY2tEaXJlY3Rpb25SZXZlcnNlIChjdXJyRWxlbWVudCwgcHJldkVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFZlYzMuZG90KGN1cnJFbGVtZW50LnZlbG9jaXR5LCBwcmV2RWxlbWVudC52ZWxvY2l0eSkgPCBESVJFQ1RJT05fVEhSRVNIT0xEKSB7XG4gICAgICAgICAgICBjdXJyRWxlbWVudC5kaXJlY3Rpb24gPSAxIC0gcHJldkVsZW1lbnQuZGlyZWN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VyckVsZW1lbnQuZGlyZWN0aW9uID0gcHJldkVsZW1lbnQuZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=