
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/triangle.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vec = _interopRequireDefault(require("../value-types/vec3"));

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
 * Triangle
 * @class geomUtils.Triangle
 */
var triangle = /*#__PURE__*/function () {
  /**
   * create a new triangle
   * @method create
   * @param {number} ax
   * @param {number} ay
   * @param {number} az
   * @param {number} bx
   * @param {number} by
   * @param {number} bz
   * @param {number} cx
   * @param {number} cy
   * @param {number} cz
   * @return {geomUtils.Triangle}
   */
  triangle.create = function create(ax, ay, az, bx, by, bz, cx, cy, cz) {
    return new triangle(ax, ay, az, bx, by, bz, cx, cy, cz);
  }
  /**
   * clone a new triangle
   * @method clone
   * @param {geomUtils.Triangle} t the source plane
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.clone = function clone(t) {
    return new triangle(t.a.x, t.a.y, t.a.z, t.b.x, t.b.y, t.b.z, t.c.x, t.c.y, t.c.z);
  }
  /**
   * copy the values from one triangle to another
   * @method copy
   * @param {geomUtils.Triangle} out the receiving triangle
   * @param {geomUtils.Triangle} t the source triangle
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.copy = function copy(out, t) {
    _vec["default"].copy(out.a, t.a);

    _vec["default"].copy(out.b, t.b);

    _vec["default"].copy(out.c, t.c);

    return out;
  }
  /**
   * Create a triangle from three points
   * @method fromPoints
   * @param {geomUtils.Triangle} out the receiving triangle
   * @param {Vec3} a
   * @param {Vec3} b
   * @param {Vec3} c
   * @return {geomUtils.Triangle}
   */
  ;

  triangle.fromPoints = function fromPoints(out, a, b, c) {
    _vec["default"].copy(out.a, a);

    _vec["default"].copy(out.b, b);

    _vec["default"].copy(out.c, c);

    return out;
  }
  /**
   * Set the components of a triangle to the given values
   *
   * @method set
   * @param {geomUtils.Triangle} out the receiving plane
   * @param {number} ax X component of a
   * @param {number} ay Y component of a
   * @param {number} az Z component of a
   * @param {number} bx X component of b
   * @param {number} by Y component of b
   * @param {number} bz Z component of b
   * @param {number} cx X component of c
   * @param {number} cy Y component of c
   * @param {number} cz Z component of c
   * @return {Plane}
   */
  ;

  triangle.set = function set(out, ax, ay, az, bx, by, bz, cx, cy, cz) {
    out.a.x = ax;
    out.a.y = ay;
    out.a.z = az;
    out.b.x = bx;
    out.b.y = by;
    out.b.z = bz;
    out.c.x = cx;
    out.c.y = cy;
    out.c.z = cz;
    return out;
  }
  /**
   * @property {Vec3} a
   */
  ;

  /**
   * create a new triangle
   * @constructor
   * @param {number} ax
   * @param {number} ay
   * @param {number} az
   * @param {number} bx
   * @param {number} by
   * @param {number} bz
   * @param {number} cx
   * @param {number} cy
   * @param {number} cz
   */
  function triangle(ax, ay, az, bx, by, bz, cx, cy, cz) {
    this.a = void 0;
    this.b = void 0;
    this.c = void 0;
    this._type = void 0;
    this.a = new _vec["default"](ax, ay, az);
    this.b = new _vec["default"](bx, by, bz);
    this.c = new _vec["default"](cx, cy, cz);
    this._type = _enums["default"].SHAPE_TRIANGLE;
    ;
  }

  return triangle;
}();

exports["default"] = triangle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvdHJpYW5nbGUudHMiXSwibmFtZXMiOlsidHJpYW5nbGUiLCJjcmVhdGUiLCJheCIsImF5IiwiYXoiLCJieCIsImJ5IiwiYnoiLCJjeCIsImN5IiwiY3oiLCJjbG9uZSIsInQiLCJhIiwieCIsInkiLCJ6IiwiYiIsImMiLCJjb3B5Iiwib3V0IiwiVmVjMyIsImZyb21Qb2ludHMiLCJzZXQiLCJfdHlwZSIsImVudW1zIiwiU0hBUEVfVFJJQU5HTEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBQ0E7Ozs7QUExQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkE7Ozs7SUFJcUJBO0FBRWpCOzs7Ozs7Ozs7Ozs7OztXQWNjQyxTQUFkLGdCQUFzQkMsRUFBdEIsRUFBMEJDLEVBQTFCLEVBQThCQyxFQUE5QixFQUFrQ0MsRUFBbEMsRUFBc0NDLEVBQXRDLEVBQTBDQyxFQUExQyxFQUE4Q0MsRUFBOUMsRUFBa0RDLEVBQWxELEVBQXNEQyxFQUF0RCxFQUEwRDtBQUN0RCxXQUFPLElBQUlWLFFBQUosQ0FBYUUsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLEVBQXJCLEVBQXlCQyxFQUF6QixFQUE2QkMsRUFBN0IsRUFBaUNDLEVBQWpDLEVBQXFDQyxFQUFyQyxFQUF5Q0MsRUFBekMsRUFBNkNDLEVBQTdDLENBQVA7QUFDSDtBQUVEOzs7Ozs7OztXQU1jQyxRQUFkLGVBQXFCQyxDQUFyQixFQUF3QjtBQUNwQixXQUFPLElBQUlaLFFBQUosQ0FDSFksQ0FBQyxDQUFDQyxDQUFGLENBQUlDLENBREQsRUFDSUYsQ0FBQyxDQUFDQyxDQUFGLENBQUlFLENBRFIsRUFDV0gsQ0FBQyxDQUFDQyxDQUFGLENBQUlHLENBRGYsRUFFSEosQ0FBQyxDQUFDSyxDQUFGLENBQUlILENBRkQsRUFFSUYsQ0FBQyxDQUFDSyxDQUFGLENBQUlGLENBRlIsRUFFV0gsQ0FBQyxDQUFDSyxDQUFGLENB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QUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgVmVjMyBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMzJztcbmltcG9ydCBlbnVtcyBmcm9tICcuL2VudW1zJztcblxuLyoqXG4gKiBUcmlhbmdsZVxuICogQGNsYXNzIGdlb21VdGlscy5UcmlhbmdsZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0cmlhbmdsZSB7XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYSBuZXcgdHJpYW5nbGVcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBhelxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBieFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBieVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBielxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjeFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjelxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5UcmlhbmdsZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAoYXgsIGF5LCBheiwgYngsIGJ5LCBieiwgY3gsIGN5LCBjeikge1xuICAgICAgICByZXR1cm4gbmV3IHRyaWFuZ2xlKGF4LCBheSwgYXosIGJ4LCBieSwgYnosIGN4LCBjeSwgY3opO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNsb25lIGEgbmV3IHRyaWFuZ2xlXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEBwYXJhbSB7Z2VvbVV0aWxzLlRyaWFuZ2xlfSB0IHRoZSBzb3VyY2UgcGxhbmVcbiAgICAgKiBAcmV0dXJuIHtnZW9tVXRpbHMuVHJpYW5nbGV9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjbG9uZSAodCkge1xuICAgICAgICByZXR1cm4gbmV3IHRyaWFuZ2xlKFxuICAgICAgICAgICAgdC5hLngsIHQuYS55LCB0LmEueixcbiAgICAgICAgICAgIHQuYi54LCB0LmIueSwgdC5iLnosXG4gICAgICAgICAgICB0LmMueCwgdC5jLnksIHQuYy56XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY29weSB0aGUgdmFsdWVzIGZyb20gb25lIHRyaWFuZ2xlIHRvIGFub3RoZXJcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gb3V0IHRoZSByZWNlaXZpbmcgdHJpYW5nbGVcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5UcmlhbmdsZX0gdCB0aGUgc291cmNlIHRyaWFuZ2xlXG4gICAgICogQHJldHVybiB7Z2VvbVV0aWxzLlRyaWFuZ2xlfVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0LCB0KSB7XG4gICAgICAgIFZlYzMuY29weShvdXQuYSwgdC5hKTtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5iLCB0LmIpO1xuICAgICAgICBWZWMzLmNvcHkob3V0LmMsIHQuYyk7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSB0cmlhbmdsZSBmcm9tIHRocmVlIHBvaW50c1xuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xuICAgICAqIEBwYXJhbSB7Z2VvbVV0aWxzLlRyaWFuZ2xlfSBvdXQgdGhlIHJlY2VpdmluZyB0cmlhbmdsZVxuICAgICAqIEBwYXJhbSB7VmVjM30gYVxuICAgICAqIEBwYXJhbSB7VmVjM30gYlxuICAgICAqIEBwYXJhbSB7VmVjM30gY1xuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5UcmlhbmdsZX1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZyb21Qb2ludHMgKG91dCwgYSwgYiwgYykge1xuICAgICAgICBWZWMzLmNvcHkob3V0LmEsIGEpO1xuICAgICAgICBWZWMzLmNvcHkob3V0LmIsIGIpO1xuICAgICAgICBWZWMzLmNvcHkob3V0LmMsIGMpO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHRyaWFuZ2xlIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuVHJpYW5nbGV9IG91dCB0aGUgcmVjZWl2aW5nIHBsYW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGF4IFggY29tcG9uZW50IG9mIGFcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXkgWSBjb21wb25lbnQgb2YgYVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBheiBaIGNvbXBvbmVudCBvZiBhXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGJ4IFggY29tcG9uZW50IG9mIGJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnkgWSBjb21wb25lbnQgb2YgYlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBieiBaIGNvbXBvbmVudCBvZiBiXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN4IFggY29tcG9uZW50IG9mIGNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3kgWSBjb21wb25lbnQgb2YgY1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjeiBaIGNvbXBvbmVudCBvZiBjXG4gICAgICogQHJldHVybiB7UGxhbmV9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKG91dCwgYXgsIGF5LCBheiwgYngsIGJ5LCBieiwgY3gsIGN5LCBjeikge1xuICAgICAgICBvdXQuYS54ID0gYXg7XG4gICAgICAgIG91dC5hLnkgPSBheTtcbiAgICAgICAgb3V0LmEueiA9IGF6O1xuXG4gICAgICAgIG91dC5iLnggPSBieDtcbiAgICAgICAgb3V0LmIueSA9IGJ5O1xuICAgICAgICBvdXQuYi56ID0gYno7XG5cbiAgICAgICAgb3V0LmMueCA9IGN4O1xuICAgICAgICBvdXQuYy55ID0gY3k7XG4gICAgICAgIG91dC5jLnogPSBjejtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gYVxuICAgICAqL1xuICAgIGE6IFZlYzM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBiXG4gICAgICovXG4gICAgYjogVmVjMztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNcbiAgICAgKi9cbiAgICBjOiBWZWMzO1xuXG4gICAgLyoqXG4gICAgICogZ2VvbWV0cnkgdHlwZVxuICAgICAqL1xuICAgIF90eXBlOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYSBuZXcgdHJpYW5nbGVcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYXpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gYnpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3hcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3lcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY3pcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYXg6IG51bWJlciwgYXk6IG51bWJlciwgYXo6IG51bWJlciwgYng6IG51bWJlciwgYnk6IG51bWJlciwgYno6IG51bWJlciwgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlcikge1xuICAgICAgICB0aGlzLmEgPSBuZXcgVmVjMyhheCwgYXksIGF6KTtcbiAgICAgICAgdGhpcy5iID0gbmV3IFZlYzMoYngsIGJ5LCBieik7XG4gICAgICAgIHRoaXMuYyA9IG5ldyBWZWMzKGN4LCBjeSwgY3opO1xuICAgICAgICB0aGlzLl90eXBlID0gZW51bXMuU0hBUEVfVFJJQU5HTEU7O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9