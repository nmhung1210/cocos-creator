
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/deserialize.js';
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
var helper = require('./helper');

var MissingClass = CC_EDITOR && Editor.require('app://editor/page/scene-utils/missing-class-reporter').MissingClass;

require('../platform/deserialize');

function deserialize(json, options) {
  var classFinder, missingClass;

  if (CC_EDITOR) {
    missingClass = MissingClass;

    classFinder = function classFinder(type, data, owner, propName) {
      var res = missingClass.classFinder(type, data, owner, propName);

      if (res) {
        return res;
      }

      return cc._MissingScript;
    };

    classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
  } else {
    classFinder = cc._MissingScript.safeFindClass;
  }

  var tdInfo = cc.deserialize.Details.pool.get();
  var asset;

  try {
    asset = cc.deserialize(json, tdInfo, {
      classFinder: classFinder,
      customEnv: options
    });
  } catch (e) {
    cc.deserialize.Details.pool.put(tdInfo);
    throw e;
  }

  if (CC_EDITOR && missingClass) {
    missingClass.reportMissingClass(asset);
    missingClass.reset();
  }

  var uuidList = tdInfo.uuidList;
  var objList = tdInfo.uuidObjList;
  var propList = tdInfo.uuidPropList;
  var depends = [];

  for (var i = 0; i < uuidList.length; i++) {
    var dependUuid = uuidList[i];
    depends[i] = {
      uuid: helper.decodeUuid(dependUuid),
      owner: objList[i],
      prop: propList[i]
    };
  } // non-native deps


  asset.__depends__ = depends; // native dep

  asset._native && (asset.__nativeDepend__ = true);
  cc.deserialize.Details.pool.put(tdInfo);
  return asset;
}

module.exports = deserialize;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZGVzZXJpYWxpemUuanMiXSwibmFtZXMiOlsiaGVscGVyIiwicmVxdWlyZSIsIk1pc3NpbmdDbGFzcyIsIkNDX0VESVRPUiIsIkVkaXRvciIsImRlc2VyaWFsaXplIiwianNvbiIsIm9wdGlvbnMiLCJjbGFzc0ZpbmRlciIsIm1pc3NpbmdDbGFzcyIsInR5cGUiLCJkYXRhIiwib3duZXIiLCJwcm9wTmFtZSIsInJlcyIsImNjIiwiX01pc3NpbmdTY3JpcHQiLCJvbkRlcmVmZXJlbmNlZCIsInNhZmVGaW5kQ2xhc3MiLCJ0ZEluZm8iLCJEZXRhaWxzIiwicG9vbCIsImdldCIsImFzc2V0IiwiY3VzdG9tRW52IiwiZSIsInB1dCIsInJlcG9ydE1pc3NpbmdDbGFzcyIsInJlc2V0IiwidXVpZExpc3QiLCJvYmpMaXN0IiwidXVpZE9iakxpc3QiLCJwcm9wTGlzdCIsInV1aWRQcm9wTGlzdCIsImRlcGVuZHMiLCJpIiwibGVuZ3RoIiwiZGVwZW5kVXVpZCIsInV1aWQiLCJkZWNvZGVVdWlkIiwicHJvcCIsIl9fZGVwZW5kc19fIiwiX25hdGl2ZSIsIl9fbmF0aXZlRGVwZW5kX18iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxNQUFNLEdBQUdDLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQU1DLFlBQVksR0FBR0MsU0FBUyxJQUFJQyxNQUFNLENBQUNILE9BQVAsQ0FBZSxzREFBZixFQUF1RUMsWUFBekc7O0FBQ0FELE9BQU8sQ0FBQyx5QkFBRCxDQUFQOztBQUVBLFNBQVNJLFdBQVQsQ0FBc0JDLElBQXRCLEVBQTRCQyxPQUE1QixFQUFxQztBQUNqQyxNQUFJQyxXQUFKLEVBQWlCQyxZQUFqQjs7QUFDQSxNQUFJTixTQUFKLEVBQWU7QUFDWE0sSUFBQUEsWUFBWSxHQUFHUCxZQUFmOztBQUNBTSxJQUFBQSxXQUFXLEdBQUcscUJBQVVFLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCQyxLQUF0QixFQUE2QkMsUUFBN0IsRUFBdUM7QUFDakQsVUFBSUMsR0FBRyxHQUFHTCxZQUFZLENBQUNELFdBQWIsQ0FBeUJFLElBQXpCLEVBQStCQyxJQUEvQixFQUFxQ0MsS0FBckMsRUFBNENDLFFBQTVDLENBQVY7O0FBQ0EsVUFBSUMsR0FBSixFQUFTO0FBQ0wsZUFBT0EsR0FBUDtBQUNIOztBQUNELGFBQU9DLEVBQUUsQ0FBQ0MsY0FBVjtBQUNILEtBTkQ7O0FBT0FSLElBQUFBLFdBQVcsQ0FBQ1MsY0FBWixHQUE2QlIsWUFBWSxDQUFDRCxXQUFiLENBQXlCUyxjQUF0RDtBQUNILEdBVkQsTUFXSztBQUNEVCxJQUFBQSxXQUFXLEdBQUdPLEVBQUUsQ0FBQ0MsY0FBSCxDQUFrQkUsYUFBaEM7QUFDSDs7QUFFRCxNQUFJQyxNQUFNLEdBQUdKLEVBQUUsQ0FBQ1YsV0FBSCxDQUFlZSxPQUFmLENBQXVCQyxJQUF2QixDQUE0QkMsR0FBNUIsRUFBYjtBQUVBLE1BQUlDLEtBQUo7O0FBQ0EsTUFBSTtBQUNBQSxJQUFBQSxLQUFLLEdBQUdSLEVBQUUsQ0FBQ1YsV0FBSCxDQUFlQyxJQUFmLEVBQXFCYSxNQUFyQixFQUE2QjtBQUNqQ1gsTUFBQUEsV0FBVyxFQUFFQSxXQURvQjtBQUVqQ2dCLE1BQUFBLFNBQVMsRUFBRWpCO0FBRnNCLEtBQTdCLENBQVI7QUFJSCxHQUxELENBTUEsT0FBT2tCLENBQVAsRUFBVTtBQUNOVixJQUFBQSxFQUFFLENBQUNWLFdBQUgsQ0FBZWUsT0FBZixDQUF1QkMsSUFBdkIsQ0FBNEJLLEdBQTVCLENBQWdDUCxNQUFoQztBQUNBLFVBQU1NLENBQU47QUFDSDs7QUFFRCxNQUFJdEIsU0FBUyxJQUFJTSxZQUFqQixFQUErQjtBQUMzQkEsSUFBQUEsWUFBWSxDQUFDa0Isa0JBQWIsQ0FBZ0NKLEtBQWhDO0FBQ0FkLElBQUFBLFlBQVksQ0FBQ21CLEtBQWI7QUFDSDs7QUFFRCxNQUFJQyxRQUFRLEdBQUdWLE1BQU0sQ0FBQ1UsUUFBdEI7QUFDQSxNQUFJQyxPQUFPLEdBQUdYLE1BQU0sQ0FBQ1ksV0FBckI7QUFDQSxNQUFJQyxRQUFRLEdBQUdiLE1BQU0sQ0FBQ2MsWUFBdEI7QUFDQSxNQUFJQyxPQUFPLEdBQUcsRUFBZDs7QUFFQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLFFBQVEsQ0FBQ08sTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsUUFBSUUsVUFBVSxHQUFHUixRQUFRLENBQUNNLENBQUQsQ0FBekI7QUFDQUQsSUFBQUEsT0FBTyxDQUFDQyxDQUFELENBQVAsR0FBYTtBQUNURyxNQUFBQSxJQUFJLEVBQUV0QyxNQUFNLENBQUN1QyxVQUFQLENBQWtCRixVQUFsQixDQURHO0FBRVR6QixNQUFBQSxLQUFLLEVBQUVrQixPQUFPLENBQUNLLENBQUQsQ0FGTDtBQUdUSyxNQUFBQSxJQUFJLEVBQUVSLFFBQVEsQ0FBQ0csQ0FBRDtBQUhMLEtBQWI7QUFLSCxHQWhEZ0MsQ0FrRGpDOzs7QUFDQVosRUFBQUEsS0FBSyxDQUFDa0IsV0FBTixHQUFvQlAsT0FBcEIsQ0FuRGlDLENBb0RqQzs7QUFDQVgsRUFBQUEsS0FBSyxDQUFDbUIsT0FBTixLQUFrQm5CLEtBQUssQ0FBQ29CLGdCQUFOLEdBQXlCLElBQTNDO0FBQ0E1QixFQUFBQSxFQUFFLENBQUNWLFdBQUgsQ0FBZWUsT0FBZixDQUF1QkMsSUFBdkIsQ0FBNEJLLEdBQTVCLENBQWdDUCxNQUFoQztBQUNBLFNBQU9JLEtBQVA7QUFFSDs7QUFFRHFCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhDLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBoZWxwZXIgPSByZXF1aXJlKCcuL2hlbHBlcicpO1xuY29uc3QgTWlzc2luZ0NsYXNzID0gQ0NfRURJVE9SICYmIEVkaXRvci5yZXF1aXJlKCdhcHA6Ly9lZGl0b3IvcGFnZS9zY2VuZS11dGlscy9taXNzaW5nLWNsYXNzLXJlcG9ydGVyJykuTWlzc2luZ0NsYXNzO1xucmVxdWlyZSgnLi4vcGxhdGZvcm0vZGVzZXJpYWxpemUnKTtcblxuZnVuY3Rpb24gZGVzZXJpYWxpemUgKGpzb24sIG9wdGlvbnMpIHtcbiAgICB2YXIgY2xhc3NGaW5kZXIsIG1pc3NpbmdDbGFzcztcbiAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgIG1pc3NpbmdDbGFzcyA9IE1pc3NpbmdDbGFzcztcbiAgICAgICAgY2xhc3NGaW5kZXIgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSwgb3duZXIsIHByb3BOYW1lKSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gbWlzc2luZ0NsYXNzLmNsYXNzRmluZGVyKHR5cGUsIGRhdGEsIG93bmVyLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYy5fTWlzc2luZ1NjcmlwdDtcbiAgICAgICAgfTtcbiAgICAgICAgY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQgPSBtaXNzaW5nQ2xhc3MuY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbGFzc0ZpbmRlciA9IGNjLl9NaXNzaW5nU2NyaXB0LnNhZmVGaW5kQ2xhc3M7XG4gICAgfVxuXG4gICAgdmFyIHRkSW5mbyA9IGNjLmRlc2VyaWFsaXplLkRldGFpbHMucG9vbC5nZXQoKTtcblxuICAgIHZhciBhc3NldDtcbiAgICB0cnkge1xuICAgICAgICBhc3NldCA9IGNjLmRlc2VyaWFsaXplKGpzb24sIHRkSW5mbywge1xuICAgICAgICAgICAgY2xhc3NGaW5kZXI6IGNsYXNzRmluZGVyLFxuICAgICAgICAgICAgY3VzdG9tRW52OiBvcHRpb25zXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBjYy5kZXNlcmlhbGl6ZS5EZXRhaWxzLnBvb2wucHV0KHRkSW5mbyk7XG4gICAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgaWYgKENDX0VESVRPUiAmJiBtaXNzaW5nQ2xhc3MpIHtcbiAgICAgICAgbWlzc2luZ0NsYXNzLnJlcG9ydE1pc3NpbmdDbGFzcyhhc3NldCk7XG4gICAgICAgIG1pc3NpbmdDbGFzcy5yZXNldCgpO1xuICAgIH1cblxuICAgIHZhciB1dWlkTGlzdCA9IHRkSW5mby51dWlkTGlzdDtcbiAgICB2YXIgb2JqTGlzdCA9IHRkSW5mby51dWlkT2JqTGlzdDtcbiAgICB2YXIgcHJvcExpc3QgPSB0ZEluZm8udXVpZFByb3BMaXN0O1xuICAgIHZhciBkZXBlbmRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHV1aWRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkZXBlbmRVdWlkID0gdXVpZExpc3RbaV07XG4gICAgICAgIGRlcGVuZHNbaV0gPSB7XG4gICAgICAgICAgICB1dWlkOiBoZWxwZXIuZGVjb2RlVXVpZChkZXBlbmRVdWlkKSxcbiAgICAgICAgICAgIG93bmVyOiBvYmpMaXN0W2ldLFxuICAgICAgICAgICAgcHJvcDogcHJvcExpc3RbaV1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBub24tbmF0aXZlIGRlcHNcbiAgICBhc3NldC5fX2RlcGVuZHNfXyA9IGRlcGVuZHM7XG4gICAgLy8gbmF0aXZlIGRlcFxuICAgIGFzc2V0Ll9uYXRpdmUgJiYgKGFzc2V0Ll9fbmF0aXZlRGVwZW5kX18gPSB0cnVlKTtcbiAgICBjYy5kZXNlcmlhbGl6ZS5EZXRhaWxzLnBvb2wucHV0KHRkSW5mbyk7XG4gICAgcmV0dXJuIGFzc2V0O1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVzZXJpYWxpemU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==