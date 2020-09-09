
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinShape = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var Vec3 = cc.Vec3;

var BuiltinShape = /*#__PURE__*/function () {
  function BuiltinShape() {
    this.id = BuiltinShape.idCounter++;
    this._sharedBody = void 0;
    this._collider = void 0;
    this._localShape = void 0;
    this._worldShape = void 0;
  }

  var _proto = BuiltinShape.prototype;

  _proto.__preload = function __preload(comp) {
    this._collider = comp;
    this._sharedBody = cc.director.getPhysics3DManager().physicsWorld.getSharedBody(this._collider.node);
    this._sharedBody.reference = true;
  };

  _proto.onLoad = function onLoad() {
    this.center = this._collider.center;
  };

  _proto.onEnable = function onEnable() {
    this._sharedBody.addShape(this);

    this._sharedBody.enabled = true;
  };

  _proto.onDisable = function onDisable() {
    this._sharedBody.removeShape(this);

    this._sharedBody.enabled = false;
  };

  _proto.onDestroy = function onDestroy() {
    this._sharedBody.reference = false;
    this._collider = null;
    this._localShape = null;
    this._worldShape = null;
  };

  _proto.transform = function transform(m, pos, rot, scale) {
    this._localShape.transform(m, pos, rot, scale, this._worldShape);
  };

  _createClass(BuiltinShape, [{
    key: "material",
    set: function set(v) {}
  }, {
    key: "isTrigger",
    set: function set(v) {}
  }, {
    key: "attachedRigidBody",
    get: function get() {
      return null;
    }
  }, {
    key: "center",
    set: function set(v) {
      Vec3.copy(this._localShape.center, v);
    }
  }, {
    key: "localShape",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "worldShape",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "sharedBody",
    get: function get() {
      return this._sharedBody;
    }
  }, {
    key: "collider",
    get: function get() {
      return this._collider;
    }
    /** id generator */

  }]);

  return BuiltinShape;
}();

exports.BuiltinShape = BuiltinShape;
BuiltinShape.idCounter = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY29jb3Mvc2hhcGVzL2J1aWx0aW4tc2hhcGUudHMiXSwibmFtZXMiOlsiVmVjMyIsImNjIiwiQnVpbHRpblNoYXBlIiwiaWQiLCJpZENvdW50ZXIiLCJfc2hhcmVkQm9keSIsIl9jb2xsaWRlciIsIl9sb2NhbFNoYXBlIiwiX3dvcmxkU2hhcGUiLCJfX3ByZWxvYWQiLCJjb21wIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzM0RNYW5hZ2VyIiwicGh5c2ljc1dvcmxkIiwiZ2V0U2hhcmVkQm9keSIsIm5vZGUiLCJyZWZlcmVuY2UiLCJvbkxvYWQiLCJjZW50ZXIiLCJvbkVuYWJsZSIsImFkZFNoYXBlIiwiZW5hYmxlZCIsIm9uRGlzYWJsZSIsInJlbW92ZVNoYXBlIiwib25EZXN0cm95IiwidHJhbnNmb3JtIiwibSIsInBvcyIsInJvdCIsInNjYWxlIiwidiIsImNvcHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxJQUFNQSxJQUFJLEdBQUdDLEVBQUUsQ0FBQ0QsSUFBaEI7O0lBRWFFOztTQTJCQUMsS0FBYUQsWUFBWSxDQUFDRSxTQUFiO1NBRVpDO1NBQ0FDO1NBQ0FDO1NBQ0FDOzs7OztTQUVWQyxZQUFBLG1CQUFXQyxJQUFYLEVBQTZCO0FBQ3pCLFNBQUtKLFNBQUwsR0FBaUJJLElBQWpCO0FBQ0EsU0FBS0wsV0FBTCxHQUFvQkosRUFBRSxDQUFDVSxRQUFILENBQVlDLG1CQUFaLEdBQWtDQyxZQUFuQyxDQUFpRUMsYUFBakUsQ0FBK0UsS0FBS1IsU0FBTCxDQUFlUyxJQUE5RixDQUFuQjtBQUNBLFNBQUtWLFdBQUwsQ0FBaUJXLFNBQWpCLEdBQTZCLElBQTdCO0FBQ0g7O1NBRURDLFNBQUEsa0JBQVU7QUFDTixTQUFLQyxNQUFMLEdBQWMsS0FBS1osU0FBTCxDQUFlWSxNQUE3QjtBQUNIOztTQUVEQyxXQUFBLG9CQUFZO0FBQ1IsU0FBS2QsV0FBTCxDQUFpQmUsUUFBakIsQ0FBMEIsSUFBMUI7O0FBQ0EsU0FBS2YsV0FBTCxDQUFpQmdCLE9BQWpCLEdBQTJCLElBQTNCO0FBQ0g7O1NBRURDLFlBQUEscUJBQWE7QUFDVCxTQUFLakIsV0FBTCxDQUFpQmtCLFdBQWpCLENBQTZCLElBQTdCOztBQUNBLFNBQUtsQixXQUFMLENBQWlCZ0IsT0FBakIsR0FBMkIsS0FBM0I7QUFDSDs7U0FFREcsWUFBQSxxQkFBYTtBQUNULFNBQUtuQixXQUFMLENBQWlCVyxTQUFqQixHQUE2QixLQUE3QjtBQUNDLFNBQUtWLFNBQU4sR0FBMEIsSUFBMUI7QUFDQyxTQUFLQyxXQUFOLEdBQTRCLElBQTVCO0FBQ0MsU0FBS0MsV0FBTixHQUE0QixJQUE1QjtBQUNIOztTQUVEaUIsWUFBQSxtQkFBV0MsQ0FBWCxFQUF1QkMsR0FBdkIsRUFBcUNDLEdBQXJDLEVBQW1EQyxLQUFuRCxFQUFtRTtBQUMvRCxTQUFLdEIsV0FBTCxDQUFpQmtCLFNBQWpCLENBQTJCQyxDQUEzQixFQUE4QkMsR0FBOUIsRUFBbUNDLEdBQW5DLEVBQXdDQyxLQUF4QyxFQUErQyxLQUFLckIsV0FBcEQ7QUFDSDs7OztzQkE5RGFzQixHQUFvQixDQUFHOzs7c0JBQ3RCQSxHQUFZLENBQUc7Ozt3QkFDZTtBQUFFLGFBQU8sSUFBUDtBQUFjOzs7c0JBRWpEQSxHQUFjO0FBQ3RCOUIsTUFBQUEsSUFBSSxDQUFDK0IsSUFBTCxDQUFVLEtBQUt4QixXQUFMLENBQWlCVyxNQUEzQixFQUFtQ1ksQ0FBbkM7QUFDSDs7O3dCQUVpQjtBQUNkLGFBQU8sS0FBS3RCLFdBQVo7QUFDSDs7O3dCQUVpQjtBQUNkLGFBQU8sS0FBS0EsV0FBWjtBQUNIOzs7d0JBRWlCO0FBQ2QsYUFBTyxLQUFLSCxXQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsU0FBWjtBQUNIO0FBRUQ7Ozs7Ozs7O0FBekJTSixhQTBCTUUsWUFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHsgQnVpbHRpblNoYXJlZEJvZHkgfSBmcm9tICcuLi9idWlsdGluLXNoYXJlZC1ib2R5JztcbmltcG9ydCB7IElCdWlsdGluU2hhcGUgfSBmcm9tICcuLi9idWlsdGluLWludGVyZmFjZSc7XG5pbXBvcnQgeyBDb2xsaWRlcjNELCBQaHlzaWNzTWF0ZXJpYWwsIFJpZ2lkQm9keTNEIH0gZnJvbSAnLi4vLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XG5pbXBvcnQgeyBJQmFzZVNoYXBlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLXBoeXNpY3Mtc2hhcGUnO1xuaW1wb3J0IHsgSVZlYzNMaWtlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLWNvbW1vbic7XG5pbXBvcnQgeyBCdWlsdEluV29ybGQgfSBmcm9tICcuLi9idWlsdGluLXdvcmxkJztcblxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5cbmV4cG9ydCBjbGFzcyBCdWlsdGluU2hhcGUgaW1wbGVtZW50cyBJQmFzZVNoYXBlIHtcbiAgICBzZXQgbWF0ZXJpYWwgKHY6IFBoeXNpY3NNYXRlcmlhbCkgeyB9XG4gICAgc2V0IGlzVHJpZ2dlciAodjogYm9vbGVhbikgeyB9XG4gICAgZ2V0IGF0dGFjaGVkUmlnaWRCb2R5ICgpOiBSaWdpZEJvZHkzRCB8IG51bGwgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgc2V0IGNlbnRlciAodjogSVZlYzNMaWtlKSB7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9sb2NhbFNoYXBlLmNlbnRlciwgdik7XG4gICAgfVxuXG4gICAgZ2V0IGxvY2FsU2hhcGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd29ybGRTaGFwZTtcbiAgICB9XG5cbiAgICBnZXQgd29ybGRTaGFwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZFNoYXBlO1xuICAgIH1cblxuICAgIGdldCBzaGFyZWRCb2R5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXJlZEJvZHk7XG4gICAgfVxuXG4gICAgZ2V0IGNvbGxpZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxpZGVyO1xuICAgIH1cblxuICAgIC8qKiBpZCBnZW5lcmF0b3IgKi9cbiAgICBwcml2YXRlIHN0YXRpYyBpZENvdW50ZXI6IG51bWJlciA9IDA7XG4gICAgcmVhZG9ubHkgaWQ6IG51bWJlciA9IEJ1aWx0aW5TaGFwZS5pZENvdW50ZXIrKzs7XG5cbiAgICBwcm90ZWN0ZWQgX3NoYXJlZEJvZHkhOiBCdWlsdGluU2hhcmVkQm9keTtcbiAgICBwcm90ZWN0ZWQgX2NvbGxpZGVyITogQ29sbGlkZXIzRDtcbiAgICBwcm90ZWN0ZWQgX2xvY2FsU2hhcGUhOiBJQnVpbHRpblNoYXBlO1xuICAgIHByb3RlY3RlZCBfd29ybGRTaGFwZSE6IElCdWlsdGluU2hhcGU7XG5cbiAgICBfX3ByZWxvYWQgKGNvbXA6IENvbGxpZGVyM0QpIHtcbiAgICAgICAgdGhpcy5fY29sbGlkZXIgPSBjb21wO1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5ID0gKGNjLmRpcmVjdG9yLmdldFBoeXNpY3MzRE1hbmFnZXIoKS5waHlzaWNzV29ybGQgYXMgQnVpbHRJbldvcmxkKS5nZXRTaGFyZWRCb2R5KHRoaXMuX2NvbGxpZGVyLm5vZGUpO1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LnJlZmVyZW5jZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5jZW50ZXIgPSB0aGlzLl9jb2xsaWRlci5jZW50ZXI7XG4gICAgfVxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LmFkZFNoYXBlKHRoaXMpO1xuICAgICAgICB0aGlzLl9zaGFyZWRCb2R5LmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uRGlzYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVtb3ZlU2hhcGUodGhpcyk7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIHRoaXMuX3NoYXJlZEJvZHkucmVmZXJlbmNlID0gZmFsc2U7XG4gICAgICAgICh0aGlzLl9jb2xsaWRlciBhcyBhbnkpID0gbnVsbDtcbiAgICAgICAgKHRoaXMuX2xvY2FsU2hhcGUgYXMgYW55KSA9IG51bGw7XG4gICAgICAgICh0aGlzLl93b3JsZFNoYXBlIGFzIGFueSkgPSBudWxsO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybSAobTogY2MuTWF0NCwgcG9zOiBjYy5WZWMzLCByb3Q6IGNjLlF1YXQsIHNjYWxlOiBjYy5WZWMzKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsU2hhcGUudHJhbnNmb3JtKG0sIHBvcywgcm90LCBzY2FsZSwgdGhpcy5fd29ybGRTaGFwZSk7XG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==