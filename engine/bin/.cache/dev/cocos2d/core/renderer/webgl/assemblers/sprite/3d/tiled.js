
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/tiled.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vec = _interopRequireDefault(require("../../../../../value-types/vec3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Assembler3D = require('../../../../assembler-3d');

var TiledAssembler = require('../2d/tiled');

var vec3_temps = [];

for (var i = 0; i < 4; i++) {
  vec3_temps.push(new _vec["default"]());
}

var TiledAssembler3D = /*#__PURE__*/function (_TiledAssembler) {
  _inheritsLoose(TiledAssembler3D, _TiledAssembler);

  function TiledAssembler3D() {
    return _TiledAssembler.apply(this, arguments) || this;
  }

  return TiledAssembler3D;
}(TiledAssembler);

exports["default"] = TiledAssembler3D;
cc.js.mixin(TiledAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var local = this._local;
    var localX = local.x,
        localY = local.y;
    var world = this._renderData.vDatas[0];
    var row = this.row,
        col = this.col;
    var matrix = sprite.node._worldMatrix;
    var x, x1, y, y1;
    var vertexOffset = 0;

    for (var yindex = 0, ylength = row; yindex < ylength; ++yindex) {
      y = localY[yindex];
      y1 = localY[yindex + 1];

      for (var xindex = 0, xlength = col; xindex < xlength; ++xindex) {
        x = localX[xindex];
        x1 = localX[xindex + 1];

        _vec["default"].set(vec3_temps[0], x, y, 0);

        _vec["default"].set(vec3_temps[1], x1, y, 0);

        _vec["default"].set(vec3_temps[2], x, y1, 0);

        _vec["default"].set(vec3_temps[3], x1, y1, 0);

        for (var _i = 0; _i < 4; _i++) {
          var vec3_temp = vec3_temps[_i];

          _vec["default"].transformMat4(vec3_temp, vec3_temp, matrix);

          var offset = _i * 6;
          world[vertexOffset + offset] = vec3_temp.x;
          world[vertexOffset + offset + 1] = vec3_temp.y;
          world[vertexOffset + offset + 2] = vec3_temp.z;
        }

        vertexOffset += 24;
      }
    }
  }
});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlLzNkL3RpbGVkLmpzIl0sIm5hbWVzIjpbIkFzc2VtYmxlcjNEIiwicmVxdWlyZSIsIlRpbGVkQXNzZW1ibGVyIiwidmVjM190ZW1wcyIsImkiLCJwdXNoIiwiVmVjMyIsIlRpbGVkQXNzZW1ibGVyM0QiLCJjYyIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiLCJ1cGRhdGVXb3JsZFZlcnRzIiwic3ByaXRlIiwibG9jYWwiLCJfbG9jYWwiLCJsb2NhbFgiLCJ4IiwibG9jYWxZIiwieSIsIndvcmxkIiwiX3JlbmRlckRhdGEiLCJ2RGF0YXMiLCJyb3ciLCJjb2wiLCJtYXRyaXgiLCJub2RlIiwiX3dvcmxkTWF0cml4IiwieDEiLCJ5MSIsInZlcnRleE9mZnNldCIsInlpbmRleCIsInlsZW5ndGgiLCJ4aW5kZXgiLCJ4bGVuZ3RoIiwic2V0IiwidmVjM190ZW1wIiwidHJhbnNmb3JtTWF0NCIsIm9mZnNldCIsInoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBR0MsT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1DLGNBQWMsR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBOUI7O0FBRUEsSUFBSUUsVUFBVSxHQUFHLEVBQWpCOztBQUNBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUN4QkQsRUFBQUEsVUFBVSxDQUFDRSxJQUFYLENBQWdCLElBQUlDLGVBQUosRUFBaEI7QUFDSDs7SUFFb0JDOzs7Ozs7OztFQUF5Qkw7OztBQUk5Q00sRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUgsZ0JBQWdCLENBQUNJLFNBQTdCLEVBQXdDWCxXQUF4QyxFQUFxRDtBQUNqRFksRUFBQUEsZ0JBRGlELDRCQUMvQkMsTUFEK0IsRUFDdkI7QUFDdEIsUUFBSUMsS0FBSyxHQUFHLEtBQUtDLE1BQWpCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHRixLQUFLLENBQUNHLENBQW5CO0FBQUEsUUFBc0JDLE1BQU0sR0FBR0osS0FBSyxDQUFDSyxDQUFyQztBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaO0FBSHNCLFFBSWhCQyxHQUpnQixHQUlILElBSkcsQ0FJaEJBLEdBSmdCO0FBQUEsUUFJWEMsR0FKVyxHQUlILElBSkcsQ0FJWEEsR0FKVztBQUt0QixRQUFJQyxNQUFNLEdBQUdaLE1BQU0sQ0FBQ2EsSUFBUCxDQUFZQyxZQUF6QjtBQUNBLFFBQUlWLENBQUosRUFBT1csRUFBUCxFQUFXVCxDQUFYLEVBQWNVLEVBQWQ7QUFDQSxRQUFJQyxZQUFZLEdBQUcsQ0FBbkI7O0FBQ0EsU0FBSyxJQUFJQyxNQUFNLEdBQUcsQ0FBYixFQUFnQkMsT0FBTyxHQUFHVCxHQUEvQixFQUFvQ1EsTUFBTSxHQUFHQyxPQUE3QyxFQUFzRCxFQUFFRCxNQUF4RCxFQUFnRTtBQUM1RFosTUFBQUEsQ0FBQyxHQUFHRCxNQUFNLENBQUNhLE1BQUQsQ0FBVjtBQUNBRixNQUFBQSxFQUFFLEdBQUdYLE1BQU0sQ0FBQ2EsTUFBTSxHQUFHLENBQVYsQ0FBWDs7QUFDQSxXQUFLLElBQUlFLE1BQU0sR0FBRyxDQUFiLEVBQWdCQyxPQUFPLEdBQUdWLEdBQS9CLEVBQW9DUyxNQUFNLEdBQUdDLE9BQTdDLEVBQXNELEVBQUVELE1BQXhELEVBQWdFO0FBQzVEaEIsUUFBQUEsQ0FBQyxHQUFHRCxNQUFNLENBQUNpQixNQUFELENBQVY7QUFDQUwsUUFBQUEsRUFBRSxHQUFHWixNQUFNLENBQUNpQixNQUFNLEdBQUcsQ0FBVixDQUFYOztBQUVBM0Isd0JBQUs2QixHQUFMLENBQVNoQyxVQUFVLENBQUMsQ0FBRCxDQUFuQixFQUF3QmMsQ0FBeEIsRUFBMkJFLENBQTNCLEVBQThCLENBQTlCOztBQUNBYix3QkFBSzZCLEdBQUwsQ0FBU2hDLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCeUIsRUFBeEIsRUFBNEJULENBQTVCLEVBQStCLENBQS9COztBQUNBYix3QkFBSzZCLEdBQUwsQ0FBU2hDLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCYyxDQUF4QixFQUEyQlksRUFBM0IsRUFBK0IsQ0FBL0I7O0FBQ0F2Qix3QkFBSzZCLEdBQUwsQ0FBU2hDLFVBQVUsQ0FBQyxDQUFELENBQW5CLEVBQXdCeUIsRUFBeEIsRUFBNEJDLEVBQTVCLEVBQWdDLENBQWhDOztBQUVBLGFBQUssSUFBSXpCLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLEVBQUMsRUFBeEIsRUFBNEI7QUFDeEIsY0FBSWdDLFNBQVMsR0FBR2pDLFVBQVUsQ0FBQ0MsRUFBRCxDQUExQjs7QUFDQUUsMEJBQUsrQixhQUFMLENBQW1CRCxTQUFuQixFQUE4QkEsU0FBOUIsRUFBeUNYLE1BQXpDOztBQUNBLGNBQUlhLE1BQU0sR0FBR2xDLEVBQUMsR0FBRyxDQUFqQjtBQUNBZ0IsVUFBQUEsS0FBSyxDQUFDVSxZQUFZLEdBQUdRLE1BQWhCLENBQUwsR0FBK0JGLFNBQVMsQ0FBQ25CLENBQXpDO0FBQ0FHLFVBQUFBLEtBQUssQ0FBQ1UsWUFBWSxHQUFHUSxNQUFmLEdBQXdCLENBQXpCLENBQUwsR0FBbUNGLFNBQVMsQ0FBQ2pCLENBQTdDO0FBQ0FDLFVBQUFBLEtBQUssQ0FBQ1UsWUFBWSxHQUFHUSxNQUFmLEdBQXdCLENBQXpCLENBQUwsR0FBbUNGLFNBQVMsQ0FBQ0csQ0FBN0M7QUFDSDs7QUFFRFQsUUFBQUEsWUFBWSxJQUFJLEVBQWhCO0FBQ0g7QUFDSjtBQUNKO0FBakNnRCxDQUFyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuXG5jb25zdCBBc3NlbWJsZXIzRCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2Fzc2VtYmxlci0zZCcpO1xuY29uc3QgVGlsZWRBc3NlbWJsZXIgPSByZXF1aXJlKCcuLi8yZC90aWxlZCcpO1xuXG5sZXQgdmVjM190ZW1wcyA9IFtdO1xuZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2ZWMzX3RlbXBzLnB1c2gobmV3IFZlYzMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlZEFzc2VtYmxlcjNEIGV4dGVuZHMgVGlsZWRBc3NlbWJsZXIge1xuICAgIFxufVxuXG5jYy5qcy5taXhpbihUaWxlZEFzc2VtYmxlcjNELnByb3RvdHlwZSwgQXNzZW1ibGVyM0QsIHtcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChzcHJpdGUpIHtcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XG4gICAgICAgIGxldCBsb2NhbFggPSBsb2NhbC54LCBsb2NhbFkgPSBsb2NhbC55O1xuICAgICAgICBsZXQgd29ybGQgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcbiAgICAgICAgbGV0IHsgcm93LCBjb2wgfSA9IHRoaXM7XG4gICAgICAgIGxldCBtYXRyaXggPSBzcHJpdGUubm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCB4LCB4MSwgeSwgeTE7XG4gICAgICAgIGxldCB2ZXJ0ZXhPZmZzZXQgPSAwO1xuICAgICAgICBmb3IgKGxldCB5aW5kZXggPSAwLCB5bGVuZ3RoID0gcm93OyB5aW5kZXggPCB5bGVuZ3RoOyArK3lpbmRleCkge1xuICAgICAgICAgICAgeSA9IGxvY2FsWVt5aW5kZXhdO1xuICAgICAgICAgICAgeTEgPSBsb2NhbFlbeWluZGV4ICsgMV07XG4gICAgICAgICAgICBmb3IgKGxldCB4aW5kZXggPSAwLCB4bGVuZ3RoID0gY29sOyB4aW5kZXggPCB4bGVuZ3RoOyArK3hpbmRleCkge1xuICAgICAgICAgICAgICAgIHggPSBsb2NhbFhbeGluZGV4XTtcbiAgICAgICAgICAgICAgICB4MSA9IGxvY2FsWFt4aW5kZXggKyAxXTtcblxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcHNbMF0sIHgsIHksIDApO1xuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcHNbMV0sIHgxLCB5LCAwKTtcbiAgICAgICAgICAgICAgICBWZWMzLnNldCh2ZWMzX3RlbXBzWzJdLCB4LCB5MSwgMCk7XG4gICAgICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wc1szXSwgeDEsIHkxLCAwKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZWMzX3RlbXAgPSB2ZWMzX3RlbXBzW2ldO1xuICAgICAgICAgICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQodmVjM190ZW1wLCB2ZWMzX3RlbXAsIG1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBpICogNjtcbiAgICAgICAgICAgICAgICAgICAgd29ybGRbdmVydGV4T2Zmc2V0ICsgb2Zmc2V0XSA9IHZlYzNfdGVtcC54O1xuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXQgKyBvZmZzZXQgKyAxXSA9IHZlYzNfdGVtcC55O1xuICAgICAgICAgICAgICAgICAgICB3b3JsZFt2ZXJ0ZXhPZmZzZXQgKyBvZmZzZXQgKyAyXSA9IHZlYzNfdGVtcC56O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZlcnRleE9mZnNldCArPSAyNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=