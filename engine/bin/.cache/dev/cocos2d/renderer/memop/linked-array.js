
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/linked-array.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _pool = _interopRequireDefault(require("./pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// NOTE: you must have `_prev` and `_next` field in the object returns by `fn`
var LinkedArray = /*#__PURE__*/function () {
  function LinkedArray(fn, size) {
    this._fn = fn;
    this._count = 0;
    this._head = null;
    this._tail = null;
    this._pool = new _pool["default"](fn, size);
  }

  var _proto = LinkedArray.prototype;

  _proto.add = function add() {
    var node = this._pool.alloc();

    if (!this._tail) {
      this._head = node;
    } else {
      this._tail._next = node;
      node._prev = this._tail;
    }

    this._tail = node;
    this._count += 1;
    return node;
  };

  _proto.remove = function remove(node) {
    if (node._prev) {
      node._prev._next = node._next;
    } else {
      this._head = node._next;
    }

    if (node._next) {
      node._next._prev = node._prev;
    } else {
      this._tail = node._prev;
    }

    node._next = null;
    node._prev = null;

    this._pool.free(node);

    this._count -= 1;
  };

  _proto.forEach = function forEach(fn, binder) {
    var cursor = this._head;

    if (!cursor) {
      return;
    }

    if (binder) {
      fn = fn.bind(binder);
    }

    var idx = 0;
    var next = cursor;

    while (cursor) {
      next = cursor._next;
      fn(cursor, idx, this);
      cursor = next;
      ++idx;
    }
  };

  _createClass(LinkedArray, [{
    key: "head",
    get: function get() {
      return this._head;
    }
  }, {
    key: "tail",
    get: function get() {
      return this._tail;
    }
  }, {
    key: "length",
    get: function get() {
      return this._count;
    }
  }]);

  return LinkedArray;
}();

exports["default"] = LinkedArray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9saW5rZWQtYXJyYXkuanMiXSwibmFtZXMiOlsiTGlua2VkQXJyYXkiLCJmbiIsInNpemUiLCJfZm4iLCJfY291bnQiLCJfaGVhZCIsIl90YWlsIiwiX3Bvb2wiLCJQb29sIiwiYWRkIiwibm9kZSIsImFsbG9jIiwiX25leHQiLCJfcHJldiIsInJlbW92ZSIsImZyZWUiLCJmb3JFYWNoIiwiYmluZGVyIiwiY3Vyc29yIiwiYmluZCIsImlkeCIsIm5leHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQTtJQUVxQkE7QUFDbkIsdUJBQVlDLEVBQVosRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3BCLFNBQUtDLEdBQUwsR0FBV0YsRUFBWDtBQUNBLFNBQUtHLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUVBLFNBQUtDLEtBQUwsR0FBYSxJQUFJQyxnQkFBSixDQUFTUCxFQUFULEVBQWFDLElBQWIsQ0FBYjtBQUNEOzs7O1NBY0RPLE1BQUEsZUFBTTtBQUNKLFFBQUlDLElBQUksR0FBRyxLQUFLSCxLQUFMLENBQVdJLEtBQVgsRUFBWDs7QUFFQSxRQUFJLENBQUMsS0FBS0wsS0FBVixFQUFpQjtBQUNmLFdBQUtELEtBQUwsR0FBYUssSUFBYjtBQUNELEtBRkQsTUFFTztBQUNMLFdBQUtKLEtBQUwsQ0FBV00sS0FBWCxHQUFtQkYsSUFBbkI7QUFDQUEsTUFBQUEsSUFBSSxDQUFDRyxLQUFMLEdBQWEsS0FBS1AsS0FBbEI7QUFDRDs7QUFDRCxTQUFLQSxLQUFMLEdBQWFJLElBQWI7QUFDQSxTQUFLTixNQUFMLElBQWUsQ0FBZjtBQUVBLFdBQU9NLElBQVA7QUFDRDs7U0FFREksU0FBQSxnQkFBT0osSUFBUCxFQUFhO0FBQ1gsUUFBSUEsSUFBSSxDQUFDRyxLQUFULEVBQWdCO0FBQ2RILE1BQUFBLElBQUksQ0FBQ0csS0FBTCxDQUFXRCxLQUFYLEdBQW1CRixJQUFJLENBQUNFLEtBQXhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS1AsS0FBTCxHQUFhSyxJQUFJLENBQUNFLEtBQWxCO0FBQ0Q7O0FBRUQsUUFBSUYsSUFBSSxDQUFDRSxLQUFULEVBQWdCO0FBQ2RGLE1BQUFBLElBQUksQ0FBQ0UsS0FBTCxDQUFXQyxLQUFYLEdBQW1CSCxJQUFJLENBQUNHLEtBQXhCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS1AsS0FBTCxHQUFhSSxJQUFJLENBQUNHLEtBQWxCO0FBQ0Q7O0FBRURILElBQUFBLElBQUksQ0FBQ0UsS0FBTCxHQUFhLElBQWI7QUFDQUYsSUFBQUEsSUFBSSxDQUFDRyxLQUFMLEdBQWEsSUFBYjs7QUFDQSxTQUFLTixLQUFMLENBQVdRLElBQVgsQ0FBZ0JMLElBQWhCOztBQUNBLFNBQUtOLE1BQUwsSUFBZSxDQUFmO0FBQ0Q7O1NBRURZLFVBQUEsaUJBQVFmLEVBQVIsRUFBWWdCLE1BQVosRUFBb0I7QUFDbEIsUUFBSUMsTUFBTSxHQUFHLEtBQUtiLEtBQWxCOztBQUNBLFFBQUksQ0FBQ2EsTUFBTCxFQUFhO0FBQ1g7QUFDRDs7QUFFRCxRQUFJRCxNQUFKLEVBQVk7QUFDVmhCLE1BQUFBLEVBQUUsR0FBR0EsRUFBRSxDQUFDa0IsSUFBSCxDQUFRRixNQUFSLENBQUw7QUFDRDs7QUFFRCxRQUFJRyxHQUFHLEdBQUcsQ0FBVjtBQUNBLFFBQUlDLElBQUksR0FBR0gsTUFBWDs7QUFFQSxXQUFPQSxNQUFQLEVBQWU7QUFDYkcsTUFBQUEsSUFBSSxHQUFHSCxNQUFNLENBQUNOLEtBQWQ7QUFDQVgsTUFBQUEsRUFBRSxDQUFDaUIsTUFBRCxFQUFTRSxHQUFULEVBQWMsSUFBZCxDQUFGO0FBRUFGLE1BQUFBLE1BQU0sR0FBR0csSUFBVDtBQUNBLFFBQUVELEdBQUY7QUFDRDtBQUNGOzs7O3dCQWxFVTtBQUNULGFBQU8sS0FBS2YsS0FBWjtBQUNEOzs7d0JBRVU7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRDs7O3dCQUVZO0FBQ1gsYUFBTyxLQUFLRixNQUFaO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9vbCBmcm9tICcuL3Bvb2wnO1xuXG4vLyBOT1RFOiB5b3UgbXVzdCBoYXZlIGBfcHJldmAgYW5kIGBfbmV4dGAgZmllbGQgaW4gdGhlIG9iamVjdCByZXR1cm5zIGJ5IGBmbmBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua2VkQXJyYXkge1xuICBjb25zdHJ1Y3Rvcihmbiwgc2l6ZSkge1xuICAgIHRoaXMuX2ZuID0gZm47XG4gICAgdGhpcy5fY291bnQgPSAwO1xuICAgIHRoaXMuX2hlYWQgPSBudWxsO1xuICAgIHRoaXMuX3RhaWwgPSBudWxsO1xuXG4gICAgdGhpcy5fcG9vbCA9IG5ldyBQb29sKGZuLCBzaXplKTtcbiAgfVxuXG4gIGdldCBoZWFkKCkge1xuICAgIHJldHVybiB0aGlzLl9oZWFkO1xuICB9XG5cbiAgZ2V0IHRhaWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RhaWw7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIGFkZCgpIHtcbiAgICBsZXQgbm9kZSA9IHRoaXMuX3Bvb2wuYWxsb2MoKTtcblxuICAgIGlmICghdGhpcy5fdGFpbCkge1xuICAgICAgdGhpcy5faGVhZCA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RhaWwuX25leHQgPSBub2RlO1xuICAgICAgbm9kZS5fcHJldiA9IHRoaXMuX3RhaWw7XG4gICAgfVxuICAgIHRoaXMuX3RhaWwgPSBub2RlO1xuICAgIHRoaXMuX2NvdW50ICs9IDE7XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJlbW92ZShub2RlKSB7XG4gICAgaWYgKG5vZGUuX3ByZXYpIHtcbiAgICAgIG5vZGUuX3ByZXYuX25leHQgPSBub2RlLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9oZWFkID0gbm9kZS5fbmV4dDtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5fbmV4dCkge1xuICAgICAgbm9kZS5fbmV4dC5fcHJldiA9IG5vZGUuX3ByZXY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RhaWwgPSBub2RlLl9wcmV2O1xuICAgIH1cblxuICAgIG5vZGUuX25leHQgPSBudWxsO1xuICAgIG5vZGUuX3ByZXYgPSBudWxsO1xuICAgIHRoaXMuX3Bvb2wuZnJlZShub2RlKTtcbiAgICB0aGlzLl9jb3VudCAtPSAxO1xuICB9XG5cbiAgZm9yRWFjaChmbiwgYmluZGVyKSB7XG4gICAgbGV0IGN1cnNvciA9IHRoaXMuX2hlYWQ7XG4gICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoYmluZGVyKSB7XG4gICAgICBmbiA9IGZuLmJpbmQoYmluZGVyKTtcbiAgICB9XG5cbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgbmV4dCA9IGN1cnNvcjtcblxuICAgIHdoaWxlIChjdXJzb3IpIHtcbiAgICAgIG5leHQgPSBjdXJzb3IuX25leHQ7XG4gICAgICBmbihjdXJzb3IsIGlkeCwgdGhpcyk7XG5cbiAgICAgIGN1cnNvciA9IG5leHQ7XG4gICAgICArK2lkeDtcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==