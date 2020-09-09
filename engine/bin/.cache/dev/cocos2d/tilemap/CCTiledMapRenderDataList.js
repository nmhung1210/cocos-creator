
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/tilemap/CCTiledMapRenderDataList.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _inputAssembler = _interopRequireDefault(require("../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var TiledMapRenderDataList = cc.Class({
  name: 'cc.TiledMapRenderDataList',
  ctor: function ctor() {
    this._dataList = [];
    this._offset = 0;
  },
  _pushRenderData: function _pushRenderData() {
    var renderData = {};
    renderData.ia = new _inputAssembler["default"]();
    renderData.nodesRenderList = [];

    this._dataList.push(renderData);
  },
  popRenderData: function popRenderData(buffer) {
    if (this._offset >= this._dataList.length) {
      this._pushRenderData();
    }

    var renderData = this._dataList[this._offset];
    renderData.nodesRenderList.length = 0;
    var ia = renderData.ia;
    ia._vertexBuffer = buffer._vb;
    ia._indexBuffer = buffer._ib;
    ia._start = buffer.indiceOffset;
    ia._count = 0;
    this._offset++;
    return renderData;
  },
  pushNodesList: function pushNodesList(renderData, nodesList) {
    renderData.nodesRenderList.push(nodesList);
  },
  reset: function reset() {
    this._offset = 0;
  }
});
cc.TiledMapRenderDataList = module.exports = TiledMapRenderDataList;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC90aWxlbWFwL0NDVGlsZWRNYXBSZW5kZXJEYXRhTGlzdC5qcyJdLCJuYW1lcyI6WyJUaWxlZE1hcFJlbmRlckRhdGFMaXN0IiwiY2MiLCJDbGFzcyIsIm5hbWUiLCJjdG9yIiwiX2RhdGFMaXN0IiwiX29mZnNldCIsIl9wdXNoUmVuZGVyRGF0YSIsInJlbmRlckRhdGEiLCJpYSIsIklucHV0QXNzZW1ibGVyIiwibm9kZXNSZW5kZXJMaXN0IiwicHVzaCIsInBvcFJlbmRlckRhdGEiLCJidWZmZXIiLCJsZW5ndGgiLCJfdmVydGV4QnVmZmVyIiwiX3ZiIiwiX2luZGV4QnVmZmVyIiwiX2liIiwiX3N0YXJ0IiwiaW5kaWNlT2Zmc2V0IiwiX2NvdW50IiwicHVzaE5vZGVzTGlzdCIsIm5vZGVzTGlzdCIsInJlc2V0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXdCQTs7OztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLHNCQUFzQixHQUFHQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNsQ0MsRUFBQUEsSUFBSSxFQUFFLDJCQUQ0QjtBQUdsQ0MsRUFBQUEsSUFIa0Msa0JBRzFCO0FBQ0osU0FBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxDQUFmO0FBQ0gsR0FOaUM7QUFRbENDLEVBQUFBLGVBUmtDLDZCQVFmO0FBQ2YsUUFBSUMsVUFBVSxHQUFHLEVBQWpCO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQ0MsRUFBWCxHQUFnQixJQUFJQywwQkFBSixFQUFoQjtBQUNBRixJQUFBQSxVQUFVLENBQUNHLGVBQVgsR0FBNkIsRUFBN0I7O0FBQ0EsU0FBS04sU0FBTCxDQUFlTyxJQUFmLENBQW9CSixVQUFwQjtBQUNILEdBYmlDO0FBZWxDSyxFQUFBQSxhQWZrQyx5QkFlbkJDLE1BZm1CLEVBZVg7QUFDbkIsUUFBSSxLQUFLUixPQUFMLElBQWdCLEtBQUtELFNBQUwsQ0FBZVUsTUFBbkMsRUFBMkM7QUFDdkMsV0FBS1IsZUFBTDtBQUNIOztBQUNELFFBQUlDLFVBQVUsR0FBRyxLQUFLSCxTQUFMLENBQWUsS0FBS0MsT0FBcEIsQ0FBakI7QUFDQUUsSUFBQUEsVUFBVSxDQUFDRyxlQUFYLENBQTJCSSxNQUEzQixHQUFvQyxDQUFwQztBQUNBLFFBQUlOLEVBQUUsR0FBR0QsVUFBVSxDQUFDQyxFQUFwQjtBQUNBQSxJQUFBQSxFQUFFLENBQUNPLGFBQUgsR0FBbUJGLE1BQU0sQ0FBQ0csR0FBMUI7QUFDQVIsSUFBQUEsRUFBRSxDQUFDUyxZQUFILEdBQWtCSixNQUFNLENBQUNLLEdBQXpCO0FBQ0FWLElBQUFBLEVBQUUsQ0FBQ1csTUFBSCxHQUFZTixNQUFNLENBQUNPLFlBQW5CO0FBQ0FaLElBQUFBLEVBQUUsQ0FBQ2EsTUFBSCxHQUFZLENBQVo7QUFDQSxTQUFLaEIsT0FBTDtBQUNBLFdBQU9FLFVBQVA7QUFDSCxHQTVCaUM7QUE4QmxDZSxFQUFBQSxhQTlCa0MseUJBOEJuQmYsVUE5Qm1CLEVBOEJQZ0IsU0E5Qk8sRUE4Qkk7QUFDbENoQixJQUFBQSxVQUFVLENBQUNHLGVBQVgsQ0FBMkJDLElBQTNCLENBQWdDWSxTQUFoQztBQUNILEdBaENpQztBQWtDbENDLEVBQUFBLEtBbENrQyxtQkFrQ3pCO0FBQ0wsU0FBS25CLE9BQUwsR0FBZSxDQUFmO0FBQ0g7QUFwQ2lDLENBQVQsQ0FBN0I7QUF1Q0FMLEVBQUUsQ0FBQ0Qsc0JBQUgsR0FBNEIwQixNQUFNLENBQUNDLE9BQVAsR0FBaUIzQixzQkFBN0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuaW1wb3J0IElucHV0QXNzZW1ibGVyIGZyb20gJy4uL3JlbmRlcmVyL2NvcmUvaW5wdXQtYXNzZW1ibGVyJztcblxubGV0IFRpbGVkTWFwUmVuZGVyRGF0YUxpc3QgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlRpbGVkTWFwUmVuZGVyRGF0YUxpc3QnLFxuXG4gICAgY3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2RhdGFMaXN0ID0gW107XG4gICAgICAgIHRoaXMuX29mZnNldCA9IDA7XG4gICAgfSxcblxuICAgIF9wdXNoUmVuZGVyRGF0YSAoKSB7XG4gICAgICAgIGxldCByZW5kZXJEYXRhID0ge307XG4gICAgICAgIHJlbmRlckRhdGEuaWEgPSBuZXcgSW5wdXRBc3NlbWJsZXIoKTtcbiAgICAgICAgcmVuZGVyRGF0YS5ub2Rlc1JlbmRlckxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fZGF0YUxpc3QucHVzaChyZW5kZXJEYXRhKTtcbiAgICB9LFxuXG4gICAgcG9wUmVuZGVyRGF0YSAoYnVmZmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vZmZzZXQgPj0gdGhpcy5fZGF0YUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9wdXNoUmVuZGVyRGF0YSgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZW5kZXJEYXRhID0gdGhpcy5fZGF0YUxpc3RbdGhpcy5fb2Zmc2V0XTtcbiAgICAgICAgcmVuZGVyRGF0YS5ub2Rlc1JlbmRlckxpc3QubGVuZ3RoID0gMDtcbiAgICAgICAgbGV0IGlhID0gcmVuZGVyRGF0YS5pYTtcbiAgICAgICAgaWEuX3ZlcnRleEJ1ZmZlciA9IGJ1ZmZlci5fdmI7XG4gICAgICAgIGlhLl9pbmRleEJ1ZmZlciA9IGJ1ZmZlci5faWI7XG4gICAgICAgIGlhLl9zdGFydCA9IGJ1ZmZlci5pbmRpY2VPZmZzZXQ7XG4gICAgICAgIGlhLl9jb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX29mZnNldCsrO1xuICAgICAgICByZXR1cm4gcmVuZGVyRGF0YTtcbiAgICB9LFxuXG4gICAgcHVzaE5vZGVzTGlzdCAocmVuZGVyRGF0YSwgbm9kZXNMaXN0KSB7XG4gICAgICAgIHJlbmRlckRhdGEubm9kZXNSZW5kZXJMaXN0LnB1c2gobm9kZXNMaXN0KTtcbiAgICB9LFxuXG4gICAgcmVzZXQgKCkge1xuICAgICAgICB0aGlzLl9vZmZzZXQgPSAwO1xuICAgIH1cbn0pO1xuXG5jYy5UaWxlZE1hcFJlbmRlckRhdGFMaXN0ID0gbW9kdWxlLmV4cG9ydHMgPSBUaWxlZE1hcFJlbmRlckRhdGFMaXN0OyJdLCJzb3VyY2VSb290IjoiLyJ9