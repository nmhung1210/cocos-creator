
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
      widgetManager.remove(widget);
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
              widgetManager.remove(widget);
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

    if (widget && widget.enabled && widget.alignMode === AlignMode.ON_WINDOW_RESIZE) {
      this.add(widget);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Jhc2UtdWkvQ0NXaWRnZXRNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIkV2ZW50IiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsInJlcXVpcmUiLCJFdmVudFR5cGUiLCJUT1AiLCJNSUQiLCJCT1QiLCJMRUZUIiwiQ0VOVEVSIiwiUklHSFQiLCJIT1JJWk9OVEFMIiwiVkVSVElDQUwiLCJBbGlnbk1vZGUiLCJjYyIsIkVudW0iLCJPTkNFIiwiT05fV0lORE9XX1JFU0laRSIsIkFMV0FZUyIsImdldFJlYWRvbmx5Tm9kZVNpemUiLCJwYXJlbnQiLCJTY2VuZSIsImVuZ2luZSIsImdldERlc2lnblJlc29sdXRpb25TaXplIiwidmlzaWJsZVJlY3QiLCJfY29udGVudFNpemUiLCJjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0Iiwid2lkZ2V0Tm9kZSIsInRhcmdldCIsIm91dF9pbnZlcnNlVHJhbnNsYXRlIiwib3V0X2ludmVyc2VTY2FsZSIsInNjYWxlWCIsIl9wYXJlbnQiLCJzY2FsZVkiLCJ0cmFuc2xhdGVYIiwidHJhbnNsYXRlWSIsIm5vZGUiLCJ4IiwieSIsInN4Iiwic3kiLCJ0SW52ZXJzZVRyYW5zbGF0ZSIsIlZlYzIiLCJaRVJPIiwidEludmVyc2VTY2FsZSIsIk9ORSIsImFsaWduIiwid2lkZ2V0IiwiaGFzVGFyZ2V0IiwiX3RhcmdldCIsImludmVyc2VUcmFuc2xhdGUiLCJpbnZlcnNlU2NhbGUiLCJ0YXJnZXRTaXplIiwidGFyZ2V0QW5jaG9yIiwiX2FuY2hvclBvaW50IiwiaXNSb290IiwiYW5jaG9yIiwiX2FsaWduRmxhZ3MiLCJsb2NhbExlZnQiLCJsb2NhbFJpZ2h0IiwidGFyZ2V0V2lkdGgiLCJ3aWR0aCIsImxlZnQiLCJyaWdodCIsIl9pc0Fic0xlZnQiLCJfbGVmdCIsIl9pc0Fic1JpZ2h0IiwiX3JpZ2h0IiwiYW5jaG9yWCIsImlzU3RyZXRjaFdpZHRoIiwiaXNBbGlnbkhvcml6b250YWxDZW50ZXIiLCJsb2NhbEhvcml6b250YWxDZW50ZXIiLCJfaXNBYnNIb3Jpem9udGFsQ2VudGVyIiwiX2hvcml6b250YWxDZW50ZXIiLCJ0YXJnZXRDZW50ZXIiLCJpc0FsaWduTGVmdCIsImxvY2FsVG9wIiwibG9jYWxCb3R0b20iLCJ0YXJnZXRIZWlnaHQiLCJoZWlnaHQiLCJib3R0b20iLCJ0b3AiLCJfaXNBYnNCb3R0b20iLCJfYm90dG9tIiwiX2lzQWJzVG9wIiwiX3RvcCIsImFuY2hvclkiLCJpc1N0cmV0Y2hIZWlnaHQiLCJpc0FsaWduVmVydGljYWxDZW50ZXIiLCJsb2NhbFZlcnRpY2FsQ2VudGVyIiwiX2lzQWJzVmVydGljYWxDZW50ZXIiLCJfdmVydGljYWxDZW50ZXIiLCJ0YXJnZXRNaWRkbGUiLCJpc0FsaWduQm90dG9tIiwic2V0UG9zaXRpb24iLCJ2aXNpdE5vZGUiLCJfd2lkZ2V0IiwiQ0NfREVWIiwiX3ZhbGlkYXRlVGFyZ2V0SW5ERVYiLCJhbmltYXRpb25TdGF0ZSIsImFuaW1hdGVkU2luY2VMYXN0RnJhbWUiLCJhbGlnbk1vZGUiLCJ3aWRnZXRNYW5hZ2VyIiwicmVtb3ZlIiwiYWN0aXZlV2lkZ2V0cyIsInB1c2giLCJjaGlsZHJlbiIsIl9jaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJjaGlsZCIsIl9hY3RpdmUiLCJwcmV2aWV3aW5nIiwidGltZSIsInJlZnJlc2hTY2VuZSIsImlzQnVpbGRlciIsIkFuaW1VdGlscyIsIkVkaXRNb2RlIiwibm93UHJldmlld2luZyIsImN1ck1vZGUiLCJuYW1lIiwiQ2FjaGUiLCJhbmltYXRpb24iLCJjb21wb25lbnQiLCJnZXRJbnN0YW5jZUJ5SWQiLCJnZXRBbmltYXRpb25TdGF0ZSIsInNjZW5lIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsImlzQWxpZ25pbmciLCJfbm9kZXNPcmRlckRpcnR5IiwiaXRlcmF0b3IiLCJfYWN0aXZlV2lkZ2V0c0l0ZXJhdG9yIiwiZWRpdGluZ05vZGUiLCJyTm9kZSIsImlzQ2hpbGRPZiIsImFkanVzdFdpZGdldFRvQWxsb3dNb3ZpbmdJbkVkaXRvciIsIm9sZFBvcyIsIm5ld1BvcyIsInBvc2l0aW9uIiwiZGVsdGEiLCJzdWIiLCJkZWx0YUluUGVyY2VudCIsImlzQWxpZ25Ub3AiLCJpc0Fic29sdXRlVG9wIiwiaXNBYnNvbHV0ZUJvdHRvbSIsImlzQWJzb2x1dGVMZWZ0IiwiaXNBbGlnblJpZ2h0IiwiaXNBYnNvbHV0ZVJpZ2h0IiwiaG9yaXpvbnRhbENlbnRlciIsImlzQWJzb2x1dGVIb3Jpem9udGFsQ2VudGVyIiwidmVydGljYWxDZW50ZXIiLCJpc0Fic29sdXRlVmVydGljYWxDZW50ZXIiLCJhZGp1c3RXaWRnZXRUb0FsbG93UmVzaXppbmdJbkVkaXRvciIsIm9sZFNpemUiLCJuZXdTaXplIiwiZ2V0Q29udGVudFNpemUiLCJ2MiIsInVwZGF0ZUFsaWdubWVudCIsIk5vZGUiLCJpc05vZGUiLCJnZXRDb21wb25lbnQiLCJXaWRnZXQiLCJfd2lkZ2V0TWFuYWdlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJfQWxpZ25GbGFncyIsImpzIiwiYXJyYXkiLCJNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yIiwiaW5pdCIsIm9uIiwiRGlyZWN0b3IiLCJFVkVOVF9BRlRFUl9VUERBVEUiLCJvblJlc2l6ZWQiLCJiaW5kIiwidGhpc09uUmVzaXplZCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGQiLCJpc1BsYXlpbmciLCJQT1NJVElPTl9DSEFOR0VEIiwiU0laRV9DSEFOR0VEIiwib2ZmIiwicmVmcmVzaFdpZGdldE9uUmVzaXplZCIsImVuYWJsZWQiLCJfY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldCIsIl9nZXRSZWFkb25seU5vZGVTaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsS0FBSixFQUVBOztBQUNBLElBQUksQ0FBQ0MsU0FBRCxJQUFjLENBQUNDLE1BQU0sQ0FBQ0MsYUFBMUIsRUFBeUM7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QWpCLElBQTRCMUksTUFBTSxDQUFDc0QsU0FBUCxLQUFxQnhGLFNBQVMsQ0FBQ0ksZ0JBQS9ELEVBQWlGO0FBQzdFLFdBQUtrSyxHQUFMLENBQVNwSSxNQUFUO0FBQ0g7O0FBRUQsUUFBSTJELFFBQVEsR0FBR3RFLElBQUksQ0FBQ3VFLFNBQXBCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QyxVQUFJRSxLQUFLLEdBQUdKLFFBQVEsQ0FBQ0UsQ0FBRCxDQUFwQjtBQUNBLFdBQUs0RSxzQkFBTCxDQUE0QjFFLEtBQTVCO0FBQ0g7QUFDSixHQTFEb0Q7QUEyRHJEZ0QsRUFBQUEsZUFBZSxFQUFFQSxlQTNEb0M7QUE0RHJEakosRUFBQUEsU0FBUyxFQUFFQTtBQTVEMEMsQ0FBekQ7O0FBK0RBLElBQUliLFNBQUosRUFBZTtBQUNYb0ssRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVxQiw2QkFBZixHQUErQ2hLLDRCQUEvQztBQUNBMEksRUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWVzQixvQkFBZixHQUFzQ3hLLG1CQUF0QztBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgRXZlbnQ7XG5cbi8vIFN1cHBvcnQgc2VyaWFsaXppbmcgd2lkZ2V0IGluIGFzc2V0IGRiLCBzZWUgY29jb3MtY3JlYXRvci8yZC10YXNrcy9pc3N1ZXMvMTg5NFxuaWYgKCFDQ19FRElUT1IgfHwgIUVkaXRvci5pc01haW5Qcm9jZXNzKSB7XG4gIEV2ZW50ID0gcmVxdWlyZSgnLi4vQ0NOb2RlJykuRXZlbnRUeXBlO1xufVxuXG52YXIgVE9QICAgICA9IDEgPDwgMDtcbnZhciBNSUQgICAgID0gMSA8PCAxOyAgIC8vIHZlcnRpY2FsIGNlbnRlclxudmFyIEJPVCAgICAgPSAxIDw8IDI7XG52YXIgTEVGVCAgICA9IDEgPDwgMztcbnZhciBDRU5URVIgID0gMSA8PCA0OyAgIC8vIGhvcml6b250YWwgY2VudGVyXG52YXIgUklHSFQgICA9IDEgPDwgNTtcbnZhciBIT1JJWk9OVEFMID0gTEVGVCB8IENFTlRFUiB8IFJJR0hUO1xudmFyIFZFUlRJQ0FMID0gVE9QIHwgTUlEIHwgQk9UO1xuXG52YXIgQWxpZ25Nb2RlID0gY2MuRW51bSh7XG4gICAgT05DRTogMCxcbiAgICBPTl9XSU5ET1dfUkVTSVpFOiAxLFxuICAgIEFMV0FZUzogMixcbn0pO1xuXG4vLyByZXR1cm5zIGEgcmVhZG9ubHkgc2l6ZSBvZiB0aGUgbm9kZVxuZnVuY3Rpb24gZ2V0UmVhZG9ubHlOb2RlU2l6ZSAocGFyZW50KSB7XG4gICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIGNjLlNjZW5lKSB7XG4gICAgICAgIHJldHVybiBDQ19FRElUT1IgPyBjYy5lbmdpbmUuZ2V0RGVzaWduUmVzb2x1dGlvblNpemUoKSA6IGNjLnZpc2libGVSZWN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhcmVudC5fY29udGVudFNpemU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0ICh3aWRnZXROb2RlLCB0YXJnZXQsIG91dF9pbnZlcnNlVHJhbnNsYXRlLCBvdXRfaW52ZXJzZVNjYWxlKSB7XG4gICAgdmFyIHNjYWxlWCA9IHdpZGdldE5vZGUuX3BhcmVudC5zY2FsZVg7XG4gICAgdmFyIHNjYWxlWSA9IHdpZGdldE5vZGUuX3BhcmVudC5zY2FsZVk7XG4gICAgdmFyIHRyYW5zbGF0ZVggPSAwO1xuICAgIHZhciB0cmFuc2xhdGVZID0gMDtcbiAgICBmb3IgKHZhciBub2RlID0gd2lkZ2V0Tm9kZS5fcGFyZW50OzspIHtcbiAgICAgICAgdHJhbnNsYXRlWCArPSBub2RlLng7XG4gICAgICAgIHRyYW5zbGF0ZVkgKz0gbm9kZS55O1xuICAgICAgICBub2RlID0gbm9kZS5fcGFyZW50OyAgICAvLyBsb29wIGluY3JlbWVudFxuICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgIC8vIEVSUk9SOiB3aWRnZXROb2RlIHNob3VsZCBiZSBjaGlsZCBvZiB0YXJnZXRcbiAgICAgICAgICAgIG91dF9pbnZlcnNlVHJhbnNsYXRlLnggPSBvdXRfaW52ZXJzZVRyYW5zbGF0ZS55ID0gMDtcbiAgICAgICAgICAgIG91dF9pbnZlcnNlU2NhbGUueCA9IG91dF9pbnZlcnNlU2NhbGUueSA9IDE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUgIT09IHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIHN4ID0gbm9kZS5zY2FsZVg7XG4gICAgICAgICAgICB2YXIgc3kgPSBub2RlLnNjYWxlWTtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVggKj0gc3g7XG4gICAgICAgICAgICB0cmFuc2xhdGVZICo9IHN5O1xuICAgICAgICAgICAgc2NhbGVYICo9IHN4O1xuICAgICAgICAgICAgc2NhbGVZICo9IHN5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3V0X2ludmVyc2VTY2FsZS54ID0gc2NhbGVYICE9PSAwID8gKDEgLyBzY2FsZVgpIDogMTtcbiAgICBvdXRfaW52ZXJzZVNjYWxlLnkgPSBzY2FsZVkgIT09IDAgPyAoMSAvIHNjYWxlWSkgOiAxO1xuICAgIG91dF9pbnZlcnNlVHJhbnNsYXRlLnggPSAtdHJhbnNsYXRlWDtcbiAgICBvdXRfaW52ZXJzZVRyYW5zbGF0ZS55ID0gLXRyYW5zbGF0ZVk7XG59XG5cbnZhciB0SW52ZXJzZVRyYW5zbGF0ZSA9IGNjLlZlYzIuWkVSTztcbnZhciB0SW52ZXJzZVNjYWxlID0gY2MuVmVjMi5PTkU7XG5cbi8vIGFsaWduIHRvIGJvcmRlcnMgYnkgYWRqdXN0aW5nIG5vZGUncyBwb3NpdGlvbiBhbmQgc2l6ZSAoaWdub3JlIHJvdGF0aW9uKVxuZnVuY3Rpb24gYWxpZ24gKG5vZGUsIHdpZGdldCkge1xuICAgIHZhciBoYXNUYXJnZXQgPSB3aWRnZXQuX3RhcmdldDtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIHZhciBpbnZlcnNlVHJhbnNsYXRlLCBpbnZlcnNlU2NhbGU7XG4gICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSBoYXNUYXJnZXQ7XG4gICAgICAgIGludmVyc2VUcmFuc2xhdGUgPSB0SW52ZXJzZVRyYW5zbGF0ZTtcbiAgICAgICAgaW52ZXJzZVNjYWxlID0gdEludmVyc2VTY2FsZTtcbiAgICAgICAgY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldChub2RlLCB0YXJnZXQsIGludmVyc2VUcmFuc2xhdGUsIGludmVyc2VTY2FsZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSBub2RlLl9wYXJlbnQ7XG4gICAgfVxuICAgIHZhciB0YXJnZXRTaXplID0gZ2V0UmVhZG9ubHlOb2RlU2l6ZSh0YXJnZXQpO1xuICAgIHZhciB0YXJnZXRBbmNob3IgPSB0YXJnZXQuX2FuY2hvclBvaW50O1xuXG4gICAgdmFyIGlzUm9vdCA9ICFDQ19FRElUT1IgJiYgdGFyZ2V0IGluc3RhbmNlb2YgY2MuU2NlbmU7XG4gICAgdmFyIHggPSBub2RlLngsIHkgPSBub2RlLnk7XG4gICAgdmFyIGFuY2hvciA9IG5vZGUuX2FuY2hvclBvaW50O1xuXG4gICAgaWYgKHdpZGdldC5fYWxpZ25GbGFncyAmIEhPUklaT05UQUwpIHtcblxuICAgICAgICB2YXIgbG9jYWxMZWZ0LCBsb2NhbFJpZ2h0LCB0YXJnZXRXaWR0aCA9IHRhcmdldFNpemUud2lkdGg7XG4gICAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgICAgIGxvY2FsTGVmdCA9IGNjLnZpc2libGVSZWN0LmxlZnQueDtcbiAgICAgICAgICAgIGxvY2FsUmlnaHQgPSBjYy52aXNpYmxlUmVjdC5yaWdodC54O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9jYWxMZWZ0ID0gLXRhcmdldEFuY2hvci54ICogdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICBsb2NhbFJpZ2h0ID0gbG9jYWxMZWZ0ICsgdGFyZ2V0V2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGp1c3QgYm9yZGVycyBhY2NvcmRpbmcgdG8gb2Zmc2V0c1xuICAgICAgICBsb2NhbExlZnQgKz0gd2lkZ2V0Ll9pc0Fic0xlZnQgPyB3aWRnZXQuX2xlZnQgOiB3aWRnZXQuX2xlZnQgKiB0YXJnZXRXaWR0aDtcbiAgICAgICAgbG9jYWxSaWdodCAtPSB3aWRnZXQuX2lzQWJzUmlnaHQgPyB3aWRnZXQuX3JpZ2h0IDogd2lkZ2V0Ll9yaWdodCAqIHRhcmdldFdpZHRoO1xuXG4gICAgICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgICAgIGxvY2FsTGVmdCArPSBpbnZlcnNlVHJhbnNsYXRlLng7XG4gICAgICAgICAgICBsb2NhbExlZnQgKj0gaW52ZXJzZVNjYWxlLng7XG4gICAgICAgICAgICBsb2NhbFJpZ2h0ICs9IGludmVyc2VUcmFuc2xhdGUueDtcbiAgICAgICAgICAgIGxvY2FsUmlnaHQgKj0gaW52ZXJzZVNjYWxlLng7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgd2lkdGgsIGFuY2hvclggPSBhbmNob3IueCwgc2NhbGVYID0gbm9kZS5zY2FsZVg7XG4gICAgICAgIGlmIChzY2FsZVggPCAwKSB7XG4gICAgICAgICAgICBhbmNob3JYID0gMS4wIC0gYW5jaG9yWDtcbiAgICAgICAgICAgIHNjYWxlWCA9IC1zY2FsZVg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpZGdldC5pc1N0cmV0Y2hXaWR0aCkge1xuICAgICAgICAgICAgd2lkdGggPSBsb2NhbFJpZ2h0IC0gbG9jYWxMZWZ0O1xuICAgICAgICAgICAgaWYgKHNjYWxlWCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUud2lkdGggPSB3aWR0aCAvIHNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHggPSBsb2NhbExlZnQgKyBhbmNob3JYICogd2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3aWR0aCA9IG5vZGUud2lkdGggKiBzY2FsZVg7XG4gICAgICAgICAgICBpZiAod2lkZ2V0LmlzQWxpZ25Ib3Jpem9udGFsQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsSG9yaXpvbnRhbENlbnRlciA9IHdpZGdldC5faXNBYnNIb3Jpem9udGFsQ2VudGVyID8gd2lkZ2V0Ll9ob3Jpem9udGFsQ2VudGVyIDogd2lkZ2V0Ll9ob3Jpem9udGFsQ2VudGVyICogdGFyZ2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldENlbnRlciA9ICgwLjUgLSB0YXJnZXRBbmNob3IueCkgKiB0YXJnZXRTaXplLndpZHRoO1xuICAgICAgICAgICAgICAgIGlmIChoYXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxIb3Jpem9udGFsQ2VudGVyICo9IGludmVyc2VTY2FsZS54O1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZW50ZXIgKz0gaW52ZXJzZVRyYW5zbGF0ZS54O1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRDZW50ZXIgKj0gaW52ZXJzZVNjYWxlLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHggPSB0YXJnZXRDZW50ZXIgKyAoYW5jaG9yWCAtIDAuNSkgKiB3aWR0aCArIGxvY2FsSG9yaXpvbnRhbENlbnRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZGdldC5pc0FsaWduTGVmdCkge1xuICAgICAgICAgICAgICAgIHggPSBsb2NhbExlZnQgKyBhbmNob3JYICogd2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB4ID0gbG9jYWxSaWdodCArIChhbmNob3JYIC0gMSkgKiB3aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3aWRnZXQuX2FsaWduRmxhZ3MgJiBWRVJUSUNBTCkge1xuXG4gICAgICAgIHZhciBsb2NhbFRvcCwgbG9jYWxCb3R0b20sIHRhcmdldEhlaWdodCA9IHRhcmdldFNpemUuaGVpZ2h0O1xuICAgICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICAgICBsb2NhbEJvdHRvbSA9IGNjLnZpc2libGVSZWN0LmJvdHRvbS55O1xuICAgICAgICAgICAgbG9jYWxUb3AgPSBjYy52aXNpYmxlUmVjdC50b3AueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxvY2FsQm90dG9tID0gLXRhcmdldEFuY2hvci55ICogdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgbG9jYWxUb3AgPSBsb2NhbEJvdHRvbSArIHRhcmdldEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkanVzdCBib3JkZXJzIGFjY29yZGluZyB0byBvZmZzZXRzXG4gICAgICAgIGxvY2FsQm90dG9tICs9IHdpZGdldC5faXNBYnNCb3R0b20gPyB3aWRnZXQuX2JvdHRvbSA6IHdpZGdldC5fYm90dG9tICogdGFyZ2V0SGVpZ2h0O1xuICAgICAgICBsb2NhbFRvcCAtPSB3aWRnZXQuX2lzQWJzVG9wID8gd2lkZ2V0Ll90b3AgOiB3aWRnZXQuX3RvcCAqIHRhcmdldEhlaWdodDtcblxuICAgICAgICBpZiAoaGFzVGFyZ2V0KSB7XG4gICAgICAgICAgICAvLyB0cmFuc2Zvcm1cbiAgICAgICAgICAgIGxvY2FsQm90dG9tICs9IGludmVyc2VUcmFuc2xhdGUueTtcbiAgICAgICAgICAgIGxvY2FsQm90dG9tICo9IGludmVyc2VTY2FsZS55O1xuICAgICAgICAgICAgbG9jYWxUb3AgKz0gaW52ZXJzZVRyYW5zbGF0ZS55O1xuICAgICAgICAgICAgbG9jYWxUb3AgKj0gaW52ZXJzZVNjYWxlLnk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGVpZ2h0LCBhbmNob3JZID0gYW5jaG9yLnksIHNjYWxlWSA9IG5vZGUuc2NhbGVZO1xuICAgICAgICBpZiAoc2NhbGVZIDwgMCkge1xuICAgICAgICAgICAgYW5jaG9yWSA9IDEuMCAtIGFuY2hvclk7XG4gICAgICAgICAgICBzY2FsZVkgPSAtc2NhbGVZO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aWRnZXQuaXNTdHJldGNoSGVpZ2h0KSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBsb2NhbFRvcCAtIGxvY2FsQm90dG9tO1xuICAgICAgICAgICAgaWYgKHNjYWxlWSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuaGVpZ2h0ID0gaGVpZ2h0IC8gc2NhbGVZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeSA9IGxvY2FsQm90dG9tICsgYW5jaG9yWSAqIGhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhlaWdodCA9IG5vZGUuaGVpZ2h0ICogc2NhbGVZO1xuICAgICAgICAgICAgaWYgKHdpZGdldC5pc0FsaWduVmVydGljYWxDZW50ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxWZXJ0aWNhbENlbnRlciA9IHdpZGdldC5faXNBYnNWZXJ0aWNhbENlbnRlciA/IHdpZGdldC5fdmVydGljYWxDZW50ZXIgOiB3aWRnZXQuX3ZlcnRpY2FsQ2VudGVyICogdGFyZ2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRNaWRkbGUgPSAoMC41IC0gdGFyZ2V0QW5jaG9yLnkpICogdGFyZ2V0U2l6ZS5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgaWYgKGhhc1RhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFZlcnRpY2FsQ2VudGVyICo9IGludmVyc2VTY2FsZS55O1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRNaWRkbGUgKz0gaW52ZXJzZVRyYW5zbGF0ZS55O1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRNaWRkbGUgKj0gaW52ZXJzZVNjYWxlLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHkgPSB0YXJnZXRNaWRkbGUgKyAoYW5jaG9yWSAtIDAuNSkgKiBoZWlnaHQgKyBsb2NhbFZlcnRpY2FsQ2VudGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAod2lkZ2V0LmlzQWxpZ25Cb3R0b20pIHtcbiAgICAgICAgICAgICAgICB5ID0gbG9jYWxCb3R0b20gKyBhbmNob3JZICogaGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeSA9IGxvY2FsVG9wICsgKGFuY2hvclkgLSAxKSAqIGhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5vZGUuc2V0UG9zaXRpb24oeCwgeSk7XG59XG5cbmZ1bmN0aW9uIHZpc2l0Tm9kZSAobm9kZSkge1xuICAgIHZhciB3aWRnZXQgPSBub2RlLl93aWRnZXQ7XG4gICAgaWYgKHdpZGdldCkge1xuICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICB3aWRnZXQuX3ZhbGlkYXRlVGFyZ2V0SW5ERVYoKTtcbiAgICAgICAgfVxuICAgICAgICBhbGlnbihub2RlLCB3aWRnZXQpO1xuICAgICAgICBpZiAoKCFDQ19FRElUT1IgfHwgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSkgJiYgd2lkZ2V0LmFsaWduTW9kZSAhPT0gQWxpZ25Nb2RlLkFMV0FZUykge1xuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmUod2lkZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFjdGl2ZVdpZGdldHMucHVzaCh3aWRnZXQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuX2NoaWxkcmVuO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaGlsZC5fYWN0aXZlKSB7XG4gICAgICAgICAgICB2aXNpdE5vZGUoY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgdmFyIGFuaW1hdGlvblN0YXRlID0ge1xuICAgICAgICBwcmV2aWV3aW5nOiBmYWxzZSxcbiAgICAgICAgdGltZTogMCxcbiAgICAgICAgYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZTogZmFsc2UsXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVmcmVzaFNjZW5lICgpIHtcbiAgICAvLyBjaGVjayBhbmltYXRpb24gZWRpdG9yXG4gICAgaWYgKENDX0VESVRPUiAmJiAhRWRpdG9yLmlzQnVpbGRlcikge1xuICAgICAgICB2YXIgQW5pbVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvYW5pbWF0aW9uJyk7XG4gICAgICAgIHZhciBFZGl0TW9kZSA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL2VkaXQtbW9kZScpO1xuICAgICAgICBpZiAoQW5pbVV0aWxzICYmIEVkaXRNb2RlKSB7XG4gICAgICAgICAgICB2YXIgbm93UHJldmlld2luZyA9IChFZGl0TW9kZS5jdXJNb2RlKCkubmFtZSA9PT0gJ2FuaW1hdGlvbicgJiYgISFBbmltVXRpbHMuQ2FjaGUuYW5pbWF0aW9uKTtcbiAgICAgICAgICAgIGlmIChub3dQcmV2aWV3aW5nICE9PSBhbmltYXRpb25TdGF0ZS5wcmV2aWV3aW5nKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUucHJldmlld2luZyA9IG5vd1ByZXZpZXdpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5vd1ByZXZpZXdpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBjYy5lbmdpbmUuZ2V0SW5zdGFuY2VCeUlkKEFuaW1VdGlscy5DYWNoZS5jb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gY29tcG9uZW50LmdldEFuaW1hdGlvblN0YXRlKEFuaW1VdGlscy5DYWNoZS5hbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLnRpbWUgPSBhbmltYXRpb24udGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUuYW5pbWF0ZWRTaW5jZUxhc3RGcmFtZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5vd1ByZXZpZXdpbmcpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gY2MuZW5naW5lLmdldEluc3RhbmNlQnlJZChBbmltVXRpbHMuQ2FjaGUuY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSBjb21wb25lbnQuZ2V0QW5pbWF0aW9uU3RhdGUoQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24gJiYgYW5pbWF0aW9uU3RhdGUudGltZSAhPT0gYW5pbWF0aW9uLnRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGUudGltZSA9IEFuaW1VdGlscy5DYWNoZS5hbmltYXRpb24udGltZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgaWYgKHNjZW5lKSB7XG4gICAgICAgIHdpZGdldE1hbmFnZXIuaXNBbGlnbmluZyA9IHRydWU7XG4gICAgICAgIGlmICh3aWRnZXRNYW5hZ2VyLl9ub2Rlc09yZGVyRGlydHkpIHtcbiAgICAgICAgICAgIGFjdGl2ZVdpZGdldHMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHZpc2l0Tm9kZShzY2VuZSk7XG4gICAgICAgICAgICB3aWRnZXRNYW5hZ2VyLl9ub2Rlc09yZGVyRGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpLCB3aWRnZXQsIGl0ZXJhdG9yID0gd2lkZ2V0TWFuYWdlci5fYWN0aXZlV2lkZ2V0c0l0ZXJhdG9yO1xuICAgICAgICAgICAgdmFyIEFuaW1VdGlscztcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IgJiZcbiAgICAgICAgICAgICAgICAoQW5pbVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvYW5pbWF0aW9uJykpICYmXG4gICAgICAgICAgICAgICAgQW5pbVV0aWxzLkNhY2hlLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBlZGl0aW5nTm9kZSA9IGNjLmVuZ2luZS5nZXRJbnN0YW5jZUJ5SWQoQW5pbVV0aWxzLkNhY2hlLnJOb2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdGluZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gYWN0aXZlV2lkZ2V0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0ID0gYWN0aXZlV2lkZ2V0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlID0gd2lkZ2V0Lm5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2lkZ2V0LmFsaWduTW9kZSAhPT0gQWxpZ25Nb2RlLkFMV0FZUyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmFuaW1hdGVkU2luY2VMYXN0RnJhbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmlzQ2hpbGRPZihlZGl0aW5nTm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpZGdldCBjb250YWlucyBpbiBhY3RpdmVXaWRnZXRzIHNob3VsZCBhbGlnbmVkIGF0IGxlYXN0IG9uY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRNYW5hZ2VyLnJlbW92ZSh3aWRnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ24obm9kZSwgd2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGxvb3AgcmV2ZXJzZWx5IHdpbGwgbm90IGhlbHAgdG8gcHJldmVudCBvdXQgb2Ygc3luY1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgdXNlciBtYXkgcmVtb3ZlIG1vcmUgdGhhbiBvbmUgaXRlbSBkdXJpbmcgYSBzdGVwLlxuICAgICAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhY3RpdmVXaWRnZXRzLmxlbmd0aDsgKytpdGVyYXRvci5pKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpZGdldCA9IGFjdGl2ZVdpZGdldHNbaXRlcmF0b3IuaV07XG4gICAgICAgICAgICAgICAgICAgIGFsaWduKHdpZGdldC5ub2RlLCB3aWRnZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aWRnZXRNYW5hZ2VyLmlzQWxpZ25pbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhbmltYXRpb24gZWRpdG9yXG4gICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICBhbmltYXRpb25TdGF0ZS5hbmltYXRlZFNpbmNlTGFzdEZyYW1lID0gZmFsc2U7XG4gICAgfVxufVxuXG52YXIgYWRqdXN0V2lkZ2V0VG9BbGxvd01vdmluZ0luRWRpdG9yID0gQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChvbGRQb3MpIHtcbiAgICBpZiAod2lkZ2V0TWFuYWdlci5pc0FsaWduaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5ld1BvcyA9IHRoaXMubm9kZS5wb3NpdGlvbjtcbiAgICB2YXIgZGVsdGEgPSBuZXdQb3Muc3ViKG9sZFBvcyk7XG5cbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5ub2RlLl9wYXJlbnQ7XG4gICAgdmFyIGludmVyc2VTY2FsZSA9IGNjLlZlYzIuT05FO1xuXG4gICAgaWYgKHRoaXMuX3RhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XG4gICAgICAgIGNvbXB1dGVJbnZlcnNlVHJhbnNGb3JUYXJnZXQodGhpcy5ub2RlLCB0YXJnZXQsIG5ldyBjYy5WZWMyKCksIGludmVyc2VTY2FsZSk7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFNpemUgPSBnZXRSZWFkb25seU5vZGVTaXplKHRhcmdldCk7XG4gICAgdmFyIGRlbHRhSW5QZXJjZW50O1xuICAgIGlmICh0YXJnZXRTaXplLndpZHRoICE9PSAwICYmIHRhcmdldFNpemUuaGVpZ2h0ICE9PSAwKSB7XG4gICAgICAgIGRlbHRhSW5QZXJjZW50ID0gbmV3IGNjLlZlYzIoZGVsdGEueCAvIHRhcmdldFNpemUud2lkdGgsIGRlbHRhLnkgLyB0YXJnZXRTaXplLmhlaWdodCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWx0YUluUGVyY2VudCA9IGNjLlZlYzIuWkVSTztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0FsaWduVG9wKSB7XG4gICAgICAgIHRoaXMudG9wIC09ICh0aGlzLmlzQWJzb2x1dGVUb3AgPyBkZWx0YS55IDogZGVsdGFJblBlcmNlbnQueSkgKiBpbnZlcnNlU2NhbGUueTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNBbGlnbkJvdHRvbSkge1xuICAgICAgICB0aGlzLmJvdHRvbSArPSAodGhpcy5pc0Fic29sdXRlQm90dG9tID8gZGVsdGEueSA6IGRlbHRhSW5QZXJjZW50LnkpICogaW52ZXJzZVNjYWxlLnk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25MZWZ0KSB7XG4gICAgICAgIHRoaXMubGVmdCArPSAodGhpcy5pc0Fic29sdXRlTGVmdCA/IGRlbHRhLnggOiBkZWx0YUluUGVyY2VudC54KSAqIGludmVyc2VTY2FsZS54O1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0FsaWduUmlnaHQpIHtcbiAgICAgICAgdGhpcy5yaWdodCAtPSAodGhpcy5pc0Fic29sdXRlUmlnaHQgPyBkZWx0YS54IDogZGVsdGFJblBlcmNlbnQueCkgKiBpbnZlcnNlU2NhbGUueDtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNBbGlnbkhvcml6b250YWxDZW50ZXIpIHtcbiAgICAgICAgdGhpcy5ob3Jpem9udGFsQ2VudGVyICs9ICh0aGlzLmlzQWJzb2x1dGVIb3Jpem9udGFsQ2VudGVyID8gZGVsdGEueCA6IGRlbHRhSW5QZXJjZW50LngpICogaW52ZXJzZVNjYWxlLng7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25WZXJ0aWNhbENlbnRlcikge1xuICAgICAgICB0aGlzLnZlcnRpY2FsQ2VudGVyICs9ICh0aGlzLmlzQWJzb2x1dGVWZXJ0aWNhbENlbnRlciA/IGRlbHRhLnkgOiBkZWx0YUluUGVyY2VudC55KSAqIGludmVyc2VTY2FsZS55O1xuICAgIH1cbn07XG5cbnZhciBhZGp1c3RXaWRnZXRUb0FsbG93UmVzaXppbmdJbkVkaXRvciA9IENDX0VESVRPUiAmJiBmdW5jdGlvbiAob2xkU2l6ZSkge1xuICAgIGlmICh3aWRnZXRNYW5hZ2VyLmlzQWxpZ25pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmV3U2l6ZSA9IHRoaXMubm9kZS5nZXRDb250ZW50U2l6ZSgpO1xuICAgIHZhciBkZWx0YSA9IGNjLnYyKG5ld1NpemUud2lkdGggLSBvbGRTaXplLndpZHRoLCBuZXdTaXplLmhlaWdodCAtIG9sZFNpemUuaGVpZ2h0KTtcblxuICAgIHZhciB0YXJnZXQgPSB0aGlzLm5vZGUuX3BhcmVudDtcbiAgICB2YXIgaW52ZXJzZVNjYWxlID0gY2MuVmVjMi5PTkU7XG4gICAgaWYgKHRoaXMuX3RhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLl90YXJnZXQ7XG4gICAgICAgIGNvbXB1dGVJbnZlcnNlVHJhbnNGb3JUYXJnZXQodGhpcy5ub2RlLCB0YXJnZXQsIG5ldyBjYy5WZWMyKCksIGludmVyc2VTY2FsZSk7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldFNpemUgPSBnZXRSZWFkb25seU5vZGVTaXplKHRhcmdldCk7XG4gICAgdmFyIGRlbHRhSW5QZXJjZW50O1xuICAgIGlmICh0YXJnZXRTaXplLndpZHRoICE9PSAwICYmIHRhcmdldFNpemUuaGVpZ2h0ICE9PSAwKSB7XG4gICAgICAgIGRlbHRhSW5QZXJjZW50ID0gbmV3IGNjLlZlYzIoZGVsdGEueCAvIHRhcmdldFNpemUud2lkdGgsIGRlbHRhLnkgLyB0YXJnZXRTaXplLmhlaWdodCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkZWx0YUluUGVyY2VudCA9IGNjLlZlYzIuWkVSTztcbiAgICB9XG5cbiAgICB2YXIgYW5jaG9yID0gdGhpcy5ub2RlLl9hbmNob3JQb2ludDtcblxuICAgIGlmICh0aGlzLmlzQWxpZ25Ub3ApIHtcbiAgICAgICAgdGhpcy50b3AgLT0gKHRoaXMuaXNBYnNvbHV0ZVRvcCA/IGRlbHRhLnkgOiBkZWx0YUluUGVyY2VudC55KSAqICgxIC0gYW5jaG9yLnkpICogaW52ZXJzZVNjYWxlLnk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25Cb3R0b20pIHtcbiAgICAgICAgdGhpcy5ib3R0b20gLT0gKHRoaXMuaXNBYnNvbHV0ZUJvdHRvbSA/IGRlbHRhLnkgOiBkZWx0YUluUGVyY2VudC55KSAqIGFuY2hvci55ICogaW52ZXJzZVNjYWxlLnk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25MZWZ0KSB7XG4gICAgICAgIHRoaXMubGVmdCAtPSAodGhpcy5pc0Fic29sdXRlTGVmdCA/IGRlbHRhLnggOiBkZWx0YUluUGVyY2VudC54KSAqIGFuY2hvci54ICogaW52ZXJzZVNjYWxlLng7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzQWxpZ25SaWdodCkge1xuICAgICAgICB0aGlzLnJpZ2h0IC09ICh0aGlzLmlzQWJzb2x1dGVSaWdodCA/IGRlbHRhLnggOiBkZWx0YUluUGVyY2VudC54KSAqICgxIC0gYW5jaG9yLngpICogaW52ZXJzZVNjYWxlLng7XG4gICAgfVxufTtcblxudmFyIGFjdGl2ZVdpZGdldHMgPSBbXTtcblxuLy8gdXBkYXRlQWxpZ25tZW50IGZyb20gc2NlbmUgdG8gbm9kZSByZWN1cnNpdmVseVxuZnVuY3Rpb24gdXBkYXRlQWxpZ25tZW50IChub2RlKSB7XG4gICAgdmFyIHBhcmVudCA9IG5vZGUuX3BhcmVudDtcbiAgICBpZiAoY2MuTm9kZS5pc05vZGUocGFyZW50KSkge1xuICAgICAgICB1cGRhdGVBbGlnbm1lbnQocGFyZW50KTtcbiAgICB9XG4gICAgdmFyIHdpZGdldCA9IG5vZGUuX3dpZGdldCB8fFxuICAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpOyAgLy8gbm9kZS5fd2lkZ2V0IHdpbGwgYmUgbnVsbCB3aGVuIHdpZGdldCBpcyBkaXNhYmxlZFxuICAgIGlmICh3aWRnZXQgJiYgcGFyZW50KSB7XG4gICAgICAgIGFsaWduKG5vZGUsIHdpZGdldCk7XG4gICAgfVxufVxuXG52YXIgd2lkZ2V0TWFuYWdlciA9IGNjLl93aWRnZXRNYW5hZ2VyID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgX0FsaWduRmxhZ3M6IHtcbiAgICAgICAgVE9QOiBUT1AsXG4gICAgICAgIE1JRDogTUlELCAgICAgICAvLyB2ZXJ0aWNhbCBjZW50ZXJcbiAgICAgICAgQk9UOiBCT1QsXG4gICAgICAgIExFRlQ6IExFRlQsXG4gICAgICAgIENFTlRFUjogQ0VOVEVSLCAvLyBob3Jpem9udGFsIGNlbnRlclxuICAgICAgICBSSUdIVDogUklHSFRcbiAgICB9LFxuICAgIGlzQWxpZ25pbmc6IGZhbHNlLFxuICAgIF9ub2Rlc09yZGVyRGlydHk6IGZhbHNlLFxuICAgIF9hY3RpdmVXaWRnZXRzSXRlcmF0b3I6IG5ldyBjYy5qcy5hcnJheS5NdXRhYmxlRm9yd2FyZEl0ZXJhdG9yKGFjdGl2ZVdpZGdldHMpLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKGRpcmVjdG9yKSB7XG4gICAgICAgIGRpcmVjdG9yLm9uKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgcmVmcmVzaFNjZW5lKTtcblxuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIGNjLmVuZ2luZSkge1xuICAgICAgICAgICAgY2MuZW5naW5lLm9uKCdkZXNpZ24tcmVzb2x1dGlvbi1jaGFuZ2VkJywgdGhpcy5vblJlc2l6ZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGhpc09uUmVzaXplZCA9IHRoaXMub25SZXNpemVkLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpc09uUmVzaXplZCk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzT25SZXNpemVkKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYWRkOiBmdW5jdGlvbiAod2lkZ2V0KSB7XG4gICAgICAgIHdpZGdldC5ub2RlLl93aWRnZXQgPSB3aWRnZXQ7XG4gICAgICAgIHRoaXMuX25vZGVzT3JkZXJEaXJ0eSA9IHRydWU7XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgIWNjLmVuZ2luZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9uKEV2ZW50LlBPU0lUSU9OX0NIQU5HRUQsIGFkanVzdFdpZGdldFRvQWxsb3dNb3ZpbmdJbkVkaXRvciwgd2lkZ2V0KTtcbiAgICAgICAgICAgIHdpZGdldC5ub2RlLm9uKEV2ZW50LlNJWkVfQ0hBTkdFRCwgYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IsIHdpZGdldCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHdpZGdldCkge1xuICAgICAgICB3aWRnZXQubm9kZS5fd2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYWN0aXZlV2lkZ2V0c0l0ZXJhdG9yLnJlbW92ZSh3aWRnZXQpO1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICB3aWRnZXQubm9kZS5vZmYoRXZlbnQuUE9TSVRJT05fQ0hBTkdFRCwgYWRqdXN0V2lkZ2V0VG9BbGxvd01vdmluZ0luRWRpdG9yLCB3aWRnZXQpO1xuICAgICAgICAgICAgd2lkZ2V0Lm5vZGUub2ZmKEV2ZW50LlNJWkVfQ0hBTkdFRCwgYWRqdXN0V2lkZ2V0VG9BbGxvd1Jlc2l6aW5nSW5FZGl0b3IsIHdpZGdldCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uUmVzaXplZCAoKSB7XG4gICAgICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XG4gICAgICAgIGlmIChzY2VuZSkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoV2lkZ2V0T25SZXNpemVkKHNjZW5lKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVmcmVzaFdpZGdldE9uUmVzaXplZCAobm9kZSkge1xuICAgICAgICB2YXIgd2lkZ2V0ID0gY2MuTm9kZS5pc05vZGUobm9kZSkgJiYgbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgaWYgKHdpZGdldCAmJiB3aWRnZXQuZW5hYmxlZCAmJiB3aWRnZXQuYWxpZ25Nb2RlID09PSBBbGlnbk1vZGUuT05fV0lORE9XX1JFU0laRSkge1xuICAgICAgICAgICAgdGhpcy5hZGQod2lkZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaFdpZGdldE9uUmVzaXplZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUFsaWdubWVudDogdXBkYXRlQWxpZ25tZW50LFxuICAgIEFsaWduTW9kZTogQWxpZ25Nb2RlLFxufTtcblxuaWYgKENDX0VESVRPUikge1xuICAgIG1vZHVsZS5leHBvcnRzLl9jb21wdXRlSW52ZXJzZVRyYW5zRm9yVGFyZ2V0ID0gY29tcHV0ZUludmVyc2VUcmFuc0ZvclRhcmdldDtcbiAgICBtb2R1bGUuZXhwb3J0cy5fZ2V0UmVhZG9ubHlOb2RlU2l6ZSA9IGdldFJlYWRvbmx5Tm9kZVNpemU7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==