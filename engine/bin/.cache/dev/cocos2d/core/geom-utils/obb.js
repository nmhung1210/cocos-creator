
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/obb.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../value-types");

var _enums = _interopRequireDefault(require("./enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _v3_tmp = new _valueTypes.Vec3();

var _v3_tmp2 = new _valueTypes.Vec3();

var _m3_tmp = new _valueTypes.Mat3(); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/


var transform_extent_m3 = function transform_extent_m3(out, extent, m3) {
  var m3_tmpm = _m3_tmp.m,
      m3m = m3.m;
  m3_tmpm[0] = Math.abs(m3m[0]);
  m3_tmpm[1] = Math.abs(m3m[1]);
  m3_tmpm[2] = Math.abs(m3m[2]);
  m3_tmpm[3] = Math.abs(m3m[3]);
  m3_tmpm[4] = Math.abs(m3m[4]);
  m3_tmpm[5] = Math.abs(m3m[5]);
  m3_tmpm[6] = Math.abs(m3m[6]);
  m3_tmpm[7] = Math.abs(m3m[7]);
  m3_tmpm[8] = Math.abs(m3m[8]);

  _valueTypes.Vec3.transformMat3(out, extent, _m3_tmp);
};
/**
 * !#en obb
 * !#zh
 * 基础几何  方向包围盒。
 * @class geomUtils.Obb
 */


var obb = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new obb
   * !#zh
   * 创建一个新的 obb 实例。
   * @method create
   * @param {Number} cx X coordinates of the shape relative to the origin.
   * @param {Number} cy Y coordinates of the shape relative to the origin.
   * @param {Number} cz Z coordinates of the shape relative to the origin.
   * @param {Number} hw Obb is half the width.
   * @param {Number} hh Obb is half the height.
   * @param {Number} hl Obb is half the Length.
   * @param {Number} ox_1 Direction matrix parameter.
   * @param {Number} ox_2 Direction matrix parameter.
   * @param {Number} ox_3 Direction matrix parameter.
   * @param {Number} oy_1 Direction matrix parameter.
   * @param {Number} oy_2 Direction matrix parameter.
   * @param {Number} oy_3 Direction matrix parameter.
   * @param {Number} oz_1 Direction matrix parameter.
   * @param {Number} oz_2 Direction matrix parameter.
   * @param {Number} oz_3 Direction matrix parameter.
   * @return {Obb} Direction Box.
   */
  obb.create = function create(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    return new obb(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * !#en
   * clone a new obb
   * !#zh
   * 克隆一个 obb。
   * @method clone
   * @param {Obb} a The target of cloning.
   * @returns {Obb} New object cloned.
   */
  ;

  obb.clone = function clone(a) {
    var aom = a.orientation.m;
    return new obb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z, aom[0], aom[1], aom[2], aom[3], aom[4], aom[5], aom[6], aom[7], aom[8]);
  }
  /**
   * !#en
   * copy the values from one obb to another
   * !#zh
   * 将从一个 obb 的值复制到另一个 obb。
   * @method copy
   * @param {Obb} out Obb that accepts the operation.
   * @param {Obb} a Obb being copied.
   * @return {Obb} out Obb that accepts the operation.
   */
  ;

  obb.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.center, a.center);

    _valueTypes.Vec3.copy(out.halfExtents, a.halfExtents);

    _valueTypes.Mat3.copy(out.orientation, a.orientation);

    return out;
  }
  /**
   * !#en
   * create a new obb from two corner points
   * !#zh
   * 用两个点创建一个新的 obb。
   * @method fromPoints
   * @param {Obb} out Obb that accepts the operation.
   * @param {Vec3} minPos The smallest point of obb.
   * @param {Vec3} maxPos Obb's maximum point.
   * @returns {Obb} out Obb that accepts the operation.
   */
  ;

  obb.fromPoints = function fromPoints(out, minPos, maxPos) {
    _valueTypes.Vec3.multiplyScalar(out.center, _valueTypes.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    _valueTypes.Vec3.multiplyScalar(out.halfExtents, _valueTypes.Vec3.subtract(_v3_tmp2, maxPos, minPos), 0.5);

    _valueTypes.Mat3.identity(out.orientation);

    return out;
  }
  /**
   * !#en
   * Set the components of a obb to the given values
   * !#zh
   * 将给定 obb 的属性设置为给定的值。
   * @method set
   * @param {Number} cx X coordinates of the shape relative to the origin.
   * @param {Number} cy Y coordinates of the shape relative to the origin.
   * @param {Number} cz Z coordinates of the shape relative to the origin.
   * @param {Number} hw Obb is half the width.
   * @param {Number} hh Obb is half the height.
   * @param {Number} hl Obb is half the Length.
   * @param {Number} ox_1 Direction matrix parameter.
   * @param {Number} ox_2 Direction matrix parameter.
   * @param {Number} ox_3 Direction matrix parameter.
   * @param {Number} oy_1 Direction matrix parameter.
   * @param {Number} oy_2 Direction matrix parameter.
   * @param {Number} oy_3 Direction matrix parameter.
   * @param {Number} oz_1 Direction matrix parameter.
   * @param {Number} oz_2 Direction matrix parameter.
   * @param {Number} oz_3 Direction matrix parameter.
   * @return {Obb} out
   */
  ;

  obb.set = function set(out, cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    _valueTypes.Vec3.set(out.center, cx, cy, cz);

    _valueTypes.Vec3.set(out.halfExtents, hw, hh, hl);

    _valueTypes.Mat3.set(out.orientation, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);

    return out;
  }
  /**
   * !#en
   * The center of the local coordinate.
   * !#zh
   * 本地坐标的中心点。
   * @property {Vec3} center
   */
  ;

  _createClass(obb, [{
    key: "type",

    /**
     * !#zh
     * 获取形状的类型。
     * @property {number} type
     * @readonly
     */
    get: function get() {
      return this._type;
    }
  }]);

  function obb(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
    if (cx === void 0) {
      cx = 0;
    }

    if (cy === void 0) {
      cy = 0;
    }

    if (cz === void 0) {
      cz = 0;
    }

    if (hw === void 0) {
      hw = 1;
    }

    if (hh === void 0) {
      hh = 1;
    }

    if (hl === void 0) {
      hl = 1;
    }

    if (ox_1 === void 0) {
      ox_1 = 1;
    }

    if (ox_2 === void 0) {
      ox_2 = 0;
    }

    if (ox_3 === void 0) {
      ox_3 = 0;
    }

    if (oy_1 === void 0) {
      oy_1 = 0;
    }

    if (oy_2 === void 0) {
      oy_2 = 1;
    }

    if (oy_3 === void 0) {
      oy_3 = 0;
    }

    if (oz_1 === void 0) {
      oz_1 = 0;
    }

    if (oz_2 === void 0) {
      oz_2 = 0;
    }

    if (oz_3 === void 0) {
      oz_3 = 1;
    }

    this.center = void 0;
    this.halfExtents = void 0;
    this.orientation = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_OBB;
    this.center = new _valueTypes.Vec3(cx, cy, cz);
    this.halfExtents = new _valueTypes.Vec3(hw, hh, hl);
    this.orientation = new _valueTypes.Mat3(ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
  }
  /**
   * !#en
   * Get the bounding points of this shape
   * !#zh
   * 获取 obb 的最小点和最大点。
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */


  var _proto = obb.prototype;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    transform_extent_m3(_v3_tmp, this.halfExtents, this.orientation);

    _valueTypes.Vec3.subtract(minPos, this.center, _v3_tmp);

    _valueTypes.Vec3.add(maxPos, this.center, _v3_tmp);
  }
  /**
   * !#en Transform this shape
   * !#zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @method transform
   * @param {Mat4} m The transformation matrix.
   * @param {Vec3} pos The position part of the transformation.
   * @param {Quat} rot The rotating part of the transformation.
   * @param {Vec3} scale The scaling part of the transformation.
   * @param {Obb} out Target of transformation.
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _valueTypes.Mat3.fromQuat(out.orientation, rot);

    _valueTypes.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  }
  /**
   * !#en
   * Transform out based on this obb data.
   * !#zh
   * 将 out 根据这个 obb 的数据进行变换。
   * @method translateAndRotate
   * @param {Mat4} m The transformation matrix.
   * @param {Quat} rot The rotating part of the transformation.
   * @param {Obb} out Target of transformation.
   */
  ;

  _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m); // parent shape doesn't contain rotations for now


    _valueTypes.Mat3.fromQuat(out.orientation, rot);
  }
  /**
   * !#en
   * Scale out based on this obb data.
   * !#zh
   * 将 out 根据这个 obb 的数据进行缩放。
   * @method setScale
   * @param {Vec3} scale Scale value.
   * @param {Obb} out Scaled target.
   */
  ;

  _proto.setScale = function setScale(scale, out) {
    _valueTypes.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
  };

  return obb;
}();

exports["default"] = obb;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvb2JiLnRzIl0sIm5hbWVzIjpbIl92M190bXAiLCJWZWMzIiwiX3YzX3RtcDIiLCJfbTNfdG1wIiwiTWF0MyIsInRyYW5zZm9ybV9leHRlbnRfbTMiLCJvdXQiLCJleHRlbnQiLCJtMyIsIm0zX3RtcG0iLCJtIiwibTNtIiwiTWF0aCIsImFicyIsInRyYW5zZm9ybU1hdDMiLCJvYmIiLCJjcmVhdGUiLCJjeCIsImN5IiwiY3oiLCJodyIsImhoIiwiaGwiLCJveF8xIiwib3hfMiIsIm94XzMiLCJveV8xIiwib3lfMiIsIm95XzMiLCJvel8xIiwib3pfMiIsIm96XzMiLCJjbG9uZSIsImEiLCJhb20iLCJvcmllbnRhdGlvbiIsImNlbnRlciIsIngiLCJ5IiwieiIsImhhbGZFeHRlbnRzIiwiY29weSIsImZyb21Qb2ludHMiLCJtaW5Qb3MiLCJtYXhQb3MiLCJtdWx0aXBseVNjYWxhciIsImFkZCIsInN1YnRyYWN0IiwiaWRlbnRpdHkiLCJzZXQiLCJfdHlwZSIsImVudW1zIiwiU0hBUEVfT0JCIiwiZ2V0Qm91bmRhcnkiLCJ0cmFuc2Zvcm0iLCJwb3MiLCJyb3QiLCJzY2FsZSIsInRyYW5zZm9ybU1hdDQiLCJmcm9tUXVhdCIsIm11bHRpcGx5IiwidHJhbnNsYXRlQW5kUm90YXRlIiwic2V0U2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLElBQUlDLGdCQUFKLEVBQWhCOztBQUNBLElBQU1DLFFBQVEsR0FBRyxJQUFJRCxnQkFBSixFQUFqQjs7QUFDQSxJQUFNRSxPQUFPLEdBQUcsSUFBSUMsZ0JBQUosRUFBaEIsRUFFQTs7O0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFDQyxHQUFELEVBQVlDLE1BQVosRUFBMEJDLEVBQTFCLEVBQXVDO0FBQy9ELE1BQUlDLE9BQU8sR0FBR04sT0FB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LGFBQUwsQ0FBbUJwRCxHQUFHLENBQUM4QixNQUF2QixFQUErQixLQUFLQSxNQUFwQyxFQUE0QzFCLENBQTVDLEVBRG9ELENBRXBEOzs7QUFDQU4scUJBQUt1RCxRQUFMLENBQWNyRCxHQUFHLENBQUM2QixXQUFsQixFQUErQnFCLEdBQS9CO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7U0FTT00sV0FBUCxrQkFBaUJMLEtBQWpCLEVBQThCbkQsR0FBOUIsRUFBd0M7QUFDcENMLHFCQUFLMkQsUUFBTCxDQUFjdEQsR0FBRyxDQUFDa0MsV0FBbEIsRUFBK0IsS0FBS0EsV0FBcEMsRUFBaURpQixLQUFqRDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IE1hdDMsIE1hdDQsIFF1YXQsIFZlYzMgfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XG5cbmNvbnN0IF92M190bXAgPSBuZXcgVmVjMygpO1xuY29uc3QgX3YzX3RtcDIgPSBuZXcgVmVjMygpO1xuY29uc3QgX20zX3RtcCA9IG5ldyBNYXQzKCk7XG5cbi8vIGh0dHBzOi8vemV1eGNnLm9yZy8yMDEwLzEwLzE3L2FhYmItZnJvbS1vYmItd2l0aC1jb21wb25lbnQtd2lzZS1hYnMvXG5jb25zdCB0cmFuc2Zvcm1fZXh0ZW50X20zID0gKG91dDogVmVjMywgZXh0ZW50OiBWZWMzLCBtMzogTWF0MykgPT4ge1xuICAgIGxldCBtM190bXBtID0gX20zX3RtcC5tLCBtM20gPSBtMy5tO1xuICAgIG0zX3RtcG1bMF0gPSBNYXRoLmFicyhtM21bMF0pOyBtM190bXBtWzFdID0gTWF0aC5hYnMobTNtWzFdKTsgbTNfdG1wbVsyXSA9IE1hdGguYWJzKG0zbVsyXSk7XG4gICAgbTNfdG1wbVszXSA9IE1hdGguYWJzKG0zbVszXSk7IG0zX3RtcG1bNF0gPSBNYXRoLmFicyhtM21bNF0pOyBtM190bXBtWzVdID0gTWF0aC5hYnMobTNtWzVdKTtcbiAgICBtM190bXBtWzZdID0gTWF0aC5hYnMobTNtWzZdKTsgbTNfdG1wbVs3XSA9IE1hdGguYWJzKG0zbVs3XSk7IG0zX3RtcG1bOF0gPSBNYXRoLmFicyhtM21bOF0pO1xuICAgIFZlYzMudHJhbnNmb3JtTWF0MyhvdXQsIGV4dGVudCwgX20zX3RtcCk7XG59O1xuXG4vKipcbiAqICEjZW4gb2JiXG4gKiAhI3poXG4gKiDln7rnoYDlh6DkvZUgIOaWueWQkeWMheWbtOebkuOAglxuICogQGNsYXNzIGdlb21VdGlscy5PYmJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgb2JiIHtcblxuICAgIC8qKlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5blvaLnirbnmoTnsbvlnovjgIJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gdHlwZVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIG5ldyBvYmJcbiAgICAgKiAhI3poXG4gICAgICog5Yib5bu65LiA5Liq5paw55qEIG9iYiDlrp7kvovjgIJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeCBYIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeSBZIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjeiBaIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBodyBPYmIgaXMgaGFsZiB0aGUgd2lkdGguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhoIE9iYiBpcyBoYWxmIHRoZSBoZWlnaHQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhsIE9iYiBpcyBoYWxmIHRoZSBMZW5ndGguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG94XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG94XzIgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG94XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG95XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG95XzIgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG95XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG96XzEgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG96XzIgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG96XzMgRGlyZWN0aW9uIG1hdHJpeCBwYXJhbWV0ZXIuXG4gICAgICogQHJldHVybiB7T2JifSBEaXJlY3Rpb24gQm94LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlIChcbiAgICAgICAgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcixcbiAgICAgICAgaHc6IG51bWJlciwgaGg6IG51bWJlciwgaGw6IG51bWJlcixcbiAgICAgICAgb3hfMTogbnVtYmVyLCBveF8yOiBudW1iZXIsIG94XzM6IG51bWJlcixcbiAgICAgICAgb3lfMTogbnVtYmVyLCBveV8yOiBudW1iZXIsIG95XzM6IG51bWJlcixcbiAgICAgICAgb3pfMTogbnVtYmVyLCBvel8yOiBudW1iZXIsIG96XzM6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gbmV3IG9iYihjeCwgY3ksIGN6LCBodywgaGgsIGhsLCBveF8xLCBveF8yLCBveF8zLCBveV8xLCBveV8yLCBveV8zLCBvel8xLCBvel8yLCBvel8zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogY2xvbmUgYSBuZXcgb2JiXG4gICAgICogISN6aFxuICAgICAqIOWFi+mahuS4gOS4qiBvYmLjgIJcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHBhcmFtIHtPYmJ9IGEgVGhlIHRhcmdldCBvZiBjbG9uaW5nLlxuICAgICAqIEByZXR1cm5zIHtPYmJ9IE5ldyBvYmplY3QgY2xvbmVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgKGE6IG9iYikge1xuICAgICAgICBsZXQgYW9tID0gYS5vcmllbnRhdGlvbi5tO1xuICAgICAgICByZXR1cm4gbmV3IG9iYihhLmNlbnRlci54LCBhLmNlbnRlci55LCBhLmNlbnRlci56LFxuICAgICAgICAgICAgYS5oYWxmRXh0ZW50cy54LCBhLmhhbGZFeHRlbnRzLnksIGEuaGFsZkV4dGVudHMueixcbiAgICAgICAgICAgIGFvbVswXSwgYW9tWzFdLCBhb21bMl0sXG4gICAgICAgICAgICBhb21bM10sIGFvbVs0XSwgYW9tWzVdLFxuICAgICAgICAgICAgYW9tWzZdLCBhb21bN10sIGFvbVs4XSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBvYmIgdG8gYW5vdGhlclxuICAgICAqICEjemhcbiAgICAgKiDlsIbku47kuIDkuKogb2JiIOeahOWAvOWkjeWItuWIsOWPpuS4gOS4qiBvYmLjgIJcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IE9iYiB0aGF0IGFjY2VwdHMgdGhlIG9wZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge09iYn0gYSBPYmIgYmVpbmcgY29waWVkLlxuICAgICAqIEByZXR1cm4ge09iYn0gb3V0IE9iYiB0aGF0IGFjY2VwdHMgdGhlIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgKG91dDogb2JiLCBhOiBvYmIpOiBvYmIge1xuICAgICAgICBWZWMzLmNvcHkob3V0LmNlbnRlciwgYS5jZW50ZXIpO1xuICAgICAgICBWZWMzLmNvcHkob3V0LmhhbGZFeHRlbnRzLCBhLmhhbGZFeHRlbnRzKTtcbiAgICAgICAgTWF0My5jb3B5KG91dC5vcmllbnRhdGlvbiwgYS5vcmllbnRhdGlvbik7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogY3JlYXRlIGEgbmV3IG9iYiBmcm9tIHR3byBjb3JuZXIgcG9pbnRzXG4gICAgICogISN6aFxuICAgICAqIOeUqOS4pOS4queCueWIm+W7uuS4gOS4quaWsOeahCBvYmLjgIJcbiAgICAgKiBAbWV0aG9kIGZyb21Qb2ludHNcbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IE9iYiB0aGF0IGFjY2VwdHMgdGhlIG9wZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pblBvcyBUaGUgc21hbGxlc3QgcG9pbnQgb2Ygb2JiLlxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4UG9zIE9iYidzIG1heGltdW0gcG9pbnQuXG4gICAgICogQHJldHVybnMge09iYn0gb3V0IE9iYiB0aGF0IGFjY2VwdHMgdGhlIG9wZXJhdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dDogb2JiLCBtaW5Qb3M6IFZlYzMsIG1heFBvczogVmVjMyk6IG9iYiB7XG4gICAgICAgIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0LmNlbnRlciwgVmVjMy5hZGQoX3YzX3RtcCwgbWluUG9zLCBtYXhQb3MpLCAwLjUpO1xuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKG91dC5oYWxmRXh0ZW50cywgVmVjMy5zdWJ0cmFjdChfdjNfdG1wMiwgbWF4UG9zLCBtaW5Qb3MpLCAwLjUpO1xuICAgICAgICBNYXQzLmlkZW50aXR5KG91dC5vcmllbnRhdGlvbik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG9iYiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogISN6aFxuICAgICAqIOWwhue7meWumiBvYmIg55qE5bGe5oCn6K6+572u5Li657uZ5a6a55qE5YC844CCXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3ggWCBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3kgWSBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY3ogWiBjb29yZGluYXRlcyBvZiB0aGUgc2hhcGUgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaHcgT2JiIGlzIGhhbGYgdGhlIHdpZHRoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBoaCBPYmIgaXMgaGFsZiB0aGUgaGVpZ2h0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBobCBPYmIgaXMgaGFsZiB0aGUgTGVuZ3RoLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveF8xIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveF8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveF8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveV8xIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveV8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBveV8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvel8xIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvel8yIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvel8zIERpcmVjdGlvbiBtYXRyaXggcGFyYW1ldGVyLlxuICAgICAqIEByZXR1cm4ge09iYn0gb3V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKFxuICAgICAgICBvdXQ6IG9iYixcbiAgICAgICAgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcixcbiAgICAgICAgaHc6IG51bWJlciwgaGg6IG51bWJlciwgaGw6IG51bWJlcixcbiAgICAgICAgb3hfMTogbnVtYmVyLCBveF8yOiBudW1iZXIsIG94XzM6IG51bWJlcixcbiAgICAgICAgb3lfMTogbnVtYmVyLCBveV8yOiBudW1iZXIsIG95XzM6IG51bWJlcixcbiAgICAgICAgb3pfMTogbnVtYmVyLCBvel8yOiBudW1iZXIsIG96XzM6IG51bWJlcik6IG9iYiB7XG4gICAgICAgIFZlYzMuc2V0KG91dC5jZW50ZXIsIGN4LCBjeSwgY3opO1xuICAgICAgICBWZWMzLnNldChvdXQuaGFsZkV4dGVudHMsIGh3LCBoaCwgaGwpO1xuICAgICAgICBNYXQzLnNldChvdXQub3JpZW50YXRpb24sIG94XzEsIG94XzIsIG94XzMsIG95XzEsIG95XzIsIG95XzMsIG96XzEsIG96XzIsIG96XzMpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgY2VudGVyIG9mIHRoZSBsb2NhbCBjb29yZGluYXRlLlxuICAgICAqICEjemhcbiAgICAgKiDmnKzlnLDlnZDmoIfnmoTkuK3lv4PngrnjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNlbnRlclxuICAgICAqL1xuICAgIHB1YmxpYyBjZW50ZXI6IFZlYzM7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSGFsZiB0aGUgbGVuZ3RoLCB3aWR0aCwgYW5kIGhlaWdodC5cbiAgICAgKiAhI3poXG4gICAgICog6ZW/5a696auY55qE5LiA5Y2K44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBoYWxmRXh0ZW50c1xuICAgICAqL1xuICAgIHB1YmxpYyBoYWxmRXh0ZW50czogVmVjMztcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEaXJlY3Rpb24gbWF0cml4LlxuICAgICAqICEjemhcbiAgICAgKiDmlrnlkJHnn6npmLXjgIJcbiAgICAgKiBAcHJvcGVydHkge01hdDN9IG9yaWVudGF0aW9uXG4gICAgICovXG4gICAgcHVibGljIG9yaWVudGF0aW9uOiBNYXQzO1xuXG4gICAgcHJvdGVjdGVkIF90eXBlOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAoY3ggPSAwLCBjeSA9IDAsIGN6ID0gMCxcbiAgICAgICAgICAgICAgICAgaHcgPSAxLCBoaCA9IDEsIGhsID0gMSxcbiAgICAgICAgICAgICAgICAgb3hfMSA9IDEsIG94XzIgPSAwLCBveF8zID0gMCxcbiAgICAgICAgICAgICAgICAgb3lfMSA9IDAsIG95XzIgPSAxLCBveV8zID0gMCxcbiAgICAgICAgICAgICAgICAgb3pfMSA9IDAsIG96XzIgPSAwLCBvel8zID0gMSkge1xuICAgICAgICB0aGlzLl90eXBlID0gZW51bXMuU0hBUEVfT0JCO1xuICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWMzKGN4LCBjeSwgY3opO1xuICAgICAgICB0aGlzLmhhbGZFeHRlbnRzID0gbmV3IFZlYzMoaHcsIGhoLCBobCk7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBuZXcgTWF0MyhveF8xLCBveF8yLCBveF8zLCBveV8xLCBveV8yLCBveV8zLCBvel8xLCBvel8yLCBvel8zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBib3VuZGluZyBwb2ludHMgb2YgdGhpcyBzaGFwZVxuICAgICAqICEjemhcbiAgICAgKiDojrflj5Ygb2JiIOeahOacgOWwj+eCueWSjOacgOWkp+eCueOAglxuICAgICAqIEBtZXRob2QgZ2V0Qm91bmRhcnlcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG1pblBvc1xuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4UG9zXG4gICAgICovXG4gICAgcHVibGljIGdldEJvdW5kYXJ5IChtaW5Qb3M6IFZlYzMsIG1heFBvczogVmVjMykge1xuICAgICAgICB0cmFuc2Zvcm1fZXh0ZW50X20zKF92M190bXAsIHRoaXMuaGFsZkV4dGVudHMsIHRoaXMub3JpZW50YXRpb24pO1xuICAgICAgICBWZWMzLnN1YnRyYWN0KG1pblBvcywgdGhpcy5jZW50ZXIsIF92M190bXApO1xuICAgICAgICBWZWMzLmFkZChtYXhQb3MsIHRoaXMuY2VudGVyLCBfdjNfdG1wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYW5zZm9ybSB0aGlzIHNoYXBlXG4gICAgICogISN6aFxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIG9iYiDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7TWF0NH0gbSBUaGUgdHJhbnNmb3JtYXRpb24gbWF0cml4LlxuICAgICAqIEBwYXJhbSB7VmVjM30gcG9zIFRoZSBwb3NpdGlvbiBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge1F1YXR9IHJvdCBUaGUgcm90YXRpbmcgcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHtWZWMzfSBzY2FsZSBUaGUgc2NhbGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0ge09iYn0gb3V0IFRhcmdldCBvZiB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgdHJhbnNmb3JtIChtOiBNYXQ0LCBwb3M6IFZlYzMsIHJvdDogUXVhdCwgc2NhbGU6IFZlYzMsIG91dDogb2JiKSB7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NChvdXQuY2VudGVyLCB0aGlzLmNlbnRlciwgbSk7XG4gICAgICAgIC8vIHBhcmVudCBzaGFwZSBkb2Vzbid0IGNvbnRhaW4gcm90YXRpb25zIGZvciBub3dcbiAgICAgICAgTWF0My5mcm9tUXVhdChvdXQub3JpZW50YXRpb24sIHJvdCk7XG4gICAgICAgIFZlYzMubXVsdGlwbHkob3V0LmhhbGZFeHRlbnRzLCB0aGlzLmhhbGZFeHRlbnRzLCBzY2FsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRyYW5zZm9ybSBvdXQgYmFzZWQgb24gdGhpcyBvYmIgZGF0YS5cbiAgICAgKiAhI3poXG4gICAgICog5bCGIG91dCDmoLnmja7ov5nkuKogb2JiIOeahOaVsOaNrui/m+ihjOWPmOaNouOAglxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlQW5kUm90YXRlXG4gICAgICogQHBhcmFtIHtNYXQ0fSBtIFRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICogQHBhcmFtIHtRdWF0fSByb3QgVGhlIHJvdGF0aW5nIHBhcnQgb2YgdGhlIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7T2JifSBvdXQgVGFyZ2V0IG9mIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB0cmFuc2xhdGVBbmRSb3RhdGUgKG06IE1hdDQsIHJvdDogUXVhdCwgb3V0OiBvYmIpe1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LmNlbnRlciwgdGhpcy5jZW50ZXIsIG0pO1xuICAgICAgICAvLyBwYXJlbnQgc2hhcGUgZG9lc24ndCBjb250YWluIHJvdGF0aW9ucyBmb3Igbm93XG4gICAgICAgIE1hdDMuZnJvbVF1YXQob3V0Lm9yaWVudGF0aW9uLCByb3QpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTY2FsZSBvdXQgYmFzZWQgb24gdGhpcyBvYmIgZGF0YS5cbiAgICAgKiAhI3poXG4gICAgICog5bCGIG91dCDmoLnmja7ov5nkuKogb2JiIOeahOaVsOaNrui/m+ihjOe8qeaUvuOAglxuICAgICAqIEBtZXRob2Qgc2V0U2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHNjYWxlIFNjYWxlIHZhbHVlLlxuICAgICAqIEBwYXJhbSB7T2JifSBvdXQgU2NhbGVkIHRhcmdldC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0U2NhbGUgKHNjYWxlOiBWZWMzLCBvdXQ6IG9iYikge1xuICAgICAgICBWZWMzLm11bHRpcGx5KG91dC5oYWxmRXh0ZW50cywgdGhpcy5oYWxmRXh0ZW50cywgc2NhbGUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9