
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/texture-util.js';
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
var Texture2D = require('../assets/CCTexture2D');

var textureUtil = {
  loadImage: function loadImage(url, cb, target) {
    cc.assertID(url, 3103);
    var tex = cc.assetManager.assets.get(url);

    if (tex) {
      if (tex.loaded) {
        cb && cb.call(target, null, tex);
        return tex;
      } else {
        tex.once("load", function () {
          cb && cb.call(target, null, tex);
        }, target);
        return tex;
      }
    } else {
      cc.assetManager.loadRemote(url, function (err, texture) {
        cb && cb.call(target, err, texture);
      });
    }
  },
  cacheImage: function cacheImage(url, image) {
    if (url && image) {
      var tex = new Texture2D();
      tex.initWithElement(image);
      cc.assetManager.assets.add(url, tex);
      return tex;
    }
  },
  postLoadTexture: function postLoadTexture(texture, callback) {
    if (texture.loaded) {
      callback && callback();
      return;
    }

    if (!texture.nativeUrl) {
      callback && callback();
      return;
    } // load image


    cc.assetManager.loadNativeFile(texture, function (err, image) {
      if (!err) texture._nativeAsset = image;
      callback && callback(err);
    });
  }
};
module.exports = textureUtil;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3RleHR1cmUtdXRpbC5qcyJdLCJuYW1lcyI6WyJUZXh0dXJlMkQiLCJyZXF1aXJlIiwidGV4dHVyZVV0aWwiLCJsb2FkSW1hZ2UiLCJ1cmwiLCJjYiIsInRhcmdldCIsImNjIiwiYXNzZXJ0SUQiLCJ0ZXgiLCJhc3NldE1hbmFnZXIiLCJhc3NldHMiLCJnZXQiLCJsb2FkZWQiLCJjYWxsIiwib25jZSIsImxvYWRSZW1vdGUiLCJlcnIiLCJ0ZXh0dXJlIiwiY2FjaGVJbWFnZSIsImltYWdlIiwiaW5pdFdpdGhFbGVtZW50IiwiYWRkIiwicG9zdExvYWRUZXh0dXJlIiwiY2FsbGJhY2siLCJuYXRpdmVVcmwiLCJsb2FkTmF0aXZlRmlsZSIsIl9uYXRpdmVBc3NldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxTQUFTLEdBQUdDLE9BQU8sQ0FBQyx1QkFBRCxDQUF6Qjs7QUFFQSxJQUFJQyxXQUFXLEdBQUc7QUFDZEMsRUFBQUEsU0FEYyxxQkFDSEMsR0FERyxFQUNFQyxFQURGLEVBQ01DLE1BRE4sRUFDYztBQUN4QkMsSUFBQUEsRUFBRSxDQUFDQyxRQUFILENBQVlKLEdBQVosRUFBaUIsSUFBakI7QUFFQSxRQUFJSyxHQUFHLEdBQUdGLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQkMsTUFBaEIsQ0FBdUJDLEdBQXZCLENBQTJCUixHQUEzQixDQUFWOztBQUNBLFFBQUlLLEdBQUosRUFBUztBQUNMLFVBQUlBLEdBQUcsQ0FBQ0ksTUFBUixFQUFnQjtBQUNaUixRQUFBQSxFQUFFLElBQUlBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRUixNQUFSLEVBQWdCLElBQWhCLEVBQXNCRyxHQUF0QixDQUFOO0FBQ0EsZUFBT0EsR0FBUDtBQUNILE9BSEQsTUFLQTtBQUNJQSxRQUFBQSxHQUFHLENBQUNNLElBQUosQ0FBUyxNQUFULEVBQWlCLFlBQVU7QUFDeEJWLFVBQUFBLEVBQUUsSUFBSUEsRUFBRSxDQUFDUyxJQUFILENBQVFSLE1BQVIsRUFBZ0IsSUFBaEIsRUFBc0JHLEdBQXRCLENBQU47QUFDRixTQUZELEVBRUdILE1BRkg7QUFHQSxlQUFPRyxHQUFQO0FBQ0g7QUFDSixLQVpELE1BYUs7QUFDREYsTUFBQUEsRUFBRSxDQUFDRyxZQUFILENBQWdCTSxVQUFoQixDQUEyQlosR0FBM0IsRUFBZ0MsVUFBVWEsR0FBVixFQUFlQyxPQUFmLEVBQXdCO0FBQ3BEYixRQUFBQSxFQUFFLElBQUlBLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRUixNQUFSLEVBQWdCVyxHQUFoQixFQUFxQkMsT0FBckIsQ0FBTjtBQUNILE9BRkQ7QUFHSDtBQUNKLEdBdkJhO0FBeUJkQyxFQUFBQSxVQXpCYyxzQkF5QkZmLEdBekJFLEVBeUJHZ0IsS0F6QkgsRUF5QlU7QUFDcEIsUUFBSWhCLEdBQUcsSUFBSWdCLEtBQVgsRUFBa0I7QUFDZCxVQUFJWCxHQUFHLEdBQUcsSUFBSVQsU0FBSixFQUFWO0FBQ0FTLE1BQUFBLEdBQUcsQ0FBQ1ksZUFBSixDQUFvQkQsS0FBcEI7QUFDQWIsTUFBQUEsRUFBRSxDQUFDRyxZQUFILENBQWdCQyxNQUFoQixDQUF1QlcsR0FBdkIsQ0FBMkJsQixHQUEzQixFQUFnQ0ssR0FBaEM7QUFDQSxhQUFPQSxHQUFQO0FBQ0g7QUFDSixHQWhDYTtBQWtDZGMsRUFBQUEsZUFsQ2MsMkJBa0NHTCxPQWxDSCxFQWtDWU0sUUFsQ1osRUFrQ3NCO0FBQ2hDLFFBQUlOLE9BQU8sQ0FBQ0wsTUFBWixFQUFvQjtBQUNoQlcsTUFBQUEsUUFBUSxJQUFJQSxRQUFRLEVBQXBCO0FBQ0E7QUFDSDs7QUFDRCxRQUFJLENBQUNOLE9BQU8sQ0FBQ08sU0FBYixFQUF3QjtBQUNwQkQsTUFBQUEsUUFBUSxJQUFJQSxRQUFRLEVBQXBCO0FBQ0E7QUFDSCxLQVIrQixDQVNoQzs7O0FBQ0FqQixJQUFBQSxFQUFFLENBQUNHLFlBQUgsQ0FBZ0JnQixjQUFoQixDQUErQlIsT0FBL0IsRUFBd0MsVUFBVUQsR0FBVixFQUFlRyxLQUFmLEVBQXNCO0FBQzFELFVBQUksQ0FBQ0gsR0FBTCxFQUFVQyxPQUFPLENBQUNTLFlBQVIsR0FBdUJQLEtBQXZCO0FBQ1ZJLE1BQUFBLFFBQVEsSUFBSUEsUUFBUSxDQUFDUCxHQUFELENBQXBCO0FBQ0gsS0FIRDtBQUlIO0FBaERhLENBQWxCO0FBbURBVyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzQixXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBUZXh0dXJlMkQgPSByZXF1aXJlKCcuLi9hc3NldHMvQ0NUZXh0dXJlMkQnKTtcblxubGV0IHRleHR1cmVVdGlsID0ge1xuICAgIGxvYWRJbWFnZSAodXJsLCBjYiwgdGFyZ2V0KSB7XG4gICAgICAgIGNjLmFzc2VydElEKHVybCwgMzEwMyk7XG5cbiAgICAgICAgdmFyIHRleCA9IGNjLmFzc2V0TWFuYWdlci5hc3NldHMuZ2V0KHVybCk7XG4gICAgICAgIGlmICh0ZXgpIHtcbiAgICAgICAgICAgIGlmICh0ZXgubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgY2IgJiYgY2IuY2FsbCh0YXJnZXQsIG51bGwsIHRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXgub25jZShcImxvYWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICBjYiAmJiBjYi5jYWxsKHRhcmdldCwgbnVsbCwgdGV4KTtcbiAgICAgICAgICAgICAgICB9LCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSh1cmwsIGZ1bmN0aW9uIChlcnIsIHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICBjYiAmJiBjYi5jYWxsKHRhcmdldCwgZXJyLCB0ZXh0dXJlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNhY2hlSW1hZ2UgKHVybCwgaW1hZ2UpIHtcbiAgICAgICAgaWYgKHVybCAmJiBpbWFnZSkge1xuICAgICAgICAgICAgdmFyIHRleCA9IG5ldyBUZXh0dXJlMkQoKTtcbiAgICAgICAgICAgIHRleC5pbml0V2l0aEVsZW1lbnQoaW1hZ2UpO1xuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmFzc2V0cy5hZGQodXJsLCB0ZXgpO1xuICAgICAgICAgICAgcmV0dXJuIHRleDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBwb3N0TG9hZFRleHR1cmUgKHRleHR1cmUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0ZXh0dXJlLmxvYWRlZCkge1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRleHR1cmUubmF0aXZlVXJsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvYWQgaW1hZ2VcbiAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWROYXRpdmVGaWxlKHRleHR1cmUsIGZ1bmN0aW9uIChlcnIsIGltYWdlKSB7XG4gICAgICAgICAgICBpZiAoIWVycikgdGV4dHVyZS5fbmF0aXZlQXNzZXQgPSBpbWFnZTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdGV4dHVyZVV0aWw7Il0sInNvdXJjZVJvb3QiOiIvIn0=