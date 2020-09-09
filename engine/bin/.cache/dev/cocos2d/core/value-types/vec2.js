
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/vec2.js';
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

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _x = 0.0;
var _y = 0.0;
/**
 * !#en Representation of 2D vectors and points.
 * !#zh 表示 2D 向量和坐标
 *
 * @class Vec2
 * @extends ValueType
 */

var Vec2 = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Vec2, _ValueType);

  var _proto = Vec2.prototype;

  // deprecated

  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method mag
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.mag(); // return 14.142135623730951;
   */

  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method magSqr
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.magSqr(); // return 200;
   */

  /**
   * !#en Subtracts one vector from this. If you want to save result to another vector, use sub() instead.
   * !#zh 向量减法。如果你想保存结果到另一个向量，可使用 sub() 代替。
   * @method subSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
   */

  /**
   * !#en Subtracts one vector from this, and returns the new result.
   * !#zh 向量减法，并返回新结果。
   * @method sub
   * @param {Vec2} vector
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.sub(cc.v2(5, 5));      // return Vec2 {x: 5, y: 5};
   * var v1;
   * v.sub(cc.v2(5, 5), v1);  // return Vec2 {x: 5, y: 5};
   */
  _proto.sub = function sub(vector, out) {
    return Vec2.subtract(out || new Vec2(), this, vector);
  }
  /**
   * !#en Multiplies this by a number. If you want to save result to another vector, use mul() instead.
   * !#zh 缩放当前向量。如果你想结果保存到另一个向量，可使用 mul() 代替。
   * @method mulSelf
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.mulSelf(5);// return Vec2 {x: 50, y: 50};
   */
  ;

  /**
   * !#en Multiplies by a number, and returns the new result.
   * !#zh 缩放向量，并返回新结果。
   * @method mul
   * @param {number} num
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.mul(5);      // return Vec2 {x: 50, y: 50};
   * var v1;
   * v.mul(5, v1);  // return Vec2 {x: 50, y: 50};
   */
  _proto.mul = function mul(num, out) {
    return Vec2.multiplyScalar(out || new Vec2(), this, num);
  }
  /**
   * !#en Divides by a number. If you want to save result to another vector, use div() instead.
   * !#zh 向量除法。如果你想结果保存到另一个向量，可使用 div() 代替。
   * @method divSelf
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.divSelf(5); // return Vec2 {x: 2, y: 2};
   */
  ;

  /**
   * !#en Divides by a number, and returns the new result.
   * !#zh 向量除法，并返回新的结果。
   * @method div
   * @param {number} num
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.div(5);      // return Vec2 {x: 2, y: 2};
   * var v1;
   * v.div(5, v1);  // return Vec2 {x: 2, y: 2};
   */
  _proto.div = function div(num, out) {
    return Vec2.multiplyScalar(out || new Vec2(), this, 1 / num);
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method scaleSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.scaleSelf(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
   */
  ;

  /**
   * !#en Multiplies two vectors, and returns the new result.
   * !#zh 分量相乘，并返回新的结果。
   * @method scale
   * @param {Vec2} vector
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.scale(cc.v2(5, 5));      // return Vec2 {x: 50, y: 50};
   * var v1;
   * v.scale(cc.v2(5, 5), v1);  // return Vec2 {x: 50, y: 50};
   */
  _proto.scale = function scale(vector, out) {
    return Vec2.multiply(out || new Vec2(), this, vector);
  }
  /**
   * !#en Negates the components. If you want to save result to another vector, use neg() instead.
   * !#zh 向量取反。如果你想结果保存到另一个向量，可使用 neg() 代替。
   * @method negSelf
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.negSelf(); // return Vec2 {x: -10, y: -10};
   */
  ;

  /**
   * !#en Negates the components, and returns the new result.
   * !#zh 返回取反后的新向量。
   * @method neg
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   * @example
   * var v = cc.v2(10, 10);
   * var v1;
   * v.neg(v1);  // return Vec2 {x: -10, y: -10};
   */
  _proto.neg = function neg(out) {
    return Vec2.negate(out || new Vec2(), this);
  }
  /**
   * !#en return a Vec2 object with x = 1 and y = 1.
   * !#zh 新 Vec2 对象。
   * @property ONE
   * @type Vec2
   * @static
   */
  ;

  /**
   * !#zh 获得指定向量的拷贝
   * @method clone
   * @typescript
   * clone <Out extends IVec2Like> (a: Out): Vec2
   * @static
   */
  Vec2.clone = function clone(a) {
    return new Vec2(a.x, a.y);
  }
  /**
   * !#zh 复制指定向量的值
   * @method copy
   * @typescript
   * copy <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.copy = function copy(out, a) {
    out.x = a.x;
    out.y = a.y;
    return out;
  }
  /**
   * !#zh  设置向量值
   * @method set
   * @typescript
   * set <Out extends IVec2Like> (out: Out, x: number, y: number): Out
   * @static
   */
  ;

  Vec2.set = function set(out, x, y) {
    out.x = x;
    out.y = y;
    return out;
  }
  /**
   * !#zh 逐元素向量加法
   * @method add
   * @typescript
   * add <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.add = function add(out, a, b) {
    out.x = a.x + b.x;
    out.y = a.y + b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量减法
   * @method subtract
   * @typescript
   * subtract <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.subtract = function subtract(out, a, b) {
    out.x = a.x - b.x;
    out.y = a.y - b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量乘法
   * @method multiply
   * @typescript
   * multiply <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.multiply = function multiply(out, a, b) {
    out.x = a.x * b.x;
    out.y = a.y * b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量除法
   * @method divide
   * @typescript
   * divide <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.divide = function divide(out, a, b) {
    out.x = a.x / b.x;
    out.y = a.y / b.y;
    return out;
  }
  /**
   * !#zh 逐元素向量向上取整
   * @method ceil
   * @typescript
   * ceil <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.ceil = function ceil(out, a) {
    out.x = Math.ceil(a.x);
    out.y = Math.ceil(a.y);
    return out;
  }
  /**
   * !#zh 逐元素向量向下取整
   * @method floor
   * @typescript
   * floor <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.floor = function floor(out, a) {
    out.x = Math.floor(a.x);
    out.y = Math.floor(a.y);
    return out;
  }
  /**
   * !#zh 逐元素向量最小值
   * @method min
   * @typescript
   * min <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.min = function min(out, a, b) {
    out.x = Math.min(a.x, b.x);
    out.y = Math.min(a.y, b.y);
    return out;
  }
  /**
   * !#zh 逐元素向量最大值
   * @method max
   * @typescript
   * max <Out extends IVec2Like> (out: Out, a: Out, b: Out): Out
   * @static
   */
  ;

  Vec2.max = function max(out, a, b) {
    out.x = Math.max(a.x, b.x);
    out.y = Math.max(a.y, b.y);
    return out;
  }
  /**
   * !#zh 逐元素向量四舍五入取整
   * @method round
   * @typescript
   * round <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.round = function round(out, a) {
    out.x = Math.round(a.x);
    out.y = Math.round(a.y);
    return out;
  }
  /**
   * !#zh 向量标量乘法
   * @method multiplyScalar
   * @typescript
   * multiplyScalar <Out extends IVec2Like> (out: Out, a: Out, b: number): Out
   * @static
   */
  ;

  Vec2.multiplyScalar = function multiplyScalar(out, a, b) {
    out.x = a.x * b;
    out.y = a.y * b;
    return out;
  }
  /**
   * !#zh 逐元素向量乘加: A + B * scale
   * @method scaleAndAdd
   * @typescript
   * scaleAndAdd <Out extends IVec2Like> (out: Out, a: Out, b: Out, scale: number): Out
   * @static
   */
  ;

  Vec2.scaleAndAdd = function scaleAndAdd(out, a, b, scale) {
    out.x = a.x + b.x * scale;
    out.y = a.y + b.y * scale;
    return out;
  }
  /**
   * !#zh 求两向量的欧氏距离
   * @method distance
   * @typescript
   * distance <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.distance = function distance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    return Math.sqrt(_x * _x + _y * _y);
  }
  /**
   * !#zh 求两向量的欧氏距离平方
   * @method squaredDistance
   * @typescript
   * squaredDistance <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.squaredDistance = function squaredDistance(a, b) {
    _x = b.x - a.x;
    _y = b.y - a.y;
    return _x * _x + _y * _y;
  }
  /**
   * !#zh 求向量长度
   * @method len
   * @typescript
   * len <Out extends IVec2Like> (a: Out): number
   * @static
   */
  ;

  Vec2.len = function len(a) {
    _x = a.x;
    _y = a.y;
    return Math.sqrt(_x * _x + _y * _y);
  }
  /**
   * !#zh 求向量长度平方
   * @method lengthSqr
   * @typescript
   * lengthSqr <Out extends IVec2Like> (a: Out): number
   * @static
   */
  ;

  Vec2.lengthSqr = function lengthSqr(a) {
    _x = a.x;
    _y = a.y;
    return _x * _x + _y * _y;
  }
  /**
   * !#zh 逐元素向量取负
   * @method negate
   * @typescript
   * negate <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.negate = function negate(out, a) {
    out.x = -a.x;
    out.y = -a.y;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 Infinity
   * @method inverse
   * @typescript
   * inverse <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.inverse = function inverse(out, a) {
    out.x = 1.0 / a.x;
    out.y = 1.0 / a.y;
    return out;
  }
  /**
   * !#zh 逐元素向量取倒数，接近 0 时返回 0
   * @method inverseSafe
   * @typescript
   * inverseSafe <Out extends IVec2Like> (out: Out, a: Out): Out
   * @static
   */
  ;

  Vec2.inverseSafe = function inverseSafe(out, a) {
    _x = a.x;
    _y = a.y;

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

    return out;
  }
  /**
   * !#zh 归一化向量
   * @method normalize
   * @typescript
   * normalize <Out extends IVec2Like, Vec2Like extends IVec2Like> (out: Out, a: Vec2Like): Out
   * @static
   */
  ;

  Vec2.normalize = function normalize(out, a) {
    _x = a.x;
    _y = a.y;
    var len = _x * _x + _y * _y;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      out.x = _x * len;
      out.y = _y * len;
    }

    return out;
  }
  /**
   * !#zh 向量点积（数量积）
   * @method dot
   * @typescript
   * dot <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.dot = function dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  /**
   * !#zh 向量叉积（向量积），注意二维向量的叉积为与 Z 轴平行的三维向量
   * @method cross
   * @typescript
   * cross <Out extends IVec2Like> (out: Vec2, a: Out, b: Out): Vec2
   * @static
   */
  ;

  Vec2.cross = function cross(out, a, b) {
    out.x = out.y = 0;
    out.z = a.x * b.y - a.y * b.x;
    return out;
  }
  /**
   * !#zh 逐元素向量线性插值： A + t * (B - A)
   * @method lerp
   * @typescript
   * lerp <Out extends IVec2Like> (out: Out, a: Out, b: Out, t: number): Out
   * @static
   */
  ;

  Vec2.lerp = function lerp(out, a, b, t) {
    _x = a.x;
    _y = a.y;
    out.x = _x + t * (b.x - _x);
    out.y = _y + t * (b.y - _y);
    return out;
  }
  /**
   * !#zh 生成一个在单位圆上均匀分布的随机向量
   * @method random
   * @typescript
   * random <Out extends IVec2Like> (out: Out, scale?: number): Out
   * @static
   */
  ;

  Vec2.random = function random(out, scale) {
    scale = scale || 1.0;
    var r = (0, _utils.random)() * 2.0 * Math.PI;
    out.x = Math.cos(r) * scale;
    out.y = Math.sin(r) * scale;
    return out;
  }
  /**
   * !#zh 向量与三维矩阵乘法，默认向量第三位为 1。
   * @method transformMat3
   * @typescript
   * transformMat3 <Out extends IVec2Like, MatLike extends IMat3Like> (out: Out, a: Out, mat: IMat3Like): Out
   * @static
   */
  ;

  Vec2.transformMat3 = function transformMat3(out, a, mat) {
    _x = a.x;
    _y = a.y;
    var m = mat.m;
    out.x = m[0] * _x + m[3] * _y + m[6];
    out.y = m[1] * _x + m[4] * _y + m[7];
    return out;
  }
  /**
   * !#zh 向量与四维矩阵乘法，默认向量第三位为 0，第四位为 1。
   * @method transformMat4
   * @typescript
   * transformMat4 <Out extends IVec2Like, MatLike extends IMat4Like> (out: Out, a: Out, mat: MatLike): Out
   * @static
   */
  ;

  Vec2.transformMat4 = function transformMat4(out, a, mat) {
    _x = a.x;
    _y = a.y;
    var m = mat.m;
    out.x = m[0] * _x + m[4] * _y + m[12];
    out.y = m[1] * _x + m[5] * _y + m[13];
    return out;
  }
  /**
   * !#zh 向量等价判断
   * @method strictEquals
   * @typescript
   * strictEquals <Out extends IVec2Like> (a: Out, b: Out): boolean
   * @static
   */
  ;

  Vec2.strictEquals = function strictEquals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * @method equals
   * @typescript
   * equals <Out extends IVec2Like> (a: Out, b: Out,  epsilon?: number): boolean
   * @static
   */
  ;

  Vec2.equals = function equals(a, b, epsilon) {
    if (epsilon === void 0) {
      epsilon = _utils.EPSILON;
    }

    return Math.abs(a.x - b.x) <= epsilon * Math.max(1.0, Math.abs(a.x), Math.abs(b.x)) && Math.abs(a.y - b.y) <= epsilon * Math.max(1.0, Math.abs(a.y), Math.abs(b.y));
  }
  /**
   * !#zh 排除浮点数误差的向量近似等价判断
   * @method angle
   * @typescript
   * angle <Out extends IVec2Like> (a: Out, b: Out): number
   * @static
   */
  ;

  Vec2.angle = function angle(a, b) {
    Vec2.normalize(v2_1, a);
    Vec2.normalize(v2_2, b);
    var cosine = Vec2.dot(v2_1, v2_2);

    if (cosine > 1.0) {
      return 0;
    }

    if (cosine < -1.0) {
      return Math.PI;
    }

    return Math.acos(cosine);
  }
  /**
   * !#zh 向量转数组
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, v: IVec2Like, ofs?: number): Out
   * @static
   */
  ;

  Vec2.toArray = function toArray(out, v, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out[ofs + 0] = v.x;
    out[ofs + 1] = v.y;
    return out;
  }
  /**
   * !#zh 数组转向量
   * @method fromArray
   * @typescript
   * fromArray <Out extends IVec2Like> (out: Out, arr: IWritableArrayLike<number>, ofs?: number): Out
   * @static
   */
  ;

  Vec2.fromArray = function fromArray(out, arr, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.x = arr[ofs + 0];
    out.y = arr[ofs + 1];
    return out;
  }
  /**
   * @property {Number} x
   */
  ;

  _createClass(Vec2, null, [{
    key: "ONE",
    get: function get() {
      return new Vec2(1, 1);
    }
  }, {
    key: "ZERO",

    /**
     * !#en return a Vec2 object with x = 0 and y = 0.
     * !#zh 返回 x = 0 和 y = 0 的 Vec2 对象。
     * @property {Vec2} ZERO
     * @static
     */
    get: function get() {
      return new Vec2(0, 0);
    }
  }, {
    key: "UP",

    /**
     * !#en return a Vec2 object with x = 0 and y = 1.
     * !#zh 返回 x = 0 和 y = 1 的 Vec2 对象。
     * @property {Vec2} UP
     * @static
     */
    get: function get() {
      return new Vec2(0, 1);
    }
  }, {
    key: "RIGHT",

    /**
     * !#en return a readonly Vec2 object with x = 1 and y = 0.
     * !#zh 返回 x = 1 和 y = 0 的 Vec2 只读对象。
     * @property {Vec2} RIGHT
     * @static
     */
    get: function get() {
      return new Vec2(1, 0);
    }
  }]);

  /**
   * !#en
   * Constructor
   * see {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} or {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
   * !#zh
   * 构造函数，可查看 {{#crossLink "cc/vec2:method"}}cc.v2{{/crossLink}} 或者 {{#crossLink "cc/p:method"}}cc.p{{/crossLink}}
   * @method constructor
   * @param {Number} [x=0]
   * @param {Number} [y=0]
   */
  function Vec2(x, y) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.mag = Vec2.prototype.len;
    _this.magSqr = Vec2.prototype.lengthSqr;
    _this.subSelf = Vec2.prototype.subtract;
    _this.mulSelf = Vec2.prototype.multiplyScalar;
    _this.divSelf = Vec2.prototype.divide;
    _this.scaleSelf = Vec2.prototype.multiply;
    _this.negSelf = Vec2.prototype.negate;
    _this.x = void 0;
    _this.y = void 0;
    _this.z = 0;

    if (x && typeof x === 'object') {
      _this.x = x.x || 0;
      _this.y = x.y || 0;
    } else {
      _this.x = x || 0;
      _this.y = y || 0;
    }

    return _this;
  }
  /**
   * !#en clone a Vec2 object
   * !#zh 克隆一个 Vec2 对象
   * @method clone
   * @return {Vec2}
   */


  _proto.clone = function clone() {
    return new Vec2(this.x, this.y);
  }
  /**
   * !#en Sets vector with another's value
   * !#zh 设置向量值。
   * @method set
   * @param {Vec2} newValue - !#en new value to set. !#zh 要设置的新值
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.set = function set(newValue) {
    this.x = newValue.x;
    this.y = newValue.y;
    return this;
  }
  /**
   * !#en Check whether two vector equal
   * !#zh 当前的向量是否与指定的向量相等。
   * @method equals
   * @param {Vec2} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y;
  }
  /**
   * !#en Check whether two vector equal with some degree of variance.
   * !#zh
   * 近似判断两个点是否相等。<br/>
   * 判断 2 个向量是否在指定数值的范围之内，如果在则返回 true，反之则返回 false。
   * @method fuzzyEquals
   * @param {Vec2} other
   * @param {Number} variance
   * @return {Boolean}
   */
  ;

  _proto.fuzzyEquals = function fuzzyEquals(other, variance) {
    if (this.x - variance <= other.x && other.x <= this.x + variance) {
      if (this.y - variance <= other.y && other.y <= this.y + variance) return true;
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
    return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
  }
  /**
   * !#en Calculate linear interpolation result between this vector and another one with given ratio
   * !#zh 线性插值。
   * @method lerp
   * @param {Vec2} to
   * @param {Number} ratio - the interpolation coefficient
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Vec2();
    var x = this.x;
    var y = this.y;
    out.x = x + (to.x - x) * ratio;
    out.y = y + (to.y - y) * ratio;
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
   * @param {Vec2} min_inclusive
   * @param {Vec2} max_inclusive
   * @return {Vec2}
   * @example
   * var min_inclusive = cc.v2(0, 0);
   * var max_inclusive = cc.v2(20, 20);
   * var v1 = cc.v2(20, 20).clampf(min_inclusive, max_inclusive); // Vec2 {x: 20, y: 20};
   * var v2 = cc.v2(0, 0).clampf(min_inclusive, max_inclusive);   // Vec2 {x: 0, y: 0};
   * var v3 = cc.v2(10, 10).clampf(min_inclusive, max_inclusive); // Vec2 {x: 10, y: 10};
   */
  ;

  _proto.clampf = function clampf(min_inclusive, max_inclusive) {
    this.x = _misc["default"].clampf(this.x, min_inclusive.x, max_inclusive.x);
    this.y = _misc["default"].clampf(this.y, min_inclusive.y, max_inclusive.y);
    return this;
  }
  /**
   * !#en Adds this vector.
   * !#zh 向量加法。
   * @method add
   * @param {Vec2} vector
   * @param {Vec2} [out]
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.add(cc.v2(5, 5));// return Vec2 {x: 15, y: 15};
   */
  ;

  _proto.add = function add(vector, out) {
    out = out || new Vec2();
    out.x = this.x + vector.x;
    out.y = this.y + vector.y;
    return out;
  }
  /**
   * !#en Adds this vector. If you want to save result to another vector, use add() instead.
   * !#zh 向量加法。如果你想保存结果到另一个向量，使用 add() 代替。
   * @method addSelf
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.addSelf = function addSelf(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  /**
   * !#en Subtracts one vector from this.
   * !#zh 向量减法。
   * @method subtract
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.subSelf(cc.v2(5, 5));// return Vec2 {x: 5, y: 5};
   */
  ;

  _proto.subtract = function subtract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  /**
   * !#en Multiplies this by a number.
   * !#zh 缩放当前向量。
   * @method multiplyScalar
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.multiply(5);// return Vec2 {x: 50, y: 50};
   */
  ;

  _proto.multiplyScalar = function multiplyScalar(num) {
    this.x *= num;
    this.y *= num;
    return this;
  }
  /**
   * !#en Multiplies two vectors.
   * !#zh 分量相乘。
   * @method multiply
   * @param {Vec2} vector
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.multiply(cc.v2(5, 5));// return Vec2 {x: 50, y: 50};
   */
  ;

  _proto.multiply = function multiply(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    return this;
  }
  /**
   * !#en Divides by a number.
   * !#zh 向量除法。
   * @method divide
   * @param {number} num
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.divide(5); // return Vec2 {x: 2, y: 2};
   */
  ;

  _proto.divide = function divide(num) {
    this.x /= num;
    this.y /= num;
    return this;
  }
  /**
   * !#en Negates the components.
   * !#zh 向量取反。
   * @method negate
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.negate(); // return Vec2 {x: -10, y: -10};
   */
  ;

  _proto.negate = function negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  /**
   * !#en Dot product
   * !#zh 当前向量与指定向量进行点乘。
   * @method dot
   * @param {Vec2} [vector]
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.dot(cc.v2(5, 5)); // return 100;
   */
  ;

  _proto.dot = function dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }
  /**
   * !#en Cross product
   * !#zh 当前向量与指定向量进行叉乘。
   * @method cross
   * @param {Vec2} [vector]
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.cross(cc.v2(5, 5)); // return 0;
   */
  ;

  _proto.cross = function cross(vector) {
    return this.x * vector.y - this.y * vector.x;
  }
  /**
   * !#en Returns the length of this vector.
   * !#zh 返回该向量的长度。
   * @method len
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.len(); // return 14.142135623730951;
   */
  ;

  _proto.len = function len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * !#en Returns the squared length of this vector.
   * !#zh 返回该向量的长度平方。
   * @method lengthSqr
   * @return {number} the result
   * @example
   * var v = cc.v2(10, 10);
   * v.lengthSqr(); // return 200;
   */
  ;

  _proto.lengthSqr = function lengthSqr() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * !#en Make the length of this vector to 1.
   * !#zh 向量归一化，让这个向量的长度为 1。
   * @method normalizeSelf
   * @return {Vec2} returns this
   * @chainable
   * @example
   * var v = cc.v2(10, 10);
   * v.normalizeSelf(); // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
   */
  ;

  _proto.normalizeSelf = function normalizeSelf() {
    var magSqr = this.x * this.x + this.y * this.y;
    if (magSqr === 1.0) return this;

    if (magSqr === 0.0) {
      return this;
    }

    var invsqrt = 1.0 / Math.sqrt(magSqr);
    this.x *= invsqrt;
    this.y *= invsqrt;
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
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} result
   * var v = cc.v2(10, 10);
   * v.normalize();   // return Vec2 {x: 0.7071067811865475, y: 0.7071067811865475};
   */
  ;

  _proto.normalize = function normalize(out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    out.normalizeSelf();
    return out;
  }
  /**
   * !#en Get angle in radian between this and vector.
   * !#zh 夹角的弧度。
   * @method angle
   * @param {Vec2} vector
   * @return {number} from 0 to Math.PI
   */
  ;

  _proto.angle = function angle(vector) {
    var magSqr1 = this.magSqr();
    var magSqr2 = vector.magSqr();

    if (magSqr1 === 0 || magSqr2 === 0) {
      console.warn("Can't get angle between zero vector");
      return 0.0;
    }

    var dot = this.dot(vector);
    var theta = dot / Math.sqrt(magSqr1 * magSqr2);
    theta = _misc["default"].clampf(theta, -1.0, 1.0);
    return Math.acos(theta);
  }
  /**
   * !#en Get angle in radian between this and vector with direction.
   * !#zh 带方向的夹角的弧度。
   * @method signAngle
   * @param {Vec2} vector
   * @return {number} from -MathPI to Math.PI
   */
  ;

  _proto.signAngle = function signAngle(vector) {
    var angle = this.angle(vector);
    return this.cross(vector) < 0 ? -angle : angle;
  }
  /**
   * !#en rotate
   * !#zh 返回旋转给定弧度后的新向量。
   * @method rotate
   * @param {number} radians
   * @param {Vec2} [out] - optional, the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @return {Vec2} the result
   */
  ;

  _proto.rotate = function rotate(radians, out) {
    out = out || new Vec2();
    out.x = this.x;
    out.y = this.y;
    return out.rotateSelf(radians);
  }
  /**
   * !#en rotate self
   * !#zh 按指定弧度旋转向量。
   * @method rotateSelf
   * @param {number} radians
   * @return {Vec2} returns this
   * @chainable
   */
  ;

  _proto.rotateSelf = function rotateSelf(radians) {
    var sin = Math.sin(radians);
    var cos = Math.cos(radians);
    var x = this.x;
    this.x = cos * x - sin * this.y;
    this.y = sin * x + cos * this.y;
    return this;
  }
  /**
   * !#en Calculates the projection of the current vector over the given vector.
   * !#zh 返回当前向量在指定 vector 向量上的投影向量。
   * @method project
   * @param {Vec2} vector
   * @return {Vec2}
   * @example
   * var v1 = cc.v2(20, 20);
   * var v2 = cc.v2(5, 5);
   * v1.project(v2); // Vec2 {x: 20, y: 20};
   */
  ;

  _proto.project = function project(vector) {
    return vector.multiplyScalar(this.dot(vector) / vector.dot(vector));
  }
  /**
   * Transforms the vec2 with a mat4. 3rd vector component is implicitly '0', 4th vector component is implicitly '1'
   * @method transformMat4
   * @param {Mat4} m matrix to transform with
   * @param {Vec2} [out] the receiving vector, you can pass the same vec2 to save result to itself, if not provided, a new vec2 will be created
   * @returns {Vec2} out
   */
  ;

  _proto.transformMat4 = function transformMat4(m, out) {
    out = out || new Vec2();
    Vec2.transformMat4(out, this, m);
    return out;
  }
  /**
   * Returns the maximum value in x, y.
   * @method maxAxis
   * @returns {number}
   */
  ;

  _proto.maxAxis = function maxAxis() {
    return Math.max(this.x, this.y);
  };

  return Vec2;
}(_valueType["default"]);

exports["default"] = Vec2;
Vec2.sub = Vec2.subtract;
Vec2.mul = Vec2.multiply;
Vec2.scale = Vec2.multiplyScalar;
Vec2.mag = Vec2.len;
Vec2.squaredMagnitude = Vec2.lengthSqr;
Vec2.div = Vec2.divide;
Vec2.ONE_R = Vec2.ONE;
Vec2.ZERO_R = Vec2.ZERO;
Vec2.UP_R = Vec2.UP;
Vec2.RIGHT_R = Vec2.RIGHT;
var v2_1 = new Vec2();
var v2_2 = new Vec2();

_CCClass["default"].fastDefine('cc.Vec2', Vec2, {
  x: 0,
  y: 0
});
/**
 * @module cc
 */

/**
 * !#en The convenience method to create a new {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}}.
 * !#zh 通过该简便的函数进行创建 {{#crossLink "Vec2"}}cc.Vec2{{/crossLink}} 对象。
 * @method v2
 * @param {Number|Object} [x=0]
 * @param {Number} [y=0]
 * @return {Vec2}
 * @example
 * var v1 = cc.v2();
 * var v2 = cc.v2(0, 0);
 * var v3 = cc.v2(v2);
 * var v4 = cc.v2({x: 100, y: 100});
 */


cc.v2 = function v2(x, y) {
  return new Vec2(x, y);
};

cc.Vec2 = Vec2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3ZlYzIudHMiXSwibmFtZXMiOlsiX3giLCJfeSIsIlZlYzIiLCJzdWIiLCJ2ZWN0b3IiLCJvdXQiLCJzdWJ0cmFjdCIsIm11bCIsIm51bSIsIm11bHRpcGx5U2NhbGFyIiwiZGl2Iiwic2NhbGUiLCJtdWx0aXBseSIsIm5lZyIsIm5lZ2F0ZSIsImNsb25lIiwiYSIsIngiLCJ5IiwiY29weSIsInNldCIsImFkZCIsImIiLCJkaXZpZGUiLCJjZWlsIiwiTWF0aCIsImZsb29yIiwibWluIiwibWF4Iiwicm91bmQiLCJzY2FsZUFuZEFkZCIsImRpc3RhbmNlIiwic3FydCIsInNxdWFyZWREaXN0YW5jZSIsImxlbiIsImxlbmd0aFNxciIsImludmVyc2UiLCJpbnZlcnNlU2FmZSIsImFicyIsIkVQU0lMT04iLCJub3JtYWxpemUiLCJkb3QiLCJjcm9zcyIsInoiLCJsZXJwIiwidCIsInJhbmRvbSIsInIiLCJQSSIsImNvcyIsInNpbiIsInRyYW5zZm9ybU1hdDMiLCJtYXQiLCJtIiwidHJhbnNmb3JtTWF0NCIsInN0cmljdEVxdWFscyIsImVxdWFscyIsImVwc2lsb24iLCJhbmdsZSIsInYyXzEiLCJ2Ml8yIiwiY29zaW5lIiwiYWNvcyIsInRvQXJyYXkiLCJ2Iiwib2ZzIiwiZnJvbUFycmF5IiwiYXJyIiwibWFnIiwicHJvdG90eXBlIiwibWFnU3FyIiwic3ViU2VsZiIsIm11bFNlbGYiLCJkaXZTZWxmIiwic2NhbGVTZWxmIiwibmVnU2VsZiIsIm5ld1ZhbHVlIiwib3RoZXIiLCJmdXp6eUVxdWFscyIsInZhcmlhbmNlIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwidG8iLCJyYXRpbyIsImNsYW1wZiIsIm1pbl9pbmNsdXNpdmUiLCJtYXhfaW5jbHVzaXZlIiwibWlzYyIsImFkZFNlbGYiLCJub3JtYWxpemVTZWxmIiwiaW52c3FydCIsIm1hZ1NxcjEiLCJtYWdTcXIyIiwiY29uc29sZSIsIndhcm4iLCJ0aGV0YSIsInNpZ25BbmdsZSIsInJvdGF0ZSIsInJhZGlhbnMiLCJyb3RhdGVTZWxmIiwicHJvamVjdCIsIm1heEF4aXMiLCJWYWx1ZVR5cGUiLCJzcXVhcmVkTWFnbml0dWRlIiwiT05FX1IiLCJPTkUiLCJaRVJPX1IiLCJaRVJPIiwiVVBfUiIsIlVQIiwiUklHSFRfUiIsIlJJR0hUIiwiQ0NDbGFzcyIsImZhc3REZWZpbmUiLCJjYyIsInYyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQUVBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsRUFBVSxHQUFHLEdBQWpCO0FBQ0EsSUFBSUMsRUFBVSxHQUFHLEdBQWpCO0FBRUE7Ozs7Ozs7O0lBUXFCQzs7Ozs7QUFDakI7O0FBT0E7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7OztTQWFBQyxNQUFBLGFBQUtDLE1BQUwsRUFBbUJDLEdBQW5CLEVBQXFDO0FBQ2pDLFdBQU9ILElBQUksQ0FBQ0ksUUFBTCxDQUFjRCxHQUFHLElBQUksSUFBSUgsSUFBSixFQUFyQixFQUFpQyxJQUFqQyxFQUF1Q0UsTUFBdkMsQ0FBUDtBQUNIO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7Ozs7Ozs7OztTQWFBRyxNQUFBLGFBQUtDLEdBQUwsRUFBa0JILEdBQWxCLEVBQW9DO0FBQ2hDLFdBQU9ILElBQUksQ0FBQ08sY0FBTCxDQUFvQkosR0FBRyxJQUFJLElBQUlILElBQUosRUFBM0IsRUFBdUMsSUFBdkMsRUFBNkNNLEdBQTdDLENBQVA7QUFDSDtBQUNEOzs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7Ozs7U0FhQUUsTUFBQSxhQUFLRixHQUFMLEVBQWtCSCxHQUFsQixFQUFvQztBQUNoQyxXQUFPSCxJQUFJLENBQUNPLGNBQUwsQ0FBb0JKLEdBQUcsSUFBSSxJQUFJSCxJQUFKLEVBQTNCLEVBQXVDLElBQXZDLEVBQTZDLElBQUVNLEdBQS9DLENBQVA7QUFDSDtBQUNEOzs7Ozs7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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XG5pbXBvcnQgTWF0NCBmcm9tICcuL21hdDQnO1xuaW1wb3J0IENDQ2xhc3MgZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzcyc7XG5pbXBvcnQgbWlzYyBmcm9tICcuLi91dGlscy9taXNjJztcbmltcG9ydCB7IEVQU0lMT04sIHJhbmRvbSB9IGZyb20gJy4vdXRpbHMnO1xuXG5sZXQgX3g6IG51bWJlciA9IDAuMDtcbmxldCBfeTogbnVtYmVyID0gMC4wO1xuXG4vKipcbiAqICEjZW4gUmVwcmVzZW50YXRpb24gb2YgMkQgdmVjdG9ycyBhbmQgcG9pbnRzLlxuICogISN6aCDooajnpLogMkQg5ZCR6YeP5ZKM5Z2Q5qCHXG4gKlxuICogQGNsYXNzIFZlYzJcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlYzIgZXh0ZW5kcyBWYWx1ZVR5cGUge1xuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBzdGF0aWMgc3ViICAgPSBWZWMyLnN1YnRyYWN0O1xuICAgIHN0YXRpYyBtdWwgICA9IFZlYzIubXVsdGlwbHk7XG4gICAgc3RhdGljIHNjYWxlID0gVmVjMi5tdWx0aXBseVNjYWxhcjtcbiAgICBzdGF0aWMgbWFnICAgPSBWZWMyLmxlbjtcbiAgICBzdGF0aWMgc3F1YXJlZE1hZ25pdHVkZSA9IFZlYzIubGVuZ3RoU3FyO1xuICAgIHN0YXRpYyBkaXYgPSBWZWMyLmRpdmlkZTtcbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICAgKiAhI3poIOi/lOWbnuivpeWQkemHj+eahOmVv+W6puOAglxuICAgICAqIEBtZXRob2QgbWFnXG4gICAgICogQHJldHVybiB7bnVtYmVyfSB0aGUgcmVzdWx0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5tYWcoKTsgLy8gcmV0dXJuIDE0LjE0MjEzNTYyMzczMDk1MTtcbiAgICAgKi9cbiAgICBtYWcgID0gVmVjMi5wcm90b3R5cGUubGVuO1xuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcbiAgICAgKiBAbWV0aG9kIG1hZ1NxclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYubWFnU3FyKCk7IC8vIHJldHVybiAyMDA7XG4gICAgICovXG4gICAgbWFnU3FyID0gVmVjMi5wcm90b3R5cGUubGVuZ3RoU3FyO1xuICAgIC8qKlxuICAgICAqICEjZW4gU3VidHJhY3RzIG9uZSB2ZWN0b3IgZnJvbSB0aGlzLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIHN1YigpIGluc3RlYWQuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XjgILlpoLmnpzkvaDmg7Pkv53lrZjnu5PmnpzliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggc3ViKCkg5Luj5pu/44CCXG4gICAgICogQG1ldGhvZCBzdWJTZWxmXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5zdWJTZWxmKGNjLnYyKDUsIDUpKTsvLyByZXR1cm4gVmVjMiB7eDogNSwgeTogNX07XG4gICAgICovXG4gICAgc3ViU2VsZiAgPSBWZWMyLnByb3RvdHlwZS5zdWJ0cmFjdDtcbiAgICAvKipcbiAgICAgKiAhI2VuIFN1YnRyYWN0cyBvbmUgdmVjdG9yIGZyb20gdGhpcywgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XvvIzlubbov5Tlm57mlrDnu5PmnpzjgIJcbiAgICAgKiBAbWV0aG9kIHN1YlxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzIgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzIgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuc3ViKGNjLnYyKDUsIDUpKTsgICAgICAvLyByZXR1cm4gVmVjMiB7eDogNSwgeTogNX07XG4gICAgICogdmFyIHYxO1xuICAgICAqIHYuc3ViKGNjLnYyKDUsIDUpLCB2MSk7ICAvLyByZXR1cm4gVmVjMiB7eDogNSwgeTogNX07XG4gICAgICovXG4gICAgc3ViICh2ZWN0b3I6IFZlYzIsIG91dD86IFZlYzIpOiBWZWMyIHtcbiAgICAgICAgcmV0dXJuIFZlYzIuc3VidHJhY3Qob3V0IHx8IG5ldyBWZWMyKCksIHRoaXMsIHZlY3Rvcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGlzIGJ5IGEgbnVtYmVyLiBJZiB5b3Ugd2FudCB0byBzYXZlIHJlc3VsdCB0byBhbm90aGVyIHZlY3RvciwgdXNlIG11bCgpIGluc3RlYWQuXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgILlpoLmnpzkvaDmg7Pnu5Pmnpzkv53lrZjliLDlj6bkuIDkuKrlkJHph4/vvIzlj6/kvb/nlKggbXVsKCkg5Luj5pu/44CCXG4gICAgICogQG1ldGhvZCBtdWxTZWxmXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2Lm11bFNlbGYoNSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XG4gICAgICovXG4gICAgbXVsU2VsZiAgPSBWZWMyLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhcjtcbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgYnkgYSBudW1iZXIsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg57yp5pS+5ZCR6YeP77yM5bm26L+U5Zue5paw57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBtdWxcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzIgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzIgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYubXVsKDUpOyAgICAgIC8vIHJldHVybiBWZWMyIHt4OiA1MCwgeTogNTB9O1xuICAgICAqIHZhciB2MTtcbiAgICAgKiB2Lm11bCg1LCB2MSk7ICAvLyByZXR1cm4gVmVjMiB7eDogNTAsIHk6IDUwfTtcbiAgICAgKi9cbiAgICBtdWwgKG51bTogbnVtYmVyLCBvdXQ/OiBWZWMyKTogVmVjMiB7XG4gICAgICAgIHJldHVybiBWZWMyLm11bHRpcGx5U2NhbGFyKG91dCB8fCBuZXcgVmVjMigpLCB0aGlzLCBudW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIERpdmlkZXMgYnkgYSBudW1iZXIuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgZGl2KCkgaW5zdGVhZC5cbiAgICAgKiAhI3poIOWQkemHj+mZpOazleOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBkaXYoKSDku6Pmm7/jgIJcbiAgICAgKiBAbWV0aG9kIGRpdlNlbGZcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuZGl2U2VsZig1KTsgLy8gcmV0dXJuIFZlYzIge3g6IDIsIHk6IDJ9O1xuICAgICAqL1xuICAgIGRpdlNlbGYgID0gVmVjMi5wcm90b3R5cGUuZGl2aWRlO1xuICAgIC8qKlxuICAgICAqICEjZW4gRGl2aWRlcyBieSBhIG51bWJlciwgYW5kIHJldHVybnMgdGhlIG5ldyByZXN1bHQuXG4gICAgICogISN6aCDlkJHph4/pmaTms5XvvIzlubbov5Tlm57mlrDnmoTnu5PmnpzjgIJcbiAgICAgKiBAbWV0aG9kIGRpdlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1cbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5kaXYoNSk7ICAgICAgLy8gcmV0dXJuIFZlYzIge3g6IDIsIHk6IDJ9O1xuICAgICAqIHZhciB2MTtcbiAgICAgKiB2LmRpdig1LCB2MSk7ICAvLyByZXR1cm4gVmVjMiB7eDogMiwgeTogMn07XG4gICAgICovXG4gICAgZGl2IChudW06IG51bWJlciwgb3V0PzogVmVjMik6IFZlYzIge1xuICAgICAgICByZXR1cm4gVmVjMi5tdWx0aXBseVNjYWxhcihvdXQgfHwgbmV3IFZlYzIoKSwgdGhpcywgMS9udW0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMuXG4gICAgICogISN6aCDliIbph4/nm7jkuZjjgIJcbiAgICAgKiBAbWV0aG9kIHNjYWxlU2VsZlxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuc2NhbGVTZWxmKGNjLnYyKDUsIDUpKTsvLyByZXR1cm4gVmVjMiB7eDogNTAsIHk6IDUwfTtcbiAgICAgKi9cbiAgICBzY2FsZVNlbGYgPSBWZWMyLnByb3RvdHlwZS5tdWx0aXBseTtcbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg5YiG6YeP55u45LmY77yM5bm26L+U5Zue5paw55qE57uT5p6c44CCXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHBhcmFtIHtWZWMyfSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3RvciwgeW91IGNhbiBwYXNzIHRoZSBzYW1lIHZlYzIgdG8gc2F2ZSByZXN1bHQgdG8gaXRzZWxmLCBpZiBub3QgcHJvdmlkZWQsIGEgbmV3IHZlYzIgd2lsbCBiZSBjcmVhdGVkXG4gICAgICogQHJldHVybiB7VmVjMn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuc2NhbGUoY2MudjIoNSwgNSkpOyAgICAgIC8vIHJldHVybiBWZWMyIHt4OiA1MCwgeTogNTB9O1xuICAgICAqIHZhciB2MTtcbiAgICAgKiB2LnNjYWxlKGNjLnYyKDUsIDUpLCB2MSk7ICAvLyByZXR1cm4gVmVjMiB7eDogNTAsIHk6IDUwfTtcbiAgICAgKi9cbiAgICBzY2FsZSAodmVjdG9yOiBWZWMyLCBvdXQ/OiBWZWMyKTogVmVjMiB7XG4gICAgICAgIHJldHVybiBWZWMyLm11bHRpcGx5KG91dCB8fCBuZXcgVmVjMigpLCB0aGlzLCB2ZWN0b3IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMuIElmIHlvdSB3YW50IHRvIHNhdmUgcmVzdWx0IHRvIGFub3RoZXIgdmVjdG9yLCB1c2UgbmVnKCkgaW5zdGVhZC5cbiAgICAgKiAhI3poIOWQkemHj+WPluWPjeOAguWmguaenOS9oOaDs+e7k+aenOS/neWtmOWIsOWPpuS4gOS4quWQkemHj++8jOWPr+S9v+eUqCBuZWcoKSDku6Pmm7/jgIJcbiAgICAgKiBAbWV0aG9kIG5lZ1NlbGZcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5uZWdTZWxmKCk7IC8vIHJldHVybiBWZWMyIHt4OiAtMTAsIHk6IC0xMH07XG4gICAgICovXG4gICAgbmVnU2VsZiA9IFZlYzIucHJvdG90eXBlLm5lZ2F0ZTtcbiAgICAvKipcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMsIGFuZCByZXR1cm5zIHRoZSBuZXcgcmVzdWx0LlxuICAgICAqICEjemgg6L+U5Zue5Y+W5Y+N5ZCO55qE5paw5ZCR6YeP44CCXG4gICAgICogQG1ldGhvZCBuZWdcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdmFyIHYxO1xuICAgICAqIHYubmVnKHYxKTsgIC8vIHJldHVybiBWZWMyIHt4OiAtMTAsIHk6IC0xMH07XG4gICAgICovXG4gICAgbmVnIChvdXQ/OiBWZWMyKTogVmVjMiB7XG4gICAgICAgIHJldHVybiBWZWMyLm5lZ2F0ZShvdXQgfHwgbmV3IFZlYzIoKSwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiByZXR1cm4gYSBWZWMyIG9iamVjdCB3aXRoIHggPSAxIGFuZCB5ID0gMS5cbiAgICAgKiAhI3poIOaWsCBWZWMyIOWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSBPTkVcbiAgICAgKiBAdHlwZSBWZWMyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgT05FICgpIHsgcmV0dXJuIG5ldyBWZWMyKDEsIDEpIH07XG4gICAgc3RhdGljIHJlYWRvbmx5IE9ORV9SID0gVmVjMi5PTkU7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzIgb2JqZWN0IHdpdGggeCA9IDAgYW5kIHkgPSAwLlxuICAgICAqICEjemgg6L+U5ZueIHggPSAwIOWSjCB5ID0gMCDnmoQgVmVjMiDlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IFpFUk9cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBaRVJPICgpIHsgcmV0dXJuIG5ldyBWZWMyKDAsIDApIH07XG4gICAgLyoqXG4gICAgICogISNlbiByZXR1cm4gYSByZWFkb25seSBWZWMyIG9iamVjdCB3aXRoIHggPSAwIGFuZCB5ID0gMC5cbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4qiB4ID0gMCDlkowgeSA9IDAg55qEIFZlYzIg5Y+q6K+75a+56LGh44CCXG4gICAgICogQHByb3BlcnR5IHtWZWMyfSBaRVJPX1JcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IFpFUk9fUiA9IFZlYzIuWkVSTztcblxuICAgIC8qKlxuICAgICAqICEjZW4gcmV0dXJuIGEgVmVjMiBvYmplY3Qgd2l0aCB4ID0gMCBhbmQgeSA9IDEuXG4gICAgICogISN6aCDov5Tlm54geCA9IDAg5ZKMIHkgPSAxIOeahCBWZWMyIOWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gVVBcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBVUCAoKSB7IHJldHVybiBuZXcgVmVjMigwLCAxKSB9O1xuICAgIC8qKlxuICAgICAqICEjZW4gcmV0dXJuIGEgcmVhZG9ubHkgVmVjMiBvYmplY3Qgd2l0aCB4ID0gMCBhbmQgeSA9IDEuXG4gICAgICogISN6aCDov5Tlm54geCA9IDAg5ZKMIHkgPSAxIOeahCBWZWMyIOWPquivu+WvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7VmVjMn0gVVBfUlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBzdGF0aWMgcmVhZG9ubHkgVVBfUiA9IFZlYzIuVVA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiBhIHJlYWRvbmx5IFZlYzIgb2JqZWN0IHdpdGggeCA9IDEgYW5kIHkgPSAwLlxuICAgICAqICEjemgg6L+U5ZueIHggPSAxIOWSjCB5ID0gMCDnmoQgVmVjMiDlj6ror7vlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IFJJR0hUXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgUklHSFQgKCkgeyByZXR1cm4gbmV3IFZlYzIoMSwgMCkgfTtcbiAgICAvKipcbiAgICAgKiAhI2VuIHJldHVybiBhIFZlYzIgb2JqZWN0IHdpdGggeCA9IDEgYW5kIHkgPSAwLlxuICAgICAqICEjemgg6L+U5ZueIHggPSAxIOWSjCB5ID0gMCDnmoQgVmVjMiDlr7nosaHjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzJ9IFJJR0hUX1JcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHJlYWRvbmx5XG4gICAgICovXG4gICAgc3RhdGljIHJlYWRvbmx5IFJJR0hUX1IgPSBWZWMyLlJJR0hUO1xuXG4gICAgLyoqXG4gICAgICogISN6aCDojrflvpfmjIflrprlkJHph4/nmoTmi7fotJ1cbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjbG9uZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KTogVmVjMlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY2xvbmUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIoYS54LCBhLnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5aSN5Yi25oyH5a6a5ZCR6YeP55qE5YC8XG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjb3B5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjb3B5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54O1xuICAgICAgICBvdXQueSA9IGEueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poICDorr7nva7lkJHph4/lgLxcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2V0IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNldCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIG91dC54ID0geDtcbiAgICAgICAgb3V0LnkgPSB5O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Yqg5rOVXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGFkZCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBhZGQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueCArIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgKyBiLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lh4/ms5VcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBzdWJ0cmFjdCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gYS54IC0gYi54O1xuICAgICAgICBvdXQueSA9IGEueSAtIGIueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOazlVxuICAgICAqIEBtZXRob2QgbXVsdGlwbHlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG11bHRpcGx5IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKiBiLng7XG4gICAgICAgIG91dC55ID0gYS55ICogYi55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP6Zmk5rOVXG4gICAgICogQG1ldGhvZCBkaXZpZGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGRpdmlkZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBkaXZpZGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IGEueCAvIGIueDtcbiAgICAgICAgb3V0LnkgPSBhLnkgLyBiLnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lkJHkuIrlj5bmlbRcbiAgICAgKiBAbWV0aG9kIGNlaWxcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNlaWwgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGNlaWwgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLmNlaWwoYS54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLmNlaWwoYS55KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WQkeS4i+WPluaVtFxuICAgICAqIEBtZXRob2QgZmxvb3JcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZsb29yIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBmbG9vciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGguZmxvb3IoYS54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLmZsb29yKGEueSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/mnIDlsI/lgLxcbiAgICAgKiBAbWV0aG9kIG1pblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbWluIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG1pbiA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KSB7XG4gICAgICAgIG91dC54ID0gTWF0aC5taW4oYS54LCBiLngpO1xuICAgICAgICBvdXQueSA9IE1hdGgubWluKGEueSwgYi55KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5pyA5aSn5YC8XG4gICAgICogQG1ldGhvZCBtYXhcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG1heCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtYXggPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IE1hdGgubWF4KGEueCwgYi54KTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1heChhLnksIGIueSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/lm5voiI3kupTlhaXlj5bmlbRcbiAgICAgKiBAbWV0aG9kIHJvdW5kXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByb3VuZCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcm91bmQgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpIHtcbiAgICAgICAgb3V0LnggPSBNYXRoLnJvdW5kKGEueCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5yb3VuZChhLnkpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP5qCH6YeP5LmY5rOVXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVNjYWxhclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbXVsdGlwbHlTY2FsYXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbXVsdGlwbHlTY2FsYXIgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIGI6IG51bWJlcikge1xuICAgICAgICBvdXQueCA9IGEueCAqIGI7XG4gICAgICAgIG91dC55ID0gYS55ICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+S5mOWKoDogQSArIEIgKiBzY2FsZVxuICAgICAqIEBtZXRob2Qgc2NhbGVBbmRBZGRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNjYWxlQW5kQWRkIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHNjYWxlOiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnggPSBhLnggKyAoYi54ICogc2NhbGUpO1xuICAgICAgICBvdXQueSA9IGEueSArIChiLnkgKiBzY2FsZSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLkuKTlkJHph4/nmoTmrKfmsI/ot53nprtcbiAgICAgKiBAbWV0aG9kIGRpc3RhbmNlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBkaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGRpc3RhbmNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBfeCA9IGIueCAtIGEueDtcbiAgICAgICAgX3kgPSBiLnkgLSBhLnk7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoX3ggKiBfeCArIF95ICogX3kpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5rGC5Lik5ZCR6YeP55qE5qyn5rCP6Led56a75bmz5pa5XG4gICAgICogQG1ldGhvZCBzcXVhcmVkRGlzdGFuY2VcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHNxdWFyZWREaXN0YW5jZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgX3ggPSBiLnggLSBhLng7XG4gICAgICAgIF95ID0gYi55IC0gYS55O1xuICAgICAgICByZXR1cm4gX3ggKiBfeCArIF95ICogX3k7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqZcbiAgICAgKiBAbWV0aG9kIGxlblxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbGVuIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlbiA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChfeCAqIF94ICsgX3kgKiBfeSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmsYLlkJHph4/plb/luqblubPmlrlcbiAgICAgKiBAbWV0aG9kIGxlbmd0aFNxclxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbGVuZ3RoU3FyIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQpOiBudW1iZXJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlbmd0aFNxciA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0KSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgcmV0dXJuIF94ICogX3ggKyBfeSAqIF95O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W6LSfXG4gICAgICogQG1ldGhvZCBuZWdhdGVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG5lZ2F0ZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbmVnYXRlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gLWEueDtcbiAgICAgICAgb3V0LnkgPSAtYS55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg6YCQ5YWD57Sg5ZCR6YeP5Y+W5YCS5pWw77yM5o6l6L+RIDAg5pe26L+U5ZueIEluZmluaXR5XG4gICAgICogQG1ldGhvZCBpbnZlcnNlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBpbnZlcnNlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIG91dC54ID0gMS4wIC8gYS54O1xuICAgICAgICBvdXQueSA9IDEuMCAvIGEueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOmAkOWFg+e0oOWQkemHj+WPluWAkuaVsO+8jOaOpei/kSAwIOaXtui/lOWbniAwXG4gICAgICogQG1ldGhvZCBpbnZlcnNlU2FmZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaW52ZXJzZVNhZmUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBPdXQpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGludmVyc2VTYWZlIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0KSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMoX3gpIDwgRVBTSUxPTikge1xuICAgICAgICAgICAgb3V0LnggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnggPSAxLjAgLyBfeDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyhfeSkgPCBFUFNJTE9OKSB7XG4gICAgICAgICAgICBvdXQueSA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQueSA9IDEuMCAvIF95O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOW9kuS4gOWMluWQkemHj1xuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBub3JtYWxpemUgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgVmVjMkxpa2UgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogVmVjMkxpa2UpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIG5vcm1hbGl6ZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBWZWMyTGlrZSBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhOiBWZWMyTGlrZSkge1xuICAgICAgICBfeCA9IGEueDtcbiAgICAgICAgX3kgPSBhLnk7XG4gICAgICAgIGxldCBsZW4gPSBfeCAqIF94ICsgX3kgKiBfeTtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgICAgICAgIG91dC54ID0gX3ggKiBsZW47XG4gICAgICAgICAgICBvdXQueSA9IF95ICogbGVuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDlkJHph4/ngrnnp6/vvIjmlbDph4/np6/vvIlcbiAgICAgKiBAbWV0aG9kIGRvdFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZG90IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCk6IG51bWJlclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZG90IDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ICogYi54ICsgYS55ICogYi55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP5Y+J56ev77yI5ZCR6YeP56ev77yJ77yM5rOo5oSP5LqM57u05ZCR6YeP55qE5Y+J56ev5Li65LiOIFog6L205bmz6KGM55qE5LiJ57u05ZCR6YePXG4gICAgICogQG1ldGhvZCBjcm9zc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY3Jvc3MgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogVmVjMiwgYTogT3V0LCBiOiBPdXQpOiBWZWMyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjcm9zcyA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBWZWMyLCBhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICBvdXQueCA9IG91dC55ID0gMDtcbiAgICAgICAgb3V0LnogPSBhLnggKiBiLnkgLSBhLnkgKiBiLng7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpgJDlhYPntKDlkJHph4/nur/mgKfmj5LlgLzvvJogQSArIHQgKiAoQiAtIEEpXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBsZXJwIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBiOiBPdXQsIHQ6IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgbGVycCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgYjogT3V0LCB0OiBudW1iZXIpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBvdXQueCA9IF94ICsgdCAqIChiLnggLSBfeCk7XG4gICAgICAgIG91dC55ID0gX3kgKyB0ICogKGIueSAtIF95KTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOeUn+aIkOS4gOS4quWcqOWNleS9jeWchuS4iuWdh+WMgOWIhuW4g+eahOmaj+acuuWQkemHj1xuICAgICAqIEBtZXRob2QgcmFuZG9tXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiByYW5kb20gPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBzY2FsZT86IG51bWJlcik6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgcmFuZG9tIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChvdXQ6IE91dCwgc2NhbGU/OiBudW1iZXIpIHtcbiAgICAgICAgc2NhbGUgPSBzY2FsZSB8fCAxLjA7XG4gICAgICAgIGNvbnN0IHIgPSByYW5kb20oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgICAgIG91dC54ID0gTWF0aC5jb3MocikgKiBzY2FsZTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLnNpbihyKSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5ZCR6YeP5LiO5LiJ57u055+p6Zi15LmY5rOV77yM6buY6K6k5ZCR6YeP56ys5LiJ5L2N5Li6IDHjgIJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDNcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zZm9ybU1hdDMgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQzTGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogSU1hdDNMaWtlKTogT3V0XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0cmFuc2Zvcm1NYXQzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2UsIE1hdExpa2UgZXh0ZW5kcyBJTWF0M0xpa2U+IChvdXQ6IE91dCwgYTogT3V0LCBtYXQ6IE1hdExpa2UpIHtcbiAgICAgICAgX3ggPSBhLng7XG4gICAgICAgIF95ID0gYS55O1xuICAgICAgICBsZXQgbSA9IG1hdC5tO1xuICAgICAgICBvdXQueCA9IG1bMF0gKiBfeCArIG1bM10gKiBfeSArIG1bNl07XG4gICAgICAgIG91dC55ID0gbVsxXSAqIF94ICsgbVs0XSAqIF95ICsgbVs3XTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+S4juWbm+e7tOefqemYteS5mOazle+8jOm7mOiupOWQkemHj+esrOS4ieS9jeS4uiAw77yM56ys5Zub5L2N5Li6IDHjgIJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybU1hdDRcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRyYW5zZm9ybU1hdDQgPE91dCBleHRlbmRzIElWZWMyTGlrZSwgTWF0TGlrZSBleHRlbmRzIElNYXQ0TGlrZT4gKG91dDogT3V0LCBhOiBPdXQsIG1hdDogTWF0TGlrZSk6IE91dFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgdHJhbnNmb3JtTWF0NCA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlLCBNYXRMaWtlIGV4dGVuZHMgSU1hdDRMaWtlPiAob3V0OiBPdXQsIGE6IE91dCwgbWF0OiBNYXRMaWtlKSB7XG4gICAgICAgIF94ID0gYS54O1xuICAgICAgICBfeSA9IGEueTtcbiAgICAgICAgbGV0IG0gPSBtYXQubTtcbiAgICAgICAgb3V0LnggPSBtWzBdICogX3ggKyBtWzRdICogX3kgKyBtWzEyXTtcbiAgICAgICAgb3V0LnkgPSBtWzFdICogX3ggKyBtWzVdICogX3kgKyBtWzEzXTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+etieS7t+WIpOaWrVxuICAgICAqIEBtZXRob2Qgc3RyaWN0RXF1YWxzXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzdHJpY3RFcXVhbHMgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogYm9vbGVhblxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc3RyaWN0RXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCkge1xuICAgICAgICByZXR1cm4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDmjpLpmaTmta7ngrnmlbDor6/lt67nmoTlkJHph4/ov5HkvLznrYnku7fliKTmlq1cbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZXF1YWxzIDxPdXQgZXh0ZW5kcyBJVmVjMkxpa2U+IChhOiBPdXQsIGI6IE91dCwgIGVwc2lsb24/OiBudW1iZXIpOiBib29sZWFuXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBlcXVhbHMgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0LCAgZXBzaWxvbiA9IEVQU0lMT04pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIE1hdGguYWJzKGEueCAtIGIueCkgPD1cbiAgICAgICAgICAgIGVwc2lsb24gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEueCksIE1hdGguYWJzKGIueCkpICYmXG4gICAgICAgICAgICBNYXRoLmFicyhhLnkgLSBiLnkpIDw9XG4gICAgICAgICAgICBlcHNpbG9uICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhLnkpLCBNYXRoLmFicyhiLnkpKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5o6S6Zmk5rWu54K55pWw6K+v5beu55qE5ZCR6YeP6L+R5Ly8562J5Lu35Yik5patXG4gICAgICogQG1ldGhvZCBhbmdsZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogYW5nbGUgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKGE6IE91dCwgYjogT3V0KTogbnVtYmVyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBhbmdsZSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAoYTogT3V0LCBiOiBPdXQpIHtcbiAgICAgICAgVmVjMi5ub3JtYWxpemUodjJfMSwgYSk7XG4gICAgICAgIFZlYzIubm9ybWFsaXplKHYyXzIsIGIpO1xuICAgICAgICBjb25zdCBjb3NpbmUgPSBWZWMyLmRvdCh2Ml8xLCB2Ml8yKTtcbiAgICAgICAgaWYgKGNvc2luZSA+IDEuMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvc2luZSA8IC0xLjApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3MoY29zaW5lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOWQkemHj+i9rOaVsOe7hFxuICAgICAqIEBtZXRob2QgdG9BcnJheVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogdG9BcnJheSA8T3V0IGV4dGVuZHMgSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4+IChvdXQ6IE91dCwgdjogSVZlYzJMaWtlLCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIHY6IElWZWMyTGlrZSwgb2ZzID0gMCkge1xuICAgICAgICBvdXRbb2ZzICsgMF0gPSB2Lng7XG4gICAgICAgIG91dFtvZnMgKyAxXSA9IHYueTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOaVsOe7hOi9rOWQkemHj1xuICAgICAqIEBtZXRob2QgZnJvbUFycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElWZWMyTGlrZT4gKG91dDogT3V0LCBhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvZnM/OiBudW1iZXIpOiBPdXRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21BcnJheSA8T3V0IGV4dGVuZHMgSVZlYzJMaWtlPiAob3V0OiBPdXQsIGFycjogSVdyaXRhYmxlQXJyYXlMaWtlPG51bWJlcj4sIG9mcyA9IDApIHtcbiAgICAgICAgb3V0LnggPSBhcnJbb2ZzICsgMF07XG4gICAgICAgIG91dC55ID0gYXJyW29mcyArIDFdO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB4XG4gICAgICovXG4gICAgeDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcbiAgICAgKi9cbiAgICB5OiBudW1iZXI7XG5cbiAgICAvLyBjb21wYXRpYmxlIHdpdGggdmVjM1xuICAgIHo6IG51bWJlciA9IDA7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvdmVjMjptZXRob2RcIn19Y2MudjJ7ey9jcm9zc0xpbmt9fSBvciB7eyNjcm9zc0xpbmsgXCJjYy9wOm1ldGhvZFwifX1jYy5we3svY3Jvc3NMaW5rfX1cbiAgICAgKiAhI3poXG4gICAgICog5p6E6YCg5Ye95pWw77yM5Y+v5p+l55yLIHt7I2Nyb3NzTGluayBcImNjL3ZlYzI6bWV0aG9kXCJ9fWNjLnYye3svY3Jvc3NMaW5rfX0g5oiW6ICFIHt7I2Nyb3NzTGluayBcImNjL3A6bWV0aG9kXCJ9fWNjLnB7ey9jcm9zc0xpbmt9fVxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3g9MF1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoeDogbnVtYmVyIHwgVmVjMiA9IDAsIHk6IG51bWJlciA9IDApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHgueCB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ID0geC55IHx8IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4IGFzIG51bWJlciB8fCAwO1xuICAgICAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBjbG9uZSBhIFZlYzIgb2JqZWN0XG4gICAgICogISN6aCDlhYvpmobkuIDkuKogVmVjMiDlr7nosaFcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKi9cbiAgICBjbG9uZSAoKTogVmVjMiB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHZlY3RvciB3aXRoIGFub3RoZXIncyB2YWx1ZVxuICAgICAqICEjemgg6K6+572u5ZCR6YeP5YC844CCXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG5ld1ZhbHVlIC0gISNlbiBuZXcgdmFsdWUgdG8gc2V0LiAhI3poIOimgeiuvue9rueahOaWsOWAvFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzZXQgKG5ld1ZhbHVlOiBWZWMyKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IG5ld1ZhbHVlLng7XG4gICAgICAgIHRoaXMueSA9IG5ld1ZhbHVlLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0d28gdmVjdG9yIGVxdWFsXG4gICAgICogISN6aCDlvZPliY3nmoTlkJHph4/mmK/lkKbkuI7mjIflrprnmoTlkJHph4/nm7jnrYnjgIJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7VmVjMn0gb3RoZXJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGVxdWFscyAob3RoZXI6IFZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG90aGVyICYmIHRoaXMueCA9PT0gb3RoZXIueCAmJiB0aGlzLnkgPT09IG90aGVyLnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHR3byB2ZWN0b3IgZXF1YWwgd2l0aCBzb21lIGRlZ3JlZSBvZiB2YXJpYW5jZS5cbiAgICAgKiAhI3poXG4gICAgICog6L+R5Ly85Yik5pat5Lik5Liq54K55piv5ZCm55u4562J44CCPGJyLz5cbiAgICAgKiDliKTmlq0gMiDkuKrlkJHph4/mmK/lkKblnKjmjIflrprmlbDlgLznmoTojIPlm7TkuYvlhoXvvIzlpoLmnpzlnKjliJnov5Tlm54gdHJ1Ze+8jOWPjeS5i+WImei/lOWbniBmYWxzZeOAglxuICAgICAqIEBtZXRob2QgZnV6enlFcXVhbHNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG90aGVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHZhcmlhbmNlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBmdXp6eUVxdWFscyAob3RoZXI6IFZlYzIsIHZhcmlhbmNlKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnggLSB2YXJpYW5jZSA8PSBvdGhlci54ICYmIG90aGVyLnggPD0gdGhpcy54ICsgdmFyaWFuY2UpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnkgLSB2YXJpYW5jZSA8PSBvdGhlci55ICYmIG90aGVyLnkgPD0gdGhpcy55ICsgdmFyaWFuY2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVHJhbnNmb3JtIHRvIHN0cmluZyB3aXRoIHZlY3RvciBpbmZvcm1hdGlvbnNcbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxuICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcIihcIiArXG4gICAgICAgICAgICB0aGlzLngudG9GaXhlZCgyKSArIFwiLCBcIiArXG4gICAgICAgICAgICB0aGlzLnkudG9GaXhlZCgyKSArIFwiKVwiXG4gICAgICAgICAgICA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDYWxjdWxhdGUgbGluZWFyIGludGVycG9sYXRpb24gcmVzdWx0IGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXIgb25lIHdpdGggZ2l2ZW4gcmF0aW9cbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvOOAglxuICAgICAqIEBtZXRob2QgbGVycFxuICAgICAqIEBwYXJhbSB7VmVjMn0gdG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudFxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMyIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMyIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICovXG4gICAgbGVycCAodG86IFZlYzIsIHJhdGlvOiBudW1iZXIsIG91dD86IFZlYzIpOiBWZWMyIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIHZhciB4ID0gdGhpcy54O1xuICAgICAgICB2YXIgeSA9IHRoaXMueTtcbiAgICAgICAgb3V0LnggPSB4ICsgKHRvLnggLSB4KSAqIHJhdGlvO1xuICAgICAgICBvdXQueSA9IHkgKyAodG8ueSAtIHkpICogcmF0aW87XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDbGFtcCB0aGUgdmVjdG9yIGJldHdlZW4gZnJvbSBmbG9hdCBhbmQgdG8gZmxvYXQuXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuaMh+WumumZkOWItuWMuuWfn+WQjueahOWQkemHj+OAgjxici8+XG4gICAgICog5ZCR6YeP5aSn5LqOIG1heF9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1heF9pbmNsdXNpdmXjgII8YnIvPlxuICAgICAqIOWQkemHj+Wwj+S6jiBtaW5faW5jbHVzaXZlIOWImei/lOWbniBtaW5faW5jbHVzaXZl44CCPGJyLz5cbiAgICAgKiDlkKbliJnov5Tlm57oh6rouqvjgIJcbiAgICAgKiBAbWV0aG9kIGNsYW1wZlxuICAgICAqIEBwYXJhbSB7VmVjMn0gbWluX2luY2x1c2l2ZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gbWF4X2luY2x1c2l2ZVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbWluX2luY2x1c2l2ZSA9IGNjLnYyKDAsIDApO1xuICAgICAqIHZhciBtYXhfaW5jbHVzaXZlID0gY2MudjIoMjAsIDIwKTtcbiAgICAgKiB2YXIgdjEgPSBjYy52MigyMCwgMjApLmNsYW1wZihtaW5faW5jbHVzaXZlLCBtYXhfaW5jbHVzaXZlKTsgLy8gVmVjMiB7eDogMjAsIHk6IDIwfTtcbiAgICAgKiB2YXIgdjIgPSBjYy52MigwLCAwKS5jbGFtcGYobWluX2luY2x1c2l2ZSwgbWF4X2luY2x1c2l2ZSk7ICAgLy8gVmVjMiB7eDogMCwgeTogMH07XG4gICAgICogdmFyIHYzID0gY2MudjIoMTAsIDEwKS5jbGFtcGYobWluX2luY2x1c2l2ZSwgbWF4X2luY2x1c2l2ZSk7IC8vIFZlYzIge3g6IDEwLCB5OiAxMH07XG4gICAgICovXG4gICAgY2xhbXBmIChtaW5faW5jbHVzaXZlOiBWZWMyLCBtYXhfaW5jbHVzaXZlOiBWZWMyKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IG1pc2MuY2xhbXBmKHRoaXMueCwgbWluX2luY2x1c2l2ZS54LCBtYXhfaW5jbHVzaXZlLngpO1xuICAgICAgICB0aGlzLnkgPSBtaXNjLmNsYW1wZih0aGlzLnksIG1pbl9pbmNsdXNpdmUueSwgbWF4X2luY2x1c2l2ZS55KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBBZGRzIHRoaXMgdmVjdG9yLlxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV44CCXG4gICAgICogQG1ldGhvZCBhZGRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF1cbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5hZGQoY2MudjIoNSwgNSkpOy8vIHJldHVybiBWZWMyIHt4OiAxNSwgeTogMTV9O1xuICAgICAqL1xuICAgIGFkZCAodmVjdG9yOiBWZWMyLCBvdXQ/OiBWZWMyKTogVmVjMiB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMigpO1xuICAgICAgICBvdXQueCA9IHRoaXMueCArIHZlY3Rvci54O1xuICAgICAgICBvdXQueSA9IHRoaXMueSArIHZlY3Rvci55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyB0aGlzIHZlY3Rvci4gSWYgeW91IHdhbnQgdG8gc2F2ZSByZXN1bHQgdG8gYW5vdGhlciB2ZWN0b3IsIHVzZSBhZGQoKSBpbnN0ZWFkLlxuICAgICAqICEjemgg5ZCR6YeP5Yqg5rOV44CC5aaC5p6c5L2g5oOz5L+d5a2Y57uT5p6c5Yiw5Y+m5LiA5Liq5ZCR6YeP77yM5L2/55SoIGFkZCgpIOS7o+abv+OAglxuICAgICAqIEBtZXRob2QgYWRkU2VsZlxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIGFkZFNlbGYgKHZlY3RvcjogVmVjMik6IHRoaXMge1xuICAgICAgICB0aGlzLnggKz0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSArPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdWJ0cmFjdHMgb25lIHZlY3RvciBmcm9tIHRoaXMuXG4gICAgICogISN6aCDlkJHph4/lh4/ms5XjgIJcbiAgICAgKiBAbWV0aG9kIHN1YnRyYWN0XG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5zdWJTZWxmKGNjLnYyKDUsIDUpKTsvLyByZXR1cm4gVmVjMiB7eDogNSwgeTogNX07XG4gICAgICovXG4gICAgc3VidHJhY3QgKHZlY3RvcjogVmVjMik6IHRoaXMge1xuICAgICAgICB0aGlzLnggLT0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSAtPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBNdWx0aXBsaWVzIHRoaXMgYnkgYSBudW1iZXIuXG4gICAgICogISN6aCDnvKnmlL7lvZPliY3lkJHph4/jgIJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5U2NhbGFyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2Lm11bHRpcGx5KDUpOy8vIHJldHVybiBWZWMyIHt4OiA1MCwgeTogNTB9O1xuICAgICAqL1xuICAgIG11bHRpcGx5U2NhbGFyIChudW06IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLnggKj0gbnVtO1xuICAgICAgICB0aGlzLnkgKj0gbnVtO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE11bHRpcGxpZXMgdHdvIHZlY3RvcnMuXG4gICAgICogISN6aCDliIbph4/nm7jkuZjjgIJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSByZXR1cm5zIHRoaXNcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdiA9IGNjLnYyKDEwLCAxMCk7XG4gICAgICogdi5tdWx0aXBseShjYy52Mig1LCA1KSk7Ly8gcmV0dXJuIFZlYzIge3g6IDUwLCB5OiA1MH07XG4gICAgICovXG4gICAgbXVsdGlwbHkgKHZlY3RvcjogVmVjMik6IHRoaXMge1xuICAgICAgICB0aGlzLnggKj0gdmVjdG9yLng7XG4gICAgICAgIHRoaXMueSAqPSB2ZWN0b3IueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBEaXZpZGVzIGJ5IGEgbnVtYmVyLlxuICAgICAqICEjemgg5ZCR6YeP6Zmk5rOV44CCXG4gICAgICogQG1ldGhvZCBkaXZpZGVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuZGl2aWRlKDUpOyAvLyByZXR1cm4gVmVjMiB7eDogMiwgeTogMn07XG4gICAgICovXG4gICAgZGl2aWRlIChudW06IG51bWJlcik6IHRoaXMge1xuICAgICAgICB0aGlzLnggLz0gbnVtO1xuICAgICAgICB0aGlzLnkgLz0gbnVtO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMuXG4gICAgICogISN6aCDlkJHph4/lj5blj43jgIJcbiAgICAgKiBAbWV0aG9kIG5lZ2F0ZVxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2Lm5lZ2F0ZSgpOyAvLyByZXR1cm4gVmVjMiB7eDogLTEwLCB5OiAtMTB9O1xuICAgICAqL1xuICAgIG5lZ2F0ZSAoKTogdGhpcyB7XG4gICAgICAgIHRoaXMueCA9IC10aGlzLng7XG4gICAgICAgIHRoaXMueSA9IC10aGlzLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gRG90IHByb2R1Y3RcbiAgICAgKiAhI3poIOW9k+WJjeWQkemHj+S4juaMh+WumuWQkemHj+i/m+ihjOeCueS5mOOAglxuICAgICAqIEBtZXRob2QgZG90XG4gICAgICogQHBhcmFtIHtWZWMyfSBbdmVjdG9yXVxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYuZG90KGNjLnYyKDUsIDUpKTsgLy8gcmV0dXJuIDEwMDtcbiAgICAgKi9cbiAgICBkb3QgKHZlY3RvcjogVmVjMik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2ZWN0b3IueCArIHRoaXMueSAqIHZlY3Rvci55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ3Jvc3MgcHJvZHVjdFxuICAgICAqICEjemgg5b2T5YmN5ZCR6YeP5LiO5oyH5a6a5ZCR6YeP6L+b6KGM5Y+J5LmY44CCXG4gICAgICogQG1ldGhvZCBjcm9zc1xuICAgICAqIEBwYXJhbSB7VmVjMn0gW3ZlY3Rvcl1cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2LmNyb3NzKGNjLnYyKDUsIDUpKTsgLy8gcmV0dXJuIDA7XG4gICAgICovXG4gICAgY3Jvc3MgKHZlY3RvcjogVmVjMik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2ZWN0b3IueSAtIHRoaXMueSAqIHZlY3Rvci54O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgICAqICEjemgg6L+U5Zue6K+l5ZCR6YeP55qE6ZW/5bqm44CCXG4gICAgICogQG1ldGhvZCBsZW5cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IHRoZSByZXN1bHRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2LmxlbigpOyAvLyByZXR1cm4gMTQuMTQyMTM1NjIzNzMwOTUxO1xuICAgICAqL1xuICAgIGxlbiAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXG4gICAgICogISN6aCDov5Tlm57or6XlkJHph4/nmoTplb/luqblubPmlrnjgIJcbiAgICAgKiBAbWV0aG9kIGxlbmd0aFNxclxuICAgICAqIEByZXR1cm4ge251bWJlcn0gdGhlIHJlc3VsdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHYgPSBjYy52MigxMCwgMTApO1xuICAgICAqIHYubGVuZ3RoU3FyKCk7IC8vIHJldHVybiAyMDA7XG4gICAgICovXG4gICAgbGVuZ3RoU3FyICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTWFrZSB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yIHRvIDEuXG4gICAgICogISN6aCDlkJHph4/lvZLkuIDljJbvvIzorqnov5nkuKrlkJHph4/nmoTplb/luqbkuLogMeOAglxuICAgICAqIEBtZXRob2Qgbm9ybWFsaXplU2VsZlxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJldHVybnMgdGhpc1xuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2Lm5vcm1hbGl6ZVNlbGYoKTsgLy8gcmV0dXJuIFZlYzIge3g6IDAuNzA3MTA2NzgxMTg2NTQ3NSwgeTogMC43MDcxMDY3ODExODY1NDc1fTtcbiAgICAgKi9cbiAgICBub3JtYWxpemVTZWxmICgpOiBWZWMyIHtcbiAgICAgICAgdmFyIG1hZ1NxciA9IHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICAgICAgaWYgKG1hZ1NxciA9PT0gMS4wKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKG1hZ1NxciA9PT0gMC4wKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnZzcXJ0ID0gMS4wIC8gTWF0aC5zcXJ0KG1hZ1Nxcik7XG4gICAgICAgIHRoaXMueCAqPSBpbnZzcXJ0O1xuICAgICAgICB0aGlzLnkgKj0gaW52c3FydDtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGlzIHZlY3RvciB3aXRoIGEgbWFnbml0dWRlIG9mIDEuPGJyLz5cbiAgICAgKiA8YnIvPlxuICAgICAqIE5vdGUgdGhhdCB0aGUgY3VycmVudCB2ZWN0b3IgaXMgdW5jaGFuZ2VkIGFuZCBhIG5ldyBub3JtYWxpemVkIHZlY3RvciBpcyByZXR1cm5lZC4gSWYgeW91IHdhbnQgdG8gbm9ybWFsaXplIHRoZSBjdXJyZW50IHZlY3RvciwgdXNlIG5vcm1hbGl6ZVNlbGYgZnVuY3Rpb24uXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuW9kuS4gOWMluWQjueahOWQkemHj+OAgjxici8+XG4gICAgICogPGJyLz5cbiAgICAgKiDms6jmhI/vvIzlvZPliY3lkJHph4/kuI3lj5jvvIzlubbov5Tlm57kuIDkuKrmlrDnmoTlvZLkuIDljJblkJHph4/jgILlpoLmnpzkvaDmg7PmnaXlvZLkuIDljJblvZPliY3lkJHph4/vvIzlj6/kvb/nlKggbm9ybWFsaXplU2VsZiDlh73mlbDjgIJcbiAgICAgKiBAbWV0aG9kIG5vcm1hbGl6ZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IsIHlvdSBjYW4gcGFzcyB0aGUgc2FtZSB2ZWMyIHRvIHNhdmUgcmVzdWx0IHRvIGl0c2VsZiwgaWYgbm90IHByb3ZpZGVkLCBhIG5ldyB2ZWMyIHdpbGwgYmUgY3JlYXRlZFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IHJlc3VsdFxuICAgICAqIHZhciB2ID0gY2MudjIoMTAsIDEwKTtcbiAgICAgKiB2Lm5vcm1hbGl6ZSgpOyAgIC8vIHJldHVybiBWZWMyIHt4OiAwLjcwNzEwNjc4MTE4NjU0NzUsIHk6IDAuNzA3MTA2NzgxMTg2NTQ3NX07XG4gICAgICovXG4gICAgbm9ybWFsaXplIChvdXQ/OiBWZWMyKTogVmVjMiB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMigpO1xuICAgICAgICBvdXQueCA9IHRoaXMueDtcbiAgICAgICAgb3V0LnkgPSB0aGlzLnk7XG4gICAgICAgIG91dC5ub3JtYWxpemVTZWxmKCk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgYW5nbGUgaW4gcmFkaWFuIGJldHdlZW4gdGhpcyBhbmQgdmVjdG9yLlxuICAgICAqICEjemgg5aS56KeS55qE5byn5bqm44CCXG4gICAgICogQG1ldGhvZCBhbmdsZVxuICAgICAqIEBwYXJhbSB7VmVjMn0gdmVjdG9yXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBmcm9tIDAgdG8gTWF0aC5QSVxuICAgICAqL1xuICAgIGFuZ2xlICh2ZWN0b3I6IFZlYzIpOiBudW1iZXIge1xuICAgICAgICB2YXIgbWFnU3FyMSA9IHRoaXMubWFnU3FyKCk7XG4gICAgICAgIHZhciBtYWdTcXIyID0gdmVjdG9yLm1hZ1NxcigpO1xuXG4gICAgICAgIGlmIChtYWdTcXIxID09PSAwIHx8IG1hZ1NxcjIgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNhbid0IGdldCBhbmdsZSBiZXR3ZWVuIHplcm8gdmVjdG9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuIDAuMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkb3QgPSB0aGlzLmRvdCh2ZWN0b3IpO1xuICAgICAgICB2YXIgdGhldGEgPSBkb3QgLyAoTWF0aC5zcXJ0KG1hZ1NxcjEgKiBtYWdTcXIyKSk7XG4gICAgICAgIHRoZXRhID0gbWlzYy5jbGFtcGYodGhldGEsIC0xLjAsIDEuMCk7XG4gICAgICAgIHJldHVybiBNYXRoLmFjb3ModGhldGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGFuZ2xlIGluIHJhZGlhbiBiZXR3ZWVuIHRoaXMgYW5kIHZlY3RvciB3aXRoIGRpcmVjdGlvbi5cbiAgICAgKiAhI3poIOW4puaWueWQkeeahOWkueinkueahOW8p+W6puOAglxuICAgICAqIEBtZXRob2Qgc2lnbkFuZ2xlXG4gICAgICogQHBhcmFtIHtWZWMyfSB2ZWN0b3JcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IGZyb20gLU1hdGhQSSB0byBNYXRoLlBJXG4gICAgICovXG4gICAgc2lnbkFuZ2xlICh2ZWN0b3I6IFZlYzIpOiBudW1iZXIge1xuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlKHZlY3Rvcik7XG4gICAgICAgIHJldHVybiB0aGlzLmNyb3NzKHZlY3RvcikgPCAwID8gLWFuZ2xlIDogYW5nbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiByb3RhdGVcbiAgICAgKiAhI3poIOi/lOWbnuaXi+i9rOe7meWumuW8p+W6puWQjueahOaWsOWQkemHj+OAglxuICAgICAqIEBtZXRob2Qgcm90YXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSB0aGUgcmVzdWx0XG4gICAgICovXG4gICAgcm90YXRlIChyYWRpYW5zOiBudW1iZXIsIG91dD86IFZlYzIpOiBWZWMyIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMyKCk7XG4gICAgICAgIG91dC54ID0gdGhpcy54O1xuICAgICAgICBvdXQueSA9IHRoaXMueTtcbiAgICAgICAgcmV0dXJuIG91dC5yb3RhdGVTZWxmKHJhZGlhbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gcm90YXRlIHNlbGZcbiAgICAgKiAhI3poIOaMieaMh+WumuW8p+W6puaXi+i9rOWQkemHj+OAglxuICAgICAqIEBtZXRob2Qgcm90YXRlU2VsZlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpYW5zXG4gICAgICogQHJldHVybiB7VmVjMn0gcmV0dXJucyB0aGlzXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHJvdGF0ZVNlbGYgKHJhZGlhbnM6IG51bWJlcik6IFZlYzIge1xuICAgICAgICB2YXIgc2luID0gTWF0aC5zaW4ocmFkaWFucyk7XG4gICAgICAgIHZhciBjb3MgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XG4gICAgICAgIHRoaXMueCA9IGNvcyAqIHggLSBzaW4gKiB0aGlzLnk7XG4gICAgICAgIHRoaXMueSA9IHNpbiAqIHggKyBjb3MgKiB0aGlzLnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2FsY3VsYXRlcyB0aGUgcHJvamVjdGlvbiBvZiB0aGUgY3VycmVudCB2ZWN0b3Igb3ZlciB0aGUgZ2l2ZW4gdmVjdG9yLlxuICAgICAqICEjemgg6L+U5Zue5b2T5YmN5ZCR6YeP5Zyo5oyH5a6aIHZlY3RvciDlkJHph4/kuIrnmoTmipXlvbHlkJHph4/jgIJcbiAgICAgKiBAbWV0aG9kIHByb2plY3RcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHZlY3RvclxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgdjEgPSBjYy52MigyMCwgMjApO1xuICAgICAqIHZhciB2MiA9IGNjLnYyKDUsIDUpO1xuICAgICAqIHYxLnByb2plY3QodjIpOyAvLyBWZWMyIHt4OiAyMCwgeTogMjB9O1xuICAgICAqL1xuICAgIHByb2plY3QgKHZlY3RvcjogVmVjMik6IFZlYzIge1xuICAgICAgICByZXR1cm4gdmVjdG9yLm11bHRpcGx5U2NhbGFyKHRoaXMuZG90KHZlY3RvcikgLyB2ZWN0b3IuZG90KHZlY3RvcikpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDQuIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzAnLCA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICAgICAqIEBtZXRob2QgdHJhbnNmb3JtTWF0NFxuICAgICAqIEBwYXJhbSB7TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IFtvdXRdIHRoZSByZWNlaXZpbmcgdmVjdG9yLCB5b3UgY2FuIHBhc3MgdGhlIHNhbWUgdmVjMiB0byBzYXZlIHJlc3VsdCB0byBpdHNlbGYsIGlmIG5vdCBwcm92aWRlZCwgYSBuZXcgdmVjMiB3aWxsIGJlIGNyZWF0ZWRcbiAgICAgKiBAcmV0dXJucyB7VmVjMn0gb3V0XG4gICAgICovXG4gICAgdHJhbnNmb3JtTWF0NCAobTogTWF0NCwgb3V0PzogVmVjMik6IFZlYzIge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFZlYzIoKTtcbiAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgdGhpcywgbSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZSBpbiB4LCB5LlxuICAgICAqIEBtZXRob2QgbWF4QXhpc1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgbWF4QXhpcyAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG59XG5cbmNvbnN0IHYyXzEgPSBuZXcgVmVjMigpO1xuY29uc3QgdjJfMiA9IG5ldyBWZWMyKCk7XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuVmVjMicsIFZlYzIsIHsgeDogMCwgeTogMCB9KTtcblxuXG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cblxuLyoqXG4gKiAhI2VuIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IHt7I2Nyb3NzTGluayBcIlZlYzJcIn19Y2MuVmVjMnt7L2Nyb3NzTGlua319LlxuICogISN6aCDpgJrov4for6XnroDkvr/nmoTlh73mlbDov5vooYzliJvlu7oge3sjY3Jvc3NMaW5rIFwiVmVjMlwifX1jYy5WZWMye3svY3Jvc3NMaW5rfX0g5a+56LGh44CCXG4gKiBAbWV0aG9kIHYyXG4gKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IFt4PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cbiAqIEByZXR1cm4ge1ZlYzJ9XG4gKiBAZXhhbXBsZVxuICogdmFyIHYxID0gY2MudjIoKTtcbiAqIHZhciB2MiA9IGNjLnYyKDAsIDApO1xuICogdmFyIHYzID0gY2MudjIodjIpO1xuICogdmFyIHY0ID0gY2MudjIoe3g6IDEwMCwgeTogMTAwfSk7XG4gKi9cbmNjLnYyID0gZnVuY3Rpb24gdjIgKHgsIHkpIHtcbiAgICByZXR1cm4gbmV3IFZlYzIoeCwgeSk7XG59O1xuXG5jYy5WZWMyID0gVmVjMjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9