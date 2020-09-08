
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/download-dom-audio.js';
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
var __audioSupport = cc.sys.__audioSupport;

var _require = require('./utilities'),
    parseParameters = _require.parseParameters;

function downloadDomAudio(url, options, onComplete) {
  var _parseParameters = parseParameters(options, undefined, onComplete),
      options = _parseParameters.options,
      onComplete = _parseParameters.onComplete;

  var dom = document.createElement('audio');
  dom.src = url;

  var clearEvent = function clearEvent() {
    clearTimeout(timer);
    dom.removeEventListener("canplaythrough", success, false);
    dom.removeEventListener("error", failure, false);
    if (__audioSupport.USE_LOADER_EVENT) dom.removeEventListener(__audioSupport.USE_LOADER_EVENT, success, false);
  };

  var timer = setTimeout(function () {
    if (dom.readyState === 0) failure();else success();
  }, 8000);

  var success = function success() {
    clearEvent();
    onComplete && onComplete(null, dom);
  };

  var failure = function failure() {
    clearEvent();
    var message = 'load audio failure - ' + url;
    cc.log(message);
    onComplete && onComplete(new Error(message));
  };

  dom.addEventListener("canplaythrough", success, false);
  dom.addEventListener("error", failure, false);
  if (__audioSupport.USE_LOADER_EVENT) dom.addEventListener(__audioSupport.USE_LOADER_EVENT, success, false);
  return dom;
}

module.exports = downloadDomAudio;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZG93bmxvYWQtZG9tLWF1ZGlvLmpzIl0sIm5hbWVzIjpbIl9fYXVkaW9TdXBwb3J0IiwiY2MiLCJzeXMiLCJyZXF1aXJlIiwicGFyc2VQYXJhbWV0ZXJzIiwiZG93bmxvYWREb21BdWRpbyIsInVybCIsIm9wdGlvbnMiLCJvbkNvbXBsZXRlIiwidW5kZWZpbmVkIiwiZG9tIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3JjIiwiY2xlYXJFdmVudCIsImNsZWFyVGltZW91dCIsInRpbWVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwiVVNFX0xPQURFUl9FVkVOVCIsInNldFRpbWVvdXQiLCJyZWFkeVN0YXRlIiwibWVzc2FnZSIsImxvZyIsIkVycm9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUlBLGNBQWMsR0FBR0MsRUFBRSxDQUFDQyxHQUFILENBQU9GLGNBQTVCOztlQUM0QkcsT0FBTyxDQUFDLGFBQUQ7SUFBM0JDLDJCQUFBQTs7QUFFUixTQUFTQyxnQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0NDLE9BQWhDLEVBQXlDQyxVQUF6QyxFQUFxRDtBQUFBLHlCQUNuQkosZUFBZSxDQUFDRyxPQUFELEVBQVVFLFNBQVYsRUFBcUJELFVBQXJCLENBREk7QUFBQSxNQUMzQ0QsT0FEMkMsb0JBQzNDQSxPQUQyQztBQUFBLE1BQ2xDQyxVQURrQyxvQkFDbENBLFVBRGtDOztBQUdqRCxNQUFJRSxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFWO0FBQ0FGLEVBQUFBLEdBQUcsQ0FBQ0csR0FBSixHQUFVUCxHQUFWOztBQUVBLE1BQUlRLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQVk7QUFDekJDLElBQUFBLFlBQVksQ0FBQ0MsS0FBRCxDQUFaO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ08sbUJBQUosQ0FBd0IsZ0JBQXhCLEVBQTBDQyxPQUExQyxFQUFtRCxLQUFuRDtBQUNBUixJQUFBQSxHQUFHLENBQUNPLG1CQUFKLENBQXdCLE9BQXhCLEVBQWlDRSxPQUFqQyxFQUEwQyxLQUExQztBQUNBLFFBQUduQixjQUFjLENBQUNvQixnQkFBbEIsRUFDSVYsR0FBRyxDQUFDTyxtQkFBSixDQUF3QmpCLGNBQWMsQ0FBQ29CLGdCQUF2QyxFQUF5REYsT0FBekQsRUFBa0UsS0FBbEU7QUFDUCxHQU5EOztBQVFBLE1BQUlGLEtBQUssR0FBR0ssVUFBVSxDQUFDLFlBQVk7QUFDL0IsUUFBSVgsR0FBRyxDQUFDWSxVQUFKLEtBQW1CLENBQXZCLEVBQ0lILE9BQU8sR0FEWCxLQUdJRCxPQUFPO0FBQ2QsR0FMcUIsRUFLbkIsSUFMbUIsQ0FBdEI7O0FBT0EsTUFBSUEsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBWTtBQUN0QkosSUFBQUEsVUFBVTtBQUNWTixJQUFBQSxVQUFVLElBQUlBLFVBQVUsQ0FBQyxJQUFELEVBQU9FLEdBQVAsQ0FBeEI7QUFDSCxHQUhEOztBQUtBLE1BQUlTLE9BQU8sR0FBRyxTQUFWQSxPQUFVLEdBQVk7QUFDdEJMLElBQUFBLFVBQVU7QUFDVixRQUFJUyxPQUFPLEdBQUcsMEJBQTBCakIsR0FBeEM7QUFDQUwsSUFBQUEsRUFBRSxDQUFDdUIsR0FBSCxDQUFPRCxPQUFQO0FBQ0FmLElBQUFBLFVBQVUsSUFBSUEsVUFBVSxDQUFDLElBQUlpQixLQUFKLENBQVVGLE9BQVYsQ0FBRCxDQUF4QjtBQUNILEdBTEQ7O0FBT0FiLEVBQUFBLEdBQUcsQ0FBQ2dCLGdCQUFKLENBQXFCLGdCQUFyQixFQUF1Q1IsT0FBdkMsRUFBZ0QsS0FBaEQ7QUFDQVIsRUFBQUEsR0FBRyxDQUFDZ0IsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEJQLE9BQTlCLEVBQXVDLEtBQXZDO0FBQ0EsTUFBR25CLGNBQWMsQ0FBQ29CLGdCQUFsQixFQUNJVixHQUFHLENBQUNnQixnQkFBSixDQUFxQjFCLGNBQWMsQ0FBQ29CLGdCQUFwQyxFQUFzREYsT0FBdEQsRUFBK0QsS0FBL0Q7QUFDSixTQUFPUixHQUFQO0FBQ0g7O0FBRURpQixNQUFNLENBQUNDLE9BQVAsR0FBaUJ2QixnQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG52YXIgX19hdWRpb1N1cHBvcnQgPSBjYy5zeXMuX19hdWRpb1N1cHBvcnQ7XG5jb25zdCB7IHBhcnNlUGFyYW1ldGVycyB9ID0gcmVxdWlyZSgnLi91dGlsaXRpZXMnKTtcblxuZnVuY3Rpb24gZG93bmxvYWREb21BdWRpbyAodXJsLCBvcHRpb25zLCBvbkNvbXBsZXRlKSB7XG4gICAgdmFyIHsgb3B0aW9ucywgb25Db21wbGV0ZSB9ID0gcGFyc2VQYXJhbWV0ZXJzKG9wdGlvbnMsIHVuZGVmaW5lZCwgb25Db21wbGV0ZSk7XG5cbiAgICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcbiAgICBkb20uc3JjID0gdXJsO1xuXG4gICAgdmFyIGNsZWFyRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2FucGxheXRocm91Z2hcIiwgc3VjY2VzcywgZmFsc2UpO1xuICAgICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZhaWx1cmUsIGZhbHNlKTtcbiAgICAgICAgaWYoX19hdWRpb1N1cHBvcnQuVVNFX0xPQURFUl9FVkVOVClcbiAgICAgICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKF9fYXVkaW9TdXBwb3J0LlVTRV9MT0FERVJfRVZFTlQsIHN1Y2Nlc3MsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkb20ucmVhZHlTdGF0ZSA9PT0gMClcbiAgICAgICAgICAgIGZhaWx1cmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3VjY2VzcygpO1xuICAgIH0sIDgwMDApO1xuXG4gICAgdmFyIHN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyRXZlbnQoKTtcbiAgICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKG51bGwsIGRvbSk7XG4gICAgfTtcbiAgICBcbiAgICB2YXIgZmFpbHVyZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJFdmVudCgpO1xuICAgICAgICB2YXIgbWVzc2FnZSA9ICdsb2FkIGF1ZGlvIGZhaWx1cmUgLSAnICsgdXJsO1xuICAgICAgICBjYy5sb2cobWVzc2FnZSk7XG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShuZXcgRXJyb3IobWVzc2FnZSkpO1xuICAgIH07XG5cbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsIHN1Y2Nlc3MsIGZhbHNlKTtcbiAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGZhaWx1cmUsIGZhbHNlKTtcbiAgICBpZihfX2F1ZGlvU3VwcG9ydC5VU0VfTE9BREVSX0VWRU5UKVxuICAgICAgICBkb20uYWRkRXZlbnRMaXN0ZW5lcihfX2F1ZGlvU3VwcG9ydC5VU0VfTE9BREVSX0VWRU5ULCBzdWNjZXNzLCBmYWxzZSk7XG4gICAgcmV0dXJuIGRvbTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb3dubG9hZERvbUF1ZGlvOyJdLCJzb3VyY2VSb290IjoiLyJ9