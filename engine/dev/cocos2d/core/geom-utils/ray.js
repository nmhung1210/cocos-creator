
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/ray.js';
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

/**
 * !#en
 * ray
 * !#zh
 * 射线。
 * @class geomUtils.Ray
 */
var ray = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new ray
   * !#zh
   * 创建一条射线。
   * @method create
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   * @return {Ray}
   */
  ray.create = function create(ox, oy, oz, dx, dy, dz) {
    if (ox === void 0) {
      ox = 0;
    }

    if (oy === void 0) {
      oy = 0;
    }

    if (oz === void 0) {
      oz = 0;
    }

    if (dx === void 0) {
      dx = 0;
    }

    if (dy === void 0) {
      dy = 0;
    }

    if (dz === void 0) {
      dz = 1;
    }

    return new ray(ox, oy, oz, dx, dy, dz);
  }
  /**
   * !#en
   * Creates a new ray initialized with values from an existing ray
   * !#zh
   * 从一条射线克隆出一条新的射线。
   * @method clone
   * @param {Ray} a Clone target
   * @return {Ray} Clone result
   */
  ;

  ray.clone = function clone(a) {
    return new ray(a.o.x, a.o.y, a.o.z, a.d.x, a.d.y, a.d.z);
  }
  /**
   * !#en
   * Copy the values from one ray to another
   * !#zh
   * 将从一个 ray 的值复制到另一个 ray。
   * @method copy
   * @param {Ray} out Accept the ray of the operation.
   * @param {Ray} a Copied ray.
   * @return {Ray} out Accept the ray of the operation.
   */
  ;

  ray.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.o, a.o);

    _valueTypes.Vec3.copy(out.d, a.d);

    return out;
  }
  /**
   * !#en
   * create a ray from two points
   * !#zh
   * 用两个点创建一条射线。
   * @method fromPoints
   * @param {Ray} out Receive the operating ray.
   * @param {Vec3} origin Origin of ray
   * @param {Vec3} target A point on a ray.
   * @return {Ray} out Receive the operating ray.
   */
  ;

  ray.fromPoints = function fromPoints(out, origin, target) {
    _valueTypes.Vec3.copy(out.o, origin);

    _valueTypes.Vec3.normalize(out.d, _valueTypes.Vec3.subtract(out.d, target, origin));

    return out;
  }
  /**
   * !#en
   * Set the components of a ray to the given values
   * !#zh
   * 将给定射线的属性设置为给定的值。
   * @method set
   * @param {Ray} out Receive the operating ray.
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   * @return {Ray} out Receive the operating ray.
   */
  ;

  ray.set = function set(out, ox, oy, oz, dx, dy, dz) {
    out.o.x = ox;
    out.o.y = oy;
    out.o.z = oz;
    out.d.x = dx;
    out.d.y = dy;
    out.d.z = dz;
    return out;
  }
  /**
   * !#en
   * Start point.
   * !#zh
   * 起点。
   * @property {Vec3} o
   */
  ;

  /**
   * !#en Construct a ray.
   * !#zh 构造一条射线。
   * @constructor
   * @param {number} ox The x part of the starting point.
   * @param {number} oy The y part of the starting point.
   * @param {number} oz The z part of the starting point.
   * @param {number} dx X in the direction.
   * @param {number} dy Y in the direction.
   * @param {number} dz Z in the direction.
   */
  function ray(ox, oy, oz, dx, dy, dz) {
    if (ox === void 0) {
      ox = 0;
    }

    if (oy === void 0) {
      oy = 0;
    }

    if (oz === void 0) {
      oz = 0;
    }

    if (dx === void 0) {
      dx = 0;
    }

    if (dy === void 0) {
      dy = 0;
    }

    if (dz === void 0) {
      dz = -1;
    }

    this.o = void 0;
    this.d = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_RAY;
    this.o = new _valueTypes.Vec3(ox, oy, oz);
    this.d = new _valueTypes.Vec3(dx, dy, dz);
  }
  /**
   * !#en Compute hit.
   * @method computeHit
   * @param {IVec3Like} out
   * @param {number} distance
   */


  var _proto = ray.prototype;

  _proto.computeHit = function computeHit(out, distance) {
    _valueTypes.Vec3.normalize(out, this.d);

    _valueTypes.Vec3.scaleAndAdd(out, this.o, out, distance);
  };

  return ray;
}();

exports["default"] = ray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvcmF5LnRzIl0sIm5hbWVzIjpbInJheSIsImNyZWF0ZSIsIm94Iiwib3kiLCJveiIsImR4IiwiZHkiLCJkeiIsImNsb25lIiwiYSIsIm8iLCJ4IiwieSIsInoiLCJkIiwiY29weSIsIm91dCIsIlZlYzMiLCJmcm9tUG9pbnRzIiwib3JpZ2luIiwidGFyZ2V0Iiwibm9ybWFsaXplIiwic3VidHJhY3QiLCJzZXQiLCJfdHlwZSIsImVudW1zIiwiU0hBUEVfUkFZIiwiY29tcHV0ZUhpdCIsImRpc3RhbmNlIiwic2NhbGVBbmRBZGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7Ozs7QUExQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkE7Ozs7Ozs7SUFPcUJBO0FBRWpCOzs7Ozs7Ozs7Ozs7OztNQWNjQyxTQUFkLGdCQUFzQkMsRUFBdEIsRUFBc0NDLEVBQXRDLEVBQXNEQyxFQUF0RCxFQUFzRUMsRUFBdEUsRUFBc0ZDLEVBQXRGLEVBQXNHQyxFQUF0RyxFQUEySDtBQUFBLFFBQXJHTCxFQUFxRztBQUFyR0EsTUFBQUEsRUFBcUcsR0FBeEYsQ0FBd0Y7QUFBQTs7QUFBQSxRQUFyRkMsRUFBcUY7QUFBckZBLE1BQUFBLEVBQXFGLEdBQXhFLENBQXdFO0FBQUE7O0FBQUEsUUFBckVDLEVBQXFFO0FBQXJFQSxNQUFBQSxFQUFxRSxHQUF4RCxDQUF3RDtBQUFBOztBQUFBLFFBQXJEQyxFQUFxRDtBQUFyREEsTUFBQUEsRUFBcUQsR0FBeEMsQ0FBd0M7QUFBQTs7QUFBQSxRQUFyQ0MsRUFBcUM7QUFBckNBLE1BQUFBLEVBQXFDLEdBQXhCLENBQXdCO0FBQUE7O0FBQUEsUUFBckJDLEVBQXFCO0FBQXJCQSxNQUFBQSxFQUFxQixHQUFSLENBQVE7QUFBQTs7QUFDdkgsV0FBTyxJQUFJUCxHQUFKLENBQVFFLEVBQVIsRUFBWUMsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JD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LElBQUlPLGdCQUFKLENBQVNmLEVBQVQsRUFBYUMsRUFBYixFQUFpQkMsRUFBakIsQ0FBVDtBQUNBLFNBQUtVLENBQUwsR0FBUyxJQUFJRyxnQkFBSixDQUFTWixFQUFULEVBQWFDLEVBQWIsRUFBaUJDLEVBQWpCLENBQVQ7QUFDSDtBQUVEOzs7Ozs7Ozs7O1NBTU9vQixhQUFQLG9CQUFtQlgsR0FBbkIsRUFBbUNZLFFBQW5DLEVBQXFEO0FBQ2pEWCxxQkFBS0ksU0FBTCxDQUFlTCxHQUFmLEVBQW9CLEtBQUtGLENBQXpCOztBQUNBRyxxQkFBS1ksV0FBTCxDQUFpQmIsR0FBakIsRUFBc0IsS0FBS04sQ0FBM0IsRUFBOEJNLEdBQTlCLEVBQW1DWSxRQUFuQztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XG5pbXBvcnQgeyBJVmVjM0xpa2UgfSBmcm9tICcuLi92YWx1ZS10eXBlcy9tYXRoJztcblxuLyoqXG4gKiAhI2VuXG4gKiByYXlcbiAqICEjemhcbiAqIOWwhOe6v+OAglxuICogQGNsYXNzIGdlb21VdGlscy5SYXlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcmF5IHtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBjcmVhdGUgYSBuZXcgcmF5XG4gICAgICogISN6aFxuICAgICAqIOWIm+W7uuS4gOadoeWwhOe6v+OAglxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG94IFRoZSB4IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveSBUaGUgeSBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3ogVGhlIHogcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR4IFggaW4gdGhlIGRpcmVjdGlvbi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHkgWSBpbiB0aGUgZGlyZWN0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeiBaIGluIHRoZSBkaXJlY3Rpb24uXG4gICAgICogQHJldHVybiB7UmF5fVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlIChveDogbnVtYmVyID0gMCwgb3k6IG51bWJlciA9IDAsIG96OiBudW1iZXIgPSAwLCBkeDogbnVtYmVyID0gMCwgZHk6IG51bWJlciA9IDAsIGR6OiBudW1iZXIgPSAxKTogcmF5IHtcbiAgICAgICAgcmV0dXJuIG5ldyByYXkob3gsIG95LCBveiwgZHgsIGR5LCBkeik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENyZWF0ZXMgYSBuZXcgcmF5IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgcmF5XG4gICAgICogISN6aFxuICAgICAqIOS7juS4gOadoeWwhOe6v+WFi+mahuWHuuS4gOadoeaWsOeahOWwhOe6v+OAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge1JheX0gYSBDbG9uZSB0YXJnZXRcbiAgICAgKiBAcmV0dXJuIHtSYXl9IENsb25lIHJlc3VsdFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgKGE6IHJheSk6IHJheSB7XG4gICAgICAgIHJldHVybiBuZXcgcmF5KFxuICAgICAgICAgICAgYS5vLngsIGEuby55LCBhLm8ueixcbiAgICAgICAgICAgIGEuZC54LCBhLmQueSwgYS5kLnosXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSByYXkgdG8gYW5vdGhlclxuICAgICAqICEjemhcbiAgICAgKiDlsIbku47kuIDkuKogcmF5IOeahOWAvOWkjeWItuWIsOWPpuS4gOS4qiByYXnjgIJcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAcGFyYW0ge1JheX0gb3V0IEFjY2VwdCB0aGUgcmF5IG9mIHRoZSBvcGVyYXRpb24uXG4gICAgICogQHBhcmFtIHtSYXl9IGEgQ29waWVkIHJheS5cbiAgICAgKiBAcmV0dXJuIHtSYXl9IG91dCBBY2NlcHQgdGhlIHJheSBvZiB0aGUgb3BlcmF0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0OiByYXksIGE6IHJheSk6IHJheSB7XG4gICAgICAgIFZlYzMuY29weShvdXQubywgYS5vKTtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5kLCBhLmQpO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIHJheSBmcm9tIHR3byBwb2ludHNcbiAgICAgKiAhI3poXG4gICAgICog55So5Lik5Liq54K55Yib5bu65LiA5p2h5bCE57q/44CCXG4gICAgICogQG1ldGhvZCBmcm9tUG9pbnRzXG4gICAgICogQHBhcmFtIHtSYXl9IG91dCBSZWNlaXZlIHRoZSBvcGVyYXRpbmcgcmF5LlxuICAgICAqIEBwYXJhbSB7VmVjM30gb3JpZ2luIE9yaWdpbiBvZiByYXlcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHRhcmdldCBBIHBvaW50IG9uIGEgcmF5LlxuICAgICAqIEByZXR1cm4ge1JheX0gb3V0IFJlY2VpdmUgdGhlIG9wZXJhdGluZyByYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUG9pbnRzIChvdXQ6IHJheSwgb3JpZ2luOiBWZWMzLCB0YXJnZXQ6IFZlYzMpOiByYXkge1xuICAgICAgICBWZWMzLmNvcHkob3V0Lm8sIG9yaWdpbik7XG4gICAgICAgIFZlYzMubm9ybWFsaXplKG91dC5kLCBWZWMzLnN1YnRyYWN0KG91dC5kLCB0YXJnZXQsIG9yaWdpbikpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSByYXkgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgICAqICEjemhcbiAgICAgKiDlsIbnu5nlrprlsITnur/nmoTlsZ7mgKforr7nva7kuLrnu5nlrprnmoTlgLzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7UmF5fSBvdXQgUmVjZWl2ZSB0aGUgb3BlcmF0aW5nIHJheS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3ggVGhlIHggcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG95IFRoZSB5IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHggWCBpbiB0aGUgZGlyZWN0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeSBZIGluIHRoZSBkaXJlY3Rpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR6IFogaW4gdGhlIGRpcmVjdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtSYXl9IG91dCBSZWNlaXZlIHRoZSBvcGVyYXRpbmcgcmF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0IChvdXQ6IHJheSwgb3g6IG51bWJlciwgb3k6IG51bWJlciwgb3o6IG51bWJlciwgZHg6IG51bWJlciwgZHk6IG51bWJlciwgZHo6IG51bWJlcik6IHJheSB7XG4gICAgICAgIG91dC5vLnggPSBveDtcbiAgICAgICAgb3V0Lm8ueSA9IG95O1xuICAgICAgICBvdXQuby56ID0gb3o7XG4gICAgICAgIG91dC5kLnggPSBkeDtcbiAgICAgICAgb3V0LmQueSA9IGR5O1xuICAgICAgICBvdXQuZC56ID0gZHo7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU3RhcnQgcG9pbnQuXG4gICAgICogISN6aFxuICAgICAqIOi1t+eCueOAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gb1xuICAgICAqL1xuICAgIHB1YmxpYyBvOiBWZWMzO1xuXG4gICAgLyoqXG4gICAgICogISNlXG4gICAgICogRGlyZWN0aW9uXG4gICAgICogISN6aFxuICAgICAqIOaWueWQkeOAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gZFxuICAgICAqL1xuICAgIHB1YmxpYyBkOiBWZWMzO1xuXG4gICAgcHJpdmF0ZSBfdHlwZTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBDb25zdHJ1Y3QgYSByYXkuXG4gICAgICogISN6aCDmnoTpgKDkuIDmnaHlsITnur/jgIJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb3ggVGhlIHggcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG95IFRoZSB5IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBveiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHggWCBpbiB0aGUgZGlyZWN0aW9uLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkeSBZIGluIHRoZSBkaXJlY3Rpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGR6IFogaW4gdGhlIGRpcmVjdGlvbi5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAob3g6IG51bWJlciA9IDAsIG95OiBudW1iZXIgPSAwLCBvejogbnVtYmVyID0gMCxcbiAgICAgICAgZHg6IG51bWJlciA9IDAsIGR5OiBudW1iZXIgPSAwLCBkejogbnVtYmVyID0gLTEpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IGVudW1zLlNIQVBFX1JBWTtcbiAgICAgICAgdGhpcy5vID0gbmV3IFZlYzMob3gsIG95LCBveik7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBWZWMzKGR4LCBkeSwgZHopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29tcHV0ZSBoaXQuXG4gICAgICogQG1ldGhvZCBjb21wdXRlSGl0XG4gICAgICogQHBhcmFtIHtJVmVjM0xpa2V9IG91dFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZVxuICAgICAqL1xuICAgIHB1YmxpYyBjb21wdXRlSGl0IChvdXQ6IElWZWMzTGlrZSwgZGlzdGFuY2U6IG51bWJlcikge1xuICAgICAgICBWZWMzLm5vcm1hbGl6ZShvdXQsIHRoaXMuZClcbiAgICAgICAgVmVjMy5zY2FsZUFuZEFkZChvdXQsIHRoaXMubywgb3V0LCBkaXN0YW5jZSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=