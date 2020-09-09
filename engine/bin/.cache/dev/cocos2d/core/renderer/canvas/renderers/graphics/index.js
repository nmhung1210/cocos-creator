
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/graphics/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _impl = _interopRequireDefault(require("./impl"));

var _graphics = _interopRequireDefault(require("../../../../graphics/graphics"));

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
var CanvasGraphicsAssembler = /*#__PURE__*/function () {
  function CanvasGraphicsAssembler() {}

  var _proto = CanvasGraphicsAssembler.prototype;

  _proto.init = function init() {};

  _proto.updateRenderData = function updateRenderData() {};

  _proto.draw = function draw(ctx, comp) {
    var node = comp.node; // Transform

    var matrix = node._worldMatrix;
    var matrixm = matrix.m;
    var a = matrixm[0],
        b = matrixm[1],
        c = matrixm[4],
        d = matrixm[5],
        tx = matrixm[12],
        ty = matrixm[13];
    ctx.transform(a, b, c, d, tx, ty);
    ctx.save(); // TODO: handle blend function
    // opacity

    ctx.globalAlpha = node.opacity / 255;
    var style = comp._impl.style;
    ctx.strokeStyle = style.strokeStyle;
    ctx.fillStyle = style.fillStyle;
    ctx.lineWidth = style.lineWidth;
    ctx.lineJoin = style.lineJoin;
    ctx.miterLimit = style.miterLimit;
    var endPath = true;
    var cmds = comp._impl.cmds;

    for (var i = 0, l = cmds.length; i < l; i++) {
      var cmd = cmds[i];
      var ctxCmd = cmd[0],
          args = cmd[1];

      if (ctxCmd === 'moveTo' && endPath) {
        ctx.beginPath();
        endPath = false;
      } else if (ctxCmd === 'fill' || ctxCmd === 'stroke' || ctxCmd === 'fillRect') {
        endPath = true;
      }

      if (typeof ctx[ctxCmd] === 'function') {
        ctx[ctxCmd].apply(ctx, args);
      } else {
        ctx[ctxCmd] = args;
      }
    }

    ctx.restore();
    return 1;
  };

  _proto.stroke = function stroke(comp) {
    comp._impl.stroke();
  };

  _proto.fill = function fill(comp) {
    comp._impl.fill();
  };

  _proto.clear = function clear() {};

  return CanvasGraphicsAssembler;
}();

exports["default"] = CanvasGraphicsAssembler;

_assembler["default"].register(_graphics["default"], CanvasGraphicsAssembler);

module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvZ3JhcGhpY3MvaW5kZXguanMiXSwibmFtZXMiOlsiQ2FudmFzR3JhcGhpY3NBc3NlbWJsZXIiLCJpbml0IiwidXBkYXRlUmVuZGVyRGF0YSIsImRyYXciLCJjdHgiLCJjb21wIiwibm9kZSIsIm1hdHJpeCIsIl93b3JsZE1hdHJpeCIsIm1hdHJpeG0iLCJtIiwiYSIsImIiLCJjIiwiZCIsInR4IiwidHkiLCJ0cmFuc2Zvcm0iLCJzYXZlIiwiZ2xvYmFsQWxwaGEiLCJvcGFjaXR5Iiwic3R5bGUiLCJfaW1wbCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwibGluZVdpZHRoIiwibGluZUpvaW4iLCJtaXRlckxpbWl0IiwiZW5kUGF0aCIsImNtZHMiLCJpIiwibCIsImxlbmd0aCIsImNtZCIsImN0eENtZCIsImFyZ3MiLCJiZWdpblBhdGgiLCJhcHBseSIsInJlc3RvcmUiLCJzdHJva2UiLCJmaWxsIiwiY2xlYXIiLCJBc3NlbWJsZXIiLCJyZWdpc3RlciIsIkdyYXBoaWNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBOztBQUNBOztBQUNBOzs7O0FBMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0QnFCQTs7Ozs7U0FDakJDLE9BQUEsZ0JBQVEsQ0FBRTs7U0FFVkMsbUJBQUEsNEJBQW9CLENBQUU7O1NBRXRCQyxPQUFBLGNBQU1DLEdBQU4sRUFBV0MsSUFBWCxFQUFpQjtBQUNiLFFBQUlDLElBQUksR0FBR0QsSUFBSSxDQUFDQyxJQUFoQixDQURhLENBRWI7O0FBQ0EsUUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLFlBQWxCO0FBQ0EsUUFBSUMsT0FBTyxHQUFHRixNQUFNLENBQUNHLENBQXJCO0FBQ0EsUUFBSUMsQ0FBQyxHQUFHRixPQUFPLENBQUMsQ0FBRCxDQUFmO0FBQUEsUUFBb0JHLENBQUMsR0FBR0gsT0FBTyxDQUFDLENBQUQs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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi8uLi9hc3NlbWJsZXInO1xuaW1wb3J0IEltcGwgZnJvbSAnLi9pbXBsJztcbmltcG9ydCBHcmFwaGljcyBmcm9tICcuLi8uLi8uLi8uLi9ncmFwaGljcy9ncmFwaGljcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc0dyYXBoaWNzQXNzZW1ibGVyIHtcbiAgICBpbml0ICgpIHt9XG5cbiAgICB1cGRhdGVSZW5kZXJEYXRhICgpIHt9XG5cbiAgICBkcmF3IChjdHgsIGNvbXApIHtcbiAgICAgICAgbGV0IG5vZGUgPSBjb21wLm5vZGU7XG4gICAgICAgIC8vIFRyYW5zZm9ybVxuICAgICAgICBsZXQgbWF0cml4ID0gbm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCBtYXRyaXhtID0gbWF0cml4Lm07XG4gICAgICAgIGxldCBhID0gbWF0cml4bVswXSwgYiA9IG1hdHJpeG1bMV0sIGMgPSBtYXRyaXhtWzRdLCBkID0gbWF0cml4bVs1XSxcbiAgICAgICAgICAgIHR4ID0gbWF0cml4bVsxMl0sIHR5ID0gbWF0cml4bVsxM107XG4gICAgICAgIGN0eC50cmFuc2Zvcm0oYSwgYiwgYywgZCwgdHgsIHR5KTtcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICAvLyBUT0RPOiBoYW5kbGUgYmxlbmQgZnVuY3Rpb25cblxuICAgICAgICAvLyBvcGFjaXR5XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IG5vZGUub3BhY2l0eSAvIDI1NTtcblxuICAgICAgICBsZXQgc3R5bGUgPSBjb21wLl9pbXBsLnN0eWxlO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5zdHJva2VTdHlsZTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmZpbGxTdHlsZTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcbiAgICAgICAgY3R4LmxpbmVKb2luID0gc3R5bGUubGluZUpvaW47XG4gICAgICAgIGN0eC5taXRlckxpbWl0ID0gc3R5bGUubWl0ZXJMaW1pdDtcblxuICAgICAgICBsZXQgZW5kUGF0aCA9IHRydWU7XG4gICAgICAgIGxldCBjbWRzID0gY29tcC5faW1wbC5jbWRzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGNtZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY21kID0gY21kc1tpXTtcbiAgICAgICAgICAgIGxldCBjdHhDbWQgPSBjbWRbMF0sIGFyZ3MgPSBjbWRbMV07XG5cbiAgICAgICAgICAgIGlmIChjdHhDbWQgPT09ICdtb3ZlVG8nICYmIGVuZFBhdGgpIHtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgZW5kUGF0aCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4Q21kID09PSAnZmlsbCcgfHwgY3R4Q21kID09PSAnc3Ryb2tlJyB8fCBjdHhDbWQgPT09ICdmaWxsUmVjdCcpIHtcbiAgICAgICAgICAgICAgICBlbmRQYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjdHhbY3R4Q21kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGN0eFtjdHhDbWRdLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHhbY3R4Q21kXSA9IGFyZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHN0cm9rZSAoY29tcCkge1xuICAgICAgICBjb21wLl9pbXBsLnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGZpbGwgKGNvbXApIHtcbiAgICAgICAgY29tcC5faW1wbC5maWxsKCk7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge31cbn1cblxuQXNzZW1ibGVyLnJlZ2lzdGVyKEdyYXBoaWNzLCBDYW52YXNHcmFwaGljc0Fzc2VtYmxlcik7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==