
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
var js = require('../platform/js');

var helper = require('./helper');

var MissingClass = CC_EDITOR && Editor.require('app://editor/page/scene-utils/missing-class-reporter').MissingClass;

require('../platform/deserialize');

function deserialize(json, options) {
  var classFinder, missingClass;
  var isScene = helper.isSceneObj(json);

  if (isScene) {
    if (CC_EDITOR) {
      missingClass = MissingClass;

      classFinder = function classFinder(type, data, owner, propName) {
        var res = missingClass.classFinder(type, data, owner, propName);

        if (res) {
          return res;
        }

        return cc._MissingScript.getMissingWrapper(type, data);
      };

      classFinder.onDereferenced = missingClass.classFinder.onDereferenced;
    } else {
      classFinder = cc._MissingScript.safeFindClass;
    }
  } else {
    classFinder = function classFinder(id) {
      var cls = js._getClassById(id);

      if (cls) {
        return cls;
      }

      cc.warnID(4903, id);
      return Object;
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvZGVzZXJpYWxpemUuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwiaGVscGVyIiwiTWlzc2luZ0NsYXNzIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiZGVzZXJpYWxpemUiLCJqc29uIiwib3B0aW9ucyIsImNsYXNzRmluZGVyIiwibWlzc2luZ0NsYXNzIiwiaXNTY2VuZSIsImlzU2NlbmVPYmoiLCJ0eXBlIiwiZGF0YSIsIm93bmVyIiwicHJvcE5hbWUiLCJyZXMiLCJjYyIsIl9NaXNzaW5nU2NyaXB0IiwiZ2V0TWlzc2luZ1dyYXBwZXIiLCJvbkRlcmVmZXJlbmNlZCIsInNhZmVGaW5kQ2xhc3MiLCJpZCIsImNscyIsIl9nZXRDbGFzc0J5SWQiLCJ3YXJuSUQiLCJPYmplY3QiLCJ0ZEluZm8iLCJEZXRhaWxzIiwicG9vbCIsImdldCIsImFzc2V0IiwiY3VzdG9tRW52IiwiZSIsInB1dCIsInJlcG9ydE1pc3NpbmdDbGFzcyIsInJlc2V0IiwidXVpZExpc3QiLCJvYmpMaXN0IiwidXVpZE9iakxpc3QiLCJwcm9wTGlzdCIsInV1aWRQcm9wTGlzdCIsImRlcGVuZHMiLCJpIiwibGVuZ3RoIiwiZGVwZW5kVXVpZCIsInV1aWQiLCJkZWNvZGVVdWlkIiwicHJvcCIsIl9fZGVwZW5kc19fIiwiX25hdGl2ZSIsIl9fbmF0aXZlRGVwZW5kX18iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxFQUFFLEdBQUdDLE9BQU8sQ0FBQyxnQkFBRCxDQUFsQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBLElBQU1FLFlBQVksR0FBR0MsU0FBUyxJQUFJQyxNQUFNLENBQUNKLE9BQVAsQ0FBZSxzREFBZixFQUF1RUUsWUFBekc7O0FBQ0FGLE9BQU8sQ0FB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QixPQUFPLENBQUNLLENBQUQsQ0FGTDtBQUdUSyxNQUFBQSxJQUFJLEVBQUVSLFFBQVEsQ0FBQ0csQ0FBRDtBQUhMLEtBQWI7QUFLSCxHQTdEZ0MsQ0ErRGpDOzs7QUFDQVosRUFBQUEsS0FBSyxDQUFDa0IsV0FBTixHQUFvQlAsT0FBcEIsQ0FoRWlDLENBaUVqQzs7QUFDQVgsRUFBQUEsS0FBSyxDQUFDbUIsT0FBTixLQUFrQm5CLEtBQUssQ0FBQ29CLGdCQUFOLEdBQXlCLElBQTNDO0FBQ0FsQyxFQUFBQSxFQUFFLENBQUNaLFdBQUgsQ0FBZXVCLE9BQWYsQ0FBdUJDLElBQXZCLENBQTRCSyxHQUE1QixDQUFnQ1AsTUFBaEM7QUFDQSxTQUFPSSxLQUFQO0FBRUg7O0FBRURxQixNQUFNLENBQUNDLE9BQVAsR0FBaUJoRCxXQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QganMgPSByZXF1aXJlKCcuLi9wbGF0Zm9ybS9qcycpO1xuY29uc3QgaGVscGVyID0gcmVxdWlyZSgnLi9oZWxwZXInKTtcbmNvbnN0IE1pc3NpbmdDbGFzcyA9IENDX0VESVRPUiAmJiBFZGl0b3IucmVxdWlyZSgnYXBwOi8vZWRpdG9yL3BhZ2Uvc2NlbmUtdXRpbHMvbWlzc2luZy1jbGFzcy1yZXBvcnRlcicpLk1pc3NpbmdDbGFzcztcbnJlcXVpcmUoJy4uL3BsYXRmb3JtL2Rlc2VyaWFsaXplJyk7XG5cbmZ1bmN0aW9uIGRlc2VyaWFsaXplIChqc29uLCBvcHRpb25zKSB7XG4gICAgdmFyIGNsYXNzRmluZGVyLCBtaXNzaW5nQ2xhc3M7XG4gICAgdmFyIGlzU2NlbmUgPSBoZWxwZXIuaXNTY2VuZU9iaihqc29uKTtcbiAgICBpZiAoaXNTY2VuZSkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICBtaXNzaW5nQ2xhc3MgPSBNaXNzaW5nQ2xhc3M7XG4gICAgICAgICAgICBjbGFzc0ZpbmRlciA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvd25lciwgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gbWlzc2luZ0NsYXNzLmNsYXNzRmluZGVyKHR5cGUsIGRhdGEsIG93bmVyLCBwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2MuX01pc3NpbmdTY3JpcHQuZ2V0TWlzc2luZ1dyYXBwZXIodHlwZSwgZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQgPSBtaXNzaW5nQ2xhc3MuY2xhc3NGaW5kZXIub25EZXJlZmVyZW5jZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjbGFzc0ZpbmRlciA9IGNjLl9NaXNzaW5nU2NyaXB0LnNhZmVGaW5kQ2xhc3M7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNsYXNzRmluZGVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICB2YXIgY2xzID0ganMuX2dldENsYXNzQnlJZChpZCk7XG4gICAgICAgICAgICBpZiAoY2xzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNjLndhcm5JRCg0OTAzLCBpZCk7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciB0ZEluZm8gPSBjYy5kZXNlcmlhbGl6ZS5EZXRhaWxzLnBvb2wuZ2V0KCk7XG5cbiAgICB2YXIgYXNzZXQ7XG4gICAgdHJ5IHtcbiAgICAgICAgYXNzZXQgPSBjYy5kZXNlcmlhbGl6ZShqc29uLCB0ZEluZm8sIHtcbiAgICAgICAgICAgIGNsYXNzRmluZGVyOiBjbGFzc0ZpbmRlcixcbiAgICAgICAgICAgIGN1c3RvbUVudjogb3B0aW9uc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgY2MuZGVzZXJpYWxpemUuRGV0YWlscy5wb29sLnB1dCh0ZEluZm8pO1xuICAgICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIGlmIChDQ19FRElUT1IgJiYgbWlzc2luZ0NsYXNzKSB7XG4gICAgICAgIG1pc3NpbmdDbGFzcy5yZXBvcnRNaXNzaW5nQ2xhc3MoYXNzZXQpO1xuICAgICAgICBtaXNzaW5nQ2xhc3MucmVzZXQoKTtcbiAgICB9XG5cbiAgICB2YXIgdXVpZExpc3QgPSB0ZEluZm8udXVpZExpc3Q7XG4gICAgdmFyIG9iakxpc3QgPSB0ZEluZm8udXVpZE9iakxpc3Q7XG4gICAgdmFyIHByb3BMaXN0ID0gdGRJbmZvLnV1aWRQcm9wTGlzdDtcbiAgICB2YXIgZGVwZW5kcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB1dWlkTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGVwZW5kVXVpZCA9IHV1aWRMaXN0W2ldO1xuICAgICAgICBkZXBlbmRzW2ldID0ge1xuICAgICAgICAgICAgdXVpZDogaGVscGVyLmRlY29kZVV1aWQoZGVwZW5kVXVpZCksXG4gICAgICAgICAgICBvd25lcjogb2JqTGlzdFtpXSxcbiAgICAgICAgICAgIHByb3A6IHByb3BMaXN0W2ldXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gbm9uLW5hdGl2ZSBkZXBzXG4gICAgYXNzZXQuX19kZXBlbmRzX18gPSBkZXBlbmRzO1xuICAgIC8vIG5hdGl2ZSBkZXBcbiAgICBhc3NldC5fbmF0aXZlICYmIChhc3NldC5fX25hdGl2ZURlcGVuZF9fID0gdHJ1ZSk7XG4gICAgY2MuZGVzZXJpYWxpemUuRGV0YWlscy5wb29sLnB1dCh0ZEluZm8pO1xuICAgIHJldHVybiBhc3NldDtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlc2VyaWFsaXplO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=