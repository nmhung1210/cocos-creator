
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/2d/letter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
var js = require('../../../../../platform/js');

var WebglBmfontAssembler = require('./bmfont');

var LetterFontAssembler = require('../../../../utils/label/letter-font');

var WHITE = cc.color(255, 255, 255, 255);

var WebglLetterFontAssembler = /*#__PURE__*/function (_LetterFontAssembler) {
  _inheritsLoose(WebglLetterFontAssembler, _LetterFontAssembler);

  function WebglLetterFontAssembler() {
    return _LetterFontAssembler.apply(this, arguments) || this;
  }

  var _proto = WebglLetterFontAssembler.prototype;

  _proto.createData = function createData(comp) {
    return comp.requestRenderData();
  };

  _proto._getColor = function _getColor(comp) {
    WHITE._fastSetA(comp.node._color.a);

    return WHITE._val;
  };

  _proto.updateColor = function updateColor(comp) {
    var color = this._getColor(comp);

    _LetterFontAssembler.prototype.updateColor.call(this, comp, color);
  };

  return WebglLetterFontAssembler;
}(LetterFontAssembler);

exports["default"] = WebglLetterFontAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvbGFiZWwvMmQvbGV0dGVyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIldlYmdsQm1mb250QXNzZW1ibGVyIiwiTGV0dGVyRm9udEFzc2VtYmxlciIsIldISVRFIiwiY2MiLCJjb2xvciIsIldlYmdsTGV0dGVyRm9udEFzc2VtYmxlciIsImNyZWF0ZURhdGEiLCJjb21wIiwicmVxdWVzdFJlbmRlckRhdGEiLCJfZ2V0Q29sb3IiLCJfZmFzdFNldEEiLCJub2RlIiwiX2NvbG9yIiwiYSIsIl92YWwiLCJ1cGRhdGVDb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyw0QkFBRCxDQUFsQjs7QUFDQSxJQUFNQyxvQkFBb0IsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBcEM7O0FBQ0EsSUFBTUUsbUJBQW1CLEdBQUdGLE9BQU8sQ0FBQyxxQ0FBRCxDQUFuQzs7QUFDQSxJQUFNRyxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLENBQWQ7O0lBRXFCQzs7Ozs7Ozs7O1NBQ2pCQyxhQUFBLG9CQUFZQyxJQUFaLEVBQWtCO0FBQ2QsV0FBT0EsSUFBSSxDQUFDQyxpQkFBTCxFQUFQO0FBQ0g7O1NBRURDLFlBQUEsbUJBQVdGLElBQVgsRUFBaUI7QUFDYkwsSUFBQUEsS0FBSyxDQUFDUSxTQUFOLENBQWdCSCxJQUFJLENBQUNJLElBQUwsQ0FBVUMsTUFBVixDQUFpQkMsQ0FBakM7O0FBQ0EsV0FBT1gsS0FBSyxDQUFDWSxJQUFiO0FBQ0g7O1NBRURDLGNBQUEscUJBQWFSLElBQWIsRUFBbUI7QUFDZixRQUFJSCxLQUFLLEdBQUcsS0FBS0ssU0FBTCxDQUFlRixJQUFmLENBQVo7O0FBRUEsbUNBQU1RLFdBQU4sWUFBa0JSLElBQWxCLEVBQXdCSCxLQUF4QjtBQUNIOzs7RUFkaURIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QganMgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi8uLi9wbGF0Zm9ybS9qcycpO1xuY29uc3QgV2ViZ2xCbWZvbnRBc3NlbWJsZXIgPSByZXF1aXJlKCcuL2JtZm9udCcpO1xuY29uc3QgTGV0dGVyRm9udEFzc2VtYmxlciA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3V0aWxzL2xhYmVsL2xldHRlci1mb250Jyk7XG5jb25zdCBXSElURSA9IGNjLmNvbG9yKDI1NSwgMjU1LCAyNTUsIDI1NSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYmdsTGV0dGVyRm9udEFzc2VtYmxlciBleHRlbmRzIExldHRlckZvbnRBc3NlbWJsZXIge1xuICAgIGNyZWF0ZURhdGEgKGNvbXApIHtcbiAgICAgICAgcmV0dXJuIGNvbXAucmVxdWVzdFJlbmRlckRhdGEoKTtcbiAgICB9XG5cbiAgICBfZ2V0Q29sb3IgKGNvbXApIHtcbiAgICAgICAgV0hJVEUuX2Zhc3RTZXRBKGNvbXAubm9kZS5fY29sb3IuYSk7XG4gICAgICAgIHJldHVybiBXSElURS5fdmFsO1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbG9yIChjb21wKSB7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuX2dldENvbG9yKGNvbXApO1xuXG4gICAgICAgIHN1cGVyLnVwZGF0ZUNvbG9yKGNvbXAsIGNvbG9yKTtcbiAgICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiLyJ9