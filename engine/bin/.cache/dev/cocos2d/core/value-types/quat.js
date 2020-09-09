
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/quat.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueType = _interopRequireDefault(require("./value-type"));

var _CCClass = _interopRequireDefault(require("../platform/CCClass"));

var _vec = _interopRequireDefault(require("./vec3"));

var _mat = _interopRequireDefault(require("./mat3"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
var _w = 0.0;
/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Quat
 * @extends ValueType
 */

/**
 * !#en
 * Constructor
 * see {{#crossLink "cc/quat:method"}}cc.quat{{/crossLink}}
 * !#zh
 * 构造函数，可查看 {{#crossLink "cc/quat:method"}}cc.quat{{/crossLink}}
 * @method constructor
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [z=0]
 * @param {number} [w=1]
 */

var Quat = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Quat, _ValueType);

  var _proto = Quat.prototype;

  /**
   * !#en Calculate the multiply result between this quaternion and another one
   * !#zh 计算四元数乘积的结果
   * @method mul
   * @param {Quat} other
   * @param {Quat} [out]
   * @returns {Quat} out
   */
  _proto.mul = function mul(other, out) {
    return Quat.multiply(out || new Quat(), this, other);
  };

  /**
   * !#zh 获得指定四元数的拷贝
   * !#en Obtaining copy specified quaternion
   * @method clone
   * @typescript
   * clone<Out extends IQuatLike> (a: Out): Quat
   * @static
   */
  Quat.clone = function clone(a) {
    return new Quat(a.x, a.y, a.z, a.w);
  }
  /**
   * !#zh 复制目标四元数
   * !#en Copy quaternion target
   * @method copy
   * @typescript
   * copy<Out extends IQuatLike, QuatLike extends IQuatLike> (out: Out, a: QuatLike): Out
   * @static
   */
  ;

  Quat.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 设置四元数值
   * !#en Provided Quaternion Value
   * @method set
   * @typescript
   * set<Out extends IQuatLike> (out: Out, x: number, y: number, z: number, w: number): Out
   * @static
   */
  ;

  Quat.set = function set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * !#zh 将目标赋值为单位四元数
   * !#en The target of an assignment as a unit quaternion
   * @method identity
   * @typescript
   * identity<Out extends IQuatLike> (out: Out): Out
   * @static
   */
  ;

  Quat.identity = function identity(out) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    out.w = 1;
    return out;
  }
  /**
   * !#zh 设置四元数为两向量间的最短路径旋转，默认两向量都已归一化
   * !#en Set quaternion rotation is the shortest path between two vectors, the default two vectors are normalized
   * @method rotationTo
   * @typescript
   * rotationTo<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, a: VecLike, b: VecLike): Out
   * @static
   */
  ;

  Quat.rotationTo = function rotationTo(out, a, b) {
    var dot = _vec["default"].dot(a, b);

    if (dot < -0.999999) {
      _vec["default"].cross(v3_1, _vec["default"].RIGHT, a);

      if (v3_1.mag() < 0.000001) {
        _vec["default"].cross(v3_1, _vec["default"].UP, a);
      }

      _vec["default"].normalize(v3_1, v3_1);

      Quat.fromAxisAngle(out, v3_1, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out.x = 0;
      out.y = 0;
      out.z = 0;
      out.w = 1;
      return out;
    } else {
      _vec["default"].cross(v3_1, a, b);

      out.x = v3_1.x;
      out.y = v3_1.y;
      out.z = v3_1.z;
      out.w = 1 + dot;
      return Quat.normalize(out, out);
    }
  }
  /**
   * !#zh 获取四元数的旋转轴和旋转弧度
   * !#en Get the rotary shaft and the arc of rotation quaternion
   * @method getAxisAngle
   * @param {Vec3} outAxis - 旋转轴输出
   * @param {Quat} q - 源四元数
   * @return {Number} - 旋转弧度
   * @typescript
   * getAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (outAxis: VecLike, q: Out): number
   * @static
   */
  ;

  Quat.getAxisAngle = function getAxisAngle(outAxis, q) {
    var rad = Math.acos(q.w) * 2.0;
    var s = Math.sin(rad / 2.0);

    if (s !== 0.0) {
      outAxis.x = q.x / s;
      outAxis.y = q.y / s;
      outAxis.z = q.z / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      outAxis.x = 1;
      outAxis.y = 0;
      outAxis.z = 0;
    }

    return rad;
  }
  /**
   * !#zh 四元数乘法
   * !#en Quaternion multiplication
   * @method multiply
   * @typescript
   * multiply<Out extends IQuatLike, QuatLike_1 extends IQuatLike, QuatLike_2 extends IQuatLike> (out: Out, a: QuatLike_1, b: QuatLike_2): Out
   * @static
   */
  ;

  Quat.multiply = function multiply(out, a, b) {
    _x = a.x * b.w + a.w * b.x + a.y * b.z - a.z * b.y;
    _y = a.y * b.w + a.w * b.y + a.z * b.x - a.x * b.z;
    _z = a.z * b.w + a.w * b.z + a.x * b.y - a.y * b.x;
    _w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
    out.x = _x;
    out.y = _y;
    out.z = _z;
    out.w = _w;
    return out;
  }
  /**
   * !#zh 四元数标量乘法
   * !#en Quaternion scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IQuatLike> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Quat.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * !#zh 四元数乘加：A + B * scale
   * !#en Quaternion multiplication and addition: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd<Out extends IQuatLike> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Quat.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * !#zh 绕 X 轴旋转指定四元数
   * !#en About the X axis specified quaternion
   * @method rotateX
   * @typescript
   * rotateX<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateX = function rotateX(out, a, rad) {
    rad *= 0.5;
    var bx = Math.sin(rad);
    var bw = Math.cos(rad);
    out.x = a.x * bw + a.w * bx;
    out.y = a.y * bw + a.z * bx;
    out.z = a.z * bw - a.y * bx;
    out.w = a.w * bw - a.x * bx;
    return out;
  }
  /**
   * !#zh 绕 Y 轴旋转指定四元数
   * !#en Rotation about the Y axis designated quaternion
   * @method rotateY
   * @typescript
   * rotateY<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateY = function rotateY(out, a, rad) {
    rad *= 0.5;
    var by = Math.sin(rad);
    var bw = Math.cos(rad);
    out.x = a.x * bw - a.z * by;
    out.y = a.y * bw + a.w * by;
    out.z = a.z * bw + a.x * by;
    out.w = a.w * bw - a.y * by;
    return out;
  }
  /**
   * !#zh 绕 Z 轴旋转指定四元数
   * !#en Around the Z axis specified quaternion
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IQuatLike> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateZ = function rotateZ(out, a, rad) {
    rad *= 0.5;
    var bz = Math.sin(rad);
    var bw = Math.cos(rad);
    out.x = a.x * bw + a.y * bz;
    out.y = a.y * bw - a.x * bz;
    out.z = a.z * bw + a.w * bz;
    out.w = a.w * bw - a.z * bz;
    return out;
  }
  /**
   * !#zh 绕世界空间下指定轴旋转四元数
   * !#en Space around the world at a given axis of rotation quaternion
   * @method rotateAround
   * @typescript
   * rotateAround<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, rot: Out, axis: VecLike, rad: number): Out
   * @param axis 旋转轴，默认已归一化
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateAround = function rotateAround(out, rot, axis, rad) {
    // get inv-axis (local to rot)
    Quat.invert(qt_1, rot);

    _vec["default"].transformQuat(v3_1, axis, qt_1); // rotate by inv-axis


    Quat.fromAxisAngle(qt_1, v3_1, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * !#zh 绕本地空间下指定轴旋转四元数
   * !#en Local space around the specified axis rotation quaternion
   * @method rotateAroundLocal
   * @typescript
   * rotateAroundLocal<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, rot: Out, axis: VecLike, rad: number): Out
   * @param axis 旋转轴
   * @param rad 旋转弧度
   * @static
   */
  ;

  Quat.rotateAroundLocal = function rotateAroundLocal(out, rot, axis, rad) {
    Quat.fromAxisAngle(qt_1, axis, rad);
    Quat.multiply(out, rot, qt_1);
    return out;
  }
  /**
   * !#zh 根据 xyz 分量计算 w 分量，默认已归一化
   * !#en The component w xyz components calculated, normalized by default
   * @method calculateW
   * @typescript
   * calculateW<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.calculateW = function calculateW(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = Math.sqrt(Math.abs(1.0 - a.x * a.x - a.y * a.y - a.z * a.z));
    return out;
  }
  /**
   * !#zh 四元数点积（数量积）
   * !#en Quaternion dot product (scalar product)
   * @method dot
   * @typescript
   * dot<Out extends IQuatLike> (a: Out, b: Out): number
   * @static
   */
  ;

  Quat.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * !#zh 逐元素线性插值： A + t * (B - A)
   * !#en Element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp<Out extends IQuatLike> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Quat.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * !#zh 四元数球面插值
   * !#en Spherical quaternion interpolation
   * @method slerp
   * @typescript
   * slerp<Out extends IQuatLike, QuatLike_1 extends IQuatLike, QuatLike_2 extends IQuatLike>(out: Out, a: QuatLike_1, b: QuatLike_2, t: number): Out
   * @static
   */
  ;

  Quat.slerp = function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var scale0 = 0;
    var scale1 = 0; // calc cosine

    var cosom = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      b.x = -b.x;
      b.y = -b.y;
      b.z = -b.z;
      b.w = -b.w;
    } // calculate coefficients


    if (1.0 - cosom > 0.000001) {
      // standard case (slerp)
      var omega = Math.acos(cosom);
      var sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out.x = scale0 * a.x + scale1 * b.x;
    out.y = scale0 * a.y + scale1 * b.y;
    out.z = scale0 * a.z + scale1 * b.z;
    out.w = scale0 * a.w + scale1 * b.w;
    return out;
  }
  /**
   * !#zh 带两个控制点的四元数球面插值
   * !#en Quaternion with two spherical interpolation control points
   * @method sqlerp
   * @typescript
   * sqlerp<Out extends IQuatLike> (out: Out, a: Out, b: Out, c: Out, d: Out, t: number): Out
   * @static
   */
  ;

  Quat.sqlerp = function sqlerp(out, a, b, c, d, t) {
    Quat.slerp(qt_1, a, d, t);
    Quat.slerp(qt_2, b, c, t);
    Quat.slerp(out, qt_1, qt_2, 2 * t * (1 - t));
    return out;
  }
  /**
   * !#zh 四元数求逆
   * !#en Quaternion inverse
   * @method invert
   * @typescript
   * invert<Out extends IQuatLike, QuatLike extends IQuatLike> (out: Out, a: QuatLike): Out
   * @static
   */
  ;

  Quat.invert = function invert(out, a) {
    var dot = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
    var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out.x = -a.x * invDot;
    out.y = -a.y * invDot;
    out.z = -a.z * invDot;
    out.w = a.w * invDot;
    return out;
  }
  /**
   * !#zh 求共轭四元数，对单位四元数与求逆等价，但更高效
   * !#en Conjugating a quaternion, and the unit quaternion equivalent to inversion, but more efficient
   * @method conjugate
   * @typescript
   * conjugate<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.conjugate = function conjugate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 求四元数长度
   * !#en Seek length quaternion
   * @method len
   * @typescript
   * len<Out extends IQuatLike> (a: Out): number
   * @static
   */
  ;

  Quat.len = function len(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  }
  /**
   * !#zh 求四元数长度平方
   * !#en Seeking quaternion square of the length
   * @method lengthSqr
   * @typescript
   * lengthSqr<Out extends IQuatLike> (a: Out): number
   * @static
   */
  ;

  Quat.lengthSqr = function lengthSqr(a) {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  }
  /**
   * !#zh 归一化四元数
   * !#en Normalized quaternions
   * @method normalize
   * @typescript
   * normalize<Out extends IQuatLike> (out: Out, a: Out): Out
   * @static
   */
  ;

  Quat.normalize = function normalize(out, a) {
    var len = a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = a.x * len;
      out.y = a.y * len;
      out.z = a.z * len;
      out.w = a.w * len;
    }

    return out;
  }
  /**
   * !#zh 根据本地坐标轴朝向计算四元数，默认三向量都已归一化且相互垂直
   * !#en Calculated according to the local orientation quaternion coordinate axis, the default three vectors are normalized and mutually perpendicular
   * @method fromAxes
   * @typescript
   * fromAxes<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, xAxis: VecLike, yAxis: VecLike, zAxis: VecLike): Out
   * @static
   */
  ;

  Quat.fromAxes = function fromAxes(out, xAxis, yAxis, zAxis) {
    _mat["default"].set(m3_1, xAxis.x, xAxis.y, xAxis.z, yAxis.x, yAxis.y, yAxis.z, zAxis.x, zAxis.y, zAxis.z);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * !#zh 根据视口的前方向和上方向计算四元数
   * !#en The forward direction and the direction of the viewport computing quaternion
   * @method fromViewUp
   * @typescript
   * fromViewUp<Out extends IQuatLike> (out: Out, view: Vec3, up?: Vec3): Out
   * @param view 视口面向的前方向，必须归一化
   * @param up 视口的上方向，必须归一化，默认为 (0, 1, 0)
   * @static
   */
  ;

  Quat.fromViewUp = function fromViewUp(out, view, up) {
    _mat["default"].fromViewUp(m3_1, view, up);

    return Quat.normalize(out, Quat.fromMat3(out, m3_1));
  }
  /**
   * !#zh 根据旋转轴和旋转弧度计算四元数
   * !#en The quaternion calculated and the arc of rotation of the rotary shaft
   * @method fromAxisAngle
   * @typescript
   * fromAxisAngle<Out extends IQuatLike, VecLike extends IVec3Like> (out: Out, axis: VecLike, rad: number): Out
   * @static
   */
  ;

  Quat.fromAxisAngle = function fromAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out.x = s * axis.x;
    out.y = s * axis.y;
    out.z = s * axis.z;
    out.w = Math.cos(rad);
    return out;
  }
  /**
   * Set a quaternion from the given euler angle 0, 0, z.
   *
   * @param {Quat} out - Quaternion to store result.
   * @param {number} z - Angle to rotate around Z axis in degrees.
   * @returns {Quat}
   * @function
   */
  ;

  Quat.fromAngleZ = function fromAngleZ(out, z) {
    z *= halfToRad;
    out.x = out.y = 0;
    out.z = Math.sin(z);
    out.w = Math.cos(z);
    return out;
  }
  /**
   * !#zh 根据三维矩阵信息计算四元数，默认输入矩阵不含有缩放信息
   * !#en Calculating the three-dimensional quaternion matrix information, default zoom information input matrix does not contain
   * @method fromMat3
   * @typescript
   * fromMat3<Out extends IQuatLike> (out: Out, mat: Mat3): Out
   * @static
   */
  ;

  Quat.fromMat3 = function fromMat3(out, mat) {
    var m = mat.m;
    var m00 = m[0],
        m10 = m[1],
        m20 = m[2],
        m01 = m[3],
        m11 = m[4],
        m21 = m[5],
        m02 = m[6],
        m12 = m[7],
        m22 = m[8];
    var trace = m00 + m11 + m22;

    if (trace > 0) {
      var s = 0.5 / Math.sqrt(trace + 1.0);
      out.w = 0.25 / s;
      out.x = (m21 - m12) * s;
      out.y = (m02 - m20) * s;
      out.z = (m10 - m01) * s;
    } else if (m00 > m11 && m00 > m22) {
      var _s = 2.0 * Math.sqrt(1.0 + m00 - m11 - m22);

      out.w = (m21 - m12) / _s;
      out.x = 0.25 * _s;
      out.y = (m01 + m10) / _s;
      out.z = (m02 + m20) / _s;
    } else if (m11 > m22) {
      var _s2 = 2.0 * Math.sqrt(1.0 + m11 - m00 - m22);

      out.w = (m02 - m20) / _s2;
      out.x = (m01 + m10) / _s2;
      out.y = 0.25 * _s2;
      out.z = (m12 + m21) / _s2;
    } else {
      var _s3 = 2.0 * Math.sqrt(1.0 + m22 - m00 - m11);

      out.w = (m10 - m01) / _s3;
      out.x = (m02 + m20) / _s3;
      out.y = (m12 + m21) / _s3;
      out.z = 0.25 * _s3;
    }

    return out;
  }
  /**
   * !#zh 根据欧拉角信息计算四元数，旋转顺序为 YZX
   * !#en The quaternion calculated Euler angle information, rotation order YZX
   * @method fromEuler
   * @typescript
   * fromEuler<Out extends IQuatLike> (out: Out, x: number, y: number, z: number): Out
   * @static
   */
  ;

  Quat.fromEuler = function fromEuler(out, x, y, z) {
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out.x = sx * cy * cz + cx * sy * sz;
    out.y = cx * sy * cz + sx * cy * sz;
    out.z = cx * cy * sz - sx * sy * cz;
    out.w = cx * cy * cz - sx * sy * sz;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 X 轴向量
   * !#en This returns the result of the quaternion coordinate system X-axis vector
   * @method toAxisX
   * @typescript
   * toAxisX<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisX = function toAxisX(out, q) {
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = 1.0 - fy * q.y - fz * q.z;
    out.y = fy * q.x + fz * q.w;
    out.z = fz * q.x + fy * q.w;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 Y 轴向量
   * !#en This returns the result of the quaternion coordinate system Y axis vector
   * @method toAxisY
   * @typescript
   * toAxisY<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisY = function toAxisY(out, q) {
    var fx = 2.0 * q.x;
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = fy * q.x - fz * q.w;
    out.y = 1.0 - fx * q.x - fz * q.z;
    out.z = fz * q.y + fx * q.w;
    return out;
  }
  /**
   * !#zh 返回定义此四元数的坐标系 Z 轴向量
   * !#en This returns the result of the quaternion coordinate system the Z-axis vector
   * @method toAxisZ
   * @typescript
   * toAxisZ<Out extends IQuatLike, VecLike extends IVec3Like> (out: VecLike, q: Out): VecLike
   * @static
   */
  ;

  Quat.toAxisZ = function toAxisZ(out, q) {
    var fx = 2.0 * q.x;
    var fy = 2.0 * q.y;
    var fz = 2.0 * q.z;
    out.x = fz * q.x - fy * q.w;
    out.y = fz * q.y - fx * q.w;
    out.z = 1.0 - fx * q.x - fy * q.y;
    return out;
  }
  /**
   * !#zh 根据四元数计算欧拉角，返回角度 x, y 在 [-180, 180] 区间内, z 默认在 [-90, 90] 区间内，旋转顺序为 YZX
   * !#en The quaternion calculated Euler angles, return angle x, y in the [-180, 180] interval, z default the range [-90, 90] interval, the rotation order YZX
   * @method toEuler
   * @typescript
   * toEuler<Out extends IVec3Like> (out: Out, q: IQuatLike, outerZ?: boolean): Out
   * @param outerZ z 取值范围区间改为 [-180, -90] U [90, 180]
   * @static
   */
  ;

  Quat.toEuler = function toEuler(out, q, outerZ) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var bank = 0;
    var heading = 0;
    var attitude = 0;
    var test = x * y + z * w;

    if (test > 0.499999) {
      bank = 0; // default to zero

      heading = (0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = 90;
    } else if (test < -0.499999) {
      bank = 0; // default to zero

      heading = -(0, _utils.toDegree)(2 * Math.atan2(x, w));
      attitude = -90;
    } else {
      var sqx = x * x;
      var sqy = y * y;
      var sqz = z * z;
      bank = (0, _utils.toDegree)(Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * sqx - 2 * sqz));
      heading = (0, _utils.toDegree)(Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * sqy - 2 * sqz));
      attitude = (0, _utils.toDegree)(Math.asin(2 * test));

      if (outerZ) {
        bank = -180 * Math.sign(bank + 1e-6) + bank;
        heading = -180 * Math.sign(heading + 1e-6) + heading;
        attitude = 180 * Math.sign(attitude + 1e-6) - attitude;
      }
    }

    out.x = bank;
    out.y = heading;
    out.z = attitude;
    return out;
  }
  /**
   * !#zh 四元数等价判断
   * !#en Analyzing quaternion equivalent
   * @method strictEquals
   * @typescript
   * strictEquals<Out extends IQuatLike> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Quat.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * !#zh 排除浮点数误差的四元数近似等价判断
   * !#en Negative floating point error quaternion approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals<Out extends IQuatLike> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Quat.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * !#zh 四元数转数组
   * !#en Quaternion rotation array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, q: IQuatLike, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Quat.toArray = function toArray(out, q, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = q.x;
    out[ofs + 1] = q.y;
    out[ofs + 2] = q.z;
    out[ofs + 3] = q.w;
    return out;
  }
  /**
   * !#zh 数组转四元数
   * !#en Array to a quaternion
   * @method fromArray
   * @typescript
   * fromArray <Out extends IQuatLike> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Quat.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    out.w = arr[ofs + 3];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  function Quat(x, y, z, w) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (z === void 0) {
      z = 0;
    }

    if (w === void 0) {
      w = 1;
    }

    _this = _ValueType.call(this) || this;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = void 0;
    _this.w = void 0;

    if (x && typeof x === 'object') {
      _this.x = x.x;
      _this.y = x.y;
      _this.z = x.z;
      _this.w = x.w;
    } else {
      _this.x = x;
      _this.y = y;
      _this.z = z;
      _this.w = w;
    }

    return _this;
  }
  /**
   * !#en clone a Quat object and return the new object
   * !#zh 克隆一个四元数并返回
   * @method clone
   * @return {Quat}
   */


  _proto.clone = function clone() {
    return new Quat(this.x, this.y, this.z, this.w);
  }
  /**
   * !#en Set values with another quaternion
   * !#zh 用另一个四元数的值设置到当前对象上。
   * @method set
   * @param {Quat} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Quat} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    this.z = newValue.z;
    this.w = newValue.w;
    return this;
  }
  /**
   * !#en Check whether current quaternion equals another
   * !#zh 当前的四元数是否与指定的四元数相等。
   * @method equals
   * @param {Quat} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * !#en Convert quaternion to euler
   * !#zh 转换四元数到欧拉角
   * @method toEuler
   * @param {Vec3} out
   * @return {Vec3}
   */
  ;

  _proto.toEuler = function toEuler(out) {
    return Quat.toEuler(out, this);
  }
  /**
   * !#en Convert euler to quaternion
   * !#zh 转换欧拉角到四元数
   * @method fromEuler
   * @param {Vec3} euler
   * @return {Quat}
   */
  ;

  _proto.fromEuler = function fromEuler(euler) {
    return Quat.fromEuler(this, euler.x, euler.y, euler.z);
  }
  /**
   * !#en Calculate the interpolation result between this quaternion and another one with given ratio
   * !#zh 计算四元数的插值结果
   * @member lerp
   * @param {Quat} to
   * @param {Number} ratio
   * @param {Quat} [out]
   * @returns {Quat} out
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Quat();
    Quat.slerp(out, this, to, ratio);
    return out;
  }
  /**
   * !#en Calculate the multiply result between this quaternion and another one
   * !#zh 计算四元数乘积的结果
   * @member multiply
   * @param {Quat} other
   * @returns {Quat} this
   */
  ;

  _proto.multiply = function multiply(other) {
    return Quat.multiply(this, this, other);
  }
  /**
   * !#en Rotates a quaternion by the given angle (in radians) about a world space axis.
   * !#zh 围绕世界空间轴按给定弧度旋转四元数
   * @member rotateAround
   * @param {Quat} rot - Quaternion to rotate
   * @param {Vec3} axis - The axis around which to rotate in world space
   * @param {Number} rad - Angle (in radians) to rotate
   * @param {Quat} [out] - Quaternion to store result
   * @returns {Quat} out
   */
  ;

  _proto.rotateAround = function rotateAround(rot, axis, rad, out) {
    out = out || new Quat();
    return Quat.rotateAround(out, rot, axis, rad);
  };

  return Quat;
}(_valueType["default"]);

exports["default"] = Quat;
Quat.mul = Quat.multiply;
Quat.scale = Quat.multiplyScalar;
Quat.mag = Quat.len;
Quat.IDENTITY = Object.freeze(new Quat());
var qt_1 = new Quat();
var qt_2 = new Quat();
var v3_1 = new _vec["default"]();
var m3_1 = new _mat["default"]();
var halfToRad = 0.5 * Math.PI / 180.0;

_CCClass["default"].fastDefine('cc.Quat', Quat, {
  x: 0,
  y: 0,
  z: 0,
  w: 1
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Quat"}}cc.Quat{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Quat"}}cc.Quat{{/crossLink}} 对象。
 * @method quat
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [z=0]
 * @param {Number} [w=1]
 * @return {Quat}
 */


cc.quat = function quat(x, y, z, w) {
  return new Quat(x, y, z, w);
};

cc.Quat = Quat;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3F1YXQudHMiXSwibmFtZXMiOlsiX3giLCJfeSIsIl96IiwiX3ciLCJRdWF0IiwibXVsIiwib3RoZXIiLCJvdXQiLCJtdWx0aXBseSIsImNsb25lIiwiYSIsIngiLCJ5IiwieiIsInciLCJjb3B5Iiwic2V0IiwiaWRlbnRpdHkiLCJyb3RhdGlvblRvIiwiYiIsImRvdCIsIlZlYzMiLCJjcm9zcyIsInYzXzEiLCJSSUdIVCIsIm1hZyIsIlVQIiwibm9ybWFsaXplIiwiZnJvbUF4aXNBbmdsZSIsIk1hdGgiLCJQSSIsImdldEF4aXNBbmdsZSIsIm91dEF4aXMiLCJxIiwicmFkIiwiYWNvcyIsInMiLCJzaW4iLCJtdWx0aXBseVNjYWxhciIsInNjYWxlQW5kQWRkIiwic2NhbGUiLCJyb3RhdGVYIiwiYngiLCJidyIsImNvcyIsInJvdGF0ZVkiLCJieSIsInJvdGF0ZVoiLCJieiIsInJvdGF0ZUFyb3VuZCIsInJvdCIsImF4aXMiLCJpbnZlcnQiLCJxdF8xIiwidHJhbnNmb3JtUXVhdCIsInJvdGF0ZUFyb3VuZExvY2FsIiwiY2FsY3VsYXRlVyIsInNxcnQiLCJhYnMiLCJsZXJwIiwidCIsInNsZXJwIiwic2NhbGUwIiwic2NhbGUxIiwiY29zb20iLCJvbWVnYSIsInNpbm9tIiwic3FsZXJwIiwiYyIsImQiLCJxdF8yIiwiaW52RG90IiwiY29uanVnYXRlIiwibGVuIiwibGVuZ3RoU3FyIiwiZnJvbUF4ZXMiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJNYXQzIiwibTNfMSIsImZyb21NYXQzIiwiZnJvbVZpZXdVcCIsInZpZXciLCJ1cCIsImZyb21BbmdsZVoiLCJoYWxmVG9SYWQiLCJtYXQiLCJtIiwibTAwIiwibTEwIiwibTIwIiwibTAxIiwibTExIiwibTIxIiwibTAyIiwibTEyIiwibTIyIiwidHJhY2UiLCJmcm9tRXVsZXIiLCJzeCIsImN4Iiwic3kiLCJjeSIsInN6IiwiY3oiLCJ0b0F4aXNYIiwiZnkiLCJmeiIsInRvQXhpc1kiLCJmeCIsInRvQXhpc1oiLCJ0b0V1bGVyIiwib3V0ZXJaIiwiYmFuayIsImhlYWRpbmciLCJhdHRpdHVkZSIsInRlc3QiLCJhdGFuMiIsInNxeCIsInNxeSIsInNxeiIsImFzaW4iLCJzaWduIiwic3RyaWN0RXF1YWxzIiwiZXF1YWxzIiwiZXBzaWxvbiIsIkVQU0lMT04iLCJtYXgiLCJ0b0FycmF5Iiwib2ZzIiwiZnJvbUFycmF5IiwiYXJyIiwibmV3VmFsdWUiLCJldWxlciIsInRvIiwicmF0aW8iLCJWYWx1ZVR5cGUiLCJJREVOVElUWSIsIk9iamVjdCIsImZyZWV6ZSIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwiY2MiLCJxdWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7OztJQVlxQkM7Ozs7O0FBS2pCOzs7Ozs7OztTQVFBQyxNQUFBLGFBQUtDLEtBQUwsRUFBa0JDLEdBQWxCLEVBQW9DO0FBQ2hDLFdBQU9ILElBQUksQ0FBQ0ksUUFBTCxDQUFjRCxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFyQixFQUFpQyxJQUFqQyxFQUF1Q0UsS0FBdkMsQ0FBUDtBQUNIOztBQUlEOzs7Ozs7OztPQVFPRyxRQUFQLGVBQXFDQyxDQUFyQyxFQUE2QztBQUN6QyxXQUFPLElBQUlOLElBQUosQ0FBU00sQ0FBQyxDQUFDQyxDQUFYLEVBQWNELENBQUMsQ0FBQ0UsQ0FBaEIsRUFBbUJGLENBQUMsQ0FBQ0csQ0FBckIsRUFBd0JILENBQUMsQ0FBQ0ksQ0FBMUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT0MsT0FBUCxjQUFnRVIsR0FBaEUsRUFBMEVHLENBQTFFLEVBQXVGO0FBQ25GSCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUUQsQ0FBQyxDQUFDQyxDQUFWO0FBQ0FKLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQVY7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFILENBQUMsQ0FBQ0csQ0FBVjtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUosQ0FBQyxDQUFDSSxDQUFWO0FBQ0EsV0FBT1AsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT1MsTUFBUCxhQUFtQ1QsR0FBbkMsRUFBNkNJLENBQTdDLEVBQXdEQyxDQUF4RCxFQUFtRUMsQ0FBbkUsRUFBOEVDLENBQTlFLEVBQXlGO0FBQ3JGUCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUUEsQ0FBUjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUEsQ0FBUjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUEsQ0FBUjtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUEsQ0FBUjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9VLFdBQVAsa0JBQXdDVixHQUF4QyxFQUFrRDtBQUM5Q0EsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVEsQ0FBUjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxDQUFSO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLENBQVI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsQ0FBUjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9XLGFBQVAsb0JBQXFFWCxHQUFyRSxFQUErRUcsQ0FBL0UsRUFBMkZTLENBQTNGLEVBQXVHO0FBQ25HLFFBQU1DLEdBQUcsR0FBR0MsZ0JBQUtELEdBQUwsQ0FBU1YsQ0FBVCxFQUFZUyxDQUFaLENBQVo7O0FBQ0EsUUFBSUMsR0FBRyxHQUFHLENBQUMsUUFBWCxFQUFxQjtBQUNqQkMsc0JBQUtDLEtBQUwsQ0FBV0MsSUFBWCxFQUFpQkYsZ0JBQUtHLEtBQXRCLEVBQTZCZCxDQUE3Qjs7QUFDQSxVQUFJYSxJQUFJLENBQUNFLEdBQUwsS0FBYSxRQUFqQixFQUEyQjtBQUN2Qkosd0JBQUtDLEtBQUwsQ0FBV0MsSUFBWCxFQUFpQkYsZ0JBQUtLLEVBQXRCLEVBQTBCaEIsQ0FBMUI7QUFDSDs7QUFDRFcsc0JBQUtNLFNBQUwsQ0FBZUosSUFBZixFQUFxQkEsSUFBckI7O0FBQ0FuQixNQUFBQSxJQUFJLENBQUN3QixhQUFMLENBQW1CckIsR0FBbkIsRUFBd0JnQixJQUF4QixFQUE4Qk0sSUFBSSxDQUFDQyxFQUFuQztBQUNBLGFBQU92QixHQUFQO0FBQ0gsS0FSRCxNQVFPLElBQUlhLEdBQUcsR0FBRyxRQUFWLEVBQW9CO0FBQ3ZCYixNQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFSO0FBQ0FKLE1BQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQVI7QUFDQUwsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBUjtBQUNBTixNQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUSxDQUFSO0FBQ0EsYUFBT1AsR0FBUDtBQUNILEtBTk0sTUFNQTtBQUNIYyxzQkFBS0MsS0FBTCxDQUFXQyxJQUFYLEVBQWlCYixDQUFqQixFQUFvQlMsQ0FBcEI7O0FBQ0FaLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRWSxJQUFJLENBQUNaLENBQWI7QUFDQUosTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFXLElBQUksQ0FBQ1gsQ0FBYjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUVUsSUFBSSxDQUFDVixDQUFiO0FBQ0FOLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRLElBQUlNLEdBQVo7QUFDQSxhQUFPaEIsSUFBSSxDQUFDdUIsU0FBTCxDQUFlcEIsR0FBZixFQUFvQkEsR0FBcEIsQ0FBUDtBQUNIO0FBQ0o7QUFFRDs7Ozs7Ozs7Ozs7OztPQVdPd0IsZUFBUCxzQkFBdUVDLE9BQXZFLEVBQXlGQyxDQUF6RixFQUFpRztBQUM3RixRQUFNQyxHQUFHLEdBQUdMLElBQUksQ0FBQ00sSUFBTCxDQUFVRixDQUFDLENBQUNuQixDQUFaLElBQWlCLEdBQTdCO0FBQ0EsUUFBTXNCLENBQUMsR0FBR1AsSUFBSSxDQUFDUSxHQUFMLENBQVNILEdBQUcsR0FBRyxHQUFmLENBQVY7O0FBQ0EsUUFBSUUsQ0FBQyxLQUFLLEdBQVYsRUFBZTtBQUNYSixNQUFBQSxPQUFPLENBQUNyQixDQUFSLEdBQVlzQixDQUFDLENBQUN0QixDQUFGLEdBQU15QixDQUFsQjtBQUNBSixNQUFBQSxPQUFPLENBQUNwQixDQUFSLEdBQVlxQixDQUFDLENBQUNyQixDQUFGLEdBQU13QixDQUFsQjtBQUNBSixNQUFBQSxPQUFPLENBQUNuQixDQUFSLEdBQVlvQixDQUFDLENBQUNwQixDQUFGLEdBQU11QixDQUFsQjtBQUNILEtBSkQsTUFJTztBQUNIO0FBQ0FKLE1BQUFBLE9BQU8sQ0FBQ3JCLENBQVIsR0FBWSxDQUFaO0FBQ0FxQixNQUFBQSxPQUFPLENBQUNwQixDQUFSLEdBQVksQ0FBWjtBQUNBb0IsTUFBQUEsT0FBTyxDQUFDbkIsQ0FBUixHQUFZLENBQVo7QUFDSDs7QUFDRCxXQUFPcUIsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzFCLFdBQVAsa0JBQW9HRCxHQUFwRyxFQUE4R0csQ0FBOUcsRUFBNkhTLENBQTdILEVBQTRJO0FBQ3hJbkIsSUFBQUEsRUFBRSxHQUFHVSxDQUFDLENBQUNDLENBQUYsR0FBTVEsQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNSLENBQXBCLEdBQXdCRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDTixDQUFoQyxHQUFvQ0gsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ1AsQ0FBakQ7QUFDQVgsSUFBQUEsRUFBRSxHQUFHUyxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNQLENBQXBCLEdBQXdCRixDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDUixDQUFoQyxHQUFvQ0QsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ04sQ0FBakQ7QUFDQVgsSUFBQUEsRUFBRSxHQUFHUSxDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNOLENBQXBCLEdBQXdCSCxDQUFDLENBQUNDLENBQUYsR0FBTVEsQ0FBQyxDQUFDUCxDQUFoQyxHQUFvQ0YsQ0FBQyxDQUFDRSxDQUFGLEdBQU1PLENBQUMsQ0FBQ1IsQ0FBakQ7QUFDQVIsSUFBQUEsRUFBRSxHQUFHTyxDQUFDLENBQUNJLENBQUYsR0FBTUssQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFDLENBQUNSLENBQXBCLEdBQXdCRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFoQyxHQUFvQ0YsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBakQ7QUFDQU4sSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFYLEVBQVI7QUFDQU8sSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFYLEVBQVI7QUFDQU0sSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFYLEVBQVI7QUFDQUssSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFYLEVBQVI7QUFDQSxXQUFPSSxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPK0IsaUJBQVAsd0JBQThDL0IsR0FBOUMsRUFBd0RHLENBQXhELEVBQWdFUyxDQUFoRSxFQUEyRTtBQUN2RVosSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFELENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFkO0FBQ0FaLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBZDtBQUNBWixJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUgsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQWQ7QUFDQVosSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFkO0FBQ0EsV0FBT1osR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT2dDLGNBQVAscUJBQTJDaEMsR0FBM0MsRUFBcURHLENBQXJELEVBQTZEUyxDQUE3RCxFQUFxRXFCLEtBQXJFLEVBQW9GO0FBQ2hGakMsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFELENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFDLENBQUNSLENBQUYsR0FBTTZCLEtBQXBCO0FBQ0FqQyxJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUYsQ0FBQyxDQUFDRSxDQUFGLEdBQU1PLENBQUMsQ0FBQ1AsQ0FBRixHQUFNNEIsS0FBcEI7QUFDQWpDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTixDQUFGLEdBQU0yQixLQUFwQjtBQUNBakMsSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQUYsR0FBTTBCLEtBQXBCO0FBQ0EsV0FBT2pDLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztPQVNPa0MsVUFBUCxpQkFBdUNsQyxHQUF2QyxFQUFpREcsQ0FBakQsRUFBeUR3QixHQUF6RCxFQUFzRTtBQUNsRUEsSUFBQUEsR0FBRyxJQUFJLEdBQVA7QUFFQSxRQUFNUSxFQUFFLEdBQUdiLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNNEIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNNkIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNOEIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNK0IsRUFBekI7QUFDQSxXQUFPbkMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O09BU09zQyxVQUFQLGlCQUF1Q3RDLEdBQXZDLEVBQWlERyxDQUFqRCxFQUF5RHdCLEdBQXpELEVBQXNFO0FBQ2xFQSxJQUFBQSxHQUFHLElBQUksR0FBUDtBQUVBLFFBQU1ZLEVBQUUsR0FBR2pCLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNaUMsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNZ0MsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNbUMsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNa0MsRUFBekI7QUFDQSxXQUFPdkMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O09BU093QyxVQUFQLGlCQUF1Q3hDLEdBQXZDLEVBQWlERyxDQUFqRCxFQUF5RHdCLEdBQXpELEVBQXNFO0FBQ2xFQSxJQUFBQSxHQUFHLElBQUksR0FBUDtBQUVBLFFBQU1jLEVBQUUsR0FBR25CLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNb0MsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNcUMsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNa0MsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNbUMsRUFBekI7QUFDQSxXQUFPekMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztPQVVPMEMsZUFBUCxzQkFBdUUxQyxHQUF2RSxFQUFpRjJDLEdBQWpGLEVBQTJGQyxJQUEzRixFQUEwR2pCLEdBQTFHLEVBQXVIO0FBQ25IO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNnRCxNQUFMLENBQVlDLElBQVosRUFBa0JILEdBQWxCOztBQUNBN0Isb0JBQUtpQyxhQUFMLENBQW1CL0IsSUFBbkIsRUFBeUI0QixJQUF6QixFQUErQkUsSUFBL0IsRUFIbUgsQ0FJbkg7OztBQUNBakQsSUFBQUEsSUFBSSxDQUFDd0IsYUFBTCxDQUFtQnlCLElBQW5CLEVBQXlCOUIsSUFBekIsRUFBK0JXLEdBQS9CO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBZCxFQUFtQjJDLEdBQW5CLEVBQXdCRyxJQUF4QjtBQUNBLFdBQU85QyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7O09BVU9nRCxvQkFBUCwyQkFBNEVoRCxHQUE1RSxFQUFzRjJDLEdBQXRGLEVBQWdHQyxJQUFoRyxFQUErR2pCLEdBQS9HLEVBQTRIO0FBQ3hIOUIsSUFBQUEsSUFBSSxDQUFDd0IsYUFBTCxDQUFtQnlCLElBQW5CLEVBQXlCRixJQUF6QixFQUErQmpCLEdBQS9CO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBZCxFQUFtQjJDLEdBQW5CLEVBQXdCRyxJQUF4QjtBQUNBLFdBQU85QyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPaUQsYUFBUCxvQkFBMENqRCxHQUExQyxFQUFvREcsQ0FBcEQsRUFBNEQ7QUFFeERILElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQVY7QUFDQUosSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFGLENBQUMsQ0FBQ0UsQ0FBVjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUgsQ0FBQyxDQUFDRyxDQUFWO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRZSxJQUFJLENBQUM0QixJQUFMLENBQVU1QixJQUFJLENBQUM2QixHQUFMLENBQVMsTUFBTWhELENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQWQsR0FBa0JELENBQUMsQ0FBQ0UsQ0FBRixHQUFNRixDQUFDLENBQUNFLENBQTFCLEdBQThCRixDQUFDLENBQUNHLENBQUYsR0FBTUgsQ0FBQyxDQUFDRyxDQUEvQyxDQUFWLENBQVI7QUFDQSxXQUFPTixHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPYSxNQUFQLGFBQW1DVixDQUFuQyxFQUEyQ1MsQ0FBM0MsRUFBbUQ7QUFDL0MsV0FBT1QsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ1IsQ0FBUixHQUFZRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFwQixHQUF3QkYsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBaEMsR0FBb0NILENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQW5EO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPNkMsT0FBUCxjQUFvQ3BELEdBQXBDLEVBQThDRyxDQUE5QyxFQUFzRFMsQ0FBdEQsRUFBOER5QyxDQUE5RCxFQUF5RTtBQUNyRXJELElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWlELENBQUMsSUFBSXpDLENBQUMsQ0FBQ1IsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVosQ0FBZjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUYsQ0FBQyxDQUFDRSxDQUFGLEdBQU1nRCxDQUFDLElBQUl6QyxDQUFDLENBQUNQLENBQUYsR0FBTUYsQ0FBQyxDQUFDRSxDQUFaLENBQWY7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFILENBQUMsQ0FBQ0csQ0FBRixHQUFNK0MsQ0FBQyxJQUFJekMsQ0FBQyxDQUFDTixDQUFGLEdBQU1ILENBQUMsQ0FBQ0csQ0FBWixDQUFmO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTThDLENBQUMsSUFBSXpDLENBQUMsQ0FBQ0wsQ0FBRixHQUFNSixDQUFDLENBQUNJLENBQVosQ0FBZjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9zRCxRQUFQLGVBQ0t0RCxHQURMLEVBQ2VHLENBRGYsRUFDOEJTLENBRDlCLEVBQzZDeUMsQ0FEN0MsRUFDd0Q7QUFDcEQ7QUFDQTtBQUVBLFFBQUlFLE1BQU0sR0FBRyxDQUFiO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLENBQWIsQ0FMb0QsQ0FPcEQ7O0FBQ0EsUUFBSUMsS0FBSyxHQUFHdEQsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ1IsQ0FBUixHQUFZRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFwQixHQUF3QkYsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBaEMsR0FBb0NILENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQXhELENBUm9ELENBU3BEOztBQUNBLFFBQUlrRCxLQUFLLEdBQUcsR0FBWixFQUFpQjtBQUNiQSxNQUFBQSxLQUFLLEdBQUcsQ0FBQ0EsS0FBVDtBQUNBN0MsTUFBQUEsQ0FBQyxDQUFDUixDQUFGLEdBQU0sQ0FBQ1EsQ0FBQyxDQUFDUixDQUFUO0FBQ0FRLE1BQUFBLENBQUMsQ0FBQ1AsQ0FBRixHQUFNLENBQUNPLENBQUMsQ0FBQ1AsQ0FBVDtBQUNBTyxNQUFBQSxDQUFDLENBQUNOLENBQUYsR0FBTSxDQUFDTSxDQUFDLENBQUNOLENBQVQ7QUFDQU0sTUFBQUEsQ0FBQyxDQUFDTCxDQUFGLEdBQU0sQ0FBQ0ssQ0FBQyxDQUFDTCxDQUFUO0FBQ0gsS0FoQm1ELENBaUJwRDs7O0FBQ0EsUUFBSyxNQUFNa0QsS0FBUCxHQUFnQixRQUFwQixFQUE4QjtBQUMxQjtBQUNBLFVBQU1DLEtBQUssR0FBR3BDLElBQUksQ0FBQ00sSUFBTCxDQUFVNkIsS0FBVixDQUFkO0FBQ0EsVUFBTUUsS0FBSyxHQUFHckMsSUFBSSxDQUFDUSxHQUFMLENBQVM0QixLQUFULENBQWQ7QUFDQUgsTUFBQUEsTUFBTSxHQUFHakMsSUFBSSxDQUFDUSxHQUFMLENBQVMsQ0FBQyxNQUFNdUIsQ0FBUCxJQUFZSyxLQUFyQixJQUE4QkMsS0FBdkM7QUFDQUgsTUFBQUEsTUFBTSxHQUFHbEMsSUFBSSxDQUFDUSxHQUFMLENBQVN1QixDQUFDLEdBQUdLLEtBQWIsSUFBc0JDLEtBQS9CO0FBQ0gsS0FORCxNQU1PO0FBQ0g7QUFDQTtBQUNBSixNQUFBQSxNQUFNLEdBQUcsTUFBTUYsQ0FBZjtBQUNBRyxNQUFBQSxNQUFNLEdBQUdILENBQVQ7QUFDSCxLQTdCbUQsQ0E4QnBEOzs7QUFDQXJELElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRbUQsTUFBTSxHQUFHcEQsQ0FBQyxDQUFDQyxDQUFYLEdBQWVvRCxNQUFNLEdBQUc1QyxDQUFDLENBQUNSLENBQWxDO0FBQ0FKLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRa0QsTUFBTSxHQUFHcEQsQ0FBQyxDQUFDRSxDQUFYLEdBQWVtRCxNQUFNLEdBQUc1QyxDQUFDLENBQUNQLENBQWxDO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRaUQsTUFBTSxHQUFHcEQsQ0FBQyxDQUFDRyxDQUFYLEdBQWVrRCxNQUFNLEdBQUc1QyxDQUFDLENBQUNOLENBQWxDO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRZ0QsTUFBTSxHQUFHcEQsQ0FBQyxDQUFDSSxDQUFYLEdBQWVpRCxNQUFNLEdBQUc1QyxDQUFDLENBQUNMLENBQWxDO0FBRUEsV0FBT1AsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzRELFNBQVAsZ0JBQXNDNUQsR0FBdEMsRUFBZ0RHLENBQWhELEVBQXdEUyxDQUF4RCxFQUFnRWlELENBQWhFLEVBQXdFQyxDQUF4RSxFQUFnRlQsQ0FBaEYsRUFBMkY7QUFDdkZ4RCxJQUFBQSxJQUFJLENBQUN5RCxLQUFMLENBQVdSLElBQVgsRUFBaUIzQyxDQUFqQixFQUFvQjJELENBQXBCLEVBQXVCVCxDQUF2QjtBQUNBeEQsSUFBQUEsSUFBSSxDQUFDeUQsS0FBTCxDQUFXUyxJQUFYLEVBQWlCbkQsQ0FBakIsRUFBb0JpRCxDQUFwQixFQUF1QlIsQ0FBdkI7QUFDQXhELElBQUFBLElBQUksQ0FBQ3lELEtBQUwsQ0FBV3RELEdBQVgsRUFBZ0I4QyxJQUFoQixFQUFzQmlCLElBQXRCLEVBQTRCLElBQUlWLENBQUosSUFBUyxJQUFJQSxDQUFiLENBQTVCO0FBQ0EsV0FBT3JELEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU82QyxTQUFQLGdCQUFrRTdDLEdBQWxFLEVBQTRFRyxDQUE1RSxFQUF5RjtBQUNyRixRQUFNVSxHQUFHLEdBQUdWLENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVIsR0FBWUQsQ0FBQyxDQUFDRSxDQUFGLEdBQU1GLENBQUMsQ0FBQ0UsQ0FBcEIsR0FBd0JGLENBQUMsQ0FBQ0csQ0FBRixHQUFNSCxDQUFDLENBQUNHLENBQWhDLEdBQW9DSCxDQUFDLENBQUNJLENBQUYsR0FBTUosQ0FBQyxDQUFDSSxDQUF4RDtBQUNBLFFBQU15RCxNQUFNLEdBQUduRCxHQUFHLEdBQUcsTUFBTUEsR0FBVCxHQUFlLENBQWpDLENBRnFGLENBSXJGOztBQUVBYixJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFDRCxDQUFDLENBQUNDLENBQUgsR0FBTzRELE1BQWY7QUFDQWhFLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQUNGLENBQUMsQ0FBQ0UsQ0FBSCxHQUFPMkQsTUFBZjtBQUNBaEUsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBQ0gsQ0FBQyxDQUFDRyxDQUFILEdBQU8wRCxNQUFmO0FBQ0FoRSxJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUosQ0FBQyxDQUFDSSxDQUFGLEdBQU15RCxNQUFkO0FBQ0EsV0FBT2hFLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9pRSxZQUFQLG1CQUF5Q2pFLEdBQXpDLEVBQW1ERyxDQUFuRCxFQUEyRDtBQUN2REgsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVEsQ0FBQ0QsQ0FBQyxDQUFDQyxDQUFYO0FBQ0FKLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQUNGLENBQUMsQ0FBQ0UsQ0FBWDtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUSxDQUFDSCxDQUFDLENBQUNHLENBQVg7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBVjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9rRSxNQUFQLGFBQW1DL0QsQ0FBbkMsRUFBMkM7QUFDdkMsV0FBT21CLElBQUksQ0FBQzRCLElBQUwsQ0FBVS9DLENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVIsR0FBWUQsQ0FBQyxDQUFDRSxDQUFGLEdBQU1GLENBQUMsQ0FBQ0UsQ0FBcEIsR0FBd0JGLENBQUMsQ0FBQ0csQ0FBRixHQUFNSCxDQUFDLENBQUNHLENBQWhDLEdBQW9DSCxDQUFDLENBQUNJLENBQUYsR0FBTUosQ0FBQyxDQUFDSSxDQUF0RCxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPNEQsWUFBUCxtQkFBeUNoRSxDQUF6QyxFQUFpRDtBQUM3QyxXQUFPQSxDQUFDLENBQUNDLENBQUYsR0FBTUQsQ0FBQyxDQUFDQyxDQUFSLEdBQVlELENBQUMsQ0FBQ0UsQ0FBRixHQUFNRixDQUFDLENBQUNFLENBQXBCLEdBQXdCRixDQUFDLENBQUNHLENBQUYsR0FBTUgsQ0FBQyxDQUFDRyxDQUFoQyxHQUFvQ0gsQ0FBQyxDQUFDSSxDQUFGLEdBQU1KLENBQUMsQ0FBQ0ksQ0FBbkQ7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9hLFlBQVAsbUJBQXlDcEIsR0FBekMsRUFBbURHLENBQW5ELEVBQTJEO0FBQ3ZELFFBQUkrRCxHQUFHLEdBQUcvRCxDQUFDLENBQUNDLENBQUYsR0FBTUQsQ0FBQyxDQUFDQyxDQUFSLEdBQVlELENBQUMsQ0FBQ0UsQ0FBRixHQUFNRixDQUFDLENBQUNFLENBQXBCLEdBQXdCRixDQUFDLENBQUNHLENBQUYsR0FBTUgsQ0FBQyxDQUFDRyxDQUFoQyxHQUFvQ0gsQ0FBQyxDQUFDSSxDQUFGLEdBQU1KLENBQUMsQ0FBQ0ksQ0FBdEQ7O0FBQ0EsUUFBSTJELEdBQUcsR0FBRyxDQUFWLEVBQWE7QUFDVEEsTUFBQUEsR0FBRyxHQUFHLElBQUk1QyxJQUFJLENBQUM0QixJQUFMLENBQVVnQixHQUFWLENBQVY7QUFDQWxFLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTThELEdBQWQ7QUFDQWxFLE1BQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTTZELEdBQWQ7QUFDQWxFLE1BQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTTRELEdBQWQ7QUFDQWxFLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTJELEdBQWQ7QUFDSDs7QUFDRCxXQUFPbEUsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT29FLFdBQVAsa0JBQW1FcEUsR0FBbkUsRUFBNkVxRSxLQUE3RSxFQUE2RkMsS0FBN0YsRUFBNkdDLEtBQTdHLEVBQTZIO0FBQ3pIQyxvQkFBSy9ELEdBQUwsQ0FBU2dFLElBQVQsRUFDSUosS0FBSyxDQUFDakUsQ0FEVixFQUNhaUUsS0FBSyxDQUFDaEUsQ0FEbkIsRUFDc0JnRSxLQUFLLENBQUMvRCxDQUQ1QixFQUVJZ0UsS0FBSyxDQUFDbEUsQ0FGVixFQUVha0UsS0FBSyxDQUFDakUsQ0FGbkIsRUFFc0JpRSxLQUFLLENBQUNoRSxDQUY1QixFQUdJaUUsS0FBSyxDQUFDbkUsQ0FIVixFQUdhbUUsS0FBSyxDQUFDbEUsQ0FIbkIsRUFHc0JrRSxLQUFLLENBQUNqRSxDQUg1Qjs7QUFLQSxXQUFPVCxJQUFJLENBQUN1QixTQUFMLENBQWVwQixHQUFmLEVBQW9CSCxJQUFJLENBQUM2RSxRQUFMLENBQWMxRSxHQUFkLEVBQW1CeUUsSUFBbkIsQ0FBcEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztPQVVPRSxhQUFQLG9CQUEwQzNFLEdBQTFDLEVBQW9ENEUsSUFBcEQsRUFBZ0VDLEVBQWhFLEVBQTJFO0FBQ3ZFTCxvQkFBS0csVUFBTCxDQUFnQkYsSUFBaEIsRUFBc0JHLElBQXRCLEVBQTRCQyxFQUE1Qjs7QUFDQSxXQUFPaEYsSUFBSSxDQUFDdUIsU0FBTCxDQUFlcEIsR0FBZixFQUFvQkgsSUFBSSxDQUFDNkUsUUFBTCxDQUFjMUUsR0FBZCxFQUFtQnlFLElBQW5CLENBQXBCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9wRCxnQkFBUCx1QkFBd0VyQixHQUF4RSxFQUFrRjRDLElBQWxGLEVBQWlHakIsR0FBakcsRUFBOEc7QUFDMUdBLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxHQUFHLEdBQVo7QUFDQSxRQUFNRSxDQUFDLEdBQUdQLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVY7QUFDQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFReUIsQ0FBQyxHQUFHZSxJQUFJLENBQUN4QyxDQUFqQjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUXdCLENBQUMsR0FBR2UsSUFBSSxDQUFDdkMsQ0FBakI7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVF1QixDQUFDLEdBQUdlLElBQUksQ0FBQ3RDLENBQWpCO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRZSxJQUFJLENBQUNlLEdBQUwsQ0FBU1YsR0FBVCxDQUFSO0FBQ0EsV0FBTzNCLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU84RSxhQUFQLG9CQUFtQjlFLEdBQW5CLEVBQThCTSxDQUE5QixFQUErQztBQUMzQ0EsSUFBQUEsQ0FBQyxJQUFJeUUsU0FBTDtBQUNBL0UsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFKLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQWhCO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRZ0IsSUFBSSxDQUFDUSxHQUFMLENBQVN4QixDQUFULENBQVI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFlLElBQUksQ0FBQ2UsR0FBTCxDQUFTL0IsQ0FBVCxDQUFSO0FBQ0EsV0FBT04sR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzBFLFdBQVAsa0JBQXdDMUUsR0FBeEMsRUFBa0RnRixHQUFsRCxFQUE2RDtBQUN6RCxRQUFJQyxDQUFDLEdBQUdELEdBQUcsQ0FBQ0MsQ0FBWjtBQUNBLFFBQUlDLEdBQUcsR0FBR0QsQ0FBQyxDQUFDLENBQUQsQ0FBWDtBQUFBLFFBQWdCRSxHQUFHLEdBQUdGLENBQUMsQ0FBQyxDQUFELENBQXZCO0FBQUEsUUFBNEJHLEdBQUcsR0FBR0gsQ0FBQyxDQUFDLENBQUQsQ0FBbkM7QUFBQSxRQUNJSSxHQUFHLEdBQUdKLENBQUMsQ0FBQyxDQUFELENBRFg7QUFBQSxRQUNnQkssR0FBRyxHQUFHTCxDQUFDLENBQUMsQ0FBRCxDQUR2QjtBQUFBLFFBQzRCTSxHQUFHLEdBQUdOLENBQUMsQ0FBQyxDQUFELENBRG5DO0FBQUEsUUFFSU8sR0FBRyxHQUFHUCxDQUFDLENBQUMsQ0FBRCxDQUZYO0FBQUEsUUFFZ0JRLEdBQUcsR0FBR1IsQ0FBQyxDQUFDLENBQUQsQ0FGdkI7QUFBQSxRQUU0QlMsR0FBRyxHQUFHVCxDQUFDLENBQUMsQ0FBRCxDQUZuQztBQUlBLFFBQU1VLEtBQUssR0FBR1QsR0FBRyxHQUFHSSxHQUFOLEdBQVlJLEdBQTFCOztBQUVBLFFBQUlDLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDWCxVQUFNOUQsQ0FBQyxHQUFHLE1BQU1QLElBQUksQ0FBQzRCLElBQUwsQ0FBVXlDLEtBQUssR0FBRyxHQUFsQixDQUFoQjtBQUVBM0YsTUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsT0FBT3NCLENBQWY7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLENBQUNtRixHQUFHLEdBQUdFLEdBQVAsSUFBYzVELENBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxDQUFDbUYsR0FBRyxHQUFHSixHQUFQLElBQWN2RCxDQUF0QjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBQzZFLEdBQUcsR0FBR0UsR0FBUCxJQUFjeEQsQ0FBdEI7QUFFSCxLQVJELE1BUU8sSUFBS3FELEdBQUcsR0FBR0ksR0FBUCxJQUFnQkosR0FBRyxHQUFHUSxHQUExQixFQUFnQztBQUNuQyxVQUFNN0QsRUFBQyxHQUFHLE1BQU1QLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxNQUFNZ0MsR0FBTixHQUFZSSxHQUFaLEdBQWtCSSxHQUE1QixDQUFoQjs7QUFFQTFGLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRLENBQUNnRixHQUFHLEdBQUdFLEdBQVAsSUFBYzVELEVBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxPQUFPeUIsRUFBZjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVEsQ0FBQ2dGLEdBQUcsR0FBR0YsR0FBUCxJQUFjdEQsRUFBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLENBQUNrRixHQUFHLEdBQUdKLEdBQVAsSUFBY3ZELEVBQXRCO0FBRUgsS0FSTSxNQVFBLElBQUl5RCxHQUFHLEdBQUdJLEdBQVYsRUFBZTtBQUNsQixVQUFNN0QsR0FBQyxHQUFHLE1BQU1QLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxNQUFNb0MsR0FBTixHQUFZSixHQUFaLEdBQWtCUSxHQUE1QixDQUFoQjs7QUFFQTFGLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRLENBQUNpRixHQUFHLEdBQUdKLEdBQVAsSUFBY3ZELEdBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFDaUYsR0FBRyxHQUFHRixHQUFQLElBQWN0RCxHQUF0QjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVEsT0FBT3dCLEdBQWY7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLENBQUNtRixHQUFHLEdBQUdGLEdBQVAsSUFBYzFELEdBQXRCO0FBRUgsS0FSTSxNQVFBO0FBQ0gsVUFBTUEsR0FBQyxHQUFHLE1BQU1QLElBQUksQ0FBQzRCLElBQUwsQ0FBVSxNQUFNd0MsR0FBTixHQUFZUixHQUFaLEdBQWtCSSxHQUE1QixDQUFoQjs7QUFFQXRGLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRLENBQUM0RSxHQUFHLEdBQUdFLEdBQVAsSUFBY3hELEdBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFDb0YsR0FBRyxHQUFHSixHQUFQLElBQWN2RCxHQUF0QjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVEsQ0FBQ29GLEdBQUcsR0FBR0YsR0FBUCxJQUFjMUQsR0FBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLE9BQU91QixHQUFmO0FBQ0g7O0FBRUQsV0FBTzdCLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU80RixZQUFQLG1CQUF5QzVGLEdBQXpDLEVBQW1ESSxDQUFuRCxFQUE4REMsQ0FBOUQsRUFBeUVDLENBQXpFLEVBQW9GO0FBQ2hGRixJQUFBQSxDQUFDLElBQUkyRSxTQUFMO0FBQ0ExRSxJQUFBQSxDQUFDLElBQUkwRSxTQUFMO0FBQ0F6RSxJQUFBQSxDQUFDLElBQUl5RSxTQUFMO0FBRUEsUUFBTWMsRUFBRSxHQUFHdkUsSUFBSSxDQUFDUSxHQUFMLENBQVMxQixDQUFULENBQVg7QUFDQSxRQUFNMEYsRUFBRSxHQUFHeEUsSUFBSSxDQUFDZSxHQUFMLENBQVNqQyxDQUFULENBQVg7QUFDQSxRQUFNMkYsRUFBRSxHQUFHekUsSUFBSSxDQUFDUSxHQUFMLENBQVN6QixDQUFULENBQVg7QUFDQSxRQUFNMkYsRUFBRSxHQUFHMUUsSUFBSSxDQUFDZSxHQUFMLENBQVNoQyxDQUFULENBQVg7QUFDQSxRQUFNNEYsRUFBRSxHQUFHM0UsSUFBSSxDQUFDUSxHQUFMLENBQVN4QixDQUFULENBQVg7QUFDQSxRQUFNNEYsRUFBRSxHQUFHNUUsSUFBSSxDQUFDZSxHQUFMLENBQVMvQixDQUFULENBQVg7QUFFQU4sSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVF5RixFQUFFLEdBQUdHLEVBQUwsR0FBVUUsRUFBVixHQUFlSixFQUFFLEdBQUdDLEVBQUwsR0FBVUUsRUFBakM7QUFDQWpHLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFReUYsRUFBRSxHQUFHQyxFQUFMLEdBQVVHLEVBQVYsR0FBZUwsRUFBRSxHQUFHRyxFQUFMLEdBQVVDLEVBQWpDO0FBQ0FqRyxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUXdGLEVBQUUsR0FBR0UsRUFBTCxHQUFVQyxFQUFWLEdBQWVKLEVBQUUsR0FBR0UsRUFBTCxHQUFVRyxFQUFqQztBQUNBbEcsSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVF1RixFQUFFLEdBQUdFLEVBQUwsR0FBVUUsRUFBVixHQUFlTCxFQUFFLEdBQUdFLEVBQUwsR0FBVUUsRUFBakM7QUFFQSxXQUFPakcsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT21HLFVBQVAsaUJBQWtFbkcsR0FBbEUsRUFBZ0YwQixDQUFoRixFQUF3RjtBQUNwRixRQUFNMEUsRUFBRSxHQUFHLE1BQU0xRSxDQUFDLENBQUNyQixDQUFuQjtBQUNBLFFBQU1nRyxFQUFFLEdBQUcsTUFBTTNFLENBQUMsQ0FBQ3BCLENBQW5CO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLE1BQU1nRyxFQUFFLEdBQUcxRSxDQUFDLENBQUNyQixDQUFiLEdBQWlCZ0csRUFBRSxHQUFHM0UsQ0FBQyxDQUFDcEIsQ0FBaEM7QUFDQU4sSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVErRixFQUFFLEdBQUcxRSxDQUFDLENBQUN0QixDQUFQLEdBQVdpRyxFQUFFLEdBQUczRSxDQUFDLENBQUNuQixDQUExQjtBQUNBUCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUStGLEVBQUUsR0FBRzNFLENBQUMsQ0FBQ3RCLENBQVAsR0FBV2dHLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ25CLENBQTFCO0FBRUEsV0FBT1AsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT3NHLFVBQVAsaUJBQWtFdEcsR0FBbEUsRUFBZ0YwQixDQUFoRixFQUF3RjtBQUNwRixRQUFNNkUsRUFBRSxHQUFHLE1BQU03RSxDQUFDLENBQUN0QixDQUFuQjtBQUNBLFFBQU1nRyxFQUFFLEdBQUcsTUFBTTFFLENBQUMsQ0FBQ3JCLENBQW5CO0FBQ0EsUUFBTWdHLEVBQUUsR0FBRyxNQUFNM0UsQ0FBQyxDQUFDcEIsQ0FBbkI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFnRyxFQUFFLEdBQUcxRSxDQUFDLENBQUN0QixDQUFQLEdBQVdpRyxFQUFFLEdBQUczRSxDQUFDLENBQUNuQixDQUExQjtBQUNBUCxJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxNQUFNa0csRUFBRSxHQUFHN0UsQ0FBQyxDQUFDdEIsQ0FBYixHQUFpQmlHLEVBQUUsR0FBRzNFLENBQUMsQ0FBQ3BCLENBQWhDO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRK0YsRUFBRSxHQUFHM0UsQ0FBQyxDQUFDckIsQ0FBUCxHQUFXa0csRUFBRSxHQUFHN0UsQ0FBQyxDQUFDbkIsQ0FBMUI7QUFFQSxXQUFPUCxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPd0csVUFBUCxpQkFBa0V4RyxHQUFsRSxFQUFnRjBCLENBQWhGLEVBQXdGO0FBQ3BGLFFBQU02RSxFQUFFLEdBQUcsTUFBTTdFLENBQUMsQ0FBQ3RCLENBQW5CO0FBQ0EsUUFBTWdHLEVBQUUsR0FBRyxNQUFNMUUsQ0FBQyxDQUFDckIsQ0FBbkI7QUFDQSxRQUFNZ0csRUFBRSxHQUFHLE1BQU0zRSxDQUFDLENBQUNwQixDQUFuQjtBQUNBTixJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUWlHLEVBQUUsR0FBRzNFLENBQUMsQ0FBQ3RCLENBQVAsR0FBV2dHLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ25CLENBQTFCO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRZ0csRUFBRSxHQUFHM0UsQ0FBQyxDQUFDckIsQ0FBUCxHQUFXa0csRUFBRSxHQUFHN0UsQ0FBQyxDQUFDbkIsQ0FBMUI7QUFDQVAsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsTUFBTWlHLEVBQUUsR0FBRzdFLENBQUMsQ0FBQ3RCLENBQWIsR0FBaUJnRyxFQUFFLEdBQUcxRSxDQUFDLENBQUNyQixDQUFoQztBQUVBLFdBQU9MLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztPQVNPeUcsVUFBUCxpQkFBdUN6RyxHQUF2QyxFQUFpRDBCLENBQWpELEVBQStEZ0YsTUFBL0QsRUFBaUY7QUFBQSxRQUNyRXRHLENBRHFFLEdBQ3REc0IsQ0FEc0QsQ0FDckV0QixDQURxRTtBQUFBLFFBQ2xFQyxDQURrRSxHQUN0RHFCLENBRHNELENBQ2xFckIsQ0FEa0U7QUFBQSxRQUMvREMsQ0FEK0QsR0FDdERvQixDQURzRCxDQUMvRHBCLENBRCtEO0FBQUEsUUFDNURDLENBRDRELEdBQ3REbUIsQ0FEc0QsQ0FDNURuQixDQUQ0RDtBQUU3RSxRQUFJb0csSUFBSSxHQUFHLENBQVg7QUFDQSxRQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLFFBQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsUUFBTUMsSUFBSSxHQUFHMUcsQ0FBQyxHQUFHQyxDQUFKLEdBQVFDLENBQUMsR0FBR0MsQ0FBekI7O0FBQ0EsUUFBSXVHLElBQUksR0FBRyxRQUFYLEVBQXFCO0FBQ2pCSCxNQUFBQSxJQUFJLEdBQUcsQ0FBUCxDQURpQixDQUNQOztBQUNWQyxNQUFBQSxPQUFPLEdBQUcscUJBQVMsSUFBSXRGLElBQUksQ0FBQ3lGLEtBQUwsQ0FBVzNHLENBQVgsRUFBY0csQ0FBZCxDQUFiLENBQVY7QUFDQXNHLE1BQUFBLFFBQVEsR0FBRyxFQUFYO0FBQ0gsS0FKRCxNQUlPLElBQUlDLElBQUksR0FBRyxDQUFDLFFBQVosRUFBc0I7QUFDekJILE1BQUFBLElBQUksR0FBRyxDQUFQLENBRHlCLENBQ2Y7O0FBQ1ZDLE1BQUFBLE9BQU8sR0FBRyxDQUFDLHFCQUFTLElBQUl0RixJQUFJLENBQUN5RixLQUFMLENBQVczRyxDQUFYLEVBQWNHLENBQWQsQ0FBYixDQUFYO0FBQ0FzRyxNQUFBQSxRQUFRLEdBQUcsQ0FBQyxFQUFaO0FBQ0gsS0FKTSxNQUlBO0FBQ0gsVUFBTUcsR0FBRyxHQUFHNUcsQ0FBQyxHQUFHQSxDQUFoQjtBQUNBLFVBQU02RyxHQUFHLEdBQUc1RyxDQUFDLEdBQUdBLENBQWhCO0FBQ0EsVUFBTTZHLEdBQUcsR0FBRzVHLENBQUMsR0FBR0EsQ0FBaEI7QUFDQXFHLE1BQUFBLElBQUksR0FBRyxxQkFBU3JGLElBQUksQ0FBQ3lGLEtBQUwsQ0FBVyxJQUFJM0csQ0FBSixHQUFRRyxDQUFSLEdBQVksSUFBSUYsQ0FBSixHQUFRQyxDQUEvQixFQUFrQyxJQUFJLElBQUkwRyxHQUFSLEdBQWMsSUFBSUUsR0FBcEQsQ0FBVCxDQUFQO0FBQ0FOLE1BQUFBLE9BQU8sR0FBRyxxQkFBU3RGLElBQUksQ0FBQ3lGLEtBQUwsQ0FBVyxJQUFJMUcsQ0FBSixHQUFRRSxDQUFSLEdBQVksSUFBSUgsQ0FBSixHQUFRRSxDQUEvQixFQUFrQyxJQUFJLElBQUkyRyxHQUFSLEdBQWMsSUFBSUMsR0FBcEQsQ0FBVCxDQUFWO0FBQ0FMLE1BQUFBLFFBQVEsR0FBRyxxQkFBU3ZGLElBQUksQ0FBQzZGLElBQUwsQ0FBVSxJQUFJTCxJQUFkLENBQVQsQ0FBWDs7QUFDQSxVQUFJSixNQUFKLEVBQVk7QUFDUkMsUUFBQUEsSUFBSSxHQUFHLENBQUMsR0FBRCxHQUFPckYsSUFBSSxDQUFDOEYsSUFBTCxDQUFVVCxJQUFJLEdBQUcsSUFBakIsQ0FBUCxHQUFnQ0EsSUFBdkM7QUFDQUMsUUFBQUEsT0FBTyxHQUFHLENBQUMsR0FBRCxHQUFPdEYsSUFBSSxDQUFDOEYsSUFBTCxDQUFVUixPQUFPLEdBQUcsSUFBcEIsQ0FBUCxHQUFtQ0EsT0FBN0M7QUFDQUMsUUFBQUEsUUFBUSxHQUFHLE1BQU12RixJQUFJLENBQUM4RixJQUFMLENBQVVQLFFBQVEsR0FBRyxJQUFyQixDQUFOLEdBQW1DQSxRQUE5QztBQUNIO0FBQ0o7O0FBQ0Q3RyxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUXVHLElBQVI7QUFBYzNHLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRdUcsT0FBUjtBQUFpQjVHLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRdUcsUUFBUjtBQUMvQixXQUFPN0csR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT3FILGVBQVAsc0JBQTRDbEgsQ0FBNUMsRUFBb0RTLENBQXBELEVBQTREO0FBQ3hELFdBQU9ULENBQUMsQ0FBQ0MsQ0FBRixLQUFRUSxDQUFDLENBQUNSLENBQVYsSUFBZUQsQ0FBQyxDQUFDRSxDQUFGLEtBQVFPLENBQUMsQ0FBQ1AsQ0FBekIsSUFBOEJGLENBQUMsQ0FBQ0csQ0FBRixLQUFRTSxDQUFDLENBQUNOLENBQXhDLElBQTZDSCxDQUFDLENBQUNJLENBQUYsS0FBUUssQ0FBQyxDQUFDTCxDQUE5RDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTytHLFNBQVAsZ0JBQXNDbkgsQ0FBdEMsRUFBOENTLENBQTlDLEVBQXNEMkcsT0FBdEQsRUFBeUU7QUFBQSxRQUFuQkEsT0FBbUI7QUFBbkJBLE1BQUFBLE9BQW1CLEdBQVRDLGNBQVM7QUFBQTs7QUFDckUsV0FBUWxHLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFDLENBQUNSLENBQWpCLEtBQXVCbUgsT0FBTyxHQUFHakcsSUFBSSxDQUFDbUcsR0FBTCxDQUFTLEdBQVQsRUFBY25HLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0MsQ0FBWCxDQUFkLEVBQTZCa0IsSUFBSSxDQUFDNkIsR0FBTCxDQUFTdkMsQ0FBQyxDQUFDUixDQUFYLENBQTdCLENBQWpDLElBQ0prQixJQUFJLENBQUM2QixHQUFMLENBQVNoRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFqQixLQUF1QmtILE9BQU8sR0FBR2pHLElBQUksQ0FBQ21HLEdBQUwsQ0FBUyxHQUFULEVBQWNuRyxJQUFJLENBQUM2QixHQUFMLENBQVNoRCxDQUFDLENBQUNFLENBQVgsQ0FBZCxFQUE2QmlCLElBQUksQ0FBQzZCLEdBQUwsQ0FBU3ZDLENBQUMsQ0FBQ1AsQ0FBWCxDQUE3QixDQUQ3QixJQUVKaUIsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBakIsS0FBdUJpSCxPQUFPLEdBQUdqRyxJQUFJLENBQUNtRyxHQUFMLENBQVMsR0FBVCxFQUFjbkcsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDRyxDQUFYLENBQWQsRUFBNkJnQixJQUFJLENBQUM2QixHQUFMLENBQVN2QyxDQUFDLENBQUNOLENBQVgsQ0FBN0IsQ0FGN0IsSUFHSmdCLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQWpCLEtBQXVCZ0gsT0FBTyxHQUFHakcsSUFBSSxDQUFDbUcsR0FBTCxDQUFTLEdBQVQsRUFBY25HLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0ksQ0FBWCxDQUFkLEVBQTZCZSxJQUFJLENBQUM2QixHQUFMLENBQVN2QyxDQUFDLENBQUNMLENBQVgsQ0FBN0IsQ0FIckM7QUFJSDtBQUdEOzs7Ozs7Ozs7OztPQVNPbUgsVUFBUCxpQkFBeUQxSCxHQUF6RCxFQUFtRTBCLENBQW5FLEVBQWlGaUcsR0FBakYsRUFBMEY7QUFBQSxRQUFUQSxHQUFTO0FBQVRBLE1BQUFBLEdBQVMsR0FBSCxDQUFHO0FBQUE7O0FBQ3RGM0gsSUFBQUEsR0FBRyxDQUFDMkgsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlakcsQ0FBQyxDQUFDdEIsQ0FBakI7QUFDQUosSUFBQUEsR0FBRyxDQUFDMkgsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlakcsQ0FBQyxDQUFDckIsQ0FBakI7QUFDQUwsSUFBQUEsR0FBRyxDQUFDMkgsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlakcsQ0FBQyxDQUFDcEIsQ0FBakI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDMkgsR0FBRyxHQUFHLENBQVAsQ0FBSCxHQUFlakcsQ0FBQyxDQUFDbkIsQ0FBakI7QUFDQSxXQUFPUCxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7T0FTTzRILFlBQVAsbUJBQTBDNUgsR0FBMUMsRUFBb0Q2SCxHQUFwRCxFQUFxRkYsR0FBckYsRUFBOEY7QUFBQSxRQUFUQSxHQUFTO0FBQVRBLE1BQUFBLEdBQVMsR0FBSCxDQUFHO0FBQUE7O0FBQzFGM0gsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVF5SCxHQUFHLENBQUNGLEdBQUcsR0FBRyxDQUFQLENBQVg7QUFDQTNILElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRd0gsR0FBRyxDQUFDRixHQUFHLEdBQUcsQ0FBUCxDQUFYO0FBQ0EzSCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUXVILEdBQUcsQ0FBQ0YsR0FBRyxHQUFHLENBQVAsQ0FBWDtBQUNBM0gsSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFzSCxHQUFHLENBQUNGLEdBQUcsR0FBRyxDQUFQLENBQVg7QUFDQSxXQUFPM0gsR0FBUDtBQUNIO0FBR0Q7Ozs7O0FBaUJBLGdCQUFhSSxDQUFiLEVBQW1DQyxDQUFuQyxFQUFrREMsQ0FBbEQsRUFBaUVDLENBQWpFLEVBQWdGO0FBQUE7O0FBQUEsUUFBbkVILENBQW1FO0FBQW5FQSxNQUFBQSxDQUFtRSxHQUFoRCxDQUFnRDtBQUFBOztBQUFBLFFBQTdDQyxDQUE2QztBQUE3Q0EsTUFBQUEsQ0FBNkMsR0FBakMsQ0FBaUM7QUFBQTs7QUFBQSxRQUE5QkMsQ0FBOEI7QUFBOUJBLE1BQUFBLENBQThCLEdBQWxCLENBQWtCO0FBQUE7O0FBQUEsUUFBZkMsQ0FBZTtBQUFmQSxNQUFBQSxDQUFlLEdBQUgsQ0FBRztBQUFBOztBQUM1RTtBQUQ0RSxVQWRoRkgsQ0FjZ0Y7QUFBQSxVQVZoRkMsQ0FVZ0Y7QUFBQSxVQU5oRkMsQ0FNZ0Y7QUFBQSxVQUZoRkMsQ0FFZ0Y7O0FBRzVFLFFBQUlILENBQUMsSUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBdEIsRUFBZ0M7QUFDNUIsWUFBS0EsQ0FBTCxHQUFTQSxDQUFDLENBQUNBLENBQVg7QUFDQSxZQUFLQyxDQUFMLEdBQVNELENBQUMsQ0FBQ0MsQ0FBWDtBQUNBLFlBQUtDLENBQUwsR0FBU0YsQ0FBQyxDQUFDRSxDQUFYO0FBQ0EsWUFBS0MsQ0FBTCxHQUFTSCxDQUFDLENBQUNHLENBQVg7QUFDSCxLQUxELE1BTUs7QUFDRCxZQUFLSCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxZQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxZQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxZQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDSDs7QUFkMkU7QUFlL0U7QUFFRDs7Ozs7Ozs7U0FNQUwsUUFBQSxpQkFBZTtBQUNYLFdBQU8sSUFBSUwsSUFBSixDQUFTLEtBQUtPLENBQWQsRUFBaUIsS0FBS0MsQ0FBdEIsRUFBeUIsS0FBS0MsQ0FBOUIsRUFBaUMsS0FBS0MsQ0FBdEMsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7U0FRQUUsTUFBQSxhQUFLcUgsUUFBTCxFQUEyQjtBQUN2QixTQUFLMUgsQ0FBTCxHQUFTMEgsUUFBUSxDQUFDMUgsQ0FBbEI7QUFDQSxTQUFLQyxDQUFMLEdBQVN5SCxRQUFRLENBQUN6SCxDQUFsQjtBQUNBLFNBQUtDLENBQUwsR0FBU3dILFFBQVEsQ0FBQ3hILENBQWxCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTdUgsUUFBUSxDQUFDdkgsQ0FBbEI7QUFDQSxXQUFPLElBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7U0FPQStHLFNBQUEsZ0JBQVF2SCxLQUFSLEVBQThCO0FBQzFCLFdBQU9BLEtBQUssSUFBSSxLQUFLSyxDQUFMLEtBQVdMLEtBQUssQ0FBQ0ssQ0FBMUIsSUFBK0IsS0FBS0MsQ0FBTCxLQUFXTixLQUFLLENBQUNNLENBQWhELElBQXFELEtBQUtDLENBQUwsS0FBV1AsS0FBSyxDQUFDTyxDQUF0RSxJQUEyRSxLQUFLQyxDQUFMLEtBQVdSLEtBQUssQ0FBQ1EsQ0FBbkc7QUFDSDtBQUVEOzs7Ozs7Ozs7U0FPQWtHLFVBQUEsaUJBQVN6RyxHQUFULEVBQTBCO0FBQ3RCLFdBQU9ILElBQUksQ0FBQzRHLE9BQUwsQ0FBYXpHLEdBQWIsRUFBa0IsSUFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7OztTQU9BNEYsWUFBQSxtQkFBV21DLEtBQVgsRUFBOEI7QUFDMUIsV0FBT2xJLElBQUksQ0FBQytGLFNBQUwsQ0FBZSxJQUFmLEVBQXFCbUMsS0FBSyxDQUFDM0gsQ0FBM0IsRUFBOEIySCxLQUFLLENBQUMxSCxDQUFwQyxFQUF1QzBILEtBQUssQ0FBQ3pILENBQTdDLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztTQVNBOEMsT0FBQSxjQUFNNEUsRUFBTixFQUFnQkMsS0FBaEIsRUFBK0JqSSxHQUEvQixFQUFpRDtBQUM3Q0EsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFiO0FBQ0FBLElBQUFBLElBQUksQ0FBQ3lELEtBQUwsQ0FBV3RELEdBQVgsRUFBZ0IsSUFBaEIsRUFBc0JnSSxFQUF0QixFQUEwQkMsS0FBMUI7QUFDQSxXQUFPakksR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7OztTQU9BQyxXQUFBLGtCQUFVRixLQUFWLEVBQTZCO0FBQ3pCLFdBQU9GLElBQUksQ0FBQ0ksUUFBTCxDQUFjLElBQWQsRUFBb0IsSUFBcEIsRUFBMEJGLEtBQTFCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7U0FVQTJDLGVBQUEsc0JBQWNDLEdBQWQsRUFBeUJDLElBQXpCLEVBQXFDakIsR0FBckMsRUFBa0QzQixHQUFsRCxFQUFvRTtBQUNoRUEsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFiO0FBQ0EsV0FBT0EsSUFBSSxDQUFDNkMsWUFBTCxDQUFrQjFDLEdBQWxCLEVBQXVCMkMsR0FBdkIsRUFBNEJDLElBQTVCLEVBQWtDakIsR0FBbEMsQ0FBUDtBQUNIOzs7RUF4NUI2QnVHOzs7QUFBYnJJLEtBQ1ZDLE1BQU1ELElBQUksQ0FBQ0k7QUFEREosS0FFVm9DLFFBQVFwQyxJQUFJLENBQUNrQztBQUZIbEMsS0FHVnFCLE1BQU1yQixJQUFJLENBQUNxRTtBQUhEckUsS0FpQlZzSSxXQUFXQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFJeEksSUFBSixFQUFkO0FBMDRCdEIsSUFBTWlELElBQUksR0FBRyxJQUFJakQsSUFBSixFQUFiO0FBQ0EsSUFBTWtFLElBQUksR0FBRyxJQUFJbEUsSUFBSixFQUFiO0FBQ0EsSUFBTW1CLElBQUksR0FBRyxJQUFJRixlQUFKLEVBQWI7QUFDQSxJQUFNMkQsSUFBSSxHQUFHLElBQUlELGVBQUosRUFBYjtBQUNBLElBQU1PLFNBQVMsR0FBRyxNQUFNekQsSUFBSSxDQUFDQyxFQUFYLEdBQWdCLEtBQWxDOztBQUVBK0csb0JBQVFDLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEIxSSxJQUE5QixFQUFvQztBQUFFTyxFQUFBQSxDQUFDLEVBQUUsQ0FBTDtBQUFRQyxFQUFBQSxDQUFDLEVBQUUsQ0FBWDtBQUFjQyxFQUFBQSxDQUFDLEVBQUUsQ0FBakI7QUFBb0JDLEVBQUFBLENBQUMsRUFBRTtBQUF2QixDQUFwQztBQUdBOzs7O0FBSUE7Ozs7Ozs7Ozs7OztBQVVBaUksRUFBRSxDQUFDQyxJQUFILEdBQVUsU0FBU0EsSUFBVCxDQUFlckksQ0FBZixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQjtBQUNqQyxTQUFPLElBQUlWLElBQUosQ0FBU08sQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsRUFBa0JDLENBQWxCLENBQVA7QUFDSCxDQUZEOztBQUlBaUksRUFBRSxDQUFDM0ksSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xuaW1wb3J0IFZlYzMgZnJvbSAnLi92ZWMzJztcbmltcG9ydCBNYXQzIGZyb20gJy4vbWF0Myc7XG5pbXBvcnQgeyBFUFNJTE9OLCB0b0RlZ3JlZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgX3g6IG51bWJlciA9IDAuMDtcbmxldCBfeTogbnVtYmVyID0gMC4wO1xubGV0IF96OiBudW1iZXIgPSAwLjA7XG5sZXQgX3c6IG51bWJlciA9IDAuMDtcblxuLyoqXG4gKiAhI2VuIFJlcHJlc2VudGF0aW9uIG9mIDJEIHZlY3RvcnMgYW5kIHBvaW50cy5cbiAqICEjemgg6KGo56S6IDJEIOWQkemHj+WSjOWdkOagh1xuICpcbiAqIEBjbGFzcyBRdWF0XG4gKiBAZXh0ZW5kcyBWYWx1ZVR5cGVcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIENvbnN0cnVjdG9yXG4gKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvcXVhdDptZXRob2RcIn19Y2MucXVhdHt7L2Nyb3NzTGlua319XG4gKiAhI3poXG4gKiDmnoTpgKDlh73mlbDvvIzlj6/mn6XnnIsge3sjY3Jvc3NMaW5rIFwiY2MvcXVhdDptZXRob2RcIn19Y2MucXVhdHt7L2Nyb3NzTGlua319XG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge251bWJlcn0gW3g9MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFt6PTBdXG4gKiBAcGFyYW0ge251bWJlcn0gW3c9MV1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhdCBleHRlbmRzIFZhbHVlVHlwZSB7XG4gICAgc3RhdGljIG11bCA9IFF1YXQubXVsdGlwbHk7XG4gICAgc3RhdGljIHNjYWxlID0gUXVhdC5tdWx0aXBseVNjYWxhcjtcbiAgICBzdGF0aWMgbWFnID0gUXVhdC5sZW47XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENhbGN1bGF0ZSB0aGUgbXVsdGlwbHkgcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZVxuICAgICAqICEjemgg6K6h566X5Zub5YWD5pWw5LmY56ev55qE57uT5p6cXG4gICAgICogQG1ldGhvZCBtdWxcbiAgICAgKiBAcGFyYW0ge1F1YXR9IG90aGVyXG4gICAgICogQHBhcmFtIHtRdWF0fSBbb3V0XVxuICAgICAqIEByZXR1cm5zIHtRdWF0fSBvdXRcbiAgICAgKi9cbiAgICBtdWwgKG90aGVyOiBRdWF0LCBvdXQ/OiBRdWF0KTogUXVhdCB7XG4gICAgICAgIHJldHVybiBRdWF0Lm11bHRpcGx5KG91dCB8fCBuZXcgUXVhdCgpLCB0aGlzLCBvdGhlcik7XG4gICAgfVxuXG4gICAgc3RhdGljIElERU5USVRZID0gT2JqZWN0LmZyZWV6ZShuZXcgUXVhdCgpKTtcblxuICAgIC8qKlxuICAgICAqICEjemgg6I635b6X5oyH5a6a5Zub5YWD5pWw55qE5ou36LSdXG4gICAgICogISNlbiBPYnRhaW5pbmcgY29weSBzcGVjaWZpZWQgcXVhdGVybmlvblxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNsb25lPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCk6IFF1YXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNsb25lPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFF1YXQoYS54LCBhLnksIGEueiwgYS53KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWkjeWItuebruagh+Wbm+WFg+aVsFxuICAgICAqICEjZW4gQ29weSBxdWF0ZXJuaW9uIHRhcmdldFxuICAgICAqIEBtZXRob2QgY29weVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29weTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjb3B5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpIHtcbiAgICAgICAgb3V0LnggPSBhLng7XG4gICAgICAgIG91dC55ID0gYS55O1xuICAgICAgICBvdXQueiA9IGEuejtcbiAgICAgICAgb3V0LncgPSBhLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorr7nva7lm5vlhYPmlbDlgLxcbiAgICAgKiAhI2VuIFByb3ZpZGVkIFF1YXRlcm5pb24gVmFsdWVcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2V0PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0geDtcbiAgICAgICAgb3V0LnkgPSB5O1xuICAgICAgICBvdXQueiA9IHo7XG4gICAgICAgIG91dC53ID0gdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWwhuebruagh+i1i+WAvOS4uuWNleS9jeWbm+WFg+aVsFxuICAgICAqICEjZW4gVGhlIHRhcmdldCBvZiBhbiBhc3NpZ25tZW50IGFzIGEgdW5pdCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCBpZGVudGl0eVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaWRlbnRpdHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGlkZW50aXR5PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIG91dC53ID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiuvue9ruWbm+WFg+aVsOS4uuS4pOWQkemHj+mXtOeahOacgOefrei3r+W+hOaXi+i9rO+8jOm7mOiupOS4pOWQkemHj+mDveW3suW9kuS4gOWMllxuICAgICAqICEjZW4gU2V0IHF1YXRlcm5pb24gcm90YXRpb24gaXMgdGhlIHNob3J0ZXN0IHBhdGggYmV0d2VlbiB0d28gdmVjdG9ycywgdGhlIGRlZmF1bHQgdHdvIHZlY3RvcnMgYXJlIG5vcm1hbGl6ZWRcbiAgICAgKiBAbWV0aG9kIHJvdGF0aW9uVG9cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0aW9uVG88T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlY0xpa2UsIGI6IFZlY0xpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0aW9uVG88T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlY0xpa2UsIGI6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgZG90ID0gVmVjMy5kb3QoYSwgYik7XG4gICAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgICAgIFZlYzMuY3Jvc3ModjNfMSwgVmVjMy5SSUdIVCwgYSk7XG4gICAgICAgICAgICBpZiAodjNfMS5tYWcoKSA8IDAuMDAwMDAxKSB7XG4gICAgICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBWZWMzLlVQLCBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzEsIHYzXzEpO1xuICAgICAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKG91dCwgdjNfMSwgTWF0aC5QSSk7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgICAgICBvdXQueCA9IDA7XG4gICAgICAgICAgICBvdXQueSA9IDA7XG4gICAgICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgICAgICBvdXQudyA9IDE7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBhLCBiKTtcbiAgICAgICAgICAgIG91dC54ID0gdjNfMS54O1xuICAgICAgICAgICAgb3V0LnkgPSB2M18xLnk7XG4gICAgICAgICAgICBvdXQueiA9IHYzXzEuejtcbiAgICAgICAgICAgIG91dC53ID0gMSArIGRvdDtcbiAgICAgICAgICAgIHJldHVybiBRdWF0Lm5vcm1hbGl6ZShvdXQsIG91dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiOt+WPluWbm+WFg+aVsOeahOaXi+i9rOi9tOWSjOaXi+i9rOW8p+W6plxuICAgICAqICEjZW4gR2V0IHRoZSByb3Rhcnkgc2hhZnQgYW5kIHRoZSBhcmMgb2Ygcm90YXRpb24gcXVhdGVybmlvblxuICAgICAqIEBtZXRob2QgZ2V0QXhpc0FuZ2xlXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXRBeGlzIC0g5peL6L2s6L206L6T5Ye6XG4gICAgICogQHBhcmFtIHtRdWF0fSBxIC0g5rqQ5Zub5YWD5pWwXG4gICAgICogQHJldHVybiB7TnVtYmVyfSAtIOaXi+i9rOW8p+W6plxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0QXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dEF4aXM6IFZlY0xpa2UsIHE6IE91dCk6IG51bWJlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dEF4aXM6IFZlY0xpa2UsIHE6IE91dCkge1xuICAgICAgICBjb25zdCByYWQgPSBNYXRoLmFjb3MocS53KSAqIDIuMDtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCAvIDIuMCk7XG4gICAgICAgIGlmIChzICE9PSAwLjApIHtcbiAgICAgICAgICAgIG91dEF4aXMueCA9IHEueCAvIHM7XG4gICAgICAgICAgICBvdXRBeGlzLnkgPSBxLnkgLyBzO1xuICAgICAgICAgICAgb3V0QXhpcy56ID0gcS56IC8gcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHMgaXMgemVybywgcmV0dXJuIGFueSBheGlzIChubyByb3RhdGlvbiAtIGF4aXMgZG9lcyBub3QgbWF0dGVyKVxuICAgICAgICAgICAgb3V0QXhpcy54ID0gMTtcbiAgICAgICAgICAgIG91dEF4aXMueSA9IDA7XG4gICAgICAgICAgICBvdXRBeGlzLnogPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDkuZjms5VcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gbXVsdGlwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtdWx0aXBseTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzEgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzIgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIpIHtcbiAgICAgICAgX3ggPSBhLnggKiBiLncgKyBhLncgKiBiLnggKyBhLnkgKiBiLnogLSBhLnogKiBiLnk7XG4gICAgICAgIF95ID0gYS55ICogYi53ICsgYS53ICogYi55ICsgYS56ICogYi54IC0gYS54ICogYi56O1xuICAgICAgICBfeiA9IGEueiAqIGIudyArIGEudyAqIGIueiArIGEueCAqIGIueSAtIGEueSAqIGIueDtcbiAgICAgICAgX3cgPSBhLncgKiBiLncgLSBhLnggKiBiLnggLSBhLnkgKiBiLnkgLSBhLnogKiBiLno7XG4gICAgICAgIG91dC54ID0gX3g7XG4gICAgICAgIG91dC55ID0gX3k7XG4gICAgICAgIG91dC56ID0gX3o7XG4gICAgICAgIG91dC53ID0gX3c7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDmoIfph4/kuZjms5VcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gc2NhbGFyIG11bHRpcGxpY2F0aW9uXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbXVsdGlwbHlTY2FsYXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKiBiO1xuICAgICAgICBvdXQueSA9IGEueSAqIGI7XG4gICAgICAgIG91dC56ID0gYS56ICogYjtcbiAgICAgICAgb3V0LncgPSBhLncgKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zub5YWD5pWw5LmY5Yqg77yaQSArIEIgKiBzY2FsZVxuICAgICAqICEjZW4gUXVhdGVybmlvbiBtdWx0aXBsaWNhdGlvbiBhbmQgYWRkaXRpb246IEEgKyBCICogc2NhbGVcbiAgICAgKiBAbWV0aG9kIHNjYWxlQW5kQWRkXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzY2FsZUFuZEFkZDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueCAqIHNjYWxlO1xuICAgICAgICBvdXQueSA9IGEueSArIGIueSAqIHNjYWxlO1xuICAgICAgICBvdXQueiA9IGEueiArIGIueiAqIHNjYWxlO1xuICAgICAgICBvdXQudyA9IGEudyArIGIudyAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg57uVIFgg6L205peL6L2s5oyH5a6a5Zub5YWD5pWwXG4gICAgICogISNlbiBBYm91dCB0aGUgWCBheGlzIHNwZWNpZmllZCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCByb3RhdGVYXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVYPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgcmFkICo9IDAuNTtcblxuICAgICAgICBjb25zdCBieCA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgICAgICBvdXQueCA9IGEueCAqIGJ3ICsgYS53ICogYng7XG4gICAgICAgIG91dC55ID0gYS55ICogYncgKyBhLnogKiBieDtcbiAgICAgICAgb3V0LnogPSBhLnogKiBidyAtIGEueSAqIGJ4O1xuICAgICAgICBvdXQudyA9IGEudyAqIGJ3IC0gYS54ICogYng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5UgWSDovbTml4vovazmjIflrprlm5vlhYPmlbBcbiAgICAgKiAhI2VuIFJvdGF0aW9uIGFib3V0IHRoZSBZIGF4aXMgZGVzaWduYXRlZCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCByb3RhdGVZXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVZPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgcmFkICo9IDAuNTtcblxuICAgICAgICBjb25zdCBieSA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgICAgICBvdXQueCA9IGEueCAqIGJ3IC0gYS56ICogYnk7XG4gICAgICAgIG91dC55ID0gYS55ICogYncgKyBhLncgKiBieTtcbiAgICAgICAgb3V0LnogPSBhLnogKiBidyArIGEueCAqIGJ5O1xuICAgICAgICBvdXQudyA9IGEudyAqIGJ3IC0gYS55ICogYnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5UgWiDovbTml4vovazmjIflrprlm5vlhYPmlbBcbiAgICAgKiAhI2VuIEFyb3VuZCB0aGUgWiBheGlzIHNwZWNpZmllZCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCByb3RhdGVaXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVaPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgcmFkICo9IDAuNTtcblxuICAgICAgICBjb25zdCBieiA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGJ3ID0gTWF0aC5jb3MocmFkKTtcblxuICAgICAgICBvdXQueCA9IGEueCAqIGJ3ICsgYS55ICogYno7XG4gICAgICAgIG91dC55ID0gYS55ICogYncgLSBhLnggKiBiejtcbiAgICAgICAgb3V0LnogPSBhLnogKiBidyArIGEudyAqIGJ6O1xuICAgICAgICBvdXQudyA9IGEudyAqIGJ3IC0gYS56ICogYno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5XkuJbnlYznqbrpl7TkuIvmjIflrprovbTml4vovazlm5vlhYPmlbBcbiAgICAgKiAhI2VuIFNwYWNlIGFyb3VuZCB0aGUgd29ybGQgYXQgYSBnaXZlbiBheGlzIG9mIHJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZUFyb3VuZFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm90YXRlQXJvdW5kPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gYXhpcyDml4vovazovbTvvIzpu5jorqTlt7LlvZLkuIDljJZcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlQXJvdW5kPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgLy8gZ2V0IGludi1heGlzIChsb2NhbCB0byByb3QpXG4gICAgICAgIFF1YXQuaW52ZXJ0KHF0XzEsIHJvdCk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdCh2M18xLCBheGlzLCBxdF8xKTtcbiAgICAgICAgLy8gcm90YXRlIGJ5IGludi1heGlzXG4gICAgICAgIFF1YXQuZnJvbUF4aXNBbmdsZShxdF8xLCB2M18xLCByYWQpO1xuICAgICAgICBRdWF0Lm11bHRpcGx5KG91dCwgcm90LCBxdF8xKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOe7leacrOWcsOepuumXtOS4i+aMh+Wumui9tOaXi+i9rOWbm+WFg+aVsFxuICAgICAqICEjZW4gTG9jYWwgc3BhY2UgYXJvdW5kIHRoZSBzcGVjaWZpZWQgYXhpcyByb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCByb3RhdGVBcm91bmRMb2NhbFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm90YXRlQXJvdW5kTG9jYWw8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHJvdDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBheGlzIOaXi+i9rOi9tFxuICAgICAqIEBwYXJhbSByYWQg5peL6L2s5byn5bqmXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVBcm91bmRMb2NhbDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIFF1YXQuZnJvbUF4aXNBbmdsZShxdF8xLCBheGlzLCByYWQpO1xuICAgICAgICBRdWF0Lm11bHRpcGx5KG91dCwgcm90LCBxdF8xKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNriB4eXog5YiG6YeP6K6h566XIHcg5YiG6YeP77yM6buY6K6k5bey5b2S5LiA5YyWXG4gICAgICogISNlbiBUaGUgY29tcG9uZW50IHcgeHl6IGNvbXBvbmVudHMgY2FsY3VsYXRlZCwgbm9ybWFsaXplZCBieSBkZWZhdWx0XG4gICAgICogQG1ldGhvZCBjYWxjdWxhdGVXXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjYWxjdWxhdGVXPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNhbGN1bGF0ZVc8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuXG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgb3V0LnogPSBhLno7XG4gICAgICAgIG91dC53ID0gTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIGEueCAqIGEueCAtIGEueSAqIGEueSAtIGEueiAqIGEueikpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zub5YWD5pWw54K556ev77yI5pWw6YeP56ev77yJXG4gICAgICogISNlbiBRdWF0ZXJuaW9uIGRvdCBwcm9kdWN0IChzY2FsYXIgcHJvZHVjdClcbiAgICAgKiBAbWV0aG9kIGRvdFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZG90PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBkb3Q8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOe6v+aAp+aPkuWAvO+8miBBICsgdCAqIChCIC0gQSlcbiAgICAgKiAhI2VuIEVsZW1lbnQgYnkgZWxlbWVudCBsaW5lYXIgaW50ZXJwb2xhdGlvbjogQSArIHQgKiAoQiAtIEEpXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xuICAgICAgICBvdXQueSA9IGEueSArIHQgKiAoYi55IC0gYS55KTtcbiAgICAgICAgb3V0LnogPSBhLnogKyB0ICogKGIueiAtIGEueik7XG4gICAgICAgIG91dC53ID0gYS53ICsgdCAqIChiLncgLSBhLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zub5YWD5pWw55CD6Z2i5o+S5YC8XG4gICAgICogISNlbiBTcGhlcmljYWwgcXVhdGVybmlvbiBpbnRlcnBvbGF0aW9uXG4gICAgICogQG1ldGhvZCBzbGVycFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2xlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPihvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMiwgdDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzEgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzIgZXh0ZW5kcyBJUXVhdExpa2U+XG4gICAgICAgIChvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMiwgdDogbnVtYmVyKSB7XG4gICAgICAgIC8vIGJlbmNobWFya3M6XG4gICAgICAgIC8vICAgIGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tc2xlcnAtaW1wbGVtZW50YXRpb25zXG5cbiAgICAgICAgbGV0IHNjYWxlMCA9IDA7XG4gICAgICAgIGxldCBzY2FsZTEgPSAwO1xuXG4gICAgICAgIC8vIGNhbGMgY29zaW5lXG4gICAgICAgIGxldCBjb3NvbSA9IGEueCAqIGIueCArIGEueSAqIGIueSArIGEueiAqIGIueiArIGEudyAqIGIudztcbiAgICAgICAgLy8gYWRqdXN0IHNpZ25zIChpZiBuZWNlc3NhcnkpXG4gICAgICAgIGlmIChjb3NvbSA8IDAuMCkge1xuICAgICAgICAgICAgY29zb20gPSAtY29zb207XG4gICAgICAgICAgICBiLnggPSAtYi54O1xuICAgICAgICAgICAgYi55ID0gLWIueTtcbiAgICAgICAgICAgIGIueiA9IC1iLno7XG4gICAgICAgICAgICBiLncgPSAtYi53O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcbiAgICAgICAgaWYgKCgxLjAgLSBjb3NvbSkgPiAwLjAwMDAwMSkge1xuICAgICAgICAgICAgLy8gc3RhbmRhcmQgY2FzZSAoc2xlcnApXG4gICAgICAgICAgICBjb25zdCBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSk7XG4gICAgICAgICAgICBjb25zdCBzaW5vbSA9IE1hdGguc2luKG9tZWdhKTtcbiAgICAgICAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICAgICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gXCJmcm9tXCIgYW5kIFwidG9cIiBxdWF0ZXJuaW9ucyBhcmUgdmVyeSBjbG9zZVxuICAgICAgICAgICAgLy8gIC4uLiBzbyB3ZSBjYW4gZG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgc2NhbGUwID0gMS4wIC0gdDtcbiAgICAgICAgICAgIHNjYWxlMSA9IHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2FsY3VsYXRlIGZpbmFsIHZhbHVlc1xuICAgICAgICBvdXQueCA9IHNjYWxlMCAqIGEueCArIHNjYWxlMSAqIGIueDtcbiAgICAgICAgb3V0LnkgPSBzY2FsZTAgKiBhLnkgKyBzY2FsZTEgKiBiLnk7XG4gICAgICAgIG91dC56ID0gc2NhbGUwICogYS56ICsgc2NhbGUxICogYi56O1xuICAgICAgICBvdXQudyA9IHNjYWxlMCAqIGEudyArIHNjYWxlMSAqIGIudztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5bim5Lik5Liq5o6n5Yi254K555qE5Zub5YWD5pWw55CD6Z2i5o+S5YC8XG4gICAgICogISNlbiBRdWF0ZXJuaW9uIHdpdGggdHdvIHNwaGVyaWNhbCBpbnRlcnBvbGF0aW9uIGNvbnRyb2wgcG9pbnRzXG4gICAgICogQG1ldGhvZCBzcWxlcnBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNxbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIGM6IE91dCwgZDogT3V0LCB0OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNxbGVycDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIGM6IE91dCwgZDogT3V0LCB0OiBudW1iZXIpIHtcbiAgICAgICAgUXVhdC5zbGVycChxdF8xLCBhLCBkLCB0KTtcbiAgICAgICAgUXVhdC5zbGVycChxdF8yLCBiLCBjLCB0KTtcbiAgICAgICAgUXVhdC5zbGVycChvdXQsIHF0XzEsIHF0XzIsIDIgKiB0ICogKDEgLSB0KSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDmsYLpgIZcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gaW52ZXJzZVxuICAgICAqIEBtZXRob2QgaW52ZXJ0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnZlcnQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgaW52ZXJ0PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpIHtcbiAgICAgICAgY29uc3QgZG90ID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgICAgICBjb25zdCBpbnZEb3QgPSBkb3QgPyAxLjAgLyBkb3QgOiAwO1xuXG4gICAgICAgIC8vIFRPRE86IFdvdWxkIGJlIGZhc3RlciB0byByZXR1cm4gWzAsMCwwLDBdIGltbWVkaWF0ZWx5IGlmIGRvdCA9PSAwXG5cbiAgICAgICAgb3V0LnggPSAtYS54ICogaW52RG90O1xuICAgICAgICBvdXQueSA9IC1hLnkgKiBpbnZEb3Q7XG4gICAgICAgIG91dC56ID0gLWEueiAqIGludkRvdDtcbiAgICAgICAgb3V0LncgPSBhLncgKiBpbnZEb3Q7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlhbHova3lm5vlhYPmlbDvvIzlr7nljZXkvY3lm5vlhYPmlbDkuI7msYLpgIbnrYnku7fvvIzkvYbmm7Tpq5jmlYhcbiAgICAgKiAhI2VuIENvbmp1Z2F0aW5nIGEgcXVhdGVybmlvbiwgYW5kIHRoZSB1bml0IHF1YXRlcm5pb24gZXF1aXZhbGVudCB0byBpbnZlcnNpb24sIGJ1dCBtb3JlIGVmZmljaWVudFxuICAgICAqIEBtZXRob2QgY29uanVnYXRlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb25qdWdhdGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY29uanVnYXRlPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSAtYS54O1xuICAgICAgICBvdXQueSA9IC1hLnk7XG4gICAgICAgIG91dC56ID0gLWEuejtcbiAgICAgICAgb3V0LncgPSBhLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlm5vlhYPmlbDplb/luqZcbiAgICAgKiAhI2VuIFNlZWsgbGVuZ3RoIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIGxlblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbGVuPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCk6IG51bWJlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGVuPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlm5vlhYPmlbDplb/luqblubPmlrlcbiAgICAgKiAhI2VuIFNlZWtpbmcgcXVhdGVybmlvbiBzcXVhcmUgb2YgdGhlIGxlbmd0aFxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsZW5ndGhTcXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsZW5ndGhTcXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIHJldHVybiBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlvZLkuIDljJblm5vlhYPmlbBcbiAgICAgKiAhI2VuIE5vcm1hbGl6ZWQgcXVhdGVybmlvbnNcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbm9ybWFsaXplPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG5vcm1hbGl6ZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIGxldCBsZW4gPSBhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLnc7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgICAgICBvdXQueCA9IGEueCAqIGxlbjtcbiAgICAgICAgICAgIG91dC55ID0gYS55ICogbGVuO1xuICAgICAgICAgICAgb3V0LnogPSBhLnogKiBsZW47XG4gICAgICAgICAgICBvdXQudyA9IGEudyAqIGxlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5pys5Zyw5Z2Q5qCH6L205pyd5ZCR6K6h566X5Zub5YWD5pWw77yM6buY6K6k5LiJ5ZCR6YeP6YO95bey5b2S5LiA5YyW5LiU55u45LqS5Z6C55u0XG4gICAgICogISNlbiBDYWxjdWxhdGVkIGFjY29yZGluZyB0byB0aGUgbG9jYWwgb3JpZW50YXRpb24gcXVhdGVybmlvbiBjb29yZGluYXRlIGF4aXMsIHRoZSBkZWZhdWx0IHRocmVlIHZlY3RvcnMgYXJlIG5vcm1hbGl6ZWQgYW5kIG11dHVhbGx5IHBlcnBlbmRpY3VsYXJcbiAgICAgKiBAbWV0aG9kIGZyb21BeGVzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXhlczxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeEF4aXM6IFZlY0xpa2UsIHlBeGlzOiBWZWNMaWtlLCB6QXhpczogVmVjTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUF4ZXM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHhBeGlzOiBWZWNMaWtlLCB5QXhpczogVmVjTGlrZSwgekF4aXM6IFZlY0xpa2UpIHtcbiAgICAgICAgTWF0My5zZXQobTNfMSxcbiAgICAgICAgICAgIHhBeGlzLngsIHhBeGlzLnksIHhBeGlzLnosXG4gICAgICAgICAgICB5QXhpcy54LCB5QXhpcy55LCB5QXhpcy56LFxuICAgICAgICAgICAgekF4aXMueCwgekF4aXMueSwgekF4aXMueixcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgUXVhdC5mcm9tTWF0MyhvdXQsIG0zXzEpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruinhuWPo+eahOWJjeaWueWQkeWSjOS4iuaWueWQkeiuoeeul+Wbm+WFg+aVsFxuICAgICAqICEjZW4gVGhlIGZvcndhcmQgZGlyZWN0aW9uIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSB2aWV3cG9ydCBjb21wdXRpbmcgcXVhdGVybmlvblxuICAgICAqIEBtZXRob2QgZnJvbVZpZXdVcFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVZpZXdVcDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgdmlldzogVmVjMywgdXA/OiBWZWMzKTogT3V0XG4gICAgICogQHBhcmFtIHZpZXcg6KeG5Y+j6Z2i5ZCR55qE5YmN5pa55ZCR77yM5b+F6aG75b2S5LiA5YyWXG4gICAgICogQHBhcmFtIHVwIOinhuWPo+eahOS4iuaWueWQke+8jOW/hemhu+W9kuS4gOWMlu+8jOm7mOiupOS4uiAoMCwgMSwgMClcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21WaWV3VXA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHZpZXc6IFZlYzMsIHVwPzogVmVjMykge1xuICAgICAgICBNYXQzLmZyb21WaWV3VXAobTNfMSwgdmlldywgdXApO1xuICAgICAgICByZXR1cm4gUXVhdC5ub3JtYWxpemUob3V0LCBRdWF0LmZyb21NYXQzKG91dCwgbTNfMSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5peL6L2s6L205ZKM5peL6L2s5byn5bqm6K6h566X5Zub5YWD5pWwXG4gICAgICogISNlbiBUaGUgcXVhdGVybmlvbiBjYWxjdWxhdGVkIGFuZCB0aGUgYXJjIG9mIHJvdGF0aW9uIG9mIHRoZSByb3Rhcnkgc2hhZnRcbiAgICAgKiBAbWV0aG9kIGZyb21BeGlzQW5nbGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21BeGlzQW5nbGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tQXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcikge1xuICAgICAgICByYWQgPSByYWQgKiAwLjU7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBvdXQueCA9IHMgKiBheGlzLng7XG4gICAgICAgIG91dC55ID0gcyAqIGF4aXMueTtcbiAgICAgICAgb3V0LnogPSBzICogYXhpcy56O1xuICAgICAgICBvdXQudyA9IE1hdGguY29zKHJhZCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiBldWxlciBhbmdsZSAwLCAwLCB6LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtRdWF0fSBvdXQgLSBRdWF0ZXJuaW9uIHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0geiAtIEFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQgWiBheGlzIGluIGRlZ3JlZXMuXG4gICAgICogQHJldHVybnMge1F1YXR9XG4gICAgICogQGZ1bmN0aW9uXG4gICAgICovXG4gICAgc3RhdGljIGZyb21BbmdsZVogKG91dDogUXVhdCwgejogbnVtYmVyKTogUXVhdCB7XG4gICAgICAgIHogKj0gaGFsZlRvUmFkO1xuICAgICAgICBvdXQueCA9IG91dC55ID0gMDtcbiAgICAgICAgb3V0LnogPSBNYXRoLnNpbih6KTtcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyh6KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruS4iee7tOefqemYteS/oeaBr+iuoeeul+Wbm+WFg+aVsO+8jOm7mOiupOi+k+WFpeefqemYteS4jeWQq+aciee8qeaUvuS/oeaBr1xuICAgICAqICEjZW4gQ2FsY3VsYXRpbmcgdGhlIHRocmVlLWRpbWVuc2lvbmFsIHF1YXRlcm5pb24gbWF0cml4IGluZm9ybWF0aW9uLCBkZWZhdWx0IHpvb20gaW5mb3JtYXRpb24gaW5wdXQgbWF0cml4IGRvZXMgbm90IGNvbnRhaW5cbiAgICAgKiBAbWV0aG9kIGZyb21NYXQzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tTWF0MzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgbWF0OiBNYXQzKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tTWF0MzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgbWF0OiBNYXQzKSB7XG4gICAgICAgIGxldCBtID0gbWF0Lm07XG4gICAgICAgIGxldCBtMDAgPSBtWzBdLCBtMTAgPSBtWzFdLCBtMjAgPSBtWzJdLFxuICAgICAgICAgICAgbTAxID0gbVszXSwgbTExID0gbVs0XSwgbTIxID0gbVs1XSxcbiAgICAgICAgICAgIG0wMiA9IG1bNl0sIG0xMiA9IG1bN10sIG0yMiA9IG1bOF07XG5cbiAgICAgICAgY29uc3QgdHJhY2UgPSBtMDAgKyBtMTEgKyBtMjI7XG5cbiAgICAgICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCh0cmFjZSArIDEuMCk7XG5cbiAgICAgICAgICAgIG91dC53ID0gMC4yNSAvIHM7XG4gICAgICAgICAgICBvdXQueCA9IChtMjEgLSBtMTIpICogcztcbiAgICAgICAgICAgIG91dC55ID0gKG0wMiAtIG0yMCkgKiBzO1xuICAgICAgICAgICAgb3V0LnogPSAobTEwIC0gbTAxKSAqIHM7XG5cbiAgICAgICAgfSBlbHNlIGlmICgobTAwID4gbTExKSAmJiAobTAwID4gbTIyKSkge1xuICAgICAgICAgICAgY29uc3QgcyA9IDIuMCAqIE1hdGguc3FydCgxLjAgKyBtMDAgLSBtMTEgLSBtMjIpO1xuXG4gICAgICAgICAgICBvdXQudyA9IChtMjEgLSBtMTIpIC8gcztcbiAgICAgICAgICAgIG91dC54ID0gMC4yNSAqIHM7XG4gICAgICAgICAgICBvdXQueSA9IChtMDEgKyBtMTApIC8gcztcbiAgICAgICAgICAgIG91dC56ID0gKG0wMiArIG0yMCkgLyBzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobTExID4gbTIyKSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0xMSAtIG0wMCAtIG0yMik7XG5cbiAgICAgICAgICAgIG91dC53ID0gKG0wMiAtIG0yMCkgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTAxICsgbTEwKSAvIHM7XG4gICAgICAgICAgICBvdXQueSA9IDAuMjUgKiBzO1xuICAgICAgICAgICAgb3V0LnogPSAobTEyICsgbTIxKSAvIHM7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTIyIC0gbTAwIC0gbTExKTtcblxuICAgICAgICAgICAgb3V0LncgPSAobTEwIC0gbTAxKSAvIHM7XG4gICAgICAgICAgICBvdXQueCA9IChtMDIgKyBtMjApIC8gcztcbiAgICAgICAgICAgIG91dC55ID0gKG0xMiArIG0yMSkgLyBzO1xuICAgICAgICAgICAgb3V0LnogPSAwLjI1ICogcztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmoLnmja7mrKfmi4nop5Lkv6Hmga/orqHnrpflm5vlhYPmlbDvvIzml4vovazpobrluo/kuLogWVpYXG4gICAgICogISNlbiBUaGUgcXVhdGVybmlvbiBjYWxjdWxhdGVkIEV1bGVyIGFuZ2xlIGluZm9ybWF0aW9uLCByb3RhdGlvbiBvcmRlciBZWlhcbiAgICAgKiBAbWV0aG9kIGZyb21FdWxlclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbUV1bGVyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tRXVsZXI8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcbiAgICAgICAgeCAqPSBoYWxmVG9SYWQ7XG4gICAgICAgIHkgKj0gaGFsZlRvUmFkO1xuICAgICAgICB6ICo9IGhhbGZUb1JhZDtcblxuICAgICAgICBjb25zdCBzeCA9IE1hdGguc2luKHgpO1xuICAgICAgICBjb25zdCBjeCA9IE1hdGguY29zKHgpO1xuICAgICAgICBjb25zdCBzeSA9IE1hdGguc2luKHkpO1xuICAgICAgICBjb25zdCBjeSA9IE1hdGguY29zKHkpO1xuICAgICAgICBjb25zdCBzeiA9IE1hdGguc2luKHopO1xuICAgICAgICBjb25zdCBjeiA9IE1hdGguY29zKHopO1xuXG4gICAgICAgIG91dC54ID0gc3ggKiBjeSAqIGN6ICsgY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXQueSA9IGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0LnogPSBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dC53ID0gY3ggKiBjeSAqIGN6IC0gc3ggKiBzeSAqIHN6O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDov5Tlm57lrprkuYnmraTlm5vlhYPmlbDnmoTlnZDmoIfns7sgWCDovbTlkJHph49cbiAgICAgKiAhI2VuIFRoaXMgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBxdWF0ZXJuaW9uIGNvb3JkaW5hdGUgc3lzdGVtIFgtYXhpcyB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIHRvQXhpc1hcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvQXhpc1g8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBxOiBPdXQpOiBWZWNMaWtlXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0F4aXNYPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KSB7XG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcbiAgICAgICAgb3V0LnggPSAxLjAgLSBmeSAqIHEueSAtIGZ6ICogcS56O1xuICAgICAgICBvdXQueSA9IGZ5ICogcS54ICsgZnogKiBxLnc7XG4gICAgICAgIG91dC56ID0gZnogKiBxLnggKyBmeSAqIHEudztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6L+U5Zue5a6a5LmJ5q2k5Zub5YWD5pWw55qE5Z2Q5qCH57O7IFkg6L205ZCR6YePXG4gICAgICogISNlbiBUaGlzIHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgcXVhdGVybmlvbiBjb29yZGluYXRlIHN5c3RlbSBZIGF4aXMgdmVjdG9yXG4gICAgICogQG1ldGhvZCB0b0F4aXNZXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0F4aXNZPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KTogVmVjTGlrZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BeGlzWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCkge1xuICAgICAgICBjb25zdCBmeCA9IDIuMCAqIHEueDtcbiAgICAgICAgY29uc3QgZnkgPSAyLjAgKiBxLnk7XG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xuICAgICAgICBvdXQueCA9IGZ5ICogcS54IC0gZnogKiBxLnc7XG4gICAgICAgIG91dC55ID0gMS4wIC0gZnggKiBxLnggLSBmeiAqIHEuejtcbiAgICAgICAgb3V0LnogPSBmeiAqIHEueSArIGZ4ICogcS53O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDov5Tlm57lrprkuYnmraTlm5vlhYPmlbDnmoTlnZDmoIfns7sgWiDovbTlkJHph49cbiAgICAgKiAhI2VuIFRoaXMgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBxdWF0ZXJuaW9uIGNvb3JkaW5hdGUgc3lzdGVtIHRoZSBaLWF4aXMgdmVjdG9yXG4gICAgICogQG1ldGhvZCB0b0F4aXNaXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0F4aXNaPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KTogVmVjTGlrZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BeGlzWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCkge1xuICAgICAgICBjb25zdCBmeCA9IDIuMCAqIHEueDtcbiAgICAgICAgY29uc3QgZnkgPSAyLjAgKiBxLnk7XG4gICAgICAgIGNvbnN0IGZ6ID0gMi4wICogcS56O1xuICAgICAgICBvdXQueCA9IGZ6ICogcS54IC0gZnkgKiBxLnc7XG4gICAgICAgIG91dC55ID0gZnogKiBxLnkgLSBmeCAqIHEudztcbiAgICAgICAgb3V0LnogPSAxLjAgLSBmeCAqIHEueCAtIGZ5ICogcS55O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmoLnmja7lm5vlhYPmlbDorqHnrpfmrKfmi4nop5LvvIzov5Tlm57op5LluqYgeCwgeSDlnKggWy0xODAsIDE4MF0g5Yy66Ze05YaFLCB6IOm7mOiupOWcqCBbLTkwLCA5MF0g5Yy66Ze05YaF77yM5peL6L2s6aG65bqP5Li6IFlaWFxuICAgICAqICEjZW4gVGhlIHF1YXRlcm5pb24gY2FsY3VsYXRlZCBFdWxlciBhbmdsZXMsIHJldHVybiBhbmdsZSB4LCB5IGluIHRoZSBbLTE4MCwgMTgwXSBpbnRlcnZhbCwgeiBkZWZhdWx0IHRoZSByYW5nZSBbLTkwLCA5MF0gaW50ZXJ2YWwsIHRoZSByb3RhdGlvbiBvcmRlciBZWlhcbiAgICAgKiBAbWV0aG9kIHRvRXVsZXJcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvRXVsZXI8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IElRdWF0TGlrZSwgb3V0ZXJaPzogYm9vbGVhbik6IE91dFxuICAgICAqIEBwYXJhbSBvdXRlclogeiDlj5blgLzojIPlm7TljLrpl7TmlLnkuLogWy0xODAsIC05MF0gVSBbOTAsIDE4MF1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvRXVsZXI8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IElRdWF0TGlrZSwgb3V0ZXJaPzogYm9vbGVhbikge1xuICAgICAgICBjb25zdCB7IHgsIHksIHosIHcgfSA9IHE7XG4gICAgICAgIGxldCBiYW5rID0gMDtcbiAgICAgICAgbGV0IGhlYWRpbmcgPSAwO1xuICAgICAgICBsZXQgYXR0aXR1ZGUgPSAwO1xuICAgICAgICBjb25zdCB0ZXN0ID0geCAqIHkgKyB6ICogdztcbiAgICAgICAgaWYgKHRlc3QgPiAwLjQ5OTk5OSkge1xuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xuICAgICAgICAgICAgaGVhZGluZyA9IHRvRGVncmVlKDIgKiBNYXRoLmF0YW4yKHgsIHcpKTtcbiAgICAgICAgICAgIGF0dGl0dWRlID0gOTA7XG4gICAgICAgIH0gZWxzZSBpZiAodGVzdCA8IC0wLjQ5OTk5OSkge1xuICAgICAgICAgICAgYmFuayA9IDA7IC8vIGRlZmF1bHQgdG8gemVyb1xuICAgICAgICAgICAgaGVhZGluZyA9IC10b0RlZ3JlZSgyICogTWF0aC5hdGFuMih4LCB3KSk7XG4gICAgICAgICAgICBhdHRpdHVkZSA9IC05MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNxeCA9IHggKiB4O1xuICAgICAgICAgICAgY29uc3Qgc3F5ID0geSAqIHk7XG4gICAgICAgICAgICBjb25zdCBzcXogPSB6ICogejtcbiAgICAgICAgICAgIGJhbmsgPSB0b0RlZ3JlZShNYXRoLmF0YW4yKDIgKiB4ICogdyAtIDIgKiB5ICogeiwgMSAtIDIgKiBzcXggLSAyICogc3F6KSk7XG4gICAgICAgICAgICBoZWFkaW5nID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeSAqIHcgLSAyICogeCAqIHosIDEgLSAyICogc3F5IC0gMiAqIHNxeikpO1xuICAgICAgICAgICAgYXR0aXR1ZGUgPSB0b0RlZ3JlZShNYXRoLmFzaW4oMiAqIHRlc3QpKTtcbiAgICAgICAgICAgIGlmIChvdXRlclopIHtcbiAgICAgICAgICAgICAgICBiYW5rID0gLTE4MCAqIE1hdGguc2lnbihiYW5rICsgMWUtNikgKyBiYW5rO1xuICAgICAgICAgICAgICAgIGhlYWRpbmcgPSAtMTgwICogTWF0aC5zaWduKGhlYWRpbmcgKyAxZS02KSArIGhlYWRpbmc7XG4gICAgICAgICAgICAgICAgYXR0aXR1ZGUgPSAxODAgKiBNYXRoLnNpZ24oYXR0aXR1ZGUgKyAxZS02KSAtIGF0dGl0dWRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG91dC54ID0gYmFuazsgb3V0LnkgPSBoZWFkaW5nOyBvdXQueiA9IGF0dGl0dWRlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zub5YWD5pWw562J5Lu35Yik5patXG4gICAgICogISNlbiBBbmFseXppbmcgcXVhdGVybmlvbiBlcXVpdmFsZW50XG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHNcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQsIGI6IE91dCk6IGJvb2xlYW5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnkgJiYgYS56ID09PSBiLnogJiYgYS53ID09PSBiLnc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlm5vlhYPmlbDov5HkvLznrYnku7fliKTmlq1cbiAgICAgKiAhI2VuIE5lZ2F0aXZlIGZsb2F0aW5nIHBvaW50IGVycm9yIHF1YXRlcm5pb24gYXBwcm94aW1hdGVseSBlcXVpdmFsZW50IEFuYWx5emluZ1xuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBlcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24/OiBudW1iZXIpOiBib29sZWFuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgICAgIHJldHVybiAoTWF0aC5hYnMoYS54IC0gYi54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLngpLCBNYXRoLmFicyhiLngpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYS55IC0gYi55KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnkpLCBNYXRoLmFicyhiLnkpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYS56IC0gYi56KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnopLCBNYXRoLmFicyhiLnopKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYS53IC0gYi53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLncpLCBNYXRoLmFicyhiLncpKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWbm+WFg+aVsOi9rOaVsOe7hFxuICAgICAqICEjZW4gUXVhdGVybmlvbiByb3RhdGlvbiBhcnJheVxuICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgcTogSVF1YXRMaWtlLCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gb2ZzIOaVsOe7hOWGheeahOi1t+Wni+WBj+enu+mHj1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgcTogSVF1YXRMaWtlLCBvZnMgPSAwKSB7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IHEueDtcbiAgICAgICAgb3V0W29mcyArIDFdID0gcS55O1xuICAgICAgICBvdXRbb2ZzICsgMl0gPSBxLno7XG4gICAgICAgIG91dFtvZnMgKyAzXSA9IHEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOaVsOe7hOi9rOWbm+WFg+aVsFxuICAgICAqICEjZW4gQXJyYXkgdG8gYSBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCBmcm9tQXJyYXlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcz86IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnMgPSAwKSB7XG4gICAgICAgIG91dC54ID0gYXJyW29mcyArIDBdO1xuICAgICAgICBvdXQueSA9IGFycltvZnMgKyAxXTtcbiAgICAgICAgb3V0LnogPSBhcnJbb2ZzICsgMl07XG4gICAgICAgIG91dC53ID0gYXJyW29mcyArIDNdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcbiAgICAgKi9cbiAgICB4OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcbiAgICAgKi9cbiAgICB5OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHpcbiAgICAgKi9cbiAgICB6OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHdcbiAgICAgKi9cbiAgICB3OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAoeDogUXVhdCB8IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIHo6IG51bWJlciA9IDAsIHc6IG51bWJlciA9IDEpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggYXMgbnVtYmVyO1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBjbG9uZSBhIFF1YXQgb2JqZWN0IGFuZCByZXR1cm4gdGhlIG5ldyBvYmplY3RcbiAgICAgKiAhI3poIOWFi+mahuS4gOS4quWbm+WFg+aVsOW5tui/lOWbnlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtRdWF0fVxuICAgICAqL1xuICAgIGNsb25lICgpOiBRdWF0IHtcbiAgICAgICAgcmV0dXJuIG5ldyBRdWF0KHRoaXMueCwgdGhpcy55LCB0aGlzLnosIHRoaXMudyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdmFsdWVzIHdpdGggYW5vdGhlciBxdWF0ZXJuaW9uXG4gICAgICogISN6aCDnlKjlj6bkuIDkuKrlm5vlhYPmlbDnmoTlgLzorr7nva7liLDlvZPliY3lr7nosaHkuIrjgIJcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7UXVhdH0gbmV3VmFsdWUgLSAhI2VuIG5ldyB2YWx1ZSB0byBzZXQuICEjemgg6KaB6K6+572u55qE5paw5YC8XG4gICAgICogQHJldHVybiB7UXVhdH0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHNldCAobmV3VmFsdWU6IFF1YXQpOiB0aGlzIHtcbiAgICAgICAgdGhpcy54ID0gbmV3VmFsdWUueDtcbiAgICAgICAgdGhpcy55ID0gbmV3VmFsdWUueTtcbiAgICAgICAgdGhpcy56ID0gbmV3VmFsdWUuejtcbiAgICAgICAgdGhpcy53ID0gbmV3VmFsdWUudztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIGN1cnJlbnQgcXVhdGVybmlvbiBlcXVhbHMgYW5vdGhlclxuICAgICAqICEjemgg5b2T5YmN55qE5Zub5YWD5pWw5piv5ZCm5LiO5oyH5a6a55qE5Zub5YWD5pWw55u4562J44CCXG4gICAgICogQG1ldGhvZCBlcXVhbHNcbiAgICAgKiBAcGFyYW0ge1F1YXR9IG90aGVyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBlcXVhbHMgKG90aGVyOiBRdWF0KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBvdGhlciAmJiB0aGlzLnggPT09IG90aGVyLnggJiYgdGhpcy55ID09PSBvdGhlci55ICYmIHRoaXMueiA9PT0gb3RoZXIueiAmJiB0aGlzLncgPT09IG90aGVyLnc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDb252ZXJ0IHF1YXRlcm5pb24gdG8gZXVsZXJcbiAgICAgKiAhI3poIOi9rOaNouWbm+WFg+aVsOWIsOasp+aLieinklxuICAgICAqIEBtZXRob2QgdG9FdWxlclxuICAgICAqIEBwYXJhbSB7VmVjM30gb3V0XG4gICAgICogQHJldHVybiB7VmVjM31cbiAgICAgKi9cbiAgICB0b0V1bGVyIChvdXQ6IFZlYzMpOiBWZWMzIHtcbiAgICAgICAgcmV0dXJuIFF1YXQudG9FdWxlcihvdXQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29udmVydCBldWxlciB0byBxdWF0ZXJuaW9uXG4gICAgICogISN6aCDovazmjaLmrKfmi4nop5LliLDlm5vlhYPmlbBcbiAgICAgKiBAbWV0aG9kIGZyb21FdWxlclxuICAgICAqIEBwYXJhbSB7VmVjM30gZXVsZXJcbiAgICAgKiBAcmV0dXJuIHtRdWF0fVxuICAgICAqL1xuICAgIGZyb21FdWxlciAoZXVsZXI6IFZlYzMpOiB0aGlzIHtcbiAgICAgICAgcmV0dXJuIFF1YXQuZnJvbUV1bGVyKHRoaXMsIGV1bGVyLngsIGV1bGVyLnksIGV1bGVyLnopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsY3VsYXRlIHRoZSBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgcXVhdGVybmlvbiBhbmQgYW5vdGhlciBvbmUgd2l0aCBnaXZlbiByYXRpb1xuICAgICAqICEjemgg6K6h566X5Zub5YWD5pWw55qE5o+S5YC857uT5p6cXG4gICAgICogQG1lbWJlciBsZXJwXG4gICAgICogQHBhcmFtIHtRdWF0fSB0b1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYXRpb1xuICAgICAqIEBwYXJhbSB7UXVhdH0gW291dF1cbiAgICAgKiBAcmV0dXJucyB7UXVhdH0gb3V0XG4gICAgICovXG4gICAgbGVycCAodG86IFF1YXQsIHJhdGlvOiBudW1iZXIsIG91dD86IFF1YXQpOiBRdWF0IHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBRdWF0KCk7XG4gICAgICAgIFF1YXQuc2xlcnAob3V0LCB0aGlzLCB0bywgcmF0aW8pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsY3VsYXRlIHRoZSBtdWx0aXBseSByZXN1bHQgYmV0d2VlbiB0aGlzIHF1YXRlcm5pb24gYW5kIGFub3RoZXIgb25lXG4gICAgICogISN6aCDorqHnrpflm5vlhYPmlbDkuZjnp6/nmoTnu5PmnpxcbiAgICAgKiBAbWVtYmVyIG11bHRpcGx5XG4gICAgICogQHBhcmFtIHtRdWF0fSBvdGhlclxuICAgICAqIEByZXR1cm5zIHtRdWF0fSB0aGlzXG4gICAgICovXG4gICAgbXVsdGlwbHkgKG90aGVyOiBRdWF0KTogdGhpcyB7XG4gICAgICAgIHJldHVybiBRdWF0Lm11bHRpcGx5KHRoaXMsIHRoaXMsIG90aGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSAoaW4gcmFkaWFucykgYWJvdXQgYSB3b3JsZCBzcGFjZSBheGlzLlxuICAgICAqICEjemgg5Zu057uV5LiW55WM56m66Ze06L205oyJ57uZ5a6a5byn5bqm5peL6L2s5Zub5YWD5pWwXG4gICAgICogQG1lbWJlciByb3RhdGVBcm91bmRcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHJvdCAtIFF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHtWZWMzfSBheGlzIC0gVGhlIGF4aXMgYXJvdW5kIHdoaWNoIHRvIHJvdGF0ZSBpbiB3b3JsZCBzcGFjZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgLSBBbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAgICogQHBhcmFtIHtRdWF0fSBbb3V0XSAtIFF1YXRlcm5pb24gdG8gc3RvcmUgcmVzdWx0XG4gICAgICogQHJldHVybnMge1F1YXR9IG91dFxuICAgICAqL1xuICAgIHJvdGF0ZUFyb3VuZCAocm90OiBRdWF0LCBheGlzOiBWZWMzLCByYWQ6IG51bWJlciwgb3V0PzogUXVhdCk6IFF1YXQge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFF1YXQoKTtcbiAgICAgICAgcmV0dXJuIFF1YXQucm90YXRlQXJvdW5kKG91dCwgcm90LCBheGlzLCByYWQpO1xuICAgIH1cbn1cblxuY29uc3QgcXRfMSA9IG5ldyBRdWF0KCk7XG5jb25zdCBxdF8yID0gbmV3IFF1YXQoKTtcbmNvbnN0IHYzXzEgPSBuZXcgVmVjMygpO1xuY29uc3QgbTNfMSA9IG5ldyBNYXQzKCk7XG5jb25zdCBoYWxmVG9SYWQgPSAwLjUgKiBNYXRoLlBJIC8gMTgwLjA7XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuUXVhdCcsIFF1YXQsIHsgeDogMCwgeTogMCwgejogMCwgdzogMSB9KTtcblxuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gVGhlIGNvbnZlbmllbmNlIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcge3sjY3Jvc3NMaW5rIFwiUXVhdFwifX1jYy5RdWF0e3svY3Jvc3NMaW5rfX0uXG4gKiAhI3poIOmAmui/h+ivpeeugOS+v+eahOWHveaVsOi/m+ihjOWIm+W7uiB7eyNjcm9zc0xpbmsgXCJRdWF0XCJ9fWNjLlF1YXR7ey9jcm9zc0xpbmt9fSDlr7nosaHjgIJcbiAqIEBtZXRob2QgcXVhdFxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBbeD0wXVxuICogQHBhcmFtIHtOdW1iZXJ9IFt5PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3o9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbdz0xXVxuICogQHJldHVybiB7UXVhdH1cbiAqL1xuY2MucXVhdCA9IGZ1bmN0aW9uIHF1YXQgKHgsIHksIHosIHcpIHtcbiAgICByZXR1cm4gbmV3IFF1YXQoeCwgeSwgeiwgdyk7XG59O1xuXG5jYy5RdWF0ID0gUXVhdDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9