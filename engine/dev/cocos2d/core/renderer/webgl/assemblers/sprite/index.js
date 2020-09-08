
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../../../assembler"));

var _CCSprite = require("../../../../components/CCSprite");

var _simple = _interopRequireDefault(require("./2d/simple"));

var _sliced = _interopRequireDefault(require("./2d/sliced"));

var _tiled = _interopRequireDefault(require("./2d/tiled"));

var _radialFilled = _interopRequireDefault(require("./2d/radial-filled"));

var _barFilled = _interopRequireDefault(require("./2d/bar-filled"));

var _mesh = _interopRequireDefault(require("./2d/mesh"));

var _simple2 = _interopRequireDefault(require("./3d/simple"));

var _sliced2 = _interopRequireDefault(require("./3d/sliced"));

var _tiled2 = _interopRequireDefault(require("./3d/tiled"));

var _radialFilled2 = _interopRequireDefault(require("./3d/radial-filled"));

var _barFilled2 = _interopRequireDefault(require("./3d/bar-filled"));

var _mesh2 = _interopRequireDefault(require("./3d/mesh"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ctor = {
  getConstructor: function getConstructor(sprite) {
    var is3DNode = sprite.node.is3DNode;
    var ctor = is3DNode ? _simple2["default"] : _simple["default"];

    switch (sprite.type) {
      case _CCSprite.Type.SLICED:
        ctor = is3DNode ? _sliced2["default"] : _sliced["default"];
        break;

      case _CCSprite.Type.TILED:
        ctor = is3DNode ? _tiled2["default"] : _tiled["default"];
        break;

      case _CCSprite.Type.FILLED:
        if (sprite._fillType === _CCSprite.FillType.RADIAL) {
          ctor = is3DNode ? _radialFilled2["default"] : _radialFilled["default"];
        } else {
          ctor = is3DNode ? _barFilled2["default"] : _barFilled["default"];
        }

        break;

      case _CCSprite.Type.MESH:
        ctor = is3DNode ? _mesh2["default"] : _mesh["default"];
        break;
    }

    return ctor;
  },
  Simple: _simple["default"],
  Sliced: _sliced["default"],
  Tiled: _tiled["default"],
  RadialFilled: _radialFilled["default"],
  BarFilled: _barFilled["default"],
  Mesh: _mesh["default"],
  Simple3D: _simple2["default"],
  Sliced3D: _sliced2["default"],
  Tiled3D: _tiled2["default"],
  RadialFilled3D: _radialFilled2["default"],
  BarFilled3D: _barFilled2["default"],
  Mesh3D: _mesh2["default"]
};

_assembler["default"].register(cc.Sprite, ctor);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbImN0b3IiLCJnZXRDb25zdHJ1Y3RvciIsInNwcml0ZSIsImlzM0ROb2RlIiwibm9kZSIsIlNpbXBsZTNEIiwiU2ltcGxlIiwidHlwZSIsIlR5cGUiLCJTTElDRUQiLCJTbGljZWQzRCIsIlNsaWNlZCIsIlRJTEVEIiwiVGlsZWQzRCIsIlRpbGVkIiwiRklMTEVEIiwiX2ZpbGxUeXBlIiwiRmlsbFR5cGUiLCJSQURJQUwiLCJSYWRpYWxGaWxsZWQzRCIsIlJhZGlhbEZpbGxlZCIsIkJhckZpbGxlZDNEIiwiQmFyRmlsbGVkIiwiTUVTSCIsIk1lc2gzRCIsIk1lc2giLCJBc2VtYmxlciIsInJlZ2lzdGVyIiwiY2MiLCJTcHJpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLElBQUlBLElBQUksR0FBRztBQUNQQyxFQUFBQSxjQURPLDBCQUNRQyxNQURSLEVBQ2dCO0FBQ25CLFFBQUlDLFFBQVEsR0FBR0QsTUFBTSxDQUFDRSxJQUFQLENBQVlELFFBQTNCO0FBRUEsUUFBSUgsSUFBSSxHQUFHRyxRQUFRLEdBQUdFLG1CQUFILEdBQWNDLGtCQUFqQzs7QUFDQSxZQUFRSixNQUFNLENBQUNLLElBQWY7QUFDSSxXQUFLQyxlQUFLQyxNQUFWO0FBQ0lULFFBQUFBLElBQUksR0FBR0csUUFBUSxHQUFHTyxtQkFBSCxHQUFjQyxrQkFBN0I7QUFDQTs7QUFDSixXQUFLSCxlQUFLSSxLQUFWO0FBQ0laLFFBQUFBLElBQUksR0FBR0csUUFBUSxHQUFHVSxrQkFBSCxHQUFhQyxpQkFBNUI7QUFDQTs7QUFDSixXQUFLTixlQUFLTyxNQUFWO0FBQ0ksWUFBSWIsTUFBTSxDQUFDYyxTQUFQLEtBQXFCQyxtQkFBU0MsTUFBbEMsRUFBMEM7QUFDdENsQixVQUFBQSxJQUFJLEdBQUdHLFFBQVEsR0FBR2dCLHlCQUFILEdBQW9CQyx3QkFBbkM7QUFDSCxTQUZELE1BRU87QUFDSHBCLFVBQUFBLElBQUksR0FBR0csUUFBUSxHQUFHa0Isc0JBQUgsR0FBaUJDLHFCQUFoQztBQUNIOztBQUNEOztBQUNKLFdBQUtkLGVBQUtlLElBQVY7QUFDSXZCLFFBQUFBLElBQUksR0FBR0csUUFBUSxHQUFHcUIsaUJBQUgsR0FBWUMsZ0JBQTNCO0FBQ0E7QUFoQlI7O0FBbUJBLFdBQU96QixJQUFQO0FBQ0gsR0F6Qk07QUEyQlBNLEVBQUFBLE1BQU0sRUFBTkEsa0JBM0JPO0FBNEJQSyxFQUFBQSxNQUFNLEVBQU5BLGtCQTVCTztBQTZCUEcsRUFBQUEsS0FBSyxFQUFMQSxpQkE3Qk87QUE4QlBNLEVBQUFBLFlBQVksRUFBWkEsd0JBOUJPO0FBK0JQRSxFQUFBQSxTQUFTLEVBQVRBLHFCQS9CTztBQWdDUEcsRUFBQUEsSUFBSSxFQUFKQSxnQkFoQ087QUFrQ1BwQixFQUFBQSxRQUFRLEVBQVJBLG1CQWxDTztBQW1DUEssRUFBQUEsUUFBUSxFQUFSQSxtQkFuQ087QUFvQ1BHLEVBQUFBLE9BQU8sRUFBUEEsa0JBcENPO0FBcUNQTSxFQUFBQSxjQUFjLEVBQWRBLHlCQXJDTztBQXNDUEUsRUFBQUEsV0FBVyxFQUFYQSxzQkF0Q087QUF1Q1BHLEVBQUFBLE1BQU0sRUFBTkE7QUF2Q08sQ0FBWDs7QUEwQ0FFLHNCQUFTQyxRQUFULENBQWtCQyxFQUFFLENBQUNDLE1BQXJCLEVBQTZCN0IsSUFBN0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXNlbWJsZXIgZnJvbSAnLi4vLi4vLi4vYXNzZW1ibGVyJztcbmltcG9ydCB7IFR5cGUsIEZpbGxUeXBlIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29tcG9uZW50cy9DQ1Nwcml0ZSc7XG5cbmltcG9ydCBTaW1wbGUgZnJvbSBcIi4vMmQvc2ltcGxlXCI7XG5pbXBvcnQgU2xpY2VkIGZyb20gXCIuLzJkL3NsaWNlZFwiO1xuaW1wb3J0IFRpbGVkIGZyb20gXCIuLzJkL3RpbGVkXCI7XG5pbXBvcnQgUmFkaWFsRmlsbGVkIGZyb20gXCIuLzJkL3JhZGlhbC1maWxsZWRcIjtcbmltcG9ydCBCYXJGaWxsZWQgZnJvbSBcIi4vMmQvYmFyLWZpbGxlZFwiO1xuaW1wb3J0IE1lc2ggZnJvbSAnLi8yZC9tZXNoJztcblxuaW1wb3J0IFNpbXBsZTNEIGZyb20gXCIuLzNkL3NpbXBsZVwiO1xuaW1wb3J0IFNsaWNlZDNEIGZyb20gXCIuLzNkL3NsaWNlZFwiO1xuaW1wb3J0IFRpbGVkM0QgZnJvbSBcIi4vM2QvdGlsZWRcIjtcbmltcG9ydCBSYWRpYWxGaWxsZWQzRCBmcm9tIFwiLi8zZC9yYWRpYWwtZmlsbGVkXCI7XG5pbXBvcnQgQmFyRmlsbGVkM0QgZnJvbSBcIi4vM2QvYmFyLWZpbGxlZFwiO1xuaW1wb3J0IE1lc2gzRCBmcm9tICcuLzNkL21lc2gnO1xuXG5sZXQgY3RvciA9IHtcbiAgICBnZXRDb25zdHJ1Y3RvcihzcHJpdGUpIHtcbiAgICAgICAgbGV0IGlzM0ROb2RlID0gc3ByaXRlLm5vZGUuaXMzRE5vZGU7XG5cbiAgICAgICAgbGV0IGN0b3IgPSBpczNETm9kZSA/IFNpbXBsZTNEIDogU2ltcGxlO1xuICAgICAgICBzd2l0Y2ggKHNwcml0ZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFR5cGUuU0xJQ0VEOlxuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IFNsaWNlZDNEIDogU2xpY2VkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBUeXBlLlRJTEVEOlxuICAgICAgICAgICAgICAgIGN0b3IgPSBpczNETm9kZSA/IFRpbGVkM0QgOiBUaWxlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVHlwZS5GSUxMRUQ6XG4gICAgICAgICAgICAgICAgaWYgKHNwcml0ZS5fZmlsbFR5cGUgPT09IEZpbGxUeXBlLlJBRElBTCkge1xuICAgICAgICAgICAgICAgICAgICBjdG9yID0gaXMzRE5vZGUgPyBSYWRpYWxGaWxsZWQzRCA6IFJhZGlhbEZpbGxlZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdG9yID0gaXMzRE5vZGUgPyBCYXJGaWxsZWQzRCA6IEJhckZpbGxlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFR5cGUuTUVTSDpcbiAgICAgICAgICAgICAgICBjdG9yID0gaXMzRE5vZGUgPyBNZXNoM0QgOiBNZXNoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGN0b3I7XG4gICAgfSxcblxuICAgIFNpbXBsZSxcbiAgICBTbGljZWQsXG4gICAgVGlsZWQsXG4gICAgUmFkaWFsRmlsbGVkLFxuICAgIEJhckZpbGxlZCxcbiAgICBNZXNoLFxuXG4gICAgU2ltcGxlM0QsXG4gICAgU2xpY2VkM0QsXG4gICAgVGlsZWQzRCxcbiAgICBSYWRpYWxGaWxsZWQzRCxcbiAgICBCYXJGaWxsZWQzRCxcbiAgICBNZXNoM0QsXG59O1xuXG5Bc2VtYmxlci5yZWdpc3RlcihjYy5TcHJpdGUsIGN0b3IpO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=