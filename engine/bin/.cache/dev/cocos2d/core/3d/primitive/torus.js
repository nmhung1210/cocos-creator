
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/torus.js';
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
 * @param {Number} tube
 * @param {Object} opts
 * @param {Number} opts.radialSegments
 * @param {Number} opts.tubularSegments
 * @param {Number} opts.arc
 */
function _default(radius, tube, opts) {
  if (radius === void 0) {
    radius = 0.4;
  }

  if (tube === void 0) {
    tube = 0.1;
  }

  if (opts === void 0) {
    opts = {
      radialSegments: 32,
      tubularSegments: 32,
      arc: 2.0 * Math.PI
    };
  }

  var radialSegments = opts.radialSegments;
  var tubularSegments = opts.tubularSegments;
  var arc = opts.arc;
  var positions = [];
  var normals = [];
  var uvs = [];
  var indices = [];
  var minPos = new _valueTypes.Vec3(-radius - tube, -tube, -radius - tube);
  var maxPos = new _valueTypes.Vec3(radius + tube, tube, radius + tube);
  var boundingRadius = radius + tube;

  for (var j = 0; j <= radialSegments; j++) {
    for (var i = 0; i <= tubularSegments; i++) {
      var u = i / tubularSegments;
      var v = j / radialSegments;
      var u1 = u * arc;
      var v1 = v * Math.PI * 2; // vertex

      var x = (radius + tube * Math.cos(v1)) * Math.sin(u1);
      var y = tube * Math.sin(v1);
      var z = (radius + tube * Math.cos(v1)) * Math.cos(u1); // this vector is used to calculate the normal

      var nx = Math.sin(u1) * Math.cos(v1);
      var ny = Math.sin(v1);
      var nz = Math.cos(u1) * Math.cos(v1);
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      uvs.push(u, v);

      if (i < tubularSegments && j < radialSegments) {
        var seg1 = tubularSegments + 1;
        var a = seg1 * j + i;
        var b = seg1 * (j + 1) + i;
        var c = seg1 * (j + 1) + i + 1;
        var d = seg1 * j + i + 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS90b3J1cy50cyJdLCJuYW1lcyI6WyJyYWRpdXMiLCJ0dWJlIiwib3B0cyIsInJhZGlhbFNlZ21lbnRzIiwidHVidWxhclNlZ21lbnRzIiwiYXJjIiwiTWF0aCIsIlBJIiwicG9zaXRpb25zIiwibm9ybWFscyIsInV2cyIsImluZGljZXMiLCJtaW5Qb3MiLCJWZWMzIiwibWF4UG9zIiwiYm91bmRpbmdSYWRpdXMiLCJqIiwiaSIsInUiLCJ2IiwidTEiLCJ2MSIsIngiLCJjb3MiLCJzaW4iLCJ5IiwieiIsIm54IiwibnkiLCJueiIsInB1c2giLCJzZWcxIiwiYSIsImIiLCJjIiwiZCIsIlZlcnRleERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBRUE7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7QUFRZSxrQkFBVUEsTUFBVixFQUF3QkMsSUFBeEIsRUFBb0NDLElBQXBDLEVBQTBHO0FBQUEsTUFBaEdGLE1BQWdHO0FBQWhHQSxJQUFBQSxNQUFnRyxHQUF2RixHQUF1RjtBQUFBOztBQUFBLE1BQWxGQyxJQUFrRjtBQUFsRkEsSUFBQUEsSUFBa0YsR0FBM0UsR0FBMkU7QUFBQTs7QUFBQSxNQUF0RUMsSUFBc0U7QUFBdEVBLElBQUFBLElBQXNFLEdBQS9EO0FBQUNDLE1BQUFBLGNBQWMsRUFBRSxFQUFqQjtBQUFxQkMsTUFBQUEsZUFBZSxFQUFFLEVBQXRDO0FBQTBDQyxNQUFBQSxHQUFHLEVBQUUsTUFBTUMsSUFBSSxDQUFDQztBQUExRCxLQUErRDtBQUFBOztBQUN2SCxNQUFJSixjQUFjLEdBQUdELElBQUksQ0FBQ0MsY0FBMUI7QUFDQSxNQUFJQyxlQUFlLEdBQUdGLElBQUksQ0FBQ0UsZUFBM0I7QUFDQSxNQUFJQyxHQUFHLEdBQUdILElBQUksQ0FBQ0csR0FBZjtBQUVBLE1BQUlHLFNBQW1CLEdBQUcsRUFBMUI7QUFDQSxNQUFJQyxPQUFpQixHQUFHLEVBQXhCO0FBQ0Es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RUFBZ0JHLENBQWhCLEVBQW1CRixDQUFuQjtBQUNBdEIsUUFBQUEsT0FBTyxDQUFDbUIsSUFBUixDQUFhSyxDQUFiLEVBQWdCRCxDQUFoQixFQUFtQkQsQ0FBbkI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBTyxJQUFJRyxzQkFBSixDQUNMNUIsU0FESyxFQUVMQyxPQUZLLEVBR0xDLEdBSEssRUFJTEMsT0FKSyxFQUtMQyxNQUxLLEVBTUxFLE1BTkssRUFPTEMsY0FQSyxDQUFQO0FBU0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzJztcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXG4gKiBAcGFyYW0ge051bWJlcn0gdHViZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLnJhZGlhbFNlZ21lbnRzXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy50dWJ1bGFyU2VnbWVudHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmFyY1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocmFkaXVzID0gMC40LCB0dWJlID0gMC4xLCBvcHRzID0ge3JhZGlhbFNlZ21lbnRzOiAzMiwgdHVidWxhclNlZ21lbnRzOiAzMiwgYXJjOiAyLjAgKiBNYXRoLlBJfSkge1xuICBsZXQgcmFkaWFsU2VnbWVudHMgPSBvcHRzLnJhZGlhbFNlZ21lbnRzO1xuICBsZXQgdHVidWxhclNlZ21lbnRzID0gb3B0cy50dWJ1bGFyU2VnbWVudHM7XG4gIGxldCBhcmMgPSBvcHRzLmFyYztcblxuICBsZXQgcG9zaXRpb25zOiBudW1iZXJbXSA9IFtdO1xuICBsZXQgbm9ybWFsczogbnVtYmVyW10gPSBbXTtcbiAgbGV0IHV2czogbnVtYmVyW10gPSBbXTtcbiAgbGV0IGluZGljZXM6IG51bWJlcltdID0gW107XG4gIGxldCBtaW5Qb3MgPSBuZXcgVmVjMygtcmFkaXVzIC0gdHViZSwgLXR1YmUsIC1yYWRpdXMgLSB0dWJlKTtcbiAgbGV0IG1heFBvcyA9IG5ldyBWZWMzKHJhZGl1cyArIHR1YmUsIHR1YmUsIHJhZGl1cyArIHR1YmUpO1xuICBsZXQgYm91bmRpbmdSYWRpdXMgPSByYWRpdXMgKyB0dWJlO1xuXG4gIGZvciAobGV0IGogPSAwOyBqIDw9IHJhZGlhbFNlZ21lbnRzOyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0dWJ1bGFyU2VnbWVudHM7IGkrKykge1xuICAgICAgbGV0IHUgPSBpIC8gdHVidWxhclNlZ21lbnRzO1xuICAgICAgbGV0IHYgPSBqIC8gcmFkaWFsU2VnbWVudHM7XG5cbiAgICAgIGxldCB1MSA9IHUgKiBhcmM7XG4gICAgICBsZXQgdjEgPSB2ICogTWF0aC5QSSAqIDI7XG5cbiAgICAgIC8vIHZlcnRleFxuICAgICAgbGV0IHggPSAocmFkaXVzICsgdHViZSAqIE1hdGguY29zKHYxKSkgKiBNYXRoLnNpbih1MSk7XG4gICAgICBsZXQgeSA9IHR1YmUgKiBNYXRoLnNpbih2MSk7XG4gICAgICBsZXQgeiA9IChyYWRpdXMgKyB0dWJlICogTWF0aC5jb3ModjEpKSAqIE1hdGguY29zKHUxKTtcblxuICAgICAgLy8gdGhpcyB2ZWN0b3IgaXMgdXNlZCB0byBjYWxjdWxhdGUgdGhlIG5vcm1hbFxuICAgICAgbGV0IG54ID0gTWF0aC5zaW4odTEpICogTWF0aC5jb3ModjEpO1xuICAgICAgbGV0IG55ID0gTWF0aC5zaW4odjEpO1xuICAgICAgbGV0IG56ID0gTWF0aC5jb3ModTEpICogTWF0aC5jb3ModjEpO1xuXG4gICAgICBwb3NpdGlvbnMucHVzaCh4LCB5LCB6KTtcbiAgICAgIG5vcm1hbHMucHVzaChueCwgbnksIG56KTtcbiAgICAgIHV2cy5wdXNoKHUsIHYpO1xuXG4gICAgICBpZiAoKGkgPCB0dWJ1bGFyU2VnbWVudHMpICYmIChqIDwgcmFkaWFsU2VnbWVudHMpKSB7XG4gICAgICAgIGxldCBzZWcxID0gdHVidWxhclNlZ21lbnRzICsgMTtcbiAgICAgICAgbGV0IGEgPSBzZWcxICogaiArIGk7XG4gICAgICAgIGxldCBiID0gc2VnMSAqIChqICsgMSkgKyBpO1xuICAgICAgICBsZXQgYyA9IHNlZzEgKiAoaiArIDEpICsgaSArIDE7XG4gICAgICAgIGxldCBkID0gc2VnMSAqIGogKyBpICsgMTtcblxuICAgICAgICBpbmRpY2VzLnB1c2goYSwgZCwgYik7XG4gICAgICAgIGluZGljZXMucHVzaChkLCBjLCBiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFZlcnRleERhdGEoXG4gICAgcG9zaXRpb25zLFxuICAgIG5vcm1hbHMsXG4gICAgdXZzLFxuICAgIGluZGljZXMsXG4gICAgbWluUG9zLFxuICAgIG1heFBvcyxcbiAgICBib3VuZGluZ1JhZGl1c1xuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=