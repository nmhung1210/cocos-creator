
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
  },
  statics: {
    _parseDepsFromJson: function _parseDepsFromJson() {
      return [];
    },
    _parseNativeDepFromJson: function _parseNativeDepFromJson(json) {
      return {
        __nativeName__: json._native,
        ext: cc.path.extname(json._native),
        __isNative__: true
      };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1RURkZvbnQuanMiXSwibmFtZXMiOlsiRm9udCIsInJlcXVpcmUiLCJUVEZGb250IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJwcm9wZXJ0aWVzIiwiX2ZvbnRGYW1pbHkiLCJfbmF0aXZlQXNzZXQiLCJ0eXBlIiwiU3RyaW5nIiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJvdmVycmlkZSIsIl9uYXRpdmVEZXAiLCJ1dWlkIiwiX3V1aWQiLCJfX25hdGl2ZU5hbWVfXyIsIl9uYXRpdmUiLCJleHQiLCJwYXRoIiwiZXh0bmFtZSIsIl9faXNOYXRpdmVfXyIsInN0YXRpY3MiLCJfcGFyc2VEZXBzRnJvbUpzb24iLCJfcGFyc2VOYXRpdmVEZXBGcm9tSnNvbiIsImpzb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsSUFBSSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFwQjtBQUVBOzs7O0FBR0E7Ozs7Ozs7OztBQU9BLElBQUlDLE9BQU8sR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDbkJDLEVBQUFBLElBQUksRUFBRSxZQURhO0FBRW5CLGFBQVNMLElBRlU7QUFJbkJNLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUUsSUFETDtBQUVSQyxJQUFBQSxZQUFZLEVBQUU7QUFDVkMsTUFBQUEsSUFBSSxFQUFFTixFQUFFLENBQUNPLE1BREM7QUFFVkMsTUFBQUEsR0FGVSxpQkFFSDtBQUNILGVBQU8sS0FBS0osV0FBWjtBQUNILE9BSlM7QUFLVkssTUFBQUEsR0FMVSxlQUtMQyxLQUxLLEVBS0U7QUFDUixhQUFLTixXQUFMLEdBQW1CTSxLQUFLLElBQUksT0FBNUI7QUFDSCxPQVBTO0FBUVZDLE1BQUFBLFFBQVEsRUFBRTtBQVJBLEtBRk47QUFhUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JKLE1BQUFBLEdBRFEsaUJBQ0Q7QUFDSCxlQUFPO0FBQUVLLFVBQUFBLElBQUksRUFBRSxLQUFLQyxLQUFiO0FBQW9CQyxVQUFBQSxjQUFjLEVBQUUsS0FBS0MsT0FBekM7QUFBbURDLFVBQUFBLEdBQUcsRUFBRWpCLEVBQUUsQ0FBQ2tCLElBQUgsQ0FBUUMsT0FBUixDQUFnQixLQUFLSCxPQUFyQixDQUF4RDtBQUF1RkksVUFBQUEsWUFBWSxFQUFFO0FBQXJHLFNBQVA7QUFDSCxPQUhPO0FBSVJULE1BQUFBLFFBQVEsRUFBRTtBQUpGO0FBYkosR0FKTztBQXlCbkJVLEVBQUFBLE9BQU8sRUFBRTtBQUNMQyxJQUFBQSxrQkFESyxnQ0FDaUI7QUFDbEIsYUFBTyxFQUFQO0FBQ0gsS0FISTtBQUtMQyxJQUFBQSx1QkFMSyxtQ0FLb0JDLElBTHBCLEVBSzBCO0FBQzNCLGFBQU87QUFBRVQsUUFBQUEsY0FBYyxFQUFFUyxJQUFJLENBQUNSLE9BQXZCO0FBQWlDQyxRQUFBQSxHQUFHLEVBQUVqQixFQUFFLENBQUNrQixJQUFILENBQVFDLE9BQVIsQ0FBZ0JLLElBQUksQ0FBQ1IsT0FBckIsQ0FBdEM7QUFBcUVJLFFBQUFBLFlBQVksRUFBRTtBQUFuRixPQUFQO0FBQ0g7QUFQSTtBQXpCVSxDQUFULENBQWQ7QUFvQ0FwQixFQUFFLENBQUNELE9BQUgsR0FBYTBCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNCLE9BQTlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBGb250ID0gcmVxdWlyZSgnLi9DQ0ZvbnQnKTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cbi8qKlxuICogISNlbiBDbGFzcyBmb3IgVFRGRm9udCBoYW5kbGluZy5cbiAqICEjemggVFRGIOWtl+S9k+i1hOa6kOexu+OAglxuICogQGNsYXNzIFRURkZvbnRcbiAqIEBleHRlbmRzIEZvbnRcbiAqXG4gKi9cbnZhciBUVEZGb250ID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5UVEZGb250JyxcbiAgICBleHRlbmRzOiBGb250LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfZm9udEZhbWlseTogbnVsbCxcbiAgICAgICAgX25hdGl2ZUFzc2V0OiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5TdHJpbmcsXG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250RmFtaWx5O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb250RmFtaWx5ID0gdmFsdWUgfHwgJ0FyaWFsJztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9LFxuXG4gICAgICAgIF9uYXRpdmVEZXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdXVpZDogdGhpcy5fdXVpZCwgX19uYXRpdmVOYW1lX186IHRoaXMuX25hdGl2ZSwgIGV4dDogY2MucGF0aC5leHRuYW1lKHRoaXMuX25hdGl2ZSksIF9faXNOYXRpdmVfXzogdHJ1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBfcGFyc2VEZXBzRnJvbUpzb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIF9wYXJzZU5hdGl2ZURlcEZyb21Kc29uIChqc29uKSB7XG4gICAgICAgICAgICByZXR1cm4geyBfX25hdGl2ZU5hbWVfXzoganNvbi5fbmF0aXZlLCAgZXh0OiBjYy5wYXRoLmV4dG5hbWUoanNvbi5fbmF0aXZlKSwgX19pc05hdGl2ZV9fOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuVFRGRm9udCA9IG1vZHVsZS5leHBvcnRzID0gVFRGRm9udDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9