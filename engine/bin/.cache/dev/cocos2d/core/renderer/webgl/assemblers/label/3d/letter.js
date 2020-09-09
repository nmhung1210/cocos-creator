
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/label/3d/letter.js';
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

var WebglLetterFontAssembler = require('../2d/letter');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var WebglLetterFontAssembler3D = /*#__PURE__*/function (_WebglLetterFontAssem) {
  _inheritsLoose(WebglLetterFontAssembler3D, _WebglLetterFontAssem);

  function WebglLetterFontAssembler3D() {
    return _WebglLetterFontAssem.apply(this, arguments) || this;
  }

  return WebglLetterFontAssembler3D;
}(WebglLetterFontAssembler);

exports["default"] = WebglLetterFontAssembler3D;
cc.js.mixin(WebglLetterFontAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(comp) {
    var matrix = comp.node._worldMatrix;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvbGFiZWwvM2QvbGV0dGVyLmpzIl0sIm5hbWVzIjpbIkFzc2VtYmxlcjNEIiwicmVxdWlyZSIsIldlYmdsTGV0dGVyRm9udEFzc2VtYmxlciIsInZlYzNfdGVtcF9sb2NhbCIsIlZlYzMiLCJ2ZWMzX3RlbXBfd29ybGQiLCJXZWJnbExldHRlckZvbnRBc3NlbWJsZXIzRCIsImNjIiwianMiLCJtaXhpbiIsInByb3RvdHlwZSIsInVwZGF0ZVdvcmxkVmVydHMiLCJjb21wIiwibWF0cml4Iiwibm9kZSIsIl93b3JsZE1hdHJpeCIsImxvY2FsIiwiX2xvY2FsIiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImZsb2F0c1BlclZlcnQiLCJvZmZzZXQiLCJsZW5ndGgiLCJzZXQiLCJ0cmFuc2Zvcm1NYXQ0IiwieCIsInkiLCJ6Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7Ozs7QUFDQSxJQUFNQSxXQUFXLEdBQUdDLE9BQU8sQ0FBQywwQkFBRCxDQUEzQjs7QUFDQSxJQUFNQyx3QkFBd0IsR0FBR0QsT0FBTyxDQUFDLGNBQUQsQ0FBeEM7O0FBRUEsSUFBTUUsZUFBZSxHQUFHLElBQUlDLGVBQUosRUFBeEI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsSUFBSUQsZUFBSixFQUF4Qjs7SUFFcUJFOzs7Ozs7OztFQUFtQ0o7OztBQUl4REssRUFBRSxDQUFDQyxFQUFILENBQU1DLEtBQU4sQ0FBWUgsMEJBQTBCLENBQUNJLFNBQXZDLEVBQWtEVixXQUFsRCxFQUErRDtBQUMzRFcsRUFBQUEsZ0JBRDJELDRCQUN6Q0MsSUFEeUMsRUFDbkM7QUFDcEIsUUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLElBQUwsQ0FBVUMsWUFBdkI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsTUFBakI7QUFDQSxRQUFJQyxLQUFLLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkMsTUFBakIsQ0FBd0IsQ0FBeEIsQ0FBWjtBQUVBLFFBQUlDLGFBQWEsR0FBRyxLQUFLQSxhQUF6Qjs7QUFDQSxTQUFLLElBQUlDLE1BQU0sR0FBRyxDQUFsQixFQUFxQkEsTUFBTSxHQUFHSixLQUFLLENBQUNLLE1BQXBDLEVBQTRDRCxNQUFNLElBQUlELGFBQXRELEVBQXFFO0FBQ2pFakIsc0JBQUtvQixHQUFMLENBQVNyQixlQUFULEVBQTBCYSxLQUFLLENBQUNNLE1BQUQsQ0FBL0IsRUFBeUNOLEtBQUssQ0FBQ00sTUFBTSxHQUFDLENBQVIsQ0FBOUMsRUFBMEQsQ0FBMUQ7O0FBQ0FsQixzQkFBS3FCLGFBQUwsQ0FBbUJwQixlQUFuQixFQUFvQ0YsZUFBcEMsRUFBcURVLE1BQXJEOztBQUVBSyxNQUFBQSxLQUFLLENBQUNJLE1BQUQsQ0FBTCxHQUFnQmpCLGVBQWUsQ0FBQ3FCLENBQWhDO0FBQ0FSLE1BQUFBLEtBQUssQ0FBQ0ksTUFBTSxHQUFDLENBQVIsQ0FBTCxHQUFrQmpCLGVBQWUsQ0FBQ3NCLENBQWxDO0FBQ0FULE1BQUFBLEtBQUssQ0FBQ0ksTUFBTSxHQUFDLENBQVIsQ0FBTCxHQUFrQmpCLGVBQWUsQ0FBQ3VCLENBQWxDO0FBQ0g7QUFDSjtBQWYwRCxDQUEvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuY29uc3QgQXNzZW1ibGVyM0QgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9hc3NlbWJsZXItM2QnKTtcbmNvbnN0IFdlYmdsTGV0dGVyRm9udEFzc2VtYmxlciA9IHJlcXVpcmUoJy4uLzJkL2xldHRlcicpO1xuXG5jb25zdCB2ZWMzX3RlbXBfbG9jYWwgPSBuZXcgVmVjMygpO1xuY29uc3QgdmVjM190ZW1wX3dvcmxkID0gbmV3IFZlYzMoKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViZ2xMZXR0ZXJGb250QXNzZW1ibGVyM0QgZXh0ZW5kcyBXZWJnbExldHRlckZvbnRBc3NlbWJsZXIge1xuXG59XG5cbmNjLmpzLm1peGluKFdlYmdsTGV0dGVyRm9udEFzc2VtYmxlcjNELnByb3RvdHlwZSwgQXNzZW1ibGVyM0QsIHtcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChjb21wKSB7XG4gICAgICAgIGxldCBtYXRyaXggPSBjb21wLm5vZGUuX3dvcmxkTWF0cml4O1xuICAgICAgICBsZXQgbG9jYWwgPSB0aGlzLl9sb2NhbDtcbiAgICAgICAgbGV0IHdvcmxkID0gdGhpcy5fcmVuZGVyRGF0YS52RGF0YXNbMF07XG5cbiAgICAgICAgbGV0IGZsb2F0c1BlclZlcnQgPSB0aGlzLmZsb2F0c1BlclZlcnQ7XG4gICAgICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IHdvcmxkLmxlbmd0aDsgb2Zmc2V0ICs9IGZsb2F0c1BlclZlcnQpIHtcbiAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcF9sb2NhbCwgbG9jYWxbb2Zmc2V0XSwgbG9jYWxbb2Zmc2V0KzFdLCAwKTtcbiAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NCh2ZWMzX3RlbXBfd29ybGQsIHZlYzNfdGVtcF9sb2NhbCwgbWF0cml4KTtcblxuICAgICAgICAgICAgd29ybGRbb2Zmc2V0XSA9IHZlYzNfdGVtcF93b3JsZC54O1xuICAgICAgICAgICAgd29ybGRbb2Zmc2V0KzFdID0gdmVjM190ZW1wX3dvcmxkLnk7XG4gICAgICAgICAgICB3b3JsZFtvZmZzZXQrMl0gPSB2ZWMzX3RlbXBfd29ybGQuejtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii8ifQ==