
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
        return this._color;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYWJlbE91dGxpbmUuanMiXSwibmFtZXMiOlsiTGFiZWxPdXRsaW5lIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJyZXF1aXJlIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicmVxdWlyZUNvbXBvbmVudCIsIkxhYmVsIiwicHJvcGVydGllcyIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJfd2lkdGgiLCJjb2xvciIsInRvb2x0aXAiLCJDQ19ERVYiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImVxdWFscyIsIl91cGRhdGVSZW5kZXJEYXRhIiwid2lkdGgiLCJyYW5nZSIsIm9uRW5hYmxlIiwib25EaXNhYmxlIiwibGFiZWwiLCJub2RlIiwiZ2V0Q29tcG9uZW50Iiwic2V0VmVydHNEaXJ0eSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7Ozs7Ozs7QUFjQSxJQUFJQSxZQUFZLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3hCQyxFQUFBQSxJQUFJLEVBQUUsaUJBRGtCO0FBRXhCLGFBQVNDLE9BQU8sQ0FBQyxlQUFELENBRlE7QUFHeEJDLEVBQUFBLE1BQU0sRUFBRUMsU0FBUyxJQUFJO0FBQ2pCQyxJQUFBQSxJQUFJLEVBQUUsaURBRFc7QUFFakJDLElBQUFBLGlCQUFpQixFQUFFLElBRkY7QUFHakJDLElBQUFBLGdCQUFnQixFQUFFUixFQUFFLENBQUNTO0FBSEosR0FIRztBQVN4QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRVgsRUFBRSxDQUFDWSxLQUFILENBQVNDLEtBRFQ7QUFFUkMsSUFBQUEsTUFBTSxFQUFFLENBRkE7O0FBSVI7Ozs7Ozs7O0FBUUFDLElBQUFBLEtBQUssRUFBRTtBQUNIQyxNQUFBQSxPQUFPLEVBQUVDLE1BQU0sSUFBSSw4QkFEaEI7QUFFSEMsTUFBQUEsR0FBRyxFQUFFLGVBQVk7QUFDYixlQUFPLEtBQUtQLE1BQVo7QUFDSCxPQUpFO0FBS0hRLE1BQUFBLEdBQUcsRUFBRSxhQUFVQyxLQUFWLEVBQWlCO0FBQ2xCLFlBQUksQ0FBQyxLQUFLVCxNQUFMLENBQVlVLE1BQVosQ0FBbUJELEtBQW5CLENBQUwsRUFBZ0M7QUFDNUIsZUFBS1QsTUFBTCxDQUFZUSxHQUFaLENBQWdCQyxLQUFoQjtBQUNIOztBQUNELGFBQUtFLGlCQUFMO0FBQ0g7QUFWRSxLQVpDOztBQXlCUjs7Ozs7Ozs7QUFRQUMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hQLE1BQUFBLE9BQU8sRUFBRUMsTUFBTSxJQUFJLDhCQURoQjtBQUVIQyxNQUFBQSxHQUFHLEVBQUUsZUFBWTtBQUNiLGVBQU8sS0FBS0osTUFBWjtBQUNILE9BSkU7QUFLSEssTUFBQUEsR0FBRyxFQUFFLGFBQVVDLEtBQVYsRUFBaUI7QUFDbEIsWUFBSSxLQUFLTixNQUFMLEtBQWdCTSxLQUFwQixFQUEyQjtBQUUzQixhQUFLTixNQUFMLEdBQWNNLEtBQWQ7O0FBQ0EsYUFBS0UsaUJBQUw7QUFDSCxPQVZFO0FBV0hFLE1BQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxHQUFKO0FBWEo7QUFqQ0MsR0FUWTtBQXlEeEJDLEVBQUFBLFFBekR3QixzQkF5RFo7QUFDUixTQUFLSCxpQkFBTDtBQUNILEdBM0R1QjtBQTZEeEJJLEVBQUFBLFNBN0R3Qix1QkE2RFg7QUFDVCxTQUFLSixpQkFBTDtBQUNILEdBL0R1QjtBQWlFeEJBLEVBQUFBLGlCQWpFd0IsK0JBaUVIO0FBQ2pCLFFBQUlLLEtBQUssR0FBRyxLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUI3QixFQUFFLENBQUNTLEtBQTFCLENBQVo7O0FBQ0EsUUFBSWtCLEtBQUosRUFBVztBQUNQQSxNQUFBQSxLQUFLLENBQUNHLGFBQU47QUFDSDtBQUNKO0FBdEV1QixDQUFULENBQW5CO0FBMEVBOUIsRUFBRSxDQUFDRCxZQUFILEdBQWtCZ0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCakMsWUFBbkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuIE91dGxpbmUgZWZmZWN0IHVzZWQgdG8gY2hhbmdlIHRoZSBkaXNwbGF5LCBvbmx5IGZvciBzeXN0ZW0gZm9udHMgb3IgVFRGIGZvbnRzXG4gKiAhI3poIOaPj+i+ueaViOaenOe7hOS7tiznlKjkuo7lrZfkvZPmj4/ovrks5Y+q6IO955So5LqO57O757uf5a2X5L2TXG4gKiBAY2xhc3MgTGFiZWxPdXRsaW5lXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqIEBleGFtcGxlXG4gKiAgLy8gQ3JlYXRlIGEgbmV3IG5vZGUgYW5kIGFkZCBsYWJlbCBjb21wb25lbnRzLlxuICogIHZhciBub2RlID0gbmV3IGNjLk5vZGUoXCJOZXcgTGFiZWxcIik7XG4gKiAgdmFyIGxhYmVsID0gbm9kZS5hZGRDb21wb25lbnQoY2MuTGFiZWwpO1xuICogIGxhYmVsLnN0cmluZyA9IFwiaGVsbG8gd29ybGRcIjtcbiAqICB2YXIgb3V0bGluZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSk7XG4gKiAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gKi9cblxubGV0IExhYmVsT3V0bGluZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTGFiZWxPdXRsaW5lJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnJlbmRlcmVycy9MYWJlbE91dGxpbmUnLFxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogY2MuTGFiZWwsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgX3dpZHRoOiAxLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIG91dGxpbmUgY29sb3JcbiAgICAgICAgICogISN6aCDmlLnlj5jmj4/ovrnnmoTpopzoibJcbiAgICAgICAgICogQHByb3BlcnR5IGNvbG9yXG4gICAgICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogb3V0bGluZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgKi9cbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQub3V0bGluZS5jb2xvcicsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2NvbG9yLmVxdWFscyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sb3Iuc2V0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENoYW5nZSB0aGUgb3V0bGluZSB3aWR0aFxuICAgICAgICAgKiAhI3poIOaUueWPmOaPj+i+ueeahOWuveW6plxuICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogb3V0bGluZS53aWR0aCA9IDM7XG4gICAgICAgICAqL1xuICAgICAgICB3aWR0aDoge1xuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5vdXRsaW5lLndpZHRoJyxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl93aWR0aCA9PT0gdmFsdWUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgNTEyXSxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVJlbmRlckRhdGEoKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlUmVuZGVyRGF0YSgpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlUmVuZGVyRGF0YSAoKSB7XG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICBpZiAobGFiZWwpIHtcbiAgICAgICAgICAgIGxhYmVsLnNldFZlcnRzRGlydHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbmNjLkxhYmVsT3V0bGluZSA9IG1vZHVsZS5leHBvcnRzID0gTGFiZWxPdXRsaW5lO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=