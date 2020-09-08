
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/shapes/cannon-sphere-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.CannonSphereShape = void 0;

var _cannon = _interopRequireDefault(require("../../../../../../external/cannon/cannon"));

var _cannonUtil = require("../cannon-util");

var _cannonShape = require("./cannon-shape");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var v3_0 = new cc.Vec3();

var CannonSphereShape = /*#__PURE__*/function (_CannonShape) {
  _inheritsLoose(CannonSphereShape, _CannonShape);

  _createClass(CannonSphereShape, [{
    key: "sphereCollider",
    get: function get() {
      return this.collider;
    }
  }, {
    key: "sphere",
    get: function get() {
      return this._shape;
    }
  }, {
    key: "radius",
    get: function get() {
      return this._radius;
    },
    set: function set(v) {
      this.collider.node.getWorldScale(v3_0);
      var max = v3_0.maxAxis();
      this.sphere.radius = v * Math.abs(max);
      this.sphere.updateBoundingSphereRadius();

      if (this._index != -1) {
        (0, _cannonUtil.commitShapeUpdates)(this._body);
      }
    }
  }]);

  function CannonSphereShape(radius) {
    var _this;

    _this = _CannonShape.call(this) || this;
    _this._radius = void 0;
    _this._radius = radius;
    _this._shape = new _cannon["default"].Sphere(_this._radius);
    return _this;
  }

  var _proto = CannonSphereShape.prototype;

  _proto.onLoad = function onLoad() {
    _CannonShape.prototype.onLoad.call(this);

    this.radius = this.sphereCollider.radius;
  };

  _proto.setScale = function setScale(scale) {
    _CannonShape.prototype.setScale.call(this, scale);

    this.radius = this.sphereCollider.radius;
  };

  return CannonSphereShape;
}(_cannonShape.CannonShape);

exports.CannonSphereShape = CannonSphereShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL3NoYXBlcy9jYW5ub24tc3BoZXJlLXNoYXBlLnRzIl0sIm5hbWVzIjpbInYzXzAiLCJjYyIsIlZlYzMiLCJDYW5ub25TcGhlcmVTaGFwZSIsImNvbGxpZGVyIiwiX3NoYXBlIiwiX3JhZGl1cyIsInYiLCJub2RlIiwiZ2V0V29ybGRTY2FsZSIsIm1heCIsIm1heEF4aXMiLCJzcGhlcmUiLCJyYWRpdXMiLCJNYXRoIiwiYWJzIiwidXBkYXRlQm91bmRpbmdTcGhlcmVSYWRpdXMiLCJfaW5kZXgiLCJfYm9keSIsIkNBTk5PTiIsIlNwaGVyZSIsIm9uTG9hZCIsInNwaGVyZUNvbGxpZGVyIiwic2V0U2NhbGUiLCJzY2FsZSIsIkNhbm5vblNoYXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBSUEsSUFBTUEsSUFBSSxHQUFHLElBQUlDLEVBQUUsQ0FBQ0MsSUFBUCxFQUFiOztJQUNhQzs7Ozs7d0JBRWE7QUFDbEIsYUFBTyxLQUFLQyxRQUFaO0FBQ0g7Ozt3QkFFYTtBQUNWLGFBQU8sS0FBS0MsTUFBWjtBQUNIOzs7d0JBRWE7QUFDVixhQUFPLEtBQUtDLE9BQVo7QUFDSDtzQkFFV0MsR0FBVztBQUNuQixXQUFLSCxRQUFMLENBQWNJLElBQWQsQ0FBbUJDLGFBQW5CLENBQWlDVCxJQUFqQztBQUNBLFVBQU1VLEdBQUcsR0FBR1YsSUFBSSxDQUFDVyxPQUFMLEVBQVo7QUFDQSxXQUFLQyxNQUFMLENBQVlDLE1BQVosR0FBcUJOLENBQUMsR0FBR08sSUFBSSxDQUFDQyxHQUFMLENBQVNMLEdBQVQsQ0FBekI7QUFDQSxXQUFLRSxNQUFMLENBQVlJLDBCQUFaOztBQUNBLFVBQUksS0FBS0MsTUFBTCxJQUFlLENBQUMsQ0FBcEIsRUFBdUI7QUFDbkIsNENBQW1CLEtBQUtDLEtBQXhCO0FBQ0g7QUFDSjs7O0FBSUQsNkJBQWFMLE1BQWIsRUFBNkI7QUFBQTs7QUFDekI7QUFEeUIsVUFGckJQLE9BRXFCO0FBRXpCLFVBQUtBLE9BQUwsR0FBZU8sTUFBZjtBQUNBLFVBQUtSLE1BQUwsR0FBYyxJQUFJYyxtQkFBT0MsTUFBWCxDQUFrQixNQUFLZCxPQUF2QixDQUFkO0FBSHlCO0FBSTVCOzs7O1NBRURlLFNBQUEsa0JBQVU7QUFDTiwyQkFBTUEsTUFBTjs7QUFDQSxTQUFLUixNQUFMLEdBQWMsS0FBS1MsY0FBTCxDQUFvQlQsTUFBbEM7QUFDSDs7U0FFRFUsV0FBQSxrQkFBVUMsS0FBVixFQUFnQztBQUM1QiwyQkFBTUQsUUFBTixZQUFlQyxLQUFmOztBQUNBLFNBQUtYLE1BQUwsR0FBYyxLQUFLUyxjQUFMLENBQW9CVCxNQUFsQztBQUNIOzs7RUF4Q2tDWSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgQ0FOTk9OIGZyb20gJy4uLy4uLy4uLy4uLy4uLy4uL2V4dGVybmFsL2Nhbm5vbi9jYW5ub24nO1xuaW1wb3J0IHsgY29tbWl0U2hhcGVVcGRhdGVzIH0gZnJvbSAnLi4vY2Fubm9uLXV0aWwnO1xuaW1wb3J0IHsgQ2Fubm9uU2hhcGUgfSBmcm9tICcuL2Nhbm5vbi1zaGFwZSc7XG5pbXBvcnQgeyBJU3BoZXJlU2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5pbXBvcnQgeyBTcGhlcmVDb2xsaWRlcjNEIH0gZnJvbSAnLi4vLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XG5cbmNvbnN0IHYzXzAgPSBuZXcgY2MuVmVjMygpO1xuZXhwb3J0IGNsYXNzIENhbm5vblNwaGVyZVNoYXBlIGV4dGVuZHMgQ2Fubm9uU2hhcGUgaW1wbGVtZW50cyBJU3BoZXJlU2hhcGUge1xuXG4gICAgZ2V0IHNwaGVyZUNvbGxpZGVyICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGlkZXIgYXMgU3BoZXJlQ29sbGlkZXIzRDtcbiAgICB9XG5cbiAgICBnZXQgc3BoZXJlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NoYXBlIGFzIENBTk5PTi5TcGhlcmU7XG4gICAgfVxuXG4gICAgZ2V0IHJhZGl1cyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgfVxuXG4gICAgc2V0IHJhZGl1cyAodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFNjYWxlKHYzXzApO1xuICAgICAgICBjb25zdCBtYXggPSB2M18wLm1heEF4aXMoKTtcbiAgICAgICAgdGhpcy5zcGhlcmUucmFkaXVzID0gdiAqIE1hdGguYWJzKG1heCk7XG4gICAgICAgIHRoaXMuc3BoZXJlLnVwZGF0ZUJvdW5kaW5nU3BoZXJlUmFkaXVzKCk7XG4gICAgICAgIGlmICh0aGlzLl9pbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgY29tbWl0U2hhcGVVcGRhdGVzKHRoaXMuX2JvZHkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmFkaXVzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAocmFkaXVzOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLl9zaGFwZSA9IG5ldyBDQU5OT04uU3BoZXJlKHRoaXMuX3JhZGl1cyk7XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgICAgIHRoaXMucmFkaXVzID0gdGhpcy5zcGhlcmVDb2xsaWRlci5yYWRpdXM7XG4gICAgfVxuXG4gICAgc2V0U2NhbGUgKHNjYWxlOiBjYy5WZWMzKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldFNjYWxlKHNjYWxlKTtcbiAgICAgICAgdGhpcy5yYWRpdXMgPSB0aGlzLnNwaGVyZUNvbGxpZGVyLnJhZGl1cztcbiAgICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9