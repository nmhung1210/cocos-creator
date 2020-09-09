
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/enums.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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
 * !#en Shape type.
 * @enum geomUtils.enums
 */
var _default = {
  /**
   * !#en Ray.
   * !#zh 射线。
   * @property {Number} SHAPE_RAY
   * @default 1 << 0
   */
  SHAPE_RAY: 1 << 0,

  /**
   * !#en Line.
   * !#zh 直线。
   * @property {Number} SHAPE_LINE
   * @default 2
  */
  SHAPE_LINE: 1 << 1,

  /**
   * !#en Sphere.
   * !#zh 球。
   * @property {Number} SHAPE_SPHERE
   * @default 4
  */
  SHAPE_SPHERE: 1 << 2,

  /**
   * !#en Aabb.
   * !#zh 包围盒。
   * @property {Number} SHAPE_AABB
  */
  SHAPE_AABB: 1 << 3,

  /**
   * !#en Obb.
   * !#zh 有向包围盒。
   * @property {Number} SHAPE_OBB
  */
  SHAPE_OBB: 1 << 4,

  /**
   * !#en Plane.
   * !#zh 平面。
   * @property {Number} SHAPE_PLANE
  */
  SHAPE_PLANE: 1 << 5,

  /**
   * !#en Triangle.
   * !#zh 三角形。
   * @property {Number} SHAPE_TRIANGLE
  */
  SHAPE_TRIANGLE: 1 << 6,

  /**
   * !#en Frustum.
   * !#zh 平截头体。
   * @property {Number} SHAPE_FRUSTUM
  */
  SHAPE_FRUSTUM: 1 << 7,

  /**
   * !#en frustum accurate.
   * !#zh 平截头体。
   * @property {Number} SHAPE_FRUSTUM_ACCURATE
  */
  SHAPE_FRUSTUM_ACCURATE: 1 << 8
};
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvZW51bXMudHMiXSwibmFtZXMiOlsiU0hBUEVfUkFZIiwiU0hBUEVfTElORSIsIlNIQVBFX1NQSEVSRSIsIlNIQVBFX0FBQkIiLCJTSEFQRV9PQkIiLCJTSEFQRV9QTEFORSIsIlNIQVBFX1RSSUFOR0xFIiwiU0hBUEVfRlJVU1RVTSIsIlNIQVBFX0ZSVVNUVU1fQUNDVVJBVEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7OztlQUllO0FBQ1g7Ozs7OztBQU1BQSxFQUFBQSxTQUFTLEVBQUcsS0FBSyxDQVBOOztBQVFYOzs7Ozs7QUFNQUMsRUFBQUEsVUFBVSxFQUFHLEtBQUssQ0FkUDs7QUFlWDs7Ozs7O0FBTUFDLEVBQUFBLFlBQVksRUFBRyxLQUFLLENBckJUOztBQXNCWDs7Ozs7QUFLQUMsRUFBQUEsVUFBVSxFQUFHLEtBQUssQ0EzQlA7O0FBNEJYOzs7OztBQUtBQyxFQUFBQSxTQUFTLEVBQUcsS0FBSyxDQWpDTjs7QUFrQ1g7Ozs7O0FBS0FDLEVBQUFBLFdBQVcsRUFBRyxLQUFLLENBdkNSOztBQXdDWDs7Ozs7QUFLQUMsRUFBQUEsY0FBYyxFQUFHLEtBQUssQ0E3Q1g7O0FBOENYOzs7OztBQUtBQyxFQUFBQSxhQUFhLEVBQUcsS0FBSyxDQW5EVjs7QUFvRFg7Ozs7O0FBS0FDLEVBQUFBLHNCQUFzQixFQUFHLEtBQUs7QUF6RG5CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogISNlbiBTaGFwZSB0eXBlLlxuICogQGVudW0gZ2VvbVV0aWxzLmVudW1zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFJheS5cbiAgICAgKiAhI3poIOWwhOe6v+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9SQVlcbiAgICAgKiBAZGVmYXVsdCAxIDw8IDBcbiAgICAgKi9cbiAgICBTSEFQRV9SQVk6ICgxIDw8IDApLFxuICAgIC8qKlxuICAgICAqICEjZW4gTGluZS5cbiAgICAgKiAhI3poIOebtOe6v+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9MSU5FXG4gICAgICogQGRlZmF1bHQgMlxuICAgICovXG4gICAgU0hBUEVfTElORTogKDEgPDwgMSksXG4gICAgLyoqXG4gICAgICogISNlbiBTcGhlcmUuXG4gICAgICogISN6aCDnkIPjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfU1BIRVJFXG4gICAgICogQGRlZmF1bHQgNFxuICAgICovXG4gICAgU0hBUEVfU1BIRVJFOiAoMSA8PCAyKSxcbiAgICAvKipcbiAgICAgKiAhI2VuIEFhYmIuXG4gICAgICogISN6aCDljIXlm7Tnm5LjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfQUFCQlxuICAgICovXG4gICAgU0hBUEVfQUFCQjogKDEgPDwgMyksXG4gICAgLyoqXG4gICAgICogISNlbiBPYmIuXG4gICAgICogISN6aCDmnInlkJHljIXlm7Tnm5LjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfT0JCXG4gICAgKi9cbiAgICBTSEFQRV9PQkI6ICgxIDw8IDQpLFxuICAgIC8qKlxuICAgICAqICEjZW4gUGxhbmUuXG4gICAgICogISN6aCDlubPpnaLjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0hBUEVfUExBTkVcbiAgICAqL1xuICAgIFNIQVBFX1BMQU5FOiAoMSA8PCA1KSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRyaWFuZ2xlLlxuICAgICAqICEjemgg5LiJ6KeS5b2i44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNIQVBFX1RSSUFOR0xFXG4gICAgKi9cbiAgICBTSEFQRV9UUklBTkdMRTogKDEgPDwgNiksXG4gICAgLyoqXG4gICAgICogISNlbiBGcnVzdHVtLlxuICAgICAqICEjemgg5bmz5oiq5aS05L2T44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNIQVBFX0ZSVVNUVU1cbiAgICAqL1xuICAgIFNIQVBFX0ZSVVNUVU06ICgxIDw8IDcpLFxuICAgIC8qKlxuICAgICAqICEjZW4gZnJ1c3R1bSBhY2N1cmF0ZS5cbiAgICAgKiAhI3poIOW5s+aIquWktOS9k+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTSEFQRV9GUlVTVFVNX0FDQ1VSQVRFXG4gICAgKi9cbiAgICBTSEFQRV9GUlVTVFVNX0FDQ1VSQVRFOiAoMSA8PCA4KSxcbn07XG4gICJdLCJzb3VyY2VSb290IjoiLyJ9