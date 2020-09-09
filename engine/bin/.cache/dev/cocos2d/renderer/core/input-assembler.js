
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/input-assembler.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _gfx = _interopRequireDefault(require("../gfx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputAssembler = /*#__PURE__*/function () {
  function InputAssembler(vb, ib, pt) {
    if (pt === void 0) {
      pt = _gfx["default"].PT_TRIANGLES;
    }

    this._vertexBuffer = vb;
    this._indexBuffer = ib;
    this._primitiveType = pt;
    this._start = 0;
    this._count = -1; // TODO: instancing data
    // this._stream = 0;
  }
  /**
   * @property {Number} count The number of indices or vertices to dispatch in the draw call.
   */


  _createClass(InputAssembler, [{
    key: "count",
    get: function get() {
      if (this._count !== -1) {
        return this._count;
      }

      if (this._indexBuffer) {
        return this._indexBuffer.count;
      }

      if (this._vertexBuffer) {
        return this._vertexBuffer.count;
      }

      return 0;
    }
  }]);

  return InputAssembler;
}();

exports["default"] = InputAssembler;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9jb3JlL2lucHV0LWFzc2VtYmxlci5qcyJdLCJuYW1lcyI6WyJJbnB1dEFzc2VtYmxlciIsInZiIiwiaWIiLCJwdCIsImdmeCIsIlBUX1RSSUFOR0xFUyIsIl92ZXJ0ZXhCdWZmZXIiLCJfaW5kZXhCdWZmZXIiLCJfcHJpbWl0aXZlVHlwZSIsIl9zdGFydCIsIl9jb3VudCIsImNvdW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRXFCQTtBQUNuQiwwQkFBWUMsRUFBWixFQUFnQkMsRUFBaEIsRUFBb0JDLEVBQXBCLEVBQTJDO0FBQUEsUUFBdkJBLEVBQXVCO0FBQXZCQSxNQUFBQSxFQUF1QixHQUFsQkMsZ0JBQUlDLFlBQWM7QUFBQTs7QUFDekMsU0FBS0MsYUFBTCxHQUFxQkwsRUFBckI7QUFDQSxTQUFLTSxZQUFMLEdBQW9CTCxFQUFwQjtBQUNBLFNBQUtNLGNBQUwsR0FBc0JMLEVBQXRCO0FBQ0EsU0FBS00sTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBQyxDQUFmLENBTHlDLENBT3pDO0FBQ0E7QUFDRDtBQUVEOzs7Ozs7O3dCQUdZO0FBQ1YsVUFBSSxLQUFLQSxNQUFMLEtBQWdCLENBQUMsQ0FBckIsRUFBd0I7QUFDdEIsZUFBTyxLQUFLQSxNQUFaO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLSCxZQUFULEVBQXVCO0FBQ3JCLGVBQU8sS0FBS0EsWUFBTCxDQUFrQkksS0FBekI7QUFDRDs7QUFFRCxVQUFJLEtBQUtMLGFBQVQsRUFBd0I7QUFDdEIsZUFBTyxLQUFLQSxhQUFMLENBQW1CSyxLQUExQjtBQUNEOztBQUVELGFBQU8sQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE3LTIwMTggWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbmltcG9ydCBnZnggZnJvbSAnLi4vZ2Z4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXRBc3NlbWJsZXIge1xuICBjb25zdHJ1Y3Rvcih2YiwgaWIsIHB0ID0gZ2Z4LlBUX1RSSUFOR0xFUykge1xuICAgIHRoaXMuX3ZlcnRleEJ1ZmZlciA9IHZiO1xuICAgIHRoaXMuX2luZGV4QnVmZmVyID0gaWI7XG4gICAgdGhpcy5fcHJpbWl0aXZlVHlwZSA9IHB0O1xuICAgIHRoaXMuX3N0YXJ0ID0gMDtcbiAgICB0aGlzLl9jb3VudCA9IC0xO1xuXG4gICAgLy8gVE9ETzogaW5zdGFuY2luZyBkYXRhXG4gICAgLy8gdGhpcy5fc3RyZWFtID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJvcGVydHkge051bWJlcn0gY291bnQgVGhlIG51bWJlciBvZiBpbmRpY2VzIG9yIHZlcnRpY2VzIHRvIGRpc3BhdGNoIGluIHRoZSBkcmF3IGNhbGwuXG4gICAqL1xuICBnZXQgY291bnQoKSB7XG4gICAgaWYgKHRoaXMuX2NvdW50ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbmRleEJ1ZmZlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2luZGV4QnVmZmVyLmNvdW50O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl92ZXJ0ZXhCdWZmZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl92ZXJ0ZXhCdWZmZXIuY291bnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==