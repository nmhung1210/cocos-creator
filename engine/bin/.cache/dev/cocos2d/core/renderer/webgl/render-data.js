
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/render-data.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = RenderData;

var _flexBuffer = _interopRequireDefault(require("./flex-buffer"));

var _vertexFormat = require("./vertex-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function RenderData() {
  this.vDatas = [];
  this.uintVDatas = [];
  this.iDatas = [];
  this.meshCount = 0;
  this._infos = null;
  this._flexBuffer = null;
}

cc.js.mixin(RenderData.prototype, {
  init: function init(assembler) {},
  clear: function clear() {
    this.vDatas.length = 0;
    this.iDatas.length = 0;
    this.uintVDatas.length = 0;
    this.meshCount = 0;
    this._infos = null;

    if (this._flexBuffer) {
      this._flexBuffer.reset();
    }
  },
  updateMesh: function updateMesh(index, vertices, indices) {
    this.vDatas[index] = vertices;
    this.uintVDatas[index] = new Uint32Array(vertices.buffer, 0, vertices.length);
    this.iDatas[index] = indices;
    this.meshCount = this.vDatas.length;
  },
  updateMeshRange: function updateMeshRange(verticesCount, indicesCount) {},
  createData: function createData(index, verticesFloats, indicesCount) {
    var vertices = new Float32Array(verticesFloats);
    var indices = new Uint16Array(indicesCount);
    this.updateMesh(index, vertices, indices);
  },
  createQuadData: function createQuadData(index, verticesFloats, indicesCount) {
    this.createData(index, verticesFloats, indicesCount);
    this.initQuadIndices(this.iDatas[index]);
  },
  createFlexData: function createFlexData(index, verticesFloats, indicesCount, vfmt) {
    vfmt = vfmt || _vertexFormat.vfmtPosUvColor;
    this._flexBuffer = new _flexBuffer["default"](this, index, verticesFloats, indicesCount, vfmt);
  },
  initQuadIndices: function initQuadIndices(indices) {
    var count = indices.length / 6;

    for (var i = 0, idx = 0; i < count; i++) {
      var vertextID = i * 4;
      indices[idx++] = vertextID;
      indices[idx++] = vertextID + 1;
      indices[idx++] = vertextID + 2;
      indices[idx++] = vertextID + 1;
      indices[idx++] = vertextID + 3;
      indices[idx++] = vertextID + 2;
    }
  }
});
cc.RenderData = RenderData;
module.exports = exports["default"];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL3JlbmRlci1kYXRhLmpzIl0sIm5hbWVzIjpbIlJlbmRlckRhdGEiLCJ2RGF0YXMiLCJ1aW50VkRhdGFzIiwiaURhdGFzIiwibWVzaENvdW50IiwiX2luZm9zIiwiX2ZsZXhCdWZmZXIiLCJjYyIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiLCJpbml0IiwiYXNzZW1ibGVyIiwiY2xlYXIiLCJsZW5ndGgiLCJyZXNldCIsInVwZGF0ZU1lc2giLCJpbmRleCIsInZlcnRpY2VzIiwiaW5kaWNlcyIsIlVpbnQzMkFycmF5IiwiYnVmZmVyIiwidXBkYXRlTWVzaFJhbmdlIiwidmVydGljZXNDb3VudCIsImluZGljZXNDb3VudCIsImNyZWF0ZURhdGEiLCJ2ZXJ0aWNlc0Zsb2F0cyIsIkZsb2F0MzJBcnJheSIsIlVpbnQxNkFycmF5IiwiY3JlYXRlUXVhZERhdGEiLCJpbml0UXVhZEluZGljZXMiLCJjcmVhdGVGbGV4RGF0YSIsInZmbXQiLCJ2Zm10UG9zVXZDb2xvciIsIkZsZXhCdWZmZXIiLCJjb3VudCIsImkiLCJpZHgiLCJ2ZXJ0ZXh0SUQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVlLFNBQVNBLFVBQVQsR0FBdUI7QUFDbEMsT0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBRUEsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxPQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0g7O0FBRURDLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNQyxLQUFOLENBQVlULFVBQVUsQ0FBQ1UsU0FBdkIsRUFBa0M7QUFDOUJDLEVBQUFBLElBRDhCLGdCQUN4QkMsU0FEd0IsRUFDYixDQUNoQixDQUY2QjtBQUc5QkMsRUFBQUEsS0FIOEIsbUJBR3JCO0FBQ0wsU0FBS1osTUFBTCxDQUFZYSxNQUFaLEdBQXFCLENBQXJCO0FBQ0EsU0FBS1gsTUFBTCxDQUFZVyxNQUFaLEdBQXFCLENBQXJCO0FBQ0EsU0FBS1osVUFBTCxDQUFnQlksTUFBaEIsR0FBeUIsQ0FBekI7QUFDQSxTQUFLVixTQUFMLEdBQWlCLENBQWpCO0FBRUEsU0FBS0MsTUFBTCxHQUFjLElBQWQ7O0FBRUEsUUFBSSxLQUFLQyxXQUFULEVBQXNCO0FBQ2xCLFdBQUtBLFdBQUwsQ0FBaUJTLEtBQWpCO0FBQ0g7QUFDSixHQWQ2QjtBQWdCOUJDLEVBQUFBLFVBaEI4QixzQkFnQmxCQyxLQWhCa0IsRUFnQlhDLFFBaEJXLEVBZ0JEQyxPQWhCQyxFQWdCUTtBQUNsQyxTQUFLbEIsTUFBTCxDQUFZZ0IsS0FBWixJQUFxQkMsUUFBckI7QUFDQSxTQUFLaEIsVUFBTCxDQUFnQmUsS0FBaEIsSUFBeUIsSUFBSUcsV0FBSixDQUFnQkYsUUFBUSxDQUFDRyxNQUF6QixFQUFpQyxDQUFqQyxFQUFvQ0gsUUFBUSxDQUFDSixNQUE3QyxDQUF6QjtBQUNBLFNBQUtYLE1BQUwsQ0FBWWMsS0FBWixJQUFxQkUsT0FBckI7QUFFQSxTQUFLZixTQUFMLEdBQWlCLEtBQUtILE1BQUwsQ0FBWWEsTUFBN0I7QUFDSCxHQXRCNkI7QUF3QjlCUSxFQUFBQSxlQXhCOEIsMkJBd0JiQyxhQXhCYSxFQXdCRUMsWUF4QkYsRUF3QmdCLENBQzdDLENBekI2QjtBQTJCOUJDLEVBQUFBLFVBM0I4QixzQkEyQmxCUixLQTNCa0IsRUEyQlhTLGNBM0JXLEVBMkJLRixZQTNCTCxFQTJCbUI7QUFDN0MsUUFBSU4sUUFBUSxHQUFHLElBQUlTLFlBQUosQ0FBaUJELGNBQWpCLENBQWY7QUFDQSxRQUFJUCxPQUFPLEdBQUcsSUFBSVMsV0FBSixDQUFnQkosWUFBaEIsQ0FBZDtBQUNBLFNBQUtSLFVBQUwsQ0FBZ0JDLEtBQWhCLEVBQXVCQyxRQUF2QixFQUFpQ0MsT0FBakM7QUFDSCxHQS9CNkI7QUFpQzlCVSxFQUFBQSxjQWpDOEIsMEJBaUNkWixLQWpDYyxFQWlDUFMsY0FqQ08sRUFpQ1NGLFlBakNULEVBaUN1QjtBQUNqRCxTQUFLQyxVQUFMLENBQWdCUixLQUFoQixFQUF1QlMsY0FBdkIsRUFBdUNGLFlBQXZDO0FBQ0EsU0FBS00sZUFBTCxDQUFxQixLQUFLM0IsTUFBTCxDQUFZYyxLQUFaLENBQXJCO0FBQ0gsR0FwQzZCO0FBc0M5QmMsRUFBQUEsY0F0QzhCLDBCQXNDZGQsS0F0Q2MsRUFzQ1BTLGNBdENPLEVBc0NTRixZQXRDVCxFQXNDdUJRLElBdEN2QixFQXNDNkI7QUFDdkRBLElBQUFBLElBQUksR0FBR0EsSUFBSSxJQUFJQyw0QkFBZjtBQUNBLFNBQUszQixXQUFMLEdBQW1CLElBQUk0QixzQkFBSixDQUFlLElBQWYsRUFBcUJqQixLQUFyQixFQUE0QlMsY0FBNUIsRUFBNENGLFlBQTVDLEVBQTBEUSxJQUExRCxDQUFuQjtBQUNILEdBekM2QjtBQTJDOUJGLEVBQUFBLGVBM0M4QiwyQkEyQ2RYLE9BM0NjLEVBMkNMO0FBQ3JCLFFBQUlnQixLQUFLLEdBQUdoQixPQUFPLENBQUNMLE1BQVIsR0FBaUIsQ0FBN0I7O0FBQ0EsU0FBSyxJQUFJc0IsQ0FBQyxHQUFHLENBQVIsRUFBV0MsR0FBRyxHQUFHLENBQXRCLEVBQXlCRCxDQUFDLEdBQUdELEtBQTdCLEVBQW9DQyxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDLFVBQUlFLFNBQVMsR0FBR0YsQ0FBQyxHQUFHLENBQXBCO0FBQ0FqQixNQUFBQSxPQUFPLENBQUNrQixHQUFHLEVBQUosQ0FBUCxHQUFpQkMsU0FBakI7QUFDQW5CLE1BQUFBLE9BQU8sQ0FBQ2tCLEdBQUcsRUFBSixDQUFQLEdBQWlCQyxTQUFTLEdBQUMsQ0FBM0I7QUFDQW5CLE1BQUFBLE9BQU8sQ0FBQ2tCLEdBQUcsRUFBSixDQUFQLEdBQWlCQyxTQUFTLEdBQUMsQ0FBM0I7QUFDQW5CLE1BQUFBLE9BQU8sQ0FBQ2tCLEdBQUcsRUFBSixDQUFQLEdBQWlCQyxTQUFTLEdBQUMsQ0FBM0I7QUFDQW5CLE1BQUFBLE9BQU8sQ0FBQ2tCLEdBQUcsRUFBSixDQUFQLEdBQWlCQyxTQUFTLEdBQUMsQ0FBM0I7QUFDQW5CLE1BQUFBLE9BQU8sQ0FBQ2tCLEdBQUcsRUFBSixDQUFQLEdBQWlCQyxTQUFTLEdBQUMsQ0FBM0I7QUFDSDtBQUNKO0FBdEQ2QixDQUFsQztBQXlEQS9CLEVBQUUsQ0FBQ1AsVUFBSCxHQUFnQkEsVUFBaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmxleEJ1ZmZlciBmcm9tIFwiLi9mbGV4LWJ1ZmZlclwiO1xuaW1wb3J0IHsgdmZtdFBvc1V2Q29sb3IgfSBmcm9tICcuL3ZlcnRleC1mb3JtYXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJEYXRhICgpIHtcbiAgICB0aGlzLnZEYXRhcyA9IFtdO1xuICAgIHRoaXMudWludFZEYXRhcyA9IFtdO1xuICAgIHRoaXMuaURhdGFzID0gW107XG4gICAgdGhpcy5tZXNoQ291bnQgPSAwO1xuXG4gICAgdGhpcy5faW5mb3MgPSBudWxsO1xuICAgIHRoaXMuX2ZsZXhCdWZmZXIgPSBudWxsO1xufVxuXG5jYy5qcy5taXhpbihSZW5kZXJEYXRhLnByb3RvdHlwZSwge1xuICAgIGluaXQgKGFzc2VtYmxlcikge1xuICAgIH0sXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLnZEYXRhcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmlEYXRhcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLnVpbnRWRGF0YXMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5tZXNoQ291bnQgPSAwO1xuXG4gICAgICAgIHRoaXMuX2luZm9zID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5fZmxleEJ1ZmZlcikge1xuICAgICAgICAgICAgdGhpcy5fZmxleEJ1ZmZlci5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZU1lc2ggKGluZGV4LCB2ZXJ0aWNlcywgaW5kaWNlcykge1xuICAgICAgICB0aGlzLnZEYXRhc1tpbmRleF0gPSB2ZXJ0aWNlcztcbiAgICAgICAgdGhpcy51aW50VkRhdGFzW2luZGV4XSA9IG5ldyBVaW50MzJBcnJheSh2ZXJ0aWNlcy5idWZmZXIsIDAsIHZlcnRpY2VzLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuaURhdGFzW2luZGV4XSA9IGluZGljZXM7XG4gICAgXG4gICAgICAgIHRoaXMubWVzaENvdW50ID0gdGhpcy52RGF0YXMubGVuZ3RoO1xuICAgIH0sXG5cbiAgICB1cGRhdGVNZXNoUmFuZ2UgKHZlcnRpY2VzQ291bnQsIGluZGljZXNDb3VudCkge1xuICAgIH0sXG4gICAgXG4gICAgY3JlYXRlRGF0YSAoaW5kZXgsIHZlcnRpY2VzRmxvYXRzLCBpbmRpY2VzQ291bnQpIHtcbiAgICAgICAgbGV0IHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheSh2ZXJ0aWNlc0Zsb2F0cyk7XG4gICAgICAgIGxldCBpbmRpY2VzID0gbmV3IFVpbnQxNkFycmF5KGluZGljZXNDb3VudCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWVzaChpbmRleCwgdmVydGljZXMsIGluZGljZXMpO1xuICAgIH0sXG4gICAgXG4gICAgY3JlYXRlUXVhZERhdGEgKGluZGV4LCB2ZXJ0aWNlc0Zsb2F0cywgaW5kaWNlc0NvdW50KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRGF0YShpbmRleCwgdmVydGljZXNGbG9hdHMsIGluZGljZXNDb3VudCk7XG4gICAgICAgIHRoaXMuaW5pdFF1YWRJbmRpY2VzKHRoaXMuaURhdGFzW2luZGV4XSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUZsZXhEYXRhIChpbmRleCwgdmVydGljZXNGbG9hdHMsIGluZGljZXNDb3VudCwgdmZtdCkge1xuICAgICAgICB2Zm10ID0gdmZtdCB8fCB2Zm10UG9zVXZDb2xvcjtcbiAgICAgICAgdGhpcy5fZmxleEJ1ZmZlciA9IG5ldyBGbGV4QnVmZmVyKHRoaXMsIGluZGV4LCB2ZXJ0aWNlc0Zsb2F0cywgaW5kaWNlc0NvdW50LCB2Zm10KTtcbiAgICB9LFxuXG4gICAgaW5pdFF1YWRJbmRpY2VzKGluZGljZXMpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gaW5kaWNlcy5sZW5ndGggLyA2O1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWR4ID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXh0SUQgPSBpICogNDtcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEO1xuICAgICAgICAgICAgaW5kaWNlc1tpZHgrK10gPSB2ZXJ0ZXh0SUQrMTtcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzI7XG4gICAgICAgICAgICBpbmRpY2VzW2lkeCsrXSA9IHZlcnRleHRJRCsxO1xuICAgICAgICAgICAgaW5kaWNlc1tpZHgrK10gPSB2ZXJ0ZXh0SUQrMztcbiAgICAgICAgICAgIGluZGljZXNbaWR4KytdID0gdmVydGV4dElEKzI7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG5jYy5SZW5kZXJEYXRhID0gUmVuZGVyRGF0YTtcblxuIl0sInNvdXJjZVJvb3QiOiIvIn0=