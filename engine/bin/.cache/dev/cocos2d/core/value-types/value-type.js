
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/value-types/value-type.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _js = _interopRequireDefault(require("../platform/js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en The base class of all value types.
 * !#zh 所有值类型的基类。
 * @class ValueType
 *
 */
var ValueType = /*#__PURE__*/function () {
  function ValueType() {}

  var _proto = ValueType.prototype;

  /**
   * !#en This method returns an exact copy of current value.
   * !#zh 克隆当前值，该方法返回一个新对象，新对象的值和原对象相等。
   * @method clone
   * @return {ValueType}
   */
  _proto.clone = function clone() {
    cc.errorID('0100', _js["default"].getClassName(this) + '.clone'); // @ts-ignore

    return null;
  }
  /**
   * !#en Compares this object with the other one.
   * !#zh 当前对象是否等于指定对象。
   * @method equals
   * @param {ValueType} other
   * @return {Boolean}
   */
  ;

  _proto.equals = function equals(other) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.equals');
    return false;
  }
  /**
   * !#en
   * Linearly interpolates between this value to to value by ratio which is in the range [0, 1].
   * When ratio = 0 returns this. When ratio = 1 return to. When ratio = 0.5 returns the average of this and to.
   * !#zh
   * 线性插值。<br/>
   * 当 ratio = 0 时返回自身，ratio = 1 时返回目标，ratio = 0.5 返回自身和目标的平均值。。
   * @method lerp
   * @param {ValueType} to - the to value
   * @param {number} ratio - the interpolation coefficient
   * @return {ValueType}
   */
  ;

  _proto.lerp = function lerp(to, ratio) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.lerp');
    return this.clone();
  }
  /**
   * !#en
   * Copys all the properties from another given object to this value.
   * !#zh
   * 从其它对象把所有属性复制到当前对象。
   * @method set
   * @param {ValueType} source - the source to copy
   */
  ;

  _proto.set = function set(source) {
    cc.errorID('0100', _js["default"].getClassName(this) + '.set');
  }
  /**
   * !#en Convert to a readable string.
   * !#zh 转换为方便阅读的字符串。
   * @method toString
   * @return {string}
   */
  ;

  _proto.toString = function toString() {
    return '' + {};
  };

  return ValueType;
}();

exports["default"] = ValueType;

_js["default"].setClassName('cc.ValueType', ValueType);

cc.ValueType = ValueType;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3ZhbHVlLXR5cGVzL3ZhbHVlLXR5cGUudHMiXSwibmFtZXMiOlsiVmFsdWVUeXBlIiwiY2xvbmUiLCJjYyIsImVycm9ySUQiLCJqcyIsImdldENsYXNzTmFtZSIsImVxdWFscyIsIm90aGVyIiwibGVycCIsInRvIiwicmF0aW8iLCJzZXQiLCJzb3VyY2UiLCJ0b1N0cmluZyIsInNldENsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7OztBQTFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7OztJQU1xQkE7Ozs7O0FBQ2pCOzs7Ozs7U0FNQUMsUUFBQSxpQkFBcUI7QUFDakJDLElBQUFBLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXLE1BQVgsRUFBbUJDLGVBQUdDLFlBQUgsQ0FBZ0IsSUFBaEIsSUFBd0IsUUFBM0MsRUFEaUIsQ0FFakI7O0FBQ0EsV0FBTyxJQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7O1NBT0FDLFNBQUEsZ0JBQVFDLEtBQVIsRUFBZTtBQUNYTCxJQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxNQUFYLEVBQW1CQyxlQUFHQyxZQUFILENBQWdCLElBQWhCLElBQXdCLFNBQTNDO0FBQ0EsV0FBTyxLQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7U0FZQUcsT0FBQSxjQUFNQyxFQUFOLEVBQVVDLEtBQVYsRUFBaUI7QUFDYlIsSUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsTUFBWCxFQUFtQkMsZUFBR0MsWUFBSCxDQUFnQixJQUFoQixJQUF3QixPQUEzQztBQUNBLFdBQU8sS0FBS0osS0FBTCxFQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OztTQVFBVSxNQUFBLGFBQUtDLE1BQUwsRUFBYTtBQUNUVixJQUFBQSxFQUFFLENBQUNDLE9BQUgsQ0FBVyxNQUFYLEVBQW1CQyxlQUFHQyxZQUFILENBQWdCLElBQWhCLElBQXdCLE1BQTNDO0FBQ0g7QUFFRDs7Ozs7Ozs7U0FNQVEsV0FBQSxvQkFBWTtBQUNSLFdBQU8sS0FBSyxFQUFaO0FBQ0g7Ozs7Ozs7QUFHTFQsZUFBR1UsWUFBSCxDQUFnQixjQUFoQixFQUFnQ2QsU0FBaEM7O0FBQ0FFLEVBQUUsQ0FBQ0YsU0FBSCxHQUFlQSxTQUFmIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQganMgZnJvbSAnLi4vcGxhdGZvcm0vanMnO1xuXG4vKipcbiAqICEjZW4gVGhlIGJhc2UgY2xhc3Mgb2YgYWxsIHZhbHVlIHR5cGVzLlxuICogISN6aCDmiYDmnInlgLznsbvlnovnmoTln7rnsbvjgIJcbiAqIEBjbGFzcyBWYWx1ZVR5cGVcbiAqXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbHVlVHlwZSB7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIGV4YWN0IGNvcHkgb2YgY3VycmVudCB2YWx1ZS5cbiAgICAgKiAhI3poIOWFi+mahuW9k+WJjeWAvO+8jOivpeaWueazlei/lOWbnuS4gOS4quaWsOWvueixoe+8jOaWsOWvueixoeeahOWAvOWSjOWOn+WvueixoeebuOetieOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtWYWx1ZVR5cGV9XG4gICAgICovXG4gICAgY2xvbmUgKCkgOiBWYWx1ZVR5cGUge1xuICAgICAgICBjYy5lcnJvcklEKCcwMTAwJywganMuZ2V0Q2xhc3NOYW1lKHRoaXMpICsgJy5jbG9uZScpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29tcGFyZXMgdGhpcyBvYmplY3Qgd2l0aCB0aGUgb3RoZXIgb25lLlxuICAgICAqICEjemgg5b2T5YmN5a+56LGh5piv5ZCm562J5LqO5oyH5a6a5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBlcXVhbHNcbiAgICAgKiBAcGFyYW0ge1ZhbHVlVHlwZX0gb3RoZXJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGVxdWFscyAob3RoZXIpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgnMDEwMCcsIGpzLmdldENsYXNzTmFtZSh0aGlzKSArICcuZXF1YWxzJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogTGluZWFybHkgaW50ZXJwb2xhdGVzIGJldHdlZW4gdGhpcyB2YWx1ZSB0byB0byB2YWx1ZSBieSByYXRpbyB3aGljaCBpcyBpbiB0aGUgcmFuZ2UgWzAsIDFdLlxuICAgICAqIFdoZW4gcmF0aW8gPSAwIHJldHVybnMgdGhpcy4gV2hlbiByYXRpbyA9IDEgcmV0dXJuIHRvLiBXaGVuIHJhdGlvID0gMC41IHJldHVybnMgdGhlIGF2ZXJhZ2Ugb2YgdGhpcyBhbmQgdG8uXG4gICAgICogISN6aFxuICAgICAqIOe6v+aAp+aPkuWAvOOAgjxici8+XG4gICAgICog5b2TIHJhdGlvID0gMCDml7bov5Tlm57oh6rouqvvvIxyYXRpbyA9IDEg5pe26L+U5Zue55uu5qCH77yMcmF0aW8gPSAwLjUg6L+U5Zue6Ieq6Lqr5ZKM55uu5qCH55qE5bmz5Z2H5YC844CC44CCXG4gICAgICogQG1ldGhvZCBsZXJwXG4gICAgICogQHBhcmFtIHtWYWx1ZVR5cGV9IHRvIC0gdGhlIHRvIHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJhdGlvIC0gdGhlIGludGVycG9sYXRpb24gY29lZmZpY2llbnRcbiAgICAgKiBAcmV0dXJuIHtWYWx1ZVR5cGV9XG4gICAgICovXG4gICAgbGVycCAodG8sIHJhdGlvKSB7XG4gICAgICAgIGNjLmVycm9ySUQoJzAxMDAnLCBqcy5nZXRDbGFzc05hbWUodGhpcykgKyAnLmxlcnAnKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29weXMgYWxsIHRoZSBwcm9wZXJ0aWVzIGZyb20gYW5vdGhlciBnaXZlbiBvYmplY3QgdG8gdGhpcyB2YWx1ZS5cbiAgICAgKiAhI3poXG4gICAgICog5LuO5YW25a6D5a+56LGh5oqK5omA5pyJ5bGe5oCn5aSN5Yi25Yiw5b2T5YmN5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge1ZhbHVlVHlwZX0gc291cmNlIC0gdGhlIHNvdXJjZSB0byBjb3B5XG4gICAgICovXG4gICAgc2V0IChzb3VyY2UpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgnMDEwMCcsIGpzLmdldENsYXNzTmFtZSh0aGlzKSArICcuc2V0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlbiBDb252ZXJ0IHRvIGEgcmVhZGFibGUgc3RyaW5nLlxuICAgICAqICEjemgg6L2s5o2i5Li65pa55L6/6ZiF6K+755qE5a2X56ym5Liy44CCXG4gICAgICogQG1ldGhvZCB0b1N0cmluZ1xuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICAgIHJldHVybiAnJyArIHt9O1xuICAgIH1cbn1cblxuanMuc2V0Q2xhc3NOYW1lKCdjYy5WYWx1ZVR5cGUnLCBWYWx1ZVR5cGUpO1xuY2MuVmFsdWVUeXBlID0gVmFsdWVUeXBlO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=