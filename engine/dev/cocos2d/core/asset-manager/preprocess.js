
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/preprocess.js';
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
var Task = require('./task');

var _require = require('./shared'),
    transformPipeline = _require.transformPipeline,
    RequestType = _require.RequestType;

function preprocess(task, done) {
  var options = task.options,
      subOptions = Object.create(null),
      leftOptions = Object.create(null);

  for (var op in options) {
    switch (op) {
      // can't set these attributes in options
      case RequestType.PATH:
      case RequestType.UUID:
      case RequestType.DIR:
      case RequestType.SCENE:
      case RequestType.URL:
        break;
      // only need these attributes to transform url

      case '__requestType__':
      case '__isNative__':
      case 'ext':
      case 'type':
      case '__nativeName__':
      case 'audioLoadMode':
      case 'bundle':
        subOptions[op] = options[op];
        break;
      // other settings, left to next pipe

      case '__exclude__':
      case '__outputAsArray__':
        leftOptions[op] = options[op];
        break;

      default:
        subOptions[op] = options[op];
        leftOptions[op] = options[op];
        break;
    }
  }

  task.options = leftOptions; // transform url

  var subTask = Task.create({
    input: task.input,
    options: subOptions
  });
  var err = null;

  try {
    task.output = task.source = transformPipeline.sync(subTask);
  } catch (e) {
    err = e;

    for (var i = 0, l = subTask.output.length; i < l; i++) {
      subTask.output[i].recycle();
    }
  }

  subTask.recycle();
  done(err);
}

module.exports = preprocess;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvcHJlcHJvY2Vzcy5qcyJdLCJuYW1lcyI6WyJUYXNrIiwicmVxdWlyZSIsInRyYW5zZm9ybVBpcGVsaW5lIiwiUmVxdWVzdFR5cGUiLCJwcmVwcm9jZXNzIiwidGFzayIsImRvbmUiLCJvcHRpb25zIiwic3ViT3B0aW9ucyIsIk9iamVjdCIsImNyZWF0ZSIsImxlZnRPcHRpb25zIiwib3AiLCJQQVRIIiwiVVVJRCIsIkRJUiIsIlNDRU5FIiwiVVJMIiwic3ViVGFzayIsImlucHV0IiwiZXJyIiwib3V0cHV0Iiwic291cmNlIiwic3luYyIsImUiLCJpIiwibCIsImxlbmd0aCIsInJlY3ljbGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXBCOztlQUMyQ0EsT0FBTyxDQUFDLFVBQUQ7SUFBMUNDLDZCQUFBQTtJQUFtQkMsdUJBQUFBOztBQUUzQixTQUFTQyxVQUFULENBQXFCQyxJQUFyQixFQUEyQkMsSUFBM0IsRUFBaUM7QUFDN0IsTUFBSUMsT0FBTyxHQUFHRixJQUFJLENBQUNFLE9BQW5CO0FBQUEsTUFBNEJDLFVBQVUsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUF6QztBQUFBLE1BQThEQyxXQUFXLEdBQUdGLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FBNUU7O0FBRUEsT0FBSyxJQUFJRSxFQUFULElBQWVMLE9BQWYsRUFBd0I7QUFDcEIsWUFBUUssRUFBUjtBQUNJO0FBQ0EsV0FBS1QsV0FBVyxDQUFDVSxJQUFqQjtBQUNBLFdBQUtWLFdBQVcsQ0FBQ1csSUFBakI7QUFDQSxXQUFLWCxXQUFXLENBQUNZLEdBQWpCO0FBQ0EsV0FBS1osV0FBVyxDQUFDYSxLQUFqQjtBQUNBLFdBQUtiLFdBQVcsQ0FBQ2MsR0FBakI7QUFBdUI7QUFDdkI7O0FBQ0EsV0FBSyxpQkFBTDtBQUNBLFdBQUssY0FBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssTUFBTDtBQUNBLFdBQUssZ0JBQUw7QUFDQSxXQUFLLGVBQUw7QUFDQSxXQUFLLFFBQUw7QUFDSVQsUUFBQUEsVUFBVSxDQUFDSSxFQUFELENBQVYsR0FBaUJMLE9BQU8sQ0FBQ0ssRUFBRCxDQUF4QjtBQUNBO0FBQ0o7O0FBQ0EsV0FBSyxhQUFMO0FBQ0EsV0FBSyxtQkFBTDtBQUNJRCxRQUFBQSxXQUFXLENBQUNDLEVBQUQsQ0FBWCxHQUFrQkwsT0FBTyxDQUFDSyxFQUFELENBQXpCO0FBQ0E7O0FBQ0o7QUFDSUosUUFBQUEsVUFBVSxDQUFDSSxFQUFELENBQVYsR0FBaUJMLE9BQU8sQ0FBQ0ssRUFBRCxDQUF4QjtBQUNBRCxRQUFBQSxXQUFXLENBQUNDLEVBQUQsQ0FBWCxHQUFrQkwsT0FBTyxDQUFDSyxFQUFELENBQXpCO0FBQ0E7QUF6QlI7QUEyQkg7O0FBQ0RQLEVBQUFBLElBQUksQ0FBQ0UsT0FBTCxHQUFlSSxXQUFmLENBaEM2QixDQWtDN0I7O0FBQ0EsTUFBSU8sT0FBTyxHQUFHbEIsSUFBSSxDQUFDVSxNQUFMLENBQVk7QUFBQ1MsSUFBQUEsS0FBSyxFQUFFZCxJQUFJLENBQUNjLEtBQWI7QUFBb0JaLElBQUFBLE9BQU8sRUFBRUM7QUFBN0IsR0FBWixDQUFkO0FBQ0EsTUFBSVksR0FBRyxHQUFHLElBQVY7O0FBQ0EsTUFBSTtBQUNBZixJQUFBQSxJQUFJLENBQUNnQixNQUFMLEdBQWNoQixJQUFJLENBQUNpQixNQUFMLEdBQWNwQixpQkFBaUIsQ0FBQ3FCLElBQWxCLENBQXVCTCxPQUF2QixDQUE1QjtBQUNILEdBRkQsQ0FHQSxPQUFPTSxDQUFQLEVBQVU7QUFDTkosSUFBQUEsR0FBRyxHQUFHSSxDQUFOOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHUixPQUFPLENBQUNHLE1BQVIsQ0FBZU0sTUFBbkMsRUFBMkNGLENBQUMsR0FBR0MsQ0FBL0MsRUFBa0RELENBQUMsRUFBbkQsRUFBdUQ7QUFDbkRQLE1BQUFBLE9BQU8sQ0FBQ0csTUFBUixDQUFlSSxDQUFmLEVBQWtCRyxPQUFsQjtBQUNIO0FBQ0o7O0FBQ0RWLEVBQUFBLE9BQU8sQ0FBQ1UsT0FBUjtBQUNBdEIsRUFBQUEsSUFBSSxDQUFDYyxHQUFELENBQUo7QUFDSDs7QUFFRFMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jb25zdCBUYXNrID0gcmVxdWlyZSgnLi90YXNrJyk7XG5jb25zdCB7IHRyYW5zZm9ybVBpcGVsaW5lLCBSZXF1ZXN0VHlwZSB9ID0gcmVxdWlyZSgnLi9zaGFyZWQnKTtcblxuZnVuY3Rpb24gcHJlcHJvY2VzcyAodGFzaywgZG9uZSkge1xuICAgIHZhciBvcHRpb25zID0gdGFzay5vcHRpb25zLCBzdWJPcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgbGVmdE9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yICh2YXIgb3AgaW4gb3B0aW9ucykge1xuICAgICAgICBzd2l0Y2ggKG9wKSB7XG4gICAgICAgICAgICAvLyBjYW4ndCBzZXQgdGhlc2UgYXR0cmlidXRlcyBpbiBvcHRpb25zXG4gICAgICAgICAgICBjYXNlIFJlcXVlc3RUeXBlLlBBVEg6XG4gICAgICAgICAgICBjYXNlIFJlcXVlc3RUeXBlLlVVSUQ6XG4gICAgICAgICAgICBjYXNlIFJlcXVlc3RUeXBlLkRJUjpcbiAgICAgICAgICAgIGNhc2UgUmVxdWVzdFR5cGUuU0NFTkU6XG4gICAgICAgICAgICBjYXNlIFJlcXVlc3RUeXBlLlVSTCA6IGJyZWFrO1xuICAgICAgICAgICAgLy8gb25seSBuZWVkIHRoZXNlIGF0dHJpYnV0ZXMgdG8gdHJhbnNmb3JtIHVybFxuICAgICAgICAgICAgY2FzZSAnX19yZXF1ZXN0VHlwZV9fJzpcbiAgICAgICAgICAgIGNhc2UgJ19faXNOYXRpdmVfXyc6XG4gICAgICAgICAgICBjYXNlICdleHQnIDpcbiAgICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgY2FzZSAnX19uYXRpdmVOYW1lX18nOlxuICAgICAgICAgICAgY2FzZSAnYXVkaW9Mb2FkTW9kZSc6XG4gICAgICAgICAgICBjYXNlICdidW5kbGUnOlxuICAgICAgICAgICAgICAgIHN1Yk9wdGlvbnNbb3BdID0gb3B0aW9uc1tvcF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBvdGhlciBzZXR0aW5ncywgbGVmdCB0byBuZXh0IHBpcGVcbiAgICAgICAgICAgIGNhc2UgJ19fZXhjbHVkZV9fJzpcbiAgICAgICAgICAgIGNhc2UgJ19fb3V0cHV0QXNBcnJheV9fJzpcbiAgICAgICAgICAgICAgICBsZWZ0T3B0aW9uc1tvcF0gPSBvcHRpb25zW29wXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IFxuICAgICAgICAgICAgICAgIHN1Yk9wdGlvbnNbb3BdID0gb3B0aW9uc1tvcF07XG4gICAgICAgICAgICAgICAgbGVmdE9wdGlvbnNbb3BdID0gb3B0aW9uc1tvcF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFzay5vcHRpb25zID0gbGVmdE9wdGlvbnM7XG5cbiAgICAvLyB0cmFuc2Zvcm0gdXJsXG4gICAgbGV0IHN1YlRhc2sgPSBUYXNrLmNyZWF0ZSh7aW5wdXQ6IHRhc2suaW5wdXQsIG9wdGlvbnM6IHN1Yk9wdGlvbnN9KTtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB0cnkge1xuICAgICAgICB0YXNrLm91dHB1dCA9IHRhc2suc291cmNlID0gdHJhbnNmb3JtUGlwZWxpbmUuc3luYyhzdWJUYXNrKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgZXJyID0gZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJUYXNrLm91dHB1dC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHN1YlRhc2sub3V0cHV0W2ldLnJlY3ljbGUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdWJUYXNrLnJlY3ljbGUoKTtcbiAgICBkb25lKGVycik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlcHJvY2VzczsiXSwic291cmNlUm9vdCI6Ii8ifQ==