
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/collider/CCPhysicsBoxCollider.js';
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
 * @class PhysicsBoxCollider
 * @extends PhysicsCollider
 * @uses Collider.Box
 */


var PhysicsBoxCollider = cc.Class({
  name: 'cc.PhysicsBoxCollider',
  "extends": cc.PhysicsCollider,
  mixins: [cc.Collider.Box],
  editor: {
    menu: CC_EDITOR && 'i18n:MAIN_MENU.component.physics/Collider/Box',
    requireComponent: cc.RigidBody
  },
  _createShape: function _createShape(scale) {
    var scaleX = Math.abs(scale.x);
    var scaleY = Math.abs(scale.y);
    var width = this.size.width / 2 / PTM_RATIO * scaleX;
    var height = this.size.height / 2 / PTM_RATIO * scaleY;
    var offsetX = this.offset.x / PTM_RATIO * scaleX;
    var offsetY = this.offset.y / PTM_RATIO * scaleY;
    var shape = new b2.PolygonShape();
    shape.SetAsBox(width, height, new b2.Vec2(offsetX, offsetY), 0);
    return shape;
  }
});
cc.PhysicsBoxCollider = module.exports = PhysicsBoxCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvY29sbGlkZXIvQ0NQaHlzaWNzQm94Q29sbGlkZXIuanMiXSwibmFtZXMiOlsiUFRNX1JBVElPIiwicmVxdWlyZSIsIlBoeXNpY3NCb3hDb2xsaWRlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiUGh5c2ljc0NvbGxpZGVyIiwibWl4aW5zIiwiQ29sbGlkZXIiLCJCb3giLCJlZGl0b3IiLCJtZW51IiwiQ0NfRURJVE9SIiwicmVxdWlyZUNvbXBvbmVudCIsIlJpZ2lkQm9keSIsIl9jcmVhdGVTaGFwZSIsInNjYWxlIiwic2NhbGVYIiwiTWF0aCIsImFicyIsIngiLCJzY2FsZVkiLCJ5Iiwid2lkdGgiLCJzaXplIiwiaGVpZ2h0Iiwib2Zmc2V0WCIsIm9mZnNldCIsIm9mZnNldFkiLCJzaGFwZSIsImIyIiwiUG9seWdvblNoYXBlIiwiU2V0QXNCb3giLCJWZWMyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFNBQVMsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQVAsQ0FBNkJELFNBQTdDO0FBRUE7Ozs7Ozs7QUFLQSxJQUFJRSxrQkFBa0IsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDOUJDLEVBQUFBLElBQUksRUFBRSx1QkFEd0I7QUFFOUIsYUFBU0YsRUFBRSxDQUFDRyxlQUZrQjtBQUc5QkMsRUFBQUEsTUFBTSxFQUFFLENBQUNKLEVBQUUsQ0FBQ0ssUUFBSCxDQUFZQyxHQUFiLENBSHNCO0FBSzlCQyxFQUFBQSxNQUFNLEVBQUU7QUFDSkMsSUFBQUEsSUFBSSxFQUFFQyxTQUFTLElBQUksK0NBRGY7QUFFSkMsSUFBQUEsZ0JBQWdCLEVBQUVWLEVBQUUsQ0FBQ1c7QUFGakIsR0FMc0I7QUFVOUJDLEVBQUFBLFlBQVksRUFBRSxzQkFBVUMsS0FBVixFQUFpQjtBQUMzQixRQUFJQyxNQUFNLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTSCxLQUFLLENBQUNJLENBQWYsQ0FBYjtBQUNBLFFBQUlDLE1BQU0sR0FBR0gsSUFBSSxDQUFDQyxHQUFMLENBQVNILEtBQUssQ0FBQ00sQ0FBZixDQUFiO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLElBQUwsQ0FBVUQsS0FBVixHQUFnQixDQUFoQixHQUFrQnZCLFNBQWxCLEdBQThCaUIsTUFBMUM7QUFDQSxRQUFJUSxNQUFNLEdBQUcsS0FBS0QsSUFBTCxDQUFVQyxNQUFWLEdBQWlCLENBQWpCLEdBQW1CekIsU0FBbkIsR0FBK0JxQixNQUE1QztBQUNBLFFBQUlLLE9BQU8sR0FBRyxLQUFLQyxNQUFMLENBQVlQLENBQVosR0FBY3BCLFNBQWQsR0FBeUJpQixNQUF2QztBQUNBLFFBQUlXLE9BQU8sR0FBRyxLQUFLRCxNQUFMLENBQVlMLENBQVosR0FBY3RCLFNBQWQsR0FBeUJxQixNQUF2QztBQUVBLFFBQUlRLEtBQUssR0FBRyxJQUFJQyxFQUFFLENBQUNDLFlBQVAsRUFBWjtBQUNBRixJQUFBQSxLQUFLLENBQUNHLFFBQU4sQ0FBZVQsS0FBZixFQUFzQkUsTUFBdEIsRUFBOEIsSUFBSUssRUFBRSxDQUFDRyxJQUFQLENBQVlQLE9BQVosRUFBcUJFLE9BQXJCLENBQTlCLEVBQTZELENBQTdEO0FBQ0EsV0FBT0MsS0FBUDtBQUNIO0FBckI2QixDQUFULENBQXpCO0FBd0JBMUIsRUFBRSxDQUFDRCxrQkFBSCxHQUF3QmdDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpDLGtCQUF6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFBUTV9SQVRJTyA9IHJlcXVpcmUoJy4uL0NDUGh5c2ljc1R5cGVzJykuUFRNX1JBVElPO1xuXG4vKipcbiAqIEBjbGFzcyBQaHlzaWNzQm94Q29sbGlkZXJcbiAqIEBleHRlbmRzIFBoeXNpY3NDb2xsaWRlclxuICogQHVzZXMgQ29sbGlkZXIuQm94XG4gKi9cbnZhciBQaHlzaWNzQm94Q29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlBoeXNpY3NCb3hDb2xsaWRlcicsXG4gICAgZXh0ZW5kczogY2MuUGh5c2ljc0NvbGxpZGVyLFxuICAgIG1peGluczogW2NjLkNvbGxpZGVyLkJveF0sXG5cbiAgICBlZGl0b3I6IHtcbiAgICAgICAgbWVudTogQ0NfRURJVE9SICYmICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQucGh5c2ljcy9Db2xsaWRlci9Cb3gnLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBjYy5SaWdpZEJvZHlcbiAgICB9LFxuXG4gICAgX2NyZWF0ZVNoYXBlOiBmdW5jdGlvbiAoc2NhbGUpIHtcbiAgICAgICAgdmFyIHNjYWxlWCA9IE1hdGguYWJzKHNjYWxlLngpO1xuICAgICAgICB2YXIgc2NhbGVZID0gTWF0aC5hYnMoc2NhbGUueSk7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuc2l6ZS53aWR0aC8yL1BUTV9SQVRJTyAqIHNjYWxlWDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuc2l6ZS5oZWlnaHQvMi9QVE1fUkFUSU8gKiBzY2FsZVk7XG4gICAgICAgIHZhciBvZmZzZXRYID0gdGhpcy5vZmZzZXQueC9QVE1fUkFUSU8gKnNjYWxlWDtcbiAgICAgICAgdmFyIG9mZnNldFkgPSB0aGlzLm9mZnNldC55L1BUTV9SQVRJTyAqc2NhbGVZO1xuXG4gICAgICAgIHZhciBzaGFwZSA9IG5ldyBiMi5Qb2x5Z29uU2hhcGUoKTtcbiAgICAgICAgc2hhcGUuU2V0QXNCb3god2lkdGgsIGhlaWdodCwgbmV3IGIyLlZlYzIob2Zmc2V0WCwgb2Zmc2V0WSksIDApO1xuICAgICAgICByZXR1cm4gc2hhcGU7XG4gICAgfVxufSk7XG5cbmNjLlBoeXNpY3NCb3hDb2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0JveENvbGxpZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=