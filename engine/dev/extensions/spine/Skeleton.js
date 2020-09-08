
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/Skeleton.js';
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
var TrackEntryListeners = require('./track-entry-listeners');

var RenderComponent = require('../../cocos2d/core/components/CCRenderComponent');

var spine = require('./lib/spine');

var Graphics = require('../../cocos2d/core/graphics/graphics');

var RenderFlow = require('../../cocos2d/core/renderer/render-flow');

var FLAG_POST_RENDER = RenderFlow.FLAG_POST_RENDER;

var SkeletonCache = require('./skeleton-cache');

var AttachUtil = require('./AttachUtil');
/**
 * @module sp
 */


var DefaultSkinsEnum = cc.Enum({
  'default': -1
});
var DefaultAnimsEnum = cc.Enum({
  '<None>': 0
});
/**
 * !#en Enum for animation cache mode type.
 * !#zh Spine动画缓存类型
 * @enum Skeleton.AnimationCacheMode
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
 * The skeleton of Spine <br/>
 * <br/>
 * (Skeleton has a reference to a SkeletonData and stores the state for skeleton instance,
 * which consists of the current pose's bone SRT, slot colors, and which slot attachments are visible. <br/>
 * Multiple skeletons can use the same SkeletonData which includes all animations, skins, and attachments.) <br/>
 * !#zh
 * Spine 骨骼动画 <br/>
 * <br/>
 * (Skeleton 具有对骨骼数据的引用并且存储了骨骼实例的状态，
 * 它由当前的骨骼动作，slot 颜色，和可见的 slot attachments 组成。<br/>
 * 多个 Skeleton 可以使用相同的骨骼数据，其中包括所有的动画，皮肤和 attachments。
 *
 * @class Skeleton
 * @extends RenderComponent
 */


sp.Skeleton = cc.Class({
  name: 'sp.Skeleton',
  "extends": RenderComponent,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Spine Skeleton',
    help: 'app://docs/html/components/spine.html',
    inspector: 'packages://inspector/inspectors/comps/skeleton2d.js'
  },
  statics: {
    AnimationCacheMode: AnimationCacheMode
  },
  properties: {
    /**
     * !#en The skeletal animation is paused?
     * !#zh 该骨骼动画是否暂停。
     * @property paused
     * @type {Boolean}
     * @readOnly
     * @default false
     */
    paused: {
      "default": false,
      visible: false
    },

    /**
     * !#en
     * The skeleton data contains the skeleton information (bind pose bones, slots, draw order,
     * attachments, skins, etc) and animations but does not hold any state.<br/>
     * Multiple skeletons can share the same skeleton data.
     * !#zh
     * 骨骼数据包含了骨骼信息（绑定骨骼动作，slots，渲染顺序，
     * attachments，皮肤等等）和动画但不持有任何状态。<br/>
     * 多个 Skeleton 可以共用相同的骨骼数据。
     * @property {sp.SkeletonData} skeletonData
     */
    skeletonData: {
      "default": null,
      type: sp.SkeletonData,
      notify: function notify() {
        this.defaultSkin = '';
        this.defaultAnimation = '';

        if (CC_EDITOR) {
          this._refreshInspector();
        }

        this._updateSkeletonData();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.skeleton_data'
    },
    // 由于 spine 的 skin 是无法二次替换的，所以只能设置默认的 skin

    /**
     * !#en The name of default skin.
     * !#zh 默认的皮肤名称。
     * @property {String} defaultSkin
     */
    defaultSkin: {
      "default": '',
      visible: false
    },

    /**
     * !#en The name of default animation.
     * !#zh 默认的动画名称。
     * @property {String} defaultAnimation
     */
    defaultAnimation: {
      "default": '',
      visible: false
    },

    /**
     * !#en The name of current playing animation.
     * !#zh 当前播放的动画名称。
     * @property {String} animation
     */
    animation: {
      get: function get() {
        if (this.isAnimationCached()) {
          return this._animationName;
        } else {
          var entry = this.getCurrent(0);
          return entry && entry.animation.name || "";
        }
      },
      set: function set(value) {
        this.defaultAnimation = value;

        if (value) {
          this.setAnimation(0, value, this.loop);
        } else if (!this.isAnimationCached()) {
          this.clearTrack(0);
          this.setToSetupPose();
        }
      },
      visible: false
    },

    /**
     * @property {Number} _defaultSkinIndex
     */
    _defaultSkinIndex: {
      get: function get() {
        if (this.skeletonData) {
          var skinsEnum = this.skeletonData.getSkinsEnum();

          if (skinsEnum) {
            if (this.defaultSkin === "") {
              if (skinsEnum.hasOwnProperty(0)) {
                this._defaultSkinIndex = 0;
                return 0;
              }
            } else {
              var skinIndex = skinsEnum[this.defaultSkin];

              if (skinIndex !== undefined) {
                return skinIndex;
              }
            }
          }
        }

        return 0;
      },
      set: function set(value) {
        var skinsEnum;

        if (this.skeletonData) {
          skinsEnum = this.skeletonData.getSkinsEnum();
        }

        if (!skinsEnum) {
          return cc.errorID('', this.name);
        }

        var skinName = skinsEnum[value];

        if (skinName !== undefined) {
          this.defaultSkin = skinName;
          this.setSkin(this.defaultSkin);

          if (CC_EDITOR && !cc.engine.isPlaying) {
            this._refreshInspector();
          }
        } else {
          cc.errorID(7501, this.name);
        }
      },
      type: DefaultSkinsEnum,
      visible: true,
      displayName: "Default Skin",
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.default_skin'
    },
    // value of 0 represents no animation
    _animationIndex: {
      get: function get() {
        var animationName = !CC_EDITOR || cc.engine.isPlaying ? this.animation : this.defaultAnimation;

        if (this.skeletonData && animationName) {
          var animsEnum = this.skeletonData.getAnimsEnum();

          if (animsEnum) {
            var animIndex = animsEnum[animationName];

            if (animIndex !== undefined) {
              return animIndex;
            }
          }
        }

        return 0;
      },
      set: function set(value) {
        if (value === 0) {
          this.animation = '';
          return;
        }

        var animsEnum;

        if (this.skeletonData) {
          animsEnum = this.skeletonData.getAnimsEnum();
        }

        if (!animsEnum) {
          return cc.errorID(7502, this.name);
        }

        var animName = animsEnum[value];

        if (animName !== undefined) {
          this.animation = animName;
        } else {
          cc.errorID(7503, this.name);
        }
      },
      type: DefaultAnimsEnum,
      visible: true,
      displayName: 'Animation',
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.animation'
    },
    // Record pre cache mode.
    _preCacheMode: -1,
    _cacheMode: AnimationCacheMode.REALTIME,
    _defaultCacheMode: {
      "default": 0,
      type: AnimationCacheMode,
      notify: function notify() {
        this.setAnimationCacheMode(this._defaultCacheMode);
      },
      editorOnly: true,
      visible: true,
      animatable: false,
      displayName: "Animation Cache Mode",
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.animation_cache_mode'
    },

    /**
     * !#en TODO
     * !#zh 是否循环播放当前骨骼动画。
     * @property {Boolean} loop
     * @default true
     */
    loop: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.loop'
    },

    /**
     * !#en Indicates whether to enable premultiplied alpha.
     * You should disable this option when image's transparent area appears to have opaque pixels,
     * or enable this option when image's half transparent area appears to be darken.
     * !#zh 是否启用贴图预乘。
     * 当图片的透明区域出现色块时需要关闭该选项，当图片的半透明区域颜色变黑时需要启用该选项。
     * @property {Boolean} premultipliedAlpha
     * @default true
     */
    premultipliedAlpha: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.premultipliedAlpha'
    },

    /**
     * !#en The time scale of this skeleton.
     * !#zh 当前骨骼中所有动画的时间缩放率。
     * @property {Number} timeScale
     * @default 1
     */
    timeScale: {
      "default": 1,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.time_scale'
    },

    /**
     * !#en Indicates whether open debug slots.
     * !#zh 是否显示 slot 的 debug 信息。
     * @property {Boolean} debugSlots
     * @default false
     */
    debugSlots: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_slots',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Indicates whether open debug bones.
     * !#zh 是否显示 bone 的 debug 信息。
     * @property {Boolean} debugBones
     * @default false
     */
    debugBones: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_bones',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Indicates whether open debug mesh.
     * !#zh 是否显示 mesh 的 debug 信息。
     * @property {Boolean} debugMesh
     * @default false
     */
    debugMesh: {
      "default": false,
      editorOnly: true,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.debug_mesh',
      notify: function notify() {
        this._updateDebugDraw();
      }
    },

    /**
     * !#en Enabled two color tint.
     * !#zh 是否启用染色效果。
     * @property {Boolean} useTint
     * @default false
     */
    useTint: {
      "default": false,
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.use_tint',
      notify: function notify() {
        this._updateUseTint();
      }
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
      tooltip: CC_DEV && 'i18n:COMPONENT.skeleton.enabled_batch'
    },
    // Below properties will effect when cache mode is SHARED_CACHE or PRIVATE_CACHE.
    // accumulate time
    _accTime: 0,
    // Play times counter
    _playCount: 0,
    // Frame cache
    _frameCache: null,
    // Cur frame
    _curFrame: null,
    // Skeleton cache
    _skeletonCache: null,
    // Aimation name
    _animationName: "",
    // Animation queue
    _animationQueue: [],
    // Head animation info of 
    _headAniInfo: null,
    // Play times
    _playTimes: 0,
    // Is animation complete.
    _isAniComplete: true
  },
  // CONSTRUCTOR
  ctor: function ctor() {
    this._effectDelegate = null;
    this._skeleton = null;
    this._rootBone = null;
    this._listener = null;
    this._materialCache = {};
    this._debugRenderer = null;
    this._startSlotIndex = -1;
    this._endSlotIndex = -1;
    this._startEntry = {
      animation: {
        name: ""
      },
      trackIndex: 0
    };
    this._endEntry = {
      animation: {
        name: ""
      },
      trackIndex: 0
    };
    this.attachUtil = new AttachUtil();
  },
  // override base class _getDefaultMaterial to modify default material
  _getDefaultMaterial: function _getDefaultMaterial() {
    return cc.Material.getBuiltinMaterial('2d-spine');
  },
  // override base class _updateMaterial to set define value and clear material cache
  _updateMaterial: function _updateMaterial() {
    var useTint = this.useTint || this.isAnimationCached() && !CC_NATIVERENDERER;
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('USE_TINT', useTint);
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
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
  // if change use tint mode, just clear material cache
  _updateUseTint: function _updateUseTint() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      var useTint = this.useTint || this.isAnimationCached() && !CC_NATIVERENDERER;
      baseMaterial.define('USE_TINT', useTint);
    }

    this._materialCache = {};
  },
  // if change use batch mode, just clear material cache
  _updateBatch: function _updateBatch() {
    var baseMaterial = this.getMaterial(0);

    if (baseMaterial) {
      baseMaterial.define('CC_USE_MODEL', !this.enableBatch);
    }

    this._materialCache = {};
  },
  _validateRender: function _validateRender() {
    var skeletonData = this.skeletonData;

    if (!skeletonData || !skeletonData.isTexturesLoaded()) {
      this.disableRender();
      return;
    }

    this._super();
  },

  /**
   * !#en
   * Sets runtime skeleton data to sp.Skeleton.<br>
   * This method is different from the `skeletonData` property. This method is passed in the raw data provided by the Spine runtime, and the skeletonData type is the asset type provided by Creator.
   * !#zh
   * 设置底层运行时用到的 SkeletonData。<br>
   * 这个接口有别于 `skeletonData` 属性，这个接口传入的是 Spine runtime 提供的原始数据，而 skeletonData 的类型是 Creator 提供的资源类型。
   * @method setSkeletonData
   * @param {sp.spine.SkeletonData} skeletonData
   */
  setSkeletonData: function setSkeletonData(skeletonData) {
    if (skeletonData.width != null && skeletonData.height != null) {
      this.node.setContentSize(skeletonData.width, skeletonData.height);
    }

    if (!CC_EDITOR) {
      if (this._cacheMode === AnimationCacheMode.SHARED_CACHE) {
        this._skeletonCache = SkeletonCache.sharedCache;
      } else if (this._cacheMode === AnimationCacheMode.PRIVATE_CACHE) {
        this._skeletonCache = new SkeletonCache();

        this._skeletonCache.enablePrivateMode();
      }
    }

    if (this.isAnimationCached()) {
      if (this.debugBones || this.debugSlots) {
        cc.warn("Debug bones or slots is invalid in cached mode");
      }

      var skeletonInfo = this._skeletonCache.getSkeletonCache(this.skeletonData._uuid, skeletonData);

      this._skeleton = skeletonInfo.skeleton;
      this._clipper = skeletonInfo.clipper;
      this._rootBone = this._skeleton.getRootBone();
    } else {
      this._skeleton = new spine.Skeleton(skeletonData);
      this._clipper = new spine.SkeletonClipping();
      this._rootBone = this._skeleton.getRootBone();
    }

    this.markForRender(true);
  },

  /**
   * !#en Sets slots visible range.
   * !#zh 设置骨骼插槽可视范围。
   * @method setSlotsRange
   * @param {Number} startSlotIndex
   * @param {Number} endSlotIndex
   */
  setSlotsRange: function setSlotsRange(startSlotIndex, endSlotIndex) {
    if (this.isAnimationCached()) {
      cc.warn("Slots visible range can not be modified in cached mode.");
    } else {
      this._startSlotIndex = startSlotIndex;
      this._endSlotIndex = endSlotIndex;
    }
  },

  /**
   * !#en Sets animation state data.<br>
   * The parameter type is {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData.
   * !#zh 设置动画状态数据。<br>
   * 参数是 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.AnimationStateData。
   * @method setAnimationStateData
   * @param {sp.spine.AnimationStateData} stateData
   */
  setAnimationStateData: function setAnimationStateData(stateData) {
    if (this.isAnimationCached()) {
      cc.warn("'setAnimationStateData' interface can not be invoked in cached mode.");
    } else {
      var state = new spine.AnimationState(stateData);

      if (this._listener) {
        if (this._state) {
          this._state.removeListener(this._listener);
        }

        state.addListener(this._listener);
      }

      this._state = state;
    }
  },
  // IMPLEMENT
  __preload: function __preload() {
    this._super();

    if (CC_EDITOR) {
      var Flags = cc.Object.Flags;
      this._objFlags |= Flags.IsAnchorLocked | Flags.IsSizeLocked;

      this._refreshInspector();
    }

    var children = this.node.children;

    for (var i = 0, n = children.length; i < n; i++) {
      var child = children[i];

      if (child && child._name === "DEBUG_DRAW_NODE") {
        child.destroy();
      }
    }

    this._updateSkeletonData();

    this._updateDebugDraw();

    this._updateUseTint();

    this._updateBatch();
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
   * skeleton.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.SHARED_CACHE);
   */
  setAnimationCacheMode: function setAnimationCacheMode(cacheMode) {
    if (this._preCacheMode !== cacheMode) {
      this._cacheMode = cacheMode;

      this._updateSkeletonData();

      this._updateUseTint();
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
  update: function update(dt) {
    if (CC_EDITOR) return;
    if (this.paused) return;
    dt *= this.timeScale * sp.timeScale;

    if (this.isAnimationCached()) {
      // Cache mode and has animation queue.
      if (this._isAniComplete) {
        if (this._animationQueue.length === 0 && !this._headAniInfo) {
          var frameCache = this._frameCache;

          if (frameCache && frameCache.isInvalid()) {
            frameCache.updateToFrame();
            var frames = frameCache.frames;
            this._curFrame = frames[frames.length - 1];
          }

          return;
        }

        if (!this._headAniInfo) {
          this._headAniInfo = this._animationQueue.shift();
        }

        this._accTime += dt;

        if (this._accTime > this._headAniInfo.delay) {
          var aniInfo = this._headAniInfo;
          this._headAniInfo = null;
          this.setAnimation(0, aniInfo.animationName, aniInfo.loop);
        }

        return;
      }

      this._updateCache(dt);
    } else {
      this._updateRealtime(dt);
    }
  },
  _emitCacheCompleteEvent: function _emitCacheCompleteEvent() {
    if (!this._listener) return;
    this._endEntry.animation.name = this._animationName;
    this._listener.complete && this._listener.complete(this._endEntry);
    this._listener.end && this._listener.end(this._endEntry);
  },
  _updateCache: function _updateCache(dt) {
    var frameCache = this._frameCache;

    if (!frameCache.isInited()) {
      return;
    }

    var frames = frameCache.frames;
    var frameTime = SkeletonCache.FrameTime; // Animation Start, the event diffrent from dragonbones inner event,
    // It has no event object.

    if (this._accTime == 0 && this._playCount == 0) {
      this._startEntry.animation.name = this._animationName;
      this._listener && this._listener.start && this._listener.start(this._startEntry);
    }

    this._accTime += dt;
    var frameIdx = Math.floor(this._accTime / frameTime);

    if (!frameCache.isCompleted) {
      frameCache.updateToFrame(frameIdx);
    }

    if (frameCache.isCompleted && frameIdx >= frames.length) {
      this._playCount++;

      if (this._playTimes > 0 && this._playCount >= this._playTimes) {
        // set frame to end frame.
        this._curFrame = frames[frames.length - 1];
        this._accTime = 0;
        this._playCount = 0;
        this._isAniComplete = true;

        this._emitCacheCompleteEvent();

        return;
      }

      this._accTime = 0;
      frameIdx = 0;

      this._emitCacheCompleteEvent();
    }

    this._curFrame = frames[frameIdx];
  },
  _updateRealtime: function _updateRealtime(dt) {
    var skeleton = this._skeleton;
    var state = this._state;

    if (skeleton) {
      skeleton.update(dt);

      if (state) {
        state.update(dt);
        state.apply(skeleton);
      }
    }
  },

  /**
   * !#en Sets vertex effect delegate.
   * !#zh 设置顶点动画代理
   * @method setVertexEffectDelegate
   * @param {sp.VertexEffectDelegate} effectDelegate
   */
  setVertexEffectDelegate: function setVertexEffectDelegate(effectDelegate) {
    this._effectDelegate = effectDelegate;
  },
  // RENDERER

  /**
   * !#en Computes the world SRT from the local SRT for each bone.
   * !#zh 重新更新所有骨骼的世界 Transform，
   * 当获取 bone 的数值未更新时，即可使用该函数进行更新数值。
   * @method updateWorldTransform
   * @example
   * var bone = spine.findBone('head');
   * cc.log(bone.worldX); // return 0;
   * spine.updateWorldTransform();
   * bone = spine.findBone('head');
   * cc.log(bone.worldX); // return -23.12;
   */
  updateWorldTransform: function updateWorldTransform() {
    if (!this.isAnimationCached()) return;

    if (this._skeleton) {
      this._skeleton.updateWorldTransform();
    }
  },

  /**
   * !#en Sets the bones and slots to the setup pose.
   * !#zh 还原到起始动作
   * @method setToSetupPose
   */
  setToSetupPose: function setToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setToSetupPose();
    }
  },

  /**
   * !#en
   * Sets the bones to the setup pose,
   * using the values from the `BoneData` list in the `SkeletonData`.
   * !#zh
   * 设置 bone 到起始动作
   * 使用 SkeletonData 中的 BoneData 列表中的值。
   * @method setBonesToSetupPose
   */
  setBonesToSetupPose: function setBonesToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setBonesToSetupPose();
    }
  },

  /**
   * !#en
   * Sets the slots to the setup pose,
   * using the values from the `SlotData` list in the `SkeletonData`.
   * !#zh
   * 设置 slot 到起始动作。
   * 使用 SkeletonData 中的 SlotData 列表中的值。
   * @method setSlotsToSetupPose
   */
  setSlotsToSetupPose: function setSlotsToSetupPose() {
    if (this._skeleton) {
      this._skeleton.setSlotsToSetupPose();
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
    var uuid = this.skeletonData._uuid;

    if (this._skeletonCache) {
      this._skeletonCache.updateAnimationCache(uuid, animName);
    }
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

    if (this._skeletonCache) {
      this._skeletonCache.invalidAnimationCache(this.skeletonData._uuid);
    }
  },

  /**
   * !#en
   * Finds a bone by name.
   * This does a string comparison for every bone.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone object.
   * !#zh
   * 通过名称查找 bone。
   * 这里对每个 bone 的名称进行了对比。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Bone 对象。
   *
   * @method findBone
   * @param {String} boneName
   * @return {sp.spine.Bone}
   */
  findBone: function findBone(boneName) {
    if (this._skeleton) {
      return this._skeleton.findBone(boneName);
    }

    return null;
  },

  /**
   * !#en
   * Finds a slot by name. This does a string comparison for every slot.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot object.
   * !#zh
   * 通过名称查找 slot。这里对每个 slot 的名称进行了比较。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Slot 对象。
   *
   * @method findSlot
   * @param {String} slotName
   * @return {sp.spine.Slot}
   */
  findSlot: function findSlot(slotName) {
    if (this._skeleton) {
      return this._skeleton.findSlot(slotName);
    }

    return null;
  },

  /**
   * !#en
   * Finds a skin by name and makes it the active skin.
   * This does a string comparison for every skin.<br>
   * Note that setting the skin does not change which attachments are visible.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin object.
   * !#zh
   * 按名称查找皮肤，激活该皮肤。这里对每个皮肤的名称进行了比较。<br>
   * 注意：设置皮肤不会改变 attachment 的可见性。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Skin 对象。
   *
   * @method setSkin
   * @param {String} skinName
   */
  setSkin: function setSkin(skinName) {
    if (this._skeleton) {
      this._skeleton.setSkinByName(skinName);

      this._skeleton.setSlotsToSetupPose();
    }

    this.invalidAnimationCache();
  },

  /**
   * !#en
   * Returns the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment object.
   * !#zh
   * 通过 slot 和 attachment 的名称获取 attachment。Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.Attachment 对象。
   *
   * @method getAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   * @return {sp.spine.Attachment}
   */
  getAttachment: function getAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      return this._skeleton.getAttachmentByName(slotName, attachmentName);
    }

    return null;
  },

  /**
   * !#en
   * Sets the attachment for the slot and attachment name.
   * The skeleton looks first in its skin, then in the skeleton data’s default skin.
   * !#zh
   * 通过 slot 和 attachment 的名字来设置 attachment。
   * Skeleton 优先查找它的皮肤，然后才是 Skeleton Data 中默认的皮肤。
   * @method setAttachment
   * @param {String} slotName
   * @param {String} attachmentName
   */
  setAttachment: function setAttachment(slotName, attachmentName) {
    if (this._skeleton) {
      this._skeleton.setAttachment(slotName, attachmentName);
    }

    this.invalidAnimationCache();
  },

  /**
  * Return the renderer of attachment.
  * @method getTextureAtlas
  * @param {sp.spine.RegionAttachment|spine.BoundingBoxAttachment} regionAttachment
  * @return {sp.spine.TextureAtlasRegion}
  */
  getTextureAtlas: function getTextureAtlas(regionAttachment) {
    return regionAttachment.region;
  },
  // ANIMATION

  /**
   * !#en
   * Mix applies all keyframe values,
   * interpolated for the specified time and mixed with the current values.
   * !#zh 为所有关键帧设定混合及混合时间（从当前值开始差值）。
   * @method setMix
   * @param {String} fromAnimation
   * @param {String} toAnimation
   * @param {Number} duration
   */
  setMix: function setMix(fromAnimation, toAnimation, duration) {
    if (this._state) {
      this._state.data.setMix(fromAnimation, toAnimation, duration);
    }
  },

  /**
   * !#en Set the current animation. Any queued animations are cleared.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 设置当前动画。队列中的任何的动画将被清除。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method setAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @return {sp.spine.TrackEntry}
   */
  setAnimation: function setAnimation(trackIndex, name, loop) {
    this._playTimes = loop ? 0 : 1;
    this._animationName = name;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        cc.warn("Track index can not greater than 0 in cached mode.");
      }

      if (!this._skeletonCache) return null;

      var cache = this._skeletonCache.getAnimationCache(this.skeletonData._uuid, name);

      if (!cache) {
        cache = this._skeletonCache.initAnimationCache(this.skeletonData._uuid, name);
      }

      if (cache) {
        this._isAniComplete = false;
        this._accTime = 0;
        this._playCount = 0;
        this._frameCache = cache;

        if (this.attachUtil._hasAttachedNode()) {
          this._frameCache.enableCacheAttachedInfo();
        }

        this._frameCache.updateToFrame(0);

        this._curFrame = this._frameCache.frames[0];
      }
    } else {
      if (this._skeleton) {
        var animation = this._skeleton.data.findAnimation(name);

        if (!animation) {
          cc.logID(7509, name);
          return null;
        }

        var res = this._state.setAnimationWith(trackIndex, animation, loop);

        this._state.apply(this._skeleton);

        return res;
      }
    }

    return null;
  },

  /**
   * !#en Adds an animation to be played delay seconds after the current or last queued animation.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 添加一个动画到动画队列尾部，还可以延迟指定的秒数。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method addAnimation
   * @param {Number} trackIndex
   * @param {String} name
   * @param {Boolean} loop
   * @param {Number} [delay=0]
   * @return {sp.spine.TrackEntry}
   */
  addAnimation: function addAnimation(trackIndex, name, loop, delay) {
    delay = delay || 0;

    if (this.isAnimationCached()) {
      if (trackIndex !== 0) {
        cc.warn("Track index can not greater than 0 in cached mode.");
      }

      this._animationQueue.push({
        animationName: name,
        loop: loop,
        delay: delay
      });
    } else {
      if (this._skeleton) {
        var animation = this._skeleton.data.findAnimation(name);

        if (!animation) {
          cc.logID(7510, name);
          return null;
        }

        return this._state.addAnimationWith(trackIndex, animation, loop, delay);
      }
    }

    return null;
  },

  /**
   * !#en Find animation with specified name.
   * !#zh 查找指定名称的动画
   * @method findAnimation
   * @param {String} name
   * @returns {sp.spine.Animation}
   */
  findAnimation: function findAnimation(name) {
    if (this._skeleton) {
      return this._skeleton.data.findAnimation(name);
    }

    return null;
  },

  /**
   * !#en Returns track entry by trackIndex.<br>
   * Returns a {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry object.
   * !#zh 通过 track 索引获取 TrackEntry。<br>
   * 返回一个 {{#crossLinkModule "sp.spine"}}sp.spine{{/crossLinkModule}}.TrackEntry 对象。
   * @method getCurrent
   * @param trackIndex
   * @return {sp.spine.TrackEntry}
   */
  getCurrent: function getCurrent(trackIndex) {
    if (this.isAnimationCached()) {
      cc.warn("'getCurrent' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        return this._state.getCurrent(trackIndex);
      }
    }

    return null;
  },

  /**
   * !#en Clears all tracks of animation state.
   * !#zh 清除所有 track 的动画状态。
   * @method clearTracks
   */
  clearTracks: function clearTracks() {
    if (this.isAnimationCached()) {
      cc.warn("'clearTracks' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        this._state.clearTracks();
      }
    }
  },

  /**
   * !#en Clears track of animation state by trackIndex.
   * !#zh 清除出指定 track 的动画状态。
   * @method clearTrack
   * @param {number} trackIndex
   */
  clearTrack: function clearTrack(trackIndex) {
    if (this.isAnimationCached()) {
      cc.warn("'clearTrack' interface can not be invoked in cached mode.");
    } else {
      if (this._state) {
        this._state.clearTrack(trackIndex);

        if (CC_EDITOR && !cc.engine.isPlaying) {
          this._state.update(0);
        }
      }
    }
  },

  /**
   * !#en Set the start event listener.
   * !#zh 用来设置开始播放动画的事件监听。
   * @method setStartListener
   * @param {function} listener
   */
  setStartListener: function setStartListener(listener) {
    this._ensureListener();

    this._listener.start = listener;
  },

  /**
   * !#en Set the interrupt event listener.
   * !#zh 用来设置动画被打断的事件监听。
   * @method setInterruptListener
   * @param {function} listener
   */
  setInterruptListener: function setInterruptListener(listener) {
    this._ensureListener();

    this._listener.interrupt = listener;
  },

  /**
   * !#en Set the end event listener.
   * !#zh 用来设置动画播放完后的事件监听。
   * @method setEndListener
   * @param {function} listener
   */
  setEndListener: function setEndListener(listener) {
    this._ensureListener();

    this._listener.end = listener;
  },

  /**
   * !#en Set the dispose event listener.
   * !#zh 用来设置动画将被销毁的事件监听。
   * @method setDisposeListener
   * @param {function} listener
   */
  setDisposeListener: function setDisposeListener(listener) {
    this._ensureListener();

    this._listener.dispose = listener;
  },

  /**
   * !#en Set the complete event listener.
   * !#zh 用来设置动画播放一次循环结束后的事件监听。
   * @method setCompleteListener
   * @param {function} listener
   */
  setCompleteListener: function setCompleteListener(listener) {
    this._ensureListener();

    this._listener.complete = listener;
  },

  /**
   * !#en Set the animation event listener.
   * !#zh 用来设置动画播放过程中帧事件的监听。
   * @method setEventListener
   * @param {function} listener
   */
  setEventListener: function setEventListener(listener) {
    this._ensureListener();

    this._listener.event = listener;
  },

  /**
   * !#en Set the start event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画开始播放的事件监听。
   * @method setTrackStartListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackStartListener: function setTrackStartListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).start = listener;
  },

  /**
   * !#en Set the interrupt event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画被打断的事件监听。
   * @method setTrackInterruptListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackInterruptListener: function setTrackInterruptListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).interrupt = listener;
  },

  /**
   * !#en Set the end event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画播放结束的事件监听。
   * @method setTrackEndListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackEndListener: function setTrackEndListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).end = listener;
  },

  /**
   * !#en Set the dispose event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画即将被销毁的事件监听。
   * @method setTrackDisposeListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackDisposeListener: function setTrackDisposeListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).dispose = listener;
  },

  /**
   * !#en Set the complete event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画一次循环播放结束的事件监听。
   * @method setTrackCompleteListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   * @param {sp.spine.TrackEntry} listener.entry
   * @param {Number} listener.loopCount
   */
  setTrackCompleteListener: function setTrackCompleteListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).complete = function (trackEntry) {
      var loopCount = Math.floor(trackEntry.trackTime / trackEntry.animationEnd);
      listener(trackEntry, loopCount);
    };
  },

  /**
   * !#en Set the event listener for specified TrackEntry.
   * !#zh 用来为指定的 TrackEntry 设置动画帧事件的监听。
   * @method setTrackEventListener
   * @param {sp.spine.TrackEntry} entry
   * @param {function} listener
   */
  setTrackEventListener: function setTrackEventListener(entry, listener) {
    TrackEntryListeners.getListeners(entry).event = listener;
  },

  /**
   * !#en Get the animation state object
   * !#zh 获取动画状态
   * @method getState
   * @return {sp.spine.AnimationState} state
   */
  getState: function getState() {
    return this._state;
  },
  // update animation list for editor
  _updateAnimEnum: CC_EDITOR && function () {
    var animEnum;

    if (this.skeletonData) {
      animEnum = this.skeletonData.getAnimsEnum();
    } // change enum


    setEnumAttr(this, '_animationIndex', animEnum || DefaultAnimsEnum);
  },
  // update skin list for editor
  _updateSkinEnum: CC_EDITOR && function () {
    var skinEnum;

    if (this.skeletonData) {
      skinEnum = this.skeletonData.getSkinsEnum();
    } // change enum


    setEnumAttr(this, '_defaultSkinIndex', skinEnum || DefaultSkinsEnum);
  },
  _ensureListener: function _ensureListener() {
    if (!this._listener) {
      this._listener = new TrackEntryListeners();

      if (this._state) {
        this._state.addListener(this._listener);
      }
    }
  },
  _updateSkeletonData: function _updateSkeletonData() {
    if (!this.skeletonData) {
      this.disableRender();
      return;
    }

    var data = this.skeletonData.getRuntimeData();

    if (!data) {
      this.disableRender();
      return;
    }

    try {
      this.setSkeletonData(data);

      if (!this.isAnimationCached()) {
        this.setAnimationStateData(new spine.AnimationStateData(this._skeleton.data));
      }

      this.defaultSkin && this.setSkin(this.defaultSkin);
    } catch (e) {
      cc.warn(e);
    }

    this.attachUtil.init(this);

    this.attachUtil._associateAttachedNode();

    this._preCacheMode = this._cacheMode;
    this.animation = this.defaultAnimation;
  },
  _refreshInspector: function _refreshInspector() {
    // update inspector
    this._updateAnimEnum();

    this._updateSkinEnum();

    Editor.Utils.refreshSelectedInspector('node', this.node.uuid);
  },
  _updateDebugDraw: function _updateDebugDraw() {
    if (this.debugBones || this.debugSlots) {
      if (!this._debugRenderer) {
        var debugDrawNode = new cc.PrivateNode();
        debugDrawNode.name = 'DEBUG_DRAW_NODE';
        var debugDraw = debugDrawNode.addComponent(Graphics);
        debugDraw.lineWidth = 1;
        debugDraw.strokeColor = cc.color(255, 0, 0, 255);
        this._debugRenderer = debugDraw;
      }

      this._debugRenderer.node.parent = this.node;

      if (this.isAnimationCached()) {
        cc.warn("Debug bones or slots is invalid in cached mode");
      }
    } else if (this._debugRenderer) {
      this._debugRenderer.node.parent = null;
    }
  }
});
module.exports = sp.Skeleton;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9Ta2VsZXRvbi5qcyJdLCJuYW1lcyI6WyJUcmFja0VudHJ5TGlzdGVuZXJzIiwicmVxdWlyZSIsIlJlbmRlckNvbXBvbmVudCIsInNwaW5lIiwiR3JhcGhpY3MiLCJSZW5kZXJGbG93IiwiRkxBR19QT1NUX1JFTkRFUiIsIlNrZWxldG9uQ2FjaGUiLCJBdHRhY2hVdGlsIiwiRGVmYXVsdFNraW5zRW51bSIsImNjIiwiRW51bSIsIkRlZmF1bHRBbmltc0VudW0iLCJBbmltYXRpb25DYWNoZU1vZGUiLCJSRUFMVElNRSIsIlNIQVJFRF9DQUNIRSIsIlBSSVZBVEVfQ0FDSEUiLCJzZXRFbnVtQXR0ciIsIm9iaiIsInByb3BOYW1lIiwiZW51bURlZiIsIkNsYXNzIiwiQXR0ciIsInNldENsYXNzQXR0ciIsImdldExpc3QiLCJzcCIsIlNrZWxldG9uIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsIm1lbnUiLCJoZWxwIiwiaW5zcGVjdG9yIiwic3RhdGljcyIsInByb3BlcnRpZXMiLCJwYXVzZWQiLCJ2aXNpYmxlIiwic2tlbGV0b25EYXRhIiwidHlwZSIsIlNrZWxldG9uRGF0YSIsIm5vdGlmeSIsImRlZmF1bHRTa2luIiwiZGVmYXVsdEFuaW1hdGlvbiIsIl9yZWZyZXNoSW5zcGVjdG9yIiwiX3VwZGF0ZVNrZWxldG9uRGF0YSIsInRvb2x0aXAiLCJDQ19ERVYiLCJhbmltYXRpb24iLCJnZXQiLCJpc0FuaW1hdGlvbkNhY2hlZCIsIl9hbmltYXRpb25OYW1lIiwiZW50cnkiLCJnZXRDdXJyZW50Iiwic2V0IiwidmFsdWUiLCJzZXRBbmltYXRpb24iLCJsb29wIiwiY2xlYXJUcmFjayIsInNldFRvU2V0dXBQb3NlIiwiX2RlZmF1bHRTa2luSW5kZXgiLCJza2luc0VudW0iLCJnZXRTa2luc0VudW0iLCJoYXNPd25Qcm9wZXJ0eSIsInNraW5JbmRleCIsInVuZGVmaW5lZCIsImVycm9ySUQiLCJza2luTmFtZSIsInNldFNraW4iLCJlbmdpbmUiLCJpc1BsYXlpbmciLCJkaXNwbGF5TmFtZSIsIl9hbmltYXRpb25JbmRleCIsImFuaW1hdGlvbk5hbWUiLCJhbmltc0VudW0iLCJnZXRBbmltc0VudW0iLCJhbmltSW5kZXgiLCJhbmltTmFtZSIsIl9wcmVDYWNoZU1vZGUiLCJfY2FjaGVNb2RlIiwiX2RlZmF1bHRDYWNoZU1vZGUiLCJzZXRBbmltYXRpb25DYWNoZU1vZGUiLCJlZGl0b3JPbmx5IiwiYW5pbWF0YWJsZSIsInByZW11bHRpcGxpZWRBbHBoYSIsInRpbWVTY2FsZSIsImRlYnVnU2xvdHMiLCJfdXBkYXRlRGVidWdEcmF3IiwiZGVidWdCb25lcyIsImRlYnVnTWVzaCIsInVzZVRpbnQiLCJfdXBkYXRlVXNlVGludCIsImVuYWJsZUJhdGNoIiwiX3VwZGF0ZUJhdGNoIiwiX2FjY1RpbWUiLCJfcGxheUNvdW50IiwiX2ZyYW1lQ2FjaGUiLCJfY3VyRnJhbWUiLCJfc2tlbGV0b25DYWNoZSIsIl9hbmltYXRpb25RdWV1ZSIsIl9oZWFkQW5pSW5mbyIsIl9wbGF5VGltZXMiLCJfaXNBbmlDb21wbGV0ZSIsImN0b3IiLCJfZWZmZWN0RGVsZWdhdGUiLCJfc2tlbGV0b24iLCJfcm9vdEJvbmUiLCJfbGlzdGVuZXIiLCJfbWF0ZXJpYWxDYWNoZSIsIl9kZWJ1Z1JlbmRlcmVyIiwiX3N0YXJ0U2xvdEluZGV4IiwiX2VuZFNsb3RJbmRleCIsIl9zdGFydEVudHJ5IiwidHJhY2tJbmRleCIsIl9lbmRFbnRyeSIsImF0dGFjaFV0aWwiLCJfZ2V0RGVmYXVsdE1hdGVyaWFsIiwiTWF0ZXJpYWwiLCJnZXRCdWlsdGluTWF0ZXJpYWwiLCJfdXBkYXRlTWF0ZXJpYWwiLCJDQ19OQVRJVkVSRU5ERVJFUiIsImJhc2VNYXRlcmlhbCIsImdldE1hdGVyaWFsIiwiZGVmaW5lIiwic3JjQmxlbmRGYWN0b3IiLCJnZngiLCJCTEVORF9PTkUiLCJCTEVORF9TUkNfQUxQSEEiLCJkc3RCbGVuZEZhY3RvciIsIkJMRU5EX09ORV9NSU5VU19TUkNfQUxQSEEiLCJzZXRCbGVuZCIsIkJMRU5EX0ZVTkNfQUREIiwiZGlzYWJsZVJlbmRlciIsIl9zdXBlciIsIm5vZGUiLCJfcmVuZGVyRmxhZyIsIm1hcmtGb3JSZW5kZXIiLCJlbmFibGUiLCJfdmFsaWRhdGVSZW5kZXIiLCJpc1RleHR1cmVzTG9hZGVkIiwic2V0U2tlbGV0b25EYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJzZXRDb250ZW50U2l6ZSIsInNoYXJlZENhY2hlIiwiZW5hYmxlUHJpdmF0ZU1vZGUiLCJ3YXJuIiwic2tlbGV0b25JbmZvIiwiZ2V0U2tlbGV0b25DYWNoZSIsIl91dWlkIiwic2tlbGV0b24iLCJfY2xpcHBlciIsImNsaXBwZXIiLCJnZXRSb290Qm9uZSIsIlNrZWxldG9uQ2xpcHBpbmciLCJzZXRTbG90c1JhbmdlIiwic3RhcnRTbG90SW5kZXgiLCJlbmRTbG90SW5kZXgiLCJzZXRBbmltYXRpb25TdGF0ZURhdGEiLCJzdGF0ZURhdGEiLCJzdGF0ZSIsIkFuaW1hdGlvblN0YXRlIiwiX3N0YXRlIiwicmVtb3ZlTGlzdGVuZXIiLCJhZGRMaXN0ZW5lciIsIl9fcHJlbG9hZCIsIkZsYWdzIiwiT2JqZWN0IiwiX29iakZsYWdzIiwiSXNBbmNob3JMb2NrZWQiLCJJc1NpemVMb2NrZWQiLCJjaGlsZHJlbiIsImkiLCJuIiwibGVuZ3RoIiwiY2hpbGQiLCJfbmFtZSIsImRlc3Ryb3kiLCJjYWNoZU1vZGUiLCJ1cGRhdGUiLCJkdCIsImZyYW1lQ2FjaGUiLCJpc0ludmFsaWQiLCJ1cGRhdGVUb0ZyYW1lIiwiZnJhbWVzIiwic2hpZnQiLCJkZWxheSIsImFuaUluZm8iLCJfdXBkYXRlQ2FjaGUiLCJfdXBkYXRlUmVhbHRpbWUiLCJfZW1pdENhY2hlQ29tcGxldGVFdmVudCIsImNvbXBsZXRlIiwiZW5kIiwiaXNJbml0ZWQiLCJmcmFtZVRpbWUiLCJGcmFtZVRpbWUiLCJzdGFydCIsImZyYW1lSWR4IiwiTWF0aCIsImZsb29yIiwiaXNDb21wbGV0ZWQiLCJhcHBseSIsInNldFZlcnRleEVmZmVjdERlbGVnYXRlIiwiZWZmZWN0RGVsZWdhdGUiLCJ1cGRhdGVXb3JsZFRyYW5zZm9ybSIsInNldEJvbmVzVG9TZXR1cFBvc2UiLCJzZXRTbG90c1RvU2V0dXBQb3NlIiwidXBkYXRlQW5pbWF0aW9uQ2FjaGUiLCJ1dWlkIiwiaW52YWxpZEFuaW1hdGlvbkNhY2hlIiwiZmluZEJvbmUiLCJib25lTmFtZSIsImZpbmRTbG90Iiwic2xvdE5hbWUiLCJzZXRTa2luQnlOYW1lIiwiZ2V0QXR0YWNobWVudCIsImF0dGFjaG1lbnROYW1lIiwiZ2V0QXR0YWNobWVudEJ5TmFtZSIsInNldEF0dGFjaG1lbnQiLCJnZXRUZXh0dXJlQXRsYXMiLCJyZWdpb25BdHRhY2htZW50IiwicmVnaW9uIiwic2V0TWl4IiwiZnJvbUFuaW1hdGlvbiIsInRvQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJkYXRhIiwiY2FjaGUiLCJnZXRBbmltYXRpb25DYWNoZSIsImluaXRBbmltYXRpb25DYWNoZSIsIl9oYXNBdHRhY2hlZE5vZGUiLCJlbmFibGVDYWNoZUF0dGFjaGVkSW5mbyIsImZpbmRBbmltYXRpb24iLCJsb2dJRCIsInJlcyIsInNldEFuaW1hdGlvbldpdGgiLCJhZGRBbmltYXRpb24iLCJwdXNoIiwiYWRkQW5pbWF0aW9uV2l0aCIsImNsZWFyVHJhY2tzIiwic2V0U3RhcnRMaXN0ZW5lciIsImxpc3RlbmVyIiwiX2Vuc3VyZUxpc3RlbmVyIiwic2V0SW50ZXJydXB0TGlzdGVuZXIiLCJpbnRlcnJ1cHQiLCJzZXRFbmRMaXN0ZW5lciIsInNldERpc3Bvc2VMaXN0ZW5lciIsImRpc3Bvc2UiLCJzZXRDb21wbGV0ZUxpc3RlbmVyIiwic2V0RXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic2V0VHJhY2tTdGFydExpc3RlbmVyIiwiZ2V0TGlzdGVuZXJzIiwic2V0VHJhY2tJbnRlcnJ1cHRMaXN0ZW5lciIsInNldFRyYWNrRW5kTGlzdGVuZXIiLCJzZXRUcmFja0Rpc3Bvc2VMaXN0ZW5lciIsInNldFRyYWNrQ29tcGxldGVMaXN0ZW5lciIsInRyYWNrRW50cnkiLCJsb29wQ291bnQiLCJ0cmFja1RpbWUiLCJhbmltYXRpb25FbmQiLCJzZXRUcmFja0V2ZW50TGlzdGVuZXIiLCJnZXRTdGF0ZSIsIl91cGRhdGVBbmltRW51bSIsImFuaW1FbnVtIiwiX3VwZGF0ZVNraW5FbnVtIiwic2tpbkVudW0iLCJnZXRSdW50aW1lRGF0YSIsIkFuaW1hdGlvblN0YXRlRGF0YSIsImUiLCJpbml0IiwiX2Fzc29jaWF0ZUF0dGFjaGVkTm9kZSIsIkVkaXRvciIsIlV0aWxzIiwicmVmcmVzaFNlbGVjdGVkSW5zcGVjdG9yIiwiZGVidWdEcmF3Tm9kZSIsIlByaXZhdGVOb2RlIiwiZGVidWdEcmF3IiwiYWRkQ29tcG9uZW50IiwibGluZVdpZHRoIiwic3Ryb2tlQ29sb3IiLCJjb2xvciIsInBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxtQkFBbUIsR0FBR0MsT0FBTyxDQUFDLHlCQUFELENBQW5DOztBQUNBLElBQU1DLGVBQWUsR0FBR0QsT0FBTyxDQUFDLGlEQUFELENBQS9COztBQUNBLElBQU1FLEtBQUssR0FBR0YsT0FBTyxDQUFDLGFBQUQsQ0FBckI7O0FBQ0EsSUFBTUcsUUFBUSxHQUFHSCxPQUFPLENBQUMsc0NBQUQsQ0FBeEI7O0FBQ0EsSUFBTUksVUFBVSxHQUFHSixPQUFPLENBQUMseUNBQUQsQ0FBMUI7O0FBQ0EsSUFBTUssZ0JBQWdCLEdBQUdELFVBQVUsQ0FBQ0MsZ0JBQXBDOztBQUVBLElBQUlDLGFBQWEsR0FBR04sT0FBTyxDQUFDLGtCQUFELENBQTNCOztBQUNBLElBQUlPLFVBQVUsR0FBR1AsT0FBTyxDQUFDLGNBQUQsQ0FBeEI7QUFFQTs7Ozs7QUFHQSxJQUFJUSxnQkFBZ0IsR0FBR0MsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFBRSxhQUFXLENBQUM7QUFBZCxDQUFSLENBQXZCO0FBQ0Es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YUFBSzVLLGNBQUwsR0FBc0J3SyxTQUF0QjtBQUNIOztBQUVELFdBQUt4SyxjQUFMLENBQW9CeUIsSUFBcEIsQ0FBeUJvSixNQUF6QixHQUFrQyxLQUFLcEosSUFBdkM7O0FBQ0EsVUFBSSxLQUFLcEYsaUJBQUwsRUFBSixFQUE4QjtBQUMxQnZDLFFBQUFBLEVBQUUsQ0FBQ3VJLElBQUgsQ0FBUSxnREFBUjtBQUNIO0FBQ0osS0FmRCxNQWdCSyxJQUFJLEtBQUtyQyxjQUFULEVBQXlCO0FBQzFCLFdBQUtBLGNBQUwsQ0FBb0J5QixJQUFwQixDQUF5Qm9KLE1BQXpCLEdBQWtDLElBQWxDO0FBQ0g7QUFDSjtBQTF2Q2tCLENBQVQsQ0FBZDtBQTZ2Q0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxRLEVBQUUsQ0FBQ0MsUUFBcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IFRyYWNrRW50cnlMaXN0ZW5lcnMgPSByZXF1aXJlKCcuL3RyYWNrLWVudHJ5LWxpc3RlbmVycycpO1xuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NSZW5kZXJDb21wb25lbnQnKTtcbmNvbnN0IHNwaW5lID0gcmVxdWlyZSgnLi9saWIvc3BpbmUnKTtcbmNvbnN0IEdyYXBoaWNzID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL2dyYXBoaWNzL2dyYXBoaWNzJyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi4vLi4vY29jb3MyZC9jb3JlL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5jb25zdCBGTEFHX1BPU1RfUkVOREVSID0gUmVuZGVyRmxvdy5GTEFHX1BPU1RfUkVOREVSO1xuXG5sZXQgU2tlbGV0b25DYWNoZSA9IHJlcXVpcmUoJy4vc2tlbGV0b24tY2FjaGUnKTtcbmxldCBBdHRhY2hVdGlsID0gcmVxdWlyZSgnLi9BdHRhY2hVdGlsJyk7XG5cbi8qKlxuICogQG1vZHVsZSBzcFxuICovXG5sZXQgRGVmYXVsdFNraW5zRW51bSA9IGNjLkVudW0oeyAnZGVmYXVsdCc6IC0xIH0pO1xubGV0IERlZmF1bHRBbmltc0VudW0gPSBjYy5FbnVtKHsgJzxOb25lPic6IDAgfSk7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBhbmltYXRpb24gY2FjaGUgbW9kZSB0eXBlLlxuICogISN6aCBTcGluZeWKqOeUu+e8k+WtmOexu+Wei1xuICogQGVudW0gU2tlbGV0b24uQW5pbWF0aW9uQ2FjaGVNb2RlXG4gKi9cbmxldCBBbmltYXRpb25DYWNoZU1vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSByZWFsdGltZSBtb2RlLlxuICAgICAqICEjemgg5a6e5pe26K6h566X5qih5byP44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJFQUxUSU1FXG4gICAgICovXG4gICAgUkVBTFRJTUU6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2hhcmVkIGNhY2hlIG1vZGUuXG4gICAgICogISN6aCDlhbHkuqvnvJPlrZjmqKHlvI/jgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUkVEX0NBQ0hFXG4gICAgICovXG4gICAgU0hBUkVEX0NBQ0hFOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHByaXZhdGUgY2FjaGUgbW9kZS5cbiAgICAgKiAhI3poIOengeaciee8k+WtmOaooeW8j+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQUklWQVRFX0NBQ0hFXG4gICAgICovXG4gICAgUFJJVkFURV9DQUNIRTogMiBcbn0pO1xuXG5mdW5jdGlvbiBzZXRFbnVtQXR0ciAob2JqLCBwcm9wTmFtZSwgZW51bURlZikge1xuICAgIGNjLkNsYXNzLkF0dHIuc2V0Q2xhc3NBdHRyKG9iaiwgcHJvcE5hbWUsICd0eXBlJywgJ0VudW0nKTtcbiAgICBjYy5DbGFzcy5BdHRyLnNldENsYXNzQXR0cihvYmosIHByb3BOYW1lLCAnZW51bUxpc3QnLCBjYy5FbnVtLmdldExpc3QoZW51bURlZikpO1xufVxuXG4vKipcbiAqICEjZW5cbiAqIFRoZSBza2VsZXRvbiBvZiBTcGluZSA8YnIvPlxuICogPGJyLz5cbiAqIChTa2VsZXRvbiBoYXMgYSByZWZlcmVuY2UgdG8gYSBTa2VsZXRvbkRhdGEgYW5kIHN0b3JlcyB0aGUgc3RhdGUgZm9yIHNrZWxldG9uIGluc3RhbmNlLFxuICogd2hpY2ggY29uc2lzdHMgb2YgdGhlIGN1cnJlbnQgcG9zZSdzIGJvbmUgU1JULCBzbG90IGNvbG9ycywgYW5kIHdoaWNoIHNsb3QgYXR0YWNobWVudHMgYXJlIHZpc2libGUuIDxici8+XG4gKiBNdWx0aXBsZSBza2VsZXRvbnMgY2FuIHVzZSB0aGUgc2FtZSBTa2VsZXRvbkRhdGEgd2hpY2ggaW5jbHVkZXMgYWxsIGFuaW1hdGlvbnMsIHNraW5zLCBhbmQgYXR0YWNobWVudHMuKSA8YnIvPlxuICogISN6aFxuICogU3BpbmUg6aqo6aq85Yqo55S7IDxici8+XG4gKiA8YnIvPlxuICogKFNrZWxldG9uIOWFt+acieWvuemqqOmqvOaVsOaNrueahOW8leeUqOW5tuS4lOWtmOWCqOS6humqqOmqvOWunuS+i+eahOeKtuaAge+8jFxuICog5a6D55Sx5b2T5YmN55qE6aqo6aq85Yqo5L2c77yMc2xvdCDpopzoibLvvIzlkozlj6/op4HnmoQgc2xvdCBhdHRhY2htZW50cyDnu4TmiJDjgII8YnIvPlxuICog5aSa5LiqIFNrZWxldG9uIOWPr+S7peS9v+eUqOebuOWQjOeahOmqqOmqvOaVsOaNru+8jOWFtuS4reWMheaLrOaJgOacieeahOWKqOeUu++8jOearuiCpOWSjCBhdHRhY2htZW50c+OAglxuICpcbiAqIEBjbGFzcyBTa2VsZXRvblxuICogQGV4dGVuZHMgUmVuZGVyQ29tcG9uZW50XG4gKi9cbnNwLlNrZWxldG9uID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdzcC5Ta2VsZXRvbicsXG4gICAgZXh0ZW5kczogUmVuZGVyQ29tcG9uZW50LFxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC5yZW5kZXJlcnMvU3BpbmUgU2tlbGV0b24nLFxuICAgICAgICBoZWxwOiAnYXBwOi8vZG9jcy9odG1sL2NvbXBvbmVudHMvc3BpbmUuaHRtbCcsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2tlbGV0b24yZC5qcycsXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgQW5pbWF0aW9uQ2FjaGVNb2RlOiBBbmltYXRpb25DYWNoZU1vZGUsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNrZWxldGFsIGFuaW1hdGlvbiBpcyBwYXVzZWQ/XG4gICAgICAgICAqICEjemgg6K+l6aqo6aq85Yqo55S75piv5ZCm5pqC5YGc44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBwYXVzZWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgcGF1c2VkOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIHNrZWxldG9uIGRhdGEgY29udGFpbnMgdGhlIHNrZWxldG9uIGluZm9ybWF0aW9uIChiaW5kIHBvc2UgYm9uZXMsIHNsb3RzLCBkcmF3IG9yZGVyLFxuICAgICAgICAgKiBhdHRhY2htZW50cywgc2tpbnMsIGV0YykgYW5kIGFuaW1hdGlvbnMgYnV0IGRvZXMgbm90IGhvbGQgYW55IHN0YXRlLjxici8+XG4gICAgICAgICAqIE11bHRpcGxlIHNrZWxldG9ucyBjYW4gc2hhcmUgdGhlIHNhbWUgc2tlbGV0b24gZGF0YS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDpqqjpqrzmlbDmja7ljIXlkKvkuobpqqjpqrzkv6Hmga/vvIjnu5HlrprpqqjpqrzliqjkvZzvvIxzbG90c++8jOa4suafk+mhuuW6j++8jFxuICAgICAgICAgKiBhdHRhY2htZW50c++8jOearuiCpOetieetie+8ieWSjOWKqOeUu+S9huS4jeaMgeacieS7u+S9leeKtuaAgeOAgjxici8+XG4gICAgICAgICAqIOWkmuS4qiBTa2VsZXRvbiDlj6/ku6XlhbHnlKjnm7jlkIznmoTpqqjpqrzmlbDmja7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtzcC5Ta2VsZXRvbkRhdGF9IHNrZWxldG9uRGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgc2tlbGV0b25EYXRhOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogc3AuU2tlbGV0b25EYXRhLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlZmF1bHRTa2luID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0QW5pbWF0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoSW5zcGVjdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNrZWxldG9uRGF0YSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uc2tlbGV0b25fZGF0YSdcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDnlLHkuo4gc3BpbmUg55qEIHNraW4g5piv5peg5rOV5LqM5qyh5pu/5o2i55qE77yM5omA5Lul5Y+q6IO96K6+572u6buY6K6k55qEIHNraW5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG5hbWUgb2YgZGVmYXVsdCBza2luLlxuICAgICAgICAgKiAhI3poIOm7mOiupOeahOearuiCpOWQjeensOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gZGVmYXVsdFNraW5cbiAgICAgICAgICovXG4gICAgICAgIGRlZmF1bHRTa2luOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG5hbWUgb2YgZGVmYXVsdCBhbmltYXRpb24uXG4gICAgICAgICAqICEjemgg6buY6K6k55qE5Yqo55S75ZCN56ew44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBkZWZhdWx0QW5pbWF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBkZWZhdWx0QW5pbWF0aW9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAnJyxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIG5hbWUgb2YgY3VycmVudCBwbGF5aW5nIGFuaW1hdGlvbi5cbiAgICAgICAgICogISN6aCDlvZPliY3mkq3mlL7nmoTliqjnlLvlkI3np7DjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTdHJpbmd9IGFuaW1hdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuaW1hdGlvbk5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5nZXRDdXJyZW50KDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGVudHJ5ICYmIGVudHJ5LmFuaW1hdGlvbi5uYW1lKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0QW5pbWF0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uKDAsIHZhbHVlLCB0aGlzLmxvb3ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghdGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUcmFjaygwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUb1NldHVwUG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gX2RlZmF1bHRTa2luSW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIF9kZWZhdWx0U2tpbkluZGV4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNrZWxldG9uRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2tpbnNFbnVtID0gdGhpcy5za2VsZXRvbkRhdGEuZ2V0U2tpbnNFbnVtKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNraW5zRW51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5kZWZhdWx0U2tpbiA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNraW5zRW51bS5oYXNPd25Qcm9wZXJ0eSgwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWZhdWx0U2tpbkluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2tpbkluZGV4ID0gc2tpbnNFbnVtW3RoaXMuZGVmYXVsdFNraW5dO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2luSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2tpbkluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNraW5zRW51bTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5za2VsZXRvbkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2tpbnNFbnVtID0gdGhpcy5za2VsZXRvbkRhdGEuZ2V0U2tpbnNFbnVtKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICggIXNraW5zRW51bSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoJycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc2tpbk5hbWUgPSBza2luc0VudW1bdmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChza2luTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdFNraW4gPSBza2luTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTa2luKHRoaXMuZGVmYXVsdFNraW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWZyZXNoSW5zcGVjdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNzUwMSwgdGhpcy5uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogRGVmYXVsdFNraW5zRW51bSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogXCJEZWZhdWx0IFNraW5cIixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uZGVmYXVsdF9za2luJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIHZhbHVlIG9mIDAgcmVwcmVzZW50cyBubyBhbmltYXRpb25cbiAgICAgICAgX2FuaW1hdGlvbkluZGV4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb25OYW1lID0gKCFDQ19FRElUT1IgfHwgY2MuZW5naW5lLmlzUGxheWluZykgPyB0aGlzLmFuaW1hdGlvbiA6IHRoaXMuZGVmYXVsdEFuaW1hdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5za2VsZXRvbkRhdGEgJiYgYW5pbWF0aW9uTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW5pbXNFbnVtID0gdGhpcy5za2VsZXRvbkRhdGEuZ2V0QW5pbXNFbnVtKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltc0VudW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbmltSW5kZXggPSBhbmltc0VudW1bYW5pbWF0aW9uTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbUluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5pbUluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYW5pbXNFbnVtO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNrZWxldG9uRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBhbmltc0VudW0gPSB0aGlzLnNrZWxldG9uRGF0YS5nZXRBbmltc0VudW0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCAhYW5pbXNFbnVtICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCg3NTAyLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgYW5pbU5hbWUgPSBhbmltc0VudW1bdmFsdWVdO1xuICAgICAgICAgICAgICAgIGlmIChhbmltTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uID0gYW5pbU5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDc1MDMsIHRoaXMubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogRGVmYXVsdEFuaW1zRW51bSxcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0FuaW1hdGlvbicsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLmFuaW1hdGlvbidcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBSZWNvcmQgcHJlIGNhY2hlIG1vZGUuXG4gICAgICAgIF9wcmVDYWNoZU1vZGU6IC0xLFxuICAgICAgICBfY2FjaGVNb2RlOiBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUUsXG4gICAgICAgIF9kZWZhdWx0Q2FjaGVNb2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgdHlwZTogQW5pbWF0aW9uQ2FjaGVNb2RlLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFuaW1hdGlvbkNhY2hlTW9kZSh0aGlzLl9kZWZhdWx0Q2FjaGVNb2RlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwiQW5pbWF0aW9uIENhY2hlIE1vZGVcIixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uYW5pbWF0aW9uX2NhY2hlX21vZGUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVE9ET1xuICAgICAgICAgKiAhI3poIOaYr+WQpuW+queOr+aSreaUvuW9k+WJjemqqOmqvOWKqOeUu+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGxvb3BcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgbG9vcDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24ubG9vcCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciB0byBlbmFibGUgcHJlbXVsdGlwbGllZCBhbHBoYS5cbiAgICAgICAgICogWW91IHNob3VsZCBkaXNhYmxlIHRoaXMgb3B0aW9uIHdoZW4gaW1hZ2UncyB0cmFuc3BhcmVudCBhcmVhIGFwcGVhcnMgdG8gaGF2ZSBvcGFxdWUgcGl4ZWxzLFxuICAgICAgICAgKiBvciBlbmFibGUgdGhpcyBvcHRpb24gd2hlbiBpbWFnZSdzIGhhbGYgdHJhbnNwYXJlbnQgYXJlYSBhcHBlYXJzIHRvIGJlIGRhcmtlbi5cbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjotLTlm77pooTkuZjjgIJcbiAgICAgICAgICog5b2T5Zu+54mH55qE6YCP5piO5Yy65Z+f5Ye6546w6Imy5Z2X5pe26ZyA6KaB5YWz6Zet6K+l6YCJ6aG577yM5b2T5Zu+54mH55qE5Y2K6YCP5piO5Yy65Z+f6aKc6Imy5Y+Y6buR5pe26ZyA6KaB5ZCv55So6K+l6YCJ6aG544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcHJlbXVsdGlwbGllZEFscGhhXG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIHByZW11bHRpcGxpZWRBbHBoYToge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24ucHJlbXVsdGlwbGllZEFscGhhJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB0aW1lIHNjYWxlIG9mIHRoaXMgc2tlbGV0b24uXG4gICAgICAgICAqICEjemgg5b2T5YmN6aqo6aq85Lit5omA5pyJ5Yqo55S755qE5pe26Ze057yp5pS+546H44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB0aW1lU2NhbGVcbiAgICAgICAgICogQGRlZmF1bHQgMVxuICAgICAgICAgKi9cbiAgICAgICAgdGltZVNjYWxlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAxLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi50aW1lX3NjYWxlJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB3aGV0aGVyIG9wZW4gZGVidWcgc2xvdHMuXG4gICAgICAgICAqICEjemgg5piv5ZCm5pi+56S6IHNsb3Qg55qEIGRlYnVnIOS/oeaBr+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGRlYnVnU2xvdHNcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnU2xvdHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24uZGVidWdfc2xvdHMnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEZWJ1Z0RyYXcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJbmRpY2F0ZXMgd2hldGhlciBvcGVuIGRlYnVnIGJvbmVzLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuaYvuekuiBib25lIOeahCBkZWJ1ZyDkv6Hmga/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWJ1Z0JvbmVzXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBkZWJ1Z0JvbmVzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNrZWxldG9uLmRlYnVnX2JvbmVzJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgb3BlbiBkZWJ1ZyBtZXNoLlxuICAgICAgICAgKiAhI3poIOaYr+WQpuaYvuekuiBtZXNoIOeahCBkZWJ1ZyDkv6Hmga/jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBkZWJ1Z01lc2hcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGRlYnVnTWVzaDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi5kZWJ1Z19tZXNoJyxcbiAgICAgICAgICAgIG5vdGlmeSAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gRW5hYmxlZCB0d28gY29sb3IgdGludC5cbiAgICAgICAgICogISN6aCDmmK/lkKblkK/nlKjmn5PoibLmlYjmnpzjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB1c2VUaW50XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICB1c2VUaW50OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2tlbGV0b24udXNlX3RpbnQnLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVVc2VUaW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gRW5hYmxlZCBiYXRjaCBtb2RlbCwgaWYgc2tlbGV0b24gaXMgY29tcGxleCwgZG8gbm90IGVuYWJsZSBiYXRjaCwgb3Igd2lsbCBsb3dlciBwZXJmb3JtYW5jZS5cbiAgICAgICAgICogISN6aCDlvIDlkK/lkIjmibnvvIzlpoLmnpzmuLLmn5PlpKfph4/nm7jlkIznurnnkIbvvIzkuJTnu5PmnoTnroDljZXnmoTpqqjpqrzliqjnlLvvvIzlvIDlkK/lkIjmibnlj6/ku6XpmY3kvY5kcmF3Y2FsbO+8jOWQpuWImeivt+S4jeimgeW8gOWQr++8jGNwdea2iOiAl+S8muS4iuWNh+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVuYWJsZUJhdGNoXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBlbmFibGVCYXRjaDoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUJhdGNoKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5za2VsZXRvbi5lbmFibGVkX2JhdGNoJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIEJlbG93IHByb3BlcnRpZXMgd2lsbCBlZmZlY3Qgd2hlbiBjYWNoZSBtb2RlIGlzIFNIQVJFRF9DQUNIRSBvciBQUklWQVRFX0NBQ0hFLlxuICAgICAgICAvLyBhY2N1bXVsYXRlIHRpbWVcbiAgICAgICAgX2FjY1RpbWU6IDAsXG4gICAgICAgIC8vIFBsYXkgdGltZXMgY291bnRlclxuICAgICAgICBfcGxheUNvdW50OiAwLFxuICAgICAgICAvLyBGcmFtZSBjYWNoZVxuICAgICAgICBfZnJhbWVDYWNoZTogbnVsbCxcbiAgICAgICAgLy8gQ3VyIGZyYW1lXG4gICAgICAgIF9jdXJGcmFtZTogbnVsbCxcbiAgICAgICAgLy8gU2tlbGV0b24gY2FjaGVcbiAgICAgICAgX3NrZWxldG9uQ2FjaGUgOiBudWxsLFxuICAgICAgICAvLyBBaW1hdGlvbiBuYW1lXG4gICAgICAgIF9hbmltYXRpb25OYW1lIDogXCJcIixcbiAgICAgICAgLy8gQW5pbWF0aW9uIHF1ZXVlXG4gICAgICAgIF9hbmltYXRpb25RdWV1ZSA6IFtdLFxuICAgICAgICAvLyBIZWFkIGFuaW1hdGlvbiBpbmZvIG9mIFxuICAgICAgICBfaGVhZEFuaUluZm8gOiBudWxsLFxuICAgICAgICAvLyBQbGF5IHRpbWVzXG4gICAgICAgIF9wbGF5VGltZXMgOiAwLFxuICAgICAgICAvLyBJcyBhbmltYXRpb24gY29tcGxldGUuXG4gICAgICAgIF9pc0FuaUNvbXBsZXRlIDogdHJ1ZSxcbiAgICB9LFxuXG4gICAgLy8gQ09OU1RSVUNUT1JcbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fZWZmZWN0RGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB0aGlzLl9za2VsZXRvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Jvb3RCb25lID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9tYXRlcmlhbENhY2hlID0ge307XG4gICAgICAgIHRoaXMuX2RlYnVnUmVuZGVyZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9zdGFydFNsb3RJbmRleCA9IC0xO1xuICAgICAgICB0aGlzLl9lbmRTbG90SW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5fc3RhcnRFbnRyeSA9IHthbmltYXRpb24gOiB7bmFtZSA6IFwiXCJ9LCB0cmFja0luZGV4IDogMH07XG4gICAgICAgIHRoaXMuX2VuZEVudHJ5ID0ge2FuaW1hdGlvbiA6IHtuYW1lIDogXCJcIn0sIHRyYWNrSW5kZXggOiAwfTtcbiAgICAgICAgdGhpcy5hdHRhY2hVdGlsID0gbmV3IEF0dGFjaFV0aWwoKTtcbiAgICB9LFxuXG4gICAgLy8gb3ZlcnJpZGUgYmFzZSBjbGFzcyBfZ2V0RGVmYXVsdE1hdGVyaWFsIHRvIG1vZGlmeSBkZWZhdWx0IG1hdGVyaWFsXG4gICAgX2dldERlZmF1bHRNYXRlcmlhbCAoKSB7XG4gICAgICAgIHJldHVybiBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwaW5lJyk7XG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRlIGJhc2UgY2xhc3MgX3VwZGF0ZU1hdGVyaWFsIHRvIHNldCBkZWZpbmUgdmFsdWUgYW5kIGNsZWFyIG1hdGVyaWFsIGNhY2hlXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IHVzZVRpbnQgPSB0aGlzLnVzZVRpbnQgfHwgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSAmJiAhQ0NfTkFUSVZFUkVOREVSRVIpO1xuICAgICAgICBsZXQgYmFzZU1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCgwKTtcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xuICAgICAgICAgICAgYmFzZU1hdGVyaWFsLmRlZmluZSgnVVNFX1RJTlQnLCB1c2VUaW50KTtcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ0NDX1VTRV9NT0RFTCcsICF0aGlzLmVuYWJsZUJhdGNoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHNyY0JsZW5kRmFjdG9yID0gdGhpcy5wcmVtdWx0aXBsaWVkQWxwaGEgPyBjYy5nZnguQkxFTkRfT05FIDogY2MuZ2Z4LkJMRU5EX1NSQ19BTFBIQTtcbiAgICAgICAgICAgIGxldCBkc3RCbGVuZEZhY3RvciA9IGNjLmdmeC5CTEVORF9PTkVfTUlOVVNfU1JDX0FMUEhBO1xuXG4gICAgICAgICAgICBiYXNlTWF0ZXJpYWwuc2V0QmxlbmQoXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBjYy5nZnguQkxFTkRfRlVOQ19BREQsXG4gICAgICAgICAgICAgICAgc3JjQmxlbmRGYWN0b3IsIHNyY0JsZW5kRmFjdG9yLFxuICAgICAgICAgICAgICAgIGNjLmdmeC5CTEVORF9GVU5DX0FERCxcbiAgICAgICAgICAgICAgICBkc3RCbGVuZEZhY3RvciwgZHN0QmxlbmRGYWN0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xuICAgIH0sXG5cbiAgICAvLyBvdmVycmlkZSBiYXNlIGNsYXNzIGRpc2FibGVSZW5kZXIgdG8gY2xlYXIgcG9zdCByZW5kZXIgZmxhZ1xuICAgIGRpc2FibGVSZW5kZXIgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgJj0gfkZMQUdfUE9TVF9SRU5ERVI7XG4gICAgfSxcblxuICAgIC8vIG92ZXJyaWRlIGJhc2UgY2xhc3MgZGlzYWJsZVJlbmRlciB0byBhZGQgcG9zdCByZW5kZXIgZmxhZ1xuICAgIG1hcmtGb3JSZW5kZXIgKGVuYWJsZSkge1xuICAgICAgICB0aGlzLl9zdXBlcihlbmFibGUpO1xuICAgICAgICBpZiAoZW5hYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuX3JlbmRlckZsYWcgfD0gRkxBR19QT1NUX1JFTkRFUjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5fcmVuZGVyRmxhZyAmPSB+RkxBR19QT1NUX1JFTkRFUjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBpZiBjaGFuZ2UgdXNlIHRpbnQgbW9kZSwganVzdCBjbGVhciBtYXRlcmlhbCBjYWNoZVxuICAgIF91cGRhdGVVc2VUaW50ICgpIHtcbiAgICAgICAgbGV0IGJhc2VNYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmIChiYXNlTWF0ZXJpYWwpIHtcbiAgICAgICAgICAgIGxldCB1c2VUaW50ID0gdGhpcy51c2VUaW50IHx8ICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkgJiYgIUNDX05BVElWRVJFTkRFUkVSKTtcbiAgICAgICAgICAgIGJhc2VNYXRlcmlhbC5kZWZpbmUoJ1VTRV9USU5UJywgdXNlVGludCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF0ZXJpYWxDYWNoZSA9IHt9O1xuICAgIH0sXG5cbiAgICAvLyBpZiBjaGFuZ2UgdXNlIGJhdGNoIG1vZGUsIGp1c3QgY2xlYXIgbWF0ZXJpYWwgY2FjaGVcbiAgICBfdXBkYXRlQmF0Y2ggKCkge1xuICAgICAgICBsZXQgYmFzZU1hdGVyaWFsID0gdGhpcy5nZXRNYXRlcmlhbCgwKTtcbiAgICAgICAgaWYgKGJhc2VNYXRlcmlhbCkge1xuICAgICAgICAgICAgYmFzZU1hdGVyaWFsLmRlZmluZSgnQ0NfVVNFX01PREVMJywgIXRoaXMuZW5hYmxlQmF0Y2gpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21hdGVyaWFsQ2FjaGUgPSB7fTtcbiAgICB9LFxuXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHNrZWxldG9uRGF0YSA9IHRoaXMuc2tlbGV0b25EYXRhO1xuICAgICAgICBpZiAoIXNrZWxldG9uRGF0YSB8fCAhc2tlbGV0b25EYXRhLmlzVGV4dHVyZXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgcnVudGltZSBza2VsZXRvbiBkYXRhIHRvIHNwLlNrZWxldG9uLjxicj5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgYHNrZWxldG9uRGF0YWAgcHJvcGVydHkuIFRoaXMgbWV0aG9kIGlzIHBhc3NlZCBpbiB0aGUgcmF3IGRhdGEgcHJvdmlkZWQgYnkgdGhlIFNwaW5lIHJ1bnRpbWUsIGFuZCB0aGUgc2tlbGV0b25EYXRhIHR5cGUgaXMgdGhlIGFzc2V0IHR5cGUgcHJvdmlkZWQgYnkgQ3JlYXRvci5cbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5bqV5bGC6L+Q6KGM5pe255So5Yiw55qEIFNrZWxldG9uRGF0YeOAgjxicj5cbiAgICAgKiDov5nkuKrmjqXlj6PmnInliKvkuo4gYHNrZWxldG9uRGF0YWAg5bGe5oCn77yM6L+Z5Liq5o6l5Y+j5Lyg5YWl55qE5pivIFNwaW5lIHJ1bnRpbWUg5o+Q5L6b55qE5Y6f5aeL5pWw5o2u77yM6ICMIHNrZWxldG9uRGF0YSDnmoTnsbvlnovmmK8gQ3JlYXRvciDmj5DkvpvnmoTotYTmupDnsbvlnovjgIJcbiAgICAgKiBAbWV0aG9kIHNldFNrZWxldG9uRGF0YVxuICAgICAqIEBwYXJhbSB7c3Auc3BpbmUuU2tlbGV0b25EYXRhfSBza2VsZXRvbkRhdGFcbiAgICAgKi9cbiAgICBzZXRTa2VsZXRvbkRhdGEgKHNrZWxldG9uRGF0YSkge1xuICAgICAgICBpZiAoc2tlbGV0b25EYXRhLndpZHRoICE9IG51bGwgJiYgc2tlbGV0b25EYXRhLmhlaWdodCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoc2tlbGV0b25EYXRhLndpZHRoLCBza2VsZXRvbkRhdGEuaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2FjaGVNb2RlID09PSBBbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZSA9IFNrZWxldG9uQ2FjaGUuc2hhcmVkQ2FjaGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhY2hlTW9kZSA9PT0gQW5pbWF0aW9uQ2FjaGVNb2RlLlBSSVZBVEVfQ0FDSEUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9za2VsZXRvbkNhY2hlID0gbmV3IFNrZWxldG9uQ2FjaGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZS5lbmFibGVQcml2YXRlTW9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWdCb25lcyB8fCB0aGlzLmRlYnVnU2xvdHMpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiRGVidWcgYm9uZXMgb3Igc2xvdHMgaXMgaW52YWxpZCBpbiBjYWNoZWQgbW9kZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBza2VsZXRvbkluZm8gPSB0aGlzLl9za2VsZXRvbkNhY2hlLmdldFNrZWxldG9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQsIHNrZWxldG9uRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbiA9IHNrZWxldG9uSW5mby5za2VsZXRvbjtcbiAgICAgICAgICAgIHRoaXMuX2NsaXBwZXIgPSBza2VsZXRvbkluZm8uY2xpcHBlcjtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RCb25lID0gdGhpcy5fc2tlbGV0b24uZ2V0Um9vdEJvbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uID0gbmV3IHNwaW5lLlNrZWxldG9uKHNrZWxldG9uRGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9jbGlwcGVyID0gbmV3IHNwaW5lLlNrZWxldG9uQ2xpcHBpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RCb25lID0gdGhpcy5fc2tlbGV0b24uZ2V0Um9vdEJvbmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHNsb3RzIHZpc2libGUgcmFuZ2UuXG4gICAgICogISN6aCDorr7nva7pqqjpqrzmj5Lmp73lj6/op4bojIPlm7TjgIJcbiAgICAgKiBAbWV0aG9kIHNldFNsb3RzUmFuZ2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRTbG90SW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZW5kU2xvdEluZGV4XG4gICAgICovXG4gICAgc2V0U2xvdHNSYW5nZSAoc3RhcnRTbG90SW5kZXgsIGVuZFNsb3RJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiU2xvdHMgdmlzaWJsZSByYW5nZSBjYW4gbm90IGJlIG1vZGlmaWVkIGluIGNhY2hlZCBtb2RlLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0U2xvdEluZGV4ID0gc3RhcnRTbG90SW5kZXg7XG4gICAgICAgICAgICB0aGlzLl9lbmRTbG90SW5kZXggPSBlbmRTbG90SW5kZXg7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIGFuaW1hdGlvbiBzdGF0ZSBkYXRhLjxicj5cbiAgICAgKiBUaGUgcGFyYW1ldGVyIHR5cGUgaXMge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5BbmltYXRpb25TdGF0ZURhdGEuXG4gICAgICogISN6aCDorr7nva7liqjnlLvnirbmgIHmlbDmja7jgII8YnI+XG4gICAgICog5Y+C5pWw5pivIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uQW5pbWF0aW9uU3RhdGVEYXRh44CCXG4gICAgICogQG1ldGhvZCBzZXRBbmltYXRpb25TdGF0ZURhdGFcbiAgICAgKiBAcGFyYW0ge3NwLnNwaW5lLkFuaW1hdGlvblN0YXRlRGF0YX0gc3RhdGVEYXRhXG4gICAgICovXG4gICAgc2V0QW5pbWF0aW9uU3RhdGVEYXRhIChzdGF0ZURhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgY2Mud2FybihcIidzZXRBbmltYXRpb25TdGF0ZURhdGEnIGludGVyZmFjZSBjYW4gbm90IGJlIGludm9rZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gbmV3IHNwaW5lLkFuaW1hdGlvblN0YXRlKHN0YXRlRGF0YSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUucmVtb3ZlTGlzdGVuZXIodGhpcy5fbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0ZS5hZGRMaXN0ZW5lcih0aGlzLl9saXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICAvLyBJTVBMRU1FTlRcbiAgICBfX3ByZWxvYWQgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgRmxhZ3MgPSBjYy5PYmplY3QuRmxhZ3M7XG4gICAgICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSAoRmxhZ3MuSXNBbmNob3JMb2NrZWQgfCBGbGFncy5Jc1NpemVMb2NrZWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9yZWZyZXNoSW5zcGVjdG9yKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZC5fbmFtZSA9PT0gXCJERUJVR19EUkFXX05PREVcIiApIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVTa2VsZXRvbkRhdGEoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlRGVidWdEcmF3KCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVVzZVRpbnQoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQmF0Y2goKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEl0J3MgYmVzdCB0byBzZXQgY2FjaGUgbW9kZSBiZWZvcmUgc2V0IHByb3BlcnR5ICdkcmFnb25Bc3NldCcsIG9yIHdpbGwgd2FzdGUgc29tZSBjcHUgdGltZS5cbiAgICAgKiBJZiBzZXQgdGhlIG1vZGUgaW4gZWRpdG9yLCB0aGVuIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgb3JkZXIgcHJvYmxlbS5cbiAgICAgKiAhI3poIFxuICAgICAqIOiLpeaDs+WIh+aNoua4suafk+aooeW8j++8jOacgOWlveWcqOiuvue9ridkcmFnb25Bc3NldCfkuYvliY3vvIzlhYjorr7nva7lpb3muLLmn5PmqKHlvI/vvIzlkKbliJnmnInov5DooYzml7blvIDplIDjgIJcbiAgICAgKiDoi6XlnKjnvJbovpHkuK3orr7nva7muLLmn5PmqKHlvI/vvIzliJnml6DpnIDmi4Xlv4Porr7nva7mrKHluo/nmoTpl67popjjgIJcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIHNldEFuaW1hdGlvbkNhY2hlTW9kZVxuICAgICAqIEBwYXJhbSB7QW5pbWF0aW9uQ2FjaGVNb2RlfSBjYWNoZU1vZGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNrZWxldG9uLnNldEFuaW1hdGlvbkNhY2hlTW9kZShzcC5Ta2VsZXRvbi5BbmltYXRpb25DYWNoZU1vZGUuU0hBUkVEX0NBQ0hFKTtcbiAgICAgKi9cbiAgICBzZXRBbmltYXRpb25DYWNoZU1vZGUgKGNhY2hlTW9kZSkge1xuICAgICAgICBpZiAodGhpcy5fcHJlQ2FjaGVNb2RlICE9PSBjYWNoZU1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlTW9kZSA9IGNhY2hlTW9kZTtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNrZWxldG9uRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVXNlVGludCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gV2hldGhlciBpbiBjYWNoZWQgbW9kZS5cbiAgICAgKiAhI3poIOW9k+WJjeaYr+WQpuWkhOS6jue8k+WtmOaooeW8j+OAglxuICAgICAqIEBtZXRob2QgaXNBbmltYXRpb25DYWNoZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQW5pbWF0aW9uQ2FjaGVkICgpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5fY2FjaGVNb2RlICE9PSBBbmltYXRpb25DYWNoZU1vZGUuUkVBTFRJTUU7XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHJldHVybjtcblxuICAgICAgICBkdCAqPSB0aGlzLnRpbWVTY2FsZSAqIHNwLnRpbWVTY2FsZTtcblxuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG5cbiAgICAgICAgICAgIC8vIENhY2hlIG1vZGUgYW5kIGhhcyBhbmltYXRpb24gcXVldWUuXG4gICAgICAgICAgICBpZiAodGhpcy5faXNBbmlDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRpb25RdWV1ZS5sZW5ndGggPT09IDAgJiYgIXRoaXMuX2hlYWRBbmlJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZUNhY2hlID0gdGhpcy5fZnJhbWVDYWNoZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lQ2FjaGUgJiYgZnJhbWVDYWNoZS5pc0ludmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnJhbWVzID0gZnJhbWVDYWNoZS5mcmFtZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2hlYWRBbmlJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRBbmlJbmZvID0gdGhpcy5fYW5pbWF0aW9uUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYWNjVGltZSArPSBkdDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWNjVGltZSA+IHRoaXMuX2hlYWRBbmlJbmZvLmRlbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmlJbmZvID0gdGhpcy5faGVhZEFuaUluZm87XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRBbmlJbmZvID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBbmltYXRpb24gKDAsIGFuaUluZm8uYW5pbWF0aW9uTmFtZSwgYW5pSW5mby5sb29wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVDYWNoZShkdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSZWFsdGltZShkdCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2VtaXRDYWNoZUNvbXBsZXRlRXZlbnQgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuX2VuZEVudHJ5LmFuaW1hdGlvbi5uYW1lID0gdGhpcy5fYW5pbWF0aW9uTmFtZTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuY29tcGxldGUgJiYgdGhpcy5fbGlzdGVuZXIuY29tcGxldGUodGhpcy5fZW5kRW50cnkpO1xuICAgICAgICB0aGlzLl9saXN0ZW5lci5lbmQgJiYgdGhpcy5fbGlzdGVuZXIuZW5kKHRoaXMuX2VuZEVudHJ5KTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZUNhY2hlIChkdCkge1xuICAgICAgICBsZXQgZnJhbWVDYWNoZSA9IHRoaXMuX2ZyYW1lQ2FjaGU7XG4gICAgICAgIGlmICghZnJhbWVDYWNoZS5pc0luaXRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZyYW1lcyA9IGZyYW1lQ2FjaGUuZnJhbWVzO1xuICAgICAgICBsZXQgZnJhbWVUaW1lID0gU2tlbGV0b25DYWNoZS5GcmFtZVRpbWU7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIFN0YXJ0LCB0aGUgZXZlbnQgZGlmZnJlbnQgZnJvbSBkcmFnb25ib25lcyBpbm5lciBldmVudCxcbiAgICAgICAgLy8gSXQgaGFzIG5vIGV2ZW50IG9iamVjdC5cbiAgICAgICAgaWYgKHRoaXMuX2FjY1RpbWUgPT0gMCAmJiB0aGlzLl9wbGF5Q291bnQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRFbnRyeS5hbmltYXRpb24ubmFtZSA9IHRoaXMuX2FuaW1hdGlvbk5hbWU7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lciAmJiB0aGlzLl9saXN0ZW5lci5zdGFydCAmJiB0aGlzLl9saXN0ZW5lci5zdGFydCh0aGlzLl9zdGFydEVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FjY1RpbWUgKz0gZHQ7XG4gICAgICAgIGxldCBmcmFtZUlkeCA9IE1hdGguZmxvb3IodGhpcy5fYWNjVGltZSAvIGZyYW1lVGltZSk7XG4gICAgICAgIGlmICghZnJhbWVDYWNoZS5pc0NvbXBsZXRlZCkge1xuICAgICAgICAgICAgZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKGZyYW1lSWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcmFtZUNhY2hlLmlzQ29tcGxldGVkICYmIGZyYW1lSWR4ID49IGZyYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXlDb3VudCArKztcbiAgICAgICAgICAgIGlmICh0aGlzLl9wbGF5VGltZXMgPiAwICYmIHRoaXMuX3BsYXlDb3VudCA+PSB0aGlzLl9wbGF5VGltZXMpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXQgZnJhbWUgdG8gZW5kIGZyYW1lLlxuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gZnJhbWVzW2ZyYW1lcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hY2NUaW1lID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5Q291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzQW5pQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXRDYWNoZUNvbXBsZXRlRXZlbnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hY2NUaW1lID0gMDtcbiAgICAgICAgICAgIGZyYW1lSWR4ID0gMDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXRDYWNoZUNvbXBsZXRlRXZlbnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJGcmFtZSA9IGZyYW1lc1tmcmFtZUlkeF07XG4gICAgfSxcblxuICAgIF91cGRhdGVSZWFsdGltZSAoZHQpIHtcbiAgICAgICAgbGV0IHNrZWxldG9uID0gdGhpcy5fc2tlbGV0b247XG4gICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3N0YXRlO1xuICAgICAgICBpZiAoc2tlbGV0b24pIHtcbiAgICAgICAgICAgIHNrZWxldG9uLnVwZGF0ZShkdCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZS51cGRhdGUoZHQpO1xuICAgICAgICAgICAgICAgIHN0YXRlLmFwcGx5KHNrZWxldG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdmVydGV4IGVmZmVjdCBkZWxlZ2F0ZS5cbiAgICAgKiAhI3poIOiuvue9rumhtueCueWKqOeUu+S7o+eQhlxuICAgICAqIEBtZXRob2Qgc2V0VmVydGV4RWZmZWN0RGVsZWdhdGVcbiAgICAgKiBAcGFyYW0ge3NwLlZlcnRleEVmZmVjdERlbGVnYXRlfSBlZmZlY3REZWxlZ2F0ZVxuICAgICAqL1xuICAgIHNldFZlcnRleEVmZmVjdERlbGVnYXRlIChlZmZlY3REZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLl9lZmZlY3REZWxlZ2F0ZSA9IGVmZmVjdERlbGVnYXRlO1xuICAgIH0sXG5cbiAgICAvLyBSRU5ERVJFUlxuXG4gICAgLyoqXG4gICAgICogISNlbiBDb21wdXRlcyB0aGUgd29ybGQgU1JUIGZyb20gdGhlIGxvY2FsIFNSVCBmb3IgZWFjaCBib25lLlxuICAgICAqICEjemgg6YeN5paw5pu05paw5omA5pyJ6aqo6aq855qE5LiW55WMIFRyYW5zZm9ybe+8jFxuICAgICAqIOW9k+iOt+WPliBib25lIOeahOaVsOWAvOacquabtOaWsOaXtu+8jOWNs+WPr+S9v+eUqOivpeWHveaVsOi/m+ihjOabtOaWsOaVsOWAvOOAglxuICAgICAqIEBtZXRob2QgdXBkYXRlV29ybGRUcmFuc2Zvcm1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBib25lID0gc3BpbmUuZmluZEJvbmUoJ2hlYWQnKTtcbiAgICAgKiBjYy5sb2coYm9uZS53b3JsZFgpOyAvLyByZXR1cm4gMDtcbiAgICAgKiBzcGluZS51cGRhdGVXb3JsZFRyYW5zZm9ybSgpO1xuICAgICAqIGJvbmUgPSBzcGluZS5maW5kQm9uZSgnaGVhZCcpO1xuICAgICAqIGNjLmxvZyhib25lLndvcmxkWCk7IC8vIHJldHVybiAtMjMuMTI7XG4gICAgICovXG4gICAgdXBkYXRlV29ybGRUcmFuc2Zvcm0gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24udXBkYXRlV29ybGRUcmFuc2Zvcm0oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIGJvbmVzIGFuZCBzbG90cyB0byB0aGUgc2V0dXAgcG9zZS5cbiAgICAgKiAhI3poIOi/mOWOn+WIsOi1t+Wni+WKqOS9nFxuICAgICAqIEBtZXRob2Qgc2V0VG9TZXR1cFBvc2VcbiAgICAgKi9cbiAgICBzZXRUb1NldHVwUG9zZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0VG9TZXR1cFBvc2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgYm9uZXMgdG8gdGhlIHNldHVwIHBvc2UsXG4gICAgICogdXNpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBgQm9uZURhdGFgIGxpc3QgaW4gdGhlIGBTa2VsZXRvbkRhdGFgLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva4gYm9uZSDliLDotbflp4vliqjkvZxcbiAgICAgKiDkvb/nlKggU2tlbGV0b25EYXRhIOS4reeahCBCb25lRGF0YSDliJfooajkuK3nmoTlgLzjgIJcbiAgICAgKiBAbWV0aG9kIHNldEJvbmVzVG9TZXR1cFBvc2VcbiAgICAgKi9cbiAgICBzZXRCb25lc1RvU2V0dXBQb3NlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uKSB7XG4gICAgICAgICAgICB0aGlzLl9za2VsZXRvbi5zZXRCb25lc1RvU2V0dXBQb3NlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHNsb3RzIHRvIHRoZSBzZXR1cCBwb3NlLFxuICAgICAqIHVzaW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgYFNsb3REYXRhYCBsaXN0IGluIHRoZSBgU2tlbGV0b25EYXRhYC5cbiAgICAgKiAhI3poXG4gICAgICog6K6+572uIHNsb3Qg5Yiw6LW35aeL5Yqo5L2c44CCXG4gICAgICog5L2/55SoIFNrZWxldG9uRGF0YSDkuK3nmoQgU2xvdERhdGEg5YiX6KGo5Lit55qE5YC844CCXG4gICAgICogQG1ldGhvZCBzZXRTbG90c1RvU2V0dXBQb3NlXG4gICAgICovXG4gICAgc2V0U2xvdHNUb1NldHVwUG9zZSAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0U2xvdHNUb1NldHVwUG9zZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBVcGRhdGluZyBhbiBhbmltYXRpb24gY2FjaGUgdG8gY2FsY3VsYXRlIGFsbCBmcmFtZSBkYXRhIGluIHRoZSBhbmltYXRpb24gaXMgYSBjb3N0IGluIFxuICAgICAqIHBlcmZvcm1hbmNlIGR1ZSB0byBjYWxjdWxhdGluZyBhbGwgZGF0YSBpbiBhIHNpbmdsZSBmcmFtZS5cbiAgICAgKiBUbyB1cGRhdGUgdGhlIGNhY2hlLCB1c2UgdGhlIGludmFsaWRBbmltYXRpb25DYWNoZSBtZXRob2Qgd2l0aCBoaWdoIHBlcmZvcm1hbmNlLlxuICAgICAqICEjemhcbiAgICAgKiDmm7TmlrDmn5DkuKrliqjnlLvnvJPlrZgsIOmihOiuoeeul+WKqOeUu+S4reaJgOacieW4p+aVsOaNru+8jOeUseS6juWcqOWNleW4p+iuoeeul+aJgOacieaVsOaNru+8jOaJgOS7pei+g+a2iOiAl+aAp+iDveOAglxuICAgICAqIOiLpeaDs+abtOaWsOe8k+WtmO+8jOWPr+S9v+eUqCBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUg5pa55rOV77yM5YW35pyJ6L6D6auY5oCn6IO944CCXG4gICAgICogQG1ldGhvZCB1cGRhdGVBbmltYXRpb25DYWNoZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhbmltTmFtZVxuICAgICAqL1xuICAgIHVwZGF0ZUFuaW1hdGlvbkNhY2hlIChhbmltTmFtZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xuICAgICAgICBsZXQgdXVpZCA9IHRoaXMuc2tlbGV0b25EYXRhLl91dWlkO1xuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b25DYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZS51cGRhdGVBbmltYXRpb25DYWNoZSh1dWlkLCBhbmltTmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEludmFsaWRhdGVzIHRoZSBhbmltYXRpb24gY2FjaGUsIHdoaWNoIGlzIHRoZW4gcmVjb21wdXRlZCBvbiBlYWNoIGZyYW1lLi5cbiAgICAgKiAhI3poXG4gICAgICog5L2/5Yqo55S757yT5a2Y5aSx5pWI77yM5LmL5ZCO5Lya5Zyo5q+P5bin6YeN5paw6K6h566X44CCXG4gICAgICogQG1ldGhvZCBpbnZhbGlkQW5pbWF0aW9uQ2FjaGVcbiAgICAgKi9cbiAgICBpbnZhbGlkQW5pbWF0aW9uQ2FjaGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b25DYWNoZSkge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b25DYWNoZS5pbnZhbGlkQW5pbWF0aW9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBGaW5kcyBhIGJvbmUgYnkgbmFtZS5cbiAgICAgKiBUaGlzIGRvZXMgYSBzdHJpbmcgY29tcGFyaXNvbiBmb3IgZXZlcnkgYm9uZS48YnI+XG4gICAgICogUmV0dXJucyBhIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uQm9uZSBvYmplY3QuXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+WQjeensOafpeaJviBib25l44CCXG4gICAgICog6L+Z6YeM5a+55q+P5LiqIGJvbmUg55qE5ZCN56ew6L+b6KGM5LqG5a+55q+U44CCPGJyPlxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LkJvbmUg5a+56LGh44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGZpbmRCb25lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGJvbmVOYW1lXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuQm9uZX1cbiAgICAgKi9cbiAgICBmaW5kQm9uZSAoYm9uZU5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tlbGV0b24uZmluZEJvbmUoYm9uZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRmluZHMgYSBzbG90IGJ5IG5hbWUuIFRoaXMgZG9lcyBhIHN0cmluZyBjb21wYXJpc29uIGZvciBldmVyeSBzbG90Ljxicj5cbiAgICAgKiBSZXR1cm5zIGEge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5TbG90IG9iamVjdC5cbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+H5ZCN56ew5p+l5om+IHNsb3TjgILov5nph4zlr7nmr4/kuKogc2xvdCDnmoTlkI3np7Dov5vooYzkuobmr5TovoPjgII8YnI+XG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uU2xvdCDlr7nosaHjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZmluZFNsb3RcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2xvdE5hbWVcbiAgICAgKiBAcmV0dXJuIHtzcC5zcGluZS5TbG90fVxuICAgICAqL1xuICAgIGZpbmRTbG90IChzbG90TmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9za2VsZXRvbi5maW5kU2xvdChzbG90TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBGaW5kcyBhIHNraW4gYnkgbmFtZSBhbmQgbWFrZXMgaXQgdGhlIGFjdGl2ZSBza2luLlxuICAgICAqIFRoaXMgZG9lcyBhIHN0cmluZyBjb21wYXJpc29uIGZvciBldmVyeSBza2luLjxicj5cbiAgICAgKiBOb3RlIHRoYXQgc2V0dGluZyB0aGUgc2tpbiBkb2VzIG5vdCBjaGFuZ2Ugd2hpY2ggYXR0YWNobWVudHMgYXJlIHZpc2libGUuPGJyPlxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlNraW4gb2JqZWN0LlxuICAgICAqICEjemhcbiAgICAgKiDmjInlkI3np7Dmn6Xmib7nmq7ogqTvvIzmv4DmtLvor6Xnmq7ogqTjgILov5nph4zlr7nmr4/kuKrnmq7ogqTnmoTlkI3np7Dov5vooYzkuobmr5TovoPjgII8YnI+XG4gICAgICog5rOo5oSP77ya6K6+572u55qu6IKk5LiN5Lya5pS55Y+YIGF0dGFjaG1lbnQg55qE5Y+v6KeB5oCn44CCPGJyPlxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlNraW4g5a+56LGh44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNldFNraW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2tpbk5hbWVcbiAgICAgKi9cbiAgICBzZXRTa2luIChza2luTmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NrZWxldG9uLnNldFNraW5CeU5hbWUoc2tpbk5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0U2xvdHNUb1NldHVwUG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBhdHRhY2htZW50IGZvciB0aGUgc2xvdCBhbmQgYXR0YWNobWVudCBuYW1lLlxuICAgICAqIFRoZSBza2VsZXRvbiBsb29rcyBmaXJzdCBpbiBpdHMgc2tpbiwgdGhlbiBpbiB0aGUgc2tlbGV0b24gZGF0YeKAmXMgZGVmYXVsdCBza2luLjxicj5cbiAgICAgKiBSZXR1cm5zIGEge3sjY3Jvc3NMaW5rTW9kdWxlIFwic3Auc3BpbmVcIn19c3Auc3BpbmV7ey9jcm9zc0xpbmtNb2R1bGV9fS5BdHRhY2htZW50IG9iamVjdC5cbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+HIHNsb3Qg5ZKMIGF0dGFjaG1lbnQg55qE5ZCN56ew6I635Y+WIGF0dGFjaG1lbnTjgIJTa2VsZXRvbiDkvJjlhYjmn6Xmib7lroPnmoTnmq7ogqTvvIznhLblkI7miY3mmK8gU2tlbGV0b24gRGF0YSDkuK3pu5jorqTnmoTnmq7ogqTjgII8YnI+XG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uQXR0YWNobWVudCDlr7nosaHjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0QXR0YWNobWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzbG90TmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRhY2htZW50TmFtZVxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLkF0dGFjaG1lbnR9XG4gICAgICovXG4gICAgZ2V0QXR0YWNobWVudCAoc2xvdE5hbWUsIGF0dGFjaG1lbnROYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NrZWxldG9uLmdldEF0dGFjaG1lbnRCeU5hbWUoc2xvdE5hbWUsIGF0dGFjaG1lbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIGF0dGFjaG1lbnQgZm9yIHRoZSBzbG90IGFuZCBhdHRhY2htZW50IG5hbWUuXG4gICAgICogVGhlIHNrZWxldG9uIGxvb2tzIGZpcnN0IGluIGl0cyBza2luLCB0aGVuIGluIHRoZSBza2VsZXRvbiBkYXRh4oCZcyBkZWZhdWx0IHNraW4uXG4gICAgICogISN6aFxuICAgICAqIOmAmui/hyBzbG90IOWSjCBhdHRhY2htZW50IOeahOWQjeWtl+adpeiuvue9riBhdHRhY2htZW5044CCXG4gICAgICogU2tlbGV0b24g5LyY5YWI5p+l5om+5a6D55qE55qu6IKk77yM54S25ZCO5omN5pivIFNrZWxldG9uIERhdGEg5Lit6buY6K6k55qE55qu6IKk44CCXG4gICAgICogQG1ldGhvZCBzZXRBdHRhY2htZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHNsb3ROYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGF0dGFjaG1lbnROYW1lXG4gICAgICovXG4gICAgc2V0QXR0YWNobWVudCAoc2xvdE5hbWUsIGF0dGFjaG1lbnROYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2tlbGV0b24uc2V0QXR0YWNobWVudChzbG90TmFtZSwgYXR0YWNobWVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW52YWxpZEFuaW1hdGlvbkNhY2hlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogUmV0dXJuIHRoZSByZW5kZXJlciBvZiBhdHRhY2htZW50LlxuICAgICogQG1ldGhvZCBnZXRUZXh0dXJlQXRsYXNcbiAgICAqIEBwYXJhbSB7c3Auc3BpbmUuUmVnaW9uQXR0YWNobWVudHxzcGluZS5Cb3VuZGluZ0JveEF0dGFjaG1lbnR9IHJlZ2lvbkF0dGFjaG1lbnRcbiAgICAqIEByZXR1cm4ge3NwLnNwaW5lLlRleHR1cmVBdGxhc1JlZ2lvbn1cbiAgICAqL1xuICAgIGdldFRleHR1cmVBdGxhcyAocmVnaW9uQXR0YWNobWVudCkge1xuICAgICAgICByZXR1cm4gcmVnaW9uQXR0YWNobWVudC5yZWdpb247XG4gICAgfSxcblxuICAgIC8vIEFOSU1BVElPTlxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBNaXggYXBwbGllcyBhbGwga2V5ZnJhbWUgdmFsdWVzLFxuICAgICAqIGludGVycG9sYXRlZCBmb3IgdGhlIHNwZWNpZmllZCB0aW1lIGFuZCBtaXhlZCB3aXRoIHRoZSBjdXJyZW50IHZhbHVlcy5cbiAgICAgKiAhI3poIOS4uuaJgOacieWFs+mUruW4p+iuvuWumua3t+WQiOWPiua3t+WQiOaXtumXtO+8iOS7juW9k+WJjeWAvOW8gOWni+W3ruWAvO+8ieOAglxuICAgICAqIEBtZXRob2Qgc2V0TWl4XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZyb21BbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdG9BbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZHVyYXRpb25cbiAgICAgKi9cbiAgICBzZXRNaXggKGZyb21BbmltYXRpb24sIHRvQW5pbWF0aW9uLCBkdXJhdGlvbikge1xuICAgICAgICBpZiAodGhpcy5fc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlLmRhdGEuc2V0TWl4KGZyb21BbmltYXRpb24sIHRvQW5pbWF0aW9uLCBkdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGN1cnJlbnQgYW5pbWF0aW9uLiBBbnkgcXVldWVkIGFuaW1hdGlvbnMgYXJlIGNsZWFyZWQuPGJyPlxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlRyYWNrRW50cnkgb2JqZWN0LlxuICAgICAqICEjemgg6K6+572u5b2T5YmN5Yqo55S744CC6Zif5YiX5Lit55qE5Lu75L2V55qE5Yqo55S75bCG6KKr5riF6Zmk44CCPGJyPlxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlRyYWNrRW50cnkg5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBzZXRBbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHJhY2tJbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuVHJhY2tFbnRyeX1cbiAgICAgKi9cbiAgICBzZXRBbmltYXRpb24gKHRyYWNrSW5kZXgsIG5hbWUsIGxvb3ApIHtcblxuICAgICAgICB0aGlzLl9wbGF5VGltZXMgPSBsb29wID8gMCA6IDE7XG4gICAgICAgIHRoaXMuX2FuaW1hdGlvbk5hbWUgPSBuYW1lO1xuXG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgIGlmICh0cmFja0luZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcIlRyYWNrIGluZGV4IGNhbiBub3QgZ3JlYXRlciB0aGFuIDAgaW4gY2FjaGVkIG1vZGUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9za2VsZXRvbkNhY2hlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGxldCBjYWNoZSA9IHRoaXMuX3NrZWxldG9uQ2FjaGUuZ2V0QW5pbWF0aW9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQsIG5hbWUpO1xuICAgICAgICAgICAgaWYgKCFjYWNoZSkge1xuICAgICAgICAgICAgICAgIGNhY2hlID0gdGhpcy5fc2tlbGV0b25DYWNoZS5pbml0QW5pbWF0aW9uQ2FjaGUodGhpcy5za2VsZXRvbkRhdGEuX3V1aWQsIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNBbmlDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY1RpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXlDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVDYWNoZSA9IGNhY2hlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmF0dGFjaFV0aWwuX2hhc0F0dGFjaGVkTm9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ2FjaGUuZW5hYmxlQ2FjaGVBdHRhY2hlZEluZm8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWVDYWNoZS51cGRhdGVUb0ZyYW1lKDApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N1ckZyYW1lID0gdGhpcy5fZnJhbWVDYWNoZS5mcmFtZXNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2tlbGV0b24pIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0aW9uID0gdGhpcy5fc2tlbGV0b24uZGF0YS5maW5kQW5pbWF0aW9uKG5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZ0lEKDc1MDksIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMuX3N0YXRlLnNldEFuaW1hdGlvbldpdGgodHJhY2tJbmRleCwgYW5pbWF0aW9uLCBsb29wKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5hcHBseSh0aGlzLl9za2VsZXRvbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIGFuIGFuaW1hdGlvbiB0byBiZSBwbGF5ZWQgZGVsYXkgc2Vjb25kcyBhZnRlciB0aGUgY3VycmVudCBvciBsYXN0IHF1ZXVlZCBhbmltYXRpb24uPGJyPlxuICAgICAqIFJldHVybnMgYSB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlRyYWNrRW50cnkgb2JqZWN0LlxuICAgICAqICEjemgg5re75Yqg5LiA5Liq5Yqo55S75Yiw5Yqo55S76Zif5YiX5bC+6YOo77yM6L+Y5Y+v5Lul5bu26L+f5oyH5a6a55qE56eS5pWw44CCPGJyPlxuICAgICAqIOi/lOWbnuS4gOS4qiB7eyNjcm9zc0xpbmtNb2R1bGUgXCJzcC5zcGluZVwifX1zcC5zcGluZXt7L2Nyb3NzTGlua01vZHVsZX19LlRyYWNrRW50cnkg5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBhZGRBbmltYXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdHJhY2tJbmRleFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBsb29wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkZWxheT0wXVxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLlRyYWNrRW50cnl9XG4gICAgICovXG4gICAgYWRkQW5pbWF0aW9uICh0cmFja0luZGV4LCBuYW1lLCBsb29wLCBkZWxheSkge1xuICAgICAgICBkZWxheSA9IGRlbGF5IHx8IDA7XG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgIGlmICh0cmFja0luZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcIlRyYWNrIGluZGV4IGNhbiBub3QgZ3JlYXRlciB0aGFuIDAgaW4gY2FjaGVkIG1vZGUuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uUXVldWUucHVzaCh7YW5pbWF0aW9uTmFtZSA6IG5hbWUsIGxvb3A6IGxvb3AsIGRlbGF5IDogZGVsYXl9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9za2VsZXRvbikge1xuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLl9za2VsZXRvbi5kYXRhLmZpbmRBbmltYXRpb24obmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFhbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2MubG9nSUQoNzUxMCwgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGUuYWRkQW5pbWF0aW9uV2l0aCh0cmFja0luZGV4LCBhbmltYXRpb24sIGxvb3AsIGRlbGF5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGaW5kIGFuaW1hdGlvbiB3aXRoIHNwZWNpZmllZCBuYW1lLlxuICAgICAqICEjemgg5p+l5om+5oyH5a6a5ZCN56ew55qE5Yqo55S7XG4gICAgICogQG1ldGhvZCBmaW5kQW5pbWF0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7c3Auc3BpbmUuQW5pbWF0aW9ufVxuICAgICAqL1xuICAgIGZpbmRBbmltYXRpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NrZWxldG9uKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tlbGV0b24uZGF0YS5maW5kQW5pbWF0aW9uKG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdHJhY2sgZW50cnkgYnkgdHJhY2tJbmRleC48YnI+XG4gICAgICogUmV0dXJucyBhIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uVHJhY2tFbnRyeSBvYmplY3QuXG4gICAgICogISN6aCDpgJrov4cgdHJhY2sg57Si5byV6I635Y+WIFRyYWNrRW50cnnjgII8YnI+XG4gICAgICog6L+U5Zue5LiA5LiqIHt7I2Nyb3NzTGlua01vZHVsZSBcInNwLnNwaW5lXCJ9fXNwLnNwaW5le3svY3Jvc3NMaW5rTW9kdWxlfX0uVHJhY2tFbnRyeSDlr7nosaHjgIJcbiAgICAgKiBAbWV0aG9kIGdldEN1cnJlbnRcbiAgICAgKiBAcGFyYW0gdHJhY2tJbmRleFxuICAgICAqIEByZXR1cm4ge3NwLnNwaW5lLlRyYWNrRW50cnl9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudCAodHJhY2tJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5pc0FuaW1hdGlvbkNhY2hlZCgpKSB7XG4gICAgICAgICAgICBjYy53YXJuKFwiJ2dldEN1cnJlbnQnIGludGVyZmFjZSBjYW4gbm90IGJlIGludm9rZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlLmdldEN1cnJlbnQodHJhY2tJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2xlYXJzIGFsbCB0cmFja3Mgb2YgYW5pbWF0aW9uIHN0YXRlLlxuICAgICAqICEjemgg5riF6Zmk5omA5pyJIHRyYWNrIOeahOWKqOeUu+eKtuaAgeOAglxuICAgICAqIEBtZXRob2QgY2xlYXJUcmFja3NcbiAgICAgKi9cbiAgICBjbGVhclRyYWNrcyAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQW5pbWF0aW9uQ2FjaGVkKCkpIHtcbiAgICAgICAgICAgIGNjLndhcm4oXCInY2xlYXJUcmFja3MnIGludGVyZmFjZSBjYW4gbm90IGJlIGludm9rZWQgaW4gY2FjaGVkIG1vZGUuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUuY2xlYXJUcmFja3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENsZWFycyB0cmFjayBvZiBhbmltYXRpb24gc3RhdGUgYnkgdHJhY2tJbmRleC5cbiAgICAgKiAhI3poIOa4hemZpOWHuuaMh+WumiB0cmFjayDnmoTliqjnlLvnirbmgIHjgIJcbiAgICAgKiBAbWV0aG9kIGNsZWFyVHJhY2tcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdHJhY2tJbmRleFxuICAgICAqL1xuICAgIGNsZWFyVHJhY2sgKHRyYWNrSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgY2Mud2FybihcIidjbGVhclRyYWNrJyBpbnRlcmZhY2UgY2FuIG5vdCBiZSBpbnZva2VkIGluIGNhY2hlZCBtb2RlLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLmNsZWFyVHJhY2sodHJhY2tJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS51cGRhdGUoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBzdGFydCBldmVudCBsaXN0ZW5lci5cbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruW8gOWni+aSreaUvuWKqOeUu+eahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0U3RhcnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0U3RhcnRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuc3RhcnQgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGludGVycnVwdCBldmVudCBsaXN0ZW5lci5cbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruWKqOeUu+iiq+aJk+aWreeahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0SW50ZXJydXB0TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldEludGVycnVwdExpc3RlbmVyIChsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9lbnN1cmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLl9saXN0ZW5lci5pbnRlcnJ1cHQgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGVuZCBldmVudCBsaXN0ZW5lci5cbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruWKqOeUu+aSreaUvuWujOWQjueahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0RW5kTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHNldEVuZExpc3RlbmVyIChsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9lbnN1cmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLl9saXN0ZW5lci5lbmQgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGRpc3Bvc2UgZXZlbnQgbGlzdGVuZXIuXG4gICAgICogISN6aCDnlKjmnaXorr7nva7liqjnlLvlsIbooqvplIDmr4HnmoTkuovku7bnm5HlkKzjgIJcbiAgICAgKiBAbWV0aG9kIHNldERpc3Bvc2VMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0RGlzcG9zZUxpc3RlbmVyIChsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9lbnN1cmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLl9saXN0ZW5lci5kaXNwb3NlID0gbGlzdGVuZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBjb21wbGV0ZSBldmVudCBsaXN0ZW5lci5cbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruWKqOeUu+aSreaUvuS4gOasoeW+queOr+e7k+adn+WQjueahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0Q29tcGxldGVMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0Q29tcGxldGVMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuY29tcGxldGUgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGFuaW1hdGlvbiBldmVudCBsaXN0ZW5lci5cbiAgICAgKiAhI3poIOeUqOadpeiuvue9ruWKqOeUu+aSreaUvui/h+eoi+S4reW4p+S6i+S7tueahOebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0RXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0RXZlbnRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fZW5zdXJlTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXIuZXZlbnQgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIHN0YXJ0IGV2ZW50IGxpc3RlbmVyIGZvciBzcGVjaWZpZWQgVHJhY2tFbnRyeS5cbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+W8gOWni+aSreaUvueahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0VHJhY2tTdGFydExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0VHJhY2tTdGFydExpc3RlbmVyIChlbnRyeSwgbGlzdGVuZXIpIHtcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLnN0YXJ0ID0gbGlzdGVuZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBpbnRlcnJ1cHQgZXZlbnQgbGlzdGVuZXIgZm9yIHNwZWNpZmllZCBUcmFja0VudHJ5LlxuICAgICAqICEjemgg55So5p2l5Li65oyH5a6a55qEIFRyYWNrRW50cnkg6K6+572u5Yqo55S76KKr5omT5pat55qE5LqL5Lu255uR5ZCs44CCXG4gICAgICogQG1ldGhvZCBzZXRUcmFja0ludGVycnVwdExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0VHJhY2tJbnRlcnJ1cHRMaXN0ZW5lciAoZW50cnksIGxpc3RlbmVyKSB7XG4gICAgICAgIFRyYWNrRW50cnlMaXN0ZW5lcnMuZ2V0TGlzdGVuZXJzKGVudHJ5KS5pbnRlcnJ1cHQgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGVuZCBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXG4gICAgICogISN6aCDnlKjmnaXkuLrmjIflrprnmoQgVHJhY2tFbnRyeSDorr7nva7liqjnlLvmkq3mlL7nu5PmnZ/nmoTkuovku7bnm5HlkKzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRyYWNrRW5kTGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge3NwLnNwaW5lLlRyYWNrRW50cnl9IGVudHJ5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBzZXRUcmFja0VuZExpc3RlbmVyIChlbnRyeSwgbGlzdGVuZXIpIHtcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLmVuZCA9IGxpc3RlbmVyO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB0aGUgZGlzcG9zZSBldmVudCBsaXN0ZW5lciBmb3Igc3BlY2lmaWVkIFRyYWNrRW50cnkuXG4gICAgICogISN6aCDnlKjmnaXkuLrmjIflrprnmoQgVHJhY2tFbnRyeSDorr7nva7liqjnlLvljbPlsIbooqvplIDmr4HnmoTkuovku7bnm5HlkKzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRyYWNrRGlzcG9zZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0VHJhY2tEaXNwb3NlTGlzdGVuZXIoZW50cnksIGxpc3RlbmVyKXtcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLmRpc3Bvc2UgPSBsaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGNvbXBsZXRlIGV2ZW50IGxpc3RlbmVyIGZvciBzcGVjaWZpZWQgVHJhY2tFbnRyeS5cbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+S4gOasoeW+queOr+aSreaUvue7k+adn+eahOS6i+S7tuebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0VHJhY2tDb21wbGV0ZUxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBsaXN0ZW5lci5lbnRyeVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsaXN0ZW5lci5sb29wQ291bnRcbiAgICAgKi9cbiAgICBzZXRUcmFja0NvbXBsZXRlTGlzdGVuZXIgKGVudHJ5LCBsaXN0ZW5lcikge1xuICAgICAgICBUcmFja0VudHJ5TGlzdGVuZXJzLmdldExpc3RlbmVycyhlbnRyeSkuY29tcGxldGUgPSBmdW5jdGlvbiAodHJhY2tFbnRyeSkge1xuICAgICAgICAgICAgdmFyIGxvb3BDb3VudCA9IE1hdGguZmxvb3IodHJhY2tFbnRyeS50cmFja1RpbWUgLyB0cmFja0VudHJ5LmFuaW1hdGlvbkVuZCk7IFxuICAgICAgICAgICAgbGlzdGVuZXIodHJhY2tFbnRyeSwgbG9vcENvdW50KTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGV2ZW50IGxpc3RlbmVyIGZvciBzcGVjaWZpZWQgVHJhY2tFbnRyeS5cbiAgICAgKiAhI3poIOeUqOadpeS4uuaMh+WumueahCBUcmFja0VudHJ5IOiuvue9ruWKqOeUu+W4p+S6i+S7tueahOebkeWQrOOAglxuICAgICAqIEBtZXRob2Qgc2V0VHJhY2tFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtzcC5zcGluZS5UcmFja0VudHJ5fSBlbnRyeVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAgICovXG4gICAgc2V0VHJhY2tFdmVudExpc3RlbmVyIChlbnRyeSwgbGlzdGVuZXIpIHtcbiAgICAgICAgVHJhY2tFbnRyeUxpc3RlbmVycy5nZXRMaXN0ZW5lcnMoZW50cnkpLmV2ZW50ID0gbGlzdGVuZXI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IHRoZSBhbmltYXRpb24gc3RhdGUgb2JqZWN0XG4gICAgICogISN6aCDojrflj5bliqjnlLvnirbmgIFcbiAgICAgKiBAbWV0aG9kIGdldFN0YXRlXG4gICAgICogQHJldHVybiB7c3Auc3BpbmUuQW5pbWF0aW9uU3RhdGV9IHN0YXRlXG4gICAgICovXG4gICAgZ2V0U3RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSBhbmltYXRpb24gbGlzdCBmb3IgZWRpdG9yXG4gICAgX3VwZGF0ZUFuaW1FbnVtOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYW5pbUVudW07XG4gICAgICAgIGlmICh0aGlzLnNrZWxldG9uRGF0YSkge1xuICAgICAgICAgICAgYW5pbUVudW0gPSB0aGlzLnNrZWxldG9uRGF0YS5nZXRBbmltc0VudW0oKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjaGFuZ2UgZW51bVxuICAgICAgICBzZXRFbnVtQXR0cih0aGlzLCAnX2FuaW1hdGlvbkluZGV4JywgYW5pbUVudW0gfHwgRGVmYXVsdEFuaW1zRW51bSk7XG4gICAgfSxcbiAgICAvLyB1cGRhdGUgc2tpbiBsaXN0IGZvciBlZGl0b3JcbiAgICBfdXBkYXRlU2tpbkVudW06IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBza2luRW51bTtcbiAgICAgICAgaWYgKHRoaXMuc2tlbGV0b25EYXRhKSB7XG4gICAgICAgICAgICBza2luRW51bSA9IHRoaXMuc2tlbGV0b25EYXRhLmdldFNraW5zRW51bSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNoYW5nZSBlbnVtXG4gICAgICAgIHNldEVudW1BdHRyKHRoaXMsICdfZGVmYXVsdFNraW5JbmRleCcsIHNraW5FbnVtIHx8IERlZmF1bHRTa2luc0VudW0pO1xuICAgIH0sXG5cbiAgICBfZW5zdXJlTGlzdGVuZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lciA9IG5ldyBUcmFja0VudHJ5TGlzdGVuZXJzKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5hZGRMaXN0ZW5lcih0aGlzLl9saXN0ZW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZGF0ZVNrZWxldG9uRGF0YSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5za2VsZXRvbkRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNrZWxldG9uRGF0YS5nZXRSdW50aW1lRGF0YSgpO1xuICAgICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVJlbmRlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zZXRTa2VsZXRvbkRhdGEoZGF0YSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0QW5pbWF0aW9uU3RhdGVEYXRhKG5ldyBzcGluZS5BbmltYXRpb25TdGF0ZURhdGEodGhpcy5fc2tlbGV0b24uZGF0YSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0U2tpbiAmJiB0aGlzLnNldFNraW4odGhpcy5kZWZhdWx0U2tpbik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNjLndhcm4oZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYXR0YWNoVXRpbC5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLmF0dGFjaFV0aWwuX2Fzc29jaWF0ZUF0dGFjaGVkTm9kZSgpO1xuICAgICAgICB0aGlzLl9wcmVDYWNoZU1vZGUgPSB0aGlzLl9jYWNoZU1vZGU7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gdGhpcy5kZWZhdWx0QW5pbWF0aW9uO1xuICAgIH0sXG5cbiAgICBfcmVmcmVzaEluc3BlY3RvciAoKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBpbnNwZWN0b3JcbiAgICAgICAgdGhpcy5fdXBkYXRlQW5pbUVudW0oKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU2tpbkVudW0oKTtcbiAgICAgICAgRWRpdG9yLlV0aWxzLnJlZnJlc2hTZWxlY3RlZEluc3BlY3Rvcignbm9kZScsIHRoaXMubm9kZS51dWlkKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZURlYnVnRHJhdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5kZWJ1Z0JvbmVzIHx8IHRoaXMuZGVidWdTbG90cykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9kZWJ1Z1JlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRlYnVnRHJhd05vZGUgPSBuZXcgY2MuUHJpdmF0ZU5vZGUoKTtcbiAgICAgICAgICAgICAgICBkZWJ1Z0RyYXdOb2RlLm5hbWUgPSAnREVCVUdfRFJBV19OT0RFJztcbiAgICAgICAgICAgICAgICBsZXQgZGVidWdEcmF3ID0gZGVidWdEcmF3Tm9kZS5hZGRDb21wb25lbnQoR3JhcGhpY3MpO1xuICAgICAgICAgICAgICAgIGRlYnVnRHJhdy5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgIGRlYnVnRHJhdy5zdHJva2VDb2xvciA9IGNjLmNvbG9yKDI1NSwgMCwgMCwgMjU1KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1Z1JlbmRlcmVyID0gZGVidWdEcmF3O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z1JlbmRlcmVyLm5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRpb25DYWNoZWQoKSkge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJEZWJ1ZyBib25lcyBvciBzbG90cyBpcyBpbnZhbGlkIGluIGNhY2hlZCBtb2RlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlYnVnUmVuZGVyZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnUmVuZGVyZXIubm9kZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNwLlNrZWxldG9uO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=