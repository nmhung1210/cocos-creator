
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event-manager/CCEventListener.js';
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
var js = require('../platform/js');
/**
 * !#en
 * <p>
 *     The base class of event listener.                                                                        <br/>
 *     If you need custom listener which with different callback, you need to inherit this class.               <br/>
 *     For instance, you could refer to EventListenerAcceleration, EventListenerKeyboard,                       <br/>
 *      EventListenerTouchOneByOne, EventListenerCustom.
 * </p>
 *
 * !#zh
 * 封装用户的事件处理逻辑。
 * 注意：这是一个抽象类，开发者不应该直接实例化这个类，请参考 {{#crossLink "EventListener/create:method"}}cc.EventListener.create{{/crossLink}}。
 *
 * @class EventListener
 */

/**
 * Constructor
 * @method constructor
 * @param {Number} type
 * @param {Number} listenerID
 * @param {Number} callback
 */


cc.EventListener = function (type, listenerID, callback) {
  this._onEvent = callback; // Event callback function

  this._type = type || 0; // Event listener type

  this._listenerID = listenerID || ""; // Event listener ID

  this._registered = false; // Whether the listener has been added to dispatcher.

  this._fixedPriority = 0; // The higher the number, the higher the priority, 0 is for scene graph base priority.

  this._node = null; // scene graph based priority

  this._target = null;
  this._paused = true; // Whether the listener is paused

  this._isEnabled = true; // Whether the listener is enabled
};

cc.EventListener.prototype = {
  constructor: cc.EventListener,

  /*
   * <p>
   *     Sets paused state for the listener
   *     The paused state is only used for scene graph priority listeners.
   *     `EventDispatcher::resumeAllEventListenersForTarget(node)` will set the paused state to `true`,
   *     while `EventDispatcher::pauseAllEventListenersForTarget(node)` will set it to `false`.
   *     @note 1) Fixed priority listeners will never get paused. If a fixed priority doesn't want to receive events,
   *              call `setEnabled(false)` instead.
   *            2) In `Node`'s onEnter and onExit, the `paused state` of the listeners which associated with that node will be automatically updated.
   * </p>
   * @param {Boolean} paused
   * @private
   */
  _setPaused: function _setPaused(paused) {
    this._paused = paused;
  },

  /*
   * Checks whether the listener is paused.
   * @returns {Boolean}
   * @private
   */
  _isPaused: function _isPaused() {
    return this._paused;
  },

  /*
   * Marks the listener was registered by EventDispatcher.
   * @param {Boolean} registered
   * @private
   */
  _setRegistered: function _setRegistered(registered) {
    this._registered = registered;
  },

  /*
   * Checks whether the listener was registered by EventDispatcher
   * @returns {Boolean}
   * @private
   */
  _isRegistered: function _isRegistered() {
    return this._registered;
  },

  /*
   * Gets the type of this listener
   * @note It's different from `EventType`, e.g. TouchEvent has two kinds of event listeners - EventListenerOneByOne, EventListenerAllAtOnce
   * @returns {Number}
   * @private
   */
  _getType: function _getType() {
    return this._type;
  },

  /*
   *  Gets the listener ID of this listener
   *  When event is being dispatched, listener ID is used as key for searching listeners according to event type.
   * @returns {String}
   * @private
   */
  _getListenerID: function _getListenerID() {
    return this._listenerID;
  },

  /*
   * Sets the fixed priority for this listener
   *  @note This method is only used for `fixed priority listeners`, it needs to access a non-zero value. 0 is reserved for scene graph priority listeners
   * @param {Number} fixedPriority
   * @private
   */
  _setFixedPriority: function _setFixedPriority(fixedPriority) {
    this._fixedPriority = fixedPriority;
  },

  /*
   * Gets the fixed priority of this listener
   * @returns {Number} 0 if it's a scene graph priority listener, non-zero for fixed priority listener
   * @private
   */
  _getFixedPriority: function _getFixedPriority() {
    return this._fixedPriority;
  },

  /*
   * Sets scene graph priority for this listener
   * @param {cc.Node} node
   * @private
   */
  _setSceneGraphPriority: function _setSceneGraphPriority(node) {
    this._target = node;
    this._node = node;
  },

  /*
   * Gets scene graph priority of this listener
   * @returns {cc.Node} if it's a fixed priority listener, non-null for scene graph priority listener
   * @private
   */
  _getSceneGraphPriority: function _getSceneGraphPriority() {
    return this._node;
  },

  /**
   * !#en Checks whether the listener is available.
   * !#zh 检测监听器是否有效
   * @method checkAvailable
   * @returns {Boolean}
   */
  checkAvailable: function checkAvailable() {
    return this._onEvent !== null;
  },

  /**
   * !#en Clones the listener, its subclasses have to override this method.
   * !#zh 克隆监听器,它的子类必须重写此方法。
   * @method clone
   * @returns {EventListener}
   */
  clone: function clone() {
    return null;
  },

  /**
   *  !#en Enables or disables the listener
   *  !#zh 启用或禁用监听器。
   *  @method setEnabled
   *  @param {Boolean} enabled
   *  @note Only listeners with `enabled` state will be able to receive events.
   *          When an listener was initialized, it's enabled by default.
   *          An event listener can receive events when it is enabled and is not paused.
   *          paused state is always false when it is a fixed priority listener.
   */
  setEnabled: function setEnabled(enabled) {
    this._isEnabled = enabled;
  },

  /**
   * !#en Checks whether the listener is enabled
   * !#zh 检查监听器是否可用。
   * @method isEnabled
   * @returns {Boolean}
   */
  isEnabled: function isEnabled() {
    return this._isEnabled;
  },

  /*
   * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
   * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
   * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
   * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.<br/>
   * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
   * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
   * The retain function can increase a reference count for the native object to avoid it being released,<br/>
   * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
   * retain and release function call should be paired in developer's game code.</p>
   *
   * @method retain
   * @see cc.EventListener#release
   */
  retain: function retain() {},

  /*
   * <p>Currently JavaScript Bindings (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
   * and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
   * This is a hack, and should be removed once JSB fixes the retain/release bug<br/>
   * You will need to retain an object if you created a listener and haven't added it any target node during the same frame.<br/>
   * Otherwise, JSB's native autorelease pool will consider this object a useless one and release it directly,<br/>
   * when you want to use it later, a "Invalid Native Object" error will be raised.<br/>
   * The retain function can increase a reference count for the native object to avoid it being released,<br/>
   * you need to manually invoke release function when you think this object is no longer needed, otherwise, there will be memory learks.<br/>
   * retain and release function call should be paired in developer's game code.</p>
   *
   * @method release
   * @see cc.EventListener#retain
   */
  release: function release() {}
}; // event listener type

/**
 * !#en The type code of unknown event listener.
 * !#zh 未知的事件监听器类型
 * @property UNKNOWN
 * @type {Number}
 * @static
 */

cc.EventListener.UNKNOWN = 0;
/*
 * !#en The type code of one by one touch event listener.
 * !#zh 触摸事件监听器类型，触点会一个一个得分开被派发
 * @property TOUCH_ONE_BY_ONE
 * @type {Number}
 * @static
 */

cc.EventListener.TOUCH_ONE_BY_ONE = 1;
/*
 * !#en The type code of all at once touch event listener.
 * !#zh 触摸事件监听器类型，触点会被一次性全部派发
 * @property TOUCH_ALL_AT_ONCE
 * @type {Number}
 * @static
 */

cc.EventListener.TOUCH_ALL_AT_ONCE = 2;
/**
 * !#en The type code of keyboard event listener.
 * !#zh 键盘事件监听器类型
 * @property KEYBOARD
 * @type {Number}
 * @static
 */

cc.EventListener.KEYBOARD = 3;
/*
 * !#en The type code of mouse event listener.
 * !#zh 鼠标事件监听器类型
 * @property MOUSE
 * @type {Number}
 * @static
 */

cc.EventListener.MOUSE = 4;
/**
 * !#en The type code of acceleration event listener.
 * !#zh 加速器事件监听器类型
 * @property ACCELERATION
 * @type {Number}
 * @static
 */

cc.EventListener.ACCELERATION = 6;
/*
 * !#en The type code of custom event listener.
 * !#zh 自定义事件监听器类型
 * @property CUSTOM
 * @type {Number}
 * @static
 */

cc.EventListener.CUSTOM = 8;
var ListenerID = cc.EventListener.ListenerID = {
  MOUSE: '__cc_mouse',
  TOUCH_ONE_BY_ONE: '__cc_touch_one_by_one',
  TOUCH_ALL_AT_ONCE: '__cc_touch_all_at_once',
  KEYBOARD: '__cc_keyboard',
  ACCELERATION: '__cc_acceleration'
};

var Custom = function Custom(listenerId, callback) {
  this._onCustomEvent = callback;
  cc.EventListener.call(this, cc.EventListener.CUSTOM, listenerId, this._callback);
};

js.extend(Custom, cc.EventListener);
js.mixin(Custom.prototype, {
  _onCustomEvent: null,
  _callback: function _callback(event) {
    if (this._onCustomEvent !== null) this._onCustomEvent(event);
  },
  checkAvailable: function checkAvailable() {
    return cc.EventListener.prototype.checkAvailable.call(this) && this._onCustomEvent !== null;
  },
  clone: function clone() {
    return new Custom(this._listenerID, this._onCustomEvent);
  }
});

var Mouse = function Mouse() {
  cc.EventListener.call(this, cc.EventListener.MOUSE, ListenerID.MOUSE, this._callback);
};

js.extend(Mouse, cc.EventListener);
js.mixin(Mouse.prototype, {
  onMouseDown: null,
  onMouseUp: null,
  onMouseMove: null,
  onMouseScroll: null,
  _callback: function _callback(event) {
    var eventType = cc.Event.EventMouse;

    switch (event._eventType) {
      case eventType.DOWN:
        if (this.onMouseDown) this.onMouseDown(event);
        break;

      case eventType.UP:
        if (this.onMouseUp) this.onMouseUp(event);
        break;

      case eventType.MOVE:
        if (this.onMouseMove) this.onMouseMove(event);
        break;

      case eventType.SCROLL:
        if (this.onMouseScroll) this.onMouseScroll(event);
        break;

      default:
        break;
    }
  },
  clone: function clone() {
    var eventListener = new Mouse();
    eventListener.onMouseDown = this.onMouseDown;
    eventListener.onMouseUp = this.onMouseUp;
    eventListener.onMouseMove = this.onMouseMove;
    eventListener.onMouseScroll = this.onMouseScroll;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    return true;
  }
});

var TouchOneByOne = function TouchOneByOne() {
  cc.EventListener.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, ListenerID.TOUCH_ONE_BY_ONE, null);
  this._claimedTouches = [];
};

js.extend(TouchOneByOne, cc.EventListener);
js.mixin(TouchOneByOne.prototype, {
  constructor: TouchOneByOne,
  _claimedTouches: null,
  swallowTouches: false,
  onTouchBegan: null,
  onTouchMoved: null,
  onTouchEnded: null,
  onTouchCancelled: null,
  setSwallowTouches: function setSwallowTouches(needSwallow) {
    this.swallowTouches = needSwallow;
  },
  isSwallowTouches: function isSwallowTouches() {
    return this.swallowTouches;
  },
  clone: function clone() {
    var eventListener = new TouchOneByOne();
    eventListener.onTouchBegan = this.onTouchBegan;
    eventListener.onTouchMoved = this.onTouchMoved;
    eventListener.onTouchEnded = this.onTouchEnded;
    eventListener.onTouchCancelled = this.onTouchCancelled;
    eventListener.swallowTouches = this.swallowTouches;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (!this.onTouchBegan) {
      cc.logID(1801);
      return false;
    }

    return true;
  }
});

var TouchAllAtOnce = function TouchAllAtOnce() {
  cc.EventListener.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, ListenerID.TOUCH_ALL_AT_ONCE, null);
};

js.extend(TouchAllAtOnce, cc.EventListener);
js.mixin(TouchAllAtOnce.prototype, {
  constructor: TouchAllAtOnce,
  onTouchesBegan: null,
  onTouchesMoved: null,
  onTouchesEnded: null,
  onTouchesCancelled: null,
  clone: function clone() {
    var eventListener = new TouchAllAtOnce();
    eventListener.onTouchesBegan = this.onTouchesBegan;
    eventListener.onTouchesMoved = this.onTouchesMoved;
    eventListener.onTouchesEnded = this.onTouchesEnded;
    eventListener.onTouchesCancelled = this.onTouchesCancelled;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (this.onTouchesBegan === null && this.onTouchesMoved === null && this.onTouchesEnded === null && this.onTouchesCancelled === null) {
      cc.logID(1802);
      return false;
    }

    return true;
  }
}); //Acceleration

var Acceleration = function Acceleration(callback) {
  this._onAccelerationEvent = callback;
  cc.EventListener.call(this, cc.EventListener.ACCELERATION, ListenerID.ACCELERATION, this._callback);
};

js.extend(Acceleration, cc.EventListener);
js.mixin(Acceleration.prototype, {
  constructor: Acceleration,
  _onAccelerationEvent: null,
  _callback: function _callback(event) {
    this._onAccelerationEvent(event.acc, event);
  },
  checkAvailable: function checkAvailable() {
    cc.assertID(this._onAccelerationEvent, 1803);
    return true;
  },
  clone: function clone() {
    return new Acceleration(this._onAccelerationEvent);
  }
}); //Keyboard

var Keyboard = function Keyboard() {
  cc.EventListener.call(this, cc.EventListener.KEYBOARD, ListenerID.KEYBOARD, this._callback);
};

js.extend(Keyboard, cc.EventListener);
js.mixin(Keyboard.prototype, {
  constructor: Keyboard,
  onKeyPressed: null,
  onKeyReleased: null,
  _callback: function _callback(event) {
    if (event.isPressed) {
      if (this.onKeyPressed) this.onKeyPressed(event.keyCode, event);
    } else {
      if (this.onKeyReleased) this.onKeyReleased(event.keyCode, event);
    }
  },
  clone: function clone() {
    var eventListener = new Keyboard();
    eventListener.onKeyPressed = this.onKeyPressed;
    eventListener.onKeyReleased = this.onKeyReleased;
    return eventListener;
  },
  checkAvailable: function checkAvailable() {
    if (this.onKeyPressed === null && this.onKeyReleased === null) {
      cc.logID(1800);
      return false;
    }

    return true;
  }
});
/**
 * !#en
 * Create a EventListener object with configuration including the event type, handlers and other parameters.
 * In handlers, this refer to the event listener object itself.
 * You can also pass custom parameters in the configuration object,
 * all custom parameters will be polyfilled into the event listener object and can be accessed in handlers.
 * !#zh 通过指定不同的 Event 对象来设置想要创建的事件监听器。
 * @method create
 * @param {Object} argObj a json object
 * @returns {EventListener}
 * @static
 * @example {@link cocos2d/core/event-manager/CCEventListener/create.js}
 */

cc.EventListener.create = function (argObj) {
  cc.assertID(argObj && argObj.event, 1900);
  var listenerType = argObj.event;
  delete argObj.event;
  var listener = null;
  if (listenerType === cc.EventListener.TOUCH_ONE_BY_ONE) listener = new TouchOneByOne();else if (listenerType === cc.EventListener.TOUCH_ALL_AT_ONCE) listener = new TouchAllAtOnce();else if (listenerType === cc.EventListener.MOUSE) listener = new Mouse();else if (listenerType === cc.EventListener.CUSTOM) {
    listener = new Custom(argObj.eventName, argObj.callback);
    delete argObj.eventName;
    delete argObj.callback;
  } else if (listenerType === cc.EventListener.KEYBOARD) listener = new Keyboard();else if (listenerType === cc.EventListener.ACCELERATION) {
    listener = new Acceleration(argObj.callback);
    delete argObj.callback;
  }

  for (var key in argObj) {
    listener[key] = argObj[key];
  }

  return listener;
};

module.exports = cc.EventListener;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NFdmVudExpc3RlbmVyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsImNjIiwiRXZlbnRMaXN0ZW5lciIsInR5cGUiLCJsaXN0ZW5lcklEIiwiY2FsbGJhY2siLCJfb25FdmVudCIsIl90eXBlIiwiX2xpc3RlbmVySUQiLCJfcmVnaXN0ZXJlZCIsIl9maXhlZFByaW9yaXR5IiwiX25vZGUiLCJfdGFyZ2V0IiwiX3BhdXNlZCIsIl9pc0VuYWJsZWQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIl9zZXRQYXVzZWQiLCJwYXVzZWQiLCJfaXNQYXVzZWQiLCJfc2V0UmVnaXN0ZXJlZCIsInJlZ2lzdGVyZWQiLCJfaXNSZWdpc3RlcmVkIiwiX2dldFR5cGUiLCJfZ2V0TGlzdGVuZXJJRCIsIl9zZXRGaXhlZFByaW9yaXR5IiwiZml4ZWRQcmlvcml0eSIsIl9nZXRGaXhlZFByaW9yaXR5IiwiX3NldFNjZW5lR3JhcGhQcmlvcml0eSIsIm5vZGUiLCJfZ2V0U2NlbmVHcmFwaFByaW9yaXR5IiwiY2hlY2tBdmFpbGFibGUiLCJjbG9uZSIsInNldEVuYWJsZWQiLCJlbmFibGVkIiwiaXNFbmFibGVkIiwicmV0YWluIiwicmVsZWFzZSIsIlVOS05PV04iLCJUT1VDSF9PTkVfQllfT05FIiwiVE9VQ0hfQUxMX0FUX09OQ0UiLCJLRVlCT0FSRCIsIk1PVVNFIiwiQUNDRUxFUkFUSU9OIiwiQ1VTVE9NIiwiTGlzdGVuZXJJRCIsIkN1c3RvbSIsImxpc3RlbmVySWQiLCJfb25DdXN0b21FdmVudCIsImNhbGwiLCJfY2FsbGJhY2siLCJleHRlbmQiLCJtaXhpbiIsImV2ZW50IiwiTW91c2UiLCJvbk1vdXNlRG93biIsIm9uTW91c2VVcCIsIm9uTW91c2VNb3ZlIiwib25Nb3VzZVNjcm9sbCIsImV2ZW50VHlwZSIsIkV2ZW50IiwiRXZlbnRNb3VzZSIsIl9ldmVudFR5cGUiLCJET1dOIiwiVVAiLCJNT1ZFIiwiU0NST0xMIiwiZXZlbnRMaXN0ZW5lciIsIlRvdWNoT25lQnlPbmUiLCJfY2xhaW1lZFRvdWNoZXMiLCJzd2FsbG93VG91Y2hlcyIsIm9uVG91Y2hCZWdhbiIsIm9uVG91Y2hNb3ZlZCIsIm9uVG91Y2hFbmRlZCIsIm9uVG91Y2hDYW5jZWxsZWQiLCJzZXRTd2FsbG93VG91Y2hlcyIsIm5lZWRTd2FsbG93IiwiaXNTd2FsbG93VG91Y2hlcyIsImxvZ0lEIiwiVG91Y2hBbGxBdE9uY2UiLCJvblRvdWNoZXNCZWdhbiIsIm9uVG91Y2hlc01vdmVkIiwib25Ub3VjaGVzRW5kZWQiLCJvblRvdWNoZXNDYW5jZWxsZWQiLCJBY2NlbGVyYXRpb24iLCJfb25BY2NlbGVyYXRpb25FdmVudCIsImFjYyIsImFzc2VydElEIiwiS2V5Ym9hcmQiLCJvbktleVByZXNzZWQiLCJvbktleVJlbGVhc2VkIiwiaXNQcmVzc2VkIiwia2V5Q29kZSIsImNyZWF0ZSIsImFyZ09iaiIsImxpc3RlbmVyVHlwZSIsImxpc3RlbmVyIiwiZXZlbnROYW1lIiwia2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7Ozs7Ozs7OztBQU9BQyxFQUFFLENBQUNDLGFBQUgsR0FBbUIsVUFBVUMsSUFBVixFQUFnQkMsVUFBaEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQ3JELE9BQUtDLFFBQUwsR0FBZ0JELFFBQWhCLENBRHFELENBQ3pCOztBQUM1QixPQUFLRSxLQUFMLEdBQWFKLElBQUksSUFBSSxDQUFyQixDQUZxRCxDQUV6Qjs7QUFDNUIsT0FBS0ssV0FBTCxHQUFtQkosVUFBVSxJQUFJLEVBQWpDLENBSHFELENBR2I7O0FBQ3hDLE9BQUtLLFdBQUwsR0FBbUIsS0FBbkIsQ0FKcUQsQ0FJekI7O0FBRTVCLE9B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QUFRLEdBQUcsSUFBSVIsUUFBSixFQUFYLENBREcsS0FFRixJQUFHTyxZQUFZLEtBQUs5RixFQUFFLENBQUNDLGFBQUgsQ0FBaUJ5QyxZQUFyQyxFQUFrRDtBQUNuRHFELElBQUFBLFFBQVEsR0FBRyxJQUFJWixZQUFKLENBQWlCVSxNQUFNLENBQUN6RixRQUF4QixDQUFYO0FBQ0EsV0FBT3lGLE1BQU0sQ0FBQ3pGLFFBQWQ7QUFDSDs7QUFFRCxPQUFJLElBQUk2RixHQUFSLElBQWVKLE1BQWYsRUFBdUI7QUFDbkJFLElBQUFBLFFBQVEsQ0FBQ0UsR0FBRCxDQUFSLEdBQWdCSixNQUFNLENBQUNJLEdBQUQsQ0FBdEI7QUFDSDs7QUFDRCxTQUFPRixRQUFQO0FBQ0gsQ0E1QkQ7O0FBOEJBRyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuRyxFQUFFLENBQUNDLGFBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuXG4vKipcbiAqICEjZW5cbiAqIDxwPlxuICogICAgIFRoZSBiYXNlIGNsYXNzIG9mIGV2ZW50IGxpc3RlbmVyLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gKiAgICAgSWYgeW91IG5lZWQgY3VzdG9tIGxpc3RlbmVyIHdoaWNoIHdpdGggZGlmZmVyZW50IGNhbGxiYWNrLCB5b3UgbmVlZCB0byBpbmhlcml0IHRoaXMgY2xhc3MuICAgICAgICAgICAgICAgPGJyLz5cbiAqICAgICBGb3IgaW5zdGFuY2UsIHlvdSBjb3VsZCByZWZlciB0byBFdmVudExpc3RlbmVyQWNjZWxlcmF0aW9uLCBFdmVudExpc3RlbmVyS2V5Ym9hcmQsICAgICAgICAgICAgICAgICAgICAgICA8YnIvPlxuICogICAgICBFdmVudExpc3RlbmVyVG91Y2hPbmVCeU9uZSwgRXZlbnRMaXN0ZW5lckN1c3RvbS5cbiAqIDwvcD5cbiAqXG4gKiAhI3poXG4gKiDlsIHoo4XnlKjmiLfnmoTkuovku7blpITnkIbpgLvovpHjgIJcbiAqIOazqOaEj++8mui/meaYr+S4gOS4quaKveixoeexu++8jOW8gOWPkeiAheS4jeW6lOivpeebtOaOpeWunuS+i+WMlui/meS4quexu++8jOivt+WPguiAgyB7eyNjcm9zc0xpbmsgXCJFdmVudExpc3RlbmVyL2NyZWF0ZTptZXRob2RcIn19Y2MuRXZlbnRMaXN0ZW5lci5jcmVhdGV7ey9jcm9zc0xpbmt9feOAglxuICpcbiAqIEBjbGFzcyBFdmVudExpc3RlbmVyXG4gKi9cblxuLyoqXG4gKiBDb25zdHJ1Y3RvclxuICogQG1ldGhvZCBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBsaXN0ZW5lcklEXG4gKiBAcGFyYW0ge051bWJlcn0gY2FsbGJhY2tcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcklELCBjYWxsYmFjaykge1xuICAgIHRoaXMuX29uRXZlbnQgPSBjYWxsYmFjazsgICAvLyBFdmVudCBjYWxsYmFjayBmdW5jdGlvblxuICAgIHRoaXMuX3R5cGUgPSB0eXBlIHx8IDA7ICAgICAvLyBFdmVudCBsaXN0ZW5lciB0eXBlXG4gICAgdGhpcy5fbGlzdGVuZXJJRCA9IGxpc3RlbmVySUQgfHwgXCJcIjsgICAgLy8gRXZlbnQgbGlzdGVuZXIgSURcbiAgICB0aGlzLl9yZWdpc3RlcmVkID0gZmFsc2U7ICAgLy8gV2hldGhlciB0aGUgbGlzdGVuZXIgaGFzIGJlZW4gYWRkZWQgdG8gZGlzcGF0Y2hlci5cblxuICAgIHRoaXMuX2ZpeGVkUHJpb3JpdHkgPSAwOyAgICAvLyBUaGUgaGlnaGVyIHRoZSBudW1iZXIsIHRoZSBoaWdoZXIgdGhlIHByaW9yaXR5LCAwIGlzIGZvciBzY2VuZSBncmFwaCBiYXNlIHByaW9yaXR5LlxuICAgIHRoaXMuX25vZGUgPSBudWxsOyAgICAgICAgICAvLyBzY2VuZSBncmFwaCBiYXNlZCBwcmlvcml0eVxuICAgIHRoaXMuX3RhcmdldCA9IG51bGw7XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTsgICAgICAgIC8vIFdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIHBhdXNlZFxuICAgIHRoaXMuX2lzRW5hYmxlZCA9IHRydWU7ICAgICAvLyBXaGV0aGVyIHRoZSBsaXN0ZW5lciBpcyBlbmFibGVkXG59O1xuXG5jYy5FdmVudExpc3RlbmVyLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogY2MuRXZlbnRMaXN0ZW5lcixcbiAgICAvKlxuICAgICAqIDxwPlxuICAgICAqICAgICBTZXRzIHBhdXNlZCBzdGF0ZSBmb3IgdGhlIGxpc3RlbmVyXG4gICAgICogICAgIFRoZSBwYXVzZWQgc3RhdGUgaXMgb25seSB1c2VkIGZvciBzY2VuZSBncmFwaCBwcmlvcml0eSBsaXN0ZW5lcnMuXG4gICAgICogICAgIGBFdmVudERpc3BhdGNoZXI6OnJlc3VtZUFsbEV2ZW50TGlzdGVuZXJzRm9yVGFyZ2V0KG5vZGUpYCB3aWxsIHNldCB0aGUgcGF1c2VkIHN0YXRlIHRvIGB0cnVlYCxcbiAgICAgKiAgICAgd2hpbGUgYEV2ZW50RGlzcGF0Y2hlcjo6cGF1c2VBbGxFdmVudExpc3RlbmVyc0ZvclRhcmdldChub2RlKWAgd2lsbCBzZXQgaXQgdG8gYGZhbHNlYC5cbiAgICAgKiAgICAgQG5vdGUgMSkgRml4ZWQgcHJpb3JpdHkgbGlzdGVuZXJzIHdpbGwgbmV2ZXIgZ2V0IHBhdXNlZC4gSWYgYSBmaXhlZCBwcmlvcml0eSBkb2Vzbid0IHdhbnQgdG8gcmVjZWl2ZSBldmVudHMsXG4gICAgICogICAgICAgICAgICAgIGNhbGwgYHNldEVuYWJsZWQoZmFsc2UpYCBpbnN0ZWFkLlxuICAgICAqICAgICAgICAgICAgMikgSW4gYE5vZGVgJ3Mgb25FbnRlciBhbmQgb25FeGl0LCB0aGUgYHBhdXNlZCBzdGF0ZWAgb2YgdGhlIGxpc3RlbmVycyB3aGljaCBhc3NvY2lhdGVkIHdpdGggdGhhdCBub2RlIHdpbGwgYmUgYXV0b21hdGljYWxseSB1cGRhdGVkLlxuICAgICAqIDwvcD5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBhdXNlZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NldFBhdXNlZDogZnVuY3Rpb24gKHBhdXNlZCkge1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSBwYXVzZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3RlbmVyIGlzIHBhdXNlZC5cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pc1BhdXNlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGF1c2VkO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIE1hcmtzIHRoZSBsaXN0ZW5lciB3YXMgcmVnaXN0ZXJlZCBieSBFdmVudERpc3BhdGNoZXIuXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZWdpc3RlcmVkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0UmVnaXN0ZXJlZDogZnVuY3Rpb24gKHJlZ2lzdGVyZWQpIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJlZCA9IHJlZ2lzdGVyZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGxpc3RlbmVyIHdhcyByZWdpc3RlcmVkIGJ5IEV2ZW50RGlzcGF0Y2hlclxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2lzUmVnaXN0ZXJlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXJlZDtcbiAgICB9LFxuXG4gICAgLypcbiAgICAgKiBHZXRzIHRoZSB0eXBlIG9mIHRoaXMgbGlzdGVuZXJcbiAgICAgKiBAbm90ZSBJdCdzIGRpZmZlcmVudCBmcm9tIGBFdmVudFR5cGVgLCBlLmcuIFRvdWNoRXZlbnQgaGFzIHR3byBraW5kcyBvZiBldmVudCBsaXN0ZW5lcnMgLSBFdmVudExpc3RlbmVyT25lQnlPbmUsIEV2ZW50TGlzdGVuZXJBbGxBdE9uY2VcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogIEdldHMgdGhlIGxpc3RlbmVyIElEIG9mIHRoaXMgbGlzdGVuZXJcbiAgICAgKiAgV2hlbiBldmVudCBpcyBiZWluZyBkaXNwYXRjaGVkLCBsaXN0ZW5lciBJRCBpcyB1c2VkIGFzIGtleSBmb3Igc2VhcmNoaW5nIGxpc3RlbmVycyBhY2NvcmRpbmcgdG8gZXZlbnQgdHlwZS5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldExpc3RlbmVySUQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVySUQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogU2V0cyB0aGUgZml4ZWQgcHJpb3JpdHkgZm9yIHRoaXMgbGlzdGVuZXJcbiAgICAgKiAgQG5vdGUgVGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGZvciBgZml4ZWQgcHJpb3JpdHkgbGlzdGVuZXJzYCwgaXQgbmVlZHMgdG8gYWNjZXNzIGEgbm9uLXplcm8gdmFsdWUuIDAgaXMgcmVzZXJ2ZWQgZm9yIHNjZW5lIGdyYXBoIHByaW9yaXR5IGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBmaXhlZFByaW9yaXR5XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0Rml4ZWRQcmlvcml0eTogZnVuY3Rpb24gKGZpeGVkUHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy5fZml4ZWRQcmlvcml0eSA9IGZpeGVkUHJpb3JpdHk7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogR2V0cyB0aGUgZml4ZWQgcHJpb3JpdHkgb2YgdGhpcyBsaXN0ZW5lclxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IDAgaWYgaXQncyBhIHNjZW5lIGdyYXBoIHByaW9yaXR5IGxpc3RlbmVyLCBub24temVybyBmb3IgZml4ZWQgcHJpb3JpdHkgbGlzdGVuZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9nZXRGaXhlZFByaW9yaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXhlZFByaW9yaXR5O1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIFNldHMgc2NlbmUgZ3JhcGggcHJpb3JpdHkgZm9yIHRoaXMgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2NjLk5vZGV9IG5vZGVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zZXRTY2VuZUdyYXBoUHJpb3JpdHk6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IG5vZGU7XG4gICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIH0sXG5cbiAgICAvKlxuICAgICAqIEdldHMgc2NlbmUgZ3JhcGggcHJpb3JpdHkgb2YgdGhpcyBsaXN0ZW5lclxuICAgICAqIEByZXR1cm5zIHtjYy5Ob2RlfSBpZiBpdCdzIGEgZml4ZWQgcHJpb3JpdHkgbGlzdGVuZXIsIG5vbi1udWxsIGZvciBzY2VuZSBncmFwaCBwcmlvcml0eSBsaXN0ZW5lclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFNjZW5lR3JhcGhQcmlvcml0eTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgbGlzdGVuZXIgaXMgYXZhaWxhYmxlLlxuICAgICAqICEjemgg5qOA5rWL55uR5ZCs5Zmo5piv5ZCm5pyJ5pWIXG4gICAgICogQG1ldGhvZCBjaGVja0F2YWlsYWJsZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbkV2ZW50ICE9PSBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIENsb25lcyB0aGUgbGlzdGVuZXIsIGl0cyBzdWJjbGFzc2VzIGhhdmUgdG8gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gICAgICogISN6aCDlhYvpmobnm5HlkKzlmags5a6D55qE5a2Q57G75b+F6aG76YeN5YaZ5q2k5pa55rOV44CCXG4gICAgICogQG1ldGhvZCBjbG9uZVxuICAgICAqIEByZXR1cm5zIHtFdmVudExpc3RlbmVyfVxuICAgICAqL1xuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAgISNlbiBFbmFibGVzIG9yIGRpc2FibGVzIHRoZSBsaXN0ZW5lclxuICAgICAqICAhI3poIOWQr+eUqOaIluemgeeUqOebkeWQrOWZqOOAglxuICAgICAqICBAbWV0aG9kIHNldEVuYWJsZWRcbiAgICAgKiAgQHBhcmFtIHtCb29sZWFufSBlbmFibGVkXG4gICAgICogIEBub3RlIE9ubHkgbGlzdGVuZXJzIHdpdGggYGVuYWJsZWRgIHN0YXRlIHdpbGwgYmUgYWJsZSB0byByZWNlaXZlIGV2ZW50cy5cbiAgICAgKiAgICAgICAgICBXaGVuIGFuIGxpc3RlbmVyIHdhcyBpbml0aWFsaXplZCwgaXQncyBlbmFibGVkIGJ5IGRlZmF1bHQuXG4gICAgICogICAgICAgICAgQW4gZXZlbnQgbGlzdGVuZXIgY2FuIHJlY2VpdmUgZXZlbnRzIHdoZW4gaXQgaXMgZW5hYmxlZCBhbmQgaXMgbm90IHBhdXNlZC5cbiAgICAgKiAgICAgICAgICBwYXVzZWQgc3RhdGUgaXMgYWx3YXlzIGZhbHNlIHdoZW4gaXQgaXMgYSBmaXhlZCBwcmlvcml0eSBsaXN0ZW5lci5cbiAgICAgKi9cbiAgICBzZXRFbmFibGVkOiBmdW5jdGlvbihlbmFibGVkKXtcbiAgICAgICAgdGhpcy5faXNFbmFibGVkID0gZW5hYmxlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgbGlzdGVuZXIgaXMgZW5hYmxlZFxuICAgICAqICEjemgg5qOA5p+l55uR5ZCs5Zmo5piv5ZCm5Y+v55So44CCXG4gICAgICogQG1ldGhvZCBpc0VuYWJsZWRcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0VuYWJsZWQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0VuYWJsZWQ7XG4gICAgfSxcblxuICAgIC8qXG4gICAgICogPHA+Q3VycmVudGx5IEphdmFTY3JpcHQgQmluZGluZ3MgKEpTQiksIGluIHNvbWUgY2FzZXMsIG5lZWRzIHRvIHVzZSByZXRhaW4gYW5kIHJlbGVhc2UuIFRoaXMgaXMgYSBidWcgaW4gSlNCLFxuICAgICAqIGFuZCB0aGUgdWdseSB3b3JrYXJvdW5kIGlzIHRvIHVzZSByZXRhaW4vcmVsZWFzZS4gU28sIHRoZXNlIDIgbWV0aG9kcyB3ZXJlIGFkZGVkIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBKU0IuXG4gICAgICogVGhpcyBpcyBhIGhhY2ssIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIEpTQiBmaXhlcyB0aGUgcmV0YWluL3JlbGVhc2UgYnVnPGJyLz5cbiAgICAgKiBZb3Ugd2lsbCBuZWVkIHRvIHJldGFpbiBhbiBvYmplY3QgaWYgeW91IGNyZWF0ZWQgYSBsaXN0ZW5lciBhbmQgaGF2ZW4ndCBhZGRlZCBpdCBhbnkgdGFyZ2V0IG5vZGUgZHVyaW5nIHRoZSBzYW1lIGZyYW1lLjxici8+XG4gICAgICogT3RoZXJ3aXNlLCBKU0IncyBuYXRpdmUgYXV0b3JlbGVhc2UgcG9vbCB3aWxsIGNvbnNpZGVyIHRoaXMgb2JqZWN0IGEgdXNlbGVzcyBvbmUgYW5kIHJlbGVhc2UgaXQgZGlyZWN0bHksPGJyLz5cbiAgICAgKiB3aGVuIHlvdSB3YW50IHRvIHVzZSBpdCBsYXRlciwgYSBcIkludmFsaWQgTmF0aXZlIE9iamVjdFwiIGVycm9yIHdpbGwgYmUgcmFpc2VkLjxici8+XG4gICAgICogVGhlIHJldGFpbiBmdW5jdGlvbiBjYW4gaW5jcmVhc2UgYSByZWZlcmVuY2UgY291bnQgZm9yIHRoZSBuYXRpdmUgb2JqZWN0IHRvIGF2b2lkIGl0IGJlaW5nIHJlbGVhc2VkLDxici8+XG4gICAgICogeW91IG5lZWQgdG8gbWFudWFsbHkgaW52b2tlIHJlbGVhc2UgZnVuY3Rpb24gd2hlbiB5b3UgdGhpbmsgdGhpcyBvYmplY3QgaXMgbm8gbG9uZ2VyIG5lZWRlZCwgb3RoZXJ3aXNlLCB0aGVyZSB3aWxsIGJlIG1lbW9yeSBsZWFya3MuPGJyLz5cbiAgICAgKiByZXRhaW4gYW5kIHJlbGVhc2UgZnVuY3Rpb24gY2FsbCBzaG91bGQgYmUgcGFpcmVkIGluIGRldmVsb3BlcidzIGdhbWUgY29kZS48L3A+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJldGFpblxuICAgICAqIEBzZWUgY2MuRXZlbnRMaXN0ZW5lciNyZWxlYXNlXG4gICAgICovXG4gICAgcmV0YWluOmZ1bmN0aW9uICgpIHtcbiAgICB9LFxuICAgIC8qXG4gICAgICogPHA+Q3VycmVudGx5IEphdmFTY3JpcHQgQmluZGluZ3MgKEpTQiksIGluIHNvbWUgY2FzZXMsIG5lZWRzIHRvIHVzZSByZXRhaW4gYW5kIHJlbGVhc2UuIFRoaXMgaXMgYSBidWcgaW4gSlNCLFxuICAgICAqIGFuZCB0aGUgdWdseSB3b3JrYXJvdW5kIGlzIHRvIHVzZSByZXRhaW4vcmVsZWFzZS4gU28sIHRoZXNlIDIgbWV0aG9kcyB3ZXJlIGFkZGVkIHRvIGJlIGNvbXBhdGlibGUgd2l0aCBKU0IuXG4gICAgICogVGhpcyBpcyBhIGhhY2ssIGFuZCBzaG91bGQgYmUgcmVtb3ZlZCBvbmNlIEpTQiBmaXhlcyB0aGUgcmV0YWluL3JlbGVhc2UgYnVnPGJyLz5cbiAgICAgKiBZb3Ugd2lsbCBuZWVkIHRvIHJldGFpbiBhbiBvYmplY3QgaWYgeW91IGNyZWF0ZWQgYSBsaXN0ZW5lciBhbmQgaGF2ZW4ndCBhZGRlZCBpdCBhbnkgdGFyZ2V0IG5vZGUgZHVyaW5nIHRoZSBzYW1lIGZyYW1lLjxici8+XG4gICAgICogT3RoZXJ3aXNlLCBKU0IncyBuYXRpdmUgYXV0b3JlbGVhc2UgcG9vbCB3aWxsIGNvbnNpZGVyIHRoaXMgb2JqZWN0IGEgdXNlbGVzcyBvbmUgYW5kIHJlbGVhc2UgaXQgZGlyZWN0bHksPGJyLz5cbiAgICAgKiB3aGVuIHlvdSB3YW50IHRvIHVzZSBpdCBsYXRlciwgYSBcIkludmFsaWQgTmF0aXZlIE9iamVjdFwiIGVycm9yIHdpbGwgYmUgcmFpc2VkLjxici8+XG4gICAgICogVGhlIHJldGFpbiBmdW5jdGlvbiBjYW4gaW5jcmVhc2UgYSByZWZlcmVuY2UgY291bnQgZm9yIHRoZSBuYXRpdmUgb2JqZWN0IHRvIGF2b2lkIGl0IGJlaW5nIHJlbGVhc2VkLDxici8+XG4gICAgICogeW91IG5lZWQgdG8gbWFudWFsbHkgaW52b2tlIHJlbGVhc2UgZnVuY3Rpb24gd2hlbiB5b3UgdGhpbmsgdGhpcyBvYmplY3QgaXMgbm8gbG9uZ2VyIG5lZWRlZCwgb3RoZXJ3aXNlLCB0aGVyZSB3aWxsIGJlIG1lbW9yeSBsZWFya3MuPGJyLz5cbiAgICAgKiByZXRhaW4gYW5kIHJlbGVhc2UgZnVuY3Rpb24gY2FsbCBzaG91bGQgYmUgcGFpcmVkIGluIGRldmVsb3BlcidzIGdhbWUgY29kZS48L3A+XG4gICAgICpcbiAgICAgKiBAbWV0aG9kIHJlbGVhc2VcbiAgICAgKiBAc2VlIGNjLkV2ZW50TGlzdGVuZXIjcmV0YWluXG4gICAgICovXG4gICAgcmVsZWFzZTpmdW5jdGlvbiAoKSB7XG4gICAgfVxufTtcblxuLy8gZXZlbnQgbGlzdGVuZXIgdHlwZVxuLyoqXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgdW5rbm93biBldmVudCBsaXN0ZW5lci5cbiAqICEjemgg5pyq55+l55qE5LqL5Lu255uR5ZCs5Zmo57G75Z6LXG4gKiBAcHJvcGVydHkgVU5LTk9XTlxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5VTktOT1dOID0gMDtcbi8qXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2Ygb25lIGJ5IG9uZSB0b3VjaCBldmVudCBsaXN0ZW5lci5cbiAqICEjemgg6Kem5pG45LqL5Lu255uR5ZCs5Zmo57G75Z6L77yM6Kem54K55Lya5LiA5Liq5LiA5Liq5b6X5YiG5byA6KKr5rS+5Y+RXG4gKiBAcHJvcGVydHkgVE9VQ0hfT05FX0JZX09ORVxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FID0gMTtcbi8qXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgYWxsIGF0IG9uY2UgdG91Y2ggZXZlbnQgbGlzdGVuZXIuXG4gKiAhI3poIOinpuaRuOS6i+S7tuebkeWQrOWZqOexu+Wei++8jOinpueCueS8muiiq+S4gOasoeaAp+WFqOmDqOa0vuWPkVxuICogQHByb3BlcnR5IFRPVUNIX0FMTF9BVF9PTkNFXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQHN0YXRpY1xuICovXG5jYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFID0gMjtcbi8qKlxuICogISNlbiBUaGUgdHlwZSBjb2RlIG9mIGtleWJvYXJkIGV2ZW50IGxpc3RlbmVyLlxuICogISN6aCDplK7nm5jkuovku7bnm5HlkKzlmajnsbvlnotcbiAqIEBwcm9wZXJ0eSBLRVlCT0FSRFxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCA9IDM7XG4vKlxuICogISNlbiBUaGUgdHlwZSBjb2RlIG9mIG1vdXNlIGV2ZW50IGxpc3RlbmVyLlxuICogISN6aCDpvKDmoIfkuovku7bnm5HlkKzlmajnsbvlnotcbiAqIEBwcm9wZXJ0eSBNT1VTRVxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5NT1VTRSA9IDQ7XG4vKipcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBhY2NlbGVyYXRpb24gZXZlbnQgbGlzdGVuZXIuXG4gKiAhI3poIOWKoOmAn+WZqOS6i+S7tuebkeWQrOWZqOexu+Wei1xuICogQHByb3BlcnR5IEFDQ0VMRVJBVElPTlxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5BQ0NFTEVSQVRJT04gPSA2O1xuLypcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBjdXN0b20gZXZlbnQgbGlzdGVuZXIuXG4gKiAhI3poIOiHquWumuS5ieS6i+S7tuebkeWQrOWZqOexu+Wei1xuICogQHByb3BlcnR5IENVU1RPTVxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5DVVNUT00gPSA4O1xuXG52YXIgTGlzdGVuZXJJRCA9IGNjLkV2ZW50TGlzdGVuZXIuTGlzdGVuZXJJRCA9IHtcbiAgICBNT1VTRTogJ19fY2NfbW91c2UnLFxuICAgIFRPVUNIX09ORV9CWV9PTkU6ICdfX2NjX3RvdWNoX29uZV9ieV9vbmUnLFxuICAgIFRPVUNIX0FMTF9BVF9PTkNFOiAnX19jY190b3VjaF9hbGxfYXRfb25jZScsXG4gICAgS0VZQk9BUkQ6ICdfX2NjX2tleWJvYXJkJyxcbiAgICBBQ0NFTEVSQVRJT046ICdfX2NjX2FjY2VsZXJhdGlvbicsXG59O1xuXG52YXIgQ3VzdG9tID0gZnVuY3Rpb24gKGxpc3RlbmVySWQsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fb25DdXN0b21FdmVudCA9IGNhbGxiYWNrO1xuICAgIGNjLkV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBjYy5FdmVudExpc3RlbmVyLkNVU1RPTSwgbGlzdGVuZXJJZCwgdGhpcy5fY2FsbGJhY2spO1xufTtcbmpzLmV4dGVuZChDdXN0b20sIGNjLkV2ZW50TGlzdGVuZXIpO1xuanMubWl4aW4oQ3VzdG9tLnByb3RvdHlwZSwge1xuICAgIF9vbkN1c3RvbUV2ZW50OiBudWxsLFxuICAgIFxuICAgIF9jYWxsYmFjazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLl9vbkN1c3RvbUV2ZW50ICE9PSBudWxsKVxuICAgICAgICAgICAgdGhpcy5fb25DdXN0b21FdmVudChldmVudCk7XG4gICAgfSxcblxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoY2MuRXZlbnRMaXN0ZW5lci5wcm90b3R5cGUuY2hlY2tBdmFpbGFibGUuY2FsbCh0aGlzKSAmJiB0aGlzLl9vbkN1c3RvbUV2ZW50ICE9PSBudWxsKTtcbiAgICB9LFxuXG4gICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDdXN0b20odGhpcy5fbGlzdGVuZXJJRCwgdGhpcy5fb25DdXN0b21FdmVudCk7XG4gICAgfVxufSk7XG5cbnZhciBNb3VzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5NT1VTRSwgTGlzdGVuZXJJRC5NT1VTRSwgdGhpcy5fY2FsbGJhY2spO1xufTtcbmpzLmV4dGVuZChNb3VzZSwgY2MuRXZlbnRMaXN0ZW5lcik7XG5qcy5taXhpbihNb3VzZS5wcm90b3R5cGUsIHtcbiAgICBvbk1vdXNlRG93bjogbnVsbCxcbiAgICBvbk1vdXNlVXA6IG51bGwsXG4gICAgb25Nb3VzZU1vdmU6IG51bGwsXG4gICAgb25Nb3VzZVNjcm9sbDogbnVsbCxcblxuICAgIF9jYWxsYmFjazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBldmVudFR5cGUgPSBjYy5FdmVudC5FdmVudE1vdXNlO1xuICAgICAgICBzd2l0Y2ggKGV2ZW50Ll9ldmVudFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlLkRPV046XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25Nb3VzZURvd24pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb3VzZURvd24oZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBldmVudFR5cGUuVVA6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25Nb3VzZVVwKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VVcChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGV2ZW50VHlwZS5NT1ZFOlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9uTW91c2VNb3ZlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZXZlbnRUeXBlLlNDUk9MTDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbk1vdXNlU2Nyb2xsKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VTY3JvbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG5ldyBNb3VzZSgpO1xuICAgICAgICBldmVudExpc3RlbmVyLm9uTW91c2VEb3duID0gdGhpcy5vbk1vdXNlRG93bjtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vbk1vdXNlVXAgPSB0aGlzLm9uTW91c2VVcDtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vbk1vdXNlTW92ZSA9IHRoaXMub25Nb3VzZU1vdmU7XG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Nb3VzZVNjcm9sbCA9IHRoaXMub25Nb3VzZVNjcm9sbDtcbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG4gICAgfSxcblxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG52YXIgVG91Y2hPbmVCeU9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5UT1VDSF9PTkVfQllfT05FLCBMaXN0ZW5lcklELlRPVUNIX09ORV9CWV9PTkUsIG51bGwpO1xuICAgIHRoaXMuX2NsYWltZWRUb3VjaGVzID0gW107XG59O1xuanMuZXh0ZW5kKFRvdWNoT25lQnlPbmUsIGNjLkV2ZW50TGlzdGVuZXIpO1xuanMubWl4aW4oVG91Y2hPbmVCeU9uZS5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3RvcjogVG91Y2hPbmVCeU9uZSxcbiAgICBfY2xhaW1lZFRvdWNoZXM6IG51bGwsXG4gICAgc3dhbGxvd1RvdWNoZXM6IGZhbHNlLFxuICAgIG9uVG91Y2hCZWdhbjogbnVsbCxcbiAgICBvblRvdWNoTW92ZWQ6IG51bGwsXG4gICAgb25Ub3VjaEVuZGVkOiBudWxsLFxuICAgIG9uVG91Y2hDYW5jZWxsZWQ6IG51bGwsXG5cbiAgICBzZXRTd2FsbG93VG91Y2hlczogZnVuY3Rpb24gKG5lZWRTd2FsbG93KSB7XG4gICAgICAgIHRoaXMuc3dhbGxvd1RvdWNoZXMgPSBuZWVkU3dhbGxvdztcbiAgICB9LFxuXG4gICAgaXNTd2FsbG93VG91Y2hlczogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3dhbGxvd1RvdWNoZXM7XG4gICAgfSxcblxuICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBldmVudExpc3RlbmVyID0gbmV3IFRvdWNoT25lQnlPbmUoKTtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoQmVnYW4gPSB0aGlzLm9uVG91Y2hCZWdhbjtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoTW92ZWQgPSB0aGlzLm9uVG91Y2hNb3ZlZDtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoRW5kZWQgPSB0aGlzLm9uVG91Y2hFbmRlZDtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoQ2FuY2VsbGVkID0gdGhpcy5vblRvdWNoQ2FuY2VsbGVkO1xuICAgICAgICBldmVudExpc3RlbmVyLnN3YWxsb3dUb3VjaGVzID0gdGhpcy5zd2FsbG93VG91Y2hlcztcbiAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG4gICAgfSxcblxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmKCF0aGlzLm9uVG91Y2hCZWdhbil7XG4gICAgICAgICAgICBjYy5sb2dJRCgxODAxKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcblxudmFyIFRvdWNoQWxsQXRPbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLkV2ZW50TGlzdGVuZXIuY2FsbCh0aGlzLCBjYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFLCBMaXN0ZW5lcklELlRPVUNIX0FMTF9BVF9PTkNFLCBudWxsKTtcbn07XG5qcy5leHRlbmQoVG91Y2hBbGxBdE9uY2UsIGNjLkV2ZW50TGlzdGVuZXIpO1xuanMubWl4aW4oVG91Y2hBbGxBdE9uY2UucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IFRvdWNoQWxsQXRPbmNlLFxuICAgIG9uVG91Y2hlc0JlZ2FuOiBudWxsLFxuICAgIG9uVG91Y2hlc01vdmVkOiBudWxsLFxuICAgIG9uVG91Y2hlc0VuZGVkOiBudWxsLFxuICAgIG9uVG91Y2hlc0NhbmNlbGxlZDogbnVsbCxcblxuICAgIGNsb25lOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG5ldyBUb3VjaEFsbEF0T25jZSgpO1xuICAgICAgICBldmVudExpc3RlbmVyLm9uVG91Y2hlc0JlZ2FuID0gdGhpcy5vblRvdWNoZXNCZWdhbjtcbiAgICAgICAgZXZlbnRMaXN0ZW5lci5vblRvdWNoZXNNb3ZlZCA9IHRoaXMub25Ub3VjaGVzTW92ZWQ7XG4gICAgICAgIGV2ZW50TGlzdGVuZXIub25Ub3VjaGVzRW5kZWQgPSB0aGlzLm9uVG91Y2hlc0VuZGVkO1xuICAgICAgICBldmVudExpc3RlbmVyLm9uVG91Y2hlc0NhbmNlbGxlZCA9IHRoaXMub25Ub3VjaGVzQ2FuY2VsbGVkO1xuICAgICAgICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbiAgICB9LFxuXG4gICAgY2hlY2tBdmFpbGFibGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICh0aGlzLm9uVG91Y2hlc0JlZ2FuID09PSBudWxsICYmIHRoaXMub25Ub3VjaGVzTW92ZWQgPT09IG51bGxcbiAgICAgICAgICAgICYmIHRoaXMub25Ub3VjaGVzRW5kZWQgPT09IG51bGwgJiYgdGhpcy5vblRvdWNoZXNDYW5jZWxsZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDE4MDIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0pO1xuXG4vL0FjY2VsZXJhdGlvblxudmFyIEFjY2VsZXJhdGlvbiA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuX29uQWNjZWxlcmF0aW9uRXZlbnQgPSBjYWxsYmFjaztcbiAgICBjYy5FdmVudExpc3RlbmVyLmNhbGwodGhpcywgY2MuRXZlbnRMaXN0ZW5lci5BQ0NFTEVSQVRJT04sIExpc3RlbmVySUQuQUNDRUxFUkFUSU9OLCB0aGlzLl9jYWxsYmFjayk7XG59O1xuanMuZXh0ZW5kKEFjY2VsZXJhdGlvbiwgY2MuRXZlbnRMaXN0ZW5lcik7XG5qcy5taXhpbihBY2NlbGVyYXRpb24ucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IEFjY2VsZXJhdGlvbixcbiAgICBfb25BY2NlbGVyYXRpb25FdmVudDogbnVsbCxcblxuICAgIF9jYWxsYmFjazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX29uQWNjZWxlcmF0aW9uRXZlbnQoZXZlbnQuYWNjLCBldmVudCk7XG4gICAgfSxcblxuICAgIGNoZWNrQXZhaWxhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNjLmFzc2VydElEKHRoaXMuX29uQWNjZWxlcmF0aW9uRXZlbnQsIDE4MDMpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFjY2VsZXJhdGlvbih0aGlzLl9vbkFjY2VsZXJhdGlvbkV2ZW50KTtcbiAgICB9XG59KTtcblxuXG4vL0tleWJvYXJkXG52YXIgS2V5Ym9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2MuRXZlbnRMaXN0ZW5lci5jYWxsKHRoaXMsIGNjLkV2ZW50TGlzdGVuZXIuS0VZQk9BUkQsIExpc3RlbmVySUQuS0VZQk9BUkQsIHRoaXMuX2NhbGxiYWNrKTtcbn07XG5qcy5leHRlbmQoS2V5Ym9hcmQsIGNjLkV2ZW50TGlzdGVuZXIpO1xuanMubWl4aW4oS2V5Ym9hcmQucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IEtleWJvYXJkLFxuICAgIG9uS2V5UHJlc3NlZDogbnVsbCxcbiAgICBvbktleVJlbGVhc2VkOiBudWxsLFxuXG4gICAgX2NhbGxiYWNrOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzUHJlc3NlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMub25LZXlQcmVzc2VkKVxuICAgICAgICAgICAgICAgIHRoaXMub25LZXlQcmVzc2VkKGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uS2V5UmVsZWFzZWQpXG4gICAgICAgICAgICAgICAgdGhpcy5vbktleVJlbGVhc2VkKGV2ZW50LmtleUNvZGUsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IG5ldyBLZXlib2FyZCgpO1xuICAgICAgICBldmVudExpc3RlbmVyLm9uS2V5UHJlc3NlZCA9IHRoaXMub25LZXlQcmVzc2VkO1xuICAgICAgICBldmVudExpc3RlbmVyLm9uS2V5UmVsZWFzZWQgPSB0aGlzLm9uS2V5UmVsZWFzZWQ7XG4gICAgICAgIHJldHVybiBldmVudExpc3RlbmVyO1xuICAgIH0sXG5cbiAgICBjaGVja0F2YWlsYWJsZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbktleVByZXNzZWQgPT09IG51bGwgJiYgdGhpcy5vbktleVJlbGVhc2VkID09PSBudWxsKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCgxODAwKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59KTtcblxuLyoqXG4gKiAhI2VuXG4gKiBDcmVhdGUgYSBFdmVudExpc3RlbmVyIG9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gaW5jbHVkaW5nIHRoZSBldmVudCB0eXBlLCBoYW5kbGVycyBhbmQgb3RoZXIgcGFyYW1ldGVycy5cbiAqIEluIGhhbmRsZXJzLCB0aGlzIHJlZmVyIHRvIHRoZSBldmVudCBsaXN0ZW5lciBvYmplY3QgaXRzZWxmLlxuICogWW91IGNhbiBhbHNvIHBhc3MgY3VzdG9tIHBhcmFtZXRlcnMgaW4gdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0LFxuICogYWxsIGN1c3RvbSBwYXJhbWV0ZXJzIHdpbGwgYmUgcG9seWZpbGxlZCBpbnRvIHRoZSBldmVudCBsaXN0ZW5lciBvYmplY3QgYW5kIGNhbiBiZSBhY2Nlc3NlZCBpbiBoYW5kbGVycy5cbiAqICEjemgg6YCa6L+H5oyH5a6a5LiN5ZCM55qEIEV2ZW50IOWvueixoeadpeiuvue9ruaDs+imgeWIm+W7uueahOS6i+S7tuebkeWQrOWZqOOAglxuICogQG1ldGhvZCBjcmVhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdPYmogYSBqc29uIG9iamVjdFxuICogQHJldHVybnMge0V2ZW50TGlzdGVuZXJ9XG4gKiBAc3RhdGljXG4gKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL2V2ZW50LW1hbmFnZXIvQ0NFdmVudExpc3RlbmVyL2NyZWF0ZS5qc31cbiAqL1xuY2MuRXZlbnRMaXN0ZW5lci5jcmVhdGUgPSBmdW5jdGlvbiAoYXJnT2JqKSB7XG4gICAgY2MuYXNzZXJ0SUQoYXJnT2JqJiZhcmdPYmouZXZlbnQsIDE5MDApO1xuXG4gICAgdmFyIGxpc3RlbmVyVHlwZSA9IGFyZ09iai5ldmVudDtcbiAgICBkZWxldGUgYXJnT2JqLmV2ZW50O1xuXG4gICAgdmFyIGxpc3RlbmVyID0gbnVsbDtcbiAgICBpZihsaXN0ZW5lclR5cGUgPT09IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSlcbiAgICAgICAgbGlzdGVuZXIgPSBuZXcgVG91Y2hPbmVCeU9uZSgpO1xuICAgIGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLlRPVUNIX0FMTF9BVF9PTkNFKVxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBUb3VjaEFsbEF0T25jZSgpO1xuICAgIGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLk1PVVNFKVxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBNb3VzZSgpO1xuICAgIGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLkNVU1RPTSl7XG4gICAgICAgIGxpc3RlbmVyID0gbmV3IEN1c3RvbShhcmdPYmouZXZlbnROYW1lLCBhcmdPYmouY2FsbGJhY2spO1xuICAgICAgICBkZWxldGUgYXJnT2JqLmV2ZW50TmFtZTtcbiAgICAgICAgZGVsZXRlIGFyZ09iai5jYWxsYmFjaztcbiAgICB9IGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJEKVxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBLZXlib2FyZCgpO1xuICAgIGVsc2UgaWYobGlzdGVuZXJUeXBlID09PSBjYy5FdmVudExpc3RlbmVyLkFDQ0VMRVJBVElPTil7XG4gICAgICAgIGxpc3RlbmVyID0gbmV3IEFjY2VsZXJhdGlvbihhcmdPYmouY2FsbGJhY2spO1xuICAgICAgICBkZWxldGUgYXJnT2JqLmNhbGxiYWNrO1xuICAgIH1cblxuICAgIGZvcih2YXIga2V5IGluIGFyZ09iaikge1xuICAgICAgICBsaXN0ZW5lcltrZXldID0gYXJnT2JqW2tleV07XG4gICAgfVxuICAgIHJldHVybiBsaXN0ZW5lcjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2MuRXZlbnRMaXN0ZW5lcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==