
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/compiler.js';
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
function deepFlatten(strList, array) {
  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    if (Array.isArray(item)) {
      deepFlatten(strList, item);
    } // else if (item instanceof Declaration) {
    //     strList.push(item.toString());
    // }
    else {
        strList.push(item);
      }
  }
}

function flattenCodeArray(array) {
  var separator = CC_DEV ? '\n' : '';
  var strList = [];
  deepFlatten(strList, array);
  return strList.join(separator);
}

module.exports = {
  flattenCodeArray: flattenCodeArray
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2NvbXBpbGVyLmpzIl0sIm5hbWVzIjpbImRlZXBGbGF0dGVuIiwic3RyTGlzdCIsImFycmF5IiwiaSIsImxlbmd0aCIsIml0ZW0iLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiZmxhdHRlbkNvZGVBcnJheSIsInNlcGFyYXRvciIsIkNDX0RFViIsImpvaW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsU0FBU0EsV0FBVCxDQUFzQkMsT0FBdEIsRUFBK0JDLEtBQS9CLEVBQXNDO0FBQ2xDLE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsS0FBSyxDQUFDRSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxRQUFJRSxJQUFJLEdBQUdILEtBQUssQ0FBQ0MsQ0FBRCxDQUFoQjs7QUFDQSxRQUFJRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCTCxNQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVUksSUFBVixDQUFYO0FBQ0gsS0FGRCxDQUdBO0FBQ0E7QUFDQTtBQUxBLFNBTUs7QUFDREosUUFBQUEsT0FBTyxDQUFDTyxJQUFSLENBQWFILElBQWI7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsU0FBU0ksZ0JBQVQsQ0FBMkJQLEtBQTNCLEVBQWtDO0FBQzlCLE1BQUlRLFNBQVMsR0FBR0MsTUFBTSxHQUFHLElBQUgsR0FBVSxFQUFoQztBQUNBLE1BQUlWLE9BQU8sR0FBRyxFQUFkO0FBQ0FELEVBQUFBLFdBQVcsQ0FBQ0MsT0FBRCxFQUFVQyxLQUFWLENBQVg7QUFDQSxTQUFPRCxPQUFPLENBQUNXLElBQVIsQ0FBYUYsU0FBYixDQUFQO0FBQ0g7O0FBRURHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUNiTCxFQUFBQSxnQkFBZ0IsRUFBaEJBO0FBRGEsQ0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIGRlZXBGbGF0dGVuIChzdHJMaXN0LCBhcnJheSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIGRlZXBGbGF0dGVuKHN0ckxpc3QsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiBEZWNsYXJhdGlvbikge1xuICAgICAgICAvLyAgICAgc3RyTGlzdC5wdXNoKGl0ZW0udG9TdHJpbmcoKSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdHJMaXN0LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW5Db2RlQXJyYXkgKGFycmF5KSB7XG4gICAgdmFyIHNlcGFyYXRvciA9IENDX0RFViA/ICdcXG4nIDogJyc7XG4gICAgdmFyIHN0ckxpc3QgPSBbXTtcbiAgICBkZWVwRmxhdHRlbihzdHJMaXN0LCBhcnJheSk7XG4gICAgcmV0dXJuIHN0ckxpc3Quam9pbihzZXBhcmF0b3IpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmbGF0dGVuQ29kZUFycmF5XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=