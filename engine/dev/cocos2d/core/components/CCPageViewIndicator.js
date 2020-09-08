
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCPageViewIndicator.js';
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
 * !#en Enum for PageView Indicator direction
 * !#zh 页面视图指示器的摆放方向
 * @enum PageViewIndicator.Direction
 */
var Direction = cc.Enum({
  /**
   * !#en The horizontal direction.
   * !#zh 水平方向
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 0,

  /**
   * !#en The vertical direction.
   * !#zh 垂直方向
   * @property {Number} VERTICAL
   */
  VERTICAL: 1
});
/**
 * !#en The Page View Indicator Component
 * !#zh 页面视图每页标记组件
 * @class PageViewIndicator
 * @extends Component
 */

var PageViewIndicator = cc.Class({
  name: 'cc.PageViewIndicator',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PageViewIndicator',
    help: 'i18n:COMPONENT.help_url.pageviewIndicator'
  },
  properties: {
    _layout: null,
    _pageView: null,
    _indicators: [],

    /**
     * !#en The spriteFrame for each element.
     * !#zh 每个页面标记显示的图片
     * @property {SpriteFrame} spriteFrame
     */
    spriteFrame: {
      "default": null,
      type: cc.SpriteFrame,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview_indicator.spriteFrame'
    },

    /**
     * !#en The location direction of PageViewIndicator.
     * !#zh 页面标记摆放方向
     *@property {PageViewIndicator.Direction} direction
     */
    direction: {
      "default": Direction.HORIZONTAL,
      type: Direction,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview_indicator.direction'
    },

    /**
     * !#en The cellSize for each element.
     * !#zh 每个页面标记的大小
     * @property {Size} cellSize
     */
    cellSize: {
      "default": cc.size(20, 20),
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview_indicator.cell_size'
    },

    /**
     * !#en The distance between each element.
     * !#zh 每个页面标记之间的边距
     * @property {Number} spacing
     */
    spacing: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview_indicator.spacing'
    }
  },
  statics: {
    Direction: Direction
  },
  onLoad: function onLoad() {
    this._updateLayout();
  },

  /**
   * !#en Set Page View
   * !#zh 设置页面视图
   * @method setPageView
   * @param {PageView} target
   */
  setPageView: function setPageView(target) {
    this._pageView = target;

    this._refresh();
  },
  _updateLayout: function _updateLayout() {
    this._layout = this.getComponent(cc.Layout);

    if (!this._layout) {
      this._layout = this.addComponent(cc.Layout);
    }

    if (this.direction === Direction.HORIZONTAL) {
      this._layout.type = cc.Layout.Type.HORIZONTAL;
      this._layout.spacingX = this.spacing;
    } else if (this.direction === Direction.VERTICAL) {
      this._layout.type = cc.Layout.Type.VERTICAL;
      this._layout.spacingY = this.spacing;
    }

    this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
  },
  _createIndicator: function _createIndicator() {
    var node = new cc.Node();
    var sprite = node.addComponent(cc.Sprite);
    sprite.spriteFrame = this.spriteFrame;
    sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
    node.parent = this.node;
    node.width = this.cellSize.width;
    node.height = this.cellSize.height;
    return node;
  },
  _changedState: function _changedState() {
    var indicators = this._indicators;
    if (indicators.length === 0) return;
    var idx = this._pageView._curPageIdx;
    if (idx >= indicators.length) return;

    for (var i = 0; i < indicators.length; ++i) {
      var node = indicators[i];
      node.opacity = 255 / 2;
    }

    indicators[idx].opacity = 255;
  },
  _refresh: function _refresh() {
    if (!this._pageView) {
      return;
    }

    var indicators = this._indicators;

    var pages = this._pageView.getPages();

    if (pages.length === indicators.length) {
      return;
    }

    var i = 0;

    if (pages.length > indicators.length) {
      for (i = 0; i < pages.length; ++i) {
        if (!indicators[i]) {
          indicators[i] = this._createIndicator();
        }
      }
    } else {
      var count = indicators.length - pages.length;

      for (i = count; i > 0; --i) {
        var node = indicators[i - 1];
        this.node.removeChild(node);
        indicators.splice(i - 1, 1);
      }
    }

    if (this._layout && this._layout.enabledInHierarchy) {
      this._layout.updateLayout();
    }

    this._changedState();
  }
});
cc.PageViewIndicator = module.exports = PageViewIndicator;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NQYWdlVmlld0luZGljYXRvci5qcyJdLCJuYW1lcyI6WyJEaXJlY3Rpb24iLCJjYyIsIkVudW0iLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJQYWdlVmlld0luZGljYXRvciIsIkNsYXNzIiwibmFtZSIsInJlcXVpcmUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsInByb3BlcnRpZXMiLCJfbGF5b3V0IiwiX3BhZ2VWaWV3IiwiX2luZGljYXRvcnMiLCJzcHJpdGVGcmFtZSIsInR5cGUiLCJTcHJpdGVGcmFtZSIsInRvb2x0aXAiLCJDQ19ERVYiLCJkaXJlY3Rpb24iLCJjZWxsU2l6ZSIsInNpemUiLCJzcGFjaW5nIiwic3RhdGljcyIsIm9uTG9hZCIsIl91cGRhdGVMYXlvdXQiLCJzZXRQYWdlVmlldyIsInRhcmdldCIsIl9yZWZyZXNoIiwiZ2V0Q29tcG9uZW50IiwiTGF5b3V0IiwiYWRkQ29tcG9uZW50IiwiVHlwZSIsInNwYWNpbmdYIiwic3BhY2luZ1kiLCJyZXNpemVNb2RlIiwiUmVzaXplTW9kZSIsIkNPTlRBSU5FUiIsIl9jcmVhdGVJbmRpY2F0b3IiLCJub2RlIiwiTm9kZSIsInNwcml0ZSIsIlNwcml0ZSIsInNpemVNb2RlIiwiU2l6ZU1vZGUiLCJDVVNUT00iLCJwYXJlbnQiLCJ3aWR0aCIsImhlaWdodCIsIl9jaGFuZ2VkU3RhdGUiLCJpbmRpY2F0b3JzIiwibGVuZ3RoIiwiaWR4IiwiX2N1clBhZ2VJZHgiLCJpIiwib3BhY2l0eSIsInBhZ2VzIiwiZ2V0UGFnZXMiLCJjb3VudCIsInJlbW92ZUNoaWxkIiwic3BsaWNlIiwiZW5hYmxlZEluSGllcmFyY2h5IiwidXBkYXRlTGF5b3V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7QUFLQSxJQUFJQSxTQUFTLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3BCOzs7OztBQUtBQyxFQUFBQSxVQUFVLEVBQUUsQ0FOUTs7QUFRcEI7Ozs7O0FBS0FDLEVBQUFBLFFBQVEsRUFBRTtBQWJVLENBQVIsQ0FBaEI7QUFpQkE7Ozs7Ozs7QUFNQSxJQUFJQyxpQkFBaUIsR0FBR0osRUFBRSxDQUFDSyxLQUFILENBQVM7QUFDN0JDLEVBQUFBLElBQUksRUFBRSxzQkFEdUI7QUFFN0IsYUFBU0MsT0FBTyxDQUFDLGVBQUQsQ0FGYTtBQUk3QkMsRUFBQUEsTUFBTSxFQUFFQyxTQUFTLElBQUk7QUFDakJDLElBQUFBLElBQUksRUFBRSwrQ0FEVztBQUVqQkMsSUFBQUEsSUFBSSxFQUFFO0FBRlcsR0FKUTtBQVM3QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRSxJQUREO0FBRVJDLElBQUFBLFNBQVMsRUFBRSxJQUZIO0FBR1JDLElBQUFBLFdBQVcsRUFBRSxFQUhMOztBQUtSOzs7OztBQUtBQyxJQUFBQSxXQUFXLEVBQUU7QUFDVCxpQkFBUyxJQURBO0FBRVRDLE1BQUFBLElBQUksRUFBRWpCLEVBQUUsQ0FBQ2tCLFdBRkE7QUFHVEMsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFIVixLQVZMOztBQWdCUjs7Ozs7QUFLQUMsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVN0QixTQUFTLENBQUNHLFVBRFo7QUFFUGUsTUFBQUEsSUFBSSxFQUFFbEIsU0FGQztBQUdQb0IsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFIWixLQXJCSDs7QUEyQlI7Ozs7O0FBS0FFLElBQUFBLFFBQVEsRUFBRTtBQUNOLGlCQUFTdEIsRUFBRSxDQUFDdUIsSUFBSCxDQUFRLEVBQVIsRUFBWSxFQUFaLENBREg7QUFFTkosTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFGYixLQWhDRjs7QUFxQ1I7Ozs7O0FBS0FJLElBQUFBLE9BQU8sRUFBRTtBQUNMLGlCQUFTLENBREo7QUFFTEwsTUFBQUEsT0FBTyxFQUFFQyxNQUFNLElBQUk7QUFGZDtBQTFDRCxHQVRpQjtBQXlEN0JLLEVBQUFBLE9BQU8sRUFBRTtBQUNMMUIsSUFBQUEsU0FBUyxFQUFFQTtBQUROLEdBekRvQjtBQTZEN0IyQixFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsU0FBS0MsYUFBTDtBQUNILEdBL0Q0Qjs7QUFpRTdCOzs7Ozs7QUFNQUMsRUFBQUEsV0FBVyxFQUFFLHFCQUFVQyxNQUFWLEVBQWtCO0FBQzNCLFNBQUtmLFNBQUwsR0FBaUJlLE1BQWpCOztBQUNBLFNBQUtDLFFBQUw7QUFDSCxHQTFFNEI7QUE0RTdCSCxFQUFBQSxhQUFhLEVBQUUseUJBQVk7QUFDdkIsU0FBS2QsT0FBTCxHQUFlLEtBQUtrQixZQUFMLENBQWtCL0IsRUFBRSxDQUFDZ0MsTUFBckIsQ0FBZjs7QUFDQSxRQUFJLENBQUMsS0FBS25CLE9BQVYsRUFBbUI7QUFDZixXQUFLQSxPQUFMLEdBQWUsS0FBS29CLFlBQUwsQ0FBa0JqQyxFQUFFLENBQUNnQyxNQUFyQixDQUFmO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLWCxTQUFMLEtBQW1CdEIsU0FBUyxDQUFDRyxVQUFqQyxFQUE2QztBQUN6QyxXQUFLVyxPQUFMLENBQWFJLElBQWIsR0FBb0JqQixFQUFFLENBQUNnQyxNQUFILENBQVVFLElBQVYsQ0FBZWhDLFVBQW5DO0FBQ0EsV0FBS1csT0FBTCxDQUFhc0IsUUFBYixHQUF3QixLQUFLWCxPQUE3QjtBQUNILEtBSEQsTUFJSyxJQUFJLEtBQUtILFNBQUwsS0FBbUJ0QixTQUFTLENBQUNJLFFBQWpDLEVBQTJDO0FBQzVDLFdBQUtVLE9BQUwsQ0FBYUksSUFBYixHQUFvQmpCLEVBQUUsQ0FBQ2dDLE1BQUgsQ0FBVUUsSUFBVixDQUFlL0IsUUFBbkM7QUFDQSxXQUFLVSxPQUFMLENBQWF1QixRQUFiLEdBQXdCLEtBQUtaLE9BQTdCO0FBQ0g7O0FBQ0QsU0FBS1gsT0FBTCxDQUFhd0IsVUFBYixHQUEwQnJDLEVBQUUsQ0FBQ2dDLE1BQUgsQ0FBVU0sVUFBVixDQUFxQkMsU0FBL0M7QUFDSCxHQTFGNEI7QUE0RjdCQyxFQUFBQSxnQkFBZ0IsRUFBRSw0QkFBWTtBQUMxQixRQUFJQyxJQUFJLEdBQUcsSUFBSXpDLEVBQUUsQ0FBQzBDLElBQVAsRUFBWDtBQUNBLFFBQUlDLE1BQU0sR0FBR0YsSUFBSSxDQUFDUixZQUFMLENBQWtCakMsRUFBRSxDQUFDNEMsTUFBckIsQ0FBYjtBQUNBRCxJQUFBQSxNQUFNLENBQUMzQixXQUFQLEdBQXFCLEtBQUtBLFdBQTFCO0FBQ0EyQixJQUFBQSxNQUFNLENBQUNFLFFBQVAsR0FBa0I3QyxFQUFFLENBQUM0QyxNQUFILENBQVVFLFFBQVYsQ0FBbUJDLE1BQXJDO0FBQ0FOLElBQUFBLElBQUksQ0FBQ08sTUFBTCxHQUFjLEtBQUtQLElBQW5CO0FBQ0FBLElBQUFBLElBQUksQ0FBQ1EsS0FBTCxHQUFhLEtBQUszQixRQUFMLENBQWMyQixLQUEzQjtBQUNBUixJQUFBQSxJQUFJLENBQUNTLE1BQUwsR0FBYyxLQUFLNUIsUUFBTCxDQUFjNEIsTUFBNUI7QUFDQSxXQUFPVCxJQUFQO0FBQ0gsR0FyRzRCO0FBdUc3QlUsRUFBQUEsYUFBYSxFQUFFLHlCQUFZO0FBQ3ZCLFFBQUlDLFVBQVUsR0FBRyxLQUFLckMsV0FBdEI7QUFDQSxRQUFJcUMsVUFBVSxDQUFDQyxNQUFYLEtBQXNCLENBQTFCLEVBQTZCO0FBQzdCLFFBQUlDLEdBQUcsR0FBRyxLQUFLeEMsU0FBTCxDQUFleUMsV0FBekI7QUFDQSxRQUFJRCxHQUFHLElBQUlGLFVBQVUsQ0FBQ0MsTUFBdEIsRUFBOEI7O0FBQzlCLFNBQUssSUFBSUcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBVSxDQUFDQyxNQUEvQixFQUF1QyxFQUFFRyxDQUF6QyxFQUE0QztBQUN4QyxVQUFJZixJQUFJLEdBQUdXLFVBQVUsQ0FBQ0ksQ0FBRCxDQUFyQjtBQUNBZixNQUFBQSxJQUFJLENBQUNnQixPQUFMLEdBQWUsTUFBTSxDQUFyQjtBQUNIOztBQUNETCxJQUFBQSxVQUFVLENBQUNFLEdBQUQsQ0FBVixDQUFnQkcsT0FBaEIsR0FBMEIsR0FBMUI7QUFDSCxHQWpINEI7QUFtSDdCM0IsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBQ2xCLFFBQUksQ0FBQyxLQUFLaEIsU0FBVixFQUFxQjtBQUFFO0FBQVM7O0FBQ2hDLFFBQUlzQyxVQUFVLEdBQUcsS0FBS3JDLFdBQXRCOztBQUNBLFFBQUkyQyxLQUFLLEdBQUcsS0FBSzVDLFNBQUwsQ0FBZTZDLFFBQWYsRUFBWjs7QUFDQSxRQUFJRCxLQUFLLENBQUNMLE1BQU4sS0FBaUJELFVBQVUsQ0FBQ0MsTUFBaEMsRUFBd0M7QUFDcEM7QUFDSDs7QUFDRCxRQUFJRyxDQUFDLEdBQUcsQ0FBUjs7QUFDQSxRQUFJRSxLQUFLLENBQUNMLE1BQU4sR0FBZUQsVUFBVSxDQUFDQyxNQUE5QixFQUFzQztBQUNsQyxXQUFLRyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLEdBQUdFLEtBQUssQ0FBQ0wsTUFBdEIsRUFBOEIsRUFBRUcsQ0FBaEMsRUFBbUM7QUFDL0IsWUFBSSxDQUFDSixVQUFVLENBQUNJLENBQUQsQ0FBZixFQUFvQjtBQUNoQkosVUFBQUEsVUFBVSxDQUFDSSxDQUFELENBQVYsR0FBZ0IsS0FBS2hCLGdCQUFMLEVBQWhCO0FBQ0g7QUFDSjtBQUNKLEtBTkQsTUFPSztBQUNELFVBQUlvQixLQUFLLEdBQUdSLFVBQVUsQ0FBQ0MsTUFBWCxHQUFvQkssS0FBSyxDQUFDTCxNQUF0Qzs7QUFDQSxXQUFLRyxDQUFDLEdBQUdJLEtBQVQsRUFBZ0JKLENBQUMsR0FBRyxDQUFwQixFQUF1QixFQUFFQSxDQUF6QixFQUE0QjtBQUN4QixZQUFJZixJQUFJLEdBQUdXLFVBQVUsQ0FBQ0ksQ0FBQyxHQUFHLENBQUwsQ0FBckI7QUFDQSxhQUFLZixJQUFMLENBQVVvQixXQUFWLENBQXNCcEIsSUFBdEI7QUFDQVcsUUFBQUEsVUFBVSxDQUFDVSxNQUFYLENBQWtCTixDQUFDLEdBQUcsQ0FBdEIsRUFBeUIsQ0FBekI7QUFDSDtBQUNKOztBQUNELFFBQUcsS0FBSzNDLE9BQUwsSUFBZ0IsS0FBS0EsT0FBTCxDQUFha0Qsa0JBQWhDLEVBQW9EO0FBQ2hELFdBQUtsRCxPQUFMLENBQWFtRCxZQUFiO0FBQ0g7O0FBQ0QsU0FBS2IsYUFBTDtBQUNIO0FBOUk0QixDQUFULENBQXhCO0FBa0pBbkQsRUFBRSxDQUFDSSxpQkFBSCxHQUF1QjZELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjlELGlCQUF4QyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgUGFnZVZpZXcgSW5kaWNhdG9yIGRpcmVjdGlvblxuICogISN6aCDpobXpnaLop4blm77mjIfnpLrlmajnmoTmkYbmlL7mlrnlkJFcbiAqIEBlbnVtIFBhZ2VWaWV3SW5kaWNhdG9yLkRpcmVjdGlvblxuICovXG52YXIgRGlyZWN0aW9uID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgaG9yaXpvbnRhbCBkaXJlY3Rpb24uXG4gICAgICogISN6aCDmsLTlubPmlrnlkJFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gSE9SSVpPTlRBTFxuICAgICAqL1xuICAgIEhPUklaT05UQUw6IDAsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSB2ZXJ0aWNhbCBkaXJlY3Rpb24uXG4gICAgICogISN6aCDlnoLnm7TmlrnlkJFcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVkVSVElDQUxcbiAgICAgKi9cbiAgICBWRVJUSUNBTDogMVxufSk7XG5cblxuLyoqXG4gKiAhI2VuIFRoZSBQYWdlIFZpZXcgSW5kaWNhdG9yIENvbXBvbmVudFxuICogISN6aCDpobXpnaLop4blm77mr4/pobXmoIforrDnu4Tku7ZcbiAqIEBjbGFzcyBQYWdlVmlld0luZGljYXRvclxuICogQGV4dGVuZHMgQ29tcG9uZW50XG4gKi9cbnZhciBQYWdlVmlld0luZGljYXRvciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUGFnZVZpZXdJbmRpY2F0b3InLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NDb21wb25lbnQnKSxcblxuICAgIGVkaXRvcjogQ0NfRURJVE9SICYmIHtcbiAgICAgICAgbWVudTogJ2kxOG46TUFJTl9NRU5VLmNvbXBvbmVudC51aS9QYWdlVmlld0luZGljYXRvcicsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC5wYWdldmlld0luZGljYXRvcidcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbGF5b3V0OiBudWxsLFxuICAgICAgICBfcGFnZVZpZXc6IG51bGwsXG4gICAgICAgIF9pbmRpY2F0b3JzOiBbXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgc3ByaXRlRnJhbWUgZm9yIGVhY2ggZWxlbWVudC5cbiAgICAgICAgICogISN6aCDmr4/kuKrpobXpnaLmoIforrDmmL7npLrnmoTlm77niYdcbiAgICAgICAgICogQHByb3BlcnR5IHtTcHJpdGVGcmFtZX0gc3ByaXRlRnJhbWVcbiAgICAgICAgICovXG4gICAgICAgIHNwcml0ZUZyYW1lOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3X2luZGljYXRvci5zcHJpdGVGcmFtZSdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbG9jYXRpb24gZGlyZWN0aW9uIG9mIFBhZ2VWaWV3SW5kaWNhdG9yLlxuICAgICAgICAgKiAhI3poIOmhtemdouagh+iusOaRhuaUvuaWueWQkVxuICAgICAgICAgKkBwcm9wZXJ0eSB7UGFnZVZpZXdJbmRpY2F0b3IuRGlyZWN0aW9ufSBkaXJlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogRGlyZWN0aW9uLkhPUklaT05UQUwsXG4gICAgICAgICAgICB0eXBlOiBEaXJlY3Rpb24sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3X2luZGljYXRvci5kaXJlY3Rpb24nXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNlbGxTaXplIGZvciBlYWNoIGVsZW1lbnQuXG4gICAgICAgICAqICEjemgg5q+P5Liq6aG16Z2i5qCH6K6w55qE5aSn5bCPXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2l6ZX0gY2VsbFNpemVcbiAgICAgICAgICovXG4gICAgICAgIGNlbGxTaXplOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBjYy5zaXplKDIwLCAyMCksXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3X2luZGljYXRvci5jZWxsX3NpemUnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGRpc3RhbmNlIGJldHdlZW4gZWFjaCBlbGVtZW50LlxuICAgICAgICAgKiAhI3poIOavj+S4qumhtemdouagh+iusOS5i+mXtOeahOi+uei3nVxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc3BhY2luZ1xuICAgICAgICAgKi9cbiAgICAgICAgc3BhY2luZzoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQucGFnZXZpZXdfaW5kaWNhdG9yLnNwYWNpbmcnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBEaXJlY3Rpb246IERpcmVjdGlvblxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTGF5b3V0KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IFBhZ2UgVmlld1xuICAgICAqICEjemgg6K6+572u6aG16Z2i6KeG5Zu+XG4gICAgICogQG1ldGhvZCBzZXRQYWdlVmlld1xuICAgICAqIEBwYXJhbSB7UGFnZVZpZXd9IHRhcmdldFxuICAgICAqL1xuICAgIHNldFBhZ2VWaWV3OiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX3BhZ2VWaWV3ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLl9yZWZyZXNoKCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0ID0gdGhpcy5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dCA9IHRoaXMuYWRkQ29tcG9uZW50KGNjLkxheW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSE9SSVpPTlRBTCkge1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnR5cGUgPSBjYy5MYXlvdXQuVHlwZS5IT1JJWk9OVEFMO1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnNwYWNpbmdYID0gdGhpcy5zcGFjaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVkVSVElDQUwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xheW91dC50eXBlID0gY2MuTGF5b3V0LlR5cGUuVkVSVElDQUw7XG4gICAgICAgICAgICB0aGlzLl9sYXlvdXQuc3BhY2luZ1kgPSB0aGlzLnNwYWNpbmc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGF5b3V0LnJlc2l6ZU1vZGUgPSBjYy5MYXlvdXQuUmVzaXplTW9kZS5DT05UQUlORVI7XG4gICAgfSxcblxuICAgIF9jcmVhdGVJbmRpY2F0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICB2YXIgc3ByaXRlID0gbm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zcHJpdGVGcmFtZTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIG5vZGUud2lkdGggPSB0aGlzLmNlbGxTaXplLndpZHRoO1xuICAgICAgICBub2RlLmhlaWdodCA9IHRoaXMuY2VsbFNpemUuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9LFxuXG4gICAgX2NoYW5nZWRTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHRoaXMuX2luZGljYXRvcnM7XG4gICAgICAgIGlmIChpbmRpY2F0b3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICB2YXIgaWR4ID0gdGhpcy5fcGFnZVZpZXcuX2N1clBhZ2VJZHg7XG4gICAgICAgIGlmIChpZHggPj0gaW5kaWNhdG9ycy5sZW5ndGgpIHJldHVybjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRpY2F0b3JzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGluZGljYXRvcnNbaV07XG4gICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAyNTUgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGluZGljYXRvcnNbaWR4XS5vcGFjaXR5ID0gMjU1O1xuICAgIH0sXG5cbiAgICBfcmVmcmVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3BhZ2VWaWV3KSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgaW5kaWNhdG9ycyA9IHRoaXMuX2luZGljYXRvcnM7XG4gICAgICAgIHZhciBwYWdlcyA9IHRoaXMuX3BhZ2VWaWV3LmdldFBhZ2VzKCk7XG4gICAgICAgIGlmIChwYWdlcy5sZW5ndGggPT09IGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBpZiAocGFnZXMubGVuZ3RoID4gaW5kaWNhdG9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmICghaW5kaWNhdG9yc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRpY2F0b3JzW2ldID0gdGhpcy5fY3JlYXRlSW5kaWNhdG9yKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gaW5kaWNhdG9ycy5sZW5ndGggLSBwYWdlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSBjb3VudDsgaSA+IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gaW5kaWNhdG9yc1tpIC0gMV07XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGluZGljYXRvcnMuc3BsaWNlKGkgLSAxLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLl9sYXlvdXQgJiYgdGhpcy5fbGF5b3V0LmVuYWJsZWRJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoYW5nZWRTdGF0ZSgpO1xuICAgIH1cbn0pO1xuXG5cbmNjLlBhZ2VWaWV3SW5kaWNhdG9yID0gbW9kdWxlLmV4cG9ydHMgPSBQYWdlVmlld0luZGljYXRvcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9