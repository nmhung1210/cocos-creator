
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/tiledmap-buffer.js';
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
var TiledMapBuffer = cc.Class({
  name: 'cc.TiledMapBuffer',
  "extends": require('../core/renderer/webgl/quad-buffer'),
  _updateOffset: function _updateOffset() {
    var offsetInfo = this._offsetInfo;
    offsetInfo.vertexOffset = this.vertexOffset;
    offsetInfo.indiceOffset = this.indiceOffset;
    offsetInfo.byteOffset = this.byteOffset;
  },
  adjust: function adjust(vertexCount, indiceCount) {
    this.vertexOffset += vertexCount;
    this.indiceOffset += indiceCount;
    this.indiceStart = this.indiceOffset;
    this.byteOffset = this.byteOffset + vertexCount * this._vertexBytes;
    this._dirty = true;
  }
});
cc.TiledMapBuffer = module.exports = TiledMapBuffer;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL3RpbGVkbWFwLWJ1ZmZlci5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcEJ1ZmZlciIsImNjIiwiQ2xhc3MiLCJuYW1lIiwicmVxdWlyZSIsIl91cGRhdGVPZmZzZXQiLCJvZmZzZXRJbmZvIiwiX29mZnNldEluZm8iLCJ2ZXJ0ZXhPZmZzZXQiLCJpbmRpY2VPZmZzZXQiLCJieXRlT2Zmc2V0IiwiYWRqdXN0IiwidmVydGV4Q291bnQiLCJpbmRpY2VDb3VudCIsImluZGljZVN0YXJ0IiwiX3ZlcnRleEJ5dGVzIiwiX2RpcnR5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBSUEsY0FBYyxHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUMxQkMsRUFBQUEsSUFBSSxFQUFFLG1CQURvQjtBQUUxQixhQUFTQyxPQUFPLENBQUMsb0NBQUQsQ0FGVTtBQUkxQkMsRUFBQUEsYUFKMEIsMkJBSVQ7QUFDYixRQUFJQyxVQUFVLEdBQUcsS0FBS0MsV0FBdEI7QUFDQUQsSUFBQUEsVUFBVSxDQUFDRSxZQUFYLEdBQTBCLEtBQUtBLFlBQS9CO0FBQ0FGLElBQUFBLFVBQVUsQ0FBQ0csWUFBWCxHQUEwQixLQUFLQSxZQUEvQjtBQUNBSCxJQUFBQSxVQUFVLENBQUNJLFVBQVgsR0FBd0IsS0FBS0EsVUFBN0I7QUFDSCxHQVR5QjtBQVcxQkMsRUFBQUEsTUFYMEIsa0JBV2xCQyxXQVhrQixFQVdMQyxXQVhLLEVBV1E7QUFDOUIsU0FBS0wsWUFBTCxJQUFxQkksV0FBckI7QUFDQSxTQUFLSCxZQUFMLElBQXFCSSxXQUFyQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsS0FBS0wsWUFBeEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEtBQUtBLFVBQUwsR0FBa0JFLFdBQVcsR0FBRyxLQUFLRyxZQUF2RDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0g7QUFqQnlCLENBQVQsQ0FBckI7QUFvQkFmLEVBQUUsQ0FBQ0QsY0FBSCxHQUFvQmlCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmxCLGNBQXJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmxldCBUaWxlZE1hcEJ1ZmZlciA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuVGlsZWRNYXBCdWZmZXInLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvd2ViZ2wvcXVhZC1idWZmZXInKSxcblxuICAgIF91cGRhdGVPZmZzZXQgKCkge1xuICAgICAgICBsZXQgb2Zmc2V0SW5mbyA9IHRoaXMuX29mZnNldEluZm87XG4gICAgICAgIG9mZnNldEluZm8udmVydGV4T2Zmc2V0ID0gdGhpcy52ZXJ0ZXhPZmZzZXQ7XG4gICAgICAgIG9mZnNldEluZm8uaW5kaWNlT2Zmc2V0ID0gdGhpcy5pbmRpY2VPZmZzZXQ7XG4gICAgICAgIG9mZnNldEluZm8uYnl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldDtcbiAgICB9LFxuXG4gICAgYWRqdXN0ICh2ZXJ0ZXhDb3VudCwgaW5kaWNlQ291bnQpIHtcbiAgICAgICAgdGhpcy52ZXJ0ZXhPZmZzZXQgKz0gdmVydGV4Q291bnQ7XG4gICAgICAgIHRoaXMuaW5kaWNlT2Zmc2V0ICs9IGluZGljZUNvdW50O1xuICAgICAgICB0aGlzLmluZGljZVN0YXJ0ID0gdGhpcy5pbmRpY2VPZmZzZXQ7XG4gICAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIHZlcnRleENvdW50ICogdGhpcy5fdmVydGV4Qnl0ZXM7XG4gICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICB9XG59KTtcblxuY2MuVGlsZWRNYXBCdWZmZXIgPSBtb2R1bGUuZXhwb3J0cyA9IFRpbGVkTWFwQnVmZmVyOyJdLCJzb3VyY2VSb290IjoiLyJ9