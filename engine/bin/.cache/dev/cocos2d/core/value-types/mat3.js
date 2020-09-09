
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/mat3.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _utils = require("../value-types/utils");

var _vec = _interopRequireDefault(require("./vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Mathematical 3x3 matrix.
 *
 * NOTE: we use column-major matrix for all matrix calculation.
 *
 * This may lead to some confusion when referencing OpenGL documentation,
 * however, which represents out all matricies in column-major format.
 * This means that while in code a matrix may be typed out as:
 *
 * [1, 0, 0, 0,
 *  0, 1, 0, 0,
 *  0, 0, 1, 0,
 *  x, y, z, 0]
 *
 * The same matrix in the [OpenGL documentation](https://www.khronos.org/registry/OpenGL-Refpages/gl2.1/xhtml/glTranslate.xml)
 * is written as:
 *
 *  1 0 0 x
 *  0 1 0 y
 *  0 0 1 z
 *  0 0 0 0
 *
 * Please rest assured, however, that they are the same thing!
 * This is not unique to glMatrix, either, as OpenGL developers have long been confused by the
 * apparent lack of consistency between the memory layout and the documentation.
 *
 * @class Mat3
 * @extends ValueType
 */
var Mat3 = /*#__PURE__*/function () {
  /**
   * Identity  of Mat3
   * @property {Mat3} IDENTITY
   * @static
   */

  /**
   * Creates a matrix, with elements specified separately.
   *
   * @param {Number} m00 - Value assigned to element at column 0 row 0.
   * @param {Number} m01 - Value assigned to element at column 0 row 1.
   * @param {Number} m02 - Value assigned to element at column 0 row 2.
   * @param {Number} m03 - Value assigned to element at column 1 row 0.
   * @param {Number} m04 - Value assigned to element at column 1 row 1.
   * @param {Number} m05 - Value assigned to element at column 1 row 2.
   * @param {Number} m06 - Value assigned to element at column 2 row 0.
   * @param {Number} m07 - Value assigned to element at column 2 row 1.
   * @param {Number} m08 - Value assigned to element at column 2 row 2.
   * @returns {Mat3} The newly created matrix.
   * @static
   */
  Mat3.create = function create(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
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

    if (m04 === void 0) {
      m04 = 1;
    }

    if (m05 === void 0) {
      m05 = 0;
    }

    if (m06 === void 0) {
      m06 = 0;
    }

    if (m07 === void 0) {
      m07 = 0;
    }

    if (m08 === void 0) {
      m08 = 1;
    }

    return new Mat3(m00, m01, m02, m03, m04, m05, m06, m07, m08);
  }
  /**
   * Clone a matrix.
   *
   * @param {Mat3} a - Matrix to clone.
   * @returns {Mat3} The newly created matrix.
   * @static
   */
  ;

  Mat3.clone = function clone(a) {
    var am = a.m;
    return new Mat3(am[0], am[1], am[2], am[3], am[4], am[5], am[6], am[7], am[8]);
  }
  /**
   * Copy content of a matrix into another.
   *
   * @param {Mat3} out - Matrix to modified.
   * @param {Mat3} a - The specified matrix.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.copy = function copy(out, a) {
    out.m.set(a.m);
    return out;
  }
  /**
   * Sets the elements of a matrix to the given values.
   *
   * @param {Mat3} out - The matrix to modified.
   * @param {Number} m00 - Value assigned to element at column 0 row 0.
   * @param {Number} m01 - Value assigned to element at column 0 row 1.
   * @param {Number} m02 - Value assigned to element at column 0 row 2.
   * @param {Number} m10 - Value assigned to element at column 1 row 0.
   * @param {Number} m11 - Value assigned to element at column 1 row 1.
   * @param {Number} m12 - Value assigned to element at column 1 row 2.
   * @param {Number} m20 - Value assigned to element at column 2 row 0.
   * @param {Number} m21 - Value assigned to element at column 2 row 1.
   * @param {Number} m22 - Value assigned to element at column 2 row 2.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.set = function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var outm = out.m;
    outm[0] = m00;
    outm[1] = m01;
    outm[2] = m02;
    outm[3] = m10;
    outm[4] = m11;
    outm[5] = m12;
    outm[6] = m20;
    outm[7] = m21;
    outm[8] = m22;
    return out;
  }
  /**
   * return an identity matrix.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.identity = function identity(out) {
    var outm = out.m;
    outm[0] = 1;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = 1;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Transposes a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to transpose.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.transpose = function transpose(out, a) {
    var am = a.m,
        outm = out.m; // If we are transposing ourselves we can skip a few steps but have to cache some values

    if (out === a) {
      var a01 = am[1],
          a02 = am[2],
          a12 = am[5];
      outm[1] = am[3];
      outm[2] = am[6];
      outm[3] = a01;
      outm[5] = am[7];
      outm[6] = a02;
      outm[7] = a12;
    } else {
      outm[0] = am[0];
      outm[1] = am[3];
      outm[2] = am[6];
      outm[3] = am[1];
      outm[4] = am[4];
      outm[5] = am[7];
      outm[6] = am[2];
      outm[7] = am[5];
      outm[8] = am[8];
    }

    return out;
  }
  /**
   * Inverts a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to invert.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.invert = function invert(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return out;
    }

    det = 1.0 / det;
    outm[0] = b01 * det;
    outm[1] = (-a22 * a01 + a02 * a21) * det;
    outm[2] = (a12 * a01 - a02 * a11) * det;
    outm[3] = b11 * det;
    outm[4] = (a22 * a00 - a02 * a20) * det;
    outm[5] = (-a12 * a00 + a02 * a10) * det;
    outm[6] = b21 * det;
    outm[7] = (-a21 * a00 + a01 * a20) * det;
    outm[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to calculate.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.adjoint = function adjoint(out, a) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    outm[0] = a11 * a22 - a12 * a21;
    outm[1] = a02 * a21 - a01 * a22;
    outm[2] = a01 * a12 - a02 * a11;
    outm[3] = a12 * a20 - a10 * a22;
    outm[4] = a00 * a22 - a02 * a20;
    outm[5] = a02 * a10 - a00 * a12;
    outm[6] = a10 * a21 - a11 * a20;
    outm[7] = a01 * a20 - a00 * a21;
    outm[8] = a00 * a11 - a01 * a10;
    return out;
  }
  /**
   * Calculates the determinant of a matrix.
   *
   * @param {Mat3} a - Matrix to calculate.
   * @returns {Number} Determinant of a.
   * @static
   */
  ;

  Mat3.determinant = function determinant(a) {
    var am = a.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  /**
   * Multiply two matrices explicitly.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiply = function multiply(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b00 = bm[0],
        b01 = bm[1],
        b02 = bm[2];
    var b10 = bm[3],
        b11 = bm[4],
        b12 = bm[5];
    var b20 = bm[6],
        b21 = bm[7],
        b22 = bm[8];
    outm[0] = b00 * a00 + b01 * a10 + b02 * a20;
    outm[1] = b00 * a01 + b01 * a11 + b02 * a21;
    outm[2] = b00 * a02 + b01 * a12 + b02 * a22;
    outm[3] = b10 * a00 + b11 * a10 + b12 * a20;
    outm[4] = b10 * a01 + b11 * a11 + b12 * a21;
    outm[5] = b10 * a02 + b11 * a12 + b12 * a22;
    outm[6] = b20 * a00 + b21 * a10 + b22 * a20;
    outm[7] = b20 * a01 + b21 * a11 + b22 * a21;
    outm[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * !#en Take the first third order of the fourth order matrix and multiply by the third order matrix
   * !#zh 取四阶矩阵的前三阶，与三阶矩阵相乘
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyMat4 = function multiplyMat4(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var b00 = bm[0],
        b01 = bm[1],
        b02 = bm[2];
    var b10 = bm[4],
        b11 = bm[5],
        b12 = bm[6];
    var b20 = bm[8],
        b21 = bm[9],
        b22 = bm[10];
    outm[0] = b00 * a00 + b01 * a10 + b02 * a20;
    outm[1] = b00 * a01 + b01 * a11 + b02 * a21;
    outm[2] = b00 * a02 + b01 * a12 + b02 * a22;
    outm[3] = b10 * a00 + b11 * a10 + b12 * a20;
    outm[4] = b10 * a01 + b11 * a11 + b12 * a21;
    outm[5] = b10 * a02 + b11 * a12 + b12 * a22;
    outm[6] = b20 * a00 + b21 * a10 + b22 * a20;
    outm[7] = b20 * a01 + b21 * a11 + b22 * a21;
    outm[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * Multiply a matrix with a translation matrix given by a translation offset.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to multiply.
   * @param {vec2} v - The translation offset.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.translate = function translate(out, a, v) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var x = v.x,
        y = v.y;
    outm[0] = a00;
    outm[1] = a01;
    outm[2] = a02;
    outm[3] = a10;
    outm[4] = a11;
    outm[5] = a12;
    outm[6] = x * a00 + y * a10 + a20;
    outm[7] = x * a01 + y * a11 + a21;
    outm[8] = x * a02 + y * a12 + a22;
    return out;
  }
  /**
   * Rotates a matrix by the given angle.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to rotate.
   * @param {Number} rad - The rotation angle.
   * @returns {Mat3} out
   * @static
   */
  ;

  Mat3.rotate = function rotate(out, a, rad) {
    var am = a.m,
        outm = out.m;
    var a00 = am[0],
        a01 = am[1],
        a02 = am[2],
        a10 = am[3],
        a11 = am[4],
        a12 = am[5],
        a20 = am[6],
        a21 = am[7],
        a22 = am[8];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    outm[0] = c * a00 + s * a10;
    outm[1] = c * a01 + s * a11;
    outm[2] = c * a02 + s * a12;
    outm[3] = c * a10 - s * a00;
    outm[4] = c * a11 - s * a01;
    outm[5] = c * a12 - s * a02;
    outm[6] = a20;
    outm[7] = a21;
    outm[8] = a22;
    return out;
  }
  /**
   * Multiply a matrix with a scale matrix given by a scale vector.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to multiply.
   * @param {vec2} v - The scale vector.
   * @returns {Mat3} out
   **/
  ;

  Mat3.scale = function scale(out, a, v) {
    var x = v.x,
        y = v.y;
    var am = a.m,
        outm = out.m;
    outm[0] = x * am[0];
    outm[1] = x * am[1];
    outm[2] = x * am[2];
    outm[3] = y * am[3];
    outm[4] = y * am[4];
    outm[5] = y * am[5];
    outm[6] = am[6];
    outm[7] = am[7];
    outm[8] = am[8];
    return out;
  }
  /**
   * Copies the upper-left 3x3 values of a 4x4 matrix into a 3x3 matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {mat4} a - The 4x4 matrix.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromMat4 = function fromMat4(out, a) {
    var am = a.m,
        outm = out.m;
    outm[0] = am[0];
    outm[1] = am[1];
    outm[2] = am[2];
    outm[3] = am[4];
    outm[4] = am[5];
    outm[5] = am[6];
    outm[6] = am[8];
    outm[7] = am[9];
    outm[8] = am[10];
    return out;
  }
  /**
   * Creates a matrix from a translation offset.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec2} v - The translation offset.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromTranslation = function fromTranslation(out, v) {
    var outm = out.m;
    outm[0] = 1;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = 1;
    outm[5] = 0;
    outm[6] = v.x;
    outm[7] = v.y;
    outm[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Number} rad - The rotation angle.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromRotation = function fromRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    var outm = out.m;
    outm[0] = c;
    outm[1] = s;
    outm[2] = 0;
    outm[3] = -s;
    outm[4] = c;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a scale vector.
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec2} v - Scale vector.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromScaling = function fromScaling(out, v) {
    var outm = out.m;
    outm[0] = v.x;
    outm[1] = 0;
    outm[2] = 0;
    outm[3] = 0;
    outm[4] = v.y;
    outm[5] = 0;
    outm[6] = 0;
    outm[7] = 0;
    outm[8] = 1;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from the given quaternion.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {quat} q - The quaternion.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.fromQuat = function fromQuat(out, q) {
    var outm = out.m;
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
    outm[0] = 1 - yy - zz;
    outm[3] = yx - wz;
    outm[6] = zx + wy;
    outm[1] = yx + wz;
    outm[4] = 1 - xx - zz;
    outm[7] = zy - wx;
    outm[2] = zx - wy;
    outm[5] = zy + wx;
    outm[8] = 1 - xx - yy;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from view direction and up direction.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {vec3} view - View direction (must be normalized).
   * @param {vec3} [up] - Up direction, default is (0,1,0) (must be normalized).
   *
   * @returns {Mat3} out
   * @static
   */
  ;

  Mat3.fromViewUp = function fromViewUp(out, view, up) {
    var _fromViewUpIIFE = function () {
      var default_up = new _vec["default"](0, 1, 0);
      var x = new _vec["default"]();
      var y = new _vec["default"]();
      return function (out, view, up) {
        if (_vec["default"].lengthSqr(view) < _utils.EPSILON * _utils.EPSILON) {
          Mat3.identity(out);
          return out;
        }

        up = up || default_up;

        _vec["default"].normalize(x, _vec["default"].cross(x, up, view));

        if (_vec["default"].lengthSqr(x) < _utils.EPSILON * _utils.EPSILON) {
          Mat3.identity(out);
          return out;
        }

        _vec["default"].cross(y, view, x);

        Mat3.set(out, x.x, x.y, x.z, y.x, y.y, y.z, view.x, view.y, view.z);
        return out;
      };
    }();

    return _fromViewUpIIFE(out, view, up);
  }
  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {mat4} a - A 4x4 matrix to derive the normal matrix from.
   *
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.normalFromMat4 = function normalFromMat4(out, a) {
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
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return out;
    }

    det = 1.0 / det;
    outm[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    outm[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    outm[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    outm[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    outm[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    outm[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    outm[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    outm[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    outm[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  /**
   * Returns Frobenius norm of a matrix.
   *
   * @param {Mat3} a - Matrix to calculate Frobenius norm of.
   * @returns {Number} - The frobenius norm.
   * @static
   */
  ;

  Mat3.frob = function frob(a) {
    var am = a.m;
    return Math.sqrt(Math.pow(am[0], 2) + Math.pow(am[1], 2) + Math.pow(am[2], 2) + Math.pow(am[3], 2) + Math.pow(am[4], 2) + Math.pow(am[5], 2) + Math.pow(am[6], 2) + Math.pow(am[7], 2) + Math.pow(am[8], 2));
  }
  /**
   * Adds two matrices.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.add = function add(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] + bm[0];
    outm[1] = am[1] + bm[1];
    outm[2] = am[2] + bm[2];
    outm[3] = am[3] + bm[3];
    outm[4] = am[4] + bm[4];
    outm[5] = am[5] + bm[5];
    outm[6] = am[6] + bm[6];
    outm[7] = am[7] + bm[7];
    outm[8] = am[8] + bm[8];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.subtract = function subtract(out, a, b) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] - bm[0];
    outm[1] = am[1] - bm[1];
    outm[2] = am[2] - bm[2];
    outm[3] = am[3] - bm[3];
    outm[4] = am[4] - bm[4];
    outm[5] = am[5] - bm[5];
    outm[6] = am[6] - bm[6];
    outm[7] = am[7] - bm[7];
    outm[8] = am[8] - bm[8];
    return out;
  }
  /**
   * Multiply each element of a matrix by a scalar number.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - Matrix to scale
   * @param {Number} b - The scale number.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyScalar = function multiplyScalar(out, a, b) {
    var am = a.m,
        outm = out.m;
    outm[0] = am[0] * b;
    outm[1] = am[1] * b;
    outm[2] = am[2] * b;
    outm[3] = am[3] * b;
    outm[4] = am[4] * b;
    outm[5] = am[5] * b;
    outm[6] = am[6] * b;
    outm[7] = am[7] * b;
    outm[8] = am[8] * b;
    return out;
  }
  /**
   * Adds two matrices after multiplying each element of the second operand by a scalar number.
   *
   * @param {Mat3} out - Matrix to store result.
   * @param {Mat3} a - The first operand.
   * @param {Mat3} b - The second operand.
   * @param {Number} scale - The scale number.
   * @returns {Mat3} out.
   * @static
   */
  ;

  Mat3.multiplyScalarAndAdd = function multiplyScalarAndAdd(out, a, b, scale) {
    var am = a.m,
        bm = b.m,
        outm = out.m;
    outm[0] = am[0] + bm[0] * scale;
    outm[1] = am[1] + bm[1] * scale;
    outm[2] = am[2] + bm[2] * scale;
    outm[3] = am[3] + bm[3] * scale;
    outm[4] = am[4] + bm[4] * scale;
    outm[5] = am[5] + bm[5] * scale;
    outm[6] = am[6] + bm[6] * scale;
    outm[7] = am[7] + bm[7] * scale;
    outm[8] = am[8] + bm[8] * scale;
    return out;
  }
  /**
   * Returns whether the specified matrices are equal. (Compared using ===)
   *
   * @param {Mat3} a - The first matrix.
   * @param {Mat3} b - The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   * @static
   */
  ;

  Mat3.exactEquals = function exactEquals(a, b) {
    var am = a.m,
        bm = b.m;
    return am[0] === bm[0] && am[1] === bm[1] && am[2] === bm[2] && am[3] === bm[3] && am[4] === bm[4] && am[5] === bm[5] && am[6] === bm[6] && am[7] === bm[7] && am[8] === bm[8];
  }
  /**
   * Returns whether the specified matrices are approximately equal.
   *
   * @param {Mat3} a - The first matrix.
   * @param {Mat3} b - The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   * @static
   */
  ;

  Mat3.equals = function equals(a, b) {
    var am = a.m,
        bm = b.m;
    var a0 = am[0],
        a1 = am[1],
        a2 = am[2],
        a3 = am[3],
        a4 = am[4],
        a5 = am[5],
        a6 = am[6],
        a7 = am[7],
        a8 = am[8];
    var b0 = bm[0],
        b1 = bm[1],
        b2 = bm[2],
        b3 = bm[3],
        b4 = bm[4],
        b5 = bm[5],
        b6 = bm[6],
        b7 = bm[7],
        b8 = bm[8];
    return Math.abs(a0 - b0) <= _utils.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= _utils.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= _utils.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= _utils.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= _utils.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= _utils.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= _utils.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= _utils.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= _utils.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
  }
  /**
   * !#zh 矩阵转数组
   * !#en Matrix transpose array
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, mat: IMat3Like, ofs?: number): Out
   * @param ofs 数组内的起始偏移量
   * @static
   */
  ;

  Mat3.toArray = function toArray(out, mat, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = mat.m;

    for (var i = 0; i < 9; i++) {
      out[ofs + i] = m[i];
    }

    return out;
  }
  /**
   * !#zh 数组转矩阵
   * !#en Transfer matrix array
   * @method fromArray
   * @typescript
   * fromArray <Out extends IMat3Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Mat3.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var m = out.m;

    for (var i = 0; i < 9; i++) {
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
   * @method constructor
   * @typescript
   * constructor (m00?: number | Float32Array, m01?: number, m02?: number, m03?: number, m04?: number, m05?: number, m06?: number, m07?: number, m08?: number)
   */
  function Mat3(m00, m01, m02, m03, m04, m05, m06, m07, m08) {
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

    if (m04 === void 0) {
      m04 = 1;
    }

    if (m05 === void 0) {
      m05 = 0;
    }

    if (m06 === void 0) {
      m06 = 0;
    }

    if (m07 === void 0) {
      m07 = 0;
    }

    if (m08 === void 0) {
      m08 = 1;
    }

    this.m = void 0;

    if (m00 instanceof _utils.FLOAT_ARRAY_TYPE) {
      this.m = m00;
    } else {
      this.m = new _utils.FLOAT_ARRAY_TYPE(9);
      var m = this.m;
      /**
       * The element at column 0 row 0.
       * @type {number}
       * */

      m[0] = m00;
      /**
       * The element at column 0 row 1.
       * @type {number}
       * */

      m[1] = m01;
      /**
       * The element at column 0 row 2.
       * @type {number}
       * */

      m[2] = m02;
      /**
       * The element at column 1 row 0.
       * @type {number}
       * */

      m[3] = m03;
      /**
       * The element at column 1 row 1.
       * @type {number}
       * */

      m[4] = m04;
      /**
       * The element at column 1 row 2.
       * @type {number}
       * */

      m[5] = m05;
      /**
       * The element at column 2 row 0.
       * @type {number}
       * */

      m[6] = m06;
      /**
       * The element at column 2 row 1.
       * @type {number}
       * */

      m[7] = m07;
      /**
       * The element at column 2 row 2.
       * @type {number}
       * */

      m[8] = m08;
    }
  }
  /**
   * Returns a string representation of a matrix.
   *
   * @param {Mat3} a - The matrix.
   * @returns {String} String representation of this matrix.
   */


  var _proto = Mat3.prototype;

  _proto.toString = function toString() {
    var am = this.m;
    return "mat3(" + am[0] + ", " + am[1] + ", " + am[2] + ", " + am[3] + ", " + am[4] + ", " + am[5] + ", " + am[6] + ", " + am[7] + ", " + am[8] + ")";
  };

  return Mat3;
}();

exports["default"] = Mat3;
Mat3.sub = Mat3.subtract;
Mat3.mul = Mat3.multiply;
Mat3.IDENTITY = Object.freeze(new Mat3());
cc.Mat3 = Mat3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL21hdDMudHMiXSwibmFtZXMiOlsiTWF0MyIsImNyZWF0ZSIsIm0wMCIsIm0wMSIsIm0wMiIsIm0wMyIsIm0wNCIsIm0wNSIsIm0wNiIsIm0wNyIsIm0wOCIsImNsb25lIiwiYSIsImFtIiwibSIsImNvcHkiLCJvdXQiLCJzZXQiLCJtMTAiLCJtMTEiLCJtMTIiLCJtMjAiLCJtMjEiLCJtMjIiLCJvdXRtIiwiaWRlbnRpdHkiLCJ0cmFuc3Bvc2UiLCJhMDEiLCJhMDIiLCJhMTIiLCJpbnZlcnQiLCJhMDAiLCJhMTAiLCJhMTEiLCJhMjAiLCJhMjEiLCJhMjIiLCJiMDEiLCJiMTEiLCJiMjEiLCJkZXQiLCJhZGpvaW50IiwiZGV0ZXJtaW5hbnQiLCJtdWx0aXBseSIsImIiLCJibSIsImIwMCIsImIwMiIsImIxMCIsImIxMiIsImIyMCIsImIyMiIsIm11bHRpcGx5TWF0NCIsInRyYW5zbGF0ZSIsInYiLCJ4IiwieSIsInJvdGF0ZSIsInJhZCIsInMiLCJNYXRoIiwic2luIiwiYyIsImNvcyIsInNjYWxlIiwiZnJvbU1hdDQiLCJmcm9tVHJhbnNsYXRpb24iLCJmcm9tUm90YXRpb24iLCJmcm9tU2NhbGluZyIsImZyb21RdWF0IiwicSIsInoiLCJ3IiwieDIiLCJ5MiIsInoyIiwieHgiLCJ5eCIsInl5IiwiengiLCJ6eSIsInp6Iiwid3giLCJ3eSIsInd6IiwiZnJvbVZpZXdVcCIsInZpZXciLCJ1cCIsIl9mcm9tVmlld1VwSUlGRSIsImRlZmF1bHRfdXAiLCJWZWMzIiwibGVuZ3RoU3FyIiwiRVBTSUxPTiIsIm5vcm1hbGl6ZSIsImNyb3NzIiwibm9ybWFsRnJvbU1hdDQiLCJhMDMiLCJhMTMiLCJhMjMiLCJhMzAiLCJhMzEiLCJhMzIiLCJhMzMiLCJiMDMiLCJiMDQiLCJiMDUiLCJiMDYiLCJiMDciLCJiMDgiLCJiMDkiLCJmcm9iIiwic3FydCIsInBvdyIsImFkZCIsInN1YnRyYWN0IiwibXVsdGlwbHlTY2FsYXIiLCJtdWx0aXBseVNjYWxhckFuZEFkZCIsImV4YWN0RXF1YWxzIiwiZXF1YWxzIiwiYTAiLCJhMSIsImEyIiwiYTMiLCJhNCIsImE1IiwiYTYiLCJhNyIsImE4IiwiYjAiLCJiMSIsImIyIiwiYjMiLCJiNCIsImI1IiwiYjYiLCJiNyIsImI4IiwiYWJzIiwibWF4IiwidG9BcnJheSIsIm1hdCIsIm9mcyIsImkiLCJmcm9tQXJyYXkiLCJhcnIiLCJGTE9BVF9BUlJBWV9UWVBFIiwidG9TdHJpbmciLCJzdWIiLCJtdWwiLCJJREVOVElUWSIsIk9iamVjdCIsImZyZWV6ZSIsImNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE2QnFCQTtBQUlqQjs7Ozs7O0FBT0E7Ozs7Ozs7Ozs7Ozs7OztPQWVPQyxTQUFQLGdCQUFlQyxHQUFmLEVBQWdDQyxHQUFoQyxFQUFpREMsR0FBakQsRUFBa0VDLEdBQWxFLEVBQW1GQyxHQUFuRixFQUFvR0MsR0FBcEcsRUFBcUhDLEdBQXJILEVBQXNJQyxHQUF0SSxFQUF1SkMsR0FBdkosRUFBOEs7QUFBQSxRQUEvSlIsR0FBK0o7QUFBL0pBLE1BQUFBLEdBQStKLEdBQWpKLENBQWlKO0FBQUE7O0FBQUEsUUFBOUlDLEdBQThJO0FBQTlJQSxNQUFBQSxHQUE4SSxHQUFoSSxDQUFnSTtBQUFBOztBQUFBLFFBQTdIQyxHQUE2SDtBQUE3SEEsTUFBQUEsR0FBNkgsR0FBL0csQ0FBK0c7QUFBQTs7QUFBQSxRQUE1R0MsR0FBNEc7QUFBNUdBLE1BQUFBLEdBQTRHLEdBQTlGLENBQThGO0FBQUE7O0FBQUEsUUFBM0ZDLEdBQTJGO0FBQTNGQSxNQUFBQSxHQUEyRixHQUE3RSxDQUE2RTtBQUFBOztBQUFBLFFBQTFFQyxHQUEwRTtBQUExRUEsTUFBQUEsR0FBMEUsR0FBNUQsQ0FBNEQ7QUFBQTs7QUFBQSxRQUF6REMsR0FBeUQ7QUFBekRBLE1BQUFBLEdBQXlELEdBQTND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QUFPTCxHQUFQO0FBRUE7Ozs7O0FBSUFLLE1BQUFBLENBQUMsQ0FBQyxDQUFELENBQUQsR0FBT0osR0FBUDtBQUNIO0FBQ0o7QUFHRDs7Ozs7Ozs7OztTQU1Bd0ksV0FBQSxvQkFBWTtBQUNSLFFBQUlySSxFQUFFLEdBQUcsS0FBS0MsQ0FBZDtBQUNBLHFCQUFlRCxFQUFFLENBQUMsQ0FBRCxDQUFqQixVQUF5QkEsRUFBRSxDQUFDLENBQUQsQ0FBM0IsVUFBbUNBLEVBQUUsQ0FBQyxDQUFELENBQXJDLFVBQTZDQSxFQUFFLENBQUMsQ0FBRCxDQUEvQyxVQUF1REEsRUFBRSxDQUFDLENBQUQsQ0FBekQsVUFBaUVBLEVBQUUsQ0FBQyxDQUFELENBQW5FLFVBQTJFQSxFQUFFLENBQUMsQ0FBRCxDQUE3RSxVQUFxRkEsRUFBRSxDQUFDLENBQUQsQ0FBdkYsVUFBK0ZBLEVBQUUsQ0FBQyxDQUFELENBQWpHO0FBQ0g7Ozs7OztBQXQzQmdCYixLQUNWbUosTUFBTW5KLElBQUksQ0FBQ2tIO0FBRERsSCxLQUVWb0osTUFBTXBKLElBQUksQ0FBQzJDO0FBRkQzQyxLQVNWcUosV0FBV0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBSXZKLElBQUosRUFBZDtBQWczQnRCd0osRUFBRSxDQUFDeEosSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVBTSUxPTiwgRkxPQVRfQVJSQVlfVFlQRSB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzL3V0aWxzJztcbmltcG9ydCBWZWMzIGZyb20gJy4vdmVjMyc7XG5pbXBvcnQgVmVjMiBmcm9tICcuL3ZlYzInO1xuaW1wb3J0IE1hdDQgZnJvbSAnLi9tYXQ0JztcbmltcG9ydCBRdWF0IGZyb20gJy4vcXVhdCc7XG5cbi8qKlxuICogTWF0aGVtYXRpY2FsIDN4MyBtYXRyaXguXG4gKlxuICogTk9URTogd2UgdXNlIGNvbHVtbi1tYWpvciBtYXRyaXggZm9yIGFsbCBtYXRyaXggY2FsY3VsYXRpb24uXG4gKlxuICogVGhpcyBtYXkgbGVhZCB0byBzb21lIGNvbmZ1c2lvbiB3aGVuIHJlZmVyZW5jaW5nIE9wZW5HTCBkb2N1bWVudGF0aW9uLFxuICogaG93ZXZlciwgd2hpY2ggcmVwcmVzZW50cyBvdXQgYWxsIG1hdHJpY2llcyBpbiBjb2x1bW4tbWFqb3IgZm9ybWF0LlxuICogVGhpcyBtZWFucyB0aGF0IHdoaWxlIGluIGNvZGUgYSBtYXRyaXggbWF5IGJlIHR5cGVkIG91dCBhczpcbiAqXG4gKiBbMSwgMCwgMCwgMCxcbiAqICAwLCAxLCAwLCAwLFxuICogIDAsIDAsIDEsIDAsXG4gKiAgeCwgeSwgeiwgMF1cbiAqXG4gKiBUaGUgc2FtZSBtYXRyaXggaW4gdGhlIFtPcGVuR0wgZG9jdW1lbnRhdGlvbl0oaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvT3BlbkdMLVJlZnBhZ2VzL2dsMi4xL3hodG1sL2dsVHJhbnNsYXRlLnhtbClcbiAqIGlzIHdyaXR0ZW4gYXM6XG4gKlxuICogIDEgMCAwIHhcbiAqICAwIDEgMCB5XG4gKiAgMCAwIDEgelxuICogIDAgMCAwIDBcbiAqXG4gKiBQbGVhc2UgcmVzdCBhc3N1cmVkLCBob3dldmVyLCB0aGF0IHRoZXkgYXJlIHRoZSBzYW1lIHRoaW5nIVxuICogVGhpcyBpcyBub3QgdW5pcXVlIHRvIGdsTWF0cml4LCBlaXRoZXIsIGFzIE9wZW5HTCBkZXZlbG9wZXJzIGhhdmUgbG9uZyBiZWVuIGNvbmZ1c2VkIGJ5IHRoZVxuICogYXBwYXJlbnQgbGFjayBvZiBjb25zaXN0ZW5jeSBiZXR3ZWVuIHRoZSBtZW1vcnkgbGF5b3V0IGFuZCB0aGUgZG9jdW1lbnRhdGlvbi5cbiAqXG4gKiBAY2xhc3MgTWF0M1xuICogQGV4dGVuZHMgVmFsdWVUeXBlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hdDMge1xuICAgIHN0YXRpYyBzdWIgPSBNYXQzLnN1YnRyYWN0O1xuICAgIHN0YXRpYyBtdWwgPSBNYXQzLm11bHRpcGx5O1xuXG4gICAgLyoqXG4gICAgICogSWRlbnRpdHkgIG9mIE1hdDNcbiAgICAgKiBAcHJvcGVydHkge01hdDN9IElERU5USVRZXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBJREVOVElUWSA9IE9iamVjdC5mcmVlemUobmV3IE1hdDMoKSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbWF0cml4LCB3aXRoIGVsZW1lbnRzIHNwZWNpZmllZCBzZXBhcmF0ZWx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDAuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMSAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDEuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMiAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMyAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDAuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wNCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDEuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wNSAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wNiAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDAuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wNyAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDEuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG0wOCAtIFZhbHVlIGFzc2lnbmVkIHRvIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDIuXG4gICAgICogQHJldHVybnMge01hdDN9IFRoZSBuZXdseSBjcmVhdGVkIG1hdHJpeC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZSAobTAwOiBudW1iZXIgPSAxLCBtMDE6IG51bWJlciA9IDAsIG0wMjogbnVtYmVyID0gMCwgbTAzOiBudW1iZXIgPSAwLCBtMDQ6IG51bWJlciA9IDEsIG0wNTogbnVtYmVyID0gMCwgbTA2OiBudW1iZXIgPSAwLCBtMDc6IG51bWJlciA9IDAsIG0wODogbnVtYmVyID0gMSk6IE1hdDMge1xuICAgICAgICByZXR1cm4gbmV3IE1hdDMobTAwLCBtMDEsIG0wMiwgbTAzLCBtMDQsIG0wNSwgbTA2LCBtMDcsIG0wOCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvbmUgYSBtYXRyaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gY2xvbmUuXG4gICAgICogQHJldHVybnMge01hdDN9IFRoZSBuZXdseSBjcmVhdGVkIG1hdHJpeC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNsb25lIChhOiBNYXQzKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubTtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXQzKFxuICAgICAgICAgICAgYW1bMF0sIGFtWzFdLCBhbVsyXSxcbiAgICAgICAgICAgIGFtWzNdLCBhbVs0XSwgYW1bNV0sXG4gICAgICAgICAgICBhbVs2XSwgYW1bN10sIGFtWzhdXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29weSBjb250ZW50IG9mIGEgbWF0cml4IGludG8gYW5vdGhlci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIG1vZGlmaWVkLlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBzcGVjaWZpZWQgbWF0cml4LlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjb3B5IChvdXQ6IE1hdDMsIGE6IE1hdDMpOiBNYXQzIHtcbiAgICAgICAgb3V0Lm0uc2V0KGEubSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZWxlbWVudHMgb2YgYSBtYXRyaXggdG8gdGhlIGdpdmVuIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gVGhlIG1hdHJpeCB0byBtb2RpZmllZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTAyIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTEwIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTExIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTEyIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMSByb3cgMi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTIwIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbTIyIC0gVmFsdWUgYXNzaWduZWQgdG8gZWxlbWVudCBhdCBjb2x1bW4gMiByb3cgMi5cbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0IChvdXQ6IE1hdDMsIG0wMDogbnVtYmVyLCBtMDE6IG51bWJlciwgbTAyOiBudW1iZXIsIG0xMDogbnVtYmVyLCBtMTE6IG51bWJlciwgbTEyOiBudW1iZXIsIG0yMDogbnVtYmVyLCBtMjE6IG51bWJlciwgbTIyOiBudW1iZXIpOiBNYXQzIHtcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IG0wMDtcbiAgICAgICAgb3V0bVsxXSA9IG0wMTtcbiAgICAgICAgb3V0bVsyXSA9IG0wMjtcbiAgICAgICAgb3V0bVszXSA9IG0xMDtcbiAgICAgICAgb3V0bVs0XSA9IG0xMTtcbiAgICAgICAgb3V0bVs1XSA9IG0xMjtcbiAgICAgICAgb3V0bVs2XSA9IG0yMDtcbiAgICAgICAgb3V0bVs3XSA9IG0yMTtcbiAgICAgICAgb3V0bVs4XSA9IG0yMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXR1cm4gYW4gaWRlbnRpdHkgbWF0cml4LlxuICAgICAqXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGlkZW50aXR5IChvdXQ6IE1hdDMpOiBNYXQzIHtcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IDE7XG4gICAgICAgIG91dG1bMV0gPSAwO1xuICAgICAgICBvdXRtWzJdID0gMDtcbiAgICAgICAgb3V0bVszXSA9IDA7XG4gICAgICAgIG91dG1bNF0gPSAxO1xuICAgICAgICBvdXRtWzVdID0gMDtcbiAgICAgICAgb3V0bVs2XSA9IDA7XG4gICAgICAgIG91dG1bN10gPSAwO1xuICAgICAgICBvdXRtWzhdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc3Bvc2VzIGEgbWF0cml4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byB0cmFuc3Bvc2UuXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRyYW5zcG9zZSAob3V0OiBNYXQzLCBhOiBNYXQzKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xuICAgICAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgICAgIGxldCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sIGExMiA9IGFtWzVdO1xuICAgICAgICAgICAgb3V0bVsxXSA9IGFtWzNdO1xuICAgICAgICAgICAgb3V0bVsyXSA9IGFtWzZdO1xuICAgICAgICAgICAgb3V0bVszXSA9IGEwMTtcbiAgICAgICAgICAgIG91dG1bNV0gPSBhbVs3XTtcbiAgICAgICAgICAgIG91dG1bNl0gPSBhMDI7XG4gICAgICAgICAgICBvdXRtWzddID0gYTEyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0bVswXSA9IGFtWzBdO1xuICAgICAgICAgICAgb3V0bVsxXSA9IGFtWzNdO1xuICAgICAgICAgICAgb3V0bVsyXSA9IGFtWzZdO1xuICAgICAgICAgICAgb3V0bVszXSA9IGFtWzFdO1xuICAgICAgICAgICAgb3V0bVs0XSA9IGFtWzRdO1xuICAgICAgICAgICAgb3V0bVs1XSA9IGFtWzddO1xuICAgICAgICAgICAgb3V0bVs2XSA9IGFtWzJdO1xuICAgICAgICAgICAgb3V0bVs3XSA9IGFtWzVdO1xuICAgICAgICAgICAgb3V0bVs4XSA9IGFtWzhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnZlcnRzIGEgbWF0cml4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBpbnZlcnQuXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGludmVydCAob3V0OiBNYXQzLCBhOiBNYXQzKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xuICAgICAgICBsZXQgYTAwID0gYW1bMF0sIGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSxcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXG4gICAgICAgICAgICBhMjAgPSBhbVs2XSwgYTIxID0gYW1bN10sIGEyMiA9IGFtWzhdO1xuXG4gICAgICAgIGxldCBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjE7XG4gICAgICAgIGxldCBiMTEgPSAtYTIyICogYTEwICsgYTEyICogYTIwO1xuICAgICAgICBsZXQgYjIxID0gYTIxICogYTEwIC0gYTExICogYTIwO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgbGV0IGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgICAgICBpZiAoIWRldCkge1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBkZXQgPSAxLjAgLyBkZXQ7XG5cbiAgICAgICAgb3V0bVswXSA9IGIwMSAqIGRldDtcbiAgICAgICAgb3V0bVsxXSA9ICgtYTIyICogYTAxICsgYTAyICogYTIxKSAqIGRldDtcbiAgICAgICAgb3V0bVsyXSA9IChhMTIgKiBhMDEgLSBhMDIgKiBhMTEpICogZGV0O1xuICAgICAgICBvdXRtWzNdID0gYjExICogZGV0O1xuICAgICAgICBvdXRtWzRdID0gKGEyMiAqIGEwMCAtIGEwMiAqIGEyMCkgKiBkZXQ7XG4gICAgICAgIG91dG1bNV0gPSAoLWExMiAqIGEwMCArIGEwMiAqIGExMCkgKiBkZXQ7XG4gICAgICAgIG91dG1bNl0gPSBiMjEgKiBkZXQ7XG4gICAgICAgIG91dG1bN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBkZXQ7XG4gICAgICAgIG91dG1bOF0gPSAoYTExICogYTAwIC0gYTAxICogYTEwKSAqIGRldDtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gY2FsY3VsYXRlLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBhZGpvaW50IChvdXQ6IE1hdDMsIGE6IE1hdDMpOiBNYXQzIHtcbiAgICAgICAgbGV0IGFtID0gYS5tLCBvdXRtID0gb3V0Lm07XG4gICAgICAgIGxldCBhMDAgPSBhbVswXSwgYTAxID0gYW1bMV0sIGEwMiA9IGFtWzJdLFxuICAgICAgICAgICAgYTEwID0gYW1bM10sIGExMSA9IGFtWzRdLCBhMTIgPSBhbVs1XSxcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XG5cbiAgICAgICAgb3V0bVswXSA9IChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpO1xuICAgICAgICBvdXRtWzFdID0gKGEwMiAqIGEyMSAtIGEwMSAqIGEyMik7XG4gICAgICAgIG91dG1bMl0gPSAoYTAxICogYTEyIC0gYTAyICogYTExKTtcbiAgICAgICAgb3V0bVszXSA9IChhMTIgKiBhMjAgLSBhMTAgKiBhMjIpO1xuICAgICAgICBvdXRtWzRdID0gKGEwMCAqIGEyMiAtIGEwMiAqIGEyMCk7XG4gICAgICAgIG91dG1bNV0gPSAoYTAyICogYTEwIC0gYTAwICogYTEyKTtcbiAgICAgICAgb3V0bVs2XSA9IChhMTAgKiBhMjEgLSBhMTEgKiBhMjApO1xuICAgICAgICBvdXRtWzddID0gKGEwMSAqIGEyMCAtIGEwMCAqIGEyMSk7XG4gICAgICAgIG91dG1bOF0gPSAoYTAwICogYTExIC0gYTAxICogYTEwKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdHJpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBjYWxjdWxhdGUuXG4gICAgICogQHJldHVybnMge051bWJlcn0gRGV0ZXJtaW5hbnQgb2YgYS5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRldGVybWluYW50IChhOiBNYXQzKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGFtID0gYS5tO1xuICAgICAgICBsZXQgYTAwID0gYW1bMF0sIGEwMSA9IGFtWzFdLCBhMDIgPSBhbVsyXSxcbiAgICAgICAgICAgIGExMCA9IGFtWzNdLCBhMTEgPSBhbVs0XSwgYTEyID0gYW1bNV0sXG4gICAgICAgICAgICBhMjAgPSBhbVs2XSwgYTIxID0gYW1bN10sIGEyMiA9IGFtWzhdO1xuXG4gICAgICAgIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE11bHRpcGx5IHR3byBtYXRyaWNlcyBleHBsaWNpdGx5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBmaXJzdCBvcGVyYW5kLlxuICAgICAqIEBwYXJhbSB7TWF0M30gYiAtIFRoZSBzZWNvbmQgb3BlcmFuZC5cbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHkgKG91dDogTWF0MywgYTogTWF0MywgYjogTWF0Myk6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XG4gICAgICAgIGxldCBhMDAgPSBhbVswXSwgYTAxID0gYW1bMV0sIGEwMiA9IGFtWzJdLFxuICAgICAgICAgICAgYTEwID0gYW1bM10sIGExMSA9IGFtWzRdLCBhMTIgPSBhbVs1XSxcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XG5cbiAgICAgICAgbGV0IGIwMCA9IGJtWzBdLCBiMDEgPSBibVsxXSwgYjAyID0gYm1bMl07XG4gICAgICAgIGxldCBiMTAgPSBibVszXSwgYjExID0gYm1bNF0sIGIxMiA9IGJtWzVdO1xuICAgICAgICBsZXQgYjIwID0gYm1bNl0sIGIyMSA9IGJtWzddLCBiMjIgPSBibVs4XTtcblxuICAgICAgICBvdXRtWzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgICAgICBvdXRtWzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgICAgICBvdXRtWzJdID0gYjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyO1xuXG4gICAgICAgIG91dG1bM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgICAgIG91dG1bNF0gPSBiMTAgKiBhMDEgKyBiMTEgKiBhMTEgKyBiMTIgKiBhMjE7XG4gICAgICAgIG91dG1bNV0gPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XG5cbiAgICAgICAgb3V0bVs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICAgICAgb3V0bVs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICAgICAgb3V0bVs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRha2UgdGhlIGZpcnN0IHRoaXJkIG9yZGVyIG9mIHRoZSBmb3VydGggb3JkZXIgbWF0cml4IGFuZCBtdWx0aXBseSBieSB0aGUgdGhpcmQgb3JkZXIgbWF0cml4XG4gICAgICogISN6aCDlj5blm5vpmLbnn6npmLXnmoTliY3kuInpmLbvvIzkuI7kuInpmLbnn6npmLXnm7jkuZhcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG9wZXJhbmQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseU1hdDQgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IElNYXQ0TGlrZSkge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XG4gICAgICAgIGxldCBhMDAgPSBhbVswXSwgYTAxID0gYW1bMV0sIGEwMiA9IGFtWzJdLFxuICAgICAgICAgICAgYTEwID0gYW1bM10sIGExMSA9IGFtWzRdLCBhMTIgPSBhbVs1XSxcbiAgICAgICAgICAgIGEyMCA9IGFtWzZdLCBhMjEgPSBhbVs3XSwgYTIyID0gYW1bOF07XG5cbiAgICAgICAgY29uc3QgYjAwID0gYm1bMF0sIGIwMSA9IGJtWzFdLCBiMDIgPSBibVsyXTtcbiAgICAgICAgY29uc3QgYjEwID0gYm1bNF0sIGIxMSA9IGJtWzVdLCBiMTIgPSBibVs2XTtcbiAgICAgICAgY29uc3QgYjIwID0gYm1bOF0sIGIyMSA9IGJtWzldLCBiMjIgPSBibVsxMF07XG5cbiAgICAgICAgb3V0bVswXSA9IGIwMCAqIGEwMCArIGIwMSAqIGExMCArIGIwMiAqIGEyMDtcbiAgICAgICAgb3V0bVsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcbiAgICAgICAgb3V0bVsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcbiAgICAgICAgb3V0bVszXSA9IGIxMCAqIGEwMCArIGIxMSAqIGExMCArIGIxMiAqIGEyMDtcbiAgICAgICAgb3V0bVs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICAgICAgb3V0bVs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcbiAgICAgICAgb3V0bVs2XSA9IGIyMCAqIGEwMCArIGIyMSAqIGExMCArIGIyMiAqIGEyMDtcbiAgICAgICAgb3V0bVs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICAgICAgb3V0bVs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNdWx0aXBseSBhIG1hdHJpeCB3aXRoIGEgdHJhbnNsYXRpb24gbWF0cml4IGdpdmVuIGJ5IGEgdHJhbnNsYXRpb24gb2Zmc2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBtdWx0aXBseS5cbiAgICAgKiBAcGFyYW0ge3ZlYzJ9IHYgLSBUaGUgdHJhbnNsYXRpb24gb2Zmc2V0LlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2xhdGUgKG91dDogTWF0MywgYTogTWF0MywgdjogVmVjMik6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXG4gICAgICAgICAgICBhMTAgPSBhbVszXSwgYTExID0gYW1bNF0sIGExMiA9IGFtWzVdLFxuICAgICAgICAgICAgYTIwID0gYW1bNl0sIGEyMSA9IGFtWzddLCBhMjIgPSBhbVs4XTtcbiAgICAgICAgbGV0IHggPSB2LngsIHkgPSB2Lnk7XG5cbiAgICAgICAgb3V0bVswXSA9IGEwMDtcbiAgICAgICAgb3V0bVsxXSA9IGEwMTtcbiAgICAgICAgb3V0bVsyXSA9IGEwMjtcblxuICAgICAgICBvdXRtWzNdID0gYTEwO1xuICAgICAgICBvdXRtWzRdID0gYTExO1xuICAgICAgICBvdXRtWzVdID0gYTEyO1xuXG4gICAgICAgIG91dG1bNl0gPSB4ICogYTAwICsgeSAqIGExMCArIGEyMDtcbiAgICAgICAgb3V0bVs3XSA9IHggKiBhMDEgKyB5ICogYTExICsgYTIxO1xuICAgICAgICBvdXRtWzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gTWF0cml4IHRvIHJvdGF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIC0gVGhlIHJvdGF0aW9uIGFuZ2xlLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJvdGF0ZSAob3V0OiBNYXQzLCBhOiBNYXQzLCByYWQ6IG51bWJlcik6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sXG4gICAgICAgICAgICBhMTAgPSBhbVszXSwgYTExID0gYW1bNF0sIGExMiA9IGFtWzVdLFxuICAgICAgICAgICAgYTIwID0gYW1bNl0sIGEyMSA9IGFtWzddLCBhMjIgPSBhbVs4XTtcblxuICAgICAgICBsZXQgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgICAgIGxldCBjID0gTWF0aC5jb3MocmFkKTtcblxuICAgICAgICBvdXRtWzBdID0gYyAqIGEwMCArIHMgKiBhMTA7XG4gICAgICAgIG91dG1bMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICAgICAgb3V0bVsyXSA9IGMgKiBhMDIgKyBzICogYTEyO1xuXG4gICAgICAgIG91dG1bM10gPSBjICogYTEwIC0gcyAqIGEwMDtcbiAgICAgICAgb3V0bVs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgICAgICBvdXRtWzVdID0gYyAqIGExMiAtIHMgKiBhMDI7XG5cbiAgICAgICAgb3V0bVs2XSA9IGEyMDtcbiAgICAgICAgb3V0bVs3XSA9IGEyMTtcbiAgICAgICAgb3V0bVs4XSA9IGEyMjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNdWx0aXBseSBhIG1hdHJpeCB3aXRoIGEgc2NhbGUgbWF0cml4IGdpdmVuIGJ5IGEgc2NhbGUgdmVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBtdWx0aXBseS5cbiAgICAgKiBAcGFyYW0ge3ZlYzJ9IHYgLSBUaGUgc2NhbGUgdmVjdG9yLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXRcbiAgICAgKiovXG4gICAgc3RhdGljIHNjYWxlIChvdXQ6IE1hdDMsIGE6IE1hdDMsIHY6IFZlYzIpOiBNYXQzIHtcbiAgICAgICAgbGV0IHggPSB2LngsIHkgPSB2Lnk7XG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xuXG4gICAgICAgIG91dG1bMF0gPSB4ICogYW1bMF07XG4gICAgICAgIG91dG1bMV0gPSB4ICogYW1bMV07XG4gICAgICAgIG91dG1bMl0gPSB4ICogYW1bMl07XG5cbiAgICAgICAgb3V0bVszXSA9IHkgKiBhbVszXTtcbiAgICAgICAgb3V0bVs0XSA9IHkgKiBhbVs0XTtcbiAgICAgICAgb3V0bVs1XSA9IHkgKiBhbVs1XTtcblxuICAgICAgICBvdXRtWzZdID0gYW1bNl07XG4gICAgICAgIG91dG1bN10gPSBhbVs3XTtcbiAgICAgICAgb3V0bVs4XSA9IGFtWzhdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvcGllcyB0aGUgdXBwZXItbGVmdCAzeDMgdmFsdWVzIG9mIGEgNHg0IG1hdHJpeCBpbnRvIGEgM3gzIG1hdHJpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge21hdDR9IGEgLSBUaGUgNHg0IG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbU1hdDQgKG91dDogTWF0MywgYTogTWF0NCk6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdO1xuICAgICAgICBvdXRtWzFdID0gYW1bMV07XG4gICAgICAgIG91dG1bMl0gPSBhbVsyXTtcbiAgICAgICAgb3V0bVszXSA9IGFtWzRdO1xuICAgICAgICBvdXRtWzRdID0gYW1bNV07XG4gICAgICAgIG91dG1bNV0gPSBhbVs2XTtcbiAgICAgICAgb3V0bVs2XSA9IGFtWzhdO1xuICAgICAgICBvdXRtWzddID0gYW1bOV07XG4gICAgICAgIG91dG1bOF0gPSBhbVsxMF07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdHJhbnNsYXRpb24gb2Zmc2V0LlxuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDMudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHt2ZWMyfSB2IC0gVGhlIHRyYW5zbGF0aW9uIG9mZnNldC5cbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVRyYW5zbGF0aW9uIChvdXQ6IE1hdDMsIHY6IFZlYzIpOiBNYXQzIHtcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IDE7XG4gICAgICAgIG91dG1bMV0gPSAwO1xuICAgICAgICBvdXRtWzJdID0gMDtcbiAgICAgICAgb3V0bVszXSA9IDA7XG4gICAgICAgIG91dG1bNF0gPSAxO1xuICAgICAgICBvdXRtWzVdID0gMDtcbiAgICAgICAgb3V0bVs2XSA9IHYueDtcbiAgICAgICAgb3V0bVs3XSA9IHYueTtcbiAgICAgICAgb3V0bVs4XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUuXG4gICAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAgICpcbiAgICAgKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAgICAgKiAgICAgbWF0My5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIC0gVGhlIHJvdGF0aW9uIGFuZ2xlLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUm90YXRpb24gKG91dDogTWF0MywgcmFkOiBudW1iZXIpOiBNYXQzIHtcbiAgICAgICAgbGV0IHMgPSBNYXRoLnNpbihyYWQpLCBjID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcblxuICAgICAgICBvdXRtWzBdID0gYztcbiAgICAgICAgb3V0bVsxXSA9IHM7XG4gICAgICAgIG91dG1bMl0gPSAwO1xuXG4gICAgICAgIG91dG1bM10gPSAtcztcbiAgICAgICAgb3V0bVs0XSA9IGM7XG4gICAgICAgIG91dG1bNV0gPSAwO1xuXG4gICAgICAgIG91dG1bNl0gPSAwO1xuICAgICAgICBvdXRtWzddID0gMDtcbiAgICAgICAgb3V0bVs4XSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgc2NhbGUgdmVjdG9yLlxuICAgICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgICAqXG4gICAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAgICogICAgIG1hdDMuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge3ZlYzJ9IHYgLSBTY2FsZSB2ZWN0b3IuXG4gICAgICogQHJldHVybnMge01hdDN9IG91dC5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21TY2FsaW5nIChvdXQ6IE1hdDMsIHY6IFZlYzIpOiBNYXQzIHtcbiAgICAgICAgbGV0IG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IHYueDtcbiAgICAgICAgb3V0bVsxXSA9IDA7XG4gICAgICAgIG91dG1bMl0gPSAwO1xuXG4gICAgICAgIG91dG1bM10gPSAwO1xuICAgICAgICBvdXRtWzRdID0gdi55O1xuICAgICAgICBvdXRtWzVdID0gMDtcblxuICAgICAgICBvdXRtWzZdID0gMDtcbiAgICAgICAgb3V0bVs3XSA9IDA7XG4gICAgICAgIG91dG1bOF0gPSAxO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZXMgYSAzeDMgbWF0cml4IGZyb20gdGhlIGdpdmVuIHF1YXRlcm5pb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtxdWF0fSBxIC0gVGhlIHF1YXRlcm5pb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVF1YXQgKG91dDogTWF0MywgcTogUXVhdCk6IE1hdDMge1xuICAgICAgICBsZXQgb3V0bSA9IG91dC5tO1xuICAgICAgICBsZXQgeCA9IHEueCwgeSA9IHEueSwgeiA9IHEueiwgdyA9IHEudztcbiAgICAgICAgbGV0IHgyID0geCArIHg7XG4gICAgICAgIGxldCB5MiA9IHkgKyB5O1xuICAgICAgICBsZXQgejIgPSB6ICsgejtcblxuICAgICAgICBsZXQgeHggPSB4ICogeDI7XG4gICAgICAgIGxldCB5eCA9IHkgKiB4MjtcbiAgICAgICAgbGV0IHl5ID0geSAqIHkyO1xuICAgICAgICBsZXQgenggPSB6ICogeDI7XG4gICAgICAgIGxldCB6eSA9IHogKiB5MjtcbiAgICAgICAgbGV0IHp6ID0geiAqIHoyO1xuICAgICAgICBsZXQgd3ggPSB3ICogeDI7XG4gICAgICAgIGxldCB3eSA9IHcgKiB5MjtcbiAgICAgICAgbGV0IHd6ID0gdyAqIHoyO1xuXG4gICAgICAgIG91dG1bMF0gPSAxIC0geXkgLSB6ejtcbiAgICAgICAgb3V0bVszXSA9IHl4IC0gd3o7XG4gICAgICAgIG91dG1bNl0gPSB6eCArIHd5O1xuXG4gICAgICAgIG91dG1bMV0gPSB5eCArIHd6O1xuICAgICAgICBvdXRtWzRdID0gMSAtIHh4IC0geno7XG4gICAgICAgIG91dG1bN10gPSB6eSAtIHd4O1xuXG4gICAgICAgIG91dG1bMl0gPSB6eCAtIHd5O1xuICAgICAgICBvdXRtWzVdID0genkgKyB3eDtcbiAgICAgICAgb3V0bVs4XSA9IDEgLSB4eCAtIHl5O1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB2aWV3IGRpcmVjdGlvbiBhbmQgdXAgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7dmVjM30gdmlldyAtIFZpZXcgZGlyZWN0aW9uIChtdXN0IGJlIG5vcm1hbGl6ZWQpLlxuICAgICAqIEBwYXJhbSB7dmVjM30gW3VwXSAtIFVwIGRpcmVjdGlvbiwgZGVmYXVsdCBpcyAoMCwxLDApIChtdXN0IGJlIG5vcm1hbGl6ZWQpLlxuICAgICAqXG4gICAgICogQHJldHVybnMge01hdDN9IG91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVZpZXdVcCAob3V0OiBNYXQzLCB2aWV3OiBWZWMzLCB1cD86IFZlYzMpOiBNYXQzIHtcbiAgICAgICAgbGV0IF9mcm9tVmlld1VwSUlGRSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgZGVmYXVsdF91cCA9IG5ldyBWZWMzKDAsIDEsIDApO1xuICAgICAgICAgICAgbGV0IHggPSBuZXcgVmVjMygpO1xuICAgICAgICAgICAgbGV0IHkgPSBuZXcgVmVjMygpO1xuXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG91dCwgdmlldywgdXApIHtcbiAgICAgICAgICAgICAgICBpZiAoVmVjMy5sZW5ndGhTcXIodmlldykgPCBFUFNJTE9OICogRVBTSUxPTikge1xuICAgICAgICAgICAgICAgICAgICBNYXQzLmlkZW50aXR5KG91dCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdXAgPSB1cCB8fCBkZWZhdWx0X3VwO1xuICAgICAgICAgICAgICAgIFZlYzMubm9ybWFsaXplKHgsIFZlYzMuY3Jvc3MoeCwgdXAsIHZpZXcpKTtcblxuICAgICAgICAgICAgICAgIGlmIChWZWMzLmxlbmd0aFNxcih4KSA8IEVQU0lMT04gKiBFUFNJTE9OKSB7XG4gICAgICAgICAgICAgICAgICAgIE1hdDMuaWRlbnRpdHkob3V0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBWZWMzLmNyb3NzKHksIHZpZXcsIHgpO1xuICAgICAgICAgICAgICAgIE1hdDMuc2V0KFxuICAgICAgICAgICAgICAgICAgICBvdXQsXG4gICAgICAgICAgICAgICAgICAgIHgueCwgeC55LCB4LnosXG4gICAgICAgICAgICAgICAgICAgIHkueCwgeS55LCB5LnosXG4gICAgICAgICAgICAgICAgICAgIHZpZXcueCwgdmlldy55LCB2aWV3LnpcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiBfZnJvbVZpZXdVcElJRkUob3V0LCB2aWV3LCB1cCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TWF0M30gb3V0IC0gTWF0cml4IHRvIHN0b3JlIHJlc3VsdC5cbiAgICAgKiBAcGFyYW0ge21hdDR9IGEgLSBBIDR4NCBtYXRyaXggdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb20uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbm9ybWFsRnJvbU1hdDQgKG91dDogTWF0MywgYTogTWF0NCk6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgbGV0IGEwMCA9IGFtWzBdLCBhMDEgPSBhbVsxXSwgYTAyID0gYW1bMl0sIGEwMyA9IGFtWzNdLFxuICAgICAgICAgICAgYTEwID0gYW1bNF0sIGExMSA9IGFtWzVdLCBhMTIgPSBhbVs2XSwgYTEzID0gYW1bN10sXG4gICAgICAgICAgICBhMjAgPSBhbVs4XSwgYTIxID0gYW1bOV0sIGEyMiA9IGFtWzEwXSwgYTIzID0gYW1bMTFdLFxuICAgICAgICAgICAgYTMwID0gYW1bMTJdLCBhMzEgPSBhbVsxM10sIGEzMiA9IGFtWzE0XSwgYTMzID0gYW1bMTVdO1xuXG4gICAgICAgIGxldCBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgICAgIGxldCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgICAgIGxldCBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgICAgIGxldCBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgICAgIGxldCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgICAgIGxldCBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgICAgIGxldCBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgICAgIGxldCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgICAgIGxldCBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgICAgIGxldCBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgICAgIGxldCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgICAgIGxldCBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuICAgICAgICBsZXQgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgICAgIGlmICghZGV0KSB7XG4gICAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9XG4gICAgICAgIGRldCA9IDEuMCAvIGRldDtcblxuICAgICAgICBvdXRtWzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgICAgIG91dG1bMV0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICAgICAgb3V0bVsyXSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuXG4gICAgICAgIG91dG1bM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICAgICAgb3V0bVs0XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgICAgICBvdXRtWzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG5cbiAgICAgICAgb3V0bVs2XSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgICAgICBvdXRtWzddID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgICAgIG91dG1bOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXRyaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBNYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0gVGhlIGZyb2Jlbml1cyBub3JtLlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvYiAoYTogTWF0Myk6IG51bWJlciB7XG4gICAgICAgIGxldCBhbSA9IGEubTtcbiAgICAgICAgcmV0dXJuIChNYXRoLnNxcnQoTWF0aC5wb3coYW1bMF0sIDIpICsgTWF0aC5wb3coYW1bMV0sIDIpICsgTWF0aC5wb3coYW1bMl0sIDIpICsgTWF0aC5wb3coYW1bM10sIDIpICsgTWF0aC5wb3coYW1bNF0sIDIpICsgTWF0aC5wb3coYW1bNV0sIDIpICsgTWF0aC5wb3coYW1bNl0sIDIpICsgTWF0aC5wb3coYW1bN10sIDIpICsgTWF0aC5wb3coYW1bOF0sIDIpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyB0d28gbWF0cmljZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG9wZXJhbmQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBhZGQgKG91dDogTWF0MywgYTogTWF0MywgYjogTWF0Myk6IE1hdDMge1xuICAgICAgICBsZXQgYW0gPSBhLm0sIGJtID0gYi5tLCBvdXRtID0gb3V0Lm07XG4gICAgICAgIG91dG1bMF0gPSBhbVswXSArIGJtWzBdO1xuICAgICAgICBvdXRtWzFdID0gYW1bMV0gKyBibVsxXTtcbiAgICAgICAgb3V0bVsyXSA9IGFtWzJdICsgYm1bMl07XG4gICAgICAgIG91dG1bM10gPSBhbVszXSArIGJtWzNdO1xuICAgICAgICBvdXRtWzRdID0gYW1bNF0gKyBibVs0XTtcbiAgICAgICAgb3V0bVs1XSA9IGFtWzVdICsgYm1bNV07XG4gICAgICAgIG91dG1bNl0gPSBhbVs2XSArIGJtWzZdO1xuICAgICAgICBvdXRtWzddID0gYW1bN10gKyBibVs3XTtcbiAgICAgICAgb3V0bVs4XSA9IGFtWzhdICsgYm1bOF07XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IG91dCAtIE1hdHJpeCB0byBzdG9yZSByZXN1bHQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG9wZXJhbmQuXG4gICAgICogQHBhcmFtIHtNYXQzfSBiIC0gVGhlIHNlY29uZCBvcGVyYW5kLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdWJ0cmFjdCAob3V0OiBNYXQzLCBhOiBNYXQzLCBiOiBNYXQzKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdIC0gYm1bMF07XG4gICAgICAgIG91dG1bMV0gPSBhbVsxXSAtIGJtWzFdO1xuICAgICAgICBvdXRtWzJdID0gYW1bMl0gLSBibVsyXTtcbiAgICAgICAgb3V0bVszXSA9IGFtWzNdIC0gYm1bM107XG4gICAgICAgIG91dG1bNF0gPSBhbVs0XSAtIGJtWzRdO1xuICAgICAgICBvdXRtWzVdID0gYW1bNV0gLSBibVs1XTtcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdIC0gYm1bNl07XG4gICAgICAgIG91dG1bN10gPSBhbVs3XSAtIGJtWzddO1xuICAgICAgICBvdXRtWzhdID0gYW1bOF0gLSBibVs4XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgYSBtYXRyaXggYnkgYSBzY2FsYXIgbnVtYmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIE1hdHJpeCB0byBzY2FsZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiIC0gVGhlIHNjYWxlIG51bWJlci5cbiAgICAgKiBAcmV0dXJucyB7TWF0M30gb3V0LlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgKG91dDogTWF0MywgYTogTWF0MywgYjogbnVtYmVyKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgb3V0bSA9IG91dC5tO1xuICAgICAgICBvdXRtWzBdID0gYW1bMF0gKiBiO1xuICAgICAgICBvdXRtWzFdID0gYW1bMV0gKiBiO1xuICAgICAgICBvdXRtWzJdID0gYW1bMl0gKiBiO1xuICAgICAgICBvdXRtWzNdID0gYW1bM10gKiBiO1xuICAgICAgICBvdXRtWzRdID0gYW1bNF0gKiBiO1xuICAgICAgICBvdXRtWzVdID0gYW1bNV0gKiBiO1xuICAgICAgICBvdXRtWzZdID0gYW1bNl0gKiBiO1xuICAgICAgICBvdXRtWzddID0gYW1bN10gKiBiO1xuICAgICAgICBvdXRtWzhdID0gYW1bOF0gKiBiO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgdHdvIG1hdHJpY2VzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgbnVtYmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBvdXQgLSBNYXRyaXggdG8gc3RvcmUgcmVzdWx0LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYSAtIFRoZSBmaXJzdCBvcGVyYW5kLlxuICAgICAqIEBwYXJhbSB7TWF0M30gYiAtIFRoZSBzZWNvbmQgb3BlcmFuZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgLSBUaGUgc2NhbGUgbnVtYmVyLlxuICAgICAqIEByZXR1cm5zIHtNYXQzfSBvdXQuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseVNjYWxhckFuZEFkZCAob3V0OiBNYXQzLCBhOiBNYXQzLCBiOiBNYXQzLCBzY2FsZTogbnVtYmVyKTogTWF0MyB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm0sIG91dG0gPSBvdXQubTtcbiAgICAgICAgb3V0bVswXSA9IGFtWzBdICsgKGJtWzBdICogc2NhbGUpO1xuICAgICAgICBvdXRtWzFdID0gYW1bMV0gKyAoYm1bMV0gKiBzY2FsZSk7XG4gICAgICAgIG91dG1bMl0gPSBhbVsyXSArIChibVsyXSAqIHNjYWxlKTtcbiAgICAgICAgb3V0bVszXSA9IGFtWzNdICsgKGJtWzNdICogc2NhbGUpO1xuICAgICAgICBvdXRtWzRdID0gYW1bNF0gKyAoYm1bNF0gKiBzY2FsZSk7XG4gICAgICAgIG91dG1bNV0gPSBhbVs1XSArIChibVs1XSAqIHNjYWxlKTtcbiAgICAgICAgb3V0bVs2XSA9IGFtWzZdICsgKGJtWzZdICogc2NhbGUpO1xuICAgICAgICBvdXRtWzddID0gYW1bN10gKyAoYm1bN10gKiBzY2FsZSk7XG4gICAgICAgIG91dG1bOF0gPSBhbVs4XSArIChibVs4XSAqIHNjYWxlKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBtYXRyaWNlcyBhcmUgZXF1YWwuIChDb21wYXJlZCB1c2luZyA9PT0pXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBUaGUgZmlyc3QgbWF0cml4LlxuICAgICAqIEBwYXJhbSB7TWF0M30gYiAtIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGV4YWN0RXF1YWxzIChhOiBNYXQzLCBiOiBNYXQzKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm07XG4gICAgICAgIHJldHVybiBhbVswXSA9PT0gYm1bMF0gJiYgYW1bMV0gPT09IGJtWzFdICYmIGFtWzJdID09PSBibVsyXSAmJlxuICAgICAgICAgICAgYW1bM10gPT09IGJtWzNdICYmIGFtWzRdID09PSBibVs0XSAmJiBhbVs1XSA9PT0gYm1bNV0gJiZcbiAgICAgICAgICAgIGFtWzZdID09PSBibVs2XSAmJiBhbVs3XSA9PT0gYm1bN10gJiYgYW1bOF0gPT09IGJtWzhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG1hdHJpY2VzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXQzfSBhIC0gVGhlIGZpcnN0IG1hdHJpeC5cbiAgICAgKiBAcGFyYW0ge01hdDN9IGIgLSBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHMgKGE6IE1hdDMsIGI6IE1hdDMpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGFtID0gYS5tLCBibSA9IGIubTtcbiAgICAgICAgbGV0IGEwID0gYW1bMF0sIGExID0gYW1bMV0sIGEyID0gYW1bMl0sIGEzID0gYW1bM10sIGE0ID0gYW1bNF0sIGE1ID0gYW1bNV0sIGE2ID0gYW1bNl0sIGE3ID0gYW1bN10sIGE4ID0gYW1bOF07XG4gICAgICAgIGxldCBiMCA9IGJtWzBdLCBiMSA9IGJtWzFdLCBiMiA9IGJtWzJdLCBiMyA9IGJtWzNdLCBiNCA9IGJtWzRdLCBiNSA9IGJtWzVdLCBiNiA9IGJtWzZdLCBiNyA9IGJtWzddLCBiOCA9IGJtWzhdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTMgLSBiMykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE1IC0gYjUpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJlxuICAgICAgICAgICAgTWF0aC5hYnMoYTYgLSBiNikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTYpLCBNYXRoLmFicyhiNikpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhNyAtIGI3KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiZcbiAgICAgICAgICAgIE1hdGguYWJzKGE4IC0gYjgpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg55+p6Zi16L2s5pWw57uEXG4gICAgICogISNlbiBNYXRyaXggdHJhbnNwb3NlIGFycmF5XG4gICAgICogQG1ldGhvZCB0b0FycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiB0b0FycmF5IDxPdXQgZXh0ZW5kcyBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPj4gKG91dDogT3V0LCBtYXQ6IElNYXQzTGlrZSwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4TlhoXnmoTotbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIG1hdDogSU1hdDNMaWtlLCBvZnMgPSAwKSB7XG4gICAgICAgIGxldCBtID0gbWF0Lm07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgOTsgaSsrKSB7XG4gICAgICAgICAgICBvdXRbb2ZzICsgaV0gPSBtW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmlbDnu4Tovaznn6npmLVcbiAgICAgKiAhI2VuIFRyYW5zZmVyIG1hdHJpeCBhcnJheVxuICAgICAqIEBtZXRob2QgZnJvbUFycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAcGFyYW0gb2ZzIOaVsOe7hOi1t+Wni+WBj+enu+mHj1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUFycmF5IDxPdXQgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb2ZzID0gMCkge1xuICAgICAgICBsZXQgbSA9IG91dC5tO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgICAgICAgbVtpXSA9IGFycltvZnMgKyBpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWF0cml4IERhdGFcbiAgICAgKiAhI3poIOefqemYteaVsOaNrlxuICAgICAqIEBwcm9wZXJ0eSB7RmxvYXQ2NEFycmF5IHwgRmxvYXQzMkFycmF5fSBtXG4gICAgICovXG4gICAgbTogRmxvYXRBcnJheTtcblxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29uc3RydWN0b3IgKG0wMD86IG51bWJlciB8IEZsb2F0MzJBcnJheSwgbTAxPzogbnVtYmVyLCBtMDI/OiBudW1iZXIsIG0wMz86IG51bWJlciwgbTA0PzogbnVtYmVyLCBtMDU/OiBudW1iZXIsIG0wNj86IG51bWJlciwgbTA3PzogbnVtYmVyLCBtMDg/OiBudW1iZXIpXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBtMDA6IG51bWJlciB8IEZsb2F0QXJyYXkgPSAxLCBtMDEgPSAwLCBtMDIgPSAwLFxuICAgICAgICBtMDMgPSAwLCBtMDQgPSAxLCBtMDUgPSAwLFxuICAgICAgICBtMDYgPSAwLCBtMDcgPSAwLCBtMDggPSAxXG4gICAgKSB7XG4gICAgICAgIGlmIChtMDAgaW5zdGFuY2VvZiBGTE9BVF9BUlJBWV9UWVBFKSB7XG4gICAgICAgICAgICB0aGlzLm0gPSBtMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm0gPSBuZXcgRkxPQVRfQVJSQVlfVFlQRSg5KTtcbiAgICAgICAgICAgIGxldCBtID0gdGhpcy5tO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUaGUgZWxlbWVudCBhdCBjb2x1bW4gMCByb3cgMC5cbiAgICAgICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgbVswXSA9IG0wMCBhcyBudW1iZXI7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDEuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bMV0gPSBtMDE7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDAgcm93IDIuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bMl0gPSBtMDI7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDAuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bM10gPSBtMDM7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDEuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bNF0gPSBtMDQ7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDEgcm93IDIuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bNV0gPSBtMDU7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDAuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bNl0gPSBtMDY7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDEuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bN10gPSBtMDc7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGVsZW1lbnQgYXQgY29sdW1uIDIgcm93IDIuXG4gICAgICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIG1bOF0gPSBtMDg7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXRyaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdDN9IGEgLSBUaGUgbWF0cml4LlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIG1hdHJpeC5cbiAgICAgKi9cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgIGxldCBhbSA9IHRoaXMubTtcbiAgICAgICAgcmV0dXJuIGBtYXQzKCR7YW1bMF19LCAke2FtWzFdfSwgJHthbVsyXX0sICR7YW1bM119LCAke2FtWzRdfSwgJHthbVs1XX0sICR7YW1bNl19LCAke2FtWzddfSwgJHthbVs4XX0pYDtcbiAgICB9XG59XG5cbmNjLk1hdDMgPSBNYXQzO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=