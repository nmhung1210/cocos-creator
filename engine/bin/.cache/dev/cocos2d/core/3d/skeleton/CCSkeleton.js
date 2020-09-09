
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/skeleton/CCSkeleton.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

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
var Skeleton = cc.Class({
  name: 'cc.Skeleton',
  "extends": cc.Asset,
  ctor: function ctor() {
    this.loaded = false;
    this._bindposes = [];
    this._uniqueBindPoses = [];
    this._jointPaths = [];
  },
  properties: {
    _model: cc.Model,
    _jointIndices: [],
    _skinIndex: -1,
    jointPaths: {
      get: function get() {
        return this._jointPaths;
      }
    },
    bindposes: {
      get: function get() {
        return this._bindposes;
      }
    },
    uniqueBindPoses: {
      get: function get() {
        return this._uniqueBindPoses;
      }
    },
    model: {
      get: function get() {
        return this._model;
      }
    }
  },
  onLoad: function onLoad() {
    var nodes = this._model.nodes;
    var jointIndices = this._jointIndices;
    var jointPaths = this._jointPaths;
    var bindposes = this._bindposes;
    var uniqueBindPoses = this._uniqueBindPoses;

    for (var i = 0; i < jointIndices.length; i++) {
      var node = nodes[jointIndices[i]];
      jointPaths[i] = node.path;

      if (node.uniqueBindPose) {
        bindposes[i] = uniqueBindPoses[i] = node.uniqueBindPose;
      } else {
        bindposes[i] = node.bindpose[this._skinIndex];
      }
    }
  }
});
cc.Skeleton = module.exports = Skeleton;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3NrZWxldG9uL0NDU2tlbGV0b24uanMiXSwibmFtZXMiOlsiU2tlbGV0b24iLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwiY3RvciIsImxvYWRlZCIsIl9iaW5kcG9zZXMiLCJfdW5pcXVlQmluZFBvc2VzIiwiX2pvaW50UGF0aHMiLCJwcm9wZXJ0aWVzIiwiX21vZGVsIiwiTW9kZWwiLCJfam9pbnRJbmRpY2VzIiwiX3NraW5JbmRleCIsImpvaW50UGF0aHMiLCJnZXQiLCJiaW5kcG9zZXMiLCJ1bmlxdWVCaW5kUG9zZXMiLCJtb2RlbCIsIm9uTG9hZCIsIm5vZGVzIiwiam9pbnRJbmRpY2VzIiwiaSIsImxlbmd0aCIsIm5vZGUiLCJwYXRoIiwidW5pcXVlQmluZFBvc2UiLCJiaW5kcG9zZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLFFBQVEsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxhQURjO0FBRXBCLGFBQVNGLEVBQUUsQ0FBQ0csS0FGUTtBQUlwQkMsRUFBQUEsSUFKb0Isa0JBSVo7QUFDSixTQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDSCxHQVRtQjtBQVdwQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE1BQU0sRUFBRVYsRUFBRSxDQUFDVyxLQURIO0FBRVJDLElBQUFBLGFBQWEsRUFBRSxFQUZQO0FBR1JDLElBQUFBLFVBQVUsRUFBRSxDQUFDLENBSEw7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1JDLE1BQUFBLEdBRFEsaUJBQ0Q7QUFDSCxlQUFPLEtBQUtQLFdBQVo7QUFDSDtBQUhPLEtBTEo7QUFVUlEsSUFBQUEsU0FBUyxFQUFFO0FBQ1BELE1BQUFBLEdBRE8saUJBQ0E7QUFDSCxlQUFPLEtBQUtULFVBQVo7QUFDSDtBQUhNLEtBVkg7QUFlUlcsSUFBQUEsZUFBZSxFQUFFO0FBQ2JGLE1BQUFBLEdBRGEsaUJBQ047QUFDSCxlQUFPLEtBQUtSLGdCQUFaO0FBQ0g7QUFIWSxLQWZUO0FBb0JSVyxJQUFBQSxLQUFLLEVBQUU7QUFDSEgsTUFBQUEsR0FERyxpQkFDSTtBQUNILGVBQU8sS0FBS0wsTUFBWjtBQUNIO0FBSEU7QUFwQkMsR0FYUTtBQXNDcEJTLEVBQUFBLE1BdENvQixvQkFzQ1Y7QUFDTixRQUFJQyxLQUFLLEdBQUcsS0FBS1YsTUFBTCxDQUFZVSxLQUF4QjtBQUNBLFFBQUlDLFlBQVksR0FBRyxLQUFLVCxhQUF4QjtBQUNBLFFBQUlFLFVBQVUsR0FBRyxLQUFLTixXQUF0QjtBQUNBLFFBQUlRLFNBQVMsR0FBRyxLQUFLVixVQUFyQjtBQUNBLFFBQUlXLGVBQWUsR0FBRyxLQUFLVixnQkFBM0I7O0FBQ0EsU0FBSyxJQUFJZSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxZQUFZLENBQUNFLE1BQWpDLEVBQXlDRCxDQUFDLEVBQTFDLEVBQThDO0FBQzFDLFVBQUlFLElBQUksR0FBR0osS0FBSyxDQUFDQyxZQUFZLENBQUNDLENBQUQsQ0FBYixDQUFoQjtBQUNBUixNQUFBQSxVQUFVLENBQUNRLENBQUQsQ0FBVixHQUFnQkUsSUFBSSxDQUFDQyxJQUFyQjs7QUFDQSxVQUFJRCxJQUFJLENBQUNFLGNBQVQsRUFBeUI7QUFDckJWLFFBQUFBLFNBQVMsQ0FBQ00sQ0FBRCxDQUFULEdBQWVMLGVBQWUsQ0FBQ0ssQ0FBRCxDQUFmLEdBQXFCRSxJQUFJLENBQUNFLGNBQXpDO0FBQ0gsT0FGRCxNQUdLO0FBQ0RWLFFBQUFBLFNBQVMsQ0FBQ00sQ0FBRCxDQUFULEdBQWVFLElBQUksQ0FBQ0csUUFBTCxDQUFjLEtBQUtkLFVBQW5CLENBQWY7QUFDSDtBQUNKO0FBQ0o7QUF0RG1CLENBQVQsQ0FBZjtBQXlEQWIsRUFBRSxDQUFDRCxRQUFILEdBQWM2QixNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixRQUEvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zLmNvbVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5sZXQgU2tlbGV0b24gPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlNrZWxldG9uJyxcbiAgICBleHRlbmRzOiBjYy5Bc3NldCxcblxuICAgIGN0b3IgKCkge1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9iaW5kcG9zZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdW5pcXVlQmluZFBvc2VzID0gW107XG4gICAgICAgIHRoaXMuX2pvaW50UGF0aHMgPSBbXTtcbiAgICB9LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfbW9kZWw6IGNjLk1vZGVsLFxuICAgICAgICBfam9pbnRJbmRpY2VzOiBbXSxcbiAgICAgICAgX3NraW5JbmRleDogLTEsXG5cbiAgICAgICAgam9pbnRQYXRoczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fam9pbnRQYXRocztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmluZHBvc2VzOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW5kcG9zZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHVuaXF1ZUJpbmRQb3Nlczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdW5pcXVlQmluZFBvc2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5fbW9kZWwubm9kZXM7XG4gICAgICAgIGxldCBqb2ludEluZGljZXMgPSB0aGlzLl9qb2ludEluZGljZXM7XG4gICAgICAgIGxldCBqb2ludFBhdGhzID0gdGhpcy5fam9pbnRQYXRocztcbiAgICAgICAgbGV0IGJpbmRwb3NlcyA9IHRoaXMuX2JpbmRwb3NlcztcbiAgICAgICAgbGV0IHVuaXF1ZUJpbmRQb3NlcyA9IHRoaXMuX3VuaXF1ZUJpbmRQb3NlcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBqb2ludEluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gbm9kZXNbam9pbnRJbmRpY2VzW2ldXTtcbiAgICAgICAgICAgIGpvaW50UGF0aHNbaV0gPSBub2RlLnBhdGg7XG4gICAgICAgICAgICBpZiAobm9kZS51bmlxdWVCaW5kUG9zZSkge1xuICAgICAgICAgICAgICAgIGJpbmRwb3Nlc1tpXSA9IHVuaXF1ZUJpbmRQb3Nlc1tpXSA9IG5vZGUudW5pcXVlQmluZFBvc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5kcG9zZXNbaV0gPSBub2RlLmJpbmRwb3NlW3RoaXMuX3NraW5JbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuU2tlbGV0b24gPSBtb2R1bGUuZXhwb3J0cyA9IFNrZWxldG9uOyJdLCJzb3VyY2VSb290IjoiLyJ9