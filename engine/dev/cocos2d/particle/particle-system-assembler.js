
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/particle-system-assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var _assembler = _interopRequireDefault(require("../core/renderer/assembler"));

var _inputAssembler = _interopRequireDefault(require("../renderer/core/input-assembler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ParticleSystem = require('./CCParticleSystem');

var renderer = require('../core/renderer/');

var QuadBuffer = require('../core/renderer/webgl/quad-buffer');

var vfmtPosUvColor = require('../core/renderer/webgl/vertex-format').vfmtPosUvColor;

var ParticleAssembler = /*#__PURE__*/function (_Assembler) {
  _inheritsLoose(ParticleAssembler, _Assembler);

  function ParticleAssembler(comp) {
    var _this;

    _this = _Assembler.call(this, comp) || this;
    _this._buffer = null;
    _this._ia = null;
    _this._vfmt = vfmtPosUvColor;
    return _this;
  }

  var _proto = ParticleAssembler.prototype;

  _proto.getBuffer = function getBuffer() {
    if (!this._buffer) {
      // Create quad buffer for vertex and index
      this._buffer = new QuadBuffer(renderer._handle, vfmtPosUvColor);
      this._ia = new _inputAssembler["default"]();
      this._ia._vertexBuffer = this._buffer._vb;
      this._ia._indexBuffer = this._buffer._ib;
      this._ia._start = 0;
      this._ia._count = 0;
    }

    return this._buffer;
  };

  _proto.fillBuffers = function fillBuffers(comp, renderer) {
    if (!this._ia) return;
    var PositionType = cc.ParticleSystem.PositionType;

    if (comp.positionType === PositionType.RELATIVE) {
      renderer.node = comp.node.parent;
    } else {
      renderer.node = comp.node;
    }

    renderer.material = comp._materials[0];

    renderer._flushIA(this._ia);
  };

  return ParticleAssembler;
}(_assembler["default"]);

_assembler["default"].register(ParticleSystem, ParticleAssembler);

module.exports = ParticleAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9wYXJ0aWNsZS9wYXJ0aWNsZS1zeXN0ZW0tYXNzZW1ibGVyLmpzIl0sIm5hbWVzIjpbIlBhcnRpY2xlU3lzdGVtIiwicmVxdWlyZSIsInJlbmRlcmVyIiwiUXVhZEJ1ZmZlciIsInZmbXRQb3NVdkNvbG9yIiwiUGFydGljbGVBc3NlbWJsZXIiLCJjb21wIiwiX2J1ZmZlciIsIl9pYSIsIl92Zm10IiwiZ2V0QnVmZmVyIiwiX2hhbmRsZSIsIklucHV0QXNzZW1ibGVyIiwiX3ZlcnRleEJ1ZmZlciIsIl92YiIsIl9pbmRleEJ1ZmZlciIsIl9pYiIsIl9zdGFydCIsIl9jb3VudCIsImZpbGxCdWZmZXJzIiwiUG9zaXRpb25UeXBlIiwiY2MiLCJwb3NpdGlvblR5cGUiLCJSRUxBVElWRSIsIm5vZGUiLCJwYXJlbnQiLCJtYXRlcmlhbCIsIl9tYXRlcmlhbHMiLCJfZmx1c2hJQSIsIkFzc2VtYmxlciIsInJlZ2lzdGVyIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXlCQTs7QUFPQTs7Ozs7O0FBTEEsSUFBTUEsY0FBYyxHQUFHQyxPQUFPLENBQUMsb0JBQUQsQ0FBOUI7O0FBQ0EsSUFBTUMsUUFBUSxHQUFHRCxPQUFPLENBQUMsbUJBQUQsQ0FBeEI7O0FBQ0EsSUFBTUUsVUFBVSxHQUFHRixPQUFPLENBQUMsb0NBQUQsQ0FBMUI7O0FBQ0EsSUFBTUcsY0FBYyxHQUFHSCxPQUFPLENBQUMsc0NBQUQsQ0FBUCxDQUFnREcsY0FBdkU7O0lBSU1DOzs7QUFDRiw2QkFBYUMsSUFBYixFQUFtQjtBQUFBOztBQUNmLGtDQUFNQSxJQUFOO0FBRUEsVUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFLQyxHQUFMLEdBQVcsSUFBWDtBQUVBLFVBQUtDLEtBQUwsR0FBYUwsY0FBYjtBQU5lO0FBT2xCOzs7O1NBRURNLFlBQUEscUJBQWE7QUFDVCxRQUFJLENBQUMsS0FBS0gsT0FBVixFQUFtQjtBQUNmO0FBQ0EsV0FBS0EsT0FBTCxHQUFlLElBQUlKLFVBQUosQ0FBZUQsUUFBUSxDQUFDUyxPQUF4QixFQUFpQ1AsY0FBakMsQ0FBZjtBQUVBLFdBQUtJLEdBQUwsR0FBVyxJQUFJSSwwQkFBSixFQUFYO0FBQ0EsV0FBS0osR0FBTCxDQUFTSyxhQUFULEdBQXlCLEtBQUtOLE9BQUwsQ0FBYU8sR0FBdEM7QUFDQSxXQUFLTixHQUFMLENBQVNPLFlBQVQsR0FBd0IsS0FBS1IsT0FBTCxDQUFhUyxHQUFyQztBQUNBLFdBQUtSLEdBQUwsQ0FBU1MsTUFBVCxHQUFrQixDQUFsQjtBQUNBLFdBQUtULEdBQUwsQ0FBU1UsTUFBVCxHQUFrQixDQUFsQjtBQUNIOztBQUNELFdBQU8sS0FBS1gsT0FBWjtBQUNIOztTQUVEWSxjQUFBLHFCQUFhYixJQUFiLEVBQW1CSixRQUFuQixFQUE2QjtBQUN6QixRQUFJLENBQUMsS0FBS00sR0FBVixFQUFlO0FBRWYsUUFBTVksWUFBWSxHQUFHQyxFQUFFLENBQUNyQixjQUFILENBQWtCb0IsWUFBdkM7O0FBQ0EsUUFBSWQsSUFBSSxDQUFDZ0IsWUFBTCxLQUFzQkYsWUFBWSxDQUFDRyxRQUF2QyxFQUFpRDtBQUM3Q3JCLE1BQUFBLFFBQVEsQ0FBQ3NCLElBQVQsR0FBZ0JsQixJQUFJLENBQUNrQixJQUFMLENBQVVDLE1BQTFCO0FBQ0gsS0FGRCxNQUVPO0FBQ0h2QixNQUFBQSxRQUFRLENBQUNzQixJQUFULEdBQWdCbEIsSUFBSSxDQUFDa0IsSUFBckI7QUFDSDs7QUFDRHRCLElBQUFBLFFBQVEsQ0FBQ3dCLFFBQVQsR0FBb0JwQixJQUFJLENBQUNxQixVQUFMLENBQWdCLENBQWhCLENBQXBCOztBQUNBekIsSUFBQUEsUUFBUSxDQUFDMEIsUUFBVCxDQUFrQixLQUFLcEIsR0FBdkI7QUFDSDs7O0VBbkMyQnFCOztBQXNDaENBLHNCQUFVQyxRQUFWLENBQW1COUIsY0FBbkIsRUFBbUNLLGlCQUFuQzs7QUFFQTBCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjNCLGlCQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gQ2h1a29uZyBBaXB1IHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbmltcG9ydCBBc3NlbWJsZXIgZnJvbSAnLi4vY29yZS9yZW5kZXJlci9hc3NlbWJsZXInO1xuIFxuY29uc3QgUGFydGljbGVTeXN0ZW0gPSByZXF1aXJlKCcuL0NDUGFydGljbGVTeXN0ZW0nKTtcbmNvbnN0IHJlbmRlcmVyID0gcmVxdWlyZSgnLi4vY29yZS9yZW5kZXJlci8nKTtcbmNvbnN0IFF1YWRCdWZmZXIgPSByZXF1aXJlKCcuLi9jb3JlL3JlbmRlcmVyL3dlYmdsL3F1YWQtYnVmZmVyJyk7XG5jb25zdCB2Zm10UG9zVXZDb2xvciA9IHJlcXVpcmUoJy4uL2NvcmUvcmVuZGVyZXIvd2ViZ2wvdmVydGV4LWZvcm1hdCcpLnZmbXRQb3NVdkNvbG9yO1xuXG5pbXBvcnQgSW5wdXRBc3NlbWJsZXIgZnJvbSAnLi4vcmVuZGVyZXIvY29yZS9pbnB1dC1hc3NlbWJsZXInO1xuXG5jbGFzcyBQYXJ0aWNsZUFzc2VtYmxlciBleHRlbmRzIEFzc2VtYmxlciB7XG4gICAgY29uc3RydWN0b3IgKGNvbXApIHtcbiAgICAgICAgc3VwZXIoY29tcCk7XG5cbiAgICAgICAgdGhpcy5fYnVmZmVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5faWEgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3ZmbXQgPSB2Zm10UG9zVXZDb2xvcjtcbiAgICB9XG5cbiAgICBnZXRCdWZmZXIgKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2J1ZmZlcikge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIHF1YWQgYnVmZmVyIGZvciB2ZXJ0ZXggYW5kIGluZGV4XG4gICAgICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgUXVhZEJ1ZmZlcihyZW5kZXJlci5faGFuZGxlLCB2Zm10UG9zVXZDb2xvcik7XG5cbiAgICAgICAgICAgIHRoaXMuX2lhID0gbmV3IElucHV0QXNzZW1ibGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9pYS5fdmVydGV4QnVmZmVyID0gdGhpcy5fYnVmZmVyLl92YjtcbiAgICAgICAgICAgIHRoaXMuX2lhLl9pbmRleEJ1ZmZlciA9IHRoaXMuX2J1ZmZlci5faWI7XG4gICAgICAgICAgICB0aGlzLl9pYS5fc3RhcnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5faWEuX2NvdW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyO1xuICAgIH1cbiAgICBcbiAgICBmaWxsQnVmZmVycyAoY29tcCwgcmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pYSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgUG9zaXRpb25UeXBlID0gY2MuUGFydGljbGVTeXN0ZW0uUG9zaXRpb25UeXBlO1xuICAgICAgICBpZiAoY29tcC5wb3NpdGlvblR5cGUgPT09IFBvc2l0aW9uVHlwZS5SRUxBVElWRSkge1xuICAgICAgICAgICAgcmVuZGVyZXIubm9kZSA9IGNvbXAubm9kZS5wYXJlbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW5kZXJlci5ub2RlID0gY29tcC5ub2RlO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcmVyLm1hdGVyaWFsID0gY29tcC5fbWF0ZXJpYWxzWzBdO1xuICAgICAgICByZW5kZXJlci5fZmx1c2hJQSh0aGlzLl9pYSk7XG4gICAgfVxufVxuXG5Bc3NlbWJsZXIucmVnaXN0ZXIoUGFydGljbGVTeXN0ZW0sIFBhcnRpY2xlQXNzZW1ibGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZUFzc2VtYmxlcjsiXSwic291cmNlUm9vdCI6Ii8ifQ==