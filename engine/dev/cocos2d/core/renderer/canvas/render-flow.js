
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/render-flow.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _renderFlow = _interopRequireDefault(require("../render-flow"));

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
_renderFlow["default"].prototype._draw = function (node, func) {
  var batcher = _renderFlow["default"].getBachther();

  var ctx = batcher._device._ctx;
  var cam = batcher._camera;
  ctx.setTransform(cam.a, cam.b, cam.c, cam.d, cam.tx, cam.ty);
  ctx.scale(1, -1);
  var comp = node._renderComponent;

  comp._assembler[func](ctx, comp);

  this._next._func(node);
};

_renderFlow["default"].prototype._render = function (node) {
  this._draw(node, 'draw');
};

_renderFlow["default"].prototype._postRender = function (node) {
  this._draw(node, 'postDraw');
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXItZmxvdy5qcyJdLCJuYW1lcyI6WyJSZW5kZXJGbG93IiwicHJvdG90eXBlIiwiX2RyYXciLCJub2RlIiwiZnVuYyIsImJhdGNoZXIiLCJnZXRCYWNodGhlciIsImN0eCIsIl9kZXZpY2UiLCJfY3R4IiwiY2FtIiwiX2NhbWVyYSIsInNldFRyYW5zZm9ybSIsImEiLCJiIiwiYyIsImQiLCJ0eCIsInR5Iiwic2NhbGUiLCJjb21wIiwiX3JlbmRlckNvbXBvbmVudCIsIl9hc3NlbWJsZXIiLCJfbmV4dCIsIl9mdW5jIiwiX3JlbmRlciIsIl9wb3N0UmVuZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBeUJBOzs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkFBLHVCQUFXQyxTQUFYLENBQXFCQyxLQUFyQixHQUE2QixVQUFVQyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUMvQyxNQUFJQyxPQUFPLEdBQUdMLHVCQUFXTSxXQUFYLEVBQWQ7O0FBQ0EsTUFBSUMsR0FBRyxHQUFHRixPQUFPLENBQUNHLE9BQVIsQ0FBZ0JDLElBQTFCO0FBQ0EsTUFBSUMsR0FBRyxHQUFHTCxPQUFPLENBQUNNLE9BQWxCO0FBQ0FKLEVBQUFBLEdBQUcsQ0FBQ0ssWUFBSixDQUFpQkYsR0FBRyxDQUFDRyxDQUFyQixFQUF3QkgsR0FBRyxDQUFDSSxDQUE1QixFQUErQkosR0FBRyxDQUFDSyxDQUFuQyxFQUFzQ0wsR0FBRyxDQUFDTSxDQUExQyxFQUE2Q04sR0FBRyxDQUFDTyxFQUFqRCxFQUFxRFAsR0FBRyxDQUFDUSxFQUF6RDtBQUNBWCxFQUFBQSxHQUFHLENBQUNZLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQyxDQUFkO0FBRUEsTUFBSUMsSUFBSSxHQUFHakIsSUFBSSxDQUFDa0IsZ0JBQWhCOztBQUNBRCxFQUFBQSxJQUFJLENBQUNFLFVBQUwsQ0FBZ0JsQixJQUFoQixFQUFzQkcsR0FBdEIsRUFBMkJhLElBQTNCOztBQUNBLE9BQUtHLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQnJCLElBQWpCO0FBQ0gsQ0FWRDs7QUFZQUgsdUJBQVdDLFNBQVgsQ0FBcUJ3QixPQUFyQixHQUErQixVQUFVdEIsSUFBVixFQUFnQjtBQUMzQyxPQUFLRCxLQUFMLENBQVdDLElBQVgsRUFBaUIsTUFBakI7QUFDSCxDQUZEOztBQUlBSCx1QkFBV0MsU0FBWCxDQUFxQnlCLFdBQXJCLEdBQW1DLFVBQVV2QixJQUFWLEVBQWdCO0FBQy9DLE9BQUtELEtBQUwsQ0FBV0MsSUFBWCxFQUFpQixVQUFqQjtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgUmVuZGVyRmxvdyBmcm9tICcuLi9yZW5kZXItZmxvdyc7XG5cblJlbmRlckZsb3cucHJvdG90eXBlLl9kcmF3ID0gZnVuY3Rpb24gKG5vZGUsIGZ1bmMpIHtcbiAgICBsZXQgYmF0Y2hlciA9IFJlbmRlckZsb3cuZ2V0QmFjaHRoZXIoKTtcbiAgICBsZXQgY3R4ID0gYmF0Y2hlci5fZGV2aWNlLl9jdHg7XG4gICAgbGV0IGNhbSA9IGJhdGNoZXIuX2NhbWVyYTtcbiAgICBjdHguc2V0VHJhbnNmb3JtKGNhbS5hLCBjYW0uYiwgY2FtLmMsIGNhbS5kLCBjYW0udHgsIGNhbS50eSk7XG4gICAgY3R4LnNjYWxlKDEsIC0xKTtcblxuICAgIGxldCBjb21wID0gbm9kZS5fcmVuZGVyQ29tcG9uZW50O1xuICAgIGNvbXAuX2Fzc2VtYmxlcltmdW5jXShjdHgsIGNvbXApO1xuICAgIHRoaXMuX25leHQuX2Z1bmMobm9kZSk7XG59XG5cblJlbmRlckZsb3cucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHRoaXMuX2RyYXcobm9kZSwgJ2RyYXcnKTtcbn1cblxuUmVuZGVyRmxvdy5wcm90b3R5cGUuX3Bvc3RSZW5kZXIgPSBmdW5jdGlvbiAobm9kZSkge1xuICAgIHRoaXMuX2RyYXcobm9kZSwgJ3Bvc3REcmF3Jyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==