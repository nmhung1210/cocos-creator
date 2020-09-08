
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/line.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _valueTypes = require("../value-types");

var _enums = _interopRequireDefault(require("./enums"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
 * !#en 
 * line
 * !#zh
 * 直线
 * @class geomUtils.Line
 */
var line = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new line
   * !#zh
   * 创建一个新的 line。
   * @method create
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   * @return {Line}
   */
  line.create = function create(sx, sy, sz, ex, ey, ez) {
    return new line(sx, sy, sz, ex, ey, ez);
  }
  /**
   * !#en
   * Creates a new line initialized with values from an existing line
   * !#zh
   * 克隆一个新的 line。
   * @method clone
   * @param {Line} a The source of cloning.
   * @return {Line} The cloned object.
   */
  ;

  line.clone = function clone(a) {
    return new line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
  }
  /**
   * !#en
   * Copy the values from one line to another
   * !#zh
   * 复制一个线的值到另一个。
   * @method copy
   * @param {Line} out The object that accepts the action.
   * @param {Line} a The source of the copy.
   * @return {Line} The object that accepts the action.
   */
  ;

  line.copy = function copy(out, a) {
    _valueTypes.Vec3.copy(out.s, a.s);

    _valueTypes.Vec3.copy(out.e, a.e);

    return out;
  }
  /**
   * !#en
   * create a line from two points
   * !#zh
   * 用两个点创建一个线。
   * @method fromPoints
   * @param {Line} out The object that accepts the action.
   * @param {Vec3} start The starting point.
   * @param {Vec3} end At the end.
   * @return {Line} out The object that accepts the action.
   */
  ;

  line.fromPoints = function fromPoints(out, start, end) {
    _valueTypes.Vec3.copy(out.s, start);

    _valueTypes.Vec3.copy(out.e, end);

    return out;
  }
  /**
   * !#en
   * Set the components of a Vec3 to the given values
   * !#zh
   * 将给定线的属性设置为给定值。
   * @method set
   * @param {Line} out The object that accepts the action.
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   * @return {Line} out The object that accepts the action.
   */
  ;

  line.set = function set(out, sx, sy, sz, ex, ey, ez) {
    out.s.x = sx;
    out.s.y = sy;
    out.s.z = sz;
    out.e.x = ex;
    out.e.y = ey;
    out.e.z = ez;
    return out;
  }
  /**
   * !#en
   * Calculate the length of the line.
   * !#zh
   * 计算线的长度。
   * @method len
   * @param {Line} a The line to calculate.
   * @return {Number} Length.
   */
  ;

  line.len = function len(a) {
    return _valueTypes.Vec3.distance(a.s, a.e);
  }
  /**
   * !#en
   * Start points.
   * !#zh
   * 起点。
   * @property {Vec3} s
   */
  ;

  /**
   * !#en Construct a line.
   * !#zh 构造一条线。
   * @constructor
   * @param {Number} sx The x part of the starting point.
   * @param {Number} sy The y part of the starting point.
   * @param {Number} sz The z part of the starting point.
   * @param {Number} ex The x part of the end point.
   * @param {Number} ey The y part of the end point.
   * @param {Number} ez The z part of the end point.
   */
  function line(sx, sy, sz, ex, ey, ez) {
    if (sx === void 0) {
      sx = 0;
    }

    if (sy === void 0) {
      sy = 0;
    }

    if (sz === void 0) {
      sz = 0;
    }

    if (ex === void 0) {
      ex = 0;
    }

    if (ey === void 0) {
      ey = 0;
    }

    if (ez === void 0) {
      ez = -1;
    }

    this.s = void 0;
    this.e = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_LINE;
    this.s = new _valueTypes.Vec3(sx, sy, sz);
    this.e = new _valueTypes.Vec3(ex, ey, ez);
  }
  /**
   * !#en
   * Calculate the length of the line.
   * !#zh
   * 计算线的长度。
   * @method length
   * @return {Number} Length.
   */


  var _proto = line.prototype;

  _proto.length = function length() {
    return _valueTypes.Vec3.distance(this.s, this.e);
  };

  return line;
}();

exports["default"] = line;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvbGluZS50cyJdLCJuYW1lcyI6WyJsaW5lIiwiY3JlYXRlIiwic3giLCJzeSIsInN6IiwiZXgiLCJleSIsImV6IiwiY2xvbmUiLCJhIiwicyIsIngiLCJ5IiwieiIsImUiLCJjb3B5Iiwib3V0IiwiVmVjMyIsImZyb21Qb2ludHMiLCJzdGFydCIsImVuZCIsInNldCIsImxlbiIsImRpc3RhbmNlIiwiX3R5cGUiLCJlbnVtcyIsIlNIQVBFX0xJTkUiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkE7O0FBQ0E7Ozs7QUF6QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkE7Ozs7Ozs7SUFPcUJBO0FBRWpCOzs7Ozs7Ozs7Ozs7OztPQWNjQyxTQUFkLGdCQUFzQkMsRUFBdEIsRUFBa0NDLEVBQWxDLEVBQThDQyxFQUE5QyxFQUEwREMsRUFBMUQsRUFBc0VDLEVBQXRFLEVBQWtGQyxFQUFsRixFQUE4RjtBQUMxRixXQUFPLElBQUlQLElBQUosQ0FBU0UsRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixFQUFxQkMsRUFBckIsRUFBeUJDLEVBQXpCLEVBQTZCQyxFQUE3QixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7T0FTY0MsUUFBZCxlQUFxQkMsQ0FBckIsRUFBOEI7QUFDMUIsV0FBTyxJQUFJVCxJQUFKLENBQ0hTLENBQUMsQ0FBQ0MsQ0FBRixDQUFJQyxDQURELEVBQ0lGLENBQUMsQ0FBQ0MsQ0FBRixDQUFJRSxDQURSLEVBQ1dILENBQUMsQ0FBQ0MsQ0FBRixDQUFJRyxDQURmLEVBRUhKLENBQUMsQ0FBQ0ssQ0FBRixDQUFJSCxDQUZELEVBRUlGLENBQUMsQ0FBQ0ssQ0FBRixDQUFJRixDQUZSLEVBRVdILENBQUMsQ0FBQ0ssQ0FBRixDQUFJRCxDQUZmLENBQVA7QUFJSDtBQUVEOzs7Ozs7Ozs7Ozs7T0FVY0UsT0FBZCxjQUFvQkMsR0FBcEIsRUFBK0JQ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KioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmltcG9ydCB7IFZlYzMgfSBmcm9tICcuLi92YWx1ZS10eXBlcyc7XG5pbXBvcnQgZW51bXMgZnJvbSAnLi9lbnVtcyc7XG5cbi8qKlxuICogISNlbiBcbiAqIGxpbmVcbiAqICEjemhcbiAqIOebtOe6v1xuICogQGNsYXNzIGdlb21VdGlscy5MaW5lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpbmUge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIG5ldyBsaW5lXG4gICAgICogISN6aFxuICAgICAqIOWIm+W7uuS4gOS4quaWsOeahCBsaW5l44CCXG4gICAgICogQG1ldGhvZCBjcmVhdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3ggVGhlIHggcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN5IFRoZSB5IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeiBUaGUgeiBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXggVGhlIHggcGFydCBvZiB0aGUgZW5kIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleSBUaGUgeSBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV6IFRoZSB6IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cbiAgICAgKiBAcmV0dXJuIHtMaW5lfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlIChzeDogbnVtYmVyLCBzeTogbnVtYmVyLCBzejogbnVtYmVyLCBleDogbnVtYmVyLCBleTogbnVtYmVyLCBlejogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgbGluZShzeCwgc3ksIHN6LCBleCwgZXksIGV6KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ3JlYXRlcyBhIG5ldyBsaW5lIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbGluZVxuICAgICAqICEjemhcbiAgICAgKiDlhYvpmobkuIDkuKrmlrDnmoQgbGluZeOAglxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge0xpbmV9IGEgVGhlIHNvdXJjZSBvZiBjbG9uaW5nLlxuICAgICAqIEByZXR1cm4ge0xpbmV9IFRoZSBjbG9uZWQgb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgKGE6IGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBsaW5lKFxuICAgICAgICAgICAgYS5zLngsIGEucy55LCBhLnMueixcbiAgICAgICAgICAgIGEuZS54LCBhLmUueSwgYS5lLnosXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBsaW5lIHRvIGFub3RoZXJcbiAgICAgKiAhI3poXG4gICAgICog5aSN5Yi25LiA5Liq57q/55qE5YC85Yiw5Y+m5LiA5Liq44CCXG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHBhcmFtIHtMaW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0ge0xpbmV9IGEgVGhlIHNvdXJjZSBvZiB0aGUgY29weS5cbiAgICAgKiBAcmV0dXJuIHtMaW5lfSBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0OiBsaW5lLCBhOiBsaW5lKSB7XG4gICAgICAgIFZlYzMuY29weShvdXQucywgYS5zKTtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5lLCBhLmUpO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIGxpbmUgZnJvbSB0d28gcG9pbnRzXG4gICAgICogISN6aFxuICAgICAqIOeUqOS4pOS4queCueWIm+W7uuS4gOS4que6v+OAglxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xuICAgICAqIEBwYXJhbSB7TGluZX0gb3V0IFRoZSBvYmplY3QgdGhhdCBhY2NlcHRzIHRoZSBhY3Rpb24uXG4gICAgICogQHBhcmFtIHtWZWMzfSBzdGFydCBUaGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtWZWMzfSBlbmQgQXQgdGhlIGVuZC5cbiAgICAgKiBAcmV0dXJuIHtMaW5lfSBvdXQgVGhlIG9iamVjdCB0aGF0IGFjY2VwdHMgdGhlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dDogbGluZSwgc3RhcnQ6IFZlYzMsIGVuZDogVmVjMykge1xuICAgICAgICBWZWMzLmNvcHkob3V0LnMsIHN0YXJ0KTtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5lLCBlbmQpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBWZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKiAhI3poXG4gICAgICog5bCG57uZ5a6a57q/55qE5bGe5oCn6K6+572u5Li657uZ5a6a5YC844CCXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge0xpbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeCBUaGUgeCBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3kgVGhlIHkgcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN6IFRoZSB6IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleCBUaGUgeCBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV5IFRoZSB5IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXogVGhlIHogcGFydCBvZiB0aGUgZW5kIHBvaW50LlxuICAgICAqIEByZXR1cm4ge0xpbmV9IG91dCBUaGUgb2JqZWN0IHRoYXQgYWNjZXB0cyB0aGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0IChvdXQ6IGxpbmUsIHN4OiBudW1iZXIsIHN5OiBudW1iZXIsIHN6OiBudW1iZXIsIGV4OiBudW1iZXIsIGV5OiBudW1iZXIsIGV6OiBudW1iZXIpIHtcbiAgICAgICAgb3V0LnMueCA9IHN4O1xuICAgICAgICBvdXQucy55ID0gc3k7XG4gICAgICAgIG91dC5zLnogPSBzejtcbiAgICAgICAgb3V0LmUueCA9IGV4O1xuICAgICAgICBvdXQuZS55ID0gZXk7XG4gICAgICAgIG91dC5lLnogPSBlejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICAgKiAhI3poXG4gICAgICog6K6h566X57q/55qE6ZW/5bqm44CCXG4gICAgICogQG1ldGhvZCBsZW5cbiAgICAgKiBAcGFyYW0ge0xpbmV9IGEgVGhlIGxpbmUgdG8gY2FsY3VsYXRlLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbGVuIChhOiBsaW5lKSB7XG4gICAgICAgIHJldHVybiBWZWMzLmRpc3RhbmNlKGEucywgYS5lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU3RhcnQgcG9pbnRzLlxuICAgICAqICEjemhcbiAgICAgKiDotbfngrnjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IHNcbiAgICAgKi9cbiAgICBwdWJsaWMgczogVmVjMztcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFbmQgcG9pbnRzLlxuICAgICAqICEjemhcbiAgICAgKiDnu4jngrnjgIJcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGVcbiAgICAgKi9cbiAgICBwdWJsaWMgZTogVmVjMztcblxuICAgIHByaXZhdGUgX3R5cGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29uc3RydWN0IGEgbGluZS5cbiAgICAgKiAhI3poIOaehOmAoOS4gOadoee6v+OAglxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzeCBUaGUgeCBwYXJ0IG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3kgVGhlIHkgcGFydCBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN6IFRoZSB6IHBhcnQgb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleCBUaGUgeCBwYXJ0IG9mIHRoZSBlbmQgcG9pbnQuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGV5IFRoZSB5IHBhcnQgb2YgdGhlIGVuZCBwb2ludC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXogVGhlIHogcGFydCBvZiB0aGUgZW5kIHBvaW50LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChzeCA9IDAsIHN5ID0gMCwgc3ogPSAwLCBleCA9IDAsIGV5ID0gMCwgZXogPSAtMSkge1xuICAgICAgICB0aGlzLl90eXBlID0gZW51bXMuU0hBUEVfTElORTtcbiAgICAgICAgdGhpcy5zID0gbmV3IFZlYzMoc3gsIHN5LCBzeik7XG4gICAgICAgIHRoaXMuZSA9IG5ldyBWZWMzKGV4LCBleSwgZXopO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDYWxjdWxhdGUgdGhlIGxlbmd0aCBvZiB0aGUgbGluZS5cbiAgICAgKiAhI3poXG4gICAgICog6K6h566X57q/55qE6ZW/5bqm44CCXG4gICAgICogQG1ldGhvZCBsZW5ndGhcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IExlbmd0aC5cbiAgICAgKi9cbiAgICBwdWJsaWMgbGVuZ3RoICgpIHtcbiAgICAgICAgcmV0dXJuIFZlYzMuZGlzdGFuY2UodGhpcy5zLCB0aGlzLmUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9