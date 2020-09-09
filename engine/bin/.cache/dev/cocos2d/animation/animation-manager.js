
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/animation/animation-manager.js';
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
var js = cc.js;
var AnimationManager = cc.Class({
  ctor: function ctor() {
    this._anims = new js.array.MutableForwardIterator([]);
    this._delayEvents = [];
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
  },
  // for manager
  update: function update(dt) {
    var iterator = this._anims;
    var array = iterator.array;

    for (iterator.i = 0; iterator.i < array.length; ++iterator.i) {
      var anim = array[iterator.i];

      if (anim._isPlaying && !anim._isPaused) {
        anim.update(dt);
      }
    }

    var events = this._delayEvents;

    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      event.target[event.func].apply(event.target, event.args);
    }

    events.length = 0;
  },
  destruct: function destruct() {},

  /**
   * @param {AnimationState} anim
   */
  addAnimation: function addAnimation(anim) {
    var index = this._anims.array.indexOf(anim);

    if (index === -1) {
      this._anims.push(anim);
    }
  },

  /**
   * @param {AnimationState} anim
   */
  removeAnimation: function removeAnimation(anim) {
    var index = this._anims.array.indexOf(anim);

    if (index >= 0) {
      this._anims.fastRemoveAt(index);
    } else {
      cc.errorID(3907);
    }
  },
  pushDelayEvent: function pushDelayEvent(target, func, args) {
    this._delayEvents.push({
      target: target,
      func: func,
      args: args
    });
  }
});
cc.AnimationManager = module.exports = AnimationManager;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9hbmltYXRpb24vYW5pbWF0aW9uLW1hbmFnZXIuanMiXSwibmFtZXMiOlsianMiLCJjYyIsIkFuaW1hdGlvbk1hbmFnZXIiLCJDbGFzcyIsImN0b3IiLCJfYW5pbXMiLCJhcnJheSIsIk11dGFibGVGb3J3YXJkSXRlcmF0b3IiLCJfZGVsYXlFdmVudHMiLCJkaXJlY3RvciIsIl9zY2hlZHVsZXIiLCJlbmFibGVGb3JUYXJnZXQiLCJ1cGRhdGUiLCJkdCIsIml0ZXJhdG9yIiwiaSIsImxlbmd0aCIsImFuaW0iLCJfaXNQbGF5aW5nIiwiX2lzUGF1c2VkIiwiZXZlbnRzIiwiZXZlbnQiLCJ0YXJnZXQiLCJmdW5jIiwiYXBwbHkiLCJhcmdzIiwiZGVzdHJ1Y3QiLCJhZGRBbmltYXRpb24iLCJpbmRleCIsImluZGV4T2YiLCJwdXNoIiwicmVtb3ZlQW5pbWF0aW9uIiwiZmFzdFJlbW92ZUF0IiwiZXJyb3JJRCIsInB1c2hEZWxheUV2ZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBSUEsRUFBRSxHQUFHQyxFQUFFLENBQUNELEVBQVo7QUFFQSxJQUFJRSxnQkFBZ0IsR0FBR0QsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDNUJDLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFNBQUtDLE1BQUwsR0FBYyxJQUFJTCxFQUFFLENBQUNNLEtBQUgsQ0FBU0Msc0JBQWIsQ0FBb0MsRUFBcEMsQ0FBZDtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFFQVAsSUFBQUEsRUFBRSxDQUFDUSxRQUFILENBQVlDLFVBQVosSUFBMEJULEVBQUUsQ0FBQ1EsUUFBSCxDQUFZQyxVQUFaLENBQXVCQyxlQUF2QixDQUF1QyxJQUF2QyxDQUExQjtBQUNILEdBTjJCO0FBUTVCO0FBRUFDLEVBQUFBLE1BQU0sRUFBRSxnQkFBVUMsRUFBVixFQUFjO0FBQ2xCLFFBQUlDLFFBQVEsR0FBRyxLQUFLVCxNQUFwQjtBQUNBLFFBQUlDLEtBQUssR0FBR1EsUUFBUSxDQUFDUixLQUFyQjs7QUFDQSxTQUFLUSxRQUFRLENBQUNDLENBQVQsR0FBYSxDQUFsQixFQUFxQkQsUUFBUSxDQUFDQyxDQUFULEdBQWFULEtBQUssQ0FBQ1UsTUFBeEMsRUFBZ0QsRUFBRUYsUUFBUSxDQUFDQyxDQUEzRCxFQUE4RDtBQUMxRCxVQUFJRSxJQUFJLEdBQUdYLEtBQUssQ0FBQ1EsUUFBUSxDQUFDQyxDQUFWLENBQWhCOztBQUNBLFVBQUlFLElBQUksQ0FBQ0MsVUFBTCxJQUFtQixDQUFDRCxJQUFJLENBQUNFLFNBQTdCLEVBQXdDO0FBQ3BDRixRQUFBQSxJQUFJLENBQUNMLE1BQUwsQ0FBWUMsRUFBWjtBQUNIO0FBQ0o7O0FBRUQsUUFBSU8sTUFBTSxHQUFHLEtBQUtaLFlBQWxCOztBQUNBLFNBQUssSUFBSU8sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0ssTUFBTSxDQUFDSixNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxVQUFJTSxLQUFLLEdBQUdELE1BQU0sQ0FBQ0wsQ0FBRCxDQUFsQjtBQUNBTSxNQUFBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYUQsS0FBSyxDQUFDRSxJQUFuQixFQUF5QkMsS0FBekIsQ0FBK0JILEtBQUssQ0FBQ0MsTUFBckMsRUFBNkNELEtBQUssQ0FBQ0ksSUFBbkQ7QUFDSDs7QUFDREwsSUFBQUEsTUFBTSxDQUFDSixNQUFQLEdBQWdCLENBQWhCO0FBRUgsR0EzQjJCO0FBNkI1QlUsRUFBQUEsUUFBUSxFQUFFLG9CQUFZLENBQUUsQ0E3Qkk7O0FBZ0M1Qjs7O0FBR0FDLEVBQUFBLFlBQVksRUFBRSxzQkFBVVYsSUFBVixFQUFnQjtBQUMxQixRQUFJVyxLQUFLLEdBQUcsS0FBS3ZCLE1BQUwsQ0FBWUMsS0FBWixDQUFrQnVCLE9BQWxCLENBQTBCWixJQUExQixDQUFaOztBQUNBLFFBQUlXLEtBQUssS0FBSyxDQUFDLENBQWYsRUFBa0I7QUFDZCxXQUFLdkIsTUFBTCxDQUFZeUIsSUFBWixDQUFpQmIsSUFBakI7QUFDSDtBQUNKLEdBeEMyQjs7QUEwQzVCOzs7QUFHQWMsRUFBQUEsZUFBZSxFQUFFLHlCQUFVZCxJQUFWLEVBQWdCO0FBQzdCLFFBQUlXLEtBQUssR0FBRyxLQUFLdkIsTUFBTCxDQUFZQyxLQUFaLENBQWtCdUIsT0FBbEIsQ0FBMEJaLElBQTFCLENBQVo7O0FBQ0EsUUFBSVcsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixXQUFLdkIsTUFBTCxDQUFZMkIsWUFBWixDQUF5QkosS0FBekI7QUFDSCxLQUZELE1BR0s7QUFDRDNCLE1BQUFBLEVBQUUsQ0FBQ2dDLE9BQUgsQ0FBVyxJQUFYO0FBQ0g7QUFDSixHQXJEMkI7QUF1RDVCQyxFQUFBQSxjQUFjLEVBQUUsd0JBQVVaLE1BQVYsRUFBa0JDLElBQWxCLEVBQXdCRSxJQUF4QixFQUE4QjtBQUMxQyxTQUFLakIsWUFBTCxDQUFrQnNCLElBQWxCLENBQXVCO0FBQ25CUixNQUFBQSxNQUFNLEVBQUVBLE1BRFc7QUFFbkJDLE1BQUFBLElBQUksRUFBRUEsSUFGYTtBQUduQkUsTUFBQUEsSUFBSSxFQUFFQTtBQUhhLEtBQXZCO0FBS0g7QUE3RDJCLENBQVQsQ0FBdkI7QUFpRUF4QixFQUFFLENBQUNDLGdCQUFILEdBQXNCaUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEMsZ0JBQXZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGpzID0gY2MuanM7XG5cbnZhciBBbmltYXRpb25NYW5hZ2VyID0gY2MuQ2xhc3Moe1xuICAgIGN0b3I6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYW5pbXMgPSBuZXcganMuYXJyYXkuTXV0YWJsZUZvcndhcmRJdGVyYXRvcihbXSk7XG4gICAgICAgIHRoaXMuX2RlbGF5RXZlbnRzID0gW107XG5cbiAgICAgICAgY2MuZGlyZWN0b3IuX3NjaGVkdWxlciAmJiBjYy5kaXJlY3Rvci5fc2NoZWR1bGVyLmVuYWJsZUZvclRhcmdldCh0aGlzKTtcbiAgICB9LFxuXG4gICAgLy8gZm9yIG1hbmFnZXJcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IHRoaXMuX2FuaW1zO1xuICAgICAgICB2YXIgYXJyYXkgPSBpdGVyYXRvci5hcnJheTtcbiAgICAgICAgZm9yIChpdGVyYXRvci5pID0gMDsgaXRlcmF0b3IuaSA8IGFycmF5Lmxlbmd0aDsgKytpdGVyYXRvci5pKSB7XG4gICAgICAgICAgICB2YXIgYW5pbSA9IGFycmF5W2l0ZXJhdG9yLmldO1xuICAgICAgICAgICAgaWYgKGFuaW0uX2lzUGxheWluZyAmJiAhYW5pbS5faXNQYXVzZWQpIHtcbiAgICAgICAgICAgICAgICBhbmltLnVwZGF0ZShkdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZGVsYXlFdmVudHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC50YXJnZXRbZXZlbnQuZnVuY10uYXBwbHkoZXZlbnQudGFyZ2V0LCBldmVudC5hcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudHMubGVuZ3RoID0gMDtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGRlc3RydWN0OiBmdW5jdGlvbiAoKSB7fSxcblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25TdGF0ZX0gYW5pbVxuICAgICAqL1xuICAgIGFkZEFuaW1hdGlvbjogZnVuY3Rpb24gKGFuaW0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fYW5pbXMuYXJyYXkuaW5kZXhPZihhbmltKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbXMucHVzaChhbmltKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FuaW1hdGlvblN0YXRlfSBhbmltXG4gICAgICovXG4gICAgcmVtb3ZlQW5pbWF0aW9uOiBmdW5jdGlvbiAoYW5pbSkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9hbmltcy5hcnJheS5pbmRleE9mKGFuaW0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fYW5pbXMuZmFzdFJlbW92ZUF0KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzkwNyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcHVzaERlbGF5RXZlbnQ6IGZ1bmN0aW9uICh0YXJnZXQsIGZ1bmMsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fZGVsYXlFdmVudHMucHVzaCh7XG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgIGZ1bmM6IGZ1bmMsXG4gICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuXG5cbmNjLkFuaW1hdGlvbk1hbmFnZXIgPSBtb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbk1hbmFnZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==