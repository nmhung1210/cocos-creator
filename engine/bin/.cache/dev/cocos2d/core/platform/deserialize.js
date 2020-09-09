
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/deserialize.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _deserializeCompiled = _interopRequireDefault(require("./deserialize-compiled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
_deserializeCompiled["default"].reportMissingClass = function (id) {
  if (CC_EDITOR && Editor.Utils.UuidUtils.isUuid(id)) {
    id = Editor.Utils.UuidUtils.decompressUuid(id);
    cc.warnID(5301, id);
  } else {
    cc.warnID(5302, id);
  }
};

if (CC_BUILD) {
  cc.deserialize = _deserializeCompiled["default"];
} else {
  var deserializeForEditor = require('./deserialize-editor');

  cc.deserialize = function (data, details, options) {
    if (CC_EDITOR && Buffer.isBuffer(data)) {
      data = data.toString();
    }

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    if (CC_PREVIEW) {
      // support for loading Asset Bundle from server
      if (_deserializeCompiled["default"].isCompiledJson(data)) {
        return (0, _deserializeCompiled["default"])(data, details, options);
      }
    }

    return deserializeForEditor(data, details, options);
  };

  cc.deserialize.reportMissingClass = deserializeForEditor.reportMissingClass;
  cc.deserialize.Details = deserializeForEditor.Details;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL2Rlc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbImRlc2VyaWFsaXplRm9yQ29tcGlsZWQiLCJyZXBvcnRNaXNzaW5nQ2xhc3MiLCJpZCIsIkNDX0VESVRPUiIsIkVkaXRvciIsIlV0aWxzIiwiVXVpZFV0aWxzIiwiaXNVdWlkIiwiZGVjb21wcmVzc1V1aWQiLCJjYyIsIndhcm5JRCIsIkNDX0JVSUxEIiwiZGVzZXJpYWxpemUiLCJkZXNlcmlhbGl6ZUZvckVkaXRvciIsInJlcXVpcmUiLCJkYXRhIiwiZGV0YWlscyIsIm9wdGlvbnMiLCJCdWZmZXIiLCJpc0J1ZmZlciIsInRvU3RyaW5nIiwiSlNPTiIsInBhcnNlIiwiQ0NfUFJFVklFVyIsImlzQ29tcGlsZWRKc29uIiwiRGV0YWlscyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQTBCQTs7OztBQTFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQUEsZ0NBQXVCQyxrQkFBdkIsR0FBNEMsVUFBVUMsRUFBVixFQUFjO0FBQ3RELE1BQUlDLFNBQVMsSUFBSUMsTUFBTSxDQUFDQyxLQUFQLENBQWFDLFNBQWIsQ0FBdUJDLE1BQXZCLENBQThCTCxFQUE5QixDQUFqQixFQUFvRDtBQUNoREEsSUFBQUEsRUFBRSxHQUFHRSxNQUFNLENBQUNDLEtBQVAsQ0FBYUMsU0FBYixDQUF1QkUsY0FBdkIsQ0FBc0NOLEVBQXRDLENBQUw7QUFDQU8sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsSUFBVixFQUFnQlIsRUFBaEI7QUFDSCxHQUhELE1BSUs7QUFDRE8sSUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsSUFBVixFQUFnQlIsRUFBaEI7QUFDSDtBQUNKLENBUkQ7O0FBVUEsSUFBSVMsUUFBSixFQUFjO0FBQ1ZGLEVBQUFBLEVBQUUsQ0FBQ0csV0FBSCxHQUFpQlosK0JBQWpCO0FBQ0gsQ0FGRCxNQUdLO0FBQ0QsTUFBSWEsb0JBQW9CLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUFsQzs7QUFFQUwsRUFBQUEsRUFBRSxDQUFDRyxXQUFILEdBQWlCLFVBQVVHLElBQVYsRUFBZ0JDLE9BQWhCLEVBQXlCQyxPQUF6QixFQUFrQztBQUMvQyxRQUFJZCxTQUFTLElBQUllLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkosSUFBaEIsQ0FBakIsRUFBd0M7QUFDcENBLE1BQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDSyxRQUFMLEVBQVA7QUFDSDs7QUFDRCxRQUFJLE9BQU9MLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUJBLE1BQUFBLElBQUksR0FBR00sSUFBSSxDQUFDQyxLQUFMLENBQVdQLElBQVgsQ0FBUDtBQUNIOztBQUNELFFBQUlRLFVBQUosRUFBZ0I7QUFDWjtBQUNBLFVBQUl2QixnQ0FBdUJ3QixjQUF2QixDQUFzQ1QsSUFBdEMsQ0FBSixFQUFpRDtBQUM3QyxlQUFPLHFDQUF1QkEsSUFBdkIsRUFBNkJDLE9BQTdCLEVBQXNDQyxPQUF0QyxDQUFQO0FBQ0g7QUFDSjs7QUFDRCxXQUFPSixvQkFBb0IsQ0FBQ0UsSUFBRCxFQUFPQyxPQUFQLEVBQWdCQyxPQUFoQixDQUEzQjtBQUNILEdBZEQ7O0FBZUFSLEVBQUFBLEVBQUUsQ0FBQ0csV0FBSCxDQUFlWCxrQkFBZixHQUFvQ1ksb0JBQW9CLENBQUNaLGtCQUF6RDtBQUNBUSxFQUFBQSxFQUFFLENBQUNHLFdBQUgsQ0FBZWEsT0FBZixHQUF5Qlosb0JBQW9CLENBQUNZLE9BQTlDO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAyMCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBkZXNlcmlhbGl6ZUZvckNvbXBpbGVkIGZyb20gJy4vZGVzZXJpYWxpemUtY29tcGlsZWQnO1xuXG5kZXNlcmlhbGl6ZUZvckNvbXBpbGVkLnJlcG9ydE1pc3NpbmdDbGFzcyA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmIChDQ19FRElUT1IgJiYgRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5pc1V1aWQoaWQpKSB7XG4gICAgICAgIGlkID0gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy5kZWNvbXByZXNzVXVpZChpZCk7XG4gICAgICAgIGNjLndhcm5JRCg1MzAxLCBpZCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjYy53YXJuSUQoNTMwMiwgaWQpO1xuICAgIH1cbn07XG5cbmlmIChDQ19CVUlMRCkge1xuICAgIGNjLmRlc2VyaWFsaXplID0gZGVzZXJpYWxpemVGb3JDb21waWxlZDtcbn1cbmVsc2Uge1xuICAgIGxldCBkZXNlcmlhbGl6ZUZvckVkaXRvciA9IHJlcXVpcmUoJy4vZGVzZXJpYWxpemUtZWRpdG9yJyk7XG5cbiAgICBjYy5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChkYXRhLCBkZXRhaWxzLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDQ19QUkVWSUVXKSB7XG4gICAgICAgICAgICAvLyBzdXBwb3J0IGZvciBsb2FkaW5nIEFzc2V0IEJ1bmRsZSBmcm9tIHNlcnZlclxuICAgICAgICAgICAgaWYgKGRlc2VyaWFsaXplRm9yQ29tcGlsZWQuaXNDb21waWxlZEpzb24oZGF0YSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzZXJpYWxpemVGb3JDb21waWxlZChkYXRhLCBkZXRhaWxzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzZXJpYWxpemVGb3JFZGl0b3IoZGF0YSwgZGV0YWlscywgb3B0aW9ucyk7XG4gICAgfTtcbiAgICBjYy5kZXNlcmlhbGl6ZS5yZXBvcnRNaXNzaW5nQ2xhc3MgPSBkZXNlcmlhbGl6ZUZvckVkaXRvci5yZXBvcnRNaXNzaW5nQ2xhc3M7XG4gICAgY2MuZGVzZXJpYWxpemUuRGV0YWlscyA9IGRlc2VyaWFsaXplRm9yRWRpdG9yLkRldGFpbHM7XG59XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==