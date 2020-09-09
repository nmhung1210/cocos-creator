
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/recycle-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _timsort = _interopRequireDefault(require("./timsort"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Recycle Pool
 * @class RecyclePool
 */
var RecyclePool = /*#__PURE__*/function () {
  function RecyclePool(fn, size) {
    this._fn = fn;
    this._count = 0;
    this._data = new Array(size);

    for (var i = 0; i < size; ++i) {
      this._data[i] = fn();
    }
  }

  var _proto = RecyclePool.prototype;

  _proto.reset = function reset() {
    this._count = 0;
  };

  _proto.resize = function resize(size) {
    if (size > this._data.length) {
      for (var i = this._data.length; i < size; ++i) {
        this._data[i] = this._fn();
      }
    }
  };

  _proto.add = function add() {
    if (this._count >= this._data.length) {
      this.resize(this._data.length * 2);
    }

    return this._data[this._count++];
  };

  _proto.remove = function remove(idx) {
    if (idx >= this._count) {
      return;
    }

    var last = this._count - 1;
    var tmp = this._data[idx];
    this._data[idx] = this._data[last];
    this._data[last] = tmp;
    this._count -= 1;
  };

  _proto.sort = function sort(cmp) {
    return (0, _timsort["default"])(this._data, 0, this._count, cmp);
  };

  _createClass(RecyclePool, [{
    key: "length",
    get: function get() {
      return this._count;
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    }
  }]);

  return RecyclePool;
}();

exports["default"] = RecyclePool;
cc.RecyclePool = RecyclePool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9yZWN5Y2xlLXBvb2wuanMiXSwibmFtZXMiOlsiUmVjeWNsZVBvb2wiLCJmbiIsInNpemUiLCJfZm4iLCJfY291bnQiLCJfZGF0YSIsIkFycmF5IiwiaSIsInJlc2V0IiwicmVzaXplIiwibGVuZ3RoIiwiYWRkIiwicmVtb3ZlIiwiaWR4IiwibGFzdCIsInRtcCIsInNvcnQiLCJjbXAiLCJjYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7O0lBSXFCQTtBQUNuQix1QkFBWUMsRUFBWixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDcEIsU0FBS0MsR0FBTCxHQUFXRixFQUFYO0FBQ0EsU0FBS0csTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBSUMsS0FBSixDQUFVSixJQUFWLENBQWI7O0FBRUEsU0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTCxJQUFwQixFQUEwQixFQUFFSyxDQUE1QixFQUErQjtBQUM3QixXQUFLRixLQUFMLENBQVdFLENBQVgsSUFBZ0JOLEVBQUUsRUFBbEI7QUFDRDtBQUNGOzs7O1NBVURPLFFBQUEsaUJBQVE7QUFDTixTQUFLSixNQUFMLEdBQWMsQ0FBZDtBQUNEOztTQUVESyxTQUFBLGdCQUFPUCxJQUFQLEVBQWE7QUFDWCxRQUFJQSxJQUFJLEdBQUcsS0FBS0csS0FBTCxDQUFXSyxNQUF0QixFQUE4QjtBQUM1QixXQUFLLElBQUlILENBQUMsR0FBRyxLQUFLRixLQUFMLENBQVdLLE1BQXhCLEVBQWdDSCxDQUFDLEdBQUdMLElBQXBDLEVBQTBDLEVBQUVLLENBQTVDLEVBQStDO0FBQzdDLGFBQUtGLEtBQUwsQ0FBV0UsQ0FBWCxJQUFnQixLQUFLSixHQUFMLEVBQWhCO0FBQ0Q7QUFDRjtBQUNGOztTQUVEUSxNQUFBLGVBQU07QUFDSixRQUFJLEtBQUtQLE1BQUwsSUFBZSxLQUFLQyxLQUFMLENBQVdLLE1BQTlCLEVBQXNDO0FBQ3BDLFdBQUtELE1BQUwsQ0FBWSxLQUFLSixLQUFMLENBQVdLLE1BQVgsR0FBb0IsQ0FBaEM7QUFDRDs7QUFFRCxXQUFPLEtBQUtMLEtBQUwsQ0FBVyxLQUFLRCxNQUFMLEVBQVgsQ0FBUDtBQUNEOztTQUVEUSxTQUFBLGdCQUFPQyxHQUFQLEVBQVk7QUFDVixRQUFJQSxHQUFHLElBQUksS0FBS1QsTUFBaEIsRUFBd0I7QUFDdEI7QUFDRDs7QUFFRCxRQUFJVSxJQUFJLEdBQUcsS0FBS1YsTUFBTCxHQUFjLENBQXpCO0FBQ0EsUUFBSVcsR0FBRyxHQUFHLEtBQUtWLEtBQUwsQ0FBV1EsR0FBWCxDQUFWO0FBQ0EsU0FBS1IsS0FBTCxDQUFXUSxHQUFYLElBQWtCLEtBQUtSLEtBQUwsQ0FBV1MsSUFBWCxDQUFsQjtBQUNBLFNBQUtULEtBQUwsQ0FBV1MsSUFBWCxJQUFtQkMsR0FBbkI7QUFDQSxTQUFLWCxNQUFMLElBQWUsQ0FBZjtBQUNEOztTQUVEWSxPQUFBLGNBQUtDLEdBQUwsRUFBVTtBQUNSLFdBQU8seUJBQUssS0FBS1osS0FBVixFQUFpQixDQUFqQixFQUFvQixLQUFLRCxNQUF6QixFQUFpQ2EsR0FBakMsQ0FBUDtBQUNEOzs7O3dCQTFDWTtBQUNYLGFBQU8sS0FBS2IsTUFBWjtBQUNEOzs7d0JBRVU7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRDs7Ozs7OztBQXVDSGEsRUFBRSxDQUFDbEIsV0FBSCxHQUFpQkEsV0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc29ydCBmcm9tICcuL3RpbXNvcnQnO1xuXG4vKipcbiAqIFJlY3ljbGUgUG9vbFxuICogQGNsYXNzIFJlY3ljbGVQb29sXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY3ljbGVQb29sIHtcbiAgY29uc3RydWN0b3IoZm4sIHNpemUpIHtcbiAgICB0aGlzLl9mbiA9IGZuO1xuICAgIHRoaXMuX2NvdW50ID0gMDtcbiAgICB0aGlzLl9kYXRhID0gbmV3IEFycmF5KHNpemUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoaXMuX2RhdGFbaV0gPSBmbigpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvdW50O1xuICB9XG5cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9jb3VudCA9IDA7XG4gIH1cblxuICByZXNpemUoc2l6ZSkge1xuICAgIGlmIChzaXplID4gdGhpcy5fZGF0YS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLl9kYXRhLmxlbmd0aDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgICB0aGlzLl9kYXRhW2ldID0gdGhpcy5fZm4oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGQoKSB7XG4gICAgaWYgKHRoaXMuX2NvdW50ID49IHRoaXMuX2RhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLnJlc2l6ZSh0aGlzLl9kYXRhLmxlbmd0aCAqIDIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9kYXRhW3RoaXMuX2NvdW50KytdO1xuICB9XG5cbiAgcmVtb3ZlKGlkeCkge1xuICAgIGlmIChpZHggPj0gdGhpcy5fY291bnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbGFzdCA9IHRoaXMuX2NvdW50IC0gMTtcbiAgICBsZXQgdG1wID0gdGhpcy5fZGF0YVtpZHhdO1xuICAgIHRoaXMuX2RhdGFbaWR4XSA9IHRoaXMuX2RhdGFbbGFzdF07XG4gICAgdGhpcy5fZGF0YVtsYXN0XSA9IHRtcDtcbiAgICB0aGlzLl9jb3VudCAtPSAxO1xuICB9XG5cbiAgc29ydChjbXApIHtcbiAgICByZXR1cm4gc29ydCh0aGlzLl9kYXRhLCAwLCB0aGlzLl9jb3VudCwgY21wKTtcbiAgfVxufVxuXG5jYy5SZWN5Y2xlUG9vbCA9IFJlY3ljbGVQb29sOyJdLCJzb3VyY2VSb290IjoiLyJ9