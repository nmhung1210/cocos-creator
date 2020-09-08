
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-3d.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vertexFormat = require("./webgl/vertex-format");

var _vec = _interopRequireDefault(require("../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var vec3_temps = [];

for (var i = 0; i < 4; i++) {
  vec3_temps.push(cc.v3());
}

var Assembler3D = {
  floatsPerVert: 6,
  uvOffset: 3,
  colorOffset: 5,
  getBuffer: function getBuffer(renderer) {
    return renderer._meshBuffer3D;
  },
  getVfmt: function getVfmt() {
    return _vertexFormat.vfmt3D;
  },
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];

    _vec["default"].set(vec3_temps[0], local[0], local[1], 0);

    _vec["default"].set(vec3_temps[1], local[2], local[1], 0);

    _vec["default"].set(vec3_temps[2], local[0], local[3], 0);

    _vec["default"].set(vec3_temps[3], local[2], local[3], 0);

    var floatsPerVert = this.floatsPerVert;

    for (var _i = 0; _i < 4; _i++) {
      var vertex = vec3_temps[_i];

      _vec["default"].transformMat4(vertex, vertex, matrix);

      var dstOffset = floatsPerVert * _i;
      world[dstOffset] = vertex.x;
      world[dstOffset + 1] = vertex.y;
      world[dstOffset + 2] = vertex.z;
    }
  }
};
cc.Assembler3D = Assembler3D;
var _default = Assembler3D;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlci0zZC5qcyJdLCJuYW1lcyI6WyJ2ZWMzX3RlbXBzIiwiaSIsInB1c2giLCJjYyIsInYzIiwiQXNzZW1ibGVyM0QiLCJmbG9hdHNQZXJWZXJ0IiwidXZPZmZzZXQiLCJjb2xvck9mZnNldCIsImdldEJ1ZmZlciIsInJlbmRlcmVyIiwiX21lc2hCdWZmZXIzRCIsImdldFZmbXQiLCJ2Zm10M0QiLCJ1cGRhdGVXb3JsZFZlcnRzIiwiY29tcCIsIm1hdHJpeCIsIm5vZGUiLCJfd29ybGRNYXRyaXgiLCJsb2NhbCIsIl9sb2NhbCIsIndvcmxkIiwiX3JlbmRlckRhdGEiLCJ2RGF0YXMiLCJWZWMzIiwic2V0IiwidmVydGV4IiwidHJhbnNmb3JtTWF0NCIsImRzdE9mZnNldCIsIngiLCJ5IiwieiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBSUEsVUFBVSxHQUFHLEVBQWpCOztBQUNBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QkQsRUFBQUEsVUFBVSxDQUFDRSxJQUFYLENBQWdCQyxFQUFFLENBQUNDLEVBQUgsRUFBaEI7QUFDSDs7QUFFRCxJQUFJQyxXQUFXLEdBQUc7QUFDZEMsRUFBQUEsYUFBYSxFQUFFLENBREQ7QUFHZEMsRUFBQUEsUUFBUSxFQUFFLENBSEk7QUFJZEMsRUFBQUEsV0FBVyxFQUFFLENBSkM7QUFNZEMsRUFBQUEsU0FOYyxxQkFNSEMsUUFORyxFQU1PO0FBQ2pCLFdBQU9BLFFBQVEsQ0FBQ0MsYUFBaEI7QUFDSCxHQVJhO0FBVWRDLEVBQUFBLE9BVmMscUJBVUg7QUFDUCxXQUFPQyxvQkFBUDtBQUNILEdBWmE7QUFjZEMsRUFBQUEsZ0JBZGMsNEJBY0lDLElBZEosRUFjVTtBQUNwQixRQUFJQyxNQUFNLEdBQUdELElBQUksQ0FBQ0UsSUFBTCxDQUFVQyxZQUF2QjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxNQUFqQjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaOztBQUVBQyxvQkFBS0MsR0FBTCxDQUFTekIsVUFBVSxDQUFDLENBQUQsQ0FBbkIsRUFBd0JtQixLQUFLLENBQUMsQ0FBRCxDQUE3QixFQUFrQ0EsS0FBSyxDQUFDLENBQUQsQ0FBdkMsRUFBNEMsQ0FBNUM7O0FBQ0FLLG9CQUFLQyxHQUFMLENBQVN6QixVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3Qm1CLEtBQUssQ0FBQyxDQUFELENBQTdCLEVBQWtDQSxLQUFLLENBQUMsQ0FBRCxDQUF2QyxFQUE0QyxDQUE1Qzs7QUFDQUssb0JBQUtDLEdBQUwsQ0FBU3pCLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCbUIsS0FBSyxDQUFDLENBQUQsQ0FBN0IsRUFBa0NBLEtBQUssQ0FBQyxDQUFELENBQXZDLEVBQTRDLENBQTVDOztBQUNBSyxvQkFBS0MsR0FBTCxDQUFTekIsVUFBVSxDQUFDLENBQUQsQ0FBbkIsRUFBd0JtQixLQUFLLENBQUMsQ0FBRCxDQUE3QixFQUFrQ0EsS0FBSyxDQUFDLENBQUQsQ0FBdkMsRUFBNEMsQ0FBNUM7O0FBRUEsUUFBSWIsYUFBYSxHQUFHLEtBQUtBLGFBQXpCOztBQUNBLFNBQUssSUFBSUwsRUFBQyxHQUFHLENBQWIsRUFBZ0JBLEVBQUMsR0FBRyxDQUFwQixFQUF1QkEsRUFBQyxFQUF4QixFQUE0QjtBQUN4QixVQUFJeUIsTUFBTSxHQUFHMUIsVUFBVSxDQUFDQyxFQUFELENBQXZCOztBQUNBdUIsc0JBQUtHLGFBQUwsQ0FBbUJELE1BQW5CLEVBQTJCQSxNQUEzQixFQUFtQ1YsTUFBbkM7O0FBRUEsVUFBSVksU0FBUyxHQUFHdEIsYUFBYSxHQUFHTCxFQUFoQztBQUNBb0IsTUFBQUEsS0FBSyxDQUFDTyxTQUFELENBQUwsR0FBbUJGLE1BQU0sQ0FBQ0csQ0FBMUI7QUFDQVIsTUFBQUEsS0FBSyxDQUFDTyxTQUFTLEdBQUMsQ0FBWCxDQUFMLEdBQXFCRixNQUFNLENBQUNJLENBQTVCO0FBQ0FULE1BQUFBLEtBQUssQ0FBQ08sU0FBUyxHQUFDLENBQVgsQ0FBTCxHQUFxQkYsTUFBTSxDQUFDSyxDQUE1QjtBQUNIO0FBQ0o7QUFsQ2EsQ0FBbEI7QUFxQ0E1QixFQUFFLENBQUNFLFdBQUgsR0FBaUJBLFdBQWpCO2VBQ2VBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmZtdDNEIH0gZnJvbSAnLi93ZWJnbC92ZXJ0ZXgtZm9ybWF0JztcbmltcG9ydCBWZWMzIGZyb20gJy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuXG5sZXQgdmVjM190ZW1wcyA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2ZWMzX3RlbXBzLnB1c2goY2MudjMoKSk7XG59XG5cbmxldCBBc3NlbWJsZXIzRCA9IHtcbiAgICBmbG9hdHNQZXJWZXJ0OiA2LFxuXG4gICAgdXZPZmZzZXQ6IDMsXG4gICAgY29sb3JPZmZzZXQ6IDUsXG5cbiAgICBnZXRCdWZmZXIgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJldHVybiByZW5kZXJlci5fbWVzaEJ1ZmZlcjNEO1xuICAgIH0sXG5cbiAgICBnZXRWZm10ICgpIHtcbiAgICAgICAgcmV0dXJuIHZmbXQzRDtcbiAgICB9LFxuXG4gICAgdXBkYXRlV29ybGRWZXJ0cyAoY29tcCkge1xuICAgICAgICBsZXQgbWF0cml4ID0gY29tcC5ub2RlLl93b3JsZE1hdHJpeDtcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XG4gICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xuICAgICAgICBcbiAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1swXSwgbG9jYWxbMF0sIGxvY2FsWzFdLCAwKTtcbiAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1sxXSwgbG9jYWxbMl0sIGxvY2FsWzFdLCAwKTtcbiAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1syXSwgbG9jYWxbMF0sIGxvY2FsWzNdLCAwKTtcbiAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1szXSwgbG9jYWxbMl0sIGxvY2FsWzNdLCAwKTtcblxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCB2ZXJ0ZXggPSB2ZWMzX3RlbXBzW2ldO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KHZlcnRleCwgdmVydGV4LCBtYXRyaXgpO1xuXG4gICAgICAgICAgICBsZXQgZHN0T2Zmc2V0ID0gZmxvYXRzUGVyVmVydCAqIGk7XG4gICAgICAgICAgICB3b3JsZFtkc3RPZmZzZXRdID0gdmVydGV4Lng7XG4gICAgICAgICAgICB3b3JsZFtkc3RPZmZzZXQrMV0gPSB2ZXJ0ZXgueTtcbiAgICAgICAgICAgIHdvcmxkW2RzdE9mZnNldCsyXSA9IHZlcnRleC56O1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmNjLkFzc2VtYmxlcjNEID0gQXNzZW1ibGVyM0Q7XG5leHBvcnQgZGVmYXVsdCBBc3NlbWJsZXIzRDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9