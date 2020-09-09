
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/requiring-frame.js';
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
var requiringFrames = []; // the requiring frame infos

cc._RF = {
  push: function push(module, uuid, script) {
    if (script === undefined) {
      script = uuid;
      uuid = '';
    }

    requiringFrames.push({
      uuid: uuid,
      script: script,
      module: module,
      exports: module.exports,
      // original exports
      beh: null
    });
  },
  pop: function pop() {
    var frameInfo = requiringFrames.pop(); // check exports

    var module = frameInfo.module;
    var exports = module.exports;

    if (exports === frameInfo.exports) {
      for (var anyKey in exports) {
        // exported
        return;
      } // auto export component


      module.exports = exports = frameInfo.cls;
    }
  },
  peek: function peek() {
    return requiringFrames[requiringFrames.length - 1];
  }
};

if (CC_EDITOR) {
  cc._RF.reset = function () {
    requiringFrames = [];
  };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL3JlcXVpcmluZy1mcmFtZS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJpbmdGcmFtZXMiLCJjYyIsIl9SRiIsInB1c2giLCJtb2R1bGUiLCJ1dWlkIiwic2NyaXB0IiwidW5kZWZpbmVkIiwiZXhwb3J0cyIsImJlaCIsInBvcCIsImZyYW1lSW5mbyIsImFueUtleSIsImNscyIsInBlZWsiLCJsZW5ndGgiLCJDQ19FRElUT1IiLCJyZXNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLGVBQWUsR0FBRyxFQUF0QixFQUEyQjs7QUFFM0JDLEVBQUUsQ0FBQ0MsR0FBSCxHQUFTO0FBQ0xDLEVBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCQyxJQUFsQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDbEMsUUFBSUEsTUFBTSxLQUFLQyxTQUFmLEVBQTBCO0FBQ3RCRCxNQUFBQSxNQUFNLEdBQUdELElBQVQ7QUFDQUEsTUFBQUEsSUFBSSxHQUFHLEVBQVA7QUFDSDs7QUFDREwsSUFBQUEsZUFBZSxDQUFDRyxJQUFoQixDQUFxQjtBQUNqQkUsTUFBQUEsSUFBSSxFQUFFQSxJQURXO0FBRWpCQyxNQUFBQSxNQUFNLEVBQUVBLE1BRlM7QUFHakJGLE1BQUFBLE1BQU0sRUFBRUEsTUFIUztBQUlqQkksTUFBQUEsT0FBTyxFQUFFSixNQUFNLENBQUNJLE9BSkM7QUFJVztBQUM1QkMsTUFBQUEsR0FBRyxFQUFFO0FBTFksS0FBckI7QUFPSCxHQWJJO0FBY0xDLEVBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsUUFBSUMsU0FBUyxHQUFHWCxlQUFlLENBQUNVLEdBQWhCLEVBQWhCLENBRGEsQ0FFYjs7QUFDQSxRQUFJTixNQUFNLEdBQUdPLFNBQVMsQ0FBQ1AsTUFBdkI7QUFDQSxRQUFJSSxPQUFPLEdBQUdKLE1BQU0sQ0FBQ0ksT0FBckI7O0FBQ0EsUUFBSUEsT0FBTyxLQUFLRyxTQUFTLENBQUNILE9BQTFCLEVBQW1DO0FBQy9CLFdBQUssSUFBSUksTUFBVCxJQUFtQkosT0FBbkIsRUFBNEI7QUFDeEI7QUFDQTtBQUNILE9BSjhCLENBSy9COzs7QUFDQUosTUFBQUEsTUFBTSxDQUFDSSxPQUFQLEdBQWlCQSxPQUFPLEdBQUdHLFNBQVMsQ0FBQ0UsR0FBckM7QUFDSDtBQUNKLEdBM0JJO0FBNEJMQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxXQUFPZCxlQUFlLENBQUNBLGVBQWUsQ0FBQ2UsTUFBaEIsR0FBeUIsQ0FBMUIsQ0FBdEI7QUFDSDtBQTlCSSxDQUFUOztBQWlDQSxJQUFJQyxTQUFKLEVBQWU7QUFDWGYsRUFBQUEsRUFBRSxDQUFDQyxHQUFILENBQU9lLEtBQVAsR0FBZSxZQUFZO0FBQ3ZCakIsSUFBQUEsZUFBZSxHQUFHLEVBQWxCO0FBQ0gsR0FGRDtBQUdIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTMtMjAxNiBDaHVrb25nIFRlY2hub2xvZ2llcyBJbmMuXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgcmVxdWlyaW5nRnJhbWVzID0gW107ICAvLyB0aGUgcmVxdWlyaW5nIGZyYW1lIGluZm9zXG5cbmNjLl9SRiA9IHtcbiAgICBwdXNoOiBmdW5jdGlvbiAobW9kdWxlLCB1dWlkLCBzY3JpcHQpIHtcbiAgICAgICAgaWYgKHNjcmlwdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzY3JpcHQgPSB1dWlkO1xuICAgICAgICAgICAgdXVpZCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVpcmluZ0ZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAgIHV1aWQ6IHV1aWQsXG4gICAgICAgICAgICBzY3JpcHQ6IHNjcmlwdCxcbiAgICAgICAgICAgIG1vZHVsZTogbW9kdWxlLFxuICAgICAgICAgICAgZXhwb3J0czogbW9kdWxlLmV4cG9ydHMsICAgIC8vIG9yaWdpbmFsIGV4cG9ydHNcbiAgICAgICAgICAgIGJlaDogbnVsbFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZnJhbWVJbmZvID0gcmVxdWlyaW5nRnJhbWVzLnBvcCgpO1xuICAgICAgICAvLyBjaGVjayBleHBvcnRzXG4gICAgICAgIHZhciBtb2R1bGUgPSBmcmFtZUluZm8ubW9kdWxlO1xuICAgICAgICB2YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzO1xuICAgICAgICBpZiAoZXhwb3J0cyA9PT0gZnJhbWVJbmZvLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGFueUtleSBpbiBleHBvcnRzKSB7XG4gICAgICAgICAgICAgICAgLy8gZXhwb3J0ZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhdXRvIGV4cG9ydCBjb21wb25lbnRcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZyYW1lSW5mby5jbHM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBlZWs6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmluZ0ZyYW1lc1tyZXF1aXJpbmdGcmFtZXMubGVuZ3RoIC0gMV07XG4gICAgfVxufTtcblxuaWYgKENDX0VESVRPUikge1xuICAgIGNjLl9SRi5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVxdWlyaW5nRnJhbWVzID0gW107XG4gICAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9