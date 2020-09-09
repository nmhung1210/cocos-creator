
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/color.js';
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * !#en
 * Representation of RGBA colors.
 *
 * Each color component is a floating point value with a range from 0 to 255.
 *
 * You can also use the convenience method {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} to create a new Color.
 *
 * !#zh
 * cc.Color 用于表示颜色。
 *
 * 它包含 RGBA 四个以浮点数保存的颜色分量，每个的值都在 0 到 255 之间。
 *
 * 您也可以通过使用 {{#crossLink "cc/color:method"}}cc.color{{/crossLink}} 的便捷方法来创建一个新的 Color。
 *
 * @class Color
 * @extends ValueType
 */
var Color = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Color, _ValueType);

  /**
   * Copy content of a color into another.
   * @method copy
   * @typescript
   * copy (out: Color, a: Color): Color
   * @static
   */
  Color.copy = function copy(out, a) {
    out.r = a.r;
    out.g = a.g;
    out.b = a.b;
    out.a = a.a;
    return out;
  }
  /**
   * Clone a new color.
   * @method clone
   * @typescript
   * clone (a: Color): Color
   * @static
   */
  ;

  Color.clone = function clone(a) {
    return new Color(a.r, a.g, a.b, a.a);
  }
  /**
   * Set the components of a color to the given values.
   * @method set
   * @typescript
   * set (out: Color, r?: number, g?: number, b?: number, a?: number): Color
   * @static
   */
  ;

  Color.set = function set(out, r, g, b, a) {
    if (r === void 0) {
      r = 255;
    }

    if (g === void 0) {
      g = 255;
    }

    if (b === void 0) {
      b = 255;
    }

    if (a === void 0) {
      a = 255;
    }

    out.r = r;
    out.g = g;
    out.b = b;
    out.a = a;
    return out;
  }
  /**
   * Converts the hexadecimal formal color into rgb formal.
   * @method fromHex
   * @typescript
   * fromHex (out: Color, hex: number): Color
   * @static
   * @deprecated
   */
  ;

  Color.fromHex = function fromHex(out, hex) {
    var r = (hex >> 24) / 255.0;
    var g = (hex >> 16 & 0xff) / 255.0;
    var b = (hex >> 8 & 0xff) / 255.0;
    var a = (hex & 0xff) / 255.0;
    out.r = r;
    out.g = g;
    out.b = b;
    out.a = a;
    return out;
  }
  /**
   * Converts the hexadecimal formal color into rgb formal.
   * @method fromHEX
   * @typescript
   * fromHEX (out: Color, hex: string): Color
   * @static
   */
  ;

  Color.fromHEX = function fromHEX(out, hexString) {
    hexString = hexString.indexOf('#') === 0 ? hexString.substring(1) : hexString;
    out.r = parseInt(hexString.substr(0, 2), 16) || 0;
    out.g = parseInt(hexString.substr(2, 2), 16) || 0;
    out.b = parseInt(hexString.substr(4, 2), 16) || 0;
    out.a = parseInt(hexString.substr(6, 2), 16) || 255;
    out._val = (out.a << 24 >>> 0) + (out.b << 16) + (out.g << 8) + out.r;
    return out;
  }
  /**
   * Add components of two colors, respectively.
   * @method add
   * @typescript
   * add (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.add = function add(out, a, b) {
    out.r = a.r + b.r;
    out.g = a.g + b.g;
    out.b = a.b + b.b;
    out.a = a.a + b.a;
    return out;
  }
  /**
   * Subtract components of color b from components of color a, respectively.
   * @method subtract
   * @typescript
   * subtract (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.subtract = function subtract(out, a, b) {
    out.r = a.r - b.r;
    out.g = a.g - b.g;
    out.b = a.b - b.b;
    out.a = a.a - b.a;
    return out;
  }
  /**
   * Multiply components of two colors, respectively.
   * @method multiply
   * @typescript
   * multiply (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.multiply = function multiply(out, a, b) {
    out.r = a.r * b.r;
    out.g = a.g * b.g;
    out.b = a.b * b.b;
    out.a = a.a * b.a;
    return out;
  }
  /**
   * Divide components of color a by components of color b, respectively.
   * @method divide
   * @typescript
   * divide (out: Color, a: Color, b: Color): Color
   * @static
   */
  ;

  Color.divide = function divide(out, a, b) {
    out.r = a.r / b.r;
    out.g = a.g / b.g;
    out.b = a.b / b.b;
    out.a = a.a / b.a;
    return out;
  }
  /**
   * Scales a color by a number.
   * @method scale
   * @typescript
   * scale (out: Color, a: Color, b: number): Color
   * @static
   */
  ;

  Color.scale = function scale(out, a, b) {
    out.r = a.r * b;
    out.g = a.g * b;
    out.b = a.b * b;
    out.a = a.a * b;
    return out;
  }
  /**
   * Performs a linear interpolation between two colors.
   * @method lerp
   * @typescript
   * lerp (out: Color, a: Color, b: Color, t: number): Color
   * @static
   */
  ;

  Color.lerp = function lerp(out, a, b, t) {
    var ar = a.r,
        ag = a.g,
        ab = a.b,
        aa = a.a;
    out.r = ar + t * (b.r - ar);
    out.g = ag + t * (b.g - ag);
    out.b = ab + t * (b.b - ab);
    out.a = aa + t * (b.a - aa);
    return out;
  }
  /**
   * !#zh 颜色转数组
   * !#en Turn an array of colors
   * @method toArray
   * @typescript
   * toArray <Out extends IWritableArrayLike<number>> (out: Out, a: IColorLike, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Color.toArray = function toArray(out, a, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    var scale = a instanceof Color || a.a > 1 ? 1 / 255 : 1;
    out[ofs + 0] = a.r * scale;
    out[ofs + 1] = a.g * scale;
    out[ofs + 2] = a.b * scale;
    out[ofs + 3] = a.a * scale;
    return out;
  }
  /**
   * !#zh 数组转颜色
   * !#en An array of colors turn
   * @method fromArray
   * @typescript
   * fromArray <Out extends IColorLike> (arr: IWritableArrayLike<number>, out: Out, ofs?: number): Out
   * @param ofs 数组起始偏移量
   * @static
   */
  ;

  Color.fromArray = function fromArray(arr, out, ofs) {
    if (ofs === void 0) {
      ofs = 0;
    }

    out.r = arr[ofs + 0] * 255;
    out.g = arr[ofs + 1] * 255;
    out.b = arr[ofs + 2] * 255;
    out.a = arr[ofs + 3] * 255;
    return out;
  }
  /**
   * !#zh 颜色 RGB 预乘 Alpha 通道
   * !#en RGB premultiply alpha channel
   * @method premultiplyAlpha
   * @typescript
   * premultiplyAlpha <Out extends IColorLike> (out: Out, a: IColorLike)
   * @param out 返回颜色
   * @param color 预乘处理的目标颜色
   * @static
   */
  ;

  Color.premultiplyAlpha = function premultiplyAlpha(out, color) {
    var alpha = color.a / 255.0;
    out.r = color.r * alpha;
    out.g = color.g * alpha;
    out.b = color.b * alpha;

    out._fastSetA(color.a);

    return out;
  };

  _createClass(Color, null, [{
    key: "WHITE",

    /**
     * !#en Solid white, RGBA is [255, 255, 255, 255].
     * !#zh 纯白色，RGBA 是 [255, 255, 255, 255]。
     * @property WHITE
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(255, 255, 255, 255);
    }
  }, {
    key: "BLACK",

    /**
     * !#en Solid black, RGBA is [0, 0, 0, 255].
     * !#zh 纯黑色，RGBA 是 [0, 0, 0, 255]。
     * @property BLACK
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(0, 0, 0, 255);
    }
  }, {
    key: "TRANSPARENT",

    /**
     * !#en Transparent, RGBA is [0, 0, 0, 0].
     * !#zh 透明，RGBA 是 [0, 0, 0, 0]。
     * @property TRANSPARENT
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(0, 0, 0, 0);
    }
  }, {
    key: "GRAY",

    /**
     * !#en Grey, RGBA is [127.5, 127.5, 127.5].
     * !#zh 灰色，RGBA 是 [127.5, 127.5, 127.5]。
     * @property GRAY
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(127.5, 127.5, 127.5);
    }
  }, {
    key: "RED",

    /**
     * !#en Solid red, RGBA is [255, 0, 0].
     * !#zh 纯红色，RGBA 是 [255, 0, 0]。
     * @property RED
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(255, 0, 0);
    }
  }, {
    key: "GREEN",

    /**
     * !#en Solid green, RGBA is [0, 255, 0].
     * !#zh 纯绿色，RGBA 是 [0, 255, 0]。
     * @property GREEN
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(0, 255, 0);
    }
  }, {
    key: "BLUE",

    /**
     * !#en Solid blue, RGBA is [0, 0, 255].
     * !#zh 纯蓝色，RGBA 是 [0, 0, 255]。
     * @property BLUE
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(0, 0, 255);
    }
  }, {
    key: "YELLOW",

    /**
     * !#en Yellow, RGBA is [255, 235, 4].
     * !#zh 黄色，RGBA 是 [255, 235, 4]。
     * @property YELLOW
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(255, 235, 4);
    }
  }, {
    key: "ORANGE",

    /**
     * !#en Orange, RGBA is [255, 127, 0].
     * !#zh 橙色，RGBA 是 [255, 127, 0]。
     * @property ORANGE
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(255, 127, 0);
    }
  }, {
    key: "CYAN",

    /**
     * !#en Cyan, RGBA is [0, 255, 255].
     * !#zh 青色，RGBA 是 [0, 255, 255]。
     * @property CYAN
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(0, 255, 255);
    }
  }, {
    key: "MAGENTA",

    /**
     * !#en Magenta, RGBA is [255, 0, 255].
     * !#zh 洋红色（品红色），RGBA 是 [255, 0, 255]。
     * @property MAGENTA
     * @type {Color}
     * @static
     */
    get: function get() {
      return new Color(255, 0, 255);
    }
  }]);

  /**
   * @method constructor
   * @param {Number} [r=0] - red component of the color, default value is 0.
   * @param {Number} [g=0] - green component of the color, defualt value is 0.
   * @param {Number} [b=0] - blue component of the color, default value is 0.
   * @param {Number} [a=255] - alpha component of the color, default value is 255.
   */
  function Color(r, g, b, a) {
    var _this;

    if (r === void 0) {
      r = 0;
    }

    if (g === void 0) {
      g = 0;
    }

    if (b === void 0) {
      b = 0;
    }

    if (a === void 0) {
      a = 255;
    }

    _this = _ValueType.call(this) || this;
    _this._val = 0;

    if (typeof r === 'object') {
      g = r.g;
      b = r.b;
      a = r.a;
      r = r.r;
    }

    _this._val = (a << 24 >>> 0) + (b << 16) + (g << 8) + r;
    return _this;
  }
  /**
   * !#en Clone a new color from the current color.
   * !#zh 克隆当前颜色。
   * @method clone
   * @return {Color} Newly created color.
   * @example
   * var color = new cc.Color();
   * var newColor = color.clone();// Color {r: 0, g: 0, b: 0, a: 255}
   */


  var _proto = Color.prototype;

  _proto.clone = function clone() {
    var ret = new Color();
    ret._val = this._val;
    return ret;
  }
  /**
   * !#en TODO
   * !#zh 判断两个颜色是否相等。
   * @method equals
   * @param {Color} other
   * @return {Boolean}
   * @example
   * var color1 = cc.Color.WHITE;
   * var color2 = new cc.Color(255, 255, 255);
   * cc.log(color1.equals(color2)); // true;
   * color2 = cc.Color.RED;
   * cc.log(color2.equals(color1)); // false;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this._val === other._val;
  }
  /**
   * !#en TODO
   * !#zh 线性插值
   * @method lerp
   * @param {Color} to
   * @param {number} ratio - the interpolation coefficient.
   * @param {Color} [out] - optional, the receiving vector.
   * @return {Color}
   * @example {@link cocos2d/core/value-types/CCColor/lerp.js}
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Color();
    var r = this.r;
    var g = this.g;
    var b = this.b;
    var a = this.a;
    out.r = r + (to.r - r) * ratio;
    out.g = g + (to.g - g) * ratio;
    out.b = b + (to.b - b) * ratio;
    out.a = a + (to.a - a) * ratio;
    return out;
  };

  /**
   * !#en TODO
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {String}
   * @example
   * var color = cc.Color.WHITE;
   * color.toString(); // "rgba(255, 255, 255, 255)"
   */
  _proto.toString = function toString() {
    return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
  };

  /**
   * !#en Gets red channel value
   * !#zh 获取当前颜色的红色值。
   * @method getR
   * @return {Number} red value.
   */
  _proto.getR = function getR() {
    return this._val & 0x000000ff;
  }
  /**
   * !#en Sets red value and return the current color object
   * !#zh 设置当前的红色值，并返回当前对象。
   * @method setR
   * @param {Number} red - the new Red component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setR(255); // Color {r: 255, g: 0, b: 0, a: 255}
   */
  ;

  _proto.setR = function setR(red) {
    red = ~~_misc["default"].clampf(red, 0, 255);
    this._val = (this._val & 0xffffff00 | red) >>> 0;
    return this;
  }
  /**
   * !#en Gets green channel value
   * !#zh 获取当前颜色的绿色值。
   * @method getG
   * @return {Number} green value.
   */
  ;

  _proto.getG = function getG() {
    return (this._val & 0x0000ff00) >> 8;
  }
  /**
   * !#en Sets green value and return the current color object
   * !#zh 设置当前的绿色值，并返回当前对象。
   * @method setG
   * @param {Number} green - the new Green component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setG(255); // Color {r: 0, g: 255, b: 0, a: 255}
   */
  ;

  _proto.setG = function setG(green) {
    green = ~~_misc["default"].clampf(green, 0, 255);
    this._val = (this._val & 0xffff00ff | green << 8) >>> 0;
    return this;
  }
  /**
   * !#en Gets blue channel value
   * !#zh 获取当前颜色的蓝色值。
   * @method getB
   * @return {Number} blue value.
   */
  ;

  _proto.getB = function getB() {
    return (this._val & 0x00ff0000) >> 16;
  }
  /**
   * !#en Sets blue value and return the current color object
   * !#zh 设置当前的蓝色值，并返回当前对象。
   * @method setB
   * @param {Number} blue - the new Blue component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setB(255); // Color {r: 0, g: 0, b: 255, a: 255}
   */
  ;

  _proto.setB = function setB(blue) {
    blue = ~~_misc["default"].clampf(blue, 0, 255);
    this._val = (this._val & 0xff00ffff | blue << 16) >>> 0;
    return this;
  }
  /**
   * !#en Gets alpha channel value
   * !#zh 获取当前颜色的透明度值。
   * @method getA
   * @return {Number} alpha value.
   */
  ;

  _proto.getA = function getA() {
    return (this._val & 0xff000000) >>> 24;
  }
  /**
   * !#en Sets alpha value and return the current color object
   * !#zh 设置当前的透明度，并返回当前对象。
   * @method setA
   * @param {Number} alpha - the new Alpha component.
   * @return {Color} this color.
   * @example
   * var color = new cc.Color();
   * color.setA(0); // Color {r: 0, g: 0, b: 0, a: 0}
   */
  ;

  _proto.setA = function setA(alpha) {
    alpha = ~~_misc["default"].clampf(alpha, 0, 255);
    this._val = (this._val & 0x00ffffff | alpha << 24) >>> 0;
    return this;
  }
  /**
   * !#en Convert color to css format.
   * !#zh 转换为 CSS 格式。
   * @method toCSS
   * @param {String} [opt="rgba"] - "rgba", "rgb", "#rgb" or "#rrggbb".
   * @return {String}
   * @example
   * var color = cc.Color.BLACK;
   * color.toCSS();          // "rgba(0,0,0,1.00)";
   * color.toCSS("rgba");    // "rgba(0,0,0,1.00)";
   * color.toCSS("rgb");     // "rgba(0,0,0)";
   * color.toCSS("#rgb");    // "#000";
   * color.toCSS("#rrggbb"); // "#000000";
   */
  ;

  _proto.toCSS = function toCSS(opt) {
    if (!opt || opt === 'rgba') {
      return "rgba(" + this.r + "," + this.g + "," + this.b + "," + (this.a / 255).toFixed(2) + ")";
    } else if (opt === 'rgb') {
      return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
    } else {
      return '#' + this.toHEX(opt);
    }
  }
  /**
   * !#en Read hex string and store color data into the current color object, the hex string must be formated as rgba or rgb.
   * !#zh 读取 16 进制颜色。
   * @method fromHEX
   * @param {String} hexString
   * @return {Color}
   * @chainable
   * @example
   * var color = cc.Color.BLACK;
   * color.fromHEX("#FFFF33"); // Color {r: 255, g: 255, b: 51, a: 255};
   */
  ;

  _proto.fromHEX = function fromHEX(hexString) {
    hexString = hexString.indexOf('#') === 0 ? hexString.substring(1) : hexString;
    var r = parseInt(hexString.substr(0, 2), 16) || 0;
    var g = parseInt(hexString.substr(2, 2), 16) || 0;
    var b = parseInt(hexString.substr(4, 2), 16) || 0;
    var a = parseInt(hexString.substr(6, 2), 16) || 255;
    this._val = (a << 24 >>> 0) + (b << 16) + (g << 8) + r;
    return this;
  }
  /**
   * !#en convert Color to HEX color string.
   * !#zh 转换为 16 进制。
   * @method toHEX
   * @param {String} [fmt="#rrggbb"] - "#rgb", "#rrggbb" or "#rrggbbaa".
   * @return {String}
   * @example
   * var color = cc.Color.BLACK;
   * color.toHEX("#rgb");     // "000";
   * color.toHEX("#rrggbb");  // "000000";
   */
  ;

  _proto.toHEX = function toHEX(fmt) {
    var prefix = '0'; // #rrggbb

    var hex = [(this.r < 16 ? prefix : '') + this.r.toString(16), (this.g < 16 ? prefix : '') + this.g.toString(16), (this.b < 16 ? prefix : '') + this.b.toString(16)];

    if (fmt === '#rgb') {
      hex[0] = hex[0][0];
      hex[1] = hex[1][0];
      hex[2] = hex[2][0];
    } else if (fmt === '#rrggbbaa') {
      hex.push((this.a < 16 ? prefix : '') + this.a.toString(16));
    }

    return hex.join('');
  };

  /**
   * !#en Convert to 24bit rgb value.
   * !#zh 转换为 24bit 的 RGB 值。
   * @method toRGBValue
   * @return {Number}
   * @example
   * var color = cc.Color.YELLOW;
   * color.toRGBValue(); // 16771844;
   */
  _proto.toRGBValue = function toRGBValue() {
    return this._val & 0x00ffffff;
  }
  /**
   * !#en Read HSV model color and convert to RGB color
   * !#zh 读取 HSV（色彩模型）格式。
   * @method fromHSV
   * @param {Number} h
   * @param {Number} s
   * @param {Number} v
   * @return {Color}
   * @chainable
   * @example
   * var color = cc.Color.YELLOW;
   * color.fromHSV(0, 0, 1); // Color {r: 255, g: 255, b: 255, a: 255};
   */
  ;

  _proto.fromHSV = function fromHSV(h, s, v) {
    var r, g, b;

    if (s === 0) {
      r = g = b = v;
    } else {
      if (v === 0) {
        r = g = b = 0;
      } else {
        if (h === 1) h = 0;
        h *= 6;
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - s * f);
        var t = v * (1 - s * (1 - f));

        switch (i) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;

          case 1:
            r = q;
            g = v;
            b = p;
            break;

          case 2:
            r = p;
            g = v;
            b = t;
            break;

          case 3:
            r = p;
            g = q;
            b = v;
            break;

          case 4:
            r = t;
            g = p;
            b = v;
            break;

          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
      }
    }

    r *= 255;
    g *= 255;
    b *= 255;
    this._val = (this.a << 24 >>> 0) + (b << 16) + (g << 8) + r;
    return this;
  }
  /**
   * !#en Transform to HSV model color
   * !#zh 转换为 HSV（色彩模型）格式。
   * @method toHSV
   * @return {Object} - {h: number, s: number, v: number}.
   * @example
   * var color = cc.Color.YELLOW;
   * color.toHSV(); // Object {h: 0.1533864541832669, s: 0.9843137254901961, v: 1};
   */
  ;

  _proto.toHSV = function toHSV() {
    var r = this.r / 255;
    var g = this.g / 255;
    var b = this.b / 255;
    var hsv = {
      h: 0,
      s: 0,
      v: 0
    };
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = 0;
    hsv.v = max;
    hsv.s = max ? (max - min) / max : 0;
    if (!hsv.s) hsv.h = 0;else {
      delta = max - min;
      if (r === max) hsv.h = (g - b) / delta;else if (g === max) hsv.h = 2 + (b - r) / delta;else hsv.h = 4 + (r - g) / delta;
      hsv.h /= 6;
      if (hsv.h < 0) hsv.h += 1.0;
    }
    return hsv;
  }
  /**
   * !#en Set the color
   * !#zh 设置颜色
   * @method set
   * @typescript
   * set (color: Color): Color
   * @param {Color} color
   */
  ;

  _proto.set = function set(color) {
    if (color._val) {
      this._val = color._val;
    } else {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a;
    }

    return this;
  };

  _proto._fastSetA = function _fastSetA(alpha) {
    this._val = (this._val & 0x00ffffff | alpha << 24) >>> 0;
  }
  /**
   * !#en Multiplies the current color by the specified color
   * !#zh 将当前颜色乘以与指定颜色
   * @method multiply
   * @return {Color}
   * @param {Color} other
   */
  ;

  _proto.multiply = function multiply(other) {
    var r = (this._val & 0x000000ff) * other.r >> 8;
    var g = (this._val & 0x0000ff00) * other.g >> 8;
    var b = (this._val & 0x00ff0000) * other.b >> 8;
    var a = ((this._val & 0xff000000) >>> 8) * other.a;
    this._val = a & 0xff000000 | b & 0x00ff0000 | g & 0x0000ff00 | r & 0x000000ff;
    return this;
  };

  _createClass(Color, [{
    key: "r",

    /**
     * !#en Get or set red channel value
     * !#zh 获取或者设置红色通道
     * @property {number} r
     */
    get: function get() {
      return this.getR();
    },
    set: function set(v) {
      this.setR(v);
    }
    /**
     * !#en Get or set green channel value
     * !#zh 获取或者设置绿色通道
     * @property {number} g
     */

  }, {
    key: "g",
    get: function get() {
      return this.getG();
    },
    set: function set(v) {
      this.setG(v);
    }
    /**
     * !#en Get or set blue channel value
     * !#zh 获取或者设置蓝色通道
     * @property {number} b
     */

  }, {
    key: "b",
    get: function get() {
      return this.getB();
    },
    set: function set(v) {
      this.setB(v);
    }
    /**
     * !#en Get or set alpha channel value
     * !#zh 获取或者设置透明通道
     * @property {number} a
     */

  }, {
    key: "a",
    get: function get() {
      return this.getA();
    },
    set: function set(v) {
      this.setA(v);
    }
  }]);

  return Color;
}(_valueType["default"]);

exports["default"] = Color;
Color.div = Color.divide;
Color.sub = Color.subtract;
Color.mul = Color.multiply;
Color.WHITE_R = Color.WHITE;
Color.BLACK_R = Color.BLACK;
Color.TRANSPARENT_R = Color.TRANSPARENT;
Color.GRAY_R = Color.GRAY;
Color.RED_R = Color.RED;
Color.GREEN_R = Color.GREEN;
Color.BLUE_R = Color.BLUE;
Color.YELLOW_R = Color.YELLOW;
Color.ORANGE_R = Color.ORANGE;
Color.CYAN_R = Color.CYAN;
Color.MAGENTA_R = Color.MAGENTA;

_CCClass["default"].fastDefine('cc.Color', Color, {
  r: 0,
  g: 0,
  b: 0,
  a: 255
});

cc.Color = Color;
/**
 * @module cc
 */

/**
 * !#en
 * The convenience method to create a new {{#crossLink "Color/Color:method"}}cc.Color{{/crossLink}}
 * Alpha channel is optional. Default value is 255.
 *
 * !#zh
 * 通过该方法来创建一个新的 {{#crossLink "Color/Color:method"}}cc.Color{{/crossLink}} 对象。
 * Alpha 通道是可选的。默认值是 255。
 *
 * @method color
 * @param {Number} [r=0]
 * @param {Number} [g=0]
 * @param {Number} [b=0]
 * @param {Number} [a=255]
 * @return {Color}
 * @example {@link cocos2d/core/value-types/CCColor/color.js}
 */

cc.color = function color(r, g, b, a) {
  if (typeof r === 'string') {
    var result = new Color();
    return result.fromHEX(r);
  }

  if (typeof r === 'object') {
    return new Color(r.r, r.g, r.b, r.a);
  }

  return new Color(r, g, b, a);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL2NvbG9yLnRzIl0sIm5hbWVzIjpbIkNvbG9yIiwiY29weSIsIm91dCIsImEiLCJyIiwiZyIsImIiLCJjbG9uZSIsInNldCIsImZyb21IZXgiLCJoZXgiLCJmcm9tSEVYIiwiaGV4U3RyaW5nIiwiaW5kZXhPZiIsInN1YnN0cmluZyIsInBhcnNlSW50Iiwic3Vic3RyIiwiX3ZhbCIsImFkZCIsInN1YnRyYWN0IiwibXVsdGlwbHkiLCJkaXZpZGUiLCJzY2FsZSIsImxlcnAiLCJ0IiwiYXIiLCJhZyIsImFiIiwiYWEiLCJ0b0FycmF5Iiwib2ZzIiwiZnJvbUFycmF5IiwiYXJyIiwicHJlbXVsdGlwbHlBbHBoYSIsImNvbG9yIiwiYWxwaGEiLCJfZmFzdFNldEEiLCJyZXQiLCJlcXVhbHMiLCJvdGhlciIsInRvIiwicmF0aW8iLCJ0b1N0cmluZyIsInRvRml4ZWQiLCJnZXRSIiwic2V0UiIsInJlZCIsIm1pc2MiLCJjbGFtcGYiLCJnZXRHIiwic2V0RyIsImdyZWVuIiwiZ2V0QiIsInNldEIiLCJibHVlIiwiZ2V0QSIsInNldEEiLCJ0b0NTUyIsIm9wdCIsInRvSEVYIiwiZm10IiwicHJlZml4IiwicHVzaCIsImpvaW4iLCJ0b1JHQlZhbHVlIiwiZnJvbUhTViIsImgiLCJzIiwidiIsImkiLCJNYXRoIiwiZmxvb3IiLCJmIiwicCIsInEiLCJ0b0hTViIsImhzdiIsIm1heCIsIm1pbiIsImRlbHRhIiwiVmFsdWVUeXBlIiwiZGl2Iiwic3ViIiwibXVsIiwiV0hJVEVfUiIsIldISVRFIiwiQkxBQ0tfUiIsIkJMQUNLIiwiVFJBTlNQQVJFTlRfUiIsIlRSQU5TUEFSRU5UIiwiR1JBWV9SIiwiR1JBWSIsIlJFRF9SIiwiUkVEIiwiR1JFRU5fUiIsIkdSRUVOIiwiQkxVRV9SIiwiQkxVRSIsIllFTExPV19SIiwiWUVMTE9XIiwiT1JBTkdFX1IiLCJPUkFOR0UiLCJDWUFOX1IiLCJDWUFOIiwiTUFHRU5U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LENBQUMsRUFBRSxDQUFMO0FBQVFDLEVBQUFBLENBQUMsRUFBRSxDQUFYO0FBQWNDLEVBQUFBLENBQUMsRUFBRSxDQUFqQjtBQUFvQkgsRUFBQUEsQ0FBQyxFQUFFO0FBQXZCLENBQXRDOztBQUdBeUcsRUFBRSxDQUFDNUcsS0FBSCxHQUFXQSxLQUFYO0FBRUE7Ozs7QUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBNEcsRUFBRSxDQUFDMUUsS0FBSCxHQUFXLFNBQVNBLEtBQVQsQ0FBZ0I5QixDQUFoQixFQUFtQkMsQ0FBbkIsRUFBc0JDLENBQXRCLEVBQXlCSCxDQUF6QixFQUE0QjtBQUNuQyxNQUFJLE9BQU9DLENBQVAsS0FBYSxRQUFqQixFQUEyQjtBQUN2QixRQUFJeUcsTUFBTSxHQUFHLElBQUk3RyxLQUFKLEVBQWI7QUFDQSxXQUFPNkcsTUFBTSxDQUFDbEcsT0FBUCxDQUFlUCxDQUFmLENBQVA7QUFDSDs7QUFDRCxNQUFJLE9BQU9BLENBQVAsS0FBYSxRQUFqQixFQUEyQjtBQUN2QixXQUFPLElBQUlKLEtBQUosQ0FBVUksQ0FBQyxDQUFDQSxDQUFaLEVBQWVBLENBQUMsQ0FBQ0MsQ0FBakIsRUFBb0JELENBQUMsQ0FBQ0UsQ0FBdEIsRUFBeUJGLENBQUMsQ0FBQ0QsQ0FBM0IsQ0FBUDtBQUNIOztBQUNELFNBQU8sSUFBSUgsS0FBSixDQUFVSSxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CSCxDQUFuQixDQUFQO0FBQ0gsQ0FURCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFZhbHVlVHlwZSBmcm9tICcuL3ZhbHVlLXR5cGUnO1xuaW1wb3J0IENDQ2xhc3MgZnJvbSAnLi4vcGxhdGZvcm0vQ0NDbGFzcyc7XG5pbXBvcnQgbWlzYyBmcm9tICcuLi91dGlscy9taXNjJztcblxuLyoqXG4gKiAhI2VuXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBSR0JBIGNvbG9ycy5cbiAqXG4gKiBFYWNoIGNvbG9yIGNvbXBvbmVudCBpcyBhIGZsb2F0aW5nIHBvaW50IHZhbHVlIHdpdGggYSByYW5nZSBmcm9tIDAgdG8gMjU1LlxuICpcbiAqIFlvdSBjYW4gYWxzbyB1c2UgdGhlIGNvbnZlbmllbmNlIG1ldGhvZCB7eyNjcm9zc0xpbmsgXCJjYy9jb2xvcjptZXRob2RcIn19Y2MuY29sb3J7ey9jcm9zc0xpbmt9fSB0byBjcmVhdGUgYSBuZXcgQ29sb3IuXG4gKlxuICogISN6aFxuICogY2MuQ29sb3Ig55So5LqO6KGo56S66aKc6Imy44CCXG4gKlxuICog5a6D5YyF5ZCrIFJHQkEg5Zub5Liq5Lul5rWu54K55pWw5L+d5a2Y55qE6aKc6Imy5YiG6YeP77yM5q+P5Liq55qE5YC86YO95ZyoIDAg5YiwIDI1NSDkuYvpl7TjgIJcbiAqXG4gKiDmgqjkuZ/lj6/ku6XpgJrov4fkvb/nlKgge3sjY3Jvc3NMaW5rIFwiY2MvY29sb3I6bWV0aG9kXCJ9fWNjLmNvbG9ye3svY3Jvc3NMaW5rfX0g55qE5L6/5o235pa55rOV5p2l5Yib5bu65LiA5Liq5paw55qEIENvbG9y44CCXG4gKlxuICogQGNsYXNzIENvbG9yXG4gKiBAZXh0ZW5kcyBWYWx1ZVR5cGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3IgZXh0ZW5kcyBWYWx1ZVR5cGUge1xuICAgIHN0YXRpYyBkaXYgPSBDb2xvci5kaXZpZGU7XG4gICAgc3RhdGljIHN1YiA9IENvbG9yLnN1YnRyYWN0O1xuICAgIHN0YXRpYyBtdWwgPSBDb2xvci5tdWx0aXBseTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU29saWQgd2hpdGUsIFJHQkEgaXMgWzI1NSwgMjU1LCAyNTUsIDI1NV0uXG4gICAgICogISN6aCDnuq/nmb3oibLvvIxSR0JBIOaYryBbMjU1LCAyNTUsIDI1NSwgMjU1XeOAglxuICAgICAqIEBwcm9wZXJ0eSBXSElURVxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBXSElURSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgMjU1KTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBXSElURV9SOiBDb2xvciA9IENvbG9yLldISVRFO1xuXG4gICAgLyoqXG4gICAgICogISNlbiBTb2xpZCBibGFjaywgUkdCQSBpcyBbMCwgMCwgMCwgMjU1XS5cbiAgICAgKiAhI3poIOe6r+m7keiJsu+8jFJHQkEg5pivIFswLCAwLCAwLCAyNTVd44CCXG4gICAgICogQHByb3BlcnR5IEJMQUNLXG4gICAgICogQHR5cGUge0NvbG9yfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IEJMQUNLICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAwLCAyNTUpOyB9XG4gICAgc3RhdGljIHJlYWRvbmx5IEJMQUNLX1I6IENvbG9yID0gQ29sb3IuQkxBQ0s7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRyYW5zcGFyZW50LCBSR0JBIGlzIFswLCAwLCAwLCAwXS5cbiAgICAgKiAhI3poIOmAj+aYju+8jFJHQkEg5pivIFswLCAwLCAwLCAwXeOAglxuICAgICAqIEBwcm9wZXJ0eSBUUkFOU1BBUkVOVFxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBUUkFOU1BBUkVOVCAoKSB7IHJldHVybiBuZXcgQ29sb3IoMCwgMCwgMCwgMCk7IH1cbiAgICBzdGF0aWMgcmVhZG9ubHkgVFJBTlNQQVJFTlRfUjogQ29sb3IgPSBDb2xvci5UUkFOU1BBUkVOVDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gR3JleSwgUkdCQSBpcyBbMTI3LjUsIDEyNy41LCAxMjcuNV0uXG4gICAgICogISN6aCDngbDoibLvvIxSR0JBIOaYryBbMTI3LjUsIDEyNy41LCAxMjcuNV3jgIJcbiAgICAgKiBAcHJvcGVydHkgR1JBWVxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBHUkFZICgpIHsgcmV0dXJuIG5ldyBDb2xvcigxMjcuNSwgMTI3LjUsIDEyNy41KTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBHUkFZX1I6IENvbG9yID0gQ29sb3IuR1JBWTtcblxuICAgIC8qKlxuICAgICAqICEjZW4gU29saWQgcmVkLCBSR0JBIGlzIFsyNTUsIDAsIDBdLlxuICAgICAqICEjemgg57qv57qi6Imy77yMUkdCQSDmmK8gWzI1NSwgMCwgMF3jgIJcbiAgICAgKiBAcHJvcGVydHkgUkVEXG4gICAgICogQHR5cGUge0NvbG9yfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IFJFRCAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAwKTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBSRURfUjogQ29sb3IgPSBDb2xvci5SRUQ7XG4gICAgLyoqXG4gICAgICogISNlbiBTb2xpZCBncmVlbiwgUkdCQSBpcyBbMCwgMjU1LCAwXS5cbiAgICAgKiAhI3poIOe6r+e7v+iJsu+8jFJHQkEg5pivIFswLCAyNTUsIDBd44CCXG4gICAgICogQHByb3BlcnR5IEdSRUVOXG4gICAgICogQHR5cGUge0NvbG9yfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IEdSRUVOICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDApOyB9XG4gICAgc3RhdGljIHJlYWRvbmx5IEdSRUVOX1I6IENvbG9yID0gQ29sb3IuR1JFRU47XG4gICAgLyoqXG4gICAgICogISNlbiBTb2xpZCBibHVlLCBSR0JBIGlzIFswLCAwLCAyNTVdLlxuICAgICAqICEjemgg57qv6JOd6Imy77yMUkdCQSDmmK8gWzAsIDAsIDI1NV3jgIJcbiAgICAgKiBAcHJvcGVydHkgQkxVRVxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBCTFVFICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAwLCAyNTUpOyB9XG4gICAgc3RhdGljIHJlYWRvbmx5IEJMVUVfUjogQ29sb3IgPSBDb2xvci5CTFVFO1xuICAgIC8qKlxuICAgICAqICEjZW4gWWVsbG93LCBSR0JBIGlzIFsyNTUsIDIzNSwgNF0uXG4gICAgICogISN6aCDpu4ToibLvvIxSR0JBIOaYryBbMjU1LCAyMzUsIDRd44CCXG4gICAgICogQHByb3BlcnR5IFlFTExPV1xuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBZRUxMT1cgKCkgeyByZXR1cm4gbmV3IENvbG9yKDI1NSwgMjM1LCA0KTsgfVxuICAgIHN0YXRpYyByZWFkb25seSBZRUxMT1dfUjogQ29sb3IgPSBDb2xvci5ZRUxMT1c7XG4gICAgLyoqXG4gICAgICogISNlbiBPcmFuZ2UsIFJHQkEgaXMgWzI1NSwgMTI3LCAwXS5cbiAgICAgKiAhI3poIOapmeiJsu+8jFJHQkEg5pivIFsyNTUsIDEyNywgMF3jgIJcbiAgICAgKiBAcHJvcGVydHkgT1JBTkdFXG4gICAgICogQHR5cGUge0NvbG9yfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IE9SQU5HRSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAxMjcsIDApOyB9XG4gICAgc3RhdGljIHJlYWRvbmx5IE9SQU5HRV9SOiBDb2xvciA9IENvbG9yLk9SQU5HRTtcbiAgICAvKipcbiAgICAgKiAhI2VuIEN5YW4sIFJHQkEgaXMgWzAsIDI1NSwgMjU1XS5cbiAgICAgKiAhI3poIOmdkuiJsu+8jFJHQkEg5pivIFswLCAyNTUsIDI1NV3jgIJcbiAgICAgKiBAcHJvcGVydHkgQ1lBTlxuICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBDWUFOICgpIHsgcmV0dXJuIG5ldyBDb2xvcigwLCAyNTUsIDI1NSk7IH1cbiAgICBzdGF0aWMgcmVhZG9ubHkgQ1lBTl9SOiBDb2xvciA9IENvbG9yLkNZQU47XG4gICAgLyoqXG4gICAgICogISNlbiBNYWdlbnRhLCBSR0JBIGlzIFsyNTUsIDAsIDI1NV0uXG4gICAgICogISN6aCDmtIvnuqLoibLvvIjlk4HnuqLoibLvvInvvIxSR0JBIOaYryBbMjU1LCAwLCAyNTVd44CCXG4gICAgICogQHByb3BlcnR5IE1BR0VOVEFcbiAgICAgKiBAdHlwZSB7Q29sb3J9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgTUFHRU5UQSAoKSB7IHJldHVybiBuZXcgQ29sb3IoMjU1LCAwLCAyNTUpOyB9XG4gICAgc3RhdGljIHJlYWRvbmx5IE1BR0VOVEFfUjogQ29sb3IgPSBDb2xvci5NQUdFTlRBO1xuXG4gICAgLyoqXG4gICAgICogQ29weSBjb250ZW50IG9mIGEgY29sb3IgaW50byBhbm90aGVyLlxuICAgICAqIEBtZXRob2QgY29weVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29weSAob3V0OiBDb2xvciwgYTogQ29sb3IpOiBDb2xvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgY29weSAob3V0OiBDb2xvciwgYTogQ29sb3IpOiBDb2xvciB7XG4gICAgICAgIG91dC5yID0gYS5yO1xuICAgICAgICBvdXQuZyA9IGEuZztcbiAgICAgICAgb3V0LmIgPSBhLmI7XG4gICAgICAgIG91dC5hID0gYS5hO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb25lIGEgbmV3IGNvbG9yLlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNsb25lIChhOiBDb2xvcik6IENvbG9yXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBjbG9uZSAoYTogQ29sb3IpOiBDb2xvciB7XG4gICAgICAgIHJldHVybiBuZXcgQ29sb3IoYS5yLCBhLmcsIGEuYiwgYS5hKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBjb2xvciB0byB0aGUgZ2l2ZW4gdmFsdWVzLlxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBzZXQgKG91dDogQ29sb3IsIHI/OiBudW1iZXIsIGc/OiBudW1iZXIsIGI/OiBudW1iZXIsIGE/OiBudW1iZXIpOiBDb2xvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0IChvdXQ6IENvbG9yLCByID0gMjU1LCBnID0gMjU1LCBiID0gMjU1LCBhID0gMjU1KTogQ29sb3Ige1xuICAgICAgICBvdXQuciA9IHI7XG4gICAgICAgIG91dC5nID0gZztcbiAgICAgICAgb3V0LmIgPSBiO1xuICAgICAgICBvdXQuYSA9IGE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhlIGhleGFkZWNpbWFsIGZvcm1hbCBjb2xvciBpbnRvIHJnYiBmb3JtYWwuXG4gICAgICogQG1ldGhvZCBmcm9tSGV4XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tSGV4IChvdXQ6IENvbG9yLCBoZXg6IG51bWJlcik6IENvbG9yXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBkZXByZWNhdGVkXG4gICAgICovXG4gICAgc3RhdGljIGZyb21IZXggKG91dDogQ29sb3IsIGhleDogbnVtYmVyKTogQ29sb3Ige1xuICAgICAgICBsZXQgciA9ICgoaGV4ID4+IDI0KSkgLyAyNTUuMDtcbiAgICAgICAgbGV0IGcgPSAoKGhleCA+PiAxNikgJiAweGZmKSAvIDI1NS4wO1xuICAgICAgICBsZXQgYiA9ICgoaGV4ID4+IDgpICYgMHhmZikgLyAyNTUuMDtcbiAgICAgICAgbGV0IGEgPSAoKGhleCkgJiAweGZmKSAvIDI1NS4wO1xuXG4gICAgICAgIG91dC5yID0gcjtcbiAgICAgICAgb3V0LmcgPSBnO1xuICAgICAgICBvdXQuYiA9IGI7XG4gICAgICAgIG91dC5hID0gYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGUgaGV4YWRlY2ltYWwgZm9ybWFsIGNvbG9yIGludG8gcmdiIGZvcm1hbC5cbiAgICAgKiBAbWV0aG9kIGZyb21IRVhcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGZyb21IRVggKG91dDogQ29sb3IsIGhleDogc3RyaW5nKTogQ29sb3JcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21IRVggKG91dDogQ29sb3IsIGhleFN0cmluZzogc3RyaW5nKTogQ29sb3Ige1xuICAgICAgICBoZXhTdHJpbmcgPSAoaGV4U3RyaW5nLmluZGV4T2YoJyMnKSA9PT0gMCkgPyBoZXhTdHJpbmcuc3Vic3RyaW5nKDEpIDogaGV4U3RyaW5nO1xuICAgICAgICBvdXQuciA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMCwgMiksIDE2KSB8fCAwO1xuICAgICAgICBvdXQuZyA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoMiwgMiksIDE2KSB8fCAwO1xuICAgICAgICBvdXQuYiA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoNCwgMiksIDE2KSB8fCAwO1xuICAgICAgICBvdXQuYSA9IHBhcnNlSW50KGhleFN0cmluZy5zdWJzdHIoNiwgMiksIDE2KSB8fCAyNTU7XG4gICAgICAgIG91dC5fdmFsID0gKChvdXQuYSA8PCAyNCkgPj4+IDApICsgKG91dC5iIDw8IDE2KSArIChvdXQuZyA8PCA4KSArIG91dC5yO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBjb21wb25lbnRzIG9mIHR3byBjb2xvcnMsIHJlc3BlY3RpdmVseS5cbiAgICAgKiBAbWV0aG9kIGFkZFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogYWRkIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkIChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvciB7XG4gICAgICAgIG91dC5yID0gYS5yICsgYi5yO1xuICAgICAgICBvdXQuZyA9IGEuZyArIGIuZztcbiAgICAgICAgb3V0LmIgPSBhLmIgKyBiLmI7XG4gICAgICAgIG91dC5hID0gYS5hICsgYi5hO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN1YnRyYWN0IGNvbXBvbmVudHMgb2YgY29sb3IgYiBmcm9tIGNvbXBvbmVudHMgb2YgY29sb3IgYSwgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBtZXRob2Qgc3VidHJhY3RcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHN1YnRyYWN0IChvdXQ6IENvbG9yLCBhOiBDb2xvciwgYjogQ29sb3IpOiBDb2xvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc3VidHJhY3QgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvcik6IENvbG9yIHtcbiAgICAgICAgb3V0LnIgPSBhLnIgLSBiLnI7XG4gICAgICAgIG91dC5nID0gYS5nIC0gYi5nO1xuICAgICAgICBvdXQuYiA9IGEuYiAtIGIuYjtcbiAgICAgICAgb3V0LmEgPSBhLmEgLSBiLmE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbHkgY29tcG9uZW50cyBvZiB0d28gY29sb3JzLCByZXNwZWN0aXZlbHkuXG4gICAgICogQG1ldGhvZCBtdWx0aXBseVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogbXVsdGlwbHkgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvcik6IENvbG9yXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBtdWx0aXBseSAob3V0OiBDb2xvciwgYTogQ29sb3IsIGI6IENvbG9yKTogQ29sb3Ige1xuICAgICAgICBvdXQuciA9IGEuciAqIGIucjtcbiAgICAgICAgb3V0LmcgPSBhLmcgKiBiLmc7XG4gICAgICAgIG91dC5iID0gYS5iICogYi5iO1xuICAgICAgICBvdXQuYSA9IGEuYSAqIGIuYTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXZpZGUgY29tcG9uZW50cyBvZiBjb2xvciBhIGJ5IGNvbXBvbmVudHMgb2YgY29sb3IgYiwgcmVzcGVjdGl2ZWx5LlxuICAgICAqIEBtZXRob2QgZGl2aWRlXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBkaXZpZGUgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvcik6IENvbG9yXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBkaXZpZGUgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvcik6IENvbG9yIHtcbiAgICAgICAgb3V0LnIgPSBhLnIgLyBiLnI7XG4gICAgICAgIG91dC5nID0gYS5nIC8gYi5nO1xuICAgICAgICBvdXQuYiA9IGEuYiAvIGIuYjtcbiAgICAgICAgb3V0LmEgPSBhLmEgLyBiLmE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2NhbGVzIGEgY29sb3IgYnkgYSBudW1iZXIuXG4gICAgICogQG1ldGhvZCBzY2FsZVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2NhbGUgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBudW1iZXIpOiBDb2xvclxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGUgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBudW1iZXIpOiBDb2xvciB7XG4gICAgICAgIG91dC5yID0gYS5yICogYjtcbiAgICAgICAgb3V0LmcgPSBhLmcgKiBiO1xuICAgICAgICBvdXQuYiA9IGEuYiAqIGI7XG4gICAgICAgIG91dC5hID0gYS5hICogYjtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIGNvbG9ycy5cbiAgICAgKiBAbWV0aG9kIGxlcnBcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGxlcnAgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvciwgdDogbnVtYmVyKTogQ29sb3JcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGxlcnAgKG91dDogQ29sb3IsIGE6IENvbG9yLCBiOiBDb2xvciwgdDogbnVtYmVyKTogQ29sb3Ige1xuICAgICAgICBsZXQgYXIgPSBhLnIsXG4gICAgICAgICAgICBhZyA9IGEuZyxcbiAgICAgICAgICAgIGFiID0gYS5iLFxuICAgICAgICAgICAgYWEgPSBhLmE7XG4gICAgICAgIG91dC5yID0gYXIgKyB0ICogKGIuciAtIGFyKTtcbiAgICAgICAgb3V0LmcgPSBhZyArIHQgKiAoYi5nIC0gYWcpO1xuICAgICAgICBvdXQuYiA9IGFiICsgdCAqIChiLmIgLSBhYik7XG4gICAgICAgIG91dC5hID0gYWEgKyB0ICogKGIuYSAtIGFhKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI3poIOminOiJsui9rOaVsOe7hFxuICAgICAqICEjZW4gVHVybiBhbiBhcnJheSBvZiBjb2xvcnNcbiAgICAgKiBAbWV0aG9kIHRvQXJyYXlcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIHRvQXJyYXkgPE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIGE6IElDb2xvckxpa2UsIG9mcz86IG51bWJlcik6IE91dFxuICAgICAqIEBwYXJhbSBvZnMg5pWw57uE6LW35aeL5YGP56e76YePXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyB0b0FycmF5PE91dCBleHRlbmRzIElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+PiAob3V0OiBPdXQsIGE6IElDb2xvckxpa2UsIG9mcyA9IDApIHtcbiAgICAgICAgY29uc3Qgc2NhbGUgPSAoYSBpbnN0YW5jZW9mIENvbG9yIHx8IGEuYSA+IDEpID8gMSAvIDI1NSA6IDE7XG4gICAgICAgIG91dFtvZnMgKyAwXSA9IGEuciAqIHNjYWxlO1xuICAgICAgICBvdXRbb2ZzICsgMV0gPSBhLmcgKiBzY2FsZTtcbiAgICAgICAgb3V0W29mcyArIDJdID0gYS5iICogc2NhbGU7XG4gICAgICAgIG91dFtvZnMgKyAzXSA9IGEuYSAqIHNjYWxlO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjemgg5pWw57uE6L2s6aKc6ImyXG4gICAgICogISNlbiBBbiBhcnJheSBvZiBjb2xvcnMgdHVyblxuICAgICAqIEBtZXRob2QgZnJvbUFycmF5XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBmcm9tQXJyYXkgPE91dCBleHRlbmRzIElDb2xvckxpa2U+IChhcnI6IElXcml0YWJsZUFycmF5TGlrZTxudW1iZXI+LCBvdXQ6IE91dCwgb2ZzPzogbnVtYmVyKTogT3V0XG4gICAgICogQHBhcmFtIG9mcyDmlbDnu4Totbflp4vlgY/np7vph49cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGZyb21BcnJheTxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAoYXJyOiBJV3JpdGFibGVBcnJheUxpa2U8bnVtYmVyPiwgb3V0OiBPdXQsIG9mcyA9IDApIHtcbiAgICAgICAgb3V0LnIgPSBhcnJbb2ZzICsgMF0gKiAyNTU7XG4gICAgICAgIG91dC5nID0gYXJyW29mcyArIDFdICogMjU1O1xuICAgICAgICBvdXQuYiA9IGFycltvZnMgKyAyXSAqIDI1NTtcbiAgICAgICAgb3V0LmEgPSBhcnJbb2ZzICsgM10gKiAyNTU7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aCDpopzoibIgUkdCIOmihOS5mCBBbHBoYSDpgJrpgZNcbiAgICAgKiAhI2VuIFJHQiBwcmVtdWx0aXBseSBhbHBoYSBjaGFubmVsXG4gICAgICogQG1ldGhvZCBwcmVtdWx0aXBseUFscGhhXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBwcmVtdWx0aXBseUFscGhhIDxPdXQgZXh0ZW5kcyBJQ29sb3JMaWtlPiAob3V0OiBPdXQsIGE6IElDb2xvckxpa2UpXG4gICAgICogQHBhcmFtIG91dCDov5Tlm57popzoibJcbiAgICAgKiBAcGFyYW0gY29sb3Ig6aKE5LmY5aSE55CG55qE55uu5qCH6aKc6ImyXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBwcmVtdWx0aXBseUFscGhhIChvdXQsIGNvbG9yKSB7XG4gICAgICAgIGxldCBhbHBoYSA9IGNvbG9yLmEgLyAyNTUuMDtcbiAgICAgICAgb3V0LnIgPSBjb2xvci5yICogYWxwaGE7XG4gICAgICAgIG91dC5nID0gY29sb3IuZyAqIGFscGhhO1xuICAgICAgICBvdXQuYiA9IGNvbG9yLmIgKiBhbHBoYTtcblxuICAgICAgICBvdXQuX2Zhc3RTZXRBKGNvbG9yLmEpO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgX3ZhbDogbnVtYmVyID0gMDtcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3I9MF0gLSByZWQgY29tcG9uZW50IG9mIHRoZSBjb2xvciwgZGVmYXVsdCB2YWx1ZSBpcyAwLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZz0wXSAtIGdyZWVuIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZnVhbHQgdmFsdWUgaXMgMC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2I9MF0gLSBibHVlIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2E9MjU1XSAtIGFscGhhIGNvbXBvbmVudCBvZiB0aGUgY29sb3IsIGRlZmF1bHQgdmFsdWUgaXMgMjU1LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChyOiBDb2xvciB8IG51bWJlciA9IDAsIGc6IG51bWJlciA9IDAsIGI6IG51bWJlciA9IDAsIGE6IG51bWJlciA9IDI1NSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodHlwZW9mIHIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBnID0gci5nO1xuICAgICAgICAgICAgYiA9IHIuYjtcbiAgICAgICAgICAgIGEgPSByLmE7XG4gICAgICAgICAgICByID0gci5yO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdmFsID0gKChhIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDbG9uZSBhIG5ldyBjb2xvciBmcm9tIHRoZSBjdXJyZW50IGNvbG9yLlxuICAgICAqICEjemgg5YWL6ZqG5b2T5YmN6aKc6Imy44CCXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge0NvbG9yfSBOZXdseSBjcmVhdGVkIGNvbG9yLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG4gICAgICogdmFyIG5ld0NvbG9yID0gY29sb3IuY2xvbmUoKTsvLyBDb2xvciB7cjogMCwgZzogMCwgYjogMCwgYTogMjU1fVxuICAgICAqL1xuICAgIGNsb25lICgpOiBDb2xvciB7XG4gICAgICAgIHZhciByZXQgPSBuZXcgQ29sb3IoKTtcbiAgICAgICAgcmV0Ll92YWwgPSB0aGlzLl92YWw7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDliKTmlq3kuKTkuKrpopzoibLmmK/lkKbnm7jnrYnjgIJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7Q29sb3J9IG90aGVyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvcjEgPSBjYy5Db2xvci5XSElURTtcbiAgICAgKiB2YXIgY29sb3IyID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAqIGNjLmxvZyhjb2xvcjEuZXF1YWxzKGNvbG9yMikpOyAvLyB0cnVlO1xuICAgICAqIGNvbG9yMiA9IGNjLkNvbG9yLlJFRDtcbiAgICAgKiBjYy5sb2coY29sb3IyLmVxdWFscyhjb2xvcjEpKTsgLy8gZmFsc2U7XG4gICAgICovXG4gICAgZXF1YWxzIChvdGhlcjogQ29sb3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG90aGVyICYmIHRoaXMuX3ZhbCA9PT0gb3RoZXIuX3ZhbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvFxuICAgICAqIEBtZXRob2QgbGVycFxuICAgICAqIEBwYXJhbSB7Q29sb3J9IHRvXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnQuXG4gICAgICogQHBhcmFtIHtDb2xvcn0gW291dF0gLSBvcHRpb25hbCwgdGhlIHJlY2VpdmluZyB2ZWN0b3IuXG4gICAgICogQHJldHVybiB7Q29sb3J9XG4gICAgICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS92YWx1ZS10eXBlcy9DQ0NvbG9yL2xlcnAuanN9XG4gICAgICovXG4gICAgbGVycCAodG86IENvbG9yLCByYXRpbzogbnVtYmVyLCBvdXQ/OiBDb2xvcik6IENvbG9yIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBDb2xvcigpO1xuICAgICAgICB2YXIgciA9IHRoaXMucjtcbiAgICAgICAgdmFyIGcgPSB0aGlzLmc7XG4gICAgICAgIHZhciBiID0gdGhpcy5iO1xuICAgICAgICB2YXIgYSA9IHRoaXMuYTtcbiAgICAgICAgb3V0LnIgPSByICsgKHRvLnIgLSByKSAqIHJhdGlvO1xuICAgICAgICBvdXQuZyA9IGcgKyAodG8uZyAtIGcpICogcmF0aW87XG4gICAgICAgIG91dC5iID0gYiArICh0by5iIC0gYikgKiByYXRpbztcbiAgICAgICAgb3V0LmEgPSBhICsgKHRvLmEgLSBhKSAqIHJhdGlvO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOi9rOaNouS4uuaWueS+v+mYheivu+eahOWtl+espuS4suOAglxuICAgICAqIEBtZXRob2QgdG9TdHJpbmdcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgKiBjb2xvci50b1N0cmluZygpOyAvLyBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMjU1KVwiXG4gICAgICovXG4gICAgdG9TdHJpbmcgKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBcInJnYmEoXCIgK1xuICAgICAgICAgICAgdGhpcy5yLnRvRml4ZWQoKSArIFwiLCBcIiArXG4gICAgICAgICAgICB0aGlzLmcudG9GaXhlZCgpICsgXCIsIFwiICtcbiAgICAgICAgICAgIHRoaXMuYi50b0ZpeGVkKCkgKyBcIiwgXCIgK1xuICAgICAgICAgICAgdGhpcy5hLnRvRml4ZWQoKSArIFwiKVwiO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCBvciBzZXQgcmVkIGNoYW5uZWwgdmFsdWVcbiAgICAgKiAhI3poIOiOt+WPluaIluiAheiuvue9rue6ouiJsumAmumBk1xuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByXG4gICAgICovXG4gICAgZ2V0IHIgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFIoKTtcbiAgICB9XG4gICAgc2V0IHIgKHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldFIodik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgb3Igc2V0IGdyZWVuIGNoYW5uZWwgdmFsdWVcbiAgICAgKiAhI3poIOiOt+WPluaIluiAheiuvue9rue7v+iJsumAmumBk1xuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBnXG4gICAgICovXG4gICAgZ2V0IGcgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEcoKTtcbiAgICB9XG4gICAgc2V0IGcgKHY6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNldEcodik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgb3Igc2V0IGJsdWUgY2hhbm5lbCB2YWx1ZVxuICAgICAqICEjemgg6I635Y+W5oiW6ICF6K6+572u6JOd6Imy6YCa6YGTXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJcbiAgICAgKi9cbiAgICBnZXQgYiAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QigpO1xuICAgIH1cbiAgICBzZXQgYiAodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0Qih2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCBvciBzZXQgYWxwaGEgY2hhbm5lbCB2YWx1ZVxuICAgICAqICEjemgg6I635Y+W5oiW6ICF6K6+572u6YCP5piO6YCa6YGTXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGFcbiAgICAgKi9cbiAgICBnZXQgYSAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QSgpO1xuICAgIH1cbiAgICBzZXQgYSAodjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0QSh2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgcmVkIGNoYW5uZWwgdmFsdWVcbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeminOiJsueahOe6ouiJsuWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0UlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gcmVkIHZhbHVlLlxuICAgICAqL1xuICAgIGdldFIgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWwgJiAweDAwMDAwMGZmO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldHMgcmVkIHZhbHVlIGFuZCByZXR1cm4gdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0XG4gICAgICogISN6aCDorr7nva7lvZPliY3nmoTnuqLoibLlgLzvvIzlubbov5Tlm57lvZPliY3lr7nosaHjgIJcbiAgICAgKiBAbWV0aG9kIHNldFJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmVkIC0gdGhlIG5ldyBSZWQgY29tcG9uZW50LlxuICAgICAqIEByZXR1cm4ge0NvbG9yfSB0aGlzIGNvbG9yLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvbG9yID0gbmV3IGNjLkNvbG9yKCk7XG4gICAgICogY29sb3Iuc2V0UigyNTUpOyAvLyBDb2xvciB7cjogMjU1LCBnOiAwLCBiOiAwLCBhOiAyNTV9XG4gICAgICovXG4gICAgc2V0UiAocmVkKTogdGhpcyB7XG4gICAgICAgIHJlZCA9IH5+bWlzYy5jbGFtcGYocmVkLCAwLCAyNTUpO1xuICAgICAgICB0aGlzLl92YWwgPSAoKHRoaXMuX3ZhbCAmIDB4ZmZmZmZmMDApIHwgcmVkKSA+Pj4gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0cyBncmVlbiBjaGFubmVsIHZhbHVlXG4gICAgICogISN6aCDojrflj5blvZPliY3popzoibLnmoTnu7/oibLlgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldEdcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGdyZWVuIHZhbHVlLlxuICAgICAqL1xuICAgIGdldEcgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAodGhpcy5fdmFsICYgMHgwMDAwZmYwMCkgPj4gODtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIGdyZWVuIHZhbHVlIGFuZCByZXR1cm4gdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0XG4gICAgICogISN6aCDorr7nva7lvZPliY3nmoTnu7/oibLlgLzvvIzlubbov5Tlm57lvZPliY3lr7nosaHjgIJcbiAgICAgKiBAbWV0aG9kIHNldEdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZ3JlZW4gLSB0aGUgbmV3IEdyZWVuIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHtDb2xvcn0gdGhpcyBjb2xvci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAqIGNvbG9yLnNldEcoMjU1KTsgLy8gQ29sb3Ige3I6IDAsIGc6IDI1NSwgYjogMCwgYTogMjU1fVxuICAgICAqL1xuICAgIHNldEcgKGdyZWVuKTogdGhpcyB7XG4gICAgICAgIGdyZWVuID0gfn5taXNjLmNsYW1wZihncmVlbiwgMCwgMjU1KTtcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmZmYwMGZmKSB8IChncmVlbiA8PCA4KSkgPj4+IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYmx1ZSBjaGFubmVsIHZhbHVlXG4gICAgICogISN6aCDojrflj5blvZPliY3popzoibLnmoTok53oibLlgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldEJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGJsdWUgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0QiAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl92YWwgJiAweDAwZmYwMDAwKSA+PiAxNjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIGJsdWUgdmFsdWUgYW5kIHJldHVybiB0aGUgY3VycmVudCBjb2xvciBvYmplY3RcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeeahOiTneiJsuWAvO+8jOW5tui/lOWbnuW9k+WJjeWvueixoeOAglxuICAgICAqIEBtZXRob2Qgc2V0QlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBibHVlIC0gdGhlIG5ldyBCbHVlIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHtDb2xvcn0gdGhpcyBjb2xvci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAqIGNvbG9yLnNldEIoMjU1KTsgLy8gQ29sb3Ige3I6IDAsIGc6IDAsIGI6IDI1NSwgYTogMjU1fVxuICAgICAqL1xuICAgIHNldEIgKGJsdWUpOiB0aGlzIHtcbiAgICAgICAgYmx1ZSA9IH5+bWlzYy5jbGFtcGYoYmx1ZSwgMCwgMjU1KTtcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweGZmMDBmZmZmKSB8IChibHVlIDw8IDE2KSkgPj4+IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgYWxwaGEgY2hhbm5lbCB2YWx1ZVxuICAgICAqICEjemgg6I635Y+W5b2T5YmN6aKc6Imy55qE6YCP5piO5bqm5YC844CCXG4gICAgICogQG1ldGhvZCBnZXRBXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBhbHBoYSB2YWx1ZS5cbiAgICAgKi9cbiAgICBnZXRBICgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKHRoaXMuX3ZhbCAmIDB4ZmYwMDAwMDApID4+PiAyNDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIGFscGhhIHZhbHVlIGFuZCByZXR1cm4gdGhlIGN1cnJlbnQgY29sb3Igb2JqZWN0XG4gICAgICogISN6aCDorr7nva7lvZPliY3nmoTpgI/mmI7luqbvvIzlubbov5Tlm57lvZPliY3lr7nosaHjgIJcbiAgICAgKiBAbWV0aG9kIHNldEFcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYWxwaGEgLSB0aGUgbmV3IEFscGhhIGNvbXBvbmVudC5cbiAgICAgKiBAcmV0dXJuIHtDb2xvcn0gdGhpcyBjb2xvci5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvciA9IG5ldyBjYy5Db2xvcigpO1xuICAgICAqIGNvbG9yLnNldEEoMCk7IC8vIENvbG9yIHtyOiAwLCBnOiAwLCBiOiAwLCBhOiAwfVxuICAgICAqL1xuICAgIHNldEEgKGFscGhhKTogdGhpcyB7XG4gICAgICAgIGFscGhhID0gfn5taXNjLmNsYW1wZihhbHBoYSwgMCwgMjU1KTtcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweDAwZmZmZmZmKSB8IChhbHBoYSA8PCAyNCkpID4+PiAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbnZlcnQgY29sb3IgdG8gY3NzIGZvcm1hdC5cbiAgICAgKiAhI3poIOi9rOaNouS4uiBDU1Mg5qC85byP44CCXG4gICAgICogQG1ldGhvZCB0b0NTU1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0PVwicmdiYVwiXSAtIFwicmdiYVwiLCBcInJnYlwiLCBcIiNyZ2JcIiBvciBcIiNycmdnYmJcIi5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY29sb3IgPSBjYy5Db2xvci5CTEFDSztcbiAgICAgKiBjb2xvci50b0NTUygpOyAgICAgICAgICAvLyBcInJnYmEoMCwwLDAsMS4wMClcIjtcbiAgICAgKiBjb2xvci50b0NTUyhcInJnYmFcIik7ICAgIC8vIFwicmdiYSgwLDAsMCwxLjAwKVwiO1xuICAgICAqIGNvbG9yLnRvQ1NTKFwicmdiXCIpOyAgICAgLy8gXCJyZ2JhKDAsMCwwKVwiO1xuICAgICAqIGNvbG9yLnRvQ1NTKFwiI3JnYlwiKTsgICAgLy8gXCIjMDAwXCI7XG4gICAgICogY29sb3IudG9DU1MoXCIjcnJnZ2JiXCIpOyAvLyBcIiMwMDAwMDBcIjtcbiAgICAgKi9cbiAgICB0b0NTUyAob3B0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIW9wdCB8fCBvcHQgPT09ICdyZ2JhJykge1xuICAgICAgICAgICAgcmV0dXJuIFwicmdiYShcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5yICsgXCIsXCIgK1xuICAgICAgICAgICAgICAgIHRoaXMuZyArIFwiLFwiICtcbiAgICAgICAgICAgICAgICB0aGlzLmIgKyBcIixcIiArXG4gICAgICAgICAgICAgICAgKHRoaXMuYSAvIDI1NSkudG9GaXhlZCgyKSArIFwiKVwiXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdCA9PT0gJ3JnYicpIHtcbiAgICAgICAgICAgIHJldHVybiBcInJnYihcIiArXG4gICAgICAgICAgICAgICAgdGhpcy5yICsgXCIsXCIgK1xuICAgICAgICAgICAgICAgIHRoaXMuZyArIFwiLFwiICtcbiAgICAgICAgICAgICAgICB0aGlzLmIgKyBcIilcIlxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnIycgKyB0aGlzLnRvSEVYKG9wdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlYWQgaGV4IHN0cmluZyBhbmQgc3RvcmUgY29sb3IgZGF0YSBpbnRvIHRoZSBjdXJyZW50IGNvbG9yIG9iamVjdCwgdGhlIGhleCBzdHJpbmcgbXVzdCBiZSBmb3JtYXRlZCBhcyByZ2JhIG9yIHJnYi5cbiAgICAgKiAhI3poIOivu+WPliAxNiDov5vliLbpopzoibLjgIJcbiAgICAgKiBAbWV0aG9kIGZyb21IRVhcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaGV4U3RyaW5nXG4gICAgICogQHJldHVybiB7Q29sb3J9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvbG9yID0gY2MuQ29sb3IuQkxBQ0s7XG4gICAgICogY29sb3IuZnJvbUhFWChcIiNGRkZGMzNcIik7IC8vIENvbG9yIHtyOiAyNTUsIGc6IDI1NSwgYjogNTEsIGE6IDI1NX07XG4gICAgICovXG4gICAgZnJvbUhFWCAoaGV4U3RyaW5nOiBzdHJpbmcpOiB0aGlzIHtcbiAgICAgICAgaGV4U3RyaW5nID0gKGhleFN0cmluZy5pbmRleE9mKCcjJykgPT09IDApID8gaGV4U3RyaW5nLnN1YnN0cmluZygxKSA6IGhleFN0cmluZztcbiAgICAgICAgbGV0IHIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDAsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgbGV0IGcgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDIsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgbGV0IGIgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDQsIDIpLCAxNikgfHwgMDtcbiAgICAgICAgbGV0IGEgPSBwYXJzZUludChoZXhTdHJpbmcuc3Vic3RyKDYsIDIpLCAxNikgfHwgMjU1O1xuICAgICAgICB0aGlzLl92YWwgPSAoKGEgPDwgMjQpID4+PiAwKSArIChiIDw8IDE2KSArIChnIDw8IDgpICsgcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBjb252ZXJ0IENvbG9yIHRvIEhFWCBjb2xvciBzdHJpbmcuXG4gICAgICogISN6aCDovazmjaLkuLogMTYg6L+b5Yi244CCXG4gICAgICogQG1ldGhvZCB0b0hFWFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbZm10PVwiI3JyZ2diYlwiXSAtIFwiI3JnYlwiLCBcIiNycmdnYmJcIiBvciBcIiNycmdnYmJhYVwiLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAqIGNvbG9yLnRvSEVYKFwiI3JnYlwiKTsgICAgIC8vIFwiMDAwXCI7XG4gICAgICogY29sb3IudG9IRVgoXCIjcnJnZ2JiXCIpOyAgLy8gXCIwMDAwMDBcIjtcbiAgICAgKi9cbiAgICB0b0hFWCAoZm10KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gJzAnO1xuICAgICAgICAvLyAjcnJnZ2JiXG4gICAgICAgIGxldCBoZXggPSBbXG4gICAgICAgICAgICAodGhpcy5yIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5yKS50b1N0cmluZygxNiksXG4gICAgICAgICAgICAodGhpcy5nIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5nKS50b1N0cmluZygxNiksXG4gICAgICAgICAgICAodGhpcy5iIDwgMTYgPyBwcmVmaXggOiAnJykgKyAodGhpcy5iKS50b1N0cmluZygxNiksXG4gICAgICAgIF07XG4gICAgICAgIGlmIChmbXQgPT09ICcjcmdiJykge1xuICAgICAgICAgICAgaGV4WzBdID0gaGV4WzBdWzBdO1xuICAgICAgICAgICAgaGV4WzFdID0gaGV4WzFdWzBdO1xuICAgICAgICAgICAgaGV4WzJdID0gaGV4WzJdWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZtdCA9PT0gJyNycmdnYmJhYScpIHtcbiAgICAgICAgICAgIGhleC5wdXNoKCh0aGlzLmEgPCAxNiA/IHByZWZpeCA6ICcnKSArICh0aGlzLmEpLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhleC5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogISNlbiBDb252ZXJ0IHRvIDI0Yml0IHJnYiB2YWx1ZS5cbiAgICAgKiAhI3poIOi9rOaNouS4uiAyNGJpdCDnmoQgUkdCIOWAvOOAglxuICAgICAqIEBtZXRob2QgdG9SR0JWYWx1ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb2xvciA9IGNjLkNvbG9yLllFTExPVztcbiAgICAgKiBjb2xvci50b1JHQlZhbHVlKCk7IC8vIDE2NzcxODQ0O1xuICAgICAqL1xuICAgIHRvUkdCVmFsdWUgKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWwgJiAweDAwZmZmZmZmO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVhZCBIU1YgbW9kZWwgY29sb3IgYW5kIGNvbnZlcnQgdG8gUkdCIGNvbG9yXG4gICAgICogISN6aCDor7vlj5YgSFNW77yI6Imy5b2p5qih5Z6L77yJ5qC85byP44CCXG4gICAgICogQG1ldGhvZCBmcm9tSFNWXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB2XG4gICAgICogQHJldHVybiB7Q29sb3J9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvbG9yID0gY2MuQ29sb3IuWUVMTE9XO1xuICAgICAqIGNvbG9yLmZyb21IU1YoMCwgMCwgMSk7IC8vIENvbG9yIHtyOiAyNTUsIGc6IDI1NSwgYjogMjU1LCBhOiAyNTV9O1xuICAgICAqL1xuICAgIGZyb21IU1YgKGgsIHMsIHYpOiB0aGlzIHtcbiAgICAgICAgdmFyIHIsIGcsIGI7XG4gICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICByID0gZyA9IGIgPSB2O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHYgPT09IDApIHtcbiAgICAgICAgICAgICAgICByID0gZyA9IGIgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGggPT09IDEpIGggPSAwO1xuICAgICAgICAgICAgICAgIGggKj0gNjtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IE1hdGguZmxvb3IoaCk7XG4gICAgICAgICAgICAgICAgdmFyIGYgPSBoIC0gaTtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IHYgKiAoMSAtIHMpO1xuICAgICAgICAgICAgICAgIHZhciBxID0gdiAqICgxIC0gKHMgKiBmKSk7XG4gICAgICAgICAgICAgICAgdmFyIHQgPSB2ICogKDEgLSAocyAqICgxIC0gZikpKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHY7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHE7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gdjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHA7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gcTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSB2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgciA9IHY7XG4gICAgICAgICAgICAgICAgICAgICAgICBnID0gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHIgKj0gMjU1O1xuICAgICAgICBnICo9IDI1NTtcbiAgICAgICAgYiAqPSAyNTU7XG4gICAgICAgIHRoaXMuX3ZhbCA9ICgodGhpcy5hIDw8IDI0KSA+Pj4gMCkgKyAoYiA8PCAxNikgKyAoZyA8PCA4KSArIHI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVHJhbnNmb3JtIHRvIEhTViBtb2RlbCBjb2xvclxuICAgICAqICEjemgg6L2s5o2i5Li6IEhTVu+8iOiJsuW9qeaooeWei++8ieagvOW8j+OAglxuICAgICAqIEBtZXRob2QgdG9IU1ZcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IC0ge2g6IG51bWJlciwgczogbnVtYmVyLCB2OiBudW1iZXJ9LlxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvbG9yID0gY2MuQ29sb3IuWUVMTE9XO1xuICAgICAqIGNvbG9yLnRvSFNWKCk7IC8vIE9iamVjdCB7aDogMC4xNTMzODY0NTQxODMyNjY5LCBzOiAwLjk4NDMxMzcyNTQ5MDE5NjEsIHY6IDF9O1xuICAgICAqL1xuICAgIHRvSFNWICgpIHtcbiAgICAgICAgdmFyIHIgPSB0aGlzLnIgLyAyNTU7XG4gICAgICAgIHZhciBnID0gdGhpcy5nIC8gMjU1O1xuICAgICAgICB2YXIgYiA9IHRoaXMuYiAvIDI1NTtcbiAgICAgICAgdmFyIGhzdiA9IHsgaDogMCwgczogMCwgdjogMCB9O1xuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gICAgICAgIHZhciBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgaHN2LnYgPSBtYXg7XG4gICAgICAgIGhzdi5zID0gbWF4ID8gKG1heCAtIG1pbikgLyBtYXggOiAwO1xuICAgICAgICBpZiAoIWhzdi5zKSBoc3YuaCA9IDA7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsdGEgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBpZiAociA9PT0gbWF4KSBoc3YuaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaHN2LmggPSAyICsgKGIgLSByKSAvIGRlbHRhO1xuICAgICAgICAgICAgZWxzZSBoc3YuaCA9IDQgKyAociAtIGcpIC8gZGVsdGE7XG4gICAgICAgICAgICBoc3YuaCAvPSA2O1xuICAgICAgICAgICAgaWYgKGhzdi5oIDwgMCkgaHN2LmggKz0gMS4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoc3Y7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgdGhlIGNvbG9yXG4gICAgICogISN6aCDorr7nva7popzoibJcbiAgICAgKiBAbWV0aG9kIHNldFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogc2V0IChjb2xvcjogQ29sb3IpOiBDb2xvclxuICAgICAqIEBwYXJhbSB7Q29sb3J9IGNvbG9yXG4gICAgICovXG4gICAgc2V0IChjb2xvcjogQ29sb3IpOiB0aGlzIHtcbiAgICAgICAgaWYgKGNvbG9yLl92YWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbCA9IGNvbG9yLl92YWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnIgPSBjb2xvci5yO1xuICAgICAgICAgICAgdGhpcy5nID0gY29sb3IuZztcbiAgICAgICAgICAgIHRoaXMuYiA9IGNvbG9yLmI7XG4gICAgICAgICAgICB0aGlzLmEgPSBjb2xvci5hO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIF9mYXN0U2V0QSAoYWxwaGEpIHtcbiAgICAgICAgdGhpcy5fdmFsID0gKCh0aGlzLl92YWwgJiAweDAwZmZmZmZmKSB8IChhbHBoYSA8PCAyNCkpID4+PiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gTXVsdGlwbGllcyB0aGUgY3VycmVudCBjb2xvciBieSB0aGUgc3BlY2lmaWVkIGNvbG9yXG4gICAgICogISN6aCDlsIblvZPliY3popzoibLkuZjku6XkuI7mjIflrprpopzoibJcbiAgICAgKiBAbWV0aG9kIG11bHRpcGx5XG4gICAgICogQHJldHVybiB7Q29sb3J9XG4gICAgICogQHBhcmFtIHtDb2xvcn0gb3RoZXJcbiAgICAgKi9cbiAgICBtdWx0aXBseSAob3RoZXI6IENvbG9yKSB7XG4gICAgICAgIGxldCByID0gKCh0aGlzLl92YWwgJiAweDAwMDAwMGZmKSAqIG90aGVyLnIpID4+IDg7XG4gICAgICAgIGxldCBnID0gKCh0aGlzLl92YWwgJiAweDAwMDBmZjAwKSAqIG90aGVyLmcpID4+IDg7XG4gICAgICAgIGxldCBiID0gKCh0aGlzLl92YWwgJiAweDAwZmYwMDAwKSAqIG90aGVyLmIpID4+IDg7XG4gICAgICAgIGxldCBhID0gKCh0aGlzLl92YWwgJiAweGZmMDAwMDAwKSA+Pj4gOCkgKiBvdGhlci5hO1xuICAgICAgICB0aGlzLl92YWwgPSAoYSAmIDB4ZmYwMDAwMDApIHwgKGIgJiAweDAwZmYwMDAwKSB8IChnICYgMHgwMDAwZmYwMCkgfCAociAmIDB4MDAwMDAwZmYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbkNDQ2xhc3MuZmFzdERlZmluZSgnY2MuQ29sb3InLCBDb2xvciwgeyByOiAwLCBnOiAwLCBiOiAwLCBhOiAyNTUgfSk7XG5cblxuY2MuQ29sb3IgPSBDb2xvcjtcblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgY29udmVuaWVuY2UgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyB7eyNjcm9zc0xpbmsgXCJDb2xvci9Db2xvcjptZXRob2RcIn19Y2MuQ29sb3J7ey9jcm9zc0xpbmt9fVxuICogQWxwaGEgY2hhbm5lbCBpcyBvcHRpb25hbC4gRGVmYXVsdCB2YWx1ZSBpcyAyNTUuXG4gKlxuICogISN6aFxuICog6YCa6L+H6K+l5pa55rOV5p2l5Yib5bu65LiA5Liq5paw55qEIHt7I2Nyb3NzTGluayBcIkNvbG9yL0NvbG9yOm1ldGhvZFwifX1jYy5Db2xvcnt7L2Nyb3NzTGlua319IOWvueixoeOAglxuICogQWxwaGEg6YCa6YGT5piv5Y+v6YCJ55qE44CC6buY6K6k5YC85pivIDI1NeOAglxuICpcbiAqIEBtZXRob2QgY29sb3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcj0wXVxuICogQHBhcmFtIHtOdW1iZXJ9IFtnPTBdXG4gKiBAcGFyYW0ge051bWJlcn0gW2I9MF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbYT0yNTVdXG4gKiBAcmV0dXJuIHtDb2xvcn1cbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdmFsdWUtdHlwZXMvQ0NDb2xvci9jb2xvci5qc31cbiAqL1xuY2MuY29sb3IgPSBmdW5jdGlvbiBjb2xvciAociwgZywgYiwgYSkge1xuICAgIGlmICh0eXBlb2YgciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBDb2xvcigpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmZyb21IRVgocik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb2xvcihyLnIsIHIuZywgci5iLCByLmEpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IENvbG9yKHIsIGcsIGIsIGEpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9