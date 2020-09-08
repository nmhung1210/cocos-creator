
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var Pool = /*#__PURE__*/function () {
  function Pool(fn, size) {
    this._fn = fn;
    this._idx = size - 1;
    this._frees = new Array(size);

    for (var i = 0; i < size; ++i) {
      this._frees[i] = fn();
    }
  }

  var _proto = Pool.prototype;

  _proto._expand = function _expand(size) {
    var old = this._frees;
    this._frees = new Array(size);
    var len = size - old.length;

    for (var i = 0; i < len; ++i) {
      this._frees[i] = this._fn();
    }

    for (var _i = len, j = 0; _i < size; ++_i, ++j) {
      this._frees[_i] = old[j];
    }

    this._idx += len;
  };

  _proto.alloc = function alloc() {
    // create some more space (expand by 20%, minimum 1)
    if (this._idx < 0) {
      this._expand(Math.round(this._frees.length * 1.2) + 1);
    }

    var ret = this._frees[this._idx];
    this._frees[this._idx] = null;
    --this._idx;
    return ret;
  };

  _proto.free = function free(obj) {
    ++this._idx;
    this._frees[this._idx] = obj;
  }
  /**
   * 清除对象池。
   * @param fn 清除回调，对每个释放的对象调用一次。
   */
  ;

  _proto.clear = function clear(fn) {
    for (var i = 0; i <= this._idx; i++) {
      if (fn) {
        fn(this._frees[i]);
      }
    }

    this._frees.length = 0;
    this._idx = -1;
  };

  return Pool;
}();

exports["default"] = Pool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9wb29sLmpzIl0sIm5hbWVzIjpbIlBvb2wiLCJmbiIsInNpemUiLCJfZm4iLCJfaWR4IiwiX2ZyZWVzIiwiQXJyYXkiLCJpIiwiX2V4cGFuZCIsIm9sZCIsImxlbiIsImxlbmd0aCIsImoiLCJhbGxvYyIsIk1hdGgiLCJyb3VuZCIsInJldCIsImZyZWUiLCJvYmoiLCJjbGVhciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQkE7QUFDbkIsZ0JBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3BCLFNBQUtDLEdBQUwsR0FBV0YsRUFBWDtBQUNBLFNBQUtHLElBQUwsR0FBWUYsSUFBSSxHQUFHLENBQW5CO0FBQ0EsU0FBS0csTUFBTCxHQUFjLElBQUlDLEtBQUosQ0FBVUosSUFBVixDQUFkOztBQUVBLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0wsSUFBcEIsRUFBMEIsRUFBRUssQ0FBNUIsRUFBK0I7QUFDN0IsV0FBS0YsTUFBTCxDQUFZRSxDQUFaLElBQWlCTixFQUFFLEVBQW5CO0FBQ0Q7QUFDRjs7OztTQUVETyxVQUFBLGlCQUFRTixJQUFSLEVBQWM7QUFDWixRQUFJTyxHQUFHLEdBQUcsS0FBS0osTUFBZjtBQUNBLFNBQUtBLE1BQUwsR0FBYyxJQUFJQyxLQUFKLENBQVVKLElBQVYsQ0FBZDtBQUVBLFFBQUlRLEdBQUcsR0FBR1IsSUFBSSxHQUFHTyxHQUFHLENBQUNFLE1BQXJCOztBQUNBLFNBQUssSUFBSUosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0csR0FBcEIsRUFBeUIsRUFBRUgsQ0FBM0IsRUFBOEI7QUFDNUIsV0FBS0YsTUFBTCxDQUFZRSxDQUFaLElBQWlCLEtBQUtKLEdBQUwsRUFBakI7QUFDRDs7QUFFRCxTQUFLLElBQUlJLEVBQUMsR0FBR0csR0FBUixFQUFhRSxDQUFDLEdBQUcsQ0FBdEIsRUFBeUJMLEVBQUMsR0FBR0wsSUFBN0IsRUFBbUMsRUFBRUssRUFBRixFQUFLLEVBQUVLLENBQTFDLEVBQTZDO0FBQzNDLFdBQUtQLE1BQUwsQ0FBWUUsRUFBWixJQUFpQkUsR0FBRyxDQUFDRyxDQUFELENBQXBCO0FBQ0Q7O0FBRUQsU0FBS1IsSUFBTCxJQUFhTSxHQUFiO0FBQ0Q7O1NBRURHLFFBQUEsaUJBQVE7QUFDTjtBQUNBLFFBQUksS0FBS1QsSUFBTCxHQUFZLENBQWhCLEVBQW1CO0FBQ2pCLFdBQUtJLE9BQUwsQ0FBYU0sSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS1YsTUFBTCxDQUFZTSxNQUFaLEdBQXFCLEdBQWhDLElBQXVDLENBQXBEO0FBQ0Q7O0FBRUQsUUFBSUssR0FBRyxHQUFHLEtBQUtYLE1BQUwsQ0FBWSxLQUFLRCxJQUFqQixDQUFWO0FBQ0EsU0FBS0MsTUFBTCxDQUFZLEtBQUtELElBQWpCLElBQXlCLElBQXpCO0FBQ0EsTUFBRSxLQUFLQSxJQUFQO0FBRUEsV0FBT1ksR0FBUDtBQUNEOztTQUVEQyxPQUFBLGNBQUtDLEdBQUwsRUFBVTtBQUNSLE1BQUUsS0FBS2QsSUFBUDtBQUNBLFNBQUtDLE1BQUwsQ0FBWSxLQUFLRCxJQUFqQixJQUF5QmMsR0FBekI7QUFDRDtBQUVEOzs7Ozs7U0FJQUMsUUFBQSxlQUFPbEIsRUFBUCxFQUFXO0FBQ1QsU0FBSyxJQUFJTSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxJQUFJLEtBQUtILElBQTFCLEVBQWdDRyxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDLFVBQUlOLEVBQUosRUFBUTtBQUNKQSxRQUFBQSxFQUFFLENBQUMsS0FBS0ksTUFBTCxDQUFZRSxDQUFaLENBQUQsQ0FBRjtBQUNIO0FBQ0o7O0FBQ0QsU0FBS0YsTUFBTCxDQUFZTSxNQUFaLEdBQXFCLENBQXJCO0FBQ0EsU0FBS1AsSUFBTCxHQUFZLENBQUMsQ0FBYjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9vbCB7XG4gIGNvbnN0cnVjdG9yKGZuLCBzaXplKSB7XG4gICAgdGhpcy5fZm4gPSBmbjtcbiAgICB0aGlzLl9pZHggPSBzaXplIC0gMTtcbiAgICB0aGlzLl9mcmVlcyA9IG5ldyBBcnJheShzaXplKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGlzLl9mcmVlc1tpXSA9IGZuKCk7XG4gICAgfVxuICB9XG5cbiAgX2V4cGFuZChzaXplKSB7XG4gICAgbGV0IG9sZCA9IHRoaXMuX2ZyZWVzO1xuICAgIHRoaXMuX2ZyZWVzID0gbmV3IEFycmF5KHNpemUpO1xuXG4gICAgbGV0IGxlbiA9IHNpemUgLSBvbGQubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRoaXMuX2ZyZWVzW2ldID0gdGhpcy5fZm4oKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gbGVuLCBqID0gMDsgaSA8IHNpemU7ICsraSwgKytqKSB7XG4gICAgICB0aGlzLl9mcmVlc1tpXSA9IG9sZFtqXTtcbiAgICB9XG5cbiAgICB0aGlzLl9pZHggKz0gbGVuO1xuICB9XG5cbiAgYWxsb2MoKSB7XG4gICAgLy8gY3JlYXRlIHNvbWUgbW9yZSBzcGFjZSAoZXhwYW5kIGJ5IDIwJSwgbWluaW11bSAxKVxuICAgIGlmICh0aGlzLl9pZHggPCAwKSB7XG4gICAgICB0aGlzLl9leHBhbmQoTWF0aC5yb3VuZCh0aGlzLl9mcmVlcy5sZW5ndGggKiAxLjIpICsgMSk7XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IHRoaXMuX2ZyZWVzW3RoaXMuX2lkeF07XG4gICAgdGhpcy5fZnJlZXNbdGhpcy5faWR4XSA9IG51bGw7XG4gICAgLS10aGlzLl9pZHg7XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgZnJlZShvYmopIHtcbiAgICArK3RoaXMuX2lkeDtcbiAgICB0aGlzLl9mcmVlc1t0aGlzLl9pZHhdID0gb2JqO1xuICB9XG5cbiAgLyoqXG4gICAqIOa4hemZpOWvueixoeaxoOOAglxuICAgKiBAcGFyYW0gZm4g5riF6Zmk5Zue6LCD77yM5a+55q+P5Liq6YeK5pS+55qE5a+56LGh6LCD55So5LiA5qyh44CCXG4gICAqL1xuICBjbGVhciAoZm4pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSB0aGlzLl9pZHg7IGkrKykge1xuICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIGZuKHRoaXMuX2ZyZWVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9mcmVlcy5sZW5ndGggPSAwO1xuICAgIHRoaXMuX2lkeCA9IC0xO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=