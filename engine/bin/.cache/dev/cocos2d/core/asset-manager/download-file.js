
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-file.js';
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

function downloadFile(url, options, onProgress, onComplete) {
  var _parseParameters = parseParameters(options, onProgress, onComplete),
      options = _parseParameters.options,
      onProgress = _parseParameters.onProgress,
      onComplete = _parseParameters.onComplete;

  var xhr = new XMLHttpRequest(),
      errInfo = 'download failed: ' + url + ', status: ';
  xhr.open('GET', url, true);
  if (options.responseType !== undefined) xhr.responseType = options.responseType;
  if (options.withCredentials !== undefined) xhr.withCredentials = options.withCredentials;
  if (options.mimeType !== undefined && xhr.overrideMimeType) xhr.overrideMimeType(options.mimeType);
  if (options.timeout !== undefined) xhr.timeout = options.timeout;

  if (options.header) {
    for (var header in options.header) {
      xhr.setRequestHeader(header, options.header[header]);
    }
  }

  xhr.onload = function () {
    if (xhr.status === 200 || xhr.status === 0) {
      onComplete && onComplete(null, xhr.response);
    } else {
      onComplete && onComplete(new Error(errInfo + xhr.status + '(no response)'));
    }
  };

  if (onProgress) {
    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        onProgress(e.loaded, e.total);
      }
    };
  }

  xhr.onerror = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(error)'));
  };

  xhr.ontimeout = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(time out)'));
  };

  xhr.onabort = function () {
    onComplete && onComplete(new Error(errInfo + xhr.status + '(abort)'));
  };

  xhr.send(null);
  return xhr;
}

module.exports = downloadFile;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZG93bmxvYWQtZmlsZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwicGFyc2VQYXJhbWV0ZXJzIiwiZG93bmxvYWRGaWxlIiwidXJsIiwib3B0aW9ucyIsIm9uUHJvZ3Jlc3MiLCJvbkNvbXBsZXRlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJlcnJJbmZvIiwib3BlbiIsInJlc3BvbnNlVHlwZSIsInVuZGVmaW5lZCIsIndpdGhDcmVkZW50aWFscyIsIm1pbWVUeXBlIiwib3ZlcnJpZGVNaW1lVHlwZSIsInRpbWVvdXQiLCJoZWFkZXIiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJFcnJvciIsIm9ucHJvZ3Jlc3MiLCJlIiwibGVuZ3RoQ29tcHV0YWJsZSIsImxvYWRlZCIsInRvdGFsIiwib25lcnJvciIsIm9udGltZW91dCIsIm9uYWJvcnQiLCJzZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF3QjRCQSxPQUFPLENBQUMsYUFBRDtJQUEzQkMsMkJBQUFBOztBQUVSLFNBQVNDLFlBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCQyxPQUE1QixFQUFxQ0MsVUFBckMsRUFBaURDLFVBQWpELEVBQTZEO0FBQUEseUJBQ2ZMLGVBQWUsQ0FBQ0csT0FBRCxFQUFVQyxVQUFWLEVBQXNCQyxVQUF0QixDQURBO0FBQUEsTUFDbkRGLE9BRG1ELG9CQUNuREEsT0FEbUQ7QUFBQSxNQUMxQ0MsVUFEMEMsb0JBQzFDQSxVQUQwQztBQUFBLE1BQzlCQyxVQUQ4QixvQkFDOUJBLFVBRDhCOztBQUd6RCxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWO0FBQUEsTUFBZ0NDLE9BQU8sR0FBRyxzQkFBc0JOLEdBQXRCLEdBQTRCLFlBQXRFO0FBRUFJLEVBQUFBLEdBQUcsQ0FBQ0csSUFBSixDQUFTLEtBQVQsRUFBZ0JQLEdBQWhCLEVBQXFCLElBQXJCO0FBRUEsTUFBSUMsT0FBTyxDQUFDTyxZQUFSLEtBQXlCQyxTQUE3QixFQUF3Q0wsR0FBRyxDQUFDSSxZQUFKLEdBQW1CUCxPQUFPLENBQUNPLFlBQTNCO0FBQ3hDLE1BQUlQLE9BQU8sQ0FBQ1MsZUFBUixLQUE0QkQsU0FBaEMsRUFBMkNMLEdBQUcsQ0FBQ00sZUFBSixHQUFzQlQsT0FBTyxDQUFDUyxlQUE5QjtBQUMzQyxNQUFJVCxPQUFPLENBQUNVLFFBQVIsS0FBcUJGLFNBQXJCLElBQWtDTCxHQUFHLENBQUNRLGdCQUExQyxFQUE2RFIsR0FBRyxDQUFDUSxnQkFBSixDQUFxQlgsT0FBTyxDQUFDVSxRQUE3QjtBQUM3RCxNQUFJVixPQUFPLENBQUNZLE9BQVIsS0FBb0JKLFNBQXhCLEVBQW1DTCxHQUFHLENBQUNTLE9BQUosR0FBY1osT0FBTyxDQUFDWSxPQUF0Qjs7QUFFbkMsTUFBSVosT0FBTyxDQUFDYSxNQUFaLEVBQW9CO0FBQ2hCLFNBQUssSUFBSUEsTUFBVCxJQUFtQmIsT0FBTyxDQUFDYSxNQUEzQixFQUFtQztBQUMvQlYsTUFBQUEsR0FBRyxDQUFDVyxnQkFBSixDQUFxQkQsTUFBckIsRUFBNkJiLE9BQU8sQ0FBQ2EsTUFBUixDQUFlQSxNQUFmLENBQTdCO0FBQ0g7QUFDSjs7QUFFRFYsRUFBQUEsR0FBRyxDQUFDWSxNQUFKLEdBQWEsWUFBWTtBQUNyQixRQUFLWixHQUFHLENBQUNhLE1BQUosS0FBZSxHQUFmLElBQXNCYixHQUFHLENBQUNhLE1BQUosS0FBZSxDQUExQyxFQUE4QztBQUMxQ2QsTUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBRCxFQUFPQyxHQUFHLENBQUNjLFFBQVgsQ0FBeEI7QUFDSCxLQUZELE1BRU87QUFDSGYsTUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBSWdCLEtBQUosQ0FBVWIsT0FBTyxHQUFHRixHQUFHLENBQUNhLE1BQWQsR0FBdUIsZUFBakMsQ0FBRCxDQUF4QjtBQUNIO0FBRUosR0FQRDs7QUFTQSxNQUFJZixVQUFKLEVBQWdCO0FBQ1pFLElBQUFBLEdBQUcsQ0FBQ2dCLFVBQUosR0FBaUIsVUFBVUMsQ0FBVixFQUFhO0FBQzFCLFVBQUlBLENBQUMsQ0FBQ0MsZ0JBQU4sRUFBd0I7QUFDcEJwQixRQUFBQSxVQUFVLENBQUNtQixDQUFDLENBQUNFLE1BQUgsRUFBV0YsQ0FBQyxDQUFDRyxLQUFiLENBQVY7QUFDSDtBQUNKLEtBSkQ7QUFLSDs7QUFFRHBCLEVBQUFBLEdBQUcsQ0FBQ3FCLE9BQUosR0FBYyxZQUFVO0FBQ3BCdEIsSUFBQUEsVUFBVSxJQUFJQSxVQUFVLENBQUMsSUFBSWdCLEtBQUosQ0FBVWIsT0FBTyxHQUFHRixHQUFHLENBQUNhLE1BQWQsR0FBdUIsU0FBakMsQ0FBRCxDQUF4QjtBQUNILEdBRkQ7O0FBSUFiLEVBQUFBLEdBQUcsQ0FBQ3NCLFNBQUosR0FBZ0IsWUFBVTtBQUN0QnZCLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUlnQixLQUFKLENBQVViLE9BQU8sR0FBR0YsR0FBRyxDQUFDYSxNQUFkLEdBQXVCLFlBQWpDLENBQUQsQ0FBeEI7QUFDSCxHQUZEOztBQUlBYixFQUFBQSxHQUFHLENBQUN1QixPQUFKLEdBQWMsWUFBVTtBQUNwQnhCLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUlnQixLQUFKLENBQVViLE9BQU8sR0FBR0YsR0FBRyxDQUFDYSxNQUFkLEdBQXVCLFNBQWpDLENBQUQsQ0FBeEI7QUFDSCxHQUZEOztBQUlBYixFQUFBQSxHQUFHLENBQUN3QixJQUFKLENBQVMsSUFBVDtBQUVBLFNBQU94QixHQUFQO0FBQ0g7O0FBRUR5QixNQUFNLENBQUNDLE9BQVAsR0FBaUIvQixZQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IHsgcGFyc2VQYXJhbWV0ZXJzIH0gPSByZXF1aXJlKCcuL3V0aWxpdGllcycpO1xuXG5mdW5jdGlvbiBkb3dubG9hZEZpbGUgKHVybCwgb3B0aW9ucywgb25Qcm9ncmVzcywgb25Db21wbGV0ZSkge1xuICAgIHZhciB7IG9wdGlvbnMsIG9uUHJvZ3Jlc3MsIG9uQ29tcGxldGUgfSA9IHBhcnNlUGFyYW1ldGVycyhvcHRpb25zLCBvblByb2dyZXNzLCBvbkNvbXBsZXRlKTtcblxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgZXJySW5mbyA9ICdkb3dubG9hZCBmYWlsZWQ6ICcgKyB1cmwgKyAnLCBzdGF0dXM6ICc7XG5cbiAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcblxuICAgIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSAhPT0gdW5kZWZpbmVkKSB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XG4gICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzICE9PSB1bmRlZmluZWQpIHhoci53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscztcbiAgICBpZiAob3B0aW9ucy5taW1lVHlwZSAhPT0gdW5kZWZpbmVkICYmIHhoci5vdmVycmlkZU1pbWVUeXBlICkgeGhyLm92ZXJyaWRlTWltZVR5cGUob3B0aW9ucy5taW1lVHlwZSk7XG4gICAgaWYgKG9wdGlvbnMudGltZW91dCAhPT0gdW5kZWZpbmVkKSB4aHIudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcblxuICAgIGlmIChvcHRpb25zLmhlYWRlcikge1xuICAgICAgICBmb3IgKHZhciBoZWFkZXIgaW4gb3B0aW9ucy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgb3B0aW9ucy5oZWFkZXJbaGVhZGVyXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIHhoci5zdGF0dXMgPT09IDIwMCB8fCB4aHIuc3RhdHVzID09PSAwICkge1xuICAgICAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIHhoci5yZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKGVyckluZm8gKyB4aHIuc3RhdHVzICsgJyhubyByZXNwb25zZSknKSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBpZiAob25Qcm9ncmVzcykge1xuICAgICAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyhlLmxvYWRlZCwgZS50b3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKGVyckluZm8gKyB4aHIuc3RhdHVzICsgJyhlcnJvciknKSk7XG4gICAgfTtcblxuICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUobmV3IEVycm9yKGVyckluZm8gKyB4aHIuc3RhdHVzICsgJyh0aW1lIG91dCknKSk7XG4gICAgfTtcblxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG5ldyBFcnJvcihlcnJJbmZvICsgeGhyLnN0YXR1cyArICcoYWJvcnQpJykpO1xuICAgIH07XG5cbiAgICB4aHIuc2VuZChudWxsKTtcbiAgICBcbiAgICByZXR1cm4geGhyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvd25sb2FkRmlsZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==