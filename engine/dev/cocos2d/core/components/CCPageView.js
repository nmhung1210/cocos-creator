
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCPageView.js';
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
 * !#en The Page View Size Mode
 * !#zh 页面视图每个页面统一的大小类型
 * @enum PageView.SizeMode
 */
var SizeMode = cc.Enum({
  /**
   * !#en Each page is unified in size
   * !#zh 每个页面统一大小
   * @property {Number} Unified
   */
  Unified: 0,

  /**
   * !#en Each page is in free size
   * !#zh 每个页面大小随意
   * @property {Number} Free
   */
  Free: 1
});
/**
 * !#en The Page View Direction
 * !#zh 页面视图滚动类型
 * @enum PageView.Direction
 */

var Direction = cc.Enum({
  /**
   * !#en Horizontal scroll.
   * !#zh 水平滚动
   * @property {Number} Horizontal
   */
  Horizontal: 0,

  /**
   * !#en Vertical scroll.
   * !#zh 垂直滚动
   * @property {Number} Vertical
   */
  Vertical: 1
});
/**
 * !#en Enum for ScrollView event type.
 * !#zh 滚动视图事件类型
 * @enum PageView.EventType
 */

var EventType = cc.Enum({
  /**
   * !#en The page turning event
   * !#zh 翻页事件
   * @property {Number} PAGE_TURNING
   */
  PAGE_TURNING: 0
});
/**
 * !#en The PageView control
 * !#zh 页面视图组件
 * @class PageView
 * @extends ScrollView
 */

var PageView = cc.Class({
  name: 'cc.PageView',
  "extends": cc.ScrollView,
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/PageView',
    help: 'i18n:COMPONENT.help_url.pageview',
    inspector: 'packages://inspector/inspectors/comps/ccpageview.js',
    executeInEditMode: false
  },
  ctor: function ctor() {
    this._curPageIdx = 0;
    this._lastPageIdx = 0;
    this._pages = [];
    this._initContentPos = cc.v2();
    this._scrollCenterOffsetX = []; // 每一个页面居中时需要的偏移量（X）

    this._scrollCenterOffsetY = []; // 每一个页面居中时需要的偏移量（Y）
  },
  properties: {
    /**
     * !#en Specify the size type of each page in PageView.
     * !#zh 页面视图中每个页面大小类型
     * @property {PageView.SizeMode} sizeMode
     */
    sizeMode: {
      "default": SizeMode.Unified,
      type: SizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.sizeMode',
      notify: function notify() {
        this._syncSizeMode();
      }
    },

    /**
     * !#en The page view direction
     * !#zh 页面视图滚动类型
     * @property {PageView.Direction} direction
     */
    direction: {
      "default": Direction.Horizontal,
      type: Direction,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.direction',
      notify: function notify() {
        this._syncScrollDirection();
      }
    },

    /**
     * !#en
     * The scroll threshold value, when drag exceeds this value,
     * release the next page will automatically scroll, less than the restore
     * !#zh 滚动临界值，默认单位百分比，当拖拽超出该数值时，松开会自动滚动下一页，小于时则还原。
     * @property {Number} scrollThreshold
     */
    scrollThreshold: {
      "default": 0.5,
      type: cc.Float,
      slide: true,
      range: [0, 1, 0.01],
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.scrollThreshold'
    },

    /**
     * !#en
     * Auto page turning velocity threshold. When users swipe the PageView quickly,
     * it will calculate a velocity based on the scroll distance and time,
     * if the calculated velocity is larger than the threshold, then it will trigger page turning.
     * !#zh
     * 快速滑动翻页临界值。
     * 当用户快速滑动时，会根据滑动开始和结束的距离与时间计算出一个速度值，
     * 该值与此临界值相比较，如果大于临界值，则进行自动翻页。
     * @property {Number} autoPageTurningThreshold
     */
    autoPageTurningThreshold: {
      "default": 100,
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.autoPageTurningThreshold'
    },

    /**
     * !#en Change the PageTurning event timing of PageView.
     * !#zh 设置 PageView PageTurning 事件的发送时机。
     * @property {Number} pageTurningEventTiming
     */
    pageTurningEventTiming: {
      "default": 0.1,
      type: cc.Float,
      range: [0, 1, 0.01],
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageTurningEventTiming'
    },

    /**
     * !#en The Page View Indicator
     * !#zh 页面视图指示器组件
     * @property {PageViewIndicator} indicator
     */
    indicator: {
      "default": null,
      type: cc.PageViewIndicator,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.indicator',
      notify: function notify() {
        if (this.indicator) {
          this.indicator.setPageView(this);
        }
      }
    },

    /**
     * !#en The time required to turn over a page. unit: second
     * !#zh 每个页面翻页时所需时间。单位：秒
     * @property {Number} pageTurningSpeed
     */
    pageTurningSpeed: {
      "default": 0.3,
      type: cc.Float,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageTurningSpeed'
    },

    /**
     * !#en PageView events callback
     * !#zh 滚动视图的事件回调函数
     * @property {Component.EventHandler[]} pageEvents
     */
    pageEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.pageview.pageEvents'
    }
  },
  statics: {
    SizeMode: SizeMode,
    Direction: Direction,
    EventType: EventType
  },
  __preload: function __preload() {
    this.node.on(cc.Node.EventType.SIZE_CHANGED, this._updateAllPagesSize, this);
  },
  onEnable: function onEnable() {
    this._super();

    if (!CC_EDITOR) {
      this.node.on('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
    }
  },
  onDisable: function onDisable() {
    this._super();

    if (!CC_EDITOR) {
      this.node.off('scroll-ended-with-threshold', this._dispatchPageTurningEvent, this);
    }
  },
  onLoad: function onLoad() {
    this._initPages();

    if (this.indicator) {
      this.indicator.setPageView(this);
    }
  },
  onDestroy: function onDestroy() {
    this.node.off(cc.Node.EventType.SIZE_CHANGED, this._updateAllPagesSize, this);
  },

  /**
   * !#en Returns current page index
   * !#zh 返回当前页面索引
   * @method getCurrentPageIndex
   * @returns {Number}
   */
  getCurrentPageIndex: function getCurrentPageIndex() {
    return this._curPageIdx;
  },

  /**
   * !#en Set current page index
   * !#zh 设置当前页面索引
   * @method setCurrentPageIndex
   * @param {Number} index
   */
  setCurrentPageIndex: function setCurrentPageIndex(index) {
    this.scrollToPage(index, true);
  },

  /**
   * !#en Returns all pages of pageview
   * !#zh 返回视图中的所有页面
   * @method getPages
   * @returns {Node[]}
   */
  getPages: function getPages() {
    return this._pages;
  },

  /**
   * !#en At the end of the current page view to insert a new view
   * !#zh 在当前页面视图的尾部插入一个新视图
   * @method addPage
   * @param {Node} page
   */
  addPage: function addPage(page) {
    if (!page || this._pages.indexOf(page) !== -1 || !this.content) return;
    this.content.addChild(page);

    this._pages.push(page);

    this._updatePageView();
  },

  /**
   * !#en Inserts a page in the specified location
   * !#zh 将页面插入指定位置中
   * @method insertPage
   * @param {Node} page
   * @param {Number} index
   */
  insertPage: function insertPage(page, index) {
    if (index < 0 || !page || this._pages.indexOf(page) !== -1 || !this.content) return;
    var pageCount = this._pages.length;
    if (index >= pageCount) this.addPage(page);else {
      this._pages.splice(index, 0, page);

      this.content.addChild(page);

      this._updatePageView();
    }
  },

  /**
   * !#en Removes a page from PageView.
   * !#zh 移除指定页面
   * @method removePage
   * @param {Node} page
   */
  removePage: function removePage(page) {
    if (!page || !this.content) return;

    var index = this._pages.indexOf(page);

    if (index === -1) {
      cc.warnID(4300, page.name);
      return;
    }

    this.removePageAtIndex(index);
  },

  /**
   * !#en Removes a page at index of PageView.
   * !#zh 移除指定下标的页面
   * @method removePageAtIndex
   * @param {Number} index
   */
  removePageAtIndex: function removePageAtIndex(index) {
    var pageList = this._pages;
    if (index < 0 || index >= pageList.length) return;
    var page = pageList[index];
    if (!page) return;
    this.content.removeChild(page);
    pageList.splice(index, 1);

    this._updatePageView();
  },

  /**
   * !#en Removes all pages from PageView
   * !#zh 移除所有页面
   * @method removeAllPages
   */
  removeAllPages: function removeAllPages() {
    if (!this.content) {
      return;
    }

    var locPages = this._pages;

    for (var i = 0, len = locPages.length; i < len; i++) {
      this.content.removeChild(locPages[i]);
    }

    this._pages.length = 0;

    this._updatePageView();
  },

  /**
   * !#en Scroll PageView to index.
   * !#zh 滚动到指定页面
   * @method scrollToPage
   * @param {Number} idx index of page.
   * @param {Number} timeInSecond scrolling time
   */
  scrollToPage: function scrollToPage(idx, timeInSecond) {
    if (idx < 0 || idx >= this._pages.length) return;
    timeInSecond = timeInSecond !== undefined ? timeInSecond : 0.3;
    this._curPageIdx = idx;
    this.scrollToOffset(this._moveOffsetValue(idx), timeInSecond, true);

    if (this.indicator) {
      this.indicator._changedState();
    }
  },
  //override the method of ScrollView
  getScrollEndedEventTiming: function getScrollEndedEventTiming() {
    return this.pageTurningEventTiming;
  },
  _syncScrollDirection: function _syncScrollDirection() {
    this.horizontal = this.direction === Direction.Horizontal;
    this.vertical = this.direction === Direction.Vertical;
  },
  _syncSizeMode: function _syncSizeMode() {
    if (!this.content) {
      return;
    }

    var layout = this.content.getComponent(cc.Layout);

    if (layout) {
      if (this.sizeMode === SizeMode.Free && this._pages.length > 0) {
        var lastPage = this._pages[this._pages.length - 1];

        if (this.direction === Direction.Horizontal) {
          layout.paddingLeft = (this._view.width - this._pages[0].width) / 2;
          layout.paddingRight = (this._view.width - lastPage.width) / 2;
        } else if (this.direction === Direction.Vertical) {
          layout.paddingTop = (this._view.height - this._pages[0].height) / 2;
          layout.paddingBottom = (this._view.height - lastPage.height) / 2;
        }
      }

      layout.updateLayout();
    }
  },
  // 刷新页面视图
  _updatePageView: function _updatePageView() {
    // 当页面数组变化时修改 content 大小
    var layout = this.content.getComponent(cc.Layout);

    if (layout && layout.enabled) {
      layout.updateLayout();
    }

    var pageCount = this._pages.length;

    if (this._curPageIdx >= pageCount) {
      this._curPageIdx = pageCount === 0 ? 0 : pageCount - 1;
      this._lastPageIdx = this._curPageIdx;
    } // 进行排序


    var contentPos = this._initContentPos;

    for (var i = 0; i < pageCount; ++i) {
      var page = this._pages[i];
      page.setSiblingIndex(i);

      if (this.direction === Direction.Horizontal) {
        this._scrollCenterOffsetX[i] = Math.abs(contentPos.x + page.x);
      } else {
        this._scrollCenterOffsetY[i] = Math.abs(contentPos.y + page.y);
      }
    } // 刷新 indicator 信息与状态


    if (this.indicator) {
      this.indicator._refresh();
    }
  },
  // 刷新所有页面的大小
  _updateAllPagesSize: function _updateAllPagesSize() {
    if (this.sizeMode !== SizeMode.Unified) {
      return;
    }

    var locPages = CC_EDITOR ? this.content.children : this._pages;

    var selfSize = this._view.getContentSize();

    for (var i = 0, len = locPages.length; i < len; i++) {
      locPages[i].setContentSize(selfSize);
    }
  },
  // 初始化页面
  _initPages: function _initPages() {
    if (!this.content) {
      return;
    }

    this._initContentPos = this.content.position;
    var children = this.content.children;

    for (var i = 0; i < children.length; ++i) {
      var page = children[i];

      if (this._pages.indexOf(page) >= 0) {
        continue;
      }

      this._pages.push(page);
    }

    this._syncScrollDirection();

    this._syncSizeMode();

    this._updatePageView();
  },
  _dispatchPageTurningEvent: function _dispatchPageTurningEvent() {
    if (this._lastPageIdx === this._curPageIdx) return;
    this._lastPageIdx = this._curPageIdx;
    cc.Component.EventHandler.emitEvents(this.pageEvents, this, EventType.PAGE_TURNING);
    this.node.emit('page-turning', this);
  },
  // 是否超过自动滚动临界值
  _isScrollable: function _isScrollable(offset, index, nextIndex) {
    if (this.sizeMode === SizeMode.Free) {
      var curPageCenter, nextPageCenter;

      if (this.direction === Direction.Horizontal) {
        curPageCenter = this._scrollCenterOffsetX[index];
        nextPageCenter = this._scrollCenterOffsetX[nextIndex];
        return Math.abs(offset.x) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        curPageCenter = this._scrollCenterOffsetY[index];
        nextPageCenter = this._scrollCenterOffsetY[nextIndex];
        return Math.abs(offset.y) >= Math.abs(curPageCenter - nextPageCenter) * this.scrollThreshold;
      }
    } else {
      if (this.direction === Direction.Horizontal) {
        return Math.abs(offset.x) >= this._view.width * this.scrollThreshold;
      } else if (this.direction === Direction.Vertical) {
        return Math.abs(offset.y) >= this._view.height * this.scrollThreshold;
      }
    }
  },
  // 快速滑动
  _isQuicklyScrollable: function _isQuicklyScrollable(touchMoveVelocity) {
    if (this.direction === Direction.Horizontal) {
      if (Math.abs(touchMoveVelocity.x) > this.autoPageTurningThreshold) {
        return true;
      }
    } else if (this.direction === Direction.Vertical) {
      if (Math.abs(touchMoveVelocity.y) > this.autoPageTurningThreshold) {
        return true;
      }
    }

    return false;
  },
  // 通过 idx 获取偏移值数值
  _moveOffsetValue: function _moveOffsetValue(idx) {
    var offset = cc.v2(0, 0);

    if (this.sizeMode === SizeMode.Free) {
      if (this.direction === Direction.Horizontal) {
        offset.x = this._scrollCenterOffsetX[idx];
      } else if (this.direction === Direction.Vertical) {
        offset.y = this._scrollCenterOffsetY[idx];
      }
    } else {
      if (this.direction === Direction.Horizontal) {
        offset.x = idx * this._view.width;
      } else if (this.direction === Direction.Vertical) {
        offset.y = idx * this._view.height;
      }
    }

    return offset;
  },
  _getDragDirection: function _getDragDirection(moveOffset) {
    if (this.direction === Direction.Horizontal) {
      if (moveOffset.x === 0) {
        return 0;
      }

      return moveOffset.x > 0 ? 1 : -1;
    } else if (this.direction === Direction.Vertical) {
      // 由于滚动 Y 轴的原点在在右上角所以应该是小于 0
      if (moveOffset.y === 0) {
        return 0;
      }

      return moveOffset.y < 0 ? 1 : -1;
    }
  },
  _handleReleaseLogic: function _handleReleaseLogic(touch) {
    this._autoScrollToPage();

    if (this._scrolling) {
      this._scrolling = false;

      if (!this._autoScrolling) {
        this._dispatchEvent('scroll-ended');
      }
    }
  },
  _autoScrollToPage: function _autoScrollToPage() {
    var bounceBackStarted = this._startBounceBackIfNeeded();

    if (bounceBackStarted) {
      var bounceBackAmount = this._getHowMuchOutOfBoundary();

      bounceBackAmount = this._clampDelta(bounceBackAmount);

      if (bounceBackAmount.x > 0 || bounceBackAmount.y < 0) {
        this._curPageIdx = this._pages.length === 0 ? 0 : this._pages.length - 1;
      }

      if (bounceBackAmount.x < 0 || bounceBackAmount.y > 0) {
        this._curPageIdx = 0;
      }

      if (this.indicator) {
        this.indicator._changedState();
      }
    } else {
      var moveOffset = this._touchBeganPosition.sub(this._touchEndPosition);

      var index = this._curPageIdx,
          nextIndex = index + this._getDragDirection(moveOffset);

      var timeInSecond = this.pageTurningSpeed * Math.abs(index - nextIndex);

      if (nextIndex < this._pages.length) {
        if (this._isScrollable(moveOffset, index, nextIndex)) {
          this.scrollToPage(nextIndex, timeInSecond);
          return;
        } else {
          var touchMoveVelocity = this._calculateTouchMoveVelocity();

          if (this._isQuicklyScrollable(touchMoveVelocity)) {
            this.scrollToPage(nextIndex, timeInSecond);
            return;
          }
        }
      }

      this.scrollToPage(index, timeInSecond);
    }
  },
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    this._touchBeganPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    this._super(event, captureListeners);
  },
  _onTouchEnded: function _onTouchEnded(event, captureListeners) {
    this._touchEndPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onTouchCancelled: function _onTouchCancelled(event, captureListeners) {
    this._touchEndPosition = event.touch.getLocation();

    this._super(event, captureListeners);
  },
  _onMouseWheel: function _onMouseWheel() {}
});
cc.PageView = module.exports = PageView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event page-turning
 * @param {Event.EventCustom} event
 * @param {PageView} pageView - The PageView component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NQYWdlVmlldy5qcyJdLCJuYW1lcyI6WyJTaXplTW9kZSIsImNjIiwiRW51bSIsIlVuaWZpZWQiLCJGcmVlIiwiRGlyZWN0aW9uIiwiSG9yaXpvbnRhbCIsIlZlcnRpY2FsIiwiRXZlbnRUeXBlIiwiUEFHRV9UVVJOSU5HIiwiUGFnZVZpZXciLCJDbGFzcyIsIm5hbWUiLCJTY3JvbGxWaWV3IiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsImN0b3IiLCJfY3VyUGFnZUlkeCIsIl9sYXN0UGFnZUlkeCIsIl9wYWdlcyIsIl9pbml0Q29udGVudFBvcyIsInYyIiwiX3Njcm9sbENlbnRlck9mZnNldFgiLCJfc2Nyb2xsQ2VudGVyT2Zmc2V0WSIsInByb3BlcnRpZXMiLCJzaXplTW9kZSIsInR5cGUiLCJ0b29sdGlwIiwiQ0NfREVWIiwibm90aWZ5IiwiX3N5bmNTaXplTW9kZSIsImRpcmVjdGlvbiIsIl9zeW5jU2Nyb2xsRGlyZWN0aW9uIiwic2Nyb2xsVGhyZXNob2xkIiwiRmxvYXQiLCJzbGlkZSIsInJhbmdlIiwiYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkIiwicGFnZVR1cm5pbmdFdmVudFRpbWluZyIsImluZGljYXRvciIsIlBhZ2VWaWV3SW5kaWNhdG9yIiwic2V0UGFnZVZpZXciLCJwYWdlVHVybmluZ1NwZWVkIiwicGFnZUV2ZW50cyIsIkNvbXBvbmVudCIsIkV2ZW50SGFuZGxlciIsInN0YXRpY3MiLCJfX3ByZWxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiU0laRV9DSEFOR0VEIiwiX3VwZGF0ZUFsbFBhZ2VzU2l6ZSIsIm9uRW5hYmxlIiwiX3N1cGVyIiwiX2Rpc3BhdGNoUGFnZVR1cm5pbmdFdmVudCIsIm9uRGlzYWJsZSIsIm9mZiIsIm9uTG9hZCIsIl9pbml0UGFnZXMiLCJvbkRlc3Ryb3kiLCJnZXRDdXJyZW50UGFnZUluZGV4Iiwic2V0Q3VycmVudFBhZ2VJbmRleCIsImluZGV4Iiwic2Nyb2xsVG9QYWdlIiwiZ2V0UGFnZXMiLCJhZGRQYWdlIiwicGFnZSIsImluZGV4T2YiLCJjb250ZW50IiwiYWRkQ2hpbGQiLCJwdXNoIiwiX3VwZGF0ZVBhZ2VWaWV3IiwiaW5zZXJ0UGFnZSIsInBhZ2VDb3VudCIsImxlbmd0aCIsInNwbGljZSIsInJlbW92ZVBhZ2UiLCJ3YXJuSUQiLCJyZW1vdmVQYWdlQXRJbmRleCIsInBhZ2VMaXN0IiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVBbGxQYWdlcyIsImxvY1BhZ2VzIiwiaSIsImxlbiIsImlkeCIsInRpbWVJblNlY29uZCIsInVuZGVmaW5lZCIsInNjcm9sbFRvT2Zmc2V0IiwiX21vdmVPZmZzZXRWYWx1ZSIsIl9jaGFuZ2VkU3RhdGUiLCJnZXRTY3JvbGxFbmRlZEV2ZW50VGltaW5nIiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwibGF5b3V0IiwiZ2V0Q29tcG9uZW50IiwiTGF5b3V0IiwibGFzdFBhZ2UiLCJwYWRkaW5nTGVmdCIsIl92aWV3Iiwid2lkdGgiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nVG9wIiwiaGVpZ2h0IiwicGFkZGluZ0JvdHRvbSIsInVwZGF0ZUxheW91dCIsImVuYWJsZWQiLCJjb250ZW50UG9zIiwic2V0U2libGluZ0luZGV4IiwiTWF0aCIsImFicyIsIngiLCJ5IiwiX3JlZnJlc2giLCJjaGlsZHJlbiIsInNlbGZTaXplIiwiZ2V0Q29udGVudFNpemUiLCJzZXRDb250ZW50U2l6ZSIsInBvc2l0aW9uIiwiZW1pdEV2ZW50cyIsImVtaXQiLCJfaXNTY3JvbGxhYmxlIiwib2Zmc2V0IiwibmV4dEluZGV4IiwiY3VyUGFnZUNlbnRlciIsIm5leHRQYWdlQ2VudGVyIiwiX2lzUXVpY2tseVNjcm9sbGFibGUiLCJ0b3VjaE1vdmVWZWxvY2l0eSIsIl9nZXREcmFnRGlyZWN0aW9uIiwibW92ZU9mZnNldCIsIl9oYW5kbGVSZWxlYXNlTG9naWMiLCJ0b3VjaCIsIl9hdXRvU2Nyb2xsVG9QYWdlIiwiX3Njcm9sbGluZyIsIl9hdXRvU2Nyb2xsaW5nIiwiX2Rpc3BhdGNoRXZlbnQiLCJib3VuY2VCYWNrU3RhcnRlZCIsIl9zdGFydEJvdW5jZUJhY2tJZk5lZWRlZCIsImJvdW5jZUJhY2tBbW91bnQiLCJfZ2V0SG93TXVjaE91dE9mQm91bmRhcnkiLCJfY2xhbXBEZWx0YSIsIl90b3VjaEJlZ2FuUG9zaXRpb24iLCJzdWIiLCJfdG91Y2hFbmRQb3NpdGlvbiIsIl9jYWxjdWxhdGVUb3VjaE1vdmVWZWxvY2l0eSIsIl9vblRvdWNoQmVnYW4iLCJldmVudCIsImNhcHR1cmVMaXN0ZW5lcnMiLCJnZXRMb2NhdGlvbiIsIl9vblRvdWNoTW92ZWQiLCJfb25Ub3VjaEVuZGVkIiwiX29uVG91Y2hDYW5jZWxsZWQiLCJfb25Nb3VzZVdoZWVsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7QUFLQSxJQUFJQSxRQUFRLEdBQUdDLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ25COzs7OztBQUtBQyxFQUFBQSxPQUFPLEVBQUUsQ0FOVTs7QUFPbkI7Ozs7O0FBS0FDLEVBQUFBLElBQUksRUFBRTtBQVphLENBQVIsQ0FBZjtBQWVBOzs7Ozs7QUFLQSxJQUFJQyxTQUFTLEdBQUdKLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQ3BCOzs7OztBQUtBSSxFQUFBQSxVQUFVLEVBQUUsQ0FOUTs7QUFPcEI7Ozs7O0FBS0FDLEVBQUFBLFFBQVEsRUFBRTtBQVpVLENBQVIsQ0FBaEI7QUFlQTs7Ozs7O0FBS0EsSUFBSUMsU0FBUyxHQUFHUCxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNwQjs7Ozs7QUFLQU8sRUFBQUEsWUFBWSxFQUFFO0FBTk0sQ0FBUixDQUFoQjtBQVVBOzs7Ozs7O0FBTUEsSUFBSUMsUUFBUSxHQUFHVCxFQUFFLENBQUNVLEtBQUgsQ0FBUztBQUNwQkMs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aEJtQjtBQW9oQnBCSyxFQUFBQSxhQUFhLEVBQUUseUJBQVksQ0FBRztBQXBoQlYsQ0FBVCxDQUFmO0FBdWhCQTVKLEVBQUUsQ0FBQ1MsUUFBSCxHQUFjb0osTUFBTSxDQUFDQyxPQUFQLEdBQWlCckosUUFBL0I7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKipcbiAqICEjZW4gVGhlIFBhZ2UgVmlldyBTaXplIE1vZGVcbiAqICEjemgg6aG16Z2i6KeG5Zu+5q+P5Liq6aG16Z2i57uf5LiA55qE5aSn5bCP57G75Z6LXG4gKiBAZW51bSBQYWdlVmlldy5TaXplTW9kZVxuICovXG52YXIgU2l6ZU1vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIEVhY2ggcGFnZSBpcyB1bmlmaWVkIGluIHNpemVcbiAgICAgKiAhI3poIOavj+S4qumhtemdoue7n+S4gOWkp+Wwj1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBVbmlmaWVkXG4gICAgICovXG4gICAgVW5pZmllZDogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIEVhY2ggcGFnZSBpcyBpbiBmcmVlIHNpemVcbiAgICAgKiAhI3poIOavj+S4qumhtemdouWkp+Wwj+maj+aEj1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBGcmVlXG4gICAgICovXG4gICAgRnJlZTogMVxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgUGFnZSBWaWV3IERpcmVjdGlvblxuICogISN6aCDpobXpnaLop4blm77mu5rliqjnsbvlnotcbiAqIEBlbnVtIFBhZ2VWaWV3LkRpcmVjdGlvblxuICovXG52YXIgRGlyZWN0aW9uID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBIb3Jpem9udGFsIHNjcm9sbC5cbiAgICAgKiAhI3poIOawtOW5s+a7muWKqFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBIb3Jpem9udGFsXG4gICAgICovXG4gICAgSG9yaXpvbnRhbDogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFZlcnRpY2FsIHNjcm9sbC5cbiAgICAgKiAhI3poIOWeguebtOa7muWKqFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWZXJ0aWNhbFxuICAgICAqL1xuICAgIFZlcnRpY2FsOiAxXG59KTtcblxuLyoqXG4gKiAhI2VuIEVudW0gZm9yIFNjcm9sbFZpZXcgZXZlbnQgdHlwZS5cbiAqICEjemgg5rua5Yqo6KeG5Zu+5LqL5Lu257G75Z6LXG4gKiBAZW51bSBQYWdlVmlldy5FdmVudFR5cGVcbiAqL1xudmFyIEV2ZW50VHlwZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBhZ2UgdHVybmluZyBldmVudFxuICAgICAqICEjemgg57+76aG15LqL5Lu2XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBBR0VfVFVSTklOR1xuICAgICAqL1xuICAgIFBBR0VfVFVSTklORzogMFxuXG59KTtcblxuLyoqXG4gKiAhI2VuIFRoZSBQYWdlVmlldyBjb250cm9sXG4gKiAhI3poIOmhtemdouinhuWbvue7hOS7tlxuICogQGNsYXNzIFBhZ2VWaWV3XG4gKiBAZXh0ZW5kcyBTY3JvbGxWaWV3XG4gKi9cbnZhciBQYWdlVmlldyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuUGFnZVZpZXcnLFxuICAgIGV4dGVuZHM6IGNjLlNjcm9sbFZpZXcsXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvUGFnZVZpZXcnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwucGFnZXZpZXcnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2NjcGFnZXZpZXcuanMnLFxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogZmFsc2VcbiAgICB9LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gMDtcbiAgICAgICAgdGhpcy5fbGFzdFBhZ2VJZHggPSAwO1xuICAgICAgICB0aGlzLl9wYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbml0Q29udGVudFBvcyA9IGNjLnYyKCk7XG4gICAgICAgIHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFggPSBbXTsgLy8g5q+P5LiA5Liq6aG16Z2i5bGF5Lit5pe26ZyA6KaB55qE5YGP56e76YeP77yIWO+8iVxuICAgICAgICB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRZID0gW107IC8vIOavj+S4gOS4qumhtemdouWxheS4reaXtumcgOimgeeahOWBj+enu+mHj++8iFnvvIlcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNwZWNpZnkgdGhlIHNpemUgdHlwZSBvZiBlYWNoIHBhZ2UgaW4gUGFnZVZpZXcuXG4gICAgICAgICAqICEjemgg6aG16Z2i6KeG5Zu+5Lit5q+P5Liq6aG16Z2i5aSn5bCP57G75Z6LXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UGFnZVZpZXcuU2l6ZU1vZGV9IHNpemVNb2RlXG4gICAgICAgICAqL1xuICAgICAgICBzaXplTW9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogU2l6ZU1vZGUuVW5pZmllZCxcbiAgICAgICAgICAgIHR5cGU6IFNpemVNb2RlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5zaXplTW9kZScsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N5bmNTaXplTW9kZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBwYWdlIHZpZXcgZGlyZWN0aW9uXG4gICAgICAgICAqICEjemgg6aG16Z2i6KeG5Zu+5rua5Yqo57G75Z6LXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UGFnZVZpZXcuRGlyZWN0aW9ufSBkaXJlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogRGlyZWN0aW9uLkhvcml6b250YWwsXG4gICAgICAgICAgICB0eXBlOiBEaXJlY3Rpb24sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LmRpcmVjdGlvbicsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N5bmNTY3JvbGxEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgc2Nyb2xsIHRocmVzaG9sZCB2YWx1ZSwgd2hlbiBkcmFnIGV4Y2VlZHMgdGhpcyB2YWx1ZSxcbiAgICAgICAgICogcmVsZWFzZSB0aGUgbmV4dCBwYWdlIHdpbGwgYXV0b21hdGljYWxseSBzY3JvbGwsIGxlc3MgdGhhbiB0aGUgcmVzdG9yZVxuICAgICAgICAgKiAhI3poIOa7muWKqOS4tOeVjOWAvO+8jOm7mOiupOWNleS9jeeZvuWIhuavlO+8jOW9k+aLluaLvei2heWHuuivpeaVsOWAvOaXtu+8jOadvuW8gOS8muiHquWKqOa7muWKqOS4i+S4gOmhte+8jOWwj+S6juaXtuWImei/mOWOn+OAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gc2Nyb2xsVGhyZXNob2xkXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxUaHJlc2hvbGQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAuNSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgc2xpZGU6IHRydWUsXG4gICAgICAgICAgICByYW5nZTogWzAsIDEsIDAuMDFdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5zY3JvbGxUaHJlc2hvbGQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogQXV0byBwYWdlIHR1cm5pbmcgdmVsb2NpdHkgdGhyZXNob2xkLiBXaGVuIHVzZXJzIHN3aXBlIHRoZSBQYWdlVmlldyBxdWlja2x5LFxuICAgICAgICAgKiBpdCB3aWxsIGNhbGN1bGF0ZSBhIHZlbG9jaXR5IGJhc2VkIG9uIHRoZSBzY3JvbGwgZGlzdGFuY2UgYW5kIHRpbWUsXG4gICAgICAgICAqIGlmIHRoZSBjYWxjdWxhdGVkIHZlbG9jaXR5IGlzIGxhcmdlciB0aGFuIHRoZSB0aHJlc2hvbGQsIHRoZW4gaXQgd2lsbCB0cmlnZ2VyIHBhZ2UgdHVybmluZy5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlv6vpgJ/mu5Hliqjnv7vpobXkuLTnlYzlgLzjgIJcbiAgICAgICAgICog5b2T55So5oi35b+r6YCf5ruR5Yqo5pe277yM5Lya5qC55o2u5ruR5Yqo5byA5aeL5ZKM57uT5p2f55qE6Led56a75LiO5pe26Ze06K6h566X5Ye65LiA5Liq6YCf5bqm5YC877yMXG4gICAgICAgICAqIOivpeWAvOS4juatpOS4tOeVjOWAvOebuOavlOi+g++8jOWmguaenOWkp+S6juS4tOeVjOWAvO+8jOWImei/m+ihjOiHquWKqOe/u+mhteOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYXV0b1BhZ2VUdXJuaW5nVGhyZXNob2xkXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvUGFnZVR1cm5pbmdUaHJlc2hvbGQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDEwMCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5hdXRvUGFnZVR1cm5pbmdUaHJlc2hvbGQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ2hhbmdlIHRoZSBQYWdlVHVybmluZyBldmVudCB0aW1pbmcgb2YgUGFnZVZpZXcuXG4gICAgICAgICAqICEjemgg6K6+572uIFBhZ2VWaWV3IFBhZ2VUdXJuaW5nIOS6i+S7tueahOWPkemAgeaXtuacuuOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFnZVR1cm5pbmdFdmVudFRpbWluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcGFnZVR1cm5pbmdFdmVudFRpbWluZzoge1xuICAgICAgICAgICAgZGVmYXVsdDogMC4xLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICByYW5nZTogWzAsIDEsIDAuMDFdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5wYWdldmlldy5wYWdlVHVybmluZ0V2ZW50VGltaW5nJ1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBQYWdlIFZpZXcgSW5kaWNhdG9yXG4gICAgICAgICAqICEjemgg6aG16Z2i6KeG5Zu+5oyH56S65Zmo57uE5Lu2XG4gICAgICAgICAqIEBwcm9wZXJ0eSB7UGFnZVZpZXdJbmRpY2F0b3J9IGluZGljYXRvclxuICAgICAgICAgKi9cbiAgICAgICAgaW5kaWNhdG9yOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUGFnZVZpZXdJbmRpY2F0b3IsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LmluZGljYXRvcicsXG4gICAgICAgICAgICBub3RpZnk6ICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbmRpY2F0b3Iuc2V0UGFnZVZpZXcodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB0aW1lIHJlcXVpcmVkIHRvIHR1cm4gb3ZlciBhIHBhZ2UuIHVuaXQ6IHNlY29uZFxuICAgICAgICAgKiAhI3poIOavj+S4qumhtemdoue/u+mhteaXtuaJgOmcgOaXtumXtOOAguWNleS9je+8muenklxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFnZVR1cm5pbmdTcGVlZFxuICAgICAgICAgKi9cbiAgICAgICAgcGFnZVR1cm5pbmdTcGVlZDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMC4zLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LnBhZ2VUdXJuaW5nU3BlZWQnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUGFnZVZpZXcgZXZlbnRzIGNhbGxiYWNrXG4gICAgICAgICAqICEjemgg5rua5Yqo6KeG5Zu+55qE5LqL5Lu25Zue6LCD5Ye95pWwXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Q29tcG9uZW50LkV2ZW50SGFuZGxlcltdfSBwYWdlRXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBwYWdlRXZlbnRzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXIsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnBhZ2V2aWV3LnBhZ2VFdmVudHMnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBTaXplTW9kZTogU2l6ZU1vZGUsXG4gICAgICAgIERpcmVjdGlvbjogRGlyZWN0aW9uLFxuICAgICAgICBFdmVudFR5cGU6IEV2ZW50VHlwZVxuICAgIH0sXG5cbiAgICBfX3ByZWxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlQWxsUGFnZXNTaXplLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgb25FbmFibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgaWYoIUNDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKCdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnLCB0aGlzLl9kaXNwYXRjaFBhZ2VUdXJuaW5nRXZlbnQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGlzYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgICAgICBpZighQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKCdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnLCB0aGlzLl9kaXNwYXRjaFBhZ2VUdXJuaW5nRXZlbnQsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9pbml0UGFnZXMoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5kaWNhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmluZGljYXRvci5zZXRQYWdlVmlldyh0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgdGhpcy5fdXBkYXRlQWxsUGFnZXNTaXplLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGN1cnJlbnQgcGFnZSBpbmRleFxuICAgICAqICEjemgg6L+U5Zue5b2T5YmN6aG16Z2i57Si5byVXG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50UGFnZUluZGV4XG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRDdXJyZW50UGFnZUluZGV4OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJQYWdlSWR4O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNldCBjdXJyZW50IHBhZ2UgaW5kZXhcbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjemhtemdoue0ouW8lVxuICAgICAqIEBtZXRob2Qgc2V0Q3VycmVudFBhZ2VJbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHNldEN1cnJlbnRQYWdlSW5kZXg6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB0aGlzLnNjcm9sbFRvUGFnZShpbmRleCwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBhbGwgcGFnZXMgb2YgcGFnZXZpZXdcbiAgICAgKiAhI3poIOi/lOWbnuinhuWbvuS4reeahOaJgOaciemhtemdolxuICAgICAqIEBtZXRob2QgZ2V0UGFnZXNcbiAgICAgKiBAcmV0dXJucyB7Tm9kZVtdfVxuICAgICAqL1xuICAgIGdldFBhZ2VzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYWdlcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBBdCB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHBhZ2UgdmlldyB0byBpbnNlcnQgYSBuZXcgdmlld1xuICAgICAqICEjemgg5Zyo5b2T5YmN6aG16Z2i6KeG5Zu+55qE5bC+6YOo5o+S5YWl5LiA5Liq5paw6KeG5Zu+XG4gICAgICogQG1ldGhvZCBhZGRQYWdlXG4gICAgICogQHBhcmFtIHtOb2RlfSBwYWdlXG4gICAgICovXG4gICAgYWRkUGFnZTogZnVuY3Rpb24gKHBhZ2UpIHtcbiAgICAgICAgaWYgKCFwYWdlIHx8IHRoaXMuX3BhZ2VzLmluZGV4T2YocGFnZSkgIT09IC0xIHx8ICF0aGlzLmNvbnRlbnQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMuY29udGVudC5hZGRDaGlsZChwYWdlKTtcbiAgICAgICAgdGhpcy5fcGFnZXMucHVzaChwYWdlKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUGFnZVZpZXcoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBJbnNlcnRzIGEgcGFnZSBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uXG4gICAgICogISN6aCDlsIbpobXpnaLmj5LlhaXmjIflrprkvY3nva7kuK1cbiAgICAgKiBAbWV0aG9kIGluc2VydFBhZ2VcbiAgICAgKiBAcGFyYW0ge05vZGV9IHBhZ2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAgICAgKi9cbiAgICBpbnNlcnRQYWdlOiBmdW5jdGlvbiAocGFnZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCAhcGFnZSB8fCB0aGlzLl9wYWdlcy5pbmRleE9mKHBhZ2UpICE9PSAtMSB8fCAhdGhpcy5jb250ZW50KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcGFnZUNvdW50ID0gdGhpcy5fcGFnZXMubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kZXggPj0gcGFnZUNvdW50KVxuICAgICAgICAgICAgdGhpcy5hZGRQYWdlKHBhZ2UpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BhZ2VzLnNwbGljZShpbmRleCwgMCwgcGFnZSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQuYWRkQ2hpbGQocGFnZSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQYWdlVmlldygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyBhIHBhZ2UgZnJvbSBQYWdlVmlldy5cbiAgICAgKiAhI3poIOenu+mZpOaMh+WumumhtemdolxuICAgICAqIEBtZXRob2QgcmVtb3ZlUGFnZVxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcGFnZVxuICAgICAqL1xuICAgIHJlbW92ZVBhZ2U6IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgICAgIGlmICghcGFnZSB8fCAhdGhpcy5jb250ZW50KSByZXR1cm47XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX3BhZ2VzLmluZGV4T2YocGFnZSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNjLndhcm5JRCg0MzAwLCBwYWdlLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlUGFnZUF0SW5kZXgoaW5kZXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZXMgYSBwYWdlIGF0IGluZGV4IG9mIFBhZ2VWaWV3LlxuICAgICAqICEjemgg56e76Zmk5oyH5a6a5LiL5qCH55qE6aG16Z2iXG4gICAgICogQG1ldGhvZCByZW1vdmVQYWdlQXRJbmRleFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqL1xuICAgIHJlbW92ZVBhZ2VBdEluZGV4OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIHBhZ2VMaXN0ID0gdGhpcy5fcGFnZXM7XG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gcGFnZUxpc3QubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHZhciBwYWdlID0gcGFnZUxpc3RbaW5kZXhdO1xuICAgICAgICBpZiAoIXBhZ2UpIHJldHVybjtcbiAgICAgICAgdGhpcy5jb250ZW50LnJlbW92ZUNoaWxkKHBhZ2UpO1xuICAgICAgICBwYWdlTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl91cGRhdGVQYWdlVmlldygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlbW92ZXMgYWxsIHBhZ2VzIGZyb20gUGFnZVZpZXdcbiAgICAgKiAhI3poIOenu+mZpOaJgOaciemhtemdolxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsUGFnZXNcbiAgICAgKi9cbiAgICByZW1vdmVBbGxQYWdlczogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGxvY1BhZ2VzID0gdGhpcy5fcGFnZXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsb2NQYWdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgICAgICAgIHRoaXMuY29udGVudC5yZW1vdmVDaGlsZChsb2NQYWdlc1tpXSk7XG4gICAgICAgIHRoaXMuX3BhZ2VzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZ2VWaWV3KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2Nyb2xsIFBhZ2VWaWV3IHRvIGluZGV4LlxuICAgICAqICEjemgg5rua5Yqo5Yiw5oyH5a6a6aG16Z2iXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1BhZ2VcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaWR4IGluZGV4IG9mIHBhZ2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVJblNlY29uZCBzY3JvbGxpbmcgdGltZVxuICAgICAqL1xuICAgIHNjcm9sbFRvUGFnZTogZnVuY3Rpb24gKGlkeCwgdGltZUluU2Vjb25kKSB7XG4gICAgICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLl9wYWdlcy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRpbWVJblNlY29uZCA9IHRpbWVJblNlY29uZCAhPT0gdW5kZWZpbmVkID8gdGltZUluU2Vjb25kIDogMC4zO1xuICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gaWR4O1xuICAgICAgICB0aGlzLnNjcm9sbFRvT2Zmc2V0KHRoaXMuX21vdmVPZmZzZXRWYWx1ZShpZHgpLCB0aW1lSW5TZWNvbmQsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLl9jaGFuZ2VkU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL292ZXJyaWRlIHRoZSBtZXRob2Qgb2YgU2Nyb2xsVmlld1xuICAgIGdldFNjcm9sbEVuZGVkRXZlbnRUaW1pbmc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR1cm5pbmdFdmVudFRpbWluZztcbiAgICB9LFxuXG4gICAgX3N5bmNTY3JvbGxEaXJlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsID0gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsO1xuICAgICAgICB0aGlzLnZlcnRpY2FsID0gdGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5WZXJ0aWNhbDtcbiAgICB9LFxuXG4gICAgX3N5bmNTaXplTW9kZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgaWYgKGxheW91dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2l6ZU1vZGUgPT09IFNpemVNb2RlLkZyZWUgJiYgdGhpcy5fcGFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBsYXN0UGFnZSA9IHRoaXMuX3BhZ2VzW3RoaXMuX3BhZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0LnBhZGRpbmdMZWZ0ID0gKHRoaXMuX3ZpZXcud2lkdGggLSB0aGlzLl9wYWdlc1swXS53aWR0aCkgLyAyO1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXQucGFkZGluZ1JpZ2h0ID0gKHRoaXMuX3ZpZXcud2lkdGggLSBsYXN0UGFnZS53aWR0aCkgLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dC5wYWRkaW5nVG9wID0gKHRoaXMuX3ZpZXcuaGVpZ2h0IC0gdGhpcy5fcGFnZXNbMF0uaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dC5wYWRkaW5nQm90dG9tID0gKHRoaXMuX3ZpZXcuaGVpZ2h0IC0gbGFzdFBhZ2UuaGVpZ2h0KSAvIDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIOWIt+aWsOmhtemdouinhuWbvlxuICAgIF91cGRhdGVQYWdlVmlldzogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDlvZPpobXpnaLmlbDnu4Tlj5jljJbml7bkv67mlLkgY29udGVudCDlpKflsI9cbiAgICAgICAgdmFyIGxheW91dCA9IHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgaWYgKGxheW91dCAmJiBsYXlvdXQuZW5hYmxlZCkge1xuICAgICAgICAgICAgbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhZ2VDb3VudCA9IHRoaXMuX3BhZ2VzLmxlbmd0aDtcblxuICAgICAgICBpZiAodGhpcy5fY3VyUGFnZUlkeCA+PSBwYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1clBhZ2VJZHggPSBwYWdlQ291bnQgPT09IDAgPyAwIDogcGFnZUNvdW50IC0gMTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RQYWdlSWR4ID0gdGhpcy5fY3VyUGFnZUlkeDtcbiAgICAgICAgfVxuICAgICAgICAvLyDov5vooYzmjpLluo9cbiAgICAgICAgdmFyIGNvbnRlbnRQb3MgPSB0aGlzLl9pbml0Q29udGVudFBvcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLl9wYWdlc1tpXTtcbiAgICAgICAgICAgIHBhZ2Uuc2V0U2libGluZ0luZGV4KGkpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFhbaV0gPSBNYXRoLmFicyhjb250ZW50UG9zLnggKyBwYWdlLngpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsQ2VudGVyT2Zmc2V0WVtpXSA9IE1hdGguYWJzKGNvbnRlbnRQb3MueSArIHBhZ2UueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyDliLfmlrAgaW5kaWNhdG9yIOS/oeaBr+S4jueKtuaAgVxuICAgICAgICBpZiAodGhpcy5pbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLl9yZWZyZXNoKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8g5Yi35paw5omA5pyJ6aG16Z2i55qE5aSn5bCPXG4gICAgX3VwZGF0ZUFsbFBhZ2VzU2l6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zaXplTW9kZSAhPT0gU2l6ZU1vZGUuVW5pZmllZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsb2NQYWdlcyA9IENDX0VESVRPUiA/IHRoaXMuY29udGVudC5jaGlsZHJlbiA6IHRoaXMuX3BhZ2VzO1xuICAgICAgICB2YXIgc2VsZlNpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsb2NQYWdlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbG9jUGFnZXNbaV0uc2V0Q29udGVudFNpemUoc2VsZlNpemUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIOWIneWni+WMlumhtemdolxuICAgIF9pbml0UGFnZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbnRlbnQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRoaXMuX2luaXRDb250ZW50UG9zID0gdGhpcy5jb250ZW50LnBvc2l0aW9uO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNvbnRlbnQuY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBwYWdlID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAodGhpcy5fcGFnZXMuaW5kZXhPZihwYWdlKSA+PSAwKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICB0aGlzLl9wYWdlcy5wdXNoKHBhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N5bmNTY3JvbGxEaXJlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fc3luY1NpemVNb2RlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVBhZ2VWaWV3KCk7XG4gICAgfSxcblxuICAgIF9kaXNwYXRjaFBhZ2VUdXJuaW5nRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RQYWdlSWR4ID09PSB0aGlzLl9jdXJQYWdlSWR4KSByZXR1cm47XG4gICAgICAgIHRoaXMuX2xhc3RQYWdlSWR4ID0gdGhpcy5fY3VyUGFnZUlkeDtcbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMucGFnZUV2ZW50cywgdGhpcywgRXZlbnRUeXBlLlBBR0VfVFVSTklORyk7XG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdwYWdlLXR1cm5pbmcnLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLy8g5piv5ZCm6LaF6L+H6Ieq5Yqo5rua5Yqo5Li055WM5YC8XG4gICAgX2lzU2Nyb2xsYWJsZTogZnVuY3Rpb24gKG9mZnNldCwgaW5kZXgsIG5leHRJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5zaXplTW9kZSA9PT0gU2l6ZU1vZGUuRnJlZSkge1xuICAgICAgICAgICAgdmFyIGN1clBhZ2VDZW50ZXIsIG5leHRQYWdlQ2VudGVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIGN1clBhZ2VDZW50ZXIgPSB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRYW2luZGV4XTtcbiAgICAgICAgICAgICAgICBuZXh0UGFnZUNlbnRlciA9IHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFhbbmV4dEluZGV4XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMob2Zmc2V0LngpID49IE1hdGguYWJzKGN1clBhZ2VDZW50ZXIgLSBuZXh0UGFnZUNlbnRlcikgKiB0aGlzLnNjcm9sbFRocmVzaG9sZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBjdXJQYWdlQ2VudGVyID0gdGhpcy5fc2Nyb2xsQ2VudGVyT2Zmc2V0WVtpbmRleF07XG4gICAgICAgICAgICAgICAgbmV4dFBhZ2VDZW50ZXIgPSB0aGlzLl9zY3JvbGxDZW50ZXJPZmZzZXRZW25leHRJbmRleF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC55KSA+PSBNYXRoLmFicyhjdXJQYWdlQ2VudGVyIC0gbmV4dFBhZ2VDZW50ZXIpICogdGhpcy5zY3JvbGxUaHJlc2hvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09IERpcmVjdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC54KSA+PSB0aGlzLl92aWV3LndpZHRoICogdGhpcy5zY3JvbGxUaHJlc2hvbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKG9mZnNldC55KSA+PSB0aGlzLl92aWV3LmhlaWdodCAqIHRoaXMuc2Nyb2xsVGhyZXNob2xkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIOW/q+mAn+a7keWKqFxuICAgIF9pc1F1aWNrbHlTY3JvbGxhYmxlOiBmdW5jdGlvbiAodG91Y2hNb3ZlVmVsb2NpdHkpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRvdWNoTW92ZVZlbG9jaXR5LngpID4gdGhpcy5hdXRvUGFnZVR1cm5pbmdUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnModG91Y2hNb3ZlVmVsb2NpdHkueSkgPiB0aGlzLmF1dG9QYWdlVHVybmluZ1RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8g6YCa6L+HIGlkeCDojrflj5blgY/np7vlgLzmlbDlgLxcbiAgICBfbW92ZU9mZnNldFZhbHVlOiBmdW5jdGlvbiAoaWR4KSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZU1vZGUgPT09IFNpemVNb2RlLkZyZWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQueCA9IHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFhbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQueSA9IHRoaXMuX3Njcm9sbENlbnRlck9mZnNldFlbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLkhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXQueCA9IGlkeCAqIHRoaXMuX3ZpZXcud2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LnkgPSBpZHggKiB0aGlzLl92aWV3LmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgIH0sXG5cbiAgICBfZ2V0RHJhZ0RpcmVjdGlvbjogZnVuY3Rpb24gKG1vdmVPZmZzZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgaWYgKG1vdmVPZmZzZXQueCA9PT0gMCkgeyByZXR1cm4gMDsgfVxuICAgICAgICAgICAgcmV0dXJuIChtb3ZlT2Zmc2V0LnggPiAwID8gMSA6IC0xKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgICAgICAvLyDnlLHkuo7mu5rliqggWSDovbTnmoTljp/ngrnlnKjlnKjlj7PkuIrop5LmiYDku6XlupTor6XmmK/lsI/kuo4gMFxuICAgICAgICAgICAgaWYgKG1vdmVPZmZzZXQueSA9PT0gMCkgeyByZXR1cm4gMDsgfVxuICAgICAgICAgICAgcmV0dXJuIChtb3ZlT2Zmc2V0LnkgPCAwID8gMSA6IC0xKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGFuZGxlUmVsZWFzZUxvZ2ljOiBmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsVG9QYWdlKCk7XG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9hdXRvU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsLWVuZGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2F1dG9TY3JvbGxUb1BhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJvdW5jZUJhY2tTdGFydGVkID0gdGhpcy5fc3RhcnRCb3VuY2VCYWNrSWZOZWVkZWQoKTtcbiAgICAgICAgaWYgKGJvdW5jZUJhY2tTdGFydGVkKSB7XG4gICAgICAgICAgICBsZXQgYm91bmNlQmFja0Ftb3VudCA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCk7XG4gICAgICAgICAgICBib3VuY2VCYWNrQW1vdW50ID0gdGhpcy5fY2xhbXBEZWx0YShib3VuY2VCYWNrQW1vdW50KTtcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnggPiAwIHx8IGJvdW5jZUJhY2tBbW91bnQueSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJQYWdlSWR4ID0gdGhpcy5fcGFnZXMubGVuZ3RoID09PSAwID8gMCA6IHRoaXMuX3BhZ2VzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYm91bmNlQmFja0Ftb3VudC54IDwgMCB8fCBib3VuY2VCYWNrQW1vdW50LnkgPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3VyUGFnZUlkeCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmluZGljYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kaWNhdG9yLl9jaGFuZ2VkU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBtb3ZlT2Zmc2V0ID0gdGhpcy5fdG91Y2hCZWdhblBvc2l0aW9uLnN1Yih0aGlzLl90b3VjaEVuZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2N1clBhZ2VJZHgsIG5leHRJbmRleCA9IGluZGV4ICsgdGhpcy5fZ2V0RHJhZ0RpcmVjdGlvbihtb3ZlT2Zmc2V0KTtcbiAgICAgICAgICAgIHZhciB0aW1lSW5TZWNvbmQgPSB0aGlzLnBhZ2VUdXJuaW5nU3BlZWQgKiBNYXRoLmFicyhpbmRleCAtIG5leHRJbmRleCk7XG4gICAgICAgICAgICBpZiAobmV4dEluZGV4IDwgdGhpcy5fcGFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzU2Nyb2xsYWJsZShtb3ZlT2Zmc2V0LCBpbmRleCwgbmV4dEluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvUGFnZShuZXh0SW5kZXgsIHRpbWVJblNlY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaE1vdmVWZWxvY2l0eSA9IHRoaXMuX2NhbGN1bGF0ZVRvdWNoTW92ZVZlbG9jaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1F1aWNrbHlTY3JvbGxhYmxlKHRvdWNoTW92ZVZlbG9jaXR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1BhZ2UobmV4dEluZGV4LCB0aW1lSW5TZWNvbmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1BhZ2UoaW5kZXgsIHRpbWVJblNlY29uZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uVG91Y2hCZWdhbjogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMuX3RvdWNoQmVnYW5Qb3NpdGlvbiA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcbiAgICB9LFxuXG4gICAgX29uVG91Y2hNb3ZlZDogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcbiAgICB9LFxuXG4gICAgX29uVG91Y2hFbmRlZDogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICAgIHRoaXMuX3RvdWNoRW5kUG9zaXRpb24gPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICB0aGlzLl9zdXBlcihldmVudCwgY2FwdHVyZUxpc3RlbmVycyk7XG4gICAgfSxcblxuICAgIF9vblRvdWNoQ2FuY2VsbGVkOiBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgdGhpcy5fdG91Y2hFbmRQb3NpdGlvbiA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgIHRoaXMuX3N1cGVyKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKTtcbiAgICB9LFxuXG4gICAgX29uTW91c2VXaGVlbDogZnVuY3Rpb24gKCkgeyB9XG59KTtcblxuY2MuUGFnZVZpZXcgPSBtb2R1bGUuZXhwb3J0cyA9IFBhZ2VWaWV3O1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IHBhZ2UtdHVybmluZ1xuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7UGFnZVZpZXd9IHBhZ2VWaWV3IC0gVGhlIFBhZ2VWaWV3IGNvbXBvbmVudC5cbiAqL1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=