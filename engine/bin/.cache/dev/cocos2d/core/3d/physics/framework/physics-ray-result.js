
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/framework/physics-ray-result.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.PhysicsRayResult = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Vec3 = cc.Vec3;
/**
 * !#en
 * Used to store physical ray detection results
 * !#zh
 * 用于保存物理射线检测结果
 * @class PhysicsRayResult
 */

var PhysicsRayResult = /*#__PURE__*/function () {
  function PhysicsRayResult() {
    this._hitPoint = new Vec3();
    this._distance = 0;
    this._collidier = null;
  }

  var _proto = PhysicsRayResult.prototype;

  /**
   * !#en
   * Set up ray. This method is used internally by the engine. Do not call it from an external script
   * !#zh
   * 设置射线，此方法由引擎内部使用，请勿在外部脚本调用
   * @method _assign
   * @param {Vec3} hitPoint
   * @param {number} distance
   * @param {Collider3D} collider
   */
  _proto._assign = function _assign(hitPoint, distance, collider) {
    Vec3.copy(this._hitPoint, hitPoint);
    this._distance = distance;
    this._collidier = collider;
  }
  /**
   * !#en
   * Clone
   * !#zh
   * 克隆
   * @method clone
   */
  ;

  _proto.clone = function clone() {
    var c = new PhysicsRayResult();
    Vec3.copy(c._hitPoint, this._hitPoint);
    c._distance = this._distance;
    c._collidier = this._collidier;
    return c;
  };

  _createClass(PhysicsRayResult, [{
    key: "hitPoint",

    /**
     * !#en
     * Hit the point
     * !#zh
     * 击中点
     * @property {Vec3} hitPoint
     * @readonly
     */
    get: function get() {
      return this._hitPoint;
    }
    /**
     * !#en
     * Distance
     * !#zh
     * 距离
     * @property {number} distance
     * @readonly
     */

  }, {
    key: "distance",
    get: function get() {
      return this._distance;
    }
    /**
     * !#en
     * Hit the collision box
     * !#zh
     * 击中的碰撞盒
     * @property {Collider3D} collider
     * @readonly
     */

  }, {
    key: "collider",
    get: function get() {
      return this._collidier;
    }
  }]);

  return PhysicsRayResult;
}();

exports.PhysicsRayResult = PhysicsRayResult;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvZnJhbWV3b3JrL3BoeXNpY3MtcmF5LXJlc3VsdC50cyJdLCJuYW1lcyI6WyJWZWMzIiwiY2MiLCJQaHlzaWNzUmF5UmVzdWx0IiwiX2hpdFBvaW50IiwiX2Rpc3RhbmNlIiwiX2NvbGxpZGllciIsIl9hc3NpZ24iLCJoaXRQb2ludCIsImRpc3RhbmNlIiwiY29sbGlkZXIiLCJjb3B5IiwiY2xvbmUiLCJjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsSUFBSSxHQUFHQyxFQUFFLENBQUNELElBQWhCO0FBRUE7Ozs7Ozs7O0lBT2FFOztTQXNDREMsWUFBcUIsSUFBSUgsSUFBSjtTQUNyQkksWUFBb0I7U0FDcEJDLGFBQWdDOzs7OztBQUV4Qzs7Ozs7Ozs7OztTQVVPQyxVQUFQLGlCQUFnQkMsUUFBaEIsRUFBbUNDLFFBQW5DLEVBQXFEQyxRQUFyRCxFQUEyRTtBQUN2RVQsSUFBQUEsSUFBSSxDQUFDVSxJQUFMLENBQVUsS0FBS1AsU0FBZixFQUEwQkksUUFBMUI7QUFDQSxTQUFLSCxTQUFMLEdBQWlCSSxRQUFqQjtBQUNBLFNBQUtILFVBQUwsR0FBa0JJLFFBQWxCO0FBQ0g7QUFFRDs7Ozs7Ozs7O1NBT09FLFFBQVAsaUJBQWdCO0FBQ1osUUFBTUMsQ0FBQyxHQUFHLElBQUlWLGdCQUFKLEVBQVY7QUFDQUYsSUFBQUEsSUFBSSxDQUFDVSxJQUFMLENBQVVFLENBQUMsQ0FBQ1QsU0FBWixFQUF1QixLQUFLQSxTQUE1QjtBQUNBUyxJQUFBQSxDQUFDLENBQUNSLFNBQUYsR0FBYyxLQUFLQSxTQUFuQjtBQUNBUSxJQUFBQSxDQUFDLENBQUNQLFVBQUYsR0FBZSxLQUFLQSxVQUFwQjtBQUNBLFdBQU9PLENBQVA7QUFDSDs7Ozs7QUFyRUQ7Ozs7Ozs7O3dCQVF5QjtBQUNyQixhQUFPLEtBQUtULFNBQVo7QUFDSDtBQUVEOzs7Ozs7Ozs7Ozt3QkFRd0I7QUFDcEIsYUFBTyxLQUFLQyxTQUFaO0FBQ0g7QUFFRDs7Ozs7Ozs7Ozs7d0JBUTRCO0FBQ3hCLGFBQU8sS0FBS0MsVUFBWjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCB7IENvbGxpZGVyM0QgfSBmcm9tICcuLi9leHBvcnRzL3BoeXNpY3MtZnJhbWV3b3JrJztcbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xuXG4vKipcbiAqICEjZW5cbiAqIFVzZWQgdG8gc3RvcmUgcGh5c2ljYWwgcmF5IGRldGVjdGlvbiByZXN1bHRzXG4gKiAhI3poXG4gKiDnlKjkuo7kv53lrZjniannkIblsITnur/mo4DmtYvnu5PmnpxcbiAqIEBjbGFzcyBQaHlzaWNzUmF5UmVzdWx0XG4gKi9cbmV4cG9ydCBjbGFzcyBQaHlzaWNzUmF5UmVzdWx0IHtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBIaXQgdGhlIHBvaW50XG4gICAgICogISN6aFxuICAgICAqIOWHu+S4reeCuVxuICAgICAqIEBwcm9wZXJ0eSB7VmVjM30gaGl0UG9pbnRcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKi9cbiAgICBnZXQgaGl0UG9pbnQgKCk6IGNjLlZlYzMge1xuICAgICAgICByZXR1cm4gdGhpcy5faGl0UG9pbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERpc3RhbmNlXG4gICAgICogISN6aFxuICAgICAqIOi3neemu1xuICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkaXN0YW5jZVxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldCBkaXN0YW5jZSAoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBIaXQgdGhlIGNvbGxpc2lvbiBib3hcbiAgICAgKiAhI3poXG4gICAgICog5Ye75Lit55qE56Kw5pKe55uSXG4gICAgICogQHByb3BlcnR5IHtDb2xsaWRlcjNEfSBjb2xsaWRlclxuICAgICAqIEByZWFkb25seVxuICAgICAqL1xuICAgIGdldCBjb2xsaWRlciAoKTogQ29sbGlkZXIzRCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsaWRpZXIhO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2hpdFBvaW50OiBjYy5WZWMzID0gbmV3IFZlYzMoKTtcbiAgICBwcml2YXRlIF9kaXN0YW5jZTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9jb2xsaWRpZXI6IENvbGxpZGVyM0QgfCBudWxsID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXQgdXAgcmF5LiBUaGlzIG1ldGhvZCBpcyB1c2VkIGludGVybmFsbHkgYnkgdGhlIGVuZ2luZS4gRG8gbm90IGNhbGwgaXQgZnJvbSBhbiBleHRlcm5hbCBzY3JpcHRcbiAgICAgKiAhI3poXG4gICAgICog6K6+572u5bCE57q/77yM5q2k5pa55rOV55Sx5byV5pOO5YaF6YOo5L2/55So77yM6K+35Yu/5Zyo5aSW6YOo6ISa5pys6LCD55SoXG4gICAgICogQG1ldGhvZCBfYXNzaWduXG4gICAgICogQHBhcmFtIHtWZWMzfSBoaXRQb2ludFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZVxuICAgICAqIEBwYXJhbSB7Q29sbGlkZXIzRH0gY29sbGlkZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgX2Fzc2lnbiAoaGl0UG9pbnQ6IGNjLlZlYzMsIGRpc3RhbmNlOiBudW1iZXIsIGNvbGxpZGVyOiBDb2xsaWRlcjNEKSB7XG4gICAgICAgIFZlYzMuY29weSh0aGlzLl9oaXRQb2ludCwgaGl0UG9pbnQpO1xuICAgICAgICB0aGlzLl9kaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICB0aGlzLl9jb2xsaWRpZXIgPSBjb2xsaWRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQ2xvbmVcbiAgICAgKiAhI3poXG4gICAgICog5YWL6ZqGXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqL1xuICAgIHB1YmxpYyBjbG9uZSAoKSB7XG4gICAgICAgIGNvbnN0IGMgPSBuZXcgUGh5c2ljc1JheVJlc3VsdCgpO1xuICAgICAgICBWZWMzLmNvcHkoYy5faGl0UG9pbnQsIHRoaXMuX2hpdFBvaW50KTtcbiAgICAgICAgYy5fZGlzdGFuY2UgPSB0aGlzLl9kaXN0YW5jZTtcbiAgICAgICAgYy5fY29sbGlkaWVyID0gdGhpcy5fY29sbGlkaWVyO1xuICAgICAgICByZXR1cm4gYztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==