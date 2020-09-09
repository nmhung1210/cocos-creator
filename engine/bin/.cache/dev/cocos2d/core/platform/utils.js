
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/utils.js';
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
// TODO - merge with misc.js
var js = require('./js');

module.exports = {
  contains: function contains(refNode, otherNode) {
    if (typeof refNode.contains == 'function') {
      return refNode.contains(otherNode);
    } else if (typeof refNode.compareDocumentPosition == 'function') {
      return !!(refNode.compareDocumentPosition(otherNode) & 16);
    } else {
      var node = otherNode.parentNode;

      if (node) {
        do {
          if (node === refNode) {
            return true;
          } else {
            node = node.parentNode;
          }
        } while (node !== null);
      }

      return false;
    }
  },
  isDomNode: typeof window === 'object' && (typeof Node === 'function' ? function (obj) {
    // If "TypeError: Right-hand side of 'instanceof' is not callback" is thrown,
    // it should because window.Node was overwritten.
    return obj instanceof Node;
  } : function (obj) {
    return obj && typeof obj === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string';
  }),
  callInNextTick: CC_EDITOR ? function (callback, p1, p2) {
    if (callback) {
      process.nextTick(function () {
        callback(p1, p2);
      });
    }
  } : function (callback, p1, p2) {
    if (callback) {
      setTimeout(function () {
        callback(p1, p2);
      }, 0);
    }
  }
};

if (CC_DEV) {
  ///**
  // * @param {Object} obj
  // * @return {Boolean} is {} ?
  // */
  module.exports.isPlainEmptyObj_DEV = function (obj) {
    if (!obj || obj.constructor !== Object) {
      return false;
    }

    return js.isEmptyObject(obj);
  };

  module.exports.cloneable_DEV = function (obj) {
    return obj && typeof obj.clone === 'function' && (obj.constructor && obj.constructor.prototype.hasOwnProperty('clone') || obj.hasOwnProperty('clone'));
  };
}

if (CC_TEST) {
  // editor mocks using in unit tests
  if (typeof Editor === 'undefined') {
    window.Editor = {
      UuidUtils: {
        NonUuidMark: '.',
        uuid: function uuid() {
          return '' + (new Date().getTime() + Math.random());
        }
      }
    };
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL3V0aWxzLmpzIl0sIm5hbWVzIjpbImpzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJjb250YWlucyIsInJlZk5vZGUiLCJvdGhlck5vZGUiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsIm5vZGUiLCJwYXJlbnROb2RlIiwiaXNEb21Ob2RlIiwid2luZG93IiwiTm9kZSIsIm9iaiIsIm5vZGVUeXBlIiwibm9kZU5hbWUiLCJjYWxsSW5OZXh0VGljayIsIkNDX0VESVRPUiIsImNhbGxiYWNrIiwicDEiLCJwMiIsInByb2Nlc3MiLCJuZXh0VGljayIsInNldFRpbWVvdXQiLCJDQ19ERVYiLCJpc1BsYWluRW1wdHlPYmpfREVWIiwiY29uc3RydWN0b3IiLCJPYmplY3QiLCJpc0VtcHR5T2JqZWN0IiwiY2xvbmVhYmxlX0RFViIsImNsb25lIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJDQ19URVNUIiwiRWRpdG9yIiwiVXVpZFV0aWxzIiwiTm9uVXVpZE1hcmsiLCJ1dWlkIiwiRGF0ZSIsImdldFRpbWUiLCJNYXRoIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7QUFDQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQWxCOztBQUVBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkMsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjtBQUNwQyxRQUFHLE9BQU9ELE9BQU8sQ0FBQ0QsUUFBZixJQUEyQixVQUE5QixFQUF5QztBQUNyQyxhQUFPQyxPQUFPLENBQUNELFFBQVIsQ0FBaUJFLFNBQWpCLENBQVA7QUFDSCxLQUZELE1BRU0sSUFBRyxPQUFPRCxPQUFPLENBQUNFLHVCQUFmLElBQTBDLFVBQTdDLEVBQTBEO0FBQzVELGFBQU8sQ0FBQyxF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QUFDSDtBQUpNO0FBREMsS0FBaEI7QUFRSDtBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vLyBUT0RPIC0gbWVyZ2Ugd2l0aCBtaXNjLmpzXG5jb25zdCBqcyA9IHJlcXVpcmUoJy4vanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY29udGFpbnM6IGZ1bmN0aW9uIChyZWZOb2RlLCBvdGhlck5vZGUpIHtcbiAgICAgICAgaWYodHlwZW9mIHJlZk5vZGUuY29udGFpbnMgPT0gJ2Z1bmN0aW9uJyl7XG4gICAgICAgICAgICByZXR1cm4gcmVmTm9kZS5jb250YWlucyhvdGhlck5vZGUpO1xuICAgICAgICB9ZWxzZSBpZih0eXBlb2YgcmVmTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbiA9PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgcmV0dXJuICEhKHJlZk5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ob3RoZXJOb2RlKSAmIDE2KTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBvdGhlck5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PT0gcmVmTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobm9kZSAhPT1udWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0RvbU5vZGU6IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmICh0eXBlb2YgTm9kZSA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgIC8vIElmIFwiVHlwZUVycm9yOiBSaWdodC1oYW5kIHNpZGUgb2YgJ2luc3RhbmNlb2YnIGlzIG5vdCBjYWxsYmFja1wiIGlzIHRocm93bixcbiAgICAgICAgICAgIC8vIGl0IHNob3VsZCBiZWNhdXNlIHdpbmRvdy5Ob2RlIHdhcyBvdmVyd3JpdHRlbi5cbiAgICAgICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBOb2RlO1xuICAgICAgICB9IDpcbiAgICAgICAgZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIG9iaiAmJlxuICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAgICAgICAgdHlwZW9mIG9iai5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSAnc3RyaW5nJztcbiAgICAgICAgfVxuICAgICksXG5cbiAgICBjYWxsSW5OZXh0VGljazogQ0NfRURJVE9SID9cbiAgICAgICAgZnVuY3Rpb24gKGNhbGxiYWNrLCBwMSwgcDIpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwMSwgcDIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIDpcbiAgICAgICAgKFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmdW5jdGlvbiAoY2FsbGJhY2ssIHAxLCBwMikge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHAxLCBwMik7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxufTtcblxuaWYgKENDX0RFVikge1xuICAgIC8vLyoqXG4gICAgLy8gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gICAgLy8gKiBAcmV0dXJuIHtCb29sZWFufSBpcyB7fSA/XG4gICAgLy8gKi9cbiAgICBtb2R1bGUuZXhwb3J0cy5pc1BsYWluRW1wdHlPYmpfREVWID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoIW9iaiB8fCBvYmouY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgXG4gICAgICAgIHJldHVybiBqcy5pc0VtcHR5T2JqZWN0KG9iaik7XG4gICAgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5jbG9uZWFibGVfREVWID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICYmXG4gICAgICAgICAgICAgICB0eXBlb2Ygb2JqLmNsb25lID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICAgICAoIChvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSgnY2xvbmUnKSkgfHwgb2JqLmhhc093blByb3BlcnR5KCdjbG9uZScpICk7XG4gICAgfTtcbn1cblxuaWYgKENDX1RFU1QpIHtcbiAgICAvLyBlZGl0b3IgbW9ja3MgdXNpbmcgaW4gdW5pdCB0ZXN0c1xuICAgIGlmICh0eXBlb2YgRWRpdG9yID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cuRWRpdG9yID0ge1xuICAgICAgICAgICAgVXVpZFV0aWxzOiB7XG4gICAgICAgICAgICAgICAgTm9uVXVpZE1hcms6ICcuJyxcbiAgICAgICAgICAgICAgICB1dWlkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnJyArICgobmV3IERhdGUoKSkuZ2V0VGltZSgpICsgTWF0aC5yYW5kb20oKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9