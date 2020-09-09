
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/components/CCLayout.js';
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
/**
 * !#en Enum for Layout type
 * !#zh 布局类型
 * @enum Layout.Type
 */


var Type = cc.Enum({
  /**
   * !#en None Layout
   * !#zh 取消布局
   *@property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en Horizontal Layout
   * !#zh 水平布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 1,

  /**
   * !#en Vertical Layout
   * !#zh 垂直布局
   * @property {Number} VERTICAL
   */
  VERTICAL: 2,

  /**
   * !#en Grid Layout
   * !#zh 网格布局
   * @property {Number} GRID
   */
  GRID: 3
});
/**
 * !#en Enum for Layout Resize Mode
 * !#zh 缩放模式
 * @enum Layout.ResizeMode
 */

var ResizeMode = cc.Enum({
  /**
   * !#en Don't do any scale.
   * !#zh 不做任何缩放
   * @property {Number} NONE
   */
  NONE: 0,

  /**
   * !#en The container size will be expanded with its children's size.
   * !#zh 容器的大小会根据子节点的大小自动缩放。
   * @property {Number} CONTAINER
   */
  CONTAINER: 1,

  /**
   * !#en Child item size will be adjusted with the container's size.
   * !#zh 子节点的大小会随着容器的大小自动缩放。
   * @property {Number} CHILDREN
   */
  CHILDREN: 2
});
/**
 * !#en Enum for Grid Layout start axis direction.
 * The items in grid layout will be arranged in each axis at first.;
 * !#zh 布局轴向，只用于 GRID 布局。
 * @enum Layout.AxisDirection
 */

var AxisDirection = cc.Enum({
  /**
   * !#en The horizontal axis.
   * !#zh 进行水平方向布局
   * @property {Number} HORIZONTAL
   */
  HORIZONTAL: 0,

  /**
   * !#en The vertical axis.
   * !#zh 进行垂直方向布局
   * @property {Number} VERTICAL
   */
  VERTICAL: 1
});
/**
 * !#en Enum for vertical layout direction.
 *  Used in Grid Layout together with AxisDirection is VERTICAL
 * !#zh 垂直方向布局方式
 * @enum Layout.VerticalDirection
 */

var VerticalDirection = cc.Enum({
  /**
   * !#en Items arranged from bottom to top.
   * !#zh 从下到上排列
   * @property {Number} BOTTOM_TO_TOP
   */
  BOTTOM_TO_TOP: 0,

  /**
   * !#en Items arranged from top to bottom.
   * !#zh 从上到下排列
   * @property {Number} TOP_TO_BOTTOM
   */
  TOP_TO_BOTTOM: 1
});
/**
 * !#en Enum for horizontal layout direction.
 *  Used in Grid Layout together with AxisDirection is HORIZONTAL
 * !#zh 水平方向布局方式
 * @enum Layout.HorizontalDirection
 */

var HorizontalDirection = cc.Enum({
  /**
   * !#en Items arranged from left to right.
   * !#zh 从左往右排列
   * @property {Number} LEFT_TO_RIGHT
   */
  LEFT_TO_RIGHT: 0,

  /**
   * !#en Items arranged from right to left.
   * !#zh 从右往左排列
   *@property {Number} RIGHT_TO_LEFT
   */
  RIGHT_TO_LEFT: 1
});
/**
 * !#en
 * The Layout is a container component, use it to arrange child elements easily.<br>
 * Note：<br>
 * 1.Scaling and rotation of child nodes are not considered.<br>
 * 2.After setting the Layout, the results need to be updated until the next frame,
 * unless you manually call {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
 * !#zh
 * Layout 组件相当于一个容器，能自动对它的所有子节点进行统一排版。<br>
 * 注意：<br>
 * 1.不会考虑子节点的缩放和旋转。<br>
 * 2.对 Layout 设置后结果需要到下一帧才会更新，除非你设置完以后手动调用 {{#crossLink "Layout/updateLayout:method"}}{{/crossLink}}。
 * @class Layout
 * @extends Component
 */

var Layout = cc.Class({
  name: 'cc.Layout',
  "extends": require('./CCComponent'),
  editor: CC_EDITOR && {
    menu: 'i18n:MAIN_MENU.component.ui/Layout',
    help: 'i18n:COMPONENT.help_url.layout',
    inspector: 'packages://inspector/inspectors/comps/cclayout.js',
    executeInEditMode: true
  },
  properties: {
    _layoutSize: cc.size(300, 200),
    _layoutDirty: {
      "default": true,
      serializable: false
    },
    _resize: ResizeMode.NONE,
    //TODO: refactoring this name after data upgrade machanism is out.
    _N$layoutType: Type.NONE,

    /**
     * !#en The layout type.
     * !#zh 布局类型
     * @property {Layout.Type} type
     * @default Layout.Type.NONE
     */
    type: {
      type: Type,
      get: function get() {
        return this._N$layoutType;
      },
      set: function set(value) {
        this._N$layoutType = value;

        if (CC_EDITOR && this.type !== Type.NONE && this._resize === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.layout_type',
      animatable: false
    },

    /**
     * !#en
     * The are three resize modes for Layout.
     * None, resize Container and resize children.
     * !#zh 缩放模式
     * @property {Layout.ResizeMode} resizeMode
     * @default ResizeMode.NONE
     */
    resizeMode: {
      type: ResizeMode,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.resize_mode',
      animatable: false,
      get: function get() {
        return this._resize;
      },
      set: function set(value) {
        if (this.type === Type.NONE && value === ResizeMode.CHILDREN) {
          return;
        }

        this._resize = value;

        if (CC_EDITOR && value === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      }
    },

    /**
     * !#en The cell size for grid layout.
     * !#zh 每个格子的大小，只有布局类型为 GRID 的时候才有效。
     * @property {Size} cellSize
     * @default cc.size(40, 40)
     */
    cellSize: {
      "default": cc.size(40, 40),
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.cell_size',
      type: cc.Size,
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en
     * The start axis for grid layout. If you choose horizontal, then children will layout horizontally at first,
     * and then break line on demand. Choose vertical if you want to layout vertically at first .
     * !#zh 起始轴方向类型，可进行水平和垂直布局排列，只有布局类型为 GRID 的时候才有效。
     * @property {Layout.AxisDirection} startAxis
     */
    startAxis: {
      "default": AxisDirection.HORIZONTAL,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.start_axis',
      type: AxisDirection,
      notify: function notify() {
        if (CC_EDITOR && this._resize === ResizeMode.CONTAINER && !cc.engine.isPlaying) {
          var reLayouted = _Scene.DetectConflict.checkConflict_Layout(this);

          if (reLayouted) {
            return;
          }
        }

        this._doLayoutDirty();
      },
      animatable: false
    },

    /**
     * !#en The left padding of layout, it only effect the layout in one direction.
     * !#zh 容器内左边距，只会在一个布局方向上生效。
     * @property {Number} paddingLeft
     */
    paddingLeft: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_left',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The right padding of layout, it only effect the layout in one direction.
     * !#zh 容器内右边距，只会在一个布局方向上生效。
     * @property {Number} paddingRight
     */
    paddingRight: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_right',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The top padding of layout, it only effect the layout in one direction.
     * !#zh 容器内上边距，只会在一个布局方向上生效。
     * @property {Number} paddingTop
     */
    paddingTop: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_top',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The bottom padding of layout, it only effect the layout in one direction.
     * !#zh 容器内下边距，只会在一个布局方向上生效。
     * @property {Number} paddingBottom
     */
    paddingBottom: {
      "default": 0,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.padding_bottom',
      notify: function notify() {
        this._doLayoutDirty();
      }
    },

    /**
     * !#en The distance in x-axis between each element in layout.
     * !#zh 子节点之间的水平间距。
     * @property {Number} spacingX
     */
    spacingX: {
      "default": 0,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.space_x'
    },

    /**
     * !#en The distance in y-axis between each element in layout.
     * !#zh 子节点之间的垂直间距。
     * @property {Number} spacingY
     */
    spacingY: {
      "default": 0,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.space_y'
    },

    /**
     * !#en
     * Only take effect in Vertical layout mode.
     * This option changes the start element's positioning.
     * !#zh 垂直排列子节点的方向。
     * @property {Layout.VerticalDirection} verticalDirection
     */
    verticalDirection: {
      "default": VerticalDirection.TOP_TO_BOTTOM,
      type: VerticalDirection,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.vertical_direction',
      animatable: false
    },

    /**
     * !#en
     * Only take effect in Horizontal layout mode.
     * This option changes the start element's positioning.
     * !#zh 水平排列子节点的方向。
     * @property {Layout.HorizontalDirection} horizontalDirection
     */
    horizontalDirection: {
      "default": HorizontalDirection.LEFT_TO_RIGHT,
      type: HorizontalDirection,
      notify: function notify() {
        this._doLayoutDirty();
      },
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.horizontal_direction',
      animatable: false
    },

    /**
     * !#en Adjust the layout if the children scaled.
     * !#zh 子节点缩放比例是否影响布局。
     * @property affectedByScale
     * @type {Boolean}
     * @default false
     */
    affectedByScale: {
      "default": false,
      notify: function notify() {
        // every time you switch this state, the layout will be calculated.
        this._doLayoutDirty();
      },
      animatable: false,
      tooltip: CC_DEV && 'i18n:COMPONENT.layout.affected_by_scale'
    }
  },
  statics: {
    Type: Type,
    VerticalDirection: VerticalDirection,
    HorizontalDirection: HorizontalDirection,
    ResizeMode: ResizeMode,
    AxisDirection: AxisDirection
  },
  onEnable: function onEnable() {
    this._addEventListeners();

    if (this.node.getContentSize().equals(cc.size(0, 0))) {
      this.node.setContentSize(this._layoutSize);
    }

    this._doLayoutDirty();
  },
  onDisable: function onDisable() {
    this._removeEventListeners();
  },
  _doLayoutDirty: function _doLayoutDirty() {
    this._layoutDirty = true;
  },
  _doScaleDirty: function _doScaleDirty() {
    this._layoutDirty = this._layoutDirty || this.affectedByScale;
  },
  _addEventListeners: function _addEventListeners() {
    cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
    this.node.on(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.on(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.on(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.on(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);

    this._addChildrenEventListeners();
  },
  _removeEventListeners: function _removeEventListeners() {
    cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.updateLayout, this);
    this.node.off(NodeEvent.SIZE_CHANGED, this._resized, this);
    this.node.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    this.node.off(NodeEvent.CHILD_ADDED, this._childAdded, this);
    this.node.off(NodeEvent.CHILD_REMOVED, this._childRemoved, this);
    this.node.off(NodeEvent.CHILD_REORDER, this._doLayoutDirty, this);

    this._removeChildrenEventListeners();
  },
  _addChildrenEventListeners: function _addChildrenEventListeners() {
    var children = this.node.children;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      child.on(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
      child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
      child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);
    }
  },
  _removeChildrenEventListeners: function _removeChildrenEventListeners() {
    var children = this.node.children;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      child.off(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
      child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
      child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
      child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
      child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);
    }
  },
  _childAdded: function _childAdded(child) {
    child.on(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
    child.on(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.on(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
    child.on(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.on('active-in-hierarchy-changed', this._doLayoutDirty, this);

    this._doLayoutDirty();
  },
  _childRemoved: function _childRemoved(child) {
    child.off(NodeEvent.SCALE_CHANGED, this._doScaleDirty, this);
    child.off(NodeEvent.SIZE_CHANGED, this._doLayoutDirty, this);
    child.off(NodeEvent.POSITION_CHANGED, this._doLayoutDirty, this);
    child.off(NodeEvent.ANCHOR_CHANGED, this._doLayoutDirty, this);
    child.off('active-in-hierarchy-changed', this._doLayoutDirty, this);

    this._doLayoutDirty();
  },
  _resized: function _resized() {
    this._layoutSize = this.node.getContentSize();

    this._doLayoutDirty();
  },
  _doLayoutHorizontally: function _doLayoutHorizontally(baseWidth, rowBreak, fnPositionY, applyChildren) {
    var layoutAnchor = this.node.getAnchorPoint();
    var children = this.node.children;
    var sign = 1;
    var paddingX = this.paddingLeft;
    var leftBoundaryOfLayout = -layoutAnchor.x * baseWidth;

    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      leftBoundaryOfLayout = (1 - layoutAnchor.x) * baseWidth;
      paddingX = this.paddingRight;
    }

    var nextX = leftBoundaryOfLayout + sign * paddingX - sign * this.spacingX;
    var rowMaxHeight = 0;
    var tempMaxHeight = 0;
    var secondMaxHeight = 0;
    var row = 0;
    var containerResizeBoundary = 0;
    var maxHeightChildAnchorY = 0;
    var activeChildCount = 0;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        activeChildCount++;
      }
    }

    var newChildWidth = this.cellSize.width;

    if (this.type !== Type.GRID && this.resizeMode === ResizeMode.CHILDREN) {
      newChildWidth = (baseWidth - (this.paddingLeft + this.paddingRight) - (activeChildCount - 1) * this.spacingX) / activeChildCount;
    }

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      var childScaleX = this._getUsedScaleValue(child.scaleX);

      var childScaleY = this._getUsedScaleValue(child.scaleY);

      if (!child.activeInHierarchy) {
        continue;
      } //for resizing children


      if (this._resize === ResizeMode.CHILDREN) {
        child.width = newChildWidth / childScaleX;

        if (this.type === Type.GRID) {
          child.height = this.cellSize.height / childScaleY;
        }
      }

      var anchorX = child.anchorX;
      var childBoundingBoxWidth = child.width * childScaleX;
      var childBoundingBoxHeight = child.height * childScaleY;

      if (secondMaxHeight > tempMaxHeight) {
        tempMaxHeight = secondMaxHeight;
      }

      if (childBoundingBoxHeight >= tempMaxHeight) {
        secondMaxHeight = tempMaxHeight;
        tempMaxHeight = childBoundingBoxHeight;
        maxHeightChildAnchorY = child.getAnchorPoint().y;
      }

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        anchorX = 1 - child.anchorX;
      }

      nextX = nextX + sign * anchorX * childBoundingBoxWidth + sign * this.spacingX;
      var rightBoundaryOfChild = sign * (1 - anchorX) * childBoundingBoxWidth;

      if (rowBreak) {
        var rowBreakBoundary = nextX + rightBoundaryOfChild + sign * (sign > 0 ? this.paddingRight : this.paddingLeft);
        var leftToRightRowBreak = this.horizontalDirection === HorizontalDirection.LEFT_TO_RIGHT && rowBreakBoundary > (1 - layoutAnchor.x) * baseWidth;
        var rightToLeftRowBreak = this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT && rowBreakBoundary < -layoutAnchor.x * baseWidth;

        if (leftToRightRowBreak || rightToLeftRowBreak) {
          if (childBoundingBoxHeight >= tempMaxHeight) {
            if (secondMaxHeight === 0) {
              secondMaxHeight = tempMaxHeight;
            }

            rowMaxHeight += secondMaxHeight;
            secondMaxHeight = tempMaxHeight;
          } else {
            rowMaxHeight += tempMaxHeight;
            secondMaxHeight = childBoundingBoxHeight;
            tempMaxHeight = 0;
          }

          nextX = leftBoundaryOfLayout + sign * (paddingX + anchorX * childBoundingBoxWidth);
          row++;
        }
      }

      var finalPositionY = fnPositionY(child, rowMaxHeight, row);

      if (baseWidth >= childBoundingBoxWidth + this.paddingLeft + this.paddingRight) {
        if (applyChildren) {
          child.setPosition(cc.v2(nextX, finalPositionY));
        }
      }

      var signX = 1;
      var tempFinalPositionY;
      var topMarign = tempMaxHeight === 0 ? childBoundingBoxHeight : tempMaxHeight;

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.height;
        signX = -1;
        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchorY + this.paddingBottom);

        if (tempFinalPositionY < containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionY;
        }
      } else {
        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.height;
        tempFinalPositionY = finalPositionY + signX * (topMarign * maxHeightChildAnchorY + this.paddingTop);

        if (tempFinalPositionY > containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionY;
        }
      }

      nextX += rightBoundaryOfChild;
    }

    return containerResizeBoundary;
  },
  _getVerticalBaseHeight: function _getVerticalBaseHeight(children) {
    var newHeight = 0;
    var activeChildCount = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (child.activeInHierarchy) {
          activeChildCount++;
          newHeight += child.height * this._getUsedScaleValue(child.scaleY);
        }
      }

      newHeight += (activeChildCount - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
    } else {
      newHeight = this.node.getContentSize().height;
    }

    return newHeight;
  },
  _doLayoutVertically: function _doLayoutVertically(baseHeight, columnBreak, fnPositionX, applyChildren) {
    var layoutAnchor = this.node.getAnchorPoint();
    var children = this.node.children;
    var sign = 1;
    var paddingY = this.paddingBottom;
    var bottomBoundaryOfLayout = -layoutAnchor.y * baseHeight;

    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      bottomBoundaryOfLayout = (1 - layoutAnchor.y) * baseHeight;
      paddingY = this.paddingTop;
    }

    var nextY = bottomBoundaryOfLayout + sign * paddingY - sign * this.spacingY;
    var columnMaxWidth = 0;
    var tempMaxWidth = 0;
    var secondMaxWidth = 0;
    var column = 0;
    var containerResizeBoundary = 0;
    var maxWidthChildAnchorX = 0;
    var activeChildCount = 0;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        activeChildCount++;
      }
    }

    var newChildHeight = this.cellSize.height;

    if (this.type !== Type.GRID && this.resizeMode === ResizeMode.CHILDREN) {
      newChildHeight = (baseHeight - (this.paddingTop + this.paddingBottom) - (activeChildCount - 1) * this.spacingY) / activeChildCount;
    }

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      var childScaleX = this._getUsedScaleValue(child.scaleX);

      var childScaleY = this._getUsedScaleValue(child.scaleY);

      if (!child.activeInHierarchy) {
        continue;
      } //for resizing children


      if (this.resizeMode === ResizeMode.CHILDREN) {
        child.height = newChildHeight / childScaleY;

        if (this.type === Type.GRID) {
          child.width = this.cellSize.width / childScaleX;
        }
      }

      var anchorY = child.anchorY;
      var childBoundingBoxWidth = child.width * childScaleX;
      var childBoundingBoxHeight = child.height * childScaleY;

      if (secondMaxWidth > tempMaxWidth) {
        tempMaxWidth = secondMaxWidth;
      }

      if (childBoundingBoxWidth >= tempMaxWidth) {
        secondMaxWidth = tempMaxWidth;
        tempMaxWidth = childBoundingBoxWidth;
        maxWidthChildAnchorX = child.getAnchorPoint().x;
      }

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        anchorY = 1 - child.anchorY;
      }

      nextY = nextY + sign * anchorY * childBoundingBoxHeight + sign * this.spacingY;
      var topBoundaryOfChild = sign * (1 - anchorY) * childBoundingBoxHeight;

      if (columnBreak) {
        var columnBreakBoundary = nextY + topBoundaryOfChild + sign * (sign > 0 ? this.paddingTop : this.paddingBottom);
        var bottomToTopColumnBreak = this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP && columnBreakBoundary > (1 - layoutAnchor.y) * baseHeight;
        var topToBottomColumnBreak = this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM && columnBreakBoundary < -layoutAnchor.y * baseHeight;

        if (bottomToTopColumnBreak || topToBottomColumnBreak) {
          if (childBoundingBoxWidth >= tempMaxWidth) {
            if (secondMaxWidth === 0) {
              secondMaxWidth = tempMaxWidth;
            }

            columnMaxWidth += secondMaxWidth;
            secondMaxWidth = tempMaxWidth;
          } else {
            columnMaxWidth += tempMaxWidth;
            secondMaxWidth = childBoundingBoxWidth;
            tempMaxWidth = 0;
          }

          nextY = bottomBoundaryOfLayout + sign * (paddingY + anchorY * childBoundingBoxHeight);
          column++;
        }
      }

      var finalPositionX = fnPositionX(child, columnMaxWidth, column);

      if (baseHeight >= childBoundingBoxHeight + (this.paddingTop + this.paddingBottom)) {
        if (applyChildren) {
          child.setPosition(cc.v2(finalPositionX, nextY));
        }
      }

      var signX = 1;
      var tempFinalPositionX; //when the item is the last column break item, the tempMaxWidth will be 0.

      var rightMarign = tempMaxWidth === 0 ? childBoundingBoxWidth : tempMaxWidth;

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        signX = -1;
        containerResizeBoundary = containerResizeBoundary || this.node._contentSize.width;
        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchorX + this.paddingLeft);

        if (tempFinalPositionX < containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionX;
        }
      } else {
        containerResizeBoundary = containerResizeBoundary || -this.node._contentSize.width;
        tempFinalPositionX = finalPositionX + signX * (rightMarign * maxWidthChildAnchorX + this.paddingRight);

        if (tempFinalPositionX > containerResizeBoundary) {
          containerResizeBoundary = tempFinalPositionX;
        }
      }

      nextY += topBoundaryOfChild;
    }

    return containerResizeBoundary;
  },
  _doLayoutBasic: function _doLayoutBasic() {
    var children = this.node.children;
    var allChildrenBoundingBox = null;

    for (var i = 0; i < children.length; ++i) {
      var child = children[i];

      if (child.activeInHierarchy) {
        if (!allChildrenBoundingBox) {
          allChildrenBoundingBox = child.getBoundingBoxToWorld();
        } else {
          allChildrenBoundingBox.union(allChildrenBoundingBox, child.getBoundingBoxToWorld());
        }
      }
    }

    if (allChildrenBoundingBox) {
      var leftBottomSpace = this.node.convertToNodeSpaceAR(cc.v2(allChildrenBoundingBox.x, allChildrenBoundingBox.y));
      leftBottomSpace = cc.v2(leftBottomSpace.x - this.paddingLeft, leftBottomSpace.y - this.paddingBottom);
      var rightTopSpace = this.node.convertToNodeSpaceAR(cc.v2(allChildrenBoundingBox.xMax, allChildrenBoundingBox.yMax));
      rightTopSpace = cc.v2(rightTopSpace.x + this.paddingRight, rightTopSpace.y + this.paddingTop);
      var newSize = rightTopSpace.sub(leftBottomSpace);
      newSize = cc.size(parseFloat(newSize.x.toFixed(2)), parseFloat(newSize.y.toFixed(2)));

      if (newSize.width !== 0) {
        // Invert is to get the coordinate point of the child node in the parent coordinate system
        var newAnchorX = -leftBottomSpace.x / newSize.width;
        this.node.anchorX = parseFloat(newAnchorX.toFixed(2));
      }

      if (newSize.height !== 0) {
        // Invert is to get the coordinate point of the child node in the parent coordinate system
        var newAnchorY = -leftBottomSpace.y / newSize.height;
        this.node.anchorY = parseFloat(newAnchorY.toFixed(2));
      }

      this.node.setContentSize(newSize);
    }
  },
  _doLayoutGridAxisHorizontal: function _doLayoutGridAxisHorizontal(layoutAnchor, layoutSize) {
    var baseWidth = layoutSize.width;
    var sign = 1;
    var bottomBoundaryOfLayout = -layoutAnchor.y * layoutSize.height;
    var paddingY = this.paddingBottom;

    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
      sign = -1;
      bottomBoundaryOfLayout = (1 - layoutAnchor.y) * layoutSize.height;
      paddingY = this.paddingTop;
    }

    var fnPositionY = function (child, topOffset, row) {
      return bottomBoundaryOfLayout + sign * (topOffset + child.anchorY * child.height * this._getUsedScaleValue(child.scaleY) + paddingY + row * this.spacingY);
    }.bind(this);

    var newHeight = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      //calculate the new height of container, it won't change the position of it's children
      var boundary = this._doLayoutHorizontally(baseWidth, true, fnPositionY, false);

      newHeight = bottomBoundaryOfLayout - boundary;

      if (newHeight < 0) {
        newHeight *= -1;
      }

      bottomBoundaryOfLayout = -layoutAnchor.y * newHeight;

      if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
        sign = -1;
        bottomBoundaryOfLayout = (1 - layoutAnchor.y) * newHeight;
      }
    }

    this._doLayoutHorizontally(baseWidth, true, fnPositionY, true);

    if (this.resizeMode === ResizeMode.CONTAINER) {
      this.node.setContentSize(baseWidth, newHeight);
    }
  },
  _doLayoutGridAxisVertical: function _doLayoutGridAxisVertical(layoutAnchor, layoutSize) {
    var baseHeight = layoutSize.height;
    var sign = 1;
    var leftBoundaryOfLayout = -layoutAnchor.x * layoutSize.width;
    var paddingX = this.paddingLeft;

    if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
      sign = -1;
      leftBoundaryOfLayout = (1 - layoutAnchor.x) * layoutSize.width;
      paddingX = this.paddingRight;
    }

    var fnPositionX = function (child, leftOffset, column) {
      return leftBoundaryOfLayout + sign * (leftOffset + child.anchorX * child.width * this._getUsedScaleValue(child.scaleX) + paddingX + column * this.spacingX);
    }.bind(this);

    var newWidth = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      var boundary = this._doLayoutVertically(baseHeight, true, fnPositionX, false);

      newWidth = leftBoundaryOfLayout - boundary;

      if (newWidth < 0) {
        newWidth *= -1;
      }

      leftBoundaryOfLayout = -layoutAnchor.x * newWidth;

      if (this.horizontalDirection === HorizontalDirection.RIGHT_TO_LEFT) {
        sign = -1;
        leftBoundaryOfLayout = (1 - layoutAnchor.x) * newWidth;
      }
    }

    this._doLayoutVertically(baseHeight, true, fnPositionX, true);

    if (this.resizeMode === ResizeMode.CONTAINER) {
      this.node.setContentSize(newWidth, baseHeight);
    }
  },
  _doLayoutGrid: function _doLayoutGrid() {
    var layoutAnchor = this.node.getAnchorPoint();
    var layoutSize = this.node.getContentSize();

    if (this.startAxis === AxisDirection.HORIZONTAL) {
      this._doLayoutGridAxisHorizontal(layoutAnchor, layoutSize);
    } else if (this.startAxis === AxisDirection.VERTICAL) {
      this._doLayoutGridAxisVertical(layoutAnchor, layoutSize);
    }
  },
  _getHorizontalBaseWidth: function _getHorizontalBaseWidth(children) {
    var newWidth = 0;
    var activeChildCount = 0;

    if (this.resizeMode === ResizeMode.CONTAINER) {
      for (var i = 0; i < children.length; ++i) {
        var child = children[i];

        if (child.activeInHierarchy) {
          activeChildCount++;
          newWidth += child.width * this._getUsedScaleValue(child.scaleX);
        }
      }

      newWidth += (activeChildCount - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
    } else {
      newWidth = this.node.getContentSize().width;
    }

    return newWidth;
  },
  _doLayout: function _doLayout() {
    if (this.type === Type.HORIZONTAL) {
      var newWidth = this._getHorizontalBaseWidth(this.node.children);

      var fnPositionY = function fnPositionY(child) {
        return child.y;
      };

      this._doLayoutHorizontally(newWidth, false, fnPositionY, true);

      this.node.width = newWidth;
    } else if (this.type === Type.VERTICAL) {
      var newHeight = this._getVerticalBaseHeight(this.node.children);

      var fnPositionX = function fnPositionX(child) {
        return child.x;
      };

      this._doLayoutVertically(newHeight, false, fnPositionX, true);

      this.node.height = newHeight;
    } else if (this.type === Type.NONE) {
      if (this.resizeMode === ResizeMode.CONTAINER) {
        this._doLayoutBasic();
      }
    } else if (this.type === Type.GRID) {
      this._doLayoutGrid();
    }
  },
  _getUsedScaleValue: function _getUsedScaleValue(value) {
    return this.affectedByScale ? Math.abs(value) : 1;
  },

  /**
   * !#en Perform the layout update
   * !#zh 立即执行更新布局
   *
   * @method updateLayout
   *
   * @example
   * layout.type = cc.Layout.HORIZONTAL;
   * layout.node.addChild(childNode);
   * cc.log(childNode.x); // not yet changed
   * layout.updateLayout();
   * cc.log(childNode.x); // changed
   */
  updateLayout: function updateLayout() {
    if (this._layoutDirty && this.node.children.length > 0) {
      this._doLayout();

      this._layoutDirty = false;
    }
  }
});
cc.Layout = module.exports = Layout;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudHMvQ0NMYXlvdXQuanMiXSwibmFtZXMiOlsiTm9kZUV2ZW50IiwicmVxdWlyZSIsIkV2ZW50VHlwZSIsIlR5cGUiLCJjYyIsIkVudW0iLCJOT05FIiwiSE9SSVpPTlRBTCIsIlZFUlRJQ0FMIiwiR1JJRCIsIlJlc2l6ZU1vZGUiLCJDT05UQUlORVIiLCJDSElMRFJFTiIsIkF4aXNEaXJlY3Rpb24iLCJWZXJ0aWNhbERpcmVjdGlvbiIsIkJPVFRPTV9UT19UT1AiLCJUT1BfVE9fQk9UVE9NIiwiSG9yaXpvbnRhbERpcmVjdGlvbiIsIkxFRlRfVE9fUklHSFQiLCJSSUdIVF9UT19MRUZUIiwiTGF5b3V0IiwiQ2xhc3MiLCJuYW1lIiwiZWRpdG9yIiwiQ0NfRURJVE9SIiwibWVudSIsImhlbHAiLCJpbnNwZWN0b3IiLCJleGVjdXRlSW5FZGl0TW9kZSIsInByb3BlcnRpZXMiLCJfbGF5b3V0U2l6ZSIsInNpemUiLCJfbGF5b3V0RGlydHkiLCJzZXJpYWxpemFibGUiLCJfcmVzaXplIiwiX04kbGF5b3V0VHlwZSIsInR5cGUiLCJnZXQiLCJzZXQiLCJ2YWx1ZSIsImVuZ2luZSIsImlzUGxheWluZyIsInJlTGF5b3V0ZWQiLCJfU2NlbmUiLCJEZXRlY3RDb25mbGljdCIsImNoZWNrQ29uZmxpY3RfTGF5b3V0IiwiX2RvTGF5b3V0RGlydHkiLCJ0b29sdGlwIiwiQ0NfREVWIiwiYW5pbWF0YWJsZSIsInJlc2l6ZU1vZGUiLCJjZWxsU2l6ZSIsIlNpemUiLCJub3RpZnkiLCJzdGFydEF4aXMiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwic3BhY2luZ1giLCJzcGFjaW5nWSIsInZlcnRpY2FsRGlyZWN0aW9uIiwiaG9yaXpvbnRhbERpcmVjdGlvbiIsImFmZmVjdGVkQnlTY2FsZSIsInN0YXRpY3MiLCJvbkVuYWJsZSIsIl9hZGRFdmVudExpc3RlbmVycyIsIm5vZGUiLCJnZXRDb250ZW50U2l6ZSIsImVxdWFscyIsInNldENvbnRlbnRTaXplIiwib25EaXNhYmxlIiwiX3JlbW92ZUV2ZW50TGlzdGVuZXJzIiwiX2RvU2NhbGVEaXJ0eSIsImRpcmVjdG9yIiwib24iLCJEaXJlY3RvciIsIkVWRU5UX0FGVEVSX1VQREFURSIsInVwZGF0ZUxheW91dCIsIlNJWkVfQ0hBTkdFRCIsIl9yZXNpemVkIiwiQU5DSE9SX0NIQU5HRUQiLCJDSElMRF9BRERFRCIsIl9jaGlsZEFkZGVkIiwiQ0hJTERfUkVNT1ZFRCIsIl9jaGlsZFJlbW92ZWQiLCJDSElMRF9SRU9SREVSIiwiX2FkZENoaWxkcmVuRXZlbnRMaXN0ZW5lcnMiLCJvZmYiLCJfcmVtb3ZlQ2hpbGRyZW5FdmVudExpc3RlbmVycyIsImNoaWxkcmVuIiwiaSIsImxlbmd0aCIsImNoaWxkIiwiU0NBTEVfQ0hBTkdFRCIsIlBPU0lUSU9OX0NIQU5HRUQiLCJfZG9MYXlvdXRIb3Jpem9udGFsbHkiLCJiYXNlV2lkdGgiLCJyb3dCcmVhayIsImZuUG9zaXRpb25ZIiwiYXBwbHlDaGlsZHJlbiIsImxheW91dEFuY2hvciIsImdldEFuY2hvclBvaW50Iiwic2lnbiIsInBhZGRpbmdYIiwibGVmdEJvdW5kYXJ5T2ZMYXlvdXQiLCJ4IiwibmV4dFgiLCJyb3dNYXhIZWlnaHQiLCJ0ZW1wTWF4SGVpZ2h0Iiwic2Vjb25kTWF4SGVpZ2h0Iiwicm93IiwiY29udGFpbmVyUmVzaXplQm91bmRhcnkiLCJtYXhIZWlnaHRDaGlsZEFuY2hvclkiLCJhY3RpdmVDaGlsZENvdW50IiwiYWN0aXZlSW5IaWVyYXJjaHkiLCJuZXdDaGlsZFdpZHRoIiwid2lkdGgiLCJjaGlsZFNjYWxlWCIsIl9nZXRVc2VkU2NhbGVWYWx1ZSIsInNjYWxlWCIsImNoaWxkU2NhbGVZIiwic2NhbGVZIiwiaGVpZ2h0IiwiYW5jaG9yWCIsImNoaWxkQm91bmRpbmdCb3hXaWR0aCIsImNoaWxkQm91bmRpbmdCb3hIZWlnaHQiLCJ5IiwicmlnaHRCb3VuZGFyeU9mQ2hpbGQiLCJyb3dCcmVha0JvdW5kYXJ5IiwibGVmdFRvUmlnaHRSb3dCcmVhayIsInJpZ2h0VG9MZWZ0Um93QnJlYWsiLCJmaW5hbFBvc2l0aW9uWSIsInNldFBvc2l0aW9uIiwidjIiLCJzaWduWCIsInRlbXBGaW5hbFBvc2l0aW9uWSIsInRvcE1hcmlnbiIsIl9jb250ZW50U2l6ZSIsIl9nZXRWZXJ0aWNhbEJhc2VIZWlnaHQiLCJuZXdIZWlnaHQiLCJfZG9MYXlvdXRWZXJ0aWNhbGx5IiwiYmFzZUhlaWdodCIsImNvbHVtbkJyZWFrIiwiZm5Qb3NpdGlvblgiLCJwYWRkaW5nWSIsImJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQiLCJuZXh0WSIsImNvbHVtbk1heFdpZHRoIiwidGVtcE1heFdpZHRoIiwic2Vjb25kTWF4V2lkdGgiLCJjb2x1bW4iLCJtYXhXaWR0aENoaWxkQW5jaG9yWCIsIm5ld0NoaWxkSGVpZ2h0IiwiYW5jaG9yWSIsInRvcEJvdW5kYXJ5T2ZDaGlsZCIsImNvbHVtbkJyZWFrQm91bmRhcnkiLCJib3R0b21Ub1RvcENvbHVtbkJyZWFrIiwidG9wVG9Cb3R0b21Db2x1bW5CcmVhayIsImZpbmFsUG9zaXRpb25YIiwidGVtcEZpbmFsUG9zaXRpb25YIiwicmlnaHRNYXJpZ24iLCJfZG9MYXlvdXRCYXNpYyIsImFsbENoaWxkcmVuQm91bmRpbmdCb3giLCJnZXRCb3VuZGluZ0JveFRvV29ybGQiLCJ1bmlvbiIsImxlZnRCb3R0b21TcGFjZSIsImNvbnZlcnRUb05vZGVTcGFjZUFSIiwicmlnaHRUb3BTcGFjZSIsInhNYXgiLCJ5TWF4IiwibmV3U2l6ZSIsInN1YiIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwibmV3QW5jaG9yWCIsIm5ld0FuY2hvclkiLCJfZG9MYXlvdXRHcmlkQXhpc0hvcml6b250YWwiLCJsYXlvdXRTaXplIiwidG9wT2Zmc2V0IiwiYmluZCIsImJvdW5kYXJ5IiwiX2RvTGF5b3V0R3JpZEF4aXNWZXJ0aWNhbCIsImxlZnRPZmZzZXQiLCJuZXdXaWR0aCIsIl9kb0xheW91dEdyaWQiLCJfZ2V0SG9yaXpvbnRhbEJhc2VXaWR0aCIsIl9kb0xheW91dCIsIk1hdGgiLCJhYnMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsU0FBUyxHQUFHQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCQyxTQUF2QztBQUVBOzs7Ozs7O0FBS0EsSUFBSUMsSUFBSSxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUNmOzs7OztBQUtBQyxFQUFBQSxJQUFJLEVBQUUsQ0FOUzs7QUFPZjs7Ozs7QUFLQUMsRUFBQUEsVUFBVSxFQUFFLENBWkc7O0FBY2Y7Ozs7O0FBS0FDLEVBQUFBLFFBQVEsRUFBRSxDQW5CSzs7QUFvQmY7Ozs7O0FBS0FDLEVBQUFBLElBQUksRUFBRTtBQXpCUyxDQUFSLENBQVg7QUE0QkE7Ozs7OztBQUtBLElBQUlDLFVBQVUsR0FBR04sRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDckI7Ozs7O0FBS0FDLEVBQUFBLElBQUksRUFBRSxDQU5lOztBQU9yQjs7Ozs7QUFLQUssRUFBQUEsU0FBUyxFQUFFLENBWlU7O0FBYXJCOzs7OztBQUtBQyxFQUFBQSxRQUFRLEVBQUU7QUFsQlcsQ0FBUixDQUFqQjtBQXFCQTs7Ozs7OztBQU1BLElBQUlDLGFBQWEsR0FBR1QsRUFBRSxDQUFDQyxJQUFILENBQVE7QUFDeEI7Ozs7O0FBS0FFLEVBQUFBLFVBQVUsRUFBRSxDQU5ZOztBQU94Qjs7Ozs7QUFLQUMsRUFBQUEsUUFBUSxFQUFFO0FBWmMsQ0FBUixDQUFwQjtBQWVBOzs7Ozs7O0FBTUEsSUFBSU0saUJBQWlCLEdBQUdWLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRO0FBQzVCOzs7OztBQUtBVSxFQUFBQSxhQUFhLEVBQUUsQ0FOYTs7QUFPNUI7Ozs7O0FBS0FDLEVBQUFBLGFBQWEsRUFBRTtBQVphLENBQVIsQ0FBeEI7QUFlQTs7Ozs7OztBQU1BLElBQUlDLG1C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dkIsRUFBNkI7QUFDOUIsV0FBS2dMLGFBQUw7QUFDSDtBQUNKLEdBdnlCaUI7QUF5eUJsQmxFLEVBQUFBLGtCQXp5QmtCLDhCQXl5QkVoRixLQXp5QkYsRUF5eUJTO0FBQ3ZCLFdBQU8sS0FBS3dCLGVBQUwsR0FBdUI2SCxJQUFJLENBQUNDLEdBQUwsQ0FBU3RKLEtBQVQsQ0FBdkIsR0FBeUMsQ0FBaEQ7QUFDSCxHQTN5QmlCOztBQTZ5QmxCOzs7Ozs7Ozs7Ozs7O0FBYUF1QyxFQUFBQSxZQUFZLEVBQUUsd0JBQVk7QUFDdEIsUUFBSSxLQUFLOUMsWUFBTCxJQUFxQixLQUFLbUMsSUFBTCxDQUFVdUIsUUFBVixDQUFtQkUsTUFBbkIsR0FBNEIsQ0FBckQsRUFBd0Q7QUFDcEQsV0FBSytGLFNBQUw7O0FBQ0EsV0FBSzNKLFlBQUwsR0FBb0IsS0FBcEI7QUFDSDtBQUNKO0FBL3pCaUIsQ0FBVCxDQUFiO0FBazBCQTVCLEVBQUUsQ0FBQ2dCLE1BQUgsR0FBWTBLLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNLLE1BQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBOb2RlRXZlbnQgPSByZXF1aXJlKCcuLi9DQ05vZGUnKS5FdmVudFR5cGU7XG5cbi8qKlxuICogISNlbiBFbnVtIGZvciBMYXlvdXQgdHlwZVxuICogISN6aCDluIPlsYDnsbvlnotcbiAqIEBlbnVtIExheW91dC5UeXBlXG4gKi9cbnZhciBUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBOb25lIExheW91dFxuICAgICAqICEjemgg5Y+W5raI5biD5bGAXG4gICAgICpAcHJvcGVydHkge051bWJlcn0gTk9ORVxuICAgICAqL1xuICAgIE5PTkU6IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBIb3Jpem9udGFsIExheW91dFxuICAgICAqICEjemgg5rC05bmz5biD5bGAXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhPUklaT05UQUxcbiAgICAgKi9cbiAgICBIT1JJWk9OVEFMOiAxLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBWZXJ0aWNhbCBMYXlvdXRcbiAgICAgKiAhI3poIOWeguebtOW4g+WxgFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBWRVJUSUNBTFxuICAgICAqL1xuICAgIFZFUlRJQ0FMOiAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gR3JpZCBMYXlvdXRcbiAgICAgKiAhI3poIOe9keagvOW4g+WxgFxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBHUklEXG4gICAgICovXG4gICAgR1JJRDogMyxcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgTGF5b3V0IFJlc2l6ZSBNb2RlXG4gKiAhI3poIOe8qeaUvuaooeW8j1xuICogQGVudW0gTGF5b3V0LlJlc2l6ZU1vZGVcbiAqL1xudmFyIFJlc2l6ZU1vZGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIERvbid0IGRvIGFueSBzY2FsZS5cbiAgICAgKiAhI3poIOS4jeWBmuS7u+S9lee8qeaUvlxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBOT05FXG4gICAgICovXG4gICAgTk9ORTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBjb250YWluZXIgc2l6ZSB3aWxsIGJlIGV4cGFuZGVkIHdpdGggaXRzIGNoaWxkcmVuJ3Mgc2l6ZS5cbiAgICAgKiAhI3poIOWuueWZqOeahOWkp+Wwj+S8muagueaNruWtkOiKgueCueeahOWkp+Wwj+iHquWKqOe8qeaUvuOAglxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBDT05UQUlORVJcbiAgICAgKi9cbiAgICBDT05UQUlORVI6IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBDaGlsZCBpdGVtIHNpemUgd2lsbCBiZSBhZGp1c3RlZCB3aXRoIHRoZSBjb250YWluZXIncyBzaXplLlxuICAgICAqICEjemgg5a2Q6IqC54K555qE5aSn5bCP5Lya6ZqP552A5a655Zmo55qE5aSn5bCP6Ieq5Yqo57yp5pS+44CCXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IENISUxEUkVOXG4gICAgICovXG4gICAgQ0hJTERSRU46IDJcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgR3JpZCBMYXlvdXQgc3RhcnQgYXhpcyBkaXJlY3Rpb24uXG4gKiBUaGUgaXRlbXMgaW4gZ3JpZCBsYXlvdXQgd2lsbCBiZSBhcnJhbmdlZCBpbiBlYWNoIGF4aXMgYXQgZmlyc3QuO1xuICogISN6aCDluIPlsYDovbTlkJHvvIzlj6rnlKjkuo4gR1JJRCDluIPlsYDjgIJcbiAqIEBlbnVtIExheW91dC5BeGlzRGlyZWN0aW9uXG4gKi9cbnZhciBBeGlzRGlyZWN0aW9uID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgaG9yaXpvbnRhbCBheGlzLlxuICAgICAqICEjemgg6L+b6KGM5rC05bmz5pa55ZCR5biD5bGAXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEhPUklaT05UQUxcbiAgICAgKi9cbiAgICBIT1JJWk9OVEFMOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHZlcnRpY2FsIGF4aXMuXG4gICAgICogISN6aCDov5vooYzlnoLnm7TmlrnlkJHluIPlsYBcbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gVkVSVElDQUxcbiAgICAgKi9cbiAgICBWRVJUSUNBTDogMSxcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgdmVydGljYWwgbGF5b3V0IGRpcmVjdGlvbi5cbiAqICBVc2VkIGluIEdyaWQgTGF5b3V0IHRvZ2V0aGVyIHdpdGggQXhpc0RpcmVjdGlvbiBpcyBWRVJUSUNBTFxuICogISN6aCDlnoLnm7TmlrnlkJHluIPlsYDmlrnlvI9cbiAqIEBlbnVtIExheW91dC5WZXJ0aWNhbERpcmVjdGlvblxuICovXG52YXIgVmVydGljYWxEaXJlY3Rpb24gPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIEl0ZW1zIGFycmFuZ2VkIGZyb20gYm90dG9tIHRvIHRvcC5cbiAgICAgKiAhI3poIOS7juS4i+WIsOS4iuaOkuWIl1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBCT1RUT01fVE9fVE9QXG4gICAgICovXG4gICAgQk9UVE9NX1RPX1RPUDogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIEl0ZW1zIGFycmFuZ2VkIGZyb20gdG9wIHRvIGJvdHRvbS5cbiAgICAgKiAhI3poIOS7juS4iuWIsOS4i+aOkuWIl1xuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUT1BfVE9fQk9UVE9NXG4gICAgICovXG4gICAgVE9QX1RPX0JPVFRPTTogMSxcbn0pO1xuXG4vKipcbiAqICEjZW4gRW51bSBmb3IgaG9yaXpvbnRhbCBsYXlvdXQgZGlyZWN0aW9uLlxuICogIFVzZWQgaW4gR3JpZCBMYXlvdXQgdG9nZXRoZXIgd2l0aCBBeGlzRGlyZWN0aW9uIGlzIEhPUklaT05UQUxcbiAqICEjemgg5rC05bmz5pa55ZCR5biD5bGA5pa55byPXG4gKiBAZW51bSBMYXlvdXQuSG9yaXpvbnRhbERpcmVjdGlvblxuICovXG52YXIgSG9yaXpvbnRhbERpcmVjdGlvbiA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gSXRlbXMgYXJyYW5nZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LlxuICAgICAqICEjemgg5LuO5bem5b6A5Y+z5o6S5YiXXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IExFRlRfVE9fUklHSFRcbiAgICAgKi9cbiAgICBMRUZUX1RPX1JJR0hUOiAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gSXRlbXMgYXJyYW5nZWQgZnJvbSByaWdodCB0byBsZWZ0LlxuICAgICAqICEjemgg5LuO5Y+z5b6A5bem5o6S5YiXXG4gICAgICpAcHJvcGVydHkge051bWJlcn0gUklHSFRfVE9fTEVGVFxuICAgICAqL1xuICAgIFJJR0hUX1RPX0xFRlQ6IDEsXG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgTGF5b3V0IGlzIGEgY29udGFpbmVyIGNvbXBvbmVudCwgdXNlIGl0IHRvIGFycmFuZ2UgY2hpbGQgZWxlbWVudHMgZWFzaWx5Ljxicj5cbiAqIE5vdGXvvJo8YnI+XG4gKiAxLlNjYWxpbmcgYW5kIHJvdGF0aW9uIG9mIGNoaWxkIG5vZGVzIGFyZSBub3QgY29uc2lkZXJlZC48YnI+XG4gKiAyLkFmdGVyIHNldHRpbmcgdGhlIExheW91dCwgdGhlIHJlc3VsdHMgbmVlZCB0byBiZSB1cGRhdGVkIHVudGlsIHRoZSBuZXh0IGZyYW1lLFxuICogdW5sZXNzIHlvdSBtYW51YWxseSBjYWxsIHt7I2Nyb3NzTGluayBcIkxheW91dC91cGRhdGVMYXlvdXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua31944CCXG4gKiAhI3poXG4gKiBMYXlvdXQg57uE5Lu255u45b2T5LqO5LiA5Liq5a655Zmo77yM6IO96Ieq5Yqo5a+55a6D55qE5omA5pyJ5a2Q6IqC54K56L+b6KGM57uf5LiA5o6S54mI44CCPGJyPlxuICog5rOo5oSP77yaPGJyPlxuICogMS7kuI3kvJrogIPomZHlrZDoioLngrnnmoTnvKnmlL7lkozml4vovazjgII8YnI+XG4gKiAyLuWvuSBMYXlvdXQg6K6+572u5ZCO57uT5p6c6ZyA6KaB5Yiw5LiL5LiA5bin5omN5Lya5pu05paw77yM6Zmk6Z2e5L2g6K6+572u5a6M5Lul5ZCO5omL5Yqo6LCD55SoIHt7I2Nyb3NzTGluayBcIkxheW91dC91cGRhdGVMYXlvdXQ6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua31944CCXG4gKiBAY2xhc3MgTGF5b3V0XG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcbiAqL1xudmFyIExheW91dCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuTGF5b3V0JyxcbiAgICBleHRlbmRzOiByZXF1aXJlKCcuL0NDQ29tcG9uZW50JyksXG5cbiAgICBlZGl0b3I6IENDX0VESVRPUiAmJiB7XG4gICAgICAgIG1lbnU6ICdpMThuOk1BSU5fTUVOVS5jb21wb25lbnQudWkvTGF5b3V0JyxcbiAgICAgICAgaGVscDogJ2kxOG46Q09NUE9ORU5ULmhlbHBfdXJsLmxheW91dCcsXG4gICAgICAgIGluc3BlY3RvcjogJ3BhY2thZ2VzOi8vaW5zcGVjdG9yL2luc3BlY3RvcnMvY29tcHMvY2NsYXlvdXQuanMnLFxuICAgICAgICBleGVjdXRlSW5FZGl0TW9kZTogdHJ1ZSxcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbGF5b3V0U2l6ZTogY2Muc2l6ZSgzMDAsIDIwMCksXG4gICAgICAgIF9sYXlvdXREaXJ0eToge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIHNlcmlhbGl6YWJsZTogZmFsc2UsXG4gICAgICAgIH0sXG5cbiAgICAgICAgX3Jlc2l6ZTogUmVzaXplTW9kZS5OT05FLFxuXG4gICAgICAgIC8vVE9ETzogcmVmYWN0b3JpbmcgdGhpcyBuYW1lIGFmdGVyIGRhdGEgdXBncmFkZSBtYWNoYW5pc20gaXMgb3V0LlxuICAgICAgICBfTiRsYXlvdXRUeXBlOiBUeXBlLk5PTkUsXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBsYXlvdXQgdHlwZS5cbiAgICAgICAgICogISN6aCDluIPlsYDnsbvlnotcbiAgICAgICAgICogQHByb3BlcnR5IHtMYXlvdXQuVHlwZX0gdHlwZVxuICAgICAgICAgKiBAZGVmYXVsdCBMYXlvdXQuVHlwZS5OT05FXG4gICAgICAgICAqL1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICB0eXBlOiBUeXBlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX04kbGF5b3V0VHlwZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX04kbGF5b3V0VHlwZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiB0aGlzLnR5cGUgIT09IFR5cGUuTk9ORSAmJiB0aGlzLl9yZXNpemUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZUxheW91dGVkID0gX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfTGF5b3V0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVMYXlvdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5sYXlvdXRfdHlwZScsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgfSxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBhcmUgdGhyZWUgcmVzaXplIG1vZGVzIGZvciBMYXlvdXQuXG4gICAgICAgICAqIE5vbmUsIHJlc2l6ZSBDb250YWluZXIgYW5kIHJlc2l6ZSBjaGlsZHJlbi5cbiAgICAgICAgICogISN6aCDnvKnmlL7mqKHlvI9cbiAgICAgICAgICogQHByb3BlcnR5IHtMYXlvdXQuUmVzaXplTW9kZX0gcmVzaXplTW9kZVxuICAgICAgICAgKiBAZGVmYXVsdCBSZXNpemVNb2RlLk5PTkVcbiAgICAgICAgICovXG4gICAgICAgIHJlc2l6ZU1vZGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFJlc2l6ZU1vZGUsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5yZXNpemVfbW9kZScsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZXNpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBUeXBlLk5PTkUgJiYgdmFsdWUgPT09IFJlc2l6ZU1vZGUuQ0hJTERSRU4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiYgdmFsdWUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZUxheW91dGVkID0gX1NjZW5lLkRldGVjdENvbmZsaWN0LmNoZWNrQ29uZmxpY3RfTGF5b3V0KHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVMYXlvdXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGNlbGwgc2l6ZSBmb3IgZ3JpZCBsYXlvdXQuXG4gICAgICAgICAqICEjemgg5q+P5Liq5qC85a2Q55qE5aSn5bCP77yM5Y+q5pyJ5biD5bGA57G75Z6L5Li6IEdSSUQg55qE5pe25YCZ5omN5pyJ5pWI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2l6ZX0gY2VsbFNpemVcbiAgICAgICAgICogQGRlZmF1bHQgY2Muc2l6ZSg0MCwgNDApXG4gICAgICAgICAqL1xuICAgICAgICBjZWxsU2l6ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogY2Muc2l6ZSg0MCwgNDApLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQuY2VsbF9zaXplJyxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNpemUsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIFRoZSBzdGFydCBheGlzIGZvciBncmlkIGxheW91dC4gSWYgeW91IGNob29zZSBob3Jpem9udGFsLCB0aGVuIGNoaWxkcmVuIHdpbGwgbGF5b3V0IGhvcml6b250YWxseSBhdCBmaXJzdCxcbiAgICAgICAgICogYW5kIHRoZW4gYnJlYWsgbGluZSBvbiBkZW1hbmQuIENob29zZSB2ZXJ0aWNhbCBpZiB5b3Ugd2FudCB0byBsYXlvdXQgdmVydGljYWxseSBhdCBmaXJzdCAuXG4gICAgICAgICAqICEjemgg6LW35aeL6L205pa55ZCR57G75Z6L77yM5Y+v6L+b6KGM5rC05bmz5ZKM5Z6C55u05biD5bGA5o6S5YiX77yM5Y+q5pyJ5biD5bGA57G75Z6L5Li6IEdSSUQg55qE5pe25YCZ5omN5pyJ5pWI44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TGF5b3V0LkF4aXNEaXJlY3Rpb259IHN0YXJ0QXhpc1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhcnRBeGlzOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBBeGlzRGlyZWN0aW9uLkhPUklaT05UQUwsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5zdGFydF9heGlzJyxcbiAgICAgICAgICAgIHR5cGU6IEF4aXNEaXJlY3Rpb24sXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmIHRoaXMuX3Jlc2l6ZSA9PT0gUmVzaXplTW9kZS5DT05UQUlORVIgJiYgIWNjLmVuZ2luZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlTGF5b3V0ZWQgPSBfU2NlbmUuRGV0ZWN0Q29uZmxpY3QuY2hlY2tDb25mbGljdF9MYXlvdXQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZUxheW91dGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGxlZnQgcGFkZGluZyBvZiBsYXlvdXQsIGl0IG9ubHkgZWZmZWN0IHRoZSBsYXlvdXQgaW4gb25lIGRpcmVjdGlvbi5cbiAgICAgICAgICogISN6aCDlrrnlmajlhoXlt6bovrnot53vvIzlj6rkvJrlnKjkuIDkuKrluIPlsYDmlrnlkJHkuIrnlJ/mlYjjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHBhZGRpbmdMZWZ0XG4gICAgICAgICAqL1xuICAgICAgICBwYWRkaW5nTGVmdDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnBhZGRpbmdfbGVmdCcsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSByaWdodCBwYWRkaW5nIG9mIGxheW91dCwgaXQgb25seSBlZmZlY3QgdGhlIGxheW91dCBpbiBvbmUgZGlyZWN0aW9uLlxuICAgICAgICAgKiAhI3poIOWuueWZqOWGheWPs+i+uei3ne+8jOWPquS8muWcqOS4gOS4quW4g+WxgOaWueWQkeS4iueUn+aViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFkZGluZ1JpZ2h0XG4gICAgICAgICAqL1xuICAgICAgICBwYWRkaW5nUmlnaHQ6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5wYWRkaW5nX3JpZ2h0JyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHRvcCBwYWRkaW5nIG9mIGxheW91dCwgaXQgb25seSBlZmZlY3QgdGhlIGxheW91dCBpbiBvbmUgZGlyZWN0aW9uLlxuICAgICAgICAgKiAhI3poIOWuueWZqOWGheS4iui+uei3ne+8jOWPquS8muWcqOS4gOS4quW4g+WxgOaWueWQkeS4iueUn+aViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFkZGluZ1RvcFxuICAgICAgICAgKi9cbiAgICAgICAgcGFkZGluZ1RvcDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnBhZGRpbmdfdG9wJyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGJvdHRvbSBwYWRkaW5nIG9mIGxheW91dCwgaXQgb25seSBlZmZlY3QgdGhlIGxheW91dCBpbiBvbmUgZGlyZWN0aW9uLlxuICAgICAgICAgKiAhI3poIOWuueWZqOWGheS4i+i+uei3ne+8jOWPquS8muWcqOS4gOS4quW4g+WxgOaWueWQkeS4iueUn+aViOOAglxuICAgICAgICAgKiBAcHJvcGVydHkge051bWJlcn0gcGFkZGluZ0JvdHRvbVxuICAgICAgICAgKi9cbiAgICAgICAgcGFkZGluZ0JvdHRvbToge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnBhZGRpbmdfYm90dG9tJyxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGRpc3RhbmNlIGluIHgtYXhpcyBiZXR3ZWVuIGVhY2ggZWxlbWVudCBpbiBsYXlvdXQuXG4gICAgICAgICAqICEjemgg5a2Q6IqC54K55LmL6Ze055qE5rC05bmz6Ze06Led44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBzcGFjaW5nWFxuICAgICAgICAgKi9cbiAgICAgICAgc3BhY2luZ1g6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQuc3BhY2VfeCdcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgZGlzdGFuY2UgaW4geS1heGlzIGJldHdlZW4gZWFjaCBlbGVtZW50IGluIGxheW91dC5cbiAgICAgICAgICogISN6aCDlrZDoioLngrnkuYvpl7TnmoTlnoLnm7Tpl7Tot53jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IHNwYWNpbmdZXG4gICAgICAgICAqL1xuICAgICAgICBzcGFjaW5nWToge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIG5vdGlmeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b29sdGlwOiBDQ19ERVYgJiYgJ2kxOG46Q09NUE9ORU5ULmxheW91dC5zcGFjZV95J1xuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE9ubHkgdGFrZSBlZmZlY3QgaW4gVmVydGljYWwgbGF5b3V0IG1vZGUuXG4gICAgICAgICAqIFRoaXMgb3B0aW9uIGNoYW5nZXMgdGhlIHN0YXJ0IGVsZW1lbnQncyBwb3NpdGlvbmluZy5cbiAgICAgICAgICogISN6aCDlnoLnm7TmjpLliJflrZDoioLngrnnmoTmlrnlkJHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtMYXlvdXQuVmVydGljYWxEaXJlY3Rpb259IHZlcnRpY2FsRGlyZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB2ZXJ0aWNhbERpcmVjdGlvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSxcbiAgICAgICAgICAgIHR5cGU6IFZlcnRpY2FsRGlyZWN0aW9uLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0LnZlcnRpY2FsX2RpcmVjdGlvbicsXG4gICAgICAgICAgICBhbmltYXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIE9ubHkgdGFrZSBlZmZlY3QgaW4gSG9yaXpvbnRhbCBsYXlvdXQgbW9kZS5cbiAgICAgICAgICogVGhpcyBvcHRpb24gY2hhbmdlcyB0aGUgc3RhcnQgZWxlbWVudCdzIHBvc2l0aW9uaW5nLlxuICAgICAgICAgKiAhI3poIOawtOW5s+aOkuWIl+WtkOiKgueCueeahOaWueWQkeOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0xheW91dC5Ib3Jpem9udGFsRGlyZWN0aW9ufSBob3Jpem9udGFsRGlyZWN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBob3Jpem9udGFsRGlyZWN0aW9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBIb3Jpem9udGFsRGlyZWN0aW9uLkxFRlRfVE9fUklHSFQsXG4gICAgICAgICAgICB0eXBlOiBIb3Jpem9udGFsRGlyZWN0aW9uLFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRvb2x0aXA6IENDX0RFViAmJiAnaTE4bjpDT01QT05FTlQubGF5b3V0Lmhvcml6b250YWxfZGlyZWN0aW9uJyxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQWRqdXN0IHRoZSBsYXlvdXQgaWYgdGhlIGNoaWxkcmVuIHNjYWxlZC5cbiAgICAgICAgICogISN6aCDlrZDoioLngrnnvKnmlL7mr5TkvovmmK/lkKblvbHlk43luIPlsYDjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGFmZmVjdGVkQnlTY2FsZVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgICovXG4gICAgICAgIGFmZmVjdGVkQnlTY2FsZToge1xuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBldmVyeSB0aW1lIHlvdSBzd2l0Y2ggdGhpcyBzdGF0ZSwgdGhlIGxheW91dCB3aWxsIGJlIGNhbGN1bGF0ZWQuXG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuaW1hdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9vbHRpcDogQ0NfREVWICYmICdpMThuOkNPTVBPTkVOVC5sYXlvdXQuYWZmZWN0ZWRfYnlfc2NhbGUnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBUeXBlOiBUeXBlLFxuICAgICAgICBWZXJ0aWNhbERpcmVjdGlvbjogVmVydGljYWxEaXJlY3Rpb24sXG4gICAgICAgIEhvcml6b250YWxEaXJlY3Rpb246IEhvcml6b250YWxEaXJlY3Rpb24sXG4gICAgICAgIFJlc2l6ZU1vZGU6IFJlc2l6ZU1vZGUsXG4gICAgICAgIEF4aXNEaXJlY3Rpb246IEF4aXNEaXJlY3Rpb24sXG4gICAgfSxcblxuICAgIG9uRW5hYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2FkZEV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICAgICAgaWYgKHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLmVxdWFscyhjYy5zaXplKDAsIDApKSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKHRoaXMuX2xheW91dFNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgIH0sXG5cbiAgICBvbkRpc2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9LFxuXG4gICAgX2RvTGF5b3V0RGlydHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBfZG9TY2FsZURpcnR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xheW91dERpcnR5ID0gdGhpcy5fbGF5b3V0RGlydHkgfHwgdGhpcy5hZmZlY3RlZEJ5U2NhbGU7XG4gICAgfSxcblxuICAgIF9hZGRFdmVudExpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHRoaXMudXBkYXRlTGF5b3V0LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX3Jlc2l6ZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oTm9kZUV2ZW50LkFOQ0hPUl9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKE5vZGVFdmVudC5DSElMRF9BRERFRCwgdGhpcy5fY2hpbGRBZGRlZCwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihOb2RlRXZlbnQuQ0hJTERfUkVNT1ZFRCwgdGhpcy5fY2hpbGRSZW1vdmVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKE5vZGVFdmVudC5DSElMRF9SRU9SREVSLCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYWRkQ2hpbGRyZW5FdmVudExpc3RlbmVycygpO1xuICAgIH0sXG5cbiAgICBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy51cGRhdGVMYXlvdXQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX3Jlc2l6ZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub2ZmKE5vZGVFdmVudC5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vZmYoTm9kZUV2ZW50LkNISUxEX0FEREVELCB0aGlzLl9jaGlsZEFkZGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihOb2RlRXZlbnQuQ0hJTERfUkVNT1ZFRCwgdGhpcy5fY2hpbGRSZW1vdmVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9mZihOb2RlRXZlbnQuQ0hJTERfUkVPUkRFUiwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUNoaWxkcmVuRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9LFxuXG4gICAgX2FkZENoaWxkcmVuRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkLm9uKE5vZGVFdmVudC5TQ0FMRV9DSEFOR0VELCB0aGlzLl9kb1NjYWxlRGlydHksIHRoaXMpO1xuICAgICAgICAgICAgY2hpbGQub24oTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xuICAgICAgICAgICAgY2hpbGQub24oJ2FjdGl2ZS1pbi1oaWVyYXJjaHktY2hhbmdlZCcsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yZW1vdmVDaGlsZHJlbkV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2RvU2NhbGVEaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlNJWkVfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xuICAgICAgICAgICAgY2hpbGQub2ZmKE5vZGVFdmVudC5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgICAgICBjaGlsZC5vZmYoJ2FjdGl2ZS1pbi1oaWVyYXJjaHktY2hhbmdlZCcsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGlsZEFkZGVkOiBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgY2hpbGQub24oTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2RvU2NhbGVEaXJ0eSwgdGhpcyk7XG4gICAgICAgIGNoaWxkLm9uKE5vZGVFdmVudC5TSVpFX0NIQU5HRUQsIHRoaXMuX2RvTGF5b3V0RGlydHksIHRoaXMpO1xuICAgICAgICBjaGlsZC5vbihOb2RlRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgIGNoaWxkLm9uKE5vZGVFdmVudC5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgIGNoaWxkLm9uKCdhY3RpdmUtaW4taGllcmFyY2h5LWNoYW5nZWQnLCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9kb0xheW91dERpcnR5KCk7XG4gICAgfSxcblxuICAgIF9jaGlsZFJlbW92ZWQ6IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICBjaGlsZC5vZmYoTm9kZUV2ZW50LlNDQUxFX0NIQU5HRUQsIHRoaXMuX2RvU2NhbGVEaXJ0eSwgdGhpcyk7XG4gICAgICAgIGNoaWxkLm9mZihOb2RlRXZlbnQuU0laRV9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcbiAgICAgICAgY2hpbGQub2ZmKE5vZGVFdmVudC5QT1NJVElPTl9DSEFOR0VELCB0aGlzLl9kb0xheW91dERpcnR5LCB0aGlzKTtcbiAgICAgICAgY2hpbGQub2ZmKE5vZGVFdmVudC5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG4gICAgICAgIGNoaWxkLm9mZignYWN0aXZlLWluLWhpZXJhcmNoeS1jaGFuZ2VkJywgdGhpcy5fZG9MYXlvdXREaXJ0eSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fZG9MYXlvdXREaXJ0eSgpO1xuICAgIH0sXG5cbiAgICBfcmVzaXplZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9sYXlvdXRTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIHRoaXMuX2RvTGF5b3V0RGlydHkoKTtcbiAgICB9LFxuXG4gICAgX2RvTGF5b3V0SG9yaXpvbnRhbGx5OiBmdW5jdGlvbiAoYmFzZVdpZHRoLCByb3dCcmVhaywgZm5Qb3NpdGlvblksIGFwcGx5Q2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIGxheW91dEFuY2hvciA9IHRoaXMubm9kZS5nZXRBbmNob3JQb2ludCgpO1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgdmFyIHNpZ24gPSAxO1xuICAgICAgICB2YXIgcGFkZGluZ1ggPSB0aGlzLnBhZGRpbmdMZWZ0O1xuICAgICAgICB2YXIgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAtbGF5b3V0QW5jaG9yLnggKiBiYXNlV2lkdGg7XG4gICAgICAgIGlmICh0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24uUklHSFRfVE9fTEVGVCkge1xuICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAoMSAtIGxheW91dEFuY2hvci54KSAqIGJhc2VXaWR0aDtcbiAgICAgICAgICAgIHBhZGRpbmdYID0gdGhpcy5wYWRkaW5nUmlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV4dFggPSBsZWZ0Qm91bmRhcnlPZkxheW91dCArIHNpZ24gKiBwYWRkaW5nWCAtIHNpZ24gKiB0aGlzLnNwYWNpbmdYO1xuICAgICAgICB2YXIgcm93TWF4SGVpZ2h0ID0gMDtcbiAgICAgICAgdmFyIHRlbXBNYXhIZWlnaHQgPSAwO1xuICAgICAgICB2YXIgc2Vjb25kTWF4SGVpZ2h0ID0gMDtcbiAgICAgICAgdmFyIHJvdyA9IDA7XG4gICAgICAgIHZhciBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IDA7XG5cbiAgICAgICAgdmFyIG1heEhlaWdodENoaWxkQW5jaG9yWSA9IDA7XG5cbiAgICAgICAgdmFyIGFjdGl2ZUNoaWxkQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZC5hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgICAgIGFjdGl2ZUNoaWxkQ291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdDaGlsZFdpZHRoID0gdGhpcy5jZWxsU2l6ZS53aWR0aDtcbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gVHlwZS5HUklEICYmIHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DSElMRFJFTikge1xuICAgICAgICAgICAgbmV3Q2hpbGRXaWR0aCA9IChiYXNlV2lkdGggLSAodGhpcy5wYWRkaW5nTGVmdCArIHRoaXMucGFkZGluZ1JpZ2h0KSAtIChhY3RpdmVDaGlsZENvdW50IC0gMSkgKiB0aGlzLnNwYWNpbmdYKSAvIGFjdGl2ZUNoaWxkQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCBjaGlsZFNjYWxlWCA9IHRoaXMuX2dldFVzZWRTY2FsZVZhbHVlKGNoaWxkLnNjYWxlWCk7XG4gICAgICAgICAgICBsZXQgY2hpbGRTY2FsZVkgPSB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVkpO1xuICAgICAgICAgICAgaWYgKCFjaGlsZC5hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9mb3IgcmVzaXppbmcgY2hpbGRyZW5cbiAgICAgICAgICAgIGlmICh0aGlzLl9yZXNpemUgPT09IFJlc2l6ZU1vZGUuQ0hJTERSRU4pIHtcbiAgICAgICAgICAgICAgICBjaGlsZC53aWR0aCA9IG5ld0NoaWxkV2lkdGggLyBjaGlsZFNjYWxlWDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBUeXBlLkdSSUQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuaGVpZ2h0ID0gdGhpcy5jZWxsU2l6ZS5oZWlnaHQgLyBjaGlsZFNjYWxlWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhbmNob3JYID0gY2hpbGQuYW5jaG9yWDtcbiAgICAgICAgICAgIHZhciBjaGlsZEJvdW5kaW5nQm94V2lkdGggPSBjaGlsZC53aWR0aCAqIGNoaWxkU2NhbGVYO1xuICAgICAgICAgICAgdmFyIGNoaWxkQm91bmRpbmdCb3hIZWlnaHQgPSBjaGlsZC5oZWlnaHQgKiBjaGlsZFNjYWxlWTtcblxuICAgICAgICAgICAgaWYgKHNlY29uZE1heEhlaWdodCA+IHRlbXBNYXhIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0ZW1wTWF4SGVpZ2h0ID0gc2Vjb25kTWF4SGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2hpbGRCb3VuZGluZ0JveEhlaWdodCA+PSB0ZW1wTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kTWF4SGVpZ2h0ID0gdGVtcE1heEhlaWdodDtcbiAgICAgICAgICAgICAgICB0ZW1wTWF4SGVpZ2h0ID0gY2hpbGRCb3VuZGluZ0JveEhlaWdodDtcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHRDaGlsZEFuY2hvclkgPSBjaGlsZC5nZXRBbmNob3JQb2ludCgpLnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhvcml6b250YWxEaXJlY3Rpb24gPT09IEhvcml6b250YWxEaXJlY3Rpb24uUklHSFRfVE9fTEVGVCkge1xuICAgICAgICAgICAgICAgIGFuY2hvclggPSAxIC0gY2hpbGQuYW5jaG9yWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRYID0gbmV4dFggKyBzaWduICogYW5jaG9yWCAqIGNoaWxkQm91bmRpbmdCb3hXaWR0aCArIHNpZ24gKiB0aGlzLnNwYWNpbmdYO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Qm91bmRhcnlPZkNoaWxkID0gc2lnbiAqICgxIC0gYW5jaG9yWCkgKiBjaGlsZEJvdW5kaW5nQm94V2lkdGg7XG5cbiAgICAgICAgICAgIGlmIChyb3dCcmVhaykge1xuICAgICAgICAgICAgICAgIHZhciByb3dCcmVha0JvdW5kYXJ5ID0gbmV4dFggKyByaWdodEJvdW5kYXJ5T2ZDaGlsZCArIHNpZ24gKiAoc2lnbiA+IDAgPyB0aGlzLnBhZGRpbmdSaWdodCA6IHRoaXMucGFkZGluZ0xlZnQpO1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0VG9SaWdodFJvd0JyZWFrID0gdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLkxFRlRfVE9fUklHSFQgJiYgcm93QnJlYWtCb3VuZGFyeSA+ICgxIC0gbGF5b3V0QW5jaG9yLngpICogYmFzZVdpZHRoO1xuICAgICAgICAgICAgICAgIHZhciByaWdodFRvTGVmdFJvd0JyZWFrID0gdGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQgJiYgcm93QnJlYWtCb3VuZGFyeSA8IC1sYXlvdXRBbmNob3IueCAqIGJhc2VXaWR0aDtcblxuICAgICAgICAgICAgICAgIGlmIChsZWZ0VG9SaWdodFJvd0JyZWFrIHx8IHJpZ2h0VG9MZWZ0Um93QnJlYWspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRCb3VuZGluZ0JveEhlaWdodCA+PSB0ZW1wTWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Vjb25kTWF4SGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kTWF4SGVpZ2h0ID0gdGVtcE1heEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd01heEhlaWdodCArPSBzZWNvbmRNYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRNYXhIZWlnaHQgPSB0ZW1wTWF4SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93TWF4SGVpZ2h0ICs9IHRlbXBNYXhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRNYXhIZWlnaHQgPSBjaGlsZEJvdW5kaW5nQm94SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE1heEhlaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV4dFggPSBsZWZ0Qm91bmRhcnlPZkxheW91dCArIHNpZ24gKiAocGFkZGluZ1ggKyBhbmNob3JYICogY2hpbGRCb3VuZGluZ0JveFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgcm93Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZmluYWxQb3NpdGlvblkgPSBmblBvc2l0aW9uWShjaGlsZCwgcm93TWF4SGVpZ2h0LCByb3cpO1xuICAgICAgICAgICAgaWYgKGJhc2VXaWR0aCA+PSAoY2hpbGRCb3VuZGluZ0JveFdpZHRoICsgdGhpcy5wYWRkaW5nTGVmdCArIHRoaXMucGFkZGluZ1JpZ2h0KSkge1xuICAgICAgICAgICAgICAgIGlmIChhcHBseUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnNldFBvc2l0aW9uKGNjLnYyKG5leHRYLCBmaW5hbFBvc2l0aW9uWSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHNpZ25YID0gMTtcbiAgICAgICAgICAgIHZhciB0ZW1wRmluYWxQb3NpdGlvblk7XG4gICAgICAgICAgICB2YXIgdG9wTWFyaWduID0gKHRlbXBNYXhIZWlnaHQgPT09IDApID8gY2hpbGRCb3VuZGluZ0JveEhlaWdodCA6IHRlbXBNYXhIZWlnaHQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSBjb250YWluZXJSZXNpemVCb3VuZGFyeSB8fCB0aGlzLm5vZGUuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICBzaWduWCA9IC0xO1xuICAgICAgICAgICAgICAgIHRlbXBGaW5hbFBvc2l0aW9uWSA9IGZpbmFsUG9zaXRpb25ZICsgc2lnblggKiAodG9wTWFyaWduICogbWF4SGVpZ2h0Q2hpbGRBbmNob3JZICsgdGhpcy5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgICAgICAgICBpZiAodGVtcEZpbmFsUG9zaXRpb25ZIDwgY29udGFpbmVyUmVzaXplQm91bmRhcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSB0ZW1wRmluYWxQb3NpdGlvblk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyUmVzaXplQm91bmRhcnkgPSBjb250YWluZXJSZXNpemVCb3VuZGFyeSB8fCAtdGhpcy5ub2RlLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGVtcEZpbmFsUG9zaXRpb25ZID0gZmluYWxQb3NpdGlvblkgKyBzaWduWCAqICh0b3BNYXJpZ24gKiBtYXhIZWlnaHRDaGlsZEFuY2hvclkgKyB0aGlzLnBhZGRpbmdUb3ApO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wRmluYWxQb3NpdGlvblkgPiBjb250YWluZXJSZXNpemVCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IHRlbXBGaW5hbFBvc2l0aW9uWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHRYICs9IHJpZ2h0Qm91bmRhcnlPZkNoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5O1xuICAgIH0sXG5cbiAgICBfZ2V0VmVydGljYWxCYXNlSGVpZ2h0OiBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIG5ld0hlaWdodCA9IDA7XG4gICAgICAgIHZhciBhY3RpdmVDaGlsZENvdW50ID0gMDtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DT05UQUlORVIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2hpbGRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBuZXdIZWlnaHQgKz0gY2hpbGQuaGVpZ2h0ICogdGhpcy5fZ2V0VXNlZFNjYWxlVmFsdWUoY2hpbGQuc2NhbGVZKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ld0hlaWdodCArPSAoYWN0aXZlQ2hpbGRDb3VudCAtIDEpICogdGhpcy5zcGFjaW5nWSArIHRoaXMucGFkZGluZ0JvdHRvbSArIHRoaXMucGFkZGluZ1RvcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3SGVpZ2h0O1xuICAgIH0sXG5cbiAgICBfZG9MYXlvdXRWZXJ0aWNhbGx5OiBmdW5jdGlvbiAoYmFzZUhlaWdodCwgY29sdW1uQnJlYWssIGZuUG9zaXRpb25YLCBhcHBseUNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBsYXlvdXRBbmNob3IgPSB0aGlzLm5vZGUuZ2V0QW5jaG9yUG9pbnQoKTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xuXG4gICAgICAgIHZhciBzaWduID0gMTtcbiAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nQm90dG9tO1xuICAgICAgICB2YXIgYm90dG9tQm91bmRhcnlPZkxheW91dCA9IC1sYXlvdXRBbmNob3IueSAqIGJhc2VIZWlnaHQ7XG4gICAgICAgIGlmICh0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NKSB7XG4gICAgICAgICAgICBzaWduID0gLTE7XG4gICAgICAgICAgICBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gKDEgLSBsYXlvdXRBbmNob3IueSkgKiBiYXNlSGVpZ2h0O1xuICAgICAgICAgICAgcGFkZGluZ1kgPSB0aGlzLnBhZGRpbmdUb3A7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV4dFkgPSBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ICsgc2lnbiAqIHBhZGRpbmdZIC0gc2lnbiAqIHRoaXMuc3BhY2luZ1k7XG4gICAgICAgIHZhciBjb2x1bW5NYXhXaWR0aCA9IDA7XG4gICAgICAgIHZhciB0ZW1wTWF4V2lkdGggPSAwO1xuICAgICAgICB2YXIgc2Vjb25kTWF4V2lkdGggPSAwO1xuICAgICAgICB2YXIgY29sdW1uID0gMDtcbiAgICAgICAgdmFyIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gMDtcbiAgICAgICAgdmFyIG1heFdpZHRoQ2hpbGRBbmNob3JYID0gMDtcblxuICAgICAgICB2YXIgYWN0aXZlQ2hpbGRDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkLmFjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlQ2hpbGRDb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0NoaWxkSGVpZ2h0ID0gdGhpcy5jZWxsU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09IFR5cGUuR1JJRCAmJiB0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ0hJTERSRU4pIHtcbiAgICAgICAgICAgIG5ld0NoaWxkSGVpZ2h0ID0gKGJhc2VIZWlnaHQgLSAodGhpcy5wYWRkaW5nVG9wICsgdGhpcy5wYWRkaW5nQm90dG9tKSAtIChhY3RpdmVDaGlsZENvdW50IC0gMSkgKiB0aGlzLnNwYWNpbmdZKSAvIGFjdGl2ZUNoaWxkQ291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGxldCBjaGlsZFNjYWxlWCA9IHRoaXMuX2dldFVzZWRTY2FsZVZhbHVlKGNoaWxkLnNjYWxlWCk7XG4gICAgICAgICAgICBsZXQgY2hpbGRTY2FsZVkgPSB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVkpO1xuICAgICAgICAgICAgaWYgKCFjaGlsZC5hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL2ZvciByZXNpemluZyBjaGlsZHJlblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DSElMRFJFTikge1xuICAgICAgICAgICAgICAgIGNoaWxkLmhlaWdodCA9IG5ld0NoaWxkSGVpZ2h0IC8gY2hpbGRTY2FsZVk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gVHlwZS5HUklEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLndpZHRoID0gdGhpcy5jZWxsU2l6ZS53aWR0aCAvIGNoaWxkU2NhbGVYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFuY2hvclkgPSBjaGlsZC5hbmNob3JZO1xuICAgICAgICAgICAgdmFyIGNoaWxkQm91bmRpbmdCb3hXaWR0aCA9IGNoaWxkLndpZHRoICogY2hpbGRTY2FsZVg7XG4gICAgICAgICAgICB2YXIgY2hpbGRCb3VuZGluZ0JveEhlaWdodCA9IGNoaWxkLmhlaWdodCAqIGNoaWxkU2NhbGVZO1xuXG4gICAgICAgICAgICBpZiAoc2Vjb25kTWF4V2lkdGggPiB0ZW1wTWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0ZW1wTWF4V2lkdGggPSBzZWNvbmRNYXhXaWR0aDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNoaWxkQm91bmRpbmdCb3hXaWR0aCA+PSB0ZW1wTWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzZWNvbmRNYXhXaWR0aCA9IHRlbXBNYXhXaWR0aDtcbiAgICAgICAgICAgICAgICB0ZW1wTWF4V2lkdGggPSBjaGlsZEJvdW5kaW5nQm94V2lkdGg7XG4gICAgICAgICAgICAgICAgbWF4V2lkdGhDaGlsZEFuY2hvclggPSBjaGlsZC5nZXRBbmNob3JQb2ludCgpLng7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZlcnRpY2FsRGlyZWN0aW9uID09PSBWZXJ0aWNhbERpcmVjdGlvbi5UT1BfVE9fQk9UVE9NKSB7XG4gICAgICAgICAgICAgICAgYW5jaG9yWSA9IDEgLSBjaGlsZC5hbmNob3JZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dFkgPSBuZXh0WSArIHNpZ24gKiBhbmNob3JZICogY2hpbGRCb3VuZGluZ0JveEhlaWdodCArIHNpZ24gKiB0aGlzLnNwYWNpbmdZO1xuICAgICAgICAgICAgdmFyIHRvcEJvdW5kYXJ5T2ZDaGlsZCA9IHNpZ24gKiAoMSAtIGFuY2hvclkpICogY2hpbGRCb3VuZGluZ0JveEhlaWdodDtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbkJyZWFrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbHVtbkJyZWFrQm91bmRhcnkgPSBuZXh0WSArIHRvcEJvdW5kYXJ5T2ZDaGlsZCArIHNpZ24gKiAoc2lnbiA+IDAgPyB0aGlzLnBhZGRpbmdUb3AgOiB0aGlzLnBhZGRpbmdCb3R0b20pO1xuICAgICAgICAgICAgICAgIHZhciBib3R0b21Ub1RvcENvbHVtbkJyZWFrID0gdGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uQk9UVE9NX1RPX1RPUCAmJiBjb2x1bW5CcmVha0JvdW5kYXJ5ID4gKDEgLSBsYXlvdXRBbmNob3IueSkgKiBiYXNlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciB0b3BUb0JvdHRvbUNvbHVtbkJyZWFrID0gdGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSAmJiBjb2x1bW5CcmVha0JvdW5kYXJ5IDwgLWxheW91dEFuY2hvci55ICogYmFzZUhlaWdodDtcblxuICAgICAgICAgICAgICAgIGlmIChib3R0b21Ub1RvcENvbHVtbkJyZWFrIHx8IHRvcFRvQm90dG9tQ29sdW1uQnJlYWspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkQm91bmRpbmdCb3hXaWR0aCA+PSB0ZW1wTWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWNvbmRNYXhXaWR0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZE1heFdpZHRoID0gdGVtcE1heFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTWF4V2lkdGggKz0gc2Vjb25kTWF4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRNYXhXaWR0aCA9IHRlbXBNYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1heFdpZHRoICs9IHRlbXBNYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZE1heFdpZHRoID0gY2hpbGRCb3VuZGluZ0JveFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcE1heFdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXh0WSA9IGJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQgKyBzaWduICogKHBhZGRpbmdZICsgYW5jaG9yWSAqIGNoaWxkQm91bmRpbmdCb3hIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBmaW5hbFBvc2l0aW9uWCA9IGZuUG9zaXRpb25YKGNoaWxkLCBjb2x1bW5NYXhXaWR0aCwgY29sdW1uKTtcbiAgICAgICAgICAgIGlmIChiYXNlSGVpZ2h0ID49IChjaGlsZEJvdW5kaW5nQm94SGVpZ2h0ICsgKHRoaXMucGFkZGluZ1RvcCArIHRoaXMucGFkZGluZ0JvdHRvbSkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFwcGx5Q2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQuc2V0UG9zaXRpb24oY2MudjIoZmluYWxQb3NpdGlvblgsIG5leHRZKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2lnblggPSAxO1xuICAgICAgICAgICAgdmFyIHRlbXBGaW5hbFBvc2l0aW9uWDtcbiAgICAgICAgICAgIC8vd2hlbiB0aGUgaXRlbSBpcyB0aGUgbGFzdCBjb2x1bW4gYnJlYWsgaXRlbSwgdGhlIHRlbXBNYXhXaWR0aCB3aWxsIGJlIDAuXG4gICAgICAgICAgICB2YXIgcmlnaHRNYXJpZ24gPSAodGVtcE1heFdpZHRoID09PSAwKSA/IGNoaWxkQm91bmRpbmdCb3hXaWR0aCA6IHRlbXBNYXhXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XG4gICAgICAgICAgICAgICAgc2lnblggPSAtMTtcbiAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5IHx8IHRoaXMubm9kZS5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgdGVtcEZpbmFsUG9zaXRpb25YID0gZmluYWxQb3NpdGlvblggKyBzaWduWCAqIChyaWdodE1hcmlnbiAqIG1heFdpZHRoQ2hpbGRBbmNob3JYICsgdGhpcy5wYWRkaW5nTGVmdCk7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBGaW5hbFBvc2l0aW9uWCA8IGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gdGVtcEZpbmFsUG9zaXRpb25YO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5ID0gY29udGFpbmVyUmVzaXplQm91bmRhcnkgfHwgLXRoaXMubm9kZS5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgdGVtcEZpbmFsUG9zaXRpb25YID0gZmluYWxQb3NpdGlvblggKyBzaWduWCAqIChyaWdodE1hcmlnbiAqIG1heFdpZHRoQ2hpbGRBbmNob3JYICsgdGhpcy5wYWRkaW5nUmlnaHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ZW1wRmluYWxQb3NpdGlvblggPiBjb250YWluZXJSZXNpemVCb3VuZGFyeSkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJSZXNpemVCb3VuZGFyeSA9IHRlbXBGaW5hbFBvc2l0aW9uWDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV4dFkgKz0gdG9wQm91bmRhcnlPZkNoaWxkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lclJlc2l6ZUJvdW5kYXJ5O1xuICAgIH0sXG5cbiAgICBfZG9MYXlvdXRCYXNpYzogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLm5vZGUuY2hpbGRyZW47XG5cbiAgICAgICAgdmFyIGFsbENoaWxkcmVuQm91bmRpbmdCb3ggPSBudWxsO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkLmFjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGxDaGlsZHJlbkJvdW5kaW5nQm94KSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbENoaWxkcmVuQm91bmRpbmdCb3ggPSBjaGlsZC5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbGxDaGlsZHJlbkJvdW5kaW5nQm94LnVuaW9uKGFsbENoaWxkcmVuQm91bmRpbmdCb3gsIGNoaWxkLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWxsQ2hpbGRyZW5Cb3VuZGluZ0JveCkge1xuICAgICAgICAgICAgdmFyIGxlZnRCb3R0b21TcGFjZSA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjYy52MihhbGxDaGlsZHJlbkJvdW5kaW5nQm94LngsIGFsbENoaWxkcmVuQm91bmRpbmdCb3gueSkpO1xuICAgICAgICAgICAgbGVmdEJvdHRvbVNwYWNlID0gY2MudjIobGVmdEJvdHRvbVNwYWNlLnggLSB0aGlzLnBhZGRpbmdMZWZ0LCBsZWZ0Qm90dG9tU3BhY2UueSAtIHRoaXMucGFkZGluZ0JvdHRvbSk7XG5cbiAgICAgICAgICAgIHZhciByaWdodFRvcFNwYWNlID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLnYyKGFsbENoaWxkcmVuQm91bmRpbmdCb3gueE1heCwgYWxsQ2hpbGRyZW5Cb3VuZGluZ0JveC55TWF4KSk7XG4gICAgICAgICAgICByaWdodFRvcFNwYWNlID0gY2MudjIocmlnaHRUb3BTcGFjZS54ICsgdGhpcy5wYWRkaW5nUmlnaHQsIHJpZ2h0VG9wU3BhY2UueSArIHRoaXMucGFkZGluZ1RvcCk7XG5cbiAgICAgICAgICAgIHZhciBuZXdTaXplID0gcmlnaHRUb3BTcGFjZS5zdWIobGVmdEJvdHRvbVNwYWNlKTtcbiAgICAgICAgICAgIG5ld1NpemUgPSBjYy5zaXplKHBhcnNlRmxvYXQobmV3U2l6ZS54LnRvRml4ZWQoMikpLCBwYXJzZUZsb2F0KG5ld1NpemUueS50b0ZpeGVkKDIpKSk7XG5cbiAgICAgICAgICAgIGlmIChuZXdTaXplLndpZHRoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52ZXJ0IGlzIHRvIGdldCB0aGUgY29vcmRpbmF0ZSBwb2ludCBvZiB0aGUgY2hpbGQgbm9kZSBpbiB0aGUgcGFyZW50IGNvb3JkaW5hdGUgc3lzdGVtXG4gICAgICAgICAgICAgICAgdmFyIG5ld0FuY2hvclggPSAoLWxlZnRCb3R0b21TcGFjZS54KSAvIG5ld1NpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclggPSBwYXJzZUZsb2F0KG5ld0FuY2hvclgudG9GaXhlZCgyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3U2l6ZS5oZWlnaHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBJbnZlcnQgaXMgdG8gZ2V0IHRoZSBjb29yZGluYXRlIHBvaW50IG9mIHRoZSBjaGlsZCBub2RlIGluIHRoZSBwYXJlbnQgY29vcmRpbmF0ZSBzeXN0ZW1cbiAgICAgICAgICAgICAgICB2YXIgbmV3QW5jaG9yWSA9ICgtbGVmdEJvdHRvbVNwYWNlLnkpIC8gbmV3U2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclkgPSBwYXJzZUZsb2F0KG5ld0FuY2hvclkudG9GaXhlZCgyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUobmV3U2l6ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RvTGF5b3V0R3JpZEF4aXNIb3Jpem9udGFsOiBmdW5jdGlvbiAobGF5b3V0QW5jaG9yLCBsYXlvdXRTaXplKSB7XG4gICAgICAgIHZhciBiYXNlV2lkdGggPSBsYXlvdXRTaXplLndpZHRoO1xuXG4gICAgICAgIHZhciBzaWduID0gMTtcbiAgICAgICAgdmFyIGJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQgPSAtbGF5b3V0QW5jaG9yLnkgKiBsYXlvdXRTaXplLmhlaWdodDtcbiAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nQm90dG9tO1xuICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSkge1xuICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgYm90dG9tQm91bmRhcnlPZkxheW91dCA9ICgxIC0gbGF5b3V0QW5jaG9yLnkpICogbGF5b3V0U2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICBwYWRkaW5nWSA9IHRoaXMucGFkZGluZ1RvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmblBvc2l0aW9uWSA9IGZ1bmN0aW9uIChjaGlsZCwgdG9wT2Zmc2V0LCByb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ICsgc2lnbiAqICh0b3BPZmZzZXQgKyBjaGlsZC5hbmNob3JZICogY2hpbGQuaGVpZ2h0ICogdGhpcy5fZ2V0VXNlZFNjYWxlVmFsdWUoY2hpbGQuc2NhbGVZKSArIHBhZGRpbmdZICsgcm93ICogdGhpcy5zcGFjaW5nWSk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcblxuXG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xuICAgICAgICBpZiAodGhpcy5yZXNpemVNb2RlID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUikge1xuICAgICAgICAgICAgLy9jYWxjdWxhdGUgdGhlIG5ldyBoZWlnaHQgb2YgY29udGFpbmVyLCBpdCB3b24ndCBjaGFuZ2UgdGhlIHBvc2l0aW9uIG9mIGl0J3MgY2hpbGRyZW5cbiAgICAgICAgICAgIHZhciBib3VuZGFyeSA9IHRoaXMuX2RvTGF5b3V0SG9yaXpvbnRhbGx5KGJhc2VXaWR0aCwgdHJ1ZSwgZm5Qb3NpdGlvblksIGZhbHNlKTtcbiAgICAgICAgICAgIG5ld0hlaWdodCA9IGJvdHRvbUJvdW5kYXJ5T2ZMYXlvdXQgLSBib3VuZGFyeTtcbiAgICAgICAgICAgIGlmIChuZXdIZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV3SGVpZ2h0ICo9IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gLWxheW91dEFuY2hvci55ICogbmV3SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAodGhpcy52ZXJ0aWNhbERpcmVjdGlvbiA9PT0gVmVydGljYWxEaXJlY3Rpb24uVE9QX1RPX0JPVFRPTSkge1xuICAgICAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgICAgICAgICBib3R0b21Cb3VuZGFyeU9mTGF5b3V0ID0gKDEgLSBsYXlvdXRBbmNob3IueSkgKiBuZXdIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kb0xheW91dEhvcml6b250YWxseShiYXNlV2lkdGgsIHRydWUsIGZuUG9zaXRpb25ZLCB0cnVlKTtcblxuICAgICAgICBpZiAodGhpcy5yZXNpemVNb2RlID09PSBSZXNpemVNb2RlLkNPTlRBSU5FUikge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplKGJhc2VXaWR0aCwgbmV3SGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZG9MYXlvdXRHcmlkQXhpc1ZlcnRpY2FsOiBmdW5jdGlvbiAobGF5b3V0QW5jaG9yLCBsYXlvdXRTaXplKSB7XG4gICAgICAgIHZhciBiYXNlSGVpZ2h0ID0gbGF5b3V0U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgdmFyIHNpZ24gPSAxO1xuICAgICAgICB2YXIgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAtbGF5b3V0QW5jaG9yLnggKiBsYXlvdXRTaXplLndpZHRoO1xuICAgICAgICB2YXIgcGFkZGluZ1ggPSB0aGlzLnBhZGRpbmdMZWZ0O1xuICAgICAgICBpZiAodGhpcy5ob3Jpem9udGFsRGlyZWN0aW9uID09PSBIb3Jpem9udGFsRGlyZWN0aW9uLlJJR0hUX1RPX0xFRlQpIHtcbiAgICAgICAgICAgIHNpZ24gPSAtMTtcbiAgICAgICAgICAgIGxlZnRCb3VuZGFyeU9mTGF5b3V0ID0gKDEgLSBsYXlvdXRBbmNob3IueCkgKiBsYXlvdXRTaXplLndpZHRoO1xuICAgICAgICAgICAgcGFkZGluZ1ggPSB0aGlzLnBhZGRpbmdSaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmblBvc2l0aW9uWCA9IGZ1bmN0aW9uIChjaGlsZCwgbGVmdE9mZnNldCwgY29sdW1uKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgKyBzaWduICogKGxlZnRPZmZzZXQgKyBjaGlsZC5hbmNob3JYICogY2hpbGQud2lkdGggKiB0aGlzLl9nZXRVc2VkU2NhbGVWYWx1ZShjaGlsZC5zY2FsZVgpICsgcGFkZGluZ1ggKyBjb2x1bW4gKiB0aGlzLnNwYWNpbmdYKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHZhciBuZXdXaWR0aCA9IDA7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRhcnkgPSB0aGlzLl9kb0xheW91dFZlcnRpY2FsbHkoYmFzZUhlaWdodCwgdHJ1ZSwgZm5Qb3NpdGlvblgsIGZhbHNlKTtcbiAgICAgICAgICAgIG5ld1dpZHRoID0gbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgLSBib3VuZGFyeTtcbiAgICAgICAgICAgIGlmIChuZXdXaWR0aCA8IDApIHtcbiAgICAgICAgICAgICAgICBuZXdXaWR0aCAqPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGVmdEJvdW5kYXJ5T2ZMYXlvdXQgPSAtbGF5b3V0QW5jaG9yLnggKiBuZXdXaWR0aDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaG9yaXpvbnRhbERpcmVjdGlvbiA9PT0gSG9yaXpvbnRhbERpcmVjdGlvbi5SSUdIVF9UT19MRUZUKSB7XG4gICAgICAgICAgICAgICAgc2lnbiA9IC0xO1xuICAgICAgICAgICAgICAgIGxlZnRCb3VuZGFyeU9mTGF5b3V0ID0gKDEgLSBsYXlvdXRBbmNob3IueCkgKiBuZXdXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RvTGF5b3V0VmVydGljYWxseShiYXNlSGVpZ2h0LCB0cnVlLCBmblBvc2l0aW9uWCwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DT05UQUlORVIpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRDb250ZW50U2l6ZShuZXdXaWR0aCwgYmFzZUhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RvTGF5b3V0R3JpZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGF5b3V0QW5jaG9yID0gdGhpcy5ub2RlLmdldEFuY2hvclBvaW50KCk7XG4gICAgICAgIHZhciBsYXlvdXRTaXplID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhcnRBeGlzID09PSBBeGlzRGlyZWN0aW9uLkhPUklaT05UQUwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0R3JpZEF4aXNIb3Jpem9udGFsKGxheW91dEFuY2hvciwgbGF5b3V0U2l6ZSk7XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXJ0QXhpcyA9PT0gQXhpc0RpcmVjdGlvbi5WRVJUSUNBTCkge1xuICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXRHcmlkQXhpc1ZlcnRpY2FsKGxheW91dEFuY2hvciwgbGF5b3V0U2l6ZSk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBfZ2V0SG9yaXpvbnRhbEJhc2VXaWR0aDogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IDA7XG4gICAgICAgIHZhciBhY3RpdmVDaGlsZENvdW50ID0gMDtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplTW9kZSA9PT0gUmVzaXplTW9kZS5DT05UQUlORVIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ2hpbGRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aCArPSBjaGlsZC53aWR0aCAqIHRoaXMuX2dldFVzZWRTY2FsZVZhbHVlKGNoaWxkLnNjYWxlWCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3V2lkdGggKz0gKGFjdGl2ZUNoaWxkQ291bnQgLSAxKSAqIHRoaXMuc3BhY2luZ1ggKyB0aGlzLnBhZGRpbmdMZWZ0ICsgdGhpcy5wYWRkaW5nUmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdXaWR0aCA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdXaWR0aDtcbiAgICB9LFxuXG4gICAgX2RvTGF5b3V0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gVHlwZS5IT1JJWk9OVEFMKSB7XG4gICAgICAgICAgICB2YXIgbmV3V2lkdGggPSB0aGlzLl9nZXRIb3Jpem9udGFsQmFzZVdpZHRoKHRoaXMubm9kZS5jaGlsZHJlbik7XG5cbiAgICAgICAgICAgIHZhciBmblBvc2l0aW9uWSA9IGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZC55O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXRIb3Jpem9udGFsbHkobmV3V2lkdGgsIGZhbHNlLCBmblBvc2l0aW9uWSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gVHlwZS5WRVJUSUNBTCkge1xuICAgICAgICAgICAgdmFyIG5ld0hlaWdodCA9IHRoaXMuX2dldFZlcnRpY2FsQmFzZUhlaWdodCh0aGlzLm5vZGUuY2hpbGRyZW4pO1xuXG4gICAgICAgICAgICB2YXIgZm5Qb3NpdGlvblggPSBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQueDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuX2RvTGF5b3V0VmVydGljYWxseShuZXdIZWlnaHQsIGZhbHNlLCBmblBvc2l0aW9uWCwgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlID09PSBUeXBlLk5PTkUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc2l6ZU1vZGUgPT09IFJlc2l6ZU1vZGUuQ09OVEFJTkVSKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9MYXlvdXRCYXNpYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gVHlwZS5HUklEKSB7XG4gICAgICAgICAgICB0aGlzLl9kb0xheW91dEdyaWQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0VXNlZFNjYWxlVmFsdWUgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFmZmVjdGVkQnlTY2FsZSA/IE1hdGguYWJzKHZhbHVlKSA6IDE7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGVyZm9ybSB0aGUgbGF5b3V0IHVwZGF0ZVxuICAgICAqICEjemgg56uL5Y2z5omn6KGM5pu05paw5biD5bGAXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHVwZGF0ZUxheW91dFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsYXlvdXQudHlwZSA9IGNjLkxheW91dC5IT1JJWk9OVEFMO1xuICAgICAqIGxheW91dC5ub2RlLmFkZENoaWxkKGNoaWxkTm9kZSk7XG4gICAgICogY2MubG9nKGNoaWxkTm9kZS54KTsgLy8gbm90IHlldCBjaGFuZ2VkXG4gICAgICogbGF5b3V0LnVwZGF0ZUxheW91dCgpO1xuICAgICAqIGNjLmxvZyhjaGlsZE5vZGUueCk7IC8vIGNoYW5nZWRcbiAgICAgKi9cbiAgICB1cGRhdGVMYXlvdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xheW91dERpcnR5ICYmIHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kb0xheW91dCgpO1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0RGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5MYXlvdXQgPSBtb2R1bGUuZXhwb3J0cyA9IExheW91dDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9