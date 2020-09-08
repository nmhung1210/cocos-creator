
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/quad.js';
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

var positions = [-0.5, -0.5, 0, // bottom-left
-0.5, 0.5, 0, // top-left
0.5, 0.5, 0, // top-right
0.5, -0.5, 0 // bottom-right
];
var normals = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
var uvs = [0, 0, 0, 1, 1, 1, 1, 0];
var indices = [0, 3, 1, 3, 2, 1]; // TODO: ?

var minPos = new _valueTypes.Vec3(-0.5, -0.5, 0);
var maxPos = new _valueTypes.Vec3(0.5, 0.5, 0);
var boundingRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);

function _default() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS9xdWFkLnRzIl0sIm5hbWVzIjpbInBvc2l0aW9ucyIsIm5vcm1hbHMiLCJ1dnMiLCJpbmRpY2VzIiwibWluUG9zIiwiVmVjMyIsIm1heFBvcyIsImJvdW5kaW5nUmFkaXVzIiwiTWF0aCIsInNxcnQiLCJWZXJ0ZXhEYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7OztBQUVBOztBQUNBOzs7O0FBRUEsSUFBSUEsU0FBUyxHQUFHLENBQ2QsQ0FBQyxHQURhLEVBQ1IsQ0FBQyxHQURPLEVBQ0YsQ0FERSxFQUNDO0FBQ2YsQ0FBQyxHQUZhLEVBRVAsR0FGTyxFQUVGLENBRkUsRUFFQztBQUNkLEdBSGEsRUFHUCxHQUhPLEVBR0YsQ0FIRSxFQUdDO0FBQ2QsR0FKYSxFQUlSLENBQUMsR0FKTyxFQUlGLENBSkUsQ0FJQztBQUpELENBQWhCO0FBT0EsSUFBSUMsT0FBTyxHQUFHLENBQ1osQ0FEWSxFQUNULENBRFMsRUFDTixDQURNLEVBRVosQ0FGWSxFQUVULENBRlMsRUFFTixDQUZNLEVBR1osQ0FIWSxFQUdULENBSFMsRUFHTixDQUhNLEVBSVosQ0FKWSxFQUlULENBSlMsRUFJTixDQUpNLENBQWQ7QUFPQSxJQUFJQyxHQUFHLEdBQUcsQ0FDUixDQURRLEVBQ0wsQ0FESyxFQUVSLENBRlEsRUFFTCxDQUZLLEVBR1IsQ0FIUSxFQUdMLENBSEssRUFJUixDQUpRLEVBSUwsQ0FKSyxDQUFWO0FBT0EsSUFBSUMsT0FBTyxHQUFHLENBQ1osQ0FEWSxFQUNULENBRFMsRUFDTixDQURNLEVBRVosQ0FGWSxFQUVULENBRlMsRUFFTixDQUZNLENBQWQsRUFLQTs7QUFDQSxJQUFJQyxNQUFNLEdBQUcsSUFBSUMsZ0JBQUosQ0FBUyxDQUFDLEdBQVYsRUFBZSxDQUFDLEdBQWhCLEVBQXFCLENBQXJCLENBQWI7QUFDQSxJQUFJQyxNQUFNLEdBQUcsSUFBSUQsZ0JBQUosQ0FBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixDQUFuQixDQUFiO0FBQ0EsSUFBSUUsY0FBYyxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVSxNQUFNLEdBQU4sR0FBWSxNQUFNLEdBQTVCLENBQXJCOztBQUVlLG9CQUFZO0FBQ3pCLFNBQU8sSUFBSUMsc0JBQUosQ0FDTFYsU0FESyxFQUVMQyxPQUZLLEVBR0xDLEdBSEssRUFJTEMsT0FKSyxFQUtMQyxNQUxLLEVBTUxFLE1BTkssRUFPTEMsY0FQSyxDQUFQO0FBU0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBWZXJ0ZXhEYXRhIGZyb20gJy4vdmVydGV4LWRhdGEnO1xuaW1wb3J0IHsgVmVjMyB9IGZyb20gJy4uLy4uL3ZhbHVlLXR5cGVzJztcblxubGV0IHBvc2l0aW9ucyA9IFtcbiAgLTAuNSwgLTAuNSwgMCwgLy8gYm90dG9tLWxlZnRcbiAgLTAuNSwgIDAuNSwgMCwgLy8gdG9wLWxlZnRcbiAgIDAuNSwgIDAuNSwgMCwgLy8gdG9wLXJpZ2h0XG4gICAwLjUsIC0wLjUsIDAsIC8vIGJvdHRvbS1yaWdodFxuXTtcblxubGV0IG5vcm1hbHMgPSBbXG4gIDAsIDAsIDEsXG4gIDAsIDAsIDEsXG4gIDAsIDAsIDEsXG4gIDAsIDAsIDEsXG5dO1xuXG5sZXQgdXZzID0gW1xuICAwLCAwLFxuICAwLCAxLFxuICAxLCAxLFxuICAxLCAwLFxuXTtcblxubGV0IGluZGljZXMgPSBbXG4gIDAsIDMsIDEsXG4gIDMsIDIsIDFcbl07XG5cbi8vIFRPRE86ID9cbmxldCBtaW5Qb3MgPSBuZXcgVmVjMygtMC41LCAtMC41LCAwKTtcbmxldCBtYXhQb3MgPSBuZXcgVmVjMygwLjUsIDAuNSwgMCk7XG5sZXQgYm91bmRpbmdSYWRpdXMgPSBNYXRoLnNxcnQoMC41ICogMC41ICsgMC41ICogMC41KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gbmV3IFZlcnRleERhdGEoXG4gICAgcG9zaXRpb25zLFxuICAgIG5vcm1hbHMsXG4gICAgdXZzLFxuICAgIGluZGljZXMsXG4gICAgbWluUG9zLFxuICAgIG1heFBvcyxcbiAgICBib3VuZGluZ1JhZGl1c1xuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=