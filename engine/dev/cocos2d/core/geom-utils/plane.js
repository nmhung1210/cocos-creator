
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/plane.js';
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
var v1 = new _valueTypes.Vec3(0, 0, 0);
var v2 = new _valueTypes.Vec3(0, 0, 0);
var temp_mat = cc.mat4();
var temp_vec4 = cc.v4();
/**
 * !#en
 * plane。
 * !#zh
 * 平面。
 * @class geomUtils.Plane
 */

var plane = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new plane
   * !#zh
   * 创建一个新的 plane。
   * @method create
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   * @return {Plane}
   */
  plane.create = function create(nx, ny, nz, d) {
    return new plane(nx, ny, nz, d);
  }
  /**
   * !#en
   * clone a new plane
   * !#zh
   * 克隆一个新的 plane。
   * @method clone
   * @param {Plane} p The source of cloning.
   * @return {Plane} The cloned object.
   */
  ;

  plane.clone = function clone(p) {
    return new plane(p.n.x, p.n.y, p.n.z, p.d);
  }
  /**
   * !#en
   * copy the values from one plane to another
   * !#zh
   * 复制一个平面的值到另一个。
   * @method copy
   * @param {Plane} out The object that accepts the action.
   * @param {Plane} p The source of the copy.
   * @return {Plane} The object that accepts the action.
   */
  ;

  plane.copy = function copy(out, p) {
    _valueTypes.Vec3.copy(out.n, p.n);

    out.d = p.d;
    return out;
  }
  /**
   * !#en
   * create a plane from three points
   * !#zh
   * 用三个点创建一个平面。
   * @method fromPoints
   * @param {Plane} out The object that accepts the action.
   * @param {Vec3} a Point a。
   * @param {Vec3} b Point b。
   * @param {Vec3} c Point c。
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.fromPoints = function fromPoints(out, a, b, c) {
    _valueTypes.Vec3.subtract(v1, b, a);

    _valueTypes.Vec3.subtract(v2, c, a);

    _valueTypes.Vec3.normalize(out.n, _valueTypes.Vec3.cross(out.n, v1, v2));

    out.d = _valueTypes.Vec3.dot(out.n, a);
    return out;
  }
  /**
   * !#en
   * Set the components of a plane to the given values
   * !#zh
   * 将给定平面的属性设置为给定值。
   * @method set
   * @param {Plane} out The object that accepts the action.
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.set = function set(out, nx, ny, nz, d) {
    out.n.x = nx;
    out.n.y = ny;
    out.n.z = nz;
    out.d = d;
    return out;
  }
  /**
   * !#en
   * create plane from normal and point
   * !#zh
   * 用一条法线和一个点创建平面。
   * @method fromNormalAndPoint
   * @param {Plane} out The object that accepts the action.
   * @param {Vec3} normal The normal of a plane.
   * @param {Vec3} point A point on the plane.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.fromNormalAndPoint = function fromNormalAndPoint(out, normal, point) {
    _valueTypes.Vec3.copy(out.n, normal);

    out.d = _valueTypes.Vec3.dot(normal, point);
    return out;
  }
  /**
   * !#en
   * normalize a plane
   * !#zh
   * 归一化一个平面。
   * @method normalize
   * @param {Plane} out The object that accepts the action.
   * @param {Plane} a Source data for operations.
   * @return {Plane} out The object that accepts the action.
   */
  ;

  plane.normalize = function normalize(out, a) {
    var len = a.n.len();

    _valueTypes.Vec3.normalize(out.n, a.n);

    if (len > 0) {
      out.d = a.d / len;
    }

    return out;
  }
  /**
   * !#en
   * A normal vector.
   * !#zh
   * 法线向量。
   * @property {Vec3} n
   */
  ;

  /**
   * !#en Construct a plane.
   * !#zh 构造一个平面。
   * @constructor
   * @param {Number} nx The x part of the normal component.
   * @param {Number} ny The y part of the normal component.
   * @param {Number} nz The z part of the normal component.
   * @param {Number} d Distance from the origin.
   */
  function plane(nx, ny, nz, d) {
    if (nx === void 0) {
      nx = 0;
    }

    if (ny === void 0) {
      ny = 1;
    }

    if (nz === void 0) {
      nz = 0;
    }

    if (d === void 0) {
      d = 0;
    }

    this.n = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_PLANE;
    this.n = new _valueTypes.Vec3(nx, ny, nz);
    this.d = d;
  }
  /**
   * !#en
   * Transform a plane.
   * !#zh
   * 变换一个平面。
   * @method transform
   * @param {Mat4} mat
   */


  var _proto = plane.prototype;

  _proto.transform = function transform(mat) {
    _valueTypes.Mat4.invert(temp_mat, mat);

    _valueTypes.Mat4.transpose(temp_mat, temp_mat);

    _valueTypes.Vec4.set(temp_vec4, this.n.x, this.n.y, this.n.z, this.d);

    _valueTypes.Vec4.transformMat4(temp_vec4, temp_vec4, temp_mat);

    _valueTypes.Vec3.set(this.n, temp_vec4.x, temp_vec4.y, temp_vec4.z);

    this.d = temp_vec4.w;
  };

  return plane;
}();

exports["default"] = plane;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvcGxhbmUudHMiXSwibmFtZXMiOlsidjEiLCJWZWMzIiwidjIiLCJ0ZW1wX21hdCIsImNjIiwibWF0NCIsInRlbXBfdmVjNCIsInY0IiwicGxhbmUiLCJjcmVhdGUiLCJueCIsIm55IiwibnoiLCJkIiwiY2xvbmUiLCJwIiwibiIsIngiLCJ5IiwieiIsImNvcHkiLCJvdXQiLCJmcm9tUG9pbnRzIiwiYSIsImIiLCJjIiwic3VidHJhY3QiLCJub3JtYWxpemUiLCJjcm9zcyIsImRvdCIsInNldCIsImZyb21Ob3JtYWxBbmRQb2ludCIsIm5vcm1hbCIsInBvaW50IiwibGVuIiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX1BMQU5FIiwidHJhbnNmb3JtIiwibWF0IiwiTWF0NCIsImludmVydCIsInRyYW5zcG9zZSIsIlZlYzQiLCJ0cmFuc2Zvcm1NYXQ0IiwidyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7OztBQTFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLElBQU1BLEVBQUUsR0FBRyxJQUFJQyxnQkFBSixDQUFTLENBQVQsRUFBWSxDQUFaLEVBQWUsQ0FBZixDQUFYO0FBQ0EsSUFBTUMsRUFBRSxHQUFHLElBQUlELGdCQUFKLENBQVMsQ0FBVCxFQUFZLENBQVosRUFBZSxDQUFmLENBQVg7QUFDQSxJQUFNRSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxFQUFqQjtBQUNBLElBQU1DLFNBQVMsR0FBR0YsRUFBRSxDQUFDRyxFQUFILEVBQWxCO0FBRUE7Ozs7Ozs7O0lBT3FCQztBQUVqQjs7Ozs7Ozs7Ozs7O1FBWWNDLFNBQWQsZ0JBQXNCQyxFQUF0QixFQUFrQ0MsRUFBbEMsRUFBOENDLEVBQTlDLEVBQTBEQyxDQUExRCxFQUFxRTtBQUNqRSxXQUFPLElBQUlMLEtBQUosQ0FBVUUsRUFBVixFQUFjQyxFQUFkLEVBQWtCQyxFQUFsQixFQUFzQkMsQ0FB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OlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IE1hdDQsIFZlYzMsIFZlYzQgfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XG5cbmNvbnN0IHYxID0gbmV3IFZlYzMoMCwgMCwgMCk7XG5jb25zdCB2MiA9IG5ldyBWZWMzKDAsIDAsIDApO1xuY29uc3QgdGVtcF9tYXQgPSBjYy5tYXQ0KCk7XG5jb25zdCB0ZW1wX3ZlYzQgPSBjYy52NCgpO1xuXG4vKipcbiAqICEjZW5cbiAqIHBsYW5l44CCXG4gKiAhI3poXG4gKiDlubPpnaLjgIJcbiAqIEBjbGFzcyBnZW9tVXRpbHMuUGxhbmVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGxhbmUge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIG5ldyBwbGFuZVxuICAgICAqICEjemhcbiAgICAgKiDliJvlu7rkuIDkuKrmlrDnmoQgcGxhbmXjgIJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueCBUaGUgeCBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueSBUaGUgeSBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueiBUaGUgeiBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIERpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi5cbiAgICAgKiBAcmV0dXJuIHtQbGFuZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAobng6IG51bWJlciwgbnk6IG51bWJlciwgbno6IG51bWJlciwgZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgcGxhbmUobngsIG55LCBueiwgZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNsb25lIGEgbmV3IHBsYW5lXG4gICAgICogISN6aFxuICAgICAqIOWFi+mahuS4gOS4quaWsOeahCBwbGFuZeOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBwIFRoZSBzb3VyY2Ugb2YgY2xvbmluZy5cbiAgICAgKiBAcmV0dXJuIHtQbGFuZX0gVGhlIGNsb25lZCBvYmplY3QuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSAocDogcGxhbmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBwbGFuZShwLm4ueCwgcC5uLnksIHAubi56LCBwLmQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBjb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcGxhbmUgdG8gYW5vdGhlclxuICAgICAqICEjemhcbiAgICAgKiDlpI3liLbkuIDkuKrlubPpnaLnmoTlgLzliLDlj6bkuIDkuKrjgIJcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBwIFRoZSBzb3VyY2Ugb2YgdGhlIGNvcHkuXG4gICAgICogQHJldHVybiB7UGxhbmV9IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb3B5IChvdXQ6IHBsYW5lLCBwOiBwbGFuZSkge1xuICAgICAgICBWZWMzLmNvcHkob3V0Lm4sIHAubik7XG4gICAgICAgIG91dC5kID0gcC5kO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIHBsYW5lIGZyb20gdGhyZWUgcG9pbnRzXG4gICAgICogISN6aFxuICAgICAqIOeUqOS4ieS4queCueWIm+W7uuS4gOS4quW5s+mdouOAglxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xuICAgICAqIEBwYXJhbSB7UGxhbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7VmVjM30gYSBQb2ludCBh44CCXG4gICAgICogQHBhcmFtIHtWZWMzfSBiIFBvaW50IGLjgIJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGMgUG9pbnQgY+OAglxuICAgICAqIEByZXR1cm4ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dDogcGxhbmUsIGE6IFZlYzMsIGI6IFZlYzMsIGM6IFZlYzMpIHtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdCh2MSwgYiwgYSk7XG4gICAgICAgIFZlYzMuc3VidHJhY3QodjIsIGMsIGEpO1xuXG4gICAgICAgIFZlYzMubm9ybWFsaXplKG91dC5uLCBWZWMzLmNyb3NzKG91dC5uLCB2MSwgdjIpKTtcbiAgICAgICAgb3V0LmQgPSBWZWMzLmRvdChvdXQubiwgYSk7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgcGxhbmUgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgICAqICEjemhcbiAgICAgKiDlsIbnu5nlrprlubPpnaLnmoTlsZ7mgKforr7nva7kuLrnu5nlrprlgLzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7UGxhbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueCBUaGUgeCBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueSBUaGUgeSBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBueiBUaGUgeiBwYXJ0IG9mIHRoZSBub3JtYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIERpc3RhbmNlIGZyb20gdGhlIG9yaWdpbi5cbiAgICAgKiBAcmV0dXJuIHtQbGFuZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKG91dDogcGxhbmUsIG54OiBudW1iZXIsIG55OiBudW1iZXIsIG56OiBudW1iZXIsIGQ6IG51bWJlcikge1xuICAgICAgICBvdXQubi54ID0gbng7XG4gICAgICAgIG91dC5uLnkgPSBueTtcbiAgICAgICAgb3V0Lm4ueiA9IG56O1xuICAgICAgICBvdXQuZCA9IGQ7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogY3JlYXRlIHBsYW5lIGZyb20gbm9ybWFsIGFuZCBwb2ludFxuICAgICAqICEjemhcbiAgICAgKiDnlKjkuIDmnaHms5Xnur/lkozkuIDkuKrngrnliJvlu7rlubPpnaLjgIJcbiAgICAgKiBAbWV0aG9kIGZyb21Ob3JtYWxBbmRQb2ludFxuICAgICAqIEBwYXJhbSB7UGxhbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7VmVjM30gbm9ybWFsIFRoZSBub3JtYWwgb2YgYSBwbGFuZS5cbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHBvaW50IEEgcG9pbnQgb24gdGhlIHBsYW5lLlxuICAgICAqIEByZXR1cm4ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21Ob3JtYWxBbmRQb2ludCAob3V0OiBwbGFuZSwgbm9ybWFsOiBWZWMzLCBwb2ludDogVmVjMykge1xuICAgICAgICBWZWMzLmNvcHkob3V0Lm4sIG5vcm1hbCk7XG4gICAgICAgIG91dC5kID0gVmVjMy5kb3Qobm9ybWFsLCBwb2ludCk7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogbm9ybWFsaXplIGEgcGxhbmVcbiAgICAgKiAhI3poXG4gICAgICog5b2S5LiA5YyW5LiA5Liq5bmz6Z2i44CCXG4gICAgICogQG1ldGhvZCBub3JtYWxpemVcbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge1BsYW5lfSBhIFNvdXJjZSBkYXRhIGZvciBvcGVyYXRpb25zLlxuICAgICAqIEByZXR1cm4ge1BsYW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG5vcm1hbGl6ZSAob3V0OiBwbGFuZSwgYTogcGxhbmUpIHtcbiAgICAgICAgY29uc3QgbGVuID0gYS5uLmxlbigpO1xuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQubiwgYS5uKTtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIG91dC5kID0gYS5kIC8gbGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEEgbm9ybWFsIHZlY3Rvci5cbiAgICAgKiAhI3poXG4gICAgICog5rOV57q/5ZCR6YeP44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBuXG4gICAgICovXG4gICAgcHVibGljIG46IFZlYzM7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGRpc3RhbmNlIGZyb20gdGhlIG9yaWdpbiB0byB0aGUgcGxhbmUuXG4gICAgICogISN6aFxuICAgICAqIOWOn+eCueWIsOW5s+mdoueahOi3neemu+OAglxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkXG4gICAgICovXG4gICAgcHVibGljIGQ6IG51bWJlcjtcblxuICAgIHByaXZhdGUgX3R5cGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29uc3RydWN0IGEgcGxhbmUuXG4gICAgICogISN6aCDmnoTpgKDkuIDkuKrlubPpnaLjgIJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnggVGhlIHggcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnkgVGhlIHkgcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbnogVGhlIHogcGFydCBvZiB0aGUgbm9ybWFsIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZCBEaXN0YW5jZSBmcm9tIHRoZSBvcmlnaW4uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKG54ID0gMCwgbnkgPSAxLCBueiA9IDAsIGQgPSAwKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBlbnVtcy5TSEFQRV9QTEFORTtcbiAgICAgICAgdGhpcy5uID0gbmV3IFZlYzMobngsIG55LCBueik7XG4gICAgICAgIHRoaXMuZCA9IGQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRyYW5zZm9ybSBhIHBsYW5lLlxuICAgICAqICEjemhcbiAgICAgKiDlj5jmjaLkuIDkuKrlubPpnaLjgIJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7TWF0NH0gbWF0XG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybSAobWF0OiBNYXQ0KTogdm9pZCB7XG4gICAgICAgIE1hdDQuaW52ZXJ0KHRlbXBfbWF0LCBtYXQpO1xuICAgICAgICBNYXQ0LnRyYW5zcG9zZSh0ZW1wX21hdCwgdGVtcF9tYXQpO1xuICAgICAgICBWZWM0LnNldCh0ZW1wX3ZlYzQsIHRoaXMubi54LCB0aGlzLm4ueSwgdGhpcy5uLnosIHRoaXMuZCk7XG4gICAgICAgIFZlYzQudHJhbnNmb3JtTWF0NCh0ZW1wX3ZlYzQsIHRlbXBfdmVjNCwgdGVtcF9tYXQpO1xuICAgICAgICBWZWMzLnNldCh0aGlzLm4sIHRlbXBfdmVjNC54LCB0ZW1wX3ZlYzQueSwgdGVtcF92ZWM0LnopO1xuICAgICAgICB0aGlzLmQgPSB0ZW1wX3ZlYzQudztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==