
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _vertexFormat = require("./webgl/vertex-format");

var _assemblerPool = _interopRequireDefault(require("./assembler-pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Assembler = /*#__PURE__*/function () {
  function Assembler() {
    this._extendNative && this._extendNative();
  }

  var _proto = Assembler.prototype;

  _proto.init = function init(renderComp) {
    this._renderComp = renderComp;
  };

  _proto.updateRenderData = function updateRenderData(comp) {};

  _proto.fillBuffers = function fillBuffers(comp, renderer) {};

  _proto.getVfmt = function getVfmt() {
    return _vertexFormat.vfmtPosUvColor;
  };

  return Assembler;
}();

exports["default"] = Assembler;

Assembler.register = function (renderCompCtor, assembler) {
  renderCompCtor.__assembler__ = assembler;
};

Assembler.init = function (renderComp) {
  var renderCompCtor = renderComp.constructor;
  var assemblerCtor = renderCompCtor.__assembler__;

  while (!assemblerCtor) {
    renderCompCtor = renderCompCtor.$super;

    if (!renderCompCtor) {
      cc.warn("Can not find assembler for render component : [" + cc.js.getClassName(renderComp) + "]");
      return;
    }

    assemblerCtor = renderCompCtor.__assembler__;
  }

  if (assemblerCtor.getConstructor) {
    assemblerCtor = assemblerCtor.getConstructor(renderComp);
  }

  if (!renderComp._assembler || renderComp._assembler.constructor !== assemblerCtor) {
    var assembler = _assemblerPool["default"].get(assemblerCtor);

    assembler.init(renderComp);
    renderComp._assembler = assembler;
  }
};

cc.Assembler = Assembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlci5qcyJdLCJuYW1lcyI6WyJBc3NlbWJsZXIiLCJfZXh0ZW5kTmF0aXZlIiwiaW5pdCIsInJlbmRlckNvbXAiLCJfcmVuZGVyQ29tcCIsInVwZGF0ZVJlbmRlckRhdGEiLCJjb21wIiwiZmlsbEJ1ZmZlcnMiLCJyZW5kZXJlciIsImdldFZmbXQiLCJ2Zm10UG9zVXZDb2xvciIsInJlZ2lzdGVyIiwicmVuZGVyQ29tcEN0b3IiLCJhc3NlbWJsZXIiLCJfX2Fzc2VtYmxlcl9fIiwiY29uc3RydWN0b3IiLCJhc3NlbWJsZXJDdG9yIiwiJHN1cGVyIiwiY2MiLCJ3YXJuIiwianMiLCJnZXRDbGFzc05hbWUiLCJnZXRDb25zdHJ1Y3RvciIsIl9hc3NlbWJsZXIiLCJhc3NlbWJsZXJQb29sIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7SUFFcUJBO0FBQ2pCLHVCQUFlO0FBQ1gsU0FBS0MsYUFBTCxJQUFzQixLQUFLQSxhQUFMLEVBQXRCO0FBQ0g7Ozs7U0FDREMsT0FBQSxjQUFNQyxVQUFOLEVBQWtCO0FBQ2QsU0FBS0MsV0FBTCxHQUFtQkQsVUFBbkI7QUFDSDs7U0FFREUsbUJBQUEsMEJBQWtCQyxJQUFsQixFQUF3QixDQUN2Qjs7U0FFREMsY0FBQSxxQkFBYUQsSUFBYixFQUFtQkUsUUFBbkIsRUFBNkIsQ0FDNUI7O1NBRURDLFVBQUEsbUJBQVc7QUFDUCxXQUFPQyw0QkFBUDtBQUNIOzs7Ozs7O0FBSUxWLFNBQVMsQ0FBQ1csUUFBVixHQUFxQixVQUFVQyxjQUFWLEVBQTBCQyxTQUExQixFQUFxQztBQUN0REQsRUFBQUEsY0FBYyxDQUFDRSxhQUFmLEdBQStCRCxTQUEvQjtBQUNILENBRkQ7O0FBSUFiLFNBQVMsQ0FBQ0UsSUFBVixHQUFpQixVQUFVQyxVQUFWLEVBQXNCO0FBQ25DLE1BQUlTLGNBQWMsR0FBR1QsVUFBVSxDQUFDWSxXQUFoQztBQUNBLE1BQUlDLGFBQWEsR0FBSUosY0FBYyxDQUFDRSxhQUFwQzs7QUFDQSxTQUFPLENBQUNFLGFBQVIsRUFBdUI7QUFDbkJKLElBQUFBLGNBQWMsR0FBR0EsY0FBYyxDQUFDSyxNQUFoQzs7QUFDQSxRQUFJLENBQUNMLGNBQUwsRUFBcUI7QUFDakJNLE1BQUFBLEVBQUUsQ0FBQ0MsSUFBSCxxREFBMERELEVBQUUsQ0FBQ0UsRUFBSCxDQUFNQyxZQUFOLENBQW1CbEIsVUFBbkIsQ0FBMUQ7QUFDQTtBQUNIOztBQUNEYSxJQUFBQSxhQUFhLEdBQUlKLGNBQWMsQ0FBQ0UsYUFBaEM7QUFDSDs7QUFDRCxNQUFJRSxhQUFhLENBQUNNLGNBQWxCLEVBQWtDO0FBQzlCTixJQUFBQSxhQUFhLEdBQUdBLGFBQWEsQ0FBQ00sY0FBZCxDQUE2Qm5CLFVBQTdCLENBQWhCO0FBQ0g7O0FBRUQsTUFBSSxDQUFDQSxVQUFVLENBQUNvQixVQUFaLElBQTBCcEIsVUFBVSxDQUFDb0IsVUFBWCxDQUFzQlIsV0FBdEIsS0FBc0NDLGFBQXBFLEVBQW1GO0FBQy9FLFFBQUlILFNBQVMsR0FBR1csMEJBQWNDLEdBQWQsQ0FBa0JULGFBQWxCLENBQWhCOztBQUNBSCxJQUFBQSxTQUFTLENBQUNYLElBQVYsQ0FBZUMsVUFBZjtBQUNBQSxJQUFBQSxVQUFVLENBQUNvQixVQUFYLEdBQXdCVixTQUF4QjtBQUNIO0FBQ0osQ0FwQkQ7O0FBc0JBSyxFQUFFLENBQUNsQixTQUFILEdBQWVBLFNBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2Zm10UG9zVXZDb2xvciB9IGZyb20gJy4vd2ViZ2wvdmVydGV4LWZvcm1hdCc7XG5pbXBvcnQgYXNzZW1ibGVyUG9vbCBmcm9tICcuL2Fzc2VtYmxlci1wb29sJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNzZW1ibGVyIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuX2V4dGVuZE5hdGl2ZSAmJiB0aGlzLl9leHRlbmROYXRpdmUoKTtcbiAgICB9XG4gICAgaW5pdCAocmVuZGVyQ29tcCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJDb21wID0gcmVuZGVyQ29tcDtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlUmVuZGVyRGF0YSAoY29tcCkge1xuICAgIH1cblxuICAgIGZpbGxCdWZmZXJzIChjb21wLCByZW5kZXJlcikge1xuICAgIH1cbiAgICBcbiAgICBnZXRWZm10ICgpIHtcbiAgICAgICAgcmV0dXJuIHZmbXRQb3NVdkNvbG9yO1xuICAgIH1cbn1cblxuXG5Bc3NlbWJsZXIucmVnaXN0ZXIgPSBmdW5jdGlvbiAocmVuZGVyQ29tcEN0b3IsIGFzc2VtYmxlcikge1xuICAgIHJlbmRlckNvbXBDdG9yLl9fYXNzZW1ibGVyX18gPSBhc3NlbWJsZXI7XG59O1xuXG5Bc3NlbWJsZXIuaW5pdCA9IGZ1bmN0aW9uIChyZW5kZXJDb21wKSB7XG4gICAgbGV0IHJlbmRlckNvbXBDdG9yID0gcmVuZGVyQ29tcC5jb25zdHJ1Y3RvcjtcbiAgICBsZXQgYXNzZW1ibGVyQ3RvciA9ICByZW5kZXJDb21wQ3Rvci5fX2Fzc2VtYmxlcl9fO1xuICAgIHdoaWxlICghYXNzZW1ibGVyQ3Rvcikge1xuICAgICAgICByZW5kZXJDb21wQ3RvciA9IHJlbmRlckNvbXBDdG9yLiRzdXBlcjtcbiAgICAgICAgaWYgKCFyZW5kZXJDb21wQ3Rvcikge1xuICAgICAgICAgICAgY2Mud2FybihgQ2FuIG5vdCBmaW5kIGFzc2VtYmxlciBmb3IgcmVuZGVyIGNvbXBvbmVudCA6IFske2NjLmpzLmdldENsYXNzTmFtZShyZW5kZXJDb21wKX1dYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNzZW1ibGVyQ3RvciA9ICByZW5kZXJDb21wQ3Rvci5fX2Fzc2VtYmxlcl9fO1xuICAgIH1cbiAgICBpZiAoYXNzZW1ibGVyQ3Rvci5nZXRDb25zdHJ1Y3Rvcikge1xuICAgICAgICBhc3NlbWJsZXJDdG9yID0gYXNzZW1ibGVyQ3Rvci5nZXRDb25zdHJ1Y3RvcihyZW5kZXJDb21wKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKCFyZW5kZXJDb21wLl9hc3NlbWJsZXIgfHwgcmVuZGVyQ29tcC5fYXNzZW1ibGVyLmNvbnN0cnVjdG9yICE9PSBhc3NlbWJsZXJDdG9yKSB7XG4gICAgICAgIGxldCBhc3NlbWJsZXIgPSBhc3NlbWJsZXJQb29sLmdldChhc3NlbWJsZXJDdG9yKTtcbiAgICAgICAgYXNzZW1ibGVyLmluaXQocmVuZGVyQ29tcCk7XG4gICAgICAgIHJlbmRlckNvbXAuX2Fzc2VtYmxlciA9IGFzc2VtYmxlcjtcbiAgICB9XG59O1xuXG5jYy5Bc3NlbWJsZXIgPSBBc3NlbWJsZXI7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==