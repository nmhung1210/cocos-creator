
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
/**
 * !#en
 * Destroy all callbackInfos.
 * !#zh
 * 销毁记录的事件
 *
 * @method clear
 */


proto.clear = function () {
  // remove all callback
  for (var key in this._callbackTable) {
    var list = this._callbackTable[key];
    var infos = list.callbackInfos;

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];
      this.off(key, info.callback, info.target);
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50L2V2ZW50LXRhcmdldC5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJDYWxsYmFja3NJbnZva2VyIiwiZmFzdFJlbW92ZSIsImFycmF5IiwiRXZlbnRUYXJnZXQiLCJjYWxsIiwiZXh0ZW5kIiwicHJvdG8iLCJwcm90b3R5cGUiLCJfX29uIiwib24iLCJ0eXBlIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJvbmNlIiwiY2MiLCJlcnJvcklEIiwiaGFzRXZlbnRMaXN0ZW5lciIsIl9fZXZlbnRUYXJnZXRzIiwicHVzaCIsIl9fb2ZmIiwib2ZmIiwibGlzdCIsIl9jYWxsYmFja1RhYmxlIiwiaW5mb3MiLCJjYWxsYmFja0luZm9zIiwiaSIsImxlbmd0aCIsInJlbW92ZUFsbCIsInRhcmdldE9mZiIsImRpc3BhdGNoRXZlbnQiLCJldmVudCIsImVtaXQiLCJjbGVhciIsImtleSIsImxlbiIsImluZm8iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCRCxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFDQSxJQUFNQyxnQkFBZ0IsR0FBR0QsT0FBTyxDQUFDLCtCQUFELENBQWhDOztBQUVBLElBQUlFLFVBQVUsR0FBR0gsRUFBRSxDQUFDSSxLQUFILENBQVNELFVBQTFCO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsU0FBU0UsV0FBVCxHQUF3QjtBQUNwQkgsRUFBQUEsZ0JBQWdCLENBQUNJLElBQWpCLENBQXNCLElBQXRCO0FBQ0g7O0FBQ0ROLEVBQUUsQ0FBQ08sTUFBSCxDQUFVRixXQUFWLEVBQXVCSCxnQkFBdkI7QUFFQSxJQUFJTSxLQUFLLEdBQUdILFdBQVcsQ0FBQ0ksU0FBeEI7QUFFQTs7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkFE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Ozs7QUFRQXhCLEtBQUssQ0FBQzBCLEtBQU4sR0FBYyxZQUFZO0FBQ3RCO0FBQ0EsT0FBSyxJQUFNQyxHQUFYLElBQWtCLEtBQUtYLGNBQXZCLEVBQXVDO0FBQ25DLFFBQU1ELElBQUksR0FBRyxLQUFLQyxjQUFMLENBQW9CVyxHQUFwQixDQUFiO0FBQ0EsUUFBTVYsS0FBSyxHQUFHRixJQUFJLENBQUNHLGFBQW5COztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQVIsRUFBV1MsR0FBRyxHQUFHWCxLQUFLLENBQUNHLE1BQTVCLEVBQW9DRCxDQUFDLEdBQUdTLEdBQXhDLEVBQTZDLEVBQUVULENBQS9DLEVBQWtEO0FBQzlDLFVBQU1VLElBQUksR0FBR1osS0FBSyxDQUFDRSxDQUFELENBQWxCO0FBQ0EsV0FBS0wsR0FBTCxDQUFTYSxHQUFULEVBQWNFLElBQUksQ0FBQ3hCLFFBQW5CLEVBQTZCd0IsSUFBSSxDQUFDdkIsTUFBbEM7QUFDSDtBQUNKO0FBQ0osQ0FWRDs7QUFZQUUsRUFBRSxDQUFDWCxXQUFILEdBQWlCaUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEMsV0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyLvu78vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IGpzID0gcmVxdWlyZSgnLi4vcGxhdGZvcm0vanMnKTtcbmNvbnN0IENhbGxiYWNrc0ludm9rZXIgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9jYWxsYmFja3MtaW52b2tlcicpO1xuXG52YXIgZmFzdFJlbW92ZSA9IGpzLmFycmF5LmZhc3RSZW1vdmU7XG5cbi8qKlxuICogISNlblxuICogRXZlbnRUYXJnZXQgaXMgYW4gb2JqZWN0IHRvIHdoaWNoIGFuIGV2ZW50IGlzIGRpc3BhdGNoZWQgd2hlbiBzb21ldGhpbmcgaGFzIG9jY3VycmVkLlxuICogRW50aXR5IGFyZSB0aGUgbW9zdCBjb21tb24gZXZlbnQgdGFyZ2V0cywgYnV0IG90aGVyIG9iamVjdHMgY2FuIGJlIGV2ZW50IHRhcmdldHMgdG9vLlxuICpcbiAqIEV2ZW50IHRhcmdldHMgYXJlIGFuIGltcG9ydGFudCBwYXJ0IG9mIHRoZSBGaXJlYmFsbCBldmVudCBtb2RlbC5cbiAqIFRoZSBldmVudCB0YXJnZXQgc2VydmVzIGFzIHRoZSBmb2NhbCBwb2ludCBmb3IgaG93IGV2ZW50cyBmbG93IHRocm91Z2ggdGhlIHNjZW5lIGdyYXBoLlxuICogV2hlbiBhbiBldmVudCBzdWNoIGFzIGEgbW91c2UgY2xpY2sgb3IgYSBrZXlwcmVzcyBvY2N1cnMsIEZpcmViYWxsIGRpc3BhdGNoZXMgYW4gZXZlbnQgb2JqZWN0XG4gKiBpbnRvIHRoZSBldmVudCBmbG93IGZyb20gdGhlIHJvb3Qgb2YgdGhlIGhpZXJhcmNoeS4gVGhlIGV2ZW50IG9iamVjdCB0aGVuIG1ha2VzIGl0cyB3YXkgdGhyb3VnaFxuICogdGhlIHNjZW5lIGdyYXBoIHVudGlsIGl0IHJlYWNoZXMgdGhlIGV2ZW50IHRhcmdldCwgYXQgd2hpY2ggcG9pbnQgaXQgYmVnaW5zIGl0cyByZXR1cm4gdHJpcCB0aHJvdWdoXG4gKiB0aGUgc2NlbmUgZ3JhcGguIFRoaXMgcm91bmQtdHJpcCBqb3VybmV5IHRvIHRoZSBldmVudCB0YXJnZXQgaXMgY29uY2VwdHVhbGx5IGRpdmlkZWQgaW50byB0aHJlZSBwaGFzZXM6XG4gKiAtIFRoZSBjYXB0dXJlIHBoYXNlIGNvbXByaXNlcyB0aGUgam91cm5leSBmcm9tIHRoZSByb290IHRvIHRoZSBsYXN0IG5vZGUgYmVmb3JlIHRoZSBldmVudCB0YXJnZXQncyBub2RlXG4gKiAtIFRoZSB0YXJnZXQgcGhhc2UgY29tcHJpc2VzIG9ubHkgdGhlIGV2ZW50IHRhcmdldCBub2RlXG4gKiAtIFRoZSBidWJibGluZyBwaGFzZSBjb21wcmlzZXMgYW55IHN1YnNlcXVlbnQgbm9kZXMgZW5jb3VudGVyZWQgb24gdGhlIHJldHVybiB0cmlwIHRvIHRoZSByb290IG9mIHRoZSB0cmVlXG4gKiBTZWUgYWxzbzogaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTMtRXZlbnRzLyNldmVudC1mbG93XG4gKlxuICogRXZlbnQgdGFyZ2V0cyBjYW4gaW1wbGVtZW50IHRoZSBmb2xsb3dpbmcgbWV0aG9kczpcbiAqICAtIF9nZXRDYXB0dXJpbmdUYXJnZXRzXG4gKiAgLSBfZ2V0QnViYmxpbmdUYXJnZXRzXG4gKlxuICogISN6aFxuICog5LqL5Lu255uu5qCH5piv5LqL5Lu26Kem5Y+R5pe277yM5YiG5rS+55qE5LqL5Lu25a+56LGh77yMTm9kZSDmmK/mnIDluLjop4HnmoTkuovku7bnm67moIfvvIxcbiAqIOS9huaYr+WFtuS7luWvueixoeS5n+WPr+S7peaYr+S6i+S7tuebruagh+OAgjxici8+XG4gKlxuICogQGNsYXNzIEV2ZW50VGFyZ2V0XG4gKiBAZXh0ZW5kcyBDYWxsYmFja3NJbnZva2VyXG4gKi9cbmZ1bmN0aW9uIEV2ZW50VGFyZ2V0ICgpIHtcbiAgICBDYWxsYmFja3NJbnZva2VyLmNhbGwodGhpcyk7XG59XG5qcy5leHRlbmQoRXZlbnRUYXJnZXQsIENhbGxiYWNrc0ludm9rZXIpO1xuXG52YXIgcHJvdG8gPSBFdmVudFRhcmdldC5wcm90b3R5cGU7XG5cbi8qKlxuICogISNlbiBDaGVja3Mgd2hldGhlciB0aGUgRXZlbnRUYXJnZXQgb2JqZWN0IGhhcyBhbnkgY2FsbGJhY2sgcmVnaXN0ZXJlZCBmb3IgYSBzcGVjaWZpYyB0eXBlIG9mIGV2ZW50LlxuICogISN6aCDmo4Dmn6Xkuovku7bnm67moIflr7nosaHmmK/lkKbmnInkuLrnibnlrprnsbvlnovnmoTkuovku7bms6jlhoznmoTlm57osIPjgIJcbiAqIEBtZXRob2QgaGFzRXZlbnRMaXN0ZW5lclxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBldmVudC5cbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgYSBjYWxsYmFjayBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgaXMgcmVnaXN0ZXJlZDsgZmFsc2Ugb3RoZXJ3aXNlLlxuICovXG5cbi8qKlxuICogISNlblxuICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldC5cbiAqIFRoaXMgdHlwZSBvZiBldmVudCBzaG91bGQgYmUgdHJpZ2dlcmVkIHZpYSBgZW1pdGAuXG4gKiAhI3poXG4gKiDms6jlhozkuovku7bnm67moIfnmoTnibnlrprkuovku7bnsbvlnovlm57osIPjgILov5nnp43nsbvlnovnmoTkuovku7blupTor6XooqsgYGVtaXRgIOinpuWPkeOAglxuICpcbiAqIEBtZXRob2Qgb25cbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBpcyBkaXNwYXRjaGVkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgaXMgaWdub3JlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZSAodGhlIGNhbGxiYWNrcyBhcmUgdW5pcXVlKS5cbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMV0gYXJnMVxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmcyXSBhcmcyXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzNdIGFyZzNcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNF0gYXJnNFxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmc1XSBhcmc1XG4gKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF0gLSBUaGUgdGFyZ2V0ICh0aGlzIG9iamVjdCkgdG8gaW52b2tlIHRoZSBjYWxsYmFjaywgY2FuIGJlIG51bGxcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSAtIEp1c3QgcmV0dXJucyB0aGUgaW5jb21pbmcgY2FsbGJhY2sgc28geW91IGNhbiBzYXZlIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24gZWFzaWVyLlxuICogQHR5cGVzY3JpcHRcbiAqIG9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbik6IFRcbiAqIEBleGFtcGxlXG4gKiBldmVudFRhcmdldC5vbignZmlyZScsIGZ1bmN0aW9uICgpIHtcbiAqICAgICBjYy5sb2coXCJmaXJlIGluIHRoZSBob2xlXCIpO1xuICogfSwgbm9kZSk7XG4gKi9cbnByb3RvLl9fb24gPSBwcm90by5vbjtcbnByb3RvLm9uID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIG9uY2UpIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgIGNjLmVycm9ySUQoNjgwMCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoICF0aGlzLmhhc0V2ZW50TGlzdGVuZXIodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkgKSB7XG4gICAgICAgIHRoaXMuX19vbih0eXBlLCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcblxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX2V2ZW50VGFyZ2V0cykge1xuICAgICAgICAgICAgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNhbGxiYWNrO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBSZW1vdmVzIHRoZSBsaXN0ZW5lcnMgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggdGhlIHNhbWUgdHlwZSwgY2FsbGJhY2ssIHRhcmdldCBhbmQgb3IgdXNlQ2FwdHVyZSxcbiAqIGlmIG9ubHkgdHlwZSBpcyBwYXNzZWQgYXMgcGFyYW1ldGVyLCBhbGwgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgd2l0aCB0aGF0IHR5cGUgd2lsbCBiZSByZW1vdmVkLlxuICogISN6aFxuICog5Yig6Zmk5LmL5YmN55So5ZCM57G75Z6L77yM5Zue6LCD77yM55uu5qCH5oiWIHVzZUNhcHR1cmUg5rOo5YaM55qE5LqL5Lu255uR5ZCs5Zmo77yM5aaC5p6c5Y+q5Lyg6YCSIHR5cGXvvIzlsIbkvJrliKDpmaQgdHlwZSDnsbvlnovnmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcbiAqXG4gKiBAbWV0aG9kIG9mZlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgYmVpbmcgcmVtb3ZlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gLSBUaGUgY2FsbGJhY2sgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGlmIGl0J3Mgbm90IGdpdmVuLCBvbmx5IGNhbGxiYWNrIHdpdGhvdXQgdGFyZ2V0IHdpbGwgYmUgcmVtb3ZlZFxuICogQGV4YW1wbGVcbiAqIC8vIHJlZ2lzdGVyIGZpcmUgZXZlbnRMaXN0ZW5lclxuICogdmFyIGNhbGxiYWNrID0gZXZlbnRUYXJnZXQub24oJ2ZpcmUnLCBmdW5jdGlvbiAoKSB7XG4gKiAgICAgY2MubG9nKFwiZmlyZSBpbiB0aGUgaG9sZVwiKTtcbiAqIH0sIHRhcmdldCk7XG4gKiAvLyByZW1vdmUgZmlyZSBldmVudCBsaXN0ZW5lclxuICogZXZlbnRUYXJnZXQub2ZmKCdmaXJlJywgY2FsbGJhY2ssIHRhcmdldCk7XG4gKiAvLyByZW1vdmUgYWxsIGZpcmUgZXZlbnQgbGlzdGVuZXJzXG4gKiBldmVudFRhcmdldC5vZmYoJ2ZpcmUnKTtcbiAqL1xucHJvdG8uX19vZmYgPSBwcm90by5vZmY7XG5wcm90by5vZmYgPSBmdW5jdGlvbiAodHlwZSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW3R5cGVdO1xuICAgICAgICBpZiAoIWxpc3QpIHJldHVybjtcbiAgICAgICAgbGV0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gaW5mb3NbaV0gJiYgaW5mb3NbaV0udGFyZ2V0O1xuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcbiAgICAgICAgICAgICAgICBmYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGwodHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9fb2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xuXG4gICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0Ll9fZXZlbnRUYXJnZXRzKSB7XG4gICAgICAgICAgICBmYXN0UmVtb3ZlKHRhcmdldC5fX2V2ZW50VGFyZ2V0cywgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqICEjZW4gUmVtb3ZlcyBhbGwgY2FsbGJhY2tzIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIHRoZSBzYW1lIHRhcmdldCAocGFzc2VkIGFzIHBhcmFtZXRlcikuXG4gKiBUaGlzIGlzIG5vdCBmb3IgcmVtb3ZpbmcgYWxsIGxpc3RlbmVycyBpbiB0aGUgY3VycmVudCBldmVudCB0YXJnZXQsXG4gKiBhbmQgdGhpcyBpcyBub3QgZm9yIHJlbW92aW5nIGFsbCBsaXN0ZW5lcnMgdGhlIHRhcmdldCBwYXJhbWV0ZXIgaGF2ZSByZWdpc3RlcmVkLlxuICogSXQncyBvbmx5IGZvciByZW1vdmluZyBhbGwgbGlzdGVuZXJzIChjYWxsYmFjayBhbmQgdGFyZ2V0IGNvdXBsZSkgcmVnaXN0ZXJlZCBvbiB0aGUgY3VycmVudCBldmVudCB0YXJnZXQgYnkgdGhlIHRhcmdldCBwYXJhbWV0ZXIuXG4gKiAhI3poIOWcqOW9k+WJjSBFdmVudFRhcmdldCDkuIrliKDpmaTmjIflrprnm67moIfvvIh0YXJnZXQg5Y+C5pWw77yJ5rOo5YaM55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo44CCXG4gKiDov5nkuKrlh73mlbDml6Dms5XliKDpmaTlvZPliY0gRXZlbnRUYXJnZXQg55qE5omA5pyJ5LqL5Lu255uR5ZCs5Zmo77yM5Lmf5peg5rOV5Yig6ZmkIHRhcmdldCDlj4LmlbDmiYDms6jlhoznmoTmiYDmnInkuovku7bnm5HlkKzlmajjgIJcbiAqIOi/meS4quWHveaVsOWPquiDveWIoOmZpCB0YXJnZXQg5Y+C5pWw5Zyo5b2T5YmNIEV2ZW50VGFyZ2V0IOS4iuazqOWGjOeahOaJgOacieS6i+S7tuebkeWQrOWZqOOAglxuICogQG1ldGhvZCB0YXJnZXRPZmZcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIGJlIHNlYXJjaGVkIGZvciBhbGwgcmVsYXRlZCBsaXN0ZW5lcnNcbiAqL1xucHJvdG8udGFyZ2V0T2ZmID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIHRoaXMucmVtb3ZlQWxsKHRhcmdldCk7XG4gICAgXG4gICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuX19ldmVudFRhcmdldHMpIHtcbiAgICAgICAgZmFzdFJlbW92ZSh0YXJnZXQuX19ldmVudFRhcmdldHMsIHRoaXMpO1xuICAgIH1cbn07XG5cbi8qKlxuICogISNlblxuICogUmVnaXN0ZXIgYW4gY2FsbGJhY2sgb2YgYSBzcGVjaWZpYyBldmVudCB0eXBlIG9uIHRoZSBFdmVudFRhcmdldCxcbiAqIHRoZSBjYWxsYmFjayB3aWxsIHJlbW92ZSBpdHNlbGYgYWZ0ZXIgdGhlIGZpcnN0IHRpbWUgaXQgaXMgdHJpZ2dlcmVkLlxuICogISN6aFxuICog5rOo5YaM5LqL5Lu255uu5qCH55qE54m55a6a5LqL5Lu257G75Z6L5Zue6LCD77yM5Zue6LCD5Lya5Zyo56ys5LiA5pe26Ze06KKr6Kem5Y+R5ZCO5Yig6Zmk6Ieq6Lqr44CCXG4gKlxuICogQG1ldGhvZCBvbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGUgZXZlbnQgaXMgZGlzcGF0Y2hlZC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGNhbGxiYWNrIGlzIGlnbm9yZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUgKHRoZSBjYWxsYmFja3MgYXJlIHVuaXF1ZSkuXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzFdIGFyZzFcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnMl0gYXJnMlxuICogQHBhcmFtIHthbnl9IFtjYWxsYmFjay5hcmczXSBhcmczXG4gKiBAcGFyYW0ge2FueX0gW2NhbGxiYWNrLmFyZzRdIGFyZzRcbiAqIEBwYXJhbSB7YW55fSBbY2FsbGJhY2suYXJnNV0gYXJnNVxuICogQHBhcmFtIHtPYmplY3R9IFt0YXJnZXRdIC0gVGhlIHRhcmdldCAodGhpcyBvYmplY3QpIHRvIGludm9rZSB0aGUgY2FsbGJhY2ssIGNhbiBiZSBudWxsXG4gKiBAZXhhbXBsZVxuICogZXZlbnRUYXJnZXQub25jZSgnZmlyZScsIGZ1bmN0aW9uICgpIHtcbiAqICAgICBjYy5sb2coXCJ0aGlzIGlzIHRoZSBjYWxsYmFjayBhbmQgd2lsbCBiZSBpbnZva2VkIG9ubHkgb25jZVwiKTtcbiAqIH0sIG5vZGUpO1xuICovXG5wcm90by5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICB0aGlzLm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHRydWUpO1xufTtcblxuLyoqXG4gKiAhI2VuXG4gKiBTZW5kIGFuIGV2ZW50IHdpdGggdGhlIGV2ZW50IG9iamVjdC5cbiAqICEjemhcbiAqIOmAmui/h+S6i+S7tuWvueixoea0vuWPkeS6i+S7tlxuICpcbiAqIEBtZXRob2QgZGlzcGF0Y2hFdmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqL1xucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgIHRoaXMuZW1pdChldmVudC50eXBlLCBldmVudCk7XG59O1xuXG4vKipcbiAqICEjZW5cbiAqIERlc3Ryb3kgYWxsIGNhbGxiYWNrSW5mb3MuXG4gKiAhI3poXG4gKiDplIDmr4HorrDlvZXnmoTkuovku7ZcbiAqXG4gKiBAbWV0aG9kIGNsZWFyXG4gKi9cbnByb3RvLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIHJlbW92ZSBhbGwgY2FsbGJhY2tcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9jYWxsYmFja1RhYmxlKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgICAgIGNvbnN0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5mb3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcbiAgICAgICAgICAgIHRoaXMub2ZmKGtleSwgaW5mby5jYWxsYmFjaywgaW5mby50YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY2MuRXZlbnRUYXJnZXQgPSBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50VGFyZ2V0O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=