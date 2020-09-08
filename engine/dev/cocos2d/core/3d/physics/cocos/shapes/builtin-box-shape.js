
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-box-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinBoxShape = void 0;

var _builtinShape = require("./builtin-shape");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Obb = cc.geomUtils.Obb;
var Vec3 = cc.Vec3;

var _worldScale = new Vec3();

var BuiltinBoxShape = /*#__PURE__*/function (_BuiltinShape) {
  _inheritsLoose(BuiltinBoxShape, _BuiltinShape);

  _createClass(BuiltinBoxShape, [{
    key: "localObb",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldObb",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "boxCollider",
    get: function get() {
      return this.collider;
    }
  }]);

  function BuiltinBoxShape(size) {
    var _this;

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new Obb();
    _this._worldShape = new Obb();
    Vec3.multiplyScalar(_this.localObb.halfExtents, size, 0.5);
    Vec3.copy(_this.worldObb.halfExtents, _this.localObb.halfExtents);
    return _this;
  }

  var _proto = BuiltinBoxShape.prototype;

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.size = this.boxCollider.size;
  };

  _createClass(BuiltinBoxShape, [{
    key: "size",
    set: function set(size) {
      Vec3.multiplyScalar(this.localObb.halfExtents, size, 0.5);
      this.collider.node.getWorldScale(_worldScale);
      Vec3.multiply(this.worldObb.halfExtents, this.localObb.halfExtents, _worldScale);
    }
  }]);

  return BuiltinBoxShape;
}(_builtinShape.BuiltinShape);

exports.BuiltinBoxShape = BuiltinBoxShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY29jb3Mvc2hhcGVzL2J1aWx0aW4tYm94LXNoYXBlLnRzIl0sIm5hbWVzIjpbIk9iYiIsImNjIiwiZ2VvbVV0aWxzIiwiVmVjMyIsIl93b3JsZFNjYWxlIiwiQnVpbHRpbkJveFNoYXBlIiwiX2xvY2FsU2hhcGUiLCJfd29ybGRTaGFwZSIsImNvbGxpZGVyIiwic2l6ZSIsIm11bHRpcGx5U2NhbGFyIiwibG9jYWxPYmIiLCJoYWxmRXh0ZW50cyIsImNvcHkiLCJ3b3JsZE9iYiIsIm9uTG9hZCIsImJveENvbGxpZGVyIiwibm9kZSIsImdldFdvcmxkU2NhbGUiLCJtdWx0aXBseSIsIkJ1aWx0aW5TaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7QUFJQSxJQUFNQSxHQUFHLEdBQUdDLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhRixHQUF6QjtBQUNBLElBQU1HLElBQUksR0FBR0YsRUFBRSxDQUFDRSxJQUFoQjs7QUFDQSxJQUFJQyxXQUFXLEdBQUcsSUFBSUQsSUFBSixFQUFsQjs7SUFFYUU7Ozs7O3dCQUVPO0FBQ1osYUFBTyxLQUFLQyxXQUFaO0FBQ0g7Ozt3QkFFZTtBQUNaLGFBQU8sS0FBS0MsV0FBWjtBQUNIOzs7d0JBRXlCO0FBQ3RCLGFBQU8sS0FBS0MsUUFBWjtBQUNIOzs7QUFFRCwyQkFBYUMsSUFBYixFQUE0QjtBQUFBOztBQUN4QjtBQUNBLFVBQUtILFdBQUwsR0FBbUIsSUFBSU4sR0FBSixFQUFuQjtBQUNBLFVBQUtPLFdBQUwsR0FBbUIsSUFBSVAsR0FBSixFQUFuQjtBQUNBRyxJQUFBQSxJQUFJLENBQUNPLGNBQUwsQ0FBb0IsTUFBS0MsUUFBTCxDQUFjQyxXQUFsQyxFQUErQ0gsSUFBL0MsRUFBcUQsR0FBckQ7QUFDQU4sSUFBQUEsSUFBSSxDQUFDVSxJQUFMLENBQVUsTUFBS0MsUUFBTCxDQUFjRixXQUF4QixFQUFxQyxNQUFLRCxRQUFMLENBQWNDLFdBQW5EO0FBTHdCO0FBTTNCOzs7O1NBUURHLFNBQUEsa0JBQVU7QUFDTiw0QkFBTUEsTUFBTjs7QUFDQSxTQUFLTixJQUFMLEdBQVksS0FBS08sV0FBTCxDQUFpQlAsSUFBN0I7QUFDSDs7OztzQkFUU0EsTUFBZTtBQUNyQk4sTUFBQUEsSUFBSSxDQUFDTyxjQUFMLENBQW9CLEtBQUtDLFFBQUwsQ0FBY0MsV0FBbEMsRUFBK0NILElBQS9DLEVBQXFELEdBQXJEO0FBQ0EsV0FBS0QsUUFBTCxDQUFjUyxJQUFkLENBQW1CQyxhQUFuQixDQUFpQ2QsV0FBakM7QUFDQUQsTUFBQUEsSUFBSSxDQUFDZ0IsUUFBTCxDQUFjLEtBQUtMLFFBQUwsQ0FBY0YsV0FBNUIsRUFBeUMsS0FBS0QsUUFBTCxDQUFjQyxXQUF2RCxFQUFvRVIsV0FBcEU7QUFDSDs7OztFQTFCZ0NnQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBCdWlsdGluU2hhcGUgfSBmcm9tICcuL2J1aWx0aW4tc2hhcGUnO1xuaW1wb3J0IHsgSUJveFNoYXBlIH0gZnJvbSAnLi4vLi4vc3BlYy9pLXBoeXNpY3Mtc2hhcGUnO1xuaW1wb3J0IHsgQm94Q29sbGlkZXIzRCB9IGZyb20gJy4uLy4uL2V4cG9ydHMvcGh5c2ljcy1mcmFtZXdvcmsnO1xuXG5jb25zdCBPYmIgPSBjYy5nZW9tVXRpbHMuT2JiO1xuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5sZXQgX3dvcmxkU2NhbGUgPSBuZXcgVmVjMygpO1xuXG5leHBvcnQgY2xhc3MgQnVpbHRpbkJveFNoYXBlIGV4dGVuZHMgQnVpbHRpblNoYXBlIGltcGxlbWVudHMgSUJveFNoYXBlIHtcblxuICAgIGdldCBsb2NhbE9iYiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFNoYXBlIGFzIGNjLmdlb21VdGlscy5PYmI7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkT2JiICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmxkU2hhcGUgYXMgY2MuZ2VvbVV0aWxzLk9iYjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJveENvbGxpZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXIgYXMgQm94Q29sbGlkZXIzRDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciAoc2l6ZTogY2MuVmVjMykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9sb2NhbFNoYXBlID0gbmV3IE9iYigpO1xuICAgICAgICB0aGlzLl93b3JsZFNoYXBlID0gbmV3IE9iYigpO1xuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHRoaXMubG9jYWxPYmIuaGFsZkV4dGVudHMsIHNpemUsIDAuNSk7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLndvcmxkT2JiLmhhbGZFeHRlbnRzLCB0aGlzLmxvY2FsT2JiLmhhbGZFeHRlbnRzKTtcbiAgICB9XG5cbiAgICBzZXQgc2l6ZSAoc2l6ZTogY2MuVmVjMykge1xuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHRoaXMubG9jYWxPYmIuaGFsZkV4dGVudHMsIHNpemUsIDAuNSk7XG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKF93b3JsZFNjYWxlKTtcbiAgICAgICAgVmVjMy5tdWx0aXBseSh0aGlzLndvcmxkT2JiLmhhbGZFeHRlbnRzLCB0aGlzLmxvY2FsT2JiLmhhbGZFeHRlbnRzLCBfd29ybGRTY2FsZSk7XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuYm94Q29sbGlkZXIuc2l6ZTtcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9