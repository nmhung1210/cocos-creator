
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/CCModel.js';
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
var Model = cc.Class({
  name: 'cc.Model',
  "extends": cc.Asset,
  ctor: function ctor() {
    this._rootNode = null;
    this.loaded = false;
  },
  properties: {
    _nodes: {
      "default": []
    },
    _precomputeJointMatrix: false,
    nodes: {
      get: function get() {
        return this._nodes;
      }
    },
    rootNode: {
      get: function get() {
        return this._rootNode;
      }
    },
    precomputeJointMatrix: {
      get: function get() {
        return this._precomputeJointMatrix;
      }
    }
  },
  onLoad: function onLoad() {
    var nodes = this._nodes;
    this._rootNode = nodes[0];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      node.position = cc.v3.apply(this, node.position);
      node.scale = cc.v3.apply(this, node.scale);
      node.quat = cc.quat.apply(this, node.quat);

      if (node.uniqueBindPose) {
        node.uniqueBindPose = cc.mat4.apply(this, node.uniqueBindPose);
      }

      var pose = node.bindpose;

      if (pose) {
        for (var _i in pose) {
          pose[_i] = cc.mat4.apply(this, pose[_i]);
        }
      }

      var children = node.children;

      if (children) {
        for (var _i2 = 0; _i2 < children.length; _i2++) {
          children[_i2] = nodes[children[_i2]];
        }
      }
    }
  }
});
cc.Model = module.exports = Model;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL0NDTW9kZWwuanMiXSwibmFtZXMiOlsiTW9kZWwiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwiY3RvciIsIl9yb290Tm9kZSIsImxvYWRlZCIsInByb3BlcnRpZXMiLCJfbm9kZXMiLCJfcHJlY29tcHV0ZUpvaW50TWF0cml4Iiwibm9kZXMiLCJnZXQiLCJyb290Tm9kZSIsInByZWNvbXB1dGVKb2ludE1hdHJpeCIsIm9uTG9hZCIsImkiLCJsZW5ndGgiLCJub2RlIiwicG9zaXRpb24iLCJ2MyIsImFwcGx5Iiwic2NhbGUiLCJxdWF0IiwidW5pcXVlQmluZFBvc2UiLCJtYXQ0IiwicG9zZSIsImJpbmRwb3NlIiwiY2hpbGRyZW4iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFJQSxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2pCQyxFQUFBQSxJQUFJLEVBQUUsVUFEVztBQUVqQixhQUFTRixFQUFFLENBQUNHLEtBRks7QUFJakJDLEVBQUFBLElBSmlCLGtCQUlUO0FBQ0osU0FBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFkO0FBQ0gsR0FQZ0I7QUFTakJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUztBQURMLEtBREE7QUFLUkMsSUFBQUEsc0JBQXNCLEVBQUUsS0FMaEI7QUFPUkMsSUFBQUEsS0FBSyxFQUFFO0FBQ0hDLE1BQUFBLEdBREcsaUJBQ0k7QUFDSCxlQUFPLEtBQUtILE1BQVo7QUFDSDtBQUhFLEtBUEM7QUFZUkksSUFBQUEsUUFBUSxFQUFFO0FBQ05ELE1BQUFBLEdBRE0saUJBQ0M7QUFDSCxlQUFPLEtBQUtOLFNBQVo7QUFDSDtBQUhLLEtBWkY7QUFrQlJRLElBQUFBLHFCQUFxQixFQUFFO0FBQ25CRixNQUFBQSxHQURtQixpQkFDWjtBQUNILGVBQU8sS0FBS0Ysc0JBQVo7QUFDSDtBQUhrQjtBQWxCZixHQVRLO0FBa0NqQkssRUFBQUEsTUFsQ2lCLG9CQWtDUDtBQUNOLFFBQUlKLEtBQUssR0FBRyxLQUFLRixNQUFqQjtBQUNBLFNBQUtILFNBQUwsR0FBaUJLLEtBQUssQ0FBQyxDQUFELENBQXRCOztBQUNBLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0wsS0FBSyxDQUFDTSxNQUExQixFQUFrQ0QsQ0FBQyxFQUFuQyxFQUF1QztBQUNuQyxVQUFJRSxJQUFJLEdBQUdQLEtBQUssQ0FBQ0ssQ0FBRCxDQUFoQjtBQUNBRSxNQUFBQSxJQUFJLENBQUNDLFFBQUwsR0FBZ0JsQixFQUFFLENBQUNtQixFQUFILENBQU1DLEtBQU4sQ0FBWSxJQUFaLEVBQWtCSCxJQUFJLENBQUNDLFFBQXZCLENBQWhCO0FBQ0FELE1BQUFBLElBQUksQ0FBQ0ksS0FBTCxHQUFhckIsRUFBRSxDQUFDbUIsRUFBSCxDQUFNQyxLQUFOLENBQVksSUFBWixFQUFrQkgsSUFBSSxDQUFDSSxLQUF2QixDQUFiO0FBQ0FKLE1BQUFBLElBQUksQ0FBQ0ssSUFBTCxHQUFZdEIsRUFBRSxDQUFDc0IsSUFBSCxDQUFRRixLQUFSLENBQWMsSUFBZCxFQUFvQkgsSUFBSSxDQUFDSyxJQUF6QixDQUFaOztBQUVBLFVBQUlMLElBQUksQ0FBQ00sY0FBVCxFQUF5QjtBQUNyQk4sUUFBQUEsSUFBSSxDQUFDTSxjQUFMLEdBQXNCdkIsRUFBRSxDQUFDd0IsSUFBSCxDQUFRSixLQUFSLENBQWMsSUFBZCxFQUFvQkgsSUFBSSxDQUFDTSxjQUF6QixDQUF0QjtBQUNIOztBQUVELFVBQUlFLElBQUksR0FBR1IsSUFBSSxDQUFDUyxRQUFoQjs7QUFDQSxVQUFJRCxJQUFKLEVBQVU7QUFDTixhQUFLLElBQUlWLEVBQVQsSUFBY1UsSUFBZCxFQUFvQjtBQUNoQkEsVUFBQUEsSUFBSSxDQUFDVixFQUFELENBQUosR0FBVWYsRUFBRSxDQUFDd0IsSUFBSCxDQUFRSixLQUFSLENBQWMsSUFBZCxFQUFvQkssSUFBSSxDQUFDVixFQUFELENBQXhCLENBQVY7QUFDSDtBQUNKOztBQUVELFVBQUlZLFFBQVEsR0FBR1YsSUFBSSxDQUFDVSxRQUFwQjs7QUFDQSxVQUFJQSxRQUFKLEVBQWM7QUFDVixhQUFLLElBQUlaLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdZLFFBQVEsQ0FBQ1gsTUFBN0IsRUFBcUNELEdBQUMsRUFBdEMsRUFBMEM7QUFDdENZLFVBQUFBLFFBQVEsQ0FBQ1osR0FBRCxDQUFSLEdBQWNMLEtBQUssQ0FBQ2lCLFFBQVEsQ0FBQ1osR0FBRCxDQUFULENBQW5CO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUE3RGdCLENBQVQsQ0FBWjtBQWdFQWYsRUFBRSxDQUFDRCxLQUFILEdBQVc2QixNQUFNLENBQUNDLE9BQVAsR0FBaUI5QixLQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwOi8vd3d3LmNvY29zLmNvbVxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxubGV0IE1vZGVsID0gY2MuQ2xhc3Moe1xuICAgIG5hbWU6ICdjYy5Nb2RlbCcsXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXG5cbiAgICBjdG9yICgpIHtcbiAgICAgICAgdGhpcy5fcm9vdE5vZGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9ub2Rlczoge1xuICAgICAgICAgICAgZGVmYXVsdDogW11cbiAgICAgICAgfSxcblxuICAgICAgICBfcHJlY29tcHV0ZUpvaW50TWF0cml4OiBmYWxzZSxcblxuICAgICAgICBub2Rlczoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbm9kZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJvb3ROb2RlOiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yb290Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBwcmVjb21wdXRlSm9pbnRNYXRyaXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWNvbXB1dGVKb2ludE1hdHJpeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLl9ub2RlcztcbiAgICAgICAgdGhpcy5fcm9vdE5vZGUgPSBub2Rlc1swXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjYy52My5hcHBseSh0aGlzLCBub2RlLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIG5vZGUuc2NhbGUgPSBjYy52My5hcHBseSh0aGlzLCBub2RlLnNjYWxlKTtcbiAgICAgICAgICAgIG5vZGUucXVhdCA9IGNjLnF1YXQuYXBwbHkodGhpcywgbm9kZS5xdWF0KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG5vZGUudW5pcXVlQmluZFBvc2UpIHtcbiAgICAgICAgICAgICAgICBub2RlLnVuaXF1ZUJpbmRQb3NlID0gY2MubWF0NC5hcHBseSh0aGlzLCBub2RlLnVuaXF1ZUJpbmRQb3NlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHBvc2UgPSBub2RlLmJpbmRwb3NlO1xuICAgICAgICAgICAgaWYgKHBvc2UpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHBvc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zZVtpXSA9IGNjLm1hdDQuYXBwbHkodGhpcywgcG9zZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltpXSA9IG5vZGVzW2NoaWxkcmVuW2ldXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuTW9kZWwgPSBtb2R1bGUuZXhwb3J0cyA9IE1vZGVsO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=