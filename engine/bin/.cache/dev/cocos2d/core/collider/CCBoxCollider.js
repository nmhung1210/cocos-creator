
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCBoxCollider.js';
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

/**
 * !#en Defines a Box Collider .
 * !#zh 用来定义包围盒碰撞体
 * @class Collider.Box
 */
cc.Collider.Box = cc.Class({
  properties: {
    _offset: cc.v2(0, 0),
    _size: cc.size(100, 100),

    /**
     * !#en Position offset
     * !#zh 位置偏移量
     * @property offset
     * @type {Vec2}
     */
    offset: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.offset',
      get: function get() {
        return this._offset;
      },
      set: function set(value) {
        this._offset = value;
      },
      type: cc.Vec2
    },

    /**
     * !#en Box size
     * !#zh 包围盒大小
     * @property size
     * @type {Size}
     */
    size: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.size',
      get: function get() {
        return this._size;
      },
      set: function set(value) {
        this._size.width = value.width < 0 ? 0 : value.width;
        this._size.height = value.height < 0 ? 0 : value.height;
      },
      type: cc.Size
    }
  },
  resetInEditor: CC_EDITOR && function (didResetToDefault) {
    if (didResetToDefault) {
      var size = this.node.getContentSize();

      if (size.width !== 0 && size.height !== 0) {
        this.size = cc.size(size);
        this.offset.x = (0.5 - this.node.anchorX) * size.width;
        this.offset.y = (0.5 - this.node.anchorY) * size.height;
      }
    }
  }
});
/**
 * !#en Box Collider.
 * !#zh 包围盒碰撞组件
 * @class BoxCollider
 * @extends Collider
 * @uses Collider.Box
 */

/**
 * !#en
 * Collider info in world coordinate.
 * !#zh
 * 碰撞体的世界坐标系下的信息。
 * @property {ColliderInfo} world
 */

var BoxCollider = cc.Class({
  name: 'cc.BoxCollider',
  "extends": cc.Collider,
  mixins: [cc.Collider.Box],
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.collider/Box Collider'
  }
});
cc.BoxCollider = module.exports = BoxCollider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDQm94Q29sbGlkZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDb2xsaWRlciIsIkJveCIsIkNsYXNzIiwicHJvcGVydGllcyIsIl9vZmZzZXQiLCJ2MiIsIl9zaXplIiwic2l6ZSIsIm9mZnNldCIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsInR5cGUiLCJWZWMyIiwid2lkdGgiLCJoZWlnaHQiLCJTaXplIiwicmVzZXRJbkVkaXRvciIsIkNDX0VESVRPUiIsImRpZFJlc2V0VG9EZWZhdWx0Iiwibm9kZSIsImdldENvbnRlbnRTaXplIiwieCIsImFuY2hvclgiLCJ5IiwiYW5jaG9yWSIsIkJveENvbGxpZGVyIiwibmFtZSIsIm1peGlucyIsImVkaXRvciIsIm1lbnUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7OztBQUtBQSxFQUFFLENBQUNDLFFBQUgsQ0FBWUMsR0FBWixHQUFrQkYsRUFBRSxDQUFDRyxLQUFILENBQVM7QUFDdkJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUVMLEVBQUUsQ0FBQ00sRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFULENBREQ7QUFFUkMsSUFBQUEsS0FBSyxFQUFFUCxFQUFFLENBQUNRLElBQUgsQ0FBUSxHQUFSLEVBQWEsR0FBYixDQUZDOztBQUlSOzs7Ozs7QUFNQUMsSUFBQUEsTUFBTSxFQUFFO0FBQ0pDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLGdEQURmO0FBRUpDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLUCxPQUFaO0FBQ0gsT0FKRztBQUtKUSxNQUFBQSxHQUFHLEVBQUUsYUFBVUMsS0FBVixFQUFpQjtBQUNsQixhQUFLVCxPQUFMLEdBQWVTLEtBQWY7QUFDSCxPQVBHO0FBUUpDLE1BQUFBLElBQUksRUFBRWYsRUFBRSxDQUFDZ0I7QUFSTCxLQVZBOztBQXFCUjs7Ozs7O0FBTUFSLElBQUFBLElBQUksRUFBRTtBQUNGRSxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw4Q0FEakI7QUFFRkMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtMLEtBQVo7QUFDSCxPQUpDO0FBS0ZNLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLGFBQUtQLEtBQUwsQ0FBV1UsS0FBWCxHQUFtQkgsS0FBSyxDQUFDRyxLQUFOLEdBQWMsQ0FBZCxHQUFrQixDQUFsQixHQUFzQkgsS0FBSyxDQUFDRyxLQUEvQztBQUNBLGFBQUtWLEtBQUwsQ0FBV1csTUFBWCxHQUFvQkosS0FBSyxDQUFDSSxNQUFOLEdBQWUsQ0FBZixHQUFtQixDQUFuQixHQUF1QkosS0FBSyxDQUFDSSxNQUFqRDtBQUNILE9BUkM7QUFTRkgsTUFBQUEsSUFBSSxFQUFFZixFQUFFLENBQUNtQjtBQVRQO0FBM0JFLEdBRFc7QUF5Q3ZCQyxFQUFBQSxhQUFhLEVBQUVDLFNBQVMsSUFBSSxVQUFVQyxpQkFBVixFQUE2QjtBQUNyRCxRQUFJQSxpQkFBSixFQUF1QjtBQUNuQixVQUFJZCxJQUFJLEdBQUcsS0FBS2UsSUFBTCxDQUFVQyxjQUFWLEVBQVg7O0FBQ0EsVUFBSWhCLElBQUksQ0FBQ1MsS0FBTCxLQUFlLENBQWYsSUFBb0JULElBQUksQ0FBQ1UsTUFBTCxLQUFnQixDQUF4QyxFQUEyQztBQUN2QyxhQUFLVixJQUFMLEdBQVlSLEVBQUUsQ0FBQ1EsSUFBSCxDQUFTQSxJQUFULENBQVo7QUFDQSxhQUFLQyxNQUFMLENBQVlnQixDQUFaLEdBQWdCLENBQUMsTUFBTSxLQUFLRixJQUFMLENBQVVHLE9BQWpCLElBQTRCbEIsSUFBSSxDQUFDUyxLQUFqRDtBQUNBLGFBQUtSLE1BQUwsQ0FBWWtCLENBQVosR0FBZ0IsQ0FBQyxNQUFNLEtBQUtKLElBQUwsQ0FBVUssT0FBakIsSUFBNEJwQixJQUFJLENBQUNVLE1BQWpEO0FBQ0g7QUFDSjtBQUNKO0FBbERzQixDQUFULENBQWxCO0FBcURBOzs7Ozs7OztBQU9BOzs7Ozs7OztBQU9BLElBQUlXLFdBQVcsR0FBRzdCLEVBQUUsQ0FBQ0csS0FBSCxDQUFTO0FBQ3ZCMkIsRUFBQUEsSUFBSSxFQUFFLGdCQURpQjtBQUV2QixhQUFTOUIsRUFBRSxDQUFDQyxRQUZXO0FBR3ZCOEIsRUFBQUEsTUFBTSxFQUFFLENBQUMvQixFQUFFLENBQUNDLFFBQUgsQ0FBWUMsR0FBYixDQUhlO0FBS3ZCOEIsRUFBQUEsTUFBTSxFQUFFWCxTQUFTLElBQUk7QUFDakJZLElBQUFBLElBQUksRUFBRTtBQURXO0FBTEUsQ0FBVCxDQUFsQjtBQVVBakMsRUFBRSxDQUFDNkIsV0FBSCxHQUFpQkssTUFBTSxDQUFDQyxPQUFQLEdBQWlCTixXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG4vKipcbiAqICEjZW4gRGVmaW5lcyBhIEJveCBDb2xsaWRlciAuXG4gKiAhI3poIOeUqOadpeWumuS5ieWMheWbtOebkueisOaSnuS9k1xuICogQGNsYXNzIENvbGxpZGVyLkJveFxuICovXG5jYy5Db2xsaWRlci5Cb3ggPSBjYy5DbGFzcyh7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfb2Zmc2V0OiBjYy52MigwLCAwKSxcbiAgICAgICAgX3NpemU6IGNjLnNpemUoMTAwLCAxMDApLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFBvc2l0aW9uIG9mZnNldFxuICAgICAgICAgKiAhI3poIOS9jee9ruWBj+enu+mHj1xuICAgICAgICAgKiBAcHJvcGVydHkgb2Zmc2V0XG4gICAgICAgICAqIEB0eXBlIHtWZWMyfVxuICAgICAgICAgKi9cbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci5vZmZzZXQnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29mZnNldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IGNjLlZlYzJcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBCb3ggc2l6ZVxuICAgICAgICAgKiAhI3poIOWMheWbtOebkuWkp+Wwj1xuICAgICAgICAgKiBAcHJvcGVydHkgc2l6ZVxuICAgICAgICAgKiBAdHlwZSB7U2l6ZX1cbiAgICAgICAgICovXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGh5c2ljcy5waHlzaWNzX2NvbGxpZGVyLnNpemUnLCAgICAgICAgICAgIFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplLndpZHRoID0gdmFsdWUud2lkdGggPCAwID8gMCA6IHZhbHVlLndpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpemUuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0IDwgMCA/IDAgOiB2YWx1ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogY2MuU2l6ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlc2V0SW5FZGl0b3I6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoZGlkUmVzZXRUb0RlZmF1bHQpIHtcbiAgICAgICAgaWYgKGRpZFJlc2V0VG9EZWZhdWx0KSB7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHNpemUud2lkdGggIT09IDAgJiYgc2l6ZS5oZWlnaHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBjYy5zaXplKCBzaXplICk7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZzZXQueCA9ICgwLjUgLSB0aGlzLm5vZGUuYW5jaG9yWCkgKiBzaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMub2Zmc2V0LnkgPSAoMC41IC0gdGhpcy5ub2RlLmFuY2hvclkpICogc2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuIEJveCBDb2xsaWRlci5cbiAqICEjemgg5YyF5Zu055uS56Kw5pKe57uE5Lu2XG4gKiBAY2xhc3MgQm94Q29sbGlkZXJcbiAqIEBleHRlbmRzIENvbGxpZGVyXG4gKiBAdXNlcyBDb2xsaWRlci5Cb3hcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBDb2xsaWRlciBpbmZvIGluIHdvcmxkIGNvb3JkaW5hdGUuXG4gKiAhI3poXG4gKiDnorDmkp7kvZPnmoTkuJbnlYzlnZDmoIfns7vkuIvnmoTkv6Hmga/jgIJcbiAqIEBwcm9wZXJ0eSB7Q29sbGlkZXJJbmZvfSB3b3JsZFxuICovXG52YXIgQm94Q29sbGlkZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLkJveENvbGxpZGVyJyxcbiAgICBleHRlbmRzOiBjYy5Db2xsaWRlcixcbiAgICBtaXhpbnM6IFtjYy5Db2xsaWRlci5Cb3hdLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LmNvbGxpZGVyL0JveCBDb2xsaWRlcicsXG4gICAgfVxufSk7XG5cbmNjLkJveENvbGxpZGVyID0gbW9kdWxlLmV4cG9ydHMgPSBCb3hDb2xsaWRlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9