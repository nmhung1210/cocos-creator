
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/event/event-listeners.js';
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
var js = cc.js;

var CallbacksInvoker = require('../platform/callbacks-invoker'); // Extends CallbacksInvoker to handle and invoke event callbacks.


function EventListeners() {
  CallbacksInvoker.call(this);
}

js.extend(EventListeners, CallbacksInvoker);

EventListeners.prototype.emit = function (event, captureListeners) {
  var key = event.type;
  var list = this._callbackTable[key];

  if (list) {
    var rootInvoker = !list.isInvoking;
    list.isInvoking = true;
    var infos = list.callbackInfos;

    for (var i = 0, len = infos.length; i < len; ++i) {
      var info = infos[i];

      if (info && info.callback) {
        info.callback.call(info.target, event, captureListeners);

        if (event._propagationImmediateStopped) {
          break;
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

module.exports = EventListeners;

if (CC_TEST) {
  cc._Test.EventListeners = EventListeners;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2V2ZW50L2V2ZW50LWxpc3RlbmVycy5qcyJdLCJuYW1lcyI6WyJqcyIsImNjIiwiQ2FsbGJhY2tzSW52b2tlciIsInJlcXVpcmUiLCJFdmVudExpc3RlbmVycyIsImNhbGwiLCJleHRlbmQiLCJwcm90b3R5cGUiLCJlbWl0IiwiZXZlbnQiLCJjYXB0dXJlTGlzdGVuZXJzIiwia2V5IiwidHlwZSIsImxpc3QiLCJfY2FsbGJhY2tUYWJsZSIsInJvb3RJbnZva2VyIiwiaXNJbnZva2luZyIsImluZm9zIiwiY2FsbGJhY2tJbmZvcyIsImkiLCJsZW4iLCJsZW5ndGgiLCJpbmZvIiwiY2FsbGJhY2siLCJ0YXJnZXQiLCJfcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkIiwiY29udGFpbkNhbmNlbGVkIiwicHVyZ2VDYW5jZWxlZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJDQ19URVNUIiwiX1Rlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxFQUFFLEdBQUdDLEVBQUUsQ0FBQ0QsRUFBZDs7QUFDQSxJQUFNRSxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDLCtCQUFELENBQWhDLEVBRUE7OztBQUNBLFNBQVNDLGNBQVQsR0FBMkI7QUFDdkJGLEVBQUFBLGdCQUFnQixDQUFDRyxJQUFqQixDQUFzQixJQUF0QjtBQUNIOztBQUNETCxFQUFFLENBQUNNLE1BQUgsQ0FBVUYsY0FBVixFQUEwQkYsZ0JBQTFCOztBQUVBRSxjQUFjLENBQUNHLFNBQWYsQ0FBeUJDLElBQXpCLEdBQWdDLFVBQVVDLEtBQVYsRUFBaUJDLGdCQUFqQixFQUFtQztBQUMvRCxNQUFJQyxHQUFHLEdBQUdGLEtBQUssQ0FBQ0csSUFBaEI7QUFDQSxNQUFNQyxJQUFJLEdBQUcsS0FBS0MsY0FBTCxDQUFvQkgsR0FBcEIsQ0FBYjs7QUFDQSxNQUFJRSxJQUFKLEVBQVU7QUFDTixRQUFJRSxXQUFXLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDRyxVQUF4QjtBQUNBSCxJQUFBQSxJQUFJLENBQUNHLFVBQUwsR0FBa0IsSUFBbEI7QUFFQSxRQUFNQyxLQUFLLEdBQUdKLElBQUksQ0FBQ0ssYUFBbkI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBUixFQUFXQyxHQUFHLEdBQUdILEtBQUssQ0FBQ0ksTUFBNUIsRUFBb0NGLENBQUMsR0FBR0MsR0FBeEMsRUFBNkMsRUFBRUQsQ0FBL0MsRUFBa0Q7QUFDOUMsVUFBTUcsSUFBSSxHQUFHTCxLQUFLLENBQUNFLENBQUQsQ0FBbEI7O0FBQ0EsVUFBSUcsSUFBSSxJQUFJQSxJQUFJLENBQUNDLFFBQWpCLEVBQTJCO0FBQ3ZCRCxRQUFBQSxJQUFJLENBQUNDLFFBQUwsQ0FBY2xCLElBQWQsQ0FBbUJpQixJQUFJLENBQUNFLE1BQXhCLEVBQWdDZixLQUFoQyxFQUF1Q0MsZ0JBQXZDOztBQUNBLFlBQUlELEtBQUssQ0FBQ2dCLDRCQUFWLEVBQXdDO0FBQ3BDO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUlWLFdBQUosRUFBaUI7QUFDYkYsTUFBQUEsSUFBSSxDQUFDRyxVQUFMLEdBQWtCLEtBQWxCOztBQUNBLFVBQUlILElBQUksQ0FBQ2EsZUFBVCxFQUEwQjtBQUN0QmIsUUFBQUEsSUFBSSxDQUFDYyxhQUFMO0FBQ0g7QUFDSjtBQUNKO0FBQ0osQ0F6QkQ7O0FBMkJBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJ6QixjQUFqQjs7QUFDQSxJQUFJMEIsT0FBSixFQUFhO0FBQ1Q3QixFQUFBQSxFQUFFLENBQUM4QixLQUFILENBQVMzQixjQUFULEdBQTBCQSxjQUExQjtBQUNIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBqcyA9IGNjLmpzO1xuY29uc3QgQ2FsbGJhY2tzSW52b2tlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2NhbGxiYWNrcy1pbnZva2VyJyk7XG5cbi8vIEV4dGVuZHMgQ2FsbGJhY2tzSW52b2tlciB0byBoYW5kbGUgYW5kIGludm9rZSBldmVudCBjYWxsYmFja3MuXG5mdW5jdGlvbiBFdmVudExpc3RlbmVycyAoKSB7XG4gICAgQ2FsbGJhY2tzSW52b2tlci5jYWxsKHRoaXMpO1xufVxuanMuZXh0ZW5kKEV2ZW50TGlzdGVuZXJzLCBDYWxsYmFja3NJbnZva2VyKTtcblxuRXZlbnRMaXN0ZW5lcnMucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICBsZXQga2V5ID0gZXZlbnQudHlwZTtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5fY2FsbGJhY2tUYWJsZVtrZXldO1xuICAgIGlmIChsaXN0KSB7XG4gICAgICAgIGxldCByb290SW52b2tlciA9ICFsaXN0LmlzSW52b2tpbmc7XG4gICAgICAgIGxpc3QuaXNJbnZva2luZyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgaW5mb3MgPSBsaXN0LmNhbGxiYWNrSW5mb3M7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBpbmZvcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29uc3QgaW5mbyA9IGluZm9zW2ldO1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgaW5mby5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGluZm8uY2FsbGJhY2suY2FsbChpbmZvLnRhcmdldCwgZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5fcHJvcGFnYXRpb25JbW1lZGlhdGVTdG9wcGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290SW52b2tlcikge1xuICAgICAgICAgICAgbGlzdC5pc0ludm9raW5nID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAobGlzdC5jb250YWluQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnB1cmdlQ2FuY2VsZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRMaXN0ZW5lcnM7XG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLl9UZXN0LkV2ZW50TGlzdGVuZXJzID0gRXZlbnRMaXN0ZW5lcnM7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==