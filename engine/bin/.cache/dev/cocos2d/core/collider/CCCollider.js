
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/collider/CCCollider.js';
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
 * !#en Collider component base class.
 * !#zh 碰撞组件基类
 * @class Collider
 * @extends Component
 */
var Collider = cc.Class({
  name: 'cc.Collider',
  "extends": cc.Component,
  properties: {
    editing: {
      "default": false,
      serializable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.collider.editing'
    },

    /**
     * !#en Tag. If a node has several collider components, you can judge which type of collider is collided according to the tag.
     * !#zh 标签。当一个节点上有多个碰撞组件时，在发生碰撞后，可以使用此标签来判断是节点上的哪个碰撞组件被碰撞了。
     * @property tag
     * @type {Integer}
     * @default 0
     */
    tag: {
      tooltip: CC_DEV && 'i18n:COMPONENT.physics.physics_collider.tag',
      "default": 0,
      range: [0, 10e6],
      type: cc.Integer
    }
  },
  onDisable: function onDisable() {
    cc.director.getCollisionManager().removeCollider(this);
  },
  onEnable: function onEnable() {
    cc.director.getCollisionManager().addCollider(this);
  }
});
cc.Collider = module.exports = Collider;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbGxpZGVyL0NDQ29sbGlkZXIuanMiXSwibmFtZXMiOlsiQ29sbGlkZXIiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJlZGl0aW5nIiwic2VyaWFsaXphYmxlIiwidG9vbHRpcCIsIkNDX0RFViIsInRhZyIsInJhbmdlIiwidHlwZSIsIkludGVnZXIiLCJvbkRpc2FibGUiLCJkaXJlY3RvciIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJyZW1vdmVDb2xsaWRlciIsIm9uRW5hYmxlIiwiYWRkQ29sbGlkZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOzs7Ozs7QUFNQSxJQUFJQSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3BCQyxFQUFBQSxJQUFJLEVBQUUsYUFEYztBQUVwQixhQUFTRixFQUFFLENBQUNHLFNBRlE7QUFJcEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxPQUFPLEVBQUU7QUFDTCxpQkFBUyxLQURKO0FBRUxDLE1BQUFBLFlBQVksRUFBRSxLQUZUO0FBR0xDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJO0FBSGQsS0FERDs7QUFPUjs7Ozs7OztBQU9BQyxJQUFBQSxHQUFHLEVBQUU7QUFDREYsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUksNkNBRGxCO0FBRUQsaUJBQVMsQ0FGUjtBQUdERSxNQUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFELEVBQUksSUFBSixDQUhOO0FBSURDLE1BQUFBLElBQUksRUFBRVgsRUFBRSxDQUFDWTtBQUpSO0FBZEcsR0FKUTtBQTBCcEJDLEVBQUFBLFNBQVMsRUFBRSxxQkFBWTtBQUNuQmIsSUFBQUEsRUFBRSxDQUFDYyxRQUFILENBQVlDLG1CQUFaLEdBQWtDQyxjQUFsQyxDQUFpRCxJQUFqRDtBQUNILEdBNUJtQjtBQThCcEJDLEVBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQmpCLElBQUFBLEVBQUUsQ0FBQ2MsUUFBSCxDQUFZQyxtQkFBWixHQUFrQ0csV0FBbEMsQ0FBOEMsSUFBOUM7QUFDSDtBQWhDbUIsQ0FBVCxDQUFmO0FBbUNBbEIsRUFBRSxDQUFDRCxRQUFILEdBQWNvQixNQUFNLENBQUNDLE9BQVAsR0FBaUJyQixRQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuIENvbGxpZGVyIGNvbXBvbmVudCBiYXNlIGNsYXNzLlxuICogISN6aCDnorDmkp7nu4Tku7bln7rnsbtcbiAqIEBjbGFzcyBDb2xsaWRlclxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbnZhciBDb2xsaWRlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuQ29sbGlkZXInLFxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgZWRpdGluZzoge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5jb2xsaWRlci5lZGl0aW5nJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRhZy4gSWYgYSBub2RlIGhhcyBzZXZlcmFsIGNvbGxpZGVyIGNvbXBvbmVudHMsIHlvdSBjYW4ganVkZ2Ugd2hpY2ggdHlwZSBvZiBjb2xsaWRlciBpcyBjb2xsaWRlZCBhY2NvcmRpbmcgdG8gdGhlIHRhZy5cbiAgICAgICAgICogISN6aCDmoIfnrb7jgILlvZPkuIDkuKroioLngrnkuIrmnInlpJrkuKrnorDmkp7nu4Tku7bml7bvvIzlnKjlj5HnlJ/norDmkp7lkI7vvIzlj6/ku6Xkvb/nlKjmraTmoIfnrb7mnaXliKTmlq3mmK/oioLngrnkuIrnmoTlk6rkuKrnorDmkp7nu4Tku7booqvnorDmkp7kuobjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHRhZ1xuICAgICAgICAgKiBAdHlwZSB7SW50ZWdlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgdGFnOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBoeXNpY3MucGh5c2ljc19jb2xsaWRlci50YWcnLCAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBlNl0sXG4gICAgICAgICAgICB0eXBlOiBjYy5JbnRlZ2VyXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5yZW1vdmVDb2xsaWRlcih0aGlzKTtcbiAgICB9LFxuXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmFkZENvbGxpZGVyKHRoaXMpO1xuICAgIH1cbn0pO1xuXG5jYy5Db2xsaWRlciA9IG1vZHVsZS5leHBvcnRzID0gQ29sbGlkZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==