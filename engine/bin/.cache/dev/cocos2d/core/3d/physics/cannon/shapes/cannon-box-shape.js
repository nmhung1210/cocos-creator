
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-box-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonBoxShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _cannonUtil = require("../cannon-util");

var _cannonShape = require("./cannon-shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Vec3 = cc.Vec3;
var v3_0 = new Vec3();

var CannonBoxShape = /*#__PURE__*/function (_CannonShape) {
  _inheritsLoose(CannonBoxShape, _CannonShape);

  _createClass(CannonBoxShape, [{
    key: "boxCollider",
    get: function get() {
      return this.collider;
    }
  }, {
    key: "box",
    get: function get() {
      return this._shape;
    }
  }]);

  function CannonBoxShape(size) {
    var _this;

    _this = _CannonShape.call(this) || this;
    _this.halfExtent = new _cannon["default"].Vec3();
    Vec3.multiplyScalar(_this.halfExtent, size, 0.5);
    _this._shape = new _cannon["default"].Box(_this.halfExtent.clone());
    return _this;
  }

  var _proto = CannonBoxShape.prototype;

  _proto.onLoad = function onLoad() {
    _CannonShape.prototype.onLoad.call(this);

    this.size = this.boxCollider.size;
  };

  _proto.setScale = function setScale(scale) {
    _CannonShape.prototype.setScale.call(this, scale);

    this.size = this.boxCollider.size;
  };

  _createClass(CannonBoxShape, [{
    key: "size",
    set: function set(v) {
      this.collider.node.getWorldScale(v3_0);
      Vec3.multiplyScalar(this.halfExtent, v, 0.5);
      Vec3.multiply(this.box.halfExtents, this.halfExtent, v3_0);
      this.box.updateConvexPolyhedronRepresentation();

      if (this._index != -1) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }]);

  return CannonBoxShape;
}(_cannonShape.CannonShape);

exports.CannonBoxShape = CannonBoxShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL3NoYXBlcy9jYW5ub24tYm94LXNoYXBlLnRzIl0sIm5hbWVzIjpbIlZlYzMiLCJjYyIsInYzXzAiLCJDYW5ub25Cb3hTaGFwZSIsImNvbGxpZGVyIiwiX3NoYXBlIiwic2l6ZSIsImhhbGZFeHRlbnQiLCJDQU5OT04iLCJtdWx0aXBseVNjYWxhciIsIkJveCIsImNsb25lIiwib25Mb2FkIiwiYm94Q29sbGlkZXIiLCJzZXRTY2FsZSIsInNjYWxlIiwidiIsIm5vZGUiLCJnZXRXb3JsZFNjYWxlIiwibXVsdGlwbHkiLCJib3giLCJoYWxmRXh0ZW50cyIsInVwZGF0ZUNvbnZleFBvbHloZWRyb25SZXByZXNlbnRhdGlvbiIsIl9pbmRleCIsIl9ib2R5IiwiQ2Fubm9uU2hhcGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSxJQUFJLEdBQUdDLEVBQUUsQ0FBQ0QsSUFBaEI7QUFDQSxJQUFNRSxJQUFJLEdBQUcsSUFBSUYsSUFBSixFQUFiOztJQUVhRzs7Ozs7d0JBRWlCO0FBQ3RCLGFBQU8sS0FBS0MsUUFBWjtBQUNIOzs7d0JBRWlCO0FBQ2QsYUFBTyxLQUFLQyxNQUFaO0FBQ0g7OztBQUdELDBCQUFhQyxJQUFiLEVBQTRCO0FBQUE7O0FBQ3hCO0FBRHdCLFVBRG5CQyxVQUNtQixHQURPLElBQUlDLG1CQUFPUixJQUFYLEVBQ1A7QUFFeEJBLElBQUFBLElBQUksQ0FBQ1MsY0FBTCxDQUFvQixNQUFLRixVQUF6QixFQUFxQ0QsSUFBckMsRUFBMkMsR0FBM0M7QUFDQSxVQUFLRCxNQUFMLEdBQWMsSUFBSUcsbUJBQU9FLEdBQVgsQ0FBZSxNQUFLSCxVQUFMLENBQWdCSSxLQUFoQixFQUFmLENBQWQ7QUFId0I7QUFJM0I7Ozs7U0FZREMsU0FBQSxrQkFBVTtBQUNOLDJCQUFNQSxNQUFOOztBQUNBLFNBQUtOLElBQUwsR0FBWSxLQUFLTyxXQUFMLENBQWlCUCxJQUE3QjtBQUNIOztTQUVEUSxXQUFBLGtCQUFVQyxLQUFWLEVBQWdDO0FBQzVCLDJCQUFNRCxRQUFOLFlBQWVDLEtBQWY7O0FBQ0EsU0FBS1QsSUFBTCxHQUFZLEtBQUtPLFdBQUwsQ0FBaUJQLElBQTdCO0FBQ0g7Ozs7c0JBbEJTVSxHQUFjO0FBQ3BCLFdBQUtaLFFBQUwsQ0FBY2EsSUFBZCxDQUFtQkMsYUFBbkIsQ0FBaUNoQixJQUFqQztBQUNBRixNQUFBQSxJQUFJLENBQUNTLGNBQUwsQ0FBb0IsS0FBS0YsVUFBekIsRUFBcUNTLENBQXJDLEVBQXdDLEdBQXhDO0FBQ0FoQixNQUFBQSxJQUFJLENBQUNtQixRQUFMLENBQWMsS0FBS0MsR0FBTCxDQUFTQyxXQUF2QixFQUFvQyxLQUFLZCxVQUF6QyxFQUFxREwsSUFBckQ7QUFDQSxXQUFLa0IsR0FBTCxDQUFTRSxvQ0FBVDs7QUFDQSxVQUFJLEtBQUtDLE1BQUwsSUFBZSxDQUFDLENBQXBCLEVBQXVCO0FBQ25CLDRDQUFtQixLQUFLQyxLQUF4QjtBQUNIO0FBQ0o7Ozs7RUF6QitCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQ0FOTk9OIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL2Nhbm5vbi9jYW5ub24nO1xuaW1wb3J0IHsgY29tbWl0U2hhcGVVcGRhdGVzIH0gZnJvbSAnLi4vY2Fubm9uLXV0aWwnO1xuaW1wb3J0IHsgQ2Fubm9uU2hhcGUgfSBmcm9tICcuL2Nhbm5vbi1zaGFwZSc7XG5pbXBvcnQgeyBJQm94U2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5pbXBvcnQgeyBJVmVjM0xpa2UgfSBmcm9tICcuLi8uLi9zcGVjL2ktY29tbW9uJztcbmltcG9ydCB7IEJveENvbGxpZGVyM0QgfSBmcm9tICcuLi8uLi9leHBvcnRzL3BoeXNpY3MtZnJhbWV3b3JrJztcblxuY29uc3QgVmVjMyA9IGNjLlZlYzM7XG5jb25zdCB2M18wID0gbmV3IFZlYzMoKTtcblxuZXhwb3J0IGNsYXNzIENhbm5vbkJveFNoYXBlIGV4dGVuZHMgQ2Fubm9uU2hhcGUgaW1wbGVtZW50cyBJQm94U2hhcGUge1xuXG4gICAgcHVibGljIGdldCBib3hDb2xsaWRlciAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpZGVyIGFzIEJveENvbGxpZGVyM0Q7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBib3ggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hhcGUgYXMgQ0FOTk9OLkJveDtcbiAgICB9XG5cbiAgICByZWFkb25seSBoYWxmRXh0ZW50OiBDQU5OT04uVmVjMyA9IG5ldyBDQU5OT04uVmVjMygpO1xuICAgIGNvbnN0cnVjdG9yIChzaXplOiBjYy5WZWMzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIFZlYzMubXVsdGlwbHlTY2FsYXIodGhpcy5oYWxmRXh0ZW50LCBzaXplLCAwLjUpO1xuICAgICAgICB0aGlzLl9zaGFwZSA9IG5ldyBDQU5OT04uQm94KHRoaXMuaGFsZkV4dGVudC5jbG9uZSgpKTtcbiAgICB9XG5cbiAgICBzZXQgc2l6ZSAodjogSVZlYzNMaWtlKSB7XG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKHYzXzApO1xuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKHRoaXMuaGFsZkV4dGVudCwgdiwgMC41KTtcbiAgICAgICAgVmVjMy5tdWx0aXBseSh0aGlzLmJveC5oYWxmRXh0ZW50cywgdGhpcy5oYWxmRXh0ZW50LCB2M18wKTtcbiAgICAgICAgdGhpcy5ib3gudXBkYXRlQ29udmV4UG9seWhlZHJvblJlcHJlc2VudGF0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLl9pbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgY29tbWl0U2hhcGVVcGRhdGVzKHRoaXMuX2JvZHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMuYm94Q29sbGlkZXIuc2l6ZTtcbiAgICB9XG5cbiAgICBzZXRTY2FsZSAoc2NhbGU6IGNjLlZlYzMpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2V0U2NhbGUoc2NhbGUpO1xuICAgICAgICB0aGlzLnNpemUgPSB0aGlzLmJveENvbGxpZGVyLnNpemU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=