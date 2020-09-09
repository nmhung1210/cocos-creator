
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSpriteAtlas.js';
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

/**
 * !#en Class for sprite atlas handling.
 * !#zh 精灵图集资源类。
 * @class SpriteAtlas
 * @extends Asset
 */
var SpriteAtlas = cc.Class({
  name: 'cc.SpriteAtlas',
  "extends": cc.Asset,
  properties: {
    _spriteFrames: {
      "default": {}
    }
  },

  /**
   * Returns the texture of the sprite atlas
   * @method getTexture
   * @returns {Texture2D}
   */
  getTexture: function getTexture() {
    var keys = Object.keys(this._spriteFrames);

    if (keys.length > 0) {
      var spriteFrame = this._spriteFrames[keys[0]];
      return spriteFrame ? spriteFrame.getTexture() : null;
    } else {
      return null;
    }
  },

  /**
   * Returns the sprite frame correspond to the given key in sprite atlas.
   * @method getSpriteFrame
   * @param {String} key
   * @returns {SpriteFrame}
   */
  getSpriteFrame: function getSpriteFrame(key) {
    var sf = this._spriteFrames[key];

    if (!sf) {
      return null;
    }

    if (!sf.name) {
      sf.name = key;
    }

    return sf;
  },

  /**
   * Returns the sprite frames in sprite atlas.
   * @method getSpriteFrames
   * @returns {[SpriteFrame]}
   */
  getSpriteFrames: function getSpriteFrames() {
    var frames = [];
    var spriteFrames = this._spriteFrames;

    for (var key in spriteFrames) {
      frames.push(this.getSpriteFrame(key));
    }

    return frames;
  }
});
cc.SpriteAtlas = SpriteAtlas;
module.exports = SpriteAtlas;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1Nwcml0ZUF0bGFzLmpzIl0sIm5hbWVzIjpbIlNwcml0ZUF0bGFzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJBc3NldCIsInByb3BlcnRpZXMiLCJfc3ByaXRlRnJhbWVzIiwiZ2V0VGV4dHVyZSIsImtleXMiLCJPYmplY3QiLCJsZW5ndGgiLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwia2V5Iiwic2YiLCJnZXRTcHJpdGVGcmFtZXMiLCJmcmFtZXMiLCJzcHJpdGVGcmFtZXMiLCJwdXNoIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7O0FBTUEsSUFBSUEsV0FBVyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTRixFQUFFLENBQUNHLEtBRlc7QUFHdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxhQUFhLEVBQUU7QUFDWCxpQkFBUztBQURFO0FBRFAsR0FIVzs7QUFTdkI7Ozs7O0FBS0FDLEVBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixRQUFJQyxJQUFJLEdBQUdDLE1BQU0sQ0FBQ0QsSUFBUCxDQUFZLEtBQUtGLGFBQWpCLENBQVg7O0FBQ0EsUUFBSUUsSUFBSSxDQUFDRSxNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDakIsVUFBSUMsV0FBVyxHQUFHLEtBQUtMLGFBQUwsQ0FBbUJFLElBQUksQ0FBQyxDQUFELENBQXZCLENBQWxCO0FBQ0EsYUFBT0csV0FBVyxHQUFHQSxXQUFXLENBQUNKLFVBQVosRUFBSCxHQUE4QixJQUFoRDtBQUNILEtBSEQsTUFJSztBQUNELGFBQU8sSUFBUDtBQUNIO0FBQ0osR0F2QnNCOztBQXlCdkI7Ozs7OztBQU1BSyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVDLEdBQVYsRUFBZTtBQUMzQixRQUFJQyxFQUFFLEdBQUcsS0FBS1IsYUFBTCxDQUFtQk8sR0FBbkIsQ0FBVDs7QUFDQSxRQUFJLENBQUNDLEVBQUwsRUFBUztBQUNMLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUksQ0FBQ0EsRUFBRSxDQUFDWCxJQUFSLEVBQWM7QUFDVlcsTUFBQUEsRUFBRSxDQUFDWCxJQUFILEdBQVVVLEdBQVY7QUFDSDs7QUFDRCxXQUFPQyxFQUFQO0FBQ0gsR0F4Q3NCOztBQTBDdkI7Ozs7O0FBS0FDLEVBQUFBLGVBQWUsRUFBRSwyQkFBWTtBQUN6QixRQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBLFFBQUlDLFlBQVksR0FBRyxLQUFLWCxhQUF4Qjs7QUFFQSxTQUFLLElBQUlPLEdBQVQsSUFBZ0JJLFlBQWhCLEVBQThCO0FBQzFCRCxNQUFBQSxNQUFNLENBQUNFLElBQVAsQ0FBWSxLQUFLTixjQUFMLENBQW9CQyxHQUFwQixDQUFaO0FBQ0g7O0FBRUQsV0FBT0csTUFBUDtBQUNIO0FBeERzQixDQUFULENBQWxCO0FBMkRBZixFQUFFLENBQUNELFdBQUgsR0FBaUJBLFdBQWpCO0FBQ0FtQixNQUFNLENBQUNDLE9BQVAsR0FBa0JwQixXQUFsQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBzcHJpdGUgYXRsYXMgaGFuZGxpbmcuXG4gKiAhI3poIOeyvueBteWbvumbhui1hOa6kOexu+OAglxuICogQGNsYXNzIFNwcml0ZUF0bGFzXG4gKiBAZXh0ZW5kcyBBc3NldFxuICovXG52YXIgU3ByaXRlQXRsYXMgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNwcml0ZUF0bGFzJyxcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9zcHJpdGVGcmFtZXM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHt9XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRleHR1cmUgb2YgdGhlIHNwcml0ZSBhdGxhc1xuICAgICAqIEBtZXRob2QgZ2V0VGV4dHVyZVxuICAgICAqIEByZXR1cm5zIHtUZXh0dXJlMkR9XG4gICAgICovXG4gICAgZ2V0VGV4dHVyZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3Nwcml0ZUZyYW1lcyk7XG4gICAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBzcHJpdGVGcmFtZSA9IHRoaXMuX3Nwcml0ZUZyYW1lc1trZXlzWzBdXTtcbiAgICAgICAgICAgIHJldHVybiBzcHJpdGVGcmFtZSA/IHNwcml0ZUZyYW1lLmdldFRleHR1cmUoKSA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzcHJpdGUgZnJhbWUgY29ycmVzcG9uZCB0byB0aGUgZ2l2ZW4ga2V5IGluIHNwcml0ZSBhdGxhcy5cbiAgICAgKiBAbWV0aG9kIGdldFNwcml0ZUZyYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEByZXR1cm5zIHtTcHJpdGVGcmFtZX1cbiAgICAgKi9cbiAgICBnZXRTcHJpdGVGcmFtZTogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBsZXQgc2YgPSB0aGlzLl9zcHJpdGVGcmFtZXNba2V5XTtcbiAgICAgICAgaWYgKCFzZikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gXG4gICAgICAgIGlmICghc2YubmFtZSkge1xuICAgICAgICAgICAgc2YubmFtZSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2Y7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNwcml0ZSBmcmFtZXMgaW4gc3ByaXRlIGF0bGFzLlxuICAgICAqIEBtZXRob2QgZ2V0U3ByaXRlRnJhbWVzXG4gICAgICogQHJldHVybnMge1tTcHJpdGVGcmFtZV19XG4gICAgICovXG4gICAgZ2V0U3ByaXRlRnJhbWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmcmFtZXMgPSBbXTtcbiAgICAgICAgdmFyIHNwcml0ZUZyYW1lcyA9IHRoaXMuX3Nwcml0ZUZyYW1lcztcblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc3ByaXRlRnJhbWVzKSB7XG4gICAgICAgICAgICBmcmFtZXMucHVzaCh0aGlzLmdldFNwcml0ZUZyYW1lKGtleSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYW1lcztcbiAgICB9XG59KTtcblxuY2MuU3ByaXRlQXRsYXMgPSBTcHJpdGVBdGxhcztcbm1vZHVsZS5leHBvcnRzID0gIFNwcml0ZUF0bGFzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=