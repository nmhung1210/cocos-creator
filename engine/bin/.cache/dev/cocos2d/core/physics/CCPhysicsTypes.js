
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/CCPhysicsTypes.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
var ContactType = {
  BEGIN_CONTACT: 'begin-contact',
  END_CONTACT: 'end-contact',
  PRE_SOLVE: 'pre-solve',
  POST_SOLVE: 'post-solve'
};
/**
 * !#en Enum for RigidBodyType.
 * !#zh 刚体类型
 * @enum RigidBodyType
 */

var BodyType = cc.Enum({
  /**
   * !#en 
   * zero mass, zero velocity, may be manually moved.
   * !#zh 
   * 零质量，零速度，可以手动移动。
   * @property {Number} Static
   */
  Static: 0,

  /**
   * !#en 
   * zero mass, non-zero velocity set by user.
   * !#zh 
   * 零质量，可以被设置速度。
   * @property {Number} Kinematic
   */
  Kinematic: 1,

  /**
   * !#en 
   * positive mass, non-zero velocity determined by forces.
   * !#zh 
   * 有质量，可以设置速度，力等。
   * @property {Number} Dynamic
   */
  Dynamic: 2,

  /**
   * !#en 
   * An extension of Kinematic type, can be animated by Animation.
   * !#zh
   * Kinematic 类型的扩展，可以被动画控制动画效果。
   * @property {Number} Animated
   */
  Animated: 3
});
cc.RigidBodyType = BodyType;
/**
 * !#en Enum for RayCastType.
 * !#zh 射线检测类型
 * @enum RayCastType
 */

var RayCastType = cc.Enum({
  /**
   * !#en 
   * Detects closest collider on the raycast path.
   * !#zh 
   * 检测射线路径上最近的碰撞体
   * @property {Number} Closest
   */
  Closest: 0,

  /**
   * !#en 
   * Detects any collider on the raycast path.
   * Once detects a collider, will stop the searching process.
   * !#zh 
   * 检测射线路径上任意的碰撞体。
   * 一旦检测到任何碰撞体，将立刻结束检测其他的碰撞体。
   * @property {Number} Any
   */
  Any: 1,

  /**
   * !#en 
   * Detects all colliders on the raycast path.
   * One collider may return several collision points(because one collider may have several fixtures, 
   * one fixture will return one point, the point may inside collider), AllClosest will return the closest one.
   * !#zh 
   * 检测射线路径上所有的碰撞体。
   * 同一个碰撞体上有可能会返回多个碰撞点(因为一个碰撞体可能由多个夹具组成，每一个夹具会返回一个碰撞点，碰撞点有可能在碰撞体内部)，AllClosest 删选同一个碰撞体上最近的哪一个碰撞点。
   * @property {Number} AllClosest
   */
  AllClosest: 2,

  /**
   * !#en 
   * Detects all colliders on the raycast path.
   * One collider may return several collision points, All will return all these points.
   * !#zh 
   * 检测射线路径上所有的碰撞体。
   * 同一个碰撞体上有可能会返回多个碰撞点，All 将返回所有这些碰撞点。
   * @property {Number} All
   */
  All: 3
});
cc.RayCastType = RayCastType;
module.exports = {
  BodyType: BodyType,
  ContactType: ContactType,
  RayCastType: RayCastType,
  DrawBits: b2.DrawFlags,
  PTM_RATIO: 32,
  ANGLE_TO_PHYSICS_ANGLE: -Math.PI / 180,
  PHYSICS_ANGLE_TO_ANGLE: -180 / Math.PI
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvQ0NQaHlzaWNzVHlwZXMuanMiXSwibmFtZXMiOlsiQ29udGFjdFR5cGUiLCJCRUdJTl9DT05UQUNUIiwiRU5EX0NPTlRBQ1QiLCJQUkVfU09MVkUiLCJQT1NUX1NPTFZFIiwiQm9keVR5cGUiLCJjYyIsIkVudW0iLCJTdGF0aWMiLCJLaW5lbWF0aWMiLCJEeW5hbWljIiwiQW5pbWF0ZWQiLCJSaWdpZEJvZHlUeXBlIiwiUmF5Q2FzdFR5cGUiLCJDbG9zZXN0IiwiQW55IiwiQWxsQ2xvc2VzdCIsIkFsbCIsIm1vZHVsZSIsImV4cG9ydHMiLCJEcmF3Qml0cyIsImIyIiwiRHJhd0ZsYWdzIiwiUFRNX1JBVElPIiwiQU5HTEVfVE9fUEhZU0lDU19BTkdMRSIsIk1hdGgiLCJQSSIsIlBIWVNJQ1NfQU5HTEVfVE9fQU5HTEUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFdBQVcsR0FBRztBQUNkQyxFQUFBQSxhQUFhLEVBQUUsZUFERDtBQUVkQyxFQUFBQSxXQUFXLEVBQUUsYUFGQztBQUdkQyxFQUFBQSxTQUFTLEVBQUUsV0FIRztBQUlkQyxFQUFBQSxVQUFVLEVBQUU7QUFKRSxDQUFsQjtBQU9BOzs7Ozs7QUFLQSxJQUFJQyxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ25COzs7Ozs7O0FBT0FDLEVBQUFBLE1BQU0sRUFBRSxDQVJXOztBQVNuQjs7Ozs7OztBQU9BQyxFQUFBQSxTQUFTLEVBQUUsQ0FoQlE7O0FBaUJuQjs7Ozs7OztBQU9BQyxFQUFBQSxPQUFPLEVBQUUsQ0F4QlU7O0FBeUJuQjs7Ozs7OztBQU9BQyxFQUFBQSxRQUFRLEVBQUU7QUFoQ1MsQ0FBUixDQUFmO0FBa0NBTCxFQUFFLENBQUNNLGFBQUgsR0FBbUJQLFFBQW5CO0FBRUE7Ozs7OztBQUtBLElBQUlRLFdBQVcsR0FBR1AsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDdEI7Ozs7Ozs7QUFPQU8sRUFBQUEsT0FBTyxFQUFFLENBUmE7O0FBU3RCOzs7Ozs7Ozs7QUFTQUMsRUFBQUEsR0FBRyxFQUFFLENBbEJpQjs7QUFtQnRCOzs7Ozs7Ozs7O0FBVUFDLEVBQUFBLFVBQVUsRUFBRSxDQTdCVTs7QUErQnRCOzs7Ozs7Ozs7QUFTQUMsRUFBQUEsR0FBRyxFQUFFO0FBeENpQixDQUFSLENBQWxCO0FBMENBWCxFQUFFLENBQUNPLFdBQUgsR0FBaUJBLFdBQWpCO0FBRUFLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiZCxFQUFBQSxRQUFRLEVBQUVBLFFBREc7QUFFYkwsRUFBQUEsV0FBVyxFQUFFQSxXQUZBO0FBR2JhLEVBQUFBLFdBQVcsRUFBRUEsV0FIQTtBQUtiTyxFQUFBQSxRQUFRLEVBQUVDLEVBQUUsQ0FBQ0MsU0FMQTtBQU9iQyxFQUFBQSxTQUFTLEVBQUUsRUFQRTtBQVFiQyxFQUFBQSxzQkFBc0IsRUFBRSxDQUFDQyxJQUFJLENBQUNDLEVBQU4sR0FBVyxHQVJ0QjtBQVNiQyxFQUFBQSxzQkFBc0IsRUFBRSxDQUFDLEdBQUQsR0FBT0YsSUFBSSxDQUFDQztBQVR2QixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxudmFyIENvbnRhY3RUeXBlID0ge1xuICAgIEJFR0lOX0NPTlRBQ1Q6ICdiZWdpbi1jb250YWN0JyxcbiAgICBFTkRfQ09OVEFDVDogJ2VuZC1jb250YWN0JyxcbiAgICBQUkVfU09MVkU6ICdwcmUtc29sdmUnLFxuICAgIFBPU1RfU09MVkU6ICdwb3N0LXNvbHZlJ1xufTtcblxuLyoqXG4gKiAhI2VuIEVudW0gZm9yIFJpZ2lkQm9keVR5cGUuXG4gKiAhI3poIOWImuS9k+exu+Wei1xuICogQGVudW0gUmlnaWRCb2R5VHlwZVxuICovXG52YXIgQm9keVR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIHplcm8gbWFzcywgemVybyB2ZWxvY2l0eSwgbWF5IGJlIG1hbnVhbGx5IG1vdmVkLlxuICAgICAqICEjemggXG4gICAgICog6Zu26LSo6YeP77yM6Zu26YCf5bqm77yM5Y+v5Lul5omL5Yqo56e75Yqo44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFN0YXRpY1xuICAgICAqL1xuICAgIFN0YXRpYzogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIHplcm8gbWFzcywgbm9uLXplcm8gdmVsb2NpdHkgc2V0IGJ5IHVzZXIuXG4gICAgICogISN6aCBcbiAgICAgKiDpm7botKjph4/vvIzlj6/ku6Xooqvorr7nva7pgJ/luqbjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gS2luZW1hdGljXG4gICAgICovXG4gICAgS2luZW1hdGljOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogcG9zaXRpdmUgbWFzcywgbm9uLXplcm8gdmVsb2NpdHkgZGV0ZXJtaW5lZCBieSBmb3JjZXMuXG4gICAgICogISN6aCBcbiAgICAgKiDmnInotKjph4/vvIzlj6/ku6Xorr7nva7pgJ/luqbvvIzlipvnrYnjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gRHluYW1pY1xuICAgICAqL1xuICAgIER5bmFtaWM6IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBBbiBleHRlbnNpb24gb2YgS2luZW1hdGljIHR5cGUsIGNhbiBiZSBhbmltYXRlZCBieSBBbmltYXRpb24uXG4gICAgICogISN6aFxuICAgICAqIEtpbmVtYXRpYyDnsbvlnovnmoTmianlsZXvvIzlj6/ku6XooqvliqjnlLvmjqfliLbliqjnlLvmlYjmnpzjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQW5pbWF0ZWRcbiAgICAgKi9cbiAgICBBbmltYXRlZDogM1xufSk7XG5jYy5SaWdpZEJvZHlUeXBlID0gQm9keVR5cGU7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBSYXlDYXN0VHlwZS5cbiAqICEjemgg5bCE57q/5qOA5rWL57G75Z6LXG4gKiBAZW51bSBSYXlDYXN0VHlwZVxuICovXG52YXIgUmF5Q2FzdFR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFxuICAgICAqIERldGVjdHMgY2xvc2VzdCBjb2xsaWRlciBvbiB0aGUgcmF5Y2FzdCBwYXRoLlxuICAgICAqICEjemggXG4gICAgICog5qOA5rWL5bCE57q/6Lev5b6E5LiK5pyA6L+R55qE56Kw5pKe5L2TXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENsb3Nlc3RcbiAgICAgKi9cbiAgICBDbG9zZXN0OiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogRGV0ZWN0cyBhbnkgY29sbGlkZXIgb24gdGhlIHJheWNhc3QgcGF0aC5cbiAgICAgKiBPbmNlIGRldGVjdHMgYSBjb2xsaWRlciwgd2lsbCBzdG9wIHRoZSBzZWFyY2hpbmcgcHJvY2Vzcy5cbiAgICAgKiAhI3poIFxuICAgICAqIOajgOa1i+WwhOe6v+i3r+W+hOS4iuS7u+aEj+eahOeisOaSnuS9k+OAglxuICAgICAqIOS4gOaXpuajgOa1i+WIsOS7u+S9leeisOaSnuS9k++8jOWwhueri+WIu+e7k+adn+ajgOa1i+WFtuS7lueahOeisOaSnuS9k+OAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBbnlcbiAgICAgKi9cbiAgICBBbnk6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBcbiAgICAgKiBEZXRlY3RzIGFsbCBjb2xsaWRlcnMgb24gdGhlIHJheWNhc3QgcGF0aC5cbiAgICAgKiBPbmUgY29sbGlkZXIgbWF5IHJldHVybiBzZXZlcmFsIGNvbGxpc2lvbiBwb2ludHMoYmVjYXVzZSBvbmUgY29sbGlkZXIgbWF5IGhhdmUgc2V2ZXJhbCBmaXh0dXJlcywgXG4gICAgICogb25lIGZpeHR1cmUgd2lsbCByZXR1cm4gb25lIHBvaW50LCB0aGUgcG9pbnQgbWF5IGluc2lkZSBjb2xsaWRlciksIEFsbENsb3Nlc3Qgd2lsbCByZXR1cm4gdGhlIGNsb3Nlc3Qgb25lLlxuICAgICAqICEjemggXG4gICAgICog5qOA5rWL5bCE57q/6Lev5b6E5LiK5omA5pyJ55qE56Kw5pKe5L2T44CCXG4gICAgICog5ZCM5LiA5Liq56Kw5pKe5L2T5LiK5pyJ5Y+v6IO95Lya6L+U5Zue5aSa5Liq56Kw5pKe54K5KOWboOS4uuS4gOS4queisOaSnuS9k+WPr+iDveeUseWkmuS4quWkueWFt+e7hOaIkO+8jOavj+S4gOS4quWkueWFt+S8mui/lOWbnuS4gOS4queisOaSnueCue+8jOeisOaSnueCueacieWPr+iDveWcqOeisOaSnuS9k+WGhemDqCnvvIxBbGxDbG9zZXN0IOWIoOmAieWQjOS4gOS4queisOaSnuS9k+S4iuacgOi/keeahOWTquS4gOS4queisOaSnueCueOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBbGxDbG9zZXN0XG4gICAgICovXG4gICAgQWxsQ2xvc2VzdDogMixcblxuICAgIC8qKlxuICAgICAqICEjZW4gXG4gICAgICogRGV0ZWN0cyBhbGwgY29sbGlkZXJzIG9uIHRoZSByYXljYXN0IHBhdGguXG4gICAgICogT25lIGNvbGxpZGVyIG1heSByZXR1cm4gc2V2ZXJhbCBjb2xsaXNpb24gcG9pbnRzLCBBbGwgd2lsbCByZXR1cm4gYWxsIHRoZXNlIHBvaW50cy5cbiAgICAgKiAhI3poIFxuICAgICAqIOajgOa1i+WwhOe6v+i3r+W+hOS4iuaJgOacieeahOeisOaSnuS9k+OAglxuICAgICAqIOWQjOS4gOS4queisOaSnuS9k+S4iuacieWPr+iDveS8mui/lOWbnuWkmuS4queisOaSnueCue+8jEFsbCDlsIbov5Tlm57miYDmnInov5nkupvnorDmkp7ngrnjgIJcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQWxsXG4gICAgICovXG4gICAgQWxsOiAzXG59KTtcbmNjLlJheUNhc3RUeXBlID0gUmF5Q2FzdFR5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIEJvZHlUeXBlOiBCb2R5VHlwZSxcbiAgICBDb250YWN0VHlwZTogQ29udGFjdFR5cGUsXG4gICAgUmF5Q2FzdFR5cGU6IFJheUNhc3RUeXBlLFxuICAgIFxuICAgIERyYXdCaXRzOiBiMi5EcmF3RmxhZ3MsXG5cbiAgICBQVE1fUkFUSU86IDMyLFxuICAgIEFOR0xFX1RPX1BIWVNJQ1NfQU5HTEU6IC1NYXRoLlBJIC8gMTgwLFxuICAgIFBIWVNJQ1NfQU5HTEVfVE9fQU5HTEU6IC0xODAgLyBNYXRoLlBJLFxufTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9