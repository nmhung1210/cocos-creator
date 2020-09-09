
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/trans-pool/node-mem-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
var MemPool = require('./mem-pool');

var NodeMemPool = function NodeMemPool(unitClass) {
  MemPool.call(this, unitClass);
};

(function () {
  var Super = function Super() {};

  Super.prototype = MemPool.prototype;
  NodeMemPool.prototype = new Super();
})();

var proto = NodeMemPool.prototype;

proto._initNative = function () {
  this._nativeMemPool = new renderer.NodeMemPool();
};

proto._destroyUnit = function (unitID) {
  MemPool.prototype._destroyUnit.call(this, unitID);

  if (CC_JSB && CC_NATIVERENDERER) {
    this._nativeMemPool.removeNodeData(unitID);
  }
};

module.exports = NodeMemPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3RyYW5zLXBvb2wvbm9kZS1tZW0tcG9vbC5qcyJdLCJuYW1lcyI6WyJNZW1Qb29sIiwicmVxdWlyZSIsIk5vZGVNZW1Qb29sIiwidW5pdENsYXNzIiwiY2FsbCIsIlN1cGVyIiwicHJvdG90eXBlIiwicHJvdG8iLCJfaW5pdE5hdGl2ZSIsIl9uYXRpdmVNZW1Qb29sIiwicmVuZGVyZXIiLCJfZGVzdHJveVVuaXQiLCJ1bml0SUQiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsInJlbW92ZU5vZGVEYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFDQSxJQUFJQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFVQyxTQUFWLEVBQXFCO0FBQ25DSCxFQUFBQSxPQUFPLENBQUNJLElBQVIsQ0FBYSxJQUFiLEVBQW1CRCxTQUFuQjtBQUNILENBRkQ7O0FBSUEsQ0FBQyxZQUFVO0FBQ1AsTUFBSUUsS0FBSyxHQUFHLFNBQVJBLEtBQVEsR0FBVSxDQUFFLENBQXhCOztBQUNBQSxFQUFBQSxLQUFLLENBQUNDLFNBQU4sR0FBa0JOLE9BQU8sQ0FBQ00sU0FBMUI7QUFDQUosRUFBQUEsV0FBVyxDQUFDSSxTQUFaLEdBQXdCLElBQUlELEtBQUosRUFBeEI7QUFDSCxDQUpEOztBQU1BLElBQUlFLEtBQUssR0FBR0wsV0FBVyxDQUFDSSxTQUF4Qjs7QUFDQUMsS0FBSyxDQUFDQyxXQUFOLEdBQW9CLFlBQVk7QUFDNUIsT0FBS0MsY0FBTCxHQUFzQixJQUFJQyxRQUFRLENBQUNSLFdBQWIsRUFBdEI7QUFDSCxDQUZEOztBQUlBSyxLQUFLLENBQUNJLFlBQU4sR0FBcUIsVUFBVUMsTUFBVixFQUFrQjtBQUNuQ1osRUFBQUEsT0FBTyxDQUFDTSxTQUFSLENBQWtCSyxZQUFsQixDQUErQlAsSUFBL0IsQ0FBb0MsSUFBcEMsRUFBMENRLE1BQTFDOztBQUNBLE1BQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0IsU0FBS0wsY0FBTCxDQUFvQk0sY0FBcEIsQ0FBbUNILE1BQW5DO0FBQ0g7QUFDSixDQUxEOztBQU9BSSxNQUFNLENBQUNDLE9BQVAsR0FBaUJmLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmxldCBNZW1Qb29sID0gcmVxdWlyZSgnLi9tZW0tcG9vbCcpO1xubGV0IE5vZGVNZW1Qb29sID0gZnVuY3Rpb24gKHVuaXRDbGFzcykge1xuICAgIE1lbVBvb2wuY2FsbCh0aGlzLCB1bml0Q2xhc3MpO1xufTtcblxuKGZ1bmN0aW9uKCl7XG4gICAgbGV0IFN1cGVyID0gZnVuY3Rpb24oKXt9O1xuICAgIFN1cGVyLnByb3RvdHlwZSA9IE1lbVBvb2wucHJvdG90eXBlO1xuICAgIE5vZGVNZW1Qb29sLnByb3RvdHlwZSA9IG5ldyBTdXBlcigpO1xufSkoKTtcblxubGV0IHByb3RvID0gTm9kZU1lbVBvb2wucHJvdG90eXBlO1xucHJvdG8uX2luaXROYXRpdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fbmF0aXZlTWVtUG9vbCA9IG5ldyByZW5kZXJlci5Ob2RlTWVtUG9vbCgpO1xufTtcblxucHJvdG8uX2Rlc3Ryb3lVbml0ID0gZnVuY3Rpb24gKHVuaXRJRCkge1xuICAgIE1lbVBvb2wucHJvdG90eXBlLl9kZXN0cm95VW5pdC5jYWxsKHRoaXMsIHVuaXRJRCk7XG4gICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICB0aGlzLl9uYXRpdmVNZW1Qb29sLnJlbW92ZU5vZGVEYXRhKHVuaXRJRCk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBOb2RlTWVtUG9vbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==