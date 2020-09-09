
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/distance.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.point_plane = point_plane;
exports.pt_point_plane = pt_point_plane;
exports.pt_point_aabb = pt_point_aabb;
exports.pt_point_obb = pt_point_obb;

var _valueTypes = require("../value-types");

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
var X = new _valueTypes.Vec3();
var Y = new _valueTypes.Vec3();
var Z = new _valueTypes.Vec3();
var d = new _valueTypes.Vec3();
var min = new _valueTypes.Vec3();
var max = new _valueTypes.Vec3();
var u = new Array(3);
var e = new Array(3);
/**
 * Some helpful utilities
 * @module cc.geomUtils
 */

/**
 * !#en
 * the distance between a point and a plane
 * !#zh
 * 计算点和平面之间的距离。
 * @method point_plane
 * @param {Vec3} point
 * @param {Plane} plane
 * @return {Number} Distance
 */

function point_plane(point, plane_) {
  return _valueTypes.Vec3.dot(plane_.n, point) - plane_.d;
}
/**
 * !#en
 * the closest point on plane to a given point
 * !#zh
 * 计算平面上最接近给定点的点。
 * @method pt_point_plane
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Plane} plane
 * @return {Vec3} Closest point
 */


function pt_point_plane(out, point, plane_) {
  var t = point_plane(point, plane_);
  return _valueTypes.Vec3.subtract(out, point, _valueTypes.Vec3.multiplyScalar(out, plane_.n, t));
}
/**
 * !#en
 * the closest point on aabb to a given point
 * !#zh
 * 计算 aabb 上最接近给定点的点。
 * @method pt_point_aabb
 * @param {Vec3} out Closest point.
 * @param {Vec3} point Given point.
 * @param {Aabb} aabb Align the axis around the box.
 * @return {Vec3} Closest point.
 */


function pt_point_aabb(out, point, aabb_) {
  _valueTypes.Vec3.copy(out, point);

  _valueTypes.Vec3.subtract(min, aabb_.center, aabb_.halfExtents);

  _valueTypes.Vec3.add(max, aabb_.center, aabb_.halfExtents);

  out.x = out.x < min.x ? min.x : out.x;
  out.y = out.y < min.x ? min.y : out.y;
  out.z = out.z < min.x ? min.z : out.z;
  out.x = out.x > max.x ? max.x : out.x;
  out.y = out.y > max.x ? max.y : out.y;
  out.z = out.z > max.x ? max.z : out.z;
  return out;
}
/**
 * !#en
 * the closest point on obb to a given point
 * !#zh
 * 计算 obb 上最接近给定点的点。
 * @method pt_point_obb
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Obb} obb Direction box
 * @return {Vec3} closest point
 */


function pt_point_obb(out, point, obb_) {
  var obbm = obb_.orientation.m;

  _valueTypes.Vec3.set(X, obbm[0], obbm[1], obbm[2]);

  _valueTypes.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);

  _valueTypes.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);

  u[0] = X;
  u[1] = Y;
  u[2] = Z;
  e[0] = obb_.halfExtents.x;
  e[1] = obb_.halfExtents.y;
  e[2] = obb_.halfExtents.z;

  _valueTypes.Vec3.subtract(d, point, obb_.center); // Start result at center of obb; make steps from there


  _valueTypes.Vec3.set(out, obb_.center.x, obb_.center.y, obb_.center.z); // For each OBB axis...


  for (var i = 0; i < 3; i++) {
    // ...project d onto that axis to get the distance
    // along the axis of d from the obb center
    var dist = _valueTypes.Vec3.dot(d, u[i]); // if distance farther than the obb extents, clamp to the obb


    if (dist > e[i]) {
      dist = e[i];
    }

    if (dist < -e[i]) {
      dist = -e[i];
    } // Step that distance along the axis to get world coordinate


    out.x += dist * u[i].x;
    out.y += dist * u[i].y;
    out.z += dist * u[i].z;
  }

  return out;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvZGlzdGFuY2UudHMiXSwibmFtZXMiOlsiWCIsIlZlYzMiLCJZIiwiWiIsImQiLCJtaW4iLCJtYXgiLCJ1IiwiQXJyYXkiLCJlIiwicG9pbnRfcGxhbmUiLCJwb2ludCIsInBsYW5lXyIsImRvdCIsIm4iLCJwdF9wb2ludF9wbGFuZSIsIm91dCIsInQiLCJzdWJ0cmFjdCIsIm11bHRpcGx5U2NhbGFyIiwicHRfcG9pbnRfYWFiYiIsImFhYmJfIiwiY29weSIsImNlbnRlciIsImhhbGZFeHRlbnRzIiwiYWRkIiwieCIsInkiLCJ6IiwicHRfcG9pbnRfb2JiIiwib2JiXyIsIm9iYm0iLCJvcmllbnRhdGlvbiIsIm0iLCJzZXQiLCJpIiwiZGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxJQUFNQSxDQUFDLEdBQUcsSUFBSUMsZ0JBQUosRUFBVjtBQUNBLElBQU1DLENBQUMsR0FBRyxJQUFJRCxnQkFBSixFQUFWO0FBQ0EsSUFBTUUsQ0FBQyxHQUFHLElBQUlGLGdCQUFKLEVBQVY7QUFDQSxJQUFNRyxDQUFDLEdBQUcsSUFBSUgsZ0JBQUosRUFBVjtBQUNBLElBQU1JLEdBQUcsR0FBRyxJQUFJSixnQkFBSixFQUFaO0FBQ0EsSUFBTUssR0FBRyxHQUFHLElBQUlMLGdCQUFKLEVBQVo7QUFDQSxJQUFNTSxDQUFDLEdBQUcsSUFBSUMsS0FBSixDQUFVLENBQVYsQ0FBVjtBQUNBLElBQU1DLENBQUMsR0FBRyxJQUFJRCxLQUFKLENBQVUsQ0FBVixDQUFWO0FBRUE7Ozs7O0FBS0E7Ozs7Ozs7Ozs7O0FBVU8sU0FBU0UsV0FBVCxDQUFzQkMsS0FBdEIsRUFBbUNDLE1BQW5DLEVBQWtEO0FBQ3JELFNBQU9YLGlCQUFLWSxHQUFMLENBQVNELE1BQU0sQ0FBQ0UsQ0FBaEIsRUFBbUJILEtBQW5CLElBQTRCQyxNQUFN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LENBQUMsQ0FBQzBCLENBQUQsQ0FBYixFQUFrQjtBQUNkQyxNQUFBQSxJQUFJLEdBQUcsQ0FBQzNCLENBQUMsQ0FBQzBCLENBQUQsQ0FBVDtBQUNILEtBWnVCLENBY3hCOzs7QUFDQW5CLElBQUFBLEdBQUcsQ0FBQ1UsQ0FBSixJQUFTVSxJQUFJLEdBQUc3QixDQUFDLENBQUM0QixDQUFELENBQUQsQ0FBS1QsQ0FBckI7QUFDQVYsSUFBQUEsR0FBRyxDQUFDVyxDQUFKLElBQVNTLElBQUksR0FBRzdCLENBQUMsQ0FBQzRCLENBQUQsQ0FBRCxDQUFLUixDQUFyQjtBQUNBWCxJQUFBQSxHQUFHLENBQUNZLENBQUosSUFBU1EsSUFBSSxHQUFHN0IsQ0FBQyxDQUFDNEIsQ0FBRCxDQUFELENBQUtQLENBQXJCO0FBQ0g7O0FBQ0QsU0FBT1osR0FBUDtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgYWFiYiBmcm9tICcuL2FhYmInO1xuaW1wb3J0IG9iYiBmcm9tICcuL29iYic7XG5pbXBvcnQgcGxhbmUgZnJvbSAnLi9wbGFuZSc7XG5jb25zdCBYID0gbmV3IFZlYzMoKTtcbmNvbnN0IFkgPSBuZXcgVmVjMygpO1xuY29uc3QgWiA9IG5ldyBWZWMzKCk7XG5jb25zdCBkID0gbmV3IFZlYzMoKTtcbmNvbnN0IG1pbiA9IG5ldyBWZWMzKCk7XG5jb25zdCBtYXggPSBuZXcgVmVjMygpO1xuY29uc3QgdSA9IG5ldyBBcnJheSgzKTtcbmNvbnN0IGUgPSBuZXcgQXJyYXkoMyk7XG5cbi8qKlxuICogU29tZSBoZWxwZnVsIHV0aWxpdGllc1xuICogQG1vZHVsZSBjYy5nZW9tVXRpbHNcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGEgcG9pbnQgYW5kIGEgcGxhbmVcbiAqICEjemhcbiAqIOiuoeeul+eCueWSjOW5s+mdouS5i+mXtOeahOi3neemu+OAglxuICogQG1ldGhvZCBwb2ludF9wbGFuZVxuICogQHBhcmFtIHtWZWMzfSBwb2ludFxuICogQHBhcmFtIHtQbGFuZX0gcGxhbmVcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvaW50X3BsYW5lIChwb2ludDogVmVjMywgcGxhbmVfOiBwbGFuZSkge1xuICAgIHJldHVybiBWZWMzLmRvdChwbGFuZV8ubiwgcG9pbnQpIC0gcGxhbmVfLmQ7XG59XG5cbi8qKlxuICogISNlblxuICogdGhlIGNsb3Nlc3QgcG9pbnQgb24gcGxhbmUgdG8gYSBnaXZlbiBwb2ludFxuICogISN6aFxuICog6K6h566X5bmz6Z2i5LiK5pyA5o6l6L+R57uZ5a6a54K555qE54K544CCXG4gKiBAbWV0aG9kIHB0X3BvaW50X3BsYW5lXG4gKiBAcGFyYW0ge1ZlYzN9IG91dCBDbG9zZXN0IHBvaW50XG4gKiBAcGFyYW0ge1ZlYzN9IHBvaW50IEdpdmVuIHBvaW50XG4gKiBAcGFyYW0ge1BsYW5lfSBwbGFuZVxuICogQHJldHVybiB7VmVjM30gQ2xvc2VzdCBwb2ludFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHRfcG9pbnRfcGxhbmUgKG91dDogVmVjMywgcG9pbnQ6IFZlYzMsIHBsYW5lXzogcGxhbmUpIHtcbiAgICBjb25zdCB0ID0gcG9pbnRfcGxhbmUocG9pbnQsIHBsYW5lXyk7XG4gICAgcmV0dXJuIFZlYzMuc3VidHJhY3Qob3V0LCBwb2ludCwgVmVjMy5tdWx0aXBseVNjYWxhcihvdXQsIHBsYW5lXy5uLCB0KSk7XG59XG5cbi8qKlxuICogISNlblxuICogdGhlIGNsb3Nlc3QgcG9pbnQgb24gYWFiYiB0byBhIGdpdmVuIHBvaW50XG4gKiAhI3poXG4gKiDorqHnrpcgYWFiYiDkuIrmnIDmjqXov5Hnu5nlrprngrnnmoTngrnjgIJcbiAqIEBtZXRob2QgcHRfcG9pbnRfYWFiYlxuICogQHBhcmFtIHtWZWMzfSBvdXQgQ2xvc2VzdCBwb2ludC5cbiAqIEBwYXJhbSB7VmVjM30gcG9pbnQgR2l2ZW4gcG9pbnQuXG4gKiBAcGFyYW0ge0FhYmJ9IGFhYmIgQWxpZ24gdGhlIGF4aXMgYXJvdW5kIHRoZSBib3guXG4gKiBAcmV0dXJuIHtWZWMzfSBDbG9zZXN0IHBvaW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHRfcG9pbnRfYWFiYiAob3V0OiBWZWMzLCBwb2ludDogVmVjMywgYWFiYl86IGFhYmIpOiBWZWMzIHtcbiAgICBWZWMzLmNvcHkob3V0LCBwb2ludCk7XG4gICAgVmVjMy5zdWJ0cmFjdChtaW4sIGFhYmJfLmNlbnRlciwgYWFiYl8uaGFsZkV4dGVudHMpO1xuICAgIFZlYzMuYWRkKG1heCwgYWFiYl8uY2VudGVyLCBhYWJiXy5oYWxmRXh0ZW50cyk7XG5cbiAgICBvdXQueCA9IChvdXQueCA8IG1pbi54KSA/IG1pbi54IDogb3V0Lng7XG4gICAgb3V0LnkgPSAob3V0LnkgPCBtaW4ueCkgPyBtaW4ueSA6IG91dC55O1xuICAgIG91dC56ID0gKG91dC56IDwgbWluLngpID8gbWluLnogOiBvdXQuejtcblxuICAgIG91dC54ID0gKG91dC54ID4gbWF4LngpID8gbWF4LnggOiBvdXQueDtcbiAgICBvdXQueSA9IChvdXQueSA+IG1heC54KSA/IG1heC55IDogb3V0Lnk7XG4gICAgb3V0LnogPSAob3V0LnogPiBtYXgueCkgPyBtYXgueiA6IG91dC56O1xuICAgIHJldHVybiBvdXQ7XG59XG5cbi8qKlxuICogISNlblxuICogdGhlIGNsb3Nlc3QgcG9pbnQgb24gb2JiIHRvIGEgZ2l2ZW4gcG9pbnRcbiAqICEjemhcbiAqIOiuoeeulyBvYmIg5LiK5pyA5o6l6L+R57uZ5a6a54K555qE54K544CCXG4gKiBAbWV0aG9kIHB0X3BvaW50X29iYlxuICogQHBhcmFtIHtWZWMzfSBvdXQgQ2xvc2VzdCBwb2ludFxuICogQHBhcmFtIHtWZWMzfSBwb2ludCBHaXZlbiBwb2ludFxuICogQHBhcmFtIHtPYmJ9IG9iYiBEaXJlY3Rpb24gYm94XG4gKiBAcmV0dXJuIHtWZWMzfSBjbG9zZXN0IHBvaW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwdF9wb2ludF9vYmIgKG91dDogVmVjMywgcG9pbnQ6IFZlYzMsIG9iYl86IG9iYik6IFZlYzMge1xuICAgIGxldCBvYmJtID0gb2JiXy5vcmllbnRhdGlvbi5tO1xuICAgIFZlYzMuc2V0KFgsIG9iYm1bMF0sIG9iYm1bMV0sIG9iYm1bMl0pO1xuICAgIFZlYzMuc2V0KFksIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pO1xuICAgIFZlYzMuc2V0KFosIG9iYm1bNl0sIG9iYm1bN10sIG9iYm1bOF0pO1xuXG4gICAgdVswXSA9IFg7XG4gICAgdVsxXSA9IFk7XG4gICAgdVsyXSA9IFo7XG4gICAgZVswXSA9IG9iYl8uaGFsZkV4dGVudHMueDtcbiAgICBlWzFdID0gb2JiXy5oYWxmRXh0ZW50cy55O1xuICAgIGVbMl0gPSBvYmJfLmhhbGZFeHRlbnRzLno7XG5cbiAgICBWZWMzLnN1YnRyYWN0KGQsIHBvaW50LCBvYmJfLmNlbnRlcik7XG5cbiAgICAvLyBTdGFydCByZXN1bHQgYXQgY2VudGVyIG9mIG9iYjsgbWFrZSBzdGVwcyBmcm9tIHRoZXJlXG4gICAgVmVjMy5zZXQob3V0LCBvYmJfLmNlbnRlci54LCBvYmJfLmNlbnRlci55LCBvYmJfLmNlbnRlci56KTtcblxuICAgIC8vIEZvciBlYWNoIE9CQiBheGlzLi4uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcblxuICAgICAgICAvLyAuLi5wcm9qZWN0IGQgb250byB0aGF0IGF4aXMgdG8gZ2V0IHRoZSBkaXN0YW5jZVxuICAgICAgICAvLyBhbG9uZyB0aGUgYXhpcyBvZiBkIGZyb20gdGhlIG9iYiBjZW50ZXJcbiAgICAgICAgbGV0IGRpc3QgPSBWZWMzLmRvdChkLCB1W2ldKTtcblxuICAgICAgICAvLyBpZiBkaXN0YW5jZSBmYXJ0aGVyIHRoYW4gdGhlIG9iYiBleHRlbnRzLCBjbGFtcCB0byB0aGUgb2JiXG4gICAgICAgIGlmIChkaXN0ID4gZVtpXSkge1xuICAgICAgICAgICAgZGlzdCA9IGVbaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRpc3QgPCAtZVtpXSkge1xuICAgICAgICAgICAgZGlzdCA9IC1lW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RlcCB0aGF0IGRpc3RhbmNlIGFsb25nIHRoZSBheGlzIHRvIGdldCB3b3JsZCBjb29yZGluYXRlXG4gICAgICAgIG91dC54ICs9IGRpc3QgKiB1W2ldLng7XG4gICAgICAgIG91dC55ICs9IGRpc3QgKiB1W2ldLnk7XG4gICAgICAgIG91dC56ICs9IGRpc3QgKiB1W2ldLno7XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==