
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSpriteFrame.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var EventTarget = require("../event/event-target");

var INSET_LEFT = 0;
var INSET_TOP = 1;
var INSET_RIGHT = 2;
var INSET_BOTTOM = 3;
var temp_uvs = [{
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}, {
  u: 0,
  v: 0
}];
/**
 * !#en
 * A cc.SpriteFrame has:<br/>
 *  - texture: A cc.Texture2D that will be used by render components<br/>
 *  - rectangle: A rectangle of the texture
 *
 * !#zh
 * 一个 SpriteFrame 包含：<br/>
 *  - 纹理：会被渲染组件使用的 Texture2D 对象。<br/>
 *  - 矩形：在纹理中的矩形区域。
 *
 * @class SpriteFrame
 * @extends Asset
 * @uses EventTarget
 * @example
 * // load a cc.SpriteFrame with image path (Recommend)
 * var self = this;
 * var url = "test assets/PurpleMonster";
 * cc.resources.load(url, cc.SpriteFrame, null, function (err, spriteFrame) {
 *  var node = new cc.Node("New Sprite");
 *  var sprite = node.addComponent(cc.Sprite);
 *  sprite.spriteFrame = spriteFrame;
 *  node.parent = self.node
 * });
 */

var SpriteFrame = cc.Class(
/** @lends cc.SpriteFrame# */
{
  name: 'cc.SpriteFrame',
  "extends": require('../assets/CCAsset'),
  mixins: [EventTarget],
  properties: {
    // Use this property to set texture when loading dependency
    _textureSetter: {
      set: function set(texture) {
        if (texture) {
          if (CC_EDITOR && Editor.isBuilder) {
            // just building
            this._texture = texture;
            return;
          }

          if (this._texture !== texture) {
            this._refreshTexture(texture);
          }
        }
      }
    },

    /**
     * !#en Top border of the sprite
     * !#zh sprite 的顶部边框
     * @property insetTop
     * @type {Number}
     * @default 0
     */
    insetTop: {
      get: function get() {
        return this._capInsets[INSET_TOP];
      },
      set: function set(value) {
        this._capInsets[INSET_TOP] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Bottom border of the sprite
     * !#zh sprite 的底部边框
     * @property insetBottom
     * @type {Number}
     * @default 0
     */
    insetBottom: {
      get: function get() {
        return this._capInsets[INSET_BOTTOM];
      },
      set: function set(value) {
        this._capInsets[INSET_BOTTOM] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Left border of the sprite
     * !#zh sprite 的左边边框
     * @property insetLeft
     * @type {Number}
     * @default 0
     */
    insetLeft: {
      get: function get() {
        return this._capInsets[INSET_LEFT];
      },
      set: function set(value) {
        this._capInsets[INSET_LEFT] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    },

    /**
     * !#en Right border of the sprite
     * !#zh sprite 的左边边框
     * @property insetRight
     * @type {Number}
     * @default 0
     */
    insetRight: {
      get: function get() {
        return this._capInsets[INSET_RIGHT];
      },
      set: function set(value) {
        this._capInsets[INSET_RIGHT] = value;

        if (this._texture) {
          this._calculateSlicedUV();
        }
      }
    }
  },

  /**
   * !#en
   * Constructor of SpriteFrame class.
   * !#zh
   * SpriteFrame 类的构造函数。
   * @method constructor
   * @param {String|Texture2D} [filename]
   * @param {Rect} [rect]
   * @param {Boolean} [rotated] - Whether the frame is rotated in the texture
   * @param {Vec2} [offset] - The offset of the frame in the texture
   * @param {Size} [originalSize] - The size of the frame in the texture
   */
  ctor: function ctor() {
    // Init EventTarget data
    EventTarget.call(this);
    var filename = arguments[0];
    var rect = arguments[1];
    var rotated = arguments[2];
    var offset = arguments[3];
    var originalSize = arguments[4]; // the location of the sprite on rendering texture

    this._rect = null; // uv data of frame

    this.uv = []; // texture of frame

    this._texture = null; // store original info before packed to dynamic atlas

    this._original = null; // for trimming

    this._offset = null; // for trimming

    this._originalSize = null;
    this._rotated = false;
    this._flipX = false;
    this._flipY = false;
    this.vertices = null;
    this._capInsets = [0, 0, 0, 0];
    this.uvSliced = [];

    if (CC_EDITOR) {
      // Atlas asset uuid
      this._atlasUuid = '';
    }

    if (filename !== undefined) {
      this.setTexture(filename, rect, rotated, offset, originalSize);
    } else {//todo log Error
    }
  },

  /**
   * !#en Returns whether the texture have been loaded
   * !#zh 返回是否已加载纹理
   * @method textureLoaded
   * @returns {boolean}
   */
  textureLoaded: function textureLoaded() {
    return this._texture && this._texture.loaded;
  },
  onTextureLoaded: function onTextureLoaded(callback, target) {
    if (this.textureLoaded()) {
      callback.call(target);
    } else {
      this.once('load', callback, target);
      this.ensureLoadTexture();
      return false;
    }

    return true;
  },

  /**
   * !#en Returns whether the sprite frame is rotated in the texture.
   * !#zh 获取 SpriteFrame 是否旋转
   * @method isRotated
   * @return {Boolean}
   */
  isRotated: function isRotated() {
    return this._rotated;
  },

  /**
   * !#en Set whether the sprite frame is rotated in the texture.
   * !#zh 设置 SpriteFrame 是否旋转
   * @method setRotated
   * @param {Boolean} bRotated
   */
  setRotated: function setRotated(bRotated) {
    this._rotated = bRotated;
    if (this._texture) this._calculateUV();
  },

  /**
   * !#en Returns whether the sprite frame is flip x axis in the texture.
   * !#zh 获取 SpriteFrame 是否反转 x 轴
   * @method isFlipX
   * @return {Boolean}
   */
  isFlipX: function isFlipX() {
    return this._flipX;
  },

  /**
   * !#en Returns whether the sprite frame is flip y axis in the texture.
   * !#zh 获取 SpriteFrame 是否反转 y 轴
   * @method isFlipY
   * @return {Boolean}
   */
  isFlipY: function isFlipY() {
    return this._flipY;
  },

  /**
   * !#en Set whether the sprite frame is flip x axis in the texture.
   * !#zh 设置 SpriteFrame 是否翻转 x 轴
   * @method setFlipX
   * @param {Boolean} flipX
   */
  setFlipX: function setFlipX(flipX) {
    this._flipX = flipX;

    if (this._texture) {
      this._calculateUV();
    }
  },

  /**
   * !#en Set whether the sprite frame is flip y axis in the texture.
   * !#zh 设置 SpriteFrame 是否翻转 y 轴
   * @method setFlipY
   * @param {Boolean} flipY
   */
  setFlipY: function setFlipY(flipY) {
    this._flipY = flipY;

    if (this._texture) {
      this._calculateUV();
    }
  },

  /**
   * !#en Returns the rect of the sprite frame in the texture.
   * !#zh 获取 SpriteFrame 的纹理矩形区域
   * @method getRect
   * @return {Rect}
   */
  getRect: function getRect() {
    return cc.rect(this._rect);
  },

  /**
   * !#en Sets the rect of the sprite frame in the texture.
   * !#zh 设置 SpriteFrame 的纹理矩形区域
   * @method setRect
   * @param {Rect} rect
   */
  setRect: function setRect(rect) {
    this._rect = rect;
    if (this._texture) this._calculateUV();
  },

  /**
   * !#en Returns the original size of the trimmed image.
   * !#zh 获取修剪前的原始大小
   * @method getOriginalSize
   * @return {Size}
   */
  getOriginalSize: function getOriginalSize() {
    return cc.size(this._originalSize);
  },

  /**
   * !#en Sets the original size of the trimmed image.
   * !#zh 设置修剪前的原始大小
   * @method setOriginalSize
   * @param {Size} size
   */
  setOriginalSize: function setOriginalSize(size) {
    if (!this._originalSize) {
      this._originalSize = cc.size(size);
    } else {
      this._originalSize.width = size.width;
      this._originalSize.height = size.height;
    }
  },

  /**
   * !#en Returns the texture of the frame.
   * !#zh 获取使用的纹理实例
   * @method getTexture
   * @return {Texture2D}
   */
  getTexture: function getTexture() {
    return this._texture;
  },
  _textureLoadedCallback: function _textureLoadedCallback() {
    var self = this;
    var texture = this._texture;

    if (!texture) {
      // clearTexture called while loading texture...
      return;
    }

    var w = texture.width,
        h = texture.height;

    if (self._rect) {
      self._checkRect(self._texture);
    } else {
      self._rect = cc.rect(0, 0, w, h);
    }

    if (!self._originalSize) {
      self.setOriginalSize(cc.size(w, h));
    }

    if (!self._offset) {
      self.setOffset(cc.v2(0, 0));
    }

    self._calculateUV(); // dispatch 'load' event of cc.SpriteFrame


    self.emit("load");
  },

  /*
   * !#en Sets the texture of the frame.
   * !#zh 设置使用的纹理实例。
   * @method _refreshTexture
   * @param {Texture2D} texture
   */
  _refreshTexture: function _refreshTexture(texture) {
    this._texture = texture;

    if (texture.loaded) {
      this._textureLoadedCallback();
    } else {
      texture.once('load', this._textureLoadedCallback, this);
    }
  },

  /**
   * !#en Returns the offset of the frame in the texture.
   * !#zh 获取偏移量
   * @method getOffset
   * @return {Vec2}
   */
  getOffset: function getOffset() {
    return cc.v2(this._offset);
  },

  /**
   * !#en Sets the offset of the frame in the texture.
   * !#zh 设置偏移量
   * @method setOffset
   * @param {Vec2} offsets
   */
  setOffset: function setOffset(offsets) {
    this._offset = cc.v2(offsets);
  },

  /**
   * !#en Clone the sprite frame.
   * !#zh 克隆 SpriteFrame
   * @method clone
   * @return {SpriteFrame}
   */
  clone: function clone() {
    return new SpriteFrame(this._texture, this.getRect(), this._rotated, this.getOffset(), this.getOriginalSize());
  },

  /**
   * !#en Set SpriteFrame with Texture, rect, rotated, offset and originalSize.<br/>
   * !#zh 通过 Texture，rect，rotated，offset 和 originalSize 设置 SpriteFrame。
   * @method setTexture
   * @param {Texture2D} texture
   * @param {Rect} [rect=null]
   * @param {Boolean} [rotated=false]
   * @param {Vec2} [offset=cc.v2(0,0)]
   * @param {Size} [originalSize=rect.size]
   * @return {Boolean}
   */
  setTexture: function setTexture(texture, rect, rotated, offset, originalSize) {
    if (rect) {
      this._rect = rect;
    } else {
      this._rect = null;
    }

    if (offset) {
      this.setOffset(offset);
    } else {
      this._offset = null;
    }

    if (originalSize) {
      this.setOriginalSize(originalSize);
    } else {
      this._originalSize = null;
    }

    this._rotated = rotated || false;

    if (typeof texture === 'string') {
      cc.errorID(3401);
      return;
    }

    if (texture instanceof cc.Texture2D && this._texture !== texture) {
      this._refreshTexture(texture);
    }

    return true;
  },

  /**
   * !#en If a loading scene (or prefab) is marked as `asyncLoadAssets`, all the textures of the SpriteFrame which
   * associated by user's custom Components in the scene, will not preload automatically.
   * These textures will be load when Sprite component is going to render the SpriteFrames.
   * You can call this method if you want to load the texture early.
   * !#zh 当加载中的场景或 Prefab 被标记为 `asyncLoadAssets` 时，用户在场景中由自定义组件关联到的所有 SpriteFrame 的贴图都不会被提前加载。
   * 只有当 Sprite 组件要渲染这些 SpriteFrame 时，才会检查贴图是否加载。如果你希望加载过程提前，你可以手工调用这个方法。
   *
   * @method ensureLoadTexture
   * @example
   * if (spriteFrame.textureLoaded()) {
   *     this._onSpriteFrameLoaded();
   * }
   * else {
   *     spriteFrame.once('load', this._onSpriteFrameLoaded, this);
   *     spriteFrame.ensureLoadTexture();
   * }
   */
  ensureLoadTexture: function ensureLoadTexture() {
    if (this._texture) {
      if (!this._texture.loaded) {
        // load exists texture
        this._refreshTexture(this._texture);

        cc.assetManager.postLoadNative(this._texture);
      }
    }
  },

  /**
   * !#en
   * If you do not need to use the SpriteFrame temporarily, you can call this method so that its texture could be garbage collected. Then when you need to render the SpriteFrame, you should call `ensureLoadTexture` manually to reload texture.
   * !#zh
   * 当你暂时不再使用这个 SpriteFrame 时，可以调用这个方法来保证引用的贴图对象能被 GC。然后当你要渲染 SpriteFrame 时，你需要手动调用 `ensureLoadTexture` 来重新加载贴图。
   * @method clearTexture
   * @deprecated since 2.1
   */
  _checkRect: function _checkRect(texture) {
    var rect = this._rect;
    var maxX = rect.x,
        maxY = rect.y;

    if (this._rotated) {
      maxX += rect.height;
      maxY += rect.width;
    } else {
      maxX += rect.width;
      maxY += rect.height;
    }

    if (maxX > texture.width) {
      cc.errorID(3300, texture.nativeUrl + '/' + this.name, maxX, texture.width);
    }

    if (maxY > texture.height) {
      cc.errorID(3400, texture.nativeUrl + '/' + this.name, maxY, texture.height);
    }
  },
  _flipXY: function _flipXY(uvs) {
    if (this._flipX) {
      var tempVal = uvs[0];
      uvs[0] = uvs[1];
      uvs[1] = tempVal;
      tempVal = uvs[2];
      uvs[2] = uvs[3];
      uvs[3] = tempVal;
    }

    if (this._flipY) {
      var _tempVal = uvs[0];
      uvs[0] = uvs[2];
      uvs[2] = _tempVal;
      _tempVal = uvs[1];
      uvs[1] = uvs[3];
      uvs[3] = _tempVal;
    }
  },
  _calculateSlicedUV: function _calculateSlicedUV() {
    var rect = this._rect;
    var atlasWidth = this._texture.width;
    var atlasHeight = this._texture.height;
    var leftWidth = this._capInsets[INSET_LEFT];
    var rightWidth = this._capInsets[INSET_RIGHT];
    var centerWidth = rect.width - leftWidth - rightWidth;
    var topHeight = this._capInsets[INSET_TOP];
    var bottomHeight = this._capInsets[INSET_BOTTOM];
    var centerHeight = rect.height - topHeight - bottomHeight;
    var uvSliced = this.uvSliced;
    uvSliced.length = 0;

    if (this._rotated) {
      temp_uvs[0].u = rect.x / atlasWidth;
      temp_uvs[1].u = (rect.x + bottomHeight) / atlasWidth;
      temp_uvs[2].u = (rect.x + bottomHeight + centerHeight) / atlasWidth;
      temp_uvs[3].u = (rect.x + rect.height) / atlasWidth;
      temp_uvs[3].v = rect.y / atlasHeight;
      temp_uvs[2].v = (rect.y + leftWidth) / atlasHeight;
      temp_uvs[1].v = (rect.y + leftWidth + centerWidth) / atlasHeight;
      temp_uvs[0].v = (rect.y + rect.width) / atlasHeight;

      this._flipXY(temp_uvs);

      for (var row = 0; row < 4; ++row) {
        var rowD = temp_uvs[row];

        for (var col = 0; col < 4; ++col) {
          var colD = temp_uvs[3 - col];
          uvSliced.push({
            u: rowD.u,
            v: colD.v
          });
        }
      }
    } else {
      temp_uvs[0].u = rect.x / atlasWidth;
      temp_uvs[1].u = (rect.x + leftWidth) / atlasWidth;
      temp_uvs[2].u = (rect.x + leftWidth + centerWidth) / atlasWidth;
      temp_uvs[3].u = (rect.x + rect.width) / atlasWidth;
      temp_uvs[3].v = rect.y / atlasHeight;
      temp_uvs[2].v = (rect.y + topHeight) / atlasHeight;
      temp_uvs[1].v = (rect.y + topHeight + centerHeight) / atlasHeight;
      temp_uvs[0].v = (rect.y + rect.height) / atlasHeight;

      this._flipXY(temp_uvs);

      for (var _row = 0; _row < 4; ++_row) {
        var _rowD = temp_uvs[_row];

        for (var _col = 0; _col < 4; ++_col) {
          var _colD = temp_uvs[_col];
          uvSliced.push({
            u: _colD.u,
            v: _rowD.v
          });
        }
      }
    }
  },
  _setDynamicAtlasFrame: function _setDynamicAtlasFrame(frame) {
    if (!frame) return;
    this._original = {
      _texture: this._texture,
      _x: this._rect.x,
      _y: this._rect.y
    };
    this._texture = frame.texture;
    this._rect.x = frame.x;
    this._rect.y = frame.y;

    this._calculateUV();
  },
  _resetDynamicAtlasFrame: function _resetDynamicAtlasFrame() {
    if (!this._original) return;
    this._rect.x = this._original._x;
    this._rect.y = this._original._y;
    this._texture = this._original._texture;
    this._original = null;

    this._calculateUV();
  },
  _calculateUV: function _calculateUV() {
    var rect = this._rect,
        texture = this._texture,
        uv = this.uv,
        texw = texture.width,
        texh = texture.height;

    if (this._rotated) {
      var l = texw === 0 ? 0 : rect.x / texw;
      var r = texw === 0 ? 0 : (rect.x + rect.height) / texw;
      var b = texh === 0 ? 0 : (rect.y + rect.width) / texh;
      var t = texh === 0 ? 0 : rect.y / texh;
      uv[0] = l;
      uv[1] = t;
      uv[2] = l;
      uv[3] = b;
      uv[4] = r;
      uv[5] = t;
      uv[6] = r;
      uv[7] = b;
    } else {
      var _l = texw === 0 ? 0 : rect.x / texw;

      var _r = texw === 0 ? 0 : (rect.x + rect.width) / texw;

      var _b = texh === 0 ? 0 : (rect.y + rect.height) / texh;

      var _t = texh === 0 ? 0 : rect.y / texh;

      uv[0] = _l;
      uv[1] = _b;
      uv[2] = _r;
      uv[3] = _b;
      uv[4] = _l;
      uv[5] = _t;
      uv[6] = _r;
      uv[7] = _t;
    }

    if (this._flipX) {
      var tempVal = uv[0];
      uv[0] = uv[2];
      uv[2] = tempVal;
      tempVal = uv[1];
      uv[1] = uv[3];
      uv[3] = tempVal;
      tempVal = uv[4];
      uv[4] = uv[6];
      uv[6] = tempVal;
      tempVal = uv[5];
      uv[5] = uv[7];
      uv[7] = tempVal;
    }

    if (this._flipY) {
      var _tempVal2 = uv[0];
      uv[0] = uv[4];
      uv[4] = _tempVal2;
      _tempVal2 = uv[1];
      uv[1] = uv[5];
      uv[5] = _tempVal2;
      _tempVal2 = uv[2];
      uv[2] = uv[6];
      uv[6] = _tempVal2;
      _tempVal2 = uv[3];
      uv[3] = uv[7];
      uv[7] = _tempVal2;
    }

    var vertices = this.vertices;

    if (vertices) {
      vertices.nu.length = 0;
      vertices.nv.length = 0;

      for (var i = 0; i < vertices.u.length; i++) {
        vertices.nu[i] = vertices.u[i] / texw;
        vertices.nv[i] = vertices.v[i] / texh;
      }
    }

    this._calculateSlicedUV();
  },
  // SERIALIZATION
  _serialize: (CC_EDITOR || CC_TEST) && function (exporting, ctx) {
    var rect = this._rect;
    var offset = this._offset;
    var size = this._originalSize;
    var uuid;
    var texture = this._texture;

    if (texture) {
      uuid = texture._uuid;
    }

    if (!uuid) {
      var url = this._textureFilename;

      if (url) {
        uuid = Editor.Utils.UuidCache.urlToUuid(url);
      }
    }

    if (uuid && exporting) {
      uuid = Editor.Utils.UuidUtils.compressUuid(uuid, true);
      ctx.dependsOn('_textureSetter', uuid);
    }

    var vertices;

    if (this.vertices) {
      vertices = {
        triangles: this.vertices.triangles,
        x: this.vertices.x,
        y: this.vertices.y,
        u: this.vertices.u,
        v: this.vertices.v
      };
    }

    return {
      name: this._name,
      texture: !exporting && uuid || undefined,
      atlas: exporting ? undefined : this._atlasUuid,
      // strip from json if exporting
      rect: rect ? [rect.x, rect.y, rect.width, rect.height] : undefined,
      offset: offset ? [offset.x, offset.y] : undefined,
      originalSize: size ? [size.width, size.height] : undefined,
      rotated: this._rotated ? 1 : undefined,
      capInsets: this._capInsets,
      vertices: vertices
    };
  },
  _deserialize: function _deserialize(data, handle) {
    var rect = data.rect;

    if (rect) {
      this._rect = new cc.Rect(rect[0], rect[1], rect[2], rect[3]);
    }

    if (data.offset) {
      this.setOffset(new cc.Vec2(data.offset[0], data.offset[1]));
    }

    if (data.originalSize) {
      this.setOriginalSize(new cc.Size(data.originalSize[0], data.originalSize[1]));
    }

    this._rotated = data.rotated === 1;
    this._name = data.name;
    var capInsets = data.capInsets;

    if (capInsets) {
      this._capInsets[INSET_LEFT] = capInsets[INSET_LEFT];
      this._capInsets[INSET_TOP] = capInsets[INSET_TOP];
      this._capInsets[INSET_RIGHT] = capInsets[INSET_RIGHT];
      this._capInsets[INSET_BOTTOM] = capInsets[INSET_BOTTOM];
    }

    if (CC_EDITOR) {
      this._atlasUuid = data.atlas;
    }

    this.vertices = data.vertices;

    if (this.vertices) {
      // initialize normal uv arrays
      this.vertices.nu = [];
      this.vertices.nv = [];
    }

    if (!CC_BUILD) {
      // manually load texture via _textureSetter
      var textureUuid = data.texture;

      if (textureUuid) {
        handle.result.push(this, '_textureSetter', textureUuid);
      }
    }
  }
});
var proto = SpriteFrame.prototype;
proto.copyWithZone = proto.clone;
proto.copy = proto.clone;
proto.initWithTexture = proto.setTexture;
cc.SpriteFrame = SpriteFrame;
module.exports = SpriteFrame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1Nwcml0ZUZyYW1lLmpzIl0sIm5hbWVzIjpbIkV2ZW50VGFyZ2V0IiwicmVxdWlyZSIsIklOU0VUX0xFRlQiLCJJTlNFVF9UT1AiLCJJTlNFVF9SSUdIVCIsIklOU0VUX0JPVFRPTSIsInRlbXBfdXZzIiwidSIsInYiLCJTcHJpdGVGcmFtZSIsImNjIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwicHJvcGVydGllcyIsIl90ZXh0dXJlU2V0dGVyIiwic2V0IiwidGV4dHVyZSIsIkNDX0VESVRPUiIsIkVkaXRvciIsImlzQnVpbGRlciIsIl90ZXh0dXJlIiwiX3JlZnJlc2hUZXh0dXJlIiwiaW5zZXRUb3AiLCJnZXQiLCJfY2FwSW5zZXRzIiwidmFsdWUiLCJfY2FsY3VsYXRlU2xpY2VkVVYiLCJpbnNldEJvdHRvbSIsImluc2V0TGVmdCIsImluc2V0UmlnaHQiLCJjdG9yIiwiY2FsbCIsImZpbGVuYW1lIiwiYXJndW1lbnRzIiwicmVjdCIsInJvdGF0ZWQiLCJvZmZzZXQiLCJvcmlnaW5hbFNpemUiLCJfcmVjdCIsInV2IiwiX29yaWdpbmFsIiwiX29mZnNldCIsIl9vcmlnaW5hbFNpemUiLCJfcm90YXRlZCIsIl9mbGlwWCIsIl9mbGlwWSIsInZlcnRpY2VzIiwidXZTbGljZWQiLCJfYXRsYXNVdWlkIiwidW5kZWZpbmVkIiwic2V0VGV4dHVyZSIsInRleHR1cmVMb2FkZWQiLCJsb2FkZWQiLCJvblRleHR1cmVMb2FkZWQiLCJjYWxsYmFjayIsInRhcmdldCIsIm9uY2UiLCJlbnN1cmVMb2FkVGV4dHVyZSIsImlzUm90YXRlZCIsInNldFJvdGF0ZWQiLCJiUm90YXRlZCIsIl9jYWxjdWxhdGVVViIsImlzRmxpcFgiLCJpc0ZsaXBZIiwic2V0RmxpcFgiLCJmbGlwWCIsInNldEZsaXBZIiwiZmxpcFkiLCJnZXRSZWN0Iiwic2V0UmVjdCIsImdldE9yaWdpbmFsU2l6ZSIsInNpemUiLCJzZXRPcmlnaW5hbFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImdldFRleHR1cmUiLCJfdGV4dHVyZUxvYWRlZENhbGxiYWNrIiwic2VsZiIsInciLCJoIiwiX2NoZWNrUmVjdCIsInNldE9mZnNldCIsInYyIiwiZW1pdCIsImdldE9mZnNldCIsIm9mZnNldHMiLCJjbG9uZSIsImVycm9ySUQiLCJUZXh0dXJlMkQiLCJhc3NldE1hbmFnZXIiLCJwb3N0TG9hZE5hdGl2ZSIsIm1heFgiLCJ4IiwibWF4WSIsInkiLCJuYXRpdmVVcmwiLCJfZmxpcFhZIiwidXZzIiwidGVtcFZhbCIsImF0bGFzV2lkdGgiLCJhdGxhc0hlaWdodCIsImxlZnRXaWR0aCIsInJpZ2h0V2lkdGgiLCJjZW50ZXJXaWR0aCIsInRvcEhlaWdodCIsImJvdHRvbUhlaWdodCIsImNlbnRlckhlaWdodCIsImxlbmd0aCIsInJvdyIsInJvd0QiLCJjb2wiLCJjb2xEIiwicHVzaCIsIl9zZXREeW5hbWljQXRsYXNGcmFtZSIsImZyYW1lIiwiX3giLCJfeSIsIl9yZXNldER5bmFtaWNBdGxhc0ZyYW1lIiwidGV4dyIsInRleGgiLCJsIiwiciIsImIiLCJ0IiwibnUiLCJudiIsImkiLCJfc2VyaWFsaXplIiwiQ0NfVEVTVCIsImV4cG9ydGluZyIsImN0eCIsInV1aWQiLCJfdXVpZCIsInVybCIsIl90ZXh0dXJlRmlsZW5hbWUiLCJVdGlscyIsIlV1aWRDYWNoZSIsInVybFRvVXVpZCIsIlV1aWRVdGlscyIsImNvbXByZXNzVXVpZCIsImRlcGVuZHNPbiIsInRyaWFuZ2xlcyIsIl9uYW1lIiwiYXRsYXMiLCJjYXBJbnNldHMiLCJfZGVzZXJpYWxpemUiLCJkYXRhIiwiaGFuZGxlIiwiUmVjdCIsIlZlYzIiLCJTaXplIiwiQ0NfQlVJTEQiLCJ0ZXh0dXJlVXVpZCIsInJlc3VsdCIsInByb3RvIiwicHJvdG90eXBlIiwiY29weVdpdGhab25lIiwiY29weSIsImluaXRXaXRoVGV4dHVyZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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QXZCOztBQUNBLFVBQUl3SSxXQUFKLEVBQWlCO0FBQ2JMLFFBQUFBLE1BQU0sQ0FBQ00sTUFBUCxDQUFjekMsSUFBZCxDQUFtQixJQUFuQixFQUF5QixnQkFBekIsRUFBMkN3QyxXQUEzQztBQUNIO0FBQ0o7QUFDSjtBQTN2Qm1ELENBQXRDLENBQWxCO0FBOHZCQSxJQUFJRSxLQUFLLEdBQUdsSixXQUFXLENBQUNtSixTQUF4QjtBQUVBRCxLQUFLLENBQUNFLFlBQU4sR0FBcUJGLEtBQUssQ0FBQ3BFLEtBQTNCO0FBQ0FvRSxLQUFLLENBQUNHLElBQU4sR0FBYUgsS0FBSyxDQUFDcEUsS0FBbkI7QUFDQW9FLEtBQUssQ0FBQ0ksZUFBTixHQUF3QkosS0FBSyxDQUFDeEcsVUFBOUI7QUFFQXpDLEVBQUUsQ0FBQ0QsV0FBSCxHQUFpQkEsV0FBakI7QUFFQXVKLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhKLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBFdmVudFRhcmdldCA9IHJlcXVpcmUoXCIuLi9ldmVudC9ldmVudC10YXJnZXRcIik7XG5cbmNvbnN0IElOU0VUX0xFRlQgPSAwO1xuY29uc3QgSU5TRVRfVE9QID0gMTtcbmNvbnN0IElOU0VUX1JJR0hUID0gMjtcbmNvbnN0IElOU0VUX0JPVFRPTSA9IDM7XG5cbmxldCB0ZW1wX3V2cyA9IFt7dTogMCwgdjogMH0sIHt1OiAwLCB2OiAwfSwge3U6IDAsIHY6IDB9LCB7dTogMCwgdjogMH1dO1xuXG4vKipcbiAqICEjZW5cbiAqIEEgY2MuU3ByaXRlRnJhbWUgaGFzOjxici8+XG4gKiAgLSB0ZXh0dXJlOiBBIGNjLlRleHR1cmUyRCB0aGF0IHdpbGwgYmUgdXNlZCBieSByZW5kZXIgY29tcG9uZW50czxici8+XG4gKiAgLSByZWN0YW5nbGU6IEEgcmVjdGFuZ2xlIG9mIHRoZSB0ZXh0dXJlXG4gKlxuICogISN6aFxuICog5LiA5LiqIFNwcml0ZUZyYW1lIOWMheWQq++8mjxici8+XG4gKiAgLSDnurnnkIbvvJrkvJrooqvmuLLmn5Pnu4Tku7bkvb/nlKjnmoQgVGV4dHVyZTJEIOWvueixoeOAgjxici8+XG4gKiAgLSDnn6nlvaLvvJrlnKjnurnnkIbkuK3nmoTnn6nlvaLljLrln5/jgIJcbiAqXG4gKiBAY2xhc3MgU3ByaXRlRnJhbWVcbiAqIEBleHRlbmRzIEFzc2V0XG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICogQGV4YW1wbGVcbiAqIC8vIGxvYWQgYSBjYy5TcHJpdGVGcmFtZSB3aXRoIGltYWdlIHBhdGggKFJlY29tbWVuZClcbiAqIHZhciBzZWxmID0gdGhpcztcbiAqIHZhciB1cmwgPSBcInRlc3QgYXNzZXRzL1B1cnBsZU1vbnN0ZXJcIjtcbiAqIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuU3ByaXRlRnJhbWUsIG51bGwsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBTcHJpdGVcIik7XG4gKiAgdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gKiAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gKiAgbm9kZS5wYXJlbnQgPSBzZWxmLm5vZGVcbiAqIH0pO1xuICovXG5sZXQgU3ByaXRlRnJhbWUgPSBjYy5DbGFzcygvKiogQGxlbmRzIGNjLlNwcml0ZUZyYW1lIyAqL3tcbiAgICBuYW1lOiAnY2MuU3ByaXRlRnJhbWUnLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4uL2Fzc2V0cy9DQ0Fzc2V0JyksXG4gICAgbWl4aW5zOiBbRXZlbnRUYXJnZXRdLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBVc2UgdGhpcyBwcm9wZXJ0eSB0byBzZXQgdGV4dHVyZSB3aGVuIGxvYWRpbmcgZGVwZW5kZW5jeVxuICAgICAgICBfdGV4dHVyZVNldHRlcjoge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgRWRpdG9yLmlzQnVpbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBidWlsZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgIT09IHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRvcCBib3JkZXIgb2YgdGhlIHNwcml0ZVxuICAgICAgICAgKiAhI3poIHNwcml0ZSDnmoTpobbpg6jovrnmoYZcbiAgICAgICAgICogQHByb3BlcnR5IGluc2V0VG9wXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0VG9wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfVE9QXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEJvdHRvbSBib3JkZXIgb2YgdGhlIHNwcml0ZVxuICAgICAgICAgKiAhI3poIHNwcml0ZSDnmoTlupXpg6jovrnmoYZcbiAgICAgICAgICogQHByb3BlcnR5IGluc2V0Qm90dG9tXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0Qm90dG9tOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfQk9UVE9NXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIExlZnQgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICogISN6aCBzcHJpdGUg55qE5bem6L656L655qGGXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldExlZnRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgaW5zZXRMZWZ0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2xpY2VkVVYoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmlnaHQgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICogISN6aCBzcHJpdGUg55qE5bem6L656L655qGGXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldFJpZ2h0XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0UmlnaHQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYXBJbnNldHNbSU5TRVRfUklHSFRdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1JJR0hUXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29uc3RydWN0b3Igb2YgU3ByaXRlRnJhbWUgY2xhc3MuXG4gICAgICogISN6aFxuICAgICAqIFNwcml0ZUZyYW1lIOexu+eahOaehOmAoOWHveaVsOOAglxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xUZXh0dXJlMkR9IFtmaWxlbmFtZV1cbiAgICAgKiBAcGFyYW0ge1JlY3R9IFtyZWN0XVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3JvdGF0ZWRdIC0gV2hldGhlciB0aGUgZnJhbWUgaXMgcm90YXRlZCBpbiB0aGUgdGV4dHVyZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gW29mZnNldF0gLSBUaGUgb2Zmc2V0IG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZVxuICAgICAqIEBwYXJhbSB7U2l6ZX0gW29yaWdpbmFsU2l6ZV0gLSBUaGUgc2l6ZSBvZiB0aGUgZnJhbWUgaW4gdGhlIHRleHR1cmVcbiAgICAgKi9cbiAgICBjdG9yOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIEluaXQgRXZlbnRUYXJnZXQgZGF0YVxuICAgICAgICBFdmVudFRhcmdldC5jYWxsKHRoaXMpO1xuXG4gICAgICAgIGxldCBmaWxlbmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgbGV0IHJlY3QgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIGxldCByb3RhdGVkID0gYXJndW1lbnRzWzJdO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gYXJndW1lbnRzWzNdO1xuICAgICAgICBsZXQgb3JpZ2luYWxTaXplID0gYXJndW1lbnRzWzRdO1xuXG4gICAgICAgIC8vIHRoZSBsb2NhdGlvbiBvZiB0aGUgc3ByaXRlIG9uIHJlbmRlcmluZyB0ZXh0dXJlXG4gICAgICAgIHRoaXMuX3JlY3QgPSBudWxsO1xuICAgICAgICAvLyB1diBkYXRhIG9mIGZyYW1lXG4gICAgICAgIHRoaXMudXYgPSBbXTtcbiAgICAgICAgLy8gdGV4dHVyZSBvZiBmcmFtZVxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gbnVsbDtcbiAgICAgICAgLy8gc3RvcmUgb3JpZ2luYWwgaW5mbyBiZWZvcmUgcGFja2VkIHRvIGR5bmFtaWMgYXRsYXNcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwgPSBudWxsO1xuXG4gICAgICAgIC8vIGZvciB0cmltbWluZ1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBudWxsO1xuXG4gICAgICAgIC8vIGZvciB0cmltbWluZ1xuICAgICAgICB0aGlzLl9vcmlnaW5hbFNpemUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3JvdGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9mbGlwWCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9mbGlwWSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2NhcEluc2V0cyA9IFswLCAwLCAwLCAwXTtcblxuICAgICAgICB0aGlzLnV2U2xpY2VkID0gW107XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgLy8gQXRsYXMgYXNzZXQgdXVpZFxuICAgICAgICAgICAgdGhpcy5fYXRsYXNVdWlkID0gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmlsZW5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKGZpbGVuYW1lLCByZWN0LCByb3RhdGVkLCBvZmZzZXQsIG9yaWdpbmFsU2l6ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3RvZG8gbG9nIEVycm9yXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHRleHR1cmUgaGF2ZSBiZWVuIGxvYWRlZFxuICAgICAqICEjemgg6L+U5Zue5piv5ZCm5bey5Yqg6L2957q555CGXG4gICAgICogQG1ldGhvZCB0ZXh0dXJlTG9hZGVkXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGV4dHVyZUxvYWRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZSAmJiB0aGlzLl90ZXh0dXJlLmxvYWRlZDtcbiAgICB9LFxuXG4gICAgb25UZXh0dXJlTG9hZGVkIChjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgICAgIGlmICh0aGlzLnRleHR1cmVMb2FkZWQoKSkge1xuICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdsb2FkJywgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgICAgICB0aGlzLmVuc3VyZUxvYWRUZXh0dXJlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyByb3RhdGVkIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6I635Y+WIFNwcml0ZUZyYW1lIOaYr+WQpuaXi+i9rFxuICAgICAqIEBtZXRob2QgaXNSb3RhdGVkXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1JvdGF0ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JvdGF0ZWQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyByb3RhdGVkIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6K6+572uIFNwcml0ZUZyYW1lIOaYr+WQpuaXi+i9rFxuICAgICAqIEBtZXRob2Qgc2V0Um90YXRlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYlJvdGF0ZWRcbiAgICAgKi9cbiAgICBzZXRSb3RhdGVkOiBmdW5jdGlvbiAoYlJvdGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fcm90YXRlZCA9IGJSb3RhdGVkO1xuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSlcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB3aGV0aGVyIHRoZSBzcHJpdGUgZnJhbWUgaXMgZmxpcCB4IGF4aXMgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5YgU3ByaXRlRnJhbWUg5piv5ZCm5Y+N6L2sIHgg6L20XG4gICAgICogQG1ldGhvZCBpc0ZsaXBYXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZsaXBYOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbGlwWDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyBmbGlwIHkgYXhpcyBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiOt+WPliBTcHJpdGVGcmFtZSDmmK/lkKblj43ovawgeSDovbRcbiAgICAgKiBAbWV0aG9kIGlzRmxpcFlcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRmxpcFk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZsaXBZO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCB3aGV0aGVyIHRoZSBzcHJpdGUgZnJhbWUgaXMgZmxpcCB4IGF4aXMgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDorr7nva4gU3ByaXRlRnJhbWUg5piv5ZCm57+76L2sIHgg6L20XG4gICAgICogQG1ldGhvZCBzZXRGbGlwWFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFhcbiAgICAgKi9cbiAgICBzZXRGbGlwWDogZnVuY3Rpb24gKGZsaXBYKSB7XG4gICAgICAgIHRoaXMuX2ZsaXBYID0gZmxpcFg7XG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVVVigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyBmbGlwIHkgYXhpcyBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9riBTcHJpdGVGcmFtZSDmmK/lkKbnv7vovawgeSDovbRcbiAgICAgKiBAbWV0aG9kIHNldEZsaXBZXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmbGlwWVxuICAgICAqL1xuICAgIHNldEZsaXBZOiBmdW5jdGlvbiAoZmxpcFkpIHtcbiAgICAgICAgdGhpcy5fZmxpcFkgPSBmbGlwWTtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSByZWN0IG9mIHRoZSBzcHJpdGUgZnJhbWUgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5YgU3ByaXRlRnJhbWUg55qE57q555CG55+p5b2i5Yy65Z+fXG4gICAgICogQG1ldGhvZCBnZXRSZWN0XG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBnZXRSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5yZWN0KHRoaXMuX3JlY3QpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIHJlY3Qgb2YgdGhlIHNwcml0ZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9riBTcHJpdGVGcmFtZSDnmoTnurnnkIbnn6nlvaLljLrln59cbiAgICAgKiBAbWV0aG9kIHNldFJlY3RcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHJlY3RcbiAgICAgKi9cbiAgICBzZXRSZWN0OiBmdW5jdGlvbiAocmVjdCkge1xuICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpXG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVVVigpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBvcmlnaW5hbCBzaXplIG9mIHRoZSB0cmltbWVkIGltYWdlLlxuICAgICAqICEjemgg6I635Y+W5L+u5Ymq5YmN55qE5Y6f5aeL5aSn5bCPXG4gICAgICogQG1ldGhvZCBnZXRPcmlnaW5hbFNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfVxuICAgICAqL1xuICAgIGdldE9yaWdpbmFsU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9vcmlnaW5hbFNpemUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIG9yaWdpbmFsIHNpemUgb2YgdGhlIHRyaW1tZWQgaW1hZ2UuXG4gICAgICogISN6aCDorr7nva7kv67liarliY3nmoTljp/lp4vlpKflsI9cbiAgICAgKiBAbWV0aG9kIHNldE9yaWdpbmFsU2l6ZVxuICAgICAqIEBwYXJhbSB7U2l6ZX0gc2l6ZVxuICAgICAqL1xuICAgIHNldE9yaWdpbmFsU2l6ZTogZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsU2l6ZSA9IGNjLnNpemUoc2l6ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFNpemUud2lkdGggPSBzaXplLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgdGV4dHVyZSBvZiB0aGUgZnJhbWUuXG4gICAgICogISN6aCDojrflj5bkvb/nlKjnmoTnurnnkIblrp7kvotcbiAgICAgKiBAbWV0aG9kIGdldFRleHR1cmVcbiAgICAgKiBAcmV0dXJuIHtUZXh0dXJlMkR9XG4gICAgICovXG4gICAgZ2V0VGV4dHVyZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dHVyZTtcbiAgICB9LFxuXG4gICAgX3RleHR1cmVMb2FkZWRDYWxsYmFjayAoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlO1xuICAgICAgICBpZiAoIXRleHR1cmUpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyVGV4dHVyZSBjYWxsZWQgd2hpbGUgbG9hZGluZyB0ZXh0dXJlLi4uXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHcgPSB0ZXh0dXJlLndpZHRoLCBoID0gdGV4dHVyZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHNlbGYuX3JlY3QpIHtcbiAgICAgICAgICAgIHNlbGYuX2NoZWNrUmVjdChzZWxmLl90ZXh0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX3JlY3QgPSBjYy5yZWN0KDAsIDAsIHcsIGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLl9vcmlnaW5hbFNpemUpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0T3JpZ2luYWxTaXplKGNjLnNpemUodywgaCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzZWxmLl9vZmZzZXQpIHtcbiAgICAgICAgICAgIHNlbGYuc2V0T2Zmc2V0KGNjLnYyKDAsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuX2NhbGN1bGF0ZVVWKCk7XG5cbiAgICAgICAgLy8gZGlzcGF0Y2ggJ2xvYWQnIGV2ZW50IG9mIGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIHNlbGYuZW1pdChcImxvYWRcIik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogISNlbiBTZXRzIHRoZSB0ZXh0dXJlIG9mIHRoZSBmcmFtZS5cbiAgICAgKiAhI3poIOiuvue9ruS9v+eUqOeahOe6ueeQhuWunuS+i+OAglxuICAgICAqIEBtZXRob2QgX3JlZnJlc2hUZXh0dXJlXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVcbiAgICAgKi9cbiAgICBfcmVmcmVzaFRleHR1cmU6IGZ1bmN0aW9uICh0ZXh0dXJlKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICBpZiAodGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmVMb2FkZWRDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dHVyZS5vbmNlKCdsb2FkJywgdGhpcy5fdGV4dHVyZUxvYWRlZENhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIG9mZnNldCBvZiB0aGUgZnJhbWUgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5blgY/np7vph49cbiAgICAgKiBAbWV0aG9kIGdldE9mZnNldFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgZ2V0T2Zmc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9vZmZzZXQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIG9mZnNldCBvZiB0aGUgZnJhbWUgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDorr7nva7lgY/np7vph49cbiAgICAgKiBAbWV0aG9kIHNldE9mZnNldFxuICAgICAqIEBwYXJhbSB7VmVjMn0gb2Zmc2V0c1xuICAgICAqL1xuICAgIHNldE9mZnNldDogZnVuY3Rpb24gKG9mZnNldHMpIHtcbiAgICAgICAgdGhpcy5fb2Zmc2V0ID0gY2MudjIob2Zmc2V0cyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2xvbmUgdGhlIHNwcml0ZSBmcmFtZS5cbiAgICAgKiAhI3poIOWFi+mahiBTcHJpdGVGcmFtZVxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtTcHJpdGVGcmFtZX1cbiAgICAgKi9cbiAgICBjbG9uZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3ByaXRlRnJhbWUodGhpcy5fdGV4dHVyZSwgdGhpcy5nZXRSZWN0KCksIHRoaXMuX3JvdGF0ZWQsIHRoaXMuZ2V0T2Zmc2V0KCksIHRoaXMuZ2V0T3JpZ2luYWxTaXplKCkpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBTcHJpdGVGcmFtZSB3aXRoIFRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCBhbmQgb3JpZ2luYWxTaXplLjxici8+XG4gICAgICogISN6aCDpgJrov4cgVGV4dHVyZe+8jHJlY3TvvIxyb3RhdGVk77yMb2Zmc2V0IOWSjCBvcmlnaW5hbFNpemUg6K6+572uIFNwcml0ZUZyYW1l44CCXG4gICAgICogQG1ldGhvZCBzZXRUZXh0dXJlXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1JlY3R9IFtyZWN0PW51bGxdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcm90YXRlZD1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvZmZzZXQ9Y2MudjIoMCwwKV1cbiAgICAgKiBAcGFyYW0ge1NpemV9IFtvcmlnaW5hbFNpemU9cmVjdC5zaXplXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgc2V0VGV4dHVyZTogZnVuY3Rpb24gKHRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCwgb3JpZ2luYWxTaXplKSB7XG4gICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luYWxTaXplKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbmFsU2l6ZShvcmlnaW5hbFNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JvdGF0ZWQgPSByb3RhdGVkIHx8IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzQwMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQgJiYgdGhpcy5fdGV4dHVyZSAhPT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGV4dHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJZiBhIGxvYWRpbmcgc2NlbmUgKG9yIHByZWZhYikgaXMgbWFya2VkIGFzIGBhc3luY0xvYWRBc3NldHNgLCBhbGwgdGhlIHRleHR1cmVzIG9mIHRoZSBTcHJpdGVGcmFtZSB3aGljaFxuICAgICAqIGFzc29jaWF0ZWQgYnkgdXNlcidzIGN1c3RvbSBDb21wb25lbnRzIGluIHRoZSBzY2VuZSwgd2lsbCBub3QgcHJlbG9hZCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIFRoZXNlIHRleHR1cmVzIHdpbGwgYmUgbG9hZCB3aGVuIFNwcml0ZSBjb21wb25lbnQgaXMgZ29pbmcgdG8gcmVuZGVyIHRoZSBTcHJpdGVGcmFtZXMuXG4gICAgICogWW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50IHRvIGxvYWQgdGhlIHRleHR1cmUgZWFybHkuXG4gICAgICogISN6aCDlvZPliqDovb3kuK3nmoTlnLrmma/miJYgUHJlZmFiIOiiq+agh+iusOS4uiBgYXN5bmNMb2FkQXNzZXRzYCDml7bvvIznlKjmiLflnKjlnLrmma/kuK3nlLHoh6rlrprkuYnnu4Tku7blhbPogZTliLDnmoTmiYDmnIkgU3ByaXRlRnJhbWUg55qE6LS05Zu+6YO95LiN5Lya6KKr5o+Q5YmN5Yqg6L2944CCXG4gICAgICog5Y+q5pyJ5b2TIFNwcml0ZSDnu4Tku7bopoHmuLLmn5Pov5nkupsgU3ByaXRlRnJhbWUg5pe277yM5omN5Lya5qOA5p+l6LS05Zu+5piv5ZCm5Yqg6L2944CC5aaC5p6c5L2g5biM5pyb5Yqg6L296L+H56iL5o+Q5YmN77yM5L2g5Y+v5Lul5omL5bel6LCD55So6L+Z5Liq5pa55rOV44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGVuc3VyZUxvYWRUZXh0dXJlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoc3ByaXRlRnJhbWUudGV4dHVyZUxvYWRlZCgpKSB7XG4gICAgICogICAgIHRoaXMuX29uU3ByaXRlRnJhbWVMb2FkZWQoKTtcbiAgICAgKiB9XG4gICAgICogZWxzZSB7XG4gICAgICogICAgIHNwcml0ZUZyYW1lLm9uY2UoJ2xvYWQnLCB0aGlzLl9vblNwcml0ZUZyYW1lTG9hZGVkLCB0aGlzKTtcbiAgICAgKiAgICAgc3ByaXRlRnJhbWUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgKiB9XG4gICAgICovXG4gICAgZW5zdXJlTG9hZFRleHR1cmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBsb2FkIGV4aXN0cyB0ZXh0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGhpcy5fdGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHRoaXMuX3RleHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJZiB5b3UgZG8gbm90IG5lZWQgdG8gdXNlIHRoZSBTcHJpdGVGcmFtZSB0ZW1wb3JhcmlseSwgeW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIHNvIHRoYXQgaXRzIHRleHR1cmUgY291bGQgYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuIFRoZW4gd2hlbiB5b3UgbmVlZCB0byByZW5kZXIgdGhlIFNwcml0ZUZyYW1lLCB5b3Ugc2hvdWxkIGNhbGwgYGVuc3VyZUxvYWRUZXh0dXJlYCBtYW51YWxseSB0byByZWxvYWQgdGV4dHVyZS5cbiAgICAgKiAhI3poXG4gICAgICog5b2T5L2g5pqC5pe25LiN5YaN5L2/55So6L+Z5LiqIFNwcml0ZUZyYW1lIOaXtu+8jOWPr+S7peiwg+eUqOi/meS4quaWueazleadpeS/neivgeW8leeUqOeahOi0tOWbvuWvueixoeiDveiiqyBHQ+OAgueEtuWQjuW9k+S9oOimgea4suafkyBTcHJpdGVGcmFtZSDml7bvvIzkvaDpnIDopoHmiYvliqjosIPnlKggYGVuc3VyZUxvYWRUZXh0dXJlYCDmnaXph43mlrDliqDovb3otLTlm77jgIJcbiAgICAgKiBAbWV0aG9kIGNsZWFyVGV4dHVyZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuMVxuICAgICAqL1xuXG4gICAgX2NoZWNrUmVjdDogZnVuY3Rpb24gKHRleHR1cmUpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgbWF4WCA9IHJlY3QueCwgbWF4WSA9IHJlY3QueTtcbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0ZWQpIHtcbiAgICAgICAgICAgIG1heFggKz0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBtYXhZICs9IHJlY3Qud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXhYICs9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBtYXhZICs9IHJlY3QuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXhYID4gdGV4dHVyZS53aWR0aCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzMzAwLCB0ZXh0dXJlLm5hdGl2ZVVybCArICcvJyArIHRoaXMubmFtZSwgbWF4WCwgdGV4dHVyZS53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heFkgPiB0ZXh0dXJlLmhlaWdodCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNDAwLCB0ZXh0dXJlLm5hdGl2ZVVybCArICcvJyArIHRoaXMubmFtZSwgbWF4WSwgdGV4dHVyZS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mbGlwWFkgKHV2cykge1xuICAgICAgICBpZiAodGhpcy5fZmxpcFgpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZzWzBdO1xuICAgICAgICAgICAgdXZzWzBdID0gdXZzWzFdO1xuICAgICAgICAgICAgdXZzWzFdID0gdGVtcFZhbDtcblxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2c1syXTtcbiAgICAgICAgICAgIHV2c1syXSA9IHV2c1szXTtcbiAgICAgICAgICAgIHV2c1szXSA9IHRlbXBWYWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZmxpcFkpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZzWzBdO1xuICAgICAgICAgICAgdXZzWzBdID0gdXZzWzJdO1xuICAgICAgICAgICAgdXZzWzJdID0gdGVtcFZhbDtcblxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2c1sxXTtcbiAgICAgICAgICAgIHV2c1sxXSA9IHV2c1szXTtcbiAgICAgICAgICAgIHV2c1szXSA9IHRlbXBWYWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NhbGN1bGF0ZVNsaWNlZFVWICgpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgYXRsYXNXaWR0aCA9IHRoaXMuX3RleHR1cmUud2lkdGg7XG4gICAgICAgIGxldCBhdGxhc0hlaWdodCA9IHRoaXMuX3RleHR1cmUuaGVpZ2h0O1xuICAgICAgICBsZXQgbGVmdFdpZHRoID0gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xuICAgICAgICBsZXQgcmlnaHRXaWR0aCA9IHRoaXMuX2NhcEluc2V0c1tJTlNFVF9SSUdIVF07XG4gICAgICAgIGxldCBjZW50ZXJXaWR0aCA9IHJlY3Qud2lkdGggLSBsZWZ0V2lkdGggLSByaWdodFdpZHRoO1xuICAgICAgICBsZXQgdG9wSGVpZ2h0ID0gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF07XG4gICAgICAgIGxldCBib3R0b21IZWlnaHQgPSB0aGlzLl9jYXBJbnNldHNbSU5TRVRfQk9UVE9NXTtcbiAgICAgICAgbGV0IGNlbnRlckhlaWdodCA9IHJlY3QuaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gYm90dG9tSGVpZ2h0O1xuXG4gICAgICAgIGxldCB1dlNsaWNlZCA9IHRoaXMudXZTbGljZWQ7XG4gICAgICAgIHV2U2xpY2VkLmxlbmd0aCA9IDA7XG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGVkKSB7XG4gICAgICAgICAgICB0ZW1wX3V2c1swXS51ID0gKHJlY3QueCkgLyBhdGxhc1dpZHRoO1xuICAgICAgICAgICAgdGVtcF91dnNbMV0udSA9IChyZWN0LnggKyBib3R0b21IZWlnaHQpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzJdLnUgPSAocmVjdC54ICsgYm90dG9tSGVpZ2h0ICsgY2VudGVySGVpZ2h0KSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS51ID0gKHJlY3QueCArIHJlY3QuaGVpZ2h0KSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS52ID0gKHJlY3QueSkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzJdLnYgPSAocmVjdC55ICsgbGVmdFdpZHRoKSAvIGF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgdGVtcF91dnNbMV0udiA9IChyZWN0LnkgKyBsZWZ0V2lkdGggKyBjZW50ZXJXaWR0aCkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzBdLnYgPSAocmVjdC55ICsgcmVjdC53aWR0aCkgLyBhdGxhc0hlaWdodDtcblxuICAgICAgICAgICAgdGhpcy5fZmxpcFhZKHRlbXBfdXZzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgNDsgKytyb3cpIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93RCA9IHRlbXBfdXZzW3Jvd107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNDsgKytjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbEQgPSB0ZW1wX3V2c1szIC0gY29sXTtcbiAgICAgICAgICAgICAgICAgICAgdXZTbGljZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1OiByb3dELnUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjb2xELnZcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGVtcF91dnNbMF0udSA9IChyZWN0LngpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzFdLnUgPSAocmVjdC54ICsgbGVmdFdpZHRoKSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1syXS51ID0gKHJlY3QueCArIGxlZnRXaWR0aCArIGNlbnRlcldpZHRoKSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS51ID0gKHJlY3QueCArIHJlY3Qud2lkdGgpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzNdLnYgPSAocmVjdC55KSAvIGF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgdGVtcF91dnNbMl0udiA9IChyZWN0LnkgKyB0b3BIZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XG4gICAgICAgICAgICB0ZW1wX3V2c1sxXS52ID0gKHJlY3QueSArIHRvcEhlaWdodCArIGNlbnRlckhlaWdodCkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzBdLnYgPSAocmVjdC55ICsgcmVjdC5oZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZsaXBYWSh0ZW1wX3V2cyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDQ7ICsrcm93KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvd0QgPSB0ZW1wX3V2c1tyb3ddO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDQ7ICsrY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xEID0gdGVtcF91dnNbY29sXTtcbiAgICAgICAgICAgICAgICAgICAgdXZTbGljZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1OiBjb2xELnUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiByb3dELnZcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXREeW5hbWljQXRsYXNGcmFtZSAoZnJhbWUpIHtcbiAgICAgICAgaWYgKCFmcmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX29yaWdpbmFsID0ge1xuICAgICAgICAgICAgX3RleHR1cmUgOiB0aGlzLl90ZXh0dXJlLFxuICAgICAgICAgICAgX3ggOiB0aGlzLl9yZWN0LngsXG4gICAgICAgICAgICBfeSA6IHRoaXMuX3JlY3QueVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gZnJhbWUudGV4dHVyZTtcbiAgICAgICAgdGhpcy5fcmVjdC54ID0gZnJhbWUueDtcbiAgICAgICAgdGhpcy5fcmVjdC55ID0gZnJhbWUueTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcbiAgICB9LFxuXG4gICAgX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3JlY3QueCA9IHRoaXMuX29yaWdpbmFsLl94O1xuICAgICAgICB0aGlzLl9yZWN0LnkgPSB0aGlzLl9vcmlnaW5hbC5feTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRoaXMuX29yaWdpbmFsLl90ZXh0dXJlO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcblxuICAgIF9jYWxjdWxhdGVVViAoKSB7XG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5fcmVjdCxcbiAgICAgICAgICAgIHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlLFxuICAgICAgICAgICAgdXYgPSB0aGlzLnV2LFxuICAgICAgICAgICAgdGV4dyA9IHRleHR1cmUud2lkdGgsXG4gICAgICAgICAgICB0ZXhoID0gdGV4dHVyZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0ZWQpIHtcbiAgICAgICAgICAgIGxldCBsID0gdGV4dyA9PT0gMCA/IDAgOiByZWN0LnggLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LmhlaWdodCkgLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IGIgPSB0ZXhoID09PSAwID8gMCA6IChyZWN0LnkgKyByZWN0LndpZHRoKSAvIHRleGg7XG4gICAgICAgICAgICBsZXQgdCA9IHRleGggPT09IDAgPyAwIDogcmVjdC55IC8gdGV4aDtcbiAgICAgICAgICAgIHV2WzBdID0gbDtcbiAgICAgICAgICAgIHV2WzFdID0gdDtcbiAgICAgICAgICAgIHV2WzJdID0gbDtcbiAgICAgICAgICAgIHV2WzNdID0gYjtcbiAgICAgICAgICAgIHV2WzRdID0gcjtcbiAgICAgICAgICAgIHV2WzVdID0gdDtcbiAgICAgICAgICAgIHV2WzZdID0gcjtcbiAgICAgICAgICAgIHV2WzddID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsID0gdGV4dyA9PT0gMCA/IDAgOiByZWN0LnggLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LndpZHRoKSAvIHRleHc7XG4gICAgICAgICAgICBsZXQgYiA9IHRleGggPT09IDAgPyAwIDogKHJlY3QueSArIHJlY3QuaGVpZ2h0KSAvIHRleGg7XG4gICAgICAgICAgICBsZXQgdCA9IHRleGggPT09IDAgPyAwIDogcmVjdC55IC8gdGV4aDtcbiAgICAgICAgICAgIHV2WzBdID0gbDtcbiAgICAgICAgICAgIHV2WzFdID0gYjtcbiAgICAgICAgICAgIHV2WzJdID0gcjtcbiAgICAgICAgICAgIHV2WzNdID0gYjtcbiAgICAgICAgICAgIHV2WzRdID0gbDtcbiAgICAgICAgICAgIHV2WzVdID0gdDtcbiAgICAgICAgICAgIHV2WzZdID0gcjtcbiAgICAgICAgICAgIHV2WzddID0gdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mbGlwWCkge1xuICAgICAgICAgICAgbGV0IHRlbXBWYWwgPSB1dlswXTtcbiAgICAgICAgICAgIHV2WzBdID0gdXZbMl07XG4gICAgICAgICAgICB1dlsyXSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dlsxXTtcbiAgICAgICAgICAgIHV2WzFdID0gdXZbM107XG4gICAgICAgICAgICB1dlszXSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dls0XTtcbiAgICAgICAgICAgIHV2WzRdID0gdXZbNl07XG4gICAgICAgICAgICB1dls2XSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dls1XTtcbiAgICAgICAgICAgIHV2WzVdID0gdXZbN107XG4gICAgICAgICAgICB1dls3XSA9IHRlbXBWYWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZmxpcFkpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZbMF07XG4gICAgICAgICAgICB1dlswXSA9IHV2WzRdO1xuICAgICAgICAgICAgdXZbNF0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbMV07XG4gICAgICAgICAgICB1dlsxXSA9IHV2WzVdO1xuICAgICAgICAgICAgdXZbNV0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbMl07XG4gICAgICAgICAgICB1dlsyXSA9IHV2WzZdO1xuICAgICAgICAgICAgdXZbNl0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbM107XG4gICAgICAgICAgICB1dlszXSA9IHV2WzddO1xuICAgICAgICAgICAgdXZbN10gPSB0ZW1wVmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzID0gdGhpcy52ZXJ0aWNlcztcbiAgICAgICAgaWYgKHZlcnRpY2VzKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5udS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmVydGljZXMubnYubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGljZXMudS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLm51W2ldID0gdmVydGljZXMudVtpXS90ZXh3O1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLm52W2ldID0gdmVydGljZXMudltpXS90ZXhoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2xpY2VkVVYoKTtcbiAgICB9LFxuXG4gICAgLy8gU0VSSUFMSVpBVElPTlxuXG4gICAgX3NlcmlhbGl6ZTogKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiBmdW5jdGlvbiAoZXhwb3J0aW5nLCBjdHgpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0O1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX29yaWdpbmFsU2l6ZTtcbiAgICAgICAgbGV0IHV1aWQ7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZTtcbiAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgIHV1aWQgPSB0ZXh0dXJlLl91dWlkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuX3RleHR1cmVGaWxlbmFtZTtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gRWRpdG9yLlV0aWxzLlV1aWRDYWNoZS51cmxUb1V1aWQodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodXVpZCAmJiBleHBvcnRpbmcpIHtcbiAgICAgICAgICAgIHV1aWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmNvbXByZXNzVXVpZCh1dWlkLCB0cnVlKTtcbiAgICAgICAgICAgIGN0eC5kZXBlbmRzT24oJ190ZXh0dXJlU2V0dGVyJywgdXVpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmVydGljZXM7XG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2VzKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcyA9IHtcbiAgICAgICAgICAgICAgICB0cmlhbmdsZXM6IHRoaXMudmVydGljZXMudHJpYW5nbGVzLFxuICAgICAgICAgICAgICAgIHg6IHRoaXMudmVydGljZXMueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnZlcnRpY2VzLnksXG4gICAgICAgICAgICAgICAgdTogdGhpcy52ZXJ0aWNlcy51LFxuICAgICAgICAgICAgICAgIHY6IHRoaXMudmVydGljZXMudlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLl9uYW1lLFxuICAgICAgICAgICAgdGV4dHVyZTogKCFleHBvcnRpbmcgJiYgdXVpZCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgYXRsYXM6IGV4cG9ydGluZyA/IHVuZGVmaW5lZCA6IHRoaXMuX2F0bGFzVXVpZCwgIC8vIHN0cmlwIGZyb20ganNvbiBpZiBleHBvcnRpbmdcbiAgICAgICAgICAgIHJlY3Q6IHJlY3QgPyBbcmVjdC54LCByZWN0LnksIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0XSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0ID8gW29mZnNldC54LCBvZmZzZXQueV0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvcmlnaW5hbFNpemU6IHNpemUgPyBbc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHRdIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcm90YXRlZDogdGhpcy5fcm90YXRlZCA/IDEgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjYXBJbnNldHM6IHRoaXMuX2NhcEluc2V0cyxcbiAgICAgICAgICAgIHZlcnRpY2VzOiB2ZXJ0aWNlc1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBfZGVzZXJpYWxpemU6IGZ1bmN0aW9uIChkYXRhLCBoYW5kbGUpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBkYXRhLnJlY3Q7XG4gICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZWN0ID0gbmV3IGNjLlJlY3QocmVjdFswXSwgcmVjdFsxXSwgcmVjdFsyXSwgcmVjdFszXSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9mZnNldChuZXcgY2MuVmVjMihkYXRhLm9mZnNldFswXSwgZGF0YS5vZmZzZXRbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5vcmlnaW5hbFNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0T3JpZ2luYWxTaXplKG5ldyBjYy5TaXplKGRhdGEub3JpZ2luYWxTaXplWzBdLCBkYXRhLm9yaWdpbmFsU2l6ZVsxXSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JvdGF0ZWQgPSBkYXRhLnJvdGF0ZWQgPT09IDE7XG4gICAgICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XG5cbiAgICAgICAgbGV0IGNhcEluc2V0cyA9IGRhdGEuY2FwSW5zZXRzO1xuICAgICAgICBpZiAoY2FwSW5zZXRzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfTEVGVF0gPSBjYXBJbnNldHNbSU5TRVRfTEVGVF07XG4gICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfVE9QXSA9IGNhcEluc2V0c1tJTlNFVF9UT1BdO1xuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1JJR0hUXSA9IGNhcEluc2V0c1tJTlNFVF9SSUdIVF07XG4gICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfQk9UVE9NXSA9IGNhcEluc2V0c1tJTlNFVF9CT1RUT01dO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fYXRsYXNVdWlkID0gZGF0YS5hdGxhcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmVydGljZXMgPSBkYXRhLnZlcnRpY2VzO1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNlcykge1xuICAgICAgICAgICAgLy8gaW5pdGlhbGl6ZSBub3JtYWwgdXYgYXJyYXlzXG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLm51ID0gW107XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2VzLm52ID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIUNDX0JVSUxEKSB7XG4gICAgICAgICAgICAvLyBtYW51YWxseSBsb2FkIHRleHR1cmUgdmlhIF90ZXh0dXJlU2V0dGVyXG4gICAgICAgICAgICBsZXQgdGV4dHVyZVV1aWQgPSBkYXRhLnRleHR1cmU7XG4gICAgICAgICAgICBpZiAodGV4dHVyZVV1aWQpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGUucmVzdWx0LnB1c2godGhpcywgJ190ZXh0dXJlU2V0dGVyJywgdGV4dHVyZVV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmxldCBwcm90byA9IFNwcml0ZUZyYW1lLnByb3RvdHlwZTtcblxucHJvdG8uY29weVdpdGhab25lID0gcHJvdG8uY2xvbmU7XG5wcm90by5jb3B5ID0gcHJvdG8uY2xvbmU7XG5wcm90by5pbml0V2l0aFRleHR1cmUgPSBwcm90by5zZXRUZXh0dXJlO1xuXG5jYy5TcHJpdGVGcmFtZSA9IFNwcml0ZUZyYW1lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZUZyYW1lO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=