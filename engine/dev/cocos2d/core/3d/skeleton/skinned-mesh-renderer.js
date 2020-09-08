
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/skinned-mesh-renderer.js';
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

 http://www.cocos.com

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
var SkinnedMeshRenderer = require('./CCSkinnedMeshRenderer');

var MeshRendererAssembler = require('../../mesh/mesh-renderer');

var RenderFlow = require('../../renderer/render-flow');

var SkinnedMeshRendererAssembler = /*#__PURE__*/function (_MeshRendererAssemble) {
  _inheritsLoose(SkinnedMeshRendererAssembler, _MeshRendererAssemble);

  function SkinnedMeshRendererAssembler() {
    return _MeshRendererAssemble.apply(this, arguments) || this;
  }

  var _proto = SkinnedMeshRendererAssembler.prototype;

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    comp.calcJointMatrix();

    _MeshRendererAssemble.prototype.fillBuffers.call(this, comp, renderer);
  };

  return SkinnedMeshRendererAssembler;
}(MeshRendererAssembler);

exports["default"] = SkinnedMeshRendererAssembler;
cc.Assembler.register(SkinnedMeshRenderer, SkinnedMeshRendererAssembler);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3NrZWxldG9uL3NraW5uZWQtbWVzaC1yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJTa2lubmVkTWVzaFJlbmRlcmVyIiwicmVxdWlyZSIsIk1lc2hSZW5kZXJlckFzc2VtYmxlciIsIlJlbmRlckZsb3ciLCJTa2lubmVkTWVzaFJlbmRlcmVyQXNzZW1ibGVyIiwiZmlsbEJ1ZmZlcnMiLCJjb21wIiwicmVuZGVyZXIiLCJjYWxjSm9pbnRNYXRyaXgiLCJjYyIsIkFzc2VtYmxlciIsInJlZ2lzdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLElBQU1BLG1CQUFtQixHQUFHQyxPQUFPLENBQUMseUJBQUQsQ0FBbkM7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUdELE9BQU8sQ0FBQywwQkFBRCxDQUFyQzs7QUFDQSxJQUFNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyw0QkFBRCxDQUExQjs7SUFFcUJHOzs7Ozs7Ozs7U0FDakJDLGNBQUEscUJBQWFDLElBQWIsRUFBbUJDLFFBQW5CLEVBQTZCO0FBQ3pCRCxJQUFBQSxJQUFJLENBQUNFLGVBQUw7O0FBQ0Esb0NBQU1ILFdBQU4sWUFBa0JDLElBQWxCLEVBQXdCQyxRQUF4QjtBQUNIOzs7RUFKcURMOzs7QUFPMURPLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhQyxRQUFiLENBQXNCWCxtQkFBdEIsRUFBMkNJLDRCQUEzQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zLmNvbVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgU2tpbm5lZE1lc2hSZW5kZXJlciA9IHJlcXVpcmUoJy4vQ0NTa2lubmVkTWVzaFJlbmRlcmVyJyk7XG5jb25zdCBNZXNoUmVuZGVyZXJBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8uLi9tZXNoL21lc2gtcmVuZGVyZXInKTtcbmNvbnN0IFJlbmRlckZsb3cgPSByZXF1aXJlKCcuLi8uLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTa2lubmVkTWVzaFJlbmRlcmVyQXNzZW1ibGVyIGV4dGVuZHMgTWVzaFJlbmRlcmVyQXNzZW1ibGVyIHtcbiAgICBmaWxsQnVmZmVycyAoY29tcCwgcmVuZGVyZXIpIHtcbiAgICAgICAgY29tcC5jYWxjSm9pbnRNYXRyaXgoKTtcbiAgICAgICAgc3VwZXIuZmlsbEJ1ZmZlcnMoY29tcCwgcmVuZGVyZXIpO1xuICAgIH1cbn1cblxuY2MuQXNzZW1ibGVyLnJlZ2lzdGVyKFNraW5uZWRNZXNoUmVuZGVyZXIsIFNraW5uZWRNZXNoUmVuZGVyZXJBc3NlbWJsZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=