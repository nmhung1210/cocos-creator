
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/mask.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _assembler = _interopRequireDefault(require("../../assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
var Mask = require('../../../components/CCMask');

var graphicsHandler = require('./graphics');

var CanvasMaskAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(CanvasMaskAssembler, _Assembler);

  function CanvasMaskAssembler() {
    return _Assembler.apply(this, arguments) || this;
  }

  var _proto = CanvasMaskAssembler.prototype;

  _proto.draw = function draw(ctx, mask) {
    ctx.save(); // draw stencil

    mask._graphics._assembler.draw(ctx, mask._graphics);

    ctx.clip();
  };

  _proto.postDraw = function postDraw(ctx, mask) {
    ctx.restore();
  };

  return CanvasMaskAssembler;
}(_assembler["default"]);

exports["default"] = CanvasMaskAssembler;

_assembler["default"].register(Mask, CanvasMaskAssembler);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvbWFzay5qcyJdLCJuYW1lcyI6WyJNYXNrIiwicmVxdWlyZSIsImdyYXBoaWNzSGFuZGxlciIsIkNhbnZhc01hc2tBc3NlbWJsZXIiLCJkcmF3IiwiY3R4IiwibWFzayIsInNhdmUiLCJfZ3JhcGhpY3MiLCJfYXNzZW1ibGVyIiwiY2xpcCIsInBvc3REcmF3IiwicmVzdG9yZSIsIkFzc2VtYmxlciIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7Ozs7QUEzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyw0QkFBRCxDQUFwQjs7QUFDQSxJQUFNQyxlQUFlLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQS9COztJQUdxQkU7Ozs7Ozs7OztTQUNqQkMsT0FBQSxjQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBaUI7QUFDYkQsSUFBQUEsR0FBRyxDQUFDRSxJQUFKLEdBRGEsQ0FHYjs7QUFDQUQsSUFBQUEsSUFBSSxDQUFDRSxTQUFMLENBQWVDLFVBQWYsQ0FBMEJMLElBQTFCLENBQStCQyxHQUEvQixFQUFvQ0MsSUFBSSxDQUFDRSxTQUF6Qzs7QUFFQUgsSUFBQUEsR0FBRyxDQUFDSyxJQUFKO0FBQ0g7O1NBRURDLFdBQUEsa0JBQVVOLEdBQVYsRUFBZUMsSUFBZixFQUFxQjtBQUNqQkQsSUFBQUEsR0FBRyxDQUFDTyxPQUFKO0FBQ0g7OztFQVo0Q0M7Ozs7QUFlakRBLHNCQUFVQyxRQUFWLENBQW1CZCxJQUFuQixFQUF5QkcsbUJBQXpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IE1hc2sgPSByZXF1aXJlKCcuLi8uLi8uLi9jb21wb25lbnRzL0NDTWFzaycpO1xuY29uc3QgZ3JhcGhpY3NIYW5kbGVyID0gcmVxdWlyZSgnLi9ncmFwaGljcycpO1xuaW1wb3J0IEFzc2VtYmxlciBmcm9tICcuLi8uLi9hc3NlbWJsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNNYXNrQXNzZW1ibGVyIGV4dGVuZHMgQXNzZW1ibGVyIHtcbiAgICBkcmF3IChjdHgsIG1hc2spIHtcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICAvLyBkcmF3IHN0ZW5jaWxcbiAgICAgICAgbWFzay5fZ3JhcGhpY3MuX2Fzc2VtYmxlci5kcmF3KGN0eCwgbWFzay5fZ3JhcGhpY3MpO1xuXG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgfVxuXG4gICAgcG9zdERyYXcgKGN0eCwgbWFzaykge1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH1cbn1cblxuQXNzZW1ibGVyLnJlZ2lzdGVyKE1hc2ssIENhbnZhc01hc2tBc3NlbWJsZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=