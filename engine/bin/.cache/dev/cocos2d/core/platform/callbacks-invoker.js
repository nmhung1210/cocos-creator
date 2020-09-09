
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/callbacks-invoker.js';
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
var js = require('./js');

var fastRemoveAt = js.array.fastRemoveAt;

function empty() {}

function CallbackInfo() {
  this.callback = empty;
  this.target = undefined;
  this.once = false;
}

CallbackInfo.prototype.set = function (callback, target, once) {
  this.callback = callback;
  this.target = target;
  this.once = !!once;
};

var callbackInfoPool = new js.Pool(function (info) {
  info.callback = empty;
  info.target = undefined;
  info.once = false;
  return true;
}, 32);

callbackInfoPool.get = function () {
  return this._get() || new CallbackInfo();
};

function CallbackList() {
  this.callbackInfos = [];
  this.isInvoking = false;
  this.containCanceled = false;
}

var proto = CallbackList.prototype;
/**
 * !#zh
 * 从列表中移除与指定目标相同回调函数的事件。
 * @param cb
 */

proto.removeByCallback = function (cb) {
  for (var i = 0; i < this.callbackInfos.length; ++i) {
    var info = this.callbackInfos[i];

    if (info && info.callback === cb) {
      callbackInfoPool.put(info);
      fastRemoveAt(this.callbackInfos, i);
      --i;
    }
  }
};
/**
 * !#zh
 * 从列表中移除与指定目标相同调用者的事件。
 * @param target
 */


proto.removeByTarget = function (target) {
  for (var i = 0; i < this.callbackInfos.length; ++i) {
    var info = this.callbackInfos[i];

    if (info && info.target === target) {
      callbackInfoPool.put(info);
      fastRemoveAt(this.callbackInfos, i);
      --i;
    }
  }
};
/**
 * !#zh
 * 移除指定编号事件。
 *
 * @param index
 */


proto.cancel = function (index) {
  var info = this.callbackInfos[index];

  if (info) {
    callbackInfoPool.put(info);
    this.callbackInfos[index] = null;
  }

  this.containCanceled = true;
};
/**
 * !#zh
 * 注销所有事件。
 */


proto.cancelAll = function () {
  for (var i = 0; i < this.callbackInfos.length; i++) {
    var info = this.callbackInfos[i];

    if (info) {
      callbackInfoPool.put(info);
      this.callbackInfos[i] = null;
    }
  }

  this.containCanceled = true;
}; // filter all removed callbacks and compact array


proto.purgeCanceled = function () {
  for (var i = this.callbackInfos.length - 1; i >= 0; --i) {
    var info = this.callbackInfos[i];

    if (!info) {
      fastRemoveAt(this.callbackInfos, i);
    }
  }

  this.containCanceled = false;
};

proto.clear = function () {
  this.cancelAll();
  this.callbackInfos.length = 0;
  this.isInvoking = false;
  this.containCanceled = false;
};

var MAX_SIZE = 16;
var callbackListPool = new js.Pool(function (info) {
  info.callbackInfos = [];
  info.isInvoking = false;
  info.containCanceled = false;
  return true;
}, MAX_SIZE);

callbackListPool.get = function () {
  return this._get() || new CallbackList();
};
/**
 * !#en The callbacks invoker to handle and invoke callbacks by key.
 * !#zh CallbacksInvoker 用来根据 Key 管理并调用回调方法。
 * @class CallbacksInvoker
 */


function CallbacksInvoker() {
  this._callbackTable = js.createMap(true);
}

proto = CallbacksInvoker.prototype;
/**
 * !#zh
 * 事件添加管理
 *
 * @param key
 * @param callback
 * @param target
 * @param once
 */

proto.on = function (key, callback, target, once) {
  var list = this._callbackTable[key];

  if (!list) {
    list = this._callbackTable[key] = callbackListPool.get();
  }

  var info = callbackInfoPool.get();
  info.set(callback, target, once);
  list.callbackInfos.push(info);
};
/**
 *
 * !#zh
 * 检查指定事件是否已注册回调。
 *
 * !#en
 * Check if the specified key has any registered callback. If a callback is also specified,
 * it will only return true if the callback is registered.
 *
 * @method hasEventListener
 * @param {String} key
 * @param {Function} [callback]
 * @param {Object} [target]
 * @return {Boolean}
 */


proto.hasEventListener = function (key, callback, target) {
  var list = this._callbackTable[key];

  if (!list) {
    return false;
  } // check any valid callback


  var infos = list.callbackInfos;

  if (!callback) {
    // Make sure no cancelled callbacks
    if (list.isInvoking) {
      for (var i = 0; i < infos.length; ++i) {
        if (infos[i]) {
          return true;
        }
      }

      return false;
    } else {
      return infos.length > 0;
    }
  }

  for (var _i = 0; _i < infos.length; ++_i) {
    var info = infos[_i];

    if (info && info.callback === callback && info.target === target) {
      return true;
    }
  }

  return false;
};
/**
 * !#zh
 * 移除在特定事件类型中注册的所有回调或在某个目标中注册的所有回调。
 *
 * !#en
 * Removes all callbacks registered in a certain event type or all callbacks registered with a certain target
 * @method removeAll
 * @param {String|Object} keyOrTarget - The event key to be removed or the target to be removed
 */


proto.removeAll = function (keyOrTarget) {
  if (typeof keyOrTarget === 'string') {
    // remove by key
    var list = this._callbackTable[keyOrTarget];

    if (list) {
      if (list.isInvoking) {
        list.cancelAll();
      } else {
        list.clear();
        callbackListPool.put(list);
        delete this._callbackTable[keyOrTarget];
      }
    }
  } else if (keyOrTarget) {
    // remove by target
    for (var key in this._callbackTable) {
      var _list = this._callbackTable[key];

      if (_list.isInvoking) {
        var infos = _list.callbackInfos;

        for (var i = 0; i < infos.length; ++i) {
          var info = infos[i];

          if (info && info.target === keyOrTarget) {
            _list.cancel(i);
          }
        }
      } else {
        _list.removeByTarget(keyOrTarget);
      }
    }
  }
};
/**
 * !#zh
 * 删除之前与同类型，回调，目标注册的回调。
 *
 * @method off
 * @param {String} key
 * @param {Function} callback
 * @param {Object} [target]
 */


proto.off = function (key, callback, target) {
  var list = this._callbackTable[key];

  if (list) {
    var infos = list.callbackInfos;

    for (var i = 0; i < infos.length; ++i) {
      var info = infos[i];

      if (info && info.callback === callback && info.target === target) {
        if (list.isInvoking) {
          list.cancel(i);
        } else {
          fastRemoveAt(infos, i);
          callbackInfoPool.put(info);
        }

        break;
      }
    }
  }
};
/**
 * !#en
 * Trigger an event directly with the event name and necessary arguments.
 * !#zh
 * 通过事件名发送自定义事件
 *
 * @method emit
 * @param {String} key - event type
 * @param {*} [arg1] - First argument
 * @param {*} [arg2] - Second argument
 * @param {*} [arg3] - Third argument
 * @param {*} [arg4] - Fourth argument
 * @param {*} [arg5] - Fifth argument
 * @example
 *
 * eventTarget.emit('fire', event);
 * eventTarget.emit('fire', message, emitter);
 */


proto.emit = function (key, arg1, arg2, arg3, arg4, arg5) {
  var list = this._callbackTable[key];

  if (list) {
    var rootInvoker = !list.isInvoking;
    list.isInvoking = true;
    var infos = list.callbackInfos;

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];

      if (info) {
        var target = info.target;
        var callback = info.callback;

        if (info.once) {
          this.off(key, callback, target);
        }

        if (target) {
          callback.call(target, arg1, arg2, arg3, arg4, arg5);
        } else {
          callback(arg1, arg2, arg3, arg4, arg5);
        }
      }
    }

    if (rootInvoker) {
      list.isInvoking = false;

      if (list.containCanceled) {
        list.purgeCanceled();
      }
    }
  }
};

if (CC_TEST) {
  cc._Test.CallbacksInvoker = CallbacksInvoker;
}

module.exports = CallbacksInvoker;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2NhbGxiYWNrcy1pbnZva2VyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsImZhc3RSZW1vdmVBdCIsImFycmF5IiwiZW1wdHkiLCJDYWxsYmFja0luZm8iLCJjYWxsYmFjayIsInRhcmdldCIsInVuZGVmaW5lZCIsIm9uY2UiLCJwcm90b3R5cGUiLCJzZXQiLCJjYWxsYmFja0luZm9Qb29sIiwiUG9vbCIsImluZm8iLCJnZXQiLCJfZ2V0IiwiQ2FsbGJhY2tMaXN0IiwiY2FsbGJhY2tJbmZvcyIsImlzSW52b2tpbmciLCJjb250YWluQ2FuY2VsZWQiLCJwcm90byIsInJlbW92ZUJ5Q2FsbGJhY2siLCJjYiIsImkiLCJsZW5ndGgiLCJwdXQiLCJyZW1vdmVCeVRhcmdldCIsImNhbmNlbCIsImluZGV4IiwiY2FuY2VsQWxsIiwicHVyZ2VDYW5jZWxlZCIsImNsZWFyIiwiTUFYX1NJWkUiLCJjYWxsYmFja0xpc3RQb29sIiwiQ2FsbGJhY2tzSW52b2tlciIsIl9jYWxsYmFja1RhYmxlIiwiY3JlYXRlTWFwIiwib24iLCJrZXkiLCJsaXN0IiwicHVzaCIsImhhc0V2ZW50TGlzdGVuZXIiLCJpbmZvcyIsInJlbW92ZUFsbCIsImtleU9yVGFyZ2V0Iiwib2ZmIiwiZW1pdCIsImFyZzEiLCJhcmcyIiwiYXJnMyIsImFyZzQiLCJhcmc1Iiwicm9vdEludm9rZXIiLCJsZW4iLCJjYWxsIiwiQ0NfVEVTVCIsImNjIiwiX1Rlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCRCxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBR0YsRUFBRSxDQUFDRyxLQUFILENBQVNELFlBQTlCOztBQUVBLFNBQVNFLEtBQVQsR0FBa0IsQ0FBRTs7QUFFcEIsU0FBU0MsWUFB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QUFqQiIsInNvdXJjZXNDb250ZW50IjpbIu+7vy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QganMgPSByZXF1aXJlKCcuL2pzJyk7XG5jb25zdCBmYXN0UmVtb3ZlQXQgPSBqcy5hcnJheS5mYXN0UmVtb3ZlQXQ7XG5cbmZ1bmN0aW9uIGVtcHR5ICgpIHt9XG5cbmZ1bmN0aW9uIENhbGxiYWNrSW5mbyAoKSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGVtcHR5O1xuICAgIHRoaXMudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25jZSA9IGZhbHNlO1xufVxuXG5DYWxsYmFja0luZm8ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMub25jZSA9ICEhb25jZTtcbn07XG5cbmxldCBjYWxsYmFja0luZm9Qb29sID0gbmV3IGpzLlBvb2woZnVuY3Rpb24gKGluZm8pIHtcbiAgICBpbmZvLmNhbGxiYWNrID0gZW1wdHk7XG4gICAgaW5mby50YXJnZXQgPSB1bmRlZmluZWQ7XG4gICAgaW5mby5vbmNlID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59LCAzMik7XG5cbmNhbGxiYWNrSW5mb1Bvb2wuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXQoKSB8fCBuZXcgQ2FsbGJhY2tJbmZvKCk7XG59O1xuXG5mdW5jdGlvbiBDYWxsYmFja0xpc3QgKCkge1xuICAgIHRoaXMuY2FsbGJhY2tJbmZvcyA9IFtdO1xuICAgIHRoaXMuaXNJbnZva2luZyA9IGZhbHNlO1xuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XG59XG5cbmxldCBwcm90byA9IENhbGxiYWNrTGlzdC5wcm90b3R5cGU7XG5cbi8qKlxuICogISN6aFxuICog5LuO5YiX6KGo5Lit56e76Zmk5LiO5oyH5a6a55uu5qCH55u45ZCM5Zue6LCD5Ye95pWw55qE5LqL5Lu244CCXG4gKiBAcGFyYW0gY2JcbiAqL1xucHJvdG8ucmVtb3ZlQnlDYWxsYmFjayA9IGZ1bmN0aW9uIChjYikge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWxsYmFja0luZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2ldO1xuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLmNhbGxiYWNrID09PSBjYikge1xuICAgICAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XG4gICAgICAgICAgICBmYXN0UmVtb3ZlQXQodGhpcy5jYWxsYmFja0luZm9zLCBpKTtcbiAgICAgICAgICAgIC0taTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogISN6aFxuICog5LuO5YiX6KGo5Lit56e76Zmk5LiO5oyH5a6a55uu5qCH55u45ZCM6LCD55So6ICF55qE5LqL5Lu244CCXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKi9cbnByb3RvLnJlbW92ZUJ5VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYWxsYmFja0luZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmNhbGxiYWNrSW5mb3NbaV07XG4gICAgICAgIGlmIChpbmZvICYmIGluZm8udGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xuICAgICAgICAgICAgZmFzdFJlbW92ZUF0KHRoaXMuY2FsbGJhY2tJbmZvcywgaSk7XG4gICAgICAgICAgICAtLWk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqICEjemhcbiAqIOenu+mZpOaMh+Wumue8luWPt+S6i+S7tuOAglxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5wcm90by5jYW5jZWwgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBjb25zdCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2luZGV4XTtcbiAgICBpZiAoaW5mbykge1xuICAgICAgICBjYWxsYmFja0luZm9Qb29sLnB1dChpbmZvKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0luZm9zW2luZGV4XSA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogISN6aFxuICog5rOo6ZSA5omA5pyJ5LqL5Lu244CCXG4gKi9cbnByb3RvLmNhbmNlbEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2ldO1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrSW5mb3NbaV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gdHJ1ZTtcbn07XG5cbi8vIGZpbHRlciBhbGwgcmVtb3ZlZCBjYWxsYmFja3MgYW5kIGNvbXBhY3QgYXJyYXlcbnByb3RvLnB1cmdlQ2FuY2VsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2ldO1xuICAgICAgICBpZiAoIWluZm8pIHtcbiAgICAgICAgICAgIGZhc3RSZW1vdmVBdCh0aGlzLmNhbGxiYWNrSW5mb3MsIGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XG59O1xuXG5wcm90by5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNhbmNlbEFsbCgpO1xuICAgIHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuaXNJbnZva2luZyA9IGZhbHNlO1xuICAgIHRoaXMuY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XG59O1xuXG5jb25zdCBNQVhfU0laRSA9IDE2O1xubGV0IGNhbGxiYWNrTGlzdFBvb2wgPSBuZXcganMuUG9vbChmdW5jdGlvbiAoaW5mbykge1xuICAgIGluZm8uY2FsbGJhY2tJbmZvcyA9IFtdO1xuICAgIGluZm8uaXNJbnZva2luZyA9IGZhbHNlO1xuICAgIGluZm8uY29udGFpbkNhbmNlbGVkID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG59LCBNQVhfU0laRSk7XG5cbmNhbGxiYWNrTGlzdFBvb2wuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9nZXQoKSB8fCBuZXcgQ2FsbGJhY2tMaXN0KCk7XG59O1xuXG4vKipcbiAqICEjZW4gVGhlIGNhbGxiYWNrcyBpbnZva2VyIHRvIGhhbmRsZSBhbmQgaW52b2tlIGNhbGxiYWNrcyBieSBrZXkuXG4gKiAhI3poIENhbGxiYWNrc0ludm9rZXIg55So5p2l5qC55o2uIEtleSDnrqHnkIblubbosIPnlKjlm57osIPmlrnms5XjgIJcbiAqIEBjbGFzcyBDYWxsYmFja3NJbnZva2VyXG4gKi9cbmZ1bmN0aW9uIENhbGxiYWNrc0ludm9rZXIgKCkge1xuICAgIHRoaXMuX2NhbGxiYWNrVGFibGUgPSBqcy5jcmVhdGVNYXAodHJ1ZSk7XG59XG5cbnByb3RvID0gQ2FsbGJhY2tzSW52b2tlci5wcm90b3R5cGU7XG5cbi8qKlxuICogISN6aFxuICog5LqL5Lu25re75Yqg566h55CGXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGNhbGxiYWNrXG4gKiBAcGFyYW0gdGFyZ2V0XG4gKiBAcGFyYW0gb25jZVxuICovXG5wcm90by5vbiA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrLCB0YXJnZXQsIG9uY2UpIHtcbiAgICBsZXQgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XSA9IGNhbGxiYWNrTGlzdFBvb2wuZ2V0KCk7XG4gICAgfVxuICAgIGxldCBpbmZvID0gY2FsbGJhY2tJbmZvUG9vbC5nZXQoKTtcbiAgICBpbmZvLnNldChjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKTtcbiAgICBsaXN0LmNhbGxiYWNrSW5mb3MucHVzaChpbmZvKTtcbn07XG5cbi8qKlxuICpcbiAqICEjemhcbiAqIOajgOafpeaMh+WumuS6i+S7tuaYr+WQpuW3suazqOWGjOWbnuiwg+OAglxuICpcbiAqICEjZW5cbiAqIENoZWNrIGlmIHRoZSBzcGVjaWZpZWQga2V5IGhhcyBhbnkgcmVnaXN0ZXJlZCBjYWxsYmFjay4gSWYgYSBjYWxsYmFjayBpcyBhbHNvIHNwZWNpZmllZCxcbiAqIGl0IHdpbGwgb25seSByZXR1cm4gdHJ1ZSBpZiB0aGUgY2FsbGJhY2sgaXMgcmVnaXN0ZXJlZC5cbiAqXG4gKiBAbWV0aG9kIGhhc0V2ZW50TGlzdGVuZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja11cbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xucHJvdG8uaGFzRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChrZXksIGNhbGxiYWNrLCB0YXJnZXQpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVtrZXldO1xuICAgIGlmICghbGlzdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgYW55IHZhbGlkIGNhbGxiYWNrXG4gICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAvLyBNYWtlIHN1cmUgbm8gY2FuY2VsbGVkIGNhbGxiYWNrc1xuICAgICAgICBpZiAobGlzdC5pc0ludm9raW5nKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZm9zW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvcy5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XG4gICAgICAgIGlmIChpbmZvICYmIGluZm8uY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGluZm8udGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogISN6aFxuICog56e76Zmk5Zyo54m55a6a5LqL5Lu257G75Z6L5Lit5rOo5YaM55qE5omA5pyJ5Zue6LCD5oiW5Zyo5p+Q5Liq55uu5qCH5Lit5rOo5YaM55qE5omA5pyJ5Zue6LCD44CCXG4gKlxuICogISNlblxuICogUmVtb3ZlcyBhbGwgY2FsbGJhY2tzIHJlZ2lzdGVyZWQgaW4gYSBjZXJ0YWluIGV2ZW50IHR5cGUgb3IgYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkIHdpdGggYSBjZXJ0YWluIHRhcmdldFxuICogQG1ldGhvZCByZW1vdmVBbGxcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0ga2V5T3JUYXJnZXQgLSBUaGUgZXZlbnQga2V5IHRvIGJlIHJlbW92ZWQgb3IgdGhlIHRhcmdldCB0byBiZSByZW1vdmVkXG4gKi9cbnByb3RvLnJlbW92ZUFsbCA9IGZ1bmN0aW9uIChrZXlPclRhcmdldCkge1xuICAgIGlmICh0eXBlb2Yga2V5T3JUYXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIHJlbW92ZSBieSBrZXlcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5T3JUYXJnZXRdO1xuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgaWYgKGxpc3QuaXNJbnZva2luZykge1xuICAgICAgICAgICAgICAgIGxpc3QuY2FuY2VsQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tMaXN0UG9vbC5wdXQobGlzdCk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrVGFibGVba2V5T3JUYXJnZXRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGtleU9yVGFyZ2V0KSB7XG4gICAgICAgIC8vIHJlbW92ZSBieSB0YXJnZXRcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fY2FsbGJhY2tUYWJsZSkge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICAgICAgICAgIGlmIChsaXN0LmlzSW52b2tpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvcyA9IGxpc3QuY2FsbGJhY2tJbmZvcztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZm9zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8gJiYgaW5mby50YXJnZXQgPT09IGtleU9yVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0LmNhbmNlbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3QucmVtb3ZlQnlUYXJnZXQoa2V5T3JUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI3poXG4gKiDliKDpmaTkuYvliY3kuI7lkIznsbvlnovvvIzlm57osIPvvIznm67moIfms6jlhoznmoTlm57osIPjgIJcbiAqXG4gKiBAbWV0aG9kIG9mZlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7T2JqZWN0fSBbdGFyZ2V0XVxuICovXG5wcm90by5vZmYgPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAobGlzdCkge1xuICAgICAgICBjb25zdCBpbmZvcyA9IGxpc3QuY2FsbGJhY2tJbmZvcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgaW5mby5jYWxsYmFjayA9PT0gY2FsbGJhY2sgJiYgaW5mby50YXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0LmlzSW52b2tpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5jYW5jZWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmYXN0UmVtb3ZlQXQoaW5mb3MsIGkpO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja0luZm9Qb29sLnB1dChpbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8qKlxuICogISNlblxuICogVHJpZ2dlciBhbiBldmVudCBkaXJlY3RseSB3aXRoIHRoZSBldmVudCBuYW1lIGFuZCBuZWNlc3NhcnkgYXJndW1lbnRzLlxuICogISN6aFxuICog6YCa6L+H5LqL5Lu25ZCN5Y+R6YCB6Ieq5a6a5LmJ5LqL5Lu2XG4gKlxuICogQG1ldGhvZCBlbWl0XG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gZXZlbnQgdHlwZVxuICogQHBhcmFtIHsqfSBbYXJnMV0gLSBGaXJzdCBhcmd1bWVudFxuICogQHBhcmFtIHsqfSBbYXJnMl0gLSBTZWNvbmQgYXJndW1lbnRcbiAqIEBwYXJhbSB7Kn0gW2FyZzNdIC0gVGhpcmQgYXJndW1lbnRcbiAqIEBwYXJhbSB7Kn0gW2FyZzRdIC0gRm91cnRoIGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IFthcmc1XSAtIEZpZnRoIGFyZ3VtZW50XG4gKiBAZXhhbXBsZVxuICpcbiAqIGV2ZW50VGFyZ2V0LmVtaXQoJ2ZpcmUnLCBldmVudCk7XG4gKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgbWVzc2FnZSwgZW1pdHRlcik7XG4gKi9cbnByb3RvLmVtaXQgPSBmdW5jdGlvbiAoa2V5LCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAobGlzdCkge1xuICAgICAgICBjb25zdCByb290SW52b2tlciA9ICFsaXN0LmlzSW52b2tpbmc7XG4gICAgICAgIGxpc3QuaXNJbnZva2luZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpbmZvcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xuICAgICAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gaW5mby50YXJnZXQ7XG4gICAgICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gaW5mby5jYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5vbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmKGtleSwgY2FsbGJhY2ssIHRhcmdldCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdEludm9rZXIpIHtcbiAgICAgICAgICAgIGxpc3QuaXNJbnZva2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGxpc3QuY29udGFpbkNhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXJnZUNhbmNlbGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLl9UZXN0LkNhbGxiYWNrc0ludm9rZXIgPSBDYWxsYmFja3NJbnZva2VyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGxiYWNrc0ludm9rZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==