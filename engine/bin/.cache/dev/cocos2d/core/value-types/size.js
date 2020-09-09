
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/size.js';
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * !#en
 * cc.Size is the class for size object,<br/>
 * please do not use its constructor to create sizes,<br/>
 * use {{#crossLink "cc/size:method"}}{{/crossLink}} alias function instead.<br/>
 * It will be deprecated soon, please use cc.Vec2 instead.
 *
 * !#zh
 * cc.Size 是 size 对象的类。<br/>
 * 请不要使用它的构造函数创建的 size，<br/>
 * 使用 {{#crossLink "cc/size:method"}}{{/crossLink}} 别名函数。<br/>
 * 它不久将被取消，请使用cc.Vec2代替。
 *
 * @class Size
 */

/**
 * @method constructor
 * @param {Number|Size} width
 * @param {Number} [height]
 */
var Size = /*#__PURE__*/function (_ValueType) {
  _inheritsLoose(Size, _ValueType);

  _createClass(Size, null, [{
    key: "ZERO",

    /**
     * !#en return a Size object with width = 0 and height = 0.
     * !#zh 返回一个宽度为 0 和高度为 0 的 Size 对象。
     * @property ZERO
     * @type {Size}
     * @default new Size(0, 0)
     * @static
     */
    get: function get() {
      return new Size();
    }
  }]);

  function Size(width, height) {
    var _this;

    if (width === void 0) {
      width = 0;
    }

    if (height === void 0) {
      height = 0;
    }

    _this = _ValueType.call(this) || this;
    _this.width = void 0;
    _this.height = void 0;

    if (width && typeof width === 'object') {
      _this.width = width.width;
      _this.height = width.height;
    } else {
      _this.width = width || 0;
      _this.height = height || 0;
    }

    return _this;
  }
  /**
   * !#en TODO
   * !#zh 克隆 size 对象。
   * @method clone
   * @return {Size}
   * @example
   * var a = new cc.size(10, 10);
   * a.clone();// return Size {width: 0, height: 0};
   */


  var _proto = Size.prototype;

  _proto.clone = function clone() {
    return new Size(this.width, this.height);
  }
  /**
   * !#en TODO
   * !#zh 当前 Size 对象是否等于指定 Size 对象。
   * @method equals
   * @param {Size} other
   * @return {Boolean}
   * @example
   * var a = new cc.size(10, 10);
   * a.equals(new cc.size(10, 10));// return true;
   */
  ;

  _proto.equals = function equals(other) {
    return other && this.width === other.width && this.height === other.height;
  }
  /**
   * !#en TODO
   * !#zh 线性插值。
   * @method lerp
   * @param {Rect} to
   * @param {Number} ratio - the interpolation coefficient.
   * @param {Size} [out] - optional, the receiving vector.
   * @return {Size}
   * @example
   * var a = new cc.size(10, 10);
   * var b = new cc.rect(50, 50, 100, 100);
   * update (dt) {
   *    // method 1;
   *    var c = a.lerp(b, dt * 0.1);
   *    // method 2;
   *    a.lerp(b, dt * 0.1, c);
   * }
   */
  ;

  _proto.lerp = function lerp(to, ratio, out) {
    out = out || new Size();
    var width = this.width;
    var height = this.height;
    out.width = width + (to.width - width) * ratio;
    out.height = height + (to.height - height) * ratio;
    return out;
  };

  _proto.set = function set(source) {
    this.width = source.width;
    this.height = source.height;
    return this;
  }
  /**
   * !#en TODO
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {String}
   * @example
   * var a = new cc.size(10, 10);
   * a.toString();// return "(10.00, 10.00)";
   */
  ;

  _proto.toString = function toString() {
    return '(' + this.width.toFixed(2) + ', ' + this.height.toFixed(2) + ')';
  };

  return Size;
}(_valueType["default"]);

exports["default"] = Size;
Size.ZERO_R = Size.ZERO;

_CCClass["default"].fastDefine('cc.Size', Size, {
  width: 0,
  height: 0
});
/**
 * @module cc
 */

/**
 * !#en
 * Helper function that creates a cc.Size.<br/>
 * Please use cc.p or cc.v2 instead, it will soon replace cc.Size.
 * !#zh
 * 创建一个 cc.Size 对象的帮助函数。<br/>
 * 注意：可以使用 cc.p 或者是 cc.v2 代替，它们将很快取代 cc.Size。
 * @method size
 * @param {Number|Size} w - width or a size object
 * @param {Number} [h] - height
 * @return {Size}
 * @example {@link cocos2d/core/value-types/CCSize/size.js}
 */


cc.size = function (w, h) {
  return new Size(w, h);
};

cc.Size = Size;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3NpemUudHMiXSwibmFtZXMiOlsiU2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiY2xvbmUiLCJlcXVhbHMiLCJvdGhlciIsImxlcnAiLCJ0byIsInJhdGlvIiwib3V0Iiwic2V0Iiwic291cmNlIiwidG9TdHJpbmciLCJ0b0ZpeGVkIiwiVmFsdWVUeXBlIiwiWkVST19SIiwiWkVSTyIsIkNDQ2xhc3MiLCJmYXN0RGVmaW5lIiwiY2MiLCJzaXplIiwidyIsImgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQWVBOzs7OztJQUtxQkE7Ozs7OztBQUVqQjs7Ozs7Ozs7d0JBUW1CO0FBQUUsYUFBTyxJQUFJQSxJQUFKLEVBQVA7QUFBb0I7OztBQVl6QyxnQkFBYUMsS0FBYixFQUF1Q0MsTUFBdkMsRUFBMkQ7QUFBQTs7QUFBQSxRQUE5Q0QsS0FBOEM7QUFBOUNBLE1BQUFBLEtBQThDLEdBQXZCLENBQXVCO0FBQUE7O0FBQUEsUUFBcEJDLE1BQW9CO0FBQXBCQSxNQUFBQSxNQUFvQixHQUFILENBQUc7QUFBQTs7QUFDdkQ7QUFEdUQsVUFOM0RELEtBTTJEO0FBQUEsVUFGM0RDLE1BRTJEOztBQUV2RCxRQUFJRCxLQUFLLElBQUksT0FBT0EsS0FBUCxLQUFpQixRQUE5QixFQUF3QztBQUNwQyxZQUFLQSxLQUFMLEdBQWFBLEtBQUssQ0FBQ0EsS0FBbkI7QUFDQSxZQUFLQyxNQUFMLEdBQWNELEtBQUssQ0FBQ0MsTUFBcEI7QUFDSCxLQUhELE1BSUs7QUFDRCxZQUFLRCxLQUFMLEdBQWFBLEtBQUssSUFBYyxDQUFoQztBQUNBLFlBQUtDLE1BQUwsR0FBY0EsTUFBTSxJQUFJLENBQXhCO0FBQ0g7O0FBVHNEO0FBVTFEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7U0FTQUMsUUFBQSxpQkFBZTtBQUNYLFdBQU8sSUFBSUgsSUFBSixDQUFTLEtBQUtDLEtBQWQsRUFBcUIsS0FBS0MsTUFBMUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7OztTQVVBRSxTQUFBLGdCQUFRQyxLQUFSLEVBQThCO0FBQzFCLFdBQU9BLEtBQUssSUFDUixLQUFLSixLQUFMLEtBQWVJLEtBQUssQ0FBQ0osS0FEbEIsSUFFSCxLQUFLQyxNQUFMLEtBQWdCRyxLQUFLLENBQUNILE1BRjFCO0FBR0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FrQkFJLE9BQUEsY0FBTUMsRUFBTixFQUFnQkMsS0FBaEIsRUFBK0JDLEdBQS9CLEVBQWlEO0FBQzdDQSxJQUFBQSxHQUFHLEdBQUdBLEdBQUcsSUFBSSxJQUFJVCxJQUFKLEVBQWI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0EsS0FBakI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7QUFDQU8sSUFBQUEsR0FBRyxDQUFDUixLQUFKLEdBQVlBLEtBQUssR0FBRyxDQUFDTSxFQUFFLENBQUNOLEtBQUgsR0FBV0EsS0FBWixJQUFxQk8sS0FBekM7QUFDQUMsSUFBQUEsR0FBRyxDQUFDUCxNQUFKLEdBQWFBLE1BQU0sR0FBRyxDQUFDSyxFQUFFLENBQUNMLE1BQUgsR0FBWUEsTUFBYixJQUF1Qk0sS0FBN0M7QUFDQSxXQUFPQyxHQUFQO0FBQ0g7O1NBRURDLE1BQUEsYUFBS0MsTUFBTCxFQUFtQjtBQUNmLFNBQUtWLEtBQUwsR0FBYVUsTUFBTSxDQUFDVixLQUFwQjtBQUNBLFNBQUtDLE1BQUwsR0FBY1MsTUFBTSxDQUFDVCxNQUFyQjtBQUNBLFdBQU8sSUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7Ozs7O1NBU0FVLFdBQUEsb0JBQW9CO0FBQ2hCLFdBQU8sTUFBTSxLQUFLWCxLQUFMLENBQVdZLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBTixHQUE4QixJQUE5QixHQUFxQyxLQUFLWCxNQUFMLENBQVlXLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBckMsR0FBOEQsR0FBckU7QUFDSDs7O0VBM0c2QkM7OztBQUFiZCxLQVdEZSxTQUFTZixJQUFJLENBQUNnQjs7QUFtR2xDQyxvQkFBUUMsVUFBUixDQUFtQixTQUFuQixFQUE4QmxCLElBQTlCLEVBQW9DO0FBQUVDLEVBQUFBLEtBQUssRUFBRSxDQUFUO0FBQVlDLEVBQUFBLE1BQU0sRUFBRTtBQUFwQixDQUFwQztBQUdBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7OztBQWFBaUIsRUFBRSxDQUFDQyxJQUFILEdBQVUsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ3RCLFNBQU8sSUFBSXRCLElBQUosQ0FBU3FCLENBQVQsRUFBWUMsQ0FBWixDQUFQO0FBQ0gsQ0FGRDs7QUFJQUgsRUFBRSxDQUFDbkIsSUFBSCxHQUFVQSxJQUFWIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgVmFsdWVUeXBlIGZyb20gJy4vdmFsdWUtdHlwZSc7XG5pbXBvcnQgQ0NDbGFzcyBmcm9tICcuLi9wbGF0Zm9ybS9DQ0NsYXNzJztcblxuLyoqXG4gKiAhI2VuXG4gKiBjYy5TaXplIGlzIHRoZSBjbGFzcyBmb3Igc2l6ZSBvYmplY3QsPGJyLz5cbiAqIHBsZWFzZSBkbyBub3QgdXNlIGl0cyBjb25zdHJ1Y3RvciB0byBjcmVhdGUgc2l6ZXMsPGJyLz5cbiAqIHVzZSB7eyNjcm9zc0xpbmsgXCJjYy9zaXplOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fSBhbGlhcyBmdW5jdGlvbiBpbnN0ZWFkLjxici8+XG4gKiBJdCB3aWxsIGJlIGRlcHJlY2F0ZWQgc29vbiwgcGxlYXNlIHVzZSBjYy5WZWMyIGluc3RlYWQuXG4gKlxuICogISN6aFxuICogY2MuU2l6ZSDmmK8gc2l6ZSDlr7nosaHnmoTnsbvjgII8YnIvPlxuICog6K+35LiN6KaB5L2/55So5a6D55qE5p6E6YCg5Ye95pWw5Yib5bu655qEIHNpemXvvIw8YnIvPlxuICog5L2/55SoIHt7I2Nyb3NzTGluayBcImNjL3NpemU6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319IOWIq+WQjeWHveaVsOOAgjxici8+XG4gKiDlroPkuI3kuYXlsIbooqvlj5bmtojvvIzor7fkvb/nlKhjYy5WZWMy5Luj5pu/44CCXG4gKlxuICogQGNsYXNzIFNpemVcbiAqL1xuLyoqXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge051bWJlcnxTaXplfSB3aWR0aFxuICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpemUgZXh0ZW5kcyBWYWx1ZVR5cGUge1xuXG4gICAgLyoqXG4gICAgICogISNlbiByZXR1cm4gYSBTaXplIG9iamVjdCB3aXRoIHdpZHRoID0gMCBhbmQgaGVpZ2h0ID0gMC5cbiAgICAgKiAhI3poIOi/lOWbnuS4gOS4quWuveW6puS4uiAwIOWSjOmrmOW6puS4uiAwIOeahCBTaXplIOWvueixoeOAglxuICAgICAqIEBwcm9wZXJ0eSBaRVJPXG4gICAgICogQHR5cGUge1NpemV9XG4gICAgICogQGRlZmF1bHQgbmV3IFNpemUoMCwgMClcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgc3RhdGljIGdldCBaRVJPICgpIHsgcmV0dXJuIG5ldyBTaXplKCk7IH1cbiAgICBzdGF0aWMgcmVhZG9ubHkgWkVST19SID0gU2l6ZS5aRVJPO1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gICAgICovXG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gICAgICovXG4gICAgaGVpZ2h0OiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvciAod2lkdGg6IFNpemUgfCBudW1iZXIgPSAwLCBoZWlnaHQ6IG51bWJlciA9IDApIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKHdpZHRoICYmIHR5cGVvZiB3aWR0aCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aC53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gd2lkdGguaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoIGFzIG51bWJlciB8fCAwO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gVE9ET1xuICAgICAqICEjemgg5YWL6ZqGIHNpemUg5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5zaXplKDEwLCAxMCk7XG4gICAgICogYS5jbG9uZSgpOy8vIHJldHVybiBTaXplIHt3aWR0aDogMCwgaGVpZ2h0OiAwfTtcbiAgICAgKi9cbiAgICBjbG9uZSAoKTogU2l6ZSB7XG4gICAgICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDlvZPliY0gU2l6ZSDlr7nosaHmmK/lkKbnrYnkuo7mjIflrpogU2l6ZSDlr7nosaHjgIJcbiAgICAgKiBAbWV0aG9kIGVxdWFsc1xuICAgICAqIEBwYXJhbSB7U2l6ZX0gb3RoZXJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGEgPSBuZXcgY2Muc2l6ZSgxMCwgMTApO1xuICAgICAqIGEuZXF1YWxzKG5ldyBjYy5zaXplKDEwLCAxMCkpOy8vIHJldHVybiB0cnVlO1xuICAgICAqL1xuICAgIGVxdWFscyAob3RoZXI6IFNpemUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG90aGVyICYmXG4gICAgICAgICAgICB0aGlzLndpZHRoID09PSBvdGhlci53aWR0aCAmJlxuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPT09IG90aGVyLmhlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRPRE9cbiAgICAgKiAhI3poIOe6v+aAp+aPkuWAvOOAglxuICAgICAqIEBtZXRob2QgbGVycFxuICAgICAqIEBwYXJhbSB7UmVjdH0gdG9cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcmF0aW8gLSB0aGUgaW50ZXJwb2xhdGlvbiBjb2VmZmljaWVudC5cbiAgICAgKiBAcGFyYW0ge1NpemV9IFtvdXRdIC0gb3B0aW9uYWwsIHRoZSByZWNlaXZpbmcgdmVjdG9yLlxuICAgICAqIEByZXR1cm4ge1NpemV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYSA9IG5ldyBjYy5zaXplKDEwLCAxMCk7XG4gICAgICogdmFyIGIgPSBuZXcgY2MucmVjdCg1MCwgNTAsIDEwMCwgMTAwKTtcbiAgICAgKiB1cGRhdGUgKGR0KSB7XG4gICAgICogICAgLy8gbWV0aG9kIDE7XG4gICAgICogICAgdmFyIGMgPSBhLmxlcnAoYiwgZHQgKiAwLjEpO1xuICAgICAqICAgIC8vIG1ldGhvZCAyO1xuICAgICAqICAgIGEubGVycChiLCBkdCAqIDAuMSwgYyk7XG4gICAgICogfVxuICAgICAqL1xuICAgIGxlcnAgKHRvOiBTaXplLCByYXRpbzogbnVtYmVyLCBvdXQ/OiBTaXplKTogU2l6ZSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgU2l6ZSgpO1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICAgIG91dC53aWR0aCA9IHdpZHRoICsgKHRvLndpZHRoIC0gd2lkdGgpICogcmF0aW87XG4gICAgICAgIG91dC5oZWlnaHQgPSBoZWlnaHQgKyAodG8uaGVpZ2h0IC0gaGVpZ2h0KSAqIHJhdGlvO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHNldCAoc291cmNlKTogU2l6ZSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBzb3VyY2Uud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gc291cmNlLmhlaWdodDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBUT0RPXG4gICAgICogISN6aCDovazmjaLkuLrmlrnkvr/pmIXor7vnmoTlrZfnrKbkuLLjgIJcbiAgICAgKiBAbWV0aG9kIHRvU3RyaW5nXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGEgPSBuZXcgY2Muc2l6ZSgxMCwgMTApO1xuICAgICAqIGEudG9TdHJpbmcoKTsvLyByZXR1cm4gXCIoMTAuMDAsIDEwLjAwKVwiO1xuICAgICAqL1xuICAgIHRvU3RyaW5nICgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJygnICsgdGhpcy53aWR0aC50b0ZpeGVkKDIpICsgJywgJyArIHRoaXMuaGVpZ2h0LnRvRml4ZWQoMikgKyAnKSc7XG4gICAgfVxufVxuXG5DQ0NsYXNzLmZhc3REZWZpbmUoJ2NjLlNpemUnLCBTaXplLCB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XG5cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBjcmVhdGVzIGEgY2MuU2l6ZS48YnIvPlxuICogUGxlYXNlIHVzZSBjYy5wIG9yIGNjLnYyIGluc3RlYWQsIGl0IHdpbGwgc29vbiByZXBsYWNlIGNjLlNpemUuXG4gKiAhI3poXG4gKiDliJvlu7rkuIDkuKogY2MuU2l6ZSDlr7nosaHnmoTluK7liqnlh73mlbDjgII8YnIvPlxuICog5rOo5oSP77ya5Y+v5Lul5L2/55SoIGNjLnAg5oiW6ICF5pivIGNjLnYyIOS7o+abv++8jOWug+S7rOWwhuW+iOW/q+WPluS7oyBjYy5TaXpl44CCXG4gKiBAbWV0aG9kIHNpemVcbiAqIEBwYXJhbSB7TnVtYmVyfFNpemV9IHcgLSB3aWR0aCBvciBhIHNpemUgb2JqZWN0XG4gKiBAcGFyYW0ge051bWJlcn0gW2hdIC0gaGVpZ2h0XG4gKiBAcmV0dXJuIHtTaXplfVxuICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS92YWx1ZS10eXBlcy9DQ1NpemUvc2l6ZS5qc31cbiAqL1xuY2Muc2l6ZSA9IGZ1bmN0aW9uICh3LCBoKSB7XG4gICAgcmV0dXJuIG5ldyBTaXplKHcsIGgpO1xufTtcblxuY2MuU2l6ZSA9IFNpemU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==