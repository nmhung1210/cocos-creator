
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/particle-system-3d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../../value-types");

var _utils = require("../../value-types/utils");

var _CCMaterial = _interopRequireDefault(require("../../assets/material/CCMaterial"));

var _colorOvertime = _interopRequireDefault(require("./animator/color-overtime"));

var _curveRange = _interopRequireWildcard(require("./animator/curve-range"));

var _forceOvertime = _interopRequireDefault(require("./animator/force-overtime"));

var _gradientRange = _interopRequireDefault(require("./animator/gradient-range"));

var _limitVelocityOvertime = _interopRequireDefault(require("./animator/limit-velocity-overtime"));

var _rotationOvertime = _interopRequireDefault(require("./animator/rotation-overtime"));

var _sizeOvertime = _interopRequireDefault(require("./animator/size-overtime"));

var _textureAnimation = _interopRequireDefault(require("./animator/texture-animation"));

var _velocityOvertime = _interopRequireDefault(require("./animator/velocity-overtime"));

var _burst = _interopRequireDefault(require("./burst"));

var _shapeModule = _interopRequireDefault(require("./emitter/shape-module"));

var _enum = require("./enum");

var _particleGeneralFunction = require("./particle-general-function");

var _trail = _interopRequireDefault(require("./renderer/trail"));

var _CCMesh = _interopRequireDefault(require("../../mesh/CCMesh"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var _require = require('../../platform/CCClassDecorator'),
    ccclass = _require.ccclass,
    menu = _require.menu,
    property = _require.property,
    executeInEditMode = _require.executeInEditMode,
    executionOrder = _require.executionOrder;

var RenderComponent = require('../../components/CCRenderComponent');

var _world_mat = new _valueTypes.Mat4();

var _module_props = CC_EDITOR && ["_colorOverLifetimeModule", "_shapeModule", "_sizeOvertimeModule", "_velocityOvertimeModule", "_forceOvertimeModule", "_limitVelocityOvertimeModule", "_rotationOvertimeModule", "_textureAnimationModule", "_trailModule"];
/**
 * !#en The ParticleSystem3D Component.
 * !#zh 3D 粒子组件
 * @class ParticleSystem3D
 * @extends RenderComponent
 */


var ParticleSystem3D = (_dec = ccclass('cc.ParticleSystem3D'), _dec2 = menu('i18n:MAIN_MENU.component.renderers/ParticleSystem3D'), _dec3 = executionOrder(99), _dec4 = property({
  animatable: false
}), _dec5 = property({
  animatable: false
}), _dec6 = property({
  type: _enum.Space,
  animatable: false
}), _dec7 = property({
  type: _curveRange["default"]
}), _dec8 = property({
  type: _curveRange["default"]
}), _dec9 = property({
  type: _gradientRange["default"]
}), _dec10 = property({
  type: _enum.Space
}), _dec11 = property({
  type: _curveRange["default"]
}), _dec12 = property({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec13 = property({
  type: _curveRange["default"],
  range: [-1, 1],
  radian: true
}), _dec14 = property({
  type: _curveRange["default"],
  range: [-1, 1]
}), _dec15 = property({
  type: _curveRange["default"]
}), _dec16 = property({
  type: _curveRange["default"]
}), _dec17 = property({
  type: [_burst["default"]],
  animatable: false
}), _dec18 = property({
  type: [_CCMaterial["default"]],
  displayName: 'Materials',
  visible: false,
  override: true
}), _dec19 = property({
  type: _shapeModule["default"],
  animatable: false
}), _dec20 = property({
  type: _colorOvertime["default"],
  animatable: false
}), _dec21 = property({
  type: _sizeOvertime["default"],
  animatable: false
}), _dec22 = property({
  type: _velocityOvertime["default"],
  animatable: false
}), _dec23 = property({
  type: _forceOvertime["default"],
  animatable: false
}), _dec24 = property({
  type: _limitVelocityOvertime["default"],
  animatable: false
}), _dec25 = property({
  type: _rotationOvertime["default"],
  animatable: false
}), _dec26 = property({
  type: _textureAnimation["default"],
  animatable: false
}), _dec27 = property({
  type: _trail["default"],
  animatable: false
}), _dec28 = property({
  type: _enum.RenderMode,
  animatable: false
}), _dec29 = property({
  animatable: false
}), _dec30 = property({
  animatable: false
}), _dec31 = property({
  type: _CCMesh["default"],
  animatable: false
}), _dec32 = property({
  type: _CCMaterial["default"],
  animatable: false
}), _dec33 = property({
  type: _CCMaterial["default"],
  animatable: false
}), _dec(_class = _dec2(_class = _dec3(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_RenderComponent) {
  _inheritsLoose(ParticleSystem3D, _RenderComponent);

  _createClass(ParticleSystem3D, [{
    key: "capacity",

    /**
     * !#en The run time of particle.
     * !#zh 粒子系统运行时间
     * @property {Number} duration
     */

    /**
     * !#en The maximum number of particles that a particle system can generate.
     * !#zh 粒子系统能生成的最大粒子数量
     * @property {Number} capacity
     */
    get: function get() {
      return this._capacity;
    },
    set: function set(val) {
      this._capacity = val;

      if (this._assembler) {
        this._assembler.setCapacity(this._capacity);
      }
    }
    /**
     * !#en Whether the particle system loops.
     * !#zh 粒子系统是否循环播放
     * @property {Boolean} loop
     */

  }, {
    key: "prewarm",

    /**
     * !#en When selected, the particle system will start playing after one round has been played (only effective when loop is enabled).
     * !#zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）
     * @property {Boolean} prewarm
     */
    get: function get() {
      return this._prewarm;
    },
    set: function set(val) {
      if (val === true && this.loop === false) {// console.warn('prewarm only works if loop is also enabled.');
      }

      this._prewarm = val;
    }
  }, {
    key: "simulationSpace",

    /**
     * !#en The coordinate system in which the particle system is located.<br>
     * World coordinates (does not change when the position of other objects changes)<br>
     * Local coordinates (moving as the position of the parent node changes)<br>
     * Custom coordinates (moving with the position of a custom node)
     * !#zh 选择粒子系统所在的坐标系<br>
     * 世界坐标（不随其他物体位置改变而变换）<br>
     * 局部坐标（跟随父节点位置改变而移动）<br>
     * 自定坐标（跟随自定义节点的位置改变而移动）
     * @property {Space} simulationSpace
     */
    get: function get() {
      return this._simulationSpace;
    },
    set: function set(val) {
      if (val !== this._simulationSpace) {
        this._simulationSpace = val;

        this._assembler._updateMaterialParams();

        this._assembler._updateTrailMaterial();
      }
    }
    /**
     * !#en Controlling the update speed of the entire particle system.
     * !#zh 控制整个粒子系统的更新速度。
     * @property {Number} simulationSpeed
     */

  }, {
    key: "materials",
    get: function get() {
      // if we don't create an array copy, the editor will modify the original array directly.
      return this._materials;
    },
    set: function set(val) {
      this._materials = val;

      this._activateMaterial();
    }
  }, {
    key: "shapeModule",

    /**
     * !#en Particle emitter module
     * !#zh 粒子发射器模块
     * @property {ShapeModule} shapeModule
     */
    get: function get() {
      return this._shapeModule;
    },
    set: function set(val) {
      this._shapeModule = val;

      this._shapeModule.onInit(this);
    }
  }, {
    key: "colorOverLifetimeModule",

    /**
     * !#en Color control module
     * !#zh 颜色控制模块
     * @property {ColorOverLifetimeModule} colorOverLifetimeModule
     */
    get: function get() {
      return this._colorOverLifetimeModule;
    },
    set: function set(val) {
      this._colorOverLifetimeModule = val;
    }
  }, {
    key: "sizeOvertimeModule",

    /**
     * !#en Particle size module
     * !#zh 粒子大小模块
     * @property {SizeOvertimeModule} sizeOvertimeModule
     */
    get: function get() {
      return this._sizeOvertimeModule;
    },
    set: function set(val) {
      this._sizeOvertimeModule = val;
    }
  }, {
    key: "velocityOvertimeModule",

    /**
     * !#en Particle speed module
     * !#zh 粒子速度模块
     * @property {VelocityOvertimeModule} velocityOvertimeModule
     */
    get: function get() {
      return this._velocityOvertimeModule;
    },
    set: function set(val) {
      this._velocityOvertimeModule = val;
    }
  }, {
    key: "forceOvertimeModule",

    /**
     * !#en Particle acceleration module
     * !#zh 粒子加速度模块
     * @property {ForceOvertimeModule} forceOvertimeModule
     */
    get: function get() {
      return this._forceOvertimeModule;
    },
    set: function set(val) {
      this._forceOvertimeModule = val;
    }
  }, {
    key: "limitVelocityOvertimeModule",

    /**
     * !#en Particle limit speed module (only CPU particles are supported)
     * !#zh 粒子限制速度模块（只支持 CPU 粒子）
     * @property {LimitVelocityOvertimeModule} limitVelocityOvertimeModule
     */
    get: function get() {
      return this._limitVelocityOvertimeModule;
    },
    set: function set(val) {
      this._limitVelocityOvertimeModule = val;
    }
  }, {
    key: "rotationOvertimeModule",

    /**
     * !#en Particle rotation module
     * !#zh 粒子旋转模块
     * @property {RotationOvertimeModule} rotationOvertimeModule
     */
    get: function get() {
      return this._rotationOvertimeModule;
    },
    set: function set(val) {
      this._rotationOvertimeModule = val;
    }
  }, {
    key: "textureAnimationModule",

    /**
     * !#en Texture Animation Module
     * !#zh 贴图动画模块
     * @property {TextureAnimationModule} textureAnimationModule
     */
    get: function get() {
      return this._textureAnimationModule;
    },
    set: function set(val) {
      this._textureAnimationModule = val;

      this._textureAnimationModule.onInit(this);
    }
  }, {
    key: "trailModule",

    /**
     * !#en Particle Trajectory Module
     * !#zh 粒子轨迹模块
     * @property {TrailModule} trailModule
     */
    get: function get() {
      return this._trailModule;
    },
    set: function set(val) {
      this._trailModule = val;

      this._trailModule.onInit(this);
    }
  }, {
    key: "renderMode",

    /**
     * !#en Particle generation mode
     * !#zh 设定粒子生成模式
     * @property {RenderMode} renderMode
     */
    get: function get() {
      return this._renderMode;
    },
    set: function set(val) {
      if (this._renderMode === val) {
        return;
      }

      this._renderMode = val;

      this._assembler._setVertexAttrib();

      this._assembler._updateModel();

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "velocityScale",

    /**
     * !#en When the particle generation mode is StrecthedBillboard, in the direction of movement of the particles is stretched by velocity magnitude
     * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按速度大小进行拉伸
     * @property {Number} velocityScale
     */
    get: function get() {
      return this._velocityScale;
    },
    set: function set(val) {
      this._velocityScale = val;

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "lengthScale",

    /**
     * !#en When the particle generation method is StrecthedBillboard, the particles are stretched according to the particle size in the direction of motion
     * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按粒子大小进行拉伸
     * @property {Number} lengthScale
     */
    get: function get() {
      return this._lengthScale;
    },
    set: function set(val) {
      this._lengthScale = val;

      this._assembler._updateMaterialParams();
    }
  }, {
    key: "mesh",

    /**
     * !#en Particle model
     * !#zh 粒子模型
     * @property {Mesh} mesh
     */
    get: function get() {
      return this._mesh;
    },
    set: function set(val) {
      this._mesh = val;

      this._assembler._updateModel();
    }
    /**
     * !#en Particle material
     * !#zh 粒子材质
     * @property {Material} particleMaterial
     */

  }, {
    key: "particleMaterial",
    get: function get() {
      return this.getMaterial(0);
    },
    set: function set(val) {
      this.setMaterial(0, val);

      this._onMaterialModified(0, val);
    }
    /**
     * !#en Particle trail material
     * !#zh 粒子轨迹材质
     * @property {Material} trailMaterial
     */

  }, {
    key: "trailMaterial",
    get: function get() {
      return this.getMaterial(1);
    },
    set: function set(val) {
      this.setMaterial(1, val);

      this._onMaterialModified(1, val);
    }
  }]);

  // array of { emitter: ParticleSystem3D, type: 'birth', 'collision' or 'death'}
  function ParticleSystem3D() {
    var _this2;

    _this2 = _RenderComponent.call(this) || this;

    _initializerDefineProperty(_this2, "duration", _descriptor, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_capacity", _descriptor2, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "loop", _descriptor3, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "playOnAwake", _descriptor4, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_prewarm", _descriptor5, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_simulationSpace", _descriptor6, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "simulationSpeed", _descriptor7, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startDelay", _descriptor8, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startLifetime", _descriptor9, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startColor", _descriptor10, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "scaleSpace", _descriptor11, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startSize", _descriptor12, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startSpeed", _descriptor13, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "startRotation", _descriptor14, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "gravityModifier", _descriptor15, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "rateOverTime", _descriptor16, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "rateOverDistance", _descriptor17, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "bursts", _descriptor18, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_shapeModule", _descriptor19, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_colorOverLifetimeModule", _descriptor20, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_sizeOvertimeModule", _descriptor21, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_velocityOvertimeModule", _descriptor22, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_forceOvertimeModule", _descriptor23, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_limitVelocityOvertimeModule", _descriptor24, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_rotationOvertimeModule", _descriptor25, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_textureAnimationModule", _descriptor26, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_trailModule", _descriptor27, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_renderMode", _descriptor28, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_velocityScale", _descriptor29, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_lengthScale", _descriptor30, _assertThisInitialized(_this2));

    _initializerDefineProperty(_this2, "_mesh", _descriptor31, _assertThisInitialized(_this2));

    _this2._isPlaying = void 0;
    _this2._isPaused = void 0;
    _this2._isStopped = void 0;
    _this2._isEmitting = void 0;
    _this2._time = void 0;
    _this2._emitRateTimeCounter = void 0;
    _this2._emitRateDistanceCounter = void 0;
    _this2._oldWPos = void 0;
    _this2._curWPos = void 0;
    _this2._customData1 = void 0;
    _this2._customData2 = void 0;
    _this2._subEmitters = void 0;
    _this2.rateOverTime.constant = 10;
    _this2.startLifetime.constant = 5;
    _this2.startSize.constant = 1;
    _this2.startSpeed.constant = 5; // internal status

    _this2._isPlaying = false;
    _this2._isPaused = false;
    _this2._isStopped = true;
    _this2._isEmitting = false;
    _this2._time = 0.0; // playback position in seconds.

    _this2._emitRateTimeCounter = 0.0;
    _this2._emitRateDistanceCounter = 0.0;
    _this2._oldWPos = new _valueTypes.Vec3(0, 0, 0);
    _this2._curWPos = new _valueTypes.Vec3(0, 0, 0);
    _this2._customData1 = new _valueTypes.Vec2(0, 0);
    _this2._customData2 = new _valueTypes.Vec2(0, 0);
    _this2._subEmitters = []; // array of { emitter: ParticleSystemComponent, type: 'birth', 'collision' or 'death'}

    return _this2;
  }

  var _proto = ParticleSystem3D.prototype;

  _proto.onLoad = function onLoad() {
    this._assembler.onInit(this);

    this.shapeModule.onInit(this);
    this.trailModule.onInit(this);
    this.textureAnimationModule.onInit(this);

    this._resetPosition(); // this._system.add(this);

  };

  _proto._onMaterialModified = function _onMaterialModified(index, material) {
    this._assembler._onMaterialModified(index, material);
  };

  _proto._onRebuildPSO = function _onRebuildPSO(index, material) {
    this._assembler._onRebuildPSO(index, material);
  } // TODO: fastforward current particle system by simulating particles over given period of time, then pause it.
  // simulate(time, withChildren, restart, fixedTimeStep) {
  // }

  /**
   * !#en Playing particle effects
   * !#zh 播放粒子效果
   * @method play
   */
  ;

  _proto.play = function play() {
    if (this._isPaused) {
      this._isPaused = false;
    }

    if (this._isStopped) {
      this._isStopped = false;
    }

    this._isPlaying = true;
    this._isEmitting = true;

    this._resetPosition(); // prewarm


    if (this._prewarm) {
      this._prewarmSystem();
    }
  }
  /**
   * !#en Pause particle effect
   * !#zh 暂停播放粒子效果
   * @method pause
   */
  ;

  _proto.pause = function pause() {
    if (this._isStopped) {
      console.warn('pause(): particle system is already stopped.');
      return;
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    this._isPaused = true;
  }
  /**
   * !#en Stop particle effect
   * !#zh 停止播放粒子效果
   * @method stop
   */
  ;

  _proto.stop = function stop() {
    if (this._isPlaying || this._isPaused) {
      this.clear();
    }

    if (this._isPlaying) {
      this._isPlaying = false;
    }

    if (this._isPaused) {
      this._isPaused = false;
    }

    this._time = 0.0;
    this._emitRateTimeCounter = 0.0;
    this._emitRateDistanceCounter = 0.0;
    this._isStopped = true;
  } // remove all particles from current particle system.

  /**
   * !#en Remove all particle effect
   * !#zh 将所有粒子从粒子系统中清除
   * @method clear
   */
  ;

  _proto.clear = function clear() {
    if (this.enabledInHierarchy) {
      this._assembler.clear();

      this.trailModule.clear();
    }
  };

  _proto.getParticleCount = function getParticleCount() {
    return this._assembler.getParticleCount();
  };

  _proto.setCustomData1 = function setCustomData1(x, y) {
    _valueTypes.Vec2.set(this._customData1, x, y);
  };

  _proto.setCustomData2 = function setCustomData2(x, y) {
    _valueTypes.Vec2.set(this._customData2, x, y);
  };

  _proto.onDestroy = function onDestroy() {
    // this._system.remove(this);
    this._assembler.onDestroy();

    this.trailModule.destroy();
  };

  _proto.onEnable = function onEnable() {
    _RenderComponent.prototype.onEnable.call(this);

    if (this.playOnAwake) {
      this.play();
    }

    this._assembler.onEnable();

    this.trailModule.onEnable();
  };

  _proto.onDisable = function onDisable() {
    _RenderComponent.prototype.onDisable.call(this);

    this._assembler.onDisable();

    this.trailModule.onDisable();
  };

  _proto.update = function update(dt) {
    var scaledDeltaTime = dt * this.simulationSpeed;

    if (this._isPlaying) {
      this._time += scaledDeltaTime; // excute emission

      this._emit(scaledDeltaTime); // simulation, update particles.


      if (this._assembler._updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
        this.stop();
      } // update render data


      this._assembler.updateParticleBuffer(); // update trail


      if (this.trailModule.enable) {
        this.trailModule.updateTrailBuffer();
      }
    }
  };

  _proto.emit = function emit(count, dt) {
    if (this._simulationSpace === _enum.Space.World) {
      this.node.getWorldMatrix(_world_mat);
    }

    for (var i = 0; i < count; ++i) {
      var particle = this._assembler._getFreeParticle();

      if (particle === null) {
        return;
      }

      var rand = (0, _valueTypes.pseudoRandom)((0, _valueTypes.randomRangeInt)(0, _utils.INT_MAX));

      if (this.shapeModule.enable) {
        this.shapeModule.emit(particle);
      } else {
        _valueTypes.Vec3.set(particle.position, 0, 0, 0);

        _valueTypes.Vec3.copy(particle.velocity, _particleGeneralFunction.particleEmitZAxis);
      }

      if (this.textureAnimationModule.enable) {
        this.textureAnimationModule.init(particle);
      }

      _valueTypes.Vec3.scale(particle.velocity, particle.velocity, this.startSpeed.evaluate(this._time / this.duration, rand));

      switch (this._simulationSpace) {
        case _enum.Space.Local:
          break;

        case _enum.Space.World:
          _valueTypes.Vec3.transformMat4(particle.position, particle.position, _world_mat);

          var worldRot = new _valueTypes.Quat();
          this.node.getWorldRotation(worldRot);

          _valueTypes.Vec3.transformQuat(particle.velocity, particle.velocity, worldRot);

          break;

        case _enum.Space.Custom:
          // TODO:
          break;
      }

      _valueTypes.Vec3.copy(particle.ultimateVelocity, particle.velocity); // apply startRotation. now 2D only.


      _valueTypes.Vec3.set(particle.rotation, 0, 0, this.startRotation.evaluate(this._time / this.duration, rand)); // apply startSize. now 2D only.


      _valueTypes.Vec3.set(particle.startSize, this.startSize.evaluate(this._time / this.duration, rand), 1, 1);

      particle.startSize.y = particle.startSize.x;

      _valueTypes.Vec3.copy(particle.size, particle.startSize); // apply startColor.


      particle.startColor.set(this.startColor.evaluate(this._time / this.duration, rand));
      particle.color.set(particle.startColor); // apply startLifetime.

      particle.startLifetime = this.startLifetime.evaluate(this._time / this.duration, rand) + dt;
      particle.remainingLifetime = particle.startLifetime;
      particle.randomSeed = (0, _valueTypes.randomRangeInt)(0, 233280);

      this._assembler._setNewParticle(particle);
    } // end of particles forLoop.

  } // initialize particle system as though it had already completed a full cycle.
  ;

  _proto._prewarmSystem = function _prewarmSystem() {
    this.startDelay.mode = _curveRange.Mode.Constant; // clear startDelay.

    this.startDelay.constant = 0;
    var dt = 1.0; // should use varying value?

    var cnt = this.duration / dt;

    for (var i = 0; i < cnt; ++i) {
      this._time += dt;

      this._emit(dt);

      this._assembler._updateParticles(dt);
    }
  } // internal function
  ;

  _proto._emit = function _emit(dt) {
    // emit particles.
    var startDelay = this.startDelay.evaluate(0, 1);

    if (this._time > startDelay) {
      if (this._time > this.duration + startDelay) {
        // this._time = startDelay; // delay will not be applied from the second loop.(Unity)
        // this._emitRateTimeCounter = 0.0;
        // this._emitRateDistanceCounter = 0.0;
        if (!this.loop) {
          this._isEmitting = false;
          return;
        }
      } // emit by rateOverTime


      this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;

      if (this._emitRateTimeCounter > 1 && this._isEmitting) {
        var emitNum = Math.floor(this._emitRateTimeCounter);
        this._emitRateTimeCounter -= emitNum;
        this.emit(emitNum, dt);
      } // emit by rateOverDistance


      this.node.getWorldPosition(this._curWPos);

      var distance = _valueTypes.Vec3.distance(this._curWPos, this._oldWPos);

      _valueTypes.Vec3.copy(this._oldWPos, this._curWPos);

      this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);

      if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
        var _emitNum = Math.floor(this._emitRateDistanceCounter);

        this._emitRateDistanceCounter -= _emitNum;
        this.emit(_emitNum, dt);
      } // bursts


      for (var _iterator = _createForOfIteratorHelperLoose(this.bursts), _step; !(_step = _iterator()).done;) {
        var burst = _step.value;
        burst.update(this, dt);
      }
    }
  };

  _proto._activateMaterial = function _activateMaterial() {};

  _proto._resetPosition = function _resetPosition() {
    this.node.getWorldPosition(this._oldWPos);

    _valueTypes.Vec3.copy(this._curWPos, this._oldWPos);
  };

  _proto.addSubEmitter = function addSubEmitter(subEmitter) {
    this._subEmitters.push(subEmitter);
  };

  _proto.removeSubEmitter = function removeSubEmitter(idx) {
    this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
  };

  _proto.addBurst = function addBurst(burst) {
    this.bursts.push(burst);
  };

  _proto.removeBurst = function removeBurst(idx) {
    this.bursts.splice(this.bursts.indexOf(idx), 1);
  };

  _proto._checkBacth = function _checkBacth() {};

  _createClass(ParticleSystem3D, [{
    key: "isPlaying",
    get: function get() {
      return this._isPlaying;
    }
  }, {
    key: "isPaused",
    get: function get() {
      return this._isPaused;
    }
  }, {
    key: "isStopped",
    get: function get() {
      return this._isStopped;
    }
  }, {
    key: "isEmitting",
    get: function get() {
      return this._isEmitting;
    }
  }, {
    key: "time",
    get: function get() {
      return this._time;
    }
  }]);

  return ParticleSystem3D;
}(RenderComponent), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 5.0;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_capacity", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 100;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "capacity", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "capacity"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loop", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "playOnAwake", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_prewarm", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "prewarm", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "prewarm"), _class2.prototype), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_simulationSpace", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "simulationSpace", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "simulationSpace"), _class2.prototype), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "simulationSpeed", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1.0;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "startDelay", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "startLifetime", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "startColor", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _gradientRange["default"]();
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "scaleSpace", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.Space.Local;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "startSize", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "startSpeed", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "startRotation", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "gravityModifier", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "rateOverTime", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "rateOverDistance", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _curveRange["default"]();
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "bursts", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new Array();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "materials", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "materials"), _class2.prototype), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "_shapeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _shapeModule["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "shapeModule", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "shapeModule"), _class2.prototype), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "_colorOverLifetimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _colorOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "colorOverLifetimeModule", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "colorOverLifetimeModule"), _class2.prototype), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "_sizeOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _sizeOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "sizeOvertimeModule", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "sizeOvertimeModule"), _class2.prototype), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "_velocityOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _velocityOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "velocityOvertimeModule", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityOvertimeModule"), _class2.prototype), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "_forceOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _forceOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "forceOvertimeModule", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "forceOvertimeModule"), _class2.prototype), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "_limitVelocityOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _limitVelocityOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "limitVelocityOvertimeModule", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "limitVelocityOvertimeModule"), _class2.prototype), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "_rotationOvertimeModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _rotationOvertime["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "rotationOvertimeModule", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "rotationOvertimeModule"), _class2.prototype), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "_textureAnimationModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _textureAnimation["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "textureAnimationModule", [_dec26], Object.getOwnPropertyDescriptor(_class2.prototype, "textureAnimationModule"), _class2.prototype), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "_trailModule", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return new _trail["default"]();
  }
}), _applyDecoratedDescriptor(_class2.prototype, "trailModule", [_dec27], Object.getOwnPropertyDescriptor(_class2.prototype, "trailModule"), _class2.prototype), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "_renderMode", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _enum.RenderMode.Billboard;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "renderMode", [_dec28], Object.getOwnPropertyDescriptor(_class2.prototype, "renderMode"), _class2.prototype), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "_velocityScale", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "velocityScale", [_dec29], Object.getOwnPropertyDescriptor(_class2.prototype, "velocityScale"), _class2.prototype), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "_lengthScale", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 1;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "lengthScale", [_dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "lengthScale"), _class2.prototype), _descriptor31 = _applyDecoratedDescriptor(_class2.prototype, "_mesh", [property], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "mesh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "particleMaterial", [_dec32], Object.getOwnPropertyDescriptor(_class2.prototype, "particleMaterial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trailMaterial", [_dec33], Object.getOwnPropertyDescriptor(_class2.prototype, "trailMaterial"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);
exports["default"] = ParticleSystem3D;
CC_EDITOR && (ParticleSystem3D.prototype._onBeforeSerialize = function (props) {
  var _this = this;

  return props.filter(function (p) {
    return !_module_props.includes(p) || _this[p].enable;
  });
});
cc.ParticleSystem3D = ParticleSystem3D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3BhcnRpY2xlLXN5c3RlbS0zZC50cyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2NjbGFzcyIsIm1lbnUiLCJwcm9wZXJ0eSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiZXhlY3V0aW9uT3JkZXIiLCJSZW5kZXJDb21wb25lbnQiLCJfd29ybGRfbWF0IiwiTWF0NCIsIl9tb2R1bGVfcHJvcHMiLCJDQ19FRElUT1IiLCJQYXJ0aWNsZVN5c3RlbTNEIiwiYW5pbWF0YWJsZSIsInR5cGUiLCJTcGFjZSIsIkN1cnZlUmFuZ2UiLCJHcmFkaWVudFJhbmdlIiwicmFuZ2UiLCJyYWRpYW4iLCJCdXJzdCIsIk1hdGVyaWFsIiwiZGlzcGxheU5hbWUiLCJ2aXNpYmxlIiwib3ZlcnJpZGUiLCJTaGFwZU1vZHVsZSIsIkNvbG9yT3ZlckxpZmV0aW1lTW9kdWxlIiwiU2l6ZU92ZXJ0aW1lTW9kdWxlIiwiVmVsb2NpdHlPdmVydGltZU1vZHVsZSIsIkZvcmNlT3ZlcnRpbWVNb2R1bGUiLCJMaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUiLCJSb3RhdGlvbk92ZXJ0aW1lTW9kdWxlIiwiVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSIsIlRyYWlsTW9kdWxlIiwiUmVuZGVyTW9kZSIsIk1lc2giLCJfY2FwYWNpdHkiLCJ2YWwiLCJfYXNzZW1ibGVyIiwic2V0Q2FwYWNpdHkiLCJfcHJld2FybSIsImxvb3AiLCJfc2ltdWxhdGlvblNwYWNlIiwiX3VwZGF0ZU1hdGVyaWFsUGFyYW1zIiwiX3VwZGF0ZVRyYWlsTWF0ZXJpYWwiLCJfbWF0ZXJpYWxzIiwiX2FjdGl2YXRlTWF0ZXJpYWwiLCJfc2hhcGVNb2R1bGUiLCJvbkluaXQiLCJfY29sb3JPdmVyTGlmZXRpbWVNb2R1bGUiLCJfc2l6ZU92ZXJ0aW1lTW9kdWxlIiwiX3ZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUiLCJfZm9yY2VPdmVydGltZU1vZHVsZSIsIl9saW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUiLCJfcm90YXRpb25PdmVydGltZU1vZHVsZSIsIl90ZXh0dXJlQW5pbWF0aW9uTW9kdWxlIiwiX3RyYWlsTW9kdWxlIiwiX3JlbmRlck1vZGUiLCJfc2V0VmVydGV4QXR0cmliIiwiX3VwZGF0ZU1vZGVsIiwiX3ZlbG9jaXR5U2NhbGUiLCJfbGVuZ3RoU2NhbGUiLCJfbWVzaCIsImdldE1hdGVyaWFsIiwic2V0TWF0ZXJpYWwiLCJfb25NYXRlcmlhbE1vZGlmaWVkIiwiX2lzUGxheWluZyIsIl9pc1BhdXNlZCIsIl9pc1N0b3BwZWQiLCJfaXNFbWl0dGluZyIsIl90aW1lIiwiX2VtaXRSYXRlVGltZUNvdW50ZXIiLCJfZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIiLCJfb2xkV1BvcyIsIl9jdXJXUG9zIiwiX2N1c3RvbURhdGExIiwiX2N1c3RvbURhdGEyIiwiX3N1YkVtaXR0ZXJzIiwicmF0ZU92ZXJUaW1lIiwiY29uc3RhbnQiLCJzdGFydExpZmV0aW1lIiwic3RhcnRTaXplIiwic3RhcnRTcGVlZCIsIlZlYzMiLCJWZWMyIiwib25Mb2FkIiwic2hhcGVNb2R1bGUiLCJ0cmFpbE1vZHVsZSIsInRleHR1cmVBbmltYXRpb25Nb2R1bGUiLCJfcmVzZXRQb3NpdGlvbiIsImluZGV4IiwibWF0ZXJpYWwiLCJfb25SZWJ1aWxkUFNPIiwicGxheSIsIl9wcmV3YXJtU3lzdGVtIiwicGF1c2UiLCJjb25zb2xlIiwid2FybiIsInN0b3AiLCJjbGVhciIsImVuYWJsZWRJbkhpZXJhcmNoeSIsImdldFBhcnRpY2xlQ291bnQiLCJzZXRDdXN0b21EYXRhMSIsIngiLCJ5Iiwic2V0Iiwic2V0Q3VzdG9tRGF0YTIiLCJvbkRlc3Ryb3kiLCJkZXN0cm95Iiwib25FbmFibGUiLCJwbGF5T25Bd2FrZSIsIm9uRGlzYWJsZSIsInVwZGF0ZSIsImR0Iiwic2NhbGVkRGVsdGFUaW1lIiwic2ltdWxhdGlvblNwZWVkIiwiX2VtaXQiLCJfdXBkYXRlUGFydGljbGVzIiwidXBkYXRlUGFydGljbGVCdWZmZXIiLCJlbmFibGUiLCJ1cGRhdGVUcmFpbEJ1ZmZlciIsImVtaXQiLCJjb3VudCIsIldvcmxkIiwibm9kZSIsImdldFdvcmxkTWF0cml4IiwiaSIsInBhcnRpY2xlIiwiX2dldEZyZWVQYXJ0aWNsZSIsInJhbmQiLCJJTlRfTUFYIiwicG9zaXRpb24iLCJjb3B5IiwidmVsb2NpdHkiLCJwYXJ0aWNsZUVtaXRaQXhpcyIsImluaXQiLCJzY2FsZSIsImV2YWx1YXRlIiwiZHVyYXRpb24iLCJMb2NhbCIsInRyYW5zZm9ybU1hdDQiLCJ3b3JsZFJvdCIsIlF1YXQiLCJnZXRXb3JsZFJvdGF0aW9uIiwidHJhbnNmb3JtUXVhdCIsIkN1c3RvbSIsInVsdGltYXRlVmVsb2NpdHkiLCJyb3RhdGlvbiIsInN0YXJ0Um90YXRpb24iLCJzaXplIiwic3RhcnRDb2xvciIsImNvbG9yIiwicmVtYWluaW5nTGlmZXRpbWUiLCJyYW5kb21TZWVkIiwiX3NldE5ld1BhcnRpY2xlIiwic3RhcnREZWxheSIsIm1vZGUiLCJNb2RlIiwiQ29uc3RhbnQiLCJjbnQiLCJlbWl0TnVtIiwiTWF0aCIsImZsb29yIiwiZ2V0V29ybGRQb3NpdGlvbiIsImRpc3RhbmNlIiwicmF0ZU92ZXJEaXN0YW5jZSIsImJ1cnN0cyIsImJ1cnN0IiwiYWRkU3ViRW1pdHRlciIsInN1YkVtaXR0ZXIiLCJwdXNoIiwicmVtb3ZlU3ViRW1pdHRlciIsImlkeCIsInNwbGljZSIsImluZGV4T2YiLCJhZGRCdXJzdCIsInJlbW92ZUJ1cnN0IiwiX2NoZWNrQmFjdGgiLCJBcnJheSIsIkJpbGxib2FyZCIsInByb3RvdHlwZSIsIl9vbkJlZm9yZVNlcmlhbGl6ZSIsInByb3BzIiwiZmlsdGVyIiwicCIsImluY2x1ZGVzIiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7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QjlCMUI7Ozs7O1dBQ3lCLElBQUkyQiw0QkFBSjs7Z1JBaUJ6QjNCOzs7OztXQUN5QixJQUFJNEIsNEJBQUo7O3FRQWtCekI1Qjs7Ozs7V0FDYyxJQUFJNkIsaUJBQUo7OzhPQWtCZDdCOzs7OztXQUNhOEIsaUJBQVdpSjs7K09BeUJ4Qi9LOzs7OztXQUNnQjs7bVBBbUJoQkE7Ozs7O1dBQ2M7O3dPQWtCZEE7Ozs7O1dBQ087Ozs7QUFtYVpPLFNBQVMsS0FBS0MsZ0JBQWdCLENBQUN3SyxTQUFqQixDQUEyQkMsa0JBQTNCLEdBQWdELFVBQVNDLEtBQVQsRUFBZTtBQUFBOztBQUFDLFNBQU9BLEtBQUssQ0FBQ0MsTUFBTixDQUFhLFVBQUFDLENBQUM7QUFBQSxXQUFJLENBQUM5SyxhQUFhLENBQUMrSyxRQUFkLENBQXVCRCxDQUF2QixDQUFELElBQThCLEtBQUksQ0FBQ0EsQ0FBRCxDQUFKLENBQVFqRSxNQUExQztBQUFBLEdBQWQsQ0FBUDtBQUF3RSxDQUE3SSxDQUFUO0FBRUFtRSxFQUFFLENBQUM5SyxnQkFBSCxHQUFzQkEsZ0JBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBNYXQ0LCBwc2V1ZG9SYW5kb20sIFF1YXQsIHJhbmRvbVJhbmdlSW50LCBWZWMyLCBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xuaW1wb3J0IHsgSU5UX01BWCB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3V0aWxzJztcbmltcG9ydCBNYXRlcmlhbCBmcm9tICcuLi8uLi9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCc7XG5pbXBvcnQgQ29sb3JPdmVyTGlmZXRpbWVNb2R1bGUgZnJvbSAnLi9hbmltYXRvci9jb2xvci1vdmVydGltZSc7XG5pbXBvcnQgQ3VydmVSYW5nZSwgeyBNb2RlIH1mcm9tICcuL2FuaW1hdG9yL2N1cnZlLXJhbmdlJztcbmltcG9ydCBGb3JjZU92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3IvZm9yY2Utb3ZlcnRpbWUnO1xuaW1wb3J0IEdyYWRpZW50UmFuZ2UgZnJvbSAnLi9hbmltYXRvci9ncmFkaWVudC1yYW5nZSc7XG5pbXBvcnQgTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3IvbGltaXQtdmVsb2NpdHktb3ZlcnRpbWUnO1xuaW1wb3J0IFJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgZnJvbSAnLi9hbmltYXRvci9yb3RhdGlvbi1vdmVydGltZSc7XG5pbXBvcnQgU2l6ZU92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3Ivc2l6ZS1vdmVydGltZSc7XG5pbXBvcnQgVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSBmcm9tICcuL2FuaW1hdG9yL3RleHR1cmUtYW5pbWF0aW9uJztcbmltcG9ydCBWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlIGZyb20gJy4vYW5pbWF0b3IvdmVsb2NpdHktb3ZlcnRpbWUnO1xuaW1wb3J0IEJ1cnN0IGZyb20gJy4vYnVyc3QnO1xuaW1wb3J0IFNoYXBlTW9kdWxlIGZyb20gJy4vZW1pdHRlci9zaGFwZS1tb2R1bGUnO1xuaW1wb3J0IHsgUmVuZGVyTW9kZSwgU3BhY2UgfSBmcm9tICcuL2VudW0nO1xuaW1wb3J0IHsgcGFydGljbGVFbWl0WkF4aXMgfSBmcm9tICcuL3BhcnRpY2xlLWdlbmVyYWwtZnVuY3Rpb24nO1xuaW1wb3J0IFRyYWlsTW9kdWxlIGZyb20gJy4vcmVuZGVyZXIvdHJhaWwnO1xuaW1wb3J0IE1lc2ggZnJvbSAnLi4vLi4vbWVzaC9DQ01lc2gnO1xuXG5jb25zdCB7IGNjY2xhc3MsIG1lbnUsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSwgZXhlY3V0aW9uT3JkZXJ9ID0gcmVxdWlyZSgnLi4vLi4vcGxhdGZvcm0vQ0NDbGFzc0RlY29yYXRvcicpXG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL0NDUmVuZGVyQ29tcG9uZW50Jyk7XG5cbmNvbnN0IF93b3JsZF9tYXQgPSBuZXcgTWF0NCgpO1xuY29uc3QgX21vZHVsZV9wcm9wcyA9IENDX0VESVRPUiAmJiBbXG4gICAgXCJfY29sb3JPdmVyTGlmZXRpbWVNb2R1bGVcIixcbiAgICBcIl9zaGFwZU1vZHVsZVwiLFxuICAgIFwiX3NpemVPdmVydGltZU1vZHVsZVwiLFxuICAgIFwiX3ZlbG9jaXR5T3ZlcnRpbWVNb2R1bGVcIixcbiAgICBcIl9mb3JjZU92ZXJ0aW1lTW9kdWxlXCIsXG4gICAgXCJfbGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlXCIsXG4gICAgXCJfcm90YXRpb25PdmVydGltZU1vZHVsZVwiLFxuICAgIFwiX3RleHR1cmVBbmltYXRpb25Nb2R1bGVcIixcbiAgICBcIl90cmFpbE1vZHVsZVwiXG5dXG5cbi8qKlxuICogISNlbiBUaGUgUGFydGljbGVTeXN0ZW0zRCBDb21wb25lbnQuXG4gKiAhI3poIDNEIOeykuWtkOe7hOS7tlxuICogQGNsYXNzIFBhcnRpY2xlU3lzdGVtM0RcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICovXG5AY2NjbGFzcygnY2MuUGFydGljbGVTeXN0ZW0zRCcpXG5AbWVudSgnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9QYXJ0aWNsZVN5c3RlbTNEJylcbkBleGVjdXRpb25PcmRlcig5OSlcbkBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydGljbGVTeXN0ZW0zRCBleHRlbmRzIFJlbmRlckNvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgcnVuIHRpbWUgb2YgcGFydGljbGUuXG4gICAgICogISN6aCDnspLlrZDns7vnu5/ov5DooYzml7bpl7RcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZHVyYXRpb25cbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBkdXJhdGlvbiA9IDUuMDtcblxuICAgIEBwcm9wZXJ0eVxuICAgIF9jYXBhY2l0eSA9IDEwMDtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBtYXhpbXVtIG51bWJlciBvZiBwYXJ0aWNsZXMgdGhhdCBhIHBhcnRpY2xlIHN5c3RlbSBjYW4gZ2VuZXJhdGUuXG4gICAgICogISN6aCDnspLlrZDns7vnu5/og73nlJ/miJDnmoTmnIDlpKfnspLlrZDmlbDph49cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gY2FwYWNpdHlcbiAgICAgKi9cbiAgICBAcHJvcGVydHlcbiAgICBnZXQgY2FwYWNpdHkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FwYWNpdHk7XG4gICAgfVxuXG4gICAgc2V0IGNhcGFjaXR5ICh2YWwpIHtcbiAgICAgICAgdGhpcy5fY2FwYWNpdHkgPSB2YWw7XG4gICAgICAgIGlmICh0aGlzLl9hc3NlbWJsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5zZXRDYXBhY2l0eSh0aGlzLl9jYXBhY2l0eSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZXRoZXIgdGhlIHBhcnRpY2xlIHN5c3RlbSBsb29wcy5cbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+aYr+WQpuW+queOr+aSreaUvlxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gbG9vcFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eVxuICAgIGxvb3AgPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIHRoZSBwYXJ0aWNsZXMgc3RhcnQgcGxheWluZyBhdXRvbWF0aWNhbGx5IGFmdGVyIGxvYWRlZC5cbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+WKoOi9veWQjuaYr+WQpuiHquWKqOW8gOWni+aSreaUvlxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcGxheU9uQXdha2VcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0pXG4gICAgcGxheU9uQXdha2UgPSB0cnVlO1xuXG4gICAgQHByb3BlcnR5XG4gICAgX3ByZXdhcm0gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZW4gc2VsZWN0ZWQsIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gd2lsbCBzdGFydCBwbGF5aW5nIGFmdGVyIG9uZSByb3VuZCBoYXMgYmVlbiBwbGF5ZWQgKG9ubHkgZWZmZWN0aXZlIHdoZW4gbG9vcCBpcyBlbmFibGVkKS5cbiAgICAgKiAhI3poIOmAieS4reS5i+WQju+8jOeykuWtkOezu+e7n+S8muS7peW3suaSreaUvuWujOS4gOi9ruS5i+WQjueahOeKtuaAgeW8gOWni+aSreaUvu+8iOS7heW9k+W+queOr+aSreaUvuWQr+eUqOaXtuacieaViO+8iVxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJld2FybVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgcHJld2FybSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmV3YXJtO1xuICAgIH1cblxuICAgIHNldCBwcmV3YXJtICh2YWwpIHtcbiAgICAgICAgaWYgKHZhbCA9PT0gdHJ1ZSAmJiB0aGlzLmxvb3AgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oJ3ByZXdhcm0gb25seSB3b3JrcyBpZiBsb29wIGlzIGFsc28gZW5hYmxlZC4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmV3YXJtID0gdmFsO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIF9zaW11bGF0aW9uU3BhY2UgPSBTcGFjZS5Mb2NhbDtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb29yZGluYXRlIHN5c3RlbSBpbiB3aGljaCB0aGUgcGFydGljbGUgc3lzdGVtIGlzIGxvY2F0ZWQuPGJyPlxuICAgICAqIFdvcmxkIGNvb3JkaW5hdGVzIChkb2VzIG5vdCBjaGFuZ2Ugd2hlbiB0aGUgcG9zaXRpb24gb2Ygb3RoZXIgb2JqZWN0cyBjaGFuZ2VzKTxicj5cbiAgICAgKiBMb2NhbCBjb29yZGluYXRlcyAobW92aW5nIGFzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGFyZW50IG5vZGUgY2hhbmdlcyk8YnI+XG4gICAgICogQ3VzdG9tIGNvb3JkaW5hdGVzIChtb3Zpbmcgd2l0aCB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gbm9kZSlcbiAgICAgKiAhI3poIOmAieaLqeeykuWtkOezu+e7n+aJgOWcqOeahOWdkOagh+ezuzxicj5cbiAgICAgKiDkuJbnlYzlnZDmoIfvvIjkuI3pmo/lhbbku5bniankvZPkvY3nva7mlLnlj5jogIzlj5jmjaLvvIk8YnI+XG4gICAgICog5bGA6YOo5Z2Q5qCH77yI6Lef6ZqP54i26IqC54K55L2N572u5pS55Y+Y6ICM56e75Yqo77yJPGJyPlxuICAgICAqIOiHquWumuWdkOagh++8iOi3n+maj+iHquWumuS5ieiKgueCueeahOS9jee9ruaUueWPmOiAjOenu+WKqO+8iVxuICAgICAqIEBwcm9wZXJ0eSB7U3BhY2V9IHNpbXVsYXRpb25TcGFjZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFNwYWNlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0pXG4gICAgZ2V0IHNpbXVsYXRpb25TcGFjZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0aW9uU3BhY2U7XG4gICAgfVxuXG4gICAgc2V0IHNpbXVsYXRpb25TcGFjZSAodmFsKSB7XG4gICAgICAgIGlmICh2YWwgIT09IHRoaXMuX3NpbXVsYXRpb25TcGFjZSkge1xuICAgICAgICAgICAgdGhpcy5fc2ltdWxhdGlvblNwYWNlID0gdmFsO1xuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVNYXRlcmlhbFBhcmFtcygpO1xuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVUcmFpbE1hdGVyaWFsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbnRyb2xsaW5nIHRoZSB1cGRhdGUgc3BlZWQgb2YgdGhlIGVudGlyZSBwYXJ0aWNsZSBzeXN0ZW0uXG4gICAgICogISN6aCDmjqfliLbmlbTkuKrnspLlrZDns7vnu5/nmoTmm7TmlrDpgJ/luqbjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc2ltdWxhdGlvblNwZWVkXG4gICAgICovXG4gICAgQHByb3BlcnR5XG4gICAgc2ltdWxhdGlvblNwZWVkID0gMS4wO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBEZWxheSBwYXJ0aWNsZSBlbWlzc2lvbiB0aW1lIGFmdGVyIHBhcnRpY2xlIHN5c3RlbSBzdGFydHMgcnVubmluZy5cbiAgICAgKiAhI3poIOeykuWtkOezu+e7n+W8gOWni+i/kOihjOWQju+8jOW7tui/n+eykuWtkOWPkeWwhOeahOaXtumXtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Q3VydmVSYW5nZX0gc3RhcnREZWxheVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgfSlcbiAgICBzdGFydERlbGF5ID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgbGlmZSBjeWNsZeOAglxuICAgICAqICEjemgg57KS5a2Q55Sf5ZG95ZGo5pyf44CCXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydExpZmV0aW1lXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICB9KVxuICAgIHN0YXJ0TGlmZXRpbWUgPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBpbml0aWFsIGNvbG9yXG4gICAgICogISN6aCDnspLlrZDliJ3lp4vpopzoibJcbiAgICAgKiBAcHJvcGVydHkge0dyYWRpZW50UmFuZ2V9IHN0YXJ0Q29sb3JcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBHcmFkaWVudFJhbmdlLFxuICAgIH0pXG4gICAgc3RhcnRDb2xvciA9IG5ldyBHcmFkaWVudFJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhcnRpY2xlIHNjYWxlIHNwYWNlXG4gICAgICogISN6aCDnvKnmlL7nqbrpl7RcbiAgICAgKiBAcHJvcGVydHkge1NwYWNlfSBzY2FsZVNwYWNlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogU3BhY2UsXG4gICAgfSlcbiAgICBzY2FsZVNwYWNlID0gU3BhY2UuTG9jYWw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluaXRpYWwgcGFydGljbGUgc2l6ZVxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL5aSn5bCPXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydFNpemVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgc3RhcnRTaXplID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gSW5pdGlhbCBwYXJ0aWNsZSBzcGVlZFxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL6YCf5bqmXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydFNwZWVkXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXG4gICAgfSlcbiAgICBzdGFydFNwZWVkID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgaW5pdGlhbCByb3RhdGlvbiBhbmdsZVxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL5peL6L2s6KeS5bqmXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSBzdGFydFJvdGF0aW9uXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ3VydmVSYW5nZSxcbiAgICAgICAgcmFuZ2U6IFstMSwgMV0sXG4gICAgICAgIHJhZGlhbjogdHJ1ZSxcbiAgICB9KVxuICAgIHN0YXJ0Um90YXRpb24gPSBuZXcgQ3VydmVSYW5nZSgpO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBHcmF2aXR5IGNvZWZmaWNpZW50IG9mIHBhcnRpY2xlcyBhZmZlY3RlZCBieSBncmF2aXR5XG4gICAgICogISN6aCDnspLlrZDlj5fph43lipvlvbHlk43nmoTph43lipvns7vmlbBcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IGdyYXZpdHlNb2RpZmllclxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IEN1cnZlUmFuZ2UsXG4gICAgICAgIHJhbmdlOiBbLTEsIDFdLFxuICAgIH0pXG4gICAgZ3Jhdml0eU1vZGlmaWVyID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8vIGVtaXNzaW9uIG1vZHVsZVxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGVzIGVtaXR0ZWQgcGVyIHNlY29uZFxuICAgICAqICEjemgg5q+P56eS5Y+R5bCE55qE57KS5a2Q5pWwXG4gICAgICogQHByb3BlcnR5IHtDdXJ2ZVJhbmdlfSByYXRlT3ZlclRpbWVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgcmF0ZU92ZXJUaW1lID0gbmV3IEN1cnZlUmFuZ2UoKTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gTnVtYmVyIG9mIHBhcnRpY2xlcyBlbWl0dGVkIHBlciB1bml0IGRpc3RhbmNlIG1vdmVkXG4gICAgICogISN6aCDmr4/np7vliqjljZXkvY3ot53nprvlj5HlsITnmoTnspLlrZDmlbBcbiAgICAgKiBAcHJvcGVydHkge0N1cnZlUmFuZ2V9IHJhdGVPdmVyRGlzdGFuY2VcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBDdXJ2ZVJhbmdlLFxuICAgIH0pXG4gICAgcmF0ZU92ZXJEaXN0YW5jZSA9IG5ldyBDdXJ2ZVJhbmdlKCk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBudW1iZXIgb2YgQnJ1c3RzIHRoYXQgZW1pdCBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGFydGljbGVzIGF0IGEgc3BlY2lmaWVkIHRpbWVcbiAgICAgKiAhI3poIOiuvuWumuWcqOaMh+WumuaXtumXtOWPkeWwhOaMh+WumuaVsOmHj+eahOeykuWtkOeahCBCcnVzdCDnmoTmlbDph49cbiAgICAgKiBAcHJvcGVydHkge1tCdXJzdF19IGJ1cnN0c1xuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtCdXJzdF0sXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBidXJzdHMgPSBuZXcgQXJyYXkoKTtcblxuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFtNYXRlcmlhbF0sXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnTWF0ZXJpYWxzJyxcbiAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgIG92ZXJyaWRlOiB0cnVlLFxuICAgIH0pXG4gICAgZ2V0IG1hdGVyaWFscyAoKSB7XG4gICAgICAgIC8vIGlmIHdlIGRvbid0IGNyZWF0ZSBhbiBhcnJheSBjb3B5LCB0aGUgZWRpdG9yIHdpbGwgbW9kaWZ5IHRoZSBvcmlnaW5hbCBhcnJheSBkaXJlY3RseS5cbiAgICAgICAgcmV0dXJuIHRoaXMuX21hdGVyaWFscztcbiAgICB9XG5cbiAgICBzZXQgbWF0ZXJpYWxzICh2YWwpIHtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxzID0gdmFsO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgLy8gc2hwYWUgbW9kdWxlXG4gICAgX3NoYXBlTW9kdWxlID0gbmV3IFNoYXBlTW9kdWxlKCk7XG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBlbWl0dGVyIG1vZHVsZVxuICAgICAqICEjemgg57KS5a2Q5Y+R5bCE5Zmo5qih5Z2XXG4gICAgICogQHByb3BlcnR5IHtTaGFwZU1vZHVsZX0gc2hhcGVNb2R1bGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBTaGFwZU1vZHVsZSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCBzaGFwZU1vZHVsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaGFwZU1vZHVsZTtcbiAgICB9XG4gICAgc2V0IHNoYXBlTW9kdWxlICh2YWwpIHtcbiAgICAgICAgdGhpcy5fc2hhcGVNb2R1bGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3NoYXBlTW9kdWxlLm9uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICAvLyBjb2xvciBvdmVyIGxpZmV0aW1lIG1vZHVsZVxuICAgIF9jb2xvck92ZXJMaWZldGltZU1vZHVsZSA9IG5ldyBDb2xvck92ZXJMaWZldGltZU1vZHVsZSgpO1xuICAgIC8qKlxuICAgICAqICEjZW4gQ29sb3IgY29udHJvbCBtb2R1bGVcbiAgICAgKiAhI3poIOminOiJsuaOp+WItuaooeWdl1xuICAgICAqIEBwcm9wZXJ0eSB7Q29sb3JPdmVyTGlmZXRpbWVNb2R1bGV9IGNvbG9yT3ZlckxpZmV0aW1lTW9kdWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogQ29sb3JPdmVyTGlmZXRpbWVNb2R1bGUsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgY29sb3JPdmVyTGlmZXRpbWVNb2R1bGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JPdmVyTGlmZXRpbWVNb2R1bGU7XG4gICAgfVxuICAgIHNldCBjb2xvck92ZXJMaWZldGltZU1vZHVsZSAodmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbG9yT3ZlckxpZmV0aW1lTW9kdWxlID0gdmFsO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIC8vIHNpemUgb3ZlciBsaWZldGltZSBtb2R1bGVcbiAgICBfc2l6ZU92ZXJ0aW1lTW9kdWxlID0gbmV3IFNpemVPdmVydGltZU1vZHVsZSgpO1xuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgc2l6ZSBtb2R1bGVcbiAgICAgKiAhI3poIOeykuWtkOWkp+Wwj+aooeWdl1xuICAgICAqIEBwcm9wZXJ0eSB7U2l6ZU92ZXJ0aW1lTW9kdWxlfSBzaXplT3ZlcnRpbWVNb2R1bGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBTaXplT3ZlcnRpbWVNb2R1bGUsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgc2l6ZU92ZXJ0aW1lTW9kdWxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpemVPdmVydGltZU1vZHVsZTtcbiAgICB9XG4gICAgc2V0IHNpemVPdmVydGltZU1vZHVsZSAodmFsKSB7XG4gICAgICAgIHRoaXMuX3NpemVPdmVydGltZU1vZHVsZSA9IHZhbDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBfdmVsb2NpdHlPdmVydGltZU1vZHVsZSA9IG5ldyBWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlKCk7XG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBzcGVlZCBtb2R1bGVcbiAgICAgKiAhI3poIOeykuWtkOmAn+W6puaooeWdl1xuICAgICAqIEBwcm9wZXJ0eSB7VmVsb2NpdHlPdmVydGltZU1vZHVsZX0gdmVsb2NpdHlPdmVydGltZU1vZHVsZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgdmVsb2NpdHlPdmVydGltZU1vZHVsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlO1xuICAgIH1cblxuICAgIHNldCB2ZWxvY2l0eU92ZXJ0aW1lTW9kdWxlICh2YWwpIHtcbiAgICAgICAgdGhpcy5fdmVsb2NpdHlPdmVydGltZU1vZHVsZSA9IHZhbDtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBfZm9yY2VPdmVydGltZU1vZHVsZSA9IG5ldyBGb3JjZU92ZXJ0aW1lTW9kdWxlKCk7XG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBhY2NlbGVyYXRpb24gbW9kdWxlXG4gICAgICogISN6aCDnspLlrZDliqDpgJ/luqbmqKHlnZdcbiAgICAgKiBAcHJvcGVydHkge0ZvcmNlT3ZlcnRpbWVNb2R1bGV9IGZvcmNlT3ZlcnRpbWVNb2R1bGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBGb3JjZU92ZXJ0aW1lTW9kdWxlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0pXG4gICAgZ2V0IGZvcmNlT3ZlcnRpbWVNb2R1bGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9yY2VPdmVydGltZU1vZHVsZTtcbiAgICB9XG4gICAgc2V0IGZvcmNlT3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9mb3JjZU92ZXJ0aW1lTW9kdWxlID0gdmFsO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIF9saW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgPSBuZXcgTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlKCk7XG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBsaW1pdCBzcGVlZCBtb2R1bGUgKG9ubHkgQ1BVIHBhcnRpY2xlcyBhcmUgc3VwcG9ydGVkKVxuICAgICAqICEjemgg57KS5a2Q6ZmQ5Yi26YCf5bqm5qih5Z2X77yI5Y+q5pSv5oyBIENQVSDnspLlrZDvvIlcbiAgICAgKiBAcHJvcGVydHkge0xpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZX0gbGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogTGltaXRWZWxvY2l0eU92ZXJ0aW1lTW9kdWxlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0pXG4gICAgZ2V0IGxpbWl0VmVsb2NpdHlPdmVydGltZU1vZHVsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGU7XG4gICAgfVxuICAgIHNldCBsaW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9saW1pdFZlbG9jaXR5T3ZlcnRpbWVNb2R1bGUgPSB2YWw7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX3JvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgPSBuZXcgUm90YXRpb25PdmVydGltZU1vZHVsZSgpO1xuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgcm90YXRpb24gbW9kdWxlXG4gICAgICogISN6aCDnspLlrZDml4vovazmqKHlnZdcbiAgICAgKiBAcHJvcGVydHkge1JvdGF0aW9uT3ZlcnRpbWVNb2R1bGV9IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBSb3RhdGlvbk92ZXJ0aW1lTW9kdWxlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0pXG4gICAgZ2V0IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb25PdmVydGltZU1vZHVsZTtcbiAgICB9XG4gICAgc2V0IHJvdGF0aW9uT3ZlcnRpbWVNb2R1bGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9yb3RhdGlvbk92ZXJ0aW1lTW9kdWxlID0gdmFsO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIF90ZXh0dXJlQW5pbWF0aW9uTW9kdWxlID0gbmV3IFRleHR1cmVBbmltYXRpb25Nb2R1bGUoKTtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRleHR1cmUgQW5pbWF0aW9uIE1vZHVsZVxuICAgICAqICEjemgg6LS05Zu+5Yqo55S75qih5Z2XXG4gICAgICogQHByb3BlcnR5IHtUZXh0dXJlQW5pbWF0aW9uTW9kdWxlfSB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogVGV4dHVyZUFuaW1hdGlvbk1vZHVsZSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmVBbmltYXRpb25Nb2R1bGU7XG4gICAgfVxuICAgIHNldCB0ZXh0dXJlQW5pbWF0aW9uTW9kdWxlICh2YWwpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZUFuaW1hdGlvbk1vZHVsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fdGV4dHVyZUFuaW1hdGlvbk1vZHVsZS5vbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX3RyYWlsTW9kdWxlID0gbmV3IFRyYWlsTW9kdWxlKCk7XG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBUcmFqZWN0b3J5IE1vZHVsZVxuICAgICAqICEjemgg57KS5a2Q6L2o6L+55qih5Z2XXG4gICAgICogQHByb3BlcnR5IHtUcmFpbE1vZHVsZX0gdHJhaWxNb2R1bGVcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBUcmFpbE1vZHVsZSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCB0cmFpbE1vZHVsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFpbE1vZHVsZTtcbiAgICB9XG4gICAgc2V0IHRyYWlsTW9kdWxlICh2YWwpIHtcbiAgICAgICAgdGhpcy5fdHJhaWxNb2R1bGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX3RyYWlsTW9kdWxlLm9uSW5pdCh0aGlzKTtcbiAgICB9XG5cbiAgICBAcHJvcGVydHlcbiAgICBfcmVuZGVyTW9kZSA9IFJlbmRlck1vZGUuQmlsbGJvYXJkO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZSBnZW5lcmF0aW9uIG1vZGVcbiAgICAgKiAhI3poIOiuvuWumueykuWtkOeUn+aIkOaooeW8j1xuICAgICAqIEBwcm9wZXJ0eSB7UmVuZGVyTW9kZX0gcmVuZGVyTW9kZVxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IFJlbmRlck1vZGUsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgcmVuZGVyTW9kZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJNb2RlO1xuICAgIH1cblxuICAgIHNldCByZW5kZXJNb2RlICh2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlck1vZGUgPT09IHZhbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlbmRlck1vZGUgPSB2YWw7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fc2V0VmVydGV4QXR0cmliKCk7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVNYXRlcmlhbFBhcmFtcygpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIF92ZWxvY2l0eVNjYWxlID0gMTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gV2hlbiB0aGUgcGFydGljbGUgZ2VuZXJhdGlvbiBtb2RlIGlzIFN0cmVjdGhlZEJpbGxib2FyZCwgaW4gdGhlIGRpcmVjdGlvbiBvZiBtb3ZlbWVudCBvZiB0aGUgcGFydGljbGVzIGlzIHN0cmV0Y2hlZCBieSB2ZWxvY2l0eSBtYWduaXR1ZGVcbiAgICAgKiAhI3poIOWcqOeykuWtkOeUn+aIkOaWueW8j+S4uiBTdHJlY3RoZWRCaWxsYm9hcmQg5pe2LOWvueeykuWtkOWcqOi/kOWKqOaWueWQkeS4iuaMiemAn+W6puWkp+Wwj+i/m+ihjOaLieS8uFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB2ZWxvY2l0eVNjYWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCB2ZWxvY2l0eVNjYWxlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlbG9jaXR5U2NhbGU7XG4gICAgfVxuXG4gICAgc2V0IHZlbG9jaXR5U2NhbGUgKHZhbCkge1xuICAgICAgICB0aGlzLl92ZWxvY2l0eVNjYWxlID0gdmFsO1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX3VwZGF0ZU1hdGVyaWFsUGFyYW1zKCk7XG4gICAgfVxuXG4gICAgQHByb3BlcnR5XG4gICAgX2xlbmd0aFNjYWxlID0gMTtcbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZW4gdGhlIHBhcnRpY2xlIGdlbmVyYXRpb24gbWV0aG9kIGlzIFN0cmVjdGhlZEJpbGxib2FyZCwgdGhlIHBhcnRpY2xlcyBhcmUgc3RyZXRjaGVkIGFjY29yZGluZyB0byB0aGUgcGFydGljbGUgc2l6ZSBpbiB0aGUgZGlyZWN0aW9uIG9mIG1vdGlvblxuICAgICAqICEjemgg5Zyo57KS5a2Q55Sf5oiQ5pa55byP5Li6IFN0cmVjdGhlZEJpbGxib2FyZCDml7Ys5a+557KS5a2Q5Zyo6L+Q5Yqo5pa55ZCR5LiK5oyJ57KS5a2Q5aSn5bCP6L+b6KGM5ouJ5Ly4XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGxlbmd0aFNjYWxlXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCBsZW5ndGhTY2FsZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZW5ndGhTY2FsZTtcbiAgICB9XG5cbiAgICBzZXQgbGVuZ3RoU2NhbGUgKHZhbCkge1xuICAgICAgICB0aGlzLl9sZW5ndGhTY2FsZSA9IHZhbDtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVNYXRlcmlhbFBhcmFtcygpO1xuICAgIH1cblxuICAgIEBwcm9wZXJ0eVxuICAgIF9tZXNoID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgbW9kZWxcbiAgICAgKiAhI3poIOeykuWtkOaooeWei1xuICAgICAqIEBwcm9wZXJ0eSB7TWVzaH0gbWVzaFxuICAgICAqL1xuICAgIEBwcm9wZXJ0eSh7XG4gICAgICAgIHR5cGU6IE1lc2gsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgbWVzaCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNoO1xuICAgIH1cblxuICAgIHNldCBtZXNoICh2YWwpIHtcbiAgICAgICAgdGhpcy5fbWVzaCA9IHZhbDtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLl91cGRhdGVNb2RlbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGUgbWF0ZXJpYWxcbiAgICAgKiAhI3poIOeykuWtkOadkOi0qFxuICAgICAqIEBwcm9wZXJ0eSB7TWF0ZXJpYWx9IHBhcnRpY2xlTWF0ZXJpYWxcbiAgICAgKi9cbiAgICBAcHJvcGVydHkoe1xuICAgICAgICB0eXBlOiBNYXRlcmlhbCxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICB9KVxuICAgIGdldCBwYXJ0aWNsZU1hdGVyaWFsICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgfVxuXG4gICAgc2V0IHBhcnRpY2xlTWF0ZXJpYWwgKHZhbCkge1xuICAgICAgICB0aGlzLnNldE1hdGVyaWFsKDAsIHZhbCk7XG4gICAgICAgIHRoaXMuX29uTWF0ZXJpYWxNb2RpZmllZCgwLCB2YWwpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuIFBhcnRpY2xlIHRyYWlsIG1hdGVyaWFsXG4gICAgICogISN6aCDnspLlrZDovajov7nmnZDotKhcbiAgICAgKiBAcHJvcGVydHkge01hdGVyaWFsfSB0cmFpbE1hdGVyaWFsXG4gICAgICovXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogTWF0ZXJpYWwsXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgfSlcbiAgICBnZXQgdHJhaWxNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hdGVyaWFsKDEpO1xuICAgIH1cblxuICAgIHNldCB0cmFpbE1hdGVyaWFsICh2YWwpIHtcbiAgICAgICAgdGhpcy5zZXRNYXRlcmlhbCgxLCB2YWwpO1xuICAgICAgICB0aGlzLl9vbk1hdGVyaWFsTW9kaWZpZWQoMSwgdmFsKTtcbiAgICB9XG5cbiAgICBfaXNQbGF5aW5nO1xuICAgIF9pc1BhdXNlZDtcbiAgICBfaXNTdG9wcGVkO1xuICAgIF9pc0VtaXR0aW5nO1xuICAgIF90aW1lOyAgLy8gcGxheWJhY2sgcG9zaXRpb24gaW4gc2Vjb25kcy5cbiAgICBfZW1pdFJhdGVUaW1lQ291bnRlcjtcbiAgICBfZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXI7XG4gICAgX29sZFdQb3M7XG4gICAgX2N1cldQb3M7XG4gICAgX2N1c3RvbURhdGExO1xuICAgIF9jdXN0b21EYXRhMjtcbiAgICBfc3ViRW1pdHRlcnM7IC8vIGFycmF5IG9mIHsgZW1pdHRlcjogUGFydGljbGVTeXN0ZW0zRCwgdHlwZTogJ2JpcnRoJywgJ2NvbGxpc2lvbicgb3IgJ2RlYXRoJ31cblxuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnJhdGVPdmVyVGltZS5jb25zdGFudCA9IDEwO1xuICAgICAgICB0aGlzLnN0YXJ0TGlmZXRpbWUuY29uc3RhbnQgPSA1O1xuICAgICAgICB0aGlzLnN0YXJ0U2l6ZS5jb25zdGFudCA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRTcGVlZC5jb25zdGFudCA9IDU7XG5cbiAgICAgICAgLy8gaW50ZXJuYWwgc3RhdHVzXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pc0VtaXR0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fdGltZSA9IDAuMDsgIC8vIHBsYXliYWNrIHBvc2l0aW9uIGluIHNlY29uZHMuXG4gICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgPSAwLjA7XG4gICAgICAgIHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyID0gMC4wO1xuICAgICAgICB0aGlzLl9vbGRXUG9zID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgICAgIHRoaXMuX2N1cldQb3MgPSBuZXcgVmVjMygwLCAwLCAwKTtcblxuICAgICAgICB0aGlzLl9jdXN0b21EYXRhMSA9IG5ldyBWZWMyKDAsIDApO1xuICAgICAgICB0aGlzLl9jdXN0b21EYXRhMiA9IG5ldyBWZWMyKDAsIDApO1xuXG4gICAgICAgIHRoaXMuX3N1YkVtaXR0ZXJzID0gW107IC8vIGFycmF5IG9mIHsgZW1pdHRlcjogUGFydGljbGVTeXN0ZW1Db21wb25lbnQsIHR5cGU6ICdiaXJ0aCcsICdjb2xsaXNpb24nIG9yICdkZWF0aCd9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5fYXNzZW1ibGVyLm9uSW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaGFwZU1vZHVsZS5vbkluaXQodGhpcyk7XG4gICAgICAgIHRoaXMudHJhaWxNb2R1bGUub25Jbml0KHRoaXMpO1xuICAgICAgICB0aGlzLnRleHR1cmVBbmltYXRpb25Nb2R1bGUub25Jbml0KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0UG9zaXRpb24oKTtcblxuICAgICAgICAvLyB0aGlzLl9zeXN0ZW0uYWRkKHRoaXMpO1xuICAgIH1cblxuICAgIF9vbk1hdGVyaWFsTW9kaWZpZWQgKGluZGV4LCBtYXRlcmlhbCkge1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX29uTWF0ZXJpYWxNb2RpZmllZChpbmRleCwgbWF0ZXJpYWwpO1xuICAgIH1cblxuICAgIF9vblJlYnVpbGRQU08gKGluZGV4LCBtYXRlcmlhbCkge1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIuX29uUmVidWlsZFBTTyhpbmRleCwgbWF0ZXJpYWwpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGZhc3Rmb3J3YXJkIGN1cnJlbnQgcGFydGljbGUgc3lzdGVtIGJ5IHNpbXVsYXRpbmcgcGFydGljbGVzIG92ZXIgZ2l2ZW4gcGVyaW9kIG9mIHRpbWUsIHRoZW4gcGF1c2UgaXQuXG4gICAgLy8gc2ltdWxhdGUodGltZSwgd2l0aENoaWxkcmVuLCByZXN0YXJ0LCBmaXhlZFRpbWVTdGVwKSB7XG5cbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBsYXlpbmcgcGFydGljbGUgZWZmZWN0c1xuICAgICAqICEjemgg5pKt5pS+57KS5a2Q5pWI5p6cXG4gICAgICogQG1ldGhvZCBwbGF5XG4gICAgICovXG4gICAgcGxheSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc1BhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2lzRW1pdHRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuX3Jlc2V0UG9zaXRpb24oKTtcblxuICAgICAgICAvLyBwcmV3YXJtXG4gICAgICAgIGlmICh0aGlzLl9wcmV3YXJtKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV3YXJtU3lzdGVtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIHBhcnRpY2xlIGVmZmVjdFxuICAgICAqICEjemgg5pqC5YGc5pKt5pS+57KS5a2Q5pWI5p6cXG4gICAgICogQG1ldGhvZCBwYXVzZVxuICAgICAqL1xuICAgIHBhdXNlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzU3RvcHBlZCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdwYXVzZSgpOiBwYXJ0aWNsZSBzeXN0ZW0gaXMgYWxyZWFkeSBzdG9wcGVkLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBwYXJ0aWNsZSBlZmZlY3RcbiAgICAgKiAhI3poIOWBnOatouaSreaUvueykuWtkOaViOaenFxuICAgICAqIEBtZXRob2Qgc3RvcFxuICAgICAqL1xuICAgIHN0b3AgKCkge1xuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nIHx8IHRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzUGxheWluZykge1xuICAgICAgICAgICAgdGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGltZSA9IDAuMDtcbiAgICAgICAgdGhpcy5fZW1pdFJhdGVUaW1lQ291bnRlciA9IDAuMDtcbiAgICAgICAgdGhpcy5fZW1pdFJhdGVEaXN0YW5jZUNvdW50ZXIgPSAwLjA7XG5cbiAgICAgICAgdGhpcy5faXNTdG9wcGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWxsIHBhcnRpY2xlcyBmcm9tIGN1cnJlbnQgcGFydGljbGUgc3lzdGVtLlxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlIGFsbCBwYXJ0aWNsZSBlZmZlY3RcbiAgICAgKiAhI3poIOWwhuaJgOacieeykuWtkOS7jueykuWtkOezu+e7n+S4rea4hemZpFxuICAgICAqIEBtZXRob2QgY2xlYXJcbiAgICAgKi9cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJ0aWNsZUNvdW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fzc2VtYmxlci5nZXRQYXJ0aWNsZUNvdW50KCk7XG4gICAgfVxuXG4gICAgc2V0Q3VzdG9tRGF0YTEgKHgsIHkpIHtcbiAgICAgICAgVmVjMi5zZXQodGhpcy5fY3VzdG9tRGF0YTEsIHgsIHkpO1xuICAgIH1cblxuICAgIHNldEN1c3RvbURhdGEyICh4LCB5KSB7XG4gICAgICAgIFZlYzIuc2V0KHRoaXMuX2N1c3RvbURhdGEyLCB4LCB5KTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICAvLyB0aGlzLl9zeXN0ZW0ucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLl9hc3NlbWJsZXIub25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMudHJhaWxNb2R1bGUuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgc3VwZXIub25FbmFibGUoKTtcbiAgICAgICAgaWYgKHRoaXMucGxheU9uQXdha2UpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5vbkVuYWJsZSgpO1xuICAgICAgICB0aGlzLnRyYWlsTW9kdWxlLm9uRW5hYmxlKCk7XG4gICAgfVxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgc3VwZXIub25EaXNhYmxlKCk7XG4gICAgICAgIHRoaXMuX2Fzc2VtYmxlci5vbkRpc2FibGUoKTtcbiAgICAgICAgdGhpcy50cmFpbE1vZHVsZS5vbkRpc2FibGUoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGNvbnN0IHNjYWxlZERlbHRhVGltZSA9IGR0ICogdGhpcy5zaW11bGF0aW9uU3BlZWQ7XG4gICAgICAgIGlmICh0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgKz0gc2NhbGVkRGVsdGFUaW1lO1xuXG4gICAgICAgICAgICAvLyBleGN1dGUgZW1pc3Npb25cbiAgICAgICAgICAgIHRoaXMuX2VtaXQoc2NhbGVkRGVsdGFUaW1lKTtcblxuICAgICAgICAgICAgLy8gc2ltdWxhdGlvbiwgdXBkYXRlIHBhcnRpY2xlcy5cbiAgICAgICAgICAgIGlmICh0aGlzLl9hc3NlbWJsZXIuX3VwZGF0ZVBhcnRpY2xlcyhzY2FsZWREZWx0YVRpbWUpID09PSAwICYmICF0aGlzLl9pc0VtaXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSByZW5kZXIgZGF0YVxuICAgICAgICAgICAgdGhpcy5fYXNzZW1ibGVyLnVwZGF0ZVBhcnRpY2xlQnVmZmVyKCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0cmFpbFxuICAgICAgICAgICAgaWYgKHRoaXMudHJhaWxNb2R1bGUuZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFpbE1vZHVsZS51cGRhdGVUcmFpbEJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW1pdCAoY291bnQsIGR0KSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NpbXVsYXRpb25TcGFjZSA9PT0gU3BhY2UuV29ybGQpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRXb3JsZE1hdHJpeChfd29ybGRfbWF0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgcGFydGljbGUgPSB0aGlzLl9hc3NlbWJsZXIuX2dldEZyZWVQYXJ0aWNsZSgpO1xuICAgICAgICAgICAgaWYgKHBhcnRpY2xlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmFuZCA9IHBzZXVkb1JhbmRvbShyYW5kb21SYW5nZUludCgwLCBJTlRfTUFYKSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNoYXBlTW9kdWxlLmVuYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVNb2R1bGUuZW1pdChwYXJ0aWNsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBWZWMzLnNldChwYXJ0aWNsZS5wb3NpdGlvbiwgMCwgMCwgMCk7XG4gICAgICAgICAgICAgICAgVmVjMy5jb3B5KHBhcnRpY2xlLnZlbG9jaXR5LCBwYXJ0aWNsZUVtaXRaQXhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnRleHR1cmVBbmltYXRpb25Nb2R1bGUuZW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlQW5pbWF0aW9uTW9kdWxlLmluaXQocGFydGljbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBWZWMzLnNjYWxlKHBhcnRpY2xlLnZlbG9jaXR5LCBwYXJ0aWNsZS52ZWxvY2l0eSwgdGhpcy5zdGFydFNwZWVkLmV2YWx1YXRlKHRoaXMuX3RpbWUgLyB0aGlzLmR1cmF0aW9uLCByYW5kKSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fc2ltdWxhdGlvblNwYWNlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGFjZS5Mb2NhbDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBTcGFjZS5Xb3JsZDpcbiAgICAgICAgICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KHBhcnRpY2xlLnBvc2l0aW9uLCBwYXJ0aWNsZS5wb3NpdGlvbiwgX3dvcmxkX21hdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdvcmxkUm90ID0gbmV3IFF1YXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldFdvcmxkUm90YXRpb24od29ybGRSb3QpO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQocGFydGljbGUudmVsb2NpdHksIHBhcnRpY2xlLnZlbG9jaXR5LCB3b3JsZFJvdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU3BhY2UuQ3VzdG9tOlxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFZlYzMuY29weShwYXJ0aWNsZS51bHRpbWF0ZVZlbG9jaXR5LCBwYXJ0aWNsZS52ZWxvY2l0eSk7XG4gICAgICAgICAgICAvLyBhcHBseSBzdGFydFJvdGF0aW9uLiBub3cgMkQgb25seS5cbiAgICAgICAgICAgIFZlYzMuc2V0KHBhcnRpY2xlLnJvdGF0aW9uLCAwLCAwLCB0aGlzLnN0YXJ0Um90YXRpb24uZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpKTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3RhcnRTaXplLiBub3cgMkQgb25seS5cbiAgICAgICAgICAgIFZlYzMuc2V0KHBhcnRpY2xlLnN0YXJ0U2l6ZSwgdGhpcy5zdGFydFNpemUuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIHJhbmQpLCAxLCAxKTtcbiAgICAgICAgICAgIHBhcnRpY2xlLnN0YXJ0U2l6ZS55ID0gcGFydGljbGUuc3RhcnRTaXplLng7XG4gICAgICAgICAgICBWZWMzLmNvcHkocGFydGljbGUuc2l6ZSwgcGFydGljbGUuc3RhcnRTaXplKTtcblxuICAgICAgICAgICAgLy8gYXBwbHkgc3RhcnRDb2xvci5cbiAgICAgICAgICAgIHBhcnRpY2xlLnN0YXJ0Q29sb3Iuc2V0KHRoaXMuc3RhcnRDb2xvci5ldmFsdWF0ZSh0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbiwgcmFuZCkpO1xuICAgICAgICAgICAgcGFydGljbGUuY29sb3Iuc2V0KHBhcnRpY2xlLnN0YXJ0Q29sb3IpO1xuXG4gICAgICAgICAgICAvLyBhcHBseSBzdGFydExpZmV0aW1lLlxuICAgICAgICAgICAgcGFydGljbGUuc3RhcnRMaWZldGltZSA9IHRoaXMuc3RhcnRMaWZldGltZS5ldmFsdWF0ZSh0aGlzLl90aW1lIC8gdGhpcy5kdXJhdGlvbiwgcmFuZCkgKyBkdDtcbiAgICAgICAgICAgIHBhcnRpY2xlLnJlbWFpbmluZ0xpZmV0aW1lID0gcGFydGljbGUuc3RhcnRMaWZldGltZTtcblxuICAgICAgICAgICAgcGFydGljbGUucmFuZG9tU2VlZCA9IHJhbmRvbVJhbmdlSW50KDAsIDIzMzI4MCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fc2V0TmV3UGFydGljbGUocGFydGljbGUpO1xuXG4gICAgICAgIH0gLy8gZW5kIG9mIHBhcnRpY2xlcyBmb3JMb29wLlxuICAgIH1cblxuICAgIC8vIGluaXRpYWxpemUgcGFydGljbGUgc3lzdGVtIGFzIHRob3VnaCBpdCBoYWQgYWxyZWFkeSBjb21wbGV0ZWQgYSBmdWxsIGN5Y2xlLlxuICAgIF9wcmV3YXJtU3lzdGVtICgpIHtcbiAgICAgICAgdGhpcy5zdGFydERlbGF5Lm1vZGUgPSBNb2RlLkNvbnN0YW50OyAvLyBjbGVhciBzdGFydERlbGF5LlxuICAgICAgICB0aGlzLnN0YXJ0RGVsYXkuY29uc3RhbnQgPSAwO1xuICAgICAgICBjb25zdCBkdCA9IDEuMDsgLy8gc2hvdWxkIHVzZSB2YXJ5aW5nIHZhbHVlP1xuICAgICAgICBjb25zdCBjbnQgPSB0aGlzLmR1cmF0aW9uIC8gZHQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY250OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgKz0gZHQ7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KGR0KTtcbiAgICAgICAgICAgIHRoaXMuX2Fzc2VtYmxlci5fdXBkYXRlUGFydGljbGVzKGR0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGludGVybmFsIGZ1bmN0aW9uXG4gICAgX2VtaXQgKGR0KSB7XG4gICAgICAgIC8vIGVtaXQgcGFydGljbGVzLlxuICAgICAgICBjb25zdCBzdGFydERlbGF5ID0gdGhpcy5zdGFydERlbGF5LmV2YWx1YXRlKDAsIDEpO1xuICAgICAgICBpZiAodGhpcy5fdGltZSA+IHN0YXJ0RGVsYXkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl90aW1lID4gKHRoaXMuZHVyYXRpb24gKyBzdGFydERlbGF5KSkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3RpbWUgPSBzdGFydERlbGF5OyAvLyBkZWxheSB3aWxsIG5vdCBiZSBhcHBsaWVkIGZyb20gdGhlIHNlY29uZCBsb29wLihVbml0eSlcbiAgICAgICAgICAgICAgICAvLyB0aGlzLl9lbWl0UmF0ZVRpbWVDb3VudGVyID0gMC4wO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyID0gMC4wO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRW1pdHRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZW1pdCBieSByYXRlT3ZlclRpbWVcbiAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgKz0gdGhpcy5yYXRlT3ZlclRpbWUuZXZhbHVhdGUodGhpcy5fdGltZSAvIHRoaXMuZHVyYXRpb24sIDEpICogZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fZW1pdFJhdGVUaW1lQ291bnRlciA+IDEgJiYgdGhpcy5faXNFbWl0dGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtaXROdW0gPSBNYXRoLmZsb29yKHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlVGltZUNvdW50ZXIgLT0gZW1pdE51bTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoZW1pdE51bSwgZHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZW1pdCBieSByYXRlT3ZlckRpc3RhbmNlXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0V29ybGRQb3NpdGlvbih0aGlzLl9jdXJXUG9zKTtcbiAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gVmVjMy5kaXN0YW5jZSh0aGlzLl9jdXJXUG9zLCB0aGlzLl9vbGRXUG9zKTtcbiAgICAgICAgICAgIFZlYzMuY29weSh0aGlzLl9vbGRXUG9zLCB0aGlzLl9jdXJXUG9zKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyICs9IGRpc3RhbmNlICogdGhpcy5yYXRlT3ZlckRpc3RhbmNlLmV2YWx1YXRlKHRoaXMuX3RpbWUgLyB0aGlzLmR1cmF0aW9uLCAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbWl0UmF0ZURpc3RhbmNlQ291bnRlciA+IDEgJiYgdGhpcy5faXNFbWl0dGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtaXROdW0gPSBNYXRoLmZsb29yKHRoaXMuX2VtaXRSYXRlRGlzdGFuY2VDb3VudGVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0UmF0ZURpc3RhbmNlQ291bnRlciAtPSBlbWl0TnVtO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChlbWl0TnVtLCBkdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGJ1cnN0c1xuICAgICAgICAgICAgZm9yIChjb25zdCBidXJzdCBvZiB0aGlzLmJ1cnN0cykge1xuICAgICAgICAgICAgICAgIGJ1cnN0LnVwZGF0ZSh0aGlzLCBkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYWN0aXZhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIFxuICAgIH1cblxuICAgIF9yZXNldFBvc2l0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldFdvcmxkUG9zaXRpb24odGhpcy5fb2xkV1Bvcyk7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9jdXJXUG9zLCB0aGlzLl9vbGRXUG9zKTtcbiAgICB9XG5cbiAgICBhZGRTdWJFbWl0dGVyIChzdWJFbWl0dGVyKSB7XG4gICAgICAgIHRoaXMuX3N1YkVtaXR0ZXJzLnB1c2goc3ViRW1pdHRlcik7XG4gICAgfVxuXG4gICAgcmVtb3ZlU3ViRW1pdHRlciAoaWR4KSB7XG4gICAgICAgIHRoaXMuX3N1YkVtaXR0ZXJzLnNwbGljZSh0aGlzLl9zdWJFbWl0dGVycy5pbmRleE9mKGlkeCksIDEpO1xuICAgIH1cblxuICAgIGFkZEJ1cnN0IChidXJzdCkge1xuICAgICAgICB0aGlzLmJ1cnN0cy5wdXNoKGJ1cnN0KTtcbiAgICB9XG5cbiAgICByZW1vdmVCdXJzdCAoaWR4KSB7XG4gICAgICAgIHRoaXMuYnVyc3RzLnNwbGljZSh0aGlzLmJ1cnN0cy5pbmRleE9mKGlkeCksIDEpO1xuICAgIH1cblxuICAgIF9jaGVja0JhY3RoICgpIHtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0IGlzUGxheWluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG4gICAgfVxuXG4gICAgZ2V0IGlzUGF1c2VkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzUGF1c2VkO1xuICAgIH1cblxuICAgIGdldCBpc1N0b3BwZWQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTdG9wcGVkO1xuICAgIH1cblxuICAgIGdldCBpc0VtaXR0aW5nICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzRW1pdHRpbmc7XG4gICAgfVxuXG4gICAgZ2V0IHRpbWUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgICB9XG59XG5cbkNDX0VESVRPUiAmJiAoUGFydGljbGVTeXN0ZW0zRC5wcm90b3R5cGUuX29uQmVmb3JlU2VyaWFsaXplID0gZnVuY3Rpb24ocHJvcHMpe3JldHVybiBwcm9wcy5maWx0ZXIocCA9PiAhX21vZHVsZV9wcm9wcy5pbmNsdWRlcyhwKSB8fCB0aGlzW3BdLmVuYWJsZSk7fSk7XG5cbmNjLlBhcnRpY2xlU3lzdGVtM0QgPSBQYXJ0aWNsZVN5c3RlbTNEO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=