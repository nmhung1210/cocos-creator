
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

      this._applySpriteFrame(lastSprite);

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
            cc.warnID(6030, this._file.name);
            return false;
          }

          var imageFormat = getImageFormatByData(buffer);

          if (imageFormat !== macro.ImageFormat.TIFF && imageFormat !== macro.ImageFormat.PNG) {
            cc.warnID(6031, this._file.name);
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

        if (!tex) cc.warnID(6032, this._file.name); // TODO: Use cc.assetManager to load asynchronously the SpriteFrame object, avoid using textureUtil

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9wYXJ0aWNsZS9DQ1BhcnRpY2xlU3lzdGVtLmpzIl0sIm5hbWVzIjpbIm1hY3JvIiwicmVxdWlyZSIsIlBhcnRpY2xlQXNzZXQiLCJSZW5kZXJDb21wb25lbnQiLCJjb2RlYyIsIlBOR1JlYWRlciIsInRpZmZSZWFkZXIiLCJ0ZXh0dXJlVXRpbCIsIlJlbmRlckZsb3ciLCJQYXJ0aWNsZVNpbXVsYXRvciIsIk1hdGVyaWFsIiwiQmxlbmRGdW5jIiwiZ2V0SW1hZ2VGb3JtYXRCeURhdGEiLCJpbWdEYXRhIiwibGVuZ3RoIiwiSW1hZ2VGb3JtYXQiLCJQTkciLCJUSUZGIiwiVU5LTk9XTiIsImdldFBhcnRpY2xlQ29tcG9uZW50cyIsIm5vZGUiLCJwYXJlbnQiLCJjb21wIiwiZ2V0Q29tcG9uZW50IiwiY2MiLCJQYXJ0aWNsZVN5c3RlbSIsImdldENvbXBvbmVudHNJbkNoaWxkcmVuIiwiRW1pdHRlck1vZGUiLCJFbnVtIiwiR1JBVklUWSIsIlJBRElVUyIsIlBvc2l0aW9uVHlwZSIsIkZSRUUiLCJSRUxBVElWRSIsIkdST1VQRUQiLCJwcm9wZXJ0aWVzIiwicHJldmlldyIsImVkaXRvck9ubHkiLCJub3RpZnkiLCJDQ19FRElUT1IiLCJyZXNldFN5c3RlbSIsInN0b3BTeXN0ZW0iLCJkaXNhYmxlUmVuZGVyIiwiZW5naW5lIiwicmVwYWludEluRWRpdE1vZGUiLCJhbmltYXRhYmxlIiwidG9vbHRpcCIsIkNDX0RFViIsIl9jdXN0b20iLCJjdXN0b20iLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsIl9maWxlIiwid2FybklEIiwiX2FwcGx5RmlsZSIsInR5cGUiLCJmaWxlIiwiZm9yY2UiLCJfc3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsInNwcml0ZUZyYW1lIiwibGFzdFNwcml0ZSIsIl9yZW5kZXJTcHJpdGVGcmFtZSIsIl91dWlkIiwiX2FwcGx5U3ByaXRlRnJhbWUiLCJlbWl0IiwiX3RleHR1cmUiLCJUZXh0dXJlMkQiLCJ0ZXh0dXJlIiwiX2dldFRleHR1cmUiLCJyZWFkb25seSIsInZpc2libGUiLCJwYXJ0aWNsZUNvdW50IiwiX3NpbXVsYXRvciIsInBhcnRpY2xlcyIsIl9zdG9wcGVkIiwic3RvcHBlZCIsInBsYXlPbkxvYWQiLCJhdXRvUmVtb3ZlT25GaW5pc2giLCJhY3RpdmUiLCJ0b3RhbFBhcnRpY2xlcyIsImR1cmF0aW9uIiwiZW1pc3Npb25SYXRlIiwibGlmZSIsImxpZmVWYXIiLCJfc3RhcnRDb2xvciIsInN0YXJ0Q29sb3IiLCJDb2xvciIsInZhbCIsInIiLCJnIiwiYiIsImEiLCJfc3RhcnRDb2xvclZhciIsInN0YXJ0Q29sb3JWYXIiLCJfZW5kQ29sb3IiLCJlbmRDb2xvciIsIl9lbmRDb2xvclZhciIsImVuZENvbG9yVmFyIiwiYW5nbGUiLCJhbmdsZVZhciIsInN0YXJ0U2l6ZSIsInN0YXJ0U2l6ZVZhciIsImVuZFNpemUiLCJlbmRTaXplVmFyIiwic3RhcnRTcGluIiwic3RhcnRTcGluVmFyIiwiZW5kU3BpbiIsImVuZFNwaW5WYXIiLCJzb3VyY2VQb3MiLCJWZWMyIiwiWkVSTyIsInBvc1ZhciIsIl9wb3NpdGlvblR5cGUiLCJmb3JtZXJseVNlcmlhbGl6ZWRBcyIsInBvc2l0aW9uVHlwZSIsIl91cGRhdGVNYXRlcmlhbCIsImVtaXR0ZXJNb2RlIiwiZ3Jhdml0eSIsInNwZWVkIiwic3BlZWRWYXIiLCJ0YW5nZW50aWFsQWNjZWwiLCJ0YW5nZW50aWFsQWNjZWxWYXIiLCJyYWRpYWxBY2NlbCIsInJhZGlhbEFjY2VsVmFyIiwicm90YXRpb25Jc0RpciIsInN0YXJ0UmFkaXVzIiwic3RhcnRSYWRpdXNWYXIiLCJlbmRSYWRpdXMiLCJlbmRSYWRpdXNWYXIiLCJyb3RhdGVQZXJTIiwicm90YXRlUGVyU1ZhciIsIkNsYXNzIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIm1lbnUiLCJpbnNwZWN0b3IiLCJwbGF5T25Gb2N1cyIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiY3RvciIsImluaXRQcm9wZXJ0aWVzIiwiX3ByZXZpZXdUaW1lciIsIl9mb2N1c2VkIiwiX2FzcGVjdFJhdGlvIiwiY29sb3IiLCJzdGF0aWNzIiwiRFVSQVRJT05fSU5GSU5JVFkiLCJTVEFSVF9TSVpFX0VRVUFMX1RPX0VORF9TSVpFIiwiU1RBUlRfUkFESVVTX0VRVUFMX1RPX0VORF9SQURJVVMiLCJfUE5HUmVhZGVyIiwiX1RJRkZSZWFkZXIiLCJvbkZvY3VzSW5FZGl0b3IiLCJjb21wb25lbnRzIiwiaSIsIl9zdGFydFByZXZpZXciLCJvbkxvc3RGb2N1c0luRWRpdG9yIiwiX3N0b3BQcmV2aWV3IiwiY2xlYXJJbnRlcnZhbCIsIl9jb252ZXJ0VGV4dHVyZVRvU3ByaXRlRnJhbWUiLCJfdGhpcyIsIkVkaXRvciIsImFzc2V0ZGIiLCJxdWVyeU1ldGFJbmZvQnlVdWlkIiwiZXJyIiwibWV0YUluZm8iLCJlcnJvciIsIm1ldGEiLCJKU09OIiwicGFyc2UiLCJqc29uIiwiTm9kZVV0aWxzIiwibm9kZVBhdGgiLCJnZXROb2RlUGF0aCIsIndhcm4iLCJhc3NldFVybCIsIlVybCIsImJhc2VuYW1lTm9FeHQiLCJhc3NldFBhdGgiLCJ1dWlkIiwic3ViTWV0YXMiLCJhc3NldE1hbmFnZXIiLCJsb2FkQW55Iiwic3AiLCJfX3ByZWxvYWQiLCJfc3VwZXIiLCJtaXNzQ3VzdG9tVGV4dHVyZSIsImlzUGxheWluZyIsIm9uRGVzdHJveSIsIl9idWZmZXIiLCJkZXN0cm95IiwiX3V2RmlsbGVkIiwibGF0ZVVwZGF0ZSIsImR0IiwiZmluaXNoZWQiLCJzdGVwIiwiYWRkUGFydGljbGUiLCJzdG9wIiwicmVzZXQiLCJtYXJrRm9yUmVuZGVyIiwiaXNGdWxsIiwic2V0VGV4dHVyZVdpdGhSZWN0IiwicmVjdCIsInNlbGYiLCJwb3N0TG9hZE5hdGl2ZSIsIl9uYXRpdmVBc3NldCIsImVycm9ySUQiLCJpc1ZhbGlkIiwiX3BsaXN0RmlsZSIsIm5hdGl2ZVVybCIsIl9pbml0V2l0aERpY3Rpb25hcnkiLCJfaW5pdFRleHR1cmVXaXRoRGljdGlvbmFyeSIsImRpY3QiLCJpbWdQYXRoIiwicGF0aCIsImNoYW5nZUJhc2VuYW1lIiwibG9hZEltYWdlIiwidW5kZWZpbmVkIiwiYXNzZXRzIiwiYWRkIiwidGV4dHVyZURhdGEiLCJ0ZXgiLCJidWZmZXIiLCJ1bnppcEJhc2U2NEFzQXJyYXkiLCJpbWFnZUZvcm1hdCIsImNhbnZhc09iaiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm15UG5nT2JqIiwicmVuZGVyIiwicGFyc2VUSUZGIiwiY2FjaGVJbWFnZSIsInBhcnNlSW50IiwicGFyc2VGbG9hdCIsIl90ZW1wRW1pc3Npb25SYXRlIiwiTWF0aCIsIm1pbiIsIk51bWJlciIsIk1BWF9WQUxVRSIsInNyY0JsZW5kRmFjdG9yIiwiU1JDX0FMUEhBIiwiZHN0QmxlbmRGYWN0b3IiLCJPTkVfTUlOVVNfU1JDX0FMUEhBIiwibG9jU3RhcnRDb2xvciIsImxvY1N0YXJ0Q29sb3JWYXIiLCJsb2NFbmRDb2xvciIsImxvY0VuZENvbG9yVmFyIiwieCIsInkiLCJsb2NSb3RhdGlvbklzRGlyIiwidG9TdHJpbmciLCJ0b0xvd2VyQ2FzZSIsIl92YWxpZGF0ZVJlbmRlciIsImxvYWRlZCIsIl9vblRleHR1cmVMb2FkZWQiLCJ1cGRhdGVVVnMiLCJfc3luY0FzcGVjdCIsImZyYW1lUmVjdCIsIl9yZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJ0ZXh0dXJlTG9hZGVkIiwib25UZXh0dXJlTG9hZGVkIiwiZ2V0VGV4dHVyZSIsIm1hdGVyaWFsIiwiZ2V0TWF0ZXJpYWwiLCJkZWZpbmUiLCJzZXRQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNhbGwiLCJfZmluaXNoZWRTaW11bGF0aW9uIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLDBCQUFELENBQXJCOztBQUNBLElBQU1DLGFBQWEsR0FBR0QsT0FBTyxDQUFDLG1CQUFELENBQTdC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RSxNQUFULENBQWdCLGNBQWhCLEVBQWdDLEtBQUt6SixhQUFMLEtBQXVCbkYsWUFBWSxDQUFDQyxJQUFwRTtBQUNBeU8sSUFBQUEsUUFBUSxDQUFDRyxXQUFULENBQXFCLFNBQXJCLEVBQWdDLEtBQUt0TSxXQUFMLEVBQWhDOztBQUVBM0QsSUFBQUEsU0FBUyxDQUFDa1EsU0FBVixDQUFvQnhKLGVBQXBCLENBQW9DeUosSUFBcEMsQ0FBeUMsSUFBekM7QUFDSCxHQXZnQnlCO0FBeWdCMUJDLEVBQUFBLG1CQUFtQixFQUFFLCtCQUFZO0FBQzdCLFFBQUl4TyxTQUFKLEVBQWU7QUFDWCxVQUFJLEtBQUtILE9BQUwsSUFBZ0IsS0FBSzRHLFFBQXJCLElBQWlDLENBQUMsS0FBS2hFLE1BQXZDLElBQWlELENBQUN4RCxFQUFFLENBQUNtQixNQUFILENBQVVpSixTQUFoRSxFQUEyRTtBQUN2RSxhQUFLcEosV0FBTDtBQUNIOztBQUNEO0FBQ0g7O0FBQ0QsU0FBS0EsV0FBTDtBQUNBLFNBQUtDLFVBQUw7QUFDQSxTQUFLQyxhQUFMOztBQUNBLFFBQUksS0FBS3FDLGtCQUFMLElBQTJCLEtBQUtILFFBQXBDLEVBQThDO0FBQzFDLFdBQUt4RCxJQUFMLENBQVUySyxPQUFWO0FBQ0g7QUFDSjtBQXRoQnlCLENBQVQsQ0FBckI7QUF5aEJBdkssRUFBRSxDQUFDQyxjQUFILEdBQW9CdVAsTUFBTSxDQUFDQyxPQUFQLEdBQWlCeFAsY0FBckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi4vY29yZS9wbGF0Zm9ybS9DQ01hY3JvJyk7XG5jb25zdCBQYXJ0aWNsZUFzc2V0ID0gcmVxdWlyZSgnLi9DQ1BhcnRpY2xlQXNzZXQnKTtcbmNvbnN0IFJlbmRlckNvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2NvcmUvY29tcG9uZW50cy9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgY29kZWMgPSByZXF1aXJlKCcuLi9jb21wcmVzc2lvbi9aaXBVdGlscycpO1xuY29uc3QgUE5HUmVhZGVyID0gcmVxdWlyZSgnLi9DQ1BOR1JlYWRlcicpO1xuY29uc3QgdGlmZlJlYWRlciA9IHJlcXVpcmUoJy4vQ0NUSUZGUmVhZGVyJyk7XG5jb25zdCB0ZXh0dXJlVXRpbCA9IHJlcXVpcmUoJy4uL2NvcmUvdXRpbHMvdGV4dHVyZS11dGlsJyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuY29uc3QgUGFydGljbGVTaW11bGF0b3IgPSByZXF1aXJlKCcuL3BhcnRpY2xlLXNpbXVsYXRvcicpO1xuY29uc3QgTWF0ZXJpYWwgPSByZXF1aXJlKCcuLi9jb3JlL2Fzc2V0cy9tYXRlcmlhbC9DQ01hdGVyaWFsJyk7XG5jb25zdCBCbGVuZEZ1bmMgPSByZXF1aXJlKCcuLi9jb3JlL3V0aWxzL2JsZW5kLWZ1bmMnKTtcblxuZnVuY3Rpb24gZ2V0SW1hZ2VGb3JtYXRCeURhdGEgKGltZ0RhdGEpIHtcbiAgICAvLyBpZiBpdCBpcyBhIHBuZyBmaWxlIGJ1ZmZlci5cbiAgICBpZiAoaW1nRGF0YS5sZW5ndGggPiA4ICYmIGltZ0RhdGFbMF0gPT09IDB4ODlcbiAgICAgICAgJiYgaW1nRGF0YVsxXSA9PT0gMHg1MFxuICAgICAgICAmJiBpbWdEYXRhWzJdID09PSAweDRFXG4gICAgICAgICYmIGltZ0RhdGFbM10gPT09IDB4NDdcbiAgICAgICAgJiYgaW1nRGF0YVs0XSA9PT0gMHgwRFxuICAgICAgICAmJiBpbWdEYXRhWzVdID09PSAweDBBXG4gICAgICAgICYmIGltZ0RhdGFbNl0gPT09IDB4MUFcbiAgICAgICAgJiYgaW1nRGF0YVs3XSA9PT0gMHgwQSkge1xuICAgICAgICByZXR1cm4gbWFjcm8uSW1hZ2VGb3JtYXQuUE5HO1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGlzIGEgdGlmZiBmaWxlIGJ1ZmZlci5cbiAgICBpZiAoaW1nRGF0YS5sZW5ndGggPiAyICYmICgoaW1nRGF0YVswXSA9PT0gMHg0OSAmJiBpbWdEYXRhWzFdID09PSAweDQ5KVxuICAgICAgICB8fCAoaW1nRGF0YVswXSA9PT0gMHg0ZCAmJiBpbWdEYXRhWzFdID09PSAweDRkKVxuICAgICAgICB8fCAoaW1nRGF0YVswXSA9PT0gMHhmZiAmJiBpbWdEYXRhWzFdID09PSAweGQ4KSkpIHtcbiAgICAgICAgcmV0dXJuIG1hY3JvLkltYWdlRm9ybWF0LlRJRkY7XG4gICAgfVxuICAgIHJldHVybiBtYWNyby5JbWFnZUZvcm1hdC5VTktOT1dOO1xufVxuXG4vL1xuZnVuY3Rpb24gZ2V0UGFydGljbGVDb21wb25lbnRzIChub2RlKSB7XG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50LCBjb21wID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pO1xuICAgIGlmICghcGFyZW50IHx8ICFjb21wKSB7XG4gICAgICAgIHJldHVybiBub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldFBhcnRpY2xlQ29tcG9uZW50cyhwYXJlbnQpO1xufVxuXG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBlbWl0dGVyIG1vZGVzXG4gKiAhI3poIOWPkeWwhOaooeW8j1xuICogQGVudW0gUGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGVcbiAqL1xudmFyIEVtaXR0ZXJNb2RlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBVc2VzIGdyYXZpdHksIHNwZWVkLCByYWRpYWwgYW5kIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uLlxuICAgICAqICEjemgg6YeN5Yqb5qih5byP77yM5qih5ouf6YeN5Yqb77yM5Y+v6K6p57KS5a2Q5Zu057uV5LiA5Liq5Lit5b+D54K556e76L+R5oiW56e76L+c44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEdSQVZJVFlcbiAgICAgKi9cbiAgICBHUkFWSVRZOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVXNlcyByYWRpdXMgbW92ZW1lbnQgKyByb3RhdGlvbi5cbiAgICAgKiAhI3poIOWNiuW+hOaooeW8j++8jOWPr+S7peS9v+eykuWtkOS7peWchuWciOaWueW8j+aXi+i9rO+8jOWug+S5n+WPr+S7peWIm+mAoOieuuaXi+aViOaenOiuqeeykuWtkOaApemAn+WJjei/m+aIluWQjumAgOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSQURJVVMgLSBVc2VzIHJhZGl1cyBtb3ZlbWVudCArIHJvdGF0aW9uLlxuICAgICAqL1xuICAgIFJBRElVUzogMVxufSk7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBwYXJ0aWNsZXMgbW92ZW1lbnQgdHlwZS5cbiAqICEjemgg57KS5a2Q5L2N572u57G75Z6LXG4gKiBAZW51bSBQYXJ0aWNsZVN5c3RlbS5Qb3NpdGlvblR5cGVcbiAqL1xudmFyIFBvc2l0aW9uVHlwZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBMaXZpbmcgcGFydGljbGVzIGFyZSBhdHRhY2hlZCB0byB0aGUgd29ybGQgYW5kIGFyZSB1bmFmZmVjdGVkIGJ5IGVtaXR0ZXIgcmVwb3NpdGlvbmluZy5cbiAgICAgKiAhI3poXG4gICAgICog6Ieq55Sx5qih5byP77yM55u45a+55LqO5LiW55WM5Z2Q5qCH77yM5LiN5Lya6ZqP57KS5a2Q6IqC54K556e75Yqo6ICM56e75Yqo44CC77yI5Y+v5Lqn55Sf54Gr54Sw44CB6JK45rG9562J5pWI5p6c77yJXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEZSRUVcbiAgICAgKi9cbiAgICBGUkVFOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluIHRoZSByZWxhdGl2ZSBtb2RlLCB0aGUgcGFydGljbGUgd2lsbCBtb3ZlIHdpdGggdGhlIHBhcmVudCBub2RlLCBidXQgbm90IHdpdGggdGhlIG5vZGUgd2hlcmUgdGhlIHBhcnRpY2xlIGlzLiBcbiAgICAgKiBGb3IgZXhhbXBsZSwgdGhlIGNvZmZlZSBpbiB0aGUgY3VwIGlzIHN0ZWFtaW5nLiBUaGVuIHRoZSBzdGVhbSBtb3ZlcyAoZm9yd2FyZCkgd2l0aCB0aGUgdHJhaW4sIHJhdGhlciB0aGFuIG1vdmVzIHdpdGggdGhlIGN1cC5cbiAgICAgKiAhI3poXG4gICAgICog55u45a+55qih5byP77yM57KS5a2Q5Lya6Lef6ZqP54i26IqC54K556e75Yqo77yM5L2G5LiN6Lef6ZqP57KS5a2Q5omA5Zyo6IqC54K556e75Yqo77yM5L6L5aaC5Zyo5LiA5YiX6KGM6L+b54Gr6L2m5Lit77yM5p2v5Lit55qE5ZKW5ZWh6aOY6LW36Zu+5rCU77yMXG4gICAgICog5p2v5a2Q56e75Yqo77yM6Zu+5rCU5pW05L2T5bm25LiN5Lya6ZqP552A5p2v5a2Q56e75Yqo77yM5L2G5LuO54Gr6L2m5pW05L2T55qE6KeS5bqm5p2l55yL77yM6Zu+5rCU5pW05L2T5Lya6ZqP552A54Gr6L2m56e75Yqo44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFTEFUSVZFXG4gICAgICovXG4gICAgUkVMQVRJVkU6IDEsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTGl2aW5nIHBhcnRpY2xlcyBhcmUgYXR0YWNoZWQgdG8gdGhlIGVtaXR0ZXIgYW5kIGFyZSB0cmFuc2xhdGVkIGFsb25nIHdpdGggaXQuXG4gICAgICogISN6aFxuICAgICAqIOaVtOe7hOaooeW8j++8jOeykuWtkOi3n+maj+WPkeWwhOWZqOenu+WKqOOAgu+8iOS4jeS8muWPkeeUn+aLluWwvu+8iVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHUk9VUEVEXG4gICAgICovXG4gICAgR1JPVVBFRDogMlxufSk7XG5cbi8qKlxuICogQGNsYXNzIFBhcnRpY2xlU3lzdGVtXG4gKi9cblxudmFyIHByb3BlcnRpZXMgPSB7XG4gICAgLyoqXG4gICAgICogISNlbiBQbGF5IHBhcnRpY2xlIGluIGVkaXQgbW9kZS5cbiAgICAgKiAhI3poIOWcqOe8lui+keWZqOaooeW8j+S4i+mihOiniOeykuWtkO+8jOWQr+eUqOWQjumAieS4reeykuWtkOaXtu+8jOeykuWtkOWwhuiHquWKqOaSreaUvuOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJldmlld1xuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcHJldmlldzoge1xuICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICBub3RpZnk6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgICAgICBpZiAoICF0aGlzLnByZXZpZXcgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wU3lzdGVtKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFydGljbGVfc3lzdGVtLnByZXZpZXcnXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJZiBzZXQgY3VzdG9tIHRvIHRydWUsIHRoZW4gdXNlIGN1c3RvbSBwcm9wZXJ0aWVzIGluc3RlYWRvZiByZWFkIHBhcnRpY2xlIGZpbGUuXG4gICAgICogISN6aCDmmK/lkKboh6rlrprkuYnnspLlrZDlsZ7mgKfjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGN1c3RvbVxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgX2N1c3RvbTogZmFsc2UsXG4gICAgY3VzdG9tOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1c3RvbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgIXZhbHVlICYmICF0aGlzLl9maWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLndhcm5JRCg2MDAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXN0b20gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICBjYy5lbmdpbmUucmVwYWludEluRWRpdE1vZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5jdXN0b20nXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBsaXN0IGZpbGUuXG4gICAgICogISN6aCBwbGlzdCDmoLzlvI/nmoTnspLlrZDphY3nva7mlofku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1BhcnRpY2xlQXNzZXR9IGZpbGVcbiAgICAgKiBAZGVmYXVsdCBudWxsXG4gICAgICovXG4gICAgX2ZpbGU6IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogUGFydGljbGVBc3NldFxuICAgIH0sXG4gICAgZmlsZToge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSwgZm9yY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9maWxlICE9PSB2YWx1ZSB8fCAoQ0NfRURJVE9SICYmIGZvcmNlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwbHlGaWxlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVuZ2luZS5yZXBhaW50SW5FZGl0TW9kZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdHlwZTogUGFydGljbGVBc3NldCxcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYXJ0aWNsZV9zeXN0ZW0uZmlsZSdcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTcHJpdGVGcmFtZSB1c2VkIGZvciBwYXJ0aWNsZXMgZGlzcGxheVxuICAgICAqICEjemgg55So5LqO57KS5a2Q5ZGI546w55qEIFNwcml0ZUZyYW1lXG4gICAgICogQHByb3BlcnR5IHNwcml0ZUZyYW1lXG4gICAgICogQHR5cGUge1Nwcml0ZUZyYW1lfVxuICAgICAqL1xuICAgIF9zcHJpdGVGcmFtZToge1xuICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgIH0sXG4gICAgc3ByaXRlRnJhbWU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ByaXRlRnJhbWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlLCBmb3JjZSkge1xuICAgICAgICAgICAgdmFyIGxhc3RTcHJpdGUgPSB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmIGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFNwcml0ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUuX3V1aWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVGcmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hcHBseVNwcml0ZUZyYW1lKGxhc3RTcHJpdGUpO1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KCdzcHJpdGVmcmFtZS1jaGFuZ2VkJywgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS5zcHJpdGVGcmFtZSdcbiAgICB9LFxuXG5cbiAgICAvLyBqdXN0IHVzZWQgdG8gcmVhZCBkYXRhIGZyb20gMS54XG4gICAgX3RleHR1cmU6IHtcbiAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRleHR1cmUgb2YgUGFydGljbGUgU3lzdGVtLCByZWFkb25seSwgcGxlYXNlIHVzZSBzcHJpdGVGcmFtZSB0byBzZXR1cCBuZXcgdGV4dHVyZeOAglxuICAgICAqICEjemgg57KS5a2Q6LS05Zu+77yM5Y+q6K+75bGe5oCn77yM6K+35L2/55SoIHNwcml0ZUZyYW1lIOWxnuaAp+adpeabv+aNoui0tOWbvuOAglxuICAgICAqIEBwcm9wZXJ0eSB0ZXh0dXJlXG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICB0ZXh0dXJlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFRleHR1cmUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDE3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogY2MuVGV4dHVyZTJELFxuICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhcnRpY2xlX3N5c3RlbS50ZXh0dXJlJyxcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEN1cnJlbnQgcXVhbnRpdHkgb2YgcGFydGljbGVzIHRoYXQgYXJlIGJlaW5nIHNpbXVsYXRlZC5cbiAgICAgKiAhI3poIOW9k+WJjeaSreaUvueahOeykuWtkOaVsOmHj+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwYXJ0aWNsZUNvdW50XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgcGFydGljbGVDb3VudDoge1xuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0b3IucGFydGljbGVzLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZG9ubHk6IHRydWVcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSBzeXN0ZW0gc2ltdWxhdGlvbiBoYXZlIHN0b3BwZWQuXG4gICAgICogISN6aCDmjIfnpLrnspLlrZDmkq3mlL7mmK/lkKblrozmr5XjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IHN0b3BwZWRcbiAgICAgKi9cbiAgICBfc3RvcHBlZDogdHJ1ZSxcbiAgICBzdG9wcGVkOiB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RvcHBlZDtcbiAgICAgICAgfSxcbiAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSWYgc2V0IHRvIHRydWUsIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gd2lsbCBhdXRvbWF0aWNhbGx5IHN0YXJ0IHBsYXlpbmcgb24gb25Mb2FkLlxuICAgICAqICEjemgg5aaC5p6c6K6+572u5Li6IHRydWUg6L+Q6KGM5pe25Lya6Ieq5Yqo5Y+R5bCE57KS5a2Q44CCXG4gICAgICogQHByb3BlcnR5IHBsYXlPbkxvYWRcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgcGxheU9uTG9hZDogdHJ1ZSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSW5kaWNhdGUgd2hldGhlciB0aGUgb3duZXIgbm9kZSB3aWxsIGJlIGF1dG8tcmVtb3ZlZCB3aGVuIGl0IGhhcyBubyBwYXJ0aWNsZXMgbGVmdC5cbiAgICAgKiAhI3poIOeykuWtkOaSreaUvuWujOavleWQjuiHquWKqOmUgOavgeaJgOWcqOeahOiKgueCueOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gYXV0b1JlbW92ZU9uRmluaXNoXG4gICAgICovXG4gICAgYXV0b1JlbW92ZU9uRmluaXNoOiB7XG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYXJ0aWNsZV9zeXN0ZW0uYXV0b1JlbW92ZU9uRmluaXNoJ1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluZGljYXRlIHdoZXRoZXIgdGhlIHBhcnRpY2xlIHN5c3RlbSBpcyBhY3RpdmF0ZWQuXG4gICAgICogISN6aCDmmK/lkKbmv4DmtLvnspLlrZDjgIJcbiAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFjdGl2ZVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGFjdGl2ZToge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaW11bGF0b3IuYWN0aXZlO1xuICAgICAgICB9LFxuICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1heGltdW0gcGFydGljbGVzIG9mIHRoZSBzeXN0ZW0uXG4gICAgICogISN6aCDnspLlrZDmnIDlpKfmlbDph4/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdG90YWxQYXJ0aWNsZXNcbiAgICAgKiBAZGVmYXVsdCAxNTBcbiAgICAgKi9cbiAgICB0b3RhbFBhcnRpY2xlczogMTUwLFxuICAgIC8qKlxuICAgICAqICEjZW4gSG93IG1hbnkgc2Vjb25kcyB0aGUgZW1pdHRlciB3aWwgcnVuLiAtMSBtZWFucyAnZm9yZXZlcicuXG4gICAgICogISN6aCDlj5HlsITlmajnlJ/lrZjml7bpl7TvvIzljZXkvY3np5LvvIwtMeihqOekuuaMgee7reWPkeWwhOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkdXJhdGlvblxuICAgICAqIEBkZWZhdWx0IFBhcnRpY2xlU3lzdGVtLkRVUkFUSU9OX0lORklOSVRZXG4gICAgICovXG4gICAgZHVyYXRpb246IC0xLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW1pc3Npb24gcmF0ZSBvZiB0aGUgcGFydGljbGVzLlxuICAgICAqICEjemgg5q+P56eS5Y+R5bCE55qE57KS5a2Q5pWw55uu44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVtaXNzaW9uUmF0ZVxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgZW1pc3Npb25SYXRlOiAxMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIExpZmUgb2YgZWFjaCBwYXJ0aWNsZSBzZXR0ZXIuXG4gICAgICogISN6aCDnspLlrZDnmoTov5DooYzml7bpl7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGlmZVxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBsaWZlOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGxpZmUuXG4gICAgICogISN6aCDnspLlrZDnmoTov5DooYzml7bpl7Tlj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gbGlmZVZhclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBsaWZlVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBjb2xvciBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q5Yid5aeL6aKc6Imy44CCXG4gICAgICogQHByb3BlcnR5IHtjYy5Db2xvcn0gc3RhcnRDb2xvclxuICAgICAqIEBkZWZhdWx0IHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAyNTV9XG4gICAgICovXG4gICAgX3N0YXJ0Q29sb3I6IG51bGwsXG4gICAgc3RhcnRDb2xvcjoge1xuICAgICAgICB0eXBlOiBjYy5Db2xvcixcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGFydENvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5yID0gdmFsLnI7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yLmcgPSB2YWwuZztcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3IuYiA9IHZhbC5iO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvci5hID0gdmFsLmE7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSBzdGFydCBjb2xvci5cbiAgICAgKiAhI3poIOeykuWtkOWIneWni+minOiJsuWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IHN0YXJ0Q29sb3JWYXJcbiAgICAgKiBAZGVmYXVsdCB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cbiAgICAgKi9cbiAgICBfc3RhcnRDb2xvclZhcjogbnVsbCxcbiAgICBzdGFydENvbG9yVmFyOiB7XG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJ0Q29sb3JWYXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyLnIgPSB2YWwucjtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Q29sb3JWYXIuZyA9IHZhbC5nO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhci5iID0gdmFsLmI7XG4gICAgICAgICAgICB0aGlzLl9zdGFydENvbG9yVmFyLmEgPSB2YWwuYTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogISNlbiBFbmRpbmcgY29sb3Igb2YgZWFjaCBwYXJ0aWNsZS5cbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+minOiJsuOAglxuICAgICAqIEBwcm9wZXJ0eSB7Y2MuQ29sb3J9IGVuZENvbG9yXG4gICAgICogQGRlZmF1bHQge3I6IDI1NSwgZzogMjU1LCBiOiAyNTUsIGE6IDB9XG4gICAgICovXG4gICAgX2VuZENvbG9yOiBudWxsLFxuICAgIGVuZENvbG9yOiB7XG4gICAgICAgIHR5cGU6IGNjLkNvbG9yLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZENvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQgKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuciA9IHZhbC5yO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuZyA9IHZhbC5nO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuYiA9IHZhbC5iO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IuYSA9IHZhbC5hO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZW5kIGNvbG9yLlxuICAgICAqICEjemgg57KS5a2Q57uT5p2f6aKc6Imy5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtjYy5Db2xvcn0gZW5kQ29sb3JWYXJcbiAgICAgKiBAZGVmYXVsdCB7cjogMCwgZzogMCwgYjogMCwgYTogMH1cbiAgICAgKi9cbiAgICBfZW5kQ29sb3JWYXI6IG51bGwsXG4gICAgZW5kQ29sb3JWYXI6IHtcbiAgICAgICAgdHlwZTogY2MuQ29sb3IsXG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW5kQ29sb3JWYXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5yID0gdmFsLnI7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5nID0gdmFsLmc7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5iID0gdmFsLmI7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhci5hID0gdmFsLmE7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBbmdsZSBvZiBlYWNoIHBhcnRpY2xlIHNldHRlci5cbiAgICAgKiAhI3poIOeykuWtkOinkuW6puOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBhbmdsZVxuICAgICAqIEBkZWZhdWx0IDkwXG4gICAgICovXG4gICAgYW5nbGU6IDkwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGFuZ2xlIG9mIGVhY2ggcGFydGljbGUgc2V0dGVyLlxuICAgICAqICEjemgg57KS5a2Q6KeS5bqm5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGFuZ2xlVmFyXG4gICAgICogQGRlZmF1bHQgMjBcbiAgICAgKi9cbiAgICBhbmdsZVZhcjogMjAsXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBzaXplIGluIHBpeGVscyBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q55qE5Yid5aeL5aSn5bCP44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U2l6ZVxuICAgICAqIEBkZWZhdWx0IDUwXG4gICAgICovXG4gICAgc3RhcnRTaXplOiA1MCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiBzdGFydCBzaXplIGluIHBpeGVscy5cbiAgICAgKiAhI3poIOeykuWtkOWIneWni+Wkp+Wwj+eahOWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFNpemVWYXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgc3RhcnRTaXplVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW5kIHNpemUgaW4gcGl4ZWxzIG9mIGVhY2ggcGFydGljbGUuXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/ml7bnmoTlpKflsI/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kU2l6ZVxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRTaXplOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIGVuZCBzaXplIGluIHBpeGVscy5cbiAgICAgKiAhI3poIOeykuWtkOe7k+adn+Wkp+Wwj+eahOWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBlbmRTaXplVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIGVuZFNpemVWYXI6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydCBhbmdsZSBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q5byA5aeL6Ieq5peL6KeS5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0U3BpblxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBzdGFydFNwaW46IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc3RhcnQgYW5nbGUuXG4gICAgICogISN6aCDnspLlrZDlvIDlp4voh6rml4vop5Lluqblj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3RhcnRTcGluVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHN0YXJ0U3BpblZhcjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIEVuZCBhbmdsZSBvZiBlYWNoIHBhcnRpY2xlLlxuICAgICAqICEjemgg57KS5a2Q57uT5p2f6Ieq5peL6KeS5bqm44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFNwaW5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgZW5kU3BpbjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiBlbmQgYW5nbGUuXG4gICAgICogISN6aCDnspLlrZDnu5PmnZ/oh6rml4vop5Lluqblj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kU3BpblZhclxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRTcGluVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTb3VyY2UgcG9zaXRpb24gb2YgdGhlIGVtaXR0ZXIuXG4gICAgICogISN6aCDlj5HlsITlmajkvY3nva7jgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IHNvdXJjZVBvc1xuICAgICAqIEBkZWZhdWx0IGNjLlZlYzIuWkVST1xuICAgICAqL1xuICAgIHNvdXJjZVBvczogY2MuVmVjMi5aRVJPLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2Ygc291cmNlIHBvc2l0aW9uLlxuICAgICAqICEjemgg5Y+R5bCE5Zmo5L2N572u55qE5Y+Y5YyW6IyD5Zu044CC77yI5qiq5ZCR5ZKM57q15ZCR77yJXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBwb3NWYXJcbiAgICAgKiBAZGVmYXVsdCBjYy5WZWMyLlpFUk9cbiAgICAgKi9cbiAgICBwb3NWYXI6IGNjLlZlYzIuWkVSTyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGFydGljbGVzIG1vdmVtZW50IHR5cGUuXG4gICAgICogISN6aCDnspLlrZDkvY3nva7nsbvlnovjgIJcbiAgICAgKiBAcHJvcGVydHkge1BhcnRpY2xlU3lzdGVtLlBvc2l0aW9uVHlwZX0gcG9zaXRpb25UeXBlXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uUG9zaXRpb25UeXBlLkZSRUVcbiAgICAgKi9cbiAgICBfcG9zaXRpb25UeXBlOiB7XG4gICAgICAgIGRlZmF1bHQ6IFBvc2l0aW9uVHlwZS5GUkVFLFxuICAgICAgICBmb3JtZXJseVNlcmlhbGl6ZWRBczogXCJwb3NpdGlvblR5cGVcIlxuICAgIH0sXG5cbiAgICBwb3NpdGlvblR5cGU6IHtcbiAgICAgICAgdHlwZTogUG9zaXRpb25UeXBlLFxuICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uVHlwZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uVHlwZSA9IHZhbDtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXJ0aWNsZXMgZW1pdHRlciBtb2Rlcy5cbiAgICAgKiAhI3poIOWPkeWwhOWZqOexu+Wei+OAglxuICAgICAqIEBwcm9wZXJ0eSB7UGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGV9IGVtaXR0ZXJNb2RlXG4gICAgICogQGRlZmF1bHQgUGFydGljbGVTeXN0ZW0uRW1pdHRlck1vZGUuR1JBVklUWVxuICAgICAqL1xuICAgIGVtaXR0ZXJNb2RlOiB7XG4gICAgICAgIGRlZmF1bHQ6IEVtaXR0ZXJNb2RlLkdSQVZJVFksXG4gICAgICAgIHR5cGU6IEVtaXR0ZXJNb2RlXG4gICAgfSxcblxuICAgIC8vIEdSQVZJVFkgTU9ERVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHcmF2aXR5IG9mIHRoZSBlbWl0dGVyLlxuICAgICAqICEjemgg6YeN5Yqb44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBncmF2aXR5XG4gICAgICogQGRlZmF1bHQgY2MuVmVjMi5aRVJPXG4gICAgICovXG4gICAgZ3Jhdml0eTogY2MuVmVjMi5aRVJPLFxuICAgIC8qKlxuICAgICAqICEjZW4gU3BlZWQgb2YgdGhlIGVtaXR0ZXIuXG4gICAgICogISN6aCDpgJ/luqbjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3BlZWRcbiAgICAgKiBAZGVmYXVsdCAxODBcbiAgICAgKi9cbiAgICBzcGVlZDogMTgwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSBzcGVlZC5cbiAgICAgKiAhI3poIOmAn+W6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGVlZFZhclxuICAgICAqIEBkZWZhdWx0IDUwXG4gICAgICovXG4gICAgc3BlZWRWYXI6IDUwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGFuZ2VudGlhbCBhY2NlbGVyYXRpb24gb2YgZWFjaCBwYXJ0aWNsZS4gT25seSBhdmFpbGFibGUgaW4gJ0dyYXZpdHknIG1vZGUuXG4gICAgICogISN6aCDmr4/kuKrnspLlrZDnmoTliIflkJHliqDpgJ/luqbvvIzljbPlnoLnm7Tkuo7ph43lipvmlrnlkJHnmoTliqDpgJ/luqbvvIzlj6rmnInlnKjph43lipvmqKHlvI/kuIvlj6/nlKjjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gdGFuZ2VudGlhbEFjY2VsXG4gICAgICogQGRlZmF1bHQgODBcbiAgICAgKi9cbiAgICB0YW5nZW50aWFsQWNjZWw6IDgwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSB0YW5nZW50aWFsIGFjY2VsZXJhdGlvbi5cbiAgICAgKiAhI3poIOavj+S4queykuWtkOeahOWIh+WQkeWKoOmAn+W6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0YW5nZW50aWFsQWNjZWxWYXJcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgdGFuZ2VudGlhbEFjY2VsVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gQWNjZWxlcmF0aW9uIG9mIGVhY2ggcGFydGljbGUuIE9ubHkgYXZhaWxhYmxlIGluICdHcmF2aXR5JyBtb2RlLlxuICAgICAqICEjemgg57KS5a2Q5b6E5ZCR5Yqg6YCf5bqm77yM5Y2z5bmz6KGM5LqO6YeN5Yqb5pa55ZCR55qE5Yqg6YCf5bqm77yM5Y+q5pyJ5Zyo6YeN5Yqb5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGlhbEFjY2VsXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJhZGlhbEFjY2VsOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVmFyaWF0aW9uIG9mIHRoZSByYWRpYWwgYWNjZWxlcmF0aW9uLlxuICAgICAqICEjemgg57KS5a2Q5b6E5ZCR5Yqg6YCf5bqm5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJhZGlhbEFjY2VsVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJhZGlhbEFjY2VsVmFyOiAwLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbmRpY2F0ZSB3aGV0aGVyIHRoZSByb3RhdGlvbiBvZiBlYWNoIHBhcnRpY2xlIGVxdWFscyB0byBpdHMgZGlyZWN0aW9uLiBPbmx5IGF2YWlsYWJsZSBpbiAnR3Jhdml0eScgbW9kZS5cbiAgICAgKiAhI3poIOavj+S4queykuWtkOeahOaXi+i9rOaYr+WQpuetieS6juWFtuaWueWQke+8jOWPquacieWcqOmHjeWKm+aooeW8j+S4i+WPr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcm90YXRpb25Jc0RpclxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgcm90YXRpb25Jc0RpcjogZmFsc2UsXG5cbiAgICAvLyBSQURJVVMgTU9ERVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdGFydGluZyByYWRpdXMgb2YgdGhlIHBhcnRpY2xlcy4gT25seSBhdmFpbGFibGUgaW4gJ1JhZGl1cycgbW9kZS5cbiAgICAgKiAhI3poIOWIneWni+WNiuW+hO+8jOihqOekuueykuWtkOWHuueUn+aXtuebuOWvueWPkeWwhOWZqOeahOi3neemu++8jOWPquacieWcqOWNiuW+hOaooeW8j+S4i+WPr+eUqOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzdGFydFJhZGl1c1xuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBzdGFydFJhZGl1czogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgc3RhcnRpbmcgcmFkaXVzLlxuICAgICAqICEjemgg5Yid5aeL5Y2K5b6E5Y+Y5YyW6IyD5Zu044CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHN0YXJ0UmFkaXVzVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHN0YXJ0UmFkaXVzVmFyOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRW5kaW5nIHJhZGl1cyBvZiB0aGUgcGFydGljbGVzLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxuICAgICAqICEjemgg57uT5p2f5Y2K5b6E77yM5Y+q5pyJ5Zyo5Y2K5b6E5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGVuZFJhZGl1c1xuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBlbmRSYWRpdXM6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBWYXJpYXRpb24gb2YgdGhlIGVuZGluZyByYWRpdXMuXG4gICAgICogISN6aCDnu5PmnZ/ljYrlvoTlj5jljJbojIPlm7TjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gZW5kUmFkaXVzVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIGVuZFJhZGl1c1ZhcjogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIE51bWJlciBvZiBkZWdyZXNzIHRvIHJvdGF0ZSBhIHBhcnRpY2xlIGFyb3VuZCB0aGUgc291cmNlIHBvcyBwZXIgc2Vjb25kLiBPbmx5IGF2YWlsYWJsZSBpbiAnUmFkaXVzJyBtb2RlLlxuICAgICAqICEjemgg57KS5a2Q5q+P56eS5Zu057uV6LW35aeL54K555qE5peL6L2s6KeS5bqm77yM5Y+q5pyJ5Zyo5Y2K5b6E5qih5byP5LiL5Y+v55So44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHJvdGF0ZVBlclNcbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgcm90YXRlUGVyUzogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZhcmlhdGlvbiBvZiB0aGUgZGVncmVzcyB0byByb3RhdGUgYSBwYXJ0aWNsZSBhcm91bmQgdGhlIHNvdXJjZSBwb3MgcGVyIHNlY29uZC5cbiAgICAgKiAhI3poIOeykuWtkOavj+enkuWbtOe7lei1t+Wni+eCueeahOaXi+i9rOinkuW6puWPmOWMluiMg+WbtOOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByb3RhdGVQZXJTVmFyXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIHJvdGF0ZVBlclNWYXI6IDBcblxufTtcblxuLyoqXG4gKiBQYXJ0aWNsZSBTeXN0ZW0gYmFzZSBjbGFzcy4gPGJyLz5cbiAqIEF0dHJpYnV0ZXMgb2YgYSBQYXJ0aWNsZSBTeXN0ZW06PGJyLz5cbiAqICAtIGVtbWlzaW9uIHJhdGUgb2YgdGhlIHBhcnRpY2xlczxici8+XG4gKiAgLSBHcmF2aXR5IE1vZGUgKE1vZGUgQSk6IDxici8+XG4gKiAgLSBncmF2aXR5IDxici8+XG4gKiAgLSBkaXJlY3Rpb24gPGJyLz5cbiAqICAtIHNwZWVkICstICB2YXJpYW5jZSA8YnIvPlxuICogIC0gdGFuZ2VudGlhbCBhY2NlbGVyYXRpb24gKy0gdmFyaWFuY2U8YnIvPlxuICogIC0gcmFkaWFsIGFjY2VsZXJhdGlvbiArLSB2YXJpYW5jZTxici8+XG4gKiAgLSBSYWRpdXMgTW9kZSAoTW9kZSBCKTogICAgICA8YnIvPlxuICogIC0gc3RhcnRSYWRpdXMgKy0gdmFyaWFuY2UgICAgPGJyLz5cbiAqICAtIGVuZFJhZGl1cyArLSB2YXJpYW5jZSAgICAgIDxici8+XG4gKiAgLSByb3RhdGUgKy0gdmFyaWFuY2UgICAgICAgICA8YnIvPlxuICogIC0gUHJvcGVydGllcyBjb21tb24gdG8gYWxsIG1vZGVzOiA8YnIvPlxuICogIC0gbGlmZSArLSBsaWZlIHZhcmlhbmNlICAgICAgPGJyLz5cbiAqICAtIHN0YXJ0IHNwaW4gKy0gdmFyaWFuY2UgICAgIDxici8+XG4gKiAgLSBlbmQgc3BpbiArLSB2YXJpYW5jZSAgICAgICA8YnIvPlxuICogIC0gc3RhcnQgc2l6ZSArLSB2YXJpYW5jZSAgICAgPGJyLz5cbiAqICAtIGVuZCBzaXplICstIHZhcmlhbmNlICAgICAgIDxici8+XG4gKiAgLSBzdGFydCBjb2xvciArLSB2YXJpYW5jZSAgICA8YnIvPlxuICogIC0gZW5kIGNvbG9yICstIHZhcmlhbmNlICAgICAgPGJyLz5cbiAqICAtIGxpZmUgKy0gdmFyaWFuY2UgICAgICAgICAgIDxici8+XG4gKiAgLSBibGVuZGluZyBmdW5jdGlvbiAgICAgICAgICA8YnIvPlxuICogIC0gdGV4dHVyZSAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqIDxici8+XG4gKiBjb2NvczJkIGFsc28gc3VwcG9ydHMgcGFydGljbGVzIGdlbmVyYXRlZCBieSBQYXJ0aWNsZSBEZXNpZ25lciAoaHR0cDovL3BhcnRpY2xlZGVzaWduZXIuNzFzcXVhcmVkLmNvbS8pLjxici8+XG4gKiAnUmFkaXVzIE1vZGUnIGluIFBhcnRpY2xlIERlc2lnbmVyIHVzZXMgYSBmaXhlZCBlbWl0IHJhdGUgb2YgMzAgaHouIFNpbmNlIHRoYXQgY2FuJ3QgYmUgZ3VhcmF0ZWVkIGluIGNvY29zMmQsICA8YnIvPlxuICogY29jb3MyZCB1c2VzIGEgYW5vdGhlciBhcHByb2FjaCwgYnV0IHRoZSByZXN1bHRzIGFyZSBhbG1vc3QgaWRlbnRpY2FsLjxici8+XG4gKiBjb2NvczJkIHN1cHBvcnRzIGFsbCB0aGUgdmFyaWFibGVzIHVzZWQgYnkgUGFydGljbGUgRGVzaWduZXIgcGx1cyBhIGJpdCBtb3JlOiAgPGJyLz5cbiAqICAtIHNwaW5uaW5nIHBhcnRpY2xlcyAoc3VwcG9ydGVkIHdoZW4gdXNpbmcgUGFydGljbGVTeXN0ZW0pICAgICAgIDxici8+XG4gKiAgLSB0YW5nZW50aWFsIGFjY2VsZXJhdGlvbiAoR3Jhdml0eSBtb2RlKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogIC0gcmFkaWFsIGFjY2VsZXJhdGlvbiAoR3Jhdml0eSBtb2RlKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJyLz5cbiAqICAtIHJhZGl1cyBkaXJlY3Rpb24gKFJhZGl1cyBtb2RlKSAoUGFydGljbGUgRGVzaWduZXIgc3VwcG9ydHMgb3V0d2FyZHMgdG8gaW53YXJkcyBkaXJlY3Rpb24gb25seSkgPGJyLz5cbiAqIEl0IGlzIHBvc3NpYmxlIHRvIGN1c3RvbWl6ZSBhbnkgb2YgdGhlIGFib3ZlIG1lbnRpb25lZCBwcm9wZXJ0aWVzIGluIHJ1bnRpbWUuIEV4YW1wbGU6ICAgPGJyLz5cbiAqXG4gKiBAZXhhbXBsZVxuICogZW1pdHRlci5yYWRpYWxBY2NlbCA9IDE1O1xuICogZW1pdHRlci5zdGFydFNwaW4gPSAwO1xuICpcbiAqIEBjbGFzcyBQYXJ0aWNsZVN5c3RlbVxuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XG4gKiBAdXNlcyBCbGVuZEZ1bmNcbiAqL1xudmFyIFBhcnRpY2xlU3lzdGVtID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QYXJ0aWNsZVN5c3RlbScsXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuICAgIG1peGluczogW0JsZW5kRnVuY10sXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9QYXJ0aWNsZVN5c3RlbScsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvcGFydGljbGUtc3lzdGVtLmpzJyxcbiAgICAgICAgcGxheU9uRm9jdXM6IHRydWUsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLmluaXRQcm9wZXJ0aWVzKCk7XG4gICAgfSxcblxuICAgIGluaXRQcm9wZXJ0aWVzICgpIHtcbiAgICAgICAgdGhpcy5fcHJldmlld1RpbWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hc3BlY3RSYXRpbyA9IDE7XG5cbiAgICAgICAgdGhpcy5fc2ltdWxhdG9yID0gbmV3IFBhcnRpY2xlU2ltdWxhdG9yKHRoaXMpO1xuXG4gICAgICAgIC8vIGNvbG9yc1xuICAgICAgICB0aGlzLl9zdGFydENvbG9yID0gY2MuY29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xuICAgICAgICB0aGlzLl9lbmRDb2xvciA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDApO1xuICAgICAgICB0aGlzLl9lbmRDb2xvclZhciA9IGNjLmNvbG9yKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIC8vIFRoZSB0ZW1wb3JhcnkgU3ByaXRlRnJhbWUgb2JqZWN0IHVzZWQgZm9yIHRoZSByZW5kZXJlci4gQmVjYXVzZSB0aGVyZSBpcyBubyBjb3JyZXNwb25kaW5nIGFzc2V0LCBpdCBjYW4ndCBiZSBzZXJpYWxpemVkLlxuICAgICAgICB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMsXG5cbiAgICBzdGF0aWNzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIFBhcnRpY2xlIGVtaXR0ZXIgbGl2ZXMgZm9yZXZlci5cbiAgICAgICAgICogISN6aCDooajnpLrlj5HlsITlmajmsLjkuYXlrZjlnKhcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IERVUkFUSU9OX0lORklOSVRZXG4gICAgICAgICAqIEBkZWZhdWx0IC0xXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogQHJlYWRvbmx5XG4gICAgICAgICAqL1xuICAgICAgICBEVVJBVElPTl9JTkZJTklUWTogLTEsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHN0YXJ0aW5nIHNpemUgb2YgdGhlIHBhcnRpY2xlIGlzIGVxdWFsIHRvIHRoZSBlbmRpbmcgc2l6ZS5cbiAgICAgICAgICogISN6aCDooajnpLrnspLlrZDnmoTotbflp4vlpKflsI/nrYnkuo7nu5PmnZ/lpKflsI/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNUQVJUX1NJWkVfRVFVQUxfVE9fRU5EX1NJWkVcbiAgICAgICAgICogQGRlZmF1bHQgLTFcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIFNUQVJUX1NJWkVfRVFVQUxfVE9fRU5EX1NJWkU6IC0xLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBzdGFydGluZyByYWRpdXMgb2YgdGhlIHBhcnRpY2xlIGlzIGVxdWFsIHRvIHRoZSBlbmRpbmcgcmFkaXVzLlxuICAgICAgICAgKiAhI3poIOihqOekuueykuWtkOeahOi1t+Wni+WNiuW+hOetieS6jue7k+adn+WNiuW+hOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU1RBUlRfUkFESVVTX0VRVUFMX1RPX0VORF9SQURJVVNcbiAgICAgICAgICogQGRlZmF1bHQgLTFcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBAcmVhZG9ubHlcbiAgICAgICAgICovXG4gICAgICAgIFNUQVJUX1JBRElVU19FUVVBTF9UT19FTkRfUkFESVVTOiAtMSxcblxuICAgICAgICBFbWl0dGVyTW9kZTogRW1pdHRlck1vZGUsXG4gICAgICAgIFBvc2l0aW9uVHlwZTogUG9zaXRpb25UeXBlLFxuXG5cbiAgICAgICAgX1BOR1JlYWRlcjogUE5HUmVhZGVyLFxuICAgICAgICBfVElGRlJlYWRlcjogdGlmZlJlYWRlcixcbiAgICB9LFxuXG4gICAgLy8gRURJVE9SIFJFTEFURUQgTUVUSE9EU1xuXG4gICAgb25Gb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBnZXRQYXJ0aWNsZUNvbXBvbmVudHModGhpcy5ub2RlKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb21wb25lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzW2ldLl9zdGFydFByZXZpZXcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvc3RGb2N1c0luRWRpdG9yOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgIGxldCBjb21wb25lbnRzID0gZ2V0UGFydGljbGVDb21wb25lbnRzKHRoaXMubm9kZSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tcG9uZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29tcG9uZW50c1tpXS5fc3RvcFByZXZpZXcoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc3RhcnRQcmV2aWV3OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3N0b3BQcmV2aWV3OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5wcmV2aWV3KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U3lzdGVtKCk7XG4gICAgICAgICAgICB0aGlzLnN0b3BTeXN0ZW0oKTtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgY2MuZW5naW5lLnJlcGFpbnRJbkVkaXRNb2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3ByZXZpZXdUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9wcmV2aWV3VGltZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgTUVUSE9EU1xuXG4gICAgLy8ganVzdCB1c2VkIHRvIHJlYWQgZGF0YSBmcm9tIDEueFxuICAgIF9jb252ZXJ0VGV4dHVyZVRvU3ByaXRlRnJhbWU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy50ZXh0dXJlO1xuICAgICAgICBpZiAoIXRleHR1cmUgfHwgIXRleHR1cmUuX3V1aWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIEVkaXRvci5hc3NldGRiLnF1ZXJ5TWV0YUluZm9CeVV1aWQodGV4dHVyZS5fdXVpZCwgZnVuY3Rpb24gKGVyciwgbWV0YUluZm8pIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBFZGl0b3IuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIGxldCBtZXRhID0gSlNPTi5wYXJzZShtZXRhSW5mby5qc29uKTtcbiAgICAgICAgICAgIGlmIChtZXRhLnR5cGUgPT09ICdyYXcnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgTm9kZVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ2FwcDovL2VkaXRvci9wYWdlL3NjZW5lLXV0aWxzL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZVBhdGggPSBOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgoX3RoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEVkaXRvci53YXJuKGBUaGUgdGV4dHVyZSAke21ldGFJbmZvLmFzc2V0VXJsfSB1c2VkIGJ5IHBhcnRpY2xlICR7bm9kZVBhdGh9IGRvZXMgbm90IGNvbnRhaW4gYW55IFNwcml0ZUZyYW1lLCBwbGVhc2Ugc2V0IHRoZSB0ZXh0dXJlIHR5cGUgdG8gU3ByaXRlIGFuZCByZWFzc2lnbiB0aGUgU3ByaXRlRnJhbWUgdG8gdGhlIHBhcnRpY2xlIGNvbXBvbmVudC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBVcmwgPSByZXF1aXJlKCdmaXJlLXVybCcpO1xuICAgICAgICAgICAgICAgIGxldCBuYW1lID0gVXJsLmJhc2VuYW1lTm9FeHQobWV0YUluZm8uYXNzZXRQYXRoKTtcbiAgICAgICAgICAgICAgICBsZXQgdXVpZCA9IG1ldGEuc3ViTWV0YXNbbmFtZV0udXVpZDtcbiAgICAgICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEFueSh1dWlkLCBmdW5jdGlvbiAoZXJyLCBzcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gRWRpdG9yLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNwcml0ZUZyYW1lID0gc3A7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbnZlcnRUZXh0dXJlVG9TcHJpdGVGcmFtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2N1c3RvbSAmJiB0aGlzLnNwcml0ZUZyYW1lICYmICF0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlTcHJpdGVGcmFtZSh0aGlzLnNwcml0ZUZyYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLl9maWxlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1pc3NDdXN0b21UZXh0dXJlID0gIXRoaXMuX2dldFRleHR1cmUoKTtcbiAgICAgICAgICAgICAgICBpZiAobWlzc0N1c3RvbVRleHR1cmUpIHsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5RmlsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGF1dG8gcGxheVxuICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5T25Mb2FkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFVwZ3JhZGUgY29sb3IgdHlwZSBmcm9tIHYyLjAuMFxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICEodGhpcy5fc3RhcnRDb2xvciBpbnN0YW5jZW9mIGNjLkNvbG9yKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvciA9IGNjLmNvbG9yKHRoaXMuX3N0YXJ0Q29sb3IpO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRDb2xvclZhciA9IGNjLmNvbG9yKHRoaXMuX3N0YXJ0Q29sb3JWYXIpO1xuICAgICAgICAgICAgdGhpcy5fZW5kQ29sb3IgPSBjYy5jb2xvcih0aGlzLl9lbmRDb2xvcik7XG4gICAgICAgICAgICB0aGlzLl9lbmRDb2xvclZhciA9IGNjLmNvbG9yKHRoaXMuX2VuZENvbG9yVmFyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVtb3ZlT25GaW5pc2gpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1JlbW92ZU9uRmluaXNoID0gZmFsc2U7ICAgIC8vIGFscmVhZHkgcmVtb3ZlZFxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9idWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1ZmZlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlc2V0IHV2IGRhdGEgc28gbmV4dCB0aW1lIHNpbXVsYXRvciB3aWxsIHJlZmlsbCBidWZmZXIgdXYgaW5mbyB3aGVuIGV4aXQgZWRpdCBtb2RlIGZyb20gcHJlZmFiLlxuICAgICAgICB0aGlzLl9zaW11bGF0b3IuX3V2RmlsbGVkID0gMDtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuICAgIFxuICAgIGxhdGVVcGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICghdGhpcy5fc2ltdWxhdG9yLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zaW11bGF0b3Iuc3RlcChkdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQVBJU1xuXG4gICAgLypcbiAgICAgKiAhI2VuIEFkZCBhIHBhcnRpY2xlIHRvIHRoZSBlbWl0dGVyLlxuICAgICAqICEjemgg5re75Yqg5LiA5Liq57KS5a2Q5Yiw5Y+R5bCE5Zmo5Lit44CCXG4gICAgICogQG1ldGhvZCBhZGRQYXJ0aWNsZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgYWRkUGFydGljbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gTm90IGltcGxlbWVudGVkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcCBlbWl0dGluZyBwYXJ0aWNsZXMuIFJ1bm5pbmcgcGFydGljbGVzIHdpbGwgY29udGludWUgdG8gcnVuIHVudGlsIHRoZXkgZGllLlxuICAgICAqICEjemgg5YGc5q2i5Y+R5bCE5Zmo5Y+R5bCE57KS5a2Q77yM5Y+R5bCE5Ye65Y6755qE57KS5a2Q5bCG57un57ut6L+Q6KGM77yM55u06Iez57KS5a2Q55Sf5ZG957uT5p2f44CCXG4gICAgICogQG1ldGhvZCBzdG9wU3lzdGVtXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBzdG9wIHBhcnRpY2xlIHN5c3RlbS5cbiAgICAgKiBteVBhcnRpY2xlU3lzdGVtLnN0b3BTeXN0ZW0oKTtcbiAgICAgKi9cbiAgICBzdG9wU3lzdGVtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0b3BwZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zaW11bGF0b3Iuc3RvcCgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEtpbGwgYWxsIGxpdmluZyBwYXJ0aWNsZXMuXG4gICAgICogISN6aCDmnYDmrbvmiYDmnInlrZjlnKjnmoTnspLlrZDvvIznhLblkI7ph43mlrDlkK/liqjnspLlrZDlj5HlsITlmajjgIJcbiAgICAgKiBAbWV0aG9kIHJlc2V0U3lzdGVtXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBwbGF5IHBhcnRpY2xlIHN5c3RlbS5cbiAgICAgKiBteVBhcnRpY2xlU3lzdGVtLnJlc2V0U3lzdGVtKCk7XG4gICAgICovXG4gICAgcmVzZXRTeXN0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zaW11bGF0b3IucmVzZXQoKTtcbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFdoZXRoZXIgb3Igbm90IHRoZSBzeXN0ZW0gaXMgZnVsbC5cbiAgICAgKiAhI3poIOWPkeWwhOWZqOS4reeykuWtkOaYr+WQpuWkp+S6juetieS6juiuvue9rueahOaAu+eykuWtkOaVsOmHj+OAglxuICAgICAqIEBtZXRob2QgaXNGdWxsXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0Z1bGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnBhcnRpY2xlQ291bnQgPj0gdGhpcy50b3RhbFBhcnRpY2xlcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyBhIG5ldyB0ZXh0dXJlIHdpdGggYSByZWN0LiBUaGUgcmVjdCBpcyBpbiB0ZXh0dXJlIHBvc2l0aW9uIGFuZCBzaXplLlxuICAgICAqIFBsZWFzZSB1c2Ugc3ByaXRlRnJhbWUgcHJvcGVydHkgaW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBpcyBkZXByZWNhdGVkIHNpbmNlIHYxLjlcbiAgICAgKiAhI3poIOiuvue9ruS4gOW8oOaWsOi0tOWbvuWSjOWFs+iBlOeahOefqeW9ouOAglxuICAgICAqIOivt+ebtOaOpeiuvue9riBzcHJpdGVGcmFtZSDlsZ7mgKfvvIzov5nkuKrlh73mlbDku44gdjEuOSDniYjmnKzlvIDlp4vlt7Lnu4/ooqvlup/lvINcbiAgICAgKiBAbWV0aG9kIHNldFRleHR1cmVXaXRoUmVjdFxuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJEfSB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjEuOVxuICAgICAqL1xuICAgIHNldFRleHR1cmVXaXRoUmVjdDogZnVuY3Rpb24gKHRleHR1cmUsIHJlY3QpIHtcbiAgICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSwgcmVjdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gUFJJVkFURSBNRVRIT0RTXG5cbiAgICBfYXBwbHlGaWxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBmaWxlID0gdGhpcy5fZmlsZTtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5wb3N0TG9hZE5hdGl2ZShmaWxlLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVyciB8fCAhZmlsZS5fbmF0aXZlQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg2MDI5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5fcGxpc3RGaWxlID0gZmlsZS5uYXRpdmVVcmw7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLl9jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5faW5pdFdpdGhEaWN0aW9uYXJ5KGZpbGUuX25hdGl2ZUFzc2V0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuX3Nwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNwcml0ZUZyYW1lID0gZmlsZS5zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmLl9jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2luaXRUZXh0dXJlV2l0aERpY3Rpb25hcnkoZmlsZS5fbmF0aXZlQXNzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzZWxmLl9yZW5kZXJTcHJpdGVGcmFtZSAmJiBzZWxmLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9hcHBseVNwcml0ZUZyYW1lKHNlbGYuc3ByaXRlRnJhbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5OiBmdW5jdGlvbiAoZGljdCkge1xuICAgICAgICBsZXQgaW1nUGF0aCA9IGNjLnBhdGguY2hhbmdlQmFzZW5hbWUodGhpcy5fcGxpc3RGaWxlLCBkaWN0W1widGV4dHVyZUZpbGVOYW1lXCJdIHx8ICcnKTtcbiAgICAgICAgLy8gdGV4dHVyZVxuICAgICAgICBpZiAoZGljdFtcInRleHR1cmVGaWxlTmFtZVwiXSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGdldCB0aGUgdGV4dHVyZSBmcm9tIHRoZSBjYWNoZVxuICAgICAgICAgICAgdGV4dHVyZVV0aWwubG9hZEltYWdlKGltZ1BhdGgsIGZ1bmN0aW9uIChlcnJvciwgdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBkaWN0W1widGV4dHVyZUZpbGVOYW1lXCJdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5KGRpY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5hZGQoaW1nUGF0aCwgdGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGljdFtcInRleHR1cmVJbWFnZURhdGFcIl0pIHtcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlRGF0YSA9IGRpY3RbXCJ0ZXh0dXJlSW1hZ2VEYXRhXCJdO1xuXG4gICAgICAgICAgICBpZiAodGV4dHVyZURhdGEgJiYgdGV4dHVyZURhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCB0ZXggPSBjYy5hc3NldE1hbmFnZXIuYXNzZXRzLmdldChpbWdQYXRoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXRleCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYnVmZmVyID0gY29kZWMudW56aXBCYXNlNjRBc0FycmF5KHRleHR1cmVEYXRhLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFidWZmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDMwLCB0aGlzLl9maWxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdlRm9ybWF0ID0gZ2V0SW1hZ2VGb3JtYXRCeURhdGEoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5USUZGICYmIGltYWdlRm9ybWF0ICE9PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCg2MDMxLCB0aGlzLl9maWxlLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhbnZhc09iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmKGltYWdlRm9ybWF0ID09PSBtYWNyby5JbWFnZUZvcm1hdC5QTkcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG15UG5nT2JqID0gbmV3IFBOR1JlYWRlcihidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbXlQbmdPYmoucmVuZGVyKGNhbnZhc09iaik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWZmUmVhZGVyLnBhcnNlVElGRihidWZmZXIsY2FudmFzT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0ZXggPSB0ZXh0dXJlVXRpbC5jYWNoZUltYWdlKGltZ1BhdGgsIGNhbnZhc09iaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghdGV4KVxuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoNjAzMiwgdGhpcy5fZmlsZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVc2UgY2MuYXNzZXRNYW5hZ2VyIHRvIGxvYWQgYXN5bmNocm9ub3VzbHkgdGhlIFNwcml0ZUZyYW1lIG9iamVjdCwgYXZvaWQgdXNpbmcgdGV4dHVyZVV0aWxcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8vIHBhcnNpbmcgcHJvY2Vzc1xuICAgIF9pbml0V2l0aERpY3Rpb25hcnk6IGZ1bmN0aW9uIChkaWN0KSB7XG4gICAgICAgIHRoaXMudG90YWxQYXJ0aWNsZXMgPSBwYXJzZUludChkaWN0W1wibWF4UGFydGljbGVzXCJdIHx8IDApO1xuXG4gICAgICAgIC8vIGxpZmUgc3BhblxuICAgICAgICB0aGlzLmxpZmUgPSBwYXJzZUZsb2F0KGRpY3RbXCJwYXJ0aWNsZUxpZmVzcGFuXCJdIHx8IDApO1xuICAgICAgICB0aGlzLmxpZmVWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJwYXJ0aWNsZUxpZmVzcGFuVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gZW1pc3Npb24gUmF0ZVxuICAgICAgICBsZXQgX3RlbXBFbWlzc2lvblJhdGUgPSBkaWN0W1wiZW1pc3Npb25SYXRlXCJdO1xuICAgICAgICBpZiAoX3RlbXBFbWlzc2lvblJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pc3Npb25SYXRlID0gX3RlbXBFbWlzc2lvblJhdGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVtaXNzaW9uUmF0ZSA9IE1hdGgubWluKHRoaXMudG90YWxQYXJ0aWNsZXMgLyB0aGlzLmxpZmUsIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZHVyYXRpb25cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IHBhcnNlRmxvYXQoZGljdFtcImR1cmF0aW9uXCJdIHx8IDApO1xuXG4gICAgICAgIC8vIGJsZW5kIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuc3JjQmxlbmRGYWN0b3IgPSBwYXJzZUludChkaWN0W1wiYmxlbmRGdW5jU291cmNlXCJdIHx8IG1hY3JvLlNSQ19BTFBIQSk7XG4gICAgICAgIHRoaXMuZHN0QmxlbmRGYWN0b3IgPSBwYXJzZUludChkaWN0W1wiYmxlbmRGdW5jRGVzdGluYXRpb25cIl0gfHwgbWFjcm8uT05FX01JTlVTX1NSQ19BTFBIQSk7XG5cbiAgICAgICAgLy8gY29sb3JcbiAgICAgICAgbGV0IGxvY1N0YXJ0Q29sb3IgPSB0aGlzLl9zdGFydENvbG9yO1xuICAgICAgICBsb2NTdGFydENvbG9yLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yLmcgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yR3JlZW5cIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY1N0YXJ0Q29sb3IuYiA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JCbHVlXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgbGV0IGxvY1N0YXJ0Q29sb3JWYXIgPSB0aGlzLl9zdGFydENvbG9yVmFyO1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VSZWRcIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY1N0YXJ0Q29sb3JWYXIuZyA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0Q29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLmIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VCbHVlXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NTdGFydENvbG9yVmFyLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJzdGFydENvbG9yVmFyaWFuY2VBbHBoYVwiXSB8fCAwKSAqIDI1NTtcblxuICAgICAgICBsZXQgbG9jRW5kQ29sb3IgPSB0aGlzLl9lbmRDb2xvcjtcbiAgICAgICAgbG9jRW5kQ29sb3IuciA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JHcmVlblwiXSB8fCAwKSAqIDI1NTtcbiAgICAgICAgbG9jRW5kQ29sb3IuYiA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yQmx1ZVwiXSB8fCAwKSAqIDI1NTtcbiAgICAgICAgbG9jRW5kQ29sb3IuYSA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaENvbG9yQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgbGV0IGxvY0VuZENvbG9yVmFyID0gdGhpcy5fZW5kQ29sb3JWYXI7XG4gICAgICAgIGxvY0VuZENvbG9yVmFyLnIgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclZhcmlhbmNlUmVkXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvclZhci5nID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUdyZWVuXCJdIHx8IDApICogMjU1O1xuICAgICAgICBsb2NFbmRDb2xvclZhci5iID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoQ29sb3JWYXJpYW5jZUJsdWVcIl0gfHwgMCkgKiAyNTU7XG4gICAgICAgIGxvY0VuZENvbG9yVmFyLmEgPSBwYXJzZUZsb2F0KGRpY3RbXCJmaW5pc2hDb2xvclZhcmlhbmNlQWxwaGFcIl0gfHwgMCkgKiAyNTU7XG5cbiAgICAgICAgLy8gcGFydGljbGUgc2l6ZVxuICAgICAgICB0aGlzLnN0YXJ0U2l6ZSA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0UGFydGljbGVTaXplXCJdIHx8IDApO1xuICAgICAgICB0aGlzLnN0YXJ0U2l6ZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcInN0YXJ0UGFydGljbGVTaXplVmFyaWFuY2VcIl0gfHwgMCk7XG4gICAgICAgIHRoaXMuZW5kU2l6ZSA9IHBhcnNlRmxvYXQoZGljdFtcImZpbmlzaFBhcnRpY2xlU2l6ZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5lbmRTaXplVmFyID0gcGFyc2VGbG9hdChkaWN0W1wiZmluaXNoUGFydGljbGVTaXplVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gcG9zaXRpb25cbiAgICAgICAgLy8gTWFrZSBlbXB0eSBwb3NpdGlvblR5cGUgdmFsdWUgYW5kIG9sZCB2ZXJzaW9uIGNvbXBhdGlibGVcbiAgICAgICAgdGhpcy5wb3NpdGlvblR5cGUgPSBwYXJzZUZsb2F0KGRpY3RbJ3Bvc2l0aW9uVHlwZSddICE9PSB1bmRlZmluZWQgPyBkaWN0Wydwb3NpdGlvblR5cGUnXSA6IFBvc2l0aW9uVHlwZS5SRUxBVElWRSk7XG4gICAgICAgIC8vIGZvclxuICAgICAgICB0aGlzLnNvdXJjZVBvcy54ID0gMDtcbiAgICAgICAgdGhpcy5zb3VyY2VQb3MueSA9IDA7XG4gICAgICAgIHRoaXMucG9zVmFyLnggPSBwYXJzZUZsb2F0KGRpY3RbXCJzb3VyY2VQb3NpdGlvblZhcmlhbmNleFwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5wb3NWYXIueSA9IHBhcnNlRmxvYXQoZGljdFtcInNvdXJjZVBvc2l0aW9uVmFyaWFuY2V5XCJdIHx8IDApO1xuXG4gICAgICAgIC8vIGFuZ2xlXG4gICAgICAgIHRoaXMuYW5nbGUgPSBwYXJzZUZsb2F0KGRpY3RbXCJhbmdsZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5hbmdsZVZhciA9IHBhcnNlRmxvYXQoZGljdFtcImFuZ2xlVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgLy8gU3Bpbm5pbmdcbiAgICAgICAgdGhpcy5zdGFydFNwaW4gPSBwYXJzZUZsb2F0KGRpY3RbXCJyb3RhdGlvblN0YXJ0XCJdIHx8IDApO1xuICAgICAgICB0aGlzLnN0YXJ0U3BpblZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uU3RhcnRWYXJpYW5jZVwiXSB8fCAwKTtcbiAgICAgICAgdGhpcy5lbmRTcGluID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRpb25FbmRcIl0gfHwgMCk7XG4gICAgICAgIHRoaXMuZW5kU3BpblZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJvdGF0aW9uRW5kVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgdGhpcy5lbWl0dGVyTW9kZSA9IHBhcnNlSW50KGRpY3RbXCJlbWl0dGVyVHlwZVwiXSB8fCBFbWl0dGVyTW9kZS5HUkFWSVRZKTtcblxuICAgICAgICAvLyBNb2RlIEE6IEdyYXZpdHkgKyB0YW5nZW50aWFsIGFjY2VsICsgcmFkaWFsIGFjY2VsXG4gICAgICAgIGlmICh0aGlzLmVtaXR0ZXJNb2RlID09PSBFbWl0dGVyTW9kZS5HUkFWSVRZKSB7XG4gICAgICAgICAgICAvLyBncmF2aXR5XG4gICAgICAgICAgICB0aGlzLmdyYXZpdHkueCA9IHBhcnNlRmxvYXQoZGljdFtcImdyYXZpdHl4XCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5ncmF2aXR5LnkgPSBwYXJzZUZsb2F0KGRpY3RbXCJncmF2aXR5eVwiXSB8fCAwKTtcblxuICAgICAgICAgICAgLy8gc3BlZWRcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSBwYXJzZUZsb2F0KGRpY3RbXCJzcGVlZFwiXSB8fCAwKTtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRWYXIgPSBwYXJzZUZsb2F0KGRpY3RbXCJzcGVlZFZhcmlhbmNlXCJdIHx8IDApO1xuXG4gICAgICAgICAgICAvLyByYWRpYWwgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICB0aGlzLnJhZGlhbEFjY2VsID0gcGFyc2VGbG9hdChkaWN0W1wicmFkaWFsQWNjZWxlcmF0aW9uXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yYWRpYWxBY2NlbFZhciA9IHBhcnNlRmxvYXQoZGljdFtcInJhZGlhbEFjY2VsVmFyaWFuY2VcIl0gfHwgMCk7XG5cbiAgICAgICAgICAgIC8vIHRhbmdlbnRpYWwgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICB0aGlzLnRhbmdlbnRpYWxBY2NlbCA9IHBhcnNlRmxvYXQoZGljdFtcInRhbmdlbnRpYWxBY2NlbGVyYXRpb25cIl0gfHwgMCk7XG4gICAgICAgICAgICB0aGlzLnRhbmdlbnRpYWxBY2NlbFZhciA9IHBhcnNlRmxvYXQoZGljdFtcInRhbmdlbnRpYWxBY2NlbFZhcmlhbmNlXCJdIHx8IDApO1xuXG4gICAgICAgICAgICAvLyByb3RhdGlvbiBpcyBkaXJcbiAgICAgICAgICAgIGxldCBsb2NSb3RhdGlvbklzRGlyID0gZGljdFtcInJvdGF0aW9uSXNEaXJcIl0gfHwgXCJcIjtcbiAgICAgICAgICAgIGlmIChsb2NSb3RhdGlvbklzRGlyICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbG9jUm90YXRpb25Jc0RpciA9IGxvY1JvdGF0aW9uSXNEaXIudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm90YXRpb25Jc0RpciA9IChsb2NSb3RhdGlvbklzRGlyID09PSBcInRydWVcIiB8fCBsb2NSb3RhdGlvbklzRGlyID09PSBcIjFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdGF0aW9uSXNEaXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVtaXR0ZXJNb2RlID09PSBFbWl0dGVyTW9kZS5SQURJVVMpIHtcbiAgICAgICAgICAgIC8vIG9yIE1vZGUgQjogcmFkaXVzIG1vdmVtZW50XG4gICAgICAgICAgICB0aGlzLnN0YXJ0UmFkaXVzID0gcGFyc2VGbG9hdChkaWN0W1wibWF4UmFkaXVzXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5zdGFydFJhZGl1c1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcIm1heFJhZGl1c1ZhcmlhbmNlXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5lbmRSYWRpdXMgPSBwYXJzZUZsb2F0KGRpY3RbXCJtaW5SYWRpdXNcIl0gfHwgMCk7XG4gICAgICAgICAgICB0aGlzLmVuZFJhZGl1c1ZhciA9IHBhcnNlRmxvYXQoZGljdFtcIm1pblJhZGl1c1ZhcmlhbmNlXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVQZXJTID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRlUGVyU2Vjb25kXCJdIHx8IDApO1xuICAgICAgICAgICAgdGhpcy5yb3RhdGVQZXJTVmFyID0gcGFyc2VGbG9hdChkaWN0W1wicm90YXRlUGVyU2Vjb25kVmFyaWFuY2VcIl0gfHwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoNjAwOSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0VGV4dHVyZVdpdGhEaWN0aW9uYXJ5KGRpY3QpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9nZXRUZXh0dXJlKCk7XG4gICAgICAgIGlmICghdGV4dHVyZSB8fCAhdGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcblxuICAgIF9vblRleHR1cmVMb2FkZWQgKCkge1xuICAgICAgICB0aGlzLl9zaW11bGF0b3IudXBkYXRlVVZzKHRydWUpO1xuICAgICAgICB0aGlzLl9zeW5jQXNwZWN0KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICB9LFxuXG4gICAgX3N5bmNBc3BlY3QgKCkge1xuICAgICAgICBsZXQgZnJhbWVSZWN0ID0gdGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUuX3JlY3Q7XG4gICAgICAgIHRoaXMuX2FzcGVjdFJhdGlvID0gZnJhbWVSZWN0LndpZHRoIC8gZnJhbWVSZWN0LmhlaWdodDtcbiAgICB9LFxuXG4gICAgX2FwcGx5U3ByaXRlRnJhbWUgKCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSA9IHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lIHx8IHRoaXMuX3Nwcml0ZUZyYW1lO1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyU3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZS50ZXh0dXJlTG9hZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vblRleHR1cmVMb2FkZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlclNwcml0ZUZyYW1lLm9uVGV4dHVyZUxvYWRlZCh0aGlzLl9vblRleHR1cmVMb2FkZWQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRUZXh0dXJlICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZSAmJiB0aGlzLl9yZW5kZXJTcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCkpIHx8IHRoaXMuX3RleHR1cmU7XG4gICAgfSxcblxuICAgIF91cGRhdGVNYXRlcmlhbCAoKSB7XG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmICghbWF0ZXJpYWwpIHJldHVybjtcblxuICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsIHRoaXMuX3Bvc2l0aW9uVHlwZSAhPT0gUG9zaXRpb25UeXBlLkZSRUUpO1xuICAgICAgICBtYXRlcmlhbC5zZXRQcm9wZXJ0eSgndGV4dHVyZScsIHRoaXMuX2dldFRleHR1cmUoKSk7XG5cbiAgICAgICAgQmxlbmRGdW5jLnByb3RvdHlwZS5fdXBkYXRlTWF0ZXJpYWwuY2FsbCh0aGlzKTtcbiAgICB9LFxuXG4gICAgX2ZpbmlzaGVkU2ltdWxhdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2aWV3ICYmIHRoaXMuX2ZvY3VzZWQgJiYgIXRoaXMuYWN0aXZlICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFN5c3RlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzZXRTeXN0ZW0oKTtcbiAgICAgICAgdGhpcy5zdG9wU3lzdGVtKCk7XG4gICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICBpZiAodGhpcy5hdXRvUmVtb3ZlT25GaW5pc2ggJiYgdGhpcy5fc3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5QYXJ0aWNsZVN5c3RlbSA9IG1vZHVsZS5leHBvcnRzID0gUGFydGljbGVTeXN0ZW07XG5cbiJdLCJzb3VyY2VSb290IjoiLyJ9