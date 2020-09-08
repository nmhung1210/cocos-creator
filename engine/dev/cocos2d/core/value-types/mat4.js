
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/mat4.js';
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

var _quat = _interopRequireDefault(require("./quat"));

var _utils = require("./utils");

var _mat = _interopRequireDefault(require("./mat3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _a00 = 0;
var _a01 = 0;
var _a02 = 0;
var _a03 = 0;
var _a10 = 0;
var _a11 = 0;
var _a12 = 0;
var _a13 = 0;
var _a20 = 0;
var _a21 = 0;
var _a22 = 0;
var _a23 = 0;
var _a30 = 0;
var _a31 = 0;
var _a32 = 0;
var _a33 = 0;
/**
 * !#en Representation of 4*4 matrix.
 * !#zh 表示 4*4 矩阵
 *
 * @class Mat4
 * @extends ValueType
 */

var Mat4 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Mat4, _ValueType);

  var _proto = Mat4.prototype;

  /**
   * !#en Multiply the current matrix with another one
   * !#zh 将当前矩阵与指定矩阵相乘
   * @method mul
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  _proto.mul = function mul(m, out) {
    return Mat4.multiply(out || new Mat4(), this, m);
  }
  /**
   * !#en Multiply each element of the matrix by a scalar.
   * !#zh 将矩阵的每一个元素都乘以指定的缩放值。
   * @method mulScalar
   * @param {Number} number amount to scale the matrix's elements by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.mulScalar = function mulScalar(num, out) {
    Mat4.multiplyScalar(out || new Mat4(), this, num);
  }
  /**
   * !#en Subtracts the current matrix with another one
   * !#zh 将当前矩阵与指定的矩阵相减
   * @method sub
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.sub = function sub(m, out) {
    Mat4.subtract(out || new Mat4(), this, m);
  }
  /**
   * Identity  of Mat4
   * @property {Mat4} IDENTITY
   * @static
   */
  ;

  /**
   * !#zh 获得指定矩阵的拷贝
   * !#en Copy of the specified matrix to obtain
   * @method clone
   * @typescript
   * clone<Out extends IMat4Like> (a: Out): Mat4
   * @static
   */
  Mat4.clone = function clone(a) {
    var m = a.m;
    return new Mat4(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15]);
  }
  /**
   * !#zh 复制目标矩阵
   * !#en Copy the target matrix
   * @method copy
   * @typescript
   * copy<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.copy = function copy(out, a) {
    var m = out.m,
        am = a.m;
    m[0] = am[0];
    m[1] = am[1];
    m[2] = am[2];
    m[3] = am[3];
    m[4] = am[4];
    m[5] = am[5];
    m[6] = am[6];
    m[7] = am[7];
    m[8] = am[8];
    m[9] = am[9];
    m[10] = am[10];
    m[11] = am[11];
    m[12] = am[12];
    m[13] = am[13];
    m[14] = am[14];
    m[15] = am[15];
    return out;
  }
  /**
   * !#zh 设置矩阵值
   * !#en Setting matrix values
   * @static
   */
  ;

  Mat4.set = function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var m = out.m;
    m[0] = m00;
    m[1] = m01;
    m[2] = m02;
    m[3] = m03;
    m[4] = m10;
    m[5] = m11;
    m[6] = m12;
    m[7] = m13;
    m[8] = m20;
    m[9] = m21;
    m[10] = m22;
    m[11] = m23;
    m[12] = m30;
    m[13] = m31;
    m[14] = m32;
    m[15] = m33;
    return out;
  }
  /**
   * !#zh 将目标赋值为单位矩阵
   * !#en The target of an assignment is the identity matrix
   * @method identity
   * @typescript
   * identity<Out extends IMat4Like> (out: Out): Out
   * @static
   */
  ;

  Mat4.identity = function identity(out) {
    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 转置矩阵
   * !#en Transposed matrix
   * @method transpose
   * @typescript
   * transpose<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.transpose = function transpose(out, a) {
    var m = out.m,
        am = a.m; // If we are transposing ourselves we can skip a few steps but have to cache some values

    if (out === a) {
      var a01 = am[1],
          a02 = am[2],
          a03 = am[3],
          a12 = am[6],
          a13 = am[7],
          a23 = am[11];
      m[1] = am[4];
      m[2] = am[8];
      m[3] = am[12];
      m[4] = a01;
      m[6] = am[9];
      m[7] = am[13];
      m[8] = a02;
      m[9] = a12;
      m[11] = am[14];
      m[12] = a03;
      m[13] = a13;
      m[14] = a23;
    } else {
      m[0] = am[0];
      m[1] = am[4];
      m[2] = am[8];
      m[3] = am[12];
      m[4] = am[1];
      m[5] = am[5];
      m[6] = am[9];
      m[7] = am[13];
      m[8] = am[2];
      m[9] = am[6];
      m[10] = am[10];
      m[11] = am[14];
      m[12] = am[3];
      m[13] = am[7];
      m[14] = am[11];
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 矩阵求逆
   * !#en Matrix inversion
   * @method invert
   * @typescript
   * invert<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.invert = function invert(out, a) {
    var am = a.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11];
    _a30 = am[12];
    _a31 = am[13];
    _a32 = am[14];
    _a33 = am[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (det === 0) {
      return null;
    }

    det = 1.0 / det;
    var m = out.m;
    m[0] = (_a11 * b11 - _a12 * b10 + _a13 * b09) * det;
    m[1] = (_a02 * b10 - _a01 * b11 - _a03 * b09) * det;
    m[2] = (_a31 * b05 - _a32 * b04 + _a33 * b03) * det;
    m[3] = (_a22 * b04 - _a21 * b05 - _a23 * b03) * det;
    m[4] = (_a12 * b08 - _a10 * b11 - _a13 * b07) * det;
    m[5] = (_a00 * b11 - _a02 * b08 + _a03 * b07) * det;
    m[6] = (_a32 * b02 - _a30 * b05 - _a33 * b01) * det;
    m[7] = (_a20 * b05 - _a22 * b02 + _a23 * b01) * det;
    m[8] = (_a10 * b10 - _a11 * b08 + _a13 * b06) * det;
    m[9] = (_a01 * b08 - _a00 * b10 - _a03 * b06) * det;
    m[10] = (_a30 * b04 - _a31 * b02 + _a33 * b00) * det;
    m[11] = (_a21 * b02 - _a20 * b04 - _a23 * b00) * det;
    m[12] = (_a11 * b07 - _a10 * b09 - _a12 * b06) * det;
    m[13] = (_a00 * b09 - _a01 * b07 + _a02 * b06) * det;
    m[14] = (_a31 * b01 - _a30 * b03 - _a32 * b00) * det;
    m[15] = (_a20 * b03 - _a21 * b01 + _a22 * b00) * det;
    return out;
  }
  /**
   * !#zh 矩阵行列式
   * !#en Matrix determinant
   * @method determinant
   * @typescript
   * determinant<Out extends IMat4Like> (a: Out): number
   * @static
   */
  ;

  Mat4.determinant = function determinant(a) {
    var m = a.m;
    _a00 = m[0];
    _a01 = m[1];
    _a02 = m[2];
    _a03 = m[3];
    _a10 = m[4];
    _a11 = m[5];
    _a12 = m[6];
    _a13 = m[7];
    _a20 = m[8];
    _a21 = m[9];
    _a22 = m[10];
    _a23 = m[11];
    _a30 = m[12];
    _a31 = m[13];
    _a32 = m[14];
    _a33 = m[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  /**
   * !#zh 矩阵乘法
   * !#en Matrix Multiplication
   * @method multiply
   * @typescript
   * multiply<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.multiply = function multiply(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11];
    _a30 = am[12];
    _a31 = am[13];
    _a32 = am[14];
    _a33 = am[15]; // Cache only the current line of the second matrix

    var b0 = bm[0],
        b1 = bm[1],
        b2 = bm[2],
        b3 = bm[3];
    m[0] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[1] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[2] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[3] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[4];
    b1 = bm[5];
    b2 = bm[6];
    b3 = bm[7];
    m[4] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[5] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[6] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[7] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[8];
    b1 = bm[9];
    b2 = bm[10];
    b3 = bm[11];
    m[8] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[9] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[10] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[11] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    b0 = bm[12];
    b1 = bm[13];
    b2 = bm[14];
    b3 = bm[15];
    m[12] = b0 * _a00 + b1 * _a10 + b2 * _a20 + b3 * _a30;
    m[13] = b0 * _a01 + b1 * _a11 + b2 * _a21 + b3 * _a31;
    m[14] = b0 * _a02 + b1 * _a12 + b2 * _a22 + b3 * _a32;
    m[15] = b0 * _a03 + b1 * _a13 + b2 * _a23 + b3 * _a33;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入变换
   * !#en Was added in a given transformation matrix transformation on the basis of
   * @method transform
   * @typescript
   * transform<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.transform = function transform(out, a, v) {
    var x = v.x,
        y = v.y,
        z = v.z;
    var m = out.m,
        am = a.m;

    if (a === out) {
      m[12] = am[0] * x + am[4] * y + am[8] * z + am[12];
      m[13] = am[1] * x + am[5] * y + am[9] * z + am[13];
      m[14] = am[2] * x + am[6] * y + am[10] * z + am[14];
      m[15] = am[3] * x + am[7] * y + am[11] * z + am[15];
    } else {
      _a00 = am[0];
      _a01 = am[1];
      _a02 = am[2];
      _a03 = am[3];
      _a10 = am[4];
      _a11 = am[5];
      _a12 = am[6];
      _a13 = am[7];
      _a20 = am[8];
      _a21 = am[9];
      _a22 = am[10];
      _a23 = am[11];
      _a30 = am[12];
      _a31 = am[13];
      _a32 = am[14];
      _a33 = am[15];
      m[0] = _a00;
      m[1] = _a01;
      m[2] = _a02;
      m[3] = _a03;
      m[4] = _a10;
      m[5] = _a11;
      m[6] = _a12;
      m[7] = _a13;
      m[8] = _a20;
      m[9] = _a21;
      m[10] = _a22;
      m[11] = _a23;
      m[12] = _a00 * x + _a10 * y + _a20 * z + am[12];
      m[13] = _a01 * x + _a11 * y + _a21 * z + am[13];
      m[14] = _a02 * x + _a12 * y + _a22 * z + am[14];
      m[15] = _a03 * x + _a13 * y + _a23 * z + am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新位移变换
   * !#en Add new displacement transducer in a matrix transformation on the basis of a given
   * @method translate
   * @typescript
   * translate<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.translate = function translate(out, a, v) {
    var m = out.m,
        am = a.m;

    if (a === out) {
      m[12] += v.x;
      m[13] += v.y;
      m[14] += v.z;
    } else {
      m[0] = am[0];
      m[1] = am[1];
      m[2] = am[2];
      m[3] = am[3];
      m[4] = am[4];
      m[5] = am[5];
      m[6] = am[6];
      m[7] = am[7];
      m[8] = am[8];
      m[9] = am[9];
      m[10] = am[10];
      m[11] = am[11];
      m[12] += v.x;
      m[13] += v.y;
      m[14] += v.z;
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新缩放变换
   * !#en Add new scaling transformation in a given matrix transformation on the basis of
   * @method scale
   * @typescript
   * scale<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.scale = function scale(out, a, v) {
    var x = v.x,
        y = v.y,
        z = v.z;
    var m = out.m,
        am = a.m;
    m[0] = am[0] * x;
    m[1] = am[1] * x;
    m[2] = am[2] * x;
    m[3] = am[3] * x;
    m[4] = am[4] * y;
    m[5] = am[5] * y;
    m[6] = am[6] * y;
    m[7] = am[7] * y;
    m[8] = am[8] * z;
    m[9] = am[9] * z;
    m[10] = am[10] * z;
    m[11] = am[11] * z;
    m[12] = am[12];
    m[13] = am[13];
    m[14] = am[14];
    m[15] = am[15];
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入新旋转变换
   * !#en Add a new rotational transform matrix transformation on the basis of a given
   * @method rotate
   * @typescript
   * rotate<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, a: Out, rad: number, axis: VecLike): Out
   * @param rad 旋转角度
   * @param axis 旋转轴
   * @static
   */
  ;

  Mat4.rotate = function rotate(out, a, rad, axis) {
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var len = Math.sqrt(x * x + y * y + z * z);

    if (Math.abs(len) < _utils.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var t = 1 - c;
    var am = a.m;
    _a00 = am[0];
    _a01 = am[1];
    _a02 = am[2];
    _a03 = am[3];
    _a10 = am[4];
    _a11 = am[5];
    _a12 = am[6];
    _a13 = am[7];
    _a20 = am[8];
    _a21 = am[9];
    _a22 = am[10];
    _a23 = am[11]; // Construct the elements of the rotation matrix

    var b00 = x * x * t + c,
        b01 = y * x * t + z * s,
        b02 = z * x * t - y * s;
    var b10 = x * y * t - z * s,
        b11 = y * y * t + c,
        b12 = z * y * t + x * s;
    var b20 = x * z * t + y * s,
        b21 = y * z * t - x * s,
        b22 = z * z * t + c;
    var m = out.m; // Perform rotation-specific matrix multiplication

    m[0] = _a00 * b00 + _a10 * b01 + _a20 * b02;
    m[1] = _a01 * b00 + _a11 * b01 + _a21 * b02;
    m[2] = _a02 * b00 + _a12 * b01 + _a22 * b02;
    m[3] = _a03 * b00 + _a13 * b01 + _a23 * b02;
    m[4] = _a00 * b10 + _a10 * b11 + _a20 * b12;
    m[5] = _a01 * b10 + _a11 * b11 + _a21 * b12;
    m[6] = _a02 * b10 + _a12 * b11 + _a22 * b12;
    m[7] = _a03 * b10 + _a13 * b11 + _a23 * b12;
    m[8] = _a00 * b20 + _a10 * b21 + _a20 * b22;
    m[9] = _a01 * b20 + _a11 * b21 + _a21 * b22;
    m[10] = _a02 * b20 + _a12 * b21 + _a22 * b22;
    m[11] = _a03 * b20 + _a13 * b21 + _a23 * b22; // If the source and destination differ, copy the unchanged last row

    if (a !== out) {
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    }

    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 X 轴的旋转变换
   * !#en Add rotational transformation around the X axis at a given matrix transformation on the basis of
   * @method rotateX
   * @typescript
   * rotateX<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateX = function rotateX(out, a, rad) {
    var m = out.m,
        am = a.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = am[4],
        a11 = am[5],
        a12 = am[6],
        a13 = am[7],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      m[0] = am[0];
      m[1] = am[1];
      m[2] = am[2];
      m[3] = am[3];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[4] = a10 * c + a20 * s;
    m[5] = a11 * c + a21 * s;
    m[6] = a12 * c + a22 * s;
    m[7] = a13 * c + a23 * s;
    m[8] = a20 * c - a10 * s;
    m[9] = a21 * c - a11 * s;
    m[10] = a22 * c - a12 * s;
    m[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 Y 轴的旋转变换
   * !#en Add about the Y axis rotation transformation in a given matrix transformation on the basis of
   * @method rotateY
   * @typescript
   * rotateY<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateY = function rotateY(out, a, rad) {
    var m = out.m,
        am = a.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a03 = am[3],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      m[4] = am[4];
      m[5] = am[5];
      m[6] = am[6];
      m[7] = am[7];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[0] = a00 * c - a20 * s;
    m[1] = a01 * c - a21 * s;
    m[2] = a02 * c - a22 * s;
    m[3] = a03 * c - a23 * s;
    m[8] = a00 * s + a20 * c;
    m[9] = a01 * s + a21 * c;
    m[10] = a02 * s + a22 * c;
    m[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * !#zh 在给定矩阵变换基础上加入绕 Z 轴的旋转变换
   * !#en Added about the Z axis at a given rotational transformation matrix transformation on the basis of
   * @method rotateZ
   * @typescript
   * rotateZ<Out extends IMat4Like> (out: Out, a: Out, rad: number): Out
   * @param rad 旋转角度
   * @static
   */
  ;

  Mat4.rotateZ = function rotateZ(out, a, rad) {
    var am = a.m;
    var m = out.m;
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a.m[0],
        a01 = a.m[1],
        a02 = a.m[2],
        a03 = a.m[3],
        a10 = a.m[4],
        a11 = a.m[5],
        a12 = a.m[6],
        a13 = a.m[7]; // If the source and destination differ, copy the unchanged last row

    if (a !== out) {
      m[8] = am[8];
      m[9] = am[9];
      m[10] = am[10];
      m[11] = am[11];
      m[12] = am[12];
      m[13] = am[13];
      m[14] = am[14];
      m[15] = am[15];
    } // Perform axis-specific matrix multiplication


    m[0] = a00 * c + a10 * s;
    m[1] = a01 * c + a11 * s;
    m[2] = a02 * c + a12 * s;
    m[3] = a03 * c + a13 * s;
    m[4] = a10 * c - a00 * s;
    m[5] = a11 * c - a01 * s;
    m[6] = a12 * c - a02 * s;
    m[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * !#zh 计算位移矩阵
   * !#en Displacement matrix calculation
   * @method fromTranslation
   * @typescript
   * fromTranslation<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromTranslation = function fromTranslation(out, v) {
    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算缩放矩阵
   * !#en Scaling matrix calculation
   * @method fromScaling
   * @typescript
   * fromScaling<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromScaling = function fromScaling(out, v) {
    var m = out.m;
    m[0] = v.x;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = v.y;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = v.z;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算旋转矩阵
   * !#en Calculates the rotation matrix
   * @method fromRotation
   * @typescript
   * fromRotation<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, rad: number, axis: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRotation = function fromRotation(out, rad, axis) {
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var len = Math.sqrt(x * x + y * y + z * z);

    if (Math.abs(len) < _utils.EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var t = 1 - c; // Perform rotation-specific matrix multiplication

    var m = out.m;
    m[0] = x * x * t + c;
    m[1] = y * x * t + z * s;
    m[2] = z * x * t - y * s;
    m[3] = 0;
    m[4] = x * y * t - z * s;
    m[5] = y * y * t + c;
    m[6] = z * y * t + x * s;
    m[7] = 0;
    m[8] = x * z * t + y * s;
    m[9] = y * z * t - x * s;
    m[10] = z * z * t + c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 X 轴的旋转矩阵
   * !#en Calculating rotation matrix about the X axis
   * @method fromXRotation
   * @typescript
   * fromXRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromXRotation = function fromXRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = c;
    m[6] = s;
    m[7] = 0;
    m[8] = 0;
    m[9] = -s;
    m[10] = c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 Y 轴的旋转矩阵
   * !#en Calculating rotation matrix about the Y axis
   * @method fromYRotation
   * @typescript
   * fromYRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromYRotation = function fromYRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = c;
    m[1] = 0;
    m[2] = -s;
    m[3] = 0;
    m[4] = 0;
    m[5] = 1;
    m[6] = 0;
    m[7] = 0;
    m[8] = s;
    m[9] = 0;
    m[10] = c;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算绕 Z 轴的旋转矩阵
   * !#en Calculating rotation matrix about the Z axis
   * @method fromZRotation
   * @typescript
   * fromZRotation<Out extends IMat4Like> (out: Out, rad: number): Out
   * @static
   */
  ;

  Mat4.fromZRotation = function fromZRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad); // Perform axis-specific matrix multiplication

    var m = out.m;
    m[0] = c;
    m[1] = s;
    m[2] = 0;
    m[3] = 0;
    m[4] = -s;
    m[5] = c;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 1;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据旋转和位移信息计算矩阵
   * !#en The rotation and displacement information calculating matrix
   * @method fromRT
   * @typescript
   * fromRT<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRT = function fromRT(out, q, v) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var m = out.m;
    m[0] = 1 - (yy + zz);
    m[1] = xy + wz;
    m[2] = xz - wy;
    m[3] = 0;
    m[4] = xy - wz;
    m[5] = 1 - (xx + zz);
    m[6] = yz + wx;
    m[7] = 0;
    m[8] = xz + wy;
    m[9] = yz - wx;
    m[10] = 1 - (xx + yy);
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 提取矩阵的位移信息, 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Extracting displacement information of the matrix, the matrix transform to the default sequential application S-> R-> T is
   * @method getTranslation
   * @typescript
   * getTranslation<Out extends IMat4Like, VecLike extends IVec3Like> (out: VecLike, mat: Out): VecLike
   * @static
   */
  ;

  Mat4.getTranslation = function getTranslation(out, mat) {
    var m = mat.m;
    out.x = m[12];
    out.y = m[13];
    out.z = m[14];
    return out;
  }
  /**
   * !#zh 提取矩阵的缩放信息, 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Scaling information extraction matrix, the matrix transform to the default sequential application S-> R-> T is
   * @method getScaling
   * @typescript
   * getScaling<Out extends IMat4Like, VecLike extends IVec3Like> (out: VecLike, mat: Out): VecLike
   * @static
   */
  ;

  Mat4.getScaling = function getScaling(out, mat) {
    var m = mat.m;
    var m3 = m3_1.m;
    var m00 = m3[0] = m[0];
    var m01 = m3[1] = m[1];
    var m02 = m3[2] = m[2];
    var m04 = m3[3] = m[4];
    var m05 = m3[4] = m[5];
    var m06 = m3[5] = m[6];
    var m08 = m3[6] = m[8];
    var m09 = m3[7] = m[9];
    var m10 = m3[8] = m[10];
    out.x = Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
    out.y = Math.sqrt(m04 * m04 + m05 * m05 + m06 * m06);
    out.z = Math.sqrt(m08 * m08 + m09 * m09 + m10 * m10); // account for refections

    if (_mat["default"].determinant(m3_1) < 0) {
      out.x *= -1;
    }

    return out;
  }
  /**
   * !#zh 提取矩阵的旋转信息, 默认输入矩阵不含有缩放信息，如考虑缩放应使用 `toRTS` 函数。
   * !#en Rotation information extraction matrix, the matrix containing no default input scaling information, such as the use of `toRTS` should consider the scaling function.
   * @method getRotation
   * @typescript
   * getRotation<Out extends IMat4Like> (out: Quat, mat: Out): Quat
   * @static
   */
  ;

  Mat4.getRotation = function getRotation(out, mat) {
    var m = mat.m;
    var trace = m[0] + m[5] + m[10];
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out.w = 0.25 * S;
      out.x = (m[6] - m[9]) / S;
      out.y = (m[8] - m[2]) / S;
      out.z = (m[1] - m[4]) / S;
    } else if (m[0] > m[5] && m[0] > m[10]) {
      S = Math.sqrt(1.0 + m[0] - m[5] - m[10]) * 2;
      out.w = (m[6] - m[9]) / S;
      out.x = 0.25 * S;
      out.y = (m[1] + m[4]) / S;
      out.z = (m[8] + m[2]) / S;
    } else if (m[5] > m[10]) {
      S = Math.sqrt(1.0 + m[5] - m[0] - m[10]) * 2;
      out.w = (m[8] - m[2]) / S;
      out.x = (m[1] + m[4]) / S;
      out.y = 0.25 * S;
      out.z = (m[6] + m[9]) / S;
    } else {
      S = Math.sqrt(1.0 + m[10] - m[0] - m[5]) * 2;
      out.w = (m[1] - m[4]) / S;
      out.x = (m[8] + m[2]) / S;
      out.y = (m[6] + m[9]) / S;
      out.z = 0.25 * S;
    }

    return out;
  }
  /**
   * !#zh 提取旋转、位移、缩放信息， 默认矩阵中的变换以 S->R->T 的顺序应用
   * !#en Extracting rotational displacement, zoom information, the default matrix transformation in order S-> R-> T applications
   * @method toRTS
   * @typescript
   * toRTS<Out extends IMat4Like, VecLike extends IVec3Like> (mat: Out, q: Quat, v: VecLike, s: VecLike): void
   * @static
   */
  ;

  Mat4.toRTS = function toRTS(mat, q, v, s) {
    var m = mat.m;
    var m3 = m3_1.m;
    s.x = _vec["default"].set(v3_1, m[0], m[1], m[2]).mag();
    m3[0] = m[0] / s.x;
    m3[1] = m[1] / s.x;
    m3[2] = m[2] / s.x;
    s.y = _vec["default"].set(v3_1, m[4], m[5], m[6]).mag();
    m3[3] = m[4] / s.y;
    m3[4] = m[5] / s.y;
    m3[5] = m[6] / s.y;
    s.z = _vec["default"].set(v3_1, m[8], m[9], m[10]).mag();
    m3[6] = m[8] / s.z;
    m3[7] = m[9] / s.z;
    m3[8] = m[10] / s.z;

    var det = _mat["default"].determinant(m3_1);

    if (det < 0) {
      s.x *= -1;
      m3[0] *= -1;
      m3[1] *= -1;
      m3[2] *= -1;
    }

    _quat["default"].fromMat3(q, m3_1); // already normalized


    _vec["default"].set(v, m[12], m[13], m[14]);
  }
  /**
   * !#zh 根据旋转、位移、缩放信息计算矩阵，以 S->R->T 的顺序应用
   * !#en The rotary displacement, the scaling matrix calculation information, the order S-> R-> T applications
   * @method fromRTS
   * @typescript
   * fromRTS<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike, s: VecLike): Out
   * @static
   */
  ;

  Mat4.fromRTS = function fromRTS(out, q, v, s) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s.x;
    var sy = s.y;
    var sz = s.z;
    var m = out.m;
    m[0] = (1 - (yy + zz)) * sx;
    m[1] = (xy + wz) * sx;
    m[2] = (xz - wy) * sx;
    m[3] = 0;
    m[4] = (xy - wz) * sy;
    m[5] = (1 - (xx + zz)) * sy;
    m[6] = (yz + wx) * sy;
    m[7] = 0;
    m[8] = (xz + wy) * sz;
    m[9] = (yz - wx) * sz;
    m[10] = (1 - (xx + yy)) * sz;
    m[11] = 0;
    m[12] = v.x;
    m[13] = v.y;
    m[14] = v.z;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的旋转、位移、缩放及变换中心信息计算矩阵，以 S->R->T 的顺序应用
   * !#en According to the specified rotation, displacement, and scale conversion matrix calculation information center, order S-> R-> T applications
   * @method fromRTSOrigin
   * @typescript
   * fromRTSOrigin<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, q: Quat, v: VecLike, s: VecLike, o: VecLike): Out
   * @param q 旋转值
   * @param v 位移值
   * @param s 缩放值
   * @param o 指定变换中心
   * @static
   */
  ;

  Mat4.fromRTSOrigin = function fromRTSOrigin(out, q, v, s, o) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s.x;
    var sy = s.y;
    var sz = s.z;
    var ox = o.x;
    var oy = o.y;
    var oz = o.z;
    var m = out.m;
    m[0] = (1 - (yy + zz)) * sx;
    m[1] = (xy + wz) * sx;
    m[2] = (xz - wy) * sx;
    m[3] = 0;
    m[4] = (xy - wz) * sy;
    m[5] = (1 - (xx + zz)) * sy;
    m[6] = (yz + wx) * sy;
    m[7] = 0;
    m[8] = (xz + wy) * sz;
    m[9] = (yz - wx) * sz;
    m[10] = (1 - (xx + yy)) * sz;
    m[11] = 0;
    m[12] = v.x + ox - (m[0] * ox + m[4] * oy + m[8] * oz);
    m[13] = v.y + oy - (m[1] * ox + m[5] * oy + m[9] * oz);
    m[14] = v.z + oz - (m[2] * ox + m[6] * oy + m[10] * oz);
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的旋转信息计算矩阵
   * !#en The rotation matrix calculation information specified
   * @method fromQuat
   * @typescript
   * fromQuat<Out extends IMat4Like> (out: Out, q: Quat): Out
   * @static
   */
  ;

  Mat4.fromQuat = function fromQuat(out, q) {
    var x = q.x,
        y = q.y,
        z = q.z,
        w = q.w;
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var m = out.m;
    m[0] = 1 - yy - zz;
    m[1] = yx + wz;
    m[2] = zx - wy;
    m[3] = 0;
    m[4] = yx - wz;
    m[5] = 1 - xx - zz;
    m[6] = zy + wx;
    m[7] = 0;
    m[8] = zx + wy;
    m[9] = zy - wx;
    m[10] = 1 - xx - yy;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据指定的视锥体信息计算矩阵
   * !#en The matrix calculation information specified frustum
   * @method frustum
   * @typescript
   * frustum<Out extends IMat4Like> (out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out
   * @param left 左平面距离
   * @param right 右平面距离
   * @param bottom 下平面距离
   * @param top 上平面距离
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.frustum = function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = near * 2 * rl;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = near * 2 * tb;
    m[6] = 0;
    m[7] = 0;
    m[8] = (right + left) * rl;
    m[9] = (top + bottom) * tb;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = far * near * 2 * nf;
    m[15] = 0;
    return out;
  }
  /**
   * !#zh 计算透视投影矩阵
   * !#en Perspective projection matrix calculation
   * @method perspective
   * @typescript
   * perspective<Out extends IMat4Like> (out: Out, fovy: number, aspect: number, near: number, far: number): Out
   * @param fovy 纵向视角高度
   * @param aspect 长宽比
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.perspective = function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = f / aspect;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = f;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = (far + near) * nf;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = 2 * far * near * nf;
    m[15] = 0;
    return out;
  }
  /**
   * !#zh 计算正交投影矩阵
   * !#en Computing orthogonal projection matrix
   * @method ortho
   * @typescript
   * ortho<Out extends IMat4Like> (out: Out, left: number, right: number, bottom: number, top: number, near: number, far: number): Out
   * @param left 左平面距离
   * @param right 右平面距离
   * @param bottom 下平面距离
   * @param top 上平面距离
   * @param near 近平面距离
   * @param far 远平面距离
   * @static
   */
  ;

  Mat4.ortho = function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    var m = out.m;
    m[0] = -2 * lr;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = 0;
    m[5] = -2 * bt;
    m[6] = 0;
    m[7] = 0;
    m[8] = 0;
    m[9] = 0;
    m[10] = 2 * nf;
    m[11] = 0;
    m[12] = (left + right) * lr;
    m[13] = (top + bottom) * bt;
    m[14] = (far + near) * nf;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 根据视点计算矩阵，注意 `eye - center` 不能为零向量或与 `up` 向量平行
   * !#en `Up` parallel vector or vector center` not be zero - the matrix calculation according to the viewpoint, note` eye
   * @method lookAt
   * @typescript
   * lookAt<Out extends IMat4Like, VecLike extends IVec3Like> (out: Out, eye: VecLike, center: VecLike, up: VecLike): Out
   * @param eye 当前位置
   * @param center 目标视点
   * @param up 视口上方向
   * @static
   */
  ;

  Mat4.lookAt = function lookAt(out, eye, center, up) {
    var eyex = eye.x;
    var eyey = eye.y;
    var eyez = eye.z;
    var upx = up.x;
    var upy = up.y;
    var upz = up.z;
    var centerx = center.x;
    var centery = center.y;
    var centerz = center.z;
    var z0 = eyex - centerx;
    var z1 = eyey - centery;
    var z2 = eyez - centerz;
    var len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    var x0 = upy * z2 - upz * z1;
    var x1 = upz * z0 - upx * z2;
    var x2 = upx * z1 - upy * z0;
    len = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    x0 *= len;
    x1 *= len;
    x2 *= len;
    var y0 = z1 * x2 - z2 * x1;
    var y1 = z2 * x0 - z0 * x2;
    var y2 = z0 * x1 - z1 * x0;
    var m = out.m;
    m[0] = x0;
    m[1] = y0;
    m[2] = z0;
    m[3] = 0;
    m[4] = x1;
    m[5] = y1;
    m[6] = z1;
    m[7] = 0;
    m[8] = x2;
    m[9] = y2;
    m[10] = z2;
    m[11] = 0;
    m[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    m[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    m[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 计算逆转置矩阵
   * !#en Reversal matrix calculation
   * @method inverseTranspose
   * @typescript
   * inverseTranspose<Out extends IMat4Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Mat4.inverseTranspose = function inverseTranspose(out, a) {
    var m = a.m;
    _a00 = m[0];
    _a01 = m[1];
    _a02 = m[2];
    _a03 = m[3];
    _a10 = m[4];
    _a11 = m[5];
    _a12 = m[6];
    _a13 = m[7];
    _a20 = m[8];
    _a21 = m[9];
    _a22 = m[10];
    _a23 = m[11];
    _a30 = m[12];
    _a31 = m[13];
    _a32 = m[14];
    _a33 = m[15];
    var b00 = _a00 * _a11 - _a01 * _a10;
    var b01 = _a00 * _a12 - _a02 * _a10;
    var b02 = _a00 * _a13 - _a03 * _a10;
    var b03 = _a01 * _a12 - _a02 * _a11;
    var b04 = _a01 * _a13 - _a03 * _a11;
    var b05 = _a02 * _a13 - _a03 * _a12;
    var b06 = _a20 * _a31 - _a21 * _a30;
    var b07 = _a20 * _a32 - _a22 * _a30;
    var b08 = _a20 * _a33 - _a23 * _a30;
    var b09 = _a21 * _a32 - _a22 * _a31;
    var b10 = _a21 * _a33 - _a23 * _a31;
    var b11 = _a22 * _a33 - _a23 * _a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    m = out.m;
    m[0] = (_a11 * b11 - _a12 * b10 + _a13 * b09) * det;
    m[1] = (_a12 * b08 - _a10 * b11 - _a13 * b07) * det;
    m[2] = (_a10 * b10 - _a11 * b08 + _a13 * b06) * det;
    m[3] = 0;
    m[4] = (_a02 * b10 - _a01 * b11 - _a03 * b09) * det;
    m[5] = (_a00 * b11 - _a02 * b08 + _a03 * b07) * det;
    m[6] = (_a01 * b08 - _a00 * b10 - _a03 * b06) * det;
    m[7] = 0;
    m[8] = (_a31 * b05 - _a32 * b04 + _a33 * b03) * det;
    m[9] = (_a32 * b02 - _a30 * b05 - _a33 * b01) * det;
    m[10] = (_a30 * b04 - _a31 * b02 + _a33 * b00) * det;
    m[11] = 0;
    m[12] = 0;
    m[13] = 0;
    m[14] = 0;
    m[15] = 1;
    return out;
  }
  /**
   * !#zh 逐元素矩阵加法
   * !#en Element by element matrix addition
   * @method add
   * @typescript
   * add<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.add = function add(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] + bm[0];
    m[1] = am[1] + bm[1];
    m[2] = am[2] + bm[2];
    m[3] = am[3] + bm[3];
    m[4] = am[4] + bm[4];
    m[5] = am[5] + bm[5];
    m[6] = am[6] + bm[6];
    m[7] = am[7] + bm[7];
    m[8] = am[8] + bm[8];
    m[9] = am[9] + bm[9];
    m[10] = am[10] + bm[10];
    m[11] = am[11] + bm[11];
    m[12] = am[12] + bm[12];
    m[13] = am[13] + bm[13];
    m[14] = am[14] + bm[14];
    m[15] = am[15] + bm[15];
    return out;
  }
  /**
   * !#zh 逐元素矩阵减法
   * !#en Matrix element by element subtraction
   * @method subtract
   * @typescript
   * subtract<Out extends IMat4Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Mat4.subtract = function subtract(out, a, b) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] - bm[0];
    m[1] = am[1] - bm[1];
    m[2] = am[2] - bm[2];
    m[3] = am[3] - bm[3];
    m[4] = am[4] - bm[4];
    m[5] = am[5] - bm[5];
    m[6] = am[6] - bm[6];
    m[7] = am[7] - bm[7];
    m[8] = am[8] - bm[8];
    m[9] = am[9] - bm[9];
    m[10] = am[10] - bm[10];
    m[11] = am[11] - bm[11];
    m[12] = am[12] - bm[12];
    m[13] = am[13] - bm[13];
    m[14] = am[14] - bm[14];
    m[15] = am[15] - bm[15];
    return out;
  }
  /**
   * !#zh 矩阵标量乘法
   * !#en Matrix scalar multiplication
   * @method multiplyScalar
   * @typescript
   * multiplyScalar<Out extends IMat4Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Mat4.multiplyScalar = function multiplyScalar(out, a, b) {
    var m = out.m,
        am = a.m;
    m[0] = am[0] * b;
    m[1] = am[1] * b;
    m[2] = am[2] * b;
    m[3] = am[3] * b;
    m[4] = am[4] * b;
    m[5] = am[5] * b;
    m[6] = am[6] * b;
    m[7] = am[7] * b;
    m[8] = am[8] * b;
    m[9] = am[9] * b;
    m[10] = am[10] * b;
    m[11] = am[11] * b;
    m[12] = am[12] * b;
    m[13] = am[13] * b;
    m[14] = am[14] * b;
    m[15] = am[15] * b;
    return out;
  }
  /**
   * !#zh 逐元素矩阵标量乘加: A + B * scale
   * !#en Elements of the matrix by the scalar multiplication and addition: A + B * scale
   * @method multiplyScalarAndAdd
   * @typescript
   * multiplyScalarAndAdd<Out extends IMat4Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Mat4.multiplyScalarAndAdd = function multiplyScalarAndAdd(out, a, b, scale) {
    var m = out.m,
        am = a.m,
        bm = b.m;
    m[0] = am[0] + bm[0] * scale;
    m[1] = am[1] + bm[1] * scale;
    m[2] = am[2] + bm[2] * scale;
    m[3] = am[3] + bm[3] * scale;
    m[4] = am[4] + bm[4] * scale;
    m[5] = am[5] + bm[5] * scale;
    m[6] = am[6] + bm[6] * scale;
    m[7] = am[7] + bm[7] * scale;
    m[8] = am[8] + bm[8] * scale;
    m[9] = am[9] + bm[9] * scale;
    m[10] = am[10] + bm[10] * scale;
    m[11] = am[11] + bm[11] * scale;
    m[12] = am[12] + bm[12] * scale;
    m[13] = am[13] + bm[13] * scale;
    m[14] = am[14] + bm[14] * scale;
    m[15] = am[15] + bm[15] * scale;
    return out;
  }
  /**
   * !#zh 矩阵等价判断
   * !#en Analyzing the equivalent matrix
   * @method strictEquals
   * @return {bool}
   * @typescript
   * strictEquals<Out extends IMat4Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Mat4.strictEquals = function strictEquals(a, b) {
    var am = a.m,
        bm = b.m;
    return am[0] === bm[0] && am[1] === bm[1] && am[2] === bm[2] && am[3] === bm[3] && am[4] === bm[4] && am[5] === bm[5] && am[6] === bm[6] && am[7] === bm[7] && am[8] === bm[8] && am[9] === bm[9] && am[10] === bm[10] && am[11] === bm[11] && am[12] === bm[12] && am[13] === bm[13] && am[14] === bm[14] && am[15] === bm[15];
  }
  /**
   * !#zh 排除浮点数误差的矩阵近似等价判断
   * !#en Negative floating point error is approximately equivalent to determining a matrix
   * @method equals
   * @typescript
   * equals<Out extends IMat4Like> (a: Out, b: Out, epsilon?: number): boolean
   * @static
   */
  ;

  Mat4.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    var am = a.m,
        bm = b.m;
    return Math.abs(am[0] - bm[0]) <= epsilon * Math.max(1.0, Math.abs(am[0]), Math.abs(bm[0])) && Math.abs(am[1] - bm[1]) <= epsilon * Math.max(1.0, Math.abs(am[1]), Math.abs(bm[1])) && Math.abs(am[2] - bm[2]) <= epsilon * Math.max(1.0, Math.abs(am[2]), Math.abs(bm[2])) && Math.abs(am[3] - bm[3]) <= epsilon * Math.max(1.0, Math.abs(am[3]), Math.abs(bm[3])) && Math.abs(am[4] - bm[4]) <= epsilon * Math.max(1.0, Math.abs(am[4]), Math.abs(bm[4])) && Math.abs(am[5] - bm[5]) <= epsilon * Math.max(1.0, Math.abs(am[5]), Math.abs(bm[5])) && Math.abs(am[6] - bm[6]) <= epsilon * Math.max(1.0, Math.abs(am[6]), Math.abs(bm[6])) && Math.abs(am[7] - bm[7]) <= epsilon * Math.max(1.0, Math.abs(am[7]), Math.abs(bm[7])) && Math.abs(am[8] - bm[8]) <= epsilon * Math.max(1.0, Math.abs(am[8]), Math.abs(bm[8])) && Math.abs(am[9] - bm[9]) <= epsilon * Math.max(1.0, Math.abs(am[9]), Math.abs(bm[9])) && Math.abs(am[10] - bm[10]) <= epsilon * Math.max(1.0, Math.abs(am[10]), Math.abs(bm[10])) && Math.abs(am[11] - bm[11]) <= epsilon * Math.max(1.0, Math.abs(am[11]), Math.abs(bm[11])) && Math.abs(am[12] - bm[12]) <= epsilon * Math.max(1.0, Math.abs(am[12]), Math.abs(bm[12])) && Math.abs(am[13] - bm[13]) <= epsilon * Math.max(1.0, Math.abs(am[13]), Math.abs(bm[13])) && Math.abs(am[14] - bm[14]) <= epsilon * Math.max(1.0, Math.abs(am[14]), Math.abs(bm[14])) && Math.abs(am[15] - bm[15]) <= epsilon * Math.max(1.0, Math.abs(am[15]), Math.abs(bm[15]));
  }
  /**
   * Calculates the adjugate of a matrix.
   *
   * @param {Mat4} out - Matrix to store result.
   * @param {Mat4} a - Matrix to calculate.
   * @returns {Mat4} out.
   */
  ;

  Mat4.adjoint = function adjoint(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a03 = am[3],
        a10 = am[4],
        a11 = am[5],
        a12 = am[6],
        a13 = am[7],
        a20 = am[8],
        a21 = am[9],
        a22 = am[10],
        a23 = am[11],
        a30 = am[12],
        a31 = am[13],
        a32 = am[14],
        a33 = am[15];
    outm[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
    outm[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    outm[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
    outm[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    outm[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    outm[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
    outm[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    outm[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
    outm[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
    outm[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    outm[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
    outm[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    outm[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    outm[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
    outm[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    outm[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
    return out;
  }
  /**
   * !#zh 矩阵转数组
   * !#en Matrix transpose array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, mat: IMat4Like, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Mat4.toArray = function toArray(out, mat, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = mat.m;

    for (var i = 0; i < 16; i++) {
      out[ofs + i] = m[i];
    }

    return out;
  }
  /**
   * !#zh 数组转矩阵
   * !#en Transfer matrix array
   * @method fromArray
   * @typescript
   * fromArray <Out extends IMat4Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Mat4.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = out.m;

    for (var i = 0; i < 16; i++) {
      m[i] = arr[ofs + i];
    }

    return out;
  }
  /**
   * !#en Matrix Data
   * !#zh 矩阵数据
   * @property {Float64Array | Float32Array} m
   */
  ;

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/mat4:method"}}cc.mat4{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/mat4:method"}}cc.mat4{{/crossLink}}
   * @method constructor
   * @typescript
   * constructor ( m00?: number, m01?: number, m02?: number, m03?: number, m10?: number, m11?: number, m12?: number, m13?: number, m20?: number, m21?: number, m22?: number, m23?: number, m30?: number, m31?: number, m32?: number, m33?: number)
   */
  function Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var _this;

    if (m00 === void 0) {
      m00 = 1;
    }

    if (m01 === void 0) {
      m01 = 0;
    }

    if (m02 === void 0) {
      m02 = 0;
    }

    if (m03 === void 0) {
      m03 = 0;
    }

    if (m10 === void 0) {
      m10 = 0;
    }

    if (m11 === void 0) {
      m11 = 1;
    }

    if (m12 === void 0) {
      m12 = 0;
    }

    if (m13 === void 0) {
      m13 = 0;
    }

    if (m20 === void 0) {
      m20 = 0;
    }

    if (m21 === void 0) {
      m21 = 0;
    }

    if (m22 === void 0) {
      m22 = 1;
    }

    if (m23 === void 0) {
      m23 = 0;
    }

    if (m30 === void 0) {
      m30 = 0;
    }

    if (m31 === void 0) {
      m31 = 0;
    }

    if (m32 === void 0) {
      m32 = 0;
    }

    if (m33 === void 0) {
      m33 = 1;
    }

    _this = _ValueType.call(this) || this;
    _this.m = void 0;

    if (m00 instanceof _utils.FLOAT_ARRAY_TYPE) {
      _this.m = m00;
    } else {
      _this.m = new _utils.FLOAT_ARRAY_TYPE(16);
      var tm = _this.m;
      tm[0] = m00;
      tm[1] = m01;
      tm[2] = m02;
      tm[3] = m03;
      tm[4] = m10;
      tm[5] = m11;
      tm[6] = m12;
      tm[7] = m13;
      tm[8] = m20;
      tm[9] = m21;
      tm[10] = m22;
      tm[11] = m23;
      tm[12] = m30;
      tm[13] = m31;
      tm[14] = m32;
      tm[15] = m33;
    }

    return _this;
  }
  /**
   * !#en clone a Mat4 object
   * !#zh 克隆一个 Mat4 对象
   * @method clone
   * @return {Mat4}
   */


  _proto.clone = function clone() {
    var t = this;
    var tm = t.m;
    return new Mat4(tm[0], tm[1], tm[2], tm[3], tm[4], tm[5], tm[6], tm[7], tm[8], tm[9], tm[10], tm[11], tm[12], tm[13], tm[14], tm[15]);
  }
  /**
   * !#en Sets the matrix with another one's value
   * !#zh 用另一个矩阵设置这个矩阵的值。
   * @method set
   * @param {Mat4} srcObj
   * @return {Mat4} returns this
   * @chainable
   */
  ;

  _proto.set = function set(s) {
    var t = this;
    var tm = t.m,
        sm = s.m;
    tm[0] = sm[0];
    tm[1] = sm[1];
    tm[2] = sm[2];
    tm[3] = sm[3];
    tm[4] = sm[4];
    tm[5] = sm[5];
    tm[6] = sm[6];
    tm[7] = sm[7];
    tm[8] = sm[8];
    tm[9] = sm[9];
    tm[10] = sm[10];
    tm[11] = sm[11];
    tm[12] = sm[12];
    tm[13] = sm[13];
    tm[14] = sm[14];
    tm[15] = sm[15];
    return this;
  }
  /**
   * !#en Check whether two matrix equal
   * !#zh 当前的矩阵是否与指定的矩阵相等。
   * @method equals
   * @param {Mat4} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return Mat4.strictEquals(this, other);
  }
  /**
   * !#en Check whether two matrix equal with default degree of variance.
   * !#zh
   * 近似判断两个矩阵是否相等。<br/>
   * 判断 2 个矩阵是否在默认误差范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Mat4} other
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other) {
    return Mat4.equals(this, other);
  }
  /**
   * !#en Transform to string with matrix informations
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    var tm = this.m;

    if (tm) {
      return "[\n" + tm[0] + ", " + tm[1] + ", " + tm[2] + ", " + tm[3] + ",\n" + tm[4] + ", " + tm[5] + ", " + tm[6] + ", " + tm[7] + ",\n" + tm[8] + ", " + tm[9] + ", " + tm[10] + ", " + tm[11] + ",\n" + tm[12] + ", " + tm[13] + ", " + tm[14] + ", " + tm[15] + "\n" + "]";
    } else {
      return "[\n" + "1, 0, 0, 0\n" + "0, 1, 0, 0\n" + "0, 0, 1, 0\n" + "0, 0, 0, 1\n" + "]";
    }
  }
  /**
   * Set the matrix to the identity matrix
   * @method identity
   * @returns {Mat4} self
   * @chainable
   */
  ;

  _proto.identity = function identity() {
    return Mat4.identity(this);
  }
  /**
   * Transpose the values of a mat4
   * @method transpose
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.transpose = function transpose(out) {
    out = out || new Mat4();
    return Mat4.transpose(out, this);
  }
  /**
   * Inverts a mat4
   * @method invert
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.invert = function invert(out) {
    out = out || new Mat4();
    return Mat4.invert(out, this);
  }
  /**
   * Calculates the adjugate of a mat4
   * @method adjoint
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.adjoint = function adjoint(out) {
    out = out || new Mat4();
    return Mat4.adjoint(out, this);
  }
  /**
   * Calculates the determinant of a mat4
   * @method determinant
   * @returns {Number} determinant of a
   */
  ;

  _proto.determinant = function determinant() {
    return Mat4.determinant(this);
  }
  /**
   * Adds two Mat4
   * @method add
   * @param {Mat4} other the second operand
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created.
   * @returns {Mat4} out
   */
  ;

  _proto.add = function add(other, out) {
    out = out || new Mat4();
    return Mat4.add(out, this, other);
  }
  /**
   * Subtracts the current matrix with another one
   * @method subtract
   * @param {Mat4} other the second operand
   * @returns {Mat4} this
   */
  ;

  _proto.subtract = function subtract(other) {
    return Mat4.subtract(this, this, other);
  }
  /**
   * Subtracts the current matrix with another one
   * @method multiply
   * @param {Mat4} other the second operand
   * @returns {Mat4} this
   */
  ;

  _proto.multiply = function multiply(other) {
    return Mat4.multiply(this, this, other);
  }
  /**
   * Multiply each element of the matrix by a scalar.
   * @method multiplyScalar
   * @param {Number} number amount to scale the matrix's elements by
   * @returns {Mat4} this
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(number) {
    return Mat4.multiplyScalar(this, this, number);
  }
  /**
   * Translate a mat4 by the given vector
   * @method translate
   * @param {Vec3} v vector to translate by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.translate = function translate(v, out) {
    out = out || new Mat4();
    return Mat4.translate(out, this, v);
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3
   * @method scale
   * @param {Vec3} v vector to scale by
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.scale = function scale(v, out) {
    out = out || new Mat4();
    return Mat4.scale(out, this, v);
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   * @method rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {Vec3} axis the axis to rotate around
   * @param {Mat4} [out] the receiving matrix, you can pass the same matrix to save result to itself, if not provided, a new matrix will be created
   * @returns {Mat4} out
   */
  ;

  _proto.rotate = function rotate(rad, axis, out) {
    out = out || new Mat4();
    return Mat4.rotate(out, this, rad, axis);
  }
  /**
   * Returns the translation vector component of a transformation matrix.
   * @method getTranslation
   * @param  {Vec3} out Vector to receive translation component, if not provided, a new vec3 will be created
   * @return {Vec3} out
   */
  ;

  _proto.getTranslation = function getTranslation(out) {
    out = out || new _vec["default"]();
    return Mat4.getTranslation(out, this);
  }
  /**
   * Returns the scale factor component of a transformation matrix
   * @method getScale
   * @param  {Vec3} out Vector to receive scale component, if not provided, a new vec3 will be created
   * @return {Vec3} out
   */
  ;

  _proto.getScale = function getScale(out) {
    out = out || new _vec["default"]();
    return Mat4.getScaling(out, this);
  }
  /**
   * Returns the rotation factor component of a transformation matrix
   * @method getRotation
   * @param  {Quat} out Vector to receive rotation component, if not provided, a new quaternion object will be created
   * @return {Quat} out
   */
  ;

  _proto.getRotation = function getRotation(out) {
    out = out || new _quat["default"]();
    return Mat4.getRotation(out, this);
  }
  /**
   * Restore the matrix values from a quaternion rotation, vector translation and vector scale
   * @method fromRTS
   * @param {Quat} q Rotation quaternion
   * @param {Vec3} v Translation vector
   * @param {Vec3} s Scaling vector
   * @returns {Mat4} the current mat4 object
   * @chainable
   */
  ;

  _proto.fromRTS = function fromRTS(q, v, s) {
    return Mat4.fromRTS(this, q, v, s);
  }
  /**
   * Restore the matrix values from a quaternion rotation
   * @method fromQuat
   * @param {Quat} q Rotation quaternion
   * @returns {Mat4} the current mat4 object
   * @chainable
   */
  ;

  _proto.fromQuat = function fromQuat(quat) {
    return Mat4.fromQuat(this, quat);
  };

  return Mat4;
}(_valueType["default"]);

exports["default"] = Mat4;
Mat4.mul = Mat4.multiply;
Mat4.sub = Mat4.subtract;
Mat4.IDENTITY = Object.freeze(new Mat4());
var v3_1 = new _vec["default"]();
var m3_1 = new _mat["default"]();

_CCClass["default"].fastDefine('cc.Mat4', Mat4, {
  m00: 1,
  m01: 0,
  m02: 0,
  m03: 0,
  m04: 0,
  m05: 1,
  m06: 0,
  m07: 0,
  m08: 0,
  m09: 0,
  m10: 1,
  m11: 0,
  m12: 0,
  m13: 0,
  m14: 0,
  m15: 1
});

var _loop = function _loop(i) {
  Object.defineProperty(Mat4.prototype, 'm' + i, {
    get: function get() {
      return this.m[i];
    },
    set: function set(value) {
      this.m[i] = value;
    }
  });
};

for (var i = 0; i < 16; i++) {
  _loop(i);
}
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Mat4"}}cc.Mat4{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Mat4"}}cc.Mat4{{/crossLink}} 对象。
 * @method mat4
 * @param {Number} [m00] Component in column 0, row 0 position (index 0)
 * @param {Number} [m01] Component in column 0, row 1 position (index 1)
 * @param {Number} [m02] Component in column 0, row 2 position (index 2)
 * @param {Number} [m03] Component in column 0, row 3 position (index 3)
 * @param {Number} [m10] Component in column 1, row 0 position (index 4)
 * @param {Number} [m11] Component in column 1, row 1 position (index 5)
 * @param {Number} [m12] Component in column 1, row 2 position (index 6)
 * @param {Number} [m13] Component in column 1, row 3 position (index 7)
 * @param {Number} [m20] Component in column 2, row 0 position (index 8)
 * @param {Number} [m21] Component in column 2, row 1 position (index 9)
 * @param {Number} [m22] Component in column 2, row 2 position (index 10)
 * @param {Number} [m23] Component in column 2, row 3 position (index 11)
 * @param {Number} [m30] Component in column 3, row 0 position (index 12)
 * @param {Number} [m31] Component in column 3, row 1 position (index 13)
 * @param {Number} [m32] Component in column 3, row 2 position (index 14)
 * @param {Number} [m33] Component in column 3, row 3 position (index 15)
 * @return {Mat4}
 */


cc.mat4 = function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
  var mat = new Mat4(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);

  if (m00 === undefined) {
    Mat4.identity(mat);
  }

  return mat;
};

cc.Mat4 = Mat4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL21hdDQudHMiXSwibmFtZXMiOlsiX2EwMCIsIl9hMDEiLCJfYTAyIiwiX2EwMyIsIl9hMTAiLCJfYTExIiwiX2ExMiIsIl9hMTMiLCJfYTIwIiwiX2EyMSIsIl9hMjIiLCJfYTIzIiwiX2EzMCIsIl9hMzEiLCJfYTMyIiwiX2EzMyIsIk1hdDQiLCJtdWwiLCJtIiwib3V0IiwibXVsdGlwbHkiLCJtdWxTY2FsYXIiLCJudW0iLCJtdWx0aXBseVNjYWxhciIsInN1YiIsInN1YnRyYWN0IiwiY2xvbmUiLCJhIiwiY29weSIsImFtIiwic2V0IiwibTAwIiwibTAxIiwibTAyIiwibTAzIiwibTEwIiwibTExIiwibTEyIiwibTEzIiwibTIwIiwibTIxIiwibTIyIiwibTIzIiwibTMwIiwibTMxIiwibTMyIiwibTMzIiwiaWRlbnRpdHkiLCJ0cmFuc3Bvc2UiLCJhMDEiLCJhMDIiLCJhMDMiLCJhMTIiLCJhMTMiLCJhMjMiLCJpbnZlcnQiLCJiMDAiLCJiMDEiLCJiMDIiLCJiMDMiLCJiMDQiLCJiMDUiLCJiMDYiLCJiMDciLCJiMDgiLCJiMDkiLCJiMTAiLCJiMTEiLCJkZXQiLCJkZXRlcm1pbmFudCIsImIiLCJibSIsImIwIiwiYjEiLCJiMiIsImIzIiwidHJhbnNmb3JtIiwidiIsIngiLCJ5IiwieiIsInRyYW5zbGF0ZSIsInNjYWxlIiwicm90YXRlIiwicmFkIiwiYXhpcyIsImxlbiIsIk1hdGgiLCJzcXJ0IiwiYWJzIiwiRVBTSUxPTiIsInMiLCJzaW4iLCJjIiwiY29zIiwidCIsImIxMiIsImIyMCIsImIyMSIsImIyMiIsInJvdGF0ZVgiLCJhMTAiLCJhMTEiLCJhMjAiLCJhMjEiLCJhMjIiLCJyb3RhdGVZIiwiYTAwIiwicm90YXRlWiIsImZyb21UcmFuc2xhdGlvbiIsImZyb21TY2FsaW5nIiwiZnJvbVJvdGF0aW9uIiwiZnJvbVhSb3RhdGlvbiIsImZyb21ZUm90YXRpb24iLCJmcm9tWlJvdGF0aW9uIiwiZnJvbVJUIiwicSIsInciLCJ4MiIsInkyIiwiejIiLCJ4eCIsInh5IiwieHoiLCJ5eSIsInl6IiwienoiLCJ3eCIsInd5Iiwid3oiLCJnZXRUcmFuc2xhdGlvbiIsIm1hdCIsImdldFNjYWxpbmciLCJtMyIsIm0zXzEiLCJtMDQiLCJtMDUiLCJtMDYiLCJtMDgiLCJtMDkiLCJNYXQzIiwiZ2V0Um90YXRpb24iLCJ0cmFjZSIsIlMiLCJ0b1JUUyIsIlZlYzMiLCJ2M18xIiwibWFnIiwiUXVhdCIsImZyb21NYXQzIiwiZnJvbVJUUyIsInN4Iiwic3kiLCJzeiIsImZyb21SVFNPcmlnaW4iLCJvIiwib3giLCJveSIsIm96IiwiZnJvbVF1YXQiLCJ5eCIsInp4IiwienkiLCJmcnVzdHVtIiwibGVmdCIsInJpZ2h0IiwiYm90dG9tIiwidG9wIiwibmVhciIsImZhciIsInJsIiwidGIiLCJuZiIsInBlcnNwZWN0aXZlIiwiZm92eSIsImFzcGVjdCIsImYiLCJ0YW4iLCJvcnRobyIsImxyIiwiYnQiLCJsb29rQXQiLCJleWUiLCJjZW50ZXIiLCJ1cCIsImV5ZXgiLCJleWV5IiwiZXlleiIsInVweCIsInVweSIsInVweiIsImNlbnRlcngiLCJjZW50ZXJ5IiwiY2VudGVyeiIsInowIiwiejEiLCJ4MCIsIngxIiwieTAiLCJ5MSIsImludmVyc2VUcmFuc3Bvc2UiLCJhZGQiLCJtdWx0aXBseVNjYWxhckFuZEFkZCIsInN0cmljdEVxdWFscyIsImVxdWFscyIsImVwc2lsb24iLCJtYXgiLCJhZGpvaW50Iiwib3V0bSIsImEzMCIsImEzMSIsImEzMiIsImEzMyIsInRvQXJyYXkiLCJvZnMiLCJpIiwiZnJvbUFycmF5IiwiYXJyIiwiRkxPQVRfQVJSQVlfVFlQRSIsInRtIiwic20iLCJvdGhlciIsImZ1enp5RXF1YWxzIiwidG9TdHJpbmciLCJudW1iZXIiLCJnZXRTY2FsZSIsInF1YXQiLCJWYWx1ZVR5cGUiLCJJREVOVElUWSIsIk9iamVjdCIsImZyZWV6ZSIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwibTA3IiwibTE0IiwibTE1IiwiZGVmaW5lUHJvcGVydHkiLCJwcm90b3R5cGUiLCJnZXQiLCJ2YWx1ZSIsImNjIiwibWF0NCIsInVuZGVmaW5lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQ2xFLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUNsRSxJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFDbEUsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBQXNCLElBQUlDLElBQVksR0FBRyxDQUFuQjtBQUFzQixJQUFJQyxJQUFZLEdBQUcsQ0FBbkI7QUFBc0IsSUFBSUMsSUFBWSxHQUFHLENBQW5CO0FBRWxFOzs7Ozs7OztJQU9xQkM7Ozs7O0FBSWpCOzs7Ozs7OztTQVFBQyxNQUFBLGFBQUtDLENBQUwsRUFBY0MsR0FBZCxFQUErQjtBQUMzQixXQUFPSCxJQUFJLENBQUNJLFFBQUwsQ0FBY0QsR0FBRyxJQUFJLElBQUlILElBQUosRUFBckIsRUFBaUMsSUFBakMsRUFBdUNFLENBQXZDLENBQVA7QUFDSDtBQUNEOzs7Ozs7Ozs7O1NBUUFHLFlBQUEsbUJBQVdDLEdBQVgsRUFBd0JILEdBQXhCLEVBQW1DO0FBQy9CSCxJQUFBQSxJQUFJLENBQUNPLGNBQUwsQ0FBb0JKLEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQTNCLEVBQXVDLElBQXZDLEVBQTZDTSxHQUE3QztBQUNIO0FBQ0Q7Ozs7Ozs7Ozs7U0FRQUUsTUFBQSxhQUFLTixDQUFMLEVBQWNDLEdBQWQsRUFBeUI7QUFDckJILElBQUFBLElBQUksQ0FBQ1MsUUFBTCxDQUFjTixHQUFHLElBQUksSUFBSUgsSUFBSixFQUFyQixFQUFpQyxJQUFqQyxFQUF1Q0UsQ0FBdkM7QUFDSDtBQUVEOzs7Ozs7O0FBT0E7Ozs7Ozs7O09BUU9RLFFBQVAsZUFBcUNDLENBQXJDLEVBQTZDO0FBQ3pDLFFBQUlULENBQUMsR0FBR1MsQ0FBQyxDQUFDVCxDQUFWO0FBQ0EsV0FBTyxJQUFJRixJQUFKLENBQ0hFLENBQUMsQ0FBQyxDQUFELENBREUsRUFDR0EsQ0FBQyxDQUFDLENBQUQsQ0FESixFQUNTQSxDQUFDLENBQUMsQ0FBRCxDQURWLEVBQ2VBLENBQUMsQ0FBQyxDQUFELENBRGhCLEVBRUhBLENBQUMsQ0FBQyxDQUFELENBRkUsRUFFR0EsQ0FBQyxDQUFDLENBQUQsQ0FGSixFQUVTQSxDQUFDLENBQUMsQ0FBRCxDQUZWLEVBRWVBLENBQUMsQ0FBQyxDQUFELENBRmhCLEVBR0hBLENBQUMsQ0FBQyxDQUFELENBSEUsRUFHR0EsQ0FBQyxDQUFDLENBQUQsQ0FISixFQUdTQSxDQUFDLENBQUMsRUFBRCxDQUhWLEVBR2dCQSxDQUFDLENBQUMsRUFBRCxDQUhqQixFQUlIQSxDQUFDLENBQUMsRUFBRCxDQUpFLEVBSUlBLENBQUMsQ0FBQyxFQUFELENBSkwsRUFJV0EsQ0FBQyxDQUFDLEVBQUQsQ0FKWixFQUlrQkEsQ0FBQyxDQUFDLEVBQUQsQ0FKbkIsQ0FBUDtBQU1IO0FBRUQ7Ozs7Ozs7Ozs7T0FRT1UsT0FBUCxjQUFvQ1QsR0FBcEMsRUFBOENRLENBQTlDLEVBQXNEO0FBQ2xELFFBQUlULENBQUMsR0FBR0MsR0FBRyxDQUFDRCxDQUFaO0FBQUEsUUFBZVcsRUFBRSxHQUFHRixDQUFDLENBQUNULENBQXRCO0FBQ0FBLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxJQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVFXLEVBQUUsQ0FBQyxFQUFELENBQVY7QUFDQVgsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRVyxFQUFFLENBQUMsRUFBRCxDQUFWO0FBQ0FYLElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBVjtBQUNBWCxJQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVFXLEVBQUUsQ0FBQyxFQUFELENBQVY7QUFDQVgsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRVyxFQUFFLENBQUMsRUFBRCxDQUFWO0FBQ0FYLElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBVjtBQUNBLFdBQU9WLEdBQVA7QUFDSDtBQUVEOzs7Ozs7O09BS09XLE1BQVAsYUFDSVgsR0FESixFQUVJWSxHQUZKLEVBRWlCQyxHQUZqQixFQUU4QkMsR0FGOUIsRUFFMkNDLEdBRjNDLEVBR0lDLEdBSEosRUFHaUJDLEdBSGpCLEVBRzhCQyxHQUg5QixFQUcyQ0MsR0FIM0MsRUFJSUMsR0FKSixFQUlpQkMsR0FKakIsRUFJOEJDLEdBSjlCLEVBSTJDQyxHQUozQyxFQUtJQyxHQUxKLEVBS2lCQyxHQUxqQixFQUs4QkMsR0FMOUIsRUFLMkNDLEdBTDNDLEVBTUU7QUFDRSxRQUFJNUIsQ0FBQyxHQUFHQyxHQUFHLENBQUNELENBQVo7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPYSxHQUFQO0FBQVliLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT2MsR0FBUDtBQUFZZCxJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9lLEdBQVA7QUFBWWYsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPZ0IsR0FBUDtBQUNwQ2hCLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT2lCLEdBQVA7QUFBWWpCLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT2tCLEdBQVA7QUFBWWxCLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT21CLEdBQVA7QUFBWW5CLElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT29CLEdBQVA7QUFDcENwQixJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9xQixHQUFQO0FBQVlyQixJQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9zQixHQUFQO0FBQVl0QixJQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVF1QixHQUFSO0FBQWF2QixJQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVF3QixHQUFSO0FBQ3JDeEIsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFReUIsR0FBUjtBQUFhekIsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRMEIsR0FBUjtBQUFhMUIsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRMkIsR0FBUjtBQUFhM0IsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRNEIsR0FBUjtBQUN2QyxXQUFPM0IsR0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7T0FRTzRCLFdBQVAsa0JBQXdDNUIsR0FBeEMsRUFBa0Q7QUFDOUMsUUFBSUQsQ0FBQyxHQUFHQyxHQUFHLENBQUNELENBQVo7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPLENBQVA7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQUEsSUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRLENBQVI7QUFDQSxXQUFPQyxHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztPQVFPNkIsWUFBUCxtQkFBeUM3QixHQUF6QyxFQUFtRFEsQ0FBbkQsRUFBMkQ7QUFDdkQsUUFBSVQsQ0FBQyxHQUFHQyxHQUFHLENBQUNELENBQVo7QUFBQSxRQUFlVyxFQUFFLEdBQUdGLENBQUMsQ0FBQ1QsQ0FBdEIsQ0FEdUQsQ0FFdkQ7O0FBQ0EsUUFBSUMsR0FBRyxLQUFLUSxDQUFaLEVBQWU7QUFDWCxVQUFNc0IsR0FBRyxHQUFHcEIsRUFBRSxDQUFDLENBQUQsQ0FBZDtBQUFBLFVBQW1CcUIsR0FBRyxHQUFHckIsRUFBRSxDQUFDLENBQUQsQ0FBM0I7QUFBQSxVQUFnQ3NCLEdBQUcsR0FBR3RCLEVBQUUsQ0FBQyxDQUFELENBQXhDO0FBQUEsVUFBNkN1QixHQUFHLEdBQUd2QixFQUFFLENBQUMsQ0FBRCxDQUFyRDtBQUFBLFVBQTBEd0IsR0FBRyxHQUFHeEIsRUFBRSxDQUFDLENBQUQsQ0FBbEU7QUFBQSxVQUF1RXlCLEdBQUcsR0FBR3pCLEVBQUUsQ0FBQyxFQUFELENBQS9FO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsRUFBRCxDQUFUO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBTytCLEdBQVA7QUFDQS9CLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxFQUFELENBQVQ7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPZ0MsR0FBUDtBQUNBaEMsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPa0MsR0FBUDtBQUNBbEMsTUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRVyxFQUFFLENBQUMsRUFBRCxDQUFWO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUWlDLEdBQVI7QUFDQWpDLE1BQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUW1DLEdBQVI7QUFDQW5DLE1BQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUW9DLEdBQVI7QUFDSCxLQWRELE1BY087QUFDSHBDLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLEVBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxFQUFELENBQVQ7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQ0FYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUNBWCxNQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELEdBQVFXLEVBQUUsQ0FBQyxFQUFELENBQVY7QUFDQVgsTUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRVyxFQUFFLENBQUMsRUFBRCxDQUFWO0FBQ0FYLE1BQUFBLENBQUMsQ0FB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QUFFLEdBQUdGLENBQUMsQ0FBQ1QsQ0FBdEI7O0FBQ0EsUUFBSVMsQ0FBQyxLQUFLUixHQUFWLEVBQWU7QUFDWEQsTUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxJQUFTMkQsQ0FBQyxDQUFDQyxDQUFYO0FBQ0E1RCxNQUFBQSxDQUFDLENBQUMsRUFBRCxDQUFELElBQVMyRCxDQUFDLENBQUNFLENBQVg7QUFDQTdELE1BQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsSUFBUzJELENBQUMsQ0FBQ0csQ0FBWDtBQUNILEtBSkQsTUFJTztBQUNIOUQsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQWNYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUFjWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFBY1gsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQzFDWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFBY1gsTUFBQUEsQ0FBQyxDQUFDLENBQUQsQ0FBRCxHQUFPVyxFQUFFLENBQUMsQ0FBRCxDQUFUO0FBQWNYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUFjWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFDMUNYLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBVDtBQUFjWCxNQUFBQSxDQUFDLENBQUMsQ0FBRCxDQUFELEdBQU9XLEVBQUUsQ0FBQyxDQUFELENBQVQ7QUFBY1gsTUFBQUEsQ0FBQyxDQUFDLEVBQUQsQ0FBRCxHQUFRVyxFQUFFLENBQUMsRUFBRCxDQUFWO0FBQWdCWCxNQUFBQSxDQUFD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R0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT1csRUFBRSxDQUFDLENBQUQsQ0FBRixHQUFRMEMsRUFBRSxDQUFDLENBQUQsQ0FBakI7QUFDQXJELElBQUFBLENBQUMsQ0FBQyxFQUFELENBQUQsR0FBUVcsRUFBRSxDQUFDLEVBQUQsQ0FBRixHQUFT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QUFtQ0MsR0FBbkMsRUFBd0NDLEdBQXhDLEVBQTZDQyxHQUE3QyxFQUFrREMsR0FBbEQsRUFBdURDLEdBQXZELEVBQTREQyxHQUE1RCxFQUFpRUMsR0FBakUsRUFBc0VDLEdBQXRFLEVBQTJFQyxHQUEzRSxFQUFnRkMsR0FBaEYsRUFBcUZDLEdBQXJGLEVBQTBGO0FBQ2hHLE1BQUlxRixHQUFHLEdBQUcsSUFBSW5ILElBQUosQ0FBU2UsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxHQUFuQixFQUF3QkMsR0FBeEIsRUFBNkJDLEdBQTdCLEVBQWtDQyxHQUFsQyxFQUF1Q0MsR0FBdkMsRUFBNENDLEdBQTVDLEVBQWlEQyxHQUFqRCxFQUFzREMsR0FBdEQsRUFBMkRDLEdBQTNELEVBQWdFQyxHQUFoRSxFQUFxRUMsR0FBckUsRUFBMEVDLEdBQTFFLEVBQStFQyxHQUEvRSxFQUFvRkMsR0FBcEYsQ0FBVjs7QUFDQSxNQUFJZixHQUFHLEtBQUttTixTQUFaLEVBQXVCO0FBQ25CbE8sSUFBQUEsSUFBSSxDQUFDK0IsUUFBTCxDQUFjb0YsR0FBZDtBQUNIOztBQUNELFNBQU9BLEdBQVA7QUFDSCxDQU5EOztBQVFBNkcsRUFBRSxDQUFDaE8sSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWYWx1ZVR5cGUgZnJvbSAnLi92YWx1ZS10eXBlJztcbmltcG9ydCBDQ0NsYXNzIGZyb20gJy4uL3BsYXRmb3JtL0NDQ2xhc3MnO1xuaW1wb3J0IFZlYzMgZnJvbSAnLi92ZWMzJztcbmltcG9ydCBRdWF0IGZyb20gJy4vcXVhdCc7XG5pbXBvcnQgeyBFUFNJTE9OLCBGTE9BVF9BUlJBWV9UWVBFIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgTWF0MyBmcm9tICcuL21hdDMnO1xuXG5sZXQgX2EwMDogbnVtYmVyID0gMDsgbGV0IF9hMDE6IG51bWJlciA9IDA7IGxldCBfYTAyOiBudW1iZXIgPSAwOyBsZXQgX2EwMzogbnVtYmVyID0gMDtcbmxldCBfYTEwOiBudW1iZXIgPSAwOyBsZXQgX2ExMTogbnVtYmVyID0gMDsgbGV0IF9hMTI6IG51bWJlciA9IDA7IGxldCBfYTEzOiBudW1iZXIgPSAwO1xubGV0IF9hMjA6IG51bWJlciA9IDA7IGxldCBfYTIxOiBudW1iZXIgPSAwOyBsZXQgX2EyMjogbnVtYmVyID0gMDsgbGV0IF9hMjM6IG51bWJlciA9IDA7XG5sZXQgX2EzMDogbnVtYmVyID0gMDsgbGV0IF9hMzE6IG51bWJlciA9IDA7IGxldCBfYTMyOiBudW1iZXIgPSAwOyBsZXQgX2EzMzogbnVtYmVyID0gMDtcblxuLyoqXG4gKiAhI2VuIFJlcHJlc2VudGF0aW9uIG9mIDQqNCBtYXRyaXguXG4gKiAhI3poIOihqOekuiA0KjQg55+p6Zi1XG4gKlxuICogQGNsYXNzIE1hdDRcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXQ0IGV4dGVuZHMgVmFsdWVUeXBlIHtcbiAgICBzdGF0aWMgbXVsID0gTWF0NC5tdWx0aXBseTtcbiAgICBzdGF0aWMgc3ViID0gTWF0NC5zdWJ0cmFjdDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbHkgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcbiAgICAgKiAhI3poIOWwhuW9k+WJjeefqemYteS4juaMh+WumuefqemYteebuOS5mFxuICAgICAqIEBtZXRob2QgbXVsXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlciB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0ge01hdDR9IFtvdXRdIHRoZSByZWNlaXZpbmcgbWF0cml4LCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgbWF0cml4IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyBtYXRyaXggd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIG11bCAobTogTWF0NCwgb3V0OiBNYXQ0KTogTWF0NCB7XG4gICAgICAgIHJldHVybiBNYXQ0Lm11bHRpcGx5KG91dCB8fCBuZXcgTWF0NCgpLCB0aGlzLCBtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cbiAgICAgKiAhI3poIOWwhuefqemYteeahOavj+S4gOS4quWFg+e0oOmDveS5mOS7peaMh+WumueahOe8qeaUvuWAvOOAglxuICAgICAqIEBtZXRob2QgbXVsU2NhbGFyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bWJlciBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcbiAgICAgKi9cbiAgICBtdWxTY2FsYXIgKG51bTogbnVtYmVyLCBvdXQ6IE1hdDQpIHtcbiAgICAgICAgTWF0NC5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IE1hdDQoKSwgdGhpcywgbnVtKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBTdWJ0cmFjdHMgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcbiAgICAgKiAhI3poIOWwhuW9k+WJjeefqemYteS4juaMh+WumueahOefqemYteebuOWHj1xuICAgICAqIEBtZXRob2Qgc3ViXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlciB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcGFyYW0ge01hdDR9IFtvdXRdIHRoZSByZWNlaXZpbmcgbWF0cml4LCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgbWF0cml4IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyBtYXRyaXggd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIHN1YiAobTogTWF0NCwgb3V0OiBNYXQ0KSB7XG4gICAgICAgIE1hdDQuc3VidHJhY3Qob3V0IHx8IG5ldyBNYXQ0KCksIHRoaXMsIG0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElkZW50aXR5ICBvZiBNYXQ0XG4gICAgICogQHByb3BlcnR5IHtNYXQ0fSBJREVOVElUWVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgSURFTlRJVFkgPSBPYmplY3QuZnJlZXplKG5ldyBNYXQ0KCkpO1xuXG4gICAgLyoqXG4gICAgICogISN6aCDojrflvpfmjIflrprnn6npmLXnmoTmi7fotJ1cbiAgICAgKiAhI2VuIENvcHkgb2YgdGhlIHNwZWNpZmllZCBtYXRyaXggdG8gb2J0YWluXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY2xvbmU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0KTogTWF0NFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIGxldCBtID0gYS5tO1xuICAgICAgICByZXR1cm4gbmV3IE1hdDQoXG4gICAgICAgICAgICBtWzBdLCBtWzFdLCBtWzJdLCBtWzNdLFxuICAgICAgICAgICAgbVs0XSwgbVs1XSwgbVs2XSwgbVs3XSxcbiAgICAgICAgICAgIG1bOF0sIG1bOV0sIG1bMTBdLCBtWzExXSxcbiAgICAgICAgICAgIG1bMTJdLCBtWzEzXSwgbVsxNF0sIG1bMTVdLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5aSN5Yi255uu5qCH55+p6Zi1XG4gICAgICogISNlbiBDb3B5IHRoZSB0YXJnZXQgbWF0cml4XG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb3B5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNvcHk8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcbiAgICAgICAgbVswXSA9IGFtWzBdO1xuICAgICAgICBtWzFdID0gYW1bMV07XG4gICAgICAgIG1bMl0gPSBhbVsyXTtcbiAgICAgICAgbVszXSA9IGFtWzNdO1xuICAgICAgICBtWzRdID0gYW1bNF07XG4gICAgICAgIG1bNV0gPSBhbVs1XTtcbiAgICAgICAgbVs2XSA9IGFtWzZdO1xuICAgICAgICBtWzddID0gYW1bN107XG4gICAgICAgIG1bOF0gPSBhbVs4XTtcbiAgICAgICAgbVs5XSA9IGFtWzldO1xuICAgICAgICBtWzEwXSA9IGFtWzEwXTtcbiAgICAgICAgbVsxMV0gPSBhbVsxMV07XG4gICAgICAgIG1bMTJdID0gYW1bMTJdO1xuICAgICAgICBtWzEzXSA9IGFtWzEzXTtcbiAgICAgICAgbVsxNF0gPSBhbVsxNF07XG4gICAgICAgIG1bMTVdID0gYW1bMTVdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6+572u55+p6Zi15YC8XG4gICAgICogISNlbiBTZXR0aW5nIG1hdHJpeCB2YWx1ZXNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNldDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChcbiAgICAgICAgb3V0OiBPdXQsXG4gICAgICAgIG0wMDogbnVtYmVyLCBtMDE6IG51bWJlciwgbTAyOiBudW1iZXIsIG0wMzogbnVtYmVyLFxuICAgICAgICBtMTA6IG51bWJlciwgbTExOiBudW1iZXIsIG0xMjogbnVtYmVyLCBtMTM6IG51bWJlcixcbiAgICAgICAgbTIwOiBudW1iZXIsIG0yMTogbnVtYmVyLCBtMjI6IG51bWJlciwgbTIzOiBudW1iZXIsXG4gICAgICAgIG0zMDogbnVtYmVyLCBtMzE6IG51bWJlciwgbTMyOiBudW1iZXIsIG0zMzogbnVtYmVyLFxuICAgICkge1xuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBtWzBdID0gbTAwOyBtWzFdID0gbTAxOyBtWzJdID0gbTAyOyBtWzNdID0gbTAzO1xuICAgICAgICBtWzRdID0gbTEwOyBtWzVdID0gbTExOyBtWzZdID0gbTEyOyBtWzddID0gbTEzO1xuICAgICAgICBtWzhdID0gbTIwOyBtWzldID0gbTIxOyBtWzEwXSA9IG0yMjsgbVsxMV0gPSBtMjM7XG4gICAgICAgIG1bMTJdID0gbTMwOyBtWzEzXSA9IG0zMTsgbVsxNF0gPSBtMzI7IG1bMTVdID0gbTMzO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5bCG55uu5qCH6LWL5YC85Li65Y2V5L2N55+p6Zi1XG4gICAgICogISNlbiBUaGUgdGFyZ2V0IG9mIGFuIGFzc2lnbm1lbnQgaXMgdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgICAqIEBtZXRob2QgaWRlbnRpdHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGlkZW50aXR5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpZGVudGl0eTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCkge1xuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBtWzBdID0gMTtcbiAgICAgICAgbVsxXSA9IDA7XG4gICAgICAgIG1bMl0gPSAwO1xuICAgICAgICBtWzNdID0gMDtcbiAgICAgICAgbVs0XSA9IDA7XG4gICAgICAgIG1bNV0gPSAxO1xuICAgICAgICBtWzZdID0gMDtcbiAgICAgICAgbVs3XSA9IDA7XG4gICAgICAgIG1bOF0gPSAwO1xuICAgICAgICBtWzldID0gMDtcbiAgICAgICAgbVsxMF0gPSAxO1xuICAgICAgICBtWzExXSA9IDA7XG4gICAgICAgIG1bMTJdID0gMDtcbiAgICAgICAgbVsxM10gPSAwO1xuICAgICAgICBtWzE0XSA9IDA7XG4gICAgICAgIG1bMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOi9rOe9ruefqemYtVxuICAgICAqICEjZW4gVHJhbnNwb3NlZCBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIHRyYW5zcG9zZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdHJhbnNwb3NlPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zcG9zZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgICAgIGNvbnN0IGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSwgYTAzID0gYW1bM10sIGExMiA9IGFtWzZdLCBhMTMgPSBhbVs3XSwgYTIzID0gYW1bMTFdO1xuICAgICAgICAgICAgbVsxXSA9IGFtWzRdO1xuICAgICAgICAgICAgbVsyXSA9IGFtWzhdO1xuICAgICAgICAgICAgbVszXSA9IGFtWzEyXTtcbiAgICAgICAgICAgIG1bNF0gPSBhMDE7XG4gICAgICAgICAgICBtWzZdID0gYW1bOV07XG4gICAgICAgICAgICBtWzddID0gYW1bMTNdO1xuICAgICAgICAgICAgbVs4XSA9IGEwMjtcbiAgICAgICAgICAgIG1bOV0gPSBhMTI7XG4gICAgICAgICAgICBtWzExXSA9IGFtWzE0XTtcbiAgICAgICAgICAgIG1bMTJdID0gYTAzO1xuICAgICAgICAgICAgbVsxM10gPSBhMTM7XG4gICAgICAgICAgICBtWzE0XSA9IGEyMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1bMF0gPSBhbVswXTtcbiAgICAgICAgICAgIG1bMV0gPSBhbVs0XTtcbiAgICAgICAgICAgIG1bMl0gPSBhbVs4XTtcbiAgICAgICAgICAgIG1bM10gPSBhbVsxMl07XG4gICAgICAgICAgICBtWzRdID0gYW1bMV07XG4gICAgICAgICAgICBtWzVdID0gYW1bNV07XG4gICAgICAgICAgICBtWzZdID0gYW1bOV07XG4gICAgICAgICAgICBtWzddID0gYW1bMTNdO1xuICAgICAgICAgICAgbVs4XSA9IGFtWzJdO1xuICAgICAgICAgICAgbVs5XSA9IGFtWzZdO1xuICAgICAgICAgICAgbVsxMF0gPSBhbVsxMF07XG4gICAgICAgICAgICBtWzExXSA9IGFtWzE0XTtcbiAgICAgICAgICAgIG1bMTJdID0gYW1bM107XG4gICAgICAgICAgICBtWzEzXSA9IGFtWzddO1xuICAgICAgICAgICAgbVsxNF0gPSBhbVsxMV07XG4gICAgICAgICAgICBtWzE1XSA9IGFtWzE1XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg55+p6Zi15rGC6YCGXG4gICAgICogISNlbiBNYXRyaXggaW52ZXJzaW9uXG4gICAgICogQG1ldGhvZCBpbnZlcnRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGludmVydDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpbnZlcnQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBsZXQgYW0gPSBhLm07XG4gICAgICAgIF9hMDAgPSBhbVswXTsgX2EwMSA9IGFtWzFdOyBfYTAyID0gYW1bMl07IF9hMDMgPSBhbVszXTtcbiAgICAgICAgX2ExMCA9IGFtWzRdOyBfYTExID0gYW1bNV07IF9hMTIgPSBhbVs2XTsgX2ExMyA9IGFtWzddO1xuICAgICAgICBfYTIwID0gYW1bOF07IF9hMjEgPSBhbVs5XTsgX2EyMiA9IGFtWzEwXTsgX2EyMyA9IGFtWzExXTtcbiAgICAgICAgX2EzMCA9IGFtWzEyXTsgX2EzMSA9IGFtWzEzXTsgX2EzMiA9IGFtWzE0XTsgX2EzMyA9IGFtWzE1XTtcblxuICAgICAgICBjb25zdCBiMDAgPSBfYTAwICogX2ExMSAtIF9hMDEgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDEgPSBfYTAwICogX2ExMiAtIF9hMDIgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBfYTAwICogX2ExMyAtIF9hMDMgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDMgPSBfYTAxICogX2ExMiAtIF9hMDIgKiBfYTExO1xuICAgICAgICBjb25zdCBiMDQgPSBfYTAxICogX2ExMyAtIF9hMDMgKiBfYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBfYTAyICogX2ExMyAtIF9hMDMgKiBfYTEyO1xuICAgICAgICBjb25zdCBiMDYgPSBfYTIwICogX2EzMSAtIF9hMjEgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDcgPSBfYTIwICogX2EzMiAtIF9hMjIgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBfYTIwICogX2EzMyAtIF9hMjMgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDkgPSBfYTIxICogX2EzMiAtIF9hMjIgKiBfYTMxO1xuICAgICAgICBjb25zdCBiMTAgPSBfYTIxICogX2EzMyAtIF9hMjMgKiBfYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBfYTIyICogX2EzMyAtIF9hMjMgKiBfYTMyO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgICAgICBpZiAoZGV0ID09PSAwKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBtWzBdID0gKF9hMTEgKiBiMTEgLSBfYTEyICogYjEwICsgX2ExMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG1bMV0gPSAoX2EwMiAqIGIxMCAtIF9hMDEgKiBiMTEgLSBfYTAzICogYjA5KSAqIGRldDtcbiAgICAgICAgbVsyXSA9IChfYTMxICogYjA1IC0gX2EzMiAqIGIwNCArIF9hMzMgKiBiMDMpICogZGV0O1xuICAgICAgICBtWzNdID0gKF9hMjIgKiBiMDQgLSBfYTIxICogYjA1IC0gX2EyMyAqIGIwMykgKiBkZXQ7XG4gICAgICAgIG1bNF0gPSAoX2ExMiAqIGIwOCAtIF9hMTAgKiBiMTEgLSBfYTEzICogYjA3KSAqIGRldDtcbiAgICAgICAgbVs1XSA9IChfYTAwICogYjExIC0gX2EwMiAqIGIwOCArIF9hMDMgKiBiMDcpICogZGV0O1xuICAgICAgICBtWzZdID0gKF9hMzIgKiBiMDIgLSBfYTMwICogYjA1IC0gX2EzMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIG1bN10gPSAoX2EyMCAqIGIwNSAtIF9hMjIgKiBiMDIgKyBfYTIzICogYjAxKSAqIGRldDtcbiAgICAgICAgbVs4XSA9IChfYTEwICogYjEwIC0gX2ExMSAqIGIwOCArIF9hMTMgKiBiMDYpICogZGV0O1xuICAgICAgICBtWzldID0gKF9hMDEgKiBiMDggLSBfYTAwICogYjEwIC0gX2EwMyAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG1bMTBdID0gKF9hMzAgKiBiMDQgLSBfYTMxICogYjAyICsgX2EzMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG1bMTFdID0gKF9hMjEgKiBiMDIgLSBfYTIwICogYjA0IC0gX2EyMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG1bMTJdID0gKF9hMTEgKiBiMDcgLSBfYTEwICogYjA5IC0gX2ExMiAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG1bMTNdID0gKF9hMDAgKiBiMDkgLSBfYTAxICogYjA3ICsgX2EwMiAqIGIwNikgKiBkZXQ7XG4gICAgICAgIG1bMTRdID0gKF9hMzEgKiBiMDEgLSBfYTMwICogYjAzIC0gX2EzMiAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG1bMTVdID0gKF9hMjAgKiBiMDMgLSBfYTIxICogYjAxICsgX2EyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOefqemYteihjOWIl+W8j1xuICAgICAqICEjZW4gTWF0cml4IGRldGVybWluYW50XG4gICAgICogQG1ldGhvZCBkZXRlcm1pbmFudFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZGV0ZXJtaW5hbnQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAoYTogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBkZXRlcm1pbmFudDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChhOiBPdXQpOiBudW1iZXIge1xuICAgICAgICBsZXQgbSA9IGEubTtcbiAgICAgICAgX2EwMCA9IG1bMF07IF9hMDEgPSBtWzFdOyBfYTAyID0gbVsyXTsgX2EwMyA9IG1bM107XG4gICAgICAgIF9hMTAgPSBtWzRdOyBfYTExID0gbVs1XTsgX2ExMiA9IG1bNl07IF9hMTMgPSBtWzddO1xuICAgICAgICBfYTIwID0gbVs4XTsgX2EyMSA9IG1bOV07IF9hMjIgPSBtWzEwXTsgX2EyMyA9IG1bMTFdO1xuICAgICAgICBfYTMwID0gbVsxMl07IF9hMzEgPSBtWzEzXTsgX2EzMiA9IG1bMTRdOyBfYTMzID0gbVsxNV07XG5cbiAgICAgICAgY29uc3QgYjAwID0gX2EwMCAqIF9hMTEgLSBfYTAxICogX2ExMDtcbiAgICAgICAgY29uc3QgYjAxID0gX2EwMCAqIF9hMTIgLSBfYTAyICogX2ExMDtcbiAgICAgICAgY29uc3QgYjAyID0gX2EwMCAqIF9hMTMgLSBfYTAzICogX2ExMDtcbiAgICAgICAgY29uc3QgYjAzID0gX2EwMSAqIF9hMTIgLSBfYTAyICogX2ExMTtcbiAgICAgICAgY29uc3QgYjA0ID0gX2EwMSAqIF9hMTMgLSBfYTAzICogX2ExMTtcbiAgICAgICAgY29uc3QgYjA1ID0gX2EwMiAqIF9hMTMgLSBfYTAzICogX2ExMjtcbiAgICAgICAgY29uc3QgYjA2ID0gX2EyMCAqIF9hMzEgLSBfYTIxICogX2EzMDtcbiAgICAgICAgY29uc3QgYjA3ID0gX2EyMCAqIF9hMzIgLSBfYTIyICogX2EzMDtcbiAgICAgICAgY29uc3QgYjA4ID0gX2EyMCAqIF9hMzMgLSBfYTIzICogX2EzMDtcbiAgICAgICAgY29uc3QgYjA5ID0gX2EyMSAqIF9hMzIgLSBfYTIyICogX2EzMTtcbiAgICAgICAgY29uc3QgYjEwID0gX2EyMSAqIF9hMzMgLSBfYTIzICogX2EzMTtcbiAgICAgICAgY29uc3QgYjExID0gX2EyMiAqIF9hMzMgLSBfYTIzICogX2EzMjtcblxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDnn6npmLXkuZjms5VcbiAgICAgKiAhI2VuIE1hdHJpeCBNdWx0aXBsaWNhdGlvblxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHk8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tLCBibSA9IGIubTtcbiAgICAgICAgX2EwMCA9IGFtWzBdOyBfYTAxID0gYW1bMV07IF9hMDIgPSBhbVsyXTsgX2EwMyA9IGFtWzNdO1xuICAgICAgICBfYTEwID0gYW1bNF07IF9hMTEgPSBhbVs1XTsgX2ExMiA9IGFtWzZdOyBfYTEzID0gYW1bN107XG4gICAgICAgIF9hMjAgPSBhbVs4XTsgX2EyMSA9IGFtWzldOyBfYTIyID0gYW1bMTBdOyBfYTIzID0gYW1bMTFdO1xuICAgICAgICBfYTMwID0gYW1bMTJdOyBfYTMxID0gYW1bMTNdOyBfYTMyID0gYW1bMTRdOyBfYTMzID0gYW1bMTVdO1xuXG4gICAgICAgIC8vIENhY2hlIG9ubHkgdGhlIGN1cnJlbnQgbGluZSBvZiB0aGUgc2Vjb25kIG1hdHJpeFxuICAgICAgICBsZXQgYjAgPSBibVswXSwgYjEgPSBibVsxXSwgYjIgPSBibVsyXSwgYjMgPSBibVszXTtcbiAgICAgICAgbVswXSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcbiAgICAgICAgbVsxXSA9IGIwICogX2EwMSArIGIxICogX2ExMSArIGIyICogX2EyMSArIGIzICogX2EzMTtcbiAgICAgICAgbVsyXSA9IGIwICogX2EwMiArIGIxICogX2ExMiArIGIyICogX2EyMiArIGIzICogX2EzMjtcbiAgICAgICAgbVszXSA9IGIwICogX2EwMyArIGIxICogX2ExMyArIGIyICogX2EyMyArIGIzICogX2EzMztcblxuICAgICAgICBiMCA9IGJtWzRdOyBiMSA9IGJtWzVdOyBiMiA9IGJtWzZdOyBiMyA9IGJtWzddO1xuICAgICAgICBtWzRdID0gYjAgKiBfYTAwICsgYjEgKiBfYTEwICsgYjIgKiBfYTIwICsgYjMgKiBfYTMwO1xuICAgICAgICBtWzVdID0gYjAgKiBfYTAxICsgYjEgKiBfYTExICsgYjIgKiBfYTIxICsgYjMgKiBfYTMxO1xuICAgICAgICBtWzZdID0gYjAgKiBfYTAyICsgYjEgKiBfYTEyICsgYjIgKiBfYTIyICsgYjMgKiBfYTMyO1xuICAgICAgICBtWzddID0gYjAgKiBfYTAzICsgYjEgKiBfYTEzICsgYjIgKiBfYTIzICsgYjMgKiBfYTMzO1xuXG4gICAgICAgIGIwID0gYm1bOF07IGIxID0gYm1bOV07IGIyID0gYm1bMTBdOyBiMyA9IGJtWzExXTtcbiAgICAgICAgbVs4XSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcbiAgICAgICAgbVs5XSA9IGIwICogX2EwMSArIGIxICogX2ExMSArIGIyICogX2EyMSArIGIzICogX2EzMTtcbiAgICAgICAgbVsxMF0gPSBiMCAqIF9hMDIgKyBiMSAqIF9hMTIgKyBiMiAqIF9hMjIgKyBiMyAqIF9hMzI7XG4gICAgICAgIG1bMTFdID0gYjAgKiBfYTAzICsgYjEgKiBfYTEzICsgYjIgKiBfYTIzICsgYjMgKiBfYTMzO1xuXG4gICAgICAgIGIwID0gYm1bMTJdOyBiMSA9IGJtWzEzXTsgYjIgPSBibVsxNF07IGIzID0gYm1bMTVdO1xuICAgICAgICBtWzEyXSA9IGIwICogX2EwMCArIGIxICogX2ExMCArIGIyICogX2EyMCArIGIzICogX2EzMDtcbiAgICAgICAgbVsxM10gPSBiMCAqIF9hMDEgKyBiMSAqIF9hMTEgKyBiMiAqIF9hMjEgKyBiMyAqIF9hMzE7XG4gICAgICAgIG1bMTRdID0gYjAgKiBfYTAyICsgYjEgKiBfYTEyICsgYjIgKiBfYTIyICsgYjMgKiBfYTMyO1xuICAgICAgICBtWzE1XSA9IGIwICogX2EwMyArIGIxICogX2ExMyArIGIyICogX2EyMyArIGIzICogX2EzMztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpeWPmOaNolxuICAgICAqICEjZW4gV2FzIGFkZGVkIGluIGEgZ2l2ZW4gdHJhbnNmb3JtYXRpb24gbWF0cml4IHRyYW5zZm9ybWF0aW9uIG9uIHRoZSBiYXNpcyBvZlxuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0cmFuc2Zvcm08T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgdjogVmVjTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHYueCwgeSA9IHYueSwgeiA9IHYuejtcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm07XG4gICAgICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgICAgIG1bMTJdID0gYW1bMF0gKiB4ICsgYW1bNF0gKiB5ICsgYW1bOF0gKiB6ICsgYW1bMTJdO1xuICAgICAgICAgICAgbVsxM10gPSBhbVsxXSAqIHggKyBhbVs1XSAqIHkgKyBhbVs5XSAqIHogKyBhbVsxM107XG4gICAgICAgICAgICBtWzE0XSA9IGFtWzJdICogeCArIGFtWzZdICogeSArIGFtWzEwXSAqIHogKyBhbVsxNF07XG4gICAgICAgICAgICBtWzE1XSA9IGFtWzNdICogeCArIGFtWzddICogeSArIGFtWzExXSAqIHogKyBhbVsxNV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfYTAwID0gYW1bMF07IF9hMDEgPSBhbVsxXTsgX2EwMiA9IGFtWzJdOyBfYTAzID0gYW1bM107XG4gICAgICAgICAgICBfYTEwID0gYW1bNF07IF9hMTEgPSBhbVs1XTsgX2ExMiA9IGFtWzZdOyBfYTEzID0gYW1bN107XG4gICAgICAgICAgICBfYTIwID0gYW1bOF07IF9hMjEgPSBhbVs5XTsgX2EyMiA9IGFtWzEwXTsgX2EyMyA9IGFtWzExXTtcbiAgICAgICAgICAgIF9hMzAgPSBhbVsxMl07IF9hMzEgPSBhbVsxM107IF9hMzIgPSBhbVsxNF07IF9hMzMgPSBhbVsxNV07XG5cbiAgICAgICAgICAgIG1bMF0gPSBfYTAwOyBtWzFdID0gX2EwMTsgbVsyXSA9IF9hMDI7IG1bM10gPSBfYTAzO1xuICAgICAgICAgICAgbVs0XSA9IF9hMTA7IG1bNV0gPSBfYTExOyBtWzZdID0gX2ExMjsgbVs3XSA9IF9hMTM7XG4gICAgICAgICAgICBtWzhdID0gX2EyMDsgbVs5XSA9IF9hMjE7IG1bMTBdID0gX2EyMjsgbVsxMV0gPSBfYTIzO1xuXG4gICAgICAgICAgICBtWzEyXSA9IF9hMDAgKiB4ICsgX2ExMCAqIHkgKyBfYTIwICogeiArIGFtWzEyXTtcbiAgICAgICAgICAgIG1bMTNdID0gX2EwMSAqIHggKyBfYTExICogeSArIF9hMjEgKiB6ICsgYW1bMTNdO1xuICAgICAgICAgICAgbVsxNF0gPSBfYTAyICogeCArIF9hMTIgKiB5ICsgX2EyMiAqIHogKyBhbVsxNF07XG4gICAgICAgICAgICBtWzE1XSA9IF9hMDMgKiB4ICsgX2ExMyAqIHkgKyBfYTIzICogeiArIGFtWzE1XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl5paw5L2N56e75Y+Y5o2iXG4gICAgICogISNlbiBBZGQgbmV3IGRpc3BsYWNlbWVudCB0cmFuc2R1Y2VyIGluIGEgbWF0cml4IHRyYW5zZm9ybWF0aW9uIG9uIHRoZSBiYXNpcyBvZiBhIGdpdmVuXG4gICAgICogQG1ldGhvZCB0cmFuc2xhdGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zbGF0ZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2xhdGU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgdjogVmVjTGlrZSkge1xuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcbiAgICAgICAgaWYgKGEgPT09IG91dCkge1xuICAgICAgICAgICAgbVsxMl0gKz0gdi54O1xuICAgICAgICAgICAgbVsxM10gKz0gdi55O1xuICAgICAgICAgICAgbVsxNF0gKz0gdi56O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbVswXSA9IGFtWzBdOyBtWzFdID0gYW1bMV07IG1bMl0gPSBhbVsyXTsgbVszXSA9IGFtWzNdO1xuICAgICAgICAgICAgbVs0XSA9IGFtWzRdOyBtWzVdID0gYW1bNV07IG1bNl0gPSBhbVs2XTsgbVs3XSA9IGFtWzddO1xuICAgICAgICAgICAgbVs4XSA9IGFtWzhdOyBtWzldID0gYW1bOV07IG1bMTBdID0gYW1bMTBdOyBtWzExXSA9IGFtWzExXTtcbiAgICAgICAgICAgIG1bMTJdICs9IHYueDtcbiAgICAgICAgICAgIG1bMTNdICs9IHYueTtcbiAgICAgICAgICAgIG1bMTRdICs9IHYuejtcbiAgICAgICAgICAgIG1bMTVdID0gYW1bMTVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDnvKnmlL7lj5jmjaJcbiAgICAgKiAhI2VuIEFkZCBuZXcgc2NhbGluZyB0cmFuc2Zvcm1hdGlvbiBpbiBhIGdpdmVuIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcbiAgICAgKiBAbWV0aG9kIHNjYWxlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzY2FsZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzY2FsZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCB2OiBWZWNMaWtlKSB7XG4gICAgICAgIGNvbnN0IHggPSB2LngsIHkgPSB2LnksIHogPSB2Lno7XG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tO1xuICAgICAgICBtWzBdID0gYW1bMF0gKiB4O1xuICAgICAgICBtWzFdID0gYW1bMV0gKiB4O1xuICAgICAgICBtWzJdID0gYW1bMl0gKiB4O1xuICAgICAgICBtWzNdID0gYW1bM10gKiB4O1xuICAgICAgICBtWzRdID0gYW1bNF0gKiB5O1xuICAgICAgICBtWzVdID0gYW1bNV0gKiB5O1xuICAgICAgICBtWzZdID0gYW1bNl0gKiB5O1xuICAgICAgICBtWzddID0gYW1bN10gKiB5O1xuICAgICAgICBtWzhdID0gYW1bOF0gKiB6O1xuICAgICAgICBtWzldID0gYW1bOV0gKiB6O1xuICAgICAgICBtWzEwXSA9IGFtWzEwXSAqIHo7XG4gICAgICAgIG1bMTFdID0gYW1bMTFdICogejtcbiAgICAgICAgbVsxMl0gPSBhbVsxMl07XG4gICAgICAgIG1bMTNdID0gYW1bMTNdO1xuICAgICAgICBtWzE0XSA9IGFtWzE0XTtcbiAgICAgICAgbVsxNV0gPSBhbVsxNV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXmlrDml4vovazlj5jmjaJcbiAgICAgKiAhI2VuIEFkZCBhIG5ldyByb3RhdGlvbmFsIHRyYW5zZm9ybSBtYXRyaXggdHJhbnNmb3JtYXRpb24gb24gdGhlIGJhc2lzIG9mIGEgZ2l2ZW5cbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogcm90YXRlPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyLCBheGlzOiBWZWNMaWtlKTogT3V0XG4gICAgICogQHBhcmFtIHJhZCDml4vovazop5LluqZcbiAgICAgKiBAcGFyYW0gYXhpcyDml4vovazovbRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZTxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlciwgYXhpczogVmVjTGlrZSkge1xuICAgICAgICBsZXQgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcblxuICAgICAgICBsZXQgbGVuID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKGxlbikgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICAgIHggKj0gbGVuO1xuICAgICAgICB5ICo9IGxlbjtcbiAgICAgICAgeiAqPSBsZW47XG5cbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICBjb25zdCB0ID0gMSAtIGM7XG5cbiAgICAgICAgbGV0IGFtID0gYS5tO1xuICAgICAgICBfYTAwID0gYW1bMF07IF9hMDEgPSBhbVsxXTsgX2EwMiA9IGFtWzJdOyBfYTAzID0gYW1bM107XG4gICAgICAgIF9hMTAgPSBhbVs0XTsgX2ExMSA9IGFtWzVdOyBfYTEyID0gYW1bNl07IF9hMTMgPSBhbVs3XTtcbiAgICAgICAgX2EyMCA9IGFtWzhdOyBfYTIxID0gYW1bOV07IF9hMjIgPSBhbVsxMF07IF9hMjMgPSBhbVsxMV07XG5cbiAgICAgICAgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG4gICAgICAgIGNvbnN0IGIwMCA9IHggKiB4ICogdCArIGMsIGIwMSA9IHkgKiB4ICogdCArIHogKiBzLCBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICAgICAgY29uc3QgYjEwID0geCAqIHkgKiB0IC0geiAqIHMsIGIxMSA9IHkgKiB5ICogdCArIGMsIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICAgICAgICBjb25zdCBiMjAgPSB4ICogeiAqIHQgKyB5ICogcywgYjIxID0geSAqIHogKiB0IC0geCAqIHMsIGIyMiA9IHogKiB6ICogdCArIGM7XG5cbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgbVswXSA9IF9hMDAgKiBiMDAgKyBfYTEwICogYjAxICsgX2EyMCAqIGIwMjtcbiAgICAgICAgbVsxXSA9IF9hMDEgKiBiMDAgKyBfYTExICogYjAxICsgX2EyMSAqIGIwMjtcbiAgICAgICAgbVsyXSA9IF9hMDIgKiBiMDAgKyBfYTEyICogYjAxICsgX2EyMiAqIGIwMjtcbiAgICAgICAgbVszXSA9IF9hMDMgKiBiMDAgKyBfYTEzICogYjAxICsgX2EyMyAqIGIwMjtcbiAgICAgICAgbVs0XSA9IF9hMDAgKiBiMTAgKyBfYTEwICogYjExICsgX2EyMCAqIGIxMjtcbiAgICAgICAgbVs1XSA9IF9hMDEgKiBiMTAgKyBfYTExICogYjExICsgX2EyMSAqIGIxMjtcbiAgICAgICAgbVs2XSA9IF9hMDIgKiBiMTAgKyBfYTEyICogYjExICsgX2EyMiAqIGIxMjtcbiAgICAgICAgbVs3XSA9IF9hMDMgKiBiMTAgKyBfYTEzICogYjExICsgX2EyMyAqIGIxMjtcbiAgICAgICAgbVs4XSA9IF9hMDAgKiBiMjAgKyBfYTEwICogYjIxICsgX2EyMCAqIGIyMjtcbiAgICAgICAgbVs5XSA9IF9hMDEgKiBiMjAgKyBfYTExICogYjIxICsgX2EyMSAqIGIyMjtcbiAgICAgICAgbVsxMF0gPSBfYTAyICogYjIwICsgX2ExMiAqIGIyMSArIF9hMjIgKiBiMjI7XG4gICAgICAgIG1bMTFdID0gX2EwMyAqIGIyMCArIF9hMTMgKiBiMjEgKyBfYTIzICogYjIyO1xuXG4gICAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIGlmIChhICE9PSBvdXQpIHtcbiAgICAgICAgICAgIG1bMTJdID0gYW1bMTJdO1xuICAgICAgICAgICAgbVsxM10gPSBhbVsxM107XG4gICAgICAgICAgICBtWzE0XSA9IGFtWzE0XTtcbiAgICAgICAgICAgIG1bMTVdID0gYW1bMTVdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWcqOe7meWumuefqemYteWPmOaNouWfuuehgOS4iuWKoOWFpee7lSBYIOi9tOeahOaXi+i9rOWPmOaNolxuICAgICAqICEjZW4gQWRkIHJvdGF0aW9uYWwgdHJhbnNmb3JtYXRpb24gYXJvdW5kIHRoZSBYIGF4aXMgYXQgYSBnaXZlbiBtYXRyaXggdHJhbnNmb3JtYXRpb24gb24gdGhlIGJhc2lzIG9mXG4gICAgICogQG1ldGhvZCByb3RhdGVYXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3RhdGVYPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIHJhZCDml4vovazop5LluqZcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZVg8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm07XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgICAgICBhMTAgPSBhbVs0XSxcbiAgICAgICAgICAgIGExMSA9IGFtWzVdLFxuICAgICAgICAgICAgYTEyID0gYW1bNl0sXG4gICAgICAgICAgICBhMTMgPSBhbVs3XSxcbiAgICAgICAgICAgIGEyMCA9IGFtWzhdLFxuICAgICAgICAgICAgYTIxID0gYW1bOV0sXG4gICAgICAgICAgICBhMjIgPSBhbVsxMF0sXG4gICAgICAgICAgICBhMjMgPSBhbVsxMV07XG5cbiAgICAgICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgICAgICBtWzBdID0gYW1bMF07XG4gICAgICAgICAgICBtWzFdID0gYW1bMV07XG4gICAgICAgICAgICBtWzJdID0gYW1bMl07XG4gICAgICAgICAgICBtWzNdID0gYW1bM107XG4gICAgICAgICAgICBtWzEyXSA9IGFtWzEyXTtcbiAgICAgICAgICAgIG1bMTNdID0gYW1bMTNdO1xuICAgICAgICAgICAgbVsxNF0gPSBhbVsxNF07XG4gICAgICAgICAgICBtWzE1XSA9IGFtWzE1XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgbVs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgICAgICBtWzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgICAgIG1bNl0gPSBhMTIgKiBjICsgYTIyICogcztcbiAgICAgICAgbVs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgICAgICBtWzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgICAgIG1bOV0gPSBhMjEgKiBjIC0gYTExICogcztcbiAgICAgICAgbVsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICAgICAgbVsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5Zyo57uZ5a6a55+p6Zi15Y+Y5o2i5Z+656GA5LiK5Yqg5YWl57uVIFkg6L2055qE5peL6L2s5Y+Y5o2iXG4gICAgICogISNlbiBBZGQgYWJvdXQgdGhlIFkgYXhpcyByb3RhdGlvbiB0cmFuc2Zvcm1hdGlvbiBpbiBhIGdpdmVuIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVk8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOinkuW6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubTtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgICAgIGEwMCA9IGFtWzBdLFxuICAgICAgICAgICAgYTAxID0gYW1bMV0sXG4gICAgICAgICAgICBhMDIgPSBhbVsyXSxcbiAgICAgICAgICAgIGEwMyA9IGFtWzNdLFxuICAgICAgICAgICAgYTIwID0gYW1bOF0sXG4gICAgICAgICAgICBhMjEgPSBhbVs5XSxcbiAgICAgICAgICAgIGEyMiA9IGFtWzEwXSxcbiAgICAgICAgICAgIGEyMyA9IGFtWzExXTtcblxuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgICAgIG1bNF0gPSBhbVs0XTtcbiAgICAgICAgICAgIG1bNV0gPSBhbVs1XTtcbiAgICAgICAgICAgIG1bNl0gPSBhbVs2XTtcbiAgICAgICAgICAgIG1bN10gPSBhbVs3XTtcbiAgICAgICAgICAgIG1bMTJdID0gYW1bMTJdO1xuICAgICAgICAgICAgbVsxM10gPSBhbVsxM107XG4gICAgICAgICAgICBtWzE0XSA9IGFtWzE0XTtcbiAgICAgICAgICAgIG1bMTVdID0gYW1bMTVdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAgICBtWzBdID0gYTAwICogYyAtIGEyMCAqIHM7XG4gICAgICAgIG1bMV0gPSBhMDEgKiBjIC0gYTIxICogcztcbiAgICAgICAgbVsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgICAgICBtWzNdID0gYTAzICogYyAtIGEyMyAqIHM7XG4gICAgICAgIG1bOF0gPSBhMDAgKiBzICsgYTIwICogYztcbiAgICAgICAgbVs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgICAgICBtWzEwXSA9IGEwMiAqIHMgKyBhMjIgKiBjO1xuICAgICAgICBtWzExXSA9IGEwMyAqIHMgKyBhMjMgKiBjO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlnKjnu5nlrprnn6npmLXlj5jmjaLln7rnoYDkuIrliqDlhaXnu5UgWiDovbTnmoTml4vovazlj5jmjaJcbiAgICAgKiAhI2VuIEFkZGVkIGFib3V0IHRoZSBaIGF4aXMgYXQgYSBnaXZlbiByb3RhdGlvbmFsIHRyYW5zZm9ybWF0aW9uIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiBvbiB0aGUgYmFzaXMgb2ZcbiAgICAgKiBAbWV0aG9kIHJvdGF0ZVpcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHJvdGF0ZVo8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gcmFkIOaXi+i9rOinkuW6plxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm90YXRlWjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhbSA9IGEubTtcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgICAgIGEwMCA9IGEubVswXSxcbiAgICAgICAgICAgIGEwMSA9IGEubVsxXSxcbiAgICAgICAgICAgIGEwMiA9IGEubVsyXSxcbiAgICAgICAgICAgIGEwMyA9IGEubVszXSxcbiAgICAgICAgICAgIGExMCA9IGEubVs0XSxcbiAgICAgICAgICAgIGExMSA9IGEubVs1XSxcbiAgICAgICAgICAgIGExMiA9IGEubVs2XSxcbiAgICAgICAgICAgIGExMyA9IGEubVs3XTtcblxuICAgICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgICAgICAgICBtWzhdID0gYW1bOF07XG4gICAgICAgICAgICBtWzldID0gYW1bOV07XG4gICAgICAgICAgICBtWzEwXSA9IGFtWzEwXTtcbiAgICAgICAgICAgIG1bMTFdID0gYW1bMTFdO1xuICAgICAgICAgICAgbVsxMl0gPSBhbVsxMl07XG4gICAgICAgICAgICBtWzEzXSA9IGFtWzEzXTtcbiAgICAgICAgICAgIG1bMTRdID0gYW1bMTRdO1xuICAgICAgICAgICAgbVsxNV0gPSBhbVsxNV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIG1bMF0gPSBhMDAgKiBjICsgYTEwICogcztcbiAgICAgICAgbVsxXSA9IGEwMSAqIGMgKyBhMTEgKiBzO1xuICAgICAgICBtWzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgICAgIG1bM10gPSBhMDMgKiBjICsgYTEzICogcztcbiAgICAgICAgbVs0XSA9IGExMCAqIGMgLSBhMDAgKiBzO1xuICAgICAgICBtWzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgICAgIG1bNl0gPSBhMTIgKiBjIC0gYTAyICogcztcbiAgICAgICAgbVs3XSA9IGExMyAqIGMgLSBhMDMgKiBzO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorqHnrpfkvY3np7vnn6npmLVcbiAgICAgKiAhI2VuIERpc3BsYWNlbWVudCBtYXRyaXggY2FsY3VsYXRpb25cbiAgICAgKiBAbWV0aG9kIGZyb21UcmFuc2xhdGlvblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVRyYW5zbGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBWZWNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVHJhbnNsYXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9IDE7XG4gICAgICAgIG1bMV0gPSAwO1xuICAgICAgICBtWzJdID0gMDtcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSAwO1xuICAgICAgICBtWzVdID0gMTtcbiAgICAgICAgbVs2XSA9IDA7XG4gICAgICAgIG1bN10gPSAwO1xuICAgICAgICBtWzhdID0gMDtcbiAgICAgICAgbVs5XSA9IDA7XG4gICAgICAgIG1bMTBdID0gMTtcbiAgICAgICAgbVsxMV0gPSAwO1xuICAgICAgICBtWzEyXSA9IHYueDtcbiAgICAgICAgbVsxM10gPSB2Lnk7XG4gICAgICAgIG1bMTRdID0gdi56O1xuICAgICAgICBtWzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorqHnrpfnvKnmlL7nn6npmLVcbiAgICAgKiAhI2VuIFNjYWxpbmcgbWF0cml4IGNhbGN1bGF0aW9uXG4gICAgICogQG1ldGhvZCBmcm9tU2NhbGluZ1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVNjYWxpbmc8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHY6IFZlY0xpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21TY2FsaW5nPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCB2OiBWZWNMaWtlKSB7XG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSB2Lng7XG4gICAgICAgIG1bMV0gPSAwO1xuICAgICAgICBtWzJdID0gMDtcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSAwO1xuICAgICAgICBtWzVdID0gdi55O1xuICAgICAgICBtWzZdID0gMDtcbiAgICAgICAgbVs3XSA9IDA7XG4gICAgICAgIG1bOF0gPSAwO1xuICAgICAgICBtWzldID0gMDtcbiAgICAgICAgbVsxMF0gPSB2Lno7XG4gICAgICAgIG1bMTFdID0gMDtcbiAgICAgICAgbVsxMl0gPSAwO1xuICAgICAgICBtWzEzXSA9IDA7XG4gICAgICAgIG1bMTRdID0gMDtcbiAgICAgICAgbVsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6h566X5peL6L2s55+p6Zi1XG4gICAgICogISNlbiBDYWxjdWxhdGVzIHRoZSByb3RhdGlvbiBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIGZyb21Sb3RhdGlvblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlciwgYXhpczogVmVjTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlciwgYXhpczogVmVjTGlrZSkge1xuICAgICAgICBsZXQgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcbiAgICAgICAgbGV0IGxlbiA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhsZW4pIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgICB4ICo9IGxlbjtcbiAgICAgICAgeSAqPSBsZW47XG4gICAgICAgIHogKj0gbGVuO1xuXG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpO1xuICAgICAgICBjb25zdCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgY29uc3QgdCA9IDEgLSBjO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSB4ICogeCAqIHQgKyBjO1xuICAgICAgICBtWzFdID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgICAgIG1bMl0gPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICAgICAgbVs1XSA9IHkgKiB5ICogdCArIGM7XG4gICAgICAgIG1bNl0gPSB6ICogeSAqIHQgKyB4ICogcztcbiAgICAgICAgbVs3XSA9IDA7XG4gICAgICAgIG1bOF0gPSB4ICogeiAqIHQgKyB5ICogcztcbiAgICAgICAgbVs5XSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICAgICAgICBtWzEwXSA9IHogKiB6ICogdCArIGM7XG4gICAgICAgIG1bMTFdID0gMDtcbiAgICAgICAgbVsxMl0gPSAwO1xuICAgICAgICBtWzEzXSA9IDA7XG4gICAgICAgIG1bMTRdID0gMDtcbiAgICAgICAgbVsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6h566X57uVIFgg6L2055qE5peL6L2s55+p6Zi1XG4gICAgICogISNlbiBDYWxjdWxhdGluZyByb3RhdGlvbiBtYXRyaXggYWJvdXQgdGhlIFggYXhpc1xuICAgICAqIEBtZXRob2QgZnJvbVhSb3RhdGlvblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVhSb3RhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21YUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgICAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSAxO1xuICAgICAgICBtWzFdID0gMDtcbiAgICAgICAgbVsyXSA9IDA7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0gMDtcbiAgICAgICAgbVs1XSA9IGM7XG4gICAgICAgIG1bNl0gPSBzO1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9IDA7XG4gICAgICAgIG1bOV0gPSAtcztcbiAgICAgICAgbVsxMF0gPSBjO1xuICAgICAgICBtWzExXSA9IDA7XG4gICAgICAgIG1bMTJdID0gMDtcbiAgICAgICAgbVsxM10gPSAwO1xuICAgICAgICBtWzE0XSA9IDA7XG4gICAgICAgIG1bMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiuoeeul+e7lSBZIOi9tOeahOaXi+i9rOefqemYtVxuICAgICAqICEjZW4gQ2FsY3VsYXRpbmcgcm90YXRpb24gbWF0cml4IGFib3V0IHRoZSBZIGF4aXNcbiAgICAgKiBAbWV0aG9kIGZyb21ZUm90YXRpb25cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21ZUm90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIHJhZDogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tWVJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBzID0gTWF0aC5zaW4ocmFkKSwgYyA9IE1hdGguY29zKHJhZCk7XG5cbiAgICAgICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBtWzBdID0gYztcbiAgICAgICAgbVsxXSA9IDA7XG4gICAgICAgIG1bMl0gPSAtcztcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSAwO1xuICAgICAgICBtWzVdID0gMTtcbiAgICAgICAgbVs2XSA9IDA7XG4gICAgICAgIG1bN10gPSAwO1xuICAgICAgICBtWzhdID0gcztcbiAgICAgICAgbVs5XSA9IDA7XG4gICAgICAgIG1bMTBdID0gYztcbiAgICAgICAgbVsxMV0gPSAwO1xuICAgICAgICBtWzEyXSA9IDA7XG4gICAgICAgIG1bMTNdID0gMDtcbiAgICAgICAgbVsxNF0gPSAwO1xuICAgICAgICBtWzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDorqHnrpfnu5UgWiDovbTnmoTml4vovaznn6npmLVcbiAgICAgKiAhI2VuIENhbGN1bGF0aW5nIHJvdGF0aW9uIG1hdHJpeCBhYm91dCB0aGUgWiBheGlzXG4gICAgICogQG1ldGhvZCBmcm9tWlJvdGF0aW9uXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tWlJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCByYWQ6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVpSb3RhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcmFkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGguc2luKHJhZCksIGMgPSBNYXRoLmNvcyhyYWQpO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9IGM7XG4gICAgICAgIG1bMV0gPSBzO1xuICAgICAgICBtWzJdID0gMDtcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSAtcztcbiAgICAgICAgbVs1XSA9IGM7XG4gICAgICAgIG1bNl0gPSAwO1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9IDA7XG4gICAgICAgIG1bOV0gPSAwO1xuICAgICAgICBtWzEwXSA9IDE7XG4gICAgICAgIG1bMTFdID0gMDtcbiAgICAgICAgbVsxMl0gPSAwO1xuICAgICAgICBtWzEzXSA9IDA7XG4gICAgICAgIG1bMTRdID0gMDtcbiAgICAgICAgbVsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5peL6L2s5ZKM5L2N56e75L+h5oGv6K6h566X55+p6Zi1XG4gICAgICogISNlbiBUaGUgcm90YXRpb24gYW5kIGRpc3BsYWNlbWVudCBpbmZvcm1hdGlvbiBjYWxjdWxhdGluZyBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIGZyb21SVFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVJUPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUlQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBPdXQsIHE6IFF1YXQsIHY6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcbiAgICAgICAgY29uc3QgeDIgPSB4ICsgeDtcbiAgICAgICAgY29uc3QgeTIgPSB5ICsgeTtcbiAgICAgICAgY29uc3QgejIgPSB6ICsgejtcblxuICAgICAgICBjb25zdCB4eCA9IHggKiB4MjtcbiAgICAgICAgY29uc3QgeHkgPSB4ICogeTI7XG4gICAgICAgIGNvbnN0IHh6ID0geCAqIHoyO1xuICAgICAgICBjb25zdCB5eSA9IHkgKiB5MjtcbiAgICAgICAgY29uc3QgeXogPSB5ICogejI7XG4gICAgICAgIGNvbnN0IHp6ID0geiAqIHoyO1xuICAgICAgICBjb25zdCB3eCA9IHcgKiB4MjtcbiAgICAgICAgY29uc3Qgd3kgPSB3ICogeTI7XG4gICAgICAgIGNvbnN0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSAxIC0gKHl5ICsgenopO1xuICAgICAgICBtWzFdID0geHkgKyB3ejtcbiAgICAgICAgbVsyXSA9IHh6IC0gd3k7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0geHkgLSB3ejtcbiAgICAgICAgbVs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgICAgIG1bNl0gPSB5eiArIHd4O1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9IHh6ICsgd3k7XG4gICAgICAgIG1bOV0gPSB5eiAtIHd4O1xuICAgICAgICBtWzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gICAgICAgIG1bMTFdID0gMDtcbiAgICAgICAgbVsxMl0gPSB2Lng7XG4gICAgICAgIG1bMTNdID0gdi55O1xuICAgICAgICBtWzE0XSA9IHYuejtcbiAgICAgICAgbVsxNV0gPSAxO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmj5Dlj5bnn6npmLXnmoTkvY3np7vkv6Hmga8sIOm7mOiupOefqemYteS4reeahOWPmOaNouS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqICEjZW4gRXh0cmFjdGluZyBkaXNwbGFjZW1lbnQgaW5mb3JtYXRpb24gb2YgdGhlIG1hdHJpeCwgdGhlIG1hdHJpeCB0cmFuc2Zvcm0gdG8gdGhlIGRlZmF1bHQgc2VxdWVudGlhbCBhcHBsaWNhdGlvbiBTLT4gUi0+IFQgaXNcbiAgICAgKiBAbWV0aG9kIGdldFRyYW5zbGF0aW9uXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRUcmFuc2xhdGlvbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IFZlY0xpa2UsIG1hdDogT3V0KTogVmVjTGlrZVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0VHJhbnNsYXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCkge1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBvdXQueCA9IG1bMTJdO1xuICAgICAgICBvdXQueSA9IG1bMTNdO1xuICAgICAgICBvdXQueiA9IG1bMTRdO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmj5Dlj5bnn6npmLXnmoTnvKnmlL7kv6Hmga8sIOm7mOiupOefqemYteS4reeahOWPmOaNouS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqICEjZW4gU2NhbGluZyBpbmZvcm1hdGlvbiBleHRyYWN0aW9uIG1hdHJpeCwgdGhlIG1hdHJpeCB0cmFuc2Zvcm0gdG8gdGhlIGRlZmF1bHQgc2VxdWVudGlhbCBhcHBsaWNhdGlvbiBTLT4gUi0+IFQgaXNcbiAgICAgKiBAbWV0aG9kIGdldFNjYWxpbmdcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldFNjYWxpbmc8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCk6IFZlY0xpa2VcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldFNjYWxpbmc8T3V0IGV4dGVuZHMgSU1hdDRMaWtlLCBWZWNMaWtlIGV4dGVuZHMgSVZlYzNMaWtlPiAob3V0OiBWZWNMaWtlLCBtYXQ6IE91dCkge1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBsZXQgbTMgPSBtM18xLm07XG4gICAgICAgIGNvbnN0IG0wMCA9IG0zWzBdID0gbVswXTtcbiAgICAgICAgY29uc3QgbTAxID0gbTNbMV0gPSBtWzFdO1xuICAgICAgICBjb25zdCBtMDIgPSBtM1syXSA9IG1bMl07XG4gICAgICAgIGNvbnN0IG0wNCA9IG0zWzNdID0gbVs0XTtcbiAgICAgICAgY29uc3QgbTA1ID0gbTNbNF0gPSBtWzVdO1xuICAgICAgICBjb25zdCBtMDYgPSBtM1s1XSA9IG1bNl07XG4gICAgICAgIGNvbnN0IG0wOCA9IG0zWzZdID0gbVs4XTtcbiAgICAgICAgY29uc3QgbTA5ID0gbTNbN10gPSBtWzldO1xuICAgICAgICBjb25zdCBtMTAgPSBtM1s4XSA9IG1bMTBdO1xuICAgICAgICBvdXQueCA9IE1hdGguc3FydChtMDAgKiBtMDAgKyBtMDEgKiBtMDEgKyBtMDIgKiBtMDIpO1xuICAgICAgICBvdXQueSA9IE1hdGguc3FydChtMDQgKiBtMDQgKyBtMDUgKiBtMDUgKyBtMDYgKiBtMDYpO1xuICAgICAgICBvdXQueiA9IE1hdGguc3FydChtMDggKiBtMDggKyBtMDkgKiBtMDkgKyBtMTAgKiBtMTApO1xuICAgICAgICAvLyBhY2NvdW50IGZvciByZWZlY3Rpb25zXG4gICAgICAgIGlmIChNYXQzLmRldGVybWluYW50KG0zXzEpIDwgMCkgeyBvdXQueCAqPSAtMTsgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o+Q5Y+W55+p6Zi155qE5peL6L2s5L+h5oGvLCDpu5jorqTovpPlhaXnn6npmLXkuI3lkKvmnInnvKnmlL7kv6Hmga/vvIzlpoLogIPomZHnvKnmlL7lupTkvb/nlKggYHRvUlRTYCDlh73mlbDjgIJcbiAgICAgKiAhI2VuIFJvdGF0aW9uIGluZm9ybWF0aW9uIGV4dHJhY3Rpb24gbWF0cml4LCB0aGUgbWF0cml4IGNvbnRhaW5pbmcgbm8gZGVmYXVsdCBpbnB1dCBzY2FsaW5nIGluZm9ybWF0aW9uLCBzdWNoIGFzIHRoZSB1c2Ugb2YgYHRvUlRTYCBzaG91bGQgY29uc2lkZXIgdGhlIHNjYWxpbmcgZnVuY3Rpb24uXG4gICAgICogQG1ldGhvZCBnZXRSb3RhdGlvblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Um90YXRpb248T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBRdWF0LCBtYXQ6IE91dCk6IFF1YXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldFJvdGF0aW9uPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogUXVhdCwgbWF0OiBPdXQpIHtcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcbiAgICAgICAgY29uc3QgdHJhY2UgPSBtWzBdICsgbVs1XSArIG1bMTBdO1xuICAgICAgICBsZXQgUyA9IDA7XG5cbiAgICAgICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgICAgICAgICAgb3V0LncgPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dC54ID0gKG1bNl0gLSBtWzldKSAvIFM7XG4gICAgICAgICAgICBvdXQueSA9IChtWzhdIC0gbVsyXSkgLyBTO1xuICAgICAgICAgICAgb3V0LnogPSAobVsxXSAtIG1bNF0pIC8gUztcbiAgICAgICAgfSBlbHNlIGlmICgobVswXSA+IG1bNV0pICYmIChtWzBdID4gbVsxMF0pKSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1bMF0gLSBtWzVdIC0gbVsxMF0pICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKG1bNl0gLSBtWzldKSAvIFM7XG4gICAgICAgICAgICBvdXQueCA9IDAuMjUgKiBTO1xuICAgICAgICAgICAgb3V0LnkgPSAobVsxXSArIG1bNF0pIC8gUztcbiAgICAgICAgICAgIG91dC56ID0gKG1bOF0gKyBtWzJdKSAvIFM7XG4gICAgICAgIH0gZWxzZSBpZiAobVs1XSA+IG1bMTBdKSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1bNV0gLSBtWzBdIC0gbVsxMF0pICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKG1bOF0gLSBtWzJdKSAvIFM7XG4gICAgICAgICAgICBvdXQueCA9IChtWzFdICsgbVs0XSkgLyBTO1xuICAgICAgICAgICAgb3V0LnkgPSAwLjI1ICogUztcbiAgICAgICAgICAgIG91dC56ID0gKG1bNl0gKyBtWzldKSAvIFM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIG1bMTBdIC0gbVswXSAtIG1bNV0pICogMjtcbiAgICAgICAgICAgIG91dC53ID0gKG1bMV0gLSBtWzRdKSAvIFM7XG4gICAgICAgICAgICBvdXQueCA9IChtWzhdICsgbVsyXSkgLyBTO1xuICAgICAgICAgICAgb3V0LnkgPSAobVs2XSArIG1bOV0pIC8gUztcbiAgICAgICAgICAgIG91dC56ID0gMC4yNSAqIFM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o+Q5Y+W5peL6L2s44CB5L2N56e744CB57yp5pS+5L+h5oGv77yMIOm7mOiupOefqemYteS4reeahOWPmOaNouS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqICEjZW4gRXh0cmFjdGluZyByb3RhdGlvbmFsIGRpc3BsYWNlbWVudCwgem9vbSBpbmZvcm1hdGlvbiwgdGhlIGRlZmF1bHQgbWF0cml4IHRyYW5zZm9ybWF0aW9uIGluIG9yZGVyIFMtPiBSLT4gVCBhcHBsaWNhdGlvbnNcbiAgICAgKiBAbWV0aG9kIHRvUlRTXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b1JUUzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChtYXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSk6IHZvaWRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvUlRTPE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG1hdDogT3V0LCBxOiBRdWF0LCB2OiBWZWNMaWtlLCBzOiBWZWNMaWtlKSB7XG4gICAgICAgIGxldCBtID0gbWF0Lm07XG4gICAgICAgIGxldCBtMyA9IG0zXzEubTtcbiAgICAgICAgcy54ID0gVmVjMy5zZXQodjNfMSwgbVswXSwgbVsxXSwgbVsyXSkubWFnKCk7XG4gICAgICAgIG0zWzBdID0gbVswXSAvIHMueDtcbiAgICAgICAgbTNbMV0gPSBtWzFdIC8gcy54O1xuICAgICAgICBtM1syXSA9IG1bMl0gLyBzLng7XG4gICAgICAgIHMueSA9IFZlYzMuc2V0KHYzXzEsIG1bNF0sIG1bNV0sIG1bNl0pLm1hZygpO1xuICAgICAgICBtM1szXSA9IG1bNF0gLyBzLnk7XG4gICAgICAgIG0zWzRdID0gbVs1XSAvIHMueTtcbiAgICAgICAgbTNbNV0gPSBtWzZdIC8gcy55O1xuICAgICAgICBzLnogPSBWZWMzLnNldCh2M18xLCBtWzhdLCBtWzldLCBtWzEwXSkubWFnKCk7XG4gICAgICAgIG0zWzZdID0gbVs4XSAvIHMuejtcbiAgICAgICAgbTNbN10gPSBtWzldIC8gcy56O1xuICAgICAgICBtM1s4XSA9IG1bMTBdIC8gcy56O1xuICAgICAgICBjb25zdCBkZXQgPSBNYXQzLmRldGVybWluYW50KG0zXzEpO1xuICAgICAgICBpZiAoZGV0IDwgMCkgeyBzLnggKj0gLTE7IG0zWzBdICo9IC0xOyBtM1sxXSAqPSAtMTsgbTNbMl0gKj0gLTE7IH1cbiAgICAgICAgUXVhdC5mcm9tTWF0MyhxLCBtM18xKTsgLy8gYWxyZWFkeSBub3JtYWxpemVkXG4gICAgICAgIFZlYzMuc2V0KHYsIG1bMTJdLCBtWzEzXSwgbVsxNF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5peL6L2s44CB5L2N56e744CB57yp5pS+5L+h5oGv6K6h566X55+p6Zi177yM5LulIFMtPlItPlQg55qE6aG65bqP5bqU55SoXG4gICAgICogISNlbiBUaGUgcm90YXJ5IGRpc3BsYWNlbWVudCwgdGhlIHNjYWxpbmcgbWF0cml4IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9uLCB0aGUgb3JkZXIgUy0+IFItPiBUIGFwcGxpY2F0aW9uc1xuICAgICAqIEBtZXRob2QgZnJvbVJUU1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVJUUzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJUUzxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gcS54LCB5ID0gcS55LCB6ID0gcS56LCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG4gICAgICAgIGNvbnN0IHN4ID0gcy54O1xuICAgICAgICBjb25zdCBzeSA9IHMueTtcbiAgICAgICAgY29uc3Qgc3ogPSBzLno7XG5cbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgICAgICBtWzFdID0gKHh5ICsgd3opICogc3g7XG4gICAgICAgIG1bMl0gPSAoeHogLSB3eSkgKiBzeDtcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSAoeHkgLSB3eikgKiBzeTtcbiAgICAgICAgbVs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICAgICAgICBtWzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgICAgIG1bN10gPSAwO1xuICAgICAgICBtWzhdID0gKHh6ICsgd3kpICogc3o7XG4gICAgICAgIG1bOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICAgICAgbVsxMF0gPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgICAgICAgbVsxMV0gPSAwO1xuICAgICAgICBtWzEyXSA9IHYueDtcbiAgICAgICAgbVsxM10gPSB2Lnk7XG4gICAgICAgIG1bMTRdID0gdi56O1xuICAgICAgICBtWzE1XSA9IDE7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruaMh+WumueahOaXi+i9rOOAgeS9jeenu+OAgee8qeaUvuWPiuWPmOaNouS4reW/g+S/oeaBr+iuoeeul+efqemYte+8jOS7pSBTLT5SLT5UIOeahOmhuuW6j+W6lOeUqFxuICAgICAqICEjZW4gQWNjb3JkaW5nIHRvIHRoZSBzcGVjaWZpZWQgcm90YXRpb24sIGRpc3BsYWNlbWVudCwgYW5kIHNjYWxlIGNvbnZlcnNpb24gbWF0cml4IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9uIGNlbnRlciwgb3JkZXIgUy0+IFItPiBUIGFwcGxpY2F0aW9uc1xuICAgICAqIEBtZXRob2QgZnJvbVJUU09yaWdpblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJvbVJUU09yaWdpbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSwgbzogVmVjTGlrZSk6IE91dFxuICAgICAqIEBwYXJhbSBxIOaXi+i9rOWAvFxuICAgICAqIEBwYXJhbSB2IOS9jeenu+WAvFxuICAgICAqIEBwYXJhbSBzIOe8qeaUvuWAvFxuICAgICAqIEBwYXJhbSBvIOaMh+WumuWPmOaNouS4reW/g1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJUU09yaWdpbjxPdXQgZXh0ZW5kcyBJTWF0NExpa2UsIFZlY0xpa2UgZXh0ZW5kcyBJVmVjM0xpa2U+IChvdXQ6IE91dCwgcTogUXVhdCwgdjogVmVjTGlrZSwgczogVmVjTGlrZSwgbzogVmVjTGlrZSkge1xuICAgICAgICBjb25zdCB4ID0gcS54LCB5ID0gcS55LCB6ID0gcS56LCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB4eSA9IHggKiB5MjtcbiAgICAgICAgY29uc3QgeHogPSB4ICogejI7XG4gICAgICAgIGNvbnN0IHl5ID0geSAqIHkyO1xuICAgICAgICBjb25zdCB5eiA9IHkgKiB6MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG5cbiAgICAgICAgY29uc3Qgc3ggPSBzLng7XG4gICAgICAgIGNvbnN0IHN5ID0gcy55O1xuICAgICAgICBjb25zdCBzeiA9IHMuejtcblxuICAgICAgICBjb25zdCBveCA9IG8ueDtcbiAgICAgICAgY29uc3Qgb3kgPSBvLnk7XG4gICAgICAgIGNvbnN0IG96ID0gby56O1xuXG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgICAgICAgbVsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICAgICAgICBtWzJdID0gKHh6IC0gd3kpICogc3g7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0gKHh5IC0gd3opICogc3k7XG4gICAgICAgIG1bNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICAgICAgbVs2XSA9ICh5eiArIHd4KSAqIHN5O1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICAgICAgICBtWzldID0gKHl6IC0gd3gpICogc3o7XG4gICAgICAgIG1bMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgICAgIG1bMTFdID0gMDtcbiAgICAgICAgbVsxMl0gPSB2LnggKyBveCAtIChtWzBdICogb3ggKyBtWzRdICogb3kgKyBtWzhdICogb3opO1xuICAgICAgICBtWzEzXSA9IHYueSArIG95IC0gKG1bMV0gKiBveCArIG1bNV0gKiBveSArIG1bOV0gKiBveik7XG4gICAgICAgIG1bMTRdID0gdi56ICsgb3ogLSAobVsyXSAqIG94ICsgbVs2XSAqIG95ICsgbVsxMF0gKiBveik7XG4gICAgICAgIG1bMTVdID0gMTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u5oyH5a6a55qE5peL6L2s5L+h5oGv6K6h566X55+p6Zi1XG4gICAgICogISNlbiBUaGUgcm90YXRpb24gbWF0cml4IGNhbGN1bGF0aW9uIGluZm9ybWF0aW9uIHNwZWNpZmllZFxuICAgICAqIEBtZXRob2QgZnJvbVF1YXRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21RdWF0PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBxOiBRdWF0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUXVhdDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgcTogUXVhdCkge1xuICAgICAgICBjb25zdCB4ID0gcS54LCB5ID0gcS55LCB6ID0gcS56LCB3ID0gcS53O1xuICAgICAgICBjb25zdCB4MiA9IHggKyB4O1xuICAgICAgICBjb25zdCB5MiA9IHkgKyB5O1xuICAgICAgICBjb25zdCB6MiA9IHogKyB6O1xuXG4gICAgICAgIGNvbnN0IHh4ID0geCAqIHgyO1xuICAgICAgICBjb25zdCB5eCA9IHkgKiB4MjtcbiAgICAgICAgY29uc3QgeXkgPSB5ICogeTI7XG4gICAgICAgIGNvbnN0IHp4ID0geiAqIHgyO1xuICAgICAgICBjb25zdCB6eSA9IHogKiB5MjtcbiAgICAgICAgY29uc3QgenogPSB6ICogejI7XG4gICAgICAgIGNvbnN0IHd4ID0gdyAqIHgyO1xuICAgICAgICBjb25zdCB3eSA9IHcgKiB5MjtcbiAgICAgICAgY29uc3Qgd3ogPSB3ICogejI7XG5cbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9IDEgLSB5eSAtIHp6O1xuICAgICAgICBtWzFdID0geXggKyB3ejtcbiAgICAgICAgbVsyXSA9IHp4IC0gd3k7XG4gICAgICAgIG1bM10gPSAwO1xuXG4gICAgICAgIG1bNF0gPSB5eCAtIHd6O1xuICAgICAgICBtWzVdID0gMSAtIHh4IC0geno7XG4gICAgICAgIG1bNl0gPSB6eSArIHd4O1xuICAgICAgICBtWzddID0gMDtcblxuICAgICAgICBtWzhdID0genggKyB3eTtcbiAgICAgICAgbVs5XSA9IHp5IC0gd3g7XG4gICAgICAgIG1bMTBdID0gMSAtIHh4IC0geXk7XG4gICAgICAgIG1bMTFdID0gMDtcblxuICAgICAgICBtWzEyXSA9IDA7XG4gICAgICAgIG1bMTNdID0gMDtcbiAgICAgICAgbVsxNF0gPSAwO1xuICAgICAgICBtWzE1XSA9IDE7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOagueaNruaMh+WumueahOinhumUpeS9k+S/oeaBr+iuoeeul+efqemYtVxuICAgICAqICEjZW4gVGhlIG1hdHJpeCBjYWxjdWxhdGlvbiBpbmZvcm1hdGlvbiBzcGVjaWZpZWQgZnJ1c3R1bVxuICAgICAqIEBtZXRob2QgZnJ1c3R1bVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZnJ1c3R1bTxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgdG9wOiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gbGVmdCDlt6blubPpnaLot53nprtcbiAgICAgKiBAcGFyYW0gcmlnaHQg5Y+z5bmz6Z2i6Led56a7XG4gICAgICogQHBhcmFtIGJvdHRvbSDkuIvlubPpnaLot53nprtcbiAgICAgKiBAcGFyYW0gdG9wIOS4iuW5s+mdoui3neemu1xuICAgICAqIEBwYXJhbSBuZWFyIOi/keW5s+mdoui3neemu1xuICAgICAqIEBwYXJhbSBmYXIg6L+c5bmz6Z2i6Led56a7XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcnVzdHVtPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB0b3A6IG51bWJlciwgbmVhcjogbnVtYmVyLCBmYXI6IG51bWJlcikge1xuICAgICAgICBjb25zdCBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KTtcbiAgICAgICAgY29uc3QgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XG4gICAgICAgIGNvbnN0IG5mID0gMSAvIChuZWFyIC0gZmFyKTtcblxuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBtWzBdID0gKG5lYXIgKiAyKSAqIHJsO1xuICAgICAgICBtWzFdID0gMDtcbiAgICAgICAgbVsyXSA9IDA7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0gMDtcbiAgICAgICAgbVs1XSA9IChuZWFyICogMikgKiB0YjtcbiAgICAgICAgbVs2XSA9IDA7XG4gICAgICAgIG1bN10gPSAwO1xuICAgICAgICBtWzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgICAgICAgbVs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgICAgIG1bMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgICAgIG1bMTFdID0gLTE7XG4gICAgICAgIG1bMTJdID0gMDtcbiAgICAgICAgbVsxM10gPSAwO1xuICAgICAgICBtWzE0XSA9IChmYXIgKiBuZWFyICogMikgKiBuZjtcbiAgICAgICAgbVsxNV0gPSAwO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6K6h566X6YCP6KeG5oqV5b2x55+p6Zi1XG4gICAgICogISNlbiBQZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCBjYWxjdWxhdGlvblxuICAgICAqIEBtZXRob2QgcGVyc3BlY3RpdmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHBlcnNwZWN0aXZlPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBmb3Z5OiBudW1iZXIsIGFzcGVjdDogbnVtYmVyLCBuZWFyOiBudW1iZXIsIGZhcjogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIGZvdnkg57q15ZCR6KeG6KeS6auY5bqmXG4gICAgICogQHBhcmFtIGFzcGVjdCDplb/lrr3mr5RcbiAgICAgKiBAcGFyYW0gbmVhciDov5HlubPpnaLot53nprtcbiAgICAgKiBAcGFyYW0gZmFyIOi/nOW5s+mdoui3neemu1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcGVyc3BlY3RpdmU8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGZvdnk6IG51bWJlciwgYXNwZWN0OiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKTtcbiAgICAgICAgY29uc3QgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuXG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSBmIC8gYXNwZWN0O1xuICAgICAgICBtWzFdID0gMDtcbiAgICAgICAgbVsyXSA9IDA7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0gMDtcbiAgICAgICAgbVs1XSA9IGY7XG4gICAgICAgIG1bNl0gPSAwO1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9IDA7XG4gICAgICAgIG1bOV0gPSAwO1xuICAgICAgICBtWzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgICAgICBtWzExXSA9IC0xO1xuICAgICAgICBtWzEyXSA9IDA7XG4gICAgICAgIG1bMTNdID0gMDtcbiAgICAgICAgbVsxNF0gPSAoMiAqIGZhciAqIG5lYXIpICogbmY7XG4gICAgICAgIG1bMTVdID0gMDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiuoeeul+ato+S6pOaKleW9seefqemYtVxuICAgICAqICEjZW4gQ29tcHV0aW5nIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIG9ydGhvXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvcnRobzxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgdG9wOiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gbGVmdCDlt6blubPpnaLot53nprtcbiAgICAgKiBAcGFyYW0gcmlnaHQg5Y+z5bmz6Z2i6Led56a7XG4gICAgICogQHBhcmFtIGJvdHRvbSDkuIvlubPpnaLot53nprtcbiAgICAgKiBAcGFyYW0gdG9wIOS4iuW5s+mdoui3neemu1xuICAgICAqIEBwYXJhbSBuZWFyIOi/keW5s+mdoui3neemu1xuICAgICAqIEBwYXJhbSBmYXIg6L+c5bmz6Z2i6Led56a7XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBvcnRobzxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgdG9wOiBudW1iZXIsIG5lYXI6IG51bWJlciwgZmFyOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgbHIgPSAxIC8gKGxlZnQgLSByaWdodCk7XG4gICAgICAgIGNvbnN0IGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICAgICAgICBjb25zdCBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIG1bMF0gPSAtMiAqIGxyO1xuICAgICAgICBtWzFdID0gMDtcbiAgICAgICAgbVsyXSA9IDA7XG4gICAgICAgIG1bM10gPSAwO1xuICAgICAgICBtWzRdID0gMDtcbiAgICAgICAgbVs1XSA9IC0yICogYnQ7XG4gICAgICAgIG1bNl0gPSAwO1xuICAgICAgICBtWzddID0gMDtcbiAgICAgICAgbVs4XSA9IDA7XG4gICAgICAgIG1bOV0gPSAwO1xuICAgICAgICBtWzEwXSA9IDIgKiBuZjtcbiAgICAgICAgbVsxMV0gPSAwO1xuICAgICAgICBtWzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgICAgIG1bMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICAgICAgbVsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICAgICAgbVsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5qC55o2u6KeG54K56K6h566X55+p6Zi177yM5rOo5oSPIGBleWUgLSBjZW50ZXJgIOS4jeiDveS4uumbtuWQkemHj+aIluS4jiBgdXBgIOWQkemHj+W5s+ihjFxuICAgICAqICEjZW4gYFVwYCBwYXJhbGxlbCB2ZWN0b3Igb3IgdmVjdG9yIGNlbnRlcmAgbm90IGJlIHplcm8gLSB0aGUgbWF0cml4IGNhbGN1bGF0aW9uIGFjY29yZGluZyB0byB0aGUgdmlld3BvaW50LCBub3RlYCBleWVcbiAgICAgKiBAbWV0aG9kIGxvb2tBdFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbG9va0F0PE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBleWU6IFZlY0xpa2UsIGNlbnRlcjogVmVjTGlrZSwgdXA6IFZlY0xpa2UpOiBPdXRcbiAgICAgKiBAcGFyYW0gZXllIOW9k+WJjeS9jee9rlxuICAgICAqIEBwYXJhbSBjZW50ZXIg55uu5qCH6KeG54K5XG4gICAgICogQHBhcmFtIHVwIOinhuWPo+S4iuaWueWQkVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9va0F0PE91dCBleHRlbmRzIElNYXQ0TGlrZSwgVmVjTGlrZSBleHRlbmRzIElWZWMzTGlrZT4gKG91dDogT3V0LCBleWU6IFZlY0xpa2UsIGNlbnRlcjogVmVjTGlrZSwgdXA6IFZlY0xpa2UpIHtcbiAgICAgICAgY29uc3QgZXlleCA9IGV5ZS54O1xuICAgICAgICBjb25zdCBleWV5ID0gZXllLnk7XG4gICAgICAgIGNvbnN0IGV5ZXogPSBleWUuejtcbiAgICAgICAgY29uc3QgdXB4ID0gdXAueDtcbiAgICAgICAgY29uc3QgdXB5ID0gdXAueTtcbiAgICAgICAgY29uc3QgdXB6ID0gdXAuejtcbiAgICAgICAgY29uc3QgY2VudGVyeCA9IGNlbnRlci54O1xuICAgICAgICBjb25zdCBjZW50ZXJ5ID0gY2VudGVyLnk7XG4gICAgICAgIGNvbnN0IGNlbnRlcnogPSBjZW50ZXIuejtcblxuICAgICAgICBsZXQgejAgPSBleWV4IC0gY2VudGVyeDtcbiAgICAgICAgbGV0IHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgICAgIGxldCB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuXG4gICAgICAgIGxldCBsZW4gPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XG4gICAgICAgIHowICo9IGxlbjtcbiAgICAgICAgejEgKj0gbGVuO1xuICAgICAgICB6MiAqPSBsZW47XG5cbiAgICAgICAgbGV0IHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICAgICAgbGV0IHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICAgICAgbGV0IHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgICAgICAgbGVuID0gMSAvIE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgICAgICB4MCAqPSBsZW47XG4gICAgICAgIHgxICo9IGxlbjtcbiAgICAgICAgeDIgKj0gbGVuO1xuXG4gICAgICAgIGNvbnN0IHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgICAgIGNvbnN0IHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgICAgIGNvbnN0IHkyID0gejAgKiB4MSAtIHoxICogeDA7XG5cbiAgICAgICAgbGV0IG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9IHgwO1xuICAgICAgICBtWzFdID0geTA7XG4gICAgICAgIG1bMl0gPSB6MDtcbiAgICAgICAgbVszXSA9IDA7XG4gICAgICAgIG1bNF0gPSB4MTtcbiAgICAgICAgbVs1XSA9IHkxO1xuICAgICAgICBtWzZdID0gejE7XG4gICAgICAgIG1bN10gPSAwO1xuICAgICAgICBtWzhdID0geDI7XG4gICAgICAgIG1bOV0gPSB5MjtcbiAgICAgICAgbVsxMF0gPSB6MjtcbiAgICAgICAgbVsxMV0gPSAwO1xuICAgICAgICBtWzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgICAgICAgbVsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gICAgICAgIG1bMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgICAgICBtWzE1XSA9IDE7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOiuoeeul+mAhui9rOe9ruefqemYtVxuICAgICAqICEjZW4gUmV2ZXJzYWwgbWF0cml4IGNhbGN1bGF0aW9uXG4gICAgICogQG1ldGhvZCBpbnZlcnNlVHJhbnNwb3NlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnZlcnNlVHJhbnNwb3NlPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGludmVyc2VUcmFuc3Bvc2U8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuXG4gICAgICAgIGxldCBtID0gYS5tO1xuICAgICAgICBfYTAwID0gbVswXTsgX2EwMSA9IG1bMV07IF9hMDIgPSBtWzJdOyBfYTAzID0gbVszXTtcbiAgICAgICAgX2ExMCA9IG1bNF07IF9hMTEgPSBtWzVdOyBfYTEyID0gbVs2XTsgX2ExMyA9IG1bN107XG4gICAgICAgIF9hMjAgPSBtWzhdOyBfYTIxID0gbVs5XTsgX2EyMiA9IG1bMTBdOyBfYTIzID0gbVsxMV07XG4gICAgICAgIF9hMzAgPSBtWzEyXTsgX2EzMSA9IG1bMTNdOyBfYTMyID0gbVsxNF07IF9hMzMgPSBtWzE1XTtcblxuICAgICAgICBjb25zdCBiMDAgPSBfYTAwICogX2ExMSAtIF9hMDEgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDEgPSBfYTAwICogX2ExMiAtIF9hMDIgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDIgPSBfYTAwICogX2ExMyAtIF9hMDMgKiBfYTEwO1xuICAgICAgICBjb25zdCBiMDMgPSBfYTAxICogX2ExMiAtIF9hMDIgKiBfYTExO1xuICAgICAgICBjb25zdCBiMDQgPSBfYTAxICogX2ExMyAtIF9hMDMgKiBfYTExO1xuICAgICAgICBjb25zdCBiMDUgPSBfYTAyICogX2ExMyAtIF9hMDMgKiBfYTEyO1xuICAgICAgICBjb25zdCBiMDYgPSBfYTIwICogX2EzMSAtIF9hMjEgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDcgPSBfYTIwICogX2EzMiAtIF9hMjIgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDggPSBfYTIwICogX2EzMyAtIF9hMjMgKiBfYTMwO1xuICAgICAgICBjb25zdCBiMDkgPSBfYTIxICogX2EzMiAtIF9hMjIgKiBfYTMxO1xuICAgICAgICBjb25zdCBiMTAgPSBfYTIxICogX2EzMyAtIF9hMjMgKiBfYTMxO1xuICAgICAgICBjb25zdCBiMTEgPSBfYTIyICogX2EzMyAtIF9hMjMgKiBfYTMyO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgICAgICBpZiAoIWRldCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgICAgIG0gPSBvdXQubTtcbiAgICAgICAgbVswXSA9IChfYTExICogYjExIC0gX2ExMiAqIGIxMCArIF9hMTMgKiBiMDkpICogZGV0O1xuICAgICAgICBtWzFdID0gKF9hMTIgKiBiMDggLSBfYTEwICogYjExIC0gX2ExMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIG1bMl0gPSAoX2ExMCAqIGIxMCAtIF9hMTEgKiBiMDggKyBfYTEzICogYjA2KSAqIGRldDtcbiAgICAgICAgbVszXSA9IDA7XG5cbiAgICAgICAgbVs0XSA9IChfYTAyICogYjEwIC0gX2EwMSAqIGIxMSAtIF9hMDMgKiBiMDkpICogZGV0O1xuICAgICAgICBtWzVdID0gKF9hMDAgKiBiMTEgLSBfYTAyICogYjA4ICsgX2EwMyAqIGIwNykgKiBkZXQ7XG4gICAgICAgIG1bNl0gPSAoX2EwMSAqIGIwOCAtIF9hMDAgKiBiMTAgLSBfYTAzICogYjA2KSAqIGRldDtcbiAgICAgICAgbVs3XSA9IDA7XG5cbiAgICAgICAgbVs4XSA9IChfYTMxICogYjA1IC0gX2EzMiAqIGIwNCArIF9hMzMgKiBiMDMpICogZGV0O1xuICAgICAgICBtWzldID0gKF9hMzIgKiBiMDIgLSBfYTMwICogYjA1IC0gX2EzMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIG1bMTBdID0gKF9hMzAgKiBiMDQgLSBfYTMxICogYjAyICsgX2EzMyAqIGIwMCkgKiBkZXQ7XG4gICAgICAgIG1bMTFdID0gMDtcblxuICAgICAgICBtWzEyXSA9IDA7XG4gICAgICAgIG1bMTNdID0gMDtcbiAgICAgICAgbVsxNF0gPSAwO1xuICAgICAgICBtWzE1XSA9IDE7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOefqemYteWKoOazlVxuICAgICAqICEjZW4gRWxlbWVudCBieSBlbGVtZW50IG1hdHJpeCBhZGRpdGlvblxuICAgICAqIEBtZXRob2QgYWRkXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBhZGQ8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIGxldCBtID0gb3V0Lm0sIGFtID0gYS5tLCBibSA9IGIubTtcbiAgICAgICAgbVswXSA9IGFtWzBdICsgYm1bMF07XG4gICAgICAgIG1bMV0gPSBhbVsxXSArIGJtWzFdO1xuICAgICAgICBtWzJdID0gYW1bMl0gKyBibVsyXTtcbiAgICAgICAgbVszXSA9IGFtWzNdICsgYm1bM107XG4gICAgICAgIG1bNF0gPSBhbVs0XSArIGJtWzRdO1xuICAgICAgICBtWzVdID0gYW1bNV0gKyBibVs1XTtcbiAgICAgICAgbVs2XSA9IGFtWzZdICsgYm1bNl07XG4gICAgICAgIG1bN10gPSBhbVs3XSArIGJtWzddO1xuICAgICAgICBtWzhdID0gYW1bOF0gKyBibVs4XTtcbiAgICAgICAgbVs5XSA9IGFtWzldICsgYm1bOV07XG4gICAgICAgIG1bMTBdID0gYW1bMTBdICsgYm1bMTBdO1xuICAgICAgICBtWzExXSA9IGFtWzExXSArIGJtWzExXTtcbiAgICAgICAgbVsxMl0gPSBhbVsxMl0gKyBibVsxMl07XG4gICAgICAgIG1bMTNdID0gYW1bMTNdICsgYm1bMTNdO1xuICAgICAgICBtWzE0XSA9IGFtWzE0XSArIGJtWzE0XTtcbiAgICAgICAgbVsxNV0gPSBhbVsxNV0gKyBibVsxNV07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDnn6npmLXlh4/ms5VcbiAgICAgKiAhI2VuIE1hdHJpeCBlbGVtZW50IGJ5IGVsZW1lbnQgc3VidHJhY3Rpb25cbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdWJ0cmFjdDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHN1YnRyYWN0PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubSwgYm0gPSBiLm07XG4gICAgICAgIG1bMF0gPSBhbVswXSAtIGJtWzBdO1xuICAgICAgICBtWzFdID0gYW1bMV0gLSBibVsxXTtcbiAgICAgICAgbVsyXSA9IGFtWzJdIC0gYm1bMl07XG4gICAgICAgIG1bM10gPSBhbVszXSAtIGJtWzNdO1xuICAgICAgICBtWzRdID0gYW1bNF0gLSBibVs0XTtcbiAgICAgICAgbVs1XSA9IGFtWzVdIC0gYm1bNV07XG4gICAgICAgIG1bNl0gPSBhbVs2XSAtIGJtWzZdO1xuICAgICAgICBtWzddID0gYW1bN10gLSBibVs3XTtcbiAgICAgICAgbVs4XSA9IGFtWzhdIC0gYm1bOF07XG4gICAgICAgIG1bOV0gPSBhbVs5XSAtIGJtWzldO1xuICAgICAgICBtWzEwXSA9IGFtWzEwXSAtIGJtWzEwXTtcbiAgICAgICAgbVsxMV0gPSBhbVsxMV0gLSBibVsxMV07XG4gICAgICAgIG1bMTJdID0gYW1bMTJdIC0gYm1bMTJdO1xuICAgICAgICBtWzEzXSA9IGFtWzEzXSAtIGJtWzEzXTtcbiAgICAgICAgbVsxNF0gPSBhbVsxNF0gLSBibVsxNF07XG4gICAgICAgIG1bMTVdID0gYW1bMTVdIC0gYm1bMTVdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg55+p6Zi15qCH6YeP5LmY5rOVXG4gICAgICogISNlbiBNYXRyaXggc2NhbGFyIG11bHRpcGxpY2F0aW9uXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbXVsdGlwbHlTY2FsYXI8T3V0IGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogbnVtYmVyKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhcjxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IG0gPSBvdXQubSwgYW0gPSBhLm07XG4gICAgICAgIG1bMF0gPSBhbVswXSAqIGI7XG4gICAgICAgIG1bMV0gPSBhbVsxXSAqIGI7XG4gICAgICAgIG1bMl0gPSBhbVsyXSAqIGI7XG4gICAgICAgIG1bM10gPSBhbVszXSAqIGI7XG4gICAgICAgIG1bNF0gPSBhbVs0XSAqIGI7XG4gICAgICAgIG1bNV0gPSBhbVs1XSAqIGI7XG4gICAgICAgIG1bNl0gPSBhbVs2XSAqIGI7XG4gICAgICAgIG1bN10gPSBhbVs3XSAqIGI7XG4gICAgICAgIG1bOF0gPSBhbVs4XSAqIGI7XG4gICAgICAgIG1bOV0gPSBhbVs5XSAqIGI7XG4gICAgICAgIG1bMTBdID0gYW1bMTBdICogYjtcbiAgICAgICAgbVsxMV0gPSBhbVsxMV0gKiBiO1xuICAgICAgICBtWzEyXSA9IGFtWzEyXSAqIGI7XG4gICAgICAgIG1bMTNdID0gYW1bMTNdICogYjtcbiAgICAgICAgbVsxNF0gPSBhbVsxNF0gKiBiO1xuICAgICAgICBtWzE1XSA9IGFtWzE1XSAqIGI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDnn6npmLXmoIfph4/kuZjliqA6IEEgKyBCICogc2NhbGVcbiAgICAgKiAhI2VuIEVsZW1lbnRzIG9mIHRoZSBtYXRyaXggYnkgdGhlIHNjYWxhciBtdWx0aXBsaWNhdGlvbiBhbmQgYWRkaXRpb246IEEgKyBCICogc2NhbGVcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyQW5kQWRkXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBtdWx0aXBseVNjYWxhckFuZEFkZDxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5U2NhbGFyQW5kQWRkPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCwgc2NhbGU6IG51bWJlcikge1xuICAgICAgICBsZXQgbSA9IG91dC5tLCBhbSA9IGEubSwgYm0gPSBiLm07XG4gICAgICAgIG1bMF0gPSBhbVswXSArIChibVswXSAqIHNjYWxlKTtcbiAgICAgICAgbVsxXSA9IGFtWzFdICsgKGJtWzFdICogc2NhbGUpO1xuICAgICAgICBtWzJdID0gYW1bMl0gKyAoYm1bMl0gKiBzY2FsZSk7XG4gICAgICAgIG1bM10gPSBhbVszXSArIChibVszXSAqIHNjYWxlKTtcbiAgICAgICAgbVs0XSA9IGFtWzRdICsgKGJtWzRdICogc2NhbGUpO1xuICAgICAgICBtWzVdID0gYW1bNV0gKyAoYm1bNV0gKiBzY2FsZSk7XG4gICAgICAgIG1bNl0gPSBhbVs2XSArIChibVs2XSAqIHNjYWxlKTtcbiAgICAgICAgbVs3XSA9IGFtWzddICsgKGJtWzddICogc2NhbGUpO1xuICAgICAgICBtWzhdID0gYW1bOF0gKyAoYm1bOF0gKiBzY2FsZSk7XG4gICAgICAgIG1bOV0gPSBhbVs5XSArIChibVs5XSAqIHNjYWxlKTtcbiAgICAgICAgbVsxMF0gPSBhbVsxMF0gKyAoYm1bMTBdICogc2NhbGUpO1xuICAgICAgICBtWzExXSA9IGFtWzExXSArIChibVsxMV0gKiBzY2FsZSk7XG4gICAgICAgIG1bMTJdID0gYW1bMTJdICsgKGJtWzEyXSAqIHNjYWxlKTtcbiAgICAgICAgbVsxM10gPSBhbVsxM10gKyAoYm1bMTNdICogc2NhbGUpO1xuICAgICAgICBtWzE0XSA9IGFtWzE0XSArIChibVsxNF0gKiBzY2FsZSk7XG4gICAgICAgIG1bMTVdID0gYW1bMTVdICsgKGJtWzE1XSAqIHNjYWxlKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOefqemYteetieS7t+WIpOaWrVxuICAgICAqICEjZW4gQW5hbHl6aW5nIHRoZSBlcXVpdmFsZW50IG1hdHJpeFxuICAgICAqIEBtZXRob2Qgc3RyaWN0RXF1YWxzXG4gICAgICogQHJldHVybiB7Ym9vbH1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChhOiBPdXQsIGI6IE91dCk6IGJvb2xlYW5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHN0cmljdEVxdWFsczxPdXQgZXh0ZW5kcyBJTWF0NExpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tO1xuICAgICAgICByZXR1cm4gYW1bMF0gPT09IGJtWzBdICYmIGFtWzFdID09PSBibVsxXSAmJiBhbVsyXSA9PT0gYm1bMl0gJiYgYW1bM10gPT09IGJtWzNdICYmXG4gICAgICAgICAgICBhbVs0XSA9PT0gYm1bNF0gJiYgYW1bNV0gPT09IGJtWzVdICYmIGFtWzZdID09PSBibVs2XSAmJiBhbVs3XSA9PT0gYm1bN10gJiZcbiAgICAgICAgICAgIGFtWzhdID09PSBibVs4XSAmJiBhbVs5XSA9PT0gYm1bOV0gJiYgYW1bMTBdID09PSBibVsxMF0gJiYgYW1bMTFdID09PSBibVsxMV0gJiZcbiAgICAgICAgICAgIGFtWzEyXSA9PT0gYm1bMTJdICYmIGFtWzEzXSA9PT0gYm1bMTNdICYmIGFtWzE0XSA9PT0gYm1bMTRdICYmIGFtWzE1XSA9PT0gYm1bMTVdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE55+p6Zi16L+R5Ly8562J5Lu35Yik5patXG4gICAgICogISNlbiBOZWdhdGl2ZSBmbG9hdGluZyBwb2ludCBlcnJvciBpcyBhcHByb3hpbWF0ZWx5IGVxdWl2YWxlbnQgdG8gZGV0ZXJtaW5pbmcgYSBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZXF1YWxzPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uPzogbnVtYmVyKTogYm9vbGVhblxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZXF1YWxzPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKGE6IE91dCwgYjogT3V0LCBlcHNpbG9uID0gRVBTSUxPTikge1xuXG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm07XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBNYXRoLmFicyhhbVswXSAtIGJtWzBdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVswXSksIE1hdGguYWJzKGJtWzBdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzFdIC0gYm1bMV0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzFdKSwgTWF0aC5hYnMoYm1bMV0pKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bMl0gLSBibVsyXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMl0pLCBNYXRoLmFicyhibVsyXSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhbVszXSAtIGJtWzNdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVszXSksIE1hdGguYWJzKGJtWzNdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzRdIC0gYm1bNF0pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzRdKSwgTWF0aC5hYnMoYm1bNF0pKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bNV0gLSBibVs1XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bNV0pLCBNYXRoLmFicyhibVs1XSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhbVs2XSAtIGJtWzZdKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVs2XSksIE1hdGguYWJzKGJtWzZdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzddIC0gYm1bN10pIDw9IGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGFtWzddKSwgTWF0aC5hYnMoYm1bN10pKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYW1bOF0gLSBibVs4XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bOF0pLCBNYXRoLmFicyhibVs4XSkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhbVs5XSAtIGJtWzldKSA8PSBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhbVs5XSksIE1hdGguYWJzKGJtWzldKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzEwXSAtIGJtWzEwXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTBdKSwgTWF0aC5hYnMoYm1bMTBdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzExXSAtIGJtWzExXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTFdKSwgTWF0aC5hYnMoYm1bMTFdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzEyXSAtIGJtWzEyXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTJdKSwgTWF0aC5hYnMoYm1bMTJdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzEzXSAtIGJtWzEzXSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTNdKSwgTWF0aC5hYnMoYm1bMTNdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzE0XSAtIGJtWzE0XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTRdKSwgTWF0aC5hYnMoYm1bMTRdKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGFtWzE1XSAtIGJtWzE1XSkgPD0gZXBzaWxvbiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYW1bMTVdKSwgTWF0aC5hYnMoYm1bMTVdKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge01hdDR9IGEgLSBNYXRyaXggdG8gY2FsY3VsYXRlLlxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXQuXG4gICAgICovXG4gICAgc3RhdGljIGFkam9pbnQgKG91dCwgYSkge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sIGEwMyA9IGFtWzNdLFxuICAgICAgICAgICAgYTEwID0gYW1bNF0sIGExMSA9IGFtWzVdLCBhMTIgPSBhbVs2XSwgYTEzID0gYW1bN10sXG4gICAgICAgICAgICBhMjAgPSBhbVs4XSwgYTIxID0gYW1bOV0sIGEyMiA9IGFtWzEwXSwgYTIzID0gYW1bMTFdLFxuICAgICAgICAgICAgYTMwID0gYW1bMTJdLCBhMzEgPSBhbVsxM10sIGEzMiA9IGFtWzE0XSwgYTMzID0gYW1bMTVdO1xuXG4gICAgICAgIG91dG1bMF0gPSAoYTExICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICAgICAgb3V0bVsxXSA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICAgICAgb3V0bVsyXSA9IChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgICAgICBvdXRtWzNdID0gLShhMDEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSAtIGExMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpICsgYTIxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgICAgICBvdXRtWzRdID0gLShhMTAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpICsgYTMwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikpO1xuICAgICAgICBvdXRtWzVdID0gKGEwMCAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSk7XG4gICAgICAgIG91dG1bNl0gPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgICAgIG91dG1bN10gPSAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICAgICAgb3V0bVs4XSA9IChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgICAgICBvdXRtWzldID0gLShhMDAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGEyMyAtIGEwMyAqIGEyMSkpO1xuICAgICAgICBvdXRtWzEwXSA9IChhMDAgKiAoYTExICogYTMzIC0gYTEzICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzMgLSBhMDMgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgICAgICBvdXRtWzExXSA9IC0oYTAwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkgLSBhMTAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSArIGEyMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICAgICAgb3V0bVsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgICAgIG91dG1bMTNdID0gKGEwMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMiAtIGEwMiAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIyIC0gYTAyICogYTIxKSk7XG4gICAgICAgIG91dG1bMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgICAgICBvdXRtWzE1XSA9IChhMDAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg55+p6Zi16L2s5pWw57uEXG4gICAgICogISNlbiBNYXRyaXggdHJhbnNwb3NlIGFycmF5XG4gICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCBtYXQ6IElNYXQ0TGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4TlhoXnmoTotbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXJyYXk8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgbWF0OiBJTWF0NExpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbb2ZzICsgaV0gPSBtW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmlbDnu4Tovaznn6npmLVcbiAgICAgKiAhI2VuIFRyYW5zZmVyIG1hdHJpeCBhcnJheVxuICAgICAqIEBtZXRob2QgZnJvbUFycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gb2ZzIOaVsOe7hOi1t+Wni+WBj+enu+mHj1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUFycmF5PE91dCBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnMgPSAwKSB7XG4gICAgICAgIGxldCBtID0gb3V0Lm07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7IGkrKykge1xuICAgICAgICAgICAgbVtpXSA9IGFycltvZnMgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWF0cml4IERhdGFcbiAgICAgKiAhI3poIOefqemYteaVsOaNrlxuICAgICAqIEBwcm9wZXJ0eSB7RmxvYXQ2NEFycmF5IHwgRmxvYXQzMkFycmF5fSBtXG4gICAgICovXG4gICAgbTogRmxvYXRBcnJheTtcblxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICogc2VlIHt7I2Nyb3NzTGluayBcImNjL21hdDQ6bWV0aG9kXCJ9fWNjLm1hdDR7ey9jcm9zc0xpbmt9fVxuICAgICAqICEjemhcbiAgICAgKiDmnoTpgKDlh73mlbDvvIzlj6/mn6XnnIsge3sjY3Jvc3NMaW5rIFwiY2MvbWF0NDptZXRob2RcIn19Y2MubWF0NHt7L2Nyb3NzTGlua319XG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29uc3RydWN0b3IgKCBtMDA/OiBudW1iZXIsIG0wMT86IG51bWJlciwgbTAyPzogbnVtYmVyLCBtMDM/OiBudW1iZXIsIG0xMD86IG51bWJlciwgbTExPzogbnVtYmVyLCBtMTI/OiBudW1iZXIsIG0xMz86IG51bWJlciwgbTIwPzogbnVtYmVyLCBtMjE/OiBudW1iZXIsIG0yMj86IG51bWJlciwgbTIzPzogbnVtYmVyLCBtMzA/OiBudW1iZXIsIG0zMT86IG51bWJlciwgbTMyPzogbnVtYmVyLCBtMzM/OiBudW1iZXIpXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBtMDA6IG51bWJlciB8IEZsb2F0QXJyYXkgPSAxLCBtMDE6IG51bWJlciA9IDAsIG0wMjogbnVtYmVyID0gMCwgbTAzOiBudW1iZXIgPSAwLFxuICAgICAgICBtMTA6IG51bWJlciA9IDAsIG0xMTogbnVtYmVyID0gMSwgbTEyOiBudW1iZXIgPSAwLCBtMTM6IG51bWJlciA9IDAsXG4gICAgICAgIG0yMDogbnVtYmVyID0gMCwgbTIxOiBudW1iZXIgPSAwLCBtMjI6IG51bWJlciA9IDEsIG0yMzogbnVtYmVyID0gMCxcbiAgICAgICAgbTMwOiBudW1iZXIgPSAwLCBtMzE6IG51bWJlciA9IDAsIG0zMjogbnVtYmVyID0gMCwgbTMzOiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmIChtMDAgaW5zdGFuY2VvZiBGTE9BVF9BUlJBWV9UWVBFKSB7XG4gICAgICAgICAgICB0aGlzLm0gPSBtMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm0gPSBuZXcgRkxPQVRfQVJSQVlfVFlQRSgxNik7XG4gICAgICAgICAgICBsZXQgdG0gPSB0aGlzLm07XG4gICAgICAgICAgICB0bVswXSA9IG0wMCBhcyBudW1iZXI7XG4gICAgICAgICAgICB0bVsxXSA9IG0wMTtcbiAgICAgICAgICAgIHRtWzJdID0gbTAyO1xuICAgICAgICAgICAgdG1bM10gPSBtMDM7XG4gICAgICAgICAgICB0bVs0XSA9IG0xMDtcbiAgICAgICAgICAgIHRtWzVdID0gbTExO1xuICAgICAgICAgICAgdG1bNl0gPSBtMTI7XG4gICAgICAgICAgICB0bVs3XSA9IG0xMztcbiAgICAgICAgICAgIHRtWzhdID0gbTIwO1xuICAgICAgICAgICAgdG1bOV0gPSBtMjE7XG4gICAgICAgICAgICB0bVsxMF0gPSBtMjI7XG4gICAgICAgICAgICB0bVsxMV0gPSBtMjM7XG4gICAgICAgICAgICB0bVsxMl0gPSBtMzA7XG4gICAgICAgICAgICB0bVsxM10gPSBtMzE7XG4gICAgICAgICAgICB0bVsxNF0gPSBtMzI7XG4gICAgICAgICAgICB0bVsxNV0gPSBtMzM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIGNsb25lIGEgTWF0NCBvYmplY3RcbiAgICAgKiAhI3poIOWFi+mahuS4gOS4qiBNYXQ0IOWvueixoVxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fVxuICAgICAqL1xuICAgIGNsb25lICgpIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzO1xuICAgICAgICBsZXQgdG0gPSB0Lm07XG4gICAgICAgIHJldHVybiBuZXcgTWF0NChcbiAgICAgICAgICAgIHRtWzBdLCB0bVsxXSwgdG1bMl0sIHRtWzNdLFxuICAgICAgICAgICAgdG1bNF0sIHRtWzVdLCB0bVs2XSwgdG1bN10sXG4gICAgICAgICAgICB0bVs4XSwgdG1bOV0sIHRtWzEwXSwgdG1bMTFdLFxuICAgICAgICAgICAgdG1bMTJdLCB0bVsxM10sIHRtWzE0XSwgdG1bMTVdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgdGhlIG1hdHJpeCB3aXRoIGFub3RoZXIgb25lJ3MgdmFsdWVcbiAgICAgKiAhI3poIOeUqOWPpuS4gOS4quefqemYteiuvue9rui/meS4quefqemYteeahOWAvOOAglxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtNYXQ0fSBzcmNPYmpcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc2V0IChzKSB7XG4gICAgICAgIGxldCB0ID0gdGhpcztcbiAgICAgICAgbGV0IHRtID0gdC5tLCBzbSA9IHMubTtcbiAgICAgICAgdG1bMF0gPSBzbVswXTtcbiAgICAgICAgdG1bMV0gPSBzbVsxXTtcbiAgICAgICAgdG1bMl0gPSBzbVsyXTtcbiAgICAgICAgdG1bM10gPSBzbVszXTtcbiAgICAgICAgdG1bNF0gPSBzbVs0XTtcbiAgICAgICAgdG1bNV0gPSBzbVs1XTtcbiAgICAgICAgdG1bNl0gPSBzbVs2XTtcbiAgICAgICAgdG1bN10gPSBzbVs3XTtcbiAgICAgICAgdG1bOF0gPSBzbVs4XTtcbiAgICAgICAgdG1bOV0gPSBzbVs5XTtcbiAgICAgICAgdG1bMTBdID0gc21bMTBdO1xuICAgICAgICB0bVsxMV0gPSBzbVsxMV07XG4gICAgICAgIHRtWzEyXSA9IHNtWzEyXTtcbiAgICAgICAgdG1bMTNdID0gc21bMTNdO1xuICAgICAgICB0bVsxNF0gPSBzbVsxNF07XG4gICAgICAgIHRtWzE1XSA9IHNtWzE1XTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHR3byBtYXRyaXggZXF1YWxcbiAgICAgKiAhI3poIOW9k+WJjeeahOefqemYteaYr+WQpuS4juaMh+WumueahOefqemYteebuOetieOAglxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZXF1YWxzIChvdGhlcikge1xuICAgICAgICByZXR1cm4gTWF0NC5zdHJpY3RFcXVhbHModGhpcywgb3RoZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0d28gbWF0cml4IGVxdWFsIHdpdGggZGVmYXVsdCBkZWdyZWUgb2YgdmFyaWFuY2UuXG4gICAgICogISN6aFxuICAgICAqIOi/keS8vOWIpOaWreS4pOS4quefqemYteaYr+WQpuebuOetieOAgjxici8+XG4gICAgICog5Yik5patIDIg5Liq55+p6Zi15piv5ZCm5Zyo6buY6K6k6K+v5beu6IyD5Zu05LmL5YaF77yM5aaC5p6c5Zyo5YiZ6L+U5ZueIHRydWXvvIzlj43kuYvliJnov5Tlm54gZmFsc2XjgIJcbiAgICAgKiBAbWV0aG9kIGZ1enp5RXF1YWxzXG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICovXG4gICAgZnV6enlFcXVhbHMgKG90aGVyKSB7XG4gICAgICAgIHJldHVybiBNYXQ0LmVxdWFscyh0aGlzLCBvdGhlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUcmFuc2Zvcm0gdG8gc3RyaW5nIHdpdGggbWF0cml4IGluZm9ybWF0aW9uc1xuICAgICAqICEjemgg6L2s5o2i5Li65pa55L6/6ZiF6K+755qE5a2X56ym5Liy44CCXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgIGxldCB0bSA9IHRoaXMubTtcbiAgICAgICAgaWYgKHRtKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJbXFxuXCIgK1xuICAgICAgICAgICAgICAgIHRtWzBdICsgXCIsIFwiICsgdG1bMV0gKyBcIiwgXCIgKyB0bVsyXSArIFwiLCBcIiArIHRtWzNdICsgXCIsXFxuXCIgK1xuICAgICAgICAgICAgICAgIHRtWzRdICsgXCIsIFwiICsgdG1bNV0gKyBcIiwgXCIgKyB0bVs2XSArIFwiLCBcIiArIHRtWzddICsgXCIsXFxuXCIgK1xuICAgICAgICAgICAgICAgIHRtWzhdICsgXCIsIFwiICsgdG1bOV0gKyBcIiwgXCIgKyB0bVsxMF0gKyBcIiwgXCIgKyB0bVsxMV0gKyBcIixcXG5cIiArXG4gICAgICAgICAgICAgICAgdG1bMTJdICsgXCIsIFwiICsgdG1bMTNdICsgXCIsIFwiICsgdG1bMTRdICsgXCIsIFwiICsgdG1bMTVdICsgXCJcXG5cIiArXG4gICAgICAgICAgICAgICAgXCJdXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJbXFxuXCIgK1xuICAgICAgICAgICAgICAgIFwiMSwgMCwgMCwgMFxcblwiICtcbiAgICAgICAgICAgICAgICBcIjAsIDEsIDAsIDBcXG5cIiArXG4gICAgICAgICAgICAgICAgXCIwLCAwLCAxLCAwXFxuXCIgK1xuICAgICAgICAgICAgICAgIFwiMCwgMCwgMCwgMVxcblwiICtcbiAgICAgICAgICAgICAgICBcIl1cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbWF0cml4IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIGlkZW50aXR5XG4gICAgICogQHJldHVybnMge01hdDR9IHNlbGZcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgaWRlbnRpdHkgKCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gTWF0NC5pZGVudGl0eSh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAgICAgKiBAbWV0aG9kIHRyYW5zcG9zZVxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIHRyYW5zcG9zZSAob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgTWF0NCgpO1xuICAgICAgICByZXR1cm4gTWF0NC50cmFuc3Bvc2Uob3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIGEgbWF0NFxuICAgICAqIEBtZXRob2QgaW52ZXJ0XG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZC5cbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gb3V0XG4gICAgICovXG4gICAgaW52ZXJ0IChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBNYXQ0KCk7XG4gICAgICAgIHJldHVybiBNYXQ0LmludmVydChvdXQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICAgICAqIEBtZXRob2QgYWRqb2ludFxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIGFkam9pbnQgKG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IE1hdDQoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuYWRqb2ludChvdXQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICAgICAqIEBtZXRob2QgZGV0ZXJtaW5hbnRcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gICAgICovXG4gICAgZGV0ZXJtaW5hbnQgKCkge1xuICAgICAgICByZXR1cm4gTWF0NC5kZXRlcm1pbmFudCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHR3byBNYXQ0XG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge01hdDR9IG90aGVyIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIGFkZCAob3RoZXIsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IE1hdDQoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuYWRkKG91dCwgdGhpcywgb3RoZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0cyB0aGUgY3VycmVudCBtYXRyaXggd2l0aCBhbm90aGVyIG9uZVxuICAgICAqIEBtZXRob2Qgc3VidHJhY3RcbiAgICAgKiBAcGFyYW0ge01hdDR9IG90aGVyIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGlzXG4gICAgICovXG4gICAgc3VidHJhY3QgKG90aGVyKTogdGhpcyB7XG4gICAgICAgIHJldHVybiBNYXQ0LnN1YnRyYWN0KHRoaXMsIHRoaXMsIG90aGVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgdGhlIGN1cnJlbnQgbWF0cml4IHdpdGggYW5vdGhlciBvbmVcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdGhlciB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gdGhpc1xuICAgICAqL1xuICAgIG11bHRpcGx5IChvdGhlcik6IHRoaXMge1xuICAgICAgICByZXR1cm4gTWF0NC5tdWx0aXBseSh0aGlzLCB0aGlzLCBvdGhlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBudW1iZXIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGlzXG4gICAgICovXG4gICAgbXVsdGlwbHlTY2FsYXIgKG51bWJlcik6IHRoaXMge1xuICAgICAgICByZXR1cm4gTWF0NC5tdWx0aXBseVNjYWxhcih0aGlzLCB0aGlzLCBudW1iZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICAgICAqIEBtZXRob2QgdHJhbnNsYXRlXG4gICAgICogQHBhcmFtIHtWZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAgICAgKiBAcGFyYW0ge01hdDR9IFtvdXRdIHRoZSByZWNlaXZpbmcgbWF0cml4LCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgbWF0cml4IHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyBtYXRyaXggd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybnMge01hdDR9IG91dFxuICAgICAqL1xuICAgIHRyYW5zbGF0ZSAodiwgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgTWF0NCgpO1xuICAgICAgICByZXR1cm4gTWF0NC50cmFuc2xhdGUob3V0LCB0aGlzLCB2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAgICAgKiBAbWV0aG9kIHNjYWxlXG4gICAgICogQHBhcmFtIHtWZWMzfSB2IHZlY3RvciB0byBzY2FsZSBieVxuICAgICAqIEBwYXJhbSB7TWF0NH0gW291dF0gdGhlIHJlY2VpdmluZyBtYXRyaXgsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSBtYXRyaXggdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IG1hdHJpeCB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJucyB7TWF0NH0gb3V0XG4gICAgICovXG4gICAgc2NhbGUgKHYsIG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IE1hdDQoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuc2NhbGUob3V0LCB0aGlzLCB2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSb3RhdGVzIGEgbWF0NCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBnaXZlbiBheGlzXG4gICAgICogQG1ldGhvZCByb3RhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgICAqIEBwYXJhbSB7VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gICAgICogQHBhcmFtIHtNYXQ0fSBbb3V0XSB0aGUgcmVjZWl2aW5nIG1hdHJpeCwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIG1hdHJpeCB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgbWF0cml4IHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSBvdXRcbiAgICAgKi9cbiAgICByb3RhdGUgKHJhZCwgYXhpcywgb3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgTWF0NCgpO1xuICAgICAgICByZXR1cm4gTWF0NC5yb3RhdGUob3V0LCB0aGlzLCByYWQsIGF4aXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICogQG1ldGhvZCBnZXRUcmFuc2xhdGlvblxuICAgICAqIEBwYXJhbSAge1ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSB0cmFuc2xhdGlvbiBjb21wb25lbnQsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMyB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMzfSBvdXRcbiAgICAgKi9cbiAgICBnZXRUcmFuc2xhdGlvbiAob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMygpO1xuICAgICAgICByZXR1cm4gTWF0NC5nZXRUcmFuc2xhdGlvbihvdXQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNjYWxlIGZhY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXhcbiAgICAgKiBAbWV0aG9kIGdldFNjYWxlXG4gICAgICogQHBhcmFtICB7VmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxlIGNvbXBvbmVudCwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMzIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzN9IG91dFxuICAgICAqL1xuICAgIGdldFNjYWxlIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMzKCk7XG4gICAgICAgIHJldHVybiBNYXQ0LmdldFNjYWxpbmcob3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByb3RhdGlvbiBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4XG4gICAgICogQG1ldGhvZCBnZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSAge1F1YXR9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSByb3RhdGlvbiBjb21wb25lbnQsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgcXVhdGVybmlvbiBvYmplY3Qgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7UXVhdH0gb3V0XG4gICAgICovXG4gICAgZ2V0Um90YXRpb24gKG91dCkge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFF1YXQoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuZ2V0Um90YXRpb24ob3V0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXN0b3JlIHRoZSBtYXRyaXggdmFsdWVzIGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZVxuICAgICAqIEBtZXRob2QgZnJvbVJUU1xuICAgICAqIEBwYXJhbSB7UXVhdH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIHtWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjM30gcyBTY2FsaW5nIHZlY3RvclxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGUgY3VycmVudCBtYXQ0IG9iamVjdFxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBmcm9tUlRTIChxLCB2LCBzKTogdGhpcyB7XG4gICAgICAgIHJldHVybiBNYXQ0LmZyb21SVFModGhpcywgcSwgdiwgcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzdG9yZSB0aGUgbWF0cml4IHZhbHVlcyBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvblxuICAgICAqIEBtZXRob2QgZnJvbVF1YXRcbiAgICAgKiBAcGFyYW0ge1F1YXR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICAgICAqIEByZXR1cm5zIHtNYXQ0fSB0aGUgY3VycmVudCBtYXQ0IG9iamVjdFxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBmcm9tUXVhdCAocXVhdCk6IHRoaXMge1xuICAgICAgICByZXR1cm4gTWF0NC5mcm9tUXVhdCh0aGlzLCBxdWF0KTtcbiAgICB9XG59XG5cbmNvbnN0IHYzXzE6IFZlYzMgPSBuZXcgVmVjMygpO1xuY29uc3QgbTNfMTogTWF0MyA9IG5ldyBNYXQzKCk7XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuTWF0NCcsIE1hdDQsIHtcbiAgICBtMDA6IDEsIG0wMTogMCwgbTAyOiAwLCBtMDM6IDAsXG4gICAgbTA0OiAwLCBtMDU6IDEsIG0wNjogMCwgbTA3OiAwLFxuICAgIG0wODogMCwgbTA5OiAwLCBtMTA6IDEsIG0xMTogMCxcbiAgICBtMTI6IDAsIG0xMzogMCwgbTE0OiAwLCBtMTU6IDFcbn0pO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTWF0NC5wcm90b3R5cGUsICdtJyArIGksIHtcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1baV07XG4gICAgICAgIH0sXG4gICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMubVtpXSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW4gVGhlIGNvbnZlbmllbmNlIG1ldGhvZCB0byBjcmVhdGUgYSBuZXcge3sjY3Jvc3NMaW5rIFwiTWF0NFwifX1jYy5NYXQ0e3svY3Jvc3NMaW5rfX0uXG4gKiAhI3poIOmAmui/h+ivpeeugOS+v+eahOWHveaVsOi/m+ihjOWIm+W7uiB7eyNjcm9zc0xpbmsgXCJNYXQ0XCJ9fWNjLk1hdDR7ey9jcm9zc0xpbmt9fSDlr7nosaHjgIJcbiAqIEBtZXRob2QgbWF0NFxuICogQHBhcmFtIHtOdW1iZXJ9IFttMDBdIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gKiBAcGFyYW0ge051bWJlcn0gW20wMV0gQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTAyXSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxuICogQHBhcmFtIHtOdW1iZXJ9IFttMDNdIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gKiBAcGFyYW0ge051bWJlcn0gW20xMF0gQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTExXSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxuICogQHBhcmFtIHtOdW1iZXJ9IFttMTJdIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gKiBAcGFyYW0ge051bWJlcn0gW20xM10gQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAqIEBwYXJhbSB7TnVtYmVyfSBbbTIwXSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxuICogQHBhcmFtIHtOdW1iZXJ9IFttMjFdIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gKiBAcGFyYW0ge051bWJlcn0gW20yMl0gQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gKiBAcGFyYW0ge051bWJlcn0gW20yM10gQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXG4gKiBAcGFyYW0ge051bWJlcn0gW20zMF0gQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gKiBAcGFyYW0ge051bWJlcn0gW20zMV0gQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gKiBAcGFyYW0ge051bWJlcn0gW20zMl0gQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXG4gKiBAcGFyYW0ge051bWJlcn0gW20zM10gQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gKiBAcmV0dXJuIHtNYXQ0fVxuICovXG5jYy5tYXQ0ID0gZnVuY3Rpb24gKG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICAgIGxldCBtYXQgPSBuZXcgTWF0NChtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpO1xuICAgIGlmIChtMDAgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBNYXQ0LmlkZW50aXR5KG1hdCk7XG4gICAgfVxuICAgIHJldHVybiBtYXQ7XG59O1xuXG5jYy5NYXQ0ID0gTWF0NDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9