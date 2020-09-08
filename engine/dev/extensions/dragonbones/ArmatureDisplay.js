
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/dragonbones/ArmatureDisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
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
var RenderComponent = require('../../cocos2d/core/components/CCRenderComponent');

var EventTarget = require('../../cocos2d/core/event/event-target');

var Graphics = require('../../cocos2d/core/graphics/graphics');

var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_POST_RENDER = RenderFlow.FLAG_POST_RENDER;

var ArmatureCache = require('./ArmatureCache');

var AttachUtil = require('./AttachUtil');
/**
 * @module dragonBones
 */


var DefaultArmaturesEnum = cc.Enum({
  'default': -1
});
var DefaultAnimsEnum = cc.Enum({
  '<None>': 0
});
var DefaultCacheMode = cc.Enum({
  'REALTIME': 0
});
/**
 * !#en Enum for cache mode type.
 * !#zh Dragonbones渲染类型
 * @enum ArmatureDisplay.AnimationCacheMode
 */

var AnimationCacheMode = cc.Enum({
  /**
   * !#en The realtime mode.
   * !#zh 实时计算模式。
   * @property {Number} REALTIME
   */
  REALTIME: 0,

  /**
   * !#en The shared cache mode.
   * !#zh 共享缓存模式。
   * @property {Number} SHARED_CACHE
   */
  SHARED_CACHE: 1,

  /**
   * !#en The private cache mode.
   * !#zh 私有缓存模式。
   * @property {Number} PRIVATE_CACHE
   */
  PRIVATE_CACHE: 2
});

function setEnumAttr(obj, propName, enumDef) {
  cc.Class.Attr.setClassAttr(obj, propName, 'type', 'Enum');
  cc.Class.Attr.setClassAttr(obj, propName, 'enumList', cc.Enum.getList(enumDef));
}
/**
 * !#en
 * The Armature Display of DragonBones <br/>
 * <br/>
 * (Armature Display has a reference to a DragonBonesAsset and stores the state for ArmatureDisplay instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple Armature Display can use the same DragonBonesAsset which includes all animations, skins, and attachments.) <br/>
 * !#zh
 * DragonBones 骨骼动画 <br/>
 * <br/>
 * (Armature Display 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Armature Display 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。)<br/>
 *
 * @class ArmatureDisplay
 * @extends RenderComponent
 */


var ArmatureDisplay = cc.Class({
  name: 'dragonBones.ArmatureDisplay',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/DragonBones',
    inspector: 'packages://inspector/inspectors/comps/skeleton2d.js'
  },
  statics: {
    AnimationCacheMode: AnimationCacheMode
  },
  properties: {
    _factory: {
      "default": null,
      type: dragonBones.CCFactory,
      serializable: false
    },

    /**
     * !#en
     * The DragonBones data contains the armatures information (bind pose bones, slots, draw order,
     * attachments, skins, etc) and animations but does not hold any state.<br/>
     * Multiple ArmatureDisplay can share the same DragonBones data.
     * !#zh
     * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
     * attachments，皮肤等等）和动画但不持有任何状态。<br/>
     * 多个 ArmatureDisplay 可以共用相同的骨骼数据。
     * @property {DragonBonesAsset} dragonAsset
     */
    dragonAsset: {
      "default": null,
      type: dragonBones.DragonBonesAsset,
      notify: function notify() {
        this._refresh();

        if (CC_EDITOR) {
          this._defaultArmatureIndex = 0;
          this._animationIndex = 0;
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.dragon_bones_asset'
    },

    /**
     * !#en
     * The atlas asset for the DragonBones.
     * !#zh
     * 骨骼数据所需的 Atlas Texture 数据。
     * @property {DragonBonesAtlasAsset} dragonAtlasAsset
     */
    dragonAtlasAsset: {
      "default": null,
      type: dragonBones.DragonBonesAtlasAsset,
      notify: function notify() {
        // parse the atlas asset data
        this._parseDragonAtlasAsset();

        this._refresh();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.dragon_bones_atlas_asset'
    },
    _armatureName: '',

    /**
     * !#en The name of current armature.
     * !#zh 当前的 Armature 名称。
     * @property {String} armatureName
     */
    armatureName: {
      get: function get() {
        return this._armatureName;
      },
      set: function set(value) {
        this._armatureName = value;
        var animNames = this.getAnimationNames(this._armatureName);

        if (!this.animationName || animNames.indexOf(this.animationName) < 0) {
          if (CC_EDITOR) {
            this.animationName = animNames[0];
          } else {
            // Not use default animation name at runtime
            this.animationName = '';
          }
        }

        if (this._armature && !this.isAnimationCached()) {
          this._factory._dragonBones.clock.remove(this._armature);
        }

        this._refresh();

        if (this._armature && !this.isAnimationCached()) {
          this._factory._dragonBones.clock.add(this._armature);
        }
      },
      visible: false
    },
    _animationName: '',

    /**
     * !#en The name of current playing animation.
     * !#zh 当前播放的动画名称。
     * @property {String} animationName
     */
    animationName: {
      get: function get() {
        return this._animationName;
      },
      set: function set(value) {
        this._animationName = value;
      },
      visible: false
    },

    /**
     * @property {Number} _defaultArmatureIndex
     */
    _defaultArmatureIndex: {
      "default": 0,
      notify: function notify() {
        var armatureName = '';

        if (this.dragonAsset) {
          var armaturesEnum;

          if (this.dragonAsset) {
            armaturesEnum = this.dragonAsset.getArmatureEnum();
          }

          if (!armaturesEnum) {
            return cc.errorID(7400, this.name);
          }

          armatureName = armaturesEnum[this._defaultArmatureIndex];
        }

        if (armatureName !== undefined) {
          this.armatureName = armatureName;
        } else {
          cc.errorID(7401, this.name);
        }
      },
      type: DefaultArmaturesEnum,
      visible: true,
      editorOnly: true,
      animatable: false,
      displayName: "Armature",
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.armature_name'
    },
    // value of 0 represents no animation
    _animationIndex: {
      "default": 0,
      notify: function notify() {
        if (this._animationIndex === 0) {
          this.animationName = '';
          return;
        }

        var animsEnum;

        if (this.dragonAsset) {
          animsEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
        }

        if (!animsEnum) {
          return;
        }

        var animName = animsEnum[this._animationIndex];

        if (animName !== undefined) {
          this.playAnimation(animName, this.playTimes);
        } else {
          cc.errorID(7402, this.name);
        }
      },
      type: DefaultAnimsEnum,
      visible: true,
      editorOnly: true,
      displayName: 'Animation',
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.animation_name'
    },
    // Record pre cache mode.
    _preCacheMode: -1,
    _cacheMode: AnimationCacheMode.REALTIME,
    _defaultCacheMode: {
      "default": 0,
      type: AnimationCacheMode,
      notify: function notify() {
        if (this._defaultCacheMode !== AnimationCacheMode.REALTIME) {
          if (this._armature && !ArmatureCache.canCache(this._armature)) {
            this._defaultCacheMode = AnimationCacheMode.REALTIME;
            cc.warn("Animation cache mode doesn't support skeletal nesting");
            return;
          }
        }

        this.setAnimationCacheMode(this._defaultCacheMode);
      },
      editorOnly: true,
      visible: true,
      animatable: false,
      displayName: "Animation Cache Mode",
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.animation_cache_mode'
    },

    /**
     * !#en The time scale of this armature.
     * !#zh 当前骨骼中所有动画的时间缩放率。
     * @property {Number} timeScale
     * @default 1
     */
    timeScale: {
      "default": 1,
      notify: function notify() {
        if (this._armature && !this.isAnimationCached()) {
          this._armature.animation.timeScale = this.timeScale;
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.time_scale'
    },

    /**
     * !#en The play times of the default animation.
     *      -1 means using the value of config file;
     *      0 means repeat for ever
     *      >0 means repeat times
     * !#zh 播放默认动画的循环次数
     *      -1 表示使用配置文件中的默认值;
     *      0 表示无限循环
     *      >0 表示循环次数
     * @property {Number} playTimes
     * @default -1
     */
    playTimes: {
      "default": -1,
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.play_times'
    },

    /**
     * !#en Indicates whether to enable premultiplied alpha.
     * You should disable this option when image's transparent area appears to have opaque pixels,
     * or enable this option when image's half transparent area appears to be darken.
     * !#zh 是否启用贴图预乘。
     * 当图片的透明区域出现色块时需要关闭该选项，当图片的半透明区域颜色变黑时需要启用该选项。
     * @property {Boolean} premultipliedAlpha
     * @default false
     */
    premultipliedAlpha: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.premultipliedAlpha'
    },

    /**
     * !#en Indicates whether open debug bones.
     * !#zh 是否显示 bone 的 debug 信息。
     * @property {Boolean} debugBones
     * @default false
     */
    debugBones: {
      "default": false,
      notify: function notify() {
        this._updateDebugDraw();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.debug_bones'
    },

    /**
     * !#en Enabled batch model, if skeleton is complex, do not enable batch, or will lower performance.
     * !#zh 开启合批，如果渲染大量相同纹理，且结构简单的骨骼动画，开启合批可以降低drawcall，否则请不要开启，cpu消耗会上升。
     * @property {Boolean} enableBatch
     * @default false
     */
    enableBatch: {
      "default": false,
      notify: function notify() {
        this._updateBatch();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.dragon_bones.enabled_batch'
    },
    // DragonBones data store key.
    _armatureKey: "",
    // Below properties will effect when cache mode is SHARED_CACHE or PRIVATE_CACHE.
    // accumulate time
    _accTime: 0,
    // Play times counter
    _playCount: 0,
    // Frame cache
    _frameCache: null,
    // Cur frame
    _curFrame: null,
    // Playing flag
    _playing: false,
    // Armature cache
    _armatureCache: null
  },
  ctor: function ctor() {
    // Property _materialCache Use to cache material,since dragonBones may use multiple texture,
    // it will clone from the '_material' property,if the dragonbones only have one texture,
    // it will just use the _material,won't clone it.
    // So if invoke getMaterial,it only return _material,if you want to change all materialCache,
    // you can change materialCache directly.
    this._eventTarget = new EventTarget();
    this._materialCache = {};
    this._inited = false;
    this.attachUtil = new AttachUtil();
    this._factory = dragonBones.CCFactory.getInstance();
  },
  onLoad: function onLoad() {
    // Adapt to old code,remove unuse child which is created by old code.
    // This logic can be remove after 2.2 or later.
    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      var pos = child._name && child._name.search('CHILD_ARMATURE-');

      if (pos === 0) {
        child.destroy();
      }
    }
  },
  // if change use batch mode, just clear material cache
  _updateBatch: function _updateBatch() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
    }

    this._materialCache = {};
  },
  // override base class _updateMaterial to set define value and clear material cache
  _updateMaterial: function _updateMaterial() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
      baseMaterial.define('USE_TEXTURE', true);
      var srcBlendFactor = this.premultipliedAlpha ? cc.gfx.BLEND_ONE : cc.gfx.BLEND_SRC_ALPHA;
      var dstBlendFactor = cc.gfx.BLEND_ONE_MINUS_SRC_ALPHA;
      baseMaterial.setBlend(true, cc.gfx.BLEND_FUNC_ADD, srcBlendFactor, srcBlendFactor, cc.gfx.BLEND_FUNC_ADD, dstBlendFactor, dstBlendFactor);
    }

    this._materialCache = {};
  },
  // override base class disableRender to clear post render flag
  disableRender: function disableRender() {
    this._super();

    this.node._renderFlag &= ~FLAG_POST_RENDER;
  },
  // override base class disableRender to add post render flag
  markForRender: function markForRender(enable) {
    this._super(enable);

    if (enable) {
      this.node._renderFlag |= FLAG_POST_RENDER;
    } else {
      this.node._renderFlag &= ~FLAG_POST_RENDER;
    }
  },
  _validateRender: function _validateRender() {
    var texture = this.dragonAtlasAsset && this.dragonAtlasAsset.texture;

    if (!texture || !texture.loaded) {
      this.disableRender();
      return;
    }

    this._super();
  },
  __preload: function __preload() {
    this._init();
  },
  _init: function _init() {
    if (this._inited) return;
    this._inited = true;

    this._resetAssembler();

    this._activateMaterial();

    this._parseDragonAtlasAsset();

    this._refresh();

    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      if (child && child._name === "DEBUG_DRAW_NODE") {
        child.destroy();
      }
    }

    this._updateDebugDraw();
  },

  /**
   * !#en
   * The key of dragonbones cache data, which is regard as 'dragonbonesName', when you want to change dragonbones cloth.
   * !#zh 
   * 缓存龙骨数据的key值，换装的时会使用到该值，作为dragonbonesName使用
   * @method getArmatureKey
   * @return {String}
   * @example
   * let factory = dragonBones.CCFactory.getInstance();
   * let needChangeSlot = needChangeArmature.armature().getSlot("changeSlotName");
   * factory.replaceSlotDisplay(toChangeArmature.getArmatureKey(), "armatureName", "slotName", "displayName", needChangeSlot);
   */
  getArmatureKey: function getArmatureKey() {
    return this._armatureKey;
  },

  /**
   * !#en
   * It's best to set cache mode before set property 'dragonAsset', or will waste some cpu time.
   * If set the mode in editor, then no need to worry about order problem.
   * !#zh 
   * 若想切换渲染模式，最好在设置'dragonAsset'之前，先设置好渲染模式，否则有运行时开销。
   * 若在编辑中设置渲染模式，则无需担心设置次序的问题。
   * 
   * @method setAnimationCacheMode
   * @param {AnimationCacheMode} cacheMode
   * @example
   * armatureDisplay.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
   */
  setAnimationCacheMode: function setAnimationCacheMode(cacheMode) {
    if (this._preCacheMode !== cacheMode) {
      this._cacheMode = cacheMode;

      this._buildArmature();

      if (this._armature && !this.isAnimationCached()) {
        this._factory._dragonBones.clock.add(this._armature);
      }
    }
  },

  /**
   * !#en Whether in cached mode.
   * !#zh 当前是否处于缓存模式。
   * @method isAnimationCached
   * @return {Boolean}
   */
  isAnimationCached: function isAnimationCached() {
    if (CC_EDITOR) return false;
    return this._cacheMode !== AnimationCacheMode.REALTIME;
  },
  onEnable: function onEnable() {
    this._super(); // If cache mode is cache, no need to update by dragonbones library.


    if (this._armature && !this.isAnimationCached()) {
      this._factory._dragonBones.clock.add(this._armature);
    }
  },
  onDisable: function onDisable() {
    this._super(); // If cache mode is cache, no need to update by dragonbones library.


    if (this._armature && !this.isAnimationCached()) {
      this._factory._dragonBones.clock.remove(this._armature);
    }
  },
  _emitCacheCompleteEvent: function _emitCacheCompleteEvent() {
    // Animation loop complete, the event diffrent from dragonbones inner event,
    // It has no event object.
    this._eventTarget.emit(dragonBones.EventObject.LOOP_COMPLETE); // Animation complete the event diffrent from dragonbones inner event,
    // It has no event object.


    this._eventTarget.emit(dragonBones.EventObject.COMPLETE);
  },
  update: function update(dt) {
    if (!this.isAnimationCached()) return;
    if (!this._frameCache) return;
    var frameCache = this._frameCache;

    if (!frameCache.isInited()) {
      return;
    }

    var frames = frameCache.frames;

    if (!this._playing) {
      if (frameCache.isInvalid()) {
        frameCache.updateToFrame();
        this._curFrame = frames[frames.length - 1];
      }

      return;
    }

    var frameTime = ArmatureCache.FrameTime; // Animation Start, the event diffrent from dragonbones inner event,
    // It has no event object.

    if (this._accTime == 0 && this._playCount == 0) {
      this._eventTarget.emit(dragonBones.EventObject.START);
    }

    var globalTimeScale = dragonBones.timeScale;
    this._accTime += dt * this.timeScale * globalTimeScale;
    var frameIdx = Math.floor(this._accTime / frameTime);

    if (!frameCache.isCompleted) {
      frameCache.updateToFrame(frameIdx);
    }

    if (frameCache.isCompleted && frameIdx >= frames.length) {
      this._playCount++;

      if (this.playTimes > 0 && this._playCount >= this.playTimes) {
        // set frame to end frame.
        this._curFrame = frames[frames.length - 1];
        this._accTime = 0;
        this._playing = false;
        this._playCount = 0;

        this._emitCacheCompleteEvent();

        return;
      }

      this._accTime = 0;
      frameIdx = 0;

      this._emitCacheCompleteEvent();
    }

    this._curFrame = frames[frameIdx];
  },
  onDestroy: function onDestroy() {
    this._super();

    this._inited = false;

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._armatureCache.dispose();

        this._armatureCache = null;
        this._armature = null;
      } else if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._armatureCache = null;
        this._armature = null;
      } else if (this._armature) {
        this._armature.dispose();

        this._armature = null;
      }
    } else {
      if (this._armature) {
        this._armature.dispose();

        this._armature = null;
      }
    }
  },
  _updateDebugDraw: function _updateDebugDraw() {
    if (this.debugBones) {
      if (!this._debugDraw) {
        var debugDrawNode = new cc.PrivateNode();
        debugDrawNode.name = 'DEBUG_DRAW_NODE';
        var debugDraw = debugDrawNode.addComponent(Graphics);
        debugDraw.lineWidth = 1;
        debugDraw.strokeColor = cc.color(255, 0, 0, 255);
        this._debugDraw = debugDraw;
      }

      this._debugDraw.node.parent = this.node;
    } else if (this._debugDraw) {
      this._debugDraw.node.parent = null;
    }
  },
  _buildArmature: function _buildArmature() {
    if (!this.dragonAsset || !this.dragonAtlasAsset || !this.armatureName) return; // Switch Asset or Atlas or cacheMode will rebuild armature.

    if (this._armature) {
      // dispose pre build armature
      if (!CC_EDITOR) {
        if (this._preCacheMode === AnimationCacheMode.PRIVATE_CACHE) {
          this._armatureCache.dispose();
        } else if (this._preCacheMode === AnimationCacheMode.REALTIME) {
          this._armature.dispose();
        }
      } else {
        this._armature.dispose();
      }

      this._armatureCache = null;
      this._armature = null;
      this._displayProxy = null;
      this._frameCache = null;
      this._curFrame = null;
      this._playing = false;
      this._preCacheMode = null;
    }

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._armatureCache = ArmatureCache.sharedCache;
      } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._armatureCache = new ArmatureCache();

        this._armatureCache.enablePrivateMode();
      }
    }

    var atlasUUID = this.dragonAtlasAsset._uuid;
    this._armatureKey = this.dragonAsset.init(this._factory, atlasUUID);

    if (this.isAnimationCached()) {
      this._armature = this._armatureCache.getArmatureCache(this.armatureName, this._armatureKey, atlasUUID);

      if (!this._armature) {
        // Cache fail,swith to REALTIME cache mode.
        this._cacheMode = AnimationCacheMode.REALTIME;
      }
    }

    this._preCacheMode = this._cacheMode;

    if (CC_EDITOR || this._cacheMode === AnimationCacheMode.REALTIME) {
      this._displayProxy = this._factory.buildArmatureDisplay(this.armatureName, this._armatureKey, "", atlasUUID);
      if (!this._displayProxy) return;
      this._displayProxy._ccNode = this.node;

      this._displayProxy.setEventTarget(this._eventTarget);

      this._armature = this._displayProxy._armature;
      this._armature.animation.timeScale = this.timeScale; // If change mode or armature, armature must insert into clock.
      // this._factory._dragonBones.clock.add(this._armature);
    }

    if (this._cacheMode !== AnimationCacheMode.REALTIME && this.debugBones) {
      cc.warn("Debug bones is invalid in cached mode");
    }

    if (this._armature) {
      var armatureData = this._armature.armatureData;
      var aabb = armatureData.aabb;
      this.node.setContentSize(aabb.width, aabb.height);
    }

    this._updateBatch();

    this.attachUtil.init(this);

    this.attachUtil._associateAttachedNode();

    if (this.animationName) {
      this.playAnimation(this.animationName, this.playTimes);
    }

    this.markForRender(true);
  },
  _parseDragonAtlasAsset: function _parseDragonAtlasAsset() {
    if (this.dragonAtlasAsset) {
      this.dragonAtlasAsset.init(this._factory);
    }
  },
  _refresh: function _refresh() {
    this._buildArmature();

    if (CC_EDITOR) {
      // update inspector
      this._updateArmatureEnum();

      this._updateAnimEnum();

      this._updateCacheModeEnum();

      Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
    }
  },
  _updateCacheModeEnum: CC_EDITOR && function () {
    if (this._armature) {
      setEnumAttr(this, '_defaultCacheMode', AnimationCacheMode);
    } else {
      setEnumAttr(this, '_defaultCacheMode', DefaultCacheMode);
    }
  },
  // update animation list for editor
  _updateAnimEnum: CC_EDITOR && function () {
    var animEnum;

    if (this.dragonAsset) {
      animEnum = this.dragonAsset.getAnimsEnum(this.armatureName);
    } // change enum


    setEnumAttr(this, '_animationIndex', animEnum || DefaultAnimsEnum);
  },
  // update armature list for editor
  _updateArmatureEnum: CC_EDITOR && function () {
    var armatureEnum;

    if (this.dragonAsset) {
      armatureEnum = this.dragonAsset.getArmatureEnum();
    } // change enum


    setEnumAttr(this, '_defaultArmatureIndex', armatureEnum || DefaultArmaturesEnum);
  },

  /**
   * !#en
   * Play the specified animation.
   * Parameter animName specify the animation name.
   * Parameter playTimes specify the repeat times of the animation.
   * -1 means use the value of the config file.
   * 0 means play the animation for ever.
   * >0 means repeat times.
   * !#zh 
   * 播放指定的动画.
   * animName 指定播放动画的名称。
   * playTimes 指定播放动画的次数。
   * -1 为使用配置文件中的次数。
   * 0 为无限循环播放。
   * >0 为动画的重复次数。
   * @method playAnimation
   * @param {String} animName
   * @param {Number} playTimes
   * @return {dragonBones.AnimationState}
   */
  playAnimation: function playAnimation(animName, playTimes) {
    this.playTimes = playTimes === undefined ? -1 : playTimes;
    this.animationName = animName;

    if (this.isAnimationCached()) {
      var cache = this._armatureCache.getAnimationCache(this._armatureKey, animName);

      if (!cache) {
        cache = this._armatureCache.initAnimationCache(this._armatureKey, animName);
      }

      if (cache) {
        this._accTime = 0;
        this._playCount = 0;
        this._frameCache = cache;

        if (this.attachUtil._hasAttachedNode()) {
          this._frameCache.enableCacheAttachedInfo();
        }

        this._frameCache.updateToFrame(0);

        this._playing = true;
        this._curFrame = this._frameCache.frames[0];
      }
    } else {
      if (this._armature) {
        return this._armature.animation.play(animName, this.playTimes);
      }
    }
  },

  /**
   * !#en
   * Updating an animation cache to calculate all frame data in the animation is a cost in 
   * performance due to calculating all data in a single frame.
   * To update the cache, use the invalidAnimationCache method with high performance.
   * !#zh
   * 更新某个动画缓存, 预计算动画中所有帧数据，由于在单帧计算所有数据，所以较消耗性能。
   * 若想更新缓存，可使用 invalidAnimationCache 方法，具有较高性能。
   * @method updateAnimationCache
   * @param {String} animName
   */
  updateAnimationCache: function updateAnimationCache(animName) {
    if (!this.isAnimationCached()) return;

    this._armatureCache.updateAnimationCache(this._armatureKey, animName);
  },

  /**
   * !#en
   * Invalidates the animation cache, which is then recomputed on each frame..
   * !#zh
   * 使动画缓存失效，之后会在每帧重新计算。
   * @method invalidAnimationCache
   */
  invalidAnimationCache: function invalidAnimationCache() {
    if (!this.isAnimationCached()) return;

    this._armatureCache.invalidAnimationCache(this._armatureKey);
  },

  /**
   * !#en
   * Get the all armature names in the DragonBones Data.
   * !#zh
   * 获取 DragonBones 数据中所有的 armature 名称
   * @method getArmatureNames
   * @returns {Array}
   */
  getArmatureNames: function getArmatureNames() {
    var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

    return dragonBonesData && dragonBonesData.armatureNames || [];
  },

  /**
   * !#en
   * Get the all animation names of specified armature.
   * !#zh
   * 获取指定的 armature 的所有动画名称。
   * @method getAnimationNames
   * @param {String} armatureName
   * @returns {Array}
   */
  getAnimationNames: function getAnimationNames(armatureName) {
    var ret = [];

    var dragonBonesData = this._factory.getDragonBonesData(this._armatureKey);

    if (dragonBonesData) {
      var armatureData = dragonBonesData.getArmature(armatureName);

      if (armatureData) {
        for (var animName in armatureData.animations) {
          if (armatureData.animations.hasOwnProperty(animName)) {
            ret.push(animName);
          }
        }
      }
    }

    return ret;
  },

  /**
   * !#en
   * Add event listener for the DragonBones Event, the same to addEventListener.
   * !#zh
   * 添加 DragonBones 事件监听器，与 addEventListener 作用相同。
   * @method on
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  on: function on(eventType, listener, target) {
    this.addEventListener(eventType, listener, target);
  },

  /**
   * !#en
   * Remove the event listener for the DragonBones Event, the same to removeEventListener.
   * !#zh
   * 移除 DragonBones 事件监听器，与 removeEventListener 作用相同。
   * @method off
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} [listener]
   * @param {Object} [target]
   */
  off: function off(eventType, listener, target) {
    this.removeEventListener(eventType, listener, target);
  },

  /**
   * !#en
   * Add DragonBones one-time event listener, the callback will remove itself after the first time it is triggered.
   * !#zh
   * 添加 DragonBones 一次性事件监听器，回调会在第一时间被触发后删除自身。
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  once: function once(eventType, listener, target) {
    this._eventTarget.once(eventType, listener, target);
  },

  /**
   * !#en
   * Add event listener for the DragonBones Event.
   * !#zh
   * 添加 DragonBones 事件监听器。
   * @method addEventListener
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} listener - The callback that will be invoked when the event is dispatched.
   * @param {Event} listener.event event
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   */
  addEventListener: function addEventListener(eventType, listener, target) {
    this._eventTarget.on(eventType, listener, target);
  },

  /**
   * !#en
   * Remove the event listener for the DragonBones Event.
   * !#zh
   * 移除 DragonBones 事件监听器。
   * @method removeEventListener
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} [listener]
   * @param {Object} [target]
   */
  removeEventListener: function removeEventListener(eventType, listener, target) {
    this._eventTarget.off(eventType, listener, target);
  },

  /**
   * !#en
   * Build the armature for specified name.
   * !#zh
   * 构建指定名称的 armature 对象
   * @method buildArmature
   * @param {String} armatureName
   * @param {Node} node
   * @return {dragonBones.ArmatureDisplay}
   */
  buildArmature: function buildArmature(armatureName, node) {
    return this._factory.createArmatureNode(this, armatureName, node);
  },

  /**
   * !#en
   * Get the current armature object of the ArmatureDisplay.
   * !#zh
   * 获取 ArmatureDisplay 当前使用的 Armature 对象
   * @method armature
   * @returns {Object}
   */
  armature: function armature() {
    return this._armature;
  }
});
/**
 * !#en
 * Animation start play.
 * !#zh
 * 动画开始播放。
 *
 * @event dragonBones.EventObject.START
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation loop play complete once.
 * !#zh
 * 动画循环播放完成一次。
 *
 * @event dragonBones.EventObject.LOOP_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation play complete.
 * !#zh
 * 动画播放完成。
 *
 * @event dragonBones.EventObject.COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in start.
 * !#zh
 * 动画淡入开始。
 *
 * @event dragonBones.EventObject.FADE_IN
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade in complete.
 * !#zh
 * 动画淡入完成。
 *
 * @event dragonBones.EventObject.FADE_IN_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out start.
 * !#zh
 * 动画淡出开始。
 *
 * @event dragonBones.EventObject.FADE_OUT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation fade out complete.
 * !#zh
 * 动画淡出完成。
 *
 * @event dragonBones.EventObject.FADE_OUT_COMPLETE
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 */

/**
 * !#en
 * Animation frame event.
 * !#zh
 * 动画帧事件。
 *
 * @event dragonBones.EventObject.FRAME_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */

/**
 * !#en
 * Animation frame sound event.
 * !#zh
 * 动画帧声音事件。
 *
 * @event dragonBones.EventObject.SOUND_EVENT
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {dragonBones.EventObject} [callback.event]
 * @param {String} [callback.event.type]
 * @param {String} [callback.event.name]
 * @param {dragonBones.Armature} [callback.event.armature]
 * @param {dragonBones.AnimationState} [callback.event.animationState]
 * @param {dragonBones.Bone} [callback.event.bone]
 * @param {dragonBones.Slot} [callback.event.slot]
 */

module.exports = dragonBones.ArmatureDisplay = ArmatureDisplay;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9kcmFnb25ib25lcy9Bcm1hdHVyZURpc3BsYXkuanMiXSwibmFtZXMiOlsiUmVuZGVyQ29tcG9uZW50IiwicmVxdWlyZSIsIkV2ZW50VGFyZ2V0IiwiR3JhcGhpY3MiLCJSZW5kZXJGbG93IiwiRkxBR19QT1NUX1JFTkRFUiIsIkFybWF0dXJlQ2FjaGUiLCJBdHRhY2hVdGlsIiwiRGVmYXVsdEFybWF0dXJlc0VudW0iLCJjYyIsIkVudW0iLCJEZWZhdWx0QW5pbXNFbnVtIiwiRGVmYXVsdENhY2hlTW9kZSIsIkFuaW1hdGlvbkNhY2hlTW9kZSIsIlJFQUxUSU1FIiwiU0hBUkVEX0NBQ0hFIiwiUFJJVkFURV9DQUNIRSIsInNldEVudW1BdHRyIiwib2JqIiwicHJvcE5hbWUiLCJlbnVtRGVmIiwiQ2xhc3MiLCJBdHRyIiwic2V0Q2xhc3NBdHRyIiwiZ2V0TGlzdCIsIkFybWF0dXJlRGlzcGxheSIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaW5zcGVjdG9yIiwic3RhdGljcyIsInByb3BlcnRpZXMiLCJfZmFjdG9yeSIsInR5cGUiLCJkcmFnb25Cb25lcyIsIkNDRmFjdG9yeSIsInNlcmlhbGl6YWJsZSIsImRyYWdvbkFzc2V0IiwiRHJhZ29uQm9uZXNBc3NldCIsIm5vdGlmeSIsIl9yZWZyZXNoIiwiX2RlZmF1bHRBcm1hdHVyZUluZGV4IiwiX2FuaW1hdGlvbkluZGV4IiwidG9vbHRpcCIsIkNDX0RFViIsImRyYWdvbkF0bGFzQXNzZXQiLCJEcmFnb25Cb25lc0F0bGFzQXNzZXQiLCJfcGFyc2VEcmFnb25BdGxhc0Fzc2V0IiwiX2FybWF0dXJlTmFtZSIsImFybWF0dXJlTmFtZSIsImdldCIsInNldCIsInZhbHVlIiwiYW5pbU5hbWVzIiwiZ2V0QW5pbWF0aW9uTmFtZXMiLCJhbmltYXRpb25OYW1lIiwiaW5kZXhPZiIsIl9hcm1hdHVyZSIsImlzQW5pbWF0aW9uQ2FjaGVkIiwiX2RyYWdvbkJvbmVzIiwiY2xvY2siLCJyZW1vdmUiLCJhZGQiLCJ2aXNpYmxlIiwiX2FuaW1hdGlvbk5hbWUiLCJhcm1hdHVyZXNFbnVtIiwiZ2V0QXJtYXR1cmVFbnVtIiwiZXJyb3JJRCIsInVuZGVmaW5lZCIsImVkaXRvck9ubHkiLCJhbmltYXRhYmxlIiwiZGlzcGxheU5hbWUiLCJhbmltc0VudW0iLCJnZXRBbmltc0VudW0iLCJhbmltTmFtZSIsInBsYXlBbmltYXRpb24iLCJwbGF5VGltZXMiLCJfcHJlQ2FjaGVNb2RlIiwiX2NhY2hlTW9kZSIsIl9kZWZhdWx0Q2FjaGVNb2RlIiwiY2FuQ2FjaGUiLCJ3YXJuIiwic2V0QW5pbWF0aW9uQ2FjaGVNb2RlIiwidGltZVNjYWxlIiwiYW5pbWF0aW9uIiwicHJlbXVsdGlwbGllZEFscGhhIiwiZGVidWdCb25lcyIsIl91cGRhdGVEZWJ1Z0RyYXciLCJlbmFibGVCYXRjaCIsIl91cGRhdGVCYXRjaCIsIl9hcm1hdHVyZUtleSIsIl9hY2NUaW1lIiwiX3BsYXlDb3VudCIsIl9mcmFtZUNhY2hlIiwiX2N1ckZyYW1lIiwiX3BsYXlpbmciLCJfYXJtYXR1cmVDYWNoZSIsImN0b3IiLCJfZXZlbnRUYXJnZXQiLCJfbWF0ZXJpYWxDYWNoZSIsIl9pbml0ZWQiLCJhdHRhY2hVdGlsIiwiZ2V0SW5zdGFuY2UiLCJvbkxvYWQiLCJjaGlsZHJlbiIsIm5vZGUiLCJpIiwibiIsImxlbmd0aCIsImNoaWxkIiwicG9zIiwiX25hbWUiLCJzZWFyY2giLCJkZXN0cm95IiwiYmFzZU1hdGVyaWFsIiwiZ2V0TWF0ZXJpYWwiLCJkZWZpbmUiLCJfdXBkYXRlTWF0ZXJpYWwiLCJzcmNCbGVuZEZhY3RvciIsImdmeCIsIkJMRU5EX09ORSIsIkJMRU5EX1NSQ19BTFBIQSIsImRzdEJsZW5kRmFjdG9yIiwiQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQSIsInNldEJsZW5kIiwiQkxFTkRfRlVOQ19BREQiLCJkaXNhYmxlUmVuZGVyIiwiX3N1cGVyIiwiX3JlbmRlckZsYWciLCJtYXJrRm9yUmVuZGVyIiwiZW5hYmxlIiwiX3ZhbGlkYXRlUmVuZGVyIiwidGV4dHVyZSIsImxvYWRlZCIsIl9fcHJlbG9hZCIsIl9pbml0IiwiX3Jlc2V0QXNzZW1ibGVyIiwiX2FjdGl2YXRlTWF0ZXJpYWwiLCJnZXRBcm1hdHVyZUtleSIsImNhY2hlTW9kZSIsIl9idWlsZEFybWF0dXJlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJfZW1pdENhY2hlQ29tcGxldGVFdmVudCIsImVtaXQiLCJFdmVudE9iamVjdCIsIkxPT1BfQ09NUExFVEUiLCJDT01QTEVURSIsInVwZGF0ZSIsImR0IiwiZnJhbWVDYWNoZSIsImlzSW5pdGVkIiwiZnJhbWVzIiwiaXNJbnZhbGlkIiwidXBkYXRlVG9GcmFtZSIsImZyYW1lVGltZSIsIkZyYW1lVGltZSIsIlNUQVJUIiwiZ2xvYmFsVGltZVNjYWxlIiwiZnJhbWVJZHgiLCJNYXRoIiwiZmxvb3IiLCJpc0NvbXBsZXRlZCIsIm9uRGVzdHJveSIsImRpc3Bvc2UiLCJfZGVidWdEcmF3IiwiZGVidWdEcmF3Tm9kZSIsIlByaXZhdGVOb2RlIiwiZGVidWdEcmF3IiwiYWRkQ29tcG9uZW50IiwibGluZVdpZHRoIiwic3Ryb2tlQ29sb3IiLCJjb2xvciIsInBhcmVudCIsIl9kaXNwbGF5UHJveHkiLCJzaGFyZWRDYWNoZSIsImVuYWJsZVByaXZhdGVNb2RlIiwiYXRsYXNVVUlEIiwiX3V1aWQiLCJpbml0IiwiZ2V0QXJtYXR1cmVDYWNoZSIsImJ1aWxkQXJtYXR1cmVEaXNwbGF5IiwiX2NjTm9kZSIsInNldEV2ZW50VGFyZ2V0IiwiYXJtYXR1cmVEYXRhIiwiYWFiYiIsInNldENvbnRlbnRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJfYXNzb2NpYXRlQXR0YWNoZWROb2RlIiwiX3VwZGF0ZUFybWF0dXJlRW51bSIsIl91cGRhdGVBbmltRW51bSIsIl91cGRhdGVDYWNoZU1vZGVFbnVtIiwiRWRpdG9yIiwiVXRpbHMiLCJyZWZyZXNoU2VsZWN0ZWRJbnNwZWN0b3IiLCJ1dWlkIiwiYW5pbUVudW0iLCJhcm1hdHVyZUVudW0iLCJjYWNoZSIsImdldEFuaW1hdGlvbkNhY2hlIiwiaW5pdEFuaW1hdGlvbkNhY2hlIiwiX2hhc0F0dGFjaGVkTm9kZSIsImVuYWJsZUNhY2hlQXR0YWNoZWRJbmZvIiwicGxheSIsInVwZGF0ZUFuaW1hdGlvbkNhY2hlIiwiaW52YWxpZEFuaW1hdGlvbkNhY2hlIiwiZ2V0QXJtYXR1cmVOYW1lcyIsImRyYWdvbkJvbmVzRGF0YSIsImdldERyYWdvbkJvbmVzRGF0YSIsImFybWF0dXJlTmFtZXMiLCJyZXQiLCJnZXRBcm1hdHVyZSIsImFuaW1hdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsInB1c2giLCJvbiIsImV2ZW50VHlwZSIsImxpc3RlbmVyIiwidGFyZ2V0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvbmNlIiwiYnVpbGRBcm1hdHVyZSIsImNyZWF0ZUFybWF0dXJlTm9kZSIsImFybWF0dXJlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQU1BLGVBQWUsR0FBR0MsT0FBTyxDQUFDLGlEQUFELENBQS9COztBQUNBLElBQUlDLFdBQVcsR0FBR0QsT0FBTyxDQUFDLHVDQUFELENBQXpCOztBQUNBLElBQU1FLFFBQVEsR0FBR0YsT0FBTyxDQUFDLHNDQUFELENBQXhCOztBQUNBLElBQU1HLFVBQVUsR0FBR0gsT0FBTyxDQUFDLHlDQUFELENBQTFCOztBQUNBLElBQU1JLGdCQUFnQixHQUFHRCxVQUFVLENBQUNDLGdCQUFwQzs7QUFFQSxJQUFJQyxhQUFhLEdBQUdMLE9BQU8sQ0FBQyxpQkFBRCxDQUEzQjs7QUFDQSxJQUFJTSxVQUFVLEdBQUdOLE9BQU8sQ0FBQyxjQUFELENBQXhCO0FBRUE7Ozs7O0FBSUEsSUFBSU8sb0JBQW9CLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQUUsYUFBVyxDQUFDO0FBQWQsQ0FB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O0FBVUFHLEVBQUFBLG1CQWwzQjJCLCtCQWszQk5MLFNBbDNCTSxFQWszQktDLFFBbDNCTCxFQWszQmVDLE1BbDNCZixFQWszQnVCO0FBQzlDLFNBQUt6SCxZQUFMLENBQWtCMkgsR0FBbEIsQ0FBc0JKLFNBQXRCLEVBQWlDQyxRQUFqQyxFQUEyQ0MsTUFBM0M7QUFDSCxHQXAzQjBCOztBQXMzQjNCOzs7Ozs7Ozs7O0FBVUFLLEVBQUFBLGFBaDRCMkIseUJBZzRCWi9LLFlBaDRCWSxFQWc0QkV3RCxJQWg0QkYsRUFnNEJRO0FBQy9CLFdBQU8sS0FBS3pFLFFBQUwsQ0FBY2lNLGtCQUFkLENBQWlDLElBQWpDLEVBQXVDaEwsWUFBdkMsRUFBcUR3RCxJQUFyRCxDQUFQO0FBQ0gsR0FsNEIwQjs7QUFvNEIzQjs7Ozs7Ozs7QUFRQXlILEVBQUFBLFFBNTRCMkIsc0JBNDRCZjtBQUNSLFdBQU8sS0FBS3pLLFNBQVo7QUFDSDtBQTk0QjBCLENBQVQsQ0FBdEI7QUFpNUJBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBMEssTUFBTSxDQUFDQyxPQUFQLEdBQWlCbE0sV0FBVyxDQUFDVixlQUFaLEdBQThCQSxlQUEvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcbmxldCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4uLy4uL2NvY29zMmQvY29yZS9ldmVudC9ldmVudC10YXJnZXQnKTtcbmNvbnN0IEdyYXBoaWNzID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2dyYXBoaWNzL2dyYXBoaWNzJyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5jb25zdCBGTEFHX1BPU1RfUkVOREVSID0gUmVuZGVyRmxvdy5GTEFHX1BPU1RfUkVOREVSO1xuXG5sZXQgQXJtYXR1cmVDYWNoZSA9IHJlcXVpcmUoJy4vQXJtYXR1cmVDYWNoZScpO1xubGV0IEF0dGFjaFV0aWwgPSByZXF1aXJlKCcuL0F0dGFjaFV0aWwnKTtcblxuLyoqXG4gKiBAbW9kdWxlIGRyYWdvbkJvbmVzXG4gKi9cblxubGV0IERlZmF1bHRBcm1hdHVyZXNFbnVtID0gY2MuRW51bSh7ICdkZWZhdWx0JzogLTEgfSk7XG5sZXQgRGVmYXVsdEFuaW1zRW51bSA9IGNjLkVudW0oeyAnPE5vbmU+JzogMCB9KTtcbmxldCBEZWZhdWx0Q2FjaGVNb2RlID0gY2MuRW51bSh7ICdSRUFMVElNRSc6IDAgfSk7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBjYWNoZSBtb2RlIHR5cGUuXG4gKiAhI3poIERyYWdvbmJvbmVz5riy5p+T57G75Z6LXG4gKiBAZW51bSBBcm1hdHVyZURpc3BsYXkuQW5pbWF0aW9uQ2FjaGVNb2RlXG4gKi9cbmxldCBBbmltYXRpb25DYWNoZU1vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSByZWFsdGltZSBtb2RlLlxuICAgICAqICEjemgg5a6e5pe26K6h566X5qih5byP44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFQUxUSU1FXG4gICAgICovXG4gICAgUkVBTFRJTUU6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2hhcmVkIGNhY2hlIG1vZGUuXG4gICAgICogISN6aCDlhbHkuqvnvJPlrZjmqKHlvI/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUkVEX0NBQ0hFXG4gICAgICovXG4gICAgU0hBUkVEX0NBQ0hFOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHByaXZhdGUgY2FjaGUgbW9kZS5cbiAgICAgKiAhI3poIOengeaciee8k+WtmOaooeW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUklWQVRFX0NBQ0hFXG4gICAgICovXG4gICAgUFJJVkFURV9DQUNIRTogMiBcbn0pO1xuXG5mdW5jdGlvbiBzZXRFbnVtQXR0ciAob2JqLCBwcm9wTmFtZSwgZW51bURlZikge1xuICAgIGNjLkNsYXNzLkF0dHIuc2V0Q2xhc3NBdHRyKG9iaiwgcHJvcE5hbWUsICd0eXBlJywgJ0VudW0nKTtcbiAgICBjYy5DbGFzcy5BdHRyLnNldENsYXNzQXR0cihvYmosIHByb3BOYW1lLCAnZW51bUxpc3QnLCBjYy5FbnVtLmdldExpc3QoZW51bURlZikpO1xufVxuXG4vKipcbiAqICEjZW5cbiAqIFRoZSBBcm1hdHVyZSBEaXNwbGF5IG9mIERyYWdvbkJvbmVzIDxici8+XG4gKiA8YnIvPlxuICogKEFybWF0dXJlIERpc3BsYXkgaGFzIGEgcmVmZXJlbmNlIHRvIGEgRHJhZ29uQm9uZXNBc3NldCBhbmQgc3RvcmVzIHRoZSBzdGF0ZSBmb3IgQXJtYXR1cmVEaXNwbGF5IGluc3RhbmNlLFxuICogd2hpY2ggY29uc2lzdHMgb2YgdGhlIGN1cnJlbnQgcG9zZSdzIGJvbmUgU1JULCBzbG90IGNvbG9ycywgYW5kIHdoaWNoIHNsb3QgYXR0YWNobWVudHMgYXJlIHZpc2libGUuIDxici8+XG4gKiBNdWx0aXBsZSBBcm1hdHVyZSBEaXNwbGF5IGNhbiB1c2UgdGhlIHNhbWUgRHJhZ29uQm9uZXNBc3NldCB3aGljaCBpbmNsdWRlcyBhbGwgYW5pbWF0aW9ucywgc2tpbnMsIGFuZCBhdHRhY2htZW50cy4pIDxici8+XG4gKiAhI3poXG4gKiBEcmFnb25Cb25lcyDpqqjpqrzliqjnlLsgPGJyLz5cbiAqIDxici8+XG4gKiAoQXJtYXR1cmUgRGlzcGxheSDlhbfmnInlr7npqqjpqrzmlbDmja7nmoTlvJXnlKjlubbkuJTlrZjlgqjkuobpqqjpqrzlrp7kvovnmoTnirbmgIHvvIxcbiAqIOWug+eUseW9k+WJjeeahOmqqOmqvOWKqOS9nO+8jHNsb3Qg6aKc6Imy77yM5ZKM5Y+v6KeB55qEIHNsb3QgYXR0YWNobWVudHMg57uE5oiQ44CCPGJyLz5cbiAqIOWkmuS4qiBBcm1hdHVyZSBEaXNwbGF5IOWPr+S7peS9v+eUqOebuOWQjOeahOmqqOmqvOaVsOaNru+8jOWFtuS4reWMheaLrOaJgOacieeahOWKqOeUu++8jOearuiCpOWSjCBhdHRhY2htZW50c+OAgik8YnIvPlxuICpcbiAqIEBjbGFzcyBBcm1hdHVyZURpc3BsYXlcbiAqIEBleHRlbmRzIFJlbmRlckNvbXBvbmVudFxuICovXG5sZXQgQXJtYXR1cmVEaXNwbGF5ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXknLFxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvRHJhZ29uQm9uZXMnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3NrZWxldG9uMmQuanMnLFxuICAgIH0sXG4gICAgXG4gICAgc3RhdGljczoge1xuICAgICAgICBBbmltYXRpb25DYWNoZU1vZGU6IEFuaW1hdGlvbkNhY2hlTW9kZSxcbiAgICB9LFxuICAgIFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2ZhY3Rvcnk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBkcmFnb25Cb25lcy5DQ0ZhY3RvcnksXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBEcmFnb25Cb25lcyBkYXRhIGNvbnRhaW5zIHRoZSBhcm1hdHVyZXMgaW5mb3JtYXRpb24gKGJpbmQgcG9zZSBib25lcywgc2xvdHMsIGRyYXcgb3JkZXIsXG4gICAgICAgICAqIGF0dGFjaG1lbnRzLCBza2lucywgZXRjKSBhbmQgYW5pbWF0aW9ucyBidXQgZG9lcyBub3QgaG9sZCBhbnkgc3RhdGUuPGJyLz5cbiAgICAgICAgICogTXVsdGlwbGUgQXJtYXR1cmVEaXNwbGF5IGNhbiBzaGFyZSB0aGUgc2FtZSBEcmFnb25Cb25lcyBkYXRhLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmqqOmqvOaVsOaNruWMheWQq+S6humqqOmqvOS/oeaBr++8iOe7keWumumqqOmqvOWKqOS9nO+8jHNsb3Rz77yM5riy5p+T6aG65bqP77yMXG4gICAgICAgICAqIGF0dGFjaG1lbnRz77yM55qu6IKk562J562J77yJ5ZKM5Yqo55S75L2G5LiN5oyB5pyJ5Lu75L2V54q25oCB44CCPGJyLz5cbiAgICAgICAgICog5aSa5LiqIEFybWF0dXJlRGlzcGxheSDlj6/ku6XlhbHnlKjnm7jlkIznmoTpqqjpqrzmlbDmja7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtEcmFnb25Cb25lc0Fzc2V0fSBkcmFnb25Bc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ29uQXNzZXQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0LFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWZhdWx0QXJtYXR1cmVJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuZHJhZ29uX2JvbmVzX2Fzc2V0J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhdGxhcyBhc3NldCBmb3IgdGhlIERyYWdvbkJvbmVzLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOmqqOmqvOaVsOaNruaJgOmcgOeahCBBdGxhcyBUZXh0dXJlIOaVsOaNruOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0RyYWdvbkJvbmVzQXRsYXNBc3NldH0gZHJhZ29uQXRsYXNBc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgZHJhZ29uQXRsYXNBc3NldDoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgLy8gcGFyc2UgdGhlIGF0bGFzIGFzc2V0IGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJzZURyYWdvbkF0bGFzQXNzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuZHJhZ29uX2JvbmVzX2F0bGFzX2Fzc2V0J1xuICAgICAgICB9LFxuXG4gICAgICAgIF9hcm1hdHVyZU5hbWU6ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbmFtZSBvZiBjdXJyZW50IGFybWF0dXJlLlxuICAgICAgICAgKiAhI3poIOW9k+WJjeeahCBBcm1hdHVyZSDlkI3np7DjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGFybWF0dXJlTmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgYXJtYXR1cmVOYW1lOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZU5hbWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGxldCBhbmltTmFtZXMgPSB0aGlzLmdldEFuaW1hdGlvbk5hbWVzKHRoaXMuX2FybWF0dXJlTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW9uTmFtZSB8fCBhbmltTmFtZXMuaW5kZXhPZih0aGlzLmFuaW1hdGlvbk5hbWUpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbk5hbWUgPSBhbmltTmFtZXNbMF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3QgdXNlIGRlZmF1bHQgYW5pbWF0aW9uIG5hbWUgYXQgcnVudGltZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25OYW1lID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mYWN0b3J5Ll9kcmFnb25Cb25lcy5jbG9jay5yZW1vdmUodGhpcy5fYXJtYXR1cmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2goKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSAmJiAhdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkuX2RyYWdvbkJvbmVzLmNsb2NrLmFkZCh0aGlzLl9hcm1hdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FuaW1hdGlvbk5hbWU6ICcnLFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbmFtZSBvZiBjdXJyZW50IHBsYXlpbmcgYW5pbWF0aW9uLlxuICAgICAgICAgKiAhI3poIOW9k+WJjeaSreaUvueahOWKqOeUu+WQjeensOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gYW5pbWF0aW9uTmFtZVxuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0aW9uTmFtZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uTmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBfZGVmYXVsdEFybWF0dXJlSW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZhdWx0QXJtYXR1cmVJbmRleDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFybWF0dXJlTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyYWdvbkFzc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcm1hdHVyZXNFbnVtO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnb25Bc3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJtYXR1cmVzRW51bSA9IHRoaXMuZHJhZ29uQXNzZXQuZ2V0QXJtYXR1cmVFbnVtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhcm1hdHVyZXNFbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCg3NDAwLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYXJtYXR1cmVOYW1lID0gYXJtYXR1cmVzRW51bVt0aGlzLl9kZWZhdWx0QXJtYXR1cmVJbmRleF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGFybWF0dXJlTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJtYXR1cmVOYW1lID0gYXJtYXR1cmVOYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3JJRCg3NDAxLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBEZWZhdWx0QXJtYXR1cmVzRW51bSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJBcm1hdHVyZVwiLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMuYXJtYXR1cmVfbmFtZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvLyB2YWx1ZSBvZiAwIHJlcHJlc2VudHMgbm8gYW5pbWF0aW9uXG4gICAgICAgIF9hbmltYXRpb25JbmRleDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGlvbkluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uTmFtZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1zRW51bTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcmFnb25Bc3NldCkge1xuICAgICAgICAgICAgICAgICAgICBhbmltc0VudW0gPSB0aGlzLmRyYWdvbkFzc2V0LmdldEFuaW1zRW51bSh0aGlzLmFybWF0dXJlTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFhbmltc0VudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBhbmltTmFtZSA9IGFuaW1zRW51bVt0aGlzLl9hbmltYXRpb25JbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1OYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGFuaW1OYW1lLCB0aGlzLnBsYXlUaW1lcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDc0MDIsIHRoaXMubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IERlZmF1bHRBbmltc0VudW0sXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQW5pbWF0aW9uJyxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZHJhZ29uX2JvbmVzLmFuaW1hdGlvbl9uYW1lJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFJlY29yZCBwcmUgY2FjaGUgbW9kZS5cbiAgICAgICAgX3ByZUNhY2hlTW9kZTogLTEsXG4gICAgICAgIF9jYWNoZU1vZGU6IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRSxcbiAgICAgICAgX2RlZmF1bHRDYWNoZU1vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICB0eXBlOiBBbmltYXRpb25DYWNoZU1vZGUsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9kZWZhdWx0Q2FjaGVNb2RlICE9PSBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlICYmICFBcm1hdHVyZUNhY2hlLmNhbkNhY2hlKHRoaXMuX2FybWF0dXJlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdENhY2hlTW9kZSA9IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJBbmltYXRpb24gY2FjaGUgbW9kZSBkb2Vzbid0IHN1cHBvcnQgc2tlbGV0YWwgbmVzdGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbkNhY2hlTW9kZSh0aGlzLl9kZWZhdWx0Q2FjaGVNb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQW5pbWF0aW9uIENhY2hlIE1vZGVcIixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuZHJhZ29uX2JvbmVzLmFuaW1hdGlvbl9jYWNoZV9tb2RlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB0aW1lIHNjYWxlIG9mIHRoaXMgYXJtYXR1cmUuXG4gICAgICAgICAqICEjemgg5b2T5YmN6aqo6aq85Lit5omA5pyJ5Yqo55S755qE5pe26Ze057yp5pS+546H44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lU2NhbGVcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgdGltZVNjYWxlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24udGltZVNjYWxlID0gdGhpcy50aW1lU2NhbGU7XG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5kcmFnb25fYm9uZXMudGltZV9zY2FsZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgcGxheSB0aW1lcyBvZiB0aGUgZGVmYXVsdCBhbmltYXRpb24uXG4gICAgICAgICAqICAgICAgLTEgbWVhbnMgdXNpbmcgdGhlIHZhbHVlIG9mIGNvbmZpZyBmaWxlO1xuICAgICAgICAgKiAgICAgIDAgbWVhbnMgcmVwZWF0IGZvciBldmVyXG4gICAgICAgICAqICAgICAgPjAgbWVhbnMgcmVwZWF0IHRpbWVzXG4gICAgICAgICAqICEjemgg5pKt5pS+6buY6K6k5Yqo55S755qE5b6q546v5qyh5pWwXG4gICAgICAgICAqICAgICAgLTEg6KGo56S65L2/55So6YWN572u5paH5Lu25Lit55qE6buY6K6k5YC8O1xuICAgICAgICAgKiAgICAgIDAg6KGo56S65peg6ZmQ5b6q546vXG4gICAgICAgICAqICAgICAgPjAg6KGo56S65b6q546v5qyh5pWwXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBwbGF5VGltZXNcbiAgICAgICAgICogQGRlZmF1bHQgLTFcbiAgICAgICAgICovXG4gICAgICAgIHBsYXlUaW1lczoge1xuICAgICAgICAgICAgZGVmYXVsdDogLTEsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5wbGF5X3RpbWVzJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIHRvIGVuYWJsZSBwcmVtdWx0aXBsaWVkIGFscGhhLlxuICAgICAgICAgKiBZb3Ugc2hvdWxkIGRpc2FibGUgdGhpcyBvcHRpb24gd2hlbiBpbWFnZSdzIHRyYW5zcGFyZW50IGFyZWEgYXBwZWFycyB0byBoYXZlIG9wYXF1ZSBwaXhlbHMsXG4gICAgICAgICAqIG9yIGVuYWJsZSB0aGlzIG9wdGlvbiB3aGVuIGltYWdlJ3MgaGFsZiB0cmFuc3BhcmVudCBhcmVhIGFwcGVhcnMgdG8gYmUgZGFya2VuLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWQr+eUqOi0tOWbvumihOS5mOOAglxuICAgICAgICAgKiDlvZPlm77niYfnmoTpgI/mmI7ljLrln5/lh7rnjrDoibLlnZfml7bpnIDopoHlhbPpl63or6XpgInpobnvvIzlvZPlm77niYfnmoTljYrpgI/mmI7ljLrln5/popzoibLlj5jpu5Hml7bpnIDopoHlkK/nlKjor6XpgInpobnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBwcmVtdWx0aXBsaWVkQWxwaGFcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIHByZW11bHRpcGxpZWRBbHBoYToge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLnByZW11bHRpcGxpZWRBbHBoYSdcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIG9wZW4gZGVidWcgYm9uZXMuXG4gICAgICAgICAqICEjemgg5piv5ZCm5pi+56S6IGJvbmUg55qEIGRlYnVnIOS/oeaBr+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlYnVnQm9uZXNcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnQm9uZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEZWJ1Z0RyYXcoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5kZWJ1Z19ib25lcydcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBFbmFibGVkIGJhdGNoIG1vZGVsLCBpZiBza2VsZXRvbiBpcyBjb21wbGV4LCBkbyBub3QgZW5hYmxlIGJhdGNoLCBvciB3aWxsIGxvd2VyIHBlcmZvcm1hbmNlLlxuICAgICAgICAgKiAhI3poIOW8gOWQr+WQiOaJue+8jOWmguaenOa4suafk+Wkp+mHj+ebuOWQjOe6ueeQhu+8jOS4lOe7k+aehOeugOWNleeahOmqqOmqvOWKqOeUu++8jOW8gOWQr+WQiOaJueWPr+S7pemZjeS9jmRyYXdjYWxs77yM5ZCm5YiZ6K+35LiN6KaB5byA5ZCv77yMY3B15raI6ICX5Lya5LiK5Y2H44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZW5hYmxlQmF0Y2hcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGVuYWJsZUJhdGNoOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQmF0Y2goKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmRyYWdvbl9ib25lcy5lbmFibGVkX2JhdGNoJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIERyYWdvbkJvbmVzIGRhdGEgc3RvcmUga2V5LlxuICAgICAgICBfYXJtYXR1cmVLZXk6IFwiXCIsXG5cbiAgICAgICAgLy8gQmVsb3cgcHJvcGVydGllcyB3aWxsIGVmZmVjdCB3aGVuIGNhY2hlIG1vZGUgaXMgU0hBUkVEX0NBQ0hFIG9yIFBSSVZBVEVfQ0FDSEUuXG4gICAgICAgIC8vIGFjY3VtdWxhdGUgdGltZVxuICAgICAgICBfYWNjVGltZTogMCxcbiAgICAgICAgLy8gUGxheSB0aW1lcyBjb3VudGVyXG4gICAgICAgIF9wbGF5Q291bnQ6IDAsXG4gICAgICAgIC8vIEZyYW1lIGNhY2hlXG4gICAgICAgIF9mcmFtZUNhY2hlOiBudWxsLFxuICAgICAgICAvLyBDdXIgZnJhbWVcbiAgICAgICAgX2N1ckZyYW1lOiBudWxsLFxuICAgICAgICAvLyBQbGF5aW5nIGZsYWdcbiAgICAgICAgX3BsYXlpbmc6IGZhbHNlLFxuICAgICAgICAvLyBBcm1hdHVyZSBjYWNoZVxuICAgICAgICBfYXJtYXR1cmVDYWNoZTogbnVsbCxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIC8vIFByb3BlcnR5IF9tYXRlcmlhbENhY2hlIFVzZSB0byBjYWNoZSBtYXRlcmlhbCxzaW5jZSBkcmFnb25Cb25lcyBtYXkgdXNlIG11bHRpcGxlIHRleHR1cmUsXG4gICAgICAgIC8vIGl0IHdpbGwgY2xvbmUgZnJvbSB0aGUgJ19tYXRlcmlhbCcgcHJvcGVydHksaWYgdGhlIGRyYWdvbmJvbmVzIG9ubHkgaGF2ZSBvbmUgdGV4dHVyZSxcbiAgICAgICAgLy8gaXQgd2lsbCBqdXN0IHVzZSB0aGUgX21hdGVyaWFsLHdvbid0IGNsb25lIGl0LlxuICAgICAgICAvLyBTbyBpZiBpbnZva2UgZ2V0TWF0ZXJpYWwsaXQgb25seSByZXR1cm4gX21hdGVyaWFsLGlmIHlvdSB3YW50IHRvIGNoYW5nZSBhbGwgbWF0ZXJpYWxDYWNoZSxcbiAgICAgICAgLy8geW91IGNhbiBjaGFuZ2UgbWF0ZXJpYWxDYWNoZSBkaXJlY3RseS5cbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQgPSBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsID0gbmV3IEF0dGFjaFV0aWwoKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeSA9IGRyYWdvbkJvbmVzLkNDRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICAvLyBBZGFwdCB0byBvbGQgY29kZSxyZW1vdmUgdW51c2UgY2hpbGQgd2hpY2ggaXMgY3JlYXRlZCBieSBvbGQgY29kZS5cbiAgICAgICAgLy8gVGhpcyBsb2dpYyBjYW4gYmUgcmVtb3ZlIGFmdGVyIDIuMiBvciBsYXRlci5cbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBsZXQgcG9zID0gY2hpbGQuX25hbWUgJiYgY2hpbGQuX25hbWUuc2VhcmNoKCdDSElMRF9BUk1BVFVSRS0nKTtcbiAgICAgICAgICAgIGlmIChwb3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gaWYgY2hhbmdlIHVzZSBiYXRjaCBtb2RlLCBqdXN0IGNsZWFyIG1hdGVyaWFsIGNhY2hlXG4gICAgX3VwZGF0ZUJhdGNoICgpIHtcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmIChiYXNlTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsICF0aGlzLmVuYWJsZUJhdGNoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXRlcmlhbENhY2hlID0ge307XG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRlIGJhc2UgY2xhc3MgX3VwZGF0ZU1hdGVyaWFsIHRvIHNldCBkZWZpbmUgdmFsdWUgYW5kIGNsZWFyIG1hdGVyaWFsIGNhY2hlXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmIChiYXNlTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsICF0aGlzLmVuYWJsZUJhdGNoKTtcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFJywgdHJ1ZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBzcmNCbGVuZEZhY3RvciA9IHRoaXMucHJlbXVsdGlwbGllZEFscGhhID8gY2MuZ2Z4LkJMRU5EX09ORSA6IGNjLmdmeC5CTEVORF9TUkNfQUxQSEE7XG4gICAgICAgICAgICBsZXQgZHN0QmxlbmRGYWN0b3IgPSBjYy5nZnguQkxFTkRfT05FX01JTlVTX1NSQ19BTFBIQTtcblxuICAgICAgICAgICAgYmFzZU1hdGVyaWFsLnNldEJsZW5kKFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgY2MuZ2Z4LkJMRU5EX0ZVTkNfQURELFxuICAgICAgICAgICAgICAgIHNyY0JsZW5kRmFjdG9yLCBzcmNCbGVuZEZhY3RvcixcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXG4gICAgICAgICAgICAgICAgZHN0QmxlbmRGYWN0b3IsIGRzdEJsZW5kRmFjdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hdGVyaWFsQ2FjaGUgPSB7fTtcbiAgICB9LFxuXG4gICAgLy8gb3ZlcnJpZGUgYmFzZSBjbGFzcyBkaXNhYmxlUmVuZGVyIHRvIGNsZWFyIHBvc3QgcmVuZGVyIGZsYWdcbiAgICBkaXNhYmxlUmVuZGVyICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnICY9IH5GTEFHX1BPU1RfUkVOREVSO1xuICAgIH0sXG5cbiAgICAvLyBvdmVycmlkZSBiYXNlIGNsYXNzIGRpc2FibGVSZW5kZXIgdG8gYWRkIHBvc3QgcmVuZGVyIGZsYWdcbiAgICBtYXJrRm9yUmVuZGVyIChlbmFibGUpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoZW5hYmxlKTtcbiAgICAgICAgaWYgKGVuYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLl9yZW5kZXJGbGFnIHw9IEZMQUdfUE9TVF9SRU5ERVI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfUE9TVF9SRU5ERVI7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLmRyYWdvbkF0bGFzQXNzZXQgJiYgdGhpcy5kcmFnb25BdGxhc0Fzc2V0LnRleHR1cmU7XG4gICAgICAgIGlmICghdGV4dHVyZSB8fCAhdGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcblxuICAgIF9fcHJlbG9hZCAoKSB7XG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9LFxuXG4gICAgX2luaXQgKCkge1xuICAgICAgICBpZiAodGhpcy5faW5pdGVkKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZU1hdGVyaWFsKCk7XG4gICAgICAgIHRoaXMuX3BhcnNlRHJhZ29uQXRsYXNBc3NldCgpO1xuICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoY2hpbGQgJiYgY2hpbGQuX25hbWUgPT09IFwiREVCVUdfRFJBV19OT0RFXCIpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUga2V5IG9mIGRyYWdvbmJvbmVzIGNhY2hlIGRhdGEsIHdoaWNoIGlzIHJlZ2FyZCBhcyAnZHJhZ29uYm9uZXNOYW1lJywgd2hlbiB5b3Ugd2FudCB0byBjaGFuZ2UgZHJhZ29uYm9uZXMgY2xvdGguXG4gICAgICogISN6aCBcbiAgICAgKiDnvJPlrZjpvpnpqqjmlbDmja7nmoRrZXnlgLzvvIzmjaLoo4XnmoTml7bkvJrkvb/nlKjliLDor6XlgLzvvIzkvZzkuLpkcmFnb25ib25lc05hbWXkvb/nlKhcbiAgICAgKiBAbWV0aG9kIGdldEFybWF0dXJlS2V5XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcbiAgICAgKiBsZXQgbmVlZENoYW5nZVNsb3QgPSBuZWVkQ2hhbmdlQXJtYXR1cmUuYXJtYXR1cmUoKS5nZXRTbG90KFwiY2hhbmdlU2xvdE5hbWVcIik7XG4gICAgICogZmFjdG9yeS5yZXBsYWNlU2xvdERpc3BsYXkodG9DaGFuZ2VBcm1hdHVyZS5nZXRBcm1hdHVyZUtleSgpLCBcImFybWF0dXJlTmFtZVwiLCBcInNsb3ROYW1lXCIsIFwiZGlzcGxheU5hbWVcIiwgbmVlZENoYW5nZVNsb3QpO1xuICAgICAqL1xuICAgIGdldEFybWF0dXJlS2V5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FybWF0dXJlS2V5O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSXQncyBiZXN0IHRvIHNldCBjYWNoZSBtb2RlIGJlZm9yZSBzZXQgcHJvcGVydHkgJ2RyYWdvbkFzc2V0Jywgb3Igd2lsbCB3YXN0ZSBzb21lIGNwdSB0aW1lLlxuICAgICAqIElmIHNldCB0aGUgbW9kZSBpbiBlZGl0b3IsIHRoZW4gbm8gbmVlZCB0byB3b3JyeSBhYm91dCBvcmRlciBwcm9ibGVtLlxuICAgICAqICEjemggXG4gICAgICog6Iul5oOz5YiH5o2i5riy5p+T5qih5byP77yM5pyA5aW95Zyo6K6+572uJ2RyYWdvbkFzc2V0J+S5i+WJje+8jOWFiOiuvue9ruWlvea4suafk+aooeW8j++8jOWQpuWImeaciei/kOihjOaXtuW8gOmUgOOAglxuICAgICAqIOiLpeWcqOe8lui+keS4reiuvue9rua4suafk+aooeW8j++8jOWImeaXoOmcgOaLheW/g+iuvue9ruasoeW6j+eahOmXrumimOOAglxuICAgICAqIFxuICAgICAqIEBtZXRob2Qgc2V0QW5pbWF0aW9uQ2FjaGVNb2RlXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25DYWNoZU1vZGV9IGNhY2hlTW9kZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogYXJtYXR1cmVEaXNwbGF5LnNldEFuaW1hdGlvbkNhY2hlTW9kZShkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkuQW5pbWF0aW9uQ2FjaGVNb2RlLlNIQVJFRF9DQUNIRSk7XG4gICAgICovXG4gICAgc2V0QW5pbWF0aW9uQ2FjaGVNb2RlIChjYWNoZU1vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZUNhY2hlTW9kZSAhPT0gY2FjaGVNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWNoZU1vZGUgPSBjYWNoZU1vZGU7XG4gICAgICAgICAgICB0aGlzLl9idWlsZEFybWF0dXJlKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSAmJiAhdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5fZHJhZ29uQm9uZXMuY2xvY2suYWRkKHRoaXMuX2FybWF0dXJlKTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlbiBXaGV0aGVyIGluIGNhY2hlZCBtb2RlLlxuICAgICAqICEjemgg5b2T5YmN5piv5ZCm5aSE5LqO57yT5a2Y5qih5byP44CCXG4gICAgICogQG1ldGhvZCBpc0FuaW1hdGlvbkNhY2hlZFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNBbmltYXRpb25DYWNoZWQgKCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZU1vZGUgIT09IEFuaW1hdGlvbkNhY2hlTW9kZS5SRUFMVElNRTtcbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAvLyBJZiBjYWNoZSBtb2RlIGlzIGNhY2hlLCBubyBuZWVkIHRvIHVwZGF0ZSBieSBkcmFnb25ib25lcyBsaWJyYXJ5LlxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5fZHJhZ29uQm9uZXMuY2xvY2suYWRkKHRoaXMuX2FybWF0dXJlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICAvLyBJZiBjYWNoZSBtb2RlIGlzIGNhY2hlLCBubyBuZWVkIHRvIHVwZGF0ZSBieSBkcmFnb25ib25lcyBsaWJyYXJ5LlxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUgJiYgIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5fZHJhZ29uQm9uZXMuY2xvY2sucmVtb3ZlKHRoaXMuX2FybWF0dXJlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZW1pdENhY2hlQ29tcGxldGVFdmVudCAoKSB7XG4gICAgICAgIC8vIEFuaW1hdGlvbiBsb29wIGNvbXBsZXRlLCB0aGUgZXZlbnQgZGlmZnJlbnQgZnJvbSBkcmFnb25ib25lcyBpbm5lciBldmVudCxcbiAgICAgICAgLy8gSXQgaGFzIG5vIGV2ZW50IG9iamVjdC5cbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXQuZW1pdChkcmFnb25Cb25lcy5FdmVudE9iamVjdC5MT09QX0NPTVBMRVRFKTtcblxuICAgICAgICAvLyBBbmltYXRpb24gY29tcGxldGUgdGhlIGV2ZW50IGRpZmZyZW50IGZyb20gZHJhZ29uYm9uZXMgaW5uZXIgZXZlbnQsXG4gICAgICAgIC8vIEl0IGhhcyBubyBldmVudCBvYmplY3QuXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0LmVtaXQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUpO1xuICAgIH0sXG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSByZXR1cm47XG4gICAgICAgIGlmICghdGhpcy5fZnJhbWVDYWNoZSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBmcmFtZUNhY2hlID0gdGhpcy5fZnJhbWVDYWNoZTtcbiAgICAgICAgaWYgKCFmcmFtZUNhY2hlLmlzSW5pdGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGZyYW1lcyA9IGZyYW1lQ2FjaGUuZnJhbWVzO1xuICAgICAgICBpZiAoIXRoaXMuX3BsYXlpbmcpIHtcbiAgICAgICAgICAgIGlmIChmcmFtZUNhY2hlLmlzSW52YWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSBmcmFtZXNbZnJhbWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyYW1lVGltZSA9IEFybWF0dXJlQ2FjaGUuRnJhbWVUaW1lO1xuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBTdGFydCwgdGhlIGV2ZW50IGRpZmZyZW50IGZyb20gZHJhZ29uYm9uZXMgaW5uZXIgZXZlbnQsXG4gICAgICAgIC8vIEl0IGhhcyBubyBldmVudCBvYmplY3QuXG4gICAgICAgIGlmICh0aGlzLl9hY2NUaW1lID09IDAgJiYgdGhpcy5fcGxheUNvdW50ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0LmVtaXQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuU1RBUlQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdsb2JhbFRpbWVTY2FsZSA9IGRyYWdvbkJvbmVzLnRpbWVTY2FsZTtcbiAgICAgICAgdGhpcy5fYWNjVGltZSArPSBkdCAqIHRoaXMudGltZVNjYWxlICogZ2xvYmFsVGltZVNjYWxlO1xuICAgICAgICBsZXQgZnJhbWVJZHggPSBNYXRoLmZsb29yKHRoaXMuX2FjY1RpbWUgLyBmcmFtZVRpbWUpO1xuICAgICAgICBpZiAoIWZyYW1lQ2FjaGUuaXNDb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIGZyYW1lQ2FjaGUudXBkYXRlVG9GcmFtZShmcmFtZUlkeCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJhbWVDYWNoZS5pc0NvbXBsZXRlZCAmJiBmcmFtZUlkeCA+PSBmcmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGF5Q291bnQgKys7XG4gICAgICAgICAgICBpZiAoKHRoaXMucGxheVRpbWVzID4gMCAmJiB0aGlzLl9wbGF5Q291bnQgPj0gdGhpcy5wbGF5VGltZXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gc2V0IGZyYW1lIHRvIGVuZCBmcmFtZS5cbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdENhY2hlQ29tcGxldGVFdmVudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xuICAgICAgICAgICAgZnJhbWVJZHggPSAwO1xuICAgICAgICAgICAgdGhpcy5fZW1pdENhY2hlQ29tcGxldGVFdmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSBmcmFtZXNbZnJhbWVJZHhdO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlBSSVZBVEVfQ0FDSEUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlNIQVJFRF9DQUNIRSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYXJtYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlRGVidWdEcmF3ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVidWdCb25lcykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kZWJ1Z0RyYXcpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGVidWdEcmF3Tm9kZSA9IG5ldyBjYy5Qcml2YXRlTm9kZSgpO1xuICAgICAgICAgICAgICAgIGRlYnVnRHJhd05vZGUubmFtZSA9ICdERUJVR19EUkFXX05PREUnO1xuICAgICAgICAgICAgICAgIGxldCBkZWJ1Z0RyYXcgPSBkZWJ1Z0RyYXdOb2RlLmFkZENvbXBvbmVudChHcmFwaGljcyk7XG4gICAgICAgICAgICAgICAgZGVidWdEcmF3LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgZGVidWdEcmF3LnN0cm9rZUNvbG9yID0gY2MuY29sb3IoMjU1LCAwLCAwLCAyNTUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnRHJhdyA9IGRlYnVnRHJhdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3Lm5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlYnVnRHJhdykge1xuICAgICAgICAgICAgdGhpcy5fZGVidWdEcmF3Lm5vZGUucGFyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfYnVpbGRBcm1hdHVyZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnb25Bc3NldCB8fCAhdGhpcy5kcmFnb25BdGxhc0Fzc2V0IHx8ICF0aGlzLmFybWF0dXJlTmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIC8vIFN3aXRjaCBBc3NldCBvciBBdGxhcyBvciBjYWNoZU1vZGUgd2lsbCByZWJ1aWxkIGFybWF0dXJlLlxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmUpIHtcbiAgICAgICAgICAgIC8vIGRpc3Bvc2UgcHJlIGJ1aWxkIGFybWF0dXJlXG4gICAgICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wcmVDYWNoZU1vZGUgPT09IEFuaW1hdGlvbkNhY2hlTW9kZS5QUklWQVRFX0NBQ0hFKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcHJlQ2FjaGVNb2RlID09PSBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlQcm94eSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZUNhY2hlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3ByZUNhY2hlTW9kZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlNIQVJFRF9DQUNIRSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUgPSBBcm1hdHVyZUNhY2hlLnNoYXJlZENhY2hlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYWNoZU1vZGUgPT09IEFuaW1hdGlvbkNhY2hlTW9kZS5QUklWQVRFX0NBQ0hFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVDYWNoZSA9IG5ldyBBcm1hdHVyZUNhY2hlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlQ2FjaGUuZW5hYmxlUHJpdmF0ZU1vZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhdGxhc1VVSUQgPSB0aGlzLmRyYWdvbkF0bGFzQXNzZXQuX3V1aWQ7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlS2V5ID0gdGhpcy5kcmFnb25Bc3NldC5pbml0KHRoaXMuX2ZhY3RvcnksIGF0bGFzVVVJRCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUgPSB0aGlzLl9hcm1hdHVyZUNhY2hlLmdldEFybWF0dXJlQ2FjaGUodGhpcy5hcm1hdHVyZU5hbWUsIHRoaXMuX2FybWF0dXJlS2V5LCBhdGxhc1VVSUQpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9hcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgIC8vIENhY2hlIGZhaWwsc3dpdGggdG8gUkVBTFRJTUUgY2FjaGUgbW9kZS5cbiAgICAgICAgICAgICAgICB0aGlzLl9jYWNoZU1vZGUgPSBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUU7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgdGhpcy5fcHJlQ2FjaGVNb2RlID0gdGhpcy5fY2FjaGVNb2RlO1xuICAgICAgICBpZiAoQ0NfRURJVE9SIHx8IHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5UHJveHkgPSB0aGlzLl9mYWN0b3J5LmJ1aWxkQXJtYXR1cmVEaXNwbGF5KHRoaXMuYXJtYXR1cmVOYW1lLCB0aGlzLl9hcm1hdHVyZUtleSwgXCJcIiwgYXRsYXNVVUlEKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZGlzcGxheVByb3h5KSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5UHJveHkuX2NjTm9kZSA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlQcm94eS5zZXRFdmVudFRhcmdldCh0aGlzLl9ldmVudFRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZSA9IHRoaXMuX2Rpc3BsYXlQcm94eS5fYXJtYXR1cmU7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24udGltZVNjYWxlID0gdGhpcy50aW1lU2NhbGU7XG4gICAgICAgICAgICAvLyBJZiBjaGFuZ2UgbW9kZSBvciBhcm1hdHVyZSwgYXJtYXR1cmUgbXVzdCBpbnNlcnQgaW50byBjbG9jay5cbiAgICAgICAgICAgIC8vIHRoaXMuX2ZhY3RvcnkuX2RyYWdvbkJvbmVzLmNsb2NrLmFkZCh0aGlzLl9hcm1hdHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fY2FjaGVNb2RlICE9PSBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUUgJiYgdGhpcy5kZWJ1Z0JvbmVzKSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiRGVidWcgYm9uZXMgaXMgaW52YWxpZCBpbiBjYWNoZWQgbW9kZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSkge1xuICAgICAgICAgICAgbGV0IGFybWF0dXJlRGF0YSA9IHRoaXMuX2FybWF0dXJlLmFybWF0dXJlRGF0YTtcbiAgICAgICAgICAgIGxldCBhYWJiID0gYXJtYXR1cmVEYXRhLmFhYmI7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoYWFiYi53aWR0aCwgYWFiYi5oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlQmF0Y2goKTtcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsLmluaXQodGhpcyk7XG4gICAgICAgIHRoaXMuYXR0YWNoVXRpbC5fYXNzb2NpYXRlQXR0YWNoZWROb2RlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKHRoaXMuYW5pbWF0aW9uTmFtZSwgdGhpcy5wbGF5VGltZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgIH0sXG5cbiAgICBfcGFyc2VEcmFnb25BdGxhc0Fzc2V0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ29uQXRsYXNBc3NldCkge1xuICAgICAgICAgICAgdGhpcy5kcmFnb25BdGxhc0Fzc2V0LmluaXQodGhpcy5fZmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3JlZnJlc2ggKCkge1xuICAgICAgICB0aGlzLl9idWlsZEFybWF0dXJlKCk7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGluc3BlY3RvclxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQXJtYXR1cmVFbnVtKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVBbmltRW51bSgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQ2FjaGVNb2RlRW51bSgpO1xuICAgICAgICAgICAgRWRpdG9yLlV0aWxzLnJlZnJlc2hTZWxlY3RlZEluc3BlY3Rvcignbm9kZScsIHRoaXMubm9kZS51dWlkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfdXBkYXRlQ2FjaGVNb2RlRW51bTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlKSB7XG4gICAgICAgICAgICBzZXRFbnVtQXR0cih0aGlzLCAnX2RlZmF1bHRDYWNoZU1vZGUnLCBBbmltYXRpb25DYWNoZU1vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0RW51bUF0dHIodGhpcywgJ19kZWZhdWx0Q2FjaGVNb2RlJywgRGVmYXVsdENhY2hlTW9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIGFuaW1hdGlvbiBsaXN0IGZvciBlZGl0b3JcbiAgICBfdXBkYXRlQW5pbUVudW06IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhbmltRW51bTtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ29uQXNzZXQpIHtcbiAgICAgICAgICAgIGFuaW1FbnVtID0gdGhpcy5kcmFnb25Bc3NldC5nZXRBbmltc0VudW0odGhpcy5hcm1hdHVyZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSBlbnVtXG4gICAgICAgIHNldEVudW1BdHRyKHRoaXMsICdfYW5pbWF0aW9uSW5kZXgnLCBhbmltRW51bSB8fCBEZWZhdWx0QW5pbXNFbnVtKTtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIGFybWF0dXJlIGxpc3QgZm9yIGVkaXRvclxuICAgIF91cGRhdGVBcm1hdHVyZUVudW06IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhcm1hdHVyZUVudW07XG4gICAgICAgIGlmICh0aGlzLmRyYWdvbkFzc2V0KSB7XG4gICAgICAgICAgICBhcm1hdHVyZUVudW0gPSB0aGlzLmRyYWdvbkFzc2V0LmdldEFybWF0dXJlRW51bSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSBlbnVtXG4gICAgICAgIHNldEVudW1BdHRyKHRoaXMsICdfZGVmYXVsdEFybWF0dXJlSW5kZXgnLCBhcm1hdHVyZUVudW0gfHwgRGVmYXVsdEFybWF0dXJlc0VudW0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUGxheSB0aGUgc3BlY2lmaWVkIGFuaW1hdGlvbi5cbiAgICAgKiBQYXJhbWV0ZXIgYW5pbU5hbWUgc3BlY2lmeSB0aGUgYW5pbWF0aW9uIG5hbWUuXG4gICAgICogUGFyYW1ldGVyIHBsYXlUaW1lcyBzcGVjaWZ5IHRoZSByZXBlYXQgdGltZXMgb2YgdGhlIGFuaW1hdGlvbi5cbiAgICAgKiAtMSBtZWFucyB1c2UgdGhlIHZhbHVlIG9mIHRoZSBjb25maWcgZmlsZS5cbiAgICAgKiAwIG1lYW5zIHBsYXkgdGhlIGFuaW1hdGlvbiBmb3IgZXZlci5cbiAgICAgKiA+MCBtZWFucyByZXBlYXQgdGltZXMuXG4gICAgICogISN6aCBcbiAgICAgKiDmkq3mlL7mjIflrprnmoTliqjnlLsuXG4gICAgICogYW5pbU5hbWUg5oyH5a6a5pKt5pS+5Yqo55S755qE5ZCN56ew44CCXG4gICAgICogcGxheVRpbWVzIOaMh+WumuaSreaUvuWKqOeUu+eahOasoeaVsOOAglxuICAgICAqIC0xIOS4uuS9v+eUqOmFjee9ruaWh+S7tuS4reeahOasoeaVsOOAglxuICAgICAqIDAg5Li65peg6ZmQ5b6q546v5pKt5pS+44CCXG4gICAgICogPjAg5Li65Yqo55S755qE6YeN5aSN5qyh5pWw44CCXG4gICAgICogQG1ldGhvZCBwbGF5QW5pbWF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFuaW1OYW1lXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBsYXlUaW1lc1xuICAgICAqIEByZXR1cm4ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfVxuICAgICAqL1xuICAgIHBsYXlBbmltYXRpb24gKGFuaW1OYW1lLCBwbGF5VGltZXMpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucGxheVRpbWVzID0gKHBsYXlUaW1lcyA9PT0gdW5kZWZpbmVkKSA/IC0xIDogcGxheVRpbWVzO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbk5hbWUgPSBhbmltTmFtZTtcblxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICBsZXQgY2FjaGUgPSB0aGlzLl9hcm1hdHVyZUNhY2hlLmdldEFuaW1hdGlvbkNhY2hlKHRoaXMuX2FybWF0dXJlS2V5LCBhbmltTmFtZSk7XG4gICAgICAgICAgICBpZiAoIWNhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2FjaGUgPSB0aGlzLl9hcm1hdHVyZUNhY2hlLmluaXRBbmltYXRpb25DYWNoZSh0aGlzLl9hcm1hdHVyZUtleSwgYW5pbU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheUNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZUNhY2hlID0gY2FjaGU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXR0YWNoVXRpbC5faGFzQXR0YWNoZWROb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVDYWNoZS5lbmFibGVDYWNoZUF0dGFjaGVkSW5mbygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9mcmFtZUNhY2hlLnVwZGF0ZVRvRnJhbWUoMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyRnJhbWUgPSB0aGlzLl9mcmFtZUNhY2hlLmZyYW1lc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24ucGxheShhbmltTmFtZSwgdGhpcy5wbGF5VGltZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVcGRhdGluZyBhbiBhbmltYXRpb24gY2FjaGUgdG8gY2FsY3VsYXRlIGFsbCBmcmFtZSBkYXRhIGluIHRoZSBhbmltYXRpb24gaXMgYSBjb3N0IGluIFxuICAgICAqIHBlcmZvcm1hbmNlIGR1ZSB0byBjYWxjdWxhdGluZyBhbGwgZGF0YSBpbiBhIHNpbmdsZSBmcmFtZS5cbiAgICAgKiBUbyB1cGRhdGUgdGhlIGNhY2hlLCB1c2UgdGhlIGludmFsaWRBbmltYXRpb25DYWNoZSBtZXRob2Qgd2l0aCBoaWdoIHBlcmZvcm1hbmNlLlxuICAgICAqICEjemhcbiAgICAgKiDmm7TmlrDmn5DkuKrliqjnlLvnvJPlrZgsIOmihOiuoeeul+WKqOeUu+S4reaJgOacieW4p+aVsOaNru+8jOeUseS6juWcqOWNleW4p+iuoeeul+aJgOacieaVsOaNru+8jOaJgOS7pei+g+a2iOiAl+aAp+iDveOAglxuICAgICAqIOiLpeaDs+abtOaWsOe8k+WtmO+8jOWPr+S9v+eUqCBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUg5pa55rOV77yM5YW35pyJ6L6D6auY5oCn6IO944CCXG4gICAgICogQG1ldGhvZCB1cGRhdGVBbmltYXRpb25DYWNoZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhbmltTmFtZVxuICAgICAqL1xuICAgIHVwZGF0ZUFuaW1hdGlvbkNhY2hlIChhbmltTmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZUNhY2hlLnVwZGF0ZUFuaW1hdGlvbkNhY2hlKHRoaXMuX2FybWF0dXJlS2V5LCBhbmltTmFtZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbnZhbGlkYXRlcyB0aGUgYW5pbWF0aW9uIGNhY2hlLCB3aGljaCBpcyB0aGVuIHJlY29tcHV0ZWQgb24gZWFjaCBmcmFtZS4uXG4gICAgICogISN6aFxuICAgICAqIOS9v+WKqOeUu+e8k+WtmOWkseaViO+8jOS5i+WQjuS8muWcqOavj+W4p+mHjeaWsOiuoeeul+OAglxuICAgICAqIEBtZXRob2QgaW52YWxpZEFuaW1hdGlvbkNhY2hlXG4gICAgICovXG4gICAgaW52YWxpZEFuaW1hdGlvbkNhY2hlICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVDYWNoZS5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUodGhpcy5fYXJtYXR1cmVLZXkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBhbGwgYXJtYXR1cmUgbmFtZXMgaW4gdGhlIERyYWdvbkJvbmVzIERhdGEuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPliBEcmFnb25Cb25lcyDmlbDmja7kuK3miYDmnInnmoQgYXJtYXR1cmUg5ZCN56ewXG4gICAgICogQG1ldGhvZCBnZXRBcm1hdHVyZU5hbWVzXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldEFybWF0dXJlTmFtZXMgKCkge1xuICAgICAgICBsZXQgZHJhZ29uQm9uZXNEYXRhID0gdGhpcy5fZmFjdG9yeS5nZXREcmFnb25Cb25lc0RhdGEodGhpcy5fYXJtYXR1cmVLZXkpO1xuICAgICAgICByZXR1cm4gKGRyYWdvbkJvbmVzRGF0YSAmJiBkcmFnb25Cb25lc0RhdGEuYXJtYXR1cmVOYW1lcykgfHwgW107XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGFsbCBhbmltYXRpb24gbmFtZXMgb2Ygc3BlY2lmaWVkIGFybWF0dXJlLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bmjIflrprnmoQgYXJtYXR1cmUg55qE5omA5pyJ5Yqo55S75ZCN56ew44CCXG4gICAgICogQG1ldGhvZCBnZXRBbmltYXRpb25OYW1lc1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhcm1hdHVyZU5hbWVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0QW5pbWF0aW9uTmFtZXMgKGFybWF0dXJlTmFtZSkge1xuICAgICAgICBsZXQgcmV0ID0gW107XG4gICAgICAgIGxldCBkcmFnb25Cb25lc0RhdGEgPSB0aGlzLl9mYWN0b3J5LmdldERyYWdvbkJvbmVzRGF0YSh0aGlzLl9hcm1hdHVyZUtleSk7XG4gICAgICAgIGlmIChkcmFnb25Cb25lc0RhdGEpIHtcbiAgICAgICAgICAgIGxldCBhcm1hdHVyZURhdGEgPSBkcmFnb25Cb25lc0RhdGEuZ2V0QXJtYXR1cmUoYXJtYXR1cmVOYW1lKTtcbiAgICAgICAgICAgIGlmIChhcm1hdHVyZURhdGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhbmltTmFtZSBpbiBhcm1hdHVyZURhdGEuYW5pbWF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJtYXR1cmVEYXRhLmFuaW1hdGlvbnMuaGFzT3duUHJvcGVydHkoYW5pbU5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaChhbmltTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lciBmb3IgdGhlIERyYWdvbkJvbmVzIEV2ZW50LCB0aGUgc2FtZSB0byBhZGRFdmVudExpc3RlbmVyLlxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqAgRHJhZ29uQm9uZXMg5LqL5Lu255uR5ZCs5Zmo77yM5LiOIGFkZEV2ZW50TGlzdGVuZXIg5L2c55So55u45ZCM44CCXG4gICAgICogQG1ldGhvZCBvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBsaXN0ZW5lci5ldmVudCBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICAgICAqL1xuICAgIG9uIChldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgRHJhZ29uQm9uZXMgRXZlbnQsIHRoZSBzYW1lIHRvIHJlbW92ZUV2ZW50TGlzdGVuZXIuXG4gICAgICogISN6aFxuICAgICAqIOenu+mZpCBEcmFnb25Cb25lcyDkuovku7bnm5HlkKzlmajvvIzkuI4gcmVtb3ZlRXZlbnRMaXN0ZW5lciDkvZznlKjnm7jlkIzjgIJcbiAgICAgKiBAbWV0aG9kIG9mZlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2xpc3RlbmVyXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICAgICAqL1xuICAgIG9mZiAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkIERyYWdvbkJvbmVzIG9uZS10aW1lIGV2ZW50IGxpc3RlbmVyLCB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIGFmdGVyIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHRyaWdnZXJlZC5cbiAgICAgKiAhI3poXG4gICAgICog5re75YqgIERyYWdvbkJvbmVzIOS4gOasoeaAp+S6i+S7tuebkeWQrOWZqO+8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxuICAgICAqIEBtZXRob2Qgb25jZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBsaXN0ZW5lci5ldmVudCBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICAgICAqL1xuICAgIG9uY2UgKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCkge1xuICAgICAgICB0aGlzLl9ldmVudFRhcmdldC5vbmNlKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBEcmFnb25Cb25lcyBFdmVudC5cbiAgICAgKiAhI3poXG4gICAgICog5re75YqgIERyYWdvbkJvbmVzIOS6i+S7tuebkeWQrOWZqOOAglxuICAgICAqIEBtZXRob2QgYWRkRXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBsaXN0ZW5lci5ldmVudCBldmVudFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXIgKGV2ZW50VHlwZSwgbGlzdGVuZXIsIHRhcmdldCkge1xuICAgICAgICB0aGlzLl9ldmVudFRhcmdldC5vbihldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lciBmb3IgdGhlIERyYWdvbkJvbmVzIEV2ZW50LlxuICAgICAqICEjemhcbiAgICAgKiDnp7vpmaQgRHJhZ29uQm9uZXMg5LqL5Lu255uR5ZCs5Zmo44CCXG4gICAgICogQG1ldGhvZCByZW1vdmVFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbbGlzdGVuZXJdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdXG4gICAgICovXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lciAoZXZlbnRUeXBlLCBsaXN0ZW5lciwgdGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0Lm9mZihldmVudFR5cGUsIGxpc3RlbmVyLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQnVpbGQgdGhlIGFybWF0dXJlIGZvciBzcGVjaWZpZWQgbmFtZS5cbiAgICAgKiAhI3poXG4gICAgICog5p6E5bu65oyH5a6a5ZCN56ew55qEIGFybWF0dXJlIOWvueixoVxuICAgICAqIEBtZXRob2QgYnVpbGRBcm1hdHVyZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhcm1hdHVyZU5hbWVcbiAgICAgKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAgICAgKiBAcmV0dXJuIHtkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXl9XG4gICAgICovXG4gICAgYnVpbGRBcm1hdHVyZSAoYXJtYXR1cmVOYW1lLCBub2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mYWN0b3J5LmNyZWF0ZUFybWF0dXJlTm9kZSh0aGlzLCBhcm1hdHVyZU5hbWUsIG5vZGUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBjdXJyZW50IGFybWF0dXJlIG9iamVjdCBvZiB0aGUgQXJtYXR1cmVEaXNwbGF5LlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5YgQXJtYXR1cmVEaXNwbGF5IOW9k+WJjeS9v+eUqOeahCBBcm1hdHVyZSDlr7nosaFcbiAgICAgKiBAbWV0aG9kIGFybWF0dXJlXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBhcm1hdHVyZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcm1hdHVyZTtcbiAgICB9LFxufSk7XG5cbi8qKlxuICogISNlblxuICogQW5pbWF0aW9uIHN0YXJ0IHBsYXkuXG4gKiAhI3poXG4gKiDliqjnlLvlvIDlp4vmkq3mlL7jgIJcbiAqXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuU1RBUlRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuRXZlbnRPYmplY3R9IFtjYWxsYmFjay5ldmVudF1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQXJtYXR1cmV9IFtjYWxsYmFjay5ldmVudC5hcm1hdHVyZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGV9IFtjYWxsYmFjay5ldmVudC5hbmltYXRpb25TdGF0ZV1cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIEFuaW1hdGlvbiBsb29wIHBsYXkgY29tcGxldGUgb25jZS5cbiAqICEjemhcbiAqIOWKqOeUu+W+queOr+aSreaUvuWujOaIkOS4gOasoeOAglxuICpcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5MT09QX0NPTVBMRVRFXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NhbGxiYWNrLmV2ZW50LnR5cGVdXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFybWF0dXJlfSBbY2FsbGJhY2suZXZlbnQuYXJtYXR1cmVdXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBBbmltYXRpb24gcGxheSBjb21wbGV0ZS5cbiAqICEjemhcbiAqIOWKqOeUu+aSreaUvuWujOaIkOOAglxuICpcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5BbmltYXRpb25TdGF0ZX0gW2NhbGxiYWNrLmV2ZW50LmFuaW1hdGlvblN0YXRlXVxuICovXG5cbi8qKlxuICogISNlblxuICogQW5pbWF0aW9uIGZhZGUgaW4gc3RhcnQuXG4gKiAhI3poXG4gKiDliqjnlLvmt6HlhaXlvIDlp4vjgIJcbiAqXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRkFERV9JTlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5BbmltYXRpb25TdGF0ZX0gW2NhbGxiYWNrLmV2ZW50LmFuaW1hdGlvblN0YXRlXVxuICovXG5cbi8qKlxuICogISNlblxuICogQW5pbWF0aW9uIGZhZGUgaW4gY29tcGxldGUuXG4gKiAhI3poXG4gKiDliqjnlLvmt6HlhaXlrozmiJDjgIJcbiAqXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRkFERV9JTl9DT01QTEVURVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5BbmltYXRpb25TdGF0ZX0gW2NhbGxiYWNrLmV2ZW50LmFuaW1hdGlvblN0YXRlXVxuICovXG5cbi8qKlxuICogISNlblxuICogQW5pbWF0aW9uIGZhZGUgb3V0IHN0YXJ0LlxuICogISN6aFxuICog5Yqo55S75reh5Ye65byA5aeL44CCXG4gKlxuICogQGV2ZW50IGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfT1VUXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkV2ZW50T2JqZWN0fSBbY2FsbGJhY2suZXZlbnRdXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NhbGxiYWNrLmV2ZW50LnR5cGVdXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFybWF0dXJlfSBbY2FsbGJhY2suZXZlbnQuYXJtYXR1cmVdXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlfSBbY2FsbGJhY2suZXZlbnQuYW5pbWF0aW9uU3RhdGVdXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBBbmltYXRpb24gZmFkZSBvdXQgY29tcGxldGUuXG4gKiAhI3poXG4gKiDliqjnlLvmt6Hlh7rlrozmiJDjgIJcbiAqXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRkFERV9PVVRfQ09NUExFVEVcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuRXZlbnRPYmplY3R9IFtjYWxsYmFjay5ldmVudF1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQXJtYXR1cmV9IFtjYWxsYmFjay5ldmVudC5hcm1hdHVyZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGV9IFtjYWxsYmFjay5ldmVudC5hbmltYXRpb25TdGF0ZV1cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIEFuaW1hdGlvbiBmcmFtZSBldmVudC5cbiAqICEjemhcbiAqIOWKqOeUu+W4p+S6i+S7tuOAglxuICpcbiAqIEBldmVudCBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GUkFNRV9FVkVOVFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5FdmVudE9iamVjdH0gW2NhbGxiYWNrLmV2ZW50XVxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC50eXBlXVxuICogQHBhcmFtIHtTdHJpbmd9IFtjYWxsYmFjay5ldmVudC5uYW1lXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Bcm1hdHVyZX0gW2NhbGxiYWNrLmV2ZW50LmFybWF0dXJlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5BbmltYXRpb25TdGF0ZX0gW2NhbGxiYWNrLmV2ZW50LmFuaW1hdGlvblN0YXRlXVxuICogQHBhcmFtIHtkcmFnb25Cb25lcy5Cb25lfSBbY2FsbGJhY2suZXZlbnQuYm9uZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuU2xvdH0gW2NhbGxiYWNrLmV2ZW50LnNsb3RdXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBBbmltYXRpb24gZnJhbWUgc291bmQgZXZlbnQuXG4gKiAhI3poXG4gKiDliqjnlLvluKflo7Dpn7Pkuovku7bjgIJcbiAqXG4gKiBAZXZlbnQgZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuU09VTkRfRVZFTlRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuRXZlbnRPYmplY3R9IFtjYWxsYmFjay5ldmVudF1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQudHlwZV1cbiAqIEBwYXJhbSB7U3RyaW5nfSBbY2FsbGJhY2suZXZlbnQubmFtZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQXJtYXR1cmV9IFtjYWxsYmFjay5ldmVudC5hcm1hdHVyZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGV9IFtjYWxsYmFjay5ldmVudC5hbmltYXRpb25TdGF0ZV1cbiAqIEBwYXJhbSB7ZHJhZ29uQm9uZXMuQm9uZX0gW2NhbGxiYWNrLmV2ZW50LmJvbmVdXG4gKiBAcGFyYW0ge2RyYWdvbkJvbmVzLlNsb3R9IFtjYWxsYmFjay5ldmVudC5zbG90XVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5ID0gQXJtYXR1cmVEaXNwbGF5O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=