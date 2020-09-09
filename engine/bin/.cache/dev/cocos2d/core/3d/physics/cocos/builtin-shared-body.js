
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/builtin-shared-body.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinSharedBody = void 0;

var _util = require("../framework/util");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var intersect = cc.geomUtils.intersect;
var fastRemove = cc.js.array.fastRemove;
/**
 * Built-in static collider, no physical forces involved
 */

var BuiltinSharedBody = /*#__PURE__*/function () {
  BuiltinSharedBody.getSharedBody = function getSharedBody(node, wrappedWorld) {
    var key = node._id;

    if (BuiltinSharedBody.sharedBodiesMap.has(key)) {
      return BuiltinSharedBody.sharedBodiesMap.get(key);
    } else {
      var newSB = new BuiltinSharedBody(node, wrappedWorld);
      BuiltinSharedBody.sharedBodiesMap.set(node._id, newSB);
      return newSB;
    }
  };

  _createClass(BuiltinSharedBody, [{
    key: "id",
    get: function get() {
      return this._id;
    }
    /**
     * add or remove from world \
     * add, if enable \
     * remove, if disable & shapes.length == 0 & wrappedBody disable
     */

  }, {
    key: "enabled",
    set: function set(v) {
      if (v) {
        if (this.index < 0) {
          this.index = this.world.bodies.length;
          this.world.addSharedBody(this);
          this.syncSceneToPhysics(true);
        }
      } else {
        if (this.index >= 0) {
          var isRemove = this.shapes.length == 0;

          if (isRemove) {
            this.index = -1;
            this.world.removeSharedBody(this);
          }
        }
      }
    }
  }, {
    key: "reference",
    set: function set(v) {
      v ? this.ref++ : this.ref--;

      if (this.ref == 0) {
        this.destory();
      }
    }
    /** id generator */

  }]);

  function BuiltinSharedBody(node, world) {
    this._id = void 0;
    this.index = -1;
    this.ref = 0;
    this.node = void 0;
    this.world = void 0;
    this.shapes = [];
    this._id = BuiltinSharedBody.idCounter++;
    this.node = node;
    this.world = world;
  }

  var _proto = BuiltinSharedBody.prototype;

  _proto.intersects = function intersects(body) {
    for (var i = 0; i < this.shapes.length; i++) {
      var shapeA = this.shapes[i];

      for (var j = 0; j < body.shapes.length; j++) {
        var shapeB = body.shapes[j];

        if (intersect.resolve(shapeA.worldShape, shapeB.worldShape)) {
          this.world.shapeArr.push(shapeA);
          this.world.shapeArr.push(shapeB);
        }
      }
    }
  };

  _proto.addShape = function addShape(shape) {
    var i = this.shapes.indexOf(shape);

    if (i < 0) {
      this.shapes.push(shape);
    }
  };

  _proto.removeShape = function removeShape(shape) {
    fastRemove(this.shapes, shape);
  };

  _proto.syncSceneToPhysics = function syncSceneToPhysics(force) {
    if (force === void 0) {
      force = false;
    }

    var node = this.node;
    var needUpdateTransform = (0, _util.updateWorldTransform)(node, force);
    if (!force && !needUpdateTransform) return;

    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].transform(node._worldMatrix, node.__wpos, node.__wrot, node.__wscale);
    }
  };

  _proto.destory = function destory() {
    BuiltinSharedBody.sharedBodiesMap["delete"](this.node._id);
    this.node = null;
    this.world = null;
    this.shapes = null;
  };

  return BuiltinSharedBody;
}();

exports.BuiltinSharedBody = BuiltinSharedBody;
BuiltinSharedBody.sharedBodiesMap = new Map();
BuiltinSharedBody.idCounter = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY29jb3MvYnVpbHRpbi1zaGFyZWQtYm9keS50cyJdLCJuYW1lcyI6WyJpbnRlcnNlY3QiLCJjYyIsImdlb21VdGlscyIsImZhc3RSZW1vdmUiLCJqcyIsImFycmF5IiwiQnVpbHRpblNoYXJlZEJvZHkiLCJnZXRTaGFyZWRCb2R5Iiwibm9kZSIsIndyYXBwZWRXb3JsZCIsImtleSIsIl9pZCIsInNoYXJlZEJvZGllc01hcCIsImhhcyIsImdldCIsIm5ld1NCIiwic2V0IiwidiIsImluZGV4Iiwid29ybGQiLCJib2RpZXMiLCJsZW5ndGgiLCJhZGRTaGFyZWRCb2R5Iiwic3luY1NjZW5lVG9QaHlzaWNzIiwiaXNSZW1vdmUiLCJzaGFwZXMiLCJyZW1vdmVTaGFyZWRCb2R5IiwicmVmIiwiZGVzdG9yeSIsImlkQ291bnRlciIsImludGVyc2VjdHMiLCJib2R5IiwiaSIsInNoYXBlQSIsImoiLCJzaGFwZUIiLCJyZXNvbHZlIiwid29ybGRTaGFwZSIsInNoYXBlQXJyIiwicHVzaCIsImFkZFNoYXBlIiwic2hhcGUiLCJpbmRleE9mIiwicmVtb3ZlU2hhcGUiLCJmb3JjZSIsIm5lZWRVcGRhdGVUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJfd29ybGRNYXRyaXgiLCJfX3dwb3MiLCJfX3dyb3QiLCJfX3dzY2FsZSIsIk1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHQyxFQUFFLENBQUNDLFNBQUgsQ0FBYUYsU0FBL0I7QUFDQSxJQUFNRyxVQUFVLEdBQUdGLEVBQUUsQ0FBQ0csRUFBSCxDQUFNQyxLQUFOLENBQVlGLFVBQS9CO0FBRUE7Ozs7SUFHYUc7b0JBSUZDLGdCQUFQLHVCQUFzQkMsSUFBdEIsRUFBcUNDLFlBQXJDLEVBQWlFO0FBQzdELFFBQU1DLEdBQUcsR0FBR0YsSUFBSSxDQUFDRyxHQUFqQjs7QUFDQSxRQUFJTCxpQkFB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ZU0sa0JBQWtCLElBQUl1QyxHQUFKO0FBRmpDN0Msa0JBZ0RNdUIsWUFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7IEJ1aWx0SW5Xb3JsZCB9IGZyb20gJy4vYnVpbHRpbi13b3JsZCc7XG5pbXBvcnQgeyBCdWlsdGluU2hhcGUgfSBmcm9tICcuL3NoYXBlcy9idWlsdGluLXNoYXBlJztcbmltcG9ydCB7IHVwZGF0ZVdvcmxkVHJhbnNmb3JtIH0gZnJvbSBcIi4uL2ZyYW1ld29yay91dGlsXCJcblxuY29uc3QgaW50ZXJzZWN0ID0gY2MuZ2VvbVV0aWxzLmludGVyc2VjdDtcbmNvbnN0IGZhc3RSZW1vdmUgPSBjYy5qcy5hcnJheS5mYXN0UmVtb3ZlO1xuXG4vKipcbiAqIEJ1aWx0LWluIHN0YXRpYyBjb2xsaWRlciwgbm8gcGh5c2ljYWwgZm9yY2VzIGludm9sdmVkXG4gKi9cbmV4cG9ydCBjbGFzcyBCdWlsdGluU2hhcmVkQm9keSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzaGFyZWRCb2RpZXNNYXAgPSBuZXcgTWFwPHN0cmluZywgQnVpbHRpblNoYXJlZEJvZHk+KCk7XG5cbiAgICBzdGF0aWMgZ2V0U2hhcmVkQm9keSAobm9kZTogY2MuTm9kZSwgd3JhcHBlZFdvcmxkOiBCdWlsdEluV29ybGQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gbm9kZS5faWQ7XG4gICAgICAgIGlmIChCdWlsdGluU2hhcmVkQm9keS5zaGFyZWRCb2RpZXNNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBCdWlsdGluU2hhcmVkQm9keS5zaGFyZWRCb2RpZXNNYXAuZ2V0KGtleSkhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgbmV3U0IgPSBuZXcgQnVpbHRpblNoYXJlZEJvZHkobm9kZSwgd3JhcHBlZFdvcmxkKTtcbiAgICAgICAgICAgIEJ1aWx0aW5TaGFyZWRCb2R5LnNoYXJlZEJvZGllc01hcC5zZXQobm9kZS5faWQsIG5ld1NCKTtcbiAgICAgICAgICAgIHJldHVybiBuZXdTQjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpZCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhZGQgb3IgcmVtb3ZlIGZyb20gd29ybGQgXFxcbiAgICAgKiBhZGQsIGlmIGVuYWJsZSBcXFxuICAgICAqIHJlbW92ZSwgaWYgZGlzYWJsZSAmIHNoYXBlcy5sZW5ndGggPT0gMCAmIHdyYXBwZWRCb2R5IGRpc2FibGVcbiAgICAgKi9cbiAgICBzZXQgZW5hYmxlZCAodjogYm9vbGVhbikge1xuICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMud29ybGQuYm9kaWVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkLmFkZFNoYXJlZEJvZHkodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jU2NlbmVUb1BoeXNpY3ModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNSZW1vdmUgPSAodGhpcy5zaGFwZXMubGVuZ3RoID09IDApO1xuICAgICAgICAgICAgICAgIGlmIChpc1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQucmVtb3ZlU2hhcmVkQm9keSh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgcmVmZXJlbmNlICh2OiBib29sZWFuKSB7XG4gICAgICAgIHYgPyB0aGlzLnJlZisrIDogdGhpcy5yZWYtLTtcbiAgICAgICAgaWYgKHRoaXMucmVmID09IDApIHsgdGhpcy5kZXN0b3J5KCk7IH1cbiAgICB9XG5cbiAgICAvKiogaWQgZ2VuZXJhdG9yICovXG4gICAgcHJpdmF0ZSBzdGF0aWMgaWRDb3VudGVyOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2lkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyID0gLTE7XG4gICAgcHJpdmF0ZSByZWY6IG51bWJlciA9IDA7XG5cbiAgICByZWFkb25seSBub2RlOiBjYy5Ob2RlO1xuICAgIHJlYWRvbmx5IHdvcmxkOiBCdWlsdEluV29ybGQ7XG4gICAgcmVhZG9ubHkgc2hhcGVzOiBCdWlsdGluU2hhcGVbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvciAobm9kZTogY2MuTm9kZSwgd29ybGQ6IEJ1aWx0SW5Xb3JsZCkge1xuICAgICAgICB0aGlzLl9pZCA9IEJ1aWx0aW5TaGFyZWRCb2R5LmlkQ291bnRlcisrO1xuICAgICAgICB0aGlzLm5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLndvcmxkID0gd29ybGQ7XG4gICAgfVxuXG4gICAgaW50ZXJzZWN0cyAoYm9keTogQnVpbHRpblNoYXJlZEJvZHkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgc2hhcGVBID0gdGhpcy5zaGFwZXNbaV07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYm9keS5zaGFwZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFwZUIgPSBib2R5LnNoYXBlc1tqXTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnRlcnNlY3QucmVzb2x2ZShzaGFwZUEud29ybGRTaGFwZSwgc2hhcGVCLndvcmxkU2hhcGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud29ybGQuc2hhcGVBcnIucHVzaChzaGFwZUEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndvcmxkLnNoYXBlQXJyLnB1c2goc2hhcGVCKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRTaGFwZSAoc2hhcGU6IEJ1aWx0aW5TaGFwZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBpID0gdGhpcy5zaGFwZXMuaW5kZXhPZihzaGFwZSk7XG4gICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5zaGFwZXMucHVzaChzaGFwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVTaGFwZSAoc2hhcGU6IEJ1aWx0aW5TaGFwZSk6IHZvaWQge1xuICAgICAgICBmYXN0UmVtb3ZlKHRoaXMuc2hhcGVzLCBzaGFwZSk7XG4gICAgfVxuXG4gICAgc3luY1NjZW5lVG9QaHlzaWNzIChmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgICBsZXQgbmVlZFVwZGF0ZVRyYW5zZm9ybSA9IHVwZGF0ZVdvcmxkVHJhbnNmb3JtKG5vZGUsIGZvcmNlKTtcbiAgICAgICAgaWYgKCFmb3JjZSAmJiAhbmVlZFVwZGF0ZVRyYW5zZm9ybSkgcmV0dXJuOyAgICAgICAgXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoYXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5zaGFwZXNbaV0udHJhbnNmb3JtKG5vZGUuX3dvcmxkTWF0cml4LCBub2RlLl9fd3Bvcywgbm9kZS5fX3dyb3QsIG5vZGUuX193c2NhbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0b3J5ICgpIHtcbiAgICAgICAgQnVpbHRpblNoYXJlZEJvZHkuc2hhcmVkQm9kaWVzTWFwLmRlbGV0ZSh0aGlzLm5vZGUuX2lkKTtcbiAgICAgICAgKHRoaXMubm9kZSBhcyBhbnkpID0gbnVsbDtcbiAgICAgICAgKHRoaXMud29ybGQgYXMgYW55KSA9IG51bGw7XG4gICAgICAgICh0aGlzLnNoYXBlcyBhcyBhbnkpID0gbnVsbDtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==