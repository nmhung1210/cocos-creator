
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-script.js';
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
var _require = require('./utilities'),
    parseParameters = _require.parseParameters;

var downloaded = {};

function downloadScript(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete; // no need to load script again


  if (downloaded[url]) {
    return onComplete && onComplete(null);
  }

  var d = document,
      s = document.createElement('script');

  if (window.location.protocol !== 'file:') {
    s.crossOrigin = 'anonymous';
  }

  s.async = options.async;
  s.src = url;

  function loadHandler() {
    s.parentNode.removeChild(s);
    s.removeEventListener('load', loadHandler, false);
    s.removeEventListener('error', errorHandler, false);
    downloaded[url] = true;
    onComplete && onComplete(null);
  }

  function errorHandler() {
    s.parentNode.removeChild(s);
    s.removeEventListener('load', loadHandler, false);
    s.removeEventListener('error', errorHandler, false);
    onComplete && onComplete(new Error(cc.debug.getError(4928, url)));
  }

  s.addEventListener('load', loadHandler, false);
  s.addEventListener('error', errorHandler, false);
  d.body.appendChild(s);
}

module.exports = downloadScript;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZG93bmxvYWQtc2NyaXB0LmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJwYXJzZVBhcmFtZXRlcnMiLCJkb3dubG9hZGVkIiwiZG93bmxvYWRTY3JpcHQiLCJ1cmwiLCJvcHRpb25zIiwib25Db21wbGV0ZSIsInVuZGVmaW5lZCIsImQiLCJkb2N1bWVudCIsInMiLCJjcmVhdGVFbGVtZW50Iiwid2luZG93IiwibG9jYXRpb24iLCJwcm90b2NvbCIsImNyb3NzT3JpZ2luIiwiYXN5bmMiLCJzcmMiLCJsb2FkSGFuZGxlciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlcnJvckhhbmRsZXIiLCJFcnJvciIsImNjIiwiZGVidWciLCJnZXRFcnJvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXdCNEJBLE9BQU8sQ0FBQyxhQUFEO0lBQTNCQywyQkFBQUE7O0FBRVIsSUFBTUMsVUFBVSxHQUFHLEVBQW5COztBQUVBLFNBQVNDLGNBQVQsQ0FBeUJDLEdBQXpCLEVBQThCQyxPQUE5QixFQUF1Q0MsVUFBdkMsRUFBbUQ7QUFBQSx5QkFDakJMLGVBQWUsQ0FBQ0ksT0FBRCxFQUFVRSxTQUFWLEVBQXFCRCxVQUFyQixDQURFO0FBQUEsTUFDekNELE9BRHlDLG9CQUN6Q0EsT0FEeUM7QUFBQSxNQUNoQ0MsVUFEZ0Msb0JBQ2hDQSxVQURnQyxFQUcvQzs7O0FBQ0EsTUFBSUosVUFBVSxDQUFDRSxHQUFELENBQWQsRUFBcUI7QUFDakIsV0FBT0UsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBRCxDQUEvQjtBQUNIOztBQUVELE1BQUlFLENBQUMsR0FBR0MsUUFBUjtBQUFBLE1BQWtCQyxDQUFDLEdBQUdELFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixRQUF2QixDQUF0Qjs7QUFFQSxNQUFJQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQWhCLEtBQTZCLE9BQWpDLEVBQTBDO0FBQ3RDSixJQUFBQSxDQUFDLENBQUNLLFdBQUYsR0FBZ0IsV0FBaEI7QUFDSDs7QUFFREwsRUFBQUEsQ0FBQyxDQUFDTSxLQUFGLEdBQVVYLE9BQU8sQ0FBQ1csS0FBbEI7QUFDQU4sRUFBQUEsQ0FBQyxDQUFDTyxHQUFGLEdBQVFiLEdBQVI7O0FBQ0EsV0FBU2MsV0FBVCxHQUF3QjtBQUNwQlIsSUFBQUEsQ0FBQyxDQUFDUyxVQUFGLENBQWFDLFdBQWIsQ0FBeUJWLENBQXpCO0FBQ0FBLElBQUFBLENBQUMsQ0FBQ1csbUJBQUYsQ0FBc0IsTUFBdEIsRUFBOEJILFdBQTlCLEVBQTJDLEtBQTNDO0FBQ0FSLElBQUFBLENBQUMsQ0FBQ1csbUJBQUYsQ0FBc0IsT0FBdEIsRUFBK0JDLFlBQS9CLEVBQTZDLEtBQTdDO0FBQ0FwQixJQUFBQSxVQUFVLENBQUNFLEdBQUQsQ0FBVixHQUFrQixJQUFsQjtBQUNBRSxJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELENBQXhCO0FBQ0g7O0FBRUQsV0FBU2dCLFlBQVQsR0FBd0I7QUFDcEJaLElBQUFBLENBQUMsQ0FBQ1MsVUFBRixDQUFhQyxXQUFiLENBQXlCVixDQUF6QjtBQUNBQSxJQUFBQSxDQUFDLENBQUNXLG1CQUFGLENBQXNCLE1BQXRCLEVBQThCSCxXQUE5QixFQUEyQyxLQUEzQztBQUNBUixJQUFBQSxDQUFDLENBQUNXLG1CQUFGLENBQXNCLE9BQXRCLEVBQStCQyxZQUEvQixFQUE2QyxLQUE3QztBQUNBaEIsSUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBSWlCLEtBQUosQ0FBVUMsRUFBRSxDQUFDQyxLQUFILENBQVNDLFFBQVQsQ0FBa0IsSUFBbEIsRUFBd0J0QixHQUF4QixDQUFWLENBQUQsQ0FBeEI7QUFDSDs7QUFFRE0sRUFBQUEsQ0FBQyxDQUFDaUIsZ0JBQUYsQ0FBbUIsTUFBbkIsRUFBMkJULFdBQTNCLEVBQXdDLEtBQXhDO0FBQ0FSLEVBQUFBLENBQUMsQ0FBQ2lCLGdCQUFGLENBQW1CLE9BQW5CLEVBQTRCTCxZQUE1QixFQUEwQyxLQUExQztBQUNBZCxFQUFBQSxDQUFDLENBQUNvQixJQUFGLENBQU9DLFdBQVAsQ0FBbUJuQixDQUFuQjtBQUNIOztBQUVEb0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCNUIsY0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHsgcGFyc2VQYXJhbWV0ZXJzIH0gPSByZXF1aXJlKCcuL3V0aWxpdGllcycpO1xuXG5jb25zdCBkb3dubG9hZGVkID0ge307XG5cbmZ1bmN0aW9uIGRvd25sb2FkU2NyaXB0ICh1cmwsIG9wdGlvbnMsIG9uQ29tcGxldGUpIHtcbiAgICB2YXIgeyBvcHRpb25zLCBvbkNvbXBsZXRlIH0gPSBwYXJzZVBhcmFtZXRlcnMob3B0aW9ucywgdW5kZWZpbmVkLCBvbkNvbXBsZXRlKTtcblxuICAgIC8vIG5vIG5lZWQgdG8gbG9hZCBzY3JpcHQgYWdhaW5cbiAgICBpZiAoZG93bmxvYWRlZFt1cmxdKSB7XG4gICAgICAgIHJldHVybiBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobnVsbCk7XG4gICAgfVxuXG4gICAgdmFyIGQgPSBkb2N1bWVudCwgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2ZpbGU6Jykge1xuICAgICAgICBzLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgfVxuXG4gICAgcy5hc3luYyA9IG9wdGlvbnMuYXN5bmM7XG4gICAgcy5zcmMgPSB1cmw7XG4gICAgZnVuY3Rpb24gbG9hZEhhbmRsZXIgKCkge1xuICAgICAgICBzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocyk7XG4gICAgICAgIHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgZG93bmxvYWRlZFt1cmxdID0gdHJ1ZTtcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9ySGFuZGxlcigpIHtcbiAgICAgICAgcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHMpO1xuICAgICAgICBzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICBzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IoY2MuZGVidWcuZ2V0RXJyb3IoNDkyOCwgdXJsKSkpO1xuICAgIH1cbiAgICBcbiAgICBzLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBsb2FkSGFuZGxlciwgZmFsc2UpO1xuICAgIHMuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvckhhbmRsZXIsIGZhbHNlKTtcbiAgICBkLmJvZHkuYXBwZW5kQ2hpbGQocyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG93bmxvYWRTY3JpcHQ7Il0sInNvdXJjZVJvb3QiOiIvIn0=