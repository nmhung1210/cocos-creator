
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCSprite.js';
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
var misc = require('../utils/misc');

var NodeEvent = require('../CCNode').EventType;

var RenderComponent = require('./CCRenderComponent');

var BlendFunc = require('../utils/blend-func');
/**
 * !#en Enum for sprite type.
 * !#zh Sprite 类型
 * @enum Sprite.Type
 */


var SpriteType = cc.Enum({
  /**
   * !#en The simple type.
   * !#zh 普通类型
   * @property {Number} SIMPLE
   */
  SIMPLE: 0,

  /**
   * !#en The sliced type.
   * !#zh 切片（九宫格）类型
   * @property {Number} SLICED
   */
  SLICED: 1,

  /**
   * !#en The tiled type.
   * !#zh 平铺类型
   * @property {Number} TILED
   */
  TILED: 2,

  /**
   * !#en The filled type.
   * !#zh 填充类型
   * @property {Number} FILLED
   */
  FILLED: 3,

  /**
   * !#en The mesh type.
   * !#zh 以 Mesh 三角形组成的类型
   * @property {Number} MESH
   */
  MESH: 4
});
/**
 * !#en Enum for fill type.
 * !#zh 填充类型
 * @enum Sprite.FillType
 */

var FillType = cc.Enum({
  /**
   * !#en The horizontal fill.
   * !#zh 水平方向填充
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 0,

  /**
   * !#en The vertical fill.
   * !#zh 垂直方向填充
   * @property {Number} VERTICAL
   */
  VERTICAL: 1,

  /**
   * !#en The radial fill.
   * !#zh 径向填充
   * @property {Number} RADIAL
   */
  RADIAL: 2
});
/**
 * !#en Sprite Size can track trimmed size, raw size or none.
 * !#zh 精灵尺寸调整模式
 * @enum Sprite.SizeMode
 */

var SizeMode = cc.Enum({
  /**
   * !#en Use the customized node size.
   * !#zh 使用节点预设的尺寸
   * @property {Number} CUSTOM
   */
  CUSTOM: 0,

  /**
   * !#en Match the trimmed size of the sprite frame automatically.
   * !#zh 自动适配为精灵裁剪后的尺寸
   * @property {Number} TRIMMED
   */
  TRIMMED: 1,

  /**
   * !#en Match the raw size of the sprite frame automatically.
   * !#zh 自动适配为精灵原图尺寸
   * @property {Number} RAW
   */
  RAW: 2
});
/**
 * !#en Sprite state can choice the normal or grayscale.
 * !#zh 精灵颜色通道模式。
 * @enum Sprite.State
 * @deprecated
 */

var State = cc.Enum({
  /**
   * !#en The normal state
   * !#zh 正常状态
   * @property {Number} NORMAL
   */
  NORMAL: 0,

  /**
   * !#en The gray state, all color will be modified to grayscale value.
   * !#zh 灰色状态，所有颜色会被转换成灰度值
   * @property {Number} GRAY
   */
  GRAY: 1
});
/**
 * !#en Renders a sprite in the scene.
 * !#zh 该组件用于在场景中渲染精灵。
 * @class Sprite
 * @extends RenderComponent
 * @uses BlendFunc
 * @example
 *  // Create a new node and add sprite components.
 *  var node = new cc.Node("New Sprite");
 *  var sprite = node.addComponent(cc.Sprite);
 *  node.parent = this.node;
 */

var Sprite = cc.Class({
  name: 'cc.Sprite',
  "extends": RenderComponent,
  mixins: [BlendFunc],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/Sprite',
    help: 'i18n:COMPONENT.help_url.sprite',
    inspector: 'packages://inspector/inspectors/comps/sprite.js'
  },
  properties: {
    _spriteFrame: {
      "default": null,
      type: cc.SpriteFrame
    },
    _type: SpriteType.SIMPLE,
    _sizeMode: SizeMode.TRIMMED,
    _fillType: 0,
    _fillCenter: cc.v2(0, 0),
    _fillStart: 0,
    _fillRange: 0,
    _isTrimmedMode: true,
    _atlas: {
      "default": null,
      type: cc.SpriteAtlas,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.atlas',
      editorOnly: true,
      visible: true,
      animatable: false
    },

    /**
     * !#en The sprite frame of the sprite.
     * !#zh 精灵的精灵帧
     * @property spriteFrame
     * @type {SpriteFrame}
     * @example
     * sprite.spriteFrame = newSpriteFrame;
     */
    spriteFrame: {
      get: function get() {
        return this._spriteFrame;
      },
      set: function set(value, force) {
        var lastSprite = this._spriteFrame;

        if (CC_EDITOR) {
          if (!force && (lastSprite && lastSprite._uuid) === (value && value._uuid)) {
            return;
          }
        } else {
          if (lastSprite === value) {
            return;
          }
        }

        this._spriteFrame = value;

        this._applySpriteFrame(lastSprite);

        if (CC_EDITOR) {
          this.node.emit('spriteframe-changed', this);
        }
      },
      type: cc.SpriteFrame
    },

    /**
     * !#en The sprite render type.
     * !#zh 精灵渲染类型
     * @property type
     * @type {Sprite.Type}
     * @example
     * sprite.type = cc.Sprite.Type.SIMPLE;
     */
    type: {
      get: function get() {
        return this._type;
      },
      set: function set(value) {
        if (this._type !== value) {
          this._type = value;
          this.setVertsDirty();

          this._resetAssembler();
        }
      },
      type: SpriteType,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.type'
    },

    /**
     * !#en
     * The fill type, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 精灵填充类型，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillType
     * @type {Sprite.FillType}
     * @example
     * sprite.fillType = cc.Sprite.FillType.HORIZONTAL;
     */
    fillType: {
      get: function get() {
        return this._fillType;
      },
      set: function set(value) {
        if (value !== this._fillType) {
          this._fillType = value;
          this.setVertsDirty();

          this._resetAssembler();
        }
      },
      type: FillType,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_type'
    },

    /**
     * !#en
     * The fill Center, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充中心点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillCenter
     * @type {Vec2}
     * @example
     * sprite.fillCenter = new cc.Vec2(0, 0);
     */
    fillCenter: {
      get: function get() {
        return this._fillCenter;
      },
      set: function set(value) {
        this._fillCenter.x = value.x;
        this._fillCenter.y = value.y;

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_center'
    },

    /**
     * !#en
     * The fill Start, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充起始点，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillStart
     * @type {Number}
     * @example
     * // -1 To 1 between the numbers
     * sprite.fillStart = 0.5;
     */
    fillStart: {
      get: function get() {
        return this._fillStart;
      },
      set: function set(value) {
        this._fillStart = misc.clampf(value, -1, 1);

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_start'
    },

    /**
     * !#en
     * The fill Range, This will only have any effect if the "type" is set to “cc.Sprite.Type.FILLED”.
     * !#zh
     * 填充范围，仅渲染类型设置为 cc.Sprite.Type.FILLED 时有效。
     * @property fillRange
     * @type {Number}
     * @example
     * // -1 To 1 between the numbers
     * sprite.fillRange = 1;
     */
    fillRange: {
      get: function get() {
        return this._fillRange;
      },
      set: function set(value) {
        this._fillRange = misc.clampf(value, -1, 1);

        if (this._type === SpriteType.FILLED) {
          this.setVertsDirty();
        }
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.fill_range'
    },

    /**
     * !#en specify the frame is trimmed or not.
     * !#zh 是否使用裁剪模式
     * @property trim
     * @type {Boolean}
     * @example
     * sprite.trim = true;
     */
    trim: {
      get: function get() {
        return this._isTrimmedMode;
      },
      set: function set(value) {
        if (this._isTrimmedMode !== value) {
          this._isTrimmedMode = value;

          if (this._type === SpriteType.SIMPLE || this._type === SpriteType.MESH) {
            this.setVertsDirty();
          }
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.trim'
    },

    /**
     * !#en specify the size tracing mode.
     * !#zh 精灵尺寸调整模式
     * @property sizeMode
     * @type {Sprite.SizeMode}
     * @example
     * sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
     */
    sizeMode: {
      get: function get() {
        return this._sizeMode;
      },
      set: function set(value) {
        this._sizeMode = value;

        if (value !== SizeMode.CUSTOM) {
          this._applySpriteSize();
        }
      },
      animatable: false,
      type: SizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.sprite.size_mode'
    }
  },
  statics: {
    FillType: FillType,
    Type: SpriteType,
    SizeMode: SizeMode,
    State: State
  },
  setVisible: function setVisible(visible) {
    this.enabled = visible;
  },

  /**
   * Change the state of sprite.
   * @method setState
   * @see `Sprite.State`
   * @param state {Sprite.State} NORMAL or GRAY State.
   * @deprecated
   */
  setState: function setState() {},

  /**
   * Gets the current state.
   * @method getState
   * @see `Sprite.State`
   * @return {Sprite.State}
   * @deprecated
   */
  getState: function getState() {},
  __preload: function __preload() {
    this._super();

    CC_EDITOR && this.node.on(NodeEvent.SIZE_CHANGED, this._resizedInEditor, this);

    this._applySpriteFrame();
  },
  onEnable: function onEnable() {
    this._super();

    this._spriteFrame && this._spriteFrame.ensureLoadTexture();
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
    this.node.on(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
  },
  onDisable: function onDisable() {
    this._super();

    this.node.off(cc.Node.EventType.SIZE_CHANGED, this.setVertsDirty, this);
    this.node.off(cc.Node.EventType.ANCHOR_CHANGED, this.setVertsDirty, this);
  },
  _updateMaterial: function _updateMaterial() {
    var texture = this._spriteFrame && this._spriteFrame.getTexture(); // make sure material is belong to self.


    var material = this.getMaterial(0);

    if (material) {
      if (material.getDefine('USE_TEXTURE') !== undefined) {
        material.define('USE_TEXTURE', true);
      }

      material.setProperty('texture', texture);
    }

    BlendFunc.prototype._updateMaterial.call(this);
  },
  _applyAtlas: CC_EDITOR && function (spriteFrame) {
    // Set atlas
    if (spriteFrame && spriteFrame._atlasUuid) {
      var self = this;
      cc.assetManager.loadAny(spriteFrame._atlasUuid, function (err, asset) {
        self._atlas = asset;
      });
    } else {
      this._atlas = null;
    }
  },
  _validateRender: function _validateRender() {
    var spriteFrame = this._spriteFrame;

    if (this._materials[0] && spriteFrame && spriteFrame.textureLoaded()) {
      return;
    }

    this.disableRender();
  },
  _applySpriteSize: function _applySpriteSize() {
    if (!this._spriteFrame || !this.isValid) return;

    if (SizeMode.RAW === this._sizeMode) {
      var size = this._spriteFrame._originalSize;
      this.node.setContentSize(size);
    } else if (SizeMode.TRIMMED === this._sizeMode) {
      var rect = this._spriteFrame._rect;
      this.node.setContentSize(rect.width, rect.height);
    }

    this.setVertsDirty();
  },
  _applySpriteFrame: function _applySpriteFrame(oldFrame) {
    var oldTexture = oldFrame && oldFrame.getTexture();

    if (oldTexture && !oldTexture.loaded) {
      oldFrame.off('load', this._applySpriteSize, this);
    }

    var spriteFrame = this._spriteFrame;

    if (spriteFrame) {
      this._updateMaterial();

      var newTexture = spriteFrame.getTexture();

      if (newTexture && newTexture.loaded) {
        this._applySpriteSize();
      } else {
        this.disableRender();
        spriteFrame.once('load', this._applySpriteSize, this);
      }
    } else {
      this.disableRender();
    }

    if (CC_EDITOR) {
      // Set atlas
      this._applyAtlas(spriteFrame);
    }
  }
});

if (CC_EDITOR) {
  Sprite.prototype._resizedInEditor = function () {
    if (this._spriteFrame) {
      var actualSize = this.node.getContentSize();
      var expectedW = actualSize.width;
      var expectedH = actualSize.height;

      if (this._sizeMode === SizeMode.RAW) {
        var size = this._spriteFrame.getOriginalSize();

        expectedW = size.width;
        expectedH = size.height;
      } else if (this._sizeMode === SizeMode.TRIMMED) {
        var rect = this._spriteFrame.getRect();

        expectedW = rect.width;
        expectedH = rect.height;
      }

      if (expectedW !== actualSize.width || expectedH !== actualSize.height) {
        this._sizeMode = SizeMode.CUSTOM;
      }
    }
  }; // override onDestroy


  Sprite.prototype.__superOnDestroy = cc.Component.prototype.onDestroy;

  Sprite.prototype.onDestroy = function () {
    if (this.__superOnDestroy) this.__superOnDestroy();
    this.node.off(NodeEvent.SIZE_CHANGED, this._resizedInEditor, this);
  };
}

cc.Sprite = module.exports = Sprite;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NTcHJpdGUuanMiXSwibmFtZXMiOlsibWlzYyIsInJlcXVpcmUiLCJOb2RlRXZlbnQiLCJFdmVudFR5cGUiLCJSZW5kZXJDb21wb25lbnQiLCJCbGVuZEZ1bmMiLCJTcHJpdGVUeXBlIiwiY2MiLCJFbnVtIiwiU0lNUExFIiwiU0xJQ0VEIiwiVElMRUQiLCJGSUxMRUQiLCJNRVNIIiwiRmlsbFR5cGUiLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJSQURJQUwiLCJTaXplTW9kZSIsIkNVU1RPTSIsIlRSSU1NRUQiLCJSQVciLCJTdGF0ZSIsIk5PUk1BTCIsIkdSQVkiLCJTcHJpdGUiLCJDbGFzcyIsIm5hbWUiLCJtaXhpbnMiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsInByb3BlcnRpZXMiLCJfc3ByaXRlRnJhbWUiLCJ0eXBlIiwiU3ByaXRlRnJhbWUiLCJfdHlwZSIsIl9zaXplTW9kZSIsIl9maWxsVHlwZSIsIl9maWxsQ2VudGVyIiwidjIiLCJfZmlsbFN0YXJ0IiwiX2ZpbGxSYW5nZSIsIl9pc1RyaW1tZWRNb2RlIiwiX2F0bGFzIiwiU3ByaXRlQXRsYXMiLCJ0b29sdGlwIiwiQ0NfREVWIiwiZWRpdG9yT25seSIsInZpc2libGUiLCJhbmltYXRhYmxlIiwic3ByaXRlRnJhbWUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImZvcmNlIiwibGFzdFNwcml0ZSIsIl91dWlkIiwiX2FwcGx5U3ByaXRlRnJhbWUiLCJub2RlIiwiZW1pdCIsInNldFZlcnRzRGlydHkiLCJfcmVzZXRBc3NlbWJsZXIiLCJmaWxsVHlwZSIsImZpbGxDZW50ZXIiLCJ4IiwieSIsImZpbGxTdGFydCIsImNsYW1wZiIsImZpbGxSYW5nZSIsInRyaW0iLCJzaXplTW9kZSIsIl9hcHBseVNwcml0ZVNpemUiLCJzdGF0aWNzIiwiVHlwZSIsInNldFZpc2libGUiLCJlbmFibGVkIiwic2V0U3RhdGUiLCJnZXRTdGF0ZSIsIl9fcHJlbG9hZCIsIl9zdXBlciIsIm9uIiwiU0laRV9DSEFOR0VEIiwiX3Jlc2l6ZWRJbkVkaXRvciIsIm9uRW5hYmxlIiwiZW5zdXJlTG9hZFRleHR1cmUiLCJOb2RlIiwiQU5DSE9SX0NIQU5HRUQiLCJvbkRpc2FibGUiLCJvZmYiLCJfdXBkYXRlTWF0ZXJpYWwiLCJ0ZXh0dXJlIiwiZ2V0VGV4dHVyZSIsIm1hdGVyaWFsIiwiZ2V0TWF0ZXJpYWwiLCJnZXREZWZpbmUiLCJ1bmRlZmluZWQiLCJkZWZpbmUiLCJzZXRQcm9wZXJ0eSIsInByb3RvdHlwZSIsImNhbGwiLCJfYXBwbHlBdGxhcyIsIl9hdGxhc1V1aWQiLCJzZWxmIiwiYXNzZXRNYW5hZ2VyIiwibG9hZEFueSIsImVyciIsImFzc2V0IiwiX3ZhbGlkYXRlUmVuZGVyIiwiX21hdGVyaWFscyIsInRleHR1cmVMb2FkZWQiLCJkaXNhYmxlUmVuZGVyIiwiaXNWYWxpZCIsInNpemUiLCJfb3JpZ2luYWxTaXplIiwic2V0Q29udGVudFNpemUiLCJyZWN0IiwiX3JlY3QiLCJ3aWR0aCIsImhlaWdodCIsIm9sZEZyYW1lIiwib2xkVGV4dHVyZSIsImxvYWRlZCIsIm5ld1RleHR1cmUiLCJvbmNlIiwiYWN0dWFsU2l6ZSIsImdldENvbnRlbnRTaXplIiwiZXhwZWN0ZWRXIiwiZXhwZWN0ZWRIIiwiZ2V0T3JpZ2luYWxTaXplIiwiZ2V0UmVjdCIsIl9fc3VwZXJPbkRlc3Ryb3kiLCJDb21wb25lbnQiLCJvbkRlc3Ryb3kiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUFwQjs7QUFDQSxJQUFNQyxTQUFTLEdBQUdELE9BQU8sQ0FBQyxXQUFELENBQVAsQ0FBcUJFLFNBQXZDOztBQUNBLElBQU1DLGVBQWUsR0FBR0gsT0FBTyxDQUFDLHFCQUFELENBQS9C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LE1BQUgsR0FBWStHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhILE1BQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi4vdXRpbHMvbWlzYycpO1xuY29uc3QgTm9kZUV2ZW50ID0gcmVxdWlyZSgnLi4vQ0NOb2RlJykuRXZlbnRUeXBlO1xuY29uc3QgUmVuZGVyQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9DQ1JlbmRlckNvbXBvbmVudCcpO1xuY29uc3QgQmxlbmRGdW5jID0gcmVxdWlyZSgnLi4vdXRpbHMvYmxlbmQtZnVuYycpO1xuXG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBzcHJpdGUgdHlwZS5cbiAqICEjemggU3ByaXRlIOexu+Wei1xuICogQGVudW0gU3ByaXRlLlR5cGVcbiAqL1xudmFyIFNwcml0ZVR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBzaW1wbGUgdHlwZS5cbiAgICAgKiAhI3poIOaZrumAmuexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSU1QTEVcbiAgICAgKi9cbiAgICBTSU1QTEU6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgc2xpY2VkIHR5cGUuXG4gICAgICogISN6aCDliIfniYfvvIjkuZ3lrqvmoLzvvInnsbvlnotcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0xJQ0VEXG4gICAgICovXG4gICAgU0xJQ0VEOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHRpbGVkIHR5cGUuXG4gICAgICogISN6aCDlubPpk7rnsbvlnotcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVElMRURcbiAgICAgKi9cbiAgICBUSUxFRDogMixcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBmaWxsZWQgdHlwZS5cbiAgICAgKiAhI3poIOWhq+WFheexu+Wei1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGSUxMRURcbiAgICAgKi9cbiAgICBGSUxMRUQ6IDMsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbWVzaCB0eXBlLlxuICAgICAqICEjemgg5LulIE1lc2gg5LiJ6KeS5b2i57uE5oiQ55qE57G75Z6LXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IE1FU0hcbiAgICAgKi9cbiAgICBNRVNIOiA0XG59KTtcblxuLyoqXG4gKiAhI2VuIEVudW0gZm9yIGZpbGwgdHlwZS5cbiAqICEjemgg5aGr5YWF57G75Z6LXG4gKiBAZW51bSBTcHJpdGUuRmlsbFR5cGVcbiAqL1xudmFyIEZpbGxUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgaG9yaXpvbnRhbCBmaWxsLlxuICAgICAqICEjemgg5rC05bmz5pa55ZCR5aGr5YWFXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhPUklaT05UQUxcbiAgICAgKi9cbiAgICBIT1JJWk9OVEFMOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHZlcnRpY2FsIGZpbGwuXG4gICAgICogISN6aCDlnoLnm7TmlrnlkJHloavlhYVcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVkVSVElDQUxcbiAgICAgKi9cbiAgICBWRVJUSUNBTDogMSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSByYWRpYWwgZmlsbC5cbiAgICAgKiAhI3poIOW+hOWQkeWhq+WFhVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSQURJQUxcbiAgICAgKi9cbiAgICBSQURJQUw6Mixcbn0pO1xuXG4vKipcbiAqICEjZW4gU3ByaXRlIFNpemUgY2FuIHRyYWNrIHRyaW1tZWQgc2l6ZSwgcmF3IHNpemUgb3Igbm9uZS5cbiAqICEjemgg57K+54G15bC65a+46LCD5pW05qih5byPXG4gKiBAZW51bSBTcHJpdGUuU2l6ZU1vZGVcbiAqL1xudmFyIFNpemVNb2RlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBVc2UgdGhlIGN1c3RvbWl6ZWQgbm9kZSBzaXplLlxuICAgICAqICEjemgg5L2/55So6IqC54K56aKE6K6+55qE5bC65a+4XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENVU1RPTVxuICAgICAqL1xuICAgIENVU1RPTTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIE1hdGNoIHRoZSB0cmltbWVkIHNpemUgb2YgdGhlIHNwcml0ZSBmcmFtZSBhdXRvbWF0aWNhbGx5LlxuICAgICAqICEjemgg6Ieq5Yqo6YCC6YWN5Li657K+54G16KOB5Ymq5ZCO55qE5bC65a+4XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRSSU1NRURcbiAgICAgKi9cbiAgICBUUklNTUVEOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gTWF0Y2ggdGhlIHJhdyBzaXplIG9mIHRoZSBzcHJpdGUgZnJhbWUgYXV0b21hdGljYWxseS5cbiAgICAgKiAhI3poIOiHquWKqOmAgumFjeS4uueyvueBteWOn+WbvuWwuuWvuFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSQVdcbiAgICAgKi9cbiAgICBSQVc6IDJcbn0pO1xuLyoqXG4gKiAhI2VuIFNwcml0ZSBzdGF0ZSBjYW4gY2hvaWNlIHRoZSBub3JtYWwgb3IgZ3JheXNjYWxlLlxuICogISN6aCDnsr7ngbXpopzoibLpgJrpgZPmqKHlvI/jgIJcbiAqIEBlbnVtIFNwcml0ZS5TdGF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xudmFyIFN0YXRlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbm9ybWFsIHN0YXRlXG4gICAgICogISN6aCDmraPluLjnirbmgIFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gTk9STUFMXG4gICAgICovXG4gICAgTk9STUFMOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGdyYXkgc3RhdGUsIGFsbCBjb2xvciB3aWxsIGJlIG1vZGlmaWVkIHRvIGdyYXlzY2FsZSB2YWx1ZS5cbiAgICAgKiAhI3poIOeBsOiJsueKtuaAge+8jOaJgOacieminOiJsuS8muiiq+i9rOaNouaIkOeBsOW6puWAvFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHUkFZXG4gICAgICovXG4gICAgR1JBWTogMVxufSk7XG5cbi8qKlxuICogISNlbiBSZW5kZXJzIGEgc3ByaXRlIGluIHRoZSBzY2VuZS5cbiAqICEjemgg6K+l57uE5Lu255So5LqO5Zyo5Zy65pmv5Lit5riy5p+T57K+54G144CCXG4gKiBAY2xhc3MgU3ByaXRlXG4gKiBAZXh0ZW5kcyBSZW5kZXJDb21wb25lbnRcbiAqIEB1c2VzIEJsZW5kRnVuY1xuICogQGV4YW1wbGVcbiAqICAvLyBDcmVhdGUgYSBuZXcgbm9kZSBhbmQgYWRkIHNwcml0ZSBjb21wb25lbnRzLlxuICogIHZhciBub2RlID0gbmV3IGNjLk5vZGUoXCJOZXcgU3ByaXRlXCIpO1xuICogIHZhciBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICogIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICovXG52YXIgU3ByaXRlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5TcHJpdGUnLFxuICAgIGV4dGVuZHM6IFJlbmRlckNvbXBvbmVudCxcbiAgICBtaXhpbnM6IFtCbGVuZEZ1bmNdLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9TcHJpdGUnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuc3ByaXRlJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9zcHJpdGUuanMnLFxuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9zcHJpdGVGcmFtZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIF90eXBlOiBTcHJpdGVUeXBlLlNJTVBMRSxcbiAgICAgICAgX3NpemVNb2RlOiBTaXplTW9kZS5UUklNTUVELFxuICAgICAgICBfZmlsbFR5cGU6IDAsXG4gICAgICAgIF9maWxsQ2VudGVyOiBjYy52MigwLDApLFxuICAgICAgICBfZmlsbFN0YXJ0OiAwLFxuICAgICAgICBfZmlsbFJhbmdlOiAwLFxuICAgICAgICBfaXNUcmltbWVkTW9kZTogdHJ1ZSxcbiAgICAgICAgX2F0bGFzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlQXRsYXMsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5hdGxhcycsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNwcml0ZSBmcmFtZSBvZiB0aGUgc3ByaXRlLlxuICAgICAgICAgKiAhI3poIOeyvueBteeahOeyvueBteW4p1xuICAgICAgICAgKiBAcHJvcGVydHkgc3ByaXRlRnJhbWVcbiAgICAgICAgICogQHR5cGUge1Nwcml0ZUZyYW1lfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBzcHJpdGUuc3ByaXRlRnJhbWUgPSBuZXdTcHJpdGVGcmFtZTtcbiAgICAgICAgICovXG4gICAgICAgIHNwcml0ZUZyYW1lOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcHJpdGVGcmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlLCBmb3JjZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0U3ByaXRlID0gdGhpcy5fc3ByaXRlRnJhbWU7XG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcmNlICYmICgobGFzdFNwcml0ZSAmJiBsYXN0U3ByaXRlLl91dWlkKSA9PT0gKHZhbHVlICYmIHZhbHVlLl91dWlkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RTcHJpdGUgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlRnJhbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcHBseVNwcml0ZUZyYW1lKGxhc3RTcHJpdGUpO1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoJ3Nwcml0ZWZyYW1lLWNoYW5nZWQnLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHNwcml0ZSByZW5kZXIgdHlwZS5cbiAgICAgICAgICogISN6aCDnsr7ngbXmuLLmn5PnsbvlnotcbiAgICAgICAgICogQHByb3BlcnR5IHR5cGVcbiAgICAgICAgICogQHR5cGUge1Nwcml0ZS5UeXBlfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBzcHJpdGUudHlwZSA9IGNjLlNwcml0ZS5UeXBlLlNJTVBMRTtcbiAgICAgICAgICovXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90eXBlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90eXBlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldEFzc2VtYmxlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBTcHJpdGVUeXBlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS50eXBlJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgZmlsbCB0eXBlLCBUaGlzIHdpbGwgb25seSBoYXZlIGFueSBlZmZlY3QgaWYgdGhlIFwidHlwZVwiIGlzIHNldCB0byDigJxjYy5TcHJpdGUuVHlwZS5GSUxMRUTigJ0uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog57K+54G15aGr5YWF57G75Z6L77yM5LuF5riy5p+T57G75Z6L6K6+572u5Li6IGNjLlNwcml0ZS5UeXBlLkZJTExFRCDml7bmnInmlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGZpbGxUeXBlXG4gICAgICAgICAqIEB0eXBlIHtTcHJpdGUuRmlsbFR5cGV9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS5maWxsVHlwZSA9IGNjLlNwcml0ZS5GaWxsVHlwZS5IT1JJWk9OVEFMO1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsbFR5cGUgOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsVHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9maWxsVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWxsVHlwZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzZXRBc3NlbWJsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogRmlsbFR5cGUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5maWxsX3R5cGUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGZpbGwgQ2VudGVyLCBUaGlzIHdpbGwgb25seSBoYXZlIGFueSBlZmZlY3QgaWYgdGhlIFwidHlwZVwiIGlzIHNldCB0byDigJxjYy5TcHJpdGUuVHlwZS5GSUxMRUTigJ0uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aGr5YWF5Lit5b+D54K577yM5LuF5riy5p+T57G75Z6L6K6+572u5Li6IGNjLlNwcml0ZS5UeXBlLkZJTExFRCDml7bmnInmlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGZpbGxDZW50ZXJcbiAgICAgICAgICogQHR5cGUge1ZlYzJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHNwcml0ZS5maWxsQ2VudGVyID0gbmV3IGNjLlZlYzIoMCwgMCk7XG4gICAgICAgICAqL1xuICAgICAgICBmaWxsQ2VudGVyOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsQ2VudGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maWxsQ2VudGVyLnggPSB2YWx1ZS54O1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxDZW50ZXIueSA9IHZhbHVlLnk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IFNwcml0ZVR5cGUuRklMTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5maWxsX2NlbnRlcicsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIGZpbGwgU3RhcnQsIFRoaXMgd2lsbCBvbmx5IGhhdmUgYW55IGVmZmVjdCBpZiB0aGUgXCJ0eXBlXCIgaXMgc2V0IHRvIOKAnGNjLlNwcml0ZS5UeXBlLkZJTExFROKAnS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDloavlhYXotbflp4vngrnvvIzku4XmuLLmn5Pnsbvlnovorr7nva7kuLogY2MuU3ByaXRlLlR5cGUuRklMTEVEIOaXtuacieaViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZmlsbFN0YXJ0XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIC8vIC0xIFRvIDEgYmV0d2VlbiB0aGUgbnVtYmVyc1xuICAgICAgICAgKiBzcHJpdGUuZmlsbFN0YXJ0ID0gMC41O1xuICAgICAgICAgKi9cbiAgICAgICAgZmlsbFN0YXJ0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9maWxsU3RhcnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGxTdGFydCA9IG1pc2MuY2xhbXBmKHZhbHVlLCAtMSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IFNwcml0ZVR5cGUuRklMTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS5maWxsX3N0YXJ0J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBmaWxsIFJhbmdlLCBUaGlzIHdpbGwgb25seSBoYXZlIGFueSBlZmZlY3QgaWYgdGhlIFwidHlwZVwiIGlzIHNldCB0byDigJxjYy5TcHJpdGUuVHlwZS5GSUxMRUTigJ0uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aGr5YWF6IyD5Zu077yM5LuF5riy5p+T57G75Z6L6K6+572u5Li6IGNjLlNwcml0ZS5UeXBlLkZJTExFRCDml7bmnInmlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGZpbGxSYW5nZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAvLyAtMSBUbyAxIGJldHdlZW4gdGhlIG51bWJlcnNcbiAgICAgICAgICogc3ByaXRlLmZpbGxSYW5nZSA9IDE7XG4gICAgICAgICAqL1xuICAgICAgICBmaWxsUmFuZ2U6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGxSYW5nZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmlsbFJhbmdlID0gbWlzYy5jbGFtcGYodmFsdWUsIC0xLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHlwZSA9PT0gU3ByaXRlVHlwZS5GSUxMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc3ByaXRlLmZpbGxfcmFuZ2UnXG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHNwZWNpZnkgdGhlIGZyYW1lIGlzIHRyaW1tZWQgb3Igbm90LlxuICAgICAgICAgKiAhI3poIOaYr+WQpuS9v+eUqOijgeWJquaooeW8j1xuICAgICAgICAgKiBAcHJvcGVydHkgdHJpbVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogc3ByaXRlLnRyaW0gPSB0cnVlO1xuICAgICAgICAgKi9cbiAgICAgICAgdHJpbToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNUcmltbWVkTW9kZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVHJpbW1lZE1vZGUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzVHJpbW1lZE1vZGUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3R5cGUgPT09IFNwcml0ZVR5cGUuU0lNUExFIHx8IHRoaXMuX3R5cGUgPT09IFNwcml0ZVR5cGUuTUVTSCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWZXJ0c0RpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNwcml0ZS50cmltJ1xuICAgICAgICB9LFxuXG4gICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gc3BlY2lmeSB0aGUgc2l6ZSB0cmFjaW5nIG1vZGUuXG4gICAgICAgICAqICEjemgg57K+54G15bC65a+46LCD5pW05qih5byPXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzaXplTW9kZVxuICAgICAgICAgKiBAdHlwZSB7U3ByaXRlLlNpemVNb2RlfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBzcHJpdGUuc2l6ZU1vZGUgPSBjYy5TcHJpdGUuU2l6ZU1vZGUuQ1VTVE9NO1xuICAgICAgICAgKi9cbiAgICAgICAgc2l6ZU1vZGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemVNb2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplTW9kZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gU2l6ZU1vZGUuQ1VTVE9NKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5U3ByaXRlU2l6ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHR5cGU6IFNpemVNb2RlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zcHJpdGUuc2l6ZV9tb2RlJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRmlsbFR5cGU6IEZpbGxUeXBlLFxuICAgICAgICBUeXBlOiBTcHJpdGVUeXBlLFxuICAgICAgICBTaXplTW9kZTogU2l6ZU1vZGUsXG4gICAgICAgIFN0YXRlOiBTdGF0ZSxcbiAgICB9LFxuXG4gICAgc2V0VmlzaWJsZSAodmlzaWJsZSkge1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB2aXNpYmxlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2UgdGhlIHN0YXRlIG9mIHNwcml0ZS5cbiAgICAgKiBAbWV0aG9kIHNldFN0YXRlXG4gICAgICogQHNlZSBgU3ByaXRlLlN0YXRlYFxuICAgICAqIEBwYXJhbSBzdGF0ZSB7U3ByaXRlLlN0YXRlfSBOT1JNQUwgb3IgR1JBWSBTdGF0ZS5cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIHNldFN0YXRlICgpIHt9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBzdGF0ZS5cbiAgICAgKiBAbWV0aG9kIGdldFN0YXRlXG4gICAgICogQHNlZSBgU3ByaXRlLlN0YXRlYFxuICAgICAqIEByZXR1cm4ge1Nwcml0ZS5TdGF0ZX1cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIGdldFN0YXRlICgpIHt9LFxuXG4gICAgX19wcmVsb2FkICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgQ0NfRURJVE9SICYmIHRoaXMubm9kZS5vbihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9yZXNpemVkSW5FZGl0b3IsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hcHBseVNwcml0ZUZyYW1lKCk7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3ByaXRlRnJhbWUgJiYgdGhpcy5fc3ByaXRlRnJhbWUuZW5zdXJlTG9hZFRleHR1cmUoKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCB0aGlzLnNldFZlcnRzRGlydHksIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuc2V0VmVydHNEaXJ0eSwgdGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5zZXRWZXJ0c0RpcnR5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5zZXRWZXJ0c0RpcnR5LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU1hdGVyaWFsICgpIHtcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl9zcHJpdGVGcmFtZSAmJiB0aGlzLl9zcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XG4gICAgICAgIFxuICAgICAgICAvLyBtYWtlIHN1cmUgbWF0ZXJpYWwgaXMgYmVsb25nIHRvIHNlbGYuXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IHRoaXMuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIGlmIChtYXRlcmlhbCkge1xuICAgICAgICAgICAgaWYgKG1hdGVyaWFsLmdldERlZmluZSgnVVNFX1RFWFRVUkUnKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuZGVmaW5lKCdVU0VfVEVYVFVSRScsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0ZXJpYWwuc2V0UHJvcGVydHkoJ3RleHR1cmUnLCB0ZXh0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJsZW5kRnVuYy5wcm90b3R5cGUuX3VwZGF0ZU1hdGVyaWFsLmNhbGwodGhpcyk7XG4gICAgfSxcblxuICAgIF9hcHBseUF0bGFzOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKHNwcml0ZUZyYW1lKSB7XG4gICAgICAgIC8vIFNldCBhdGxhc1xuICAgICAgICBpZiAoc3ByaXRlRnJhbWUgJiYgc3ByaXRlRnJhbWUuX2F0bGFzVXVpZCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRBbnkoc3ByaXRlRnJhbWUuX2F0bGFzVXVpZCwgZnVuY3Rpb24gKGVyciwgYXNzZXQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9hdGxhcyA9IGFzc2V0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdGxhcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3ZhbGlkYXRlUmVuZGVyICgpIHtcbiAgICAgICAgbGV0IHNwcml0ZUZyYW1lID0gdGhpcy5fc3ByaXRlRnJhbWU7XG4gICAgICAgIGlmICh0aGlzLl9tYXRlcmlhbHNbMF0gJiZcbiAgICAgICAgICAgIHNwcml0ZUZyYW1lICYmIFxuICAgICAgICAgICAgc3ByaXRlRnJhbWUudGV4dHVyZUxvYWRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcbiAgICB9LFxuXG4gICAgX2FwcGx5U3ByaXRlU2l6ZSAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fc3ByaXRlRnJhbWUgfHwgIXRoaXMuaXNWYWxpZCkgIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIGlmIChTaXplTW9kZS5SQVcgPT09IHRoaXMuX3NpemVNb2RlKSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuX3Nwcml0ZUZyYW1lLl9vcmlnaW5hbFNpemU7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUoc2l6ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoU2l6ZU1vZGUuVFJJTU1FRCA9PT0gdGhpcy5fc2l6ZU1vZGUpIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gdGhpcy5fc3ByaXRlRnJhbWUuX3JlY3Q7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUocmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldFZlcnRzRGlydHkoKTtcbiAgICB9LFxuXG4gICAgX2FwcGx5U3ByaXRlRnJhbWUgKG9sZEZyYW1lKSB7XG4gICAgICAgIGxldCBvbGRUZXh0dXJlID0gb2xkRnJhbWUgJiYgb2xkRnJhbWUuZ2V0VGV4dHVyZSgpO1xuICAgICAgICBpZiAob2xkVGV4dHVyZSAmJiAhb2xkVGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIG9sZEZyYW1lLm9mZignbG9hZCcsIHRoaXMuX2FwcGx5U3ByaXRlU2l6ZSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3ByaXRlRnJhbWUgPSB0aGlzLl9zcHJpdGVGcmFtZTtcbiAgICAgICAgaWYgKHNwcml0ZUZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVNYXRlcmlhbCgpO1xuICAgICAgICAgICAgbGV0IG5ld1RleHR1cmUgPSBzcHJpdGVGcmFtZS5nZXRUZXh0dXJlKCk7XG4gICAgICAgICAgICBpZiAobmV3VGV4dHVyZSAmJiBuZXdUZXh0dXJlLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcGx5U3ByaXRlU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlUmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgc3ByaXRlRnJhbWUub25jZSgnbG9hZCcsIHRoaXMuX2FwcGx5U3ByaXRlU2l6ZSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVSZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIC8vIFNldCBhdGxhc1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlBdGxhcyhzcHJpdGVGcmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBTcHJpdGUucHJvdG90eXBlLl9yZXNpemVkSW5FZGl0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpdGVGcmFtZSkge1xuICAgICAgICAgICAgdmFyIGFjdHVhbFNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgICAgIHZhciBleHBlY3RlZFcgPSBhY3R1YWxTaXplLndpZHRoO1xuICAgICAgICAgICAgdmFyIGV4cGVjdGVkSCA9IGFjdHVhbFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NpemVNb2RlID09PSBTaXplTW9kZS5SQVcpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuX3Nwcml0ZUZyYW1lLmdldE9yaWdpbmFsU2l6ZSgpO1xuICAgICAgICAgICAgICAgIGV4cGVjdGVkVyA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRIID0gc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3NpemVNb2RlID09PSBTaXplTW9kZS5UUklNTUVEKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlY3QgPSB0aGlzLl9zcHJpdGVGcmFtZS5nZXRSZWN0KCk7XG4gICAgICAgICAgICAgICAgZXhwZWN0ZWRXID0gcmVjdC53aWR0aDtcbiAgICAgICAgICAgICAgICBleHBlY3RlZEggPSByZWN0LmhlaWdodDtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXhwZWN0ZWRXICE9PSBhY3R1YWxTaXplLndpZHRoIHx8IGV4cGVjdGVkSCAhPT0gYWN0dWFsU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplTW9kZSA9IFNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBvdmVycmlkZSBvbkRlc3Ryb3lcbiAgICBTcHJpdGUucHJvdG90eXBlLl9fc3VwZXJPbkRlc3Ryb3kgPSBjYy5Db21wb25lbnQucHJvdG90eXBlLm9uRGVzdHJveTtcbiAgICBTcHJpdGUucHJvdG90eXBlLm9uRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX19zdXBlck9uRGVzdHJveSkgdGhpcy5fX3N1cGVyT25EZXN0cm95KCk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fcmVzaXplZEluRWRpdG9yLCB0aGlzKTtcbiAgICB9O1xufVxuXG5jYy5TcHJpdGUgPSBtb2R1bGUuZXhwb3J0cyA9IFNwcml0ZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9