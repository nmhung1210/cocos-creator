
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec4.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.v4 = v4;
exports["default"] = void 0;

var _CCClass = _interopRequireDefault(require("../platform/CCClass"));

var _valueType = _interopRequireDefault(require("./value-type"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _x = 0.0;
var _y = 0.0;
var _z = 0.0;
var _w = 0.0;
/**
 * !#en Representation of 3D vectors and points.
 * !#zh 表示 3D 向量和坐标
 *
 * @class Vec4
 * @extends ValueType
 */

var Vec4 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec4, _ValueType);

  var _proto = Vec4.prototype;

  // deprecated

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.sub = function sub(vector, out) {
    return Vec4.subtract(out || new Vec4(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.mul = function mul(num, out) {
    return Vec4.multiplyScalar(out || new Vec4(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.div = function div(num, out) {
    return Vec4.multiplyScalar(out || new Vec4(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.scale = function scale(vector, out) {
    return Vec4.multiply(out || new Vec4(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  _proto.neg = function neg(out) {
    return Vec4.negate(out || new Vec4(), this);
  };

  /**
   * !#zh 获得指定向量的拷贝
   * !#en Obtaining copy vectors designated
   * @method clone
   * @typescript
   * clone <Out extends IVec4Like> (a: Out): Vec4
   * @static
   */
  Vec4.clone = function clone(a) {
    return new Vec4(a.x, a.y, a.z, a.w);
  }
  /**
   * !#zh 复制目标向量
   * !#en Copy the target vector
   * @method copy
   * @typescript
   * copy <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    out.z = a.z;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 设置向量值
   * !#en Set to value
   * @method set
   * @typescript
   * set <Out extends IVec4Like> (out: Out, x: number, y: number, z: number, w: number): Out
   * @static
   */
  ;

  Vec4.set = function set(out, x, y, z, w) {
    out.x = x;
    out.y = y;
    out.z = z;
    out.w = w;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * !#en Element-wise vector addition
   * @method add
   * @typescript
   * add <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    out.z = a.z + b.z;
    out.w = a.w + b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * !#en Element-wise vector subtraction
   * @method subtract
   * @typescript
   * subtract <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    out.z = a.z - b.z;
    out.w = a.w - b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法
   * !#en Element-wise vector multiplication
   * @method multiply
   * @typescript
   * multiply <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    out.z = a.z * b.z;
    out.w = a.w * b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * !#en Element-wise vector division
   * @method divide
   * @typescript
   * divide <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    out.z = a.z / b.z;
    out.w = a.w / b.w;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * !#en Rounding up by elements of the vector
   * @method ceil
   * @typescript
   * ceil <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    out.z = Math.ceil(a.z);
    out.w = Math.ceil(a.w);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * !#en Element vector by rounding down
   * @method floor
   * @typescript
   * floor <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    out.z = Math.floor(a.z);
    out.w = Math.floor(a.w);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * !#en The minimum by-element vector
   * @method min
   * @typescript
   * min <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    out.z = Math.min(a.z, b.z);
    out.w = Math.min(a.w, b.w);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * !#en The maximum value of the element-wise vector
   * @method max
   * @typescript
   * max <Out extends IVec4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec4.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    out.z = Math.max(a.z, b.z);
    out.w = Math.max(a.w, b.w);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * !#en Element-wise vector of rounding to whole
   * @method round
   * @typescript
   * round <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    out.z = Math.round(a.z);
    out.w = Math.round(a.w);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * !#en Vector scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar <Out extends IVec4Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Vec4.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    out.z = a.z * b;
    out.w = a.w * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * !#en Element-wise vector multiply add: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd <Out extends IVec4Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec4.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    out.z = a.z + b.z * scale;
    out.w = a.w + b.w * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * !#en Seeking two vectors Euclidean distance
   * @method distance
   * @typescript
   * distance <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.distance = function distance(a, b) {
    var x = b.x - a.x;
    var y = b.y - a.y;
    var z = b.z - a.z;
    var w = b.w - a.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * !#en Euclidean distance squared seeking two vectors
   * @method squaredDistance
   * @typescript
   * squaredDistance <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.squaredDistance = function squaredDistance(a, b) {
    var x = b.x - a.x;
    var y = b.y - a.y;
    var z = b.z - a.z;
    var w = b.w - a.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * !#zh 求向量长度
   * !#en Seeking vector length
   * @method len
   * @typescript
   * len <Out extends IVec4Like> (a: Out): number
   * @static
   */
  ;

  Vec4.len = function len(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    return Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
  }
  /**
   * !#zh 求向量长度平方
   * !#en Seeking squared vector length
   * @method lengthSqr
   * @typescript
   * lengthSqr <Out extends IVec4Like> (a: Out): number
   * @static
   */
  ;

  Vec4.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    return _x * _x + _y * _y + _z * _z + _w * _w;
  }
  /**
   * !#zh 逐元素向量取负
   * !#en By taking the negative elements of the vector
   * @method negate
   * @typescript
   * negate <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    out.z = -a.z;
    out.w = -a.w;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * !#en Element vector by taking the inverse, return near 0 Infinity
   * @method inverse
   * @typescript
   * inverse <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    out.z = 1.0 / a.z;
    out.w = 1.0 / a.w;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * !#en Element vector by taking the inverse, return near 0 0
   * @method inverseSafe
   * @typescript
   * inverseSafe <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;

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

    if (Math.abs(_w) < _utils.EPSILON) {
      out.w = 0;
    } else {
      out.w = 1.0 / _w;
    }

    return out;
  }
  /**
   * !#zh 归一化向量
   * !#en Normalized vector
   * @method normalize
   * @typescript
   * normalize <Out extends IVec4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec4.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    var len = _x * _x + _y * _y + _z * _z + _w * _w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
      out.w = _w * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * !#en Vector dot product (scalar product)
   * @method dot
   * @typescript
   * dot <Out extends IVec4Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec4.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * !#en Vector element by element linear interpolation: A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp <Out extends IVec4Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec4.lerp = function lerp(out, a, b, t) {
    out.x = a.x + t * (b.x - a.x);
    out.y = a.y + t * (b.y - a.y);
    out.z = a.z + t * (b.z - a.z);
    out.w = a.w + t * (b.w - a.w);
    return out;
  }
  /**
   * !#zh 生成一个在单位球体上均匀分布的随机向量
   * !#en Generates a uniformly distributed random vectors on the unit sphere
   * @method random
   * @typescript
   * random <Out extends IVec4Like> (out: Out, scale?: number): Out
   * @param scale 生成的向量长度
   * @static
   */
  ;

  Vec4.random = function random(out, scale) {
    scale = scale || 1.0;
    var phi = (0, _utils.random)() * 2.0 * Math.PI;
    var cosTheta = (0, _utils.random)() * 2 - 1;
    var sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    out.x = sinTheta * Math.cos(phi) * scale;
    out.y = sinTheta * Math.sin(phi) * scale;
    out.z = cosTheta * scale;
    out.w = 0;
    return out;
  }
  /**
   * !#zh 向量矩阵乘法
   * !#en Vector matrix multiplication
   * @method transformMat4
   * @typescript
   * transformMat4 <Out extends IVec4Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec4.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    _z = a.z;
    _w = a.w;
    var m = mat.m;
    out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
    out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
    out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
    out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
    return out;
  }
  /**
   * !#zh 向量仿射变换
   * !#en Affine transformation vector
   * @method transformAffine
   * @typescript
   * transformAffine<Out extends IVec4Like, VecLike extends IVec4Like, MatLike extends IMat4Like>(out: Out, v: VecLike, mat: MatLike): Out
   * @static
   */
  ;

  Vec4.transformAffine = function transformAffine(out, v, mat) {
    _x = v.x;
    _y = v.y;
    _z = v.z;
    _w = v.w;
    var m = mat.m;
    out.x = m[0] * _x + m[1] * _y + m[2] * _z + m[3] * _w;
    out.y = m[4] * _x + m[5] * _y + m[6] * _z + m[7] * _w;
    out.x = m[8] * _x + m[9] * _y + m[10] * _z + m[11] * _w;
    out.w = v.w;
    return out;
  }
  /**
   * !#zh 向量四元数乘法
   * !#en Vector quaternion multiplication
   * @method transformQuat
   * @typescript
   * transformQuat <Out extends IVec4Like, QuatLike extends IQuatLike> (out: Out, a: Out, q: QuatLike): Out
   * @static
   */
  ;

  Vec4.transformQuat = function transformQuat(out, a, q) {
    var x = a.x,
        y = a.y,
        z = a.z;
    _x = q.x;
    _y = q.y;
    _z = q.z;
    _w = q.w; // calculate quat * vec

    var ix = _w * x + _y * z - _z * y;
    var iy = _w * y + _z * x - _x * z;
    var iz = _w * z + _x * y - _y * x;
    var iw = -_x * x - _y * y - _z * z; // calculate result * inverse quat

    out.x = ix * _w + iw * -_x + iy * -_z - iz * -_y;
    out.y = iy * _w + iw * -_y + iz * -_x - ix * -_z;
    out.z = iz * _w + iw * -_z + ix * -_y - iy * -_x;
    out.w = a.w;
    return out;
  }
  /**
   * !#zh 向量等价判断
   * !#en Equivalent vectors Analyzing
   * @method strictEquals
   * @typescript
   * strictEquals <Out extends IVec4Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec4.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y && a.z === b.z && a.w === b.w;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * !#en Negative error vector floating point approximately equivalent Analyzing
   * @method equals
   * @typescript
   * equals <Out extends IVec4Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Vec4.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y)) && Math.abs(a.z - b.z) <= epsilon * Math.max(1.0, Math.abs(a.z), Math.abs(b.z)) && Math.abs(a.w - b.w) <= epsilon * Math.max(1.0, Math.abs(a.w), Math.abs(b.w));
  }
  /**
   * !#zh 向量转数组
   * !#en Vector transfer array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec4Like, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec4.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    out[ofs + 2] = v.z;
    out[ofs + 3] = v.w;
    return out;
  }
  /**
   * !#zh 数组转向量
   * !#en Array steering amount
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec4Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Vec4.fromArray = function fromArray(out, arr, ofs) {
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

  _createClass(Vec4, null, [{
    key: "ZERO",
    get: function get() {
      return new Vec4(0, 0, 0, 0);
    }
  }, {
    key: "ONE",
    get: function get() {
      return new Vec4(1, 1, 1, 1);
    }
  }, {
    key: "NEG_ONE",
    get: function get() {
      return new Vec4(-1, -1, -1, -1);
    }
  }]);

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec4:method"}}cc.v4{{/crossLink}}
   * @method constructor
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {number} [z=0]
   * @param {number} [w=0]
   */
  function Vec4(x, y, z, w) {
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
      w = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.mag = Vec4.prototype.len;
    _this.magSqr = Vec4.prototype.lengthSqr;
    _this.subSelf = Vec4.prototype.subtract;
    _this.mulSelf = Vec4.prototype.multiplyScalar;
    _this.divSelf = Vec4.prototype.divide;
    _this.scaleSelf = Vec4.prototype.multiply;
    _this.negSelf = Vec4.prototype.negate;
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
   * !#en clone a Vec4 value
   * !#zh 克隆一个 Vec4 值
   * @method clone
   * @return {Vec4}
   */


  _proto.clone = function clone() {
    return new Vec4(this.x, this.y, this.z, this.w);
  }
  /**
   * !#en Set the current vector value with the given vector.
   * !#zh 用另一个向量设置当前的向量对象值。
   * @method set
   * @param {Vec4} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec4} returns this
   */
  ;

  _proto.set = function set(x, y, z, w) {
    if (x && typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
      this.w = x.w;
    } else {
      this.x = x || 0;
      this.y = y || 0;
      this.z = z || 0;
      this.w = w || 0;
    }

    return this;
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec4} other
   * @param {number} [epsilon]
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(this.x - other.x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(other.x)) && Math.abs(this.y - other.y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(other.y)) && Math.abs(this.z - other.z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(other.z)) && Math.abs(this.w - other.w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(other.w));
  }
  /**
   * !#en Check whether the vector equals another one
   * !#zh 判断当前向量是否在误差范围内与指定分量的向量相等。
   * @method equals4f
   * @param {number} x - 相比较的向量的 x 分量。
   * @param {number} y - 相比较的向量的 y 分量。
   * @param {number} z - 相比较的向量的 z 分量。
   * @param {number} w - 相比较的向量的 w 分量。
   * @param {number} [epsilon] - 允许的误差，应为非负数。
   * @returns {Boolean} - 当两向量的各分量都在指定的误差范围内分别相等时，返回 `true`；否则返回 `false`。
   */
  ;

  _proto.equals4f = function equals4f(x, y, z, w, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(this.x - x) <= epsilon * Math.max(1.0, Math.abs(this.x), Math.abs(x)) && Math.abs(this.y - y) <= epsilon * Math.max(1.0, Math.abs(this.y), Math.abs(y)) && Math.abs(this.z - z) <= epsilon * Math.max(1.0, Math.abs(this.z), Math.abs(z)) && Math.abs(this.w - w) <= epsilon * Math.max(1.0, Math.abs(this.w), Math.abs(w));
  }
  /**
   * !#en Check whether strict equals other Vec4
   * !#zh 判断当前向量是否与指定向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
   * @method strictEquals
   * @param {Vec4} other - 相比较的向量。
   * @returns {boolean}
   */
  ;

  _proto.strictEquals = function strictEquals(other) {
    return this.x === other.x && this.y === other.y && this.z === other.z && this.w === other.w;
  }
  /**
   * !#en Check whether strict equals other Vec4
   * !#zh 判断当前向量是否与指定分量的向量相等。两向量的各分量都分别相等时返回 `true`；否则返回 `false`。
   * @method strictEquals4f
   * @param {number} x - 指定向量的 x 分量。
   * @param {number} y - 指定向量的 y 分量。
   * @param {number} z - 指定向量的 z 分量。
   * @param {number} w - 指定向量的 w 分量。
   * @returns {boolean}
   */
  ;

  _proto.strictEquals4f = function strictEquals4f(x, y, z, w) {
    return this.x === x && this.y === y && this.z === z && this.w === w;
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 根据指定的插值比率，从当前向量到目标向量之间做插值。
   * @method lerp
   * @param {Vec4} to 目标向量。
   * @param {number} ratio 插值比率，范围为 [0,1]。
   * @returns {Vec4}
   */
  ;

  _proto.lerp = function lerp(to, ratio) {
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    this.x = _x + ratio * (to.x - _x);
    this.y = _y + ratio * (to.y - _y);
    this.z = _z + ratio * (to.z - _z);
    this.w = _w + ratio * (to.w - _w);
    return this;
  }
  /**
   * !#en Transform to string with vector informations
   * !#zh 返回当前向量的字符串表示。
   * @method toString
   * @returns {string} 当前向量的字符串表示。
   */
  ;

  _proto.toString = function toString() {
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.z.toFixed(2) + ", " + this.w.toFixed(2) + ")";
  }
  /**
   * !#en Clamp the vector between minInclusive and maxInclusive.
   * !#zh 设置当前向量的值，使其各个分量都处于指定的范围内。
   * @method clampf
   * @param {Vec4} minInclusive 每个分量都代表了对应分量允许的最小值。
   * @param {Vec4} maxInclusive 每个分量都代表了对应分量允许的最大值。
   * @returns {Vec4}
   */
  ;

  _proto.clampf = function clampf(minInclusive, maxInclusive) {
    this.x = (0, _utils.clamp)(this.x, minInclusive.x, maxInclusive.x);
    this.y = (0, _utils.clamp)(this.y, minInclusive.y, maxInclusive.y);
    this.z = (0, _utils.clamp)(this.z, minInclusive.z, maxInclusive.z);
    this.w = (0, _utils.clamp)(this.w, minInclusive.w, maxInclusive.w);
    return this;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    this.w += vector.w;
    return this;
  }
  /**
   * !#en Adds two vectors, and returns the new result.
   * !#zh 向量加法，并返回新结果。
   * @method add
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec4();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    out.z = this.z + vector.z;
    out.w = this.w + vector.w;
    return out;
  }
  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method subtract
   * @param {Vec4} vector
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} the result
   */
  ;

  _proto.subtract = function subtract(vector, out) {
    out = out || new Vec4();
    out.x = this.x - vector.x;
    out.y = this.y - vector.y;
    out.z = this.z - vector.z;
    out.w = this.w - vector.w;
    return out;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    this.z *= num;
    this.w *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec4} vector
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
    this.w *= vector.w;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    this.z /= num;
    this.w /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反
   * @method negate
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec4} [vector]
   * @return {number} the result
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z + this.w * vector.w;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec4} vector
   * @param {Vec4} [out]
   * @return {Vec4} the result
   */
  ;

  _proto.cross = function cross(vector, out) {
    out = out || new Vec4();
    var ax = this.x,
        ay = this.y,
        az = this.z;
    var bx = vector.x,
        by = vector.y,
        bz = vector.z;
    out.x = ay * bz - az * by;
    out.y = az * bx - ax * bz;
    out.z = ax * by - ay * bx;
    return out;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v4(10, 10);
   * v.len(); // return 14.142135623730951;
   */
  ;

  _proto.len = function len() {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    return Math.sqrt(x * x + y * y + z * z + w * w);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    return x * x + y * y + z * z + w * w;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec4} returns this
   * @chainable
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    this.normalize(this);
    return this;
  }
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
   * @param {Vec4} [out] - optional, the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @return {Vec4} result
   */
  ;

  _proto.normalize = function normalize(out) {
    out = out || new Vec4();
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    var len = _x * _x + _y * _y + _z * _z + _w * _w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
      out.z = _z * len;
      out.w = _w * len;
    }

    return out;
  }
  /**
   * Transforms the vec4 with a mat4. 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec4} [out] the receiving vector, you can pass the same vec4 to save result to itself, if not provided, a new vec4 will be created
   * @returns {Vec4} out
   */
  ;

  _proto.transformMat4 = function transformMat4(matrix, out) {
    out = out || new Vec4();
    _x = this.x;
    _y = this.y;
    _z = this.z;
    _w = this.w;
    var m = matrix.m;
    out.x = m[0] * _x + m[4] * _y + m[8] * _z + m[12] * _w;
    out.y = m[1] * _x + m[5] * _y + m[9] * _z + m[13] * _w;
    out.z = m[2] * _x + m[6] * _y + m[10] * _z + m[14] * _w;
    out.w = m[3] * _x + m[7] * _y + m[11] * _z + m[15] * _w;
    return out;
  }
  /**
   * Returns the maximum value in x, y, z, w.
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y, this.z, this.w);
  };

  return Vec4;
}(_valueType["default"]);

exports["default"] = Vec4;
Vec4.sub = Vec4.subtract;
Vec4.mul = Vec4.multiply;
Vec4.div = Vec4.divide;
Vec4.scale = Vec4.multiplyScalar;
Vec4.mag = Vec4.len;
Vec4.squaredMagnitude = Vec4.lengthSqr;
Vec4.ZERO_R = Vec4.ZERO;
Vec4.ONE_R = Vec4.ONE;
Vec4.NEG_ONE_R = Vec4.NEG_ONE;

_CCClass["default"].fastDefine('cc.Vec4', Vec4, {
  x: 0,
  y: 0,
  z: 0,
  w: 0
});

function v4(x, y, z, w) {
  return new Vec4(x, y, z, w);
}

cc.v4 = v4;
cc.Vec4 = Vec4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3ZlYzQudHMiXSwibmFtZXMiOlsiX3giLCJfeSIsIl96IiwiX3ciLCJWZWM0Iiwic3ViIiwidmVjdG9yIiwib3V0Iiwic3VidHJhY3QiLCJtdWwiLCJudW0iLCJtdWx0aXBseVNjYWxhciIsImRpdiIsInNjYWxlIiwibXVsdGlwbHkiLCJuZWciLCJuZWdhdGUiLCJjbG9uZSIsImEiLCJ4IiwieSIsInoiLCJ3IiwiY29weSIsInNldCIsImFkZCIsImIiLCJkaXZpZGUiLCJjZWlsIiwiTWF0aCIsImZsb29yIiwibWluIiwibWF4Iiwicm91bmQiLCJzY2FsZUFuZEFkZCIsImRpc3RhbmNlIiwic3FydCIsInNxdWFyZWREaXN0YW5jZSIsImxlbiIsImxlbmd0aFNxciIsImludmVyc2UiLCJpbnZlcnNlU2FmZSIsImFicyIsIkVQU0lMT04iLCJub3JtYWxpemUiLCJkb3QiLCJsZXJwIiwidCIsInJhbmRvbSIsInBoaSIsIlBJIiwiY29zVGhldGEiLCJzaW5UaGV0YSIsImNvcyIsInNpbiIsInRyYW5zZm9ybU1hdDQiLCJtYXQiLCJtIiwidHJhbnNmb3JtQWZmaW5lIiwidiIsInRyYW5zZm9ybVF1YXQiLCJxIiwiaXgiLCJpeSIsIml6IiwiaXciLCJzdHJpY3RFcXVhbHMiLCJlcXVhbHMiLCJlcHNpbG9uIiwidG9BcnJheSIsIm9mcyIsImZyb21BcnJheSIsImFyciIsIm1hZyIsInByb3RvdHlwZSIsIm1hZ1NxciIsInN1YlNlbGYiLCJtdWxTZWxmIiwiZGl2U2VsZiIsInNjYWxlU2VsZiIsIm5lZ1NlbGYiLCJvdGhlciIsImVxdWFsczRmIiwic3RyaWN0RXF1YWxzNGYiLCJ0byIsInJhdGlvIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwiY2xhbXBmIiwibWluSW5jbHVzaXZlIiwibWF4SW5jbHVzaXZlIiwiYWRkU2VsZiIsImNyb3NzIiwiYXgiLCJheSIsImF6IiwiYngiLCJieSIsImJ6Iiwibm9ybWFsaXplU2VsZiIsIm1hdHJpeCIsIm1heEF4aXMiLCJWYWx1ZVR5cGUiLCJzcXVhcmVkTWFnbml0dWRlIiwiWkVST19SIiwiWkVSTyIsIk9ORV9SIiwiT05FIiwiTkVHX09ORV9SIiwiTkVHX09ORSIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwidjQiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFDQSxJQUFJQyxFQUFVLEdBQUcsR0FBakI7QUFFQTs7Ozs7Ozs7SUFPcUJDOzs7OztBQUNqQjs7QUFTQTs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O1NBUUFDLE1BQUEsYUFBS0MsTUFBTCxFQUFtQkMsR0FBbkIsRUFBK0I7QUFDM0IsV0FBT0gsSUFBSSxDQUFDSSxRQUFMLENBQWNELEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQXJCLEVBQWlDLElBQWpDLEVBQXVDRSxNQUF2QyxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7OztBQVNBOzs7Ozs7OztTQVFBRyxNQUFBLGFBQUtDLEdBQUwsRUFBa0JILEdBQWxCLEVBQThCO0FBQzFCLFdBQU9ILElBQUksQ0FBQ08sY0FBTCxDQUFvQkosR0FBRyxJQUFJLElBQUlILElBQUosRUFBM0IsRUFBdUMsSUFBdkMsRUFBNkNNLEdBQTdDLENBQVA7QUFDSDtBQUNEOzs7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O1NBUUFFLE1BQUEsYUFBS0YsR0FBTCxFQUFrQkgsR0FBbEIsRUFBb0M7QUFDaEMsV0FBT0gsSUFBSSxDQUFDTyxjQUFMLENBQW9CSixHQUFHLElBQUksSUFBSUgsSUFBSixFQUEzQixFQUF1QyxJQUF2QyxFQUE2QyxJQUFFTSxHQUEvQyxDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs7OztBQVNBOzs7Ozs7OztTQVFBRyxRQUFBLGVBQU9QLE1BQVAsRUFBcUJDLEdBQXJCLEVBQWlD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QUFBQSxDQUFDLEVBQUUsQ0FBTDtBQUFRQyxFQUFBQSxDQUFDLEVBQUUsQ0FBWDtBQUFjQyxFQUFBQSxDQUFDLEVBQUUsQ0FBakI7QUFBb0JDLEVBQUFBLENBQUMsRUFBRTtBQUF2QixDQUFwQzs7QUFLTyxTQUFTMEYsRUFBVCxDQUFhN0YsQ0FBYixFQUFnQ0MsQ0FBaEMsRUFBNENDLENBQTVDLEVBQXdEQyxDQUF4RCxFQUFvRTtBQUN2RSxTQUFPLElBQUlsQixJQUFKLENBQVNlLENBQVQsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QkMsQ0FBekIsQ0FBUDtBQUNIOztBQUVEMkYsRUFBRSxDQUFDRCxFQUFILEdBQVFBLEVBQVI7QUFDQUMsRUFBRSxDQUFDN0csSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBDb3B5cmlnaHQgKGMpIDIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2Nvcy5jb21cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgQ0NDbGFzcyBmcm9tICcuLi9wbGF0Zm9ybS9DQ0NsYXNzJztcbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcbmltcG9ydCBNYXQ0IGZyb20gJy4vbWF0NCc7XG5pbXBvcnQgeyBjbGFtcCwgRVBTSUxPTiwgcmFuZG9tIH0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBfeDogbnVtYmVyID0gMC4wO1xubGV0IF95OiBudW1iZXIgPSAwLjA7XG5sZXQgX3o6IG51bWJlciA9IDAuMDtcbmxldCBfdzogbnVtYmVyID0gMC4wO1xuXG4vKipcbiAqICEjZW4gUmVwcmVzZW50YXRpb24gb2YgM0QgdmVjdG9ycyBhbmQgcG9pbnRzLlxuICogISN6aCDooajnpLogM0Qg5ZCR6YeP5ZKM5Z2Q5qCHXG4gKlxuICogQGNsYXNzIFZlYzRcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWM0IGV4dGVuZHMgVmFsdWVUeXBlIHtcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgcHVibGljIHN0YXRpYyBzdWIgICA9IFZlYzQuc3VidHJhY3Q7XG4gICAgcHVibGljIHN0YXRpYyBtdWwgICA9IFZlYzQubXVsdGlwbHk7XG4gICAgcHVibGljIHN0YXRpYyBkaXYgPSBWZWM0LmRpdmlkZTtcbiAgICBwdWJsaWMgc3RhdGljIHNjYWxlID0gVmVjNC5tdWx0aXBseVNjYWxhcjtcbiAgICBwdWJsaWMgc3RhdGljIG1hZyAgID0gVmVjNC5sZW47XG4gICAgcHVibGljIHN0YXRpYyBzcXVhcmVkTWFnbml0dWRlID0gVmVjNC5sZW5ndGhTcXI7XG4gICAgbWFnICA9IFZlYzQucHJvdG90eXBlLmxlbjtcbiAgICBtYWdTcXIgPSBWZWM0LnByb3RvdHlwZS5sZW5ndGhTcXI7XG4gICAgLyoqXG4gICAgICogISNlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2Ugc3ViKCkgaW5zdGVhZC5cbiAgICAgKiAhI3poIOWQkemHj+WHj+azleOAguWmguaenOS9oOaDs+S/neWtmOe7k+aenOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBzdWIoKSDku6Pmm7/jgIJcbiAgICAgKiBAbWV0aG9kIHN1YlNlbGZcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzdWJTZWxmICA9IFZlYzQucHJvdG90eXBlLnN1YnRyYWN0O1xuICAgIC8qKlxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLCBhbmQgcmV0dXJucyB0aGUgbmV3IHJlc3VsdC5cbiAgICAgKiAhI3poIOWQkemHj+WHj+azle+8jOW5tui/lOWbnuaWsOe7k+aenOOAglxuICAgICAqIEBtZXRob2Qgc3ViXG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgc3ViICh2ZWN0b3I6IFZlYzQsIG91dD86IFZlYzQpIHtcbiAgICAgICAgcmV0dXJuIFZlYzQuc3VidHJhY3Qob3V0IHx8IG5ldyBWZWM0KCksIHRoaXMsIHZlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGlzIGJ5IGEgbnVtYmVyLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIG11bCgpIGluc3RlYWQuXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggbXVsKCkg5Luj5pu/44CCXG4gICAgICogQG1ldGhvZCBtdWxTZWxmXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBtdWxTZWxmICA9IFZlYzQucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyO1xuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyBieSBhIG51bWJlciwgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDnvKnmlL7lkJHph4/vvIzlubbov5Tlm57mlrDnu5PmnpzjgIJcbiAgICAgKiBAbWV0aG9kIG11bFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbXVsIChudW06IG51bWJlciwgb3V0PzogVmVjNCkge1xuICAgICAgICByZXR1cm4gVmVjNC5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IFZlYzQoKSwgdGhpcywgbnVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIGRpdigpIGluc3RlYWQuXG4gICAgICogISN6aCDlkJHph4/pmaTms5XjgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggZGl2KCkg5Luj5pu/44CCXG4gICAgICogQG1ldGhvZCBkaXZTZWxmXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBkaXZTZWxmICA9IFZlYzQucHJvdG90eXBlLmRpdmlkZTtcbiAgICAvKipcbiAgICAgKiAhI2VuIERpdmlkZXMgYnkgYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV77yM5bm26L+U5Zue5paw55qE57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBkaXZcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjNH0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGRpdiAobnVtOiBudW1iZXIsIG91dD86IFZlYzQpOiBWZWM0IHtcbiAgICAgICAgcmV0dXJuIFZlYzQubXVsdGlwbHlTY2FsYXIob3V0IHx8IG5ldyBWZWM0KCksIHRoaXMsIDEvbnVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHR3byB2ZWN0b3JzLlxuICAgICAqICEjemgg5YiG6YeP55u45LmY44CCXG4gICAgICogQG1ldGhvZCBzY2FsZVNlbGZcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzY2FsZVNlbGYgPSBWZWM0LnByb3RvdHlwZS5tdWx0aXBseTtcbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg5YiG6YeP55u45LmY77yM5bm26L+U5Zue5paw55qE57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7VmVjNH0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjNH0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIHNjYWxlICh2ZWN0b3I6IFZlYzQsIG91dD86IFZlYzQpIHtcbiAgICAgICAgcmV0dXJuIFZlYzQubXVsdGlwbHkob3V0IHx8IG5ldyBWZWM0KCksIHRoaXMsIHZlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cy4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBuZWcoKSBpbnN0ZWFkLlxuICAgICAqICEjemgg5ZCR6YeP5Y+W5Y+N44CC5aaC5p6c5L2g5oOz57uT5p6c5L+d5a2Y5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5Y+v5L2/55SoIG5lZygpIOS7o+abv+OAglxuICAgICAqIEBtZXRob2QgbmVnU2VsZlxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBuZWdTZWxmID0gVmVjNC5wcm90b3R5cGUubmVnYXRlO1xuICAgIC8qKlxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDov5Tlm57lj5blj43lkI7nmoTmlrDlkJHph4/jgIJcbiAgICAgKiBAbWV0aG9kIG5lZ1xuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWM0IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWM0IHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBuZWcgKG91dD86IFZlYzQpIHtcbiAgICAgICAgcmV0dXJuIFZlYzQubmVnYXRlKG91dCB8fCBuZXcgVmVjNCgpLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBaRVJPICgpIHsgcmV0dXJuIG5ldyBWZWM0KDAsIDAsIDAsIDApOyB9XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBaRVJPX1IgPSBWZWM0LlpFUk87XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBPTkUgKCkgeyByZXR1cm4gbmV3IFZlYzQoMSwgMSwgMSwgMSk7IH1cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IE9ORV9SID0gVmVjNC5PTkU7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldCBORUdfT05FICgpIHsgcmV0dXJuIG5ldyBWZWM0KC0xLCAtMSwgLTEsIC0xKTsgfVxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgTkVHX09ORV9SID0gVmVjNC5ORUdfT05FO1xuXG4gICAgLyoqXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cbiAgICAgKiAhI2VuIE9idGFpbmluZyBjb3B5IHZlY3RvcnMgZGVzaWduYXRlZFxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNsb25lIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQpOiBWZWM0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzQoYS54LCBhLnksIGEueiwgYS53KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWkjeWItuebruagh+WQkemHj1xuICAgICAqICEjZW4gQ29weSB0aGUgdGFyZ2V0IHZlY3RvclxuICAgICAqIEBtZXRob2QgY29weVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29weSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvcHkgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLng7XG4gICAgICAgIG91dC55ID0gYS55O1xuICAgICAgICBvdXQueiA9IGEuejtcbiAgICAgICAgb3V0LncgPSBhLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorr7nva7lkJHph4/lgLxcbiAgICAgKiAhI2VuIFNldCB0byB2YWx1ZVxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzZXQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCB4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyLCB3OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSB4O1xuICAgICAgICBvdXQueSA9IHk7XG4gICAgICAgIG91dC56ID0gejtcbiAgICAgICAgb3V0LncgPSB3O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGFkZGl0aW9uXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGFkZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgYWRkIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyBiLng7XG4gICAgICAgIG91dC55ID0gYS55ICsgYi55O1xuICAgICAgICBvdXQueiA9IGEueiArIGIuejtcbiAgICAgICAgb3V0LncgPSBhLncgKyBiLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lh4/ms5VcbiAgICAgKiAhI2VuIEVsZW1lbnQtd2lzZSB2ZWN0b3Igc3VidHJhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc3VidHJhY3QgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueCAtIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLSBiLnk7XG4gICAgICAgIG91dC56ID0gYS56IC0gYi56O1xuICAgICAgICBvdXQudyA9IGEudyAtIGIudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOazlVxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBsaWNhdGlvblxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54ICogYi54O1xuICAgICAgICBvdXQueSA9IGEueSAqIGIueTtcbiAgICAgICAgb3V0LnogPSBhLnogKiBiLno7XG4gICAgICAgIG91dC53ID0gYS53ICogYi53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIGRpdmlzaW9uXG4gICAgICogQG1ldGhvZCBkaXZpZGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRpdmlkZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGl2aWRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggLyBiLng7XG4gICAgICAgIG91dC55ID0gYS55IC8gYi55O1xuICAgICAgICBvdXQueiA9IGEueiAvIGIuejtcbiAgICAgICAgb3V0LncgPSBhLncgLyBiLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lkJHkuIrlj5bmlbRcbiAgICAgKiAhI2VuIFJvdW5kaW5nIHVwIGJ5IGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIGNlaWxcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNlaWwgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjZWlsIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5jZWlsKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5jZWlsKGEueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5jZWlsKGEueik7XG4gICAgICAgIG91dC53ID0gTWF0aC5jZWlsKGEudyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lkJHkuIvlj5bmlbRcbiAgICAgKiAhI2VuIEVsZW1lbnQgdmVjdG9yIGJ5IHJvdW5kaW5nIGRvd25cbiAgICAgKiBAbWV0aG9kIGZsb29yXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZsb29yIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5mbG9vcihhLngpO1xuICAgICAgICBvdXQueSA9IE1hdGguZmxvb3IoYS55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLmZsb29yKGEueik7XG4gICAgICAgIG91dC53ID0gTWF0aC5mbG9vcihhLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5bCP5YC8XG4gICAgICogISNlbiBUaGUgbWluaW11bSBieS1lbGVtZW50IHZlY3RvclxuICAgICAqIEBtZXRob2QgbWluXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtaW4gPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1pbiA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5taW4oYS54LCBiLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgubWluKGEueSwgYi55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLm1pbihhLnosIGIueik7XG4gICAgICAgIG91dC53ID0gTWF0aC5taW4oYS53LCBiLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XG4gICAgICogISNlbiBUaGUgbWF4aW11bSB2YWx1ZSBvZiB0aGUgZWxlbWVudC13aXNlIHZlY3RvclxuICAgICAqIEBtZXRob2QgbWF4XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtYXggPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG1heCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYS54LCBiLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgubWF4KGEueSwgYi55KTtcbiAgICAgICAgb3V0LnogPSBNYXRoLm1heChhLnosIGIueik7XG4gICAgICAgIG91dC53ID0gTWF0aC5tYXgoYS53LCBiLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Zub6IiN5LqU5YWl5Y+W5pW0XG4gICAgICogISNlbiBFbGVtZW50LXdpc2UgdmVjdG9yIG9mIHJvdW5kaW5nIHRvIHdob2xlXG4gICAgICogQG1ldGhvZCByb3VuZFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm91bmQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyByb3VuZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGgucm91bmQoYS54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLnJvdW5kKGEueSk7XG4gICAgICAgIG91dC56ID0gTWF0aC5yb3VuZChhLnopO1xuICAgICAgICBvdXQudyA9IE1hdGgucm91bmQoYS53KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+agh+mHj+S5mOazlVxuICAgICAqICEjZW4gVmVjdG9yIHNjYWxhciBtdWx0aXBsaWNhdGlvblxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlTY2FsYXJcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5U2NhbGFyIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBtdWx0aXBseVNjYWxhciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICogYjtcbiAgICAgICAgb3V0LnkgPSBhLnkgKiBiO1xuICAgICAgICBvdXQueiA9IGEueiAqIGI7XG4gICAgICAgIG91dC53ID0gYS53ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxuICAgICAqICEjZW4gRWxlbWVudC13aXNlIHZlY3RvciBtdWx0aXBseSBhZGQ6IEEgKyBCICogc2NhbGVcbiAgICAgKiBAbWV0aG9kIHNjYWxlQW5kQWRkXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzY2FsZUFuZEFkZCA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCBzY2FsZTogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2NhbGVBbmRBZGQgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCArIChiLnggKiBzY2FsZSk7XG4gICAgICAgIG91dC55ID0gYS55ICsgKGIueSAqIHNjYWxlKTtcbiAgICAgICAgb3V0LnogPSBhLnogKyAoYi56ICogc2NhbGUpO1xuICAgICAgICBvdXQudyA9IGEudyArIChiLncgKiBzY2FsZSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcbiAgICAgKiAhI2VuIFNlZWtpbmcgdHdvIHZlY3RvcnMgRXVjbGlkZWFuIGRpc3RhbmNlXG4gICAgICogQG1ldGhvZCBkaXN0YW5jZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGNvbnN0IHggPSBiLnggLSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBiLnkgLSBhLnk7XG4gICAgICAgIGNvbnN0IHogPSBiLnogLSBhLno7XG4gICAgICAgIGNvbnN0IHcgPSBiLncgLSBhLnc7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a75bmz5pa5XG4gICAgICogISNlbiBFdWNsaWRlYW4gZGlzdGFuY2Ugc3F1YXJlZCBzZWVraW5nIHR3byB2ZWN0b3JzXG4gICAgICogQG1ldGhvZCBzcXVhcmVkRGlzdGFuY2VcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzcXVhcmVkRGlzdGFuY2UgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGNvbnN0IHggPSBiLnggLSBhLng7XG4gICAgICAgIGNvbnN0IHkgPSBiLnkgLSBhLnk7XG4gICAgICAgIGNvbnN0IHogPSBiLnogLSBhLno7XG4gICAgICAgIGNvbnN0IHcgPSBiLncgLSBhLnc7XG4gICAgICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOaxguWQkemHj+mVv+W6plxuICAgICAqICEjZW4gU2Vla2luZyB2ZWN0b3IgbGVuZ3RoXG4gICAgICogQG1ldGhvZCBsZW5cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlbiA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgX3cgPSBhLnc7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoX3ggKiBfeCArIF95ICogX3kgKyBfeiAqIF96ICsgX3cgKiBfdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqblubPmlrlcbiAgICAgKiAhI2VuIFNlZWtpbmcgc3F1YXJlZCB2ZWN0b3IgbGVuZ3RoXG4gICAgICogQG1ldGhvZCBsZW5ndGhTcXJcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlbmd0aFNxciA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAoYTogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuZ3RoU3FyIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgX3cgPSBhLnc7XG4gICAgICAgIHJldHVybiBfeCAqIF94ICsgX3kgKiBfeSArIF96ICogX3ogKyBfdyAqIF93O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W6LSfXG4gICAgICogISNlbiBCeSB0YWtpbmcgdGhlIG5lZ2F0aXZlIGVsZW1lbnRzIG9mIHRoZSB2ZWN0b3JcbiAgICAgKiBAbWV0aG9kIG5lZ2F0ZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gLWEueDtcbiAgICAgICAgb3V0LnkgPSAtYS55O1xuICAgICAgICBvdXQueiA9IC1hLno7XG4gICAgICAgIG91dC53ID0gLWEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniBJbmZpbml0eVxuICAgICAqICEjZW4gRWxlbWVudCB2ZWN0b3IgYnkgdGFraW5nIHRoZSBpbnZlcnNlLCByZXR1cm4gbmVhciAwIEluZmluaXR5XG4gICAgICogQG1ldGhvZCBpbnZlcnNlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IDEuMCAvIGEueDtcbiAgICAgICAgb3V0LnkgPSAxLjAgLyBhLnk7XG4gICAgICAgIG91dC56ID0gMS4wIC8gYS56O1xuICAgICAgICBvdXQudyA9IDEuMCAvIGEudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniAwXG4gICAgICogISNlbiBFbGVtZW50IHZlY3RvciBieSB0YWtpbmcgdGhlIGludmVyc2UsIHJldHVybiBuZWFyIDAgMFxuICAgICAqIEBtZXRob2QgaW52ZXJzZVNhZmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGludmVyc2VTYWZlIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgaW52ZXJzZVNhZmUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgX3cgPSBhLnc7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKF94KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC54ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC54ID0gMS4wIC8gX3g7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoX3kpIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgb3V0LnkgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnkgPSAxLjAgLyBfeTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyhfeikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueiA9IDEuMCAvIF96O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKF93KSA8IEVQU0lMT04pIHtcbiAgICAgICAgICAgIG91dC53ID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC53ID0gMS4wIC8gX3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5b2S5LiA5YyW5ZCR6YePXG4gICAgICogISNlbiBOb3JtYWxpemVkIHZlY3RvclxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBfeiA9IGEuejtcbiAgICAgICAgX3cgPSBhLnc7XG4gICAgICAgIGxldCBsZW4gPSBfeCAqIF94ICsgX3kgKiBfeSArIF96ICogX3ogKyBfdyAqIF93O1xuICAgICAgICBpZiAobGVuID4gMCkge1xuICAgICAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgICAgICAgb3V0LnggPSBfeCAqIGxlbjtcbiAgICAgICAgICAgIG91dC55ID0gX3kgKiBsZW47XG4gICAgICAgICAgICBvdXQueiA9IF96ICogbGVuO1xuICAgICAgICAgICAgb3V0LncgPSBfdyAqIGxlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP54K556ev77yI5pWw6YeP56ev77yJXG4gICAgICogISNlbiBWZWN0b3IgZG90IHByb2R1Y3QgKHNjYWxhciBwcm9kdWN0KVxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBkb3QgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZG90IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55ICsgYS56ICogYi56ICsgYS53ICogYi53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP57q/5oCn5o+S5YC877yaIEEgKyB0ICogKEIgLSBBKVxuICAgICAqICEjZW4gVmVjdG9yIGVsZW1lbnQgYnkgZWxlbWVudCBsaW5lYXIgaW50ZXJwb2xhdGlvbjogQSArIHQgKiAoQiAtIEEpXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsZXJwIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxlcnAgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgdDogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0gYS54ICsgdCAqIChiLnggLSBhLngpO1xuICAgICAgICBvdXQueSA9IGEueSArIHQgKiAoYi55IC0gYS55KTtcbiAgICAgICAgb3V0LnogPSBhLnogKyB0ICogKGIueiAtIGEueik7XG4gICAgICAgIG91dC53ID0gYS53ICsgdCAqIChiLncgLSBhLncpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg55Sf5oiQ5LiA5Liq5Zyo5Y2V5L2N55CD5L2T5LiK5Z2H5YyA5YiG5biD55qE6ZqP5py65ZCR6YePXG4gICAgICogISNlbiBHZW5lcmF0ZXMgYSB1bmlmb3JtbHkgZGlzdHJpYnV0ZWQgcmFuZG9tIHZlY3RvcnMgb24gdGhlIHVuaXQgc3BoZXJlXG4gICAgICogQG1ldGhvZCByYW5kb21cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHNjYWxlIOeUn+aIkOeahOWQkemHj+mVv+W6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbSA8T3V0IGV4dGVuZHMgSVZlYzRMaWtlPiAob3V0OiBPdXQsIHNjYWxlPzogbnVtYmVyKSB7XG4gICAgICAgIHNjYWxlID0gc2NhbGUgfHwgMS4wO1xuXG4gICAgICAgIGNvbnN0IHBoaSA9IHJhbmRvbSgpICogMi4wICogTWF0aC5QSTtcbiAgICAgICAgY29uc3QgY29zVGhldGEgPSByYW5kb20oKSAqIDIgLSAxO1xuICAgICAgICBjb25zdCBzaW5UaGV0YSA9IE1hdGguc3FydCgxIC0gY29zVGhldGEgKiBjb3NUaGV0YSk7XG5cbiAgICAgICAgb3V0LnggPSBzaW5UaGV0YSAqIE1hdGguY29zKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnkgPSBzaW5UaGV0YSAqIE1hdGguc2luKHBoaSkgKiBzY2FsZTtcbiAgICAgICAgb3V0LnogPSBjb3NUaGV0YSAqIHNjYWxlO1xuICAgICAgICBvdXQudyA9IDA7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/nn6npmLXkuZjms5VcbiAgICAgKiAhI2VuIFZlY3RvciBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSkge1xuICAgICAgICBfeCA9IGEueDtcbiAgICAgICAgX3kgPSBhLnk7XG4gICAgICAgIF96ID0gYS56O1xuICAgICAgICBfdyA9IGEudztcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzhdICAqIF96ICsgbVsxMl0gKiBfdztcbiAgICAgICAgb3V0LnkgPSBtWzFdICogX3ggKyBtWzVdICogX3kgKyBtWzldICAqIF96ICsgbVsxM10gKiBfdztcbiAgICAgICAgb3V0LnogPSBtWzJdICogX3ggKyBtWzZdICogX3kgKyBtWzEwXSAqIF96ICsgbVsxNF0gKiBfdztcbiAgICAgICAgb3V0LncgPSBtWzNdICogX3ggKyBtWzddICogX3kgKyBtWzExXSAqIF96ICsgbVsxNV0gKiBfdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+S7v+WwhOWPmOaNolxuICAgICAqICEjZW4gQWZmaW5lIHRyYW5zZm9ybWF0aW9uIHZlY3RvclxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtQWZmaW5lXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm1BZmZpbmU8T3V0IGV4dGVuZHMgSVZlYzRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzRMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPihvdXQ6IE91dCwgdjogVmVjTGlrZSwgbWF0OiBNYXRMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgdHJhbnNmb3JtQWZmaW5lPE91dCBleHRlbmRzIElWZWM0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWM0TGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT5cbiAgICAgICAgKG91dDogT3V0LCB2OiBWZWNMaWtlLCBtYXQ6IE1hdExpa2UpIHtcbiAgICAgICAgX3ggPSB2Lng7XG4gICAgICAgIF95ID0gdi55O1xuICAgICAgICBfeiA9IHYuejtcbiAgICAgICAgX3cgPSB2Lnc7XG4gICAgICAgIGxldCBtID0gbWF0Lm07XG4gICAgICAgIG91dC54ID0gbVswXSAqIF94ICsgbVsxXSAqIF95ICsgbVsyXSAgKiBfeiArIG1bM10gKiBfdztcbiAgICAgICAgb3V0LnkgPSBtWzRdICogX3ggKyBtWzVdICogX3kgKyBtWzZdICAqIF96ICsgbVs3XSAqIF93O1xuICAgICAgICBvdXQueCA9IG1bOF0gKiBfeCArIG1bOV0gKiBfeSArIG1bMTBdICogX3ogKyBtWzExXSAqIF93O1xuICAgICAgICBvdXQudyA9IHYudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+Wbm+WFg+aVsOS5mOazlVxuICAgICAqICEjZW4gVmVjdG9yIHF1YXRlcm5pb24gbXVsdGlwbGljYXRpb25cbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybVF1YXRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zZm9ybVF1YXQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBxOiBRdWF0TGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHRyYW5zZm9ybVF1YXQgPE91dCBleHRlbmRzIElWZWM0TGlrZSwgUXVhdExpa2UgZXh0ZW5kcyBJUXVhdExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBxOiBRdWF0TGlrZSkge1xuICAgICAgICBjb25zdCB7IHgsIHksIHogfSA9IGE7XG5cbiAgICAgICAgX3ggPSBxLng7XG4gICAgICAgIF95ID0gcS55O1xuICAgICAgICBfeiA9IHEuejtcbiAgICAgICAgX3cgPSBxLnc7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcbiAgICAgICAgY29uc3QgaXggPSBfdyAqIHggKyBfeSAqIHogLSBfeiAqIHk7XG4gICAgICAgIGNvbnN0IGl5ID0gX3cgKiB5ICsgX3ogKiB4IC0gX3ggKiB6O1xuICAgICAgICBjb25zdCBpeiA9IF93ICogeiArIF94ICogeSAtIF95ICogeDtcbiAgICAgICAgY29uc3QgaXcgPSAtX3ggKiB4IC0gX3kgKiB5IC0gX3ogKiB6O1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcbiAgICAgICAgb3V0LnggPSBpeCAqIF93ICsgaXcgKiAtX3ggKyBpeSAqIC1feiAtIGl6ICogLV95O1xuICAgICAgICBvdXQueSA9IGl5ICogX3cgKyBpdyAqIC1feSArIGl6ICogLV94IC0gaXggKiAtX3o7XG4gICAgICAgIG91dC56ID0gaXogKiBfdyArIGl3ICogLV96ICsgaXggKiAtX3kgLSBpeSAqIC1feDtcbiAgICAgICAgb3V0LncgPSBhLnc7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/nrYnku7fliKTmlq1cbiAgICAgKiAhI2VuIEVxdWl2YWxlbnQgdmVjdG9ycyBBbmFseXppbmdcbiAgICAgKiBAbWV0aG9kIHN0cmljdEVxdWFsc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc3RyaWN0RXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCk6IGJvb2xlYW5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIHJldHVybiBhLnggPT09IGIueCAmJiBhLnkgPT09IGIueSAmJiBhLnogPT09IGIueiAmJiBhLncgPT09IGIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOaOkumZpOa1rueCueaVsOivr+W3rueahOWQkemHj+i/keS8vOetieS7t+WIpOaWrVxuICAgICAqICEjZW4gTmVnYXRpdmUgZXJyb3IgdmVjdG9yIGZsb2F0aW5nIHBvaW50IGFwcHJveGltYXRlbHkgZXF1aXZhbGVudCBBbmFseXppbmdcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChhOiBPdXQsIGI6IE91dCwgZXBzaWxvbj86IG51bWJlcik6IGJvb2xlYW5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKGEueCAtIGIueCkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS54KSwgTWF0aC5hYnMoYi54KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEueSAtIGIueSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS55KSwgTWF0aC5hYnMoYi55KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEueiAtIGIueikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS56KSwgTWF0aC5hYnMoYi56KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEudyAtIGIudykgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYS53KSwgTWF0aC5hYnMoYi53KSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP6L2s5pWw57uEXG4gICAgICogISNlbiBWZWN0b3IgdHJhbnNmZXIgYXJyYXlcbiAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIHY6IElWZWM0TGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCB2OiBJVmVjNExpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0W29mcyArIDBdID0gdi54O1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSB2Lnk7XG4gICAgICAgIG91dFtvZnMgKyAyXSA9IHYuejtcbiAgICAgICAgb3V0W29mcyArIDNdID0gdi53O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5pWw57uE6L2s5ZCR6YePXG4gICAgICogISNlbiBBcnJheSBzdGVlcmluZyBhbW91bnRcbiAgICAgKiBAbWV0aG9kIGZyb21BcnJheVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJVmVjNExpa2U+IChvdXQ6IE91dCwgYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWM0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnMgPSAwKSB7XG4gICAgICAgIG91dC54ID0gYXJyW29mcyArIDBdO1xuICAgICAgICBvdXQueSA9IGFycltvZnMgKyAxXTtcbiAgICAgICAgb3V0LnogPSBhcnJbb2ZzICsgMl07XG4gICAgICAgIG91dC53ID0gYXJyW29mcyArIDNdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB4XG4gICAgICovXG4gICAgcHVibGljIHg6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB5XG4gICAgICovXG4gICAgcHVibGljIHk6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB6XG4gICAgICovXG4gICAgcHVibGljIHo6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3XG4gICAgICovXG4gICAgcHVibGljIHc6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqIHNlZSB7eyNjcm9zc0xpbmsgXCJjYy92ZWM0Om1ldGhvZFwifX1jYy52NHt7L2Nyb3NzTGlua319XG4gICAgICogISN6aFxuICAgICAqIOaehOmAoOWHveaVsO+8jOWPr+afpeeciyB7eyNjcm9zc0xpbmsgXCJjYy92ZWM0Om1ldGhvZFwifX1jYy52NHt7L2Nyb3NzTGlua319XG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbej0wXVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdz0wXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yICh4OiBudW1iZXIgfCBWZWM0ID0gMCwgeTogbnVtYmVyID0gMCwgejogbnVtYmVyID0gMCwgdzogbnVtYmVyID0gMCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggYXMgbnVtYmVyO1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgIHRoaXMueiA9IHo7XG4gICAgICAgICAgICB0aGlzLncgPSB3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBjbG9uZSBhIFZlYzQgdmFsdWVcbiAgICAgKiAhI3poIOWFi+mahuS4gOS4qiBWZWM0IOWAvFxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtWZWM0fVxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjNCh0aGlzLngsIHRoaXMueSwgdGhpcy56LCB0aGlzLncpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBjdXJyZW50IHZlY3RvciB2YWx1ZSB3aXRoIHRoZSBnaXZlbiB2ZWN0b3IuXG4gICAgICogISN6aCDnlKjlj6bkuIDkuKrlkJHph4/orr7nva7lvZPliY3nmoTlkJHph4/lr7nosaHlgLzjgIJcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEBwYXJhbSB7VmVjNH0gbmV3VmFsdWUgLSAhI2VuIG5ldyB2YWx1ZSB0byBzZXQuICEjemgg6KaB6K6+572u55qE5paw5YC8XG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXG4gICAgICovXG4gICAgcHVibGljIHNldCAob3RoZXI6IFZlYzQpO1xuXG4gICAgcHVibGljIHNldCAoeD86IG51bWJlciwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcik7XG5cbiAgICBwdWJsaWMgc2V0ICh4PzogbnVtYmVyIHwgVmVjNCwgeT86IG51bWJlciwgej86IG51bWJlciwgdz86IG51bWJlcikge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueDtcbiAgICAgICAgICAgIHRoaXMueSA9IHgueTtcbiAgICAgICAgICAgIHRoaXMueiA9IHguejtcbiAgICAgICAgICAgIHRoaXMudyA9IHgudztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHggYXMgbnVtYmVyIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgICAgICAgICB0aGlzLncgPSB3IHx8IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHRoZSB2ZWN0b3IgZXF1YWxzIGFub3RoZXIgb25lXG4gICAgICogISN6aCDlvZPliY3nmoTlkJHph4/mmK/lkKbkuI7mjIflrprnmoTlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7VmVjNH0gb3RoZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2Vwc2lsb25dXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgZXF1YWxzIChvdGhlcjogVmVjNCwgZXBzaWxvbiA9IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmFicyh0aGlzLnggLSBvdGhlci54KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLngpLCBNYXRoLmFicyhvdGhlci54KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMueSAtIG90aGVyLnkpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueSksIE1hdGguYWJzKG90aGVyLnkpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy56IC0gb3RoZXIueikgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy56KSwgTWF0aC5hYnMob3RoZXIueikpICYmXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLncgLSBvdGhlci53KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLncpLCBNYXRoLmFicyhvdGhlci53KSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0aGUgdmVjdG9yIGVxdWFscyBhbm90aGVyIG9uZVxuICAgICAqICEjemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5Zyo6K+v5beu6IyD5Zu05YaF5LiO5oyH5a6a5YiG6YeP55qE5ZCR6YeP55u4562J44CCXG4gICAgICogQG1ldGhvZCBlcXVhbHM0ZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g55u45q+U6L6D55qE5ZCR6YeP55qEIHgg5YiG6YeP44CCXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgLSDnm7jmr5TovoPnmoTlkJHph4/nmoQgeSDliIbph4/jgIJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geiAtIOebuOavlOi+g+eahOWQkemHj+eahCB6IOWIhumHj+OAglxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3IC0g55u45q+U6L6D55qE5ZCR6YeP55qEIHcg5YiG6YeP44CCXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtlcHNpbG9uXSAtIOWFgeiuuOeahOivr+W3ru+8jOW6lOS4uumdnui0n+aVsOOAglxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSAtIOW9k+S4pOWQkemHj+eahOWQhOWIhumHj+mDveWcqOaMh+WumueahOivr+W3ruiMg+WbtOWGheWIhuWIq+ebuOetieaXtu+8jOi/lOWbniBgdHJ1ZWDvvJvlkKbliJnov5Tlm54gYGZhbHNlYOOAglxuICAgICAqL1xuICAgIHB1YmxpYyBlcXVhbHM0ZiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgdzogbnVtYmVyLCBlcHNpbG9uID0gRVBTSUxPTikge1xuICAgICAgICByZXR1cm4gKE1hdGguYWJzKHRoaXMueCAtIHgpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMueCksIE1hdGguYWJzKHgpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy55IC0geSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnModGhpcy55KSwgTWF0aC5hYnMoeSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLnogLSB6KSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyh0aGlzLnopLCBNYXRoLmFicyh6KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKHRoaXMudyAtIHcpIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKHRoaXMudyksIE1hdGguYWJzKHcpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHN0cmljdCBlcXVhbHMgb3RoZXIgVmVjNFxuICAgICAqICEjemgg5Yik5pat5b2T5YmN5ZCR6YeP5piv5ZCm5LiO5oyH5a6a5ZCR6YeP55u4562J44CC5Lik5ZCR6YeP55qE5ZCE5YiG6YeP6YO95YiG5Yir55u4562J5pe26L+U5ZueIGB0cnVlYO+8m+WQpuWImei/lOWbniBgZmFsc2Vg44CCXG4gICAgICogQG1ldGhvZCBzdHJpY3RFcXVhbHNcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IG90aGVyIC0g55u45q+U6L6D55qE5ZCR6YeP44CCXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgcHVibGljIHN0cmljdEVxdWFscyAob3RoZXI6IFZlYzQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnkgJiYgdGhpcy56ID09PSBvdGhlci56ICYmIHRoaXMudyA9PT0gb3RoZXIudztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENoZWNrIHdoZXRoZXIgc3RyaWN0IGVxdWFscyBvdGhlciBWZWM0XG4gICAgICogISN6aCDliKTmlq3lvZPliY3lkJHph4/mmK/lkKbkuI7mjIflrprliIbph4/nmoTlkJHph4/nm7jnrYnjgILkuKTlkJHph4/nmoTlkITliIbph4/pg73liIbliKvnm7jnrYnml7bov5Tlm54gYHRydWVg77yb5ZCm5YiZ6L+U5ZueIGBmYWxzZWDjgIJcbiAgICAgKiBAbWV0aG9kIHN0cmljdEVxdWFsczRmXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggLSDmjIflrprlkJHph4/nmoQgeCDliIbph4/jgIJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSAtIOaMh+WumuWQkemHj+eahCB5IOWIhumHj+OAglxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB6IC0g5oyH5a6a5ZCR6YeP55qEIHog5YiG6YeP44CCXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgLSDmjIflrprlkJHph4/nmoQgdyDliIbph4/jgIJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RyaWN0RXF1YWxzNGYgKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIHc6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy54ID09PSB4ICYmIHRoaXMueSA9PT0geSAmJiB0aGlzLnogPT09IHogJiYgdGhpcy53ID09PSB3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsY3VsYXRlIGxpbmVhciBpbnRlcnBvbGF0aW9uIHJlc3VsdCBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIG9uZSB3aXRoIGdpdmVuIHJhdGlvXG4gICAgICogISN6aCDmoLnmja7mjIflrprnmoTmj5LlgLzmr5TnjofvvIzku47lvZPliY3lkJHph4/liLDnm67moIflkJHph4/kuYvpl7TlgZrmj5LlgLzjgIJcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHRvIOebruagh+WQkemHj+OAglxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYXRpbyDmj5LlgLzmr5TnjofvvIzojIPlm7TkuLogWzAsMV3jgIJcbiAgICAgKiBAcmV0dXJucyB7VmVjNH1cbiAgICAgKi9cbiAgICBwdWJsaWMgbGVycCAodG86IFZlYzQsIHJhdGlvOiBudW1iZXIpIHtcbiAgICAgICAgX3ggPSB0aGlzLng7XG4gICAgICAgIF95ID0gdGhpcy55O1xuICAgICAgICBfeiA9IHRoaXMuejtcbiAgICAgICAgX3cgPSB0aGlzLnc7XG4gICAgICAgIHRoaXMueCA9IF94ICsgcmF0aW8gKiAodG8ueCAtIF94KTtcbiAgICAgICAgdGhpcy55ID0gX3kgKyByYXRpbyAqICh0by55IC0gX3kpO1xuICAgICAgICB0aGlzLnogPSBfeiArIHJhdGlvICogKHRvLnogLSBfeik7XG4gICAgICAgIHRoaXMudyA9IF93ICsgcmF0aW8gKiAodG8udyAtIF93KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUcmFuc2Zvcm0gdG8gc3RyaW5nIHdpdGggdmVjdG9yIGluZm9ybWF0aW9uc1xuICAgICAqICEjemgg6L+U5Zue5b2T5YmN5ZCR6YeP55qE5a2X56ym5Liy6KGo56S644CCXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IOW9k+WJjeWQkemHj+eahOWtl+espuS4suihqOekuuOAglxuICAgICAqL1xuICAgIHB1YmxpYyB0b1N0cmluZyAoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAoJHt0aGlzLngudG9GaXhlZCgyKX0sICR7dGhpcy55LnRvRml4ZWQoMil9LCAke3RoaXMuei50b0ZpeGVkKDIpfSwgJHt0aGlzLncudG9GaXhlZCgyKX0pYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENsYW1wIHRoZSB2ZWN0b3IgYmV0d2VlbiBtaW5JbmNsdXNpdmUgYW5kIG1heEluY2x1c2l2ZS5cbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeWQkemHj+eahOWAvO+8jOS9v+WFtuWQhOS4quWIhumHj+mDveWkhOS6juaMh+WumueahOiMg+WbtOWGheOAglxuICAgICAqIEBtZXRob2QgY2xhbXBmXG4gICAgICogQHBhcmFtIHtWZWM0fSBtaW5JbmNsdXNpdmUg5q+P5Liq5YiG6YeP6YO95Luj6KGo5LqG5a+55bqU5YiG6YeP5YWB6K6455qE5pyA5bCP5YC844CCXG4gICAgICogQHBhcmFtIHtWZWM0fSBtYXhJbmNsdXNpdmUg5q+P5Liq5YiG6YeP6YO95Luj6KGo5LqG5a+55bqU5YiG6YeP5YWB6K6455qE5pyA5aSn5YC844CCXG4gICAgICogQHJldHVybnMge1ZlYzR9XG4gICAgICovXG4gICAgcHVibGljIGNsYW1wZiAobWluSW5jbHVzaXZlOiBWZWM0LCBtYXhJbmNsdXNpdmU6IFZlYzQpIHtcbiAgICAgICAgdGhpcy54ID0gY2xhbXAodGhpcy54LCBtaW5JbmNsdXNpdmUueCwgbWF4SW5jbHVzaXZlLngpO1xuICAgICAgICB0aGlzLnkgPSBjbGFtcCh0aGlzLnksIG1pbkluY2x1c2l2ZS55LCBtYXhJbmNsdXNpdmUueSk7XG4gICAgICAgIHRoaXMueiA9IGNsYW1wKHRoaXMueiwgbWluSW5jbHVzaXZlLnosIG1heEluY2x1c2l2ZS56KTtcbiAgICAgICAgdGhpcy53ID0gY2xhbXAodGhpcy53LCBtaW5JbmNsdXNpdmUudywgbWF4SW5jbHVzaXZlLncpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgdGhpcyB2ZWN0b3IuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgYWRkKCkgaW5zdGVhZC5cbiAgICAgKiAhI3poIOWQkemHj+WKoOazleOAguWmguaenOS9oOaDs+S/neWtmOe7k+aenOWIsOWPpuS4gOS4quWQkemHj++8jOS9v+eUqCBhZGQoKSDku6Pmm7/jgIJcbiAgICAgKiBAbWV0aG9kIGFkZFNlbGZcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBhZGRTZWxmICh2ZWN0b3I6IFZlYzQpOiB0aGlzIHtcbiAgICAgICAgdGhpcy54ICs9IHZlY3Rvci54O1xuICAgICAgICB0aGlzLnkgKz0gdmVjdG9yLnk7XG4gICAgICAgIHRoaXMueiArPSB2ZWN0b3IuejtcbiAgICAgICAgdGhpcy53ICs9IHZlY3Rvci53O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkZHMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV77yM5bm26L+U5Zue5paw57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjNH0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWM0IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWM0IHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBhZGQgKHZlY3RvcjogVmVjNCwgb3V0PzogVmVjNCk6IFZlYzQge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzQoKTtcbiAgICAgICAgb3V0LnggPSB0aGlzLnggKyB2ZWN0b3IueDtcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgKyB2ZWN0b3IueTtcbiAgICAgICAgb3V0LnogPSB0aGlzLnogKyB2ZWN0b3IuejtcbiAgICAgICAgb3V0LncgPSB0aGlzLncgKyB2ZWN0b3IudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XvvIzlubbov5Tlm57mlrDnu5PmnpzjgIJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcbiAgICAgKiBAcGFyYW0ge1ZlYzR9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjNCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjNCB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgc3VidHJhY3QgKHZlY3RvcjogVmVjNCwgb3V0PzogVmVjNCk6IFZlYzQge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzQoKTtcbiAgICAgICAgb3V0LnggPSB0aGlzLnggLSB2ZWN0b3IueDtcbiAgICAgICAgb3V0LnkgPSB0aGlzLnkgLSB2ZWN0b3IueTtcbiAgICAgICAgb3V0LnogPSB0aGlzLnogLSB2ZWN0b3IuejtcbiAgICAgICAgb3V0LncgPSB0aGlzLncgLSB2ZWN0b3IudztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdGhpcyBieSBhIG51bWJlci5cbiAgICAgKiAhI3poIOe8qeaUvuW9k+WJjeWQkemHj+OAglxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlTY2FsYXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIG11bHRpcGx5U2NhbGFyIChudW06IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLnggKj0gbnVtO1xuICAgICAgICB0aGlzLnkgKj0gbnVtO1xuICAgICAgICB0aGlzLnogKj0gbnVtO1xuICAgICAgICB0aGlzLncgKj0gbnVtO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMuXG4gICAgICogISN6aCDliIbph4/nm7jkuZjjgIJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XG4gICAgICogQHBhcmFtIHtWZWM0fSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWM0fSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgbXVsdGlwbHkgKHZlY3RvcjogVmVjNCk6IHRoaXMge1xuICAgICAgICB0aGlzLnggKj0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICAgICAgdGhpcy56ICo9IHZlY3Rvci56O1xuICAgICAgICB0aGlzLncgKj0gdmVjdG9yLnc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlci5cbiAgICAgKiAhI3poIOWQkemHj+mZpOazleOAglxuICAgICAqIEBtZXRob2QgZGl2aWRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBkaXZpZGUgKG51bTogbnVtYmVyKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCAvPSBudW07XG4gICAgICAgIHRoaXMueSAvPSBudW07XG4gICAgICAgIHRoaXMueiAvPSBudW07XG4gICAgICAgIHRoaXMudyAvPSBudW07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTmVnYXRlcyB0aGUgY29tcG9uZW50cy5cbiAgICAgKiAhI3poIOWQkemHj+WPluWPjVxuICAgICAqIEBtZXRob2QgbmVnYXRlXG4gICAgICogQHJldHVybiB7VmVjNH0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIG5lZ2F0ZSAoKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHRoaXMueiA9IC10aGlzLno7XG4gICAgICAgIHRoaXMudyA9IC10aGlzLnc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gRG90IHByb2R1Y3RcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOeCueS5mOOAglxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHBhcmFtIHtWZWM0fSBbdmVjdG9yXVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqL1xuICAgIGRvdCAodmVjdG9yOiBWZWM0KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHZlY3Rvci54ICsgdGhpcy55ICogdmVjdG9yLnkgKyB0aGlzLnogKiB2ZWN0b3IueiArIHRoaXMudyAqIHZlY3Rvci53O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ3Jvc3MgcHJvZHVjdFxuICAgICAqICEjemgg5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP6L+b6KGM5Y+J5LmY44CCXG4gICAgICogQG1ldGhvZCBjcm9zc1xuICAgICAqIEBwYXJhbSB7VmVjNH0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XVxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHRoZSByZXN1bHRcbiAgICAgKi9cbiAgICBjcm9zcyAodmVjdG9yOiBWZWM0LCBvdXQ/OiBWZWM0KTogVmVjNCB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjNCgpO1xuICAgICAgICBjb25zdCB7IHg6IGF4LCB5OiBheSwgejogYXogfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgeDogYngsIHk6IGJ5LCB6OiBieiB9ID0gdmVjdG9yO1xuXG4gICAgICAgIG91dC54ID0gYXkgKiBieiAtIGF6ICogYnk7XG4gICAgICAgIG91dC55ID0gYXogKiBieCAtIGF4ICogYno7XG4gICAgICAgIG91dC56ID0gYXggKiBieSAtIGF5ICogYng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqbjgIJcbiAgICAgKiBAbWV0aG9kIGxlblxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52NCgxMCwgMTApO1xuICAgICAqIHYubGVuKCk7IC8vIHJldHVybiAxNC4xNDIxMzU2MjM3MzA5NTE7XG4gICAgICovXG4gICAgbGVuICgpOiBudW1iZXIge1xuICAgICAgICBsZXQgeCA9IHRoaXMueCxcbiAgICAgICAgICB5ID0gdGhpcy55LFxuICAgICAgICAgIHogPSB0aGlzLnosXG4gICAgICAgICAgdyA9IHRoaXMudztcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puW5s+aWueOAglxuICAgICAqIEBtZXRob2QgbGVuZ3RoU3FyXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgbGVuZ3RoU3FyICgpOiBudW1iZXIge1xuICAgICAgICBsZXQgeCA9IHRoaXMueCxcbiAgICAgICAgICB5ID0gdGhpcy55LFxuICAgICAgICAgIHogPSB0aGlzLnosXG4gICAgICAgICAgdyA9IHRoaXMudztcbiAgICAgICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWFrZSB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yIHRvIDEuXG4gICAgICogISN6aCDlkJHph4/lvZLkuIDljJbvvIzorqnov5nkuKrlkJHph4/nmoTplb/luqbkuLogMeOAglxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplU2VsZlxuICAgICAqIEByZXR1cm4ge1ZlYzR9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBub3JtYWxpemVTZWxmICgpIHtcbiAgICAgICAgdGhpcy5ub3JtYWxpemUodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoaXMgdmVjdG9yIHdpdGggYSBtYWduaXR1ZGUgb2YgMS48YnIvPlxuICAgICAqIDxici8+XG4gICAgICogTm90ZSB0aGF0IHRoZSBjdXJyZW50IHZlY3RvciBpcyB1bmNoYW5nZWQgYW5kIGEgbmV3IG5vcm1hbGl6ZWQgdmVjdG9yIGlzIHJldHVybmVkLiBJZiB5b3Ugd2FudCB0byBub3JtYWxpemUgdGhlIGN1cnJlbnQgdmVjdG9yLCB1c2Ugbm9ybWFsaXplU2VsZiBmdW5jdGlvbi5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue5b2S5LiA5YyW5ZCO55qE5ZCR6YeP44CCPGJyLz5cbiAgICAgKiA8YnIvPlxuICAgICAqIOazqOaEj++8jOW9k+WJjeWQkemHj+S4jeWPmO+8jOW5tui/lOWbnuS4gOS4quaWsOeahOW9kuS4gOWMluWQkemHj+OAguWmguaenOS9oOaDs+adpeW9kuS4gOWMluW9k+WJjeWQkemHj++8jOWPr+S9v+eUqCBub3JtYWxpemVTZWxmIOWHveaVsOOAglxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjNH0gcmVzdWx0XG4gICAgICovXG4gICAgbm9ybWFsaXplIChvdXQ/OiBWZWM0KTogVmVjNCB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjNCgpO1xuICAgICAgICBfeCA9IHRoaXMueDtcbiAgICAgICAgX3kgPSB0aGlzLnk7XG4gICAgICAgIF96ID0gdGhpcy56O1xuICAgICAgICBfdyA9IHRoaXMudztcbiAgICAgICAgbGV0IGxlbiA9IF94ICogX3ggKyBfeSAqIF95ICsgX3ogKiBfeiArIF93ICogX3c7XG4gICAgICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICAgICAgICBvdXQueCA9IF94ICogbGVuO1xuICAgICAgICAgICAgb3V0LnkgPSBfeSAqIGxlbjtcbiAgICAgICAgICAgIG91dC56ID0gX3ogKiBsZW47XG4gICAgICAgICAgICBvdXQudyA9IF93ICogbGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC4gNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcbiAgICAgKiBAcGFyYW0ge01hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAgICogQHBhcmFtIHtWZWM0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzQgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzQgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybnMge1ZlYzR9IG91dFxuICAgICAqL1xuICAgIHRyYW5zZm9ybU1hdDQgKG1hdHJpeDogTWF0NCwgb3V0OiBWZWM0KTogVmVjNCB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjNCgpO1xuICAgICAgICBfeCA9IHRoaXMueDtcbiAgICAgICAgX3kgPSB0aGlzLnk7XG4gICAgICAgIF96ID0gdGhpcy56O1xuICAgICAgICBfdyA9IHRoaXMudztcbiAgICAgICAgbGV0IG0gPSBtYXRyaXgubTtcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzhdICAqIF96ICsgbVsxMl0gKiBfdztcbiAgICAgICAgb3V0LnkgPSBtWzFdICogX3ggKyBtWzVdICogX3kgKyBtWzldICAqIF96ICsgbVsxM10gKiBfdztcbiAgICAgICAgb3V0LnogPSBtWzJdICogX3ggKyBtWzZdICogX3kgKyBtWzEwXSAqIF96ICsgbVsxNF0gKiBfdztcbiAgICAgICAgb3V0LncgPSBtWzNdICogX3ggKyBtWzddICogX3kgKyBtWzExXSAqIF96ICsgbVsxNV0gKiBfdztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlIGluIHgsIHksIHosIHcuXG4gICAgICogQG1ldGhvZCBtYXhBeGlzXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBtYXhBeGlzICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgodGhpcy54LCB0aGlzLnksIHRoaXMueiwgdGhpcy53KTtcbiAgICB9XG59XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuVmVjNCcsIFZlYzQsIHsgeDogMCwgeTogMCwgejogMCwgdzogMCB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHY0IChvdGhlcjogVmVjNCk6IFZlYzQ7XG5leHBvcnQgZnVuY3Rpb24gdjQgKHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIsIHc/OiBudW1iZXIpOiBWZWM0O1xuXG5leHBvcnQgZnVuY3Rpb24gdjQgKHg/OiBudW1iZXIgfCBWZWM0LCB5PzogbnVtYmVyLCB6PzogbnVtYmVyLCB3PzogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBWZWM0KHggYXMgYW55LCB5LCB6LCB3KTtcbn1cblxuY2MudjQgPSB2NDtcbmNjLlZlYzQgPSBWZWM0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=