
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/sphere.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _vertexData = _interopRequireDefault(require("./vertex-data"));

var _valueTypes = require("../../value-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {Number} radius
 * @param {Object} opts
 * @param {Number} opts.segments
 */
function _default(radius, opts) {
  if (radius === void 0) {
    radius = 0.5;
  }

  if (opts === void 0) {
    opts = {
      segments: 32
    };
  }

  var segments = opts.segments; // lat === latitude
  // lon === longitude

  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _valueTypes.Vec3(-radius, -radius, -radius);
  var maxPos = new _valueTypes.Vec3(radius, radius, radius);
  var boundingRadius = radius;

  for (var lat = 0; lat <= segments; ++lat) {
    var theta = lat * Math.PI / segments;
    var sinTheta = Math.sin(theta);
    var cosTheta = -Math.cos(theta);

    for (var lon = 0; lon <= segments; ++lon) {
      var phi = lon * 2 * Math.PI / segments - Math.PI / 2.0;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);
      var x = sinPhi * sinTheta;
      var y = cosTheta;
      var z = cosPhi * sinTheta;
      var u = lon / segments;
      var v = lat / segments;
      positions.push(x * radius, y * radius, z * radius);
      normals.push(x, y, z);
      uvs.push(u, v);

      if (lat < segments && lon < segments) {
        var seg1 = segments + 1;
        var a = seg1 * lat + lon;
        var b = seg1 * (lat + 1) + lon;
        var c = seg1 * (lat + 1) + lon + 1;
        var d = seg1 * lat + lon + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS9zcGhlcmUudHMiXSwibmFtZXMiOlsicmFkaXVzIiwib3B0cyIsInNlZ21lbnRzIiwicG9zaXRpb25zIiwibm9ybWFscyIsInV2cyIsImluZGljZXMiLCJtaW5Qb3MiLCJWZWMzIiwibWF4UG9zIiwiYm91bmRpbmdSYWRpdXMiLCJsYXQiLCJ0aGV0YSIsIk1hdGgiLCJQSSIsInNpblRoZXRhIiwic2luIiwiY29zVGhldGEiLCJjb3MiLCJsb24iLCJwaGkiLCJzaW5QaGkiLCJjb3NQaGkiLCJ4IiwieSIsInoiLCJ1IiwidiIsInB1c2giLCJzZWcxIiwiYSIsImIiLCJjIiwiZCIsIlZlcnRleERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7QUFLZSxrQkFBVUEsTUFBVixFQUF3QkMsSUFBeEIsRUFBK0M7QUFBQSxNQUFyQ0QsTUFBcUM7QUFBckNBLElBQUFBLE1BQXFDLEdBQTVCLEdBQTRCO0FBQUE7O0FBQUEsTUFBdkJDLElBQXVCO0FBQXZCQSxJQUFBQSxJQUF1QixHQUFoQjtBQUFDQyxNQUFBQSxRQUFRLEVBQUU7QUFBWCxLQUFnQjtBQUFBOztBQUM1RCxNQUFJQSxRQUFRLEdBQUdELElBQUksQ0FBQ0MsUUFBcEIsQ0FENEQsQ0FHNUQ7QUFDQTs7QUFFQSxNQUFJQyxTQUFtQixHQUFHLEVBQTFCO0FBQ0EsTUFBSUMsT0FBaUIsR0FBRyxFQUF4QjtBQUNBLE1BQUlDLEdBQWEsR0FBRyxFQUFwQjtBQUNBLE1BQUlDLE9BQWlCLEdBQUcsRUFBeEI7QUFDQSxNQUFJQyxNQUFNLEdBQUcsSUFBSUMsZ0JBQUosQ0FBUyxDQUFDUixNQUFWLEVBQWtCLENBQUNBLE1BQW5CLEVBQTJCLENBQUNBLE1BQTVCLENBQWI7QUFDQSxNQUFJUyxNQUFNLEdBQUcsSUFBSUQsZ0JBQUosQ0FBU1IsTUFBVCxFQUFpQkEsTUFBakIsRUFBeUJBLE1BQXpCLENBQWI7QUFDQSxNQUFJVSxjQUFjLEdBQUdWLE1BQXJCOztBQUVBLE9BQUssSUFBSVcsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsSUFBSVQsUUFBekIsRUFBbUMsRUFBRVMsR0FBckMsRUFBMEM7QUFDeEMsUUFBSUMsS0FBSyxHQUFHRCxHQUFHLEdBQUdFLElBQUksQ0FBQ0MsRUFBWCxHQUFnQlosUUFBNUI7QUFDQSxRQUFJYSxRQUFRLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxDQUFTSixLQUFULENBQWY7QUFDQSxRQUFJSyxRQUFRLEdBQUcsQ0FBQ0osSUFBSSxDQUFDSyxHQUFMLENBQVNOLEtBQVQsQ0FBaEI7O0FBRUEsU0FBSyxJQUFJTyxHQUFHLEdBQUcsQ0FBZixFQUFrQkEsR0FBRyxJQUFJakIsUUFBekIsRUFBbUMsRUFBRWlCLEdBQXJDLEVBQTBDO0FBQ3hDLFVBQUlDLEdBQUcsR0FBR0QsR0FBRyxHQUFHLENBQU4sR0FBVU4sSUFBSSxDQUFDQyxFQUFmLEdBQW9CWixRQUFwQixHQUErQlcsSUFBSSxDQUFDQyxFQUFMLEdBQVUsR0FBbkQ7QUFDQSxVQUFJTyxNQUFNLEdBQUdSLElBQUksQ0FBQ0csR0FBTCxDQUFTSSxHQUFULENBQWI7QUFDQSxVQUFJRSxNQUFNLEdBQUdULElBQUksQ0FBQ0ssR0FBTCxDQUFTRSxHQUFULENBQWI7QUFFQSxVQUFJRyxDQUFDLEdBQUdGLE1BQU0sR0FBR04sUUFBakI7QUFDQSxVQUFJUyxDQUFDLEdBQUdQLFFBQVI7QUFDQSxVQUFJUSxDQUFDLEdBQUdILE1BQU0sR0FBR1AsUUFBakI7QUFDQSxVQUFJVyxDQUFDLEdBQUdQLEdBQUcsR0FBR2pCLFFBQWQ7QUFDQSxVQUFJeUIsQ0FBQyxHQUFHaEIsR0FBRyxHQUFHVCxRQUFkO0FBRUFDLE1BQUFBLFNBQVMsQ0FBQ3lCLElBQVYsQ0FBZUwsQ0FBQyxHQUFHdkIsTUFBbkIsRUFBMkJ3QixDQUFDLEdBQUd4QixNQUEvQixFQUF1Q3lCLENBQUMsR0FBR3pCLE1BQTNDO0FBQ0FJLE1BQUFBLE9BQU8sQ0FBQ3dCLElBQVIsQ0FBYUwsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CO0FBQ0FwQixNQUFBQSxHQUFHLENBQUN1QixJQUFKLENBQVNGLENBQVQsRUFBWUMsQ0FBWjs7QUFHQSxVQUFLaEIsR0FBRyxHQUFHVCxRQUFQLElBQXFCaUIsR0FBRyxHQUFHakIsUUFBL0IsRUFBMEM7QUFDeEMsWUFBSTJCLElBQUksR0FBRzNCLFFBQVEsR0FBRyxDQUF0QjtBQUNBLFlBQUk0QixDQUFDLEdBQUdELElBQUksR0FBR2xCLEdBQVAsR0FBYVEsR0FBckI7QUFDQSxZQUFJWSxDQUFDLEdBQUdGLElBQUksSUFBSWxCLEdBQUcsR0FBRyxDQUFWLENBQUosR0FBbUJRLEdBQTNCO0FBQ0EsWUFBSWEsQ0FBQyxHQUFHSCxJQUFJLElBQUlsQixHQUFHLEdBQUcsQ0FBVixDQUFKLEdBQW1CUSxHQUFuQixHQUF5QixDQUFqQztBQUNBLFlBQUljLENBQUMsR0FBR0osSUFBSSxHQUFHbEIsR0FBUCxHQUFhUSxHQUFiLEdBQW1CLENBQTNCO0FBRUFiLFFBQUFBLE9BQU8sQ0FBQ3NCLElBQVIsQ0FBYUUsQ0FBYixFQUFnQkcsQ0FBaEIsRUFBbUJGLENBQW5CO0FBQ0F6QixRQUFBQSxPQUFPLENBQUNzQixJQUFSLENBQWFLLENBQWIsRUFBZ0JELENBQWhCLEVBQW1CRCxDQUFuQjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFPLElBQUlHLHNCQUFKLENBQ0wvQixTQURLLEVBRUxDLE9BRkssRUFHTEMsR0FISyxFQUlMQyxPQUpLLEVBS0xDLE1BTEssRUFNTEUsTUFOSyxFQU9MQyxjQVBLLENBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFZlcnRleERhdGEgZnJvbSAnLi92ZXJ0ZXgtZGF0YSc7XG5pbXBvcnQgeyBWZWMzIH0gZnJvbSAnLi4vLi4vdmFsdWUtdHlwZXMnO1xuXG4vKipcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWRpdXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5zZWdtZW50c1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocmFkaXVzID0gMC41LCBvcHRzID0ge3NlZ21lbnRzOiAzMn0pIHtcbiAgbGV0IHNlZ21lbnRzID0gb3B0cy5zZWdtZW50cztcblxuICAvLyBsYXQgPT09IGxhdGl0dWRlXG4gIC8vIGxvbiA9PT0gbG9uZ2l0dWRlXG5cbiAgbGV0IHBvc2l0aW9uczogbnVtYmVyW10gPSBbXTtcbiAgbGV0IG5vcm1hbHM6IG51bWJlcltdID0gW107XG4gIGxldCB1dnM6IG51bWJlcltdID0gW107XG4gIGxldCBpbmRpY2VzOiBudW1iZXJbXSA9IFtdO1xuICBsZXQgbWluUG9zID0gbmV3IFZlYzMoLXJhZGl1cywgLXJhZGl1cywgLXJhZGl1cyk7XG4gIGxldCBtYXhQb3MgPSBuZXcgVmVjMyhyYWRpdXMsIHJhZGl1cywgcmFkaXVzKTtcbiAgbGV0IGJvdW5kaW5nUmFkaXVzID0gcmFkaXVzO1xuXG4gIGZvciAobGV0IGxhdCA9IDA7IGxhdCA8PSBzZWdtZW50czsgKytsYXQpIHtcbiAgICBsZXQgdGhldGEgPSBsYXQgKiBNYXRoLlBJIC8gc2VnbWVudHM7XG4gICAgbGV0IHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIGxldCBjb3NUaGV0YSA9IC1NYXRoLmNvcyh0aGV0YSk7XG5cbiAgICBmb3IgKGxldCBsb24gPSAwOyBsb24gPD0gc2VnbWVudHM7ICsrbG9uKSB7XG4gICAgICBsZXQgcGhpID0gbG9uICogMiAqIE1hdGguUEkgLyBzZWdtZW50cyAtIE1hdGguUEkgLyAyLjA7XG4gICAgICBsZXQgc2luUGhpID0gTWF0aC5zaW4ocGhpKTtcbiAgICAgIGxldCBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuXG4gICAgICBsZXQgeCA9IHNpblBoaSAqIHNpblRoZXRhO1xuICAgICAgbGV0IHkgPSBjb3NUaGV0YTtcbiAgICAgIGxldCB6ID0gY29zUGhpICogc2luVGhldGE7XG4gICAgICBsZXQgdSA9IGxvbiAvIHNlZ21lbnRzO1xuICAgICAgbGV0IHYgPSBsYXQgLyBzZWdtZW50cztcblxuICAgICAgcG9zaXRpb25zLnB1c2goeCAqIHJhZGl1cywgeSAqIHJhZGl1cywgeiAqIHJhZGl1cyk7XG4gICAgICBub3JtYWxzLnB1c2goeCwgeSwgeik7XG4gICAgICB1dnMucHVzaCh1LCB2KTtcblxuXG4gICAgICBpZiAoKGxhdCA8IHNlZ21lbnRzKSAmJiAobG9uIDwgc2VnbWVudHMpKSB7XG4gICAgICAgIGxldCBzZWcxID0gc2VnbWVudHMgKyAxO1xuICAgICAgICBsZXQgYSA9IHNlZzEgKiBsYXQgKyBsb247XG4gICAgICAgIGxldCBiID0gc2VnMSAqIChsYXQgKyAxKSArIGxvbjtcbiAgICAgICAgbGV0IGMgPSBzZWcxICogKGxhdCArIDEpICsgbG9uICsgMTtcbiAgICAgICAgbGV0IGQgPSBzZWcxICogbGF0ICsgbG9uICsgMTtcblxuICAgICAgICBpbmRpY2VzLnB1c2goYSwgZCwgYik7XG4gICAgICAgIGluZGljZXMucHVzaChkLCBjLCBiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFZlcnRleERhdGEoXG4gICAgcG9zaXRpb25zLFxuICAgIG5vcm1hbHMsXG4gICAgdXZzLFxuICAgIGluZGljZXMsXG4gICAgbWluUG9zLFxuICAgIG1heFBvcyxcbiAgICBib3VuZGluZ1JhZGl1c1xuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=