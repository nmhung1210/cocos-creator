
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCTexture2D.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var EventTarget = require('../event/event-target');

var renderer = require('../renderer');

require('../platform/CCClass');

var GL_NEAREST = 9728; // gl.NEAREST

var GL_LINEAR = 9729; // gl.LINEAR

var GL_REPEAT = 10497; // gl.REPEAT

var GL_CLAMP_TO_EDGE = 33071; // gl.CLAMP_TO_EDGE

var GL_MIRRORED_REPEAT = 33648; // gl.MIRRORED_REPEAT

var GL_RGBA = 6408; // gl.RGBA

var CHAR_CODE_0 = 48; // '0'

var CHAR_CODE_1 = 49; // '1'

var idGenerater = new (require('../platform/id-generater'))('Tex');
/**
 * <p>
 * This class allows to easily create OpenGL or Canvas 2D textures from images, text or raw data.                                    <br/>
 * The created cc.Texture2D object will always have power-of-two dimensions.                                                <br/>
 * Depending on how you create the cc.Texture2D object, the actual image area of the texture might be smaller than the texture dimensions <br/>
 *  i.e. "contentSize" != (pixelsWide, pixelsHigh) and (maxS, maxT) != (1.0, 1.0).                                           <br/>
 * Be aware that the content of the generated textures will be upside-down! </p>

 * @class Texture2D
 * @uses EventTarget
 * @extends Asset
 */
// define a specified number for the pixel format which gfx do not have a standard definition.

var CUSTOM_PIXEL_FORMAT = 1024;
/**
 * The texture pixel format, default value is RGBA8888, 
 * you should note that textures loaded by normal image files (png, jpg) can only support RGBA8888 format,
 * other formats are supported by compressed file types or raw data.
 * @enum Texture2D.PixelFormat
 */

var PixelFormat = cc.Enum({
  /**
   * 16-bit texture without Alpha channel
   * @property RGB565
   * @readonly
   * @type {Number}
   */
  RGB565: _gfx["default"].TEXTURE_FMT_R5_G6_B5,

  /**
   * 16-bit textures: RGB5A1
   * @property RGB5A1
   * @readonly
   * @type {Number}
   */
  RGB5A1: _gfx["default"].TEXTURE_FMT_R5_G5_B5_A1,

  /**
   * 16-bit textures: RGBA4444
   * @property RGBA4444
   * @readonly
   * @type {Number}
   */
  RGBA4444: _gfx["default"].TEXTURE_FMT_R4_G4_B4_A4,

  /**
   * 24-bit texture: RGB888
   * @property RGB888
   * @readonly
   * @type {Number}
   */
  RGB888: _gfx["default"].TEXTURE_FMT_RGB8,

  /**
   * 32-bit texture: RGBA8888
   * @property RGBA8888
   * @readonly
   * @type {Number}
   */
  RGBA8888: _gfx["default"].TEXTURE_FMT_RGBA8,

  /**
   * 32-bit float texture: RGBA32F
   * @property RGBA32F
   * @readonly
   * @type {Number}
   */
  RGBA32F: _gfx["default"].TEXTURE_FMT_RGBA32F,

  /**
   * 8-bit textures used as masks
   * @property A8
   * @readonly
   * @type {Number}
   */
  A8: _gfx["default"].TEXTURE_FMT_A8,

  /**
   * 8-bit intensity texture
   * @property I8
   * @readonly
   * @type {Number}
   */
  I8: _gfx["default"].TEXTURE_FMT_L8,

  /**
   * 16-bit textures used as masks
   * @property AI88
   * @readonly
   * @type {Number}
   */
  AI8: _gfx["default"].TEXTURE_FMT_L8_A8,

  /**
   * rgb 2 bpp pvrtc
   * @property RGB_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_PVRTC_2BPPV1: _gfx["default"].TEXTURE_FMT_RGB_PVRTC_2BPPV1,

  /**
   * rgba 2 bpp pvrtc
   * @property RGBA_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGBA_PVRTC_2BPPV1: _gfx["default"].TEXTURE_FMT_RGBA_PVRTC_2BPPV1,

  /**
   * rgb separate a 2 bpp pvrtc
   * RGB_A_PVRTC_2BPPV1 texture is a 2x height RGB_PVRTC_2BPPV1 format texture.
   * It separate the origin alpha channel to the bottom half atlas, the origin rgb channel to the top half atlas
   * @property RGB_A_PVRTC_2BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_A_PVRTC_2BPPV1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb 4 bpp pvrtc
   * @property RGB_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_PVRTC_4BPPV1: _gfx["default"].TEXTURE_FMT_RGB_PVRTC_4BPPV1,

  /**
   * rgba 4 bpp pvrtc
   * @property RGBA_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGBA_PVRTC_4BPPV1: _gfx["default"].TEXTURE_FMT_RGBA_PVRTC_4BPPV1,

  /**
   * rgb a 4 bpp pvrtc
   * RGB_A_PVRTC_4BPPV1 texture is a 2x height RGB_PVRTC_4BPPV1 format texture.
   * It separate the origin alpha channel to the bottom half atlas, the origin rgb channel to the top half atlas
   * @property RGB_A_PVRTC_4BPPV1
   * @readonly
   * @type {Number}
   */
  RGB_A_PVRTC_4BPPV1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb etc1
   * @property RGB_ETC1
   * @readonly
   * @type {Number}
   */
  RGB_ETC1: _gfx["default"].TEXTURE_FMT_RGB_ETC1,

  /**
   * rgba etc1
   * @property RGBA_ETC1
   * @readonly
   * @type {Number}
   */
  RGBA_ETC1: CUSTOM_PIXEL_FORMAT++,

  /**
   * rgb etc2
   * @property RGB_ETC2
   * @readonly
   * @type {Number}
   */
  RGB_ETC2: _gfx["default"].TEXTURE_FMT_RGB_ETC2,

  /**
   * rgba etc2
   * @property RGBA_ETC2
   * @readonly
   * @type {Number}
   */
  RGBA_ETC2: _gfx["default"].TEXTURE_FMT_RGBA_ETC2
});
/**
 * The texture wrap mode
 * @enum Texture2D.WrapMode
 */

var WrapMode = cc.Enum({
  /**
   * The constant variable equals gl.REPEAT for texture
   * @property REPEAT
   * @type {Number}
   * @readonly
   */
  REPEAT: GL_REPEAT,

  /**
   * The constant variable equals gl.CLAMP_TO_EDGE for texture
   * @property CLAMP_TO_EDGE
   * @type {Number}
   * @readonly
   */
  CLAMP_TO_EDGE: GL_CLAMP_TO_EDGE,

  /**
   * The constant variable equals gl.MIRRORED_REPEAT for texture
   * @property MIRRORED_REPEAT
   * @type {Number}
   * @readonly
   */
  MIRRORED_REPEAT: GL_MIRRORED_REPEAT
});
/**
 * The texture filter mode
 * @enum Texture2D.Filter
 */

var Filter = cc.Enum({
  /**
   * The constant variable equals gl.LINEAR for texture
   * @property LINEAR
   * @type {Number}
   * @readonly
   */
  LINEAR: GL_LINEAR,

  /**
   * The constant variable equals gl.NEAREST for texture
   * @property NEAREST
   * @type {Number}
   * @readonly
   */
  NEAREST: GL_NEAREST
});
var FilterIndex = {
  9728: 0,
  // GL_NEAREST
  9729: 1 // GL_LINEAR

};
var _images = [];
var _sharedOpts = {
  width: undefined,
  height: undefined,
  minFilter: undefined,
  magFilter: undefined,
  wrapS: undefined,
  wrapT: undefined,
  format: undefined,
  genMipmaps: undefined,
  images: undefined,
  image: undefined,
  flipY: undefined,
  premultiplyAlpha: undefined
};

function _getSharedOptions() {
  for (var key in _sharedOpts) {
    _sharedOpts[key] = undefined;
  }

  _images.length = 0;
  _sharedOpts.images = _images;
  return _sharedOpts;
}
/**
 * This class allows to easily create OpenGL or Canvas 2D textures from images or raw data.
 *
 * @class Texture2D
 * @uses EventTarget
 * @extends Asset
 */


var Texture2D = cc.Class({
  name: 'cc.Texture2D',
  "extends": require('../assets/CCAsset'),
  mixins: [EventTarget],
  properties: {
    _nativeAsset: {
      get: function get() {
        // maybe returned to pool in webgl
        return this._image;
      },
      set: function set(data) {
        if (data._compressed && data._data) {
          this.initWithData(data._data, this._format, data.width, data.height);
        } else {
          this.initWithElement(data);
        }
      },
      override: true
    },
    _format: PixelFormat.RGBA8888,
    _premultiplyAlpha: false,
    _flipY: false,
    _minFilter: Filter.LINEAR,
    _magFilter: Filter.LINEAR,
    _mipFilter: Filter.LINEAR,
    _wrapS: WrapMode.CLAMP_TO_EDGE,
    _wrapT: WrapMode.CLAMP_TO_EDGE,
    _isAlphaAtlas: false,
    _genMipmaps: false,

    /**
     * !#en Sets whether generate mipmaps for the texture
     * !#zh 是否为纹理设置生成 mipmaps。
     * @property {Boolean} genMipmaps
     * @default false
     */
    genMipmaps: {
      get: function get() {
        return this._genMipmaps;
      },
      set: function set(genMipmaps) {
        if (this._genMipmaps !== genMipmaps) {
          var opts = _getSharedOptions();

          opts.genMipmaps = genMipmaps;
          this.update(opts);
        }
      }
    },
    _packable: true,

    /**
     * !#en 
     * Sets whether texture can be packed into texture atlas.
     * If need use texture uv in custom Effect, please sets packable to false.
     * !#zh 
     * 设置纹理是否允许参与合图。
     * 如果需要在自定义 Effect 中使用纹理 UV，需要禁止该选项。
     * @property {Boolean} packable
     * @default true
     */
    packable: {
      get: function get() {
        return this._packable;
      },
      set: function set(val) {
        this._packable = val;
      }
    },
    _nativeDep: {
      get: function get() {
        return {
          __isNative__: true,
          uuid: this._uuid,
          ext: this._native,
          __flipY__: this._flipY,
          __premultiplyAlpha__: this._premultiplyAlpha
        };
      },
      override: true
    }
  },
  statics: {
    PixelFormat: PixelFormat,
    WrapMode: WrapMode,
    Filter: Filter,
    _FilterIndex: FilterIndex,
    // predefined most common extnames
    extnames: ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.pvr', '.pkm'],
    _parseNativeDepFromJson: function _parseNativeDepFromJson(json) {
      var data = json.content;
      var fields = data.split(','); // decode extname

      var extIdStr = fields[0];
      var ext = '';

      if (extIdStr) {
        var result = Texture2D._parseExt(extIdStr, PixelFormat.RGBA8888);

        ext = result.bestExt || result.defaultExt;
      }

      return {
        __isNative__: true,
        ext: ext,
        __flipY__: false,
        __premultiplyAlpha__: fields[5] && fields[5].charCodeAt(0) === CHAR_CODE_1
      };
    },
    _parseExt: function _parseExt(extIdStr, defaultFormat) {
      var device = cc.renderer.device;
      var extIds = extIdStr.split('_');
      var defaultExt = '';
      var bestExt = '';
      var bestIndex = 999;
      var bestFormat = defaultFormat;
      var SupportTextureFormats = cc.macro.SUPPORT_TEXTURE_FORMATS;

      for (var i = 0; i < extIds.length; i++) {
        var extFormat = extIds[i].split('@');
        var tmpExt = extFormat[0];
        tmpExt = Texture2D.extnames[tmpExt.charCodeAt(0) - CHAR_CODE_0] || tmpExt;
        var index = SupportTextureFormats.indexOf(tmpExt);

        if (index !== -1 && index < bestIndex) {
          var tmpFormat = extFormat[1] ? parseInt(extFormat[1]) : defaultFormat; // check whether or not support compressed texture

          if (tmpExt === '.pvr' && !device.ext('WEBGL_compressed_texture_pvrtc')) {
            continue;
          } else if ((tmpFormat === PixelFormat.RGB_ETC1 || tmpFormat === PixelFormat.RGBA_ETC1) && !device.ext('WEBGL_compressed_texture_etc1')) {
            continue;
          } else if ((tmpFormat === PixelFormat.RGB_ETC2 || tmpFormat === PixelFormat.RGBA_ETC2) && !device.ext('WEBGL_compressed_texture_etc')) {
            continue;
          } else if (tmpExt === '.webp' && !cc.sys.capabilities.webp) {
            continue;
          }

          bestIndex = index;
          bestExt = tmpExt;
          bestFormat = tmpFormat;
        } else if (!defaultExt) {
          defaultExt = tmpExt;
        }
      }

      return {
        bestExt: bestExt,
        bestFormat: bestFormat,
        defaultExt: defaultExt
      };
    },
    _parseDepsFromJson: function _parseDepsFromJson() {
      return [];
    }
  },
  ctor: function ctor() {
    // Id for generate hash in material
    this._id = idGenerater.getNewId();
    /**
     * !#en
     * Whether the texture is loaded or not
     * !#zh
     * 贴图是否已经成功加载
     * @property loaded
     * @type {Boolean}
     */

    this.loaded = false;
    /**
     * !#en
     * Texture width in pixel
     * !#zh
     * 贴图像素宽度
     * @property width
     * @type {Number}
     */

    this.width = 0;
    /**
     * !#en
     * Texture height in pixel
     * !#zh
     * 贴图像素高度
     * @property height
     * @type {Number}
     */

    this.height = 0;
    this._hashDirty = true;
    this._hash = 0;
    this._texture = null;

    if (CC_EDITOR) {
      this._exportedExts = null;
    }
  },

  /**
   * !#en
   * Get renderer texture implementation object
   * extended from render.Texture2D
   * !#zh  返回渲染器内部贴图对象
   * @method getImpl
   */
  getImpl: function getImpl() {
    return this._texture;
  },
  getId: function getId() {
    return this._id;
  },
  toString: function toString() {
    return this.nativeUrl || '';
  },

  /**
   * Update texture options, not available in Canvas render mode.
   * image, format, premultiplyAlpha can not be updated in native.
   * @method update
   * @param {Object} options
   * @param {DOMImageElement} options.image
   * @param {Boolean} options.genMipmaps
   * @param {PixelFormat} options.format
   * @param {Filter} options.minFilter
   * @param {Filter} options.magFilter
   * @param {WrapMode} options.wrapS
   * @param {WrapMode} options.wrapT
   * @param {Boolean} options.premultiplyAlpha
   */
  update: function update(options) {
    if (options) {
      var updateImg = false;

      if (options.width !== undefined) {
        this.width = options.width;
      }

      if (options.height !== undefined) {
        this.height = options.height;
      }

      if (options.minFilter !== undefined) {
        this._minFilter = options.minFilter;
        options.minFilter = FilterIndex[options.minFilter];
      }

      if (options.magFilter !== undefined) {
        this._magFilter = options.magFilter;
        options.magFilter = FilterIndex[options.magFilter];
      }

      if (options.mipFilter !== undefined) {
        this._mipFilter = options.mipFilter;
        options.mipFilter = FilterIndex[options.mipFilter];
      }

      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }

      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }

      if (options.format !== undefined) {
        this._format = options.format;
      }

      if (options.flipY !== undefined) {
        this._flipY = options.flipY;
        updateImg = true;
      }

      if (options.premultiplyAlpha !== undefined) {
        this._premultiplyAlpha = options.premultiplyAlpha;
        updateImg = true;
      }

      if (options.genMipmaps !== undefined) {
        this._genMipmaps = options.genMipmaps;
      }

      if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
        this._checkImageBitmap(this._upload.bind(this, options, updateImg));
      } else {
        this._upload(options, updateImg);
      }
    }
  },
  _upload: function _upload(options, updateImg) {
    if (updateImg && this._image) {
      options.image = this._image;
    }

    if (options.images && options.images.length > 0) {
      this._image = options.images[0];
    } else if (options.image !== undefined) {
      this._image = options.image;

      if (!options.images) {
        _images.length = 0;
        options.images = _images;
      } // webgl texture 2d uses images


      options.images.push(options.image);
    }

    this._texture && this._texture.update(options);
    this._hashDirty = true;
  },

  /**
   * !#en
   * Init with HTML element.
   * !#zh 用 HTML Image 或 Canvas 对象初始化贴图。
   * @method initWithElement
   * @param {HTMLImageElement|HTMLCanvasElement} element
   * @example
   * var img = new Image();
   * img.src = dataURL;
   * texture.initWithElement(img);
   */
  initWithElement: function initWithElement(element) {
    if (!element) return;
    this._image = element;

    if (element.complete || element instanceof HTMLCanvasElement) {
      this.handleLoadedTexture();
    } else if (cc.sys.capabilities.imageBitmap && element instanceof ImageBitmap) {
      this._checkImageBitmap(this.handleLoadedTexture.bind(this));
    } else {
      var self = this;
      element.addEventListener('load', function () {
        self.handleLoadedTexture();
      });
      element.addEventListener('error', function (err) {
        cc.warnID(3119, err.message);
      });
    }
  },

  /**
   * !#en
   * Intializes with texture data in ArrayBufferView.
   * !#zh 使用一个存储在 ArrayBufferView 中的图像数据（raw data）初始化数据。
   * @method initWithData
   * @param {ArrayBufferView} data
   * @param {Number} pixelFormat
   * @param {Number} pixelsWidth
   * @param {Number} pixelsHeight
   * @return {Boolean}
   */
  initWithData: function initWithData(data, pixelFormat, pixelsWidth, pixelsHeight) {
    var opts = _getSharedOptions();

    opts.image = data; // webgl texture 2d uses images

    opts.images = [opts.image];
    opts.genMipmaps = this._genMipmaps;
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;
    opts.format = this._getGFXPixelFormat(pixelFormat);
    opts.width = pixelsWidth;
    opts.height = pixelsHeight;

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }

    this.width = pixelsWidth;
    this.height = pixelsHeight;

    this._updateFormat();

    this._checkPackable();

    this.loaded = true;
    this.emit("load");
    return true;
  },

  /**
   * !#en
   * HTMLElement Object getter, available only on web.<br/>
   * Note: texture is packed into texture atlas by default<br/>
   * you should set texture.packable as false before getting Html element object.
   * !#zh 获取当前贴图对应的 HTML Image 或 Canvas 对象，只在 Web 平台下有效。<br/>
   * 注意：<br/>
   * texture 默认参与动态合图，如果需要获取到正确的 Html 元素对象，需要先设置 texture.packable 为 false
   * @method getHtmlElementObj
   * @return {HTMLImageElement|HTMLCanvasElement}
   */
  getHtmlElementObj: function getHtmlElementObj() {
    return this._image;
  },

  /**
   * !#en
   * Destory this texture and immediately release its video memory. (Inherit from cc.Object.destroy)<br>
   * After destroy, this object is not usable anymore.
   * You can use cc.isValid(obj) to check whether the object is destroyed before accessing it.
   * !#zh
   * 销毁该贴图，并立即释放它对应的显存。（继承自 cc.Object.destroy）<br/>
   * 销毁后，该对象不再可用。您可以在访问对象之前使用 cc.isValid(obj) 来检查对象是否已被销毁。
   * @method destroy
   * @return {Boolean} inherit from the CCObject
   */
  destroy: function destroy() {
    if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
      this._image.close && this._image.close();
    }

    this._packable && cc.dynamicAtlasManager && cc.dynamicAtlasManager.deleteAtlasTexture(this);
    this._image = null;
    this._texture && this._texture.destroy();

    this._super();
  },

  /**
   * !#en
   * Pixel format of the texture.
   * !#zh 获取纹理的像素格式。
   * @method getPixelFormat
   * @return {Number}
   */
  getPixelFormat: function getPixelFormat() {
    //support only in WebGl rendering mode
    return this._format;
  },

  /**
   * !#en
   * Whether or not the texture has their Alpha premultiplied.
   * !#zh 检查纹理在上传 GPU 时预乘选项是否开启。
   * @method hasPremultipliedAlpha
   * @return {Boolean}
   */
  hasPremultipliedAlpha: function hasPremultipliedAlpha() {
    return this._premultiplyAlpha || false;
  },
  isAlphaAtlas: function isAlphaAtlas() {
    return this._isAlphaAtlas;
  },

  /**
   * !#en
   * Handler of texture loaded event.
   * Since v2.0, you don't need to invoke this function, it will be invoked automatically after texture loaded.
   * !#zh 贴图加载事件处理器。v2.0 之后你将不在需要手动执行这个函数，它会在贴图加载成功之后自动执行。
   * @method handleLoadedTexture
   * @param {Boolean} [premultiplied]
   */
  handleLoadedTexture: function handleLoadedTexture() {
    if (!this._image || !this._image.width || !this._image.height) return;
    this.width = this._image.width;
    this.height = this._image.height;

    var opts = _getSharedOptions();

    opts.image = this._image; // webgl texture 2d uses images

    opts.images = [opts.image];
    opts.width = this.width;
    opts.height = this.height;
    opts.genMipmaps = this._genMipmaps;
    opts.format = this._getGFXPixelFormat(this._format);
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }

    this._updateFormat();

    this._checkPackable(); //dispatch load event to listener.


    this.loaded = true;
    this.emit("load");

    if (cc.macro.CLEANUP_IMAGE_CACHE) {
      if (this._image instanceof HTMLImageElement) {
        this._clearImage();
      } else if (cc.sys.capabilities.imageBitmap && this._image instanceof ImageBitmap) {
        this._image.close && this._image.close();
      }
    }
  },

  /**
   * !#en
   * Description of cc.Texture2D.
   * !#zh cc.Texture2D 描述。
   * @method description
   * @returns {String}
   */
  description: function description() {
    return "<cc.Texture2D | Name = " + this.nativeUrl + " | Dimensions = " + this.width + " x " + this.height + ">";
  },

  /**
   * !#en
   * Release texture, please use destroy instead.
   * !#zh 释放纹理，请使用 destroy 替代。
   * @method releaseTexture
   * @deprecated since v2.0
   */
  releaseTexture: function releaseTexture() {
    this._image = null;
    this._texture && this._texture.destroy();
  },

  /**
   * !#en Sets the wrap s and wrap t options. <br/>
   * If the texture size is NPOT (non power of 2), then in can only use gl.CLAMP_TO_EDGE in gl.TEXTURE_WRAP_{S,T}.
   * !#zh 设置纹理包装模式。
   * 若纹理贴图尺寸是 NPOT（non power of 2），则只能使用 Texture2D.WrapMode.CLAMP_TO_EDGE。
   * @method setTexParameters
   * @param {Texture2D.WrapMode} wrapS
   * @param {Texture2D.WrapMode} wrapT
   */
  setWrapMode: function setWrapMode(wrapS, wrapT) {
    if (this._wrapS !== wrapS || this._wrapT !== wrapT) {
      var opts = _getSharedOptions();

      opts.wrapS = wrapS;
      opts.wrapT = wrapT;
      this.update(opts);
    }
  },

  /**
   * !#en Sets the minFilter and magFilter options
   * !#zh 设置纹理贴图缩小和放大过滤器算法选项。
   * @method setFilters
   * @param {Texture2D.Filter} minFilter
   * @param {Texture2D.Filter} magFilter
   */
  setFilters: function setFilters(minFilter, magFilter) {
    if (this._minFilter !== minFilter || this._magFilter !== magFilter) {
      var opts = _getSharedOptions();

      opts.minFilter = minFilter;
      opts.magFilter = magFilter;
      this.update(opts);
    }
  },

  /**
   * !#en
   * Sets the flipY options
   * !#zh 设置贴图的纵向翻转选项。
   * @method setFlipY
   * @param {Boolean} flipY
   */
  setFlipY: function setFlipY(flipY) {
    if (this._flipY !== flipY) {
      var opts = _getSharedOptions();

      opts.flipY = flipY;
      opts.premultiplyAlpha = this._premultiplyAlpha;
      this.update(opts);
    }
  },

  /**
   * !#en
   * Sets the premultiply alpha options
   * !#zh 设置贴图的预乘选项。
   * @method setPremultiplyAlpha
   * @param {Boolean} premultiply
   */
  setPremultiplyAlpha: function setPremultiplyAlpha(premultiply) {
    if (this._premultiplyAlpha !== premultiply) {
      var opts = _getSharedOptions();

      opts.flipY = this._flipY;
      opts.premultiplyAlpha = premultiply;
      this.update(opts);
    }
  },
  _updateFormat: function _updateFormat() {
    this._isAlphaAtlas = this._format === PixelFormat.RGBA_ETC1 || this._format === PixelFormat.RGB_A_PVRTC_4BPPV1 || this._format === PixelFormat.RGB_A_PVRTC_2BPPV1;

    if (CC_JSB) {
      this._texture.setAlphaAtlas(this._isAlphaAtlas);
    }
  },
  _checkPackable: function _checkPackable() {
    var dynamicAtlas = cc.dynamicAtlasManager;
    if (!dynamicAtlas) return;

    if (this._isCompressed()) {
      this._packable = false;
      return;
    }

    var w = this.width,
        h = this.height;

    if (!this._image || w > dynamicAtlas.maxFrameSize || h > dynamicAtlas.maxFrameSize || this._getHash() !== dynamicAtlas.Atlas.DEFAULT_HASH) {
      this._packable = false;
      return;
    }

    if (this._image && this._image instanceof HTMLCanvasElement) {
      this._packable = true;
    }
  },
  _getOpts: function _getOpts() {
    var opts = _getSharedOptions();

    opts.width = this.width;
    opts.height = this.height;
    opts.genMipmaps = this._genMipmaps;
    opts.format = this._format;
    opts.premultiplyAlpha = this._premultiplyAlpha;
    opts.anisotropy = this._anisotropy;
    opts.flipY = this._flipY;
    opts.minFilter = FilterIndex[this._minFilter];
    opts.magFilter = FilterIndex[this._magFilter];
    opts.mipFilter = FilterIndex[this._mipFilter];
    opts.wrapS = this._wrapS;
    opts.wrapT = this._wrapT;
    return opts;
  },
  _getGFXPixelFormat: function _getGFXPixelFormat(format) {
    if (format === PixelFormat.RGBA_ETC1) {
      format = PixelFormat.RGB_ETC1;
    } else if (format === PixelFormat.RGB_A_PVRTC_4BPPV1) {
      format = PixelFormat.RGB_PVRTC_4BPPV1;
    } else if (format === PixelFormat.RGB_A_PVRTC_2BPPV1) {
      format = PixelFormat.RGB_PVRTC_2BPPV1;
    }

    return format;
  },
  _resetUnderlyingMipmaps: function _resetUnderlyingMipmaps(mipmapSources) {
    var opts = this._getOpts();

    opts.images = mipmapSources || [null];

    if (!this._texture) {
      this._texture = new renderer.Texture2D(renderer.device, opts);
    } else {
      this._texture.update(opts);
    }
  },
  // SERIALIZATION
  _serialize: (CC_EDITOR || CC_TEST) && function () {
    var extId = "";
    var exportedExts = this._exportedExts;

    if (!exportedExts && this._native) {
      exportedExts = [this._native];
    }

    if (exportedExts) {
      var exts = [];

      for (var i = 0; i < exportedExts.length; i++) {
        var _extId = "";
        var ext = exportedExts[i];

        if (ext) {
          // ext@format
          var extFormat = ext.split('@');
          _extId = Texture2D.extnames.indexOf(extFormat[0]);

          if (_extId < 0) {
            _extId = ext;
          }

          if (extFormat[1]) {
            _extId += '@' + extFormat[1];
          }
        }

        exts.push(_extId);
      }

      extId = exts.join('_');
    }

    var asset = extId + "," + this._minFilter + "," + this._magFilter + "," + this._wrapS + "," + this._wrapT + "," + ((this._premultiplyAlpha ? 1 : 0) + "," + (this._genMipmaps ? 1 : 0) + "," + (this._packable ? 1 : 0));
    return asset;
  },
  _deserialize: function _deserialize(data, handle) {
    var fields = data.split(','); // decode extname

    var extIdStr = fields[0];

    if (extIdStr) {
      var result = Texture2D._parseExt(extIdStr, this._format);

      if (result.bestExt) {
        this._setRawAsset(result.bestExt);

        this._format = result.bestFormat;
      } else {
        this._setRawAsset(result.defaultExt);

        cc.warnID(3120, handle.customEnv.url, result.defaultExt, result.defaultExt);
      }
    }

    if (fields.length === 8) {
      // decode filters
      this._minFilter = parseInt(fields[1]);
      this._magFilter = parseInt(fields[2]); // decode wraps

      this._wrapS = parseInt(fields[3]);
      this._wrapT = parseInt(fields[4]); // decode premultiply alpha

      this._premultiplyAlpha = fields[5].charCodeAt(0) === CHAR_CODE_1;
      this._genMipmaps = fields[6].charCodeAt(0) === CHAR_CODE_1;
      this._packable = fields[7].charCodeAt(0) === CHAR_CODE_1;
    }
  },
  _getHash: function _getHash() {
    if (!this._hashDirty) {
      return this._hash;
    }

    var genMipmaps = this._genMipmaps ? 1 : 0;
    var premultiplyAlpha = this._premultiplyAlpha ? 1 : 0;
    var flipY = this._flipY ? 1 : 0;
    var minFilter = this._minFilter === Filter.LINEAR ? 1 : 2;
    var magFilter = this._magFilter === Filter.LINEAR ? 1 : 2;
    var wrapS = this._wrapS === WrapMode.REPEAT ? 1 : this._wrapS === WrapMode.CLAMP_TO_EDGE ? 2 : 3;
    var wrapT = this._wrapT === WrapMode.REPEAT ? 1 : this._wrapT === WrapMode.CLAMP_TO_EDGE ? 2 : 3;
    var pixelFormat = this._format;
    var image = this._image;

    if (CC_JSB && image) {
      if (image._glFormat && image._glFormat !== GL_RGBA) pixelFormat = 0;
      premultiplyAlpha = image._premultiplyAlpha ? 1 : 0;
    }

    this._hash = Number("" + minFilter + magFilter + pixelFormat + wrapS + wrapT + genMipmaps + premultiplyAlpha + flipY);
    this._hashDirty = false;
    return this._hash;
  },
  _isCompressed: function _isCompressed() {
    return this._format < PixelFormat.A8 || this._format > PixelFormat.RGBA32F;
  },
  _clearImage: function _clearImage() {
    this._image.src = "";
  },
  _checkImageBitmap: function _checkImageBitmap(cb) {
    var _this = this;

    var image = this._image;
    var flipY = this._flipY;
    var premultiplyAlpha = this._premultiplyAlpha;

    if (this._flipY !== image.flipY || this._premultiplyAlpha !== image.premultiplyAlpha) {
      createImageBitmap(image, {
        imageOrientation: flipY !== image.flipY ? 'flipY' : 'none',
        premultiplyAlpha: premultiplyAlpha ? 'premultiply' : 'none'
      }).then(function (result) {
        image.close && image.close();
        result.flipY = flipY;
        result.premultiplyAlpha = premultiplyAlpha;
        _this._image = result;
        cb();
      }, function (err) {
        cc.error(err.message);
      });
    } else {
      cb();
    }
  }
});
/**
 * !#zh
 * 当该资源加载成功后触发该事件
 * !#en
 * This event is emitted when the asset is loaded
 *
 * @event load
 */

cc.Texture2D = module.exports = Texture2D;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1RleHR1cmUyRC5qcyJdLCJuYW1lcyI6WyJFdmVudFRhcmdldCIsInJlcXVpcmUiLCJyZW5kZXJlciIsIkdMX05FQVJFU1QiLCJHTF9MSU5FQVIiLCJHTF9SRVBFQVQiLCJHTF9DTEFNUF9UT19FREdFIiwiR0xfTUlSUk9SRURfUkVQRUFUIiwiR0xfUkdCQSIsIkNIQVJfQ09ERV8wIiwiQ0hBUl9DT0RFXzEiLCJpZEdlbmVyYXRlciIsIkNVU1RPTV9QSVhFTF9GT1JNQVQiLCJQaXhlbEZvcm1hdCIsImNjIiwiRW51bSIsIlJHQjU2NSIsImdmeCIsIlRFWFRVUkVfRk1UX1I1X0c2X0I1IiwiUkdCNUExIiwiVEVYVFVSRV9GTVRfUjVfRzVfQjVfQTEiLCJSR0JBNDQ0NCIsIlRFWFRVUkVfRk1UX1I0X0c0X0I0X0E0IiwiUkdCODg4IiwiVEVYVFVSRV9GTVRfUkdCOCIsIlJHQkE4ODg4IiwiVEVYVFVSRV9GTVRfUkdCQTgiLCJSR0JBMzJGIiwiVEVYVFVSRV9GTVRfUkdCQTMyRiIsIkE4IiwiVEVYVFVSRV9GTVRfQTgiLCJJOCIsIlRFWFRVUkVfRk1UX0w4IiwiQUk4IiwiVEVYVFVSRV9GTVRfTDhfQTgiLCJSR0JfUFZSVENfMkJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzJCUFBWMSIsIlJHQkFfUFZSVENfMkJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ18yQlBQVjEiLCJSR0JfQV9QVlJUQ18yQlBQVjEiLCJSR0JfUFZSVENfNEJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCX1BWUlRDXzRCUFBWMSIsIlJHQkFfUFZSVENfNEJQUFYxIiwiVEVYVFVSRV9GTVRfUkdCQV9QVlJUQ180QlBQVjEiLCJSR0JfQV9QVlJUQ180QlBQVjEiLCJSR0JfRVRDMSIsIlRFWFRVUkVfRk1UX1JHQl9FVEMxIiwiUkdCQV9FVEMxIiwiUkdCX0VUQzIiLCJURVhUVVJFX0ZNVF9SR0JfRVRDMiIsIlJHQkFfRVRDMiIsIlRFWFRVUkVfRk1UX1JHQkFfRVRDMiIsIldyYXBNb2RlIiwiUkVQRUFUIiwiQ0xBTVBfVE9fRURHRSIsIk1JUlJPUkVEX1JFUEVBVCIsIkZpbHRlciIsIkxJTkVBUiIsIk5FQVJFU1QiLCJGaWx0ZXJJbmRleCIsIl9pbWFnZXMiLCJfc2hhcmVkT3B0cyIsIndpZHRoIiwidW5kZWZpbmVkIiwiaGVpZ2h0IiwibWluRmlsdGVyIiwibWFnRmlsdGVyIiwid3JhcFMiLCJ3cmFwVCIsImZvcm1hdCIsImdlbk1pcG1hcHMiLCJpbWFnZXMiLCJpbWFnZSIsImZsaXBZIiwicHJlbXVsdGlwbHlBbHBoYSIsIl9nZXRTaGFyZWRPcHRpb25zIiwia2V5IiwibGVuZ3RoIiwiVGV4dHVyZTJEIiwiQ2xhc3MiLCJuYW1lIiwibWl4aW5zIiwicHJvcGVydGllcyIsIl9uYXRpdmVBc3NldCIsImdldCIsIl9pbWFnZSIsInNldCIsImRhdGEiLCJfY29tcHJlc3NlZCIsIl9kYXRhIiwiaW5pdFdpdGhEYXRhIiwiX2Zvcm1hdCIsImluaXRXaXRoRWxlbWVudCIsIm92ZXJyaWRlIiwiX3ByZW11bHRpcGx5QWxwaGEiLCJfZmxpcFkiLCJfbWluRmlsdGVyIiwiX21hZ0ZpbHRlciIsIl9taXBGaWx0ZXIiLCJfd3JhcFMiLCJfd3JhcFQiLCJfaXNBbHBoYUF0bGFzIiwiX2dlbk1pcG1hcHMiLCJvcHRzIiwidXBkYXRlIiwiX3BhY2thYmxlIiwicGFja2FibGUiLCJ2YWwiLCJfbmF0aXZlRGVwIiwiX19pc05hdGl2ZV9fIiwidXVpZCIsIl91dWlkIiwiZXh0IiwiX25hdGl2ZSIsIl9fZmxpcFlfXyIsIl9fcHJlbXVsdGlwbHlBbHBoYV9fIiwic3RhdGljcyIsIl9GaWx0ZXJJbmRleCIsImV4dG5hbWVzIiwiX3BhcnNlTmF0aXZlRGVwRnJvbUpzb24iLCJqc29uIiwiY29udGVudCIsImZpZWxkcyIsInNwbGl0IiwiZXh0SWRTdHIiLCJyZXN1bHQiLCJfcGFyc2VFeHQiLCJiZXN0RXh0IiwiZGVmYXVsdEV4dCIsImNoYXJDb2RlQXQiLCJkZWZhdWx0Rm9ybWF0IiwiZGV2aWNlIiwiZXh0SWRzIiwiYmVzdEluZGV4IiwiYmVzdEZvcm1hdCIsIlN1cHBvcnRUZXh0dXJlRm9ybWF0cyIsIm1hY3JvIiwiU1VQUE9SVF9URVhUVVJFX0ZPUk1BVFMiLCJpIiwiZXh0Rm9ybWF0IiwidG1wRXh0IiwiaW5kZXgiLCJpbmRleE9mIiwidG1wRm9ybWF0IiwicGFyc2VJbnQiLCJzeXMiLCJjYXBhYmlsaXRpZXMiLCJ3ZWJwIiwiX3BhcnNlRGVwc0Zyb21Kc29uIiwiY3RvciIsIl9pZCIsImdldE5ld0lkIiwibG9hZGVkIiwiX2hhc2hEaXJ0eSIsIl9oYXNoIiwiX3RleHR1cmUiLCJDQ19FRElUT1IiLCJfZXhwb3J0ZWRFeHRzIiwiZ2V0SW1wbCIsImdldElkIiwidG9TdHJpbmciLCJuYXRpdmVVcmwiLCJvcHRpb25zIiwidXBkYXRlSW1nIiwibWlwRmlsdGVyIiwiaW1hZ2VCaXRtYXAiLCJJbWFnZUJpdG1hcCIsIl9jaGVja0ltYWdlQml0bWFwIiwiX3VwbG9hZCIsImJpbmQiLCJwdXNoIiwiZWxlbWVudCIsImNvbXBsZXRlIiwiSFRNTENhbnZhc0VsZW1lbnQiLCJoYW5kbGVMb2FkZWRUZXh0dXJlIiwic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlcnIiLCJ3YXJuSUQiLCJtZXNzYWdlIiwicGl4ZWxGb3JtYXQiLCJwaXhlbHNXaWR0aCIsInBpeGVsc0hlaWdodCIsIl9nZXRHRlhQaXhlbEZvcm1hdCIsIl91cGRhdGVGb3JtYXQiLCJfY2hlY2tQYWNrYWJsZSIsImVtaXQiLCJnZXRIdG1sRWxlbWVudE9iaiIsImRlc3Ryb3kiLCJjbG9zZSIsImR5bmFtaWNBdGxhc01hbmFnZXIiLCJkZWxldGVBdGxhc1RleHR1cmUiLCJfc3VwZXIiLCJnZXRQaXhlbEZvcm1hdCIsImhhc1ByZW11bHRpcGxpZWRBbHBoYSIsImlzQWxwaGFBdGxhcyIsIkNMRUFOVVBfSU1BR0VfQ0FDSEUiLCJIVE1MSW1hZ2VFbGVtZW50IiwiX2NsZWFySW1hZ2UiLCJkZXNjcmlwdGlvbiIsInJlbGVhc2VUZXh0dXJlIiwic2V0V3JhcE1vZGUiLCJzZXRGaWx0ZXJzIiwic2V0RmxpcFkiLCJzZXRQcmVtdWx0aXBseUFscGhhIiwicHJlbXVsdGlwbHkiLCJDQ19KU0IiLCJzZXRBbHBoYUF0bGFzIiwiZHluYW1pY0F0bGFzIiwiX2lzQ29tcHJlc3NlZCIsInciLCJoIiwibWF4RnJhbWVTaXplIiwiX2dldEhhc2giLCJBdGxhcyIsIkRFRkFVTFRfSEFTSCIsIl9nZXRPcHRzIiwiYW5pc290cm9weSIsIl9hbmlzb3Ryb3B5IiwiX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMiLCJtaXBtYXBTb3VyY2VzIiwiX3NlcmlhbGl6ZSIsIkNDX1RFU1QiLCJleHRJZCIsImV4cG9ydGVkRXh0cyIsImV4dHMiLCJqb2luIiwiYXNzZXQiLCJfZGVzZXJpYWxpemUiLCJoYW5kbGUiLCJfc2V0UmF3QXNzZXQiLCJjdXN0b21FbnYiLCJ1cmwiLCJfZ2xGb3JtYXQiLCJOdW1iZXIiLCJzcmMiLCJjYiIsImNyZWF0ZUltYWdlQml0bWFwIiwiaW1hZ2VPcmllbnRhdGlvbiIsInRoZW4iLCJlcnJvciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUE4QkE7Ozs7QUE5QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsdUJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUF4Qjs7QUFDQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBSUEsSUFBTUUsVUFBVSxHQUFHLElBQW5CLEVBQXdDOztBQUN4QyxJQUFNQyxTQUFTLEdBQUcsSUFBbEIsRUFBd0M7O0FBQ3hDLElBQU1DLFNBQVMsR0FBRyxLQUFsQixFQUF3Qzs7QUFDeEMsSUFBTUMsZ0JBQWdCLEdBQUcsS0FBekIsRUFBd0M7O0FBQ3hDLElBQU1DLGtCQUFrQixHQUFHLEtBQTNCLEVBQXdDOztBQUN4QyxJQUFNQyxPQUFP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QWVySCxLQUFLLENBQUNxSCxLQUFOLEVBQWY7QUFDQWhFLFFBQUFBLE1BQU0sQ0FBQ3BELEtBQVAsR0FBZUEsS0FBZjtBQUNBb0QsUUFBQUEsTUFBTSxDQUFDbkQsZ0JBQVAsR0FBMEJBLGdCQUExQjtBQUNBLFFBQUEsS0FBSSxDQUFDVyxNQUFMLEdBQWN3QyxNQUFkO0FBQ0ErRyxRQUFBQSxFQUFFO0FBQ0wsT0FUTCxFQVNPLFVBQUMzRCxHQUFELEVBQVM7QUFDUm5LLFFBQUFBLEVBQUUsQ0FBQ2tPLEtBQUgsQ0FBUy9ELEdBQUcsQ0FBQ0UsT0FBYjtBQUNILE9BWEw7QUFZSCxLQWJELE1BY0s7QUFDRHlELE1BQUFBLEVBQUU7QUFDTDtBQUNKO0FBcHdCb0IsQ0FBVCxDQUFoQjtBQXV3QkE7Ozs7Ozs7OztBQVNBOU4sRUFBRSxDQUFDZ0UsU0FBSCxHQUFlbUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEssU0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCByZW5kZXJlciA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyJyk7XG5yZXF1aXJlKCcuLi9wbGF0Zm9ybS9DQ0NsYXNzJyk7XG5cbmltcG9ydCBnZnggZnJvbSAnLi4vLi4vcmVuZGVyZXIvZ2Z4JztcblxuY29uc3QgR0xfTkVBUkVTVCA9IDk3Mjg7ICAgICAgICAgICAgICAgIC8vIGdsLk5FQVJFU1RcbmNvbnN0IEdMX0xJTkVBUiA9IDk3Mjk7ICAgICAgICAgICAgICAgICAvLyBnbC5MSU5FQVJcbmNvbnN0IEdMX1JFUEVBVCA9IDEwNDk3OyAgICAgICAgICAgICAgICAvLyBnbC5SRVBFQVRcbmNvbnN0IEdMX0NMQU1QX1RPX0VER0UgPSAzMzA3MTsgICAgICAgICAvLyBnbC5DTEFNUF9UT19FREdFXG5jb25zdCBHTF9NSVJST1JFRF9SRVBFQVQgPSAzMzY0ODsgICAgICAgLy8gZ2wuTUlSUk9SRURfUkVQRUFUXG5jb25zdCBHTF9SR0JBID0gNjQwODsgICAgICAgICAgICAgICAgICAgLy8gZ2wuUkdCQVxuXG5jb25zdCBDSEFSX0NPREVfMCA9IDQ4OyAgICAvLyAnMCdcbmNvbnN0IENIQVJfQ09ERV8xID0gNDk7ICAgIC8vICcxJ1xuXG52YXIgaWRHZW5lcmF0ZXIgPSBuZXcgKHJlcXVpcmUoJy4uL3BsYXRmb3JtL2lkLWdlbmVyYXRlcicpKSgnVGV4Jyk7XG5cblxuLyoqXG4gKiA8cD5cbiAqIFRoaXMgY2xhc3MgYWxsb3dzIHRvIGVhc2lseSBjcmVhdGUgT3BlbkdMIG9yIENhbnZhcyAyRCB0ZXh0dXJlcyBmcm9tIGltYWdlcywgdGV4dCBvciByYXcgZGF0YS4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogVGhlIGNyZWF0ZWQgY2MuVGV4dHVyZTJEIG9iamVjdCB3aWxsIGFsd2F5cyBoYXZlIHBvd2VyLW9mLXR3byBkaW1lbnNpb25zLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gKiBEZXBlbmRpbmcgb24gaG93IHlvdSBjcmVhdGUgdGhlIGNjLlRleHR1cmUyRCBvYmplY3QsIHRoZSBhY3R1YWwgaW1hZ2UgYXJlYSBvZiB0aGUgdGV4dHVyZSBtaWdodCBiZSBzbWFsbGVyIHRoYW4gdGhlIHRleHR1cmUgZGltZW5zaW9ucyA8YnIvPlxuICogIGkuZS4gXCJjb250ZW50U2l6ZVwiICE9IChwaXhlbHNXaWRlLCBwaXhlbHNIaWdoKSBhbmQgKG1heFMsIG1heFQpICE9ICgxLjAsIDEuMCkuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gKiBCZSBhd2FyZSB0aGF0IHRoZSBjb250ZW50IG9mIHRoZSBnZW5lcmF0ZWQgdGV4dHVyZXMgd2lsbCBiZSB1cHNpZGUtZG93biEgPC9wPlxuXG4gKiBAY2xhc3MgVGV4dHVyZTJEXG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICogQGV4dGVuZHMgQXNzZXRcbiAqL1xuXG4vLyBkZWZpbmUgYSBzcGVjaWZpZWQgbnVtYmVyIGZvciB0aGUgcGl4ZWwgZm9ybWF0IHdoaWNoIGdmeCBkbyBub3QgaGF2ZSBhIHN0YW5kYXJkIGRlZmluaXRpb24uXG5sZXQgQ1VTVE9NX1BJWEVMX0ZPUk1BVCA9IDEwMjQ7XG5cbi8qKlxuICogVGhlIHRleHR1cmUgcGl4ZWwgZm9ybWF0LCBkZWZhdWx0IHZhbHVlIGlzIFJHQkE4ODg4LCBcbiAqIHlvdSBzaG91bGQgbm90ZSB0aGF0IHRleHR1cmVzIGxvYWRlZCBieSBub3JtYWwgaW1hZ2UgZmlsZXMgKHBuZywganBnKSBjYW4gb25seSBzdXBwb3J0IFJHQkE4ODg4IGZvcm1hdCxcbiAqIG90aGVyIGZvcm1hdHMgYXJlIHN1cHBvcnRlZCBieSBjb21wcmVzc2VkIGZpbGUgdHlwZXMgb3IgcmF3IGRhdGEuXG4gKiBAZW51bSBUZXh0dXJlMkQuUGl4ZWxGb3JtYXRcbiAqL1xuY29uc3QgUGl4ZWxGb3JtYXQgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAxNi1iaXQgdGV4dHVyZSB3aXRob3V0IEFscGhhIGNoYW5uZWxcbiAgICAgKiBAcHJvcGVydHkgUkdCNTY1XG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0I1NjU6IGdmeC5URVhUVVJFX0ZNVF9SNV9HNl9CNSxcbiAgICAvKipcbiAgICAgKiAxNi1iaXQgdGV4dHVyZXM6IFJHQjVBMVxuICAgICAqIEBwcm9wZXJ0eSBSR0I1QTFcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJHQjVBMTogZ2Z4LlRFWFRVUkVfRk1UX1I1X0c1X0I1X0ExLFxuICAgIC8qKlxuICAgICAqIDE2LWJpdCB0ZXh0dXJlczogUkdCQTQ0NDRcbiAgICAgKiBAcHJvcGVydHkgUkdCQTQ0NDRcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJHQkE0NDQ0OiBnZnguVEVYVFVSRV9GTVRfUjRfRzRfQjRfQTQsXG4gICAgLyoqXG4gICAgICogMjQtYml0IHRleHR1cmU6IFJHQjg4OFxuICAgICAqIEBwcm9wZXJ0eSBSR0I4ODhcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJHQjg4ODogZ2Z4LlRFWFRVUkVfRk1UX1JHQjgsXG4gICAgLyoqXG4gICAgICogMzItYml0IHRleHR1cmU6IFJHQkE4ODg4XG4gICAgICogQHByb3BlcnR5IFJHQkE4ODg4XG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0JBODg4ODogZ2Z4LlRFWFRVUkVfRk1UX1JHQkE4LFxuICAgIC8qKlxuICAgICAqIDMyLWJpdCBmbG9hdCB0ZXh0dXJlOiBSR0JBMzJGXG4gICAgICogQHByb3BlcnR5IFJHQkEzMkZcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJHQkEzMkY6IGdmeC5URVhUVVJFX0ZNVF9SR0JBMzJGLFxuICAgIC8qKlxuICAgICAqIDgtYml0IHRleHR1cmVzIHVzZWQgYXMgbWFza3NcbiAgICAgKiBAcHJvcGVydHkgQThcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIEE4OiBnZnguVEVYVFVSRV9GTVRfQTgsXG4gICAgLyoqXG4gICAgICogOC1iaXQgaW50ZW5zaXR5IHRleHR1cmVcbiAgICAgKiBAcHJvcGVydHkgSThcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIEk4OiBnZnguVEVYVFVSRV9GTVRfTDgsXG4gICAgLyoqXG4gICAgICogMTYtYml0IHRleHR1cmVzIHVzZWQgYXMgbWFza3NcbiAgICAgKiBAcHJvcGVydHkgQUk4OFxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgQUk4OiBnZnguVEVYVFVSRV9GTVRfTDhfQTgsXG5cbiAgICAvKipcbiAgICAgKiByZ2IgMiBicHAgcHZydGNcbiAgICAgKiBAcHJvcGVydHkgUkdCX1BWUlRDXzJCUFBWMVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkdCX1BWUlRDXzJCUFBWMTogZ2Z4LlRFWFRVUkVfRk1UX1JHQl9QVlJUQ18yQlBQVjEsXG4gICAgLyoqXG4gICAgICogcmdiYSAyIGJwcCBwdnJ0Y1xuICAgICAqIEBwcm9wZXJ0eSBSR0JBX1BWUlRDXzJCUFBWMVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkdCQV9QVlJUQ18yQlBQVjE6IGdmeC5URVhUVVJFX0ZNVF9SR0JBX1BWUlRDXzJCUFBWMSxcbiAgICAvKipcbiAgICAgKiByZ2Igc2VwYXJhdGUgYSAyIGJwcCBwdnJ0Y1xuICAgICAqIFJHQl9BX1BWUlRDXzJCUFBWMSB0ZXh0dXJlIGlzIGEgMnggaGVpZ2h0IFJHQl9QVlJUQ18yQlBQVjEgZm9ybWF0IHRleHR1cmUuXG4gICAgICogSXQgc2VwYXJhdGUgdGhlIG9yaWdpbiBhbHBoYSBjaGFubmVsIHRvIHRoZSBib3R0b20gaGFsZiBhdGxhcywgdGhlIG9yaWdpbiByZ2IgY2hhbm5lbCB0byB0aGUgdG9wIGhhbGYgYXRsYXNcbiAgICAgKiBAcHJvcGVydHkgUkdCX0FfUFZSVENfMkJQUFYxXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0JfQV9QVlJUQ18yQlBQVjE6IENVU1RPTV9QSVhFTF9GT1JNQVQrKyxcbiAgICAvKipcbiAgICAgKiByZ2IgNCBicHAgcHZydGNcbiAgICAgKiBAcHJvcGVydHkgUkdCX1BWUlRDXzRCUFBWMVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkdCX1BWUlRDXzRCUFBWMTogZ2Z4LlRFWFRVUkVfRk1UX1JHQl9QVlJUQ180QlBQVjEsXG4gICAgLyoqXG4gICAgICogcmdiYSA0IGJwcCBwdnJ0Y1xuICAgICAqIEBwcm9wZXJ0eSBSR0JBX1BWUlRDXzRCUFBWMVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkdCQV9QVlJUQ180QlBQVjE6IGdmeC5URVhUVVJFX0ZNVF9SR0JBX1BWUlRDXzRCUFBWMSxcbiAgICAvKipcbiAgICAgKiByZ2IgYSA0IGJwcCBwdnJ0Y1xuICAgICAqIFJHQl9BX1BWUlRDXzRCUFBWMSB0ZXh0dXJlIGlzIGEgMnggaGVpZ2h0IFJHQl9QVlJUQ180QlBQVjEgZm9ybWF0IHRleHR1cmUuXG4gICAgICogSXQgc2VwYXJhdGUgdGhlIG9yaWdpbiBhbHBoYSBjaGFubmVsIHRvIHRoZSBib3R0b20gaGFsZiBhdGxhcywgdGhlIG9yaWdpbiByZ2IgY2hhbm5lbCB0byB0aGUgdG9wIGhhbGYgYXRsYXNcbiAgICAgKiBAcHJvcGVydHkgUkdCX0FfUFZSVENfNEJQUFYxXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0JfQV9QVlJUQ180QlBQVjE6IENVU1RPTV9QSVhFTF9GT1JNQVQrKyxcbiAgICAvKipcbiAgICAgKiByZ2IgZXRjMVxuICAgICAqIEBwcm9wZXJ0eSBSR0JfRVRDMVxuICAgICAqIEByZWFkb25seVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgUkdCX0VUQzE6IGdmeC5URVhUVVJFX0ZNVF9SR0JfRVRDMSxcbiAgICAvKipcbiAgICAgKiByZ2JhIGV0YzFcbiAgICAgKiBAcHJvcGVydHkgUkdCQV9FVEMxXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0JBX0VUQzE6IENVU1RPTV9QSVhFTF9GT1JNQVQrKyxcblxuICAgIC8qKlxuICAgICAqIHJnYiBldGMyXG4gICAgICogQHByb3BlcnR5IFJHQl9FVEMyXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBSR0JfRVRDMjogZ2Z4LlRFWFRVUkVfRk1UX1JHQl9FVEMyLFxuICAgIC8qKlxuICAgICAqIHJnYmEgZXRjMlxuICAgICAqIEBwcm9wZXJ0eSBSR0JBX0VUQzJcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIFJHQkFfRVRDMjogZ2Z4LlRFWFRVUkVfRk1UX1JHQkFfRVRDMixcbn0pO1xuXG4vKipcbiAqIFRoZSB0ZXh0dXJlIHdyYXAgbW9kZVxuICogQGVudW0gVGV4dHVyZTJELldyYXBNb2RlXG4gKi9cbmNvbnN0IFdyYXBNb2RlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogVGhlIGNvbnN0YW50IHZhcmlhYmxlIGVxdWFscyBnbC5SRVBFQVQgZm9yIHRleHR1cmVcbiAgICAgKiBAcHJvcGVydHkgUkVQRUFUXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBSRVBFQVQ6IEdMX1JFUEVBVCxcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RhbnQgdmFyaWFibGUgZXF1YWxzIGdsLkNMQU1QX1RPX0VER0UgZm9yIHRleHR1cmVcbiAgICAgKiBAcHJvcGVydHkgQ0xBTVBfVE9fRURHRVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgQ0xBTVBfVE9fRURHRTogR0xfQ0xBTVBfVE9fRURHRSxcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RhbnQgdmFyaWFibGUgZXF1YWxzIGdsLk1JUlJPUkVEX1JFUEVBVCBmb3IgdGV4dHVyZVxuICAgICAqIEBwcm9wZXJ0eSBNSVJST1JFRF9SRVBFQVRcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIE1JUlJPUkVEX1JFUEVBVDogR0xfTUlSUk9SRURfUkVQRUFUXG59KTtcblxuLyoqXG4gKiBUaGUgdGV4dHVyZSBmaWx0ZXIgbW9kZVxuICogQGVudW0gVGV4dHVyZTJELkZpbHRlclxuICovXG5jb25zdCBGaWx0ZXIgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiBUaGUgY29uc3RhbnQgdmFyaWFibGUgZXF1YWxzIGdsLkxJTkVBUiBmb3IgdGV4dHVyZVxuICAgICAqIEBwcm9wZXJ0eSBMSU5FQVJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIExJTkVBUjogR0xfTElORUFSLFxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdGFudCB2YXJpYWJsZSBlcXVhbHMgZ2wuTkVBUkVTVCBmb3IgdGV4dHVyZVxuICAgICAqIEBwcm9wZXJ0eSBORUFSRVNUXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBORUFSRVNUOiBHTF9ORUFSRVNUXG59KTtcblxuY29uc3QgRmlsdGVySW5kZXggPSB7XG4gICAgOTcyODogMCwgLy8gR0xfTkVBUkVTVFxuICAgIDk3Mjk6IDEsIC8vIEdMX0xJTkVBUlxufTtcblxubGV0IF9pbWFnZXMgPSBbXTtcbmxldCBfc2hhcmVkT3B0cyA9IHtcbiAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgIG1pbkZpbHRlcjogdW5kZWZpbmVkLFxuICAgIG1hZ0ZpbHRlcjogdW5kZWZpbmVkLFxuICAgIHdyYXBTOiB1bmRlZmluZWQsXG4gICAgd3JhcFQ6IHVuZGVmaW5lZCxcbiAgICBmb3JtYXQ6IHVuZGVmaW5lZCxcbiAgICBnZW5NaXBtYXBzOiB1bmRlZmluZWQsXG4gICAgaW1hZ2VzOiB1bmRlZmluZWQsXG4gICAgaW1hZ2U6IHVuZGVmaW5lZCxcbiAgICBmbGlwWTogdW5kZWZpbmVkLFxuICAgIHByZW11bHRpcGx5QWxwaGE6IHVuZGVmaW5lZFxufTtcbmZ1bmN0aW9uIF9nZXRTaGFyZWRPcHRpb25zICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gX3NoYXJlZE9wdHMpIHtcbiAgICAgICAgX3NoYXJlZE9wdHNba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgX2ltYWdlcy5sZW5ndGggPSAwO1xuICAgIF9zaGFyZWRPcHRzLmltYWdlcyA9IF9pbWFnZXM7XG4gICAgcmV0dXJuIF9zaGFyZWRPcHRzO1xufVxuXG4vKipcbiAqIFRoaXMgY2xhc3MgYWxsb3dzIHRvIGVhc2lseSBjcmVhdGUgT3BlbkdMIG9yIENhbnZhcyAyRCB0ZXh0dXJlcyBmcm9tIGltYWdlcyBvciByYXcgZGF0YS5cbiAqXG4gKiBAY2xhc3MgVGV4dHVyZTJEXG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICogQGV4dGVuZHMgQXNzZXRcbiAqL1xudmFyIFRleHR1cmUyRCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVGV4dHVyZTJEJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuLi9hc3NldHMvQ0NBc3NldCcpLFxuICAgIG1peGluczogW0V2ZW50VGFyZ2V0XSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIC8vIG1heWJlIHJldHVybmVkIHRvIHBvb2wgaW4gd2ViZ2xcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW1hZ2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0IChkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuX2NvbXByZXNzZWQgJiYgZGF0YS5fZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRXaXRoRGF0YShkYXRhLl9kYXRhLCB0aGlzLl9mb3JtYXQsIGRhdGEud2lkdGgsIGRhdGEuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFdpdGhFbGVtZW50KGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBfZm9ybWF0OiBQaXhlbEZvcm1hdC5SR0JBODg4OCxcbiAgICAgICAgX3ByZW11bHRpcGx5QWxwaGE6IGZhbHNlLFxuICAgICAgICBfZmxpcFk6IGZhbHNlLFxuICAgICAgICBfbWluRmlsdGVyOiBGaWx0ZXIuTElORUFSLFxuICAgICAgICBfbWFnRmlsdGVyOiBGaWx0ZXIuTElORUFSLFxuICAgICAgICBfbWlwRmlsdGVyOiBGaWx0ZXIuTElORUFSLFxuICAgICAgICBfd3JhcFM6IFdyYXBNb2RlLkNMQU1QX1RPX0VER0UsXG4gICAgICAgIF93cmFwVDogV3JhcE1vZGUuQ0xBTVBfVE9fRURHRSxcblxuICAgICAgICBfaXNBbHBoYUF0bGFzOiBmYWxzZSxcblxuICAgICAgICBfZ2VuTWlwbWFwczogZmFsc2UsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNldHMgd2hldGhlciBnZW5lcmF0ZSBtaXBtYXBzIGZvciB0aGUgdGV4dHVyZVxuICAgICAgICAgKiAhI3poIOaYr+WQpuS4uue6ueeQhuiuvue9rueUn+aIkCBtaXBtYXBz44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZ2VuTWlwbWFwc1xuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgZ2VuTWlwbWFwczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2VuTWlwbWFwcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKGdlbk1pcG1hcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZ2VuTWlwbWFwcyAhPT0gZ2VuTWlwbWFwcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZ2VuTWlwbWFwcyA9IGdlbk1pcG1hcHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKG9wdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBfcGFja2FibGU6IHRydWUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFxuICAgICAgICAgKiBTZXRzIHdoZXRoZXIgdGV4dHVyZSBjYW4gYmUgcGFja2VkIGludG8gdGV4dHVyZSBhdGxhcy5cbiAgICAgICAgICogSWYgbmVlZCB1c2UgdGV4dHVyZSB1diBpbiBjdXN0b20gRWZmZWN0LCBwbGVhc2Ugc2V0cyBwYWNrYWJsZSB0byBmYWxzZS5cbiAgICAgICAgICogISN6aCBcbiAgICAgICAgICog6K6+572u57q555CG5piv5ZCm5YWB6K645Y+C5LiO5ZCI5Zu+44CCXG4gICAgICAgICAqIOWmguaenOmcgOimgeWcqOiHquWumuS5iSBFZmZlY3Qg5Lit5L2/55So57q555CGIFVW77yM6ZyA6KaB56aB5q2i6K+l6YCJ6aG544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gcGFja2FibGVcbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgcGFja2FibGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhY2thYmxlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFja2FibGUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBfbmF0aXZlRGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIF9faXNOYXRpdmVfXzogdHJ1ZSwgXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHRoaXMuX3V1aWQsIFxuICAgICAgICAgICAgICAgICAgICBleHQ6IHRoaXMuX25hdGl2ZSwgXG4gICAgICAgICAgICAgICAgICAgIF9fZmxpcFlfXzogdGhpcy5fZmxpcFksXG4gICAgICAgICAgICAgICAgICAgIF9fcHJlbXVsdGlwbHlBbHBoYV9fOiB0aGlzLl9wcmVtdWx0aXBseUFscGhhXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgUGl4ZWxGb3JtYXQ6IFBpeGVsRm9ybWF0LFxuICAgICAgICBXcmFwTW9kZTogV3JhcE1vZGUsXG4gICAgICAgIEZpbHRlcjogRmlsdGVyLFxuICAgICAgICBfRmlsdGVySW5kZXg6IEZpbHRlckluZGV4LFxuICAgICAgICAvLyBwcmVkZWZpbmVkIG1vc3QgY29tbW9uIGV4dG5hbWVzXG4gICAgICAgIGV4dG5hbWVzOiBbJy5wbmcnLCAnLmpwZycsICcuanBlZycsICcuYm1wJywgJy53ZWJwJywgJy5wdnInLCAnLnBrbSddLFxuXG4gICAgICAgIF9wYXJzZU5hdGl2ZURlcEZyb21Kc29uIChqc29uKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGpzb24uY29udGVudDtcbiAgICAgICAgICAgIGxldCBmaWVsZHMgPSBkYXRhLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAvLyBkZWNvZGUgZXh0bmFtZVxuICAgICAgICAgICAgdmFyIGV4dElkU3RyID0gZmllbGRzWzBdO1xuICAgICAgICAgICAgdmFyIGV4dCA9ICcnO1xuICAgICAgICAgICAgaWYgKGV4dElkU3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFRleHR1cmUyRC5fcGFyc2VFeHQoZXh0SWRTdHIsIFBpeGVsRm9ybWF0LlJHQkE4ODg4KTtcbiAgICAgICAgICAgICAgICBleHQgPSByZXN1bHQuYmVzdEV4dCB8fCByZXN1bHQuZGVmYXVsdEV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgX19pc05hdGl2ZV9fOiB0cnVlLCBleHQsIF9fZmxpcFlfXzogZmFsc2UsIF9fcHJlbXVsdGlwbHlBbHBoYV9fOiBmaWVsZHNbNV0gJiYgZmllbGRzWzVdLmNoYXJDb2RlQXQoMCkgPT09IENIQVJfQ09ERV8xIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3BhcnNlRXh0IChleHRJZFN0ciwgZGVmYXVsdEZvcm1hdCkge1xuICAgICAgICAgICAgbGV0IGRldmljZSA9IGNjLnJlbmRlcmVyLmRldmljZTtcbiAgICAgICAgICAgIGxldCBleHRJZHMgPSBleHRJZFN0ci5zcGxpdCgnXycpO1xuXG4gICAgICAgICAgICBsZXQgZGVmYXVsdEV4dCA9ICcnO1xuICAgICAgICAgICAgbGV0IGJlc3RFeHQgPSAnJztcbiAgICAgICAgICAgIGxldCBiZXN0SW5kZXggPSA5OTk7XG4gICAgICAgICAgICBsZXQgYmVzdEZvcm1hdCA9IGRlZmF1bHRGb3JtYXQ7XG4gICAgICAgICAgICBsZXQgU3VwcG9ydFRleHR1cmVGb3JtYXRzID0gY2MubWFjcm8uU1VQUE9SVF9URVhUVVJFX0ZPUk1BVFM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4dElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBleHRGb3JtYXQgPSBleHRJZHNbaV0uc3BsaXQoJ0AnKTtcbiAgICAgICAgICAgICAgICBsZXQgdG1wRXh0ID0gZXh0Rm9ybWF0WzBdO1xuICAgICAgICAgICAgICAgIHRtcEV4dCA9IFRleHR1cmUyRC5leHRuYW1lc1t0bXBFeHQuY2hhckNvZGVBdCgwKSAtIENIQVJfQ09ERV8wXSB8fCB0bXBFeHQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBTdXBwb3J0VGV4dHVyZUZvcm1hdHMuaW5kZXhPZih0bXBFeHQpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEgJiYgaW5kZXggPCBiZXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB0bXBGb3JtYXQgPSBleHRGb3JtYXRbMV0gPyBwYXJzZUludChleHRGb3JtYXRbMV0pIDogZGVmYXVsdEZvcm1hdDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB3aGV0aGVyIG9yIG5vdCBzdXBwb3J0IGNvbXByZXNzZWQgdGV4dHVyZVxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRtcEV4dCA9PT0gJy5wdnInICYmICFkZXZpY2UuZXh0KCdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfcHZydGMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKHRtcEZvcm1hdCA9PT0gUGl4ZWxGb3JtYXQuUkdCX0VUQzEgfHwgdG1wRm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JBX0VUQzEpICYmICFkZXZpY2UuZXh0KCdXRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfZXRjMScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgodG1wRm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JfRVRDMiB8fCB0bXBGb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQkFfRVRDMikgJiYgIWRldmljZS5leHQoJ1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodG1wRXh0ID09PSAnLndlYnAnICYmICFjYy5zeXMuY2FwYWJpbGl0aWVzLndlYnApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgYmVzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RFeHQgPSB0bXBFeHQ7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RGb3JtYXQgPSB0bXBGb3JtYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFkZWZhdWx0RXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRFeHQgPSB0bXBFeHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgYmVzdEV4dCwgYmVzdEZvcm1hdCwgZGVmYXVsdEV4dCB9O1xuICAgICAgICB9LFxuXG4gICAgICAgIF9wYXJzZURlcHNGcm9tSnNvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0gXG4gICAgfSxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICAvLyBJZCBmb3IgZ2VuZXJhdGUgaGFzaCBpbiBtYXRlcmlhbFxuICAgICAgICB0aGlzLl9pZCA9IGlkR2VuZXJhdGVyLmdldE5ld0lkKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogV2hldGhlciB0aGUgdGV4dHVyZSBpcyBsb2FkZWQgb3Igbm90XG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6LS05Zu+5piv5ZCm5bey57uP5oiQ5Yqf5Yqg6L29XG4gICAgICAgICAqIEBwcm9wZXJ0eSBsb2FkZWRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUZXh0dXJlIHdpZHRoIGluIHBpeGVsXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6LS05Zu+5YOP57Sg5a695bqmXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRleHR1cmUgaGVpZ2h0IGluIHBpeGVsXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6LS05Zu+5YOP57Sg6auY5bqmXG4gICAgICAgICAqIEBwcm9wZXJ0eSBoZWlnaHRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMDtcblxuICAgICAgICB0aGlzLl9oYXNoRGlydHkgPSB0cnVlO1xuICAgICAgICB0aGlzLl9oYXNoID0gMDtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSA9IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9leHBvcnRlZEV4dHMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgcmVuZGVyZXIgdGV4dHVyZSBpbXBsZW1lbnRhdGlvbiBvYmplY3RcbiAgICAgKiBleHRlbmRlZCBmcm9tIHJlbmRlci5UZXh0dXJlMkRcbiAgICAgKiAhI3poICDov5Tlm57muLLmn5PlmajlhoXpg6jotLTlm77lr7nosaFcbiAgICAgKiBAbWV0aG9kIGdldEltcGxcbiAgICAgKi9cbiAgICBnZXRJbXBsICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHR1cmU7XG4gICAgfSxcblxuICAgIGdldElkICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH0sXG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hdGl2ZVVybCB8fCAnJztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRleHR1cmUgb3B0aW9ucywgbm90IGF2YWlsYWJsZSBpbiBDYW52YXMgcmVuZGVyIG1vZGUuXG4gICAgICogaW1hZ2UsIGZvcm1hdCwgcHJlbXVsdGlwbHlBbHBoYSBjYW4gbm90IGJlIHVwZGF0ZWQgaW4gbmF0aXZlLlxuICAgICAqIEBtZXRob2QgdXBkYXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge0RPTUltYWdlRWxlbWVudH0gb3B0aW9ucy5pbWFnZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5nZW5NaXBtYXBzXG4gICAgICogQHBhcmFtIHtQaXhlbEZvcm1hdH0gb3B0aW9ucy5mb3JtYXRcbiAgICAgKiBAcGFyYW0ge0ZpbHRlcn0gb3B0aW9ucy5taW5GaWx0ZXJcbiAgICAgKiBAcGFyYW0ge0ZpbHRlcn0gb3B0aW9ucy5tYWdGaWx0ZXJcbiAgICAgKiBAcGFyYW0ge1dyYXBNb2RlfSBvcHRpb25zLndyYXBTXG4gICAgICogQHBhcmFtIHtXcmFwTW9kZX0gb3B0aW9ucy53cmFwVFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5wcmVtdWx0aXBseUFscGhhXG4gICAgICovXG4gICAgdXBkYXRlIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgdXBkYXRlSW1nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53aWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oZWlnaHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5taW5GaWx0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21pbkZpbHRlciA9IG9wdGlvbnMubWluRmlsdGVyO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubWluRmlsdGVyID0gRmlsdGVySW5kZXhbb3B0aW9ucy5taW5GaWx0ZXJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMubWFnRmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYWdGaWx0ZXIgPSBvcHRpb25zLm1hZ0ZpbHRlcjtcbiAgICAgICAgICAgICAgICBvcHRpb25zLm1hZ0ZpbHRlciA9IEZpbHRlckluZGV4W29wdGlvbnMubWFnRmlsdGVyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLm1pcEZpbHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWlwRmlsdGVyID0gb3B0aW9ucy5taXBGaWx0ZXI7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5taXBGaWx0ZXIgPSBGaWx0ZXJJbmRleFtvcHRpb25zLm1pcEZpbHRlcl07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy53cmFwUyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JhcFMgPSBvcHRpb25zLndyYXBTO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMud3JhcFQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBUID0gb3B0aW9ucy53cmFwVDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZvcm1hdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5mbGlwWSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmxpcFkgPSBvcHRpb25zLmZsaXBZO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUltZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5wcmVtdWx0aXBseUFscGhhICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmVtdWx0aXBseUFscGhhID0gb3B0aW9ucy5wcmVtdWx0aXBseUFscGhhO1xuICAgICAgICAgICAgICAgIHVwZGF0ZUltZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5nZW5NaXBtYXBzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9nZW5NaXBtYXBzID0gb3B0aW9ucy5nZW5NaXBtYXBzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2Muc3lzLmNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiB0aGlzLl9pbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tJbWFnZUJpdG1hcCh0aGlzLl91cGxvYWQuYmluZCh0aGlzLCBvcHRpb25zLCB1cGRhdGVJbWcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwbG9hZChvcHRpb25zLCB1cGRhdGVJbWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICBfdXBsb2FkIChvcHRpb25zLCB1cGRhdGVJbWcpIHtcbiAgICAgICAgaWYgKHVwZGF0ZUltZyAmJiB0aGlzLl9pbWFnZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5pbWFnZSA9IHRoaXMuX2ltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmltYWdlcyAmJiBvcHRpb25zLmltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG9wdGlvbnMuaW1hZ2VzWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuaW1hZ2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBvcHRpb25zLmltYWdlO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmltYWdlcykge1xuICAgICAgICAgICAgICAgIF9pbWFnZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmltYWdlcyA9IF9pbWFnZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB3ZWJnbCB0ZXh0dXJlIDJkIHVzZXMgaW1hZ2VzXG4gICAgICAgICAgICBvcHRpb25zLmltYWdlcy5wdXNoKG9wdGlvbnMuaW1hZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGV4dHVyZSAmJiB0aGlzLl90ZXh0dXJlLnVwZGF0ZShvcHRpb25zKTtcblxuICAgICAgICB0aGlzLl9oYXNoRGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSW5pdCB3aXRoIEhUTUwgZWxlbWVudC5cbiAgICAgKiAhI3poIOeUqCBIVE1MIEltYWdlIOaIliBDYW52YXMg5a+56LGh5Yid5aeL5YyW6LS05Zu+44CCXG4gICAgICogQG1ldGhvZCBpbml0V2l0aEVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxJbWFnZUVsZW1lbnR8SFRNTENhbnZhc0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgKiBpbWcuc3JjID0gZGF0YVVSTDtcbiAgICAgKiB0ZXh0dXJlLmluaXRXaXRoRWxlbWVudChpbWcpO1xuICAgICAqL1xuICAgIGluaXRXaXRoRWxlbWVudCAoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuX2ltYWdlID0gZWxlbWVudDtcbiAgICAgICAgaWYgKGVsZW1lbnQuY29tcGxldGUgfHwgZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjYy5zeXMuY2FwYWJpbGl0aWVzLmltYWdlQml0bWFwICYmIGVsZW1lbnQgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tJbWFnZUJpdG1hcCh0aGlzLmhhbmRsZUxvYWRlZFRleHR1cmUuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oYW5kbGVMb2FkZWRUZXh0dXJlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDMxMTksIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBJbnRpYWxpemVzIHdpdGggdGV4dHVyZSBkYXRhIGluIEFycmF5QnVmZmVyVmlldy5cbiAgICAgKiAhI3poIOS9v+eUqOS4gOS4quWtmOWCqOWcqCBBcnJheUJ1ZmZlclZpZXcg5Lit55qE5Zu+5YOP5pWw5o2u77yIcmF3IGRhdGHvvInliJ3lp4vljJbmlbDmja7jgIJcbiAgICAgKiBAbWV0aG9kIGluaXRXaXRoRGF0YVxuICAgICAqIEBwYXJhbSB7QXJyYXlCdWZmZXJWaWV3fSBkYXRhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBpeGVsRm9ybWF0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBpeGVsc1dpZHRoXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBpeGVsc0hlaWdodFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgaW5pdFdpdGhEYXRhIChkYXRhLCBwaXhlbEZvcm1hdCwgcGl4ZWxzV2lkdGgsIHBpeGVsc0hlaWdodCkge1xuICAgICAgICB2YXIgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XG4gICAgICAgIG9wdHMuaW1hZ2UgPSBkYXRhO1xuICAgICAgICAvLyB3ZWJnbCB0ZXh0dXJlIDJkIHVzZXMgaW1hZ2VzXG4gICAgICAgIG9wdHMuaW1hZ2VzID0gW29wdHMuaW1hZ2VdO1xuICAgICAgICBvcHRzLmdlbk1pcG1hcHMgPSB0aGlzLl9nZW5NaXBtYXBzO1xuICAgICAgICBvcHRzLnByZW11bHRpcGx5QWxwaGEgPSB0aGlzLl9wcmVtdWx0aXBseUFscGhhO1xuICAgICAgICBvcHRzLmZsaXBZID0gdGhpcy5fZmxpcFk7XG4gICAgICAgIG9wdHMubWluRmlsdGVyID0gRmlsdGVySW5kZXhbdGhpcy5fbWluRmlsdGVyXTtcbiAgICAgICAgb3B0cy5tYWdGaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9tYWdGaWx0ZXJdO1xuICAgICAgICBvcHRzLndyYXBTID0gdGhpcy5fd3JhcFM7XG4gICAgICAgIG9wdHMud3JhcFQgPSB0aGlzLl93cmFwVDtcbiAgICAgICAgb3B0cy5mb3JtYXQgPSB0aGlzLl9nZXRHRlhQaXhlbEZvcm1hdChwaXhlbEZvcm1hdCk7XG4gICAgICAgIG9wdHMud2lkdGggPSBwaXhlbHNXaWR0aDtcbiAgICAgICAgb3B0cy5oZWlnaHQgPSBwaXhlbHNIZWlnaHQ7XG4gICAgICAgIGlmICghdGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZSA9IG5ldyByZW5kZXJlci5UZXh0dXJlMkQocmVuZGVyZXIuZGV2aWNlLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmUudXBkYXRlKG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud2lkdGggPSBwaXhlbHNXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwaXhlbHNIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlRm9ybWF0KCk7XG4gICAgICAgIHRoaXMuX2NoZWNrUGFja2FibGUoKTtcblxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdChcImxvYWRcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSFRNTEVsZW1lbnQgT2JqZWN0IGdldHRlciwgYXZhaWxhYmxlIG9ubHkgb24gd2ViLjxici8+XG4gICAgICogTm90ZTogdGV4dHVyZSBpcyBwYWNrZWQgaW50byB0ZXh0dXJlIGF0bGFzIGJ5IGRlZmF1bHQ8YnIvPlxuICAgICAqIHlvdSBzaG91bGQgc2V0IHRleHR1cmUucGFja2FibGUgYXMgZmFsc2UgYmVmb3JlIGdldHRpbmcgSHRtbCBlbGVtZW50IG9iamVjdC5cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjei0tOWbvuWvueW6lOeahCBIVE1MIEltYWdlIOaIliBDYW52YXMg5a+56LGh77yM5Y+q5ZyoIFdlYiDlubPlj7DkuIvmnInmlYjjgII8YnIvPlxuICAgICAqIOazqOaEj++8mjxici8+XG4gICAgICogdGV4dHVyZSDpu5jorqTlj4LkuI7liqjmgIHlkIjlm77vvIzlpoLmnpzpnIDopoHojrflj5bliLDmraPnoa7nmoQgSHRtbCDlhYPntKDlr7nosaHvvIzpnIDopoHlhYjorr7nva4gdGV4dHVyZS5wYWNrYWJsZSDkuLogZmFsc2VcbiAgICAgKiBAbWV0aG9kIGdldEh0bWxFbGVtZW50T2JqXG4gICAgICogQHJldHVybiB7SFRNTEltYWdlRWxlbWVudHxIVE1MQ2FudmFzRWxlbWVudH1cbiAgICAgKi9cbiAgICBnZXRIdG1sRWxlbWVudE9iaiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZTtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEZXN0b3J5IHRoaXMgdGV4dHVyZSBhbmQgaW1tZWRpYXRlbHkgcmVsZWFzZSBpdHMgdmlkZW8gbWVtb3J5LiAoSW5oZXJpdCBmcm9tIGNjLk9iamVjdC5kZXN0cm95KTxicj5cbiAgICAgKiBBZnRlciBkZXN0cm95LCB0aGlzIG9iamVjdCBpcyBub3QgdXNhYmxlIGFueW1vcmUuXG4gICAgICogWW91IGNhbiB1c2UgY2MuaXNWYWxpZChvYmopIHRvIGNoZWNrIHdoZXRoZXIgdGhlIG9iamVjdCBpcyBkZXN0cm95ZWQgYmVmb3JlIGFjY2Vzc2luZyBpdC5cbiAgICAgKiAhI3poXG4gICAgICog6ZSA5q+B6K+l6LS05Zu+77yM5bm256uL5Y2z6YeK5pS+5a6D5a+55bqU55qE5pi+5a2Y44CC77yI57un5om/6IeqIGNjLk9iamVjdC5kZXN0cm9577yJPGJyLz5cbiAgICAgKiDplIDmr4HlkI7vvIzor6Xlr7nosaHkuI3lho3lj6/nlKjjgILmgqjlj6/ku6XlnKjorr/pl67lr7nosaHkuYvliY3kvb/nlKggY2MuaXNWYWxpZChvYmopIOadpeajgOafpeWvueixoeaYr+WQpuW3suiiq+mUgOavgeOAglxuICAgICAqIEBtZXRob2QgZGVzdHJveVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGluaGVyaXQgZnJvbSB0aGUgQ0NPYmplY3RcbiAgICAgKi9cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgaWYgKGNjLnN5cy5jYXBhYmlsaXRpZXMuaW1hZ2VCaXRtYXAgJiYgdGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBJbWFnZUJpdG1hcCkge1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UuY2xvc2UgJiYgdGhpcy5faW1hZ2UuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYWNrYWJsZSAmJiBjYy5keW5hbWljQXRsYXNNYW5hZ2VyICYmIGNjLmR5bmFtaWNBdGxhc01hbmFnZXIuZGVsZXRlQXRsYXNUZXh0dXJlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSAmJiB0aGlzLl90ZXh0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFBpeGVsIGZvcm1hdCBvZiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiOt+WPlue6ueeQhueahOWDj+e0oOagvOW8j+OAglxuICAgICAqIEBtZXRob2QgZ2V0UGl4ZWxGb3JtYXRcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0UGl4ZWxGb3JtYXQgKCkge1xuICAgICAgICAvL3N1cHBvcnQgb25seSBpbiBXZWJHbCByZW5kZXJpbmcgbW9kZVxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogV2hldGhlciBvciBub3QgdGhlIHRleHR1cmUgaGFzIHRoZWlyIEFscGhhIHByZW11bHRpcGxpZWQuXG4gICAgICogISN6aCDmo4Dmn6XnurnnkIblnKjkuIrkvKAgR1BVIOaXtumihOS5mOmAiemhueaYr+WQpuW8gOWQr+OAglxuICAgICAqIEBtZXRob2QgaGFzUHJlbXVsdGlwbGllZEFscGhhXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNQcmVtdWx0aXBsaWVkQWxwaGEgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlbXVsdGlwbHlBbHBoYSB8fCBmYWxzZTtcbiAgICB9LFxuXG4gICAgaXNBbHBoYUF0bGFzICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWxwaGFBdGxhcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEhhbmRsZXIgb2YgdGV4dHVyZSBsb2FkZWQgZXZlbnQuXG4gICAgICogU2luY2UgdjIuMCwgeW91IGRvbid0IG5lZWQgdG8gaW52b2tlIHRoaXMgZnVuY3Rpb24sIGl0IHdpbGwgYmUgaW52b2tlZCBhdXRvbWF0aWNhbGx5IGFmdGVyIHRleHR1cmUgbG9hZGVkLlxuICAgICAqICEjemgg6LS05Zu+5Yqg6L295LqL5Lu25aSE55CG5Zmo44CCdjIuMCDkuYvlkI7kvaDlsIbkuI3lnKjpnIDopoHmiYvliqjmiafooYzov5nkuKrlh73mlbDvvIzlroPkvJrlnKjotLTlm77liqDovb3miJDlip/kuYvlkI7oh6rliqjmiafooYzjgIJcbiAgICAgKiBAbWV0aG9kIGhhbmRsZUxvYWRlZFRleHR1cmVcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtwcmVtdWx0aXBsaWVkXVxuICAgICAqL1xuICAgIGhhbmRsZUxvYWRlZFRleHR1cmUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ltYWdlIHx8ICF0aGlzLl9pbWFnZS53aWR0aCB8fCAhdGhpcy5faW1hZ2UuaGVpZ2h0KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuX2ltYWdlLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuX2ltYWdlLmhlaWdodDtcbiAgICAgICAgbGV0IG9wdHMgPSBfZ2V0U2hhcmVkT3B0aW9ucygpO1xuICAgICAgICBvcHRzLmltYWdlID0gdGhpcy5faW1hZ2U7XG4gICAgICAgIC8vIHdlYmdsIHRleHR1cmUgMmQgdXNlcyBpbWFnZXNcbiAgICAgICAgb3B0cy5pbWFnZXMgPSBbb3B0cy5pbWFnZV07XG4gICAgICAgIG9wdHMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBvcHRzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICBvcHRzLmdlbk1pcG1hcHMgPSB0aGlzLl9nZW5NaXBtYXBzO1xuICAgICAgICBvcHRzLmZvcm1hdCA9IHRoaXMuX2dldEdGWFBpeGVsRm9ybWF0KHRoaXMuX2Zvcm1hdCk7XG4gICAgICAgIG9wdHMucHJlbXVsdGlwbHlBbHBoYSA9IHRoaXMuX3ByZW11bHRpcGx5QWxwaGE7XG4gICAgICAgIG9wdHMuZmxpcFkgPSB0aGlzLl9mbGlwWTtcbiAgICAgICAgb3B0cy5taW5GaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9taW5GaWx0ZXJdO1xuICAgICAgICBvcHRzLm1hZ0ZpbHRlciA9IEZpbHRlckluZGV4W3RoaXMuX21hZ0ZpbHRlcl07XG4gICAgICAgIG9wdHMud3JhcFMgPSB0aGlzLl93cmFwUztcbiAgICAgICAgb3B0cy53cmFwVCA9IHRoaXMuX3dyYXBUO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlID0gbmV3IHJlbmRlcmVyLlRleHR1cmUyRChyZW5kZXJlci5kZXZpY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGUob3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVGb3JtYXQoKTtcbiAgICAgICAgdGhpcy5fY2hlY2tQYWNrYWJsZSgpO1xuXG4gICAgICAgIC8vZGlzcGF0Y2ggbG9hZCBldmVudCB0byBsaXN0ZW5lci5cbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoXCJsb2FkXCIpO1xuXG4gICAgICAgIGlmIChjYy5tYWNyby5DTEVBTlVQX0lNQUdFX0NBQ0hFKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2xlYXJJbWFnZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2Muc3lzLmNhcGFiaWxpdGllcy5pbWFnZUJpdG1hcCAmJiB0aGlzLl9pbWFnZSBpbnN0YW5jZW9mIEltYWdlQml0bWFwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW1hZ2UuY2xvc2UgJiYgdGhpcy5faW1hZ2UuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRGVzY3JpcHRpb24gb2YgY2MuVGV4dHVyZTJELlxuICAgICAqICEjemggY2MuVGV4dHVyZTJEIOaPj+i/sOOAglxuICAgICAqIEBtZXRob2QgZGVzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGRlc2NyaXB0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiPGNjLlRleHR1cmUyRCB8IE5hbWUgPSBcIiArIHRoaXMubmF0aXZlVXJsICsgXCIgfCBEaW1lbnNpb25zID0gXCIgKyB0aGlzLndpZHRoICsgXCIgeCBcIiArIHRoaXMuaGVpZ2h0ICsgXCI+XCI7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWxlYXNlIHRleHR1cmUsIHBsZWFzZSB1c2UgZGVzdHJveSBpbnN0ZWFkLlxuICAgICAqICEjemgg6YeK5pS+57q555CG77yM6K+35L2/55SoIGRlc3Ryb3kg5pu/5Luj44CCXG4gICAgICogQG1ldGhvZCByZWxlYXNlVGV4dHVyZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKi9cbiAgICByZWxlYXNlVGV4dHVyZSAoKSB7XG4gICAgICAgIHRoaXMuX2ltYWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGV4dHVyZSAmJiB0aGlzLl90ZXh0dXJlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSB3cmFwIHMgYW5kIHdyYXAgdCBvcHRpb25zLiA8YnIvPlxuICAgICAqIElmIHRoZSB0ZXh0dXJlIHNpemUgaXMgTlBPVCAobm9uIHBvd2VyIG9mIDIpLCB0aGVuIGluIGNhbiBvbmx5IHVzZSBnbC5DTEFNUF9UT19FREdFIGluIGdsLlRFWFRVUkVfV1JBUF97UyxUfS5cbiAgICAgKiAhI3poIOiuvue9rue6ueeQhuWMheijheaooeW8j+OAglxuICAgICAqIOiLpee6ueeQhui0tOWbvuWwuuWvuOaYryBOUE9U77yIbm9uIHBvd2VyIG9mIDLvvInvvIzliJnlj6rog73kvb/nlKggVGV4dHVyZTJELldyYXBNb2RlLkNMQU1QX1RPX0VER0XjgIJcbiAgICAgKiBAbWV0aG9kIHNldFRleFBhcmFtZXRlcnNcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRC5XcmFwTW9kZX0gd3JhcFNcbiAgICAgKiBAcGFyYW0ge1RleHR1cmUyRC5XcmFwTW9kZX0gd3JhcFRcbiAgICAgKi9cbiAgICBzZXRXcmFwTW9kZSAod3JhcFMsIHdyYXBUKSB7XG4gICAgICAgIGlmICh0aGlzLl93cmFwUyAhPT0gd3JhcFMgfHwgdGhpcy5fd3JhcFQgIT09IHdyYXBUKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XG4gICAgICAgICAgICBvcHRzLndyYXBTID0gd3JhcFM7XG4gICAgICAgICAgICBvcHRzLndyYXBUID0gd3JhcFQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShvcHRzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIG1pbkZpbHRlciBhbmQgbWFnRmlsdGVyIG9wdGlvbnNcbiAgICAgKiAhI3poIOiuvue9rue6ueeQhui0tOWbvue8qeWwj+WSjOaUvuWkp+i/h+a7pOWZqOeul+azlemAiemhueOAglxuICAgICAqIEBtZXRob2Qgc2V0RmlsdGVyc1xuICAgICAqIEBwYXJhbSB7VGV4dHVyZTJELkZpbHRlcn0gbWluRmlsdGVyXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkQuRmlsdGVyfSBtYWdGaWx0ZXJcbiAgICAgKi9cbiAgICBzZXRGaWx0ZXJzIChtaW5GaWx0ZXIsIG1hZ0ZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5fbWluRmlsdGVyICE9PSBtaW5GaWx0ZXIgfHwgdGhpcy5fbWFnRmlsdGVyICE9PSBtYWdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gX2dldFNoYXJlZE9wdGlvbnMoKTtcbiAgICAgICAgICAgIG9wdHMubWluRmlsdGVyID0gbWluRmlsdGVyO1xuICAgICAgICAgICAgb3B0cy5tYWdGaWx0ZXIgPSBtYWdGaWx0ZXI7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZShvcHRzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgZmxpcFkgb3B0aW9uc1xuICAgICAqICEjemgg6K6+572u6LS05Zu+55qE57q15ZCR57+76L2s6YCJ6aG544CCXG4gICAgICogQG1ldGhvZCBzZXRGbGlwWVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmxpcFlcbiAgICAgKi9cbiAgICBzZXRGbGlwWSAoZmxpcFkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2ZsaXBZICE9PSBmbGlwWSkge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSBfZ2V0U2hhcmVkT3B0aW9ucygpO1xuICAgICAgICAgICAgb3B0cy5mbGlwWSA9IGZsaXBZO1xuICAgICAgICAgICAgb3B0cy5wcmVtdWx0aXBseUFscGhhID0gdGhpcy5fcHJlbXVsdGlwbHlBbHBoYTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKG9wdHMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBwcmVtdWx0aXBseSBhbHBoYSBvcHRpb25zXG4gICAgICogISN6aCDorr7nva7otLTlm77nmoTpooTkuZjpgInpobnjgIJcbiAgICAgKiBAbWV0aG9kIHNldFByZW11bHRpcGx5QWxwaGFcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHByZW11bHRpcGx5XG4gICAgICovXG4gICAgc2V0UHJlbXVsdGlwbHlBbHBoYSAocHJlbXVsdGlwbHkpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ByZW11bHRpcGx5QWxwaGEgIT09IHByZW11bHRpcGx5KSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XG4gICAgICAgICAgICBvcHRzLmZsaXBZID0gdGhpcy5fZmxpcFk7XG4gICAgICAgICAgICBvcHRzLnByZW11bHRpcGx5QWxwaGEgPSBwcmVtdWx0aXBseTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKG9wdHMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVGb3JtYXQgKCkge1xuICAgICAgICB0aGlzLl9pc0FscGhhQXRsYXMgPSB0aGlzLl9mb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQkFfRVRDMSB8fCB0aGlzLl9mb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQl9BX1BWUlRDXzRCUFBWMSB8fCB0aGlzLl9mb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQl9BX1BWUlRDXzJCUFBWMTtcbiAgICAgICAgaWYgKENDX0pTQikge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5zZXRBbHBoYUF0bGFzKHRoaXMuX2lzQWxwaGFBdGxhcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NoZWNrUGFja2FibGUgKCkge1xuICAgICAgICBsZXQgZHluYW1pY0F0bGFzID0gY2MuZHluYW1pY0F0bGFzTWFuYWdlcjtcbiAgICAgICAgaWYgKCFkeW5hbWljQXRsYXMpIHJldHVybjtcblxuICAgICAgICBpZiAodGhpcy5faXNDb21wcmVzc2VkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhY2thYmxlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdyA9IHRoaXMud2lkdGgsIGggPSB0aGlzLmhlaWdodDtcbiAgICAgICAgaWYgKCF0aGlzLl9pbWFnZSB8fFxuICAgICAgICAgICAgdyA+IGR5bmFtaWNBdGxhcy5tYXhGcmFtZVNpemUgfHwgaCA+IGR5bmFtaWNBdGxhcy5tYXhGcmFtZVNpemUgfHwgXG4gICAgICAgICAgICB0aGlzLl9nZXRIYXNoKCkgIT09IGR5bmFtaWNBdGxhcy5BdGxhcy5ERUZBVUxUX0hBU0gpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhY2thYmxlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW1hZ2UgJiYgdGhpcy5faW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFja2FibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRPcHRzKCkge1xuICAgICAgICBsZXQgb3B0cyA9IF9nZXRTaGFyZWRPcHRpb25zKCk7XG4gICAgICAgIG9wdHMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICBvcHRzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICBvcHRzLmdlbk1pcG1hcHMgPSB0aGlzLl9nZW5NaXBtYXBzO1xuICAgICAgICBvcHRzLmZvcm1hdCA9IHRoaXMuX2Zvcm1hdDtcbiAgICAgICAgb3B0cy5wcmVtdWx0aXBseUFscGhhID0gdGhpcy5fcHJlbXVsdGlwbHlBbHBoYTtcbiAgICAgICAgb3B0cy5hbmlzb3Ryb3B5ID0gdGhpcy5fYW5pc290cm9weTtcbiAgICAgICAgb3B0cy5mbGlwWSA9IHRoaXMuX2ZsaXBZO1xuICAgICAgICBvcHRzLm1pbkZpbHRlciA9IEZpbHRlckluZGV4W3RoaXMuX21pbkZpbHRlcl07XG4gICAgICAgIG9wdHMubWFnRmlsdGVyID0gRmlsdGVySW5kZXhbdGhpcy5fbWFnRmlsdGVyXTtcbiAgICAgICAgb3B0cy5taXBGaWx0ZXIgPSBGaWx0ZXJJbmRleFt0aGlzLl9taXBGaWx0ZXJdO1xuICAgICAgICBvcHRzLndyYXBTID0gdGhpcy5fd3JhcFM7XG4gICAgICAgIG9wdHMud3JhcFQgPSB0aGlzLl93cmFwVDtcbiAgICAgICAgcmV0dXJuIG9wdHM7XG4gICAgfSxcblxuICAgIF9nZXRHRlhQaXhlbEZvcm1hdCAoZm9ybWF0KSB7XG4gICAgICAgIGlmIChmb3JtYXQgPT09IFBpeGVsRm9ybWF0LlJHQkFfRVRDMSkge1xuICAgICAgICAgICAgZm9ybWF0ID0gUGl4ZWxGb3JtYXQuUkdCX0VUQzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JfQV9QVlJUQ180QlBQVjEpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IFBpeGVsRm9ybWF0LlJHQl9QVlJUQ180QlBQVjE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZm9ybWF0ID09PSBQaXhlbEZvcm1hdC5SR0JfQV9QVlJUQ18yQlBQVjEpIHtcbiAgICAgICAgICAgIGZvcm1hdCA9IFBpeGVsRm9ybWF0LlJHQl9QVlJUQ18yQlBQVjE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcbiAgICB9LFxuXG4gICAgX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMobWlwbWFwU291cmNlcykge1xuICAgICAgICBjb25zdCBvcHRzID0gdGhpcy5fZ2V0T3B0cygpO1xuICAgICAgICBvcHRzLmltYWdlcyA9IG1pcG1hcFNvdXJjZXMgfHwgW251bGxdO1xuICAgICAgICBpZiAoIXRoaXMuX3RleHR1cmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHR1cmUgPSBuZXcgcmVuZGVyZXIuVGV4dHVyZTJEKHJlbmRlcmVyLmRldmljZSwgb3B0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlLnVwZGF0ZShvcHRzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBTRVJJQUxJWkFUSU9OXG5cbiAgICBfc2VyaWFsaXplOiAoQ0NfRURJVE9SIHx8IENDX1RFU1QpICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGV4dElkID0gXCJcIjtcbiAgICAgICAgbGV0IGV4cG9ydGVkRXh0cyA9IHRoaXMuX2V4cG9ydGVkRXh0cztcbiAgICAgICAgaWYgKCFleHBvcnRlZEV4dHMgJiYgdGhpcy5fbmF0aXZlKSB7XG4gICAgICAgICAgICBleHBvcnRlZEV4dHMgPSBbdGhpcy5fbmF0aXZlXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhwb3J0ZWRFeHRzKSB7XG4gICAgICAgICAgICBsZXQgZXh0cyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleHBvcnRlZEV4dHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZXh0SWQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGxldCBleHQgPSBleHBvcnRlZEV4dHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRAZm9ybWF0XG4gICAgICAgICAgICAgICAgICAgIGxldCBleHRGb3JtYXQgPSBleHQuc3BsaXQoJ0AnKTtcbiAgICAgICAgICAgICAgICAgICAgZXh0SWQgPSBUZXh0dXJlMkQuZXh0bmFtZXMuaW5kZXhPZihleHRGb3JtYXRbMF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0SWQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHRJZCA9IGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0Rm9ybWF0WzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHRJZCArPSAnQCcgKyBleHRGb3JtYXRbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXh0cy5wdXNoKGV4dElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4dElkID0gZXh0cy5qb2luKCdfJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFzc2V0ID0gYCR7ZXh0SWR9LCR7dGhpcy5fbWluRmlsdGVyfSwke3RoaXMuX21hZ0ZpbHRlcn0sJHt0aGlzLl93cmFwU30sJHt0aGlzLl93cmFwVH0sYCArXG4gICAgICAgICAgICAgICAgICAgIGAke3RoaXMuX3ByZW11bHRpcGx5QWxwaGEgPyAxIDogMH0sJHt0aGlzLl9nZW5NaXBtYXBzID8gMSA6IDB9LCR7dGhpcy5fcGFja2FibGUgPyAxIDogMH1gO1xuICAgICAgICByZXR1cm4gYXNzZXQ7XG4gICAgfSxcblxuICAgIF9kZXNlcmlhbGl6ZTogZnVuY3Rpb24gKGRhdGEsIGhhbmRsZSkge1xuICAgICAgICBsZXQgZmllbGRzID0gZGF0YS5zcGxpdCgnLCcpO1xuICAgICAgICAvLyBkZWNvZGUgZXh0bmFtZVxuICAgICAgICBsZXQgZXh0SWRTdHIgPSBmaWVsZHNbMF07XG4gICAgICAgIGlmIChleHRJZFN0cikge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFRleHR1cmUyRC5fcGFyc2VFeHQoZXh0SWRTdHIsIHRoaXMuX2Zvcm1hdCk7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQuYmVzdEV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFJhd0Fzc2V0KHJlc3VsdC5iZXN0RXh0KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtYXQgPSByZXN1bHQuYmVzdEZvcm1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFJhd0Fzc2V0KHJlc3VsdC5kZWZhdWx0RXh0KTtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMzEyMCwgaGFuZGxlLmN1c3RvbUVudi51cmwsIHJlc3VsdC5kZWZhdWx0RXh0LCByZXN1bHQuZGVmYXVsdEV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgICAgIC8vIGRlY29kZSBmaWx0ZXJzXG4gICAgICAgICAgICB0aGlzLl9taW5GaWx0ZXIgPSBwYXJzZUludChmaWVsZHNbMV0pO1xuICAgICAgICAgICAgdGhpcy5fbWFnRmlsdGVyID0gcGFyc2VJbnQoZmllbGRzWzJdKTtcbiAgICAgICAgICAgIC8vIGRlY29kZSB3cmFwc1xuICAgICAgICAgICAgdGhpcy5fd3JhcFMgPSBwYXJzZUludChmaWVsZHNbM10pO1xuICAgICAgICAgICAgdGhpcy5fd3JhcFQgPSBwYXJzZUludChmaWVsZHNbNF0pO1xuICAgICAgICAgICAgLy8gZGVjb2RlIHByZW11bHRpcGx5IGFscGhhXG4gICAgICAgICAgICB0aGlzLl9wcmVtdWx0aXBseUFscGhhID0gZmllbGRzWzVdLmNoYXJDb2RlQXQoMCkgPT09IENIQVJfQ09ERV8xO1xuICAgICAgICAgICAgdGhpcy5fZ2VuTWlwbWFwcyA9IGZpZWxkc1s2XS5jaGFyQ29kZUF0KDApID09PSBDSEFSX0NPREVfMTtcbiAgICAgICAgICAgIHRoaXMuX3BhY2thYmxlID0gZmllbGRzWzddLmNoYXJDb2RlQXQoMCkgPT09IENIQVJfQ09ERV8xO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9nZXRIYXNoICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYXNoRGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNoO1xuICAgICAgICB9XG4gICAgICAgIGxldCBnZW5NaXBtYXBzID0gdGhpcy5fZ2VuTWlwbWFwcyA/IDEgOiAwO1xuICAgICAgICBsZXQgcHJlbXVsdGlwbHlBbHBoYSA9IHRoaXMuX3ByZW11bHRpcGx5QWxwaGEgPyAxIDogMDtcbiAgICAgICAgbGV0IGZsaXBZID0gdGhpcy5fZmxpcFkgPyAxIDogMDtcbiAgICAgICAgbGV0IG1pbkZpbHRlciA9IHRoaXMuX21pbkZpbHRlciA9PT0gRmlsdGVyLkxJTkVBUiA/IDEgOiAyO1xuICAgICAgICBsZXQgbWFnRmlsdGVyID0gdGhpcy5fbWFnRmlsdGVyID09PSBGaWx0ZXIuTElORUFSID8gMSA6IDI7XG4gICAgICAgIGxldCB3cmFwUyA9IHRoaXMuX3dyYXBTID09PSBXcmFwTW9kZS5SRVBFQVQgPyAxIDogKHRoaXMuX3dyYXBTID09PSBXcmFwTW9kZS5DTEFNUF9UT19FREdFID8gMiA6IDMpO1xuICAgICAgICBsZXQgd3JhcFQgPSB0aGlzLl93cmFwVCA9PT0gV3JhcE1vZGUuUkVQRUFUID8gMSA6ICh0aGlzLl93cmFwVCA9PT0gV3JhcE1vZGUuQ0xBTVBfVE9fRURHRSA/IDIgOiAzKTtcbiAgICAgICAgbGV0IHBpeGVsRm9ybWF0ID0gdGhpcy5fZm9ybWF0O1xuICAgICAgICBsZXQgaW1hZ2UgPSB0aGlzLl9pbWFnZTtcbiAgICAgICAgaWYgKENDX0pTQiAmJiBpbWFnZSkge1xuICAgICAgICAgICAgaWYgKGltYWdlLl9nbEZvcm1hdCAmJiBpbWFnZS5fZ2xGb3JtYXQgIT09IEdMX1JHQkEpXG4gICAgICAgICAgICAgICAgcGl4ZWxGb3JtYXQgPSAwO1xuICAgICAgICAgICAgcHJlbXVsdGlwbHlBbHBoYSA9IGltYWdlLl9wcmVtdWx0aXBseUFscGhhID8gMSA6IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9oYXNoID0gTnVtYmVyKGAke21pbkZpbHRlcn0ke21hZ0ZpbHRlcn0ke3BpeGVsRm9ybWF0fSR7d3JhcFN9JHt3cmFwVH0ke2dlbk1pcG1hcHN9JHtwcmVtdWx0aXBseUFscGhhfSR7ZmxpcFl9YCk7XG4gICAgICAgIHRoaXMuX2hhc2hEaXJ0eSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcbiAgICB9LFxuXG4gICAgX2lzQ29tcHJlc3NlZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQgPCBQaXhlbEZvcm1hdC5BOCB8fCB0aGlzLl9mb3JtYXQgPiBQaXhlbEZvcm1hdC5SR0JBMzJGO1xuICAgIH0sXG4gICAgXG4gICAgX2NsZWFySW1hZ2UgKCkge1xuICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSBcIlwiO1xuICAgIH0sXG5cbiAgICBfY2hlY2tJbWFnZUJpdG1hcCAoY2IpIHtcbiAgICAgICAgbGV0IGltYWdlID0gdGhpcy5faW1hZ2U7XG4gICAgICAgIGxldCBmbGlwWSA9IHRoaXMuX2ZsaXBZO1xuICAgICAgICBsZXQgcHJlbXVsdGlwbHlBbHBoYSA9IHRoaXMuX3ByZW11bHRpcGx5QWxwaGE7XG4gICAgICAgIGlmICh0aGlzLl9mbGlwWSAhPT0gaW1hZ2UuZmxpcFkgfHwgdGhpcy5fcHJlbXVsdGlwbHlBbHBoYSAhPT0gaW1hZ2UucHJlbXVsdGlwbHlBbHBoYSkge1xuICAgICAgICAgICAgY3JlYXRlSW1hZ2VCaXRtYXAoaW1hZ2UsIHtcbiAgICAgICAgICAgICAgICBpbWFnZU9yaWVudGF0aW9uOiBmbGlwWSAhPT0gaW1hZ2UuZmxpcFkgPyAnZmxpcFknIDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIHByZW11bHRpcGx5QWxwaGE6IHByZW11bHRpcGx5QWxwaGEgPyAncHJlbXVsdGlwbHknIDogJ25vbmUnfVxuICAgICAgICAgICAgICAgICkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLmNsb3NlICYmIGltYWdlLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5mbGlwWSA9IGZsaXBZO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHJlbXVsdGlwbHlBbHBoYSA9IHByZW11bHRpcGx5QWxwaGE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4vKipcbiAqICEjemhcbiAqIOW9k+ivpei1hOa6kOWKoOi9veaIkOWKn+WQjuinpuWPkeivpeS6i+S7tlxuICogISNlblxuICogVGhpcyBldmVudCBpcyBlbWl0dGVkIHdoZW4gdGhlIGFzc2V0IGlzIGxvYWRlZFxuICpcbiAqIEBldmVudCBsb2FkXG4gKi9cblxuY2MuVGV4dHVyZTJEID0gbW9kdWxlLmV4cG9ydHMgPSBUZXh0dXJlMkQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==