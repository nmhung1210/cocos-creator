
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cocos/shapes/builtin-sphere-shape.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.BuiltinSphereShape = void 0;

var _builtinShape = require("./builtin-shape");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Sphere = cc.geomUtils.Sphere;

var _worldScale = new cc.Vec3();

var BuiltinSphereShape = /*#__PURE__*/function (_BuiltinShape) {
  _inheritsLoose(BuiltinSphereShape, _BuiltinShape);

  _createClass(BuiltinSphereShape, [{
    key: "radius",
    set: function set(radius) {
      this.localSphere.radius = radius;
      this.collider.node.getWorldScale(_worldScale);

      var s = _worldScale.maxAxis();

      this.worldSphere.radius = this.localSphere.radius * s;
    }
  }, {
    key: "localSphere",
    get: function get() {
      return this._localShape;
    }
  }, {
    key: "worldSphere",
    get: function get() {
      return this._worldShape;
    }
  }, {
    key: "sphereCollider",
    get: function get() {
      return this.collider;
    }
  }]);

  function BuiltinSphereShape(radius) {
    var _this;

    _this = _BuiltinShape.call(this) || this;
    _this._localShape = new Sphere(0, 0, 0, radius);
    _this._worldShape = new Sphere(0, 0, 0, radius);
    return _this;
  }

  var _proto = BuiltinSphereShape.prototype;

  _proto.onLoad = function onLoad() {
    _BuiltinShape.prototype.onLoad.call(this);

    this.radius = this.sphereCollider.radius;
  };

  return BuiltinSphereShape;
}(_builtinShape.BuiltinShape);

exports.BuiltinSphereShape = BuiltinSphereShape;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY29jb3Mvc2hhcGVzL2J1aWx0aW4tc3BoZXJlLXNoYXBlLnRzIl0sIm5hbWVzIjpbIlNwaGVyZSIsImNjIiwiZ2VvbVV0aWxzIiwiX3dvcmxkU2NhbGUiLCJWZWMzIiwiQnVpbHRpblNwaGVyZVNoYXBlIiwicmFkaXVzIiwibG9jYWxTcGhlcmUiLCJjb2xsaWRlciIsIm5vZGUiLCJnZXRXb3JsZFNjYWxlIiwicyIsIm1heEF4aXMiLCJ3b3JsZFNwaGVyZSIsIl9sb2NhbFNoYXBlIiwiX3dvcmxkU2hhcGUiLCJvbkxvYWQiLCJzcGhlcmVDb2xsaWRlciIsIkJ1aWx0aW5TaGFwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7QUFJQSxJQUFNQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQ0MsU0FBSCxDQUFhRixNQUE1Qjs7QUFDQSxJQUFJRyxXQUFXLEdBQUcsSUFBSUYsRUFBRSxDQUFDRyxJQUFQLEVBQWxCOztJQUVhQzs7Ozs7c0JBRUdDLFFBQWdCO0FBQ3hCLFdBQUtDLFdBQUwsQ0FBaUJELE1BQWpCLEdBQTBCQSxNQUExQjtBQUNBLFdBQUtFLFFBQUwsQ0FBY0MsSUFBZCxDQUFtQkMsYUFBbkIsQ0FBaUNQLFdBQWpDOztBQUNBLFVBQU1RLENBQUMsR0FBR1IsV0FBVyxDQUFDUyxPQUFaLEVBQVY7O0FBQ0EsV0FBS0MsV0FBTCxDQUFpQlAsTUFBakIsR0FBMEIsS0FBS0MsV0FBTCxDQUFpQkQsTUFBakIsR0FBMEJLLENBQXBEO0FBQ0g7Ozt3QkFFa0I7QUFDZixhQUFPLEtBQUtHLFdBQVo7QUFDSDs7O3dCQUVrQjtBQUNmLGFBQU8sS0FBS0MsV0FBWjtBQUNIOzs7d0JBRXFCO0FBQ2xCLGFBQU8sS0FBS1AsUUFBWjtBQUNIOzs7QUFFRCw4QkFBYUYsTUFBYixFQUE2QjtBQUFBOztBQUN6QjtBQUNBLFVBQUtRLFdBQUwsR0FBbUIsSUFBSWQsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CTSxNQUFwQixDQUFuQjtBQUNBLFVBQUtTLFdBQUwsR0FBbUIsSUFBSWYsTUFBSixDQUFXLENBQVgsRUFBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CTSxNQUFwQixDQUFuQjtBQUh5QjtBQUk1Qjs7OztTQUVEVSxTQUFBLGtCQUFVO0FBQ04sNEJBQU1BLE1BQU47O0FBQ0EsU0FBS1YsTUFBTCxHQUFjLEtBQUtXLGNBQUwsQ0FBb0JYLE1BQWxDO0FBQ0g7OztFQTlCbUNZIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IEJ1aWx0aW5TaGFwZSB9IGZyb20gJy4vYnVpbHRpbi1zaGFwZSc7XG5pbXBvcnQgeyBJU3BoZXJlU2hhcGUgfSBmcm9tICcuLi8uLi9zcGVjL2ktcGh5c2ljcy1zaGFwZSc7XG5pbXBvcnQgeyBTcGhlcmVDb2xsaWRlcjNEIH0gZnJvbSAnLi4vLi4vZXhwb3J0cy9waHlzaWNzLWZyYW1ld29yayc7XG5cbmNvbnN0IFNwaGVyZSA9IGNjLmdlb21VdGlscy5TcGhlcmU7XG5sZXQgX3dvcmxkU2NhbGUgPSBuZXcgY2MuVmVjMygpO1xuXG5leHBvcnQgY2xhc3MgQnVpbHRpblNwaGVyZVNoYXBlIGV4dGVuZHMgQnVpbHRpblNoYXBlIGltcGxlbWVudHMgSVNwaGVyZVNoYXBlIHtcblxuICAgIHNldCByYWRpdXMgKHJhZGl1czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubG9jYWxTcGhlcmUucmFkaXVzID0gcmFkaXVzO1xuICAgICAgICB0aGlzLmNvbGxpZGVyLm5vZGUuZ2V0V29ybGRTY2FsZShfd29ybGRTY2FsZSk7XG4gICAgICAgIGNvbnN0IHMgPSBfd29ybGRTY2FsZS5tYXhBeGlzKCk7XG4gICAgICAgIHRoaXMud29ybGRTcGhlcmUucmFkaXVzID0gdGhpcy5sb2NhbFNwaGVyZS5yYWRpdXMgKiBzO1xuICAgIH1cblxuICAgIGdldCBsb2NhbFNwaGVyZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFNoYXBlIGFzIGNjLmdlb21VdGlscy5TcGhlcmU7XG4gICAgfVxuXG4gICAgZ2V0IHdvcmxkU3BoZXJlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dvcmxkU2hhcGUgYXMgY2MuZ2VvbVV0aWxzLlNwaGVyZTtcbiAgICB9XG5cbiAgICBnZXQgc3BoZXJlQ29sbGlkZXIgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsaWRlciBhcyBTcGhlcmVDb2xsaWRlcjNEO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yIChyYWRpdXM6IG51bWJlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9sb2NhbFNoYXBlID0gbmV3IFNwaGVyZSgwLCAwLCAwLCByYWRpdXMpO1xuICAgICAgICB0aGlzLl93b3JsZFNoYXBlID0gbmV3IFNwaGVyZSgwLCAwLCAwLCByYWRpdXMpO1xuICAgIH1cblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHRoaXMuc3BoZXJlQ29sbGlkZXIucmFkaXVzO1xuICAgIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=