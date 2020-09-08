
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/rect.js';
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

var _vec = _interopRequireDefault(require("./vec2"));

var _size = _interopRequireDefault(require("./size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * !#en A 2D rectangle defined by x, y position and width, height.
 * !#zh 通过位置和宽高定义的 2D 矩形。
 * @class Rect
 * @extends ValueType
 */

/**
 * !#en
 * Constructor of Rect class.
 * see {{#crossLink "cc/rect:method"}} cc.rect {{/crossLink}} for convenience method.
 * !#zh
 * Rect类的构造函数。可以通过 {{#crossLink "cc/rect:method"}} cc.rect {{/crossLink}} 简便方法进行创建。
 *
 * @method constructor
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [w=0]
 * @param {Number} [h=0]
 */
var Rect = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Rect, _ValueType);

  /**
   * !#en Creates a rectangle from two coordinate values.
   * !#zh 根据指定 2 个坐标创建出一个矩形区域。
   * @static
   * @method fromMinMax
   * @param {Vec2} v1
   * @param {Vec2} v2
   * @return {Rect}
   * @example
   * cc.Rect.fromMinMax(cc.v2(10, 10), cc.v2(20, 20)); // Rect {x: 10, y: 10, width: 10, height: 10};
   */
  Rect.fromMinMax = function fromMinMax(v1, v2) {
    var min_x = Math.min(v1.x, v2.x);
    var min_y = Math.min(v1.y, v2.y);
    var max_x = Math.max(v1.x, v2.x);
    var max_y = Math.max(v1.y, v2.y);
    return new Rect(min_x, min_y, max_x - min_x, max_y - min_y);
  }
  /**
   * @property {Number} x
   */
  ;

  function Rect(x, y, w, h) {
    var _this;

    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    if (w === void 0) {
      w = 0;
    }

    if (h === void 0) {
      h = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.x = void 0;
    _this.y = void 0;
    _this.width = void 0;
    _this.height = void 0;

    if (x && typeof x === 'object') {
      y = x.y;
      w = x.width;
      h = x.height;
      x = x.x;
    }

    _this.x = x || 0;
    _this.y = y || 0;
    _this.width = w || 0;
    _this.height = h || 0;
    return _this;
  }
  /**
   * !#en TODO
   * !#zh 克隆一个新的 Rect。
   * @method clone
   * @return {Rect}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * a.clone();// Rect {x: 0, y: 0, width: 10, height: 10}
   */


  var _proto = Rect.prototype;

  _proto.clone = function clone() {
    return new Rect(this.x, this.y, this.width, this.height);
  }
  /**
   * !#en TODO
   * !#zh 是否等于指定的矩形。
   * @method equals
   * @param {Rect} other
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(0, 0, 10, 10);
   * a.equals(b);// true;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.x === other.x && this.y === other.y && this.width === other.width && this.height === other.height;
  };

  /**
   * !#en TODO
   * !#zh 线性插值
   * @method lerp
   * @param {Rect} to
   * @param {Number} ratio - the interpolation coefficient.
   * @param {Rect} [out] - optional, the receiving vector.
   * @return {Rect}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(50, 50, 100, 100);
   * update (dt) {
   *    // method 1;
   *    var c = a.lerp(b, dt * 0.1);
   *    // method 2;
   *    a.lerp(b, dt * 0.1, c);
   * }
   */
  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Rect();
    var x = this.x;
    var y = this.y;
    var width = this.width;
    var height = this.height;
    out.x = x + (to.x - x) * ratio;
    out.y = y + (to.y - y) * ratio;
    out.width = width + (to.width - width) * ratio;
    out.height = height + (to.height - height) * ratio;
    return out;
  };

  _proto.set = function set(source) {
    this.x = source.x;
    this.y = source.y;
    this.width = source.width;
    this.height = source.height;
    return this;
  }
  /**
   * !#en Check whether the current rectangle intersects with the given one
   * !#zh 当前矩形与指定矩形是否相交。
   * @method intersects
   * @param {Rect} rect
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Rect(0, 0, 20, 20);
   * a.intersects(b);// true
   */
  ;

  _proto.intersects = function intersects(rect) {
    var maxax = this.x + this.width,
        maxay = this.y + this.height,
        maxbx = rect.x + rect.width,
        maxby = rect.y + rect.height;
    return !(maxax < rect.x || maxbx < this.x || maxay < rect.y || maxby < this.y);
  }
  /**
   * !#en Returns the overlapping portion of 2 rectangles.
   * !#zh 返回 2 个矩形重叠的部分。
   * @method intersection
   * @param {Rect} out Stores the result
   * @param {Rect} rectB
   * @return {Rect} Returns the out parameter
   * @example
   * var a = new cc.Rect(0, 10, 20, 20);
   * var b = new cc.Rect(0, 10, 10, 10);
   * var intersection = new cc.Rect();
   * a.intersection(intersection, b); // intersection {x: 0, y: 10, width: 10, height: 10};
   */
  ;

  _proto.intersection = function intersection(out, rectB) {
    var axMin = this.x,
        ayMin = this.y,
        axMax = this.x + this.width,
        ayMax = this.y + this.height;
    var bxMin = rectB.x,
        byMin = rectB.y,
        bxMax = rectB.x + rectB.width,
        byMax = rectB.y + rectB.height;
    out.x = Math.max(axMin, bxMin);
    out.y = Math.max(ayMin, byMin);
    out.width = Math.min(axMax, bxMax) - out.x;
    out.height = Math.min(ayMax, byMax) - out.y;
    return out;
  }
  /**
   * !#en Check whether the current rect contains the given point
   * !#zh 当前矩形是否包含指定坐标点。
   * Returns true if the point inside this rectangle.
   * @method contains
   * @param {Vec2} point
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * var b = new cc.Vec2(0, 5);
   * a.contains(b);// true
   */
  ;

  _proto.contains = function contains(point) {
    return this.x <= point.x && this.x + this.width >= point.x && this.y <= point.y && this.y + this.height >= point.y;
  }
  /**
   * !#en Returns true if the other rect totally inside this rectangle.
   * !#zh 当前矩形是否包含指定矩形。
   * @method containsRect
   * @param {Rect} rect
   * @return {Boolean}
   * @example
   * var a = new cc.Rect(0, 0, 20, 20);
   * var b = new cc.Rect(0, 0, 10, 10);
   * a.containsRect(b);// true
   */
  ;

  _proto.containsRect = function containsRect(rect) {
    return this.x <= rect.x && this.x + this.width >= rect.x + rect.width && this.y <= rect.y && this.y + this.height >= rect.y + rect.height;
  }
  /**
   * !#en Returns the smallest rectangle that contains the current rect and the given rect.
   * !#zh 返回一个包含当前矩形和指定矩形的最小矩形。
   * @method union
   * @param {Rect} out Stores the result
   * @param {Rect} rectB
   * @return {Rect} Returns the out parameter
   * @example
   * var a = new cc.Rect(0, 10, 20, 20);
   * var b = new cc.Rect(0, 10, 10, 10);
   * var union = new cc.Rect();
   * a.union(union, b); // union {x: 0, y: 10, width: 20, height: 20};
   */
  ;

  _proto.union = function union(out, rectB) {
    var ax = this.x,
        ay = this.y,
        aw = this.width,
        ah = this.height;
    var bx = rectB.x,
        by = rectB.y,
        bw = rectB.width,
        bh = rectB.height;
    out.x = Math.min(ax, bx);
    out.y = Math.min(ay, by);
    out.width = Math.max(ax + aw, bx + bw) - out.x;
    out.height = Math.max(ay + ah, by + bh) - out.y;
    return out;
  }
  /**
   * !#en Apply matrix4 to the rect.
   * !#zh 使用 mat4 对矩形进行矩阵转换。
   * @method transformMat4
   * @param out {Rect} The output rect
   * @param mat {Mat4} The matrix4
   */
  ;

  _proto.transformMat4 = function transformMat4(out, mat) {
    var ol = this.x;
    var ob = this.y;
    var or = ol + this.width;
    var ot = ob + this.height;
    var matm = mat.m;
    var lbx = matm[0] * ol + matm[4] * ob + matm[12];
    var lby = matm[1] * ol + matm[5] * ob + matm[13];
    var rbx = matm[0] * or + matm[4] * ob + matm[12];
    var rby = matm[1] * or + matm[5] * ob + matm[13];
    var ltx = matm[0] * ol + matm[4] * ot + matm[12];
    var lty = matm[1] * ol + matm[5] * ot + matm[13];
    var rtx = matm[0] * or + matm[4] * ot + matm[12];
    var rty = matm[1] * or + matm[5] * ot + matm[13];
    var minX = Math.min(lbx, rbx, ltx, rtx);
    var maxX = Math.max(lbx, rbx, ltx, rtx);
    var minY = Math.min(lby, rby, lty, rty);
    var maxY = Math.max(lby, rby, lty, rty);
    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;
    return out;
  }
  /**
   * !#en Output rect informations to string
   * !#zh 转换为方便阅读的字符串
   * @method toString
   * @return {String}
   * @example
   * var a = new cc.Rect(0, 0, 10, 10);
   * a.toString();// "(0.00, 0.00, 10.00, 10.00)";
   */
  ;

  _proto.toString = function toString() {
    return '(' + this.x.toFixed(2) + ', ' + this.y.toFixed(2) + ', ' + this.width.toFixed(2) + ', ' + this.height.toFixed(2) + ')';
  }
  /**
   * !#en The minimum x value, equals to rect.x
   * !#zh 矩形 x 轴上的最小值，等价于 rect.x。
   * @property xMin
   * @type {Number}
   */
  ;

  _createClass(Rect, [{
    key: "xMin",
    get: function get() {
      return this.x;
    },
    set: function set(v) {
      this.width += this.x - v;
      this.x = v;
    }
    /**
    * !#en The minimum y value, equals to rect.y
    * !#zh 矩形 y 轴上的最小值。
    * @property yMin
    * @type {Number}
    */

  }, {
    key: "yMin",
    get: function get() {
      return this.y;
    },
    set: function set(v) {
      this.height += this.y - v;
      this.y = v;
    }
    /**
    * !#en The maximum x value.
    * !#zh 矩形 x 轴上的最大值。
    * @property xMax
    * @type {Number}
    */

  }, {
    key: "xMax",
    get: function get() {
      return this.x + this.width;
    },
    set: function set(value) {
      this.width = value - this.x;
    }
    /**
    * !#en The maximum y value.
    * !#zh 矩形 y 轴上的最大值。
    * @property yMax
    * @type {Number}
    */

  }, {
    key: "yMax",
    get: function get() {
      return this.y + this.height;
    },
    set: function set(value) {
      this.height = value - this.y;
    }
    /**
    * !#en The position of the center of the rectangle.
    * !#zh 矩形的中心点。
    * @property {Vec2} center
    */

  }, {
    key: "center",
    get: function get() {
      return new _vec["default"](this.x + this.width * 0.5, this.y + this.height * 0.5);
    },
    set: function set(value) {
      this.x = value.x - this.width * 0.5;
      this.y = value.y - this.height * 0.5;
    }
    /**
    * !#en The X and Y position of the rectangle.
    * !#zh 矩形的 x 和 y 坐标。
    * @property {Vec2} origin
    */

  }, {
    key: "origin",
    get: function get() {
      return new _vec["default"](this.x, this.y);
    },
    set: function set(value) {
      this.x = value.x;
      this.y = value.y;
    }
    /**
    * !#en Width and height of the rectangle.
    * !#zh 矩形的大小。
    * @property {Size} size
    */

  }, {
    key: "size",
    get: function get() {
      return new _size["default"](this.width, this.height);
    },
    set: function set(value) {
      this.width = value.width;
      this.height = value.height;
    }
  }]);

  return Rect;
}(_valueType["default"]);

exports["default"] = Rect;

_CCClass["default"].fastDefine('cc.Rect', Rect, {
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

cc.Rect = Rect;
/**
 * @module cc
 */

/**
 * !#en
 * The convenience method to create a new Rect.
 * see {{#crossLink "Rect/Rect:method"}}cc.Rect{{/crossLink}}
 * !#zh
 * 该方法用来快速创建一个新的矩形。{{#crossLink "Rect/Rect:method"}}cc.Rect{{/crossLink}}
 * @method rect
 * @param {Number} [x=0]
 * @param {Number} [y=0]
 * @param {Number} [w=0]
 * @param {Number} [h=0]
 * @return {Rect}
 * @example
 * var a = new cc.Rect(0 , 0, 10, 0);
 */

cc.rect = function rect(x, y, w, h) {
  return new Rect(x, y, w, h);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3JlY3QudHMiXSwibmFtZXMiOlsiUmVjdCIsImZyb21NaW5NYXgiLCJ2MSIsInYyIiwibWluX3giLCJNYXRoIiwibWluIiwieCIsIm1pbl95IiwieSIsIm1heF94IiwibWF4IiwibWF4X3kiLCJ3IiwiaCIsIndpZHRoIiwiaGVpZ2h0IiwiY2xvbmUiLCJlcXVhbHMiLCJvdGhlciIsImxlcnAiLCJ0byIsInJhdGlvIiwib3V0Iiwic2V0Iiwic291cmNlIiwiaW50ZXJzZWN0cyIsInJlY3QiLCJtYXhheCIsIm1heGF5IiwibWF4YngiLCJtYXhieSIsImludGVyc2VjdGlvbiIsInJlY3RCIiwiYXhNaW4iLCJheU1pbiIsImF4TWF4IiwiYXlNYXgiLCJieE1pbiIsImJ5TWluIiwiYnhNYXgiLCJieU1heCIsImNvbnRhaW5zIiwicG9pbnQiLCJjb250YWluc1JlY3QiLCJ1bmlvbiIsImF4IiwiYXkiLCJhdyIsImFoIiwiYngiLCJieSIsImJ3IiwiYmgiLCJ0cmFuc2Zvcm1NYXQ0IiwibWF0Iiwib2wiLCJvYiIsIm9yIiwib3QiLCJtYXRtIiwibSIsImxieCIsImxieSIsInJieCIsInJieSIsImx0eCIsImx0eSIsInJ0eCIsInJ0eSIsIm1pblgiLCJtYXhYIiwibWluWSIsIm1heFkiLCJ0b1N0cmluZyIsInRvRml4ZWQiLCJ2IiwidmFsdWUiLCJWZWMyIiwiU2l6ZSIsIlZhbHVlVHlwZSIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwiY2MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUFFQTs7Ozs7OztBQU1BOzs7Ozs7Ozs7Ozs7O0lBYXFCQTs7O0FBRWpCOzs7Ozs7Ozs7OztPQVdPQyxhQUFQLG9CQUFtQkMsRUFBbkIsRUFBNkJDLEVBQTdCLEVBQXVDO0FBQ25DLFFBQUlDLEtBQUssR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNK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QUFJc0UsZ0JBQUosQ0FBUyxLQUFLaEUsS0FBZCxFQUFxQixLQUFLQyxNQUExQixDQUFQO0FBQ0g7c0JBQ1M2RCxPQUFPO0FBQ2IsV0FBSzlELEtBQUwsR0FBYThELEtBQUssQ0FBQzlELEtBQW5CO0FBQ0EsV0FBS0MsTUFBTCxHQUFjNkQsS0FBSyxDQUFDN0QsTUFBcEI7QUFDSDs7OztFQS9XNkJnRTs7OztBQWtYbENDLG9CQUFRQyxVQUFSLENBQW1CLFNBQW5CLEVBQThCbEYsSUFBOUIsRUFBb0M7QUFBRU8sRUFBQUEsQ0FBQyxFQUFFLENBQUw7QUFBUUUsRUFBQUEsQ0FBQyxFQUFFLENBQVg7QUFBY00sRUFBQUEsS0FBSyxFQUFFLENBQXJCO0FBQXdCQyxFQUFBQSxNQUFNLEVBQUU7QUFBaEMsQ0FBcEM7O0FBQ0FtRSxFQUFFLENBQUNuRixJQUFILEdBQVVBLElBQVY7QUFHQTs7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZUFtRixFQUFFLENBQUN4RCxJQUFILEdBQVUsU0FBU0EsSUFBVCxDQUFlcEIsQ0FBZixFQUFrQkUsQ0FBbEIsRUFBcUJJLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQjtBQUNqQyxTQUFPLElBQUlkLElBQUosQ0FBU08sQ0FBVCxFQUFZRSxDQUFaLEVBQWVJLENBQWYsRUFBa0JDLENBQWxCLENBQVA7QUFDSCxDQUZEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XG5pbXBvcnQgQ0NDbGFzcyBmcm9tICcuLi9wbGF0Zm9ybS9DQ0NsYXNzJztcbmltcG9ydCBWZWMyIGZyb20gJy4vdmVjMic7XG5pbXBvcnQgTWF0NCBmcm9tICcuL21hdDQnO1xuaW1wb3J0IFNpemUgZnJvbSAnLi9zaXplJztcblxuLyoqXG4gKiAhI2VuIEEgMkQgcmVjdGFuZ2xlIGRlZmluZWQgYnkgeCwgeSBwb3NpdGlvbiBhbmQgd2lkdGgsIGhlaWdodC5cbiAqICEjemgg6YCa6L+H5L2N572u5ZKM5a696auY5a6a5LmJ55qEIDJEIOefqeW9ouOAglxuICogQGNsYXNzIFJlY3RcbiAqIEBleHRlbmRzIFZhbHVlVHlwZVxuICovXG4vKipcbiAqICEjZW5cbiAqIENvbnN0cnVjdG9yIG9mIFJlY3QgY2xhc3MuXG4gKiBzZWUge3sjY3Jvc3NMaW5rIFwiY2MvcmVjdDptZXRob2RcIn19IGNjLnJlY3Qge3svY3Jvc3NMaW5rfX0gZm9yIGNvbnZlbmllbmNlIG1ldGhvZC5cbiAqICEjemhcbiAqIFJlY3TnsbvnmoTmnoTpgKDlh73mlbDjgILlj6/ku6XpgJrov4cge3sjY3Jvc3NMaW5rIFwiY2MvcmVjdDptZXRob2RcIn19IGNjLnJlY3Qge3svY3Jvc3NMaW5rfX0g566A5L6/5pa55rOV6L+b6KGM5Yib5bu644CCXG4gKlxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IFt4PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3k9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbdz0wXVxuICogQHBhcmFtIHtOdW1iZXJ9IFtoPTBdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3QgZXh0ZW5kcyBWYWx1ZVR5cGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiBDcmVhdGVzIGEgcmVjdGFuZ2xlIGZyb20gdHdvIGNvb3JkaW5hdGUgdmFsdWVzLlxuICAgICAqICEjemgg5qC55o2u5oyH5a6aIDIg5Liq5Z2Q5qCH5Yib5bu65Ye65LiA5Liq55+p5b2i5Yy65Z+f44CCXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZXRob2QgZnJvbU1pbk1heFxuICAgICAqIEBwYXJhbSB7VmVjMn0gdjFcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHYyXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLlJlY3QuZnJvbU1pbk1heChjYy52MigxMCwgMTApLCBjYy52MigyMCwgMjApKTsgLy8gUmVjdCB7eDogMTAsIHk6IDEwLCB3aWR0aDogMTAsIGhlaWdodDogMTB9O1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tTWluTWF4ICh2MTogVmVjMiwgdjI6IFZlYzIpIHtcbiAgICAgICAgdmFyIG1pbl94ID0gTWF0aC5taW4odjEueCwgdjIueCk7XG4gICAgICAgIHZhciBtaW5feSA9IE1hdGgubWluKHYxLnksIHYyLnkpO1xuICAgICAgICB2YXIgbWF4X3ggPSBNYXRoLm1heCh2MS54LCB2Mi54KTtcbiAgICAgICAgdmFyIG1heF95ID0gTWF0aC5tYXgodjEueSwgdjIueSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZWN0KG1pbl94LCBtaW5feSwgbWF4X3ggLSBtaW5feCwgbWF4X3kgLSBtaW5feSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHhcbiAgICAgKi9cbiAgICB4OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcbiAgICAgKi9cbiAgICB5OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gICAgICovXG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gICAgICovXG4gICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgY29uc3RydWN0b3IgKHg6IFJlY3QgfCBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCB3OiBudW1iZXIgPSAwLCBoOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICAgIHcgPSB4LndpZHRoO1xuICAgICAgICAgICAgaCA9IHguaGVpZ2h0O1xuICAgICAgICAgICAgeCA9IHgueDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggPSB4IGFzIG51bWJlciB8fCAwO1xuICAgICAgICB0aGlzLnkgPSB5IHx8IDA7XG4gICAgICAgIHRoaXMud2lkdGggPSB3IHx8IDA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaCB8fCAwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDlhYvpmobkuIDkuKrmlrDnmoQgUmVjdOOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xuICAgICAqIGEuY2xvbmUoKTsvLyBSZWN0IHt4OiAwLCB5OiAwLCB3aWR0aDogMTAsIGhlaWdodDogMTB9XG4gICAgICovXG4gICAgY2xvbmUgKCk6IFJlY3Qge1xuICAgICAgICByZXR1cm4gbmV3IFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOaYr+WQpuetieS6juaMh+WumueahOefqeW9ouOAglxuICAgICAqIEBtZXRob2QgZXF1YWxzXG4gICAgICogQHBhcmFtIHtSZWN0fSBvdGhlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDAsIDEwLCAxMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xuICAgICAqIGEuZXF1YWxzKGIpOy8vIHRydWU7XG4gICAgICovXG4gICAgZXF1YWxzIChvdGhlcjogUmVjdCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb3RoZXIgJiZcbiAgICAgICAgICAgIHRoaXMueCA9PT0gb3RoZXIueCAmJlxuICAgICAgICAgICAgdGhpcy55ID09PSBvdGhlci55ICYmXG4gICAgICAgICAgICB0aGlzLndpZHRoID09PSBvdGhlci53aWR0aCAmJlxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPT09IG90aGVyLmhlaWdodDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDnur/mgKfmj5LlgLxcbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAcGFyYW0ge1JlY3R9IHRvXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuXG4gICAgICogQHBhcmFtIHtSZWN0fSBbb3V0XSAtIG9wdGlvbmFsLCB0aGUgcmVjZWl2aW5nIHZlY3Rvci5cbiAgICAgKiBAcmV0dXJuIHtSZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xuICAgICAqIHZhciBiID0gbmV3IGNjLlJlY3QoNTAsIDUwLCAxMDAsIDEwMCk7XG4gICAgICogdXBkYXRlIChkdCkge1xuICAgICAqICAgIC8vIG1ldGhvZCAxO1xuICAgICAqICAgIHZhciBjID0gYS5sZXJwKGIsIGR0ICogMC4xKTtcbiAgICAgKiAgICAvLyBtZXRob2QgMjtcbiAgICAgKiAgICBhLmxlcnAoYiwgZHQgKiAwLjEsIGMpO1xuICAgICAqIH1cbiAgICAgKi9cbiAgICBsZXJwICh0bzogUmVjdCwgcmF0aW86IG51bWJlciwgb3V0PzogUmVjdCk6IFJlY3Qge1xuICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IFJlY3QoKTtcbiAgICAgICAgdmFyIHggPSB0aGlzLng7XG4gICAgICAgIHZhciB5ID0gdGhpcy55O1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIG91dC54ID0geCArICh0by54IC0geCkgKiByYXRpbztcbiAgICAgICAgb3V0LnkgPSB5ICsgKHRvLnkgLSB5KSAqIHJhdGlvO1xuICAgICAgICBvdXQud2lkdGggPSB3aWR0aCArICh0by53aWR0aCAtIHdpZHRoKSAqIHJhdGlvO1xuICAgICAgICBvdXQuaGVpZ2h0ID0gaGVpZ2h0ICsgKHRvLmhlaWdodCAtIGhlaWdodCkgKiByYXRpbztcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xuXG4gICAgc2V0IChzb3VyY2U6IFJlY3QpOiBSZWN0IHtcbiAgICAgICAgdGhpcy54ID0gc291cmNlLng7XG4gICAgICAgIHRoaXMueSA9IHNvdXJjZS55O1xuICAgICAgICB0aGlzLndpZHRoID0gc291cmNlLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHNvdXJjZS5oZWlnaHQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2sgd2hldGhlciB0aGUgY3VycmVudCByZWN0YW5nbGUgaW50ZXJzZWN0cyB3aXRoIHRoZSBnaXZlbiBvbmVcbiAgICAgKiAhI3poIOW9k+WJjeefqeW9ouS4juaMh+WumuefqeW9ouaYr+WQpuebuOS6pOOAglxuICAgICAqIEBtZXRob2QgaW50ZXJzZWN0c1xuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDAsIDEwLCAxMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAwLCAyMCwgMjApO1xuICAgICAqIGEuaW50ZXJzZWN0cyhiKTsvLyB0cnVlXG4gICAgICovXG4gICAgaW50ZXJzZWN0cyAocmVjdDogUmVjdCk6IGJvb2xlYW4ge1xuICAgICAgICB2YXIgbWF4YXggPSB0aGlzLnggKyB0aGlzLndpZHRoLFxuICAgICAgICAgICAgbWF4YXkgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCxcbiAgICAgICAgICAgIG1heGJ4ID0gcmVjdC54ICsgcmVjdC53aWR0aCxcbiAgICAgICAgICAgIG1heGJ5ID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG4gICAgICAgIHJldHVybiAhKG1heGF4IDwgcmVjdC54IHx8IG1heGJ4IDwgdGhpcy54IHx8IG1heGF5IDwgcmVjdC55IHx8IG1heGJ5IDwgdGhpcy55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIG92ZXJsYXBwaW5nIHBvcnRpb24gb2YgMiByZWN0YW5nbGVzLlxuICAgICAqICEjemgg6L+U5ZueIDIg5Liq55+p5b2i6YeN5Y+g55qE6YOo5YiG44CCXG4gICAgICogQG1ldGhvZCBpbnRlcnNlY3Rpb25cbiAgICAgKiBAcGFyYW0ge1JlY3R9IG91dCBTdG9yZXMgdGhlIHJlc3VsdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdEJcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSBSZXR1cm5zIHRoZSBvdXQgcGFyYW1ldGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDEwLCAyMCwgMjApO1xuICAgICAqIHZhciBiID0gbmV3IGNjLlJlY3QoMCwgMTAsIDEwLCAxMCk7XG4gICAgICogdmFyIGludGVyc2VjdGlvbiA9IG5ldyBjYy5SZWN0KCk7XG4gICAgICogYS5pbnRlcnNlY3Rpb24oaW50ZXJzZWN0aW9uLCBiKTsgLy8gaW50ZXJzZWN0aW9uIHt4OiAwLCB5OiAxMCwgd2lkdGg6IDEwLCBoZWlnaHQ6IDEwfTtcbiAgICAgKi9cbiAgICBpbnRlcnNlY3Rpb24gKG91dDogUmVjdCwgcmVjdEI6IFJlY3QpOiBSZWN0IHtcbiAgICAgICAgdmFyIGF4TWluID0gdGhpcy54LCBheU1pbiA9IHRoaXMueSwgYXhNYXggPSB0aGlzLnggKyB0aGlzLndpZHRoLCBheU1heCA9IHRoaXMueSArIHRoaXMuaGVpZ2h0O1xuICAgICAgICB2YXIgYnhNaW4gPSByZWN0Qi54LCBieU1pbiA9IHJlY3RCLnksIGJ4TWF4ID0gcmVjdEIueCArIHJlY3RCLndpZHRoLCBieU1heCA9IHJlY3RCLnkgKyByZWN0Qi5oZWlnaHQ7XG4gICAgICAgIG91dC54ID0gTWF0aC5tYXgoYXhNaW4sIGJ4TWluKTtcbiAgICAgICAgb3V0LnkgPSBNYXRoLm1heChheU1pbiwgYnlNaW4pO1xuICAgICAgICBvdXQud2lkdGggPSBNYXRoLm1pbihheE1heCwgYnhNYXgpIC0gb3V0Lng7XG4gICAgICAgIG91dC5oZWlnaHQgPSBNYXRoLm1pbihheU1heCwgYnlNYXgpIC0gb3V0Lnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVjayB3aGV0aGVyIHRoZSBjdXJyZW50IHJlY3QgY29udGFpbnMgdGhlIGdpdmVuIHBvaW50XG4gICAgICogISN6aCDlvZPliY3nn6nlvaLmmK/lkKbljIXlkKvmjIflrprlnZDmoIfngrnjgIJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGluc2lkZSB0aGlzIHJlY3RhbmdsZS5cbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb2ludFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDAsIDEwLCAxMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MuVmVjMigwLCA1KTtcbiAgICAgKiBhLmNvbnRhaW5zKGIpOy8vIHRydWVcbiAgICAgKi9cbiAgICBjb250YWlucyAocG9pbnQ6IFZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPD0gcG9pbnQueCAmJlxuICAgICAgICAgICAgdGhpcy54ICsgdGhpcy53aWR0aCA+PSBwb2ludC54ICYmXG4gICAgICAgICAgICB0aGlzLnkgPD0gcG9pbnQueSAmJlxuICAgICAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgPj0gcG9pbnQueSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRydWUgaWYgdGhlIG90aGVyIHJlY3QgdG90YWxseSBpbnNpZGUgdGhpcyByZWN0YW5nbGUuXG4gICAgICogISN6aCDlvZPliY3nn6nlvaLmmK/lkKbljIXlkKvmjIflrprnn6nlvaLjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnRhaW5zUmVjdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gcmVjdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAsIDAsIDIwLCAyMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xuICAgICAqIGEuY29udGFpbnNSZWN0KGIpOy8vIHRydWVcbiAgICAgKi9cbiAgICBjb250YWluc1JlY3QgKHJlY3Q6IFJlY3QpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLnggPD0gcmVjdC54ICYmXG4gICAgICAgICAgICB0aGlzLnggKyB0aGlzLndpZHRoID49IHJlY3QueCArIHJlY3Qud2lkdGggJiZcbiAgICAgICAgICAgIHRoaXMueSA8PSByZWN0LnkgJiZcbiAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ID49IHJlY3QueSArIHJlY3QuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHNtYWxsZXN0IHJlY3RhbmdsZSB0aGF0IGNvbnRhaW5zIHRoZSBjdXJyZW50IHJlY3QgYW5kIHRoZSBnaXZlbiByZWN0LlxuICAgICAqICEjemgg6L+U5Zue5LiA5Liq5YyF5ZCr5b2T5YmN55+p5b2i5ZKM5oyH5a6a55+p5b2i55qE5pyA5bCP55+p5b2i44CCXG4gICAgICogQG1ldGhvZCB1bmlvblxuICAgICAqIEBwYXJhbSB7UmVjdH0gb3V0IFN0b3JlcyB0aGUgcmVzdWx0XG4gICAgICogQHBhcmFtIHtSZWN0fSByZWN0QlxuICAgICAqIEByZXR1cm4ge1JlY3R9IFJldHVybnMgdGhlIG91dCBwYXJhbWV0ZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhID0gbmV3IGNjLlJlY3QoMCwgMTAsIDIwLCAyMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MuUmVjdCgwLCAxMCwgMTAsIDEwKTtcbiAgICAgKiB2YXIgdW5pb24gPSBuZXcgY2MuUmVjdCgpO1xuICAgICAqIGEudW5pb24odW5pb24sIGIpOyAvLyB1bmlvbiB7eDogMCwgeTogMTAsIHdpZHRoOiAyMCwgaGVpZ2h0OiAyMH07XG4gICAgICovXG4gICAgdW5pb24gKG91dDogUmVjdCwgcmVjdEI6IFJlY3QpOiBSZWN0IHtcbiAgICAgICAgdmFyIGF4ID0gdGhpcy54LCBheSA9IHRoaXMueSwgYXcgPSB0aGlzLndpZHRoLCBhaCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgICB2YXIgYnggPSByZWN0Qi54LCBieSA9IHJlY3RCLnksIGJ3ID0gcmVjdEIud2lkdGgsIGJoID0gcmVjdEIuaGVpZ2h0O1xuICAgICAgICBvdXQueCA9IE1hdGgubWluKGF4LCBieCk7XG4gICAgICAgIG91dC55ID0gTWF0aC5taW4oYXksIGJ5KTtcbiAgICAgICAgb3V0LndpZHRoID0gTWF0aC5tYXgoYXggKyBhdywgYnggKyBidykgLSBvdXQueDtcbiAgICAgICAgb3V0LmhlaWdodCA9IE1hdGgubWF4KGF5ICsgYWgsIGJ5ICsgYmgpIC0gb3V0Lnk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBBcHBseSBtYXRyaXg0IHRvIHRoZSByZWN0LlxuICAgICAqICEjemgg5L2/55SoIG1hdDQg5a+555+p5b2i6L+b6KGM55+p6Zi16L2s5o2i44CCXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1NYXQ0XG4gICAgICogQHBhcmFtIG91dCB7UmVjdH0gVGhlIG91dHB1dCByZWN0XG4gICAgICogQHBhcmFtIG1hdCB7TWF0NH0gVGhlIG1hdHJpeDRcbiAgICAgKi9cbiAgICB0cmFuc2Zvcm1NYXQ0IChvdXQ6IFJlY3QsIG1hdDogTWF0NCk6IFJlY3Qge1xuICAgICAgICBsZXQgb2wgPSB0aGlzLng7XG4gICAgICAgIGxldCBvYiA9IHRoaXMueTtcbiAgICAgICAgbGV0IG9yID0gb2wgKyB0aGlzLndpZHRoO1xuICAgICAgICBsZXQgb3QgPSBvYiArIHRoaXMuaGVpZ2h0O1xuICAgICAgICBsZXQgbWF0bSA9IG1hdC5tO1xuICAgICAgICBsZXQgbGJ4ID0gbWF0bVswXSAqIG9sICsgbWF0bVs0XSAqIG9iICsgbWF0bVsxMl07XG4gICAgICAgIGxldCBsYnkgPSBtYXRtWzFdICogb2wgKyBtYXRtWzVdICogb2IgKyBtYXRtWzEzXTtcbiAgICAgICAgbGV0IHJieCA9IG1hdG1bMF0gKiBvciArIG1hdG1bNF0gKiBvYiArIG1hdG1bMTJdO1xuICAgICAgICBsZXQgcmJ5ID0gbWF0bVsxXSAqIG9yICsgbWF0bVs1XSAqIG9iICsgbWF0bVsxM107XG4gICAgICAgIGxldCBsdHggPSBtYXRtWzBdICogb2wgKyBtYXRtWzRdICogb3QgKyBtYXRtWzEyXTtcbiAgICAgICAgbGV0IGx0eSA9IG1hdG1bMV0gKiBvbCArIG1hdG1bNV0gKiBvdCArIG1hdG1bMTNdO1xuICAgICAgICBsZXQgcnR4ID0gbWF0bVswXSAqIG9yICsgbWF0bVs0XSAqIG90ICsgbWF0bVsxMl07XG4gICAgICAgIGxldCBydHkgPSBtYXRtWzFdICogb3IgKyBtYXRtWzVdICogb3QgKyBtYXRtWzEzXTtcblxuICAgICAgICBsZXQgbWluWCA9IE1hdGgubWluKGxieCwgcmJ4LCBsdHgsIHJ0eCk7XG4gICAgICAgIGxldCBtYXhYID0gTWF0aC5tYXgobGJ4LCByYngsIGx0eCwgcnR4KTtcbiAgICAgICAgbGV0IG1pblkgPSBNYXRoLm1pbihsYnksIHJieSwgbHR5LCBydHkpO1xuICAgICAgICBsZXQgbWF4WSA9IE1hdGgubWF4KGxieSwgcmJ5LCBsdHksIHJ0eSk7XG5cbiAgICAgICAgb3V0LnggPSBtaW5YO1xuICAgICAgICBvdXQueSA9IG1pblk7XG4gICAgICAgIG91dC53aWR0aCA9IG1heFggLSBtaW5YO1xuICAgICAgICBvdXQuaGVpZ2h0ID0gbWF4WSAtIG1pblk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBPdXRwdXQgcmVjdCBpbmZvcm1hdGlvbnMgdG8gc3RyaW5nXG4gICAgICogISN6aCDovazmjaLkuLrmlrnkvr/pmIXor7vnmoTlrZfnrKbkuLJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGEgPSBuZXcgY2MuUmVjdCgwLCAwLCAxMCwgMTApO1xuICAgICAqIGEudG9TdHJpbmcoKTsvLyBcIigwLjAwLCAwLjAwLCAxMC4wMCwgMTAuMDApXCI7XG4gICAgICovXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnKCcgKyB0aGlzLngudG9GaXhlZCgyKSArICcsICcgKyB0aGlzLnkudG9GaXhlZCgyKSArICcsICcgKyB0aGlzLndpZHRoLnRvRml4ZWQoMikgK1xuICAgICAgICAgICAgJywgJyArIHRoaXMuaGVpZ2h0LnRvRml4ZWQoMikgKyAnKSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbWluaW11bSB4IHZhbHVlLCBlcXVhbHMgdG8gcmVjdC54XG4gICAgICogISN6aCDnn6nlvaIgeCDovbTkuIrnmoTmnIDlsI/lgLzvvIznrYnku7fkuo4gcmVjdC5444CCXG4gICAgICogQHByb3BlcnR5IHhNaW5cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCB4TWluICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcbiAgICB9XG4gICAgc2V0IHhNaW4gKHYpIHtcbiAgICAgICAgdGhpcy53aWR0aCArPSB0aGlzLnggLSB2O1xuICAgICAgICB0aGlzLnggPSB2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogISNlbiBUaGUgbWluaW11bSB5IHZhbHVlLCBlcXVhbHMgdG8gcmVjdC55XG4gICAgKiAhI3poIOefqeW9oiB5IOi9tOS4iueahOacgOWwj+WAvOOAglxuICAgICogQHByb3BlcnR5IHlNaW5cbiAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgKi9cbiAgICBnZXQgeU1pbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnk7XG4gICAgfVxuICAgIHNldCB5TWluICh2KSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ICs9IHRoaXMueSAtIHY7XG4gICAgICAgIHRoaXMueSA9IHY7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAqICEjZW4gVGhlIG1heGltdW0geCB2YWx1ZS5cbiAgICAqICEjemgg55+p5b2iIHgg6L205LiK55qE5pyA5aSn5YC844CCXG4gICAgKiBAcHJvcGVydHkgeE1heFxuICAgICogQHR5cGUge051bWJlcn1cbiAgICAqL1xuICAgIGdldCB4TWF4ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGg7XG4gICAgfVxuICAgIHNldCB4TWF4ICh2YWx1ZSkge1xuICAgICAgICB0aGlzLndpZHRoID0gdmFsdWUgLSB0aGlzLng7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiAhI2VuIFRoZSBtYXhpbXVtIHkgdmFsdWUuXG4gICAgKiAhI3poIOefqeW9oiB5IOi9tOS4iueahOacgOWkp+WAvOOAglxuICAgICogQHByb3BlcnR5IHlNYXhcbiAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgKi9cbiAgICBnZXQgeU1heCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgICB9XG4gICAgc2V0IHlNYXggKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdmFsdWUgLSB0aGlzLnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiAhI2VuIFRoZSBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIHRoZSByZWN0YW5nbGUuXG4gICAgKiAhI3poIOefqeW9oueahOS4reW/g+eCueOAglxuICAgICogQHByb3BlcnR5IHtWZWMyfSBjZW50ZXJcbiAgICAqL1xuICAgIGdldCBjZW50ZXIgKCkge1xuICAgICAgICByZXR1cm4gbmV3IFZlYzIodGhpcy54ICsgdGhpcy53aWR0aCAqIDAuNSxcbiAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0ICogMC41KTtcbiAgICB9XG4gICAgc2V0IGNlbnRlciAodmFsdWUpIHtcbiAgICAgICAgdGhpcy54ID0gdmFsdWUueCAtIHRoaXMud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMueSA9IHZhbHVlLnkgLSB0aGlzLmhlaWdodCAqIDAuNTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqICEjZW4gVGhlIFggYW5kIFkgcG9zaXRpb24gb2YgdGhlIHJlY3RhbmdsZS5cbiAgICAqICEjemgg55+p5b2i55qEIHgg5ZKMIHkg5Z2Q5qCH44CCXG4gICAgKiBAcHJvcGVydHkge1ZlYzJ9IG9yaWdpblxuICAgICovXG4gICAgZ2V0IG9yaWdpbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjMih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxuICAgIHNldCBvcmlnaW4gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMueCA9IHZhbHVlLng7XG4gICAgICAgIHRoaXMueSA9IHZhbHVlLnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiAhI2VuIFdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS5cbiAgICAqICEjemgg55+p5b2i55qE5aSn5bCP44CCXG4gICAgKiBAcHJvcGVydHkge1NpemV9IHNpemVcbiAgICAqL1xuICAgIGdldCBzaXplICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gICAgc2V0IHNpemUgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB2YWx1ZS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQ7XG4gICAgfVxufVxuXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLlJlY3QnLCBSZWN0LCB7IHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XG5jYy5SZWN0ID0gUmVjdDtcblxuXG4vKipcbiAqIEBtb2R1bGUgY2NcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIFRoZSBjb252ZW5pZW5jZSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlY3QuXG4gKiBzZWUge3sjY3Jvc3NMaW5rIFwiUmVjdC9SZWN0Om1ldGhvZFwifX1jYy5SZWN0e3svY3Jvc3NMaW5rfX1cbiAqICEjemhcbiAqIOivpeaWueazleeUqOadpeW/q+mAn+WIm+W7uuS4gOS4quaWsOeahOefqeW9ouOAgnt7I2Nyb3NzTGluayBcIlJlY3QvUmVjdDptZXRob2RcIn19Y2MuUmVjdHt7L2Nyb3NzTGlua319XG4gKiBAbWV0aG9kIHJlY3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBbeD0wXVxuICogQHBhcmFtIHtOdW1iZXJ9IFt5PTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW3c9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbaD0wXVxuICogQHJldHVybiB7UmVjdH1cbiAqIEBleGFtcGxlXG4gKiB2YXIgYSA9IG5ldyBjYy5SZWN0KDAgLCAwLCAxMCwgMCk7XG4gKi9cbmNjLnJlY3QgPSBmdW5jdGlvbiByZWN0ICh4LCB5LCB3LCBoKSB7XG4gICAgcmV0dXJuIG5ldyBSZWN0KHgsIHksIHcsIGgpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9