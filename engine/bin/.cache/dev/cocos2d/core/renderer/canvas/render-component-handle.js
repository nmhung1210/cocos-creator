
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/render-component-handle.js';
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
var utils = require('./renderers/utils');

var RenderComponentHandle = function RenderComponentHandle(device, defaultCamera) {
  this._device = device; // let vx = this._device._vx;
  // let vy = this._device._vy;
  // let vh = this._device._vh;

  this._camera = defaultCamera;
  this.parentOpacity = 1;
  this.parentOpacityDirty = 0;
  this.worldMatDirty = 0;
  this.walking = false;
};

RenderComponentHandle.prototype = {
  constructor: RenderComponentHandle,
  reset: function reset() {
    var ctx = this._device._ctx;
    var canvas = this._device._canvas;
    var color = cc.Camera.main ? cc.Camera.main.backgroundColor : cc.color();
    var rgba = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + color.a / 255 + ")";
    ctx.fillStyle = rgba;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this._device._stats.drawcalls = 0; //reset cache data

    utils.context.reset();
  },
  terminate: function terminate() {}
};
module.exports = RenderComponentHandle;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXItY29tcG9uZW50LWhhbmRsZS5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsInJlcXVpcmUiLCJSZW5kZXJDb21wb25lbnRIYW5kbGUiLCJkZXZpY2UiLCJkZWZhdWx0Q2FtZXJhIiwiX2RldmljZSIsIl9jYW1lcmEiLCJwYXJlbnRPcGFjaXR5IiwicGFyZW50T3BhY2l0eURpcnR5Iiwid29ybGRNYXREaXJ0eSIsIndhbGtpbmciLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInJlc2V0IiwiY3R4IiwiX2N0eCIsImNhbnZhcyIsIl9jYW52YXMiLCJjb2xvciIsImNjIiwiQ2FtZXJhIiwibWFpbiIsImJhY2tncm91bmRDb2xvciIsInJnYmEiLCJyIiwiZyIsImIiLCJhIiwiZmlsbFN0eWxlIiwic2V0VHJhbnNmb3JtIiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJmaWxsUmVjdCIsIl9zdGF0cyIsImRyYXdjYWxscyIsImNvbnRleHQiLCJ0ZXJtaW5hdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxtQkFBRCxDQUFyQjs7QUFFQSxJQUFJQyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQVVDLE1BQVYsRUFBa0JDLGFBQWxCLEVBQWlDO0FBQ3pELE9BQUtDLE9BQUwsR0FBZUYsTUFBZixDQUR5RCxDQUV6RDtBQUNBO0FBQ0E7O0FBQ0EsT0FBS0csT0FBTCxHQUFlRixhQUFmO0FBRUEsT0FBS0csYUFBTCxHQUFxQixDQUFyQjtBQUNBLE9BQUtDLGtCQUFMLEdBQTBCLENBQTFCO0FBQ0EsT0FBS0MsYUFBTCxHQUFxQixDQUFyQjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0gsQ0FYRDs7QUFhQVIscUJBQXFCLENBQUNTLFNBQXRCLEdBQWtDO0FBQzlCQyxFQUFBQSxXQUFXLEVBQUVWLHFCQURpQjtBQUc5QlcsRUFBQUEsS0FIOEIsbUJBR3RCO0FBQ0osUUFBSUMsR0FBRyxHQUFHLEtBQUtULE9BQUwsQ0FBYVUsSUFBdkI7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBS1gsT0FBTCxDQUFhWSxPQUExQjtBQUNBLFFBQUlDLEtBQUssR0FBR0MsRUFBRSxDQUFDQyxNQUFILENBQVVDLElBQVYsR0FBaUJGLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQyxJQUFWLENBQWVDLGVBQWhDLEdBQWtESCxFQUFFLENBQUNELEtBQUgsRUFBOUQ7QUFDQSxRQUFJSyxJQUFJLGFBQVdMLEtBQUssQ0FBQ00sQ0FBakIsVUFBdUJOLEtBQUssQ0FBQ08sQ0FBN0IsVUFBbUNQLEtBQUssQ0FBQ1EsQ0FBekMsVUFBK0NSLEtBQUssQ0FBQ1MsQ0FBTixHQUFRLEdBQXZELE1BQVI7QUFDQWIsSUFBQUEsR0FBRyxDQUFDYyxTQUFKLEdBQWdCTCxJQUFoQjtBQUNBVCxJQUFBQSxHQUFHLENBQUNlLFlBQUosQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEM7QUFDQWYsSUFBQUEsR0FBRyxDQUFDZ0IsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JkLE1BQU0sQ0FBQ2UsS0FBM0IsRUFBa0NmLE1BQU0sQ0FBQ2dCLE1BQXpDO0FBQ0FsQixJQUFBQSxHQUFHLENBQUNtQixRQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQmpCLE1BQU0sQ0FBQ2UsS0FBMUIsRUFBaUNmLE1BQU0sQ0FBQ2dCLE1BQXhDO0FBQ0EsU0FBSzNCLE9BQUwsQ0FBYTZCLE1BQWIsQ0FBb0JDLFNBQXBCLEdBQWdDLENBQWhDLENBVEksQ0FVSjs7QUFDQW5DLElBQUFBLEtBQUssQ0FBQ29DLE9BQU4sQ0FBY3ZCLEtBQWQ7QUFDSCxHQWY2QjtBQWlCOUJ3QixFQUFBQSxTQWpCOEIsdUJBaUJqQixDQUVaO0FBbkI2QixDQUFsQztBQXNCQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckMscUJBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3JlbmRlcmVycy91dGlscycpXG5cbmxldCBSZW5kZXJDb21wb25lbnRIYW5kbGUgPSBmdW5jdGlvbiAoZGV2aWNlLCBkZWZhdWx0Q2FtZXJhKSB7XG4gICAgdGhpcy5fZGV2aWNlID0gZGV2aWNlO1xuICAgIC8vIGxldCB2eCA9IHRoaXMuX2RldmljZS5fdng7XG4gICAgLy8gbGV0IHZ5ID0gdGhpcy5fZGV2aWNlLl92eTtcbiAgICAvLyBsZXQgdmggPSB0aGlzLl9kZXZpY2UuX3ZoO1xuICAgIHRoaXMuX2NhbWVyYSA9IGRlZmF1bHRDYW1lcmE7XG5cbiAgICB0aGlzLnBhcmVudE9wYWNpdHkgPSAxO1xuICAgIHRoaXMucGFyZW50T3BhY2l0eURpcnR5ID0gMDtcbiAgICB0aGlzLndvcmxkTWF0RGlydHkgPSAwO1xuICAgIHRoaXMud2Fsa2luZyA9IGZhbHNlO1xufTtcblxuUmVuZGVyQ29tcG9uZW50SGFuZGxlLnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogUmVuZGVyQ29tcG9uZW50SGFuZGxlLFxuICAgIFxuICAgIHJlc2V0KCkge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5fZGV2aWNlLl9jdHg7XG4gICAgICAgIGxldCBjYW52YXMgPSB0aGlzLl9kZXZpY2UuX2NhbnZhcztcbiAgICAgICAgdmFyIGNvbG9yID0gY2MuQ2FtZXJhLm1haW4gPyBjYy5DYW1lcmEubWFpbi5iYWNrZ3JvdW5kQ29sb3IgOiBjYy5jb2xvcigpO1xuICAgICAgICBsZXQgcmdiYSA9IGByZ2JhKCR7Y29sb3Iucn0sICR7Y29sb3IuZ30sICR7Y29sb3IuYn0sICR7Y29sb3IuYS8yNTV9KWA7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSByZ2JhO1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLl9kZXZpY2UuX3N0YXRzLmRyYXdjYWxscyA9IDA7XG4gICAgICAgIC8vcmVzZXQgY2FjaGUgZGF0YVxuICAgICAgICB1dGlscy5jb250ZXh0LnJlc2V0KCk7XG4gICAgfSxcblxuICAgIHRlcm1pbmF0ZSAoKSB7XG5cbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlckNvbXBvbmVudEhhbmRsZTsiXSwic291cmNlUm9vdCI6Ii8ifQ==