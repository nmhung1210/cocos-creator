
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/webgl/assemblers/sprite/3d/sliced.js';
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

var SlicedAssembler = require('../2d/sliced');

var vec3_temp_local = new _vec["default"]();
var vec3_temp_world = new _vec["default"]();

var SlicedAssembler3D = /*#__PURE__*/function (_SlicedAssembler) {
  _inheritsLoose(SlicedAssembler3D, _SlicedAssembler);

  function SlicedAssembler3D() {
    return _SlicedAssembler.apply(this, arguments) || this;
  }

  return SlicedAssembler3D;
}(SlicedAssembler);

exports["default"] = SlicedAssembler3D;
cc.js.mixin(SlicedAssembler3D.prototype, Assembler3D, {
  updateWorldVerts: function updateWorldVerts(sprite) {
    var matrix = sprite.node._worldMatrix;
    var local = this._local;
    var world = this._renderData.vDatas[0];
    var floatsPerVert = this.floatsPerVert;

    for (var row = 0; row < 4; ++row) {
      var localRowY = local[row * 2 + 1];

      for (var col = 0; col < 4; ++col) {
        var localColX = local[col * 2];

        _vec["default"].set(vec3_temp_local, localColX, localRowY, 0);

        _vec["default"].transformMat4(vec3_temp_world, vec3_temp_local, matrix);

        var worldIndex = (row * 4 + col) * floatsPerVert;
        world[worldIndex] = vec3_temp_world.x;
        world[worldIndex + 1] = vec3_temp_world.y;
        world[worldIndex + 2] = vec3_temp_world.z;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL3dlYmdsL2Fzc2VtYmxlcnMvc3ByaXRlLzNkL3NsaWNlZC5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIzRCIsInJlcXVpcmUiLCJTbGljZWRBc3NlbWJsZXIiLCJ2ZWMzX3RlbXBfbG9jYWwiLCJWZWMzIiwidmVjM190ZW1wX3dvcmxkIiwiU2xpY2VkQXNzZW1ibGVyM0QiLCJjYyIsImpzIiwibWl4aW4iLCJwcm90b3R5cGUiLCJ1cGRhdGVXb3JsZFZlcnRzIiwic3ByaXRlIiwibWF0cml4Iiwibm9kZSIsIl93b3JsZE1hdHJpeCIsImxvY2FsIiwiX2xvY2FsIiwid29ybGQiLCJfcmVuZGVyRGF0YSIsInZEYXRhcyIsImZsb2F0c1BlclZlcnQiLCJyb3ciLCJsb2NhbFJvd1kiLCJjb2wiLCJsb2NhbENvbFgiLCJzZXQiLCJ0cmFuc2Zvcm1NYXQ0Iiwid29ybGRJbmRleCIsIngiLCJ5IiwieiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7O0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxPQUFPLENBQUMsMEJBQUQsQ0FBM0I7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHRCxPQUFPLENBQUMsY0FBRCxDQUEvQjs7QUFFQSxJQUFNRSxlQUFlLEdBQUcsSUFBSUMsZUFBSixFQUF4QjtBQUNBLElBQU1DLGVBQWUsR0FBRyxJQUFJRCxlQUFKLEVBQXhCOztJQUVxQkU7Ozs7Ozs7O0VBQTBCSjs7O0FBSS9DSyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsS0FBTixDQUFZSCxpQkFBaUIsQ0FBQ0ksU0FBOUIsRUFBeUNWLFdBQXpDLEVBQXNEO0FBQ2xEVyxFQUFBQSxnQkFEa0QsNEJBQ2hDQyxNQURnQyxFQUN4QjtBQUN0QixRQUFJQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ0UsSUFBUCxDQUFZQyxZQUF6QjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxNQUFqQjtBQUNBLFFBQUlDLEtBQUssR0FBRyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixDQUFaO0FBRUEsUUFBSUMsYUFBYSxHQUFHLEtBQUtBLGFBQXpCOztBQUNBLFNBQUssSUFBSUMsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxDQUF4QixFQUEyQixFQUFFQSxHQUE3QixFQUFrQztBQUM5QixVQUFJQyxTQUFTLEdBQUdQLEtBQUssQ0FBQ00sR0FBRyxHQUFHLENBQU4sR0FBVSxDQUFYLENBQXJCOztBQUNBLFdBQUssSUFBSUUsR0FBRyxHQUFHLENBQWYsRUFBa0JBLEdBQUcsR0FBRyxDQUF4QixFQUEyQixFQUFFQSxHQUE3QixFQUFrQztBQUM5QixZQUFJQyxTQUFTLEdBQUdULEtBQUssQ0FBQ1EsR0FBRyxHQUFHLENBQVAsQ0FBckI7O0FBRUFwQix3QkFBS3NCLEdBQUwsQ0FBU3ZCLGVBQVQsRUFBMEJzQixTQUExQixFQUFxQ0YsU0FBckMsRUFBZ0QsQ0FBaEQ7O0FBQ0FuQix3QkFBS3VCLGFBQUwsQ0FBbUJ0QixlQUFuQixFQUFvQ0YsZUFBcEMsRUFBcURVLE1BQXJEOztBQUVBLFlBQUllLFVBQVUsR0FBRyxDQUFDTixHQUFHLEdBQUcsQ0FBTixHQUFVRSxHQUFYLElBQWtCSCxhQUFuQztBQUNBSCxRQUFBQSxLQUFLLENBQUNVLFVBQUQsQ0FBTCxHQUFvQnZCLGVBQWUsQ0FBQ3dCLENBQXBDO0FBQ0FYLFFBQUFBLEtBQUssQ0FBQ1UsVUFBVSxHQUFDLENBQVosQ0FBTCxHQUFzQnZCLGVBQWUsQ0FBQ3lCLENBQXRDO0FBQ0FaLFFBQUFBLEtBQUssQ0FBQ1UsVUFBVSxHQUFDLENBQVosQ0FBTCxHQUFzQnZCLGVBQWUsQ0FBQzBCLENBQXRDO0FBQ0g7QUFDSjtBQUNKO0FBckJpRCxDQUF0RCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBWZWMzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3ZhbHVlLXR5cGVzL3ZlYzMnO1xuXG5jb25zdCBBc3NlbWJsZXIzRCA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL2Fzc2VtYmxlci0zZCcpO1xuY29uc3QgU2xpY2VkQXNzZW1ibGVyID0gcmVxdWlyZSgnLi4vMmQvc2xpY2VkJyk7XG5cbmNvbnN0IHZlYzNfdGVtcF9sb2NhbCA9IG5ldyBWZWMzKCk7XG5jb25zdCB2ZWMzX3RlbXBfd29ybGQgPSBuZXcgVmVjMygpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGljZWRBc3NlbWJsZXIzRCBleHRlbmRzIFNsaWNlZEFzc2VtYmxlciB7XG4gICAgXG59XG5cbmNjLmpzLm1peGluKFNsaWNlZEFzc2VtYmxlcjNELnByb3RvdHlwZSwgQXNzZW1ibGVyM0QsIHtcbiAgICB1cGRhdGVXb3JsZFZlcnRzIChzcHJpdGUpIHtcbiAgICAgICAgbGV0IG1hdHJpeCA9IHNwcml0ZS5ub2RlLl93b3JsZE1hdHJpeDtcbiAgICAgICAgbGV0IGxvY2FsID0gdGhpcy5fbG9jYWw7XG4gICAgICAgIGxldCB3b3JsZCA9IHRoaXMuX3JlbmRlckRhdGEudkRhdGFzWzBdO1xuXG4gICAgICAgIGxldCBmbG9hdHNQZXJWZXJ0ID0gdGhpcy5mbG9hdHNQZXJWZXJ0O1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA0OyArK3Jvdykge1xuICAgICAgICAgICAgbGV0IGxvY2FsUm93WSA9IGxvY2FsW3JvdyAqIDIgKyAxXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDQ7ICsrY29sKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsQ29sWCA9IGxvY2FsW2NvbCAqIDJdO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFZlYzMuc2V0KHZlYzNfdGVtcF9sb2NhbCwgbG9jYWxDb2xYLCBsb2NhbFJvd1ksIDApO1xuICAgICAgICAgICAgICAgIFZlYzMudHJhbnNmb3JtTWF0NCh2ZWMzX3RlbXBfd29ybGQsIHZlYzNfdGVtcF9sb2NhbCwgbWF0cml4KTtcblxuICAgICAgICAgICAgICAgIGxldCB3b3JsZEluZGV4ID0gKHJvdyAqIDQgKyBjb2wpICogZmxvYXRzUGVyVmVydDtcbiAgICAgICAgICAgICAgICB3b3JsZFt3b3JsZEluZGV4XSA9IHZlYzNfdGVtcF93b3JsZC54O1xuICAgICAgICAgICAgICAgIHdvcmxkW3dvcmxkSW5kZXgrMV0gPSB2ZWMzX3RlbXBfd29ybGQueTtcbiAgICAgICAgICAgICAgICB3b3JsZFt3b3JsZEluZGV4KzJdID0gdmVjM190ZW1wX3dvcmxkLno7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9