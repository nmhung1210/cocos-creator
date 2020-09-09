
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3F1YXQudHMiXSwibmFtZXMiOlsiX3giLCJfeSIsIl96IiwiX3ciLCJRdWF0IiwibXVsIiwib3RoZXIiLCJvdXQiLCJtdWx0aXBseSIsImNsb25lIiwiYSIsIngiLCJ5IiwieiIsInciLCJjb3B5Iiwic2V0IiwiaWRlbnRpdHkiLCJyb3RhdGlvblRvIiwiYiIsImRvdCIsIlZlYzMiLCJjcm9zcyIsInYzXzEiLCJSSUdIVCIsIm1hZyIsIlVQIiwibm9ybWFsaXplIiwiZnJvbUF4aXNBbmdsZSIsIk1hdGgiLCJQSSIsImdldEF4aXNBbmdsZSIsIm91dEF4aXMiLCJxIiwicmFkIiwiYWNvcyIsInMiLCJzaW4iLCJtdWx0aXBseVNjYWxhciIsInNjYWxlQW5kQWRkIiwic2NhbGUiLCJyb3RhdGVYIiwiYngiLCJidyIsImNvcyIsInJvdGF0ZVkiLCJieSIsInJvdGF0ZVoiLCJieiIsInJvdGF0ZUFyb3VuZCIsInJvdCIsImF4aXMiLCJpbnZlcnQiLCJxdF8xIiwidHJhbnNmb3JtUXVhdCIsInJvdGF0ZUFyb3VuZExvY2FsIiwiY2FsY3VsYXRlVyIsInNxcnQiLCJhYnMiLCJsZXJwIiwidCIsInNsZXJwIiwic2NhbGUwIiwic2NhbGUxIiwiY29zb20iLCJvbWVnYSIsInNpbm9tIiwic3FsZXJwIiwiYyIsImQiLCJxdF8yIiwiaW52RG90IiwiY29uanVnYXRlIiwibGVuIiwibGVuZ3RoU3FyIiwiZnJvbUF4ZXMiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJNYXQzIiwibTNfMSIsImZyb21NYXQzIiwiZnJvbVZpZXdVcCIsInZpZXciLCJ1cCIsImZyb21BbmdsZVoiLCJoYWxmVG9SYWQiLCJtYXQiLCJtIiwibTAwIiwibTEwIiwibTIwIiwibTAxIiwibTExIiwibTIxIiwibTAyIiwibTEyIiwibTIyIiwidHJhY2UiLCJmcm9tRXVsZXIiLCJzeCIsImN4Iiwic3kiLCJjeSIsInN6IiwiY3oiLCJ0b0F4aXNYIiwiZnkiLCJmeiIsInRvQXhpc1kiLCJmeCIsInRvQXhpc1oiLCJ0b0V1bGVyIiwib3V0ZXJaIiwiYmFuayIsImhlYWRpbmciLCJhdHRpdHVkZSIsInRlc3QiLCJhdGFuMiIsInNxeCIsInNxeSIsInNxeiIsImFzaW4iLCJzaWduIiwic3RyaWN0RXF1YWxzIiwiZXF1YWxzIiwiZXBzaWxvbiIsIkVQU0lMT04iLCJtYXgiLCJ0b0FycmF5Iiwib2ZzIiwiZnJvbUFycmF5IiwiYXJyIiwibmV3VmFsdWUiLCJldWxlciIsInRvIiwicmF0aW8iLCJWYWx1ZVR5cGUiLCJJREVOVElUWSIsIk9iamVjdCIsImZyZWV6ZSIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwiY2MiLCJxdWF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7OztJQVlxQkM7Ozs7O0FBS2pCOzs7Ozs7OztTQVFBQyxNQUFBLGFBQUtDLEtBQUwsRUFBa0JDLEdBQWxCLEVBQW9DO0FBQ2hDLFdBQU9ILElBQUksQ0FBQ0ksUUFBTCxDQUFjRCxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFyQixFQUFpQyxJQUFqQyxFQUF1Q0UsS0FBdkMsQ0FBUDtBQUNIOztBQUlEOzs7Ozs7OztPQVFPRyxRQUFQLGVBQXFDQyxDQUFyQyxFQUE2QztBQUN6QyxXQUFPLElBQUlOLElBQUosQ0FBU00sQ0FBQyxDQUFDQyxDQUFYLEVBQWNELENBQUMsQ0FBQ0UsQ0FBaEIsRUFBbUJGLENBQUMsQ0FBQ0csQ0FBckIsRUFBd0JILENBQUMsQ0FBQ0ksQ0FBMUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT0MsT0FBUCxjQUFnRVIsR0FBaEUsRUFBMEVHLENBQTFFLEVBQXVGO0FBQ25GSCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUUQsQ0FBQyxDQUFDQyxDQUFWO0FBQ0FKLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQVY7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFILENBQUMsQ0FBQ0csQ0FBVjtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUosQ0FBQyxDQUFDSSxDQUFWO0FBQ0EsV0FBT1AsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT1MsTUFBUCxhQUFtQ1QsR0FBbkMsRUFBNkNJLENBQTdDLEVBQXdEQyxDQUF4RCxFQUFtRUMsQ0FBbkUsRUFBOEVDLENBQTlFLEVBQXlGO0FBQ3JGUCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUUEsQ0FBUjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUEsQ0FBUjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUEsQ0FBUjtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUEsQ0FBUjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9VLFdBQVAsa0JBQXdDVixHQUF4QyxFQUFrRDtBQUM5Q0EsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVEsQ0FBUjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxDQUFSO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLENBQVI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsQ0FBUjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU9XLGFBQVAsb0JBQXFFWCxHQUFyRSxFQUErRUcsQ0FBL0UsRUFBMkZTLENBQTNGLEVBQXVHO0FBQ25HLFFBQU1DLEdBQUcsR0FBR0MsZ0JBQUtELEdBQUwsQ0FBU1YsQ0FBVCxFQUFZUyxDQUFaLENBQVo7O0FBQ0EsUUFBSUMsR0FBRyxHQUFHLENBQUMsUUFBWCxFQUFxQjtBQUNqQkMsc0JBQUtDLEtBQUwsQ0FBV0MsSUFBWCxFQUFpQkYsZ0JBQUtHLEtBQXRCLEVBQTZCZCxDQUE3Qjs7QUFDQSxVQUFJYSxJQUFJLENBQUNFLEdBQUwsS0FBYSxRQUFqQixFQUEyQjtBQUN2Qkosd0JBQUtDLEtBQUwsQ0FBV0MsSUFBWCxFQUFpQkYsZ0JBQUtLLEVBQXRCLEVBQTBCaEIsQ0FBMUI7QUFDSDs7QUFDRFcsc0JBQUtNLFNBQUwsQ0FBZUosSUFBZixFQUFxQkEsSUFBckI7O0FBQ0FuQixNQUFBQSxJQUFJLENBQUN3QixhQUFMLENBQW1CckIsR0FBbkIsRUFBd0JnQixJQUF4QixFQUE4Qk0sSUFBSSxDQUFDQyxFQUFuQztBQUNBLGFBQU92QixHQUFQO0FBQ0gsS0FSRCxNQVFPLElBQUlhLEdBQUcsR0FBRyxRQUFWLEVBQW9CO0FBQ3ZCYixNQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFSO0FBQ0FKLE1BQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQVI7QUFDQUwsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBUjtBQUNBTixNQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUSxDQUFSO0FBQ0EsYUFBT1AsR0FBUDtBQUNILEtBTk0sTUFNQTtBQUNIYyxzQkFBS0MsS0FBTCxDQUFXQyxJQUFYLEVBQWlCYixDQUFqQixFQUFvQlMsQ0FBcEI7O0FBQ0FaLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRWSxJQUFJLENBQUNaLENBQWI7QUFDQUosTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFXLElBQUksQ0FBQ1gsQ0FBYjtBQUNBTCxNQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUVUsSUFBSSxDQUFDVixDQUFiO0FBQ0FOLE1BQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRLElBQUlNLEdBQVo7QUFDQSxhQUFPaEIsSUFBSSxDQUFDdUIsU0FBTCxDQUFlcEIsR0FBZixFQUFvQkEsR0FBcEIsQ0FBUDtBQUNIO0FBQ0o7QUFFRDs7Ozs7Ozs7Ozs7OztPQVdPd0IsZUFBUCxzQkFBdUVDLE9BQXZFLEVBQXlGQyxDQUF6RixFQUFpRztBQUM3RixRQUFNQyxHQUFHLEdBQUdMLElBQUksQ0FBQ00sSUFBTCxDQUFVRixDQUFDLENBQUNuQixDQUFaLElBQWlCLEdBQTdCO0FBQ0EsUUFBTXNCLENBQUMsR0FBR1AsSUFBSSxDQUFDUSxHQUFMLENBQVNILEdBQUcsR0FBRyxHQUFmLENBQVY7O0FBQ0EsUUFBSUUsQ0FBQyxLQUFLLEdBQVYsRUFBZTtBQUNYSixNQUFBQSxPQUFPLENBQUNyQixDQUFSLEdBQVlzQixDQUFDLENBQUN0QixDQUFGLEdBQU15QixDQUFsQjtBQUNBSixNQUFBQSxPQUFPLENBQUNwQixDQUFSLEdBQVlxQixDQUFDLENBQUNyQixDQUFGLEdBQU13QixDQUFsQjtBQUNBSixNQUFBQSxPQUFPLENBQUNuQixDQUFSLEdBQVlvQixDQUFDLENBQUNwQixDQUFGLEdBQU11QixDQUFsQjtBQUNILEtBSkQsTUFJTztBQUNIO0FBQ0FKLE1BQUFBLE9BQU8sQ0FBQ3JCLENBQVIsR0FBWSxDQUFaO0FBQ0FxQixNQUFBQSxPQUFPLENBQUNwQixDQUFSLEdBQVksQ0FBWjtBQUNBb0IsTUFBQUEsT0FBTyxDQUFDbkIsQ0FBUixHQUFZLENBQVo7QUFDSDs7QUFDRCxXQUFPcUIsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzFCLFdBQVAsa0JBQW9HRCxHQUFwRyxFQUE4R0csQ0FBOUcsRUFBNkhTLENBQTdILEVBQTRJO0FBQ3hJbkIsSUFBQUEsRUFBRSxHQUFHVSxDQUFDLENBQUNDLENBQUYsR0FBTVEsQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNSLENBQXBCLEdBQXdCRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDTixDQUFoQyxHQUFvQ0gsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ1AsQ0FBakQ7QUFDQVgsSUFBQUEsRUFBRSxHQUFHUyxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNQLENBQXBCLEdBQXdCRixDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDUixDQUFoQyxHQUFvQ0QsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ04sQ0FBakQ7QUFDQVgsSUFBQUEsRUFBRSxHQUFHUSxDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNOLENBQXBCLEdBQXdCSCxDQUFDLENBQUNDLENBQUYsR0FBTVEsQ0FBQyxDQUFDUCxDQUFoQyxHQUFvQ0YsQ0FBQyxDQUFDRSxDQUFGLEdBQU1PLENBQUMsQ0FBQ1IsQ0FBakQ7QUFDQVIsSUFBQUEsRUFBRSxHQUFHTyxDQUFDLENBQUNJLENBQUYsR0FBTUssQ0FBQyxDQUFDTCxDQUFSLEdBQVlKLENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFDLENBQUNSLENBQXBCLEdBQXdCRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFoQyxHQUFvQ0YsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBakQ7QUFDQU4sSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFYLEVBQVI7QUFDQU8sSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFYLEVBQVI7QUFDQU0sSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFYLEVBQVI7QUFDQUssSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFYLEVBQVI7QUFDQSxXQUFPSSxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPK0IsaUJBQVAsd0JBQThDL0IsR0FBOUMsRUFBd0RHLENBQXhELEVBQWdFUyxDQUFoRSxFQUEyRTtBQUN2RVosSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFELENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFkO0FBQ0FaLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBZDtBQUNBWixJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUgsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQWQ7QUFDQVosSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFkO0FBQ0EsV0FBT1osR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT2dDLGNBQVAscUJBQTJDaEMsR0FBM0MsRUFBcURHLENBQXJELEVBQTZEUyxDQUE3RCxFQUFxRXFCLEtBQXJFLEVBQW9GO0FBQ2hGakMsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFELENBQUMsQ0FBQ0MsQ0FBRixHQUFNUSxDQUFDLENBQUNSLENBQUYsR0FBTTZCLEtBQXBCO0FBQ0FqQyxJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUYsQ0FBQyxDQUFDRSxDQUFGLEdBQU1PLENBQUMsQ0FBQ1AsQ0FBRixHQUFNNEIsS0FBcEI7QUFDQWpDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTixDQUFGLEdBQU0yQixLQUFwQjtBQUNBakMsSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQUYsR0FBTTBCLEtBQXBCO0FBQ0EsV0FBT2pDLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztPQVNPa0MsVUFBUCxpQkFBdUNsQyxHQUF2QyxFQUFpREcsQ0FBakQsRUFBeUR3QixHQUF6RCxFQUFzRTtBQUNsRUEsSUFBQUEsR0FBRyxJQUFJLEdBQVA7QUFFQSxRQUFNUSxFQUFFLEdBQUdiLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNNEIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNNkIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNOEIsRUFBekI7QUFDQW5DLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNK0IsRUFBekI7QUFDQSxXQUFPbkMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O09BU09zQyxVQUFQLGlCQUF1Q3RDLEdBQXZDLEVBQWlERyxDQUFqRCxFQUF5RHdCLEdBQXpELEVBQXNFO0FBQ2xFQSxJQUFBQSxHQUFHLElBQUksR0FBUDtBQUVBLFFBQU1ZLEVBQUUsR0FBR2pCLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNaUMsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNZ0MsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNbUMsRUFBekI7QUFDQXZDLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNa0MsRUFBekI7QUFDQSxXQUFPdkMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O09BU093QyxVQUFQLGlCQUF1Q3hDLEdBQXZDLEVBQWlERyxDQUFqRCxFQUF5RHdCLEdBQXpELEVBQXNFO0FBQ2xFQSxJQUFBQSxHQUFHLElBQUksR0FBUDtBQUVBLFFBQU1jLEVBQUUsR0FBR25CLElBQUksQ0FBQ1EsR0FBTCxDQUFTSCxHQUFULENBQVg7QUFDQSxRQUFNUyxFQUFFLEdBQUdkLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVg7QUFFQTNCLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWdDLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0UsQ0FBRixHQUFNb0MsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRRixDQUFDLENBQUNFLENBQUYsR0FBTStCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0MsQ0FBRixHQUFNcUMsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRSCxDQUFDLENBQUNHLENBQUYsR0FBTThCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0ksQ0FBRixHQUFNa0MsRUFBekI7QUFDQXpDLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTTZCLEVBQU4sR0FBV2pDLENBQUMsQ0FBQ0csQ0FBRixHQUFNbUMsRUFBekI7QUFDQSxXQUFPekMsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztPQVVPMEMsZUFBUCxzQkFBdUUxQyxHQUF2RSxFQUFpRjJDLEdBQWpGLEVBQTJGQyxJQUEzRixFQUEwR2pCLEdBQTFHLEVBQXVIO0FBQ25IO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNnRCxNQUFMLENBQVlDLElBQVosRUFBa0JILEdBQWxCOztBQUNBN0Isb0JBQUtpQyxhQUFMLENBQW1CL0IsSUFBbkIsRUFBeUI0QixJQUF6QixFQUErQkUsSUFBL0IsRUFIbUgsQ0FJbkg7OztBQUNBakQsSUFBQUEsSUFBSSxDQUFDd0IsYUFBTCxDQUFtQnlCLElBQW5CLEVBQXlCOUIsSUFBekIsRUFBK0JXLEdBQS9CO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBZCxFQUFtQjJDLEdBQW5CLEVBQXdCRyxJQUF4QjtBQUNBLFdBQU85QyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7O09BVU9nRCxvQkFBUCwyQkFBNEVoRCxHQUE1RSxFQUFzRjJDLEdBQXRGLEVBQWdHQyxJQUFoRyxFQUErR2pCLEdBQS9HLEVBQTRIO0FBQ3hIOUIsSUFBQUEsSUFBSSxDQUFDd0IsYUFBTCxDQUFtQnlCLElBQW5CLEVBQXlCRixJQUF6QixFQUErQmpCLEdBQS9CO0FBQ0E5QixJQUFBQSxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBZCxFQUFtQjJDLEdBQW5CLEVBQXdCRyxJQUF4QjtBQUNBLFdBQU85QyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPaUQsYUFBUCxvQkFBMENqRCxHQUExQyxFQUFvREcsQ0FBcEQsRUFBNEQ7QUFFeERILElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQVY7QUFDQUosSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFGLENBQUMsQ0FBQ0UsQ0FBVjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUUgsQ0FBQyxDQUFDRyxDQUFWO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRZSxJQUFJLENBQUM0QixJQUFMLENBQVU1QixJQUFJLENBQUM2QixHQUFMLENBQVMsTUFBTWhELENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQWQsR0FBa0JELENBQUMsQ0FBQ0UsQ0FBRixHQUFNRixDQUFDLENBQUNFLENBQTFCLEdBQThCRixDQUFDLENBQUNHLENBQUYsR0FBTUgsQ0FBQyxDQUFDRyxDQUEvQyxDQUFWLENBQVI7QUFDQSxXQUFPTixHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPYSxNQUFQLGFBQW1DVixDQUFuQyxFQUEyQ1MsQ0FBM0MsRUFBbUQ7QUFDL0MsV0FBT1QsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ1IsQ0FBUixHQUFZRCxDQUFDLENBQUNFLENBQUYsR0FBTU8sQ0FBQyxDQUFDUCxDQUFwQixHQUF3QkYsQ0FBQyxDQUFDRyxDQUFGLEdBQU1NLENBQUMsQ0FBQ04sQ0FBaEMsR0FBb0NILENBQUMsQ0FBQ0ksQ0FBRixHQUFNSyxDQUFDLENBQUNMLENBQW5EO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPNkMsT0FBUCxjQUFvQ3BELEdBQXBDLEVBQThDRyxDQUE5QyxFQUFzRFMsQ0FBdEQsRUFBOER5QyxDQUE5RCxFQUF5RTtBQUNyRXJELElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRRCxDQUFDLENBQUNDLENBQUYsR0FBTWlELENBQUMsSUFBSXpDLENBQUMsQ0FBQ1IsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVosQ0FBZjtBQUNBSixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUUYsQ0FBQyxDQUFDRSxDQUFGLEdBQU1nRCxDQUFDLElBQUl6QyxDQUFDLENBQUNQLENBQUYsR0FBTUYsQ0FBQyxDQUFDRSxDQUFaLENBQWY7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFILENBQUMsQ0FBQ0csQ0FBRixHQUFNK0MsQ0FBQyxJQUFJekMsQ0FBQyxDQUFDTixDQUFGLEdBQU1ILENBQUMsQ0FBQ0csQ0FBWixDQUFmO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTThDLENBQUMsSUFBSXpDLENBQUMsQ0FBQ0wsQ0FBRixHQUFNSixDQUFDLENBQUNJLENBQVosQ0FBZjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7T0FPT3NELFFBQVAsZUFDS3RELEdBREwsRUFDZUcsQ0FEZixFQUM4QlMsQ0FEOUIsRUFDNkN5QyxDQUQ3QyxFQUN3RDtBQUNwRDtBQUNBO0FBRUEsUUFBSUUsTUFBTSxHQUFHLENBQWI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsQ0FBYixDQUxvRCxDQU9wRDs7QUFDQSxRQUFJQyxLQUFLLEdBQUd0RCxDQUFDLENBQUNDLENBQUYsR0FBTVEsQ0FBQyxDQUFDUixDQUFSLEdBQVlELENBQUMsQ0FBQ0UsQ0FBRixHQUFNTyxDQUFDLENBQUNQLENBQXBCLEdBQXdCRixDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTixDQUFoQyxHQUFvQ0gsQ0FBQyxDQUFDSSxDQUFGLEdBQU1LLENBQUMsQ0FBQ0wsQ0FBeEQsQ0FSb0QsQ0FTcEQ7O0FBQ0EsUUFBSWtELEtBQUssR0FBRyxHQUFaLEVBQWlCO0FBQ2JBLE1BQUFBLEtBQUssR0FBRyxDQUFDQSxLQUFUO0FBQ0E3QyxNQUFBQSxDQUFDLENBQUNSLENBQUYsR0FBTSxDQUFDUSxDQUFDLENBQUNSLENBQVQ7QUFDQVEsTUFBQUEsQ0FBQyxDQUFDUCxDQUFGLEdBQU0sQ0FBQ08sQ0FBQyxDQUFDUCxDQUFUO0FBQ0FPLE1BQUFBLENBQUMsQ0FBQ04sQ0FBRixHQUFNLENBQUNNLENBQUMsQ0FBQ04sQ0FBVDtBQUNBTSxNQUFBQSxDQUFDLENBQUNMLENBQUYsR0FBTSxDQUFDSyxDQUFDLENBQUNMLENBQVQ7QUFDSCxLQWhCbUQsQ0FpQnBEOzs7QUFDQSxRQUFLLE1BQU1rRCxLQUFQLEdBQWdCLFFBQXBCLEVBQThCO0FBQzFCO0FBQ0EsVUFBTUMsS0FBSyxHQUFHcEMsSUFBSSxDQUFDTSxJQUFMLENBQVU2QixLQUFWLENBQWQ7QUFDQSxVQUFNRSxLQUFLLEdBQUdyQyxJQUFJLENBQUNRLEdBQUwsQ0FBUzRCLEtBQVQsQ0FBZDtBQUNBSCxNQUFBQSxNQUFNLEdBQUdqQyxJQUFJLENBQUNRLEdBQUwsQ0FBUyxDQUFDLE1BQU11QixDQUFQLElBQVlLLEtBQXJCLElBQThCQyxLQUF2QztBQUNBSCxNQUFBQSxNQUFNLEdBQUdsQyxJQUFJLENBQUNRLEdBQUwsQ0FBU3VCLENBQUMsR0FBR0ssS0FBYixJQUFzQkMsS0FBL0I7QUFDSCxLQU5ELE1BTU87QUFDSDtBQUNBO0FBQ0FKLE1BQUFBLE1BQU0sR0FBRyxNQUFNRixDQUFmO0FBQ0FHLE1BQUFBLE1BQU0sR0FBR0gsQ0FBVDtBQUNILEtBN0JtRCxDQThCcEQ7OztBQUNBckQsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFtRCxNQUFNLEdBQUdwRCxDQUFDLENBQUNDLENBQVgsR0FBZW9ELE1BQU0sR0FBRzVDLENBQUMsQ0FBQ1IsQ0FBbEM7QUFDQUosSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFrRCxNQUFNLEdBQUdwRCxDQUFDLENBQUNFLENBQVgsR0FBZW1ELE1BQU0sR0FBRzVDLENBQUMsQ0FBQ1AsQ0FBbEM7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFpRCxNQUFNLEdBQUdwRCxDQUFDLENBQUNHLENBQVgsR0FBZWtELE1BQU0sR0FBRzVDLENBQUMsQ0FBQ04sQ0FBbEM7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFnRCxNQUFNLEdBQUdwRCxDQUFDLENBQUNJLENBQVgsR0FBZWlELE1BQU0sR0FBRzVDLENBQUMsQ0FBQ0wsQ0FBbEM7QUFFQSxXQUFPUCxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPNEQsU0FBUCxnQkFBc0M1RCxHQUF0QyxFQUFnREcsQ0FBaEQsRUFBd0RTLENBQXhELEVBQWdFaUQsQ0FBaEUsRUFBd0VDLENBQXhFLEVBQWdGVCxDQUFoRixFQUEyRjtBQUN2RnhELElBQUFBLElBQUksQ0FBQ3lELEtBQUwsQ0FBV1IsSUFBWCxFQUFpQjNDLENBQWpCLEVBQW9CMkQsQ0FBcEIsRUFBdUJULENBQXZCO0FBQ0F4RCxJQUFBQSxJQUFJLENBQUN5RCxLQUFMLENBQVdTLElBQVgsRUFBaUJuRCxDQUFqQixFQUFvQmlELENBQXBCLEVBQXVCUixDQUF2QjtBQUNBeEQsSUFBQUEsSUFBSSxDQUFDeUQsS0FBTCxDQUFXdEQsR0FBWCxFQUFnQjhDLElBQWhCLEVBQXNCaUIsSUFBdEIsRUFBNEIsSUFBSVYsQ0FBSixJQUFTLElBQUlBLENBQWIsQ0FBNUI7QUFDQSxXQUFPckQsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzZDLFNBQVAsZ0JBQWtFN0MsR0FBbEUsRUFBNEVHLENBQTVFLEVBQXlGO0FBQ3JGLFFBQU1VLEdBQUcsR0FBR1YsQ0FBQyxDQUFDQyxDQUFGLEdBQU1ELENBQUMsQ0FBQ0MsQ0FBUixHQUFZRCxDQUFDLENBQUNFLENBQUYsR0FBTUYsQ0FBQyxDQUFDRSxDQUFwQixHQUF3QkYsQ0FBQyxDQUFDRyxDQUFGLEdBQU1ILENBQUMsQ0FBQ0csQ0FBaEMsR0FBb0NILENBQUMsQ0FBQ0ksQ0FBRixHQUFNSixDQUFDLENBQUNJLENBQXhEO0FBQ0EsUUFBTXlELE1BQU0sR0FBR25ELEdBQUcsR0FBRyxNQUFNQSxHQUFULEdBQWUsQ0FBakMsQ0FGcUYsQ0FJckY7O0FBRUFiLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLENBQUNELENBQUMsQ0FBQ0MsQ0FBSCxHQUFPNEQsTUFBZjtBQUNBaEUsSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVEsQ0FBQ0YsQ0FBQyxDQUFDRSxDQUFILEdBQU8yRCxNQUFmO0FBQ0FoRSxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUSxDQUFDSCxDQUFDLENBQUNHLENBQUgsR0FBTzBELE1BQWY7QUFDQWhFLElBQUFBLEdBQUcsQ0FBQ08sQ0FBSixHQUFRSixDQUFDLENBQUNJLENBQUYsR0FBTXlELE1BQWQ7QUFDQSxXQUFPaEUsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT2lFLFlBQVAsbUJBQXlDakUsR0FBekMsRUFBbURHLENBQW5ELEVBQTJEO0FBQ3ZESCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUSxDQUFDRCxDQUFDLENBQUNDLENBQVg7QUFDQUosSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVEsQ0FBQ0YsQ0FBQyxDQUFDRSxDQUFYO0FBQ0FMLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRLENBQUNILENBQUMsQ0FBQ0csQ0FBWDtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUUosQ0FBQyxDQUFDSSxDQUFWO0FBQ0EsV0FBT1AsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT2tFLE1BQVAsYUFBbUMvRCxDQUFuQyxFQUEyQztBQUN2QyxXQUFPbUIsSUFBSSxDQUFDNEIsSUFBTCxDQUFVL0MsQ0FBQyxDQUFDQyxDQUFGLEdBQU1ELENBQUMsQ0FBQ0MsQ0FBUixHQUFZRCxDQUFDLENBQUNFLENBQUYsR0FBTUYsQ0FBQyxDQUFDRSxDQUFwQixHQUF3QkYsQ0FBQyxDQUFDRyxDQUFGLEdBQU1ILENBQUMsQ0FBQ0csQ0FBaEMsR0FBb0NILENBQUMsQ0FBQ0ksQ0FBRixHQUFNSixDQUFDLENBQUNJLENBQXRELENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU80RCxZQUFQLG1CQUF5Q2hFLENBQXpDLEVBQWlEO0FBQzdDLFdBQU9BLENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVIsR0FBWUQsQ0FBQyxDQUFDRSxDQUFGLEdBQU1GLENBQUMsQ0FBQ0UsQ0FBcEIsR0FBd0JGLENBQUMsQ0FBQ0csQ0FBRixHQUFNSCxDQUFDLENBQUNHLENBQWhDLEdBQW9DSCxDQUFDLENBQUNJLENBQUYsR0FBTUosQ0FBQyxDQUFDSSxDQUFuRDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT2EsWUFBUCxtQkFBeUNwQixHQUF6QyxFQUFtREcsQ0FBbkQsRUFBMkQ7QUFDdkQsUUFBSStELEdBQUcsR0FBRy9ELENBQUMsQ0FBQ0MsQ0FBRixHQUFNRCxDQUFDLENBQUNDLENBQVIsR0FBWUQsQ0FBQyxDQUFDRSxDQUFGLEdBQU1GLENBQUMsQ0FBQ0UsQ0FBcEIsR0FBd0JGLENBQUMsQ0FBQ0csQ0FBRixHQUFNSCxDQUFDLENBQUNHLENBQWhDLEdBQW9DSCxDQUFDLENBQUNJLENBQUYsR0FBTUosQ0FBQyxDQUFDSSxDQUF0RDs7QUFDQSxRQUFJMkQsR0FBRyxHQUFHLENBQVYsRUFBYTtBQUNUQSxNQUFBQSxHQUFHLEdBQUcsSUFBSTVDLElBQUksQ0FBQzRCLElBQUwsQ0FBVWdCLEdBQVYsQ0FBVjtBQUNBbEUsTUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVFELENBQUMsQ0FBQ0MsQ0FBRixHQUFNOEQsR0FBZDtBQUNBbEUsTUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFGLENBQUMsQ0FBQ0UsQ0FBRixHQUFNNkQsR0FBZDtBQUNBbEUsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFILENBQUMsQ0FBQ0csQ0FBRixHQUFNNEQsR0FBZDtBQUNBbEUsTUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFKLENBQUMsQ0FBQ0ksQ0FBRixHQUFNMkQsR0FBZDtBQUNIOztBQUNELFdBQU9sRSxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPb0UsV0FBUCxrQkFBbUVwRSxHQUFuRSxFQUE2RXFFLEtBQTdFLEVBQTZGQyxLQUE3RixFQUE2R0MsS0FBN0csRUFBNkg7QUFDekhDLG9CQUFLL0QsR0FBTCxDQUFTZ0UsSUFBVCxFQUNJSixLQUFLLENBQUNqRSxDQURWLEVBQ2FpRSxLQUFLLENBQUNoRSxDQURuQixFQUNzQmdFLEtBQUssQ0FBQy9ELENBRDVCLEVBRUlnRSxLQUFLLENBQUNsRSxDQUZWLEVBRWFrRSxLQUFLLENBQUNqRSxDQUZuQixFQUVzQmlFLEtBQUssQ0FBQ2hFLENBRjVCLEVBR0lpRSxLQUFLLENBQUNuRSxDQUhWLEVBR2FtRSxLQUFLLENBQUNsRSxDQUhuQixFQUdzQmtFLEtBQUssQ0FBQ2pFLENBSDVCOztBQUtBLFdBQU9ULElBQUksQ0FBQ3VCLFNBQUwsQ0FBZXBCLEdBQWYsRUFBb0JILElBQUksQ0FBQzZFLFFBQUwsQ0FBYzFFLEdBQWQsRUFBbUJ5RSxJQUFuQixDQUFwQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7O09BVU9FLGFBQVAsb0JBQTBDM0UsR0FBMUMsRUFBb0Q0RSxJQUFwRCxFQUFnRUMsRUFBaEUsRUFBMkU7QUFDdkVMLG9CQUFLRyxVQUFMLENBQWdCRixJQUFoQixFQUFzQkcsSUFBdEIsRUFBNEJDLEVBQTVCOztBQUNBLFdBQU9oRixJQUFJLENBQUN1QixTQUFMLENBQWVwQixHQUFmLEVBQW9CSCxJQUFJLENBQUM2RSxRQUFMLENBQWMxRSxHQUFkLEVBQW1CeUUsSUFBbkIsQ0FBcEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRT3BELGdCQUFQLHVCQUF3RXJCLEdBQXhFLEVBQWtGNEMsSUFBbEYsRUFBaUdqQixHQUFqRyxFQUE4RztBQUMxR0EsSUFBQUEsR0FBRyxHQUFHQSxHQUFHLEdBQUcsR0FBWjtBQUNBLFFBQU1FLENBQUMsR0FBR1AsSUFBSSxDQUFDUSxHQUFMLENBQVNILEdBQVQsQ0FBVjtBQUNBM0IsSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVF5QixDQUFDLEdBQUdlLElBQUksQ0FBQ3hDLENBQWpCO0FBQ0FKLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRd0IsQ0FBQyxHQUFHZSxJQUFJLENBQUN2QyxDQUFqQjtBQUNBTCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUXVCLENBQUMsR0FBR2UsSUFBSSxDQUFDdEMsQ0FBakI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVFlLElBQUksQ0FBQ2UsR0FBTCxDQUFTVixHQUFULENBQVI7QUFDQSxXQUFPM0IsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzhFLGFBQVAsb0JBQW1COUUsR0FBbkIsRUFBOEJNLENBQTlCLEVBQStDO0FBQzNDQSxJQUFBQSxDQUFDLElBQUl5RSxTQUFMO0FBQ0EvRSxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUUosR0FBRyxDQUFDSyxDQUFKLEdBQVEsQ0FBaEI7QUFDQUwsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVFnQixJQUFJLENBQUNRLEdBQUwsQ0FBU3hCLENBQVQsQ0FBUjtBQUNBTixJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUWUsSUFBSSxDQUFDZSxHQUFMLENBQVMvQixDQUFULENBQVI7QUFDQSxXQUFPTixHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPMEUsV0FBUCxrQkFBd0MxRSxHQUF4QyxFQUFrRGdGLEdBQWxELEVBQTZEO0FBQ3pELFFBQUlDLENBQUMsR0FBR0QsR0FBRyxDQUFDQyxDQUFaO0FBQ0EsUUFBSUMsR0FBRyxHQUFHRCxDQUFDLENBQUMsQ0FBRCxDQUFYO0FBQUEsUUFBZ0JFLEdBQUcsR0FBR0YsQ0FBQyxDQUFDLENBQUQsQ0FBdkI7QUFBQSxRQUE0QkcsR0FBRyxHQUFHSCxDQUFDLENBQUMsQ0FBRCxDQUFuQztBQUFBLFFBQ0lJLEdBQUcsR0FBR0osQ0FBQyxDQUFDLENBQUQsQ0FEWDtBQUFBLFFBQ2dCSyxHQUFHLEdBQUdMLENBQUMsQ0FBQyxDQUFELENBRHZCO0FBQUEsUUFDNEJNLEdBQUcsR0FBR04sQ0FBQyxDQUFDLENBQUQsQ0FEbkM7QUFBQSxRQUVJTyxHQUFHLEdBQUdQLENBQUMsQ0FBQyxDQUFELENBRlg7QUFBQSxRQUVnQlEsR0FBRyxHQUFHUixDQUFDLENBQUMsQ0FBRCxDQUZ2QjtBQUFBLFFBRTRCUyxHQUFHLEdBQUdULENBQUMsQ0FBQyxDQUFELENBRm5DO0FBSUEsUUFBTVUsS0FBSyxHQUFHVCxHQUFHLEdBQUdJLEdBQU4sR0FBWUksR0FBMUI7O0FBRUEsUUFBSUMsS0FBSyxHQUFHLENBQVosRUFBZTtBQUNYLFVBQU05RCxDQUFDLEdBQUcsTUFBTVAsSUFBSSxDQUFDNEIsSUFBTCxDQUFVeUMsS0FBSyxHQUFHLEdBQWxCLENBQWhCO0FBRUEzRixNQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUSxPQUFPc0IsQ0FBZjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVEsQ0FBQ21GLEdBQUcsR0FBR0UsR0FBUCxJQUFjNUQsQ0FBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLENBQUNtRixHQUFHLEdBQUdKLEdBQVAsSUFBY3ZELENBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUSxDQUFDNkUsR0FBRyxHQUFHRSxHQUFQLElBQWN4RCxDQUF0QjtBQUVILEtBUkQsTUFRTyxJQUFLcUQsR0FBRyxHQUFHSSxHQUFQLElBQWdCSixHQUFHLEdBQUdRLEdBQTFCLEVBQWdDO0FBQ25DLFVBQU03RCxFQUFDLEdBQUcsTUFBTVAsSUFBSSxDQUFDNEIsSUFBTCxDQUFVLE1BQU1nQyxHQUFOLEdBQVlJLEdBQVosR0FBa0JJLEdBQTVCLENBQWhCOztBQUVBMUYsTUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsQ0FBQ2dGLEdBQUcsR0FBR0UsR0FBUCxJQUFjNUQsRUFBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLE9BQU95QixFQUFmO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxDQUFDZ0YsR0FBRyxHQUFHRixHQUFQLElBQWN0RCxFQUF0QjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBQ2tGLEdBQUcsR0FBR0osR0FBUCxJQUFjdkQsRUFBdEI7QUFFSCxLQVJNLE1BUUEsSUFBSXlELEdBQUcsR0FBR0ksR0FBVixFQUFlO0FBQ2xCLFVBQU03RCxHQUFDLEdBQUcsTUFBTVAsSUFBSSxDQUFDNEIsSUFBTCxDQUFVLE1BQU1vQyxHQUFOLEdBQVlKLEdBQVosR0FBa0JRLEdBQTVCLENBQWhCOztBQUVBMUYsTUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsQ0FBQ2lGLEdBQUcsR0FBR0osR0FBUCxJQUFjdkQsR0FBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLENBQUNpRixHQUFHLEdBQUdGLEdBQVAsSUFBY3RELEdBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxPQUFPd0IsR0FBZjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsQ0FBQ21GLEdBQUcsR0FBR0YsR0FBUCxJQUFjMUQsR0FBdEI7QUFFSCxLQVJNLE1BUUE7QUFDSCxVQUFNQSxHQUFDLEdBQUcsTUFBTVAsSUFBSSxDQUFDNEIsSUFBTCxDQUFVLE1BQU13QyxHQUFOLEdBQVlSLEdBQVosR0FBa0JJLEdBQTVCLENBQWhCOztBQUVBdEYsTUFBQUEsR0FBRyxDQUFDTyxDQUFKLEdBQVEsQ0FBQzRFLEdBQUcsR0FBR0UsR0FBUCxJQUFjeEQsR0FBdEI7QUFDQTdCLE1BQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRLENBQUNvRixHQUFHLEdBQUdKLEdBQVAsSUFBY3ZELEdBQXRCO0FBQ0E3QixNQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUSxDQUFDb0YsR0FBRyxHQUFHRixHQUFQLElBQWMxRCxHQUF0QjtBQUNBN0IsTUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVEsT0FBT3VCLEdBQWY7QUFDSDs7QUFFRCxXQUFPN0IsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzRGLFlBQVAsbUJBQXlDNUYsR0FBekMsRUFBbURJLENBQW5ELEVBQThEQyxDQUE5RCxFQUF5RUMsQ0FBekUsRUFBb0Y7QUFDaEZGLElBQUFBLENBQUMsSUFBSTJFLFNBQUw7QUFDQTFFLElBQUFBLENBQUMsSUFBSTBFLFNBQUw7QUFDQXpFLElBQUFBLENBQUMsSUFBSXlFLFNBQUw7QUFFQSxRQUFNYyxFQUFFLEdBQUd2RSxJQUFJLENBQUNRLEdBQUwsQ0FBUzFCLENBQVQsQ0FBWDtBQUNBLFFBQU0wRixFQUFFLEdBQUd4RSxJQUFJLENBQUNlLEdBQUwsQ0FBU2pDLENBQVQsQ0FBWDtBQUNBLFFBQU0yRixFQUFFLEdBQUd6RSxJQUFJLENBQUNRLEdBQUwsQ0FBU3pCLENBQVQsQ0FBWDtBQUNBLFFBQU0yRixFQUFFLEdBQUcxRSxJQUFJLENBQUNlLEdBQUwsQ0FBU2hDLENBQVQsQ0FBWDtBQUNBLFFBQU00RixFQUFFLEdBQUczRSxJQUFJLENBQUNRLEdBQUwsQ0FBU3hCLENBQVQsQ0FBWDtBQUNBLFFBQU00RixFQUFFLEdBQUc1RSxJQUFJLENBQUNlLEdBQUwsQ0FBUy9CLENBQVQsQ0FBWDtBQUVBTixJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUXlGLEVBQUUsR0FBR0csRUFBTCxHQUFVRSxFQUFWLEdBQWVKLEVBQUUsR0FBR0MsRUFBTCxHQUFVRSxFQUFqQztBQUNBakcsSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVF5RixFQUFFLEdBQUdDLEVBQUwsR0FBVUcsRUFBVixHQUFlTCxFQUFFLEdBQUdHLEVBQUwsR0FBVUMsRUFBakM7QUFDQWpHLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRd0YsRUFBRSxHQUFHRSxFQUFMLEdBQVVDLEVBQVYsR0FBZUosRUFBRSxHQUFHRSxFQUFMLEdBQVVHLEVBQWpDO0FBQ0FsRyxJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUXVGLEVBQUUsR0FBR0UsRUFBTCxHQUFVRSxFQUFWLEdBQWVMLEVBQUUsR0FBR0UsRUFBTCxHQUFVRSxFQUFqQztBQUVBLFdBQU9qRyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPbUcsVUFBUCxpQkFBa0VuRyxHQUFsRSxFQUFnRjBCLENBQWhGLEVBQXdGO0FBQ3BGLFFBQU0wRSxFQUFFLEdBQUcsTUFBTTFFLENBQUMsQ0FBQ3JCLENBQW5CO0FBQ0EsUUFBTWdHLEVBQUUsR0FBRyxNQUFNM0UsQ0FBQyxDQUFDcEIsQ0FBbkI7QUFDQU4sSUFBQUEsR0FBRyxDQUFDSSxDQUFKLEdBQVEsTUFBTWdHLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ3JCLENBQWIsR0FBaUJnRyxFQUFFLEdBQUczRSxDQUFDLENBQUNwQixDQUFoQztBQUNBTixJQUFBQSxHQUFHLENBQUNLLENBQUosR0FBUStGLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ3RCLENBQVAsR0FBV2lHLEVBQUUsR0FBRzNFLENBQUMsQ0FBQ25CLENBQTFCO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRK0YsRUFBRSxHQUFHM0UsQ0FBQyxDQUFDdEIsQ0FBUCxHQUFXZ0csRUFBRSxHQUFHMUUsQ0FBQyxDQUFDbkIsQ0FBMUI7QUFFQSxXQUFPUCxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPc0csVUFBUCxpQkFBa0V0RyxHQUFsRSxFQUFnRjBCLENBQWhGLEVBQXdGO0FBQ3BGLFFBQU02RSxFQUFFLEdBQUcsTUFBTTdFLENBQUMsQ0FBQ3RCLENBQW5CO0FBQ0EsUUFBTWdHLEVBQUUsR0FBRyxNQUFNMUUsQ0FBQyxDQUFDckIsQ0FBbkI7QUFDQSxRQUFNZ0csRUFBRSxHQUFHLE1BQU0zRSxDQUFDLENBQUNwQixDQUFuQjtBQUNBTixJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUWdHLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ3RCLENBQVAsR0FBV2lHLEVBQUUsR0FBRzNFLENBQUMsQ0FBQ25CLENBQTFCO0FBQ0FQLElBQUFBLEdBQUcsQ0FBQ0ssQ0FBSixHQUFRLE1BQU1rRyxFQUFFLEdBQUc3RSxDQUFDLENBQUN0QixDQUFiLEdBQWlCaUcsRUFBRSxHQUFHM0UsQ0FBQyxDQUFDcEIsQ0FBaEM7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVErRixFQUFFLEdBQUczRSxDQUFDLENBQUNyQixDQUFQLEdBQVdrRyxFQUFFLEdBQUc3RSxDQUFDLENBQUNuQixDQUExQjtBQUVBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUU93RyxVQUFQLGlCQUFrRXhHLEdBQWxFLEVBQWdGMEIsQ0FBaEYsRUFBd0Y7QUFDcEYsUUFBTTZFLEVBQUUsR0FBRyxNQUFNN0UsQ0FBQyxDQUFDdEIsQ0FBbkI7QUFDQSxRQUFNZ0csRUFBRSxHQUFHLE1BQU0xRSxDQUFDLENBQUNyQixDQUFuQjtBQUNBLFFBQU1nRyxFQUFFLEdBQUcsTUFBTTNFLENBQUMsQ0FBQ3BCLENBQW5CO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRaUcsRUFBRSxHQUFHM0UsQ0FBQyxDQUFDdEIsQ0FBUCxHQUFXZ0csRUFBRSxHQUFHMUUsQ0FBQyxDQUFDbkIsQ0FBMUI7QUFDQVAsSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVFnRyxFQUFFLEdBQUczRSxDQUFDLENBQUNyQixDQUFQLEdBQVdrRyxFQUFFLEdBQUc3RSxDQUFDLENBQUNuQixDQUExQjtBQUNBUCxJQUFBQSxHQUFHLENBQUNNLENBQUosR0FBUSxNQUFNaUcsRUFBRSxHQUFHN0UsQ0FBQyxDQUFDdEIsQ0FBYixHQUFpQmdHLEVBQUUsR0FBRzFFLENBQUMsQ0FBQ3JCLENBQWhDO0FBRUEsV0FBT0wsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O09BU095RyxVQUFQLGlCQUF1Q3pHLEdBQXZDLEVBQWlEMEIsQ0FBakQsRUFBK0RnRixNQUEvRCxFQUFpRjtBQUFBLFFBQ3JFdEcsQ0FEcUUsR0FDdERzQixDQURzRCxDQUNyRXRCLENBRHFFO0FBQUEsUUFDbEVDLENBRGtFLEdBQ3REcUIsQ0FEc0QsQ0FDbEVyQixDQURrRTtBQUFBLFFBQy9EQyxDQUQrRCxHQUN0RG9CLENBRHNELENBQy9EcEIsQ0FEK0Q7QUFBQSxRQUM1REMsQ0FENEQsR0FDdERtQixDQURzRCxDQUM1RG5CLENBRDREO0FBRTdFLFFBQUlvRyxJQUFJLEdBQUcsQ0FBWDtBQUNBLFFBQUlDLE9BQU8sR0FBRyxDQUFkO0FBQ0EsUUFBSUMsUUFBUSxHQUFHLENBQWY7QUFDQSxRQUFNQyxJQUFJLEdBQUcxRyxDQUFDLEdBQUdDLENBQUosR0FBUUMsQ0FBQyxHQUFHQyxDQUF6Qjs7QUFDQSxRQUFJdUcsSUFBSSxHQUFHLFFBQVgsRUFBcUI7QUFDakJILE1BQUFBLElBQUksR0FBRyxDQUFQLENBRGlCLENBQ1A7O0FBQ1ZDLE1BQUFBLE9BQU8sR0FBRyxxQkFBUyxJQUFJdEYsSUFBSSxDQUFDeUYsS0FBTCxDQUFXM0csQ0FBWCxFQUFjRyxDQUFkLENBQWIsQ0FBVjtBQUNBc0csTUFBQUEsUUFBUSxHQUFHLEVBQVg7QUFDSCxLQUpELE1BSU8sSUFBSUMsSUFBSSxHQUFHLENBQUMsUUFBWixFQUFzQjtBQUN6QkgsTUFBQUEsSUFBSSxHQUFHLENBQVAsQ0FEeUIsQ0FDZjs7QUFDVkMsTUFBQUEsT0FBTyxHQUFHLENBQUMscUJBQVMsSUFBSXRGLElBQUksQ0FBQ3lGLEtBQUwsQ0FBVzNHLENBQVgsRUFBY0csQ0FBZCxDQUFiLENBQVg7QUFDQXNHLE1BQUFBLFFBQVEsR0FBRyxDQUFDLEVBQVo7QUFDSCxLQUpNLE1BSUE7QUFDSCxVQUFNRyxHQUFHLEdBQUc1RyxDQUFDLEdBQUdBLENBQWhCO0FBQ0EsVUFBTTZHLEdBQUcsR0FBRzVHLENBQUMsR0FBR0EsQ0FBaEI7QUFDQSxVQUFNNkcsR0FBRyxHQUFHNUcsQ0FBQyxHQUFHQSxDQUFoQjtBQUNBcUcsTUFBQUEsSUFBSSxHQUFHLHFCQUFTckYsSUFBSSxDQUFDeUYsS0FBTCxDQUFXLElBQUkzRyxDQUFKLEdBQVFHLENBQVIsR0FBWSxJQUFJRixDQUFKLEdBQVFDLENBQS9CLEVBQWtDLElBQUksSUFBSTBHLEdBQVIsR0FBYyxJQUFJRSxHQUFwRCxDQUFULENBQVA7QUFDQU4sTUFBQUEsT0FBTyxHQUFHLHFCQUFTdEYsSUFBSSxDQUFDeUYsS0FBTCxDQUFXLElBQUkxRyxDQUFKLEdBQVFFLENBQVIsR0FBWSxJQUFJSCxDQUFKLEdBQVFFLENBQS9CLEVBQWtDLElBQUksSUFBSTJHLEdBQVIsR0FBYyxJQUFJQyxHQUFwRCxDQUFULENBQVY7QUFDQUwsTUFBQUEsUUFBUSxHQUFHLHFCQUFTdkYsSUFBSSxDQUFDNkYsSUFBTCxDQUFVLElBQUlMLElBQWQsQ0FBVCxDQUFYOztBQUNBLFVBQUlKLE1BQUosRUFBWTtBQUNSQyxRQUFBQSxJQUFJLEdBQUcsQ0FBQyxHQUFELEdBQU9yRixJQUFJLENBQUM4RixJQUFMLENBQVVULElBQUksR0FBRyxJQUFqQixDQUFQLEdBQWdDQSxJQUF2QztBQUNBQyxRQUFBQSxPQUFPLEdBQUcsQ0FBQyxHQUFELEdBQU90RixJQUFJLENBQUM4RixJQUFMLENBQVVSLE9BQU8sR0FBRyxJQUFwQixDQUFQLEdBQW1DQSxPQUE3QztBQUNBQyxRQUFBQSxRQUFRLEdBQUcsTUFBTXZGLElBQUksQ0FBQzhGLElBQUwsQ0FBVVAsUUFBUSxHQUFHLElBQXJCLENBQU4sR0FBbUNBLFFBQTlDO0FBQ0g7QUFDSjs7QUFDRDdHLElBQUFBLEdBQUcsQ0FBQ0ksQ0FBSixHQUFRdUcsSUFBUjtBQUFjM0csSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVF1RyxPQUFSO0FBQWlCNUcsSUFBQUEsR0FBRyxDQUFDTSxDQUFKLEdBQVF1RyxRQUFSO0FBQy9CLFdBQU83RyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPcUgsZUFBUCxzQkFBNENsSCxDQUE1QyxFQUFvRFMsQ0FBcEQsRUFBNEQ7QUFDeEQsV0FBT1QsQ0FBQyxDQUFDQyxDQUFGLEtBQVFRLENBQUMsQ0FBQ1IsQ0FBVixJQUFlRCxDQUFDLENBQUNFLENBQUYsS0FBUU8sQ0FBQyxDQUFDUCxDQUF6QixJQUE4QkYsQ0FBQyxDQUFDRyxDQUFGLEtBQVFNLENBQUMsQ0FBQ04sQ0FBeEMsSUFBNkNILENBQUMsQ0FBQ0ksQ0FBRixLQUFRSyxDQUFDLENBQUNMLENBQTlEO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPK0csU0FBUCxnQkFBc0NuSCxDQUF0QyxFQUE4Q1MsQ0FBOUMsRUFBc0QyRyxPQUF0RCxFQUF5RTtBQUFBLFFBQW5CQSxPQUFtQjtBQUFuQkEsTUFBQUEsT0FBbUIsR0FBVEMsY0FBUztBQUFBOztBQUNyRSxXQUFRbEcsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDQyxDQUFGLEdBQU1RLENBQUMsQ0FBQ1IsQ0FBakIsS0FBdUJtSCxPQUFPLEdBQUdqRyxJQUFJLENBQUNtRyxHQUFMLENBQVMsR0FBVCxFQUFjbkcsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDQyxDQUFYLENBQWQsRUFBNkJrQixJQUFJLENBQUM2QixHQUFMLENBQVN2QyxDQUFDLENBQUNSLENBQVgsQ0FBN0IsQ0FBakMsSUFDSmtCLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0UsQ0FBRixHQUFNTyxDQUFDLENBQUNQLENBQWpCLEtBQXVCa0gsT0FBTyxHQUFHakcsSUFBSSxDQUFDbUcsR0FBTCxDQUFTLEdBQVQsRUFBY25HLElBQUksQ0FBQzZCLEdBQUwsQ0FBU2hELENBQUMsQ0FBQ0UsQ0FBWCxDQUFkLEVBQTZCaUIsSUFBSSxDQUFDNkIsR0FBTCxDQUFTdkMsQ0FBQyxDQUFDUCxDQUFYLENBQTdCLENBRDdCLElBRUppQixJQUFJLENBQUM2QixHQUFMLENBQVNoRCxDQUFDLENBQUNHLENBQUYsR0FBTU0sQ0FBQyxDQUFDTixDQUFqQixLQUF1QmlILE9BQU8sR0FBR2pHLElBQUksQ0FBQ21HLEdBQUwsQ0FBUyxHQUFULEVBQWNuRyxJQUFJLENBQUM2QixHQUFMLENBQVNoRCxDQUFDLENBQUNHLENBQVgsQ0FBZCxFQUE2QmdCLElBQUksQ0FBQzZCLEdBQUwsQ0FBU3ZDLENBQUMsQ0FBQ04sQ0FBWCxDQUE3QixDQUY3QixJQUdKZ0IsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDSSxDQUFGLEdBQU1LLENBQUMsQ0FBQ0wsQ0FBakIsS0FBdUJnSCxPQUFPLEdBQUdqRyxJQUFJLENBQUNtRyxHQUFMLENBQVMsR0FBVCxFQUFjbkcsSUFBSSxDQUFDNkIsR0FBTCxDQUFTaEQsQ0FBQyxDQUFDSSxDQUFYLENBQWQsRUFBNkJlLElBQUksQ0FBQzZCLEdBQUwsQ0FBU3ZDLENBQUMsQ0FBQ0wsQ0FBWCxDQUE3QixDQUhyQztBQUlIO0FBR0Q7Ozs7Ozs7Ozs7O09BU09tSCxVQUFQLGlCQUF5RDFILEdBQXpELEVBQW1FMEIsQ0FBbkUsRUFBaUZpRyxHQUFqRixFQUEwRjtBQUFBLFFBQVRBLEdBQVM7QUFBVEEsTUFBQUEsR0FBUyxHQUFILENBQUc7QUFBQTs7QUFDdEYzSCxJQUFBQSxHQUFHLENBQUMySCxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVqRyxDQUFDLENBQUN0QixDQUFqQjtBQUNBSixJQUFBQSxHQUFHLENBQUMySCxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVqRyxDQUFDLENBQUNyQixDQUFqQjtBQUNBTCxJQUFBQSxHQUFHLENBQUMySCxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVqRyxDQUFDLENBQUNwQixDQUFqQjtBQUNBTixJQUFBQSxHQUFHLENBQUMySCxHQUFHLEdBQUcsQ0FBUCxDQUFILEdBQWVqRyxDQUFDLENBQUNuQixDQUFqQjtBQUNBLFdBQU9QLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztPQVNPNEgsWUFBUCxtQkFBMEM1SCxHQUExQyxFQUFvRDZILEdBQXBELEVBQXFGRixHQUFyRixFQUE4RjtBQUFBLFFBQVRBLEdBQVM7QUFBVEEsTUFBQUEsR0FBUyxHQUFILENBQUc7QUFBQTs7QUFDMUYzSCxJQUFBQSxHQUFHLENBQUNJLENBQUosR0FBUXlILEdBQUcsQ0FBQ0YsR0FBRyxHQUFHLENBQVAsQ0FBWDtBQUNBM0gsSUFBQUEsR0FBRyxDQUFDSyxDQUFKLEdBQVF3SCxHQUFHLENBQUNGLEdBQUcsR0FBRyxDQUFQLENBQVg7QUFDQTNILElBQUFBLEdBQUcsQ0FBQ00sQ0FBSixHQUFRdUgsR0FBRyxDQUFDRixHQUFHLEdBQUcsQ0FBUCxDQUFYO0FBQ0EzSCxJQUFBQSxHQUFHLENBQUNPLENBQUosR0FBUXNILEdBQUcsQ0FBQ0YsR0FBRyxHQUFHLENBQVAsQ0FBWDtBQUNBLFdBQU8zSCxHQUFQO0FBQ0g7QUFHRDs7Ozs7QUFpQkEsZ0JBQWFJLENBQWIsRUFBbUNDLENBQW5DLEVBQWtEQyxDQUFsRCxFQUFpRUMsQ0FBakUsRUFBZ0Y7QUFBQTs7QUFBQSxRQUFuRUgsQ0FBbUU7QUFBbkVBLE1BQUFBLENBQW1FLEdBQWhELENBQWdEO0FBQUE7O0FBQUEsUUFBN0NDLENBQTZDO0FBQTdDQSxNQUFBQSxDQUE2QyxHQUFqQyxDQUFpQztBQUFBOztBQUFBLFFBQTlCQyxDQUE4QjtBQUE5QkEsTUFBQUEsQ0FBOEIsR0FBbEIsQ0FBa0I7QUFBQTs7QUFBQSxRQUFmQyxDQUFlO0FBQWZBLE1BQUFBLENBQWUsR0FBSCxDQUFHO0FBQUE7O0FBQzVFO0FBRDRFLFVBZGhGSCxDQWNnRjtBQUFBLFVBVmhGQyxDQVVnRjtBQUFBLFVBTmhGQyxDQU1nRjtBQUFBLFVBRmhGQyxDQUVnRjs7QUFHNUUsUUFBSUgsQ0FBQyxJQUFJLE9BQU9BLENBQVAsS0FBYSxRQUF0QixFQUFnQztBQUM1QixZQUFLQSxDQUFMLEdBQVNBLENBQUMsQ0FBQ0EsQ0FBWDtBQUNBLFlBQUtDLENBQUwsR0FBU0QsQ0FBQyxDQUFDQyxDQUFYO0FBQ0EsWUFBS0MsQ0FBTCxHQUFTRixDQUFDLENBQUNFLENBQVg7QUFDQSxZQUFLQyxDQUFMLEdBQVNILENBQUMsQ0FBQ0csQ0FBWDtBQUNILEtBTEQsTUFNSztBQUNELFlBQUtILENBQUwsR0FBU0EsQ0FBVDtBQUNBLFlBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFlBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFlBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNIOztBQWQyRTtBQWUvRTtBQUVEOzs7Ozs7OztTQU1BTCxRQUFBLGlCQUFlO0FBQ1gsV0FBTyxJQUFJTCxJQUFKLENBQVMsS0FBS08sQ0FBZCxFQUFpQixLQUFLQyxDQUF0QixFQUF5QixLQUFLQyxDQUE5QixFQUFpQyxLQUFLQyxDQUF0QyxDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztTQVFBRSxNQUFBLGFBQUtxSCxRQUFMLEVBQTJCO0FBQ3ZCLFNBQUsxSCxDQUFMLEdBQVMwSCxRQUFRLENBQUMxSCxDQUFsQjtBQUNBLFNBQUtDLENBQUwsR0FBU3lILFFBQVEsQ0FBQ3pILENBQWxCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTd0gsUUFBUSxDQUFDeEgsQ0FBbEI7QUFDQSxTQUFLQyxDQUFMLEdBQVN1SCxRQUFRLENBQUN2SCxDQUFsQjtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7OztTQU9BK0csU0FBQSxnQkFBUXZILEtBQVIsRUFBOEI7QUFDMUIsV0FBT0EsS0FBSyxJQUFJLEtBQUtLLENBQUwsS0FBV0wsS0FBSyxDQUFDSyxDQUExQixJQUErQixLQUFLQyxDQUFMLEtBQVdOLEtBQUssQ0FBQ00sQ0FBaEQsSUFBcUQsS0FBS0MsQ0FBTCxLQUFXUCxLQUFLLENBQUNPLENBQXRFLElBQTJFLEtBQUtDLENBQUwsS0FBV1IsS0FBSyxDQUFDUSxDQUFuRztBQUNIO0FBRUQ7Ozs7Ozs7OztTQU9Ba0csVUFBQSxpQkFBU3pHLEdBQVQsRUFBMEI7QUFDdEIsV0FBT0gsSUFBSSxDQUFDNEcsT0FBTCxDQUFhekcsR0FBYixFQUFrQixJQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O1NBT0E0RixZQUFBLG1CQUFXbUMsS0FBWCxFQUE4QjtBQUMxQixXQUFPbEksSUFBSSxDQUFDK0YsU0FBTCxDQUFlLElBQWYsRUFBcUJtQyxLQUFLLENBQUMzSCxDQUEzQixFQUE4QjJILEtBQUssQ0FBQzFILENBQXBDLEVBQXVDMEgsS0FBSyxDQUFDekgsQ0FBN0MsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O1NBU0E4QyxPQUFBLGNBQU00RSxFQUFOLEVBQWdCQyxLQUFoQixFQUErQmpJLEdBQS9CLEVBQWlEO0FBQzdDQSxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQWI7QUFDQUEsSUFBQUEsSUFBSSxDQUFDeUQsS0FBTCxDQUFXdEQsR0FBWCxFQUFnQixJQUFoQixFQUFzQmdJLEVBQXRCLEVBQTBCQyxLQUExQjtBQUNBLFdBQU9qSSxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O1NBT0FDLFdBQUEsa0JBQVVGLEtBQVYsRUFBNkI7QUFDekIsV0FBT0YsSUFBSSxDQUFDSSxRQUFMLENBQWMsSUFBZCxFQUFvQixJQUFwQixFQUEwQkYsS0FBMUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztTQVVBMkMsZUFBQSxzQkFBY0MsR0FBZCxFQUF5QkMsSUFBekIsRUFBcUNqQixHQUFyQyxFQUFrRDNCLEdBQWxELEVBQW9FO0FBQ2hFQSxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQWI7QUFDQSxXQUFPQSxJQUFJLENBQUM2QyxZQUFMLENBQWtCMUMsR0FBbEIsRUFBdUIyQyxHQUF2QixFQUE0QkMsSUFBNUIsRUFBa0NqQixHQUFsQyxDQUFQO0FBQ0g7OztFQXY1QjZCdUc7OztBQUFickksS0FDVkMsTUFBTUQsSUFBSSxDQUFDSTtBQURESixLQUVWb0MsUUFBUXBDLElBQUksQ0FBQ2tDO0FBRkhsQyxLQUdWcUIsTUFBTXJCLElBQUksQ0FBQ3FFO0FBSERyRSxLQWlCVnNJLFdBQVdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQUl4SSxJQUFKLEVBQWQ7QUF5NEJ0QixJQUFNaUQsSUFBSSxHQUFHLElBQUlqRCxJQUFKLEVBQWI7QUFDQSxJQUFNa0UsSUFBSSxHQUFHLElBQUlsRSxJQUFKLEVBQWI7QUFDQSxJQUFNbUIsSUFBSSxHQUFHLElBQUlGLGVBQUosRUFBYjtBQUNBLElBQU0yRCxJQUFJLEdBQUcsSUFBSUQsZUFBSixFQUFiO0FBQ0EsSUFBTU8sU0FBUyxHQUFHLE1BQU16RCxJQUFJLENBQUNDLEVBQVgsR0FBZ0IsS0FBbEM7O0FBRUErRyxvQkFBUUMsVUFBUixDQUFtQixTQUFuQixFQUE4QjFJLElBQTlCLEVBQW9DO0FBQUVPLEVBQUFBLENBQUMsRUFBRSxDQUFMO0FBQVFDLEVBQUFBLENBQUMsRUFBRSxDQUFYO0FBQWNDLEVBQUFBLENBQUMsRUFBRSxDQUFqQjtBQUFvQkMsRUFBQUEsQ0FBQyxFQUFFO0FBQXZCLENBQXBDO0FBR0E7Ozs7QUFJQTs7Ozs7Ozs7Ozs7O0FBVUFpSSxFQUFFLENBQUNDLElBQUgsR0FBVSxTQUFTQSxJQUFULENBQWVySSxDQUFmLEVBQWtCQyxDQUFsQixFQUFxQkMsQ0FBckIsRUFBd0JDLENBQXhCLEVBQTJCO0FBQ2pDLFNBQU8sSUFBSVYsSUFBSixDQUFTTyxDQUFULEVBQVlDLENBQVosRUFBZUMsQ0FBZixFQUFrQkMsQ0FBbEIsQ0FBUDtBQUNILENBRkQ7O0FBSUFpSSxFQUFFLENBQUMzSSxJQUFILEdBQVVBLElBQVYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFZhbHVlVHlwZSBmcm9tICcuL3ZhbHVlLXR5cGUnO1xuaW1wb3J0IENDQ2xhc3MgZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzcyc7XG5pbXBvcnQgVmVjMyBmcm9tICcuL3ZlYzMnO1xuaW1wb3J0IE1hdDMgZnJvbSAnLi9tYXQzJztcbmltcG9ydCB7IEVQU0lMT04sIHRvRGVncmVlIH0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBfeDogbnVtYmVyID0gMC4wO1xubGV0IF95OiBudW1iZXIgPSAwLjA7XG5sZXQgX3o6IG51bWJlciA9IDAuMDtcbmxldCBfdzogbnVtYmVyID0gMC4wO1xuXG4vKipcbiAqICEjZW4gUmVwcmVzZW50YXRpb24gb2YgMkQgdmVjdG9ycyBhbmQgcG9pbnRzLlxuICogISN6aCDooajnpLogMkQg5ZCR6YeP5ZKM5Z2Q5qCHXG4gKlxuICogQGNsYXNzIFF1YXRcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICovXG5cbi8qKlxuICogISNlblxuICogQ29uc3RydWN0b3JcbiAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy9xdWF0Om1ldGhvZFwifX1jYy5xdWF0e3svY3Jvc3NMaW5rfX1cbiAqICEjemhcbiAqIOaehOmAoOWHveaVsO+8jOWPr+afpeeciyB7eyNjcm9zc0xpbmsgXCJjYy9xdWF0Om1ldGhvZFwifX1jYy5xdWF0e3svY3Jvc3NMaW5rfX1cbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXVxuICogQHBhcmFtIHtudW1iZXJ9IFt5PTBdXG4gKiBAcGFyYW0ge251bWJlcn0gW3o9MF1cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdz0xXVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRdWF0IGV4dGVuZHMgVmFsdWVUeXBlIHtcbiAgICBzdGF0aWMgbXVsID0gUXVhdC5tdWx0aXBseTtcbiAgICBzdGF0aWMgc2NhbGUgPSBRdWF0Lm11bHRpcGx5U2NhbGFyO1xuICAgIHN0YXRpYyBtYWcgPSBRdWF0LmxlbjtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsY3VsYXRlIHRoZSBtdWx0aXBseSByZXN1bHQgYmV0d2VlbiB0aGlzIHF1YXRlcm5pb24gYW5kIGFub3RoZXIgb25lXG4gICAgICogISN6aCDorqHnrpflm5vlhYPmlbDkuZjnp6/nmoTnu5PmnpxcbiAgICAgKiBAbWV0aG9kIG11bFxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3RoZXJcbiAgICAgKiBAcGFyYW0ge1F1YXR9IFtvdXRdXG4gICAgICogQHJldHVybnMge1F1YXR9IG91dFxuICAgICAqL1xuICAgIG11bCAob3RoZXI6IFF1YXQsIG91dD86IFF1YXQpOiBRdWF0IHtcbiAgICAgICAgcmV0dXJuIFF1YXQubXVsdGlwbHkob3V0IHx8IG5ldyBRdWF0KCksIHRoaXMsIG90aGVyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBRdWF0KCkpO1xuXG4gICAgLyoqXG4gICAgICogISN6aCDojrflvpfmjIflrprlm5vlhYPmlbDnmoTmi7fotJ1cbiAgICAgKiAhI2VuIE9idGFpbmluZyBjb3B5IHNwZWNpZmllZCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY2xvbmU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KTogUXVhdFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUXVhdChhLngsIGEueSwgYS56LCBhLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5aSN5Yi255uu5qCH5Zub5YWD5pWwXG4gICAgICogISNlbiBDb3B5IHF1YXRlcm5pb24gdGFyZ2V0XG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb3B5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNvcHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZSkge1xuICAgICAgICBvdXQueCA9IGEueDtcbiAgICAgICAgb3V0LnkgPSBhLnk7XG4gICAgICAgIG91dC56ID0gYS56O1xuICAgICAgICBvdXQudyA9IGEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiuvue9ruWbm+WFg+aVsOWAvFxuICAgICAqICEjZW4gUHJvdmlkZWQgUXVhdGVybmlvbiBWYWx1ZVxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzZXQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0PE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgb3V0LncgPSB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5bCG55uu5qCH6LWL5YC85Li65Y2V5L2N5Zub5YWD5pWwXG4gICAgICogISNlbiBUaGUgdGFyZ2V0IG9mIGFuIGFzc2lnbm1lbnQgYXMgYSB1bml0IHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIGlkZW50aXR5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpZGVudGl0eTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgaWRlbnRpdHk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSAwO1xuICAgICAgICBvdXQueSA9IDA7XG4gICAgICAgIG91dC56ID0gMDtcbiAgICAgICAgb3V0LncgPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6+572u5Zub5YWD5pWw5Li65Lik5ZCR6YeP6Ze055qE5pyA55+t6Lev5b6E5peL6L2s77yM6buY6K6k5Lik5ZCR6YeP6YO95bey5b2S5LiA5YyWXG4gICAgICogISNlbiBTZXQgcXVhdGVybmlvbiByb3RhdGlvbiBpcyB0aGUgc2hvcnRlc3QgcGF0aCBiZXR3ZWVuIHR3byB2ZWN0b3JzLCB0aGUgZGVmYXVsdCB0d28gdmVjdG9ycyBhcmUgbm9ybWFsaXplZFxuICAgICAqIEBtZXRob2Qgcm90YXRpb25Ub1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm90YXRpb25UbzxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjTGlrZSwgYjogVmVjTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRpb25UbzxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjTGlrZSwgYjogVmVjTGlrZSkge1xuICAgICAgICBjb25zdCBkb3QgPSBWZWMzLmRvdChhLCBiKTtcbiAgICAgICAgaWYgKGRvdCA8IC0wLjk5OTk5OSkge1xuICAgICAgICAgICAgVmVjMy5jcm9zcyh2M18xLCBWZWMzLlJJR0hULCBhKTtcbiAgICAgICAgICAgIGlmICh2M18xLm1hZygpIDwgMC4wMDAwMDEpIHtcbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKHYzXzEsIFZlYzMuVVAsIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmVjMy5ub3JtYWxpemUodjNfMSwgdjNfMSk7XG4gICAgICAgICAgICBRdWF0LmZyb21BeGlzQW5nbGUob3V0LCB2M18xLCBNYXRoLlBJKTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgICAgIG91dC55ID0gMDtcbiAgICAgICAgICAgIG91dC56ID0gMDtcbiAgICAgICAgICAgIG91dC53ID0gMTtcbiAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNyb3NzKHYzXzEsIGEsIGIpO1xuICAgICAgICAgICAgb3V0LnggPSB2M18xLng7XG4gICAgICAgICAgICBvdXQueSA9IHYzXzEueTtcbiAgICAgICAgICAgIG91dC56ID0gdjNfMS56O1xuICAgICAgICAgICAgb3V0LncgPSAxICsgZG90O1xuICAgICAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgb3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6I635Y+W5Zub5YWD5pWw55qE5peL6L2s6L205ZKM5peL6L2s5byn5bqmXG4gICAgICogISNlbiBHZXQgdGhlIHJvdGFyeSBzaGFmdCBhbmQgdGhlIGFyYyBvZiByb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCBnZXRBeGlzQW5nbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dEF4aXMgLSDml4vovazovbTovpPlh7pcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHEgLSDmupDlm5vlhYPmlbBcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IC0g5peL6L2s5byn5bqmXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRBeGlzQW5nbGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0QXhpczogVmVjTGlrZSwgcTogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBeGlzQW5nbGU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0QXhpczogVmVjTGlrZSwgcTogT3V0KSB7XG4gICAgICAgIGNvbnN0IHJhZCA9IE1hdGguYWNvcyhxLncpICogMi4wO1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkIC8gMi4wKTtcbiAgICAgICAgaWYgKHMgIT09IDAuMCkge1xuICAgICAgICAgICAgb3V0QXhpcy54ID0gcS54IC8gcztcbiAgICAgICAgICAgIG91dEF4aXMueSA9IHEueSAvIHM7XG4gICAgICAgICAgICBvdXRBeGlzLnogPSBxLnogLyBzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgcyBpcyB6ZXJvLCByZXR1cm4gYW55IGF4aXMgKG5vIHJvdGF0aW9uIC0gYXhpcyBkb2VzIG5vdCBtYXR0ZXIpXG4gICAgICAgICAgICBvdXRBeGlzLnggPSAxO1xuICAgICAgICAgICAgb3V0QXhpcy55ID0gMDtcbiAgICAgICAgICAgIG91dEF4aXMueiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWbm+WFg+aVsOS5mOazlVxuICAgICAqICEjZW4gUXVhdGVybmlvbiBtdWx0aXBsaWNhdGlvblxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBRdWF0TGlrZV8xLCBiOiBRdWF0TGlrZV8yKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzEgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlXzIgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2VfMSwgYjogUXVhdExpa2VfMikge1xuICAgICAgICBfeCA9IGEueCAqIGIudyArIGEudyAqIGIueCArIGEueSAqIGIueiAtIGEueiAqIGIueTtcbiAgICAgICAgX3kgPSBhLnkgKiBiLncgKyBhLncgKiBiLnkgKyBhLnogKiBiLnggLSBhLnggKiBiLno7XG4gICAgICAgIF96ID0gYS56ICogYi53ICsgYS53ICogYi56ICsgYS54ICogYi55IC0gYS55ICogYi54O1xuICAgICAgICBfdyA9IGEudyAqIGIudyAtIGEueCAqIGIueCAtIGEueSAqIGIueSAtIGEueiAqIGIuejtcbiAgICAgICAgb3V0LnggPSBfeDtcbiAgICAgICAgb3V0LnkgPSBfeTtcbiAgICAgICAgb3V0LnogPSBfejtcbiAgICAgICAgb3V0LncgPSBfdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWbm+WFg+aVsOagh+mHj+S5mOazlVxuICAgICAqICEjZW4gUXVhdGVybmlvbiBzY2FsYXIgbXVsdGlwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGI7XG4gICAgICAgIG91dC55ID0gYS55ICogYjtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xuICAgICAgICBvdXQudyA9IGEudyAqIGI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDkuZjliqDvvJpBICsgQiAqIHNjYWxlXG4gICAgICogISNlbiBRdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uIGFuZCBhZGRpdGlvbjogQSArIEIgKiBzY2FsZVxuICAgICAqIEBtZXRob2Qgc2NhbGVBbmRBZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGVBbmRBZGQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICsgYi54ICogc2NhbGU7XG4gICAgICAgIG91dC55ID0gYS55ICsgYi55ICogc2NhbGU7XG4gICAgICAgIG91dC56ID0gYS56ICsgYi56ICogc2NhbGU7XG4gICAgICAgIG91dC53ID0gYS53ICsgYi53ICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5UgWCDovbTml4vovazmjIflrprlm5vlhYPmlbBcbiAgICAgKiAhI2VuIEFib3V0IHRoZSBYIGF4aXMgc3BlY2lmaWVkIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVhcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICByYWQgKj0gMC41O1xuXG4gICAgICAgIGNvbnN0IGJ4ID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIG91dC54ID0gYS54ICogYncgKyBhLncgKiBieDtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBidyArIGEueiAqIGJ4O1xuICAgICAgICBvdXQueiA9IGEueiAqIGJ3IC0gYS55ICogYng7XG4gICAgICAgIG91dC53ID0gYS53ICogYncgLSBhLnggKiBieDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOe7lSBZIOi9tOaXi+i9rOaMh+WumuWbm+WFg+aVsFxuICAgICAqICEjZW4gUm90YXRpb24gYWJvdXQgdGhlIFkgYXhpcyBkZXNpZ25hdGVkIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVk8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICByYWQgKj0gMC41O1xuXG4gICAgICAgIGNvbnN0IGJ5ID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIG91dC54ID0gYS54ICogYncgLSBhLnogKiBieTtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBidyArIGEudyAqIGJ5O1xuICAgICAgICBvdXQueiA9IGEueiAqIGJ3ICsgYS54ICogYnk7XG4gICAgICAgIG91dC53ID0gYS53ICogYncgLSBhLnkgKiBieTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOe7lSBaIOi9tOaXi+i9rOaMh+WumuWbm+WFg+aVsFxuICAgICAqICEjZW4gQXJvdW5kIHRoZSBaIGF4aXMgc3BlY2lmaWVkIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOW8p+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICByYWQgKj0gMC41O1xuXG4gICAgICAgIGNvbnN0IGJ6ID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY29uc3QgYncgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIG91dC54ID0gYS54ICogYncgKyBhLnkgKiBiejtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBidyAtIGEueCAqIGJ6O1xuICAgICAgICBvdXQueiA9IGEueiAqIGJ3ICsgYS53ICogYno7XG4gICAgICAgIG91dC53ID0gYS53ICogYncgLSBhLnogKiBiejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOe7leS4lueVjOepuumXtOS4i+aMh+Wumui9tOaXi+i9rOWbm+WFg+aVsFxuICAgICAqICEjZW4gU3BhY2UgYXJvdW5kIHRoZSB3b3JsZCBhdCBhIGdpdmVuIGF4aXMgb2Ygcm90YXRpb24gcXVhdGVybmlvblxuICAgICAqIEBtZXRob2Qgcm90YXRlQXJvdW5kXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVBcm91bmQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHJvdDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBheGlzIOaXi+i9rOi9tO+8jOm7mOiupOW3suW9kuS4gOWMllxuICAgICAqIEBwYXJhbSByYWQg5peL6L2s5byn5bqmXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVBcm91bmQ8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHJvdDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcikge1xuICAgICAgICAvLyBnZXQgaW52LWF4aXMgKGxvY2FsIHRvIHJvdClcbiAgICAgICAgUXVhdC5pbnZlcnQocXRfMSwgcm90KTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KHYzXzEsIGF4aXMsIHF0XzEpO1xuICAgICAgICAvLyByb3RhdGUgYnkgaW52LWF4aXNcbiAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKHF0XzEsIHYzXzEsIHJhZCk7XG4gICAgICAgIFF1YXQubXVsdGlwbHkob3V0LCByb3QsIHF0XzEpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg57uV5pys5Zyw56m66Ze05LiL5oyH5a6a6L205peL6L2s5Zub5YWD5pWwXG4gICAgICogISNlbiBMb2NhbCBzcGFjZSBhcm91bmQgdGhlIHNwZWNpZmllZCBheGlzIHJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZUFyb3VuZExvY2FsXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVBcm91bmRMb2NhbDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcm90OiBPdXQsIGF4aXM6IFZlY0xpa2UsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIGF4aXMg5peL6L2s6L20XG4gICAgICogQHBhcmFtIHJhZCDml4vovazlvKfluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZUFyb3VuZExvY2FsPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByb3Q6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgUXVhdC5mcm9tQXhpc0FuZ2xlKHF0XzEsIGF4aXMsIHJhZCk7XG4gICAgICAgIFF1YXQubXVsdGlwbHkob3V0LCByb3QsIHF0XzEpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2uIHh5eiDliIbph4/orqHnrpcgdyDliIbph4/vvIzpu5jorqTlt7LlvZLkuIDljJZcbiAgICAgKiAhI2VuIFRoZSBjb21wb25lbnQgdyB4eXogY29tcG9uZW50cyBjYWxjdWxhdGVkLCBub3JtYWxpemVkIGJ5IGRlZmF1bHRcbiAgICAgKiBAbWV0aG9kIGNhbGN1bGF0ZVdcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNhbGN1bGF0ZVc8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY2FsY3VsYXRlVzxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG5cbiAgICAgICAgb3V0LnggPSBhLng7XG4gICAgICAgIG91dC55ID0gYS55O1xuICAgICAgICBvdXQueiA9IGEuejtcbiAgICAgICAgb3V0LncgPSBNYXRoLnNxcnQoTWF0aC5hYnMoMS4wIC0gYS54ICogYS54IC0gYS55ICogYS55IC0gYS56ICogYS56KSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDngrnnp6/vvIjmlbDph4/np6/vvIlcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gZG90IHByb2R1Y3QgKHNjYWxhciBwcm9kdWN0KVxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBkb3Q8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRvdDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56ICsgYS53ICogYi53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqICEjZW4gRWxlbWVudCBieSBlbGVtZW50IGxpbmVhciBpbnRlcnBvbGF0aW9uOiBBICsgdCAqIChCIC0gQSlcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyB0ICogKGIueCAtIGEueCk7XG4gICAgICAgIG91dC55ID0gYS55ICsgdCAqIChiLnkgLSBhLnkpO1xuICAgICAgICBvdXQueiA9IGEueiArIHQgKiAoYi56IC0gYS56KTtcbiAgICAgICAgb3V0LncgPSBhLncgKyB0ICogKGIudyAtIGEudyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDnkIPpnaLmj5LlgLxcbiAgICAgKiAhI2VuIFNwaGVyaWNhbCBxdWF0ZXJuaW9uIGludGVycG9sYXRpb25cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNsZXJwPE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMSBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2VfMiBleHRlbmRzIElRdWF0TGlrZT4ob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIsIHQ6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2xlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8xIGV4dGVuZHMgSVF1YXRMaWtlLCBRdWF0TGlrZV8yIGV4dGVuZHMgSVF1YXRMaWtlPlxuICAgICAgICAob3V0OiBPdXQsIGE6IFF1YXRMaWtlXzEsIGI6IFF1YXRMaWtlXzIsIHQ6IG51bWJlcikge1xuICAgICAgICAvLyBiZW5jaG1hcmtzOlxuICAgICAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuXG4gICAgICAgIGxldCBzY2FsZTAgPSAwO1xuICAgICAgICBsZXQgc2NhbGUxID0gMDtcblxuICAgICAgICAvLyBjYWxjIGNvc2luZVxuICAgICAgICBsZXQgY29zb20gPSBhLnggKiBiLnggKyBhLnkgKiBiLnkgKyBhLnogKiBiLnogKyBhLncgKiBiLnc7XG4gICAgICAgIC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuICAgICAgICBpZiAoY29zb20gPCAwLjApIHtcbiAgICAgICAgICAgIGNvc29tID0gLWNvc29tO1xuICAgICAgICAgICAgYi54ID0gLWIueDtcbiAgICAgICAgICAgIGIueSA9IC1iLnk7XG4gICAgICAgICAgICBiLnogPSAtYi56O1xuICAgICAgICAgICAgYi53ID0gLWIudztcbiAgICAgICAgfVxuICAgICAgICAvLyBjYWxjdWxhdGUgY29lZmZpY2llbnRzXG4gICAgICAgIGlmICgoMS4wIC0gY29zb20pID4gMC4wMDAwMDEpIHtcbiAgICAgICAgICAgIC8vIHN0YW5kYXJkIGNhc2UgKHNsZXJwKVxuICAgICAgICAgICAgY29uc3Qgb21lZ2EgPSBNYXRoLmFjb3MoY29zb20pO1xuICAgICAgICAgICAgY29uc3Qgc2lub20gPSBNYXRoLnNpbihvbWVnYSk7XG4gICAgICAgICAgICBzY2FsZTAgPSBNYXRoLnNpbigoMS4wIC0gdCkgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICAgICAgICAgIHNjYWxlMSA9IE1hdGguc2luKHQgKiBvbWVnYSkgLyBzaW5vbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcbiAgICAgICAgICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgICAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICAgICAgICBzY2FsZTEgPSB0O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcbiAgICAgICAgb3V0LnggPSBzY2FsZTAgKiBhLnggKyBzY2FsZTEgKiBiLng7XG4gICAgICAgIG91dC55ID0gc2NhbGUwICogYS55ICsgc2NhbGUxICogYi55O1xuICAgICAgICBvdXQueiA9IHNjYWxlMCAqIGEueiArIHNjYWxlMSAqIGIuejtcbiAgICAgICAgb3V0LncgPSBzY2FsZTAgKiBhLncgKyBzY2FsZTEgKiBiLnc7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOW4puS4pOS4quaOp+WItueCueeahOWbm+WFg+aVsOeQg+mdouaPkuWAvFxuICAgICAqICEjZW4gUXVhdGVybmlvbiB3aXRoIHR3byBzcGhlcmljYWwgaW50ZXJwb2xhdGlvbiBjb250cm9sIHBvaW50c1xuICAgICAqIEBtZXRob2Qgc3FsZXJwXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzcWxlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBjOiBPdXQsIGQ6IE91dCwgdDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzcWxlcnA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBjOiBPdXQsIGQ6IE91dCwgdDogbnVtYmVyKSB7XG4gICAgICAgIFF1YXQuc2xlcnAocXRfMSwgYSwgZCwgdCk7XG4gICAgICAgIFF1YXQuc2xlcnAocXRfMiwgYiwgYywgdCk7XG4gICAgICAgIFF1YXQuc2xlcnAob3V0LCBxdF8xLCBxdF8yLCAyICogdCAqICgxIC0gdCkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zub5YWD5pWw5rGC6YCGXG4gICAgICogISNlbiBRdWF0ZXJuaW9uIGludmVyc2VcbiAgICAgKiBAbWV0aG9kIGludmVydFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaW52ZXJ0PE91dCBleHRlbmRzIElRdWF0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogUXVhdExpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGludmVydDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IFF1YXRMaWtlKSB7XG4gICAgICAgIGNvbnN0IGRvdCA9IGEueCAqIGEueCArIGEueSAqIGEueSArIGEueiAqIGEueiArIGEudyAqIGEudztcbiAgICAgICAgY29uc3QgaW52RG90ID0gZG90ID8gMS4wIC8gZG90IDogMDtcblxuICAgICAgICAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgICAgIG91dC54ID0gLWEueCAqIGludkRvdDtcbiAgICAgICAgb3V0LnkgPSAtYS55ICogaW52RG90O1xuICAgICAgICBvdXQueiA9IC1hLnogKiBpbnZEb3Q7XG4gICAgICAgIG91dC53ID0gYS53ICogaW52RG90O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5YWx6L2t5Zub5YWD5pWw77yM5a+55Y2V5L2N5Zub5YWD5pWw5LiO5rGC6YCG562J5Lu377yM5L2G5pu06auY5pWIXG4gICAgICogISNlbiBDb25qdWdhdGluZyBhIHF1YXRlcm5pb24sIGFuZCB0aGUgdW5pdCBxdWF0ZXJuaW9uIGVxdWl2YWxlbnQgdG8gaW52ZXJzaW9uLCBidXQgbW9yZSBlZmZpY2llbnRcbiAgICAgKiBAbWV0aG9kIGNvbmp1Z2F0ZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29uanVnYXRlPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNvbmp1Z2F0ZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gLWEueDtcbiAgICAgICAgb3V0LnkgPSAtYS55O1xuICAgICAgICBvdXQueiA9IC1hLno7XG4gICAgICAgIG91dC53ID0gYS53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5Zub5YWD5pWw6ZW/5bqmXG4gICAgICogISNlbiBTZWVrIGxlbmd0aCBxdWF0ZXJuaW9uXG4gICAgICogQG1ldGhvZCBsZW5cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlbjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlbjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkgKyBhLnogKiBhLnogKyBhLncgKiBhLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5Zub5YWD5pWw6ZW/5bqm5bmz5pa5XG4gICAgICogISNlbiBTZWVraW5nIHF1YXRlcm5pb24gc3F1YXJlIG9mIHRoZSBsZW5ndGhcbiAgICAgKiBAbWV0aG9kIGxlbmd0aFNxclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbGVuZ3RoU3FyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCk6IG51bWJlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGVuZ3RoU3FyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5b2S5LiA5YyW5Zub5YWD5pWwXG4gICAgICogISNlbiBOb3JtYWxpemVkIHF1YXRlcm5pb25zXG4gICAgICogQG1ldGhvZCBub3JtYWxpemVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG5vcm1hbGl6ZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBub3JtYWxpemU8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBsZXQgbGVuID0gYS54ICogYS54ICsgYS55ICogYS55ICsgYS56ICogYS56ICsgYS53ICogYS53O1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgb3V0LnggPSBhLnggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IGEueSAqIGxlbjtcbiAgICAgICAgICAgIG91dC56ID0gYS56ICogbGVuO1xuICAgICAgICAgICAgb3V0LncgPSBhLncgKiBsZW47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruacrOWcsOWdkOagh+i9tOacneWQkeiuoeeul+Wbm+WFg+aVsO+8jOm7mOiupOS4ieWQkemHj+mDveW3suW9kuS4gOWMluS4lOebuOS6kuWeguebtFxuICAgICAqICEjZW4gQ2FsY3VsYXRlZCBhY2NvcmRpbmcgdG8gdGhlIGxvY2FsIG9yaWVudGF0aW9uIHF1YXRlcm5pb24gY29vcmRpbmF0ZSBheGlzLCB0aGUgZGVmYXVsdCB0aHJlZSB2ZWN0b3JzIGFyZSBub3JtYWxpemVkIGFuZCBtdXR1YWxseSBwZXJwZW5kaWN1bGFyXG4gICAgICogQG1ldGhvZCBmcm9tQXhlc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbUF4ZXM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHhBeGlzOiBWZWNMaWtlLCB5QXhpczogVmVjTGlrZSwgekF4aXM6IFZlY0xpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21BeGVzPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB4QXhpczogVmVjTGlrZSwgeUF4aXM6IFZlY0xpa2UsIHpBeGlzOiBWZWNMaWtlKSB7XG4gICAgICAgIE1hdDMuc2V0KG0zXzEsXG4gICAgICAgICAgICB4QXhpcy54LCB4QXhpcy55LCB4QXhpcy56LFxuICAgICAgICAgICAgeUF4aXMueCwgeUF4aXMueSwgeUF4aXMueixcbiAgICAgICAgICAgIHpBeGlzLngsIHpBeGlzLnksIHpBeGlzLnosXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBRdWF0Lm5vcm1hbGl6ZShvdXQsIFF1YXQuZnJvbU1hdDMob3V0LCBtM18xKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmoLnmja7op4blj6PnmoTliY3mlrnlkJHlkozkuIrmlrnlkJHorqHnrpflm5vlhYPmlbBcbiAgICAgKiAhI2VuIFRoZSBmb3J3YXJkIGRpcmVjdGlvbiBhbmQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgdmlld3BvcnQgY29tcHV0aW5nIHF1YXRlcm5pb25cbiAgICAgKiBAbWV0aG9kIGZyb21WaWV3VXBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21WaWV3VXA8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIHZpZXc6IFZlYzMsIHVwPzogVmVjMyk6IE91dFxuICAgICAqIEBwYXJhbSB2aWV3IOinhuWPo+mdouWQkeeahOWJjeaWueWQke+8jOW/hemhu+W9kuS4gOWMllxuICAgICAqIEBwYXJhbSB1cCDop4blj6PnmoTkuIrmlrnlkJHvvIzlv4XpobvlvZLkuIDljJbvvIzpu5jorqTkuLogKDAsIDEsIDApXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVmlld1VwPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCB2aWV3OiBWZWMzLCB1cD86IFZlYzMpIHtcbiAgICAgICAgTWF0My5mcm9tVmlld1VwKG0zXzEsIHZpZXcsIHVwKTtcbiAgICAgICAgcmV0dXJuIFF1YXQubm9ybWFsaXplKG91dCwgUXVhdC5mcm9tTWF0MyhvdXQsIG0zXzEpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruaXi+i9rOi9tOWSjOaXi+i9rOW8p+W6puiuoeeul+Wbm+WFg+aVsFxuICAgICAqICEjZW4gVGhlIHF1YXRlcm5pb24gY2FsY3VsYXRlZCBhbmQgdGhlIGFyYyBvZiByb3RhdGlvbiBvZiB0aGUgcm90YXJ5IHNoYWZ0XG4gICAgICogQG1ldGhvZCBmcm9tQXhpc0FuZ2xlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXhpc0FuZ2xlPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBheGlzOiBWZWNMaWtlLCByYWQ6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUF4aXNBbmdsZTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYXhpczogVmVjTGlrZSwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgcmFkID0gcmFkICogMC41O1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgb3V0LnggPSBzICogYXhpcy54O1xuICAgICAgICBvdXQueSA9IHMgKiBheGlzLnk7XG4gICAgICAgIG91dC56ID0gcyAqIGF4aXMuejtcbiAgICAgICAgb3V0LncgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIHF1YXRlcm5pb24gZnJvbSB0aGUgZ2l2ZW4gZXVsZXIgYW5nbGUgMCwgMCwgei5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3V0IC0gUXVhdGVybmlvbiB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHogLSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxuICAgICAqIEByZXR1cm5zIHtRdWF0fVxuICAgICAqIEBmdW5jdGlvblxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tQW5nbGVaIChvdXQ6IFF1YXQsIHo6IG51bWJlcik6IFF1YXQge1xuICAgICAgICB6ICo9IGhhbGZUb1JhZDtcbiAgICAgICAgb3V0LnggPSBvdXQueSA9IDA7XG4gICAgICAgIG91dC56ID0gTWF0aC5zaW4oeik7XG4gICAgICAgIG91dC53ID0gTWF0aC5jb3Moeik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmoLnmja7kuInnu7Tnn6npmLXkv6Hmga/orqHnrpflm5vlhYPmlbDvvIzpu5jorqTovpPlhaXnn6npmLXkuI3lkKvmnInnvKnmlL7kv6Hmga9cbiAgICAgKiAhI2VuIENhbGN1bGF0aW5nIHRoZSB0aHJlZS1kaW1lbnNpb25hbCBxdWF0ZXJuaW9uIG1hdHJpeCBpbmZvcm1hdGlvbiwgZGVmYXVsdCB6b29tIGluZm9ybWF0aW9uIGlucHV0IG1hdHJpeCBkb2VzIG5vdCBjb250YWluXG4gICAgICogQG1ldGhvZCBmcm9tTWF0M1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbU1hdDM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIG1hdDogTWF0Myk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbU1hdDM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAob3V0OiBPdXQsIG1hdDogTWF0Mykge1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBsZXQgbTAwID0gbVswXSwgbTEwID0gbVsxXSwgbTIwID0gbVsyXSxcbiAgICAgICAgICAgIG0wMSA9IG1bM10sIG0xMSA9IG1bNF0sIG0yMSA9IG1bNV0sXG4gICAgICAgICAgICBtMDIgPSBtWzZdLCBtMTIgPSBtWzddLCBtMjIgPSBtWzhdO1xuXG4gICAgICAgIGNvbnN0IHRyYWNlID0gbTAwICsgbTExICsgbTIyO1xuXG4gICAgICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAwLjUgLyBNYXRoLnNxcnQodHJhY2UgKyAxLjApO1xuXG4gICAgICAgICAgICBvdXQudyA9IDAuMjUgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTIxIC0gbTEyKSAqIHM7XG4gICAgICAgICAgICBvdXQueSA9IChtMDIgLSBtMjApICogcztcbiAgICAgICAgICAgIG91dC56ID0gKG0xMCAtIG0wMSkgKiBzO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoKG0wMCA+IG0xMSkgJiYgKG0wMCA+IG0yMikpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoMS4wICsgbTAwIC0gbTExIC0gbTIyKTtcblxuICAgICAgICAgICAgb3V0LncgPSAobTIxIC0gbTEyKSAvIHM7XG4gICAgICAgICAgICBvdXQueCA9IDAuMjUgKiBzO1xuICAgICAgICAgICAgb3V0LnkgPSAobTAxICsgbTEwKSAvIHM7XG4gICAgICAgICAgICBvdXQueiA9IChtMDIgKyBtMjApIC8gcztcblxuICAgICAgICB9IGVsc2UgaWYgKG0xMSA+IG0yMikge1xuICAgICAgICAgICAgY29uc3QgcyA9IDIuMCAqIE1hdGguc3FydCgxLjAgKyBtMTEgLSBtMDAgLSBtMjIpO1xuXG4gICAgICAgICAgICBvdXQudyA9IChtMDIgLSBtMjApIC8gcztcbiAgICAgICAgICAgIG91dC54ID0gKG0wMSArIG0xMCkgLyBzO1xuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogcztcbiAgICAgICAgICAgIG91dC56ID0gKG0xMiArIG0yMSkgLyBzO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KDEuMCArIG0yMiAtIG0wMCAtIG0xMSk7XG5cbiAgICAgICAgICAgIG91dC53ID0gKG0xMCAtIG0wMSkgLyBzO1xuICAgICAgICAgICAgb3V0LnggPSAobTAyICsgbTIwKSAvIHM7XG4gICAgICAgICAgICBvdXQueSA9IChtMTIgKyBtMjEpIC8gcztcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5qyn5ouJ6KeS5L+h5oGv6K6h566X5Zub5YWD5pWw77yM5peL6L2s6aG65bqP5Li6IFlaWFxuICAgICAqICEjZW4gVGhlIHF1YXRlcm5pb24gY2FsY3VsYXRlZCBFdWxlciBhbmdsZSBpbmZvcm1hdGlvbiwgcm90YXRpb24gb3JkZXIgWVpYXG4gICAgICogQG1ldGhvZCBmcm9tRXVsZXJcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21FdWxlcjxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUV1bGVyPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG4gICAgICAgIHggKj0gaGFsZlRvUmFkO1xuICAgICAgICB5ICo9IGhhbGZUb1JhZDtcbiAgICAgICAgeiAqPSBoYWxmVG9SYWQ7XG5cbiAgICAgICAgY29uc3Qgc3ggPSBNYXRoLnNpbih4KTtcbiAgICAgICAgY29uc3QgY3ggPSBNYXRoLmNvcyh4KTtcbiAgICAgICAgY29uc3Qgc3kgPSBNYXRoLnNpbih5KTtcbiAgICAgICAgY29uc3QgY3kgPSBNYXRoLmNvcyh5KTtcbiAgICAgICAgY29uc3Qgc3ogPSBNYXRoLnNpbih6KTtcbiAgICAgICAgY29uc3QgY3ogPSBNYXRoLmNvcyh6KTtcblxuICAgICAgICBvdXQueCA9IHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0LnkgPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dC56ID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXQudyA9IGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6L+U5Zue5a6a5LmJ5q2k5Zub5YWD5pWw55qE5Z2Q5qCH57O7IFgg6L205ZCR6YePXG4gICAgICogISNlbiBUaGlzIHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgcXVhdGVybmlvbiBjb29yZGluYXRlIHN5c3RlbSBYLWF4aXMgdmVjdG9yXG4gICAgICogQG1ldGhvZCB0b0F4aXNYXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0F4aXNYPE91dCBleHRlbmRzIElRdWF0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogVmVjTGlrZSwgcTogT3V0KTogVmVjTGlrZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdG9BeGlzWDxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCkge1xuICAgICAgICBjb25zdCBmeSA9IDIuMCAqIHEueTtcbiAgICAgICAgY29uc3QgZnogPSAyLjAgKiBxLno7XG4gICAgICAgIG91dC54ID0gMS4wIC0gZnkgKiBxLnkgLSBmeiAqIHEuejtcbiAgICAgICAgb3V0LnkgPSBmeSAqIHEueCArIGZ6ICogcS53O1xuICAgICAgICBvdXQueiA9IGZ6ICogcS54ICsgZnkgKiBxLnc7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOi/lOWbnuWumuS5ieatpOWbm+WFg+aVsOeahOWdkOagh+ezuyBZIOi9tOWQkemHj1xuICAgICAqICEjZW4gVGhpcyByZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIHF1YXRlcm5pb24gY29vcmRpbmF0ZSBzeXN0ZW0gWSBheGlzIHZlY3RvclxuICAgICAqIEBtZXRob2QgdG9BeGlzWVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdG9BeGlzWTxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCk6IFZlY0xpa2VcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXhpc1k8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBxOiBPdXQpIHtcbiAgICAgICAgY29uc3QgZnggPSAyLjAgKiBxLng7XG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcbiAgICAgICAgb3V0LnggPSBmeSAqIHEueCAtIGZ6ICogcS53O1xuICAgICAgICBvdXQueSA9IDEuMCAtIGZ4ICogcS54IC0gZnogKiBxLno7XG4gICAgICAgIG91dC56ID0gZnogKiBxLnkgKyBmeCAqIHEudztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6L+U5Zue5a6a5LmJ5q2k5Zub5YWD5pWw55qE5Z2Q5qCH57O7IFog6L205ZCR6YePXG4gICAgICogISNlbiBUaGlzIHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgcXVhdGVybmlvbiBjb29yZGluYXRlIHN5c3RlbSB0aGUgWi1heGlzIHZlY3RvclxuICAgICAqIEBtZXRob2QgdG9BeGlzWlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdG9BeGlzWjxPdXQgZXh0ZW5kcyBJUXVhdExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIHE6IE91dCk6IFZlY0xpa2VcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXhpc1o8T3V0IGV4dGVuZHMgSVF1YXRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBxOiBPdXQpIHtcbiAgICAgICAgY29uc3QgZnggPSAyLjAgKiBxLng7XG4gICAgICAgIGNvbnN0IGZ5ID0gMi4wICogcS55O1xuICAgICAgICBjb25zdCBmeiA9IDIuMCAqIHEuejtcbiAgICAgICAgb3V0LnggPSBmeiAqIHEueCAtIGZ5ICogcS53O1xuICAgICAgICBvdXQueSA9IGZ6ICogcS55IC0gZnggKiBxLnc7XG4gICAgICAgIG91dC56ID0gMS4wIC0gZnggKiBxLnggLSBmeSAqIHEueTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5Zub5YWD5pWw6K6h566X5qyn5ouJ6KeS77yM6L+U5Zue6KeS5bqmIHgsIHkg5ZyoIFstMTgwLCAxODBdIOWMuumXtOWGhSwgeiDpu5jorqTlnKggWy05MCwgOTBdIOWMuumXtOWGhe+8jOaXi+i9rOmhuuW6j+S4uiBZWlhcbiAgICAgKiAhI2VuIFRoZSBxdWF0ZXJuaW9uIGNhbGN1bGF0ZWQgRXVsZXIgYW5nbGVzLCByZXR1cm4gYW5nbGUgeCwgeSBpbiB0aGUgWy0xODAsIDE4MF0gaW50ZXJ2YWwsIHogZGVmYXVsdCB0aGUgcmFuZ2UgWy05MCwgOTBdIGludGVydmFsLCB0aGUgcm90YXRpb24gb3JkZXIgWVpYXG4gICAgICogQG1ldGhvZCB0b0V1bGVyXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0V1bGVyPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UsIG91dGVyWj86IGJvb2xlYW4pOiBPdXRcbiAgICAgKiBAcGFyYW0gb3V0ZXJaIHog5Y+W5YC86IyD5Zu05Yy66Ze05pS55Li6IFstMTgwLCAtOTBdIFUgWzkwLCAxODBdXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0V1bGVyPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBJUXVhdExpa2UsIG91dGVyWj86IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3QgeyB4LCB5LCB6LCB3IH0gPSBxO1xuICAgICAgICBsZXQgYmFuayA9IDA7XG4gICAgICAgIGxldCBoZWFkaW5nID0gMDtcbiAgICAgICAgbGV0IGF0dGl0dWRlID0gMDtcbiAgICAgICAgY29uc3QgdGVzdCA9IHggKiB5ICsgeiAqIHc7XG4gICAgICAgIGlmICh0ZXN0ID4gMC40OTk5OTkpIHtcbiAgICAgICAgICAgIGJhbmsgPSAwOyAvLyBkZWZhdWx0IHRvIHplcm9cbiAgICAgICAgICAgIGhlYWRpbmcgPSB0b0RlZ3JlZSgyICogTWF0aC5hdGFuMih4LCB3KSk7XG4gICAgICAgICAgICBhdHRpdHVkZSA9IDkwO1xuICAgICAgICB9IGVsc2UgaWYgKHRlc3QgPCAtMC40OTk5OTkpIHtcbiAgICAgICAgICAgIGJhbmsgPSAwOyAvLyBkZWZhdWx0IHRvIHplcm9cbiAgICAgICAgICAgIGhlYWRpbmcgPSAtdG9EZWdyZWUoMiAqIE1hdGguYXRhbjIoeCwgdykpO1xuICAgICAgICAgICAgYXR0aXR1ZGUgPSAtOTA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzcXggPSB4ICogeDtcbiAgICAgICAgICAgIGNvbnN0IHNxeSA9IHkgKiB5O1xuICAgICAgICAgICAgY29uc3Qgc3F6ID0geiAqIHo7XG4gICAgICAgICAgICBiYW5rID0gdG9EZWdyZWUoTWF0aC5hdGFuMigyICogeCAqIHcgLSAyICogeSAqIHosIDEgLSAyICogc3F4IC0gMiAqIHNxeikpO1xuICAgICAgICAgICAgaGVhZGluZyA9IHRvRGVncmVlKE1hdGguYXRhbjIoMiAqIHkgKiB3IC0gMiAqIHggKiB6LCAxIC0gMiAqIHNxeSAtIDIgKiBzcXopKTtcbiAgICAgICAgICAgIGF0dGl0dWRlID0gdG9EZWdyZWUoTWF0aC5hc2luKDIgKiB0ZXN0KSk7XG4gICAgICAgICAgICBpZiAob3V0ZXJaKSB7XG4gICAgICAgICAgICAgICAgYmFuayA9IC0xODAgKiBNYXRoLnNpZ24oYmFuayArIDFlLTYpICsgYmFuaztcbiAgICAgICAgICAgICAgICBoZWFkaW5nID0gLTE4MCAqIE1hdGguc2lnbihoZWFkaW5nICsgMWUtNikgKyBoZWFkaW5nO1xuICAgICAgICAgICAgICAgIGF0dGl0dWRlID0gMTgwICogTWF0aC5zaWduKGF0dGl0dWRlICsgMWUtNikgLSBhdHRpdHVkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvdXQueCA9IGJhbms7IG91dC55ID0gaGVhZGluZzsgb3V0LnogPSBhdHRpdHVkZTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWbm+WFg+aVsOetieS7t+WIpOaWrVxuICAgICAqICEjZW4gQW5hbHl6aW5nIHF1YXRlcm5pb24gZXF1aXZhbGVudFxuICAgICAqIEBtZXRob2Qgc3RyaWN0RXF1YWxzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBib29sZWFuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVF1YXRMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56ICYmIGEudyA9PT0gYi53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5Zub5YWD5pWw6L+R5Ly8562J5Lu35Yik5patXG4gICAgICogISNlbiBOZWdhdGl2ZSBmbG9hdGluZyBwb2ludCBlcnJvciBxdWF0ZXJuaW9uIGFwcHJveGltYXRlbHkgZXF1aXZhbGVudCBBbmFseXppbmdcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZXF1YWxzPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEueCAtIGIueCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS54KSwgTWF0aC5hYnMoYi54KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEueSAtIGIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS55KSwgTWF0aC5hYnMoYi55KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEueiAtIGIueikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS56KSwgTWF0aC5hYnMoYi56KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEudyAtIGIudykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS53KSwgTWF0aC5hYnMoYi53KSkpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogISN6aCDlm5vlhYPmlbDovazmlbDnu4RcbiAgICAgKiAhI2VuIFF1YXRlcm5pb24gcm90YXRpb24gYXJyYXlcbiAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIHE6IElRdWF0TGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4TlhoXnmoTotbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIHE6IElRdWF0TGlrZSwgb2ZzID0gMCkge1xuICAgICAgICBvdXRbb2ZzICsgMF0gPSBxLng7XG4gICAgICAgIG91dFtvZnMgKyAxXSA9IHEueTtcbiAgICAgICAgb3V0W29mcyArIDJdID0gcS56O1xuICAgICAgICBvdXRbb2ZzICsgM10gPSBxLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmlbDnu4Tovazlm5vlhYPmlbBcbiAgICAgKiAhI2VuIEFycmF5IHRvIGEgcXVhdGVybmlvblxuICAgICAqIEBtZXRob2QgZnJvbUFycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gb2ZzIOaVsOe7hOi1t+Wni+WBj+enu+mHj1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb2ZzID0gMCkge1xuICAgICAgICBvdXQueCA9IGFycltvZnMgKyAwXTtcbiAgICAgICAgb3V0LnkgPSBhcnJbb2ZzICsgMV07XG4gICAgICAgIG91dC56ID0gYXJyW29mcyArIDJdO1xuICAgICAgICBvdXQudyA9IGFycltvZnMgKyAzXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB4XG4gICAgICovXG4gICAgeDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XG4gICAgICovXG4gICAgeTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6XG4gICAgICovXG4gICAgejogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3XG4gICAgICovXG4gICAgdzogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IgKHg6IFF1YXQgfCBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB6OiBudW1iZXIgPSAwLCB3OiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4Lng7XG4gICAgICAgICAgICB0aGlzLnkgPSB4Lnk7XG4gICAgICAgICAgICB0aGlzLnogPSB4Lno7XG4gICAgICAgICAgICB0aGlzLncgPSB4Lnc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IGFzIG51bWJlcjtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICAgICAgdGhpcy53ID0gdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gY2xvbmUgYSBRdWF0IG9iamVjdCBhbmQgcmV0dXJuIHRoZSBuZXcgb2JqZWN0XG4gICAgICogISN6aCDlhYvpmobkuIDkuKrlm5vlhYPmlbDlubbov5Tlm55cbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHJldHVybiB7UXVhdH1cbiAgICAgKi9cbiAgICBjbG9uZSAoKTogUXVhdCB7XG4gICAgICAgIHJldHVybiBuZXcgUXVhdCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHZhbHVlcyB3aXRoIGFub3RoZXIgcXVhdGVybmlvblxuICAgICAqICEjemgg55So5Y+m5LiA5Liq5Zub5YWD5pWw55qE5YC86K6+572u5Yiw5b2T5YmN5a+56LGh5LiK44CCXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge1F1YXR9IG5ld1ZhbHVlIC0gISNlbiBuZXcgdmFsdWUgdG8gc2V0LiAhI3poIOimgeiuvue9rueahOaWsOWAvFxuICAgICAqIEByZXR1cm4ge1F1YXR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzZXQgKG5ld1ZhbHVlOiBRdWF0KTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IG5ld1ZhbHVlLng7XG4gICAgICAgIHRoaXMueSA9IG5ld1ZhbHVlLnk7XG4gICAgICAgIHRoaXMueiA9IG5ld1ZhbHVlLno7XG4gICAgICAgIHRoaXMudyA9IG5ld1ZhbHVlLnc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciBjdXJyZW50IHF1YXRlcm5pb24gZXF1YWxzIGFub3RoZXJcbiAgICAgKiAhI3poIOW9k+WJjeeahOWbm+WFg+aVsOaYr+WQpuS4juaMh+WumueahOWbm+WFg+aVsOebuOetieOAglxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtRdWF0fSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZXF1YWxzIChvdGhlcjogUXVhdCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueSAmJiB0aGlzLnogPT09IG90aGVyLnogJiYgdGhpcy53ID09PSBvdGhlci53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29udmVydCBxdWF0ZXJuaW9uIHRvIGV1bGVyXG4gICAgICogISN6aCDovazmjaLlm5vlhYPmlbDliLDmrKfmi4nop5JcbiAgICAgKiBAbWV0aG9kIHRvRXVsZXJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dFxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgdG9FdWxlciAob3V0OiBWZWMzKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBRdWF0LnRvRXVsZXIob3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbnZlcnQgZXVsZXIgdG8gcXVhdGVybmlvblxuICAgICAqICEjemgg6L2s5o2i5qyn5ouJ6KeS5Yiw5Zub5YWD5pWwXG4gICAgICogQG1ldGhvZCBmcm9tRXVsZXJcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IGV1bGVyXG4gICAgICogQHJldHVybiB7UXVhdH1cbiAgICAgKi9cbiAgICBmcm9tRXVsZXIgKGV1bGVyOiBWZWMzKTogdGhpcyB7XG4gICAgICAgIHJldHVybiBRdWF0LmZyb21FdWxlcih0aGlzLCBldWxlci54LCBldWxlci55LCBldWxlci56KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENhbGN1bGF0ZSB0aGUgaW50ZXJwb2xhdGlvbiByZXN1bHQgYmV0d2VlbiB0aGlzIHF1YXRlcm5pb24gYW5kIGFub3RoZXIgb25lIHdpdGggZ2l2ZW4gcmF0aW9cbiAgICAgKiAhI3poIOiuoeeul+Wbm+WFg+aVsOeahOaPkuWAvOe7k+aenFxuICAgICAqIEBtZW1iZXIgbGVycFxuICAgICAqIEBwYXJhbSB7UXVhdH0gdG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW9cbiAgICAgKiBAcGFyYW0ge1F1YXR9IFtvdXRdXG4gICAgICogQHJldHVybnMge1F1YXR9IG91dFxuICAgICAqL1xuICAgIGxlcnAgKHRvOiBRdWF0LCByYXRpbzogbnVtYmVyLCBvdXQ/OiBRdWF0KTogUXVhdCB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgUXVhdCgpO1xuICAgICAgICBRdWF0LnNsZXJwKG91dCwgdGhpcywgdG8sIHJhdGlvKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENhbGN1bGF0ZSB0aGUgbXVsdGlwbHkgcmVzdWx0IGJldHdlZW4gdGhpcyBxdWF0ZXJuaW9uIGFuZCBhbm90aGVyIG9uZVxuICAgICAqICEjemgg6K6h566X5Zub5YWD5pWw5LmY56ev55qE57uT5p6cXG4gICAgICogQG1lbWJlciBtdWx0aXBseVxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3RoZXJcbiAgICAgKiBAcmV0dXJucyB7UXVhdH0gdGhpc1xuICAgICAqL1xuICAgIG11bHRpcGx5IChvdGhlcjogUXVhdCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gUXVhdC5tdWx0aXBseSh0aGlzLCB0aGlzLCBvdGhlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgKGluIHJhZGlhbnMpIGFib3V0IGEgd29ybGQgc3BhY2UgYXhpcy5cbiAgICAgKiAhI3poIOWbtOe7leS4lueVjOepuumXtOi9tOaMiee7meWumuW8p+W6puaXi+i9rOWbm+WFg+aVsFxuICAgICAqIEBtZW1iZXIgcm90YXRlQXJvdW5kXG4gICAgICogQHBhcmFtIHtRdWF0fSByb3QgLSBRdWF0ZXJuaW9uIHRvIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7VmVjM30gYXhpcyAtIFRoZSBheGlzIGFyb3VuZCB3aGljaCB0byByb3RhdGUgaW4gd29ybGQgc3BhY2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIC0gQW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICAgICAqIEBwYXJhbSB7UXVhdH0gW291dF0gLSBRdWF0ZXJuaW9uIHRvIHN0b3JlIHJlc3VsdFxuICAgICAqIEByZXR1cm5zIHtRdWF0fSBvdXRcbiAgICAgKi9cbiAgICByb3RhdGVBcm91bmQgKHJvdDogUXVhdCwgYXhpczogVmVjMywgcmFkOiBudW1iZXIsIG91dD86IFF1YXQpOiBRdWF0IHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBRdWF0KCk7XG4gICAgICAgIHJldHVybiBRdWF0LnJvdGF0ZUFyb3VuZChvdXQsIHJvdCwgYXhpcywgcmFkKTtcbiAgICB9XG59XG5cbmNvbnN0IHF0XzEgPSBuZXcgUXVhdCgpO1xuY29uc3QgcXRfMiA9IG5ldyBRdWF0KCk7XG5jb25zdCB2M18xID0gbmV3IFZlYzMoKTtcbmNvbnN0IG0zXzEgPSBuZXcgTWF0MygpO1xuY29uc3QgaGFsZlRvUmFkID0gMC41ICogTWF0aC5QSSAvIDE4MC4wO1xuXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLlF1YXQnLCBRdWF0LCB7IHg6IDAsIHk6IDAsIHo6IDAsIHc6IDEgfSk7XG5cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIlF1YXRcIn19Y2MuUXVhdHt7L2Nyb3NzTGlua319LlxuICogISN6aCDpgJrov4for6XnroDkvr/nmoTlh73mlbDov5vooYzliJvlu7oge3sjY3Jvc3NMaW5rIFwiUXVhdFwifX1jYy5RdWF0e3svY3Jvc3NMaW5rfX0g5a+56LGh44CCXG4gKiBAbWV0aG9kIHF1YXRcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW3g9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbeT0wXVxuICogQHBhcmFtIHtOdW1iZXJ9IFt6PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3c9MV1cbiAqIEByZXR1cm4ge1F1YXR9XG4gKi9cbmNjLnF1YXQgPSBmdW5jdGlvbiBxdWF0ICh4LCB5LCB6LCB3KSB7XG4gICAgcmV0dXJuIG5ldyBRdWF0KHgsIHksIHosIHcpO1xufTtcblxuY2MuUXVhdCA9IFF1YXQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==