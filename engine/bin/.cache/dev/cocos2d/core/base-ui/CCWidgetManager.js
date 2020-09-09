
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/base-ui/CCWidgetManager.js';
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
var Event; // Support serializing widget in asset db, see cocos-creator/2d-tasks/issues/1894

if (!CC_EDITOR || !Editor.isMainProcess) {
  Event = require('../CCNode').EventType;
}

var TOP = 1 << 0;
var MID = 1 << 1; // vertical center

var BOT = 1 << 2;
var LEFT = 1 << 3;
var CENTER = 1 << 4; // horizontal center

var RIGHT = 1 << 5;
var HORIZONTAL = LEFT | CENTER | RIGHT;
var VERTICAL = TOP | MID | BOT;
var AlignMode = cc.Enum({
  ONCE: 0,
  ON_WINDOW_RESIZE: 1,
  ALWAYS: 2
}); // returns a readonly size of the node

function getReadonlyNodeSize(parent) {
  if (parent instanceof cc.Scene) {
    return CC_EDITOR ? cc.engine.getDesignResolutionSize() : cc.visibleRect;
  } else {
    return parent._contentSize;
  }
}

function computeInverseTransForTarget(widgetNode, target, out_inverseTranslate, out_inverseScale) {
  var scaleX = widgetNode._parent.scaleX;
  var scaleY = widgetNode._parent.scaleY;
  var translateX = 0;
  var translateY = 0;

  for (var node = widgetNode._parent;;) {
    translateX += node.x;
    translateY += node.y;
    node = node._parent; // loop increment

    if (!node) {
      // ERROR: widgetNode should be child of target
      out_inverseTranslate.x = out_inverseTranslate.y = 0;
      out_inverseScale.x = out_inverseScale.y = 1;
      return;
    }

    if (node !== target) {
      var sx = node.scaleX;
      var sy = node.scaleY;
      translateX *= sx;
      translateY *= sy;
      scaleX *= sx;
      scaleY *= sy;
    } else {
      break;
    }
  }

  out_inverseScale.x = scaleX !== 0 ? 1 / scaleX : 1;
  out_inverseScale.y = scaleY !== 0 ? 1 / scaleY : 1;
  out_inverseTranslate.x = -translateX;
  out_inverseTranslate.y = -translateY;
}

var tInverseTranslate = cc.Vec2.ZERO;
var tInverseScale = cc.Vec2.ONE; // align to borders by adjusting node's position and size (ignore rotation)

function align(node, widget) {
  var hasTarget = widget._target;
  var target;
  var inverseTranslate, inverseScale;

  if (hasTarget) {
    target = hasTarget;
    inverseTranslate = tInverseTranslate;
    inverseScale = tInverseScale;
    computeInverseTransForTarget(node, target, inverseTranslate, inverseScale);
  } else {
    target = node._parent;
  }

  var targetSize = getReadonlyNodeSize(target);
  var targetAnchor = target._anchorPoint;
  var isRoot = !CC_EDITOR && target instanceof cc.Scene;
  var x = node.x,
      y = node.y;
  var anchor = node._anchorPoint;

  if (widget._alignFlags & HORIZONTAL) {
    var localLeft,
        localRight,
        targetWidth = targetSize.width;

    if (isRoot) {
      localLeft = cc.visibleRect.left.x;
      localRight = cc.visibleRect.right.x;
    } else {
      localLeft = -targetAnchor.x * targetWidth;
      localRight = localLeft + targetWidth;
    } // adjust borders according to offsets


    localLeft += widget._isAbsLeft ? widget._left : widget._left * targetWidth;
    localRight -= widget._isAbsRight ? widget._right : widget._right * targetWidth;

    if (hasTarget) {
      localLeft += inverseTranslate.x;
      localLeft *= inverseScale.x;
      localRight += inverseTranslate.x;
      localRight *= inverseScale.x;
    }

    var width,
        anchorX = anchor.x,
        scaleX = node.scaleX;

    if (scaleX < 0) {
      anchorX = 1.0 - anchorX;
      scaleX = -scaleX;
    }

    if (widget.isStretchWidth) {
      width = localRight - localLeft;

      if (scaleX !== 0) {
        node.width = width / scaleX;
      }

      x = localLeft + anchorX * width;
    } else {
      width = node.width * scaleX;

      if (widget.isAlignHorizontalCenter) {
        var localHorizontalCenter = widget._isAbsHorizontalCenter ? widget._horizontalCenter : widget._horizontalCenter * targetWidth;
        var targetCenter = (0.5 - targetAnchor.x) * targetSize.width;

        if (hasTarget) {
          localHorizontalCenter *= inverseScale.x;
          targetCenter += inverseTranslate.x;
          targetCenter *= inverseScale.x;
        }

        x = targetCenter + (anchorX - 0.5) * width + localHorizontalCenter;
      } else if (widget.isAlignLeft) {
        x = localLeft + anchorX * width;
      } else {
        x = localRight + (anchorX - 1) * width;
      }
    }
  }

  if (widget._alignFlags & VERTICAL) {
    var localTop,
        localBottom,
        targetHeight = targetSize.height;

    if (isRoot) {
      localBottom = cc.visibleRect.bottom.y;
      localTop = cc.visibleRect.top.y;
    } else {
      localBottom = -targetAnchor.y * targetHeight;
      localTop = localBottom + targetHeight;
    } // adjust borders according to offsets


    localBottom += widget._isAbsBottom ? widget._bottom : widget._bottom * targetHeight;
    localTop -= widget._isAbsTop ? widget._top : widget._top * targetHeight;

    if (hasTarget) {
      // transform
      localBottom += inverseTranslate.y;
      localBottom *= inverseScale.y;
      localTop += inverseTranslate.y;
      localTop *= inverseScale.y;
    }

    var height,
        anchorY = anchor.y,
        scaleY = node.scaleY;

    if (scaleY < 0) {
      anchorY = 1.0 - anchorY;
      scaleY = -scaleY;
    }

    if (widget.isStretchHeight) {
      height = localTop - localBottom;

      if (scaleY !== 0) {
        node.height = height / scaleY;
      }

      y = localBottom + anchorY * height;
    } else {
      height = node.height * scaleY;

      if (widget.isAlignVerticalCenter) {
        var localVerticalCenter = widget._isAbsVerticalCenter ? widget._verticalCenter : widget._verticalCenter * targetHeight;
        var targetMiddle = (0.5 - targetAnchor.y) * targetSize.height;

        if (hasTarget) {
          localVerticalCenter *= inverseScale.y;
          targetMiddle += inverseTranslate.y;
          targetMiddle *= inverseScale.y;
        }

        y = targetMiddle + (anchorY - 0.5) * height + localVerticalCenter;
      } else if (widget.isAlignBottom) {
        y = localBottom + anchorY * height;
      } else {
        y = localTop + (anchorY - 1) * height;
      }
    }
  }

  node.setPosition(x, y);
}

function visitNode(node) {
  var widget = node._widget;

  if (widget) {
    if (CC_DEV) {
      widget._validateTargetInDEV();
    }

    align(node, widget);

    if ((!CC_EDITOR || animationState.animatedSinceLastFrame) && widget.alignMode !== AlignMode.ALWAYS) {
      widget.enabled = false;
    } else {
      activeWidgets.push(widget);
    }
  }

  var children = node._children;

  for (var i = 0; i < children.length; i++) {
    var child = children[i];

    if (child._active) {
      visitNode(child);
    }
  }
}

if (CC_EDITOR) {
  var animationState = {
    previewing: false,
    time: 0,
    animatedSinceLastFrame: false
  };
}

function refreshScene() {
  // check animation editor
  if (CC_EDITOR && !Editor.isBuilder) {
    var AnimUtils = Editor.require('scene://utils/animation');

    var EditMode = Editor.require('scene://edit-mode');

    if (AnimUtils && EditMode) {
      var nowPreviewing = EditMode.curMode().name === 'animation' && !!AnimUtils.Cache.animation;

      if (nowPreviewing !== animationState.previewing) {
        animationState.previewing = nowPreviewing;

        if (nowPreviewing) {
          animationState.animatedSinceLastFrame = true;
          var component = cc.engine.getInstanceById(AnimUtils.Cache.component);

          if (component) {
            var animation = component.getAnimationState(AnimUtils.Cache.animation);

            if (animation) {
              animationState.time = animation.time;
            }
          }
        } else {
          animationState.animatedSinceLastFrame = false;
        }
      } else if (nowPreviewing) {
        var _component = cc.engine.getInstanceById(AnimUtils.Cache.component);

        if (_component) {
          var _animation = _component.getAnimationState(AnimUtils.Cache.animation);

          if (_animation && animationState.time !== _animation.time) {
            animationState.animatedSinceLastFrame = true;
            animationState.time = AnimUtils.Cache.animation.time;
          }
        }
      }
    }
  }

  var scene = cc.director.getScene();

  if (scene) {
    widgetManager.isAligning = true;

    if (widgetManager._nodesOrderDirty) {
      activeWidgets.length = 0;
      visitNode(scene);
      widgetManager._nodesOrderDirty = false;
    } else {
      var i,
          widget,
          iterator = widgetManager._activeWidgetsIterator;
      var AnimUtils;

      if (CC_EDITOR && (AnimUtils = Editor.require('scene://utils/animation')) && AnimUtils.Cache.animation) {
        var editingNode = cc.engine.getInstanceById(AnimUtils.Cache.rNode);

        if (editingNode) {
          for (i = activeWidgets.length - 1; i >= 0; i--) {
            widget = activeWidgets[i];
            var node = widget.node;

            if (widget.alignMode !== AlignMode.ALWAYS && animationState.animatedSinceLastFrame && node.isChildOf(editingNode)) {
              // widget contains in activeWidgets should aligned at least once
              widget.enabled = false;
            } else {
              align(node, widget);
            }
          }
        }
      } else {
        // loop reversely will not help to prevent out of sync
        // because user may remove more than one item during a step.
        for (iterator.i = 0; iterator.i < activeWidgets.length; ++iterator.i) {
          widget = activeWidgets[iterator.i];
          align(widget.node, widget);
        }
      }
    }

    widgetManager.isAligning = false;
  } // check animation editor


  if (CC_EDITOR) {
    animationState.animatedSinceLastFrame = false;
  }
}

var adjustWidgetToAllowMovingInEditor = CC_EDITOR && function (oldPos) {
  if (widgetManager.isAligning) {
    return;
  }

  var newPos = this.node.position;
  var delta = newPos.sub(oldPos);
  var target = this.node._parent;
  var inverseScale = cc.Vec2.ONE;

  if (this._target) {
    target = this._target;
    computeInverseTransForTarget(this.node, target, new cc.Vec2(), inverseScale);
  }

  var targetSize = getReadonlyNodeSize(target);
  var deltaInPercent;

  if (targetSize.width !== 0 && targetSize.height !== 0) {
    deltaInPercent = new cc.Vec2(delta.x / targetSize.width, delta.y / targetSize.height);
  } else {
    deltaInPercent = cc.Vec2.ZERO;
  }

  if (this.isAlignTop) {
    this.top -= (this.isAbsoluteTop ? delta.y : deltaInPercent.y) * inverseScale.y;
  }

  if (this.isAlignBottom) {
    this.bottom += (this.isAbsoluteBottom ? delta.y : deltaInPercent.y) * inverseScale.y;
  }

  if (this.isAlignLeft) {
    this.left += (this.isAbsoluteLeft ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignRight) {
    this.right -= (this.isAbsoluteRight ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignHorizontalCenter) {
    this.horizontalCenter += (this.isAbsoluteHorizontalCenter ? delta.x : deltaInPercent.x) * inverseScale.x;
  }

  if (this.isAlignVerticalCenter) {
    this.verticalCenter += (this.isAbsoluteVerticalCenter ? delta.y : deltaInPercent.y) * inverseScale.y;
  }
};

var adjustWidgetToAllowResizingInEditor = CC_EDITOR && function (oldSize) {
  if (widgetManager.isAligning) {
    return;
  }

  var newSize = this.node.getContentSize();
  var delta = cc.v2(newSize.width - oldSize.width, newSize.height - oldSize.height);
  var target = this.node._parent;
  var inverseScale = cc.Vec2.ONE;

  if (this._target) {
    target = this._target;
    computeInverseTransForTarget(this.node, target, new cc.Vec2(), inverseScale);
  }

  var targetSize = getReadonlyNodeSize(target);
  var deltaInPercent;

  if (targetSize.width !== 0 && targetSize.height !== 0) {
    deltaInPercent = new cc.Vec2(delta.x / targetSize.width, delta.y / targetSize.height);
  } else {
    deltaInPercent = cc.Vec2.ZERO;
  }

  var anchor = this.node._anchorPoint;

  if (this.isAlignTop) {
    this.top -= (this.isAbsoluteTop ? delta.y : deltaInPercent.y) * (1 - anchor.y) * inverseScale.y;
  }

  if (this.isAlignBottom) {
    this.bottom -= (this.isAbsoluteBottom ? delta.y : deltaInPercent.y) * anchor.y * inverseScale.y;
  }

  if (this.isAlignLeft) {
    this.left -= (this.isAbsoluteLeft ? delta.x : deltaInPercent.x) * anchor.x * inverseScale.x;
  }

  if (this.isAlignRight) {
    this.right -= (this.isAbsoluteRight ? delta.x : deltaInPercent.x) * (1 - anchor.x) * inverseScale.x;
  }
};

var activeWidgets = []; // updateAlignment from scene to node recursively

function updateAlignment(node) {
  var parent = node._parent;

  if (cc.Node.isNode(parent)) {
    updateAlignment(parent);
  }

  var widget = node._widget || node.getComponent(cc.Widget); // node._widget will be null when widget is disabled

  if (widget && parent) {
    align(node, widget);
  }
}

var widgetManager = cc._widgetManager = module.exports = {
  _AlignFlags: {
    TOP: TOP,
    MID: MID,
    // vertical center
    BOT: BOT,
    LEFT: LEFT,
    CENTER: CENTER,
    // horizontal center
    RIGHT: RIGHT
  },
  isAligning: false,
  _nodesOrderDirty: false,
  _activeWidgetsIterator: new cc.js.array.MutableForwardIterator(activeWidgets),
  init: function init(director) {
    director.on(cc.Director.EVENT_AFTER_UPDATE, refreshScene);

    if (CC_EDITOR && cc.engine) {
      cc.engine.on('design-resolution-changed', this.onResized.bind(this));
    } else {
      var thisOnResized = this.onResized.bind(this);
      window.addEventListener('resize', thisOnResized);
      window.addEventListener('orientationchange', thisOnResized);
    }
  },
  add: function add(widget) {
    widget.node._widget = widget;
    this._nodesOrderDirty = true;

    if (CC_EDITOR && !cc.engine.isPlaying) {
      widget.node.on(Event.POSITION_CHANGED, adjustWidgetToAllowMovingInEditor, widget);
      widget.node.on(Event.SIZE_CHANGED, adjustWidgetToAllowResizingInEditor, widget);
    }
  },
  remove: function remove(widget) {
    widget.node._widget = null;

    this._activeWidgetsIterator.remove(widget);

    if (CC_EDITOR && !cc.engine.isPlaying) {
      widget.node.off(Event.POSITION_CHANGED, adjustWidgetToAllowMovingInEditor, widget);
      widget.node.off(Event.SIZE_CHANGED, adjustWidgetToAllowResizingInEditor, widget);
    }
  },
  onResized: function onResized() {
    var scene = cc.director.getScene();

    if (scene) {
      this.refreshWidgetOnResized(scene);
    }
  },
  refreshWidgetOnResized: function refreshWidgetOnResized(node) {
    var widget = cc.Node.isNode(node) && node.getComponent(cc.Widget);

    if (widget) {
      if (widget.alignMode === AlignMode.ON_WINDOW_RESIZE) {
        widget.enabled = true;
      }
    }

    var children = node._children;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      this.refreshWidgetOnResized(child);
    }
  },
  updateAlignment: updateAlignment,
  AlignMode: AlignMode
};

if (CC_EDITOR) {
  module.exports._computeInverseTransForTarget = computeInverseTransForTarget;
  module.exports._getReadonlyNodeSize = getReadonlyNodeSize;
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Jhc2UtdWkvQ0NXaWRnZXRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkV2ZW50IiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJUT1AiLCJNSUQiLCJCT1QiLCJMRUZUIiwiQ0VOVEVSIiwiUklHSFQiLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJBbGlnbk1vZGUiLCJjYyIsIkVudW0iLCJPTkNFIiwiT05fV0lORE9XX1JFU0laRSIsIkFMV0FZUyIsImdldFJlYWRvbmx5Tm9kZVNpemUiLCJwYXJlbnQiLCJTY2VuZSIsImVuZ2luZSIsImdldERlc2lnblJlc29sdXRpb25TaXplIiwidmlzaWJsZVJlY3QiLCJfY29udGVudFNpemUiLCJjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0Iiwid2lkZ2V0Tm9kZSIsInRhcmdldCIsIm91dF9pbnZlcnNlVHJhbnNsYXRlIiwib3V0X2ludmVyc2VTY2FsZSIsInNjYWxlWCIsIl9wYXJlbnQiLCJzY2FsZVkiLCJ0cmFuc2xhdGVYIiwidHJhbnNsYXRlWSIsIm5vZGUiLCJ4IiwieSIsInN4Iiwic3kiLCJ0SW52ZXJzZVRyYW5zbGF0ZSIsIlZlYzIiLCJaRVJPIiwidEludmVyc2VTY2FsZSIsIk9ORSIsImFsaWduIiwid2lkZ2V0IiwiaGFzVGFyZ2V0IiwiX3RhcmdldCIsImludmVyc2VUcmFuc2xhdGUiLCJpbnZlcnNlU2NhbGUiLCJ0YXJnZXRTaXplIiwidGFyZ2V0QW5jaG9yIiwiX2FuY2hvclBvaW50IiwiaXNSb290IiwiYW5jaG9yIiwiX2FsaWduRmxhZ3MiLCJsb2NhbExlZnQiLCJsb2NhbFJpZ2h0IiwidGFyZ2V0V2lkdGgiLCJ3aWR0aCIsImxlZnQiLCJyaWdodCIsIl9pc0Fic0xlZnQiLCJfbGVmdCIsIl9pc0Fic1JpZ2h0IiwiX3JpZ2h0IiwiYW5jaG9yWCIsImlzU3RyZXRjaFdpZHRoIiwiaXNBbGlnbkhvcml6b250YWxDZW50ZXIiLCJsb2NhbEhvcml6b250YWxDZW50ZXIiLCJfaXNBYnNIb3Jpem9udGFsQ2VudGVyIiwiX2hvcml6b250YWxDZW50ZXIiLCJ0YXJnZXRDZW50ZXIiLCJpc0FsaWduTGVmdCIsImxvY2FsVG9wIiwibG9jYWxCb3R0b20iLCJ0YXJnZXRIZWlnaHQiLCJoZWlnaHQiLCJib3R0b20iLCJ0b3AiLCJfaXNBYnNCb3R0b20iLCJfYm90dG9tIiwiX2lzQWJzVG9wIiwiX3RvcCIsImFuY2hvclkiLCJpc1N0cmV0Y2hIZWlnaHQiLCJpc0FsaWduVmVydGljYWxDZW50ZXIiLCJsb2NhbFZlcnRpY2FsQ2VudGVyIiwiX2lzQWJzVmVydGljYWxDZW50ZXIiLCJfdmVydGljYWxDZW50ZXIiLCJ0YXJnZXRNaWRkbGUiLCJpc0FsaWduQm90dG9tIiwic2V0UG9zaXRpb24iLCJ2aXNpdE5vZGUiLCJfd2lkZ2V0IiwiQ0NfREVWIiwiX3ZhbGlkYXRlVGFyZ2V0SW5ERVYiLCJhbmltYXRpb25TdGF0ZSIsImFuaW1hdGVkU2luY2VMYXN0RnJhbWUiLCJhbGlnbk1vZGUiLCJlbmFibGVkIiwiYWN0aXZlV2lkZ2V0cyIsInB1c2giLCJjaGlsZHJlbiIsIl9jaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJjaGlsZCIsIl9hY3RpdmUiLCJwcmV2aWV3aW5nIiwidGltZSIsInJlZnJlc2hTY2VuZSIsImlzQnVpbGRlciIsIkFuaW1VdGlscyIsIkVkaXRNb2RlIiwibm93UHJldmlld2luZyIsImN1ck1vZGUiLCJuYW1lIiwiQ2FjaGUiLCJhbmltYXRpb24iLCJjb21wb25lbnQiLCJnZXRJbnN0YW5jZUJ5SWQiLCJnZXRBbmltYXRpb25TdGF0ZSIsInNjZW5lIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsIndpZGdldE1hbmFnZXIiLCJpc0FsaWduaW5nIiwiX25vZGVzT3JkZXJEaXJ0eSIsIml0ZXJhdG9yIiwiX2FjdGl2ZVdpZGdldHNJdGVyYXRvciIsImVkaXRpbmdOb2RlIiwick5vZGUiLCJpc0NoaWxkT2YiLCJhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IiLCJvbGRQb3MiLCJuZXdQb3MiLCJwb3NpdGlvbiIsImRlbHRhIiwic3ViIiwiZGVsdGFJblBlcmNlbnQiLCJpc0FsaWduVG9wIiwiaXNBYnNvbHV0ZVRvcCIsImlzQWJzb2x1dGVCb3R0b20iLCJpc0Fic29sdXRlTGVmdCIsImlzQWxpZ25SaWdodCIsImlzQWJzb2x1dGVSaWdodCIsImhvcml6b250YWxDZW50ZXIiLCJpc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlciIsInZlcnRpY2FsQ2VudGVyIiwiaXNBYnNvbHV0ZVZlcnRpY2FsQ2VudGVyIiwiYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IiLCJvbGRTaXplIiwibmV3U2l6ZSIsImdldENvbnRlbnRTaXplIiwidjIiLCJ1cGRhdGVBbGlnbm1lbnQiLCJOb2RlIiwiaXNOb2RlIiwiZ2V0Q29tcG9uZW50IiwiV2lkZ2V0IiwiX3dpZGdldE1hbmFnZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiX0FsaWduRmxhZ3MiLCJqcyIsImFycmF5IiwiTXV0YWJsZUZvcndhcmRJdGVyYXRvciIsImluaXQiLCJvbiIsIkRpcmVjdG9yIiwiRVZFTlRfQUZURVJfVVBEQVRFIiwib25SZXNpemVkIiwiYmluZCIsInRoaXNPblJlc2l6ZWQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkIiwiaXNQbGF5aW5nIiwiUE9TSVRJT05fQ0hBTkdFRCIsIlNJWkVfQ0hBTkdFRCIsInJlbW92ZSIsIm9mZiIsInJlZnJlc2hXaWRnZXRPblJlc2l6ZWQiLCJfY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCIsIl9nZXRSZWFkb25seU5vZGVTaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsS0FBSixFQUVBOztBQUNBLElBQUksQ0FBQ0MsU0FBRCxJQUFjLENBQUNDLE1BQU0sQ0FBQ0MsYUFBMUIsRUFBeUM7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QXFCeEYsU0FBUyxDQUFDSSxnQkFBbkMsRUFBcUQ7QUFDakQ4QixRQUFBQSxNQUFNLENBQUN1RCxPQUFQLEdBQWlCLElBQWpCO0FBQ0g7QUFDSjs7QUFFRCxRQUFJRyxRQUFRLEdBQUdyRSxJQUFJLENBQUNzRSxTQUFwQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLFFBQVEsQ0FBQ0csTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsVUFBSUUsS0FBSyxHQUFHSixRQUFRLENBQUNFLENBQUQsQ0FBcEI7QUFDQSxXQUFLOEUsc0JBQUwsQ0FBNEI1RSxLQUE1QjtBQUNIO0FBQ0osR0E1RG9EO0FBNkRyRGlELEVBQUFBLGVBQWUsRUFBRUEsZUE3RG9DO0FBOERyRGpKLEVBQUFBLFNBQVMsRUFBRUE7QUE5RDBDLENBQXpEOztBQWlFQSxJQUFJYixTQUFKLEVBQWU7QUFDWG9LLEVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlcUIsNkJBQWYsR0FBK0NoSyw0QkFBL0M7QUFDQTBJLEVBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlc0Isb0JBQWYsR0FBc0N4SyxtQkFBdEM7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIEV2ZW50O1xuXG4vLyBTdXBwb3J0IHNlcmlhbGl6aW5nIHdpZGdldCBpbiBhc3NldCBkYiwgc2VlIGNvY29zLWNyZWF0b3IvMmQtdGFza3MvaXNzdWVzLzE4OTRcbmlmICghQ0NfRURJVE9SIHx8ICFFZGl0b3IuaXNNYWluUHJvY2Vzcykge1xuICBFdmVudCA9IHJlcXVpcmUoJy4uL0NDTm9kZScpLkV2ZW50VHlwZTtcbn1cblxudmFyIFRPUCAgICAgPSAxIDw8IDA7XG52YXIgTUlEICAgICA9IDEgPDwgMTsgICAvLyB2ZXJ0aWNhbCBjZW50ZXJcbnZhciBCT1QgICAgID0gMSA8PCAyO1xudmFyIExFRlQgICAgPSAxIDw8IDM7XG52YXIgQ0VOVEVSICA9IDEgPDwgNDsgICAvLyBob3Jpem9udGFsIGNlbnRlclxudmFyIFJJR0hUICAgPSAxIDw8IDU7XG52YXIgSE9SSVpPTlRBTCA9IExFRlQgfCBDRU5URVIgfCBSSUdIVDtcbnZhciBWRVJUSUNBTCA9IFRPUCB8IE1JRCB8IEJPVDtcblxudmFyIEFsaWduTW9kZSA9IGNjLkVudW0oe1xuICAgIE9OQ0U6IDAsXG4gICAgT05fV0lORE9XX1JFU0laRTogMSxcbiAgICBBTFdBWVM6IDIsXG59KTtcblxuLy8gcmV0dXJucyBhIHJlYWRvbmx5IHNpemUgb2YgdGhlIG5vZGVcbmZ1bmN0aW9uIGdldFJlYWRvbmx5Tm9kZVNpemUgKHBhcmVudCkge1xuICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBjYy5TY2VuZSkge1xuICAgICAgICByZXR1cm4gQ0NfRURJVE9SID8gY2MuZW5naW5lLmdldERlc2lnblJlc29sdXRpb25TaXplKCkgOiBjYy52aXNpYmxlUmVjdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXJlbnQuX2NvbnRlbnRTaXplO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCAod2lkZ2V0Tm9kZSwgdGFyZ2V0LCBvdXRfaW52ZXJzZVRyYW5zbGF0ZSwgb3V0X2ludmVyc2VTY2FsZSkge1xuICAgIHZhciBzY2FsZVggPSB3aWRnZXROb2RlLl9wYXJlbnQuc2NhbGVYO1xuICAgIHZhciBzY2FsZVkgPSB3aWRnZXROb2RlLl9wYXJlbnQuc2NhbGVZO1xuICAgIHZhciB0cmFuc2xhdGVYID0gMDtcbiAgICB2YXIgdHJhbnNsYXRlWSA9IDA7XG4gICAgZm9yICh2YXIgbm9kZSA9IHdpZGdldE5vZGUuX3BhcmVudDs7KSB7XG4gICAgICAgIHRyYW5zbGF0ZVggKz0gbm9kZS54O1xuICAgICAgICB0cmFuc2xhdGVZICs9IG5vZGUueTtcbiAgICAgICAgbm9kZSA9IG5vZGUuX3BhcmVudDsgICAgLy8gbG9vcCBpbmNyZW1lbnRcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAvLyBFUlJPUjogd2lkZ2V0Tm9kZSBzaG91bGQgYmUgY2hpbGQgb2YgdGFyZ2V0XG4gICAgICAgICAgICBvdXRfaW52ZXJzZVRyYW5zbGF0ZS54ID0gb3V0X2ludmVyc2VUcmFuc2xhdGUueSA9IDA7XG4gICAgICAgICAgICBvdXRfaW52ZXJzZVNjYWxlLnggPSBvdXRfaW52ZXJzZVNjYWxlLnkgPSAxO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlICE9PSB0YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciBzeCA9IG5vZGUuc2NhbGVYO1xuICAgICAgICAgICAgdmFyIHN5ID0gbm9kZS5zY2FsZVk7XG4gICAgICAgICAgICB0cmFuc2xhdGVYICo9IHN4O1xuICAgICAgICAgICAgdHJhbnNsYXRlWSAqPSBzeTtcbiAgICAgICAgICAgIHNjYWxlWCAqPSBzeDtcbiAgICAgICAgICAgIHNjYWxlWSAqPSBzeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIG91dF9pbnZlcnNlU2NhbGUueCA9IHNjYWxlWCAhPT0gMCA/ICgxIC8gc2NhbGVYKSA6IDE7XG4gICAgb3V0X2ludmVyc2VTY2FsZS55ID0gc2NhbGVZICE9PSAwID8gKDEgLyBzY2FsZVkpIDogMTtcbiAgICBvdXRfaW52ZXJzZVRyYW5zbGF0ZS54ID0gLXRyYW5zbGF0ZVg7XG4gICAgb3V0X2ludmVyc2VUcmFuc2xhdGUueSA9IC10cmFuc2xhdGVZO1xufVxuXG52YXIgdEludmVyc2VUcmFuc2xhdGUgPSBjYy5WZWMyLlpFUk87XG52YXIgdEludmVyc2VTY2FsZSA9IGNjLlZlYzIuT05FO1xuXG4vLyBhbGlnbiB0byBib3JkZXJzIGJ5IGFkanVzdGluZyBub2RlJ3MgcG9zaXRpb24gYW5kIHNpemUgKGlnbm9yZSByb3RhdGlvbilcbmZ1bmN0aW9uIGFsaWduIChub2RlLCB3aWRnZXQpIHtcbiAgICB2YXIgaGFzVGFyZ2V0ID0gd2lkZ2V0Ll90YXJnZXQ7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgaW52ZXJzZVRyYW5zbGF0ZSwgaW52ZXJzZVNjYWxlO1xuICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gaGFzVGFyZ2V0O1xuICAgICAgICBpbnZlcnNlVHJhbnNsYXRlID0gdEludmVyc2VUcmFuc2xhdGU7XG4gICAgICAgIGludmVyc2VTY2FsZSA9IHRJbnZlcnNlU2NhbGU7XG4gICAgICAgIGNvbXB1dGVJbnZlcnNlVHJhbnNGb3JUYXJnZXQobm9kZSwgdGFyZ2V0LCBpbnZlcnNlVHJhbnNsYXRlLCBpbnZlcnNlU2NhbGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gbm9kZS5fcGFyZW50O1xuICAgIH1cbiAgICB2YXIgdGFyZ2V0U2l6ZSA9IGdldFJlYWRvbmx5Tm9kZVNpemUodGFyZ2V0KTtcbiAgICB2YXIgdGFyZ2V0QW5jaG9yID0gdGFyZ2V0Ll9hbmNob3JQb2ludDtcblxuICAgIHZhciBpc1Jvb3QgPSAhQ0NfRURJVE9SICYmIHRhcmdldCBpbnN0YW5jZW9mIGNjLlNjZW5lO1xuICAgIHZhciB4ID0gbm9kZS54LCB5ID0gbm9kZS55O1xuICAgIHZhciBhbmNob3IgPSBub2RlLl9hbmNob3JQb2ludDtcblxuICAgIGlmICh3aWRnZXQuX2FsaWduRmxhZ3MgJiBIT1JJWk9OVEFMKSB7XG5cbiAgICAgICAgdmFyIGxvY2FsTGVmdCwgbG9jYWxSaWdodCwgdGFyZ2V0V2lkdGggPSB0YXJnZXRTaXplLndpZHRoO1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICBsb2NhbExlZnQgPSBjYy52aXNpYmxlUmVjdC5sZWZ0Lng7XG4gICAgICAgICAgICBsb2NhbFJpZ2h0ID0gY2MudmlzaWJsZVJlY3QucmlnaHQueDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvY2FsTGVmdCA9IC10YXJnZXRBbmNob3IueCAqIHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgbG9jYWxSaWdodCA9IGxvY2FsTGVmdCArIHRhcmdldFdpZHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRqdXN0IGJvcmRlcnMgYWNjb3JkaW5nIHRvIG9mZnNldHNcbiAgICAgICAgbG9jYWxMZWZ0ICs9IHdpZGdldC5faXNBYnNMZWZ0ID8gd2lkZ2V0Ll9sZWZ0IDogd2lkZ2V0Ll9sZWZ0ICogdGFyZ2V0V2lkdGg7XG4gICAgICAgIGxvY2FsUmlnaHQgLT0gd2lkZ2V0Ll9pc0Fic1JpZ2h0ID8gd2lkZ2V0Ll9yaWdodCA6IHdpZGdldC5fcmlnaHQgKiB0YXJnZXRXaWR0aDtcblxuICAgICAgICBpZiAoaGFzVGFyZ2V0KSB7XG4gICAgICAgICAgICBsb2NhbExlZnQgKz0gaW52ZXJzZVRyYW5zbGF0ZS54O1xuICAgICAgICAgICAgbG9jYWxMZWZ0ICo9IGludmVyc2VTY2FsZS54O1xuICAgICAgICAgICAgbG9jYWxSaWdodCArPSBpbnZlcnNlVHJhbnNsYXRlLng7XG4gICAgICAgICAgICBsb2NhbFJpZ2h0ICo9IGludmVyc2VTY2FsZS54O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHdpZHRoLCBhbmNob3JYID0gYW5jaG9yLngsIHNjYWxlWCA9IG5vZGUuc2NhbGVYO1xuICAgICAgICBpZiAoc2NhbGVYIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yWCA9IDEuMCAtIGFuY2hvclg7XG4gICAgICAgICAgICBzY2FsZVggPSAtc2NhbGVYO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWRnZXQuaXNTdHJldGNoV2lkdGgpIHtcbiAgICAgICAgICAgIHdpZHRoID0gbG9jYWxSaWdodCAtIGxvY2FsTGVmdDtcbiAgICAgICAgICAgIGlmIChzY2FsZVggIT09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLndpZHRoID0gd2lkdGggLyBzY2FsZVg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4ID0gbG9jYWxMZWZ0ICsgYW5jaG9yWCAqIHdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBub2RlLndpZHRoICogc2NhbGVYO1xuICAgICAgICAgICAgaWYgKHdpZGdldC5pc0FsaWduSG9yaXpvbnRhbENlbnRlcikge1xuICAgICAgICAgICAgICAgIHZhciBsb2NhbEhvcml6b250YWxDZW50ZXIgPSB3aWRnZXQuX2lzQWJzSG9yaXpvbnRhbENlbnRlciA/IHdpZGdldC5faG9yaXpvbnRhbENlbnRlciA6IHdpZGdldC5faG9yaXpvbnRhbENlbnRlciAqIHRhcmdldFdpZHRoO1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRDZW50ZXIgPSAoMC41IC0gdGFyZ2V0QW5jaG9yLngpICogdGFyZ2V0U2l6ZS53aWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoaGFzVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsSG9yaXpvbnRhbENlbnRlciAqPSBpbnZlcnNlU2NhbGUueDtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VudGVyICs9IGludmVyc2VUcmFuc2xhdGUueDtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2VudGVyICo9IGludmVyc2VTY2FsZS54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4ID0gdGFyZ2V0Q2VudGVyICsgKGFuY2hvclggLSAwLjUpICogd2lkdGggKyBsb2NhbEhvcml6b250YWxDZW50ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3aWRnZXQuaXNBbGlnbkxlZnQpIHtcbiAgICAgICAgICAgICAgICB4ID0gbG9jYWxMZWZ0ICsgYW5jaG9yWCAqIHdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeCA9IGxvY2FsUmlnaHQgKyAoYW5jaG9yWCAtIDEpICogd2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2lkZ2V0Ll9hbGlnbkZsYWdzICYgVkVSVElDQUwpIHtcblxuICAgICAgICB2YXIgbG9jYWxUb3AsIGxvY2FsQm90dG9tLCB0YXJnZXRIZWlnaHQgPSB0YXJnZXRTaXplLmhlaWdodDtcbiAgICAgICAgaWYgKGlzUm9vdCkge1xuICAgICAgICAgICAgbG9jYWxCb3R0b20gPSBjYy52aXNpYmxlUmVjdC5ib3R0b20ueTtcbiAgICAgICAgICAgIGxvY2FsVG9wID0gY2MudmlzaWJsZVJlY3QudG9wLnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2NhbEJvdHRvbSA9IC10YXJnZXRBbmNob3IueSAqIHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgIGxvY2FsVG9wID0gbG9jYWxCb3R0b20gKyB0YXJnZXRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGp1c3QgYm9yZGVycyBhY2NvcmRpbmcgdG8gb2Zmc2V0c1xuICAgICAgICBsb2NhbEJvdHRvbSArPSB3aWRnZXQuX2lzQWJzQm90dG9tID8gd2lkZ2V0Ll9ib3R0b20gOiB3aWRnZXQuX2JvdHRvbSAqIHRhcmdldEhlaWdodDtcbiAgICAgICAgbG9jYWxUb3AgLT0gd2lkZ2V0Ll9pc0Fic1RvcCA/IHdpZGdldC5fdG9wIDogd2lkZ2V0Ll90b3AgKiB0YXJnZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgLy8gdHJhbnNmb3JtXG4gICAgICAgICAgICBsb2NhbEJvdHRvbSArPSBpbnZlcnNlVHJhbnNsYXRlLnk7XG4gICAgICAgICAgICBsb2NhbEJvdHRvbSAqPSBpbnZlcnNlU2NhbGUueTtcbiAgICAgICAgICAgIGxvY2FsVG9wICs9IGludmVyc2VUcmFuc2xhdGUueTtcbiAgICAgICAgICAgIGxvY2FsVG9wICo9IGludmVyc2VTY2FsZS55O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhlaWdodCwgYW5jaG9yWSA9IGFuY2hvci55LCBzY2FsZVkgPSBub2RlLnNjYWxlWTtcbiAgICAgICAgaWYgKHNjYWxlWSA8IDApIHtcbiAgICAgICAgICAgIGFuY2hvclkgPSAxLjAgLSBhbmNob3JZO1xuICAgICAgICAgICAgc2NhbGVZID0gLXNjYWxlWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2lkZ2V0LmlzU3RyZXRjaEhlaWdodCkge1xuICAgICAgICAgICAgaGVpZ2h0ID0gbG9jYWxUb3AgLSBsb2NhbEJvdHRvbTtcbiAgICAgICAgICAgIGlmIChzY2FsZVkgIT09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmhlaWdodCA9IGhlaWdodCAvIHNjYWxlWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHkgPSBsb2NhbEJvdHRvbSArIGFuY2hvclkgKiBoZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBub2RlLmhlaWdodCAqIHNjYWxlWTtcbiAgICAgICAgICAgIGlmICh3aWRnZXQuaXNBbGlnblZlcnRpY2FsQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsVmVydGljYWxDZW50ZXIgPSB3aWRnZXQuX2lzQWJzVmVydGljYWxDZW50ZXIgPyB3aWRnZXQuX3ZlcnRpY2FsQ2VudGVyIDogd2lkZ2V0Ll92ZXJ0aWNhbENlbnRlciAqIHRhcmdldEhlaWdodDtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0TWlkZGxlID0gKDAuNSAtIHRhcmdldEFuY2hvci55KSAqIHRhcmdldFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxWZXJ0aWNhbENlbnRlciAqPSBpbnZlcnNlU2NhbGUueTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWlkZGxlICs9IGludmVyc2VUcmFuc2xhdGUueTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TWlkZGxlICo9IGludmVyc2VTY2FsZS55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5ID0gdGFyZ2V0TWlkZGxlICsgKGFuY2hvclkgLSAwLjUpICogaGVpZ2h0ICsgbG9jYWxWZXJ0aWNhbENlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZGdldC5pc0FsaWduQm90dG9tKSB7XG4gICAgICAgICAgICAgICAgeSA9IGxvY2FsQm90dG9tICsgYW5jaG9yWSAqIGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHkgPSBsb2NhbFRvcCArIChhbmNob3JZIC0gMSkgKiBoZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlLnNldFBvc2l0aW9uKHgsIHkpO1xufVxuXG5mdW5jdGlvbiB2aXNpdE5vZGUgKG5vZGUpIHtcbiAgICB2YXIgd2lkZ2V0ID0gbm9kZS5fd2lkZ2V0O1xuICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgd2lkZ2V0Ll92YWxpZGF0ZVRhcmdldEluREVWKCk7XG4gICAgICAgIH1cbiAgICAgICAgYWxpZ24obm9kZSwgd2lkZ2V0KTtcbiAgICAgICAgaWYgKCghQ0NfRURJVE9SIHx8IGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUpICYmIHdpZGdldC5hbGlnbk1vZGUgIT09IEFsaWduTW9kZS5BTFdBWVMpIHtcbiAgICAgICAgICAgIHdpZGdldC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3RpdmVXaWRnZXRzLnB1c2god2lkZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLl9jaGlsZHJlbjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2hpbGQuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdmlzaXROb2RlKGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuaWYgKENDX0VESVRPUikge1xuICAgIHZhciBhbmltYXRpb25TdGF0ZSA9IHtcbiAgICAgICAgcHJldmlld2luZzogZmFsc2UsXG4gICAgICAgIHRpbWU6IDAsXG4gICAgICAgIGFuaW1hdGVkU2luY2VMYXN0RnJhbWU6IGZhbHNlLFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hTY2VuZSAoKSB7XG4gICAgLy8gY2hlY2sgYW5pbWF0aW9uIGVkaXRvclxuICAgIGlmIChDQ19FRElUT1IgJiYgIUVkaXRvci5pc0J1aWxkZXIpIHtcbiAgICAgICAgdmFyIEFuaW1VdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL2FuaW1hdGlvbicpO1xuICAgICAgICB2YXIgRWRpdE1vZGUgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly9lZGl0LW1vZGUnKTtcbiAgICAgICAgaWYgKEFuaW1VdGlscyAmJiBFZGl0TW9kZSkge1xuICAgICAgICAgICAgdmFyIG5vd1ByZXZpZXdpbmcgPSAoRWRpdE1vZGUuY3VyTW9kZSgpLm5hbWUgPT09ICdhbmltYXRpb24nICYmICEhQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbik7XG4gICAgICAgICAgICBpZiAobm93UHJldmlld2luZyAhPT0gYW5pbWF0aW9uU3RhdGUucHJldmlld2luZykge1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLnByZXZpZXdpbmcgPSBub3dQcmV2aWV3aW5nO1xuICAgICAgICAgICAgICAgIGlmIChub3dQcmV2aWV3aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gY2MuZW5naW5lLmdldEluc3RhbmNlQnlJZChBbmltVXRpbHMuQ2FjaGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbiA9IGNvbXBvbmVudC5nZXRBbmltYXRpb25TdGF0ZShBbmltVXRpbHMuQ2FjaGUuYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS50aW1lID0gYW5pbWF0aW9uLnRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub3dQcmV2aWV3aW5nKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IGNjLmVuZ2luZS5nZXRJbnN0YW5jZUJ5SWQoQW5pbVV0aWxzLkNhY2hlLmNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gY29tcG9uZW50LmdldEFuaW1hdGlvblN0YXRlKEFuaW1VdGlscy5DYWNoZS5hbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uICYmIGFuaW1hdGlvblN0YXRlLnRpbWUgIT09IGFuaW1hdGlvbi50aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS5hbmltYXRlZFNpbmNlTGFzdEZyYW1lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLnRpbWUgPSBBbmltVXRpbHMuQ2FjaGUuYW5pbWF0aW9uLnRpbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgIGlmIChzY2VuZSkge1xuICAgICAgICB3aWRnZXRNYW5hZ2VyLmlzQWxpZ25pbmcgPSB0cnVlO1xuICAgICAgICBpZiAod2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5KSB7XG4gICAgICAgICAgICBhY3RpdmVXaWRnZXRzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB2aXNpdE5vZGUoc2NlbmUpO1xuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgaSwgd2lkZ2V0LCBpdGVyYXRvciA9IHdpZGdldE1hbmFnZXIuX2FjdGl2ZVdpZGdldHNJdGVyYXRvcjtcbiAgICAgICAgICAgIHZhciBBbmltVXRpbHM7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SICYmXG4gICAgICAgICAgICAgICAgKEFuaW1VdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL2FuaW1hdGlvbicpKSAmJlxuICAgICAgICAgICAgICAgIEFuaW1VdGlscy5DYWNoZS5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgZWRpdGluZ05vZGUgPSBjYy5lbmdpbmUuZ2V0SW5zdGFuY2VCeUlkKEFuaW1VdGlscy5DYWNoZS5yTm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRpbmdOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IGFjdGl2ZVdpZGdldHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldCA9IGFjdGl2ZVdpZGdldHNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHdpZGdldC5ub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdpZGdldC5hbGlnbk1vZGUgIT09IEFsaWduTW9kZS5BTFdBWVMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZS5hbmltYXRlZFNpbmNlTGFzdEZyYW1lICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5pc0NoaWxkT2YoZWRpdGluZ05vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWRnZXQgY29udGFpbnMgaW4gYWN0aXZlV2lkZ2V0cyBzaG91bGQgYWxpZ25lZCBhdCBsZWFzdCBvbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduKG5vZGUsIHdpZGdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBsb29wIHJldmVyc2VseSB3aWxsIG5vdCBoZWxwIHRvIHByZXZlbnQgb3V0IG9mIHN5bmNcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHVzZXIgbWF5IHJlbW92ZSBtb3JlIHRoYW4gb25lIGl0ZW0gZHVyaW5nIGEgc3RlcC5cbiAgICAgICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYWN0aXZlV2lkZ2V0cy5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xuICAgICAgICAgICAgICAgICAgICB3aWRnZXQgPSBhY3RpdmVXaWRnZXRzW2l0ZXJhdG9yLmldO1xuICAgICAgICAgICAgICAgICAgICBhbGlnbih3aWRnZXQubm9kZSwgd2lkZ2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2lkZ2V0TWFuYWdlci5pc0FsaWduaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYW5pbWF0aW9uIGVkaXRvclxuICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSA9IGZhbHNlO1xuICAgIH1cbn1cblxudmFyIGFkanVzdFdpZGdldFRvQWxsb3dNb3ZpbmdJbkVkaXRvciA9IENDX0VESVRPUiAmJiBmdW5jdGlvbiAob2xkUG9zKSB7XG4gICAgaWYgKHdpZGdldE1hbmFnZXIuaXNBbGlnbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBuZXdQb3MgPSB0aGlzLm5vZGUucG9zaXRpb247XG4gICAgdmFyIGRlbHRhID0gbmV3UG9zLnN1YihvbGRQb3MpO1xuXG4gICAgdmFyIHRhcmdldCA9IHRoaXMubm9kZS5fcGFyZW50O1xuICAgIHZhciBpbnZlcnNlU2NhbGUgPSBjYy5WZWMyLk9ORTtcblxuICAgIGlmICh0aGlzLl90YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0O1xuICAgICAgICBjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0KHRoaXMubm9kZSwgdGFyZ2V0LCBuZXcgY2MuVmVjMigpLCBpbnZlcnNlU2NhbGUpO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRTaXplID0gZ2V0UmVhZG9ubHlOb2RlU2l6ZSh0YXJnZXQpO1xuICAgIHZhciBkZWx0YUluUGVyY2VudDtcbiAgICBpZiAodGFyZ2V0U2l6ZS53aWR0aCAhPT0gMCAmJiB0YXJnZXRTaXplLmhlaWdodCAhPT0gMCkge1xuICAgICAgICBkZWx0YUluUGVyY2VudCA9IG5ldyBjYy5WZWMyKGRlbHRhLnggLyB0YXJnZXRTaXplLndpZHRoLCBkZWx0YS55IC8gdGFyZ2V0U2l6ZS5oZWlnaHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVsdGFJblBlcmNlbnQgPSBjYy5WZWMyLlpFUk87XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBbGlnblRvcCkge1xuICAgICAgICB0aGlzLnRvcCAtPSAodGhpcy5pc0Fic29sdXRlVG9wID8gZGVsdGEueSA6IGRlbHRhSW5QZXJjZW50LnkpICogaW52ZXJzZVNjYWxlLnk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25Cb3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20gKz0gKHRoaXMuaXNBYnNvbHV0ZUJvdHRvbSA/IGRlbHRhLnkgOiBkZWx0YUluUGVyY2VudC55KSAqIGludmVyc2VTY2FsZS55O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduTGVmdCkge1xuICAgICAgICB0aGlzLmxlZnQgKz0gKHRoaXMuaXNBYnNvbHV0ZUxlZnQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiBpbnZlcnNlU2NhbGUueDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNBbGlnblJpZ2h0KSB7XG4gICAgICAgIHRoaXMucmlnaHQgLT0gKHRoaXMuaXNBYnNvbHV0ZVJpZ2h0ID8gZGVsdGEueCA6IGRlbHRhSW5QZXJjZW50LngpICogaW52ZXJzZVNjYWxlLng7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyKSB7XG4gICAgICAgIHRoaXMuaG9yaXpvbnRhbENlbnRlciArPSAodGhpcy5pc0Fic29sdXRlSG9yaXpvbnRhbENlbnRlciA/IGRlbHRhLnggOiBkZWx0YUluUGVyY2VudC54KSAqIGludmVyc2VTY2FsZS54O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduVmVydGljYWxDZW50ZXIpIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNhbENlbnRlciArPSAodGhpcy5pc0Fic29sdXRlVmVydGljYWxDZW50ZXIgPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiBpbnZlcnNlU2NhbGUueTtcbiAgICB9XG59O1xuXG52YXIgYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IgPSBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKG9sZFNpemUpIHtcbiAgICBpZiAod2lkZ2V0TWFuYWdlci5pc0FsaWduaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5ld1NpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICB2YXIgZGVsdGEgPSBjYy52MihuZXdTaXplLndpZHRoIC0gb2xkU2l6ZS53aWR0aCwgbmV3U2l6ZS5oZWlnaHQgLSBvbGRTaXplLmhlaWdodCk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5ub2RlLl9wYXJlbnQ7XG4gICAgdmFyIGludmVyc2VTY2FsZSA9IGNjLlZlYzIuT05FO1xuICAgIGlmICh0aGlzLl90YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0O1xuICAgICAgICBjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0KHRoaXMubm9kZSwgdGFyZ2V0LCBuZXcgY2MuVmVjMigpLCBpbnZlcnNlU2NhbGUpO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRTaXplID0gZ2V0UmVhZG9ubHlOb2RlU2l6ZSh0YXJnZXQpO1xuICAgIHZhciBkZWx0YUluUGVyY2VudDtcbiAgICBpZiAodGFyZ2V0U2l6ZS53aWR0aCAhPT0gMCAmJiB0YXJnZXRTaXplLmhlaWdodCAhPT0gMCkge1xuICAgICAgICBkZWx0YUluUGVyY2VudCA9IG5ldyBjYy5WZWMyKGRlbHRhLnggLyB0YXJnZXRTaXplLndpZHRoLCBkZWx0YS55IC8gdGFyZ2V0U2l6ZS5oZWlnaHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVsdGFJblBlcmNlbnQgPSBjYy5WZWMyLlpFUk87XG4gICAgfVxuXG4gICAgdmFyIGFuY2hvciA9IHRoaXMubm9kZS5fYW5jaG9yUG9pbnQ7XG5cbiAgICBpZiAodGhpcy5pc0FsaWduVG9wKSB7XG4gICAgICAgIHRoaXMudG9wIC09ICh0aGlzLmlzQWJzb2x1dGVUb3AgPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiAoMSAtIGFuY2hvci55KSAqIGludmVyc2VTY2FsZS55O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduQm90dG9tKSB7XG4gICAgICAgIHRoaXMuYm90dG9tIC09ICh0aGlzLmlzQWJzb2x1dGVCb3R0b20gPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiBhbmNob3IueSAqIGludmVyc2VTY2FsZS55O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduTGVmdCkge1xuICAgICAgICB0aGlzLmxlZnQgLT0gKHRoaXMuaXNBYnNvbHV0ZUxlZnQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiBhbmNob3IueCAqIGludmVyc2VTY2FsZS54O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduUmlnaHQpIHtcbiAgICAgICAgdGhpcy5yaWdodCAtPSAodGhpcy5pc0Fic29sdXRlUmlnaHQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiAoMSAtIGFuY2hvci54KSAqIGludmVyc2VTY2FsZS54O1xuICAgIH1cbn07XG5cbnZhciBhY3RpdmVXaWRnZXRzID0gW107XG5cbi8vIHVwZGF0ZUFsaWdubWVudCBmcm9tIHNjZW5lIHRvIG5vZGUgcmVjdXJzaXZlbHlcbmZ1bmN0aW9uIHVwZGF0ZUFsaWdubWVudCAobm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSBub2RlLl9wYXJlbnQ7XG4gICAgaWYgKGNjLk5vZGUuaXNOb2RlKHBhcmVudCkpIHtcbiAgICAgICAgdXBkYXRlQWxpZ25tZW50KHBhcmVudCk7XG4gICAgfVxuICAgIHZhciB3aWRnZXQgPSBub2RlLl93aWRnZXQgfHxcbiAgICAgICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTsgIC8vIG5vZGUuX3dpZGdldCB3aWxsIGJlIG51bGwgd2hlbiB3aWRnZXQgaXMgZGlzYWJsZWRcbiAgICBpZiAod2lkZ2V0ICYmIHBhcmVudCkge1xuICAgICAgICBhbGlnbihub2RlLCB3aWRnZXQpO1xuICAgIH1cbn1cblxudmFyIHdpZGdldE1hbmFnZXIgPSBjYy5fd2lkZ2V0TWFuYWdlciA9IG1vZHVsZS5leHBvcnRzID0ge1xuICAgIF9BbGlnbkZsYWdzOiB7XG4gICAgICAgIFRPUDogVE9QLFxuICAgICAgICBNSUQ6IE1JRCwgICAgICAgLy8gdmVydGljYWwgY2VudGVyXG4gICAgICAgIEJPVDogQk9ULFxuICAgICAgICBMRUZUOiBMRUZULFxuICAgICAgICBDRU5URVI6IENFTlRFUiwgLy8gaG9yaXpvbnRhbCBjZW50ZXJcbiAgICAgICAgUklHSFQ6IFJJR0hUXG4gICAgfSxcbiAgICBpc0FsaWduaW5nOiBmYWxzZSxcbiAgICBfbm9kZXNPcmRlckRpcnR5OiBmYWxzZSxcbiAgICBfYWN0aXZlV2lkZ2V0c0l0ZXJhdG9yOiBuZXcgY2MuanMuYXJyYXkuTXV0YWJsZUZvcndhcmRJdGVyYXRvcihhY3RpdmVXaWRnZXRzKSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIChkaXJlY3Rvcikge1xuICAgICAgICBkaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHJlZnJlc2hTY2VuZSk7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiBjYy5lbmdpbmUpIHtcbiAgICAgICAgICAgIGNjLmVuZ2luZS5vbignZGVzaWduLXJlc29sdXRpb24tY2hhbmdlZCcsIHRoaXMub25SZXNpemVkLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRoaXNPblJlc2l6ZWQgPSB0aGlzLm9uUmVzaXplZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXNPblJlc2l6ZWQpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpc09uUmVzaXplZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24gKHdpZGdldCkge1xuICAgICAgICB3aWRnZXQubm9kZS5fd2lkZ2V0ID0gd2lkZ2V0O1xuICAgICAgICB0aGlzLl9ub2Rlc09yZGVyRGlydHkgPSB0cnVlO1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICB3aWRnZXQubm9kZS5vbihFdmVudC5QT1NJVElPTl9DSEFOR0VELCBhZGp1c3RXaWRnZXRUb0FsbG93TW92aW5nSW5FZGl0b3IsIHdpZGdldCk7XG4gICAgICAgICAgICB3aWRnZXQubm9kZS5vbihFdmVudC5TSVpFX0NIQU5HRUQsIGFkanVzdFdpZGdldFRvQWxsb3dSZXNpemluZ0luRWRpdG9yLCB3aWRnZXQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uICh3aWRnZXQpIHtcbiAgICAgICAgd2lkZ2V0Lm5vZGUuX3dpZGdldCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FjdGl2ZVdpZGdldHNJdGVyYXRvci5yZW1vdmUod2lkZ2V0KTtcbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiAhY2MuZW5naW5lLmlzUGxheWluZykge1xuICAgICAgICAgICAgd2lkZ2V0Lm5vZGUub2ZmKEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIGFkanVzdFdpZGdldFRvQWxsb3dNb3ZpbmdJbkVkaXRvciwgd2lkZ2V0KTtcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9mZihFdmVudC5TSVpFX0NIQU5HRUQsIGFkanVzdFdpZGdldFRvQWxsb3dSZXNpemluZ0luRWRpdG9yLCB3aWRnZXQpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBvblJlc2l6ZWQgKCkge1xuICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICBpZiAoc2NlbmUpIHtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdpZGdldE9uUmVzaXplZChzY2VuZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlZnJlc2hXaWRnZXRPblJlc2l6ZWQgKG5vZGUpIHtcbiAgICAgICAgdmFyIHdpZGdldCA9IGNjLk5vZGUuaXNOb2RlKG5vZGUpICYmIG5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCk7XG4gICAgICAgIGlmICh3aWRnZXQpIHtcbiAgICAgICAgICAgIGlmICh3aWRnZXQuYWxpZ25Nb2RlID09PSBBbGlnbk1vZGUuT05fV0lORE9XX1JFU0laRSkge1xuICAgICAgICAgICAgICAgIHdpZGdldC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdpZGdldE9uUmVzaXplZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUFsaWdubWVudDogdXBkYXRlQWxpZ25tZW50LFxuICAgIEFsaWduTW9kZTogQWxpZ25Nb2RlLFxufTtcblxuaWYgKENDX0VESVRPUikge1xuICAgIG1vZHVsZS5leHBvcnRzLl9jb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0ID0gY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldDtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0UmVhZG9ubHlOb2RlU2l6ZSA9IGdldFJlYWRvbmx5Tm9kZVNpemU7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==