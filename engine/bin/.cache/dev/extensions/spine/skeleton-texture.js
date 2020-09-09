
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/spine/skeleton-texture.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
sp.SkeletonTexture = cc.Class({
  name: 'sp.SkeletonTexture',
  "extends": sp.spine.Texture,
  _texture: null,
  _material: null,
  setRealTexture: function setRealTexture(tex) {
    this._texture = tex;
  },
  getRealTexture: function getRealTexture() {
    return this._texture;
  },
  setFilters: function setFilters(minFilter, magFilter) {
    if (this._texture) {
      this._texture.setFilters(minFilter, magFilter);
    }
  },
  setWraps: function setWraps(uWrap, vWrap) {
    if (this._texture) {
      this._texture.setWrapMode(uWrap, vWrap);
    }
  },
  dispose: function dispose() {}
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9zcGluZS9za2VsZXRvbi10ZXh0dXJlLmpzIl0sIm5hbWVzIjpbInNwIiwiU2tlbGV0b25UZXh0dXJlIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJzcGluZSIsIlRleHR1cmUiLCJfdGV4dHVyZSIsIl9tYXRlcmlhbCIsInNldFJlYWxUZXh0dXJlIiwidGV4IiwiZ2V0UmVhbFRleHR1cmUiLCJzZXRGaWx0ZXJzIiwibWluRmlsdGVyIiwibWFnRmlsdGVyIiwic2V0V3JhcHMiLCJ1V3JhcCIsInZXcmFwIiwic2V0V3JhcE1vZGUiLCJkaXNwb3NlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQUEsRUFBRSxDQUFDQyxlQUFILEdBQXFCQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMxQkMsRUFBQUEsSUFBSSxFQUFFLG9CQURvQjtBQUUxQixhQUFTSixFQUFFLENBQUNLLEtBQUgsQ0FBU0MsT0FGUTtBQUcxQkMsRUFBQUEsUUFBUSxFQUFFLElBSGdCO0FBSTFCQyxFQUFBQSxTQUFTLEVBQUUsSUFKZTtBQU0xQkMsRUFBQUEsY0FBYyxFQUFFLHdCQUFTQyxHQUFULEVBQWM7QUFDMUIsU0FBS0gsUUFBTCxHQUFnQkcsR0FBaEI7QUFDSCxHQVJ5QjtBQVUxQkMsRUFBQUEsY0FBYyxFQUFFLDBCQUFXO0FBQ3ZCLFdBQU8sS0FBS0osUUFBWjtBQUNILEdBWnlCO0FBYzFCSyxFQUFBQSxVQUFVLEVBQUUsb0JBQVNDLFNBQVQsRUFBb0JDLFNBQXBCLEVBQStCO0FBQ3ZDLFFBQUksS0FBS1AsUUFBVCxFQUFtQjtBQUNmLFdBQUtBLFFBQUwsQ0FBY0ssVUFBZCxDQUF5QkMsU0FBekIsRUFBb0NDLFNBQXBDO0FBQ0g7QUFDSixHQWxCeUI7QUFvQjFCQyxFQUFBQSxRQUFRLEVBQUUsa0JBQVNDLEtBQVQsRUFBZ0JDLEtBQWhCLEVBQXVCO0FBQzdCLFFBQUksS0FBS1YsUUFBVCxFQUFtQjtBQUNmLFdBQUtBLFFBQUwsQ0FBY1csV0FBZCxDQUEwQkYsS0FBMUIsRUFBaUNDLEtBQWpDO0FBQ0g7QUFDSixHQXhCeUI7QUEwQjFCRSxFQUFBQSxPQUFPLEVBQUUsbUJBQVcsQ0FBRTtBQTFCSSxDQUFULENBQXJCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuc3AuU2tlbGV0b25UZXh0dXJlID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdzcC5Ta2VsZXRvblRleHR1cmUnLFxuICAgIGV4dGVuZHM6IHNwLnNwaW5lLlRleHR1cmUsXG4gICAgX3RleHR1cmU6IG51bGwsXG4gICAgX21hdGVyaWFsOiBudWxsLFxuXG4gICAgc2V0UmVhbFRleHR1cmU6IGZ1bmN0aW9uKHRleCkge1xuICAgICAgICB0aGlzLl90ZXh0dXJlID0gdGV4O1xuICAgIH0sXG5cbiAgICBnZXRSZWFsVGV4dHVyZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0dXJlO1xuICAgIH0sXG5cbiAgICBzZXRGaWx0ZXJzOiBmdW5jdGlvbihtaW5GaWx0ZXIsIG1hZ0ZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy5fdGV4dHVyZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dHVyZS5zZXRGaWx0ZXJzKG1pbkZpbHRlciwgbWFnRmlsdGVyKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRXcmFwczogZnVuY3Rpb24odVdyYXAsIHZXcmFwKSB7XG4gICAgICAgIGlmICh0aGlzLl90ZXh0dXJlKSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0dXJlLnNldFdyYXBNb2RlKHVXcmFwLCB2V3JhcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGlzcG9zZTogZnVuY3Rpb24oKSB7fVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==