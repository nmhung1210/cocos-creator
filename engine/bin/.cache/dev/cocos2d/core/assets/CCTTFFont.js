
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCTTFFont.js';
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
var Font = require('./CCFont');
/**
 * @module cc
 */

/**
 * !#en Class for TTFFont handling.
 * !#zh TTF 字体资源类。
 * @class TTFFont
 * @extends Font
 *
 */


var TTFFont = cc.Class({
  name: 'cc.TTFFont',
  "extends": Font,
  properties: {
    _fontFamily: null,
    _nativeAsset: {
      type: cc.String,
      get: function get() {
        return this._fontFamily;
      },
      set: function set(value) {
        this._fontFamily = value || 'Arial';
      },
      override: true
    },
    _nativeDep: {
      get: function get() {
        return {
          uuid: this._uuid,
          __nativeName__: this._native,
          ext: cc.path.extname(this._native),
          __isNative__: true
        };
      },
      override: true
    }
  }
});
cc.TTFFont = module.exports = TTFFont;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1RURkZvbnQuanMiXSwibmFtZXMiOlsiRm9udCIsInJlcXVpcmUiLCJUVEZGb250IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiX2ZvbnRGYW1pbHkiLCJfbmF0aXZlQXNzZXQiLCJ0eXBlIiwiU3RyaW5nIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJvdmVycmlkZSIsIl9uYXRpdmVEZXAiLCJ1dWlkIiwiX3V1aWQiLCJfX25hdGl2ZU5hbWVfXyIsIl9uYXRpdmUiLCJleHQiLCJwYXRoIiwiZXh0bmFtZSIsIl9faXNOYXRpdmVfXyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXBCO0FBRUE7Ozs7QUFHQTs7Ozs7Ozs7O0FBT0EsSUFBSUMsT0FBTyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNuQkMsRUFBQUEsSUFBSSxFQUFFLFlBRGE7QUFFbkIsYUFBU0wsSUFGVTtBQUluQk0sRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRSxJQURMO0FBRVJDLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxJQUFJLEVBQUVOLEVBQUUsQ0FBQ08sTUFEQztBQUVWQyxNQUFBQSxHQUZVLGlCQUVIO0FBQ0gsZUFBTyxLQUFLSixXQUFaO0FBQ0gsT0FKUztBQUtWSyxNQUFBQSxHQUxVLGVBS0xDLEtBTEssRUFLRTtBQUNSLGFBQUtOLFdBQUwsR0FBbUJNLEtBQUssSUFBSSxPQUE1QjtBQUNILE9BUFM7QUFRVkMsTUFBQUEsUUFBUSxFQUFFO0FBUkEsS0FGTjtBQWFSQyxJQUFBQSxVQUFVLEVBQUU7QUFDUkosTUFBQUEsR0FEUSxpQkFDRDtBQUNILGVBQU87QUFBRUssVUFBQUEsSUFBSSxFQUFFLEtBQUtDLEtBQWI7QUFBb0JDLFVBQUFBLGNBQWMsRUFBRSxLQUFLQyxPQUF6QztBQUFtREMsVUFBQUEsR0FBRyxFQUFFakIsRUFBRSxDQUFDa0IsSUFBSCxDQUFRQyxPQUFSLENBQWdCLEtBQUtILE9BQXJCLENBQXhEO0FBQXVGSSxVQUFBQSxZQUFZLEVBQUU7QUFBckcsU0FBUDtBQUNILE9BSE87QUFJUlQsTUFBQUEsUUFBUSxFQUFFO0FBSkY7QUFiSjtBQUpPLENBQVQsQ0FBZDtBQTBCQVgsRUFBRSxDQUFDRCxPQUFILEdBQWFzQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ2QixPQUE5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgRm9udCA9IHJlcXVpcmUoJy4vQ0NGb250Jyk7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG4vKipcbiAqICEjZW4gQ2xhc3MgZm9yIFRURkZvbnQgaGFuZGxpbmcuXG4gKiAhI3poIFRURiDlrZfkvZPotYTmupDnsbvjgIJcbiAqIEBjbGFzcyBUVEZGb250XG4gKiBAZXh0ZW5kcyBGb250XG4gKlxuICovXG52YXIgVFRGRm9udCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVFRGRm9udCcsXG4gICAgZXh0ZW5kczogRm9udCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2ZvbnRGYW1pbHk6IG51bGwsXG4gICAgICAgIF9uYXRpdmVBc3NldDoge1xuICAgICAgICAgICAgdHlwZTogY2MuU3RyaW5nLFxuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udEZhbWlseTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9udEZhbWlseSA9IHZhbHVlIHx8ICdBcmlhbCc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICBfbmF0aXZlRGVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHV1aWQ6IHRoaXMuX3V1aWQsIF9fbmF0aXZlTmFtZV9fOiB0aGlzLl9uYXRpdmUsICBleHQ6IGNjLnBhdGguZXh0bmFtZSh0aGlzLl9uYXRpdmUpLCBfX2lzTmF0aXZlX186IHRydWUgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLlRURkZvbnQgPSBtb2R1bGUuZXhwb3J0cyA9IFRURkZvbnQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==