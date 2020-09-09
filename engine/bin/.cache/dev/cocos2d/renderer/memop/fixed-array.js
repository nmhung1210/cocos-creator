
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/fixed-array.js';
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

var FixedArray = /*#__PURE__*/function () {
  function FixedArray(size) {
    this._count = 0;
    this._data = new Array(size);
  }

  var _proto = FixedArray.prototype;

  _proto._resize = function _resize(size) {
    if (size > this._data.length) {
      for (var i = this._data.length; i < size; ++i) {
        this._data[i] = undefined;
      }
    }
  };

  _proto.reset = function reset() {
    for (var i = 0; i < this._count; ++i) {
      this._data[i] = undefined;
    }

    this._count = 0;
  };

  _proto.push = function push(val) {
    if (this._count >= this._data.length) {
      this._resize(this._data.length * 2);
    }

    this._data[this._count] = val;
    ++this._count;
  };

  _proto.pop = function pop() {
    --this._count;

    if (this._count < 0) {
      this._count = 0;
    }

    var ret = this._data[this._count];
    this._data[this._count] = undefined;
    return ret;
  };

  _proto.fastRemove = function fastRemove(idx) {
    if (idx >= this._count || idx < 0) {
      return;
    }

    var last = this._count - 1;
    this._data[idx] = this._data[last];
    this._data[last] = undefined;
    this._count -= 1;
  };

  _proto.indexOf = function indexOf(val) {
    return this._data.indexOf(val);
  };

  _proto.sort = function sort(cmp) {
    return (0, _timsort["default"])(this._data, 0, this._count, cmp);
  };

  _createClass(FixedArray, [{
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

  return FixedArray;
}();

exports["default"] = FixedArray;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9maXhlZC1hcnJheS5qcyJdLCJuYW1lcyI6WyJGaXhlZEFycmF5Iiwic2l6ZSIsIl9jb3VudCIsIl9kYXRhIiwiQXJyYXkiLCJfcmVzaXplIiwibGVuZ3RoIiwiaSIsInVuZGVmaW5lZCIsInJlc2V0IiwicHVzaCIsInZhbCIsInBvcCIsInJldCIsImZhc3RSZW1vdmUiLCJpZHgiLCJsYXN0IiwiaW5kZXhPZiIsInNvcnQiLCJjbXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUJBO0FBQ25CLHNCQUFZQyxJQUFaLEVBQWtCO0FBQ2hCLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLElBQUlDLEtBQUosQ0FBVUgsSUFBVixDQUFiO0FBQ0Q7Ozs7U0FFREksVUFBQSxpQkFBUUosSUFBUixFQUFjO0FBQ1osUUFBSUEsSUFBSSxHQUFHLEtBQUtFLEtBQUwsQ0FBV0csTUFBdEIsRUFBOEI7QUFDNUIsV0FBSyxJQUFJQyxDQUFDLEdBQUcsS0FBS0osS0FBTCxDQUFXRyxNQUF4QixFQUFnQ0MsQ0FBQyxHQUFHTixJQUFwQyxFQUEwQyxFQUFFTSxDQUE1QyxFQUErQztBQUM3QyxhQUFLSixLQUFMLENBQVdJLENBQVgsSUFBZ0JDLFNBQWhCO0FBQ0Q7QUFDRjtBQUNGOztTQVVEQyxRQUFBLGlCQUFRO0FBQ04sU0FBSyxJQUFJRixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtMLE1BQXpCLEVBQWlDLEVBQUVLLENBQW5DLEVBQXNDO0FBQ3BDLFdBQUtKLEtBQUwsQ0FBV0ksQ0FBWCxJQUFnQkMsU0FBaEI7QUFDRDs7QUFFRCxTQUFLTixNQUFMLEdBQWMsQ0FBZDtBQUNEOztTQUVEUSxPQUFBLGNBQUtDLEdBQUwsRUFBVTtBQUNSLFFBQUksS0FBS1QsTUFBTCxJQUFlLEtBQUtDLEtBQUwsQ0FBV0csTUFBOUIsRUFBc0M7QUFDcEMsV0FBS0QsT0FBTCxDQUFhLEtBQUtGLEtBQUwsQ0FBV0csTUFBWCxHQUFvQixDQUFqQztBQUNEOztBQUVELFNBQUtILEtBQUwsQ0FBVyxLQUFLRCxNQUFoQixJQUEwQlMsR0FBMUI7QUFDQSxNQUFFLEtBQUtULE1BQVA7QUFDRDs7U0FFRFUsTUFBQSxlQUFNO0FBQ0osTUFBRSxLQUFLVixNQUFQOztBQUVBLFFBQUksS0FBS0EsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25CLFdBQUtBLE1BQUwsR0FBYyxDQUFkO0FBQ0Q7O0FBRUQsUUFBSVcsR0FBRyxHQUFHLEtBQUtWLEtBQUwsQ0FBVyxLQUFLRCxNQUFoQixDQUFWO0FBQ0EsU0FBS0MsS0FBTCxDQUFXLEtBQUtELE1BQWhCLElBQTBCTSxTQUExQjtBQUVBLFdBQU9LLEdBQVA7QUFDRDs7U0FFREMsYUFBQSxvQkFBV0MsR0FBWCxFQUFnQjtBQUNkLFFBQUlBLEdBQUcsSUFBSSxLQUFLYixNQUFaLElBQXNCYSxHQUFHLEdBQUcsQ0FBaEMsRUFBbUM7QUFDakM7QUFDRDs7QUFFRCxRQUFJQyxJQUFJLEdBQUcsS0FBS2QsTUFBTCxHQUFjLENBQXpCO0FBQ0EsU0FBS0MsS0FBTCxDQUFXWSxHQUFYLElBQWtCLEtBQUtaLEtBQUwsQ0FBV2EsSUFBWCxDQUFsQjtBQUNBLFNBQUtiLEtBQUwsQ0FBV2EsSUFBWCxJQUFtQlIsU0FBbkI7QUFDQSxTQUFLTixNQUFMLElBQWUsQ0FBZjtBQUNEOztTQUVEZSxVQUFBLGlCQUFRTixHQUFSLEVBQWE7QUFDWCxXQUFPLEtBQUtSLEtBQUwsQ0FBV2MsT0FBWCxDQUFtQk4sR0FBbkIsQ0FBUDtBQUNEOztTQUVETyxPQUFBLGNBQUtDLEdBQUwsRUFBVTtBQUNSLFdBQU8seUJBQUssS0FBS2hCLEtBQVYsRUFBaUIsQ0FBakIsRUFBb0IsS0FBS0QsTUFBekIsRUFBaUNpQixHQUFqQyxDQUFQO0FBQ0Q7Ozs7d0JBdkRZO0FBQ1gsYUFBTyxLQUFLakIsTUFBWjtBQUNEOzs7d0JBRVU7QUFDVCxhQUFPLEtBQUtDLEtBQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzb3J0IGZyb20gJy4vdGltc29ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpeGVkQXJyYXkge1xuICBjb25zdHJ1Y3RvcihzaXplKSB7XG4gICAgdGhpcy5fY291bnQgPSAwO1xuICAgIHRoaXMuX2RhdGEgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gIH1cblxuICBfcmVzaXplKHNpemUpIHtcbiAgICBpZiAoc2l6ZSA+IHRoaXMuX2RhdGEubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5fZGF0YS5sZW5ndGg7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgICAgdGhpcy5fZGF0YVtpXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudDtcbiAgfVxuXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jb3VudDsgKytpKSB7XG4gICAgICB0aGlzLl9kYXRhW2ldID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMuX2NvdW50ID0gMDtcbiAgfVxuXG4gIHB1c2godmFsKSB7XG4gICAgaWYgKHRoaXMuX2NvdW50ID49IHRoaXMuX2RhdGEubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9yZXNpemUodGhpcy5fZGF0YS5sZW5ndGggKiAyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kYXRhW3RoaXMuX2NvdW50XSA9IHZhbDtcbiAgICArK3RoaXMuX2NvdW50O1xuICB9XG5cbiAgcG9wKCkge1xuICAgIC0tdGhpcy5fY291bnQ7XG5cbiAgICBpZiAodGhpcy5fY291bnQgPCAwKSB7XG4gICAgICB0aGlzLl9jb3VudCA9IDA7XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IHRoaXMuX2RhdGFbdGhpcy5fY291bnRdO1xuICAgIHRoaXMuX2RhdGFbdGhpcy5fY291bnRdID0gdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIGZhc3RSZW1vdmUoaWR4KSB7XG4gICAgaWYgKGlkeCA+PSB0aGlzLl9jb3VudCB8fCBpZHggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGxhc3QgPSB0aGlzLl9jb3VudCAtIDE7XG4gICAgdGhpcy5fZGF0YVtpZHhdID0gdGhpcy5fZGF0YVtsYXN0XTtcbiAgICB0aGlzLl9kYXRhW2xhc3RdID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2NvdW50IC09IDE7XG4gIH1cblxuICBpbmRleE9mKHZhbCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmluZGV4T2YodmFsKTtcbiAgfVxuXG4gIHNvcnQoY21wKSB7XG4gICAgcmV0dXJuIHNvcnQodGhpcy5fZGF0YSwgMCwgdGhpcy5fY291bnQsIGNtcCk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==