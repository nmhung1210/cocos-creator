
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/intersect.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../../renderer/gfx"));

var _recyclePool = _interopRequireDefault(require("../../renderer/memop/recycle-pool"));

var _valueTypes = require("../value-types");

var _aabb = _interopRequireDefault(require("./aabb"));

var distance = _interopRequireWildcard(require("./distance"));

var _enums = _interopRequireDefault(require("./enums"));

var _ray = _interopRequireDefault(require("./ray"));

var _triangle = _interopRequireDefault(require("./triangle"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
 * @class geomUtils.intersect
 */
var ray_mesh = function () {
  var tri = _triangle["default"].create();

  var minDist = Infinity;

  function getVec3(out, data, idx, stride) {
    _valueTypes.Vec3.set(out, data[idx * stride], data[idx * stride + 1], data[idx * stride + 2]);
  }

  return function (ray, mesh) {
    minDist = Infinity;
    var subMeshes = mesh._subMeshes;

    for (var i = 0; i < subMeshes.length; i++) {
      if (subMeshes[i]._primitiveType !== _gfx["default"].PT_TRIANGLES) continue;
      var subData = mesh._subDatas[i] || mesh._subDatas[0];

      var posData = mesh._getAttrMeshData(i, _gfx["default"].ATTR_POSITION);

      var iData = subData.getIData(Uint16Array);
      var format = subData.vfm;
      var fmt = format.element(_gfx["default"].ATTR_POSITION);
      var num = fmt.num;

      for (var _i = 0; _i < iData.length; _i += 3) {
        getVec3(tri.a, posData, iData[_i], num);
        getVec3(tri.b, posData, iData[_i + 1], num);
        getVec3(tri.c, posData, iData[_i + 2], num);
        var dist = ray_triangle(ray, tri);

        if (dist > 0 && dist < minDist) {
          minDist = dist;
        }
      }
    }

    return minDist;
  };
}(); // adapt to old api


var rayMesh = ray_mesh;
/** 
 * !#en
 * Check whether ray intersect with nodes
 * !#zh
 * 检测射线是否与物体有交集
 * @static
 * @method ray_cast
 * @param {Node} root - If root is null, then traversal nodes from scene node
 * @param {geomUtils.Ray} worldRay
 * @param {Function} handler
 * @param {Function} filter
 * @return {[]} [{node, distance}]
*/

var ray_cast = function () {
  function traversal(node, cb) {
    var children = node.children;

    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      traversal(child, cb);
    }

    cb(node);
  }

  function cmp(a, b) {
    return a.distance - b.distance;
  }

  function transformMat4Normal(out, a, m) {
    var mm = m.m;
    var x = a.x,
        y = a.y,
        z = a.z,
        rhw = mm[3] * x + mm[7] * y + mm[11] * z;
    rhw = rhw ? 1 / rhw : 1;
    out.x = (mm[0] * x + mm[4] * y + mm[8] * z) * rhw;
    out.y = (mm[1] * x + mm[5] * y + mm[9] * z) * rhw;
    out.z = (mm[2] * x + mm[6] * y + mm[10] * z) * rhw;
    return out;
  }

  var resultsPool = new _recyclePool["default"](function () {
    return {
      distance: 0,
      node: null
    };
  }, 1);
  var results = []; // temp variable

  var nodeAabb = _aabb["default"].create();

  var minPos = new _valueTypes.Vec3();
  var maxPos = new _valueTypes.Vec3();
  var modelRay = new _ray["default"]();
  var m4_1 = cc.mat4();
  var m4_2 = cc.mat4();
  var d = new _valueTypes.Vec3();

  function distanceValid(distance) {
    return distance > 0 && distance < Infinity;
  }

  return function (root, worldRay, handler, filter) {
    resultsPool.reset();
    results.length = 0;
    root = root || cc.director.getScene();
    traversal(root, function (node) {
      if (filter && !filter(node)) return; // transform world ray to model ray

      _valueTypes.Mat4.invert(m4_2, node.getWorldMatrix(m4_1));

      _valueTypes.Vec3.transformMat4(modelRay.o, worldRay.o, m4_2);

      _valueTypes.Vec3.normalize(modelRay.d, transformMat4Normal(modelRay.d, worldRay.d, m4_2)); // raycast with bounding box


      var distance = Infinity;
      var component = node._renderComponent;

      if (component instanceof cc.MeshRenderer) {
        distance = ray_aabb(modelRay, component._boundingBox);
      } else if (node.width && node.height) {
        _valueTypes.Vec3.set(minPos, -node.width * node.anchorX, -node.height * node.anchorY, node.z);

        _valueTypes.Vec3.set(maxPos, node.width * (1 - node.anchorX), node.height * (1 - node.anchorY), node.z);

        _aabb["default"].fromPoints(nodeAabb, minPos, maxPos);

        distance = ray_aabb(modelRay, nodeAabb);
      }

      if (!distanceValid(distance)) return;

      if (handler) {
        distance = handler(modelRay, node, distance);
      }

      if (distanceValid(distance)) {
        _valueTypes.Vec3.scale(d, modelRay.d, distance);

        transformMat4Normal(d, d, m4_1);
        var res = resultsPool.add();
        res.node = node;
        res.distance = _valueTypes.Vec3.mag(d);
        results.push(res);
      }
    });
    results.sort(cmp);
    return results;
  };
}(); // adapt to old api


var raycast = ray_cast;
/**
 * !#en ray-plane intersect<br/>
 * !#zh 射线与平面的相交性检测。
 * @static
 * @method ray_plane
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */

var ray_plane = function () {
  var pt = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, plane) {
    var denom = _valueTypes.Vec3.dot(ray.d, plane.n);

    if (Math.abs(denom) < Number.EPSILON) {
      return 0;
    }

    _valueTypes.Vec3.multiplyScalar(pt, plane.n, plane.d);

    var t = _valueTypes.Vec3.dot(_valueTypes.Vec3.subtract(pt, pt, ray.o), plane.n) / denom;

    if (t < 0) {
      return 0;
    }

    return t;
  };
}();
/**
 * !#en line-plane intersect<br/>
 * !#zh 线段与平面的相交性检测。
 * @static
 * @method line_plane
 * @param {geomUtils.Line} line
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */


var line_plane = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  return function (line, plane) {
    _valueTypes.Vec3.subtract(ab, line.e, line.s);

    var t = (plane.d - _valueTypes.Vec3.dot(line.s, plane.n)) / _valueTypes.Vec3.dot(ab, plane.n);

    if (t < 0 || t > 1) {
      return 0;
    }

    return t;
  };
}(); // based on http://fileadmin.cs.lth.se/cs/Personal/Tomas_Akenine-Moller/raytri/

/**
 * !#en ray-triangle intersect<br/>
 * !#zh 射线与三角形的相交性检测。
 * @static
 * @method ray_triangle
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Triangle} triangle
 * @param {boolean} doubleSided
 * @return {number} 0 or not 0
 */


var ray_triangle = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  var ac = new _valueTypes.Vec3(0, 0, 0);
  var pvec = new _valueTypes.Vec3(0, 0, 0);
  var tvec = new _valueTypes.Vec3(0, 0, 0);
  var qvec = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, triangle, doubleSided) {
    _valueTypes.Vec3.subtract(ab, triangle.b, triangle.a);

    _valueTypes.Vec3.subtract(ac, triangle.c, triangle.a);

    _valueTypes.Vec3.cross(pvec, ray.d, ac);

    var det = _valueTypes.Vec3.dot(ab, pvec);

    if (det < Number.EPSILON && (!doubleSided || det > -Number.EPSILON)) {
      return 0;
    }

    var inv_det = 1 / det;

    _valueTypes.Vec3.subtract(tvec, ray.o, triangle.a);

    var u = _valueTypes.Vec3.dot(tvec, pvec) * inv_det;

    if (u < 0 || u > 1) {
      return 0;
    }

    _valueTypes.Vec3.cross(qvec, tvec, ab);

    var v = _valueTypes.Vec3.dot(ray.d, qvec) * inv_det;

    if (v < 0 || u + v > 1) {
      return 0;
    }

    var t = _valueTypes.Vec3.dot(ac, qvec) * inv_det;
    return t < 0 ? 0 : t;
  };
}(); // adapt to old api


var rayTriangle = ray_triangle;
/**
 * !#en line-triangle intersect<br/>
 * !#zh 线段与三角形的相交性检测。
 * @static
 * @method line_triangle
 * @param {geomUtils.Line} line
 * @param {geomUtils.Triangle} triangle
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */

var line_triangle = function () {
  var ab = new _valueTypes.Vec3(0, 0, 0);
  var ac = new _valueTypes.Vec3(0, 0, 0);
  var qp = new _valueTypes.Vec3(0, 0, 0);
  var ap = new _valueTypes.Vec3(0, 0, 0);
  var n = new _valueTypes.Vec3(0, 0, 0);
  var e = new _valueTypes.Vec3(0, 0, 0);
  return function (line, triangle, outPt) {
    _valueTypes.Vec3.subtract(ab, triangle.b, triangle.a);

    _valueTypes.Vec3.subtract(ac, triangle.c, triangle.a);

    _valueTypes.Vec3.subtract(qp, line.s, line.e);

    _valueTypes.Vec3.cross(n, ab, ac);

    var det = _valueTypes.Vec3.dot(qp, n);

    if (det <= 0.0) {
      return 0;
    }

    _valueTypes.Vec3.subtract(ap, line.s, triangle.a);

    var t = _valueTypes.Vec3.dot(ap, n);

    if (t < 0 || t > det) {
      return 0;
    }

    _valueTypes.Vec3.cross(e, qp, ap);

    var v = _valueTypes.Vec3.dot(ac, e);

    if (v < 0 || v > det) {
      return 0;
    }

    var w = -_valueTypes.Vec3.dot(ab, e);

    if (w < 0.0 || v + w > det) {
      return 0;
    }

    if (outPt) {
      var invDet = 1.0 / det;
      v *= invDet;
      w *= invDet;
      var u = 1.0 - v - w; // outPt = u*a + v*d + w*c;

      _valueTypes.Vec3.set(outPt, triangle.a.x * u + triangle.b.x * v + triangle.c.x * w, triangle.a.y * u + triangle.b.y * v + triangle.c.y * w, triangle.a.z * u + triangle.b.z * v + triangle.c.z * w);
    }

    return 1;
  };
}();
/**
 * !#en line-quad intersect<br/>
 * !#zh 线段与四边形的相交性检测。
 * @static
 * @method line_quad
 * @param {Vec3} p A point on a line segment
 * @param {Vec3} q Another point on the line segment
 * @param {Vec3} a Quadrilateral point a
 * @param {Vec3} b Quadrilateral point b
 * @param {Vec3} c Quadrilateral point c
 * @param {Vec3} d Quadrilateral point d
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */


var line_quad = function () {
  var pq = new _valueTypes.Vec3(0, 0, 0);
  var pa = new _valueTypes.Vec3(0, 0, 0);
  var pb = new _valueTypes.Vec3(0, 0, 0);
  var pc = new _valueTypes.Vec3(0, 0, 0);
  var pd = new _valueTypes.Vec3(0, 0, 0);
  var m = new _valueTypes.Vec3(0, 0, 0);
  var tmp = new _valueTypes.Vec3(0, 0, 0);
  return function (p, q, a, b, c, d, outPt) {
    _valueTypes.Vec3.subtract(pq, q, p);

    _valueTypes.Vec3.subtract(pa, a, p);

    _valueTypes.Vec3.subtract(pb, b, p);

    _valueTypes.Vec3.subtract(pc, c, p); // Determine which triangle to test against by testing against diagonal first


    _valueTypes.Vec3.cross(m, pc, pq);

    var v = _valueTypes.Vec3.dot(pa, m);

    if (v >= 0) {
      // Test intersection against triangle abc
      var u = -_valueTypes.Vec3.dot(pb, m);

      if (u < 0) {
        return 0;
      }

      var w = _valueTypes.Vec3.dot(_valueTypes.Vec3.cross(tmp, pq, pb), pa);

      if (w < 0) {
        return 0;
      } // outPt = u*a + v*b + w*c;


      if (outPt) {
        var denom = 1.0 / (u + v + w);
        u *= denom;
        v *= denom;
        w *= denom;

        _valueTypes.Vec3.set(outPt, a.x * u + b.x * v + c.x * w, a.y * u + b.y * v + c.y * w, a.z * u + b.z * v + c.z * w);
      }
    } else {
      // Test intersection against triangle dac
      _valueTypes.Vec3.subtract(pd, d, p);

      var _u = _valueTypes.Vec3.dot(pd, m);

      if (_u < 0) {
        return 0;
      }

      var _w = _valueTypes.Vec3.dot(_valueTypes.Vec3.cross(tmp, pq, pa), pd);

      if (_w < 0) {
        return 0;
      } // outPt = u*a + v*d + w*c;


      if (outPt) {
        v = -v;

        var _denom = 1.0 / (_u + v + _w);

        _u *= _denom;
        v *= _denom;
        _w *= _denom;

        _valueTypes.Vec3.set(outPt, a.x * _u + d.x * v + c.x * _w, a.y * _u + d.y * v + c.y * _w, a.z * _u + d.z * v + c.z * _w);
      }
    }

    return 1;
  };
}();
/**
 * !#en ray-sphere intersect<br/>
 * !#zh 射线和球的相交性检测。
 * @static
 * @method ray_sphere
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Sphere} sphere
 * @return {number} 0 or not 0
 */


var ray_sphere = function () {
  var e = new _valueTypes.Vec3(0, 0, 0);
  return function (ray, sphere) {
    var r = sphere.radius;
    var c = sphere.center;
    var o = ray.o;
    var d = ray.d;
    var rSq = r * r;

    _valueTypes.Vec3.subtract(e, c, o);

    var eSq = e.lengthSqr();

    var aLength = _valueTypes.Vec3.dot(e, d); // assume ray direction already normalized


    var fSq = rSq - (eSq - aLength * aLength);

    if (fSq < 0) {
      return 0;
    }

    var f = Math.sqrt(fSq);
    var t = eSq < rSq ? aLength + f : aLength - f;

    if (t < 0) {
      return 0;
    }

    return t;
  };
}();
/**
 * !#en ray-aabb intersect<br/>
 * !#zh 射线和轴对齐包围盒的相交性检测。
 * @static
 * @method ray_aabb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @return {number} 0 or not 0
 */


var ray_aabb = function () {
  var min = new _valueTypes.Vec3();
  var max = new _valueTypes.Vec3();
  return function (ray, aabb) {
    var o = ray.o,
        d = ray.d;
    var ix = 1 / d.x,
        iy = 1 / d.y,
        iz = 1 / d.z;

    _valueTypes.Vec3.subtract(min, aabb.center, aabb.halfExtents);

    _valueTypes.Vec3.add(max, aabb.center, aabb.halfExtents);

    var t1 = (min.x - o.x) * ix;
    var t2 = (max.x - o.x) * ix;
    var t3 = (min.y - o.y) * iy;
    var t4 = (max.y - o.y) * iy;
    var t5 = (min.z - o.z) * iz;
    var t6 = (max.z - o.z) * iz;
    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

    if (tmax < 0 || tmin > tmax) {
      return 0;
    }

    ;
    return tmin;
  };
}(); // adapt to old api


var rayAabb = ray_aabb;
/**
 * !#en ray-obb intersect<br/>
 * !#zh 射线和方向包围盒的相交性检测。
 * @static
 * @method ray_obb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or or 0
 */

var ray_obb = function () {
  var center = new _valueTypes.Vec3();
  var o = new _valueTypes.Vec3();
  var d = new _valueTypes.Vec3();
  var X = new _valueTypes.Vec3();
  var Y = new _valueTypes.Vec3();
  var Z = new _valueTypes.Vec3();
  var p = new _valueTypes.Vec3();
  var size = new Array(3);
  var f = new Array(3);
  var e = new Array(3);
  var t = new Array(6);
  return function (ray, obb) {
    size[0] = obb.halfExtents.x;
    size[1] = obb.halfExtents.y;
    size[2] = obb.halfExtents.z;
    center = obb.center;
    o = ray.o;
    d = ray.d;
    var obbm = obb.orientation.m;

    _valueTypes.Vec3.set(X, obbm[0], obbm[1], obbm[2]);

    _valueTypes.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);

    _valueTypes.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);

    _valueTypes.Vec3.subtract(p, center, o); // The cos values of the ray on the X, Y, Z


    f[0] = _valueTypes.Vec3.dot(X, d);
    f[1] = _valueTypes.Vec3.dot(Y, d);
    f[2] = _valueTypes.Vec3.dot(Z, d); // The projection length of P on X, Y, Z

    e[0] = _valueTypes.Vec3.dot(X, p);
    e[1] = _valueTypes.Vec3.dot(Y, p);
    e[2] = _valueTypes.Vec3.dot(Z, p);

    for (var i = 0; i < 3; ++i) {
      if (f[i] === 0) {
        if (-e[i] - size[i] > 0 || -e[i] + size[i] < 0) {
          return 0;
        } // Avoid div by 0!


        f[i] = 0.0000001;
      } // min


      t[i * 2 + 0] = (e[i] + size[i]) / f[i]; // max

      t[i * 2 + 1] = (e[i] - size[i]) / f[i];
    }

    var tmin = Math.max(Math.max(Math.min(t[0], t[1]), Math.min(t[2], t[3])), Math.min(t[4], t[5]));
    var tmax = Math.min(Math.min(Math.max(t[0], t[1]), Math.max(t[2], t[3])), Math.max(t[4], t[5]));

    if (tmax < 0 || tmin > tmax || tmin < 0) {
      return 0;
    }

    return tmin;
  };
}();
/**
 * !#en aabb-aabb intersect<br/>
 * !#zh 轴对齐包围盒和轴对齐包围盒的相交性检测。
 * @static
 * @method aabb_aabb
 * @param {geomUtils.Aabb} aabb1 Axis alignment surrounds box 1
 * @param {geomUtils.Aabb} aabb2 Axis alignment surrounds box 2
 * @return {number} 0 or not 0
 */


var aabb_aabb = function () {
  var aMin = new _valueTypes.Vec3();
  var aMax = new _valueTypes.Vec3();
  var bMin = new _valueTypes.Vec3();
  var bMax = new _valueTypes.Vec3();
  return function (aabb1, aabb2) {
    _valueTypes.Vec3.subtract(aMin, aabb1.center, aabb1.halfExtents);

    _valueTypes.Vec3.add(aMax, aabb1.center, aabb1.halfExtents);

    _valueTypes.Vec3.subtract(bMin, aabb2.center, aabb2.halfExtents);

    _valueTypes.Vec3.add(bMax, aabb2.center, aabb2.halfExtents);

    return aMin.x <= bMax.x && aMax.x >= bMin.x && aMin.y <= bMax.y && aMax.y >= bMin.y && aMin.z <= bMax.z && aMax.z >= bMin.z;
  };
}();

function getAABBVertices(min, max, out) {
  _valueTypes.Vec3.set(out[0], min.x, max.y, max.z);

  _valueTypes.Vec3.set(out[1], min.x, max.y, min.z);

  _valueTypes.Vec3.set(out[2], min.x, min.y, max.z);

  _valueTypes.Vec3.set(out[3], min.x, min.y, min.z);

  _valueTypes.Vec3.set(out[4], max.x, max.y, max.z);

  _valueTypes.Vec3.set(out[5], max.x, max.y, min.z);

  _valueTypes.Vec3.set(out[6], max.x, min.y, max.z);

  _valueTypes.Vec3.set(out[7], max.x, min.y, min.z);
}

function getOBBVertices(c, e, a1, a2, a3, out) {
  _valueTypes.Vec3.set(out[0], c.x + a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[1], c.x - a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[2], c.x + a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y + a3.z * e.z);

  _valueTypes.Vec3.set(out[3], c.x + a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[4], c.x - a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[5], c.x + a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[6], c.x - a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y - a3.z * e.z);

  _valueTypes.Vec3.set(out[7], c.x - a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y + a3.z * e.z);
}

function getInterval(vertices, axis) {
  var min = _valueTypes.Vec3.dot(axis, vertices[0]),
      max = min;

  for (var i = 1; i < 8; ++i) {
    var projection = _valueTypes.Vec3.dot(axis, vertices[i]);

    min = projection < min ? projection : min;
    max = projection > max ? projection : max;
  }

  return [min, max];
}
/**
 * !#en aabb-obb intersect<br/>
 * !#zh 轴对齐包围盒和方向包围盒的相交性检测。
 * @static
 * @method aabb_obb
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or not 0
 */


var aabb_obb = function () {
  var test = new Array(15);

  for (var i = 0; i < 15; i++) {
    test[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var vertices = new Array(8);
  var vertices2 = new Array(8);

  for (var _i2 = 0; _i2 < 8; _i2++) {
    vertices[_i2] = new _valueTypes.Vec3(0, 0, 0);
    vertices2[_i2] = new _valueTypes.Vec3(0, 0, 0);
  }

  var min = new _valueTypes.Vec3();
  var max = new _valueTypes.Vec3();
  return function (aabb, obb) {
    var obbm = obb.orientation.m;

    _valueTypes.Vec3.set(test[0], 1, 0, 0);

    _valueTypes.Vec3.set(test[1], 0, 1, 0);

    _valueTypes.Vec3.set(test[2], 0, 0, 1);

    _valueTypes.Vec3.set(test[3], obbm[0], obbm[1], obbm[2]);

    _valueTypes.Vec3.set(test[4], obbm[3], obbm[4], obbm[5]);

    _valueTypes.Vec3.set(test[5], obbm[6], obbm[7], obbm[8]);

    for (var _i3 = 0; _i3 < 3; ++_i3) {
      // Fill out rest of axis
      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 0], test[_i3], test[0]);

      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 1], test[_i3], test[1]);

      _valueTypes.Vec3.cross(test[6 + _i3 * 3 + 1], test[_i3], test[2]);
    }

    _valueTypes.Vec3.subtract(min, aabb.center, aabb.halfExtents);

    _valueTypes.Vec3.add(max, aabb.center, aabb.halfExtents);

    getAABBVertices(min, max, vertices);
    getOBBVertices(obb.center, obb.halfExtents, test[3], test[4], test[5], vertices2);

    for (var j = 0; j < 15; ++j) {
      var a = getInterval(vertices, test[j]);
      var b = getInterval(vertices2, test[j]);

      if (b[0] > a[1] || a[0] > b[1]) {
        return 0; // Seperating axis found
      }
    }

    return 1;
  };
}();
/**
 * !#en aabb-plane intersect<br/>
 * !#zh 轴对齐包围盒和平面的相交性检测。
 * @static
 * @method aabb_plane
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var aabb_plane = function aabb_plane(aabb, plane) {
  var r = aabb.halfExtents.x * Math.abs(plane.n.x) + aabb.halfExtents.y * Math.abs(plane.n.y) + aabb.halfExtents.z * Math.abs(plane.n.z);

  var dot = _valueTypes.Vec3.dot(plane.n, aabb.center);

  if (dot + r < plane.d) {
    return -1;
  } else if (dot - r > plane.d) {
    return 0;
  }

  return 1;
};
/**
 * !#en aabb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method aabb_frustum
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var aabb_frustum = function aabb_frustum(aabb, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (aabb_plane(aabb, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

/**
 * !#en aabb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method aabb_frustum_accurate
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number}
 */


var aabb_frustum_accurate = function () {
  var tmp = new Array(8);
  var out1 = 0,
      out2 = 0;

  for (var i = 0; i < tmp.length; i++) {
    tmp[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  return function (aabb, frustum) {
    var result = 0,
        intersects = false; // 1. aabb inside/outside frustum test

    for (var _i4 = 0; _i4 < frustum.planes.length; _i4++) {
      result = aabb_plane(aabb, frustum.planes[_i4]); // frustum plane normal points to the inside

      if (result === -1) {
        return 0;
      } // completely outside
      else if (result === 1) {
          intersects = true;
        }
    }

    if (!intersects) {
      return 1;
    } // completely inside
    // in case of false positives
    // 2. frustum inside/outside aabb test


    for (var _i5 = 0; _i5 < frustum.vertices.length; _i5++) {
      _valueTypes.Vec3.subtract(tmp[_i5], frustum.vertices[_i5], aabb.center);
    }

    out1 = 0, out2 = 0;

    for (var _i6 = 0; _i6 < frustum.vertices.length; _i6++) {
      if (tmp[_i6].x > aabb.halfExtents.x) {
        out1++;
      } else if (tmp[_i6].x < -aabb.halfExtents.x) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i7 = 0; _i7 < frustum.vertices.length; _i7++) {
      if (tmp[_i7].y > aabb.halfExtents.y) {
        out1++;
      } else if (tmp[_i7].y < -aabb.halfExtents.y) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i8 = 0; _i8 < frustum.vertices.length; _i8++) {
      if (tmp[_i8].z > aabb.halfExtents.z) {
        out1++;
      } else if (tmp[_i8].z < -aabb.halfExtents.z) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-point intersect<br/>
 * !#zh 方向包围盒和点的相交性检测。
 * @static
 * @method obb_point
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Vec3} point
 * @return {boolean} true or false
 */


var obb_point = function () {
  var tmp = new _valueTypes.Vec3(0, 0, 0),
      m3 = new _valueTypes.Mat3();

  var lessThan = function lessThan(a, b) {
    return Math.abs(a.x) < b.x && Math.abs(a.y) < b.y && Math.abs(a.z) < b.z;
  };

  return function (obb, point) {
    _valueTypes.Vec3.subtract(tmp, point, obb.center);

    _valueTypes.Vec3.transformMat3(tmp, tmp, _valueTypes.Mat3.transpose(m3, obb.orientation));

    return lessThan(tmp, obb.halfExtents);
  };
}();
/**
 * !#en obb-plane intersect<br/>
 * !#zh 方向包围盒和平面的相交性检测。
 * @static
 * @method obb_plane
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var obb_plane = function () {
  var absDot = function absDot(n, x, y, z) {
    return Math.abs(n.x * x + n.y * y + n.z * z);
  };

  return function (obb, plane) {
    var obbm = obb.orientation.m; // Real-Time Collision Detection, Christer Ericson, p. 163.

    var r = obb.halfExtents.x * absDot(plane.n, obbm[0], obbm[1], obbm[2]) + obb.halfExtents.y * absDot(plane.n, obbm[3], obbm[4], obbm[5]) + obb.halfExtents.z * absDot(plane.n, obbm[6], obbm[7], obbm[8]);

    var dot = _valueTypes.Vec3.dot(plane.n, obb.center);

    if (dot + r < plane.d) {
      return -1;
    } else if (dot - r > plane.d) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 方向包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method obb_frustum
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var obb_frustum = function obb_frustum(obb, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (obb_plane(obb, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/

/**
 * !#en obb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 方向包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method obb_frustum_accurate
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var obb_frustum_accurate = function () {
  var tmp = new Array(8);
  var dist = 0,
      out1 = 0,
      out2 = 0;

  for (var i = 0; i < tmp.length; i++) {
    tmp[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var dot = function dot(n, x, y, z) {
    return n.x * x + n.y * y + n.z * z;
  };

  return function (obb, frustum) {
    var result = 0,
        intersects = false; // 1. obb inside/outside frustum test

    for (var _i9 = 0; _i9 < frustum.planes.length; _i9++) {
      result = obb_plane(obb, frustum.planes[_i9]); // frustum plane normal points to the inside

      if (result === -1) {
        return 0;
      } // completely outside
      else if (result === 1) {
          intersects = true;
        }
    }

    if (!intersects) {
      return 1;
    } // completely inside
    // in case of false positives
    // 2. frustum inside/outside obb test


    for (var _i10 = 0; _i10 < frustum.vertices.length; _i10++) {
      _valueTypes.Vec3.subtract(tmp[_i10], frustum.vertices[_i10], obb.center);
    }

    out1 = 0, out2 = 0;
    var obbm = obb.orientation.m;

    for (var _i11 = 0; _i11 < frustum.vertices.length; _i11++) {
      dist = dot(tmp[_i11], obbm[0], obbm[1], obbm[2]);

      if (dist > obb.halfExtents.x) {
        out1++;
      } else if (dist < -obb.halfExtents.x) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i12 = 0; _i12 < frustum.vertices.length; _i12++) {
      dist = dot(tmp[_i12], obbm[3], obbm[4], obbm[5]);

      if (dist > obb.halfExtents.y) {
        out1++;
      } else if (dist < -obb.halfExtents.y) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    out1 = 0;
    out2 = 0;

    for (var _i13 = 0; _i13 < frustum.vertices.length; _i13++) {
      dist = dot(tmp[_i13], obbm[6], obbm[7], obbm[8]);

      if (dist > obb.halfExtents.z) {
        out1++;
      } else if (dist < -obb.halfExtents.z) {
        out2++;
      }
    }

    if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
      return 0;
    }

    return 1;
  };
}();
/**
 * !#en obb-obb intersect<br/>
 * !#zh 方向包围盒和方向包围盒的相交性检测。
 * @static
 * @method obb_obb
 * @param {geomUtils.Obb} obb1 Direction box1
 * @param {geomUtils.Obb} obb2 Direction box2
 * @return {number} 0 or not 0
 */


var obb_obb = function () {
  var test = new Array(15);

  for (var i = 0; i < 15; i++) {
    test[i] = new _valueTypes.Vec3(0, 0, 0);
  }

  var vertices = new Array(8);
  var vertices2 = new Array(8);

  for (var _i14 = 0; _i14 < 8; _i14++) {
    vertices[_i14] = new _valueTypes.Vec3(0, 0, 0);
    vertices2[_i14] = new _valueTypes.Vec3(0, 0, 0);
  }

  return function (obb1, obb2) {
    var obb1m = obb1.orientation.m;
    var obb2m = obb2.orientation.m;

    _valueTypes.Vec3.set(test[0], obb1m[0], obb1m[1], obb1m[2]);

    _valueTypes.Vec3.set(test[1], obb1m[3], obb1m[4], obb1m[5]);

    _valueTypes.Vec3.set(test[2], obb1m[6], obb1m[7], obb1m[8]);

    _valueTypes.Vec3.set(test[3], obb2m[0], obb2m[1], obb2m[2]);

    _valueTypes.Vec3.set(test[4], obb2m[3], obb2m[4], obb2m[5]);

    _valueTypes.Vec3.set(test[5], obb2m[6], obb2m[7], obb2m[8]);

    for (var _i15 = 0; _i15 < 3; ++_i15) {
      // Fill out rest of axis
      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 0], test[_i15], test[0]);

      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 1], test[_i15], test[1]);

      _valueTypes.Vec3.cross(test[6 + _i15 * 3 + 1], test[_i15], test[2]);
    }

    getOBBVertices(obb1.center, obb1.halfExtents, test[0], test[1], test[2], vertices);
    getOBBVertices(obb2.center, obb2.halfExtents, test[3], test[4], test[5], vertices2);

    for (var _i16 = 0; _i16 < 15; ++_i16) {
      var a = getInterval(vertices, test[_i16]);
      var b = getInterval(vertices2, test[_i16]);

      if (b[0] > a[1] || a[0] > b[1]) {
        return 0; // Seperating axis found
      }
    }

    return 1;
  };
}();
/**
 * !#en phere-plane intersect, not necessarily faster than obb-plane<br/>
 * due to the length calculation of the plane normal to factor out<br/>
 * the unnomalized plane distance<br/>
 * !#zh 球与平面的相交性检测。
 * @static
 * @method sphere_plane
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */


var sphere_plane = function sphere_plane(sphere, plane) {
  var dot = _valueTypes.Vec3.dot(plane.n, sphere.center);

  var r = sphere.radius * plane.n.length();

  if (dot + r < plane.d) {
    return -1;
  } else if (dot - r > plane.d) {
    return 0;
  }

  return 1;
};
/**
 * !#en sphere-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 球和锥台的相交性检测，速度快，但有错误情况。
 * @static
 * @method sphere_frustum
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var sphere_frustum = function sphere_frustum(sphere, frustum) {
  for (var i = 0; i < frustum.planes.length; i++) {
    // frustum plane normal points to the inside
    if (sphere_plane(sphere, frustum.planes[i]) === -1) {
      return 0;
    }
  } // completely outside


  return 1;
}; // https://stackoverflow.com/questions/20912692/view-frustum-culling-corner-cases

/**
 * !#en sphere-frustum intersect, handles the false positives correctly<br/>
 * !#zh 球和锥台的相交性检测，正确处理大多数错误情况。
 * @static
 * @method sphere_frustum_accurate
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */


var sphere_frustum_accurate = function () {
  var pt = new _valueTypes.Vec3(0, 0, 0),
      map = [1, -1, 1, -1, 1, -1];
  return function (sphere, frustum) {
    for (var i = 0; i < 6; i++) {
      var plane = frustum.planes[i];
      var r = sphere.radius,
          c = sphere.center;
      var n = plane.n,
          d = plane.d;

      var dot = _valueTypes.Vec3.dot(n, c); // frustum plane normal points to the inside


      if (dot + r < d) {
        return 0;
      } // completely outside
      else if (dot - r > d) {
          continue;
        } // in case of false positives
      // has false negatives, still working on it


      _valueTypes.Vec3.add(pt, c, _valueTypes.Vec3.multiplyScalar(pt, n, r));

      for (var j = 0; j < 6; j++) {
        if (j === i || j === i + map[i]) {
          continue;
        }

        var test = frustum.planes[j];

        if (_valueTypes.Vec3.dot(test.n, pt) < test.d) {
          return 0;
        }
      }
    }

    return 1;
  };
}();
/**
 * !#en sphere-sphere intersect<br/>
 * !#zh 球和球的相交性检测。
 * @static
 * @method sphere_sphere
 * @param {geomUtils.Sphere} sphere0
 * @param {geomUtils.Sphere} sphere1
 * @return {boolean} true or false
 */


var sphere_sphere = function sphere_sphere(sphere0, sphere1) {
  var r = sphere0.radius + sphere1.radius;
  return _valueTypes.Vec3.squaredDistance(sphere0.center, sphere1.center) < r * r;
};
/**
 * !#en sphere-aabb intersect<br/>
 * !#zh 球和轴对齐包围盒的相交性检测。
 * @static
 * @method sphere_aabb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Aabb} aabb
 * @return {boolean} true or false
 */


var sphere_aabb = function () {
  var pt = new _valueTypes.Vec3();
  return function (sphere, aabb) {
    distance.pt_point_aabb(pt, sphere.center, aabb);
    return _valueTypes.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
  };
}();
/**
 * !#en sphere-obb intersect<br/>
 * !#zh 球和方向包围盒的相交性检测。
 * @static
 * @method sphere_obb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Obb} obb
 * @return {boolean} true or false
 */


var sphere_obb = function () {
  var pt = new _valueTypes.Vec3();
  return function (sphere, obb) {
    distance.pt_point_obb(pt, sphere.center, obb);
    return _valueTypes.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
  };
}();

var intersect = {
  // old api
  rayAabb: rayAabb,
  rayMesh: rayMesh,
  raycast: raycast,
  rayTriangle: rayTriangle,
  ray_sphere: ray_sphere,
  ray_aabb: ray_aabb,
  ray_obb: ray_obb,
  ray_plane: ray_plane,
  ray_triangle: ray_triangle,
  line_plane: line_plane,
  line_triangle: line_triangle,
  line_quad: line_quad,
  sphere_sphere: sphere_sphere,
  sphere_aabb: sphere_aabb,
  sphere_obb: sphere_obb,
  sphere_plane: sphere_plane,
  sphere_frustum: sphere_frustum,
  sphere_frustum_accurate: sphere_frustum_accurate,
  aabb_aabb: aabb_aabb,
  aabb_obb: aabb_obb,
  aabb_plane: aabb_plane,
  aabb_frustum: aabb_frustum,
  aabb_frustum_accurate: aabb_frustum_accurate,
  obb_obb: obb_obb,
  obb_plane: obb_plane,
  obb_frustum: obb_frustum,
  obb_frustum_accurate: obb_frustum_accurate,
  obb_point: obb_point,

  /**
   * !#en
   * The intersection detection of g1 and g2 can fill in the shape in the basic geometry.
   * !#zh
   * g1 和 g2 的相交性检测，可填入基础几何中的形状。
   * @static
   * @method resolve
   * @param g1 Geometry 1
   * @param g2 Geometry 2
   * @param outPt optional, Intersection point. (note: only partial shape detection with this return value)
   */
  resolve: function resolve(g1, g2, outPt) {
    if (outPt === void 0) {
      outPt = null;
    }

    var type1 = g1._type,
        type2 = g2._type;
    var resolver = this[type1 | type2];

    if (type1 < type2) {
      return resolver(g1, g2, outPt);
    } else {
      return resolver(g2, g1, outPt);
    }
  }
};
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_SPHERE] = ray_sphere;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_AABB] = ray_aabb;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_OBB] = ray_obb;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_PLANE] = ray_plane;
intersect[_enums["default"].SHAPE_RAY | _enums["default"].SHAPE_TRIANGLE] = ray_triangle;
intersect[_enums["default"].SHAPE_LINE | _enums["default"].SHAPE_PLANE] = line_plane;
intersect[_enums["default"].SHAPE_LINE | _enums["default"].SHAPE_TRIANGLE] = line_triangle;
intersect[_enums["default"].SHAPE_SPHERE] = sphere_sphere;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_AABB] = sphere_aabb;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_OBB] = sphere_obb;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_PLANE] = sphere_plane;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_FRUSTUM] = sphere_frustum;
intersect[_enums["default"].SHAPE_SPHERE | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = sphere_frustum_accurate;
intersect[_enums["default"].SHAPE_AABB] = aabb_aabb;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_OBB] = aabb_obb;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_PLANE] = aabb_plane;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_FRUSTUM] = aabb_frustum;
intersect[_enums["default"].SHAPE_AABB | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = aabb_frustum_accurate;
intersect[_enums["default"].SHAPE_OBB] = obb_obb;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_PLANE] = obb_plane;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_FRUSTUM] = obb_frustum;
intersect[_enums["default"].SHAPE_OBB | _enums["default"].SHAPE_FRUSTUM_ACCURATE] = obb_frustum_accurate;
var _default = intersect;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvaW50ZXJzZWN0LnRzIl0sIm5hbWVzIjpbInJheV9tZXNoIiwidHJpIiwidHJpYW5nbGUiLCJjcmVhdGUiLCJtaW5EaXN0IiwiSW5maW5pdHkiLCJnZXRWZWMzIiwib3V0IiwiZGF0YSIsImlkeCIsInN0cmlkZSIsIlZlYzMiLCJzZXQiLCJyYXkiLCJtZXNoIiwic3ViTWVzaGVzIiwiX3N1Yk1lc2hlcyIsImkiLCJsZW5ndGgiLCJfcHJpbWl0aXZlVHlwZSIsImdmeCIsIlBUX1RSSUFOR0xFUyIsInN1YkRhdGEiLCJfc3ViRGF0YXMiLCJwb3NEYXRhIiwiX2dldEF0dHJNZXNoRGF0YSIsIkFUVFJfUE9TSVRJT04iLCJpRGF0YSIsImdldElEYXRhIiwiVWludDE2QXJyYXkiLCJmb3JtYXQiLCJ2Zm0iLCJmbXQiLCJlbGVtZW50IiwibnVtIiwiYSIsImIiLCJjIiwiZGlzdCIsInJheV90cmlhbmdsZSIsInJheU1lc2giLCJyYXlfY2FzdCIsInRyYXZlcnNhbCIsIm5vZGUiLCJjYiIsImNoaWxkcmVuIiwiY2hpbGQiLCJjbXAiLCJkaXN0YW5jZSIsInRyYW5zZm9ybU1hdDROb3JtYWwiLCJtIiwibW0iLCJ4IiwieSIsInoiLCJyaHciLCJyZXN1bHRzUG9vbCIsIlJlY3ljbGVQb29sIiwicmVzdWx0cyIsIm5vZGVBYWJiIiwiYWFiYiIsIm1pblBvcyIsIm1heFBvcyIsIm1vZGVsUmF5IiwibTRfMSIsImNjIiwibWF0NCIsIm00XzIiLCJkIiwiZGlzdGFuY2VWYWxpZCIsInJvb3QiLCJ3b3JsZFJheSIsImhhbmRsZXIiLCJmaWx0ZXIiLCJyZXNldCIsImRpcmVjdG9yIiwiZ2V0U2NlbmUiLCJNYXQ0IiwiaW52ZXJ0IiwiZ2V0V29ybGRNYXRyaXgiLCJ0cmFuc2Zvcm1NYXQ0IiwibyIsIm5vcm1hbGl6ZSIsImNvbXBvbmVudCIsIl9yZW5kZXJDb21wb25lbnQiLCJNZXNoUmVuZGVyZXIiLCJyYXlfYWFiYiIsIl9ib3VuZGluZ0JveCIsIndpZHRoIiwiaGVpZ2h0IiwiYW5jaG9yWCIsImFuY2hvclkiLCJmcm9tUG9pbnRzIiwic2NhbGUiLCJyZXMiLCJhZGQiLCJtYWciLCJwdXNoIiwic29ydCIsInJheWNhc3QiLCJyYXlfcGxhbmUiLCJwdCIsInBsYW5lIiwiZGVub20iLCJkb3QiLCJuIiwiTWF0aCIsImFicyIsIk51bWJlciIsIkVQU0lMT04iLCJtdWx0aXBseVNjYWxhciIsInQiLCJzdWJ0cmFjdCIsImxpbmVfcGxhbmUiLCJhYiIsImxpbmUiLCJlIiwicyIsImFjIiwicHZlYyIsInR2ZWMiLCJxdmVjIiwiZG91YmxlU2lkZWQiLCJjcm9zcyIsImRldCIsImludl9kZXQiLCJ1IiwidiIsInJheVRyaWFuZ2xlIiwibGluZV90cmlhbmdsZSIsInFwIiwiYXAiLCJvdXRQdCIsInciLCJpbnZEZXQiLCJsaW5lX3F1YWQiLCJwcSIsInBhIiwicGIiLCJwYyIsInBkIiwidG1wIiwicCIsInEiLCJyYXlfc3BoZXJlIiwic3BoZXJlIiwiciIsInJhZGl1cyIsImNlbnRlciIsInJTcSIsImVTcSIsImxlbmd0aFNxciIsImFMZW5ndGgiLCJmU3EiLCJmIiwic3FydCIsIm1pbiIsIm1heCIsIml4IiwiaXkiLCJpeiIsImhhbGZFeHRlbnRzIiwidDEiLCJ0MiIsInQzIiwidDQiLCJ0NSIsInQ2IiwidG1pbiIsInRtYXgiLCJyYXlBYWJiIiwicmF5X29iYiIsIlgiLCJZIiwiWiIsInNpemUiLCJBcnJheSIsIm9iYiIsIm9iYm0iLCJvcmllbnRhdGlvbiIsImFhYmJfYWFiYiIsImFNaW4iLCJhTWF4IiwiYk1pbiIsImJNYXgiLCJhYWJiMSIsImFhYmIyIiwiZ2V0QUFCQlZlcnRpY2VzIiwiZ2V0T0JCVmVydGljZXMiLCJhMSIsImEyIiwiYTMiLCJnZXRJbnRlcnZhbCIsInZlcnRpY2VzIiwiYXhpcyIsInByb2plY3Rpb24iLCJhYWJiX29iYiIsInRlc3QiLCJ2ZXJ0aWNlczIiLCJqIiwiYWFiYl9wbGFuZSIsImFhYmJfZnJ1c3R1bSIsImZydXN0dW0iLCJwbGFuZXMiLCJhYWJiX2ZydXN0dW1fYWNjdXJhdGUiLCJvdXQxIiwib3V0MiIsInJlc3VsdCIsImludGVyc2VjdHMiLCJvYmJfcG9pbnQiLCJtMyIsIk1hdDMiLCJsZXNzVGhhbiIsInBvaW50IiwidHJhbnNmb3JtTWF0MyIsInRyYW5zcG9zZSIsIm9iYl9wbGFuZSIsImFic0RvdCIsIm9iYl9mcnVzdHVtIiwib2JiX2ZydXN0dW1fYWNjdXJhdGUiLCJvYmJfb2JiIiwib2JiMSIsIm9iYjIiLCJvYmIxbSIsIm9iYjJtIiwic3BoZXJlX3BsYW5lIiwic3BoZXJlX2ZydXN0dW0iLCJzcGhlcmVfZnJ1c3R1bV9hY2N1cmF0ZSIsIm1hcCIsInNwaGVyZV9zcGhlcmUiLCJzcGhlcmUwIiwic3BoZXJlMSIsInNxdWFyZWREaXN0YW5jZSIsInNwaGVyZV9hYWJiIiwicHRfcG9pbnRfYWFiYiIsInNwaGVyZV9vYmIiLCJwdF9wb2ludF9vYmIiLCJpbnRlcnNlY3QiLCJyZXNvbHZlIiwiZzEiLCJnMiIsInR5cGUxIiwiX3R5cGUiLCJ0eXBlMiIsInJlc29sdmVyIiwiZW51bXMiLCJTSEFQRV9SQVkiLCJTSEFQRV9TUEhFUkUiLCJTSEFQRV9BQUJCIiwiU0hBUEVfT0JCIiwiU0hBUEVfUExBTkUiLCJTSEFQRV9UUklBTkdMRSIsIlNIQVBFX0xJTkUiLCJTSEFQRV9GUlVTVFVNIiwiU0hBUEVfRlJVU1RVTV9BQ0NVUkFURSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFLQTs7QUFFQTs7Ozs7Ozs7QUF0Q0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q0E7OztBQUlBLElBQU1BLFFBQVEsR0FBSSxZQUFZO0FBQzFCLE1BQUlDLEdBQUcsR0FBR0MscUJBQVNDLE1BQVQsRUFBVjs7QUFDQSxNQUFJQyxPQUFPLEdBQUdDLFFBQWQ7O0FBRUEsV0FBU0MsT0FBVCxDQUFrQkMsR0FBbEIsRUFBdUJDLElB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RSxTQUE5QjtBQUNBeUQsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1JLFNBQTFCLENBQVQsR0FBZ0RyRCxRQUFoRDtBQUNBeUMsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1LLFdBQTFCLENBQVQsR0FBa0RsRCxVQUFsRDtBQUNBcUMsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1RLGFBQTFCLENBQVQsR0FBb0RwRCxZQUFwRDtBQUNBb0MsU0FBUyxDQUFDUSxrQkFBTUcsVUFBTixHQUFtQkgsa0JBQU1TLHNCQUExQixDQUFULEdBQTZEbEQscUJBQTdEO0FBRUFpQyxTQUFTLENBQUNRLGtCQUFNSSxTQUFQLENBQVQsR0FBNkI3QixPQUE3QjtBQUNBaUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1LLFdBQXpCLENBQVQsR0FBaURsQyxTQUFqRDtBQUNBcUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1RLGFBQXpCLENBQVQsR0FBbURuQyxXQUFuRDtBQUNBbUIsU0FBUyxDQUFDUSxrQkFBTUksU0FBTixHQUFrQkosa0JBQU1TLHNCQUF6QixDQUFULEdBQTREbkMsb0JBQTVEO2VBRWVrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgZ2Z4IGZyb20gJy4uLy4uL3JlbmRlcmVyL2dmeCc7XG5pbXBvcnQgUmVjeWNsZVBvb2wgZnJvbSAnLi4vLi4vcmVuZGVyZXIvbWVtb3AvcmVjeWNsZS1wb29sJztcblxuaW1wb3J0IHsgTWF0MywgVmVjMywgTWF0NCB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCBhYWJiIGZyb20gJy4vYWFiYic7XG5pbXBvcnQgKiBhcyBkaXN0YW5jZSBmcm9tICcuL2Rpc3RhbmNlJztcbmltcG9ydCBlbnVtcyBmcm9tICcuL2VudW1zJztcbmltcG9ydCB7IGZydXN0dW0gfSBmcm9tICcuL2ZydXN0dW0nO1xuaW1wb3J0IGxpbmUgZnJvbSAnLi9saW5lJztcbmltcG9ydCBvYmIgZnJvbSAnLi9vYmInO1xuaW1wb3J0IHBsYW5lIGZyb20gJy4vcGxhbmUnO1xuaW1wb3J0IHJheSBmcm9tICcuL3JheSc7XG5pbXBvcnQgc3BoZXJlIGZyb20gJy4vc3BoZXJlJztcbmltcG9ydCB0cmlhbmdsZSBmcm9tICcuL3RyaWFuZ2xlJztcblxuLyoqXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLmludGVyc2VjdFxuICovXG5cbmNvbnN0IHJheV9tZXNoID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdHJpID0gdHJpYW5nbGUuY3JlYXRlKCk7XG4gICAgbGV0IG1pbkRpc3QgPSBJbmZpbml0eTtcblxuICAgIGZ1bmN0aW9uIGdldFZlYzMgKG91dCwgZGF0YSwgaWR4LCBzdHJpZGUpIHtcbiAgICAgICAgVmVjMy5zZXQob3V0LCBkYXRhW2lkeCpzdHJpZGVdLCBkYXRhW2lkeCpzdHJpZGUgKyAxXSwgZGF0YVtpZHgqc3RyaWRlICsgMl0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheSwgbWVzaCkge1xuICAgICAgICBtaW5EaXN0ID0gSW5maW5pdHk7XG4gICAgICAgIGxldCBzdWJNZXNoZXMgPSBtZXNoLl9zdWJNZXNoZXM7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJNZXNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzdWJNZXNoZXNbaV0uX3ByaW1pdGl2ZVR5cGUgIT09IGdmeC5QVF9UUklBTkdMRVMpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBsZXQgc3ViRGF0YSA9IChtZXNoLl9zdWJEYXRhc1tpXSB8fCBtZXNoLl9zdWJEYXRhc1swXSk7XG4gICAgICAgICAgICBsZXQgcG9zRGF0YSA9IG1lc2guX2dldEF0dHJNZXNoRGF0YShpLCBnZnguQVRUUl9QT1NJVElPTik7XG4gICAgICAgICAgICBsZXQgaURhdGEgPSBzdWJEYXRhLmdldElEYXRhKFVpbnQxNkFycmF5KTtcblxuICAgICAgICAgICAgbGV0IGZvcm1hdCA9IHN1YkRhdGEudmZtO1xuICAgICAgICAgICAgbGV0IGZtdCA9IGZvcm1hdC5lbGVtZW50KGdmeC5BVFRSX1BPU0lUSU9OKTtcbiAgICAgICAgICAgIGxldCBudW0gPSBmbXQubnVtO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpRGF0YS5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgIGdldFZlYzModHJpLmEsIHBvc0RhdGEsIGlEYXRhWyBpIF0sIG51bSk7XG4gICAgICAgICAgICAgICAgZ2V0VmVjMyh0cmkuYiwgcG9zRGF0YSwgaURhdGFbaSsxXSwgbnVtKTtcbiAgICAgICAgICAgICAgICBnZXRWZWMzKHRyaS5jLCBwb3NEYXRhLCBpRGF0YVtpKzJdLCBudW0pO1xuXG4gICAgICAgICAgICAgICAgbGV0IGRpc3QgPSByYXlfdHJpYW5nbGUocmF5LCB0cmkpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0IDwgbWluRGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5EaXN0ID0gZGlzdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1pbkRpc3Q7XG4gICAgfTtcbn0pKCk7XG5cbi8vIGFkYXB0IHRvIG9sZCBhcGlcbmNvbnN0IHJheU1lc2ggPSByYXlfbWVzaDtcblxuLyoqIFxuICogISNlblxuICogQ2hlY2sgd2hldGhlciByYXkgaW50ZXJzZWN0IHdpdGggbm9kZXNcbiAqICEjemhcbiAqIOajgOa1i+WwhOe6v+aYr+WQpuS4jueJqeS9k+acieS6pOmbhlxuICogQHN0YXRpY1xuICogQG1ldGhvZCByYXlfY2FzdFxuICogQHBhcmFtIHtOb2RlfSByb290IC0gSWYgcm9vdCBpcyBudWxsLCB0aGVuIHRyYXZlcnNhbCBub2RlcyBmcm9tIHNjZW5lIG5vZGVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gd29ybGRSYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZpbHRlclxuICogQHJldHVybiB7W119IFt7bm9kZSwgZGlzdGFuY2V9XVxuKi9cbmNvbnN0IHJheV9jYXN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0cmF2ZXJzYWwgKG5vZGUsIGNiKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHRyYXZlcnNhbChjaGlsZCwgY2IpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2Iobm9kZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY21wIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmRpc3RhbmNlIC0gYi5kaXN0YW5jZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0Tm9ybWFsIChvdXQsIGEsIG0pIHtcbiAgICAgICAgbGV0IG1tID0gbS5tO1xuICAgICAgICBsZXQgeCA9IGEueCwgeSA9IGEueSwgeiA9IGEueixcbiAgICAgICAgICAgIHJodyA9IG1tWzNdICogeCArIG1tWzddICogeSArIG1tWzExXSAqIHo7XG4gICAgICAgIHJodyA9IHJodyA/IDEgLyByaHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtbVswXSAqIHggKyBtbVs0XSAqIHkgKyBtbVs4XSAqIHopICogcmh3O1xuICAgICAgICBvdXQueSA9IChtbVsxXSAqIHggKyBtbVs1XSAqIHkgKyBtbVs5XSAqIHopICogcmh3O1xuICAgICAgICBvdXQueiA9IChtbVsyXSAqIHggKyBtbVs2XSAqIHkgKyBtbVsxMF0gKiB6KSAqIHJodztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0c1Bvb2wgPSBuZXcgUmVjeWNsZVBvb2woZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICAgICAgICBub2RlOiBudWxsXG4gICAgICAgIH1cbiAgICB9LCAxKTtcblxuICAgIGxldCByZXN1bHRzID0gW107XG5cbiAgICAvLyB0ZW1wIHZhcmlhYmxlXG4gICAgbGV0IG5vZGVBYWJiID0gYWFiYi5jcmVhdGUoKTtcbiAgICBsZXQgbWluUG9zID0gbmV3IFZlYzMoKTtcbiAgICBsZXQgbWF4UG9zID0gbmV3IFZlYzMoKTtcblxuICAgIGxldCBtb2RlbFJheSA9IG5ldyByYXkoKTtcbiAgICBsZXQgbTRfMSA9IGNjLm1hdDQoKTtcbiAgICBsZXQgbTRfMiA9IGNjLm1hdDQoKTtcbiAgICBsZXQgZCA9IG5ldyBWZWMzKCk7XG5cbiAgICBmdW5jdGlvbiBkaXN0YW5jZVZhbGlkIChkaXN0YW5jZSkge1xuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwICYmIGRpc3RhbmNlIDwgSW5maW5pdHk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChyb290LCB3b3JsZFJheSwgaGFuZGxlciwgZmlsdGVyKSB7XG4gICAgICAgIHJlc3VsdHNQb29sLnJlc2V0KCk7XG4gICAgICAgIHJlc3VsdHMubGVuZ3RoID0gMDtcblxuICAgICAgICByb290ID0gcm9vdCB8fCBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICB0cmF2ZXJzYWwocm9vdCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlcihub2RlKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm0gd29ybGQgcmF5IHRvIG1vZGVsIHJheVxuICAgICAgICAgICAgTWF0NC5pbnZlcnQobTRfMiwgbm9kZS5nZXRXb3JsZE1hdHJpeChtNF8xKSk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQobW9kZWxSYXkubywgd29ybGRSYXkubywgbTRfMik7XG4gICAgICAgICAgICBWZWMzLm5vcm1hbGl6ZShtb2RlbFJheS5kLCB0cmFuc2Zvcm1NYXQ0Tm9ybWFsKG1vZGVsUmF5LmQsIHdvcmxkUmF5LmQsIG00XzIpKTtcblxuICAgICAgICAgICAgLy8gcmF5Y2FzdCB3aXRoIGJvdW5kaW5nIGJveFxuICAgICAgICAgICAgbGV0IGRpc3RhbmNlID0gSW5maW5pdHk7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gbm9kZS5fcmVuZGVyQ29tcG9uZW50O1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIGNjLk1lc2hSZW5kZXJlciApIHtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHJheV9hYWJiKG1vZGVsUmF5LCBjb21wb25lbnQuX2JvdW5kaW5nQm94KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vZGUud2lkdGggJiYgbm9kZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBWZWMzLnNldChtaW5Qb3MsIC1ub2RlLndpZHRoICogbm9kZS5hbmNob3JYLCAtbm9kZS5oZWlnaHQgKiBub2RlLmFuY2hvclksIG5vZGUueik7XG4gICAgICAgICAgICAgICAgVmVjMy5zZXQobWF4UG9zLCBub2RlLndpZHRoICogKDEgLSBub2RlLmFuY2hvclgpLCBub2RlLmhlaWdodCAqICgxIC0gbm9kZS5hbmNob3JZKSwgbm9kZS56KTtcbiAgICAgICAgICAgICAgICBhYWJiLmZyb21Qb2ludHMobm9kZUFhYmIsIG1pblBvcywgbWF4UG9zKTtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IHJheV9hYWJiKG1vZGVsUmF5LCBub2RlQWFiYik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGlzdGFuY2VWYWxpZChkaXN0YW5jZSkpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IGhhbmRsZXIobW9kZWxSYXksIG5vZGUsIGRpc3RhbmNlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlVmFsaWQoZGlzdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgVmVjMy5zY2FsZShkLCBtb2RlbFJheS5kLCBkaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtTWF0NE5vcm1hbChkLCBkLCBtNF8xKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gcmVzdWx0c1Bvb2wuYWRkKCk7XG4gICAgICAgICAgICAgICAgcmVzLm5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgIHJlcy5kaXN0YW5jZSA9IFZlYzMubWFnKGQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXN1bHRzLnNvcnQoY21wKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxufSkoKTtcblxuLy8gYWRhcHQgdG8gb2xkIGFwaVxuY29uc3QgcmF5Y2FzdCA9IHJheV9jYXN0O1xuXG4vKipcbiAqICEjZW4gcmF5LXBsYW5lIGludGVyc2VjdDxici8+XG4gKiAhI3poIOWwhOe6v+S4juW5s+mdoueahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCByYXlfcGxhbmVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCByYXlfcGxhbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheTogcmF5LCBwbGFuZTogcGxhbmUpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBkZW5vbSA9IFZlYzMuZG90KHJheS5kLCBwbGFuZS5uKTtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbm9tKSA8IE51bWJlci5FUFNJTE9OKSB7IHJldHVybiAwOyB9XG4gICAgICAgIFZlYzMubXVsdGlwbHlTY2FsYXIocHQsIHBsYW5lLm4sIHBsYW5lLmQpO1xuICAgICAgICBjb25zdCB0ID0gVmVjMy5kb3QoVmVjMy5zdWJ0cmFjdChwdCwgcHQsIHJheS5vKSwgcGxhbmUubikgLyBkZW5vbTtcbiAgICAgICAgaWYgKHQgPCAwKSB7IHJldHVybiAwOyB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gbGluZS1wbGFuZSBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDnur/mrrXkuI7lubPpnaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgbGluZV9wbGFuZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuTGluZX0gbGluZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuUGxhbmV9IHBsYW5lXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3QgbGluZV9wbGFuZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYWIgPSBuZXcgVmVjMygwLCAwLCAwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAobGluZTogbGluZSwgcGxhbmU6IHBsYW5lKTogbnVtYmVyIHtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChhYiwgbGluZS5lLCBsaW5lLnMpO1xuICAgICAgICBjb25zdCB0ID0gKHBsYW5lLmQgLSBWZWMzLmRvdChsaW5lLnMsIHBsYW5lLm4pKSAvIFZlYzMuZG90KGFiLCBwbGFuZS5uKTtcbiAgICAgICAgaWYgKHQgPCAwIHx8IHQgPiAxKSB7IHJldHVybiAwOyB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG59KSgpO1xuXG4vLyBiYXNlZCBvbiBodHRwOi8vZmlsZWFkbWluLmNzLmx0aC5zZS9jcy9QZXJzb25hbC9Ub21hc19Ba2VuaW5lLU1vbGxlci9yYXl0cmkvXG4vKipcbiAqICEjZW4gcmF5LXRyaWFuZ2xlIGludGVyc2VjdDxici8+XG4gKiAhI3poIOWwhOe6v+S4juS4ieinkuW9oueahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCByYXlfdHJpYW5nbGVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XG4gKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gdHJpYW5nbGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZG91YmxlU2lkZWRcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCByYXlfdHJpYW5nbGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFiID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgYWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICBjb25zdCBwdmVjID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgdHZlYyA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIGNvbnN0IHF2ZWMgPSBuZXcgVmVjMygwLCAwLCAwKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAocmF5OiByYXksIHRyaWFuZ2xlOiB0cmlhbmdsZSwgZG91YmxlU2lkZWQ/OiBib29sZWFuKSB7XG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWIsIHRyaWFuZ2xlLmIsIHRyaWFuZ2xlLmEpO1xuICAgICAgICBWZWMzLnN1YnRyYWN0KGFjLCB0cmlhbmdsZS5jLCB0cmlhbmdsZS5hKTtcblxuICAgICAgICBWZWMzLmNyb3NzKHB2ZWMsIHJheS5kLCBhYyk7XG4gICAgICAgIGNvbnN0IGRldCA9IFZlYzMuZG90KGFiLCBwdmVjKTtcbiAgICAgICAgaWYgKGRldCA8IE51bWJlci5FUFNJTE9OICYmICghZG91YmxlU2lkZWQgfHwgZGV0ID4gLU51bWJlci5FUFNJTE9OKSkgeyByZXR1cm4gMDsgfVxuXG4gICAgICAgIGNvbnN0IGludl9kZXQgPSAxIC8gZGV0O1xuXG4gICAgICAgIFZlYzMuc3VidHJhY3QodHZlYywgcmF5Lm8sIHRyaWFuZ2xlLmEpO1xuICAgICAgICBjb25zdCB1ID0gVmVjMy5kb3QodHZlYywgcHZlYykgKiBpbnZfZGV0O1xuICAgICAgICBpZiAodSA8IDAgfHwgdSA+IDEpIHsgcmV0dXJuIDA7IH1cblxuICAgICAgICBWZWMzLmNyb3NzKHF2ZWMsIHR2ZWMsIGFiKTtcbiAgICAgICAgY29uc3QgdiA9IFZlYzMuZG90KHJheS5kLCBxdmVjKSAqIGludl9kZXQ7XG4gICAgICAgIGlmICh2IDwgMCB8fCB1ICsgdiA+IDEpIHsgcmV0dXJuIDA7IH1cblxuICAgICAgICBjb25zdCB0ID0gVmVjMy5kb3QoYWMsIHF2ZWMpICogaW52X2RldDtcbiAgICAgICAgcmV0dXJuIHQgPCAwID8gMCA6IHQ7XG4gICAgfTtcbn0pKCk7XG5cbi8vIGFkYXB0IHRvIG9sZCBhcGlcbmNvbnN0IHJheVRyaWFuZ2xlID0gcmF5X3RyaWFuZ2xlO1xuXG4vKipcbiAqICEjZW4gbGluZS10cmlhbmdsZSBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDnur/mrrXkuI7kuInop5LlvaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgbGluZV90cmlhbmdsZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuTGluZX0gbGluZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuVHJpYW5nbGV9IHRyaWFuZ2xlXG4gKiBAcGFyYW0ge1ZlYzN9IG91dFB0IG9wdGlvbmFsLCBUaGUgaW50ZXJzZWN0aW9uIHBvaW50XG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3QgbGluZV90cmlhbmdsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYWIgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICBjb25zdCBhYyA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIGNvbnN0IHFwID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgYXAgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICBjb25zdCBuID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgZSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsaW5lOiBsaW5lLCB0cmlhbmdsZTogdHJpYW5nbGUsIG91dFB0OiBWZWMzKTogbnVtYmVyIHtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChhYiwgdHJpYW5nbGUuYiwgdHJpYW5nbGUuYSk7XG4gICAgICAgIFZlYzMuc3VidHJhY3QoYWMsIHRyaWFuZ2xlLmMsIHRyaWFuZ2xlLmEpO1xuICAgICAgICBWZWMzLnN1YnRyYWN0KHFwLCBsaW5lLnMsIGxpbmUuZSk7XG5cbiAgICAgICAgVmVjMy5jcm9zcyhuLCBhYiwgYWMpO1xuICAgICAgICBjb25zdCBkZXQgPSBWZWMzLmRvdChxcCwgbik7XG5cbiAgICAgICAgaWYgKGRldCA8PSAwLjApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgVmVjMy5zdWJ0cmFjdChhcCwgbGluZS5zLCB0cmlhbmdsZS5hKTtcbiAgICAgICAgY29uc3QgdCA9IFZlYzMuZG90KGFwLCBuKTtcbiAgICAgICAgaWYgKHQgPCAwIHx8IHQgPiBkZXQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgVmVjMy5jcm9zcyhlLCBxcCwgYXApO1xuICAgICAgICBsZXQgdiA9IFZlYzMuZG90KGFjLCBlKTtcbiAgICAgICAgaWYgKHYgPCAwIHx8IHYgPiBkZXQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHcgPSAtVmVjMy5kb3QoYWIsIGUpO1xuICAgICAgICBpZiAodyA8IDAuMCB8fCB2ICsgdyA+IGRldCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3V0UHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGludkRldCA9IDEuMCAvIGRldDtcbiAgICAgICAgICAgIHYgKj0gaW52RGV0O1xuICAgICAgICAgICAgdyAqPSBpbnZEZXQ7XG4gICAgICAgICAgICBjb25zdCB1ID0gMS4wIC0gdiAtIHc7XG5cbiAgICAgICAgICAgIC8vIG91dFB0ID0gdSphICsgdipkICsgdypjO1xuICAgICAgICAgICAgVmVjMy5zZXQob3V0UHQsXG4gICAgICAgICAgICAgICAgdHJpYW5nbGUuYS54ICogdSArIHRyaWFuZ2xlLmIueCAqIHYgKyB0cmlhbmdsZS5jLnggKiB3LFxuICAgICAgICAgICAgICAgIHRyaWFuZ2xlLmEueSAqIHUgKyB0cmlhbmdsZS5iLnkgKiB2ICsgdHJpYW5nbGUuYy55ICogdyxcbiAgICAgICAgICAgICAgICB0cmlhbmdsZS5hLnogKiB1ICsgdHJpYW5nbGUuYi56ICogdiArIHRyaWFuZ2xlLmMueiAqIHcsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogISNlbiBsaW5lLXF1YWQgaW50ZXJzZWN0PGJyLz5cbiAqICEjemgg57q/5q615LiO5Zub6L655b2i55qE55u45Lqk5oCn5qOA5rWL44CCXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGxpbmVfcXVhZFxuICogQHBhcmFtIHtWZWMzfSBwIEEgcG9pbnQgb24gYSBsaW5lIHNlZ21lbnRcbiAqIEBwYXJhbSB7VmVjM30gcSBBbm90aGVyIHBvaW50IG9uIHRoZSBsaW5lIHNlZ21lbnRcbiAqIEBwYXJhbSB7VmVjM30gYSBRdWFkcmlsYXRlcmFsIHBvaW50IGFcbiAqIEBwYXJhbSB7VmVjM30gYiBRdWFkcmlsYXRlcmFsIHBvaW50IGJcbiAqIEBwYXJhbSB7VmVjM30gYyBRdWFkcmlsYXRlcmFsIHBvaW50IGNcbiAqIEBwYXJhbSB7VmVjM30gZCBRdWFkcmlsYXRlcmFsIHBvaW50IGRcbiAqIEBwYXJhbSB7VmVjM30gb3V0UHQgb3B0aW9uYWwsIFRoZSBpbnRlcnNlY3Rpb24gcG9pbnRcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCBsaW5lX3F1YWQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHBxID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgcGEgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICBjb25zdCBwYiA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIGNvbnN0IHBjID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgcGQgPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICBjb25zdCBtID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgY29uc3QgdG1wID0gbmV3IFZlYzMoMCwgMCwgMCk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHA6IFZlYzMsIHE6IFZlYzMsIGE6IFZlYzMsIGI6IFZlYzMsIGM6IFZlYzMsIGQ6IFZlYzMsIG91dFB0OiBWZWMzKTogbnVtYmVyIHtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwcSwgcSwgcCk7XG4gICAgICAgIFZlYzMuc3VidHJhY3QocGEsIGEsIHApO1xuICAgICAgICBWZWMzLnN1YnRyYWN0KHBiLCBiLCBwKTtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwYywgYywgcCk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHRyaWFuZ2xlIHRvIHRlc3QgYWdhaW5zdCBieSB0ZXN0aW5nIGFnYWluc3QgZGlhZ29uYWwgZmlyc3RcbiAgICAgICAgVmVjMy5jcm9zcyhtLCBwYywgcHEpO1xuICAgICAgICBsZXQgdiA9IFZlYzMuZG90KHBhLCBtKTtcblxuICAgICAgICBpZiAodiA+PSAwKSB7XG4gICAgICAgICAgICAvLyBUZXN0IGludGVyc2VjdGlvbiBhZ2FpbnN0IHRyaWFuZ2xlIGFiY1xuICAgICAgICAgICAgbGV0IHUgPSAtVmVjMy5kb3QocGIsIG0pO1xuICAgICAgICAgICAgaWYgKHUgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB3ID0gVmVjMy5kb3QoVmVjMy5jcm9zcyh0bXAsIHBxLCBwYiksIHBhKTtcbiAgICAgICAgICAgIGlmICh3IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvdXRQdCA9IHUqYSArIHYqYiArIHcqYztcbiAgICAgICAgICAgIGlmIChvdXRQdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlbm9tID0gMS4wIC8gKHUgKyB2ICsgdyk7XG4gICAgICAgICAgICAgICAgdSAqPSBkZW5vbTtcbiAgICAgICAgICAgICAgICB2ICo9IGRlbm9tO1xuICAgICAgICAgICAgICAgIHcgKj0gZGVub207XG5cbiAgICAgICAgICAgICAgICBWZWMzLnNldChvdXRQdCxcbiAgICAgICAgICAgICAgICAgICAgYS54ICogdSArIGIueCAqIHYgKyBjLnggKiB3LFxuICAgICAgICAgICAgICAgICAgICBhLnkgKiB1ICsgYi55ICogdiArIGMueSAqIHcsXG4gICAgICAgICAgICAgICAgICAgIGEueiAqIHUgKyBiLnogKiB2ICsgYy56ICogdyxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGVzdCBpbnRlcnNlY3Rpb24gYWdhaW5zdCB0cmlhbmdsZSBkYWNcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QocGQsIGQsIHApO1xuXG4gICAgICAgICAgICBsZXQgdSA9IFZlYzMuZG90KHBkLCBtKTtcbiAgICAgICAgICAgIGlmICh1IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdyA9IFZlYzMuZG90KFZlYzMuY3Jvc3ModG1wLCBwcSwgcGEpLCBwZCk7XG4gICAgICAgICAgICBpZiAodyA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb3V0UHQgPSB1KmEgKyB2KmQgKyB3KmM7XG4gICAgICAgICAgICBpZiAob3V0UHQpIHtcbiAgICAgICAgICAgICAgICB2ID0gLXY7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkZW5vbSA9IDEuMCAvICh1ICsgdiArIHcpO1xuICAgICAgICAgICAgICAgIHUgKj0gZGVub207XG4gICAgICAgICAgICAgICAgdiAqPSBkZW5vbTtcbiAgICAgICAgICAgICAgICB3ICo9IGRlbm9tO1xuXG4gICAgICAgICAgICAgICAgVmVjMy5zZXQob3V0UHQsXG4gICAgICAgICAgICAgICAgICAgIGEueCAqIHUgKyBkLnggKiB2ICsgYy54ICogdyxcbiAgICAgICAgICAgICAgICAgICAgYS55ICogdSArIGQueSAqIHYgKyBjLnkgKiB3LFxuICAgICAgICAgICAgICAgICAgICBhLnogKiB1ICsgZC56ICogdiArIGMueiAqIHcsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gcmF5LXNwaGVyZSBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDlsITnur/lkoznkIPnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgcmF5X3NwaGVyZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuUmF5fSByYXlcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3QgcmF5X3NwaGVyZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIHJldHVybiBmdW5jdGlvbiAocmF5OiByYXksIHNwaGVyZTogc3BoZXJlKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgciA9IHNwaGVyZS5yYWRpdXM7XG4gICAgICAgIGNvbnN0IGMgPSBzcGhlcmUuY2VudGVyO1xuICAgICAgICBjb25zdCBvID0gcmF5Lm87XG4gICAgICAgIGNvbnN0IGQgPSByYXkuZDtcbiAgICAgICAgY29uc3QgclNxID0gciAqIHI7XG4gICAgICAgIFZlYzMuc3VidHJhY3QoZSwgYywgbyk7XG4gICAgICAgIGNvbnN0IGVTcSA9IGUubGVuZ3RoU3FyKCk7XG5cbiAgICAgICAgY29uc3QgYUxlbmd0aCA9IFZlYzMuZG90KGUsIGQpOyAvLyBhc3N1bWUgcmF5IGRpcmVjdGlvbiBhbHJlYWR5IG5vcm1hbGl6ZWRcbiAgICAgICAgY29uc3QgZlNxID0gclNxIC0gKGVTcSAtIGFMZW5ndGggKiBhTGVuZ3RoKTtcbiAgICAgICAgaWYgKGZTcSA8IDApIHsgcmV0dXJuIDA7IH1cblxuICAgICAgICBjb25zdCBmID0gTWF0aC5zcXJ0KGZTcSk7XG4gICAgICAgIGNvbnN0IHQgPSBlU3EgPCByU3EgPyBhTGVuZ3RoICsgZiA6IGFMZW5ndGggLSBmO1xuICAgICAgICBpZiAodCA8IDApIHsgcmV0dXJuIDA7IH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogISNlbiByYXktYWFiYiBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDlsITnur/lkozovbTlr7npvZDljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgcmF5X2FhYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiIEFsaWduIHRoZSBheGlzIGFyb3VuZCB0aGUgYm94XG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3QgcmF5X2FhYmIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG1pbiA9IG5ldyBWZWMzKCk7XG4gICAgY29uc3QgbWF4ID0gbmV3IFZlYzMoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheTogcmF5LCBhYWJiOiBhYWJiKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgbyA9IHJheS5vLCBkID0gcmF5LmQ7XG4gICAgICAgIGNvbnN0IGl4ID0gMSAvIGQueCwgaXkgPSAxIC8gZC55LCBpeiA9IDEgLyBkLno7XG4gICAgICAgIFZlYzMuc3VidHJhY3QobWluLCBhYWJiLmNlbnRlciwgYWFiYi5oYWxmRXh0ZW50cyk7XG4gICAgICAgIFZlYzMuYWRkKG1heCwgYWFiYi5jZW50ZXIsIGFhYmIuaGFsZkV4dGVudHMpO1xuICAgICAgICBjb25zdCB0MSA9IChtaW4ueCAtIG8ueCkgKiBpeDtcbiAgICAgICAgY29uc3QgdDIgPSAobWF4LnggLSBvLngpICogaXg7XG4gICAgICAgIGNvbnN0IHQzID0gKG1pbi55IC0gby55KSAqIGl5O1xuICAgICAgICBjb25zdCB0NCA9IChtYXgueSAtIG8ueSkgKiBpeTtcbiAgICAgICAgY29uc3QgdDUgPSAobWluLnogLSBvLnopICogaXo7XG4gICAgICAgIGNvbnN0IHQ2ID0gKG1heC56IC0gby56KSAqIGl6O1xuICAgICAgICBjb25zdCB0bWluID0gTWF0aC5tYXgoTWF0aC5tYXgoTWF0aC5taW4odDEsIHQyKSwgTWF0aC5taW4odDMsIHQ0KSksIE1hdGgubWluKHQ1LCB0NikpO1xuICAgICAgICBjb25zdCB0bWF4ID0gTWF0aC5taW4oTWF0aC5taW4oTWF0aC5tYXgodDEsIHQyKSwgTWF0aC5tYXgodDMsIHQ0KSksIE1hdGgubWF4KHQ1LCB0NikpO1xuICAgICAgICBpZiAodG1heCA8IDAgfHwgdG1pbiA+IHRtYXgpIHsgcmV0dXJuIDAgfTtcbiAgICAgICAgcmV0dXJuIHRtaW47XG4gICAgfTtcbn0pKCk7XG5cbi8vIGFkYXB0IHRvIG9sZCBhcGlcbmNvbnN0IHJheUFhYmIgPSByYXlfYWFiYjtcblxuLyoqXG4gKiAhI2VuIHJheS1vYmIgaW50ZXJzZWN0PGJyLz5cbiAqICEjemgg5bCE57q/5ZKM5pa55ZCR5YyF5Zu055uS55qE55u45Lqk5oCn5qOA5rWL44CCXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHJheV9vYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlJheX0gcmF5XG4gKiBAcGFyYW0ge2dlb21VdGlscy5PYmJ9IG9iYiBEaXJlY3Rpb24gYm94XG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igb3IgMFxuICovXG5jb25zdCByYXlfb2JiID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgY2VudGVyID0gbmV3IFZlYzMoKTtcbiAgICBsZXQgbyA9IG5ldyBWZWMzKCk7XG4gICAgbGV0IGQgPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IFggPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IFkgPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IFogPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IHAgPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IHNpemUgPSBuZXcgQXJyYXkoMyk7XG4gICAgY29uc3QgZiA9IG5ldyBBcnJheSgzKTtcbiAgICBjb25zdCBlID0gbmV3IEFycmF5KDMpO1xuICAgIGNvbnN0IHQgPSBuZXcgQXJyYXkoNik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHJheTogcmF5LCBvYmI6IG9iYik6IG51bWJlciB7XG4gICAgICAgIHNpemVbMF0gPSBvYmIuaGFsZkV4dGVudHMueDtcbiAgICAgICAgc2l6ZVsxXSA9IG9iYi5oYWxmRXh0ZW50cy55O1xuICAgICAgICBzaXplWzJdID0gb2JiLmhhbGZFeHRlbnRzLno7XG4gICAgICAgIGNlbnRlciA9IG9iYi5jZW50ZXI7XG4gICAgICAgIG8gPSByYXkubztcbiAgICAgICAgZCA9IHJheS5kO1xuXG4gICAgICAgIGxldCBvYmJtID0gb2JiLm9yaWVudGF0aW9uLm07XG5cbiAgICAgICAgVmVjMy5zZXQoWCwgb2JibVswXSwgb2JibVsxXSwgb2JibVsyXSk7XG4gICAgICAgIFZlYzMuc2V0KFksIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pO1xuICAgICAgICBWZWMzLnNldChaLCBvYmJtWzZdLCBvYmJtWzddLCBvYmJtWzhdKTtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChwLCBjZW50ZXIsIG8pO1xuXG4gICAgICAgIC8vIFRoZSBjb3MgdmFsdWVzIG9mIHRoZSByYXkgb24gdGhlIFgsIFksIFpcbiAgICAgICAgZlswXSA9IFZlYzMuZG90KFgsIGQpO1xuICAgICAgICBmWzFdID0gVmVjMy5kb3QoWSwgZCk7XG4gICAgICAgIGZbMl0gPSBWZWMzLmRvdChaLCBkKTtcblxuICAgICAgICAvLyBUaGUgcHJvamVjdGlvbiBsZW5ndGggb2YgUCBvbiBYLCBZLCBaXG4gICAgICAgIGVbMF0gPSBWZWMzLmRvdChYLCBwKTtcbiAgICAgICAgZVsxXSA9IFZlYzMuZG90KFksIHApO1xuICAgICAgICBlWzJdID0gVmVjMy5kb3QoWiwgcCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChmW2ldID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKC1lW2ldIC0gc2l6ZVtpXSA+IDAgfHwgLWVbaV0gKyBzaXplW2ldIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQXZvaWQgZGl2IGJ5IDAhXG4gICAgICAgICAgICAgICAgZltpXSA9IDAuMDAwMDAwMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1pblxuICAgICAgICAgICAgdFtpICogMiArIDBdID0gKGVbaV0gKyBzaXplW2ldKSAvIGZbaV07XG4gICAgICAgICAgICAvLyBtYXhcbiAgICAgICAgICAgIHRbaSAqIDIgKyAxXSA9IChlW2ldIC0gc2l6ZVtpXSkgLyBmW2ldO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRtaW4gPSBNYXRoLm1heChcbiAgICAgICAgICAgIE1hdGgubWF4KFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHRbMF0sIHRbMV0pLFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHRbMl0sIHRbM10pKSxcbiAgICAgICAgICAgIE1hdGgubWluKHRbNF0sIHRbNV0pLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCB0bWF4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0WzBdLCB0WzFdKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1heCh0WzJdLCB0WzNdKSksXG4gICAgICAgICAgICBNYXRoLm1heCh0WzRdLCB0WzVdKSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRtYXggPCAwIHx8IHRtaW4gPiB0bWF4IHx8IHRtaW4gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0bWluO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gYWFiYi1hYWJiIGludGVyc2VjdDxici8+XG4gKiAhI3poIOi9tOWvuem9kOWMheWbtOebkuWSjOi9tOWvuem9kOWMheWbtOebkueahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBhYWJiX2FhYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IGFhYmIxIEF4aXMgYWxpZ25tZW50IHN1cnJvdW5kcyBib3ggMVxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYjIgQXhpcyBhbGlnbm1lbnQgc3Vycm91bmRzIGJveCAyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3QgYWFiYl9hYWJiID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhTWluID0gbmV3IFZlYzMoKTtcbiAgICBjb25zdCBhTWF4ID0gbmV3IFZlYzMoKTtcbiAgICBjb25zdCBiTWluID0gbmV3IFZlYzMoKTtcbiAgICBjb25zdCBiTWF4ID0gbmV3IFZlYzMoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFhYmIxOiBhYWJiLCBhYWJiMjogYWFiYikge1xuICAgICAgICBWZWMzLnN1YnRyYWN0KGFNaW4sIGFhYmIxLmNlbnRlciwgYWFiYjEuaGFsZkV4dGVudHMpO1xuICAgICAgICBWZWMzLmFkZChhTWF4LCBhYWJiMS5jZW50ZXIsIGFhYmIxLmhhbGZFeHRlbnRzKTtcbiAgICAgICAgVmVjMy5zdWJ0cmFjdChiTWluLCBhYWJiMi5jZW50ZXIsIGFhYmIyLmhhbGZFeHRlbnRzKTtcbiAgICAgICAgVmVjMy5hZGQoYk1heCwgYWFiYjIuY2VudGVyLCBhYWJiMi5oYWxmRXh0ZW50cyk7XG4gICAgICAgIHJldHVybiAoYU1pbi54IDw9IGJNYXgueCAmJiBhTWF4LnggPj0gYk1pbi54KSAmJlxuICAgICAgICAgICAgKGFNaW4ueSA8PSBiTWF4LnkgJiYgYU1heC55ID49IGJNaW4ueSkgJiZcbiAgICAgICAgICAgIChhTWluLnogPD0gYk1heC56ICYmIGFNYXgueiA+PSBiTWluLnopO1xuICAgIH07XG59KSgpO1xuXG5mdW5jdGlvbiBnZXRBQUJCVmVydGljZXMgKG1pbjogVmVjMywgbWF4OiBWZWMzLCBvdXQ6IFZlYzNbXSkge1xuICAgIFZlYzMuc2V0KG91dFswXSwgbWluLngsIG1heC55LCBtYXgueik7XG4gICAgVmVjMy5zZXQob3V0WzFdLCBtaW4ueCwgbWF4LnksIG1pbi56KTtcbiAgICBWZWMzLnNldChvdXRbMl0sIG1pbi54LCBtaW4ueSwgbWF4LnopO1xuICAgIFZlYzMuc2V0KG91dFszXSwgbWluLngsIG1pbi55LCBtaW4ueik7XG4gICAgVmVjMy5zZXQob3V0WzRdLCBtYXgueCwgbWF4LnksIG1heC56KTtcbiAgICBWZWMzLnNldChvdXRbNV0sIG1heC54LCBtYXgueSwgbWluLnopO1xuICAgIFZlYzMuc2V0KG91dFs2XSwgbWF4LngsIG1pbi55LCBtYXgueik7XG4gICAgVmVjMy5zZXQob3V0WzddLCBtYXgueCwgbWluLnksIG1pbi56KTtcbn1cblxuZnVuY3Rpb24gZ2V0T0JCVmVydGljZXMgKGM6IFZlYzMsIGU6IFZlYzMsIGExOiBWZWMzLCBhMjogVmVjMywgYTM6IFZlYzMsIG91dDogVmVjM1tdKSB7XG4gICAgVmVjMy5zZXQob3V0WzBdLFxuICAgICAgICBjLnggKyBhMS54ICogZS54ICsgYTIueCAqIGUueSArIGEzLnggKiBlLnosXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggKyBhMi55ICogZS55ICsgYTMueSAqIGUueixcbiAgICAgICAgYy56ICsgYTEueiAqIGUueCArIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzFdLFxuICAgICAgICBjLnggLSBhMS54ICogZS54ICsgYTIueCAqIGUueSArIGEzLnggKiBlLnosXG4gICAgICAgIGMueSAtIGExLnkgKiBlLnggKyBhMi55ICogZS55ICsgYTMueSAqIGUueixcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCArIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzJdLFxuICAgICAgICBjLnggKyBhMS54ICogZS54IC0gYTIueCAqIGUueSArIGEzLnggKiBlLnosXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggLSBhMi55ICogZS55ICsgYTMueSAqIGUueixcbiAgICAgICAgYy56ICsgYTEueiAqIGUueCAtIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzNdLFxuICAgICAgICBjLnggKyBhMS54ICogZS54ICsgYTIueCAqIGUueSAtIGEzLnggKiBlLnosXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggKyBhMi55ICogZS55IC0gYTMueSAqIGUueixcbiAgICAgICAgYy56ICsgYTEueiAqIGUueCArIGEyLnogKiBlLnkgLSBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzRdLFxuICAgICAgICBjLnggLSBhMS54ICogZS54IC0gYTIueCAqIGUueSAtIGEzLnggKiBlLnosXG4gICAgICAgIGMueSAtIGExLnkgKiBlLnggLSBhMi55ICogZS55IC0gYTMueSAqIGUueixcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCAtIGEyLnogKiBlLnkgLSBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzVdLFxuICAgICAgICBjLnggKyBhMS54ICogZS54IC0gYTIueCAqIGUueSAtIGEzLnggKiBlLnosXG4gICAgICAgIGMueSArIGExLnkgKiBlLnggLSBhMi55ICogZS55IC0gYTMueSAqIGUueixcbiAgICAgICAgYy56ICsgYTEueiAqIGUueCAtIGEyLnogKiBlLnkgLSBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzZdLFxuICAgICAgICBjLnggLSBhMS54ICogZS54ICsgYTIueCAqIGUueSAtIGEzLnggKiBlLnosXG4gICAgICAgIGMueSAtIGExLnkgKiBlLnggKyBhMi55ICogZS55IC0gYTMueSAqIGUueixcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCArIGEyLnogKiBlLnkgLSBhMy56ICogZS56LFxuICAgICk7XG4gICAgVmVjMy5zZXQob3V0WzddLFxuICAgICAgICBjLnggLSBhMS54ICogZS54IC0gYTIueCAqIGUueSArIGEzLnggKiBlLnosXG4gICAgICAgIGMueSAtIGExLnkgKiBlLnggLSBhMi55ICogZS55ICsgYTMueSAqIGUueixcbiAgICAgICAgYy56IC0gYTEueiAqIGUueCAtIGEyLnogKiBlLnkgKyBhMy56ICogZS56LFxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGdldEludGVydmFsICh2ZXJ0aWNlczogYW55W10gfCBWZWMzW10sIGF4aXM6IFZlYzMpIHtcbiAgICBsZXQgbWluID0gVmVjMy5kb3QoYXhpcywgdmVydGljZXNbMF0pLCBtYXggPSBtaW47XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA4OyArK2kpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdGlvbiA9IFZlYzMuZG90KGF4aXMsIHZlcnRpY2VzW2ldKTtcbiAgICAgICAgbWluID0gKHByb2plY3Rpb24gPCBtaW4pID8gcHJvamVjdGlvbiA6IG1pbjtcbiAgICAgICAgbWF4ID0gKHByb2plY3Rpb24gPiBtYXgpID8gcHJvamVjdGlvbiA6IG1heDtcbiAgICB9XG4gICAgcmV0dXJuIFttaW4sIG1heF07XG59XG5cbi8qKlxuICogISNlbiBhYWJiLW9iYiBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDovbTlr7npvZDljIXlm7Tnm5LlkozmlrnlkJHljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2QgYWFiYl9vYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IGFhYmIgQWxpZ24gdGhlIGF4aXMgYXJvdW5kIHRoZSBib3hcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCBhYWJiX29iYiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGVzdCA9IG5ldyBBcnJheSgxNSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHRlc3RbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICB9XG4gICAgY29uc3QgdmVydGljZXMgPSBuZXcgQXJyYXkoOCk7XG4gICAgY29uc3QgdmVydGljZXMyID0gbmV3IEFycmF5KDgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIHZlcnRpY2VzW2ldID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgICAgIHZlcnRpY2VzMltpXSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIH1cbiAgICBjb25zdCBtaW4gPSBuZXcgVmVjMygpO1xuICAgIGNvbnN0IG1heCA9IG5ldyBWZWMzKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhYWJiOiBhYWJiLCBvYmI6IG9iYik6IG51bWJlciB7XG4gICAgICAgIGxldCBvYmJtID0gb2JiLm9yaWVudGF0aW9uLm07XG5cbiAgICAgICAgVmVjMy5zZXQodGVzdFswXSwgMSwgMCwgMCk7XG4gICAgICAgIFZlYzMuc2V0KHRlc3RbMV0sIDAsIDEsIDApO1xuICAgICAgICBWZWMzLnNldCh0ZXN0WzJdLCAwLCAwLCAxKTtcbiAgICAgICAgVmVjMy5zZXQodGVzdFszXSwgb2JibVswXSwgb2JibVsxXSwgb2JibVsyXSk7XG4gICAgICAgIFZlYzMuc2V0KHRlc3RbNF0sIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pO1xuICAgICAgICBWZWMzLnNldCh0ZXN0WzVdLCBvYmJtWzZdLCBvYmJtWzddLCBvYmJtWzhdKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7ICsraSkgeyAvLyBGaWxsIG91dCByZXN0IG9mIGF4aXNcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModGVzdFs2ICsgaSAqIDMgKyAwXSwgdGVzdFtpXSwgdGVzdFswXSk7XG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMV0pO1xuICAgICAgICAgICAgVmVjMy5jcm9zcyh0ZXN0WzYgKyBpICogMyArIDFdLCB0ZXN0W2ldLCB0ZXN0WzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFZlYzMuc3VidHJhY3QobWluLCBhYWJiLmNlbnRlciwgYWFiYi5oYWxmRXh0ZW50cyk7XG4gICAgICAgIFZlYzMuYWRkKG1heCwgYWFiYi5jZW50ZXIsIGFhYmIuaGFsZkV4dGVudHMpO1xuICAgICAgICBnZXRBQUJCVmVydGljZXMobWluLCBtYXgsIHZlcnRpY2VzKTtcbiAgICAgICAgZ2V0T0JCVmVydGljZXMob2JiLmNlbnRlciwgb2JiLmhhbGZFeHRlbnRzLCB0ZXN0WzNdLCB0ZXN0WzRdLCB0ZXN0WzVdLCB2ZXJ0aWNlczIpO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTU7ICsraikge1xuICAgICAgICAgICAgY29uc3QgYSA9IGdldEludGVydmFsKHZlcnRpY2VzLCB0ZXN0W2pdKTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBnZXRJbnRlcnZhbCh2ZXJ0aWNlczIsIHRlc3Rbal0pO1xuICAgICAgICAgICAgaWYgKGJbMF0gPiBhWzFdIHx8IGFbMF0gPiBiWzFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7IC8vIFNlcGVyYXRpbmcgYXhpcyBmb3VuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogISNlbiBhYWJiLXBsYW5lIGludGVyc2VjdDxici8+XG4gKiAhI3poIOi9tOWvuem9kOWMheWbtOebkuWSjOW5s+mdoueahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBhYWJiX3BsYW5lXG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiIEFsaWduIHRoZSBheGlzIGFyb3VuZCB0aGUgYm94XG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcbiAqIEByZXR1cm4ge251bWJlcn0gaW5zaWRlKGJhY2spID0gLTEsIG91dHNpZGUoZnJvbnQpID0gMCwgaW50ZXJzZWN0ID0gMVxuICovXG5jb25zdCBhYWJiX3BsYW5lID0gZnVuY3Rpb24gKGFhYmI6IGFhYmIsIHBsYW5lOiBwbGFuZSk6IG51bWJlciB7XG4gICAgY29uc3QgciA9IGFhYmIuaGFsZkV4dGVudHMueCAqIE1hdGguYWJzKHBsYW5lLm4ueCkgK1xuICAgICAgICBhYWJiLmhhbGZFeHRlbnRzLnkgKiBNYXRoLmFicyhwbGFuZS5uLnkpICtcbiAgICAgICAgYWFiYi5oYWxmRXh0ZW50cy56ICogTWF0aC5hYnMocGxhbmUubi56KTtcbiAgICBjb25zdCBkb3QgPSBWZWMzLmRvdChwbGFuZS5uLCBhYWJiLmNlbnRlcik7XG4gICAgaWYgKGRvdCArIHIgPCBwbGFuZS5kKSB7IHJldHVybiAtMTsgfVxuICAgIGVsc2UgaWYgKGRvdCAtIHIgPiBwbGFuZS5kKSB7IHJldHVybiAwOyB9XG4gICAgcmV0dXJuIDE7XG59O1xuXG4vKipcbiAqICEjZW4gYWFiYi1mcnVzdHVtIGludGVyc2VjdCwgZmFzdGVyIGJ1dCBoYXMgZmFsc2UgcG9zaXRpdmUgY29ybmVyIGNhc2VzPGJyLz5cbiAqICEjemgg6L205a+56b2Q5YyF5Zu055uS5ZKM6ZSl5Y+w55u45Lqk5oCn5qOA5rWL77yM6YCf5bqm5b+r77yM5L2G5pyJ6ZSZ6K+v5oOF5Ya144CCXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIGFhYmJfZnJ1c3R1bVxuICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gYWFiYiBBbGlnbiB0aGUgYXhpcyBhcm91bmQgdGhlIGJveFxuICogQHBhcmFtIHtnZW9tVXRpbHMuRnJ1c3R1bX0gZnJ1c3R1bVxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG5vdCAwXG4gKi9cbmNvbnN0IGFhYmJfZnJ1c3R1bSA9IGZ1bmN0aW9uIChhYWJiOiBhYWJiLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0ucGxhbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXG4gICAgICAgIGlmIChhYWJiX3BsYW5lKGFhYmIsIGZydXN0dW0ucGxhbmVzW2ldKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSAvLyBjb21wbGV0ZWx5IG91dHNpZGVcbiAgICByZXR1cm4gMTtcbn07XG5cbi8vIGh0dHBzOi8vY2VzaXVtLmNvbS9ibG9nLzIwMTcvMDIvMDIvdGlnaHRlci1mcnVzdHVtLWN1bGxpbmctYW5kLXdoeS15b3UtbWF5LXdhbnQtdG8tZGlzcmVnYXJkLWl0L1xuLyoqXG4gKiAhI2VuIGFhYmItZnJ1c3R1bSBpbnRlcnNlY3QsIGhhbmRsZXMgbW9zdCBvZiB0aGUgZmFsc2UgcG9zaXRpdmVzIGNvcnJlY3RseTxici8+XG4gKiAhI3poIOi9tOWvuem9kOWMheWbtOebkuWSjOmUpeWPsOebuOS6pOaAp+ajgOa1i++8jOato+ehruWkhOeQhuWkp+WkmuaVsOmUmeivr+aDheWGteOAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBhYWJiX2ZydXN0dW1fYWNjdXJhdGVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IGFhYmIgQWxpZ24gdGhlIGF4aXMgYXJvdW5kIHRoZSBib3hcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuY29uc3QgYWFiYl9mcnVzdHVtX2FjY3VyYXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0bXAgPSBuZXcgQXJyYXkoOCk7XG4gICAgbGV0IG91dDEgPSAwLCBvdXQyID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0bXBbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhYWJiOiBhYWJiLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDAsIGludGVyc2VjdHMgPSBmYWxzZTtcbiAgICAgICAgLy8gMS4gYWFiYiBpbnNpZGUvb3V0c2lkZSBmcnVzdHVtIHRlc3RcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnBsYW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ID0gYWFiYl9wbGFuZShhYWJiLCBmcnVzdHVtLnBsYW5lc1tpXSk7XG4gICAgICAgICAgICAvLyBmcnVzdHVtIHBsYW5lIG5vcm1hbCBwb2ludHMgdG8gdGhlIGluc2lkZVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gLTEpIHsgcmV0dXJuIDA7IH0gLy8gY29tcGxldGVseSBvdXRzaWRlXG4gICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQgPT09IDEpIHsgaW50ZXJzZWN0cyA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIDE7IH0gLy8gY29tcGxldGVseSBpbnNpZGVcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgICAgLy8gMi4gZnJ1c3R1bSBpbnNpZGUvb3V0c2lkZSBhYWJiIHRlc3RcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBWZWMzLnN1YnRyYWN0KHRtcFtpXSwgZnJ1c3R1bS52ZXJ0aWNlc1tpXSwgYWFiYi5jZW50ZXIpO1xuICAgICAgICB9XG4gICAgICAgIG91dDEgPSAwLCBvdXQyID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG1wW2ldLnggPiBhYWJiLmhhbGZFeHRlbnRzLngpIHsgb3V0MSsrOyB9XG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueCA8IC1hYWJiLmhhbGZFeHRlbnRzLngpIHsgb3V0MisrOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG91dDEgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoIHx8IG91dDIgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoKSB7IHJldHVybiAwOyB9XG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG1wW2ldLnkgPiBhYWJiLmhhbGZFeHRlbnRzLnkpIHsgb3V0MSsrOyB9XG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueSA8IC1hYWJiLmhhbGZFeHRlbnRzLnkpIHsgb3V0MisrOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG91dDEgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoIHx8IG91dDIgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoKSB7IHJldHVybiAwOyB9XG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodG1wW2ldLnogPiBhYWJiLmhhbGZFeHRlbnRzLnopIHsgb3V0MSsrOyB9XG4gICAgICAgICAgICBlbHNlIGlmICh0bXBbaV0ueiA8IC1hYWJiLmhhbGZFeHRlbnRzLnopIHsgb3V0MisrOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG91dDEgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoIHx8IG91dDIgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoKSB7IHJldHVybiAwOyB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gb2JiLXBvaW50IGludGVyc2VjdDxici8+XG4gKiAhI3poIOaWueWQkeWMheWbtOebkuWSjOeCueeahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBvYmJfcG9pbnRcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlZlYzN9IHBvaW50XG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG9yIGZhbHNlXG4gKi9cbmNvbnN0IG9iYl9wb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IFZlYzMoMCwgMCwgMCksIG0zID0gbmV3IE1hdDMoKTtcbiAgICBjb25zdCBsZXNzVGhhbiA9IGZ1bmN0aW9uIChhOiBWZWMzLCBiOiBWZWMzKTogYm9vbGVhbiB7IHJldHVybiBNYXRoLmFicyhhLngpIDwgYi54ICYmIE1hdGguYWJzKGEueSkgPCBiLnkgJiYgTWF0aC5hYnMoYS56KSA8IGIuejsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iYjogb2JiLCBwb2ludDogVmVjMyk6IGJvb2xlYW4ge1xuICAgICAgICBWZWMzLnN1YnRyYWN0KHRtcCwgcG9pbnQsIG9iYi5jZW50ZXIpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDModG1wLCB0bXAsIE1hdDMudHJhbnNwb3NlKG0zLCBvYmIub3JpZW50YXRpb24pKTtcbiAgICAgICAgcmV0dXJuIGxlc3NUaGFuKHRtcCwgb2JiLmhhbGZFeHRlbnRzKTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiAhI2VuIG9iYi1wbGFuZSBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDmlrnlkJHljIXlm7Tnm5LlkozlubPpnaLnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgb2JiX3BsYW5lXG4gKiBAcGFyYW0ge2dlb21VdGlscy5PYmJ9IG9iYiBEaXJlY3Rpb24gYm94XG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcbiAqIEByZXR1cm4ge251bWJlcn0gaW5zaWRlKGJhY2spID0gLTEsIG91dHNpZGUoZnJvbnQpID0gMCwgaW50ZXJzZWN0ID0gMVxuICovXG5jb25zdCBvYmJfcGxhbmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFic0RvdCA9IGZ1bmN0aW9uIChuOiBWZWMzLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhuLnggKiB4ICsgbi55ICogeSArIG4ueiAqIHopO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmI6IG9iYiwgcGxhbmU6IHBsYW5lKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG9iYm0gPSBvYmIub3JpZW50YXRpb24ubTtcbiAgICAgICAgLy8gUmVhbC1UaW1lIENvbGxpc2lvbiBEZXRlY3Rpb24sIENocmlzdGVyIEVyaWNzb24sIHAuIDE2My5cbiAgICAgICAgY29uc3QgciA9IG9iYi5oYWxmRXh0ZW50cy54ICogYWJzRG90KHBsYW5lLm4sIG9iYm1bMF0sIG9iYm1bMV0sIG9iYm1bMl0pICtcbiAgICAgICAgICAgIG9iYi5oYWxmRXh0ZW50cy55ICogYWJzRG90KHBsYW5lLm4sIG9iYm1bM10sIG9iYm1bNF0sIG9iYm1bNV0pICtcbiAgICAgICAgICAgIG9iYi5oYWxmRXh0ZW50cy56ICogYWJzRG90KHBsYW5lLm4sIG9iYm1bNl0sIG9iYm1bN10sIG9iYm1bOF0pO1xuXG4gICAgICAgIGNvbnN0IGRvdCA9IFZlYzMuZG90KHBsYW5lLm4sIG9iYi5jZW50ZXIpO1xuICAgICAgICBpZiAoZG90ICsgciA8IHBsYW5lLmQpIHsgcmV0dXJuIC0xOyB9XG4gICAgICAgIGVsc2UgaWYgKGRvdCAtIHIgPiBwbGFuZS5kKSB7IHJldHVybiAwOyB9XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gb2JiLWZydXN0dW0gaW50ZXJzZWN0LCBmYXN0ZXIgYnV0IGhhcyBmYWxzZSBwb3NpdGl2ZSBjb3JuZXIgY2FzZXM8YnIvPlxuICogISN6aCDmlrnlkJHljIXlm7Tnm5LlkozplKXlj7Dnm7jkuqTmgKfmo4DmtYvvvIzpgJ/luqblv6vvvIzkvYbmnInplJnor6/mg4XlhrXjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgb2JiX2ZydXN0dW1cbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCBvYmJfZnJ1c3R1bSA9IGZ1bmN0aW9uIChvYmI6IG9iYiwgZnJ1c3R1bTogZnJ1c3R1bSk6IG51bWJlciB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnBsYW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBmcnVzdHVtIHBsYW5lIG5vcm1hbCBwb2ludHMgdG8gdGhlIGluc2lkZVxuICAgICAgICBpZiAob2JiX3BsYW5lKG9iYiwgZnJ1c3R1bS5wbGFuZXNbaV0pID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9IC8vIGNvbXBsZXRlbHkgb3V0c2lkZVxuICAgIHJldHVybiAxO1xufTtcblxuLy8gaHR0cHM6Ly9jZXNpdW0uY29tL2Jsb2cvMjAxNy8wMi8wMi90aWdodGVyLWZydXN0dW0tY3VsbGluZy1hbmQtd2h5LXlvdS1tYXktd2FudC10by1kaXNyZWdhcmQtaXQvXG4vKipcbiAqICEjZW4gb2JiLWZydXN0dW0gaW50ZXJzZWN0LCBoYW5kbGVzIG1vc3Qgb2YgdGhlIGZhbHNlIHBvc2l0aXZlcyBjb3JyZWN0bHk8YnIvPlxuICogISN6aCDmlrnlkJHljIXlm7Tnm5LlkozplKXlj7Dnm7jkuqTmgKfmo4DmtYvvvIzmraPnoa7lpITnkIblpKflpJrmlbDplJnor6/mg4XlhrXjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgb2JiX2ZydXN0dW1fYWNjdXJhdGVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiIERpcmVjdGlvbiBib3hcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLkZydXN0dW19IGZydXN0dW1cbiAqIEByZXR1cm4ge251bWJlcn0gMCBvciBub3QgMFxuICovXG5jb25zdCBvYmJfZnJ1c3R1bV9hY2N1cmF0ZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IEFycmF5KDgpO1xuICAgIGxldCBkaXN0ID0gMCwgb3V0MSA9IDAsIG91dDIgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG1wLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRtcFtpXSA9IG5ldyBWZWMzKDAsIDAsIDApO1xuICAgIH1cbiAgICBjb25zdCBkb3QgPSBmdW5jdGlvbiAobjogVmVjMywgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBuLnggKiB4ICsgbi55ICogeSArIG4ueiAqIHo7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iYjogb2JiLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDAsIGludGVyc2VjdHMgPSBmYWxzZTtcbiAgICAgICAgLy8gMS4gb2JiIGluc2lkZS9vdXRzaWRlIGZydXN0dW0gdGVzdFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0ucGxhbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBvYmJfcGxhbmUob2JiLCBmcnVzdHVtLnBsYW5lc1tpXSk7XG4gICAgICAgICAgICAvLyBmcnVzdHVtIHBsYW5lIG5vcm1hbCBwb2ludHMgdG8gdGhlIGluc2lkZVxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gLTEpIHsgcmV0dXJuIDA7IH0gLy8gY29tcGxldGVseSBvdXRzaWRlXG4gICAgICAgICAgICBlbHNlIGlmIChyZXN1bHQgPT09IDEpIHsgaW50ZXJzZWN0cyA9IHRydWU7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWludGVyc2VjdHMpIHsgcmV0dXJuIDE7IH0gLy8gY29tcGxldGVseSBpbnNpZGVcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgICAgLy8gMi4gZnJ1c3R1bSBpbnNpZGUvb3V0c2lkZSBvYmIgdGVzdFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIFZlYzMuc3VidHJhY3QodG1wW2ldLCBmcnVzdHVtLnZlcnRpY2VzW2ldLCBvYmIuY2VudGVyKTtcbiAgICAgICAgfVxuICAgICAgICBvdXQxID0gMCwgb3V0MiA9IDA7XG4gICAgICAgIGxldCBvYmJtID0gb2JiLm9yaWVudGF0aW9uLm07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGlzdCA9IGRvdCh0bXBbaV0sIG9iYm1bMF0sIG9iYm1bMV0sIG9iYm1bMl0pO1xuICAgICAgICAgICAgaWYgKGRpc3QgPiBvYmIuaGFsZkV4dGVudHMueCkgeyBvdXQxKys7IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpc3QgPCAtb2JiLmhhbGZFeHRlbnRzLngpIHsgb3V0MisrOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG91dDEgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoIHx8IG91dDIgPT09IGZydXN0dW0udmVydGljZXMubGVuZ3RoKSB7IHJldHVybiAwOyB9XG4gICAgICAgIG91dDEgPSAwOyBvdXQyID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaXN0ID0gZG90KHRtcFtpXSwgb2JibVszXSwgb2JibVs0XSwgb2JibVs1XSk7XG4gICAgICAgICAgICBpZiAoZGlzdCA+IG9iYi5oYWxmRXh0ZW50cy55KSB7IG91dDErKzsgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzdCA8IC1vYmIuaGFsZkV4dGVudHMueSkgeyBvdXQyKys7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3V0MSA9PT0gZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGggfHwgb3V0MiA9PT0gZnJ1c3R1bS52ZXJ0aWNlcy5sZW5ndGgpIHsgcmV0dXJuIDA7IH1cbiAgICAgICAgb3V0MSA9IDA7IG91dDIgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0udmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRpc3QgPSBkb3QodG1wW2ldLCBvYmJtWzZdLCBvYmJtWzddLCBvYmJtWzhdKTtcbiAgICAgICAgICAgIGlmIChkaXN0ID4gb2JiLmhhbGZFeHRlbnRzLnopIHsgb3V0MSsrOyB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaXN0IDwgLW9iYi5oYWxmRXh0ZW50cy56KSB7IG91dDIrKzsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvdXQxID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCB8fCBvdXQyID09PSBmcnVzdHVtLnZlcnRpY2VzLmxlbmd0aCkgeyByZXR1cm4gMDsgfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiAhI2VuIG9iYi1vYmIgaW50ZXJzZWN0PGJyLz5cbiAqICEjemgg5pa55ZCR5YyF5Zu055uS5ZKM5pa55ZCR5YyF5Zu055uS55qE55u45Lqk5oCn5qOA5rWL44CCXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIG9iYl9vYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiMSBEaXJlY3Rpb24gYm94MVxuICogQHBhcmFtIHtnZW9tVXRpbHMuT2JifSBvYmIyIERpcmVjdGlvbiBib3gyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3Qgb2JiX29iYiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGVzdCA9IG5ldyBBcnJheSgxNSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHRlc3RbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJ0aWNlcyA9IG5ldyBBcnJheSg4KTtcbiAgICBjb25zdCB2ZXJ0aWNlczIgPSBuZXcgQXJyYXkoOCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgdmVydGljZXNbaV0gPSBuZXcgVmVjMygwLCAwLCAwKTtcbiAgICAgICAgdmVydGljZXMyW2ldID0gbmV3IFZlYzMoMCwgMCwgMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmIxOiBvYmIsIG9iYjI6IG9iYik6IG51bWJlciB7XG5cbiAgICAgICAgbGV0IG9iYjFtID0gb2JiMS5vcmllbnRhdGlvbi5tO1xuICAgICAgICBsZXQgb2JiMm0gPSBvYmIyLm9yaWVudGF0aW9uLm07XG5cbiAgICAgICAgVmVjMy5zZXQodGVzdFswXSwgb2JiMW1bMF0sIG9iYjFtWzFdLCBvYmIxbVsyXSk7XG4gICAgICAgIFZlYzMuc2V0KHRlc3RbMV0sIG9iYjFtWzNdLCBvYmIxbVs0XSwgb2JiMW1bNV0pO1xuICAgICAgICBWZWMzLnNldCh0ZXN0WzJdLCBvYmIxbVs2XSwgb2JiMW1bN10sIG9iYjFtWzhdKTtcbiAgICAgICAgVmVjMy5zZXQodGVzdFszXSwgb2JiMm1bMF0sIG9iYjJtWzFdLCBvYmIybVsyXSk7XG4gICAgICAgIFZlYzMuc2V0KHRlc3RbNF0sIG9iYjJtWzNdLCBvYmIybVs0XSwgb2JiMm1bNV0pO1xuICAgICAgICBWZWMzLnNldCh0ZXN0WzVdLCBvYmIybVs2XSwgb2JiMm1bN10sIG9iYjJtWzhdKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7ICsraSkgeyAvLyBGaWxsIG91dCByZXN0IG9mIGF4aXNcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModGVzdFs2ICsgaSAqIDMgKyAwXSwgdGVzdFtpXSwgdGVzdFswXSk7XG4gICAgICAgICAgICBWZWMzLmNyb3NzKHRlc3RbNiArIGkgKiAzICsgMV0sIHRlc3RbaV0sIHRlc3RbMV0pO1xuICAgICAgICAgICAgVmVjMy5jcm9zcyh0ZXN0WzYgKyBpICogMyArIDFdLCB0ZXN0W2ldLCB0ZXN0WzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldE9CQlZlcnRpY2VzKG9iYjEuY2VudGVyLCBvYmIxLmhhbGZFeHRlbnRzLCB0ZXN0WzBdLCB0ZXN0WzFdLCB0ZXN0WzJdLCB2ZXJ0aWNlcyk7XG4gICAgICAgIGdldE9CQlZlcnRpY2VzKG9iYjIuY2VudGVyLCBvYmIyLmhhbGZFeHRlbnRzLCB0ZXN0WzNdLCB0ZXN0WzRdLCB0ZXN0WzVdLCB2ZXJ0aWNlczIpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgYSA9IGdldEludGVydmFsKHZlcnRpY2VzLCB0ZXN0W2ldKTtcbiAgICAgICAgICAgIGNvbnN0IGIgPSBnZXRJbnRlcnZhbCh2ZXJ0aWNlczIsIHRlc3RbaV0pO1xuICAgICAgICAgICAgaWYgKGJbMF0gPiBhWzFdIHx8IGFbMF0gPiBiWzFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7IC8vIFNlcGVyYXRpbmcgYXhpcyBmb3VuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogISNlbiBwaGVyZS1wbGFuZSBpbnRlcnNlY3QsIG5vdCBuZWNlc3NhcmlseSBmYXN0ZXIgdGhhbiBvYmItcGxhbmU8YnIvPlxuICogZHVlIHRvIHRoZSBsZW5ndGggY2FsY3VsYXRpb24gb2YgdGhlIHBsYW5lIG5vcm1hbCB0byBmYWN0b3Igb3V0PGJyLz5cbiAqIHRoZSB1bm5vbWFsaXplZCBwbGFuZSBkaXN0YW5jZTxici8+XG4gKiAhI3poIOeQg+S4juW5s+mdoueahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBzcGhlcmVfcGxhbmVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXG4gKiBAcGFyYW0ge2dlb21VdGlscy5QbGFuZX0gcGxhbmVcbiAqIEByZXR1cm4ge251bWJlcn0gaW5zaWRlKGJhY2spID0gLTEsIG91dHNpZGUoZnJvbnQpID0gMCwgaW50ZXJzZWN0ID0gMVxuICovXG5jb25zdCBzcGhlcmVfcGxhbmUgPSBmdW5jdGlvbiAoc3BoZXJlOiBzcGhlcmUsIHBsYW5lOiBwbGFuZSk6IG51bWJlciB7XG4gICAgY29uc3QgZG90ID0gVmVjMy5kb3QocGxhbmUubiwgc3BoZXJlLmNlbnRlcik7XG4gICAgY29uc3QgciA9IHNwaGVyZS5yYWRpdXMgKiBwbGFuZS5uLmxlbmd0aCgpO1xuICAgIGlmIChkb3QgKyByIDwgcGxhbmUuZCkgeyByZXR1cm4gLTE7IH1cbiAgICBlbHNlIGlmIChkb3QgLSByID4gcGxhbmUuZCkgeyByZXR1cm4gMDsgfVxuICAgIHJldHVybiAxO1xufTtcblxuLyoqXG4gKiAhI2VuIHNwaGVyZS1mcnVzdHVtIGludGVyc2VjdCwgZmFzdGVyIGJ1dCBoYXMgZmFsc2UgcG9zaXRpdmUgY29ybmVyIGNhc2VzPGJyLz5cbiAqICEjemgg55CD5ZKM6ZSl5Y+w55qE55u45Lqk5oCn5qOA5rWL77yM6YCf5bqm5b+r77yM5L2G5pyJ6ZSZ6K+v5oOF5Ya144CCXG4gKiBAc3RhdGljXG4gKiBAbWV0aG9kIHNwaGVyZV9mcnVzdHVtXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZVxuICogQHBhcmFtIHtnZW9tVXRpbHMuRnJ1c3R1bX0gZnJ1c3R1bVxuICogQHJldHVybiB7bnVtYmVyfSAwIG9yIG5vdCAwXG4gKi9cbmNvbnN0IHNwaGVyZV9mcnVzdHVtID0gZnVuY3Rpb24gKHNwaGVyZTogc3BoZXJlLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZydXN0dW0ucGxhbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXG4gICAgICAgIGlmIChzcGhlcmVfcGxhbmUoc3BoZXJlLCBmcnVzdHVtLnBsYW5lc1tpXSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH0gLy8gY29tcGxldGVseSBvdXRzaWRlXG4gICAgcmV0dXJuIDE7XG59O1xuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yMDkxMjY5Mi92aWV3LWZydXN0dW0tY3VsbGluZy1jb3JuZXItY2FzZXNcbi8qKlxuICogISNlbiBzcGhlcmUtZnJ1c3R1bSBpbnRlcnNlY3QsIGhhbmRsZXMgdGhlIGZhbHNlIHBvc2l0aXZlcyBjb3JyZWN0bHk8YnIvPlxuICogISN6aCDnkIPlkozplKXlj7DnmoTnm7jkuqTmgKfmo4DmtYvvvIzmraPnoa7lpITnkIblpKflpJrmlbDplJnor6/mg4XlhrXjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgc3BoZXJlX2ZydXN0dW1fYWNjdXJhdGVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXG4gKiBAcGFyYW0ge2dlb21VdGlscy5GcnVzdHVtfSBmcnVzdHVtXG4gKiBAcmV0dXJuIHtudW1iZXJ9IDAgb3Igbm90IDBcbiAqL1xuY29uc3Qgc3BoZXJlX2ZydXN0dW1fYWNjdXJhdGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoMCwgMCwgMCksIG1hcCA9IFsxLCAtMSwgMSwgLTEsIDEsIC0xXTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNwaGVyZTogc3BoZXJlLCBmcnVzdHVtOiBmcnVzdHVtKTogbnVtYmVyIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBsYW5lID0gZnJ1c3R1bS5wbGFuZXNbaV07XG4gICAgICAgICAgICBjb25zdCByID0gc3BoZXJlLnJhZGl1cywgYyA9IHNwaGVyZS5jZW50ZXI7XG4gICAgICAgICAgICBjb25zdCBuID0gcGxhbmUubiwgZCA9IHBsYW5lLmQ7XG4gICAgICAgICAgICBjb25zdCBkb3QgPSBWZWMzLmRvdChuLCBjKTtcbiAgICAgICAgICAgIC8vIGZydXN0dW0gcGxhbmUgbm9ybWFsIHBvaW50cyB0byB0aGUgaW5zaWRlXG4gICAgICAgICAgICBpZiAoZG90ICsgciA8IGQpIHsgcmV0dXJuIDA7IH0gLy8gY29tcGxldGVseSBvdXRzaWRlXG4gICAgICAgICAgICBlbHNlIGlmIChkb3QgLSByID4gZCkgeyBjb250aW51ZTsgfVxuICAgICAgICAgICAgLy8gaW4gY2FzZSBvZiBmYWxzZSBwb3NpdGl2ZXNcbiAgICAgICAgICAgIC8vIGhhcyBmYWxzZSBuZWdhdGl2ZXMsIHN0aWxsIHdvcmtpbmcgb24gaXRcbiAgICAgICAgICAgIFZlYzMuYWRkKHB0LCBjLCBWZWMzLm11bHRpcGx5U2NhbGFyKHB0LCBuLCByKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDY7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChqID09PSBpIHx8IGogPT09IGkgKyBtYXBbaV0pIHsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICBjb25zdCB0ZXN0ID0gZnJ1c3R1bS5wbGFuZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKFZlYzMuZG90KHRlc3QubiwgcHQpIDwgdGVzdC5kKSB7IHJldHVybiAwOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogISNlbiBzcGhlcmUtc3BoZXJlIGludGVyc2VjdDxici8+XG4gKiAhI3poIOeQg+WSjOeQg+eahOebuOS6pOaAp+ajgOa1i+OAglxuICogQHN0YXRpY1xuICogQG1ldGhvZCBzcGhlcmVfc3BoZXJlXG4gKiBAcGFyYW0ge2dlb21VdGlscy5TcGhlcmV9IHNwaGVyZTBcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlMVxuICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBvciBmYWxzZVxuICovXG5jb25zdCBzcGhlcmVfc3BoZXJlID0gZnVuY3Rpb24gKHNwaGVyZTA6IHNwaGVyZSwgc3BoZXJlMTogc3BoZXJlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgciA9IHNwaGVyZTAucmFkaXVzICsgc3BoZXJlMS5yYWRpdXM7XG4gICAgcmV0dXJuIFZlYzMuc3F1YXJlZERpc3RhbmNlKHNwaGVyZTAuY2VudGVyLCBzcGhlcmUxLmNlbnRlcikgPCByICogcjtcbn07XG5cbi8qKlxuICogISNlbiBzcGhlcmUtYWFiYiBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDnkIPlkozovbTlr7npvZDljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgc3BoZXJlX2FhYmJcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLlNwaGVyZX0gc3BoZXJlXG4gKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhYWJiXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG9yIGZhbHNlXG4gKi9cbmNvbnN0IHNwaGVyZV9hYWJiID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBwdCA9IG5ldyBWZWMzKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzcGhlcmU6IHNwaGVyZSwgYWFiYjogYWFiYik6IGJvb2xlYW4ge1xuICAgICAgICBkaXN0YW5jZS5wdF9wb2ludF9hYWJiKHB0LCBzcGhlcmUuY2VudGVyLCBhYWJiKTtcbiAgICAgICAgcmV0dXJuIFZlYzMuc3F1YXJlZERpc3RhbmNlKHNwaGVyZS5jZW50ZXIsIHB0KSA8IHNwaGVyZS5yYWRpdXMgKiBzcGhlcmUucmFkaXVzO1xuICAgIH07XG59KSgpO1xuXG4vKipcbiAqICEjZW4gc3BoZXJlLW9iYiBpbnRlcnNlY3Q8YnIvPlxuICogISN6aCDnkIPlkozmlrnlkJHljIXlm7Tnm5LnmoTnm7jkuqTmgKfmo4DmtYvjgIJcbiAqIEBzdGF0aWNcbiAqIEBtZXRob2Qgc3BoZXJlX29iYlxuICogQHBhcmFtIHtnZW9tVXRpbHMuU3BoZXJlfSBzcGhlcmVcbiAqIEBwYXJhbSB7Z2VvbVV0aWxzLk9iYn0gb2JiXG4gKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIG9yIGZhbHNlXG4gKi9cbmNvbnN0IHNwaGVyZV9vYmIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHB0ID0gbmV3IFZlYzMoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHNwaGVyZTogc3BoZXJlLCBvYmI6IG9iYik6IGJvb2xlYW4ge1xuICAgICAgICBkaXN0YW5jZS5wdF9wb2ludF9vYmIocHQsIHNwaGVyZS5jZW50ZXIsIG9iYik7XG4gICAgICAgIHJldHVybiBWZWMzLnNxdWFyZWREaXN0YW5jZShzcGhlcmUuY2VudGVyLCBwdCkgPCBzcGhlcmUucmFkaXVzICogc3BoZXJlLnJhZGl1cztcbiAgICB9O1xufSkoKTtcblxuY29uc3QgaW50ZXJzZWN0ID0ge1xuICAgIC8vIG9sZCBhcGlcbiAgICByYXlBYWJiLFxuICAgIHJheU1lc2gsXG4gICAgcmF5Y2FzdCxcbiAgICByYXlUcmlhbmdsZSxcblxuICAgIHJheV9zcGhlcmUsXG4gICAgcmF5X2FhYmIsXG4gICAgcmF5X29iYixcbiAgICByYXlfcGxhbmUsXG4gICAgcmF5X3RyaWFuZ2xlLFxuICAgIGxpbmVfcGxhbmUsXG4gICAgbGluZV90cmlhbmdsZSxcbiAgICBsaW5lX3F1YWQsXG5cbiAgICBzcGhlcmVfc3BoZXJlLFxuICAgIHNwaGVyZV9hYWJiLFxuICAgIHNwaGVyZV9vYmIsXG4gICAgc3BoZXJlX3BsYW5lLFxuICAgIHNwaGVyZV9mcnVzdHVtLFxuICAgIHNwaGVyZV9mcnVzdHVtX2FjY3VyYXRlLFxuXG4gICAgYWFiYl9hYWJiLFxuICAgIGFhYmJfb2JiLFxuICAgIGFhYmJfcGxhbmUsXG4gICAgYWFiYl9mcnVzdHVtLFxuICAgIGFhYmJfZnJ1c3R1bV9hY2N1cmF0ZSxcblxuICAgIG9iYl9vYmIsXG4gICAgb2JiX3BsYW5lLFxuICAgIG9iYl9mcnVzdHVtLFxuICAgIG9iYl9mcnVzdHVtX2FjY3VyYXRlLFxuICAgIG9iYl9wb2ludCxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgaW50ZXJzZWN0aW9uIGRldGVjdGlvbiBvZiBnMSBhbmQgZzIgY2FuIGZpbGwgaW4gdGhlIHNoYXBlIGluIHRoZSBiYXNpYyBnZW9tZXRyeS5cbiAgICAgKiAhI3poXG4gICAgICogZzEg5ZKMIGcyIOeahOebuOS6pOaAp+ajgOa1i++8jOWPr+Whq+WFpeWfuuehgOWHoOS9leS4reeahOW9oueKtuOAglxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAbWV0aG9kIHJlc29sdmVcbiAgICAgKiBAcGFyYW0gZzEgR2VvbWV0cnkgMVxuICAgICAqIEBwYXJhbSBnMiBHZW9tZXRyeSAyXG4gICAgICogQHBhcmFtIG91dFB0IG9wdGlvbmFsLCBJbnRlcnNlY3Rpb24gcG9pbnQuIChub3RlOiBvbmx5IHBhcnRpYWwgc2hhcGUgZGV0ZWN0aW9uIHdpdGggdGhpcyByZXR1cm4gdmFsdWUpXG4gICAgICovXG4gICAgcmVzb2x2ZSAoZzE6IGFueSwgZzI6IGFueSwgb3V0UHQgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHR5cGUxID0gZzEuX3R5cGUsIHR5cGUyID0gZzIuX3R5cGU7XG4gICAgICAgIGNvbnN0IHJlc29sdmVyID0gdGhpc1t0eXBlMSB8IHR5cGUyXTtcbiAgICAgICAgaWYgKHR5cGUxIDwgdHlwZTIpIHsgcmV0dXJuIHJlc29sdmVyKGcxLCBnMiwgb3V0UHQpOyB9XG4gICAgICAgIGVsc2UgeyByZXR1cm4gcmVzb2x2ZXIoZzIsIGcxLCBvdXRQdCk7IH1cbiAgICB9LFxufTtcblxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1JBWSB8IGVudW1zLlNIQVBFX1NQSEVSRV0gPSByYXlfc3BoZXJlO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1JBWSB8IGVudW1zLlNIQVBFX0FBQkJdID0gcmF5X2FhYmI7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfUkFZIHwgZW51bXMuU0hBUEVfT0JCXSA9IHJheV9vYmI7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfUkFZIHwgZW51bXMuU0hBUEVfUExBTkVdID0gcmF5X3BsYW5lO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1JBWSB8IGVudW1zLlNIQVBFX1RSSUFOR0xFXSA9IHJheV90cmlhbmdsZTtcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9MSU5FIHwgZW51bXMuU0hBUEVfUExBTkVdID0gbGluZV9wbGFuZTtcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9MSU5FIHwgZW51bXMuU0hBUEVfVFJJQU5HTEVdID0gbGluZV90cmlhbmdsZTtcblxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRV0gPSBzcGhlcmVfc3BoZXJlO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRSB8IGVudW1zLlNIQVBFX0FBQkJdID0gc3BoZXJlX2FhYmI7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfT0JCXSA9IHNwaGVyZV9vYmI7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfUExBTkVdID0gc3BoZXJlX3BsYW5lO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX1NQSEVSRSB8IGVudW1zLlNIQVBFX0ZSVVNUVU1dID0gc3BoZXJlX2ZydXN0dW07XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfU1BIRVJFIHwgZW51bXMuU0hBUEVfRlJVU1RVTV9BQ0NVUkFURV0gPSBzcGhlcmVfZnJ1c3R1bV9hY2N1cmF0ZTtcblxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX0FBQkJdID0gYWFiYl9hYWJiO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX0FBQkIgfCBlbnVtcy5TSEFQRV9PQkJdID0gYWFiYl9vYmI7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfQUFCQiB8IGVudW1zLlNIQVBFX1BMQU5FXSA9IGFhYmJfcGxhbmU7XG5pbnRlcnNlY3RbZW51bXMuU0hBUEVfQUFCQiB8IGVudW1zLlNIQVBFX0ZSVVNUVU1dID0gYWFiYl9mcnVzdHVtO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX0FBQkIgfCBlbnVtcy5TSEFQRV9GUlVTVFVNX0FDQ1VSQVRFXSA9IGFhYmJfZnJ1c3R1bV9hY2N1cmF0ZTtcblxuaW50ZXJzZWN0W2VudW1zLlNIQVBFX09CQl0gPSBvYmJfb2JiO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX09CQiB8IGVudW1zLlNIQVBFX1BMQU5FXSA9IG9iYl9wbGFuZTtcbmludGVyc2VjdFtlbnVtcy5TSEFQRV9PQkIgfCBlbnVtcy5TSEFQRV9GUlVTVFVNXSA9IG9iYl9mcnVzdHVtO1xuaW50ZXJzZWN0W2VudW1zLlNIQVBFX09CQiB8IGVudW1zLlNIQVBFX0ZSVVNUVU1fQUNDVVJBVEVdID0gb2JiX2ZydXN0dW1fYWNjdXJhdGU7XG5cbmV4cG9ydCBkZWZhdWx0IGludGVyc2VjdDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9