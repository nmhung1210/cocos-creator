
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/component-scheduler.js';
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
require('./platform/CCClass');

var Flags = require('./platform/CCObject').Flags;

var jsArray = require('./platform/js').array;

var IsStartCalled = Flags.IsStartCalled;
var IsOnEnableCalled = Flags.IsOnEnableCalled;
var IsEditorOnEnableCalled = Flags.IsEditorOnEnableCalled;

var callerFunctor = CC_EDITOR && require('./utils/misc').tryCatchFunctor_EDITOR;

var callOnEnableInTryCatch = CC_EDITOR && callerFunctor('onEnable');
var callOnDisableInTryCatch = CC_EDITOR && callerFunctor('onDisable');

function sortedIndex(array, comp) {
  var order = comp.constructor._executionOrder;
  var id = comp._id;

  for (var l = 0, h = array.length - 1, m = h >>> 1; l <= h; m = l + h >>> 1) {
    var test = array[m];
    var testOrder = test.constructor._executionOrder;

    if (testOrder > order) {
      h = m - 1;
    } else if (testOrder < order) {
      l = m + 1;
    } else {
      var testId = test._id;

      if (testId > id) {
        h = m - 1;
      } else if (testId < id) {
        l = m + 1;
      } else {
        return m;
      }
    }
  }

  return ~l;
} // remove disabled and not invoked component from array


function stableRemoveInactive(iterator, flagToClear) {
  var array = iterator.array;
  var next = iterator.i + 1;

  while (next < array.length) {
    var comp = array[next];

    if (comp._enabled && comp.node._activeInHierarchy) {
      ++next;
    } else {
      iterator.removeAt(next);

      if (flagToClear) {
        comp._objFlags &= ~flagToClear;
      }
    }
  }
} // This class contains some queues used to invoke life-cycle methods by script execution order


var LifeCycleInvoker = cc.Class({
  __ctor__: function __ctor__(invokeFunc) {
    var Iterator = jsArray.MutableForwardIterator; // components which priority === 0 (default)

    this._zero = new Iterator([]); // components which priority < 0

    this._neg = new Iterator([]); // components which priority > 0

    this._pos = new Iterator([]);

    if (CC_TEST) {
      cc.assert(typeof invokeFunc === 'function', 'invokeFunc must be type function');
    }

    this._invoke = invokeFunc;
  },
  statics: {
    stableRemoveInactive: stableRemoveInactive
  },
  add: null,
  remove: null,
  invoke: null
});

function compareOrder(a, b) {
  return a.constructor._executionOrder - b.constructor._executionOrder;
} // for onLoad: sort once all components registered, invoke once


var OneOffInvoker = cc.Class({
  "extends": LifeCycleInvoker,
  add: function add(comp) {
    var order = comp.constructor._executionOrder;
    (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).array.push(comp);
  },
  remove: function remove(comp) {
    var order = comp.constructor._executionOrder;
    (order === 0 ? this._zero : order < 0 ? this._neg : this._pos).fastRemove(comp);
  },
  cancelInactive: function cancelInactive(flagToClear) {
    stableRemoveInactive(this._zero, flagToClear);
    stableRemoveInactive(this._neg, flagToClear);
    stableRemoveInactive(this._pos, flagToClear);
  },
  invoke: function invoke() {
    var compsNeg = this._neg;

    if (compsNeg.array.length > 0) {
      compsNeg.array.sort(compareOrder);

      this._invoke(compsNeg);

      compsNeg.array.length = 0;
    }

    this._invoke(this._zero);

    this._zero.array.length = 0;
    var compsPos = this._pos;

    if (compsPos.array.length > 0) {
      compsPos.array.sort(compareOrder);

      this._invoke(compsPos);

      compsPos.array.length = 0;
    }
  }
}); // for update: sort every time new component registered, invoke many times

var ReusableInvoker = cc.Class({
  "extends": LifeCycleInvoker,
  add: function add(comp) {
    var order = comp.constructor._executionOrder;

    if (order === 0) {
      this._zero.array.push(comp);
    } else {
      var array = order < 0 ? this._neg.array : this._pos.array;
      var i = sortedIndex(array, comp);

      if (i < 0) {
        array.splice(~i, 0, comp);
      } else if (CC_DEV) {
        cc.error('component already added');
      }
    }
  },
  remove: function remove(comp) {
    var order = comp.constructor._executionOrder;

    if (order === 0) {
      this._zero.fastRemove(comp);
    } else {
      var iterator = order < 0 ? this._neg : this._pos;
      var i = sortedIndex(iterator.array, comp);

      if (i >= 0) {
        iterator.removeAt(i);
      }
    }
  },
  invoke: function invoke(dt) {
    if (this._neg.array.length > 0) {
      this._invoke(this._neg, dt);
    }

    this._invoke(this._zero, dt);

    if (this._pos.array.length > 0) {
      this._invoke(this._pos, dt);
    }
  }
});

function enableInEditor(comp) {
  if (!(comp._objFlags & IsEditorOnEnableCalled)) {
    cc.engine.emit('component-enabled', comp.uuid);
    comp._objFlags |= IsEditorOnEnableCalled;
  }
} // return function to simply call each component with try catch protection


function createInvokeImpl(indiePath, useDt, ensureFlag, fastPath) {
  if (CC_SUPPORT_JIT) {
    // function (it) {
    //     var a = it.array;
    //     for (it.i = 0; it.i < a.length; ++it.i) {
    //         var c = a[it.i];
    //         // ...
    //     }
    // }
    var body = 'var a=it.array;' + 'for(it.i=0;it.i<a.length;++it.i){' + 'var c=a[it.i];' + indiePath + '}';
    fastPath = useDt ? Function('it', 'dt', body) : Function('it', body);
    indiePath = Function('c', 'dt', indiePath);
  }

  return function (iterator, dt) {
    try {
      fastPath(iterator, dt);
    } catch (e) {
      // slow path
      cc._throw(e);

      var array = iterator.array;

      if (ensureFlag) {
        array[iterator.i]._objFlags |= ensureFlag;
      }

      ++iterator.i; // invoke next callback

      for (; iterator.i < array.length; ++iterator.i) {
        try {
          indiePath(array[iterator.i], dt);
        } catch (e) {
          cc._throw(e);

          if (ensureFlag) {
            array[iterator.i]._objFlags |= ensureFlag;
          }
        }
      }
    }
  };
}

var invokeStart = CC_SUPPORT_JIT ? createInvokeImpl('c.start();c._objFlags|=' + IsStartCalled, false, IsStartCalled) : createInvokeImpl(function (c) {
  c.start();
  c._objFlags |= IsStartCalled;
}, false, IsStartCalled, function (iterator) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    var comp = array[iterator.i];
    comp.start();
    comp._objFlags |= IsStartCalled;
  }
});
var invokeUpdate = CC_SUPPORT_JIT ? createInvokeImpl('c.update(dt)', true) : createInvokeImpl(function (c, dt) {
  c.update(dt);
}, true, undefined, function (iterator, dt) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    array[iterator.i].update(dt);
  }
});
var invokeLateUpdate = CC_SUPPORT_JIT ? createInvokeImpl('c.lateUpdate(dt)', true) : createInvokeImpl(function (c, dt) {
  c.lateUpdate(dt);
}, true, undefined, function (iterator, dt) {
  var array = iterator.array;

  for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
    array[iterator.i].lateUpdate(dt);
  }
});
/**
 * The Manager for Component's life-cycle methods.
 */

function ctor() {
  // invokers
  this.startInvoker = new OneOffInvoker(invokeStart);
  this.updateInvoker = new ReusableInvoker(invokeUpdate);
  this.lateUpdateInvoker = new ReusableInvoker(invokeLateUpdate); // components deferred to next frame

  this._deferredComps = []; // during a loop

  this._updating = false;
}

var ComponentScheduler = cc.Class({
  ctor: ctor,
  unscheduleAll: ctor,
  statics: {
    LifeCycleInvoker: LifeCycleInvoker,
    OneOffInvoker: OneOffInvoker,
    createInvokeImpl: createInvokeImpl,
    invokeOnEnable: CC_EDITOR ? function (iterator) {
      var compScheduler = cc.director._compScheduler;
      var array = iterator.array;

      for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
        var comp = array[iterator.i];

        if (comp._enabled) {
          callOnEnableInTryCatch(comp);
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (!deactivatedDuringOnEnable) {
            compScheduler._onEnabled(comp);
          }
        }
      }
    } : function (iterator) {
      var compScheduler = cc.director._compScheduler;
      var array = iterator.array;

      for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
        var comp = array[iterator.i];

        if (comp._enabled) {
          comp.onEnable();
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (!deactivatedDuringOnEnable) {
            compScheduler._onEnabled(comp);
          }
        }
      }
    }
  },
  _onEnabled: function _onEnabled(comp) {
    cc.director.getScheduler().resumeTarget(comp);
    comp._objFlags |= IsOnEnableCalled; // schedule

    if (this._updating) {
      this._deferredComps.push(comp);
    } else {
      this._scheduleImmediate(comp);
    }
  },
  _onDisabled: function _onDisabled(comp) {
    cc.director.getScheduler().pauseTarget(comp);
    comp._objFlags &= ~IsOnEnableCalled; // cancel schedule task

    var index = this._deferredComps.indexOf(comp);

    if (index >= 0) {
      jsArray.fastRemoveAt(this._deferredComps, index);
      return;
    } // unschedule


    if (comp.start && !(comp._objFlags & IsStartCalled)) {
      this.startInvoker.remove(comp);
    }

    if (comp.update) {
      this.updateInvoker.remove(comp);
    }

    if (comp.lateUpdate) {
      this.lateUpdateInvoker.remove(comp);
    }
  },
  enableComp: CC_EDITOR ? function (comp, invoker) {
    if (cc.engine.isPlaying || comp.constructor._executeInEditMode) {
      if (!(comp._objFlags & IsOnEnableCalled)) {
        if (comp.onEnable) {
          if (invoker) {
            invoker.add(comp);
            enableInEditor(comp);
            return;
          } else {
            callOnEnableInTryCatch(comp);
            var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

            if (deactivatedDuringOnEnable) {
              return;
            }
          }
        }

        this._onEnabled(comp);
      }
    }

    enableInEditor(comp);
  } : function (comp, invoker) {
    if (!(comp._objFlags & IsOnEnableCalled)) {
      if (comp.onEnable) {
        if (invoker) {
          invoker.add(comp);
          return;
        } else {
          comp.onEnable();
          var deactivatedDuringOnEnable = !comp.node._activeInHierarchy;

          if (deactivatedDuringOnEnable) {
            return;
          }
        }
      }

      this._onEnabled(comp);
    }
  },
  disableComp: CC_EDITOR ? function (comp) {
    if (cc.engine.isPlaying || comp.constructor._executeInEditMode) {
      if (comp._objFlags & IsOnEnableCalled) {
        if (comp.onDisable) {
          callOnDisableInTryCatch(comp);
        }

        this._onDisabled(comp);
      }
    }

    if (comp._objFlags & IsEditorOnEnableCalled) {
      cc.engine.emit('component-disabled', comp.uuid);
      comp._objFlags &= ~IsEditorOnEnableCalled;
    }
  } : function (comp) {
    if (comp._objFlags & IsOnEnableCalled) {
      if (comp.onDisable) {
        comp.onDisable();
      }

      this._onDisabled(comp);
    }
  },
  _scheduleImmediate: function _scheduleImmediate(comp) {
    if (typeof comp.start === 'function' && !(comp._objFlags & IsStartCalled)) {
      this.startInvoker.add(comp);
    }

    if (typeof comp.update === 'function') {
      this.updateInvoker.add(comp);
    }

    if (typeof comp.lateUpdate === 'function') {
      this.lateUpdateInvoker.add(comp);
    }
  },
  _deferredSchedule: function _deferredSchedule() {
    var comps = this._deferredComps;

    for (var i = 0, len = comps.length; i < len; i++) {
      this._scheduleImmediate(comps[i]);
    }

    comps.length = 0;
  },
  // Call new registered start schedule immediately since last time start phase calling in this frame
  // See cocos-creator/2d-tasks/issues/256
  _startForNewComps: function _startForNewComps() {
    if (this._deferredComps.length > 0) {
      this._deferredSchedule();

      this.startInvoker.invoke();
    }
  },
  startPhase: function startPhase() {
    // Start of this frame
    this._updating = true; // call start

    this.startInvoker.invoke(); // Start components of new activated nodes during start

    this._startForNewComps(); // if (CC_PREVIEW) {
    //     try {
    //         this.startInvoker.invoke();
    //     }
    //     catch (e) {
    //         // prevent start from getting into infinite loop
    //         this.startInvoker._neg.array.length = 0;
    //         this.startInvoker._zero.array.length = 0;
    //         this.startInvoker._pos.array.length = 0;
    //         throw e;
    //     }
    // }
    // else {
    //     this.startInvoker.invoke();
    // }

  },
  updatePhase: function updatePhase(dt) {
    this.updateInvoker.invoke(dt);
  },
  lateUpdatePhase: function lateUpdatePhase(dt) {
    this.lateUpdateInvoker.invoke(dt); // End of this frame

    this._updating = false; // Start components of new activated nodes during update and lateUpdate
    // The start callback will be invoked immediately,
    // update and lateUpdate callback will be running in the next frame

    this._startForNewComps();
  }
});
module.exports = ComponentScheduler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2NvbXBvbmVudC1zY2hlZHVsZXIuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIkZsYWdzIiwianNBcnJheSIsImFycmF5IiwiSXNTdGFydENhbGxlZCIsIklzT25FbmFibGVDYWxsZWQiLCJJc0VkaXRvck9uRW5hYmxlQ2FsbGVkIiwiY2FsbGVyRnVuY3RvciIsIkNDX0VESVRPUiIsInRyeUNhdGNoRnVuY3Rvcl9FRElUT1IiLCJjYWxsT25FbmFibGVJblRyeUNhdGNoIiwiY2FsbE9uRGlzYWJsZUluVHJ5Q2F0Y2giLCJzb3J0ZWRJbmRleCIsImNvbXAiLCJvcmRlciIsImNvbnN0cnVjdG9yIiwiX2V4ZWN1dGlvbk9yZGVyIiwiaWQiLCJfaWQiLCJsIiwiaCIsImxlbmd0aCIsIm0iLCJ0ZXN0IiwidGVzdE9yZGVyIiwidGVzdElkIiwic3RhYmxlUmVtb3ZlSW5hY3RpdmUiLCJpdGVyYXRvciIsImZsYWdUb0NsZWFyIiwibmV4dCIsImkiLCJfZW5hYmxlZCIsIm5vZGUiLCJfYWN0aXZlSW5IaWVyYXJjaHkiLCJyZW1vdmVBdCIsIl9vYmpGbGFncyIsIkxpZmVDeWNsZUludm9rZXIiLCJjYyIsIkNsYXNzIiwiX19jdG9yX18iLCJpbnZva2VGdW5jIiwiSXRlcmF0b3IiLCJNdXRhYmxlRm9yd2FyZEl0ZXJhdG9yIiwiX3plcm8iLCJfbmVnIiwiX3BvcyIsIkNDX1RFU1QiLCJhc3NlcnQiLCJfaW52b2tlIiwic3RhdGljcyIsImFkZCIsInJlbW92ZSIsImludm9rZSIsImNvbXBhcmVPcmRlciIsImEiLCJiIiwiT25lT2ZmSW52b2tlciIsInB1c2giLCJmYXN0UmVtb3ZlIiwiY2FuY2VsSW5hY3RpdmUiLCJjb21wc05lZyIsInNvcnQiLCJjb21wc1BvcyIsIlJldXNhYmxlSW52b2tlciIsInNwbGljZSIsIkNDX0RFViIsImVycm9yIiwiZHQiLCJlbmFibGVJbkVkaXRvciIsImVuZ2luZSIsImVtaXQiLCJ1dWlkIiwiY3JlYXRlSW52b2tlSW1wbCIsImluZGllUGF0aCIsInVzZUR0IiwiZW5zdXJlRmxhZyIsImZhc3RQYXRoIiwiQ0NfU1VQUE9SVF9KSVQiLCJib2R5IiwiRnVuY3Rpb24iLCJlIiwiX3Rocm93IiwiaW52b2tlU3RhcnQiLCJjIiwic3RhcnQiLCJpbnZva2VVcGRhdGUiLCJ1cGRhdGUiLCJ1bmRlZmluZWQiLCJpbnZva2VMYXRlVXBkYXRlIiwibGF0ZVVwZGF0ZSIsImN0b3IiLCJzdGFydEludm9rZXIiLCJ1cGRhdGVJbnZva2VyIiwibGF0ZVVwZGF0ZUludm9rZXIiLCJfZGVmZXJyZWRDb21wcyIsIl91cGRhdGluZyIsIkNvbXBvbmVudFNjaGVkdWxlciIsInVuc2NoZWR1bGVBbGwiLCJpbnZva2VPbkVuYWJsZSIsImNvbXBTY2hlZHVsZXIiLCJkaXJlY3RvciIsIl9jb21wU2NoZWR1bGVyIiwiZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSIsIl9vbkVuYWJsZWQiLCJvbkVuYWJsZSIsImdldFNjaGVkdWxlciIsInJlc3VtZVRhcmdldCIsIl9zY2hlZHVsZUltbWVkaWF0ZSIsIl9vbkRpc2FibGVkIiwicGF1c2VUYXJnZXQiLCJpbmRleCIsImluZGV4T2YiLCJmYXN0UmVtb3ZlQXQiLCJlbmFibGVDb21wIiwiaW52b2tlciIsImlzUGxheWluZyIsIl9leGVjdXRlSW5FZGl0TW9kZSIsImRpc2FibGVDb21wIiwib25EaXNhYmxlIiwiX2RlZmVycmVkU2NoZWR1bGUiLCJjb21wcyIsImxlbiIsIl9zdGFydEZvck5ld0NvbXBzIiwic3RhcnRQaGFzZSIsInVwZGF0ZVBoYXNlIiwibGF0ZVVwZGF0ZVBoYXNlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBQSxPQUFPLENBQUMsb0JBQUQsQ0FBUDs7QUFDQSxJQUFJQyxLQUFLLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUFQLENBQStCQyxLQUEzQzs7QUFDQSxJQUFJ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Q0gsR0EvTDZCO0FBaU05QkUsRUFBQUEsV0FqTThCLHVCQWlNakJ6RCxFQWpNaUIsRUFpTWI7QUFDYixTQUFLeUIsYUFBTCxDQUFtQnhDLE1BQW5CLENBQTBCZSxFQUExQjtBQUNILEdBbk02QjtBQXFNOUIwRCxFQUFBQSxlQXJNOEIsMkJBcU1iMUQsRUFyTWEsRUFxTVQ7QUFDakIsU0FBSzBCLGlCQUFMLENBQXVCekMsTUFBdkIsQ0FBOEJlLEVBQTlCLEVBRGlCLENBR2pCOztBQUNBLFNBQUs0QixTQUFMLEdBQWlCLEtBQWpCLENBSmlCLENBTWpCO0FBQ0E7QUFDQTs7QUFDQSxTQUFLMkIsaUJBQUw7QUFDSDtBQS9NNkIsQ0FBVCxDQUF6QjtBQWtOQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0Isa0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5yZXF1aXJlKCcuL3BsYXRmb3JtL0NDQ2xhc3MnKTtcbnZhciBGbGFncyA9IHJlcXVpcmUoJy4vcGxhdGZvcm0vQ0NPYmplY3QnKS5GbGFncztcbnZhciBqc0FycmF5ID0gcmVxdWlyZSgnLi9wbGF0Zm9ybS9qcycpLmFycmF5O1xuXG52YXIgSXNTdGFydENhbGxlZCA9IEZsYWdzLklzU3RhcnRDYWxsZWQ7XG52YXIgSXNPbkVuYWJsZUNhbGxlZCA9IEZsYWdzLklzT25FbmFibGVDYWxsZWQ7XG52YXIgSXNFZGl0b3JPbkVuYWJsZUNhbGxlZCA9IEZsYWdzLklzRWRpdG9yT25FbmFibGVDYWxsZWQ7XG5cbnZhciBjYWxsZXJGdW5jdG9yID0gQ0NfRURJVE9SICYmIHJlcXVpcmUoJy4vdXRpbHMvbWlzYycpLnRyeUNhdGNoRnVuY3Rvcl9FRElUT1I7XG52YXIgY2FsbE9uRW5hYmxlSW5UcnlDYXRjaCA9IENDX0VESVRPUiAmJiBjYWxsZXJGdW5jdG9yKCdvbkVuYWJsZScpO1xudmFyIGNhbGxPbkRpc2FibGVJblRyeUNhdGNoID0gQ0NfRURJVE9SICYmIGNhbGxlckZ1bmN0b3IoJ29uRGlzYWJsZScpO1xuXG5mdW5jdGlvbiBzb3J0ZWRJbmRleCAoYXJyYXksIGNvbXApIHtcbiAgICB2YXIgb3JkZXIgPSBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcbiAgICB2YXIgaWQgPSBjb21wLl9pZDtcbiAgICBmb3IgKHZhciBsID0gMCwgaCA9IGFycmF5Lmxlbmd0aCAtIDEsIG0gPSBoID4+PiAxO1xuICAgICAgICAgbCA8PSBoO1xuICAgICAgICAgbSA9IChsICsgaCkgPj4+IDFcbiAgICApIHtcbiAgICAgICAgdmFyIHRlc3QgPSBhcnJheVttXTtcbiAgICAgICAgdmFyIHRlc3RPcmRlciA9IHRlc3QuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xuICAgICAgICBpZiAodGVzdE9yZGVyID4gb3JkZXIpIHtcbiAgICAgICAgICAgIGggPSBtIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0ZXN0T3JkZXIgPCBvcmRlcikge1xuICAgICAgICAgICAgbCA9IG0gKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRlc3RJZCA9IHRlc3QuX2lkO1xuICAgICAgICAgICAgaWYgKHRlc3RJZCA+IGlkKSB7XG4gICAgICAgICAgICAgICAgaCA9IG0gLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGVzdElkIDwgaWQpIHtcbiAgICAgICAgICAgICAgICBsID0gbSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gfmw7XG59XG5cbi8vIHJlbW92ZSBkaXNhYmxlZCBhbmQgbm90IGludm9rZWQgY29tcG9uZW50IGZyb20gYXJyYXlcbmZ1bmN0aW9uIHN0YWJsZVJlbW92ZUluYWN0aXZlIChpdGVyYXRvciwgZmxhZ1RvQ2xlYXIpIHtcbiAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICB2YXIgbmV4dCA9IGl0ZXJhdG9yLmkgKyAxO1xuICAgIHdoaWxlIChuZXh0IDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjb21wID0gYXJyYXlbbmV4dF07XG4gICAgICAgIGlmIChjb21wLl9lbmFibGVkICYmIGNvbXAubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgICsrbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLnJlbW92ZUF0KG5leHQpO1xuICAgICAgICAgICAgaWYgKGZsYWdUb0NsZWFyKSB7XG4gICAgICAgICAgICAgICAgY29tcC5fb2JqRmxhZ3MgJj0gfmZsYWdUb0NsZWFyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBUaGlzIGNsYXNzIGNvbnRhaW5zIHNvbWUgcXVldWVzIHVzZWQgdG8gaW52b2tlIGxpZmUtY3ljbGUgbWV0aG9kcyBieSBzY3JpcHQgZXhlY3V0aW9uIG9yZGVyXG52YXIgTGlmZUN5Y2xlSW52b2tlciA9IGNjLkNsYXNzKHtcbiAgICBfX2N0b3JfXyAoaW52b2tlRnVuYykge1xuICAgICAgICB2YXIgSXRlcmF0b3IgPSBqc0FycmF5Lk11dGFibGVGb3J3YXJkSXRlcmF0b3I7XG4gICAgICAgIC8vIGNvbXBvbmVudHMgd2hpY2ggcHJpb3JpdHkgPT09IDAgKGRlZmF1bHQpXG4gICAgICAgIHRoaXMuX3plcm8gPSBuZXcgSXRlcmF0b3IoW10pO1xuICAgICAgICAvLyBjb21wb25lbnRzIHdoaWNoIHByaW9yaXR5IDwgMFxuICAgICAgICB0aGlzLl9uZWcgPSBuZXcgSXRlcmF0b3IoW10pO1xuICAgICAgICAvLyBjb21wb25lbnRzIHdoaWNoIHByaW9yaXR5ID4gMFxuICAgICAgICB0aGlzLl9wb3MgPSBuZXcgSXRlcmF0b3IoW10pO1xuXG4gICAgICAgIGlmIChDQ19URVNUKSB7XG4gICAgICAgICAgICBjYy5hc3NlcnQodHlwZW9mIGludm9rZUZ1bmMgPT09ICdmdW5jdGlvbicsICdpbnZva2VGdW5jIG11c3QgYmUgdHlwZSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ludm9rZSA9IGludm9rZUZ1bmM7XG4gICAgfSxcbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIHN0YWJsZVJlbW92ZUluYWN0aXZlXG4gICAgfSxcbiAgICBhZGQ6IG51bGwsXG4gICAgcmVtb3ZlOiBudWxsLFxuICAgIGludm9rZTogbnVsbCxcbn0pO1xuXG5mdW5jdGlvbiBjb21wYXJlT3JkZXIgKGEsIGIpIHtcbiAgICByZXR1cm4gYS5jb25zdHJ1Y3Rvci5fZXhlY3V0aW9uT3JkZXIgLSBiLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcbn1cblxuLy8gZm9yIG9uTG9hZDogc29ydCBvbmNlIGFsbCBjb21wb25lbnRzIHJlZ2lzdGVyZWQsIGludm9rZSBvbmNlXG52YXIgT25lT2ZmSW52b2tlciA9IGNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBMaWZlQ3ljbGVJbnZva2VyLFxuICAgIGFkZCAoY29tcCkge1xuICAgICAgICB2YXIgb3JkZXIgPSBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcbiAgICAgICAgKG9yZGVyID09PSAwID8gdGhpcy5femVybyA6IChvcmRlciA8IDAgPyB0aGlzLl9uZWcgOiB0aGlzLl9wb3MpKS5hcnJheS5wdXNoKGNvbXApO1xuICAgIH0sXG4gICAgcmVtb3ZlIChjb21wKSB7XG4gICAgICAgIHZhciBvcmRlciA9IGNvbXAuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xuICAgICAgICAob3JkZXIgPT09IDAgPyB0aGlzLl96ZXJvIDogKG9yZGVyIDwgMCA/IHRoaXMuX25lZyA6IHRoaXMuX3BvcykpLmZhc3RSZW1vdmUoY29tcCk7XG4gICAgfSxcbiAgICBjYW5jZWxJbmFjdGl2ZSAoZmxhZ1RvQ2xlYXIpIHtcbiAgICAgICAgc3RhYmxlUmVtb3ZlSW5hY3RpdmUodGhpcy5femVybywgZmxhZ1RvQ2xlYXIpO1xuICAgICAgICBzdGFibGVSZW1vdmVJbmFjdGl2ZSh0aGlzLl9uZWcsIGZsYWdUb0NsZWFyKTtcbiAgICAgICAgc3RhYmxlUmVtb3ZlSW5hY3RpdmUodGhpcy5fcG9zLCBmbGFnVG9DbGVhcik7XG4gICAgfSxcbiAgICBpbnZva2UgKCkge1xuICAgICAgICB2YXIgY29tcHNOZWcgPSB0aGlzLl9uZWc7XG4gICAgICAgIGlmIChjb21wc05lZy5hcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb21wc05lZy5hcnJheS5zb3J0KGNvbXBhcmVPcmRlcik7XG4gICAgICAgICAgICB0aGlzLl9pbnZva2UoY29tcHNOZWcpO1xuICAgICAgICAgICAgY29tcHNOZWcuYXJyYXkubGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ludm9rZSh0aGlzLl96ZXJvKTtcbiAgICAgICAgdGhpcy5femVyby5hcnJheS5sZW5ndGggPSAwO1xuXG4gICAgICAgIHZhciBjb21wc1BvcyA9IHRoaXMuX3BvcztcbiAgICAgICAgaWYgKGNvbXBzUG9zLmFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbXBzUG9zLmFycmF5LnNvcnQoY29tcGFyZU9yZGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2ludm9rZShjb21wc1Bvcyk7XG4gICAgICAgICAgICBjb21wc1Bvcy5hcnJheS5sZW5ndGggPSAwO1xuICAgICAgICB9XG4gICAgfSxcbn0pO1xuXG4vLyBmb3IgdXBkYXRlOiBzb3J0IGV2ZXJ5IHRpbWUgbmV3IGNvbXBvbmVudCByZWdpc3RlcmVkLCBpbnZva2UgbWFueSB0aW1lc1xudmFyIFJldXNhYmxlSW52b2tlciA9IGNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBMaWZlQ3ljbGVJbnZva2VyLFxuICAgIGFkZCAoY29tcCkge1xuICAgICAgICB2YXIgb3JkZXIgPSBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRpb25PcmRlcjtcbiAgICAgICAgaWYgKG9yZGVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLl96ZXJvLmFycmF5LnB1c2goY29tcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBvcmRlciA8IDAgPyB0aGlzLl9uZWcuYXJyYXkgOiB0aGlzLl9wb3MuYXJyYXk7XG4gICAgICAgICAgICB2YXIgaSA9IHNvcnRlZEluZGV4KGFycmF5LCBjb21wKTtcbiAgICAgICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgICAgIGFycmF5LnNwbGljZSh+aSwgMCwgY29tcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChDQ19ERVYpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcignY29tcG9uZW50IGFscmVhZHkgYWRkZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlIChjb21wKSB7XG4gICAgICAgIHZhciBvcmRlciA9IGNvbXAuY29uc3RydWN0b3IuX2V4ZWN1dGlvbk9yZGVyO1xuICAgICAgICBpZiAob3JkZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3plcm8uZmFzdFJlbW92ZShjb21wKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG9yZGVyIDwgMCA/IHRoaXMuX25lZyA6IHRoaXMuX3BvcztcbiAgICAgICAgICAgIHZhciBpID0gc29ydGVkSW5kZXgoaXRlcmF0b3IuYXJyYXksIGNvbXApO1xuICAgICAgICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICAgICAgICAgIGl0ZXJhdG9yLnJlbW92ZUF0KGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBpbnZva2UgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9uZWcuYXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5faW52b2tlKHRoaXMuX25lZywgZHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW52b2tlKHRoaXMuX3plcm8sIGR0KTtcblxuICAgICAgICBpZiAodGhpcy5fcG9zLmFycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuX2ludm9rZSh0aGlzLl9wb3MsIGR0KTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuZnVuY3Rpb24gZW5hYmxlSW5FZGl0b3IgKGNvbXApIHtcbiAgICBpZiAoIShjb21wLl9vYmpGbGFncyAmIElzRWRpdG9yT25FbmFibGVDYWxsZWQpKSB7XG4gICAgICAgIGNjLmVuZ2luZS5lbWl0KCdjb21wb25lbnQtZW5hYmxlZCcsIGNvbXAudXVpZCk7XG4gICAgICAgIGNvbXAuX29iakZsYWdzIHw9IElzRWRpdG9yT25FbmFibGVDYWxsZWQ7XG4gICAgfVxufVxuXG4vLyByZXR1cm4gZnVuY3Rpb24gdG8gc2ltcGx5IGNhbGwgZWFjaCBjb21wb25lbnQgd2l0aCB0cnkgY2F0Y2ggcHJvdGVjdGlvblxuZnVuY3Rpb24gY3JlYXRlSW52b2tlSW1wbCAoaW5kaWVQYXRoLCB1c2VEdCwgZW5zdXJlRmxhZywgZmFzdFBhdGgpIHtcbiAgICBpZiAoQ0NfU1VQUE9SVF9KSVQpIHtcbiAgICAgICAgLy8gZnVuY3Rpb24gKGl0KSB7XG4gICAgICAgIC8vICAgICB2YXIgYSA9IGl0LmFycmF5O1xuICAgICAgICAvLyAgICAgZm9yIChpdC5pID0gMDsgaXQuaSA8IGEubGVuZ3RoOyArK2l0LmkpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIgYyA9IGFbaXQuaV07XG4gICAgICAgIC8vICAgICAgICAgLy8gLi4uXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgbGV0IGJvZHkgPSAndmFyIGE9aXQuYXJyYXk7JyArXG4gICAgICAgICAgICAgICAgICAgJ2ZvcihpdC5pPTA7aXQuaTxhLmxlbmd0aDsrK2l0LmkpeycgK1xuICAgICAgICAgICAgICAgICAgICd2YXIgYz1hW2l0LmldOycgK1xuICAgICAgICAgICAgICAgICAgIGluZGllUGF0aCArXG4gICAgICAgICAgICAgICAgICAgJ30nO1xuICAgICAgICBmYXN0UGF0aCA9IHVzZUR0ID8gRnVuY3Rpb24oJ2l0JywgJ2R0JywgYm9keSkgOiBGdW5jdGlvbignaXQnLCBib2R5KTtcbiAgICAgICAgaW5kaWVQYXRoID0gRnVuY3Rpb24oJ2MnLCAnZHQnLCBpbmRpZVBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKGl0ZXJhdG9yLCBkdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmFzdFBhdGgoaXRlcmF0b3IsIGR0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gc2xvdyBwYXRoXG4gICAgICAgICAgICBjYy5fdGhyb3coZSk7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICAgICAgICAgIGlmIChlbnN1cmVGbGFnKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlbaXRlcmF0b3IuaV0uX29iakZsYWdzIHw9IGVuc3VyZUZsYWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICArK2l0ZXJhdG9yLmk7ICAgLy8gaW52b2tlIG5leHQgY2FsbGJhY2tcbiAgICAgICAgICAgIGZvciAoOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpbmRpZVBhdGgoYXJyYXlbaXRlcmF0b3IuaV0sIGR0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuX3Rocm93KGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW5zdXJlRmxhZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlbaXRlcmF0b3IuaV0uX29iakZsYWdzIHw9IGVuc3VyZUZsYWc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG52YXIgaW52b2tlU3RhcnQgPSBDQ19TVVBQT1JUX0pJVCA/XG4gICAgY3JlYXRlSW52b2tlSW1wbCgnYy5zdGFydCgpO2MuX29iakZsYWdzfD0nICsgSXNTdGFydENhbGxlZCwgZmFsc2UsIElzU3RhcnRDYWxsZWQpIDpcbiAgICBjcmVhdGVJbnZva2VJbXBsKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICBjLnN0YXJ0KCk7XG4gICAgICAgICAgICBjLl9vYmpGbGFncyB8PSBJc1N0YXJ0Q2FsbGVkO1xuICAgICAgICB9LFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgSXNTdGFydENhbGxlZCxcbiAgICAgICAgZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wID0gYXJyYXlbaXRlcmF0b3IuaV07XG4gICAgICAgICAgICAgICAgY29tcC5zdGFydCgpO1xuICAgICAgICAgICAgICAgIGNvbXAuX29iakZsYWdzIHw9IElzU3RhcnRDYWxsZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xudmFyIGludm9rZVVwZGF0ZSA9IENDX1NVUFBPUlRfSklUID9cbiAgICBjcmVhdGVJbnZva2VJbXBsKCdjLnVwZGF0ZShkdCknLCB0cnVlKSA6XG4gICAgY3JlYXRlSW52b2tlSW1wbChmdW5jdGlvbiAoYywgZHQpIHtcbiAgICAgICAgICAgIGMudXBkYXRlKGR0KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBmdW5jdGlvbiAoaXRlcmF0b3IsIGR0KSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2l0ZXJhdG9yLmldLnVwZGF0ZShkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICApO1xudmFyIGludm9rZUxhdGVVcGRhdGUgPSBDQ19TVVBQT1JUX0pJVCA/XG4gICAgY3JlYXRlSW52b2tlSW1wbCgnYy5sYXRlVXBkYXRlKGR0KScsIHRydWUpIDpcbiAgICBjcmVhdGVJbnZva2VJbXBsKGZ1bmN0aW9uIChjLCBkdCkge1xuICAgICAgICAgICAgYy5sYXRlVXBkYXRlKGR0KTtcbiAgICAgICAgfSxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBmdW5jdGlvbiAoaXRlcmF0b3IsIGR0KSB7XG4gICAgICAgICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICAgICAgICAgIGZvciAoaXRlcmF0b3IuaSA9IDA7IGl0ZXJhdG9yLmkgPCBhcnJheS5sZW5ndGg7ICsraXRlcmF0b3IuaSkge1xuICAgICAgICAgICAgICAgIGFycmF5W2l0ZXJhdG9yLmldLmxhdGVVcGRhdGUoZHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKTtcbi8qKlxuICogVGhlIE1hbmFnZXIgZm9yIENvbXBvbmVudCdzIGxpZmUtY3ljbGUgbWV0aG9kcy5cbiAqL1xuZnVuY3Rpb24gY3RvciAoKSB7XG4gICAgLy8gaW52b2tlcnNcbiAgICB0aGlzLnN0YXJ0SW52b2tlciA9IG5ldyBPbmVPZmZJbnZva2VyKGludm9rZVN0YXJ0KTtcbiAgICB0aGlzLnVwZGF0ZUludm9rZXIgPSBuZXcgUmV1c2FibGVJbnZva2VyKGludm9rZVVwZGF0ZSk7XG4gICAgdGhpcy5sYXRlVXBkYXRlSW52b2tlciA9IG5ldyBSZXVzYWJsZUludm9rZXIoaW52b2tlTGF0ZVVwZGF0ZSk7XG5cbiAgICAvLyBjb21wb25lbnRzIGRlZmVycmVkIHRvIG5leHQgZnJhbWVcbiAgICB0aGlzLl9kZWZlcnJlZENvbXBzID0gW107XG5cbiAgICAvLyBkdXJpbmcgYSBsb29wXG4gICAgdGhpcy5fdXBkYXRpbmcgPSBmYWxzZTtcbn1cbnZhciBDb21wb25lbnRTY2hlZHVsZXIgPSBjYy5DbGFzcyh7XG4gICAgY3RvcjogY3RvcixcbiAgICB1bnNjaGVkdWxlQWxsOiBjdG9yLFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBMaWZlQ3ljbGVJbnZva2VyLFxuICAgICAgICBPbmVPZmZJbnZva2VyLFxuICAgICAgICBjcmVhdGVJbnZva2VJbXBsLFxuICAgICAgICBpbnZva2VPbkVuYWJsZTogQ0NfRURJVE9SID8gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgY29tcFNjaGVkdWxlciA9IGNjLmRpcmVjdG9yLl9jb21wU2NoZWR1bGVyO1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuYXJyYXk7XG4gICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcCA9IGFycmF5W2l0ZXJhdG9yLmldO1xuICAgICAgICAgICAgICAgIGlmIChjb21wLl9lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxPbkVuYWJsZUluVHJ5Q2F0Y2goY29tcCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlID0gIWNvbXAubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcFNjaGVkdWxlci5fb25FbmFibGVkKGNvbXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IDogZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICB2YXIgY29tcFNjaGVkdWxlciA9IGNjLmRpcmVjdG9yLl9jb21wU2NoZWR1bGVyO1xuICAgICAgICAgICAgdmFyIGFycmF5ID0gaXRlcmF0b3IuYXJyYXk7XG4gICAgICAgICAgICBmb3IgKGl0ZXJhdG9yLmkgPSAwOyBpdGVyYXRvci5pIDwgYXJyYXkubGVuZ3RoOyArK2l0ZXJhdG9yLmkpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcCA9IGFycmF5W2l0ZXJhdG9yLmldO1xuICAgICAgICAgICAgICAgIGlmIChjb21wLl9lbmFibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXAub25FbmFibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlYWN0aXZhdGVkRHVyaW5nT25FbmFibGUgPSAhY29tcC5ub2RlLl9hY3RpdmVJbkhpZXJhcmNoeTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wU2NoZWR1bGVyLl9vbkVuYWJsZWQoY29tcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX29uRW5hYmxlZCAoY29tcCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5yZXN1bWVUYXJnZXQoY29tcCk7XG4gICAgICAgIGNvbXAuX29iakZsYWdzIHw9IElzT25FbmFibGVDYWxsZWQ7XG5cbiAgICAgICAgLy8gc2NoZWR1bGVcbiAgICAgICAgaWYgKHRoaXMuX3VwZGF0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZlcnJlZENvbXBzLnB1c2goY29tcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZUltbWVkaWF0ZShjb21wKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25EaXNhYmxlZCAoY29tcCkge1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5wYXVzZVRhcmdldChjb21wKTtcbiAgICAgICAgY29tcC5fb2JqRmxhZ3MgJj0gfklzT25FbmFibGVDYWxsZWQ7XG5cbiAgICAgICAgLy8gY2FuY2VsIHNjaGVkdWxlIHRhc2tcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fZGVmZXJyZWRDb21wcy5pbmRleE9mKGNvbXApO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAganNBcnJheS5mYXN0UmVtb3ZlQXQodGhpcy5fZGVmZXJyZWRDb21wcywgaW5kZXgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdW5zY2hlZHVsZVxuICAgICAgICBpZiAoY29tcC5zdGFydCAmJiAhKGNvbXAuX29iakZsYWdzICYgSXNTdGFydENhbGxlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRJbnZva2VyLnJlbW92ZShjb21wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcC51cGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW52b2tlci5yZW1vdmUoY29tcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXAubGF0ZVVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5sYXRlVXBkYXRlSW52b2tlci5yZW1vdmUoY29tcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZW5hYmxlQ29tcDogQ0NfRURJVE9SID8gZnVuY3Rpb24gKGNvbXAsIGludm9rZXIpIHtcbiAgICAgICAgaWYgKGNjLmVuZ2luZS5pc1BsYXlpbmcgfHwgY29tcC5jb25zdHJ1Y3Rvci5fZXhlY3V0ZUluRWRpdE1vZGUpIHtcbiAgICAgICAgICAgIGlmICghKGNvbXAuX29iakZsYWdzICYgSXNPbkVuYWJsZUNhbGxlZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcC5vbkVuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW52b2tlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW52b2tlci5hZGQoY29tcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVJbkVkaXRvcihjb21wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxPbkVuYWJsZUluVHJ5Q2F0Y2goY29tcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWFjdGl2YXRlZER1cmluZ09uRW5hYmxlID0gIWNvbXAubm9kZS5fYWN0aXZlSW5IaWVyYXJjaHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9vbkVuYWJsZWQoY29tcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZW5hYmxlSW5FZGl0b3IoY29tcCk7XG4gICAgfSA6IGZ1bmN0aW9uIChjb21wLCBpbnZva2VyKSB7XG4gICAgICAgIGlmICghKGNvbXAuX29iakZsYWdzICYgSXNPbkVuYWJsZUNhbGxlZCkpIHtcbiAgICAgICAgICAgIGlmIChjb21wLm9uRW5hYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludm9rZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlci5hZGQoY29tcCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXAub25FbmFibGUoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSA9ICFjb21wLm5vZGUuX2FjdGl2ZUluSGllcmFyY2h5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVhY3RpdmF0ZWREdXJpbmdPbkVuYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fb25FbmFibGVkKGNvbXApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRpc2FibGVDb21wOiBDQ19FRElUT1IgPyBmdW5jdGlvbiAoY29tcCkge1xuICAgICAgICBpZiAoY2MuZW5naW5lLmlzUGxheWluZyB8fCBjb21wLmNvbnN0cnVjdG9yLl9leGVjdXRlSW5FZGl0TW9kZSkge1xuICAgICAgICAgICAgaWYgKGNvbXAuX29iakZsYWdzICYgSXNPbkVuYWJsZUNhbGxlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wLm9uRGlzYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsT25EaXNhYmxlSW5UcnlDYXRjaChjb21wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fb25EaXNhYmxlZChjb21wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcC5fb2JqRmxhZ3MgJiBJc0VkaXRvck9uRW5hYmxlQ2FsbGVkKSB7XG4gICAgICAgICAgICBjYy5lbmdpbmUuZW1pdCgnY29tcG9uZW50LWRpc2FibGVkJywgY29tcC51dWlkKTtcbiAgICAgICAgICAgIGNvbXAuX29iakZsYWdzICY9IH5Jc0VkaXRvck9uRW5hYmxlQ2FsbGVkO1xuICAgICAgICB9XG4gICAgfSA6IGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICAgIGlmIChjb21wLl9vYmpGbGFncyAmIElzT25FbmFibGVDYWxsZWQpIHtcbiAgICAgICAgICAgIGlmIChjb21wLm9uRGlzYWJsZSkge1xuICAgICAgICAgICAgICAgIGNvbXAub25EaXNhYmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbkRpc2FibGVkKGNvbXApO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9zY2hlZHVsZUltbWVkaWF0ZSAoY29tcCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXAuc3RhcnQgPT09ICdmdW5jdGlvbicgJiYgIShjb21wLl9vYmpGbGFncyAmIElzU3RhcnRDYWxsZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SW52b2tlci5hZGQoY29tcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBjb21wLnVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnZva2VyLmFkZChjb21wKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNvbXAubGF0ZVVwZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5sYXRlVXBkYXRlSW52b2tlci5hZGQoY29tcCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2RlZmVycmVkU2NoZWR1bGUgKCkge1xuICAgICAgICB2YXIgY29tcHMgPSB0aGlzLl9kZWZlcnJlZENvbXBzO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY29tcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlSW1tZWRpYXRlKGNvbXBzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBjb21wcy5sZW5ndGggPSAwO1xuICAgIH0sXG5cbiAgICAvLyBDYWxsIG5ldyByZWdpc3RlcmVkIHN0YXJ0IHNjaGVkdWxlIGltbWVkaWF0ZWx5IHNpbmNlIGxhc3QgdGltZSBzdGFydCBwaGFzZSBjYWxsaW5nIGluIHRoaXMgZnJhbWVcbiAgICAvLyBTZWUgY29jb3MtY3JlYXRvci8yZC10YXNrcy9pc3N1ZXMvMjU2XG4gICAgX3N0YXJ0Rm9yTmV3Q29tcHMgKCkge1xuICAgICAgICBpZiAodGhpcy5fZGVmZXJyZWRDb21wcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWZlcnJlZFNjaGVkdWxlKCk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SW52b2tlci5pbnZva2UoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydFBoYXNlICgpIHtcbiAgICAgICAgLy8gU3RhcnQgb2YgdGhpcyBmcmFtZVxuICAgICAgICB0aGlzLl91cGRhdGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gY2FsbCBzdGFydFxuICAgICAgICB0aGlzLnN0YXJ0SW52b2tlci5pbnZva2UoKTtcblxuICAgICAgICAvLyBTdGFydCBjb21wb25lbnRzIG9mIG5ldyBhY3RpdmF0ZWQgbm9kZXMgZHVyaW5nIHN0YXJ0XG4gICAgICAgIHRoaXMuX3N0YXJ0Rm9yTmV3Q29tcHMoKTtcblxuICAgICAgICAvLyBpZiAoQ0NfUFJFVklFVykge1xuICAgICAgICAvLyAgICAgdHJ5IHtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnN0YXJ0SW52b2tlci5pbnZva2UoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vICAgICAgICAgLy8gcHJldmVudCBzdGFydCBmcm9tIGdldHRpbmcgaW50byBpbmZpbml0ZSBsb29wXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuX25lZy5hcnJheS5sZW5ndGggPSAwO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuc3RhcnRJbnZva2VyLl96ZXJvLmFycmF5Lmxlbmd0aCA9IDA7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zdGFydEludm9rZXIuX3Bvcy5hcnJheS5sZW5ndGggPSAwO1xuICAgICAgICAvLyAgICAgICAgIHRocm93IGU7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0YXJ0SW52b2tlci5pbnZva2UoKTtcbiAgICAgICAgLy8gfVxuICAgIH0sXG5cbiAgICB1cGRhdGVQaGFzZSAoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbnZva2VyLmludm9rZShkdCk7XG4gICAgfSxcblxuICAgIGxhdGVVcGRhdGVQaGFzZSAoZHQpIHtcbiAgICAgICAgdGhpcy5sYXRlVXBkYXRlSW52b2tlci5pbnZva2UoZHQpO1xuXG4gICAgICAgIC8vIEVuZCBvZiB0aGlzIGZyYW1lXG4gICAgICAgIHRoaXMuX3VwZGF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU3RhcnQgY29tcG9uZW50cyBvZiBuZXcgYWN0aXZhdGVkIG5vZGVzIGR1cmluZyB1cGRhdGUgYW5kIGxhdGVVcGRhdGVcbiAgICAgICAgLy8gVGhlIHN0YXJ0IGNhbGxiYWNrIHdpbGwgYmUgaW52b2tlZCBpbW1lZGlhdGVseSxcbiAgICAgICAgLy8gdXBkYXRlIGFuZCBsYXRlVXBkYXRlIGNhbGxiYWNrIHdpbGwgYmUgcnVubmluZyBpbiB0aGUgbmV4dCBmcmFtZVxuICAgICAgICB0aGlzLl9zdGFydEZvck5ld0NvbXBzKCk7XG4gICAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFNjaGVkdWxlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9