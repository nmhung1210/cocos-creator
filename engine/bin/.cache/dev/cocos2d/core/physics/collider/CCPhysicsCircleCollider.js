
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsCircleCollider.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
var PTM_RATIO = require('../CCPhysicsTypes').PTM_RATIO;
/**
 * @class PhysicsCircleCollider
 * @extends PhysicsCollider
 * @uses Collider.Circle
 */


var PhysicsCircleCollider = cc.Class({
  name: 'cc.PhysicsCircleCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Circle],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Circle',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var scaleX = Math.abs(scale.x);
    var scaleY = Math.abs(scale.y);
    var offsetX = this.offset.x / PTM_RATIO * scaleX;
    var offsetY = this.offset.y / PTM_RATIO * scaleY;
    var shape = new b2.CircleShape();
    shape.m_radius = this.radius / PTM_RATIO * scaleX;
    shape.m_p = new b2.Vec2(offsetX, offsetY);
    return shape;
  }
});
cc.PhysicsCircleCollider = module.exports = PhysicsCircleCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvY29sbGlkZXIvQ0NQaHlzaWNzQ2lyY2xlQ29sbGlkZXIuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIlBoeXNpY3NDaXJjbGVDb2xsaWRlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiUGh5c2ljc0NvbGxpZGVyIiwibWl4aW5zIiwiQ29sbGlkZXIiLCJDaXJjbGUiLCJlZGl0b3IiLCJtZW51IiwiQ0NfRURJVE9SIiwicmVxdWlyZUNvbXBvbmVudCIsIlJpZ2lkQm9keSIsIl9jcmVhdGVTaGFwZSIsInNjYWxlIiwic2NhbGVYIiwiTWF0aCIsImFicyIsIngiLCJzY2FsZVkiLCJ5Iiwib2Zmc2V0WCIsIm9mZnNldCIsIm9mZnNldFkiLCJzaGFwZSIsImIyIiwiQ2lyY2xlU2hhcGUiLCJtX3JhZGl1cyIsInJhZGl1cyIsIm1fcCIsIlZlYzIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsbUJBQUQsQ0FBUCxDQUE2QkQsU0FBN0M7QUFFQTs7Ozs7OztBQUtBLElBQUlFLHFCQUFxQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNqQ0MsRUFBQUEsSUFBSSxFQUFFLDBCQUQyQjtBQUVqQyxhQUFTRixFQUFFLENBQUNHLGVBRnFCO0FBR2pDQyxFQUFBQSxNQUFNLEVBQUUsQ0FBQ0osRUFBRSxDQUFDSyxRQUFILENBQVlDLE1BQWIsQ0FIeUI7QUFLakNDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUVDLFNBQVMsSUFBSSxrREFEZjtBQUVKQyxJQUFBQSxnQkFBZ0IsRUFBRVYsRUFBRSxDQUFDVztBQUZqQixHQUx5QjtBQVVqQ0MsRUFBQUEsWUFBWSxFQUFFLHNCQUFVQyxLQUFWLEVBQWlCO0FBQzNCLFFBQUlDLE1BQU0sR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNILEtBQUssQ0FBQ0ksQ0FBZixDQUFiO0FBQ0EsUUFBSUMsTUFBTSxHQUFHSCxJQUFJLENBQUNDLEdBQUwsQ0FBU0gsS0FBSyxDQUFDTSxDQUFmLENBQWI7QUFDQSxRQUFJQyxPQUFPLEdBQUcsS0FBS0MsTUFBTCxDQUFZSixDQUFaLEdBQWNwQixTQUFkLEdBQTBCaUIsTUFBeEM7QUFDQSxRQUFJUSxPQUFPLEdBQUcsS0FBS0QsTUFBTCxDQUFZRixDQUFaLEdBQWN0QixTQUFkLEdBQTBCcUIsTUFBeEM7QUFFQSxRQUFJSyxLQUFLLEdBQUcsSUFBSUMsRUFBRSxDQUFDQyxXQUFQLEVBQVo7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRyxRQUFOLEdBQWlCLEtBQUtDLE1BQUwsR0FBYzlCLFNBQWQsR0FBMEJpQixNQUEzQztBQUNBUyxJQUFBQSxLQUFLLENBQUNLLEdBQU4sR0FBWSxJQUFJSixFQUFFLENBQUNLLElBQVAsQ0FBWVQsT0FBWixFQUFxQkUsT0FBckIsQ0FBWjtBQUVBLFdBQU9DLEtBQVA7QUFDSDtBQXJCZ0MsQ0FBVCxDQUE1QjtBQXdCQXZCLEVBQUUsQ0FBQ0QscUJBQUgsR0FBMkIrQixNQUFNLENBQUNDLE9BQVAsR0FBaUJoQyxxQkFBNUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBQVE1fUkFUSU8gPSByZXF1aXJlKCcuLi9DQ1BoeXNpY3NUeXBlcycpLlBUTV9SQVRJTztcblxuLyoqXG4gKiBAY2xhc3MgUGh5c2ljc0NpcmNsZUNvbGxpZGVyXG4gKiBAZXh0ZW5kcyBQaHlzaWNzQ29sbGlkZXJcbiAqIEB1c2VzIENvbGxpZGVyLkNpcmNsZVxuICovXG52YXIgUGh5c2ljc0NpcmNsZUNvbGxpZGVyID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5QaHlzaWNzQ2lyY2xlQ29sbGlkZXInLFxuICAgIGV4dGVuZHM6IGNjLlBoeXNpY3NDb2xsaWRlcixcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5DaXJjbGVdLFxuXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1lbnU6IENDX0VESVRPUiAmJiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnBoeXNpY3MvQ29sbGlkZXIvQ2lyY2xlJyxcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuUmlnaWRCb2R5XG4gICAgfSxcblxuICAgIF9jcmVhdGVTaGFwZTogZnVuY3Rpb24gKHNjYWxlKSB7XG4gICAgICAgIHZhciBzY2FsZVggPSBNYXRoLmFicyhzY2FsZS54KTtcbiAgICAgICAgdmFyIHNjYWxlWSA9IE1hdGguYWJzKHNjYWxlLnkpO1xuICAgICAgICB2YXIgb2Zmc2V0WCA9IHRoaXMub2Zmc2V0LngvUFRNX1JBVElPICogc2NhbGVYO1xuICAgICAgICB2YXIgb2Zmc2V0WSA9IHRoaXMub2Zmc2V0LnkvUFRNX1JBVElPICogc2NhbGVZO1xuXG4gICAgICAgIHZhciBzaGFwZSA9IG5ldyBiMi5DaXJjbGVTaGFwZSgpO1xuICAgICAgICBzaGFwZS5tX3JhZGl1cyA9IHRoaXMucmFkaXVzIC8gUFRNX1JBVElPICogc2NhbGVYO1xuICAgICAgICBzaGFwZS5tX3AgPSBuZXcgYjIuVmVjMihvZmZzZXRYLCBvZmZzZXRZKTtcblxuICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgfVxufSk7XG5cbmNjLlBoeXNpY3NDaXJjbGVDb2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0NpcmNsZUNvbGxpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=