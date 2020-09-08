
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/assembler-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _pool3 = _interopRequireDefault(require("../utils/pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _assemblerId = 0;

function getAssemblerId(assemblerCtor) {
  if (!Object.getOwnPropertyDescriptor(assemblerCtor, '__assemblerId__')) {
    assemblerCtor.__assemblerId__ = ++_assemblerId;
  }

  return assemblerCtor.__assemblerId__;
}
/**
 * {
 *   assembler_ctor_id: []
 * }
 */


var AssemblerPool = /*#__PURE__*/function (_Pool) {
  _inheritsLoose(AssemblerPool, _Pool);

  function AssemblerPool() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Pool.call.apply(_Pool, [this].concat(args)) || this;
    _this._pool = {};
    return _this;
  }

  var _proto = AssemblerPool.prototype;

  _proto.put = function put(assembler) {
    if (!assembler) return;

    if (!this.enabled) {
      if (CC_JSB && CC_NATIVERENDERER) {
        assembler.destroy && assembler.destroy();
      }

      return;
    }

    var id = getAssemblerId(assembler.constructor);
    var pool = this._pool;

    if (!pool[id]) {
      pool[id] = [];
    }

    if (this.count > this.maxSize) return;

    this._clean(assembler);

    pool[id].push(assembler);
    this.count++;
  };

  _proto.get = function get(assemblerCtor) {
    var assembler;

    if (this.enabled) {
      var _pool = this._pool;
      var id = getAssemblerId(assemblerCtor);
      assembler = _pool[id] && _pool[id].pop();
    }

    if (!assembler) {
      assembler = new assemblerCtor();
    } else {
      this.count--;
    }

    return assembler;
  };

  _proto.clear = function clear() {
    if (CC_JSB && CC_NATIVERENDERER) {
      var _pool2 = this._pool;

      for (var name in _pool2) {
        var assemblers = _pool2[name];
        if (!assemblers) continue;

        for (var i = 0; i < assemblers.length; i++) {
          assemblers[i].destroy && assemblers[i].destroy();
        }
      }
    }

    this._pool = {};
    this.count = 0;
  };

  _proto._clean = function _clean(assembler) {
    if (CC_JSB && CC_NATIVERENDERER) {
      assembler.reset();
    }

    assembler._renderComp = null;
  };

  return AssemblerPool;
}(_pool3["default"]);

var pool = new AssemblerPool();

_pool3["default"].register('assembler', pool);

var _default = pool;
exports["default"] = _default;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2Fzc2VtYmxlci1wb29sLmpzIl0sIm5hbWVzIjpbIl9hc3NlbWJsZXJJZCIsImdldEFzc2VtYmxlcklkIiwiYXNzZW1ibGVyQ3RvciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIl9fYXNzZW1ibGVySWRfXyIsIkFzc2VtYmxlclBvb2wiLCJfcG9vbCIsInB1dCIsImFzc2VtYmxlciIsImVuYWJsZWQiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsImRlc3Ryb3kiLCJpZCIsImNvbnN0cnVjdG9yIiwicG9vbCIsImNvdW50IiwibWF4U2l6ZSIsIl9jbGVhbiIsInB1c2giLCJnZXQiLCJwb3AiLCJjbGVhciIsIm5hbWUiLCJhc3NlbWJsZXJzIiwiaSIsImxlbmd0aCIsInJlc2V0IiwiX3JlbmRlckNvbXAiLCJQb29sIiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsWUFBWSxHQUFHLENBQW5COztBQUVBLFNBQVNDLGNBQVQsQ0FBeUJDLGFBQXpCLEVBQXdDO0FBQ3BDLE1BQUksQ0FBQ0MsTUFBTSxDQUFDQyx3QkFBUCxDQUFnQ0YsYUFBaEMsRUFBK0MsaUJBQS9DLENBQUwsRUFBd0U7QUFDcEVBLElBQUFBLGFBQWEsQ0FBQ0csZUFBZCxHQUFnQyxFQUFFTCxZQUFsQztBQUNIOztBQUNELFNBQU9FLGFBQWEsQ0FBQ0csZUFBckI7QUFDSDtBQUVEOzs7Ozs7O0lBS01DOzs7Ozs7Ozs7OztVQUNGQyxRQUFROzs7Ozs7U0FFUkMsTUFBQSxhQUFLQyxTQUFMLEVBQWdCO0FBQ1osUUFBSSxDQUFDQSxTQUFMLEVBQWdCOztBQUNoQixRQUFJLENBQUMsS0FBS0MsT0FBVixFQUFtQjtBQUNmLFVBQUlDLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0JILFFBQUFBLFNBQVMsQ0FBQ0ksT0FBVixJQUFxQkosU0FBUyxDQUFDSSxPQUFWLEVBQXJCO0FBQ0g7O0FBQ0Q7QUFDSDs7QUFFRCxRQUFJQyxFQUFFLEdBQUdiLGNBQWMsQ0FBQ1EsU0FBUyxDQUFDTSxXQUFYLENBQXZCO0FBQ0EsUUFBSUMsSUFBSSxHQUFHLEtBQUtULEtBQWhCOztBQUNBLFFBQUksQ0FBQ1MsSUFBSSxDQUFDRixFQUFELENBQVQsRUFBZTtBQUNYRSxNQUFBQSxJQUFJLENBQUNGLEVBQUQsQ0FBSixHQUFXLEVBQVg7QUFDSDs7QUFDRCxRQUFJLEtBQUtHLEtBQUwsR0FBYSxLQUFLQyxPQUF0QixFQUErQjs7QUFFL0IsU0FBS0MsTUFBTCxDQUFZVixTQUFaOztBQUNBTyxJQUFBQSxJQUFJLENBQUNGLEVBQUQsQ0FBSixDQUFTTSxJQUFULENBQWNYLFNBQWQ7QUFDQSxTQUFLUSxLQUFMO0FBQ0g7O1NBRURJLE1BQUEsYUFBS25CLGFBQUwsRUFBb0I7QUFDaEIsUUFBSU8sU0FBSjs7QUFFQSxRQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZCxVQUFJTSxLQUFJLEdBQUcsS0FBS1QsS0FBaEI7QUFDQSxVQUFJTyxFQUFFLEdBQUdiLGNBQWMsQ0FBQ0MsYUFBRCxDQUF2QjtBQUNBTyxNQUFBQSxTQUFTLEdBQUdPLEtBQUksQ0FBQ0YsRUFBRCxDQUFKLElBQVlFLEtBQUksQ0FBQ0YsRUFBRCxDQUFKLENBQVNRLEdBQVQsRUFBeEI7QUFDSDs7QUFFRCxRQUFJLENBQUNiLFNBQUwsRUFBZ0I7QUFDWkEsTUFBQUEsU0FBUyxHQUFHLElBQUlQLGFBQUosRUFBWjtBQUNILEtBRkQsTUFHSztBQUNELFdBQUtlLEtBQUw7QUFDSDs7QUFDRCxXQUFPUixTQUFQO0FBQ0g7O1NBRURjLFFBQUEsaUJBQVM7QUFDTCxRQUFJWixNQUFNLElBQUlDLGlCQUFkLEVBQWlDO0FBQzdCLFVBQUlJLE1BQUksR0FBRyxLQUFLVCxLQUFoQjs7QUFDQSxXQUFLLElBQUlpQixJQUFULElBQWlCUixNQUFqQixFQUF1QjtBQUNuQixZQUFJUyxVQUFVLEdBQUdULE1BQUksQ0FBQ1EsSUFBRCxDQUFyQjtBQUNBLFlBQUksQ0FBQ0MsVUFBTCxFQUFpQjs7QUFFakIsYUFBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxVQUFVLENBQUNFLE1BQS9CLEVBQXVDRCxDQUFDLEVBQXhDLEVBQTRDO0FBQ3hDRCxVQUFBQSxVQUFVLENBQUNDLENBQUQsQ0FBVixDQUFjYixPQUFkLElBQXlCWSxVQUFVLENBQUNDLENBQUQsQ0FBVixDQUFjYixPQUFkLEVBQXpCO0FBQ0g7QUFDSjtBQUNKOztBQUVELFNBQUtOLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS1UsS0FBTCxHQUFhLENBQWI7QUFDSDs7U0FFREUsU0FBQSxnQkFBUVYsU0FBUixFQUFtQjtBQUNmLFFBQUlFLE1BQU0sSUFBSUMsaUJBQWQsRUFBaUM7QUFDN0JILE1BQUFBLFNBQVMsQ0FBQ21CLEtBQVY7QUFDSDs7QUFDRG5CLElBQUFBLFNBQVMsQ0FBQ29CLFdBQVYsR0FBd0IsSUFBeEI7QUFDSDs7O0VBaEV1QkM7O0FBbUU1QixJQUFJZCxJQUFJLEdBQUcsSUFBSVYsYUFBSixFQUFYOztBQUNBd0Isa0JBQUtDLFFBQUwsQ0FBYyxXQUFkLEVBQTJCZixJQUEzQjs7ZUFDZUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9vbCBmcm9tICcuLi91dGlscy9wb29sJztcblxubGV0IF9hc3NlbWJsZXJJZCA9IDA7XG5cbmZ1bmN0aW9uIGdldEFzc2VtYmxlcklkIChhc3NlbWJsZXJDdG9yKSB7XG4gICAgaWYgKCFPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFzc2VtYmxlckN0b3IsICdfX2Fzc2VtYmxlcklkX18nKSkge1xuICAgICAgICBhc3NlbWJsZXJDdG9yLl9fYXNzZW1ibGVySWRfXyA9ICsrX2Fzc2VtYmxlcklkO1xuICAgIH1cbiAgICByZXR1cm4gYXNzZW1ibGVyQ3Rvci5fX2Fzc2VtYmxlcklkX187XG59XG5cbi8qKlxuICoge1xuICogICBhc3NlbWJsZXJfY3Rvcl9pZDogW11cbiAqIH1cbiAqL1xuY2xhc3MgQXNzZW1ibGVyUG9vbCBleHRlbmRzIFBvb2wge1xuICAgIF9wb29sID0ge307XG5cbiAgICBwdXQgKGFzc2VtYmxlcikge1xuICAgICAgICBpZiAoIWFzc2VtYmxlcikgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgICAgIGFzc2VtYmxlci5kZXN0cm95ICYmIGFzc2VtYmxlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaWQgPSBnZXRBc3NlbWJsZXJJZChhc3NlbWJsZXIuY29uc3RydWN0b3IpO1xuICAgICAgICBsZXQgcG9vbCA9IHRoaXMuX3Bvb2w7XG4gICAgICAgIGlmICghcG9vbFtpZF0pIHtcbiAgICAgICAgICAgIHBvb2xbaWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY291bnQgPiB0aGlzLm1heFNpemUpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9jbGVhbihhc3NlbWJsZXIpO1xuICAgICAgICBwb29sW2lkXS5wdXNoKGFzc2VtYmxlcik7XG4gICAgICAgIHRoaXMuY291bnQrKztcbiAgICB9XG5cbiAgICBnZXQgKGFzc2VtYmxlckN0b3IpIHtcbiAgICAgICAgbGV0IGFzc2VtYmxlcjtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGxldCBwb29sID0gdGhpcy5fcG9vbDtcbiAgICAgICAgICAgIGxldCBpZCA9IGdldEFzc2VtYmxlcklkKGFzc2VtYmxlckN0b3IpO1xuICAgICAgICAgICAgYXNzZW1ibGVyID0gcG9vbFtpZF0gJiYgcG9vbFtpZF0ucG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFzc2VtYmxlcikge1xuICAgICAgICAgICAgYXNzZW1ibGVyID0gbmV3IGFzc2VtYmxlckN0b3IoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY291bnQtLTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXNzZW1ibGVyO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYgKENDX0pTQiAmJiBDQ19OQVRJVkVSRU5ERVJFUikge1xuICAgICAgICAgICAgbGV0IHBvb2wgPSB0aGlzLl9wb29sO1xuICAgICAgICAgICAgZm9yIChsZXQgbmFtZSBpbiBwb29sKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFzc2VtYmxlcnMgPSBwb29sW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghYXNzZW1ibGVycykgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzc2VtYmxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZW1ibGVyc1tpXS5kZXN0cm95ICYmIGFzc2VtYmxlcnNbaV0uZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5fcG9vbCA9IHt9O1xuICAgICAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB9XG5cbiAgICBfY2xlYW4gKGFzc2VtYmxlcikge1xuICAgICAgICBpZiAoQ0NfSlNCICYmIENDX05BVElWRVJFTkRFUkVSKSB7XG4gICAgICAgICAgICBhc3NlbWJsZXIucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlbWJsZXIuX3JlbmRlckNvbXAgPSBudWxsO1xuICAgIH1cbn1cblxubGV0IHBvb2wgPSBuZXcgQXNzZW1ibGVyUG9vbCgpO1xuUG9vbC5yZWdpc3RlcignYXNzZW1ibGVyJywgcG9vbCk7XG5leHBvcnQgZGVmYXVsdCBwb29sO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=