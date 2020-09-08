
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/utils/label/label-frame.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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

/**
 * !#en Class for Label Frame.
 * !#zh LabelFrame
 */
function LabelFrame() {
  // the location of the label on rendering texture
  this._rect = null; // uv data of frame

  this.uv = []; // texture of frame

  this._texture = null; // store original info before packed to dynamic atlas

  this._original = null;
}

LabelFrame.prototype = {
  constructor: LabelFrame,

  /**
  * !#en Returns the rect of the label frame in the texture.
  * !#zh 获取 LabelFrame 的纹理矩形区域
  * @method getRect
  * @return {Rect}
  */
  getRect: function getRect() {
    return cc.rect(this._rect);
  },

  /**
   * !#en Sets the rect of the label frame in the texture.
   * !#zh 设置 LabelFrame 的纹理矩形区域
   * @method setRect
   * @param {Rect} rect
   */
  setRect: function setRect(rect) {
    this._rect = rect;
    if (this._texture) this._calculateUV();
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
  _refreshTexture: function _refreshTexture(texture) {
    this._texture = texture;
    this._rect = cc.rect(0, 0, texture.width, texture.height);

    this._calculateUV();
  },
  _calculateUV: function _calculateUV() {
    var rect = this._rect,
        texture = this._texture,
        uv = this.uv,
        texw = texture.width,
        texh = texture.height;
    var l = texw === 0 ? 0 : rect.x / texw;
    var r = texw === 0 ? 0 : (rect.x + rect.width) / texw;
    var b = texh === 0 ? 0 : (rect.y + rect.height) / texh;
    var t = texh === 0 ? 0 : rect.y / texh;
    uv[0] = l;
    uv[1] = b;
    uv[2] = r;
    uv[3] = b;
    uv[4] = l;
    uv[5] = t;
    uv[6] = r;
    uv[7] = t;
  }
};
module.exports = LabelFrame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3V0aWxzL2xhYmVsL2xhYmVsLWZyYW1lLmpzIl0sIm5hbWVzIjpbIkxhYmVsRnJhbWUiLCJfcmVjdCIsInV2IiwiX3RleHR1cmUiLCJfb3JpZ2luYWwiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsImdldFJlY3QiLCJjYyIsInJlY3QiLCJzZXRSZWN0IiwiX2NhbGN1bGF0ZVVWIiwiX3NldER5bmFtaWNBdGxhc0ZyYW1lIiwiZnJhbWUiLCJfeCIsIngiLCJfeSIsInkiLCJ0ZXh0dXJlIiwiX3Jlc2V0RHluYW1pY0F0bGFzRnJhbWUiLCJfcmVmcmVzaFRleHR1cmUiLCJ3aWR0aCIsImhlaWdodCIsInRleHciLCJ0ZXhoIiwibCIsInIiLCJiIiwidCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztBQUlBLFNBQVNBLFVBQVQsR0FBdUI7QUFDbkI7QUFDQSxPQUFLQyxLQUFMLEdBQWEsSUFBYixDQUZtQixDQUduQjs7QUFDQSxPQUFLQyxFQUFMLEdBQVUsRUFBVixDQUptQixDQUtuQjs7QUFDQSxPQUFLQyxRQUFMLEdBQWdCLElBQWhCLENBTm1CLENBT25COztBQUNBLE9BQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDSDs7QUFFREosVUFBVSxDQUFDSyxTQUFYLEdBQXVCO0FBQ25CQyxFQUFBQSxXQUFXLEVBQUVOLFVBRE07O0FBR2xCOzs7Ozs7QUFNRE8sRUFBQUEsT0FBTyxFQUFFLG1CQUFZO0FBQ2pCLFdBQU9DLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRLEtBQUtSLEtBQWIsQ0FBUDtBQUNILEdBWGtCOztBQWFuQjs7Ozs7O0FBTUFTLEVBQUFBLE9BQU8sRUFBRSxpQkFBVUQsSUFBVixFQUFnQjtBQUNyQixTQUFLUixLQUFMLEdBQWFRLElBQWI7QUFDQSxRQUFJLEtBQUtOLFFBQVQsRUFDSSxLQUFL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UjtBQUNBeEIsSUFBQUEsRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEIsQ0FBUjtBQUNIO0FBMUVrQixDQUF2QjtBQTZFQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUIsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlbiBDbGFzcyBmb3IgTGFiZWwgRnJhbWUuXG4gKiAhI3poIExhYmVsRnJhbWVcbiAqL1xuZnVuY3Rpb24gTGFiZWxGcmFtZSAoKSB7XG4gICAgLy8gdGhlIGxvY2F0aW9uIG9mIHRoZSBsYWJlbCBvbiByZW5kZXJpbmcgdGV4dHVyZVxuICAgIHRoaXMuX3JlY3QgPSBudWxsO1xuICAgIC8vIHV2IGRhdGEgb2YgZnJhbWVcbiAgICB0aGlzLnV2ID0gW107XG4gICAgLy8gdGV4dHVyZSBvZiBmcmFtZVxuICAgIHRoaXMuX3RleHR1cmUgPSBudWxsO1xuICAgIC8vIHN0b3JlIG9yaWdpbmFsIGluZm8gYmVmb3JlIHBhY2tlZCB0byBkeW5hbWljIGF0bGFzXG4gICAgdGhpcy5fb3JpZ2luYWwgPSBudWxsO1xufVxuXG5MYWJlbEZyYW1lLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogTGFiZWxGcmFtZSxcblxuICAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHJlY3Qgb2YgdGhlIGxhYmVsIGZyYW1lIGluIHRoZSB0ZXh0dXJlLlxuICAgICAqICEjemgg6I635Y+WIExhYmVsRnJhbWUg55qE57q555CG55+p5b2i5Yy65Z+fXG4gICAgICogQG1ldGhvZCBnZXRSZWN0XG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKi9cbiAgICBnZXRSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5yZWN0KHRoaXMuX3JlY3QpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHRoZSByZWN0IG9mIHRoZSBsYWJlbCBmcmFtZSBpbiB0aGUgdGV4dHVyZS5cbiAgICAgKiAhI3poIOiuvue9riBMYWJlbEZyYW1lIOeahOe6ueeQhuefqeW9ouWMuuWfn1xuICAgICAqIEBtZXRob2Qgc2V0UmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICAgICAqL1xuICAgIHNldFJlY3Q6IGZ1bmN0aW9uIChyZWN0KSB7XG4gICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSlcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcblxuICAgIF9zZXREeW5hbWljQXRsYXNGcmFtZSAoZnJhbWUpIHtcbiAgICAgICAgaWYgKCFmcmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX29yaWdpbmFsID0ge1xuICAgICAgICAgICAgX3RleHR1cmUgOiB0aGlzLl90ZXh0dXJlLFxuICAgICAgICAgICAgX3ggOiB0aGlzLl9yZWN0LngsXG4gICAgICAgICAgICBfeSA6IHRoaXMuX3JlY3QueVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLl90ZXh0dXJlID0gZnJhbWUudGV4dHVyZTtcbiAgICAgICAgdGhpcy5fcmVjdC54ID0gZnJhbWUueDtcbiAgICAgICAgdGhpcy5fcmVjdC55ID0gZnJhbWUueTtcbiAgICAgICAgdGhpcy5fY2FsY3VsYXRlVVYoKTtcbiAgICB9LFxuICAgIF9yZXNldER5bmFtaWNBdGxhc0ZyYW1lICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW5hbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLl9yZWN0LnggPSB0aGlzLl9vcmlnaW5hbC5feDtcbiAgICAgICAgdGhpcy5fcmVjdC55ID0gdGhpcy5fb3JpZ2luYWwuX3k7XG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0aGlzLl9vcmlnaW5hbC5fdGV4dHVyZTtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVVVigpO1xuICAgIH0sXG5cbiAgICBfcmVmcmVzaFRleHR1cmU6IGZ1bmN0aW9uICh0ZXh0dXJlKSB7XG4gICAgICAgIHRoaXMuX3RleHR1cmUgPSB0ZXh0dXJlO1xuICAgICAgICB0aGlzLl9yZWN0ID0gY2MucmVjdCgwLCAwLCB0ZXh0dXJlLndpZHRoLCB0ZXh0dXJlLmhlaWdodCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZVVWKCk7XG4gICAgfSxcblxuICAgIF9jYWxjdWxhdGVVVigpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLl9yZWN0LFxuICAgICAgICAgICAgdGV4dHVyZSA9IHRoaXMuX3RleHR1cmUsXG4gICAgICAgICAgICB1diA9IHRoaXMudXYsXG4gICAgICAgICAgICB0ZXh3ID0gdGV4dHVyZS53aWR0aCxcbiAgICAgICAgICAgIHRleGggPSB0ZXh0dXJlLmhlaWdodDtcblxuICAgICAgICBsZXQgbCA9IHRleHcgPT09IDAgPyAwIDogcmVjdC54IC8gdGV4dztcbiAgICAgICAgbGV0IHIgPSB0ZXh3ID09PSAwID8gMCA6IChyZWN0LnggKyByZWN0LndpZHRoKSAvIHRleHc7XG4gICAgICAgIGxldCBiID0gdGV4aCA9PT0gMCA/IDAgOiAocmVjdC55ICsgcmVjdC5oZWlnaHQpIC8gdGV4aDtcbiAgICAgICAgbGV0IHQgPSB0ZXhoID09PSAwID8gMCA6IHJlY3QueSAvIHRleGg7XG5cbiAgICAgICAgdXZbMF0gPSBsO1xuICAgICAgICB1dlsxXSA9IGI7XG4gICAgICAgIHV2WzJdID0gcjtcbiAgICAgICAgdXZbM10gPSBiO1xuICAgICAgICB1dls0XSA9IGw7XG4gICAgICAgIHV2WzVdID0gdDtcbiAgICAgICAgdXZbNl0gPSByO1xuICAgICAgICB1dls3XSA9IHQ7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsRnJhbWU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==