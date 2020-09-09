
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/mesh.js';
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

var MeshAssembler = require('../2d/mesh');

var vec3_temp = new _vec["default"]();

var MeshAssembler3D = /*#__PURE__*/function (_MeshAssembler) {
  _inheritsLoose(MeshAssembler3D, _MeshAssembler);

  function MeshAssembler3D() {
    return _MeshAssembler.apply(this, arguments) || this;
  }

  return MeshAssembler3D;
}(MeshAssembler);

exports["default"] = MeshAssembler3D;
cc.js.mixin(MeshAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var i = 0, l = local.length / 2; i < l; i++) {
      _vec["default"].set(vec3_temp, local[i * 2], local[i * 2 + 1], 0);

      _vec["default"].transformMat4(vec3_temp, vec3_temp, matrix);

      var dstOffset = floatsPerVert * i;
      world[dstOffset] = vec3_temp.x;
      world[dstOffset + 1] = vec3_temp.y;
      world[dstOffset + 2] = vec3_temp.z;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlLzNkL21lc2guanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyM0QiLCJyZXF1aXJlIiwiTWVzaEFzc2VtYmxlciIsInZlYzNfdGVtcCIsIlZlYzMiLCJNZXNoQXNzZW1ibGVyM0QiLCJjYyIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiLCJ1cGRhdGVXb3JsZFZlcnRzIiwiY29tcCIsIm1hdHJpeCIsIm5vZGUiLCJfd29ybGRNYXRyaXgiLCJsb2NhbCIsIl9sb2NhbCIsIndvcmxkIiwiX3JlbmRlckRhdGEiLCJ2RGF0YXMiLCJmbG9hdHNQZXJWZXJ0IiwiaSIsImwiLCJsZW5ndGgiLCJzZXQiLCJ0cmFuc2Zvcm1NYXQ0IiwiZHN0T2Zmc2V0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7QUFDQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQywwQkFBRCxDQUEzQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQTdCOztBQUVBLElBQUlFLFNBQVMsR0FBRyxJQUFJQyxlQUFKLEVBQWhCOztJQUVxQkM7Ozs7Ozs7O0VBQXdCSDs7O0FBSTdDSSxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsS0FBTixDQUFZSCxlQUFlLENBQUNJLFNBQTVCLEVBQXVDVCxXQUF2QyxFQUFvRDtBQUNoRFUsRUFBQUEsZ0JBRGdELDRCQUM5QkMsSUFEOEIsRUFDeEI7QUFDcEIsUUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLElBQUwsQ0FBVUMsWUFBdkI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUVBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6Qjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFSLEVBQVdDLENBQUMsR0FBR1AsS0FBSyxDQUFDUSxNQUFOLEdBQWEsQ0FBakMsRUFBb0NGLENBQUMsR0FBR0MsQ0FBeEMsRUFBMkNELENBQUMsRUFBNUMsRUFBZ0Q7QUFDNUNqQixzQkFBS29CLEdBQUwsQ0FBU3JCLFNBQVQsRUFBb0JZLEtBQUssQ0FBQ00sQ0FBQyxHQUFDLENBQUgsQ0FBekIsRUFBZ0NOLEtBQUssQ0FBQ00sQ0FBQyxHQUFDLENBQUYsR0FBSSxDQUFMLENBQXJDLEVBQThDLENBQTlDOztBQUNBakIsc0JBQUtxQixhQUFMLENBQW1CdEIsU0FBbkIsRUFBOEJBLFNBQTlCLEVBQXlDUyxNQUF6Qzs7QUFFQSxVQUFJYyxTQUFTLEdBQUdOLGFBQWEsR0FBR0MsQ0FBaEM7QUFDQUosTUFBQUEsS0FBSyxDQUFDUyxTQUFELENBQUwsR0FBbUJ2QixTQUFTLENBQUN3QixDQUE3QjtBQUNBVixNQUFBQSxLQUFLLENBQUNTLFNBQVMsR0FBQyxDQUFYLENBQUwsR0FBcUJ2QixTQUFTLENBQUN5QixDQUEvQjtBQUNBWCxNQUFBQSxLQUFLLENBQUNTLFNBQVMsR0FBQyxDQUFYLENBQUwsR0FBcUJ2QixTQUFTLENBQUMwQixDQUEvQjtBQUNIO0FBQ0o7QUFoQitDLENBQXBEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XG5jb25zdCBBc3NlbWJsZXIzRCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2Fzc2VtYmxlci0zZCcpO1xuY29uc3QgTWVzaEFzc2VtYmxlciA9IHJlcXVpcmUoJy4uLzJkL21lc2gnKTtcblxubGV0IHZlYzNfdGVtcCA9IG5ldyBWZWMzKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc2hBc3NlbWJsZXIzRCBleHRlbmRzIE1lc2hBc3NlbWJsZXIge1xuICAgIFxufVxuXG5jYy5qcy5taXhpbihNZXNoQXNzZW1ibGVyM0QucHJvdG90eXBlLCBBc3NlbWJsZXIzRCwge1xuICAgIHVwZGF0ZVdvcmxkVmVydHMgKGNvbXApIHtcbiAgICAgICAgbGV0IG1hdHJpeCA9IGNvbXAubm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xuICAgICAgICBsZXQgd29ybGQgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcbiAgICAgXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGxvY2FsLmxlbmd0aC8yOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBWZWMzLnNldCh2ZWMzX3RlbXAsIGxvY2FsW2kqMl0sIGxvY2FsW2kqMisxXSwgMCk7XG4gICAgICAgICAgICBWZWMzLnRyYW5zZm9ybU1hdDQodmVjM190ZW1wLCB2ZWMzX3RlbXAsIG1hdHJpeCk7XG5cbiAgICAgICAgICAgIGxldCBkc3RPZmZzZXQgPSBmbG9hdHNQZXJWZXJ0ICogaTtcbiAgICAgICAgICAgIHdvcmxkW2RzdE9mZnNldF0gPSB2ZWMzX3RlbXAueDtcbiAgICAgICAgICAgIHdvcmxkW2RzdE9mZnNldCsxXSA9IHZlYzNfdGVtcC55O1xuICAgICAgICAgICAgd29ybGRbZHN0T2Zmc2V0KzJdID0gdmVjM190ZW1wLno7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9