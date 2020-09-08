
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCBlockInputEvents.js';
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
var BlockEvents = ['touchstart', 'touchmove', 'touchend', 'mousedown', 'mousemove', 'mouseup', 'mouseenter', 'mouseleave', 'mousewheel'];

function stopPropagation(event) {
  event.stopPropagation();
}
/**
 * !#en
 * This component will block all input events (mouse and touch) within the bounding box of the node, preventing the input from penetrating into the underlying node, typically for the background of the top UI.<br>
 * This component does not have any API interface and can be added directly to the scene to take effect.
 * !#zh
 * 该组件将拦截所属节点 bounding box 内的所有输入事件（鼠标和触摸），防止输入穿透到下层节点，一般用于上层 UI 的背景。<br>
 * 该组件没有任何 API 接口，直接添加到场景即可生效。
 *
 * @class BlockInputEvents
 * @extends Component
 */


var BlockInputEvents = cc.Class({
  name: 'cc.BlockInputEvents',
  "extends": require('./CCComponent'),
  editor: {
    menu: 'i18n:MAIN_MENU.component.ui/Block Input Events',
    inspector: 'packages://inspector/inspectors/comps/block-input-events.js',
    help: 'i18n:COMPONENT.help_url.block_input_events'
  },
  onEnable: function onEnable() {
    for (var i = 0; i < BlockEvents.length; i++) {
      // supply the 'this' parameter so that the callback could be added and removed correctly,
      // even if the same component is added more than once to a Node.
      this.node.on(BlockEvents[i], stopPropagation, this);
    }
  },
  onDisable: function onDisable() {
    for (var i = 0; i < BlockEvents.length; i++) {
      this.node.off(BlockEvents[i], stopPropagation, this);
    }
  }
});
cc.BlockInputEvents = module.exports = BlockInputEvents;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NCbG9ja0lucHV0RXZlbnRzLmpzIl0sIm5hbWVzIjpbIkJsb2NrRXZlbnRzIiwic3RvcFByb3BhZ2F0aW9uIiwiZXZlbnQiLCJCbG9ja0lucHV0RXZlbnRzIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJyZXF1aXJlIiwiZWRpdG9yIiwibWVudSIsImluc3BlY3RvciIsImhlbHAiLCJvbkVuYWJsZSIsImkiLCJsZW5ndGgiLCJub2RlIiwib24iLCJvbkRpc2FibGUiLCJvZmYiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsV0FBVyxHQUFHLENBQUMsWUFBRCxFQUFlLFdBQWYsRUFBNEIsVUFBNUIsRUFDQyxXQURELEVBQ2MsV0FEZCxFQUMyQixTQUQzQixFQUVDLFlBRkQsRUFFZSxZQUZmLEVBRTZCLFlBRjdCLENBQXBCOztBQUlBLFNBQVNDLGVBQVQsQ0FBMEJDLEtBQTFCLEVBQWlDO0FBQzdCQSxFQUFBQSxLQUFLLENBQUNELGVBQU47QUFDSDtBQUVEOzs7Ozs7Ozs7Ozs7O0FBV0EsSUFBTUUsZ0JBQWdCLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQzlCQyxFQUFBQSxJQUFJLEVBQUUscUJBRHdCO0FBRTlCLGFBQVNDLE9BQU8sQ0FBQyxlQUFELENBRmM7QUFHOUJDLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUUsZ0RBREY7QUFFSkMsSUFBQUEsU0FBUyxFQUFFLDZEQUZQO0FBR0pDLElBQUFBLElBQUksRUFBRTtBQUhGLEdBSHNCO0FBUzlCQyxFQUFBQSxRQVQ4QixzQkFTbEI7QUFDUixTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdiLFdBQVcsQ0FBQ2MsTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekM7QUFDQTtBQUNBLFdBQUtFLElBQUwsQ0FBVUMsRUFBVixDQUFhaEIsV0FBVyxDQUFDYSxDQUFELENBQXhCLEVBQTZCWixlQUE3QixFQUE4QyxJQUE5QztBQUNIO0FBQ0osR0FmNkI7QUFnQjlCZ0IsRUFBQUEsU0FoQjhCLHVCQWdCakI7QUFDVCxTQUFLLElBQUlKLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdiLFdBQVcsQ0FBQ2MsTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsV0FBS0UsSUFBTCxDQUFVRyxHQUFWLENBQWNsQixXQUFXLENBQUNhLENBQUQsQ0FBekIsRUFBOEJaLGVBQTlCLEVBQStDLElBQS9DO0FBQ0g7QUFDSjtBQXBCNkIsQ0FBVCxDQUF6QjtBQXVCQUcsRUFBRSxDQUFDRCxnQkFBSCxHQUFzQmdCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpCLGdCQUF2QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgQmxvY2tFdmVudHMgPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgICdtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLFxuICAgICAgICAgICAgICAgICAgICAgJ21vdXNlZW50ZXInLCAnbW91c2VsZWF2ZScsICdtb3VzZXdoZWVsJ107XG5cbmZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBUaGlzIGNvbXBvbmVudCB3aWxsIGJsb2NrIGFsbCBpbnB1dCBldmVudHMgKG1vdXNlIGFuZCB0b3VjaCkgd2l0aGluIHRoZSBib3VuZGluZyBib3ggb2YgdGhlIG5vZGUsIHByZXZlbnRpbmcgdGhlIGlucHV0IGZyb20gcGVuZXRyYXRpbmcgaW50byB0aGUgdW5kZXJseWluZyBub2RlLCB0eXBpY2FsbHkgZm9yIHRoZSBiYWNrZ3JvdW5kIG9mIHRoZSB0b3AgVUkuPGJyPlxuICogVGhpcyBjb21wb25lbnQgZG9lcyBub3QgaGF2ZSBhbnkgQVBJIGludGVyZmFjZSBhbmQgY2FuIGJlIGFkZGVkIGRpcmVjdGx5IHRvIHRoZSBzY2VuZSB0byB0YWtlIGVmZmVjdC5cbiAqICEjemhcbiAqIOivpee7hOS7tuWwhuaLpuaIquaJgOWxnuiKgueCuSBib3VuZGluZyBib3gg5YaF55qE5omA5pyJ6L6T5YWl5LqL5Lu277yI6byg5qCH5ZKM6Kem5pG477yJ77yM6Ziy5q2i6L6T5YWl56m/6YCP5Yiw5LiL5bGC6IqC54K577yM5LiA6Iis55So5LqO5LiK5bGCIFVJIOeahOiDjOaZr+OAgjxicj5cbiAqIOivpee7hOS7tuayoeacieS7u+S9lSBBUEkg5o6l5Y+j77yM55u05o6l5re75Yqg5Yiw5Zy65pmv5Y2z5Y+v55Sf5pWI44CCXG4gKlxuICogQGNsYXNzIEJsb2NrSW5wdXRFdmVudHNcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5jb25zdCBCbG9ja0lucHV0RXZlbnRzID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5CbG9ja0lucHV0RXZlbnRzJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgZWRpdG9yOiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvQmxvY2sgSW5wdXQgRXZlbnRzJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9ibG9jay1pbnB1dC1ldmVudHMuanMnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuYmxvY2tfaW5wdXRfZXZlbnRzJyxcbiAgICB9LFxuXG4gICAgb25FbmFibGUgKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEJsb2NrRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBzdXBwbHkgdGhlICd0aGlzJyBwYXJhbWV0ZXIgc28gdGhhdCB0aGUgY2FsbGJhY2sgY291bGQgYmUgYWRkZWQgYW5kIHJlbW92ZWQgY29ycmVjdGx5LFxuICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgc2FtZSBjb21wb25lbnQgaXMgYWRkZWQgbW9yZSB0aGFuIG9uY2UgdG8gYSBOb2RlLlxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKEJsb2NrRXZlbnRzW2ldLCBzdG9wUHJvcGFnYXRpb24sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEJsb2NrRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKEJsb2NrRXZlbnRzW2ldLCBzdG9wUHJvcGFnYXRpb24sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLkJsb2NrSW5wdXRFdmVudHMgPSBtb2R1bGUuZXhwb3J0cyA9IEJsb2NrSW5wdXRFdmVudHM7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==