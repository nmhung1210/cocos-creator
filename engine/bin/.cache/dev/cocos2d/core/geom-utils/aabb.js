
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/aabb.js';
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

var _mat = _interopRequireDefault(require("../value-types/mat3"));

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
var _v3_tmp = new _vec["default"]();

var _v3_tmp2 = new _vec["default"]();

var _m3_tmp = new _mat["default"](); // https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/


var transform_extent_m4 = function transform_extent_m4(out, extent, m4) {
  var _m3_tmpm = _m3_tmp.m,
      m4m = m4.m;
  _m3_tmpm[0] = Math.abs(m4m[0]);
  _m3_tmpm[1] = Math.abs(m4m[1]);
  _m3_tmpm[2] = Math.abs(m4m[2]);
  _m3_tmpm[3] = Math.abs(m4m[4]);
  _m3_tmpm[4] = Math.abs(m4m[5]);
  _m3_tmpm[5] = Math.abs(m4m[6]);
  _m3_tmpm[6] = Math.abs(m4m[8]);
  _m3_tmpm[7] = Math.abs(m4m[9]);
  _m3_tmpm[8] = Math.abs(m4m[10]);

  _vec["default"].transformMat3(out, extent, _m3_tmp);
};
/**
 * Aabb
 * @class geomUtils.Aabb
 */


var aabb = /*#__PURE__*/function () {
  /**
   * create a new aabb
   * @method create
   * @param {number} px X coordinates for aabb's original point
   * @param {number} py Y coordinates for aabb's original point
   * @param {number} pz Z coordinates for aabb's original point
   * @param {number} w the half of aabb width
   * @param {number} h the half of aabb height
   * @param {number} l the half of aabb length
   * @return {geomUtils.Aabb}
   */
  aabb.create = function create(px, py, pz, w, h, l) {
    return new aabb(px, py, pz, w, h, l);
  }
  /**
   * clone a new aabb
   * @method clone
   * @param {geomUtils.Aabb} a the source aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.clone = function clone(a) {
    return new aabb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z);
  }
  /**
   * copy the values from one aabb to another
   * @method copy
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {geomUtils.Aabb} a the source aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.copy = function copy(out, a) {
    _vec["default"].copy(out.center, a.center);

    _vec["default"].copy(out.halfExtents, a.halfExtents);

    return out;
  }
  /**
   * create a new aabb from two corner points
   * @method fromPoints
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {Vec3} minPos lower corner position of the aabb
   * @param {Vec3} maxPos upper corner position of the aabb
   * @return {geomUtils.Aabb}
   */
  ;

  aabb.fromPoints = function fromPoints(out, minPos, maxPos) {
    _vec["default"].scale(out.center, _vec["default"].add(_v3_tmp, minPos, maxPos), 0.5);

    _vec["default"].scale(out.halfExtents, _vec["default"].sub(_v3_tmp2, maxPos, minPos), 0.5);

    return out;
  }
  /**
   * Set the components of a aabb to the given values
   * @method set
   * @param {geomUtils.Aabb} out the receiving aabb
   * @param {number} px X coordinates for aabb's original point
   * @param {number} py Y coordinates for aabb's original point
   * @param {number} pz Z coordinates for aabb's original point
   * @param {number} w the half of aabb width
   * @param {number} h the half of aabb height
   * @param {number} l the half of aabb length
   * @return {geomUtils.Aabb} out
   */
  ;

  aabb.set = function set(out, px, py, pz, w, h, l) {
    _vec["default"].set(out.center, px, py, pz);

    _vec["default"].set(out.halfExtents, w, h, l);

    return out;
  }
  /**
   * @property {Vec3} center
   */
  ;

  function aabb(px, py, pz, w, h, l) {
    this.center = void 0;
    this.halfExtents = void 0;
    this._type = void 0;
    this._type = _enums["default"].SHAPE_AABB;
    this.center = new _vec["default"](px, py, pz);
    this.halfExtents = new _vec["default"](w, h, l);
  }
  /**
   * Get the bounding points of this shape
   * @method getBoundary
   * @param {Vec3} minPos
   * @param {Vec3} maxPos
   */


  var _proto = aabb.prototype;

  _proto.getBoundary = function getBoundary(minPos, maxPos) {
    _vec["default"].sub(minPos, this.center, this.halfExtents);

    _vec["default"].add(maxPos, this.center, this.halfExtents);
  }
  /**
   * Transform this shape
   * @method transform
   * @param {Mat4} m the transform matrix
   * @param {Vec3} pos the position part of the transform
   * @param {Quat} rot the rotation part of the transform
   * @param {Vec3} scale the scale part of the transform
   * @param {geomUtils.Aabb} [out] the target shape
   */
  ;

  _proto.transform = function transform(m, pos, rot, scale, out) {
    if (!out) out = this;

    _vec["default"].transformMat4(out.center, this.center, m);

    transform_extent_m4(out.halfExtents, this.halfExtents, m);
  };

  return aabb;
}();

exports["default"] = aabb;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvYWFiYi50cyJdLCJuYW1lcyI6WyJfdjNfdG1wIiwiVmVjMyIsIl92M190bXAyIiwiX20zX3RtcCIsIk1hdDMiLCJ0cmFuc2Zvcm1fZXh0ZW50X200Iiwib3V0IiwiZXh0ZW50IiwibTQiLCJfbTNfdG1wbSIsIm0iLCJtNG0iLCJNYXRoIiwiYWJzIiwidHJhbnNmb3JtTWF0MyIsImFhYmIiLCJjcmVhdGUiLCJweCIsInB5IiwicHoiLCJ3IiwiaCIsImwiLCJjbG9uZSIsImEiLCJjZW50ZXIiLCJ4IiwieSIsInoiLCJoYWxmRXh0ZW50cyIsImNvcHkiLCJmcm9tUG9pbnRzIiwibWluUG9zIiwibWF4UG9zIiwic2NhbGUiLCJhZGQiLCJzdWIiLCJzZXQiLCJfdHlwZSIsImVudW1zIiwiU0hBUEVfQUFCQiIsImdldEJvdW5kYXJ5IiwidHJhbnNmb3JtIiwicG9zIiwicm90IiwidHJhbnNmb3JtTWF0NCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFDQTs7QUFDQTs7OztBQTNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLElBQUlBLE9BQU8sR0FBRyxJQUFJQyxlQUFKLEVBQWQ7O0FBQ0EsSUFBSUMsUUFBUSxHQUFHLElBQUlELGVBQUosRUFBZjs7QUFDQSxJQUFJRSxPQUFPLEdBQUcsSUFBSUMsZUFBSixFQUFkLEVBRUE7OztBQUNBLElBQUlDLG1CQUFtQixHQUFHLFNBQXRCQSxtQkFBc0IsQ0FBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCQyxFQUF2QixFQUEyQjtBQUNqRCxNQUFJQyxRQUFRLEdBQUdOLE9BQU8sQ0FBQ08sQ0FBdkI7QUFBQSxNQUEwQkMsR0FBRyxHQUFHSCxFQUFFLENBQUNFLENBQW5DO0FBQ0FELEVBQUFBLFFBQVEsQ0FBQyxDQUFELENBQVIsR0FBY0csSUFBSSxDQUFDQyxHQUFMLENBQVNGLEdBQUcsQ0FBQyxDQUFELENBQVosQ0FBZDtBQUFnQ0YsRUFBQUEsUUFBUSxDQUFDLENBQUQsQ0FBUixHQUFjRyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsR0FBRyxDQUFDLENBQUQsQ0FBWixDQUFkO0FBQWdDRixFQUFBQSxRQUFRLENBQUMsQ0FBRCxDQUFSLEdBQWNHLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixHQUFHLENBQUMsQ0FBRCxDQUFaLENBQWQ7QUFDaEVGLEVBQUFBLFFBQVEsQ0FBQyxDQUFELENBQVIsR0FBY0csSUFBSSxDQUFDQyxHQUFMLENBQVNGLEdBQUcsQ0FBQyxDQUFELENBQVosQ0FBZDtBQUFnQ0YsRUFBQUEsUUFBUSxDQUFDLENBQUQsQ0FBUixHQUFjRyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsR0FBRyxDQUFDLENBQUQsQ0FBWixDQUFkO0FBQWdDRixFQUFBQSxRQUFRLENBQUMsQ0FBRCxDQUFSLEdBQWNHLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixHQUFHLENBQUMsQ0FBRCxDQUFaLENBQWQ7QUFDaEVGLEVBQUFBLFFBQVEsQ0FBQyxDQUFELENBQVIsR0FBY0csSUFBSSxDQUFDQyxHQUFMLENBQVNGLEdBQUcsQ0FBQyxDQUFELENBQVosQ0FBZDtBQUFnQ0YsRUFBQUEsUUFBUSxDQUFDLENBQUQsQ0FBUixHQUFjRyxJQUFJLENBQUNDLEdBQUwsQ0FBU0YsR0FBRyxDQUFDLENBQUQsQ0FBWixDQUFkO0FBQWdDRixFQUFBQSxRQUFRLENBQUMsQ0FBRCxDQUFSLEdBQWNHLElBQUksQ0FBQ0MsR0FBTCxDQUFTRixHQUFHLENBQUMsRUFBRCxDQUFaLENBQWQ7O0FBQ2hFVixrQkFBS2EsYUFBTCxDQUFtQlIsR0FBbkIsRUFBd0JDLE1BQXhCLEVBQWdDSixPQUFoQztBQUNILENBTkQ7QUFRQTs7Ozs7O0lBSXFCWTtBQUVqQjs7Ozs7Ozs7Ozs7T0FXY0MsU0FBZCxnQkFBc0JDLEVBQXRCLEVBQTBCQyxFQUExQixFQUE4QkMsRUFBOUIsRUFBa0NDLENBQWxDLEVBQXFDQyxDQUFyQyxFQUF3Q0MsQ0FBeEMsRUFBMkM7QUFDdkMsV0FBTyxJQUFJUCxJQUFKLENBQVNFLEVBQVQsRUFBYUMsRUFBYixFQUFpQkMsRUFBakIsRUFBcUJDLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQkMsQ0FBM0IsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O09BTWNDLFFBQWQsZUFBcUJDLENBQXJCLEVBQXdCO0FBQ3BCLFdBQU8sSUFBSVQsSUFBSixDQUFTUyxDQUFDLENBQUNDLE1BQUYsQ0FBU0MsQ0FBbEIsRUFBcUJGLENBQUMsQ0FBQ0MsTUFBRixDQUFTRSxDQUE5QixFQUFpQ0gsQ0FBQyxDQUFDQyxNQUFGLENBQVNHLENBQTFDLEVBQ0hKLENBQUMsQ0FBQ0ssV0FBRixDQUFjSCxDQURYLEVBQ2NGLENBQUMsQ0FBQ0ssV0FBRixDQUFjRixDQUQ1QixFQUMrQkgsQ0FBQyxDQUFDSyxXQUFGLENBQWNELENBRDdDLENBQVA7QUFFSDtBQUVEOzs7Ozs7Ozs7T0FPY0UsT0FBZCxjQUFvQnhCLEdBQXBCLEVBQXlCa0IsQ0FBekIsRUFBNEI7QUFDeEJ2QixvQkFBSzZCLElBQUwsQ0FBVXhCLEdBQUcsQ0FBQ21CLE1BQWQsRUFBc0JELENBQUMsQ0FBQ0MsTUFBeEI7O0FBQ0F4QixvQkFBSzZCLElBQUwsQ0FBVXhCLEdBQUcsQ0FBQ3VCLFdBQWQsRUFBMkJMLENBQUMsQ0FBQ0ssV0FBN0I7O0FBRUEsV0FBT3ZCLEdBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O09BUWN5QixhQUFkLG9CQUEwQnpCLEdBQTFCLEVBQStCMEIsTUFBL0IsRUFBdUNDLE1BQXZDLEVBQStDO0FBQzNDaEMsb0JBQUtpQyxLQUFMLENBQVc1QixHQUFHLENBQUNtQixNQUFmLEVBQXVCeEIsZ0JBQUtrQyxHQUFMLENBQVNuQyxPQUFULEVBQWtCZ0MsTUFBbEIsRUFBMEJDLE1BQTFCLENBQXZCLEVBQTBELEdBQTFEOztBQUNBaEMsb0JBQUtpQyxLQUFMLENBQVc1QixHQUFHLENBQUN1QixXQUFmLEVBQTRCNUIsZ0JBQUttQyxHQUFMLENBQVNsQyxRQUFULEVBQW1CK0IsTUFBbkIsRUFBMkJELE1BQTNCLENBQTVCLEVBQWdFLEdBQWhFOztBQUNBLFdBQU8xQixHQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FZYytCLE1BQWQsYUFBbUIvQixHQUFuQixFQUF3QlcsRUFBeEIsRUFBNEJDLEVBQTVCLEVBQWdDQyxFQUFoQyxFQUFvQ0MsQ0FBcEMsRUFBdUNDLENBQXZDLEVBQTBDQyxDQUExQyxFQUE2QztBQUN6Q3JCLG9CQUFLb0MsR0FBTCxDQUFTL0IsR0FBRyxDQUFDbUIsTUFBYixFQUFxQlIsRUFBckIsRUFBeUJDLEVBQXpCLEVBQTZCQyxFQUE3Qjs7QUFDQWxCLG9CQUFLb0MsR0FBTCxDQUFTL0IsR0FBRyxDQUFDdUIsV0FBYixFQUEwQlQsQ0FBMUIsRUFBNkJDLENBQTdCLEVBQWdDQyxDQUFoQzs7QUFDQSxXQUFPaEIsR0FBUDtBQUNIO0FBRUQ7Ozs7O0FBYUEsZ0JBQWFXLEVBQWIsRUFBeUJDLEVBQXpCLEVBQXFDQyxFQUFyQyxFQUFpREMsQ0FBakQsRUFBNERDLENBQTVELEVBQXVFQyxDQUF2RSxFQUFrRjtBQUFBLFNBVmxGRyxNQVVrRjtBQUFBLFNBTmxGSSxXQU1rRjtBQUFBLFNBRmxGUyxLQUVrRjtBQUM5RSxTQUFLQSxLQUFMLEdBQWFDLGtCQUFNQyxVQUFuQjtBQUNBLFNBQUtmLE1BQUwsR0FBYyxJQUFJeEIsZUFBSixDQUFTZ0IsRUFBVCxFQUFhQyxFQUFiLEVBQWlCQyxFQUFqQixDQUFkO0FBQ0EsU0FBS1UsV0FBTCxHQUFtQixJQUFJNUIsZUFBSixDQUFTbUIsQ0FBVCxFQUFZQyxDQUFaLEVBQWVDLENBQWYsQ0FBbkI7QUFDSDtBQUdEOzs7Ozs7Ozs7O1NBTUFtQixjQUFBLHFCQUFhVCxNQUFiLEVBQXFCQyxNQUFyQixFQUE2QjtBQUN6QmhDLG9CQUFLbUMsR0FBTCxDQUFTSixNQUFULEVBQWlCLEtBQUtQLE1BQXRCLEVBQThCLEtBQUtJLFdBQW5DOztBQUNBNUIsb0JBQUtrQyxHQUFMLENBQVNGLE1BQVQsRUFBaUIsS0FBS1IsTUFBdEIsRUFBOEIsS0FBS0ksV0FBbkM7QUFDSDtBQUVEOzs7Ozs7Ozs7OztTQVNBYSxZQUFBLG1CQUFXaEMsQ0FBWCxFQUFjaUMsR0FBZCxFQUFtQkMsR0FBbkIsRUFBd0JWLEtBQXhCLEVBQStCNUIsR0FBL0IsRUFBb0M7QUFDaEMsUUFBSSxDQUFDQSxHQUFMLEVBQVVBLEdBQUcsR0FBRyxJQUFOOztBQUNWTCxvQkFBSzRDLGFBQUwsQ0FBbUJ2QyxHQUFHLENBQUNtQixNQUF2QixFQUErQixLQUFLQSxNQUFwQyxFQUE0Q2YsQ0FBNUM7O0FBQ0FMLElBQUFBLG1CQUFtQixDQUFDQyxHQUFHLENBQUN1QixXQUFMLEVBQWtCLEtBQUtBLFdBQXZCLEVBQW9DbkIsQ0FBcEMsQ0FBbkI7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5pbXBvcnQgVmVjMyBmcm9tICcuLi92YWx1ZS10eXBlcy92ZWMzJztcbmltcG9ydCBNYXQzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL21hdDMnO1xuaW1wb3J0IGVudW1zIGZyb20gJy4vZW51bXMnO1xuXG5sZXQgX3YzX3RtcCA9IG5ldyBWZWMzKCk7XG5sZXQgX3YzX3RtcDIgPSBuZXcgVmVjMygpO1xubGV0IF9tM190bXAgPSBuZXcgTWF0MygpO1xuXG4vLyBodHRwczovL3pldXhjZy5vcmcvMjAxMC8xMC8xNy9hYWJiLWZyb20tb2JiLXdpdGgtY29tcG9uZW50LXdpc2UtYWJzL1xubGV0IHRyYW5zZm9ybV9leHRlbnRfbTQgPSBmdW5jdGlvbiAob3V0LCBleHRlbnQsIG00KSB7XG4gICAgbGV0IF9tM190bXBtID0gX20zX3RtcC5tLCBtNG0gPSBtNC5tO1xuICAgIF9tM190bXBtWzBdID0gTWF0aC5hYnMobTRtWzBdKTsgX20zX3RtcG1bMV0gPSBNYXRoLmFicyhtNG1bMV0pOyBfbTNfdG1wbVsyXSA9IE1hdGguYWJzKG00bVsyXSk7XG4gICAgX20zX3RtcG1bM10gPSBNYXRoLmFicyhtNG1bNF0pOyBfbTNfdG1wbVs0XSA9IE1hdGguYWJzKG00bVs1XSk7IF9tM190bXBtWzVdID0gTWF0aC5hYnMobTRtWzZdKTtcbiAgICBfbTNfdG1wbVs2XSA9IE1hdGguYWJzKG00bVs4XSk7IF9tM190bXBtWzddID0gTWF0aC5hYnMobTRtWzldKTsgX20zX3RtcG1bOF0gPSBNYXRoLmFicyhtNG1bMTBdKTtcbiAgICBWZWMzLnRyYW5zZm9ybU1hdDMob3V0LCBleHRlbnQsIF9tM190bXApO1xufTtcblxuLyoqXG4gKiBBYWJiXG4gKiBAY2xhc3MgZ2VvbVV0aWxzLkFhYmJcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYWFiYiB7XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYSBuZXcgYWFiYlxuICAgICAqIEBtZXRob2QgY3JlYXRlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHB4IFggY29vcmRpbmF0ZXMgZm9yIGFhYmIncyBvcmlnaW5hbCBwb2ludFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBweSBZIGNvb3JkaW5hdGVzIGZvciBhYWJiJ3Mgb3JpZ2luYWwgcG9pbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHogWiBjb29yZGluYXRlcyBmb3IgYWFiYidzIG9yaWdpbmFsIHBvaW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgdGhlIGhhbGYgb2YgYWFiYiB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIHRoZSBoYWxmIG9mIGFhYmIgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGwgdGhlIGhhbGYgb2YgYWFiYiBsZW5ndGhcbiAgICAgKiBAcmV0dXJuIHtnZW9tVXRpbHMuQWFiYn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSAocHgsIHB5LCBweiwgdywgaCwgbCkge1xuICAgICAgICByZXR1cm4gbmV3IGFhYmIocHgsIHB5LCBweiwgdywgaCwgbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2xvbmUgYSBuZXcgYWFiYlxuICAgICAqIEBtZXRob2QgY2xvbmVcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBhIHRoZSBzb3VyY2UgYWFiYlxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5BYWJifVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUgKGEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBhYWJiKGEuY2VudGVyLngsIGEuY2VudGVyLnksIGEuY2VudGVyLnosXG4gICAgICAgICAgICBhLmhhbGZFeHRlbnRzLngsIGEuaGFsZkV4dGVudHMueSwgYS5oYWxmRXh0ZW50cy56KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgYWFiYiB0byBhbm90aGVyXG4gICAgICogQG1ldGhvZCBjb3B5XG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gb3V0IHRoZSByZWNlaXZpbmcgYWFiYlxuICAgICAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IGEgdGhlIHNvdXJjZSBhYWJiXG4gICAgICogQHJldHVybiB7Z2VvbVV0aWxzLkFhYmJ9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjb3B5IChvdXQsIGEpIHtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5jZW50ZXIsIGEuY2VudGVyKTtcbiAgICAgICAgVmVjMy5jb3B5KG91dC5oYWxmRXh0ZW50cywgYS5oYWxmRXh0ZW50cyk7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYSBuZXcgYWFiYiBmcm9tIHR3byBjb3JuZXIgcG9pbnRzXG4gICAgICogQG1ldGhvZCBmcm9tUG9pbnRzXG4gICAgICogQHBhcmFtIHtnZW9tVXRpbHMuQWFiYn0gb3V0IHRoZSByZWNlaXZpbmcgYWFiYlxuICAgICAqIEBwYXJhbSB7VmVjM30gbWluUG9zIGxvd2VyIGNvcm5lciBwb3NpdGlvbiBvZiB0aGUgYWFiYlxuICAgICAqIEBwYXJhbSB7VmVjM30gbWF4UG9zIHVwcGVyIGNvcm5lciBwb3NpdGlvbiBvZiB0aGUgYWFiYlxuICAgICAqIEByZXR1cm4ge2dlb21VdGlscy5BYWJifVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZnJvbVBvaW50cyAob3V0LCBtaW5Qb3MsIG1heFBvcykge1xuICAgICAgICBWZWMzLnNjYWxlKG91dC5jZW50ZXIsIFZlYzMuYWRkKF92M190bXAsIG1pblBvcywgbWF4UG9zKSwgMC41KTtcbiAgICAgICAgVmVjMy5zY2FsZShvdXQuaGFsZkV4dGVudHMsIFZlYzMuc3ViKF92M190bXAyLCBtYXhQb3MsIG1pblBvcyksIDAuNSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgYWFiYiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAgICogQG1ldGhvZCBzZXRcbiAgICAgKiBAcGFyYW0ge2dlb21VdGlscy5BYWJifSBvdXQgdGhlIHJlY2VpdmluZyBhYWJiXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHB4IFggY29vcmRpbmF0ZXMgZm9yIGFhYmIncyBvcmlnaW5hbCBwb2ludFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBweSBZIGNvb3JkaW5hdGVzIGZvciBhYWJiJ3Mgb3JpZ2luYWwgcG9pbnRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHogWiBjb29yZGluYXRlcyBmb3IgYWFiYidzIG9yaWdpbmFsIHBvaW50XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHcgdGhlIGhhbGYgb2YgYWFiYiB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIHRoZSBoYWxmIG9mIGFhYmIgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGwgdGhlIGhhbGYgb2YgYWFiYiBsZW5ndGhcbiAgICAgKiBAcmV0dXJuIHtnZW9tVXRpbHMuQWFiYn0gb3V0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBzZXQgKG91dCwgcHgsIHB5LCBweiwgdywgaCwgbCkge1xuICAgICAgICBWZWMzLnNldChvdXQuY2VudGVyLCBweCwgcHksIHB6KTtcbiAgICAgICAgVmVjMy5zZXQob3V0LmhhbGZFeHRlbnRzLCB3LCBoLCBsKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGNlbnRlclxuICAgICAqL1xuICAgIGNlbnRlcjogVmVjMztcbiAgICAvKipcbiAgICAgKiBAcHJvcGVydHkge1ZlYzN9IGhhbGZFeHRlbnRzXG4gICAgICovXG4gICAgaGFsZkV4dGVudHM6IFZlYzM7XG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF90eXBlXG4gICAgICovXG4gICAgX3R5cGU6IG51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yIChweDogbnVtYmVyLCBweTogbnVtYmVyLCBwejogbnVtYmVyLCB3OiBudW1iZXIsIGg6IG51bWJlciwgbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSBlbnVtcy5TSEFQRV9BQUJCO1xuICAgICAgICB0aGlzLmNlbnRlciA9IG5ldyBWZWMzKHB4LCBweSwgcHopO1xuICAgICAgICB0aGlzLmhhbGZFeHRlbnRzID0gbmV3IFZlYzModywgaCwgbCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGJvdW5kaW5nIHBvaW50cyBvZiB0aGlzIHNoYXBlXG4gICAgICogQG1ldGhvZCBnZXRCb3VuZGFyeVxuICAgICAqIEBwYXJhbSB7VmVjM30gbWluUG9zXG4gICAgICogQHBhcmFtIHtWZWMzfSBtYXhQb3NcbiAgICAgKi9cbiAgICBnZXRCb3VuZGFyeSAobWluUG9zLCBtYXhQb3MpIHtcbiAgICAgICAgVmVjMy5zdWIobWluUG9zLCB0aGlzLmNlbnRlciwgdGhpcy5oYWxmRXh0ZW50cyk7XG4gICAgICAgIFZlYzMuYWRkKG1heFBvcywgdGhpcy5jZW50ZXIsIHRoaXMuaGFsZkV4dGVudHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybSB0aGlzIHNoYXBlXG4gICAgICogQG1ldGhvZCB0cmFuc2Zvcm1cbiAgICAgKiBAcGFyYW0ge01hdDR9IG0gdGhlIHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHBvcyB0aGUgcG9zaXRpb24gcGFydCBvZiB0aGUgdHJhbnNmb3JtXG4gICAgICogQHBhcmFtIHtRdWF0fSByb3QgdGhlIHJvdGF0aW9uIHBhcnQgb2YgdGhlIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7VmVjM30gc2NhbGUgdGhlIHNjYWxlIHBhcnQgb2YgdGhlIHRyYW5zZm9ybVxuICAgICAqIEBwYXJhbSB7Z2VvbVV0aWxzLkFhYmJ9IFtvdXRdIHRoZSB0YXJnZXQgc2hhcGVcbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0gKG0sIHBvcywgcm90LCBzY2FsZSwgb3V0KSB7XG4gICAgICAgIGlmICghb3V0KSBvdXQgPSB0aGlzO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQob3V0LmNlbnRlciwgdGhpcy5jZW50ZXIsIG0pO1xuICAgICAgICB0cmFuc2Zvcm1fZXh0ZW50X200KG91dC5oYWxmRXh0ZW50cywgdGhpcy5oYWxmRXh0ZW50cywgbSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=