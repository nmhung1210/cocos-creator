
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
function getWorldRotation(node) {
  var rot = node.angle;
  var parent = node.parent;

  while (parent.parent) {
    rot += parent.angle;
    parent = parent.parent;
  }

  return -rot;
}

function getWorldScale(node) {
  var scaleX = node.scaleX;
  var scaleY = node.scaleY;
  var parent = node.parent;

  while (parent.parent) {
    scaleX *= parent.scaleX;
    scaleY *= parent.scaleY;
    parent = parent.parent;
  }

  return cc.v2(scaleX, scaleY);
}

function convertToNodeRotation(node, rotation) {
  rotation -= -node.angle;
  var parent = node.parent;

  while (parent.parent) {
    rotation -= -parent.angle;
    parent = parent.parent;
  }

  return rotation;
}

module.exports = {
  getWorldRotation: getWorldRotation,
  getWorldScale: getWorldScale,
  convertToNodeRotation: convertToNodeRotation
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvdXRpbHMuanMiXSwibmFtZXMiOlsiZ2V0V29ybGRSb3RhdGlvbiIsIm5vZGUiLCJyb3QiLCJhbmdsZSIsInBhcmVudCIsImdldFdvcmxkU2NhbGUiLCJzY2FsZVgiLCJzY2FsZVkiLCJjYyIsInYyIiwiY29udmVydFRvTm9kZVJvdGF0aW9uIiwicm90YXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxTQUFTQSxnQkFBVCxDQUEyQkMsSUFBM0IsRUFBaUM7QUFDN0IsTUFBSUMsR0FBRyxHQUFHRCxJQUFJLENBQUNFLEtBQWY7QUFDQSxNQUFJQyxNQUFNLEdBQUdILElBQUksQ0FBQ0csTUFBbEI7O0FBQ0EsU0FBTUEsTUFBTSxDQUFDQSxNQUFiLEVBQW9CO0FBQ2hCRixJQUFBQSxHQUFHLElBQUlFLE1BQU0sQ0FBQ0QsS0FBZDtBQUNBQyxJQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0EsTUFBaEI7QUFDSDs7QUFDRCxTQUFPLENBQUNGLEdBQVI7QUFDSDs7QUFFRCxTQUFTRyxhQUFULENBQXdCSixJQUF4QixFQUE4QjtBQUMxQixNQUFJSyxNQUFNLEdBQUdMLElBQUksQ0FBQ0ssTUFBbEI7QUFDQSxNQUFJQyxNQUFNLEdBQUdOLElBQUksQ0FBQ00sTUFBbEI7QUFFQSxNQUFJSCxNQUFNLEdBQUdILElBQUksQ0FBQ0csTUFBbEI7O0FBQ0EsU0FBTUEsTUFBTSxDQUFDQSxNQUFiLEVBQW9CO0FBQ2hCRSxJQUFBQSxNQUFNLElBQUlGLE1BQU0sQ0FBQ0UsTUFBakI7QUFDQUMsSUFBQUEsTUFBTSxJQUFJSCxNQUFNLENBQUNHLE1BQWpCO0FBRUFILElBQUFBLE1BQU0sR0FBR0EsTUFBTSxDQUFDQSxNQUFoQjtBQUNIOztBQUVELFNBQU9JLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNSCxNQUFOLEVBQWNDLE1BQWQsQ0FBUDtBQUNIOztBQUVELFNBQVNHLHFCQUFULENBQWdDVCxJQUFoQyxFQUFzQ1UsUUFBdEMsRUFBZ0Q7QUFDNUNBLEVBQUFBLFFBQVEsSUFBSSxDQUFDVixJQUFJLENBQUNFLEtBQWxCO0FBQ0EsTUFBSUMsTUFBTSxHQUFHSCxJQUFJLENBQUNHLE1BQWxCOztBQUNBLFNBQU1BLE1BQU0sQ0FBQ0EsTUFBYixFQUFvQjtBQUNoQk8sSUFBQUEsUUFBUSxJQUFJLENBQUNQLE1BQU0sQ0FBQ0QsS0FBcEI7QUFDQUMsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLENBQUNBLE1BQWhCO0FBQ0g7O0FBQ0QsU0FBT08sUUFBUDtBQUNIOztBQUVEQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYmIsRUFBQUEsZ0JBQWdCLEVBQUVBLGdCQURMO0FBRWJLLEVBQUFBLGFBQWEsRUFBRUEsYUFGRjtBQUdiSyxFQUFBQSxxQkFBcUIsRUFBRUE7QUFIVixDQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmZ1bmN0aW9uIGdldFdvcmxkUm90YXRpb24gKG5vZGUpIHtcbiAgICB2YXIgcm90ID0gbm9kZS5hbmdsZTtcbiAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgd2hpbGUocGFyZW50LnBhcmVudCl7XG4gICAgICAgIHJvdCArPSBwYXJlbnQuYW5nbGU7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuICAgIHJldHVybiAtcm90O1xufVxuXG5mdW5jdGlvbiBnZXRXb3JsZFNjYWxlIChub2RlKSB7XG4gICAgdmFyIHNjYWxlWCA9IG5vZGUuc2NhbGVYO1xuICAgIHZhciBzY2FsZVkgPSBub2RlLnNjYWxlWTtcblxuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICB3aGlsZShwYXJlbnQucGFyZW50KXtcbiAgICAgICAgc2NhbGVYICo9IHBhcmVudC5zY2FsZVg7XG4gICAgICAgIHNjYWxlWSAqPSBwYXJlbnQuc2NhbGVZO1xuXG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNjLnYyKHNjYWxlWCwgc2NhbGVZKTtcbn1cblxuZnVuY3Rpb24gY29udmVydFRvTm9kZVJvdGF0aW9uIChub2RlLCByb3RhdGlvbikge1xuICAgIHJvdGF0aW9uIC09IC1ub2RlLmFuZ2xlO1xuICAgIHZhciBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICB3aGlsZShwYXJlbnQucGFyZW50KXtcbiAgICAgICAgcm90YXRpb24gLT0gLXBhcmVudC5hbmdsZTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICB9XG4gICAgcmV0dXJuIHJvdGF0aW9uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRXb3JsZFJvdGF0aW9uOiBnZXRXb3JsZFJvdGF0aW9uLFxuICAgIGdldFdvcmxkU2NhbGU6IGdldFdvcmxkU2NhbGUsXG4gICAgY29udmVydFRvTm9kZVJvdGF0aW9uOiBjb252ZXJ0VG9Ob2RlUm90YXRpb25cbn07XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==