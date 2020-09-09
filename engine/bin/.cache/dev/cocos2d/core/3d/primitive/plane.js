
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/plane.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _vec = _interopRequireDefault(require("../../value-types/vec3"));

var _vertexData = _interopRequireDefault(require("./vertex-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var temp1 = new _vec["default"]();
var temp2 = new _vec["default"]();
var temp3 = new _vec["default"]();
var r = new _vec["default"]();
var c00 = new _vec["default"]();
var c10 = new _vec["default"]();
var c01 = new _vec["default"]();
/**
 * @param {Number} width
 * @param {Number} length
 * @param {Object} opts
 * @param {Number} opts.widthSegments
 * @param {Number} opts.lengthSegments
 */

function _default(width, length, opts) {
  if (width === void 0) {
    width = 10;
  }

  if (length === void 0) {
    length = 10;
  }

  if (opts === void 0) {
    opts = {
      widthSegments: 10,
      lengthSegments: 10
    };
  }

  var uSegments = opts.widthSegments;
  var vSegments = opts.lengthSegments;
  var hw = width * 0.5;
  var hl = length * 0.5;
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _vec["default"](-hw, 0, -hl);
  var maxPos = new _vec["default"](hw, 0, hl);
  var boundingRadius = Math.sqrt(width * width + length * length);

  _vec["default"].set(c00, -hw, 0, hl);

  _vec["default"].set(c10, hw, 0, hl);

  _vec["default"].set(c01, -hw, 0, -hl);

  for (var y = 0; y <= vSegments; y++) {
    for (var x = 0; x <= uSegments; x++) {
      var u = x / uSegments;
      var v = y / vSegments;

      _vec["default"].lerp(temp1, c00, c10, u);

      _vec["default"].lerp(temp2, c00, c01, v);

      _vec["default"].sub(temp3, temp2, c00);

      _vec["default"].add(r, temp1, temp3);

      positions.push(r.x, r.y, r.z);
      normals.push(0, 1, 0);
      uvs.push(u, v);

      if (x < uSegments && y < vSegments) {
        var useg1 = uSegments + 1;
        var a = x + y * useg1;
        var b = x + (y + 1) * useg1;
        var c = x + 1 + (y + 1) * useg1;
        var d = x + 1 + y * useg1;
        indices.push(a, d, b);
        indices.push(d, c, b);
      }
    }
  }

  return new _vertexData["default"](positions, normals, uvs, indices, minPos, maxPos, boundingRadius);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS9wbGFuZS50cyJdLCJuYW1lcyI6WyJ0ZW1wMSIsIlZlYzMiLCJ0ZW1wMiIsInRlbXAzIiwiciIsImMwMCIsImMxMCIsImMwMSIsIndpZHRoIiwibGVuZ3RoIiwib3B0cyIsIndpZHRoU2VnbWVudHMiLCJsZW5ndGhTZWdtZW50cyIsInVTZWdtZW50cyIsInZTZWdtZW50cyIsImh3IiwiaGwiLCJwb3NpdGlvbnMiLCJub3JtYWxzIiwidXZzIiwiaW5kaWNlcyIsIm1pblBvcyIsIm1heFBvcyIsImJvdW5kaW5nUmFkaXVzIiwiTWF0aCIsInNxcnQiLCJzZXQiLCJ5IiwieCIsInUiLCJ2IiwibGVycCIsInN1YiIsImFkZCIsInB1c2giLCJ6IiwidXNlZzEiLCJhIiwiYiIsImMiLCJkIiwiVmVydGV4RGF0YSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFFQTs7QUFDQTs7OztBQUVBLElBQUlBLEtBQUssR0FBRyxJQUFJQyxlQUFKLEVBQVo7QUFDQSxJQUFJQyxLQUFLLEdBQUcsSUFBSUQsZUFBSixFQUFaO0FBQ0EsSUFBSUUsS0FBSyxHQUFHLElBQUlGLGVBQUosRUFBWjtBQUNBLElBQUlHLENBQUMsR0FBRyxJQUFJSCxlQUFKLEVBQVI7QUFDQSxJQUFJSSxHQUFHLEdBQUcsSUFBSUosZUFBSixFQUFWO0FBQ0EsSUFBSUssR0FBRyxHQUFHLElBQUlMLGVBQUosRUFBVjtBQUNBLElBQUlNLEdBQUcsR0FBRyxJQUFJTixlQUFKLEVBQVY7QUFFQTs7Ozs7Ozs7QUFPZSxrQkFBVU8sS0FBVixFQUFzQkMsTUFBdEIsRUFBbUNDLElBQW5DLEVBQW1GO0FBQUEsTUFBekVGLEtBQXlFO0FBQXpFQSxJQUFBQSxLQUF5RSxHQUFqRSxFQUFpRTtBQUFBOztBQUFBLE1BQTdEQyxNQUE2RDtBQUE3REEsSUFBQUEsTUFBNkQsR0FBcEQsRUFBb0Q7QUFBQTs7QUFBQSxNQUFoREMsSUFBZ0Q7QUFB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Q0QsQ0FBQyxHQUFHLENBQUwsSUFBVVMsS0FBNUI7QUFDQSxZQUFJSSxDQUFDLEdBQUlaLENBQUMsR0FBRyxDQUFMLEdBQVVELENBQUMsR0FBR1MsS0FBdEI7QUFFQWhCLFFBQUFBLE9BQU8sQ0FBQ2MsSUFBUixDQUFhRyxDQUFiLEVBQWdCRyxDQUFoQixFQUFtQkYsQ0FBbkI7QUFDQWxCLFFBQUFBLE9BQU8sQ0FBQ2MsSUFBUixDQUFhTSxDQUFiLEVBQWdCRCxDQUFoQixFQUFtQkQsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBTyxJQUFJRyxzQkFBSixDQUNMeEIsU0FESyxFQUVMQyxPQUZLLEVBR0xDLEdBSEssRUFJTEMsT0FKSyxFQUtMQyxNQUxLLEVBTUxDLE1BTkssRUFPTEMsY0FQSyxDQUFQO0FBU0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuaW1wb3J0IFZlcnRleERhdGEgZnJvbSAnLi92ZXJ0ZXgtZGF0YSc7XG5cbmxldCB0ZW1wMSA9IG5ldyBWZWMzKCk7XG5sZXQgdGVtcDIgPSBuZXcgVmVjMygpO1xubGV0IHRlbXAzID0gbmV3IFZlYzMoKTtcbmxldCByID0gbmV3IFZlYzMoKTtcbmxldCBjMDAgPSBuZXcgVmVjMygpO1xubGV0IGMxMCA9IG5ldyBWZWMzKCk7XG5sZXQgYzAxID0gbmV3IFZlYzMoKTtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBsZW5ndGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy53aWR0aFNlZ21lbnRzXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5sZW5ndGhTZWdtZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAod2lkdGggPSAxMCwgbGVuZ3RoID0gMTAsIG9wdHMgPSB7d2lkdGhTZWdtZW50czogMTAsIGxlbmd0aFNlZ21lbnRzOiAxMH0pIHtcbiAgbGV0IHVTZWdtZW50cyA9IG9wdHMud2lkdGhTZWdtZW50cztcbiAgbGV0IHZTZWdtZW50cyA9IG9wdHMubGVuZ3RoU2VnbWVudHM7XG5cbiAgbGV0IGh3ID0gd2lkdGggKiAwLjU7XG4gIGxldCBobCA9IGxlbmd0aCAqIDAuNTtcblxuICBsZXQgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuICBsZXQgbm9ybWFsczogbnVtYmVyW10gPSBbXTtcbiAgbGV0IHV2czogbnVtYmVyW10gPSBbXTtcbiAgbGV0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gIGxldCBtaW5Qb3MgPSBuZXcgVmVjMygtaHcsIDAsIC1obCk7XG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhodywgMCwgaGwpO1xuICBsZXQgYm91bmRpbmdSYWRpdXMgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGxlbmd0aCAqIGxlbmd0aCk7XG5cbiAgVmVjMy5zZXQoYzAwLCAtaHcsIDAsICBobCk7XG4gIFZlYzMuc2V0KGMxMCwgIGh3LCAwLCAgaGwpO1xuICBWZWMzLnNldChjMDEsIC1odywgMCwgLWhsKTtcblxuICBmb3IgKGxldCB5ID0gMDsgeSA8PSB2U2VnbWVudHM7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHVTZWdtZW50czsgeCsrKSB7XG4gICAgICBsZXQgdSA9IHggLyB1U2VnbWVudHM7XG4gICAgICBsZXQgdiA9IHkgLyB2U2VnbWVudHM7XG5cbiAgICAgIFZlYzMubGVycCh0ZW1wMSwgYzAwLCBjMTAsIHUpO1xuICAgICAgVmVjMy5sZXJwKHRlbXAyLCBjMDAsIGMwMSwgdik7XG4gICAgICBWZWMzLnN1Yih0ZW1wMywgdGVtcDIsIGMwMCk7XG4gICAgICBWZWMzLmFkZChyLCB0ZW1wMSwgdGVtcDMpO1xuXG4gICAgICBwb3NpdGlvbnMucHVzaChyLngsIHIueSwgci56KTtcbiAgICAgIG5vcm1hbHMucHVzaCgwLCAxLCAwKTtcbiAgICAgIHV2cy5wdXNoKHUsIHYpO1xuXG4gICAgICBpZiAoKHggPCB1U2VnbWVudHMpICYmICh5IDwgdlNlZ21lbnRzKSkge1xuICAgICAgICBsZXQgdXNlZzEgPSB1U2VnbWVudHMgKyAxO1xuICAgICAgICBsZXQgYSA9IHggKyB5ICogdXNlZzE7XG4gICAgICAgIGxldCBiID0geCArICh5ICsgMSkgKiB1c2VnMTtcbiAgICAgICAgbGV0IGMgPSAoeCArIDEpICsgKHkgKyAxKSAqIHVzZWcxO1xuICAgICAgICBsZXQgZCA9ICh4ICsgMSkgKyB5ICogdXNlZzE7XG5cbiAgICAgICAgaW5kaWNlcy5wdXNoKGEsIGQsIGIpO1xuICAgICAgICBpbmRpY2VzLnB1c2goZCwgYywgYik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBWZXJ0ZXhEYXRhKFxuICAgIHBvc2l0aW9ucyxcbiAgICBub3JtYWxzLFxuICAgIHV2cyxcbiAgICBpbmRpY2VzLFxuICAgIG1pblBvcyxcbiAgICBtYXhQb3MsXG4gICAgYm91bmRpbmdSYWRpdXNcbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9