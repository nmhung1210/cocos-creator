
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

var WidgetManager = require('../base-ui/CCWidgetManager');
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

    WidgetManager.add(widget);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NTYWZlQXJlYS5qcyJdLCJuYW1lcyI6WyJXaWRnZXQiLCJyZXF1aXJlIiwiV2lkZ2V0TWFuYWdlciIsIlNhZmVBcmVhIiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJoZWxwIiwibWVudSIsImluc3BlY3RvciIsImV4ZWN1dGVJbkVkaXRNb2RlIiwicmVxdWlyZUNvbXBvbmVudCIsIm9uRW5hYmxlIiwidXBkYXRlQXJlYSIsInZpZXciLCJvbiIsIm9uRGlzYWJsZSIsIm9mZiIsIndpZGdldCIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJpc0FsaWduVG9wIiwiaXNBbGlnbkJvdHRvbSIsImlzQWxpZ25MZWZ0IiwiaXNBbGlnblJpZ2h0IiwidXBkYXRlQWxpZ25tZW50IiwibGFzdFBvcyIsInBvc2l0aW9uIiwibGFzdEFuY2hvclBvaW50IiwiZ2V0QW5jaG9yUG9pbnQiLCJzY3JlZW5XaWR0aCIsIndpblNpemUiLCJ3aWR0aCIsInNjcmVlbkhlaWdodCIsImhlaWdodCIsInNhZmVBcmVhIiwic3lzIiwiZ2V0U2FmZUFyZWFSZWN0IiwieSIsIngiLCJjdXJQb3MiLCJhbmNob3JYIiwiYW5jaG9yWSIsInNldEFuY2hvclBvaW50IiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUF0Qjs7QUFDQSxJQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyw0QkFBRCxDQUE3QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsSUFBSUUsUUFBUSxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNwQkMsRUFBQUEsSUFBSSxFQUFFLGFBRGM7QUFFcEIs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R0FBb0IsQ0FBQ0UsTUFBTSxDQUFDRixDQUFQLEdBQVdaLE9BQU8sQ0FBQ1ksQ0FBcEIsSUFBeUIsS0FBS3ZCLElBQUwsQ0FBVW1CLE1BQXJFO0FBQ0EsU0FBS25CLElBQUwsQ0FBVTRCLGNBQVYsQ0FBeUJGLE9BQXpCLEVBQWtDQyxPQUFsQyxFQTdCVSxDQThCVjs7QUFDQTlDLElBQUFBLGFBQWEsQ0FBQ2dELEdBQWQsQ0FBa0I5QixNQUFsQjtBQUNIO0FBN0RtQixDQUFULENBQWY7QUFnRUFoQixFQUFFLENBQUNELFFBQUgsR0FBY2dELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpELFFBQS9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMjAgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IFdpZGdldCA9IHJlcXVpcmUoJy4vQ0NXaWRnZXQnKTtcbmNvbnN0IFdpZGdldE1hbmFnZXIgPSByZXF1aXJlKCcuLi9iYXNlLXVpL0NDV2lkZ2V0TWFuYWdlcicpO1xuLyoqXG4gKiAhI2VuXG4gKiBUaGlzIGNvbXBvbmVudCBpcyB1c2VkIHRvIGFkanVzdCB0aGUgbGF5b3V0IG9mIGN1cnJlbnQgbm9kZSB0byByZXNwZWN0IHRoZSBzYWZlIGFyZWEgb2YgYSBub3RjaGVkIG1vYmlsZSBkZXZpY2Ugc3VjaCBhcyB0aGUgaVBob25lIFguXG4gKiBJdCBpcyB0eXBpY2FsbHkgdXNlZCBmb3IgdGhlIHRvcCBub2RlIG9mIHRoZSBVSSBpbnRlcmFjdGlvbiBhcmVhLiBGb3Igc3BlY2lmaWMgdXNhZ2UsIHJlZmVyIHRvIHRoZSBvZmZpY2lhbCBbZXhhbXBsZS1jYXNlcy8wMl91aS8xNl9zYWZlQXJlYS9TYWZlQXJlYS5maXJlXShodHRwczovL2dpdGh1Yi5jb20vY29jb3MtY3JlYXRvci9leGFtcGxlLWNhc2VzKS5cbiAqXG4gKiBUaGUgY29uY2VwdCBvZiBzYWZlIGFyZWEgaXMgdG8gZ2l2ZSB5b3UgYSBmaXhlZCBpbm5lciByZWN0YW5nbGUgaW4gd2hpY2ggeW91IGNhbiBzYWZlbHkgZGlzcGxheSBjb250ZW50IHRoYXQgd2lsbCBiZSBkcmF3biBvbiBzY3JlZW4uXG4gKiBZb3UgYXJlIHN0cm9uZ2x5IGRpc2NvdXJhZ2VkIGZyb20gcHJvdmlkaW5nIGNvbnRyb2xzIG91dHNpZGUgb2YgdGhpcyBhcmVhLiBCdXQgeW91ciBzY3JlZW4gYmFja2dyb3VuZCBjb3VsZCBlbWJlbGxpc2ggZWRnZXMuXG4gKlxuICogVGhpcyBjb21wb25lbnQgaW50ZXJuYWxseSB1c2VzIHRoZSBBUEkgYGNjLnN5cy5nZXRTYWZlQXJlYVJlY3QoKTtgIHRvIG9idGFpbiB0aGUgc2FmZSBhcmVhIG9mIHRoZSBjdXJyZW50IGlPUyBvciBBbmRyb2lkIGRldmljZSxcbiAqIGFuZCBpbXBsZW1lbnRzIHRoZSBhZGFwdGF0aW9uIGJ5IHVzaW5nIHRoZSBXaWRnZXQgY29tcG9uZW50IGFuZCBzZXQgYW5jaG9yLlxuICpcbiAqICEjemhcbiAqIOivpee7hOS7tuS8muWwhuaJgOWcqOiKgueCueeahOW4g+WxgOmAgumFjeWIsCBpUGhvbmUgWCDnrYnlvILlvaLlsY/miYvmnLrnmoTlronlhajljLrln5/lhoXvvIzpgJrluLjnlKjkuo4gVUkg5Lqk5LqS5Yy65Z+f55qE6aG25bGC6IqC54K577yM5YW35L2T55So5rOV5Y+v5Y+C6ICD5a6Y5pa56IyD5L6LIFtleGFtcGxlLWNhc2VzLzAyX3VpLzE2X3NhZmVBcmVhL1NhZmVBcmVhLmZpcmVdKGh0dHBzOi8vZ2l0aHViLmNvbS9jb2Nvcy1jcmVhdG9yL2V4YW1wbGUtY2FzZXMp44CCXG4gKlxuICog6K+l57uE5Lu25YaF6YOo6YCa6L+HIEFQSSBgY2Muc3lzLmdldFNhZmVBcmVhUmVjdCgpO2Ag6I635Y+W5Yiw5b2T5YmNIGlPUyDmiJYgQW5kcm9pZCDorr7lpIfnmoTlronlhajljLrln5/vvIzlubbpgJrov4cgV2lkZ2V0IOe7hOS7tuWunueOsOmAgumFjeOAglxuICpcbiAqIEBjbGFzcyBTYWZlQXJlYVxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbnZhciBTYWZlQXJlYSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2FmZUFyZWEnLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLnNhZmVfYXJlYScsXG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvU2FmZUFyZWEnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL3NhZmUtYXJlYS5qcycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiB0cnVlLFxuICAgICAgICByZXF1aXJlQ29tcG9uZW50OiBXaWRnZXQsXG4gICAgfSxcblxuICAgIG9uRW5hYmxlICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVBcmVhKCk7XG4gICAgICAgIGNjLnZpZXcub24oJ2NhbnZhcy1yZXNpemUnLCB0aGlzLnVwZGF0ZUFyZWEsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGUgKCkge1xuICAgICAgICBjYy52aWV3Lm9mZignY2FudmFzLXJlc2l6ZScsIHRoaXMudXBkYXRlQXJlYSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRhcHQgdG8gc2FmZSBhcmVhXG4gICAgICogISN6aCDnq4vljbPpgILphY3lronlhajljLrln59cbiAgICAgKiBAbWV0aG9kIHVwZGF0ZUFyZWFcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBzYWZlQXJlYSA9IHRoaXMubm9kZS5hZGRDb21wb25lbnQoY2MuU2FmZUFyZWEpO1xuICAgICAqIHNhZmVBcmVhLnVwZGF0ZUFyZWEoKTtcbiAgICAgKi9cbiAgICB1cGRhdGVBcmVhICgpIHtcbiAgICAgICAgLy8gVE9ETyBSZW1vdmUgV2lkZ2V0IGRlcGVuZGVuY2llcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFdpZGdldCk7XG4gICAgICAgIGlmICghd2lkZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB3aWRnZXQudG9wID0gd2lkZ2V0LmJvdHRvbSA9IHdpZGdldC5sZWZ0ID0gd2lkZ2V0LnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB3aWRnZXQuaXNBbGlnbkxlZnQgPSB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJTVBPUlRBTlQ6IG5lZWQgdG8gdXBkYXRlIGFsaWdubWVudCB0byBnZXQgdGhlIGxhdGVzdCBwb3NpdGlvblxuICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XG4gICAgICAgIGxldCBsYXN0UG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICBsZXQgbGFzdEFuY2hvclBvaW50ID0gdGhpcy5ub2RlLmdldEFuY2hvclBvaW50KCk7XG4gICAgICAgIC8vXG4gICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB3aWRnZXQuaXNBbGlnbkxlZnQgPSB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNjcmVlbldpZHRoID0gY2Mud2luU2l6ZS53aWR0aCwgc2NyZWVuSGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCBzYWZlQXJlYSA9IGNjLnN5cy5nZXRTYWZlQXJlYVJlY3QoKTtcbiAgICAgICAgd2lkZ2V0LnRvcCA9IHNjcmVlbkhlaWdodCAtIHNhZmVBcmVhLnkgLSBzYWZlQXJlYS5oZWlnaHQ7XG4gICAgICAgIHdpZGdldC5ib3R0b20gPSBzYWZlQXJlYS55O1xuICAgICAgICB3aWRnZXQubGVmdCA9IHNhZmVBcmVhLng7XG4gICAgICAgIHdpZGdldC5yaWdodCA9IHNjcmVlbldpZHRoIC0gc2FmZUFyZWEueCAtIHNhZmVBcmVhLndpZHRoO1xuICAgICAgICB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XG4gICAgICAgIC8vIHNldCBhbmNob3IsIGtlZXAgdGhlIG9yaWdpbmFsIHBvc2l0aW9uIHVuY2hhbmdlZFxuICAgICAgICBsZXQgY3VyUG9zID0gdGhpcy5ub2RlLnBvc2l0aW9uO1xuICAgICAgICBsZXQgYW5jaG9yWCA9IGxhc3RBbmNob3JQb2ludC54IC0gKGN1clBvcy54IC0gbGFzdFBvcy54KSAvIHRoaXMubm9kZS53aWR0aDtcbiAgICAgICAgbGV0IGFuY2hvclkgPSBsYXN0QW5jaG9yUG9pbnQueSAtIChjdXJQb3MueSAtIGxhc3RQb3MueSkgLyB0aGlzLm5vZGUuaGVpZ2h0O1xuICAgICAgICB0aGlzLm5vZGUuc2V0QW5jaG9yUG9pbnQoYW5jaG9yWCwgYW5jaG9yWSk7XG4gICAgICAgIC8vIElNUE9SVEFOVDogcmVzdG9yZSB0byBsYXN0UG9zIGV2ZW4gaWYgd2lkZ2V0IGlzIG5vdCBBTFdBWVNcbiAgICAgICAgV2lkZ2V0TWFuYWdlci5hZGQod2lkZ2V0KTtcbiAgICB9XG59KTtcblxuY2MuU2FmZUFyZWEgPSBtb2R1bGUuZXhwb3J0cyA9IFNhZmVBcmVhO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=