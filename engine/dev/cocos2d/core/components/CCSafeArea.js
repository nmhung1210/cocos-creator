
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCSafeArea.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
var Widget = require('./CCWidget');
/**
 * !#en
 * This component is used to adjust the layout of current node to respect the safe area of a notched mobile device such as the iPhone X.
 * It is typically used for the top node of the UI interaction area. For specific usage, refer to the official [example-cases/02_ui/16_safeArea/SafeArea.fire](https://github.com/cocos-creator/example-cases).
 *
 * The concept of safe area is to give you a fixed inner rectangle in which you can safely display content that will be drawn on screen.
 * You are strongly discouraged from providing controls outside of this area. But your screen background could embellish edges.
 *
 * This component internally uses the API `cc.sys.getSafeAreaRect();` to obtain the safe area of the current iOS or Android device,
 * and implements the adaptation by using the Widget component and set anchor.
 *
 * !#zh
 * 该组件会将所在节点的布局适配到 iPhone X 等异形屏手机的安全区域内，通常用于 UI 交互区域的顶层节点，具体用法可参考官方范例 [example-cases/02_ui/16_safeArea/SafeArea.fire](https://github.com/cocos-creator/example-cases)。
 *
 * 该组件内部通过 API `cc.sys.getSafeAreaRect();` 获取到当前 iOS 或 Android 设备的安全区域，并通过 Widget 组件实现适配。
 *
 * @class SafeArea
 * @extends Component
 */


var SafeArea = cc.Class({
  name: 'cc.SafeArea',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    help: 'i18n:COMPONENT.help_url.safe_area',
    menu: 'i18n:MAIN_MENU.component.ui/SafeArea',
    inspector: 'packages://inspector/inspectors/comps/safe-area.js',
    executeInEditMode: true,
    requireComponent: Widget
  },
  onEnable: function onEnable() {
    this.updateArea();
    cc.view.on('canvas-resize', this.updateArea, this);
  },
  onDisable: function onDisable() {
    cc.view.off('canvas-resize', this.updateArea, this);
  },

  /**
   * !#en Adapt to safe area
   * !#zh 立即适配安全区域
   * @method updateArea
   * @example
   * let safeArea = this.node.addComponent(cc.SafeArea);
   * safeArea.updateArea();
   */
  updateArea: function updateArea() {
    // TODO Remove Widget dependencies in the future
    var widget = this.node.getComponent(Widget);

    if (!widget) {
      return;
    }

    if (CC_EDITOR) {
      widget.top = widget.bottom = widget.left = widget.right = 0;
      widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
      return;
    } // IMPORTANT: need to update alignment to get the latest position


    widget.updateAlignment();
    var lastPos = this.node.position;
    var lastAnchorPoint = this.node.getAnchorPoint(); //

    widget.isAlignTop = widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
    var screenWidth = cc.winSize.width,
        screenHeight = cc.winSize.height;
    var safeArea = cc.sys.getSafeAreaRect();
    widget.top = screenHeight - safeArea.y - safeArea.height;
    widget.bottom = safeArea.y;
    widget.left = safeArea.x;
    widget.right = screenWidth - safeArea.x - safeArea.width;
    widget.updateAlignment(); // set anchor, keep the original position unchanged

    var curPos = this.node.position;
    var anchorX = lastAnchorPoint.x - (curPos.x - lastPos.x) / this.node.width;
    var anchorY = lastAnchorPoint.y - (curPos.y - lastPos.y) / this.node.height;
    this.node.setAnchorPoint(anchorX, anchorY); // IMPORTANT: restore to lastPos even if widget is not ALWAYS

    widget.enabled = true;
  }
});
cc.SafeArea = module.exports = SafeArea;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NTYWZlQXJlYS5qcyJdLCJuYW1lcyI6WyJXaWRnZXQiLCJyZXF1aXJlIiwiU2FmZUFyZWEiLCJjYyIsIkNsYXNzIiwibmFtZSIsImVkaXRvciIsIkNDX0VESVRPUiIsImhlbHAiLCJtZW51IiwiaW5zcGVjdG9yIiwiZXhlY3V0ZUluRWRpdE1vZGUiLCJyZXF1aXJlQ29tcG9uZW50Iiwib25FbmFibGUiLCJ1cGRhdGVBcmVhIiwidmlldyIsIm9uIiwib25EaXNhYmxlIiwib2ZmIiwid2lkZ2V0Iiwibm9kZSIsImdldENvbXBvbmVudCIsInRvcCIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsImlzQWxpZ25Ub3AiLCJpc0FsaWduQm90dG9tIiwiaXNBbGlnbkxlZnQiLCJpc0FsaWduUmlnaHQiLCJ1cGRhdGVBbGlnbm1lbnQiLCJsYXN0UG9zIiwicG9zaXRpb24iLCJsYXN0QW5jaG9yUG9pbnQiLCJnZXRBbmNob3JQb2ludCIsInNjcmVlbldpZHRoIiwid2luU2l6ZSIsIndpZHRoIiwic2NyZWVuSGVpZ2h0IiwiaGVpZ2h0Iiwic2FmZUFyZWEiLCJzeXMiLCJnZXRTYWZlQXJlYVJlY3QiLCJ5IiwieCIsImN1clBvcyIsImFuY2hvclgiLCJhbmNob3JZIiwic2V0QW5jaG9yUG9pbnQiLCJlbmFibGVkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF0QjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBSUMsUUFBUSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNwQkMsRUFBQUEsSUFBSSxFQUFFLGFBRGM7QUFFcEIsYUFBU0osT0FBTyxDQUFDLGVBQUQsQ0FGSTtBQUlwQkssRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElB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S0FBS3ZCLElBQUwsQ0FBVW1CLE1BQXJFO0FBQ0EsU0FBS25CLElBQUwsQ0FBVTRCLGNBQVYsQ0FBeUJGLE9BQXpCLEVBQWtDQyxPQUFsQyxFQTdCVSxDQThCVjs7QUFDQTVCLElBQUFBLE1BQU0sQ0FBQzhCLE9BQVAsR0FBaUIsSUFBakI7QUFDSDtBQTdEbUIsQ0FBVCxDQUFmO0FBZ0VBOUMsRUFBRSxDQUFDRCxRQUFILEdBQWNnRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJqRCxRQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDIwIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBXaWRnZXQgPSByZXF1aXJlKCcuL0NDV2lkZ2V0Jyk7XG5cbi8qKlxuICogISNlblxuICogVGhpcyBjb21wb25lbnQgaXMgdXNlZCB0byBhZGp1c3QgdGhlIGxheW91dCBvZiBjdXJyZW50IG5vZGUgdG8gcmVzcGVjdCB0aGUgc2FmZSBhcmVhIG9mIGEgbm90Y2hlZCBtb2JpbGUgZGV2aWNlIHN1Y2ggYXMgdGhlIGlQaG9uZSBYLlxuICogSXQgaXMgdHlwaWNhbGx5IHVzZWQgZm9yIHRoZSB0b3Agbm9kZSBvZiB0aGUgVUkgaW50ZXJhY3Rpb24gYXJlYS4gRm9yIHNwZWNpZmljIHVzYWdlLCByZWZlciB0byB0aGUgb2ZmaWNpYWwgW2V4YW1wbGUtY2FzZXMvMDJfdWkvMTZfc2FmZUFyZWEvU2FmZUFyZWEuZmlyZV0oaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvZXhhbXBsZS1jYXNlcykuXG4gKlxuICogVGhlIGNvbmNlcHQgb2Ygc2FmZSBhcmVhIGlzIHRvIGdpdmUgeW91IGEgZml4ZWQgaW5uZXIgcmVjdGFuZ2xlIGluIHdoaWNoIHlvdSBjYW4gc2FmZWx5IGRpc3BsYXkgY29udGVudCB0aGF0IHdpbGwgYmUgZHJhd24gb24gc2NyZWVuLlxuICogWW91IGFyZSBzdHJvbmdseSBkaXNjb3VyYWdlZCBmcm9tIHByb3ZpZGluZyBjb250cm9scyBvdXRzaWRlIG9mIHRoaXMgYXJlYS4gQnV0IHlvdXIgc2NyZWVuIGJhY2tncm91bmQgY291bGQgZW1iZWxsaXNoIGVkZ2VzLlxuICpcbiAqIFRoaXMgY29tcG9uZW50IGludGVybmFsbHkgdXNlcyB0aGUgQVBJIGBjYy5zeXMuZ2V0U2FmZUFyZWFSZWN0KCk7YCB0byBvYnRhaW4gdGhlIHNhZmUgYXJlYSBvZiB0aGUgY3VycmVudCBpT1Mgb3IgQW5kcm9pZCBkZXZpY2UsXG4gKiBhbmQgaW1wbGVtZW50cyB0aGUgYWRhcHRhdGlvbiBieSB1c2luZyB0aGUgV2lkZ2V0IGNvbXBvbmVudCBhbmQgc2V0IGFuY2hvci5cbiAqXG4gKiAhI3poXG4gKiDor6Xnu4Tku7bkvJrlsIbmiYDlnKjoioLngrnnmoTluIPlsYDpgILphY3liLAgaVBob25lIFgg562J5byC5b2i5bGP5omL5py655qE5a6J5YWo5Yy65Z+f5YaF77yM6YCa5bi455So5LqOIFVJIOS6pOS6kuWMuuWfn+eahOmhtuWxguiKgueCue+8jOWFt+S9k+eUqOazleWPr+WPguiAg+WumOaWueiMg+S+iyBbZXhhbXBsZS1jYXNlcy8wMl91aS8xNl9zYWZlQXJlYS9TYWZlQXJlYS5maXJlXShodHRwczovL2dpdGh1Yi5jb20vY29jb3MtY3JlYXRvci9leGFtcGxlLWNhc2VzKeOAglxuICpcbiAqIOivpee7hOS7tuWGhemDqOmAmui/hyBBUEkgYGNjLnN5cy5nZXRTYWZlQXJlYVJlY3QoKTtgIOiOt+WPluWIsOW9k+WJjSBpT1Mg5oiWIEFuZHJvaWQg6K6+5aSH55qE5a6J5YWo5Yy65Z+f77yM5bm26YCa6L+HIFdpZGdldCDnu4Tku7blrp7njrDpgILphY3jgIJcbiAqXG4gKiBAY2xhc3MgU2FmZUFyZWFcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG52YXIgU2FmZUFyZWEgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNhZmVBcmVhJyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5zYWZlX2FyZWEnLFxuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1NhZmVBcmVhJyxcbiAgICAgICAgaW5zcGVjdG9yOiAncGFja2FnZXM6Ly9pbnNwZWN0b3IvaW5zcGVjdG9ycy9jb21wcy9zYWZlLWFyZWEuanMnLFxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcbiAgICAgICAgcmVxdWlyZUNvbXBvbmVudDogV2lkZ2V0LFxuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQXJlYSgpO1xuICAgICAgICBjYy52aWV3Lm9uKCdjYW52YXMtcmVzaXplJywgdGhpcy51cGRhdGVBcmVhLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgY2Mudmlldy5vZmYoJ2NhbnZhcy1yZXNpemUnLCB0aGlzLnVwZGF0ZUFyZWEsIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEFkYXB0IHRvIHNhZmUgYXJlYVxuICAgICAqICEjemgg56uL5Y2z6YCC6YWN5a6J5YWo5Yy65Z+fXG4gICAgICogQG1ldGhvZCB1cGRhdGVBcmVhXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgc2FmZUFyZWEgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLlNhZmVBcmVhKTtcbiAgICAgKiBzYWZlQXJlYS51cGRhdGVBcmVhKCk7XG4gICAgICovXG4gICAgdXBkYXRlQXJlYSAoKSB7XG4gICAgICAgIC8vIFRPRE8gUmVtb3ZlIFdpZGdldCBkZXBlbmRlbmNpZXMgaW4gdGhlIGZ1dHVyZVxuICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChXaWRnZXQpO1xuICAgICAgICBpZiAoIXdpZGdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgd2lkZ2V0LnRvcCA9IHdpZGdldC5ib3R0b20gPSB3aWRnZXQubGVmdCA9IHdpZGdldC5yaWdodCA9IDA7XG4gICAgICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHdpZGdldC5pc0FsaWduQm90dG9tID0gd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSU1QT1JUQU5UOiBuZWVkIHRvIHVwZGF0ZSBhbGlnbm1lbnQgdG8gZ2V0IHRoZSBsYXRlc3QgcG9zaXRpb25cbiAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xuICAgICAgICBsZXQgbGFzdFBvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgbGV0IGxhc3RBbmNob3JQb2ludCA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xuICAgICAgICAvL1xuICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHdpZGdldC5pc0FsaWduQm90dG9tID0gd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XG4gICAgICAgIGxldCBzY3JlZW5XaWR0aCA9IGNjLndpblNpemUud2lkdGgsIHNjcmVlbkhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgc2FmZUFyZWEgPSBjYy5zeXMuZ2V0U2FmZUFyZWFSZWN0KCk7XG4gICAgICAgIHdpZGdldC50b3AgPSBzY3JlZW5IZWlnaHQgLSBzYWZlQXJlYS55IC0gc2FmZUFyZWEuaGVpZ2h0O1xuICAgICAgICB3aWRnZXQuYm90dG9tID0gc2FmZUFyZWEueTtcbiAgICAgICAgd2lkZ2V0LmxlZnQgPSBzYWZlQXJlYS54O1xuICAgICAgICB3aWRnZXQucmlnaHQgPSBzY3JlZW5XaWR0aCAtIHNhZmVBcmVhLnggLSBzYWZlQXJlYS53aWR0aDtcbiAgICAgICAgd2lkZ2V0LnVwZGF0ZUFsaWdubWVudCgpO1xuICAgICAgICAvLyBzZXQgYW5jaG9yLCBrZWVwIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiB1bmNoYW5nZWRcbiAgICAgICAgbGV0IGN1clBvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgbGV0IGFuY2hvclggPSBsYXN0QW5jaG9yUG9pbnQueCAtIChjdXJQb3MueCAtIGxhc3RQb3MueCkgLyB0aGlzLm5vZGUud2lkdGg7XG4gICAgICAgIGxldCBhbmNob3JZID0gbGFzdEFuY2hvclBvaW50LnkgLSAoY3VyUG9zLnkgLSBsYXN0UG9zLnkpIC8gdGhpcy5ub2RlLmhlaWdodDtcbiAgICAgICAgdGhpcy5ub2RlLnNldEFuY2hvclBvaW50KGFuY2hvclgsIGFuY2hvclkpO1xuICAgICAgICAvLyBJTVBPUlRBTlQ6IHJlc3RvcmUgdG8gbGFzdFBvcyBldmVuIGlmIHdpZGdldCBpcyBub3QgQUxXQVlTXG4gICAgICAgIHdpZGdldC5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG59KTtcblxuY2MuU2FmZUFyZWEgPSBtb2R1bGUuZXhwb3J0cyA9IFNhZmVBcmVhO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=