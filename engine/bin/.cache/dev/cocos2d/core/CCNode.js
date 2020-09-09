
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCNode.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
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
'use strict';

var _valueTypes = require("./value-types");

var BaseNode = require('./utils/base-node');

var PrefabHelper = require('./utils/prefab-helper');

var nodeMemPool = require('./utils/trans-pool').NodeMemPool;

var AffineTrans = require('./utils/affine-transform');

var eventManager = require('./event-manager');

var macro = require('./platform/CCMacro');

var js = require('./platform/js');

var Event = require('./event/event');

var EventTarget = require('./event/event-target');

var RenderFlow = require('./renderer/render-flow');

var Flags = cc.Object.Flags;
var Destroying = Flags.Destroying;
var ERR_INVALID_NUMBER = CC_EDITOR && 'The %s is invalid';
var ONE_DEGREE = Math.PI / 180;
var ActionManagerExist = !!cc.ActionManager;

var emptyFunc = function emptyFunc() {}; // getWorldPosition temp var


var _gwpVec3 = new _valueTypes.Vec3();

var _gwpQuat = new _valueTypes.Quat(); // _invTransformPoint temp var


var _tpVec3a = new _valueTypes.Vec3();

var _tpVec3b = new _valueTypes.Vec3();

var _tpQuata = new _valueTypes.Quat();

var _tpQuatb = new _valueTypes.Quat(); // setWorldPosition temp var


var _swpVec3 = new _valueTypes.Vec3(); // getWorldScale temp var


var _gwsVec3 = new _valueTypes.Vec3(); // setWorldScale temp var


var _swsVec3 = new _valueTypes.Vec3(); // getWorldRT temp var


var _gwrtVec3a = new _valueTypes.Vec3();

var _gwrtVec3b = new _valueTypes.Vec3();

var _gwrtQuata = new _valueTypes.Quat();

var _gwrtQuatb = new _valueTypes.Quat(); // lookAt temp var


var _laVec3 = new _valueTypes.Vec3();

var _laQuat = new _valueTypes.Quat(); //up、right、forward temp var


var _urfVec3 = new _valueTypes.Vec3();

var _urfQuat = new _valueTypes.Quat(); // _hitTest temp var


var _htVec3a = new _valueTypes.Vec3();

var _htVec3b = new _valueTypes.Vec3(); // getWorldRotation temp var


var _gwrQuat = new _valueTypes.Quat(); // setWorldRotation temp var


var _swrQuat = new _valueTypes.Quat();

var _quata = new _valueTypes.Quat();

var _mat4_temp = cc.mat4();

var _vec3_temp = new _valueTypes.Vec3();

var _cachedArray = new Array(16);

_cachedArray.length = 0;
var POSITION_ON = 1 << 0;
var SCALE_ON = 1 << 1;
var ROTATION_ON = 1 << 2;
var SIZE_ON = 1 << 3;
var ANCHOR_ON = 1 << 4;
var COLOR_ON = 1 << 5;
var BuiltinGroupIndex = cc.Enum({
  DEBUG: 31
});
/**
 * !#en Node's local dirty properties flag
 * !#zh Node 的本地属性 dirty 状态位
 * @enum Node._LocalDirtyFlag
 * @static
 * @private
 * @namespace Node
 */

var LocalDirtyFlag = cc.Enum({
  /**
   * !#en Flag for position dirty
   * !#zh 位置 dirty 的标记位
   * @property {Number} POSITION
   * @static
   */
  POSITION: 1 << 0,

  /**
   * !#en Flag for scale dirty
   * !#zh 缩放 dirty 的标记位
   * @property {Number} SCALE
   * @static
   */
  SCALE: 1 << 1,

  /**
   * !#en Flag for rotation dirty
   * !#zh 旋转 dirty 的标记位
   * @property {Number} ROTATION
   * @static
   */
  ROTATION: 1 << 2,

  /**
   * !#en Flag for skew dirty
   * !#zh skew dirty 的标记位
   * @property {Number} SKEW
   * @static
   */
  SKEW: 1 << 3,

  /**
   * !#en Flag for rotation, scale or position dirty
   * !#zh 旋转，缩放，或位置 dirty 的标记位
   * @property {Number} TRS
   * @static
   */
  TRS: 1 << 0 | 1 << 1 | 1 << 2,

  /**
   * !#en Flag for rotation or scale dirty
   * !#zh 旋转或缩放 dirty 的标记位
   * @property {Number} RS
   * @static
   */
  RS: 1 << 1 | 1 << 2,

  /**
   * !#en Flag for rotation, scale, position, skew dirty
   * !#zh 旋转，缩放，位置，或斜角 dirty 的标记位
   * @property {Number} TRS
   * @static
   */
  TRSS: 1 << 0 | 1 << 1 | 1 << 2 | 1 << 3,

  /**
   * !#en Flag for physics position dirty
   * !#zh 物理位置 dirty 的标记位
   * @property {Number} PHYSICS_POSITION
   * @static
   */
  PHYSICS_POSITION: 1 << 4,

  /**
   * !#en Flag for physics scale dirty
   * !#zh 物理缩放 dirty 的标记位
   * @property {Number} PHYSICS_SCALE
   * @static
   */
  PHYSICS_SCALE: 1 << 5,

  /**
   * !#en Flag for physics rotation dirty
   * !#zh 物理旋转 dirty 的标记位
   * @property {Number} PHYSICS_ROTATION
   * @static
   */
  PHYSICS_ROTATION: 1 << 6,

  /**
   * !#en Flag for physics trs dirty
   * !#zh 物理位置旋转缩放 dirty 的标记位
   * @property {Number} PHYSICS_TRS
   * @static
   */
  PHYSICS_TRS: 1 << 4 | 1 << 5 | 1 << 6,

  /**
   * !#en Flag for physics rs dirty
   * !#zh 物理旋转缩放 dirty 的标记位
   * @property {Number} PHYSICS_RS
   * @static
   */
  PHYSICS_RS: 1 << 5 | 1 << 6,

  /**
   * !#en Flag for node and physics position dirty
   * !#zh 所有位置 dirty 的标记位
   * @property {Number} ALL_POSITION
   * @static
   */
  ALL_POSITION: 1 << 0 | 1 << 4,

  /**
   * !#en Flag for node and physics scale dirty
   * !#zh 所有缩放 dirty 的标记位
   * @property {Number} ALL_SCALE
   * @static
   */
  ALL_SCALE: 1 << 1 | 1 << 5,

  /**
   * !#en Flag for node and physics rotation dirty
   * !#zh 所有旋转 dirty 的标记位
   * @property {Number} ALL_ROTATION
   * @static
   */
  ALL_ROTATION: 1 << 2 | 1 << 6,

  /**
   * !#en Flag for node and physics trs dirty
   * !#zh 所有trs dirty 的标记位
   * @property {Number} ALL_TRS
   * @static
   */
  ALL_TRS: 1 << 0 | 1 << 1 | 1 << 2 | 1 << 4 | 1 << 5 | 1 << 6,

  /**
   * !#en Flag for all dirty properties
   * !#zh 覆盖所有 dirty 状态的标记位
   * @property {Number} ALL
   * @static
   */
  ALL: 0xffff
});
/**
 * !#en The event type supported by Node
 * !#zh Node 支持的事件类型
 * @class Node.EventType
 * @static
 * @namespace Node
 */
// Why EventType defined as class, because the first parameter of Node.on method needs set as 'string' type.

var EventType = cc.Enum({
  /**
   * !#en The event type for touch start event, you can use its value directly: 'touchstart'
   * !#zh 当手指触摸到屏幕时。
   * @property {String} TOUCH_START
   * @static
   */
  TOUCH_START: 'touchstart',

  /**
   * !#en The event type for touch move event, you can use its value directly: 'touchmove'
   * !#zh 当手指在屏幕上移动时。
   * @property {String} TOUCH_MOVE
   * @static
   */
  TOUCH_MOVE: 'touchmove',

  /**
   * !#en The event type for touch end event, you can use its value directly: 'touchend'
   * !#zh 当手指在目标节点区域内离开屏幕时。
   * @property {String} TOUCH_END
   * @static
   */
  TOUCH_END: 'touchend',

  /**
   * !#en The event type for touch end event, you can use its value directly: 'touchcancel'
   * !#zh 当手指在目标节点区域外离开屏幕时。
   * @property {String} TOUCH_CANCEL
   * @static
   */
  TOUCH_CANCEL: 'touchcancel',

  /**
   * !#en The event type for mouse down events, you can use its value directly: 'mousedown'
   * !#zh 当鼠标按下时触发一次。
   * @property {String} MOUSE_DOWN
   * @static
   */
  MOUSE_DOWN: 'mousedown',

  /**
   * !#en The event type for mouse move events, you can use its value directly: 'mousemove'
   * !#zh 当鼠标在目标节点在目标节点区域中移动时，不论是否按下。
   * @property {String} MOUSE_MOVE
   * @static
   */
  MOUSE_MOVE: 'mousemove',

  /**
   * !#en The event type for mouse enter target events, you can use its value directly: 'mouseenter'
   * !#zh 当鼠标移入目标节点区域时，不论是否按下。
   * @property {String} MOUSE_ENTER
   * @static
   */
  MOUSE_ENTER: 'mouseenter',

  /**
   * !#en The event type for mouse leave target events, you can use its value directly: 'mouseleave'
   * !#zh 当鼠标移出目标节点区域时，不论是否按下。
   * @property {String} MOUSE_LEAVE
   * @static
   */
  MOUSE_LEAVE: 'mouseleave',

  /**
   * !#en The event type for mouse up events, you can use its value directly: 'mouseup'
   * !#zh 当鼠标从按下状态松开时触发一次。
   * @property {String} MOUSE_UP
   * @static
   */
  MOUSE_UP: 'mouseup',

  /**
   * !#en The event type for mouse wheel events, you can use its value directly: 'mousewheel'
   * !#zh 当鼠标滚轮滚动时。
   * @property {String} MOUSE_WHEEL
   * @static
   */
  MOUSE_WHEEL: 'mousewheel',

  /**
   * !#en The event type for position change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点位置改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} POSITION_CHANGED
   * @static
   */
  POSITION_CHANGED: 'position-changed',

  /**
   * !#en The event type for rotation change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点旋转改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} ROTATION_CHANGED
   * @static
   */
  ROTATION_CHANGED: 'rotation-changed',

  /**
   * !#en The event type for scale change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点缩放改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} SCALE_CHANGED
   * @static
   */
  SCALE_CHANGED: 'scale-changed',

  /**
   * !#en The event type for size change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点尺寸改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} SIZE_CHANGED
   * @static
   */
  SIZE_CHANGED: 'size-changed',

  /**
   * !#en The event type for anchor point change events.
   * Performance note, this event will be triggered every time corresponding properties being changed,
   * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
   * !#zh 当节点锚点改变时触发的事件。
   * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
   * @property {String} ANCHOR_CHANGED
   * @static
   */
  ANCHOR_CHANGED: 'anchor-changed',

  /**
  * !#en The event type for color change events.
  * Performance note, this event will be triggered every time corresponding properties being changed,
  * if the event callback have heavy logic it may have great performance impact, try to avoid such scenario.
  * !#zh 当节点颜色改变时触发的事件。
  * 性能警告：这个事件会在每次对应的属性被修改时触发，如果事件回调损耗较高，有可能对性能有很大的负面影响，请尽量避免这种情况。
  * @property {String} COLOR_CHANGED
  * @static
  */
  COLOR_CHANGED: 'color-changed',

  /**
   * !#en The event type for new child added events.
   * !#zh 当新的子节点被添加时触发的事件。
   * @property {String} CHILD_ADDED
   * @static
   */
  CHILD_ADDED: 'child-added',

  /**
   * !#en The event type for child removed events.
   * !#zh 当子节点被移除时触发的事件。
   * @property {String} CHILD_REMOVED
   * @static
   */
  CHILD_REMOVED: 'child-removed',

  /**
   * !#en The event type for children reorder events.
   * !#zh 当子节点顺序改变时触发的事件。
   * @property {String} CHILD_REORDER
   * @static
   */
  CHILD_REORDER: 'child-reorder',

  /**
   * !#en The event type for node group changed events.
   * !#zh 当节点归属群组发生变化时触发的事件。
   * @property {String} GROUP_CHANGED
   * @static
   */
  GROUP_CHANGED: 'group-changed',

  /**
   * !#en The event type for node's sibling order changed.
   * !#zh 当节点在兄弟节点中的顺序发生变化时触发的事件。
   * @property {String} SIBLING_ORDER_CHANGED
   * @static
   */
  SIBLING_ORDER_CHANGED: 'sibling-order-changed'
});
var _touchEvents = [EventType.TOUCH_START, EventType.TOUCH_MOVE, EventType.TOUCH_END, EventType.TOUCH_CANCEL];
var _mouseEvents = [EventType.MOUSE_DOWN, EventType.MOUSE_ENTER, EventType.MOUSE_MOVE, EventType.MOUSE_LEAVE, EventType.MOUSE_UP, EventType.MOUSE_WHEEL];
var _skewNeedWarn = true;

var _skewWarn = function _skewWarn(value, node) {
  if (value !== 0) {
    var nodePath = "";

    if (CC_EDITOR) {
      var NodeUtils = Editor.require('scene://utils/node');

      nodePath = "Node: " + NodeUtils.getNodePath(node) + ".";
    }

    _skewNeedWarn && cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", nodePath);
    !CC_EDITOR && (_skewNeedWarn = false);
  }
};

var _currentHovered = null;

var _touchStartHandler = function _touchStartHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.TOUCH_START;
    event.touch = touch;
    event.bubbles = true;
    node.dispatchEvent(event);
    return true;
  }

  return false;
};

var _touchMoveHandler = function _touchMoveHandler(touch, event) {
  var node = this.owner;
  event.type = EventType.TOUCH_MOVE;
  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _touchEndHandler = function _touchEndHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.TOUCH_END;
  } else {
    event.type = EventType.TOUCH_CANCEL;
  }

  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _touchCancelHandler = function _touchCancelHandler(touch, event) {
  var pos = touch.getLocation();
  var node = this.owner;
  event.type = EventType.TOUCH_CANCEL;
  event.touch = touch;
  event.bubbles = true;
  node.dispatchEvent(event);
};

var _mouseDownHandler = function _mouseDownHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_DOWN;
    event.bubbles = true;
    node.dispatchEvent(event);
  }
};

var _mouseMoveHandler = function _mouseMoveHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  var hit = node._hitTest(pos, this);

  if (hit) {
    if (!this._previousIn) {
      // Fix issue when hover node switched, previous hovered node won't get MOUSE_LEAVE notification
      if (_currentHovered && _currentHovered._mouseListener) {
        event.type = EventType.MOUSE_LEAVE;

        _currentHovered.dispatchEvent(event);

        _currentHovered._mouseListener._previousIn = false;
      }

      _currentHovered = this.owner;
      event.type = EventType.MOUSE_ENTER;
      node.dispatchEvent(event);
      this._previousIn = true;
    }

    event.type = EventType.MOUSE_MOVE;
    event.bubbles = true;
    node.dispatchEvent(event);
  } else if (this._previousIn) {
    event.type = EventType.MOUSE_LEAVE;
    node.dispatchEvent(event);
    this._previousIn = false;
    _currentHovered = null;
  } else {
    // continue dispatching
    return;
  } // Event processed, cleanup


  event.stopPropagation();
};

var _mouseUpHandler = function _mouseUpHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_UP;
    event.bubbles = true;
    node.dispatchEvent(event);
    event.stopPropagation();
  }
};

var _mouseWheelHandler = function _mouseWheelHandler(event) {
  var pos = event.getLocation();
  var node = this.owner;

  if (node._hitTest(pos, this)) {
    event.type = EventType.MOUSE_WHEEL;
    event.bubbles = true;
    node.dispatchEvent(event);
    event.stopPropagation();
  }
};

function _searchComponentsInParent(node, comp) {
  if (comp) {
    var index = 0;
    var list = null;

    for (var curr = node; curr && cc.Node.isNode(curr); curr = curr._parent, ++index) {
      if (curr.getComponent(comp)) {
        var next = {
          index: index,
          node: curr
        };

        if (list) {
          list.push(next);
        } else {
          list = [next];
        }
      }
    }

    return list;
  }

  return null;
}

function _checkListeners(node, events) {
  if (!(node._objFlags & Destroying)) {
    if (node._bubblingListeners) {
      for (var i = 0, l = events.length; i < l; ++i) {
        if (node._bubblingListeners.hasEventListener(events[i])) {
          return true;
        }
      }
    }

    if (node._capturingListeners) {
      for (var _i = 0, _l = events.length; _i < _l; ++_i) {
        if (node._capturingListeners.hasEventListener(events[_i])) {
          return true;
        }
      }
    }

    return false;
  }

  return true;
}

function _doDispatchEvent(owner, event) {
  var target, i;
  event.target = owner; // Event.CAPTURING_PHASE

  _cachedArray.length = 0;

  owner._getCapturingTargets(event.type, _cachedArray); // capturing


  event.eventPhase = 1;

  for (i = _cachedArray.length - 1; i >= 0; --i) {
    target = _cachedArray[i];

    if (target._capturingListeners) {
      event.currentTarget = target; // fire event

      target._capturingListeners.emit(event.type, event, _cachedArray); // check if propagation stopped


      if (event._propagationStopped) {
        _cachedArray.length = 0;
        return;
      }
    }
  }

  _cachedArray.length = 0; // Event.AT_TARGET
  // checks if destroyed in capturing callbacks

  event.eventPhase = 2;
  event.currentTarget = owner;

  if (owner._capturingListeners) {
    owner._capturingListeners.emit(event.type, event);
  }

  if (!event._propagationImmediateStopped && owner._bubblingListeners) {
    owner._bubblingListeners.emit(event.type, event);
  }

  if (!event._propagationStopped && event.bubbles) {
    // Event.BUBBLING_PHASE
    owner._getBubblingTargets(event.type, _cachedArray); // propagate


    event.eventPhase = 3;

    for (i = 0; i < _cachedArray.length; ++i) {
      target = _cachedArray[i];

      if (target._bubblingListeners) {
        event.currentTarget = target; // fire event

        target._bubblingListeners.emit(event.type, event); // check if propagation stopped


        if (event._propagationStopped) {
          _cachedArray.length = 0;
          return;
        }
      }
    }
  }

  _cachedArray.length = 0;
} // traversal the node tree, child cullingMask must keep the same with the parent.


function _getActualGroupIndex(node) {
  var groupIndex = node.groupIndex;

  if (groupIndex === 0 && node.parent) {
    groupIndex = _getActualGroupIndex(node.parent);
  }

  return groupIndex;
}

function _updateCullingMask(node) {
  var index = _getActualGroupIndex(node);

  node._cullingMask = 1 << index;

  if (CC_JSB && CC_NATIVERENDERER) {
    node._proxy && node._proxy.updateCullingMask();
  }

  ;

  for (var i = 0; i < node._children.length; i++) {
    _updateCullingMask(node._children[i]);
  }
} // 2D/3D matrix functions


function updateLocalMatrix3D() {
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    // Update transform
    var t = this._matrix;
    var tm = t.m;

    _valueTypes.Trs.toMat4(t, this._trs); // skew


    if (this._skewX || this._skewY) {
      var a = tm[0],
          b = tm[1],
          c = tm[4],
          d = tm[5];
      var skx = Math.tan(this._skewX * ONE_DEGREE);
      var sky = Math.tan(this._skewY * ONE_DEGREE);
      if (skx === Infinity) skx = 99999999;
      if (sky === Infinity) sky = 99999999;
      tm[0] = a + c * sky;
      tm[1] = b + d * sky;
      tm[4] = c + a * skx;
      tm[5] = d + b * skx;
    }

    this._localMatDirty &= ~LocalDirtyFlag.TRSS; // Register dirty status of world matrix so that it can be recalculated

    this._worldMatDirty = true;
  }
}

function updateLocalMatrix2D() {
  var dirtyFlag = this._localMatDirty;
  if (!(dirtyFlag & LocalDirtyFlag.TRSS)) return; // Update transform

  var t = this._matrix;
  var tm = t.m;
  var trs = this._trs;

  if (dirtyFlag & (LocalDirtyFlag.RS | LocalDirtyFlag.SKEW)) {
    var rotation = -this._eulerAngles.z;
    var hasSkew = this._skewX || this._skewY;
    var sx = trs[7],
        sy = trs[8];

    if (rotation || hasSkew) {
      var a = 1,
          b = 0,
          c = 0,
          d = 1; // rotation

      if (rotation) {
        var rotationRadians = rotation * ONE_DEGREE;
        c = Math.sin(rotationRadians);
        d = Math.cos(rotationRadians);
        a = d;
        b = -c;
      } // scale


      tm[0] = a *= sx;
      tm[1] = b *= sx;
      tm[4] = c *= sy;
      tm[5] = d *= sy; // skew

      if (hasSkew) {
        var _a = tm[0],
            _b = tm[1],
            _c = tm[4],
            _d = tm[5];
        var skx = Math.tan(this._skewX * ONE_DEGREE);
        var sky = Math.tan(this._skewY * ONE_DEGREE);
        if (skx === Infinity) skx = 99999999;
        if (sky === Infinity) sky = 99999999;
        tm[0] = _a + _c * sky;
        tm[1] = _b + _d * sky;
        tm[4] = _c + _a * skx;
        tm[5] = _d + _b * skx;
      }
    } else {
      tm[0] = sx;
      tm[1] = 0;
      tm[4] = 0;
      tm[5] = sy;
    }
  } // position


  tm[12] = trs[0];
  tm[13] = trs[1];
  this._localMatDirty &= ~LocalDirtyFlag.TRSS; // Register dirty status of world matrix so that it can be recalculated

  this._worldMatDirty = true;
}

function calculWorldMatrix3D() {
  // Avoid as much function call as possible
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    this._updateLocalMatrix();
  }

  if (this._parent) {
    var parentMat = this._parent._worldMatrix;

    _valueTypes.Mat4.mul(this._worldMatrix, parentMat, this._matrix);
  } else {
    _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
  }

  this._worldMatDirty = false;
}

function calculWorldMatrix2D() {
  // Avoid as much function call as possible
  if (this._localMatDirty & LocalDirtyFlag.TRSS) {
    this._updateLocalMatrix();
  } // Assume parent world matrix is correct


  var parent = this._parent;

  if (parent) {
    this._mulMat(this._worldMatrix, parent._worldMatrix, this._matrix);
  } else {
    _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
  }

  this._worldMatDirty = false;
}

function mulMat2D(out, a, b) {
  var am = a.m,
      bm = b.m,
      outm = out.m;
  var aa = am[0],
      ab = am[1],
      ac = am[4],
      ad = am[5],
      atx = am[12],
      aty = am[13];
  var ba = bm[0],
      bb = bm[1],
      bc = bm[4],
      bd = bm[5],
      btx = bm[12],
      bty = bm[13];

  if (ab !== 0 || ac !== 0) {
    outm[0] = ba * aa + bb * ac;
    outm[1] = ba * ab + bb * ad;
    outm[4] = bc * aa + bd * ac;
    outm[5] = bc * ab + bd * ad;
    outm[12] = aa * btx + ac * bty + atx;
    outm[13] = ab * btx + ad * bty + aty;
  } else {
    outm[0] = ba * aa;
    outm[1] = bb * ad;
    outm[4] = bc * aa;
    outm[5] = bd * ad;
    outm[12] = aa * btx + atx;
    outm[13] = ad * bty + aty;
  }
}

var mulMat3D = _valueTypes.Mat4.mul;
/**
 * !#en
 * Class of all entities in Cocos Creator scenes.<br/>
 * For events supported by Node, please refer to {{#crossLink "Node.EventType"}}{{/crossLink}}
 * !#zh
 * Cocos Creator 场景中的所有节点类。<br/>
 * 支持的节点事件，请参阅 {{#crossLink "Node.EventType"}}{{/crossLink}}。
 * @class Node
 * @extends _BaseNode
 */

var NodeDefines = {
  name: 'cc.Node',
  "extends": BaseNode,
  properties: {
    // SERIALIZABLE
    _opacity: 255,
    _color: cc.Color.WHITE,
    _contentSize: cc.Size,
    _anchorPoint: cc.v2(0.5, 0.5),
    _position: undefined,
    _scale: undefined,
    _trs: null,
    _eulerAngles: cc.Vec3,
    _skewX: 0.0,
    _skewY: 0.0,
    _zIndex: {
      "default": undefined,
      type: cc.Integer
    },
    _localZOrder: {
      "default": 0,
      serializable: false
    },
    _is3DNode: false,
    // internal properties

    /**
     * !#en
     * Group index of node.<br/>
     * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
     * !#zh
     * 节点的分组索引。<br/>
     * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
     * @property groupIndex
     * @type {Integer}
     * @default 0
     */
    _groupIndex: {
      "default": 0,
      formerlySerializedAs: 'groupIndex'
    },
    groupIndex: {
      get: function get() {
        return this._groupIndex;
      },
      set: function set(value) {
        this._groupIndex = value;

        _updateCullingMask(this);

        this.emit(EventType.GROUP_CHANGED, this);
      }
    },

    /**
     * !#en
     * Group of node.<br/>
     * Which Group this node belongs to will resolve that this node's collision components can collide with which other collision componentns.<br/>
     * !#zh
     * 节点的分组。<br/>
     * 节点的分组将关系到节点的碰撞组件可以与哪些碰撞组件相碰撞。<br/>
     * @property group
     * @type {String}
     */
    group: {
      get: function get() {
        return cc.game.groupList[this.groupIndex] || '';
      },
      set: function set(value) {
        // update the groupIndex
        this.groupIndex = cc.game.groupList.indexOf(value);
      }
    },
    //properties moved from base node begin

    /**
     * !#en The position (x, y) of the node in its parent's coordinates.
     * !#zh 节点在父节点坐标系中的位置（x, y）。
     * @property {Vec3} position
     * @example
     * cc.log("Node Position: " + node.position);
     */

    /**
     * !#en x axis position of node.
     * !#zh 节点 X 轴坐标。
     * @property x
     * @type {Number}
     * @example
     * node.x = 100;
     * cc.log("Node Position X: " + node.x);
     */
    x: {
      get: function get() {
        return this._trs[0];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[0]) {
          if (!CC_EDITOR || isFinite(value)) {
            var oldValue;

            if (CC_EDITOR) {
              oldValue = trs[0];
            }

            trs[0] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

            if (this._eventMask & POSITION_ON) {
              // send event
              if (CC_EDITOR) {
                this.emit(EventType.POSITION_CHANGED, new cc.Vec3(oldValue, trs[1], trs[2]));
              } else {
                this.emit(EventType.POSITION_CHANGED);
              }
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new x');
          }
        }
      }
    },

    /**
     * !#en y axis position of node.
     * !#zh 节点 Y 轴坐标。
     * @property y
     * @type {Number}
     * @example
     * node.y = 100;
     * cc.log("Node Position Y: " + node.y);
     */
    y: {
      get: function get() {
        return this._trs[1];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[1]) {
          if (!CC_EDITOR || isFinite(value)) {
            var oldValue;

            if (CC_EDITOR) {
              oldValue = trs[1];
            }

            trs[1] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

            if (this._eventMask & POSITION_ON) {
              // send event
              if (CC_EDITOR) {
                this.emit(EventType.POSITION_CHANGED, new cc.Vec3(trs[0], oldValue, trs[2]));
              } else {
                this.emit(EventType.POSITION_CHANGED);
              }
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new y');
          }
        }
      }
    },

    /**
     * !#en z axis position of node.
     * !#zh 节点 Z 轴坐标。
     * @property z
     * @type {Number}
     */
    z: {
      get: function get() {
        return this._trs[2];
      },
      set: function set(value) {
        var trs = this._trs;

        if (value !== trs[2]) {
          if (!CC_EDITOR || isFinite(value)) {
            trs[2] = value;
            this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);
            !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM); // fast check event

            if (this._eventMask & POSITION_ON) {
              this.emit(EventType.POSITION_CHANGED);
            }
          } else {
            cc.error(ERR_INVALID_NUMBER, 'new z');
          }
        }
      }
    },

    /**
     * !#en Rotation of node.
     * !#zh 该节点旋转角度。
     * @property rotation
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.rotation = 90;
     * cc.log("Node Rotation: " + node.rotation);
     */
    rotation: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotation` is deprecated since v2.1.0, please use `-angle` instead. (`this.node.rotation` -> `-this.node.angle`)");
        }

        return -this.angle;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotation` is deprecated since v2.1.0, please set `-angle` instead. (`this.node.rotation = x` -> `this.node.angle = -x`)");
        }

        this.angle = -value;
      }
    },

    /**
     * !#en
     * Angle of node, the positive value is anti-clockwise direction.
     * !#zh
     * 该节点的旋转角度，正值为逆时针方向。
     * @property angle
     * @type {Number}
     */
    angle: {
      get: function get() {
        return this._eulerAngles.z;
      },
      set: function set(value) {
        _valueTypes.Vec3.set(this._eulerAngles, 0, 0, value);

        _valueTypes.Trs.fromAngleZ(this._trs, value);

        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }
      }
    },

    /**
     * !#en The rotation as Euler angles in degrees, used in 3D node.
     * !#zh 该节点的欧拉角度，用于 3D 节点。
     * @property eulerAngles
     * @type {Vec3}
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(45, 45, 45);
     * cc.log("Node eulerAngles (X, Y, Z): " + node.eulerAngles.toString());
     */

    /**
     * !#en Rotation on x axis.
     * !#zh 该节点 X 轴旋转角度。
     * @property rotationX
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(45, 0, 0);
     * cc.log("Node eulerAngles X: " + node.eulerAngles.x);
     */
    rotationX: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationX` is deprecated since v2.1.0, please use `eulerAngles.x` instead. (`this.node.rotationX` -> `this.node.eulerAngles.x`)");
        }

        return this._eulerAngles.x;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationX` is deprecated since v2.1.0, please set `eulerAngles` instead. (`this.node.rotationX = x` -> `this.node.is3DNode = true; this.node.eulerAngles = cc.v3(x, 0, 0)`");
        }

        if (this._eulerAngles.x !== value) {
          this._eulerAngles.x = value; // Update quaternion from rotation

          if (this._eulerAngles.x === this._eulerAngles.y) {
            _valueTypes.Trs.fromAngleZ(this._trs, -value);
          } else {
            _valueTypes.Trs.fromEulerNumber(this._trs, value, this._eulerAngles.y, 0);
          }

          this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

          if (this._eventMask & ROTATION_ON) {
            this.emit(EventType.ROTATION_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Rotation on y axis.
     * !#zh 该节点 Y 轴旋转角度。
     * @property rotationY
     * @type {Number}
     * @deprecated since v2.1
     * @example
     * node.is3DNode = true;
     * node.eulerAngles = cc.v3(0, 45, 0);
     * cc.log("Node eulerAngles Y: " + node.eulerAngles.y);
     */
    rotationY: {
      get: function get() {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationY` is deprecated since v2.1.0, please use `eulerAngles.y` instead. (`this.node.rotationY` -> `this.node.eulerAngles.y`)");
        }

        return this._eulerAngles.y;
      },
      set: function set(value) {
        if (CC_DEBUG) {
          cc.warn("`cc.Node.rotationY` is deprecated since v2.1.0, please set `eulerAngles` instead. (`this.node.rotationY = y` -> `this.node.is3DNode = true; this.node.eulerAngles = cc.v3(0, y, 0)`");
        }

        if (this._eulerAngles.y !== value) {
          this._eulerAngles.y = value; // Update quaternion from rotation

          if (this._eulerAngles.x === this._eulerAngles.y) {
            _valueTypes.Trs.fromAngleZ(this._trs, -value);
          } else {
            _valueTypes.Trs.fromEulerNumber(this._trs, this._eulerAngles.x, value, 0);
          }

          this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

          if (this._eventMask & ROTATION_ON) {
            this.emit(EventType.ROTATION_CHANGED);
          }
        }
      }
    },
    eulerAngles: {
      get: function get() {
        if (CC_EDITOR) {
          return this._eulerAngles;
        } else {
          return _valueTypes.Trs.toEuler(this._eulerAngles, this._trs);
        }
      },
      set: function set(v) {
        if (CC_EDITOR) {
          this._eulerAngles.set(v);
        }

        _valueTypes.Trs.fromEuler(this._trs, v);

        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);
        !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }
      }
    },
    // This property is used for Mesh Skeleton Animation
    // Should be removed when node.rotation upgrade to quaternion value
    quat: {
      get: function get() {
        var trs = this._trs;
        return new _valueTypes.Quat(trs[3], trs[4], trs[5], trs[6]);
      },
      set: function set(v) {
        this.setRotation(v);
      }
    },

    /**
     * !#en The local scale relative to the parent.
     * !#zh 节点相对父节点的缩放。
     * @property scale
     * @type {Number}
     * @example
     * node.scale = 1;
     */
    scale: {
      get: function get() {
        return this._trs[7];
      },
      set: function set(v) {
        this.setScale(v);
      }
    },

    /**
     * !#en Scale on x axis.
     * !#zh 节点 X 轴缩放。
     * @property scaleX
     * @type {Number}
     * @example
     * node.scaleX = 0.5;
     * cc.log("Node Scale X: " + node.scaleX);
     */
    scaleX: {
      get: function get() {
        return this._trs[7];
      },
      set: function set(value) {
        if (this._trs[7] !== value) {
          this._trs[7] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Scale on y axis.
     * !#zh 节点 Y 轴缩放。
     * @property scaleY
     * @type {Number}
     * @example
     * node.scaleY = 0.5;
     * cc.log("Node Scale Y: " + node.scaleY);
     */
    scaleY: {
      get: function get() {
        return this._trs[8];
      },
      set: function set(value) {
        if (this._trs[8] !== value) {
          this._trs[8] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Scale on z axis.
     * !#zh 节点 Z 轴缩放。
     * @property scaleZ
     * @type {Number}
     */
    scaleZ: {
      get: function get() {
        return this._trs[9];
      },
      set: function set(value) {
        if (this._trs[9] !== value) {
          this._trs[9] = value;
          this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
          !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

          if (this._eventMask & SCALE_ON) {
            this.emit(EventType.SCALE_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Skew x
     * !#zh 该节点 X 轴倾斜角度。
     * @property skewX
     * @type {Number}
     * @example
     * node.skewX = 0;
     * cc.log("Node SkewX: " + node.skewX);
     * @deprecated since v2.2.1
     */
    skewX: {
      get: function get() {
        return this._skewX;
      },
      set: function set(value) {
        _skewWarn(value, this);

        this._skewX = value;
        this.setLocalDirty(LocalDirtyFlag.SKEW);

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.updateSkew();
        }
      }
    },

    /**
     * !#en Skew y
     * !#zh 该节点 Y 轴倾斜角度。
     * @property skewY
     * @type {Number}
     * @example
     * node.skewY = 0;
     * cc.log("Node SkewY: " + node.skewY);
     * @deprecated since v2.2.1
     */
    skewY: {
      get: function get() {
        return this._skewY;
      },
      set: function set(value) {
        _skewWarn(value, this);

        this._skewY = value;
        this.setLocalDirty(LocalDirtyFlag.SKEW);

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.updateSkew();
        }
      }
    },

    /**
     * !#en Opacity of node, default value is 255.
     * !#zh 节点透明度，默认值为 255。
     * @property opacity
     * @type {Number}
     * @example
     * node.opacity = 255;
     */
    opacity: {
      get: function get() {
        return this._opacity;
      },
      set: function set(value) {
        value = cc.misc.clampf(value, 0, 255);

        if (this._opacity !== value) {
          this._opacity = value;

          if (CC_JSB && CC_NATIVERENDERER) {
            this._proxy.updateOpacity();
          }

          this._renderFlag |= RenderFlow.FLAG_OPACITY_COLOR;
        }
      },
      range: [0, 255]
    },

    /**
     * !#en Color of node, default value is white: (255, 255, 255).
     * !#zh 节点颜色。默认为白色，数值为：（255，255，255）。
     * @property color
     * @type {Color}
     * @example
     * node.color = new cc.Color(255, 255, 255);
     */
    color: {
      get: function get() {
        return this._color.clone();
      },
      set: function set(value) {
        if (!this._color.equals(value)) {
          this._color.set(value);

          if (CC_DEV && value.a !== 255) {
            cc.warnID(1626);
          }

          this._renderFlag |= RenderFlow.FLAG_COLOR;

          if (this._eventMask & COLOR_ON) {
            this.emit(EventType.COLOR_CHANGED, value);
          }
        }
      }
    },

    /**
     * !#en Anchor point's position on x axis.
     * !#zh 节点 X 轴锚点位置。
     * @property anchorX
     * @type {Number}
     * @example
     * node.anchorX = 0;
     */
    anchorX: {
      get: function get() {
        return this._anchorPoint.x;
      },
      set: function set(value) {
        var anchorPoint = this._anchorPoint;

        if (anchorPoint.x !== value) {
          anchorPoint.x = value;

          if (this._eventMask & ANCHOR_ON) {
            this.emit(EventType.ANCHOR_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Anchor point's position on y axis.
     * !#zh 节点 Y 轴锚点位置。
     * @property anchorY
     * @type {Number}
     * @example
     * node.anchorY = 0;
     */
    anchorY: {
      get: function get() {
        return this._anchorPoint.y;
      },
      set: function set(value) {
        var anchorPoint = this._anchorPoint;

        if (anchorPoint.y !== value) {
          anchorPoint.y = value;

          if (this._eventMask & ANCHOR_ON) {
            this.emit(EventType.ANCHOR_CHANGED);
          }
        }
      }
    },

    /**
     * !#en Width of node.
     * !#zh 节点宽度。
     * @property width
     * @type {Number}
     * @example
     * node.width = 100;
     */
    width: {
      get: function get() {
        return this._contentSize.width;
      },
      set: function set(value) {
        if (value !== this._contentSize.width) {
          if (CC_EDITOR) {
            var clone = cc.size(this._contentSize.width, this._contentSize.height);
          }

          this._contentSize.width = value;

          if (this._eventMask & SIZE_ON) {
            if (CC_EDITOR) {
              this.emit(EventType.SIZE_CHANGED, clone);
            } else {
              this.emit(EventType.SIZE_CHANGED);
            }
          }
        }
      }
    },

    /**
     * !#en Height of node.
     * !#zh 节点高度。
     * @property height
     * @type {Number}
     * @example
     * node.height = 100;
     */
    height: {
      get: function get() {
        return this._contentSize.height;
      },
      set: function set(value) {
        if (value !== this._contentSize.height) {
          if (CC_EDITOR) {
            var clone = cc.size(this._contentSize.width, this._contentSize.height);
          }

          this._contentSize.height = value;

          if (this._eventMask & SIZE_ON) {
            if (CC_EDITOR) {
              this.emit(EventType.SIZE_CHANGED, clone);
            } else {
              this.emit(EventType.SIZE_CHANGED);
            }
          }
        }
      }
    },

    /**
     * !#en zIndex is the 'key' used to sort the node relative to its siblings.<br/>
     * The value of zIndex should be in the range between cc.macro.MIN_ZINDEX and cc.macro.MAX_ZINDEX.<br/>
     * The Node's parent will sort all its children based on the zIndex value and the arrival order.<br/>
     * Nodes with greater zIndex will be sorted after nodes with smaller zIndex.<br/>
     * If two nodes have the same zIndex, then the node that was added first to the children's array will be in front of the other node in the array.<br/>
     * Node's order in children list will affect its rendering order. Parent is always rendering before all children.
     * !#zh zIndex 是用来对节点进行排序的关键属性，它决定一个节点在兄弟节点之间的位置。<br/>
     * zIndex 的取值应该介于 cc.macro.MIN_ZINDEX 和 cc.macro.MAX_ZINDEX 之间
     * 父节点主要根据节点的 zIndex 和添加次序来排序，拥有更高 zIndex 的节点将被排在后面，如果两个节点的 zIndex 一致，先添加的节点会稳定排在另一个节点之前。<br/>
     * 节点在 children 中的顺序决定了其渲染顺序。父节点永远在所有子节点之前被渲染
     * @property zIndex
     * @type {Number}
     * @example
     * node.zIndex = 1;
     * cc.log("Node zIndex: " + node.zIndex);
     */
    zIndex: {
      get: function get() {
        return this._localZOrder >> 16;
      },
      set: function set(value) {
        if (value > macro.MAX_ZINDEX) {
          cc.warnID(1636);
          value = macro.MAX_ZINDEX;
        } else if (value < macro.MIN_ZINDEX) {
          cc.warnID(1637);
          value = macro.MIN_ZINDEX;
        }

        if (this.zIndex !== value) {
          this._localZOrder = this._localZOrder & 0x0000ffff | value << 16;
          this.emit(EventType.SIBLING_ORDER_CHANGED);

          this._onSiblingIndexChanged();
        }
      }
    },

    /**
     * !#en
     * Switch 2D/3D node. The 2D nodes will run faster.
     * !#zh
     * 切换 2D/3D 节点，2D 节点会有更高的运行效率
     * @property {Boolean} is3DNode
     * @default false
    */
    is3DNode: {
      get: function get() {
        return this._is3DNode;
      },
      set: function set(v) {
        this._is3DNode = v;

        this._update3DFunction();
      }
    },

    /**
     * !#en Returns a normalized vector representing the up direction (Y axis) of the node in world space.
     * !#zh 获取节点正上方（y 轴）面对的方向，返回值为世界坐标系下的归一化向量
     * 
     * @property up
     * @type {Vec3}
     */
    up: {
      get: function get() {
        var _up = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.UP, this.getWorldRotation(_urfQuat));

        return _up.clone();
      }
    },

    /**
     * !#en Returns a normalized vector representing the right direction (X axis) of the node in world space.
     * !#zh 获取节点正右方（x 轴）面对的方向，返回值为世界坐标系下的归一化向量
     * 
     * @property right
     * @type {Vec3}
     */
    right: {
      get: function get() {
        var _right = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.RIGHT, this.getWorldRotation(_urfQuat));

        return _right.clone();
      }
    },

    /**
     * !#en Returns a normalized vector representing the forward direction (Z axis) of the node in world space.
     * !#zh 获取节点正前方（z 轴）面对的方向，返回值为世界坐标系下的归一化向量
     * 
     * @property forward
     * @type {Vec3}
     */
    forward: {
      get: function get() {
        var _forward = _valueTypes.Vec3.transformQuat(_urfVec3, _valueTypes.Vec3.FORWARD, this.getWorldRotation(_urfQuat));

        return _forward.clone();
      }
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor() {
    this._reorderChildDirty = false; // cache component

    this._widget = null; // fast render component access

    this._renderComponent = null; // Event listeners

    this._capturingListeners = null;
    this._bubblingListeners = null; // Touch event listener

    this._touchListener = null; // Mouse event listener

    this._mouseListener = null;

    this._initDataFromPool();

    this._eventMask = 0;
    this._cullingMask = 1;
    this._childArrivalOrder = 1; // Proxy

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy = new renderer.NodeProxy(this._spaceInfo.unitID, this._spaceInfo.index, this._id, this._name);

      this._proxy.init(this);
    } // should reset _renderFlag for both web and native


    this._renderFlag = RenderFlow.FLAG_TRANSFORM | RenderFlow.FLAG_OPACITY_COLOR;
  },
  statics: {
    EventType: EventType,
    _LocalDirtyFlag: LocalDirtyFlag,
    // is node but not scene
    isNode: function isNode(obj) {
      return obj instanceof Node && (obj.constructor === Node || !(obj instanceof cc.Scene));
    },
    BuiltinGroupIndex: BuiltinGroupIndex
  },
  // OVERRIDES
  _onSiblingIndexChanged: function _onSiblingIndexChanged() {
    // update rendering scene graph, sort them by arrivalOrder
    if (this._parent) {
      this._parent._delaySort();
    }
  },
  _onPreDestroy: function _onPreDestroy() {
    var destroyByParent = this._onPreDestroyBase(); // Actions


    if (ActionManagerExist) {
      cc.director.getActionManager().removeAllActionsFromTarget(this);
    } // Remove Node.currentHovered


    if (_currentHovered === this) {
      _currentHovered = null;
    }

    this._bubblingListeners && this._bubblingListeners.clear();
    this._capturingListeners && this._capturingListeners.clear(); // Remove all event listeners if necessary

    if (this._touchListener || this._mouseListener) {
      eventManager.removeListeners(this);

      if (this._touchListener) {
        this._touchListener.owner = null;
        this._touchListener.mask = null;
        this._touchListener = null;
      }

      if (this._mouseListener) {
        this._mouseListener.owner = null;
        this._mouseListener.mask = null;
        this._mouseListener = null;
      }
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.destroy();

      this._proxy = null;
    }

    this._backDataIntoPool();

    if (this._reorderChildDirty) {
      cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }

    if (!destroyByParent) {
      // simulate some destruct logic to make undo system work correctly
      if (CC_EDITOR) {
        // ensure this node can reattach to scene by undo system
        this._parent = null;
      }
    }
  },
  _onPostActivated: function _onPostActivated(active) {
    var actionManager = ActionManagerExist ? cc.director.getActionManager() : null;

    if (active) {
      // Refresh transform
      this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM; // ActionManager & EventManager

      actionManager && actionManager.resumeTarget(this);
      eventManager.resumeTarget(this); // Search Mask in parent

      this._checkListenerMask();
    } else {
      // deactivate
      actionManager && actionManager.pauseTarget(this);
      eventManager.pauseTarget(this);
    }
  },
  _onHierarchyChanged: function _onHierarchyChanged(oldParent) {
    this._updateOrderOfArrival(); // Fixed a bug where children and parent node groups were forced to synchronize, instead of only synchronizing `_cullingMask` value


    _updateCullingMask(this);

    if (this._parent) {
      this._parent._delaySort();
    }

    this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM;

    this._onHierarchyChangedBase(oldParent);

    if (cc._widgetManager) {
      cc._widgetManager._nodesOrderDirty = true;
    }

    if (oldParent && this._activeInHierarchy) {
      //TODO: It may be necessary to update the listener mask of all child nodes.
      this._checkListenerMask();
    } // Node proxy


    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.updateParent();
    }
  },
  // INTERNAL
  _update3DFunction: function _update3DFunction() {
    if (this._is3DNode) {
      this._updateLocalMatrix = updateLocalMatrix3D;
      this._calculWorldMatrix = calculWorldMatrix3D;
      this._mulMat = mulMat3D;
    } else {
      this._updateLocalMatrix = updateLocalMatrix2D;
      this._calculWorldMatrix = calculWorldMatrix2D;
      this._mulMat = mulMat2D;
    }

    if (this._renderComponent && this._renderComponent._on3DNodeChanged) {
      this._renderComponent._on3DNodeChanged();
    }

    this._renderFlag |= RenderFlow.FLAG_TRANSFORM;
    this._localMatDirty = LocalDirtyFlag.ALL;

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.update3DNode();
    }
  },
  _initDataFromPool: function _initDataFromPool() {
    if (!this._spaceInfo) {
      if (CC_EDITOR || CC_TEST) {
        this._spaceInfo = {
          trs: new Float64Array(10),
          localMat: new Float64Array(16),
          worldMat: new Float64Array(16)
        };
      } else {
        this._spaceInfo = nodeMemPool.pop();
      }
    }

    var spaceInfo = this._spaceInfo;
    this._matrix = cc.mat4(spaceInfo.localMat);

    _valueTypes.Mat4.identity(this._matrix);

    this._worldMatrix = cc.mat4(spaceInfo.worldMat);

    _valueTypes.Mat4.identity(this._worldMatrix);

    this._localMatDirty = LocalDirtyFlag.ALL;
    this._worldMatDirty = true;
    var trs = this._trs = spaceInfo.trs;
    trs[0] = 0; // position.x

    trs[1] = 0; // position.y

    trs[2] = 0; // position.z

    trs[3] = 0; // rotation.x

    trs[4] = 0; // rotation.y

    trs[5] = 0; // rotation.z

    trs[6] = 1; // rotation.w

    trs[7] = 1; // scale.x

    trs[8] = 1; // scale.y

    trs[9] = 1; // scale.z
  },
  _backDataIntoPool: function _backDataIntoPool() {
    if (!(CC_EDITOR || CC_TEST)) {
      // push back to pool
      nodeMemPool.push(this._spaceInfo);
      this._matrix = null;
      this._worldMatrix = null;
      this._trs = null;
      this._spaceInfo = null;
    }
  },
  _toEuler: function _toEuler() {
    if (this.is3DNode) {
      _valueTypes.Trs.toEuler(this._eulerAngles, this._trs);
    } else {
      var z = Math.asin(this._trs[5]) / ONE_DEGREE * 2;

      _valueTypes.Vec3.set(this._eulerAngles, 0, 0, z);
    }
  },
  _fromEuler: function _fromEuler() {
    if (this.is3DNode) {
      _valueTypes.Trs.fromEuler(this._trs, this._eulerAngles);
    } else {
      _valueTypes.Trs.fromAngleZ(this._trs, this._eulerAngles.z);
    }
  },
  _upgrade_1x_to_2x: function _upgrade_1x_to_2x() {
    if (this._is3DNode) {
      this._update3DFunction();
    }

    var trs = this._trs;

    if (trs) {
      var desTrs = trs;
      trs = this._trs = this._spaceInfo.trs; // just adapt to old trs

      if (desTrs.length === 11) {
        trs.set(desTrs.subarray(1));
      } else {
        trs.set(desTrs);
      }
    } else {
      trs = this._trs = this._spaceInfo.trs;
    }

    if (this._zIndex !== undefined) {
      this._localZOrder = this._zIndex << 16;
      this._zIndex = undefined;
    }

    if (CC_EDITOR) {
      if (this._skewX !== 0 || this._skewY !== 0) {
        var NodeUtils = Editor.require('scene://utils/node');

        cc.warn("`cc.Node.skewX/Y` is deprecated since v2.2.1, please use 3D node instead.", "Node: " + NodeUtils.getNodePath(this) + ".");
      }
    }

    this._fromEuler();

    if (this._localZOrder !== 0) {
      this._zIndex = (this._localZOrder & 0xffff0000) >> 16;
    } // Upgrade from 2.0.0 preview 4 & earlier versions
    // TODO: Remove after final version


    if (this._color.a < 255 && this._opacity === 255) {
      this._opacity = this._color.a;
      this._color.a = 255;
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._renderFlag |= RenderFlow.FLAG_TRANSFORM | RenderFlow.FLAG_OPACITY_COLOR;
    }
  },

  /*
   * The initializer for Node which will be called before all components onLoad
   */
  _onBatchCreated: function _onBatchCreated() {
    var prefabInfo = this._prefab;

    if (prefabInfo && prefabInfo.sync && prefabInfo.root === this) {
      if (CC_DEV) {
        // TODO - remove all usage of _synced
        cc.assert(!prefabInfo._synced, 'prefab should not synced');
      }

      PrefabHelper.syncWithPrefab(this);
    }

    this._upgrade_1x_to_2x();

    this._updateOrderOfArrival(); // Fixed a bug where children and parent node groups were forced to synchronize, instead of only synchronizing `_cullingMask` value


    this._cullingMask = 1 << _getActualGroupIndex(this);

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy && this._proxy.updateCullingMask();
    }

    if (!this._activeInHierarchy) {
      // deactivate ActionManager and EventManager by default
      if (ActionManagerExist) {
        cc.director.getActionManager().pauseTarget(this);
      }

      eventManager.pauseTarget(this);
    }

    var children = this._children;

    for (var i = 0, len = children.length; i < len; i++) {
      children[i]._onBatchCreated();
    }

    if (children.length > 0) {
      this._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.initNative();
    }
  },
  // the same as _onBatchCreated but untouch prefab
  _onBatchRestored: function _onBatchRestored() {
    this._upgrade_1x_to_2x(); // Fixed a bug where children and parent node groups were forced to synchronize, instead of only synchronizing `_cullingMask` value


    this._cullingMask = 1 << _getActualGroupIndex(this);

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy && this._proxy.updateCullingMask();
    }

    if (!this._activeInHierarchy) {
      // deactivate ActionManager and EventManager by default
      // ActionManager may not be inited in the editor worker.
      var manager = cc.director.getActionManager();
      manager && manager.pauseTarget(this);
      eventManager.pauseTarget(this);
    }

    var children = this._children;

    for (var i = 0, len = children.length; i < len; i++) {
      children[i]._onBatchRestored();
    }

    if (children.length > 0) {
      this._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }

    if (CC_JSB && CC_NATIVERENDERER) {
      this._proxy.initNative();
    }
  },
  // EVENT TARGET
  _checkListenerMask: function _checkListenerMask() {
    // Because Mask may be nested, need to find all the Mask components in the parent node. 
    // The click area must satisfy all Masks to trigger the click.
    if (this._touchListener) {
      var mask = this._touchListener.mask = _searchComponentsInParent(this, cc.Mask);

      if (this._mouseListener) {
        this._mouseListener.mask = mask;
      }
    } else if (this._mouseListener) {
      this._mouseListener.mask = _searchComponentsInParent(this, cc.Mask);
    }
  },
  _checknSetupSysEvent: function _checknSetupSysEvent(type) {
    var newAdded = false;
    var forDispatch = false;

    if (_touchEvents.indexOf(type) !== -1) {
      if (!this._touchListener) {
        this._touchListener = cc.EventListener.create({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          owner: this,
          mask: _searchComponentsInParent(this, cc.Mask),
          onTouchBegan: _touchStartHandler,
          onTouchMoved: _touchMoveHandler,
          onTouchEnded: _touchEndHandler,
          onTouchCancelled: _touchCancelHandler
        });
        eventManager.addListener(this._touchListener, this);
        newAdded = true;
      }

      forDispatch = true;
    } else if (_mouseEvents.indexOf(type) !== -1) {
      if (!this._mouseListener) {
        this._mouseListener = cc.EventListener.create({
          event: cc.EventListener.MOUSE,
          _previousIn: false,
          owner: this,
          mask: _searchComponentsInParent(this, cc.Mask),
          onMouseDown: _mouseDownHandler,
          onMouseMove: _mouseMoveHandler,
          onMouseUp: _mouseUpHandler,
          onMouseScroll: _mouseWheelHandler
        });
        eventManager.addListener(this._mouseListener, this);
        newAdded = true;
      }

      forDispatch = true;
    }

    if (newAdded && !this._activeInHierarchy) {
      cc.director.getScheduler().schedule(function () {
        if (!this._activeInHierarchy) {
          eventManager.pauseTarget(this);
        }
      }, this, 0, 0, 0, false);
    }

    return forDispatch;
  },

  /**
   * !#en
   * Register a callback of a specific event type on Node.<br/>
   * Use this method to register touch or mouse event permit propagation based on scene graph,<br/>
   * These kinds of event are triggered with dispatchEvent, the dispatch process has three steps:<br/>
   * 1. Capturing phase: dispatch in capture targets (`_getCapturingTargets`), e.g. parents in node tree, from root to the real target<br/>
   * 2. At target phase: dispatch to the listeners of the real target<br/>
   * 3. Bubbling phase: dispatch in bubble targets (`_getBubblingTargets`), e.g. parents in node tree, from the real target to root<br/>
   * In any moment of the dispatching process, it can be stopped via `event.stopPropagation()` or `event.stopPropagationImmidiate()`.<br/>
   * It's the recommended way to register touch/mouse event for Node,<br/>
   * please do not use cc.eventManager directly for Node.<br/>
   * You can also register custom event and use `emit` to trigger custom event on Node.<br/>
   * For such events, there won't be capturing and bubbling phase, your event will be dispatched directly to its listeners registered on the same node.<br/>
   * You can also pass event callback parameters with `emit` by passing parameters after `type`.
   * !#zh
   * 在节点上注册指定类型的回调函数，也可以设置 target 用于绑定响应函数的 this 对象。<br/>
   * 鼠标或触摸事件会被系统调用 dispatchEvent 方法触发，触发的过程包含三个阶段：<br/>
   * 1. 捕获阶段：派发事件给捕获目标（通过 `_getCapturingTargets` 获取），比如，节点树中注册了捕获阶段的父节点，从根节点开始派发直到目标节点。<br/>
   * 2. 目标阶段：派发给目标节点的监听器。<br/>
   * 3. 冒泡阶段：派发事件给冒泡目标（通过 `_getBubblingTargets` 获取），比如，节点树中注册了冒泡阶段的父节点，从目标节点开始派发直到根节点。<br/>
   * 同时您可以将事件派发到父节点或者通过调用 stopPropagation 拦截它。<br/>
   * 推荐使用这种方式来监听节点上的触摸或鼠标事件，请不要在节点上直接使用 cc.eventManager。<br/>
   * 你也可以注册自定义事件到节点上，并通过 emit 方法触发此类事件，对于这类事件，不会发生捕获冒泡阶段，只会直接派发给注册在该节点上的监听器<br/>
   * 你可以通过在 emit 方法调用时在 type 之后传递额外的参数作为事件回调的参数列表
   * @method on
   * @param {String|Node.EventType} type - A string representing the event type to listen for.<br>See {{#crossLink "Node/EventTyupe/POSITION_CHANGED"}}Node Events{{/crossLink}} for all builtin events.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched. The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {Event|any} [callback.event] event or first argument when emit
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @param {Boolean} [useCapture=false] - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
   * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
   * @typescript
   * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * this.node.on(cc.Node.EventType.TOUCH_START, this.memberFunction, this);  // if "this" is component and the "memberFunction" declared in CCClass.
   * node.on(cc.Node.EventType.TOUCH_START, callback, this);
   * node.on(cc.Node.EventType.TOUCH_MOVE, callback, this);
   * node.on(cc.Node.EventType.TOUCH_END, callback, this);
   * node.on(cc.Node.EventType.TOUCH_CANCEL, callback, this);
   * node.on(cc.Node.EventType.ANCHOR_CHANGED, callback);
   * node.on(cc.Node.EventType.COLOR_CHANGED, callback);
   */
  on: function on(type, callback, target, useCapture) {
    var forDispatch = this._checknSetupSysEvent(type);

    if (forDispatch) {
      return this._onDispatch(type, callback, target, useCapture);
    } else {
      switch (type) {
        case EventType.POSITION_CHANGED:
          this._eventMask |= POSITION_ON;
          break;

        case EventType.SCALE_CHANGED:
          this._eventMask |= SCALE_ON;
          break;

        case EventType.ROTATION_CHANGED:
          this._eventMask |= ROTATION_ON;
          break;

        case EventType.SIZE_CHANGED:
          this._eventMask |= SIZE_ON;
          break;

        case EventType.ANCHOR_CHANGED:
          this._eventMask |= ANCHOR_ON;
          break;

        case EventType.COLOR_CHANGED:
          this._eventMask |= COLOR_ON;
          break;
      }

      if (!this._bubblingListeners) {
        this._bubblingListeners = new EventTarget();
      }

      return this._bubblingListeners.on(type, callback, target);
    }
  },

  /**
   * !#en
   * Register an callback of a specific event type on the Node,
   * the callback will remove itself after the first time it is triggered.
   * !#zh
   * 注册节点的特定事件类型回调，回调会在第一时间被触发后删除自身。
   *
   * @method once
   * @param {String} type - A string representing the event type to listen for.
   * @param {Function} callback - The callback that will be invoked when the event is dispatched.
   *                              The callback is ignored if it is a duplicate (the callbacks are unique).
   * @param {Event|any} [callback.event] event or first argument when emit
   * @param {any} [callback.arg2] arg2
   * @param {any} [callback.arg3] arg3
   * @param {any} [callback.arg4] arg4
   * @param {any} [callback.arg5] arg5
   * @param {Object} [target] - The target (this object) to invoke the callback, can be null
   * @typescript
   * once<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
   * @example
   * node.once(cc.Node.EventType.ANCHOR_CHANGED, callback);
   */
  once: function once(type, callback, target, useCapture) {
    var _this = this;

    var forDispatch = this._checknSetupSysEvent(type);

    var listeners = null;

    if (forDispatch && useCapture) {
      listeners = this._capturingListeners = this._capturingListeners || new EventTarget();
    } else {
      listeners = this._bubblingListeners = this._bubblingListeners || new EventTarget();
    }

    listeners.once(type, callback, target);
    listeners.once(type, function () {
      _this.off(type, callback, target);
    }, undefined);
  },
  _onDispatch: function _onDispatch(type, callback, target, useCapture) {
    // Accept also patameters like: (type, callback, useCapture)
    if (typeof target === 'boolean') {
      useCapture = target;
      target = undefined;
    } else useCapture = !!useCapture;

    if (!callback) {
      cc.errorID(6800);
      return;
    }

    var listeners = null;

    if (useCapture) {
      listeners = this._capturingListeners = this._capturingListeners || new EventTarget();
    } else {
      listeners = this._bubblingListeners = this._bubblingListeners || new EventTarget();
    }

    if (!listeners.hasEventListener(type, callback, target)) {
      listeners.on(type, callback, target);

      if (target && target.__eventTargets) {
        target.__eventTargets.push(this);
      }
    }

    return callback;
  },

  /**
   * !#en
   * Removes the callback previously registered with the same type, callback, target and or useCapture.
   * This method is merely an alias to removeEventListener.
   * !#zh 删除之前与同类型，回调，目标或 useCapture 注册的回调。
   * @method off
   * @param {String} type - A string representing the event type being removed.
   * @param {Function} [callback] - The callback to remove.
   * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
   * @param {Boolean} [useCapture=false] - When set to true, the listener will be triggered at capturing phase which is ahead of the final target emit, otherwise it will be triggered during bubbling phase.
   * @example
   * this.node.off(cc.Node.EventType.TOUCH_START, this.memberFunction, this);
   * node.off(cc.Node.EventType.TOUCH_START, callback, this.node);
   * node.off(cc.Node.EventType.ANCHOR_CHANGED, callback, this);
   */
  off: function off(type, callback, target, useCapture) {
    var touchEvent = _touchEvents.indexOf(type) !== -1;
    var mouseEvent = !touchEvent && _mouseEvents.indexOf(type) !== -1;

    if (touchEvent || mouseEvent) {
      this._offDispatch(type, callback, target, useCapture);

      if (touchEvent) {
        if (this._touchListener && !_checkListeners(this, _touchEvents)) {
          eventManager.removeListener(this._touchListener);
          this._touchListener = null;
        }
      } else if (mouseEvent) {
        if (this._mouseListener && !_checkListeners(this, _mouseEvents)) {
          eventManager.removeListener(this._mouseListener);
          this._mouseListener = null;
        }
      }
    } else if (this._bubblingListeners) {
      this._bubblingListeners.off(type, callback, target);

      var hasListeners = this._bubblingListeners.hasEventListener(type); // All listener removed


      if (!hasListeners) {
        switch (type) {
          case EventType.POSITION_CHANGED:
            this._eventMask &= ~POSITION_ON;
            break;

          case EventType.SCALE_CHANGED:
            this._eventMask &= ~SCALE_ON;
            break;

          case EventType.ROTATION_CHANGED:
            this._eventMask &= ~ROTATION_ON;
            break;

          case EventType.SIZE_CHANGED:
            this._eventMask &= ~SIZE_ON;
            break;

          case EventType.ANCHOR_CHANGED:
            this._eventMask &= ~ANCHOR_ON;
            break;

          case EventType.COLOR_CHANGED:
            this._eventMask &= ~COLOR_ON;
            break;
        }
      }
    }
  },
  _offDispatch: function _offDispatch(type, callback, target, useCapture) {
    // Accept also patameters like: (type, callback, useCapture)
    if (typeof target === 'boolean') {
      useCapture = target;
      target = undefined;
    } else useCapture = !!useCapture;

    if (!callback) {
      this._capturingListeners && this._capturingListeners.removeAll(type);
      this._bubblingListeners && this._bubblingListeners.removeAll(type);
    } else {
      var listeners = useCapture ? this._capturingListeners : this._bubblingListeners;

      if (listeners) {
        listeners.off(type, callback, target);

        if (target && target.__eventTargets) {
          js.array.fastRemove(target.__eventTargets, this);
        }
      }
    }
  },

  /**
   * !#en Removes all callbacks previously registered with the same target.
   * !#zh 移除目标上的所有注册事件。
   * @method targetOff
   * @param {Object} target - The target to be searched for all related callbacks
   * @example
   * node.targetOff(target);
   */
  targetOff: function targetOff(target) {
    var listeners = this._bubblingListeners;

    if (listeners) {
      listeners.targetOff(target); // Check for event mask reset

      if (this._eventMask & POSITION_ON && !listeners.hasEventListener(EventType.POSITION_CHANGED)) {
        this._eventMask &= ~POSITION_ON;
      }

      if (this._eventMask & SCALE_ON && !listeners.hasEventListener(EventType.SCALE_CHANGED)) {
        this._eventMask &= ~SCALE_ON;
      }

      if (this._eventMask & ROTATION_ON && !listeners.hasEventListener(EventType.ROTATION_CHANGED)) {
        this._eventMask &= ~ROTATION_ON;
      }

      if (this._eventMask & SIZE_ON && !listeners.hasEventListener(EventType.SIZE_CHANGED)) {
        this._eventMask &= ~SIZE_ON;
      }

      if (this._eventMask & ANCHOR_ON && !listeners.hasEventListener(EventType.ANCHOR_CHANGED)) {
        this._eventMask &= ~ANCHOR_ON;
      }

      if (this._eventMask & COLOR_ON && !listeners.hasEventListener(EventType.COLOR_CHANGED)) {
        this._eventMask &= ~COLOR_ON;
      }
    }

    if (this._capturingListeners) {
      this._capturingListeners.targetOff(target);
    }

    if (target && target.__eventTargets) {
      js.array.fastRemove(target.__eventTargets, this);
    }

    if (this._touchListener && !_checkListeners(this, _touchEvents)) {
      eventManager.removeListener(this._touchListener);
      this._touchListener = null;
    }

    if (this._mouseListener && !_checkListeners(this, _mouseEvents)) {
      eventManager.removeListener(this._mouseListener);
      this._mouseListener = null;
    }
  },

  /**
   * !#en Checks whether the EventTarget object has any callback registered for a specific type of event.
   * !#zh 检查事件目标对象是否有为特定类型的事件注册的回调。
   * @method hasEventListener
   * @param {String} type - The type of event.
   * @return {Boolean} True if a callback of the specified type is registered; false otherwise.
   */
  hasEventListener: function hasEventListener(type) {
    var has = false;

    if (this._bubblingListeners) {
      has = this._bubblingListeners.hasEventListener(type);
    }

    if (!has && this._capturingListeners) {
      has = this._capturingListeners.hasEventListener(type);
    }

    return has;
  },

  /**
   * !#en
   * Trigger an event directly with the event name and necessary arguments.
   * !#zh
   * 通过事件名发送自定义事件
   *
   * @method emit
   * @param {String} type - event type
   * @param {*} [arg1] - First argument in callback
   * @param {*} [arg2] - Second argument in callback
   * @param {*} [arg3] - Third argument in callback
   * @param {*} [arg4] - Fourth argument in callback
   * @param {*} [arg5] - Fifth argument in callback
   * @example
   * 
   * eventTarget.emit('fire', event);
   * eventTarget.emit('fire', message, emitter);
   */
  emit: function emit(type, arg1, arg2, arg3, arg4, arg5) {
    if (this._bubblingListeners) {
      this._bubblingListeners.emit(type, arg1, arg2, arg3, arg4, arg5);
    }
  },

  /**
   * !#en
   * Dispatches an event into the event flow.
   * The event target is the EventTarget object upon which the dispatchEvent() method is called.
   * !#zh 分发事件到事件流中。
   *
   * @method dispatchEvent
   * @param {Event} event - The Event object that is dispatched into the event flow
   */
  dispatchEvent: function dispatchEvent(event) {
    _doDispatchEvent(this, event);

    _cachedArray.length = 0;
  },

  /**
   * !#en Pause node related system events registered with the current Node. Node system events includes touch and mouse events.
   * If recursive is set to true, then this API will pause the node system events for the node and all nodes in its sub node tree.
   * Reference: http://docs.cocos2d-x.org/editors_and_tools/creator-chapters/scripting/internal-events/
   * !#zh 暂停当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
   * 如果传递 recursive 为 true，那么这个 API 将暂停本节点和它的子树上所有节点的节点系统事件。
   * 参考：https://www.cocos.com/docs/creator/scripting/internal-events.html
   * @method pauseSystemEvents
   * @param {Boolean} recursive - Whether to pause node system events on the sub node tree.
   * @example
   * node.pauseSystemEvents(true);
   */
  pauseSystemEvents: function pauseSystemEvents(recursive) {
    eventManager.pauseTarget(this, recursive);
  },

  /**
   * !#en Resume node related system events registered with the current Node. Node system events includes touch and mouse events.
   * If recursive is set to true, then this API will resume the node system events for the node and all nodes in its sub node tree.
   * Reference: http://docs.cocos2d-x.org/editors_and_tools/creator-chapters/scripting/internal-events/
   * !#zh 恢复当前节点上注册的所有节点系统事件，节点系统事件包含触摸和鼠标事件。
   * 如果传递 recursive 为 true，那么这个 API 将恢复本节点和它的子树上所有节点的节点系统事件。
   * 参考：https://www.cocos.com/docs/creator/scripting/internal-events.html
   * @method resumeSystemEvents
   * @param {Boolean} recursive - Whether to resume node system events on the sub node tree.
   * @example
   * node.resumeSystemEvents(true);
   */
  resumeSystemEvents: function resumeSystemEvents(recursive) {
    eventManager.resumeTarget(this, recursive);
  },
  _hitTest: function _hitTest(point, listener) {
    var w = this._contentSize.width,
        h = this._contentSize.height,
        cameraPt = _htVec3a,
        testPt = _htVec3b;
    var camera = cc.Camera.findCamera(this);

    if (camera) {
      camera.getScreenToWorldPoint(point, cameraPt);
    } else {
      cameraPt.set(point);
    }

    this._updateWorldMatrix(); // If scale is 0, it can't be hit.


    if (!_valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix)) {
      return false;
    }

    _valueTypes.Vec2.transformMat4(testPt, cameraPt, _mat4_temp);

    testPt.x += this._anchorPoint.x * w;
    testPt.y += this._anchorPoint.y * h;
    var hit = false;

    if (testPt.x >= 0 && testPt.y >= 0 && testPt.x <= w && testPt.y <= h) {
      hit = true;

      if (listener && listener.mask) {
        var mask = listener.mask;
        var parent = this;
        var length = mask ? mask.length : 0; // find mask parent, should hit test it

        for (var i = 0, j = 0; parent && j < length; ++i, parent = parent.parent) {
          var temp = mask[j];

          if (i === temp.index) {
            if (parent === temp.node) {
              var comp = parent.getComponent(cc.Mask);

              if (comp && comp._enabled && !comp._hitTest(cameraPt)) {
                hit = false;
                break;
              }

              j++;
            } else {
              // mask parent no longer exists
              mask.length = j;
              break;
            }
          } else if (i > temp.index) {
            // mask parent no longer exists
            mask.length = j;
            break;
          }
        }
      }
    }

    return hit;
  },

  /**
   * Get all the targets listening to the supplied type of event in the target's capturing phase.
   * The capturing phase comprises the journey from the root to the last node BEFORE the event target's node.
   * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
   *
   * Subclasses can override this method to make event propagable.
   * @method _getCapturingTargets
   * @private
   * @param {String} type - the event type
   * @param {Array} array - the array to receive targets
   * @example {@link cocos2d/core/event/_getCapturingTargets.js}
   */
  _getCapturingTargets: function _getCapturingTargets(type, array) {
    var parent = this.parent;

    while (parent) {
      if (parent._capturingListeners && parent._capturingListeners.hasEventListener(type)) {
        array.push(parent);
      }

      parent = parent.parent;
    }
  },

  /**
   * Get all the targets listening to the supplied type of event in the target's bubbling phase.
   * The bubbling phase comprises any SUBSEQUENT nodes encountered on the return trip to the root of the tree.
   * The result should save in the array parameter, and MUST SORT from child nodes to parent nodes.
   *
   * Subclasses can override this method to make event propagable.
   * @method _getBubblingTargets
   * @private
   * @param {String} type - the event type
   * @param {Array} array - the array to receive targets
   */
  _getBubblingTargets: function _getBubblingTargets(type, array) {
    var parent = this.parent;

    while (parent) {
      if (parent._bubblingListeners && parent._bubblingListeners.hasEventListener(type)) {
        array.push(parent);
      }

      parent = parent.parent;
    }
  },
  // ACTIONS

  /**
   * !#en
   * Executes an action, and returns the action that is executed.<br/>
   * The node becomes the action's target. Refer to cc.Action's getTarget() <br/>
   * Calling runAction while the node is not active won't have any effect. <br/>
   * Note：You shouldn't modify the action after runAction, that won't take any effect.<br/>
   * if you want to modify, when you define action plus.
   * !#zh
   * 执行并返回该执行的动作。该节点将会变成动作的目标。<br/>
   * 调用 runAction 时，节点自身处于不激活状态将不会有任何效果。<br/>
   * 注意：你不应该修改 runAction 后的动作，将无法发挥作用，如果想进行修改，请在定义 action 时加入。
   * @method runAction
   * @param {Action} action
   * @return {Action} An Action pointer
   * @example
   * var action = cc.scaleTo(0.2, 1, 0.6);
   * node.runAction(action);
   * node.runAction(action).repeatForever(); // fail
   * node.runAction(action.repeatForever()); // right
   */
  runAction: ActionManagerExist ? function (action) {
    if (!this.active) return;
    cc.assertID(action, 1618);
    var am = cc.director.getActionManager();

    if (!am._suppressDeprecation) {
      am._suppressDeprecation = true;
      cc.warnID(1639);
    }

    am.addAction(action, this, false);
    return action;
  } : emptyFunc,

  /**
   * !#en Pause all actions running on the current node. Equals to `cc.director.getActionManager().pauseTarget(node)`.
   * !#zh 暂停本节点上所有正在运行的动作。和 `cc.director.getActionManager().pauseTarget(node);` 等价。
   * @method pauseAllActions
   * @example
   * node.pauseAllActions();
   */
  pauseAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().pauseTarget(this);
  } : emptyFunc,

  /**
   * !#en Resume all paused actions on the current node. Equals to `cc.director.getActionManager().resumeTarget(node)`.
   * !#zh 恢复运行本节点上所有暂停的动作。和 `cc.director.getActionManager().resumeTarget(node);` 等价。
   * @method resumeAllActions
   * @example
   * node.resumeAllActions();
   */
  resumeAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().resumeTarget(this);
  } : emptyFunc,

  /**
   * !#en Stops and removes all actions from the running action list .
   * !#zh 停止并且移除所有正在运行的动作列表。
   * @method stopAllActions
   * @example
   * node.stopAllActions();
   */
  stopAllActions: ActionManagerExist ? function () {
    cc.director.getActionManager().removeAllActionsFromTarget(this);
  } : emptyFunc,

  /**
   * !#en Stops and removes an action from the running action list.
   * !#zh 停止并移除指定的动作。
   * @method stopAction
   * @param {Action} action An action object to be removed.
   * @example
   * var action = cc.scaleTo(0.2, 1, 0.6);
   * node.stopAction(action);
   */
  stopAction: ActionManagerExist ? function (action) {
    cc.director.getActionManager().removeAction(action);
  } : emptyFunc,

  /**
   * !#en Removes an action from the running action list by its tag.
   * !#zh 停止并且移除指定标签的动作。
   * @method stopActionByTag
   * @param {Number} tag A tag that indicates the action to be removed.
   * @example
   * node.stopActionByTag(1);
   */
  stopActionByTag: ActionManagerExist ? function (tag) {
    if (tag === cc.Action.TAG_INVALID) {
      cc.logID(1612);
      return;
    }

    cc.director.getActionManager().removeActionByTag(tag, this);
  } : emptyFunc,

  /**
   * !#en Returns an action from the running action list by its tag.
   * !#zh 通过标签获取指定动作。
   * @method getActionByTag
   * @see cc.Action#getTag and cc.Action#setTag
   * @param {Number} tag
   * @return {Action} The action object with the given tag.
   * @example
   * var action = node.getActionByTag(1);
   */
  getActionByTag: ActionManagerExist ? function (tag) {
    if (tag === cc.Action.TAG_INVALID) {
      cc.logID(1613);
      return null;
    }

    return cc.director.getActionManager().getActionByTag(tag, this);
  } : function () {
    return null;
  },

  /**
   * !#en
   * Returns the numbers of actions that are running plus the ones that are schedule to run (actions in actionsToAdd and actions arrays).<br/>
   *    Composable actions are counted as 1 action. Example:<br/>
   *    If you are running 1 Sequence of 7 actions, it will return 1. <br/>
   *    If you are running 7 Sequences of 2 actions, it will return 7.</p>
   * !#zh
   * 获取运行着的动作加上正在调度运行的动作的总数。<br/>
   * 例如：<br/>
   * - 如果你正在运行 7 个动作中的 1 个 Sequence，它将返回 1。<br/>
   * - 如果你正在运行 2 个动作中的 7 个 Sequence，它将返回 7。<br/>
   *
   * @method getNumberOfRunningActions
   * @return {Number} The number of actions that are running plus the ones that are schedule to run
   * @example
   * var count = node.getNumberOfRunningActions();
   * cc.log("Running Action Count: " + count);
   */
  getNumberOfRunningActions: ActionManagerExist ? function () {
    return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
  } : function () {
    return 0;
  },
  // TRANSFORM RELATED

  /**
   * !#en
   * Returns a copy of the position (x, y, z) of the node in its parent's coordinates.
   * You can pass a cc.Vec2 or cc.Vec3 as the argument to receive the return values.
   * !#zh
   * 获取节点在父节点坐标系中的位置（x, y, z）。
   * 你可以传一个 cc.Vec2 或者 cc.Vec3 作为参数来接收返回值。
   * @method getPosition
   * @param {Vec2|Vec3} [out] - The return value to receive position
   * @return {Vec2|Vec3} The position (x, y, z) of the node in its parent's coordinates
   * @example
   * cc.log("Node Position: " + node.getPosition());
   */
  getPosition: function getPosition(out) {
    out = out || new _valueTypes.Vec3();
    return _valueTypes.Trs.toPosition(out, this._trs);
  },

  /**
   * !#en
   * Sets the position (x, y, z) of the node in its parent's coordinates.<br/>
   * Usually we use cc.v2(x, y) to compose cc.Vec2 object,<br/>
   * and passing two numbers (x, y) is more efficient than passing cc.Vec2 object.
   * For 3D node we can use cc.v3(x, y, z) to compose cc.Vec3 object,<br/>
   * and passing three numbers (x, y, z) is more efficient than passing cc.Vec3 object.
   * !#zh
   * 设置节点在父节点坐标系中的位置。<br/>
   * 可以通过下面的方式设置坐标点：<br/>
   * 1. 传入 2 个数值 x, y。<br/>
   * 2. 传入 cc.v2(x, y) 类型为 cc.Vec2 的对象。
   * 3. 对于 3D 节点可以传入 3 个数值 x, y, z。<br/>
   * 4. 对于 3D 节点可以传入 cc.v3(x, y, z) 类型为 cc.Vec3 的对象。
   * @method setPosition
   * @param {Vec2|Vec3|Number} newPosOrX - X coordinate for position or the position (x, y, z) of the node in coordinates
   * @param {Number} [y] - Y coordinate for position
   * @param {Number} [z] - Z coordinate for position
   */
  setPosition: function setPosition(newPosOrX, y, z) {
    var x;

    if (y === undefined) {
      x = newPosOrX.x;
      y = newPosOrX.y;
      z = newPosOrX.z || 0;
    } else {
      x = newPosOrX;
      z = z || 0;
    }

    var trs = this._trs;

    if (trs[0] === x && trs[1] === y && trs[2] === z) {
      return;
    }

    if (CC_EDITOR) {
      var oldPosition = new cc.Vec3(trs[0], trs[1], trs[2]);
    }

    trs[0] = x;
    trs[1] = y;
    trs[2] = z;
    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);
    !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM); // fast check event

    if (this._eventMask & POSITION_ON) {
      if (CC_EDITOR) {
        this.emit(EventType.POSITION_CHANGED, oldPosition);
      } else {
        this.emit(EventType.POSITION_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Returns the scale factor of the node.
   * Need pass a cc.Vec2 or cc.Vec3 as the argument to receive the return values.
   * !#zh 获取节点的缩放，需要传一个 cc.Vec2 或者 cc.Vec3 作为参数来接收返回值。
   * @method getScale
   * @param {Vec2|Vec3} out
   * @return {Vec2|Vec3} The scale factor
   * @example
   * cc.log("Node Scale: " + node.getScale(cc.v3()));
   */
  getScale: function getScale(out) {
    if (out !== undefined) {
      return _valueTypes.Trs.toScale(out, this._trs);
    } else {
      cc.errorID(1400, 'cc.Node.getScale', 'cc.Node.scale or cc.Node.getScale(cc.Vec3)');
      return this._trs[7];
    }
  },

  /**
   * !#en
   * Sets the scale of axis in local coordinates of the node.
   * You can operate 2 axis in 2D node, and 3 axis in 3D node.
   * !#zh
   * 设置节点在本地坐标系中坐标轴上的缩放比例。
   * 2D 节点可以操作两个坐标轴，而 3D 节点可以操作三个坐标轴。
   * @method setScale
   * @param {Number|Vec2|Vec3} x - scaleX or scale object
   * @param {Number} [y]
   * @param {Number} [z]
   * @example
   * node.setScale(cc.v2(2, 2));
   * node.setScale(cc.v3(2, 2, 2)); // for 3D node
   * node.setScale(2);
   */
  setScale: function setScale(x, y, z) {
    if (x && typeof x !== 'number') {
      y = x.y;
      z = x.z === undefined ? 1 : x.z;
      x = x.x;
    } else if (x !== undefined && y === undefined) {
      y = x;
      z = x;
    } else if (z === undefined) {
      z = 1;
    }

    var trs = this._trs;

    if (trs[7] !== x || trs[8] !== y || trs[9] !== z) {
      trs[7] = x;
      trs[8] = y;
      trs[9] = z;
      this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
      !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

      if (this._eventMask & SCALE_ON) {
        this.emit(EventType.SCALE_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Get rotation of node (in quaternion).
   * Need pass a cc.Quat as the argument to receive the return values.
   * !#zh
   * 获取该节点的 quaternion 旋转角度，需要传一个 cc.Quat 作为参数来接收返回值。
   * @method getRotation
   * @param {Quat} out
   * @return {Quat} Quaternion object represents the rotation
   */
  getRotation: function getRotation(out) {
    if (out instanceof _valueTypes.Quat) {
      return _valueTypes.Trs.toRotation(out, this._trs);
    } else {
      if (CC_DEBUG) {
        cc.warn("`cc.Node.getRotation()` is deprecated since v2.1.0, please use `-cc.Node.angle` instead. (`this.node.getRotation()` -> `-this.node.angle`)");
      }

      return -this.angle;
    }
  },

  /**
   * !#en Set rotation of node (in quaternion).
   * !#zh 设置该节点的 quaternion 旋转角度。
   * @method setRotation
   * @param {cc.Quat|Number} quat Quaternion object represents the rotation or the x value of quaternion
   * @param {Number} [y] y value of quternion
   * @param {Number} [z] z value of quternion
   * @param {Number} [w] w value of quternion
   */
  setRotation: function setRotation(rotation, y, z, w) {
    if (typeof rotation === 'number' && y === undefined) {
      if (CC_DEBUG) {
        cc.warn("`cc.Node.setRotation(degree)` is deprecated since v2.1.0, please set `-cc.Node.angle` instead. (`this.node.setRotation(x)` -> `this.node.angle = -x`)");
      }

      this.angle = -rotation;
    } else {
      var x = rotation;

      if (y === undefined) {
        x = rotation.x;
        y = rotation.y;
        z = rotation.z;
        w = rotation.w;
      }

      var trs = this._trs;

      if (trs[3] !== x || trs[4] !== y || trs[5] !== z || trs[6] !== w) {
        trs[3] = x;
        trs[4] = y;
        trs[5] = z;
        trs[6] = w;
        this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);

        if (this._eventMask & ROTATION_ON) {
          this.emit(EventType.ROTATION_CHANGED);
        }

        if (CC_EDITOR) {
          this._toEuler();
        }
      }
    }
  },

  /**
   * !#en
   * Returns a copy the untransformed size of the node. <br/>
   * The contentSize remains the same no matter the node is scaled or rotated.<br/>
   * All nodes has a size. Layer and Scene has the same size of the screen by default. <br/>
   * !#zh 获取节点自身大小，不受该节点是否被缩放或者旋转的影响。
   * @method getContentSize
   * @return {Size} The untransformed size of the node.
   * @example
   * cc.log("Content Size: " + node.getContentSize());
   */
  getContentSize: function getContentSize() {
    return cc.size(this._contentSize.width, this._contentSize.height);
  },

  /**
   * !#en
   * Sets the untransformed size of the node.<br/>
   * The contentSize remains the same no matter the node is scaled or rotated.<br/>
   * All nodes has a size. Layer and Scene has the same size of the screen.
   * !#zh 设置节点原始大小，不受该节点是否被缩放或者旋转的影响。
   * @method setContentSize
   * @param {Size|Number} size - The untransformed size of the node or The untransformed size's width of the node.
   * @param {Number} [height] - The untransformed size's height of the node.
   * @example
   * node.setContentSize(cc.size(100, 100));
   * node.setContentSize(100, 100);
   */
  setContentSize: function setContentSize(size, height) {
    var locContentSize = this._contentSize;
    var clone;

    if (height === undefined) {
      if (size.width === locContentSize.width && size.height === locContentSize.height) return;

      if (CC_EDITOR) {
        clone = cc.size(locContentSize.width, locContentSize.height);
      }

      locContentSize.width = size.width;
      locContentSize.height = size.height;
    } else {
      if (size === locContentSize.width && height === locContentSize.height) return;

      if (CC_EDITOR) {
        clone = cc.size(locContentSize.width, locContentSize.height);
      }

      locContentSize.width = size;
      locContentSize.height = height;
    }

    if (this._eventMask & SIZE_ON) {
      if (CC_EDITOR) {
        this.emit(EventType.SIZE_CHANGED, clone);
      } else {
        this.emit(EventType.SIZE_CHANGED);
      }
    }
  },

  /**
   * !#en
   * Returns a copy of the anchor point.<br/>
   * Anchor point is the point around which all transformations and positioning manipulations take place.<br/>
   * It's like a pin in the node where it is "attached" to its parent. <br/>
   * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner. <br/>
   * But you can use values higher than (1,1) and lower than (0,0) too.  <br/>
   * The default anchor point is (0.5,0.5), so it starts at the center of the node.
   * !#zh
   * 获取节点锚点，用百分比表示。<br/>
   * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
   * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
   * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
   * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
   * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
   * @method getAnchorPoint
   * @return {Vec2} The anchor point of node.
   * @example
   * cc.log("Node AnchorPoint: " + node.getAnchorPoint());
   */
  getAnchorPoint: function getAnchorPoint() {
    return cc.v2(this._anchorPoint);
  },

  /**
   * !#en
   * Sets the anchor point in percent. <br/>
   * anchor point is the point around which all transformations and positioning manipulations take place. <br/>
   * It's like a pin in the node where it is "attached" to its parent. <br/>
   * The anchorPoint is normalized, like a percentage. (0,0) means the bottom-left corner and (1,1) means the top-right corner.<br/>
   * But you can use values higher than (1,1) and lower than (0,0) too.<br/>
   * The default anchor point is (0.5,0.5), so it starts at the center of the node.
   * !#zh
   * 设置锚点的百分比。<br/>
   * 锚点应用于所有变换和坐标点的操作，它就像在节点上连接其父节点的大头针。<br/>
   * 锚点是标准化的，就像百分比一样。(0，0) 表示左下角，(1，1) 表示右上角。<br/>
   * 但是你可以使用比（1，1）更高的值或者比（0，0）更低的值。<br/>
   * 默认的锚点是（0.5，0.5），因此它开始于节点的中心位置。<br/>
   * 注意：Creator 中的锚点仅用于定位所在的节点，子节点的定位不受影响。
   * @method setAnchorPoint
   * @param {Vec2|Number} point - The anchor point of node or The x axis anchor of node.
   * @param {Number} [y] - The y axis anchor of node.
   * @example
   * node.setAnchorPoint(cc.v2(1, 1));
   * node.setAnchorPoint(1, 1);
   */
  setAnchorPoint: function setAnchorPoint(point, y) {
    var locAnchorPoint = this._anchorPoint;

    if (y === undefined) {
      if (point.x === locAnchorPoint.x && point.y === locAnchorPoint.y) return;
      locAnchorPoint.x = point.x;
      locAnchorPoint.y = point.y;
    } else {
      if (point === locAnchorPoint.x && y === locAnchorPoint.y) return;
      locAnchorPoint.x = point;
      locAnchorPoint.y = y;
    }

    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION);

    if (this._eventMask & ANCHOR_ON) {
      this.emit(EventType.ANCHOR_CHANGED);
    }
  },

  /*
   * Transforms position from world space to local space.
   * @method _invTransformPoint
   * @param {Vec3} out
   * @param {Vec3} vec3
   */
  _invTransformPoint: function _invTransformPoint(out, pos) {
    if (this._parent) {
      this._parent._invTransformPoint(out, pos);
    } else {
      _valueTypes.Vec3.copy(out, pos);
    }

    var ltrs = this._trs; // out = parent_inv_pos - pos

    _valueTypes.Trs.toPosition(_tpVec3a, ltrs);

    _valueTypes.Vec3.sub(out, out, _tpVec3a); // out = inv(rot) * out


    _valueTypes.Trs.toRotation(_tpQuata, ltrs);

    _valueTypes.Quat.conjugate(_tpQuatb, _tpQuata);

    _valueTypes.Vec3.transformQuat(out, out, _tpQuatb); // out = (1/scale) * out


    _valueTypes.Trs.toScale(_tpVec3a, ltrs);

    _valueTypes.Vec3.inverseSafe(_tpVec3b, _tpVec3a);

    _valueTypes.Vec3.mul(out, out, _tpVec3b);

    return out;
  },

  /*
   * Calculate and return world position.
   * This is not a public API yet, its usage could be updated
   * @method getWorldPosition
   * @param {Vec3} out
   * @return {Vec3}
   */
  getWorldPosition: function getWorldPosition(out) {
    _valueTypes.Trs.toPosition(out, this._trs);

    var curr = this._parent;
    var ltrs;

    while (curr) {
      ltrs = curr._trs; // out = parent_scale * pos

      _valueTypes.Trs.toScale(_gwpVec3, ltrs);

      _valueTypes.Vec3.mul(out, out, _gwpVec3); // out = parent_quat * out


      _valueTypes.Trs.toRotation(_gwpQuat, ltrs);

      _valueTypes.Vec3.transformQuat(out, out, _gwpQuat); // out = out + pos


      _valueTypes.Trs.toPosition(_gwpVec3, ltrs);

      _valueTypes.Vec3.add(out, out, _gwpVec3);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world position.
   * This is not a public API yet, its usage could be updated
   * @method setWorldPosition
   * @param {Vec3} pos
   */
  setWorldPosition: function setWorldPosition(pos) {
    var ltrs = this._trs;

    if (CC_EDITOR) {
      var oldPosition = new cc.Vec3(ltrs[0], ltrs[1], ltrs[2]);
    } // NOTE: this is faster than invert world matrix and transform the point


    if (this._parent) {
      this._parent._invTransformPoint(_swpVec3, pos);
    } else {
      _valueTypes.Vec3.copy(_swpVec3, pos);
    }

    _valueTypes.Trs.fromPosition(ltrs, _swpVec3);

    this.setLocalDirty(LocalDirtyFlag.ALL_POSITION); // fast check event

    if (this._eventMask & POSITION_ON) {
      // send event
      if (CC_EDITOR) {
        this.emit(EventType.POSITION_CHANGED, oldPosition);
      } else {
        this.emit(EventType.POSITION_CHANGED);
      }
    }
  },

  /*
   * Calculate and return world rotation
   * This is not a public API yet, its usage could be updated
   * @method getWorldRotation
   * @param {Quat} out
   * @return {Quat}
   */
  getWorldRotation: function getWorldRotation(out) {
    _valueTypes.Trs.toRotation(_gwrQuat, this._trs);

    _valueTypes.Quat.copy(out, _gwrQuat);

    var curr = this._parent;

    while (curr) {
      _valueTypes.Trs.toRotation(_gwrQuat, curr._trs);

      _valueTypes.Quat.mul(out, _gwrQuat, out);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world rotation with quaternion
   * This is not a public API yet, its usage could be updated
   * @method setWorldRotation
   * @param {Quat} val
   */
  setWorldRotation: function setWorldRotation(val) {
    if (this._parent) {
      this._parent.getWorldRotation(_swrQuat);

      _valueTypes.Quat.conjugate(_swrQuat, _swrQuat);

      _valueTypes.Quat.mul(_swrQuat, _swrQuat, val);
    } else {
      _valueTypes.Quat.copy(_swrQuat, val);
    }

    _valueTypes.Trs.fromRotation(this._trs, _swrQuat);

    if (CC_EDITOR) {
      this._toEuler();
    }

    this.setLocalDirty(LocalDirtyFlag.ALL_ROTATION);
  },

  /*
   * Calculate and return world scale
   * This is not a public API yet, its usage could be updated
   * @method getWorldScale
   * @param {Vec3} out
   * @return {Vec3}
   */
  getWorldScale: function getWorldScale(out) {
    _valueTypes.Trs.toScale(_gwsVec3, this._trs);

    _valueTypes.Vec3.copy(out, _gwsVec3);

    var curr = this._parent;

    while (curr) {
      _valueTypes.Trs.toScale(_gwsVec3, curr._trs);

      _valueTypes.Vec3.mul(out, out, _gwsVec3);

      curr = curr._parent;
    }

    return out;
  },

  /*
   * Set world scale with vec3
   * This is not a public API yet, its usage could be updated
   * @method setWorldScale
   * @param {Vec3} scale
   */
  setWorldScale: function setWorldScale(scale) {
    if (this._parent) {
      this._parent.getWorldScale(_swsVec3);

      _valueTypes.Vec3.div(_swsVec3, scale, _swsVec3);
    } else {
      _valueTypes.Vec3.copy(_swsVec3, scale);
    }

    _valueTypes.Trs.fromScale(this._trs, _swsVec3);

    this.setLocalDirty(LocalDirtyFlag.ALL_SCALE);
  },
  getWorldRT: function getWorldRT(out) {
    var opos = _gwrtVec3a;
    var orot = _gwrtQuata;
    var ltrs = this._trs;

    _valueTypes.Trs.toPosition(opos, ltrs);

    _valueTypes.Trs.toRotation(orot, ltrs);

    var curr = this._parent;

    while (curr) {
      ltrs = curr._trs; // opos = parent_lscale * lpos

      _valueTypes.Trs.toScale(_gwrtVec3b, ltrs);

      _valueTypes.Vec3.mul(opos, opos, _gwrtVec3b); // opos = parent_lrot * opos


      _valueTypes.Trs.toRotation(_gwrtQuatb, ltrs);

      _valueTypes.Vec3.transformQuat(opos, opos, _gwrtQuatb); // opos = opos + lpos


      _valueTypes.Trs.toPosition(_gwrtVec3b, ltrs);

      _valueTypes.Vec3.add(opos, opos, _gwrtVec3b); // orot = lrot * orot


      _valueTypes.Quat.mul(orot, _gwrtQuatb, orot);

      curr = curr._parent;
    }

    _valueTypes.Mat4.fromRT(out, orot, opos);

    return out;
  },

  /**
   * !#en Set rotation by lookAt target point, normally used by Camera Node
   * !#zh 通过观察目标来设置 rotation，一般用于 Camera Node 上
   * @method lookAt
   * @param {Vec3} pos
   * @param {Vec3} [up] - default is (0,1,0)
   */
  lookAt: function lookAt(pos, up) {
    this.getWorldPosition(_laVec3);

    _valueTypes.Vec3.sub(_laVec3, _laVec3, pos); // NOTE: we use -z for view-dir


    _valueTypes.Vec3.normalize(_laVec3, _laVec3);

    _valueTypes.Quat.fromViewUp(_laQuat, _laVec3, up);

    this.setWorldRotation(_laQuat);
  },
  _updateLocalMatrix: updateLocalMatrix2D,
  _calculWorldMatrix: function _calculWorldMatrix() {
    // Avoid as much function call as possible
    if (this._localMatDirty & LocalDirtyFlag.TRSS) {
      this._updateLocalMatrix();
    } // Assume parent world matrix is correct


    var parent = this._parent;

    if (parent) {
      this._mulMat(this._worldMatrix, parent._worldMatrix, this._matrix);
    } else {
      _valueTypes.Mat4.copy(this._worldMatrix, this._matrix);
    }

    this._worldMatDirty = false;
  },
  _mulMat: mulMat2D,
  _updateWorldMatrix: function _updateWorldMatrix() {
    if (this._parent) {
      this._parent._updateWorldMatrix();
    }

    if (this._worldMatDirty) {
      this._calculWorldMatrix(); // Sync dirty to children


      var children = this._children;

      for (var i = 0, l = children.length; i < l; i++) {
        children[i]._worldMatDirty = true;
      }
    }
  },
  setLocalDirty: function setLocalDirty(flag) {
    this._localMatDirty |= flag;
    this._worldMatDirty = true;

    if (flag === LocalDirtyFlag.ALL_POSITION || flag === LocalDirtyFlag.POSITION) {
      this._renderFlag |= RenderFlow.FLAG_WORLD_TRANSFORM;
    } else {
      this._renderFlag |= RenderFlow.FLAG_TRANSFORM;
    }
  },
  setWorldDirty: function setWorldDirty() {
    this._worldMatDirty = true;
  },

  /**
   * !#en
   * Get the local transform matrix (4x4), based on parent node coordinates
   * !#zh 返回局部空间坐标系的矩阵，基于父节点坐标系。
   * @method getLocalMatrix
   * @param {Mat4} out The matrix object to be filled with data
   * @return {Mat4} Same as the out matrix object
   * @example
   * let mat4 = cc.mat4();
   * node.getLocalMatrix(mat4);
   */
  getLocalMatrix: function getLocalMatrix(out) {
    this._updateLocalMatrix();

    return _valueTypes.Mat4.copy(out, this._matrix);
  },

  /**
   * !#en
   * Get the world transform matrix (4x4)
   * !#zh 返回世界空间坐标系的矩阵。
   * @method getWorldMatrix
   * @param {Mat4} out The matrix object to be filled with data
   * @return {Mat4} Same as the out matrix object
   * @example
   * let mat4 = cc.mat4();
   * node.getWorldMatrix(mat4);
   */
  getWorldMatrix: function getWorldMatrix(out) {
    this._updateWorldMatrix();

    return _valueTypes.Mat4.copy(out, this._worldMatrix);
  },

  /**
   * !#en
   * Converts a Point to node (local) space coordinates.
   * !#zh
   * 将一个点转换到节点 (局部) 空间坐标系。
   * @method convertToNodeSpaceAR
   * @param {Vec3|Vec2} worldPoint
   * @param {Vec3|Vec2} [out]
   * @return {Vec3|Vec2}
   * @typescript
   * convertToNodeSpaceAR<T extends cc.Vec2 | cc.Vec3>(worldPoint: T, out?: T): T
   * @example
   * var newVec2 = node.convertToNodeSpaceAR(cc.v2(100, 100));
   * var newVec3 = node.convertToNodeSpaceAR(cc.v3(100, 100, 100));
   */
  convertToNodeSpaceAR: function convertToNodeSpaceAR(worldPoint, out) {
    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    if (worldPoint instanceof cc.Vec2) {
      out = out || new cc.Vec2();
      return _valueTypes.Vec2.transformMat4(out, worldPoint, _mat4_temp);
    } else {
      out = out || new cc.Vec3();
      return _valueTypes.Vec3.transformMat4(out, worldPoint, _mat4_temp);
    }
  },

  /**
   * !#en
   * Converts a Point in node coordinates to world space coordinates.
   * !#zh
   * 将节点坐标系下的一个点转换到世界空间坐标系。
   * @method convertToWorldSpaceAR
   * @param {Vec3|Vec2} nodePoint
   * @param {Vec3|Vec2} [out]
   * @return {Vec3|Vec2}
   * @typescript
   * convertToWorldSpaceAR<T extends cc.Vec2 | cc.Vec3>(nodePoint: T, out?: T): T
   * @example
   * var newVec2 = node.convertToWorldSpaceAR(cc.v2(100, 100));
   * var newVec3 = node.convertToWorldSpaceAR(cc.v3(100, 100, 100));
   */
  convertToWorldSpaceAR: function convertToWorldSpaceAR(nodePoint, out) {
    this._updateWorldMatrix();

    if (nodePoint instanceof cc.Vec2) {
      out = out || new cc.Vec2();
      return _valueTypes.Vec2.transformMat4(out, nodePoint, this._worldMatrix);
    } else {
      out = out || new cc.Vec3();
      return _valueTypes.Vec3.transformMat4(out, nodePoint, this._worldMatrix);
    }
  },
  // OLD TRANSFORM ACCESS APIs

  /**
      * !#en Converts a Point to node (local) space coordinates then add the anchor point position.
      * So the return position will be related to the left bottom corner of the node's bounding box.
      * This equals to the API behavior of cocos2d-x, you probably want to use convertToNodeSpaceAR instead
      * !#zh 将一个点转换到节点 (局部) 坐标系，并加上锚点的坐标。<br/>
      * 也就是说返回的坐标是相对于节点包围盒左下角的坐标。<br/>
      * 这个 API 的设计是为了和 cocos2d-x 中行为一致，更多情况下你可能需要使用 convertToNodeSpaceAR。
      * @method convertToNodeSpace
      * @deprecated since v2.1.3
      * @param {Vec2} worldPoint
      * @return {Vec2}
      * @example
      * var newVec2 = node.convertToNodeSpace(cc.v2(100, 100));
      */
  convertToNodeSpace: function convertToNodeSpace(worldPoint) {
    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    var out = new cc.Vec2();

    _valueTypes.Vec2.transformMat4(out, worldPoint, _mat4_temp);

    out.x += this._anchorPoint.x * this._contentSize.width;
    out.y += this._anchorPoint.y * this._contentSize.height;
    return out;
  },

  /**
   * !#en Converts a Point related to the left bottom corner of the node's bounding box to world space coordinates.
   * This equals to the API behavior of cocos2d-x, you probably want to use convertToWorldSpaceAR instead
   * !#zh 将一个相对于节点左下角的坐标位置转换到世界空间坐标系。
   * 这个 API 的设计是为了和 cocos2d-x 中行为一致，更多情况下你可能需要使用 convertToWorldSpaceAR
   * @method convertToWorldSpace
   * @deprecated since v2.1.3
   * @param {Vec2} nodePoint
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertToWorldSpace(cc.v2(100, 100));
   */
  convertToWorldSpace: function convertToWorldSpace(nodePoint) {
    this._updateWorldMatrix();

    var out = new cc.Vec2(nodePoint.x - this._anchorPoint.x * this._contentSize.width, nodePoint.y - this._anchorPoint.y * this._contentSize.height);
    return _valueTypes.Vec2.transformMat4(out, out, this._worldMatrix);
  },

  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
   * The matrix is in Pixels.
   * !#zh 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。这个矩阵以像素为单位。
   * @method getNodeToParentTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToParentTransform(affineTransform);
   */
  getNodeToParentTransform: function getNodeToParentTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    var contentSize = this._contentSize;
    _vec3_temp.x = -this._anchorPoint.x * contentSize.width;
    _vec3_temp.y = -this._anchorPoint.y * contentSize.height;

    _valueTypes.Mat4.copy(_mat4_temp, this._matrix);

    _valueTypes.Mat4.transform(_mat4_temp, _mat4_temp, _vec3_temp);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en
   * Returns the matrix that transform the node's (local) space coordinates into the parent's space coordinates.<br/>
   * The matrix is in Pixels.<br/>
   * This method is AR (Anchor Relative).
   * !#zh
   * 返回这个将节点（局部）的空间坐标系转换成父节点的空间坐标系的矩阵。<br/>
   * 这个矩阵以像素为单位。<br/>
   * 该方法基于节点坐标。
   * @method getNodeToParentTransformAR
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToParentTransformAR(affineTransform);
   */
  getNodeToParentTransformAR: function getNodeToParentTransformAR(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    return AffineTrans.fromMat4(out, this._matrix);
  },

  /**
   * !#en Returns the world affine transform matrix. The matrix is in Pixels.
   * !#zh 返回节点到世界坐标系的仿射变换矩阵。矩阵单位是像素。
   * @method getNodeToWorldTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToWorldTransform(affineTransform);
   */
  getNodeToWorldTransform: function getNodeToWorldTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    var contentSize = this._contentSize;
    _vec3_temp.x = -this._anchorPoint.x * contentSize.width;
    _vec3_temp.y = -this._anchorPoint.y * contentSize.height;

    _valueTypes.Mat4.copy(_mat4_temp, this._worldMatrix);

    _valueTypes.Mat4.transform(_mat4_temp, _mat4_temp, _vec3_temp);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en
   * Returns the world affine transform matrix. The matrix is in Pixels.<br/>
   * This method is AR (Anchor Relative).
   * !#zh
   * 返回节点到世界坐标仿射变换矩阵。矩阵单位是像素。<br/>
   * 该方法基于节点坐标。
   * @method getNodeToWorldTransformAR
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getNodeToWorldTransformAR(affineTransform);
   */
  getNodeToWorldTransformAR: function getNodeToWorldTransformAR(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    return AffineTrans.fromMat4(out, this._worldMatrix);
  },

  /**
   * !#en
   * Returns the matrix that transform parent's space coordinates to the node's (local) space coordinates.<br/>
   * The matrix is in Pixels. The returned transform is readonly and cannot be changed.
   * !#zh
   * 返回将父节点的坐标系转换成节点（局部）的空间坐标系的矩阵。<br/>
   * 该矩阵以像素为单位。返回的矩阵是只读的，不能更改。
   * @method getParentToNodeTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getParentToNodeTransform(affineTransform);
   */
  getParentToNodeTransform: function getParentToNodeTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateLocalMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._matrix);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en Returns the inverse world affine transform matrix. The matrix is in Pixels.
   * !#en 返回世界坐标系到节点坐标系的逆矩阵。
   * @method getWorldToNodeTransform
   * @deprecated since v2.0
   * @param {AffineTransform} [out] The affine transform object to be filled with data
   * @return {AffineTransform} Same as the out affine transform object
   * @example
   * let affineTransform = cc.AffineTransform.create();
   * node.getWorldToNodeTransform(affineTransform);
   */
  getWorldToNodeTransform: function getWorldToNodeTransform(out) {
    if (!out) {
      out = AffineTrans.identity();
    }

    this._updateWorldMatrix();

    _valueTypes.Mat4.invert(_mat4_temp, this._worldMatrix);

    return AffineTrans.fromMat4(out, _mat4_temp);
  },

  /**
   * !#en convenience methods which take a cc.Touch instead of cc.Vec2.
   * !#zh 将触摸点转换成本地坐标系中位置。
   * @method convertTouchToNodeSpace
   * @deprecated since v2.0
   * @param {Touch} touch - The touch object
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertTouchToNodeSpace(touch);
   */
  convertTouchToNodeSpace: function convertTouchToNodeSpace(touch) {
    return this.convertToNodeSpace(touch.getLocation());
  },

  /**
   * !#en converts a cc.Touch (world coordinates) into a local coordinate. This method is AR (Anchor Relative).
   * !#zh 转换一个 cc.Touch（世界坐标）到一个局部坐标，该方法基于节点坐标。
   * @method convertTouchToNodeSpaceAR
   * @deprecated since v2.0
   * @param {Touch} touch - The touch object
   * @return {Vec2}
   * @example
   * var newVec2 = node.convertTouchToNodeSpaceAR(touch);
   */
  convertTouchToNodeSpaceAR: function convertTouchToNodeSpaceAR(touch) {
    return this.convertToNodeSpaceAR(touch.getLocation());
  },

  /**
   * !#en
   * Returns a "local" axis aligned bounding box of the node. <br/>
   * The returned box is relative only to its parent.
   * !#zh 返回父节坐标系下的轴向对齐的包围盒。
   * @method getBoundingBox
   * @return {Rect} The calculated bounding box of the node
   * @example
   * var boundingBox = node.getBoundingBox();
   */
  getBoundingBox: function getBoundingBox() {
    this._updateLocalMatrix();

    var width = this._contentSize.width;
    var height = this._contentSize.height;
    var rect = cc.rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);
    return rect.transformMat4(rect, this._matrix);
  },

  /**
   * !#en
   * Returns a "world" axis aligned bounding box of the node.<br/>
   * The bounding box contains self and active children's world bounding box.
   * !#zh
   * 返回节点在世界坐标系下的对齐轴向的包围盒（AABB）。<br/>
   * 该边框包含自身和已激活的子节点的世界边框。
   * @method getBoundingBoxToWorld
   * @return {Rect}
   * @example
   * var newRect = node.getBoundingBoxToWorld();
   */
  getBoundingBoxToWorld: function getBoundingBoxToWorld() {
    if (this._parent) {
      this._parent._updateWorldMatrix();

      return this._getBoundingBoxTo();
    } else {
      return this.getBoundingBox();
    }
  },
  _getBoundingBoxTo: function _getBoundingBoxTo() {
    var width = this._contentSize.width;
    var height = this._contentSize.height;
    var rect = cc.rect(-this._anchorPoint.x * width, -this._anchorPoint.y * height, width, height);

    this._calculWorldMatrix();

    rect.transformMat4(rect, this._worldMatrix); //query child's BoundingBox

    if (!this._children) return rect;
    var locChildren = this._children;

    for (var i = 0; i < locChildren.length; i++) {
      var child = locChildren[i];

      if (child && child.active) {
        var childRect = child._getBoundingBoxTo();

        if (childRect) rect.union(rect, childRect);
      }
    }

    return rect;
  },
  _updateOrderOfArrival: function _updateOrderOfArrival() {
    var arrivalOrder = this._parent ? ++this._parent._childArrivalOrder : 0;
    this._localZOrder = this._localZOrder & 0xffff0000 | arrivalOrder;
    this.emit(EventType.SIBLING_ORDER_CHANGED);
  },

  /**
   * !#en
   * Adds a child to the node with z order and name.
   * !#zh
   * 添加子节点，并且可以修改该节点的 局部 Z 顺序和名字。
   * @method addChild
   * @param {Node} child - A child node
   * @param {Number} [zIndex] - Z order for drawing priority. Please refer to zIndex property
   * @param {String} [name] - A name to identify the node easily. Please refer to name property
   * @example
   * node.addChild(newNode, 1, "node");
   */
  addChild: function addChild(child, zIndex, name) {
    if (CC_DEV && !cc.Node.isNode(child)) {
      return cc.errorID(1634, cc.js.getClassName(child));
    }

    cc.assertID(child, 1606);
    cc.assertID(child._parent === null, 1605); // invokes the parent setter

    child.parent = this;

    if (zIndex !== undefined) {
      child.zIndex = zIndex;
    }

    if (name !== undefined) {
      child.name = name;
    }
  },

  /**
   * !#en Stops all running actions and schedulers.
   * !#zh 停止所有正在播放的动作和计时器。
   * @method cleanup
   * @example
   * node.cleanup();
   */
  cleanup: function cleanup() {
    // actions
    ActionManagerExist && cc.director.getActionManager().removeAllActionsFromTarget(this); // event

    eventManager.removeListeners(this); // children

    var i,
        len = this._children.length,
        node;

    for (i = 0; i < len; ++i) {
      node = this._children[i];
      if (node) node.cleanup();
    }
  },

  /**
   * !#en Sorts the children array depends on children's zIndex and arrivalOrder,
   * normally you won't need to invoke this function.
   * !#zh 根据子节点的 zIndex 和 arrivalOrder 进行排序，正常情况下开发者不需要手动调用这个函数。
   *
   * @method sortAllChildren
   */
  sortAllChildren: function sortAllChildren() {
    if (this._reorderChildDirty) {
      this._reorderChildDirty = false; // delay update arrivalOrder before sort children

      var _children = this._children,
          child; // reset arrivalOrder before sort children

      this._childArrivalOrder = 1;

      for (var i = 0, len = _children.length; i < len; i++) {
        child = _children[i];

        child._updateOrderOfArrival();
      } // Optimize reordering event code to fix problems with setting zindex
      // https://github.com/cocos-creator/2d-tasks/issues/1186


      eventManager._setDirtyForNode(this);

      if (_children.length > 1) {
        // insertion sort
        var _child, child2;

        for (var _i2 = 1, count = _children.length; _i2 < count; _i2++) {
          _child = _children[_i2];
          var j = _i2;

          for (; j > 0 && (child2 = _children[j - 1])._localZOrder > _child._localZOrder; j--) {
            _children[j] = child2;
          }

          _children[j] = _child;
        }

        this.emit(EventType.CHILD_REORDER, this);
      }

      cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }
  },
  _delaySort: function _delaySort() {
    if (!this._reorderChildDirty) {
      this._reorderChildDirty = true;

      cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
    }
  },
  _restoreProperties: CC_EDITOR && function () {
    /*
     * TODO: Refine this code after completing undo/redo 2.0.
     * The node will be destroyed when deleting in the editor,
     * but it will be reserved and reused for undo.
    */
    // restore 3d node
    this.is3DNode = this.is3DNode;

    if (!this._matrix) {
      this._matrix = cc.mat4(this._spaceInfo.localMat);

      _valueTypes.Mat4.identity(this._matrix);
    }

    if (!this._worldMatrix) {
      this._worldMatrix = cc.mat4(this._spaceInfo.worldMat);

      _valueTypes.Mat4.identity(this._worldMatrix);
    }

    this._localMatDirty = LocalDirtyFlag.ALL;
    this._worldMatDirty = true;

    this._fromEuler();

    this._renderFlag |= RenderFlow.FLAG_TRANSFORM;

    if (this._renderComponent) {
      this._renderComponent.markForRender(true);
    }

    if (this._children.length > 0) {
      this._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }
  },
  onRestore: CC_EDITOR && function () {
    this._onRestoreBase();

    this._restoreProperties();

    var actionManager = cc.director.getActionManager();

    if (this._activeInHierarchy) {
      actionManager && actionManager.resumeTarget(this);
      eventManager.resumeTarget(this);
    } else {
      actionManager && actionManager.pauseTarget(this);
      eventManager.pauseTarget(this);
    }
  }
};

if (CC_EDITOR) {
  // deprecated, only used to import old data in editor
  js.mixin(NodeDefines.properties, {
    _scaleX: {
      "default": undefined,
      type: cc.Float,
      editorOnly: true
    },
    _scaleY: {
      "default": undefined,
      type: cc.Float,
      editorOnly: true
    }
  });
}

var Node = cc.Class(NodeDefines); // 3D Node Property
// Node Event

/**
 * !#en
 * The position changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.POSITION_CHANGED, callback, this);
 * !#zh
 * 位置变动监听事件, 通过 this.node.on(cc.Node.EventType.POSITION_CHANGED, callback, this); 进行监听。
 * @event position-changed
 * @param {Vec2} oldPos - The old position, but this parameter is only available in editor!
 */

/**
 * !#en
 * The size changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.SIZE_CHANGED, callback, this);
 * !#zh
 * 尺寸变动监听事件，通过 this.node.on(cc.Node.EventType.SIZE_CHANGED, callback, this); 进行监听。
 * @event size-changed
 * @param {Size} oldSize - The old size, but this parameter is only available in editor!
 */

/**
 * !#en
 * The anchor changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback, this);
 * !#zh
 * 锚点变动监听事件，通过 this.node.on(cc.Node.EventType.ANCHOR_CHANGED, callback, this); 进行监听。
 * @event anchor-changed
 */

/**
 * !#en
 * The adding child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_ADDED, callback, this);
 * !#zh
 * 增加子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_ADDED, callback, this); 进行监听。
 * @event child-added
 * @param {Node} child - child which have been added
 */

/**
 * !#en
 * The removing child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_REMOVED, callback, this);
 * !#zh
 * 删除子节点监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REMOVED, callback, this); 进行监听。
 * @event child-removed
 * @param {Node} child - child which have been removed
 */

/**
 * !#en
 * The reordering child event, you can listen to this event through the statement this.node.on(cc.Node.EventType.CHILD_REORDER, callback, this);
 * !#zh
 * 子节点顺序变动监听事件，通过 this.node.on(cc.Node.EventType.CHILD_REORDER, callback, this); 进行监听。
 * @event child-reorder
 * @param {Node} node - node whose children have been reordered
 */

/**
 * !#en
 * The group changing event, you can listen to this event through the statement this.node.on(cc.Node.EventType.GROUP_CHANGED, callback, this);
 * !#zh
 * 节点分组变动监听事件，通过 this.node.on(cc.Node.EventType.GROUP_CHANGED, callback, this); 进行监听。
 * @event group-changed
 * @param {Node} node - node whose group has changed
 */
// Deprecated APIs

/**
 * !#en
 * Returns the displayed opacity of Node,
 * the difference between displayed opacity and opacity is that displayed opacity is calculated based on opacity and parent node's opacity when cascade opacity enabled.
 * !#zh
 * 获取节点显示透明度，
 * 显示透明度和透明度之间的不同之处在于当启用级连透明度时，
 * 显示透明度是基于自身透明度和父节点透明度计算的。
 *
 * @method getDisplayedOpacity
 * @return {number} displayed opacity
 * @deprecated since v2.0, please use opacity property, cascade opacity is removed
 */

/**
 * !#en
 * Returns the displayed color of Node,
 * the difference between displayed color and color is that displayed color is calculated based on color and parent node's color when cascade color enabled.
 * !#zh
 * 获取节点的显示颜色，
 * 显示颜色和颜色之间的不同之处在于当启用级连颜色时，
 * 显示颜色是基于自身颜色和父节点颜色计算的。
 *
 * @method getDisplayedColor
 * @return {Color}
 * @deprecated since v2.0, please use color property, cascade color is removed
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Indicate whether node's opacity value affect its child nodes, default value is true.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 节点的不透明度值是否影响其子节点，默认值为 true。
 * @property cascadeOpacity
 * @deprecated since v2.0
 * @type {Boolean}
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Returns whether node's opacity value affect its child nodes.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 返回节点的不透明度值是否影响其子节点。
 * @method isCascadeOpacityEnabled
 * @deprecated since v2.0
 * @return {Boolean}
 */

/**
 * !#en Cascade opacity is removed from v2.0
 * Enable or disable cascade opacity, if cascade enabled, child nodes' opacity will be the multiplication of parent opacity and its own opacity.
 * !#zh 透明度级联功能从 v2.0 开始已移除
 * 启用或禁用级连不透明度，如果级连启用，子节点的不透明度将是父不透明度乘上它自己的不透明度。
 * @method setCascadeOpacityEnabled
 * @deprecated since v2.0
 * @param {Boolean} cascadeOpacityEnabled
 */

/**
 * !#en Opacity modify RGB have been removed since v2.0
 * Set whether color should be changed with the opacity value,
 * useless in ccsg.Node, but this function is override in some class to have such behavior.
 * !#zh 透明度影响颜色配置已经被废弃
 * 设置更改透明度时是否修改RGB值，
 * @method setOpacityModifyRGB
 * @deprecated since v2.0
 * @param {Boolean} opacityValue
 */

/**
 * !#en Opacity modify RGB have been removed since v2.0
 * Get whether color should be changed with the opacity value.
 * !#zh 透明度影响颜色配置已经被废弃
 * 获取更改透明度时是否修改RGB值。
 * @method isOpacityModifyRGB
 * @deprecated since v2.0
 * @return {Boolean}
 */

var _p = Node.prototype;
js.getset(_p, 'position', _p.getPosition, _p.setPosition, false, true);

if (CC_EDITOR) {
  var vec3_tmp = new _valueTypes.Vec3();
  cc.js.getset(_p, 'worldEulerAngles', function () {
    var angles = new _valueTypes.Vec3(this._eulerAngles);
    var parent = this.parent;

    while (parent) {
      angles.addSelf(parent._eulerAngles);
      parent = parent.parent;
    }

    return angles;
  }, function (v) {
    vec3_tmp.set(v);
    var parent = this.parent;

    while (parent) {
      vec3_tmp.subSelf(parent._eulerAngles);
      parent = parent.parent;
    }

    this.eulerAngles = vec3_tmp;
  });
}

cc.Node = module.exports = Node;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDTm9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlTm9kZSIsInJlcXVpcmUiLCJQcmVmYWJIZWxwZXIiLCJub2RlTWVtUG9vbCIsIk5vZGVNZW1Qb29sIiwiQWZmaW5lVHJhbnMiLCJldmVudE1hbmFnZXIiLCJtYWNybyIsImpzIiwiRXZlbnQiLCJFdmVudFRhcmdldCIsIlJlbmRlckZsb3ciLCJGbGFncyIsImNjIiwiT2JqZWN0IiwiRGVzdHJveWluZyIsIkVSUl9JTlZBTElEX05VTUJFUiIsIkNDX0VESVRPUiIsIk9ORV9ERUdSRUUiLCJNYXRoIiwiUEkiLCJBY3Rpb25NYW5hZ2VyRXhpc3QiLCJBY3Rpb25NYW5hZ2VyIiwiZW1wdHlGdW5jIiwiX2d3cFZlYzMiLCJWZWMzIiwiX2d3cFF1YXQiLCJRdWF0IiwiX3RwVmVjM2EiLCJfdHBWZWMzYiIsIl90cFF1YXRhIiwiX3RwUXVhdGIiLCJfc3dwVmVjMyIsIl9nd3NWZWMzIiwiX3N3c1ZlYzMiLCJfZ3dydFZlYzNhIiwiX2d3cnRWZWMzYiIsIl9nd3J0UXVhdGEiLCJfZ3dydFF1YXRiIiwiX2xhVmVjMyIsIl9sYVF1YXQiLCJfdXJmVmVjMyIsIl91cmZRdWF0IiwiX2h0VmVjM2EiLCJfaHRWZWMzYiIsIl9nd3JRdWF0IiwiX3N3clF1YXQiLCJfcXVhdGEiLCJfbWF0NF90ZW1wIiwibWF0NCIsIl92ZWMzX3RlbXAiLCJfY2FjaGVkQXJyYXkiLCJBcnJheSIsImxlbmd0aCIsIlBPU0lUSU9OX09OIiwiU0NBTEVfT04iLCJST1RBVElPTl9PTiIsIlNJWkVfT04iLCJBTkNIT1JfT04iLCJDT0xPUl9PTiIsIkJ1aWx0aW5Hcm91cEluZGV4IiwiRW51bSIsIkRFQlVHIiwiTG9jYWxEaXJ0eUZsYWciLCJQT1NJVElPTiIsIlNDQUxFIiwiUk9UQVRJT04iLCJTS0VXIiwiVFJTIiwiUlMiLCJUUlNTIiwiUEhZU0lDU19QT1NJVElPTiIsIlBIWVNJQ1NfU0NBTEUiLCJQSFlTSUNTX1JPVEFUSU9OIiwiUEhZU0lDU19UUlMiLCJQSFlTSUNTX1JTIiwiQUxMX1BPU0lUSU9OIiwiQUxMX1NDQUxFIiwiQUxMX1JPVEFUSU9OIiwiQUxMX1RSUyIsIkFMTCIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsIk1PVVNFX0RPV04iLCJNT1VTRV9NT1ZFIiwiTU9VU0VfRU5URVIiLCJNT1VTRV9MRUFWRSIsIk1PVVNFX1VQIiwiTU9VU0VfV0hFRUwiLCJQT1NJVElPTl9DSEFOR0VEIiwiUk9UQVRJT05fQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJTSVpFX0NIQU5HRUQiLCJBTkNIT1JfQ0hBTkdFRCIsIkNPTE9SX0NIQU5HRUQiLCJDSElMRF9BRERFRCIsIkNISUxEX1JFTU9WRUQiLCJDSElMRF9SRU9SREVSIiwiR1JPVVBfQ0hBTkdFRCIsIlNJQkxJTkdfT1JERVJfQ0hBTkdFRCIsIl90b3VjaEV2ZW50cyIsIl9tb3VzZUV2ZW50cyIsIl9za2V3TmVlZFdhcm4iLCJfc2tld1dhcm4iLCJ2YWx1ZSIsIm5vZGUiLCJub2RlUGF0aCIsIk5vZGVVdGlscyIsIkVkaXRvciIsImdldE5vZGVQYXRoIiwid2FybiIsIl9jdXJyZW50SG92ZXJlZCIsIl90b3VjaFN0YXJ0SGFuZGxlciIsInRvdWNoIiwiZXZlbnQiLCJwb3MiLCJnZXRMb2NhdGlvbiIsIm93bmVyIiwiX2hpdFRlc3QiLCJ0eXBlIiwiYnViYmxlcyIsImRpc3BhdGNoRXZlbnQiLCJfdG91Y2hNb3ZlSGFuZGxlciIsIl90b3VjaEVuZEhhbmRsZXIiLCJfdG91Y2hDYW5jZWxIYW5kbGVyIiwiX21vdXNlRG93bkhhbmRsZXIiLCJfbW91c2VNb3ZlSGFuZGxlciIsImhpdCIsIl9wcmV2aW91c0luIiwiX21vdXNlTGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJfbW91c2VVcEhhbmRsZXIiLCJfbW91c2VXaGVlbEhhbmRsZXIiLCJfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50IiwiY29tcCIsImluZGV4IiwibGlzdCIsImN1cnIiLCJOb2RlIiwiaXNOb2RlIiwiX3BhcmVudCIsImdldENvbXBvbmVudCIsIm5leHQiLCJwdXNoIiwiX2NoZWNrTGlzdGVuZXJzIiwiZXZlbnRzIiwiX29iakZsYWdzIiwiX2J1YmJsaW5nTGlzdGVuZXJzIiwiaSIsImwiLCJoYXNFdmVudExpc3RlbmVyIiwiX2NhcHR1cmluZ0xpc3RlbmVycyIsIl9kb0Rpc3BhdGNoRXZlbnQiLCJ0YXJnZXQiLCJfZ2V0Q2FwdHVyaW5nVGFyZ2V0cyIsImV2ZW50UGhhc2UiLCJjdXJyZW50VGFyZ2V0IiwiZW1pdCIsIl9wcm9wYWdhdGlvblN0b3BwZWQiLCJfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkIiwiX2dldEJ1YmJsaW5nVGFyZ2V0cyIsIl9nZXRBY3R1YWxHcm91cEluZGV4IiwiZ3JvdXBJbmRleCIsInBhcmVudCIsIl91cGRhdGVDdWxsaW5nTWFzayIsIl9jdWxsaW5nTWFzayIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiX3Byb3h5IiwidXBkYXRlQ3VsbGluZ01hc2siLCJfY2hpbGRyZW4iLCJ1cGRhdGVMb2NhbE1hdHJpeDNEIiwiX2xvY2FsTWF0RGlydHkiLCJ0IiwiX21hdHJpeCIsInRtIiwibSIsIlRycyIsInRvTWF0NCIsIl90cnMiLCJfc2tld1giLCJfc2tld1kiLCJhIiwiYiIsImMiLCJkIiwic2t4IiwidGFuIiwic2t5IiwiSW5maW5pdHkiLCJfd29ybGRNYXREaXJ0eSIsInVwZGF0ZUxvY2FsTWF0cml4MkQiLCJkaXJ0eUZsYWciLCJ0cnMiLCJyb3RhdGlvbiIsIl9ldWxlckFuZ2xlcyIsInoiLCJoYXNTa2V3Iiwic3giLCJzeSIsInJvdGF0aW9uUmFkaWFucyIsInNpbiIsImNvcyIsImNhbGN1bFdvcmxkTWF0cml4M0QiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJwYXJlbnRNYXQiLCJfd29ybGRNYXRyaXgiLCJNYXQ0IiwibXVsIiwiY29weSIsImNhbGN1bFdvcmxkTWF0cml4MkQiLCJfbXVsTWF0IiwibXVsTWF0MkQiLCJvdXQiLCJhbSIsImJtIiwib3V0bSIsImFhIiwiYWIiLCJhYyIsImFkIiwiYXR4IiwiYXR5IiwiYmEiLCJiYiIsImJjIiwiYmQiLCJidHgiLCJidHkiLCJtdWxNYXQzRCIsIk5vZGVEZWZpbmVzIiwibmFtZSIsInByb3BlcnRpZXMiLCJfb3BhY2l0eSIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJfY29udGVudFNpemUiLCJTaXplIiwiX2FuY2hvclBvaW50IiwidjIiLCJfcG9zaXRpb24iLCJ1bmRlZmluZWQiLCJfc2NhbGUiLCJfekluZGV4IiwiSW50ZWdlciIsIl9sb2NhbFpPcmRlciIsInNlcmlhbGl6YWJsZSIsIl9pczNETm9kZSIsIl9ncm91cEluZGV4IiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJnZXQiLCJzZXQiLCJncm91cCIsImdhbWUiLCJncm91cExpc3QiLCJpbmRleE9mIiwieCIsImlzRmluaXRlIiwib2xkVmFsdWUiLCJzZXRMb2NhbERpcnR5IiwiX2V2ZW50TWFzayIsImVycm9yIiwieSIsIl9yZW5kZXJGbGFnIiwiRkxBR19XT1JMRF9UUkFOU0ZPUk0iLCJDQ19ERUJVRyIsImFuZ2xlIiwiZnJvbUFuZ2xlWiIsInJvdGF0aW9uWCIsImZyb21FdWxlck51bWJlciIsInJvdGF0aW9uWSIsImV1bGVyQW5nbGVzIiwidG9FdWxlciIsInYiLCJmcm9tRXVsZXIiLCJGTEFHX1RSQU5TRk9STSIsInF1YXQiLCJzZXRSb3RhdGlvbiIsInNjYWxlIiwic2V0U2NhbGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJza2V3WCIsInVwZGF0ZVNrZXciLCJza2V3WSIsIm9wYWNpdHkiLCJtaXNjIiwiY2xhbXBmIiwidXBkYXRlT3BhY2l0eSIsIkZMQUdfT1BBQ0lUWV9DT0xPUiIsInJhbmdlIiwiY29sb3IiLCJjbG9uZSIsImVxdWFscyIsIkNDX0RFViIsIndhcm5JRCIsIkZMQUdfQ09MT1IiLCJhbmNob3JYIiwiYW5jaG9yUG9pbnQiLCJhbmNob3JZIiwid2lkdGgiLCJzaXplIiwiaGVpZ2h0IiwiekluZGV4IiwiTUFYX1pJTkRFWCIsIk1JTl9aSU5ERVgiLCJfb25TaWJsaW5nSW5kZXhDaGFuZ2VkIiwiaXMzRE5vZGUiLCJfdXBkYXRlM0RGdW5jdGlvbiIsInVwIiwiX3VwIiwidHJhbnNmb3JtUXVhdCIsIlVQIiwiZ2V0V29ybGRSb3RhdGlvbiIsInJpZ2h0IiwiX3JpZ2h0IiwiUklHSFQiLCJmb3J3YXJkIiwiX2ZvcndhcmQiLCJGT1JXQVJEIiwiY3RvciIsIl9yZW9yZGVyQ2hpbGREaXJ0eSIsIl93aWRnZXQiLCJfcmVuZGVyQ29tcG9uZW50IiwiX3RvdWNoTGlzdGVuZXIiLCJfaW5pdERhdGFGcm9tUG9vbCIsIl9jaGlsZEFycml2YWxPcmRlciIsInJlbmRlcmVyIiwiTm9kZVByb3h5IiwiX3NwYWNlSW5mbyIsInVuaXRJRCIsIl9pZCIsIl9uYW1lIiwiaW5pdCIsInN0YXRpY3MiLCJfTG9jYWxEaXJ0eUZsYWciLCJvYmoiLCJjb25zdHJ1Y3RvciIsIlNjZW5lIiwiX2RlbGF5U29ydCIsIl9vblByZURlc3Ryb3kiLCJkZXN0cm95QnlQYXJlbnQiLCJfb25QcmVEZXN0cm95QmFzZSIsImRpcmVjdG9yIiwiZ2V0QWN0aW9uTWFuYWdlciIsInJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0IiwiY2xlYXIiLCJyZW1vdmVMaXN0ZW5lcnMiLCJtYXNrIiwiZGVzdHJveSIsIl9iYWNrRGF0YUludG9Qb29sIiwiX19mYXN0T2ZmIiwiRGlyZWN0b3IiLCJFVkVOVF9BRlRFUl9VUERBVEUiLCJzb3J0QWxsQ2hpbGRyZW4iLCJfb25Qb3N0QWN0aXZhdGVkIiwiYWN0aXZlIiwiYWN0aW9uTWFuYWdlciIsInJlc3VtZVRhcmdldCIsIl9jaGVja0xpc3RlbmVyTWFzayIsInBhdXNlVGFyZ2V0IiwiX29uSGllcmFyY2h5Q2hhbmdlZCIsIm9sZFBhcmVudCIsIl91cGRhdGVPcmRlck9mQXJyaXZhbCIsIl9vbkhpZXJhcmNoeUNoYW5nZWRCYXNlIiwiX3dpZGdldE1hbmFnZXIiLCJfbm9kZXNPcmRlckRpcnR5IiwiX2FjdGl2ZUluSGllcmFyY2h5IiwidXBkYXRlUGFyZW50IiwiX2NhbGN1bFdvcmxkTWF0cml4IiwiX29uM0ROb2RlQ2hhbmdlZCIsInVwZGF0ZTNETm9kZSIsIkNDX1RFU1QiLCJGbG9hdDY0QXJyYXkiLCJsb2NhbE1hdCIsIndvcmxkTWF0IiwicG9wIiwic3BhY2VJbmZvIiwiaWRlbnRpdHkiLCJfdG9FdWxlciIsImFzaW4iLCJfZnJvbUV1bGVyIiwiX3VwZ3JhZGVfMXhfdG9fMngiLCJkZXNUcnMiLCJzdWJhcnJheSIsIl9vbkJhdGNoQ3JlYXRlZCIsInByZWZhYkluZm8iLCJfcHJlZmFiIiwic3luYyIsInJvb3QiLCJhc3NlcnQiLCJfc3luY2VkIiwic3luY1dpdGhQcmVmYWIiLCJjaGlsZHJlbiIsImxlbiIsIkZMQUdfQ0hJTERSRU4iLCJpbml0TmF0aXZlIiwiX29uQmF0Y2hSZXN0b3JlZCIsIm1hbmFnZXIiLCJNYXNrIiwiX2NoZWNrblNldHVwU3lzRXZlbnQiLCJuZXdBZGRlZCIsImZvckRpc3BhdGNoIiwiRXZlbnRMaXN0ZW5lciIsImNyZWF0ZSIsIlRPVUNIX09ORV9CWV9PTkUiLCJzd2FsbG93VG91Y2hlcyIsIm9uVG91Y2hCZWdhbiIsIm9uVG91Y2hNb3ZlZCIsIm9uVG91Y2hFbmRlZCIsIm9uVG91Y2hDYW5jZWxsZWQiLCJhZGRMaXN0ZW5lciIsIk1PVVNFIiwib25Nb3VzZURvd24iLCJvbk1vdXNlTW92ZSIsIm9uTW91c2VVcCIsIm9uTW91c2VTY3JvbGwiLCJnZXRTY2hlZHVsZXIiLCJzY2hlZHVsZSIsIm9uIiwiY2FsbGJhY2siLCJ1c2VDYXB0dXJlIiwiX29uRGlzcGF0Y2giLCJvbmNlIiwibGlzdGVuZXJzIiwib2ZmIiwiZXJyb3JJRCIsIl9fZXZlbnRUYXJnZXRzIiwidG91Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJfb2ZmRGlzcGF0Y2giLCJyZW1vdmVMaXN0ZW5lciIsImhhc0xpc3RlbmVycyIsInJlbW92ZUFsbCIsImFycmF5IiwiZmFzdFJlbW92ZSIsInRhcmdldE9mZiIsImhhcyIsImFyZzEiLCJhcmcyIiwiYXJnMyIsImFyZzQiLCJhcmc1IiwicGF1c2VTeXN0ZW1FdmVudHMiLCJyZWN1cnNpdmUiLCJyZXN1bWVTeXN0ZW1FdmVudHMiLCJwb2ludCIsImxpc3RlbmVyIiwidyIsImgiLCJjYW1lcmFQdCIsInRlc3RQdCIsImNhbWVyYSIsIkNhbWVyYSIsImZpbmRDYW1lcmEiLCJnZXRTY3JlZW5Ub1dvcmxkUG9pbnQiLCJfdXBkYXRlV29ybGRNYXRyaXgiLCJpbnZlcnQiLCJWZWMyIiwidHJhbnNmb3JtTWF0NCIsImoiLCJ0ZW1wIiwiX2VuYWJsZWQiLCJydW5BY3Rpb24iLCJhY3Rpb24iLCJhc3NlcnRJRCIsIl9zdXBwcmVzc0RlcHJlY2F0aW9uIiwiYWRkQWN0aW9uIiwicGF1c2VBbGxBY3Rpb25zIiwicmVzdW1lQWxsQWN0aW9ucyIsInN0b3BBbGxBY3Rpb25zIiwic3RvcEFjdGlvbiIsInJlbW92ZUFjdGlvbiIsInN0b3BBY3Rpb25CeVRhZyIsInRhZyIsIkFjdGlvbiIsIlRBR19JTlZBTElEIiwibG9nSUQiLCJyZW1vdmVBY3Rpb25CeVRhZyIsImdldEFjdGlvbkJ5VGFnIiwiZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9ucyIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnNJblRhcmdldCIsImdldFBvc2l0aW9uIiwidG9Qb3NpdGlvbiIsInNldFBvc2l0aW9uIiwibmV3UG9zT3JYIiwib2xkUG9zaXRpb24iLCJnZXRTY2FsZSIsInRvU2NhbGUiLCJnZXRSb3RhdGlvbiIsInRvUm90YXRpb24iLCJnZXRDb250ZW50U2l6ZSIsInNldENvbnRlbnRTaXplIiwibG9jQ29udGVudFNpemUiLCJnZXRBbmNob3JQb2ludCIsInNldEFuY2hvclBvaW50IiwibG9jQW5jaG9yUG9pbnQiLCJfaW52VHJhbnNmb3JtUG9pbnQiLCJsdHJzIiwic3ViIiwiY29uanVnYXRlIiwiaW52ZXJzZVNhZmUiLCJnZXRXb3JsZFBvc2l0aW9uIiwiYWRkIiwic2V0V29ybGRQb3NpdGlvbiIsImZyb21Qb3NpdGlvbiIsInNldFdvcmxkUm90YXRpb24iLCJ2YWwiLCJmcm9tUm90YXRpb24iLCJnZXRXb3JsZFNjYWxlIiwic2V0V29ybGRTY2FsZSIsImRpdiIsImZyb21TY2FsZSIsImdldFdvcmxkUlQiLCJvcG9zIiwib3JvdCIsImZyb21SVCIsImxvb2tBdCIsIm5vcm1hbGl6ZSIsImZyb21WaWV3VXAiLCJmbGFnIiwic2V0V29ybGREaXJ0eSIsImdldExvY2FsTWF0cml4IiwiZ2V0V29ybGRNYXRyaXgiLCJjb252ZXJ0VG9Ob2RlU3BhY2VBUiIsIndvcmxkUG9pbnQiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlQVIiLCJub2RlUG9pbnQiLCJjb252ZXJ0VG9Ob2RlU3BhY2UiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlIiwiZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtIiwiY29udGVudFNpemUiLCJ0cmFuc2Zvcm0iLCJmcm9tTWF0NCIsImdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSIiwiZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm0iLCJnZXROb2RlVG9Xb3JsZFRyYW5zZm9ybUFSIiwiZ2V0UGFyZW50VG9Ob2RlVHJhbnNmb3JtIiwiZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm0iLCJjb252ZXJ0VG91Y2hUb05vZGVTcGFjZSIsImNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIiLCJnZXRCb3VuZGluZ0JveCIsInJlY3QiLCJnZXRCb3VuZGluZ0JveFRvV29ybGQiLCJfZ2V0Qm91bmRpbmdCb3hUbyIsImxvY0NoaWxkcmVuIiwiY2hpbGQiLCJjaGlsZFJlY3QiLCJ1bmlvbiIsImFycml2YWxPcmRlciIsImFkZENoaWxkIiwiZ2V0Q2xhc3NOYW1lIiwiY2xlYW51cCIsIl9zZXREaXJ0eUZvck5vZGUiLCJjaGlsZDIiLCJjb3VudCIsIl9fZmFzdE9uIiwiX3Jlc3RvcmVQcm9wZXJ0aWVzIiwibWFya0ZvclJlbmRlciIsIm9uUmVzdG9yZSIsIl9vblJlc3RvcmVCYXNlIiwibWl4aW4iLCJfc2NhbGVYIiwiRmxvYXQiLCJlZGl0b3JPbmx5IiwiX3NjYWxlWSIsIkNsYXNzIiwiX3AiLCJwcm90b3R5cGUiLCJnZXRzZXQiLCJ2ZWMzX3RtcCIsImFuZ2xlcyIsImFkZFNlbGYiLCJzdWJTZWxmIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOztBQUVBOztBQUVBLElBQU1BLFFBQVEsR0FBR0MsT0FBTyxDQUFDLG1CQUFELENBQXhCOztBQUNBLElBQU1DLFlBQVksR0FBR0QsT0FBTyxDQUFDLHVCQUFELENBQTVCOztBQUNBLElBQU1FLFdBQVcsR0FBR0YsT0FBTyxDQUFDLG9CQUFELENBQVAsQ0FBOEJHLFdBQWxEOztBQUNBLElBQU1DLFdBQVcsR0FBR0osT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1LLFlBQVksR0FBR0wsT0FBTyxDQUFDLGlCQUFELENBQTVCOztBQUNBLElBQU1NLEtBQUssR0FBR04sT0FBTyxDQUFDLG9CQUFELENBQXJCOztBQUNBLElBQU1PLEVBQUUsR0FBR1AsT0FBTyxDQUFDLGVBQUQsQ0FBbEI7O0FBQ0EsSUFBTVEsS0FBSyxHQUFHUixPQUFPLENBQUMsZUFBRCxDQUFyQjs7QUFDQSxJQUFNUyxXQUFXLEdBQUdULE9BQU8sQ0FBQyxzQkFBRCxDQUEzQjs7QUFDQSxJQUFNVSxVQUFVLEdBQUdWLE9BQU8sQ0FBQyx3QkFBRCxDQUExQjs7QUFFQSxJQUFNVyxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVRixLQUF4QjtBQUNBLElBQU1HLFVBQVUsR0FBR0gsS0FBSyxDQUFDRyxVQUF6QjtBQUVBLElBQU1DLGtCQUFrQixHQUFHQyxTQUFTLElBQUksbUJBQXhDO0FBQ0EsSUFBTUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEVBQUwsR0FBVSxHQUE3QjtBQUVBLElBQUlDLGtCQUFrQixHQUFHLENBQUMsQ0FBQ1IsRUFBRSxDQUFDUyxh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Q2dDLFlBQXhCO0FBQ0FoQyxNQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0EsTUFBaEI7QUFDSDs7QUFDRCxTQUFLNkcsV0FBTCxHQUFtQjRTLFFBQW5CO0FBQ0gsR0FoQkQ7QUFpQkg7O0FBRURsakIsRUFBRSxDQUFDZ0ksSUFBSCxHQUFVc2IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdmIsSUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBNYXQ0LCBWZWMyLCBWZWMzLCBRdWF0LCBUcnMgfSBmcm9tICcuL3ZhbHVlLXR5cGVzJztcblxuY29uc3QgQmFzZU5vZGUgPSByZXF1aXJlKCcuL3V0aWxzL2Jhc2Utbm9kZScpO1xuY29uc3QgUHJlZmFiSGVscGVyID0gcmVxdWlyZSgnLi91dGlscy9wcmVmYWItaGVscGVyJyk7XG5jb25zdCBub2RlTWVtUG9vbCA9IHJlcXVpcmUoJy4vdXRpbHMvdHJhbnMtcG9vbCcpLk5vZGVNZW1Qb29sO1xuY29uc3QgQWZmaW5lVHJhbnMgPSByZXF1aXJlKCcuL3V0aWxzL2FmZmluZS10cmFuc2Zvcm0nKTtcbmNvbnN0IGV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJy4vZXZlbnQtbWFuYWdlcicpO1xuY29uc3QgbWFjcm8gPSByZXF1aXJlKCcuL3BsYXRmb3JtL0NDTWFjcm8nKTtcbmNvbnN0IGpzID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9qcycpO1xuY29uc3QgRXZlbnQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50Jyk7XG5jb25zdCBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnQtdGFyZ2V0Jyk7XG5jb25zdCBSZW5kZXJGbG93ID0gcmVxdWlyZSgnLi9yZW5kZXJlci9yZW5kZXItZmxvdycpO1xuXG5jb25zdCBGbGFncyA9IGNjLk9iamVjdC5GbGFncztcbmNvbnN0IERlc3Ryb3lpbmcgPSBGbGFncy5EZXN0cm95aW5nO1xuXG5jb25zdCBFUlJfSU5WQUxJRF9OVU1CRVIgPSBDQ19FRElUT1IgJiYgJ1RoZSAlcyBpcyBpbnZhbGlkJztcbmNvbnN0IE9ORV9ERUdSRUUgPSBNYXRoLlBJIC8gMTgwO1xuXG52YXIgQWN0aW9uTWFuYWdlckV4aXN0ID0gISFjYy5BY3Rpb25NYW5hZ2VyO1xudmFyIGVtcHR5RnVuYyA9IGZ1bmN0aW9uICgpIHt9O1xuXG4vLyBnZXRXb3JsZFBvc2l0aW9uIHRlbXAgdmFyXG52YXIgX2d3cFZlYzMgPSBuZXcgVmVjMygpO1xudmFyIF9nd3BRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy8gX2ludlRyYW5zZm9ybVBvaW50IHRlbXAgdmFyXG52YXIgX3RwVmVjM2EgPSBuZXcgVmVjMygpO1xudmFyIF90cFZlYzNiID0gbmV3IFZlYzMoKTtcbnZhciBfdHBRdWF0YSA9IG5ldyBRdWF0KCk7XG52YXIgX3RwUXVhdGIgPSBuZXcgUXVhdCgpO1xuXG4vLyBzZXRXb3JsZFBvc2l0aW9uIHRlbXAgdmFyXG52YXIgX3N3cFZlYzMgPSBuZXcgVmVjMygpO1xuXG4vLyBnZXRXb3JsZFNjYWxlIHRlbXAgdmFyXG52YXIgX2d3c1ZlYzMgPSBuZXcgVmVjMygpO1xuXG4vLyBzZXRXb3JsZFNjYWxlIHRlbXAgdmFyXG52YXIgX3N3c1ZlYzMgPSBuZXcgVmVjMygpO1xuXG4vLyBnZXRXb3JsZFJUIHRlbXAgdmFyXG52YXIgX2d3cnRWZWMzYSA9IG5ldyBWZWMzKCk7XG52YXIgX2d3cnRWZWMzYiA9IG5ldyBWZWMzKCk7XG52YXIgX2d3cnRRdWF0YSA9IG5ldyBRdWF0KCk7XG52YXIgX2d3cnRRdWF0YiA9IG5ldyBRdWF0KCk7XG5cbi8vIGxvb2tBdCB0ZW1wIHZhclxudmFyIF9sYVZlYzMgPSBuZXcgVmVjMygpO1xudmFyIF9sYVF1YXQgPSBuZXcgUXVhdCgpO1xuXG4vL3Vw44CBcmlnaHTjgIFmb3J3YXJkIHRlbXAgdmFyXG52YXIgX3VyZlZlYzMgPSBuZXcgVmVjMygpO1xudmFyIF91cmZRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy8gX2hpdFRlc3QgdGVtcCB2YXJcbnZhciBfaHRWZWMzYSA9IG5ldyBWZWMzKCk7XG52YXIgX2h0VmVjM2IgPSBuZXcgVmVjMygpO1xuXG4vLyBnZXRXb3JsZFJvdGF0aW9uIHRlbXAgdmFyXG52YXIgX2d3clF1YXQgPSBuZXcgUXVhdCgpO1xuXG4vLyBzZXRXb3JsZFJvdGF0aW9uIHRlbXAgdmFyXG52YXIgX3N3clF1YXQgPSBuZXcgUXVhdCgpO1xuXG52YXIgX3F1YXRhID0gbmV3IFF1YXQoKTtcbnZhciBfbWF0NF90ZW1wID0gY2MubWF0NCgpO1xudmFyIF92ZWMzX3RlbXAgPSBuZXcgVmVjMygpO1xuXG52YXIgX2NhY2hlZEFycmF5ID0gbmV3IEFycmF5KDE2KTtcbl9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuXG5jb25zdCBQT1NJVElPTl9PTiA9IDEgPDwgMDtcbmNvbnN0IFNDQUxFX09OID0gMSA8PCAxO1xuY29uc3QgUk9UQVRJT05fT04gPSAxIDw8IDI7XG5jb25zdCBTSVpFX09OID0gMSA8PCAzO1xuY29uc3QgQU5DSE9SX09OID0gMSA8PCA0O1xuY29uc3QgQ09MT1JfT04gPSAxIDw8IDU7XG5cblxubGV0IEJ1aWx0aW5Hcm91cEluZGV4ID0gY2MuRW51bSh7XG4gICAgREVCVUc6IDMxXG59KTtcblxuLyoqXG4gKiAhI2VuIE5vZGUncyBsb2NhbCBkaXJ0eSBwcm9wZXJ0aWVzIGZsYWdcbiAqICEjemggTm9kZSDnmoTmnKzlnLDlsZ7mgKcgZGlydHkg54q25oCB5L2NXG4gKiBAZW51bSBOb2RlLl9Mb2NhbERpcnR5RmxhZ1xuICogQHN0YXRpY1xuICogQHByaXZhdGVcbiAqIEBuYW1lc3BhY2UgTm9kZVxuICovXG52YXIgTG9jYWxEaXJ0eUZsYWcgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBPU0lUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFBPU0lUSU9OOiAxIDw8IDAsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBzY2FsZSBkaXJ0eVxuICAgICAqICEjemgg57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTQ0FMRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTQ0FMRTogMSA8PCAxLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igcm90YXRpb24gZGlydHlcbiAgICAgKiAhI3poIOaXi+i9rCBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUk9UQVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUk9UQVRJT046IDEgPDwgMixcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHNrZXcgZGlydHlcbiAgICAgKiAhI3poIHNrZXcgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFNLRVdcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgU0tFVzogMSA8PCAzLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igcm90YXRpb24sIHNjYWxlIG9yIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDml4vovazvvIznvKnmlL7vvIzmiJbkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUUlM6IDEgPDwgMCB8IDEgPDwgMSB8IDEgPDwgMixcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHJvdGF0aW9uIG9yIHNjYWxlIGRpcnR5XG4gICAgICogISN6aCDml4vovazmiJbnvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJTXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJTOiAxIDw8IDEgfCAxIDw8IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciByb3RhdGlvbiwgc2NhbGUsIHBvc2l0aW9uLCBza2V3IGRpcnR5XG4gICAgICogISN6aCDml4vovazvvIznvKnmlL7vvIzkvY3nva7vvIzmiJbmlpzop5IgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFRSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUUlNTOiAxIDw8IDAgfCAxIDw8IDEgfCAxIDw8IDIgfCAxIDw8IDMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBoeXNpY3MgcG9zaXRpb24gZGlydHlcbiAgICAgKiAhI3poIOeJqeeQhuS9jee9riBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEhZU0lDU19QT1NJVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1BPU0lUSU9OOiAxIDw8IDQsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBoeXNpY3Mgc2NhbGUgZGlydHlcbiAgICAgKiAhI3poIOeJqeeQhue8qeaUviBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEhZU0lDU19TQ0FMRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1NDQUxFOiAxIDw8IDUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBoeXNpY3Mgcm90YXRpb24gZGlydHlcbiAgICAgKiAhI3poIOeJqeeQhuaXi+i9rCBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEhZU0lDU19ST1RBVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1JPVEFUSU9OOiAxIDw8IDYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBoeXNpY3MgdHJzIGRpcnR5XG4gICAgICogISN6aCDniannkIbkvY3nva7ml4vovaznvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfVFJTXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFBIWVNJQ1NfVFJTOiAxIDw8IDQgfCAxIDw8IDUgfCAxIDw8IDYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHBoeXNpY3MgcnMgZGlydHlcbiAgICAgKiAhI3poIOeJqeeQhuaXi+i9rOe8qeaUviBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gUEhZU0lDU19SU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1JTOiAxIDw8IDUgfCAxIDw8IDYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIG5vZGUgYW5kIHBoeXNpY3MgcG9zaXRpb24gZGlydHlcbiAgICAgKiAhI3poIOaJgOacieS9jee9riBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxMX1BPU0lUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTF9QT1NJVElPTjogMSA8PCAwIHwgMSA8PCA0LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBub2RlIGFuZCBwaHlzaWNzIHNjYWxlIGRpcnR5XG4gICAgICogISN6aCDmiYDmnInnvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMTF9TQ0FMRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBBTExfU0NBTEU6IDEgPDwgMSB8IDEgPDwgNSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igbm9kZSBhbmQgcGh5c2ljcyByb3RhdGlvbiBkaXJ0eVxuICAgICAqICEjemgg5omA5pyJ5peL6L2sIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExfUk9UQVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQUxMX1JPVEFUSU9OOiAxIDw8IDIgfCAxIDw8IDYsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIG5vZGUgYW5kIHBoeXNpY3MgdHJzIGRpcnR5XG4gICAgICogISN6aCDmiYDmnIl0cnMgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMTF9UUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQUxMX1RSUzogMSA8PCAwIHwgMSA8PCAxIHwgMSA8PCAyIHwgMSA8PCA0IHwgMSA8PCA1IHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBhbGwgZGlydHkgcHJvcGVydGllc1xuICAgICAqICEjemgg6KaG55uW5omA5pyJIGRpcnR5IOeKtuaAgeeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQUxMOiAweGZmZmYsXG59KTtcblxuLyoqXG4gKiAhI2VuIFRoZSBldmVudCB0eXBlIHN1cHBvcnRlZCBieSBOb2RlXG4gKiAhI3poIE5vZGUg5pSv5oyB55qE5LqL5Lu257G75Z6LXG4gKiBAY2xhc3MgTm9kZS5FdmVudFR5cGVcbiAqIEBzdGF0aWNcbiAqIEBuYW1lc3BhY2UgTm9kZVxuICovXG4vLyBXaHkgRXZlbnRUeXBlIGRlZmluZWQgYXMgY2xhc3MsIGJlY2F1c2UgdGhlIGZpcnN0IHBhcmFtZXRlciBvZiBOb2RlLm9uIG1ldGhvZCBuZWVkcyBzZXQgYXMgJ3N0cmluZycgdHlwZS5cbnZhciBFdmVudFR5cGUgPSBjYy5FbnVtKHtcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBzdGFydCBldmVudCwgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAndG91Y2hzdGFydCdcbiAgICAgKiAhI3poIOW9k+aJi+aMh+inpuaRuOWIsOWxj+W5leaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBUT1VDSF9TVEFSVFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9TVEFSVDogJ3RvdWNoc3RhcnQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHRvdWNoIG1vdmUgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNobW92ZSdcbiAgICAgKiAhI3poIOW9k+aJi+aMh+WcqOWxj+W5leS4iuenu+WKqOaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBUT1VDSF9NT1ZFXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFRPVUNIX01PVkU6ICd0b3VjaG1vdmUnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHRvdWNoIGVuZCBldmVudCwgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAndG91Y2hlbmQnXG4gICAgICogISN6aCDlvZPmiYvmjIflnKjnm67moIfoioLngrnljLrln5/lhoXnprvlvIDlsY/luZXml7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gVE9VQ0hfRU5EXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFRPVUNIX0VORDogJ3RvdWNoZW5kJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBlbmQgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNoY2FuY2VsJ1xuICAgICAqICEjemgg5b2T5omL5oyH5Zyo55uu5qCH6IqC54K55Yy65Z+f5aSW56a75byA5bGP5bmV5pe244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFRPVUNIX0NBTkNFTFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9DQU5DRUw6ICd0b3VjaGNhbmNlbCcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBtb3VzZSBkb3duIGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2Vkb3duJ1xuICAgICAqICEjemgg5b2T6byg5qCH5oyJ5LiL5pe26Kem5Y+R5LiA5qyh44CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX0RPV05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTU9VU0VfRE9XTjogJ21vdXNlZG93bicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgbW92ZSBldmVudHMsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ21vdXNlbW92ZSdcbiAgICAgKiAhI3poIOW9k+m8oOagh+WcqOebruagh+iKgueCueWcqOebruagh+iKgueCueWMuuWfn+S4reenu+WKqOaXtu+8jOS4jeiuuuaYr+WQpuaMieS4i+OAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9NT1ZFXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX01PVkU6ICdtb3VzZW1vdmUnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIGVudGVyIHRhcmdldCBldmVudHMsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ21vdXNlZW50ZXInXG4gICAgICogISN6aCDlvZPpvKDmoIfnp7vlhaXnm67moIfoioLngrnljLrln5/ml7bvvIzkuI3orrrmmK/lkKbmjInkuIvjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTU9VU0VfRU5URVJcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTU9VU0VfRU5URVI6ICdtb3VzZWVudGVyJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBtb3VzZSBsZWF2ZSB0YXJnZXQgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZWxlYXZlJ1xuICAgICAqICEjemgg5b2T6byg5qCH56e75Ye655uu5qCH6IqC54K55Yy65Z+f5pe277yM5LiN6K665piv5ZCm5oyJ5LiL44CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX0xFQVZFXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX0xFQVZFOiAnbW91c2VsZWF2ZScsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgdXAgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZXVwJ1xuICAgICAqICEjemgg5b2T6byg5qCH5LuO5oyJ5LiL54q25oCB5p2+5byA5pe26Kem5Y+R5LiA5qyh44CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX1VQXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX1VQOiAnbW91c2V1cCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2Ugd2hlZWwgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZXdoZWVsJ1xuICAgICAqICEjemgg5b2T6byg5qCH5rua6L2u5rua5Yqo5pe244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX1dIRUVMXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX1dIRUVMOiAnbW91c2V3aGVlbCcsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBwb3NpdGlvbiBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K55L2N572u5pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFBPU0lUSU9OX0NIQU5HRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUE9TSVRJT05fQ0hBTkdFRDogJ3Bvc2l0aW9uLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHJvdGF0aW9uIGNoYW5nZSBldmVudHMuXG4gICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgICogISN6aCDlvZPoioLngrnml4vovazmlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gUk9UQVRJT05fQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBST1RBVElPTl9DSEFOR0VEOiAncm90YXRpb24tY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3Igc2NhbGUgY2hhbmdlIGV2ZW50cy5cbiAgICAgKiBQZXJmb3JtYW5jZSBub3RlLCB0aGlzIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIGJlaW5nIGNoYW5nZWQsXG4gICAgICogaWYgdGhlIGV2ZW50IGNhbGxiYWNrIGhhdmUgaGVhdnkgbG9naWMgaXQgbWF5IGhhdmUgZ3JlYXQgcGVyZm9ybWFuY2UgaW1wYWN0LCB0cnkgdG8gYXZvaWQgc3VjaCBzY2VuYXJpby5cbiAgICAgKiAhI3poIOW9k+iKgueCuee8qeaUvuaUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIOaAp+iDveitpuWRiu+8mui/meS4quS6i+S7tuS8muWcqOavj+asoeWvueW6lOeahOWxnuaAp+iiq+S/ruaUueaXtuinpuWPke+8jOWmguaenOS6i+S7tuWbnuiwg+aNn+iAl+i+g+mrmO+8jOacieWPr+iDveWvueaAp+iDveacieW+iOWkp+eahOi0n+mdouW9seWTje+8jOivt+WwvemHj+mBv+WFjei/meenjeaDheWGteOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBTQ0FMRV9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNDQUxFX0NIQU5HRUQ6ICdzY2FsZS1jaGFuZ2VkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBzaXplIGNoYW5nZSBldmVudHMuXG4gICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgICogISN6aCDlvZPoioLngrnlsLrlr7jmlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gU0laRV9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNJWkVfQ0hBTkdFRDogJ3NpemUtY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgYW5jaG9yIHBvaW50IGNoYW5nZSBldmVudHMuXG4gICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgICogISN6aCDlvZPoioLngrnplJrngrnmlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQU5DSE9SX0NIQU5HRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQU5DSE9SX0NIQU5HRUQ6ICdhbmNob3ItY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBjb2xvciBjaGFuZ2UgZXZlbnRzLlxuICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICogaWYgdGhlIGV2ZW50IGNhbGxiYWNrIGhhdmUgaGVhdnkgbG9naWMgaXQgbWF5IGhhdmUgZ3JlYXQgcGVyZm9ybWFuY2UgaW1wYWN0LCB0cnkgdG8gYXZvaWQgc3VjaCBzY2VuYXJpby5cbiAgICAqICEjemgg5b2T6IqC54K56aKc6Imy5pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBDT0xPUl9DSEFOR0VEXG4gICAgKiBAc3RhdGljXG4gICAgKi9cbiAgICBDT0xPUl9DSEFOR0VEOiAnY29sb3ItY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbmV3IGNoaWxkIGFkZGVkIGV2ZW50cy5cbiAgICAgKiAhI3poIOW9k+aWsOeahOWtkOiKgueCueiiq+a3u+WKoOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBDSElMRF9BRERFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBDSElMRF9BRERFRDogJ2NoaWxkLWFkZGVkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBjaGlsZCByZW1vdmVkIGV2ZW50cy5cbiAgICAgKiAhI3poIOW9k+WtkOiKgueCueiiq+enu+mZpOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBDSElMRF9SRU1PVkVEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIENISUxEX1JFTU9WRUQ6ICdjaGlsZC1yZW1vdmVkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBjaGlsZHJlbiByZW9yZGVyIGV2ZW50cy5cbiAgICAgKiAhI3poIOW9k+WtkOiKgueCuemhuuW6j+aUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBDSElMRF9SRU9SREVSXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIENISUxEX1JFT1JERVI6ICdjaGlsZC1yZW9yZGVyJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBub2RlIGdyb3VwIGNoYW5nZWQgZXZlbnRzLlxuICAgICAqICEjemgg5b2T6IqC54K55b2S5bGe576k57uE5Y+R55Sf5Y+Y5YyW5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEdST1VQX0NIQU5HRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgR1JPVVBfQ0hBTkdFRDogJ2dyb3VwLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG5vZGUncyBzaWJsaW5nIG9yZGVyIGNoYW5nZWQuXG4gICAgICogISN6aCDlvZPoioLngrnlnKjlhYTlvJ/oioLngrnkuK3nmoTpobrluo/lj5HnlJ/lj5jljJbml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gU0lCTElOR19PUkRFUl9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNJQkxJTkdfT1JERVJfQ0hBTkdFRDogJ3NpYmxpbmctb3JkZXItY2hhbmdlZCcsXG59KTtcblxudmFyIF90b3VjaEV2ZW50cyA9IFtcbiAgICBFdmVudFR5cGUuVE9VQ0hfU1RBUlQsXG4gICAgRXZlbnRUeXBlLlRPVUNIX01PVkUsXG4gICAgRXZlbnRUeXBlLlRPVUNIX0VORCxcbiAgICBFdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLFxuXTtcbnZhciBfbW91c2VFdmVudHMgPSBbXG4gICAgRXZlbnRUeXBlLk1PVVNFX0RPV04sXG4gICAgRXZlbnRUeXBlLk1PVVNFX0VOVEVSLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9NT1ZFLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9MRUFWRSxcbiAgICBFdmVudFR5cGUuTU9VU0VfVVAsXG4gICAgRXZlbnRUeXBlLk1PVVNFX1dIRUVMLFxuXTtcblxudmFyIF9za2V3TmVlZFdhcm4gPSB0cnVlO1xudmFyIF9za2V3V2FybiA9IGZ1bmN0aW9uICh2YWx1ZSwgbm9kZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gMCkge1xuICAgICAgICB2YXIgbm9kZVBhdGggPSBcIlwiO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgTm9kZVV0aWxzID0gRWRpdG9yLnJlcXVpcmUoJ3NjZW5lOi8vdXRpbHMvbm9kZScpO1xuICAgICAgICAgICAgbm9kZVBhdGggPSBgTm9kZTogJHtOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgobm9kZSl9LmBcbiAgICAgICAgfVxuICAgICAgICBfc2tld05lZWRXYXJuICYmIGNjLndhcm4oXCJgY2MuTm9kZS5za2V3WC9ZYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjIuMSwgcGxlYXNlIHVzZSAzRCBub2RlIGluc3RlYWQuXCIsIG5vZGVQYXRoKTtcbiAgICAgICAgIUNDX0VESVRPUiAmJiAoX3NrZXdOZWVkV2FybiA9IGZhbHNlKTtcbiAgICB9XG59XG5cbnZhciBfY3VycmVudEhvdmVyZWQgPSBudWxsO1xuXG52YXIgX3RvdWNoU3RhcnRIYW5kbGVyID0gZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xuICAgIHZhciBwb3MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9TVEFSVDtcbiAgICAgICAgZXZlbnQudG91Y2ggPSB0b3VjaDtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xudmFyIF90b3VjaE1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcbiAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLlRPVUNIX01PVkU7XG4gICAgZXZlbnQudG91Y2ggPSB0b3VjaDtcbiAgICBldmVudC5idWJibGVzID0gdHJ1ZTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcbnZhciBfdG91Y2hFbmRIYW5kbGVyID0gZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xuICAgIHZhciBwb3MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9FTkQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDtcbiAgICB9XG4gICAgZXZlbnQudG91Y2ggPSB0b3VjaDtcbiAgICBldmVudC5idWJibGVzID0gdHJ1ZTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufTtcbnZhciBfdG91Y2hDYW5jZWxIYW5kbGVyID0gZnVuY3Rpb24gKHRvdWNoLCBldmVudCkge1xuICAgIHZhciBwb3MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMO1xuICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG5cbnZhciBfbW91c2VEb3duSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9ET1dOO1xuICAgICAgICBldmVudC5idWJibGVzID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG59O1xudmFyIF9tb3VzZU1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm93bmVyO1xuICAgIHZhciBoaXQgPSBub2RlLl9oaXRUZXN0KHBvcywgdGhpcyk7XG4gICAgaWYgKGhpdCkge1xuICAgICAgICBpZiAoIXRoaXMuX3ByZXZpb3VzSW4pIHtcbiAgICAgICAgICAgIC8vIEZpeCBpc3N1ZSB3aGVuIGhvdmVyIG5vZGUgc3dpdGNoZWQsIHByZXZpb3VzIGhvdmVyZWQgbm9kZSB3b24ndCBnZXQgTU9VU0VfTEVBVkUgbm90aWZpY2F0aW9uXG4gICAgICAgICAgICBpZiAoX2N1cnJlbnRIb3ZlcmVkICYmIF9jdXJyZW50SG92ZXJlZC5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfTEVBVkU7XG4gICAgICAgICAgICAgICAgX2N1cnJlbnRIb3ZlcmVkLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIF9jdXJyZW50SG92ZXJlZC5fbW91c2VMaXN0ZW5lci5fcHJldmlvdXNJbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2N1cnJlbnRIb3ZlcmVkID0gdGhpcy5vd25lcjtcbiAgICAgICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfRU5URVI7XG4gICAgICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNJbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9NT1ZFO1xuICAgICAgICBldmVudC5idWJibGVzID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodGhpcy5fcHJldmlvdXNJbikge1xuICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX0xFQVZFO1xuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB0aGlzLl9wcmV2aW91c0luID0gZmFsc2U7XG4gICAgICAgIF9jdXJyZW50SG92ZXJlZCA9IG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBjb250aW51ZSBkaXNwYXRjaGluZ1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRXZlbnQgcHJvY2Vzc2VkLCBjbGVhbnVwXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG59O1xudmFyIF9tb3VzZVVwSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9VUDtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn07XG52YXIgX21vdXNlV2hlZWxIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHBvcyA9IGV2ZW50LmdldExvY2F0aW9uKCk7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm93bmVyO1xuXG4gICAgaWYgKG5vZGUuX2hpdFRlc3QocG9zLCB0aGlzKSkge1xuICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX1dIRUVMO1xuICAgICAgICBldmVudC5idWJibGVzID0gdHJ1ZTtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCAobm9kZSwgY29tcCkge1xuICAgIGlmIChjb21wKSB7XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGxldCBsaXN0ID0gbnVsbDtcbiAgICAgICAgZm9yICh2YXIgY3VyciA9IG5vZGU7IGN1cnIgJiYgY2MuTm9kZS5pc05vZGUoY3Vycik7IGN1cnIgPSBjdXJyLl9wYXJlbnQsICsraW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChjdXJyLmdldENvbXBvbmVudChjb21wKSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0ID0ge1xuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGN1cnIsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2gobmV4dCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IFtuZXh0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIF9jaGVja0xpc3RlbmVycyAobm9kZSwgZXZlbnRzKSB7XG4gICAgaWYgKCEobm9kZS5fb2JqRmxhZ3MgJiBEZXN0cm95aW5nKSkge1xuICAgICAgICBpZiAobm9kZS5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZXZlbnRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLl9idWJibGluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKGV2ZW50c1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gZXZlbnRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLl9jYXB0dXJpbmdMaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihldmVudHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBfZG9EaXNwYXRjaEV2ZW50IChvd25lciwgZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0LCBpO1xuICAgIGV2ZW50LnRhcmdldCA9IG93bmVyO1xuXG4gICAgLy8gRXZlbnQuQ0FQVFVSSU5HX1BIQVNFXG4gICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG4gICAgb3duZXIuX2dldENhcHR1cmluZ1RhcmdldHMoZXZlbnQudHlwZSwgX2NhY2hlZEFycmF5KTtcbiAgICAvLyBjYXB0dXJpbmdcbiAgICBldmVudC5ldmVudFBoYXNlID0gMTtcbiAgICBmb3IgKGkgPSBfY2FjaGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdGFyZ2V0ID0gX2NhY2hlZEFycmF5W2ldO1xuICAgICAgICBpZiAodGFyZ2V0Ll9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50XG4gICAgICAgICAgICB0YXJnZXQuX2NhcHR1cmluZ0xpc3RlbmVycy5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50LCBfY2FjaGVkQXJyYXkpO1xuICAgICAgICAgICAgLy8gY2hlY2sgaWYgcHJvcGFnYXRpb24gc3RvcHBlZFxuICAgICAgICAgICAgaWYgKGV2ZW50Ll9wcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG5cbiAgICAvLyBFdmVudC5BVF9UQVJHRVRcbiAgICAvLyBjaGVja3MgaWYgZGVzdHJveWVkIGluIGNhcHR1cmluZyBjYWxsYmFja3NcbiAgICBldmVudC5ldmVudFBoYXNlID0gMjtcbiAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gb3duZXI7XG4gICAgaWYgKG93bmVyLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgb3duZXIuX2NhcHR1cmluZ0xpc3RlbmVycy5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgaWYgKCFldmVudC5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkICYmIG93bmVyLl9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICBvd25lci5fYnViYmxpbmdMaXN0ZW5lcnMuZW1pdChldmVudC50eXBlLCBldmVudCk7XG4gICAgfVxuXG4gICAgaWYgKCFldmVudC5fcHJvcGFnYXRpb25TdG9wcGVkICYmIGV2ZW50LmJ1YmJsZXMpIHtcbiAgICAgICAgLy8gRXZlbnQuQlVCQkxJTkdfUEhBU0VcbiAgICAgICAgb3duZXIuX2dldEJ1YmJsaW5nVGFyZ2V0cyhldmVudC50eXBlLCBfY2FjaGVkQXJyYXkpO1xuICAgICAgICAvLyBwcm9wYWdhdGVcbiAgICAgICAgZXZlbnQuZXZlbnRQaGFzZSA9IDM7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBfY2FjaGVkQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IF9jYWNoZWRBcnJheVtpXTtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICAvLyBmaXJlIGV2ZW50XG4gICAgICAgICAgICAgICAgdGFyZ2V0Ll9idWJibGluZ0xpc3RlbmVycy5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBwcm9wYWdhdGlvbiBzdG9wcGVkXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Ll9wcm9wYWdhdGlvblN0b3BwZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG59XG5cbi8vIHRyYXZlcnNhbCB0aGUgbm9kZSB0cmVlLCBjaGlsZCBjdWxsaW5nTWFzayBtdXN0IGtlZXAgdGhlIHNhbWUgd2l0aCB0aGUgcGFyZW50LlxuZnVuY3Rpb24gX2dldEFjdHVhbEdyb3VwSW5kZXggKG5vZGUpIHtcbiAgICBsZXQgZ3JvdXBJbmRleCA9IG5vZGUuZ3JvdXBJbmRleDtcbiAgICBpZiAoZ3JvdXBJbmRleCA9PT0gMCAmJiBub2RlLnBhcmVudCkge1xuICAgICAgICBncm91cEluZGV4ID0gX2dldEFjdHVhbEdyb3VwSW5kZXgobm9kZS5wYXJlbnQpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBJbmRleDtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUN1bGxpbmdNYXNrIChub2RlKSB7XG4gICAgbGV0IGluZGV4ID0gX2dldEFjdHVhbEdyb3VwSW5kZXgobm9kZSk7XG4gICAgbm9kZS5fY3VsbGluZ01hc2sgPSAxIDw8IGluZGV4O1xuICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgbm9kZS5fcHJveHkgJiYgbm9kZS5fcHJveHkudXBkYXRlQ3VsbGluZ01hc2soKTtcbiAgICB9O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5fY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX3VwZGF0ZUN1bGxpbmdNYXNrKG5vZGUuX2NoaWxkcmVuW2ldKTtcbiAgICB9XG59XG5cbi8vIDJELzNEIG1hdHJpeCBmdW5jdGlvbnNcbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsTWF0cml4M0QgKCkge1xuICAgIGlmICh0aGlzLl9sb2NhbE1hdERpcnR5ICYgTG9jYWxEaXJ0eUZsYWcuVFJTUykge1xuICAgICAgICAvLyBVcGRhdGUgdHJhbnNmb3JtXG4gICAgICAgIGxldCB0ID0gdGhpcy5fbWF0cml4O1xuICAgICAgICBsZXQgdG0gPSB0Lm07XG4gICAgICAgIFRycy50b01hdDQodCwgdGhpcy5fdHJzKTtcblxuICAgICAgICAvLyBza2V3XG4gICAgICAgIGlmICh0aGlzLl9za2V3WCB8fCB0aGlzLl9za2V3WSkge1xuICAgICAgICAgICAgbGV0IGEgPSB0bVswXSwgYiA9IHRtWzFdLCBjID0gdG1bNF0sIGQgPSB0bVs1XTtcbiAgICAgICAgICAgIGxldCBza3ggPSBNYXRoLnRhbih0aGlzLl9za2V3WCAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgbGV0IHNreSA9IE1hdGgudGFuKHRoaXMuX3NrZXdZICogT05FX0RFR1JFRSk7XG4gICAgICAgICAgICBpZiAoc2t4ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICBza3ggPSA5OTk5OTk5OTtcbiAgICAgICAgICAgIGlmIChza3kgPT09IEluZmluaXR5KVxuICAgICAgICAgICAgICAgIHNreSA9IDk5OTk5OTk5O1xuICAgICAgICAgICAgdG1bMF0gPSBhICsgYyAqIHNreTtcbiAgICAgICAgICAgIHRtWzFdID0gYiArIGQgKiBza3k7XG4gICAgICAgICAgICB0bVs0XSA9IGMgKyBhICogc2t4O1xuICAgICAgICAgICAgdG1bNV0gPSBkICsgYiAqIHNreDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NhbE1hdERpcnR5ICY9IH5Mb2NhbERpcnR5RmxhZy5UUlNTO1xuICAgICAgICAvLyBSZWdpc3RlciBkaXJ0eSBzdGF0dXMgb2Ygd29ybGQgbWF0cml4IHNvIHRoYXQgaXQgY2FuIGJlIHJlY2FsY3VsYXRlZFxuICAgICAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsTWF0cml4MkQgKCkge1xuICAgIGxldCBkaXJ0eUZsYWcgPSB0aGlzLl9sb2NhbE1hdERpcnR5O1xuICAgIGlmICghKGRpcnR5RmxhZyAmIExvY2FsRGlydHlGbGFnLlRSU1MpKSByZXR1cm47XG5cbiAgICAvLyBVcGRhdGUgdHJhbnNmb3JtXG4gICAgbGV0IHQgPSB0aGlzLl9tYXRyaXg7XG4gICAgbGV0IHRtID0gdC5tO1xuICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG5cbiAgICBpZiAoZGlydHlGbGFnICYgKExvY2FsRGlydHlGbGFnLlJTIHwgTG9jYWxEaXJ0eUZsYWcuU0tFVykpIHtcbiAgICAgICAgbGV0IHJvdGF0aW9uID0gLXRoaXMuX2V1bGVyQW5nbGVzLno7XG4gICAgICAgIGxldCBoYXNTa2V3ID0gdGhpcy5fc2tld1ggfHwgdGhpcy5fc2tld1k7XG4gICAgICAgIGxldCBzeCA9IHRyc1s3XSwgc3kgPSB0cnNbOF07XG5cbiAgICAgICAgaWYgKHJvdGF0aW9uIHx8IGhhc1NrZXcpIHtcbiAgICAgICAgICAgIGxldCBhID0gMSwgYiA9IDAsIGMgPSAwLCBkID0gMTtcbiAgICAgICAgICAgIC8vIHJvdGF0aW9uXG4gICAgICAgICAgICBpZiAocm90YXRpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgcm90YXRpb25SYWRpYW5zID0gcm90YXRpb24gKiBPTkVfREVHUkVFO1xuICAgICAgICAgICAgICAgIGMgPSBNYXRoLnNpbihyb3RhdGlvblJhZGlhbnMpO1xuICAgICAgICAgICAgICAgIGQgPSBNYXRoLmNvcyhyb3RhdGlvblJhZGlhbnMpO1xuICAgICAgICAgICAgICAgIGEgPSBkO1xuICAgICAgICAgICAgICAgIGIgPSAtYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNjYWxlXG4gICAgICAgICAgICB0bVswXSA9IGEgKj0gc3g7XG4gICAgICAgICAgICB0bVsxXSA9IGIgKj0gc3g7XG4gICAgICAgICAgICB0bVs0XSA9IGMgKj0gc3k7XG4gICAgICAgICAgICB0bVs1XSA9IGQgKj0gc3k7XG4gICAgICAgICAgICAvLyBza2V3XG4gICAgICAgICAgICBpZiAoaGFzU2tldykge1xuICAgICAgICAgICAgICAgIGxldCBhID0gdG1bMF0sIGIgPSB0bVsxXSwgYyA9IHRtWzRdLCBkID0gdG1bNV07XG4gICAgICAgICAgICAgICAgbGV0IHNreCA9IE1hdGgudGFuKHRoaXMuX3NrZXdYICogT05FX0RFR1JFRSk7XG4gICAgICAgICAgICAgICAgbGV0IHNreSA9IE1hdGgudGFuKHRoaXMuX3NrZXdZICogT05FX0RFR1JFRSk7XG4gICAgICAgICAgICAgICAgaWYgKHNreCA9PT0gSW5maW5pdHkpXG4gICAgICAgICAgICAgICAgICAgIHNreCA9IDk5OTk5OTk5O1xuICAgICAgICAgICAgICAgIGlmIChza3kgPT09IEluZmluaXR5KVxuICAgICAgICAgICAgICAgICAgICBza3kgPSA5OTk5OTk5OTtcbiAgICAgICAgICAgICAgICB0bVswXSA9IGEgKyBjICogc2t5O1xuICAgICAgICAgICAgICAgIHRtWzFdID0gYiArIGQgKiBza3k7XG4gICAgICAgICAgICAgICAgdG1bNF0gPSBjICsgYSAqIHNreDtcbiAgICAgICAgICAgICAgICB0bVs1XSA9IGQgKyBiICogc2t4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG1bMF0gPSBzeDtcbiAgICAgICAgICAgIHRtWzFdID0gMDtcbiAgICAgICAgICAgIHRtWzRdID0gMDtcbiAgICAgICAgICAgIHRtWzVdID0gc3k7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwb3NpdGlvblxuICAgIHRtWzEyXSA9IHRyc1swXTtcbiAgICB0bVsxM10gPSB0cnNbMV07XG4gICAgXG4gICAgdGhpcy5fbG9jYWxNYXREaXJ0eSAmPSB+TG9jYWxEaXJ0eUZsYWcuVFJTUztcbiAgICAvLyBSZWdpc3RlciBkaXJ0eSBzdGF0dXMgb2Ygd29ybGQgbWF0cml4IHNvIHRoYXQgaXQgY2FuIGJlIHJlY2FsY3VsYXRlZFxuICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxXb3JsZE1hdHJpeDNEICgpIHtcbiAgICAvLyBBdm9pZCBhcyBtdWNoIGZ1bmN0aW9uIGNhbGwgYXMgcG9zc2libGVcbiAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnRNYXQgPSB0aGlzLl9wYXJlbnQuX3dvcmxkTWF0cml4O1xuICAgICAgICBNYXQ0Lm11bCh0aGlzLl93b3JsZE1hdHJpeCwgcGFyZW50TWF0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgTWF0NC5jb3B5KHRoaXMuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgIH1cbiAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bFdvcmxkTWF0cml4MkQgKCkge1xuICAgIC8vIEF2b2lkIGFzIG11Y2ggZnVuY3Rpb24gY2FsbCBhcyBwb3NzaWJsZVxuICAgIGlmICh0aGlzLl9sb2NhbE1hdERpcnR5ICYgTG9jYWxEaXJ0eUZsYWcuVFJTUykge1xuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBBc3N1bWUgcGFyZW50IHdvcmxkIG1hdHJpeCBpcyBjb3JyZWN0XG4gICAgbGV0IHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX211bE1hdCh0aGlzLl93b3JsZE1hdHJpeCwgcGFyZW50Ll93b3JsZE1hdHJpeCwgdGhpcy5fbWF0cml4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1hdDQuY29weSh0aGlzLl93b3JsZE1hdHJpeCwgdGhpcy5fbWF0cml4KTtcbiAgICB9XG4gICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtdWxNYXQyRCAob3V0LCBhLCBiKSB7XG4gICAgbGV0IGFtID0gYS5tLCBibSA9IGIubSwgb3V0bSA9IG91dC5tO1xuICAgIGxldCBhYT1hbVswXSwgYWI9YW1bMV0sIGFjPWFtWzRdLCBhZD1hbVs1XSwgYXR4PWFtWzEyXSwgYXR5PWFtWzEzXTtcbiAgICBsZXQgYmE9Ym1bMF0sIGJiPWJtWzFdLCBiYz1ibVs0XSwgYmQ9Ym1bNV0sIGJ0eD1ibVsxMl0sIGJ0eT1ibVsxM107XG4gICAgaWYgKGFiICE9PSAwIHx8IGFjICE9PSAwKSB7XG4gICAgICAgIG91dG1bMF0gPSBiYSAqIGFhICsgYmIgKiBhYztcbiAgICAgICAgb3V0bVsxXSA9IGJhICogYWIgKyBiYiAqIGFkO1xuICAgICAgICBvdXRtWzRdID0gYmMgKiBhYSArIGJkICogYWM7XG4gICAgICAgIG91dG1bNV0gPSBiYyAqIGFiICsgYmQgKiBhZDtcbiAgICAgICAgb3V0bVsxMl0gPSBhYSAqIGJ0eCArIGFjICogYnR5ICsgYXR4O1xuICAgICAgICBvdXRtWzEzXSA9IGFiICogYnR4ICsgYWQgKiBidHkgKyBhdHk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvdXRtWzBdID0gYmEgKiBhYTtcbiAgICAgICAgb3V0bVsxXSA9IGJiICogYWQ7XG4gICAgICAgIG91dG1bNF0gPSBiYyAqIGFhO1xuICAgICAgICBvdXRtWzVdID0gYmQgKiBhZDtcbiAgICAgICAgb3V0bVsxMl0gPSBhYSAqIGJ0eCArIGF0eDtcbiAgICAgICAgb3V0bVsxM10gPSBhZCAqIGJ0eSArIGF0eTtcbiAgICB9XG59XG5cbmNvbnN0IG11bE1hdDNEID0gTWF0NC5tdWw7XG5cbi8qKlxuICogISNlblxuICogQ2xhc3Mgb2YgYWxsIGVudGl0aWVzIGluIENvY29zIENyZWF0b3Igc2NlbmVzLjxici8+XG4gKiBGb3IgZXZlbnRzIHN1cHBvcnRlZCBieSBOb2RlLCBwbGVhc2UgcmVmZXIgdG8ge3sjY3Jvc3NMaW5rIFwiTm9kZS5FdmVudFR5cGVcIn19e3svY3Jvc3NMaW5rfX1cbiAqICEjemhcbiAqIENvY29zIENyZWF0b3Ig5Zy65pmv5Lit55qE5omA5pyJ6IqC54K557G744CCPGJyLz5cbiAqIOaUr+aMgeeahOiKgueCueS6i+S7tu+8jOivt+WPgumYhSB7eyNjcm9zc0xpbmsgXCJOb2RlLkV2ZW50VHlwZVwifX17ey9jcm9zc0xpbmt9feOAglxuICogQGNsYXNzIE5vZGVcbiAqIEBleHRlbmRzIF9CYXNlTm9kZVxuICovXG5sZXQgTm9kZURlZmluZXMgPSB7XG4gICAgbmFtZTogJ2NjLk5vZGUnLFxuICAgIGV4dGVuZHM6IEJhc2VOb2RlLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBTRVJJQUxJWkFCTEVcbiAgICAgICAgX29wYWNpdHk6IDI1NSxcbiAgICAgICAgX2NvbG9yOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgX2NvbnRlbnRTaXplOiBjYy5TaXplLFxuICAgICAgICBfYW5jaG9yUG9pbnQ6IGNjLnYyKDAuNSwgMC41KSxcbiAgICAgICAgX3Bvc2l0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgIF9zY2FsZTogdW5kZWZpbmVkLFxuICAgICAgICBfdHJzOiBudWxsLFxuICAgICAgICBfZXVsZXJBbmdsZXM6IGNjLlZlYzMsXG4gICAgICAgIF9za2V3WDogMC4wLFxuICAgICAgICBfc2tld1k6IDAuMCxcbiAgICAgICAgX3pJbmRleDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogY2MuSW50ZWdlclxuICAgICAgICB9LFxuICAgICAgICBfbG9jYWxaT3JkZXI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICBzZXJpYWxpemFibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgXG4gICAgICAgIF9pczNETm9kZTogZmFsc2UsXG5cbiAgICAgICAgLy8gaW50ZXJuYWwgcHJvcGVydGllc1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBHcm91cCBpbmRleCBvZiBub2RlLjxici8+XG4gICAgICAgICAqIFdoaWNoIEdyb3VwIHRoaXMgbm9kZSBiZWxvbmdzIHRvIHdpbGwgcmVzb2x2ZSB0aGF0IHRoaXMgbm9kZSdzIGNvbGxpc2lvbiBjb21wb25lbnRzIGNhbiBjb2xsaWRlIHdpdGggd2hpY2ggb3RoZXIgY29sbGlzaW9uIGNvbXBvbmVudG5zLjxici8+XG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6IqC54K555qE5YiG57uE57Si5byV44CCPGJyLz5cbiAgICAgICAgICog6IqC54K555qE5YiG57uE5bCG5YWz57O75Yiw6IqC54K555qE56Kw5pKe57uE5Lu25Y+v5Lul5LiO5ZOq5Lqb56Kw5pKe57uE5Lu255u456Kw5pKe44CCPGJyLz5cbiAgICAgICAgICogQHByb3BlcnR5IGdyb3VwSW5kZXhcbiAgICAgICAgICogQHR5cGUge0ludGVnZXJ9XG4gICAgICAgICAqIEBkZWZhdWx0IDBcbiAgICAgICAgICovXG4gICAgICAgIF9ncm91cEluZGV4OiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgZm9ybWVybHlTZXJpYWxpemVkQXM6ICdncm91cEluZGV4J1xuICAgICAgICB9LFxuICAgICAgICBncm91cEluZGV4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ncm91cEluZGV4O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ncm91cEluZGV4ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgX3VwZGF0ZUN1bGxpbmdNYXNrKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuR1JPVVBfQ0hBTkdFRCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogR3JvdXAgb2Ygbm9kZS48YnIvPlxuICAgICAgICAgKiBXaGljaCBHcm91cCB0aGlzIG5vZGUgYmVsb25ncyB0byB3aWxsIHJlc29sdmUgdGhhdCB0aGlzIG5vZGUncyBjb2xsaXNpb24gY29tcG9uZW50cyBjYW4gY29sbGlkZSB3aXRoIHdoaWNoIG90aGVyIGNvbGxpc2lvbiBjb21wb25lbnRucy48YnIvPlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOiKgueCueeahOWIhue7hOOAgjxici8+XG4gICAgICAgICAqIOiKgueCueeahOWIhue7hOWwhuWFs+ezu+WIsOiKgueCueeahOeisOaSnue7hOS7tuWPr+S7peS4juWTquS6m+eisOaSnue7hOS7tuebuOeisOaSnuOAgjxici8+XG4gICAgICAgICAqIEBwcm9wZXJ0eSBncm91cFxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgZ3JvdXA6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLmdhbWUuZ3JvdXBMaXN0W3RoaXMuZ3JvdXBJbmRleF0gfHwgJyc7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBncm91cEluZGV4XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cEluZGV4ID0gY2MuZ2FtZS5ncm91cExpc3QuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy9wcm9wZXJ0aWVzIG1vdmVkIGZyb20gYmFzZSBub2RlIGJlZ2luXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHBvc2l0aW9uICh4LCB5KSBvZiB0aGUgbm9kZSBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZXMuXG4gICAgICAgICAqICEjemgg6IqC54K55Zyo54i26IqC54K55Z2Q5qCH57O75Lit55qE5L2N572u77yIeCwgee+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkge1ZlYzN9IHBvc2l0aW9uXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgUG9zaXRpb246IFwiICsgbm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHggYXhpcyBwb3NpdGlvbiBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBYIOi9tOWdkOagh+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgeFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnggPSAxMDA7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgUG9zaXRpb24gWDogXCIgKyBub2RlLngpO1xuICAgICAgICAgKi9cbiAgICAgICAgeDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzBdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SIHx8IGlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlID0gdHJzWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnNbMF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUE9TSVRJT04pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZW5kIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIG5ldyBjYy5WZWMzKG9sZFZhbHVlLCB0cnNbMV0sIHRyc1syXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihFUlJfSU5WQUxJRF9OVU1CRVIsICduZXcgeCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB5IGF4aXMgcG9zaXRpb24gb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDoioLngrkgWSDovbTlnZDmoIfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHlcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS55ID0gMTAwO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFBvc2l0aW9uIFk6IFwiICsgbm9kZS55KTtcbiAgICAgICAgICovXG4gICAgICAgIHk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1sxXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRyc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHRyc1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJzWzFdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdCBjaGVjayBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFBPU0lUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VuZCBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCBuZXcgY2MuVmVjMyh0cnNbMF0sIG9sZFZhbHVlLCB0cnNbMl0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSX0lOVkFMSURfTlVNQkVSLCAnbmV3IHknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4geiBheGlzIHBvc2l0aW9uIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K5IFog6L205Z2Q5qCH44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB6XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICB6OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbMl07XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJzWzJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQ0NfRURJVE9SIHx8IGlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJzWzJdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgY2hlY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihFUlJfSU5WQUxJRF9OVU1CRVIsICduZXcgeicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFJvdGF0aW9uIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6K+l6IqC54K55peL6L2s6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSByb3RhdGlvblxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUucm90YXRpb24gPSA5MDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBSb3RhdGlvbjogXCIgKyBub2RlLnJvdGF0aW9uKTtcbiAgICAgICAgICovXG4gICAgICAgIHJvdGF0aW9uOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25gIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2UgdXNlIGAtYW5nbGVgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uYCAtPiBgLXRoaXMubm9kZS5hbmdsZWApXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gLXRoaXMuYW5nbGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25gIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2Ugc2V0IGAtYW5nbGVgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uID0geGAgLT4gYHRoaXMubm9kZS5hbmdsZSA9IC14YClcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAtdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogQW5nbGUgb2Ygbm9kZSwgdGhlIHBvc2l0aXZlIHZhbHVlIGlzIGFudGktY2xvY2t3aXNlIGRpcmVjdGlvbi5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDor6XoioLngrnnmoTml4vovazop5LluqbvvIzmraPlgLzkuLrpgIbml7bpkojmlrnlkJHjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGFuZ2xlXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBhbmdsZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXVsZXJBbmdsZXMuejtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodGhpcy5fZXVsZXJBbmdsZXMsIDAsIDAsIHZhbHVlKTsgICBcbiAgICAgICAgICAgICAgICBUcnMuZnJvbUFuZ2xlWih0aGlzLl90cnMsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgcm90YXRpb24gYXMgRXVsZXIgYW5nbGVzIGluIGRlZ3JlZXMsIHVzZWQgaW4gM0Qgbm9kZS5cbiAgICAgICAgICogISN6aCDor6XoioLngrnnmoTmrKfmi4nop5LluqbvvIznlKjkuo4gM0Qg6IqC54K544CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBldWxlckFuZ2xlc1xuICAgICAgICAgKiBAdHlwZSB7VmVjM31cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5pczNETm9kZSA9IHRydWU7XG4gICAgICAgICAqIG5vZGUuZXVsZXJBbmdsZXMgPSBjYy52Myg0NSwgNDUsIDQ1KTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBldWxlckFuZ2xlcyAoWCwgWSwgWik6IFwiICsgbm9kZS5ldWxlckFuZ2xlcy50b1N0cmluZygpKTtcbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUm90YXRpb24gb24geCBheGlzLlxuICAgICAgICAgKiAhI3poIOivpeiKgueCuSBYIOi9tOaXi+i9rOinkuW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgcm90YXRpb25YXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5pczNETm9kZSA9IHRydWU7XG4gICAgICAgICAqIG5vZGUuZXVsZXJBbmdsZXMgPSBjYy52Myg0NSwgMCwgMCk7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgZXVsZXJBbmdsZXMgWDogXCIgKyBub2RlLmV1bGVyQW5nbGVzLngpO1xuICAgICAgICAgKi9cbiAgICAgICAgcm90YXRpb25YOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25YYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHVzZSBgZXVsZXJBbmdsZXMueGAgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb25YYCAtPiBgdGhpcy5ub2RlLmV1bGVyQW5nbGVzLnhgKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V1bGVyQW5nbGVzLng7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25YYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHNldCBgZXVsZXJBbmdsZXNgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uWCA9IHhgIC0+IGB0aGlzLm5vZGUuaXMzRE5vZGUgPSB0cnVlOyB0aGlzLm5vZGUuZXVsZXJBbmdsZXMgPSBjYy52Myh4LCAwLCAwKWBcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldWxlckFuZ2xlcy54ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldWxlckFuZ2xlcy54ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBxdWF0ZXJuaW9uIGZyb20gcm90YXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V1bGVyQW5nbGVzLnggPT09IHRoaXMuX2V1bGVyQW5nbGVzLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRycy5mcm9tQW5nbGVaKHRoaXMuX3RycywgLXZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRycy5mcm9tRXVsZXJOdW1iZXIodGhpcy5fdHJzLCB2YWx1ZSwgdGhpcy5fZXVsZXJBbmdsZXMueSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFJPVEFUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSb3RhdGlvbiBvbiB5IGF4aXMuXG4gICAgICAgICAqICEjemgg6K+l6IqC54K5IFkg6L205peL6L2s6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSByb3RhdGlvbllcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmlzM0ROb2RlID0gdHJ1ZTtcbiAgICAgICAgICogbm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKDAsIDQ1LCAwKTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBldWxlckFuZ2xlcyBZOiBcIiArIG5vZGUuZXVsZXJBbmdsZXMueSk7XG4gICAgICAgICAqL1xuICAgICAgICByb3RhdGlvblk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvbllgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2UgdXNlIGBldWxlckFuZ2xlcy55YCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvbllgIC0+IGB0aGlzLm5vZGUuZXVsZXJBbmdsZXMueWApXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZXVsZXJBbmdsZXMueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5yb3RhdGlvbllgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2Ugc2V0IGBldWxlckFuZ2xlc2AgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb25ZID0geWAgLT4gYHRoaXMubm9kZS5pczNETm9kZSA9IHRydWU7IHRoaXMubm9kZS5ldWxlckFuZ2xlcyA9IGNjLnYzKDAsIHksIDApYFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V1bGVyQW5nbGVzLnkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V1bGVyQW5nbGVzLnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHF1YXRlcm5pb24gZnJvbSByb3RhdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXVsZXJBbmdsZXMueCA9PT0gdGhpcy5fZXVsZXJBbmdsZXMueSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJzLmZyb21BbmdsZVoodGhpcy5fdHJzLCAtdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgVHJzLmZyb21FdWxlck51bWJlcih0aGlzLl90cnMsIHRoaXMuX2V1bGVyQW5nbGVzLngsIHZhbHVlLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIGV1bGVyQW5nbGVzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V1bGVyQW5nbGVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRycy50b0V1bGVyKHRoaXMuX2V1bGVyQW5nbGVzLCB0aGlzLl90cnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHNldCAodikge1xuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXVsZXJBbmdsZXMuc2V0KHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFRycy5mcm9tRXVsZXIodGhpcy5fdHJzLCB2KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcbiAgICAgICAgICAgICAgICAhQ0NfTkFUSVZFUkVOREVSRVIgJiYgKHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAvLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgZm9yIE1lc2ggU2tlbGV0b24gQW5pbWF0aW9uXG4gICAgICAgIC8vIFNob3VsZCBiZSByZW1vdmVkIHdoZW4gbm9kZS5yb3RhdGlvbiB1cGdyYWRlIHRvIHF1YXRlcm5pb24gdmFsdWVcbiAgICAgICAgcXVhdDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUXVhdCh0cnNbM10sIHRyc1s0XSwgdHJzWzVdLCB0cnNbNl0pO1xuICAgICAgICAgICAgfSwgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb3RhdGlvbih2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBUaGUgbG9jYWwgc2NhbGUgcmVsYXRpdmUgdG8gdGhlIHBhcmVudC5cbiAgICAgICAgICogISN6aCDoioLngrnnm7jlr7nniLboioLngrnnmoTnvKnmlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuc2NhbGUgPSAxO1xuICAgICAgICAgKi9cbiAgICAgICAgc2NhbGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1s3XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNjYWxlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNjYWxlIG9uIHggYXhpcy5cbiAgICAgICAgICogISN6aCDoioLngrkgWCDovbTnvKnmlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlWFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNjYWxlWCA9IDAuNTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBTY2FsZSBYOiBcIiArIG5vZGUuc2NhbGVYKTtcbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlWDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzddO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJzWzddICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnNbN10gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9TQ0FMRSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTY2FsZSBvbiB5IGF4aXMuXG4gICAgICAgICAqICEjemgg6IqC54K5IFkg6L2057yp5pS+44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVlcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5zY2FsZVkgPSAwLjU7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgU2NhbGUgWTogXCIgKyBub2RlLnNjYWxlWSk7XG4gICAgICAgICAqL1xuICAgICAgICBzY2FsZVk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1s4XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Ryc1s4XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJzWzhdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfU0NBTEUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTQ0FMRV9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2NhbGUgb24geiBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBaIOi9tOe8qeaUvuOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVaXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBzY2FsZVo6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1s5XTtcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cnNbOV0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Ryc1s5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcbiAgICAgICAgICAgICAgICAgICAgIUNDX05BVElWRVJFTkRFUkVSICYmICh0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTQ0FMRV9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTa2V3IHhcbiAgICAgICAgICogISN6aCDor6XoioLngrkgWCDovbTlgL7mlpzop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNrZXdYXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuc2tld1ggPSAwO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFNrZXdYOiBcIiArIG5vZGUuc2tld1gpO1xuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjFcbiAgICAgICAgICovXG4gICAgICAgIHNrZXdYOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9za2V3WDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3NrZXdXYXJuKHZhbHVlLCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NrZXdYID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLlNLRVcpO1xuICAgICAgICAgICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlU2tldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTa2V3IHlcbiAgICAgICAgICogISN6aCDor6XoioLngrkgWSDovbTlgL7mlpzop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNrZXdZXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuc2tld1kgPSAwO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFNrZXdZOiBcIiArIG5vZGUuc2tld1kpO1xuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjFcbiAgICAgICAgICovXG4gICAgICAgIHNrZXdZOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9za2V3WTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgX3NrZXdXYXJuKHZhbHVlLCB0aGlzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NrZXdZID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLlNLRVcpO1xuICAgICAgICAgICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlU2tldygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBPcGFjaXR5IG9mIG5vZGUsIGRlZmF1bHQgdmFsdWUgaXMgMjU1LlxuICAgICAgICAgKiAhI3poIOiKgueCuemAj+aYjuW6pu+8jOm7mOiupOWAvOS4uiAyNTXjgIJcbiAgICAgICAgICogQHByb3BlcnR5IG9wYWNpdHlcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgKi9cbiAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fb3BhY2l0eTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjYy5taXNjLmNsYW1wZih2YWx1ZSwgMCwgMjU1KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3BhY2l0eSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm94eS51cGRhdGVPcGFjaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfT1BBQ0lUWV9DT0xPUjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmFuZ2U6IFswLCAyNTVdXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQ29sb3Igb2Ygbm9kZSwgZGVmYXVsdCB2YWx1ZSBpcyB3aGl0ZTogKDI1NSwgMjU1LCAyNTUpLlxuICAgICAgICAgKiAhI3poIOiKgueCueminOiJsuOAgum7mOiupOS4uueZveiJsu+8jOaVsOWAvOS4uu+8mu+8iDI1Ne+8jDI1Ne+8jDI1Ne+8ieOAglxuICAgICAgICAgKiBAcHJvcGVydHkgY29sb3JcbiAgICAgICAgICogQHR5cGUge0NvbG9yfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICAgKi9cbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yLmNsb25lKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9jb2xvci5lcXVhbHModmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yLnNldCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19ERVYgJiYgdmFsdWUuYSAhPT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTYyNik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DT0xPUjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgQ09MT1JfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBBbmNob3IgcG9pbnQncyBwb3NpdGlvbiBvbiB4IGF4aXMuXG4gICAgICAgICAqICEjemgg6IqC54K5IFgg6L206ZSa54K55L2N572u44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbmNob3JYXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuYW5jaG9yWCA9IDA7XG4gICAgICAgICAqL1xuICAgICAgICBhbmNob3JYOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbmNob3JQb2ludC54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5jaG9yUG9pbnQgPSB0aGlzLl9hbmNob3JQb2ludDtcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yUG9pbnQueCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yUG9pbnQueCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgQU5DSE9SX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQW5jaG9yIHBvaW50J3MgcG9zaXRpb24gb24geSBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBZIOi9tOmUmueCueS9jee9ruOAglxuICAgICAgICAgKiBAcHJvcGVydHkgYW5jaG9yWVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmFuY2hvclkgPSAwO1xuICAgICAgICAgKi9cbiAgICAgICAgYW5jaG9yWToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yUG9pbnQueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFuY2hvclBvaW50ID0gdGhpcy5fYW5jaG9yUG9pbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvclBvaW50LnkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvclBvaW50LnkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFdpZHRoIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K55a695bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLndpZHRoID0gMTAwO1xuICAgICAgICAgKi9cbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjbG9uZSA9IGNjLnNpemUodGhpcy5fY29udGVudFNpemUud2lkdGgsIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29udGVudFNpemUud2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNJWkVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgY2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBIZWlnaHQgb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDoioLngrnpq5jluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmhlaWdodCA9IDEwMDtcbiAgICAgICAgICovXG4gICAgICAgIGhlaWdodDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBjYy5zaXplKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoLCB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0laRV9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VELCBjbG9uZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHpJbmRleCBpcyB0aGUgJ2tleScgdXNlZCB0byBzb3J0IHRoZSBub2RlIHJlbGF0aXZlIHRvIGl0cyBzaWJsaW5ncy48YnIvPlxuICAgICAgICAgKiBUaGUgdmFsdWUgb2YgekluZGV4IHNob3VsZCBiZSBpbiB0aGUgcmFuZ2UgYmV0d2VlbiBjYy5tYWNyby5NSU5fWklOREVYIGFuZCBjYy5tYWNyby5NQVhfWklOREVYLjxici8+XG4gICAgICAgICAqIFRoZSBOb2RlJ3MgcGFyZW50IHdpbGwgc29ydCBhbGwgaXRzIGNoaWxkcmVuIGJhc2VkIG9uIHRoZSB6SW5kZXggdmFsdWUgYW5kIHRoZSBhcnJpdmFsIG9yZGVyLjxici8+XG4gICAgICAgICAqIE5vZGVzIHdpdGggZ3JlYXRlciB6SW5kZXggd2lsbCBiZSBzb3J0ZWQgYWZ0ZXIgbm9kZXMgd2l0aCBzbWFsbGVyIHpJbmRleC48YnIvPlxuICAgICAgICAgKiBJZiB0d28gbm9kZXMgaGF2ZSB0aGUgc2FtZSB6SW5kZXgsIHRoZW4gdGhlIG5vZGUgdGhhdCB3YXMgYWRkZWQgZmlyc3QgdG8gdGhlIGNoaWxkcmVuJ3MgYXJyYXkgd2lsbCBiZSBpbiBmcm9udCBvZiB0aGUgb3RoZXIgbm9kZSBpbiB0aGUgYXJyYXkuPGJyLz5cbiAgICAgICAgICogTm9kZSdzIG9yZGVyIGluIGNoaWxkcmVuIGxpc3Qgd2lsbCBhZmZlY3QgaXRzIHJlbmRlcmluZyBvcmRlci4gUGFyZW50IGlzIGFsd2F5cyByZW5kZXJpbmcgYmVmb3JlIGFsbCBjaGlsZHJlbi5cbiAgICAgICAgICogISN6aCB6SW5kZXgg5piv55So5p2l5a+56IqC54K56L+b6KGM5o6S5bqP55qE5YWz6ZSu5bGe5oCn77yM5a6D5Yaz5a6a5LiA5Liq6IqC54K55Zyo5YWE5byf6IqC54K55LmL6Ze055qE5L2N572u44CCPGJyLz5cbiAgICAgICAgICogekluZGV4IOeahOWPluWAvOW6lOivpeS7i+S6jiBjYy5tYWNyby5NSU5fWklOREVYIOWSjCBjYy5tYWNyby5NQVhfWklOREVYIOS5i+mXtFxuICAgICAgICAgKiDniLboioLngrnkuLvopoHmoLnmja7oioLngrnnmoQgekluZGV4IOWSjOa3u+WKoOasoeW6j+adpeaOkuW6j++8jOaLpeacieabtOmrmCB6SW5kZXgg55qE6IqC54K55bCG6KKr5o6S5Zyo5ZCO6Z2i77yM5aaC5p6c5Lik5Liq6IqC54K555qEIHpJbmRleCDkuIDoh7TvvIzlhYjmt7vliqDnmoToioLngrnkvJrnqLPlrprmjpLlnKjlj6bkuIDkuKroioLngrnkuYvliY3jgII8YnIvPlxuICAgICAgICAgKiDoioLngrnlnKggY2hpbGRyZW4g5Lit55qE6aG65bqP5Yaz5a6a5LqG5YW25riy5p+T6aG65bqP44CC54i26IqC54K55rC46L+c5Zyo5omA5pyJ5a2Q6IqC54K55LmL5YmN6KKr5riy5p+TXG4gICAgICAgICAqIEBwcm9wZXJ0eSB6SW5kZXhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS56SW5kZXggPSAxO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIHpJbmRleDogXCIgKyBub2RlLnpJbmRleCk7XG4gICAgICAgICAqL1xuICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsWk9yZGVyID4+IDE2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiBtYWNyby5NQVhfWklOREVYKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNjM2KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtYWNyby5NQVhfWklOREVYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA8IG1hY3JvLk1JTl9aSU5ERVgpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDE2MzcpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG1hY3JvLk1JTl9aSU5ERVg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuekluZGV4ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9ICh0aGlzLl9sb2NhbFpPcmRlciAmIDB4MDAwMGZmZmYpIHwgKHZhbHVlIDw8IDE2KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSUJMSU5HX09SREVSX0NIQU5HRUQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uU2libGluZ0luZGV4Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBTd2l0Y2ggMkQvM0Qgbm9kZS4gVGhlIDJEIG5vZGVzIHdpbGwgcnVuIGZhc3Rlci5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDliIfmjaIgMkQvM0Qg6IqC54K577yMMkQg6IqC54K55Lya5pyJ5pu06auY55qE6L+Q6KGM5pWI546HXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaXMzRE5vZGVcbiAgICAgICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgICAgKi9cbiAgICAgICAgaXMzRE5vZGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2lzM0ROb2RlO1xuICAgICAgICAgICAgfSwgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXMzRE5vZGUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZTNERnVuY3Rpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSZXR1cm5zIGEgbm9ybWFsaXplZCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB1cCBkaXJlY3Rpb24gKFkgYXhpcykgb2YgdGhlIG5vZGUgaW4gd29ybGQgc3BhY2UuXG4gICAgICAgICAqICEjemgg6I635Y+W6IqC54K55q2j5LiK5pa577yIeSDovbTvvInpnaLlr7nnmoTmlrnlkJHvvIzov5Tlm57lgLzkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTlvZLkuIDljJblkJHph49cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwcm9wZXJ0eSB1cFxuICAgICAgICAgKiBAdHlwZSB7VmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHVwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdXAgPSBWZWMzLnRyYW5zZm9ybVF1YXQoX3VyZlZlYzMsIFZlYzMuVVAsIHRoaXMuZ2V0V29ybGRSb3RhdGlvbihfdXJmUXVhdCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfdXAuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSZXR1cm5zIGEgbm9ybWFsaXplZCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSByaWdodCBkaXJlY3Rpb24gKFggYXhpcykgb2YgdGhlIG5vZGUgaW4gd29ybGQgc3BhY2UuXG4gICAgICAgICAqICEjemgg6I635Y+W6IqC54K55q2j5Y+z5pa577yIeCDovbTvvInpnaLlr7nnmoTmlrnlkJHvvIzov5Tlm57lgLzkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTlvZLkuIDljJblkJHph49cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwcm9wZXJ0eSByaWdodFxuICAgICAgICAgKiBAdHlwZSB7VmVjM31cbiAgICAgICAgICovXG4gICAgICAgIHJpZ2h0OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHZhciBfcmlnaHQgPSBWZWMzLnRyYW5zZm9ybVF1YXQoX3VyZlZlYzMsIFZlYzMuUklHSFQsIHRoaXMuZ2V0V29ybGRSb3RhdGlvbihfdXJmUXVhdCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmlnaHQuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSZXR1cm5zIGEgbm9ybWFsaXplZCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBmb3J3YXJkIGRpcmVjdGlvbiAoWiBheGlzKSBvZiB0aGUgbm9kZSBpbiB3b3JsZCBzcGFjZS5cbiAgICAgICAgICogISN6aCDojrflj5boioLngrnmraPliY3mlrnvvIh6IOi9tO+8iemdouWvueeahOaWueWQke+8jOi/lOWbnuWAvOS4uuS4lueVjOWdkOagh+ezu+S4i+eahOW9kuS4gOWMluWQkemHj1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHByb3BlcnR5IGZvcndhcmRcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICBmb3J3YXJkOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHZhciBfZm9yd2FyZCA9IFZlYzMudHJhbnNmb3JtUXVhdChfdXJmVmVjMywgVmVjMy5GT1JXQVJELCB0aGlzLmdldFdvcmxkUm90YXRpb24oX3VyZlF1YXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2ZvcndhcmQuY2xvbmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV1cbiAgICAgKi9cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcmVvcmRlckNoaWxkRGlydHkgPSBmYWxzZTtcblxuICAgICAgICAvLyBjYWNoZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5fd2lkZ2V0ID0gbnVsbDtcbiAgICAgICAgLy8gZmFzdCByZW5kZXIgY29tcG9uZW50IGFjY2Vzc1xuICAgICAgICB0aGlzLl9yZW5kZXJDb21wb25lbnQgPSBudWxsO1xuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICAvLyBUb3VjaCBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgLy8gTW91c2UgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5faW5pdERhdGFGcm9tUG9vbCgpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50TWFzayA9IDA7XG4gICAgICAgIHRoaXMuX2N1bGxpbmdNYXNrID0gMTtcbiAgICAgICAgdGhpcy5fY2hpbGRBcnJpdmFsT3JkZXIgPSAxO1xuXG4gICAgICAgIC8vIFByb3h5XG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ID0gbmV3IHJlbmRlcmVyLk5vZGVQcm94eSh0aGlzLl9zcGFjZUluZm8udW5pdElELCB0aGlzLl9zcGFjZUluZm8uaW5kZXgsIHRoaXMuX2lkLCB0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5LmluaXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHJlc2V0IF9yZW5kZXJGbGFnIGZvciBib3RoIHdlYiBhbmQgbmF0aXZlXG4gICAgICAgIHRoaXMuX3JlbmRlckZsYWcgPSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNIHwgUmVuZGVyRmxvdy5GTEFHX09QQUNJVFlfQ09MT1I7XG4gICAgfSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgRXZlbnRUeXBlLFxuICAgICAgICBfTG9jYWxEaXJ0eUZsYWc6IExvY2FsRGlydHlGbGFnLFxuICAgICAgICAvLyBpcyBub2RlIGJ1dCBub3Qgc2NlbmVcbiAgICAgICAgaXNOb2RlIChvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBOb2RlICYmIChvYmouY29uc3RydWN0b3IgPT09IE5vZGUgfHwgIShvYmogaW5zdGFuY2VvZiBjYy5TY2VuZSkpO1xuICAgICAgICB9LFxuICAgICAgICBCdWlsdGluR3JvdXBJbmRleFxuICAgIH0sXG5cbiAgICAvLyBPVkVSUklERVNcblxuICAgIF9vblNpYmxpbmdJbmRleENoYW5nZWQgKCkge1xuICAgICAgICAvLyB1cGRhdGUgcmVuZGVyaW5nIHNjZW5lIGdyYXBoLCBzb3J0IHRoZW0gYnkgYXJyaXZhbE9yZGVyXG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5fZGVsYXlTb3J0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uUHJlRGVzdHJveSAoKSB7XG4gICAgICAgIHZhciBkZXN0cm95QnlQYXJlbnQgPSB0aGlzLl9vblByZURlc3Ryb3lCYXNlKCk7XG5cbiAgICAgICAgLy8gQWN0aW9uc1xuICAgICAgICBpZiAoQWN0aW9uTWFuYWdlckV4aXN0KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgTm9kZS5jdXJyZW50SG92ZXJlZFxuICAgICAgICBpZiAoX2N1cnJlbnRIb3ZlcmVkID09PSB0aGlzKSB7XG4gICAgICAgICAgICBfY3VycmVudEhvdmVyZWQgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgJiYgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy5jbGVhcigpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciB8fCB0aGlzLl9tb3VzZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fcHJveHkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmFja0RhdGFJbnRvUG9vbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX19mYXN0T2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5zb3J0QWxsQ2hpbGRyZW4sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkZXN0cm95QnlQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIHNvbWUgZGVzdHJ1Y3QgbG9naWMgdG8gbWFrZSB1bmRvIHN5c3RlbSB3b3JrIGNvcnJlY3RseVxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGlzIG5vZGUgY2FuIHJlYXR0YWNoIHRvIHNjZW5lIGJ5IHVuZG8gc3lzdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25Qb3N0QWN0aXZhdGVkIChhY3RpdmUpIHtcbiAgICAgICAgdmFyIGFjdGlvbk1hbmFnZXIgPSBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkgOiBudWxsO1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRyYW5zZm9ybVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNO1xuICAgICAgICAgICAgLy8gQWN0aW9uTWFuYWdlciAmIEV2ZW50TWFuYWdlclxuICAgICAgICAgICAgYWN0aW9uTWFuYWdlciAmJiBhY3Rpb25NYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICAvLyBTZWFyY2ggTWFzayBpbiBwYXJlbnRcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXJNYXNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWFjdGl2YXRlXG4gICAgICAgICAgICBhY3Rpb25NYW5hZ2VyICYmIGFjdGlvbk1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uSGllcmFyY2h5Q2hhbmdlZCAob2xkUGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCk7XG4gICAgICAgIC8vIEZpeGVkIGEgYnVnIHdoZXJlIGNoaWxkcmVuIGFuZCBwYXJlbnQgbm9kZSBncm91cHMgd2VyZSBmb3JjZWQgdG8gc3luY2hyb25pemUsIGluc3RlYWQgb2Ygb25seSBzeW5jaHJvbml6aW5nIGBfY3VsbGluZ01hc2tgIHZhbHVlXG4gICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9kZWxheVNvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19XT1JMRF9UUkFOU0ZPUk07XG4gICAgICAgIHRoaXMuX29uSGllcmFyY2h5Q2hhbmdlZEJhc2Uob2xkUGFyZW50KTtcbiAgICAgICAgaWYgKGNjLl93aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBjYy5fd2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRQYXJlbnQgJiYgdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIC8vVE9ETzogSXQgbWF5IGJlIG5lY2Vzc2FyeSB0byB1cGRhdGUgdGhlIGxpc3RlbmVyIG1hc2sgb2YgYWxsIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgdGhpcy5fY2hlY2tMaXN0ZW5lck1hc2soKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gTm9kZSBwcm94eVxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eS51cGRhdGVQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJTlRFUk5BTFxuXG4gICAgX3VwZGF0ZTNERnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXMzRE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4ID0gdXBkYXRlTG9jYWxNYXRyaXgzRDtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bFdvcmxkTWF0cml4ID0gY2FsY3VsV29ybGRNYXRyaXgzRDtcbiAgICAgICAgICAgIHRoaXMuX211bE1hdCA9IG11bE1hdDNEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXggPSB1cGRhdGVMb2NhbE1hdHJpeDJEO1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsV29ybGRNYXRyaXggPSBjYWxjdWxXb3JsZE1hdHJpeDJEO1xuICAgICAgICAgICAgdGhpcy5fbXVsTWF0ID0gbXVsTWF0MkQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlckNvbXBvbmVudCAmJiB0aGlzLl9yZW5kZXJDb21wb25lbnQuX29uM0ROb2RlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQ29tcG9uZW50Ll9vbjNETm9kZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgPSBMb2NhbERpcnR5RmxhZy5BTEw7XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlM0ROb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXREYXRhRnJvbVBvb2wgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NwYWNlSW5mbykge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICB0cnM6IG5ldyBGbG9hdDY0QXJyYXkoMTApLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbE1hdDogbmV3IEZsb2F0NjRBcnJheSgxNiksXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkTWF0OiBuZXcgRmxvYXQ2NEFycmF5KDE2KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGFjZUluZm8gPSBub2RlTWVtUG9vbC5wb3AoKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFjZUluZm8gPSB0aGlzLl9zcGFjZUluZm87XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IGNjLm1hdDQoc3BhY2VJbmZvLmxvY2FsTWF0KTtcbiAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl9tYXRyaXgpO1xuICAgICAgICB0aGlzLl93b3JsZE1hdHJpeCA9IGNjLm1hdDQoc3BhY2VJbmZvLndvcmxkTWF0KTtcbiAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgPSBMb2NhbERpcnR5RmxhZy5BTEw7XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuXG4gICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnMgPSBzcGFjZUluZm8udHJzO1xuICAgICAgICB0cnNbMF0gPSAwOyAvLyBwb3NpdGlvbi54XG4gICAgICAgIHRyc1sxXSA9IDA7IC8vIHBvc2l0aW9uLnlcbiAgICAgICAgdHJzWzJdID0gMDsgLy8gcG9zaXRpb24uelxuICAgICAgICB0cnNbM10gPSAwOyAvLyByb3RhdGlvbi54XG4gICAgICAgIHRyc1s0XSA9IDA7IC8vIHJvdGF0aW9uLnlcbiAgICAgICAgdHJzWzVdID0gMDsgLy8gcm90YXRpb24uelxuICAgICAgICB0cnNbNl0gPSAxOyAvLyByb3RhdGlvbi53XG4gICAgICAgIHRyc1s3XSA9IDE7IC8vIHNjYWxlLnhcbiAgICAgICAgdHJzWzhdID0gMTsgLy8gc2NhbGUueVxuICAgICAgICB0cnNbOV0gPSAxOyAvLyBzY2FsZS56XG4gICAgfSxcblxuICAgIF9iYWNrRGF0YUludG9Qb29sICgpIHtcbiAgICAgICAgaWYgKCEoQ0NfRURJVE9SIHx8IENDX1RFU1QpKSB7XG4gICAgICAgICAgICAvLyBwdXNoIGJhY2sgdG8gcG9vbFxuICAgICAgICAgICAgbm9kZU1lbVBvb2wucHVzaCh0aGlzLl9zcGFjZUluZm8pO1xuICAgICAgICAgICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkTWF0cml4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3RycyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zcGFjZUluZm8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF90b0V1bGVyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXMzRE5vZGUpIHtcbiAgICAgICAgICAgIFRycy50b0V1bGVyKHRoaXMuX2V1bGVyQW5nbGVzLCB0aGlzLl90cnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHogPSBNYXRoLmFzaW4odGhpcy5fdHJzWzVdKSAvIE9ORV9ERUdSRUUgKiAyO1xuICAgICAgICAgICAgVmVjMy5zZXQodGhpcy5fZXVsZXJBbmdsZXMsIDAsIDAsIHopO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mcm9tRXVsZXIgKCkge1xuICAgICAgICBpZiAodGhpcy5pczNETm9kZSkge1xuICAgICAgICAgICAgVHJzLmZyb21FdWxlcih0aGlzLl90cnMsIHRoaXMuX2V1bGVyQW5nbGVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFRycy5mcm9tQW5nbGVaKHRoaXMuX3RycywgdGhpcy5fZXVsZXJBbmdsZXMueik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZ3JhZGVfMXhfdG9fMnggKCkge1xuICAgICAgICBpZiAodGhpcy5faXMzRE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZTNERnVuY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIGlmICh0cnMpIHtcbiAgICAgICAgICAgIGxldCBkZXNUcnMgPSB0cnM7XG4gICAgICAgICAgICB0cnMgPSB0aGlzLl90cnMgPSB0aGlzLl9zcGFjZUluZm8udHJzO1xuICAgICAgICAgICAgLy8ganVzdCBhZGFwdCB0byBvbGQgdHJzXG4gICAgICAgICAgICBpZiAoZGVzVHJzLmxlbmd0aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB0cnMuc2V0KGRlc1Rycy5zdWJhcnJheSgxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRycy5zZXQoZGVzVHJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRycyA9IHRoaXMuX3RycyA9IHRoaXMuX3NwYWNlSW5mby50cnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fekluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsWk9yZGVyID0gdGhpcy5fekluZGV4IDw8IDE2O1xuICAgICAgICAgICAgdGhpcy5fekluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NrZXdYICE9PSAwIHx8IHRoaXMuX3NrZXdZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUuc2tld1gvWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjEsIHBsZWFzZSB1c2UgM0Qgbm9kZSBpbnN0ZWFkLlwiLCBgTm9kZTogJHtOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgodGhpcyl9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJvbUV1bGVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsWk9yZGVyICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl96SW5kZXggPSAodGhpcy5fbG9jYWxaT3JkZXIgJiAweGZmZmYwMDAwKSA+PiAxNjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZ3JhZGUgZnJvbSAyLjAuMCBwcmV2aWV3IDQgJiBlYXJsaWVyIHZlcnNpb25zXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciBmaW5hbCB2ZXJzaW9uXG4gICAgICAgIGlmICh0aGlzLl9jb2xvci5hIDwgMjU1ICYmIHRoaXMuX29wYWNpdHkgPT09IDI1NSkge1xuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHRoaXMuX2NvbG9yLmE7XG4gICAgICAgICAgICB0aGlzLl9jb2xvci5hID0gMjU1O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNIHwgUmVuZGVyRmxvdy5GTEFHX09QQUNJVFlfQ09MT1I7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBUaGUgaW5pdGlhbGl6ZXIgZm9yIE5vZGUgd2hpY2ggd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGFsbCBjb21wb25lbnRzIG9uTG9hZFxuICAgICAqL1xuICAgIF9vbkJhdGNoQ3JlYXRlZCAoKSB7XG4gICAgICAgIGxldCBwcmVmYWJJbmZvID0gdGhpcy5fcHJlZmFiO1xuICAgICAgICBpZiAocHJlZmFiSW5mbyAmJiBwcmVmYWJJbmZvLnN5bmMgJiYgcHJlZmFiSW5mby5yb290ID09PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyAtIHJlbW92ZSBhbGwgdXNhZ2Ugb2YgX3N5bmNlZFxuICAgICAgICAgICAgICAgIGNjLmFzc2VydCghcHJlZmFiSW5mby5fc3luY2VkLCAncHJlZmFiIHNob3VsZCBub3Qgc3luY2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcmVmYWJIZWxwZXIuc3luY1dpdGhQcmVmYWIodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGdyYWRlXzF4X3RvXzJ4KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlT3JkZXJPZkFycml2YWwoKTtcblxuICAgICAgICAvLyBGaXhlZCBhIGJ1ZyB3aGVyZSBjaGlsZHJlbiBhbmQgcGFyZW50IG5vZGUgZ3JvdXBzIHdlcmUgZm9yY2VkIHRvIHN5bmNocm9uaXplLCBpbnN0ZWFkIG9mIG9ubHkgc3luY2hyb25pemluZyBgX2N1bGxpbmdNYXNrYCB2YWx1ZVxuICAgICAgICB0aGlzLl9jdWxsaW5nTWFzayA9IDEgPDwgX2dldEFjdHVhbEdyb3VwSW5kZXgodGhpcyk7XG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ICYmIHRoaXMuX3Byb3h5LnVwZGF0ZUN1bGxpbmdNYXNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAvLyBkZWFjdGl2YXRlIEFjdGlvbk1hbmFnZXIgYW5kIEV2ZW50TWFuYWdlciBieSBkZWZhdWx0XG4gICAgICAgICAgICBpZiAoQWN0aW9uTWFuYWdlckV4aXN0KSB7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnBhdXNlVGFyZ2V0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnBhdXNlVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW5baV0uX29uQmF0Y2hDcmVhdGVkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfQ0hJTERSRU47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eS5pbml0TmF0aXZlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdGhlIHNhbWUgYXMgX29uQmF0Y2hDcmVhdGVkIGJ1dCB1bnRvdWNoIHByZWZhYlxuICAgIF9vbkJhdGNoUmVzdG9yZWQgKCkge1xuICAgICAgICB0aGlzLl91cGdyYWRlXzF4X3RvXzJ4KCk7XG5cbiAgICAgICAgLy8gRml4ZWQgYSBidWcgd2hlcmUgY2hpbGRyZW4gYW5kIHBhcmVudCBub2RlIGdyb3VwcyB3ZXJlIGZvcmNlZCB0byBzeW5jaHJvbml6ZSwgaW5zdGVhZCBvZiBvbmx5IHN5bmNocm9uaXppbmcgYF9jdWxsaW5nTWFza2AgdmFsdWVcbiAgICAgICAgdGhpcy5fY3VsbGluZ01hc2sgPSAxIDw8IF9nZXRBY3R1YWxHcm91cEluZGV4KHRoaXMpO1xuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eSAmJiB0aGlzLl9wcm94eS51cGRhdGVDdWxsaW5nTWFzaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgLy8gZGVhY3RpdmF0ZSBBY3Rpb25NYW5hZ2VyIGFuZCBFdmVudE1hbmFnZXIgYnkgZGVmYXVsdFxuXG4gICAgICAgICAgICAvLyBBY3Rpb25NYW5hZ2VyIG1heSBub3QgYmUgaW5pdGVkIGluIHRoZSBlZGl0b3Igd29ya2VyLlxuICAgICAgICAgICAgbGV0IG1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCk7XG4gICAgICAgICAgICBtYW5hZ2VyICYmIG1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG5cbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLl9vbkJhdGNoUmVzdG9yZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5LmluaXROYXRpdmUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBFVkVOVCBUQVJHRVRcbiAgICBfY2hlY2tMaXN0ZW5lck1hc2sgKCkge1xuICAgICAgICAvLyBCZWNhdXNlIE1hc2sgbWF5IGJlIG5lc3RlZCwgbmVlZCB0byBmaW5kIGFsbCB0aGUgTWFzayBjb21wb25lbnRzIGluIHRoZSBwYXJlbnQgbm9kZS4gXG4gICAgICAgIC8vIFRoZSBjbGljayBhcmVhIG11c3Qgc2F0aXNmeSBhbGwgTWFza3MgdG8gdHJpZ2dlciB0aGUgY2xpY2suXG4gICAgICAgIGlmICh0aGlzLl90b3VjaExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgbWFzayA9IHRoaXMuX3RvdWNoTGlzdGVuZXIubWFzayA9IF9zZWFyY2hDb21wb25lbnRzSW5QYXJlbnQodGhpcywgY2MuTWFzayk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIubWFzayA9IG1hc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lci5tYXNrID0gX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfY2hlY2tuU2V0dXBTeXNFdmVudCAodHlwZSkge1xuICAgICAgICBsZXQgbmV3QWRkZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGZvckRpc3BhdGNoID0gZmFsc2U7XG4gICAgICAgIGlmIChfdG91Y2hFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fdG91Y2hMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLlRPVUNIX09ORV9CWV9PTkUsXG4gICAgICAgICAgICAgICAgICAgIHN3YWxsb3dUb3VjaGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKSxcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEJlZ2FuOiBfdG91Y2hTdGFydEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlZDogX3RvdWNoTW92ZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uVG91Y2hFbmRlZDogX3RvdWNoRW5kSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaENhbmNlbGxlZDogX3RvdWNoQ2FuY2VsSGFuZGxlclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih0aGlzLl90b3VjaExpc3RlbmVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBuZXdBZGRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JEaXNwYXRjaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX21vdXNlRXZlbnRzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyID0gY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUoe1xuICAgICAgICAgICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5NT1VTRSxcbiAgICAgICAgICAgICAgICAgICAgX3ByZXZpb3VzSW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBvd25lcjogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKSxcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd246IF9tb3VzZURvd25IYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlTW92ZTogX21vdXNlTW92ZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VVcDogX21vdXNlVXBIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlU2Nyb2xsOiBfbW91c2VXaGVlbEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG5ld0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvckRpc3BhdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3QWRkZWQgJiYgIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcywgMCwgMCwgMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JEaXNwYXRjaDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlZ2lzdGVyIGEgY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIE5vZGUuPGJyLz5cbiAgICAgKiBVc2UgdGhpcyBtZXRob2QgdG8gcmVnaXN0ZXIgdG91Y2ggb3IgbW91c2UgZXZlbnQgcGVybWl0IHByb3BhZ2F0aW9uIGJhc2VkIG9uIHNjZW5lIGdyYXBoLDxici8+XG4gICAgICogVGhlc2Uga2luZHMgb2YgZXZlbnQgYXJlIHRyaWdnZXJlZCB3aXRoIGRpc3BhdGNoRXZlbnQsIHRoZSBkaXNwYXRjaCBwcm9jZXNzIGhhcyB0aHJlZSBzdGVwczo8YnIvPlxuICAgICAqIDEuIENhcHR1cmluZyBwaGFzZTogZGlzcGF0Y2ggaW4gY2FwdHVyZSB0YXJnZXRzIChgX2dldENhcHR1cmluZ1RhcmdldHNgKSwgZS5nLiBwYXJlbnRzIGluIG5vZGUgdHJlZSwgZnJvbSByb290IHRvIHRoZSByZWFsIHRhcmdldDxici8+XG4gICAgICogMi4gQXQgdGFyZ2V0IHBoYXNlOiBkaXNwYXRjaCB0byB0aGUgbGlzdGVuZXJzIG9mIHRoZSByZWFsIHRhcmdldDxici8+XG4gICAgICogMy4gQnViYmxpbmcgcGhhc2U6IGRpc3BhdGNoIGluIGJ1YmJsZSB0YXJnZXRzIChgX2dldEJ1YmJsaW5nVGFyZ2V0c2ApLCBlLmcuIHBhcmVudHMgaW4gbm9kZSB0cmVlLCBmcm9tIHRoZSByZWFsIHRhcmdldCB0byByb290PGJyLz5cbiAgICAgKiBJbiBhbnkgbW9tZW50IG9mIHRoZSBkaXNwYXRjaGluZyBwcm9jZXNzLCBpdCBjYW4gYmUgc3RvcHBlZCB2aWEgYGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpYCBvciBgZXZlbnQuc3RvcFByb3BhZ2F0aW9uSW1taWRpYXRlKClgLjxici8+XG4gICAgICogSXQncyB0aGUgcmVjb21tZW5kZWQgd2F5IHRvIHJlZ2lzdGVyIHRvdWNoL21vdXNlIGV2ZW50IGZvciBOb2RlLDxici8+XG4gICAgICogcGxlYXNlIGRvIG5vdCB1c2UgY2MuZXZlbnRNYW5hZ2VyIGRpcmVjdGx5IGZvciBOb2RlLjxici8+XG4gICAgICogWW91IGNhbiBhbHNvIHJlZ2lzdGVyIGN1c3RvbSBldmVudCBhbmQgdXNlIGBlbWl0YCB0byB0cmlnZ2VyIGN1c3RvbSBldmVudCBvbiBOb2RlLjxici8+XG4gICAgICogRm9yIHN1Y2ggZXZlbnRzLCB0aGVyZSB3b24ndCBiZSBjYXB0dXJpbmcgYW5kIGJ1YmJsaW5nIHBoYXNlLCB5b3VyIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCBkaXJlY3RseSB0byBpdHMgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgb24gdGhlIHNhbWUgbm9kZS48YnIvPlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGV2ZW50IGNhbGxiYWNrIHBhcmFtZXRlcnMgd2l0aCBgZW1pdGAgYnkgcGFzc2luZyBwYXJhbWV0ZXJzIGFmdGVyIGB0eXBlYC5cbiAgICAgKiAhI3poXG4gICAgICog5Zyo6IqC54K55LiK5rOo5YaM5oyH5a6a57G75Z6L55qE5Zue6LCD5Ye95pWw77yM5Lmf5Y+v5Lul6K6+572uIHRhcmdldCDnlKjkuo7nu5Hlrprlk43lupTlh73mlbDnmoQgdGhpcyDlr7nosaHjgII8YnIvPlxuICAgICAqIOm8oOagh+aIluinpuaRuOS6i+S7tuS8muiiq+ezu+e7n+iwg+eUqCBkaXNwYXRjaEV2ZW50IOaWueazleinpuWPke+8jOinpuWPkeeahOi/h+eoi+WMheWQq+S4ieS4qumYtuaute+8mjxici8+XG4gICAgICogMS4g5o2V6I636Zi25q6177ya5rS+5Y+R5LqL5Lu257uZ5o2V6I6355uu5qCH77yI6YCa6L+HIGBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c2Ag6I635Y+W77yJ77yM5q+U5aaC77yM6IqC54K55qCR5Lit5rOo5YaM5LqG5o2V6I636Zi25q6155qE54i26IqC54K577yM5LuO5qC56IqC54K55byA5aeL5rS+5Y+R55u05Yiw55uu5qCH6IqC54K544CCPGJyLz5cbiAgICAgKiAyLiDnm67moIfpmLbmrrXvvJrmtL7lj5Hnu5nnm67moIfoioLngrnnmoTnm5HlkKzlmajjgII8YnIvPlxuICAgICAqIDMuIOWGkuazoemYtuaute+8mua0vuWPkeS6i+S7tue7meWGkuazoeebruagh++8iOmAmui/hyBgX2dldEJ1YmJsaW5nVGFyZ2V0c2Ag6I635Y+W77yJ77yM5q+U5aaC77yM6IqC54K55qCR5Lit5rOo5YaM5LqG5YaS5rOh6Zi25q6155qE54i26IqC54K577yM5LuO55uu5qCH6IqC54K55byA5aeL5rS+5Y+R55u05Yiw5qC56IqC54K544CCPGJyLz5cbiAgICAgKiDlkIzml7bmgqjlj6/ku6XlsIbkuovku7bmtL7lj5HliLDniLboioLngrnmiJbogIXpgJrov4fosIPnlKggc3RvcFByb3BhZ2F0aW9uIOaLpuaIquWug+OAgjxici8+XG4gICAgICog5o6o6I2Q5L2/55So6L+Z56eN5pa55byP5p2l55uR5ZCs6IqC54K55LiK55qE6Kem5pG45oiW6byg5qCH5LqL5Lu277yM6K+35LiN6KaB5Zyo6IqC54K55LiK55u05o6l5L2/55SoIGNjLmV2ZW50TWFuYWdlcuOAgjxici8+XG4gICAgICog5L2g5Lmf5Y+v5Lul5rOo5YaM6Ieq5a6a5LmJ5LqL5Lu25Yiw6IqC54K55LiK77yM5bm26YCa6L+HIGVtaXQg5pa55rOV6Kem5Y+R5q2k57G75LqL5Lu277yM5a+55LqO6L+Z57G75LqL5Lu277yM5LiN5Lya5Y+R55Sf5o2V6I635YaS5rOh6Zi25q6177yM5Y+q5Lya55u05o6l5rS+5Y+R57uZ5rOo5YaM5Zyo6K+l6IqC54K55LiK55qE55uR5ZCs5ZmoPGJyLz5cbiAgICAgKiDkvaDlj6/ku6XpgJrov4flnKggZW1pdCDmlrnms5XosIPnlKjml7blnKggdHlwZSDkuYvlkI7kvKDpgJLpop3lpJbnmoTlj4LmlbDkvZzkuLrkuovku7blm57osIPnmoTlj4LmlbDliJfooahcbiAgICAgKiBAbWV0aG9kIG9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd8Tm9kZS5FdmVudFR5cGV9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci48YnI+U2VlIHt7I2Nyb3NzTGluayBcIk5vZGUvRXZlbnRUeXVwZS9QT1NJVElPTl9DSEFOR0VEXCJ9fU5vZGUgRXZlbnRze3svY3Jvc3NMaW5rfX0gZm9yIGFsbCBidWlsdGluIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLiBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fGFueX0gW2NhbGxiYWNrLmV2ZW50XSBldmVudCBvciBmaXJzdCBhcmd1bWVudCB3aGVuIGVtaXRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzNdIGFyZzNcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt1c2VDYXB0dXJlPWZhbHNlXSAtIFdoZW4gc2V0IHRvIHRydWUsIHRoZSBsaXN0ZW5lciB3aWxsIGJlIHRyaWdnZXJlZCBhdCBjYXB0dXJpbmcgcGhhc2Ugd2hpY2ggaXMgYWhlYWQgb2YgdGhlIGZpbmFsIHRhcmdldCBlbWl0LCBvdGhlcndpc2UgaXQgd2lsbCBiZSB0cmlnZ2VyZWQgZHVyaW5nIGJ1YmJsaW5nIHBoYXNlLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIEp1c3QgcmV0dXJucyB0aGUgaW5jb21pbmcgY2FsbGJhY2sgc28geW91IGNhbiBzYXZlIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24gZWFzaWVyLlxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogb248VCBleHRlbmRzIEZ1bmN0aW9uPih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBULCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm1lbWJlckZ1bmN0aW9uLCB0aGlzKTsgIC8vIGlmIFwidGhpc1wiIGlzIGNvbXBvbmVudCBhbmQgdGhlIFwibWVtYmVyRnVuY3Rpb25cIiBkZWNsYXJlZCBpbiBDQ0NsYXNzLlxuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKiBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKiBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMLCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqL1xuICAgIG9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIGxldCBmb3JEaXNwYXRjaCA9IHRoaXMuX2NoZWNrblNldHVwU3lzRXZlbnQodHlwZSk7XG4gICAgICAgIGlmIChmb3JEaXNwYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uRGlzcGF0Y2godHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBQT1NJVElPTl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBTQ0FMRV9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBST1RBVElPTl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IFNJWkVfT047XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IEFOQ0hPUl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5DT0xPUl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayB8PSBDT0xPUl9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycyA9IG5ldyBFdmVudFRhcmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZWdpc3RlciBhbiBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gdGhlIE5vZGUsXG4gICAgICogdGhlIGNhbGxiYWNrIHdpbGwgcmVtb3ZlIGl0c2VsZiBhZnRlciB0aGUgZmlyc3QgdGltZSBpdCBpcyB0cmlnZ2VyZWQuXG4gICAgICogISN6aFxuICAgICAqIOazqOWGjOiKgueCueeahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg++8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBvbmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gICAgICogQHBhcmFtIHtFdmVudHxhbnl9IFtjYWxsYmFjay5ldmVudF0gZXZlbnQgb3IgZmlyc3QgYXJndW1lbnQgd2hlbiBlbWl0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcyXSBhcmcyXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XG4gICAgICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc1XSBhcmc1XG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvbmNlPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IFRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUub25jZShjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2spO1xuICAgICAqL1xuICAgIG9uY2UgKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgbGV0IGZvckRpc3BhdGNoID0gdGhpcy5fY2hlY2tuU2V0dXBTeXNFdmVudCh0eXBlKTtcblxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgaWYgKGZvckRpc3BhdGNoICYmIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgfHwgbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0ZW5lcnMub25jZSh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcbiAgICAgICAgbGlzdGVuZXJzLm9uY2UodHlwZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgIH0sIHVuZGVmaW5lZCk7XG4gICAgfSxcblxuICAgIF9vbkRpc3BhdGNoICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIC8vIEFjY2VwdCBhbHNvIHBhdGFtZXRlcnMgbGlrZTogKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKVxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB1c2VDYXB0dXJlID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgdXNlQ2FwdHVyZSA9ICEhdXNlQ2FwdHVyZTtcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCg2ODAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICBpZiAodXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzIHx8IG5ldyBFdmVudFRhcmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpICkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5fX2V2ZW50VGFyZ2V0cy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlcyB0aGUgY2FsbGJhY2sgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCBhbmQgb3IgdXNlQ2FwdHVyZS5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBtZXJlbHkgYW4gYWxpYXMgdG8gcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICAgKiAhI3poIOWIoOmZpOS5i+WJjeS4juWQjOexu+Wei++8jOWbnuiwg++8jOebruagh+aIliB1c2VDYXB0dXJlIOazqOWGjOeahOWbnuiwg+OAglxuICAgICAqIEBtZXRob2Qgb2ZmXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgYmVpbmcgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgaWYgaXQncyBub3QgZ2l2ZW4sIG9ubHkgY2FsbGJhY2sgd2l0aG91dCB0YXJnZXQgd2lsbCBiZSByZW1vdmVkXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbdXNlQ2FwdHVyZT1mYWxzZV0gLSBXaGVuIHNldCB0byB0cnVlLCB0aGUgbGlzdGVuZXIgd2lsbCBiZSB0cmlnZ2VyZWQgYXQgY2FwdHVyaW5nIHBoYXNlIHdoaWNoIGlzIGFoZWFkIG9mIHRoZSBmaW5hbCB0YXJnZXQgZW1pdCwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgdHJpZ2dlcmVkIGR1cmluZyBidWJibGluZyBwaGFzZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMubWVtYmVyRnVuY3Rpb24sIHRoaXMpO1xuICAgICAqIG5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBjYWxsYmFjaywgdGhpcy5ub2RlKTtcbiAgICAgKiBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqL1xuICAgIG9mZiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICBsZXQgdG91Y2hFdmVudCA9IF90b3VjaEV2ZW50cy5pbmRleE9mKHR5cGUpICE9PSAtMTtcbiAgICAgICAgbGV0IG1vdXNlRXZlbnQgPSAhdG91Y2hFdmVudCAmJiBfbW91c2VFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTE7XG4gICAgICAgIGlmICh0b3VjaEV2ZW50IHx8IG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZkRpc3BhdGNoKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpO1xuXG4gICAgICAgICAgICBpZiAodG91Y2hFdmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90b3VjaExpc3RlbmVyICYmICFfY2hlY2tMaXN0ZW5lcnModGhpcywgX3RvdWNoRXZlbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdG91Y2hMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW91c2VMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF9tb3VzZUV2ZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLm9mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcblxuICAgICAgICAgICAgdmFyIGhhc0xpc3RlbmVycyA9IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG4gICAgICAgICAgICAvLyBBbGwgbGlzdGVuZXIgcmVtb3ZlZFxuICAgICAgICAgICAgaWYgKCFoYXNMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5QT1NJVElPTl9PTjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+U0NBTEVfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflJPVEFUSU9OX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuU0laRV9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflNJWkVfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5BTkNIT1JfT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5DT0xPUl9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkNPTE9SX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29mZkRpc3BhdGNoICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIC8vIEFjY2VwdCBhbHNvIHBhdGFtZXRlcnMgbGlrZTogKHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKVxuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICB1c2VDYXB0dXJlID0gdGFyZ2V0O1xuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgdXNlQ2FwdHVyZSA9ICEhdXNlQ2FwdHVyZTtcbiAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy5yZW1vdmVBbGwodHlwZSk7XG4gICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycyAmJiB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5yZW1vdmVBbGwodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdXNlQ2FwdHVyZSA/IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA6IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgICAgICAgICBqcy5hcnJheS5mYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZW1vdmVzIGFsbCBjYWxsYmFja3MgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdGFyZ2V0LlxuICAgICAqICEjemgg56e76Zmk55uu5qCH5LiK55qE5omA5pyJ5rOo5YaM5LqL5Lu244CCXG4gICAgICogQG1ldGhvZCB0YXJnZXRPZmZcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBiZSBzZWFyY2hlZCBmb3IgYWxsIHJlbGF0ZWQgY2FsbGJhY2tzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnRhcmdldE9mZih0YXJnZXQpO1xuICAgICAqL1xuICAgIHRhcmdldE9mZiAodGFyZ2V0KSB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycztcbiAgICAgICAgaWYgKGxpc3RlbmVycykge1xuICAgICAgICAgICAgbGlzdGVuZXJzLnRhcmdldE9mZih0YXJnZXQpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgZXZlbnQgbWFzayByZXNldFxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+UE9TSVRJT05fT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5TQ0FMRV9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflJPVEFUSU9OX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBTSVpFX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflNJWkVfT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkFOQ0hPUl9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgQ09MT1JfT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ09MT1JfQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gfkNPTE9SX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy50YXJnZXRPZmYodGFyZ2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XG4gICAgICAgICAgICBqcy5hcnJheS5mYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF90b3VjaEV2ZW50cykpIHtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl90b3VjaExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tb3VzZUxpc3RlbmVyICYmICFfY2hlY2tMaXN0ZW5lcnModGhpcywgX21vdXNlRXZlbnRzKSkge1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX21vdXNlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgRXZlbnRUYXJnZXQgb2JqZWN0IGhhcyBhbnkgY2FsbGJhY2sgcmVnaXN0ZXJlZCBmb3IgYSBzcGVjaWZpYyB0eXBlIG9mIGV2ZW50LlxuICAgICAqICEjemgg5qOA5p+l5LqL5Lu255uu5qCH5a+56LGh5piv5ZCm5pyJ5Li654m55a6a57G75Z6L55qE5LqL5Lu25rOo5YaM55qE5Zue6LCD44CCXG4gICAgICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGEgY2FsbGJhY2sgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGlzIHJlZ2lzdGVyZWQ7IGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBoYXNFdmVudExpc3RlbmVyICh0eXBlKSB7XG4gICAgICAgIGxldCBoYXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBoYXMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzICYmIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgaGFzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFRyaWdnZXIgYW4gZXZlbnQgZGlyZWN0bHkgd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgbmVjZXNzYXJ5IGFyZ3VtZW50cy5cbiAgICAgKiAhI3poXG4gICAgICog6YCa6L+H5LqL5Lu25ZCN5Y+R6YCB6Ieq5a6a5LmJ5LqL5Lu2XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIGVtaXRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0geyp9IFthcmcxXSAtIEZpcnN0IGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnMl0gLSBTZWNvbmQgYXJndW1lbnQgaW4gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0geyp9IFthcmczXSAtIFRoaXJkIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnNF0gLSBGb3VydGggYXJndW1lbnQgaW4gY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0geyp9IFthcmc1XSAtIEZpZnRoIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBcbiAgICAgKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgZXZlbnQpO1xuICAgICAqIGV2ZW50VGFyZ2V0LmVtaXQoJ2ZpcmUnLCBtZXNzYWdlLCBlbWl0dGVyKTtcbiAgICAgKi9cbiAgICBlbWl0ICh0eXBlLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XG4gICAgICAgIGlmICh0aGlzLl9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMuZW1pdCh0eXBlLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogRGlzcGF0Y2hlcyBhbiBldmVudCBpbnRvIHRoZSBldmVudCBmbG93LlxuICAgICAqIFRoZSBldmVudCB0YXJnZXQgaXMgdGhlIEV2ZW50VGFyZ2V0IG9iamVjdCB1cG9uIHdoaWNoIHRoZSBkaXNwYXRjaEV2ZW50KCkgbWV0aG9kIGlzIGNhbGxlZC5cbiAgICAgKiAhI3poIOWIhuWPkeS6i+S7tuWIsOS6i+S7tua1geS4reOAglxuICAgICAqXG4gICAgICogQG1ldGhvZCBkaXNwYXRjaEV2ZW50XG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgRXZlbnQgb2JqZWN0IHRoYXQgaXMgZGlzcGF0Y2hlZCBpbnRvIHRoZSBldmVudCBmbG93XG4gICAgICovXG4gICAgZGlzcGF0Y2hFdmVudCAoZXZlbnQpIHtcbiAgICAgICAgX2RvRGlzcGF0Y2hFdmVudCh0aGlzLCBldmVudCk7XG4gICAgICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFBhdXNlIG5vZGUgcmVsYXRlZCBzeXN0ZW0gZXZlbnRzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY3VycmVudCBOb2RlLiBOb2RlIHN5c3RlbSBldmVudHMgaW5jbHVkZXMgdG91Y2ggYW5kIG1vdXNlIGV2ZW50cy5cbiAgICAgKiBJZiByZWN1cnNpdmUgaXMgc2V0IHRvIHRydWUsIHRoZW4gdGhpcyBBUEkgd2lsbCBwYXVzZSB0aGUgbm9kZSBzeXN0ZW0gZXZlbnRzIGZvciB0aGUgbm9kZSBhbmQgYWxsIG5vZGVzIGluIGl0cyBzdWIgbm9kZSB0cmVlLlxuICAgICAqIFJlZmVyZW5jZTogaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9lZGl0b3JzX2FuZF90b29scy9jcmVhdG9yLWNoYXB0ZXJzL3NjcmlwdGluZy9pbnRlcm5hbC1ldmVudHMvXG4gICAgICogISN6aCDmmoLlgZzlvZPliY3oioLngrnkuIrms6jlhoznmoTmiYDmnInoioLngrnns7vnu5/kuovku7bvvIzoioLngrnns7vnu5/kuovku7bljIXlkKvop6bmkbjlkozpvKDmoIfkuovku7bjgIJcbiAgICAgKiDlpoLmnpzkvKDpgJIgcmVjdXJzaXZlIOS4uiB0cnVl77yM6YKj5LmI6L+Z5LiqIEFQSSDlsIbmmoLlgZzmnKzoioLngrnlkozlroPnmoTlrZDmoJHkuIrmiYDmnInoioLngrnnmoToioLngrnns7vnu5/kuovku7bjgIJcbiAgICAgKiDlj4LogIPvvJpodHRwczovL3d3dy5jb2Nvcy5jb20vZG9jcy9jcmVhdG9yL3NjcmlwdGluZy9pbnRlcm5hbC1ldmVudHMuaHRtbFxuICAgICAqIEBtZXRob2QgcGF1c2VTeXN0ZW1FdmVudHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlY3Vyc2l2ZSAtIFdoZXRoZXIgdG8gcGF1c2Ugbm9kZSBzeXN0ZW0gZXZlbnRzIG9uIHRoZSBzdWIgbm9kZSB0cmVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5wYXVzZVN5c3RlbUV2ZW50cyh0cnVlKTtcbiAgICAgKi9cbiAgICBwYXVzZVN5c3RlbUV2ZW50cyAocmVjdXJzaXZlKSB7XG4gICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzLCByZWN1cnNpdmUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJlc3VtZSBub2RlIHJlbGF0ZWQgc3lzdGVtIGV2ZW50cyByZWdpc3RlcmVkIHdpdGggdGhlIGN1cnJlbnQgTm9kZS4gTm9kZSBzeXN0ZW0gZXZlbnRzIGluY2x1ZGVzIHRvdWNoIGFuZCBtb3VzZSBldmVudHMuXG4gICAgICogSWYgcmVjdXJzaXZlIGlzIHNldCB0byB0cnVlLCB0aGVuIHRoaXMgQVBJIHdpbGwgcmVzdW1lIHRoZSBub2RlIHN5c3RlbSBldmVudHMgZm9yIHRoZSBub2RlIGFuZCBhbGwgbm9kZXMgaW4gaXRzIHN1YiBub2RlIHRyZWUuXG4gICAgICogUmVmZXJlbmNlOiBodHRwOi8vZG9jcy5jb2NvczJkLXgub3JnL2VkaXRvcnNfYW5kX3Rvb2xzL2NyZWF0b3ItY2hhcHRlcnMvc2NyaXB0aW5nL2ludGVybmFsLWV2ZW50cy9cbiAgICAgKiAhI3poIOaBouWkjeW9k+WJjeiKgueCueS4iuazqOWGjOeahOaJgOacieiKgueCueezu+e7n+S6i+S7tu+8jOiKgueCueezu+e7n+S6i+S7tuWMheWQq+inpuaRuOWSjOm8oOagh+S6i+S7tuOAglxuICAgICAqIOWmguaenOS8oOmAkiByZWN1cnNpdmUg5Li6IHRydWXvvIzpgqPkuYjov5nkuKogQVBJIOWwhuaBouWkjeacrOiKgueCueWSjOWug+eahOWtkOagkeS4iuaJgOacieiKgueCueeahOiKgueCueezu+e7n+S6i+S7tuOAglxuICAgICAqIOWPguiAg++8mmh0dHBzOi8vd3d3LmNvY29zLmNvbS9kb2NzL2NyZWF0b3Ivc2NyaXB0aW5nL2ludGVybmFsLWV2ZW50cy5odG1sXG4gICAgICogQG1ldGhvZCByZXN1bWVTeXN0ZW1FdmVudHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlY3Vyc2l2ZSAtIFdoZXRoZXIgdG8gcmVzdW1lIG5vZGUgc3lzdGVtIGV2ZW50cyBvbiB0aGUgc3ViIG5vZGUgdHJlZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucmVzdW1lU3lzdGVtRXZlbnRzKHRydWUpO1xuICAgICAqL1xuICAgIHJlc3VtZVN5c3RlbUV2ZW50cyAocmVjdXJzaXZlKSB7XG4gICAgICAgIGV2ZW50TWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcywgcmVjdXJzaXZlKTtcbiAgICB9LFxuXG4gICAgX2hpdFRlc3QgKHBvaW50LCBsaXN0ZW5lcikge1xuICAgICAgICBsZXQgdyA9IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoLFxuICAgICAgICAgICAgaCA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCxcbiAgICAgICAgICAgIGNhbWVyYVB0ID0gX2h0VmVjM2EsXG4gICAgICAgICAgICB0ZXN0UHQgPSBfaHRWZWMzYjtcbiAgICAgICAgXG4gICAgICAgIGxldCBjYW1lcmEgPSBjYy5DYW1lcmEuZmluZENhbWVyYSh0aGlzKTtcbiAgICAgICAgaWYgKGNhbWVyYSkge1xuICAgICAgICAgICAgY2FtZXJhLmdldFNjcmVlblRvV29ybGRQb2ludChwb2ludCwgY2FtZXJhUHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FtZXJhUHQuc2V0KHBvaW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIC8vIElmIHNjYWxlIGlzIDAsIGl0IGNhbid0IGJlIGhpdC5cbiAgICAgICAgaWYgKCFNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl93b3JsZE1hdHJpeCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQodGVzdFB0LCBjYW1lcmFQdCwgX21hdDRfdGVtcCk7XG4gICAgICAgIHRlc3RQdC54ICs9IHRoaXMuX2FuY2hvclBvaW50LnggKiB3O1xuICAgICAgICB0ZXN0UHQueSArPSB0aGlzLl9hbmNob3JQb2ludC55ICogaDtcblxuICAgICAgICBsZXQgaGl0ID0gZmFsc2U7XG4gICAgICAgIGlmICh0ZXN0UHQueCA+PSAwICYmIHRlc3RQdC55ID49IDAgJiYgdGVzdFB0LnggPD0gdyAmJiB0ZXN0UHQueSA8PSBoKSB7XG4gICAgICAgICAgICBoaXQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGxpc3RlbmVyLm1hc2spIHtcbiAgICAgICAgICAgICAgICBsZXQgbWFzayA9IGxpc3RlbmVyLm1hc2s7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgbGV0IGxlbmd0aCA9IG1hc2sgPyBtYXNrLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgLy8gZmluZCBtYXNrIHBhcmVudCwgc2hvdWxkIGhpdCB0ZXN0IGl0XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGogPSAwOyBwYXJlbnQgJiYgaiA8IGxlbmd0aDsgKytpLCBwYXJlbnQgPSBwYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gbWFza1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHRlbXAuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IHRlbXAubm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb21wID0gcGFyZW50LmdldENvbXBvbmVudChjYy5NYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcCAmJiBjb21wLl9lbmFibGVkICYmICFjb21wLl9oaXRUZXN0KGNhbWVyYVB0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXNrIHBhcmVudCBubyBsb25nZXIgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzay5sZW5ndGggPSBqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA+IHRlbXAuaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hc2sgcGFyZW50IG5vIGxvbmdlciBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc2subGVuZ3RoID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG5cbiAgICAgICAgcmV0dXJuIGhpdDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCB0aGUgdGFyZ2V0cyBsaXN0ZW5pbmcgdG8gdGhlIHN1cHBsaWVkIHR5cGUgb2YgZXZlbnQgaW4gdGhlIHRhcmdldCdzIGNhcHR1cmluZyBwaGFzZS5cbiAgICAgKiBUaGUgY2FwdHVyaW5nIHBoYXNlIGNvbXByaXNlcyB0aGUgam91cm5leSBmcm9tIHRoZSByb290IHRvIHRoZSBsYXN0IG5vZGUgQkVGT1JFIHRoZSBldmVudCB0YXJnZXQncyBub2RlLlxuICAgICAqIFRoZSByZXN1bHQgc2hvdWxkIHNhdmUgaW4gdGhlIGFycmF5IHBhcmFtZXRlciwgYW5kIE1VU1QgU09SVCBmcm9tIGNoaWxkIG5vZGVzIHRvIHBhcmVudCBub2Rlcy5cbiAgICAgKlxuICAgICAqIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIG1ha2UgZXZlbnQgcHJvcGFnYWJsZS5cbiAgICAgKiBAbWV0aG9kIF9nZXRDYXB0dXJpbmdUYXJnZXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSB0aGUgYXJyYXkgdG8gcmVjZWl2ZSB0YXJnZXRzXG4gICAgICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS9ldmVudC9fZ2V0Q2FwdHVyaW5nVGFyZ2V0cy5qc31cbiAgICAgKi9cbiAgICBfZ2V0Q2FwdHVyaW5nVGFyZ2V0cyAodHlwZSwgYXJyYXkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9jYXB0dXJpbmdMaXN0ZW5lcnMgJiYgcGFyZW50Ll9jYXB0dXJpbmdMaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlKSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGFsbCB0aGUgdGFyZ2V0cyBsaXN0ZW5pbmcgdG8gdGhlIHN1cHBsaWVkIHR5cGUgb2YgZXZlbnQgaW4gdGhlIHRhcmdldCdzIGJ1YmJsaW5nIHBoYXNlLlxuICAgICAqIFRoZSBidWJibGluZyBwaGFzZSBjb21wcmlzZXMgYW55IFNVQlNFUVVFTlQgbm9kZXMgZW5jb3VudGVyZWQgb24gdGhlIHJldHVybiB0cmlwIHRvIHRoZSByb290IG9mIHRoZSB0cmVlLlxuICAgICAqIFRoZSByZXN1bHQgc2hvdWxkIHNhdmUgaW4gdGhlIGFycmF5IHBhcmFtZXRlciwgYW5kIE1VU1QgU09SVCBmcm9tIGNoaWxkIG5vZGVzIHRvIHBhcmVudCBub2Rlcy5cbiAgICAgKlxuICAgICAqIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIG1ha2UgZXZlbnQgcHJvcGFnYWJsZS5cbiAgICAgKiBAbWV0aG9kIF9nZXRCdWJibGluZ1RhcmdldHNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gdGhlIGV2ZW50IHR5cGVcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSAtIHRoZSBhcnJheSB0byByZWNlaXZlIHRhcmdldHNcbiAgICAgKi9cbiAgICBfZ2V0QnViYmxpbmdUYXJnZXRzICh0eXBlLCBhcnJheSkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQuX2J1YmJsaW5nTGlzdGVuZXJzICYmIHBhcmVudC5fYnViYmxpbmdMaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlKSkge1xuICAgICAgICAgICAgICAgIGFycmF5LnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyBBQ1RJT05TXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEV4ZWN1dGVzIGFuIGFjdGlvbiwgYW5kIHJldHVybnMgdGhlIGFjdGlvbiB0aGF0IGlzIGV4ZWN1dGVkLjxici8+XG4gICAgICogVGhlIG5vZGUgYmVjb21lcyB0aGUgYWN0aW9uJ3MgdGFyZ2V0LiBSZWZlciB0byBjYy5BY3Rpb24ncyBnZXRUYXJnZXQoKSA8YnIvPlxuICAgICAqIENhbGxpbmcgcnVuQWN0aW9uIHdoaWxlIHRoZSBub2RlIGlzIG5vdCBhY3RpdmUgd29uJ3QgaGF2ZSBhbnkgZWZmZWN0LiA8YnIvPlxuICAgICAqIE5vdGXvvJpZb3Ugc2hvdWxkbid0IG1vZGlmeSB0aGUgYWN0aW9uIGFmdGVyIHJ1bkFjdGlvbiwgdGhhdCB3b24ndCB0YWtlIGFueSBlZmZlY3QuPGJyLz5cbiAgICAgKiBpZiB5b3Ugd2FudCB0byBtb2RpZnksIHdoZW4geW91IGRlZmluZSBhY3Rpb24gcGx1cy5cbiAgICAgKiAhI3poXG4gICAgICog5omn6KGM5bm26L+U5Zue6K+l5omn6KGM55qE5Yqo5L2c44CC6K+l6IqC54K55bCG5Lya5Y+Y5oiQ5Yqo5L2c55qE55uu5qCH44CCPGJyLz5cbiAgICAgKiDosIPnlKggcnVuQWN0aW9uIOaXtu+8jOiKgueCueiHqui6q+WkhOS6juS4jea/gOa0u+eKtuaAgeWwhuS4jeS8muacieS7u+S9leaViOaenOOAgjxici8+XG4gICAgICog5rOo5oSP77ya5L2g5LiN5bqU6K+l5L+u5pS5IHJ1bkFjdGlvbiDlkI7nmoTliqjkvZzvvIzlsIbml6Dms5Xlj5HmjKXkvZznlKjvvIzlpoLmnpzmg7Pov5vooYzkv67mlLnvvIzor7flnKjlrprkuYkgYWN0aW9uIOaXtuWKoOWFpeOAglxuICAgICAqIEBtZXRob2QgcnVuQWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb259IGFjdGlvblxuICAgICAqIEByZXR1cm4ge0FjdGlvbn0gQW4gQWN0aW9uIHBvaW50ZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhY3Rpb24gPSBjYy5zY2FsZVRvKDAuMiwgMSwgMC42KTtcbiAgICAgKiBub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAqIG5vZGUucnVuQWN0aW9uKGFjdGlvbikucmVwZWF0Rm9yZXZlcigpOyAvLyBmYWlsXG4gICAgICogbm9kZS5ydW5BY3Rpb24oYWN0aW9uLnJlcGVhdEZvcmV2ZXIoKSk7IC8vIHJpZ2h0XG4gICAgICovXG4gICAgcnVuQWN0aW9uOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNjLmFzc2VydElEKGFjdGlvbiwgMTYxOCk7XG4gICAgICAgIGxldCBhbSA9IGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgaWYgKCFhbS5fc3VwcHJlc3NEZXByZWNhdGlvbikge1xuICAgICAgICAgICAgYW0uX3N1cHByZXNzRGVwcmVjYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgY2Mud2FybklEKDE2MzkpO1xuICAgICAgICB9XG4gICAgICAgIGFtLmFkZEFjdGlvbihhY3Rpb24sIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9IDogZW1wdHlGdW5jLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZSBhbGwgYWN0aW9ucyBydW5uaW5nIG9uIHRoZSBjdXJyZW50IG5vZGUuIEVxdWFscyB0byBgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnBhdXNlVGFyZ2V0KG5vZGUpYC5cbiAgICAgKiAhI3poIOaaguWBnOacrOiKgueCueS4iuaJgOacieato+WcqOi/kOihjOeahOWKqOS9nOOAguWSjCBgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnBhdXNlVGFyZ2V0KG5vZGUpO2Ag562J5Lu344CCXG4gICAgICogQG1ldGhvZCBwYXVzZUFsbEFjdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucGF1c2VBbGxBY3Rpb25zKCk7XG4gICAgICovXG4gICAgcGF1c2VBbGxBY3Rpb25zOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICB9IDogZW1wdHlGdW5jLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgYWxsIHBhdXNlZCBhY3Rpb25zIG9uIHRoZSBjdXJyZW50IG5vZGUuIEVxdWFscyB0byBgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlc3VtZVRhcmdldChub2RlKWAuXG4gICAgICogISN6aCDmgaLlpI3ov5DooYzmnKzoioLngrnkuIrmiYDmnInmmoLlgZznmoTliqjkvZzjgILlkowgYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZXN1bWVUYXJnZXQobm9kZSk7YCDnrYnku7fjgIJcbiAgICAgKiBAbWV0aG9kIHJlc3VtZUFsbEFjdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucmVzdW1lQWxsQWN0aW9ucygpO1xuICAgICAqL1xuICAgIHJlc3VtZUFsbEFjdGlvbnM6IEFjdGlvbk1hbmFnZXJFeGlzdCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICB9IDogZW1wdHlGdW5jLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wcyBhbmQgcmVtb3ZlcyBhbGwgYWN0aW9ucyBmcm9tIHRoZSBydW5uaW5nIGFjdGlvbiBsaXN0IC5cbiAgICAgKiAhI3poIOWBnOatouW5tuS4lOenu+mZpOaJgOacieato+WcqOi/kOihjOeahOWKqOS9nOWIl+ihqOOAglxuICAgICAqIEBtZXRob2Qgc3RvcEFsbEFjdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgKi9cbiAgICBzdG9wQWxsQWN0aW9uczogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgYW5kIHJlbW92ZXMgYW4gYWN0aW9uIGZyb20gdGhlIHJ1bm5pbmcgYWN0aW9uIGxpc3QuXG4gICAgICogISN6aCDlgZzmraLlubbnp7vpmaTmjIflrprnmoTliqjkvZzjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BBY3Rpb25cbiAgICAgKiBAcGFyYW0ge0FjdGlvbn0gYWN0aW9uIEFuIGFjdGlvbiBvYmplY3QgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhY3Rpb24gPSBjYy5zY2FsZVRvKDAuMiwgMSwgMC42KTtcbiAgICAgKiBub2RlLnN0b3BBY3Rpb24oYWN0aW9uKTtcbiAgICAgKi9cbiAgICBzdG9wQWN0aW9uOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBY3Rpb24oYWN0aW9uKTtcbiAgICB9IDogZW1wdHlGdW5jLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZW1vdmVzIGFuIGFjdGlvbiBmcm9tIHRoZSBydW5uaW5nIGFjdGlvbiBsaXN0IGJ5IGl0cyB0YWcuXG4gICAgICogISN6aCDlgZzmraLlubbkuJTnp7vpmaTmjIflrprmoIfnrb7nmoTliqjkvZzjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BBY3Rpb25CeVRhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0YWcgQSB0YWcgdGhhdCBpbmRpY2F0ZXMgdGhlIGFjdGlvbiB0byBiZSByZW1vdmVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5zdG9wQWN0aW9uQnlUYWcoMSk7XG4gICAgICovXG4gICAgc3RvcEFjdGlvbkJ5VGFnOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGlmICh0YWcgPT09IGNjLkFjdGlvbi5UQUdfSU5WQUxJRCkge1xuICAgICAgICAgICAgY2MubG9nSUQoMTYxMik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFjdGlvbkJ5VGFnKHRhZywgdGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV0dXJucyBhbiBhY3Rpb24gZnJvbSB0aGUgcnVubmluZyBhY3Rpb24gbGlzdCBieSBpdHMgdGFnLlxuICAgICAqICEjemgg6YCa6L+H5qCH562+6I635Y+W5oyH5a6a5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCBnZXRBY3Rpb25CeVRhZ1xuICAgICAqIEBzZWUgY2MuQWN0aW9uI2dldFRhZyBhbmQgY2MuQWN0aW9uI3NldFRhZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0YWdcbiAgICAgKiBAcmV0dXJuIHtBY3Rpb259IFRoZSBhY3Rpb24gb2JqZWN0IHdpdGggdGhlIGdpdmVuIHRhZy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhY3Rpb24gPSBub2RlLmdldEFjdGlvbkJ5VGFnKDEpO1xuICAgICAqL1xuICAgIGdldEFjdGlvbkJ5VGFnOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGlmICh0YWcgPT09IGNjLkFjdGlvbi5UQUdfSU5WQUxJRCkge1xuICAgICAgICAgICAgY2MubG9nSUQoMTYxMyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLmdldEFjdGlvbkJ5VGFnKHRhZywgdGhpcyk7XG4gICAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBudW1iZXJzIG9mIGFjdGlvbnMgdGhhdCBhcmUgcnVubmluZyBwbHVzIHRoZSBvbmVzIHRoYXQgYXJlIHNjaGVkdWxlIHRvIHJ1biAoYWN0aW9ucyBpbiBhY3Rpb25zVG9BZGQgYW5kIGFjdGlvbnMgYXJyYXlzKS48YnIvPlxuICAgICAqICAgIENvbXBvc2FibGUgYWN0aW9ucyBhcmUgY291bnRlZCBhcyAxIGFjdGlvbi4gRXhhbXBsZTo8YnIvPlxuICAgICAqICAgIElmIHlvdSBhcmUgcnVubmluZyAxIFNlcXVlbmNlIG9mIDcgYWN0aW9ucywgaXQgd2lsbCByZXR1cm4gMS4gPGJyLz5cbiAgICAgKiAgICBJZiB5b3UgYXJlIHJ1bm5pbmcgNyBTZXF1ZW5jZXMgb2YgMiBhY3Rpb25zLCBpdCB3aWxsIHJldHVybiA3LjwvcD5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6L+Q6KGM552A55qE5Yqo5L2c5Yqg5LiK5q2j5Zyo6LCD5bqm6L+Q6KGM55qE5Yqo5L2c55qE5oC75pWw44CCPGJyLz5cbiAgICAgKiDkvovlpoLvvJo8YnIvPlxuICAgICAqIC0g5aaC5p6c5L2g5q2j5Zyo6L+Q6KGMIDcg5Liq5Yqo5L2c5Lit55qEIDEg5LiqIFNlcXVlbmNl77yM5a6D5bCG6L+U5ZueIDHjgII8YnIvPlxuICAgICAqIC0g5aaC5p6c5L2g5q2j5Zyo6L+Q6KGMIDIg5Liq5Yqo5L2c5Lit55qEIDcg5LiqIFNlcXVlbmNl77yM5a6D5bCG6L+U5ZueIDfjgII8YnIvPlxuICAgICAqXG4gICAgICogQG1ldGhvZCBnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGFjdGlvbnMgdGhhdCBhcmUgcnVubmluZyBwbHVzIHRoZSBvbmVzIHRoYXQgYXJlIHNjaGVkdWxlIHRvIHJ1blxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGNvdW50ID0gbm9kZS5nZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zKCk7XG4gICAgICogY2MubG9nKFwiUnVubmluZyBBY3Rpb24gQ291bnQ6IFwiICsgY291bnQpO1xuICAgICAqL1xuICAgIGdldE51bWJlck9mUnVubmluZ0FjdGlvbnM6IEFjdGlvbk1hbmFnZXJFeGlzdCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5nZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zSW5UYXJnZXQodGhpcyk7XG4gICAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcblxuXG4vLyBUUkFOU0ZPUk0gUkVMQVRFRFxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIGEgY29weSBvZiB0aGUgcG9zaXRpb24gKHgsIHksIHopIG9mIHRoZSBub2RlIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlcy5cbiAgICAgKiBZb3UgY2FuIHBhc3MgYSBjYy5WZWMyIG9yIGNjLlZlYzMgYXMgdGhlIGFyZ3VtZW50IHRvIHJlY2VpdmUgdGhlIHJldHVybiB2YWx1ZXMuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluiKgueCueWcqOeItuiKgueCueWdkOagh+ezu+S4reeahOS9jee9ru+8iHgsIHksIHrvvInjgIJcbiAgICAgKiDkvaDlj6/ku6XkvKDkuIDkuKogY2MuVmVjMiDmiJbogIUgY2MuVmVjMyDkvZzkuLrlj4LmlbDmnaXmjqXmlLbov5Tlm57lgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtWZWMyfFZlYzN9IFtvdXRdIC0gVGhlIHJldHVybiB2YWx1ZSB0byByZWNlaXZlIHBvc2l0aW9uXG4gICAgICogQHJldHVybiB7VmVjMnxWZWMzfSBUaGUgcG9zaXRpb24gKHgsIHksIHopIG9mIHRoZSBub2RlIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiTm9kZSBQb3NpdGlvbjogXCIgKyBub2RlLmdldFBvc2l0aW9uKCkpO1xuICAgICAqL1xuICAgIGdldFBvc2l0aW9uIChvdXQpIHtcbiAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBWZWMzKCk7XG4gICAgICAgIHJldHVybiBUcnMudG9Qb3NpdGlvbihvdXQsIHRoaXMuX3Rycyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBwb3NpdGlvbiAoeCwgeSwgeikgb2YgdGhlIG5vZGUgaW4gaXRzIHBhcmVudCdzIGNvb3JkaW5hdGVzLjxici8+XG4gICAgICogVXN1YWxseSB3ZSB1c2UgY2MudjIoeCwgeSkgdG8gY29tcG9zZSBjYy5WZWMyIG9iamVjdCw8YnIvPlxuICAgICAqIGFuZCBwYXNzaW5nIHR3byBudW1iZXJzICh4LCB5KSBpcyBtb3JlIGVmZmljaWVudCB0aGFuIHBhc3NpbmcgY2MuVmVjMiBvYmplY3QuXG4gICAgICogRm9yIDNEIG5vZGUgd2UgY2FuIHVzZSBjYy52Myh4LCB5LCB6KSB0byBjb21wb3NlIGNjLlZlYzMgb2JqZWN0LDxici8+XG4gICAgICogYW5kIHBhc3NpbmcgdGhyZWUgbnVtYmVycyAoeCwgeSwgeikgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBwYXNzaW5nIGNjLlZlYzMgb2JqZWN0LlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7oioLngrnlnKjniLboioLngrnlnZDmoIfns7vkuK3nmoTkvY3nva7jgII8YnIvPlxuICAgICAqIOWPr+S7pemAmui/h+S4i+mdoueahOaWueW8j+iuvue9ruWdkOagh+eCue+8mjxici8+XG4gICAgICogMS4g5Lyg5YWlIDIg5Liq5pWw5YC8IHgsIHnjgII8YnIvPlxuICAgICAqIDIuIOS8oOWFpSBjYy52Mih4LCB5KSDnsbvlnovkuLogY2MuVmVjMiDnmoTlr7nosaHjgIJcbiAgICAgKiAzLiDlr7nkuo4gM0Qg6IqC54K55Y+v5Lul5Lyg5YWlIDMg5Liq5pWw5YC8IHgsIHksIHrjgII8YnIvPlxuICAgICAqIDQuIOWvueS6jiAzRCDoioLngrnlj6/ku6XkvKDlhaUgY2MudjMoeCwgeSwgeikg57G75Z6L5Li6IGNjLlZlYzMg55qE5a+56LGh44CCXG4gICAgICogQG1ldGhvZCBzZXRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMnxWZWMzfE51bWJlcn0gbmV3UG9zT3JYIC0gWCBjb29yZGluYXRlIGZvciBwb3NpdGlvbiBvciB0aGUgcG9zaXRpb24gKHgsIHksIHopIG9mIHRoZSBub2RlIGluIGNvb3JkaW5hdGVzXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSAtIFkgY29vcmRpbmF0ZSBmb3IgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3pdIC0gWiBjb29yZGluYXRlIGZvciBwb3NpdGlvblxuICAgICAqL1xuICAgIHNldFBvc2l0aW9uIChuZXdQb3NPclgsIHksIHopIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHggPSBuZXdQb3NPclgueDtcbiAgICAgICAgICAgIHkgPSBuZXdQb3NPclgueTtcbiAgICAgICAgICAgIHogPSBuZXdQb3NPclgueiB8fCAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeCA9IG5ld1Bvc09yWDtcbiAgICAgICAgICAgIHogPSB6IHx8IDBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICBpZiAodHJzWzBdID09PSB4ICYmIHRyc1sxXSA9PT0geSAmJiB0cnNbMl0gPT09IHopIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgb2xkUG9zaXRpb24gPSBuZXcgY2MuVmVjMyh0cnNbMF0sIHRyc1sxXSwgdHJzWzJdKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB0cnNbMF0gPSB4O1xuICAgICAgICB0cnNbMV0gPSB5O1xuICAgICAgICB0cnNbMl0gPSB6O1xuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcbiAgICAgICAgIUNDX05BVElWRVJFTkRFUkVSICYmICh0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19XT1JMRF9UUkFOU0ZPUk0pO1xuICAgIFxuICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgb2xkUG9zaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgc2NhbGUgZmFjdG9yIG9mIHRoZSBub2RlLlxuICAgICAqIE5lZWQgcGFzcyBhIGNjLlZlYzIgb3IgY2MuVmVjMyBhcyB0aGUgYXJndW1lbnQgdG8gcmVjZWl2ZSB0aGUgcmV0dXJuIHZhbHVlcy5cbiAgICAgKiAhI3poIOiOt+WPluiKgueCueeahOe8qeaUvu+8jOmcgOimgeS8oOS4gOS4qiBjYy5WZWMyIOaIluiAhSBjYy5WZWMzIOS9nOS4uuWPguaVsOadpeaOpeaUtui/lOWbnuWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0U2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8VmVjM30gb3V0XG4gICAgICogQHJldHVybiB7VmVjMnxWZWMzfSBUaGUgc2NhbGUgZmFjdG9yXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjYy5sb2coXCJOb2RlIFNjYWxlOiBcIiArIG5vZGUuZ2V0U2NhbGUoY2MudjMoKSkpO1xuICAgICAqL1xuICAgIGdldFNjYWxlIChvdXQpIHtcbiAgICAgICAgaWYgKG91dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gVHJzLnRvU2NhbGUob3V0LCB0aGlzLl90cnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgxNDAwLCAnY2MuTm9kZS5nZXRTY2FsZScsICdjYy5Ob2RlLnNjYWxlIG9yIGNjLk5vZGUuZ2V0U2NhbGUoY2MuVmVjMyknKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbN107XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHNjYWxlIG9mIGF4aXMgaW4gbG9jYWwgY29vcmRpbmF0ZXMgb2YgdGhlIG5vZGUuXG4gICAgICogWW91IGNhbiBvcGVyYXRlIDIgYXhpcyBpbiAyRCBub2RlLCBhbmQgMyBheGlzIGluIDNEIG5vZGUuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9ruiKgueCueWcqOacrOWcsOWdkOagh+ezu+S4reWdkOagh+i9tOS4iueahOe8qeaUvuavlOS+i+OAglxuICAgICAqIDJEIOiKgueCueWPr+S7peaTjeS9nOS4pOS4quWdkOagh+i9tO+8jOiAjCAzRCDoioLngrnlj6/ku6Xmk43kvZzkuInkuKrlnZDmoIfovbTjgIJcbiAgICAgKiBAbWV0aG9kIHNldFNjYWxlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8VmVjMnxWZWMzfSB4IC0gc2NhbGVYIG9yIHNjYWxlIG9iamVjdFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3pdXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldFNjYWxlKGNjLnYyKDIsIDIpKTtcbiAgICAgKiBub2RlLnNldFNjYWxlKGNjLnYzKDIsIDIsIDIpKTsgLy8gZm9yIDNEIG5vZGVcbiAgICAgKiBub2RlLnNldFNjYWxlKDIpO1xuICAgICAqL1xuICAgIHNldFNjYWxlICh4LCB5LCB6KSB7XG4gICAgICAgIGlmICh4ICYmIHR5cGVvZiB4ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgeSA9IHgueTtcbiAgICAgICAgICAgIHogPSB4LnogPT09IHVuZGVmaW5lZCA/IDEgOiB4Lno7XG4gICAgICAgICAgICB4ID0geC54O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHggIT09IHVuZGVmaW5lZCAmJiB5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHkgPSB4O1xuICAgICAgICAgICAgeiA9IHg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB6ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICBpZiAodHJzWzddICE9PSB4IHx8IHRyc1s4XSAhPT0geSB8fCB0cnNbOV0gIT09IHopIHtcbiAgICAgICAgICAgIHRyc1s3XSA9IHg7XG4gICAgICAgICAgICB0cnNbOF0gPSB5O1xuICAgICAgICAgICAgdHJzWzldID0gejtcbiAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfU0NBTEUpO1xuICAgICAgICAgICAgIUNDX05BVElWRVJFTkRFUkVSICYmICh0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk0pO1xuICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNDQUxFX09OKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHJvdGF0aW9uIG9mIG5vZGUgKGluIHF1YXRlcm5pb24pLlxuICAgICAqIE5lZWQgcGFzcyBhIGNjLlF1YXQgYXMgdGhlIGFyZ3VtZW50IHRvIHJlY2VpdmUgdGhlIHJldHVybiB2YWx1ZXMuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluivpeiKgueCueeahCBxdWF0ZXJuaW9uIOaXi+i9rOinkuW6pu+8jOmcgOimgeS8oOS4gOS4qiBjYy5RdWF0IOS9nOS4uuWPguaVsOadpeaOpeaUtui/lOWbnuWAvOOAglxuICAgICAqIEBtZXRob2QgZ2V0Um90YXRpb25cbiAgICAgKiBAcGFyYW0ge1F1YXR9IG91dFxuICAgICAqIEByZXR1cm4ge1F1YXR9IFF1YXRlcm5pb24gb2JqZWN0IHJlcHJlc2VudHMgdGhlIHJvdGF0aW9uXG4gICAgICovXG4gICAgZ2V0Um90YXRpb24gKG91dCkge1xuICAgICAgICBpZiAob3V0IGluc3RhbmNlb2YgUXVhdCkge1xuICAgICAgICAgICAgcmV0dXJuIFRycy50b1JvdGF0aW9uKG91dCwgdGhpcy5fdHJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5nZXRSb3RhdGlvbigpYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHVzZSBgLWNjLk5vZGUuYW5nbGVgIGluc3RlYWQuIChgdGhpcy5ub2RlLmdldFJvdGF0aW9uKClgIC0+IGAtdGhpcy5ub2RlLmFuZ2xlYClcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLXRoaXMuYW5nbGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgcm90YXRpb24gb2Ygbm9kZSAoaW4gcXVhdGVybmlvbikuXG4gICAgICogISN6aCDorr7nva7or6XoioLngrnnmoQgcXVhdGVybmlvbiDml4vovazop5LluqbjgIJcbiAgICAgKiBAbWV0aG9kIHNldFJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtjYy5RdWF0fE51bWJlcn0gcXVhdCBRdWF0ZXJuaW9uIG9iamVjdCByZXByZXNlbnRzIHRoZSByb3RhdGlvbiBvciB0aGUgeCB2YWx1ZSBvZiBxdWF0ZXJuaW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSB5IHZhbHVlIG9mIHF1dGVybmlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbel0geiB2YWx1ZSBvZiBxdXRlcm5pb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ddIHcgdmFsdWUgb2YgcXV0ZXJuaW9uXG4gICAgICovXG4gICAgc2V0Um90YXRpb24gKHJvdGF0aW9uLCB5LCB6LCB3KSB7XG4gICAgICAgIGlmICh0eXBlb2Ygcm90YXRpb24gPT09ICdudW1iZXInICYmIHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKENDX0RFQlVHKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnNldFJvdGF0aW9uKGRlZ3JlZSlgIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4wLCBwbGVhc2Ugc2V0IGAtY2MuTm9kZS5hbmdsZWAgaW5zdGVhZC4gKGB0aGlzLm5vZGUuc2V0Um90YXRpb24oeClgIC0+IGB0aGlzLm5vZGUuYW5nbGUgPSAteGApXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hbmdsZSA9IC1yb3RhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB4ID0gcm90YXRpb247XG4gICAgICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgeCA9IHJvdGF0aW9uLng7XG4gICAgICAgICAgICAgICAgeSA9IHJvdGF0aW9uLnk7XG4gICAgICAgICAgICAgICAgeiA9IHJvdGF0aW9uLno7XG4gICAgICAgICAgICAgICAgdyA9IHJvdGF0aW9uLnc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgICAgICBpZiAodHJzWzNdICE9PSB4IHx8IHRyc1s0XSAhPT0geSB8fCB0cnNbNV0gIT09IHogfHwgdHJzWzZdICE9PSB3KSB7XG4gICAgICAgICAgICAgICAgdHJzWzNdID0geDtcbiAgICAgICAgICAgICAgICB0cnNbNF0gPSB5O1xuICAgICAgICAgICAgICAgIHRyc1s1XSA9IHo7XG4gICAgICAgICAgICAgICAgdHJzWzZdID0gdztcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdG9FdWxlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgdGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZS4gPGJyLz5cbiAgICAgKiBUaGUgY29udGVudFNpemUgcmVtYWlucyB0aGUgc2FtZSBubyBtYXR0ZXIgdGhlIG5vZGUgaXMgc2NhbGVkIG9yIHJvdGF0ZWQuPGJyLz5cbiAgICAgKiBBbGwgbm9kZXMgaGFzIGEgc2l6ZS4gTGF5ZXIgYW5kIFNjZW5lIGhhcyB0aGUgc2FtZSBzaXplIG9mIHRoZSBzY3JlZW4gYnkgZGVmYXVsdC4gPGJyLz5cbiAgICAgKiAhI3poIOiOt+WPluiKgueCueiHqui6q+Wkp+Wwj++8jOS4jeWPl+ivpeiKgueCueaYr+WQpuiiq+e8qeaUvuaIluiAheaXi+i9rOeahOW9seWTjeOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29udGVudFNpemVcbiAgICAgKiBAcmV0dXJuIHtTaXplfSBUaGUgdW50cmFuc2Zvcm1lZCBzaXplIG9mIHRoZSBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiQ29udGVudCBTaXplOiBcIiArIG5vZGUuZ2V0Q29udGVudFNpemUoKSk7XG4gICAgICovXG4gICAgZ2V0Q29udGVudFNpemUgKCkge1xuICAgICAgICByZXR1cm4gY2Muc2l6ZSh0aGlzLl9jb250ZW50U2l6ZS53aWR0aCwgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZS48YnIvPlxuICAgICAqIFRoZSBjb250ZW50U2l6ZSByZW1haW5zIHRoZSBzYW1lIG5vIG1hdHRlciB0aGUgbm9kZSBpcyBzY2FsZWQgb3Igcm90YXRlZC48YnIvPlxuICAgICAqIEFsbCBub2RlcyBoYXMgYSBzaXplLiBMYXllciBhbmQgU2NlbmUgaGFzIHRoZSBzYW1lIHNpemUgb2YgdGhlIHNjcmVlbi5cbiAgICAgKiAhI3poIOiuvue9ruiKgueCueWOn+Wni+Wkp+Wwj++8jOS4jeWPl+ivpeiKgueCueaYr+WQpuiiq+e8qeaUvuaIluiAheaXi+i9rOeahOW9seWTjeOAglxuICAgICAqIEBtZXRob2Qgc2V0Q29udGVudFNpemVcbiAgICAgKiBAcGFyYW0ge1NpemV8TnVtYmVyfSBzaXplIC0gVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZSBvciBUaGUgdW50cmFuc2Zvcm1lZCBzaXplJ3Mgd2lkdGggb2YgdGhlIG5vZGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtoZWlnaHRdIC0gVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSdzIGhlaWdodCBvZiB0aGUgbm9kZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc2V0Q29udGVudFNpemUoY2Muc2l6ZSgxMDAsIDEwMCkpO1xuICAgICAqIG5vZGUuc2V0Q29udGVudFNpemUoMTAwLCAxMDApO1xuICAgICAqL1xuICAgIHNldENvbnRlbnRTaXplIChzaXplLCBoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxvY0NvbnRlbnRTaXplID0gdGhpcy5fY29udGVudFNpemU7XG4gICAgICAgIHZhciBjbG9uZTtcbiAgICAgICAgaWYgKGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoKHNpemUud2lkdGggPT09IGxvY0NvbnRlbnRTaXplLndpZHRoKSAmJiAoc2l6ZS5oZWlnaHQgPT09IGxvY0NvbnRlbnRTaXplLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGNsb25lID0gY2Muc2l6ZShsb2NDb250ZW50U2l6ZS53aWR0aCwgbG9jQ29udGVudFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLmhlaWdodCA9IHNpemUuaGVpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKChzaXplID09PSBsb2NDb250ZW50U2l6ZS53aWR0aCkgJiYgKGhlaWdodCA9PT0gbG9jQ29udGVudFNpemUuaGVpZ2h0KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgY2xvbmUgPSBjYy5zaXplKGxvY0NvbnRlbnRTaXplLndpZHRoLCBsb2NDb250ZW50U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG9jQ29udGVudFNpemUud2lkdGggPSBzaXplO1xuICAgICAgICAgICAgbG9jQ29udGVudFNpemUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTSVpFX09OKSB7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIGNsb25lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGFuY2hvciBwb2ludC48YnIvPlxuICAgICAqIEFuY2hvciBwb2ludCBpcyB0aGUgcG9pbnQgYXJvdW5kIHdoaWNoIGFsbCB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBvc2l0aW9uaW5nIG1hbmlwdWxhdGlvbnMgdGFrZSBwbGFjZS48YnIvPlxuICAgICAqIEl0J3MgbGlrZSBhIHBpbiBpbiB0aGUgbm9kZSB3aGVyZSBpdCBpcyBcImF0dGFjaGVkXCIgdG8gaXRzIHBhcmVudC4gPGJyLz5cbiAgICAgKiBUaGUgYW5jaG9yUG9pbnQgaXMgbm9ybWFsaXplZCwgbGlrZSBhIHBlcmNlbnRhZ2UuICgwLDApIG1lYW5zIHRoZSBib3R0b20tbGVmdCBjb3JuZXIgYW5kICgxLDEpIG1lYW5zIHRoZSB0b3AtcmlnaHQgY29ybmVyLiA8YnIvPlxuICAgICAqIEJ1dCB5b3UgY2FuIHVzZSB2YWx1ZXMgaGlnaGVyIHRoYW4gKDEsMSkgYW5kIGxvd2VyIHRoYW4gKDAsMCkgdG9vLiAgPGJyLz5cbiAgICAgKiBUaGUgZGVmYXVsdCBhbmNob3IgcG9pbnQgaXMgKDAuNSwwLjUpLCBzbyBpdCBzdGFydHMgYXQgdGhlIGNlbnRlciBvZiB0aGUgbm9kZS5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6IqC54K56ZSa54K577yM55So55m+5YiG5q+U6KGo56S644CCPGJyLz5cbiAgICAgKiDplJrngrnlupTnlKjkuo7miYDmnInlj5jmjaLlkozlnZDmoIfngrnnmoTmk43kvZzvvIzlroPlsLHlg4/lnKjoioLngrnkuIrov57mjqXlhbbniLboioLngrnnmoTlpKflpLTpkojjgII8YnIvPlxuICAgICAqIOmUmueCueaYr+agh+WHhuWMlueahO+8jOWwseWDj+eZvuWIhuavlOS4gOagt+OAgigw77yMMCkg6KGo56S65bem5LiL6KeS77yMKDHvvIwxKSDooajnpLrlj7PkuIrop5LjgII8YnIvPlxuICAgICAqIOS9huaYr+S9oOWPr+S7peS9v+eUqOavlO+8iDHvvIwx77yJ5pu06auY55qE5YC85oiW6ICF5q+U77yIMO+8jDDvvInmm7TkvY7nmoTlgLzjgII8YnIvPlxuICAgICAqIOm7mOiupOeahOmUmueCueaYr++8iDAuNe+8jDAuNe+8ie+8jOWboOatpOWug+W8gOWni+S6juiKgueCueeahOS4reW/g+S9jee9ruOAgjxici8+XG4gICAgICog5rOo5oSP77yaQ3JlYXRvciDkuK3nmoTplJrngrnku4XnlKjkuo7lrprkvY3miYDlnKjnmoToioLngrnvvIzlrZDoioLngrnnmoTlrprkvY3kuI3lj5flvbHlk43jgIJcbiAgICAgKiBAbWV0aG9kIGdldEFuY2hvclBvaW50XG4gICAgICogQHJldHVybiB7VmVjMn0gVGhlIGFuY2hvciBwb2ludCBvZiBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiTm9kZSBBbmNob3JQb2ludDogXCIgKyBub2RlLmdldEFuY2hvclBvaW50KCkpO1xuICAgICAqL1xuICAgIGdldEFuY2hvclBvaW50ICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnYyKHRoaXMuX2FuY2hvclBvaW50KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFNldHMgdGhlIGFuY2hvciBwb2ludCBpbiBwZXJjZW50LiA8YnIvPlxuICAgICAqIGFuY2hvciBwb2ludCBpcyB0aGUgcG9pbnQgYXJvdW5kIHdoaWNoIGFsbCB0cmFuc2Zvcm1hdGlvbnMgYW5kIHBvc2l0aW9uaW5nIG1hbmlwdWxhdGlvbnMgdGFrZSBwbGFjZS4gPGJyLz5cbiAgICAgKiBJdCdzIGxpa2UgYSBwaW4gaW4gdGhlIG5vZGUgd2hlcmUgaXQgaXMgXCJhdHRhY2hlZFwiIHRvIGl0cyBwYXJlbnQuIDxici8+XG4gICAgICogVGhlIGFuY2hvclBvaW50IGlzIG5vcm1hbGl6ZWQsIGxpa2UgYSBwZXJjZW50YWdlLiAoMCwwKSBtZWFucyB0aGUgYm90dG9tLWxlZnQgY29ybmVyIGFuZCAoMSwxKSBtZWFucyB0aGUgdG9wLXJpZ2h0IGNvcm5lci48YnIvPlxuICAgICAqIEJ1dCB5b3UgY2FuIHVzZSB2YWx1ZXMgaGlnaGVyIHRoYW4gKDEsMSkgYW5kIGxvd2VyIHRoYW4gKDAsMCkgdG9vLjxici8+XG4gICAgICogVGhlIGRlZmF1bHQgYW5jaG9yIHBvaW50IGlzICgwLjUsMC41KSwgc28gaXQgc3RhcnRzIGF0IHRoZSBjZW50ZXIgb2YgdGhlIG5vZGUuXG4gICAgICogISN6aFxuICAgICAqIOiuvue9rumUmueCueeahOeZvuWIhuavlOOAgjxici8+XG4gICAgICog6ZSa54K55bqU55So5LqO5omA5pyJ5Y+Y5o2i5ZKM5Z2Q5qCH54K555qE5pON5L2c77yM5a6D5bCx5YOP5Zyo6IqC54K55LiK6L+e5o6l5YW254i26IqC54K555qE5aSn5aS06ZKI44CCPGJyLz5cbiAgICAgKiDplJrngrnmmK/moIflh4bljJbnmoTvvIzlsLHlg4/nmb7liIbmr5TkuIDmoLfjgIIoMO+8jDApIOihqOekuuW3puS4i+inku+8jCgx77yMMSkg6KGo56S65Y+z5LiK6KeS44CCPGJyLz5cbiAgICAgKiDkvYbmmK/kvaDlj6/ku6Xkvb/nlKjmr5TvvIgx77yMMe+8ieabtOmrmOeahOWAvOaIluiAheavlO+8iDDvvIww77yJ5pu05L2O55qE5YC844CCPGJyLz5cbiAgICAgKiDpu5jorqTnmoTplJrngrnmmK/vvIgwLjXvvIwwLjXvvInvvIzlm6DmraTlroPlvIDlp4vkuo7oioLngrnnmoTkuK3lv4PkvY3nva7jgII8YnIvPlxuICAgICAqIOazqOaEj++8mkNyZWF0b3Ig5Lit55qE6ZSa54K55LuF55So5LqO5a6a5L2N5omA5Zyo55qE6IqC54K577yM5a2Q6IqC54K555qE5a6a5L2N5LiN5Y+X5b2x5ZON44CCXG4gICAgICogQG1ldGhvZCBzZXRBbmNob3JQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjMnxOdW1iZXJ9IHBvaW50IC0gVGhlIGFuY2hvciBwb2ludCBvZiBub2RlIG9yIFRoZSB4IGF4aXMgYW5jaG9yIG9mIG5vZGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt5XSAtIFRoZSB5IGF4aXMgYW5jaG9yIG9mIG5vZGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldEFuY2hvclBvaW50KGNjLnYyKDEsIDEpKTtcbiAgICAgKiBub2RlLnNldEFuY2hvclBvaW50KDEsIDEpO1xuICAgICAqL1xuICAgIHNldEFuY2hvclBvaW50IChwb2ludCwgeSkge1xuICAgICAgICB2YXIgbG9jQW5jaG9yUG9pbnQgPSB0aGlzLl9hbmNob3JQb2ludDtcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKChwb2ludC54ID09PSBsb2NBbmNob3JQb2ludC54KSAmJiAocG9pbnQueSA9PT0gbG9jQW5jaG9yUG9pbnQueSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbG9jQW5jaG9yUG9pbnQueCA9IHBvaW50Lng7XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC55ID0gcG9pbnQueTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgocG9pbnQgPT09IGxvY0FuY2hvclBvaW50LngpICYmICh5ID09PSBsb2NBbmNob3JQb2ludC55KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC54ID0gcG9pbnQ7XG4gICAgICAgICAgICBsb2NBbmNob3JQb2ludC55ID0geTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBUcmFuc2Zvcm1zIHBvc2l0aW9uIGZyb20gd29ybGQgc3BhY2UgdG8gbG9jYWwgc3BhY2UuXG4gICAgICogQG1ldGhvZCBfaW52VHJhbnNmb3JtUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dFxuICAgICAqIEBwYXJhbSB7VmVjM30gdmVjM1xuICAgICAqL1xuICAgIF9pbnZUcmFuc2Zvcm1Qb2ludCAob3V0LCBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9pbnZUcmFuc2Zvcm1Qb2ludChvdXQsIHBvcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNvcHkob3V0LCBwb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGx0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIC8vIG91dCA9IHBhcmVudF9pbnZfcG9zIC0gcG9zXG4gICAgICAgIFRycy50b1Bvc2l0aW9uKF90cFZlYzNhLCBsdHJzKTtcbiAgICAgICAgVmVjMy5zdWIob3V0LCBvdXQsIF90cFZlYzNhKTtcblxuICAgICAgICAvLyBvdXQgPSBpbnYocm90KSAqIG91dFxuICAgICAgICBUcnMudG9Sb3RhdGlvbihfdHBRdWF0YSwgbHRycyk7XG4gICAgICAgIFF1YXQuY29uanVnYXRlKF90cFF1YXRiLCBfdHBRdWF0YSk7XG4gICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChvdXQsIG91dCwgX3RwUXVhdGIpO1xuXG4gICAgICAgIC8vIG91dCA9ICgxL3NjYWxlKSAqIG91dFxuICAgICAgICBUcnMudG9TY2FsZShfdHBWZWMzYSwgbHRycyk7XG4gICAgICAgIFZlYzMuaW52ZXJzZVNhZmUoX3RwVmVjM2IsIF90cFZlYzNhKTtcbiAgICAgICAgVmVjMy5tdWwob3V0LCBvdXQsIF90cFZlYzNiKTtcblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG4gICAgXG4gICAgLypcbiAgICAgKiBDYWxjdWxhdGUgYW5kIHJldHVybiB3b3JsZCBwb3NpdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjM30gb3V0XG4gICAgICogQHJldHVybiB7VmVjM31cbiAgICAgKi9cbiAgICBnZXRXb3JsZFBvc2l0aW9uIChvdXQpIHtcbiAgICAgICAgVHJzLnRvUG9zaXRpb24ob3V0LCB0aGlzLl90cnMpO1xuICAgICAgICBsZXQgY3VyciA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgbGV0IGx0cnM7XG4gICAgICAgIHdoaWxlIChjdXJyKSB7XG4gICAgICAgICAgICBsdHJzID0gY3Vyci5fdHJzO1xuICAgICAgICAgICAgLy8gb3V0ID0gcGFyZW50X3NjYWxlICogcG9zXG4gICAgICAgICAgICBUcnMudG9TY2FsZShfZ3dwVmVjMywgbHRycyk7XG4gICAgICAgICAgICBWZWMzLm11bChvdXQsIG91dCwgX2d3cFZlYzMpO1xuICAgICAgICAgICAgLy8gb3V0ID0gcGFyZW50X3F1YXQgKiBvdXRcbiAgICAgICAgICAgIFRycy50b1JvdGF0aW9uKF9nd3BRdWF0LCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChvdXQsIG91dCwgX2d3cFF1YXQpO1xuICAgICAgICAgICAgLy8gb3V0ID0gb3V0ICsgcG9zXG4gICAgICAgICAgICBUcnMudG9Qb3NpdGlvbihfZ3dwVmVjMywgbHRycyk7XG4gICAgICAgICAgICBWZWMzLmFkZChvdXQsIG91dCwgX2d3cFZlYzMpO1xuICAgICAgICAgICAgY3VyciA9IGN1cnIuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldCB3b3JsZCBwb3NpdGlvbi5cbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2Qgc2V0V29ybGRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjM30gcG9zXG4gICAgICovXG4gICAgc2V0V29ybGRQb3NpdGlvbiAocG9zKSB7XG4gICAgICAgIGxldCBsdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB2YXIgb2xkUG9zaXRpb24gPSBuZXcgY2MuVmVjMyhsdHJzWzBdLCBsdHJzWzFdLCBsdHJzWzJdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOT1RFOiB0aGlzIGlzIGZhc3RlciB0aGFuIGludmVydCB3b3JsZCBtYXRyaXggYW5kIHRyYW5zZm9ybSB0aGUgcG9pbnRcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9pbnZUcmFuc2Zvcm1Qb2ludChfc3dwVmVjMywgcG9zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFZlYzMuY29weShfc3dwVmVjMywgcG9zKTtcbiAgICAgICAgfVxuICAgICAgICBUcnMuZnJvbVBvc2l0aW9uKGx0cnMsIF9zd3BWZWMzKTtcbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG5cbiAgICAgICAgLy8gZmFzdCBjaGVjayBldmVudFxuICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgIC8vIHNlbmQgZXZlbnRcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIG9sZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBDYWxjdWxhdGUgYW5kIHJldHVybiB3b3JsZCByb3RhdGlvblxuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtRdWF0fSBvdXRcbiAgICAgKiBAcmV0dXJuIHtRdWF0fVxuICAgICAqL1xuICAgIGdldFdvcmxkUm90YXRpb24gKG91dCkge1xuICAgICAgICBUcnMudG9Sb3RhdGlvbihfZ3dyUXVhdCwgdGhpcy5fdHJzKTtcbiAgICAgICAgUXVhdC5jb3B5KG91dCwgX2d3clF1YXQpO1xuICAgICAgICBsZXQgY3VyciA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgd2hpbGUgKGN1cnIpIHtcbiAgICAgICAgICAgIFRycy50b1JvdGF0aW9uKF9nd3JRdWF0LCBjdXJyLl90cnMpO1xuICAgICAgICAgICAgUXVhdC5tdWwob3V0LCBfZ3dyUXVhdCwgb3V0KTtcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgd29ybGQgcm90YXRpb24gd2l0aCBxdWF0ZXJuaW9uXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIHNldFdvcmxkUm90YXRpb25cbiAgICAgKiBAcGFyYW0ge1F1YXR9IHZhbFxuICAgICAqL1xuICAgIHNldFdvcmxkUm90YXRpb24gKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuZ2V0V29ybGRSb3RhdGlvbihfc3dyUXVhdCk7XG4gICAgICAgICAgICBRdWF0LmNvbmp1Z2F0ZShfc3dyUXVhdCwgX3N3clF1YXQpO1xuICAgICAgICAgICAgUXVhdC5tdWwoX3N3clF1YXQsIF9zd3JRdWF0LCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgUXVhdC5jb3B5KF9zd3JRdWF0LCB2YWwpO1xuICAgICAgICB9XG4gICAgICAgIFRycy5mcm9tUm90YXRpb24odGhpcy5fdHJzLCBfc3dyUXVhdCk7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvRXVsZXIoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1JPVEFUSU9OKTtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBDYWxjdWxhdGUgYW5kIHJldHVybiB3b3JsZCBzY2FsZVxuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFNjYWxlXG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXRcbiAgICAgKiBAcmV0dXJuIHtWZWMzfVxuICAgICAqL1xuICAgIGdldFdvcmxkU2NhbGUgKG91dCkge1xuICAgICAgICBUcnMudG9TY2FsZShfZ3dzVmVjMywgdGhpcy5fdHJzKTtcbiAgICAgICAgVmVjMy5jb3B5KG91dCwgX2d3c1ZlYzMpO1xuICAgICAgICBsZXQgY3VyciA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgd2hpbGUgKGN1cnIpIHtcbiAgICAgICAgICAgIFRycy50b1NjYWxlKF9nd3NWZWMzLCBjdXJyLl90cnMpO1xuICAgICAgICAgICAgVmVjMy5tdWwob3V0LCBvdXQsIF9nd3NWZWMzKTtcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgd29ybGQgc2NhbGUgd2l0aCB2ZWMzXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIHNldFdvcmxkU2NhbGVcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHNjYWxlXG4gICAgICovXG4gICAgc2V0V29ybGRTY2FsZSAoc2NhbGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmdldFdvcmxkU2NhbGUoX3N3c1ZlYzMpO1xuICAgICAgICAgICAgVmVjMy5kaXYoX3N3c1ZlYzMsIHNjYWxlLCBfc3dzVmVjMyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNvcHkoX3N3c1ZlYzMsIHNjYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBUcnMuZnJvbVNjYWxlKHRoaXMuX3RycywgX3N3c1ZlYzMpO1xuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcbiAgICB9LFxuXG4gICAgZ2V0V29ybGRSVCAob3V0KSB7XG4gICAgICAgIGxldCBvcG9zID0gX2d3cnRWZWMzYTtcbiAgICAgICAgbGV0IG9yb3QgPSBfZ3dydFF1YXRhO1xuICAgICAgICBsZXQgbHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgVHJzLnRvUG9zaXRpb24ob3BvcywgbHRycyk7XG4gICAgICAgIFRycy50b1JvdGF0aW9uKG9yb3QsIGx0cnMpO1xuXG4gICAgICAgIGxldCBjdXJyID0gdGhpcy5fcGFyZW50O1xuICAgICAgICB3aGlsZSAoY3Vycikge1xuICAgICAgICAgICAgbHRycyA9IGN1cnIuX3RycztcbiAgICAgICAgICAgIC8vIG9wb3MgPSBwYXJlbnRfbHNjYWxlICogbHBvc1xuICAgICAgICAgICAgVHJzLnRvU2NhbGUoX2d3cnRWZWMzYiwgbHRycyk7XG4gICAgICAgICAgICBWZWMzLm11bChvcG9zLCBvcG9zLCBfZ3dydFZlYzNiKTtcbiAgICAgICAgICAgIC8vIG9wb3MgPSBwYXJlbnRfbHJvdCAqIG9wb3NcbiAgICAgICAgICAgIFRycy50b1JvdGF0aW9uKF9nd3J0UXVhdGIsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1RdWF0KG9wb3MsIG9wb3MsIF9nd3J0UXVhdGIpO1xuICAgICAgICAgICAgLy8gb3BvcyA9IG9wb3MgKyBscG9zXG4gICAgICAgICAgICBUcnMudG9Qb3NpdGlvbihfZ3dydFZlYzNiLCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMuYWRkKG9wb3MsIG9wb3MsIF9nd3J0VmVjM2IpO1xuICAgICAgICAgICAgLy8gb3JvdCA9IGxyb3QgKiBvcm90XG4gICAgICAgICAgICBRdWF0Lm11bChvcm90LCBfZ3dydFF1YXRiLCBvcm90KTtcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgTWF0NC5mcm9tUlQob3V0LCBvcm90LCBvcG9zKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXQgcm90YXRpb24gYnkgbG9va0F0IHRhcmdldCBwb2ludCwgbm9ybWFsbHkgdXNlZCBieSBDYW1lcmEgTm9kZVxuICAgICAqICEjemgg6YCa6L+H6KeC5a+f55uu5qCH5p2l6K6+572uIHJvdGF0aW9u77yM5LiA6Iis55So5LqOIENhbWVyYSBOb2RlIOS4ilxuICAgICAqIEBtZXRob2QgbG9va0F0XG4gICAgICogQHBhcmFtIHtWZWMzfSBwb3NcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IFt1cF0gLSBkZWZhdWx0IGlzICgwLDEsMClcbiAgICAgKi9cbiAgICBsb29rQXQgKHBvcywgdXApIHtcbiAgICAgICAgdGhpcy5nZXRXb3JsZFBvc2l0aW9uKF9sYVZlYzMpO1xuICAgICAgICBWZWMzLnN1YihfbGFWZWMzLCBfbGFWZWMzLCBwb3MpOyAvLyBOT1RFOiB3ZSB1c2UgLXogZm9yIHZpZXctZGlyXG4gICAgICAgIFZlYzMubm9ybWFsaXplKF9sYVZlYzMsIF9sYVZlYzMpO1xuICAgICAgICBRdWF0LmZyb21WaWV3VXAoX2xhUXVhdCwgX2xhVmVjMywgdXApO1xuICAgIFxuICAgICAgICB0aGlzLnNldFdvcmxkUm90YXRpb24oX2xhUXVhdCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVMb2NhbE1hdHJpeDogdXBkYXRlTG9jYWxNYXRyaXgyRCxcblxuICAgIF9jYWxjdWxXb3JsZE1hdHJpeCAoKSB7XG4gICAgICAgIC8vIEF2b2lkIGFzIG11Y2ggZnVuY3Rpb24gY2FsbCBhcyBwb3NzaWJsZVxuICAgICAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEFzc3VtZSBwYXJlbnQgd29ybGQgbWF0cml4IGlzIGNvcnJlY3RcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fbXVsTWF0KHRoaXMuX3dvcmxkTWF0cml4LCBwYXJlbnQuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgTWF0NC5jb3B5KHRoaXMuX3dvcmxkTWF0cml4LCB0aGlzLl9tYXRyaXgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgX211bE1hdDogbXVsTWF0MkQsXG5cbiAgICBfdXBkYXRlV29ybGRNYXRyaXggKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3dvcmxkTWF0RGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bFdvcmxkTWF0cml4KCk7XG4gICAgICAgICAgICAvLyBTeW5jIGRpcnR5IHRvIGNoaWxkcmVuXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW5baV0uX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldExvY2FsRGlydHkgKGZsYWcpIHtcbiAgICAgICAgdGhpcy5fbG9jYWxNYXREaXJ0eSB8PSBmbGFnO1xuICAgICAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoZmxhZyA9PT0gTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OIHx8IGZsYWcgPT09IExvY2FsRGlydHlGbGFnLlBPU0lUSU9OKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19XT1JMRF9UUkFOU0ZPUk07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XG4gICAgICAgIH0gICAgICAgIFxuICAgIH0sXG5cbiAgICBzZXRXb3JsZERpcnR5ICgpIHtcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBHZXQgdGhlIGxvY2FsIHRyYW5zZm9ybSBtYXRyaXggKDR4NCksIGJhc2VkIG9uIHBhcmVudCBub2RlIGNvb3JkaW5hdGVzXG4gICAgICogISN6aCDov5Tlm57lsYDpg6jnqbrpl7TlnZDmoIfns7vnmoTnn6npmLXvvIzln7rkuo7niLboioLngrnlnZDmoIfns7vjgIJcbiAgICAgKiBAbWV0aG9kIGdldExvY2FsTWF0cml4XG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdXQgVGhlIG1hdHJpeCBvYmplY3QgdG8gYmUgZmlsbGVkIHdpdGggZGF0YVxuICAgICAqIEByZXR1cm4ge01hdDR9IFNhbWUgYXMgdGhlIG91dCBtYXRyaXggb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgbWF0NCA9IGNjLm1hdDQoKTtcbiAgICAgKiBub2RlLmdldExvY2FsTWF0cml4KG1hdDQpO1xuICAgICAqL1xuICAgIGdldExvY2FsTWF0cml4IChvdXQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuY29weShvdXQsIHRoaXMuX21hdHJpeCk7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSB3b3JsZCB0cmFuc2Zvcm0gbWF0cml4ICg0eDQpXG4gICAgICogISN6aCDov5Tlm57kuJbnlYznqbrpl7TlnZDmoIfns7vnmoTnn6npmLXjgIJcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkTWF0cml4XG4gICAgICogQHBhcmFtIHtNYXQ0fSBvdXQgVGhlIG1hdHJpeCBvYmplY3QgdG8gYmUgZmlsbGVkIHdpdGggZGF0YVxuICAgICAqIEByZXR1cm4ge01hdDR9IFNhbWUgYXMgdGhlIG91dCBtYXRyaXggb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgbWF0NCA9IGNjLm1hdDQoKTtcbiAgICAgKiBub2RlLmdldFdvcmxkTWF0cml4KG1hdDQpO1xuICAgICAqL1xuICAgIGdldFdvcmxkTWF0cml4IChvdXQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIE1hdDQuY29weShvdXQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlcnRzIGEgUG9pbnQgdG8gbm9kZSAobG9jYWwpIHNwYWNlIGNvb3JkaW5hdGVzLlxuICAgICAqICEjemhcbiAgICAgKiDlsIbkuIDkuKrngrnovazmjaLliLDoioLngrkgKOWxgOmDqCkg56m66Ze05Z2Q5qCH57O744CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9Ob2RlU3BhY2VBUlxuICAgICAqIEBwYXJhbSB7VmVjM3xWZWMyfSB3b3JsZFBvaW50XG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IFtvdXRdXG4gICAgICogQHJldHVybiB7VmVjM3xWZWMyfVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29udmVydFRvTm9kZVNwYWNlQVI8VCBleHRlbmRzIGNjLlZlYzIgfCBjYy5WZWMzPih3b3JsZFBvaW50OiBULCBvdXQ/OiBUKTogVFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLnYyKDEwMCwgMTAwKSk7XG4gICAgICogdmFyIG5ld1ZlYzMgPSBub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKGNjLnYzKDEwMCwgMTAwLCAxMDApKTtcbiAgICAgKi9cbiAgICBjb252ZXJ0VG9Ob2RlU3BhY2VBUiAod29ybGRQb2ludCwgb3V0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIE1hdDQuaW52ZXJ0KF9tYXQ0X3RlbXAsIHRoaXMuX3dvcmxkTWF0cml4KTtcblxuICAgICAgICBpZiAod29ybGRQb2ludCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMigpO1xuICAgICAgICAgICAgcmV0dXJuIFZlYzIudHJhbnNmb3JtTWF0NChvdXQsIHdvcmxkUG9pbnQsIF9tYXQ0X3RlbXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBjYy5WZWMzKCk7XG4gICAgICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgd29ybGRQb2ludCwgX21hdDRfdGVtcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENvbnZlcnRzIGEgUG9pbnQgaW4gbm9kZSBjb29yZGluYXRlcyB0byB3b3JsZCBzcGFjZSBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poXG4gICAgICog5bCG6IqC54K55Z2Q5qCH57O75LiL55qE5LiA5Liq54K56L2s5o2i5Yiw5LiW55WM56m66Ze05Z2Q5qCH57O744CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9Xb3JsZFNwYWNlQVJcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gbm9kZVBvaW50XG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IFtvdXRdXG4gICAgICogQHJldHVybiB7VmVjM3xWZWMyfVxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogY29udmVydFRvV29ybGRTcGFjZUFSPFQgZXh0ZW5kcyBjYy5WZWMyIHwgY2MuVmVjMz4obm9kZVBvaW50OiBULCBvdXQ/OiBUKTogVFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MigxMDAsIDEwMCkpO1xuICAgICAqIHZhciBuZXdWZWMzID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjMoMTAwLCAxMDAsIDEwMCkpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb1dvcmxkU3BhY2VBUiAobm9kZVBvaW50LCBvdXQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgaWYgKG5vZGVQb2ludCBpbnN0YW5jZW9mIGNjLlZlYzIpIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMigpO1xuICAgICAgICAgICAgcmV0dXJuIFZlYzIudHJhbnNmb3JtTWF0NChvdXQsIG5vZGVQb2ludCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb3V0ID0gb3V0IHx8IG5ldyBjYy5WZWMzKCk7XG4gICAgICAgICAgICByZXR1cm4gVmVjMy50cmFuc2Zvcm1NYXQ0KG91dCwgbm9kZVBvaW50LCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4vLyBPTEQgVFJBTlNGT1JNIEFDQ0VTUyBBUElzXG4gLyoqXG4gICAgICogISNlbiBDb252ZXJ0cyBhIFBvaW50IHRvIG5vZGUgKGxvY2FsKSBzcGFjZSBjb29yZGluYXRlcyB0aGVuIGFkZCB0aGUgYW5jaG9yIHBvaW50IHBvc2l0aW9uLlxuICAgICAqIFNvIHRoZSByZXR1cm4gcG9zaXRpb24gd2lsbCBiZSByZWxhdGVkIHRvIHRoZSBsZWZ0IGJvdHRvbSBjb3JuZXIgb2YgdGhlIG5vZGUncyBib3VuZGluZyBib3guXG4gICAgICogVGhpcyBlcXVhbHMgdG8gdGhlIEFQSSBiZWhhdmlvciBvZiBjb2NvczJkLXgsIHlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSBjb252ZXJ0VG9Ob2RlU3BhY2VBUiBpbnN0ZWFkXG4gICAgICogISN6aCDlsIbkuIDkuKrngrnovazmjaLliLDoioLngrkgKOWxgOmDqCkg5Z2Q5qCH57O777yM5bm25Yqg5LiK6ZSa54K555qE5Z2Q5qCH44CCPGJyLz5cbiAgICAgKiDkuZ/lsLHmmK/or7Tov5Tlm57nmoTlnZDmoIfmmK/nm7jlr7nkuo7oioLngrnljIXlm7Tnm5Llt6bkuIvop5LnmoTlnZDmoIfjgII8YnIvPlxuICAgICAqIOi/meS4qiBBUEkg55qE6K6+6K6h5piv5Li65LqG5ZKMIGNvY29zMmQteCDkuK3ooYzkuLrkuIDoh7TvvIzmm7TlpJrmg4XlhrXkuIvkvaDlj6/og73pnIDopoHkvb/nlKggY29udmVydFRvTm9kZVNwYWNlQVLjgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb05vZGVTcGFjZVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjEuM1xuICAgICAqIEBwYXJhbSB7VmVjMn0gd29ybGRQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvTm9kZVNwYWNlKGNjLnYyKDEwMCwgMTAwKSk7XG4gICAgICovXG4gICAgY29udmVydFRvTm9kZVNwYWNlICh3b3JsZFBvaW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIE1hdDQuaW52ZXJ0KF9tYXQ0X3RlbXAsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgbGV0IG91dCA9IG5ldyBjYy5WZWMyKCk7XG4gICAgICAgIFZlYzIudHJhbnNmb3JtTWF0NChvdXQsIHdvcmxkUG9pbnQsIF9tYXQ0X3RlbXApO1xuICAgICAgICBvdXQueCArPSB0aGlzLl9hbmNob3JQb2ludC54ICogdGhpcy5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgIG91dC55ICs9IHRoaXMuX2FuY2hvclBvaW50LnkgKiB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ29udmVydHMgYSBQb2ludCByZWxhdGVkIHRvIHRoZSBsZWZ0IGJvdHRvbSBjb3JuZXIgb2YgdGhlIG5vZGUncyBib3VuZGluZyBib3ggdG8gd29ybGQgc3BhY2UgY29vcmRpbmF0ZXMuXG4gICAgICogVGhpcyBlcXVhbHMgdG8gdGhlIEFQSSBiZWhhdmlvciBvZiBjb2NvczJkLXgsIHlvdSBwcm9iYWJseSB3YW50IHRvIHVzZSBjb252ZXJ0VG9Xb3JsZFNwYWNlQVIgaW5zdGVhZFxuICAgICAqICEjemgg5bCG5LiA5Liq55u45a+55LqO6IqC54K55bem5LiL6KeS55qE5Z2Q5qCH5L2N572u6L2s5o2i5Yiw5LiW55WM56m66Ze05Z2Q5qCH57O744CCXG4gICAgICog6L+Z5LiqIEFQSSDnmoTorr7orqHmmK/kuLrkuoblkowgY29jb3MyZC14IOS4reihjOS4uuS4gOiHtO+8jOabtOWkmuaDheWGteS4i+S9oOWPr+iDvemcgOimgeS9v+eUqCBjb252ZXJ0VG9Xb3JsZFNwYWNlQVJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb1dvcmxkU3BhY2VcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IG5vZGVQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZShjYy52MigxMDAsIDEwMCkpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb1dvcmxkU3BhY2UgKG5vZGVQb2ludCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICBsZXQgb3V0ID0gbmV3IGNjLlZlYzIoXG4gICAgICAgICAgICBub2RlUG9pbnQueCAtIHRoaXMuX2FuY2hvclBvaW50LnggKiB0aGlzLl9jb250ZW50U2l6ZS53aWR0aCxcbiAgICAgICAgICAgIG5vZGVQb2ludC55IC0gdGhpcy5fYW5jaG9yUG9pbnQueSAqIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gVmVjMi50cmFuc2Zvcm1NYXQ0KG91dCwgb3V0LCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBtYXRyaXggdGhhdCB0cmFuc2Zvcm0gdGhlIG5vZGUncyAobG9jYWwpIHNwYWNlIGNvb3JkaW5hdGVzIGludG8gdGhlIHBhcmVudCdzIHNwYWNlIGNvb3JkaW5hdGVzLjxici8+XG4gICAgICogVGhlIG1hdHJpeCBpcyBpbiBQaXhlbHMuXG4gICAgICogISN6aCDov5Tlm57ov5nkuKrlsIboioLngrnvvIjlsYDpg6jvvInnmoTnqbrpl7TlnZDmoIfns7vovazmjaLmiJDniLboioLngrnnmoTnqbrpl7TlnZDmoIfns7vnmoTnn6npmLXjgILov5nkuKrnn6npmLXku6Xlg4/ntKDkuLrljZXkvY3jgIJcbiAgICAgKiBAbWV0aG9kIGdldE5vZGVUb1BhcmVudFRyYW5zZm9ybVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldE5vZGVUb1BhcmVudFRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldE5vZGVUb1BhcmVudFRyYW5zZm9ybSAob3V0KSB7XG4gICAgICAgIGlmICghb3V0KSB7XG4gICAgICAgICAgICBvdXQgPSBBZmZpbmVUcmFucy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLl9jb250ZW50U2l6ZTtcbiAgICAgICAgX3ZlYzNfdGVtcC54ID0gLXRoaXMuX2FuY2hvclBvaW50LnggKiBjb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgX3ZlYzNfdGVtcC55ID0gLXRoaXMuX2FuY2hvclBvaW50LnkgKiBjb250ZW50U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgTWF0NC5jb3B5KF9tYXQ0X3RlbXAsIHRoaXMuX21hdHJpeCk7XG4gICAgICAgIE1hdDQudHJhbnNmb3JtKF9tYXQ0X3RlbXAsIF9tYXQ0X3RlbXAsIF92ZWMzX3RlbXApO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMgaW50byB0aGUgcGFyZW50J3Mgc3BhY2UgY29vcmRpbmF0ZXMuPGJyLz5cbiAgICAgKiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy48YnIvPlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIEFSIChBbmNob3IgUmVsYXRpdmUpLlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57ov5nkuKrlsIboioLngrnvvIjlsYDpg6jvvInnmoTnqbrpl7TlnZDmoIfns7vovazmjaLmiJDniLboioLngrnnmoTnqbrpl7TlnZDmoIfns7vnmoTnn6npmLXjgII8YnIvPlxuICAgICAqIOi/meS4quefqemYteS7peWDj+e0oOS4uuWNleS9jeOAgjxici8+XG4gICAgICog6K+l5pa55rOV5Z+65LqO6IqC54K55Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtQVIgKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIHdvcmxkIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy5cbiAgICAgKiAhI3poIOi/lOWbnuiKgueCueWIsOS4lueVjOWdkOagh+ezu+eahOS7v+WwhOWPmOaNouefqemYteOAguefqemYteWNleS9jeaYr+WDj+e0oOOAglxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBjb250ZW50U2l6ZSA9IHRoaXMuX2NvbnRlbnRTaXplO1xuICAgICAgICBfdmVjM190ZW1wLnggPSAtdGhpcy5fYW5jaG9yUG9pbnQueCAqIGNvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICBfdmVjM190ZW1wLnkgPSAtdGhpcy5fYW5jaG9yUG9pbnQueSAqIGNvbnRlbnRTaXplLmhlaWdodDtcblxuICAgICAgICBNYXQ0LmNvcHkoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICBNYXQ0LnRyYW5zZm9ybShfbWF0NF90ZW1wLCBfbWF0NF90ZW1wLCBfdmVjM190ZW1wKTtcblxuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHdvcmxkIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy48YnIvPlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIEFSIChBbmNob3IgUmVsYXRpdmUpLlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57oioLngrnliLDkuJbnlYzlnZDmoIfku7/lsITlj5jmjaLnn6npmLXjgILnn6npmLXljZXkvY3mmK/lg4/ntKDjgII8YnIvPlxuICAgICAqIOivpeaWueazleWfuuS6juiKgueCueWdkOagh+OAglxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1BUlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVIoYWZmaW5lVHJhbnNmb3JtKTtcbiAgICAgKi9cbiAgICBnZXROb2RlVG9Xb3JsZFRyYW5zZm9ybUFSIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgbWF0cml4IHRoYXQgdHJhbnNmb3JtIHBhcmVudCdzIHNwYWNlIGNvb3JkaW5hdGVzIHRvIHRoZSBub2RlJ3MgKGxvY2FsKSBzcGFjZSBjb29yZGluYXRlcy48YnIvPlxuICAgICAqIFRoZSBtYXRyaXggaXMgaW4gUGl4ZWxzLiBUaGUgcmV0dXJuZWQgdHJhbnNmb3JtIGlzIHJlYWRvbmx5IGFuZCBjYW5ub3QgYmUgY2hhbmdlZC5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue5bCG54i26IqC54K555qE5Z2Q5qCH57O76L2s5o2i5oiQ6IqC54K577yI5bGA6YOo77yJ55qE56m66Ze05Z2Q5qCH57O755qE55+p6Zi144CCPGJyLz5cbiAgICAgKiDor6Xnn6npmLXku6Xlg4/ntKDkuLrljZXkvY3jgILov5Tlm57nmoTnn6npmLXmmK/lj6ror7vnmoTvvIzkuI3og73mm7TmlLnjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBhcmVudFRvTm9kZVRyYW5zZm9ybVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldFBhcmVudFRvTm9kZVRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldFBhcmVudFRvTm9kZVRyYW5zZm9ybSAob3V0KSB7XG4gICAgICAgIGlmICghb3V0KSB7XG4gICAgICAgICAgICBvdXQgPSBBZmZpbmVUcmFucy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgICAgIE1hdDQuaW52ZXJ0KF9tYXQ0X3RlbXAsIHRoaXMuX21hdHJpeCk7XG4gICAgICAgIHJldHVybiBBZmZpbmVUcmFucy5mcm9tTWF0NChvdXQsIF9tYXQ0X3RlbXApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgdGhlIGludmVyc2Ugd29ybGQgYWZmaW5lIHRyYW5zZm9ybSBtYXRyaXguIFRoZSBtYXRyaXggaXMgaW4gUGl4ZWxzLlxuICAgICAqICEjZW4g6L+U5Zue5LiW55WM5Z2Q5qCH57O75Yiw6IqC54K55Z2Q5qCH57O755qE6YCG55+p6Zi144CCXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZFRvTm9kZVRyYW5zZm9ybVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge0FmZmluZVRyYW5zZm9ybX0gW291dF0gVGhlIGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtBZmZpbmVUcmFuc2Zvcm19IFNhbWUgYXMgdGhlIG91dCBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IGFmZmluZVRyYW5zZm9ybSA9IGNjLkFmZmluZVRyYW5zZm9ybS5jcmVhdGUoKTtcbiAgICAgKiBub2RlLmdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm0gKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIHJldHVybiBBZmZpbmVUcmFucy5mcm9tTWF0NChvdXQsIF9tYXQ0X3RlbXApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIGNvbnZlbmllbmNlIG1ldGhvZHMgd2hpY2ggdGFrZSBhIGNjLlRvdWNoIGluc3RlYWQgb2YgY2MuVmVjMi5cbiAgICAgKiAhI3poIOWwhuinpuaRuOeCuei9rOaNouaIkOacrOWcsOWdkOagh+ezu+S4reS9jee9ruOAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvdWNoVG9Ob2RlU3BhY2VcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtUb3VjaH0gdG91Y2ggLSBUaGUgdG91Y2ggb2JqZWN0XG4gICAgICogQHJldHVybiB7VmVjMn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdWZWMyID0gbm9kZS5jb252ZXJ0VG91Y2hUb05vZGVTcGFjZSh0b3VjaCk7XG4gICAgICovXG4gICAgY29udmVydFRvdWNoVG9Ob2RlU3BhY2UgKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb05vZGVTcGFjZSh0b3VjaC5nZXRMb2NhdGlvbigpKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBjb252ZXJ0cyBhIGNjLlRvdWNoICh3b3JsZCBjb29yZGluYXRlcykgaW50byBhIGxvY2FsIGNvb3JkaW5hdGUuIFRoaXMgbWV0aG9kIGlzIEFSIChBbmNob3IgUmVsYXRpdmUpLlxuICAgICAqICEjemgg6L2s5o2i5LiA5LiqIGNjLlRvdWNo77yI5LiW55WM5Z2Q5qCH77yJ5Yiw5LiA5Liq5bGA6YOo5Z2Q5qCH77yM6K+l5pa55rOV5Z+65LqO6IqC54K55Z2Q5qCH44CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG91Y2hUb05vZGVTcGFjZUFSXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7VG91Y2h9IHRvdWNoIC0gVGhlIHRvdWNoIG9iamVjdFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUih0b3VjaCk7XG4gICAgICovXG4gICAgY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUiAodG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2guZ2V0TG9jYXRpb24oKSk7XG4gICAgfSxcbiAgICBcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIFwibG9jYWxcIiBheGlzIGFsaWduZWQgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLiA8YnIvPlxuICAgICAqIFRoZSByZXR1cm5lZCBib3ggaXMgcmVsYXRpdmUgb25seSB0byBpdHMgcGFyZW50LlxuICAgICAqICEjemgg6L+U5Zue54i26IqC5Z2Q5qCH57O75LiL55qE6L205ZCR5a+56b2Q55qE5YyF5Zu055uS44CCXG4gICAgICogQG1ldGhvZCBnZXRCb3VuZGluZ0JveFxuICAgICAqIEByZXR1cm4ge1JlY3R9IFRoZSBjYWxjdWxhdGVkIGJvdW5kaW5nIGJveCBvZiB0aGUgbm9kZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIGJvdW5kaW5nQm94ID0gbm9kZS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAqL1xuICAgIGdldEJvdW5kaW5nQm94ICgpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5fY29udGVudFNpemUud2lkdGg7XG4gICAgICAgIGxldCBoZWlnaHQgPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQ7XG4gICAgICAgIGxldCByZWN0ID0gY2MucmVjdChcbiAgICAgICAgICAgIC10aGlzLl9hbmNob3JQb2ludC54ICogd2lkdGgsIFxuICAgICAgICAgICAgLXRoaXMuX2FuY2hvclBvaW50LnkgKiBoZWlnaHQsIFxuICAgICAgICAgICAgd2lkdGgsIFxuICAgICAgICAgICAgaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHJlY3QudHJhbnNmb3JtTWF0NChyZWN0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIFwid29ybGRcIiBheGlzIGFsaWduZWQgYm91bmRpbmcgYm94IG9mIHRoZSBub2RlLjxici8+XG4gICAgICogVGhlIGJvdW5kaW5nIGJveCBjb250YWlucyBzZWxmIGFuZCBhY3RpdmUgY2hpbGRyZW4ncyB3b3JsZCBib3VuZGluZyBib3guXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuiKgueCueWcqOS4lueVjOWdkOagh+ezu+S4i+eahOWvuem9kOi9tOWQkeeahOWMheWbtOebku+8iEFBQkLvvInjgII8YnIvPlxuICAgICAqIOivpei+ueahhuWMheWQq+iHqui6q+WSjOW3sua/gOa0u+eahOWtkOiKgueCueeahOS4lueVjOi+ueahhuOAglxuICAgICAqIEBtZXRob2QgZ2V0Qm91bmRpbmdCb3hUb1dvcmxkXG4gICAgICogQHJldHVybiB7UmVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdSZWN0ID0gbm9kZS5nZXRCb3VuZGluZ0JveFRvV29ybGQoKTtcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0JveFRvV29ybGQgKCkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Qm91bmRpbmdCb3hUbygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZ2V0Qm91bmRpbmdCb3hUbyAoKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgcmVjdCA9IGNjLnJlY3QoXG4gICAgICAgICAgICAtdGhpcy5fYW5jaG9yUG9pbnQueCAqIHdpZHRoLCBcbiAgICAgICAgICAgIC10aGlzLl9hbmNob3JQb2ludC55ICogaGVpZ2h0LCBcbiAgICAgICAgICAgIHdpZHRoLCBcbiAgICAgICAgICAgIGhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9jYWxjdWxXb3JsZE1hdHJpeCgpO1xuICAgICAgICByZWN0LnRyYW5zZm9ybU1hdDQocmVjdCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuXG4gICAgICAgIC8vcXVlcnkgY2hpbGQncyBCb3VuZGluZ0JveFxuICAgICAgICBpZiAoIXRoaXMuX2NoaWxkcmVuKVxuICAgICAgICAgICAgcmV0dXJuIHJlY3Q7XG5cbiAgICAgICAgdmFyIGxvY0NoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGxvY0NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgaWYgKGNoaWxkICYmIGNoaWxkLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZFJlY3QgPSBjaGlsZC5fZ2V0Qm91bmRpbmdCb3hUbygpO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZFJlY3QpXG4gICAgICAgICAgICAgICAgICAgIHJlY3QudW5pb24ocmVjdCwgY2hpbGRSZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9LFxuXG4gICAgX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsICgpIHtcbiAgICAgICAgdmFyIGFycml2YWxPcmRlciA9IHRoaXMuX3BhcmVudCA/ICsrdGhpcy5fcGFyZW50Ll9jaGlsZEFycml2YWxPcmRlciA6IDA7XG4gICAgICAgIHRoaXMuX2xvY2FsWk9yZGVyID0gKHRoaXMuX2xvY2FsWk9yZGVyICYgMHhmZmZmMDAwMCkgfCBhcnJpdmFsT3JkZXI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJQkxJTkdfT1JERVJfQ0hBTkdFRCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBBZGRzIGEgY2hpbGQgdG8gdGhlIG5vZGUgd2l0aCB6IG9yZGVyIGFuZCBuYW1lLlxuICAgICAqICEjemhcbiAgICAgKiDmt7vliqDlrZDoioLngrnvvIzlubbkuJTlj6/ku6Xkv67mlLnor6XoioLngrnnmoQg5bGA6YOoIFog6aG65bqP5ZKM5ZCN5a2X44CCXG4gICAgICogQG1ldGhvZCBhZGRDaGlsZFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY2hpbGQgLSBBIGNoaWxkIG5vZGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3pJbmRleF0gLSBaIG9yZGVyIGZvciBkcmF3aW5nIHByaW9yaXR5LiBQbGVhc2UgcmVmZXIgdG8gekluZGV4IHByb3BlcnR5XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtuYW1lXSAtIEEgbmFtZSB0byBpZGVudGlmeSB0aGUgbm9kZSBlYXNpbHkuIFBsZWFzZSByZWZlciB0byBuYW1lIHByb3BlcnR5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLmFkZENoaWxkKG5ld05vZGUsIDEsIFwibm9kZVwiKTtcbiAgICAgKi9cbiAgICBhZGRDaGlsZCAoY2hpbGQsIHpJbmRleCwgbmFtZSkge1xuICAgICAgICBpZiAoQ0NfREVWICYmICFjYy5Ob2RlLmlzTm9kZShjaGlsZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDE2MzQsIGNjLmpzLmdldENsYXNzTmFtZShjaGlsZCkpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmFzc2VydElEKGNoaWxkLCAxNjA2KTtcbiAgICAgICAgY2MuYXNzZXJ0SUQoY2hpbGQuX3BhcmVudCA9PT0gbnVsbCwgMTYwNSk7XG5cbiAgICAgICAgLy8gaW52b2tlcyB0aGUgcGFyZW50IHNldHRlclxuICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzO1xuXG4gICAgICAgIGlmICh6SW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2hpbGQuekluZGV4ID0gekluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkLm5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgYWxsIHJ1bm5pbmcgYWN0aW9ucyBhbmQgc2NoZWR1bGVycy5cbiAgICAgKiAhI3poIOWBnOatouaJgOacieato+WcqOaSreaUvueahOWKqOS9nOWSjOiuoeaXtuWZqOOAglxuICAgICAqIEBtZXRob2QgY2xlYW51cFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5jbGVhbnVwKCk7XG4gICAgICovXG4gICAgY2xlYW51cCAoKSB7XG4gICAgICAgIC8vIGFjdGlvbnNcbiAgICAgICAgQWN0aW9uTWFuYWdlckV4aXN0ICYmIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBbGxBY3Rpb25zRnJvbVRhcmdldCh0aGlzKTtcbiAgICAgICAgLy8gZXZlbnRcbiAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVycyh0aGlzKTtcblxuICAgICAgICAvLyBjaGlsZHJlblxuICAgICAgICB2YXIgaSwgbGVuID0gdGhpcy5fY2hpbGRyZW4ubGVuZ3RoLCBub2RlO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlKVxuICAgICAgICAgICAgICAgIG5vZGUuY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU29ydHMgdGhlIGNoaWxkcmVuIGFycmF5IGRlcGVuZHMgb24gY2hpbGRyZW4ncyB6SW5kZXggYW5kIGFycml2YWxPcmRlcixcbiAgICAgKiBub3JtYWxseSB5b3Ugd29uJ3QgbmVlZCB0byBpbnZva2UgdGhpcyBmdW5jdGlvbi5cbiAgICAgKiAhI3poIOagueaNruWtkOiKgueCueeahCB6SW5kZXgg5ZKMIGFycml2YWxPcmRlciDov5vooYzmjpLluo/vvIzmraPluLjmg4XlhrXkuIvlvIDlj5HogIXkuI3pnIDopoHmiYvliqjosIPnlKjov5nkuKrlh73mlbDjgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2Qgc29ydEFsbENoaWxkcmVuXG4gICAgICovXG4gICAgc29ydEFsbENoaWxkcmVuICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3Jlb3JkZXJDaGlsZERpcnR5KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJDaGlsZERpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGRlbGF5IHVwZGF0ZSBhcnJpdmFsT3JkZXIgYmVmb3JlIHNvcnQgY2hpbGRyZW5cbiAgICAgICAgICAgIHZhciBfY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbiwgY2hpbGQ7XG4gICAgICAgICAgICAvLyByZXNldCBhcnJpdmFsT3JkZXIgYmVmb3JlIHNvcnQgY2hpbGRyZW5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkQXJyaXZhbE9yZGVyID0gMTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBfY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGlsZCA9IF9jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICBjaGlsZC5fdXBkYXRlT3JkZXJPZkFycml2YWwoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gT3B0aW1pemUgcmVvcmRlcmluZyBldmVudCBjb2RlIHRvIGZpeCBwcm9ibGVtcyB3aXRoIHNldHRpbmcgemluZGV4XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vY29jb3MtY3JlYXRvci8yZC10YXNrcy9pc3N1ZXMvMTE4NlxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLl9zZXREaXJ0eUZvck5vZGUodGhpcyk7XG5cbiAgICAgICAgICAgIGlmIChfY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIC8vIGluc2VydGlvbiBzb3J0XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkLCBjaGlsZDI7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDEsIGNvdW50ID0gX2NoaWxkcmVuLmxlbmd0aDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQgPSBfY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBqID0gaTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGogPiAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoaWxkMiA9IF9jaGlsZHJlbltqIC0gMV0pLl9sb2NhbFpPcmRlciA+IGNoaWxkLl9sb2NhbFpPcmRlcjsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfY2hpbGRyZW5bal0gPSBjaGlsZDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2NoaWxkcmVuW2pdID0gY2hpbGQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5DSElMRF9SRU9SREVSLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9fZmFzdE9mZihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHRoaXMuc29ydEFsbENoaWxkcmVuLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfZGVsYXlTb3J0ICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy5fcmVvcmRlckNoaWxkRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX19mYXN0T24oY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFLCB0aGlzLnNvcnRBbGxDaGlsZHJlbiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3Jlc3RvcmVQcm9wZXJ0aWVzOiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKCkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBUT0RPOiBSZWZpbmUgdGhpcyBjb2RlIGFmdGVyIGNvbXBsZXRpbmcgdW5kby9yZWRvIDIuMC5cbiAgICAgICAgICogVGhlIG5vZGUgd2lsbCBiZSBkZXN0cm95ZWQgd2hlbiBkZWxldGluZyBpbiB0aGUgZWRpdG9yLFxuICAgICAgICAgKiBidXQgaXQgd2lsbCBiZSByZXNlcnZlZCBhbmQgcmV1c2VkIGZvciB1bmRvLlxuICAgICAgICAqL1xuXG4gICAgICAgIC8vIHJlc3RvcmUgM2Qgbm9kZVxuICAgICAgICB0aGlzLmlzM0ROb2RlID0gdGhpcy5pczNETm9kZTtcblxuICAgICAgICBpZiAoIXRoaXMuX21hdHJpeCkge1xuICAgICAgICAgICAgdGhpcy5fbWF0cml4ID0gY2MubWF0NCh0aGlzLl9zcGFjZUluZm8ubG9jYWxNYXQpO1xuICAgICAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl9tYXRyaXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fd29ybGRNYXRyaXgpIHtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkTWF0cml4ID0gY2MubWF0NCh0aGlzLl9zcGFjZUluZm8ud29ybGRNYXQpO1xuICAgICAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2NhbE1hdERpcnR5ID0gTG9jYWxEaXJ0eUZsYWcuQUxMO1xuICAgICAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9mcm9tRXVsZXIoKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckNvbXBvbmVudC5tYXJrRm9yUmVuZGVyKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2NoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX0NISUxEUkVOO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uUmVzdG9yZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fb25SZXN0b3JlQmFzZSgpO1xuXG4gICAgICAgIHRoaXMuX3Jlc3RvcmVQcm9wZXJ0aWVzKCk7XG5cbiAgICAgICAgdmFyIGFjdGlvbk1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCk7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgYWN0aW9uTWFuYWdlciAmJiBhY3Rpb25NYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhY3Rpb25NYW5hZ2VyICYmIGFjdGlvbk1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbn07XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICAvLyBkZXByZWNhdGVkLCBvbmx5IHVzZWQgdG8gaW1wb3J0IG9sZCBkYXRhIGluIGVkaXRvclxuICAgIGpzLm1peGluKE5vZGVEZWZpbmVzLnByb3BlcnRpZXMsIHtcbiAgICAgICAgX3NjYWxlWDoge1xuICAgICAgICAgICAgZGVmYXVsdDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICBlZGl0b3JPbmx5OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIF9zY2FsZVk6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZVxuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG5sZXQgTm9kZSA9IGNjLkNsYXNzKE5vZGVEZWZpbmVzKTtcblxuLy8gM0QgTm9kZSBQcm9wZXJ0eVxuXG5cbi8vIE5vZGUgRXZlbnRcblxuLyoqXG4gKiAhI2VuXG4gKiBUaGUgcG9zaXRpb24gY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDkvY3nva7lj5jliqjnm5HlkKzkuovku7YsIOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBwb3NpdGlvbi1jaGFuZ2VkXG4gKiBAcGFyYW0ge1ZlYzJ9IG9sZFBvcyAtIFRoZSBvbGQgcG9zaXRpb24sIGJ1dCB0aGlzIHBhcmFtZXRlciBpcyBvbmx5IGF2YWlsYWJsZSBpbiBlZGl0b3IhXG4gKi9cbi8qKlxuICogISNlblxuICogVGhlIHNpemUgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWwuuWvuOWPmOWKqOebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7IOi/m+ihjOebkeWQrOOAglxuICogQGV2ZW50IHNpemUtY2hhbmdlZFxuICogQHBhcmFtIHtTaXplfSBvbGRTaXplIC0gVGhlIG9sZCBzaXplLCBidXQgdGhpcyBwYXJhbWV0ZXIgaXMgb25seSBhdmFpbGFibGUgaW4gZWRpdG9yIVxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBhbmNob3IgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog6ZSa54K55Y+Y5Yqo55uR5ZCs5LqL5Lu277yM6YCa6L+HIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBhbmNob3ItY2hhbmdlZFxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBhZGRpbmcgY2hpbGQgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9BRERFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog5aKe5Yqg5a2Q6IqC54K555uR5ZCs5LqL5Lu277yM6YCa6L+HIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9BRERFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1hZGRlZFxuICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIGNoaWxkIHdoaWNoIGhhdmUgYmVlbiBhZGRlZFxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSByZW1vdmluZyBjaGlsZCBldmVudCwgeW91IGNhbiBsaXN0ZW4gdG8gdGhpcyBldmVudCB0aHJvdWdoIHRoZSBzdGF0ZW1lbnQgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFTU9WRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWIoOmZpOWtkOiKgueCueebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfUkVNT1ZFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1yZW1vdmVkXG4gKiBAcGFyYW0ge05vZGV9IGNoaWxkIC0gY2hpbGQgd2hpY2ggaGF2ZSBiZWVuIHJlbW92ZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgcmVvcmRlcmluZyBjaGlsZCBldmVudCwgeW91IGNhbiBsaXN0ZW4gdG8gdGhpcyBldmVudCB0aHJvdWdoIHRoZSBzdGF0ZW1lbnQgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFT1JERVIsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWtkOiKgueCuemhuuW6j+WPmOWKqOebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfUkVPUkRFUiwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBjaGlsZC1yZW9yZGVyXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBub2RlIHdob3NlIGNoaWxkcmVuIGhhdmUgYmVlbiByZW9yZGVyZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgZ3JvdXAgY2hhbmdpbmcgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5HUk9VUF9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDoioLngrnliIbnu4Tlj5jliqjnm5HlkKzkuovku7bvvIzpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkdST1VQX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgZ3JvdXAtY2hhbmdlZFxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gbm9kZSB3aG9zZSBncm91cCBoYXMgY2hhbmdlZFxuICovXG5cbi8vIERlcHJlY2F0ZWQgQVBJc1xuXG4vKipcbiAqICEjZW5cbiAqIFJldHVybnMgdGhlIGRpc3BsYXllZCBvcGFjaXR5IG9mIE5vZGUsXG4gKiB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGRpc3BsYXllZCBvcGFjaXR5IGFuZCBvcGFjaXR5IGlzIHRoYXQgZGlzcGxheWVkIG9wYWNpdHkgaXMgY2FsY3VsYXRlZCBiYXNlZCBvbiBvcGFjaXR5IGFuZCBwYXJlbnQgbm9kZSdzIG9wYWNpdHkgd2hlbiBjYXNjYWRlIG9wYWNpdHkgZW5hYmxlZC5cbiAqICEjemhcbiAqIOiOt+WPluiKgueCueaYvuekuumAj+aYjuW6pu+8jFxuICog5pi+56S66YCP5piO5bqm5ZKM6YCP5piO5bqm5LmL6Ze055qE5LiN5ZCM5LmL5aSE5Zyo5LqO5b2T5ZCv55So57qn6L+e6YCP5piO5bqm5pe277yMXG4gKiDmmL7npLrpgI/mmI7luqbmmK/ln7rkuo7oh6rouqvpgI/mmI7luqblkozniLboioLngrnpgI/mmI7luqborqHnrpfnmoTjgIJcbiAqXG4gKiBAbWV0aG9kIGdldERpc3BsYXllZE9wYWNpdHlcbiAqIEByZXR1cm4ge251bWJlcn0gZGlzcGxheWVkIG9wYWNpdHlcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjAsIHBsZWFzZSB1c2Ugb3BhY2l0eSBwcm9wZXJ0eSwgY2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIFJldHVybnMgdGhlIGRpc3BsYXllZCBjb2xvciBvZiBOb2RlLFxuICogdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBkaXNwbGF5ZWQgY29sb3IgYW5kIGNvbG9yIGlzIHRoYXQgZGlzcGxheWVkIGNvbG9yIGlzIGNhbGN1bGF0ZWQgYmFzZWQgb24gY29sb3IgYW5kIHBhcmVudCBub2RlJ3MgY29sb3Igd2hlbiBjYXNjYWRlIGNvbG9yIGVuYWJsZWQuXG4gKiAhI3poXG4gKiDojrflj5boioLngrnnmoTmmL7npLrpopzoibLvvIxcbiAqIOaYvuekuuminOiJsuWSjOminOiJsuS5i+mXtOeahOS4jeWQjOS5i+WkhOWcqOS6juW9k+WQr+eUqOe6p+i/numinOiJsuaXtu+8jFxuICog5pi+56S66aKc6Imy5piv5Z+65LqO6Ieq6Lqr6aKc6Imy5ZKM54i26IqC54K56aKc6Imy6K6h566X55qE44CCXG4gKlxuICogQG1ldGhvZCBnZXREaXNwbGF5ZWRDb2xvclxuICogQHJldHVybiB7Q29sb3J9XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wLCBwbGVhc2UgdXNlIGNvbG9yIHByb3BlcnR5LCBjYXNjYWRlIGNvbG9yIGlzIHJlbW92ZWRcbiAqL1xuXG4vKipcbiAqICEjZW4gQ2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWQgZnJvbSB2Mi4wXG4gKiBJbmRpY2F0ZSB3aGV0aGVyIG5vZGUncyBvcGFjaXR5IHZhbHVlIGFmZmVjdCBpdHMgY2hpbGQgbm9kZXMsIGRlZmF1bHQgdmFsdWUgaXMgdHJ1ZS5cbiAqICEjemgg6YCP5piO5bqm57qn6IGU5Yqf6IO95LuOIHYyLjAg5byA5aeL5bey56e76ZmkXG4gKiDoioLngrnnmoTkuI3pgI/mmI7luqblgLzmmK/lkKblvbHlk43lhbblrZDoioLngrnvvIzpu5jorqTlgLzkuLogdHJ1ZeOAglxuICogQHByb3BlcnR5IGNhc2NhZGVPcGFjaXR5XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqL1xuXG4vKipcbiAqICEjZW4gQ2FzY2FkZSBvcGFjaXR5IGlzIHJlbW92ZWQgZnJvbSB2Mi4wXG4gKiBSZXR1cm5zIHdoZXRoZXIgbm9kZSdzIG9wYWNpdHkgdmFsdWUgYWZmZWN0IGl0cyBjaGlsZCBub2Rlcy5cbiAqICEjemgg6YCP5piO5bqm57qn6IGU5Yqf6IO95LuOIHYyLjAg5byA5aeL5bey56e76ZmkXG4gKiDov5Tlm57oioLngrnnmoTkuI3pgI/mmI7luqblgLzmmK/lkKblvbHlk43lhbblrZDoioLngrnjgIJcbiAqIEBtZXRob2QgaXNDYXNjYWRlT3BhY2l0eUVuYWJsZWRcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuLyoqXG4gKiAhI2VuIENhc2NhZGUgb3BhY2l0eSBpcyByZW1vdmVkIGZyb20gdjIuMFxuICogRW5hYmxlIG9yIGRpc2FibGUgY2FzY2FkZSBvcGFjaXR5LCBpZiBjYXNjYWRlIGVuYWJsZWQsIGNoaWxkIG5vZGVzJyBvcGFjaXR5IHdpbGwgYmUgdGhlIG11bHRpcGxpY2F0aW9uIG9mIHBhcmVudCBvcGFjaXR5IGFuZCBpdHMgb3duIG9wYWNpdHkuXG4gKiAhI3poIOmAj+aYjuW6pue6p+iBlOWKn+iDveS7jiB2Mi4wIOW8gOWni+W3suenu+mZpFxuICog5ZCv55So5oiW56aB55So57qn6L+e5LiN6YCP5piO5bqm77yM5aaC5p6c57qn6L+e5ZCv55So77yM5a2Q6IqC54K555qE5LiN6YCP5piO5bqm5bCG5piv54i25LiN6YCP5piO5bqm5LmY5LiK5a6D6Ieq5bex55qE5LiN6YCP5piO5bqm44CCXG4gKiBAbWV0aG9kIHNldENhc2NhZGVPcGFjaXR5RW5hYmxlZFxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICogQHBhcmFtIHtCb29sZWFufSBjYXNjYWRlT3BhY2l0eUVuYWJsZWRcbiAqL1xuXG4vKipcbiAqICEjZW4gT3BhY2l0eSBtb2RpZnkgUkdCIGhhdmUgYmVlbiByZW1vdmVkIHNpbmNlIHYyLjBcbiAqIFNldCB3aGV0aGVyIGNvbG9yIHNob3VsZCBiZSBjaGFuZ2VkIHdpdGggdGhlIG9wYWNpdHkgdmFsdWUsXG4gKiB1c2VsZXNzIGluIGNjc2cuTm9kZSwgYnV0IHRoaXMgZnVuY3Rpb24gaXMgb3ZlcnJpZGUgaW4gc29tZSBjbGFzcyB0byBoYXZlIHN1Y2ggYmVoYXZpb3IuXG4gKiAhI3poIOmAj+aYjuW6puW9seWTjeminOiJsumFjee9ruW3sue7j+iiq+W6n+W8g1xuICog6K6+572u5pu05pS56YCP5piO5bqm5pe25piv5ZCm5L+u5pS5UkdC5YC877yMXG4gKiBAbWV0aG9kIHNldE9wYWNpdHlNb2RpZnlSR0JcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3BhY2l0eVZhbHVlXG4gKi9cblxuLyoqXG4gKiAhI2VuIE9wYWNpdHkgbW9kaWZ5IFJHQiBoYXZlIGJlZW4gcmVtb3ZlZCBzaW5jZSB2Mi4wXG4gKiBHZXQgd2hldGhlciBjb2xvciBzaG91bGQgYmUgY2hhbmdlZCB3aXRoIHRoZSBvcGFjaXR5IHZhbHVlLlxuICogISN6aCDpgI/mmI7luqblvbHlk43popzoibLphY3nva7lt7Lnu4/ooqvlup/lvINcbiAqIOiOt+WPluabtOaUuemAj+aYjuW6puaXtuaYr+WQpuS/ruaUuVJHQuWAvOOAglxuICogQG1ldGhvZCBpc09wYWNpdHlNb2RpZnlSR0JcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuXG5sZXQgX3AgPSBOb2RlLnByb3RvdHlwZTtcbmpzLmdldHNldChfcCwgJ3Bvc2l0aW9uJywgX3AuZ2V0UG9zaXRpb24sIF9wLnNldFBvc2l0aW9uLCBmYWxzZSwgdHJ1ZSk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBsZXQgdmVjM190bXAgPSBuZXcgVmVjMygpO1xuICAgIGNjLmpzLmdldHNldChfcCwgJ3dvcmxkRXVsZXJBbmdsZXMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBhbmdsZXMgPSBuZXcgVmVjMyh0aGlzLl9ldWxlckFuZ2xlcyk7XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgYW5nbGVzLmFkZFNlbGYocGFyZW50Ll9ldWxlckFuZ2xlcyk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbmdsZXM7XG4gICAgfSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgdmVjM190bXAuc2V0KHYpO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHZlYzNfdG1wLnN1YlNlbGYocGFyZW50Ll9ldWxlckFuZ2xlcyk7XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXVsZXJBbmdsZXMgPSB2ZWMzX3RtcDtcbiAgICB9KTtcbn1cblxuY2MuTm9kZSA9IG1vZHVsZS5leHBvcnRzID0gTm9kZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9