
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event.js';
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
var js = require("../platform/js");
/**
 * !#en Base class of all kinds of events.
 * !#zh 包含事件相关信息的对象。
 * @class Event
 */

/**
 * @method constructor
 * @param {String} type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */


cc.Event = function (type, bubbles) {
  /**
   * !#en The name of the event (case-sensitive), e.g. "click", "fire", or "submit".
   * !#zh 事件类型。
   * @property type
   * @type {String}
   */
  this.type = type;
  /**
   * !#en Indicate whether the event bubbles up through the tree or not.
   * !#zh 表示该事件是否进行冒泡。
   * @property bubbles
   * @type {Boolean}
   */

  this.bubbles = !!bubbles;
  /**
   * !#en A reference to the target to which the event was originally dispatched.
   * !#zh 最初事件触发的目标
   * @property target
   * @type {Object}
   */

  this.target = null;
  /**
   * !#en A reference to the currently registered target for the event.
   * !#zh 当前目标
   * @property currentTarget
   * @type {Object}
   */

  this.currentTarget = null;
  /**
   * !#en
   * Indicates which phase of the event flow is currently being evaluated.
   * Returns an integer value represented by 4 constants:
   *  - Event.NONE = 0
   *  - Event.CAPTURING_PHASE = 1
   *  - Event.AT_TARGET = 2
   *  - Event.BUBBLING_PHASE = 3
   * The phases are explained in the [section 3.1, Event dispatch and DOM event flow]
   * (http://www.w3.org/TR/DOM-Level-3-Events/#event-flow), of the DOM Level 3 Events specification.
   * !#zh 事件阶段
   * @property eventPhase
   * @type {Number}
   */

  this.eventPhase = 0;
  /*
   * Indicates whether or not event.stopPropagation() has been called on the event.
   * @property _propagationStopped
   * @type {Boolean}
   * @private
   */

  this._propagationStopped = false;
  /*
   * Indicates whether or not event.stopPropagationImmediate() has been called on the event.
   * @property _propagationImmediateStopped
   * @type {Boolean}
   * @private
   */

  this._propagationImmediateStopped = false;
};

cc.Event.prototype = {
  constructor: cc.Event,

  /**
   * !#en Reset the event for being stored in the object pool.
   * !#zh 重置对象池中存储的事件。
   * @method unuse
   * @returns {String}
   */
  unuse: function unuse() {
    this.type = cc.Event.NO_TYPE;
    this.target = null;
    this.currentTarget = null;
    this.eventPhase = cc.Event.NONE;
    this._propagationStopped = false;
    this._propagationImmediateStopped = false;
  },

  /**
   * !#en Reuse the event for being used again by the object pool.
   * !#zh 用于对象池再次使用的事件。
   * @method reuse
   * @returns {String}
   */
  reuse: function reuse(type, bubbles) {
    this.type = type;
    this.bubbles = bubbles || false;
  },

  /**
   * !#en Stops propagation for current event.
   * !#zh 停止传递当前事件。
   * @method stopPropagation
   */
  stopPropagation: function stopPropagation() {
    this._propagationStopped = true;
  },

  /**
   * !#en Stops propagation for current event immediately,
   * the event won't even be dispatched to the listeners attached in the current target.
   * !#zh 立即停止当前事件的传递，事件甚至不会被分派到所连接的当前目标。
   * @method stopPropagationImmediate
   */
  stopPropagationImmediate: function stopPropagationImmediate() {
    this._propagationImmediateStopped = true;
  },

  /**
   * !#en Checks whether the event has been stopped.
   * !#zh 检查该事件是否已经停止传递.
   * @method isStopped
   * @returns {Boolean}
   */
  isStopped: function isStopped() {
    return this._propagationStopped || this._propagationImmediateStopped;
  },

  /**
   * !#en
   * <p>
   *     Gets current target of the event                                                            <br/>
   *     note: It only be available when the event listener is associated with node.                <br/>
   *          It returns 0 when the listener is associated with fixed priority.
   * </p>
   * !#zh 获取当前目标节点
   * @method getCurrentTarget
   * @returns {Node}  The target with which the event associates.
   */
  getCurrentTarget: function getCurrentTarget() {
    return this.currentTarget;
  },

  /**
   * !#en Gets the event type.
   * !#zh 获取事件类型
   * @method getType
   * @returns {String}
   */
  getType: function getType() {
    return this.type;
  }
}; //event type

/**
 * !#en Code for event without type.
 * !#zh 没有类型的事件
 * @property NO_TYPE
 * @static
 * @type {string}
 */

cc.Event.NO_TYPE = 'no_type';
/**
 * !#en The type code of Touch event.
 * !#zh 触摸事件类型
 * @property TOUCH
 * @static
 * @type {String}
 */

cc.Event.TOUCH = 'touch';
/**
 * !#en The type code of Mouse event.
 * !#zh 鼠标事件类型
 * @property MOUSE
 * @static
 * @type {String}
 */

cc.Event.MOUSE = 'mouse';
/**
 * !#en The type code of Keyboard event.
 * !#zh 键盘事件类型
 * @property KEYBOARD
 * @static
 * @type {String}
 */

cc.Event.KEYBOARD = 'keyboard';
/**
 * !#en The type code of Acceleration event.
 * !#zh 加速器事件类型
 * @property ACCELERATION
 * @static
 * @type {String}
 */

cc.Event.ACCELERATION = 'acceleration'; //event phase

/**
 * !#en Events not currently dispatched are in this phase
 * !#zh 尚未派发事件阶段
 * @property NONE
 * @type {Number}
 * @static
 */

cc.Event.NONE = 0;
/**
 * !#en
 * The capturing phase comprises the journey from the root to the last node before the event target's node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 捕获阶段，包括事件目标节点之前从根节点到最后一个节点的过程。
 * @property CAPTURING_PHASE
 * @type {Number}
 * @static
 */

cc.Event.CAPTURING_PHASE = 1;
/**
 * !#en
 * The target phase comprises only the event target node
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 目标阶段仅包括事件目标节点。
 * @property AT_TARGET
 * @type {Number}
 * @static
 */

cc.Event.AT_TARGET = 2;
/**
 * !#en
 * The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the hierarchy
 * see http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 * !#zh 冒泡阶段， 包括回程遇到到层次根节点的任何后续节点。
 * @property BUBBLING_PHASE
 * @type {Number}
 * @static
 */

cc.Event.BUBBLING_PHASE = 3;
/**
 * !#en The Custom event
 * !#zh 自定义事件
 * @class Event.EventCustom
 *
 * @extends Event
 */

/**
 * @method constructor
 * @param {String} type - The name of the event (case-sensitive), e.g. "click", "fire", or "submit"
 * @param {Boolean} bubbles - A boolean indicating whether the event bubbles up through the tree or not
 */

var EventCustom = function EventCustom(type, bubbles) {
  cc.Event.call(this, type, bubbles);
  /**
   * !#en A reference to the detailed data of the event
   * !#zh 事件的详细数据
   * @property detail
   * @type {Object}
   */

  this.detail = null;
};

js.extend(EventCustom, cc.Event);
EventCustom.prototype.reset = EventCustom;
/**
 * !#en Sets user data
 * !#zh 设置用户数据
 * @method setUserData
 * @param {*} data
 */

EventCustom.prototype.setUserData = function (data) {
  this.detail = data;
};
/**
 * !#en Gets user data
 * !#zh 获取用户数据
 * @method getUserData
 * @returns {*}
 */


EventCustom.prototype.getUserData = function () {
  return this.detail;
};
/**
 * !#en Gets event name
 * !#zh 获取事件名称
 * @method getEventName
 * @returns {String}
 */


EventCustom.prototype.getEventName = cc.Event.prototype.getType;
var MAX_POOL_SIZE = 10;

var _eventPool = new js.Pool(MAX_POOL_SIZE);

EventCustom.put = function (event) {
  _eventPool.put(event);
};

EventCustom.get = function (type, bubbles) {
  var event = _eventPool._get();

  if (event) {
    event.reset(type, bubbles);
  } else {
    event = new EventCustom(type, bubbles);
  }

  return event;
};

cc.Event.EventCustom = EventCustom;
module.exports = cc.Event;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50L2V2ZW50LmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsImNjIiwiRXZlbnQiLCJ0eXBlIiwiYnViYmxlcyIsInRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJldmVudFBoYXNlIiwiX3Byb3BhZ2F0aW9uU3RvcHBlZCIsIl9wcm9wYWdhdGlvbkltbWVkaWF0ZVN0b3BwZWQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInVudXNlIiwiTk9fVFlQRSIsIk5PTkUiLCJyZXVzZSIsInN0b3BQcm9wYWdhdGlvbiIsInN0b3BQcm9wYWdhdGlvbkltbWVkaWF0ZSIsImlzU3RvcHBlZCIsImdldEN1cnJlbnRUYXJnZXQiLCJnZXRUeXBlIiwiVE9VQ0giLCJNT1VTRSIsIktFWUJPQVJEIiwiQUNDRUxFUkFUSU9OIiwiQ0FQVFVSSU5HX1BIQVNFIiwiQVRfVEFSR0VUIiwiQlVCQkxJTkdfUEhBU0UiLCJFdmVudEN1c3RvbSIsImNhbGwiLCJkZXRhaWwiLCJleHRlbmQiLCJyZXNldCIsInNldFVzZXJEYXRhIiwiZGF0YSIsImdldFVzZXJEYXRhIiwiZ2V0RXZlbnROYW1lIiwiTUFYX1BPT0xfU0laRSIsIl9ldmVudFBvb2wiLCJQb29sIiwicHV0IiwiZXZlbnQiLCJnZXQiLCJfZ2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCO0FBRUE7Ozs7OztBQU1BOzs7Ozs7O0FBS0FDLEVBQUUsQ0FBQ0MsS0FBSCxHQUFXLFVBQVNDLElBQVQsRUFBZUMsT0FBZixFQUF3QjtBQUMvQjs7Ozs7O0FBTUEsT0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBRUE7Ozs7Ozs7QUFNQSxPQUFLQyxPQUFMLEdBQWUsQ0FBQyxDQUFDQSxPQUFqQjtBQUVBOzs7Ozs7O0FB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QWdCekIsSUFBaEIsRUFBc0JDLE9BQXRCLENBQVI7QUFDSDs7QUFDRCxTQUFPcUMsS0FBUDtBQUNILENBVEQ7O0FBV0F4QyxFQUFFLENBQUNDLEtBQUgsQ0FBUzBCLFdBQVQsR0FBdUJBLFdBQXZCO0FBRUFnQixNQUFNLENBQUNDLE9BQVAsR0FBaUI1QyxFQUFFLENBQUNDLEtBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIganMgPSByZXF1aXJlKFwiLi4vcGxhdGZvcm0vanNcIik7XG5cbi8qKlxuICogISNlbiBCYXNlIGNsYXNzIG9mIGFsbCBraW5kcyBvZiBldmVudHMuXG4gKiAhI3poIOWMheWQq+S6i+S7tuebuOWFs+S/oeaBr+eahOWvueixoeOAglxuICogQGNsYXNzIEV2ZW50XG4gKi9cblxuLyoqXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCAoY2FzZS1zZW5zaXRpdmUpLCBlLmcuIFwiY2xpY2tcIiwgXCJmaXJlXCIsIG9yIFwic3VibWl0XCJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYnViYmxlcyAtIEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhyb3VnaCB0aGUgdHJlZSBvciBub3RcbiAqL1xuY2MuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBidWJibGVzKSB7XG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgKGNhc2Utc2Vuc2l0aXZlKSwgZS5nLiBcImNsaWNrXCIsIFwiZmlyZVwiLCBvciBcInN1Ym1pdFwiLlxuICAgICAqICEjemgg5LqL5Lu257G75Z6L44CCXG4gICAgICogQHByb3BlcnR5IHR5cGVcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEluZGljYXRlIHdoZXRoZXIgdGhlIGV2ZW50IGJ1YmJsZXMgdXAgdGhyb3VnaCB0aGUgdHJlZSBvciBub3QuXG4gICAgICogISN6aCDooajnpLror6Xkuovku7bmmK/lkKbov5vooYzlhpLms6HjgIJcbiAgICAgKiBAcHJvcGVydHkgYnViYmxlc1xuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuYnViYmxlcyA9ICEhYnViYmxlcztcblxuICAgIC8qKlxuICAgICAqICEjZW4gQSByZWZlcmVuY2UgdG8gdGhlIHRhcmdldCB0byB3aGljaCB0aGUgZXZlbnQgd2FzIG9yaWdpbmFsbHkgZGlzcGF0Y2hlZC5cbiAgICAgKiAhI3poIOacgOWIneS6i+S7tuinpuWPkeeahOebruagh1xuICAgICAqIEBwcm9wZXJ0eSB0YXJnZXRcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqICEjZW4gQSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSByZWdpc3RlcmVkIHRhcmdldCBmb3IgdGhlIGV2ZW50LlxuICAgICAqICEjemgg5b2T5YmN55uu5qCHXG4gICAgICogQHByb3BlcnR5IGN1cnJlbnRUYXJnZXRcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqL1xuICAgIHRoaXMuY3VycmVudFRhcmdldCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSW5kaWNhdGVzIHdoaWNoIHBoYXNlIG9mIHRoZSBldmVudCBmbG93IGlzIGN1cnJlbnRseSBiZWluZyBldmFsdWF0ZWQuXG4gICAgICogUmV0dXJucyBhbiBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IDQgY29uc3RhbnRzOlxuICAgICAqICAtIEV2ZW50Lk5PTkUgPSAwXG4gICAgICogIC0gRXZlbnQuQ0FQVFVSSU5HX1BIQVNFID0gMVxuICAgICAqICAtIEV2ZW50LkFUX1RBUkdFVCA9IDJcbiAgICAgKiAgLSBFdmVudC5CVUJCTElOR19QSEFTRSA9IDNcbiAgICAgKiBUaGUgcGhhc2VzIGFyZSBleHBsYWluZWQgaW4gdGhlIFtzZWN0aW9uIDMuMSwgRXZlbnQgZGlzcGF0Y2ggYW5kIERPTSBldmVudCBmbG93XVxuICAgICAqIChodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3cpLCBvZiB0aGUgRE9NIExldmVsIDMgRXZlbnRzIHNwZWNpZmljYXRpb24uXG4gICAgICogISN6aCDkuovku7bpmLbmrrVcbiAgICAgKiBAcHJvcGVydHkgZXZlbnRQaGFzZVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgdGhpcy5ldmVudFBoYXNlID0gMDtcblxuICAgIC8qXG4gICAgICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpIGhhcyBiZWVuIGNhbGxlZCBvbiB0aGUgZXZlbnQuXG4gICAgICogQHByb3BlcnR5IF9wcm9wYWdhdGlvblN0b3BwZWRcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3Byb3BhZ2F0aW9uU3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgZXZlbnQuc3RvcFByb3BhZ2F0aW9uSW1tZWRpYXRlKCkgaGFzIGJlZW4gY2FsbGVkIG9uIHRoZSBldmVudC5cbiAgICAgKiBAcHJvcGVydHkgX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZFxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gZmFsc2U7XG59O1xuY2MuRXZlbnQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBjYy5FdmVudCxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmVzZXQgdGhlIGV2ZW50IGZvciBiZWluZyBzdG9yZWQgaW4gdGhlIG9iamVjdCBwb29sLlxuICAgICAqICEjemgg6YeN572u5a+56LGh5rGg5Lit5a2Y5YKo55qE5LqL5Lu244CCXG4gICAgICogQG1ldGhvZCB1bnVzZVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgdW51c2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50eXBlID0gY2MuRXZlbnQuTk9fVFlQRTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgICAgICB0aGlzLmV2ZW50UGhhc2UgPSBjYy5FdmVudC5OT05FO1xuICAgICAgICB0aGlzLl9wcm9wYWdhdGlvblN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gUmV1c2UgdGhlIGV2ZW50IGZvciBiZWluZyB1c2VkIGFnYWluIGJ5IHRoZSBvYmplY3QgcG9vbC5cbiAgICAgKiAhI3poIOeUqOS6juWvueixoeaxoOWGjeasoeS9v+eUqOeahOS6i+S7tuOAglxuICAgICAqIEBtZXRob2QgcmV1c2VcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIHJldXNlOiBmdW5jdGlvbiAodHlwZSwgYnViYmxlcykge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmJ1YmJsZXMgPSBidWJibGVzIHx8IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFN0b3BzIHByb3BhZ2F0aW9uIGZvciBjdXJyZW50IGV2ZW50LlxuICAgICAqICEjemgg5YGc5q2i5Lyg6YCS5b2T5YmN5LqL5Lu244CCXG4gICAgICogQG1ldGhvZCBzdG9wUHJvcGFnYXRpb25cbiAgICAgKi9cbiAgICBzdG9wUHJvcGFnYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTdG9wcyBwcm9wYWdhdGlvbiBmb3IgY3VycmVudCBldmVudCBpbW1lZGlhdGVseSxcbiAgICAgKiB0aGUgZXZlbnQgd29uJ3QgZXZlbiBiZSBkaXNwYXRjaGVkIHRvIHRoZSBsaXN0ZW5lcnMgYXR0YWNoZWQgaW4gdGhlIGN1cnJlbnQgdGFyZ2V0LlxuICAgICAqICEjemgg56uL5Y2z5YGc5q2i5b2T5YmN5LqL5Lu255qE5Lyg6YCS77yM5LqL5Lu255Sa6Iez5LiN5Lya6KKr5YiG5rS+5Yiw5omA6L+e5o6l55qE5b2T5YmN55uu5qCH44CCXG4gICAgICogQG1ldGhvZCBzdG9wUHJvcGFnYXRpb25JbW1lZGlhdGVcbiAgICAgKi9cbiAgICBzdG9wUHJvcGFnYXRpb25JbW1lZGlhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgZXZlbnQgaGFzIGJlZW4gc3RvcHBlZC5cbiAgICAgKiAhI3poIOajgOafpeivpeS6i+S7tuaYr+WQpuW3sue7j+WBnOatouS8oOmAki5cbiAgICAgKiBAbWV0aG9kIGlzU3RvcHBlZFxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzU3RvcHBlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGFnYXRpb25TdG9wcGVkIHx8IHRoaXMuX3Byb3BhZ2F0aW9uSW1tZWRpYXRlU3RvcHBlZDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIDxwPlxuICAgICAqICAgICBHZXRzIGN1cnJlbnQgdGFyZ2V0IG9mIHRoZSBldmVudCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxici8+XG4gICAgICogICAgIG5vdGU6IEl0IG9ubHkgYmUgYXZhaWxhYmxlIHdoZW4gdGhlIGV2ZW50IGxpc3RlbmVyIGlzIGFzc29jaWF0ZWQgd2l0aCBub2RlLiAgICAgICAgICAgICAgICA8YnIvPlxuICAgICAqICAgICAgICAgIEl0IHJldHVybnMgMCB3aGVuIHRoZSBsaXN0ZW5lciBpcyBhc3NvY2lhdGVkIHdpdGggZml4ZWQgcHJpb3JpdHkuXG4gICAgICogPC9wPlxuICAgICAqICEjemgg6I635Y+W5b2T5YmN55uu5qCH6IqC54K5XG4gICAgICogQG1ldGhvZCBnZXRDdXJyZW50VGFyZ2V0XG4gICAgICogQHJldHVybnMge05vZGV9ICBUaGUgdGFyZ2V0IHdpdGggd2hpY2ggdGhlIGV2ZW50IGFzc29jaWF0ZXMuXG4gICAgICovXG4gICAgZ2V0Q3VycmVudFRhcmdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VGFyZ2V0O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldHMgdGhlIGV2ZW50IHR5cGUuXG4gICAgICogISN6aCDojrflj5bkuovku7bnsbvlnotcbiAgICAgKiBAbWV0aG9kIGdldFR5cGVcbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFR5cGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG59O1xuXG4vL2V2ZW50IHR5cGVcbi8qKlxuICogISNlbiBDb2RlIGZvciBldmVudCB3aXRob3V0IHR5cGUuXG4gKiAhI3poIOayoeacieexu+Wei+eahOS6i+S7tlxuICogQHByb3BlcnR5IE5PX1RZUEVcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmNjLkV2ZW50Lk5PX1RZUEUgPSAnbm9fdHlwZSc7XG5cbi8qKlxuICogISNlbiBUaGUgdHlwZSBjb2RlIG9mIFRvdWNoIGV2ZW50LlxuICogISN6aCDop6bmkbjkuovku7bnsbvlnotcbiAqIEBwcm9wZXJ0eSBUT1VDSFxuICogQHN0YXRpY1xuICogQHR5cGUge1N0cmluZ31cbiAqL1xuY2MuRXZlbnQuVE9VQ0ggPSAndG91Y2gnO1xuLyoqXG4gKiAhI2VuIFRoZSB0eXBlIGNvZGUgb2YgTW91c2UgZXZlbnQuXG4gKiAhI3poIOm8oOagh+S6i+S7tuexu+Wei1xuICogQHByb3BlcnR5IE1PVVNFXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5jYy5FdmVudC5NT1VTRSA9ICdtb3VzZSc7XG4vKipcbiAqICEjZW4gVGhlIHR5cGUgY29kZSBvZiBLZXlib2FyZCBldmVudC5cbiAqICEjemgg6ZSu55uY5LqL5Lu257G75Z6LXG4gKiBAcHJvcGVydHkgS0VZQk9BUkRcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbmNjLkV2ZW50LktFWUJPQVJEID0gJ2tleWJvYXJkJztcbi8qKlxuICogISNlbiBUaGUgdHlwZSBjb2RlIG9mIEFjY2VsZXJhdGlvbiBldmVudC5cbiAqICEjemgg5Yqg6YCf5Zmo5LqL5Lu257G75Z6LXG4gKiBAcHJvcGVydHkgQUNDRUxFUkFUSU9OXG4gKiBAc3RhdGljXG4gKiBAdHlwZSB7U3RyaW5nfVxuICovXG5jYy5FdmVudC5BQ0NFTEVSQVRJT04gPSAnYWNjZWxlcmF0aW9uJztcblxuLy9ldmVudCBwaGFzZVxuLyoqXG4gKiAhI2VuIEV2ZW50cyBub3QgY3VycmVudGx5IGRpc3BhdGNoZWQgYXJlIGluIHRoaXMgcGhhc2VcbiAqICEjemgg5bCa5pyq5rS+5Y+R5LqL5Lu26Zi25q61XG4gKiBAcHJvcGVydHkgTk9ORVxuICogQHR5cGUge051bWJlcn1cbiAqIEBzdGF0aWNcbiAqL1xuY2MuRXZlbnQuTk9ORSA9IDA7XG4vKipcbiAqICEjZW5cbiAqIFRoZSBjYXB0dXJpbmcgcGhhc2UgY29tcHJpc2VzIHRoZSBqb3VybmV5IGZyb20gdGhlIHJvb3QgdG8gdGhlIGxhc3Qgbm9kZSBiZWZvcmUgdGhlIGV2ZW50IHRhcmdldCdzIG5vZGVcbiAqIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3dcbiAqICEjemgg5o2V6I636Zi25q6177yM5YyF5ous5LqL5Lu255uu5qCH6IqC54K55LmL5YmN5LuO5qC56IqC54K55Yiw5pyA5ZCO5LiA5Liq6IqC54K555qE6L+H56iL44CCXG4gKiBAcHJvcGVydHkgQ0FQVFVSSU5HX1BIQVNFXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQHN0YXRpY1xuICovXG5jYy5FdmVudC5DQVBUVVJJTkdfUEhBU0UgPSAxO1xuLyoqXG4gKiAhI2VuXG4gKiBUaGUgdGFyZ2V0IHBoYXNlIGNvbXByaXNlcyBvbmx5IHRoZSBldmVudCB0YXJnZXQgbm9kZVxuICogc2VlIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtZmxvd1xuICogISN6aCDnm67moIfpmLbmrrXku4XljIXmi6zkuovku7bnm67moIfoioLngrnjgIJcbiAqIEBwcm9wZXJ0eSBBVF9UQVJHRVRcbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAc3RhdGljXG4gKi9cbmNjLkV2ZW50LkFUX1RBUkdFVCA9IDI7XG4vKipcbiAqICEjZW5cbiAqIFRoZSBidWJibGluZyBwaGFzZSBjb21wcmlzZXMgYW55IHN1YnNlcXVlbnQgbm9kZXMgZW5jb3VudGVyZWQgb24gdGhlIHJldHVybiB0cmlwIHRvIHRoZSByb290IG9mIHRoZSBoaWVyYXJjaHlcbiAqIHNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50LWZsb3dcbiAqICEjemgg5YaS5rOh6Zi25q6177yMIOWMheaLrOWbnueoi+mBh+WIsOWIsOWxguasoeagueiKgueCueeahOS7u+S9leWQjue7reiKgueCueOAglxuICogQHByb3BlcnR5IEJVQkJMSU5HX1BIQVNFXG4gKiBAdHlwZSB7TnVtYmVyfVxuICogQHN0YXRpY1xuICovXG5jYy5FdmVudC5CVUJCTElOR19QSEFTRSA9IDM7XG5cbi8qKlxuICogISNlbiBUaGUgQ3VzdG9tIGV2ZW50XG4gKiAhI3poIOiHquWumuS5ieS6i+S7tlxuICogQGNsYXNzIEV2ZW50LkV2ZW50Q3VzdG9tXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqL1xuXG4vKipcbiAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIG5hbWUgb2YgdGhlIGV2ZW50IChjYXNlLXNlbnNpdGl2ZSksIGUuZy4gXCJjbGlja1wiLCBcImZpcmVcIiwgb3IgXCJzdWJtaXRcIlxuICogQHBhcmFtIHtCb29sZWFufSBidWJibGVzIC0gQSBib29sZWFuIGluZGljYXRpbmcgd2hldGhlciB0aGUgZXZlbnQgYnViYmxlcyB1cCB0aHJvdWdoIHRoZSB0cmVlIG9yIG5vdFxuICovXG52YXIgRXZlbnRDdXN0b20gPSBmdW5jdGlvbiAodHlwZSwgYnViYmxlcykge1xuICAgIGNjLkV2ZW50LmNhbGwodGhpcywgdHlwZSwgYnViYmxlcyk7XG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEEgcmVmZXJlbmNlIHRvIHRoZSBkZXRhaWxlZCBkYXRhIG9mIHRoZSBldmVudFxuICAgICAqICEjemgg5LqL5Lu255qE6K+m57uG5pWw5o2uXG4gICAgICogQHByb3BlcnR5IGRldGFpbFxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICovXG4gICAgdGhpcy5kZXRhaWwgPSBudWxsO1xufTtcblxuanMuZXh0ZW5kKEV2ZW50Q3VzdG9tLCBjYy5FdmVudCk7XG5cbkV2ZW50Q3VzdG9tLnByb3RvdHlwZS5yZXNldCA9IEV2ZW50Q3VzdG9tO1xuXG4vKipcbiAqICEjZW4gU2V0cyB1c2VyIGRhdGFcbiAqICEjemgg6K6+572u55So5oi35pWw5o2uXG4gKiBAbWV0aG9kIHNldFVzZXJEYXRhXG4gKiBAcGFyYW0geyp9IGRhdGFcbiAqL1xuRXZlbnRDdXN0b20ucHJvdG90eXBlLnNldFVzZXJEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLmRldGFpbCA9IGRhdGE7XG59O1xuXG4vKipcbiAqICEjZW4gR2V0cyB1c2VyIGRhdGFcbiAqICEjemgg6I635Y+W55So5oi35pWw5o2uXG4gKiBAbWV0aG9kIGdldFVzZXJEYXRhXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRXZlbnRDdXN0b20ucHJvdG90eXBlLmdldFVzZXJEYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRldGFpbDtcbn07XG5cbi8qKlxuICogISNlbiBHZXRzIGV2ZW50IG5hbWVcbiAqICEjemgg6I635Y+W5LqL5Lu25ZCN56ewXG4gKiBAbWV0aG9kIGdldEV2ZW50TmFtZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuRXZlbnRDdXN0b20ucHJvdG90eXBlLmdldEV2ZW50TmFtZSA9IGNjLkV2ZW50LnByb3RvdHlwZS5nZXRUeXBlO1xuXG52YXIgTUFYX1BPT0xfU0laRSA9IDEwO1xudmFyIF9ldmVudFBvb2wgPSBuZXcganMuUG9vbChNQVhfUE9PTF9TSVpFKTtcbkV2ZW50Q3VzdG9tLnB1dCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIF9ldmVudFBvb2wucHV0KGV2ZW50KTtcbn07XG5FdmVudEN1c3RvbS5nZXQgPSBmdW5jdGlvbiAodHlwZSwgYnViYmxlcykge1xuICAgIHZhciBldmVudCA9IF9ldmVudFBvb2wuX2dldCgpO1xuICAgIGlmIChldmVudCkge1xuICAgICAgICBldmVudC5yZXNldCh0eXBlLCBidWJibGVzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50Q3VzdG9tKHR5cGUsIGJ1YmJsZXMpO1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnQ7XG59O1xuXG5jYy5FdmVudC5FdmVudEN1c3RvbSA9IEV2ZW50Q3VzdG9tO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkV2ZW50O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=