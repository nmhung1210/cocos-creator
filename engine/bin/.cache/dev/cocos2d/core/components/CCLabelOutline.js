
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLabelOutline.js';
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
 * !#en Outline effect used to change the display, only for system fonts or TTF fonts
 * !#zh 描边效果组件,用于字体描边,只能用于系统字体
 * @class LabelOutline
 * @extends Component
 * @example
 *  // Create a new node and add label components.
 *  var node = new cc.Node("New Label");
 *  var label = node.addComponent(cc.Label);
 *  label.string = "hello world";
 *  var outline = node.addComponent(cc.LabelOutline);
 *  node.parent = this.node;
 */
var LabelOutline = cc.Class({
  name: 'cc.LabelOutline',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.renderers/LabelOutline',
    executeInEditMode: true,
    requireComponent: cc.Label
  },
  properties: {
    _color: cc.Color.WHITE,
    _width: 1,

    /**
     * !#en outline color
     * !#zh 改变描边的颜色
     * @property color
     * @type {Color}
     * @example
     * outline.color = cc.Color.BLACK;
     */
    color: {
      tooltip: CC_DEV && 'i18n:COMPONENT.outline.color',
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);
        }

        this._updateRenderData();
      }
    },

    /**
     * !#en Change the outline width
     * !#zh 改变描边的宽度
     * @property width
     * @type {Number}
     * @example
     * outline.width = 3;
     */
    width: {
      tooltip: CC_DEV && 'i18n:COMPONENT.outline.width',
      get: function get() {
        return this._width;
      },
      set: function set(value) {
        if (this._width === value) return;
        this._width = value;

        this._updateRenderData();
      },
      range: [0, 512]
    }
  },
  onEnable: function onEnable() {
    this._updateRenderData();
  },
  onDisable: function onDisable() {
    this._updateRenderData();
  },
  _updateRenderData: function _updateRenderData() {
    var label = this.node.getComponent(cc.Label);

    if (label) {
      label.setVertsDirty();
    }
  }
});
cc.LabelOutline = module.exports = LabelOutline;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYWJlbE91dGxpbmUuanMiXSwibmFtZXMiOlsiTGFiZWxPdXRsaW5lIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJyZXF1aXJlIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicmVxdWlyZUNvbXBvbmVudCIsIkxhYmVsIiwicHJvcGVydGllcyIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJfd2lkdGgiLCJjb2xvciIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJjbG9uZSIsInNldCIsInZhbHVlIiwiZXF1YWxzIiwiX3VwZGF0ZVJlbmRlckRhdGEiLCJ3aWR0aCIsInJhbmdlIiwib25FbmFibGUiLCJvbkRpc2FibGUiLCJsYWJlbCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJzZXRWZXJ0c0RpcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7Ozs7OztBQWNBLElBQUlBLFlBQVksR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDeEJDLEVBQUFBLElBQUksRUFBRSxpQkFEa0I7QUFFeEIsYUFBU0MsT0FBTyxDQUFDLGVBQUQsQ0FGUTtBQUd4QkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSxpREFEVztBQUVqQkMsSUFBQUEsaUJBQWlCLEVBQUUsSUFGRjtBQUdqQkMsSUFBQUEsZ0JBQWdCLEVBQUVSLEVBQUUsQ0FBQ1M7QUFISixHQUhHO0FBU3hCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFWCxFQUFFLENBQUNZLEtBQUgsQ0FBU0MsS0FEVDtBQUVSQyxJQUFBQSxNQUFNLEVBQUUsQ0FGQTs7QUFJUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQURoQjtBQUVIQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS1AsTUFBTCxDQUFZUSxLQUFaLEVBQVA7QUFDSCxPQUpFO0FBS0hDLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLFlBQUksQ0FBQyxLQUFLVixNQUFMLENBQVlXLE1BQVosQ0FBbUJELEtBQW5CLENBQUwsRUFBZ0M7QUFDNUIsZUFBS1YsTUFBTCxDQUFZUyxHQUFaLENBQWdCQyxLQUFoQjtBQUNIOztBQUNELGFBQUtFLGlCQUFMO0FBQ0g7QUFWRSxLQVpDOztBQXlCUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hSLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQURoQjtBQUVIQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osTUFBWjtBQUNILE9BSkU7QUFLSE0sTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsWUFBSSxLQUFLUCxNQUFMLEtBQWdCTyxLQUFwQixFQUEyQjtBQUUzQixhQUFLUCxNQUFMLEdBQWNPLEtBQWQ7O0FBQ0EsYUFBS0UsaUJBQUw7QUFDSCxPQVZFO0FBV0hFLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxHQUFKO0FBWEo7QUFqQ0MsR0FUWTtBQXlEeEJDLEVBQUFBLFFBekR3QixzQkF5RFo7QUFDUixTQUFLSCxpQkFBTDtBQUNILEdBM0R1QjtBQTZEeEJJLEVBQUFBLFNBN0R3Qix1QkE2RFg7QUFDVCxTQUFLSixpQkFBTDtBQUNILEdBL0R1QjtBQWlFeEJBLEVBQUFBLGlCQWpFd0IsK0JBaUVIO0FBQ2pCLFFBQUlLLEtBQUssR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUI5QixFQUFFLENBQUNTLEtBQTFCLENBQVo7O0FBQ0EsUUFBSW1CLEtBQUosRUFBVztBQUNQQSxNQUFBQSxLQUFLLENBQUNHLGFBQU47QUFDSDtBQUNKO0FBdEV1QixDQUFULENBQW5CO0FBMEVBL0IsRUFBRSxDQUFDRCxZQUFILEdBQWtCaUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEMsWUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuIE91dGxpbmUgZWZmZWN0IHVzZWQgdG8gY2hhbmdlIHRoZSBkaXNwbGF5LCBvbmx5IGZvciBzeXN0ZW0gZm9udHMgb3IgVFRGIGZvbnRzXG4gKiAhI3poIOaPj+i+ueaViOaenOe7hOS7tiznlKjkuo7lrZfkvZPmj4/ovrks5Y+q6IO955So5LqO57O757uf5a2X5L2TXG4gKiBAY2xhc3MgTGFiZWxPdXRsaW5lXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEBleGFtcGxlXG4gKiAgLy8gQ3JlYXRlIGEgbmV3IG5vZGUgYW5kIGFkZCBsYWJlbCBjb21wb25lbnRzLlxuICogIHZhciBub2RlID0gbmV3IGNjLk5vZGUoXCJOZXcgTGFiZWxcIik7XG4gKiAgdmFyIGxhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICogIGxhYmVsLnN0cmluZyA9IFwiaGVsbG8gd29ybGRcIjtcbiAqICB2YXIgb3V0bGluZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XG4gKiAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gKi9cblxubGV0IExhYmVsT3V0bGluZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTGFiZWxPdXRsaW5lJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbE91dGxpbmUnLFxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgX3dpZHRoOiAxLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIG91dGxpbmUgY29sb3JcbiAgICAgICAgICogISN6aCDmlLnlj5jmj4/ovrnnmoTpopzoibJcbiAgICAgICAgICogQHByb3BlcnR5IGNvbG9yXG4gICAgICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogb3V0bGluZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgKi9cbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQub3V0bGluZS5jb2xvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3IuY2xvbmUoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ2hhbmdlIHRoZSBvdXRsaW5lIHdpZHRoXG4gICAgICAgICAqICEjemgg5pS55Y+Y5o+P6L6555qE5a695bqmXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBvdXRsaW5lLndpZHRoID0gMztcbiAgICAgICAgICovXG4gICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULm91dGxpbmUud2lkdGgnLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dpZHRoID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmFuZ2U6IFswLCA1MTJdLFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICB0aGlzLl91cGRhdGVSZW5kZXJEYXRhKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVSZW5kZXJEYXRhICgpIHtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgbGFiZWwuc2V0VmVydHNEaXJ0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59KTtcblxuY2MuTGFiZWxPdXRsaW5lID0gbW9kdWxlLmV4cG9ydHMgPSBMYWJlbE91dGxpbmU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==