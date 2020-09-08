
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/CCParticleSystem.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var macro = require('../core/platform/CCMacro');

var ParticleAsset = require('./CCParticleAsset');

var RenderComponent = require('../core/components/CCRenderComponent');

var codec = require('../compression/ZipUtils');

var PNGReader = require('./CCPNGReader');

var tiffReader = require('./CCTIFFReader');

var textureUtil = require('../core/utils/texture-util');

var RenderFlow = require('../core/renderer/render-flow');

var ParticleSimulator = require('./particle-simulator');

var Material = require('../core/assets/material/CCMaterial');

var BlendFunc = require('../core/utils/blend-func');

function getImageFormatByData(imgData) {
  // if it is a png file buffer.
  if (imgData.length > 8 && imgData[0] === 0x89 && imgData[1] === 0x50 && imgData[2] === 0x4E && imgData[3] === 0x47 && imgData[4] === 0x0D && imgData[5] === 0x0A && imgData[6] === 0x1A && imgData[7] === 0x0A) {
    return macro.ImageFormat.PNG;
  } // if it is a tiff file buffer.


  if (imgData.length > 2 && (imgData[0] === 0x49 && imgData[1] === 0x49 || imgData[0] === 0x4d && imgData[1] === 0x4d || imgData[0] === 0xff && imgData[1] === 0xd8)) {
    return macro.ImageFormat.TIFF;
  }

  return macro.ImageFormat.UNKNOWN;
} //


function getParticleComponents(node) {
  var parent = node.parent,
      comp = node.getComponent(cc.ParticleSystem);

  if (!parent || !comp) {
    return node.getComponentsInChildren(cc.ParticleSystem);
  }

  return getParticleComponents(parent);
}
/**
 * !#en Enum for emitter modes
 * !#zh 发射模式
 * @enum ParticleSystem.EmitterMode
 */


var EmitterMode = cc.Enum({
  /**
   * !#en Uses gravity, speed, radial and tangential acceleration.
   * !#zh 重力模式，模拟重力，可让粒子围绕一个中心点移近或移远。
   * @property {Number} GRAVITY
   */
  GRAVITY: 0,

  /**
   * !#en Uses radius movement + rotation.
   * !#zh 半径模式，可以使粒子以圆圈方式旋转，它也可以创造螺旋效果让粒子急速前进或后退。
   * @property {Number} RADIUS - Uses radius movement + rotation.
   */
  RADIUS: 1
});
/**
 * !#en Enum for particles movement type.
 * !#zh 粒子位置类型
 * @enum ParticleSystem.PositionType
 */

var PositionType = cc.Enum({
  /**
   * !#en
   * Living particles are attached to the world and are unaffected by emitter repositioning.
   * !#zh
   * 自由模式，相对于世界坐标，不会随粒子节点移动而移动。（可产生火焰、蒸汽等效果）
   * @property {Number} FREE
   */
  FREE: 0,

  /**
   * !#en
   * In the relative mode, the particle will move with the parent node, but not with the node where the particle is. 
   * For example, the coffee in the cup is steaming. Then the steam moves (forward) with the train, rather than moves with the cup.
   * !#zh
   * 相对模式，粒子会跟随父节点移动，但不跟随粒子所在节点移动，例如在一列行进火车中，杯中的咖啡飘起雾气，
   * 杯子移动，雾气整体并不会随着杯子移动，但从火车整体的角度来看，雾气整体会随着火车移动。
   * @property {Number} RELATIVE
   */
  RELATIVE: 1,

  /**
   * !#en
   * Living particles are attached to the emitter and are translated along with it.
   * !#zh
   * 整组模式，粒子跟随发射器移动。（不会发生拖尾）
   * @property {Number} GROUPED
   */
  GROUPED: 2
});
/**
 * @class ParticleSystem
 */

var properties = {
  /**
   * !#en Play particle in edit mode.
   * !#zh 在编辑器模式下预览粒子，启用后选中粒子时，粒子将自动播放。
   * @property {Boolean} preview
   * @default false
   */
  preview: {
    "default": true,
    editorOnly: true,
    notify: CC_EDITOR && function () {
      this.resetSystem();

      if (!this.preview) {
        this.stopSystem();
        this.disableRender();
      }

      cc.engine.repaintInEditMode();
    },
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.preview'
  },

  /**
   * !#en
   * If set custom to true, then use custom properties insteadof read particle file.
   * !#zh 是否自定义粒子属性。
   * @property {Boolean} custom
   * @default false
   */
  _custom: false,
  custom: {
    get: function get() {
      return this._custom;
    },
    set: function set(value) {
      if (CC_EDITOR && !value && !this._file) {
        return cc.warnID(6000);
      }

      if (this._custom !== value) {
        this._custom = value;

        this._applyFile();

        if (CC_EDITOR) {
          cc.engine.repaintInEditMode();
        }
      }
    },
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.custom'
  },

  /**
   * !#en The plist file.
   * !#zh plist 格式的粒子配置文件。
   * @property {ParticleAsset} file
   * @default null
   */
  _file: {
    "default": null,
    type: ParticleAsset
  },
  file: {
    get: function get() {
      return this._file;
    },
    set: function set(value, force) {
      if (this._file !== value || CC_EDITOR && force) {
        this._file = value;

        if (value) {
          this._applyFile();

          if (CC_EDITOR) {
            cc.engine.repaintInEditMode();
          }
        } else {
          this.custom = true;
        }
      }
    },
    animatable: false,
    type: ParticleAsset,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.file'
  },

  /**
   * !#en SpriteFrame used for particles display
   * !#zh 用于粒子呈现的 SpriteFrame
   * @property spriteFrame
   * @type {SpriteFrame}
   */
  _spriteFrame: {
    "default": null,
    type: cc.SpriteFrame
  },
  spriteFrame: {
    get: function get() {
      return this._spriteFrame;
    },
    set: function set(value, force) {
      var lastSprite = this._renderSpriteFrame;

      if (CC_EDITOR) {
        if (!force && lastSprite === value) {
          return;
        }
      } else {
        if (lastSprite === value) {
          return;
        }
      }

      this._renderSpriteFrame = value;

      if (!value || value._uuid) {
        this._spriteFrame = value;
      }

      if ((lastSprite && lastSprite.getTexture()) !== (value && value.getTexture())) {
        this._applySpriteFrame(lastSprite);
      }

      if (CC_EDITOR) {
        this.node.emit('spriteframe-changed', this);
      }
    },
    type: cc.SpriteFrame,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.spriteFrame'
  },
  // just used to read data from 1.x
  _texture: {
    "default": null,
    type: cc.Texture2D,
    editorOnly: true
  },

  /**
   * !#en Texture of Particle System, readonly, please use spriteFrame to setup new texture。
   * !#zh 粒子贴图，只读属性，请使用 spriteFrame 属性来替换贴图。
   * @property texture
   * @type {String}
   * @readonly
   */
  texture: {
    get: function get() {
      return this._getTexture();
    },
    set: function set(value) {
      if (value) {
        cc.warnID(6017);
      }
    },
    type: cc.Texture2D,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.texture',
    readonly: true,
    visible: false,
    animatable: false
  },

  /**
   * !#en Current quantity of particles that are being simulated.
   * !#zh 当前播放的粒子数量。
   * @property {Number} particleCount
   * @readonly
   */
  particleCount: {
    visible: false,
    get: function get() {
      return this._simulator.particles.length;
    },
    readonly: true
  },

  /**
   * !#en Indicate whether the system simulation have stopped.
   * !#zh 指示粒子播放是否完毕。
   * @property {Boolean} stopped
   */
  _stopped: true,
  stopped: {
    get: function get() {
      return this._stopped;
    },
    animatable: false,
    visible: false
  },

  /**
   * !#en If set to true, the particle system will automatically start playing on onLoad.
   * !#zh 如果设置为 true 运行时会自动发射粒子。
   * @property playOnLoad
   * @type {boolean}
   * @default true
   */
  playOnLoad: true,

  /**
   * !#en Indicate whether the owner node will be auto-removed when it has no particles left.
   * !#zh 粒子播放完毕后自动销毁所在的节点。
   * @property {Boolean} autoRemoveOnFinish
   */
  autoRemoveOnFinish: {
    "default": false,
    animatable: false,
    tooltip: CC_DEV && 'i18n:COMPONENT.particle_system.autoRemoveOnFinish'
  },

  /**
   * !#en Indicate whether the particle system is activated.
   * !#zh 是否激活粒子。
   * @property {Boolean} active
   * @readonly
   */
  active: {
    get: function get() {
      return this._simulator.active;
    },
    visible: false
  },

  /**
   * !#en Maximum particles of the system.
   * !#zh 粒子最大数量。
   * @property {Number} totalParticles
   * @default 150
   */
  totalParticles: 150,

  /**
   * !#en How many seconds the emitter wil run. -1 means 'forever'.
   * !#zh 发射器生存时间，单位秒，-1表示持续发射。
   * @property {Number} duration
   * @default ParticleSystem.DURATION_INFINITY
   */
  duration: -1,

  /**
   * !#en Emission rate of the particles.
   * !#zh 每秒发射的粒子数目。
   * @property {Number} emissionRate
   * @default 10
   */
  emissionRate: 10,

  /**
   * !#en Life of each particle setter.
   * !#zh 粒子的运行时间。
   * @property {Number} life
   * @default 1
   */
  life: 1,

  /**
   * !#en Variation of life.
   * !#zh 粒子的运行时间变化范围。
   * @property {Number} lifeVar
   * @default 0
   */
  lifeVar: 0,

  /**
   * !#en Start color of each particle.
   * !#zh 粒子初始颜色。
   * @property {cc.Color} startColor
   * @default {r: 255, g: 255, b: 255, a: 255}
   */
  _startColor: null,
  startColor: {
    type: cc.Color,
    get: function get() {
      return this._startColor;
    },
    set: function set(val) {
      this._startColor.r = val.r;
      this._startColor.g = val.g;
      this._startColor.b = val.b;
      this._startColor.a = val.a;
    }
  },

  /**
   * !#en Variation of the start color.
   * !#zh 粒子初始颜色变化范围。
   * @property {cc.Color} startColorVar
   * @default {r: 0, g: 0, b: 0, a: 0}
   */
  _startColorVar: null,
  startColorVar: {
    type: cc.Color,
    get: function get() {
      return this._startColorVar;
    },
    set: function set(val) {
      this._startColorVar.r = val.r;
      this._startColorVar.g = val.g;
      this._startColorVar.b = val.b;
      this._startColorVar.a = val.a;
    }
  },

  /**
   * !#en Ending color of each particle.
   * !#zh 粒子结束颜色。
   * @property {cc.Color} endColor
   * @default {r: 255, g: 255, b: 255, a: 0}
   */
  _endColor: null,
  endColor: {
    type: cc.Color,
    get: function get() {
      return this._endColor;
    },
    set: function set(val) {
      this._endColor.r = val.r;
      this._endColor.g = val.g;
      this._endColor.b = val.b;
      this._endColor.a = val.a;
    }
  },

  /**
   * !#en Variation of the end color.
   * !#zh 粒子结束颜色变化范围。
   * @property {cc.Color} endColorVar
   * @default {r: 0, g: 0, b: 0, a: 0}
   */
  _endColorVar: null,
  endColorVar: {
    type: cc.Color,
    get: function get() {
      return this._endColorVar;
    },
    set: function set(val) {
      this._endColorVar.r = val.r;
      this._endColorVar.g = val.g;
      this._endColorVar.b = val.b;
      this._endColorVar.a = val.a;
    }
  },

  /**
   * !#en Angle of each particle setter.
   * !#zh 粒子角度。
   * @property {Number} angle
   * @default 90
   */
  angle: 90,

  /**
   * !#en Variation of angle of each particle setter.
   * !#zh 粒子角度变化范围。
   * @property {Number} angleVar
   * @default 20
   */
  angleVar: 20,

  /**
   * !#en Start size in pixels of each particle.
   * !#zh 粒子的初始大小。
   * @property {Number} startSize
   * @default 50
   */
  startSize: 50,

  /**
   * !#en Variation of start size in pixels.
   * !#zh 粒子初始大小的变化范围。
   * @property {Number} startSizeVar
   * @default 0
   */
  startSizeVar: 0,

  /**
   * !#en End size in pixels of each particle.
   * !#zh 粒子结束时的大小。
   * @property {Number} endSize
   * @default 0
   */
  endSize: 0,

  /**
   * !#en Variation of end size in pixels.
   * !#zh 粒子结束大小的变化范围。
   * @property {Number} endSizeVar
   * @default 0
   */
  endSizeVar: 0,

  /**
   * !#en Start angle of each particle.
   * !#zh 粒子开始自旋角度。
   * @property {Number} startSpin
   * @default 0
   */
  startSpin: 0,

  /**
   * !#en Variation of start angle.
   * !#zh 粒子开始自旋角度变化范围。
   * @property {Number} startSpinVar
   * @default 0
   */
  startSpinVar: 0,

  /**
   * !#en End angle of each particle.
   * !#zh 粒子结束自旋角度。
   * @property {Number} endSpin
   * @default 0
   */
  endSpin: 0,

  /**
   * !#en Variation of end angle.
   * !#zh 粒子结束自旋角度变化范围。
   * @property {Number} endSpinVar
   * @default 0
   */
  endSpinVar: 0,

  /**
   * !#en Source position of the emitter.
   * !#zh 发射器位置。
   * @property {Vec2} sourcePos
   * @default cc.Vec2.ZERO
   */
  sourcePos: cc.Vec2.ZERO,

  /**
   * !#en Variation of source position.
   * !#zh 发射器位置的变化范围。（横向和纵向）
   * @property {Vec2} posVar
   * @default cc.Vec2.ZERO
   */
  posVar: cc.Vec2.ZERO,

  /**
   * !#en Particles movement type.
   * !#zh 粒子位置类型。
   * @property {ParticleSystem.PositionType} positionType
   * @default ParticleSystem.PositionType.FREE
   */
  _positionType: {
    "default": PositionType.FREE,
    formerlySerializedAs: "positionType"
  },
  positionType: {
    type: PositionType,
    get: function get() {
      return this._positionType;
    },
    set: function set(val) {
      this._positionType = val;

      this._updateMaterial();
    }
  },

  /**
   * !#en Particles emitter modes.
   * !#zh 发射器类型。
   * @property {ParticleSystem.EmitterMode} emitterMode
   * @default ParticleSystem.EmitterMode.GRAVITY
   */
  emitterMode: {
    "default": EmitterMode.GRAVITY,
    type: EmitterMode
  },
  // GRAVITY MODE

  /**
   * !#en Gravity of the emitter.
   * !#zh 重力。
   * @property {Vec2} gravity
   * @default cc.Vec2.ZERO
   */
  gravity: cc.Vec2.ZERO,

  /**
   * !#en Speed of the emitter.
   * !#zh 速度。
   * @property {Number} speed
   * @default 180
   */
  speed: 180,

  /**
   * !#en Variation of the speed.
   * !#zh 速度变化范围。
   * @property {Number} speedVar
   * @default 50
   */
  speedVar: 50,

  /**
   * !#en Tangential acceleration of each particle. Only available in 'Gravity' mode.
   * !#zh 每个粒子的切向加速度，即垂直于重力方向的加速度，只有在重力模式下可用。
   * @property {Number} tangentialAccel
   * @default 80
   */
  tangentialAccel: 80,

  /**
   * !#en Variation of the tangential acceleration.
   * !#zh 每个粒子的切向加速度变化范围。
   * @property {Number} tangentialAccelVar
   * @default 0
   */
  tangentialAccelVar: 0,

  /**
   * !#en Acceleration of each particle. Only available in 'Gravity' mode.
   * !#zh 粒子径向加速度，即平行于重力方向的加速度，只有在重力模式下可用。
   * @property {Number} radialAccel
   * @default 0
   */
  radialAccel: 0,

  /**
   * !#en Variation of the radial acceleration.
   * !#zh 粒子径向加速度变化范围。
   * @property {Number} radialAccelVar
   * @default 0
   */
  radialAccelVar: 0,

  /**
   * !#en Indicate whether the rotation of each particle equals to its direction. Only available in 'Gravity' mode.
   * !#zh 每个粒子的旋转是否等于其方向，只有在重力模式下可用。
   * @property {Boolean} rotationIsDir
   * @default false
   */
  rotationIsDir: false,
  // RADIUS MODE

  /**
   * !#en Starting radius of the particles. Only available in 'Radius' mode.
   * !#zh 初始半径，表示粒子出生时相对发射器的距离，只有在半径模式下可用。
   * @property {Number} startRadius
   * @default 0
   */
  startRadius: 0,

  /**
   * !#en Variation of the starting radius.
   * !#zh 初始半径变化范围。
   * @property {Number} startRadiusVar
   * @default 0
   */
  startRadiusVar: 0,

  /**
   * !#en Ending radius of the particles. Only available in 'Radius' mode.
   * !#zh 结束半径，只有在半径模式下可用。
   * @property {Number} endRadius
   * @default 0
   */
  endRadius: 0,

  /**
   * !#en Variation of the ending radius.
   * !#zh 结束半径变化范围。
   * @property {Number} endRadiusVar
   * @default 0
   */
  endRadiusVar: 0,

  /**
   * !#en Number of degress to rotate a particle around the source pos per second. Only available in 'Radius' mode.
   * !#zh 粒子每秒围绕起始点的旋转角度，只有在半径模式下可用。
   * @property {Number} rotatePerS
   * @default 0
   */
  rotatePerS: 0,

  /**
   * !#en Variation of the degress to rotate a particle around the source pos per second.
   * !#zh 粒子每秒围绕起始点的旋转角度变化范围。
   * @property {Number} rotatePerSVar
   * @default 0
   */
  rotatePerSVar: 0
};
/**
 * Particle System base class. <br/>
 * Attributes of a Particle System:<br/>
 *  - emmision rate of the particles<br/>
 *  - Gravity Mode (Mode A): <br/>
 *  - gravity <br/>
 *  - direction <br/>
 *  - speed +-  variance <br/>
 *  - tangential acceleration +- variance<br/>
 *  - radial acceleration +- variance<br/>
 *  - Radius Mode (Mode B):      <br/>
 *  - startRadius +- variance    <br/>
 *  - endRadius +- variance      <br/>
 *  - rotate +- variance         <br/>
 *  - Properties common to all modes: <br/>
 *  - life +- life variance      <br/>
 *  - start spin +- variance     <br/>
 *  - end spin +- variance       <br/>
 *  - start size +- variance     <br/>
 *  - end size +- variance       <br/>
 *  - start color +- variance    <br/>
 *  - end color +- variance      <br/>
 *  - life +- variance           <br/>
 *  - blending function          <br/>
 *  - texture                    <br/>
 * <br/>
 * cocos2d also supports particles generated by Particle Designer (http://particledesigner.71squared.com/).<br/>
 * 'Radius Mode' in Particle Designer uses a fixed emit rate of 30 hz. Since that can't be guarateed in cocos2d,  <br/>
 * cocos2d uses a another approach, but the results are almost identical.<br/>
 * cocos2d supports all the variables used by Particle Designer plus a bit more:  <br/>
 *  - spinning particles (supported when using ParticleSystem)       <br/>
 *  - tangential acceleration (Gravity mode)                               <br/>
 *  - radial acceleration (Gravity mode)                                   <br/>
 *  - radius direction (Radius mode) (Particle Designer supports outwards to inwards direction only) <br/>
 * It is possible to customize any of the above mentioned properties in runtime. Example:   <br/>
 *
 * @example
 * emitter.radialAccel = 15;
 * emitter.startSpin = 0;
 *
 * @class ParticleSystem
 * @extends RenderComponent
 * @uses BlendFunc
 */

var ParticleSystem = cc.Class({
  name: 'cc.ParticleSystem',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/ParticleSystem',
    inspector: 'packages://inspector/inspectors/comps/particle-system.js',
    playOnFocus: true,
    executeInEditMode: true
  },
  ctor: function ctor() {
    this.initProperties();
  },
  initProperties: function initProperties() {
    this._previewTimer = null;
    this._focused = false;
    this._aspectRatio = 1;
    this._simulator = new ParticleSimulator(this); // colors

    this._startColor = cc.color(255, 255, 255, 255);
    this._startColorVar = cc.color(0, 0, 0, 0);
    this._endColor = cc.color(255, 255, 255, 0);
    this._endColorVar = cc.color(0, 0, 0, 0); // The temporary SpriteFrame object used for the renderer. Because there is no corresponding asset, it can't be serialized.

    this._renderSpriteFrame = null;
  },
  properties: properties,
  statics: {
    /**
     * !#en The Particle emitter lives forever.
     * !#zh 表示发射器永久存在
     * @property {Number} DURATION_INFINITY
     * @default -1
     * @static
     * @readonly
     */
    DURATION_INFINITY: -1,

    /**
     * !#en The starting size of the particle is equal to the ending size.
     * !#zh 表示粒子的起始大小等于结束大小。
     * @property {Number} START_SIZE_EQUAL_TO_END_SIZE
     * @default -1
     * @static
     * @readonly
     */
    START_SIZE_EQUAL_TO_END_SIZE: -1,

    /**
     * !#en The starting radius of the particle is equal to the ending radius.
     * !#zh 表示粒子的起始半径等于结束半径。
     * @property {Number} START_RADIUS_EQUAL_TO_END_RADIUS
     * @default -1
     * @static
     * @readonly
     */
    START_RADIUS_EQUAL_TO_END_RADIUS: -1,
    EmitterMode: EmitterMode,
    PositionType: PositionType,
    _PNGReader: PNGReader,
    _TIFFReader: tiffReader
  },
  // EDITOR RELATED METHODS
  onFocusInEditor: CC_EDITOR && function () {
    this._focused = true;
    var components = getParticleComponents(this.node);

    for (var i = 0; i < components.length; ++i) {
      components[i]._startPreview();
    }
  },
  onLostFocusInEditor: CC_EDITOR && function () {
    this._focused = false;
    var components = getParticleComponents(this.node);

    for (var i = 0; i < components.length; ++i) {
      components[i]._stopPreview();
    }
  },
  _startPreview: CC_EDITOR && function () {
    if (this.preview) {
      this.resetSystem();
    }
  },
  _stopPreview: CC_EDITOR && function () {
    if (this.preview) {
      this.resetSystem();
      this.stopSystem();
      this.disableRender();
      cc.engine.repaintInEditMode();
    }

    if (this._previewTimer) {
      clearInterval(this._previewTimer);
    }
  },
  // LIFE-CYCLE METHODS
  // just used to read data from 1.x
  _convertTextureToSpriteFrame: CC_EDITOR && function () {
    if (this._spriteFrame) {
      return;
    }

    var texture = this.texture;

    if (!texture || !texture._uuid) {
      return;
    }

    var _this = this;

    Editor.assetdb.queryMetaInfoByUuid(texture._uuid, function (err, metaInfo) {
      if (err) return Editor.error(err);
      var meta = JSON.parse(metaInfo.json);

      if (meta.type === 'raw') {
        var NodeUtils = Editor.require('app://editor/page/scene-utils/utils/node');

        var nodePath = NodeUtils.getNodePath(_this.node);
        return Editor.warn("The texture " + metaInfo.assetUrl + " used by particle " + nodePath + " does not contain any SpriteFrame, please set the texture type to Sprite and reassign the SpriteFrame to the particle component.");
      } else {
        var Url = require('fire-url');

        var name = Url.basenameNoExt(metaInfo.assetPath);
        var uuid = meta.subMetas[name].uuid;
        cc.assetManager.loadAny(uuid, function (err, sp) {
          if (err) return Editor.error(err);
          _this.spriteFrame = sp;
        });
      }
    });
  },
  __preload: function __preload() {
    this._super();

    if (CC_EDITOR) {
      this._convertTextureToSpriteFrame();
    }

    if (this._custom && this.spriteFrame && !this._renderSpriteFrame) {
      this._applySpriteFrame(this.spriteFrame);
    } else if (this._file) {
      if (this._custom) {
        var missCustomTexture = !this._getTexture();

        if (missCustomTexture) {
          this._applyFile();
        }
      } else {
        this._applyFile();
      }
    } // auto play


    if (!CC_EDITOR || cc.engine.isPlaying) {
      if (this.playOnLoad) {
        this.resetSystem();
      }
    } // Upgrade color type from v2.0.0


    if (CC_EDITOR && !(this._startColor instanceof cc.Color)) {
      this._startColor = cc.color(this._startColor);
      this._startColorVar = cc.color(this._startColorVar);
      this._endColor = cc.color(this._endColor);
      this._endColorVar = cc.color(this._endColorVar);
    }
  },
  onDestroy: function onDestroy() {
    if (this.autoRemoveOnFinish) {
      this.autoRemoveOnFinish = false; // already removed
    }

    if (this._buffer) {
      this._buffer.destroy();

      this._buffer = null;
    } // reset uv data so next time simulator will refill buffer uv info when exit edit mode from prefab.


    this._simulator._uvFilled = 0;

    this._super();
  },
  lateUpdate: function lateUpdate(dt) {
    if (!this._simulator.finished) {
      this._simulator.step(dt);
    }
  },
  // APIS

  /*
   * !#en Add a particle to the emitter.
   * !#zh 添加一个粒子到发射器中。
   * @method addParticle
   * @return {Boolean}
   */
  addParticle: function addParticle() {// Not implemented
  },

  /**
   * !#en Stop emitting particles. Running particles will continue to run until they die.
   * !#zh 停止发射器发射粒子，发射出去的粒子将继续运行，直至粒子生命结束。
   * @method stopSystem
   * @example
   * // stop particle system.
   * myParticleSystem.stopSystem();
   */
  stopSystem: function stopSystem() {
    this._stopped = true;

    this._simulator.stop();
  },

  /**
   * !#en Kill all living particles.
   * !#zh 杀死所有存在的粒子，然后重新启动粒子发射器。
   * @method resetSystem
   * @example
   * // play particle system.
   * myParticleSystem.resetSystem();
   */
  resetSystem: function resetSystem() {
    this._stopped = false;

    this._simulator.reset();

    this.markForRender(true);
  },

  /**
   * !#en Whether or not the system is full.
   * !#zh 发射器中粒子是否大于等于设置的总粒子数量。
   * @method isFull
   * @return {Boolean}
   */
  isFull: function isFull() {
    return this.particleCount >= this.totalParticles;
  },

  /**
   * !#en Sets a new texture with a rect. The rect is in texture position and size.
   * Please use spriteFrame property instead, this function is deprecated since v1.9
   * !#zh 设置一张新贴图和关联的矩形。
   * 请直接设置 spriteFrame 属性，这个函数从 v1.9 版本开始已经被废弃
   * @method setTextureWithRect
   * @param {Texture2D} texture
   * @param {Rect} rect
   * @deprecated since v1.9
   */
  setTextureWithRect: function setTextureWithRect(texture, rect) {
    if (texture instanceof cc.Texture2D) {
      this.spriteFrame = new cc.SpriteFrame(texture, rect);
    }
  },
  // PRIVATE METHODS
  _applyFile: function _applyFile() {
    var file = this._file;

    if (file) {
      var self = this;
      cc.assetManager.postLoadNative(file, function (err) {
        if (err || !file._nativeAsset) {
          cc.errorID(6029);
          return;
        }

        if (!self.isValid) {
          return;
        }

        self._plistFile = file.nativeUrl;

        if (!self._custom) {
          self._initWithDictionary(file._nativeAsset);
        }

        if (!self._spriteFrame) {
          if (file.spriteFrame) {
            self.spriteFrame = file.spriteFrame;
          } else if (self._custom) {
            self._initTextureWithDictionary(file._nativeAsset);
          }
        } else if (!self._renderSpriteFrame && self._spriteFrame) {
          self._applySpriteFrame(self.spriteFrame);
        }
      });
    }
  },
  _initTextureWithDictionary: function _initTextureWithDictionary(dict) {
    var imgPath = cc.path.changeBasename(this._plistFile, dict["textureFileName"] || ''); // texture

    if (dict["textureFileName"]) {
      // Try to get the texture from the cache
      textureUtil.loadImage(imgPath, function (error, texture) {
        if (error) {
          dict["textureFileName"] = undefined;

          this._initTextureWithDictionary(dict);
        } else {
          cc.assetManager.assets.add(imgPath, texture);
          this.spriteFrame = new cc.SpriteFrame(texture);
        }
      }, this);
    } else if (dict["textureImageData"]) {
      var textureData = dict["textureImageData"];

      if (textureData && textureData.length > 0) {
        var tex = cc.assetManager.assets.get(imgPath);

        if (!tex) {
          var buffer = codec.unzipBase64AsArray(textureData, 1);

          if (!buffer) {
            cc.logID(6030);
            return false;
          }

          var imageFormat = getImageFormatByData(buffer);

          if (imageFormat !== macro.ImageFormat.TIFF && imageFormat !== macro.ImageFormat.PNG) {
            cc.logID(6031);
            return false;
          }

          var canvasObj = document.createElement("canvas");

          if (imageFormat === macro.ImageFormat.PNG) {
            var myPngObj = new PNGReader(buffer);
            myPngObj.render(canvasObj);
          } else {
            tiffReader.parseTIFF(buffer, canvasObj);
          }

          tex = textureUtil.cacheImage(imgPath, canvasObj);
        }

        if (!tex) cc.logID(6032); // TODO: Use cc.assetManager to load asynchronously the SpriteFrame object, avoid using textureUtil

        this.spriteFrame = new cc.SpriteFrame(tex);
      } else {
        return false;
      }
    }

    return true;
  },
  // parsing process
  _initWithDictionary: function _initWithDictionary(dict) {
    this.totalParticles = parseInt(dict["maxParticles"] || 0); // life span

    this.life = parseFloat(dict["particleLifespan"] || 0);
    this.lifeVar = parseFloat(dict["particleLifespanVariance"] || 0); // emission Rate

    var _tempEmissionRate = dict["emissionRate"];

    if (_tempEmissionRate) {
      this.emissionRate = _tempEmissionRate;
    } else {
      this.emissionRate = Math.min(this.totalParticles / this.life, Number.MAX_VALUE);
    } // duration


    this.duration = parseFloat(dict["duration"] || 0); // blend function

    this.srcBlendFactor = parseInt(dict["blendFuncSource"] || macro.SRC_ALPHA);
    this.dstBlendFactor = parseInt(dict["blendFuncDestination"] || macro.ONE_MINUS_SRC_ALPHA); // color

    var locStartColor = this._startColor;
    locStartColor.r = parseFloat(dict["startColorRed"] || 0) * 255;
    locStartColor.g = parseFloat(dict["startColorGreen"] || 0) * 255;
    locStartColor.b = parseFloat(dict["startColorBlue"] || 0) * 255;
    locStartColor.a = parseFloat(dict["startColorAlpha"] || 0) * 255;
    var locStartColorVar = this._startColorVar;
    locStartColorVar.r = parseFloat(dict["startColorVarianceRed"] || 0) * 255;
    locStartColorVar.g = parseFloat(dict["startColorVarianceGreen"] || 0) * 255;
    locStartColorVar.b = parseFloat(dict["startColorVarianceBlue"] || 0) * 255;
    locStartColorVar.a = parseFloat(dict["startColorVarianceAlpha"] || 0) * 255;
    var locEndColor = this._endColor;
    locEndColor.r = parseFloat(dict["finishColorRed"] || 0) * 255;
    locEndColor.g = parseFloat(dict["finishColorGreen"] || 0) * 255;
    locEndColor.b = parseFloat(dict["finishColorBlue"] || 0) * 255;
    locEndColor.a = parseFloat(dict["finishColorAlpha"] || 0) * 255;
    var locEndColorVar = this._endColorVar;
    locEndColorVar.r = parseFloat(dict["finishColorVarianceRed"] || 0) * 255;
    locEndColorVar.g = parseFloat(dict["finishColorVarianceGreen"] || 0) * 255;
    locEndColorVar.b = parseFloat(dict["finishColorVarianceBlue"] || 0) * 255;
    locEndColorVar.a = parseFloat(dict["finishColorVarianceAlpha"] || 0) * 255; // particle size

    this.startSize = parseFloat(dict["startParticleSize"] || 0);
    this.startSizeVar = parseFloat(dict["startParticleSizeVariance"] || 0);
    this.endSize = parseFloat(dict["finishParticleSize"] || 0);
    this.endSizeVar = parseFloat(dict["finishParticleSizeVariance"] || 0); // position
    // Make empty positionType value and old version compatible

    this.positionType = parseFloat(dict['positionType'] !== undefined ? dict['positionType'] : PositionType.RELATIVE); // for 

    this.sourcePos.x = 0;
    this.sourcePos.y = 0;
    this.posVar.x = parseFloat(dict["sourcePositionVariancex"] || 0);
    this.posVar.y = parseFloat(dict["sourcePositionVariancey"] || 0); // angle

    this.angle = parseFloat(dict["angle"] || 0);
    this.angleVar = parseFloat(dict["angleVariance"] || 0); // Spinning

    this.startSpin = parseFloat(dict["rotationStart"] || 0);
    this.startSpinVar = parseFloat(dict["rotationStartVariance"] || 0);
    this.endSpin = parseFloat(dict["rotationEnd"] || 0);
    this.endSpinVar = parseFloat(dict["rotationEndVariance"] || 0);
    this.emitterMode = parseInt(dict["emitterType"] || EmitterMode.GRAVITY); // Mode A: Gravity + tangential accel + radial accel

    if (this.emitterMode === EmitterMode.GRAVITY) {
      // gravity
      this.gravity.x = parseFloat(dict["gravityx"] || 0);
      this.gravity.y = parseFloat(dict["gravityy"] || 0); // speed

      this.speed = parseFloat(dict["speed"] || 0);
      this.speedVar = parseFloat(dict["speedVariance"] || 0); // radial acceleration

      this.radialAccel = parseFloat(dict["radialAcceleration"] || 0);
      this.radialAccelVar = parseFloat(dict["radialAccelVariance"] || 0); // tangential acceleration

      this.tangentialAccel = parseFloat(dict["tangentialAcceleration"] || 0);
      this.tangentialAccelVar = parseFloat(dict["tangentialAccelVariance"] || 0); // rotation is dir

      var locRotationIsDir = dict["rotationIsDir"] || "";

      if (locRotationIsDir !== null) {
        locRotationIsDir = locRotationIsDir.toString().toLowerCase();
        this.rotationIsDir = locRotationIsDir === "true" || locRotationIsDir === "1";
      } else {
        this.rotationIsDir = false;
      }
    } else if (this.emitterMode === EmitterMode.RADIUS) {
      // or Mode B: radius movement
      this.startRadius = parseFloat(dict["maxRadius"] || 0);
      this.startRadiusVar = parseFloat(dict["maxRadiusVariance"] || 0);
      this.endRadius = parseFloat(dict["minRadius"] || 0);
      this.endRadiusVar = parseFloat(dict["minRadiusVariance"] || 0);
      this.rotatePerS = parseFloat(dict["rotatePerSecond"] || 0);
      this.rotatePerSVar = parseFloat(dict["rotatePerSecondVariance"] || 0);
    } else {
      cc.warnID(6009);
      return false;
    }

    this._initTextureWithDictionary(dict);

    return true;
  },
  _validateRender: function _validateRender() {
    var texture = this._getTexture();

    if (!texture || !texture.loaded) {
      this.disableRender();
      return;
    }

    this._super();
  },
  _onTextureLoaded: function _onTextureLoaded() {
    this._simulator.updateUVs(true);

    this._syncAspect();

    this._updateMaterial();

    this.markForRender(true);
  },
  _syncAspect: function _syncAspect() {
    var frameRect = this._renderSpriteFrame._rect;
    this._aspectRatio = frameRect.width / frameRect.height;
  },
  _applySpriteFrame: function _applySpriteFrame() {
    this._renderSpriteFrame = this._renderSpriteFrame || this._spriteFrame;

    if (this._renderSpriteFrame) {
      if (this._renderSpriteFrame.textureLoaded()) {
        this._onTextureLoaded();
      } else {
        this._renderSpriteFrame.onTextureLoaded(this._onTextureLoaded, this);
      }
    }
  },
  _getTexture: function _getTexture() {
    return this._renderSpriteFrame && this._renderSpriteFrame.getTexture() || this._texture;
  },
  _updateMaterial: function _updateMaterial() {
    var material = this.getMaterial(0);
    if (!material) return;
    material.define('CC_USE_MODEL', this._positionType !== PositionType.FREE);
    material.setProperty('texture', this._getTexture());

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _finishedSimulation: function _finishedSimulation() {
    if (CC_EDITOR) {
      if (this.preview && this._focused && !this.active && !cc.engine.isPlaying) {
        this.resetSystem();
      }

      return;
    }

    this.resetSystem();
    this.stopSystem();
    this.disableRender();

    if (this.autoRemoveOnFinish && this._stopped) {
      this.node.destroy();
    }
  }
});
cc.ParticleSystem = module.exports = ParticleSystem;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9wYXJ0aWNsZS9DQ1BhcnRpY2xlU3lzdGVtLmpzIl0sIm5hbWVzIjpbIm1hY3JvIiwicmVxdWlyZSIsIlBhcnRpY2xlQXNzZXQiLCJSZW5kZXJDb21wb25lbnQiLCJjb2RlYyIsIlBOR1JlYWRlciIsInRpZmZSZWFkZXIiLCJ0ZXh0dXJlVXRpbCIsIlJlbmRlckZsb3ciLCJQYXJ0aWNsZVNpbXVsYXRvciIsIk1hdGVyaWFsIiwiQmxlbmRGdW5jIiwiZ2V0SW1hZ2VGb3JtYXRCeURhdGEiLCJpbWdEYXRhIiwibGVuZ3RoIiwiSW1hZ2VGb3JtYXQiLCJQTkciLCJUSUZGIiwiVU5LTk9XTiIsImdldFBhcnRpY2xlQ29tcG9uZW50cyIsIm5vZGUiLCJwYXJlbnQiLCJjb21wIiwiZ2V0Q29tcG9uZW50IiwiY2MiLCJQYXJ0aWNsZVN5c3RlbSIsImdldENvbXBvbmVudHNJbkNoaWxkcmVuIiwiRW1pdHRlck1vZGUiLCJFbnVtIiwiR1JBVklUWSIsIlJBRElVUyIsIlBvc2l0aW9uVHlwZSIsIkZSRUUiLCJSRUxBVElWRSIsIkdST1VQRUQiLCJwcm9wZXJ0aWVzIiwicHJldmlldyIsImVkaXRvck9ubHkiLCJub3RpZnkiLCJDQ19FRElUT1IiLCJyZXNldFN5c3RlbSIsInN0b3BTeXN0ZW0iLCJkaXNhYmxlUmVuZGVyIiwiZW5naW5lIiwicmVwYWludEluRWRpdE1vZGUiLCJhbmltYXRhYmxlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9jdXN0b20iLCJjdXN0b20iLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9maWxlIiwid2FybklEIiwiX2FwcGx5RmlsZSIsInR5cGUiLCJmaWxlIiwiZm9yY2UiLCJfc3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsInNwcml0ZUZyYW1lIiwibGFzdFNwcml0ZSIsIl9yZW5kZXJTcHJpdGVGcmFtZSIsIl91dWlkIiwiZ2V0VGV4dHVyZSIsIl9hcHBseVNwcml0ZUZyYW1lIiwiZW1pdCIsIl90ZXh0dXJlIiwiVGV4dHVyZTJEIiwidGV4dHVyZSIsIl9nZXRUZXh0dXJlIiwicmVhZG9ubHkiLCJ2aXNpYmxlIiwicGFydGljbGVDb3VudCIsIl9zaW11bGF0b3IiLCJwYXJ0aWNsZXMiLCJfc3RvcHBlZCIsInN0b3BwZWQiLCJwbGF5T25Mb2FkIiwiYXV0b1JlbW92ZU9uRmluaXNoIiwiYWN0aXZlIiwidG90YWxQYXJ0aWNsZXMiLCJkdXJhdGlvbiIsImVtaXNzaW9uUmF0ZSIsImxpZmUiLCJsaWZlVmFyIiwiX3N0YXJ0Q29sb3IiLCJzdGFydENvbG9yIiwiQ29sb3IiLCJ2YWwiLCJyIiwiZyIsImIiLCJhIiwiX3N0YXJ0Q29sb3JWYXIiLCJzdGFydENvbG9yVmFyIiwiX2VuZENvbG9yIiwiZW5kQ29sb3IiLCJfZW5kQ29sb3JWYXIiLCJlbmRDb2xvclZhciIsImFuZ2xlIiwiYW5nbGVWYXIiLCJzdGFydFNpemUiLCJzdGFydFNpemVWYXIiLCJlbmRTaXplIiwiZW5kU2l6ZVZhciIsInN0YXJ0U3BpbiIsInN0YXJ0U3BpblZhciIsImVuZFNwaW4iLCJlbmRTcGluVmFyIiwic291cmNlUG9zIiwiVmVjMiIsIlpFUk8iLCJwb3NWYXIiLCJfcG9zaXRpb25UeXBlIiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJwb3NpdGlvblR5cGUiLCJfdXBkYXRlTWF0ZXJpYWwiLCJlbWl0dGVyTW9kZSIsImdyYXZpdHkiLCJzcGVlZCIsInNwZWVkVmFyIiwidGFuZ2VudGlhbEFjY2VsIiwidGFuZ2VudGlhbEFjY2VsVmFyIiwicmFkaWFsQWNjZWwiLCJyYWRpYWxBY2NlbFZhciIsInJvdGF0aW9uSXNEaXIiLCJzdGFydFJhZGl1cyIsInN0YXJ0UmFkaXVzVmFyIiwiZW5kUmFkaXVzIiwiZW5kUmFkaXVzVmFyIiwicm90YXRlUGVyUyIsInJvdGF0ZVBlclNWYXIiLCJDbGFzcyIsIm5hbWUiLCJtaXhpbnMiLCJlZGl0b3IiLCJtZW51IiwiaW5zcGVjdG9yIiwicGxheU9uRm9jdXMiLCJleGVjdXRlSW5FZGl0TW9kZSIsImN0b3IiLCJpbml0UHJvcGVydGllcyIsIl9wcmV2aWV3VGltZXIiLCJfZm9jdXNlZCIsIl9hc3BlY3RSYXRpbyIsImNvbG9yIiwic3RhdGljcyIsIkRVUkFUSU9OX0lORklOSVRZIiwiU1RBUlRfU0laRV9FUVVBTF9UT19FTkRfU0laRSIsIlNUQVJUX1JBRElVU19FUVVBTF9UT19FTkRfUkFESVVTIiwiX1BOR1JlYWRlciIsIl9USUZGUmVhZGVyIiwib25Gb2N1c0luRWRpdG9yIiwiY29tcG9uZW50cyIsImkiLCJfc3RhcnRQcmV2aWV3Iiwib25Mb3N0Rm9jdXNJbkVkaXRvciIsIl9zdG9wUHJldmlldyIsImNsZWFySW50ZXJ2YWwiLCJfY29udmVydFRleHR1cmVUb1Nwcml0ZUZyYW1lIiwiX3RoaXMiLCJFZGl0b3IiLCJhc3NldGRiIiwicXVlcnlNZXRhSW5mb0J5VXVpZCIsImVyciIsIm1ldGFJbmZvIiwiZXJyb3IiLCJtZXRhIiwiSlNPTiIsInBhcnNlIiwianNvbiIsIk5vZGVVdGlscyIsIm5vZGVQYXRoIiwiZ2V0Tm9kZVBhdGgiLCJ3YXJuIiwiYXNzZXRVcmwiLCJVcmwiLCJiYXNlbmFtZU5vRXh0IiwiYXNzZXRQYXRoIiwidXVpZCIsInN1Yk1ldGFzIiwiYXNzZXRNYW5hZ2VyIiwibG9hZEFueSIsInNwIiwiX19wcmVsb2FkIiwiX3N1cGVyIiwibWlzc0N1c3RvbVRleHR1cmUiLCJpc1BsYXlpbmciLCJvbkRlc3Ryb3kiLCJfYnVmZmVyIiwiZGVzdHJveSIsIl91dkZpbGxlZCIsImxhdGVVcGRhdGUiLCJkdCIsImZpbmlzaGVkIiwic3RlcCIsImFkZFBhcnRpY2xlIiwic3RvcCIsInJlc2V0IiwibWFya0ZvclJlbmRlciIsImlzRnVsbCIsInNldFRleHR1cmVXaXRoUmVjdCIsInJlY3QiLCJzZWxmIiwicG9zdExvYWROYXRpdmUiLCJfbmF0aXZlQXNzZXQiLCJlcnJvcklEIiwiaXNWYWxpZCIsIl9wbGlzdEZpbGUiLCJuYXRpdmVVcmwiLCJfaW5pdFdpdGhEaWN0aW9uYXJ5IiwiX2luaXRUZXh0dXJlV2l0aERpY3Rpb25hcnkiLCJkaWN0IiwiaW1nUGF0aCIsInBhdGgiLCJjaGFuZ2VCYXNlbmFtZSIsImxvYWRJbWFnZSIsInVuZGVmaW5lZCIsImFzc2V0cyIsImFkZCIsInRleHR1cmVEYXRhIiwidGV4IiwiYnVmZmVyIiwidW56aXBCYXNlNjRBc0FycmF5IiwibG9nSUQiLCJpbWFnZUZvcm1hdCIsImNhbnZhc09iaiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm15UG5nT2JqIiwicmVuZGVyIiwicGFyc2VUSUZGIiwiY2FjaGVJbWFnZSIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsIl90ZW1wRW1pc3Npb25SYXRlIiwiTWF0aCIsIm1pbiIsIk51bWJlciIsIk1BWF9WQUxVRSIsInNyY0JsZW5kRmFjdG9yIiwiU1JDX0FMUEhBIiwiZHN0QmxlbmRGYWN0b3IiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwibG9jU3RhcnRDb2xvciIsImxvY1N0YXJ0Q29sb3JWYXIiLCJsb2NFbmRDb2xvciIsImxvY0VuZENvbG9yVmFyIiwieCIsInkiLCJsb2NSb3RhdGlvbklzRGlyIiwidG9TdHJpbmciLCJ0b0xvd2VyQ2FzZSIsIl92YWxpZGF0ZVJlbmRlciIsImxvYWRlZCIsIl9vblRleHR1cmVMb2FkZWQiLCJ1cGRhdGVVVnMiLCJfc3luY0FzcGVjdCIsImZyYW1lUmVjdCIsIl9yZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJ0ZXh0dXJlTG9hZGVkIiwib25UZXh0dXJlTG9hZGVkIiwibWF0ZXJpYWwiLCJnZXRNYXRlcmlhbCIsImRlZmluZSIsInNldFByb3BlcnR5IiwicHJvdG90eXBlIiwiY2FsbCIsIl9maW5pc2hlZFNpbXVsYXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsMEJBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsYUFBYSxHQUFHRCxPQUFPLENBQUMsbUJB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RWZBLElBQUFBLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQixjQUFoQixFQUFnQyxLQUFLekosYUFBTCxLQUF1QnBGLFlBQVksQ0FBQ0MsSUFBcEU7QUFDQTBPLElBQUFBLFFBQVEsQ0FBQ0csV0FBVCxDQUFxQixTQUFyQixFQUFnQyxLQUFLdE0sV0FBTCxFQUFoQzs7QUFFQTVELElBQUFBLFNBQVMsQ0FBQ21RLFNBQVYsQ0FBb0J4SixlQUFwQixDQUFvQ3lKLElBQXBDLENBQXlDLElBQXpDO0FBQ0gsR0F2Z0J5QjtBQXlnQjFCQyxFQUFBQSxtQkFBbUIsRUFBRSwrQkFBWTtBQUM3QixRQUFJek8sU0FBSixFQUFlO0FBQ1gsVUFBSSxLQUFLSCxPQUFMLElBQWdCLEtBQUs2RyxRQUFyQixJQUFpQyxDQUFDLEtBQUtoRSxNQUF2QyxJQUFpRCxDQUFDekQsRUFBRSxDQUFDbUIsTUFBSCxDQUFVa0osU0FBaEUsRUFBMkU7QUFDdkUsYUFBS3JKLFdBQUw7QUFDSDs7QUFDRDtBQUNIOztBQUNELFNBQUtBLFdBQUw7QUFDQSxTQUFLQyxVQUFMO0FBQ0EsU0FBS0MsYUFBTDs7QUFDQSxRQUFJLEtBQUtzQyxrQkFBTCxJQUEyQixLQUFLSCxRQUFwQyxFQUE4QztBQUMxQyxXQUFLekQsSUFBTCxDQUFVNEssT0FBVjtBQUNIO0FBQ0o7QUF0aEJ5QixDQUFULENBQXJCO0FBeWhCQXhLLEVBQUUsQ0FBQ0MsY0FBSCxHQUFvQndQLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpQLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBtYWNybyA9IHJlcXVpcmUoJy4uL2NvcmUvcGxhdGZvcm0vQ0NNYWNybycpO1xuY29uc3QgUGFydGljbGVBc3NldCA9IHJlcXVpcmUoJy4vQ0NQYXJ0aWNsZUFzc2V0Jyk7XG5jb25zdCBSZW5kZXJDb21wb25lbnQgPSByZXF1aXJlKCcuLi9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcbmNvbnN0IGNvZGVjID0gcmVxdWlyZSgnLi4vY29tcHJlc3Npb24vWmlwVXRpbHMnKTtcbmNvbnN0IFBOR1JlYWRlciA9IHJlcXVpcmUoJy4vQ0NQTkdSZWFkZXInKTtcbmNvbnN0IHRpZmZSZWFkZXIgPSByZXF1aXJlKCcuL0NDVElGRlJlYWRlcicpO1xuY29uc3QgdGV4dHVyZVV0aWwgPSByZXF1aXJlKCcuLi9jb3JlL3V0aWxzL3RleHR1cmUtdXRpbCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcbmNvbnN0IFBhcnRpY2xlU2ltdWxhdG9yID0gcmVxdWlyZSgnLi9wYXJ0aWNsZS1zaW11bGF0b3InKTtcbmNvbnN0IE1hdGVyaWFsID0gcmVxdWlyZSgnLi4vY29yZS9hc3NldHMvbWF0ZXJpYWwvQ0NNYXRlcmlhbCcpO1xuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vY29yZS91dGlscy9ibGVuZC1mdW5jJyk7XG5cbmZ1bmN0aW9uIGdldEltYWdlRm9ybWF0QnlEYXRhIChpbWdEYXRhKSB7XG4gICAgLy8gaWYgaXQgaXMgYSBwbmcgZmlsZSBidWZmZXIuXG4gICAgaWYgKGltZ0RhdGEubGVuZ3RoID4gOCAmJiBpbWdEYXRhWzBdID09PSAweDg5XG4gICAgICAgICYmIGltZ0RhdGFbMV0gPT09IDB4NTBcbiAgICAgICAgJiYgaW1nRGF0YVsyXSA9PT0gMHg0RVxuICAgICAgICAmJiBpbWdEYXRhWzNdID09PSAweDQ3XG4gICAgICAgICYmIGltZ0RhdGFbNF0gPT09IDB4MERcbiAgICAgICAgJiYgaW1nRGF0YVs1XSA9PT0gMHgwQVxuICAgICAgICAmJiBpbWdEYXRhWzZdID09PSAweDFBXG4gICAgICAgICYmIGltZ0RhdGFbN10gPT09IDB4MEEpIHtcbiAgICAgICAgcmV0dXJuIG1hY3JvLkltYWdlRm9ybWF0LlBORztcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBpcyBhIHRpZmYgZmlsZSBidWZmZXIuXG4gICAgaWYgKGltZ0RhdGEubGVuZ3RoID4gMiAmJiAoKGltZ0RhdGFbMF0gPT09IDB4NDkgJiYgaW1nRGF0YVsxXSA9PT0gMHg0OSlcbiAgICAgICAgfHwgKGltZ0RhdGFbMF0gPT09IDB4NGQgJiYgaW1nRGF0YVsxXSA9PT0gMHg0ZClcbiAgICAgICAgfHwgKGltZ0RhdGFbMF0gPT09IDB4ZmYgJiYgaW1nRGF0YVsxXSA9PT0gMHhkOCkpKSB7XG4gICAgICAgIHJldHVybiBtYWNyby5JbWFnZUZvcm1hdC5USUZGO1xuICAgIH1cbiAgICByZXR1cm4gbWFjcm8uSW1hZ2VGb3JtYXQuVU5LTk9XTjtcbn1cblxuLy9cbmZ1bmN0aW9uIGdldFBhcnRpY2xlQ29tcG9uZW50cyAobm9kZSkge1xuICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudCwgY29tcCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAgICBpZiAoIXBhcmVudCB8fCAhY29tcCkge1xuICAgICAgICByZXR1cm4gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5QYXJ0aWNsZVN5c3RlbSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRQYXJ0aWNsZUNvbXBvbmVudHMocGFyZW50KTtcbn1cblxuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgZW1pdHRlciBtb2Rlc1xuICogISN6aCDlj5HlsITmqKHlvI9cbiAqIEBlbnVtIFBhcnRpY2xlU3lzdGVtLkVtaXR0ZXJNb2RlXG4gKi9cbnZhciBFbWl0dGVyTW9kZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVXNlcyBncmF2aXR5LCBzcGVlZCwgcmFkaWFsIGFuZCB0YW5nZW50aWFsIGFjY2VsZXJhdGlvbi5cbiAgICAgKiAhI3poIOmHjeWKm+aooeW8j++8jOaooeaLn+mHjeWKm++8jOWPr+iuqeeykuWtkOWbtOe7leS4gOS4quS4reW/g+eCueenu+i/keaIluenu+i/nOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHUkFWSVRZXG4gICAgICovXG4gICAgR1JBVklUWTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFVzZXMgcmFkaXVzIG1vdmVtZW50ICsgcm90YXRpb24uXG4gICAgICogISN6aCDljYrlvoTmqKHlvI/vvIzlj6/ku6Xkvb/nspLlrZDku6XlnIblnIjmlrnlvI/ml4vovazvvIzlroPkuZ/lj6/ku6XliJvpgKDonrrml4vmlYjmnpzorqnnspLlrZDmgKXpgJ/liY3ov5vmiJblkI7pgIDjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUkFESVVTIC0gVXNlcyByYWRpdXMgbW92ZW1lbnQgKyByb3RhdGlvbi5cbiAgICAgKi9cbiAgICBSQURJVVM6IDFcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgcGFydGljbGVzIG1vdmVtZW50IHR5cGUuXG4gKiAhI3poIOeykuWtkOS9jee9ruexu+Wei1xuICogQGVudW0gUGFydGljbGVTeXN0ZW0uUG9zaXRpb25UeXBlXG4gKi9cbnZhciBQb3NpdGlvblR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTGl2aW5nIHBhcnRpY2xlcyBhcmUgYXR0YWNoZWQgdG8gdGhlIHdvcmxkIGFuZCBhcmUgdW5hZmZlY3RlZCBieSBlbWl0dGVyIHJlcG9zaXRpb25pbmcuXG4gICAgICogISN6aFxuICAgICAqIOiHqueUseaooeW8j++8jOebuOWvueS6juS4lueVjOWdkOagh++8jOS4jeS8mumaj+eykuWtkOiKgueCueenu+WKqOiAjOenu+WKqOOAgu+8iOWPr+S6p+eUn+eBq+eEsOOAgeiSuOaxveetieaViOaenO+8iVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGUkVFXG4gICAgICovXG4gICAgRlJFRTogMCxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbiB0aGUgcmVsYXRpdmUgbW9kZSwgdGhlIHBhcnRpY2xlIHdpbGwgbW92ZSB3aXRoIHRoZSBwYXJlbnQgbm9kZSwgYnV0IG5vdCB3aXRoIHRoZSBub2RlIHdoZXJlIHRoZSBwYXJ0aWNsZSBpcy4gXG4gICAgICogRm9yIGV4YW1wbGUsIHRoZSBjb2ZmZWUgaW4gdGhlIGN1cCBpcyBzdGVhbWluZy4gVGhlbiB0aGUgc3RlYW0gbW92ZXMgKGZvcndhcmQpIHdpdGggdGhlIHRyYWluLCByYXRoZXIgdGhhbiBtb3ZlcyB3aXRoIHRoZSBjdXAuXG4gICAgICogISN6aFxuICAgICAqIOebuOWvueaooeW8j++8jOeykuWtkOS8mui3n+maj+eItuiKgueCueenu+WKqO+8jOS9huS4jei3n+maj+eykuWtkOaJgOWcqOiKgueCueenu+WKqO+8jOS+i+WmguWcqOS4gOWIl+ihjOi/m+eBq+i9puS4re+8jOadr+S4reeahOWSluWVoemjmOi1t+mbvuawlO+8jFxuICAgICAqIOadr+WtkOenu+WKqO+8jOmbvuawlOaVtOS9k+W5tuS4jeS8mumaj+edgOadr+WtkOenu+WKqO+8jOS9huS7jueBq+i9puaVtOS9k+eahOinkuW6puadpeeci++8jOmbvuawlOaVtOS9k+S8mumaj+edgOeBq+i9puenu+WKqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSRUxBVElWRVxuICAgICAqL1xuICAgIFJFTEFUSVZFOiAxLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIExpdmluZyBwYXJ0aWNsZXMgYXJlIGF0dGFjaGVkIHRvIHRoZSBlbWl0dGVyIGFuZCBhcmUgdHJhbnNsYXRlZCBhbG9uZyB3aXRoIGl0LlxuICAgICAqICEjemhcbiAgICAgKiDmlbTnu4TmqKHlvI/vvIznspLlrZDot5/pmo/lj5HlsITlmajnp7vliqjjgILvvIjkuI3kvJrlj5HnlJ/mi5blsL7vvIlcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gR1JPVVBFRFxuICAgICAqL1xuICAgIEdST1VQRUQ6IDJcbn0pO1xuXG4vKipcbiAqIEBjbGFzcyBQYXJ0aWNsZVN5c3RlbVxuICovXG5cbnZhciBwcm9wZXJ0aWVzID0ge1xuICAgIC8qKlxuICAgICAqICEjZW4gUGxheSBwYXJ0aWNsZSBpbiBlZGl0IG1vZGUuXG4gICAgICogISN6aCDlnKjnvJbovpHlmajmqKHlvI/kuIvpooTop4jnspLlrZDvvIzlkK/nlKjlkI7pgInkuK3nspLlrZDml7bvvIznspLlrZDlsIboh6rliqjmkq3mlL7jgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHByZXZpZXdcbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHByZXZpZXc6IHtcbiAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcbiAgICAgICAgbm90aWZ5OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgaWYgKCAhdGhpcy5wcmV2aWV3ICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcFN5c3RlbSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5wcmV2aWV3J1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSWYgc2V0IGN1c3RvbSB0byB0cnVlLCB0aGVuIHVzZSBjdXN0b20gcHJvcGVydGllcyBpbnN0ZWFkb2YgcmVhZCBwYXJ0aWNsZSBmaWxlLlxuICAgICAqICEjemgg5piv5ZCm6Ieq5a6a5LmJ57KS5a2Q5bGe5oCn44CCXG4gICAgICogQHByb3BlcnR5IHtCb29sZWFufSBjdXN0b21cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIF9jdXN0b206IGZhbHNlLFxuICAgIGN1c3RvbToge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXN0b207XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmICF2YWx1ZSAmJiAhdGhpcy5fZmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy53YXJuSUQoNjAwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYXJ0aWNsZV9zeXN0ZW0uY3VzdG9tJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBwbGlzdCBmaWxlLlxuICAgICAqICEjemggcGxpc3Qg5qC85byP55qE57KS5a2Q6YWN572u5paH5Lu244CCXG4gICAgICogQHByb3BlcnR5IHtQYXJ0aWNsZUFzc2V0fSBmaWxlXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqL1xuICAgIF9maWxlOiB7XG4gICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIHR5cGU6IFBhcnRpY2xlQXNzZXRcbiAgICB9LFxuICAgIGZpbGU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmlsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUsIGZvcmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZmlsZSAhPT0gdmFsdWUgfHwgKENDX0VESVRPUiAmJiBmb3JjZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b20gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgIHR5cGU6IFBhcnRpY2xlQXNzZXQsXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFydGljbGVfc3lzdGVtLmZpbGUnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3ByaXRlRnJhbWUgdXNlZCBmb3IgcGFydGljbGVzIGRpc3BsYXlcbiAgICAgKiAhI3poIOeUqOS6jueykuWtkOWRiOeOsOeahCBTcHJpdGVGcmFtZVxuICAgICAqIEBwcm9wZXJ0eSBzcHJpdGVGcmFtZVxuICAgICAqIEB0eXBlIHtTcHJpdGVGcmFtZX1cbiAgICAgKi9cbiAgICBfc3ByaXRlRnJhbWU6IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICB9LFxuICAgIHNwcml0ZUZyYW1lOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZm9yY2UpIHtcbiAgICAgICAgICAgIHZhciBsYXN0U3ByaXRlID0gdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWU7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmb3JjZSAmJiBsYXN0U3ByaXRlID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHZhbHVlLl91dWlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlRnJhbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKChsYXN0U3ByaXRlICYmIGxhc3RTcHJpdGUuZ2V0VGV4dHVyZSgpKSAhPT0gKHZhbHVlICYmIHZhbHVlLmdldFRleHR1cmUoKSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVNwcml0ZUZyYW1lKGxhc3RTcHJpdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KCdzcHJpdGVmcmFtZS1jaGFuZ2VkJywgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5zcHJpdGVGcmFtZSdcbiAgICB9LFxuXG5cbiAgICAvLyBqdXN0IHVzZWQgdG8gcmVhZCBkYXRhIGZyb20gMS54XG4gICAgX3RleHR1cmU6IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRleHR1cmUgb2YgUGFydGljbGUgU3lzdGVtLCByZWFkb25seSwgcGxlYXNlIHVzZSBzcHJpdGVGcmFtZSB0byBzZXR1cCBuZXcgdGV4dHVyZeOAglxuICAgICAqICEjemgg57KS5a2Q6LS05Zu+77yM5Y+q6K+75bGe5oCn77yM6K+35L2/55SoIHNwcml0ZUZyYW1lIOWxnuaAp+adpeabv+aNoui0tOWbvuOAglxuICAgICAqIEBwcm9wZXJ0eSB0ZXh0dXJlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB0ZXh0dXJlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFRleHR1cmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDE3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS50ZXh0dXJlJyxcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEN1cnJlbnQgcXVhbnRpdHkgb2YgcGFydGljbGVzIHRoYXQgYXJlIGJlaW5nIHNpbXVsYXRlZC5cbiAgICAgKiAhI3poIOW9k+WJjeaSreaUvueahOeykuWtkOaVsOmHj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYXJ0aWNsZUNvdW50XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcGFydGljbGVDb3VudDoge1xuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0b3IucGFydGljbGVzLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSBzeXN0ZW0gc2ltdWxhdGlvbiBoYXZlIHN0b3BwZWQuXG4gICAgICogISN6aCDmjIfnpLrnspLlrZDmkq3mlL7mmK/lkKblrozmr5XjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHN0b3BwZWRcbiAgICAgKi9cbiAgICBfc3RvcHBlZDogdHJ1ZSxcbiAgICBzdG9wcGVkOiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RvcHBlZDtcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSWYgc2V0IHRvIHRydWUsIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gd2lsbCBhdXRvbWF0aWNhbGx5IHN0YXJ0IHBsYXlpbmcgb24gb25Mb2FkLlxuICAgICAqICEjemgg5aaC5p6c6K6+572u5Li6IHRydWUg6L+Q6KGM5pe25Lya6Ieq5Yqo5Y+R5bCE57KS5a2Q44CCXG4gICAgICogQHByb3BlcnR5IHBsYXlPbkxvYWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcGxheU9uTG9hZDogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSW5kaWNhdGUgd2hldGhlciB0aGUgb3duZXIgbm9kZSB3aWxsIGJlIGF1dG8tcmVtb3ZlZCB3aGVuIGl0IGhhcyBubyBwYXJ0aWNsZXMgbGVmdC5cbiAgICAgKiAhI3poIOeykuWtkOaSreaUvuWujOavleWQjuiHquWKqOmUgOavgeaJgOWcqOeahOiKgueCueOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYXV0b1JlbW92ZU9uRmluaXNoXG4gICAgICovXG4gICAgYXV0b1JlbW92ZU9uRmluaXNoOiB7XG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYXJ0aWNsZV9zeXN0ZW0uYXV0b1JlbW92ZU9uRmluaXNoJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluZGljYXRlIHdoZXRoZXIgdGhlIHBhcnRpY2xlIHN5c3RlbSBpcyBhY3RpdmF0ZWQuXG4gICAgICogISN6aCDmmK/lkKbmv4DmtLvnspLlrZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFjdGl2ZVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGFjdGl2ZToge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0b3IuYWN0aXZlO1xuICAgICAgICB9LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1heGltdW0gcGFydGljbGVzIG9mIHRoZSBzeXN0ZW0uXG4gICAgICogISN6aCDnspLlrZDmnIDlpKfmlbDph4/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdG90YWxQYXJ0aWNsZXNcbiAgICAgKiBAZGVmYXVsdCAxNTBcbiAgICAgKi9cbiAgICB0b3RhbFBhcnRpY2xlczogMTUwLFxuICAgIC8qKlxuICAgICAqICEjZW4gSG93IG1hbnkgc2Vjb25kcyB0aGUgZW1pdHRlciB3aWwgcnVuLiAtMSBtZWFucyAnZm9yZXZlcicuXG4gICAgICogISN6aCDlj5HlsITlmajnlJ/lrZjml7bpl7TvvIzljZXkvY3np5LvvIwtMeihqOekuuaMgee7reWPkeWwhOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBkZWZhdWx0IFBhcnRpY2xlU3lzdGVtLkRVUkFUSU9OX0lORklOSVRZXG4gICAgICovXG4gICAgZHVyYXRpb246IC0xLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW1pc3Npb24gcmF0ZSBvZiB0aGUgcGFydGljbGVzLlxuICAgICAqICEjemgg5q+P56eS5Y+R5bCE55qE57KS5a2Q5pWw55uu44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVtaXNzaW9uUmF0ZVxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgZW1pc3Npb25SYXRlOiAxMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIExpZmUgb2YgZWFjaCBwYXJ0aWNsZSBzZXR0ZXIuXG4gICAgICogISN6aCDnspLlrZDnmoTov5DooYzml7bpl7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGlmZVxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBsaWZlOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGxpZmUuXG4gICAgICogISN6aCDnspLlrZDnmoTov5DooYzml7bpl7Tlj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGlmZVZhclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBsaWZlVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBjb2xvciBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL6aKc6Imy44CCXG4gICAgICogQHByb3BlcnR5IHtjYy5Db2xvcn0gc3RhcnRDb2xvclxuICAgICAqIEBkZWZhdWx0IHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAyNTV9XG4gICAgICovXG4gICAgX3N0YXJ0Q29sb3I6IG51bGwsXG4gICAgc3RhcnRDb2xvcjoge1xuICAgICAgICB0eXBlOiBjYy5Db2xvcixcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydENvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5yID0gdmFsLnI7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yLmcgPSB2YWwuZztcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3IuYiA9IHZhbC5iO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5hID0gdmFsLmE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSBzdGFydCBjb2xvci5cbiAgICAgKiAhI3poIOeykuWtkOWIneWni+minOiJsuWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IHN0YXJ0Q29sb3JWYXJcbiAgICAgKiBAZGVmYXVsdCB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cbiAgICAgKi9cbiAgICBfc3RhcnRDb2xvclZhcjogbnVsbCxcbiAgICBzdGFydENvbG9yVmFyOiB7XG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0Q29sb3JWYXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyLnIgPSB2YWwucjtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3JWYXIuZyA9IHZhbC5nO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhci5iID0gdmFsLmI7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyLmEgPSB2YWwuYTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogISNlbiBFbmRpbmcgY29sb3Igb2YgZWFjaCBwYXJ0aWNsZS5cbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+minOiJsuOAglxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IGVuZENvbG9yXG4gICAgICogQGRlZmF1bHQge3I6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IDB9XG4gICAgICovXG4gICAgX2VuZENvbG9yOiBudWxsLFxuICAgIGVuZENvbG9yOiB7XG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZENvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuciA9IHZhbC5yO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuZyA9IHZhbC5nO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuYiA9IHZhbC5iO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuYSA9IHZhbC5hO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZW5kIGNvbG9yLlxuICAgICAqICEjemgg57KS5a2Q57uT5p2f6aKc6Imy5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtjYy5Db2xvcn0gZW5kQ29sb3JWYXJcbiAgICAgKiBAZGVmYXVsdCB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cbiAgICAgKi9cbiAgICBfZW5kQ29sb3JWYXI6IG51bGwsXG4gICAgZW5kQ29sb3JWYXI6IHtcbiAgICAgICAgdHlwZTogY2MuQ29sb3IsXG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kQ29sb3JWYXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5yID0gdmFsLnI7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5nID0gdmFsLmc7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5iID0gdmFsLmI7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5hID0gdmFsLmE7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBbmdsZSBvZiBlYWNoIHBhcnRpY2xlIHNldHRlci5cbiAgICAgKiAhI3poIOeykuWtkOinkuW6puOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbmdsZVxuICAgICAqIEBkZWZhdWx0IDkwXG4gICAgICovXG4gICAgYW5nbGU6IDkwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGFuZ2xlIG9mIGVhY2ggcGFydGljbGUgc2V0dGVyLlxuICAgICAqICEjemgg57KS5a2Q6KeS5bqm5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ2xlVmFyXG4gICAgICogQGRlZmF1bHQgMjBcbiAgICAgKi9cbiAgICBhbmdsZVZhcjogMjAsXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBzaXplIGluIHBpeGVscyBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q55qE5Yid5aeL5aSn5bCP44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U2l6ZVxuICAgICAqIEBkZWZhdWx0IDUwXG4gICAgICovXG4gICAgc3RhcnRTaXplOiA1MCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiBzdGFydCBzaXplIGluIHBpeGVscy5cbiAgICAgKiAhI3poIOeykuWtkOWIneWni+Wkp+Wwj+eahOWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFNpemVWYXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgc3RhcnRTaXplVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW5kIHNpemUgaW4gcGl4ZWxzIG9mIGVhY2ggcGFydGljbGUuXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/ml7bnmoTlpKflsI/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kU2l6ZVxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRTaXplOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGVuZCBzaXplIGluIHBpeGVscy5cbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+Wkp+Wwj+eahOWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRTaXplVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIGVuZFNpemVWYXI6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBhbmdsZSBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q5byA5aeL6Ieq5peL6KeS5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U3BpblxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBzdGFydFNwaW46IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc3RhcnQgYW5nbGUuXG4gICAgICogISN6aCDnspLlrZDlvIDlp4voh6rml4vop5Lluqblj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRTcGluVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHN0YXJ0U3BpblZhcjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIEVuZCBhbmdsZSBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q57uT5p2f6Ieq5peL6KeS5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFNwaW5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgZW5kU3BpbjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiBlbmQgYW5nbGUuXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/oh6rml4vop5Lluqblj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kU3BpblZhclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRTcGluVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTb3VyY2UgcG9zaXRpb24gb2YgdGhlIGVtaXR0ZXIuXG4gICAgICogISN6aCDlj5HlsITlmajkvY3nva7jgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IHNvdXJjZVBvc1xuICAgICAqIEBkZWZhdWx0IGNjLlZlYzIuWkVST1xuICAgICAqL1xuICAgIHNvdXJjZVBvczogY2MuVmVjMi5aRVJPLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc291cmNlIHBvc2l0aW9uLlxuICAgICAqICEjemgg5Y+R5bCE5Zmo5L2N572u55qE5Y+Y5YyW6IyD5Zu044CC77yI5qiq5ZCR5ZKM57q15ZCR77yJXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBwb3NWYXJcbiAgICAgKiBAZGVmYXVsdCBjYy5WZWMyLlpFUk9cbiAgICAgKi9cbiAgICBwb3NWYXI6IGNjLlZlYzIuWkVSTyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGVzIG1vdmVtZW50IHR5cGUuXG4gICAgICogISN6aCDnspLlrZDkvY3nva7nsbvlnovjgIJcbiAgICAgKiBAcHJvcGVydHkge1BhcnRpY2xlU3lzdGVtLlBvc2l0aW9uVHlwZX0gcG9zaXRpb25UeXBlXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uUG9zaXRpb25UeXBlLkZSRUVcbiAgICAgKi9cbiAgICBfcG9zaXRpb25UeXBlOiB7XG4gICAgICAgIGRlZmF1bHQ6IFBvc2l0aW9uVHlwZS5GUkVFLFxuICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogXCJwb3NpdGlvblR5cGVcIlxuICAgIH0sXG5cbiAgICBwb3NpdGlvblR5cGU6IHtcbiAgICAgICAgdHlwZTogUG9zaXRpb25UeXBlLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uVHlwZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uVHlwZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZXMgZW1pdHRlciBtb2Rlcy5cbiAgICAgKiAhI3poIOWPkeWwhOWZqOexu+Wei+OAglxuICAgICAqIEBwcm9wZXJ0eSB7UGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGV9IGVtaXR0ZXJNb2RlXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGUuR1JBVklUWVxuICAgICAqL1xuICAgIGVtaXR0ZXJNb2RlOiB7XG4gICAgICAgIGRlZmF1bHQ6IEVtaXR0ZXJNb2RlLkdSQVZJVFksXG4gICAgICAgIHR5cGU6IEVtaXR0ZXJNb2RlXG4gICAgfSxcblxuICAgIC8vIEdSQVZJVFkgTU9ERVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHcmF2aXR5IG9mIHRoZSBlbWl0dGVyLlxuICAgICAqICEjemgg6YeN5Yqb44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBncmF2aXR5XG4gICAgICogQGRlZmF1bHQgY2MuVmVjMi5aRVJPXG4gICAgICovXG4gICAgZ3Jhdml0eTogY2MuVmVjMi5aRVJPLFxuICAgIC8qKlxuICAgICAqICEjZW4gU3BlZWQgb2YgdGhlIGVtaXR0ZXIuXG4gICAgICogISN6aCDpgJ/luqbjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3BlZWRcbiAgICAgKiBAZGVmYXVsdCAxODBcbiAgICAgKi9cbiAgICBzcGVlZDogMTgwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSBzcGVlZC5cbiAgICAgKiAhI3poIOmAn+W6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGVlZFZhclxuICAgICAqIEBkZWZhdWx0IDUwXG4gICAgICovXG4gICAgc3BlZWRWYXI6IDUwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGFuZ2VudGlhbCBhY2NlbGVyYXRpb24gb2YgZWFjaCBwYXJ0aWNsZS4gT25seSBhdmFpbGFibGUgaW4gJ0dyYXZpdHknIG1vZGUuXG4gICAgICogISN6aCDmr4/kuKrnspLlrZDnmoTliIflkJHliqDpgJ/luqbvvIzljbPlnoLnm7Tkuo7ph43lipvmlrnlkJHnmoTliqDpgJ/luqbvvIzlj6rmnInlnKjph43lipvmqKHlvI/kuIvlj6/nlKjjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGFuZ2VudGlhbEFjY2VsXG4gICAgICogQGRlZmF1bHQgODBcbiAgICAgKi9cbiAgICB0YW5nZW50aWFsQWNjZWw6IDgwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSB0YW5nZW50aWFsIGFjY2VsZXJhdGlvbi5cbiAgICAgKiAhI3poIOavj+S4queykuWtkOeahOWIh+WQkeWKoOmAn+W6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0YW5nZW50aWFsQWNjZWxWYXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdGFuZ2VudGlhbEFjY2VsVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gQWNjZWxlcmF0aW9uIG9mIGVhY2ggcGFydGljbGUuIE9ubHkgYXZhaWxhYmxlIGluICdHcmF2aXR5JyBtb2RlLlxuICAgICAqICEjemgg57KS5a2Q5b6E5ZCR5Yqg6YCf5bqm77yM5Y2z5bmz6KGM5LqO6YeN5Yqb5pa55ZCR55qE5Yqg6YCf5bqm77yM5Y+q5pyJ5Zyo6YeN5Yqb5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGlhbEFjY2VsXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJhZGlhbEFjY2VsOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSByYWRpYWwgYWNjZWxlcmF0aW9uLlxuICAgICAqICEjemgg57KS5a2Q5b6E5ZCR5Yqg6YCf5bqm5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGlhbEFjY2VsVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJhZGlhbEFjY2VsVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSByb3RhdGlvbiBvZiBlYWNoIHBhcnRpY2xlIGVxdWFscyB0byBpdHMgZGlyZWN0aW9uLiBPbmx5IGF2YWlsYWJsZSBpbiAnR3Jhdml0eScgbW9kZS5cbiAgICAgKiAhI3poIOavj+S4queykuWtkOeahOaXi+i9rOaYr+WQpuetieS6juWFtuaWueWQke+8jOWPquacieWcqOmHjeWKm+aooeW8j+S4i+WPr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcm90YXRpb25Jc0RpclxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcm90YXRpb25Jc0RpcjogZmFsc2UsXG5cbiAgICAvLyBSQURJVVMgTU9ERVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydGluZyByYWRpdXMgb2YgdGhlIHBhcnRpY2xlcy4gT25seSBhdmFpbGFibGUgaW4gJ1JhZGl1cycgbW9kZS5cbiAgICAgKiAhI3poIOWIneWni+WNiuW+hO+8jOihqOekuueykuWtkOWHuueUn+aXtuebuOWvueWPkeWwhOWZqOeahOi3neemu++8jOWPquacieWcqOWNiuW+hOaooeW8j+S4i+WPr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFJhZGl1c1xuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBzdGFydFJhZGl1czogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgc3RhcnRpbmcgcmFkaXVzLlxuICAgICAqICEjemgg5Yid5aeL5Y2K5b6E5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0UmFkaXVzVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHN0YXJ0UmFkaXVzVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW5kaW5nIHJhZGl1cyBvZiB0aGUgcGFydGljbGVzLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxuICAgICAqICEjemgg57uT5p2f5Y2K5b6E77yM5Y+q5pyJ5Zyo5Y2K5b6E5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFJhZGl1c1xuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRSYWRpdXM6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgdGhlIGVuZGluZyByYWRpdXMuXG4gICAgICogISN6aCDnu5PmnZ/ljYrlvoTlj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kUmFkaXVzVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIGVuZFJhZGl1c1ZhcjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIE51bWJlciBvZiBkZWdyZXNzIHRvIHJvdGF0ZSBhIHBhcnRpY2xlIGFyb3VuZCB0aGUgc291cmNlIHBvcyBwZXIgc2Vjb25kLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxuICAgICAqICEjemgg57KS5a2Q5q+P56eS5Zu057uV6LW35aeL54K555qE5peL6L2s6KeS5bqm77yM5Y+q5pyJ5Zyo5Y2K5b6E5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJvdGF0ZVBlclNcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcm90YXRlUGVyUzogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZGVncmVzcyB0byByb3RhdGUgYSBwYXJ0aWNsZSBhcm91bmQgdGhlIHNvdXJjZSBwb3MgcGVyIHNlY29uZC5cbiAgICAgKiAhI3poIOeykuWtkOavj+enkuWbtOe7lei1t+Wni+eCueeahOaXi+i9rOinkuW6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByb3RhdGVQZXJTVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJvdGF0ZVBlclNWYXI6IDBcblxufTtcblxuLyoqXG4gKiBQYXJ0aWNsZSBTeXN0ZW0gYmFzZSBjbGFzcy4gPGJyLz5cbiAqIEF0dHJpYnV0ZXMgb2YgYSBQYXJ0aWNsZSBTeXN0ZW06PGJyLz5cbiAqICAtIGVtbWlzaW9uIHJhdGUgb2YgdGhlIHBhcnRpY2xlczxici8+XG4gKiAgLSBHcmF2aXR5IE1vZGUgKE1vZGUgQSk6IDxici8+XG4gKiAgLSBncmF2aXR5IDxici8+XG4gKiAgLSBkaXJlY3Rpb24gPGJyLz5cbiAqICAtIHNwZWVkICstICB2YXJpYW5jZSA8YnIvPlxuICogIC0gdGFuZ2VudGlhbCBhY2NlbGVyYXRpb24gKy0gdmFyaWFuY2U8YnIvPlxuICogIC0gcmFkaWFsIGFjY2VsZXJhdGlvbiArLSB2YXJpYW5jZTxici8+XG4gKiAgLSBSYWRpdXMgTW9kZSAoTW9kZSBCKTogICAgICA8YnIvPlxuICogIC0gc3RhcnRSYWRpdXMgKy0gdmFyaWFuY2UgICAgPGJyLz5cbiAqICAtIGVuZFJhZGl1cyArLSB2YXJpYW5jZSAgICAgIDxici8+XG4gKiAgLSByb3RhdGUgKy0gdmFyaWFuY2UgICAgICAgICA8YnIvPlxuICogIC0gUHJvcGVydGllcyBjb21tb24gdG8gYWxsIG1vZGVzOiA8YnIvPlxuICogIC0gbGlmZSArLSBsaWZlIHZhcmlhbmNlICAgICAgPGJyLz5cbiAqICAtIHN0YXJ0IHNwaW4gKy0gdmFyaWFuY2UgICAgIDxici8+XG4gKiAgLSBlbmQgc3BpbiArLSB2YXJpYW5jZSAgICAgICA8YnIvPlxuICogIC0gc3RhcnQgc2l6ZSArLSB2YXJpYW5jZSAgICAgPGJyLz5cbiAqICAtIGVuZCBzaXplICstIHZhcmlhbmNlICAgICAgIDxici8+XG4gKiAgLSBzdGFydCBjb2xvciArLSB2YXJpYW5jZSAgICA8YnIvPlxuICogIC0gZW5kIGNvbG9yICstIHZhcmlhbmNlICAgICAgPGJyLz5cbiAqICAtIGxpZmUgKy0gdmFyaWFuY2UgICAgICAgICAgIDxici8+XG4gKiAgLSBibGVuZGluZyBmdW5jdGlvbiAgICAgICAgICA8YnIvPlxuICogIC0gdGV4dHVyZSAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIDxici8+XG4gKiBjb2NvczJkIGFsc28gc3VwcG9ydHMgcGFydGljbGVzIGdlbmVyYXRlZCBieSBQYXJ0aWNsZSBEZXNpZ25lciAoaHR0cDovL3BhcnRpY2xlZGVzaWduZXIuNzFzcXVhcmVkLmNvbS8pLjxici8+XG4gKiAnUmFkaXVzIE1vZGUnIGluIFBhcnRpY2xlIERlc2lnbmVyIHVzZXMgYSBmaXhlZCBlbWl0IHJhdGUgb2YgMzAgaHouIFNpbmNlIHRoYXQgY2FuJ3QgYmUgZ3VhcmF0ZWVkIGluIGNvY29zMmQsICA8YnIvPlxuICogY29jb3MyZCB1c2VzIGEgYW5vdGhlciBhcHByb2FjaCwgYnV0IHRoZSByZXN1bHRzIGFyZSBhbG1vc3QgaWRlbnRpY2FsLjxici8+XG4gKiBjb2NvczJkIHN1cHBvcnRzIGFsbCB0aGUgdmFyaWFibGVzIHVzZWQgYnkgUGFydGljbGUgRGVzaWduZXIgcGx1cyBhIGJpdCBtb3JlOiAgPGJyLz5cbiAqICAtIHNwaW5uaW5nIHBhcnRpY2xlcyAoc3VwcG9ydGVkIHdoZW4gdXNpbmcgUGFydGljbGVTeXN0ZW0pICAgICAgIDxici8+XG4gKiAgLSB0YW5nZW50aWFsIGFjY2VsZXJhdGlvbiAoR3Jhdml0eSBtb2RlKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogIC0gcmFkaWFsIGFjY2VsZXJhdGlvbiAoR3Jhdml0eSBtb2RlKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqICAtIHJhZGl1cyBkaXJlY3Rpb24gKFJhZGl1cyBtb2RlKSAoUGFydGljbGUgRGVzaWduZXIgc3VwcG9ydHMgb3V0d2FyZHMgdG8gaW53YXJkcyBkaXJlY3Rpb24gb25seSkgPGJyLz5cbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGN1c3RvbWl6ZSBhbnkgb2YgdGhlIGFib3ZlIG1lbnRpb25lZCBwcm9wZXJ0aWVzIGluIHJ1bnRpbWUuIEV4YW1wbGU6ICAgPGJyLz5cbiAqXG4gKiBAZXhhbXBsZVxuICogZW1pdHRlci5yYWRpYWxBY2NlbCA9IDE1O1xuICogZW1pdHRlci5zdGFydFNwaW4gPSAwO1xuICpcbiAqIEBjbGFzcyBQYXJ0aWNsZVN5c3RlbVxuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XG4gKiBAdXNlcyBCbGVuZEZ1bmNcbiAqL1xudmFyIFBhcnRpY2xlU3lzdGVtID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QYXJ0aWNsZVN5c3RlbScsXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuICAgIG1peGluczogW0JsZW5kRnVuY10sXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9QYXJ0aWNsZVN5c3RlbScsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGFydGljbGUtc3lzdGVtLmpzJyxcbiAgICAgICAgcGxheU9uRm9jdXM6IHRydWUsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0aWVzKCk7XG4gICAgfSxcblxuICAgIGluaXRQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgdGhpcy5fcHJldmlld1RpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hc3BlY3RSYXRpbyA9IDE7XG5cbiAgICAgICAgdGhpcy5fc2ltdWxhdG9yID0gbmV3IFBhcnRpY2xlU2ltdWxhdG9yKHRoaXMpO1xuXG4gICAgICAgIC8vIGNvbG9yc1xuICAgICAgICB0aGlzLl9zdGFydENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICB0aGlzLl9lbmRDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDApO1xuICAgICAgICB0aGlzLl9lbmRDb2xvclZhciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIC8vIFRoZSB0ZW1wb3JhcnkgU3ByaXRlRnJhbWUgb2JqZWN0IHVzZWQgZm9yIHRoZSByZW5kZXJlci4gQmVjYXVzZSB0aGVyZSBpcyBubyBjb3JyZXNwb25kaW5nIGFzc2V0LCBpdCBjYW4ndCBiZSBzZXJpYWxpemVkLlxuICAgICAgICB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG5cbiAgICBzdGF0aWNzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIFBhcnRpY2xlIGVtaXR0ZXIgbGl2ZXMgZm9yZXZlci5cbiAgICAgICAgICogISN6aCDooajnpLrlj5HlsITlmajmsLjkuYXlrZjlnKhcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERVUkFUSU9OX0lORklOSVRZXG4gICAgICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBEVVJBVElPTl9JTkZJTklUWTogLTEsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHN0YXJ0aW5nIHNpemUgb2YgdGhlIHBhcnRpY2xlIGlzIGVxdWFsIHRvIHRoZSBlbmRpbmcgc2l6ZS5cbiAgICAgICAgICogISN6aCDooajnpLrnspLlrZDnmoTotbflp4vlpKflsI/nrYnkuo7nu5PmnZ/lpKflsI/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNUQVJUX1NJWkVfRVFVQUxfVE9fRU5EX1NJWkVcbiAgICAgICAgICogQGRlZmF1bHQgLTFcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIFNUQVJUX1NJWkVfRVFVQUxfVE9fRU5EX1NJWkU6IC0xLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBzdGFydGluZyByYWRpdXMgb2YgdGhlIHBhcnRpY2xlIGlzIGVxdWFsIHRvIHRoZSBlbmRpbmcgcmFkaXVzLlxuICAgICAgICAgKiAhI3poIOihqOekuueykuWtkOeahOi1t+Wni+WNiuW+hOetieS6jue7k+adn+WNiuW+hOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1RBUlRfUkFESVVTX0VRVUFMX1RPX0VORF9SQURJVVNcbiAgICAgICAgICogQGRlZmF1bHQgLTFcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIFNUQVJUX1JBRElVU19FUVVBTF9UT19FTkRfUkFESVVTOiAtMSxcblxuICAgICAgICBFbWl0dGVyTW9kZTogRW1pdHRlck1vZGUsXG4gICAgICAgIFBvc2l0aW9uVHlwZTogUG9zaXRpb25UeXBlLFxuXG5cbiAgICAgICAgX1BOR1JlYWRlcjogUE5HUmVhZGVyLFxuICAgICAgICBfVElGRlJlYWRlcjogdGlmZlJlYWRlcixcbiAgICB9LFxuXG4gICAgLy8gRURJVE9SIFJFTEFURUQgTUVUSE9EU1xuXG4gICAgb25Gb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBnZXRQYXJ0aWNsZUNvbXBvbmVudHModGhpcy5ub2RlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzW2ldLl9zdGFydFByZXZpZXcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvc3RGb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBjb21wb25lbnRzID0gZ2V0UGFydGljbGVDb21wb25lbnRzKHRoaXMubm9kZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29tcG9uZW50c1tpXS5fc3RvcFByZXZpZXcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc3RhcnRQcmV2aWV3OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3N0b3BQcmV2aWV3OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnN0b3BTeXN0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpZXdUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9wcmV2aWV3VGltZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgTUVUSE9EU1xuXG4gICAgLy8ganVzdCB1c2VkIHRvIHJlYWQgZGF0YSBmcm9tIDEueFxuICAgIF9jb252ZXJ0VGV4dHVyZVRvU3ByaXRlRnJhbWU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xuICAgICAgICBpZiAoIXRleHR1cmUgfHwgIXRleHR1cmUuX3V1aWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIEVkaXRvci5hc3NldGRiLnF1ZXJ5TWV0YUluZm9CeVV1aWQodGV4dHVyZS5fdXVpZCwgZnVuY3Rpb24gKGVyciwgbWV0YUluZm8pIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBFZGl0b3IuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIGxldCBtZXRhID0gSlNPTi5wYXJzZShtZXRhSW5mby5qc29uKTtcbiAgICAgICAgICAgIGlmIChtZXRhLnR5cGUgPT09ICdyYXcnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgTm9kZVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ2FwcDovL2VkaXRvci9wYWdlL3NjZW5lLXV0aWxzL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVBhdGggPSBOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgoX3RoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVkaXRvci53YXJuKGBUaGUgdGV4dHVyZSAke21ldGFJbmZvLmFzc2V0VXJsfSB1c2VkIGJ5IHBhcnRpY2xlICR7bm9kZVBhdGh9IGRvZXMgbm90IGNvbnRhaW4gYW55IFNwcml0ZUZyYW1lLCBwbGVhc2Ugc2V0IHRoZSB0ZXh0dXJlIHR5cGUgdG8gU3ByaXRlIGFuZCByZWFzc2lnbiB0aGUgU3ByaXRlRnJhbWUgdG8gdGhlIHBhcnRpY2xlIGNvbXBvbmVudC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBVcmwgPSByZXF1aXJlKCdmaXJlLXVybCcpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gVXJsLmJhc2VuYW1lTm9FeHQobWV0YUluZm8uYXNzZXRQYXRoKTtcbiAgICAgICAgICAgICAgICBsZXQgdXVpZCA9IG1ldGEuc3ViTWV0YXNbbmFtZV0udXVpZDtcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh1dWlkLCBmdW5jdGlvbiAoZXJyLCBzcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gRWRpdG9yLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNwcml0ZUZyYW1lID0gc3A7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnZlcnRUZXh0dXJlVG9TcHJpdGVGcmFtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbSAmJiB0aGlzLnNwcml0ZUZyYW1lICYmICF0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlTcHJpdGVGcmFtZSh0aGlzLnNwcml0ZUZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9maWxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1pc3NDdXN0b21UZXh0dXJlID0gIXRoaXMuX2dldFRleHR1cmUoKTtcbiAgICAgICAgICAgICAgICBpZiAobWlzc0N1c3RvbVRleHR1cmUpIHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGF1dG8gcGxheVxuICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5T25Mb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFVwZ3JhZGUgY29sb3IgdHlwZSBmcm9tIHYyLjAuMFxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICEodGhpcy5fc3RhcnRDb2xvciBpbnN0YW5jZW9mIGNjLkNvbG9yKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvciA9IGNjLmNvbG9yKHRoaXMuX3N0YXJ0Q29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhciA9IGNjLmNvbG9yKHRoaXMuX3N0YXJ0Q29sb3JWYXIpO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IgPSBjYy5jb2xvcih0aGlzLl9lbmRDb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhciA9IGNjLmNvbG9yKHRoaXMuX2VuZENvbG9yVmFyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVtb3ZlT25GaW5pc2gpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZU9uRmluaXNoID0gZmFsc2U7ICAgIC8vIGFscmVhZHkgcmVtb3ZlZFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9idWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlc2V0IHV2IGRhdGEgc28gbmV4dCB0aW1lIHNpbXVsYXRvciB3aWxsIHJlZmlsbCBidWZmZXIgdXYgaW5mbyB3aGVuIGV4aXQgZWRpdCBtb2RlIGZyb20gcHJlZmFiLlxuICAgICAgICB0aGlzLl9zaW11bGF0b3IuX3V2RmlsbGVkID0gMDtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuICAgIFxuICAgIGxhdGVVcGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICghdGhpcy5fc2ltdWxhdG9yLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zaW11bGF0b3Iuc3RlcChkdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQVBJU1xuXG4gICAgLypcbiAgICAgKiAhI2VuIEFkZCBhIHBhcnRpY2xlIHRvIHRoZSBlbWl0dGVyLlxuICAgICAqICEjemgg5re75Yqg5LiA5Liq57KS5a2Q5Yiw5Y+R5bCE5Zmo5Lit44CCXG4gICAgICogQG1ldGhvZCBhZGRQYXJ0aWNsZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgYWRkUGFydGljbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gTm90IGltcGxlbWVudGVkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBlbWl0dGluZyBwYXJ0aWNsZXMuIFJ1bm5pbmcgcGFydGljbGVzIHdpbGwgY29udGludWUgdG8gcnVuIHVudGlsIHRoZXkgZGllLlxuICAgICAqICEjemgg5YGc5q2i5Y+R5bCE5Zmo5Y+R5bCE57KS5a2Q77yM5Y+R5bCE5Ye65Y6755qE57KS5a2Q5bCG57un57ut6L+Q6KGM77yM55u06Iez57KS5a2Q55Sf5ZG957uT5p2f44CCXG4gICAgICogQG1ldGhvZCBzdG9wU3lzdGVtXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBzdG9wIHBhcnRpY2xlIHN5c3RlbS5cbiAgICAgKiBteVBhcnRpY2xlU3lzdGVtLnN0b3BTeXN0ZW0oKTtcbiAgICAgKi9cbiAgICBzdG9wU3lzdGVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zaW11bGF0b3Iuc3RvcCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEtpbGwgYWxsIGxpdmluZyBwYXJ0aWNsZXMuXG4gICAgICogISN6aCDmnYDmrbvmiYDmnInlrZjlnKjnmoTnspLlrZDvvIznhLblkI7ph43mlrDlkK/liqjnspLlrZDlj5HlsITlmajjgIJcbiAgICAgKiBAbWV0aG9kIHJlc2V0U3lzdGVtXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBwbGF5IHBhcnRpY2xlIHN5c3RlbS5cbiAgICAgKiBteVBhcnRpY2xlU3lzdGVtLnJlc2V0U3lzdGVtKCk7XG4gICAgICovXG4gICAgcmVzZXRTeXN0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaW11bGF0b3IucmVzZXQoKTtcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZXRoZXIgb3Igbm90IHRoZSBzeXN0ZW0gaXMgZnVsbC5cbiAgICAgKiAhI3poIOWPkeWwhOWZqOS4reeykuWtkOaYr+WQpuWkp+S6juetieS6juiuvue9rueahOaAu+eykuWtkOaVsOmHj+OAglxuICAgICAqIEBtZXRob2QgaXNGdWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0Z1bGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhcnRpY2xlQ291bnQgPj0gdGhpcy50b3RhbFBhcnRpY2xlcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyBhIG5ldyB0ZXh0dXJlIHdpdGggYSByZWN0LiBUaGUgcmVjdCBpcyBpbiB0ZXh0dXJlIHBvc2l0aW9uIGFuZCBzaXplLlxuICAgICAqIFBsZWFzZSB1c2Ugc3ByaXRlRnJhbWUgcHJvcGVydHkgaW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBpcyBkZXByZWNhdGVkIHNpbmNlIHYxLjlcbiAgICAgKiAhI3poIOiuvue9ruS4gOW8oOaWsOi0tOWbvuWSjOWFs+iBlOeahOefqeW9ouOAglxuICAgICAqIOivt+ebtOaOpeiuvue9riBzcHJpdGVGcmFtZSDlsZ7mgKfvvIzov5nkuKrlh73mlbDku44gdjEuOSDniYjmnKzlvIDlp4vlt7Lnu4/ooqvlup/lvINcbiAgICAgKiBAbWV0aG9kIHNldFRleHR1cmVXaXRoUmVjdFxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjEuOVxuICAgICAqL1xuICAgIHNldFRleHR1cmVXaXRoUmVjdDogZnVuY3Rpb24gKHRleHR1cmUsIHJlY3QpIHtcbiAgICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSwgcmVjdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUFJJVkFURSBNRVRIT0RTXG5cbiAgICBfYXBwbHlGaWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBmaWxlID0gdGhpcy5fZmlsZTtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZShmaWxlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciB8fCAhZmlsZS5fbmF0aXZlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg2MDI5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5fcGxpc3RGaWxlID0gZmlsZS5uYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5pdFdpdGhEaWN0aW9uYXJ5KGZpbGUuX25hdGl2ZUFzc2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuX3Nwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZUZyYW1lID0gZmlsZS5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmLl9jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2luaXRUZXh0dXJlV2l0aERpY3Rpb25hcnkoZmlsZS5fbmF0aXZlQXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzZWxmLl9yZW5kZXJTcHJpdGVGcmFtZSAmJiBzZWxmLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hcHBseVNwcml0ZUZyYW1lKHNlbGYuc3ByaXRlRnJhbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5OiBmdW5jdGlvbiAoZGljdCkge1xuICAgICAgICBsZXQgaW1nUGF0aCA9IGNjLnBhdGguY2hhbmdlQmFzZW5hbWUodGhpcy5fcGxpc3RGaWxlLCBkaWN0W1widGV4dHVyZUZpbGVOYW1lXCJdIHx8ICcnKTtcbiAgICAgICAgLy8gdGV4dHVyZVxuICAgICAgICBpZiAoZGljdFtcInRleHR1cmVGaWxlTmFtZVwiXSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCB0aGUgdGV4dHVyZSBmcm9tIHRoZSBjYWNoZVxuICAgICAgICAgICAgdGV4dHVyZVV0aWwubG9hZEltYWdlKGltZ1BhdGgsIGZ1bmN0aW9uIChlcnJvciwgdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBkaWN0W1widGV4dHVyZUZpbGVOYW1lXCJdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5KGRpY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5hZGQoaW1nUGF0aCwgdGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGljdFtcInRleHR1cmVJbWFnZURhdGFcIl0pIHtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlRGF0YSA9IGRpY3RbXCJ0ZXh0dXJlSW1hZ2VEYXRhXCJdO1xuXG4gICAgICAgICAgICBpZiAodGV4dHVyZURhdGEgJiYgdGV4dHVyZURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZXggPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRleCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gY29kZWMudW56aXBCYXNlNjRBc0FycmF5KHRleHR1cmVEYXRhLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDYwMzApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdlRm9ybWF0ID0gZ2V0SW1hZ2VGb3JtYXRCeURhdGEoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5USUZGICYmIGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDYwMzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhc09iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlRm9ybWF0ID09PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15UG5nT2JqID0gbmV3IFBOR1JlYWRlcihidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlQbmdPYmoucmVuZGVyKGNhbnZhc09iaik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWZmUmVhZGVyLnBhcnNlVElGRihidWZmZXIsY2FudmFzT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXggPSB0ZXh0dXJlVXRpbC5jYWNoZUltYWdlKGltZ1BhdGgsIGNhbnZhc09iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghdGV4KVxuICAgICAgICAgICAgICAgICAgICBjYy5sb2dJRCg2MDMyKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVc2UgY2MuYXNzZXRNYW5hZ2VyIHRvIGxvYWQgYXN5bmNocm9ub3VzbHkgdGhlIFNwcml0ZUZyYW1lIG9iamVjdCwgYXZvaWQgdXNpbmcgdGV4dHVyZVV0aWxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8vIHBhcnNpbmcgcHJvY2Vzc1xuICAgIF9pbml0V2l0aERpY3Rpb25hcnk6IGZ1bmN0aW9uIChkaWN0KSB7XG4gICAgICAgIHRoaXMudG90YWxQYXJ0aWNsZXMgPSBwYXJzZUludChkaWN0W1wibWF4UGFydGljbGVzXCJdIHx8IDApO1xuXG4gICAgICAgIC8vIGxpZmUgc3BhblxuICAgICAgICB0aGlzLmxpZmUgPSBwYXJzZUZsb2F0KGRpY3RbXCJwYXJ0aWNsZUxpZmVzcGFuXCJdIHx8IDApO1xuICAgICAgICB0aGlzLmxpZmVWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJwYXJ0aWNsZUxpZmVzcGFuVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gZW1pc3Npb24gUmF0ZVxuICAgICAgICBsZXQgX3RlbXBFbWlzc2lvblJhdGUgPSBkaWN0W1wiZW1pc3Npb25SYXRlXCJdO1xuICAgICAgICBpZiAoX3RlbXBFbWlzc2lvblJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pc3Npb25SYXRlID0gX3RlbXBFbWlzc2lvblJhdGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVtaXNzaW9uUmF0ZSA9IE1hdGgubWluKHRoaXMudG90YWxQYXJ0aWNsZXMgLyB0aGlzLmxpZmUsIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVyYXRpb25cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IHBhcnNlRmxvYXQoZGljdFtcImR1cmF0aW9uXCJdIHx8IDApO1xuXG4gICAgICAgIC8vIGJsZW5kIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuc3JjQmxlbmRGYWN0b3IgPSBwYXJzZUludChkaWN0W1wiYmxlbmRGdW5jU291cmNlXCJdIHx8IG1hY3JvLlNSQ19BTFBIQSk7XG4gICAgICAgIHRoaXMuZHN0QmxlbmRGYWN0b3IgPSBwYXJzZUludChkaWN0W1wiYmxlbmRGdW5jRGVzdGluYXRpb25cIl0gfHwgbWFjcm8uT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICAgICAgLy8gY29sb3JcbiAgICAgICAgbGV0IGxvY1N0YXJ0Q29sb3IgPSB0aGlzLl9zdGFydENvbG9yO1xuICAgICAgICBsb2NTdGFydENvbG9yLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yLmcgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yR3JlZW5cIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY1N0YXJ0Q29sb3IuYiA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JCbHVlXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgbGV0IGxvY1N0YXJ0Q29sb3JWYXIgPSB0aGlzLl9zdGFydENvbG9yVmFyO1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VSZWRcIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY1N0YXJ0Q29sb3JWYXIuZyA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLmIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VCbHVlXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VBbHBoYVwiXSB8fCAwKSAqIDI1NTtcblxuICAgICAgICBsZXQgbG9jRW5kQ29sb3IgPSB0aGlzLl9lbmRDb2xvcjtcbiAgICAgICAgbG9jRW5kQ29sb3IuciA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JHcmVlblwiXSB8fCAwKSAqIDI1NTtcbiAgICAgICAgbG9jRW5kQ29sb3IuYiA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yQmx1ZVwiXSB8fCAwKSAqIDI1NTtcbiAgICAgICAgbG9jRW5kQ29sb3IuYSA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgbGV0IGxvY0VuZENvbG9yVmFyID0gdGhpcy5fZW5kQ29sb3JWYXI7XG4gICAgICAgIGxvY0VuZENvbG9yVmFyLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclZhcmlhbmNlUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvclZhci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvclZhci5iID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUJsdWVcIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY0VuZENvbG9yVmFyLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclZhcmlhbmNlQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgLy8gcGFydGljbGUgc2l6ZVxuICAgICAgICB0aGlzLnN0YXJ0U2l6ZSA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0UGFydGljbGVTaXplXCJdIHx8IDApO1xuICAgICAgICB0aGlzLnN0YXJ0U2l6ZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0UGFydGljbGVTaXplVmFyaWFuY2VcIl0gfHwgMCk7XG4gICAgICAgIHRoaXMuZW5kU2l6ZSA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaFBhcnRpY2xlU2l6ZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5lbmRTaXplVmFyID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoUGFydGljbGVTaXplVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gcG9zaXRpb25cbiAgICAgICAgLy8gTWFrZSBlbXB0eSBwb3NpdGlvblR5cGUgdmFsdWUgYW5kIG9sZCB2ZXJzaW9uIGNvbXBhdGlibGVcbiAgICAgICAgdGhpcy5wb3NpdGlvblR5cGUgPSBwYXJzZUZsb2F0KGRpY3RbJ3Bvc2l0aW9uVHlwZSddICE9PSB1bmRlZmluZWQgPyBkaWN0Wydwb3NpdGlvblR5cGUnXSA6IFBvc2l0aW9uVHlwZS5SRUxBVElWRSk7XG4gICAgICAgIC8vIGZvciBcbiAgICAgICAgdGhpcy5zb3VyY2VQb3MueCA9IDA7XG4gICAgICAgIHRoaXMuc291cmNlUG9zLnkgPSAwO1xuICAgICAgICB0aGlzLnBvc1Zhci54ID0gcGFyc2VGbG9hdChkaWN0W1wic291cmNlUG9zaXRpb25WYXJpYW5jZXhcIl0gfHwgMCk7XG4gICAgICAgIHRoaXMucG9zVmFyLnkgPSBwYXJzZUZsb2F0KGRpY3RbXCJzb3VyY2VQb3NpdGlvblZhcmlhbmNleVwiXSB8fCAwKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGFuZ2xlXG4gICAgICAgIHRoaXMuYW5nbGUgPSBwYXJzZUZsb2F0KGRpY3RbXCJhbmdsZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5hbmdsZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcImFuZ2xlVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gU3Bpbm5pbmdcbiAgICAgICAgdGhpcy5zdGFydFNwaW4gPSBwYXJzZUZsb2F0KGRpY3RbXCJyb3RhdGlvblN0YXJ0XCJdIHx8IDApO1xuICAgICAgICB0aGlzLnN0YXJ0U3BpblZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uU3RhcnRWYXJpYW5jZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5lbmRTcGluID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRpb25FbmRcIl0gfHwgMCk7XG4gICAgICAgIHRoaXMuZW5kU3BpblZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uRW5kVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgdGhpcy5lbWl0dGVyTW9kZSA9IHBhcnNlSW50KGRpY3RbXCJlbWl0dGVyVHlwZVwiXSB8fCBFbWl0dGVyTW9kZS5HUkFWSVRZKTtcblxuICAgICAgICAvLyBNb2RlIEE6IEdyYXZpdHkgKyB0YW5nZW50aWFsIGFjY2VsICsgcmFkaWFsIGFjY2VsXG4gICAgICAgIGlmICh0aGlzLmVtaXR0ZXJNb2RlID09PSBFbWl0dGVyTW9kZS5HUkFWSVRZKSB7XG4gICAgICAgICAgICAvLyBncmF2aXR5XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkueCA9IHBhcnNlRmxvYXQoZGljdFtcImdyYXZpdHl4XCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5LnkgPSBwYXJzZUZsb2F0KGRpY3RbXCJncmF2aXR5eVwiXSB8fCAwKTtcblxuICAgICAgICAgICAgLy8gc3BlZWRcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBwYXJzZUZsb2F0KGRpY3RbXCJzcGVlZFwiXSB8fCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzcGVlZFZhcmlhbmNlXCJdIHx8IDApO1xuXG4gICAgICAgICAgICAvLyByYWRpYWwgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICB0aGlzLnJhZGlhbEFjY2VsID0gcGFyc2VGbG9hdChkaWN0W1wicmFkaWFsQWNjZWxlcmF0aW9uXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yYWRpYWxBY2NlbFZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJhZGlhbEFjY2VsVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgICAgIC8vIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICB0aGlzLnRhbmdlbnRpYWxBY2NlbCA9IHBhcnNlRmxvYXQoZGljdFtcInRhbmdlbnRpYWxBY2NlbGVyYXRpb25cIl0gfHwgMCk7XG4gICAgICAgICAgICB0aGlzLnRhbmdlbnRpYWxBY2NlbFZhciA9IHBhcnNlRmxvYXQoZGljdFtcInRhbmdlbnRpYWxBY2NlbFZhcmlhbmNlXCJdIHx8IDApO1xuXG4gICAgICAgICAgICAvLyByb3RhdGlvbiBpcyBkaXJcbiAgICAgICAgICAgIGxldCBsb2NSb3RhdGlvbklzRGlyID0gZGljdFtcInJvdGF0aW9uSXNEaXJcIl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGlmIChsb2NSb3RhdGlvbklzRGlyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbG9jUm90YXRpb25Jc0RpciA9IGxvY1JvdGF0aW9uSXNEaXIudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb25Jc0RpciA9IChsb2NSb3RhdGlvbklzRGlyID09PSBcInRydWVcIiB8fCBsb2NSb3RhdGlvbklzRGlyID09PSBcIjFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uSXNEaXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVtaXR0ZXJNb2RlID09PSBFbWl0dGVyTW9kZS5SQURJVVMpIHtcbiAgICAgICAgICAgIC8vIG9yIE1vZGUgQjogcmFkaXVzIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UmFkaXVzID0gcGFyc2VGbG9hdChkaWN0W1wibWF4UmFkaXVzXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5zdGFydFJhZGl1c1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcIm1heFJhZGl1c1ZhcmlhbmNlXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5lbmRSYWRpdXMgPSBwYXJzZUZsb2F0KGRpY3RbXCJtaW5SYWRpdXNcIl0gfHwgMCk7XG4gICAgICAgICAgICB0aGlzLmVuZFJhZGl1c1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcIm1pblJhZGl1c1ZhcmlhbmNlXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVQZXJTID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRlUGVyU2Vjb25kXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVQZXJTVmFyID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRlUGVyU2Vjb25kVmFyaWFuY2VcIl0gfHwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoNjAwOSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5KGRpY3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9nZXRUZXh0dXJlKCk7XG4gICAgICAgIGlmICghdGV4dHVyZSB8fCAhdGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcblxuICAgIF9vblRleHR1cmVMb2FkZWQgKCkge1xuICAgICAgICB0aGlzLl9zaW11bGF0b3IudXBkYXRlVVZzKHRydWUpO1xuICAgICAgICB0aGlzLl9zeW5jQXNwZWN0KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICB9LFxuXG4gICAgX3N5bmNBc3BlY3QgKCkge1xuICAgICAgICBsZXQgZnJhbWVSZWN0ID0gdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUuX3JlY3Q7XG4gICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gZnJhbWVSZWN0LndpZHRoIC8gZnJhbWVSZWN0LmhlaWdodDtcbiAgICB9LFxuXG4gICAgX2FwcGx5U3ByaXRlRnJhbWUgKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSA9IHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lIHx8IHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblRleHR1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lLm9uVGV4dHVyZUxvYWRlZCh0aGlzLl9vblRleHR1cmVMb2FkZWQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRUZXh0dXJlICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSAmJiB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCkpIHx8IHRoaXMuX3RleHR1cmU7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIG1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgdGhpcy5fcG9zaXRpb25UeXBlICE9PSBQb3NpdGlvblR5cGUuRlJFRSk7XG4gICAgICAgIG1hdGVyaWFsLnNldFByb3BlcnR5KCd0ZXh0dXJlJywgdGhpcy5fZ2V0VGV4dHVyZSgpKTtcblxuICAgICAgICBCbGVuZEZ1bmMucHJvdG90eXBlLl91cGRhdGVNYXRlcmlhbC5jYWxsKHRoaXMpO1xuICAgIH0sXG4gICAgXG4gICAgX2ZpbmlzaGVkU2ltdWxhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3ICYmIHRoaXMuX2ZvY3VzZWQgJiYgIXRoaXMuYWN0aXZlICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTeXN0ZW0oKTtcbiAgICAgICAgdGhpcy5zdG9wU3lzdGVtKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVtb3ZlT25GaW5pc2ggJiYgdGhpcy5fc3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5QYXJ0aWNsZVN5c3RlbSA9IG1vZHVsZS5leHBvcnRzID0gUGFydGljbGVTeXN0ZW07XG5cbiJdLCJzb3VyY2VSb290IjoiLyJ9