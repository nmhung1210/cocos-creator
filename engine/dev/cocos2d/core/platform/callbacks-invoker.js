
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2NhbGxiYWNrcy1pbnZva2VyLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsImZhc3RSZW1vdmVBdCIsImFycmF5IiwiZW1wdHkiLCJDYWxsYmFja0luZm8iLCJjYWxsYmFjayIsInRhcmdldCIsInVuZGVmaW5lZCIsIm9uY2UiLCJwcm90b3R5cGUiLCJzZXQiLCJjYWxsYmFja0luZm9Qb29sIiwiUG9vbCIsImluZm8iLCJnZXQiLCJfZ2V0IiwiQ2FsbGJhY2tMaXN0IiwiY2FsbGJhY2tJbmZvcyIsImlzSW52b2tpbmciLCJjb250YWluQ2FuY2VsZWQiLCJwcm90byIsInJlbW92ZUJ5Q2FsbGJhY2siLCJjYiIsImkiLCJsZW5ndGgiLCJwdXQiLCJyZW1vdmVCeVRhcmdldCIsImNhbmNlbCIsImluZGV4IiwiY2FuY2VsQWxsIiwicHVyZ2VDYW5jZWxlZCIsImNsZWFyIiwiTUFYX1NJWkUiLCJjYWxsYmFja0xpc3RQb29sIiwiQ2FsbGJhY2tzSW52b2tlciIsIl9jYWxsYmFja1RhYmxlIiwiY3JlYXRlTWFwIiwib24iLCJrZXkiLCJsaXN0IiwicHVzaCIsImhhc0V2ZW50TGlzdGVuZXIiLCJpbmZvcyIsInJlbW92ZUFsbCIsImtleU9yVGFyZ2V0Iiwib2ZmIiwiZW1pdCIsImFyZzEiLCJhcmcyIiwiYXJnMyIsImFyZzQiLCJhcmc1Iiwicm9vdEludm9rZXIiLCJsZW4iLCJjYWxsIiwiQ0NfVEVTVCIsImNjIiwiX1Rlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBTUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFsQjs7QUFDQSxJQUFNQyxZQUFZLEdBQUdGLEVBQUUsQ0FBQ0csS0FBSCxDQUFTRCxZQUE5Qjs7QUFFQSxTQUFTRSxLQUFULEdBQWtCLENBQUU7O0FBRXBCLFNBQVND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QixnQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmNvbnN0IGpzID0gcmVxdWlyZSgnLi9qcycpO1xuY29uc3QgZmFzdFJlbW92ZUF0ID0ganMuYXJyYXkuZmFzdFJlbW92ZUF0O1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7fVxuXG5mdW5jdGlvbiBDYWxsYmFja0luZm8gKCkge1xuICAgIHRoaXMuY2FsbGJhY2sgPSBlbXB0eTtcbiAgICB0aGlzLnRhcmdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uY2UgPSBmYWxzZTtcbn1cblxuQ2FsbGJhY2tJbmZvLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRhcmdldCwgb25jZSkge1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICB0aGlzLm9uY2UgPSAhIW9uY2U7XG59O1xuXG5sZXQgY2FsbGJhY2tJbmZvUG9vbCA9IG5ldyBqcy5Qb29sKGZ1bmN0aW9uIChpbmZvKSB7XG4gICAgaW5mby5jYWxsYmFjayA9IGVtcHR5O1xuICAgIGluZm8udGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIGluZm8ub25jZSA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufSwgMzIpO1xuXG5jYWxsYmFja0luZm9Qb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IENhbGxiYWNrSW5mbygpO1xufTtcblxuZnVuY3Rpb24gQ2FsbGJhY2tMaXN0ICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrSW5mb3MgPSBbXTtcbiAgICB0aGlzLmlzSW52b2tpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRhaW5DYW5jZWxlZCA9IGZhbHNlO1xufVxuXG5sZXQgcHJvdG8gPSBDYWxsYmFja0xpc3QucHJvdG90eXBlO1xuXG4vKipcbiAqICEjemhcbiAqIOS7juWIl+ihqOS4reenu+mZpOS4juaMh+Wumuebruagh+ebuOWQjOWbnuiwg+WHveaVsOeahOS6i+S7tuOAglxuICogQHBhcmFtIGNiXG4gKi9cbnByb3RvLnJlbW92ZUJ5Q2FsbGJhY2sgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpXTtcbiAgICAgICAgaWYgKGluZm8gJiYgaW5mby5jYWxsYmFjayA9PT0gY2IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xuICAgICAgICAgICAgZmFzdFJlbW92ZUF0KHRoaXMuY2FsbGJhY2tJbmZvcywgaSk7XG4gICAgICAgICAgICAtLWk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqICEjemhcbiAqIOS7juWIl+ihqOS4reenu+mZpOS4juaMh+Wumuebruagh+ebuOWQjOiwg+eUqOiAheeahOS6i+S7tuOAglxuICogQHBhcmFtIHRhcmdldFxuICovXG5wcm90by5yZW1vdmVCeVRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tJbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBpbmZvID0gdGhpcy5jYWxsYmFja0luZm9zW2ldO1xuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLnRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICBjYWxsYmFja0luZm9Qb29sLnB1dChpbmZvKTtcbiAgICAgICAgICAgIGZhc3RSZW1vdmVBdCh0aGlzLmNhbGxiYWNrSW5mb3MsIGkpO1xuICAgICAgICAgICAgLS1pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiAhI3poXG4gKiDnp7vpmaTmjIflrprnvJblj7fkuovku7bjgIJcbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xucHJvdG8uY2FuY2VsID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgY29uc3QgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpbmRleF07XG4gICAgaWYgKGluZm8pIHtcbiAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2tJbmZvc1tpbmRleF0gPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5DYW5jZWxlZCA9IHRydWU7XG59O1xuXG4vKipcbiAqICEjemhcbiAqIOazqOmUgOaJgOacieS6i+S7tuOAglxuICovXG5wcm90by5jYW5jZWxBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhbGxiYWNrSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpXTtcbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrSW5mb1Bvb2wucHV0KGluZm8pO1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFja0luZm9zW2ldID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5DYW5jZWxlZCA9IHRydWU7XG59O1xuXG4vLyBmaWx0ZXIgYWxsIHJlbW92ZWQgY2FsbGJhY2tzIGFuZCBjb21wYWN0IGFycmF5XG5wcm90by5wdXJnZUNhbmNlbGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAobGV0IGkgPSB0aGlzLmNhbGxiYWNrSW5mb3MubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHRoaXMuY2FsbGJhY2tJbmZvc1tpXTtcbiAgICAgICAgaWYgKCFpbmZvKSB7XG4gICAgICAgICAgICBmYXN0UmVtb3ZlQXQodGhpcy5jYWxsYmFja0luZm9zLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbnRhaW5DYW5jZWxlZCA9IGZhbHNlO1xufTtcblxucHJvdG8uY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jYW5jZWxBbGwoKTtcbiAgICB0aGlzLmNhbGxiYWNrSW5mb3MubGVuZ3RoID0gMDtcbiAgICB0aGlzLmlzSW52b2tpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRhaW5DYW5jZWxlZCA9IGZhbHNlO1xufTtcblxuY29uc3QgTUFYX1NJWkUgPSAxNjtcbmxldCBjYWxsYmFja0xpc3RQb29sID0gbmV3IGpzLlBvb2woZnVuY3Rpb24gKGluZm8pIHtcbiAgICBpbmZvLmNhbGxiYWNrSW5mb3MgPSBbXTtcbiAgICBpbmZvLmlzSW52b2tpbmcgPSBmYWxzZTtcbiAgICBpbmZvLmNvbnRhaW5DYW5jZWxlZCA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xufSwgTUFYX1NJWkUpO1xuXG5jYWxsYmFja0xpc3RQb29sLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0KCkgfHwgbmV3IENhbGxiYWNrTGlzdCgpO1xufTtcblxuLyoqXG4gKiAhI2VuIFRoZSBjYWxsYmFja3MgaW52b2tlciB0byBoYW5kbGUgYW5kIGludm9rZSBjYWxsYmFja3MgYnkga2V5LlxuICogISN6aCBDYWxsYmFja3NJbnZva2VyIOeUqOadpeagueaNriBLZXkg566h55CG5bm26LCD55So5Zue6LCD5pa55rOV44CCXG4gKiBAY2xhc3MgQ2FsbGJhY2tzSW52b2tlclxuICovXG5mdW5jdGlvbiBDYWxsYmFja3NJbnZva2VyICgpIHtcbiAgICB0aGlzLl9jYWxsYmFja1RhYmxlID0ganMuY3JlYXRlTWFwKHRydWUpO1xufVxuXG5wcm90byA9IENhbGxiYWNrc0ludm9rZXIucHJvdG90eXBlO1xuXG4vKipcbiAqICEjemhcbiAqIOS6i+S7tua3u+WKoOeuoeeQhlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBjYWxsYmFja1xuICogQHBhcmFtIHRhcmdldFxuICogQHBhcmFtIG9uY2VcbiAqL1xucHJvdG8ub24gPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaywgdGFyZ2V0LCBvbmNlKSB7XG4gICAgbGV0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICAgIGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV0gPSBjYWxsYmFja0xpc3RQb29sLmdldCgpO1xuICAgIH1cbiAgICBsZXQgaW5mbyA9IGNhbGxiYWNrSW5mb1Bvb2wuZ2V0KCk7XG4gICAgaW5mby5zZXQoY2FsbGJhY2ssIHRhcmdldCwgb25jZSk7XG4gICAgbGlzdC5jYWxsYmFja0luZm9zLnB1c2goaW5mbyk7XG59O1xuXG4vKipcbiAqXG4gKiAhI3poXG4gKiDmo4Dmn6XmjIflrprkuovku7bmmK/lkKblt7Lms6jlhozlm57osIPjgIJcbiAqXG4gKiAhI2VuXG4gKiBDaGVjayBpZiB0aGUgc3BlY2lmaWVkIGtleSBoYXMgYW55IHJlZ2lzdGVyZWQgY2FsbGJhY2suIElmIGEgY2FsbGJhY2sgaXMgYWxzbyBzcGVjaWZpZWQsXG4gKiBpdCB3aWxsIG9ubHkgcmV0dXJuIHRydWUgaWYgdGhlIGNhbGxiYWNrIGlzIHJlZ2lzdGVyZWQuXG4gKlxuICogQG1ldGhvZCBoYXNFdmVudExpc3RlbmVyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF1cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbnByb3RvLmhhc0V2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoa2V5LCBjYWxsYmFjaywgdGFyZ2V0KSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuX2NhbGxiYWNrVGFibGVba2V5XTtcbiAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGFueSB2YWxpZCBjYWxsYmFja1xuICAgIGNvbnN0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIG5vIGNhbmNlbGxlZCBjYWxsYmFja3NcbiAgICAgICAgaWYgKGxpc3QuaXNJbnZva2luZykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChpbmZvc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mb3MubGVuZ3RoID4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xuICAgICAgICBpZiAoaW5mbyAmJiBpbmZvLmNhbGxiYWNrID09PSBjYWxsYmFjayAmJiBpbmZvLnRhcmdldCA9PT0gdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqICEjemhcbiAqIOenu+mZpOWcqOeJueWumuS6i+S7tuexu+Wei+S4reazqOWGjOeahOaJgOacieWbnuiwg+aIluWcqOafkOS4quebruagh+S4reazqOWGjOeahOaJgOacieWbnuiwg+OAglxuICpcbiAqICEjZW5cbiAqIFJlbW92ZXMgYWxsIGNhbGxiYWNrcyByZWdpc3RlcmVkIGluIGEgY2VydGFpbiBldmVudCB0eXBlIG9yIGFsbCBjYWxsYmFja3MgcmVnaXN0ZXJlZCB3aXRoIGEgY2VydGFpbiB0YXJnZXRcbiAqIEBtZXRob2QgcmVtb3ZlQWxsXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGtleU9yVGFyZ2V0IC0gVGhlIGV2ZW50IGtleSB0byBiZSByZW1vdmVkIG9yIHRoZSB0YXJnZXQgdG8gYmUgcmVtb3ZlZFxuICovXG5wcm90by5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoa2V5T3JUYXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIGtleU9yVGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyByZW1vdmUgYnkga2V5XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleU9yVGFyZ2V0XTtcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICAgIGlmIChsaXN0LmlzSW52b2tpbmcpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmNhbmNlbEFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrTGlzdFBvb2wucHV0KGxpc3QpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleU9yVGFyZ2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChrZXlPclRhcmdldCkge1xuICAgICAgICAvLyByZW1vdmUgYnkgdGFyZ2V0XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2NhbGxiYWNrVGFibGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgICAgICAgICBpZiAobGlzdC5pc0ludm9raW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmZvcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gaW5mb3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8udGFyZ2V0ID09PSBrZXlPclRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdC5jYW5jZWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZUJ5VGFyZ2V0KGtleU9yVGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogISN6aFxuICog5Yig6Zmk5LmL5YmN5LiO5ZCM57G75Z6L77yM5Zue6LCD77yM55uu5qCH5rOo5YaM55qE5Zue6LCD44CCXG4gKlxuICogQG1ldGhvZCBvZmZcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge09iamVjdH0gW3RhcmdldF1cbiAqL1xucHJvdG8ub2ZmID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2ssIHRhcmdldCkge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5mb3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcbiAgICAgICAgICAgIGlmIChpbmZvICYmIGluZm8uY2FsbGJhY2sgPT09IGNhbGxiYWNrICYmIGluZm8udGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5pc0ludm9raW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuY2FuY2VsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmFzdFJlbW92ZUF0KGluZm9zLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tJbmZvUG9vbC5wdXQoaW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vKipcbiAqICEjZW5cbiAqIFRyaWdnZXIgYW4gZXZlbnQgZGlyZWN0bHkgd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgbmVjZXNzYXJ5IGFyZ3VtZW50cy5cbiAqICEjemhcbiAqIOmAmui/h+S6i+S7tuWQjeWPkemAgeiHquWumuS5ieS6i+S7tlxuICpcbiAqIEBtZXRob2QgZW1pdFxuICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIGV2ZW50IHR5cGVcbiAqIEBwYXJhbSB7Kn0gW2FyZzFdIC0gRmlyc3QgYXJndW1lbnRcbiAqIEBwYXJhbSB7Kn0gW2FyZzJdIC0gU2Vjb25kIGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IFthcmczXSAtIFRoaXJkIGFyZ3VtZW50XG4gKiBAcGFyYW0geyp9IFthcmc0XSAtIEZvdXJ0aCBhcmd1bWVudFxuICogQHBhcmFtIHsqfSBbYXJnNV0gLSBGaWZ0aCBhcmd1bWVudFxuICogQGV4YW1wbGVcbiAqXG4gKiBldmVudFRhcmdldC5lbWl0KCdmaXJlJywgZXZlbnQpO1xuICogZXZlbnRUYXJnZXQuZW1pdCgnZmlyZScsIG1lc3NhZ2UsIGVtaXR0ZXIpO1xuICovXG5wcm90by5lbWl0ID0gZnVuY3Rpb24gKGtleSwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLl9jYWxsYmFja1RhYmxlW2tleV07XG4gICAgaWYgKGxpc3QpIHtcbiAgICAgICAgY29uc3Qgcm9vdEludm9rZXIgPSAhbGlzdC5pc0ludm9raW5nO1xuICAgICAgICBsaXN0LmlzSW52b2tpbmcgPSB0cnVlO1xuXG4gICAgICAgIGNvbnN0IGluZm9zID0gbGlzdC5jYWxsYmFja0luZm9zO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaW5mb3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm8gPSBpbmZvc1tpXTtcbiAgICAgICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGluZm8udGFyZ2V0O1xuICAgICAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGluZm8uY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8ub25jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9mZihrZXksIGNhbGxiYWNrLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvb3RJbnZva2VyKSB7XG4gICAgICAgICAgICBsaXN0LmlzSW52b2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChsaXN0LmNvbnRhaW5DYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgIGxpc3QucHVyZ2VDYW5jZWxlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuaWYgKENDX1RFU1QpIHtcbiAgICBjYy5fVGVzdC5DYWxsYmFja3NJbnZva2VyID0gQ2FsbGJhY2tzSW52b2tlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDYWxsYmFja3NJbnZva2VyO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=