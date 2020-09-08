
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event-target.js';
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

var CallbacksInvoker = require('../platform/callbacks-invoker');

var fastRemove = js.array.fastRemove;
/**
 * !#en
 * EventTarget is an object to which an event is dispatched when something has occurred.
 * Entity are the most common event targets, but other objects can be event targets too.
 *
 * Event targets are an important part of the Fireball event model.
 * The event target serves as the focal point for how events flow through the scene graph.
 * When an event such as a mouse click or a keypress occurs, Fireball dispatches an event object
 * into the event flow from the root of the hierarchy. The event object then makes its way through
 * the scene graph until it reaches the event target, at which point it begins its return trip through
 * the scene graph. This round-trip journey to the event target is conceptually divided into three phases:
 * - The capture phase comprises the journey from the root to the last node before the event target's node
 * - The target phase comprises only the event target node
 * - The bubbling phase comprises any subsequent nodes encountered on the return trip to the root of the tree
 * See also: http://www.w3.org/TR/DOM-Level-3-Events/#event-flow
 *
 * Event targets can implement the following methods:
 *  - _getCapturingTargets
 *  - _getBubblingTargets
 *
 * !#zh
 * 事件目标是事件触发时，分派的事件对象，Node 是最常见的事件目标，
 * 但是其他对象也可以是事件目标。<br/>
 *
 * @class EventTarget
 * @extends CallbacksInvoker
 */

function EventTarget() {
  CallbacksInvoker.call(this);
}

js.extend(EventTarget, CallbacksInvoker);
var proto = EventTarget.prototype;
/**
 * !#en Checks whether the EventTarget object has any callback registered for a specific type of event.
 * !#zh 检查事件目标对象是否有为特定类型的事件注册的回调。
 * @method hasEventListener
 * @param {String} type - The type of event.
 * @return {Boolean} True if a callback of the specified type is registered; false otherwise.
 */

/**
 * !#en
 * Register an callback of a specific event type on the EventTarget.
 * This type of event should be triggered via `emit`.
 * !#zh
 * 注册事件目标的特定事件类型回调。这种类型的事件应该被 `emit` 触发。
 *
 * @method on
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {any} [callback.arg1] arg1
 * @param {any} [callback.arg2] arg2
 * @param {any} [callback.arg3] arg3
 * @param {any} [callback.arg4] arg4
 * @param {any} [callback.arg5] arg5
 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
 * @return {Function} - Just returns the incoming callback so you can save the anonymous function easier.
 * @typescript
 * on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T
 * @example
 * eventTarget.on('fire', function () {
 *     cc.log("fire in the hole");
 * }, node);
 */

proto.__on = proto.on;

proto.on = function (type, callback, target, once) {
  if (!callback) {
    cc.errorID(6800);
    return;
  }

  if (!this.hasEventListener(type, callback, target)) {
    this.__on(type, callback, target, once);

    if (target && target.__eventTargets) {
      target.__eventTargets.push(this);
    }
  }

  return callback;
};
/**
 * !#en
 * Removes the listeners previously registered with the same type, callback, target and or useCapture,
 * if only type is passed as parameter, all listeners registered with that type will be removed.
 * !#zh
 * 删除之前用同类型，回调，目标或 useCapture 注册的事件监听器，如果只传递 type，将会删除 type 类型的所有事件监听器。
 *
 * @method off
 * @param {String} type - A string representing the event type being removed.
 * @param {Function} [callback] - The callback to remove.
 * @param {Object} [target] - The target (this object) to invoke the callback, if it's not given, only callback without target will be removed
 * @example
 * // register fire eventListener
 * var callback = eventTarget.on('fire', function () {
 *     cc.log("fire in the hole");
 * }, target);
 * // remove fire event listener
 * eventTarget.off('fire', callback, target);
 * // remove all fire event listeners
 * eventTarget.off('fire');
 */


proto.__off = proto.off;

proto.off = function (type, callback, target) {
  if (!callback) {
    var list = this._callbackTable[type];
    if (!list) return;
    var infos = list.callbackInfos;

    for (var i = 0; i < infos.length; ++i) {
      var _target = infos[i] && infos[i].target;

      if (_target && _target.__eventTargets) {
        fastRemove(_target.__eventTargets, this);
      }
    }

    this.removeAll(type);
  } else {
    this.__off(type, callback, target);

    if (target && target.__eventTargets) {
      fastRemove(target.__eventTargets, this);
    }
  }
};
/**
 * !#en Removes all callbacks previously registered with the same target (passed as parameter).
 * This is not for removing all listeners in the current event target,
 * and this is not for removing all listeners the target parameter have registered.
 * It's only for removing all listeners (callback and target couple) registered on the current event target by the target parameter.
 * !#zh 在当前 EventTarget 上删除指定目标（target 参数）注册的所有事件监听器。
 * 这个函数无法删除当前 EventTarget 的所有事件监听器，也无法删除 target 参数所注册的所有事件监听器。
 * 这个函数只能删除 target 参数在当前 EventTarget 上注册的所有事件监听器。
 * @method targetOff
 * @param {Object} target - The target to be searched for all related listeners
 */


proto.targetOff = function (target) {
  this.removeAll(target);

  if (target && target.__eventTargets) {
    fastRemove(target.__eventTargets, this);
  }
};
/**
 * !#en
 * Register an callback of a specific event type on the EventTarget,
 * the callback will remove itself after the first time it is triggered.
 * !#zh
 * 注册事件目标的特定事件类型回调，回调会在第一时间被触发后删除自身。
 *
 * @method once
 * @param {String} type - A string representing the event type to listen for.
 * @param {Function} callback - The callback that will be invoked when the event is dispatched.
 *                              The callback is ignored if it is a duplicate (the callbacks are unique).
 * @param {any} [callback.arg1] arg1
 * @param {any} [callback.arg2] arg2
 * @param {any} [callback.arg3] arg3
 * @param {any} [callback.arg4] arg4
 * @param {any} [callback.arg5] arg5
 * @param {Object} [target] - The target (this object) to invoke the callback, can be null
 * @example
 * eventTarget.once('fire', function () {
 *     cc.log("this is the callback and will be invoked only once");
 * }, node);
 */


proto.once = function (type, callback, target) {
  this.on(type, callback, target, true);
};
/**
 * !#en
 * Send an event with the event object.
 * !#zh
 * 通过事件对象派发事件
 *
 * @method dispatchEvent
 * @param {Event} event
 */


proto.dispatchEvent = function (event) {
  this.emit(event.type, event);
};

cc.EventTarget = module.exports = EventTarget;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50L2V2ZW50LXRhcmdldC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJDYWxsYmFja3NJbnZva2VyIiwiZmFzdFJlbW92ZSIsImFycmF5IiwiRXZlbnRUYXJnZXQiLCJjYWxsIiwiZXh0ZW5kIiwicHJvdG8iLCJwcm90b3R5cGUiLCJfX29uIiwib24iLCJ0eXBlIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwiY2MiLCJlcnJvcklEIiwiaGFzRXZlbnRMaXN0ZW5lciIsIl9fZXZlbnRUYXJnZXRzIiwicHVzaCIsIl9fb2ZmIiwib2ZmIiwibGlzdCIsIl9jYWxsYmFja1RhYmxlIiwiaW5mb3MiLCJjYWxsYmFja0luZm9zIiwiaSIsImxlbmd0aCIsInJlbW92ZUFsbCIsInRhcmdldE9mZiIsImRpc3BhdGNoRXZlbnQiLCJldmVudCIsImVtaXQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsZ0JBQUQsQ0FBbEI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUdELE9BQU8sQ0FBQywrQkFBRCxDQUFoQzs7QUFFQSxJQUFJRSxVQUFVLEdBQUdILEVBQUUsQ0FBQ0ksS0FBSCxDQUFTRCxVQUExQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLFNBQVNFLFdBQVQsR0FBd0I7QUFDcEJILEVBQUFBLGdCQUFnQixDQUFDSSxJQUFqQixDQUFzQixJQUF0QjtBQUNIOztBQUNETixFQUFFLENBQUNPLE1BQUgsQ0FBVUYsV0FBVixFQUF1QkgsZ0JBQXZCO0FBRUEsSUFBSU0sS0FBSyxHQUFHSCxXQUFXLENBQUNJLFNBQXhCO0FBRUE7Ozs7Ozs7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBRCxLQUFLLENBQUNFLElBQU4sR0FBYUYs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QU0sQ0FBQ0MsT0FBUCxHQUFpQjlCLFdBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCBDYWxsYmFja3NJbnZva2VyID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vY2FsbGJhY2tzLWludm9rZXInKTtcblxudmFyIGZhc3RSZW1vdmUgPSBqcy5hcnJheS5mYXN0UmVtb3ZlO1xuXG4vKipcbiAqICEjZW5cbiAqIEV2ZW50VGFyZ2V0IGlzIGFuIG9iamVjdCB0byB3aGljaCBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHdoZW4gc29tZXRoaW5nIGhhcyBvY2N1cnJlZC5cbiAqIEVudGl0eSBhcmUgdGhlIG1vc3QgY29tbW9uIGV2ZW50IHRhcmdldHMsIGJ1dCBvdGhlciBvYmplY3RzIGNhbiBiZSBldmVudCB0YXJnZXRzIHRvby5cbiAqXG4gKiBFdmVudCB0YXJnZXRzIGFyZSBhbiBpbXBvcnRhbnQgcGFydCBvZiB0aGUgRmlyZWJhbGwgZXZlbnQgbW9kZWwuXG4gKiBUaGUgZXZlbnQgdGFyZ2V0IHNlcnZlcyBhcyB0aGUgZm9jYWwgcG9pbnQgZm9yIGhvdyBldmVudHMgZmxvdyB0aHJvdWdoIHRoZSBzY2VuZSBncmFwaC5cbiAqIFdoZW4gYW4gZXZlbnQgc3VjaCBhcyBhIG1vdXNlIGNsaWNrIG9yIGEga2V5cHJlc3Mgb2NjdXJzLCBGaXJlYmFsbCBkaXNwYXRjaGVzIGFuIGV2ZW50IG9iamVjdFxuICogaW50byB0aGUgZXZlbnQgZmxvdyBmcm9tIHRoZSByb290IG9mIHRoZSBoaWVyYXJjaHkuIFRoZSBldmVudCBvYmplY3QgdGhlbiBtYWtlcyBpdHMgd2F5IHRocm91Z2hcbiAqIHRoZSBzY2VuZSBncmFwaCB1bnRpbCBpdCByZWFjaGVzIHRoZSBldmVudCB0YXJnZXQsIGF0IHdoaWNoIHBvaW50IGl0IGJlZ2lucyBpdHMgcmV0dXJuIHRyaXAgdGhyb3VnaFxuICogdGhlIHNjZW5lIGdyYXBoLiBUaGlzIHJvdW5kLXRyaXAgam91cm5leSB0byB0aGUgZXZlbnQgdGFyZ2V0IGlzIGNvbmNlcHR1YWxseSBkaXZpZGVkIGludG8gdGhyZWUgcGhhc2VzOlxuICogLSBUaGUgY2FwdHVyZSBwaGFzZSBjb21wcmlzZXMgdGhlIGpvdXJuZXkgZnJvbSB0aGUgcm9vdCB0byB0aGUgbGFzdCBub2RlIGJlZm9yZSB0aGUgZXZlbnQgdGFyZ2V0J3Mgbm9kZVxuICogLSBUaGUgdGFyZ2V0IHBoYXNlIGNvbXByaXNlcyBvbmx5IHRoZSBldmVudCB0YXJnZXQgbm9kZVxuICogLSBUaGUgYnViYmxpbmcgcGhhc2UgY29tcHJpc2VzIGFueSBzdWJzZXF1ZW50IG5vZGVzIGVuY291bnRlcmVkIG9uIHRoZSByZXR1cm4gdHJpcCB0byB0aGUgcm9vdCBvZiB0aGUgdHJlZVxuICogU2VlIGFsc286IGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnQtZmxvd1xuICpcbiAqIEV2ZW50IHRhcmdldHMgY2FuIGltcGxlbWVudCB0aGUgZm9sbG93aW5nIG1ldGhvZHM6XG4gKiAgLSBfZ2V0Q2FwdHVyaW5nVGFyZ2V0c1xuICogIC0gX2dldEJ1YmJsaW5nVGFyZ2V0c1xuICpcbiAqICEjemhcbiAqIOS6i+S7tuebruagh+aYr+S6i+S7tuinpuWPkeaXtu+8jOWIhua0vueahOS6i+S7tuWvueixoe+8jE5vZGUg5piv5pyA5bi46KeB55qE5LqL5Lu255uu5qCH77yMXG4gKiDkvYbmmK/lhbbku5blr7nosaHkuZ/lj6/ku6XmmK/kuovku7bnm67moIfjgII8YnIvPlxuICpcbiAqIEBjbGFzcyBFdmVudFRhcmdldFxuICogQGV4dGVuZHMgQ2FsbGJhY2tzSW52b2tlclxuICovXG5mdW5jdGlvbiBFdmVudFRhcmdldCAoKSB7XG4gICAgQ2FsbGJhY2tzSW52b2tlci5jYWxsKHRoaXMpO1xufVxuanMuZXh0ZW5kKEV2ZW50VGFyZ2V0LCBDYWxsYmFja3NJbnZva2VyKTtcblxudmFyIHByb3RvID0gRXZlbnRUYXJnZXQucHJvdG90eXBlO1xuXG4vKipcbiAqICEjZW4gQ2hlY2tzIHdoZXRoZXIgdGhlIEV2ZW50VGFyZ2V0IG9iamVjdCBoYXMgYW55IGNhbGxiYWNrIHJlZ2lzdGVyZWQgZm9yIGEgc3BlY2lmaWMgdHlwZSBvZiBldmVudC5cbiAqICEjemgg5qOA5p+l5LqL5Lu255uu5qCH5a+56LGh5piv5ZCm5pyJ5Li654m55a6a57G75Z6L55qE5LqL5Lu25rOo5YaM55qE5Zue6LCD44CCXG4gKiBAbWV0aG9kIGhhc0V2ZW50TGlzdGVuZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIGEgY2FsbGJhY2sgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGlzIHJlZ2lzdGVyZWQ7IGZhbHNlIG90aGVyd2lzZS5cbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgRXZlbnRUYXJnZXQuXG4gKiBUaGlzIHR5cGUgb2YgZXZlbnQgc2hvdWxkIGJlIHRyaWdnZXJlZCB2aWEgYGVtaXRgLlxuICogISN6aFxuICog5rOo5YaM5LqL5Lu255uu5qCH55qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD44CC6L+Z56eN57G75Z6L55qE5LqL5Lu25bqU6K+l6KKrIGBlbWl0YCDop6blj5HjgIJcbiAqXG4gKiBAbWV0aG9kIG9uXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzFdIGFyZzFcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMl0gYXJnMlxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNV0gYXJnNVxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gLSBKdXN0IHJldHVybnMgdGhlIGluY29taW5nIGNhbGxiYWNrIHNvIHlvdSBjYW4gc2F2ZSB0aGUgYW5vbnltb3VzIGZ1bmN0aW9uIGVhc2llci5cbiAqIEB0eXBlc2NyaXB0XG4gKiBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IFQsIHRhcmdldD86IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4pOiBUXG4gKiBAZXhhbXBsZVxuICogZXZlbnRUYXJnZXQub24oJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XG4gKiAgICAgY2MubG9nKFwiZmlyZSBpbiB0aGUgaG9sZVwiKTtcbiAqIH0sIG5vZGUpO1xuICovXG5wcm90by5fX29uID0gcHJvdG8ub247XG5wcm90by5vbiA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICBjYy5lcnJvcklEKDY4MDApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCAhdGhpcy5oYXNFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpICkge1xuICAgICAgICB0aGlzLl9fb24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgb25jZSk7XG5cbiAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcbiAgICAgICAgICAgIHRhcmdldC5fX2V2ZW50VGFyZ2V0cy5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYWxsYmFjaztcbn07XG5cbi8qKlxuICogISNlblxuICogUmVtb3ZlcyB0aGUgbGlzdGVuZXJzIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzYW1lIHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQgYW5kIG9yIHVzZUNhcHR1cmUsXG4gKiBpZiBvbmx5IHR5cGUgaXMgcGFzc2VkIGFzIHBhcmFtZXRlciwgYWxsIGxpc3RlbmVycyByZWdpc3RlcmVkIHdpdGggdGhhdCB0eXBlIHdpbGwgYmUgcmVtb3ZlZC5cbiAqICEjemhcbiAqIOWIoOmZpOS5i+WJjeeUqOWQjOexu+Wei++8jOWbnuiwg++8jOebruagh+aIliB1c2VDYXB0dXJlIOazqOWGjOeahOS6i+S7tuebkeWQrOWZqO+8jOWmguaenOWPquS8oOmAkiB0eXBl77yM5bCG5Lya5Yig6ZmkIHR5cGUg57G75Z6L55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo44CCXG4gKlxuICogQG1ldGhvZCBvZmZcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIGJlaW5nIHJlbW92ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIC0gVGhlIGNhbGxiYWNrIHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBpZiBpdCdzIG5vdCBnaXZlbiwgb25seSBjYWxsYmFjayB3aXRob3V0IHRhcmdldCB3aWxsIGJlIHJlbW92ZWRcbiAqIEBleGFtcGxlXG4gKiAvLyByZWdpc3RlciBmaXJlIGV2ZW50TGlzdGVuZXJcbiAqIHZhciBjYWxsYmFjayA9IGV2ZW50VGFyZ2V0Lm9uKCdmaXJlJywgZnVuY3Rpb24gKCkge1xuICogICAgIGNjLmxvZyhcImZpcmUgaW4gdGhlIGhvbGVcIik7XG4gKiB9LCB0YXJnZXQpO1xuICogLy8gcmVtb3ZlIGZpcmUgZXZlbnQgbGlzdGVuZXJcbiAqIGV2ZW50VGFyZ2V0Lm9mZignZmlyZScsIGNhbGxiYWNrLCB0YXJnZXQpO1xuICogLy8gcmVtb3ZlIGFsbCBmaXJlIGV2ZW50IGxpc3RlbmVyc1xuICogZXZlbnRUYXJnZXQub2ZmKCdmaXJlJyk7XG4gKi9cbnByb3RvLl9fb2ZmID0gcHJvdG8ub2ZmO1xucHJvdG8ub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVt0eXBlXTtcbiAgICAgICAgaWYgKCFsaXN0KSByZXR1cm47XG4gICAgICAgIGxldCBpbmZvcyA9IGxpc3QuY2FsbGJhY2tJbmZvcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGluZm9zW2ldICYmIGluZm9zW2ldLnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XG4gICAgICAgICAgICAgICAgZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsKHR5cGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fX29mZih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcblxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI2VuIFJlbW92ZXMgYWxsIGNhbGxiYWNrcyBwcmV2aW91c2x5IHJlZ2lzdGVyZWQgd2l0aCB0aGUgc2FtZSB0YXJnZXQgKHBhc3NlZCBhcyBwYXJhbWV0ZXIpLlxuICogVGhpcyBpcyBub3QgZm9yIHJlbW92aW5nIGFsbCBsaXN0ZW5lcnMgaW4gdGhlIGN1cnJlbnQgZXZlbnQgdGFyZ2V0LFxuICogYW5kIHRoaXMgaXMgbm90IGZvciByZW1vdmluZyBhbGwgbGlzdGVuZXJzIHRoZSB0YXJnZXQgcGFyYW1ldGVyIGhhdmUgcmVnaXN0ZXJlZC5cbiAqIEl0J3Mgb25seSBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycyAoY2FsbGJhY2sgYW5kIHRhcmdldCBjb3VwbGUpIHJlZ2lzdGVyZWQgb24gdGhlIGN1cnJlbnQgZXZlbnQgdGFyZ2V0IGJ5IHRoZSB0YXJnZXQgcGFyYW1ldGVyLlxuICogISN6aCDlnKjlvZPliY0gRXZlbnRUYXJnZXQg5LiK5Yig6Zmk5oyH5a6a55uu5qCH77yIdGFyZ2V0IOWPguaVsO+8ieazqOWGjOeahOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxuICog6L+Z5Liq5Ye95pWw5peg5rOV5Yig6Zmk5b2T5YmNIEV2ZW50VGFyZ2V0IOeahOaJgOacieS6i+S7tuebkeWQrOWZqO+8jOS5n+aXoOazleWIoOmZpCB0YXJnZXQg5Y+C5pWw5omA5rOo5YaM55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo44CCXG4gKiDov5nkuKrlh73mlbDlj6rog73liKDpmaQgdGFyZ2V0IOWPguaVsOWcqOW9k+WJjSBFdmVudFRhcmdldCDkuIrms6jlhoznmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcbiAqIEBtZXRob2QgdGFyZ2V0T2ZmXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBiZSBzZWFyY2hlZCBmb3IgYWxsIHJlbGF0ZWQgbGlzdGVuZXJzXG4gKi9cbnByb3RvLnRhcmdldE9mZiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0aGlzLnJlbW92ZUFsbCh0YXJnZXQpO1xuICAgIFxuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XG4gICAgICAgIGZhc3RSZW1vdmUodGFyZ2V0Ll9fZXZlbnRUYXJnZXRzLCB0aGlzKTtcbiAgICB9XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFJlZ2lzdGVyIGFuIGNhbGxiYWNrIG9mIGEgc3BlY2lmaWMgZXZlbnQgdHlwZSBvbiB0aGUgRXZlbnRUYXJnZXQsXG4gKiB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIGFmdGVyIHRoZSBmaXJzdCB0aW1lIGl0IGlzIHRyaWdnZXJlZC5cbiAqICEjemhcbiAqIOazqOWGjOS6i+S7tuebruagh+eahOeJueWumuS6i+S7tuexu+Wei+Wbnuiwg++8jOWbnuiwg+S8muWcqOesrOS4gOaXtumXtOiiq+inpuWPkeWQjuWIoOmZpOiHqui6q+OAglxuICpcbiAqIEBtZXRob2Qgb25jZVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW4gdGhlIGV2ZW50IGlzIGRpc3BhdGNoZWQuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBjYWxsYmFjayBpcyBpZ25vcmVkIGlmIGl0IGlzIGEgZHVwbGljYXRlICh0aGUgY2FsbGJhY2tzIGFyZSB1bmlxdWUpLlxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcxXSBhcmcxXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzJdIGFyZzJcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnM10gYXJnM1xuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc0XSBhcmc0XG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzVdIGFyZzVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XSAtIFRoZSB0YXJnZXQgKHRoaXMgb2JqZWN0KSB0byBpbnZva2UgdGhlIGNhbGxiYWNrLCBjYW4gYmUgbnVsbFxuICogQGV4YW1wbGVcbiAqIGV2ZW50VGFyZ2V0Lm9uY2UoJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XG4gKiAgICAgY2MubG9nKFwidGhpcyBpcyB0aGUgY2FsbGJhY2sgYW5kIHdpbGwgYmUgaW52b2tlZCBvbmx5IG9uY2VcIik7XG4gKiB9LCBub2RlKTtcbiAqL1xucHJvdG8ub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgdGhpcy5vbih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogISNlblxuICogU2VuZCBhbiBldmVudCB3aXRoIHRoZSBldmVudCBvYmplY3QuXG4gKiAhI3poXG4gKiDpgJrov4fkuovku7blr7nosaHmtL7lj5Hkuovku7ZcbiAqXG4gKiBAbWV0aG9kIGRpc3BhdGNoRXZlbnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKi9cbnByb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aGlzLmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xufTtcblxuY2MuRXZlbnRUYXJnZXQgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50VGFyZ2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=