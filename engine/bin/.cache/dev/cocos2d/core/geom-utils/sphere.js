
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/sphere.js';
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
var _v3_tmp = new _valueTypes.Vec3();
/**
 * !#en
 * Sphere.
 * !#zh
 * 轴对齐球。
 * @class geomUtils.Sphere
 */


var sphere = /*#__PURE__*/function () {
  /**
   * !#en
   * create a new sphere
   * !#zh
   * 创建一个新的 sphere 实例。
   * @method create
   * @param cx X coordinates of the shape relative to the origin.
   * @param cy Y coordinates of the shape relative to the origin.
   * @param cz Z coordinates of the shape relative to the origin.
   * @param r Radius of sphere
   * @return {Sphere} Returns a sphere.
   */
  sphere.create = function create(cx, cy, cz, r) {
    return new sphere(cx, cy, cz, r);
  }
  /**
   * !#en
   * clone a new sphere
   * !#zh
   * 克隆一个新的 sphere 实例。
   * @method clone
   * @param {Sphere} p The target of cloning.
   * @return {Sphere} The cloned instance.
   */
  ;

  sphere.clone = function clone(p) {
    return new sphere(p.center.x, p.center.y, p.center.z, p.radius);
  }
  /**
   * !#en
   * copy the values from one sphere to another
   * !#zh
   * 将从一个 sphere 的值复制到另一个 sphere。
   * @method copy
   * @param {Sphere} out Accept the sphere of operations.
   * @param {Sphere} a Sphere being copied.
   * @return {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.copy = function copy(out, p) {
    _valueTypes.Vec3.copy(out.center, p.center);

    out.radius = p.radius;
    return out;
  }
  /**
   * !#en
   * create a new bounding sphere from two corner points
   * !#zh
   * 从两个点创建一个新的 sphere。
   * @method fromPoints
   * @param out - Accept the sphere of operations.
   * @param minPos - The smallest point of sphere.
   * @param maxPos - The maximum point of sphere.
   * @returns {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.fromPoints = function fromPoints(out, minPos, maxPos) {
    _valueTypes.Vec3.multiplyScalar(out.center, _valueTypes.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);

    out.radius = _valueTypes.Vec3.subtract(_v3_tmp, maxPos, minPos).len() * 0.5;
    return out;
  }
  /**
   * !#en Set the components of a sphere to the given values
   * !#zh 将球体的属性设置为给定的值。
   * @method set
   * @param {Sphere} out Accept the sphere of operations.
   * @param cx X coordinates of the shape relative to the origin.
   * @param cy Y coordinates of the shape relative to the origin.
   * @param cz Z coordinates of the shape relative to the origin.
   * @param {number} r Radius.
   * @return {Sphere} out Accept the sphere of operations.
   */
  ;

  sphere.set = function set(out, cx, cy, cz, r) {
    out.center.x = cx;
    out.center.y = cy;
    out.center.z = cz;
    out.radius = r;
    return out;
  }
  /**
   * !#en
   * The center of the local coordinate.
   * !#zh
   * 本地坐标的中心点。
   * @property {Vec3} center
   */
  ;

  /**
   * !#en
   * Construct a sphere.
   * !#zh
   * 构造一个球。
   * @constructor
   * @param cx The x-coordinate of the sphere's world coordinates.
   * @param cy The y-coordinate of the sphere's world coordinates.
   * @param cz The z-coordinate of the sphere's world coordinates.
   * @param {number} r Radius.
   */
  function sphere(cx, cy, cz, r) {
    if (cx === void 0) {
      cx = 0;
    }

    if (cy === void 0) {
      cy = 0;
    }

    if (cz === void 0) {
      cz = 0;
    }

    if (r === void 0) {
      r = 1;
    }

    this.center = void 0;
    this.radius = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_SPHERE;
    this.center = new _valueTypes.Vec3(cx, cy, cz);
    this.radius = r;
  }
  /**
   * !#en
   * Clone.
   * !#zh
   * 获得克隆。
   * @method clone
   */


  var _proto = sphere.prototype;

  _proto.clone = function clone() {
    return sphere.clone(this);
  }
  /**
   * !#en
   * Copy sphere
   * !#zh
   * 拷贝对象。
   * @method copy
   * @param a Copy target.
   */
  ;

  _proto.copy = function copy(a) {
    return sphere.copy(this, a);
  }
  /**
   * !#en
   * Get the bounding points of this shape
   * !#zh
   * 获取此形状的边界点。
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */
  ;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    _valueTypes.Vec3.set(minPos, this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius);

    _valueTypes.Vec3.set(maxPos, this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius);
  }
  /**
   * !#en
   * Transform this shape
   * !#zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @method transform
   * @param m The transformation matrix.
   * @param pos The position part of the transformation.
   * @param rot The rotating part of the transformation.
   * @param scale The scaling part of the transformation.
   * @param out The target of the transformation.
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m);

    out.radius = this.radius * scale.maxAxis();
  }
  /**
   * !#zh
   * 将 out 根据这个 sphere 的数据进行变换。
   * @translateAndRotate
   * @param m The transformation matrix.
   * @param rot The rotating part of the transformation.
   * @param out The target of the transformation.
   */
  ;

  _proto.translateAndRotate = function translateAndRotate(m, rot, out) {
    _valueTypes.Vec3.transformMat4(out.center, this.center, m);
  }
  /**
   * !#en
   * Scale out based on the sphere data.
   * !#zh
   * 将 out 根据这个 sphere 的数据进行缩放。
   * @method setScale
   * @param scale Scale value
   * @param out Scale target
   */
  ;

  _proto.setScale = function setScale(scale, out) {
    out.radius = this.radius * scale.maxAxis();
  };

  return sphere;
}();

exports["default"] = sphere;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvc3BoZXJlLnRzIl0sIm5hbWVzIjpbIl92M190bXAiLCJWZWMzIiwic3BoZXJlIiwiY3JlYXRlIiwiY3giLCJjeSIsImN6IiwiciIsImNsb25lIiwicCIsImNlbnRlciIsIngiLCJ5IiwieiIsInJhZGl1cyIsImNvcHkiLCJvdXQiLCJmcm9tUG9pbnRzIiwibWluUG9zIiwibWF4UG9zIiwibXVsdGlwbHlTY2FsYXIiLCJhZGQiLCJzdWJ0cmFjdCIsImxlbiIsInNldCIsIl90eXBlIiwiZW51bXMiLCJTSEFQRV9TUEhFUkUiLCJhIiwiZ2V0Qm91bmRhcnkiLCJ0cmFuc2Zvcm0iLCJtIiwicG9zIiwicm90Iiwic2NhbGUiLCJ0cmFuc2Zvcm1NYXQ0IiwibWF4QXhpcyIsInRyYW5zbGF0ZUFuZFJvdGF0ZSIsInNldFNjYWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOzs7O0FBMUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsSUFBTUEsT0FBTyxHQUFHLElBQUlDLGdCQUFKLEVBQWhCO0FBRUE7Ozs7Ozs7OztJQU9xQkM7QUFFakI7Ozs7Ozs7Ozs7OztTQVljQyxTQUFkLGdCQUFzQkMsRUFBdEIsRUFBa0NDLEVBQWxDLEVBQThDQyxFQUE5QyxFQUEwREMsQ0FBMUQsRUFBNkU7QUFDekUsV0FBTyxJQUFJTCxNQUFKLENBQVdFLEVBQVgsRUFBZUMsRUFBZixFQUFtQkMsRUFBbkIsRUFBdUJDLENBQXZCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7OztTQVNjQyxRQUFkLGVBQXFCQyxDQUFyQixFQUF3QztBQUNwQyxXQUFPLElBQUlQLE1BQUosQ0FBV08sQ0FBQyxDQUFDQyxNQUFGLENBQVNDLENBQXBCLEVBQXVCRixDQUFDLENBQUNDLE1BQUYsQ0FBU0UsQ0FBaEMsRUFBbUNILENBQUMsQ0FBQ0MsTUFBRixDQUFTRyxDQUE1QyxFQUErQ0osQ0FBQyxDQUFDSyxN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aUIsS0FBS1QsTUFBTCxDQUFZQyxDQUFaLEdBQWdCLEtBQUtHLE1BQXRDLEVBQThDLEtBQUtKLE1BQUwsQ0FBWUUsQ0FBWixHQUFnQixLQUFLRSxNQUFuRSxFQUEyRSxLQUFLSixNQUFMLENBQVlHLENBQVosR0FBZ0IsS0FBS0MsTUFBaEc7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7OztTQVlPZ0IsWUFBUCxtQkFBa0JDLENBQWxCLEVBQTJCQyxHQUEzQixFQUFzQ0MsR0FBdEMsRUFBaURDLEtBQWpELEVBQThEbEIsR0FBOUQsRUFBMkU7QUFDdkVmLHFCQUFLa0MsYUFBTCxDQUFtQm5CLEdBQUcsQ0FBQ04sTUFBdkIsRUFBK0IsS0FBS0EsTUFBcEMsRUFBNENxQixDQUE1Qzs7QUFDQWYsSUFBQUEsR0FBRyxDQUFDRixNQUFKLEdBQWEsS0FBS0EsTUFBTCxHQUFjb0IsS0FBSyxDQUFDRSxPQUFOLEVBQTNCO0FBQ0g7QUFFRDs7Ozs7Ozs7OztTQVFPQyxxQkFBUCw0QkFBMkJOLENBQTNCLEVBQW9DRSxHQUFwQyxFQUErQ2pCLEdBQS9DLEVBQTJEO0FBQ3ZEZixxQkFBS2tDLGFBQUwsQ0FBbUJuQixHQUFHLENBQUNOLE1BQXZCLEVBQStCLEtBQUtBLE1BQXBDLEVBQTRDcUIsQ0FBNUM7QUFDSDtBQUVEOzs7Ozs7Ozs7OztTQVNPTyxXQUFQLGtCQUFpQkosS0FBakIsRUFBOEJsQixHQUE5QixFQUEyQztBQUN2Q0EsSUFBQUEsR0FBRyxDQUFDRixNQUFKLEdBQWEsS0FBS0EsTUFBTCxHQUFjb0IsS0FBSyxDQUFDRSxPQUFOLEVBQTNCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IHsgTWF0NCwgUXVhdCwgVmVjMyB9IGZyb20gJy4uL3ZhbHVlLXR5cGVzJztcbmltcG9ydCBlbnVtcyBmcm9tICcuL2VudW1zJztcblxuY29uc3QgX3YzX3RtcCA9IG5ldyBWZWMzKCk7XG5cbi8qKlxuICogISNlblxuICogU3BoZXJlLlxuICogISN6aFxuICog6L205a+56b2Q55CD44CCXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLlNwaGVyZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzcGhlcmUge1xuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNyZWF0ZSBhIG5ldyBzcGhlcmVcbiAgICAgKiAhI3poXG4gICAgICog5Yib5bu65LiA5Liq5paw55qEIHNwaGVyZSDlrp7kvovjgIJcbiAgICAgKiBAbWV0aG9kIGNyZWF0ZVxuICAgICAqIEBwYXJhbSBjeCBYIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSBjeSBZIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSBjeiBaIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSByIFJhZGl1cyBvZiBzcGhlcmVcbiAgICAgKiBAcmV0dXJuIHtTcGhlcmV9IFJldHVybnMgYSBzcGhlcmUuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGUgKGN4OiBudW1iZXIsIGN5OiBudW1iZXIsIGN6OiBudW1iZXIsIHI6IG51bWJlcik6IHNwaGVyZSB7XG4gICAgICAgIHJldHVybiBuZXcgc3BoZXJlKGN4LCBjeSwgY3osIHIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBjbG9uZSBhIG5ldyBzcGhlcmVcbiAgICAgKiAhI3poXG4gICAgICog5YWL6ZqG5LiA5Liq5paw55qEIHNwaGVyZSDlrp7kvovjgIJcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICogQHBhcmFtIHtTcGhlcmV9IHAgVGhlIHRhcmdldCBvZiBjbG9uaW5nLlxuICAgICAqIEByZXR1cm4ge1NwaGVyZX0gVGhlIGNsb25lZCBpbnN0YW5jZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNsb25lIChwOiBzcGhlcmUpOiBzcGhlcmUge1xuICAgICAgICByZXR1cm4gbmV3IHNwaGVyZShwLmNlbnRlci54LCBwLmNlbnRlci55LCBwLmNlbnRlci56LCBwLnJhZGl1cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIGNvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBzcGhlcmUgdG8gYW5vdGhlclxuICAgICAqICEjemhcbiAgICAgKiDlsIbku47kuIDkuKogc3BoZXJlIOeahOWAvOWkjeWItuWIsOWPpuS4gOS4qiBzcGhlcmXjgIJcbiAgICAgKiBAbWV0aG9kIGNvcHlcbiAgICAgKiBAcGFyYW0ge1NwaGVyZX0gb3V0IEFjY2VwdCB0aGUgc3BoZXJlIG9mIG9wZXJhdGlvbnMuXG4gICAgICogQHBhcmFtIHtTcGhlcmV9IGEgU3BoZXJlIGJlaW5nIGNvcGllZC5cbiAgICAgKiBAcmV0dXJuIHtTcGhlcmV9IG91dCBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY29weSAob3V0OiBzcGhlcmUsIHA6IHNwaGVyZSk6IHNwaGVyZSB7XG4gICAgICAgIFZlYzMuY29weShvdXQuY2VudGVyLCBwLmNlbnRlcik7XG4gICAgICAgIG91dC5yYWRpdXMgPSBwLnJhZGl1cztcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBjcmVhdGUgYSBuZXcgYm91bmRpbmcgc3BoZXJlIGZyb20gdHdvIGNvcm5lciBwb2ludHNcbiAgICAgKiAhI3poXG4gICAgICog5LuO5Lik5Liq54K55Yib5bu65LiA5Liq5paw55qEIHNwaGVyZeOAglxuICAgICAqIEBtZXRob2QgZnJvbVBvaW50c1xuICAgICAqIEBwYXJhbSBvdXQgLSBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxuICAgICAqIEBwYXJhbSBtaW5Qb3MgLSBUaGUgc21hbGxlc3QgcG9pbnQgb2Ygc3BoZXJlLlxuICAgICAqIEBwYXJhbSBtYXhQb3MgLSBUaGUgbWF4aW11bSBwb2ludCBvZiBzcGhlcmUuXG4gICAgICogQHJldHVybnMge1NwaGVyZX0gb3V0IEFjY2VwdCB0aGUgc3BoZXJlIG9mIG9wZXJhdGlvbnMuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmcm9tUG9pbnRzIChvdXQ6IHNwaGVyZSwgbWluUG9zOiBWZWMzLCBtYXhQb3M6IFZlYzMpOiBzcGhlcmUge1xuICAgICAgICBWZWMzLm11bHRpcGx5U2NhbGFyKG91dC5jZW50ZXIsIFZlYzMuYWRkKF92M190bXAsIG1pblBvcywgbWF4UG9zKSwgMC41KTtcbiAgICAgICAgb3V0LnJhZGl1cyA9IFZlYzMuc3VidHJhY3QoX3YzX3RtcCwgbWF4UG9zLCBtaW5Qb3MpLmxlbigpICogMC41O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgc3BoZXJlIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICAgKiAhI3poIOWwhueQg+S9k+eahOWxnuaAp+iuvue9ruS4uue7meWumueahOWAvOOAglxuICAgICAqIEBtZXRob2Qgc2V0XG4gICAgICogQHBhcmFtIHtTcGhlcmV9IG91dCBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxuICAgICAqIEBwYXJhbSBjeCBYIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSBjeSBZIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSBjeiBaIGNvb3JkaW5hdGVzIG9mIHRoZSBzaGFwZSByZWxhdGl2ZSB0byB0aGUgb3JpZ2luLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByIFJhZGl1cy5cbiAgICAgKiBAcmV0dXJuIHtTcGhlcmV9IG91dCBBY2NlcHQgdGhlIHNwaGVyZSBvZiBvcGVyYXRpb25zLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0IChvdXQ6IHNwaGVyZSwgY3g6IG51bWJlciwgY3k6IG51bWJlciwgY3o6IG51bWJlciwgcjogbnVtYmVyKTogc3BoZXJlIHtcbiAgICAgICAgb3V0LmNlbnRlci54ID0gY3g7XG4gICAgICAgIG91dC5jZW50ZXIueSA9IGN5O1xuICAgICAgICBvdXQuY2VudGVyLnogPSBjejtcbiAgICAgICAgb3V0LnJhZGl1cyA9IHI7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGNlbnRlciBvZiB0aGUgbG9jYWwgY29vcmRpbmF0ZS5cbiAgICAgKiAhI3poXG4gICAgICog5pys5Zyw5Z2Q5qCH55qE5Lit5b+D54K544CCXG4gICAgICogQHByb3BlcnR5IHtWZWMzfSBjZW50ZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgY2VudGVyOiBWZWMzO1xuXG4gICAgLyoqXG4gICAgICogISN6aFxuICAgICAqIOWNiuW+hOOAglxuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByYWRpdXNcbiAgICAgKi9cbiAgICBwdWJsaWMgcmFkaXVzOiBudW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgX3R5cGU6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb25zdHJ1Y3QgYSBzcGhlcmUuXG4gICAgICogISN6aFxuICAgICAqIOaehOmAoOS4gOS4queQg+OAglxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSBjeCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSBzcGhlcmUncyB3b3JsZCBjb29yZGluYXRlcy5cbiAgICAgKiBAcGFyYW0gY3kgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgc3BoZXJlJ3Mgd29ybGQgY29vcmRpbmF0ZXMuXG4gICAgICogQHBhcmFtIGN6IFRoZSB6LWNvb3JkaW5hdGUgb2YgdGhlIHNwaGVyZSdzIHdvcmxkIGNvb3JkaW5hdGVzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByIFJhZGl1cy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoY3g6IG51bWJlciA9IDAsIGN5OiBudW1iZXIgPSAwLCBjejogbnVtYmVyID0gMCwgcjogbnVtYmVyID0gMSkge1xuICAgICAgICB0aGlzLl90eXBlID0gZW51bXMuU0hBUEVfU1BIRVJFO1xuICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWMzKGN4LCBjeSwgY3opO1xuICAgICAgICB0aGlzLnJhZGl1cyA9IHI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENsb25lLlxuICAgICAqICEjemhcbiAgICAgKiDojrflvpflhYvpmobjgIJcbiAgICAgKiBAbWV0aG9kIGNsb25lXG4gICAgICovXG4gICAgcHVibGljIGNsb25lICgpIHtcbiAgICAgICAgcmV0dXJuIHNwaGVyZS5jbG9uZSh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ29weSBzcGhlcmVcbiAgICAgKiAhI3poXG4gICAgICog5ou36LSd5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHBhcmFtIGEgQ29weSB0YXJnZXQuXG4gICAgICovXG4gICAgcHVibGljIGNvcHkgKGE6IHNwaGVyZSkge1xuICAgICAgICByZXR1cm4gc3BoZXJlLmNvcHkodGhpcywgYSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgYm91bmRpbmcgcG9pbnRzIG9mIHRoaXMgc2hhcGVcbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W5q2k5b2i54q255qE6L6555WM54K544CCXG4gICAgICogQG1ldGhvZCBnZXRCb3VuZGFyeVxuICAgICAqIEBwYXJhbSB7VmVjM30gbWluUG9zXG4gICAgICogQHBhcmFtIHtWZWMzfSBtYXhQb3NcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0Qm91bmRhcnkgKG1pblBvczogVmVjMywgbWF4UG9zOiBWZWMzKSB7XG4gICAgICAgIFZlYzMuc2V0KG1pblBvcywgdGhpcy5jZW50ZXIueCAtIHRoaXMucmFkaXVzLCB0aGlzLmNlbnRlci55IC0gdGhpcy5yYWRpdXMsIHRoaXMuY2VudGVyLnogLSB0aGlzLnJhZGl1cyk7XG4gICAgICAgIFZlYzMuc2V0KG1heFBvcywgdGhpcy5jZW50ZXIueCArIHRoaXMucmFkaXVzLCB0aGlzLmNlbnRlci55ICsgdGhpcy5yYWRpdXMsIHRoaXMuY2VudGVyLnogKyB0aGlzLnJhZGl1cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRyYW5zZm9ybSB0aGlzIHNoYXBlXG4gICAgICogISN6aFxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIHNwaGVyZSDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcbiAgICAgKiBAbWV0aG9kIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSBtIFRoZSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXguXG4gICAgICogQHBhcmFtIHBvcyBUaGUgcG9zaXRpb24gcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHJvdCBUaGUgcm90YXRpbmcgcGFydCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXG4gICAgICogQHBhcmFtIHNjYWxlIFRoZSBzY2FsaW5nIHBhcnQgb2YgdGhlIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSBvdXQgVGhlIHRhcmdldCBvZiB0aGUgdHJhbnNmb3JtYXRpb24uXG4gICAgICovXG4gICAgcHVibGljIHRyYW5zZm9ybSAobTogTWF0NCwgcG9zOiBWZWMzLCByb3Q6IFF1YXQsIHNjYWxlOiBWZWMzLCBvdXQ6IHNwaGVyZSkge1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LmNlbnRlciwgdGhpcy5jZW50ZXIsIG0pO1xuICAgICAgICBvdXQucmFkaXVzID0gdGhpcy5yYWRpdXMgKiBzY2FsZS5tYXhBeGlzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISN6aFxuICAgICAqIOWwhiBvdXQg5qC55o2u6L+Z5LiqIHNwaGVyZSDnmoTmlbDmja7ov5vooYzlj5jmjaLjgIJcbiAgICAgKiBAdHJhbnNsYXRlQW5kUm90YXRlXG4gICAgICogQHBhcmFtIG0gVGhlIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC5cbiAgICAgKiBAcGFyYW0gcm90IFRoZSByb3RhdGluZyBwYXJ0IG9mIHRoZSB0cmFuc2Zvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0gb3V0IFRoZSB0YXJnZXQgb2YgdGhlIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIHB1YmxpYyB0cmFuc2xhdGVBbmRSb3RhdGUgKG06IE1hdDQsIHJvdDogUXVhdCwgb3V0OiBzcGhlcmUpe1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LmNlbnRlciwgdGhpcy5jZW50ZXIsIG0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTY2FsZSBvdXQgYmFzZWQgb24gdGhlIHNwaGVyZSBkYXRhLlxuICAgICAqICEjemhcbiAgICAgKiDlsIYgb3V0IOagueaNrui/meS4qiBzcGhlcmUg55qE5pWw5o2u6L+b6KGM57yp5pS+44CCXG4gICAgICogQG1ldGhvZCBzZXRTY2FsZVxuICAgICAqIEBwYXJhbSBzY2FsZSBTY2FsZSB2YWx1ZVxuICAgICAqIEBwYXJhbSBvdXQgU2NhbGUgdGFyZ2V0XG4gICAgICovXG4gICAgcHVibGljIHNldFNjYWxlIChzY2FsZTogVmVjMywgb3V0OiBzcGhlcmUpIHtcbiAgICAgICAgb3V0LnJhZGl1cyA9IHRoaXMucmFkaXVzICogc2NhbGUubWF4QXhpcygpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9