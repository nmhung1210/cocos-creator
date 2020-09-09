
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCRenderTexture.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var renderer = require('../renderer');

var Texture2D = require('./CCTexture2D');

/**
 * !#en The depth buffer and stencil buffer format for RenderTexture.
 * !#zh RenderTexture 的深度缓冲以及模板缓冲格式。
 * @enum RenderTexture.DepthStencilFormat
 */
var DepthStencilFormat = cc.Enum({
  /**
   * !#en 24 bit depth buffer and 8 bit stencil buffer
   * !#zh 24 位深度缓冲和 8 位模板缓冲
   * @property RB_FMT_D24S8
   * @readonly
   * @type {number}
   */
  RB_FMT_D24S8: _gfx["default"].RB_FMT_D24S8,

  /**
   * !#en Only 8 bit stencil buffer
   * !#zh 只申请 8 位模板缓冲
   * @property RB_FMT_S8
   * @readonly
   * @type {number}
   */
  RB_FMT_S8: _gfx["default"].RB_FMT_S8,

  /**
   * !#en Only 16 bit depth buffer
   * !#zh 只申请 16 位深度缓冲
   * @property RB_FMT_D16
   * @readonly
   * @type {number}
   */
  RB_FMT_D16: _gfx["default"].RB_FMT_D16
});
/**
 * Render textures are textures that can be rendered to.
 * @class RenderTexture
 * @extends Texture2D
 */

var RenderTexture = cc.Class({
  name: 'cc.RenderTexture',
  "extends": Texture2D,
  statics: {
    DepthStencilFormat: DepthStencilFormat
  },
  ctor: function ctor() {
    this._framebuffer = null;
  },

  /**
   * !#en
   * Init the render texture with size.
   * !#zh
   * 初始化 render texture 
   * @param {Number} [width] 
   * @param {Number} [height]
   * @param {Number} [depthStencilFormat]
   * @method initWithSize
   */
  initWithSize: function initWithSize(width, height, depthStencilFormat) {
    this.width = Math.floor(width || cc.visibleRect.width);
    this.height = Math.floor(height || cc.visibleRect.height);

    this._resetUnderlyingMipmaps();

    var opts = {
      colors: [this._texture]
    };
    if (this._depthStencilBuffer) this._depthStencilBuffer.destroy();
    var depthStencilBuffer;

    if (depthStencilFormat) {
      depthStencilBuffer = new _gfx["default"].RenderBuffer(renderer.device, depthStencilFormat, width, height);

      if (depthStencilFormat === _gfx["default"].RB_FMT_D24S8) {
        opts.depthStencil = depthStencilBuffer;
      } else if (depthStencilFormat === _gfx["default"].RB_FMT_S8) {
        opts.stencil = depthStencilBuffer;
      } else if (depthStencilFormat === _gfx["default"].RB_FMT_D16) {
        opts.depth = depthStencilBuffer;
      }
    }

    this._depthStencilBuffer = depthStencilBuffer;
    if (this._framebuffer) this._framebuffer.destroy();
    this._framebuffer = new _gfx["default"].FrameBuffer(renderer.device, width, height, opts);
    this._packable = false;
    this.loaded = true;
    this.emit("load");
  },
  updateSize: function updateSize(width, height) {
    this.width = Math.floor(width || cc.visibleRect.width);
    this.height = Math.floor(height || cc.visibleRect.height);

    this._resetUnderlyingMipmaps();

    var rbo = this._depthStencilBuffer;
    if (rbo) rbo.update(this.width, this.height);
    this._framebuffer._width = width;
    this._framebuffer._height = height;
  },

  /**
   * !#en Draw a texture to the specified position
   * !#zh 将指定的图片渲染到指定的位置上
   * @param {Texture2D} texture 
   * @param {Number} x 
   * @param {Number} y 
   */
  drawTextureAt: function drawTextureAt(texture, x, y) {
    if (!texture._image || texture._image.width === 0) return;

    this._texture.updateSubImage({
      x: x,
      y: y,
      image: texture._image,
      width: texture.width,
      height: texture.height,
      level: 0,
      flipY: false,
      premultiplyAlpha: texture._premultiplyAlpha
    });
  },

  /**
   * !#en
   * Get pixels from render texture, the pixels data stores in a RGBA Uint8Array.
   * It will return a new (width * height * 4) length Uint8Array by default。
   * You can specify a data to store the pixels to reuse the data, 
   * you and can specify other params to specify the texture region to read.
   * !#zh
   * 从 render texture 读取像素数据，数据类型为 RGBA 格式的 Uint8Array 数组。
   * 默认每次调用此函数会生成一个大小为 （长 x 高 x 4） 的 Uint8Array。
   * 你可以通过传入 data 来接收像素数据，也可以通过传参来指定需要读取的区域的像素。
   * @method readPixels
   * @param {Uint8Array} [data]
   * @param {Number} [x] 
   * @param {Number} [y] 
   * @param {Number} [w] 
   * @param {Number} [h] 
   * @return {Uint8Array}
   */
  readPixels: function readPixels(data, x, y, w, h) {
    if (!this._framebuffer || !this._texture) return data;
    x = x || 0;
    y = y || 0;
    var width = w || this.width;
    var height = h || this.height;
    data = data || new Uint8Array(width * height * 4);
    var gl = cc.game._renderContext;
    var oldFBO = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._framebuffer.getHandle());
    gl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.bindFramebuffer(gl.FRAMEBUFFER, oldFBO);
    return data;
  },
  destroy: function destroy() {
    this._super();

    if (this._framebuffer) {
      this._framebuffer.destroy();

      this._framebuffer = null;
    }
  }
});
cc.RenderTexture = module.exports = RenderTexture;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1JlbmRlclRleHR1cmUuanMiXSwibmFtZXMiOlsicmVuZGVyZXIiLCJyZXF1aXJlIiwiVGV4dHVyZTJEIiwiRGVwdGhTdGVuY2lsRm9ybWF0IiwiY2MiLCJFbnVtIiwiUkJfRk1UX0QyNFM4IiwiZ2Z4IiwiUkJfRk1UX1M4IiwiUkJfRk1UX0QxNiIsIlJlbmRlclRleHR1cmUiLCJDbGFzcyIsIm5hbWUiLCJzdGF0aWNzIiwiY3RvciIsIl9mcmFtZWJ1ZmZlciIsImluaXRXaXRoU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiZGVwdGhTdGVuY2lsRm9ybWF0IiwiTWF0aCIsImZsb29yIiwidmlzaWJsZVJlY3QiLCJfcmVzZXRVbmRlcmx5aW5nTWlwbWFwcyIsIm9wdHMiLCJjb2xvcnMiLCJfdGV4dHVyZSIsIl9kZXB0aFN0ZW5jaWxCdWZmZXIiLCJkZXN0cm95IiwiZGVwdGhTdGVuY2lsQnVmZmVyIiwiUmVuZGVyQnVmZmVyIiwiZGV2aWNlIiwiZGVwdGhTdGVuY2lsIiwic3RlbmNpbCIsImRlcHRoIiwiRnJhbWVCdWZmZXIiLCJfcGFja2FibGUiLCJsb2FkZWQiLCJlbWl0IiwidXBkYXRlU2l6ZSIsInJibyIsInVwZGF0ZSIsIl93aWR0aCIsIl9oZWlnaHQiLCJkcmF3VGV4dHVyZUF0IiwidGV4dHVyZSIsIngiLCJ5IiwiX2ltYWdlIiwidXBkYXRlU3ViSW1hZ2UiLCJpbWFnZSIsImxldmVsIiwiZmxpcFkiLCJwcmVtdWx0aXBseUFscGhhIiwiX3ByZW11bHRpcGx5QWxwaGEiLCJyZWFkUGl4ZWxzIiwiZGF0YSIsInciLCJoIiwiVWludDhBcnJheSIsImdsIiwiZ2FtZSIsIl9yZW5kZXJDb250ZXh0Iiwib2xkRkJPIiwiZ2V0UGFyYW1ldGVyIiwiRlJBTUVCVUZGRVJfQklORElORyIsImJpbmRGcmFtZWJ1ZmZlciIsIkZSQU1FQlVGRkVSIiwiZ2V0SGFuZGxlIiwiUkdCQSIsIlVOU0lHTkVEX0JZVEUiLCJfc3VwZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFIQSxJQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXhCOztBQUNBLElBQU1DLFNBQVMsR0FBR0QsT0FBTyxDQUFDLGVBQUQsQ0FBekI7O0FBSUE7Ozs7O0FBS0EsSUFBSUUsa0JBQWtCLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzdCOzs7Ozs7O0FBT0FDLEVBQUFBLFlBQVksRUFBRUMsZ0JBQUlELFlBUlc7O0FBUzdCOzs7Ozs7O0FBT0FFLEVBQUFBLFNBQVMsRUFBRUQsZ0JBQUlDLFNBaEJjOztBQWlCN0I7Ozs7Ozs7QUFPQUMsRUFBQUEsVUFBVSxFQUFFRixnQkFBSUU7QUF4QmEsQ0FBUixDQUF6QjtBQTJCQTs7Ozs7O0FBS0EsSUFBSUMsYUFBYSxHQUFHTixFQUFFLENBQUNPLEtBQUgsQ0FBUztBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLGtCQURtQjtBQUV6QixhQUFTVixTQUZnQjtBQUl6QlcsRUFBQUEsT0FBTyxFQUFFO0FBQ0xWLElBQUFBLGtCQUFrQixFQUFsQkE7QUFESyxHQUpnQjtBQVF6QlcsRUFBQUEsSUFSeUIsa0JBUWpCO0FBQ0osU0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNILEdBVndCOztBQVl6Qjs7Ozs7Ozs7OztBQVVBQyxFQUFBQSxZQXRCeUIsd0JBc0JYQyxLQXRCVyxFQXNCSkMsTUF0QkksRUFzQklDLGtCQXRCSixFQXNCd0I7QUFDN0MsU0FBS0YsS0FBTCxHQUFhRyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osS0FBSyxJQUFJYixFQUFFLENBQUNrQixXQUFILENBQWVMLEtBQW5DLENBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNFLElBQUksQ0FBQ0MsS0FBTCxDQUFXSCxNQUFNLElBQUlkLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUosTUFBcEMsQ0FBZDs7QUFDQSxTQUFLSyx1QkFBTDs7QUFFQSxRQUFJQyxJQUFJLEdBQUc7QUFDUEMsTUFBQUEsTUFBTSxFQUFFLENBQUUsS0FBS0MsUUFBUDtBQURELEtBQVg7QUFJQSxRQUFJLEtBQUtDLG1CQUFULEVBQThCLEtBQUtBLG1CQUFMLENBQXlCQyxPQUF6QjtBQUM5QixRQUFJQyxrQkFBSjs7QUFDQSxRQUFJVixrQkFBSixFQUF3QjtBQUNwQlUsTUFBQUEsa0JBQWtCLEdBQUcsSUFBSXRCLGdCQUFJdUIsWUFBUixDQUFxQjlCLFFBQVEsQ0FBQytCLE1BQTlCLEVBQXNDWixrQkFBdEMsRUFBMERGLEtBQTFELEVBQWlFQyxNQUFqRSxDQUFyQjs7QUFDQSxVQUFJQyxrQkFBa0IsS0FBS1osZ0JBQUlELFlBQS9CLEVBQTZDO0FBQ3pDa0IsUUFBQUEsSUFBSSxDQUFDUSxZQUFMLEdBQW9CSCxrQkFBcEI7QUFDSCxPQUZELE1BR0ssSUFBSVYsa0JBQWtCLEtBQUtaLGdCQUFJQyxTQUEvQixFQUEwQztBQUMzQ2dCLFFBQUFBLElBQUksQ0FBQ1MsT0FBTCxHQUFlSixrQkFBZjtBQUNILE9BRkksTUFHQSxJQUFJVixrQkFBa0IsS0FBS1osZ0JBQUlFLFVBQS9CLEVBQTJDO0FBQzVDZSxRQUFBQSxJQUFJLENBQUNVLEtBQUwsR0FBYUwsa0JBQWI7QUFDSDtBQUNKOztBQUNELFNBQUtGLG1CQUFMLEdBQTJCRSxrQkFBM0I7QUFDQSxRQUFJLEtBQUtkLFlBQVQsRUFBdUIsS0FBS0EsWUFBTCxDQUFrQmEsT0FBbEI7QUFDdkIsU0FBS2IsWUFBTCxHQUFvQixJQUFJUixnQkFBSTRCLFdBQVIsQ0FBb0JuQyxRQUFRLENBQUMrQixNQUE3QixFQUFxQ2QsS0FBckMsRUFBNENDLE1BQTVDLEVBQW9ETSxJQUFwRCxDQUFwQjtBQUVBLFNBQUtZLFNBQUwsR0FBaUIsS0FBakI7QUFFQSxTQUFLQyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUtDLElBQUwsQ0FBVSxNQUFWO0FBQ0gsR0FyRHdCO0FBdUR6QkMsRUFBQUEsVUF2RHlCLHNCQXVEZHRCLEtBdkRjLEVBdURQQyxNQXZETyxFQXVEQztBQUN0QixTQUFLRCxLQUFMLEdBQWFHLElBQUksQ0FBQ0MsS0FBTCxDQUFXSixLQUFLLElBQUliLEVBQUUsQ0FBQ2tCLFdBQUgsQ0FBZUwsS0FBbkMsQ0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0UsSUFBSSxDQUFDQyxLQUFMLENBQVdILE1BQU0sSUFBSWQsRUFBRSxDQUFDa0IsV0FBSCxDQUFlSixNQUFwQyxDQUFkOztBQUNBLFNBQUtLLHVCQUFMOztBQUVBLFFBQUlpQixHQUFHLEdBQUcsS0FBS2IsbUJBQWY7QUFDQSxRQUFJYSxHQUFKLEVBQVNBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXLEtBQUt4QixLQUFoQixFQUF1QixLQUFLQyxNQUE1QjtBQUNULFNBQUtILFlBQUwsQ0FBa0IyQixNQUFsQixHQUEyQnpCLEtBQTNCO0FBQ0EsU0FBS0YsWUFBTCxDQUFrQjRCLE9BQWxCLEdBQTRCekIsTUFBNUI7QUFDSCxHQWhFd0I7O0FBa0V6Qjs7Ozs7OztBQU9BMEIsRUFBQUEsYUF6RXlCLHlCQXlFVkMsT0F6RVUsRUF5RURDLENBekVDLEVBeUVFQyxDQXpFRixFQXlFSztBQUMxQixRQUFJLENBQUNGLE9BQU8sQ0FBQ0csTUFBVCxJQUFtQkgsT0FBTyxDQUFDRyxNQUFSLENBQWUvQixLQUFmLEtBQXlCLENBQWhELEVBQW1EOztBQUVuRCxTQUFLUyxRQUFMLENBQWN1QixjQUFkLENBQTZCO0FBQ3pCSCxNQUFBQSxDQUFDLEVBQURBLENBRHlCO0FBQ3RCQyxNQUFBQSxDQUFDLEVBQURBLENBRHNCO0FBRXpCRyxNQUFBQSxLQUFLLEVBQUVMLE9BQU8sQ0FBQ0csTUFGVTtBQUd6Qi9CLE1BQUFBLEtBQUssRUFBRTRCLE9BQU8sQ0FBQzVCLEtBSFU7QUFJekJDLE1BQUFBLE1BQU0sRUFBRTJCLE9BQU8sQ0FBQzNCLE1BSlM7QUFLekJpQyxNQUFBQSxLQUFLLEVBQUUsQ0FMa0I7QUFNekJDLE1BQUFBLEtBQUssRUFBRSxLQU5rQjtBQU96QkMsTUFBQUEsZ0JBQWdCLEVBQUVSLE9BQU8sQ0FBQ1M7QUFQRCxLQUE3QjtBQVNILEdBckZ3Qjs7QUF1RnpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkFDLEVBQUFBLFVBekd5QixzQkF5R2JDLElBekdhLEVBeUdQVixDQXpHTyxFQXlHSkMsQ0F6R0ksRUF5R0RVLENBekdDLEVBeUdFQyxDQXpHRixFQXlHSztBQUMxQixRQUFJLENBQUMsS0FBSzNDLFlBQU4sSUFBc0IsQ0FBQyxLQUFLVyxRQUFoQyxFQUEwQyxPQUFPOEIsSUFBUDtBQUUxQ1YsSUFBQUEsQ0FBQyxHQUFHQSxDQUFDLElBQUksQ0FBVDtBQUNBQyxJQUFBQSxDQUFDLEdBQUdBLENBQUMsSUFBSSxDQUFUO0FBQ0EsUUFBSTlCLEtBQUssR0FBR3dDLENBQUMsSUFBSSxLQUFLeEMsS0FBdEI7QUFDQSxRQUFJQyxNQUFNLEdBQUd3QyxDQUFDLElBQUksS0FBS3hDLE1BQXZCO0FBQ0FzQyxJQUFBQSxJQUFJLEdBQUdBLElBQUksSUFBSyxJQUFJRyxVQUFKLENBQWUxQyxLQUFLLEdBQUdDLE1BQVIsR0FBaUIsQ0FBaEMsQ0FBaEI7QUFFQSxRQUFJMEMsRUFBRSxHQUFHeEQsRUFBRSxDQUFDeUQsSUFBSCxDQUFRQyxjQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxZQUFILENBQWdCSixFQUFFLENBQUNLLG1CQUFuQixDQUFiO0FBQ0FMLElBQUFBLEVBQUUsQ0FBQ00sZUFBSCxDQUFtQk4sRUFBRSxDQUFDTyxXQUF0QixFQUFtQyxLQUFLcEQsWUFBTCxDQUFrQnFELFNBQWxCLEVBQW5DO0FBQ0FSLElBQUFBLEVBQUUsQ0FBQ0wsVUFBSCxDQUFjVCxDQUFkLEVBQWlCQyxDQUFqQixFQUFvQjlCLEtBQXBCLEVBQTJCQyxNQUEzQixFQUFtQzBDLEVBQUUsQ0FBQ1MsSUFBdEMsRUFBNENULEVBQUUsQ0FBQ1UsYUFBL0MsRUFBOERkLElBQTlEO0FBQ0FJLElBQUFBLEVBQUUsQ0FBQ00sZUFBSCxDQUFtQk4sRUFBRSxDQUFDTyxXQUF0QixFQUFtQ0osTUFBbkM7QUFFQSxXQUFPUCxJQUFQO0FBQ0gsR0F6SHdCO0FBMkh6QjVCLEVBQUFBLE9BM0h5QixxQkEySGQ7QUFDUCxTQUFLMkMsTUFBTDs7QUFDQSxRQUFJLEtBQUt4RCxZQUFULEVBQXVCO0FBQ25CLFdBQUtBLFlBQUwsQ0FBa0JhLE9BQWxCOztBQUNBLFdBQUtiLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDtBQUNKO0FBakl3QixDQUFULENBQXBCO0FBb0lBWCxFQUFFLENBQUNNLGFBQUgsR0FBbUI4RCxNQUFNLENBQUNDLE9BQVAsR0FBaUIvRCxhQUFwQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi4vcmVuZGVyZXInKTtcbmNvbnN0IFRleHR1cmUyRCA9IHJlcXVpcmUoJy4vQ0NUZXh0dXJlMkQnKTtcblxuaW1wb3J0IGdmeCBmcm9tICcuLi8uLi9yZW5kZXJlci9nZngnO1xuXG4vKipcbiAqICEjZW4gVGhlIGRlcHRoIGJ1ZmZlciBhbmQgc3RlbmNpbCBidWZmZXIgZm9ybWF0IGZvciBSZW5kZXJUZXh0dXJlLlxuICogISN6aCBSZW5kZXJUZXh0dXJlIOeahOa3seW6pue8k+WGsuS7peWPiuaooeadv+e8k+WGsuagvOW8j+OAglxuICogQGVudW0gUmVuZGVyVGV4dHVyZS5EZXB0aFN0ZW5jaWxGb3JtYXRcbiAqL1xubGV0IERlcHRoU3RlbmNpbEZvcm1hdCA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gMjQgYml0IGRlcHRoIGJ1ZmZlciBhbmQgOCBiaXQgc3RlbmNpbCBidWZmZXJcbiAgICAgKiAhI3poIDI0IOS9jea3seW6pue8k+WGsuWSjCA4IOS9jeaooeadv+e8k+WGslxuICAgICAqIEBwcm9wZXJ0eSBSQl9GTVRfRDI0UzhcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIFJCX0ZNVF9EMjRTODogZ2Z4LlJCX0ZNVF9EMjRTOCxcbiAgICAvKipcbiAgICAgKiAhI2VuIE9ubHkgOCBiaXQgc3RlbmNpbCBidWZmZXJcbiAgICAgKiAhI3poIOWPqueUs+ivtyA4IOS9jeaooeadv+e8k+WGslxuICAgICAqIEBwcm9wZXJ0eSBSQl9GTVRfUzhcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIFJCX0ZNVF9TODogZ2Z4LlJCX0ZNVF9TOCxcbiAgICAvKipcbiAgICAgKiAhI2VuIE9ubHkgMTYgYml0IGRlcHRoIGJ1ZmZlclxuICAgICAqICEjemgg5Y+q55Sz6K+3IDE2IOS9jea3seW6pue8k+WGslxuICAgICAqIEBwcm9wZXJ0eSBSQl9GTVRfRDE2XG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBSQl9GTVRfRDE2OiBnZnguUkJfRk1UX0QxNlxufSlcblxuLyoqXG4gKiBSZW5kZXIgdGV4dHVyZXMgYXJlIHRleHR1cmVzIHRoYXQgY2FuIGJlIHJlbmRlcmVkIHRvLlxuICogQGNsYXNzIFJlbmRlclRleHR1cmVcbiAqIEBleHRlbmRzIFRleHR1cmUyRFxuICovXG5sZXQgUmVuZGVyVGV4dHVyZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUmVuZGVyVGV4dHVyZScsXG4gICAgZXh0ZW5kczogVGV4dHVyZTJELFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBEZXB0aFN0ZW5jaWxGb3JtYXRcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluaXQgdGhlIHJlbmRlciB0ZXh0dXJlIHdpdGggc2l6ZS5cbiAgICAgKiAhI3poXG4gICAgICog5Yid5aeL5YyWIHJlbmRlciB0ZXh0dXJlIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbd2lkdGhdIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZGVwdGhTdGVuY2lsRm9ybWF0XVxuICAgICAqIEBtZXRob2QgaW5pdFdpdGhTaXplXG4gICAgICovXG4gICAgaW5pdFdpdGhTaXplICh3aWR0aCwgaGVpZ2h0LCBkZXB0aFN0ZW5jaWxGb3JtYXQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IE1hdGguZmxvb3Iod2lkdGggfHwgY2MudmlzaWJsZVJlY3Qud2lkdGgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IHx8IGNjLnZpc2libGVSZWN0LmhlaWdodCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBvcHRzID0ge1xuICAgICAgICAgICAgY29sb3JzOiBbIHRoaXMuX3RleHR1cmUgXSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5fZGVwdGhTdGVuY2lsQnVmZmVyKSB0aGlzLl9kZXB0aFN0ZW5jaWxCdWZmZXIuZGVzdHJveSgpO1xuICAgICAgICBsZXQgZGVwdGhTdGVuY2lsQnVmZmVyO1xuICAgICAgICBpZiAoZGVwdGhTdGVuY2lsRm9ybWF0KSB7XG4gICAgICAgICAgICBkZXB0aFN0ZW5jaWxCdWZmZXIgPSBuZXcgZ2Z4LlJlbmRlckJ1ZmZlcihyZW5kZXJlci5kZXZpY2UsIGRlcHRoU3RlbmNpbEZvcm1hdCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBpZiAoZGVwdGhTdGVuY2lsRm9ybWF0ID09PSBnZnguUkJfRk1UX0QyNFM4KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5kZXB0aFN0ZW5jaWwgPSBkZXB0aFN0ZW5jaWxCdWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkZXB0aFN0ZW5jaWxGb3JtYXQgPT09IGdmeC5SQl9GTVRfUzgpIHtcbiAgICAgICAgICAgICAgICBvcHRzLnN0ZW5jaWwgPSBkZXB0aFN0ZW5jaWxCdWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkZXB0aFN0ZW5jaWxGb3JtYXQgPT09IGdmeC5SQl9GTVRfRDE2KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5kZXB0aCA9IGRlcHRoU3RlbmNpbEJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kZXB0aFN0ZW5jaWxCdWZmZXIgPSBkZXB0aFN0ZW5jaWxCdWZmZXI7XG4gICAgICAgIGlmICh0aGlzLl9mcmFtZWJ1ZmZlcikgdGhpcy5fZnJhbWVidWZmZXIuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLl9mcmFtZWJ1ZmZlciA9IG5ldyBnZnguRnJhbWVCdWZmZXIocmVuZGVyZXIuZGV2aWNlLCB3aWR0aCwgaGVpZ2h0LCBvcHRzKTtcblxuICAgICAgICB0aGlzLl9wYWNrYWJsZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoXCJsb2FkXCIpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IE1hdGguZmxvb3Iod2lkdGggfHwgY2MudmlzaWJsZVJlY3Qud2lkdGgpO1xuICAgICAgICB0aGlzLmhlaWdodCA9IE1hdGguZmxvb3IoaGVpZ2h0IHx8IGNjLnZpc2libGVSZWN0LmhlaWdodCk7XG4gICAgICAgIHRoaXMuX3Jlc2V0VW5kZXJseWluZ01pcG1hcHMoKTtcblxuICAgICAgICBsZXQgcmJvID0gdGhpcy5fZGVwdGhTdGVuY2lsQnVmZmVyO1xuICAgICAgICBpZiAocmJvKSByYm8udXBkYXRlKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fZnJhbWVidWZmZXIuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRHJhdyBhIHRleHR1cmUgdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvblxuICAgICAqICEjemgg5bCG5oyH5a6a55qE5Zu+54mH5riy5p+T5Yiw5oyH5a6a55qE5L2N572u5LiKXG4gICAgICogQHBhcmFtIHtUZXh0dXJlMkR9IHRleHR1cmUgXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHggXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHkgXG4gICAgICovXG4gICAgZHJhd1RleHR1cmVBdCAodGV4dHVyZSwgeCwgeSkge1xuICAgICAgICBpZiAoIXRleHR1cmUuX2ltYWdlIHx8IHRleHR1cmUuX2ltYWdlLndpZHRoID09PSAwKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fdGV4dHVyZS51cGRhdGVTdWJJbWFnZSh7XG4gICAgICAgICAgICB4LCB5LFxuICAgICAgICAgICAgaW1hZ2U6IHRleHR1cmUuX2ltYWdlLFxuICAgICAgICAgICAgd2lkdGg6IHRleHR1cmUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRleHR1cmUuaGVpZ2h0LFxuICAgICAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgICAgICBmbGlwWTogZmFsc2UsXG4gICAgICAgICAgICBwcmVtdWx0aXBseUFscGhhOiB0ZXh0dXJlLl9wcmVtdWx0aXBseUFscGhhXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgcGl4ZWxzIGZyb20gcmVuZGVyIHRleHR1cmUsIHRoZSBwaXhlbHMgZGF0YSBzdG9yZXMgaW4gYSBSR0JBIFVpbnQ4QXJyYXkuXG4gICAgICogSXQgd2lsbCByZXR1cm4gYSBuZXcgKHdpZHRoICogaGVpZ2h0ICogNCkgbGVuZ3RoIFVpbnQ4QXJyYXkgYnkgZGVmYXVsdOOAglxuICAgICAqIFlvdSBjYW4gc3BlY2lmeSBhIGRhdGEgdG8gc3RvcmUgdGhlIHBpeGVscyB0byByZXVzZSB0aGUgZGF0YSwgXG4gICAgICogeW91IGFuZCBjYW4gc3BlY2lmeSBvdGhlciBwYXJhbXMgdG8gc3BlY2lmeSB0aGUgdGV4dHVyZSByZWdpb24gdG8gcmVhZC5cbiAgICAgKiAhI3poXG4gICAgICog5LuOIHJlbmRlciB0ZXh0dXJlIOivu+WPluWDj+e0oOaVsOaNru+8jOaVsOaNruexu+Wei+S4uiBSR0JBIOagvOW8j+eahCBVaW50OEFycmF5IOaVsOe7hOOAglxuICAgICAqIOm7mOiupOavj+asoeiwg+eUqOatpOWHveaVsOS8mueUn+aIkOS4gOS4quWkp+Wwj+S4uiDvvIjplb8geCDpq5ggeCA077yJIOeahCBVaW50OEFycmF544CCXG4gICAgICog5L2g5Y+v5Lul6YCa6L+H5Lyg5YWlIGRhdGEg5p2l5o6l5pS25YOP57Sg5pWw5o2u77yM5Lmf5Y+v5Lul6YCa6L+H5Lyg5Y+C5p2l5oyH5a6a6ZyA6KaB6K+75Y+W55qE5Yy65Z+f55qE5YOP57Sg44CCXG4gICAgICogQG1ldGhvZCByZWFkUGl4ZWxzXG4gICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBbZGF0YV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3hdIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt3XSBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2hdIFxuICAgICAqIEByZXR1cm4ge1VpbnQ4QXJyYXl9XG4gICAgICovXG4gICAgcmVhZFBpeGVscyAoZGF0YSwgeCwgeSwgdywgaCkge1xuICAgICAgICBpZiAoIXRoaXMuX2ZyYW1lYnVmZmVyIHx8ICF0aGlzLl90ZXh0dXJlKSByZXR1cm4gZGF0YTtcblxuICAgICAgICB4ID0geCB8fCAwO1xuICAgICAgICB5ID0geSB8fCAwO1xuICAgICAgICBsZXQgd2lkdGggPSB3IHx8IHRoaXMud2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSBoIHx8IHRoaXMuaGVpZ2h0XG4gICAgICAgIGRhdGEgPSBkYXRhICB8fCBuZXcgVWludDhBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpO1xuXG4gICAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICAgIGxldCBvbGRGQk8gPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuRlJBTUVCVUZGRVJfQklORElORyk7XG4gICAgICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgdGhpcy5fZnJhbWVidWZmZXIuZ2V0SGFuZGxlKCkpO1xuICAgICAgICBnbC5yZWFkUGl4ZWxzKHgsIHksIHdpZHRoLCBoZWlnaHQsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX0JZVEUsIGRhdGEpO1xuICAgICAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG9sZEZCTyk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSxcblxuICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZiAodGhpcy5fZnJhbWVidWZmZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lYnVmZmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5SZW5kZXJUZXh0dXJlID0gbW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJUZXh0dXJlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=