
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

var textureUtil = require('../utils/texture-util');

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
  statics: {
    _parseDepsFromJson: function _parseDepsFromJson(json) {
      return [cc.assetManager.utils.decodeUuid(json.content.texture)];
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
    return new SpriteFrame(this._texture, this._rect, this._rotated, this._offset, this._originalSize);
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
  _serialize: CC_EDITOR && function (exporting) {
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
      texture: uuid || undefined,
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
    } // load texture via _textureSetter


    var textureUuid = data.texture;

    if (textureUuid) {
      handle.result.push(this, '_textureSetter', textureUuid);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1Nwcml0ZUZyYW1lLmpzIl0sIm5hbWVzIjpbIkV2ZW50VGFyZ2V0IiwicmVxdWlyZSIsInRleHR1cmVVdGlsIiwiSU5TRVRfTEVGVCIsIklOU0VUX1RPUCIsIklOU0VUX1JJR0hUIiwiSU5TRVRfQk9UVE9NIiwidGVtcF91dnMiLCJ1IiwidiIsIlNwcml0ZUZyYW1lIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJtaXhpbnMiLCJwcm9wZXJ0aWVzIiwiX3RleHR1cmVTZXR0ZXIiLCJzZXQiLCJ0ZXh0dXJlIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNCdWlsZGVyIiwiX3RleHR1cmUiLCJfcmVmcmVzaFRleHR1cmUiLCJpbnNldFRvcCIsImdldCIsIl9jYXBJbnNldHMiLCJ2YWx1ZSIsIl9jYWxjdWxhdGVTbGljZWRVViIsImluc2V0Qm90dG9tIiwiaW5zZXRMZWZ0IiwiaW5zZXRSaWdodCIsInN0YXRpY3MiLCJfcGFyc2VEZXBzRnJvbUpzb24iLCJqc29uIiwiYXNzZXRNYW5hZ2VyIiwidXRpbHMiLCJkZWNvZGVVdWlkIiwiY29udGVudCIsImN0b3IiLCJjYWxsIiwiZmlsZW5hbWUiLCJhcmd1bWVudHMiLCJyZWN0Iiwicm90YXRlZCIsIm9mZnNldCIsIm9yaWdpbmFsU2l6ZSIsIl9yZWN0IiwidXYiLCJfb3JpZ2luYWwiLCJfb2Zmc2V0IiwiX29yaWdpbmFsU2l6ZSIsIl9yb3RhdGVkIiwiX2ZsaXBYIiwiX2ZsaXBZIiwidmVydGljZXMiLCJ1dlNsaWNlZCIsIl9hdGxhc1V1aWQiLCJ1bmRlZmluZWQiLCJzZXRUZXh0dXJlIiwidGV4dHVyZUxvYWRlZCIsImxvYWRlZCIsIm9uVGV4dHVyZUxvYWRlZCIsImNhbGxiYWNrIiwidGFyZ2V0Iiwib25jZSIsImVuc3VyZUxvYWRUZXh0dXJlIiwiaXNSb3RhdGVkIiwic2V0Um90YXRlZCIsImJSb3RhdGVkIiwiX2NhbGN1bGF0ZVVWIiwiaXNGbGlwWCIsImlzRmxpcFkiLCJzZXRGbGlwWCIsImZsaXBYIiwic2V0RmxpcFkiLCJmbGlwWSIsImdldFJlY3QiLCJzZXRSZWN0IiwiZ2V0T3JpZ2luYWxTaXplIiwic2l6ZSIsInNldE9yaWdpbmFsU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0VGV4dHVyZSIsIl90ZXh0dXJlTG9hZGVkQ2FsbGJhY2siLCJzZWxmIiwidyIsImgiLCJfY2hlY2tSZWN0Iiwic2V0T2Zmc2V0IiwidjIiLCJlbWl0IiwiZ2V0T2Zmc2V0Iiwib2Zmc2V0cyIsImNsb25lIiwiZXJyb3JJRCIsIlRleHR1cmUyRCIsInBvc3RMb2FkTmF0aXZlIiwibWF4WCIsIngiLCJtYXhZIiwieSIsIm5hdGl2ZVVybCIsIl9mbGlwWFkiLCJ1dnMiLCJ0ZW1wVmFsIiwiYXRsYXNXaWR0aCIsImF0bGFzSGVpZ2h0IiwibGVmdFdpZHRoIiwicmlnaHRXaWR0aCIsImNlbnRlcldpZHRoIiwidG9wSGVpZ2h0IiwiYm90dG9tSGVpZ2h0IiwiY2VudGVySGVpZ2h0IiwibGVuZ3RoIiwicm93Iiwicm93RCIsImNvbCIsImNvbEQiLCJwdXNoIiwiX3NldER5bmFtaWNBdGxhc0ZyYW1lIiwiZnJhbWUiLCJfeCIsIl95IiwiX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJ0ZXh3IiwidGV4aCIsImwiLCJyIiwiYiIsInQiLCJudSIsIm52IiwiaSIsIl9zZXJpYWxpemUiLCJleHBvcnRpbmciLCJ1dWlkIiwiX3V1aWQiLCJ1cmwiLCJfdGV4dHVyZUZpbGVuYW1lIiwiVXRpbHMiLCJVdWlkQ2FjaGUiLCJ1cmxUb1V1aWQiLCJVdWlkVXRpbHMiLCJjb21wcmVzc1V1aWQiLCJ0cmlhbmdsZXMiLCJfbmFtZSIsImF0bGFzIiwiY2FwSW5zZXRzIiwiX2Rlc2VyaWFsaXplIiwiZGF0YSIsImhhbmRsZSIsIlJlY3QiLCJWZWMyIiwiU2l6ZSIsInRleHR1cmVVdWlkIiwicmVzdWx0IiwicHJvdG8iLCJwcm90b3R5cGUiLCJjb3B5V2l0aFpvbmUiLCJjb3B5IiwiaW5pdFdpdGhUZXh0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O0FBQ2Y7QUFDQSxXQUFLQSxRQUFMLENBQWM2RSxFQUFkLEdBQW1CLEVBQW5CO0FBQ0EsV0FBSzdFLFFBQUwsQ0FBYzhFLEVBQWQsR0FBbUIsRUFBbkI7QUFDSCxLQS9CaUMsQ0FpQ2xDOzs7QUFDQSxRQUFJdUIsV0FBVyxHQUFHTCxJQUFJLENBQUNySSxPQUF2Qjs7QUFDQSxRQUFJMEksV0FBSixFQUFpQjtBQUNiSixNQUFBQSxNQUFNLENBQUNLLE1BQVAsQ0FBY3JDLElBQWQsQ0FBbUIsSUFBbkIsRUFBeUIsZ0JBQXpCLEVBQTJDb0MsV0FBM0M7QUFDSDtBQUNKO0FBOXZCbUQsQ0FBdEMsQ0FBbEI7QUFpd0JBLElBQUlFLEtBQUssR0FBR3BKLFdBQVcsQ0FBQ3FKLFNBQXhCO0FBRUFELEtBQUssQ0FBQ0UsWUFBTixHQUFxQkYsS0FBSyxDQUFDL0QsS0FBM0I7QUFDQStELEtBQUssQ0FBQ0csSUFBTixHQUFhSCxLQUFLLENBQUMvRCxLQUFuQjtBQUNBK0QsS0FBSyxDQUFDSSxlQUFOLEdBQXdCSixLQUFLLENBQUNuRyxVQUE5QjtBQUVBaEQsRUFBRSxDQUFDRCxXQUFILEdBQWlCQSxXQUFqQjtBQUVBeUosTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUosV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAwOC0yMDEwIFJpY2FyZG8gUXVlc2FkYVxuIENvcHlyaWdodCAoYykgMjAxMS0yMDEyIGNvY29zMmQteC5vcmdcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZShcIi4uL2V2ZW50L2V2ZW50LXRhcmdldFwiKTtcbmNvbnN0IHRleHR1cmVVdGlsID0gcmVxdWlyZSgnLi4vdXRpbHMvdGV4dHVyZS11dGlsJyk7XG5cbmNvbnN0IElOU0VUX0xFRlQgPSAwO1xuY29uc3QgSU5TRVRfVE9QID0gMTtcbmNvbnN0IElOU0VUX1JJR0hUID0gMjtcbmNvbnN0IElOU0VUX0JPVFRPTSA9IDM7XG5cbmxldCB0ZW1wX3V2cyA9IFt7dTogMCwgdjogMH0sIHt1OiAwLCB2OiAwfSwge3U6IDAsIHY6IDB9LCB7dTogMCwgdjogMH1dO1xuXG4vKipcbiAqICEjZW5cbiAqIEEgY2MuU3ByaXRlRnJhbWUgaGFzOjxici8+XG4gKiAgLSB0ZXh0dXJlOiBBIGNjLlRleHR1cmUyRCB0aGF0IHdpbGwgYmUgdXNlZCBieSByZW5kZXIgY29tcG9uZW50czxici8+XG4gKiAgLSByZWN0YW5nbGU6IEEgcmVjdGFuZ2xlIG9mIHRoZSB0ZXh0dXJlXG4gKlxuICogISN6aFxuICog5LiA5LiqIFNwcml0ZUZyYW1lIOWMheWQq++8mjxici8+XG4gKiAgLSDnurnnkIbvvJrkvJrooqvmuLLmn5Pnu4Tku7bkvb/nlKjnmoQgVGV4dHVyZTJEIOWvueixoeOAgjxici8+XG4gKiAgLSDnn6nlvaLvvJrlnKjnurnnkIbkuK3nmoTnn6nlvaLljLrln5/jgIJcbiAqXG4gKiBAY2xhc3MgU3ByaXRlRnJhbWVcbiAqIEBleHRlbmRzIEFzc2V0XG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICogQGV4YW1wbGVcbiAqIC8vIGxvYWQgYSBjYy5TcHJpdGVGcmFtZSB3aXRoIGltYWdlIHBhdGggKFJlY29tbWVuZClcbiAqIHZhciBzZWxmID0gdGhpcztcbiAqIHZhciB1cmwgPSBcInRlc3QgYXNzZXRzL1B1cnBsZU1vbnN0ZXJcIjtcbiAqIGNjLnJlc291cmNlcy5sb2FkKHVybCwgY2MuU3ByaXRlRnJhbWUsIG51bGwsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XG4gKiAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZShcIk5ldyBTcHJpdGVcIik7XG4gKiAgdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gKiAgc3ByaXRlLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gKiAgbm9kZS5wYXJlbnQgPSBzZWxmLm5vZGVcbiAqIH0pO1xuICovXG5sZXQgU3ByaXRlRnJhbWUgPSBjYy5DbGFzcygvKiogQGxlbmRzIGNjLlNwcml0ZUZyYW1lIyAqL3tcbiAgICBuYW1lOiAnY2MuU3ByaXRlRnJhbWUnLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4uL2Fzc2V0cy9DQ0Fzc2V0JyksXG4gICAgbWl4aW5zOiBbRXZlbnRUYXJnZXRdLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBVc2UgdGhpcyBwcm9wZXJ0eSB0byBzZXQgdGV4dHVyZSB3aGVuIGxvYWRpbmcgZGVwZW5kZW5jeVxuICAgICAgICBfdGV4dHVyZVNldHRlcjoge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodGV4dHVyZSkge1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgRWRpdG9yLmlzQnVpbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8ganVzdCBidWlsZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUgIT09IHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlZnJlc2hUZXh0dXJlKHRleHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRvcCBib3JkZXIgb2YgdGhlIHNwcml0ZVxuICAgICAgICAgKiAhI3poIHNwcml0ZSDnmoTpobbpg6jovrnmoYZcbiAgICAgICAgICogQHByb3BlcnR5IGluc2V0VG9wXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0VG9wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfVE9QXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEJvdHRvbSBib3JkZXIgb2YgdGhlIHNwcml0ZVxuICAgICAgICAgKiAhI3poIHNwcml0ZSDnmoTlupXpg6jovrnmoYZcbiAgICAgICAgICogQHByb3BlcnR5IGluc2V0Qm90dG9tXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0Qm90dG9tOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYXBJbnNldHNbSU5TRVRfQk9UVE9NXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIExlZnQgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICogISN6aCBzcHJpdGUg55qE5bem6L656L655qGGXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldExlZnRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgaW5zZXRMZWZ0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2xpY2VkVVYoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmlnaHQgYm9yZGVyIG9mIHRoZSBzcHJpdGVcbiAgICAgICAgICogISN6aCBzcHJpdGUg55qE5bem6L656L655qGGXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpbnNldFJpZ2h0XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGluc2V0UmlnaHQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYXBJbnNldHNbSU5TRVRfUklHSFRdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1JJR0hUXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVNsaWNlZFVWKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIF9wYXJzZURlcHNGcm9tSnNvbiAoanNvbikge1xuICAgICAgICAgICAgcmV0dXJuIFtjYy5hc3NldE1hbmFnZXIudXRpbHMuZGVjb2RlVXVpZChqc29uLmNvbnRlbnQudGV4dHVyZSldO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb25zdHJ1Y3RvciBvZiBTcHJpdGVGcmFtZSBjbGFzcy5cbiAgICAgKiAhI3poXG4gICAgICogU3ByaXRlRnJhbWUg57G755qE5p6E6YCg5Ye95pWw44CCXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFRleHR1cmUyRH0gW2ZpbGVuYW1lXVxuICAgICAqIEBwYXJhbSB7UmVjdH0gW3JlY3RdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcm90YXRlZF0gLSBXaGV0aGVyIHRoZSBmcmFtZSBpcyByb3RhdGVkIGluIHRoZSB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb2Zmc2V0XSAtIFRoZSBvZmZzZXQgb2YgdGhlIGZyYW1lIGluIHRoZSB0ZXh0dXJlXG4gICAgICogQHBhcmFtIHtTaXplfSBbb3JpZ2luYWxTaXplXSAtIFRoZSBzaXplIG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZVxuICAgICAqL1xuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSW5pdCBFdmVudFRhcmdldCBkYXRhXG4gICAgICAgIEV2ZW50VGFyZ2V0LmNhbGwodGhpcyk7XG5cbiAgICAgICAgbGV0IGZpbGVuYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgICBsZXQgcmVjdCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgbGV0IHJvdGF0ZWQgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIGxldCBvZmZzZXQgPSBhcmd1bWVudHNbM107XG4gICAgICAgIGxldCBvcmlnaW5hbFNpemUgPSBhcmd1bWVudHNbNF07XG5cbiAgICAgICAgLy8gdGhlIGxvY2F0aW9uIG9mIHRoZSBzcHJpdGUgb24gcmVuZGVyaW5nIHRleHR1cmVcbiAgICAgICAgdGhpcy5fcmVjdCA9IG51bGw7XG4gICAgICAgIC8vIHV2IGRhdGEgb2YgZnJhbWVcbiAgICAgICAgdGhpcy51diA9IFtdO1xuICAgICAgICAvLyB0ZXh0dXJlIG9mIGZyYW1lXG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSBudWxsO1xuICAgICAgICAvLyBzdG9yZSBvcmlnaW5hbCBpbmZvIGJlZm9yZSBwYWNrZWQgdG8gZHluYW1pYyBhdGxhc1xuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XG5cbiAgICAgICAgLy8gZm9yIHRyaW1taW5nXG4gICAgICAgIHRoaXMuX29mZnNldCA9IG51bGw7XG5cbiAgICAgICAgLy8gZm9yIHRyaW1taW5nXG4gICAgICAgIHRoaXMuX29yaWdpbmFsU2l6ZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fcm90YXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2ZsaXBYID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZsaXBZID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy52ZXJ0aWNlcyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fY2FwSW5zZXRzID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgICAgIHRoaXMudXZTbGljZWQgPSBbXTtcblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAvLyBBdGxhcyBhc3NldCB1dWlkXG4gICAgICAgICAgICB0aGlzLl9hdGxhc1V1aWQgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmaWxlbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoZmlsZW5hbWUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCwgb3JpZ2luYWxTaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdG9kbyBsb2cgRXJyb3JcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciB0aGUgdGV4dHVyZSBoYXZlIGJlZW4gbG9hZGVkXG4gICAgICogISN6aCDov5Tlm57mmK/lkKblt7LliqDovb3nurnnkIZcbiAgICAgKiBAbWV0aG9kIHRleHR1cmVMb2FkZWRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0ZXh0dXJlTG9hZGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlICYmIHRoaXMuX3RleHR1cmUubG9hZGVkO1xuICAgIH0sXG5cbiAgICBvblRleHR1cmVMb2FkZWQgKGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZUxvYWRlZCgpKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ2xvYWQnLCBjYWxsYmFjaywgdGFyZ2V0KTtcbiAgICAgICAgICAgIHRoaXMuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIHJvdGF0ZWQgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDojrflj5YgU3ByaXRlRnJhbWUg5piv5ZCm5peL6L2sXG4gICAgICogQG1ldGhvZCBpc1JvdGF0ZWRcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzUm90YXRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIHJvdGF0ZWQgaW4gdGhlIHRleHR1cmUuXG4gICAgICogISN6aCDorr7nva4gU3ByaXRlRnJhbWUg5piv5ZCm5peL6L2sXG4gICAgICogQG1ldGhvZCBzZXRSb3RhdGVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBiUm90YXRlZFxuICAgICAqL1xuICAgIHNldFJvdGF0ZWQ6IGZ1bmN0aW9uIChiUm90YXRlZCkge1xuICAgICAgICB0aGlzLl9yb3RhdGVkID0gYlJvdGF0ZWQ7XG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKVxuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyBmbGlwIHggYXhpcyBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiOt+WPliBTcHJpdGVGcmFtZSDmmK/lkKblj43ovawgeCDovbRcbiAgICAgKiBAbWV0aG9kIGlzRmxpcFhcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRmxpcFg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZsaXBYO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIGZsaXAgeSBheGlzIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6I635Y+WIFNwcml0ZUZyYW1lIOaYr+WQpuWPjei9rCB5IOi9tFxuICAgICAqIEBtZXRob2QgaXNGbGlwWVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGbGlwWTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmxpcFk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHdoZXRoZXIgdGhlIHNwcml0ZSBmcmFtZSBpcyBmbGlwIHggYXhpcyBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9riBTcHJpdGVGcmFtZSDmmK/lkKbnv7vovawgeCDovbRcbiAgICAgKiBAbWV0aG9kIHNldEZsaXBYXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBmbGlwWFxuICAgICAqL1xuICAgIHNldEZsaXBYOiBmdW5jdGlvbiAoZmxpcFgpIHtcbiAgICAgICAgdGhpcy5fZmxpcFggPSBmbGlwWDtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgd2hldGhlciB0aGUgc3ByaXRlIGZyYW1lIGlzIGZsaXAgeSBheGlzIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6K6+572uIFNwcml0ZUZyYW1lIOaYr+WQpue/u+i9rCB5IOi9tFxuICAgICAqIEBtZXRob2Qgc2V0RmxpcFlcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZsaXBZXG4gICAgICovXG4gICAgc2V0RmxpcFk6IGZ1bmN0aW9uIChmbGlwWSkge1xuICAgICAgICB0aGlzLl9mbGlwWSA9IGZsaXBZO1xuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHJlY3Qgb2YgdGhlIHNwcml0ZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiOt+WPliBTcHJpdGVGcmFtZSDnmoTnurnnkIbnn6nlvaLljLrln59cbiAgICAgKiBAbWV0aG9kIGdldFJlY3RcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICAqL1xuICAgIGdldFJlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnJlY3QodGhpcy5fcmVjdCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgcmVjdCBvZiB0aGUgc3ByaXRlIGZyYW1lIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6K6+572uIFNwcml0ZUZyYW1lIOeahOe6ueeQhuefqeW9ouWMuuWfn1xuICAgICAqIEBtZXRob2Qgc2V0UmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICAgICAqL1xuICAgIHNldFJlY3Q6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSlcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIG9yaWdpbmFsIHNpemUgb2YgdGhlIHRyaW1tZWQgaW1hZ2UuXG4gICAgICogISN6aCDojrflj5bkv67liarliY3nmoTljp/lp4vlpKflsI9cbiAgICAgKiBAbWV0aG9kIGdldE9yaWdpbmFsU2l6ZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICovXG4gICAgZ2V0T3JpZ2luYWxTaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5zaXplKHRoaXMuX29yaWdpbmFsU2l6ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgb3JpZ2luYWwgc2l6ZSBvZiB0aGUgdHJpbW1lZCBpbWFnZS5cbiAgICAgKiAhI3poIOiuvue9ruS/ruWJquWJjeeahOWOn+Wni+Wkp+Wwj1xuICAgICAqIEBtZXRob2Qgc2V0T3JpZ2luYWxTaXplXG4gICAgICogQHBhcmFtIHtTaXplfSBzaXplXG4gICAgICovXG4gICAgc2V0T3JpZ2luYWxTaXplOiBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplID0gY2Muc2l6ZShzaXplKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbmFsU2l6ZS53aWR0aCA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9vcmlnaW5hbFNpemUuaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSB0ZXh0dXJlIG9mIHRoZSBmcmFtZS5cbiAgICAgKiAhI3poIOiOt+WPluS9v+eUqOeahOe6ueeQhuWunuS+i1xuICAgICAqIEBtZXRob2QgZ2V0VGV4dHVyZVxuICAgICAqIEByZXR1cm4ge1RleHR1cmUyRH1cbiAgICAgKi9cbiAgICBnZXRUZXh0dXJlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICAgIH0sXG5cbiAgICBfdGV4dHVyZUxvYWRlZENhbGxiYWNrICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgdGV4dHVyZSA9IHRoaXMuX3RleHR1cmU7XG4gICAgICAgIGlmICghdGV4dHVyZSkge1xuICAgICAgICAgICAgLy8gY2xlYXJUZXh0dXJlIGNhbGxlZCB3aGlsZSBsb2FkaW5nIHRleHR1cmUuLi5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdyA9IHRleHR1cmUud2lkdGgsIGggPSB0ZXh0dXJlLmhlaWdodDtcblxuICAgICAgICBpZiAoc2VsZi5fcmVjdCkge1xuICAgICAgICAgICAgc2VsZi5fY2hlY2tSZWN0KHNlbGYuX3RleHR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5fcmVjdCA9IGNjLnJlY3QoMCwgMCwgdywgaCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX29yaWdpbmFsU2l6ZSkge1xuICAgICAgICAgICAgc2VsZi5zZXRPcmlnaW5hbFNpemUoY2Muc2l6ZSh3LCBoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNlbGYuX29mZnNldCkge1xuICAgICAgICAgICAgc2VsZi5zZXRPZmZzZXQoY2MudjIoMCwgMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5fY2FsY3VsYXRlVVYoKTtcblxuICAgICAgICAvLyBkaXNwYXRjaCAnbG9hZCcgZXZlbnQgb2YgY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgc2VsZi5lbWl0KFwibG9hZFwiKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiAhI2VuIFNldHMgdGhlIHRleHR1cmUgb2YgdGhlIGZyYW1lLlxuICAgICAqICEjemgg6K6+572u5L2/55So55qE57q555CG5a6e5L6L44CCXG4gICAgICogQG1ldGhvZCBfcmVmcmVzaFRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRH0gdGV4dHVyZVxuICAgICAqL1xuICAgIF9yZWZyZXNoVGV4dHVyZTogZnVuY3Rpb24gKHRleHR1cmUpIHtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICAgIGlmICh0ZXh0dXJlLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZUxvYWRlZENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0ZXh0dXJlLm9uY2UoJ2xvYWQnLCB0aGlzLl90ZXh0dXJlTG9hZGVkQ2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiOt+WPluWBj+enu+mHj1xuICAgICAqIEBtZXRob2QgZ2V0T2Zmc2V0XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBnZXRPZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX29mZnNldCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0cyB0aGUgb2Zmc2V0IG9mIHRoZSBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9ruWBj+enu+mHj1xuICAgICAqIEBtZXRob2Qgc2V0T2Zmc2V0XG4gICAgICogQHBhcmFtIHtWZWMyfSBvZmZzZXRzXG4gICAgICovXG4gICAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAob2Zmc2V0cykge1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSBjYy52MihvZmZzZXRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDbG9uZSB0aGUgc3ByaXRlIGZyYW1lLlxuICAgICAqICEjemgg5YWL6ZqGIFNwcml0ZUZyYW1lXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge1Nwcml0ZUZyYW1lfVxuICAgICAqL1xuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3ByaXRlRnJhbWUodGhpcy5fdGV4dHVyZSwgdGhpcy5fcmVjdCwgdGhpcy5fcm90YXRlZCwgdGhpcy5fb2Zmc2V0LCB0aGlzLl9vcmlnaW5hbFNpemUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBTcHJpdGVGcmFtZSB3aXRoIFRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCBhbmQgb3JpZ2luYWxTaXplLjxici8+XG4gICAgICogISN6aCDpgJrov4cgVGV4dHVyZe+8jHJlY3TvvIxyb3RhdGVk77yMb2Zmc2V0IOWSjCBvcmlnaW5hbFNpemUg6K6+572uIFNwcml0ZUZyYW1l44CCXG4gICAgICogQG1ldGhvZCBzZXRUZXh0dXJlXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmVcbiAgICAgKiBAcGFyYW0ge1JlY3R9IFtyZWN0PW51bGxdXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbcm90YXRlZD1mYWxzZV1cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvZmZzZXQ9Y2MudjIoMCwwKV1cbiAgICAgKiBAcGFyYW0ge1NpemV9IFtvcmlnaW5hbFNpemU9cmVjdC5zaXplXVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgc2V0VGV4dHVyZTogZnVuY3Rpb24gKHRleHR1cmUsIHJlY3QsIHJvdGF0ZWQsIG9mZnNldCwgb3JpZ2luYWxTaXplKSB7XG4gICAgICAgIGlmIChyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3JpZ2luYWxTaXplKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbmFsU2l6ZShvcmlnaW5hbFNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxTaXplID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3JvdGF0ZWQgPSByb3RhdGVkIHx8IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzQwMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHR1cmUgaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQgJiYgdGhpcy5fdGV4dHVyZSAhPT0gdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGV4dHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJZiBhIGxvYWRpbmcgc2NlbmUgKG9yIHByZWZhYikgaXMgbWFya2VkIGFzIGBhc3luY0xvYWRBc3NldHNgLCBhbGwgdGhlIHRleHR1cmVzIG9mIHRoZSBTcHJpdGVGcmFtZSB3aGljaFxuICAgICAqIGFzc29jaWF0ZWQgYnkgdXNlcidzIGN1c3RvbSBDb21wb25lbnRzIGluIHRoZSBzY2VuZSwgd2lsbCBub3QgcHJlbG9hZCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIFRoZXNlIHRleHR1cmVzIHdpbGwgYmUgbG9hZCB3aGVuIFNwcml0ZSBjb21wb25lbnQgaXMgZ29pbmcgdG8gcmVuZGVyIHRoZSBTcHJpdGVGcmFtZXMuXG4gICAgICogWW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50IHRvIGxvYWQgdGhlIHRleHR1cmUgZWFybHkuXG4gICAgICogISN6aCDlvZPliqDovb3kuK3nmoTlnLrmma/miJYgUHJlZmFiIOiiq+agh+iusOS4uiBgYXN5bmNMb2FkQXNzZXRzYCDml7bvvIznlKjmiLflnKjlnLrmma/kuK3nlLHoh6rlrprkuYnnu4Tku7blhbPogZTliLDnmoTmiYDmnIkgU3ByaXRlRnJhbWUg55qE6LS05Zu+6YO95LiN5Lya6KKr5o+Q5YmN5Yqg6L2944CCXG4gICAgICog5Y+q5pyJ5b2TIFNwcml0ZSDnu4Tku7bopoHmuLLmn5Pov5nkupsgU3ByaXRlRnJhbWUg5pe277yM5omN5Lya5qOA5p+l6LS05Zu+5piv5ZCm5Yqg6L2944CC5aaC5p6c5L2g5biM5pyb5Yqg6L296L+H56iL5o+Q5YmN77yM5L2g5Y+v5Lul5omL5bel6LCD55So6L+Z5Liq5pa55rOV44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGVuc3VyZUxvYWRUZXh0dXJlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoc3ByaXRlRnJhbWUudGV4dHVyZUxvYWRlZCgpKSB7XG4gICAgICogICAgIHRoaXMuX29uU3ByaXRlRnJhbWVMb2FkZWQoKTtcbiAgICAgKiB9XG4gICAgICogZWxzZSB7XG4gICAgICogICAgIHNwcml0ZUZyYW1lLm9uY2UoJ2xvYWQnLCB0aGlzLl9vblNwcml0ZUZyYW1lTG9hZGVkLCB0aGlzKTtcbiAgICAgKiAgICAgc3ByaXRlRnJhbWUuZW5zdXJlTG9hZFRleHR1cmUoKTtcbiAgICAgKiB9XG4gICAgICovXG4gICAgZW5zdXJlTG9hZFRleHR1cmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdGV4dHVyZS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBsb2FkIGV4aXN0cyB0ZXh0dXJlXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVmcmVzaFRleHR1cmUodGhpcy5fdGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnBvc3RMb2FkTmF0aXZlKHRoaXMuX3RleHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJZiB5b3UgZG8gbm90IG5lZWQgdG8gdXNlIHRoZSBTcHJpdGVGcmFtZSB0ZW1wb3JhcmlseSwgeW91IGNhbiBjYWxsIHRoaXMgbWV0aG9kIHNvIHRoYXQgaXRzIHRleHR1cmUgY291bGQgYmUgZ2FyYmFnZSBjb2xsZWN0ZWQuIFRoZW4gd2hlbiB5b3UgbmVlZCB0byByZW5kZXIgdGhlIFNwcml0ZUZyYW1lLCB5b3Ugc2hvdWxkIGNhbGwgYGVuc3VyZUxvYWRUZXh0dXJlYCBtYW51YWxseSB0byByZWxvYWQgdGV4dHVyZS5cbiAgICAgKiAhI3poXG4gICAgICog5b2T5L2g5pqC5pe25LiN5YaN5L2/55So6L+Z5LiqIFNwcml0ZUZyYW1lIOaXtu+8jOWPr+S7peiwg+eUqOi/meS4quaWueazleadpeS/neivgeW8leeUqOeahOi0tOWbvuWvueixoeiDveiiqyBHQ+OAgueEtuWQjuW9k+S9oOimgea4suafkyBTcHJpdGVGcmFtZSDml7bvvIzkvaDpnIDopoHmiYvliqjosIPnlKggYGVuc3VyZUxvYWRUZXh0dXJlYCDmnaXph43mlrDliqDovb3otLTlm77jgIJcbiAgICAgKiBAbWV0aG9kIGNsZWFyVGV4dHVyZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIDIuMVxuICAgICAqL1xuXG4gICAgX2NoZWNrUmVjdDogZnVuY3Rpb24gKHRleHR1cmUpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgbWF4WCA9IHJlY3QueCwgbWF4WSA9IHJlY3QueTtcbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0ZWQpIHtcbiAgICAgICAgICAgIG1heFggKz0gcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICBtYXhZICs9IHJlY3Qud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXhYICs9IHJlY3Qud2lkdGg7XG4gICAgICAgICAgICBtYXhZICs9IHJlY3QuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXhYID4gdGV4dHVyZS53aWR0aCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzMzAwLCB0ZXh0dXJlLm5hdGl2ZVVybCArICcvJyArIHRoaXMubmFtZSwgbWF4WCwgdGV4dHVyZS53aWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heFkgPiB0ZXh0dXJlLmhlaWdodCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzNDAwLCB0ZXh0dXJlLm5hdGl2ZVVybCArICcvJyArIHRoaXMubmFtZSwgbWF4WSwgdGV4dHVyZS5oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mbGlwWFkgKHV2cykge1xuICAgICAgICBpZiAodGhpcy5fZmxpcFgpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZzWzBdO1xuICAgICAgICAgICAgdXZzWzBdID0gdXZzWzFdO1xuICAgICAgICAgICAgdXZzWzFdID0gdGVtcFZhbDtcblxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2c1syXTtcbiAgICAgICAgICAgIHV2c1syXSA9IHV2c1szXTtcbiAgICAgICAgICAgIHV2c1szXSA9IHRlbXBWYWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZmxpcFkpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZzWzBdO1xuICAgICAgICAgICAgdXZzWzBdID0gdXZzWzJdO1xuICAgICAgICAgICAgdXZzWzJdID0gdGVtcFZhbDtcblxuICAgICAgICAgICAgdGVtcFZhbCA9IHV2c1sxXTtcbiAgICAgICAgICAgIHV2c1sxXSA9IHV2c1szXTtcbiAgICAgICAgICAgIHV2c1szXSA9IHRlbXBWYWw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NhbGN1bGF0ZVNsaWNlZFVWICgpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgYXRsYXNXaWR0aCA9IHRoaXMuX3RleHR1cmUud2lkdGg7XG4gICAgICAgIGxldCBhdGxhc0hlaWdodCA9IHRoaXMuX3RleHR1cmUuaGVpZ2h0O1xuICAgICAgICBsZXQgbGVmdFdpZHRoID0gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xuICAgICAgICBsZXQgcmlnaHRXaWR0aCA9IHRoaXMuX2NhcEluc2V0c1tJTlNFVF9SSUdIVF07XG4gICAgICAgIGxldCBjZW50ZXJXaWR0aCA9IHJlY3Qud2lkdGggLSBsZWZ0V2lkdGggLSByaWdodFdpZHRoO1xuICAgICAgICBsZXQgdG9wSGVpZ2h0ID0gdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF07XG4gICAgICAgIGxldCBib3R0b21IZWlnaHQgPSB0aGlzLl9jYXBJbnNldHNbSU5TRVRfQk9UVE9NXTtcbiAgICAgICAgbGV0IGNlbnRlckhlaWdodCA9IHJlY3QuaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gYm90dG9tSGVpZ2h0O1xuXG4gICAgICAgIGxldCB1dlNsaWNlZCA9IHRoaXMudXZTbGljZWQ7XG4gICAgICAgIHV2U2xpY2VkLmxlbmd0aCA9IDA7XG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGVkKSB7XG4gICAgICAgICAgICB0ZW1wX3V2c1swXS51ID0gKHJlY3QueCkgLyBhdGxhc1dpZHRoO1xuICAgICAgICAgICAgdGVtcF91dnNbMV0udSA9IChyZWN0LnggKyBib3R0b21IZWlnaHQpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzJdLnUgPSAocmVjdC54ICsgYm90dG9tSGVpZ2h0ICsgY2VudGVySGVpZ2h0KSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS51ID0gKHJlY3QueCArIHJlY3QuaGVpZ2h0KSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS52ID0gKHJlY3QueSkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzJdLnYgPSAocmVjdC55ICsgbGVmdFdpZHRoKSAvIGF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgdGVtcF91dnNbMV0udiA9IChyZWN0LnkgKyBsZWZ0V2lkdGggKyBjZW50ZXJXaWR0aCkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzBdLnYgPSAocmVjdC55ICsgcmVjdC53aWR0aCkgLyBhdGxhc0hlaWdodDtcblxuICAgICAgICAgICAgdGhpcy5fZmxpcFhZKHRlbXBfdXZzKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgNDsgKytyb3cpIHtcbiAgICAgICAgICAgICAgICBsZXQgcm93RCA9IHRlbXBfdXZzW3Jvd107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgNDsgKytjb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbEQgPSB0ZW1wX3V2c1szIC0gY29sXTtcbiAgICAgICAgICAgICAgICAgICAgdXZTbGljZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1OiByb3dELnUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiBjb2xELnZcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGVtcF91dnNbMF0udSA9IChyZWN0LngpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzFdLnUgPSAocmVjdC54ICsgbGVmdFdpZHRoKSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1syXS51ID0gKHJlY3QueCArIGxlZnRXaWR0aCArIGNlbnRlcldpZHRoKSAvIGF0bGFzV2lkdGg7XG4gICAgICAgICAgICB0ZW1wX3V2c1szXS51ID0gKHJlY3QueCArIHJlY3Qud2lkdGgpIC8gYXRsYXNXaWR0aDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzNdLnYgPSAocmVjdC55KSAvIGF0bGFzSGVpZ2h0O1xuICAgICAgICAgICAgdGVtcF91dnNbMl0udiA9IChyZWN0LnkgKyB0b3BIZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XG4gICAgICAgICAgICB0ZW1wX3V2c1sxXS52ID0gKHJlY3QueSArIHRvcEhlaWdodCArIGNlbnRlckhlaWdodCkgLyBhdGxhc0hlaWdodDtcbiAgICAgICAgICAgIHRlbXBfdXZzWzBdLnYgPSAocmVjdC55ICsgcmVjdC5oZWlnaHQpIC8gYXRsYXNIZWlnaHQ7XG5cbiAgICAgICAgICAgIHRoaXMuX2ZsaXBYWSh0ZW1wX3V2cyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDQ7ICsrcm93KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvd0QgPSB0ZW1wX3V2c1tyb3ddO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDQ7ICsrY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xEID0gdGVtcF91dnNbY29sXTtcbiAgICAgICAgICAgICAgICAgICAgdXZTbGljZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1OiBjb2xELnUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2OiByb3dELnZcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zZXREeW5hbWljQXRsYXNGcmFtZSAoZnJhbWUpIHtcbiAgICAgICAgaWYgKCFmcmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX29yaWdpbmFsID0ge1xuICAgICAgICAgICAgX3RleHR1cmUgOiB0aGlzLl90ZXh0dXJlLFxuICAgICAgICAgICAgX3ggOiB0aGlzLl9yZWN0LngsXG4gICAgICAgICAgICBfeSA6IHRoaXMuX3JlY3QueVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gZnJhbWUudGV4dHVyZTtcbiAgICAgICAgdGhpcy5fcmVjdC54ID0gZnJhbWUueDtcbiAgICAgICAgdGhpcy5fcmVjdC55ID0gZnJhbWUueTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcbiAgICB9LFxuXG4gICAgX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsKSByZXR1cm47XG4gICAgICAgIHRoaXMuX3JlY3QueCA9IHRoaXMuX29yaWdpbmFsLl94O1xuICAgICAgICB0aGlzLl9yZWN0LnkgPSB0aGlzLl9vcmlnaW5hbC5feTtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IHRoaXMuX29yaWdpbmFsLl90ZXh0dXJlO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcblxuICAgIF9jYWxjdWxhdGVVViAoKSB7XG4gICAgICAgIGxldCByZWN0ID0gdGhpcy5fcmVjdCxcbiAgICAgICAgICAgIHRleHR1cmUgPSB0aGlzLl90ZXh0dXJlLFxuICAgICAgICAgICAgdXYgPSB0aGlzLnV2LFxuICAgICAgICAgICAgdGV4dyA9IHRleHR1cmUud2lkdGgsXG4gICAgICAgICAgICB0ZXhoID0gdGV4dHVyZS5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX3JvdGF0ZWQpIHtcbiAgICAgICAgICAgIGxldCBsID0gdGV4dyA9PT0gMCA/IDAgOiByZWN0LnggLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LmhlaWdodCkgLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IGIgPSB0ZXhoID09PSAwID8gMCA6IChyZWN0LnkgKyByZWN0LndpZHRoKSAvIHRleGg7XG4gICAgICAgICAgICBsZXQgdCA9IHRleGggPT09IDAgPyAwIDogcmVjdC55IC8gdGV4aDtcbiAgICAgICAgICAgIHV2WzBdID0gbDtcbiAgICAgICAgICAgIHV2WzFdID0gdDtcbiAgICAgICAgICAgIHV2WzJdID0gbDtcbiAgICAgICAgICAgIHV2WzNdID0gYjtcbiAgICAgICAgICAgIHV2WzRdID0gcjtcbiAgICAgICAgICAgIHV2WzVdID0gdDtcbiAgICAgICAgICAgIHV2WzZdID0gcjtcbiAgICAgICAgICAgIHV2WzddID0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBsID0gdGV4dyA9PT0gMCA/IDAgOiByZWN0LnggLyB0ZXh3O1xuICAgICAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LndpZHRoKSAvIHRleHc7XG4gICAgICAgICAgICBsZXQgYiA9IHRleGggPT09IDAgPyAwIDogKHJlY3QueSArIHJlY3QuaGVpZ2h0KSAvIHRleGg7XG4gICAgICAgICAgICBsZXQgdCA9IHRleGggPT09IDAgPyAwIDogcmVjdC55IC8gdGV4aDtcbiAgICAgICAgICAgIHV2WzBdID0gbDtcbiAgICAgICAgICAgIHV2WzFdID0gYjtcbiAgICAgICAgICAgIHV2WzJdID0gcjtcbiAgICAgICAgICAgIHV2WzNdID0gYjtcbiAgICAgICAgICAgIHV2WzRdID0gbDtcbiAgICAgICAgICAgIHV2WzVdID0gdDtcbiAgICAgICAgICAgIHV2WzZdID0gcjtcbiAgICAgICAgICAgIHV2WzddID0gdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9mbGlwWCkge1xuICAgICAgICAgICAgbGV0IHRlbXBWYWwgPSB1dlswXTtcbiAgICAgICAgICAgIHV2WzBdID0gdXZbMl07XG4gICAgICAgICAgICB1dlsyXSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dlsxXTtcbiAgICAgICAgICAgIHV2WzFdID0gdXZbM107XG4gICAgICAgICAgICB1dlszXSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dls0XTtcbiAgICAgICAgICAgIHV2WzRdID0gdXZbNl07XG4gICAgICAgICAgICB1dls2XSA9IHRlbXBWYWw7XG5cbiAgICAgICAgICAgIHRlbXBWYWwgPSB1dls1XTtcbiAgICAgICAgICAgIHV2WzVdID0gdXZbN107XG4gICAgICAgICAgICB1dls3XSA9IHRlbXBWYWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fZmxpcFkpIHtcbiAgICAgICAgICAgIGxldCB0ZW1wVmFsID0gdXZbMF07XG4gICAgICAgICAgICB1dlswXSA9IHV2WzRdO1xuICAgICAgICAgICAgdXZbNF0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbMV07XG4gICAgICAgICAgICB1dlsxXSA9IHV2WzVdO1xuICAgICAgICAgICAgdXZbNV0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbMl07XG4gICAgICAgICAgICB1dlsyXSA9IHV2WzZdO1xuICAgICAgICAgICAgdXZbNl0gPSB0ZW1wVmFsO1xuXG4gICAgICAgICAgICB0ZW1wVmFsID0gdXZbM107XG4gICAgICAgICAgICB1dlszXSA9IHV2WzddO1xuICAgICAgICAgICAgdXZbN10gPSB0ZW1wVmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZlcnRpY2VzID0gdGhpcy52ZXJ0aWNlcztcbiAgICAgICAgaWYgKHZlcnRpY2VzKSB7XG4gICAgICAgICAgICB2ZXJ0aWNlcy5udS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgdmVydGljZXMubnYubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGljZXMudS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLm51W2ldID0gdmVydGljZXMudVtpXS90ZXh3O1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzLm52W2ldID0gdmVydGljZXMudltpXS90ZXhoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlU2xpY2VkVVYoKTtcbiAgICB9LFxuXG4gICAgLy8gU0VSSUFMSVpBVElPTlxuXG4gICAgX3NlcmlhbGl6ZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChleHBvcnRpbmcpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0O1xuICAgICAgICBsZXQgc2l6ZSA9IHRoaXMuX29yaWdpbmFsU2l6ZTtcbiAgICAgICAgbGV0IHV1aWQ7XG4gICAgICAgIGxldCB0ZXh0dXJlID0gdGhpcy5fdGV4dHVyZTtcbiAgICAgICAgaWYgKHRleHR1cmUpIHtcbiAgICAgICAgICAgIHV1aWQgPSB0ZXh0dXJlLl91dWlkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuX3RleHR1cmVGaWxlbmFtZTtcbiAgICAgICAgICAgIGlmICh1cmwpIHtcbiAgICAgICAgICAgICAgICB1dWlkID0gRWRpdG9yLlV0aWxzLlV1aWRDYWNoZS51cmxUb1V1aWQodXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodXVpZCAmJiBleHBvcnRpbmcpIHtcbiAgICAgICAgICAgIHV1aWQgPSBFZGl0b3IuVXRpbHMuVXVpZFV0aWxzLmNvbXByZXNzVXVpZCh1dWlkLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2ZXJ0aWNlcztcbiAgICAgICAgaWYgKHRoaXMudmVydGljZXMpIHtcbiAgICAgICAgICAgIHZlcnRpY2VzID0ge1xuICAgICAgICAgICAgICAgIHRyaWFuZ2xlczogdGhpcy52ZXJ0aWNlcy50cmlhbmdsZXMsXG4gICAgICAgICAgICAgICAgeDogdGhpcy52ZXJ0aWNlcy54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMudmVydGljZXMueSxcbiAgICAgICAgICAgICAgICB1OiB0aGlzLnZlcnRpY2VzLnUsXG4gICAgICAgICAgICAgICAgdjogdGhpcy52ZXJ0aWNlcy52XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuX25hbWUsXG4gICAgICAgICAgICB0ZXh0dXJlOiB1dWlkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGF0bGFzOiBleHBvcnRpbmcgPyB1bmRlZmluZWQgOiB0aGlzLl9hdGxhc1V1aWQsICAvLyBzdHJpcCBmcm9tIGpzb24gaWYgZXhwb3J0aW5nXG4gICAgICAgICAgICByZWN0OiByZWN0ID8gW3JlY3QueCwgcmVjdC55LCByZWN0LndpZHRoLCByZWN0LmhlaWdodF0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCA/IFtvZmZzZXQueCwgb2Zmc2V0LnldIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb3JpZ2luYWxTaXplOiBzaXplID8gW3NpemUud2lkdGgsIHNpemUuaGVpZ2h0XSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJvdGF0ZWQ6IHRoaXMuX3JvdGF0ZWQgPyAxIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY2FwSW5zZXRzOiB0aGlzLl9jYXBJbnNldHMsXG4gICAgICAgICAgICB2ZXJ0aWNlczogdmVydGljZXNcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgX2Rlc2VyaWFsaXplOiBmdW5jdGlvbiAoZGF0YSwgaGFuZGxlKSB7XG4gICAgICAgIGxldCByZWN0ID0gZGF0YS5yZWN0O1xuICAgICAgICBpZiAocmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVjdCA9IG5ldyBjYy5SZWN0KHJlY3RbMF0sIHJlY3RbMV0sIHJlY3RbMl0sIHJlY3RbM10pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLm9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zZXRPZmZzZXQobmV3IGNjLlZlYzIoZGF0YS5vZmZzZXRbMF0sIGRhdGEub2Zmc2V0WzFdKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEub3JpZ2luYWxTaXplKSB7XG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbmFsU2l6ZShuZXcgY2MuU2l6ZShkYXRhLm9yaWdpbmFsU2l6ZVswXSwgZGF0YS5vcmlnaW5hbFNpemVbMV0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yb3RhdGVkID0gZGF0YS5yb3RhdGVkID09PSAxO1xuICAgICAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xuXG4gICAgICAgIGxldCBjYXBJbnNldHMgPSBkYXRhLmNhcEluc2V0cztcbiAgICAgICAgaWYgKGNhcEluc2V0cykge1xuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0xFRlRdID0gY2FwSW5zZXRzW0lOU0VUX0xFRlRdO1xuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX1RPUF0gPSBjYXBJbnNldHNbSU5TRVRfVE9QXTtcbiAgICAgICAgICAgIHRoaXMuX2NhcEluc2V0c1tJTlNFVF9SSUdIVF0gPSBjYXBJbnNldHNbSU5TRVRfUklHSFRdO1xuICAgICAgICAgICAgdGhpcy5fY2FwSW5zZXRzW0lOU0VUX0JPVFRPTV0gPSBjYXBJbnNldHNbSU5TRVRfQk9UVE9NXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX2F0bGFzVXVpZCA9IGRhdGEuYXRsYXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZlcnRpY2VzID0gZGF0YS52ZXJ0aWNlcztcbiAgICAgICAgaWYgKHRoaXMudmVydGljZXMpIHtcbiAgICAgICAgICAgIC8vIGluaXRpYWxpemUgbm9ybWFsIHV2IGFycmF5c1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5udSA9IFtdO1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNlcy5udiA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9hZCB0ZXh0dXJlIHZpYSBfdGV4dHVyZVNldHRlclxuICAgICAgICBsZXQgdGV4dHVyZVV1aWQgPSBkYXRhLnRleHR1cmU7XG4gICAgICAgIGlmICh0ZXh0dXJlVXVpZCkge1xuICAgICAgICAgICAgaGFuZGxlLnJlc3VsdC5wdXNoKHRoaXMsICdfdGV4dHVyZVNldHRlcicsIHRleHR1cmVVdWlkKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5sZXQgcHJvdG8gPSBTcHJpdGVGcmFtZS5wcm90b3R5cGU7XG5cbnByb3RvLmNvcHlXaXRoWm9uZSA9IHByb3RvLmNsb25lO1xucHJvdG8uY29weSA9IHByb3RvLmNsb25lO1xucHJvdG8uaW5pdFdpdGhUZXh0dXJlID0gcHJvdG8uc2V0VGV4dHVyZTtcblxuY2MuU3ByaXRlRnJhbWUgPSBTcHJpdGVGcmFtZTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVGcmFtZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9