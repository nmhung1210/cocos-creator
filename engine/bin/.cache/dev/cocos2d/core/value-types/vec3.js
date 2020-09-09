
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec3.js';
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

var _misc = _interopRequireDefault(require("../utils/misc"));

var _vec = _interopRequireDefault(require("./vec2"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
/**
 * !#en Representation of 3D vectors and points.
 * !#zh 表示 3D 向量和坐标
 *
 * @class Vec3
 * @extends ValueType
 */

var Vec3 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec3, _ValueType);

  var _proto = Vec3.prototype;

  // deprecated

  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method mag
   * @return {number} the result
   * @example
   * var v = cc.v3(10, 10, 10);
   * v.mag(); // return 17.320508075688775;
   */

  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method magSqr
   * @return {number} the result
   */

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.sub = function sub(vector, out) {
    return Vec3.subtract(out || new Vec3(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.mul = function mul(num, out) {
    return Vec3.multiplyScalar(out || new Vec3(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.div = function div(num, out) {
    return Vec3.multiplyScalar(out || new Vec3(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.scale = function scale(vector, out) {
    return Vec3.multiply(out || new Vec3(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  _proto.neg = function neg(out) {
    return Vec3.negate(out || new Vec3(), this);
  }
  /**
   * !#en return a Vec3 object with x = 1, y = 1, z = 1.
   * !#zh 新 Vec3 对象。
   * @property ONE
   * @type Vec3
   * @static
   */
  ;

  /**
   * !#zh 将目标赋值为零向量
   * !#en The target of an assignment zero vector
   * @method zero
   * @typescript
   * zero<Out extends IVec3Like> (out: Out): Out
   * @static
   */
  Vec3.zero = function zero(out) {
    out.x = 0;
    out.y = 0;
    out.z = 0;
    return out;
  }
  /**
   * !#zh 获得指定向量的拷贝
   * !#en Obtaining copy vectors designated
   * @method clone
   * @typescript
   * clone<Out extends IVec3Like> (a: Out): Vec3
   * @static
   */
  ;

  Vec3.clone = function clone(a) {
    return new Vec3(a.x, a.y, a.z);
  }
  /**
   * !#zh 复制目标向量
   * !#en Copy the target vector
   * @method copy
   * @typescript
   * copy<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like): Out
   * @static
   */
  ;

  Vec3.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    return out;
  }
  /**
   * !#zh 设置向量值
   * !#en Set to value
   * @method set
   * @typescript
   * set<Out extends IVec3Like> (out: Out, x: number, y: number, z: number): Out
   * @static
   */
  ;

  Vec3.set = function set(out, x, y, z) {
    out.x = x;
    out.y = y;
    out.z = z;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * !#en Element-wise vector addition
   * @method add
   * @typescript
   * add<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * !#en Element-wise vector subtraction
   * @method subtract
   * @typescript
   * subtract<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法 (分量积)
   * !#en Element-wise vector multiplication (product component)
   * @method multiply
   * @typescript
   * multiply<Out extends IVec3Like, Vec3Like_1 extends IVec3Like, Vec3Like_2 extends IVec3Like> (out: Out, a: Vec3Like_1, b: Vec3Like_2): Out
   * @static
   */
  ;

  Vec3.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * !#en Element-wise vector division
   * @method divide
   * @typescript
   * divide<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    out.z = a.z / b.z;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * !#en Rounding up by elements of the vector
   * @method ceil
   * @typescript
   * ceil<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    out.z = Math.ceil(a.z);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * !#en Element vector by rounding down
   * @method floor
   * @typescript
   * floor<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    out.z = Math.floor(a.z);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * !#en The minimum by-element vector
   * @method min
   * @typescript
   * min<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * !#en The maximum value of the element-wise vector
   * @method max
   * @typescript
   * max<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec3.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * !#en Element-wise vector of rounding to whole
   * @method round
   * @typescript
   * round<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    out.z = Math.round(a.z);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * !#en Vector scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like, b: number): Out
   * @static
   */
  ;

  Vec3.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * !#en Element-wise vector multiply add: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd<Out extends IVec3Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec3.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * !#en Seeking two vectors Euclidean distance
   * @method distance
   * @typescript
   * distance<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.distance = function distance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    _z = b.z - a.z;
    return Math.sqrt(_x * _x + _y * _y + _z * _z);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * !#en Euclidean distance squared seeking two vectors
   * @method squaredDistance
   * @typescript
   * squaredDistance<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.squaredDistance = function squaredDistance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    _z = b.z - a.z;
    return _x * _x + _y * _y + _z * _z;
  }
  /**
   * !#zh 求向量长度
   * !#en Seeking vector length
   * @method len
   * @typescript
   * len<Out extends IVec3Like> (a: Out): number
   * @static
   */
  ;

  Vec3.len = function len(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    return Math.sqrt(_x * _x + _y * _y + _z * _z);
  }
  /**
   * !#zh 求向量长度平方
   * !#en Seeking squared vector length
   * @method lengthSqr
   * @typescript
   * lengthSqr<Out extends IVec3Like> (a: Out): number
   * @static
   */
  ;

  Vec3.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    return _x * _x + _y * _y + _z * _z;
  }
  /**
   * !#zh 逐元素向量取负
   * !#en By taking the negative elements of the vector
   * @method negate
   * @typescript
   * negate<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * !#en Element vector by taking the inverse, return near 0 Infinity
   * @method inverse
   * @typescript
   * inverse<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    out.z = 1.0 / a.z;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * !#en Element vector by taking the inverse, return near 0 0
   * @method inverseSafe
   * @typescript
   * inverseSafe<Out extends IVec3Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec3.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;

    if (Math.abs(_x) < _utils.EPSILON) {
      out.x = 0;
    } else {
      out.x = 1.0 / _x;
    }

    if (Math.abs(_y) < _utils.EPSILON) {
      out.y = 0;
    } else {
      out.y = 1.0 / _y;
    }

    if (Math.abs(_z) < _utils.EPSILON) {
      out.z = 0;
    } else {
      out.z = 1.0 / _z;
    }

    return out;
  }
  /**
   * !#zh 归一化向量
   * !#en Normalized vector
   * @method normalize
   * @typescript
   * normalize<Out extends IVec3Like, Vec3Like extends IVec3Like> (out: Out, a: Vec3Like): Out
   * @static
   */
  ;

  Vec3.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var len = _x * _x + _y * _y + _z * _z;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * !#en Vector dot product (scalar product)
   * @method dot
   * @typescript
   * dot<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }
  /**
   * !#zh 向量叉积（向量积）
   * !#en Vector cross product (vector product)
   * @method cross
   * @typescript
   * cross<Out extends IVec3Like, Vec3Like_1 extends IVec3Like, Vec3Like_2 extends IVec3Like> (out: Out, a: Vec3Like_1, b: Vec3Like_2): Out
   * @static
   */
  ;

  Vec3.cross = function cross(out, a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z;
    var bx = b.x,
        by = b.y,
        bz = b.z;
    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;
    return out;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * !#en Vector element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp<Out extends IVec3Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec3.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    return out;
  }
  /**
   * !#zh 生成一个在单位球体上均匀分布的随机向量
   * !#en Generates a uniformly distributed random vectors on the unit sphere
   * @method random
   * @typescript
   * random<Out extends IVec3Like> (out: Out, scale?: number): Out
   * @param scale 生成的向量长度
   * @static
   */
  ;

  Vec3.random = function random(out, scale) {
    scale = scale || 1.0;
    var phi = (0, _utils.random)() * 2.0 * Math.PI;
    var cosTheta = (0, _utils.random)() * 2 - 1;
    var sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    out.x = sinTheta * Math.cos(phi) * scale;
    out.y = sinTheta * Math.sin(phi) * scale;
    out.z = cosTheta * scale;
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第四位为 1。
   * !#en Four-dimensional vector and matrix multiplication, the default vectors fourth one.
   * @method transformMat4
   * @typescript
   * transformMat4<Out extends IVec3Like, Vec3Like extends IVec3Like, MatLike extends IMat4Like> (out: Out, a: Vec3Like, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    var rhw = m[3] * _x + m[7] * _y + m[11] * _z + m[15];
    rhw = rhw ? 1 / rhw : 1;
    out.x = (m[0] * _x + m[4] * _y + m[8] * _z + m[12]) * rhw;
    out.y = (m[1] * _x + m[5] * _y + m[9] * _z + m[13]) * rhw;
    out.z = (m[2] * _x + m[6] * _y + m[10] * _z + m[14]) * rhw;
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第四位为 0。
   * !#en Four-dimensional vector and matrix multiplication, vector fourth default is 0.
   * @method transformMat4Normal
   * @typescript
   * transformMat4Normal<Out extends IVec3Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat4Normal = function transformMat4Normal(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    var rhw = m[3] * _x + m[7] * _y + m[11] * _z;
    rhw = rhw ? 1 / rhw : 1;
    out.x = (m[0] * _x + m[4] * _y + m[8] * _z) * rhw;
    out.y = (m[1] * _x + m[5] * _y + m[9] * _z) * rhw;
    out.z = (m[2] * _x + m[6] * _y + m[10] * _z) * rhw;
    return out;
  }
  /**
   * !#zh 向量与三维矩阵乘法
   * !#en Dimensional vector matrix multiplication
   * @method transformMat3
   * @typescript
   * transformMat3<Out extends IVec3Like, MatLike extends IMat3Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformMat3 = function transformMat3(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    var m = mat.m;
    out.x = _x * m[0] + _y * m[3] + _z * m[6];
    out.y = _x * m[1] + _y * m[4] + _z * m[7];
    out.z = _x * m[2] + _y * m[5] + _z * m[8];
    return out;
  }
  /**
   * !#zh 向量仿射变换
   * !#en Affine transformation vector
   * @method transformAffine
   * @typescript
   * transformAffine<Out extends IVec3Like, VecLike extends IVec3Like, MatLike extends IMat4Like>(out: Out, v: VecLike, mat: MatLike): Out
   * @static
   */
  ;

  Vec3.transformAffine = function transformAffine(out, v, mat) {
    _x = v.x;
    _y = v.y;
    _z = v.z;
    var m = mat.m;
    out.x = m[0] * _x + m[1] * _y + m[2] * _z + m[3];
    out.y = m[4] * _x + m[5] * _y + m[6] * _z + m[7];
    out.x = m[8] * _x + m[9] * _y + m[10] * _z + m[11];
    return out;
  }
  /**
   * !#zh 向量四元数乘法
   * !#en Vector quaternion multiplication
   * @method transformQuat
   * @typescript
   * transformQuat<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike> (out: Out, a: VecLike, q: QuatLike): Out
   * @static
   */
  ;

  Vec3.transformQuat = function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-Vec3-implementations
    // calculate quat * vec
    var ix = q.w * a.x + q.y * a.z - q.z * a.y;
    var iy = q.w * a.y + q.z * a.x - q.x * a.z;
    var iz = q.w * a.z + q.x * a.y - q.y * a.x;
    var iw = -q.x * a.x - q.y * a.y - q.z * a.z; // calculate result * inverse quat

    out.x = ix * q.w + iw * -q.x + iy * -q.z - iz * -q.y;
    out.y = iy * q.w + iw * -q.y + iz * -q.x - ix * -q.z;
    out.z = iz * q.w + iw * -q.z + ix * -q.y - iy * -q.x;
    return out;
  }
  /**
   * !#zh 以缩放 -> 旋转 -> 平移顺序变换向量
   * !#en To scale -> rotation -> transformation vector sequence translation
   * @method transformQuat
   * @typescript
   * transformRTS<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike>(out: Out, a: VecLike, r: QuatLike, t: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Vec3.transformRTS = function transformRTS(out, a, r, t, s) {
    var x = a.x * s.x;
    var y = a.y * s.y;
    var z = a.z * s.z;
    var ix = r.w * x + r.y * z - r.z * y;
    var iy = r.w * y + r.z * x - r.x * z;
    var iz = r.w * z + r.x * y - r.y * x;
    var iw = -r.x * x - r.y * y - r.z * z;
    out.x = ix * r.w + iw * -r.x + iy * -r.z - iz * -r.y + t.x;
    out.y = iy * r.w + iw * -r.y + iz * -r.x - ix * -r.z + t.y;
    out.z = iz * r.w + iw * -r.z + ix * -r.y - iy * -r.x + t.z;
    return out;
  }
  /**
   * !#zh 以平移 -> 旋转 -> 缩放顺序逆变换向量
   * !#en Translational -> rotation -> Zoom inverse transformation vector sequence
   * @method transformInverseRTS
   * @typescript
   * transformInverseRTS<Out extends IVec3Like, VecLike extends IVec3Like, QuatLike extends IQuatLike>(out: Out, a: VecLike, r: QuatLike, t: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Vec3.transformInverseRTS = function transformInverseRTS(out, a, r, t, s) {
    var x = a.x - t.x;
    var y = a.y - t.y;
    var z = a.z - t.z;
    var ix = r.w * x - r.y * z + r.z * y;
    var iy = r.w * y - r.z * x + r.x * z;
    var iz = r.w * z - r.x * y + r.y * x;
    var iw = r.x * x + r.y * y + r.z * z;
    out.x = (ix * r.w + iw * r.x + iy * r.z - iz * r.y) / s.x;
    out.y = (iy * r.w + iw * r.y + iz * r.x - ix * r.z) / s.y;
    out.z = (iz * r.w + iw * r.z + ix * r.y - iy * r.x) / s.z;
    return out;
  }
  /**
   * !#zh 绕 X 轴旋转向量指定弧度
   * !#en Rotation vector specified angle about the X axis
   * @method rotateX
   * @typescript
   * rotateX<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateX = function rotateX(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _x;
    var ry = _y * cos - _z * sin;
    var rz = _y * sin + _z * cos; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 绕 Y 轴旋转向量指定弧度
   * !#en Rotation vector specified angle around the Y axis
   * @method rotateY
   * @typescript
   * rotateY<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateY = function rotateY(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _z * sin + _x * cos;
    var ry = _y;
    var rz = _z * cos - _x * sin; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 绕 Z 轴旋转向量指定弧度
   * !#en Around the Z axis specified angle vector
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IVec3Like> (out: Out, v: Out, o: Out, a: number): Out
   * @param v 待旋转向量
   * @param o 旋转中心
   * @param a 旋转弧度
   * @static
   */
  ;

  Vec3.rotateZ = function rotateZ(out, v, o, a) {
    // Translate point to the origin
    _x = v.x - o.x;
    _y = v.y - o.y;
    _z = v.z - o.z; // perform rotation

    var cos = Math.cos(a);
    var sin = Math.sin(a);
    var rx = _x * cos - _y * sin;
    var ry = _x * sin + _y * cos;
    var rz = _z; // translate to correct position

    out.x = rx + o.x;
    out.y = ry + o.y;
    out.z = rz + o.z;
    return out;
  }
  /**
   * !#zh 向量等价判断
   * !#en Equivalent vectors Analyzing
   * @method strictEquals
   * @typescript
   * strictEquals<Out extends IVec3Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec3.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * !#en Negative error vector floating point approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals<Out extends IVec3Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Vec3.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    var a0 = a.x,
        a1 = a.y,
        a2 = a.z;
    var b0 = b.x,
        b1 = b.y,
        b2 = b.z;
    return Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2));
  }
  /**
   * !#zh 求两向量夹角弧度
   * !#en Radian angle between two vectors seek
   * @method angle
   * @typescript
   * angle<Out extends IVec3Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec3.angle = function angle(a, b) {
    Vec3.normalize(v3_1, a);
    Vec3.normalize(v3_2, b);
    var cosine = Vec3.dot(v3_1, v3_2);

    if (cosine > 1.0) {
      return 0;
    }

    if (cosine < -1.0) {
      return Math.PI;
    }

    return Math.acos(cosine);
  }
  /**
   * !#zh 计算向量在指定平面上的投影
   * !#en Calculating a projection vector in the specified plane
   * @method projectOnPlane
   * @typescript
   * projectOnPlane<Out extends IVec3Like> (out: Out, a: Out, n: Out): Out
   * @param a 待投影向量
   * @param n 指定平面的法线
   * @static
   */
  ;

  Vec3.projectOnPlane = function projectOnPlane(out, a, n) {
    return Vec3.subtract(out, a, Vec3.project(out, a, n));
  }
  /**
   * !#zh 计算向量在指定向量上的投影
   * !#en Projection vector calculated in the vector designated
   * @method project
   * @typescript
   * project<Out extends IVec3Like> (out: Out, a: Out, b: Out): Out
   * @param a 待投影向量
   * @param n 目标向量
   * @static
   */
  ;

  Vec3.project = function project(out, a, b) {
    var sqrLen = Vec3.lengthSqr(b);

    if (sqrLen < 0.000001) {
      return Vec3.set(out, 0, 0, 0);
    } else {
      return Vec3.multiplyScalar(out, b, Vec3.dot(a, b) / sqrLen);
    }
  }
  /**
   * !#zh 向量转数组
   * !#en Vector transfer array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec3Like, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec3.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    out[ofs + 2] = v.z;
    return out;
  }
  /**
   * !#zh 数组转向量
   * !#en Array steering amount
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec3Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec3.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    out.z = arr[ofs + 2];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  _createClass(Vec3, null, [{
    key: "ONE",
    get: function get() {
      return new Vec3(1, 1, 1);
    }
  }, {
    key: "ZERO",

    /**
     * !#en return a Vec3 object with x = 0, y = 0, z = 0.
     * !#zh 返回 x = 0，y = 0，z = 0 的 Vec3 对象。
     * @property ZERO
     * @type Vec3
     * @static
     */
    get: function get() {
      return new Vec3();
    }
  }, {
    key: "UP",

    /**
     * !#en return a Vec3 object with x = 0, y = 1, z = 0.
     * !#zh 返回 x = 0, y = 1, z = 0 的 Vec3 对象。
     * @property UP
     * @type Vec3
     * @static
     */
    get: function get() {
      return new Vec3(0, 1, 0);
    }
  }, {
    key: "RIGHT",

    /**
     * !#en return a Vec3 object with x = 1, y = 0, z = 0.
     * !#zh 返回 x = 1，y = 0，z = 0 的 Vec3 对象。
     * @property RIGHT
     * @type Vec3
     * @static
     */
    get: function get() {
      return new Vec3(1, 0, 0);
    }
  }, {
    key: "FORWARD",

    /**
     * !#en return a Vec3 object with x = 0, y = 0, z = 1.
     * !#zh 返回 x = 0，y = 0，z = 1 的 Vec3 对象。
     * @property FORWARD
     * @type Vec3
     * @static
     */
    get: function get() {
      return new Vec3(0, 0, 1);
    }
  }]);

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec3:method"}}cc.v3{{/crossLink}}
   * @method constructor
   * @param {Vec3|number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   */
  function Vec3(x, y, z) {
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

    _this = _ValueType.call(this) || this;
    _this.mag = Vec3.prototype.len;
    _this.magSqr = Vec3.prototype.lengthSqr;
    _this.subSelf = Vec3.prototype.subtract;
    _this.mulSelf = Vec3.prototype.multiplyScalar;
    _this.divSelf = Vec3.prototype.divide;
    _this.scaleSelf = Vec3.prototype.multiply;
    _this.negSelf = Vec3.prototype.negate;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = void 0;
    _this.angle = _vec["default"].prototype.angle;
    _this.project = _vec["default"].prototype.project;

    if (x && typeof x === 'object') {
      _this.x = x.x;
      _this.y = x.y;
      _this.z = x.z;
    } else {
      _this.x = x;
      _this.y = y;
      _this.z = z;
    }

    return _this;
  }
  /**
   * !#en clone a Vec3 value
   * !#zh 克隆一个 Vec3 值
   * @method clone
   * @return {Vec3}
   */


  _proto.clone = function clone() {
    return new Vec3(this.x, this.y, this.z);
  }
  /**
   * !#en Set the current vector value with the given vector.
   * !#zh 用另一个向量设置当前的向量对象值。
   * @method set
   * @param {Vec3} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    this.z = newValue.z;
    return this;
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec3} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.z === other.z;
  }
  /**
   * !#en Check whether two vector equal with some degree of variance.
   * !#zh
   * 近似判断两个点是否相等。<br/>
   * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Vec3} other
   * @param {Number} variance
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other, variance) {
    if (this.x - variance <= other.x && other.x <= this.x + variance) {
      if (this.y - variance <= other.y && other.y <= this.y + variance) {
        if (this.z - variance <= other.z && other.z <= this.z + variance) return true;
      }
    }

    return false;
  }
  /**
   * !#en Transform to string with vector informations
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ")";
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 线性插值。
   * @method lerp
   * @param {Vec3} to
   * @param {number} ratio - the interpolation coefficient
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Vec3();
    Vec3.lerp(out, this, to, ratio);
    return out;
  }
  /**
   * !#en Clamp the vector between from float and to float.
   * !#zh
   * 返回指定限制区域后的向量。<br/>
   * 向量大于 max_inclusive 则返回 max_inclusive。<br/>
   * 向量小于 min_inclusive 则返回 min_inclusive。<br/>
   * 否则返回自身。
   * @method clampf
   * @param {Vec3} min_inclusive
   * @param {Vec3} max_inclusive
   * @return {Vec3}
   */
  ;

  _proto.clampf = function clampf(min_inclusive, max_inclusive) {
    this.x = _misc["default"].clampf(this.x, min_inclusive.x, max_inclusive.x);
    this.y = _misc["default"].clampf(this.y, min_inclusive.y, max_inclusive.y);
    this.z = _misc["default"].clampf(this.z, min_inclusive.z, max_inclusive.z);
    return this;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  }
  /**
   * !#en Adds two vectors, and returns the new result.
   * !#zh 向量加法，并返回新结果。
   * @method add
   * @param {Vec3} vector
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} the result
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec3();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    out.z = this.z + vector.z;
    return out;
  }
  /**
   * !#en Subtracts one vector from this.
   * !#zh 向量减法。
   * @method subtract
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.subtract = function subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec3} vector
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反。
   * @method negate
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec3} [vector]
   * @return {number} the result
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec3} vector
   * @param {Vec3} [out]
   * @return {Vec3} the result
   */
  ;

  _proto.cross = function cross(vector, out) {
    out = out || new Vec3();
    Vec3.cross(out, this, vector);
    return out;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v3(10, 10, 10);
   * v.len(); // return 17.320508075688775;
   */
  ;

  _proto.len = function len() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec3} returns this
   * @chainable
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    Vec3.normalize(this, this);
    return this;
  };

  /**
   * !#en
   * Returns this vector with a magnitude of 1.<br/>
   * <br/>
   * Note that the current vector is unchanged and a new normalized vector is returned. If you want to normalize the current vector, use normalizeSelf function.
   * !#zh
   * 返回归一化后的向量。<br/>
   * <br/>
   * 注意，当前向量不变，并返回一个新的归一化向量。如果你想来归一化当前向量，可使用 normalizeSelf 函数。
   * @method normalize
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @return {Vec3} result
   */
  _proto.normalize = function normalize(out) {
    out = out || new Vec3();
    Vec3.normalize(out, this);
    return out;
  }
  /**
   * Transforms the vec3 with a mat4. 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec3} [out] the receiving vector, you can pass the same vec3 to save result to itself, if not provided, a new vec3 will be created
   * @returns {Vec3} out
   */
  ;

  _proto.transformMat4 = function transformMat4(m, out) {
    out = out || new Vec3();
    Vec3.transformMat4(out, this, m);
    return out;
  }
  /**
   * Returns the maximum value in x, y, and z
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y, this.z);
  }
  /**
   * !#en Get angle in radian between this and vector.
   * !#zh 夹角的弧度。
   * @method angle
   * @param {Vec3} vector
   * @return {number} from 0 to Math.PI
   */
  ;

  // Compatible with the vec2 API

  /**
   * !#en Get angle in radian between this and vector with direction. <br/>
   * In order to compatible with the vec2 API.
   * !#zh 带方向的夹角的弧度。该方法仅用做兼容 2D 计算。
   * @method signAngle
   * @param {Vec3 | Vec2} vector
   * @return {number} from -MathPI to Math.PI
   * @deprecated
   */
  _proto.signAngle = function signAngle(vector) {
    cc.warnID(1408, 'vec3.signAngle', 'v2.1', 'cc.v2(selfVector).signAngle(vector)');
    var vec1 = new _vec["default"](this.x, this.y);
    var vec2 = new _vec["default"](vector.x, vector.y);
    return vec1.signAngle(vec2);
  }
  /**
   * !#en rotate. In order to compatible with the vec2 API.
   * !#zh 返回旋转给定弧度后的新向量。该方法仅用做兼容 2D 计算。
   * @method rotate
   * @param {number} radians
   * @param {Vec3} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2 | Vec3} if the 'out' value is a vec3 you will get a Vec3 return.
   * @deprecated
   */
  ;

  _proto.rotate = function rotate(radians, out) {
    cc.warnID(1408, 'vec3.rotate', 'v2.1', 'cc.v2(selfVector).rotate(radians, out)');
    return _vec["default"].prototype.rotate.call(this, radians, out);
  }
  /**
   * !#en rotate self. In order to compatible with the vec2 API.
   * !#zh 按指定弧度旋转向量。该方法仅用做兼容 2D 计算。
   * @method rotateSelf
   * @param {number} radians
   * @return {Vec3} returns this
   * @chainable
   * @deprecated
   */
  ;

  _proto.rotateSelf = function rotateSelf(radians) {
    cc.warnID(1408, 'vec3.rotateSelf', 'v2.1', 'cc.v2(selfVector).rotateSelf(radians)');
    return _vec["default"].prototype.rotateSelf.call(this, radians);
  };

  return Vec3;
}(_valueType["default"]);

exports["default"] = Vec3;
Vec3.sub = Vec3.subtract;
Vec3.mul = Vec3.multiply;
Vec3.scale = Vec3.multiplyScalar;
Vec3.mag = Vec3.len;
Vec3.squaredMagnitude = Vec3.lengthSqr;
Vec3.div = Vec3.divide;
Vec3.ONE_R = Vec3.ONE;
Vec3.ZERO_R = Vec3.ZERO;
Vec3.UP_R = Vec3.UP;
Vec3.RIGHT_R = Vec3.RIGHT;
Vec3.FRONT_R = Vec3.FORWARD;
var v3_1 = new Vec3();
var v3_2 = new Vec3();

_CCClass["default"].fastDefine('cc.Vec3', Vec3, {
  x: 0,
  y: 0,
  z: 0
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Vec3"}}cc.Vec3{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec3"}}cc.Vec3{{/crossLink}} 对象。
 * @method v3
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [z=0]
 * @return {Vec3}
 * @example
 * var v1 = cc.v3();
 * var v2 = cc.v3(0, 0, 0);
 * var v3 = cc.v3(v2);
 * var v4 = cc.v3({x: 100, y: 100, z: 0});
 */


cc.v3 = function v3(x, y, z) {
  return new Vec3(x, y, z);
};

cc.Vec3 = Vec3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3ZlYzMudHMiXSwibmFtZXMiOlsiX3giLCJfeSIsIl96IiwiVmVjMyIsInN1YiIsInZlY3RvciIsIm91dCIsInN1YnRyYWN0IiwibXVsIiwibnVtIiwibXVsdGlwbHlTY2FsYXIiLCJkaXYiLCJzY2FsZSIsIm11bHRpcGx5IiwibmVnIiwibmVnYXRlIiwiemVybyIsIngiLCJ5IiwieiIsImNsb25lIiwiYSIsImNvcHkiLCJzZXQiLCJhZGQiLCJiIiwiZGl2aWRlIiwiY2VpbCIsIk1hdGgiLCJmbG9vciIsIm1pbiIsIm1heCIsInJvdW5kIiwic2NhbGVBbmRBZGQiLCJkaXN0YW5jZSIsInNxcnQiLCJzcXVhcmVkRGlzdGFuY2UiLCJsZW4iLCJsZW5ndGhTcXIiLCJpbnZlcnNlIiwiaW52ZXJzZVNhZmUiLCJhYnMiLCJFUFNJTE9OIiwibm9ybWFsaXplIiwiZG90IiwiY3Jvc3MiLCJheCIsImF5IiwiYXoiLCJieCIsImJ5IiwiYnoiLCJsZXJwIiwidCIsInJhbmRvbSIsInBoaSIsIlBJIiwiY29zVGhldGEiLCJzaW5UaGV0YSIsImNvcyIsInNpbiIsInRyYW5zZm9ybU1hdDQiLCJtYXQiLCJtIiwicmh3IiwidHJhbnNmb3JtTWF0NE5vcm1hbCIsInRyYW5zZm9ybU1hdDMiLCJ0cmFuc2Zvcm1BZmZpbmUiLCJ2IiwidHJhbnNmb3JtUXVhdCIsInEiLCJpeCIsInciLCJpeSIsIml6IiwiaXciLCJ0cmFuc2Zvcm1SVFMiLCJyIiwicyIsInRyYW5zZm9ybUludmVyc2VSVFMiLCJyb3RhdGVYIiwibyIsInJ4IiwicnkiLCJyeiIsInJvdGF0ZVkiLCJyb3RhdGVaIiwic3RyaWN0RXF1YWxzIiwiZXF1YWxzIiwiZXBzaWxvbiIsImEwIiwiYTEiLCJhMiIsImIwIiwiYjEiLCJiMiIsImFuZ2xlIiwidjNfMSIsInYzXzIiLCJjb3NpbmUiLCJhY29zIiwicHJvamVjdE9uUGxhbmUiLCJuIiwicHJvamVjdCIsInNxckxlbiIsInRvQXJyYXkiLCJvZnMiLCJmcm9tQXJyYXkiLCJhcnIiLCJtYWciLCJwcm90b3R5cGUiLCJtYWdTcXIiLCJzdWJTZWxmIiwibXVsU2VsZiIsImRpdlNlbGYiLCJzY2FsZVNlbGYiLCJuZWdTZWxmIiwiVmVjMiIsIm5ld1ZhbHVlIiwib3RoZXIiLCJmdXp6eUVxdWFscyIsInZhcmlhbmNlIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwidG8iLCJyYXRpbyIsImNsYW1wZiIsIm1pbl9pbmNsdXNpdmUiLCJtYXhfaW5jbHVzaXZlIiwibWlzYyIsImFkZFNlbGYiLCJub3JtYWxpemVTZWxmIiwibWF4QXhpcyIsInNpZ25BbmdsZSIsImNjIiwid2FybklEIiwidmVjMSIsInZlYzIiLCJyb3RhdGUiLCJyYWRpYW5zIiwiY2FsbCIsInJvdGF0ZVNlbGYiLCJWYWx1ZVR5cGUiLCJzcXVhcmVkTWFnbml0dWRlIiwiT05FX1IiLCJPTkUiLCJaRVJPX1IiLCJaRVJPIiwiVVBfUiIsIlVQIiwiUklHSFRfUiIsIlJJR0hUIiwiRlJPTlRfUiIsIkZPUldBUkQiLCJDQ0NsYXNzIiwiZmFzdERlZmluZSIsInYzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBRUE7Ozs7Ozs7O0lBUXFCQzs7Ozs7QUFDakI7O0FBUUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7OztBQU9BOzs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7U0FRQUMsTUFBQSxhQUFLQyxNQUFMLEVBQW1CQyxHQUFuQixFQUErQjtBQUMzQixXQUFPSCxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBRyxJQUFJLElBQUlILElBQUosRUFBckIsRUFBaUMsSUFBakMsRUFBdUNFLE1BQXZDLENBQVA7QUFDSDtBQUNEOzs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7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LENBQUM4STtBQXJJWjlJLEtBK0lEK0ksU0FBUy9JLElBQUksQ0FBQ2dKO0FBL0liaEosS0F5SkRpSixPQUFPakosSUFBSSxDQUFDa0o7QUF6SlhsSixLQW1LRG1KLFVBQVVuSixJQUFJLENBQUNvSjtBQW5LZHBKLEtBNktEcUosVUFBVXJKLElBQUksQ0FBQ3NKO0FBdXNDbkMsSUFBTXhELElBQUksR0FBRyxJQUFJOUYsSUFBSixFQUFiO0FBQ0EsSUFBTStGLElBQUksR0FBRyxJQUFJL0YsSUFBSixFQUFiOztBQUVBdUosb0JBQVFDLFVBQVIsQ0FBbUIsU0FBbkIsRUFBOEJ4SixJQUE5QixFQUFvQztBQUFFYyxFQUFBQSxDQUFDLEVBQUUsQ0FBTDtBQUFRQyxFQUFBQSxDQUFDLEVBQUUsQ0FBWDtBQUFjQyxFQUFBQSxDQUFDLEVBQUU7QUFBakIsQ0FBcEM7QUFFQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBY0FtSCxFQUFFLENBQUNzQixFQUFILEdBQVEsU0FBU0EsRUFBVCxDQUFhM0ksQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCO0FBQzFCLFNBQU8sSUFBSWhCLElBQUosQ0FBU2MsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBUDtBQUNILENBRkQ7O0FBSUFtSCxFQUFFLENBQUNuSSxJQUFILEdBQVVBLElBQVYiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xuaW1wb3J0IG1pc2MgZnJvbSAnLi4vdXRpbHMvbWlzYyc7XG5pbXBvcnQgVmVjMiBmcm9tICcuL3ZlYzInO1xuaW1wb3J0IE1hdDQgZnJvbSAnLi9tYXQ0JztcbmltcG9ydCB7IEVQU0lMT04sIHJhbmRvbSB9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgX3g6IG51bWJlciA9IDAuMDtcbmxldCBfeTogbnVtYmVyID0gMC4wO1xubGV0IF96OiBudW1iZXIgPSAwLjA7XG5cbi8qKlxuICogISNlbiBSZXByZXNlbnRhdGlvbiBvZiAzRCB2ZWN0b3JzIGFuZCBwb2ludHMuXG4gKiAhI3poIOihqOekuiAzRCDlkJHph4/lkozlnZDmoIdcbiAqXG4gKiBAY2xhc3MgVmVjM1xuICogQGV4dGVuZHMgVmFsdWVUeXBlXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjMyBleHRlbmRzIFZhbHVlVHlwZSB7XG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIHN0YXRpYyBzdWIgICA9IFZlYzMuc3VidHJhY3Q7XG4gICAgc3RhdGljIG11bCAgID0gVmVjMy5tdWx0aXBseTtcbiAgICBzdGF0aWMgc2NhbGUgPSBWZWMzLm11bHRpcGx5U2NhbGFyO1xuICAgIHN0YXRpYyBtYWcgICA9IFZlYzMubGVuO1xuICAgIHN0YXRpYyBzcXVhcmVkTWFnbml0dWRlID0gVmVjMy5sZW5ndGhTcXI7XG4gICAgc3RhdGljIGRpdiA9IFZlYzMuZGl2aWRlO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqbjgIJcbiAgICAgKiBAbWV0aG9kIG1hZ1xuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MygxMCwgMTAsIDEwKTtcbiAgICAgKiB2Lm1hZygpOyAvLyByZXR1cm4gMTcuMzIwNTA4MDc1Njg4Nzc1O1xuICAgICAqL1xuICAgIG1hZyAgPSBWZWMzLnByb3RvdHlwZS5sZW47XG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puW5s+aWueOAglxuICAgICAqIEBtZXRob2QgbWFnU3FyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbWFnU3FyID0gVmVjMy5wcm90b3R5cGUubGVuZ3RoU3FyO1xuICAgIC8qKlxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIHN1YigpIGluc3RlYWQuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XjgILlpoLmnpzkvaDmg7Pkv53lrZjnu5PmnpzliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggc3ViKCkg5Luj5pu/44CCXG4gICAgICogQG1ldGhvZCBzdWJTZWxmXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc3ViU2VsZiAgPSBWZWMzLnByb3RvdHlwZS5zdWJ0cmFjdDtcbiAgICAvKipcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XvvIzlubbov5Tlm57mlrDnu5PmnpzjgIJcbiAgICAgKiBAbWV0aG9kIHN1YlxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWMzfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzMgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzMgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjM30gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIHN1YiAodmVjdG9yOiBWZWMzLCBvdXQ/OiBWZWMzKSB7XG4gICAgICAgIHJldHVybiBWZWMzLnN1YnRyYWN0KG91dCB8fCBuZXcgVmVjMygpLCB0aGlzLCB2ZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdGhpcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBtdWwoKSBpbnN0ZWFkLlxuICAgICAqICEjemgg57yp5pS+5b2T5YmN5ZCR6YeP44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIG11bCgpIOS7o+abv+OAglxuICAgICAqIEBtZXRob2QgbXVsU2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgbXVsU2VsZiAgPSBWZWMzLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhcjtcbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgYnkgYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg57yp5pS+5ZCR6YeP77yM5bm26L+U5Zue5paw57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBtdWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHBhcmFtIHtWZWMzfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzMgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzMgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjM30gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIG11bCAobnVtOiBudW1iZXIsIG91dD86IFZlYzMpIHtcbiAgICAgICAgcmV0dXJuIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0IHx8IG5ldyBWZWMzKCksIHRoaXMsIG51bSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBkaXYoKSBpbnN0ZWFkLlxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIGRpdigpIOS7o+abv+OAglxuICAgICAqIEBtZXRob2QgZGl2U2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgZGl2U2VsZiAgPSBWZWMzLnByb3RvdHlwZS5kaXZpZGU7XG4gICAgLyoqXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cbiAgICAgKiAhI3poIOWQkemHj+mZpOazle+8jOW5tui/lOWbnuaWsOeahOe7k+aenOOAglxuICAgICAqIEBtZXRob2QgZGl2XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBkaXYgKG51bTogbnVtYmVyLCBvdXQ/OiBWZWMzKTogVmVjMyB7XG4gICAgICAgIHJldHVybiBWZWMzLm11bHRpcGx5U2NhbGFyKG91dCB8fCBuZXcgVmVjMygpLCB0aGlzLCAxL251bSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0d28gdmVjdG9ycy5cbiAgICAgKiAhI3poIOWIhumHj+ebuOS5mOOAglxuICAgICAqIEBtZXRob2Qgc2NhbGVTZWxmXG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc2NhbGVTZWxmID0gVmVjMy5wcm90b3R5cGUubXVsdGlwbHk7XG4gICAgLyoqXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHR3byB2ZWN0b3JzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cbiAgICAgKiAhI3poIOWIhumHj+ebuOS5mO+8jOW5tui/lOWbnuaWsOeahOe7k+aenOOAglxuICAgICAqIEBtZXRob2Qgc2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBzY2FsZSAodmVjdG9yOiBWZWMzLCBvdXQ/OiBWZWMzKSB7XG4gICAgICAgIHJldHVybiBWZWMzLm11bHRpcGx5KG91dCB8fCBuZXcgVmVjMygpLCB0aGlzLCB2ZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgbmVnKCkgaW5zdGVhZC5cbiAgICAgKiAhI3poIOWQkemHj+WPluWPjeOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBuZWcoKSDku6Pmm7/jgIJcbiAgICAgKiBAbWV0aG9kIG5lZ1NlbGZcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgbmVnU2VsZiA9IFZlYzMucHJvdG90eXBlLm5lZ2F0ZTtcbiAgICAvKipcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg6L+U5Zue5Y+W5Y+N5ZCO55qE5paw5ZCR6YeP44CCXG4gICAgICogQG1ldGhvZCBuZWdcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbmVnIChvdXQ/OiBWZWMzKSB7XG4gICAgICAgIHJldHVybiBWZWMzLm5lZ2F0ZShvdXQgfHwgbmV3IFZlYzMoKSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMzIG9iamVjdCB3aXRoIHggPSAxLCB5ID0gMSwgeiA9IDEuXG4gICAgICogISN6aCDmlrAgVmVjMyDlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkgT05FXG4gICAgICogQHR5cGUgVmVjM1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IE9ORSAoKSB7IHJldHVybiBuZXcgVmVjMygxLCAxLCAxKTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBPTkVfUiA9IFZlYzMuT05FO1xuXG4gICAgLyoqXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMzIG9iamVjdCB3aXRoIHggPSAwLCB5ID0gMCwgeiA9IDAuXG4gICAgICogISN6aCDov5Tlm54geCA9IDDvvIx5ID0gMO+8jHogPSAwIOeahCBWZWMzIOWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXG4gICAgICogQHR5cGUgVmVjM1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IFpFUk8gKCkgeyByZXR1cm4gbmV3IFZlYzMoKTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBaRVJPX1IgPSBWZWMzLlpFUk87XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzMgb2JqZWN0IHdpdGggeCA9IDAsIHkgPSAxLCB6ID0gMC5cbiAgICAgKiAhI3poIOi/lOWbniB4ID0gMCwgeSA9IDEsIHogPSAwIOeahCBWZWMzIOWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSBVUFxuICAgICAqIEB0eXBlIFZlYzNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBVUCAoKSB7IHJldHVybiBuZXcgVmVjMygwLCAxLCAwKTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBVUF9SID0gVmVjMy5VUDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gcmV0dXJuIGEgVmVjMyBvYmplY3Qgd2l0aCB4ID0gMSwgeSA9IDAsIHogPSAwLlxuICAgICAqICEjemgg6L+U5ZueIHggPSAx77yMeSA9IDDvvIx6ID0gMCDnmoQgVmVjMyDlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkgUklHSFRcbiAgICAgKiBAdHlwZSBWZWMzXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgUklHSFQgKCkgeyByZXR1cm4gbmV3IFZlYzMoMSwgMCwgMCk7IH1cbiAgICBzdGF0aWMgcmVhZG9ubHkgUklHSFRfUiA9IFZlYzMuUklHSFQ7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzMgb2JqZWN0IHdpdGggeCA9IDAsIHkgPSAwLCB6ID0gMS5cbiAgICAgKiAhI3poIOi/lOWbniB4ID0gMO+8jHkgPSAw77yMeiA9IDEg55qEIFZlYzMg5a+56LGh44CCXG4gICAgICogQHByb3BlcnR5IEZPUldBUkRcbiAgICAgKiBAdHlwZSBWZWMzXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgRk9SV0FSRCAoKSB7IHJldHVybiBuZXcgVmVjMygwLCAwLCAxKTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBGUk9OVF9SID0gVmVjMy5GT1JXQVJEO1xuXG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWwhuebruagh+i1i+WAvOS4uumbtuWQkemHj1xuICAgICAqICEjZW4gVGhlIHRhcmdldCBvZiBhbiBhc3NpZ25tZW50IHplcm8gdmVjdG9yXG4gICAgICogQG1ldGhvZCB6ZXJvXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB6ZXJvPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB6ZXJvPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cbiAgICAgKiAhI2VuIE9idGFpbmluZyBjb3B5IHZlY3RvcnMgZGVzaWduYXRlZFxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNsb25lPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCk6IFZlYzNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNsb25lPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzMoYS54LCBhLnksIGEueik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlpI3liLbnm67moIflkJHph49cbiAgICAgKiAhI2VuIENvcHkgdGhlIHRhcmdldCB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNvcHk8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY29weTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKSB7XG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgb3V0LnogPSBhLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorr7nva7lkJHph4/lgLxcbiAgICAgKiAhI2VuIFNldCB0byB2YWx1ZVxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzZXQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IHg7XG4gICAgICAgIG91dC55ID0geTtcbiAgICAgICAgb3V0LnogPSB6O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGFkZGl0aW9uXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGFkZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGFkZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyBiLng7XG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xuICAgICAgICBvdXQueiA9IGEueiArIGIuejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WHj+azlVxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBzdWJ0cmFjdGlvblxuICAgICAqIEBtZXRob2Qgc3VidHJhY3RcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHN1YnRyYWN0PE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc3VidHJhY3Q8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xuICAgICAgICBvdXQueSA9IGEueSAtIGIueTtcbiAgICAgICAgb3V0LnogPSBhLnogLSBiLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/kuZjms5UgKOWIhumHj+enrylcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3IgbXVsdGlwbGljYXRpb24gKHByb2R1Y3QgY29tcG9uZW50KVxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5PE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMSBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMiBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZV8xLCBiOiBWZWMzTGlrZV8yKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlXzEgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlXzIgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2VfMSwgYjogVmVjM0xpa2VfMikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiLnk7XG4gICAgICAgIG91dC56ID0gYS56ICogYi56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uXG4gICAgICogQG1ldGhvZCBkaXZpZGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRpdmlkZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRpdmlkZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggLyBiLng7XG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xuICAgICAgICBvdXQueiA9IGEueiAvIGIuejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4iuWPluaVtFxuICAgICAqICEjZW4gUm91bmRpbmcgdXAgYnkgZWxlbWVudHMgb2YgdGhlIHZlY3RvclxuICAgICAqIEBtZXRob2QgY2VpbFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY2VpbDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjZWlsPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLmNlaWwoYS55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLmNlaWwoYS56KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxuICAgICAqICEjZW4gRWxlbWVudCB2ZWN0b3IgYnkgcm91bmRpbmcgZG93blxuICAgICAqIEBtZXRob2QgZmxvb3JcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZsb29yPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZsb29yPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLmZsb29yKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5mbG9vcihhLnkpO1xuICAgICAgICBvdXQueiA9IE1hdGguZmxvb3IoYS56KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+acgOWwj+WAvFxuICAgICAqICEjZW4gVGhlIG1pbmltdW0gYnktZWxlbWVudCB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIG1pblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbWluPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbWluPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGgubWluKGEueCwgYi54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1pbihhLnksIGIueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5taW4oYS56LCBiLnopO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XG4gICAgICogISNlbiBUaGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgZWxlbWVudC13aXNlIHZlY3RvclxuICAgICAqIEBtZXRob2QgbWF4XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtYXg8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtYXg8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLm1heChhLnosIGIueik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3Igb2Ygcm91bmRpbmcgdG8gd2hvbGVcbiAgICAgKiBAbWV0aG9kIHJvdW5kXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3VuZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyByb3VuZDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5yb3VuZChhLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgucm91bmQoYS55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLnJvdW5kKGEueik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/moIfph4/kuZjms5VcbiAgICAgKiAhI2VuIFZlY3RvciBzY2FsYXIgbXVsdGlwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlLCBiOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5U2NhbGFyPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGI7XG4gICAgICAgIG91dC55ID0gYS55ICogYjtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5LmY5YqgOiBBICsgQiAqIHNjYWxlXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIG11bHRpcGx5IGFkZDogQSArIEIgKiBzY2FsZVxuICAgICAqIEBtZXRob2Qgc2NhbGVBbmRBZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNjYWxlQW5kQWRkPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGVBbmRBZGQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICsgYi54ICogc2NhbGU7XG4gICAgICAgIG91dC55ID0gYS55ICsgYi55ICogc2NhbGU7XG4gICAgICAgIG91dC56ID0gYS56ICsgYi56ICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcbiAgICAgKiAhI2VuIFNlZWtpbmcgdHdvIHZlY3RvcnMgRXVjbGlkZWFuIGRpc3RhbmNlXG4gICAgICogQG1ldGhvZCBkaXN0YW5jZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGlzdGFuY2U8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRpc3RhbmNlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIF94ID0gYi54IC0gYS54O1xuICAgICAgICBfeSA9IGIueSAtIGEueTtcbiAgICAgICAgX3ogPSBiLnogLSBhLno7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoX3ggKiBfeCArIF95ICogX3kgKyBfeiAqIF96KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOaxguS4pOWQkemHj+eahOasp+awj+i3neemu+W5s+aWuVxuICAgICAqICEjZW4gRXVjbGlkZWFuIGRpc3RhbmNlIHNxdWFyZWQgc2Vla2luZyB0d28gdmVjdG9yc1xuICAgICAqIEBtZXRob2Qgc3F1YXJlZERpc3RhbmNlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzcXVhcmVkRGlzdGFuY2U8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNxdWFyZWREaXN0YW5jZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBfeCA9IGIueCAtIGEueDtcbiAgICAgICAgX3kgPSBiLnkgLSBhLnk7XG4gICAgICAgIF96ID0gYi56IC0gYS56O1xuICAgICAgICByZXR1cm4gX3ggKiBfeCArIF95ICogX3kgKyBfeiAqIF96O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5ZCR6YeP6ZW/5bqmXG4gICAgICogISNlbiBTZWVraW5nIHZlY3RvciBsZW5ndGhcbiAgICAgKiBAbWV0aG9kIGxlblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbGVuPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCk6IG51bWJlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGVuPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCkge1xuICAgICAgICBfeCA9IGEueDtcbiAgICAgICAgX3kgPSBhLnk7XG4gICAgICAgIF96ID0gYS56O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfeik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqblubPmlrlcbiAgICAgKiAhI2VuIFNlZWtpbmcgc3F1YXJlZCB2ZWN0b3IgbGVuZ3RoXG4gICAgICogQG1ldGhvZCBsZW5ndGhTcXJcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlbmd0aFNxcjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlbmd0aFNxcjxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgcmV0dXJuIF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfejtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPlui0n1xuICAgICAqICEjZW4gQnkgdGFraW5nIHRoZSBuZWdhdGl2ZSBlbGVtZW50cyBvZiB0aGUgdmVjdG9yXG4gICAgICogQG1ldGhvZCBuZWdhdGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG5lZ2F0ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBuZWdhdGU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IC1hLng7XG4gICAgICAgIG91dC55ID0gLWEueTtcbiAgICAgICAgb3V0LnogPSAtYS56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIEluZmluaXR5XG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSB0YWtpbmcgdGhlIGludmVyc2UsIHJldHVybiBuZWFyIDAgSW5maW5pdHlcbiAgICAgKiBAbWV0aG9kIGludmVyc2VcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGludmVyc2U8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgaW52ZXJzZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMS4wIC8gYS54O1xuICAgICAgICBvdXQueSA9IDEuMCAvIGEueTtcbiAgICAgICAgb3V0LnogPSAxLjAgLyBhLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lj5blgJLmlbDvvIzmjqXov5EgMCDml7bov5Tlm54gMFxuICAgICAqICEjZW4gRWxlbWVudCB2ZWN0b3IgYnkgdGFraW5nIHRoZSBpbnZlcnNlLCByZXR1cm4gbmVhciAwIDBcbiAgICAgKiBAbWV0aG9kIGludmVyc2VTYWZlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnZlcnNlU2FmZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpbnZlcnNlU2FmZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgX3ogPSBhLno7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKF94KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8gX3g7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoX3kpIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyBfeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyhfeikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueiA9IDEuMCAvIF96O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOW9kuS4gOWMluWQkemHj1xuICAgICAqICEjZW4gTm9ybWFsaXplZCB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbm9ybWFsaXplPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogVmVjM0xpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG5vcm1hbGl6ZTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlKSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgX3ogPSBhLno7XG5cbiAgICAgICAgbGV0IGxlbiA9IF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfejtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgICAgIG91dC54ID0gX3ggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IF95ICogbGVuO1xuICAgICAgICAgICAgb3V0LnogPSBfeiAqIGxlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXG4gICAgICogISNlbiBWZWN0b3IgZG90IHByb2R1Y3QgKHNjYWxhciBwcm9kdWN0KVxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBkb3Q8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRvdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP5Y+J56ev77yI5ZCR6YeP56ev77yJXG4gICAgICogISNlbiBWZWN0b3IgY3Jvc3MgcHJvZHVjdCAodmVjdG9yIHByb2R1Y3QpXG4gICAgICogQG1ldGhvZCBjcm9zc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY3Jvc3M8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8xIGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZV8yIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlXzEsIGI6IFZlYzNMaWtlXzIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNyb3NzPE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMSBleHRlbmRzIElWZWMzTGlrZSwgVmVjM0xpa2VfMiBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZV8xLCBiOiBWZWMzTGlrZV8yKSB7XG4gICAgICAgIGNvbnN0IHsgeDogYXgsIHk6IGF5LCB6OiBheiB9ID0gYTtcbiAgICAgICAgY29uc3QgeyB4OiBieCwgeTogYnksIHo6IGJ6IH0gPSBiO1xuICAgICAgICBvdXQueCA9IGF5ICogYnogLSBheiAqIGJ5O1xuICAgICAgICBvdXQueSA9IGF6ICogYnggLSBheCAqIGJ6O1xuICAgICAgICBvdXQueiA9IGF4ICogYnkgLSBheSAqIGJ4O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqICEjZW4gVmVjdG9yIGVsZW1lbnQgYnkgZWxlbWVudCBsaW5lYXIgaW50ZXJwb2xhdGlvbjogQSArIHQgKiAoQiAtIEEpXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsZXJwPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBsZXJwPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xuICAgICAgICBvdXQueSA9IGEueSArIHQgKiAoYi55IC0gYS55KTtcbiAgICAgICAgb3V0LnogPSBhLnogKyB0ICogKGIueiAtIGEueik7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnlJ/miJDkuIDkuKrlnKjljZXkvY3nkIPkvZPkuIrlnYfljIDliIbluIPnmoTpmo/mnLrlkJHph49cbiAgICAgKiAhI2VuIEdlbmVyYXRlcyBhIHVuaWZvcm1seSBkaXN0cmlidXRlZCByYW5kb20gdmVjdG9ycyBvbiB0aGUgdW5pdCBzcGhlcmVcbiAgICAgKiBAbWV0aG9kIHJhbmRvbVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcmFuZG9tPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBzY2FsZSDnlJ/miJDnmoTlkJHph4/plb/luqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJhbmRvbTxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgc2NhbGU/OiBudW1iZXIpIHtcbiAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG5cbiAgICAgICAgY29uc3QgcGhpID0gcmFuZG9tKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgICAgICBjb25zdCBjb3NUaGV0YSA9IHJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIGNvbnN0IHNpblRoZXRhID0gTWF0aC5zcXJ0KDEgLSBjb3NUaGV0YSAqIGNvc1RoZXRhKTtcblxuICAgICAgICBvdXQueCA9IHNpblRoZXRhICogTWF0aC5jb3MocGhpKSAqIHNjYWxlO1xuICAgICAgICBvdXQueSA9IHNpblRoZXRhICogTWF0aC5zaW4ocGhpKSAqIHNjYWxlO1xuICAgICAgICBvdXQueiA9IGNvc1RoZXRhICogc2NhbGU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/kuI7lm5vnu7Tnn6npmLXkuZjms5XvvIzpu5jorqTlkJHph4/nrKzlm5vkvY3kuLogMeOAglxuICAgICAqICEjZW4gRm91ci1kaW1lbnNpb25hbCB2ZWN0b3IgYW5kIG1hdHJpeCBtdWx0aXBsaWNhdGlvbiwgdGhlIGRlZmF1bHQgdmVjdG9ycyBmb3VydGggb25lLlxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0NFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdHJhbnNmb3JtTWF0NDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlYzNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IFZlYzNMaWtlLCBtYXQ6IE1hdExpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybU1hdDQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWMzTGlrZSBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBWZWMzTGlrZSwgbWF0OiBNYXRMaWtlKSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgX3ogPSBhLno7XG4gICAgICAgIGxldCBtID0gbWF0Lm07XG4gICAgICAgIGxldCByaHcgPSBtWzNdICogX3ggKyBtWzddICogX3kgKyBtWzExXSAqIF96ICsgbVsxNV07XG4gICAgICAgIHJodyA9IHJodyA/IDEgLyByaHcgOiAxO1xuICAgICAgICBvdXQueCA9IChtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzhdICogX3ogKyBtWzEyXSkgKiByaHc7XG4gICAgICAgIG91dC55ID0gKG1bMV0gKiBfeCArIG1bNV0gKiBfeSArIG1bOV0gKiBfeiArIG1bMTNdKSAqIHJodztcbiAgICAgICAgb3V0LnogPSAobVsyXSAqIF94ICsgbVs2XSAqIF95ICsgbVsxMF0gKiBfeiArIG1bMTRdKSAqIHJodztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+S4juWbm+e7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOWbm+S9jeS4uiAw44CCXG4gICAgICogISNlbiBGb3VyLWRpbWVuc2lvbmFsIHZlY3RvciBhbmQgbWF0cml4IG11bHRpcGxpY2F0aW9uLCB2ZWN0b3IgZm91cnRoIGRlZmF1bHQgaXMgMC5cbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDROb3JtYWxcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zZm9ybU1hdDROb3JtYWw8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQ0Tm9ybWFsPE91dCBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSkge1xuICAgICAgICBfeCA9IGEueDtcbiAgICAgICAgX3kgPSBhLnk7XG4gICAgICAgIF96ID0gYS56O1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBsZXQgcmh3ID0gbVszXSAqIF94ICsgbVs3XSAqIF95ICsgbVsxMV0gKiBfejtcbiAgICAgICAgcmh3ID0gcmh3ID8gMSAvIHJodyA6IDE7XG4gICAgICAgIG91dC54ID0gKG1bMF0gKiBfeCArIG1bNF0gKiBfeSArIG1bOF0gKiBfeikgKiByaHc7XG4gICAgICAgIG91dC55ID0gKG1bMV0gKiBfeCArIG1bNV0gKiBfeSArIG1bOV0gKiBfeikgKiByaHc7XG4gICAgICAgIG91dC56ID0gKG1bMl0gKiBfeCArIG1bNl0gKiBfeSArIG1bMTBdICogX3opICogcmh3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP5LiO5LiJ57u055+p6Zi15LmY5rOVXG4gICAgICogISNlbiBEaW1lbnNpb25hbCB2ZWN0b3IgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm1NYXQzPE91dCBleHRlbmRzIElWZWMzTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtTWF0MzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBtYXQ6IE1hdExpa2UpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcbiAgICAgICAgb3V0LnggPSBfeCAqIG1bMF0gKyBfeSAqIG1bM10gKyBfeiAqIG1bNl07XG4gICAgICAgIG91dC55ID0gX3ggKiBtWzFdICsgX3kgKiBtWzRdICsgX3ogKiBtWzddO1xuICAgICAgICBvdXQueiA9IF94ICogbVsyXSArIF95ICogbVs1XSArIF96ICogbVs4XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+S7v+WwhOWPmOaNolxuICAgICAqICEjZW4gQWZmaW5lIHRyYW5zZm9ybWF0aW9uIHZlY3RvclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtQWZmaW5lXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm1BZmZpbmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPihvdXQ6IE91dCwgdjogVmVjTGlrZSwgbWF0OiBNYXRMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1BZmZpbmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPlxuICAgICAgICAob3V0OiBPdXQsIHY6IFZlY0xpa2UsIG1hdDogTWF0TGlrZSkge1xuICAgICAgICBfeCA9IHYueDtcbiAgICAgICAgX3kgPSB2Lnk7XG4gICAgICAgIF96ID0gdi56O1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBvdXQueCA9IG1bMF0gKiBfeCArIG1bMV0gKiBfeSArIG1bMl0gKiBfeiArIG1bM107XG4gICAgICAgIG91dC55ID0gbVs0XSAqIF94ICsgbVs1XSAqIF95ICsgbVs2XSAqIF96ICsgbVs3XTtcbiAgICAgICAgb3V0LnggPSBtWzhdICogX3ggKyBtWzldICogX3kgKyBtWzEwXSAqIF96ICsgbVsxMV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/lm5vlhYPmlbDkuZjms5VcbiAgICAgKiAhI2VuIFZlY3RvciBxdWF0ZXJuaW9uIG11bHRpcGxpY2F0aW9uXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1RdWF0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm1RdWF0PE91dCBleHRlbmRzIElWZWMzTGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogVmVjTGlrZSwgcTogUXVhdExpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybVF1YXQ8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKG91dDogT3V0LCBhOiBWZWNMaWtlLCBxOiBRdWF0TGlrZSkge1xuICAgICAgICAvLyBiZW5jaG1hcmtzOiBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS1WZWMzLWltcGxlbWVudGF0aW9uc1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGNvbnN0IGl4ID0gcS53ICogYS54ICsgcS55ICogYS56IC0gcS56ICogYS55O1xuICAgICAgICBjb25zdCBpeSA9IHEudyAqIGEueSArIHEueiAqIGEueCAtIHEueCAqIGEuejtcbiAgICAgICAgY29uc3QgaXogPSBxLncgKiBhLnogKyBxLnggKiBhLnkgLSBxLnkgKiBhLng7XG4gICAgICAgIGNvbnN0IGl3ID0gLXEueCAqIGEueCAtIHEueSAqIGEueSAtIHEueiAqIGEuejtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG4gICAgICAgIG91dC54ID0gaXggKiBxLncgKyBpdyAqIC1xLnggKyBpeSAqIC1xLnogLSBpeiAqIC1xLnk7XG4gICAgICAgIG91dC55ID0gaXkgKiBxLncgKyBpdyAqIC1xLnkgKyBpeiAqIC1xLnggLSBpeCAqIC1xLno7XG4gICAgICAgIG91dC56ID0gaXogKiBxLncgKyBpdyAqIC1xLnogKyBpeCAqIC1xLnkgLSBpeSAqIC1xLng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDku6XnvKnmlL4gLT4g5peL6L2sIC0+IOW5s+enu+mhuuW6j+WPmOaNouWQkemHj1xuICAgICAqICEjZW4gVG8gc2NhbGUgLT4gcm90YXRpb24gLT4gdHJhbnNmb3JtYXRpb24gdmVjdG9yIHNlcXVlbmNlIHRyYW5zbGF0aW9uXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1RdWF0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm1SVFM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4ob3V0OiBPdXQsIGE6IFZlY0xpa2UsIHI6IFF1YXRMaWtlLCB0OiBWZWNMaWtlLCBzOiBWZWNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1SVFM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKFxuICAgICAgICBvdXQ6IE91dCwgYTogVmVjTGlrZSwgcjogUXVhdExpa2UsIHQ6IFZlY0xpa2UsIHM6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueCAqIHMueDtcbiAgICAgICAgY29uc3QgeSA9IGEueSAqIHMueTtcbiAgICAgICAgY29uc3QgeiA9IGEueiAqIHMuejtcbiAgICAgICAgY29uc3QgaXggPSByLncgKiB4ICsgci55ICogeiAtIHIueiAqIHk7XG4gICAgICAgIGNvbnN0IGl5ID0gci53ICogeSArIHIueiAqIHggLSByLnggKiB6O1xuICAgICAgICBjb25zdCBpeiA9IHIudyAqIHogKyByLnggKiB5IC0gci55ICogeDtcbiAgICAgICAgY29uc3QgaXcgPSAtci54ICogeCAtIHIueSAqIHkgLSByLnogKiB6O1xuICAgICAgICBvdXQueCA9IGl4ICogci53ICsgaXcgKiAtci54ICsgaXkgKiAtci56IC0gaXogKiAtci55ICsgdC54O1xuICAgICAgICBvdXQueSA9IGl5ICogci53ICsgaXcgKiAtci55ICsgaXogKiAtci54IC0gaXggKiAtci56ICsgdC55O1xuICAgICAgICBvdXQueiA9IGl6ICogci53ICsgaXcgKiAtci56ICsgaXggKiAtci55IC0gaXkgKiAtci54ICsgdC56O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Lul5bmz56e7IC0+IOaXi+i9rCAtPiDnvKnmlL7pobrluo/pgIblj5jmjaLlkJHph49cbiAgICAgKiAhI2VuIFRyYW5zbGF0aW9uYWwgLT4gcm90YXRpb24gLT4gWm9vbSBpbnZlcnNlIHRyYW5zZm9ybWF0aW9uIHZlY3RvciBzZXF1ZW5jZVxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtSW52ZXJzZVJUU1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdHJhbnNmb3JtSW52ZXJzZVJUUzxPdXQgZXh0ZW5kcyBJVmVjM0xpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2UsIFF1YXRMaWtlIGV4dGVuZHMgSVF1YXRMaWtlPihvdXQ6IE91dCwgYTogVmVjTGlrZSwgcjogUXVhdExpa2UsIHQ6IFZlY0xpa2UsIHM6IFZlY0xpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zZm9ybUludmVyc2VSVFM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlLCBRdWF0TGlrZSBleHRlbmRzIElRdWF0TGlrZT4gKFxuICAgICAgICBvdXQ6IE91dCwgYTogVmVjTGlrZSwgcjogUXVhdExpa2UsIHQ6IFZlY0xpa2UsIHM6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IGEueCAtIHQueDtcbiAgICAgICAgY29uc3QgeSA9IGEueSAtIHQueTtcbiAgICAgICAgY29uc3QgeiA9IGEueiAtIHQuejtcbiAgICAgICAgY29uc3QgaXggPSByLncgKiB4IC0gci55ICogeiArIHIueiAqIHk7XG4gICAgICAgIGNvbnN0IGl5ID0gci53ICogeSAtIHIueiAqIHggKyByLnggKiB6O1xuICAgICAgICBjb25zdCBpeiA9IHIudyAqIHogLSByLnggKiB5ICsgci55ICogeDtcbiAgICAgICAgY29uc3QgaXcgPSByLnggKiB4ICsgci55ICogeSArIHIueiAqIHo7XG4gICAgICAgIG91dC54ID0gKGl4ICogci53ICsgaXcgKiByLnggKyBpeSAqIHIueiAtIGl6ICogci55KSAvIHMueDtcbiAgICAgICAgb3V0LnkgPSAoaXkgKiByLncgKyBpdyAqIHIueSArIGl6ICogci54IC0gaXggKiByLnopIC8gcy55O1xuICAgICAgICBvdXQueiA9IChpeiAqIHIudyArIGl3ICogci56ICsgaXggKiByLnkgLSBpeSAqIHIueCkgLyBzLno7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5UgWCDovbTml4vovazlkJHph4/mjIflrprlvKfluqZcbiAgICAgKiAhI2VuIFJvdGF0aW9uIHZlY3RvciBzcGVjaWZpZWQgYW5nbGUgYWJvdXQgdGhlIFggYXhpc1xuICAgICAqIEBtZXRob2Qgcm90YXRlWFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm90YXRlWDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogT3V0LCBvOiBPdXQsIGE6IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSB2IOW+heaXi+i9rOWQkemHj1xuICAgICAqIEBwYXJhbSBvIOaXi+i9rOS4reW/g1xuICAgICAqIEBwYXJhbSBhIOaXi+i9rOW8p+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgdjogT3V0LCBvOiBPdXQsIGE6IG51bWJlcikge1xuICAgICAgICAvLyBUcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuICAgICAgICBfeCA9IHYueCAtIG8ueDtcbiAgICAgICAgX3kgPSB2LnkgLSBvLnk7XG4gICAgICAgIF96ID0gdi56IC0gby56O1xuXG4gICAgICAgIC8vIHBlcmZvcm0gcm90YXRpb25cbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYSk7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGEpO1xuICAgICAgICBjb25zdCByeCA9IF94O1xuICAgICAgICBjb25zdCByeSA9IF95ICogY29zIC0gX3ogKiBzaW47XG4gICAgICAgIGNvbnN0IHJ6ID0gX3kgKiBzaW4gKyBfeiAqIGNvcztcblxuICAgICAgICAvLyB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgICAgICBvdXQueCA9IHJ4ICsgby54O1xuICAgICAgICBvdXQueSA9IHJ5ICsgby55O1xuICAgICAgICBvdXQueiA9IHJ6ICsgby56O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnu5UgWSDovbTml4vovazlkJHph4/mjIflrprlvKfluqZcbiAgICAgKiAhI2VuIFJvdGF0aW9uIHZlY3RvciBzcGVjaWZpZWQgYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVk8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IE91dCwgbzogT3V0LCBhOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gdiDlvoXml4vovazlkJHph49cbiAgICAgKiBAcGFyYW0gbyDml4vovazkuK3lv4NcbiAgICAgKiBAcGFyYW0gYSDml4vovazlvKfluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVk8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IE91dCwgbzogT3V0LCBhOiBudW1iZXIpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgICAgICAgX3ggPSB2LnggLSBvLng7XG4gICAgICAgIF95ID0gdi55IC0gby55O1xuICAgICAgICBfeiA9IHYueiAtIG8uejtcblxuICAgICAgICAvLyBwZXJmb3JtIHJvdGF0aW9uXG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGEpO1xuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhKTtcbiAgICAgICAgY29uc3QgcnggPSBfeiAqIHNpbiArIF94ICogY29zO1xuICAgICAgICBjb25zdCByeSA9IF95O1xuICAgICAgICBjb25zdCByeiA9IF96ICogY29zIC0gX3ggKiBzaW47XG5cbiAgICAgICAgLy8gdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICAgICAgb3V0LnggPSByeCArIG8ueDtcbiAgICAgICAgb3V0LnkgPSByeSArIG8ueTtcbiAgICAgICAgb3V0LnogPSByeiArIG8uejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg57uVIFog6L205peL6L2s5ZCR6YeP5oyH5a6a5byn5bqmXG4gICAgICogISNlbiBBcm91bmQgdGhlIFogYXhpcyBzcGVjaWZpZWQgYW5nbGUgdmVjdG9yXG4gICAgICogQG1ldGhvZCByb3RhdGVaXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVaPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBPdXQsIG86IE91dCwgYTogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHYg5b6F5peL6L2s5ZCR6YePXG4gICAgICogQHBhcmFtIG8g5peL6L2s5Lit5b+DXG4gICAgICogQHBhcmFtIGEg5peL6L2s5byn5bqmXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyByb3RhdGVaPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBPdXQsIG86IE91dCwgYTogbnVtYmVyKSB7XG4gICAgICAgIC8vIFRyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgICAgIF94ID0gdi54IC0gby54O1xuICAgICAgICBfeSA9IHYueSAtIG8ueTtcbiAgICAgICAgX3ogPSB2LnogLSBvLno7XG5cbiAgICAgICAgLy8gcGVyZm9ybSByb3RhdGlvblxuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYSk7XG4gICAgICAgIGNvbnN0IHJ4ID0gX3ggKiBjb3MgLSBfeSAqIHNpbjtcbiAgICAgICAgY29uc3QgcnkgPSBfeCAqIHNpbiArIF95ICogY29zO1xuICAgICAgICBjb25zdCByeiA9IF96O1xuXG4gICAgICAgIC8vIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG4gICAgICAgIG91dC54ID0gcnggKyBvLng7XG4gICAgICAgIG91dC55ID0gcnkgKyBvLnk7XG4gICAgICAgIG91dC56ID0gcnogKyBvLno7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+etieS7t+WIpOaWrVxuICAgICAqICEjZW4gRXF1aXZhbGVudCB2ZWN0b3JzIEFuYWx5emluZ1xuICAgICAqIEBtZXRob2Qgc3RyaWN0RXF1YWxzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBib29sZWFuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdHJpY3RFcXVhbHM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgcmV0dXJuIGEueCA9PT0gYi54ICYmIGEueSA9PT0gYi55ICYmIGEueiA9PT0gYi56O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5ZCR6YeP6L+R5Ly8562J5Lu35Yik5patXG4gICAgICogISNlbiBOZWdhdGl2ZSBlcnJvciB2ZWN0b3IgZmxvYXRpbmcgcG9pbnQgYXBwcm94aW1hdGVseSBlcXVpdmFsZW50IEFuYWx5emluZ1xuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBlcXVhbHM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24/OiBudW1iZXIpOiBib29sZWFuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHM8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQsIGVwc2lsb24gPSBFUFNJTE9OKSB7XG4gICAgICAgIGNvbnN0IHsgeDogYTAsIHk6IGExLCB6OiBhMiB9ID0gYTtcbiAgICAgICAgY29uc3QgeyB4OiBiMCwgeTogYjEsIHo6IGIyIH0gPSBiO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMoYTAgLSBiMCkgPD1cbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTEgLSBiMSkgPD1cbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTIgLSBiMikgPD1cbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5Lik5ZCR6YeP5aS56KeS5byn5bqmXG4gICAgICogISNlbiBSYWRpYW4gYW5nbGUgYmV0d2VlbiB0d28gdmVjdG9ycyBzZWVrXG4gICAgICogQG1ldGhvZCBhbmdsZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogYW5nbGU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGFuZ2xlPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIFZlYzMubm9ybWFsaXplKHYzXzEsIGEpO1xuICAgICAgICBWZWMzLm5vcm1hbGl6ZSh2M18yLCBiKTtcbiAgICAgICAgY29uc3QgY29zaW5lID0gVmVjMy5kb3QodjNfMSwgdjNfMik7XG4gICAgICAgIGlmIChjb3NpbmUgPiAxLjApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3NpbmUgPCAtMS4wKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5hY29zKGNvc2luZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorqHnrpflkJHph4/lnKjmjIflrprlubPpnaLkuIrnmoTmipXlvbFcbiAgICAgKiAhI2VuIENhbGN1bGF0aW5nIGEgcHJvamVjdGlvbiB2ZWN0b3IgaW4gdGhlIHNwZWNpZmllZCBwbGFuZVxuICAgICAqIEBtZXRob2QgcHJvamVjdE9uUGxhbmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHByb2plY3RPblBsYW5lPE91dCBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG46IE91dCk6IE91dFxuICAgICAqIEBwYXJhbSBhIOW+heaKleW9seWQkemHj1xuICAgICAqIEBwYXJhbSBuIOaMh+WumuW5s+mdoueahOazlee6v1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcHJvamVjdE9uUGxhbmU8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbjogT3V0KSB7XG4gICAgICAgIHJldHVybiBWZWMzLnN1YnRyYWN0KG91dCwgYSwgVmVjMy5wcm9qZWN0KG91dCwgYSwgbikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6h566X5ZCR6YeP5Zyo5oyH5a6a5ZCR6YeP5LiK55qE5oqV5b2xXG4gICAgICogISNlbiBQcm9qZWN0aW9uIHZlY3RvciBjYWxjdWxhdGVkIGluIHRoZSB2ZWN0b3IgZGVzaWduYXRlZFxuICAgICAqIEBtZXRob2QgcHJvamVjdFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcHJvamVjdDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAcGFyYW0gYSDlvoXmipXlvbHlkJHph49cbiAgICAgKiBAcGFyYW0gbiDnm67moIflkJHph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHByb2plY3Q8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGNvbnN0IHNxckxlbiA9IFZlYzMubGVuZ3RoU3FyKGIpO1xuICAgICAgICBpZiAoc3FyTGVuIDwgMC4wMDAwMDEpIHtcbiAgICAgICAgICAgIHJldHVybiBWZWMzLnNldChvdXQsIDAsIDAsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFZlYzMubXVsdGlwbHlTY2FsYXIob3V0LCBiLCBWZWMzLmRvdChhLCBiKSAvIHNxckxlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+i9rOaVsOe7hFxuICAgICAqICEjZW4gVmVjdG9yIHRyYW5zZmVyIGFycmF5XG4gICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjM0xpa2UsIG9mcz86IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjM0xpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0W29mcyArIDBdID0gdi54O1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSB2Lnk7XG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHYuejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5pWw57uE6L2s5ZCR6YePXG4gICAgICogISNlbiBBcnJheSBzdGVlcmluZyBhbW91bnRcbiAgICAgKiBAbWV0aG9kIGZyb21BcnJheVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcyA9IDApIHtcbiAgICAgICAgb3V0LnggPSBhcnJbb2ZzICsgMF07XG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xuICAgICAgICBvdXQueiA9IGFycltvZnMgKyAyXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB4XG4gICAgICovXG4gICAgeDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XG4gICAgICovXG4gICAgeTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6XG4gICAgICovXG4gICAgejogbnVtYmVyO1xuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvdmVjMzptZXRob2RcIn19Y2MudjN7ey9jcm9zc0xpbmt9fVxuICAgICAqICEjemhcbiAgICAgKiDmnoTpgKDlh73mlbDvvIzlj6/mn6XnnIsge3sjY3Jvc3NMaW5rIFwiY2MvdmVjMzptZXRob2RcIn19Y2MudjN7ey9jcm9zc0xpbmt9fVxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzN8bnVtYmVyfSBbeD0wXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbej0wXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yICh4OiBWZWMzIHwgbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMCwgejogbnVtYmVyID0gMCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggYXMgbnVtYmVyO1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIGNsb25lIGEgVmVjMyB2YWx1ZVxuICAgICAqICEjemgg5YWL6ZqG5LiA5LiqIFZlYzMg5YC8XG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgY2xvbmUgKCk6IFZlYzMge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGN1cnJlbnQgdmVjdG9yIHZhbHVlIHdpdGggdGhlIGdpdmVuIHZlY3Rvci5cbiAgICAgKiAhI3poIOeUqOWPpuS4gOS4quWQkemHj+iuvue9ruW9k+WJjeeahOWQkemHj+WvueixoeWAvOOAglxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtWZWMzfSBuZXdWYWx1ZSAtICEjZW4gbmV3IHZhbHVlIHRvIHNldC4gISN6aCDopoHorr7nva7nmoTmlrDlgLxcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc2V0IChuZXdWYWx1ZTogVmVjMyk6IFZlYzMge1xuICAgICAgICB0aGlzLnggPSBuZXdWYWx1ZS54O1xuICAgICAgICB0aGlzLnkgPSBuZXdWYWx1ZS55O1xuICAgICAgICB0aGlzLnogPSBuZXdWYWx1ZS56O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdGhlIHZlY3RvciBlcXVhbHMgYW5vdGhlciBvbmVcbiAgICAgKiAhI3poIOW9k+WJjeeahOWQkemHj+aYr+WQpuS4juaMh+WumueahOWQkemHj+ebuOetieOAglxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZXF1YWxzIChvdGhlcjogVmVjMyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb3RoZXIgJiYgdGhpcy54ID09PSBvdGhlci54ICYmIHRoaXMueSA9PT0gb3RoZXIueSAmJiB0aGlzLnogPT09IG90aGVyLno7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgdHdvIHZlY3RvciBlcXVhbCB3aXRoIHNvbWUgZGVncmVlIG9mIHZhcmlhbmNlLlxuICAgICAqICEjemhcbiAgICAgKiDov5HkvLzliKTmlq3kuKTkuKrngrnmmK/lkKbnm7jnrYnjgII8YnIvPlxuICAgICAqIOWIpOaWrSAyIOS4quWQkemHj+aYr+WQpuWcqOaMh+WumuaVsOWAvOeahOiMg+WbtOS5i+WGhe+8jOWmguaenOWcqOWImei/lOWbniB0cnVl77yM5Y+N5LmL5YiZ6L+U5ZueIGZhbHNl44CCXG4gICAgICogQG1ldGhvZCBmdXp6eUVxdWFsc1xuICAgICAqIEBwYXJhbSB7VmVjM30gb3RoZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFyaWFuY2VcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1enp5RXF1YWxzIChvdGhlcjogVmVjMywgdmFyaWFuY2U6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy54IC0gdmFyaWFuY2UgPD0gb3RoZXIueCAmJiBvdGhlci54IDw9IHRoaXMueCArIHZhcmlhbmNlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy55IC0gdmFyaWFuY2UgPD0gb3RoZXIueSAmJiBvdGhlci55IDw9IHRoaXMueSArIHZhcmlhbmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueiAtIHZhcmlhbmNlIDw9IG90aGVyLnogJiYgb3RoZXIueiA8PSB0aGlzLnogKyB2YXJpYW5jZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVHJhbnNmb3JtIHRvIHN0cmluZyB3aXRoIHZlY3RvciBpbmZvcm1hdGlvbnNcbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxuICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIihcIiArXG4gICAgICAgICAgICB0aGlzLngudG9GaXhlZCgyKSArIFwiLCBcIiArXG4gICAgICAgICAgICB0aGlzLnkudG9GaXhlZCgyKSArIFwiLCBcIiArXG4gICAgICAgICAgICB0aGlzLnoudG9GaXhlZCgyKSArIFwiKVwiXG4gICAgICAgICAgICA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDYWxjdWxhdGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgb25lIHdpdGggZ2l2ZW4gcmF0aW9cbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvOOAglxuICAgICAqIEBtZXRob2QgbGVycFxuICAgICAqIEBwYXJhbSB7VmVjM30gdG9cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudFxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgbGVycCAodG86IFZlYzMsIHJhdGlvOiBudW1iZXIsIG91dD86IFZlYzMpOiBWZWMzIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMzKCk7XG4gICAgICAgIFZlYzMubGVycChvdXQsIHRoaXMsIHRvLCByYXRpbyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gZnJvbSBmbG9hdCBhbmQgdG8gZmxvYXQuXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuaMh+WumumZkOWItuWMuuWfn+WQjueahOWQkemHj+OAgjxici8+XG4gICAgICog5ZCR6YeP5aSn5LqOIG1heF9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1heF9pbmNsdXNpdmXjgII8YnIvPlxuICAgICAqIOWQkemHj+Wwj+S6jiBtaW5faW5jbHVzaXZlIOWImei/lOWbniBtaW5faW5jbHVzaXZl44CCPGJyLz5cbiAgICAgKiDlkKbliJnov5Tlm57oh6rouqvjgIJcbiAgICAgKiBAbWV0aG9kIGNsYW1wZlxuICAgICAqIEBwYXJhbSB7VmVjM30gbWluX2luY2x1c2l2ZVxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4X2luY2x1c2l2ZVxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgY2xhbXBmIChtaW5faW5jbHVzaXZlOiBWZWMzLCBtYXhfaW5jbHVzaXZlOiBWZWMzKTogVmVjMyB7XG4gICAgICAgIHRoaXMueCA9IG1pc2MuY2xhbXBmKHRoaXMueCwgbWluX2luY2x1c2l2ZS54LCBtYXhfaW5jbHVzaXZlLngpO1xuICAgICAgICB0aGlzLnkgPSBtaXNjLmNsYW1wZih0aGlzLnksIG1pbl9pbmNsdXNpdmUueSwgbWF4X2luY2x1c2l2ZS55KTtcbiAgICAgICAgdGhpcy56ID0gbWlzYy5jbGFtcGYodGhpcy56LCBtaW5faW5jbHVzaXZlLnosIG1heF9pbmNsdXNpdmUueik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyB0aGlzIHZlY3Rvci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBhZGQoKSBpbnN0ZWFkLlxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV44CC5aaC5p6c5L2g5oOz5L+d5a2Y57uT5p6c5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5L2/55SoIGFkZCgpIOS7o+abv+OAglxuICAgICAqIEBtZXRob2QgYWRkU2VsZlxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIGFkZFNlbGYgKHZlY3RvcjogVmVjMyk6IHRoaXMge1xuICAgICAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICAgICAgdGhpcy56ICs9IHZlY3Rvci56O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV77yM5bm26L+U5Zue5paw57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBhZGQgKHZlY3RvcjogVmVjMywgb3V0PzogVmVjMyk6IFZlYzMge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcbiAgICAgICAgb3V0LnggPSB0aGlzLnggKyB2ZWN0b3IueDtcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgKyB2ZWN0b3IueTtcbiAgICAgICAgb3V0LnogPSB0aGlzLnogKyB2ZWN0b3IuejtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcy5cbiAgICAgKiAhI3poIOWQkemHj+WHj+azleOAglxuICAgICAqIEBtZXRob2Qgc3VidHJhY3RcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzdWJ0cmFjdCAodmVjdG9yOiBWZWMzKTogVmVjMyB7XG4gICAgICAgIHRoaXMueCAtPSB2ZWN0b3IueDtcbiAgICAgICAgdGhpcy55IC09IHZlY3Rvci55O1xuICAgICAgICB0aGlzLnogLT0gdmVjdG9yLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGlzIGJ5IGEgbnVtYmVyLlxuICAgICAqICEjemgg57yp5pS+5b2T5YmN5ZCR6YeP44CCXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgbXVsdGlwbHlTY2FsYXIgKG51bTogbnVtYmVyKTogVmVjMyB7XG4gICAgICAgIHRoaXMueCAqPSBudW07XG4gICAgICAgIHRoaXMueSAqPSBudW07XG4gICAgICAgIHRoaXMueiAqPSBudW07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0d28gdmVjdG9ycy5cbiAgICAgKiAhI3poIOWIhumHj+ebuOS5mOOAglxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBtdWx0aXBseSAodmVjdG9yOiBWZWMzKTogVmVjMyB7XG4gICAgICAgIHRoaXMueCAqPSB2ZWN0b3IueDtcbiAgICAgICAgdGhpcy55ICo9IHZlY3Rvci55O1xuICAgICAgICB0aGlzLnogKj0gdmVjdG9yLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlci5cbiAgICAgKiAhI3poIOWQkemHj+mZpOazleOAglxuICAgICAqIEBtZXRob2QgZGl2aWRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBkaXZpZGUgKG51bTogbnVtYmVyKTogVmVjMyB7XG4gICAgICAgIHRoaXMueCAvPSBudW07XG4gICAgICAgIHRoaXMueSAvPSBudW07XG4gICAgICAgIHRoaXMueiAvPSBudW07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cy5cbiAgICAgKiAhI3poIOWQkemHj+WPluWPjeOAglxuICAgICAqIEBtZXRob2QgbmVnYXRlXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIG5lZ2F0ZSAoKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gRG90IHByb2R1Y3RcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOeCueS5mOOAglxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHBhcmFtIHtWZWMzfSBbdmVjdG9yXVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGRvdCAodmVjdG9yOiBWZWMzKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnkgKyB0aGlzLnogKiB2ZWN0b3IuejtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENyb3NzIHByb2R1Y3RcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOWPieS5mOOAglxuICAgICAqIEBtZXRob2QgY3Jvc3NcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF1cbiAgICAgKiBAcmV0dXJuIHtWZWMzfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgY3Jvc3MgKHZlY3RvcjogVmVjMywgb3V0PzogVmVjMyk6IFZlYzMge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcbiAgICAgICAgVmVjMy5jcm9zcyhvdXQsIHRoaXMsIHZlY3RvcilcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puOAglxuICAgICAqIEBtZXRob2QgbGVuXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYzKDEwLCAxMCwgMTApO1xuICAgICAqIHYubGVuKCk7IC8vIHJldHVybiAxNy4zMjA1MDgwNzU2ODg3NzU7XG4gICAgICovXG4gICAgbGVuICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueSArIHRoaXMueiAqIHRoaXMueik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puW5s+aWueOAglxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbGVuZ3RoU3FyICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWFrZSB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yIHRvIDEuXG4gICAgICogISN6aCDlkJHph4/lvZLkuIDljJbvvIzorqnov5nkuKrlkJHph4/nmoTplb/luqbkuLogMeOAglxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplU2VsZlxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBub3JtYWxpemVTZWxmICgpOiBWZWMzIHtcbiAgICAgICAgVmVjMy5ub3JtYWxpemUodGhpcywgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGlzIHZlY3RvciB3aXRoIGEgbWFnbml0dWRlIG9mIDEuPGJyLz5cbiAgICAgKiA8YnIvPlxuICAgICAqIE5vdGUgdGhhdCB0aGUgY3VycmVudCB2ZWN0b3IgaXMgdW5jaGFuZ2VkIGFuZCBhIG5ldyBub3JtYWxpemVkIHZlY3RvciBpcyByZXR1cm5lZC4gSWYgeW91IHdhbnQgdG8gbm9ybWFsaXplIHRoZSBjdXJyZW50IHZlY3RvciwgdXNlIG5vcm1hbGl6ZVNlbGYgZnVuY3Rpb24uXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuW9kuS4gOWMluWQjueahOWQkemHj+OAgjxici8+XG4gICAgICogPGJyLz5cbiAgICAgKiDms6jmhI/vvIzlvZPliY3lkJHph4/kuI3lj5jvvIzlubbov5Tlm57kuIDkuKrmlrDnmoTlvZLkuIDljJblkJHph4/jgILlpoLmnpzkvaDmg7PmnaXlvZLkuIDljJblvZPliY3lkJHph4/vvIzlj6/kvb/nlKggbm9ybWFsaXplU2VsZiDlh73mlbDjgIJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxuICAgICAqIEBwYXJhbSB7VmVjM30gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMzIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9IHJlc3VsdFxuICAgICAqL1xuICAgIG5vcm1hbGl6ZSAob3V0PzogVmVjMyk6IFZlYzMge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcbiAgICAgICAgVmVjMy5ub3JtYWxpemUob3V0LCB0aGlzKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMzIHdpdGggYSBtYXQ0LiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0NFxuICAgICAqIEBwYXJhbSB7TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMyB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJucyB7VmVjM30gb3V0XG4gICAgICovXG4gICAgdHJhbnNmb3JtTWF0NCAobTogTWF0NCwgb3V0PzogVmVjMyk6IFZlYzMge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzMoKTtcbiAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgdGhpcywgbSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZSBpbiB4LCB5LCBhbmQgelxuICAgICAqIEBtZXRob2QgbWF4QXhpc1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgbWF4QXhpcyAoKTogbnVtYmVyIHtcbiAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYW5nbGUgaW4gcmFkaWFuIGJldHdlZW4gdGhpcyBhbmQgdmVjdG9yLlxuICAgICAqICEjemgg5aS56KeS55qE5byn5bqm44CCXG4gICAgICogQG1ldGhvZCBhbmdsZVxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjdG9yXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBmcm9tIDAgdG8gTWF0aC5QSVxuICAgICAqL1xuICAgIGFuZ2xlID0gVmVjMi5wcm90b3R5cGUuYW5nbGVcbiAgICAvKipcbiAgICAgKiAhI2VuIENhbGN1bGF0ZXMgdGhlIHByb2plY3Rpb24gb2YgdGhlIGN1cnJlbnQgdmVjdG9yIG92ZXIgdGhlIGdpdmVuIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuW9k+WJjeWQkemHj+WcqOaMh+WumiB2ZWN0b3Ig5ZCR6YeP5LiK55qE5oqV5b2x5ZCR6YeP44CCXG4gICAgICogQG1ldGhvZCBwcm9qZWN0XG4gICAgICogQHBhcmFtIHtWZWMzfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMzfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYxID0gY2MudjMoMjAsIDIwLCAyMCk7XG4gICAgICogdmFyIHYyID0gY2MudjMoNSwgNSwgNSk7XG4gICAgICogdjEucHJvamVjdCh2Mik7IC8vIFZlYzMge3g6IDIwLCB5OiAyMCwgejogMjB9O1xuICAgICAqL1xuICAgIHByb2plY3QgPSBWZWMyLnByb3RvdHlwZS5wcm9qZWN0XG4gICAgLy8gQ29tcGF0aWJsZSB3aXRoIHRoZSB2ZWMyIEFQSVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYW5nbGUgaW4gcmFkaWFuIGJldHdlZW4gdGhpcyBhbmQgdmVjdG9yIHdpdGggZGlyZWN0aW9uLiA8YnIvPlxuICAgICAqIEluIG9yZGVyIHRvIGNvbXBhdGlibGUgd2l0aCB0aGUgdmVjMiBBUEkuXG4gICAgICogISN6aCDluKbmlrnlkJHnmoTlpLnop5LnmoTlvKfluqbjgILor6Xmlrnms5Xku4XnlKjlgZrlhbzlrrkgMkQg6K6h566X44CCXG4gICAgICogQG1ldGhvZCBzaWduQW5nbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzMgfCBWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGZyb20gLU1hdGhQSSB0byBNYXRoLlBJXG4gICAgICogQGRlcHJlY2F0ZWRcbiAgICAgKi9cbiAgICBzaWduQW5nbGUgKHZlY3Rvcikge1xuICAgICAgICBjYy53YXJuSUQoMTQwOCwgJ3ZlYzMuc2lnbkFuZ2xlJywgJ3YyLjEnLCAnY2MudjIoc2VsZlZlY3Rvcikuc2lnbkFuZ2xlKHZlY3RvciknKTtcbiAgICAgICAgbGV0IHZlYzEgPSBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIGxldCB2ZWMyID0gbmV3IFZlYzIodmVjdG9yLngsIHZlY3Rvci55KTtcbiAgICAgICAgcmV0dXJuIHZlYzEuc2lnbkFuZ2xlKHZlYzIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gcm90YXRlLiBJbiBvcmRlciB0byBjb21wYXRpYmxlIHdpdGggdGhlIHZlYzIgQVBJLlxuICAgICAqICEjemgg6L+U5Zue5peL6L2s57uZ5a6a5byn5bqm5ZCO55qE5paw5ZCR6YeP44CC6K+l5pa55rOV5LuF55So5YGa5YW85a65IDJEIOiuoeeul+OAglxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMyIHwgVmVjM30gaWYgdGhlICdvdXQnIHZhbHVlIGlzIGEgdmVjMyB5b3Ugd2lsbCBnZXQgYSBWZWMzIHJldHVybi5cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIHJvdGF0ZSAocmFkaWFucywgb3V0KSB7XG4gICAgICAgIGNjLndhcm5JRCgxNDA4LCAndmVjMy5yb3RhdGUnLCAndjIuMScsICdjYy52MihzZWxmVmVjdG9yKS5yb3RhdGUocmFkaWFucywgb3V0KScpO1xuICAgICAgICByZXR1cm4gVmVjMi5wcm90b3R5cGUucm90YXRlLmNhbGwodGhpcywgcmFkaWFucywgb3V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJvdGF0ZSBzZWxmLiBJbiBvcmRlciB0byBjb21wYXRpYmxlIHdpdGggdGhlIHZlYzIgQVBJLlxuICAgICAqICEjemgg5oyJ5oyH5a6a5byn5bqm5peL6L2s5ZCR6YeP44CC6K+l5pa55rOV5LuF55So5YGa5YW85a65IDJEIOiuoeeul+OAglxuICAgICAqIEBtZXRob2Qgcm90YXRlU2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICogQHJldHVybiB7VmVjM30gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgcm90YXRlU2VsZiAocmFkaWFucykge1xuICAgICAgICBjYy53YXJuSUQoMTQwOCwgJ3ZlYzMucm90YXRlU2VsZicsICd2Mi4xJywgJ2NjLnYyKHNlbGZWZWN0b3IpLnJvdGF0ZVNlbGYocmFkaWFucyknKTtcbiAgICAgICAgcmV0dXJuIFZlYzIucHJvdG90eXBlLnJvdGF0ZVNlbGYuY2FsbCh0aGlzLCByYWRpYW5zKTtcbiAgICB9XG59XG5cbmNvbnN0IHYzXzEgPSBuZXcgVmVjMygpO1xuY29uc3QgdjNfMiA9IG5ldyBWZWMzKCk7XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuVmVjMycsIFZlYzMsIHsgeDogMCwgeTogMCwgejogMCB9KTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIlZlYzNcIn19Y2MuVmVjM3t7L2Nyb3NzTGlua319LlxuICogISN6aCDpgJrov4for6XnroDkvr/nmoTlh73mlbDov5vooYzliJvlu7oge3sjY3Jvc3NMaW5rIFwiVmVjM1wifX1jYy5WZWMze3svY3Jvc3NMaW5rfX0g5a+56LGh44CCXG4gKiBAbWV0aG9kIHYzXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IFt4PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbej0wXVxuICogQHJldHVybiB7VmVjM31cbiAqIEBleGFtcGxlXG4gKiB2YXIgdjEgPSBjYy52MygpO1xuICogdmFyIHYyID0gY2MudjMoMCwgMCwgMCk7XG4gKiB2YXIgdjMgPSBjYy52Myh2Mik7XG4gKiB2YXIgdjQgPSBjYy52Myh7eDogMTAwLCB5OiAxMDAsIHo6IDB9KTtcbiAqL1xuY2MudjMgPSBmdW5jdGlvbiB2MyAoeCwgeSwgeikge1xuICAgIHJldHVybiBuZXcgVmVjMyh4LCB5LCB6KTtcbn07XG5cbmNjLlZlYzMgPSBWZWMzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=