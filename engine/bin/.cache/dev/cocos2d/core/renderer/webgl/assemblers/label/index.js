
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCLabel = _interopRequireDefault(require("../../../../components/CCLabel"));

var _ttf = _interopRequireDefault(require("./2d/ttf"));

var _bmfont = _interopRequireDefault(require("./2d/bmfont"));

var _letter = _interopRequireDefault(require("./2d/letter"));

var _ttf2 = _interopRequireDefault(require("./3d/ttf"));

var _bmfont2 = _interopRequireDefault(require("./3d/bmfont"));

var _letter2 = _interopRequireDefault(require("./3d/letter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var NativeTTF = undefined;

if (CC_JSB) {
  NativeTTF = require("./2d/nativeTTF");
}

_CCLabel["default"]._canvasPool = {
  pool: [],
  get: function get() {
    var data = this.pool.pop();

    if (!data) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      data = {
        canvas: canvas,
        context: context
      }; // default text info

      context.textBaseline = 'alphabetic'; // use round for line join to avoid sharp intersect point

      context.lineJoin = 'round';
    }

    return data;
  },
  put: function put(canvas) {
    if (this.pool.length >= 32) {
      return;
    }

    this.pool.push(canvas);
  }
};

_assembler["default"].register(cc.Label, {
  getConstructor: function getConstructor(label) {
    var is3DNode = label.node.is3DNode;
    var ctor = is3DNode ? _ttf2["default"] : _ttf["default"];

    if (label.font instanceof cc.BitmapFont) {
      ctor = is3DNode ? _bmfont2["default"] : _bmfont["default"];
    } else if (label.cacheMode === _CCLabel["default"].CacheMode.CHAR) {
      if (CC_JSB && !is3DNode && !!jsb.LabelRenderer && label.font instanceof cc.TTFFont && !label._forceUseCanvas) {
        ctor = NativeTTF;
      } else if (cc.sys.platform === cc.sys.WECHAT_GAME_SUB) {
        cc.warn('sorry, subdomain does not support CHAR mode currently!');
      } else {
        ctor = is3DNode ? _letter2["default"] : _letter["default"];
      }
    }

    return ctor;
  },
  TTF: _ttf["default"],
  Bmfont: _bmfont["default"],
  Letter: _letter["default"],
  TTF3D: _ttf2["default"],
  Bmfont3D: _bmfont2["default"],
  Letter3D: _letter2["default"],
  NativeTTF: NativeTTF
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvbGFiZWwvaW5kZXguanMiXSwibmFtZXMiOlsiTmF0aXZlVFRGIiwidW5kZWZpbmVkIiwiQ0NfSlNCIiwicmVxdWlyZSIsIkxhYmVsIiwiX2NhbnZhc1Bvb2wiLCJwb29sIiwiZ2V0IiwiZGF0YSIsInBvcCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwidGV4dEJhc2VsaW5lIiwibGluZUpvaW4iLCJwdXQiLCJsZW5ndGgiLCJwdXNoIiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiLCJjYyIsImdldENvbnN0cnVjdG9yIiwibGFiZWwiLCJpczNETm9kZSIsIm5vZGUiLCJjdG9yIiwiVFRGM0QiLCJUVEYiLCJmb250IiwiQml0bWFwRm9udCIsIkJtZm9udDNEIiwiQm1mb250IiwiY2FjaGVNb2RlIiwiQ2FjaGVNb2RlIiwiQ0hBUiIsImpzYiIsIkxhYmVsUmVuZGVyZXIiLCJUVEZGb250IiwiX2ZvcmNlVXNlQ2FudmFzIiwic3lzIiwicGxhdGZvcm0iLCJXRUNIQVRfR0FNRV9TVUIiLCJ3YXJuIiwiTGV0dGVyM0QiLCJMZXR0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7QUFsQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9DQSxJQUFJQSxTQUFTLEdBQUdDLFNBQWhCOztBQUNBLElBQUdDLE1BQUgsRUFBVztBQUNQRixFQUFBQSxTQUFTLEdBQUdHLE9BQU8sQ0FBQyxnQkFBRCxDQUFuQjtBQUNIOztBQUVEQyxvQkFBTUMsV0FBTixHQUFvQjtBQUNoQkMsRUFBQUEsSUFBSSxFQUFFLEVBRFU7QUFFaEJDLEVBQUFBLEdBRmdCLGlCQUVUO0FBQ0gsUUFBSUMsSUFBSSxHQUFHLEtBQUtGLElBQUwsQ0FBVUcsR0FBVixFQUFYOztBQUVBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1AsVUFBSUUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFVBQUlDLE9BQU8sR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQWQ7QUFDQU4sTUFBQUEsSUFBSSxHQUFHO0FBQ0hFLFFBQUFBLE1BQU0sRUFBRUEsTUFETDtBQUVIRyxRQUFBQSxPQUFPLEVBQUVBO0FBRk4sT0FBUCxDQUhPLENBUVA7O0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0UsWUFBUixHQUF1QixZQUF2QixDQVRPLENBVVA7O0FBQ0FGLE1BQUFBLE9BQU8sQ0FBQ0csUUFBUixHQUFtQixPQUFuQjtBQUNIOztBQUVELFdBQU9SLElBQVA7QUFDSCxHQXBCZTtBQXFCaEJTLEVBQUFBLEdBckJnQixlQXFCWFAsTUFyQlcsRUFxQkg7QUFDVCxRQUFJLEtBQUtKLElBQUwsQ0FBVVksTUFBVixJQUFvQixFQUF4QixFQUE0QjtBQUN4QjtBQUNIOztBQUNELFNBQUtaLElBQUwsQ0FBVWEsSUFBVixDQUFlVCxNQUFmO0FBQ0g7QUExQmUsQ0FBcEI7O0FBNkJBVSxzQkFBVUMsUUFBVixDQUFtQkMsRUFBRSxDQUFDbEIsS0FBdEIsRUFBNkI7QUFDekJtQixFQUFBQSxjQUR5QiwwQkFDVkMsS0FEVSxFQUNIO0FBQ2xCLFFBQUlDLFFBQVEsR0FBR0QsS0FBSyxDQUFDRSxJQUFOLENBQVdELFFBQTFCO0FBQ0EsUUFBSUUsSUFBSSxHQUFHRixRQUFRLEdBQUdHLGdCQUFILEdBQVdDLGVBQTlCOztBQUVBLFFBQUlMLEtBQUssQ0FBQ00sSUFBTixZQUFzQlIsRUFBRSxDQUFDUyxVQUE3QixFQUF5QztBQUNyQ0osTUFBQUEsSUFBSSxHQUFHRixRQUFRLEdBQUdPLG1CQUFILEdBQWNDLGtCQUE3QjtBQUNILEtBRkQsTUFFTyxJQUFJVCxLQUFLLENBQUNVLFNBQU4sS0FBb0I5QixvQkFBTStCLFNBQU4sQ0FBZ0JDLElBQXhDLEVBQThDO0FBRWpELFVBQUdsQyxNQUFNLElBQUksQ0FBQ3VCLFFBQVgsSUFBdUIsQ0FBQyxDQUFDWSxHQUFHLENBQUNDLGFBQTdCLElBQThDZCxLQUFLLENBQUNNLElBQU4sWUFBc0JSLEVBQUUsQ0FBQ2lCLE9BQXZFLElBQWtGLENBQUNmLEtBQUssQ0FBQ2dCLGVBQTVGLEVBQTRHO0FBQ3hHYixRQUFBQSxJQUFJLEdBQUczQixTQUFQO0FBQ0gsT0FGRCxNQUVPLElBQUlzQixFQUFFLENBQUNtQixHQUFILENBQU9DLFFBQVAsS0FBb0JwQixFQUFFLENBQUNtQixHQUFILENBQU9FLGVBQS9CLEVBQWdEO0FBQ25EckIsUUFBQUEsRUFBRSxDQUFDc0IsSUFBSCxDQUFRLHdEQUFSO0FBQ0gsT0FGTSxNQUVBO0FBQ0hqQixRQUFBQSxJQUFJLEdBQUdGLFFBQVEsR0FBR29CLG1CQUFILEdBQWNDLGtCQUE3QjtBQUNIO0FBQ0o7O0FBRUQsV0FBT25CLElBQVA7QUFDSCxHQW5Cd0I7QUFxQnpCRSxFQUFBQSxHQUFHLEVBQUhBLGVBckJ5QjtBQXNCekJJLEVBQUFBLE1BQU0sRUFBTkEsa0JBdEJ5QjtBQXVCekJhLEVBQUFBLE1BQU0sRUFBTkEsa0JBdkJ5QjtBQXlCekJsQixFQUFBQSxLQUFLLEVBQUxBLGdCQXpCeUI7QUEwQnpCSSxFQUFBQSxRQUFRLEVBQVJBLG1CQTFCeUI7QUEyQnpCYSxFQUFBQSxRQUFRLEVBQVJBLG1CQTNCeUI7QUE0QnpCN0MsRUFBQUEsU0FBUyxFQUFUQTtBQTVCeUIsQ0FBN0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XG5pbXBvcnQgTGFiZWwgZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJztcblxuaW1wb3J0IFRURiBmcm9tICcuLzJkL3R0Zic7XG5pbXBvcnQgQm1mb250IGZyb20gJy4vMmQvYm1mb250JztcbmltcG9ydCBMZXR0ZXIgZnJvbSAnLi8yZC9sZXR0ZXInO1xuXG5pbXBvcnQgVFRGM0QgZnJvbSAnLi8zZC90dGYnO1xuaW1wb3J0IEJtZm9udDNEIGZyb20gJy4vM2QvYm1mb250JztcbmltcG9ydCBMZXR0ZXIzRCBmcm9tICcuLzNkL2xldHRlcic7XG5cbmxldCBOYXRpdmVUVEYgPSB1bmRlZmluZWQ7XG5pZihDQ19KU0IpIHtcbiAgICBOYXRpdmVUVEYgPSByZXF1aXJlKFwiLi8yZC9uYXRpdmVUVEZcIik7XG59XG5cbkxhYmVsLl9jYW52YXNQb29sID0ge1xuICAgIHBvb2w6IFtdLFxuICAgIGdldCAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5wb29sLnBvcCgpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGNhbnZhczogY2FudmFzLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCB0ZXh0IGluZm9cbiAgICAgICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xuICAgICAgICAgICAgLy8gdXNlIHJvdW5kIGZvciBsaW5lIGpvaW4gdG8gYXZvaWQgc2hhcnAgaW50ZXJzZWN0IHBvaW50XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgcHV0IChjYW52YXMpIHtcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGggPj0gMzIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvb2wucHVzaChjYW52YXMpO1xuICAgIH1cbn07XG5cbkFzc2VtYmxlci5yZWdpc3RlcihjYy5MYWJlbCwge1xuICAgIGdldENvbnN0cnVjdG9yKGxhYmVsKSB7XG4gICAgICAgIGxldCBpczNETm9kZSA9IGxhYmVsLm5vZGUuaXMzRE5vZGU7XG4gICAgICAgIGxldCBjdG9yID0gaXMzRE5vZGUgPyBUVEYzRCA6IFRURjtcbiAgICAgICAgXG4gICAgICAgIGlmIChsYWJlbC5mb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xuICAgICAgICAgICAgY3RvciA9IGlzM0ROb2RlID8gQm1mb250M0QgOiBCbWZvbnQ7XG4gICAgICAgIH0gZWxzZSBpZiAobGFiZWwuY2FjaGVNb2RlID09PSBMYWJlbC5DYWNoZU1vZGUuQ0hBUikge1xuXG4gICAgICAgICAgICBpZihDQ19KU0IgJiYgIWlzM0ROb2RlICYmICEhanNiLkxhYmVsUmVuZGVyZXIgJiYgbGFiZWwuZm9udCBpbnN0YW5jZW9mIGNjLlRURkZvbnQgJiYgIWxhYmVsLl9mb3JjZVVzZUNhbnZhcyl7XG4gICAgICAgICAgICAgICAgY3RvciA9IE5hdGl2ZVRURjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2Muc3lzLnBsYXRmb3JtID09PSBjYy5zeXMuV0VDSEFUX0dBTUVfU1VCKSB7XG4gICAgICAgICAgICAgICAgY2Mud2Fybignc29ycnksIHN1YmRvbWFpbiBkb2VzIG5vdCBzdXBwb3J0IENIQVIgbW9kZSBjdXJyZW50bHkhJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IExldHRlcjNEIDogTGV0dGVyO1xuICAgICAgICAgICAgfSAgXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3RvcjtcbiAgICB9LFxuXG4gICAgVFRGLFxuICAgIEJtZm9udCxcbiAgICBMZXR0ZXIsXG5cbiAgICBUVEYzRCxcbiAgICBCbWZvbnQzRCxcbiAgICBMZXR0ZXIzRCxcbiAgICBOYXRpdmVUVEZcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=