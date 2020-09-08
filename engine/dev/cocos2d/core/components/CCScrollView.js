
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCScrollView.js';
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
var NodeEvent = require('../CCNode').EventType;

var NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED = 5;
var OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
var EPSILON = 1e-4;
var MOVEMENT_FACTOR = 0.7;

var _tempPoint = cc.v2();

var _tempPrevPoint = cc.v2();

var quintEaseOut = function quintEaseOut(time) {
  time -= 1;
  return time * time * time * time * time + 1;
};

var getTimeInMilliseconds = function getTimeInMilliseconds() {
  var currentTime = new Date();
  return currentTime.getMilliseconds();
};
/**
 * !#en Enum for ScrollView event type.
 * !#zh 滚动视图事件类型
 * @enum ScrollView.EventType
 */


var EventType = cc.Enum({
  /**
   * !#en The event emmitted when ScrollView scroll to the top boundary of inner container
   * !#zh 滚动视图滚动到顶部边界事件
   * @property {Number} SCROLL_TO_TOP
   */
  SCROLL_TO_TOP: 0,

  /**
   * !#en The event emmitted when ScrollView scroll to the bottom boundary of inner container
   * !#zh 滚动视图滚动到底部边界事件
   * @property {Number} SCROLL_TO_BOTTOM
   */
  SCROLL_TO_BOTTOM: 1,

  /**
   * !#en The event emmitted when ScrollView scroll to the left boundary of inner container
   * !#zh 滚动视图滚动到左边界事件
   * @property {Number} SCROLL_TO_LEFT
   */
  SCROLL_TO_LEFT: 2,

  /**
   * !#en The event emmitted when ScrollView scroll to the right boundary of inner container
   * !#zh 滚动视图滚动到右边界事件
   * @property {Number} SCROLL_TO_RIGHT
   */
  SCROLL_TO_RIGHT: 3,

  /**
   * !#en The event emmitted when ScrollView is scrolling
   * !#zh 滚动视图正在滚动时发出的事件
   * @property {Number} SCROLLING
   */
  SCROLLING: 4,

  /**
   * !#en The event emmitted when ScrollView scroll to the top boundary of inner container and start bounce
   * !#zh 滚动视图滚动到顶部边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_TOP
   */
  BOUNCE_TOP: 5,

  /**
   * !#en The event emmitted when ScrollView scroll to the bottom boundary of inner container and start bounce
   * !#zh 滚动视图滚动到底部边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_BOTTOM
   */
  BOUNCE_BOTTOM: 6,

  /**
   * !#en The event emmitted when ScrollView scroll to the left boundary of inner container and start bounce
   * !#zh 滚动视图滚动到左边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_LEFT
   */
  BOUNCE_LEFT: 7,

  /**
   * !#en The event emmitted when ScrollView scroll to the right boundary of inner container and start bounce
   * !#zh 滚动视图滚动到右边界并且开始回弹时发出的事件
   * @property {Number} BOUNCE_RIGHT
   */
  BOUNCE_RIGHT: 8,

  /**
   * !#en The event emmitted when ScrollView auto scroll ended
   * !#zh 滚动视图滚动结束的时候发出的事件
   * @property {Number} SCROLL_ENDED
   */
  SCROLL_ENDED: 9,

  /**
   * !#en The event emmitted when user release the touch
   * !#zh 当用户松手的时候会发出一个事件
   * @property {Number} TOUCH_UP
   */
  TOUCH_UP: 10,

  /**
   * !#en The event emmitted when ScrollView auto scroll ended with a threshold
   * !#zh 滚动视图自动滚动快要结束的时候发出的事件
   * @property {Number} AUTOSCROLL_ENDED_WITH_THRESHOLD
   */
  AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,

  /**
   * !#en The event emmitted when ScrollView scroll began
   * !#zh 滚动视图滚动开始时发出的事件
   * @property {Number} SCROLL_BEGAN
   */
  SCROLL_BEGAN: 12
});
var eventMap = {
  'scroll-to-top': EventType.SCROLL_TO_TOP,
  'scroll-to-bottom': EventType.SCROLL_TO_BOTTOM,
  'scroll-to-left': EventType.SCROLL_TO_LEFT,
  'scroll-to-right': EventType.SCROLL_TO_RIGHT,
  'scrolling': EventType.SCROLLING,
  'bounce-bottom': EventType.BOUNCE_BOTTOM,
  'bounce-left': EventType.BOUNCE_LEFT,
  'bounce-right': EventType.BOUNCE_RIGHT,
  'bounce-top': EventType.BOUNCE_TOP,
  'scroll-ended': EventType.SCROLL_ENDED,
  'touch-up': EventType.TOUCH_UP,
  'scroll-ended-with-threshold': EventType.AUTOSCROLL_ENDED_WITH_THRESHOLD,
  'scroll-began': EventType.SCROLL_BEGAN
};
/**
 * !#en
 * Layout container for a view hierarchy that can be scrolled by the user,
 * allowing it to be larger than the physical display.
 *
 * !#zh
 * 滚动视图组件
 * @class ScrollView
 * @extends Component
 */

var ScrollView = cc.Class({
  name: 'cc.ScrollView',
  "extends": require('./CCViewGroup'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/ScrollView',
    help: 'i18n:COMPONENT.help_url.scrollview',
    inspector: 'packages://inspector/inspectors/comps/scrollview.js',
    executeInEditMode: false
  },
  ctor: function ctor() {
    this._topBoundary = 0;
    this._bottomBoundary = 0;
    this._leftBoundary = 0;
    this._rightBoundary = 0;
    this._touchMoveDisplacements = [];
    this._touchMoveTimeDeltas = [];
    this._touchMovePreviousTimestamp = 0;
    this._touchMoved = false;
    this._autoScrolling = false;
    this._autoScrollAttenuate = false;
    this._autoScrollStartPosition = cc.v2(0, 0);
    this._autoScrollTargetDelta = cc.v2(0, 0);
    this._autoScrollTotalTime = 0;
    this._autoScrollAccumulatedTime = 0;
    this._autoScrollCurrentlyOutOfBoundary = false;
    this._autoScrollBraking = false;
    this._autoScrollBrakingStartPosition = cc.v2(0, 0);
    this._outOfBoundaryAmount = cc.v2(0, 0);
    this._outOfBoundaryAmountDirty = true;
    this._stopMouseWheel = false;
    this._mouseWheelEventElapsedTime = 0.0;
    this._isScrollEndedWithThresholdEventFired = false; //use bit wise operations to indicate the direction

    this._scrollEventEmitMask = 0;
    this._isBouncing = false;
    this._scrolling = false;
  },
  properties: {
    /**
     * !#en This is a reference to the UI element to be scrolled.
     * !#zh 可滚动展示内容的节点。
     * @property {Node} content
     */
    content: {
      "default": undefined,
      type: cc.Node,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.content',
      formerlySerializedAs: 'content',
      notify: function notify(oldValue) {
        this._calculateBoundary();
      }
    },

    /**
     * !#en Enable horizontal scroll.
     * !#zh 是否开启水平滚动。
     * @property {Boolean} horizontal
     */
    horizontal: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.horizontal'
    },

    /**
     * !#en Enable vertical scroll.
     * !#zh 是否开启垂直滚动。
     * @property {Boolean} vertical
     */
    vertical: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.vertical'
    },

    /**
     * !#en When inertia is set, the content will continue to move when touch ended.
     * !#zh 是否开启滚动惯性。
     * @property {Boolean} inertia
     */
    inertia: {
      "default": true,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.inertia'
    },

    /**
     * !#en
     * It determines how quickly the content stop moving. A value of 1 will stop the movement immediately.
     * A value of 0 will never stop the movement until it reaches to the boundary of scrollview.
     * !#zh
     * 开启惯性后，在用户停止触摸后滚动多快停止，0表示永不停止，1表示立刻停止。
     * @property {Number} brake
     */
    brake: {
      "default": 0.5,
      type: cc.Float,
      range: [0, 1, 0.1],
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.brake'
    },

    /**
     * !#en When elastic is set, the content will be bounce back when move out of boundary.
     * !#zh 是否允许滚动内容超过边界，并在停止触摸后回弹。
     * @property {Boolean} elastic
     */
    elastic: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.elastic'
    },

    /**
     * !#en The elapse time of bouncing back. A value of 0 will bounce back immediately.
     * !#zh 回弹持续的时间，0 表示将立即反弹。
     * @property {Number} bounceDuration
     */
    bounceDuration: {
      "default": 1,
      range: [0, 10],
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.bounceDuration'
    },

    /**
     * !#en The horizontal scrollbar reference.
     * !#zh 水平滚动的 ScrollBar。
     * @property {Scrollbar} horizontalScrollBar
     */
    horizontalScrollBar: {
      "default": undefined,
      type: cc.Scrollbar,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.horizontal_bar',
      notify: function notify() {
        if (this.horizontalScrollBar) {
          this.horizontalScrollBar.setTargetScrollView(this);

          this._updateScrollBar(0);
        }
      },
      animatable: false
    },

    /**
     * !#en The vertical scrollbar reference.
     * !#zh 垂直滚动的 ScrollBar。
     * @property {Scrollbar} verticalScrollBar
     */
    verticalScrollBar: {
      "default": undefined,
      type: cc.Scrollbar,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.vertical_bar',
      notify: function notify() {
        if (this.verticalScrollBar) {
          this.verticalScrollBar.setTargetScrollView(this);

          this._updateScrollBar(0);
        }
      },
      animatable: false
    },

    /**
     * !#en Scrollview events callback
     * !#zh 滚动视图的事件回调函数
     * @property {Component.EventHandler[]} scrollEvents
     */
    scrollEvents: {
      "default": [],
      type: cc.Component.EventHandler,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.scrollEvents'
    },

    /**
     * !#en If cancelInnerEvents is set to true, the scroll behavior will cancel touch events on inner content nodes
     * It's set to true by default.
     * !#zh 如果这个属性被设置为 true，那么滚动行为会取消子节点上注册的触摸事件，默认被设置为 true。
     * 注意，子节点上的 touchstart 事件仍然会触发，触点移动距离非常短的情况下 touchmove 和 touchend 也不会受影响。
     * @property {Boolean} cancelInnerEvents
     */
    cancelInnerEvents: {
      "default": true,
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.cancelInnerEvents'
    },
    // private object
    _view: {
      get: function get() {
        if (this.content) {
          return this.content.parent;
        }
      }
    }
  },
  statics: {
    EventType: EventType
  },

  /**
   * !#en Scroll the content to the bottom boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图底部。
   * @method scrollToBottom
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the bottom of the view.
   * scrollView.scrollToBottom(0.1);
   */
  scrollToBottom: function scrollToBottom(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta, true);
    }
  },

  /**
   * !#en Scroll the content to the top boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图顶部。
   * @method scrollToTop
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the top of the view.
   * scrollView.scrollToTop(0.1);
   */
  scrollToTop: function scrollToTop(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 1),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左边。
   * @method scrollToLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the left of the view.
   * scrollView.scrollToLeft(0.1);
   */
  scrollToLeft: function scrollToLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右边。
   * @method scrollToRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the right of the view.
   * scrollView.scrollToRight(0.1);
   */
  scrollToRight: function scrollToRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the top left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左上角。
   * @method scrollToTopLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the upper left corner of the view.
   * scrollView.scrollToTopLeft(0.1);
   */
  scrollToTopLeft: function scrollToTopLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 1),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the top right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右上角。
   * @method scrollToTopRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the top right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the top right corner of the view.
   * scrollView.scrollToTopRight(0.1);
   */
  scrollToTopRight: function scrollToTopRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 1),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the bottom left boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图左下角。
   * @method scrollToBottomLeft
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom left boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the lower left corner of the view.
   * scrollView.scrollToBottomLeft(0.1);
   */
  scrollToBottomLeft: function scrollToBottomLeft(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, 0),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the bottom right boundary of ScrollView.
   * !#zh 视图内容将在规定时间内滚动到视图右下角。
   * @method scrollToBottomRight
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the bottom right boundary immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to the lower right corner of the view.
   * scrollView.scrollToBottomRight(0.1);
   */
  scrollToBottomRight: function scrollToBottomRight(timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(1, 0),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll with an offset related to the ScrollView's top left origin, if timeInSecond is omitted, then it will jump to the
   *       specific offset immediately.
   * !#zh 视图内容在规定时间内将滚动到 ScrollView 相对左上角原点的偏移位置, 如果 timeInSecond参数不传，则立即滚动到指定偏移位置。
   * @method scrollToOffset
   * @param {Vec2} offset - A Vec2, the value of which each axis between 0 and maxScrollOffset
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the specific offset of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to middle position in 0.1 second in x-axis
   * let maxScrollOffset = this.getMaxScrollOffset();
   * scrollView.scrollToOffset(cc.v2(maxScrollOffset.x / 2, 0), 0.1);
   */
  scrollToOffset: function scrollToOffset(offset, timeInSecond, attenuated) {
    var maxScrollOffset = this.getMaxScrollOffset();
    var anchor = cc.v2(0, 0); //if maxScrollOffset is 0, then always align the content's top left origin to the top left corner of its parent

    if (maxScrollOffset.x === 0) {
      anchor.x = 0;
    } else {
      anchor.x = offset.x / maxScrollOffset.x;
    }

    if (maxScrollOffset.y === 0) {
      anchor.y = 1;
    } else {
      anchor.y = (maxScrollOffset.y - offset.y) / maxScrollOffset.y;
    }

    this.scrollTo(anchor, timeInSecond, attenuated);
  },

  /**
   * !#en  Get the positive offset value corresponds to the content's top left boundary.
   * !#zh  获取滚动视图相对于左上角原点的当前滚动偏移
   * @method getScrollOffset
   * @return {Vec2}  - A Vec2 value indicate the current scroll offset.
   */
  getScrollOffset: function getScrollOffset() {
    var topDelta = this._getContentTopBoundary() - this._topBoundary;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    return cc.v2(leftDeta, topDelta);
  },

  /**
   * !#en Get the maximize available  scroll offset
   * !#zh 获取滚动视图最大可以滚动的偏移量
   * @method getMaxScrollOffset
   * @return {Vec2} - A Vec2 value indicate the maximize scroll offset in x and y axis.
   */
  getMaxScrollOffset: function getMaxScrollOffset() {
    var viewSize = this._view.getContentSize();

    var contentSize = this.content.getContentSize();
    var horizontalMaximizeOffset = contentSize.width - viewSize.width;
    var verticalMaximizeOffset = contentSize.height - viewSize.height;
    horizontalMaximizeOffset = horizontalMaximizeOffset >= 0 ? horizontalMaximizeOffset : 0;
    verticalMaximizeOffset = verticalMaximizeOffset >= 0 ? verticalMaximizeOffset : 0;
    return cc.v2(horizontalMaximizeOffset, verticalMaximizeOffset);
  },

  /**
   * !#en Scroll the content to the horizontal percent position of ScrollView.
   * !#zh 视图内容在规定时间内将滚动到 ScrollView 水平方向的百分比位置上。
   * @method scrollToPercentHorizontal
   * @param {Number} percent - A value between 0 and 1.
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the horizontal percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Scroll to middle position.
   * scrollView.scrollToBottomRight(0.5, 0.1);
   */
  scrollToPercentHorizontal: function scrollToPercentHorizontal(percent, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(percent, 0),
      applyToHorizontal: true,
      applyToVertical: false
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the percent position of ScrollView in any direction.
   * !#zh 视图内容在规定时间内进行垂直方向和水平方向的滚动，并且滚动到指定百分比位置上。
   * @method scrollTo
   * @param {Vec2} anchor - A point which will be clamp between cc.v2(0,0) and cc.v2(1,1).
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * @example
   * // Vertical scroll to the bottom of the view.
   * scrollView.scrollTo(cc.v2(0, 1), 0.1);
   *
   * // Horizontal scroll to view right.
   * scrollView.scrollTo(cc.v2(1, 0), 0.1);
   */
  scrollTo: function scrollTo(anchor, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(anchor),
      applyToHorizontal: true,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en Scroll the content to the vertical percent position of ScrollView.
   * !#zh 视图内容在规定时间内滚动到 ScrollView 垂直方向的百分比位置上。
   * @method scrollToPercentVertical
   * @param {Number} percent - A value between 0 and 1.
   * @param {Number} [timeInSecond=0] - Scroll time in second, if you don't pass timeInSecond,
   * the content will jump to the vertical percent position of ScrollView immediately.
   * @param {Boolean} [attenuated=true] - Whether the scroll acceleration attenuated, default is true.
   * // Scroll to middle position.
   * scrollView.scrollToPercentVertical(0.5, 0.1);
   */
  scrollToPercentVertical: function scrollToPercentVertical(percent, timeInSecond, attenuated) {
    var moveDelta = this._calculateMovePercentDelta({
      anchor: cc.v2(0, percent),
      applyToHorizontal: false,
      applyToVertical: true
    });

    if (timeInSecond) {
      this._startAutoScroll(moveDelta, timeInSecond, attenuated !== false);
    } else {
      this._moveContent(moveDelta);
    }
  },

  /**
   * !#en  Stop auto scroll immediately
   * !#zh  停止自动滚动, 调用此 API 可以让 Scrollview 立即停止滚动
   * @method stopAutoScroll
   */
  stopAutoScroll: function stopAutoScroll() {
    this._autoScrolling = false;
    this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
  },

  /**
   * !#en Modify the content position.
   * !#zh 设置当前视图内容的坐标点。
   * @method setContentPosition
   * @param {Vec2} position - The position in content's parent space.
   */
  setContentPosition: function setContentPosition(position) {
    if (position.fuzzyEquals(this.getContentPosition(), EPSILON)) {
      return;
    }

    this.content.setPosition(position);
    this._outOfBoundaryAmountDirty = true;
  },

  /**
   * !#en Query the content's position in its parent space.
   * !#zh 获取当前视图内容的坐标点。
   * @method getContentPosition
   * @returns {Vec2} - The content's position in its parent space.
   */
  getContentPosition: function getContentPosition() {
    return this.content.getPosition();
  },

  /**
   * !#en Query whether the user is currently dragging the ScrollView to scroll it
   * !#zh 用户是否在拖拽当前滚动视图
   * @method isScrolling
   * @returns {Boolean} - Whether the user is currently dragging the ScrollView to scroll it
   */
  isScrolling: function isScrolling() {
    return this._scrolling;
  },

  /**
   * !#en Query whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
   * !#zh 当前滚动视图是否在惯性滚动
   * @method isAutoScrolling
   * @returns {Boolean} - Whether the ScrollView is currently scrolling because of a bounceback or inertia slowdown.
   */
  isAutoScrolling: function isAutoScrolling() {
    return this._autoScrolling;
  },
  //private methods
  _registerEvent: function _registerEvent() {
    this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
  },
  _unregisterEvent: function _unregisterEvent() {
    this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, true);
    this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
    this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, true);
    this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, true);
    this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, true);
  },
  _onMouseWheel: function _onMouseWheel(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var deltaMove = cc.v2(0, 0);
    var wheelPrecision = -0.1;

    if (CC_JSB || CC_RUNTIME) {
      wheelPrecision = -7;
    }

    if (this.vertical) {
      deltaMove = cc.v2(0, event.getScrollY() * wheelPrecision);
    } else if (this.horizontal) {
      deltaMove = cc.v2(event.getScrollY() * wheelPrecision, 0);
    }

    this._mouseWheelEventElapsedTime = 0;

    this._processDeltaMove(deltaMove);

    if (!this._stopMouseWheel) {
      this._handlePressLogic();

      this.schedule(this._checkMouseWheel, 1.0 / 60);
      this._stopMouseWheel = true;
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _checkMouseWheel: function _checkMouseWheel(dt) {
    var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

    var maxElapsedTime = 0.1;

    if (!currentOutOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._processInertiaScroll();

      this.unschedule(this._checkMouseWheel);

      this._dispatchEvent('scroll-ended');

      this._stopMouseWheel = false;
      return;
    }

    this._mouseWheelEventElapsedTime += dt; // mouse wheel event is ended

    if (this._mouseWheelEventElapsedTime > maxElapsedTime) {
      this._onScrollBarTouchEnded();

      this.unschedule(this._checkMouseWheel);

      this._dispatchEvent('scroll-ended');

      this._stopMouseWheel = false;
    }
  },
  _calculateMovePercentDelta: function _calculateMovePercentDelta(options) {
    var anchor = options.anchor;
    var applyToHorizontal = options.applyToHorizontal;
    var applyToVertical = options.applyToVertical;

    this._calculateBoundary();

    anchor = anchor.clampf(cc.v2(0, 0), cc.v2(1, 1));

    var scrollSize = this._view.getContentSize();

    var contentSize = this.content.getContentSize();

    var bottomDeta = this._getContentBottomBoundary() - this._bottomBoundary;

    bottomDeta = -bottomDeta;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    leftDeta = -leftDeta;
    var moveDelta = cc.v2(0, 0);
    var totalScrollDelta = 0;

    if (applyToHorizontal) {
      totalScrollDelta = contentSize.width - scrollSize.width;
      moveDelta.x = leftDeta - totalScrollDelta * anchor.x;
    }

    if (applyToVertical) {
      totalScrollDelta = contentSize.height - scrollSize.height;
      moveDelta.y = bottomDeta - totalScrollDelta * anchor.y;
    }

    return moveDelta;
  },
  _moveContentToTopLeft: function _moveContentToTopLeft(scrollViewSize) {
    var contentSize = this.content.getContentSize();

    var bottomDeta = this._getContentBottomBoundary() - this._bottomBoundary;

    bottomDeta = -bottomDeta;
    var moveDelta = cc.v2(0, 0);
    var totalScrollDelta = 0;

    var leftDeta = this._getContentLeftBoundary() - this._leftBoundary;

    leftDeta = -leftDeta;

    if (contentSize.height < scrollViewSize.height) {
      totalScrollDelta = contentSize.height - scrollViewSize.height;
      moveDelta.y = bottomDeta - totalScrollDelta;
    }

    if (contentSize.width < scrollViewSize.width) {
      totalScrollDelta = contentSize.width - scrollViewSize.width;
      moveDelta.x = leftDeta;
    }

    this._updateScrollBarState();

    this._moveContent(moveDelta);

    this._adjustContentOutOfBoundary();
  },
  _calculateBoundary: function _calculateBoundary() {
    if (this.content) {
      //refresh content size
      var layout = this.content.getComponent(cc.Layout);

      if (layout && layout.enabledInHierarchy) {
        layout.updateLayout();
      }

      var viewSize = this._view.getContentSize();

      var anchorX = viewSize.width * this._view.anchorX;
      var anchorY = viewSize.height * this._view.anchorY;
      this._leftBoundary = -anchorX;
      this._bottomBoundary = -anchorY;
      this._rightBoundary = this._leftBoundary + viewSize.width;
      this._topBoundary = this._bottomBoundary + viewSize.height;

      this._moveContentToTopLeft(viewSize);
    }
  },
  //this is for nested scrollview
  _hasNestedViewGroup: function _hasNestedViewGroup(event, captureListeners) {
    if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;

    if (captureListeners) {
      //captureListeners are arranged from child to parent
      for (var i = 0; i < captureListeners.length; ++i) {
        var item = captureListeners[i];

        if (this.node === item) {
          if (event.target.getComponent(cc.ViewGroup)) {
            return true;
          }

          return false;
        }

        if (item.getComponent(cc.ViewGroup)) {
          return true;
        }
      }
    }

    return false;
  },
  //This is for Scrollview as children of a Button
  _stopPropagationIfTargetIsMe: function _stopPropagationIfTargetIsMe(event) {
    if (event.eventPhase === cc.Event.AT_TARGET && event.target === this.node) {
      event.stopPropagation();
    }
  },
  // touch event handler
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var touch = event.touch;

    if (this.content) {
      this._handlePressLogic(touch);
    }

    this._touchMoved = false;

    this._stopPropagationIfTargetIsMe(event);
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var touch = event.touch;

    if (this.content) {
      this._handleMoveLogic(touch);
    } // Do not prevent touch events in inner nodes


    if (!this.cancelInnerEvents) {
      return;
    }

    var deltaMove = touch.getLocation().sub(touch.getStartLocation()); //FIXME: touch move delta should be calculated by DPI.

    if (deltaMove.mag() > 7) {
      if (!this._touchMoved && event.target !== this.node) {
        // Simulate touch cancel for target node
        var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
        cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
        cancelEvent.touch = event.touch;
        cancelEvent.simulate = true;
        event.target.dispatchEvent(cancelEvent);
        this._touchMoved = true;
      }
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _onTouchEnded: function _onTouchEnded(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;

    this._dispatchEvent('touch-up');

    var touch = event.touch;

    if (this.content) {
      this._handleReleaseLogic(touch);
    }

    if (this._touchMoved) {
      event.stopPropagation();
    } else {
      this._stopPropagationIfTargetIsMe(event);
    }
  },
  _onTouchCancelled: function _onTouchCancelled(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return; // Filte touch cancel event send from self

    if (!event.simulate) {
      var touch = event.touch;

      if (this.content) {
        this._handleReleaseLogic(touch);
      }
    }

    this._stopPropagationIfTargetIsMe(event);
  },
  _processDeltaMove: function _processDeltaMove(deltaMove) {
    this._scrollChildren(deltaMove);

    this._gatherTouchMove(deltaMove);
  },
  // Contains node angle calculations
  _getLocalAxisAlignDelta: function _getLocalAxisAlignDelta(touch) {
    this.node.convertToNodeSpaceAR(touch.getLocation(), _tempPoint);
    this.node.convertToNodeSpaceAR(touch.getPreviousLocation(), _tempPrevPoint);
    return _tempPoint.sub(_tempPrevPoint);
  },
  _handleMoveLogic: function _handleMoveLogic(touch) {
    var deltaMove = this._getLocalAxisAlignDelta(touch);

    this._processDeltaMove(deltaMove);
  },
  _scrollChildren: function _scrollChildren(deltaMove) {
    deltaMove = this._clampDelta(deltaMove);
    var realMove = deltaMove;
    var outOfBoundary;

    if (this.elastic) {
      outOfBoundary = this._getHowMuchOutOfBoundary();
      realMove.x *= outOfBoundary.x === 0 ? 1 : 0.5;
      realMove.y *= outOfBoundary.y === 0 ? 1 : 0.5;
    }

    if (!this.elastic) {
      outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
      realMove = realMove.add(outOfBoundary);
    }

    var scrollEventType = -1;

    if (realMove.y > 0) {
      //up
      var icBottomPos = this.content.y - this.content.anchorY * this.content.height;

      if (icBottomPos + realMove.y >= this._bottomBoundary) {
        scrollEventType = 'scroll-to-bottom';
      }
    } else if (realMove.y < 0) {
      //down
      var icTopPos = this.content.y - this.content.anchorY * this.content.height + this.content.height;

      if (icTopPos + realMove.y <= this._topBoundary) {
        scrollEventType = 'scroll-to-top';
      }
    }

    if (realMove.x < 0) {
      //left
      var icRightPos = this.content.x - this.content.anchorX * this.content.width + this.content.width;

      if (icRightPos + realMove.x <= this._rightBoundary) {
        scrollEventType = 'scroll-to-right';
      }
    } else if (realMove.x > 0) {
      //right
      var icLeftPos = this.content.x - this.content.anchorX * this.content.width;

      if (icLeftPos + realMove.x >= this._leftBoundary) {
        scrollEventType = 'scroll-to-left';
      }
    }

    this._moveContent(realMove, false);

    if (realMove.x !== 0 || realMove.y !== 0) {
      if (!this._scrolling) {
        this._scrolling = true;

        this._dispatchEvent('scroll-began');
      }

      this._dispatchEvent('scrolling');
    }

    if (scrollEventType !== -1) {
      this._dispatchEvent(scrollEventType);
    }
  },
  _handlePressLogic: function _handlePressLogic() {
    if (this._autoScrolling) {
      this._dispatchEvent('scroll-ended');
    }

    this._autoScrolling = false;
    this._isBouncing = false;
    this._touchMovePreviousTimestamp = getTimeInMilliseconds();
    this._touchMoveDisplacements.length = 0;
    this._touchMoveTimeDeltas.length = 0;

    this._onScrollBarTouchBegan();
  },
  _clampDelta: function _clampDelta(delta) {
    var contentSize = this.content.getContentSize();

    var scrollViewSize = this._view.getContentSize();

    if (contentSize.width < scrollViewSize.width) {
      delta.x = 0;
    }

    if (contentSize.height < scrollViewSize.height) {
      delta.y = 0;
    }

    return delta;
  },
  _gatherTouchMove: function _gatherTouchMove(delta) {
    delta = this._clampDelta(delta);

    while (this._touchMoveDisplacements.length >= NUMBER_OF_GATHERED_TOUCHES_FOR_MOVE_SPEED) {
      this._touchMoveDisplacements.shift();

      this._touchMoveTimeDeltas.shift();
    }

    this._touchMoveDisplacements.push(delta);

    var timeStamp = getTimeInMilliseconds();

    this._touchMoveTimeDeltas.push((timeStamp - this._touchMovePreviousTimestamp) / 1000);

    this._touchMovePreviousTimestamp = timeStamp;
  },
  _startBounceBackIfNeeded: function _startBounceBackIfNeeded() {
    if (!this.elastic) {
      return false;
    }

    var bounceBackAmount = this._getHowMuchOutOfBoundary();

    bounceBackAmount = this._clampDelta(bounceBackAmount);

    if (bounceBackAmount.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      return false;
    }

    var bounceBackTime = Math.max(this.bounceDuration, 0);

    this._startAutoScroll(bounceBackAmount, bounceBackTime, true);

    if (!this._isBouncing) {
      if (bounceBackAmount.y > 0) this._dispatchEvent('bounce-top');
      if (bounceBackAmount.y < 0) this._dispatchEvent('bounce-bottom');
      if (bounceBackAmount.x > 0) this._dispatchEvent('bounce-right');
      if (bounceBackAmount.x < 0) this._dispatchEvent('bounce-left');
      this._isBouncing = true;
    }

    return true;
  },
  _processInertiaScroll: function _processInertiaScroll() {
    var bounceBackStarted = this._startBounceBackIfNeeded();

    if (!bounceBackStarted && this.inertia) {
      var touchMoveVelocity = this._calculateTouchMoveVelocity();

      if (!touchMoveVelocity.fuzzyEquals(cc.v2(0, 0), EPSILON) && this.brake < 1) {
        this._startInertiaScroll(touchMoveVelocity);
      }
    }

    this._onScrollBarTouchEnded();
  },
  _handleReleaseLogic: function _handleReleaseLogic(touch) {
    var delta = this._getLocalAxisAlignDelta(touch);

    this._gatherTouchMove(delta);

    this._processInertiaScroll();

    if (this._scrolling) {
      this._scrolling = false;

      if (!this._autoScrolling) {
        this._dispatchEvent('scroll-ended');
      }
    }
  },
  _isOutOfBoundary: function _isOutOfBoundary() {
    var outOfBoundary = this._getHowMuchOutOfBoundary();

    return !outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON);
  },
  _isNecessaryAutoScrollBrake: function _isNecessaryAutoScrollBrake() {
    if (this._autoScrollBraking) {
      return true;
    }

    if (this._isOutOfBoundary()) {
      if (!this._autoScrollCurrentlyOutOfBoundary) {
        this._autoScrollCurrentlyOutOfBoundary = true;
        this._autoScrollBraking = true;
        this._autoScrollBrakingStartPosition = this.getContentPosition();
        return true;
      }
    } else {
      this._autoScrollCurrentlyOutOfBoundary = false;
    }

    return false;
  },
  getScrollEndedEventTiming: function getScrollEndedEventTiming() {
    return EPSILON;
  },
  _processAutoScrolling: function _processAutoScrolling(dt) {
    var isAutoScrollBrake = this._isNecessaryAutoScrollBrake();

    var brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
    this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);
    var percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);

    if (this._autoScrollAttenuate) {
      percentage = quintEaseOut(percentage);
    }

    var newPosition = this._autoScrollStartPosition.add(this._autoScrollTargetDelta.mul(percentage));

    var reachedEnd = Math.abs(percentage - 1) <= EPSILON;
    var fireEvent = Math.abs(percentage - 1) <= this.getScrollEndedEventTiming();

    if (fireEvent && !this._isScrollEndedWithThresholdEventFired) {
      this._dispatchEvent('scroll-ended-with-threshold');

      this._isScrollEndedWithThresholdEventFired = true;
    }

    if (this.elastic) {
      var brakeOffsetPosition = newPosition.sub(this._autoScrollBrakingStartPosition);

      if (isAutoScrollBrake) {
        brakeOffsetPosition = brakeOffsetPosition.mul(brakingFactor);
      }

      newPosition = this._autoScrollBrakingStartPosition.add(brakeOffsetPosition);
    } else {
      var moveDelta = newPosition.sub(this.getContentPosition());

      var outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);

      if (!outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
        newPosition = newPosition.add(outOfBoundary);
        reachedEnd = true;
      }
    }

    if (reachedEnd) {
      this._autoScrolling = false;
    }

    var deltaMove = newPosition.sub(this.getContentPosition());

    this._moveContent(this._clampDelta(deltaMove), reachedEnd);

    this._dispatchEvent('scrolling'); // scollTo API controll move


    if (!this._autoScrolling) {
      this._isBouncing = false;
      this._scrolling = false;

      this._dispatchEvent('scroll-ended');
    }
  },
  _startInertiaScroll: function _startInertiaScroll(touchMoveVelocity) {
    var inertiaTotalMovement = touchMoveVelocity.mul(MOVEMENT_FACTOR);

    this._startAttenuatingAutoScroll(inertiaTotalMovement, touchMoveVelocity);
  },
  _calculateAttenuatedFactor: function _calculateAttenuatedFactor(distance) {
    if (this.brake <= 0) {
      return 1 - this.brake;
    } //attenuate formula from: http://learnopengl.com/#!Lighting/Light-casters


    return (1 - this.brake) * (1 / (1 + distance * 0.000014 + distance * distance * 0.000000008));
  },
  _startAttenuatingAutoScroll: function _startAttenuatingAutoScroll(deltaMove, initialVelocity) {
    var time = this._calculateAutoScrollTimeByInitalSpeed(initialVelocity.mag());

    var targetDelta = deltaMove.normalize();
    var contentSize = this.content.getContentSize();

    var scrollviewSize = this._view.getContentSize();

    var totalMoveWidth = contentSize.width - scrollviewSize.width;
    var totalMoveHeight = contentSize.height - scrollviewSize.height;

    var attenuatedFactorX = this._calculateAttenuatedFactor(totalMoveWidth);

    var attenuatedFactorY = this._calculateAttenuatedFactor(totalMoveHeight);

    targetDelta = cc.v2(targetDelta.x * totalMoveWidth * (1 - this.brake) * attenuatedFactorX, targetDelta.y * totalMoveHeight * attenuatedFactorY * (1 - this.brake));
    var originalMoveLength = deltaMove.mag();
    var factor = targetDelta.mag() / originalMoveLength;
    targetDelta = targetDelta.add(deltaMove);

    if (this.brake > 0 && factor > 7) {
      factor = Math.sqrt(factor);
      targetDelta = deltaMove.mul(factor).add(deltaMove);
    }

    if (this.brake > 0 && factor > 3) {
      factor = 3;
      time = time * factor;
    }

    if (this.brake === 0 && factor > 1) {
      time = time * factor;
    }

    this._startAutoScroll(targetDelta, time, true);
  },
  _calculateAutoScrollTimeByInitalSpeed: function _calculateAutoScrollTimeByInitalSpeed(initalSpeed) {
    return Math.sqrt(Math.sqrt(initalSpeed / 5));
  },
  _startAutoScroll: function _startAutoScroll(deltaMove, timeInSecond, attenuated) {
    var adjustedDeltaMove = this._flattenVectorByDirection(deltaMove);

    this._autoScrolling = true;
    this._autoScrollTargetDelta = adjustedDeltaMove;
    this._autoScrollAttenuate = attenuated;
    this._autoScrollStartPosition = this.getContentPosition();
    this._autoScrollTotalTime = timeInSecond;
    this._autoScrollAccumulatedTime = 0;
    this._autoScrollBraking = false;
    this._isScrollEndedWithThresholdEventFired = false;
    this._autoScrollBrakingStartPosition = cc.v2(0, 0);

    var currentOutOfBoundary = this._getHowMuchOutOfBoundary();

    if (!currentOutOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._autoScrollCurrentlyOutOfBoundary = true;
    }
  },
  _calculateTouchMoveVelocity: function _calculateTouchMoveVelocity() {
    var totalTime = 0;
    totalTime = this._touchMoveTimeDeltas.reduce(function (a, b) {
      return a + b;
    }, totalTime);

    if (totalTime <= 0 || totalTime >= 0.5) {
      return cc.v2(0, 0);
    }

    var totalMovement = cc.v2(0, 0);
    totalMovement = this._touchMoveDisplacements.reduce(function (a, b) {
      return a.add(b);
    }, totalMovement);
    return cc.v2(totalMovement.x * (1 - this.brake) / totalTime, totalMovement.y * (1 - this.brake) / totalTime);
  },
  _flattenVectorByDirection: function _flattenVectorByDirection(vector) {
    var result = vector;
    result.x = this.horizontal ? result.x : 0;
    result.y = this.vertical ? result.y : 0;
    return result;
  },
  _moveContent: function _moveContent(deltaMove, canStartBounceBack) {
    var adjustedMove = this._flattenVectorByDirection(deltaMove);

    var newPosition = this.getContentPosition().add(adjustedMove);
    this.setContentPosition(newPosition);

    var outOfBoundary = this._getHowMuchOutOfBoundary();

    this._updateScrollBar(outOfBoundary);

    if (this.elastic && canStartBounceBack) {
      this._startBounceBackIfNeeded();
    }
  },
  _getContentLeftBoundary: function _getContentLeftBoundary() {
    var contentPos = this.getContentPosition();
    return contentPos.x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
  },
  _getContentRightBoundary: function _getContentRightBoundary() {
    var contentSize = this.content.getContentSize();
    return this._getContentLeftBoundary() + contentSize.width;
  },
  _getContentTopBoundary: function _getContentTopBoundary() {
    var contentSize = this.content.getContentSize();
    return this._getContentBottomBoundary() + contentSize.height;
  },
  _getContentBottomBoundary: function _getContentBottomBoundary() {
    var contentPos = this.getContentPosition();
    return contentPos.y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
  },
  _getHowMuchOutOfBoundary: function _getHowMuchOutOfBoundary(addition) {
    addition = addition || cc.v2(0, 0);

    if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON) && !this._outOfBoundaryAmountDirty) {
      return this._outOfBoundaryAmount;
    }

    var outOfBoundaryAmount = cc.v2(0, 0);

    if (this._getContentLeftBoundary() + addition.x > this._leftBoundary) {
      outOfBoundaryAmount.x = this._leftBoundary - (this._getContentLeftBoundary() + addition.x);
    } else if (this._getContentRightBoundary() + addition.x < this._rightBoundary) {
      outOfBoundaryAmount.x = this._rightBoundary - (this._getContentRightBoundary() + addition.x);
    }

    if (this._getContentTopBoundary() + addition.y < this._topBoundary) {
      outOfBoundaryAmount.y = this._topBoundary - (this._getContentTopBoundary() + addition.y);
    } else if (this._getContentBottomBoundary() + addition.y > this._bottomBoundary) {
      outOfBoundaryAmount.y = this._bottomBoundary - (this._getContentBottomBoundary() + addition.y);
    }

    if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
      this._outOfBoundaryAmount = outOfBoundaryAmount;
      this._outOfBoundaryAmountDirty = false;
    }

    outOfBoundaryAmount = this._clampDelta(outOfBoundaryAmount);
    return outOfBoundaryAmount;
  },
  _updateScrollBarState: function _updateScrollBarState() {
    if (!this.content) {
      return;
    }

    var contentSize = this.content.getContentSize();

    var scrollViewSize = this._view.getContentSize();

    if (this.verticalScrollBar) {
      if (contentSize.height < scrollViewSize.height) {
        this.verticalScrollBar.hide();
      } else {
        this.verticalScrollBar.show();
      }
    }

    if (this.horizontalScrollBar) {
      if (contentSize.width < scrollViewSize.width) {
        this.horizontalScrollBar.hide();
      } else {
        this.horizontalScrollBar.show();
      }
    }
  },
  _updateScrollBar: function _updateScrollBar(outOfBoundary) {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onScroll(outOfBoundary);
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onScroll(outOfBoundary);
    }
  },
  _onScrollBarTouchBegan: function _onScrollBarTouchBegan() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onTouchBegan();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onTouchBegan();
    }
  },
  _onScrollBarTouchEnded: function _onScrollBarTouchEnded() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar._onTouchEnded();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar._onTouchEnded();
    }
  },
  _dispatchEvent: function _dispatchEvent(event) {
    if (event === 'scroll-ended') {
      this._scrollEventEmitMask = 0;
    } else if (event === 'scroll-to-top' || event === 'scroll-to-bottom' || event === 'scroll-to-left' || event === 'scroll-to-right') {
      var flag = 1 << eventMap[event];

      if (this._scrollEventEmitMask & flag) {
        return;
      } else {
        this._scrollEventEmitMask |= flag;
      }
    }

    cc.Component.EventHandler.emitEvents(this.scrollEvents, this, eventMap[event]);
    this.node.emit(event, this);
  },
  _adjustContentOutOfBoundary: function _adjustContentOutOfBoundary() {
    this._outOfBoundaryAmountDirty = true;

    if (this._isOutOfBoundary()) {
      var outOfBoundary = this._getHowMuchOutOfBoundary(cc.v2(0, 0));

      var newPosition = this.getContentPosition().add(outOfBoundary);

      if (this.content) {
        this.content.setPosition(newPosition);

        this._updateScrollBar(0);
      }
    }
  },
  start: function start() {
    this._calculateBoundary(); //Because widget component will adjust content position and scrollview position is correct after visit
    //So this event could make sure the content is on the correct position after loading.


    if (this.content) {
      cc.director.once(cc.Director.EVENT_BEFORE_DRAW, this._adjustContentOutOfBoundary, this);
    }
  },
  _hideScrollbar: function _hideScrollbar() {
    if (this.horizontalScrollBar) {
      this.horizontalScrollBar.hide();
    }

    if (this.verticalScrollBar) {
      this.verticalScrollBar.hide();
    }
  },
  onDisable: function onDisable() {
    if (!CC_EDITOR) {
      this._unregisterEvent();

      if (this.content) {
        this.content.off(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        this.content.off(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

        if (this._view) {
          this._view.off(NodeEvent.POSITION_CHANGED, this._calculateBoundary, this);

          this._view.off(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

          this._view.off(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        }
      }
    }

    this._hideScrollbar();

    this.stopAutoScroll();
  },
  onEnable: function onEnable() {
    if (!CC_EDITOR) {
      this._registerEvent();

      if (this.content) {
        this.content.on(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        this.content.on(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

        if (this._view) {
          this._view.on(NodeEvent.POSITION_CHANGED, this._calculateBoundary, this);

          this._view.on(NodeEvent.SCALE_CHANGED, this._calculateBoundary, this);

          this._view.on(NodeEvent.SIZE_CHANGED, this._calculateBoundary, this);
        }
      }
    }

    this._updateScrollBarState();
  },
  update: function update(dt) {
    if (this._autoScrolling) {
      this._processAutoScrolling(dt);
    }
  }
});
cc.ScrollView = module.exports = ScrollView;
/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-top
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-bottom
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-left
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-to-right
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scrolling
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-bottom
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-top
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-left
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event bounce-right
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event scroll-ended
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
 * !#en
 * Note: This event is emitted from the node to which the component belongs.
 * !#zh
 * 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
 * @event touch-up
 * @param {Event.EventCustom} event
 * @param {ScrollView} scrollView - The ScrollView component.
 */

/**
* !#en
* Note: This event is emitted from the node to which the component belongs.
* !#zh
* 注意：此事件是从该组件所属的 Node 上面派发出来的，需要用 node.on 来监听。
* @event scroll-began
* @param {Event.EventCustom} event
* @param {ScrollView} scrollView - The ScrollView component.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NTY3JvbGxWaWV3LmpzIl0sIm5hbWVzIjpbIk5vZGVFdmVudCIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJOVU1CRVJfT0ZfR0FUSEVSRURfVE9VQ0hFU19GT1JfTU9WRV9TUEVFRCIsIk9VVF9PRl9CT1VOREFSWV9CUkVBS0lOR19GQUNUT1IiLCJFUFNJTE9OIiwiTU9WRU1FTlRfRkFDVE9SIiwiX3RlbXBQb2ludCIsImNjIiwidjIiLCJfdGVtcFByZXZQb2ludCIsInF1aW50RWFzZU91dCIsInRpbWUiLCJnZXRUaW1lSW5NaWxsaXNlY29uZHMiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJnZXRNaWxsaXNlY29uZHMiLCJFbnVtIiwiU0NST0xMX1RPX1RPUCIsIlNDUk9MTF9UT19CT1RUT00iLCJTQ1JPTExfVE9fTEVGVCIsIlNDUk9MTF9UT19SSUdIVCIsIlNDUk9MTElORyIsIkJPVU5DRV9UT1AiLCJCT1VOQ0VfQk9UVE9NIiwiQk9VTkNFX0xFRlQiLCJCT1VOQ0VfUklHSFQiLCJTQ1JPTExfRU5ERUQiLCJUT1VDSF9VUCIsIkFVVE9TQ1JPTExfRU5ERURfV0lUSF9USFJFU0hPTEQiLCJTQ1JPTExfQkVHQU4iLCJldmVudE1hcCIsIlNjcm9sbFZpZXciLCJDbGFzcyIsIm5hbWUiLCJlZGl0b3IiLCJDQ19FRElUT1IiLCJtZW51IiwiaGVscCIsImluc3BlY3RvciIsImV4ZWN1dGVJbkVkaXRNb2RlIiwiY3RvciIsIl90b3BCb3VuZGFyeSIsIl9ib3R0b21Cb3VuZGFyeSIsIl9sZWZ0Qm91bmRhcnkiLCJfcmlnaHRCb3VuZGFyeSIsIl90b3VjaE1vdmVEaXNwbGFjZW1lbnRzIiwiX3RvdWNoTW92ZVRpbWVEZWx0YXMiLCJfdG91Y2hNb3ZlUHJldmlvdXNUaW1lc3RhbXAiLCJfdG91Y2hNb3ZlZCIsIl9hdXRvU2Nyb2xsaW5nIiwiX2F1dG9TY3JvbGxBdHRlbnVhdGUiLCJfYXV0b1Njcm9sbFN0YXJ0UG9zaXRpb24iLCJfYXV0b1Njcm9sbFRhcmdldERlbHRhIiwiX2F1dG9TY3JvbGxUb3RhbFRpbWUiLCJfYXV0b1Njcm9sbEFjY3VtdWxhdGVkVGltZSIsIl9hdXRvU2Nyb2xsQ3VycmVudGx5T3V0T2ZCb3VuZGFyeSIsIl9hdXRvU2Nyb2xsQnJha2luZyIsIl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24iLCJfb3V0T2ZCb3VuZGFyeUFtb3VudCIsIl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkiLCJfc3RvcE1vdXNlV2hlZWwiLCJfbW91c2VXaGVlbEV2ZW50RWxhcHNlZFRpbWUiLCJfaXNTY3JvbGxFbmRlZFdpdGhUaHJlc2hvbGRFdmVudEZpcmVkIiwiX3Njcm9sbEV2ZW50RW1pdE1hc2siLCJfaXNCb3VuY2luZyIsIl9zY3JvbGxpbmciLCJwcm9wZXJ0aWVzIiwiY29udGVudCIsInVuZGVmaW5lZCIsInR5cGUiLCJOb2RlIiwidG9vbHRpcCIsIkNDX0RFViIsImZvcm1lcmx5U2VyaWFsaXplZEFzIiwibm90aWZ5Iiwib2xkVmFsdWUiLCJfY2FsY3VsYXRlQm91bmRhcnkiLCJob3Jpem9udGFsIiwiYW5pbWF0YWJsZSIsInZlcnRpY2FsIiwiaW5lcnRpYSIsImJyYWtlIiwiRmxvYXQiLCJyYW5nZSIsImVsYXN0aWMiLCJib3VuY2VEdXJhdGlvbiIsImhvcml6b250YWxTY3JvbGxCYXIiLCJTY3JvbGxiYXIiLCJzZXRUYXJnZXRTY3JvbGxWaWV3IiwiX3VwZGF0ZVNjcm9sbEJhciIsInZlcnRpY2FsU2Nyb2xsQmFyIiwic2Nyb2xsRXZlbnRzIiwiQ29tcG9uZW50IiwiRXZlbnRIYW5kbGVyIiwiY2FuY2VsSW5uZXJFdmVudHMiLCJfdmlldyIsImdldCIsInBhcmVudCIsInN0YXRpY3MiLCJzY3JvbGxUb0JvdHRvbSIsInRpbWVJblNlY29uZCIsImF0dGVudWF0ZWQiLCJtb3ZlRGVsdGEiLCJfY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSIsImFuY2hvciIsImFwcGx5VG9Ib3Jpem9udGFsIiwiYXBwbHlUb1ZlcnRpY2FsIiwiX3N0YXJ0QXV0b1Njcm9sbCIsIl9tb3ZlQ29udGVudCIsInNjcm9sbFRvVG9wIiwic2Nyb2xsVG9MZWZ0Iiwic2Nyb2xsVG9SaWdodCIsInNjcm9sbFRvVG9wTGVmdCIsInNjcm9sbFRvVG9wUmlnaHQiLCJzY3JvbGxUb0JvdHRvbUxlZnQiLCJzY3JvbGxUb0JvdHRvbVJpZ2h0Iiwic2Nyb2xsVG9PZmZzZXQiLCJvZmZzZXQiLCJtYXhTY3JvbGxPZmZzZXQiLCJnZXRNYXhTY3JvbGxPZmZzZXQiLCJ4IiwieSIsInNjcm9sbFRvIiwiZ2V0U2Nyb2xsT2Zmc2V0IiwidG9wRGVsdGEiLCJfZ2V0Q29udGVudFRvcEJvdW5kYXJ5IiwibGVmdERldGEiLCJfZ2V0Q29udGVudExlZnRCb3VuZGFyeSIsInZpZXdTaXplIiwiZ2V0Q29udGVudFNpemUiLCJjb250ZW50U2l6ZSIsImhvcml6b250YWxNYXhpbWl6ZU9mZnNldCIsIndpZHRoIiwidmVydGljYWxNYXhpbWl6ZU9mZnNldCIsImhlaWdodCIsInNjcm9sbFRvUGVyY2VudEhvcml6b250YWwiLCJwZXJjZW50Iiwic2Nyb2xsVG9QZXJjZW50VmVydGljYWwiLCJzdG9wQXV0b1Njcm9sbCIsInNldENvbnRlbnRQb3NpdGlvbiIsInBvc2l0aW9uIiwiZnV6enlFcXVhbHMiLCJnZXRDb250ZW50UG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsImdldFBvc2l0aW9uIiwiaXNTY3JvbGxpbmciLCJpc0F1dG9TY3JvbGxpbmciLCJfcmVnaXN0ZXJFdmVudCIsIm5vZGUiLCJvbiIsIlRPVUNIX1NUQVJUIiwiX29uVG91Y2hCZWdhbiIsIlRPVUNIX01PVkUiLCJfb25Ub3VjaE1vdmVkIiwiVE9VQ0hfRU5EIiwiX29uVG91Y2hFbmRlZCIsIlRPVUNIX0NBTkNFTCIsIl9vblRvdWNoQ2FuY2VsbGVkIiwiTU9VU0VfV0hFRUwiLCJfb25Nb3VzZVdoZWVsIiwiX3VucmVnaXN0ZXJFdmVudCIsIm9mZiIsImV2ZW50IiwiY2FwdHVyZUxpc3RlbmVycyIsImVuYWJsZWRJbkhpZXJhcmNoeSIsIl9oYXNOZXN0ZWRWaWV3R3JvdXAiLCJkZWx0YU1vdmUiLCJ3aGVlbFByZWNpc2lvbiIsIkNDX0pTQiIsIkNDX1JVTlRJTUUiLCJnZXRTY3JvbGxZIiwiX3Byb2Nlc3NEZWx0YU1vdmUiLCJfaGFuZGxlUHJlc3NMb2dpYyIsInNjaGVkdWxlIiwiX2NoZWNrTW91c2VXaGVlbCIsIl9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUiLCJkdCIsImN1cnJlbnRPdXRPZkJvdW5kYXJ5IiwiX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5IiwibWF4RWxhcHNlZFRpbWUiLCJfcHJvY2Vzc0luZXJ0aWFTY3JvbGwiLCJ1bnNjaGVkdWxlIiwiX2Rpc3BhdGNoRXZlbnQiLCJfb25TY3JvbGxCYXJUb3VjaEVuZGVkIiwib3B0aW9ucyIsImNsYW1wZiIsInNjcm9sbFNpemUiLCJib3R0b21EZXRhIiwiX2dldENvbnRlbnRCb3R0b21Cb3VuZGFyeSIsInRvdGFsU2Nyb2xsRGVsdGEiLCJfbW92ZUNvbnRlbnRUb1RvcExlZnQiLCJzY3JvbGxWaWV3U2l6ZSIsIl91cGRhdGVTY3JvbGxCYXJTdGF0ZSIsIl9hZGp1c3RDb250ZW50T3V0T2ZCb3VuZGFyeSIsImxheW91dCIsImdldENvbXBvbmVudCIsIkxheW91dCIsInVwZGF0ZUxheW91dCIsImFuY2hvclgiLCJhbmNob3JZIiwiZXZlbnRQaGFzZSIsIkV2ZW50IiwiQ0FQVFVSSU5HX1BIQVNFIiwiaSIsImxlbmd0aCIsIml0ZW0iLCJ0YXJnZXQiLCJWaWV3R3JvdXAiLCJBVF9UQVJHRVQiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b3VjaCIsIl9oYW5kbGVNb3ZlTG9naWMiLCJnZXRMb2NhdGlvbiIsInN1YiIsImdldFN0YXJ0TG9jYXRpb24iLCJtYWciLCJjYW5jZWxFdmVudCIsIkV2ZW50VG91Y2giLCJnZXRUb3VjaGVzIiwiYnViYmxlcyIsInNpbXVsYXRlIiwiZGlzcGF0Y2hFdmVudCIsIl9oYW5kbGVSZWxlYXNlTG9naWMiLCJfc2Nyb2xsQ2hpbGRyZW4iLCJfZ2F0aGVyVG91Y2hNb3ZlIiwiX2dldExvY2FsQXhpc0FsaWduRGVsdGEiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsImdldFByZXZpb3VzTG9jYXRpb24iLCJfY2xhbXBEZWx0YSIsInJlYWxNb3ZlIiwib3V0T2ZCb3VuZGFyeSIsImFkZCIsInNjcm9sbEV2ZW50VHlwZSIsImljQm90dG9tUG9zIiwiaWNUb3BQb3MiLCJpY1JpZ2h0UG9zIiwiaWNMZWZ0UG9zIiwiX29uU2Nyb2xsQmFyVG91Y2hCZWdhbiIsImRlbHRhIiwic2hpZnQiLCJwdXNoIiwidGltZVN0YW1wIiwiX3N0YXJ0Qm91bmNlQmFja0lmTmVlZGVkIiwiYm91bmNlQmFja0Ftb3VudCIsImJvdW5jZUJhY2tUaW1lIiwiTWF0aCIsIm1heCIsImJvdW5jZUJhY2tTdGFydGVkIiwidG91Y2hNb3ZlVmVsb2NpdHkiLCJfY2FsY3VsYXRlVG91Y2hNb3ZlVmVsb2NpdHkiLCJfc3RhcnRJbmVydGlhU2Nyb2xsIiwiX2lzT3V0T2ZCb3VuZGFyeSIsIl9pc05lY2Vzc2FyeUF1dG9TY3JvbGxCcmFrZSIsImdldFNjcm9sbEVuZGVkRXZlbnRUaW1pbmciLCJfcHJvY2Vzc0F1dG9TY3JvbGxpbmciLCJpc0F1dG9TY3JvbGxCcmFrZSIsImJyYWtpbmdGYWN0b3IiLCJwZXJjZW50YWdlIiwibWluIiwibmV3UG9zaXRpb24iLCJtdWwiLCJyZWFjaGVkRW5kIiwiYWJzIiwiZmlyZUV2ZW50IiwiYnJha2VPZmZzZXRQb3NpdGlvbiIsImluZXJ0aWFUb3RhbE1vdmVtZW50IiwiX3N0YXJ0QXR0ZW51YXRpbmdBdXRvU2Nyb2xsIiwiX2NhbGN1bGF0ZUF0dGVudWF0ZWRGYWN0b3IiLCJkaXN0YW5jZSIsImluaXRpYWxWZWxvY2l0eSIsIl9jYWxjdWxhdGVBdXRvU2Nyb2xsVGltZUJ5SW5pdGFsU3BlZWQiLCJ0YXJnZXREZWx0YSIsIm5vcm1hbGl6ZSIsInNjcm9sbHZpZXdTaXplIiwidG90YWxNb3ZlV2lkdGgiLCJ0b3RhbE1vdmVIZWlnaHQiLCJhdHRlbnVhdGVkRmFjdG9yWCIsImF0dGVudWF0ZWRGYWN0b3JZIiwib3JpZ2luYWxNb3ZlTGVuZ3RoIiwiZmFjdG9yIiwic3FydCIsImluaXRhbFNwZWVkIiwiYWRqdXN0ZWREZWx0YU1vdmUiLCJfZmxhdHRlblZlY3RvckJ5RGlyZWN0aW9uIiwidG90YWxUaW1lIiwicmVkdWNlIiwiYSIsImIiLCJ0b3RhbE1vdmVtZW50IiwidmVjdG9yIiwicmVzdWx0IiwiY2FuU3RhcnRCb3VuY2VCYWNrIiwiYWRqdXN0ZWRNb3ZlIiwiY29udGVudFBvcyIsImdldEFuY2hvclBvaW50IiwiX2dldENvbnRlbnRSaWdodEJvdW5kYXJ5IiwiYWRkaXRpb24iLCJvdXRPZkJvdW5kYXJ5QW1vdW50IiwiaGlkZSIsInNob3ciLCJfb25TY3JvbGwiLCJmbGFnIiwiZW1pdEV2ZW50cyIsImVtaXQiLCJzdGFydCIsImRpcmVjdG9yIiwib25jZSIsIkRpcmVjdG9yIiwiRVZFTlRfQkVGT1JFX0RSQVciLCJfaGlkZVNjcm9sbGJhciIsIm9uRGlzYWJsZSIsIlNJWkVfQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJQT1NJVElPTl9DSEFOR0VEIiwib25FbmFibGUiLCJ1cGRhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCQyxTQUF2Qzs7QUFFQSxJQUFNQyx5Q0FBeUMsR0FBRyxDQUFsRDtBQUNBLElBQU1DLCtCQUErQixHQUFHLElBQXhDO0FBQ0EsSUFBTUMsT0FBTyxHQUFHLElBQWhCO0FBQ0EsSUFBTUMsZUFBZSxHQUFHLEdBQXhCOztBQUVBLElBQUlDLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxFQUFILEVBQWpCOztBQUNBLElBQUlDLGNBQWMsR0FBR0YsRUFBRSxDQUFDQyxFQUFILEVBQXJCOztBQUVBLElBQUlFLFlBQVks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QTNCO0FBQ0g7QUFDSjtBQS8zQ3FCLENBQVQsQ0FBakI7QUFrNENBekssRUFBRSxDQUFDd0IsVUFBSCxHQUFnQjZSLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjlSLFVBQWpDO0FBRUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7OztBQVVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBOb2RlRXZlbnQgPSByZXF1aXJlKCcuLi9DQ05vZGUnKS5FdmVudFR5cGU7XG5cbmNvbnN0IE5VTUJFUl9PRl9HQVRIRVJFRF9UT1VDSEVTX0ZPUl9NT1ZFX1NQRUVEID0gNTtcbmNvbnN0IE9VVF9PRl9CT1VOREFSWV9CUkVBS0lOR19GQUNUT1IgPSAwLjA1O1xuY29uc3QgRVBTSUxPTiA9IDFlLTQ7XG5jb25zdCBNT1ZFTUVOVF9GQUNUT1IgPSAwLjc7XG5cbmxldCBfdGVtcFBvaW50ID0gY2MudjIoKTtcbmxldCBfdGVtcFByZXZQb2ludCA9IGNjLnYyKCk7XG5cbmxldCBxdWludEVhc2VPdXQgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgdGltZSAtPSAxO1xuICAgIHJldHVybiAodGltZSAqIHRpbWUgKiB0aW1lICogdGltZSAqIHRpbWUgKyAxKTtcbn07XG5cbmxldCBnZXRUaW1lSW5NaWxsaXNlY29uZHMgPSBmdW5jdGlvbigpIHtcbiAgICBsZXQgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBjdXJyZW50VGltZS5nZXRNaWxsaXNlY29uZHMoKTtcbn07XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBTY3JvbGxWaWV3IGV2ZW50IHR5cGUuXG4gKiAhI3poIOa7muWKqOinhuWbvuS6i+S7tuexu+Wei1xuICogQGVudW0gU2Nyb2xsVmlldy5FdmVudFR5cGVcbiAqL1xuY29uc3QgRXZlbnRUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgdG9wIGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lclxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5Yiw6aG26YOo6L6555WM5LqL5Lu2XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNDUk9MTF9UT19UT1BcbiAgICAgKi9cbiAgICBTQ1JPTExfVE9fVE9QIDogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgc2Nyb2xsIHRvIHRoZSBib3R0b20gYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlupXpg6jovrnnlYzkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX1RPX0JPVFRPTVxuICAgICAqL1xuICAgIFNDUk9MTF9UT19CT1RUT00gOiAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgdG8gdGhlIGxlZnQgYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlt6bovrnnlYzkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX1RPX0xFRlRcbiAgICAgKi9cbiAgICBTQ1JPTExfVE9fTEVGVCA6IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgcmlnaHQgYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlj7PovrnnlYzkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX1RPX1JJR0hUXG4gICAgICovXG4gICAgU0NST0xMX1RPX1JJR0hUIDogMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgaXMgc2Nyb2xsaW5nXG4gICAgICogISN6aCDmu5rliqjop4blm77mraPlnKjmu5rliqjml7blj5Hlh7rnmoTkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMSU5HXG4gICAgICovXG4gICAgU0NST0xMSU5HIDogNCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgc2Nyb2xsIHRvIHRoZSB0b3AgYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyIGFuZCBzdGFydCBib3VuY2VcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvua7muWKqOWIsOmhtumDqOi+ueeVjOW5tuS4lOW8gOWni+WbnuW8ueaXtuWPkeWHuueahOS6i+S7tlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1VOQ0VfVE9QXG4gICAgICovXG4gICAgQk9VTkNFX1RPUCA6IDUsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCB0byB0aGUgYm90dG9tIGJvdW5kYXJ5IG9mIGlubmVyIGNvbnRhaW5lciBhbmQgc3RhcnQgYm91bmNlXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjliLDlupXpg6jovrnnlYzlubbkuJTlvIDlp4vlm57lvLnml7blj5Hlh7rnmoTkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQk9VTkNFX0JPVFRPTVxuICAgICAqL1xuICAgIEJPVU5DRV9CT1RUT00gOiA2LFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IGVtbWl0dGVkIHdoZW4gU2Nyb2xsVmlldyBzY3JvbGwgdG8gdGhlIGxlZnQgYm91bmRhcnkgb2YgaW5uZXIgY29udGFpbmVyIGFuZCBzdGFydCBib3VuY2VcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvua7muWKqOWIsOW3pui+ueeVjOW5tuS4lOW8gOWni+WbnuW8ueaXtuWPkeWHuueahOS6i+S7tlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1VOQ0VfTEVGVFxuICAgICAqL1xuICAgIEJPVU5DRV9MRUZUIDogNyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIFNjcm9sbFZpZXcgc2Nyb2xsIHRvIHRoZSByaWdodCBib3VuZGFyeSBvZiBpbm5lciBjb250YWluZXIgYW5kIHN0YXJ0IGJvdW5jZVxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5Yiw5Y+z6L6555WM5bm25LiU5byA5aeL5Zue5by55pe25Y+R5Ye655qE5LqL5Lu2XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEJPVU5DRV9SSUdIVFxuICAgICAqL1xuICAgIEJPVU5DRV9SSUdIVCA6IDgsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IGF1dG8gc2Nyb2xsIGVuZGVkXG4gICAgICogISN6aCDmu5rliqjop4blm77mu5rliqjnu5PmnZ/nmoTml7blgJnlj5Hlh7rnmoTkuovku7ZcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NST0xMX0VOREVEXG4gICAgICovXG4gICAgU0NST0xMX0VOREVEIDogOSxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCBlbW1pdHRlZCB3aGVuIHVzZXIgcmVsZWFzZSB0aGUgdG91Y2hcbiAgICAgKiAhI3poIOW9k+eUqOaIt+advuaJi+eahOaXtuWAmeS8muWPkeWHuuS4gOS4quS6i+S7tlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUT1VDSF9VUFxuICAgICAqL1xuICAgIFRPVUNIX1VQIDogMTAsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IGF1dG8gc2Nyb2xsIGVuZGVkIHdpdGggYSB0aHJlc2hvbGRcbiAgICAgKiAhI3poIOa7muWKqOinhuWbvuiHquWKqOa7muWKqOW/q+imgee7k+adn+eahOaXtuWAmeWPkeWHuueahOS6i+S7tlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBVVRPU0NST0xMX0VOREVEX1dJVEhfVEhSRVNIT0xEXG4gICAgICovXG4gICAgQVVUT1NDUk9MTF9FTkRFRF9XSVRIX1RIUkVTSE9MRDogMTEsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgZW1taXR0ZWQgd2hlbiBTY3JvbGxWaWV3IHNjcm9sbCBiZWdhblxuICAgICAqICEjemgg5rua5Yqo6KeG5Zu+5rua5Yqo5byA5aeL5pe25Y+R5Ye655qE5LqL5Lu2XG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNDUk9MTF9CRUdBTlxuICAgICAqL1xuICAgIFNDUk9MTF9CRUdBTjogMTJcbn0pO1xuXG5jb25zdCBldmVudE1hcCA9IHtcbiAgICAnc2Nyb2xsLXRvLXRvcCcgOiBFdmVudFR5cGUuU0NST0xMX1RPX1RPUCxcbiAgICAnc2Nyb2xsLXRvLWJvdHRvbSc6IEV2ZW50VHlwZS5TQ1JPTExfVE9fQk9UVE9NLFxuICAgICdzY3JvbGwtdG8tbGVmdCcgOiBFdmVudFR5cGUuU0NST0xMX1RPX0xFRlQsXG4gICAgJ3Njcm9sbC10by1yaWdodCcgOiBFdmVudFR5cGUuU0NST0xMX1RPX1JJR0hULFxuICAgICdzY3JvbGxpbmcnIDogRXZlbnRUeXBlLlNDUk9MTElORyxcbiAgICAnYm91bmNlLWJvdHRvbScgOiBFdmVudFR5cGUuQk9VTkNFX0JPVFRPTSxcbiAgICAnYm91bmNlLWxlZnQnIDogRXZlbnRUeXBlLkJPVU5DRV9MRUZULFxuICAgICdib3VuY2UtcmlnaHQnIDogRXZlbnRUeXBlLkJPVU5DRV9SSUdIVCxcbiAgICAnYm91bmNlLXRvcCcgOiBFdmVudFR5cGUuQk9VTkNFX1RPUCxcbiAgICAnc2Nyb2xsLWVuZGVkJzogRXZlbnRUeXBlLlNDUk9MTF9FTkRFRCxcbiAgICAndG91Y2gtdXAnIDogRXZlbnRUeXBlLlRPVUNIX1VQLFxuICAgICdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnIDogRXZlbnRUeXBlLkFVVE9TQ1JPTExfRU5ERURfV0lUSF9USFJFU0hPTEQsXG4gICAgJ3Njcm9sbC1iZWdhbic6IEV2ZW50VHlwZS5TQ1JPTExfQkVHQU5cbn07XG5cbi8qKlxuICogISNlblxuICogTGF5b3V0IGNvbnRhaW5lciBmb3IgYSB2aWV3IGhpZXJhcmNoeSB0aGF0IGNhbiBiZSBzY3JvbGxlZCBieSB0aGUgdXNlcixcbiAqIGFsbG93aW5nIGl0IHRvIGJlIGxhcmdlciB0aGFuIHRoZSBwaHlzaWNhbCBkaXNwbGF5LlxuICpcbiAqICEjemhcbiAqIOa7muWKqOinhuWbvue7hOS7tlxuICogQGNsYXNzIFNjcm9sbFZpZXdcbiAqIEBleHRlbmRzIENvbXBvbmVudFxuICovXG5sZXQgU2Nyb2xsVmlldyA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2Nyb2xsVmlldycsXG4gICAgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ1ZpZXdHcm91cCcpLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1Njcm9sbFZpZXcnLFxuICAgICAgICBoZWxwOiAnaTE4bjpDT01QT05FTlQuaGVscF91cmwuc2Nyb2xsdmlldycsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvc2Nyb2xsdmlldy5qcycsXG4gICAgICAgIGV4ZWN1dGVJbkVkaXRNb2RlOiBmYWxzZSxcbiAgICB9LFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3RvcEJvdW5kYXJ5ID0gMDtcbiAgICAgICAgdGhpcy5fYm90dG9tQm91bmRhcnkgPSAwO1xuICAgICAgICB0aGlzLl9sZWZ0Qm91bmRhcnkgPSAwO1xuICAgICAgICB0aGlzLl9yaWdodEJvdW5kYXJ5ID0gMDtcblxuICAgICAgICB0aGlzLl90b3VjaE1vdmVEaXNwbGFjZW1lbnRzID0gW107XG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZVRpbWVEZWx0YXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdG91Y2hNb3ZlUHJldmlvdXNUaW1lc3RhbXAgPSAwO1xuICAgICAgICB0aGlzLl90b3VjaE1vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQXR0ZW51YXRlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxTdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUYXJnZXREZWx0YSA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsVG90YWxUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEFjY3VtdWxhdGVkVGltZSA9IDA7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nU3RhcnRQb3NpdGlvbiA9IGNjLnYyKDAsIDApO1xuXG4gICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgdGhpcy5fb3V0T2ZCb3VuZGFyeUFtb3VudERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc3RvcE1vdXNlV2hlZWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2ZW50RWxhcHNlZFRpbWUgPSAwLjA7XG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCA9IGZhbHNlO1xuICAgICAgICAvL3VzZSBiaXQgd2lzZSBvcGVyYXRpb25zIHRvIGluZGljYXRlIHRoZSBkaXJlY3Rpb25cbiAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRFbWl0TWFzayA9IDA7XG4gICAgICAgIHRoaXMuX2lzQm91bmNpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhpcyBpcyBhIHJlZmVyZW5jZSB0byB0aGUgVUkgZWxlbWVudCB0byBiZSBzY3JvbGxlZC5cbiAgICAgICAgICogISN6aCDlj6/mu5rliqjlsZXnpLrlhoXlrrnnmoToioLngrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOb2RlfSBjb250ZW50XG4gICAgICAgICAqL1xuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zY3JvbGx2aWV3LmNvbnRlbnQnLFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdjb250ZW50JyxcbiAgICAgICAgICAgIG5vdGlmeSAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEVuYWJsZSBob3Jpem9udGFsIHNjcm9sbC5cbiAgICAgICAgICogISN6aCDmmK/lkKblvIDlkK/msLTlubPmu5rliqjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBob3Jpem9udGFsXG4gICAgICAgICAqL1xuICAgICAgICBob3Jpem9udGFsOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcuaG9yaXpvbnRhbCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gRW5hYmxlIHZlcnRpY2FsIHNjcm9sbC5cbiAgICAgICAgICogISN6aCDmmK/lkKblvIDlkK/lnoLnm7Tmu5rliqjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSB2ZXJ0aWNhbFxuICAgICAgICAgKi9cbiAgICAgICAgdmVydGljYWw6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy52ZXJ0aWNhbCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gV2hlbiBpbmVydGlhIGlzIHNldCwgdGhlIGNvbnRlbnQgd2lsbCBjb250aW51ZSB0byBtb3ZlIHdoZW4gdG91Y2ggZW5kZWQuXG4gICAgICAgICAqICEjemgg5piv5ZCm5byA5ZCv5rua5Yqo5oOv5oCn44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaW5lcnRpYVxuICAgICAgICAgKi9cbiAgICAgICAgaW5lcnRpYToge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5pbmVydGlhJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBJdCBkZXRlcm1pbmVzIGhvdyBxdWlja2x5IHRoZSBjb250ZW50IHN0b3AgbW92aW5nLiBBIHZhbHVlIG9mIDEgd2lsbCBzdG9wIHRoZSBtb3ZlbWVudCBpbW1lZGlhdGVseS5cbiAgICAgICAgICogQSB2YWx1ZSBvZiAwIHdpbGwgbmV2ZXIgc3RvcCB0aGUgbW92ZW1lbnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgYm91bmRhcnkgb2Ygc2Nyb2xsdmlldy5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvIDlkK/mg6/mgKflkI7vvIzlnKjnlKjmiLflgZzmraLop6bmkbjlkI7mu5rliqjlpJrlv6vlgZzmraLvvIww6KGo56S65rC45LiN5YGc5q2i77yMMeihqOekuueri+WIu+WBnOatouOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gYnJha2VcbiAgICAgICAgICovXG4gICAgICAgIGJyYWtlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLjUsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMSwgMC4xXSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5icmFrZScsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gV2hlbiBlbGFzdGljIGlzIHNldCwgdGhlIGNvbnRlbnQgd2lsbCBiZSBib3VuY2UgYmFjayB3aGVuIG1vdmUgb3V0IG9mIGJvdW5kYXJ5LlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWFgeiuuOa7muWKqOWGheWuuei2hei/h+i+ueeVjO+8jOW5tuWcqOWBnOatouinpuaRuOWQjuWbnuW8ueOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGVsYXN0aWNcbiAgICAgICAgICovXG4gICAgICAgIGVsYXN0aWM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5lbGFzdGljJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZWxhcHNlIHRpbWUgb2YgYm91bmNpbmcgYmFjay4gQSB2YWx1ZSBvZiAwIHdpbGwgYm91bmNlIGJhY2sgaW1tZWRpYXRlbHkuXG4gICAgICAgICAqICEjemgg5Zue5by55oyB57ut55qE5pe26Ze077yMMCDooajnpLrlsIbnq4vljbPlj43lvLnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IGJvdW5jZUR1cmF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBib3VuY2VEdXJhdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogMSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMTBdLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5zY3JvbGx2aWV3LmJvdW5jZUR1cmF0aW9uJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgaG9yaXpvbnRhbCBzY3JvbGxiYXIgcmVmZXJlbmNlLlxuICAgICAgICAgKiAhI3poIOawtOW5s+a7muWKqOeahCBTY3JvbGxCYXLjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtTY3JvbGxiYXJ9IGhvcml6b250YWxTY3JvbGxCYXJcbiAgICAgICAgICovXG4gICAgICAgIGhvcml6b250YWxTY3JvbGxCYXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNjcm9sbGJhcixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5ob3Jpem9udGFsX2JhcicsXG4gICAgICAgICAgICBub3RpZnkgKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWxTY3JvbGxCYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLnNldFRhcmdldFNjcm9sbFZpZXcodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcigwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgdmVydGljYWwgc2Nyb2xsYmFyIHJlZmVyZW5jZS5cbiAgICAgICAgICogISN6aCDlnoLnm7Tmu5rliqjnmoQgU2Nyb2xsQmFy44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2Nyb2xsYmFyfSB2ZXJ0aWNhbFNjcm9sbEJhclxuICAgICAgICAgKi9cbiAgICAgICAgdmVydGljYWxTY3JvbGxCYXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNjcm9sbGJhcixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy52ZXJ0aWNhbF9iYXInLFxuICAgICAgICAgICAgbm90aWZ5ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLnNldFRhcmdldFNjcm9sbFZpZXcodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcigwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTY3JvbGx2aWV3IGV2ZW50cyBjYWxsYmFja1xuICAgICAgICAgKiAhI3poIOa7muWKqOinhuWbvueahOS6i+S7tuWbnuiwg+WHveaVsFxuICAgICAgICAgKiBAcHJvcGVydHkge0NvbXBvbmVudC5FdmVudEhhbmRsZXJbXX0gc2Nyb2xsRXZlbnRzXG4gICAgICAgICAqL1xuICAgICAgICBzY3JvbGxFdmVudHM6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcixcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQuc2Nyb2xsdmlldy5zY3JvbGxFdmVudHMnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSWYgY2FuY2VsSW5uZXJFdmVudHMgaXMgc2V0IHRvIHRydWUsIHRoZSBzY3JvbGwgYmVoYXZpb3Igd2lsbCBjYW5jZWwgdG91Y2ggZXZlbnRzIG9uIGlubmVyIGNvbnRlbnQgbm9kZXNcbiAgICAgICAgICogSXQncyBzZXQgdG8gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAgICAgKiAhI3poIOWmguaenOi/meS4quWxnuaAp+iiq+iuvue9ruS4uiB0cnVl77yM6YKj5LmI5rua5Yqo6KGM5Li65Lya5Y+W5raI5a2Q6IqC54K55LiK5rOo5YaM55qE6Kem5pG45LqL5Lu277yM6buY6K6k6KKr6K6+572u5Li6IHRydWXjgIJcbiAgICAgICAgICog5rOo5oSP77yM5a2Q6IqC54K55LiK55qEIHRvdWNoc3RhcnQg5LqL5Lu25LuN54S25Lya6Kem5Y+R77yM6Kem54K556e75Yqo6Led56a76Z2e5bi455+t55qE5oOF5Ya15LiLIHRvdWNobW92ZSDlkowgdG91Y2hlbmQg5Lmf5LiN5Lya5Y+X5b2x5ZON44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gY2FuY2VsSW5uZXJFdmVudHNcbiAgICAgICAgICovXG4gICAgICAgIGNhbmNlbElubmVyRXZlbnRzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULnNjcm9sbHZpZXcuY2FuY2VsSW5uZXJFdmVudHMnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gcHJpdmF0ZSBvYmplY3RcbiAgICAgICAgX3ZpZXc6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRXZlbnRUeXBlOiBFdmVudFR5cGUsXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2Nyb2xsIHRoZSBjb250ZW50IHRvIHRoZSBib3R0b20gYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuW6lemDqOOAglxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9Cb3R0b21cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgYm90dG9tIGJvdW5kYXJ5IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFNjcm9sbCB0byB0aGUgYm90dG9tIG9mIHRoZSB2aWV3LlxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oMC4xKTtcbiAgICAgKi9cbiAgICBzY3JvbGxUb0JvdHRvbSAodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcbiAgICAgICAgICAgIGFuY2hvcjogY2MudjIoMCwgMCksXG4gICAgICAgICAgICBhcHBseVRvSG9yaXpvbnRhbDogZmFsc2UsXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbChtb3ZlRGVsdGEsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCAhPT0gZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgdG9wIGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXG4gICAgICogISN6aCDop4blm77lhoXlrrnlsIblnKjop4Tlrprml7bpl7TlhoXmu5rliqjliLDop4blm77pobbpg6jjgIJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvVG9wXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHRvcCBib3VuZGFyeSBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIHRvcCBvZiB0aGUgdmlldy5cbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvVG9wKDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9Ub3AgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xuICAgICAgICBsZXQgbW92ZURlbHRhID0gdGhpcy5fY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSh7XG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKDAsIDEpLFxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IGZhbHNlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGxlZnQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuW3pui+ueOAglxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9MZWZ0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIGxlZnQgYm91bmRhcnkgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gU2Nyb2xsIHRvIHRoZSBsZWZ0IG9mIHRoZSB2aWV3LlxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9MZWZ0KDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9MZWZ0ICh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAwKSxcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiBmYWxzZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRpbWVJblNlY29uZCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKG1vdmVEZWx0YSwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkICE9PSBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9tb3ZlQ29udGVudChtb3ZlRGVsdGEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2Nyb2xsIHRoZSBjb250ZW50IHRvIHRoZSByaWdodCBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655bCG5Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5Yiw6KeG5Zu+5Y+z6L6544CCXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1JpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHJpZ2h0IGJvdW5kYXJ5IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFNjcm9sbCB0byB0aGUgcmlnaHQgb2YgdGhlIHZpZXcuXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb1JpZ2h0KDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9SaWdodCAodGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcbiAgICAgICAgICAgIGFuY2hvcjogY2MudjIoMSwgMCksXG4gICAgICAgICAgICBhcHBseVRvSG9yaXpvbnRhbDogdHJ1ZSxcbiAgICAgICAgICAgIGFwcGx5VG9WZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbChtb3ZlRGVsdGEsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCAhPT0gZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgdG9wIGxlZnQgYm91bmRhcnkgb2YgU2Nyb2xsVmlldy5cbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWwhuWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsOinhuWbvuW3puS4iuinkuOAglxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9Ub3BMZWZ0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHRvcCBsZWZ0IGJvdW5kYXJ5IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFNjcm9sbCB0byB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHZpZXcuXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb1RvcExlZnQoMC4xKTtcbiAgICAgKi9cbiAgICBzY3JvbGxUb1RvcExlZnQgKHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xuICAgICAgICBsZXQgbW92ZURlbHRhID0gdGhpcy5fY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSh7XG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKDAsIDEpLFxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aW1lSW5TZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbChtb3ZlRGVsdGEsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCAhPT0gZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNjcm9sbCB0aGUgY29udGVudCB0byB0aGUgdG9wIHJpZ2h0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXG4gICAgICogISN6aCDop4blm77lhoXlrrnlsIblnKjop4Tlrprml7bpl7TlhoXmu5rliqjliLDop4blm77lj7PkuIrop5LjgIJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvVG9wUmlnaHRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgdG9wIHJpZ2h0IGJvdW5kYXJ5IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFNjcm9sbCB0byB0aGUgdG9wIHJpZ2h0IGNvcm5lciBvZiB0aGUgdmlldy5cbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvVG9wUmlnaHQoMC4xKTtcbiAgICAgKi9cbiAgICBzY3JvbGxUb1RvcFJpZ2h0ICh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigxLCAxKSxcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGJvdHRvbSBsZWZ0IGJvdW5kYXJ5IG9mIFNjcm9sbFZpZXcuXG4gICAgICogISN6aCDop4blm77lhoXlrrnlsIblnKjop4Tlrprml7bpl7TlhoXmu5rliqjliLDop4blm77lt6bkuIvop5LjgIJcbiAgICAgKiBAbWV0aG9kIHNjcm9sbFRvQm90dG9tTGVmdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXG4gICAgICogdGhlIGNvbnRlbnQgd2lsbCBqdW1wIHRvIHRoZSBib3R0b20gbGVmdCBib3VuZGFyeSBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIGxvd2VyIGxlZnQgY29ybmVyIG9mIHRoZSB2aWV3LlxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b21MZWZ0KDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9Cb3R0b21MZWZ0ICh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigwLCAwKSxcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGJvdHRvbSByaWdodCBib3VuZGFyeSBvZiBTY3JvbGxWaWV3LlxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655bCG5Zyo6KeE5a6a5pe26Ze05YaF5rua5Yqo5Yiw6KeG5Zu+5Y+z5LiL6KeS44CCXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb0JvdHRvbVJpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIGJvdHRvbSByaWdodCBib3VuZGFyeSBpbW1lZGlhdGVseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFthdHRlbnVhdGVkPXRydWVdIC0gV2hldGhlciB0aGUgc2Nyb2xsIGFjY2VsZXJhdGlvbiBhdHRlbnVhdGVkLCBkZWZhdWx0IGlzIHRydWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBTY3JvbGwgdG8gdGhlIGxvd2VyIHJpZ2h0IGNvcm5lciBvZiB0aGUgdmlldy5cbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvQm90dG9tUmlnaHQoMC4xKTtcbiAgICAgKi9cbiAgICBzY3JvbGxUb0JvdHRvbVJpZ2h0ICh0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpIHtcbiAgICAgICAgbGV0IG1vdmVEZWx0YSA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEoe1xuICAgICAgICAgICAgYW5jaG9yOiBjYy52MigxLCAwKSxcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNjcm9sbCB3aXRoIGFuIG9mZnNldCByZWxhdGVkIHRvIHRoZSBTY3JvbGxWaWV3J3MgdG9wIGxlZnQgb3JpZ2luLCBpZiB0aW1lSW5TZWNvbmQgaXMgb21pdHRlZCwgdGhlbiBpdCB3aWxsIGp1bXAgdG8gdGhlXG4gICAgICogICAgICAgc3BlY2lmaWMgb2Zmc2V0IGltbWVkaWF0ZWx5LlxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF5bCG5rua5Yqo5YiwIFNjcm9sbFZpZXcg55u45a+55bem5LiK6KeS5Y6f54K555qE5YGP56e75L2N572uLCDlpoLmnpwgdGltZUluU2Vjb25k5Y+C5pWw5LiN5Lyg77yM5YiZ56uL5Y2z5rua5Yqo5Yiw5oyH5a6a5YGP56e75L2N572u44CCXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb09mZnNldFxuICAgICAqIEBwYXJhbSB7VmVjMn0gb2Zmc2V0IC0gQSBWZWMyLCB0aGUgdmFsdWUgb2Ygd2hpY2ggZWFjaCBheGlzIGJldHdlZW4gMCBhbmQgbWF4U2Nyb2xsT2Zmc2V0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0aW1lSW5TZWNvbmQ9MF0gLSBTY3JvbGwgdGltZSBpbiBzZWNvbmQsIGlmIHlvdSBkb24ndCBwYXNzIHRpbWVJblNlY29uZCxcbiAgICAgKiB0aGUgY29udGVudCB3aWxsIGp1bXAgdG8gdGhlIHNwZWNpZmljIG9mZnNldCBvZiBTY3JvbGxWaWV3IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFNjcm9sbCB0byBtaWRkbGUgcG9zaXRpb24gaW4gMC4xIHNlY29uZCBpbiB4LWF4aXNcbiAgICAgKiBsZXQgbWF4U2Nyb2xsT2Zmc2V0ID0gdGhpcy5nZXRNYXhTY3JvbGxPZmZzZXQoKTtcbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvT2Zmc2V0KGNjLnYyKG1heFNjcm9sbE9mZnNldC54IC8gMiwgMCksIDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9PZmZzZXQgKG9mZnNldCwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XG4gICAgICAgIGxldCBtYXhTY3JvbGxPZmZzZXQgPSB0aGlzLmdldE1heFNjcm9sbE9mZnNldCgpO1xuXG4gICAgICAgIGxldCBhbmNob3IgPSBjYy52MigwLCAwKTtcbiAgICAgICAgLy9pZiBtYXhTY3JvbGxPZmZzZXQgaXMgMCwgdGhlbiBhbHdheXMgYWxpZ24gdGhlIGNvbnRlbnQncyB0b3AgbGVmdCBvcmlnaW4gdG8gdGhlIHRvcCBsZWZ0IGNvcm5lciBvZiBpdHMgcGFyZW50XG4gICAgICAgIGlmIChtYXhTY3JvbGxPZmZzZXQueCA9PT0gMCkge1xuICAgICAgICAgICAgYW5jaG9yLnggPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jaG9yLnggPSBvZmZzZXQueCAvIG1heFNjcm9sbE9mZnNldC54O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1heFNjcm9sbE9mZnNldC55ID09PSAwKSB7XG4gICAgICAgICAgICBhbmNob3IueSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmNob3IueSA9IChtYXhTY3JvbGxPZmZzZXQueSAtIG9mZnNldC55ICkgLyBtYXhTY3JvbGxPZmZzZXQueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsVG8oYW5jaG9yLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuICBHZXQgdGhlIHBvc2l0aXZlIG9mZnNldCB2YWx1ZSBjb3JyZXNwb25kcyB0byB0aGUgY29udGVudCdzIHRvcCBsZWZ0IGJvdW5kYXJ5LlxuICAgICAqICEjemggIOiOt+WPlua7muWKqOinhuWbvuebuOWvueS6juW3puS4iuinkuWOn+eCueeahOW9k+WJjea7muWKqOWBj+enu1xuICAgICAqIEBtZXRob2QgZ2V0U2Nyb2xsT2Zmc2V0XG4gICAgICogQHJldHVybiB7VmVjMn0gIC0gQSBWZWMyIHZhbHVlIGluZGljYXRlIHRoZSBjdXJyZW50IHNjcm9sbCBvZmZzZXQuXG4gICAgICovXG4gICAgZ2V0U2Nyb2xsT2Zmc2V0ICgpIHtcbiAgICAgICAgbGV0IHRvcERlbHRhID0gIHRoaXMuX2dldENvbnRlbnRUb3BCb3VuZGFyeSgpIC0gdGhpcy5fdG9wQm91bmRhcnk7XG4gICAgICAgIGxldCBsZWZ0RGV0YSA9IHRoaXMuX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkoKSAtIHRoaXMuX2xlZnRCb3VuZGFyeTtcblxuICAgICAgICByZXR1cm4gY2MudjIobGVmdERldGEsIHRvcERlbHRhKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIG1heGltaXplIGF2YWlsYWJsZSAgc2Nyb2xsIG9mZnNldFxuICAgICAqICEjemgg6I635Y+W5rua5Yqo6KeG5Zu+5pyA5aSn5Y+v5Lul5rua5Yqo55qE5YGP56e76YePXG4gICAgICogQG1ldGhvZCBnZXRNYXhTY3JvbGxPZmZzZXRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfSAtIEEgVmVjMiB2YWx1ZSBpbmRpY2F0ZSB0aGUgbWF4aW1pemUgc2Nyb2xsIG9mZnNldCBpbiB4IGFuZCB5IGF4aXMuXG4gICAgICovXG4gICAgZ2V0TWF4U2Nyb2xsT2Zmc2V0ICgpIHtcbiAgICAgICAgbGV0IHZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgbGV0IGhvcml6b250YWxNYXhpbWl6ZU9mZnNldCA9ICBjb250ZW50U2l6ZS53aWR0aCAtIHZpZXdTaXplLndpZHRoO1xuICAgICAgICBsZXQgdmVydGljYWxNYXhpbWl6ZU9mZnNldCA9IGNvbnRlbnRTaXplLmhlaWdodCAtIHZpZXdTaXplLmhlaWdodDtcbiAgICAgICAgaG9yaXpvbnRhbE1heGltaXplT2Zmc2V0ID0gaG9yaXpvbnRhbE1heGltaXplT2Zmc2V0ID49IDAgPyBob3Jpem9udGFsTWF4aW1pemVPZmZzZXQgOiAwO1xuICAgICAgICB2ZXJ0aWNhbE1heGltaXplT2Zmc2V0ID0gdmVydGljYWxNYXhpbWl6ZU9mZnNldCA+PTAgPyB2ZXJ0aWNhbE1heGltaXplT2Zmc2V0IDogMDtcblxuICAgICAgICByZXR1cm4gY2MudjIoaG9yaXpvbnRhbE1heGltaXplT2Zmc2V0LCB2ZXJ0aWNhbE1heGltaXplT2Zmc2V0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIGhvcml6b250YWwgcGVyY2VudCBwb3NpdGlvbiBvZiBTY3JvbGxWaWV3LlxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF5bCG5rua5Yqo5YiwIFNjcm9sbFZpZXcg5rC05bmz5pa55ZCR55qE55m+5YiG5q+U5L2N572u5LiK44CCXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1BlcmNlbnRIb3Jpem9udGFsXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHBlcmNlbnQgLSBBIHZhbHVlIGJldHdlZW4gMCBhbmQgMS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgaG9yaXpvbnRhbCBwZXJjZW50IHBvc2l0aW9uIG9mIFNjcm9sbFZpZXcgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gU2Nyb2xsIHRvIG1pZGRsZSBwb3NpdGlvbi5cbiAgICAgKiBzY3JvbGxWaWV3LnNjcm9sbFRvQm90dG9tUmlnaHQoMC41LCAwLjEpO1xuICAgICAqL1xuICAgIHNjcm9sbFRvUGVyY2VudEhvcml6b250YWwgKHBlcmNlbnQsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xuICAgICAgICBsZXQgbW92ZURlbHRhID0gdGhpcy5fY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSh7XG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKHBlcmNlbnQsIDApLFxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IHRydWUsXG4gICAgICAgICAgICBhcHBseVRvVmVydGljYWw6IGZhbHNlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldyBpbiBhbnkgZGlyZWN0aW9uLlxuICAgICAqICEjemgg6KeG5Zu+5YaF5a655Zyo6KeE5a6a5pe26Ze05YaF6L+b6KGM5Z6C55u05pa55ZCR5ZKM5rC05bmz5pa55ZCR55qE5rua5Yqo77yM5bm25LiU5rua5Yqo5Yiw5oyH5a6a55m+5YiG5q+U5L2N572u5LiK44CCXG4gICAgICogQG1ldGhvZCBzY3JvbGxUb1xuICAgICAqIEBwYXJhbSB7VmVjMn0gYW5jaG9yIC0gQSBwb2ludCB3aGljaCB3aWxsIGJlIGNsYW1wIGJldHdlZW4gY2MudjIoMCwwKSBhbmQgY2MudjIoMSwxKS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3RpbWVJblNlY29uZD0wXSAtIFNjcm9sbCB0aW1lIGluIHNlY29uZCwgaWYgeW91IGRvbid0IHBhc3MgdGltZUluU2Vjb25kLFxuICAgICAqIHRoZSBjb250ZW50IHdpbGwganVtcCB0byB0aGUgcGVyY2VudCBwb3NpdGlvbiBvZiBTY3JvbGxWaWV3IGltbWVkaWF0ZWx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2F0dGVudWF0ZWQ9dHJ1ZV0gLSBXaGV0aGVyIHRoZSBzY3JvbGwgYWNjZWxlcmF0aW9uIGF0dGVudWF0ZWQsIGRlZmF1bHQgaXMgdHJ1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIFZlcnRpY2FsIHNjcm9sbCB0byB0aGUgYm90dG9tIG9mIHRoZSB2aWV3LlxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG8oY2MudjIoMCwgMSksIDAuMSk7XG4gICAgICpcbiAgICAgKiAvLyBIb3Jpem9udGFsIHNjcm9sbCB0byB2aWV3IHJpZ2h0LlxuICAgICAqIHNjcm9sbFZpZXcuc2Nyb2xsVG8oY2MudjIoMSwgMCksIDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG8gKGFuY2hvciwgdGltZUluU2Vjb25kLCBhdHRlbnVhdGVkKSB7XG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlUGVyY2VudERlbHRhKHtcbiAgICAgICAgICAgIGFuY2hvcjogY2MudjIoYW5jaG9yKSxcbiAgICAgICAgICAgIGFwcGx5VG9Ib3Jpem9udGFsOiB0cnVlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTY3JvbGwgdGhlIGNvbnRlbnQgdG8gdGhlIHZlcnRpY2FsIHBlcmNlbnQgcG9zaXRpb24gb2YgU2Nyb2xsVmlldy5cbiAgICAgKiAhI3poIOinhuWbvuWGheWuueWcqOinhOWumuaXtumXtOWGhea7muWKqOWIsCBTY3JvbGxWaWV3IOWeguebtOaWueWQkeeahOeZvuWIhuavlOS9jee9ruS4iuOAglxuICAgICAqIEBtZXRob2Qgc2Nyb2xsVG9QZXJjZW50VmVydGljYWxcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcGVyY2VudCAtIEEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdGltZUluU2Vjb25kPTBdIC0gU2Nyb2xsIHRpbWUgaW4gc2Vjb25kLCBpZiB5b3UgZG9uJ3QgcGFzcyB0aW1lSW5TZWNvbmQsXG4gICAgICogdGhlIGNvbnRlbnQgd2lsbCBqdW1wIHRvIHRoZSB2ZXJ0aWNhbCBwZXJjZW50IHBvc2l0aW9uIG9mIFNjcm9sbFZpZXcgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbYXR0ZW51YXRlZD10cnVlXSAtIFdoZXRoZXIgdGhlIHNjcm9sbCBhY2NlbGVyYXRpb24gYXR0ZW51YXRlZCwgZGVmYXVsdCBpcyB0cnVlLlxuICAgICAqIC8vIFNjcm9sbCB0byBtaWRkbGUgcG9zaXRpb24uXG4gICAgICogc2Nyb2xsVmlldy5zY3JvbGxUb1BlcmNlbnRWZXJ0aWNhbCgwLjUsIDAuMSk7XG4gICAgICovXG4gICAgc2Nyb2xsVG9QZXJjZW50VmVydGljYWwgKHBlcmNlbnQsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xuICAgICAgICBsZXQgbW92ZURlbHRhID0gdGhpcy5fY2FsY3VsYXRlTW92ZVBlcmNlbnREZWx0YSh7XG4gICAgICAgICAgICBhbmNob3I6IGNjLnYyKDAsIHBlcmNlbnQpLFxuICAgICAgICAgICAgYXBwbHlUb0hvcml6b250YWw6IGZhbHNlLFxuICAgICAgICAgICAgYXBwbHlUb1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGltZUluU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydEF1dG9TY3JvbGwobW92ZURlbHRhLCB0aW1lSW5TZWNvbmQsIGF0dGVudWF0ZWQgIT09IGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21vdmVDb250ZW50KG1vdmVEZWx0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiAgU3RvcCBhdXRvIHNjcm9sbCBpbW1lZGlhdGVseVxuICAgICAqICEjemggIOWBnOatouiHquWKqOa7muWKqCwg6LCD55So5q2kIEFQSSDlj6/ku6XorqkgU2Nyb2xsdmlldyDnq4vljbPlgZzmraLmu5rliqhcbiAgICAgKiBAbWV0aG9kIHN0b3BBdXRvU2Nyb2xsXG4gICAgICovXG4gICAgc3RvcEF1dG9TY3JvbGwgKCkge1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxBY2N1bXVsYXRlZFRpbWUgPSB0aGlzLl9hdXRvU2Nyb2xsVG90YWxUaW1lO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIE1vZGlmeSB0aGUgY29udGVudCBwb3NpdGlvbi5cbiAgICAgKiAhI3poIOiuvue9ruW9k+WJjeinhuWbvuWGheWuueeahOWdkOagh+eCueOAglxuICAgICAqIEBtZXRob2Qgc2V0Q29udGVudFBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtWZWMyfSBwb3NpdGlvbiAtIFRoZSBwb3NpdGlvbiBpbiBjb250ZW50J3MgcGFyZW50IHNwYWNlLlxuICAgICAqL1xuICAgIHNldENvbnRlbnRQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHBvc2l0aW9uLmZ1enp5RXF1YWxzKHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCksIEVQU0lMT04pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRlbnQuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICB0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFF1ZXJ5IHRoZSBjb250ZW50J3MgcG9zaXRpb24gaW4gaXRzIHBhcmVudCBzcGFjZS5cbiAgICAgKiAhI3poIOiOt+WPluW9k+WJjeinhuWbvuWGheWuueeahOWdkOagh+eCueOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29udGVudFBvc2l0aW9uXG4gICAgICogQHJldHVybnMge1ZlYzJ9IC0gVGhlIGNvbnRlbnQncyBwb3NpdGlvbiBpbiBpdHMgcGFyZW50IHNwYWNlLlxuICAgICAqL1xuICAgIGdldENvbnRlbnRQb3NpdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRlbnQuZ2V0UG9zaXRpb24oKTtcbiAgICB9LFxuICAgIFxuICAgIC8qKlxuICAgICAqICEjZW4gUXVlcnkgd2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgZHJhZ2dpbmcgdGhlIFNjcm9sbFZpZXcgdG8gc2Nyb2xsIGl0XG4gICAgICogISN6aCDnlKjmiLfmmK/lkKblnKjmi5bmi73lvZPliY3mu5rliqjop4blm75cbiAgICAgKiBAbWV0aG9kIGlzU2Nyb2xsaW5nXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IC0gV2hldGhlciB0aGUgdXNlciBpcyBjdXJyZW50bHkgZHJhZ2dpbmcgdGhlIFNjcm9sbFZpZXcgdG8gc2Nyb2xsIGl0XG4gICAgICovXG4gICAgaXNTY3JvbGxpbmcgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2Nyb2xsaW5nO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFF1ZXJ5IHdoZXRoZXIgdGhlIFNjcm9sbFZpZXcgaXMgY3VycmVudGx5IHNjcm9sbGluZyBiZWNhdXNlIG9mIGEgYm91bmNlYmFjayBvciBpbmVydGlhIHNsb3dkb3duLlxuICAgICAqICEjemgg5b2T5YmN5rua5Yqo6KeG5Zu+5piv5ZCm5Zyo5oOv5oCn5rua5YqoXG4gICAgICogQG1ldGhvZCBpc0F1dG9TY3JvbGxpbmdcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBXaGV0aGVyIHRoZSBTY3JvbGxWaWV3IGlzIGN1cnJlbnRseSBzY3JvbGxpbmcgYmVjYXVzZSBvZiBhIGJvdW5jZWJhY2sgb3IgaW5lcnRpYSBzbG93ZG93bi5cbiAgICAgKi9cbiAgICBpc0F1dG9TY3JvbGxpbmcgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b1Njcm9sbGluZztcbiAgICB9LFxuICAgIFxuICAgIC8vcHJpdmF0ZSBtZXRob2RzXG4gICAgX3JlZ2lzdGVyRXZlbnQgKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMuX29uVG91Y2hCZWdhbiwgdGhpcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZWQsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLl9vblRvdWNoRW5kZWQsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCB0aGlzLl9vblRvdWNoQ2FuY2VsbGVkLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1dIRUVMLCB0aGlzLl9vbk1vdXNlV2hlZWwsIHRoaXMsIHRydWUpO1xuICAgIH0sXG5cbiAgICBfdW5yZWdpc3RlckV2ZW50ICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5fb25Ub3VjaEJlZ2FuLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLl9vblRvdWNoTW92ZWQsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5fb25Ub3VjaEVuZGVkLCB0aGlzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIHRoaXMuX29uVG91Y2hDYW5jZWxsZWQsIHRoaXMsIHRydWUpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1dIRUVMLCB0aGlzLl9vbk1vdXNlV2hlZWwsIHRoaXMsIHRydWUpO1xuICAgIH0sXG5cbiAgICBfb25Nb3VzZVdoZWVsIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XG5cbiAgICAgICAgbGV0IGRlbHRhTW92ZSA9IGNjLnYyKDAsIDApO1xuICAgICAgICBsZXQgd2hlZWxQcmVjaXNpb24gPSAtMC4xO1xuICAgICAgICBpZihDQ19KU0IgfHwgQ0NfUlVOVElNRSkge1xuICAgICAgICAgICAgd2hlZWxQcmVjaXNpb24gPSAtNztcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBkZWx0YU1vdmUgPSBjYy52MigwLCBldmVudC5nZXRTY3JvbGxZKCkgKiB3aGVlbFByZWNpc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0aGlzLmhvcml6b250YWwpIHtcbiAgICAgICAgICAgIGRlbHRhTW92ZSA9IGNjLnYyKGV2ZW50LmdldFNjcm9sbFkoKSAqIHdoZWVsUHJlY2lzaW9uLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX21vdXNlV2hlZWxFdmVudEVsYXBzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0RlbHRhTW92ZShkZWx0YU1vdmUpO1xuXG4gICAgICAgIGlmKCF0aGlzLl9zdG9wTW91c2VXaGVlbCkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlUHJlc3NMb2dpYygpO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLl9jaGVja01vdXNlV2hlZWwsIDEuMCAvIDYwKTtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3VzZVdoZWVsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XG4gICAgfSxcblxuICAgIF9jaGVja01vdXNlV2hlZWwgKGR0KSB7XG4gICAgICAgIGxldCBjdXJyZW50T3V0T2ZCb3VuZGFyeSA9IHRoaXMuX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5KCk7XG4gICAgICAgIGxldCBtYXhFbGFwc2VkVGltZSA9IDAuMTtcblxuICAgICAgICBpZiAoIWN1cnJlbnRPdXRPZkJvdW5kYXJ5LmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0luZXJ0aWFTY3JvbGwoKTtcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9jaGVja01vdXNlV2hlZWwpO1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsLWVuZGVkJyk7XG4gICAgICAgICAgICB0aGlzLl9zdG9wTW91c2VXaGVlbCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2ZW50RWxhcHNlZFRpbWUgKz0gZHQ7XG5cbiAgICAgICAgLy8gbW91c2Ugd2hlZWwgZXZlbnQgaXMgZW5kZWRcbiAgICAgICAgaWYgKHRoaXMuX21vdXNlV2hlZWxFdmVudEVsYXBzZWRUaW1lID4gbWF4RWxhcHNlZFRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX29uU2Nyb2xsQmFyVG91Y2hFbmRlZCgpO1xuICAgICAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMuX2NoZWNrTW91c2VXaGVlbCk7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0b3BNb3VzZVdoZWVsID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2NhbGN1bGF0ZU1vdmVQZXJjZW50RGVsdGEgKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBsZXQgYXBwbHlUb0hvcml6b250YWwgPSBvcHRpb25zLmFwcGx5VG9Ib3Jpem9udGFsO1xuICAgICAgICBsZXQgYXBwbHlUb1ZlcnRpY2FsID0gb3B0aW9ucy5hcHBseVRvVmVydGljYWw7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5KCk7XG5cbiAgICAgICAgYW5jaG9yID0gYW5jaG9yLmNsYW1wZihjYy52MigwLCAwKSwgY2MudjIoMSwgMSkpO1xuXG4gICAgICAgIGxldCBzY3JvbGxTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgbGV0IGJvdHRvbURldGEgPSB0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSAtIHRoaXMuX2JvdHRvbUJvdW5kYXJ5O1xuICAgICAgICBib3R0b21EZXRhID0gLWJvdHRvbURldGE7XG5cbiAgICAgICAgbGV0IGxlZnREZXRhID0gdGhpcy5fZ2V0Q29udGVudExlZnRCb3VuZGFyeSgpIC0gdGhpcy5fbGVmdEJvdW5kYXJ5O1xuICAgICAgICBsZWZ0RGV0YSA9IC1sZWZ0RGV0YTtcblxuICAgICAgICBsZXQgbW92ZURlbHRhID0gY2MudjIoMCwgMCk7XG4gICAgICAgIGxldCB0b3RhbFNjcm9sbERlbHRhID0gMDtcbiAgICAgICAgaWYgKGFwcGx5VG9Ib3Jpem9udGFsKSB7XG4gICAgICAgICAgICB0b3RhbFNjcm9sbERlbHRhID0gY29udGVudFNpemUud2lkdGggLSBzY3JvbGxTaXplLndpZHRoO1xuICAgICAgICAgICAgbW92ZURlbHRhLnggPSBsZWZ0RGV0YSAtIHRvdGFsU2Nyb2xsRGVsdGEgKiBhbmNob3IueDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcHBseVRvVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRvdGFsU2Nyb2xsRGVsdGEgPSBjb250ZW50U2l6ZS5oZWlnaHQgLSBzY3JvbGxTaXplLmhlaWdodDtcbiAgICAgICAgICAgIG1vdmVEZWx0YS55ID0gYm90dG9tRGV0YSAtIHRvdGFsU2Nyb2xsRGVsdGEgKiBhbmNob3IueTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3ZlRGVsdGE7XG4gICAgfSxcblxuICAgIF9tb3ZlQ29udGVudFRvVG9wTGVmdCAoc2Nyb2xsVmlld1NpemUpIHtcbiAgICAgICAgbGV0IGNvbnRlbnRTaXplID0gdGhpcy5jb250ZW50LmdldENvbnRlbnRTaXplKCk7XG5cbiAgICAgICAgbGV0IGJvdHRvbURldGEgPSB0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSAtIHRoaXMuX2JvdHRvbUJvdW5kYXJ5O1xuICAgICAgICBib3R0b21EZXRhID0gLWJvdHRvbURldGE7XG4gICAgICAgIGxldCBtb3ZlRGVsdGEgPSBjYy52MigwLCAwKTtcbiAgICAgICAgbGV0IHRvdGFsU2Nyb2xsRGVsdGEgPSAwO1xuXG4gICAgICAgIGxldCBsZWZ0RGV0YSA9IHRoaXMuX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkoKSAtIHRoaXMuX2xlZnRCb3VuZGFyeTtcbiAgICAgICAgbGVmdERldGEgPSAtbGVmdERldGE7XG5cbiAgICAgICAgaWYgKGNvbnRlbnRTaXplLmhlaWdodCA8IHNjcm9sbFZpZXdTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgdG90YWxTY3JvbGxEZWx0YSA9IGNvbnRlbnRTaXplLmhlaWdodCAtIHNjcm9sbFZpZXdTaXplLmhlaWdodDtcbiAgICAgICAgICAgIG1vdmVEZWx0YS55ID0gYm90dG9tRGV0YSAtIHRvdGFsU2Nyb2xsRGVsdGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGVudFNpemUud2lkdGggPCBzY3JvbGxWaWV3U2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgdG90YWxTY3JvbGxEZWx0YSA9IGNvbnRlbnRTaXplLndpZHRoIC0gc2Nyb2xsVmlld1NpemUud2lkdGg7XG4gICAgICAgICAgICBtb3ZlRGVsdGEueCA9IGxlZnREZXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlU2Nyb2xsQmFyU3RhdGUoKTtcbiAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQobW92ZURlbHRhKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0Q29udGVudE91dE9mQm91bmRhcnkoKTtcbiAgICB9LFxuXG4gICAgX2NhbGN1bGF0ZUJvdW5kYXJ5ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgLy9yZWZyZXNoIGNvbnRlbnQgc2l6ZVxuICAgICAgICAgICAgbGV0IGxheW91dCA9IHRoaXMuY29udGVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KTtcbiAgICAgICAgICAgIGlmKGxheW91dCAmJiBsYXlvdXQuZW5hYmxlZEluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xuXG4gICAgICAgICAgICBsZXQgYW5jaG9yWCA9IHZpZXdTaXplLndpZHRoICogdGhpcy5fdmlldy5hbmNob3JYO1xuICAgICAgICAgICAgbGV0IGFuY2hvclkgPSB2aWV3U2l6ZS5oZWlnaHQgKiB0aGlzLl92aWV3LmFuY2hvclk7XG5cbiAgICAgICAgICAgIHRoaXMuX2xlZnRCb3VuZGFyeSA9IC1hbmNob3JYO1xuICAgICAgICAgICAgdGhpcy5fYm90dG9tQm91bmRhcnkgPSAtYW5jaG9yWTtcblxuICAgICAgICAgICAgdGhpcy5fcmlnaHRCb3VuZGFyeSA9IHRoaXMuX2xlZnRCb3VuZGFyeSArIHZpZXdTaXplLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5fdG9wQm91bmRhcnkgPSB0aGlzLl9ib3R0b21Cb3VuZGFyeSArIHZpZXdTaXplLmhlaWdodDtcblxuICAgICAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnRUb1RvcExlZnQodmlld1NpemUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vdGhpcyBpcyBmb3IgbmVzdGVkIHNjcm9sbHZpZXdcbiAgICBfaGFzTmVzdGVkVmlld0dyb3VwIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xuICAgICAgICBpZiAoZXZlbnQuZXZlbnRQaGFzZSAhPT0gY2MuRXZlbnQuQ0FQVFVSSU5HX1BIQVNFKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIC8vY2FwdHVyZUxpc3RlbmVycyBhcmUgYXJyYW5nZWQgZnJvbSBjaGlsZCB0byBwYXJlbnRcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FwdHVyZUxpc3RlbmVycy5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBjYXB0dXJlTGlzdGVuZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmdldENvbXBvbmVudChjYy5WaWV3R3JvdXApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5nZXRDb21wb25lbnQoY2MuVmlld0dyb3VwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvL1RoaXMgaXMgZm9yIFNjcm9sbHZpZXcgYXMgY2hpbGRyZW4gb2YgYSBCdXR0b25cbiAgICBfc3RvcFByb3BhZ2F0aW9uSWZUYXJnZXRJc01lIChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZXZlbnRQaGFzZSA9PT0gY2MuRXZlbnQuQVRfVEFSR0VUICYmIGV2ZW50LnRhcmdldCA9PT0gdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB0b3VjaCBldmVudCBoYW5kbGVyXG4gICAgX29uVG91Y2hCZWdhbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWRJbkhpZXJhcmNoeSkgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5faGFzTmVzdGVkVmlld0dyb3VwKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSkgcmV0dXJuO1xuXG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xuICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVQcmVzc0xvZ2ljKHRvdWNoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90b3VjaE1vdmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XG4gICAgfSxcblxuICAgIF9vblRvdWNoTW92ZWQgKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuX2hhc05lc3RlZFZpZXdHcm91cChldmVudCwgY2FwdHVyZUxpc3RlbmVycykpIHJldHVybjtcblxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaDtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUxvZ2ljKHRvdWNoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEbyBub3QgcHJldmVudCB0b3VjaCBldmVudHMgaW4gaW5uZXIgbm9kZXNcbiAgICAgICAgaWYgKCF0aGlzLmNhbmNlbElubmVyRXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gdG91Y2guZ2V0TG9jYXRpb24oKS5zdWIodG91Y2guZ2V0U3RhcnRMb2NhdGlvbigpKTtcbiAgICAgICAgLy9GSVhNRTogdG91Y2ggbW92ZSBkZWx0YSBzaG91bGQgYmUgY2FsY3VsYXRlZCBieSBEUEkuXG4gICAgICAgIGlmIChkZWx0YU1vdmUubWFnKCkgPiA3KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RvdWNoTW92ZWQgJiYgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAvLyBTaW11bGF0ZSB0b3VjaCBjYW5jZWwgZm9yIHRhcmdldCBub2RlXG4gICAgICAgICAgICAgICAgbGV0IGNhbmNlbEV2ZW50ID0gbmV3IGNjLkV2ZW50LkV2ZW50VG91Y2goZXZlbnQuZ2V0VG91Y2hlcygpLCBldmVudC5idWJibGVzKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxFdmVudC50eXBlID0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMO1xuICAgICAgICAgICAgICAgIGNhbmNlbEV2ZW50LnRvdWNoID0gZXZlbnQudG91Y2g7XG4gICAgICAgICAgICAgICAgY2FuY2VsRXZlbnQuc2ltdWxhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGNhbmNlbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaE1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUoZXZlbnQpO1xuICAgIH0sXG5cbiAgICBfb25Ub3VjaEVuZGVkIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgndG91Y2gtdXAnKTtcblxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaDtcbiAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlUmVsZWFzZUxvZ2ljKHRvdWNoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdG91Y2hNb3ZlZCkge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdG9wUHJvcGFnYXRpb25JZlRhcmdldElzTWUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblRvdWNoQ2FuY2VsbGVkIChldmVudCwgY2FwdHVyZUxpc3RlbmVycykge1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XG5cbiAgICAgICAgLy8gRmlsdGUgdG91Y2ggY2FuY2VsIGV2ZW50IHNlbmQgZnJvbSBzZWxmXG4gICAgICAgIGlmICghZXZlbnQuc2ltdWxhdGUpIHtcbiAgICAgICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoO1xuICAgICAgICAgICAgaWYodGhpcy5jb250ZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVSZWxlYXNlTG9naWModG91Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XG4gICAgfSxcblxuICAgIF9wcm9jZXNzRGVsdGFNb3ZlIChkZWx0YU1vdmUpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ2hpbGRyZW4oZGVsdGFNb3ZlKTtcbiAgICAgICAgdGhpcy5fZ2F0aGVyVG91Y2hNb3ZlKGRlbHRhTW92ZSk7XG4gICAgfSxcblxuICAgIC8vIENvbnRhaW5zIG5vZGUgYW5nbGUgY2FsY3VsYXRpb25zXG4gICAgX2dldExvY2FsQXhpc0FsaWduRGVsdGEgKHRvdWNoKSB7XG4gICAgICAgIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaC5nZXRMb2NhdGlvbigpLCBfdGVtcFBvaW50KTtcbiAgICAgICAgdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoLmdldFByZXZpb3VzTG9jYXRpb24oKSwgX3RlbXBQcmV2UG9pbnQpO1xuICAgICAgICByZXR1cm4gX3RlbXBQb2ludC5zdWIoX3RlbXBQcmV2UG9pbnQpO1xuICAgIH0sXG5cbiAgICBfaGFuZGxlTW92ZUxvZ2ljICh0b3VjaCkge1xuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gdGhpcy5fZ2V0TG9jYWxBeGlzQWxpZ25EZWx0YSh0b3VjaCk7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NEZWx0YU1vdmUoZGVsdGFNb3ZlKTtcbiAgICB9LFxuXG4gICAgX3Njcm9sbENoaWxkcmVuIChkZWx0YU1vdmUpIHtcbiAgICAgICAgZGVsdGFNb3ZlID0gdGhpcy5fY2xhbXBEZWx0YShkZWx0YU1vdmUpO1xuXG4gICAgICAgIGxldCByZWFsTW92ZSA9IGRlbHRhTW92ZTtcbiAgICAgICAgbGV0IG91dE9mQm91bmRhcnk7XG4gICAgICAgIGlmICh0aGlzLmVsYXN0aWMpIHtcbiAgICAgICAgICAgIG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xuICAgICAgICAgICAgcmVhbE1vdmUueCAqPSAob3V0T2ZCb3VuZGFyeS54ID09PSAwID8gMSA6IDAuNSk7XG4gICAgICAgICAgICByZWFsTW92ZS55ICo9IChvdXRPZkJvdW5kYXJ5LnkgPT09IDAgPyAxIDogMC41KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5lbGFzdGljKSB7XG4gICAgICAgICAgICBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkocmVhbE1vdmUpO1xuICAgICAgICAgICAgcmVhbE1vdmUgPSByZWFsTW92ZS5hZGQob3V0T2ZCb3VuZGFyeSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2Nyb2xsRXZlbnRUeXBlID0gLTE7XG5cbiAgICAgICAgaWYgKHJlYWxNb3ZlLnkgPiAwKSB7IC8vdXBcbiAgICAgICAgICAgIGxldCBpY0JvdHRvbVBvcyA9IHRoaXMuY29udGVudC55IC0gdGhpcy5jb250ZW50LmFuY2hvclkgKiB0aGlzLmNvbnRlbnQuaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoaWNCb3R0b21Qb3MgKyByZWFsTW92ZS55ID49IHRoaXMuX2JvdHRvbUJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRUeXBlID0gJ3Njcm9sbC10by1ib3R0b20nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlYWxNb3ZlLnkgPCAwKSB7IC8vZG93blxuICAgICAgICAgICAgbGV0IGljVG9wUG9zID0gdGhpcy5jb250ZW50LnkgLSB0aGlzLmNvbnRlbnQuYW5jaG9yWSAqIHRoaXMuY29udGVudC5oZWlnaHQgKyB0aGlzLmNvbnRlbnQuaGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoaWNUb3BQb3MgKyByZWFsTW92ZS55IDw9IHRoaXMuX3RvcEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRUeXBlID0gJ3Njcm9sbC10by10b3AnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZWFsTW92ZS54IDwgMCkgeyAvL2xlZnRcbiAgICAgICAgICAgIGxldCBpY1JpZ2h0UG9zID0gdGhpcy5jb250ZW50LnggLSB0aGlzLmNvbnRlbnQuYW5jaG9yWCAqIHRoaXMuY29udGVudC53aWR0aCArIHRoaXMuY29udGVudC53aWR0aDtcbiAgICAgICAgICAgIGlmIChpY1JpZ2h0UG9zICsgcmVhbE1vdmUueCA8PSB0aGlzLl9yaWdodEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRXZlbnRUeXBlID0gJ3Njcm9sbC10by1yaWdodCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVhbE1vdmUueCA+IDApIHsgLy9yaWdodFxuICAgICAgICAgICAgbGV0IGljTGVmdFBvcyA9IHRoaXMuY29udGVudC54IC0gdGhpcy5jb250ZW50LmFuY2hvclggKiB0aGlzLmNvbnRlbnQud2lkdGg7XG4gICAgICAgICAgICBpZiAoaWNMZWZ0UG9zICsgcmVhbE1vdmUueCA+PSB0aGlzLl9sZWZ0Qm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxFdmVudFR5cGUgPSAnc2Nyb2xsLXRvLWxlZnQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbW92ZUNvbnRlbnQocmVhbE1vdmUsIGZhbHNlKTtcblxuICAgICAgICBpZiAocmVhbE1vdmUueCAhPT0gMCB8fCByZWFsTW92ZS55ICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Njcm9sbGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2Nyb2xsLWJlZ2FuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGxpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY3JvbGxFdmVudFR5cGUgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KHNjcm9sbEV2ZW50VHlwZSk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBfaGFuZGxlUHJlc3NMb2dpYyAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzQm91bmNpbmcgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl90b3VjaE1vdmVQcmV2aW91c1RpbWVzdGFtcCA9IGdldFRpbWVJbk1pbGxpc2Vjb25kcygpO1xuICAgICAgICB0aGlzLl90b3VjaE1vdmVEaXNwbGFjZW1lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZVRpbWVEZWx0YXMubGVuZ3RoID0gMDtcblxuICAgICAgICB0aGlzLl9vblNjcm9sbEJhclRvdWNoQmVnYW4oKTtcbiAgICB9LFxuXG4gICAgX2NsYW1wRGVsdGEgKGRlbHRhKSB7XG4gICAgICAgIGxldCBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBsZXQgc2Nyb2xsVmlld1NpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGlmIChjb250ZW50U2l6ZS53aWR0aCA8IHNjcm9sbFZpZXdTaXplLndpZHRoKSB7XG4gICAgICAgICAgICBkZWx0YS54ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGVudFNpemUuaGVpZ2h0IDwgc2Nyb2xsVmlld1NpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICBkZWx0YS55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9LFxuXG4gICAgX2dhdGhlclRvdWNoTW92ZSAoZGVsdGEpIHtcbiAgICAgICAgZGVsdGEgPSB0aGlzLl9jbGFtcERlbHRhKGRlbHRhKTtcblxuICAgICAgICB3aGlsZSAodGhpcy5fdG91Y2hNb3ZlRGlzcGxhY2VtZW50cy5sZW5ndGggPj0gTlVNQkVSX09GX0dBVEhFUkVEX1RPVUNIRVNfRk9SX01PVkVfU1BFRUQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZVRpbWVEZWx0YXMuc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RvdWNoTW92ZURpc3BsYWNlbWVudHMucHVzaChkZWx0YSk7XG5cbiAgICAgICAgbGV0IHRpbWVTdGFtcCA9IGdldFRpbWVJbk1pbGxpc2Vjb25kcygpO1xuICAgICAgICB0aGlzLl90b3VjaE1vdmVUaW1lRGVsdGFzLnB1c2goKHRpbWVTdGFtcCAtIHRoaXMuX3RvdWNoTW92ZVByZXZpb3VzVGltZXN0YW1wKSAvIDEwMDApO1xuICAgICAgICB0aGlzLl90b3VjaE1vdmVQcmV2aW91c1RpbWVzdGFtcCA9IHRpbWVTdGFtcDtcbiAgICB9LFxuXG4gICAgX3N0YXJ0Qm91bmNlQmFja0lmTmVlZGVkICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVsYXN0aWMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBib3VuY2VCYWNrQW1vdW50ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoKTtcbiAgICAgICAgYm91bmNlQmFja0Ftb3VudCA9IHRoaXMuX2NsYW1wRGVsdGEoYm91bmNlQmFja0Ftb3VudCk7XG5cbiAgICAgICAgaWYgKGJvdW5jZUJhY2tBbW91bnQuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYm91bmNlQmFja1RpbWUgPSBNYXRoLm1heCh0aGlzLmJvdW5jZUR1cmF0aW9uLCAwKTtcbiAgICAgICAgdGhpcy5fc3RhcnRBdXRvU2Nyb2xsKGJvdW5jZUJhY2tBbW91bnQsIGJvdW5jZUJhY2tUaW1lLCB0cnVlKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2lzQm91bmNpbmcpIHtcbiAgICAgICAgICAgIGlmIChib3VuY2VCYWNrQW1vdW50LnkgPiAwKSB0aGlzLl9kaXNwYXRjaEV2ZW50KCdib3VuY2UtdG9wJyk7XG4gICAgICAgICAgICBpZiAoYm91bmNlQmFja0Ftb3VudC55IDwgMCkgdGhpcy5fZGlzcGF0Y2hFdmVudCgnYm91bmNlLWJvdHRvbScpO1xuICAgICAgICAgICAgaWYgKGJvdW5jZUJhY2tBbW91bnQueCA+IDApIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JvdW5jZS1yaWdodCcpO1xuICAgICAgICAgICAgaWYgKGJvdW5jZUJhY2tBbW91bnQueCA8IDApIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2JvdW5jZS1sZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLl9pc0JvdW5jaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBfcHJvY2Vzc0luZXJ0aWFTY3JvbGwgKCkge1xuICAgICAgICBsZXQgYm91bmNlQmFja1N0YXJ0ZWQgPSB0aGlzLl9zdGFydEJvdW5jZUJhY2tJZk5lZWRlZCgpO1xuICAgICAgICBpZiAoIWJvdW5jZUJhY2tTdGFydGVkICYmIHRoaXMuaW5lcnRpYSkge1xuICAgICAgICAgICAgbGV0IHRvdWNoTW92ZVZlbG9jaXR5ID0gdGhpcy5fY2FsY3VsYXRlVG91Y2hNb3ZlVmVsb2NpdHkoKTtcbiAgICAgICAgICAgIGlmICghdG91Y2hNb3ZlVmVsb2NpdHkuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pICYmIHRoaXMuYnJha2UgPCAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRJbmVydGlhU2Nyb2xsKHRvdWNoTW92ZVZlbG9jaXR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX29uU2Nyb2xsQmFyVG91Y2hFbmRlZCgpO1xuICAgIH0sXG5cbiAgICBfaGFuZGxlUmVsZWFzZUxvZ2ljICh0b3VjaCkge1xuICAgICAgICBsZXQgZGVsdGEgPSB0aGlzLl9nZXRMb2NhbEF4aXNBbGlnbkRlbHRhKHRvdWNoKTtcbiAgICAgICAgdGhpcy5fZ2F0aGVyVG91Y2hNb3ZlKGRlbHRhKTtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0luZXJ0aWFTY3JvbGwoKTtcbiAgICAgICAgaWYgKHRoaXMuX3Njcm9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2F1dG9TY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaXNPdXRPZkJvdW5kYXJ5ICgpIHtcbiAgICAgICAgbGV0IG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xuICAgICAgICByZXR1cm4gIW91dE9mQm91bmRhcnkuZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pO1xuICAgIH0sXG5cbiAgICBfaXNOZWNlc3NhcnlBdXRvU2Nyb2xsQnJha2UgKCkge1xuICAgICAgICBpZiAodGhpcy5fYXV0b1Njcm9sbEJyYWtpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2lzT3V0T2ZCb3VuZGFyeSgpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEN1cnJlbnRseU91dE9mQm91bmRhcnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxCcmFraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24gPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQ3VycmVudGx5T3V0T2ZCb3VuZGFyeSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBnZXRTY3JvbGxFbmRlZEV2ZW50VGltaW5nICgpIHtcbiAgICAgICAgcmV0dXJuIEVQU0lMT047XG4gICAgfSxcblxuICAgIF9wcm9jZXNzQXV0b1Njcm9sbGluZyAoZHQpIHtcbiAgICAgICAgbGV0IGlzQXV0b1Njcm9sbEJyYWtlID0gdGhpcy5faXNOZWNlc3NhcnlBdXRvU2Nyb2xsQnJha2UoKTtcbiAgICAgICAgbGV0IGJyYWtpbmdGYWN0b3IgPSBpc0F1dG9TY3JvbGxCcmFrZSA/IE9VVF9PRl9CT1VOREFSWV9CUkVBS0lOR19GQUNUT1IgOiAxO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQWNjdW11bGF0ZWRUaW1lICs9IGR0ICogKDEgLyBicmFraW5nRmFjdG9yKTtcblxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9IE1hdGgubWluKDEsIHRoaXMuX2F1dG9TY3JvbGxBY2N1bXVsYXRlZFRpbWUgLyB0aGlzLl9hdXRvU2Nyb2xsVG90YWxUaW1lKTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9TY3JvbGxBdHRlbnVhdGUpIHtcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSBxdWludEVhc2VPdXQocGVyY2VudGFnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSB0aGlzLl9hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbi5hZGQodGhpcy5fYXV0b1Njcm9sbFRhcmdldERlbHRhLm11bChwZXJjZW50YWdlKSk7XG4gICAgICAgIGxldCByZWFjaGVkRW5kID0gTWF0aC5hYnMocGVyY2VudGFnZSAtIDEpIDw9IEVQU0lMT047XG5cbiAgICAgICAgbGV0IGZpcmVFdmVudCA9IE1hdGguYWJzKHBlcmNlbnRhZ2UgLSAxKSA8PSB0aGlzLmdldFNjcm9sbEVuZGVkRXZlbnRUaW1pbmcoKTtcbiAgICAgICAgaWYgKGZpcmVFdmVudCAmJiAhdGhpcy5faXNTY3JvbGxFbmRlZFdpdGhUaHJlc2hvbGRFdmVudEZpcmVkKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQtd2l0aC10aHJlc2hvbGQnKTtcbiAgICAgICAgICAgIHRoaXMuX2lzU2Nyb2xsRW5kZWRXaXRoVGhyZXNob2xkRXZlbnRGaXJlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5lbGFzdGljKSB7XG4gICAgICAgICAgICBsZXQgYnJha2VPZmZzZXRQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uLnN1Yih0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKGlzQXV0b1Njcm9sbEJyYWtlKSB7XG4gICAgICAgICAgICAgICAgYnJha2VPZmZzZXRQb3NpdGlvbiA9IGJyYWtlT2Zmc2V0UG9zaXRpb24ubXVsKGJyYWtpbmdGYWN0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZ1N0YXJ0UG9zaXRpb24uYWRkKGJyYWtlT2Zmc2V0UG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IG1vdmVEZWx0YSA9IG5ld1Bvc2l0aW9uLnN1Yih0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIGxldCBvdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkobW92ZURlbHRhKTtcbiAgICAgICAgICAgIGlmICghb3V0T2ZCb3VuZGFyeS5mdXp6eUVxdWFscyhjYy52MigwLCAwKSwgRVBTSUxPTikpIHtcbiAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IG5ld1Bvc2l0aW9uLmFkZChvdXRPZkJvdW5kYXJ5KTtcbiAgICAgICAgICAgICAgICByZWFjaGVkRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWFjaGVkRW5kKSB7XG4gICAgICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGVsdGFNb3ZlID0gbmV3UG9zaXRpb24uc3ViKHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCkpO1xuICAgICAgICB0aGlzLl9tb3ZlQ29udGVudCh0aGlzLl9jbGFtcERlbHRhKGRlbHRhTW92ZSksIHJlYWNoZWRFbmQpO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGxpbmcnKTtcblxuICAgICAgICAvLyBzY29sbFRvIEFQSSBjb250cm9sbCBtb3ZlXG4gICAgICAgIGlmICghdGhpcy5fYXV0b1Njcm9sbGluZykge1xuICAgICAgICAgICAgdGhpcy5faXNCb3VuY2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzY3JvbGwtZW5kZWQnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfc3RhcnRJbmVydGlhU2Nyb2xsICh0b3VjaE1vdmVWZWxvY2l0eSkge1xuICAgICAgICBsZXQgaW5lcnRpYVRvdGFsTW92ZW1lbnQgPSB0b3VjaE1vdmVWZWxvY2l0eS5tdWwoTU9WRU1FTlRfRkFDVE9SKTtcbiAgICAgICAgdGhpcy5fc3RhcnRBdHRlbnVhdGluZ0F1dG9TY3JvbGwoaW5lcnRpYVRvdGFsTW92ZW1lbnQsIHRvdWNoTW92ZVZlbG9jaXR5KTtcbiAgICB9LFxuXG4gICAgX2NhbGN1bGF0ZUF0dGVudWF0ZWRGYWN0b3IgKGRpc3RhbmNlKSB7XG4gICAgICAgIGlmICh0aGlzLmJyYWtlIDw9IDApe1xuICAgICAgICAgICAgcmV0dXJuICgxIC0gdGhpcy5icmFrZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2F0dGVudWF0ZSBmb3JtdWxhIGZyb206IGh0dHA6Ly9sZWFybm9wZW5nbC5jb20vIyFMaWdodGluZy9MaWdodC1jYXN0ZXJzXG4gICAgICAgIHJldHVybiAoMSAtIHRoaXMuYnJha2UpICogKDEgLyAoMSArIGRpc3RhbmNlICogMC4wMDAwMTQgKyBkaXN0YW5jZSAqIGRpc3RhbmNlICogMC4wMDAwMDAwMDgpKTtcbiAgICB9LFxuXG4gICAgX3N0YXJ0QXR0ZW51YXRpbmdBdXRvU2Nyb2xsIChkZWx0YU1vdmUsIGluaXRpYWxWZWxvY2l0eSkge1xuICAgICAgICBsZXQgdGltZSA9IHRoaXMuX2NhbGN1bGF0ZUF1dG9TY3JvbGxUaW1lQnlJbml0YWxTcGVlZChpbml0aWFsVmVsb2NpdHkubWFnKCkpO1xuXG5cbiAgICAgICAgbGV0IHRhcmdldERlbHRhID0gZGVsdGFNb3ZlLm5vcm1hbGl6ZSgpO1xuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgbGV0IHNjcm9sbHZpZXdTaXplID0gdGhpcy5fdmlldy5nZXRDb250ZW50U2l6ZSgpO1xuXG4gICAgICAgIGxldCB0b3RhbE1vdmVXaWR0aCA9IChjb250ZW50U2l6ZS53aWR0aCAtIHNjcm9sbHZpZXdTaXplLndpZHRoKTtcbiAgICAgICAgbGV0IHRvdGFsTW92ZUhlaWdodCA9IChjb250ZW50U2l6ZS5oZWlnaHQgLSBzY3JvbGx2aWV3U2l6ZS5oZWlnaHQpO1xuXG4gICAgICAgIGxldCBhdHRlbnVhdGVkRmFjdG9yWCA9IHRoaXMuX2NhbGN1bGF0ZUF0dGVudWF0ZWRGYWN0b3IodG90YWxNb3ZlV2lkdGgpO1xuICAgICAgICBsZXQgYXR0ZW51YXRlZEZhY3RvclkgPSB0aGlzLl9jYWxjdWxhdGVBdHRlbnVhdGVkRmFjdG9yKHRvdGFsTW92ZUhlaWdodCk7XG5cbiAgICAgICAgdGFyZ2V0RGVsdGEgPSBjYy52Mih0YXJnZXREZWx0YS54ICogdG90YWxNb3ZlV2lkdGggKiAoMSAtIHRoaXMuYnJha2UpICogYXR0ZW51YXRlZEZhY3RvclgsIHRhcmdldERlbHRhLnkgKiB0b3RhbE1vdmVIZWlnaHQgKiBhdHRlbnVhdGVkRmFjdG9yWSAqICgxIC0gdGhpcy5icmFrZSkpO1xuXG4gICAgICAgIGxldCBvcmlnaW5hbE1vdmVMZW5ndGggPSBkZWx0YU1vdmUubWFnKCk7XG4gICAgICAgIGxldCBmYWN0b3IgPSB0YXJnZXREZWx0YS5tYWcoKSAvIG9yaWdpbmFsTW92ZUxlbmd0aDtcbiAgICAgICAgdGFyZ2V0RGVsdGEgPSB0YXJnZXREZWx0YS5hZGQoZGVsdGFNb3ZlKTtcblxuICAgICAgICBpZiAodGhpcy5icmFrZSA+IDAgJiYgZmFjdG9yID4gNykge1xuICAgICAgICAgICAgZmFjdG9yID0gTWF0aC5zcXJ0KGZhY3Rvcik7XG4gICAgICAgICAgICB0YXJnZXREZWx0YSA9IGRlbHRhTW92ZS5tdWwoZmFjdG9yKS5hZGQoZGVsdGFNb3ZlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJyYWtlID4gMCAmJiBmYWN0b3IgPiAzKSB7XG4gICAgICAgICAgICBmYWN0b3IgPSAzO1xuICAgICAgICAgICAgdGltZSA9IHRpbWUgKiBmYWN0b3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5icmFrZSA9PT0gMCAmJiBmYWN0b3IgPiAxKSB7XG4gICAgICAgICAgICB0aW1lID0gdGltZSAqIGZhY3RvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3N0YXJ0QXV0b1Njcm9sbCh0YXJnZXREZWx0YSwgdGltZSwgdHJ1ZSk7XG4gICAgfSxcblxuICAgIF9jYWxjdWxhdGVBdXRvU2Nyb2xsVGltZUJ5SW5pdGFsU3BlZWQgKGluaXRhbFNwZWVkKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5zcXJ0KGluaXRhbFNwZWVkIC8gNSkpO1xuICAgIH0sXG5cbiAgICBfc3RhcnRBdXRvU2Nyb2xsIChkZWx0YU1vdmUsIHRpbWVJblNlY29uZCwgYXR0ZW51YXRlZCkge1xuICAgICAgICBsZXQgYWRqdXN0ZWREZWx0YU1vdmUgPSB0aGlzLl9mbGF0dGVuVmVjdG9yQnlEaXJlY3Rpb24oZGVsdGFNb3ZlKTtcblxuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbFRhcmdldERlbHRhID0gYWRqdXN0ZWREZWx0YU1vdmU7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxBdHRlbnVhdGUgPSBhdHRlbnVhdGVkO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsU3RhcnRQb3NpdGlvbiA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxUb3RhbFRpbWUgPSB0aW1lSW5TZWNvbmQ7XG4gICAgICAgIHRoaXMuX2F1dG9TY3JvbGxBY2N1bXVsYXRlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9hdXRvU2Nyb2xsQnJha2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1Njcm9sbEVuZGVkV2l0aFRocmVzaG9sZEV2ZW50RmlyZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYXV0b1Njcm9sbEJyYWtpbmdTdGFydFBvc2l0aW9uID0gY2MudjIoMCwgMCk7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRPdXRPZkJvdW5kYXJ5ID0gdGhpcy5fZ2V0SG93TXVjaE91dE9mQm91bmRhcnkoKTtcbiAgICAgICAgaWYgKCFjdXJyZW50T3V0T2ZCb3VuZGFyeS5mdXp6eUVxdWFscyhjYy52MigwLCAwKSwgRVBTSUxPTikpIHtcbiAgICAgICAgICAgIHRoaXMuX2F1dG9TY3JvbGxDdXJyZW50bHlPdXRPZkJvdW5kYXJ5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2FsY3VsYXRlVG91Y2hNb3ZlVmVsb2NpdHkgKCkge1xuICAgICAgICBsZXQgdG90YWxUaW1lID0gMDtcbiAgICAgICAgdG90YWxUaW1lID0gdGhpcy5fdG91Y2hNb3ZlVGltZURlbHRhcy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICB9LCB0b3RhbFRpbWUpO1xuXG4gICAgICAgIGlmICh0b3RhbFRpbWUgPD0gMCB8fCB0b3RhbFRpbWUgPj0gMC41KSB7XG4gICAgICAgICAgICByZXR1cm4gY2MudjIoMCwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG90YWxNb3ZlbWVudCA9IGNjLnYyKDAsIDApO1xuICAgICAgICB0b3RhbE1vdmVtZW50ID0gdGhpcy5fdG91Y2hNb3ZlRGlzcGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuYWRkKGIpO1xuICAgICAgICB9LCB0b3RhbE1vdmVtZW50KTtcblxuICAgICAgICByZXR1cm4gY2MudjIodG90YWxNb3ZlbWVudC54ICogKDEgLSB0aGlzLmJyYWtlKSAvIHRvdGFsVGltZSxcbiAgICAgICAgICAgICAgICAgICAgdG90YWxNb3ZlbWVudC55ICogKDEgLSB0aGlzLmJyYWtlKSAvIHRvdGFsVGltZSk7XG4gICAgfSxcblxuICAgIF9mbGF0dGVuVmVjdG9yQnlEaXJlY3Rpb24gKHZlY3Rvcikge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdmVjdG9yO1xuICAgICAgICByZXN1bHQueCA9IHRoaXMuaG9yaXpvbnRhbCA/IHJlc3VsdC54IDogMDtcbiAgICAgICAgcmVzdWx0LnkgPSB0aGlzLnZlcnRpY2FsID8gcmVzdWx0LnkgOiAwO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBfbW92ZUNvbnRlbnQgKGRlbHRhTW92ZSwgY2FuU3RhcnRCb3VuY2VCYWNrKSB7XG4gICAgICAgIGxldCBhZGp1c3RlZE1vdmUgPSB0aGlzLl9mbGF0dGVuVmVjdG9yQnlEaXJlY3Rpb24oZGVsdGFNb3ZlKTtcbiAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gdGhpcy5nZXRDb250ZW50UG9zaXRpb24oKS5hZGQoYWRqdXN0ZWRNb3ZlKTtcblxuICAgICAgICB0aGlzLnNldENvbnRlbnRQb3NpdGlvbihuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgbGV0IG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVTY3JvbGxCYXIob3V0T2ZCb3VuZGFyeSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWxhc3RpYyAmJiBjYW5TdGFydEJvdW5jZUJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0Qm91bmNlQmFja0lmTmVlZGVkKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkgKCkge1xuICAgICAgICBsZXQgY29udGVudFBvcyA9IHRoaXMuZ2V0Q29udGVudFBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiBjb250ZW50UG9zLnggLSB0aGlzLmNvbnRlbnQuZ2V0QW5jaG9yUG9pbnQoKS54ICogdGhpcy5jb250ZW50LmdldENvbnRlbnRTaXplKCkud2lkdGg7XG4gICAgfSxcblxuICAgIF9nZXRDb250ZW50UmlnaHRCb3VuZGFyeSAoKSB7XG4gICAgICAgIGxldCBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q29udGVudExlZnRCb3VuZGFyeSgpICsgY29udGVudFNpemUud2lkdGg7XG4gICAgfSxcblxuICAgIF9nZXRDb250ZW50VG9wQm91bmRhcnkgKCkge1xuICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLmNvbnRlbnQuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENvbnRlbnRCb3R0b21Cb3VuZGFyeSgpICsgY29udGVudFNpemUuaGVpZ2h0O1xuICAgIH0sXG5cbiAgICBfZ2V0Q29udGVudEJvdHRvbUJvdW5kYXJ5ICgpIHtcbiAgICAgICAgbGV0IGNvbnRlbnRQb3MgPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpO1xuICAgICAgICByZXR1cm4gY29udGVudFBvcy55IC0gdGhpcy5jb250ZW50LmdldEFuY2hvclBvaW50KCkueSAqIHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcbiAgICB9LFxuXG4gICAgX2dldEhvd011Y2hPdXRPZkJvdW5kYXJ5IChhZGRpdGlvbikge1xuICAgICAgICBhZGRpdGlvbiA9IGFkZGl0aW9uIHx8IGNjLnYyKDAsIDApO1xuICAgICAgICBpZiAoYWRkaXRpb24uZnV6enlFcXVhbHMoY2MudjIoMCwgMCksIEVQU0lMT04pICYmICF0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG91dE9mQm91bmRhcnlBbW91bnQgPSBjYy52MigwLCAwKTtcbiAgICAgICAgaWYgKHRoaXMuX2dldENvbnRlbnRMZWZ0Qm91bmRhcnkoKSArIGFkZGl0aW9uLnggPiB0aGlzLl9sZWZ0Qm91bmRhcnkpIHtcbiAgICAgICAgICAgIG91dE9mQm91bmRhcnlBbW91bnQueCA9IHRoaXMuX2xlZnRCb3VuZGFyeSAtICh0aGlzLl9nZXRDb250ZW50TGVmdEJvdW5kYXJ5KCkgKyBhZGRpdGlvbi54KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9nZXRDb250ZW50UmlnaHRCb3VuZGFyeSgpICsgYWRkaXRpb24ueCA8IHRoaXMuX3JpZ2h0Qm91bmRhcnkpIHtcbiAgICAgICAgICAgIG91dE9mQm91bmRhcnlBbW91bnQueCA9IHRoaXMuX3JpZ2h0Qm91bmRhcnkgLSAodGhpcy5fZ2V0Q29udGVudFJpZ2h0Qm91bmRhcnkoKSArIGFkZGl0aW9uLngpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2dldENvbnRlbnRUb3BCb3VuZGFyeSgpICsgYWRkaXRpb24ueSA8IHRoaXMuX3RvcEJvdW5kYXJ5KSB7XG4gICAgICAgICAgICBvdXRPZkJvdW5kYXJ5QW1vdW50LnkgPSB0aGlzLl90b3BCb3VuZGFyeSAtICh0aGlzLl9nZXRDb250ZW50VG9wQm91bmRhcnkoKSArIGFkZGl0aW9uLnkpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2dldENvbnRlbnRCb3R0b21Cb3VuZGFyeSgpICsgYWRkaXRpb24ueSA+IHRoaXMuX2JvdHRvbUJvdW5kYXJ5KSB7XG4gICAgICAgICAgICBvdXRPZkJvdW5kYXJ5QW1vdW50LnkgPSB0aGlzLl9ib3R0b21Cb3VuZGFyeSAtICh0aGlzLl9nZXRDb250ZW50Qm90dG9tQm91bmRhcnkoKSArIGFkZGl0aW9uLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFkZGl0aW9uLmZ1enp5RXF1YWxzKGNjLnYyKDAsIDApLCBFUFNJTE9OKSkge1xuICAgICAgICAgICAgdGhpcy5fb3V0T2ZCb3VuZGFyeUFtb3VudCA9IG91dE9mQm91bmRhcnlBbW91bnQ7XG4gICAgICAgICAgICB0aGlzLl9vdXRPZkJvdW5kYXJ5QW1vdW50RGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIG91dE9mQm91bmRhcnlBbW91bnQgPSB0aGlzLl9jbGFtcERlbHRhKG91dE9mQm91bmRhcnlBbW91bnQpO1xuXG4gICAgICAgIHJldHVybiBvdXRPZkJvdW5kYXJ5QW1vdW50O1xuICAgIH0sXG5cbiAgICBfdXBkYXRlU2Nyb2xsQmFyU3RhdGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjb250ZW50U2l6ZSA9IHRoaXMuY29udGVudC5nZXRDb250ZW50U2l6ZSgpO1xuICAgICAgICBsZXQgc2Nyb2xsVmlld1NpemUgPSB0aGlzLl92aWV3LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudFNpemUuaGVpZ2h0IDwgc2Nyb2xsVmlld1NpemUuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhci5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmVydGljYWxTY3JvbGxCYXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgaWYgKGNvbnRlbnRTaXplLndpZHRoIDwgc2Nyb2xsVmlld1NpemUud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWxTY3JvbGxCYXIuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvcml6b250YWxTY3JvbGxCYXIuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVTY3JvbGxCYXIgKG91dE9mQm91bmRhcnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLl9vblNjcm9sbChvdXRPZkJvdW5kYXJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLl9vblNjcm9sbChvdXRPZkJvdW5kYXJ5KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25TY3JvbGxCYXJUb3VjaEJlZ2FuICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLl9vblRvdWNoQmVnYW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLl9vblRvdWNoQmVnYW4oKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25TY3JvbGxCYXJUb3VjaEVuZGVkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsU2Nyb2xsQmFyLl9vblRvdWNoRW5kZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyKSB7XG4gICAgICAgICAgICB0aGlzLnZlcnRpY2FsU2Nyb2xsQmFyLl9vblRvdWNoRW5kZWQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnc2Nyb2xsLWVuZGVkJykge1xuICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRFbWl0TWFzayA9IDA7XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3Njcm9sbC10by10b3AnXG4gICAgICAgICAgICAgICAgICAgfHwgZXZlbnQgPT09ICdzY3JvbGwtdG8tYm90dG9tJ1xuICAgICAgICAgICAgICAgICAgIHx8IGV2ZW50ID09PSAnc2Nyb2xsLXRvLWxlZnQnXG4gICAgICAgICAgICAgICAgICAgfHwgZXZlbnQgPT09ICdzY3JvbGwtdG8tcmlnaHQnKSB7XG5cbiAgICAgICAgICAgIGxldCBmbGFnID0gKDEgPDwgZXZlbnRNYXBbZXZlbnRdKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zY3JvbGxFdmVudEVtaXRNYXNrICYgZmxhZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsRXZlbnRFbWl0TWFzayB8PSBmbGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlci5lbWl0RXZlbnRzKHRoaXMuc2Nyb2xsRXZlbnRzLCB0aGlzLCBldmVudE1hcFtldmVudF0pO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdChldmVudCwgdGhpcyk7XG4gICAgfSxcblxuICAgIF9hZGp1c3RDb250ZW50T3V0T2ZCb3VuZGFyeSAoKSB7XG4gICAgICAgIHRoaXMuX291dE9mQm91bmRhcnlBbW91bnREaXJ0eSA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLl9pc091dE9mQm91bmRhcnkoKSkge1xuICAgICAgICAgICAgbGV0IG91dE9mQm91bmRhcnkgPSB0aGlzLl9nZXRIb3dNdWNoT3V0T2ZCb3VuZGFyeShjYy52MigwLCAwKSk7XG4gICAgICAgICAgICBsZXQgbmV3UG9zaXRpb24gPSB0aGlzLmdldENvbnRlbnRQb3NpdGlvbigpLmFkZChvdXRPZkJvdW5kYXJ5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQuc2V0UG9zaXRpb24obmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhcigwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5KCk7XG4gICAgICAgIC8vQmVjYXVzZSB3aWRnZXQgY29tcG9uZW50IHdpbGwgYWRqdXN0IGNvbnRlbnQgcG9zaXRpb24gYW5kIHNjcm9sbHZpZXcgcG9zaXRpb24gaXMgY29ycmVjdCBhZnRlciB2aXNpdFxuICAgICAgICAvL1NvIHRoaXMgZXZlbnQgY291bGQgbWFrZSBzdXJlIHRoZSBjb250ZW50IGlzIG9uIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGFmdGVyIGxvYWRpbmcuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLm9uY2UoY2MuRGlyZWN0b3IuRVZFTlRfQkVGT1JFX0RSQVcsIHRoaXMuX2FkanVzdENvbnRlbnRPdXRPZkJvdW5kYXJ5LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfaGlkZVNjcm9sbGJhciAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWxTY3JvbGxCYXIpIHtcbiAgICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbFNjcm9sbEJhci5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbFNjcm9sbEJhcikge1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbFNjcm9sbEJhci5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EaXNhYmxlICgpIHtcbiAgICAgICAgaWYgKCFDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3VucmVnaXN0ZXJFdmVudCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5vZmYoTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudC5vZmYoTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlldykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9mZihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9mZihOb2RlRXZlbnQuU0NBTEVfQ0hBTkdFRCwgdGhpcy5fY2FsY3VsYXRlQm91bmRhcnksIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9mZihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2hpZGVTY3JvbGxiYXIoKTtcbiAgICAgICAgdGhpcy5zdG9wQXV0b1Njcm9sbCgpO1xuICAgIH0sXG5cbiAgICBvbkVuYWJsZSAoKSB7XG4gICAgICAgIGlmICghQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckV2ZW50KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Lm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnQub24oTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdmlldykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3Lm9uKE5vZGVFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcub24oTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2NhbGN1bGF0ZUJvdW5kYXJ5LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlldy5vbihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9jYWxjdWxhdGVCb3VuZGFyeSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVNjcm9sbEJhclN0YXRlKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZSAoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9TY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NBdXRvU2Nyb2xsaW5nKGR0KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5TY3JvbGxWaWV3ID0gbW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxWaWV3O1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IHNjcm9sbC10by10b3BcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBzY3JvbGwtdG8tYm90dG9tXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgc2Nyb2xsLXRvLWxlZnRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBzY3JvbGwtdG8tcmlnaHRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBzY3JvbGxpbmdcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBOb3RlOiBUaGlzIGV2ZW50IGlzIGVtaXR0ZWQgZnJvbSB0aGUgbm9kZSB0byB3aGljaCB0aGUgY29tcG9uZW50IGJlbG9uZ3MuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraTkuovku7bmmK/ku47or6Xnu4Tku7bmiYDlsZ7nmoQgTm9kZSDkuIrpnaLmtL7lj5Hlh7rmnaXnmoTvvIzpnIDopoHnlKggbm9kZS5vbiDmnaXnm5HlkKzjgIJcbiAqIEBldmVudCBib3VuY2UtYm90dG9tXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgYm91bmNlLXRvcFxuICogQHBhcmFtIHtFdmVudC5FdmVudEN1c3RvbX0gZXZlbnRcbiAqIEBwYXJhbSB7U2Nyb2xsVmlld30gc2Nyb2xsVmlldyAtIFRoZSBTY3JvbGxWaWV3IGNvbXBvbmVudC5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgZW1pdHRlZCBmcm9tIHRoZSBub2RlIHRvIHdoaWNoIHRoZSBjb21wb25lbnQgYmVsb25ncy5cbiAqICEjemhcbiAqIOazqOaEj++8muatpOS6i+S7tuaYr+S7juivpee7hOS7tuaJgOWxnueahCBOb2RlIOS4iumdoua0vuWPkeWHuuadpeeahO+8jOmcgOimgeeUqCBub2RlLm9uIOadpeebkeWQrOOAglxuICogQGV2ZW50IGJvdW5jZS1sZWZ0XG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgYm91bmNlLXJpZ2h0XG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgc2Nyb2xsLWVuZGVkXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG5cbi8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgdG91Y2gtdXBcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKiBAcGFyYW0ge1Njcm9sbFZpZXd9IHNjcm9sbFZpZXcgLSBUaGUgU2Nyb2xsVmlldyBjb21wb25lbnQuXG4gKi9cblxuIC8qKlxuICogISNlblxuICogTm90ZTogVGhpcyBldmVudCBpcyBlbWl0dGVkIGZyb20gdGhlIG5vZGUgdG8gd2hpY2ggdGhlIGNvbXBvbmVudCBiZWxvbmdzLlxuICogISN6aFxuICog5rOo5oSP77ya5q2k5LqL5Lu25piv5LuO6K+l57uE5Lu25omA5bGe55qEIE5vZGUg5LiK6Z2i5rS+5Y+R5Ye65p2l55qE77yM6ZyA6KaB55SoIG5vZGUub24g5p2l55uR5ZCs44CCXG4gKiBAZXZlbnQgc2Nyb2xsLWJlZ2FuXG4gKiBAcGFyYW0ge0V2ZW50LkV2ZW50Q3VzdG9tfSBldmVudFxuICogQHBhcmFtIHtTY3JvbGxWaWV3fSBzY3JvbGxWaWV3IC0gVGhlIFNjcm9sbFZpZXcgY29tcG9uZW50LlxuICovXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==