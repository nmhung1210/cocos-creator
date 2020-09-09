
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCWidget.js';
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
var WidgetManager = require('../base-ui/CCWidgetManager');
/**
 * !#en Enum for Widget's alignment mode, indicating when the widget should refresh.
 * !#zh Widget 的对齐模式，表示 Widget 应该何时刷新。
 * @enum Widget.AlignMode
 */

/**
 * !#en
 * Only align once when the Widget is enabled for the first time.
 * This will allow the script or animation to continue controlling the current node.
 * It will only be aligned once before the end of frame when onEnable is called,
 * then immediately disables the Widget.
 * !#zh
 * 仅在 Widget 第一次激活时对齐一次，便于脚本或动画继续控制当前节点。
 * 开启后会在 onEnable 时所在的那一帧结束前对齐一次，然后立刻禁用该 Widget。
 * @property {Number} ONCE
 */

/**
 * !#en Align first from the beginning as ONCE, and then realign it every time the window is resized.
 * !#zh 一开始会像 ONCE 一样对齐一次，之后每当窗口大小改变时还会重新对齐。
 * @property {Number} ON_WINDOW_RESIZE
 */

/**
 * !#en Keep aligning all the way.
 * !#zh 始终保持对齐。
 * @property {Number} ALWAYS
 */


var AlignMode = WidgetManager.AlignMode;
var AlignFlags = WidgetManager._AlignFlags;
var TOP = AlignFlags.TOP;
var MID = AlignFlags.MID;
var BOT = AlignFlags.BOT;
var LEFT = AlignFlags.LEFT;
var CENTER = AlignFlags.CENTER;
var RIGHT = AlignFlags.RIGHT;
var TOP_BOT = TOP | BOT;
var LEFT_RIGHT = LEFT | RIGHT;
/**
 * !#en
 * Stores and manipulate the anchoring based on its parent.
 * Widget are used for GUI but can also be used for other things.
 * Widget will adjust current node's position and size automatically, but the results after adjustment can not be obtained until the next frame unless you call {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}} manually.
 * !#zh
 * Widget 组件，用于设置和适配其相对于父节点的边距，Widget 通常被用于 UI 界面，也可以用于其他地方。
 * Widget 会自动调整当前节点的坐标和宽高，不过目前调整后的结果要到下一帧才能在脚本里获取到，除非你先手动调用 {{#crossLink "Widget/updateAlignment:method"}}{{/crossLink}}。
 *
 * @class Widget
 * @extends Component
 */

var Widget = cc.Class({
  name: 'cc.Widget',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Widget',
    help: 'i18n:COMPONENT.help_url.widget',
    inspector: 'packages://inspector/inspectors/comps/ccwidget.js',
    executeInEditMode: true,
    disallowMultiple: true
  },
  properties: {
    /**
     * !#en Specifies an alignment target that can only be one of the parent nodes of the current node.
     * The default value is null, and when null, indicates the current parent.
     * !#zh 指定一个对齐目标，只能是当前节点的其中一个父节点，默认为空，为空时表示当前父节点。
     * @property {Node} target
     * @default null
     */
    target: {
      get: function get() {
        return this._target;
      },
      set: function set(value) {
        this._target = value;

        if (CC_EDITOR && !cc.engine._isPlaying && this.node._parent) {
          // adjust the offsets to keep the size and position unchanged after target chagned
          WidgetManager.updateOffsetsToStayPut(this);
        }
      },
      type: cc.Node,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.target'
    },
    // ENABLE ALIGN ?

    /**
     * !#en Whether to align the top.
     * !#zh 是否对齐上边。
     * @property isAlignTop
     * @type {Boolean}
     * @default false
     */
    isAlignTop: {
      get: function get() {
        return (this._alignFlags & TOP) > 0;
      },
      set: function set(value) {
        this._setAlign(TOP, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_top'
    },

    /**
     * !#en
     * Vertically aligns the midpoint, This will open the other vertical alignment options cancel.
     * !#zh
     * 是否垂直方向对齐中点，开启此项会将垂直方向其他对齐选项取消。
     * @property isAlignVerticalCenter
     * @type {Boolean}
     * @default false
     */
    isAlignVerticalCenter: {
      get: function get() {
        return (this._alignFlags & MID) > 0;
      },
      set: function set(value) {
        if (value) {
          this.isAlignTop = false;
          this.isAlignBottom = false;
          this._alignFlags |= MID;
        } else {
          this._alignFlags &= ~MID;
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_v_center'
    },

    /**
     * !#en Whether to align the bottom.
     * !#zh 是否对齐下边。
     * @property isAlignBottom
     * @type {Boolean}
     * @default false
     */
    isAlignBottom: {
      get: function get() {
        return (this._alignFlags & BOT) > 0;
      },
      set: function set(value) {
        this._setAlign(BOT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_bottom'
    },

    /**
     * !#en Whether to align the left.
     * !#zh 是否对齐左边
     * @property isAlignLeft
     * @type {Boolean}
     * @default false
     */
    isAlignLeft: {
      get: function get() {
        return (this._alignFlags & LEFT) > 0;
      },
      set: function set(value) {
        this._setAlign(LEFT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_left'
    },

    /**
     * !#en
     * Horizontal aligns the midpoint. This will open the other horizontal alignment options canceled.
     * !#zh
     * 是否水平方向对齐中点，开启此选项会将水平方向其他对齐选项取消。
     * @property isAlignHorizontalCenter
     * @type {Boolean}
     * @default false
     */
    isAlignHorizontalCenter: {
      get: function get() {
        return (this._alignFlags & CENTER) > 0;
      },
      set: function set(value) {
        if (value) {
          this.isAlignLeft = false;
          this.isAlignRight = false;
          this._alignFlags |= CENTER;
        } else {
          this._alignFlags &= ~CENTER;
        }
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_h_center'
    },

    /**
     * !#en Whether to align the right.
     * !#zh 是否对齐右边。
     * @property isAlignRight
     * @type {Boolean}
     * @default false
     */
    isAlignRight: {
      get: function get() {
        return (this._alignFlags & RIGHT) > 0;
      },
      set: function set(value) {
        this._setAlign(RIGHT, value);
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_right'
    },

    /**
     * !#en
     * Whether the stretched horizontally, when enable the left and right alignment will be stretched horizontally,
     * the width setting is invalid (read only).
     * !#zh
     * 当前是否水平拉伸。当同时启用左右对齐时，节点将会被水平拉伸，此时节点的宽度只读。
     * @property isStretchWidth
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    isStretchWidth: {
      get: function get() {
        return (this._alignFlags & LEFT_RIGHT) === LEFT_RIGHT;
      },
      visible: false
    },

    /**
     * !#en
     * Whether the stretched vertically, when enable the left and right alignment will be stretched vertically,
     * then height setting is invalid (read only)
     * !#zh
     * 当前是否垂直拉伸。当同时启用上下对齐时，节点将会被垂直拉伸，此时节点的高度只读。
     * @property isStretchHeight
     * @type {Boolean}
     * @default false
     * @readOnly
     */
    isStretchHeight: {
      get: function get() {
        return (this._alignFlags & TOP_BOT) === TOP_BOT;
      },
      visible: false
    },
    // ALIGN MARGINS

    /**
     * !#en
     * The margins between the top of this node and the top of parent node,
     * the value can be negative, Only available in 'isAlignTop' open.
     * !#zh
     * 本节点顶边和父节点顶边的距离，可填写负值，只有在 isAlignTop 开启时才有作用。
     * @property top
     * @type {Number}
     * @default 0
     */
    top: {
      get: function get() {
        return this._top;
      },
      set: function set(value) {
        this._top = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.top'
    },

    /**
     * !#en
     * The margins between the bottom of this node and the bottom of parent node,
     * the value can be negative, Only available in 'isAlignBottom' open.
     * !#zh
     * 本节点底边和父节点底边的距离，可填写负值，只有在 isAlignBottom 开启时才有作用。
     * @property bottom
     * @type {Number}
     * @default 0
     */
    bottom: {
      get: function get() {
        return this._bottom;
      },
      set: function set(value) {
        this._bottom = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.bottom'
    },

    /**
     * !#en
     * The margins between the left of this node and the left of parent node,
     * the value can be negative, Only available in 'isAlignLeft' open.
     * !#zh
     * 本节点左边和父节点左边的距离，可填写负值，只有在 isAlignLeft 开启时才有作用。
     * @property left
     * @type {Number}
     * @default 0
     */
    left: {
      get: function get() {
        return this._left;
      },
      set: function set(value) {
        this._left = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.left'
    },

    /**
     * !#en
     * The margins between the right of this node and the right of parent node,
     * the value can be negative, Only available in 'isAlignRight' open.
     * !#zh
     * 本节点右边和父节点右边的距离，可填写负值，只有在 isAlignRight 开启时才有作用。
     * @property right
     * @type {Number}
     * @default 0
     */
    right: {
      get: function get() {
        return this._right;
      },
      set: function set(value) {
        this._right = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.right'
    },

    /**
     * !#en
     * Horizontal aligns the midpoint offset value,
     * the value can be negative, Only available in 'isAlignHorizontalCenter' open.
     * !#zh 水平居中的偏移值，可填写负值，只有在 isAlignHorizontalCenter 开启时才有作用。
     * @property horizontalCenter
     * @type {Number}
     * @default 0
     */
    horizontalCenter: {
      get: function get() {
        return this._horizontalCenter;
      },
      set: function set(value) {
        this._horizontalCenter = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.horizontal_center'
    },

    /**
     * !#en
     * Vertical aligns the midpoint offset value,
     * the value can be negative, Only available in 'isAlignVerticalCenter' open.
     * !#zh 垂直居中的偏移值，可填写负值，只有在 isAlignVerticalCenter 开启时才有作用。
     * @property verticalCenter
     * @type {Number}
     * @default 0
     */
    verticalCenter: {
      get: function get() {
        return this._verticalCenter;
      },
      set: function set(value) {
        this._verticalCenter = value;
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.vertical_center'
    },
    // PARCENTAGE OR ABSOLUTE

    /**
     * !#en If true, horizontalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
     * !#zh 如果为 true，"horizontalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
     * @property isAbsoluteHorizontalCenter
     * @type {Boolean}
     * @default true
     */
    isAbsoluteHorizontalCenter: {
      get: function get() {
        return this._isAbsHorizontalCenter;
      },
      set: function set(value) {
        this._isAbsHorizontalCenter = value;
      },
      animatable: false
    },

    /**
     * !#en If true, verticalCenter is pixel margin, otherwise is percentage (0 - 1) margin.
     * !#zh 如果为 true，"verticalCenter" 将会以像素作为偏移值，反之为百分比（0 到 1）。
     * @property isAbsoluteVerticalCenter
     * @type {Boolean}
     * @default true
     */
    isAbsoluteVerticalCenter: {
      get: function get() {
        return this._isAbsVerticalCenter;
      },
      set: function set(value) {
        this._isAbsVerticalCenter = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, top is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
     * !#zh
     * 如果为 true，"top" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
     * @property isAbsoluteTop
     * @type {Boolean}
     * @default true
     */
    isAbsoluteTop: {
      get: function get() {
        return this._isAbsTop;
      },
      set: function set(value) {
        this._isAbsTop = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, bottom is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's height.
     * !#zh
     * 如果为 true，"bottom" 将会以像素作为边距，否则将会以相对父物体高度的百分比（0 到 1）作为边距。
     * @property isAbsoluteBottom
     * @type {Boolean}
     * @default true
     */
    isAbsoluteBottom: {
      get: function get() {
        return this._isAbsBottom;
      },
      set: function set(value) {
        this._isAbsBottom = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, left is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
     * !#zh
     * 如果为 true，"left" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
     * @property isAbsoluteLeft
     * @type {Boolean}
     * @default true
     */
    isAbsoluteLeft: {
      get: function get() {
        return this._isAbsLeft;
      },
      set: function set(value) {
        this._isAbsLeft = value;
      },
      animatable: false
    },

    /**
     * !#en
     * If true, right is pixel margin, otherwise is percentage (0 - 1) margin relative to the parent's width.
     * !#zh
     * 如果为 true，"right" 将会以像素作为边距，否则将会以相对父物体宽度的百分比（0 到 1）作为边距。
     * @property isAbsoluteRight
     * @type {Boolean}
     * @default true
     */
    isAbsoluteRight: {
      get: function get() {
        return this._isAbsRight;
      },
      set: function set(value) {
        this._isAbsRight = value;
      },
      animatable: false
    },

    /**
     * !#en Specifies the alignment mode of the Widget, which determines when the widget should refresh.
     * !#zh 指定 Widget 的对齐模式，用于决定 Widget 应该何时刷新。
     * @property {Widget.AlignMode} alignMode
     * @example
     * widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
     */
    alignMode: {
      "default": AlignMode.ON_WINDOW_RESIZE,
      type: AlignMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.widget.align_mode'
    },
    //
    _wasAlignOnce: {
      "default": undefined,
      formerlySerializedAs: 'isAlignOnce'
    },
    _target: null,

    /**
     * !#zh: 对齐开关，由 AlignFlags 组成
     *
     * @property _alignFlags
     * @type {Number}
     * @default 0
     * @private
     */
    _alignFlags: 0,
    _left: 0,
    _right: 0,
    _top: 0,
    _bottom: 0,
    _verticalCenter: 0,
    _horizontalCenter: 0,
    _isAbsLeft: true,
    _isAbsRight: true,
    _isAbsTop: true,
    _isAbsBottom: true,
    _isAbsHorizontalCenter: true,
    _isAbsVerticalCenter: true,
    // original size before align
    _originalWidth: 0,
    _originalHeight: 0
  },
  statics: {
    AlignMode: AlignMode
  },
  onLoad: function onLoad() {
    if (this._wasAlignOnce !== undefined) {
      // migrate for old version
      this.alignMode = this._wasAlignOnce ? AlignMode.ONCE : AlignMode.ALWAYS;
      this._wasAlignOnce = undefined;
    }
  },
  onEnable: function onEnable() {
    WidgetManager.add(this);
  },
  onDisable: function onDisable() {
    WidgetManager.remove(this);
  },
  _validateTargetInDEV: CC_DEV && function () {
    var target = this._target;

    if (target) {
      var isParent = this.node !== target && this.node.isChildOf(target);

      if (!isParent) {
        cc.errorID(6500);
        this._target = null;
      }
    }
  },
  _setAlign: function _setAlign(flag, isAlign) {
    var current = (this._alignFlags & flag) > 0;

    if (isAlign === current) {
      return;
    }

    var isHorizontal = (flag & LEFT_RIGHT) > 0;

    if (isAlign) {
      this._alignFlags |= flag;

      if (isHorizontal) {
        this.isAlignHorizontalCenter = false;

        if (this.isStretchWidth) {
          // become stretch
          this._originalWidth = this.node.width; // test check conflict

          if (CC_EDITOR && !cc.engine.isPlaying) {
            _Scene.DetectConflict.checkConflict_Widget(this);
          }
        }
      } else {
        this.isAlignVerticalCenter = false;

        if (this.isStretchHeight) {
          // become stretch
          this._originalHeight = this.node.height; // test check conflict

          if (CC_EDITOR && !cc.engine.isPlaying) {
            _Scene.DetectConflict.checkConflict_Widget(this);
          }
        }
      }

      if (CC_EDITOR && !cc.engine._isPlaying && this.node._parent) {
        // adjust the offsets to keep the size and position unchanged after alignment chagned
        WidgetManager.updateOffsetsToStayPut(this, flag);
      }
    } else {
      if (isHorizontal) {
        if (this.isStretchWidth) {
          // will cancel stretch
          this.node.width = this._originalWidth;
        }
      } else {
        if (this.isStretchHeight) {
          // will cancel stretch
          this.node.height = this._originalHeight;
        }
      }

      this._alignFlags &= ~flag;
    }
  },

  /**
   * !#en
   * Immediately perform the widget alignment. You need to manually call this method only if
   * you need to get the latest results after the alignment before the end of current frame.
   * !#zh
   * 立刻执行 widget 对齐操作。这个接口一般不需要手工调用。
   * 只有当你需要在当前帧结束前获得 widget 对齐后的最新结果时才需要手动调用这个方法。
   *
   * @method updateAlignment
   *
   * @example
   * widget.top = 10;       // change top margin
   * cc.log(widget.node.y); // not yet changed
   * widget.updateAlignment();
   * cc.log(widget.node.y); // changed
   */
  updateAlignment: function updateAlignment() {
    WidgetManager.updateAlignment(this.node);
  }
});
/**
 * !#en
 * When turned on, it will only be aligned once at the end of the onEnable frame,
 * then immediately disables the current component.
 * This will allow the script or animation to continue controlling the current node.
 * Note: It will still be aligned at the frame when onEnable is called.
 * !#zh
 * 开启后仅会在 onEnable 的当帧结束时对齐一次，然后立刻禁用当前组件。
 * 这样便于脚本或动画继续控制当前节点。
 * 注意：onEnable 时所在的那一帧仍然会进行对齐。
 * @property {Boolean} isAlignOnce
 * @default false
 * @deprecated
 */

Object.defineProperty(Widget.prototype, 'isAlignOnce', {
  get: function get() {
    if (CC_DEBUG) {
      cc.warn('`widget.isAlignOnce` is deprecated, use `widget.alignMode === cc.Widget.AlignMode.ONCE` instead please.');
    }

    return this.alignMode === AlignMode.ONCE;
  },
  set: function set(value) {
    if (CC_DEBUG) {
      cc.warn('`widget.isAlignOnce` is deprecated, use `widget.alignMode = cc.Widget.AlignMode.*` instead please.');
    }

    this.alignMode = value ? AlignMode.ONCE : AlignMode.ALWAYS;
  }
});
cc.Widget = module.exports = Widget;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NXaWRnZXQuanMiXSwibmFtZXMiOlsiV2lkZ2V0TWFuYWdlciIsInJlcXVpcmUiLCJBbGlnbk1vZGUiLCJBbGlnbkZsYWdzIiwiX0FsaWduRmxhZ3MiLCJUT1AiLCJNSUQiLCJCT1QiLCJMRUZUIiwiQ0VOVEVSIiwiUklHSFQiLCJUT1BfQk9UIiwiTEVGVF9SSUdIVCIsIldpZGdldCIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsImRpc2FsbG93TXVsdGlwbGUiLCJwcm9wZXJ0aWVzIiwidGFyZ2V0IiwiZ2V0IiwiX3RhcmdldCIsInNldCIsInZhbHVlIiwiZW5naW5lIiwiX2lzUGxheWluZyIsIm5vZGUiLCJfcGFyZW50IiwidXBkYXRlT2Zmc2V0c1RvU3RheVB1dCIsInR5cGUiLCJOb2RlIiwidG9vbHRpcCIsIkNDX0RFViIsImlzQWxpZ25Ub3AiLCJfYWxpZ25GbGFncyIsIl9zZXRBbGlnbiIsImFuaW1hdGFibGUiLCJpc0FsaWduVmVydGljYWxDZW50ZXIiLCJpc0FsaWduQm90dG9tIiwiaXNBbGlnbkxlZnQiLCJpc0FsaWduSG9yaXpvbnRhbENlbnRlciIsImlzQWxpZ25SaWdodCIsImlzU3RyZXRjaFdpZHRoIiwidmlzaWJsZSIsImlzU3RyZXRjaEhlaWdodCIsInRvcCIsIl90b3AiLCJib3R0b20iLCJfYm90dG9tIiwibGVmdCIsIl9sZWZ0IiwicmlnaHQiLCJfcmlnaHQiLCJob3Jpem9udGFsQ2VudGVyIiwiX2hvcml6b250YWxDZW50ZXIiLCJ2ZXJ0aWNhbENlbnRlciIsIl92ZXJ0aWNhbENlbnRlciIsImlzQWJzb2x1dGVIb3Jpem9udGFsQ2VudGVyIiwiX2lzQWJzSG9yaXpvbnRhbENlbnRlciIsImlzQWJzb2x1dGVWZXJ0aWNhbENlbnRlciIsIl9pc0Fic1ZlcnRpY2FsQ2VudGVyIiwiaXNBYnNvbHV0ZVRvcCIsIl9pc0Fic1RvcCIsImlzQWJzb2x1dGVCb3R0b20iLCJfaXNBYnNCb3R0b20iLCJpc0Fic29sdXRlTGVmdCIsIl9pc0Fic0xlZnQiLCJpc0Fic29sdXRlUmlnaHQiLCJfaXNBYnNSaWdodCIsImFsaWduTW9kZSIsIk9OX1dJTkRPV19SRVNJWkUiLCJfd2FzQWxpZ25PbmNlIiwidW5kZWZpbmVkIiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJfb3JpZ2luYWxXaWR0aCIsIl9vcmlnaW5hbEhlaWdodCIsInN0YXRpY3MiLCJvbkxvYWQiLCJPTkNFIiwiQUxXQVlTIiwib25FbmFibGUiLCJhZGQiLCJvbkRpc2FibGUiLCJyZW1vdmUiLCJfdmFsaWRhdGVUYXJnZXRJbkRFViIsImlzUGFyZW50IiwiaXNDaGlsZE9mIiwiZXJyb3JJRCIsImZsYWciLCJpc0FsaWduIiwiY3VycmVudCIsImlzSG9yaXpvbnRhbCIsIndpZHRoIiwiaXNQbGF5aW5nIiwiX1NjZW5lIiwiRGV0ZWN0Q29uZmxpY3QiLCJjaGVja0NvbmZsaWN0X1dpZGdldCIsImhlaWdodCIsInVwZGF0ZUFsaWdubWVudCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwicHJvdG90eXBlIiwiQ0NfREVCVUciLCJ3YXJuIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLGFBQWEsR0FBR0MsT0FBTyxDQUFDLDRCQUFELENBQTNCO0FBRUE7Ozs7OztBQUtBOzs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7O0FBS0E7Ozs7Ozs7QUFLQSxJQUFJQyxTQUFTLEdBQUdGLGFBQWEsQ0FBQ0UsU0FBOUI7QUFFQSxJQUFJQyxVQUFVLEdBQUdILGFBQWEsQ0FBQ0ksV0FBL0I7QUFDQSxJQUFJQyxHQUFHLEdBQU9GLFVBQVUsQ0FBQ0UsR0FBekI7QUFDQSxJQUFJQyxHQUFHLEdBQU9ILFVBQVUsQ0FBQ0csR0FBekI7QUFD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Q0QsV0FBTyxLQUFLbEMsU0FBTCxLQUFtQnpFLFNBQVMsQ0FBQ2tGLElBQXBDO0FBQ0gsR0FOa0Q7QUFPbkR4RCxFQUFBQSxHQVBtRCxlQU85Q0MsS0FQOEMsRUFPdkM7QUFDUixRQUFJK0UsUUFBSixFQUFjO0FBQ1Y5RixNQUFBQSxFQUFFLENBQUMrRixJQUFILENBQVEsb0dBQVI7QUFDSDs7QUFDRCxTQUFLbEMsU0FBTCxHQUFpQjlDLEtBQUssR0FBRzNCLFNBQVMsQ0FBQ2tGLElBQWIsR0FBb0JsRixTQUFTLENBQUNtRixNQUFwRDtBQUNIO0FBWmtELENBQXZEO0FBZ0JBdkUsRUFBRSxDQUFDRCxNQUFILEdBQVlpRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsRyxNQUE3QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIFdpZGdldE1hbmFnZXIgPSByZXF1aXJlKCcuLi9iYXNlLXVpL0NDV2lkZ2V0TWFuYWdlcicpO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgV2lkZ2V0J3MgYWxpZ25tZW50IG1vZGUsIGluZGljYXRpbmcgd2hlbiB0aGUgd2lkZ2V0IHNob3VsZCByZWZyZXNoLlxuICogISN6aCBXaWRnZXQg55qE5a+56b2Q5qih5byP77yM6KGo56S6IFdpZGdldCDlupTor6XkvZXml7bliLfmlrDjgIJcbiAqIEBlbnVtIFdpZGdldC5BbGlnbk1vZGVcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBPbmx5IGFsaWduIG9uY2Ugd2hlbiB0aGUgV2lkZ2V0IGlzIGVuYWJsZWQgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICogVGhpcyB3aWxsIGFsbG93IHRoZSBzY3JpcHQgb3IgYW5pbWF0aW9uIHRvIGNvbnRpbnVlIGNvbnRyb2xsaW5nIHRoZSBjdXJyZW50IG5vZGUuXG4gKiBJdCB3aWxsIG9ubHkgYmUgYWxpZ25lZCBvbmNlIGJlZm9yZSB0aGUgZW5kIG9mIGZyYW1lIHdoZW4gb25FbmFibGUgaXMgY2FsbGVkLFxuICogdGhlbiBpbW1lZGlhdGVseSBkaXNhYmxlcyB0aGUgV2lkZ2V0LlxuICogISN6aFxuICog5LuF5ZyoIFdpZGdldCDnrKzkuIDmrKHmv4DmtLvml7blr7npvZDkuIDmrKHvvIzkvr/kuo7ohJrmnKzmiJbliqjnlLvnu6fnu63mjqfliLblvZPliY3oioLngrnjgIJcbiAqIOW8gOWQr+WQjuS8muWcqCBvbkVuYWJsZSDml7bmiYDlnKjnmoTpgqPkuIDluKfnu5PmnZ/liY3lr7npvZDkuIDmrKHvvIznhLblkI7nq4vliLvnpoHnlKjor6UgV2lkZ2V044CCXG4gKiBAcHJvcGVydHkge051bWJlcn0gT05DRVxuICovXG4vKipcbiAqICEjZW4gQWxpZ24gZmlyc3QgZnJvbSB0aGUgYmVnaW5uaW5nIGFzIE9OQ0UsIGFuZCB0aGVuIHJlYWxpZ24gaXQgZXZlcnkgdGltZSB0aGUgd2luZG93IGlzIHJlc2l6ZWQuXG4gKiAhI3poIOS4gOW8gOWni+S8muWDjyBPTkNFIOS4gOagt+Wvuem9kOS4gOasoe+8jOS5i+WQjuavj+W9k+eql+WPo+Wkp+Wwj+aUueWPmOaXtui/mOS8mumHjeaWsOWvuem9kOOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IE9OX1dJTkRPV19SRVNJWkVcbiAqL1xuLyoqXG4gKiAhI2VuIEtlZXAgYWxpZ25pbmcgYWxsIHRoZSB3YXkuXG4gKiAhI3poIOWni+e7iOS/neaMgeWvuem9kOOAglxuICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMV0FZU1xuICovXG52YXIgQWxpZ25Nb2RlID0gV2lkZ2V0TWFuYWdlci5BbGlnbk1vZGU7XG5cbnZhciBBbGlnbkZsYWdzID0gV2lkZ2V0TWFuYWdlci5fQWxpZ25GbGFncztcbnZhciBUT1AgICAgID0gQWxpZ25GbGFncy5UT1A7XG52YXIgTUlEICAgICA9IEFsaWduRmxhZ3MuTUlEO1xudmFyIEJPVCAgICAgPSBBbGlnbkZsYWdzLkJPVDtcbnZhciBMRUZUICAgID0gQWxpZ25GbGFncy5MRUZUO1xudmFyIENFTlRFUiAgPSBBbGlnbkZsYWdzLkNFTlRFUjtcbnZhciBSSUdIVCAgID0gQWxpZ25GbGFncy5SSUdIVDtcbnZhciBUT1BfQk9UID0gVE9QIHwgQk9UO1xudmFyIExFRlRfUklHSFQgPSBMRUZUIHwgUklHSFQ7XG5cbi8qKlxuICogISNlblxuICogU3RvcmVzIGFuZCBtYW5pcHVsYXRlIHRoZSBhbmNob3JpbmcgYmFzZWQgb24gaXRzIHBhcmVudC5cbiAqIFdpZGdldCBhcmUgdXNlZCBmb3IgR1VJIGJ1dCBjYW4gYWxzbyBiZSB1c2VkIGZvciBvdGhlciB0aGluZ3MuXG4gKiBXaWRnZXQgd2lsbCBhZGp1c3QgY3VycmVudCBub2RlJ3MgcG9zaXRpb24gYW5kIHNpemUgYXV0b21hdGljYWxseSwgYnV0IHRoZSByZXN1bHRzIGFmdGVyIGFkanVzdG1lbnQgY2FuIG5vdCBiZSBvYnRhaW5lZCB1bnRpbCB0aGUgbmV4dCBmcmFtZSB1bmxlc3MgeW91IGNhbGwge3sjY3Jvc3NMaW5rIFwiV2lkZ2V0L3VwZGF0ZUFsaWdubWVudDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX0gbWFudWFsbHkuXG4gKiAhI3poXG4gKiBXaWRnZXQg57uE5Lu277yM55So5LqO6K6+572u5ZKM6YCC6YWN5YW255u45a+55LqO54i26IqC54K555qE6L656Led77yMV2lkZ2V0IOmAmuW4uOiiq+eUqOS6jiBVSSDnlYzpnaLvvIzkuZ/lj6/ku6XnlKjkuo7lhbbku5blnLDmlrnjgIJcbiAqIFdpZGdldCDkvJroh6rliqjosIPmlbTlvZPliY3oioLngrnnmoTlnZDmoIflkozlrr3pq5jvvIzkuI3ov4fnm67liY3osIPmlbTlkI7nmoTnu5PmnpzopoHliLDkuIvkuIDluKfmiY3og73lnKjohJrmnKzph4zojrflj5bliLDvvIzpmaTpnZ7kvaDlhYjmiYvliqjosIPnlKgge3sjY3Jvc3NMaW5rIFwiV2lkZ2V0L3VwZGF0ZUFsaWdubWVudDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX3jgIJcbiAqXG4gKiBAY2xhc3MgV2lkZ2V0XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xudmFyIFdpZGdldCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuV2lkZ2V0JywgZXh0ZW5kczogcmVxdWlyZSgnLi9DQ0NvbXBvbmVudCcpLFxuXG4gICAgZWRpdG9yOiBDQ19FRElUT1IgJiYge1xuICAgICAgICBtZW51OiAnaTE4bjpNQUlOX01FTlUuY29tcG9uZW50LnVpL1dpZGdldCcsXG4gICAgICAgIGhlbHA6ICdpMThuOkNPTVBPTkVOVC5oZWxwX3VybC53aWRnZXQnLFxuICAgICAgICBpbnNwZWN0b3I6ICdwYWNrYWdlczovL2luc3BlY3Rvci9pbnNwZWN0b3JzL2NvbXBzL2Njd2lkZ2V0LmpzJyxcbiAgICAgICAgZXhlY3V0ZUluRWRpdE1vZGU6IHRydWUsXG4gICAgICAgIGRpc2FsbG93TXVsdGlwbGU6IHRydWUsXG4gICAgfSxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTcGVjaWZpZXMgYW4gYWxpZ25tZW50IHRhcmdldCB0aGF0IGNhbiBvbmx5IGJlIG9uZSBvZiB0aGUgcGFyZW50IG5vZGVzIG9mIHRoZSBjdXJyZW50IG5vZGUuXG4gICAgICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIG51bGwsIGFuZCB3aGVuIG51bGwsIGluZGljYXRlcyB0aGUgY3VycmVudCBwYXJlbnQuXG4gICAgICAgICAqICEjemgg5oyH5a6a5LiA5Liq5a+56b2Q55uu5qCH77yM5Y+q6IO95piv5b2T5YmN6IqC54K555qE5YW25Lit5LiA5Liq54i26IqC54K577yM6buY6K6k5Li656m677yM5Li656m65pe26KGo56S65b2T5YmN54i26IqC54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Tm9kZX0gdGFyZ2V0XG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICovXG4gICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgIWNjLmVuZ2luZS5faXNQbGF5aW5nICYmIHRoaXMubm9kZS5fcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFkanVzdCB0aGUgb2Zmc2V0cyB0byBrZWVwIHRoZSBzaXplIGFuZCBwb3NpdGlvbiB1bmNoYW5nZWQgYWZ0ZXIgdGFyZ2V0IGNoYWduZWRcbiAgICAgICAgICAgICAgICAgICAgV2lkZ2V0TWFuYWdlci51cGRhdGVPZmZzZXRzVG9TdGF5UHV0KHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQudGFyZ2V0JyxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBFTkFCTEUgQUxJR04gP1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdG8gYWxpZ24gdGhlIHRvcC5cbiAgICAgICAgICogISN6aCDmmK/lkKblr7npvZDkuIrovrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWxpZ25Ub3BcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0FsaWduVG9wOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBUT1ApID4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFsaWduKFRPUCwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fdG9wJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBWZXJ0aWNhbGx5IGFsaWducyB0aGUgbWlkcG9pbnQsIFRoaXMgd2lsbCBvcGVuIHRoZSBvdGhlciB2ZXJ0aWNhbCBhbGlnbm1lbnQgb3B0aW9ucyBjYW5jZWwuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5piv5ZCm5Z6C55u05pa55ZCR5a+56b2Q5Lit54K577yM5byA5ZCv5q2k6aG55Lya5bCG5Z6C55u05pa55ZCR5YW25LuW5a+56b2Q6YCJ6aG55Y+W5raI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0FsaWduVmVydGljYWxDZW50ZXJcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0FsaWduVmVydGljYWxDZW50ZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fYWxpZ25GbGFncyAmIE1JRCkgPiAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnblRvcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWxpZ25Cb3R0b20gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyB8PSBNSUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGlnbkZsYWdzICY9IH5NSUQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fdl9jZW50ZXInLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdG8gYWxpZ24gdGhlIGJvdHRvbS5cbiAgICAgICAgICogISN6aCDmmK/lkKblr7npvZDkuIvovrnjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWxpZ25Cb3R0b21cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0FsaWduQm90dG9tOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBCT1QpID4gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldEFsaWduKEJPVCwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fYm90dG9tJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaGV0aGVyIHRvIGFsaWduIHRoZSBsZWZ0LlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWvuem9kOW3pui+uVxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBbGlnbkxlZnRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqL1xuICAgICAgICBpc0FsaWduTGVmdDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9hbGlnbkZsYWdzICYgTEVGVCkgPiAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWxpZ24oTEVGVCwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25fbGVmdCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogSG9yaXpvbnRhbCBhbGlnbnMgdGhlIG1pZHBvaW50LiBUaGlzIHdpbGwgb3BlbiB0aGUgb3RoZXIgaG9yaXpvbnRhbCBhbGlnbm1lbnQgb3B0aW9ucyBjYW5jZWxlZC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmmK/lkKbmsLTlubPmlrnlkJHlr7npvZDkuK3ngrnvvIzlvIDlkK/mraTpgInpobnkvJrlsIbmsLTlubPmlrnlkJHlhbbku5blr7npvZDpgInpobnlj5bmtojjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBbGlnbkhvcml6b250YWxDZW50ZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fYWxpZ25GbGFncyAmIENFTlRFUikgPiAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBbGlnbkxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0FsaWduUmlnaHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWxpZ25GbGFncyB8PSBDRU5URVI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbGlnbkZsYWdzICY9IH5DRU5URVI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYWxpZ25faF9jZW50ZXInLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdoZXRoZXIgdG8gYWxpZ24gdGhlIHJpZ2h0LlxuICAgICAgICAgKiAhI3poIOaYr+WQpuWvuem9kOWPs+i+ueOAglxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBbGlnblJpZ2h0XG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBbGlnblJpZ2h0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBSSUdIVCkgPiAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0QWxpZ24oUklHSFQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LmFsaWduX3JpZ2h0JyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBzdHJldGNoZWQgaG9yaXpvbnRhbGx5LCB3aGVuIGVuYWJsZSB0aGUgbGVmdCBhbmQgcmlnaHQgYWxpZ25tZW50IHdpbGwgYmUgc3RyZXRjaGVkIGhvcml6b250YWxseSxcbiAgICAgICAgICogdGhlIHdpZHRoIHNldHRpbmcgaXMgaW52YWxpZCAocmVhZCBvbmx5KS5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvZPliY3mmK/lkKbmsLTlubPmi4nkvLjjgILlvZPlkIzml7blkK/nlKjlt6blj7Plr7npvZDml7bvvIzoioLngrnlsIbkvJrooqvmsLTlubPmi4nkvLjvvIzmraTml7boioLngrnnmoTlrr3luqblj6ror7vjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzU3RyZXRjaFdpZHRoXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICovXG4gICAgICAgIGlzU3RyZXRjaFdpZHRoOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX2FsaWduRmxhZ3MgJiBMRUZUX1JJR0hUKSA9PT0gTEVGVF9SSUdIVDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBzdHJldGNoZWQgdmVydGljYWxseSwgd2hlbiBlbmFibGUgdGhlIGxlZnQgYW5kIHJpZ2h0IGFsaWdubWVudCB3aWxsIGJlIHN0cmV0Y2hlZCB2ZXJ0aWNhbGx5LFxuICAgICAgICAgKiB0aGVuIGhlaWdodCBzZXR0aW5nIGlzIGludmFsaWQgKHJlYWQgb25seSlcbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlvZPliY3mmK/lkKblnoLnm7Tmi4nkvLjjgILlvZPlkIzml7blkK/nlKjkuIrkuIvlr7npvZDml7bvvIzoioLngrnlsIbkvJrooqvlnoLnm7Tmi4nkvLjvvIzmraTml7boioLngrnnmoTpq5jluqblj6ror7vjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzU3RyZXRjaEhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqL1xuICAgICAgICBpc1N0cmV0Y2hIZWlnaHQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fYWxpZ25GbGFncyAmIFRPUF9CT1QpID09PSBUT1BfQk9UO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQUxJR04gTUFSR0lOU1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIHRvcCBvZiB0aGlzIG5vZGUgYW5kIHRoZSB0b3Agb2YgcGFyZW50IG5vZGUsXG4gICAgICAgICAqIHRoZSB2YWx1ZSBjYW4gYmUgbmVnYXRpdmUsIE9ubHkgYXZhaWxhYmxlIGluICdpc0FsaWduVG9wJyBvcGVuLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOacrOiKgueCuemhtui+ueWSjOeItuiKgueCuemhtui+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduVG9wIOW8gOWQr+aXtuaJjeacieS9nOeUqOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgdG9wXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIHRvcDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvcCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LnRvcCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogVGhlIG1hcmdpbnMgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoaXMgbm9kZSBhbmQgdGhlIGJvdHRvbSBvZiBwYXJlbnQgbm9kZSxcbiAgICAgICAgICogdGhlIHZhbHVlIGNhbiBiZSBuZWdhdGl2ZSwgT25seSBhdmFpbGFibGUgaW4gJ2lzQWxpZ25Cb3R0b20nIG9wZW4uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5pys6IqC54K55bqV6L655ZKM54i26IqC54K55bqV6L6555qE6Led56a777yM5Y+v5aGr5YaZ6LSf5YC877yM5Y+q5pyJ5ZyoIGlzQWxpZ25Cb3R0b20g5byA5ZCv5pe25omN5pyJ5L2c55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBib3R0b21cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgYm90dG9tOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm90dG9tO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm90dG9tID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuYm90dG9tJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbWFyZ2lucyBiZXR3ZWVuIHRoZSBsZWZ0IG9mIHRoaXMgbm9kZSBhbmQgdGhlIGxlZnQgb2YgcGFyZW50IG5vZGUsXG4gICAgICAgICAqIHRoZSB2YWx1ZSBjYW4gYmUgbmVnYXRpdmUsIE9ubHkgYXZhaWxhYmxlIGluICdpc0FsaWduTGVmdCcgb3Blbi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDmnKzoioLngrnlt6bovrnlkozniLboioLngrnlt6bovrnnmoTot53nprvvvIzlj6/loavlhpnotJ/lgLzvvIzlj6rmnInlnKggaXNBbGlnbkxlZnQg5byA5ZCv5pe25omN5pyJ5L2c55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBsZWZ0XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIGxlZnQ6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sZWZ0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGVmdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQud2lkZ2V0LmxlZnQnLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBtYXJnaW5zIGJldHdlZW4gdGhlIHJpZ2h0IG9mIHRoaXMgbm9kZSBhbmQgdGhlIHJpZ2h0IG9mIHBhcmVudCBub2RlLFxuICAgICAgICAgKiB0aGUgdmFsdWUgY2FuIGJlIG5lZ2F0aXZlLCBPbmx5IGF2YWlsYWJsZSBpbiAnaXNBbGlnblJpZ2h0JyBvcGVuLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOacrOiKgueCueWPs+i+ueWSjOeItuiKgueCueWPs+i+ueeahOi3neemu++8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduUmlnaHQg5byA5ZCv5pe25omN5pyJ5L2c55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSByaWdodFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC5yaWdodCcsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogSG9yaXpvbnRhbCBhbGlnbnMgdGhlIG1pZHBvaW50IG9mZnNldCB2YWx1ZSxcbiAgICAgICAgICogdGhlIHZhbHVlIGNhbiBiZSBuZWdhdGl2ZSwgT25seSBhdmFpbGFibGUgaW4gJ2lzQWxpZ25Ib3Jpem9udGFsQ2VudGVyJyBvcGVuLlxuICAgICAgICAgKiAhI3poIOawtOW5s+WxheS4reeahOWBj+enu+WAvO+8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduSG9yaXpvbnRhbENlbnRlciDlvIDlkK/ml7bmiY3mnInkvZznlKjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGhvcml6b250YWxDZW50ZXJcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKi9cbiAgICAgICAgaG9yaXpvbnRhbENlbnRlcjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hvcml6b250YWxDZW50ZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3Jpem9udGFsQ2VudGVyID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC53aWRnZXQuaG9yaXpvbnRhbF9jZW50ZXInLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFZlcnRpY2FsIGFsaWducyB0aGUgbWlkcG9pbnQgb2Zmc2V0IHZhbHVlLFxuICAgICAgICAgKiB0aGUgdmFsdWUgY2FuIGJlIG5lZ2F0aXZlLCBPbmx5IGF2YWlsYWJsZSBpbiAnaXNBbGlnblZlcnRpY2FsQ2VudGVyJyBvcGVuLlxuICAgICAgICAgKiAhI3poIOWeguebtOWxheS4reeahOWBj+enu+WAvO+8jOWPr+Whq+WGmei0n+WAvO+8jOWPquacieWcqCBpc0FsaWduVmVydGljYWxDZW50ZXIg5byA5ZCv5pe25omN5pyJ5L2c55So44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB2ZXJ0aWNhbENlbnRlclxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJ0aWNhbENlbnRlcjoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2FsQ2VudGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydGljYWxDZW50ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC52ZXJ0aWNhbF9jZW50ZXInLFxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIFBBUkNFTlRBR0UgT1IgQUJTT0xVVEVcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBJZiB0cnVlLCBob3Jpem9udGFsQ2VudGVyIGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4uXG4gICAgICAgICAqICEjemgg5aaC5p6c5Li6IHRydWXvvIxcImhvcml6b250YWxDZW50ZXJcIiDlsIbkvJrku6Xlg4/ntKDkvZzkuLrlgY/np7vlgLzvvIzlj43kuYvkuLrnmb7liIbmr5TvvIgwIOWIsCAx77yJ44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBYnNvbHV0ZUhvcml6b250YWxDZW50ZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Fic0hvcml6b250YWxDZW50ZXI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Fic0hvcml6b250YWxDZW50ZXIgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIElmIHRydWUsIHZlcnRpY2FsQ2VudGVyIGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4uXG4gICAgICAgICAqICEjemgg5aaC5p6c5Li6IHRydWXvvIxcInZlcnRpY2FsQ2VudGVyXCIg5bCG5Lya5Lul5YOP57Sg5L2c5Li65YGP56e75YC877yM5Y+N5LmL5Li655m+5YiG5q+U77yIMCDliLAgMe+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBYnNvbHV0ZVZlcnRpY2FsQ2VudGVyXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBpc0Fic29sdXRlVmVydGljYWxDZW50ZXI6IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Fic1ZlcnRpY2FsQ2VudGVyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNBYnNWZXJ0aWNhbENlbnRlciA9IHZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogSWYgdHJ1ZSwgdG9wIGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4gcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIGhlaWdodC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwidG9wXCIg5bCG5Lya5Lul5YOP57Sg5L2c5Li66L656Led77yM5ZCm5YiZ5bCG5Lya5Lul55u45a+554i254mp5L2T6auY5bqm55qE55m+5YiG5q+U77yIMCDliLAgMe+8ieS9nOS4uui+uei3neOAglxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBYnNvbHV0ZVRvcFxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgKi9cbiAgICAgICAgaXNBYnNvbHV0ZVRvcDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWJzVG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNBYnNUb3AgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIElmIHRydWUsIGJvdHRvbSBpcyBwaXhlbCBtYXJnaW4sIG90aGVyd2lzZSBpcyBwZXJjZW50YWdlICgwIC0gMSkgbWFyZ2luIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQncyBoZWlnaHQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5aaC5p6c5Li6IHRydWXvvIxcImJvdHRvbVwiIOWwhuS8muS7peWDj+e0oOS9nOS4uui+uei3ne+8jOWQpuWImeWwhuS8muS7peebuOWvueeItueJqeS9k+mrmOW6pueahOeZvuWIhuavlO+8iDAg5YiwIDHvvInkvZzkuLrovrnot53jgIJcbiAgICAgICAgICogQHByb3BlcnR5IGlzQWJzb2x1dGVCb3R0b21cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIGlzQWJzb2x1dGVCb3R0b206IHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0Fic0JvdHRvbTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzQWJzQm90dG9tID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBJZiB0cnVlLCBsZWZ0IGlzIHBpeGVsIG1hcmdpbiwgb3RoZXJ3aXNlIGlzIHBlcmNlbnRhZ2UgKDAgLSAxKSBtYXJnaW4gcmVsYXRpdmUgdG8gdGhlIHBhcmVudCdzIHdpZHRoLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOWmguaenOS4uiB0cnVl77yMXCJsZWZ0XCIg5bCG5Lya5Lul5YOP57Sg5L2c5Li66L656Led77yM5ZCm5YiZ5bCG5Lya5Lul55u45a+554i254mp5L2T5a695bqm55qE55m+5YiG5q+U77yIMCDliLAgMe+8ieS9nOS4uui+uei3neOAglxuICAgICAgICAgKiBAcHJvcGVydHkgaXNBYnNvbHV0ZUxlZnRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIGlzQWJzb2x1dGVMZWZ0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faXNBYnNMZWZ0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNBYnNMZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBJZiB0cnVlLCByaWdodCBpcyBwaXhlbCBtYXJnaW4sIG90aGVyd2lzZSBpcyBwZXJjZW50YWdlICgwIC0gMSkgbWFyZ2luIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQncyB3aWR0aC5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDlpoLmnpzkuLogdHJ1Ze+8jFwicmlnaHRcIiDlsIbkvJrku6Xlg4/ntKDkvZzkuLrovrnot53vvIzlkKbliJnlsIbkvJrku6Xnm7jlr7nniLbniankvZPlrr3luqbnmoTnmb7liIbmr5TvvIgwIOWIsCAx77yJ5L2c5Li66L656Led44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBpc0Fic29sdXRlUmlnaHRcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICovXG4gICAgICAgIGlzQWJzb2x1dGVSaWdodDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzQWJzUmlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Fic1JpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYW5pbWF0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTcGVjaWZpZXMgdGhlIGFsaWdubWVudCBtb2RlIG9mIHRoZSBXaWRnZXQsIHdoaWNoIGRldGVybWluZXMgd2hlbiB0aGUgd2lkZ2V0IHNob3VsZCByZWZyZXNoLlxuICAgICAgICAgKiAhI3poIOaMh+WumiBXaWRnZXQg55qE5a+56b2Q5qih5byP77yM55So5LqO5Yaz5a6aIFdpZGdldCDlupTor6XkvZXml7bliLfmlrDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtXaWRnZXQuQWxpZ25Nb2RlfSBhbGlnbk1vZGVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogd2lkZ2V0LmFsaWduTW9kZSA9IGNjLldpZGdldC5BbGlnbk1vZGUuT05fV0lORE9XX1JFU0laRTtcbiAgICAgICAgICovXG4gICAgICAgIGFsaWduTW9kZToge1xuICAgICAgICAgICBkZWZhdWx0OiBBbGlnbk1vZGUuT05fV0lORE9XX1JFU0laRSxcbiAgICAgICAgICAgdHlwZTogQWxpZ25Nb2RlLFxuICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULndpZGdldC5hbGlnbl9tb2RlJyxcbiAgICAgICAgfSxcblxuICAgICAgICAvL1xuXG4gICAgICAgIF93YXNBbGlnbk9uY2U6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAnaXNBbGlnbk9uY2UnLFxuICAgICAgICB9LFxuXG4gICAgICAgIF90YXJnZXQ6IG51bGwsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjemg6IOWvuem9kOW8gOWFs++8jOeUsSBBbGlnbkZsYWdzIOe7hOaIkFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgX2FsaWduRmxhZ3NcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlZmF1bHQgMFxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2FsaWduRmxhZ3M6IDAsXG5cbiAgICAgICAgX2xlZnQ6IDAsXG4gICAgICAgIF9yaWdodDogMCxcbiAgICAgICAgX3RvcDogMCxcbiAgICAgICAgX2JvdHRvbTogMCxcbiAgICAgICAgX3ZlcnRpY2FsQ2VudGVyOiAwLFxuICAgICAgICBfaG9yaXpvbnRhbENlbnRlcjogMCxcbiAgICAgICAgX2lzQWJzTGVmdDogdHJ1ZSxcbiAgICAgICAgX2lzQWJzUmlnaHQ6IHRydWUsXG4gICAgICAgIF9pc0Fic1RvcDogdHJ1ZSxcbiAgICAgICAgX2lzQWJzQm90dG9tOiB0cnVlLFxuICAgICAgICBfaXNBYnNIb3Jpem9udGFsQ2VudGVyOiB0cnVlLFxuICAgICAgICBfaXNBYnNWZXJ0aWNhbENlbnRlcjogdHJ1ZSxcblxuICAgICAgICAvLyBvcmlnaW5hbCBzaXplIGJlZm9yZSBhbGlnblxuICAgICAgICBfb3JpZ2luYWxXaWR0aDogMCxcbiAgICAgICAgX29yaWdpbmFsSGVpZ2h0OiAwXG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgQWxpZ25Nb2RlOiBBbGlnbk1vZGUsXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fd2FzQWxpZ25PbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIG1pZ3JhdGUgZm9yIG9sZCB2ZXJzaW9uXG4gICAgICAgICAgICB0aGlzLmFsaWduTW9kZSA9IHRoaXMuX3dhc0FsaWduT25jZSA/IEFsaWduTW9kZS5PTkNFIDogQWxpZ25Nb2RlLkFMV0FZUztcbiAgICAgICAgICAgIHRoaXMuX3dhc0FsaWduT25jZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkVuYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBXaWRnZXRNYW5hZ2VyLmFkZCh0aGlzKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFdpZGdldE1hbmFnZXIucmVtb3ZlKHRoaXMpO1xuICAgIH0sXG5cbiAgICBfdmFsaWRhdGVUYXJnZXRJbkRFVjogQ0NfREVWICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuX3RhcmdldDtcbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIGlzUGFyZW50ID0gdGhpcy5ub2RlICE9PSB0YXJnZXQgJiYgdGhpcy5ub2RlLmlzQ2hpbGRPZih0YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFpc1BhcmVudCkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNjUwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIF9zZXRBbGlnbjogZnVuY3Rpb24gKGZsYWcsIGlzQWxpZ24pIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAodGhpcy5fYWxpZ25GbGFncyAmIGZsYWcpID4gMDtcbiAgICAgICAgaWYgKGlzQWxpZ24gPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNIb3Jpem9udGFsID0gKGZsYWcgJiBMRUZUX1JJR0hUKSA+IDA7XG4gICAgICAgIGlmIChpc0FsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9hbGlnbkZsYWdzIHw9IGZsYWc7XG5cbiAgICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdHJldGNoV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmVjb21lIHN0cmV0Y2hcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luYWxXaWR0aCA9IHRoaXMubm9kZS53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCBjaGVjayBjb25mbGljdFxuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfU2NlbmUuRGV0ZWN0Q29uZmxpY3QuY2hlY2tDb25mbGljdF9XaWRnZXQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxpZ25WZXJ0aWNhbENlbnRlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RyZXRjaEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBiZWNvbWUgc3RyZXRjaFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5hbEhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRlc3QgY2hlY2sgY29uZmxpY3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfV2lkZ2V0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuX2lzUGxheWluZyAmJiB0aGlzLm5vZGUuX3BhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vIGFkanVzdCB0aGUgb2Zmc2V0cyB0byBrZWVwIHRoZSBzaXplIGFuZCBwb3NpdGlvbiB1bmNoYW5nZWQgYWZ0ZXIgYWxpZ25tZW50IGNoYWduZWRcbiAgICAgICAgICAgICAgICBXaWRnZXRNYW5hZ2VyLnVwZGF0ZU9mZnNldHNUb1N0YXlQdXQodGhpcywgZmxhZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdHJldGNoV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBjYW5jZWwgc3RyZXRjaFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSB0aGlzLl9vcmlnaW5hbFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RyZXRjaEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGNhbmNlbCBzdHJldGNoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSB0aGlzLl9vcmlnaW5hbEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FsaWduRmxhZ3MgJj0gfmZsYWc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEltbWVkaWF0ZWx5IHBlcmZvcm0gdGhlIHdpZGdldCBhbGlnbm1lbnQuIFlvdSBuZWVkIHRvIG1hbnVhbGx5IGNhbGwgdGhpcyBtZXRob2Qgb25seSBpZlxuICAgICAqIHlvdSBuZWVkIHRvIGdldCB0aGUgbGF0ZXN0IHJlc3VsdHMgYWZ0ZXIgdGhlIGFsaWdubWVudCBiZWZvcmUgdGhlIGVuZCBvZiBjdXJyZW50IGZyYW1lLlxuICAgICAqICEjemhcbiAgICAgKiDnq4vliLvmiafooYwgd2lkZ2V0IOWvuem9kOaTjeS9nOOAgui/meS4quaOpeWPo+S4gOiIrOS4jemcgOimgeaJi+W3peiwg+eUqOOAglxuICAgICAqIOWPquacieW9k+S9oOmcgOimgeWcqOW9k+WJjeW4p+e7k+adn+WJjeiOt+W+lyB3aWRnZXQg5a+56b2Q5ZCO55qE5pyA5paw57uT5p6c5pe25omN6ZyA6KaB5omL5Yqo6LCD55So6L+Z5Liq5pa55rOV44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZUFsaWdubWVudFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB3aWRnZXQudG9wID0gMTA7ICAgICAgIC8vIGNoYW5nZSB0b3AgbWFyZ2luXG4gICAgICogY2MubG9nKHdpZGdldC5ub2RlLnkpOyAvLyBub3QgeWV0IGNoYW5nZWRcbiAgICAgKiB3aWRnZXQudXBkYXRlQWxpZ25tZW50KCk7XG4gICAgICogY2MubG9nKHdpZGdldC5ub2RlLnkpOyAvLyBjaGFuZ2VkXG4gICAgICovXG4gICAgdXBkYXRlQWxpZ25tZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFdpZGdldE1hbmFnZXIudXBkYXRlQWxpZ25tZW50KHRoaXMubm9kZSk7XG4gICAgfSxcbn0pO1xuXG4vKipcbiAqICEjZW5cbiAqIFdoZW4gdHVybmVkIG9uLCBpdCB3aWxsIG9ubHkgYmUgYWxpZ25lZCBvbmNlIGF0IHRoZSBlbmQgb2YgdGhlIG9uRW5hYmxlIGZyYW1lLFxuICogdGhlbiBpbW1lZGlhdGVseSBkaXNhYmxlcyB0aGUgY3VycmVudCBjb21wb25lbnQuXG4gKiBUaGlzIHdpbGwgYWxsb3cgdGhlIHNjcmlwdCBvciBhbmltYXRpb24gdG8gY29udGludWUgY29udHJvbGxpbmcgdGhlIGN1cnJlbnQgbm9kZS5cbiAqIE5vdGU6IEl0IHdpbGwgc3RpbGwgYmUgYWxpZ25lZCBhdCB0aGUgZnJhbWUgd2hlbiBvbkVuYWJsZSBpcyBjYWxsZWQuXG4gKiAhI3poXG4gKiDlvIDlkK/lkI7ku4XkvJrlnKggb25FbmFibGUg55qE5b2T5bin57uT5p2f5pe25a+56b2Q5LiA5qyh77yM54S25ZCO56uL5Yi756aB55So5b2T5YmN57uE5Lu244CCXG4gKiDov5nmoLfkvr/kuo7ohJrmnKzmiJbliqjnlLvnu6fnu63mjqfliLblvZPliY3oioLngrnjgIJcbiAqIOazqOaEj++8mm9uRW5hYmxlIOaXtuaJgOWcqOeahOmCo+S4gOW4p+S7jeeEtuS8mui/m+ihjOWvuem9kOOAglxuICogQHByb3BlcnR5IHtCb29sZWFufSBpc0FsaWduT25jZVxuICogQGRlZmF1bHQgZmFsc2VcbiAqIEBkZXByZWNhdGVkXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXaWRnZXQucHJvdG90eXBlLCAnaXNBbGlnbk9uY2UnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgd2lkZ2V0LmlzQWxpZ25PbmNlYCBpcyBkZXByZWNhdGVkLCB1c2UgYHdpZGdldC5hbGlnbk1vZGUgPT09IGNjLldpZGdldC5BbGlnbk1vZGUuT05DRWAgaW5zdGVhZCBwbGVhc2UuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25Nb2RlID09PSBBbGlnbk1vZGUuT05DRTtcbiAgICB9LFxuICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICBjYy53YXJuKCdgd2lkZ2V0LmlzQWxpZ25PbmNlYCBpcyBkZXByZWNhdGVkLCB1c2UgYHdpZGdldC5hbGlnbk1vZGUgPSBjYy5XaWRnZXQuQWxpZ25Nb2RlLipgIGluc3RlYWQgcGxlYXNlLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWxpZ25Nb2RlID0gdmFsdWUgPyBBbGlnbk1vZGUuT05DRSA6IEFsaWduTW9kZS5BTFdBWVM7XG4gICAgfVxufSk7XG5cblxuY2MuV2lkZ2V0ID0gbW9kdWxlLmV4cG9ydHMgPSBXaWRnZXQ7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==