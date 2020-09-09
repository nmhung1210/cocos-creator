
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/radial-filled.js';
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

var RadialFilledAssembler = require('../2d/radial-filled');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var RadialFilledAssembler3D = /*#__PURE__*/function (_RadialFilledAssemble) {
  _inheritsLoose(RadialFilledAssembler3D, _RadialFilledAssemble);

  function RadialFilledAssembler3D() {
    return _RadialFilledAssemble.apply(this, arguments) || this;
  }

  return RadialFilledAssembler3D;
}(RadialFilledAssembler);

exports["default"] = RadialFilledAssembler3D;
cc.js.mixin(RadialFilledAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var matrix = sprite.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var offset = 0; offset < world.length; offset += floatsPerVert) {
      _vec["default"].set(vec3_temp_local, local[offset], local[offset + 1], 0);

      _vec["default"].transformMat4(vec3_temp_world, vec3_temp_local, matrix);

      world[offset] = vec3_temp_world.x;
      world[offset + 1] = vec3_temp_world.y;
      world[offset + 2] = vec3_temp_world.z;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlLzNkL3JhZGlhbC1maWxsZWQuanMiXSwibmFtZXMiOlsiQXNzZW1ibGVyM0QiLCJyZXF1aXJlIiwiUmFkaWFsRmlsbGVkQXNzZW1ibGVyIiwidmVjM190ZW1wX2xvY2FsIiwiVmVjMyIsInZlYzNfdGVtcF93b3JsZCIsIlJhZGlhbEZpbGxlZEFzc2VtYmxlcjNEIiwiY2MiLCJqcyIsIm1peGluIiwicHJvdG90eXBlIiwidXBkYXRlV29ybGRWZXJ0cyIsInNwcml0ZSIsIm1hdHJpeCIsIm5vZGUiLCJfd29ybGRNYXRyaXgiLCJsb2NhbCIsIl9sb2NhbCIsIndvcmxkIiwiX3JlbmRlckRhdGEiLCJ2RGF0YXMiLCJmbG9hdHNQZXJWZXJ0Iiwib2Zmc2V0IiwibGVuZ3RoIiwic2V0IiwidHJhbnNmb3JtTWF0NCIsIngiLCJ5IiwieiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7O0FBQ0EsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMscUJBQXFCLEdBQUdELE9BQU8sQ0FBQyxxQkFBRCxDQUFyQzs7QUFFQSxJQUFNRSxlQUFlLEdBQUcsSUFBSUMsZUFBSixFQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxJQUFJRCxlQUFKLEVBQXhCOztJQUVxQkU7Ozs7Ozs7O0VBQWdDSjs7O0FBSXJESyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsS0FBTixDQUFZSCx1QkFBdUIsQ0FBQ0ksU0FBcEMsRUFBK0NWLFdBQS9DLEVBQTREO0FBQ3hEVyxFQUFBQSxnQkFEd0QsNEJBQ3RDQyxNQURzQyxFQUM5QjtBQUN0QixRQUFJQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ0UsSUFBUCxDQUFZQyxZQUF6QjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxNQUFqQjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaO0FBRUEsUUFBSUMsYUFBYSxHQUFHLEtBQUtBLGFBQXpCOztBQUNBLFNBQUssSUFBSUMsTUFBTSxHQUFHLENBQWxCLEVBQXFCQSxNQUFNLEdBQUdKLEtBQUssQ0FBQ0ssTUFBcEMsRUFBNENELE1BQU0sSUFBSUQsYUFBdEQsRUFBcUU7QUFDakVqQixzQkFBS29CLEdBQUwsQ0FBU3JCLGVBQVQsRUFBMEJhLEtBQUssQ0FBQ00sTUFBRCxDQUEvQixFQUF5Q04sS0FBSyxDQUFDTSxNQUFNLEdBQUMsQ0FBUixDQUE5QyxFQUEwRCxDQUExRDs7QUFDQWxCLHNCQUFLcUIsYUFBTCxDQUFtQnBCLGVBQW5CLEVBQW9DRixlQUFwQyxFQUFxRFUsTUFBckQ7O0FBRUFLLE1BQUFBLEtBQUssQ0FBQ0ksTUFBRCxDQUFMLEdBQWdCakIsZUFBZSxDQUFDcUIsQ0FBaEM7QUFDQVIsTUFBQUEsS0FBSyxDQUFDSSxNQUFNLEdBQUMsQ0FBUixDQUFMLEdBQWtCakIsZUFBZSxDQUFDc0IsQ0FBbEM7QUFDQVQsTUFBQUEsS0FBSyxDQUFDSSxNQUFNLEdBQUMsQ0FBUixDQUFMLEdBQWtCakIsZUFBZSxDQUFDdUIsQ0FBbEM7QUFDSDtBQUNKO0FBZnVELENBQTVEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuaW1wb3J0IFZlYzMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vdmFsdWUtdHlwZXMvdmVjMyc7XG5jb25zdCBBc3NlbWJsZXIzRCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2Fzc2VtYmxlci0zZCcpO1xuY29uc3QgUmFkaWFsRmlsbGVkQXNzZW1ibGVyID0gcmVxdWlyZSgnLi4vMmQvcmFkaWFsLWZpbGxlZCcpO1xuXG5jb25zdCB2ZWMzX3RlbXBfbG9jYWwgPSBuZXcgVmVjMygpO1xuY29uc3QgdmVjM190ZW1wX3dvcmxkID0gbmV3IFZlYzMoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaWFsRmlsbGVkQXNzZW1ibGVyM0QgZXh0ZW5kcyBSYWRpYWxGaWxsZWRBc3NlbWJsZXIge1xuICAgIFxufVxuXG5jYy5qcy5taXhpbihSYWRpYWxGaWxsZWRBc3NlbWJsZXIzRC5wcm90b3R5cGUsIEFzc2VtYmxlcjNELCB7XG4gICAgdXBkYXRlV29ybGRWZXJ0cyAoc3ByaXRlKSB7XG4gICAgICAgIGxldCBtYXRyaXggPSBzcHJpdGUubm9kZS5fd29ybGRNYXRyaXg7XG4gICAgICAgIGxldCBsb2NhbCA9IHRoaXMuX2xvY2FsO1xuICAgICAgICBsZXQgd29ybGQgPSB0aGlzLl9yZW5kZXJEYXRhLnZEYXRhc1swXTtcblxuICAgICAgICBsZXQgZmxvYXRzUGVyVmVydCA9IHRoaXMuZmxvYXRzUGVyVmVydDtcbiAgICAgICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgd29ybGQubGVuZ3RoOyBvZmZzZXQgKz0gZmxvYXRzUGVyVmVydCkge1xuICAgICAgICAgICAgVmVjMy5zZXQodmVjM190ZW1wX2xvY2FsLCBsb2NhbFtvZmZzZXRdLCBsb2NhbFtvZmZzZXQrMV0sIDApO1xuICAgICAgICAgICAgVmVjMy50cmFuc2Zvcm1NYXQ0KHZlYzNfdGVtcF93b3JsZCwgdmVjM190ZW1wX2xvY2FsLCBtYXRyaXgpO1xuXG4gICAgICAgICAgICB3b3JsZFtvZmZzZXRdID0gdmVjM190ZW1wX3dvcmxkLng7XG4gICAgICAgICAgICB3b3JsZFtvZmZzZXQrMV0gPSB2ZWMzX3RlbXBfd29ybGQueTtcbiAgICAgICAgICAgIHdvcmxkW29mZnNldCsyXSA9IHZlYzNfdGVtcF93b3JsZC56O1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==