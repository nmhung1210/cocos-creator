
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCVisibleRect.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * cc.visibleRect is a singleton object which defines the actual visible rect of the current view,
 * it should represent the same rect as cc.view.getViewportRect()
 *
 * @class visibleRect
 */
cc.visibleRect = {
  topLeft: cc.v2(0, 0),
  topRight: cc.v2(0, 0),
  top: cc.v2(0, 0),
  bottomLeft: cc.v2(0, 0),
  bottomRight: cc.v2(0, 0),
  bottom: cc.v2(0, 0),
  center: cc.v2(0, 0),
  left: cc.v2(0, 0),
  right: cc.v2(0, 0),
  width: 0,
  height: 0,

  /**
   * initialize
   * @static
   * @method init
   * @param {Rect} visibleRect
   */
  init: function init(visibleRect) {
    var w = this.width = visibleRect.width;
    var h = this.height = visibleRect.height;
    var l = visibleRect.x,
        b = visibleRect.y,
        t = b + h,
        r = l + w; //top

    this.topLeft.x = l;
    this.topLeft.y = t;
    this.topRight.x = r;
    this.topRight.y = t;
    this.top.x = l + w / 2;
    this.top.y = t; //bottom

    this.bottomLeft.x = l;
    this.bottomLeft.y = b;
    this.bottomRight.x = r;
    this.bottomRight.y = b;
    this.bottom.x = l + w / 2;
    this.bottom.y = b; //center

    this.center.x = l + w / 2;
    this.center.y = b + h / 2; //left

    this.left.x = l;
    this.left.y = b + h / 2; //right

    this.right.x = r;
    this.right.y = b + h / 2;
  }
};
/**
 * Top left coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} topLeft
 */

/**
 * Top right coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} topRight
 */

/**
 * Top center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} top
 */

/**
 * Bottom left coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottomLeft
 */

/**
 * Bottom right coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottomRight
 */

/**
 * Bottom center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} bottom
 */

/**
 * Center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} center
 */

/**
 * Left center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} left
 */

/**
 * Right center coordinate of the screen related to the game scene.
 * @static
 * @property {Vec2} right
 */

/**
 * Width of the screen.
 * @static
 * @property {Number} width
 */

/**
 * Height of the screen.
 * @static
 * @property {Number} height
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDVmlzaWJsZVJlY3QuanMiXSwibmFtZXMiOlsiY2MiLCJ2aXNpYmxlUmVjdCIsInRvcExlZnQiLCJ2MiIsInRvcFJpZ2h0IiwidG9wIiwiYm90dG9tTGVmdCIsImJvdHRvbVJpZ2h0IiwiYm90dG9tIiwiY2VudGVyIiwibGVmdCIsInJpZ2h0Iiwid2lkdGgiLCJoZWlnaHQiLCJpbml0IiwidyIsImgiLCJsIiwieCIsImIiLCJ5IiwidCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBOzs7Ozs7QUFNQUEsRUFBRSxDQUFDQyxXQUFILEdBQWlCO0FBQ2JDLEVBQUFBLE9BQU8sRUFBQ0YsRUFBRSxDQUFDRyxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FESztBQUViQyxFQUFBQSxRQUFRLEVBQUNKLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFSLENBRkk7QUFHYkUsRUFBQUEsR0FBRyxFQUFDTCxFQUFFLENBQUNHLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUhTO0FBSWJHLEVBQUFBLFVBQVUsRUFBQ04sRUFBRSxDQUFDRyxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FKRTtBQUtiSSxFQUFBQSxXQUFXLEVBQUNQLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFSLENBTEM7QUFNYkssRUFBQUEsTUFBTSxFQUFDUixFQUFFLENBQUNHLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQU5NO0FBT2JNLEVBQUFBLE1BQU0sRUFBQ1QsRUFBRSxDQUFDRyxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FQTTtBQVFiTyxFQUFBQSxJQUFJLEVBQUNWLEVBQUUsQ0FBQ0csRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFSLENBUlE7QUFTYlEsRUFBQUEsS0FBSyxFQUFDWCxFQUFFLENBQUNHLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQVRPO0FBVWJTLEVBQUFBLEtBQUssRUFBQyxDQVZPO0FBV2JDLEVBQUFBLE1BQU0sRUFBQyxDQVhNOztBQWFiOzs7Ozs7QUFNQUMsRUFBQUEsSUFBSSxFQUFDLGNBQVNiLFdBQVQsRUFBcUI7QUFFdEIsUUFBSWMsQ0FBQyxHQUFHLEtBQUtILEtBQUwsR0FBYVgsV0FBVyxDQUFDVyxLQUFqQztBQUNBLFFBQUlJLENBQUMsR0FBRyxLQUFLSCxNQUFMLEdBQWNaLFdBQVcsQ0FBQ1ksTUFBbEM7QUFDQSxRQUFJSSxDQUFDLEdBQUdoQixXQUFXLENBQUNpQixDQUFwQjtBQUFBLFFBQ0lDLENBQUMsR0FBR2xCLFdBQVcsQ0FBQ21CLENBRHBCO0FBQUEsUUFFSUMsQ0FBQyxHQUFHRixDQUFDLEdBQUdILENBRlo7QUFBQSxRQUdJTSxDQUFDLEdBQUdMLENBQUMsR0FBR0YsQ0FIWixDQUpzQixDQVN0Qjs7QUFDQSxTQUFLYixPQUFMLENBQWFnQixDQUFiLEdBQWlCRCxDQUFqQjtBQUNBLFNBQUtmLE9BQUwsQ0FBYWtCLENBQWIsR0FBaUJDLENBQWpCO0FBQ0EsU0FBS2pCLFFBQUwsQ0FBY2MsQ0FBZCxHQUFrQkksQ0FBbEI7QUFDQSxTQUFLbEIsUUFBTCxDQUFjZ0IsQ0FBZCxHQUFrQkMsQ0FBbEI7QUFDQSxTQUFLaEIsR0FBTCxDQUFTYSxDQUFULEdBQWFELENBQUMsR0FBR0YsQ0FBQyxHQUFDLENBQW5CO0FBQ0EsU0FBS1YsR0FBTCxDQUFTZSxDQUFULEdBQWFDLENBQWIsQ0Fmc0IsQ0FpQnRCOztBQUNBLFNBQUtmLFVBQUwsQ0FBZ0JZLENBQWhCLEdBQW9CRCxDQUFwQjtBQUNBLFNBQUtYLFVBQUwsQ0FBZ0JjLENBQWhCLEdBQW9CRCxDQUFwQjtBQUNBLFNBQUtaLFdBQUwsQ0FBaUJXLENBQWpCLEdBQXFCSSxDQUFyQjtBQUNBLFNBQUtmLFdBQUwsQ0FBaUJhLENBQWpCLEdBQXFCRCxDQUFyQjtBQUNBLFNBQUtYLE1BQUwsQ0FBWVUsQ0FBWixHQUFnQkQsQ0FBQyxHQUFHRixDQUFDLEdBQUMsQ0FBdEI7QUFDQSxTQUFLUCxNQUFMLENBQVlZLENBQVosR0FBZ0JELENBQWhCLENBdkJzQixDQXlCdEI7O0FBQ0EsU0FBS1YsTUFBTCxDQUFZUyxDQUFaLEdBQWdCRCxDQUFDLEdBQUdGLENBQUMsR0FBQyxDQUF0QjtBQUNBLFNBQUtOLE1BQUwsQ0FBWVcsQ0FBWixHQUFnQkQsQ0FBQyxHQUFHSCxDQUFDLEdBQUMsQ0FBdEIsQ0EzQnNCLENBNkJ0Qjs7QUFDQSxTQUFLTixJQUFMLENBQVVRLENBQVYsR0FBY0QsQ0FBZDtBQUNBLFNBQUtQLElBQUwsQ0FBVVUsQ0FBVixHQUFjRCxDQUFDLEdBQUdILENBQUMsR0FBQyxDQUFwQixDQS9Cc0IsQ0FpQ3RCOztBQUNBLFNBQUtMLEtBQUwsQ0FBV08sQ0FBWCxHQUFlSSxDQUFmO0FBQ0EsU0FBS1gsS0FBTCxDQUFXUyxDQUFYLEdBQWVELENBQUMsR0FBR0gsQ0FBQyxHQUFDLENBQXJCO0FBQ0g7QUF2RFksQ0FBakI7QUEwREE7Ozs7OztBQU1BOzs7Ozs7QUFNQTs7Ozs7O0FBTUE7Ozs7OztBQU1BOzs7Ozs7QUFNQTs7Ozs7O0FBTUE7Ozs7OztBQU1BOzs7Ozs7QUFNQTs7Ozs7O0FBTUE7Ozs7OztBQU1BIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qKlxuICogY2MudmlzaWJsZVJlY3QgaXMgYSBzaW5nbGV0b24gb2JqZWN0IHdoaWNoIGRlZmluZXMgdGhlIGFjdHVhbCB2aXNpYmxlIHJlY3Qgb2YgdGhlIGN1cnJlbnQgdmlldyxcbiAqIGl0IHNob3VsZCByZXByZXNlbnQgdGhlIHNhbWUgcmVjdCBhcyBjYy52aWV3LmdldFZpZXdwb3J0UmVjdCgpXG4gKlxuICogQGNsYXNzIHZpc2libGVSZWN0XG4gKi9cbmNjLnZpc2libGVSZWN0ID0ge1xuICAgIHRvcExlZnQ6Y2MudjIoMCwwKSxcbiAgICB0b3BSaWdodDpjYy52MigwLDApLFxuICAgIHRvcDpjYy52MigwLDApLFxuICAgIGJvdHRvbUxlZnQ6Y2MudjIoMCwwKSxcbiAgICBib3R0b21SaWdodDpjYy52MigwLDApLFxuICAgIGJvdHRvbTpjYy52MigwLDApLFxuICAgIGNlbnRlcjpjYy52MigwLDApLFxuICAgIGxlZnQ6Y2MudjIoMCwwKSxcbiAgICByaWdodDpjYy52MigwLDApLFxuICAgIHdpZHRoOjAsXG4gICAgaGVpZ2h0OjAsXG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplXG4gICAgICogQHN0YXRpY1xuICAgICAqIEBtZXRob2QgaW5pdFxuICAgICAqIEBwYXJhbSB7UmVjdH0gdmlzaWJsZVJlY3RcbiAgICAgKi9cbiAgICBpbml0OmZ1bmN0aW9uKHZpc2libGVSZWN0KXtcblxuICAgICAgICB2YXIgdyA9IHRoaXMud2lkdGggPSB2aXNpYmxlUmVjdC53aWR0aDtcbiAgICAgICAgdmFyIGggPSB0aGlzLmhlaWdodCA9IHZpc2libGVSZWN0LmhlaWdodDtcbiAgICAgICAgdmFyIGwgPSB2aXNpYmxlUmVjdC54LFxuICAgICAgICAgICAgYiA9IHZpc2libGVSZWN0LnksXG4gICAgICAgICAgICB0ID0gYiArIGgsXG4gICAgICAgICAgICByID0gbCArIHc7XG5cbiAgICAgICAgLy90b3BcbiAgICAgICAgdGhpcy50b3BMZWZ0LnggPSBsO1xuICAgICAgICB0aGlzLnRvcExlZnQueSA9IHQ7XG4gICAgICAgIHRoaXMudG9wUmlnaHQueCA9IHI7XG4gICAgICAgIHRoaXMudG9wUmlnaHQueSA9IHQ7XG4gICAgICAgIHRoaXMudG9wLnggPSBsICsgdy8yO1xuICAgICAgICB0aGlzLnRvcC55ID0gdDtcblxuICAgICAgICAvL2JvdHRvbVxuICAgICAgICB0aGlzLmJvdHRvbUxlZnQueCA9IGw7XG4gICAgICAgIHRoaXMuYm90dG9tTGVmdC55ID0gYjtcbiAgICAgICAgdGhpcy5ib3R0b21SaWdodC54ID0gcjtcbiAgICAgICAgdGhpcy5ib3R0b21SaWdodC55ID0gYjtcbiAgICAgICAgdGhpcy5ib3R0b20ueCA9IGwgKyB3LzI7XG4gICAgICAgIHRoaXMuYm90dG9tLnkgPSBiO1xuXG4gICAgICAgIC8vY2VudGVyXG4gICAgICAgIHRoaXMuY2VudGVyLnggPSBsICsgdy8yO1xuICAgICAgICB0aGlzLmNlbnRlci55ID0gYiArIGgvMjtcblxuICAgICAgICAvL2xlZnRcbiAgICAgICAgdGhpcy5sZWZ0LnggPSBsO1xuICAgICAgICB0aGlzLmxlZnQueSA9IGIgKyBoLzI7XG5cbiAgICAgICAgLy9yaWdodFxuICAgICAgICB0aGlzLnJpZ2h0LnggPSByO1xuICAgICAgICB0aGlzLnJpZ2h0LnkgPSBiICsgaC8yO1xuICAgIH1cbn07XG5cbi8qKlxuICogVG9wIGxlZnQgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkge1ZlYzJ9IHRvcExlZnRcbiAqL1xuXG4vKipcbiAqIFRvcCByaWdodCBjb29yZGluYXRlIG9mIHRoZSBzY3JlZW4gcmVsYXRlZCB0byB0aGUgZ2FtZSBzY2VuZS5cbiAqIEBzdGF0aWNcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gdG9wUmlnaHRcbiAqL1xuXG4vKipcbiAqIFRvcCBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkge1ZlYzJ9IHRvcFxuICovXG5cbi8qKlxuICogQm90dG9tIGxlZnQgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkge1ZlYzJ9IGJvdHRvbUxlZnRcbiAqL1xuXG4vKipcbiAqIEJvdHRvbSByaWdodCBjb29yZGluYXRlIG9mIHRoZSBzY3JlZW4gcmVsYXRlZCB0byB0aGUgZ2FtZSBzY2VuZS5cbiAqIEBzdGF0aWNcbiAqIEBwcm9wZXJ0eSB7VmVjMn0gYm90dG9tUmlnaHRcbiAqL1xuXG4vKipcbiAqIEJvdHRvbSBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkge1ZlYzJ9IGJvdHRvbVxuICovXG5cbi8qKlxuICogQ2VudGVyIGNvb3JkaW5hdGUgb2YgdGhlIHNjcmVlbiByZWxhdGVkIHRvIHRoZSBnYW1lIHNjZW5lLlxuICogQHN0YXRpY1xuICogQHByb3BlcnR5IHtWZWMyfSBjZW50ZXJcbiAqL1xuXG4vKipcbiAqIExlZnQgY2VudGVyIGNvb3JkaW5hdGUgb2YgdGhlIHNjcmVlbiByZWxhdGVkIHRvIHRoZSBnYW1lIHNjZW5lLlxuICogQHN0YXRpY1xuICogQHByb3BlcnR5IHtWZWMyfSBsZWZ0XG4gKi9cblxuLyoqXG4gKiBSaWdodCBjZW50ZXIgY29vcmRpbmF0ZSBvZiB0aGUgc2NyZWVuIHJlbGF0ZWQgdG8gdGhlIGdhbWUgc2NlbmUuXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkge1ZlYzJ9IHJpZ2h0XG4gKi9cblxuLyoqXG4gKiBXaWR0aCBvZiB0aGUgc2NyZWVuLlxuICogQHN0YXRpY1xuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gKi9cblxuLyoqXG4gKiBIZWlnaHQgb2YgdGhlIHNjcmVlbi5cbiAqIEBzdGF0aWNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcbiAqL1xuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==