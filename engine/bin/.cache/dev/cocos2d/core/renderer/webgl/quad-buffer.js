
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/quad-buffer.js';
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
var MeshBuffer = require('./mesh-buffer');

var QuadBuffer = cc.Class({
  name: 'cc.QuadBuffer',
  "extends": MeshBuffer,
  _fillQuadBuffer: function _fillQuadBuffer() {
    var count = this._initIDataCount / 6;
    var buffer = this._iData;

    for (var i = 0, idx = 0; i < count; i++) {
      var vertextID = i * 4;
      buffer[idx++] = vertextID;
      buffer[idx++] = vertextID + 1;
      buffer[idx++] = vertextID + 2;
      buffer[idx++] = vertextID + 1;
      buffer[idx++] = vertextID + 3;
      buffer[idx++] = vertextID + 2;
    }

    var indicesData = new Uint16Array(this._iData.buffer, 0, count * 6);

    this._ib.update(0, indicesData);
  },
  uploadData: function uploadData() {
    if (this.byteOffset === 0 || !this._dirty) {
      return;
    } // update vertext data


    var vertexsData = new Float32Array(this._vData.buffer, 0, this.byteOffset >> 2);

    this._vb.update(0, vertexsData);

    this._dirty = false;
  },
  switchBuffer: function switchBuffer() {
    this._super(); // upload index buffer data


    var indicesData = new Uint16Array(this._iData.buffer, 0, this._initIDataCount);

    this._ib.update(0, indicesData);
  },
  _reallocBuffer: function _reallocBuffer() {
    this._reallocVData(true);

    this._reallocIData();

    this._fillQuadBuffer();
  }
});
cc.QuadBuffer = module.exports = QuadBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL3F1YWQtYnVmZmVyLmpzIl0sIm5hbWVzIjpbIk1lc2hCdWZmZXIiLCJyZXF1aXJlIiwiUXVhZEJ1ZmZlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwiX2ZpbGxRdWFkQnVmZmVyIiwiY291bnQiLCJfaW5pdElEYXRhQ291bnQiLCJidWZmZXIiLCJfaURhdGEiLCJpIiwiaWR4IiwidmVydGV4dElEIiwiaW5kaWNlc0RhdGEiLCJVaW50MTZBcnJheSIsIl9pYiIsInVwZGF0ZSIsInVwbG9hZERhdGEiLCJieXRlT2Zmc2V0IiwiX2RpcnR5IiwidmVydGV4c0RhdGEiLCJGbG9hdDMyQXJyYXkiLCJfdkRhdGEiLCJfdmIiLCJzd2l0Y2hCdWZmZXIiLCJfc3VwZXIiLCJfcmVhbGxvY0J1ZmZlciIsIl9yZWFsbG9jVkRhdGEiLCJfcmVhbGxvY0lEYXRhIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsVUFBVSxHQUFHQyxPQUFPLENBQUMsZUFBRCxDQUExQjs7QUFFQSxJQUFJQyxVQUFVLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ3RCQyxFQUFBQSxJQUFJLEVBQUUsZUFEZ0I7QUFFdEIsYUFBU0wsVUFGYTtBQUl0Qk0sRUFBQUEsZUFKc0IsNkJBSUg7QUFDZixRQUFJQyxLQUFLLEdBQUcsS0FBS0MsZUFBTCxHQUF1QixDQUFuQztBQUNBLFFBQUlDLE1BQU0sR0FBRyxLQUFLQyxNQUFsQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLEdBQUcsR0FBRyxDQUF0QixFQUF5QkQsQ0FBQyxHQUFHSixLQUE3QixFQUFvQ0ksQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxVQUFJRSxTQUFTLEdBQUdGLENBQUMsR0FBRyxDQUFwQjtBQUNBRixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFoQjtBQUNBSixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFTLEdBQUMsQ0FBMUI7QUFDQUosTUFBQUEsTUFBTSxDQUFDRyxHQUFHLEVBQUosQ0FBTixHQUFnQkMsU0FBUyxHQUFDLENBQTFCO0FBQ0FKLE1BQUFBLE1BQU0sQ0FBQ0csR0FBRyxFQUFKLENBQU4sR0FBZ0JDLFNBQVMsR0FBQyxDQUExQjtBQUNBSixNQUFBQSxNQUFNLENBQUNHLEdBQUcsRUFBSixDQUFOLEdBQWdCQyxTQUFTLEdBQUMsQ0FBMUI7QUFDQUosTUFBQUEsTUFBTSxDQUFDRyxHQUFHLEVBQUosQ0FBTixHQUFnQkMsU0FBUyxHQUFDLENBQTFCO0FBQ0g7O0FBRUQsUUFBSUMsV0FBVyxHQUFHLElBQUlDLFdBQUosQ0FBZ0IsS0FBS0wsTUFBTCxDQUFZRCxNQUE1QixFQUFvQyxDQUFwQyxFQUF1Q0YsS0FBSyxHQUFHLENBQS9DLENBQWxCOztBQUNBLFNBQUtTLEdBQUwsQ0FBU0MsTUFBVCxDQUFnQixDQUFoQixFQUFtQkgsV0FBbkI7QUFDSCxHQW5CcUI7QUFxQnRCSSxFQUFBQSxVQXJCc0Isd0JBcUJSO0FBQ1YsUUFBSSxLQUFLQyxVQUFMLEtBQW9CLENBQXBCLElBQXlCLENBQUMsS0FBS0MsTUFBbkMsRUFBMkM7QUFDdkM7QUFDSCxLQUhTLENBS1Y7OztBQUNBLFFBQUlDLFdBQVcsR0FBRyxJQUFJQyxZQUFKLENBQWlCLEtBQUtDLE1BQUwsQ0FBWWQsTUFBN0IsRUFBcUMsQ0FBckMsRUFBd0MsS0FBS1UsVUFBTCxJQUFtQixDQUEzRCxDQUFsQjs7QUFDQSxTQUFLSyxHQUFMLENBQVNQLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJJLFdBQW5COztBQUVBLFNBQUtELE1BQUwsR0FBYyxLQUFkO0FBQ0gsR0EvQnFCO0FBaUN0QkssRUFBQUEsWUFqQ3NCLDBCQWlDTjtBQUNaLFNBQUtDLE1BQUwsR0FEWSxDQUVaOzs7QUFDQSxRQUFJWixXQUFXLEdBQUcsSUFBSUMsV0FBSixDQUFnQixLQUFLTCxNQUFMLENBQVlELE1BQTVCLEVBQW9DLENBQXBDLEVBQXVDLEtBQUtELGVBQTVDLENBQWxCOztBQUNBLFNBQUtRLEdBQUwsQ0FBU0MsTUFBVCxDQUFnQixDQUFoQixFQUFtQkgsV0FBbkI7QUFDSCxHQXRDcUI7QUF3Q3RCYSxFQUFBQSxjQXhDc0IsNEJBd0NKO0FBQ2QsU0FBS0MsYUFBTCxDQUFtQixJQUFuQjs7QUFDQSxTQUFLQyxhQUFMOztBQUNBLFNBQUt2QixlQUFMO0FBQ0g7QUE1Q3FCLENBQVQsQ0FBakI7QUErQ0FILEVBQUUsQ0FBQ0QsVUFBSCxHQUFnQjRCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLFVBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgTWVzaEJ1ZmZlciA9IHJlcXVpcmUoJy4vbWVzaC1idWZmZXInKTtcblxubGV0IFF1YWRCdWZmZXIgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlF1YWRCdWZmZXInLFxuICAgIGV4dGVuZHM6IE1lc2hCdWZmZXIsXG4gICAgXG4gICAgX2ZpbGxRdWFkQnVmZmVyICgpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gdGhpcy5faW5pdElEYXRhQ291bnQgLyA2O1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5faURhdGE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpZHggPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHZlcnRleHRJRCA9IGkgKiA0O1xuICAgICAgICAgICAgYnVmZmVyW2lkeCsrXSA9IHZlcnRleHRJRDtcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMTtcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMjtcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMTtcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMztcbiAgICAgICAgICAgIGJ1ZmZlcltpZHgrK10gPSB2ZXJ0ZXh0SUQrMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRpY2VzRGF0YSA9IG5ldyBVaW50MTZBcnJheSh0aGlzLl9pRGF0YS5idWZmZXIsIDAsIGNvdW50ICogNik7XG4gICAgICAgIHRoaXMuX2liLnVwZGF0ZSgwLCBpbmRpY2VzRGF0YSk7XG4gICAgfSxcblxuICAgIHVwbG9hZERhdGEgKCkge1xuICAgICAgICBpZiAodGhpcy5ieXRlT2Zmc2V0ID09PSAwIHx8ICF0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHZlcnRleHQgZGF0YVxuICAgICAgICBsZXQgdmVydGV4c0RhdGEgPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMuX3ZEYXRhLmJ1ZmZlciwgMCwgdGhpcy5ieXRlT2Zmc2V0ID4+IDIpO1xuICAgICAgICB0aGlzLl92Yi51cGRhdGUoMCwgdmVydGV4c0RhdGEpO1xuXG4gICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHN3aXRjaEJ1ZmZlciAoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIC8vIHVwbG9hZCBpbmRleCBidWZmZXIgZGF0YVxuICAgICAgICBsZXQgaW5kaWNlc0RhdGEgPSBuZXcgVWludDE2QXJyYXkodGhpcy5faURhdGEuYnVmZmVyLCAwLCB0aGlzLl9pbml0SURhdGFDb3VudCk7XG4gICAgICAgIHRoaXMuX2liLnVwZGF0ZSgwLCBpbmRpY2VzRGF0YSk7XG4gICAgfSxcblxuICAgIF9yZWFsbG9jQnVmZmVyICgpIHtcbiAgICAgICAgdGhpcy5fcmVhbGxvY1ZEYXRhKHRydWUpO1xuICAgICAgICB0aGlzLl9yZWFsbG9jSURhdGEoKTtcbiAgICAgICAgdGhpcy5fZmlsbFF1YWRCdWZmZXIoKTtcbiAgICB9XG59KTtcblxuY2MuUXVhZEJ1ZmZlciA9IG1vZHVsZS5leHBvcnRzID0gUXVhZEJ1ZmZlcjtcbiJdLCJzb3VyY2VSb290IjoiLyJ9