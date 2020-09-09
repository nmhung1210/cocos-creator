
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/label/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCLabel = _interopRequireDefault(require("../../../../components/CCLabel"));

var _ttf = _interopRequireDefault(require("./ttf"));

var _bmfont = _interopRequireDefault(require("./bmfont"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var canvasPool = {
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
_CCLabel["default"]._canvasPool = canvasPool;

_assembler["default"].register(_CCLabel["default"], {
  getConstructor: function getConstructor(label) {
    var ctor = _ttf["default"];

    if (label.font instanceof cc.BitmapFont) {
      ctor = _bmfont["default"];
    } else if (label.cacheMode === _CCLabel["default"].CacheMode.CHAR) {
      cc.warn('sorry, canvas mode does not support CHAR mode currently!');
    }

    return ctor;
  },
  TTF: _ttf["default"],
  Bmfont: _bmfont["default"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvbGFiZWwvaW5kZXguanMiXSwibmFtZXMiOlsiY2FudmFzUG9vbCIsInBvb2wiLCJnZXQiLCJkYXRhIiwicG9wIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY29udGV4dCIsImdldENvbnRleHQiLCJ0ZXh0QmFzZWxpbmUiLCJsaW5lSm9pbiIsInB1dCIsImxlbmd0aCIsInB1c2giLCJMYWJlbCIsIl9jYW52YXNQb29sIiwiQXNzZW1ibGVyIiwicmVnaXN0ZXIiLCJnZXRDb25zdHJ1Y3RvciIsImxhYmVsIiwiY3RvciIsIlRURiIsImZvbnQiLCJjYyIsIkJpdG1hcEZvbnQiLCJCbWZvbnQiLCJjYWNoZU1vZGUiLCJDYWNoZU1vZGUiLCJDSEFSIiwid2FybiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQTVCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLElBQUlBLFVBQVUsR0FBRztBQUNiQyxFQUFBQSxJQUFJLEVBQUUsRUFETztBQUViQyxFQUFBQSxHQUZhLGlCQUVOO0FBQ0gsUUFBSUMsSUFBSSxHQUFHLEtBQUtGLElBQUwsQ0FBVUcsR0FBVixFQUFYOztBQUVBLFFBQUksQ0FBQ0QsSUFBTCxFQUFXO0FBQ1AsVUFBSUUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLFVBQUlDLE9BQU8sR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQWQ7QUFDQU4sTUFBQUEsSUFBSSxHQUFHO0FBQ0hFLFFBQUFBLE1BQU0sRUFBRUEsTUFETDtBQUVIRyxRQUFBQSxPQUFPLEVBQUVBO0FBRk4sT0FBUCxDQUhPLENBUVA7O0FBQ0FBLE1BQUFBLE9BQU8sQ0FBQ0UsWUFBUixHQUF1QixZQUF2QixDQVRPLENBVVA7O0FBQ0FGLE1BQUFBLE9BQU8sQ0FBQ0csUUFBUixHQUFtQixPQUFuQjtBQUNIOztBQUVELFdBQU9SLElBQVA7QUFDSCxHQXBCWTtBQXFCYlMsRUFBQUEsR0FyQmEsZUFxQlJQLE1BckJRLEVBcUJBO0FBQ1QsUUFBSSxLQUFLSixJQUFMLENBQVVZLE1BQVYsSUFBb0IsRUFBeEIsRUFBNEI7QUFDeEI7QUFDSDs7QUFDRCxTQUFLWixJQUFMLENBQVVhLElBQVYsQ0FBZVQsTUFBZjtBQUNIO0FBMUJZLENBQWpCO0FBNkJBVSxvQkFBTUMsV0FBTixHQUFvQmhCLFVBQXBCOztBQUdBaUIsc0JBQVVDLFFBQVYsQ0FBbUJILG1CQUFuQixFQUEwQjtBQUN0QkksRUFBQUEsY0FEc0IsMEJBQ1BDLEtBRE8sRUFDQTtBQUNsQixRQUFJQyxJQUFJLEdBQUdDLGVBQVg7O0FBRUEsUUFBSUYsS0FBSyxDQUFDRyxJQUFOLFlBQXNCQyxFQUFFLENBQUNDLFVBQTdCLEVBQXlDO0FBQ3JDSixNQUFBQSxJQUFJLEdBQUdLLGtCQUFQO0FBQ0gsS0FGRCxNQUVPLElBQUlOLEtBQUssQ0FBQ08sU0FBTixLQUFvQlosb0JBQU1hLFNBQU4sQ0FBZ0JDLElBQXhDLEVBQThDO0FBQ2pETCxNQUFBQSxFQUFFLENBQUNNLElBQUgsQ0FBUSwwREFBUjtBQUNIOztBQUVELFdBQU9ULElBQVA7QUFDSCxHQVhxQjtBQWF0QkMsRUFBQUEsR0FBRyxFQUFIQSxlQWJzQjtBQWN0QkksRUFBQUEsTUFBTSxFQUFOQTtBQWRzQixDQUExQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQXNzZW1ibGVyIGZyb20gJy4uLy4uLy4uL2Fzc2VtYmxlcic7XG5pbXBvcnQgTGFiZWwgZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ0xhYmVsJztcbmltcG9ydCBUVEYgZnJvbSAnLi90dGYnO1xuaW1wb3J0IEJtZm9udCBmcm9tICcuL2JtZm9udCc7XG5cbmxldCBjYW52YXNQb29sID0ge1xuICAgIHBvb2w6IFtdLFxuICAgIGdldCAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5wb29sLnBvcCgpO1xuXG4gICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICBsZXQgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGNhbnZhczogY2FudmFzLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCB0ZXh0IGluZm9cbiAgICAgICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2FscGhhYmV0aWMnO1xuICAgICAgICAgICAgLy8gdXNlIHJvdW5kIGZvciBsaW5lIGpvaW4gdG8gYXZvaWQgc2hhcnAgaW50ZXJzZWN0IHBvaW50XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVKb2luID0gJ3JvdW5kJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgcHV0IChjYW52YXMpIHtcbiAgICAgICAgaWYgKHRoaXMucG9vbC5sZW5ndGggPj0gMzIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvb2wucHVzaChjYW52YXMpO1xuICAgIH1cbn07XG5cbkxhYmVsLl9jYW52YXNQb29sID0gY2FudmFzUG9vbDtcblxuXG5Bc3NlbWJsZXIucmVnaXN0ZXIoTGFiZWwsIHtcbiAgICBnZXRDb25zdHJ1Y3RvcihsYWJlbCkge1xuICAgICAgICBsZXQgY3RvciA9IFRURjtcbiAgICAgICAgXG4gICAgICAgIGlmIChsYWJlbC5mb250IGluc3RhbmNlb2YgY2MuQml0bWFwRm9udCkge1xuICAgICAgICAgICAgY3RvciA9IEJtZm9udDtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbC5jYWNoZU1vZGUgPT09IExhYmVsLkNhY2hlTW9kZS5DSEFSKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdzb3JyeSwgY2FudmFzIG1vZGUgZG9lcyBub3Qgc3VwcG9ydCBDSEFSIG1vZGUgY3VycmVudGx5IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN0b3I7XG4gICAgfSxcblxuICAgIFRURixcbiAgICBCbWZvbnRcbn0pOyJdLCJzb3VyY2VSb290IjoiLyJ9