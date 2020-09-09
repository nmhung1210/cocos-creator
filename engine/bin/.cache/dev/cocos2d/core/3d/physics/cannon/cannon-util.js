
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/physics/cannon/cannon-util.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.groupIndexToBitMask = groupIndexToBitMask;
exports.toCannonRaycastOptions = toCannonRaycastOptions;
exports.fillRaycastResult = fillRaycastResult;
exports.commitShapeUpdates = commitShapeUpdates;

var _util = require("../framework/util");

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
var Vec3 = cc.Vec3;

function groupIndexToBitMask(groupIndex, out) {
  var categoryBits = 1 << groupIndex;
  var maskBits = 0;
  var bits = cc.game.collisionMatrix[groupIndex];

  if (!bits) {
    cc.error("cannon-utils: group is not exist", groupIndex);
    return;
  }

  for (var i = 0; i < bits.length; i++) {
    if (!bits[i]) continue;
    maskBits |= 1 << i;
  }

  out.collisionFilterGroup = categoryBits;
  out.collisionFilterMask = maskBits;
}

function toCannonRaycastOptions(out, options) {
  out.checkCollisionResponse = !options.queryTrigger;
  groupIndexToBitMask(options.groupIndex, out);
  out.skipBackFaces = false;
}

function fillRaycastResult(result, cannonResult) {
  result._assign(Vec3.copy(new Vec3(), cannonResult.hitPointWorld), cannonResult.distance, (0, _util.getWrap)(cannonResult.shape).collider);
}

function commitShapeUpdates(body) {
  body.updateMassProperties();
  body.updateBoundingRadius();
  body.aabbNeedsUpdate = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BoeXNpY3MvY2Fubm9uL2Nhbm5vbi11dGlsLnRzIl0sIm5hbWVzIjpbIlZlYzMiLCJjYyIsImdyb3VwSW5kZXhUb0JpdE1hc2siLCJncm91cEluZGV4Iiwib3V0IiwiY2F0ZWdvcnlCaXRzIiwibWFza0JpdHMiLCJiaXRzIiwiZ2FtZSIsImNvbGxpc2lvbk1hdHJpeCIsImVycm9yIiwiaSIsImxlbmd0aCIsImNvbGxpc2lvbkZpbHRlckdyb3VwIiwiY29sbGlzaW9uRmlsdGVyTWFzayIsInRvQ2Fubm9uUmF5Y2FzdE9wdGlvbnMiLCJvcHRpb25zIiwiY2hlY2tDb2xsaXNpb25SZXNwb25zZSIsInF1ZXJ5VHJpZ2dlciIsInNraXBCYWNrRmFjZXMiLCJmaWxsUmF5Y2FzdFJlc3VsdCIsInJlc3VsdCIsImNhbm5vblJlc3VsdCIsIl9hc3NpZ24iLCJjb3B5IiwiaGl0UG9pbnRXb3JsZCIsImRpc3RhbmNlIiwic2hhcGUiLCJjb2xsaWRlciIsImNvbW1pdFNoYXBlVXBkYXRlcyIsImJvZHkiLCJ1cGRhdGVNYXNzUHJvcGVydGllcyIsInVwZGF0ZUJvdW5kaW5nUmFkaXVzIiwiYWFiYk5lZWRzVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBOztBQTFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JBLElBQU1BLElBQUksR0FBR0MsRUFBRSxDQUFDRCxJQUFoQjs7QUFFTyxTQUFTRSxtQkFBVCxDQUE4QkMsVUFBOUIsRUFBa0RDLEdBQWxELEVBQXVIO0FBQzFILE1BQUlDLFlBQVksR0FBRyxLQUFLRixVQUF4QjtBQUNBLE1BQUlHLFFBQVEsR0FBRyxDQUFmO0FBQ0EsTUFBSUMsSUFBSSxHQUFHTixFQUFFLENBQUNPLElBQUgsQ0FBUUMsZUFBUixDQUF3Qk4sVUFBeEIsQ0FBWDs7QUFDQSxNQUFJLENBQUNJLElBQUwsRUFBVztBQUNQTixJQUFBQSxFQUFFLENBQUNTLEtBQUgsQ0FBUyxrQ0FBVCxFQUE2Q1AsVUFBN0M7QUFDQTtBQUNIOztBQUNELE9BQUssSUFBSVEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osSUFBSSxDQUFDSyxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxRQUFJLENBQUNKLElBQUksQ0FBQ0ksQ0FBRCxDQUFULEVBQWM7QUFDZEwsSUFBQUEsUUFBUSxJQUFJLEtBQUtLLENBQWpCO0FBQ0g7O0FBQ0RQLEVBQUFBLEdBQUcsQ0FBQ1Msb0JBQUosR0FBMkJSLFlBQTNCO0FBQ0FELEVBQUFBLEdBQUcsQ0FBQ1UsbUJBQUosR0FBMEJSLFFBQTFCO0FBQ0g7O0FBRU0sU0FBU1Msc0JBQVQsQ0FBaUNYLEdBQWpDLEVBQThEWSxPQUE5RCxFQUF3RjtBQUMzRlosRUFBQUEsR0FBRyxDQUFDYSxzQkFBSixHQUE2QixDQUFDRCxPQUFPLENBQUNFLFlBQXRDO0FBQ0FoQixFQUFBQSxtQkFBbUIsQ0FBQ2MsT0FBTyxDQUFDYixVQUFULEVBQXFCQyxHQUFyQixDQUFuQjtBQUNBQSxFQUFBQSxHQUFHLENBQUNlLGFBQUosR0FBb0IsS0FBcEI7QUFDSDs7QUFFTSxTQUFTQyxpQkFBVCxDQUE0QkMsTUFBNUIsRUFBc0RDLFlBQXRELEVBQTBGO0FBQzdGRCxFQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FDSXZCLElBQUksQ0FBQ3dCLElBQUwsQ0FBVSxJQUFJeEIsSUFBSixFQUFWLEVBQXNCc0IsWUFBWSxDQUFDRyxhQUFuQyxDQURKLEVBRUlILFlBQVksQ0FBQ0ksUUFGakIsRUFHSSxtQkFBb0JKLFlBQVksQ0FBQ0ssS0FBakMsRUFBd0NDLFFBSDVDO0FBS0g7O0FBRU0sU0FBU0Msa0JBQVQsQ0FBNkJDLElBQTdCLEVBQWdEO0FBQ25EQSxFQUFBQSxJQUFJLENBQUNDLG9CQUFMO0FBQ0FELEVBQUFBLElBQUksQ0FBQ0Usb0JBQUw7QUFDQUYsRUFBQUEsSUFBSSxDQUFDRyxlQUFMLEdBQXVCLElBQXZCO0FBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxOSBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IENBTk5PTiBmcm9tICcuLi8uLi8uLi8uLi8uLi9leHRlcm5hbC9jYW5ub24vY2Fubm9uJztcbmltcG9ydCB7IGdldFdyYXAgfSBmcm9tICcuLi9mcmFtZXdvcmsvdXRpbCc7XG5pbXBvcnQgeyBJQmFzZVNoYXBlIH0gZnJvbSAnLi4vc3BlYy9pLXBoeXNpY3Mtc2hhcGUnO1xuaW1wb3J0IHsgUGh5c2ljc1JheVJlc3VsdCB9IGZyb20gJy4uL2ZyYW1ld29yayc7XG5pbXBvcnQgeyBJUmF5Y2FzdE9wdGlvbnMgfSBmcm9tICcuLi9zcGVjL2ktcGh5c2ljcy13b3JsZCc7XG5cbmNvbnN0IFZlYzMgPSBjYy5WZWMzO1xuXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBJbmRleFRvQml0TWFzayAoZ3JvdXBJbmRleDogbnVtYmVyLCBvdXQ6IHsgY29sbGlzaW9uRmlsdGVyR3JvdXA6IG51bWJlcjsgY29sbGlzaW9uRmlsdGVyTWFzazogbnVtYmVyOyB9KSB7XG4gICAgbGV0IGNhdGVnb3J5Qml0cyA9IDEgPDwgZ3JvdXBJbmRleDtcbiAgICBsZXQgbWFza0JpdHMgPSAwO1xuICAgIGxldCBiaXRzID0gY2MuZ2FtZS5jb2xsaXNpb25NYXRyaXhbZ3JvdXBJbmRleF07XG4gICAgaWYgKCFiaXRzKSB7XG4gICAgICAgIGNjLmVycm9yKFwiY2Fubm9uLXV0aWxzOiBncm91cCBpcyBub3QgZXhpc3RcIiwgZ3JvdXBJbmRleCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghYml0c1tpXSkgY29udGludWU7XG4gICAgICAgIG1hc2tCaXRzIHw9IDEgPDwgaTtcbiAgICB9XG4gICAgb3V0LmNvbGxpc2lvbkZpbHRlckdyb3VwID0gY2F0ZWdvcnlCaXRzO1xuICAgIG91dC5jb2xsaXNpb25GaWx0ZXJNYXNrID0gbWFza0JpdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0Nhbm5vblJheWNhc3RPcHRpb25zIChvdXQ6IENBTk5PTi5JUmF5Y2FzdE9wdGlvbnMsIG9wdGlvbnM6IElSYXljYXN0T3B0aW9ucykge1xuICAgIG91dC5jaGVja0NvbGxpc2lvblJlc3BvbnNlID0gIW9wdGlvbnMucXVlcnlUcmlnZ2VyO1xuICAgIGdyb3VwSW5kZXhUb0JpdE1hc2sob3B0aW9ucy5ncm91cEluZGV4LCBvdXQpO1xuICAgIG91dC5za2lwQmFja0ZhY2VzID0gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxsUmF5Y2FzdFJlc3VsdCAocmVzdWx0OiBQaHlzaWNzUmF5UmVzdWx0LCBjYW5ub25SZXN1bHQ6IENBTk5PTi5SYXljYXN0UmVzdWx0KSB7XG4gICAgcmVzdWx0Ll9hc3NpZ24oXG4gICAgICAgIFZlYzMuY29weShuZXcgVmVjMygpLCBjYW5ub25SZXN1bHQuaGl0UG9pbnRXb3JsZCksXG4gICAgICAgIGNhbm5vblJlc3VsdC5kaXN0YW5jZSxcbiAgICAgICAgZ2V0V3JhcDxJQmFzZVNoYXBlPihjYW5ub25SZXN1bHQuc2hhcGUpLmNvbGxpZGVyXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbW1pdFNoYXBlVXBkYXRlcyAoYm9keTogQ0FOTk9OLkJvZHkpIHtcbiAgICBib2R5LnVwZGF0ZU1hc3NQcm9wZXJ0aWVzKCk7XG4gICAgYm9keS51cGRhdGVCb3VuZGluZ1JhZGl1cygpO1xuICAgIGJvZHkuYWFiYk5lZWRzVXBkYXRlID0gdHJ1ZTtcbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==