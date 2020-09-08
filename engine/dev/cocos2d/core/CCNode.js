
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
    } // Remove all event listeners if necessary


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

    ;

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

    ;

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
    var forDispatch = this._checknSetupSysEvent(type);

    var listeners = null;

    if (forDispatch && useCapture) {
      listeners = this._capturingListeners = this._capturingListeners || new EventTarget();
    } else {
      listeners = this._bubblingListeners = this._bubblingListeners || new EventTarget();
    }

    listeners.once(type, callback, target);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDTm9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlTm9kZSIsInJlcXVpcmUiLCJQcmVmYWJIZWxwZXIiLCJub2RlTWVtUG9vbCIsIk5vZGVNZW1Qb29sIiwiQWZmaW5lVHJhbnMiLCJldmVudE1hbmFnZXIiLCJtYWNybyIsImpzIiwiRXZlbnQiLCJFdmVudFRhcmdldCIsIlJlbmRlckZsb3ciLCJGbGFncyIsImNjIiwiT2JqZWN0IiwiRGVzdHJveWluZyIsIkVSUl9JTlZBTElEX05VTUJFUiIsIkNDX0VESVRPUiIsIk9ORV9ERUdSRUUiLCJNYXRoIiwiUEkiLCJBY3Rpb25NYW5hZ2VyRXhpc3QiLCJBY3Rpb25NYW5hZ2VyIiwiZW1wdHlGdW5jIiwiX2d3cFZlYzMiLCJWZWMzIiwiX2d3cFF1YXQiLCJRdWF0IiwiX3RwVmVjM2EiLCJfdHBWZWMzYiIsIl90cFF1YXRhIiwiX3RwUXVhdGIiLCJfc3dwVmVjMyIsIl9nd3NWZWMzIiwiX3N3c1ZlYzMiLCJfZ3dydFZlYzNhIiwiX2d3cnRWZWMzYiIsIl9nd3J0UXVhdGEiLCJfZ3dydFF1YXRiIiwiX2xhVmVjMyIsIl9sYVF1YXQiLCJfdXJmVmVjMyIsIl91cmZRdWF0IiwiX2h0VmVjM2EiLCJfaHRWZWMzYiIsIl9nd3JRdWF0IiwiX3N3clF1YXQiLCJfcXVhdGEiLCJfbWF0NF90ZW1wIiwibWF0NCIsIl92ZWMzX3RlbXAiLCJfY2FjaGVkQXJyYXkiLCJBcnJheSIsImxlbmd0aCIsIlBPU0lUSU9OX09OIiwiU0NBTEVfT04iLCJST1RBVElPTl9PTiIsIlNJWkVfT04iLCJBTkNIT1JfT04iLCJDT0xPUl9PTiIsIkJ1aWx0aW5Hcm91cEluZGV4IiwiRW51bSIsIkRFQlVHIiwiTG9jYWxEaXJ0eUZsYWciLCJQT1NJVElPTiIsIlNDQUxFIiwiUk9UQVRJT04iLCJTS0VXIiwiVFJTIiwiUlMiLCJUUlNTIiwiUEhZU0lDU19QT1NJVElPTiIsIlBIWVNJQ1NfU0NBTEUiLCJQSFlTSUNTX1JPVEFUSU9OIiwiUEhZU0lDU19UUlMiLCJQSFlTSUNTX1JTIiwiQUxMX1BPU0lUSU9OIiwiQUxMX1NDQUxFIiwiQUxMX1JPVEFUSU9OIiwiQUxMX1RSUyIsIkFMTCIsIkV2ZW50VHlwZSIsIlRPVUNIX1NUQVJUIiwiVE9VQ0hfTU9WRSIsIlRPVUNIX0VORCIsIlRPVUNIX0NBTkNFTCIsIk1PVVNFX0RPV04iLCJNT1VTRV9NT1ZFIiwiTU9VU0VfRU5URVIiLCJNT1VTRV9MRUFWRSIsIk1PVVNFX1VQIiwiTU9VU0VfV0hFRUwiLCJQT1NJVElPTl9DSEFOR0VEIiwiUk9UQVRJT05fQ0hBTkdFRCIsIlNDQUxFX0NIQU5HRUQiLCJTSVpFX0NIQU5HRUQiLCJBTkNIT1JfQ0hBTkdFRCIsIkNPTE9SX0NIQU5HRUQiLCJDSElMRF9BRERFRCIsIkNISUxEX1JFTU9WRUQiLCJDSElMRF9SRU9SREVSIiwiR1JPVVBfQ0hBTkdFRCIsIlNJQkxJTkdfT1JERVJfQ0hBTkdFRCIsIl90b3VjaEV2ZW50cyIsIl9tb3VzZUV2ZW50cyIsIl9za2V3TmVlZFdhcm4iLCJfc2tld1dhcm4iLCJ2YWx1ZSIsIm5vZGUiLCJub2RlUGF0aCIsIk5vZGVVdGlscyIsIkVkaXRvciIsImdldE5vZGVQYXRoIiwid2FybiIsIl9jdXJyZW50SG92ZXJlZCIsIl90b3VjaFN0YXJ0SGFuZGxlciIsInRvdWNoIiwiZXZlbnQiLCJwb3MiLCJnZXRMb2NhdGlvbiIsIm93bmVyIiwiX2hpdFRlc3QiLCJ0eXBlIiwiYnViYmxlcyIsImRpc3BhdGNoRXZlbnQiLCJfdG91Y2hNb3ZlSGFuZGxlciIsIl90b3VjaEVuZEhhbmRsZXIiLCJfdG91Y2hDYW5jZWxIYW5kbGVyIiwiX21vdXNlRG93bkhhbmRsZXIiLCJfbW91c2VNb3ZlSGFuZGxlciIsImhpdCIsIl9wcmV2aW91c0luIiwiX21vdXNlTGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJfbW91c2VVcEhhbmRsZXIiLCJfbW91c2VXaGVlbEhhbmRsZXIiLCJfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50IiwiY29tcCIsImluZGV4IiwibGlzdCIsImN1cnIiLCJOb2RlIiwiaXNOb2RlIiwiX3BhcmVudCIsImdldENvbXBvbmVudCIsIm5leHQiLCJwdXNoIiwiX2NoZWNrTGlzdGVuZXJzIiwiZXZlbnRzIiwiX29iakZsYWdzIiwiX2J1YmJsaW5nTGlzdGVuZXJzIiwiaSIsImwiLCJoYXNFdmVudExpc3RlbmVyIiwiX2NhcHR1cmluZ0xpc3RlbmVycyIsIl9kb0Rpc3BhdGNoRXZlbnQiLCJ0YXJnZXQiLCJfZ2V0Q2FwdHVyaW5nVGFyZ2V0cyIsImV2ZW50UGhhc2UiLCJjdXJyZW50VGFyZ2V0IiwiZW1pdCIsIl9wcm9wYWdhdGlvblN0b3BwZWQiLCJfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkIiwiX2dldEJ1YmJsaW5nVGFyZ2V0cyIsIl9nZXRBY3R1YWxHcm91cEluZGV4IiwiZ3JvdXBJbmRleCIsInBhcmVudCIsIl91cGRhdGVDdWxsaW5nTWFzayIsIl9jdWxsaW5nTWFzayIsIkNDX0pTQiIsIkNDX05BVElWRVJFTkRFUkVSIiwiX3Byb3h5IiwidXBkYXRlQ3VsbGluZ01hc2siLCJfY2hpbGRyZW4iLCJ1cGRhdGVMb2NhbE1hdHJpeDNEIiwiX2xvY2FsTWF0RGlydHkiLCJ0IiwiX21hdHJpeCIsInRtIiwibSIsIlRycyIsInRvTWF0NCIsIl90cnMiLCJfc2tld1giLCJfc2tld1kiLCJhIiwiYiIsImMiLCJkIiwic2t4IiwidGFuIiwic2t5IiwiSW5maW5pdHkiLCJfd29ybGRNYXREaXJ0eSIsInVwZGF0ZUxvY2FsTWF0cml4MkQiLCJkaXJ0eUZsYWciLCJ0cnMiLCJyb3RhdGlvbiIsIl9ldWxlckFuZ2xlcyIsInoiLCJoYXNTa2V3Iiwic3giLCJzeSIsInJvdGF0aW9uUmFkaWFucyIsInNpbiIsImNvcyIsImNhbGN1bFdvcmxkTWF0cml4M0QiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJwYXJlbnRNYXQiLCJfd29ybGRNYXRyaXgiLCJNYXQ0IiwibXVsIiwiY29weSIsImNhbGN1bFdvcmxkTWF0cml4MkQiLCJfbXVsTWF0IiwibXVsTWF0MkQiLCJvdXQiLCJhbSIsImJtIiwib3V0bSIsImFhIiwiYWIiLCJhYyIsImFkIiwiYXR4IiwiYXR5IiwiYmEiLCJiYiIsImJjIiwiYmQiLCJidHgiLCJidHkiLCJtdWxNYXQzRCIsIk5vZGVEZWZpbmVzIiwibmFtZSIsInByb3BlcnRpZXMiLCJfb3BhY2l0eSIsIl9jb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJfY29udGVudFNpemUiLCJTaXplIiwiX2FuY2hvclBvaW50IiwidjIiLCJfcG9zaXRpb24iLCJ1bmRlZmluZWQiLCJfc2NhbGUiLCJfekluZGV4IiwiSW50ZWdlciIsIl9sb2NhbFpPcmRlciIsInNlcmlhbGl6YWJsZSIsIl9pczNETm9kZSIsIl9ncm91cEluZGV4IiwiZm9ybWVybHlTZXJpYWxpemVkQXMiLCJnZXQiLCJzZXQiLCJncm91cCIsImdhbWUiLCJncm91cExpc3QiLCJpbmRleE9mIiwieCIsImlzRmluaXRlIiwib2xkVmFsdWUiLCJzZXRMb2NhbERpcnR5IiwiX2V2ZW50TWFzayIsImVycm9yIiwieSIsIl9yZW5kZXJGbGFnIiwiRkxBR19XT1JMRF9UUkFOU0ZPUk0iLCJDQ19ERUJVRyIsImFuZ2xlIiwiZnJvbUFuZ2xlWiIsInJvdGF0aW9uWCIsImZyb21FdWxlck51bWJlciIsInJvdGF0aW9uWSIsImV1bGVyQW5nbGVzIiwidG9FdWxlciIsInYiLCJmcm9tRXVsZXIiLCJGTEFHX1RSQU5TRk9STSIsInF1YXQiLCJzZXRSb3RhdGlvbiIsInNjYWxlIiwic2V0U2NhbGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJza2V3WCIsInVwZGF0ZVNrZXciLCJza2V3WSIsIm9wYWNpdHkiLCJtaXNjIiwiY2xhbXBmIiwidXBkYXRlT3BhY2l0eSIsIkZMQUdfT1BBQ0lUWV9DT0xPUiIsInJhbmdlIiwiY29sb3IiLCJjbG9uZSIsImVxdWFscyIsIkNDX0RFViIsIndhcm5JRCIsIkZMQUdfQ09MT1IiLCJhbmNob3JYIiwiYW5jaG9yUG9pbnQiLCJhbmNob3JZIiwid2lkdGgiLCJzaXplIiwiaGVpZ2h0IiwiekluZGV4IiwiTUFYX1pJTkRFWCIsIk1JTl9aSU5ERVgiLCJfb25TaWJsaW5nSW5kZXhDaGFuZ2VkIiwiaXMzRE5vZGUiLCJfdXBkYXRlM0RGdW5jdGlvbiIsInVwIiwiX3VwIiwidHJhbnNmb3JtUXVhdCIsIlVQIiwiZ2V0V29ybGRSb3RhdGlvbiIsInJpZ2h0IiwiX3JpZ2h0IiwiUklHSFQiLCJmb3J3YXJkIiwiX2ZvcndhcmQiLCJGT1JXQVJEIiwiY3RvciIsIl9yZW9yZGVyQ2hpbGREaXJ0eSIsIl93aWRnZXQiLCJfcmVuZGVyQ29tcG9uZW50IiwiX3RvdWNoTGlzdGVuZXIiLCJfaW5pdERhdGFGcm9tUG9vbCIsIl9jaGlsZEFycml2YWxPcmRlciIsInJlbmRlcmVyIiwiTm9kZVByb3h5IiwiX3NwYWNlSW5mbyIsInVuaXRJRCIsIl9pZCIsIl9uYW1lIiwiaW5pdCIsInN0YXRpY3MiLCJfTG9jYWxEaXJ0eUZsYWciLCJvYmoiLCJjb25zdHJ1Y3RvciIsIlNjZW5lIiwiX2RlbGF5U29ydCIsIl9vblByZURlc3Ryb3kiLCJkZXN0cm95QnlQYXJlbnQiLCJfb25QcmVEZXN0cm95QmFzZSIsImRpcmVjdG9yIiwiZ2V0QWN0aW9uTWFuYWdlciIsInJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0IiwicmVtb3ZlTGlzdGVuZXJzIiwibWFzayIsImRlc3Ryb3kiLCJfYmFja0RhdGFJbnRvUG9vbCIsIl9fZmFzdE9mZiIsIkRpcmVjdG9yIiwiRVZFTlRfQUZURVJfVVBEQVRFIiwic29ydEFsbENoaWxkcmVuIiwiX29uUG9zdEFjdGl2YXRlZCIsImFjdGl2ZSIsImFjdGlvbk1hbmFnZXIiLCJyZXN1bWVUYXJnZXQiLCJfY2hlY2tMaXN0ZW5lck1hc2siLCJwYXVzZVRhcmdldCIsIl9vbkhpZXJhcmNoeUNoYW5nZWQiLCJvbGRQYXJlbnQiLCJfdXBkYXRlT3JkZXJPZkFycml2YWwiLCJfb25IaWVyYXJjaHlDaGFuZ2VkQmFzZSIsIl93aWRnZXRNYW5hZ2VyIiwiX25vZGVzT3JkZXJEaXJ0eSIsIl9hY3RpdmVJbkhpZXJhcmNoeSIsInVwZGF0ZVBhcmVudCIsIl9jYWxjdWxXb3JsZE1hdHJpeCIsIl9vbjNETm9kZUNoYW5nZWQiLCJ1cGRhdGUzRE5vZGUiLCJDQ19URVNUIiwiRmxvYXQ2NEFycmF5IiwibG9jYWxNYXQiLCJ3b3JsZE1hdCIsInBvcCIsInNwYWNlSW5mbyIsImlkZW50aXR5IiwiX3RvRXVsZXIiLCJhc2luIiwiX2Zyb21FdWxlciIsIl91cGdyYWRlXzF4X3RvXzJ4IiwiZGVzVHJzIiwic3ViYXJyYXkiLCJfb25CYXRjaENyZWF0ZWQiLCJwcmVmYWJJbmZvIiwiX3ByZWZhYiIsInN5bmMiLCJyb290IiwiYXNzZXJ0IiwiX3N5bmNlZCIsInN5bmNXaXRoUHJlZmFiIiwiY2hpbGRyZW4iLCJsZW4iLCJGTEFHX0NISUxEUkVOIiwiaW5pdE5hdGl2ZSIsIl9vbkJhdGNoUmVzdG9yZWQiLCJtYW5hZ2VyIiwiTWFzayIsIl9jaGVja25TZXR1cFN5c0V2ZW50IiwibmV3QWRkZWQiLCJmb3JEaXNwYXRjaCIsIkV2ZW50TGlzdGVuZXIiLCJjcmVhdGUiLCJUT1VDSF9PTkVfQllfT05FIiwic3dhbGxvd1RvdWNoZXMiLCJvblRvdWNoQmVnYW4iLCJvblRvdWNoTW92ZWQiLCJvblRvdWNoRW5kZWQiLCJvblRvdWNoQ2FuY2VsbGVkIiwiYWRkTGlzdGVuZXIiLCJNT1VTRSIsIm9uTW91c2VEb3duIiwib25Nb3VzZU1vdmUiLCJvbk1vdXNlVXAiLCJvbk1vdXNlU2Nyb2xsIiwiZ2V0U2NoZWR1bGVyIiwic2NoZWR1bGUiLCJvbiIsImNhbGxiYWNrIiwidXNlQ2FwdHVyZSIsIl9vbkRpc3BhdGNoIiwib25jZSIsImxpc3RlbmVycyIsImVycm9ySUQiLCJfX2V2ZW50VGFyZ2V0cyIsIm9mZiIsInRvdWNoRXZlbnQiLCJtb3VzZUV2ZW50IiwiX29mZkRpc3BhdGNoIiwicmVtb3ZlTGlzdGVuZXIiLCJoYXNMaXN0ZW5lcnMiLCJyZW1vdmVBbGwiLCJhcnJheSIsImZhc3RSZW1vdmUiLCJ0YXJnZXRPZmYiLCJoYXMiLCJhcmcxIiwiYXJnMiIsImFyZzMiLCJhcmc0IiwiYXJnNSIsInBhdXNlU3lzdGVtRXZlbnRzIiwicmVjdXJzaXZlIiwicmVzdW1lU3lzdGVtRXZlbnRzIiwicG9pbnQiLCJsaXN0ZW5lciIsInciLCJoIiwiY2FtZXJhUHQiLCJ0ZXN0UHQiLCJjYW1lcmEiLCJDYW1lcmEiLCJmaW5kQ2FtZXJhIiwiZ2V0U2NyZWVuVG9Xb3JsZFBvaW50IiwiX3VwZGF0ZVdvcmxkTWF0cml4IiwiaW52ZXJ0IiwiVmVjMiIsInRyYW5zZm9ybU1hdDQiLCJqIiwidGVtcCIsIl9lbmFibGVkIiwicnVuQWN0aW9uIiwiYWN0aW9uIiwiYXNzZXJ0SUQiLCJfc3VwcHJlc3NEZXByZWNhdGlvbiIsImFkZEFjdGlvbiIsInBhdXNlQWxsQWN0aW9ucyIsInJlc3VtZUFsbEFjdGlvbnMiLCJzdG9wQWxsQWN0aW9ucyIsInN0b3BBY3Rpb24iLCJyZW1vdmVBY3Rpb24iLCJzdG9wQWN0aW9uQnlUYWciLCJ0YWciLCJBY3Rpb24iLCJUQUdfSU5WQUxJRCIsImxvZ0lEIiwicmVtb3ZlQWN0aW9uQnlUYWciLCJnZXRBY3Rpb25CeVRhZyIsImdldE51bWJlck9mUnVubmluZ0FjdGlvbnMiLCJnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zSW5UYXJnZXQiLCJnZXRQb3NpdGlvbiIsInRvUG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsIm5ld1Bvc09yWCIsIm9sZFBvc2l0aW9uIiwiZ2V0U2NhbGUiLCJ0b1NjYWxlIiwiZ2V0Um90YXRpb24iLCJ0b1JvdGF0aW9uIiwiZ2V0Q29udGVudFNpemUiLCJzZXRDb250ZW50U2l6ZSIsImxvY0NvbnRlbnRTaXplIiwiZ2V0QW5jaG9yUG9pbnQiLCJzZXRBbmNob3JQb2ludCIsImxvY0FuY2hvclBvaW50IiwiX2ludlRyYW5zZm9ybVBvaW50IiwibHRycyIsInN1YiIsImNvbmp1Z2F0ZSIsImludmVyc2VTYWZlIiwiZ2V0V29ybGRQb3NpdGlvbiIsImFkZCIsInNldFdvcmxkUG9zaXRpb24iLCJmcm9tUG9zaXRpb24iLCJzZXRXb3JsZFJvdGF0aW9uIiwidmFsIiwiZnJvbVJvdGF0aW9uIiwiZ2V0V29ybGRTY2FsZSIsInNldFdvcmxkU2NhbGUiLCJkaXYiLCJmcm9tU2NhbGUiLCJnZXRXb3JsZFJUIiwib3BvcyIsIm9yb3QiLCJmcm9tUlQiLCJsb29rQXQiLCJub3JtYWxpemUiLCJmcm9tVmlld1VwIiwiZmxhZyIsInNldFdvcmxkRGlydHkiLCJnZXRMb2NhbE1hdHJpeCIsImdldFdvcmxkTWF0cml4IiwiY29udmVydFRvTm9kZVNwYWNlQVIiLCJ3b3JsZFBvaW50IiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwibm9kZVBvaW50IiwiY29udmVydFRvTm9kZVNwYWNlIiwiY29udmVydFRvV29ybGRTcGFjZSIsImdldE5vZGVUb1BhcmVudFRyYW5zZm9ybSIsImNvbnRlbnRTaXplIiwidHJhbnNmb3JtIiwiZnJvbU1hdDQiLCJnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUiIsImdldE5vZGVUb1dvcmxkVHJhbnNmb3JtIiwiZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1BUiIsImdldFBhcmVudFRvTm9kZVRyYW5zZm9ybSIsImdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtIiwiY29udmVydFRvdWNoVG9Ob2RlU3BhY2UiLCJjb252ZXJ0VG91Y2hUb05vZGVTcGFjZUFSIiwiZ2V0Qm91bmRpbmdCb3giLCJyZWN0IiwiZ2V0Qm91bmRpbmdCb3hUb1dvcmxkIiwiX2dldEJvdW5kaW5nQm94VG8iLCJsb2NDaGlsZHJlbiIsImNoaWxkIiwiY2hpbGRSZWN0IiwidW5pb24iLCJhcnJpdmFsT3JkZXIiLCJhZGRDaGlsZCIsImdldENsYXNzTmFtZSIsImNsZWFudXAiLCJfc2V0RGlydHlGb3JOb2RlIiwiY2hpbGQyIiwiY291bnQiLCJfX2Zhc3RPbiIsIl9yZXN0b3JlUHJvcGVydGllcyIsIm1hcmtGb3JSZW5kZXIiLCJvblJlc3RvcmUiLCJfb25SZXN0b3JlQmFzZSIsIm1peGluIiwiX3NjYWxlWCIsIkZsb2F0IiwiZWRpdG9yT25seSIsIl9zY2FsZVkiLCJDbGFzcyIsIl9wIiwicHJvdG90eXBlIiwiZ2V0c2V0IiwidmVjM190bXAiLCJhbmdsZXMiLCJhZGRTZWxmIiwic3ViU2VsZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUF4Qjs7QUFDQSxJQUFNQyxZQUFZLEdBQUdELE9BQU8sQ0FBQyx1QkFBRCxDQUE1Qjs7QUFDQSxJQUFNRSxXQUFXLEdBQUdGLE9BQU8sQ0FBQyxvQkFBRCxDQUFQLENBQThCRyxXQUFsRDs7QUFDQSxJQUFNQyxXQUFXLEdBQUdKLE9BQU8sQ0FBQywwQkFBRCxDQUEzQjs7QUFDQSxJQUFNSyxZQUFZLEdBQUdMLE9BQU8sQ0FBQyxpQkFBRCxDQUE1Qjs7QUFDQSxJQUFNTSxLQUFLLEdBQUdOLE9BQU8sQ0FBQyxvQkFBRCxDQUFyQjs7QUFDQSxJQUFNTyxFQUFFLEdBQUdQLE9BQU8sQ0FBQyxlQUFELENBQWxCOztBQUNBLElBQU1RLEtBQUssR0FBR1IsT0FBTyxDQUFDLGVBQUQsQ0FBckI7O0FBQ0EsSUFBTVMsV0FBVyxHQUFHVCxPQUFPLENBQUMsc0JBQUQsQ0FBM0I7O0FBQ0EsSUFBTVUsVUFBVSxHQUFHVixPQUFPLENBQUMsd0JBQUQsQ0FBMUI7O0FBRUEsSUFBTVcsS0FBSyxHQUFHQyxFQUFFLENBQUNDLE1BQUgsQ0FBVUYsS0FBeEI7QUFDQSxJQUFNRyxVQUFVLEdBQUdILEtBQUssQ0FBQ0csVUFBekI7QUFFQSxJQUFNQyxrQkFBa0IsR0FBR0MsU0FBUyxJQUFJLG1CQUF4QztBQUNBLElBQU1DLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxFQUFMLEdBQVUsR0FBN0I7QUFFQSxJQUFJQyxrQkFBa0IsR0FBRyxDQUFDLENBQUNSLEVBQUUsQ0FBQ1MsYUFBOUI7O0FB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QUFVRixFQUFWLEVBQWMsVUFBZCxFQUEwQkEsRUFBRSxDQUFDckYsV0FBN0IsRUFBMENxRixFQUFFLENBQUNuRixXQUE3QyxFQUEwRCxLQUExRCxFQUFpRSxJQUFqRTs7QUFFQSxJQUFJdmQsU0FBSixFQUFlO0FBQ1gsTUFBSTZpQixRQUFRLEdBQUcsSUFBSXJpQixnQkFBSixFQUFmO0FBQ0FaLEVBQUFBLEVBQUUsQ0FBQ0wsRUFBSCxDQUFNcWpCLE1BQU4sQ0FBYUYsRUFBYixFQUFpQixrQkFBakIsRUFBcUMsWUFBWTtBQUM3QyxRQUFJSSxNQUFNLEdBQUcsSUFBSXRpQixnQkFBSixDQUFTLEtBQUs2SyxZQUFkLENBQWI7QUFDQSxRQUFJaEMsTUFBTSxHQUFHLEtBQUtBLE1BQWxCOztBQUNBLFdBQU9BLE1BQVAsRUFBZTtBQUNYeVosTUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWUxWixNQUFNLENBQUNnQyxZQUF0QjtBQUNBaEMsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBQ0QsV0FBT3laLE1BQVA7QUFDSCxHQVJELEVBUUcsVUFBVTFTLENBQVYsRUFBYTtBQUNaeVMsSUFBQUEsUUFBUSxDQUFDL1QsR0FBVCxDQUFhc0IsQ0FBYjtBQUNBLFFBQUkvRyxNQUFNLEdBQUcsS0FBS0EsTUFBbEI7O0FBQ0EsV0FBT0EsTUFBUCxFQUFlO0FBQ1h3WixNQUFBQSxRQUFRLENBQUNHLE9BQVQsQ0FBaUIzWixNQUFNLENBQUNnQyxZQUF4QjtBQUNBaEMsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBQ0QsU0FBSzZHLFdBQUwsR0FBbUIyUyxRQUFuQjtBQUNILEdBaEJEO0FBaUJIOztBQUVEampCLEVBQUUsQ0FBQ2dJLElBQUgsR0FBVXFiLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRiLElBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zMmQteC5vcmdcblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgTWF0NCwgVmVjMiwgVmVjMywgUXVhdCwgVHJzIH0gZnJvbSAnLi92YWx1ZS10eXBlcyc7XG5cbmNvbnN0IEJhc2VOb2RlID0gcmVxdWlyZSgnLi91dGlscy9iYXNlLW5vZGUnKTtcbmNvbnN0IFByZWZhYkhlbHBlciA9IHJlcXVpcmUoJy4vdXRpbHMvcHJlZmFiLWhlbHBlcicpO1xuY29uc3Qgbm9kZU1lbVBvb2wgPSByZXF1aXJlKCcuL3V0aWxzL3RyYW5zLXBvb2wnKS5Ob2RlTWVtUG9vbDtcbmNvbnN0IEFmZmluZVRyYW5zID0gcmVxdWlyZSgnLi91dGlscy9hZmZpbmUtdHJhbnNmb3JtJyk7XG5jb25zdCBldmVudE1hbmFnZXIgPSByZXF1aXJlKCcuL2V2ZW50LW1hbmFnZXInKTtcbmNvbnN0IG1hY3JvID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9DQ01hY3JvJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4vcGxhdGZvcm0vanMnKTtcbmNvbnN0IEV2ZW50ID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudCcpO1xuY29uc3QgRXZlbnRUYXJnZXQgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50LXRhcmdldCcpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcblxuY29uc3QgRmxhZ3MgPSBjYy5PYmplY3QuRmxhZ3M7XG5jb25zdCBEZXN0cm95aW5nID0gRmxhZ3MuRGVzdHJveWluZztcblxuY29uc3QgRVJSX0lOVkFMSURfTlVNQkVSID0gQ0NfRURJVE9SICYmICdUaGUgJXMgaXMgaW52YWxpZCc7XG5jb25zdCBPTkVfREVHUkVFID0gTWF0aC5QSSAvIDE4MDtcblxudmFyIEFjdGlvbk1hbmFnZXJFeGlzdCA9ICEhY2MuQWN0aW9uTWFuYWdlcjtcbnZhciBlbXB0eUZ1bmMgPSBmdW5jdGlvbiAoKSB7fTtcblxuLy8gZ2V0V29ybGRQb3NpdGlvbiB0ZW1wIHZhclxudmFyIF9nd3BWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfZ3dwUXVhdCA9IG5ldyBRdWF0KCk7XG5cbi8vIF9pbnZUcmFuc2Zvcm1Qb2ludCB0ZW1wIHZhclxudmFyIF90cFZlYzNhID0gbmV3IFZlYzMoKTtcbnZhciBfdHBWZWMzYiA9IG5ldyBWZWMzKCk7XG52YXIgX3RwUXVhdGEgPSBuZXcgUXVhdCgpO1xudmFyIF90cFF1YXRiID0gbmV3IFF1YXQoKTtcblxuLy8gc2V0V29ybGRQb3NpdGlvbiB0ZW1wIHZhclxudmFyIF9zd3BWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRTY2FsZSB0ZW1wIHZhclxudmFyIF9nd3NWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gc2V0V29ybGRTY2FsZSB0ZW1wIHZhclxudmFyIF9zd3NWZWMzID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRSVCB0ZW1wIHZhclxudmFyIF9nd3J0VmVjM2EgPSBuZXcgVmVjMygpO1xudmFyIF9nd3J0VmVjM2IgPSBuZXcgVmVjMygpO1xudmFyIF9nd3J0UXVhdGEgPSBuZXcgUXVhdCgpO1xudmFyIF9nd3J0UXVhdGIgPSBuZXcgUXVhdCgpO1xuXG4vLyBsb29rQXQgdGVtcCB2YXJcbnZhciBfbGFWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfbGFRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy91cOOAgXJpZ2h044CBZm9yd2FyZCB0ZW1wIHZhclxudmFyIF91cmZWZWMzID0gbmV3IFZlYzMoKTtcbnZhciBfdXJmUXVhdCA9IG5ldyBRdWF0KCk7XG5cbi8vIF9oaXRUZXN0IHRlbXAgdmFyXG52YXIgX2h0VmVjM2EgPSBuZXcgVmVjMygpO1xudmFyIF9odFZlYzNiID0gbmV3IFZlYzMoKTtcblxuLy8gZ2V0V29ybGRSb3RhdGlvbiB0ZW1wIHZhclxudmFyIF9nd3JRdWF0ID0gbmV3IFF1YXQoKTtcblxuLy8gc2V0V29ybGRSb3RhdGlvbiB0ZW1wIHZhclxudmFyIF9zd3JRdWF0ID0gbmV3IFF1YXQoKTtcblxudmFyIF9xdWF0YSA9IG5ldyBRdWF0KCk7XG52YXIgX21hdDRfdGVtcCA9IGNjLm1hdDQoKTtcbnZhciBfdmVjM190ZW1wID0gbmV3IFZlYzMoKTtcblxudmFyIF9jYWNoZWRBcnJheSA9IG5ldyBBcnJheSgxNik7XG5fY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcblxuY29uc3QgUE9TSVRJT05fT04gPSAxIDw8IDA7XG5jb25zdCBTQ0FMRV9PTiA9IDEgPDwgMTtcbmNvbnN0IFJPVEFUSU9OX09OID0gMSA8PCAyO1xuY29uc3QgU0laRV9PTiA9IDEgPDwgMztcbmNvbnN0IEFOQ0hPUl9PTiA9IDEgPDwgNDtcbmNvbnN0IENPTE9SX09OID0gMSA8PCA1O1xuXG5cbmxldCBCdWlsdGluR3JvdXBJbmRleCA9IGNjLkVudW0oe1xuICAgIERFQlVHOiAzMVxufSk7XG5cbi8qKlxuICogISNlbiBOb2RlJ3MgbG9jYWwgZGlydHkgcHJvcGVydGllcyBmbGFnXG4gKiAhI3poIE5vZGUg55qE5pys5Zyw5bGe5oCnIGRpcnR5IOeKtuaAgeS9jVxuICogQGVudW0gTm9kZS5fTG9jYWxEaXJ0eUZsYWdcbiAqIEBzdGF0aWNcbiAqIEBwcml2YXRlXG4gKiBAbmFtZXNwYWNlIE5vZGVcbiAqL1xudmFyIExvY2FsRGlydHlGbGFnID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwb3NpdGlvbiBkaXJ0eVxuICAgICAqICEjemgg5L2N572uIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQT1NJVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQT1NJVElPTjogMSA8PCAwLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igc2NhbGUgZGlydHlcbiAgICAgKiAhI3poIOe8qeaUviBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgU0NBTEU6IDEgPDwgMSxcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHJvdGF0aW9uIGRpcnR5XG4gICAgICogISN6aCDml4vovawgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFJPVEFUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFJPVEFUSU9OOiAxIDw8IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBza2V3IGRpcnR5XG4gICAgICogISN6aCBza2V3IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBTS0VXXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFNLRVc6IDEgPDwgMyxcbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIHJvdGF0aW9uLCBzY2FsZSBvciBwb3NpdGlvbiBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s77yM57yp5pS+77yM5oiW5L2N572uIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVFJTOiAxIDw8IDAgfCAxIDw8IDEgfCAxIDw8IDIsXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciByb3RhdGlvbiBvciBzY2FsZSBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s5oiW57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBSUzogMSA8PCAxIHwgMSA8PCAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igcm90YXRpb24sIHNjYWxlLCBwb3NpdGlvbiwgc2tldyBkaXJ0eVxuICAgICAqICEjemgg5peL6L2s77yM57yp5pS+77yM5L2N572u77yM5oiW5pac6KeSIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBUUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVFJTUzogMSA8PCAwIHwgMSA8PCAxIHwgMSA8PCAyIHwgMSA8PCAzLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDniannkIbkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUE9TSVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19QT1NJVElPTjogMSA8PCA0LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHNjYWxlIGRpcnR5XG4gICAgICogISN6aCDniannkIbnvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19TQ0FMRTogMSA8PCA1LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHJvdGF0aW9uIGRpcnR5XG4gICAgICogISN6aCDniannkIbml4vovawgZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUk9UQVRJT05cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19ST1RBVElPTjogMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHRycyBkaXJ0eVxuICAgICAqICEjemgg54mp55CG5L2N572u5peL6L2s57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBQSFlTSUNTX1RSU1xuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBQSFlTSUNTX1RSUzogMSA8PCA0IHwgMSA8PCA1IHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBwaHlzaWNzIHJzIGRpcnR5XG4gICAgICogISN6aCDniannkIbml4vovaznvKnmlL4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IFBIWVNJQ1NfUlNcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUEhZU0lDU19SUzogMSA8PCA1IHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBub2RlIGFuZCBwaHlzaWNzIHBvc2l0aW9uIGRpcnR5XG4gICAgICogISN6aCDmiYDmnInkvY3nva4gZGlydHkg55qE5qCH6K6w5L2NXG4gICAgICogQHByb3BlcnR5IHtOdW1iZXJ9IEFMTF9QT1NJVElPTlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBBTExfUE9TSVRJT046IDEgPDwgMCB8IDEgPDwgNCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3Igbm9kZSBhbmQgcGh5c2ljcyBzY2FsZSBkaXJ0eVxuICAgICAqICEjemgg5omA5pyJ57yp5pS+IGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExfU0NBTEVcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQUxMX1NDQUxFOiAxIDw8IDEgfCAxIDw8IDUsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEZsYWcgZm9yIG5vZGUgYW5kIHBoeXNpY3Mgcm90YXRpb24gZGlydHlcbiAgICAgKiAhI3poIOaJgOacieaXi+i9rCBkaXJ0eSDnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxMX1JPVEFUSU9OXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTF9ST1RBVElPTjogMSA8PCAyIHwgMSA8PCA2LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBGbGFnIGZvciBub2RlIGFuZCBwaHlzaWNzIHRycyBkaXJ0eVxuICAgICAqICEjemgg5omA5pyJdHJzIGRpcnR5IOeahOagh+iusOS9jVxuICAgICAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBBTExfVFJTXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTF9UUlM6IDEgPDwgMCB8IDEgPDwgMSB8IDEgPDwgMiB8IDEgPDwgNCB8IDEgPDwgNSB8IDEgPDwgNixcblxuICAgIC8qKlxuICAgICAqICEjZW4gRmxhZyBmb3IgYWxsIGRpcnR5IHByb3BlcnRpZXNcbiAgICAgKiAhI3poIOimhuebluaJgOaciSBkaXJ0eSDnirbmgIHnmoTmoIforrDkvY1cbiAgICAgKiBAcHJvcGVydHkge051bWJlcn0gQUxMXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFMTDogMHhmZmZmLFxufSk7XG5cbi8qKlxuICogISNlbiBUaGUgZXZlbnQgdHlwZSBzdXBwb3J0ZWQgYnkgTm9kZVxuICogISN6aCBOb2RlIOaUr+aMgeeahOS6i+S7tuexu+Wei1xuICogQGNsYXNzIE5vZGUuRXZlbnRUeXBlXG4gKiBAc3RhdGljXG4gKiBAbmFtZXNwYWNlIE5vZGVcbiAqL1xuLy8gV2h5IEV2ZW50VHlwZSBkZWZpbmVkIGFzIGNsYXNzLCBiZWNhdXNlIHRoZSBmaXJzdCBwYXJhbWV0ZXIgb2YgTm9kZS5vbiBtZXRob2QgbmVlZHMgc2V0IGFzICdzdHJpbmcnIHR5cGUuXG52YXIgRXZlbnRUeXBlID0gY2MuRW51bSh7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgdG91Y2ggc3RhcnQgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNoc3RhcnQnXG4gICAgICogISN6aCDlvZPmiYvmjIfop6bmkbjliLDlsY/luZXml7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gVE9VQ0hfU1RBUlRcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVE9VQ0hfU1RBUlQ6ICd0b3VjaHN0YXJ0JyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBtb3ZlIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICd0b3VjaG1vdmUnXG4gICAgICogISN6aCDlvZPmiYvmjIflnKjlsY/luZXkuIrnp7vliqjml7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gVE9VQ0hfTU9WRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9NT1ZFOiAndG91Y2htb3ZlJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciB0b3VjaCBlbmQgZXZlbnQsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ3RvdWNoZW5kJ1xuICAgICAqICEjemgg5b2T5omL5oyH5Zyo55uu5qCH6IqC54K55Yy65Z+f5YaF56a75byA5bGP5bmV5pe244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFRPVUNIX0VORFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBUT1VDSF9FTkQ6ICd0b3VjaGVuZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgdG91Y2ggZW5kIGV2ZW50LCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICd0b3VjaGNhbmNlbCdcbiAgICAgKiAhI3poIOW9k+aJi+aMh+WcqOebruagh+iKgueCueWMuuWfn+Wkluemu+W8gOWxj+W5leaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBUT1VDSF9DQU5DRUxcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgVE9VQ0hfQ0FOQ0VMOiAndG91Y2hjYW5jZWwnLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgZG93biBldmVudHMsIHlvdSBjYW4gdXNlIGl0cyB2YWx1ZSBkaXJlY3RseTogJ21vdXNlZG93bidcbiAgICAgKiAhI3poIOW9k+m8oOagh+aMieS4i+aXtuinpuWPkeS4gOasoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9ET1dOXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX0RPV046ICdtb3VzZWRvd24nLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIG1vdmUgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZW1vdmUnXG4gICAgICogISN6aCDlvZPpvKDmoIflnKjnm67moIfoioLngrnlnKjnm67moIfoioLngrnljLrln5/kuK3np7vliqjml7bvvIzkuI3orrrmmK/lkKbmjInkuIvjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gTU9VU0VfTU9WRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9NT1ZFOiAnbW91c2Vtb3ZlJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBtb3VzZSBlbnRlciB0YXJnZXQgZXZlbnRzLCB5b3UgY2FuIHVzZSBpdHMgdmFsdWUgZGlyZWN0bHk6ICdtb3VzZWVudGVyJ1xuICAgICAqICEjemgg5b2T6byg5qCH56e75YWl55uu5qCH6IqC54K55Yy65Z+f5pe277yM5LiN6K665piv5ZCm5oyJ5LiL44CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IE1PVVNFX0VOVEVSXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIE1PVVNFX0VOVEVSOiAnbW91c2VlbnRlcicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgbW91c2UgbGVhdmUgdGFyZ2V0IGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2VsZWF2ZSdcbiAgICAgKiAhI3poIOW9k+m8oOagh+enu+WHuuebruagh+iKgueCueWMuuWfn+aXtu+8jOS4jeiuuuaYr+WQpuaMieS4i+OAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9MRUFWRVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9MRUFWRTogJ21vdXNlbGVhdmUnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIHVwIGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2V1cCdcbiAgICAgKiAhI3poIOW9k+m8oOagh+S7juaMieS4i+eKtuaAgeadvuW8gOaXtuinpuWPkeS4gOasoeOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9VUFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9VUDogJ21vdXNldXAnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG1vdXNlIHdoZWVsIGV2ZW50cywgeW91IGNhbiB1c2UgaXRzIHZhbHVlIGRpcmVjdGx5OiAnbW91c2V3aGVlbCdcbiAgICAgKiAhI3poIOW9k+m8oOagh+a7mui9rua7muWKqOaXtuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBNT1VTRV9XSEVFTFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBNT1VTRV9XSEVFTDogJ21vdXNld2hlZWwnLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgcG9zaXRpb24gY2hhbmdlIGV2ZW50cy5cbiAgICAgKiBQZXJmb3JtYW5jZSBub3RlLCB0aGlzIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIGV2ZXJ5IHRpbWUgY29ycmVzcG9uZGluZyBwcm9wZXJ0aWVzIGJlaW5nIGNoYW5nZWQsXG4gICAgICogaWYgdGhlIGV2ZW50IGNhbGxiYWNrIGhhdmUgaGVhdnkgbG9naWMgaXQgbWF5IGhhdmUgZ3JlYXQgcGVyZm9ybWFuY2UgaW1wYWN0LCB0cnkgdG8gYXZvaWQgc3VjaCBzY2VuYXJpby5cbiAgICAgKiAhI3poIOW9k+iKgueCueS9jee9ruaUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIOaAp+iDveitpuWRiu+8mui/meS4quS6i+S7tuS8muWcqOavj+asoeWvueW6lOeahOWxnuaAp+iiq+S/ruaUueaXtuinpuWPke+8jOWmguaenOS6i+S7tuWbnuiwg+aNn+iAl+i+g+mrmO+8jOacieWPr+iDveWvueaAp+iDveacieW+iOWkp+eahOi0n+mdouW9seWTje+8jOivt+WwvemHj+mBv+WFjei/meenjeaDheWGteOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBQT1NJVElPTl9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIFBPU0lUSU9OX0NIQU5HRUQ6ICdwb3NpdGlvbi1jaGFuZ2VkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciByb3RhdGlvbiBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K55peL6L2s5pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFJPVEFUSU9OX0NIQU5HRURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgUk9UQVRJT05fQ0hBTkdFRDogJ3JvdGF0aW9uLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIHNjYWxlIGNoYW5nZSBldmVudHMuXG4gICAgICogUGVyZm9ybWFuY2Ugbm90ZSwgdGhpcyBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBldmVyeSB0aW1lIGNvcnJlc3BvbmRpbmcgcHJvcGVydGllcyBiZWluZyBjaGFuZ2VkLFxuICAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgICogISN6aCDlvZPoioLngrnnvKnmlL7mlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiDmgKfog73orablkYrvvJrov5nkuKrkuovku7bkvJrlnKjmr4/mrKHlr7nlupTnmoTlsZ7mgKfooqvkv67mlLnml7bop6blj5HvvIzlpoLmnpzkuovku7blm57osIPmjZ/ogJfovoPpq5jvvIzmnInlj6/og73lr7nmgKfog73mnInlvojlpKfnmoTotJ/pnaLlvbHlk43vvIzor7flsL3ph4/pgb/lhY3ov5nnp43mg4XlhrXjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gU0NBTEVfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTQ0FMRV9DSEFOR0VEOiAnc2NhbGUtY2hhbmdlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3Igc2l6ZSBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K55bC65a+45pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFNJWkVfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTSVpFX0NIQU5HRUQ6ICdzaXplLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIGFuY2hvciBwb2ludCBjaGFuZ2UgZXZlbnRzLlxuICAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAgKiBpZiB0aGUgZXZlbnQgY2FsbGJhY2sgaGF2ZSBoZWF2eSBsb2dpYyBpdCBtYXkgaGF2ZSBncmVhdCBwZXJmb3JtYW5jZSBpbXBhY3QsIHRyeSB0byBhdm9pZCBzdWNoIHNjZW5hcmlvLlxuICAgICAqICEjemgg5b2T6IqC54K56ZSa54K55pS55Y+Y5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IEFOQ0hPUl9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEFOQ0hPUl9DSEFOR0VEOiAnYW5jaG9yLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY29sb3IgY2hhbmdlIGV2ZW50cy5cbiAgICAqIFBlcmZvcm1hbmNlIG5vdGUsIHRoaXMgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgZXZlcnkgdGltZSBjb3JyZXNwb25kaW5nIHByb3BlcnRpZXMgYmVpbmcgY2hhbmdlZCxcbiAgICAqIGlmIHRoZSBldmVudCBjYWxsYmFjayBoYXZlIGhlYXZ5IGxvZ2ljIGl0IG1heSBoYXZlIGdyZWF0IHBlcmZvcm1hbmNlIGltcGFjdCwgdHJ5IHRvIGF2b2lkIHN1Y2ggc2NlbmFyaW8uXG4gICAgKiAhI3poIOW9k+iKgueCueminOiJsuaUueWPmOaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICog5oCn6IO96K2m5ZGK77ya6L+Z5Liq5LqL5Lu25Lya5Zyo5q+P5qyh5a+55bqU55qE5bGe5oCn6KKr5L+u5pS55pe26Kem5Y+R77yM5aaC5p6c5LqL5Lu25Zue6LCD5o2f6ICX6L6D6auY77yM5pyJ5Y+v6IO95a+55oCn6IO95pyJ5b6I5aSn55qE6LSf6Z2i5b2x5ZON77yM6K+35bC96YeP6YG/5YWN6L+Z56eN5oOF5Ya144CCXG4gICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ09MT1JfQ0hBTkdFRFxuICAgICogQHN0YXRpY1xuICAgICovXG4gICAgQ09MT1JfQ0hBTkdFRDogJ2NvbG9yLWNoYW5nZWQnLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGV2ZW50IHR5cGUgZm9yIG5ldyBjaGlsZCBhZGRlZCBldmVudHMuXG4gICAgICogISN6aCDlvZPmlrDnmoTlrZDoioLngrnooqvmt7vliqDml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfQURERURcbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgQ0hJTERfQURERUQ6ICdjaGlsZC1hZGRlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY2hpbGQgcmVtb3ZlZCBldmVudHMuXG4gICAgICogISN6aCDlvZPlrZDoioLngrnooqvnp7vpmaTml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfUkVNT1ZFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBDSElMRF9SRU1PVkVEOiAnY2hpbGQtcmVtb3ZlZCcsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3IgY2hpbGRyZW4gcmVvcmRlciBldmVudHMuXG4gICAgICogISN6aCDlvZPlrZDoioLngrnpobrluo/mlLnlj5jml7bop6blj5HnmoTkuovku7bjgIJcbiAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gQ0hJTERfUkVPUkRFUlxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBDSElMRF9SRU9SREVSOiAnY2hpbGQtcmVvcmRlcicsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZXZlbnQgdHlwZSBmb3Igbm9kZSBncm91cCBjaGFuZ2VkIGV2ZW50cy5cbiAgICAgKiAhI3poIOW9k+iKgueCueW9kuWxnue+pOe7hOWPkeeUn+WPmOWMluaXtuinpuWPkeeahOS6i+S7tuOAglxuICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBHUk9VUF9DSEFOR0VEXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIEdST1VQX0NIQU5HRUQ6ICdncm91cC1jaGFuZ2VkJyxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBldmVudCB0eXBlIGZvciBub2RlJ3Mgc2libGluZyBvcmRlciBjaGFuZ2VkLlxuICAgICAqICEjemgg5b2T6IqC54K55Zyo5YWE5byf6IqC54K55Lit55qE6aG65bqP5Y+R55Sf5Y+Y5YyW5pe26Kem5Y+R55qE5LqL5Lu244CCXG4gICAgICogQHByb3BlcnR5IHtTdHJpbmd9IFNJQkxJTkdfT1JERVJfQ0hBTkdFRFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBTSUJMSU5HX09SREVSX0NIQU5HRUQ6ICdzaWJsaW5nLW9yZGVyLWNoYW5nZWQnLFxufSk7XG5cbnZhciBfdG91Y2hFdmVudHMgPSBbXG4gICAgRXZlbnRUeXBlLlRPVUNIX1NUQVJULFxuICAgIEV2ZW50VHlwZS5UT1VDSF9NT1ZFLFxuICAgIEV2ZW50VHlwZS5UT1VDSF9FTkQsXG4gICAgRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCxcbl07XG52YXIgX21vdXNlRXZlbnRzID0gW1xuICAgIEV2ZW50VHlwZS5NT1VTRV9ET1dOLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9FTlRFUixcbiAgICBFdmVudFR5cGUuTU9VU0VfTU9WRSxcbiAgICBFdmVudFR5cGUuTU9VU0VfTEVBVkUsXG4gICAgRXZlbnRUeXBlLk1PVVNFX1VQLFxuICAgIEV2ZW50VHlwZS5NT1VTRV9XSEVFTCxcbl07XG5cbnZhciBfc2tld05lZWRXYXJuID0gdHJ1ZTtcbnZhciBfc2tld1dhcm4gPSBmdW5jdGlvbiAodmFsdWUsIG5vZGUpIHtcbiAgICBpZiAodmFsdWUgIT09IDApIHtcbiAgICAgICAgdmFyIG5vZGVQYXRoID0gXCJcIjtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgIG5vZGVQYXRoID0gYE5vZGU6ICR7Tm9kZVV0aWxzLmdldE5vZGVQYXRoKG5vZGUpfS5gXG4gICAgICAgIH1cbiAgICAgICAgX3NrZXdOZWVkV2FybiAmJiBjYy53YXJuKFwiYGNjLk5vZGUuc2tld1gvWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjEsIHBsZWFzZSB1c2UgM0Qgbm9kZSBpbnN0ZWFkLlwiLCBub2RlUGF0aCk7XG4gICAgICAgICFDQ19FRElUT1IgJiYgKF9za2V3TmVlZFdhcm4gPSBmYWxzZSk7XG4gICAgfVxufVxuXG52YXIgX2N1cnJlbnRIb3ZlcmVkID0gbnVsbDtcblxudmFyIF90b3VjaFN0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuVE9VQ0hfU1RBUlQ7XG4gICAgICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbnZhciBfdG91Y2hNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG4gICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9NT1ZFO1xuICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG52YXIgX3RvdWNoRW5kSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuVE9VQ0hfRU5EO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5UT1VDSF9DQU5DRUw7XG4gICAgfVxuICAgIGV2ZW50LnRvdWNoID0gdG91Y2g7XG4gICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn07XG52YXIgX3RvdWNoQ2FuY2VsSGFuZGxlciA9IGZ1bmN0aW9uICh0b3VjaCwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gdG91Y2guZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDtcbiAgICBldmVudC50b3VjaCA9IHRvdWNoO1xuICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59O1xuXG52YXIgX21vdXNlRG93bkhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfRE9XTjtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxufTtcbnZhciBfbW91c2VNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcbiAgICB2YXIgaGl0ID0gbm9kZS5faGl0VGVzdChwb3MsIHRoaXMpO1xuICAgIGlmIChoaXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9wcmV2aW91c0luKSB7XG4gICAgICAgICAgICAvLyBGaXggaXNzdWUgd2hlbiBob3ZlciBub2RlIHN3aXRjaGVkLCBwcmV2aW91cyBob3ZlcmVkIG5vZGUgd29uJ3QgZ2V0IE1PVVNFX0xFQVZFIG5vdGlmaWNhdGlvblxuICAgICAgICAgICAgaWYgKF9jdXJyZW50SG92ZXJlZCAmJiBfY3VycmVudEhvdmVyZWQuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX0xFQVZFO1xuICAgICAgICAgICAgICAgIF9jdXJyZW50SG92ZXJlZC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBfY3VycmVudEhvdmVyZWQuX21vdXNlTGlzdGVuZXIuX3ByZXZpb3VzSW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9jdXJyZW50SG92ZXJlZCA9IHRoaXMub3duZXI7XG4gICAgICAgICAgICBldmVudC50eXBlID0gRXZlbnRUeXBlLk1PVVNFX0VOVEVSO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzSW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfTU9WRTtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRoaXMuX3ByZXZpb3VzSW4pIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9MRUFWRTtcbiAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNJbiA9IGZhbHNlO1xuICAgICAgICBfY3VycmVudEhvdmVyZWQgPSBudWxsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gY29udGludWUgZGlzcGF0Y2hpbmdcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEV2ZW50IHByb2Nlc3NlZCwgY2xlYW51cFxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xufTtcbnZhciBfbW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICB2YXIgbm9kZSA9IHRoaXMub3duZXI7XG5cbiAgICBpZiAobm9kZS5faGl0VGVzdChwb3MsIHRoaXMpKSB7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBFdmVudFR5cGUuTU9VU0VfVVA7XG4gICAgICAgIGV2ZW50LmJ1YmJsZXMgPSB0cnVlO1xuICAgICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG59O1xudmFyIF9tb3VzZVdoZWVsSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciBwb3MgPSBldmVudC5nZXRMb2NhdGlvbigpO1xuICAgIHZhciBub2RlID0gdGhpcy5vd25lcjtcblxuICAgIGlmIChub2RlLl9oaXRUZXN0KHBvcywgdGhpcykpIHtcbiAgICAgICAgZXZlbnQudHlwZSA9IEV2ZW50VHlwZS5NT1VTRV9XSEVFTDtcbiAgICAgICAgZXZlbnQuYnViYmxlcyA9IHRydWU7XG4gICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIF9zZWFyY2hDb21wb25lbnRzSW5QYXJlbnQgKG5vZGUsIGNvbXApIHtcbiAgICBpZiAoY29tcCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgbGlzdCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIGN1cnIgPSBub2RlOyBjdXJyICYmIGNjLk5vZGUuaXNOb2RlKGN1cnIpOyBjdXJyID0gY3Vyci5fcGFyZW50LCArK2luZGV4KSB7XG4gICAgICAgICAgICBpZiAoY3Vyci5nZXRDb21wb25lbnQoY29tcCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiBjdXJyLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKG5leHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBbbmV4dF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBfY2hlY2tMaXN0ZW5lcnMgKG5vZGUsIGV2ZW50cykge1xuICAgIGlmICghKG5vZGUuX29iakZsYWdzICYgRGVzdHJveWluZykpIHtcbiAgICAgICAgaWYgKG5vZGUuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5fYnViYmxpbmdMaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihldmVudHNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5fY2FwdHVyaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5fY2FwdHVyaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoZXZlbnRzW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gX2RvRGlzcGF0Y2hFdmVudCAob3duZXIsIGV2ZW50KSB7XG4gICAgdmFyIHRhcmdldCwgaTtcbiAgICBldmVudC50YXJnZXQgPSBvd25lcjtcblxuICAgIC8vIEV2ZW50LkNBUFRVUklOR19QSEFTRVxuICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuICAgIG93bmVyLl9nZXRDYXB0dXJpbmdUYXJnZXRzKGV2ZW50LnR5cGUsIF9jYWNoZWRBcnJheSk7XG4gICAgLy8gY2FwdHVyaW5nXG4gICAgZXZlbnQuZXZlbnRQaGFzZSA9IDE7XG4gICAgZm9yIChpID0gX2NhY2hlZEFycmF5Lmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHRhcmdldCA9IF9jYWNoZWRBcnJheVtpXTtcbiAgICAgICAgaWYgKHRhcmdldC5fY2FwdHVyaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgLy8gZmlyZSBldmVudFxuICAgICAgICAgICAgdGFyZ2V0Ll9jYXB0dXJpbmdMaXN0ZW5lcnMuZW1pdChldmVudC50eXBlLCBldmVudCwgX2NhY2hlZEFycmF5KTtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHByb3BhZ2F0aW9uIHN0b3BwZWRcbiAgICAgICAgICAgIGlmIChldmVudC5fcHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgX2NhY2hlZEFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuXG4gICAgLy8gRXZlbnQuQVRfVEFSR0VUXG4gICAgLy8gY2hlY2tzIGlmIGRlc3Ryb3llZCBpbiBjYXB0dXJpbmcgY2FsbGJhY2tzXG4gICAgZXZlbnQuZXZlbnRQaGFzZSA9IDI7XG4gICAgZXZlbnQuY3VycmVudFRhcmdldCA9IG93bmVyO1xuICAgIGlmIChvd25lci5fY2FwdHVyaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgIG93bmVyLl9jYXB0dXJpbmdMaXN0ZW5lcnMuZW1pdChldmVudC50eXBlLCBldmVudCk7XG4gICAgfVxuICAgIGlmICghZXZlbnQuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZCAmJiBvd25lci5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgb3duZXIuX2J1YmJsaW5nTGlzdGVuZXJzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH1cblxuICAgIGlmICghZXZlbnQuX3Byb3BhZ2F0aW9uU3RvcHBlZCAmJiBldmVudC5idWJibGVzKSB7XG4gICAgICAgIC8vIEV2ZW50LkJVQkJMSU5HX1BIQVNFXG4gICAgICAgIG93bmVyLl9nZXRCdWJibGluZ1RhcmdldHMoZXZlbnQudHlwZSwgX2NhY2hlZEFycmF5KTtcbiAgICAgICAgLy8gcHJvcGFnYXRlXG4gICAgICAgIGV2ZW50LmV2ZW50UGhhc2UgPSAzO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgX2NhY2hlZEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBfY2FjaGVkQXJyYXlbaV07XG4gICAgICAgICAgICBpZiAodGFyZ2V0Ll9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgLy8gZmlyZSBldmVudFxuICAgICAgICAgICAgICAgIHRhcmdldC5fYnViYmxpbmdMaXN0ZW5lcnMuZW1pdChldmVudC50eXBlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgcHJvcGFnYXRpb24gc3RvcHBlZFxuICAgICAgICAgICAgICAgIGlmIChldmVudC5fcHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIF9jYWNoZWRBcnJheS5sZW5ndGggPSAwO1xufVxuXG4vLyB0cmF2ZXJzYWwgdGhlIG5vZGUgdHJlZSwgY2hpbGQgY3VsbGluZ01hc2sgbXVzdCBrZWVwIHRoZSBzYW1lIHdpdGggdGhlIHBhcmVudC5cbmZ1bmN0aW9uIF9nZXRBY3R1YWxHcm91cEluZGV4IChub2RlKSB7XG4gICAgbGV0IGdyb3VwSW5kZXggPSBub2RlLmdyb3VwSW5kZXg7XG4gICAgaWYgKGdyb3VwSW5kZXggPT09IDAgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgZ3JvdXBJbmRleCA9IF9nZXRBY3R1YWxHcm91cEluZGV4KG5vZGUucGFyZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGdyb3VwSW5kZXg7XG59XG5cbmZ1bmN0aW9uIF91cGRhdGVDdWxsaW5nTWFzayAobm9kZSkge1xuICAgIGxldCBpbmRleCA9IF9nZXRBY3R1YWxHcm91cEluZGV4KG5vZGUpO1xuICAgIG5vZGUuX2N1bGxpbmdNYXNrID0gMSA8PCBpbmRleDtcbiAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgIG5vZGUuX3Byb3h5ICYmIG5vZGUuX3Byb3h5LnVwZGF0ZUN1bGxpbmdNYXNrKCk7XG4gICAgfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayhub2RlLl9jaGlsZHJlbltpXSk7XG4gICAgfVxufVxuXG4vLyAyRC8zRCBtYXRyaXggZnVuY3Rpb25zXG5mdW5jdGlvbiB1cGRhdGVMb2NhbE1hdHJpeDNEICgpIHtcbiAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRyYW5zZm9ybVxuICAgICAgICBsZXQgdCA9IHRoaXMuX21hdHJpeDtcbiAgICAgICAgbGV0IHRtID0gdC5tO1xuICAgICAgICBUcnMudG9NYXQ0KHQsIHRoaXMuX3Rycyk7XG5cbiAgICAgICAgLy8gc2tld1xuICAgICAgICBpZiAodGhpcy5fc2tld1ggfHwgdGhpcy5fc2tld1kpIHtcbiAgICAgICAgICAgIGxldCBhID0gdG1bMF0sIGIgPSB0bVsxXSwgYyA9IHRtWzRdLCBkID0gdG1bNV07XG4gICAgICAgICAgICBsZXQgc2t4ID0gTWF0aC50YW4odGhpcy5fc2tld1ggKiBPTkVfREVHUkVFKTtcbiAgICAgICAgICAgIGxldCBza3kgPSBNYXRoLnRhbih0aGlzLl9za2V3WSAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgaWYgKHNreCA9PT0gSW5maW5pdHkpXG4gICAgICAgICAgICAgICAgc2t4ID0gOTk5OTk5OTk7XG4gICAgICAgICAgICBpZiAoc2t5ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICBza3kgPSA5OTk5OTk5OTtcbiAgICAgICAgICAgIHRtWzBdID0gYSArIGMgKiBza3k7XG4gICAgICAgICAgICB0bVsxXSA9IGIgKyBkICogc2t5O1xuICAgICAgICAgICAgdG1bNF0gPSBjICsgYSAqIHNreDtcbiAgICAgICAgICAgIHRtWzVdID0gZCArIGIgKiBza3g7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxNYXREaXJ0eSAmPSB+TG9jYWxEaXJ0eUZsYWcuVFJTUztcbiAgICAgICAgLy8gUmVnaXN0ZXIgZGlydHkgc3RhdHVzIG9mIHdvcmxkIG1hdHJpeCBzbyB0aGF0IGl0IGNhbiBiZSByZWNhbGN1bGF0ZWRcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMb2NhbE1hdHJpeDJEICgpIHtcbiAgICBsZXQgZGlydHlGbGFnID0gdGhpcy5fbG9jYWxNYXREaXJ0eTtcbiAgICBpZiAoIShkaXJ0eUZsYWcgJiBMb2NhbERpcnR5RmxhZy5UUlNTKSkgcmV0dXJuO1xuXG4gICAgLy8gVXBkYXRlIHRyYW5zZm9ybVxuICAgIGxldCB0ID0gdGhpcy5fbWF0cml4O1xuICAgIGxldCB0bSA9IHQubTtcbiAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuXG4gICAgaWYgKGRpcnR5RmxhZyAmIChMb2NhbERpcnR5RmxhZy5SUyB8IExvY2FsRGlydHlGbGFnLlNLRVcpKSB7XG4gICAgICAgIGxldCByb3RhdGlvbiA9IC10aGlzLl9ldWxlckFuZ2xlcy56O1xuICAgICAgICBsZXQgaGFzU2tldyA9IHRoaXMuX3NrZXdYIHx8IHRoaXMuX3NrZXdZO1xuICAgICAgICBsZXQgc3ggPSB0cnNbN10sIHN5ID0gdHJzWzhdO1xuXG4gICAgICAgIGlmIChyb3RhdGlvbiB8fCBoYXNTa2V3KSB7XG4gICAgICAgICAgICBsZXQgYSA9IDEsIGIgPSAwLCBjID0gMCwgZCA9IDE7XG4gICAgICAgICAgICAvLyByb3RhdGlvblxuICAgICAgICAgICAgaWYgKHJvdGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJvdGF0aW9uUmFkaWFucyA9IHJvdGF0aW9uICogT05FX0RFR1JFRTtcbiAgICAgICAgICAgICAgICBjID0gTWF0aC5zaW4ocm90YXRpb25SYWRpYW5zKTtcbiAgICAgICAgICAgICAgICBkID0gTWF0aC5jb3Mocm90YXRpb25SYWRpYW5zKTtcbiAgICAgICAgICAgICAgICBhID0gZDtcbiAgICAgICAgICAgICAgICBiID0gLWM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzY2FsZVxuICAgICAgICAgICAgdG1bMF0gPSBhICo9IHN4O1xuICAgICAgICAgICAgdG1bMV0gPSBiICo9IHN4O1xuICAgICAgICAgICAgdG1bNF0gPSBjICo9IHN5O1xuICAgICAgICAgICAgdG1bNV0gPSBkICo9IHN5O1xuICAgICAgICAgICAgLy8gc2tld1xuICAgICAgICAgICAgaWYgKGhhc1NrZXcpIHtcbiAgICAgICAgICAgICAgICBsZXQgYSA9IHRtWzBdLCBiID0gdG1bMV0sIGMgPSB0bVs0XSwgZCA9IHRtWzVdO1xuICAgICAgICAgICAgICAgIGxldCBza3ggPSBNYXRoLnRhbih0aGlzLl9za2V3WCAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgICAgIGxldCBza3kgPSBNYXRoLnRhbih0aGlzLl9za2V3WSAqIE9ORV9ERUdSRUUpO1xuICAgICAgICAgICAgICAgIGlmIChza3ggPT09IEluZmluaXR5KVxuICAgICAgICAgICAgICAgICAgICBza3ggPSA5OTk5OTk5OTtcbiAgICAgICAgICAgICAgICBpZiAoc2t5ID09PSBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICAgICAgc2t5ID0gOTk5OTk5OTk7XG4gICAgICAgICAgICAgICAgdG1bMF0gPSBhICsgYyAqIHNreTtcbiAgICAgICAgICAgICAgICB0bVsxXSA9IGIgKyBkICogc2t5O1xuICAgICAgICAgICAgICAgIHRtWzRdID0gYyArIGEgKiBza3g7XG4gICAgICAgICAgICAgICAgdG1bNV0gPSBkICsgYiAqIHNreDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRtWzBdID0gc3g7XG4gICAgICAgICAgICB0bVsxXSA9IDA7XG4gICAgICAgICAgICB0bVs0XSA9IDA7XG4gICAgICAgICAgICB0bVs1XSA9IHN5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gcG9zaXRpb25cbiAgICB0bVsxMl0gPSB0cnNbMF07XG4gICAgdG1bMTNdID0gdHJzWzFdO1xuICAgIFxuICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgJj0gfkxvY2FsRGlydHlGbGFnLlRSU1M7XG4gICAgLy8gUmVnaXN0ZXIgZGlydHkgc3RhdHVzIG9mIHdvcmxkIG1hdHJpeCBzbyB0aGF0IGl0IGNhbiBiZSByZWNhbGN1bGF0ZWRcbiAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsV29ybGRNYXRyaXgzRCAoKSB7XG4gICAgLy8gQXZvaWQgYXMgbXVjaCBmdW5jdGlvbiBjYWxsIGFzIHBvc3NpYmxlXG4gICAgaWYgKHRoaXMuX2xvY2FsTWF0RGlydHkgJiBMb2NhbERpcnR5RmxhZy5UUlNTKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICBsZXQgcGFyZW50TWF0ID0gdGhpcy5fcGFyZW50Ll93b3JsZE1hdHJpeDtcbiAgICAgICAgTWF0NC5tdWwodGhpcy5fd29ybGRNYXRyaXgsIHBhcmVudE1hdCwgdGhpcy5fbWF0cml4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIE1hdDQuY29weSh0aGlzLl93b3JsZE1hdHJpeCwgdGhpcy5fbWF0cml4KTtcbiAgICB9XG4gICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxXb3JsZE1hdHJpeDJEICgpIHtcbiAgICAvLyBBdm9pZCBhcyBtdWNoIGZ1bmN0aW9uIGNhbGwgYXMgcG9zc2libGVcbiAgICBpZiAodGhpcy5fbG9jYWxNYXREaXJ0eSAmIExvY2FsRGlydHlGbGFnLlRSU1MpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gQXNzdW1lIHBhcmVudCB3b3JsZCBtYXRyaXggaXMgY29ycmVjdFxuICAgIGxldCBwYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICB0aGlzLl9tdWxNYXQodGhpcy5fd29ybGRNYXRyaXgsIHBhcmVudC5fd29ybGRNYXRyaXgsIHRoaXMuX21hdHJpeCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBNYXQ0LmNvcHkodGhpcy5fd29ybGRNYXRyaXgsIHRoaXMuX21hdHJpeCk7XG4gICAgfVxuICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbXVsTWF0MkQgKG91dCwgYSwgYikge1xuICAgIGxldCBhbSA9IGEubSwgYm0gPSBiLm0sIG91dG0gPSBvdXQubTtcbiAgICBsZXQgYWE9YW1bMF0sIGFiPWFtWzFdLCBhYz1hbVs0XSwgYWQ9YW1bNV0sIGF0eD1hbVsxMl0sIGF0eT1hbVsxM107XG4gICAgbGV0IGJhPWJtWzBdLCBiYj1ibVsxXSwgYmM9Ym1bNF0sIGJkPWJtWzVdLCBidHg9Ym1bMTJdLCBidHk9Ym1bMTNdO1xuICAgIGlmIChhYiAhPT0gMCB8fCBhYyAhPT0gMCkge1xuICAgICAgICBvdXRtWzBdID0gYmEgKiBhYSArIGJiICogYWM7XG4gICAgICAgIG91dG1bMV0gPSBiYSAqIGFiICsgYmIgKiBhZDtcbiAgICAgICAgb3V0bVs0XSA9IGJjICogYWEgKyBiZCAqIGFjO1xuICAgICAgICBvdXRtWzVdID0gYmMgKiBhYiArIGJkICogYWQ7XG4gICAgICAgIG91dG1bMTJdID0gYWEgKiBidHggKyBhYyAqIGJ0eSArIGF0eDtcbiAgICAgICAgb3V0bVsxM10gPSBhYiAqIGJ0eCArIGFkICogYnR5ICsgYXR5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb3V0bVswXSA9IGJhICogYWE7XG4gICAgICAgIG91dG1bMV0gPSBiYiAqIGFkO1xuICAgICAgICBvdXRtWzRdID0gYmMgKiBhYTtcbiAgICAgICAgb3V0bVs1XSA9IGJkICogYWQ7XG4gICAgICAgIG91dG1bMTJdID0gYWEgKiBidHggKyBhdHg7XG4gICAgICAgIG91dG1bMTNdID0gYWQgKiBidHkgKyBhdHk7XG4gICAgfVxufVxuXG5jb25zdCBtdWxNYXQzRCA9IE1hdDQubXVsO1xuXG4vKipcbiAqICEjZW5cbiAqIENsYXNzIG9mIGFsbCBlbnRpdGllcyBpbiBDb2NvcyBDcmVhdG9yIHNjZW5lcy48YnIvPlxuICogRm9yIGV2ZW50cyBzdXBwb3J0ZWQgYnkgTm9kZSwgcGxlYXNlIHJlZmVyIHRvIHt7I2Nyb3NzTGluayBcIk5vZGUuRXZlbnRUeXBlXCJ9fXt7L2Nyb3NzTGlua319XG4gKiAhI3poXG4gKiBDb2NvcyBDcmVhdG9yIOWcuuaZr+S4reeahOaJgOacieiKgueCueexu+OAgjxici8+XG4gKiDmlK/mjIHnmoToioLngrnkuovku7bvvIzor7flj4LpmIUge3sjY3Jvc3NMaW5rIFwiTm9kZS5FdmVudFR5cGVcIn19e3svY3Jvc3NMaW5rfX3jgIJcbiAqIEBjbGFzcyBOb2RlXG4gKiBAZXh0ZW5kcyBfQmFzZU5vZGVcbiAqL1xubGV0IE5vZGVEZWZpbmVzID0ge1xuICAgIG5hbWU6ICdjYy5Ob2RlJyxcbiAgICBleHRlbmRzOiBCYXNlTm9kZSxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gU0VSSUFMSVpBQkxFXG4gICAgICAgIF9vcGFjaXR5OiAyNTUsXG4gICAgICAgIF9jb2xvcjogY2MuQ29sb3IuV0hJVEUsXG4gICAgICAgIF9jb250ZW50U2l6ZTogY2MuU2l6ZSxcbiAgICAgICAgX2FuY2hvclBvaW50OiBjYy52MigwLjUsIDAuNSksXG4gICAgICAgIF9wb3NpdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBfc2NhbGU6IHVuZGVmaW5lZCxcbiAgICAgICAgX3RyczogbnVsbCxcbiAgICAgICAgX2V1bGVyQW5nbGVzOiBjYy5WZWMzLFxuICAgICAgICBfc2tld1g6IDAuMCxcbiAgICAgICAgX3NrZXdZOiAwLjAsXG4gICAgICAgIF96SW5kZXg6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXJcbiAgICAgICAgfSxcbiAgICAgICAgX2xvY2FsWk9yZGVyOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiAwLFxuICAgICAgICAgICAgc2VyaWFsaXphYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgIFxuICAgICAgICBfaXMzRE5vZGU6IGZhbHNlLFxuXG4gICAgICAgIC8vIGludGVybmFsIHByb3BlcnRpZXNcbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogR3JvdXAgaW5kZXggb2Ygbm9kZS48YnIvPlxuICAgICAgICAgKiBXaGljaCBHcm91cCB0aGlzIG5vZGUgYmVsb25ncyB0byB3aWxsIHJlc29sdmUgdGhhdCB0aGlzIG5vZGUncyBjb2xsaXNpb24gY29tcG9uZW50cyBjYW4gY29sbGlkZSB3aXRoIHdoaWNoIG90aGVyIGNvbGxpc2lvbiBjb21wb25lbnRucy48YnIvPlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOiKgueCueeahOWIhue7hOe0ouW8leOAgjxici8+XG4gICAgICAgICAqIOiKgueCueeahOWIhue7hOWwhuWFs+ezu+WIsOiKgueCueeahOeisOaSnue7hOS7tuWPr+S7peS4juWTquS6m+eisOaSnue7hOS7tuebuOeisOaSnuOAgjxici8+XG4gICAgICAgICAqIEBwcm9wZXJ0eSBncm91cEluZGV4XG4gICAgICAgICAqIEB0eXBlIHtJbnRlZ2VyfVxuICAgICAgICAgKiBAZGVmYXVsdCAwXG4gICAgICAgICAqL1xuICAgICAgICBfZ3JvdXBJbmRleDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMCxcbiAgICAgICAgICAgIGZvcm1lcmx5U2VyaWFsaXplZEFzOiAnZ3JvdXBJbmRleCdcbiAgICAgICAgfSxcbiAgICAgICAgZ3JvdXBJbmRleDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBJbmRleDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ3JvdXBJbmRleCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkdST1VQX0NIQU5HRUQsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEdyb3VwIG9mIG5vZGUuPGJyLz5cbiAgICAgICAgICogV2hpY2ggR3JvdXAgdGhpcyBub2RlIGJlbG9uZ3MgdG8gd2lsbCByZXNvbHZlIHRoYXQgdGhpcyBub2RlJ3MgY29sbGlzaW9uIGNvbXBvbmVudHMgY2FuIGNvbGxpZGUgd2l0aCB3aGljaCBvdGhlciBjb2xsaXNpb24gY29tcG9uZW50bnMuPGJyLz5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDoioLngrnnmoTliIbnu4TjgII8YnIvPlxuICAgICAgICAgKiDoioLngrnnmoTliIbnu4TlsIblhbPns7vliLDoioLngrnnmoTnorDmkp7nu4Tku7blj6/ku6XkuI7lk6rkupvnorDmkp7nu4Tku7bnm7jnorDmkp7jgII8YnIvPlxuICAgICAgICAgKiBAcHJvcGVydHkgZ3JvdXBcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIGdyb3VwOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYy5nYW1lLmdyb3VwTGlzdFt0aGlzLmdyb3VwSW5kZXhdIHx8ICcnO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgZ3JvdXBJbmRleFxuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBJbmRleCA9IGNjLmdhbWUuZ3JvdXBMaXN0LmluZGV4T2YodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vcHJvcGVydGllcyBtb3ZlZCBmcm9tIGJhc2Ugbm9kZSBiZWdpblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSBwb3NpdGlvbiAoeCwgeSkgb2YgdGhlIG5vZGUgaW4gaXRzIHBhcmVudCdzIGNvb3JkaW5hdGVzLlxuICAgICAgICAgKiAhI3poIOiKgueCueWcqOeItuiKgueCueWdkOagh+ezu+S4reeahOS9jee9ru+8iHgsIHnvvInjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtWZWMzfSBwb3NpdGlvblxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFBvc2l0aW9uOiBcIiArIG5vZGUucG9zaXRpb24pO1xuICAgICAgICAgKi9cblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB4IGF4aXMgcG9zaXRpb24gb2Ygbm9kZS5cbiAgICAgICAgICogISN6aCDoioLngrkgWCDovbTlnZDmoIfjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS54ID0gMTAwO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFBvc2l0aW9uIFg6IFwiICsgbm9kZS54KTtcbiAgICAgICAgICovXG4gICAgICAgIHg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1swXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRyc1swXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHRyc1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJzWzBdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1BPU0lUSU9OKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFzdCBjaGVjayBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFBPU0lUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VuZCBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCBuZXcgY2MuVmVjMyhvbGRWYWx1ZSwgdHJzWzFdLCB0cnNbMl0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSX0lOVkFMSURfTlVNQkVSLCAnbmV3IHgnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4geSBheGlzIHBvc2l0aW9uIG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K5IFkg6L205Z2Q5qCH44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSB5XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUueSA9IDEwMDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBQb3NpdGlvbiBZOiBcIiArIG5vZGUueSk7XG4gICAgICAgICAqL1xuICAgICAgICB5OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbMV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnNbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFDQ19FRElUT1IgfHwgaXNGaW5pdGUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2xkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgPSB0cnNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyc1sxXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZhc3QgY2hlY2sgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBQT1NJVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbmQgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgbmV3IGNjLlZlYzModHJzWzBdLCBvbGRWYWx1ZSwgdHJzWzJdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKEVSUl9JTlZBTElEX05VTUJFUiwgJ25ldyB5Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIHogYXhpcyBwb3NpdGlvbiBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBaIOi9tOWdkOagh+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgelxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgejoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzJdO1xuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHRyc1syXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUNDX0VESVRPUiB8fCBpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyc1syXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG4gICAgICAgICAgICAgICAgICAgICAgICAhQ0NfTkFUSVZFUkVOREVSRVIgJiYgKHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1dPUkxEX1RSQU5TRk9STSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmYXN0IGNoZWNrIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoRVJSX0lOVkFMSURfTlVNQkVSLCAnbmV3IHonKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBSb3RhdGlvbiBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOivpeiKgueCueaXi+i9rOinkuW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgcm90YXRpb25cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnJvdGF0aW9uID0gOTA7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgUm90YXRpb246IFwiICsgbm9kZS5yb3RhdGlvbik7XG4gICAgICAgICAqL1xuICAgICAgICByb3RhdGlvbjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHVzZSBgLWFuZ2xlYCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvbmAgLT4gYC10aGlzLm5vZGUuYW5nbGVgKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIC10aGlzLmFuZ2xlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHNldCBgLWFuZ2xlYCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvbiA9IHhgIC0+IGB0aGlzLm5vZGUuYW5nbGUgPSAteGApXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlID0gLXZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuXG4gICAgICAgICAqIEFuZ2xlIG9mIG5vZGUsIHRoZSBwb3NpdGl2ZSB2YWx1ZSBpcyBhbnRpLWNsb2Nrd2lzZSBkaXJlY3Rpb24uXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6K+l6IqC54K555qE5peL6L2s6KeS5bqm77yM5q2j5YC85Li66YCG5pe26ZKI5pa55ZCR44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhbmdsZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgYW5nbGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V1bGVyQW5nbGVzLno7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHRoaXMuX2V1bGVyQW5nbGVzLCAwLCAwLCB2YWx1ZSk7ICAgXG4gICAgICAgICAgICAgICAgVHJzLmZyb21BbmdsZVoodGhpcy5fdHJzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIHJvdGF0aW9uIGFzIEV1bGVyIGFuZ2xlcyBpbiBkZWdyZWVzLCB1c2VkIGluIDNEIG5vZGUuXG4gICAgICAgICAqICEjemgg6K+l6IqC54K555qE5qyn5ouJ6KeS5bqm77yM55So5LqOIDNEIOiKgueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkgZXVsZXJBbmdsZXNcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuaXMzRE5vZGUgPSB0cnVlO1xuICAgICAgICAgKiBub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoNDUsIDQ1LCA0NSk7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgZXVsZXJBbmdsZXMgKFgsIFksIFopOiBcIiArIG5vZGUuZXVsZXJBbmdsZXMudG9TdHJpbmcoKSk7XG4gICAgICAgICAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFJvdGF0aW9uIG9uIHggYXhpcy5cbiAgICAgICAgICogISN6aCDor6XoioLngrkgWCDovbTml4vovazop5LluqbjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHJvdGF0aW9uWFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuaXMzRE5vZGUgPSB0cnVlO1xuICAgICAgICAgKiBub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoNDUsIDAsIDApO1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIGV1bGVyQW5nbGVzIFg6IFwiICsgbm9kZS5ldWxlckFuZ2xlcy54KTtcbiAgICAgICAgICovXG4gICAgICAgIHJvdGF0aW9uWDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uWGAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSB1c2UgYGV1bGVyQW5nbGVzLnhgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uWGAgLT4gYHRoaXMubm9kZS5ldWxlckFuZ2xlcy54YClcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldWxlckFuZ2xlcy54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICAgICAgY2Mud2FybihcImBjYy5Ob2RlLnJvdGF0aW9uWGAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSBzZXQgYGV1bGVyQW5nbGVzYCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5yb3RhdGlvblggPSB4YCAtPiBgdGhpcy5ub2RlLmlzM0ROb2RlID0gdHJ1ZTsgdGhpcy5ub2RlLmV1bGVyQW5nbGVzID0gY2MudjMoeCwgMCwgMClgXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXVsZXJBbmdsZXMueCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXVsZXJBbmdsZXMueCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgcXVhdGVybmlvbiBmcm9tIHJvdGF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldWxlckFuZ2xlcy54ID09PSB0aGlzLl9ldWxlckFuZ2xlcy55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUcnMuZnJvbUFuZ2xlWih0aGlzLl90cnMsIC12YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUcnMuZnJvbUV1bGVyTnVtYmVyKHRoaXMuX3RycywgdmFsdWUsIHRoaXMuX2V1bGVyQW5nbGVzLnksIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUk9UQVRJT04pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBST1RBVElPTl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUm90YXRpb24gb24geSBheGlzLlxuICAgICAgICAgKiAhI3poIOivpeiKgueCuSBZIOi9tOaXi+i9rOinkuW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgcm90YXRpb25ZXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjFcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5pczNETm9kZSA9IHRydWU7XG4gICAgICAgICAqIG5vZGUuZXVsZXJBbmdsZXMgPSBjYy52MygwLCA0NSwgMCk7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgZXVsZXJBbmdsZXMgWTogXCIgKyBub2RlLmV1bGVyQW5nbGVzLnkpO1xuICAgICAgICAgKi9cbiAgICAgICAgcm90YXRpb25ZOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25ZYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHVzZSBgZXVsZXJBbmdsZXMueWAgaW5zdGVhZC4gKGB0aGlzLm5vZGUucm90YXRpb25ZYCAtPiBgdGhpcy5ub2RlLmV1bGVyQW5nbGVzLnlgKVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V1bGVyQW5nbGVzLnk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUucm90YXRpb25ZYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHNldCBgZXVsZXJBbmdsZXNgIGluc3RlYWQuIChgdGhpcy5ub2RlLnJvdGF0aW9uWSA9IHlgIC0+IGB0aGlzLm5vZGUuaXMzRE5vZGUgPSB0cnVlOyB0aGlzLm5vZGUuZXVsZXJBbmdsZXMgPSBjYy52MygwLCB5LCAwKWBcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldWxlckFuZ2xlcy55ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldWxlckFuZ2xlcy55ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBxdWF0ZXJuaW9uIGZyb20gcm90YXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V1bGVyQW5nbGVzLnggPT09IHRoaXMuX2V1bGVyQW5nbGVzLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRycy5mcm9tQW5nbGVaKHRoaXMuX3RycywgLXZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRycy5mcm9tRXVsZXJOdW1iZXIodGhpcy5fdHJzLCB0aGlzLl9ldWxlckFuZ2xlcy54LCB2YWx1ZSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFJPVEFUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICBldWxlckFuZ2xlczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ldWxlckFuZ2xlcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUcnMudG9FdWxlcih0aGlzLl9ldWxlckFuZ2xlcywgdGhpcy5fdHJzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBzZXQgKHYpIHtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V1bGVyQW5nbGVzLnNldCh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBUcnMuZnJvbUV1bGVyKHRoaXMuX3Rycywgdik7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG4gICAgICAgICAgICAgICAgIUNDX05BVElWRVJFTkRFUkVSICYmICh0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFJPVEFUSU9OX09OKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGZvciBNZXNoIFNrZWxldG9uIEFuaW1hdGlvblxuICAgICAgICAvLyBTaG91bGQgYmUgcmVtb3ZlZCB3aGVuIG5vZGUucm90YXRpb24gdXBncmFkZSB0byBxdWF0ZXJuaW9uIHZhbHVlXG4gICAgICAgIHF1YXQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFF1YXQodHJzWzNdLCB0cnNbNF0sIHRyc1s1XSwgdHJzWzZdKTtcbiAgICAgICAgICAgIH0sIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Um90YXRpb24odik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gVGhlIGxvY2FsIHNjYWxlIHJlbGF0aXZlIHRvIHRoZSBwYXJlbnQuXG4gICAgICAgICAqICEjemgg6IqC54K555u45a+554i26IqC54K555qE57yp5pS+44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNjYWxlID0gMTtcbiAgICAgICAgICovXG4gICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbN107XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTY2FsZSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBTY2FsZSBvbiB4IGF4aXMuXG4gICAgICAgICAqICEjemgg6IqC54K5IFgg6L2057yp5pS+44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBzY2FsZVhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5zY2FsZVggPSAwLjU7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgU2NhbGUgWDogXCIgKyBub2RlLnNjYWxlWCk7XG4gICAgICAgICAqL1xuICAgICAgICBzY2FsZVg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Ryc1s3XTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Ryc1s3XSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJzWzddID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfU0NBTEUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTQ0FMRV9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2NhbGUgb24geSBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBZIOi9tOe8qeaUvuOAglxuICAgICAgICAgKiBAcHJvcGVydHkgc2NhbGVZXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuc2NhbGVZID0gMC41O1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIFNjYWxlIFk6IFwiICsgbm9kZS5zY2FsZVkpO1xuICAgICAgICAgKi9cbiAgICAgICAgc2NhbGVZOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbOF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90cnNbOF0gIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Ryc1s4XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0NBTEVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFNjYWxlIG9uIHogYXhpcy5cbiAgICAgICAgICogISN6aCDoioLngrkgWiDovbTnvKnmlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHNjYWxlWlxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgc2NhbGVaOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90cnNbOV07XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdHJzWzldICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cnNbOV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9TQ0FMRSk7XG4gICAgICAgICAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0NBTEVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2tldyB4XG4gICAgICAgICAqICEjemgg6K+l6IqC54K5IFgg6L205YC+5pac6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBza2V3WFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNrZXdYID0gMDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBTa2V3WDogXCIgKyBub2RlLnNrZXdYKTtcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMi4xXG4gICAgICAgICAqL1xuICAgICAgICBza2V3WDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tld1g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9za2V3V2Fybih2YWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9za2V3WCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5TS0VXKTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb3h5LnVwZGF0ZVNrZXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gU2tldyB5XG4gICAgICAgICAqICEjemgg6K+l6IqC54K5IFkg6L205YC+5pac6KeS5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBza2V3WVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLnNrZXdZID0gMDtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSBTa2V3WTogXCIgKyBub2RlLnNrZXdZKTtcbiAgICAgICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMi4xXG4gICAgICAgICAqL1xuICAgICAgICBza2V3WToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc2tld1k7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIF9za2V3V2Fybih2YWx1ZSwgdGhpcyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9za2V3WSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5TS0VXKTtcbiAgICAgICAgICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb3h5LnVwZGF0ZVNrZXcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gT3BhY2l0eSBvZiBub2RlLCBkZWZhdWx0IHZhbHVlIGlzIDI1NS5cbiAgICAgICAgICogISN6aCDoioLngrnpgI/mmI7luqbvvIzpu5jorqTlgLzkuLogMjU144CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBvcGFjaXR5XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICovXG4gICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wYWNpdHk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gY2MubWlzYy5jbGFtcGYodmFsdWUsIDAsIDI1NSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wYWNpdHkgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29wYWNpdHkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlT3BhY2l0eSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX09QQUNJVFlfQ09MT1I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJhbmdlOiBbMCwgMjU1XVxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIENvbG9yIG9mIG5vZGUsIGRlZmF1bHQgdmFsdWUgaXMgd2hpdGU6ICgyNTUsIDI1NSwgMjU1KS5cbiAgICAgICAgICogISN6aCDoioLngrnpopzoibLjgILpu5jorqTkuLrnmb3oibLvvIzmlbDlgLzkuLrvvJrvvIgyNTXvvIwyNTXvvIwyNTXvvInjgIJcbiAgICAgICAgICogQHByb3BlcnR5IGNvbG9yXG4gICAgICAgICAqIEB0eXBlIHtDb2xvcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICovXG4gICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvci5jbG9uZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fY29sb3IuZXF1YWxzKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb2xvci5zZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfREVWICYmIHZhbHVlLmEgIT09IDI1NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2Mud2FybklEKDE2MjYpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfQ09MT1I7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIENPTE9SX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLkNPTE9SX0NIQU5HRUQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQW5jaG9yIHBvaW50J3MgcG9zaXRpb24gb24geCBheGlzLlxuICAgICAgICAgKiAhI3poIOiKgueCuSBYIOi9tOmUmueCueS9jee9ruOAglxuICAgICAgICAgKiBAcHJvcGVydHkgYW5jaG9yWFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLmFuY2hvclggPSAwO1xuICAgICAgICAgKi9cbiAgICAgICAgYW5jaG9yWDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5jaG9yUG9pbnQueDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFuY2hvclBvaW50ID0gdGhpcy5fYW5jaG9yUG9pbnQ7XG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvclBvaW50LnggIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvclBvaW50LnggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIEFOQ0hPUl9PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEFuY2hvciBwb2ludCdzIHBvc2l0aW9uIG9uIHkgYXhpcy5cbiAgICAgICAgICogISN6aCDoioLngrkgWSDovbTplJrngrnkvY3nva7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IGFuY2hvcllcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5hbmNob3JZID0gMDtcbiAgICAgICAgICovXG4gICAgICAgIGFuY2hvclk6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FuY2hvclBvaW50Lnk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBhbmNob3JQb2ludCA9IHRoaXMuX2FuY2hvclBvaW50O1xuICAgICAgICAgICAgICAgIGlmIChhbmNob3JQb2ludC55ICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhbmNob3JQb2ludC55ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBBTkNIT1JfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiBXaWR0aCBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOiKgueCueWuveW6puOAglxuICAgICAgICAgKiBAcHJvcGVydHkgd2lkdGhcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS53aWR0aCA9IDEwMDtcbiAgICAgICAgICovXG4gICAgICAgIHdpZHRoOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSBjYy5zaXplKHRoaXMuX2NvbnRlbnRTaXplLndpZHRoLCB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTSVpFX09OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQsIGNsb25lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSGVpZ2h0IG9mIG5vZGUuXG4gICAgICAgICAqICEjemgg6IqC54K56auY5bqm44CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBoZWlnaHRcbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5oZWlnaHQgPSAxMDA7XG4gICAgICAgICAqL1xuICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNsb25lID0gY2Muc2l6ZSh0aGlzLl9jb250ZW50U2l6ZS53aWR0aCwgdGhpcy5fY29udGVudFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFNJWkVfT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgY2xvbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlbiB6SW5kZXggaXMgdGhlICdrZXknIHVzZWQgdG8gc29ydCB0aGUgbm9kZSByZWxhdGl2ZSB0byBpdHMgc2libGluZ3MuPGJyLz5cbiAgICAgICAgICogVGhlIHZhbHVlIG9mIHpJbmRleCBzaG91bGQgYmUgaW4gdGhlIHJhbmdlIGJldHdlZW4gY2MubWFjcm8uTUlOX1pJTkRFWCBhbmQgY2MubWFjcm8uTUFYX1pJTkRFWC48YnIvPlxuICAgICAgICAgKiBUaGUgTm9kZSdzIHBhcmVudCB3aWxsIHNvcnQgYWxsIGl0cyBjaGlsZHJlbiBiYXNlZCBvbiB0aGUgekluZGV4IHZhbHVlIGFuZCB0aGUgYXJyaXZhbCBvcmRlci48YnIvPlxuICAgICAgICAgKiBOb2RlcyB3aXRoIGdyZWF0ZXIgekluZGV4IHdpbGwgYmUgc29ydGVkIGFmdGVyIG5vZGVzIHdpdGggc21hbGxlciB6SW5kZXguPGJyLz5cbiAgICAgICAgICogSWYgdHdvIG5vZGVzIGhhdmUgdGhlIHNhbWUgekluZGV4LCB0aGVuIHRoZSBub2RlIHRoYXQgd2FzIGFkZGVkIGZpcnN0IHRvIHRoZSBjaGlsZHJlbidzIGFycmF5IHdpbGwgYmUgaW4gZnJvbnQgb2YgdGhlIG90aGVyIG5vZGUgaW4gdGhlIGFycmF5Ljxici8+XG4gICAgICAgICAqIE5vZGUncyBvcmRlciBpbiBjaGlsZHJlbiBsaXN0IHdpbGwgYWZmZWN0IGl0cyByZW5kZXJpbmcgb3JkZXIuIFBhcmVudCBpcyBhbHdheXMgcmVuZGVyaW5nIGJlZm9yZSBhbGwgY2hpbGRyZW4uXG4gICAgICAgICAqICEjemggekluZGV4IOaYr+eUqOadpeWvueiKgueCuei/m+ihjOaOkuW6j+eahOWFs+mUruWxnuaAp++8jOWug+WGs+WumuS4gOS4quiKgueCueWcqOWFhOW8n+iKgueCueS5i+mXtOeahOS9jee9ruOAgjxici8+XG4gICAgICAgICAqIHpJbmRleCDnmoTlj5blgLzlupTor6Xku4vkuo4gY2MubWFjcm8uTUlOX1pJTkRFWCDlkowgY2MubWFjcm8uTUFYX1pJTkRFWCDkuYvpl7RcbiAgICAgICAgICog54i26IqC54K55Li76KaB5qC55o2u6IqC54K555qEIHpJbmRleCDlkozmt7vliqDmrKHluo/mnaXmjpLluo/vvIzmi6XmnInmm7Tpq5ggekluZGV4IOeahOiKgueCueWwhuiiq+aOkuWcqOWQjumdou+8jOWmguaenOS4pOS4quiKgueCueeahCB6SW5kZXgg5LiA6Ie077yM5YWI5re75Yqg55qE6IqC54K55Lya56iz5a6a5o6S5Zyo5Y+m5LiA5Liq6IqC54K55LmL5YmN44CCPGJyLz5cbiAgICAgICAgICog6IqC54K55ZyoIGNoaWxkcmVuIOS4reeahOmhuuW6j+WGs+WumuS6huWFtua4suafk+mhuuW6j+OAgueItuiKgueCueawuOi/nOWcqOaJgOacieWtkOiKgueCueS5i+WJjeiiq+a4suafk1xuICAgICAgICAgKiBAcHJvcGVydHkgekluZGV4XG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIG5vZGUuekluZGV4ID0gMTtcbiAgICAgICAgICogY2MubG9nKFwiTm9kZSB6SW5kZXg6IFwiICsgbm9kZS56SW5kZXgpO1xuICAgICAgICAgKi9cbiAgICAgICAgekluZGV4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFpPcmRlciA+PiAxNjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gbWFjcm8uTUFYX1pJTkRFWCkge1xuICAgICAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTYzNik7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbWFjcm8uTUFYX1pJTkRFWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPCBtYWNyby5NSU5fWklOREVYKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLndhcm5JRCgxNjM3KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBtYWNyby5NSU5fWklOREVYO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnpJbmRleCAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxaT3JkZXIgPSAodGhpcy5fbG9jYWxaT3JkZXIgJiAweDAwMDBmZmZmKSB8ICh2YWx1ZSA8PCAxNik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0lCTElOR19PUkRFUl9DSEFOR0VEKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vblNpYmxpbmdJbmRleENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW5cbiAgICAgICAgICogU3dpdGNoIDJELzNEIG5vZGUuIFRoZSAyRCBub2RlcyB3aWxsIHJ1biBmYXN0ZXIuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog5YiH5o2iIDJELzNEIOiKgueCue+8jDJEIOiKgueCueS8muacieabtOmrmOeahOi/kOihjOaViOeOh1xuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGlzM0ROb2RlXG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICovXG4gICAgICAgIGlzM0ROb2RlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pczNETm9kZTtcbiAgICAgICAgICAgIH0sIHNldCAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzM0ROb2RlID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGUzREZ1bmN0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmV0dXJucyBhIG5vcm1hbGl6ZWQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgdXAgZGlyZWN0aW9uIChZIGF4aXMpIG9mIHRoZSBub2RlIGluIHdvcmxkIHNwYWNlLlxuICAgICAgICAgKiAhI3poIOiOt+WPluiKgueCueato+S4iuaWue+8iHkg6L2077yJ6Z2i5a+555qE5pa55ZCR77yM6L+U5Zue5YC85Li65LiW55WM5Z2Q5qCH57O75LiL55qE5b2S5LiA5YyW5ZCR6YePXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcHJvcGVydHkgdXBcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICB1cDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3VwID0gVmVjMy50cmFuc2Zvcm1RdWF0KF91cmZWZWMzLCBWZWMzLlVQLCB0aGlzLmdldFdvcmxkUm90YXRpb24oX3VyZlF1YXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3VwLmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmV0dXJucyBhIG5vcm1hbGl6ZWQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgcmlnaHQgZGlyZWN0aW9uIChYIGF4aXMpIG9mIHRoZSBub2RlIGluIHdvcmxkIHNwYWNlLlxuICAgICAgICAgKiAhI3poIOiOt+WPluiKgueCueato+WPs+aWue+8iHgg6L2077yJ6Z2i5a+555qE5pa55ZCR77yM6L+U5Zue5YC85Li65LiW55WM5Z2Q5qCH57O75LiL55qE5b2S5LiA5YyW5ZCR6YePXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcHJvcGVydHkgcmlnaHRcbiAgICAgICAgICogQHR5cGUge1ZlYzN9XG4gICAgICAgICAqL1xuICAgICAgICByaWdodDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JpZ2h0ID0gVmVjMy50cmFuc2Zvcm1RdWF0KF91cmZWZWMzLCBWZWMzLlJJR0hULCB0aGlzLmdldFdvcmxkUm90YXRpb24oX3VyZlF1YXQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JpZ2h0LmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gUmV0dXJucyBhIG5vcm1hbGl6ZWQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgZm9yd2FyZCBkaXJlY3Rpb24gKFogYXhpcykgb2YgdGhlIG5vZGUgaW4gd29ybGQgc3BhY2UuXG4gICAgICAgICAqICEjemgg6I635Y+W6IqC54K55q2j5YmN5pa577yIeiDovbTvvInpnaLlr7nnmoTmlrnlkJHvvIzov5Tlm57lgLzkuLrkuJbnlYzlnZDmoIfns7vkuIvnmoTlvZLkuIDljJblkJHph49cbiAgICAgICAgICogXG4gICAgICAgICAqIEBwcm9wZXJ0eSBmb3J3YXJkXG4gICAgICAgICAqIEB0eXBlIHtWZWMzfVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yd2FyZDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2ZvcndhcmQgPSBWZWMzLnRyYW5zZm9ybVF1YXQoX3VyZlZlYzMsIFZlYzMuRk9SV0FSRCwgdGhpcy5nZXRXb3JsZFJvdGF0aW9uKF91cmZRdWF0KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mb3J3YXJkLmNsb25lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gICAgICovXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX3Jlb3JkZXJDaGlsZERpcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLy8gY2FjaGUgY29tcG9uZW50XG4gICAgICAgIHRoaXMuX3dpZGdldCA9IG51bGw7XG4gICAgICAgIC8vIGZhc3QgcmVuZGVyIGNvbXBvbmVudCBhY2Nlc3NcbiAgICAgICAgdGhpcy5fcmVuZGVyQ29tcG9uZW50ID0gbnVsbDtcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA9IG51bGw7XG4gICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgLy8gVG91Y2ggZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5fdG91Y2hMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIC8vIE1vdXNlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX2luaXREYXRhRnJvbVBvb2woKTtcblxuICAgICAgICB0aGlzLl9ldmVudE1hc2sgPSAwO1xuICAgICAgICB0aGlzLl9jdWxsaW5nTWFzayA9IDE7XG4gICAgICAgIHRoaXMuX2NoaWxkQXJyaXZhbE9yZGVyID0gMTtcblxuICAgICAgICAvLyBQcm94eVxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eSA9IG5ldyByZW5kZXJlci5Ob2RlUHJveHkodGhpcy5fc3BhY2VJbmZvLnVuaXRJRCwgdGhpcy5fc3BhY2VJbmZvLmluZGV4LCB0aGlzLl9pZCwgdGhpcy5fbmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9wcm94eS5pbml0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNob3VsZCByZXNldCBfcmVuZGVyRmxhZyBmb3IgYm90aCB3ZWIgYW5kIG5hdGl2ZVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnID0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSB8IFJlbmRlckZsb3cuRkxBR19PUEFDSVRZX0NPTE9SO1xuICAgIH0sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIEV2ZW50VHlwZSxcbiAgICAgICAgX0xvY2FsRGlydHlGbGFnOiBMb2NhbERpcnR5RmxhZyxcbiAgICAgICAgLy8gaXMgbm9kZSBidXQgbm90IHNjZW5lXG4gICAgICAgIGlzTm9kZSAob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTm9kZSAmJiAob2JqLmNvbnN0cnVjdG9yID09PSBOb2RlIHx8ICEob2JqIGluc3RhbmNlb2YgY2MuU2NlbmUpKTtcbiAgICAgICAgfSxcbiAgICAgICAgQnVpbHRpbkdyb3VwSW5kZXhcbiAgICB9LFxuXG4gICAgLy8gT1ZFUlJJREVTXG5cbiAgICBfb25TaWJsaW5nSW5kZXhDaGFuZ2VkICgpIHtcbiAgICAgICAgLy8gdXBkYXRlIHJlbmRlcmluZyBzY2VuZSBncmFwaCwgc29ydCB0aGVtIGJ5IGFycml2YWxPcmRlclxuICAgICAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuX2RlbGF5U29ydCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblByZURlc3Ryb3kgKCkge1xuICAgICAgICB2YXIgZGVzdHJveUJ5UGFyZW50ID0gdGhpcy5fb25QcmVEZXN0cm95QmFzZSgpO1xuXG4gICAgICAgIC8vIEFjdGlvbnNcbiAgICAgICAgaWYgKEFjdGlvbk1hbmFnZXJFeGlzdCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIE5vZGUuY3VycmVudEhvdmVyZWRcbiAgICAgICAgaWYgKF9jdXJyZW50SG92ZXJlZCA9PT0gdGhpcykge1xuICAgICAgICAgICAgX2N1cnJlbnRIb3ZlcmVkID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciB8fCB0aGlzLl9tb3VzZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvdWNoTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm1hc2sgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5fcHJveHkgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fYmFja0RhdGFJbnRvUG9vbCgpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX19mYXN0T2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5zb3J0QWxsQ2hpbGRyZW4sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkZXN0cm95QnlQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIHNpbXVsYXRlIHNvbWUgZGVzdHJ1Y3QgbG9naWMgdG8gbWFrZSB1bmRvIHN5c3RlbSB3b3JrIGNvcnJlY3RseVxuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSB0aGlzIG5vZGUgY2FuIHJlYXR0YWNoIHRvIHNjZW5lIGJ5IHVuZG8gc3lzdGVtXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25Qb3N0QWN0aXZhdGVkIChhY3RpdmUpIHtcbiAgICAgICAgdmFyIGFjdGlvbk1hbmFnZXIgPSBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkgOiBudWxsO1xuICAgICAgICBpZiAoYWN0aXZlKSB7XG4gICAgICAgICAgICAvLyBSZWZyZXNoIHRyYW5zZm9ybVxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNO1xuICAgICAgICAgICAgLy8gQWN0aW9uTWFuYWdlciAmIEV2ZW50TWFuYWdlclxuICAgICAgICAgICAgYWN0aW9uTWFuYWdlciAmJiBhY3Rpb25NYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICAvLyBTZWFyY2ggTWFzayBpbiBwYXJlbnRcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrTGlzdGVuZXJNYXNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWFjdGl2YXRlXG4gICAgICAgICAgICBhY3Rpb25NYW5hZ2VyICYmIGFjdGlvbk1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uSGllcmFyY2h5Q2hhbmdlZCAob2xkUGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCk7XG4gICAgICAgIC8vIEZpeGVkIGEgYnVnIHdoZXJlIGNoaWxkcmVuIGFuZCBwYXJlbnQgbm9kZSBncm91cHMgd2VyZSBmb3JjZWQgdG8gc3luY2hyb25pemUsIGluc3RlYWQgb2Ygb25seSBzeW5jaHJvbml6aW5nIGBfY3VsbGluZ01hc2tgIHZhbHVlXG4gICAgICAgIF91cGRhdGVDdWxsaW5nTWFzayh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll9kZWxheVNvcnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19XT1JMRF9UUkFOU0ZPUk07XG4gICAgICAgIHRoaXMuX29uSGllcmFyY2h5Q2hhbmdlZEJhc2Uob2xkUGFyZW50KTtcbiAgICAgICAgaWYgKGNjLl93aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBjYy5fd2lkZ2V0TWFuYWdlci5fbm9kZXNPcmRlckRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbGRQYXJlbnQgJiYgdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIC8vVE9ETzogSXQgbWF5IGJlIG5lY2Vzc2FyeSB0byB1cGRhdGUgdGhlIGxpc3RlbmVyIG1hc2sgb2YgYWxsIGNoaWxkIG5vZGVzLlxuICAgICAgICAgICAgdGhpcy5fY2hlY2tMaXN0ZW5lck1hc2soKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gTm9kZSBwcm94eVxuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICB0aGlzLl9wcm94eS51cGRhdGVQYXJlbnQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBJTlRFUk5BTFxuXG4gICAgX3VwZGF0ZTNERnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5faXMzRE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4ID0gdXBkYXRlTG9jYWxNYXRyaXgzRDtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bFdvcmxkTWF0cml4ID0gY2FsY3VsV29ybGRNYXRyaXgzRDtcbiAgICAgICAgICAgIHRoaXMuX211bE1hdCA9IG11bE1hdDNEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXggPSB1cGRhdGVMb2NhbE1hdHJpeDJEO1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsV29ybGRNYXRyaXggPSBjYWxjdWxXb3JsZE1hdHJpeDJEO1xuICAgICAgICAgICAgdGhpcy5fbXVsTWF0ID0gbXVsTWF0MkQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbmRlckNvbXBvbmVudCAmJiB0aGlzLl9yZW5kZXJDb21wb25lbnQuX29uM0ROb2RlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyQ29tcG9uZW50Ll9vbjNETm9kZUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19UUkFOU0ZPUk07XG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgPSBMb2NhbERpcnR5RmxhZy5BTEw7XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkudXBkYXRlM0ROb2RlKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luaXREYXRhRnJvbVBvb2wgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NwYWNlSW5mbykge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3BhY2VJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICB0cnM6IG5ldyBGbG9hdDY0QXJyYXkoMTApLFxuICAgICAgICAgICAgICAgICAgICBsb2NhbE1hdDogbmV3IEZsb2F0NjRBcnJheSgxNiksXG4gICAgICAgICAgICAgICAgICAgIHdvcmxkTWF0OiBuZXcgRmxvYXQ2NEFycmF5KDE2KSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGFjZUluZm8gPSBub2RlTWVtUG9vbC5wb3AoKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFjZUluZm8gPSB0aGlzLl9zcGFjZUluZm87XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IGNjLm1hdDQoc3BhY2VJbmZvLmxvY2FsTWF0KTtcbiAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl9tYXRyaXgpO1xuICAgICAgICB0aGlzLl93b3JsZE1hdHJpeCA9IGNjLm1hdDQoc3BhY2VJbmZvLndvcmxkTWF0KTtcbiAgICAgICAgTWF0NC5pZGVudGl0eSh0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgPSBMb2NhbERpcnR5RmxhZy5BTEw7XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuXG4gICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnMgPSBzcGFjZUluZm8udHJzO1xuICAgICAgICB0cnNbMF0gPSAwOyAvLyBwb3NpdGlvbi54XG4gICAgICAgIHRyc1sxXSA9IDA7IC8vIHBvc2l0aW9uLnlcbiAgICAgICAgdHJzWzJdID0gMDsgLy8gcG9zaXRpb24uelxuICAgICAgICB0cnNbM10gPSAwOyAvLyByb3RhdGlvbi54XG4gICAgICAgIHRyc1s0XSA9IDA7IC8vIHJvdGF0aW9uLnlcbiAgICAgICAgdHJzWzVdID0gMDsgLy8gcm90YXRpb24uelxuICAgICAgICB0cnNbNl0gPSAxOyAvLyByb3RhdGlvbi53XG4gICAgICAgIHRyc1s3XSA9IDE7IC8vIHNjYWxlLnhcbiAgICAgICAgdHJzWzhdID0gMTsgLy8gc2NhbGUueVxuICAgICAgICB0cnNbOV0gPSAxOyAvLyBzY2FsZS56XG4gICAgfSxcblxuICAgIF9iYWNrRGF0YUludG9Qb29sICgpIHtcbiAgICAgICAgaWYgKCEoQ0NfRURJVE9SIHx8IENDX1RFU1QpKSB7XG4gICAgICAgICAgICAvLyBwdXNoIGJhY2sgdG8gcG9vbFxuICAgICAgICAgICAgbm9kZU1lbVBvb2wucHVzaCh0aGlzLl9zcGFjZUluZm8pO1xuICAgICAgICAgICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3dvcmxkTWF0cml4ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3RycyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zcGFjZUluZm8gPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF90b0V1bGVyICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXMzRE5vZGUpIHtcbiAgICAgICAgICAgIFRycy50b0V1bGVyKHRoaXMuX2V1bGVyQW5nbGVzLCB0aGlzLl90cnMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IHogPSBNYXRoLmFzaW4odGhpcy5fdHJzWzVdKSAvIE9ORV9ERUdSRUUgKiAyO1xuICAgICAgICAgICAgVmVjMy5zZXQodGhpcy5fZXVsZXJBbmdsZXMsIDAsIDAsIHopO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9mcm9tRXVsZXIgKCkge1xuICAgICAgICBpZiAodGhpcy5pczNETm9kZSkge1xuICAgICAgICAgICAgVHJzLmZyb21FdWxlcih0aGlzLl90cnMsIHRoaXMuX2V1bGVyQW5nbGVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFRycy5mcm9tQW5nbGVaKHRoaXMuX3RycywgdGhpcy5fZXVsZXJBbmdsZXMueik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX3VwZ3JhZGVfMXhfdG9fMnggKCkge1xuICAgICAgICBpZiAodGhpcy5faXMzRE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZTNERnVuY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIGlmICh0cnMpIHtcbiAgICAgICAgICAgIGxldCBkZXNUcnMgPSB0cnM7XG4gICAgICAgICAgICB0cnMgPSB0aGlzLl90cnMgPSB0aGlzLl9zcGFjZUluZm8udHJzO1xuICAgICAgICAgICAgLy8ganVzdCBhZGFwdCB0byBvbGQgdHJzXG4gICAgICAgICAgICBpZiAoZGVzVHJzLmxlbmd0aCA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB0cnMuc2V0KGRlc1Rycy5zdWJhcnJheSgxKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRycy5zZXQoZGVzVHJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRycyA9IHRoaXMuX3RycyA9IHRoaXMuX3NwYWNlSW5mby50cnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fekluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsWk9yZGVyID0gdGhpcy5fekluZGV4IDw8IDE2O1xuICAgICAgICAgICAgdGhpcy5fekluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NrZXdYICE9PSAwIHx8IHRoaXMuX3NrZXdZICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIE5vZGVVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL25vZGUnKTtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUuc2tld1gvWWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4yLjEsIHBsZWFzZSB1c2UgM0Qgbm9kZSBpbnN0ZWFkLlwiLCBgTm9kZTogJHtOb2RlVXRpbHMuZ2V0Tm9kZVBhdGgodGhpcyl9LmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZnJvbUV1bGVyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsWk9yZGVyICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl96SW5kZXggPSAodGhpcy5fbG9jYWxaT3JkZXIgJiAweGZmZmYwMDAwKSA+PiAxNjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZ3JhZGUgZnJvbSAyLjAuMCBwcmV2aWV3IDQgJiBlYXJsaWVyIHZlcnNpb25zXG4gICAgICAgIC8vIFRPRE86IFJlbW92ZSBhZnRlciBmaW5hbCB2ZXJzaW9uXG4gICAgICAgIGlmICh0aGlzLl9jb2xvci5hIDwgMjU1ICYmIHRoaXMuX29wYWNpdHkgPT09IDI1NSkge1xuICAgICAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHRoaXMuX2NvbG9yLmE7XG4gICAgICAgICAgICB0aGlzLl9jb2xvci5hID0gMjU1O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNIHwgUmVuZGVyRmxvdy5GTEFHX09QQUNJVFlfQ09MT1I7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBUaGUgaW5pdGlhbGl6ZXIgZm9yIE5vZGUgd2hpY2ggd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGFsbCBjb21wb25lbnRzIG9uTG9hZFxuICAgICAqL1xuICAgIF9vbkJhdGNoQ3JlYXRlZCAoKSB7XG4gICAgICAgIGxldCBwcmVmYWJJbmZvID0gdGhpcy5fcHJlZmFiO1xuICAgICAgICBpZiAocHJlZmFiSW5mbyAmJiBwcmVmYWJJbmZvLnN5bmMgJiYgcHJlZmFiSW5mby5yb290ID09PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyAtIHJlbW92ZSBhbGwgdXNhZ2Ugb2YgX3N5bmNlZFxuICAgICAgICAgICAgICAgIGNjLmFzc2VydCghcHJlZmFiSW5mby5fc3luY2VkLCAncHJlZmFiIHNob3VsZCBub3Qgc3luY2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBQcmVmYWJIZWxwZXIuc3luY1dpdGhQcmVmYWIodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGdyYWRlXzF4X3RvXzJ4KCk7XG5cbiAgICAgICAgdGhpcy5fdXBkYXRlT3JkZXJPZkFycml2YWwoKTtcblxuICAgICAgICAvLyBGaXhlZCBhIGJ1ZyB3aGVyZSBjaGlsZHJlbiBhbmQgcGFyZW50IG5vZGUgZ3JvdXBzIHdlcmUgZm9yY2VkIHRvIHN5bmNocm9uaXplLCBpbnN0ZWFkIG9mIG9ubHkgc3luY2hyb25pemluZyBgX2N1bGxpbmdNYXNrYCB2YWx1ZVxuICAgICAgICB0aGlzLl9jdWxsaW5nTWFzayA9IDEgPDwgX2dldEFjdHVhbEdyb3VwSW5kZXgodGhpcyk7XG4gICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ICYmIHRoaXMuX3Byb3h5LnVwZGF0ZUN1bGxpbmdNYXNrKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgLy8gZGVhY3RpdmF0ZSBBY3Rpb25NYW5hZ2VyIGFuZCBFdmVudE1hbmFnZXIgYnkgZGVmYXVsdFxuICAgICAgICAgICAgaWYgKEFjdGlvbk1hbmFnZXJFeGlzdCkge1xuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLl9vbkJhdGNoQ3JlYXRlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX0NISUxEUkVOO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkuaW5pdE5hdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHRoZSBzYW1lIGFzIF9vbkJhdGNoQ3JlYXRlZCBidXQgdW50b3VjaCBwcmVmYWJcbiAgICBfb25CYXRjaFJlc3RvcmVkICgpIHtcbiAgICAgICAgdGhpcy5fdXBncmFkZV8xeF90b18yeCgpO1xuXG4gICAgICAgIC8vIEZpeGVkIGEgYnVnIHdoZXJlIGNoaWxkcmVuIGFuZCBwYXJlbnQgbm9kZSBncm91cHMgd2VyZSBmb3JjZWQgdG8gc3luY2hyb25pemUsIGluc3RlYWQgb2Ygb25seSBzeW5jaHJvbml6aW5nIGBfY3VsbGluZ01hc2tgIHZhbHVlXG4gICAgICAgIHRoaXMuX2N1bGxpbmdNYXNrID0gMSA8PCBfZ2V0QWN0dWFsR3JvdXBJbmRleCh0aGlzKTtcbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkgJiYgdGhpcy5fcHJveHkudXBkYXRlQ3VsbGluZ01hc2soKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAvLyBkZWFjdGl2YXRlIEFjdGlvbk1hbmFnZXIgYW5kIEV2ZW50TWFuYWdlciBieSBkZWZhdWx0XG5cbiAgICAgICAgICAgIC8vIEFjdGlvbk1hbmFnZXIgbWF5IG5vdCBiZSBpbml0ZWQgaW4gdGhlIGVkaXRvciB3b3JrZXIuXG4gICAgICAgICAgICBsZXQgbWFuYWdlciA9IGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKTtcbiAgICAgICAgICAgIG1hbmFnZXIgJiYgbWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcblxuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnBhdXNlVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2hpbGRyZW5baV0uX29uQmF0Y2hSZXN0b3JlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX0NISUxEUkVOO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgdGhpcy5fcHJveHkuaW5pdE5hdGl2ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIEVWRU5UIFRBUkdFVFxuICAgIF9jaGVja0xpc3RlbmVyTWFzayAoKSB7XG4gICAgICAgIC8vIEJlY2F1c2UgTWFzayBtYXkgYmUgbmVzdGVkLCBuZWVkIHRvIGZpbmQgYWxsIHRoZSBNYXNrIGNvbXBvbmVudHMgaW4gdGhlIHBhcmVudCBub2RlLiBcbiAgICAgICAgLy8gVGhlIGNsaWNrIGFyZWEgbXVzdCBzYXRpc2Z5IGFsbCBNYXNrcyB0byB0cmlnZ2VyIHRoZSBjbGljay5cbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBtYXNrID0gdGhpcy5fdG91Y2hMaXN0ZW5lci5tYXNrID0gX3NlYXJjaENvbXBvbmVudHNJblBhcmVudCh0aGlzLCBjYy5NYXNrKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9tb3VzZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lci5tYXNrID0gbWFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tb3VzZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZUxpc3RlbmVyLm1hc2sgPSBfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50KHRoaXMsIGNjLk1hc2spO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jaGVja25TZXR1cFN5c0V2ZW50ICh0eXBlKSB7XG4gICAgICAgIGxldCBuZXdBZGRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgZm9yRGlzcGF0Y2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKF90b3VjaEV2ZW50cy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl90b3VjaExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG91Y2hMaXN0ZW5lciA9IGNjLkV2ZW50TGlzdGVuZXIuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSxcbiAgICAgICAgICAgICAgICAgICAgc3dhbGxvd1RvdWNoZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50KHRoaXMsIGNjLk1hc2spLFxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoQmVnYW46IF90b3VjaFN0YXJ0SGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaE1vdmVkOiBfdG91Y2hNb3ZlSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgb25Ub3VjaEVuZGVkOiBfdG91Y2hFbmRIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBvblRvdWNoQ2FuY2VsbGVkOiBfdG91Y2hDYW5jZWxIYW5kbGVyXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHRoaXMuX3RvdWNoTGlzdGVuZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG5ld0FkZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvckRpc3BhdGNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfbW91c2VFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbW91c2VMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBjYy5FdmVudExpc3RlbmVyLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLk1PVVNFLFxuICAgICAgICAgICAgICAgICAgICBfcHJldmlvdXNJbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBtYXNrOiBfc2VhcmNoQ29tcG9uZW50c0luUGFyZW50KHRoaXMsIGNjLk1hc2spLFxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRG93bjogX21vdXNlRG93bkhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlOiBfbW91c2VNb3ZlSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZVVwOiBfbW91c2VVcEhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VTY3JvbGw6IF9tb3VzZVdoZWVsSGFuZGxlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIodGhpcy5fbW91c2VMaXN0ZW5lciwgdGhpcyk7XG4gICAgICAgICAgICAgICAgbmV3QWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yRGlzcGF0Y2ggPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdBZGRlZCAmJiAhdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5wYXVzZVRhcmdldCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGlzLCAwLCAwLCAwLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZvckRpc3BhdGNoO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVnaXN0ZXIgYSBjYWxsYmFjayBvZiBhIHNwZWNpZmljIGV2ZW50IHR5cGUgb24gTm9kZS48YnIvPlxuICAgICAqIFVzZSB0aGlzIG1ldGhvZCB0byByZWdpc3RlciB0b3VjaCBvciBtb3VzZSBldmVudCBwZXJtaXQgcHJvcGFnYXRpb24gYmFzZWQgb24gc2NlbmUgZ3JhcGgsPGJyLz5cbiAgICAgKiBUaGVzZSBraW5kcyBvZiBldmVudCBhcmUgdHJpZ2dlcmVkIHdpdGggZGlzcGF0Y2hFdmVudCwgdGhlIGRpc3BhdGNoIHByb2Nlc3MgaGFzIHRocmVlIHN0ZXBzOjxici8+XG4gICAgICogMS4gQ2FwdHVyaW5nIHBoYXNlOiBkaXNwYXRjaCBpbiBjYXB0dXJlIHRhcmdldHMgKGBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c2ApLCBlLmcuIHBhcmVudHMgaW4gbm9kZSB0cmVlLCBmcm9tIHJvb3QgdG8gdGhlIHJlYWwgdGFyZ2V0PGJyLz5cbiAgICAgKiAyLiBBdCB0YXJnZXQgcGhhc2U6IGRpc3BhdGNoIHRvIHRoZSBsaXN0ZW5lcnMgb2YgdGhlIHJlYWwgdGFyZ2V0PGJyLz5cbiAgICAgKiAzLiBCdWJibGluZyBwaGFzZTogZGlzcGF0Y2ggaW4gYnViYmxlIHRhcmdldHMgKGBfZ2V0QnViYmxpbmdUYXJnZXRzYCksIGUuZy4gcGFyZW50cyBpbiBub2RlIHRyZWUsIGZyb20gdGhlIHJlYWwgdGFyZ2V0IHRvIHJvb3Q8YnIvPlxuICAgICAqIEluIGFueSBtb21lbnQgb2YgdGhlIGRpc3BhdGNoaW5nIHByb2Nlc3MsIGl0IGNhbiBiZSBzdG9wcGVkIHZpYSBgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClgIG9yIGBldmVudC5zdG9wUHJvcGFnYXRpb25JbW1pZGlhdGUoKWAuPGJyLz5cbiAgICAgKiBJdCdzIHRoZSByZWNvbW1lbmRlZCB3YXkgdG8gcmVnaXN0ZXIgdG91Y2gvbW91c2UgZXZlbnQgZm9yIE5vZGUsPGJyLz5cbiAgICAgKiBwbGVhc2UgZG8gbm90IHVzZSBjYy5ldmVudE1hbmFnZXIgZGlyZWN0bHkgZm9yIE5vZGUuPGJyLz5cbiAgICAgKiBZb3UgY2FuIGFsc28gcmVnaXN0ZXIgY3VzdG9tIGV2ZW50IGFuZCB1c2UgYGVtaXRgIHRvIHRyaWdnZXIgY3VzdG9tIGV2ZW50IG9uIE5vZGUuPGJyLz5cbiAgICAgKiBGb3Igc3VjaCBldmVudHMsIHRoZXJlIHdvbid0IGJlIGNhcHR1cmluZyBhbmQgYnViYmxpbmcgcGhhc2UsIHlvdXIgZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIGRpcmVjdGx5IHRvIGl0cyBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBvbiB0aGUgc2FtZSBub2RlLjxici8+XG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgZXZlbnQgY2FsbGJhY2sgcGFyYW1ldGVycyB3aXRoIGBlbWl0YCBieSBwYXNzaW5nIHBhcmFtZXRlcnMgYWZ0ZXIgYHR5cGVgLlxuICAgICAqICEjemhcbiAgICAgKiDlnKjoioLngrnkuIrms6jlhozmjIflrprnsbvlnovnmoTlm57osIPlh73mlbDvvIzkuZ/lj6/ku6Xorr7nva4gdGFyZ2V0IOeUqOS6jue7keWumuWTjeW6lOWHveaVsOeahCB0aGlzIOWvueixoeOAgjxici8+XG4gICAgICog6byg5qCH5oiW6Kem5pG45LqL5Lu25Lya6KKr57O757uf6LCD55SoIGRpc3BhdGNoRXZlbnQg5pa55rOV6Kem5Y+R77yM6Kem5Y+R55qE6L+H56iL5YyF5ZCr5LiJ5Liq6Zi25q6177yaPGJyLz5cbiAgICAgKiAxLiDmjZXojrfpmLbmrrXvvJrmtL7lj5Hkuovku7bnu5nmjZXojrfnm67moIfvvIjpgJrov4cgYF9nZXRDYXB0dXJpbmdUYXJnZXRzYCDojrflj5bvvInvvIzmr5TlpoLvvIzoioLngrnmoJHkuK3ms6jlhozkuobmjZXojrfpmLbmrrXnmoTniLboioLngrnvvIzku47moLnoioLngrnlvIDlp4vmtL7lj5Hnm7TliLDnm67moIfoioLngrnjgII8YnIvPlxuICAgICAqIDIuIOebruagh+mYtuaute+8mua0vuWPkee7meebruagh+iKgueCueeahOebkeWQrOWZqOOAgjxici8+XG4gICAgICogMy4g5YaS5rOh6Zi25q6177ya5rS+5Y+R5LqL5Lu257uZ5YaS5rOh55uu5qCH77yI6YCa6L+HIGBfZ2V0QnViYmxpbmdUYXJnZXRzYCDojrflj5bvvInvvIzmr5TlpoLvvIzoioLngrnmoJHkuK3ms6jlhozkuoblhpLms6HpmLbmrrXnmoTniLboioLngrnvvIzku47nm67moIfoioLngrnlvIDlp4vmtL7lj5Hnm7TliLDmoLnoioLngrnjgII8YnIvPlxuICAgICAqIOWQjOaXtuaCqOWPr+S7peWwhuS6i+S7tua0vuWPkeWIsOeItuiKgueCueaIluiAhemAmui/h+iwg+eUqCBzdG9wUHJvcGFnYXRpb24g5oum5oiq5a6D44CCPGJyLz5cbiAgICAgKiDmjqjojZDkvb/nlKjov5nnp43mlrnlvI/mnaXnm5HlkKzoioLngrnkuIrnmoTop6bmkbjmiJbpvKDmoIfkuovku7bvvIzor7fkuI3opoHlnKjoioLngrnkuIrnm7TmjqXkvb/nlKggY2MuZXZlbnRNYW5hZ2Vy44CCPGJyLz5cbiAgICAgKiDkvaDkuZ/lj6/ku6Xms6jlhozoh6rlrprkuYnkuovku7bliLDoioLngrnkuIrvvIzlubbpgJrov4cgZW1pdCDmlrnms5Xop6blj5HmraTnsbvkuovku7bvvIzlr7nkuo7ov5nnsbvkuovku7bvvIzkuI3kvJrlj5HnlJ/mjZXojrflhpLms6HpmLbmrrXvvIzlj6rkvJrnm7TmjqXmtL7lj5Hnu5nms6jlhozlnKjor6XoioLngrnkuIrnmoTnm5HlkKzlmag8YnIvPlxuICAgICAqIOS9oOWPr+S7pemAmui/h+WcqCBlbWl0IOaWueazleiwg+eUqOaXtuWcqCB0eXBlIOS5i+WQjuS8oOmAkumineWklueahOWPguaVsOS9nOS4uuS6i+S7tuWbnuiwg+eahOWPguaVsOWIl+ihqFxuICAgICAqIEBtZXRob2Qgb25cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xOb2RlLkV2ZW50VHlwZX0gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLjxicj5TZWUge3sjY3Jvc3NMaW5rIFwiTm9kZS9FdmVudFR5dXBlL1BPU0lUSU9OX0NIQU5HRURcIn19Tm9kZSBFdmVudHN7ey9jcm9zc0xpbmt9fSBmb3IgYWxsIGJ1aWx0aW4gZXZlbnRzLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICAgICAqIEBwYXJhbSB7RXZlbnR8YW55fSBbY2FsbGJhY2suZXZlbnRdIGV2ZW50IG9yIGZpcnN0IGFyZ3VtZW50IHdoZW4gZW1pdFxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMl0gYXJnMlxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnM10gYXJnM1xuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNF0gYXJnNFxuICAgICAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNV0gYXJnNVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIGxpc3RlbmVyIHdpbGwgYmUgdHJpZ2dlcmVkIGF0IGNhcHR1cmluZyBwaGFzZSB3aGljaCBpcyBhaGVhZCBvZiB0aGUgZmluYWwgdGFyZ2V0IGVtaXQsIG90aGVyd2lzZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCBkdXJpbmcgYnViYmxpbmcgcGhhc2UuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IC0gSnVzdCByZXR1cm5zIHRoZSBpbmNvbWluZyBjYWxsYmFjayBzbyB5b3UgY2FuIHNhdmUgdGhlIGFub255bW91cyBmdW5jdGlvbiBlYXNpZXIuXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IFQsIHRhcmdldD86IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiBUXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMubWVtYmVyRnVuY3Rpb24sIHRoaXMpOyAgLy8gaWYgXCJ0aGlzXCIgaXMgY29tcG9uZW50IGFuZCB0aGUgXCJtZW1iZXJGdW5jdGlvblwiIGRlY2xhcmVkIGluIENDQ2xhc3MuXG4gICAgICogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfTU9WRSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAqIG5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBjYWxsYmFjaywgdGhpcyk7XG4gICAgICogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKiBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCBjYWxsYmFjayk7XG4gICAgICogbm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DT0xPUl9DSEFOR0VELCBjYWxsYmFjayk7XG4gICAgICovXG4gICAgb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgbGV0IGZvckRpc3BhdGNoID0gdGhpcy5fY2hlY2tuU2V0dXBTeXNFdmVudCh0eXBlKTtcbiAgICAgICAgaWYgKGZvckRpc3BhdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25EaXNwYXRjaCh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IFBPU0lUSU9OX09OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlNDQUxFX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IFNDQUxFX09OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IFJPVEFUSU9OX09OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgfD0gU0laRV9PTjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgfD0gQU5DSE9SX09OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLkNPTE9SX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrIHw9IENPTE9SX09OO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLl9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzID0gbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgTm9kZSxcbiAgICAgKiB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIGFmdGVyIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHRyaWdnZXJlZC5cbiAgICAgKiAhI3poXG4gICAgICog5rOo5YaM6IqC54K555qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD77yM5Zue6LCD5Lya5Zyo56ys5LiA5pe26Ze06KKr6Kem5Y+R5ZCO5Yig6Zmk6Ieq6Lqr44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIG9uY2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fGFueX0gW2NhbGxiYWNrLmV2ZW50XSBldmVudCBvciBmaXJzdCBhcmd1bWVudCB3aGVuIGVtaXRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzNdIGFyZzNcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcbiAgICAgKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIG9uY2U8VCBleHRlbmRzIEZ1bmN0aW9uPih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBULCB0YXJnZXQ/OiBhbnksIHVzZUNhcHR1cmU/OiBib29sZWFuKTogVFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5vbmNlKGNjLk5vZGUuRXZlbnRUeXBlLkFOQ0hPUl9DSEFOR0VELCBjYWxsYmFjayk7XG4gICAgICovXG4gICAgb25jZSAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICBsZXQgZm9yRGlzcGF0Y2ggPSB0aGlzLl9jaGVja25TZXR1cFN5c0V2ZW50KHR5cGUpO1xuXG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSBudWxsO1xuICAgICAgICBpZiAoZm9yRGlzcGF0Y2ggJiYgdXNlQ2FwdHVyZSkge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzID0gdGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzIHx8IG5ldyBFdmVudFRhcmdldCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3RlbmVycy5vbmNlKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgIH0sXG5cbiAgICBfb25EaXNwYXRjaCAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAvLyBBY2NlcHQgYWxzbyBwYXRhbWV0ZXJzIGxpa2U6ICh0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSlcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdXNlQ2FwdHVyZSA9IHRhcmdldDtcbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHVzZUNhcHR1cmUgPSAhIXVzZUNhcHR1cmU7XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoNjgwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gbnVsbDtcbiAgICAgICAgaWYgKHVzZUNhcHR1cmUpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyB8fCBuZXcgRXZlbnRUYXJnZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgfHwgbmV3IEV2ZW50VGFyZ2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSApIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5vbih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuX19ldmVudFRhcmdldHMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjYWxsYmFjaztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbW92ZXMgdGhlIGNhbGxiYWNrIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzYW1lIHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQgYW5kIG9yIHVzZUNhcHR1cmUuXG4gICAgICogVGhpcyBtZXRob2QgaXMgbWVyZWx5IGFuIGFsaWFzIHRvIHJlbW92ZUV2ZW50TGlzdGVuZXIuXG4gICAgICogISN6aCDliKDpmaTkuYvliY3kuI7lkIznsbvlnovvvIzlm57osIPvvIznm67moIfmiJYgdXNlQ2FwdHVyZSDms6jlhoznmoTlm57osIPjgIJcbiAgICAgKiBAbWV0aG9kIG9mZlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIGJlaW5nIHJlbW92ZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSAtIFRoZSBjYWxsYmFjayB0byByZW1vdmUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmU9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSwgdGhlIGxpc3RlbmVyIHdpbGwgYmUgdHJpZ2dlcmVkIGF0IGNhcHR1cmluZyBwaGFzZSB3aGljaCBpcyBhaGVhZCBvZiB0aGUgZmluYWwgdGFyZ2V0IGVtaXQsIG90aGVyd2lzZSBpdCB3aWxsIGJlIHRyaWdnZXJlZCBkdXJpbmcgYnViYmxpbmcgcGhhc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm1lbWJlckZ1bmN0aW9uLCB0aGlzKTtcbiAgICAgKiBub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgY2FsbGJhY2ssIHRoaXMubm9kZSk7XG4gICAgICogbm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgKi9cbiAgICBvZmYgKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgbGV0IHRvdWNoRXZlbnQgPSBfdG91Y2hFdmVudHMuaW5kZXhPZih0eXBlKSAhPT0gLTE7XG4gICAgICAgIGxldCBtb3VzZUV2ZW50ID0gIXRvdWNoRXZlbnQgJiYgX21vdXNlRXZlbnRzLmluZGV4T2YodHlwZSkgIT09IC0xO1xuICAgICAgICBpZiAodG91Y2hFdmVudCB8fCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9vZmZEaXNwYXRjaCh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB1c2VDYXB0dXJlKTtcblxuICAgICAgICAgICAgaWYgKHRvdWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdG91Y2hMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF90b3VjaEV2ZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnJlbW92ZUxpc3RlbmVyKHRoaXMuX3RvdWNoTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdXNlTGlzdGVuZXIgJiYgIV9jaGVja0xpc3RlbmVycyh0aGlzLCBfbW91c2VFdmVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbW91c2VMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XG5cbiAgICAgICAgICAgIHZhciBoYXNMaXN0ZW5lcnMgPSB0aGlzLl9idWJibGluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xuICAgICAgICAgICAgLy8gQWxsIGxpc3RlbmVyIHJlbW92ZWRcbiAgICAgICAgICAgIGlmICghaGFzTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+UE9TSVRJT05fT047XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflNDQUxFX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuUk9UQVRJT05fQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5ST1RBVElPTl9PTjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5TSVpFX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+QU5DSE9SX09OO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuQ09MT1JfQ0hBTkdFRDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5DT0xPUl9PTjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vZmZEaXNwYXRjaCAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICAvLyBBY2NlcHQgYWxzbyBwYXRhbWV0ZXJzIGxpa2U6ICh0eXBlLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSlcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgdXNlQ2FwdHVyZSA9IHRhcmdldDtcbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHVzZUNhcHR1cmUgPSAhIXVzZUNhcHR1cmU7XG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycyAmJiB0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMucmVtb3ZlQWxsKHR5cGUpO1xuICAgICAgICAgICAgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMgJiYgdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMucmVtb3ZlQWxsKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHVzZUNhcHR1cmUgPyB0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMgOiB0aGlzLl9idWJibGluZ0xpc3RlbmVycztcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMub2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICAgICAganMuYXJyYXkuZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyBhbGwgY2FsbGJhY2tzIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzYW1lIHRhcmdldC5cbiAgICAgKiAhI3poIOenu+mZpOebruagh+S4iueahOaJgOacieazqOWGjOS6i+S7tuOAglxuICAgICAqIEBtZXRob2QgdGFyZ2V0T2ZmXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCAtIFRoZSB0YXJnZXQgdG8gYmUgc2VhcmNoZWQgZm9yIGFsbCByZWxhdGVkIGNhbGxiYWNrc1xuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS50YXJnZXRPZmYodGFyZ2V0KTtcbiAgICAgKi9cbiAgICB0YXJnZXRPZmYgKHRhcmdldCkge1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnM7XG4gICAgICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy50YXJnZXRPZmYodGFyZ2V0KTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGV2ZW50IG1hc2sgcmVzZXRcbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE1hc2sgJj0gflBPU0lUSU9OX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBTQ0FMRV9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5TQ0FMRV9DSEFOR0VEKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50TWFzayAmPSB+U0NBTEVfT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIFJPVEFUSU9OX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlJPVEFUSU9OX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5ST1RBVElPTl9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy5fZXZlbnRNYXNrICYgU0laRV9PTikgJiYgIWxpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5TSVpFX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5TSVpFX09OO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLl9ldmVudE1hc2sgJiBBTkNIT1JfT04pICYmICFsaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5BTkNIT1JfT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMuX2V2ZW50TWFzayAmIENPTE9SX09OKSAmJiAhbGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkNPTE9SX0NIQU5HRUQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRNYXNrICY9IH5DT0xPUl9PTjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fY2FwdHVyaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMudGFyZ2V0T2ZmKHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAganMuYXJyYXkuZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3RvdWNoTGlzdGVuZXIgJiYgIV9jaGVja0xpc3RlbmVycyh0aGlzLCBfdG91Y2hFdmVudHMpKSB7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5fdG91Y2hMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLl90b3VjaExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbW91c2VMaXN0ZW5lciAmJiAhX2NoZWNrTGlzdGVuZXJzKHRoaXMsIF9tb3VzZUV2ZW50cykpIHtcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcih0aGlzLl9tb3VzZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuX21vdXNlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hlY2tzIHdoZXRoZXIgdGhlIEV2ZW50VGFyZ2V0IG9iamVjdCBoYXMgYW55IGNhbGxiYWNrIHJlZ2lzdGVyZWQgZm9yIGEgc3BlY2lmaWMgdHlwZSBvZiBldmVudC5cbiAgICAgKiAhI3poIOajgOafpeS6i+S7tuebruagh+WvueixoeaYr+WQpuacieS4uueJueWumuexu+Wei+eahOS6i+S7tuazqOWGjOeahOWbnuiwg+OAglxuICAgICAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiBhIGNhbGxiYWNrIG9mIHRoZSBzcGVjaWZpZWQgdHlwZSBpcyByZWdpc3RlcmVkOyBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgaGFzRXZlbnRMaXN0ZW5lciAodHlwZSkge1xuICAgICAgICBsZXQgaGFzID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9idWJibGluZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgaGFzID0gdGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMuaGFzRXZlbnRMaXN0ZW5lcih0eXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhcyAmJiB0aGlzLl9jYXB0dXJpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGhhcyA9IHRoaXMuX2NhcHR1cmluZ0xpc3RlbmVycy5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUcmlnZ2VyIGFuIGV2ZW50IGRpcmVjdGx5IHdpdGggdGhlIGV2ZW50IG5hbWUgYW5kIG5lY2Vzc2FyeSBhcmd1bWVudHMuXG4gICAgICogISN6aFxuICAgICAqIOmAmui/h+S6i+S7tuWQjeWPkemAgeiHquWumuS5ieS6i+S7tlxuICAgICAqXG4gICAgICogQG1ldGhvZCBlbWl0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtIHsqfSBbYXJnMV0gLSBGaXJzdCBhcmd1bWVudCBpbiBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7Kn0gW2FyZzJdIC0gU2Vjb25kIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnM10gLSBUaGlyZCBhcmd1bWVudCBpbiBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7Kn0gW2FyZzRdIC0gRm91cnRoIGFyZ3VtZW50IGluIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHsqfSBbYXJnNV0gLSBGaWZ0aCBhcmd1bWVudCBpbiBjYWxsYmFja1xuICAgICAqIEBleGFtcGxlXG4gICAgICogXG4gICAgICogZXZlbnRUYXJnZXQuZW1pdCgnZmlyZScsIGV2ZW50KTtcbiAgICAgKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgbWVzc2FnZSwgZW1pdHRlcik7XG4gICAgICovXG4gICAgZW1pdCAodHlwZSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xuICAgICAgICBpZiAodGhpcy5fYnViYmxpbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1YmJsaW5nTGlzdGVuZXJzLmVtaXQodHlwZSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIERpc3BhdGNoZXMgYW4gZXZlbnQgaW50byB0aGUgZXZlbnQgZmxvdy5cbiAgICAgKiBUaGUgZXZlbnQgdGFyZ2V0IGlzIHRoZSBFdmVudFRhcmdldCBvYmplY3QgdXBvbiB3aGljaCB0aGUgZGlzcGF0Y2hFdmVudCgpIG1ldGhvZCBpcyBjYWxsZWQuXG4gICAgICogISN6aCDliIblj5Hkuovku7bliLDkuovku7bmtYHkuK3jgIJcbiAgICAgKlxuICAgICAqIEBtZXRob2QgZGlzcGF0Y2hFdmVudFxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIEV2ZW50IG9iamVjdCB0aGF0IGlzIGRpc3BhdGNoZWQgaW50byB0aGUgZXZlbnQgZmxvd1xuICAgICAqL1xuICAgIGRpc3BhdGNoRXZlbnQgKGV2ZW50KSB7XG4gICAgICAgIF9kb0Rpc3BhdGNoRXZlbnQodGhpcywgZXZlbnQpO1xuICAgICAgICBfY2FjaGVkQXJyYXkubGVuZ3RoID0gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQYXVzZSBub2RlIHJlbGF0ZWQgc3lzdGVtIGV2ZW50cyByZWdpc3RlcmVkIHdpdGggdGhlIGN1cnJlbnQgTm9kZS4gTm9kZSBzeXN0ZW0gZXZlbnRzIGluY2x1ZGVzIHRvdWNoIGFuZCBtb3VzZSBldmVudHMuXG4gICAgICogSWYgcmVjdXJzaXZlIGlzIHNldCB0byB0cnVlLCB0aGVuIHRoaXMgQVBJIHdpbGwgcGF1c2UgdGhlIG5vZGUgc3lzdGVtIGV2ZW50cyBmb3IgdGhlIG5vZGUgYW5kIGFsbCBub2RlcyBpbiBpdHMgc3ViIG5vZGUgdHJlZS5cbiAgICAgKiBSZWZlcmVuY2U6IGh0dHA6Ly9kb2NzLmNvY29zMmQteC5vcmcvZWRpdG9yc19hbmRfdG9vbHMvY3JlYXRvci1jaGFwdGVycy9zY3JpcHRpbmcvaW50ZXJuYWwtZXZlbnRzL1xuICAgICAqICEjemgg5pqC5YGc5b2T5YmN6IqC54K55LiK5rOo5YaM55qE5omA5pyJ6IqC54K557O757uf5LqL5Lu277yM6IqC54K557O757uf5LqL5Lu25YyF5ZCr6Kem5pG45ZKM6byg5qCH5LqL5Lu244CCXG4gICAgICog5aaC5p6c5Lyg6YCSIHJlY3Vyc2l2ZSDkuLogdHJ1Ze+8jOmCo+S5iOi/meS4qiBBUEkg5bCG5pqC5YGc5pys6IqC54K55ZKM5a6D55qE5a2Q5qCR5LiK5omA5pyJ6IqC54K555qE6IqC54K557O757uf5LqL5Lu244CCXG4gICAgICog5Y+C6ICD77yaaHR0cHM6Ly93d3cuY29jb3MuY29tL2RvY3MvY3JlYXRvci9zY3JpcHRpbmcvaW50ZXJuYWwtZXZlbnRzLmh0bWxcbiAgICAgKiBAbWV0aG9kIHBhdXNlU3lzdGVtRXZlbnRzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWN1cnNpdmUgLSBXaGV0aGVyIHRvIHBhdXNlIG5vZGUgc3lzdGVtIGV2ZW50cyBvbiB0aGUgc3ViIG5vZGUgdHJlZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucGF1c2VTeXN0ZW1FdmVudHModHJ1ZSk7XG4gICAgICovXG4gICAgcGF1c2VTeXN0ZW1FdmVudHMgKHJlY3Vyc2l2ZSkge1xuICAgICAgICBldmVudE1hbmFnZXIucGF1c2VUYXJnZXQodGhpcywgcmVjdXJzaXZlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXN1bWUgbm9kZSByZWxhdGVkIHN5c3RlbSBldmVudHMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjdXJyZW50IE5vZGUuIE5vZGUgc3lzdGVtIGV2ZW50cyBpbmNsdWRlcyB0b3VjaCBhbmQgbW91c2UgZXZlbnRzLlxuICAgICAqIElmIHJlY3Vyc2l2ZSBpcyBzZXQgdG8gdHJ1ZSwgdGhlbiB0aGlzIEFQSSB3aWxsIHJlc3VtZSB0aGUgbm9kZSBzeXN0ZW0gZXZlbnRzIGZvciB0aGUgbm9kZSBhbmQgYWxsIG5vZGVzIGluIGl0cyBzdWIgbm9kZSB0cmVlLlxuICAgICAqIFJlZmVyZW5jZTogaHR0cDovL2RvY3MuY29jb3MyZC14Lm9yZy9lZGl0b3JzX2FuZF90b29scy9jcmVhdG9yLWNoYXB0ZXJzL3NjcmlwdGluZy9pbnRlcm5hbC1ldmVudHMvXG4gICAgICogISN6aCDmgaLlpI3lvZPliY3oioLngrnkuIrms6jlhoznmoTmiYDmnInoioLngrnns7vnu5/kuovku7bvvIzoioLngrnns7vnu5/kuovku7bljIXlkKvop6bmkbjlkozpvKDmoIfkuovku7bjgIJcbiAgICAgKiDlpoLmnpzkvKDpgJIgcmVjdXJzaXZlIOS4uiB0cnVl77yM6YKj5LmI6L+Z5LiqIEFQSSDlsIbmgaLlpI3mnKzoioLngrnlkozlroPnmoTlrZDmoJHkuIrmiYDmnInoioLngrnnmoToioLngrnns7vnu5/kuovku7bjgIJcbiAgICAgKiDlj4LogIPvvJpodHRwczovL3d3dy5jb2Nvcy5jb20vZG9jcy9jcmVhdG9yL3NjcmlwdGluZy9pbnRlcm5hbC1ldmVudHMuaHRtbFxuICAgICAqIEBtZXRob2QgcmVzdW1lU3lzdGVtRXZlbnRzXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWN1cnNpdmUgLSBXaGV0aGVyIHRvIHJlc3VtZSBub2RlIHN5c3RlbSBldmVudHMgb24gdGhlIHN1YiBub2RlIHRyZWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnJlc3VtZVN5c3RlbUV2ZW50cyh0cnVlKTtcbiAgICAgKi9cbiAgICByZXN1bWVTeXN0ZW1FdmVudHMgKHJlY3Vyc2l2ZSkge1xuICAgICAgICBldmVudE1hbmFnZXIucmVzdW1lVGFyZ2V0KHRoaXMsIHJlY3Vyc2l2ZSk7XG4gICAgfSxcblxuICAgIF9oaXRUZXN0IChwb2ludCwgbGlzdGVuZXIpIHtcbiAgICAgICAgbGV0IHcgPSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aCxcbiAgICAgICAgICAgIGggPSB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBjYW1lcmFQdCA9IF9odFZlYzNhLFxuICAgICAgICAgICAgdGVzdFB0ID0gX2h0VmVjM2I7XG4gICAgICAgIFxuICAgICAgICBsZXQgY2FtZXJhID0gY2MuQ2FtZXJhLmZpbmRDYW1lcmEodGhpcyk7XG4gICAgICAgIGlmIChjYW1lcmEpIHtcbiAgICAgICAgICAgIGNhbWVyYS5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQocG9pbnQsIGNhbWVyYVB0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbWVyYVB0LnNldChwb2ludCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICAvLyBJZiBzY2FsZSBpcyAwLCBpdCBjYW4ndCBiZSBoaXQuXG4gICAgICAgIGlmICghTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgVmVjMi50cmFuc2Zvcm1NYXQ0KHRlc3RQdCwgY2FtZXJhUHQsIF9tYXQ0X3RlbXApO1xuICAgICAgICB0ZXN0UHQueCArPSB0aGlzLl9hbmNob3JQb2ludC54ICogdztcbiAgICAgICAgdGVzdFB0LnkgKz0gdGhpcy5fYW5jaG9yUG9pbnQueSAqIGg7XG5cbiAgICAgICAgbGV0IGhpdCA9IGZhbHNlO1xuICAgICAgICBpZiAodGVzdFB0LnggPj0gMCAmJiB0ZXN0UHQueSA+PSAwICYmIHRlc3RQdC54IDw9IHcgJiYgdGVzdFB0LnkgPD0gaCkge1xuICAgICAgICAgICAgaGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciAmJiBsaXN0ZW5lci5tYXNrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hc2sgPSBsaXN0ZW5lci5tYXNrO1xuICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGxldCBsZW5ndGggPSBtYXNrID8gbWFzay5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIC8vIGZpbmQgbWFzayBwYXJlbnQsIHNob3VsZCBoaXQgdGVzdCBpdFxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBqID0gMDsgcGFyZW50ICYmIGogPCBsZW5ndGg7ICsraSwgcGFyZW50ID0gcGFyZW50LnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IG1hc2tbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0ZW1wLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSB0ZW1wLm5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29tcCA9IHBhcmVudC5nZXRDb21wb25lbnQoY2MuTWFzayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXAgJiYgY29tcC5fZW5hYmxlZCAmJiAhY29tcC5faGl0VGVzdChjYW1lcmFQdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFzayBwYXJlbnQgbm8gbG9uZ2VyIGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2subGVuZ3RoID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiB0ZW1wLmluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXNrIHBhcmVudCBubyBsb25nZXIgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrLmxlbmd0aCA9IGo7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuXG4gICAgICAgIHJldHVybiBoaXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdGhlIHRhcmdldHMgbGlzdGVuaW5nIHRvIHRoZSBzdXBwbGllZCB0eXBlIG9mIGV2ZW50IGluIHRoZSB0YXJnZXQncyBjYXB0dXJpbmcgcGhhc2UuXG4gICAgICogVGhlIGNhcHR1cmluZyBwaGFzZSBjb21wcmlzZXMgdGhlIGpvdXJuZXkgZnJvbSB0aGUgcm9vdCB0byB0aGUgbGFzdCBub2RlIEJFRk9SRSB0aGUgZXZlbnQgdGFyZ2V0J3Mgbm9kZS5cbiAgICAgKiBUaGUgcmVzdWx0IHNob3VsZCBzYXZlIGluIHRoZSBhcnJheSBwYXJhbWV0ZXIsIGFuZCBNVVNUIFNPUlQgZnJvbSBjaGlsZCBub2RlcyB0byBwYXJlbnQgbm9kZXMuXG4gICAgICpcbiAgICAgKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBtYWtlIGV2ZW50IHByb3BhZ2FibGUuXG4gICAgICogQG1ldGhvZCBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c1xuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSB0aGUgZXZlbnQgdHlwZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gdGhlIGFycmF5IHRvIHJlY2VpdmUgdGFyZ2V0c1xuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvZXZlbnQvX2dldENhcHR1cmluZ1RhcmdldHMuanN9XG4gICAgICovXG4gICAgX2dldENhcHR1cmluZ1RhcmdldHMgKHR5cGUsIGFycmF5KSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgaWYgKHBhcmVudC5fY2FwdHVyaW5nTGlzdGVuZXJzICYmIHBhcmVudC5fY2FwdHVyaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhbGwgdGhlIHRhcmdldHMgbGlzdGVuaW5nIHRvIHRoZSBzdXBwbGllZCB0eXBlIG9mIGV2ZW50IGluIHRoZSB0YXJnZXQncyBidWJibGluZyBwaGFzZS5cbiAgICAgKiBUaGUgYnViYmxpbmcgcGhhc2UgY29tcHJpc2VzIGFueSBTVUJTRVFVRU5UIG5vZGVzIGVuY291bnRlcmVkIG9uIHRoZSByZXR1cm4gdHJpcCB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZS5cbiAgICAgKiBUaGUgcmVzdWx0IHNob3VsZCBzYXZlIGluIHRoZSBhcnJheSBwYXJhbWV0ZXIsIGFuZCBNVVNUIFNPUlQgZnJvbSBjaGlsZCBub2RlcyB0byBwYXJlbnQgbm9kZXMuXG4gICAgICpcbiAgICAgKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBtYWtlIGV2ZW50IHByb3BhZ2FibGUuXG4gICAgICogQG1ldGhvZCBfZ2V0QnViYmxpbmdUYXJnZXRzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHRoZSBldmVudCB0eXBlXG4gICAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSB0aGUgYXJyYXkgdG8gcmVjZWl2ZSB0YXJnZXRzXG4gICAgICovXG4gICAgX2dldEJ1YmJsaW5nVGFyZ2V0cyAodHlwZSwgYXJyYXkpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICBpZiAocGFyZW50Ll9idWJibGluZ0xpc3RlbmVycyAmJiBwYXJlbnQuX2J1YmJsaW5nTGlzdGVuZXJzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSkpIHtcbiAgICAgICAgICAgICAgICBhcnJheS5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gQUNUSU9OU1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBFeGVjdXRlcyBhbiBhY3Rpb24sIGFuZCByZXR1cm5zIHRoZSBhY3Rpb24gdGhhdCBpcyBleGVjdXRlZC48YnIvPlxuICAgICAqIFRoZSBub2RlIGJlY29tZXMgdGhlIGFjdGlvbidzIHRhcmdldC4gUmVmZXIgdG8gY2MuQWN0aW9uJ3MgZ2V0VGFyZ2V0KCkgPGJyLz5cbiAgICAgKiBDYWxsaW5nIHJ1bkFjdGlvbiB3aGlsZSB0aGUgbm9kZSBpcyBub3QgYWN0aXZlIHdvbid0IGhhdmUgYW55IGVmZmVjdC4gPGJyLz5cbiAgICAgKiBOb3Rl77yaWW91IHNob3VsZG4ndCBtb2RpZnkgdGhlIGFjdGlvbiBhZnRlciBydW5BY3Rpb24sIHRoYXQgd29uJ3QgdGFrZSBhbnkgZWZmZWN0Ljxici8+XG4gICAgICogaWYgeW91IHdhbnQgdG8gbW9kaWZ5LCB3aGVuIHlvdSBkZWZpbmUgYWN0aW9uIHBsdXMuXG4gICAgICogISN6aFxuICAgICAqIOaJp+ihjOW5tui/lOWbnuivpeaJp+ihjOeahOWKqOS9nOOAguivpeiKgueCueWwhuS8muWPmOaIkOWKqOS9nOeahOebruagh+OAgjxici8+XG4gICAgICog6LCD55SoIHJ1bkFjdGlvbiDml7bvvIzoioLngrnoh6rouqvlpITkuo7kuI3mv4DmtLvnirbmgIHlsIbkuI3kvJrmnInku7vkvZXmlYjmnpzjgII8YnIvPlxuICAgICAqIOazqOaEj++8muS9oOS4jeW6lOivpeS/ruaUuSBydW5BY3Rpb24g5ZCO55qE5Yqo5L2c77yM5bCG5peg5rOV5Y+R5oyl5L2c55So77yM5aaC5p6c5oOz6L+b6KGM5L+u5pS577yM6K+35Zyo5a6a5LmJIGFjdGlvbiDml7bliqDlhaXjgIJcbiAgICAgKiBAbWV0aG9kIHJ1bkFjdGlvblxuICAgICAqIEBwYXJhbSB7QWN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcmV0dXJuIHtBY3Rpb259IEFuIEFjdGlvbiBwb2ludGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICogbm9kZS5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgKiBub2RlLnJ1bkFjdGlvbihhY3Rpb24pLnJlcGVhdEZvcmV2ZXIoKTsgLy8gZmFpbFxuICAgICAqIG5vZGUucnVuQWN0aW9uKGFjdGlvbi5yZXBlYXRGb3JldmVyKCkpOyAvLyByaWdodFxuICAgICAqL1xuICAgIHJ1bkFjdGlvbjogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYy5hc3NlcnRJRChhY3Rpb24sIDE2MTgpO1xuICAgICAgICBsZXQgYW0gPSBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCk7XG4gICAgICAgIGlmICghYW0uX3N1cHByZXNzRGVwcmVjYXRpb24pIHtcbiAgICAgICAgICAgIGFtLl9zdXBwcmVzc0RlcHJlY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIGNjLndhcm5JRCgxNjM5KTtcbiAgICAgICAgfVxuICAgICAgICBhbS5hZGRBY3Rpb24oYWN0aW9uLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiBhY3Rpb247XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUGF1c2UgYWxsIGFjdGlvbnMgcnVubmluZyBvbiB0aGUgY3VycmVudCBub2RlLiBFcXVhbHMgdG8gYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldChub2RlKWAuXG4gICAgICogISN6aCDmmoLlgZzmnKzoioLngrnkuIrmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzjgILlkowgYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5wYXVzZVRhcmdldChub2RlKTtgIOetieS7t+OAglxuICAgICAqIEBtZXRob2QgcGF1c2VBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnBhdXNlQWxsQWN0aW9ucygpO1xuICAgICAqL1xuICAgIHBhdXNlQWxsQWN0aW9uczogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucGF1c2VUYXJnZXQodGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzdW1lIGFsbCBwYXVzZWQgYWN0aW9ucyBvbiB0aGUgY3VycmVudCBub2RlLiBFcXVhbHMgdG8gYGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZXN1bWVUYXJnZXQobm9kZSlgLlxuICAgICAqICEjemgg5oGi5aSN6L+Q6KGM5pys6IqC54K55LiK5omA5pyJ5pqC5YGc55qE5Yqo5L2c44CC5ZKMIGBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVzdW1lVGFyZ2V0KG5vZGUpO2Ag562J5Lu344CCXG4gICAgICogQG1ldGhvZCByZXN1bWVBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnJlc3VtZUFsbEFjdGlvbnMoKTtcbiAgICAgKi9cbiAgICByZXN1bWVBbGxBY3Rpb25zOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU3RvcHMgYW5kIHJlbW92ZXMgYWxsIGFjdGlvbnMgZnJvbSB0aGUgcnVubmluZyBhY3Rpb24gbGlzdCAuXG4gICAgICogISN6aCDlgZzmraLlubbkuJTnp7vpmaTmiYDmnInmraPlnKjov5DooYznmoTliqjkvZzliJfooajjgIJcbiAgICAgKiBAbWV0aG9kIHN0b3BBbGxBY3Rpb25zXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICovXG4gICAgc3RvcEFsbEFjdGlvbnM6IEFjdGlvbk1hbmFnZXJFeGlzdCA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpLnJlbW92ZUFsbEFjdGlvbnNGcm9tVGFyZ2V0KHRoaXMpO1xuICAgIH0gOiBlbXB0eUZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3BzIGFuZCByZW1vdmVzIGFuIGFjdGlvbiBmcm9tIHRoZSBydW5uaW5nIGFjdGlvbiBsaXN0LlxuICAgICAqICEjemgg5YGc5q2i5bm256e76Zmk5oyH5a6a55qE5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCBzdG9wQWN0aW9uXG4gICAgICogQHBhcmFtIHtBY3Rpb259IGFjdGlvbiBBbiBhY3Rpb24gb2JqZWN0IHRvIGJlIHJlbW92ZWQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICogbm9kZS5zdG9wQWN0aW9uKGFjdGlvbik7XG4gICAgICovXG4gICAgc3RvcEFjdGlvbjogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWN0aW9uKGFjdGlvbik7XG4gICAgfSA6IGVtcHR5RnVuYyxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVtb3ZlcyBhbiBhY3Rpb24gZnJvbSB0aGUgcnVubmluZyBhY3Rpb24gbGlzdCBieSBpdHMgdGFnLlxuICAgICAqICEjemgg5YGc5q2i5bm25LiU56e76Zmk5oyH5a6a5qCH562+55qE5Yqo5L2c44CCXG4gICAgICogQG1ldGhvZCBzdG9wQWN0aW9uQnlUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnIEEgdGFnIHRoYXQgaW5kaWNhdGVzIHRoZSBhY3Rpb24gdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuc3RvcEFjdGlvbkJ5VGFnKDEpO1xuICAgICAqL1xuICAgIHN0b3BBY3Rpb25CeVRhZzogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKHRhZykge1xuICAgICAgICBpZiAodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE2MTIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5yZW1vdmVBY3Rpb25CeVRhZyh0YWcsIHRoaXMpO1xuICAgIH0gOiBlbXB0eUZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYW4gYWN0aW9uIGZyb20gdGhlIHJ1bm5pbmcgYWN0aW9uIGxpc3QgYnkgaXRzIHRhZy5cbiAgICAgKiAhI3poIOmAmui/h+agh+etvuiOt+WPluaMh+WumuWKqOS9nOOAglxuICAgICAqIEBtZXRob2QgZ2V0QWN0aW9uQnlUYWdcbiAgICAgKiBAc2VlIGNjLkFjdGlvbiNnZXRUYWcgYW5kIGNjLkFjdGlvbiNzZXRUYWdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGFnXG4gICAgICogQHJldHVybiB7QWN0aW9ufSBUaGUgYWN0aW9uIG9iamVjdCB3aXRoIHRoZSBnaXZlbiB0YWcuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYWN0aW9uID0gbm9kZS5nZXRBY3Rpb25CeVRhZygxKTtcbiAgICAgKi9cbiAgICBnZXRBY3Rpb25CeVRhZzogQWN0aW9uTWFuYWdlckV4aXN0ID8gZnVuY3Rpb24gKHRhZykge1xuICAgICAgICBpZiAodGFnID09PSBjYy5BY3Rpb24uVEFHX0lOVkFMSUQpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE2MTMpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNjLmRpcmVjdG9yLmdldEFjdGlvbk1hbmFnZXIoKS5nZXRBY3Rpb25CeVRhZyh0YWcsIHRoaXMpO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVycyBvZiBhY3Rpb25zIHRoYXQgYXJlIHJ1bm5pbmcgcGx1cyB0aGUgb25lcyB0aGF0IGFyZSBzY2hlZHVsZSB0byBydW4gKGFjdGlvbnMgaW4gYWN0aW9uc1RvQWRkIGFuZCBhY3Rpb25zIGFycmF5cykuPGJyLz5cbiAgICAgKiAgICBDb21wb3NhYmxlIGFjdGlvbnMgYXJlIGNvdW50ZWQgYXMgMSBhY3Rpb24uIEV4YW1wbGU6PGJyLz5cbiAgICAgKiAgICBJZiB5b3UgYXJlIHJ1bm5pbmcgMSBTZXF1ZW5jZSBvZiA3IGFjdGlvbnMsIGl0IHdpbGwgcmV0dXJuIDEuIDxici8+XG4gICAgICogICAgSWYgeW91IGFyZSBydW5uaW5nIDcgU2VxdWVuY2VzIG9mIDIgYWN0aW9ucywgaXQgd2lsbCByZXR1cm4gNy48L3A+XG4gICAgICogISN6aFxuICAgICAqIOiOt+WPlui/kOihjOedgOeahOWKqOS9nOWKoOS4iuato+WcqOiwg+W6pui/kOihjOeahOWKqOS9nOeahOaAu+aVsOOAgjxici8+XG4gICAgICog5L6L5aaC77yaPGJyLz5cbiAgICAgKiAtIOWmguaenOS9oOato+WcqOi/kOihjCA3IOS4quWKqOS9nOS4reeahCAxIOS4qiBTZXF1ZW5jZe+8jOWug+Wwhui/lOWbniAx44CCPGJyLz5cbiAgICAgKiAtIOWmguaenOS9oOato+WcqOi/kOihjCAyIOS4quWKqOS9nOS4reeahCA3IOS4qiBTZXF1ZW5jZe+8jOWug+Wwhui/lOWbniA344CCPGJyLz5cbiAgICAgKlxuICAgICAqIEBtZXRob2QgZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9uc1xuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBhY3Rpb25zIHRoYXQgYXJlIHJ1bm5pbmcgcGx1cyB0aGUgb25lcyB0aGF0IGFyZSBzY2hlZHVsZSB0byBydW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjb3VudCA9IG5vZGUuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9ucygpO1xuICAgICAqIGNjLmxvZyhcIlJ1bm5pbmcgQWN0aW9uIENvdW50OiBcIiArIGNvdW50KTtcbiAgICAgKi9cbiAgICBnZXROdW1iZXJPZlJ1bm5pbmdBY3Rpb25zOiBBY3Rpb25NYW5hZ2VyRXhpc3QgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkuZ2V0TnVtYmVyT2ZSdW5uaW5nQWN0aW9uc0luVGFyZ2V0KHRoaXMpO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG5cblxuLy8gVFJBTlNGT1JNIFJFTEFURURcbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIHBvc2l0aW9uICh4LCB5LCB6KSBvZiB0aGUgbm9kZSBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZXMuXG4gICAgICogWW91IGNhbiBwYXNzIGEgY2MuVmVjMiBvciBjYy5WZWMzIGFzIHRoZSBhcmd1bWVudCB0byByZWNlaXZlIHRoZSByZXR1cm4gdmFsdWVzLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5boioLngrnlnKjniLboioLngrnlnZDmoIfns7vkuK3nmoTkvY3nva7vvIh4LCB5LCB677yJ44CCXG4gICAgICog5L2g5Y+v5Lul5Lyg5LiA5LiqIGNjLlZlYzIg5oiW6ICFIGNjLlZlYzMg5L2c5Li65Y+C5pWw5p2l5o6l5pS26L+U5Zue5YC844CCXG4gICAgICogQG1ldGhvZCBnZXRQb3NpdGlvblxuICAgICAqIEBwYXJhbSB7VmVjMnxWZWMzfSBbb3V0XSAtIFRoZSByZXR1cm4gdmFsdWUgdG8gcmVjZWl2ZSBwb3NpdGlvblxuICAgICAqIEByZXR1cm4ge1ZlYzJ8VmVjM30gVGhlIHBvc2l0aW9uICh4LCB5LCB6KSBvZiB0aGUgbm9kZSBpbiBpdHMgcGFyZW50J3MgY29vcmRpbmF0ZXNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmxvZyhcIk5vZGUgUG9zaXRpb246IFwiICsgbm9kZS5nZXRQb3NpdGlvbigpKTtcbiAgICAgKi9cbiAgICBnZXRQb3NpdGlvbiAob3V0KSB7XG4gICAgICAgIG91dCA9IG91dCB8fCBuZXcgVmVjMygpO1xuICAgICAgICByZXR1cm4gVHJzLnRvUG9zaXRpb24ob3V0LCB0aGlzLl90cnMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogU2V0cyB0aGUgcG9zaXRpb24gKHgsIHksIHopIG9mIHRoZSBub2RlIGluIGl0cyBwYXJlbnQncyBjb29yZGluYXRlcy48YnIvPlxuICAgICAqIFVzdWFsbHkgd2UgdXNlIGNjLnYyKHgsIHkpIHRvIGNvbXBvc2UgY2MuVmVjMiBvYmplY3QsPGJyLz5cbiAgICAgKiBhbmQgcGFzc2luZyB0d28gbnVtYmVycyAoeCwgeSkgaXMgbW9yZSBlZmZpY2llbnQgdGhhbiBwYXNzaW5nIGNjLlZlYzIgb2JqZWN0LlxuICAgICAqIEZvciAzRCBub2RlIHdlIGNhbiB1c2UgY2MudjMoeCwgeSwgeikgdG8gY29tcG9zZSBjYy5WZWMzIG9iamVjdCw8YnIvPlxuICAgICAqIGFuZCBwYXNzaW5nIHRocmVlIG51bWJlcnMgKHgsIHksIHopIGlzIG1vcmUgZWZmaWNpZW50IHRoYW4gcGFzc2luZyBjYy5WZWMzIG9iamVjdC5cbiAgICAgKiAhI3poXG4gICAgICog6K6+572u6IqC54K55Zyo54i26IqC54K55Z2Q5qCH57O75Lit55qE5L2N572u44CCPGJyLz5cbiAgICAgKiDlj6/ku6XpgJrov4fkuIvpnaLnmoTmlrnlvI/orr7nva7lnZDmoIfngrnvvJo8YnIvPlxuICAgICAqIDEuIOS8oOWFpSAyIOS4quaVsOWAvCB4LCB544CCPGJyLz5cbiAgICAgKiAyLiDkvKDlhaUgY2MudjIoeCwgeSkg57G75Z6L5Li6IGNjLlZlYzIg55qE5a+56LGh44CCXG4gICAgICogMy4g5a+55LqOIDNEIOiKgueCueWPr+S7peS8oOWFpSAzIOS4quaVsOWAvCB4LCB5LCB644CCPGJyLz5cbiAgICAgKiA0LiDlr7nkuo4gM0Qg6IqC54K55Y+v5Lul5Lyg5YWlIGNjLnYzKHgsIHksIHopIOexu+Wei+S4uiBjYy5WZWMzIOeahOWvueixoeOAglxuICAgICAqIEBtZXRob2Qgc2V0UG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzJ8VmVjM3xOdW1iZXJ9IG5ld1Bvc09yWCAtIFggY29vcmRpbmF0ZSBmb3IgcG9zaXRpb24gb3IgdGhlIHBvc2l0aW9uICh4LCB5LCB6KSBvZiB0aGUgbm9kZSBpbiBjb29yZGluYXRlc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gLSBZIGNvb3JkaW5hdGUgZm9yIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt6XSAtIFogY29vcmRpbmF0ZSBmb3IgcG9zaXRpb25cbiAgICAgKi9cbiAgICBzZXRQb3NpdGlvbiAobmV3UG9zT3JYLCB5LCB6KSB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB4ID0gbmV3UG9zT3JYLng7XG4gICAgICAgICAgICB5ID0gbmV3UG9zT3JYLnk7XG4gICAgICAgICAgICB6ID0gbmV3UG9zT3JYLnogfHwgMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHggPSBuZXdQb3NPclg7XG4gICAgICAgICAgICB6ID0geiB8fCAwXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgaWYgKHRyc1swXSA9PT0geCAmJiB0cnNbMV0gPT09IHkgJiYgdHJzWzJdID09PSB6KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIG9sZFBvc2l0aW9uID0gbmV3IGNjLlZlYzModHJzWzBdLCB0cnNbMV0sIHRyc1syXSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdHJzWzBdID0geDtcbiAgICAgICAgdHJzWzFdID0geTtcbiAgICAgICAgdHJzWzJdID0gejtcbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG4gICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNKTtcbiAgICBcbiAgICAgICAgLy8gZmFzdCBjaGVjayBldmVudFxuICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUE9TSVRJT05fT04pIHtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIG9sZFBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIHNjYWxlIGZhY3RvciBvZiB0aGUgbm9kZS5cbiAgICAgKiBOZWVkIHBhc3MgYSBjYy5WZWMyIG9yIGNjLlZlYzMgYXMgdGhlIGFyZ3VtZW50IHRvIHJlY2VpdmUgdGhlIHJldHVybiB2YWx1ZXMuXG4gICAgICogISN6aCDojrflj5boioLngrnnmoTnvKnmlL7vvIzpnIDopoHkvKDkuIDkuKogY2MuVmVjMiDmiJbogIUgY2MuVmVjMyDkvZzkuLrlj4LmlbDmnaXmjqXmlLbov5Tlm57lgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNjYWxlXG4gICAgICogQHBhcmFtIHtWZWMyfFZlYzN9IG91dFxuICAgICAqIEByZXR1cm4ge1ZlYzJ8VmVjM30gVGhlIHNjYWxlIGZhY3RvclxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MubG9nKFwiTm9kZSBTY2FsZTogXCIgKyBub2RlLmdldFNjYWxlKGNjLnYzKCkpKTtcbiAgICAgKi9cbiAgICBnZXRTY2FsZSAob3V0KSB7XG4gICAgICAgIGlmIChvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIFRycy50b1NjYWxlKG91dCwgdGhpcy5fdHJzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMTQwMCwgJ2NjLk5vZGUuZ2V0U2NhbGUnLCAnY2MuTm9kZS5zY2FsZSBvciBjYy5Ob2RlLmdldFNjYWxlKGNjLlZlYzMpJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJzWzddO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBzY2FsZSBvZiBheGlzIGluIGxvY2FsIGNvb3JkaW5hdGVzIG9mIHRoZSBub2RlLlxuICAgICAqIFlvdSBjYW4gb3BlcmF0ZSAyIGF4aXMgaW4gMkQgbm9kZSwgYW5kIDMgYXhpcyBpbiAzRCBub2RlLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7oioLngrnlnKjmnKzlnLDlnZDmoIfns7vkuK3lnZDmoIfovbTkuIrnmoTnvKnmlL7mr5TkvovjgIJcbiAgICAgKiAyRCDoioLngrnlj6/ku6Xmk43kvZzkuKTkuKrlnZDmoIfovbTvvIzogIwgM0Qg6IqC54K55Y+v5Lul5pON5L2c5LiJ5Liq5Z2Q5qCH6L2044CCXG4gICAgICogQG1ldGhvZCBzZXRTY2FsZVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFZlYzJ8VmVjM30geCAtIHNjYWxlWCBvciBzY2FsZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3ldXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt6XVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5zZXRTY2FsZShjYy52MigyLCAyKSk7XG4gICAgICogbm9kZS5zZXRTY2FsZShjYy52MygyLCAyLCAyKSk7IC8vIGZvciAzRCBub2RlXG4gICAgICogbm9kZS5zZXRTY2FsZSgyKTtcbiAgICAgKi9cbiAgICBzZXRTY2FsZSAoeCwgeSwgeikge1xuICAgICAgICBpZiAoeCAmJiB0eXBlb2YgeCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHkgPSB4Lnk7XG4gICAgICAgICAgICB6ID0geC56ID09PSB1bmRlZmluZWQgPyAxIDogeC56O1xuICAgICAgICAgICAgeCA9IHgueDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh4ICE9PSB1bmRlZmluZWQgJiYgeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB5ID0geDtcbiAgICAgICAgICAgIHogPSB4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgaWYgKHRyc1s3XSAhPT0geCB8fCB0cnNbOF0gIT09IHkgfHwgdHJzWzldICE9PSB6KSB7XG4gICAgICAgICAgICB0cnNbN10gPSB4O1xuICAgICAgICAgICAgdHJzWzhdID0geTtcbiAgICAgICAgICAgIHRyc1s5XSA9IHo7XG4gICAgICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuQUxMX1NDQUxFKTtcbiAgICAgICAgICAgICFDQ19OQVRJVkVSRU5ERVJFUiAmJiAodGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNKTtcbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBTQ0FMRV9PTikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0NBTEVfQ0hBTkdFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCByb3RhdGlvbiBvZiBub2RlIChpbiBxdWF0ZXJuaW9uKS5cbiAgICAgKiBOZWVkIHBhc3MgYSBjYy5RdWF0IGFzIHRoZSBhcmd1bWVudCB0byByZWNlaXZlIHRoZSByZXR1cm4gdmFsdWVzLlxuICAgICAqICEjemhcbiAgICAgKiDojrflj5bor6XoioLngrnnmoQgcXVhdGVybmlvbiDml4vovazop5LluqbvvIzpnIDopoHkvKDkuIDkuKogY2MuUXVhdCDkvZzkuLrlj4LmlbDmnaXmjqXmlLbov5Tlm57lgLzjgIJcbiAgICAgKiBAbWV0aG9kIGdldFJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtRdWF0fSBvdXRcbiAgICAgKiBAcmV0dXJuIHtRdWF0fSBRdWF0ZXJuaW9uIG9iamVjdCByZXByZXNlbnRzIHRoZSByb3RhdGlvblxuICAgICAqL1xuICAgIGdldFJvdGF0aW9uIChvdXQpIHtcbiAgICAgICAgaWYgKG91dCBpbnN0YW5jZW9mIFF1YXQpIHtcbiAgICAgICAgICAgIHJldHVybiBUcnMudG9Sb3RhdGlvbihvdXQsIHRoaXMuX3Rycyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVCVUcpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuKFwiYGNjLk5vZGUuZ2V0Um90YXRpb24oKWAgaXMgZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjAsIHBsZWFzZSB1c2UgYC1jYy5Ob2RlLmFuZ2xlYCBpbnN0ZWFkLiAoYHRoaXMubm9kZS5nZXRSb3RhdGlvbigpYCAtPiBgLXRoaXMubm9kZS5hbmdsZWApXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC10aGlzLmFuZ2xlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHJvdGF0aW9uIG9mIG5vZGUgKGluIHF1YXRlcm5pb24pLlxuICAgICAqICEjemgg6K6+572u6K+l6IqC54K555qEIHF1YXRlcm5pb24g5peL6L2s6KeS5bqm44CCXG4gICAgICogQG1ldGhvZCBzZXRSb3RhdGlvblxuICAgICAqIEBwYXJhbSB7Y2MuUXVhdHxOdW1iZXJ9IHF1YXQgUXVhdGVybmlvbiBvYmplY3QgcmVwcmVzZW50cyB0aGUgcm90YXRpb24gb3IgdGhlIHggdmFsdWUgb2YgcXVhdGVybmlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0geSB2YWx1ZSBvZiBxdXRlcm5pb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3pdIHogdmFsdWUgb2YgcXV0ZXJuaW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt3XSB3IHZhbHVlIG9mIHF1dGVybmlvblxuICAgICAqL1xuICAgIHNldFJvdGF0aW9uIChyb3RhdGlvbiwgeSwgeiwgdykge1xuICAgICAgICBpZiAodHlwZW9mIHJvdGF0aW9uID09PSAnbnVtYmVyJyAmJiB5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRykge1xuICAgICAgICAgICAgICAgIGNjLndhcm4oXCJgY2MuTm9kZS5zZXRSb3RhdGlvbihkZWdyZWUpYCBpcyBkZXByZWNhdGVkIHNpbmNlIHYyLjEuMCwgcGxlYXNlIHNldCBgLWNjLk5vZGUuYW5nbGVgIGluc3RlYWQuIChgdGhpcy5ub2RlLnNldFJvdGF0aW9uKHgpYCAtPiBgdGhpcy5ub2RlLmFuZ2xlID0gLXhgKVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYW5nbGUgPSAtcm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgeCA9IHJvdGF0aW9uO1xuICAgICAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHggPSByb3RhdGlvbi54O1xuICAgICAgICAgICAgICAgIHkgPSByb3RhdGlvbi55O1xuICAgICAgICAgICAgICAgIHogPSByb3RhdGlvbi56O1xuICAgICAgICAgICAgICAgIHcgPSByb3RhdGlvbi53O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAgICAgaWYgKHRyc1szXSAhPT0geCB8fCB0cnNbNF0gIT09IHkgfHwgdHJzWzVdICE9PSB6IHx8IHRyc1s2XSAhPT0gdykge1xuICAgICAgICAgICAgICAgIHRyc1szXSA9IHg7XG4gICAgICAgICAgICAgICAgdHJzWzRdID0geTtcbiAgICAgICAgICAgICAgICB0cnNbNV0gPSB6O1xuICAgICAgICAgICAgICAgIHRyc1s2XSA9IHc7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgUk9UQVRJT05fT04pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5ST1RBVElPTl9DSEFOR0VEKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RvRXVsZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgYSBjb3B5IHRoZSB1bnRyYW5zZm9ybWVkIHNpemUgb2YgdGhlIG5vZGUuIDxici8+XG4gICAgICogVGhlIGNvbnRlbnRTaXplIHJlbWFpbnMgdGhlIHNhbWUgbm8gbWF0dGVyIHRoZSBub2RlIGlzIHNjYWxlZCBvciByb3RhdGVkLjxici8+XG4gICAgICogQWxsIG5vZGVzIGhhcyBhIHNpemUuIExheWVyIGFuZCBTY2VuZSBoYXMgdGhlIHNhbWUgc2l6ZSBvZiB0aGUgc2NyZWVuIGJ5IGRlZmF1bHQuIDxici8+XG4gICAgICogISN6aCDojrflj5boioLngrnoh6rouqvlpKflsI/vvIzkuI3lj5for6XoioLngrnmmK/lkKbooqvnvKnmlL7miJbogIXml4vovaznmoTlvbHlk43jgIJcbiAgICAgKiBAbWV0aG9kIGdldENvbnRlbnRTaXplXG4gICAgICogQHJldHVybiB7U2l6ZX0gVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSBvZiB0aGUgbm9kZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmxvZyhcIkNvbnRlbnQgU2l6ZTogXCIgKyBub2RlLmdldENvbnRlbnRTaXplKCkpO1xuICAgICAqL1xuICAgIGdldENvbnRlbnRTaXplICgpIHtcbiAgICAgICAgcmV0dXJuIGNjLnNpemUodGhpcy5fY29udGVudFNpemUud2lkdGgsIHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSB1bnRyYW5zZm9ybWVkIHNpemUgb2YgdGhlIG5vZGUuPGJyLz5cbiAgICAgKiBUaGUgY29udGVudFNpemUgcmVtYWlucyB0aGUgc2FtZSBubyBtYXR0ZXIgdGhlIG5vZGUgaXMgc2NhbGVkIG9yIHJvdGF0ZWQuPGJyLz5cbiAgICAgKiBBbGwgbm9kZXMgaGFzIGEgc2l6ZS4gTGF5ZXIgYW5kIFNjZW5lIGhhcyB0aGUgc2FtZSBzaXplIG9mIHRoZSBzY3JlZW4uXG4gICAgICogISN6aCDorr7nva7oioLngrnljp/lp4vlpKflsI/vvIzkuI3lj5for6XoioLngrnmmK/lkKbooqvnvKnmlL7miJbogIXml4vovaznmoTlvbHlk43jgIJcbiAgICAgKiBAbWV0aG9kIHNldENvbnRlbnRTaXplXG4gICAgICogQHBhcmFtIHtTaXplfE51bWJlcn0gc2l6ZSAtIFRoZSB1bnRyYW5zZm9ybWVkIHNpemUgb2YgdGhlIG5vZGUgb3IgVGhlIHVudHJhbnNmb3JtZWQgc2l6ZSdzIHdpZHRoIG9mIHRoZSBub2RlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbaGVpZ2h0XSAtIFRoZSB1bnRyYW5zZm9ybWVkIHNpemUncyBoZWlnaHQgb2YgdGhlIG5vZGUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUoMTAwLCAxMDApKTtcbiAgICAgKiBub2RlLnNldENvbnRlbnRTaXplKDEwMCwgMTAwKTtcbiAgICAgKi9cbiAgICBzZXRDb250ZW50U2l6ZSAoc2l6ZSwgaGVpZ2h0KSB7XG4gICAgICAgIHZhciBsb2NDb250ZW50U2l6ZSA9IHRoaXMuX2NvbnRlbnRTaXplO1xuICAgICAgICB2YXIgY2xvbmU7XG4gICAgICAgIGlmIChoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKChzaXplLndpZHRoID09PSBsb2NDb250ZW50U2l6ZS53aWR0aCkgJiYgKHNpemUuaGVpZ2h0ID09PSBsb2NDb250ZW50U2l6ZS5oZWlnaHQpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgICAgICBjbG9uZSA9IGNjLnNpemUobG9jQ29udGVudFNpemUud2lkdGgsIGxvY0NvbnRlbnRTaXplLmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsb2NDb250ZW50U2l6ZS53aWR0aCA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICBsb2NDb250ZW50U2l6ZS5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgoc2l6ZSA9PT0gbG9jQ29udGVudFNpemUud2lkdGgpICYmIChoZWlnaHQgPT09IGxvY0NvbnRlbnRTaXplLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIGNsb25lID0gY2Muc2l6ZShsb2NDb250ZW50U2l6ZS53aWR0aCwgbG9jQ29udGVudFNpemUuaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLndpZHRoID0gc2l6ZTtcbiAgICAgICAgICAgIGxvY0NvbnRlbnRTaXplLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZXZlbnRNYXNrICYgU0laRV9PTikge1xuICAgICAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuU0laRV9DSEFOR0VELCBjbG9uZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBhbmNob3IgcG9pbnQuPGJyLz5cbiAgICAgKiBBbmNob3IgcG9pbnQgaXMgdGhlIHBvaW50IGFyb3VuZCB3aGljaCBhbGwgdHJhbnNmb3JtYXRpb25zIGFuZCBwb3NpdGlvbmluZyBtYW5pcHVsYXRpb25zIHRha2UgcGxhY2UuPGJyLz5cbiAgICAgKiBJdCdzIGxpa2UgYSBwaW4gaW4gdGhlIG5vZGUgd2hlcmUgaXQgaXMgXCJhdHRhY2hlZFwiIHRvIGl0cyBwYXJlbnQuIDxici8+XG4gICAgICogVGhlIGFuY2hvclBvaW50IGlzIG5vcm1hbGl6ZWQsIGxpa2UgYSBwZXJjZW50YWdlLiAoMCwwKSBtZWFucyB0aGUgYm90dG9tLWxlZnQgY29ybmVyIGFuZCAoMSwxKSBtZWFucyB0aGUgdG9wLXJpZ2h0IGNvcm5lci4gPGJyLz5cbiAgICAgKiBCdXQgeW91IGNhbiB1c2UgdmFsdWVzIGhpZ2hlciB0aGFuICgxLDEpIGFuZCBsb3dlciB0aGFuICgwLDApIHRvby4gIDxici8+XG4gICAgICogVGhlIGRlZmF1bHQgYW5jaG9yIHBvaW50IGlzICgwLjUsMC41KSwgc28gaXQgc3RhcnRzIGF0IHRoZSBjZW50ZXIgb2YgdGhlIG5vZGUuXG4gICAgICogISN6aFxuICAgICAqIOiOt+WPluiKgueCuemUmueCue+8jOeUqOeZvuWIhuavlOihqOekuuOAgjxici8+XG4gICAgICog6ZSa54K55bqU55So5LqO5omA5pyJ5Y+Y5o2i5ZKM5Z2Q5qCH54K555qE5pON5L2c77yM5a6D5bCx5YOP5Zyo6IqC54K55LiK6L+e5o6l5YW254i26IqC54K555qE5aSn5aS06ZKI44CCPGJyLz5cbiAgICAgKiDplJrngrnmmK/moIflh4bljJbnmoTvvIzlsLHlg4/nmb7liIbmr5TkuIDmoLfjgIIoMO+8jDApIOihqOekuuW3puS4i+inku+8jCgx77yMMSkg6KGo56S65Y+z5LiK6KeS44CCPGJyLz5cbiAgICAgKiDkvYbmmK/kvaDlj6/ku6Xkvb/nlKjmr5TvvIgx77yMMe+8ieabtOmrmOeahOWAvOaIluiAheavlO+8iDDvvIww77yJ5pu05L2O55qE5YC844CCPGJyLz5cbiAgICAgKiDpu5jorqTnmoTplJrngrnmmK/vvIgwLjXvvIwwLjXvvInvvIzlm6DmraTlroPlvIDlp4vkuo7oioLngrnnmoTkuK3lv4PkvY3nva7jgII8YnIvPlxuICAgICAqIOazqOaEj++8mkNyZWF0b3Ig5Lit55qE6ZSa54K55LuF55So5LqO5a6a5L2N5omA5Zyo55qE6IqC54K577yM5a2Q6IqC54K555qE5a6a5L2N5LiN5Y+X5b2x5ZON44CCXG4gICAgICogQG1ldGhvZCBnZXRBbmNob3JQb2ludFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9IFRoZSBhbmNob3IgcG9pbnQgb2Ygbm9kZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNjLmxvZyhcIk5vZGUgQW5jaG9yUG9pbnQ6IFwiICsgbm9kZS5nZXRBbmNob3JQb2ludCgpKTtcbiAgICAgKi9cbiAgICBnZXRBbmNob3JQb2ludCAoKSB7XG4gICAgICAgIHJldHVybiBjYy52Mih0aGlzLl9hbmNob3JQb2ludCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBTZXRzIHRoZSBhbmNob3IgcG9pbnQgaW4gcGVyY2VudC4gPGJyLz5cbiAgICAgKiBhbmNob3IgcG9pbnQgaXMgdGhlIHBvaW50IGFyb3VuZCB3aGljaCBhbGwgdHJhbnNmb3JtYXRpb25zIGFuZCBwb3NpdGlvbmluZyBtYW5pcHVsYXRpb25zIHRha2UgcGxhY2UuIDxici8+XG4gICAgICogSXQncyBsaWtlIGEgcGluIGluIHRoZSBub2RlIHdoZXJlIGl0IGlzIFwiYXR0YWNoZWRcIiB0byBpdHMgcGFyZW50LiA8YnIvPlxuICAgICAqIFRoZSBhbmNob3JQb2ludCBpcyBub3JtYWxpemVkLCBsaWtlIGEgcGVyY2VudGFnZS4gKDAsMCkgbWVhbnMgdGhlIGJvdHRvbS1sZWZ0IGNvcm5lciBhbmQgKDEsMSkgbWVhbnMgdGhlIHRvcC1yaWdodCBjb3JuZXIuPGJyLz5cbiAgICAgKiBCdXQgeW91IGNhbiB1c2UgdmFsdWVzIGhpZ2hlciB0aGFuICgxLDEpIGFuZCBsb3dlciB0aGFuICgwLDApIHRvby48YnIvPlxuICAgICAqIFRoZSBkZWZhdWx0IGFuY2hvciBwb2ludCBpcyAoMC41LDAuNSksIHNvIGl0IHN0YXJ0cyBhdCB0aGUgY2VudGVyIG9mIHRoZSBub2RlLlxuICAgICAqICEjemhcbiAgICAgKiDorr7nva7plJrngrnnmoTnmb7liIbmr5TjgII8YnIvPlxuICAgICAqIOmUmueCueW6lOeUqOS6juaJgOacieWPmOaNouWSjOWdkOagh+eCueeahOaTjeS9nO+8jOWug+WwseWDj+WcqOiKgueCueS4iui/nuaOpeWFtueItuiKgueCueeahOWkp+WktOmSiOOAgjxici8+XG4gICAgICog6ZSa54K55piv5qCH5YeG5YyW55qE77yM5bCx5YOP55m+5YiG5q+U5LiA5qC344CCKDDvvIwwKSDooajnpLrlt6bkuIvop5LvvIwoMe+8jDEpIOihqOekuuWPs+S4iuinkuOAgjxici8+XG4gICAgICog5L2G5piv5L2g5Y+v5Lul5L2/55So5q+U77yIMe+8jDHvvInmm7Tpq5jnmoTlgLzmiJbogIXmr5TvvIgw77yMMO+8ieabtOS9jueahOWAvOOAgjxici8+XG4gICAgICog6buY6K6k55qE6ZSa54K55piv77yIMC4177yMMC4177yJ77yM5Zug5q2k5a6D5byA5aeL5LqO6IqC54K555qE5Lit5b+D5L2N572u44CCPGJyLz5cbiAgICAgKiDms6jmhI/vvJpDcmVhdG9yIOS4reeahOmUmueCueS7heeUqOS6juWumuS9jeaJgOWcqOeahOiKgueCue+8jOWtkOiKgueCueeahOWumuS9jeS4jeWPl+W9seWTjeOAglxuICAgICAqIEBtZXRob2Qgc2V0QW5jaG9yUG9pbnRcbiAgICAgKiBAcGFyYW0ge1ZlYzJ8TnVtYmVyfSBwb2ludCAtIFRoZSBhbmNob3IgcG9pbnQgb2Ygbm9kZSBvciBUaGUgeCBheGlzIGFuY2hvciBvZiBub2RlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbeV0gLSBUaGUgeSBheGlzIGFuY2hvciBvZiBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5zZXRBbmNob3JQb2ludChjYy52MigxLCAxKSk7XG4gICAgICogbm9kZS5zZXRBbmNob3JQb2ludCgxLCAxKTtcbiAgICAgKi9cbiAgICBzZXRBbmNob3JQb2ludCAocG9pbnQsIHkpIHtcbiAgICAgICAgdmFyIGxvY0FuY2hvclBvaW50ID0gdGhpcy5fYW5jaG9yUG9pbnQ7XG4gICAgICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICgocG9pbnQueCA9PT0gbG9jQW5jaG9yUG9pbnQueCkgJiYgKHBvaW50LnkgPT09IGxvY0FuY2hvclBvaW50LnkpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGxvY0FuY2hvclBvaW50LnggPSBwb2ludC54O1xuICAgICAgICAgICAgbG9jQW5jaG9yUG9pbnQueSA9IHBvaW50Lnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoKHBvaW50ID09PSBsb2NBbmNob3JQb2ludC54KSAmJiAoeSA9PT0gbG9jQW5jaG9yUG9pbnQueSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbG9jQW5jaG9yUG9pbnQueCA9IHBvaW50O1xuICAgICAgICAgICAgbG9jQW5jaG9yUG9pbnQueSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTik7XG4gICAgICAgIGlmICh0aGlzLl9ldmVudE1hc2sgJiBBTkNIT1JfT04pIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogVHJhbnNmb3JtcyBwb3NpdGlvbiBmcm9tIHdvcmxkIHNwYWNlIHRvIGxvY2FsIHNwYWNlLlxuICAgICAqIEBtZXRob2QgX2ludlRyYW5zZm9ybVBvaW50XG4gICAgICogQHBhcmFtIHtWZWMzfSBvdXRcbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHZlYzNcbiAgICAgKi9cbiAgICBfaW52VHJhbnNmb3JtUG9pbnQgKG91dCwgcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5faW52VHJhbnNmb3JtUG9pbnQob3V0LCBwb3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVmVjMy5jb3B5KG91dCwgcG9zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsdHJzID0gdGhpcy5fdHJzO1xuICAgICAgICAvLyBvdXQgPSBwYXJlbnRfaW52X3BvcyAtIHBvc1xuICAgICAgICBUcnMudG9Qb3NpdGlvbihfdHBWZWMzYSwgbHRycyk7XG4gICAgICAgIFZlYzMuc3ViKG91dCwgb3V0LCBfdHBWZWMzYSk7XG5cbiAgICAgICAgLy8gb3V0ID0gaW52KHJvdCkgKiBvdXRcbiAgICAgICAgVHJzLnRvUm90YXRpb24oX3RwUXVhdGEsIGx0cnMpO1xuICAgICAgICBRdWF0LmNvbmp1Z2F0ZShfdHBRdWF0YiwgX3RwUXVhdGEpO1xuICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQob3V0LCBvdXQsIF90cFF1YXRiKTtcblxuICAgICAgICAvLyBvdXQgPSAoMS9zY2FsZSkgKiBvdXRcbiAgICAgICAgVHJzLnRvU2NhbGUoX3RwVmVjM2EsIGx0cnMpO1xuICAgICAgICBWZWMzLmludmVyc2VTYWZlKF90cFZlYzNiLCBfdHBWZWMzYSk7XG4gICAgICAgIFZlYzMubXVsKG91dCwgb3V0LCBfdHBWZWMzYik7XG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuICAgIFxuICAgIC8qXG4gICAgICogQ2FsY3VsYXRlIGFuZCByZXR1cm4gd29ybGQgcG9zaXRpb24uXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIGdldFdvcmxkUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzN9IG91dFxuICAgICAqIEByZXR1cm4ge1ZlYzN9XG4gICAgICovXG4gICAgZ2V0V29ybGRQb3NpdGlvbiAob3V0KSB7XG4gICAgICAgIFRycy50b1Bvc2l0aW9uKG91dCwgdGhpcy5fdHJzKTtcbiAgICAgICAgbGV0IGN1cnIgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIGxldCBsdHJzO1xuICAgICAgICB3aGlsZSAoY3Vycikge1xuICAgICAgICAgICAgbHRycyA9IGN1cnIuX3RycztcbiAgICAgICAgICAgIC8vIG91dCA9IHBhcmVudF9zY2FsZSAqIHBvc1xuICAgICAgICAgICAgVHJzLnRvU2NhbGUoX2d3cFZlYzMsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy5tdWwob3V0LCBvdXQsIF9nd3BWZWMzKTtcbiAgICAgICAgICAgIC8vIG91dCA9IHBhcmVudF9xdWF0ICogb3V0XG4gICAgICAgICAgICBUcnMudG9Sb3RhdGlvbihfZ3dwUXVhdCwgbHRycyk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybVF1YXQob3V0LCBvdXQsIF9nd3BRdWF0KTtcbiAgICAgICAgICAgIC8vIG91dCA9IG91dCArIHBvc1xuICAgICAgICAgICAgVHJzLnRvUG9zaXRpb24oX2d3cFZlYzMsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy5hZGQob3V0LCBvdXQsIF9nd3BWZWMzKTtcbiAgICAgICAgICAgIGN1cnIgPSBjdXJyLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBTZXQgd29ybGQgcG9zaXRpb24uXG4gICAgICogVGhpcyBpcyBub3QgYSBwdWJsaWMgQVBJIHlldCwgaXRzIHVzYWdlIGNvdWxkIGJlIHVwZGF0ZWRcbiAgICAgKiBAbWV0aG9kIHNldFdvcmxkUG9zaXRpb25cbiAgICAgKiBAcGFyYW0ge1ZlYzN9IHBvc1xuICAgICAqL1xuICAgIHNldFdvcmxkUG9zaXRpb24gKHBvcykge1xuICAgICAgICBsZXQgbHRycyA9IHRoaXMuX3RycztcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdmFyIG9sZFBvc2l0aW9uID0gbmV3IGNjLlZlYzMobHRyc1swXSwgbHRyc1sxXSwgbHRyc1syXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTk9URTogdGhpcyBpcyBmYXN0ZXIgdGhhbiBpbnZlcnQgd29ybGQgbWF0cml4IGFuZCB0cmFuc2Zvcm0gdGhlIHBvaW50XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5faW52VHJhbnNmb3JtUG9pbnQoX3N3cFZlYzMsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBWZWMzLmNvcHkoX3N3cFZlYzMsIHBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgVHJzLmZyb21Qb3NpdGlvbihsdHJzLCBfc3dwVmVjMyk7XG4gICAgICAgIHRoaXMuc2V0TG9jYWxEaXJ0eShMb2NhbERpcnR5RmxhZy5BTExfUE9TSVRJT04pO1xuXG4gICAgICAgIC8vIGZhc3QgY2hlY2sgZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuX2V2ZW50TWFzayAmIFBPU0lUSU9OX09OKSB7XG4gICAgICAgICAgICAvLyBzZW5kIGV2ZW50XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5QT1NJVElPTl9DSEFOR0VELCBvbGRQb3NpdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ2FsY3VsYXRlIGFuZCByZXR1cm4gd29ybGQgcm90YXRpb25cbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRSb3RhdGlvblxuICAgICAqIEBwYXJhbSB7UXVhdH0gb3V0XG4gICAgICogQHJldHVybiB7UXVhdH1cbiAgICAgKi9cbiAgICBnZXRXb3JsZFJvdGF0aW9uIChvdXQpIHtcbiAgICAgICAgVHJzLnRvUm90YXRpb24oX2d3clF1YXQsIHRoaXMuX3Rycyk7XG4gICAgICAgIFF1YXQuY29weShvdXQsIF9nd3JRdWF0KTtcbiAgICAgICAgbGV0IGN1cnIgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChjdXJyKSB7XG4gICAgICAgICAgICBUcnMudG9Sb3RhdGlvbihfZ3dyUXVhdCwgY3Vyci5fdHJzKTtcbiAgICAgICAgICAgIFF1YXQubXVsKG91dCwgX2d3clF1YXQsIG91dCk7XG4gICAgICAgICAgICBjdXJyID0gY3Vyci5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHdvcmxkIHJvdGF0aW9uIHdpdGggcXVhdGVybmlvblxuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBzZXRXb3JsZFJvdGF0aW9uXG4gICAgICogQHBhcmFtIHtRdWF0fSB2YWxcbiAgICAgKi9cbiAgICBzZXRXb3JsZFJvdGF0aW9uICh2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmdldFdvcmxkUm90YXRpb24oX3N3clF1YXQpO1xuICAgICAgICAgICAgUXVhdC5jb25qdWdhdGUoX3N3clF1YXQsIF9zd3JRdWF0KTtcbiAgICAgICAgICAgIFF1YXQubXVsKF9zd3JRdWF0LCBfc3dyUXVhdCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFF1YXQuY29weShfc3dyUXVhdCwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgICBUcnMuZnJvbVJvdGF0aW9uKHRoaXMuX3RycywgX3N3clF1YXQpO1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICB0aGlzLl90b0V1bGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9ST1RBVElPTik7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ2FsY3VsYXRlIGFuZCByZXR1cm4gd29ybGQgc2NhbGVcbiAgICAgKiBUaGlzIGlzIG5vdCBhIHB1YmxpYyBBUEkgeWV0LCBpdHMgdXNhZ2UgY291bGQgYmUgdXBkYXRlZFxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRTY2FsZVxuICAgICAqIEBwYXJhbSB7VmVjM30gb3V0XG4gICAgICogQHJldHVybiB7VmVjM31cbiAgICAgKi9cbiAgICBnZXRXb3JsZFNjYWxlIChvdXQpIHtcbiAgICAgICAgVHJzLnRvU2NhbGUoX2d3c1ZlYzMsIHRoaXMuX3Rycyk7XG4gICAgICAgIFZlYzMuY29weShvdXQsIF9nd3NWZWMzKTtcbiAgICAgICAgbGV0IGN1cnIgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChjdXJyKSB7XG4gICAgICAgICAgICBUcnMudG9TY2FsZShfZ3dzVmVjMywgY3Vyci5fdHJzKTtcbiAgICAgICAgICAgIFZlYzMubXVsKG91dCwgb3V0LCBfZ3dzVmVjMyk7XG4gICAgICAgICAgICBjdXJyID0gY3Vyci5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0IHdvcmxkIHNjYWxlIHdpdGggdmVjM1xuICAgICAqIFRoaXMgaXMgbm90IGEgcHVibGljIEFQSSB5ZXQsIGl0cyB1c2FnZSBjb3VsZCBiZSB1cGRhdGVkXG4gICAgICogQG1ldGhvZCBzZXRXb3JsZFNjYWxlXG4gICAgICogQHBhcmFtIHtWZWMzfSBzY2FsZVxuICAgICAqL1xuICAgIHNldFdvcmxkU2NhbGUgKHNjYWxlKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5nZXRXb3JsZFNjYWxlKF9zd3NWZWMzKTtcbiAgICAgICAgICAgIFZlYzMuZGl2KF9zd3NWZWMzLCBzY2FsZSwgX3N3c1ZlYzMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgVmVjMy5jb3B5KF9zd3NWZWMzLCBzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgVHJzLmZyb21TY2FsZSh0aGlzLl90cnMsIF9zd3NWZWMzKTtcbiAgICAgICAgdGhpcy5zZXRMb2NhbERpcnR5KExvY2FsRGlydHlGbGFnLkFMTF9TQ0FMRSk7XG4gICAgfSxcblxuICAgIGdldFdvcmxkUlQgKG91dCkge1xuICAgICAgICBsZXQgb3BvcyA9IF9nd3J0VmVjM2E7XG4gICAgICAgIGxldCBvcm90ID0gX2d3cnRRdWF0YTtcbiAgICAgICAgbGV0IGx0cnMgPSB0aGlzLl90cnM7XG4gICAgICAgIFRycy50b1Bvc2l0aW9uKG9wb3MsIGx0cnMpO1xuICAgICAgICBUcnMudG9Sb3RhdGlvbihvcm90LCBsdHJzKTtcblxuICAgICAgICBsZXQgY3VyciA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgd2hpbGUgKGN1cnIpIHtcbiAgICAgICAgICAgIGx0cnMgPSBjdXJyLl90cnM7XG4gICAgICAgICAgICAvLyBvcG9zID0gcGFyZW50X2xzY2FsZSAqIGxwb3NcbiAgICAgICAgICAgIFRycy50b1NjYWxlKF9nd3J0VmVjM2IsIGx0cnMpO1xuICAgICAgICAgICAgVmVjMy5tdWwob3Bvcywgb3BvcywgX2d3cnRWZWMzYik7XG4gICAgICAgICAgICAvLyBvcG9zID0gcGFyZW50X2xyb3QgKiBvcG9zXG4gICAgICAgICAgICBUcnMudG9Sb3RhdGlvbihfZ3dydFF1YXRiLCBsdHJzKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtUXVhdChvcG9zLCBvcG9zLCBfZ3dydFF1YXRiKTtcbiAgICAgICAgICAgIC8vIG9wb3MgPSBvcG9zICsgbHBvc1xuICAgICAgICAgICAgVHJzLnRvUG9zaXRpb24oX2d3cnRWZWMzYiwgbHRycyk7XG4gICAgICAgICAgICBWZWMzLmFkZChvcG9zLCBvcG9zLCBfZ3dydFZlYzNiKTtcbiAgICAgICAgICAgIC8vIG9yb3QgPSBscm90ICogb3JvdFxuICAgICAgICAgICAgUXVhdC5tdWwob3JvdCwgX2d3cnRRdWF0Yiwgb3JvdCk7XG4gICAgICAgICAgICBjdXJyID0gY3Vyci5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIE1hdDQuZnJvbVJUKG91dCwgb3JvdCwgb3Bvcyk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHJvdGF0aW9uIGJ5IGxvb2tBdCB0YXJnZXQgcG9pbnQsIG5vcm1hbGx5IHVzZWQgYnkgQ2FtZXJhIE5vZGVcbiAgICAgKiAhI3poIOmAmui/h+inguWvn+ebruagh+adpeiuvue9riByb3RhdGlvbu+8jOS4gOiIrOeUqOS6jiBDYW1lcmEgTm9kZSDkuIpcbiAgICAgKiBAbWV0aG9kIGxvb2tBdFxuICAgICAqIEBwYXJhbSB7VmVjM30gcG9zXG4gICAgICogQHBhcmFtIHtWZWMzfSBbdXBdIC0gZGVmYXVsdCBpcyAoMCwxLDApXG4gICAgICovXG4gICAgbG9va0F0IChwb3MsIHVwKSB7XG4gICAgICAgIHRoaXMuZ2V0V29ybGRQb3NpdGlvbihfbGFWZWMzKTtcbiAgICAgICAgVmVjMy5zdWIoX2xhVmVjMywgX2xhVmVjMywgcG9zKTsgLy8gTk9URTogd2UgdXNlIC16IGZvciB2aWV3LWRpclxuICAgICAgICBWZWMzLm5vcm1hbGl6ZShfbGFWZWMzLCBfbGFWZWMzKTtcbiAgICAgICAgUXVhdC5mcm9tVmlld1VwKF9sYVF1YXQsIF9sYVZlYzMsIHVwKTtcbiAgICBcbiAgICAgICAgdGhpcy5zZXRXb3JsZFJvdGF0aW9uKF9sYVF1YXQpO1xuICAgIH0sXG5cbiAgICBfdXBkYXRlTG9jYWxNYXRyaXg6IHVwZGF0ZUxvY2FsTWF0cml4MkQsXG5cbiAgICBfY2FsY3VsV29ybGRNYXRyaXggKCkge1xuICAgICAgICAvLyBBdm9pZCBhcyBtdWNoIGZ1bmN0aW9uIGNhbGwgYXMgcG9zc2libGVcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsTWF0RGlydHkgJiBMb2NhbERpcnR5RmxhZy5UUlNTKSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBBc3N1bWUgcGFyZW50IHdvcmxkIG1hdHJpeCBpcyBjb3JyZWN0XG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX211bE1hdCh0aGlzLl93b3JsZE1hdHJpeCwgcGFyZW50Ll93b3JsZE1hdHJpeCwgdGhpcy5fbWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIE1hdDQuY29weSh0aGlzLl93b3JsZE1hdHJpeCwgdGhpcy5fbWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl93b3JsZE1hdERpcnR5ID0gZmFsc2U7XG4gICAgfSxcblxuICAgIF9tdWxNYXQ6IG11bE1hdDJELFxuXG4gICAgX3VwZGF0ZVdvcmxkTWF0cml4ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl93b3JsZE1hdERpcnR5KSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxXb3JsZE1hdHJpeCgpO1xuICAgICAgICAgICAgLy8gU3luYyBkaXJ0eSB0byBjaGlsZHJlblxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLl93b3JsZE1hdERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRMb2NhbERpcnR5IChmbGFnKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsTWF0RGlydHkgfD0gZmxhZztcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgaWYgKGZsYWcgPT09IExvY2FsRGlydHlGbGFnLkFMTF9QT1NJVElPTiB8fCBmbGFnID09PSBMb2NhbERpcnR5RmxhZy5QT1NJVElPTikge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfV09STERfVFJBTlNGT1JNO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9LFxuXG4gICAgc2V0V29ybGREaXJ0eSAoKSB7XG4gICAgICAgIHRoaXMuX3dvcmxkTWF0RGlydHkgPSB0cnVlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBsb2NhbCB0cmFuc2Zvcm0gbWF0cml4ICg0eDQpLCBiYXNlZCBvbiBwYXJlbnQgbm9kZSBjb29yZGluYXRlc1xuICAgICAqICEjemgg6L+U5Zue5bGA6YOo56m66Ze05Z2Q5qCH57O755qE55+p6Zi177yM5Z+65LqO54i26IqC54K55Z2Q5qCH57O744CCXG4gICAgICogQG1ldGhvZCBnZXRMb2NhbE1hdHJpeFxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IFRoZSBtYXRyaXggb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSBTYW1lIGFzIHRoZSBvdXQgbWF0cml4IG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IG1hdDQgPSBjYy5tYXQ0KCk7XG4gICAgICogbm9kZS5nZXRMb2NhbE1hdHJpeChtYXQ0KTtcbiAgICAgKi9cbiAgICBnZXRMb2NhbE1hdHJpeCAob3V0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgICAgIHJldHVybiBNYXQ0LmNvcHkob3V0LCB0aGlzLl9tYXRyaXgpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEdldCB0aGUgd29ybGQgdHJhbnNmb3JtIG1hdHJpeCAoNHg0KVxuICAgICAqICEjemgg6L+U5Zue5LiW55WM56m66Ze05Z2Q5qCH57O755qE55+p6Zi144CCXG4gICAgICogQG1ldGhvZCBnZXRXb3JsZE1hdHJpeFxuICAgICAqIEBwYXJhbSB7TWF0NH0gb3V0IFRoZSBtYXRyaXggb2JqZWN0IHRvIGJlIGZpbGxlZCB3aXRoIGRhdGFcbiAgICAgKiBAcmV0dXJuIHtNYXQ0fSBTYW1lIGFzIHRoZSBvdXQgbWF0cml4IG9iamVjdFxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGV0IG1hdDQgPSBjYy5tYXQ0KCk7XG4gICAgICogbm9kZS5nZXRXb3JsZE1hdHJpeChtYXQ0KTtcbiAgICAgKi9cbiAgICBnZXRXb3JsZE1hdHJpeCAob3V0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIHJldHVybiBNYXQ0LmNvcHkob3V0LCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXJ0cyBhIFBvaW50IHRvIG5vZGUgKGxvY2FsKSBzcGFjZSBjb29yZGluYXRlcy5cbiAgICAgKiAhI3poXG4gICAgICog5bCG5LiA5Liq54K56L2s5o2i5Yiw6IqC54K5ICjlsYDpg6gpIOepuumXtOWdkOagh+ezu+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvTm9kZVNwYWNlQVJcbiAgICAgKiBAcGFyYW0ge1ZlYzN8VmVjMn0gd29ybGRQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjM3xWZWMyfSBbb3V0XVxuICAgICAqIEByZXR1cm4ge1ZlYzN8VmVjMn1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNvbnZlcnRUb05vZGVTcGFjZUFSPFQgZXh0ZW5kcyBjYy5WZWMyIHwgY2MuVmVjMz4od29ybGRQb2ludDogVCwgb3V0PzogVCk6IFRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdWZWMyID0gbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjYy52MigxMDAsIDEwMCkpO1xuICAgICAqIHZhciBuZXdWZWMzID0gbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjYy52MygxMDAsIDEwMCwgMTAwKSk7XG4gICAgICovXG4gICAgY29udmVydFRvTm9kZVNwYWNlQVIgKHdvcmxkUG9pbnQsIG91dCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl93b3JsZE1hdHJpeCk7XG5cbiAgICAgICAgaWYgKHdvcmxkUG9pbnQgaW5zdGFuY2VvZiBjYy5WZWMyKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzIoKTtcbiAgICAgICAgICAgIHJldHVybiBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCB3b3JsZFBvaW50LCBfbWF0NF90ZW1wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMygpO1xuICAgICAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIHdvcmxkUG9pbnQsIF9tYXQ0X3RlbXApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBDb252ZXJ0cyBhIFBvaW50IGluIG5vZGUgY29vcmRpbmF0ZXMgdG8gd29ybGQgc3BhY2UgY29vcmRpbmF0ZXMuXG4gICAgICogISN6aFxuICAgICAqIOWwhuiKgueCueWdkOagh+ezu+S4i+eahOS4gOS4queCuei9rOaNouWIsOS4lueVjOepuumXtOWdkOagh+ezu+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvV29ybGRTcGFjZUFSXG4gICAgICogQHBhcmFtIHtWZWMzfFZlYzJ9IG5vZGVQb2ludFxuICAgICAqIEBwYXJhbSB7VmVjM3xWZWMyfSBbb3V0XVxuICAgICAqIEByZXR1cm4ge1ZlYzN8VmVjMn1cbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGNvbnZlcnRUb1dvcmxkU3BhY2VBUjxUIGV4dGVuZHMgY2MuVmVjMiB8IGNjLlZlYzM+KG5vZGVQb2ludDogVCwgb3V0PzogVCk6IFRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBuZXdWZWMyID0gbm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MudjIoMTAwLCAxMDApKTtcbiAgICAgKiB2YXIgbmV3VmVjMyA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYzKDEwMCwgMTAwLCAxMDApKTtcbiAgICAgKi9cbiAgICBjb252ZXJ0VG9Xb3JsZFNwYWNlQVIgKG5vZGVQb2ludCwgb3V0KSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIGlmIChub2RlUG9pbnQgaW5zdGFuY2VvZiBjYy5WZWMyKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgfHwgbmV3IGNjLlZlYzIoKTtcbiAgICAgICAgICAgIHJldHVybiBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCBub2RlUG9pbnQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG91dCA9IG91dCB8fCBuZXcgY2MuVmVjMygpO1xuICAgICAgICAgICAgcmV0dXJuIFZlYzMudHJhbnNmb3JtTWF0NChvdXQsIG5vZGVQb2ludCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuLy8gT0xEIFRSQU5TRk9STSBBQ0NFU1MgQVBJc1xuIC8qKlxuICAgICAqICEjZW4gQ29udmVydHMgYSBQb2ludCB0byBub2RlIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMgdGhlbiBhZGQgdGhlIGFuY2hvciBwb2ludCBwb3NpdGlvbi5cbiAgICAgKiBTbyB0aGUgcmV0dXJuIHBvc2l0aW9uIHdpbGwgYmUgcmVsYXRlZCB0byB0aGUgbGVmdCBib3R0b20gY29ybmVyIG9mIHRoZSBub2RlJ3MgYm91bmRpbmcgYm94LlxuICAgICAqIFRoaXMgZXF1YWxzIHRvIHRoZSBBUEkgYmVoYXZpb3Igb2YgY29jb3MyZC14LCB5b3UgcHJvYmFibHkgd2FudCB0byB1c2UgY29udmVydFRvTm9kZVNwYWNlQVIgaW5zdGVhZFxuICAgICAqICEjemgg5bCG5LiA5Liq54K56L2s5o2i5Yiw6IqC54K5ICjlsYDpg6gpIOWdkOagh+ezu++8jOW5tuWKoOS4iumUmueCueeahOWdkOagh+OAgjxici8+XG4gICAgICog5Lmf5bCx5piv6K+06L+U5Zue55qE5Z2Q5qCH5piv55u45a+55LqO6IqC54K55YyF5Zu055uS5bem5LiL6KeS55qE5Z2Q5qCH44CCPGJyLz5cbiAgICAgKiDov5nkuKogQVBJIOeahOiuvuiuoeaYr+S4uuS6huWSjCBjb2NvczJkLXgg5Lit6KGM5Li65LiA6Ie077yM5pu05aSa5oOF5Ya15LiL5L2g5Y+v6IO96ZyA6KaB5L2/55SoIGNvbnZlcnRUb05vZGVTcGFjZUFS44CCXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9Ob2RlU3BhY2VcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4xLjNcbiAgICAgKiBAcGFyYW0ge1ZlYzJ9IHdvcmxkUG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb05vZGVTcGFjZShjYy52MigxMDAsIDEwMCkpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb05vZGVTcGFjZSAod29ybGRQb2ludCkge1xuICAgICAgICB0aGlzLl91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl93b3JsZE1hdHJpeCk7XG4gICAgICAgIGxldCBvdXQgPSBuZXcgY2MuVmVjMigpO1xuICAgICAgICBWZWMyLnRyYW5zZm9ybU1hdDQob3V0LCB3b3JsZFBvaW50LCBfbWF0NF90ZW1wKTtcbiAgICAgICAgb3V0LnggKz0gdGhpcy5fYW5jaG9yUG9pbnQueCAqIHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICBvdXQueSArPSB0aGlzLl9hbmNob3JQb2ludC55ICogdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENvbnZlcnRzIGEgUG9pbnQgcmVsYXRlZCB0byB0aGUgbGVmdCBib3R0b20gY29ybmVyIG9mIHRoZSBub2RlJ3MgYm91bmRpbmcgYm94IHRvIHdvcmxkIHNwYWNlIGNvb3JkaW5hdGVzLlxuICAgICAqIFRoaXMgZXF1YWxzIHRvIHRoZSBBUEkgYmVoYXZpb3Igb2YgY29jb3MyZC14LCB5b3UgcHJvYmFibHkgd2FudCB0byB1c2UgY29udmVydFRvV29ybGRTcGFjZUFSIGluc3RlYWRcbiAgICAgKiAhI3poIOWwhuS4gOS4quebuOWvueS6juiKgueCueW3puS4i+inkueahOWdkOagh+S9jee9rui9rOaNouWIsOS4lueVjOepuumXtOWdkOagh+ezu+OAglxuICAgICAqIOi/meS4qiBBUEkg55qE6K6+6K6h5piv5Li65LqG5ZKMIGNvY29zMmQteCDkuK3ooYzkuLrkuIDoh7TvvIzmm7TlpJrmg4XlhrXkuIvkvaDlj6/og73pnIDopoHkvb/nlKggY29udmVydFRvV29ybGRTcGFjZUFSXG4gICAgICogQG1ldGhvZCBjb252ZXJ0VG9Xb3JsZFNwYWNlXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMS4zXG4gICAgICogQHBhcmFtIHtWZWMyfSBub2RlUG9pbnRcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2UoY2MudjIoMTAwLCAxMDApKTtcbiAgICAgKi9cbiAgICBjb252ZXJ0VG9Xb3JsZFNwYWNlIChub2RlUG9pbnQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgbGV0IG91dCA9IG5ldyBjYy5WZWMyKFxuICAgICAgICAgICAgbm9kZVBvaW50LnggLSB0aGlzLl9hbmNob3JQb2ludC54ICogdGhpcy5fY29udGVudFNpemUud2lkdGgsXG4gICAgICAgICAgICBub2RlUG9pbnQueSAtIHRoaXMuX2FuY2hvclBvaW50LnkgKiB0aGlzLl9jb250ZW50U2l6ZS5oZWlnaHRcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIFZlYzIudHJhbnNmb3JtTWF0NChvdXQsIG91dCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmV0dXJucyB0aGUgbWF0cml4IHRoYXQgdHJhbnNmb3JtIHRoZSBub2RlJ3MgKGxvY2FsKSBzcGFjZSBjb29yZGluYXRlcyBpbnRvIHRoZSBwYXJlbnQncyBzcGFjZSBjb29yZGluYXRlcy48YnIvPlxuICAgICAqIFRoZSBtYXRyaXggaXMgaW4gUGl4ZWxzLlxuICAgICAqICEjemgg6L+U5Zue6L+Z5Liq5bCG6IqC54K577yI5bGA6YOo77yJ55qE56m66Ze05Z2Q5qCH57O76L2s5o2i5oiQ54i26IqC54K555qE56m66Ze05Z2Q5qCH57O755qE55+p6Zi144CC6L+Z5Liq55+p6Zi15Lul5YOP57Sg5Li65Y2V5L2N44CCXG4gICAgICogQG1ldGhvZCBnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm0oYWZmaW5lVHJhbnNmb3JtKTtcbiAgICAgKi9cbiAgICBnZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm0gKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGNvbnRlbnRTaXplID0gdGhpcy5fY29udGVudFNpemU7XG4gICAgICAgIF92ZWMzX3RlbXAueCA9IC10aGlzLl9hbmNob3JQb2ludC54ICogY29udGVudFNpemUud2lkdGg7XG4gICAgICAgIF92ZWMzX3RlbXAueSA9IC10aGlzLl9hbmNob3JQb2ludC55ICogY29udGVudFNpemUuaGVpZ2h0O1xuXG4gICAgICAgIE1hdDQuY29weShfbWF0NF90ZW1wLCB0aGlzLl9tYXRyaXgpO1xuICAgICAgICBNYXQ0LnRyYW5zZm9ybShfbWF0NF90ZW1wLCBfbWF0NF90ZW1wLCBfdmVjM190ZW1wKTtcbiAgICAgICAgcmV0dXJuIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgX21hdDRfdGVtcCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSBtYXRyaXggdGhhdCB0cmFuc2Zvcm0gdGhlIG5vZGUncyAobG9jYWwpIHNwYWNlIGNvb3JkaW5hdGVzIGludG8gdGhlIHBhcmVudCdzIHNwYWNlIGNvb3JkaW5hdGVzLjxici8+XG4gICAgICogVGhlIG1hdHJpeCBpcyBpbiBQaXhlbHMuPGJyLz5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBBUiAoQW5jaG9yIFJlbGF0aXZlKS5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue6L+Z5Liq5bCG6IqC54K577yI5bGA6YOo77yJ55qE56m66Ze05Z2Q5qCH57O76L2s5o2i5oiQ54i26IqC54K555qE56m66Ze05Z2Q5qCH57O755qE55+p6Zi144CCPGJyLz5cbiAgICAgKiDov5nkuKrnn6npmLXku6Xlg4/ntKDkuLrljZXkvY3jgII8YnIvPlxuICAgICAqIOivpeaWueazleWfuuS6juiKgueCueWdkOagh+OAglxuICAgICAqIEBtZXRob2QgZ2V0Tm9kZVRvUGFyZW50VHJhbnNmb3JtQVJcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9QYXJlbnRUcmFuc2Zvcm1BUihhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldE5vZGVUb1BhcmVudFRyYW5zZm9ybUFSIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlTG9jYWxNYXRyaXgoKTtcbiAgICAgICAgcmV0dXJuIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgdGhpcy5fbWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSB3b3JsZCBhZmZpbmUgdHJhbnNmb3JtIG1hdHJpeC4gVGhlIG1hdHJpeCBpcyBpbiBQaXhlbHMuXG4gICAgICogISN6aCDov5Tlm57oioLngrnliLDkuJbnlYzlnZDmoIfns7vnmoTku7/lsITlj5jmjaLnn6npmLXjgILnn6npmLXljZXkvY3mmK/lg4/ntKDjgIJcbiAgICAgKiBAbWV0aG9kIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7QWZmaW5lVHJhbnNmb3JtfSBbb3V0XSBUaGUgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3QgdG8gYmUgZmlsbGVkIHdpdGggZGF0YVxuICAgICAqIEByZXR1cm4ge0FmZmluZVRyYW5zZm9ybX0gU2FtZSBhcyB0aGUgb3V0IGFmZmluZSB0cmFuc2Zvcm0gb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBsZXQgYWZmaW5lVHJhbnNmb3JtID0gY2MuQWZmaW5lVHJhbnNmb3JtLmNyZWF0ZSgpO1xuICAgICAqIG5vZGUuZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm0oYWZmaW5lVHJhbnNmb3JtKTtcbiAgICAgKi9cbiAgICBnZXROb2RlVG9Xb3JsZFRyYW5zZm9ybSAob3V0KSB7XG4gICAgICAgIGlmICghb3V0KSB7XG4gICAgICAgICAgICBvdXQgPSBBZmZpbmVUcmFucy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgY29udGVudFNpemUgPSB0aGlzLl9jb250ZW50U2l6ZTtcbiAgICAgICAgX3ZlYzNfdGVtcC54ID0gLXRoaXMuX2FuY2hvclBvaW50LnggKiBjb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgX3ZlYzNfdGVtcC55ID0gLXRoaXMuX2FuY2hvclBvaW50LnkgKiBjb250ZW50U2l6ZS5oZWlnaHQ7XG5cbiAgICAgICAgTWF0NC5jb3B5KF9tYXQ0X3RlbXAsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICAgICAgTWF0NC50cmFuc2Zvcm0oX21hdDRfdGVtcCwgX21hdDRfdGVtcCwgX3ZlYzNfdGVtcCk7XG5cbiAgICAgICAgcmV0dXJuIEFmZmluZVRyYW5zLmZyb21NYXQ0KG91dCwgX21hdDRfdGVtcCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZXR1cm5zIHRoZSB3b3JsZCBhZmZpbmUgdHJhbnNmb3JtIG1hdHJpeC4gVGhlIG1hdHJpeCBpcyBpbiBQaXhlbHMuPGJyLz5cbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBBUiAoQW5jaG9yIFJlbGF0aXZlKS5cbiAgICAgKiAhI3poXG4gICAgICog6L+U5Zue6IqC54K55Yiw5LiW55WM5Z2Q5qCH5Lu/5bCE5Y+Y5o2i55+p6Zi144CC55+p6Zi15Y2V5L2N5piv5YOP57Sg44CCPGJyLz5cbiAgICAgKiDor6Xmlrnms5Xln7rkuo7oioLngrnlnZDmoIfjgIJcbiAgICAgKiBAbWV0aG9kIGdldE5vZGVUb1dvcmxkVHJhbnNmb3JtQVJcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXROb2RlVG9Xb3JsZFRyYW5zZm9ybUFSKGFmZmluZVRyYW5zZm9ybSk7XG4gICAgICovXG4gICAgZ2V0Tm9kZVRvV29ybGRUcmFuc2Zvcm1BUiAob3V0KSB7XG4gICAgICAgIGlmICghb3V0KSB7XG4gICAgICAgICAgICBvdXQgPSBBZmZpbmVUcmFucy5pZGVudGl0eSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVdvcmxkTWF0cml4KCk7XG4gICAgICAgIHJldHVybiBBZmZpbmVUcmFucy5mcm9tTWF0NChvdXQsIHRoaXMuX3dvcmxkTWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIG1hdHJpeCB0aGF0IHRyYW5zZm9ybSBwYXJlbnQncyBzcGFjZSBjb29yZGluYXRlcyB0byB0aGUgbm9kZSdzIChsb2NhbCkgc3BhY2UgY29vcmRpbmF0ZXMuPGJyLz5cbiAgICAgKiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy4gVGhlIHJldHVybmVkIHRyYW5zZm9ybSBpcyByZWFkb25seSBhbmQgY2Fubm90IGJlIGNoYW5nZWQuXG4gICAgICogISN6aFxuICAgICAqIOi/lOWbnuWwhueItuiKgueCueeahOWdkOagh+ezu+i9rOaNouaIkOiKgueCue+8iOWxgOmDqO+8ieeahOepuumXtOWdkOagh+ezu+eahOefqemYteOAgjxici8+XG4gICAgICog6K+l55+p6Zi15Lul5YOP57Sg5Li65Y2V5L2N44CC6L+U5Zue55qE55+p6Zi15piv5Y+q6K+755qE77yM5LiN6IO95pu05pS544CCXG4gICAgICogQG1ldGhvZCBnZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm0oYWZmaW5lVHJhbnNmb3JtKTtcbiAgICAgKi9cbiAgICBnZXRQYXJlbnRUb05vZGVUcmFuc2Zvcm0gKG91dCkge1xuICAgICAgICBpZiAoIW91dCkge1xuICAgICAgICAgICAgb3V0ID0gQWZmaW5lVHJhbnMuaWRlbnRpdHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVMb2NhbE1hdHJpeCgpO1xuICAgICAgICBNYXQ0LmludmVydChfbWF0NF90ZW1wLCB0aGlzLl9tYXRyaXgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBpbnZlcnNlIHdvcmxkIGFmZmluZSB0cmFuc2Zvcm0gbWF0cml4LiBUaGUgbWF0cml4IGlzIGluIFBpeGVscy5cbiAgICAgKiAhI2VuIOi/lOWbnuS4lueVjOWdkOagh+ezu+WIsOiKgueCueWdkOagh+ezu+eahOmAhuefqemYteOAglxuICAgICAqIEBtZXRob2QgZ2V0V29ybGRUb05vZGVUcmFuc2Zvcm1cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gICAgICogQHBhcmFtIHtBZmZpbmVUcmFuc2Zvcm19IFtvdXRdIFRoZSBhZmZpbmUgdHJhbnNmb3JtIG9iamVjdCB0byBiZSBmaWxsZWQgd2l0aCBkYXRhXG4gICAgICogQHJldHVybiB7QWZmaW5lVHJhbnNmb3JtfSBTYW1lIGFzIHRoZSBvdXQgYWZmaW5lIHRyYW5zZm9ybSBvYmplY3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGxldCBhZmZpbmVUcmFuc2Zvcm0gPSBjYy5BZmZpbmVUcmFuc2Zvcm0uY3JlYXRlKCk7XG4gICAgICogbm9kZS5nZXRXb3JsZFRvTm9kZVRyYW5zZm9ybShhZmZpbmVUcmFuc2Zvcm0pO1xuICAgICAqL1xuICAgIGdldFdvcmxkVG9Ob2RlVHJhbnNmb3JtIChvdXQpIHtcbiAgICAgICAgaWYgKCFvdXQpIHtcbiAgICAgICAgICAgIG91dCA9IEFmZmluZVRyYW5zLmlkZW50aXR5KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlV29ybGRNYXRyaXgoKTtcbiAgICAgICAgTWF0NC5pbnZlcnQoX21hdDRfdGVtcCwgdGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICByZXR1cm4gQWZmaW5lVHJhbnMuZnJvbU1hdDQob3V0LCBfbWF0NF90ZW1wKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBjb252ZW5pZW5jZSBtZXRob2RzIHdoaWNoIHRha2UgYSBjYy5Ub3VjaCBpbnN0ZWFkIG9mIGNjLlZlYzIuXG4gICAgICogISN6aCDlsIbop6bmkbjngrnovazmjaLmiJDmnKzlnLDlnZDmoIfns7vkuK3kvY3nva7jgIJcbiAgICAgKiBAbWV0aG9kIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICAgICAqIEBwYXJhbSB7VG91Y2h9IHRvdWNoIC0gVGhlIHRvdWNoIG9iamVjdFxuICAgICAqIEByZXR1cm4ge1ZlYzJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3VmVjMiA9IG5vZGUuY29udmVydFRvdWNoVG9Ob2RlU3BhY2UodG91Y2gpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlICh0b3VjaCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb252ZXJ0VG9Ob2RlU3BhY2UodG91Y2guZ2V0TG9jYXRpb24oKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gY29udmVydHMgYSBjYy5Ub3VjaCAod29ybGQgY29vcmRpbmF0ZXMpIGludG8gYSBsb2NhbCBjb29yZGluYXRlLiBUaGlzIG1ldGhvZCBpcyBBUiAoQW5jaG9yIFJlbGF0aXZlKS5cbiAgICAgKiAhI3poIOi9rOaNouS4gOS4qiBjYy5Ub3VjaO+8iOS4lueVjOWdkOagh++8ieWIsOS4gOS4quWxgOmDqOWdkOagh++8jOivpeaWueazleWfuuS6juiKgueCueWdkOagh+OAglxuICAgICAqIEBtZXRob2QgY29udmVydFRvdWNoVG9Ob2RlU3BhY2VBUlxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAgICAgKiBAcGFyYW0ge1RvdWNofSB0b3VjaCAtIFRoZSB0b3VjaCBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtWZWMyfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIG5ld1ZlYzIgPSBub2RlLmNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIodG91Y2gpO1xuICAgICAqL1xuICAgIGNvbnZlcnRUb3VjaFRvTm9kZVNwYWNlQVIgKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRvdWNoLmdldExvY2F0aW9uKCkpO1xuICAgIH0sXG4gICAgXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgYSBcImxvY2FsXCIgYXhpcyBhbGlnbmVkIGJvdW5kaW5nIGJveCBvZiB0aGUgbm9kZS4gPGJyLz5cbiAgICAgKiBUaGUgcmV0dXJuZWQgYm94IGlzIHJlbGF0aXZlIG9ubHkgdG8gaXRzIHBhcmVudC5cbiAgICAgKiAhI3poIOi/lOWbnueItuiKguWdkOagh+ezu+S4i+eahOi9tOWQkeWvuem9kOeahOWMheWbtOebkuOAglxuICAgICAqIEBtZXRob2QgZ2V0Qm91bmRpbmdCb3hcbiAgICAgKiBAcmV0dXJuIHtSZWN0fSBUaGUgY2FsY3VsYXRlZCBib3VuZGluZyBib3ggb2YgdGhlIG5vZGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBib3VuZGluZ0JveCA9IG5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgKi9cbiAgICBnZXRCb3VuZGluZ0JveCAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxvY2FsTWF0cml4KCk7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICBsZXQgcmVjdCA9IGNjLnJlY3QoXG4gICAgICAgICAgICAtdGhpcy5fYW5jaG9yUG9pbnQueCAqIHdpZHRoLCBcbiAgICAgICAgICAgIC10aGlzLl9hbmNob3JQb2ludC55ICogaGVpZ2h0LCBcbiAgICAgICAgICAgIHdpZHRoLCBcbiAgICAgICAgICAgIGhlaWdodCk7XG4gICAgICAgIHJldHVybiByZWN0LnRyYW5zZm9ybU1hdDQocmVjdCwgdGhpcy5fbWF0cml4KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgYSBcIndvcmxkXCIgYXhpcyBhbGlnbmVkIGJvdW5kaW5nIGJveCBvZiB0aGUgbm9kZS48YnIvPlxuICAgICAqIFRoZSBib3VuZGluZyBib3ggY29udGFpbnMgc2VsZiBhbmQgYWN0aXZlIGNoaWxkcmVuJ3Mgd29ybGQgYm91bmRpbmcgYm94LlxuICAgICAqICEjemhcbiAgICAgKiDov5Tlm57oioLngrnlnKjkuJbnlYzlnZDmoIfns7vkuIvnmoTlr7npvZDovbTlkJHnmoTljIXlm7Tnm5LvvIhBQUJC77yJ44CCPGJyLz5cbiAgICAgKiDor6XovrnmoYbljIXlkKvoh6rouqvlkozlt7Lmv4DmtLvnmoTlrZDoioLngrnnmoTkuJbnlYzovrnmoYbjgIJcbiAgICAgKiBAbWV0aG9kIGdldEJvdW5kaW5nQm94VG9Xb3JsZFxuICAgICAqIEByZXR1cm4ge1JlY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgbmV3UmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdCb3hUb1dvcmxkKCk7XG4gICAgICovXG4gICAgZ2V0Qm91bmRpbmdCb3hUb1dvcmxkICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50Ll91cGRhdGVXb3JsZE1hdHJpeCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEJvdW5kaW5nQm94VG8oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldEJvdW5kaW5nQm94VG8gKCkge1xuICAgICAgICBsZXQgd2lkdGggPSB0aGlzLl9jb250ZW50U2l6ZS53aWR0aDtcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuX2NvbnRlbnRTaXplLmhlaWdodDtcbiAgICAgICAgbGV0IHJlY3QgPSBjYy5yZWN0KFxuICAgICAgICAgICAgLXRoaXMuX2FuY2hvclBvaW50LnggKiB3aWR0aCwgXG4gICAgICAgICAgICAtdGhpcy5fYW5jaG9yUG9pbnQueSAqIGhlaWdodCwgXG4gICAgICAgICAgICB3aWR0aCwgXG4gICAgICAgICAgICBoZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5fY2FsY3VsV29ybGRNYXRyaXgoKTtcbiAgICAgICAgcmVjdC50cmFuc2Zvcm1NYXQ0KHJlY3QsIHRoaXMuX3dvcmxkTWF0cml4KTtcblxuICAgICAgICAvL3F1ZXJ5IGNoaWxkJ3MgQm91bmRpbmdCb3hcbiAgICAgICAgaWYgKCF0aGlzLl9jaGlsZHJlbilcbiAgICAgICAgICAgIHJldHVybiByZWN0O1xuXG4gICAgICAgIHZhciBsb2NDaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBsb2NDaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCAmJiBjaGlsZC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRSZWN0ID0gY2hpbGQuX2dldEJvdW5kaW5nQm94VG8oKTtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRSZWN0KVxuICAgICAgICAgICAgICAgICAgICByZWN0LnVuaW9uKHJlY3QsIGNoaWxkUmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfSxcblxuICAgIF91cGRhdGVPcmRlck9mQXJyaXZhbCAoKSB7XG4gICAgICAgIHZhciBhcnJpdmFsT3JkZXIgPSB0aGlzLl9wYXJlbnQgPyArK3RoaXMuX3BhcmVudC5fY2hpbGRBcnJpdmFsT3JkZXIgOiAwO1xuICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9ICh0aGlzLl9sb2NhbFpPcmRlciAmIDB4ZmZmZjAwMDApIHwgYXJyaXZhbE9yZGVyO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50VHlwZS5TSUJMSU5HX09SREVSX0NIQU5HRUQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogQWRkcyBhIGNoaWxkIHRvIHRoZSBub2RlIHdpdGggeiBvcmRlciBhbmQgbmFtZS5cbiAgICAgKiAhI3poXG4gICAgICog5re75Yqg5a2Q6IqC54K577yM5bm25LiU5Y+v5Lul5L+u5pS56K+l6IqC54K555qEIOWxgOmDqCBaIOmhuuW6j+WSjOWQjeWtl+OAglxuICAgICAqIEBtZXRob2QgYWRkQ2hpbGRcbiAgICAgKiBAcGFyYW0ge05vZGV9IGNoaWxkIC0gQSBjaGlsZCBub2RlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt6SW5kZXhdIC0gWiBvcmRlciBmb3IgZHJhd2luZyBwcmlvcml0eS4gUGxlYXNlIHJlZmVyIHRvIHpJbmRleCBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbbmFtZV0gLSBBIG5hbWUgdG8gaWRlbnRpZnkgdGhlIG5vZGUgZWFzaWx5LiBQbGVhc2UgcmVmZXIgdG8gbmFtZSBwcm9wZXJ0eVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5hZGRDaGlsZChuZXdOb2RlLCAxLCBcIm5vZGVcIik7XG4gICAgICovXG4gICAgYWRkQ2hpbGQgKGNoaWxkLCB6SW5kZXgsIG5hbWUpIHtcbiAgICAgICAgaWYgKENDX0RFViAmJiAhY2MuTm9kZS5pc05vZGUoY2hpbGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCgxNjM0LCBjYy5qcy5nZXRDbGFzc05hbWUoY2hpbGQpKTtcbiAgICAgICAgfVxuICAgICAgICBjYy5hc3NlcnRJRChjaGlsZCwgMTYwNik7XG4gICAgICAgIGNjLmFzc2VydElEKGNoaWxkLl9wYXJlbnQgPT09IG51bGwsIDE2MDUpO1xuXG4gICAgICAgIC8vIGludm9rZXMgdGhlIHBhcmVudCBzZXR0ZXJcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcblxuICAgICAgICBpZiAoekluZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNoaWxkLnpJbmRleCA9IHpJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZC5uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3BzIGFsbCBydW5uaW5nIGFjdGlvbnMgYW5kIHNjaGVkdWxlcnMuXG4gICAgICogISN6aCDlgZzmraLmiYDmnInmraPlnKjmkq3mlL7nmoTliqjkvZzlkozorqHml7blmajjgIJcbiAgICAgKiBAbWV0aG9kIGNsZWFudXBcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuY2xlYW51cCgpO1xuICAgICAqL1xuICAgIGNsZWFudXAgKCkge1xuICAgICAgICAvLyBhY3Rpb25zXG4gICAgICAgIEFjdGlvbk1hbmFnZXJFeGlzdCAmJiBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCkucmVtb3ZlQWxsQWN0aW9uc0Zyb21UYXJnZXQodGhpcyk7XG4gICAgICAgIC8vIGV2ZW50XG4gICAgICAgIGV2ZW50TWFuYWdlci5yZW1vdmVMaXN0ZW5lcnModGhpcyk7XG5cbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgICAgdmFyIGksIGxlbiA9IHRoaXMuX2NoaWxkcmVuLmxlbmd0aCwgbm9kZTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5fY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAobm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFNvcnRzIHRoZSBjaGlsZHJlbiBhcnJheSBkZXBlbmRzIG9uIGNoaWxkcmVuJ3MgekluZGV4IGFuZCBhcnJpdmFsT3JkZXIsXG4gICAgICogbm9ybWFsbHkgeW91IHdvbid0IG5lZWQgdG8gaW52b2tlIHRoaXMgZnVuY3Rpb24uXG4gICAgICogISN6aCDmoLnmja7lrZDoioLngrnnmoQgekluZGV4IOWSjCBhcnJpdmFsT3JkZXIg6L+b6KGM5o6S5bqP77yM5q2j5bi45oOF5Ya15LiL5byA5Y+R6ICF5LiN6ZyA6KaB5omL5Yqo6LCD55So6L+Z5Liq5Ye95pWw44CCXG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHNvcnRBbGxDaGlsZHJlblxuICAgICAqL1xuICAgIHNvcnRBbGxDaGlsZHJlbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLl9yZW9yZGVyQ2hpbGREaXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBkZWxheSB1cGRhdGUgYXJyaXZhbE9yZGVyIGJlZm9yZSBzb3J0IGNoaWxkcmVuXG4gICAgICAgICAgICB2YXIgX2NoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW4sIGNoaWxkO1xuICAgICAgICAgICAgLy8gcmVzZXQgYXJyaXZhbE9yZGVyIGJlZm9yZSBzb3J0IGNoaWxkcmVuXG4gICAgICAgICAgICB0aGlzLl9jaGlsZEFycml2YWxPcmRlciA9IDE7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gX2NoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBfY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgY2hpbGQuX3VwZGF0ZU9yZGVyT2ZBcnJpdmFsKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9wdGltaXplIHJlb3JkZXJpbmcgZXZlbnQgY29kZSB0byBmaXggcHJvYmxlbXMgd2l0aCBzZXR0aW5nIHppbmRleFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NvY29zLWNyZWF0b3IvMmQtdGFza3MvaXNzdWVzLzExODZcbiAgICAgICAgICAgIGV2ZW50TWFuYWdlci5fc2V0RGlydHlGb3JOb2RlKHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoX2NoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyBpbnNlcnRpb24gc29ydFxuICAgICAgICAgICAgICAgIGxldCBjaGlsZCwgY2hpbGQyO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxLCBjb3VudCA9IF9jaGlsZHJlbi5sZW5ndGg7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkID0gX2NoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaiA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBqID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGlsZDIgPSBfY2hpbGRyZW5baiAtIDFdKS5fbG9jYWxaT3JkZXIgPiBjaGlsZC5fbG9jYWxaT3JkZXI7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX2NoaWxkcmVuW2pdID0gY2hpbGQyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9jaGlsZHJlbltqXSA9IGNoaWxkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudFR5cGUuQ0hJTERfUkVPUkRFUiwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5fX2Zhc3RPZmYoY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfVVBEQVRFLCB0aGlzLnNvcnRBbGxDaGlsZHJlbiwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RlbGF5U29ydCAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcmVvcmRlckNoaWxkRGlydHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jlb3JkZXJDaGlsZERpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9fZmFzdE9uKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5zb3J0QWxsQ2hpbGRyZW4sIHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9yZXN0b3JlUHJvcGVydGllczogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLypcbiAgICAgICAgICogVE9ETzogUmVmaW5lIHRoaXMgY29kZSBhZnRlciBjb21wbGV0aW5nIHVuZG8vcmVkbyAyLjAuXG4gICAgICAgICAqIFRoZSBub2RlIHdpbGwgYmUgZGVzdHJveWVkIHdoZW4gZGVsZXRpbmcgaW4gdGhlIGVkaXRvcixcbiAgICAgICAgICogYnV0IGl0IHdpbGwgYmUgcmVzZXJ2ZWQgYW5kIHJldXNlZCBmb3IgdW5kby5cbiAgICAgICAgKi9cblxuICAgICAgICAvLyByZXN0b3JlIDNkIG5vZGVcbiAgICAgICAgdGhpcy5pczNETm9kZSA9IHRoaXMuaXMzRE5vZGU7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tYXRyaXgpIHtcbiAgICAgICAgICAgIHRoaXMuX21hdHJpeCA9IGNjLm1hdDQodGhpcy5fc3BhY2VJbmZvLmxvY2FsTWF0KTtcbiAgICAgICAgICAgIE1hdDQuaWRlbnRpdHkodGhpcy5fbWF0cml4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3dvcmxkTWF0cml4KSB7XG4gICAgICAgICAgICB0aGlzLl93b3JsZE1hdHJpeCA9IGNjLm1hdDQodGhpcy5fc3BhY2VJbmZvLndvcmxkTWF0KTtcbiAgICAgICAgICAgIE1hdDQuaWRlbnRpdHkodGhpcy5fd29ybGRNYXRyaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9jYWxNYXREaXJ0eSA9IExvY2FsRGlydHlGbGFnLkFMTDtcbiAgICAgICAgdGhpcy5fd29ybGRNYXREaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fZnJvbUV1bGVyKCk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyRmxhZyB8PSBSZW5kZXJGbG93LkZMQUdfVFJBTlNGT1JNO1xuICAgICAgICBpZiAodGhpcy5fcmVuZGVyQ29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJDb21wb25lbnQubWFya0ZvclJlbmRlcih0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblJlc3RvcmU6IENDX0VESVRPUiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX29uUmVzdG9yZUJhc2UoKTtcblxuICAgICAgICB0aGlzLl9yZXN0b3JlUHJvcGVydGllcygpO1xuXG4gICAgICAgIHZhciBhY3Rpb25NYW5hZ2VyID0gY2MuZGlyZWN0b3IuZ2V0QWN0aW9uTWFuYWdlcigpO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIGFjdGlvbk1hbmFnZXIgJiYgYWN0aW9uTWFuYWdlci5yZXN1bWVUYXJnZXQodGhpcyk7XG4gICAgICAgICAgICBldmVudE1hbmFnZXIucmVzdW1lVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWN0aW9uTWFuYWdlciAmJiBhY3Rpb25NYW5hZ2VyLnBhdXNlVGFyZ2V0KHRoaXMpO1xuICAgICAgICAgICAgZXZlbnRNYW5hZ2VyLnBhdXNlVGFyZ2V0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuXG59O1xuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgLy8gZGVwcmVjYXRlZCwgb25seSB1c2VkIHRvIGltcG9ydCBvbGQgZGF0YSBpbiBlZGl0b3JcbiAgICBqcy5taXhpbihOb2RlRGVmaW5lcy5wcm9wZXJ0aWVzLCB7XG4gICAgICAgIF9zY2FsZVg6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgZWRpdG9yT25seTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBfc2NhbGVZOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWVcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxubGV0IE5vZGUgPSBjYy5DbGFzcyhOb2RlRGVmaW5lcyk7XG5cbi8vIDNEIE5vZGUgUHJvcGVydHlcblxuXG4vLyBOb2RlIEV2ZW50XG5cbi8qKlxuICogISNlblxuICogVGhlIHBvc2l0aW9uIGNoYW5naW5nIGV2ZW50LCB5b3UgY2FuIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRocm91Z2ggdGhlIHN0YXRlbWVudCB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuUE9TSVRJT05fQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog5L2N572u5Y+Y5Yqo55uR5ZCs5LqL5Lu2LCDpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgcG9zaXRpb24tY2hhbmdlZFxuICogQHBhcmFtIHtWZWMyfSBvbGRQb3MgLSBUaGUgb2xkIHBvc2l0aW9uLCBidXQgdGhpcyBwYXJhbWV0ZXIgaXMgb25seSBhdmFpbGFibGUgaW4gZWRpdG9yIVxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoZSBzaXplIGNoYW5naW5nIGV2ZW50LCB5b3UgY2FuIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRocm91Z2ggdGhlIHN0YXRlbWVudCB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuU0laRV9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDlsLrlr7jlj5jliqjnm5HlkKzkuovku7bvvIzpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlNJWkVfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpOyDov5vooYznm5HlkKzjgIJcbiAqIEBldmVudCBzaXplLWNoYW5nZWRcbiAqIEBwYXJhbSB7U2l6ZX0gb2xkU2l6ZSAtIFRoZSBvbGQgc2l6ZSwgYnV0IHRoaXMgcGFyYW1ldGVyIGlzIG9ubHkgYXZhaWxhYmxlIGluIGVkaXRvciFcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgYW5jaG9yIGNoYW5naW5nIGV2ZW50LCB5b3UgY2FuIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRocm91Z2ggdGhlIHN0YXRlbWVudCB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOmUmueCueWPmOWKqOebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgYW5jaG9yLWNoYW5nZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgYWRkaW5nIGNoaWxkIGV2ZW50LCB5b3UgY2FuIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRocm91Z2ggdGhlIHN0YXRlbWVudCB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfQURERUQsIGNhbGxiYWNrLCB0aGlzKTtcbiAqICEjemhcbiAqIOWinuWKoOWtkOiKgueCueebkeWQrOS6i+S7tu+8jOmAmui/hyB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuQ0hJTERfQURERUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgY2hpbGQtYWRkZWRcbiAqIEBwYXJhbSB7Tm9kZX0gY2hpbGQgLSBjaGlsZCB3aGljaCBoYXZlIGJlZW4gYWRkZWRcbiAqL1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgcmVtb3ZpbmcgY2hpbGQgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9SRU1PVkVELCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDliKDpmaTlrZDoioLngrnnm5HlkKzkuovku7bvvIzpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFTU9WRUQsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgY2hpbGQtcmVtb3ZlZFxuICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIGNoaWxkIHdoaWNoIGhhdmUgYmVlbiByZW1vdmVkXG4gKi9cbi8qKlxuICogISNlblxuICogVGhlIHJlb3JkZXJpbmcgY2hpbGQgZXZlbnQsIHlvdSBjYW4gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdGhyb3VnaCB0aGUgc3RhdGVtZW50IHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5DSElMRF9SRU9SREVSLCBjYWxsYmFjaywgdGhpcyk7XG4gKiAhI3poXG4gKiDlrZDoioLngrnpobrluo/lj5jliqjnm5HlkKzkuovku7bvvIzpgJrov4cgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLkNISUxEX1JFT1JERVIsIGNhbGxiYWNrLCB0aGlzKTsg6L+b6KGM55uR5ZCs44CCXG4gKiBAZXZlbnQgY2hpbGQtcmVvcmRlclxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gbm9kZSB3aG9zZSBjaGlsZHJlbiBoYXZlIGJlZW4gcmVvcmRlcmVkXG4gKi9cbi8qKlxuICogISNlblxuICogVGhlIGdyb3VwIGNoYW5naW5nIGV2ZW50LCB5b3UgY2FuIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRocm91Z2ggdGhlIHN0YXRlbWVudCB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuR1JPVVBfQ0hBTkdFRCwgY2FsbGJhY2ssIHRoaXMpO1xuICogISN6aFxuICog6IqC54K55YiG57uE5Y+Y5Yqo55uR5ZCs5LqL5Lu277yM6YCa6L+HIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5HUk9VUF9DSEFOR0VELCBjYWxsYmFjaywgdGhpcyk7IOi/m+ihjOebkeWQrOOAglxuICogQGV2ZW50IGdyb3VwLWNoYW5nZWRcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIG5vZGUgd2hvc2UgZ3JvdXAgaGFzIGNoYW5nZWRcbiAqL1xuXG4vLyBEZXByZWNhdGVkIEFQSXNcblxuLyoqXG4gKiAhI2VuXG4gKiBSZXR1cm5zIHRoZSBkaXNwbGF5ZWQgb3BhY2l0eSBvZiBOb2RlLFxuICogdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBkaXNwbGF5ZWQgb3BhY2l0eSBhbmQgb3BhY2l0eSBpcyB0aGF0IGRpc3BsYXllZCBvcGFjaXR5IGlzIGNhbGN1bGF0ZWQgYmFzZWQgb24gb3BhY2l0eSBhbmQgcGFyZW50IG5vZGUncyBvcGFjaXR5IHdoZW4gY2FzY2FkZSBvcGFjaXR5IGVuYWJsZWQuXG4gKiAhI3poXG4gKiDojrflj5boioLngrnmmL7npLrpgI/mmI7luqbvvIxcbiAqIOaYvuekuumAj+aYjuW6puWSjOmAj+aYjuW6puS5i+mXtOeahOS4jeWQjOS5i+WkhOWcqOS6juW9k+WQr+eUqOe6p+i/numAj+aYjuW6puaXtu+8jFxuICog5pi+56S66YCP5piO5bqm5piv5Z+65LqO6Ieq6Lqr6YCP5piO5bqm5ZKM54i26IqC54K56YCP5piO5bqm6K6h566X55qE44CCXG4gKlxuICogQG1ldGhvZCBnZXREaXNwbGF5ZWRPcGFjaXR5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IGRpc3BsYXllZCBvcGFjaXR5XG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wLCBwbGVhc2UgdXNlIG9wYWNpdHkgcHJvcGVydHksIGNhc2NhZGUgb3BhY2l0eSBpcyByZW1vdmVkXG4gKi9cblxuLyoqXG4gKiAhI2VuXG4gKiBSZXR1cm5zIHRoZSBkaXNwbGF5ZWQgY29sb3Igb2YgTm9kZSxcbiAqIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gZGlzcGxheWVkIGNvbG9yIGFuZCBjb2xvciBpcyB0aGF0IGRpc3BsYXllZCBjb2xvciBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIGNvbG9yIGFuZCBwYXJlbnQgbm9kZSdzIGNvbG9yIHdoZW4gY2FzY2FkZSBjb2xvciBlbmFibGVkLlxuICogISN6aFxuICog6I635Y+W6IqC54K555qE5pi+56S66aKc6Imy77yMXG4gKiDmmL7npLrpopzoibLlkozpopzoibLkuYvpl7TnmoTkuI3lkIzkuYvlpITlnKjkuo7lvZPlkK/nlKjnuqfov57popzoibLml7bvvIxcbiAqIOaYvuekuuminOiJsuaYr+WfuuS6juiHqui6q+minOiJsuWSjOeItuiKgueCueminOiJsuiuoeeul+eahOOAglxuICpcbiAqIEBtZXRob2QgZ2V0RGlzcGxheWVkQ29sb3JcbiAqIEByZXR1cm4ge0NvbG9yfVxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMCwgcGxlYXNlIHVzZSBjb2xvciBwcm9wZXJ0eSwgY2FzY2FkZSBjb2xvciBpcyByZW1vdmVkXG4gKi9cblxuLyoqXG4gKiAhI2VuIENhc2NhZGUgb3BhY2l0eSBpcyByZW1vdmVkIGZyb20gdjIuMFxuICogSW5kaWNhdGUgd2hldGhlciBub2RlJ3Mgb3BhY2l0eSB2YWx1ZSBhZmZlY3QgaXRzIGNoaWxkIG5vZGVzLCBkZWZhdWx0IHZhbHVlIGlzIHRydWUuXG4gKiAhI3poIOmAj+aYjuW6pue6p+iBlOWKn+iDveS7jiB2Mi4wIOW8gOWni+W3suenu+mZpFxuICog6IqC54K555qE5LiN6YCP5piO5bqm5YC85piv5ZCm5b2x5ZON5YW25a2Q6IqC54K577yM6buY6K6k5YC85Li6IHRydWXjgIJcbiAqIEBwcm9wZXJ0eSBjYXNjYWRlT3BhY2l0eVxuICogQGRlcHJlY2F0ZWQgc2luY2UgdjIuMFxuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cblxuLyoqXG4gKiAhI2VuIENhc2NhZGUgb3BhY2l0eSBpcyByZW1vdmVkIGZyb20gdjIuMFxuICogUmV0dXJucyB3aGV0aGVyIG5vZGUncyBvcGFjaXR5IHZhbHVlIGFmZmVjdCBpdHMgY2hpbGQgbm9kZXMuXG4gKiAhI3poIOmAj+aYjuW6pue6p+iBlOWKn+iDveS7jiB2Mi4wIOW8gOWni+W3suenu+mZpFxuICog6L+U5Zue6IqC54K555qE5LiN6YCP5piO5bqm5YC85piv5ZCm5b2x5ZON5YW25a2Q6IqC54K544CCXG4gKiBAbWV0aG9kIGlzQ2FzY2FkZU9wYWNpdHlFbmFibGVkXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbi8qKlxuICogISNlbiBDYXNjYWRlIG9wYWNpdHkgaXMgcmVtb3ZlZCBmcm9tIHYyLjBcbiAqIEVuYWJsZSBvciBkaXNhYmxlIGNhc2NhZGUgb3BhY2l0eSwgaWYgY2FzY2FkZSBlbmFibGVkLCBjaGlsZCBub2Rlcycgb3BhY2l0eSB3aWxsIGJlIHRoZSBtdWx0aXBsaWNhdGlvbiBvZiBwYXJlbnQgb3BhY2l0eSBhbmQgaXRzIG93biBvcGFjaXR5LlxuICogISN6aCDpgI/mmI7luqbnuqfogZTlip/og73ku44gdjIuMCDlvIDlp4vlt7Lnp7vpmaRcbiAqIOWQr+eUqOaIluemgeeUqOe6p+i/nuS4jemAj+aYjuW6pu+8jOWmguaenOe6p+i/nuWQr+eUqO+8jOWtkOiKgueCueeahOS4jemAj+aYjuW6puWwhuaYr+eItuS4jemAj+aYjuW6puS5mOS4iuWug+iHquW3seeahOS4jemAj+aYjuW6puOAglxuICogQG1ldGhvZCBzZXRDYXNjYWRlT3BhY2l0eUVuYWJsZWRcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHYyLjBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FzY2FkZU9wYWNpdHlFbmFibGVkXG4gKi9cblxuLyoqXG4gKiAhI2VuIE9wYWNpdHkgbW9kaWZ5IFJHQiBoYXZlIGJlZW4gcmVtb3ZlZCBzaW5jZSB2Mi4wXG4gKiBTZXQgd2hldGhlciBjb2xvciBzaG91bGQgYmUgY2hhbmdlZCB3aXRoIHRoZSBvcGFjaXR5IHZhbHVlLFxuICogdXNlbGVzcyBpbiBjY3NnLk5vZGUsIGJ1dCB0aGlzIGZ1bmN0aW9uIGlzIG92ZXJyaWRlIGluIHNvbWUgY2xhc3MgdG8gaGF2ZSBzdWNoIGJlaGF2aW9yLlxuICogISN6aCDpgI/mmI7luqblvbHlk43popzoibLphY3nva7lt7Lnu4/ooqvlup/lvINcbiAqIOiuvue9ruabtOaUuemAj+aYjuW6puaXtuaYr+WQpuS/ruaUuVJHQuWAvO+8jFxuICogQG1ldGhvZCBzZXRPcGFjaXR5TW9kaWZ5UkdCXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wYWNpdHlWYWx1ZVxuICovXG5cbi8qKlxuICogISNlbiBPcGFjaXR5IG1vZGlmeSBSR0IgaGF2ZSBiZWVuIHJlbW92ZWQgc2luY2UgdjIuMFxuICogR2V0IHdoZXRoZXIgY29sb3Igc2hvdWxkIGJlIGNoYW5nZWQgd2l0aCB0aGUgb3BhY2l0eSB2YWx1ZS5cbiAqICEjemgg6YCP5piO5bqm5b2x5ZON6aKc6Imy6YWN572u5bey57uP6KKr5bqf5byDXG4gKiDojrflj5bmm7TmlLnpgI/mmI7luqbml7bmmK/lkKbkv67mlLlSR0LlgLzjgIJcbiAqIEBtZXRob2QgaXNPcGFjaXR5TW9kaWZ5UkdCXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2Mi4wXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cblxubGV0IF9wID0gTm9kZS5wcm90b3R5cGU7XG5qcy5nZXRzZXQoX3AsICdwb3NpdGlvbicsIF9wLmdldFBvc2l0aW9uLCBfcC5zZXRQb3NpdGlvbiwgZmFsc2UsIHRydWUpO1xuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgbGV0IHZlYzNfdG1wID0gbmV3IFZlYzMoKTtcbiAgICBjYy5qcy5nZXRzZXQoX3AsICd3b3JsZEV1bGVyQW5nbGVzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgYW5nbGVzID0gbmV3IFZlYzModGhpcy5fZXVsZXJBbmdsZXMpO1xuICAgICAgICBsZXQgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgIGFuZ2xlcy5hZGRTZWxmKHBhcmVudC5fZXVsZXJBbmdsZXMpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5nbGVzO1xuICAgIH0sIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHZlYzNfdG1wLnNldCh2KTtcbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgICAgICB2ZWMzX3RtcC5zdWJTZWxmKHBhcmVudC5fZXVsZXJBbmdsZXMpO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV1bGVyQW5nbGVzID0gdmVjM190bXA7XG4gICAgfSk7XG59XG5cbmNjLk5vZGUgPSBtb2R1bGUuZXhwb3J0cyA9IE5vZGU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==