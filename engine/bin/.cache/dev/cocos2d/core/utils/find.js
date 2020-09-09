
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/find.js';
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

/**
 * Finds a node by hierarchy path, the path is case-sensitive.
 * It will traverse the hierarchy by splitting the path using '/' character.
 * This function will still returns the node even if it is inactive.
 * It is recommended to not use this function every frame instead cache the result at startup.
 *
 * @method find
 * @static
 * @param {String} path
 * @param {Node} [referenceNode]
 * @return {Node|null} the node or null if not found
 */
cc.find = module.exports = function (path, referenceNode) {
  if (path == null) {
    cc.errorID(3814);
    return null;
  }

  if (!referenceNode) {
    var scene = cc.director.getScene();

    if (!scene) {
      if (CC_DEV) {
        cc.warnID(5601);
      }

      return null;
    } else if (CC_DEV && !scene.isValid) {
      cc.warnID(5602);
      return null;
    }

    referenceNode = scene;
  } else if (CC_DEV && !referenceNode.isValid) {
    cc.warnID(5603);
    return null;
  }

  var match = referenceNode;
  var startIndex = path[0] !== '/' ? 0 : 1; // skip first '/'

  var nameList = path.split('/'); // parse path

  for (var n = startIndex; n < nameList.length; n++) {
    var name = nameList[n];
    var children = match._children;
    match = null;

    for (var t = 0, len = children.length; t < len; ++t) {
      var subChild = children[t];

      if (subChild.name === name) {
        match = subChild;
        break;
      }
    }

    if (!match) {
      return null;
    }
  }

  return match;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2ZpbmQuanMiXSwibmFtZXMiOlsiY2MiLCJmaW5kIiwibW9kdWxlIiwiZXhwb3J0cyIsInBhdGgiLCJyZWZlcmVuY2VOb2RlIiwiZXJyb3JJRCIsInNjZW5lIiwiZGlyZWN0b3IiLCJnZXRTY2VuZSIsIkNDX0RFViIsIndhcm5JRCIsImlzVmFsaWQiLCJtYXRjaCIsInN0YXJ0SW5kZXgiLCJuYW1lTGlzdCIsInNwbGl0IiwibiIsImxlbmd0aCIsIm5hbWUiLCJjaGlsZHJlbiIsIl9jaGlsZHJlbiIsInQiLCJsZW4iLCJzdWJDaGlsZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTs7Ozs7Ozs7Ozs7O0FBWUFBLEVBQUUsQ0FBQ0MsSUFBSCxHQUFVQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBVUMsSUFBVixFQUFnQkMsYUFBaEIsRUFBK0I7QUFDdEQsTUFBSUQsSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDZEosSUFBQUEsRUFBRSxDQUFDTSxPQUFILENBQVcsSUFBWDtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUNELE1BQUksQ0FBQ0QsYUFBTCxFQUFvQjtBQUNoQixRQUFJRSxLQUFLLEdBQUdQLEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxRQUFaLEVBQVo7O0FBQ0EsUUFBSSxDQUFDRixLQUFMLEVBQVk7QUFDUixVQUFJRyxNQUFKLEVBQVk7QUFDUlYsUUFBQUEsRUFBRSxDQUFDVyxNQUFILENBQVUsSUFBVjtBQUNIOztBQUNELGFBQU8sSUFBUDtBQUNILEtBTEQsTUFNSyxJQUFJRCxNQUFNLElBQUksQ0FBQ0gsS0FBSyxDQUFDSyxPQUFyQixFQUE4QjtBQUMvQlosTUFBQUEsRUFBRSxDQUFDVyxNQUFILENBQVUsSUFBVjtBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNETixJQUFBQSxhQUFhLEdBQUdFLEtBQWhCO0FBQ0gsR0FiRCxNQWNLLElBQUlHLE1BQU0sSUFBSSxDQUFDTCxhQUFhLENBQUNPLE9BQTdCLEVBQXNDO0FBQ3ZDWixJQUFBQSxFQUFFLENBQUNXLE1BQUgsQ0FBVSxJQUFWO0FBQ0EsV0FBTyxJQUFQO0FBQ0g7O0FBRUQsTUFBSUUsS0FBSyxHQUFHUixhQUFaO0FBQ0EsTUFBSVMsVUFBVSxHQUFJVixJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVksR0FBYixHQUFvQixDQUFwQixHQUF3QixDQUF6QyxDQXpCc0QsQ0F5QlY7O0FBQzVDLE1BQUlXLFFBQVEsR0FBR1gsSUFBSSxDQUFDWSxLQUFMLENBQVcsR0FBWCxDQUFmLENBMUJzRCxDQTRCdEQ7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUdILFVBQWIsRUFBeUJHLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUF0QyxFQUE4Q0QsQ0FBQyxFQUEvQyxFQUFtRDtBQUMvQyxRQUFJRSxJQUFJLEdBQUdKLFFBQVEsQ0FBQ0UsQ0FBRCxDQUFuQjtBQUNBLFFBQUlHLFFBQVEsR0FBR1AsS0FBSyxDQUFDUSxTQUFyQjtBQUNBUixJQUFBQSxLQUFLLEdBQUcsSUFBUjs7QUFDQSxTQUFLLElBQUlTLENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBR0gsUUFBUSxDQUFDRixNQUEvQixFQUF1Q0ksQ0FBQyxHQUFHQyxHQUEzQyxFQUFnRCxFQUFFRCxDQUFsRCxFQUFxRDtBQUNqRCxVQUFJRSxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0UsQ0FBRCxDQUF2Qjs7QUFDQSxVQUFJRSxRQUFRLENBQUNMLElBQVQsS0FBa0JBLElBQXRCLEVBQTRCO0FBQ3hCTixRQUFBQSxLQUFLLEdBQUdXLFFBQVI7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsUUFBSSxDQUFDWCxLQUFMLEVBQVk7QUFDUixhQUFPLElBQVA7QUFDSDtBQUNKOztBQUVELFNBQU9BLEtBQVA7QUFDSCxDQTlDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiBGaW5kcyBhIG5vZGUgYnkgaGllcmFyY2h5IHBhdGgsIHRoZSBwYXRoIGlzIGNhc2Utc2Vuc2l0aXZlLlxuICogSXQgd2lsbCB0cmF2ZXJzZSB0aGUgaGllcmFyY2h5IGJ5IHNwbGl0dGluZyB0aGUgcGF0aCB1c2luZyAnLycgY2hhcmFjdGVyLlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIHN0aWxsIHJldHVybnMgdGhlIG5vZGUgZXZlbiBpZiBpdCBpcyBpbmFjdGl2ZS5cbiAqIEl0IGlzIHJlY29tbWVuZGVkIHRvIG5vdCB1c2UgdGhpcyBmdW5jdGlvbiBldmVyeSBmcmFtZSBpbnN0ZWFkIGNhY2hlIHRoZSByZXN1bHQgYXQgc3RhcnR1cC5cbiAqXG4gKiBAbWV0aG9kIGZpbmRcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge05vZGV9IFtyZWZlcmVuY2VOb2RlXVxuICogQHJldHVybiB7Tm9kZXxudWxsfSB0aGUgbm9kZSBvciBudWxsIGlmIG5vdCBmb3VuZFxuICovXG5jYy5maW5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGF0aCwgcmVmZXJlbmNlTm9kZSkge1xuICAgIGlmIChwYXRoID09IG51bGwpIHtcbiAgICAgICAgY2MuZXJyb3JJRCgzODE0KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghcmVmZXJlbmNlTm9kZSkge1xuICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICBpZiAoIXNjZW5lKSB7XG4gICAgICAgICAgICBpZiAoQ0NfREVWKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDU2MDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQ0NfREVWICYmICFzY2VuZS5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBjYy53YXJuSUQoNTYwMik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZWZlcmVuY2VOb2RlID0gc2NlbmU7XG4gICAgfVxuICAgIGVsc2UgaWYgKENDX0RFViAmJiAhcmVmZXJlbmNlTm9kZS5pc1ZhbGlkKSB7XG4gICAgICAgIGNjLndhcm5JRCg1NjAzKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG1hdGNoID0gcmVmZXJlbmNlTm9kZTtcbiAgICB2YXIgc3RhcnRJbmRleCA9IChwYXRoWzBdICE9PSAnLycpID8gMCA6IDE7IC8vIHNraXAgZmlyc3QgJy8nXG4gICAgdmFyIG5hbWVMaXN0ID0gcGF0aC5zcGxpdCgnLycpO1xuXG4gICAgLy8gcGFyc2UgcGF0aFxuICAgIGZvciAodmFyIG4gPSBzdGFydEluZGV4OyBuIDwgbmFtZUxpc3QubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lTGlzdFtuXTtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gbWF0Y2guX2NoaWxkcmVuO1xuICAgICAgICBtYXRjaCA9IG51bGw7XG4gICAgICAgIGZvciAodmFyIHQgPSAwLCBsZW4gPSBjaGlsZHJlbi5sZW5ndGg7IHQgPCBsZW47ICsrdCkge1xuICAgICAgICAgICAgdmFyIHN1YkNoaWxkID0gY2hpbGRyZW5bdF07XG4gICAgICAgICAgICBpZiAoc3ViQ2hpbGQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gc3ViQ2hpbGQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWF0Y2g7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=