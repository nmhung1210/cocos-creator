
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/particle/utils.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

// SameValue algorithm
if (!Object.is) {
  Object.is = function (x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}
/**
 * !#en
 * Helper class for ES5 Map.
 * !#zh
 * ES5 Map 辅助类。
 * @class MapUtils
 */


var MapUtils = /*#__PURE__*/function () {
  function MapUtils(data) {
    this.datas = [];
    !data && (data = []);
    this.datas = [];
    var that = this;
    data.forEach(function (item) {
      if (!that.has(item[0])) {
        that.datas.push({
          key: item[0],
          value: item[1]
        });
      }
    });
  }

  var _proto = MapUtils.prototype;

  _proto.size = function size() {
    return this.datas.length;
  };

  _proto.set = function set(key, value) {
    this["delete"](key);
    this.datas.push({
      key: key,
      value: value
    });
  };

  _proto.get = function get(key) {
    var value = undefined;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        value = datas[i].value;
        break;
      }
    }

    return value;
  };

  _proto.has = function has(key) {
    var res = false;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        res = true;
        break;
      }
    }

    return res;
  };

  _proto.clear = function clear() {
    this.datas.length = 0;
  };

  _proto["delete"] = function _delete(key) {
    var res = false;
    var datas = this.datas;

    for (var i = 0, len = datas.length; i < len; i++) {
      if (Object.is(key, datas[i].key)) {
        datas.splice(i, 1);
        res = true;
        break;
      }
    }

    return res;
  };

  _proto.keys = function keys() {
    var datas = this.datas;
    var keys = [];

    for (var i = 0, len = datas.length; i < len; i++) {
      keys.push(datas[i].key);
    }

    return keys;
  };

  _proto.values = function values() {
    var index = 0;
    var datas = this.datas;
    return {
      next: function next() {
        if (datas.length === 0 || datas[index] === undefined) {
          return {
            value: undefined,
            done: true
          };
        }

        return {
          value: datas[index++].value,
          done: false
        };
      }
    };
  };

  return MapUtils;
}();

exports["default"] = MapUtils;
;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3BhcnRpY2xlL3V0aWxzLnRzIl0sIm5hbWVzIjpbIk9iamVjdCIsImlzIiwieCIsInkiLCJNYXBVdGlscyIsImRhdGEiLCJkYXRhcyIsInRoYXQiLCJmb3JFYWNoIiwiaXRlbSIsImhhcyIsInB1c2giLCJrZXkiLCJ2YWx1ZSIsInNpemUiLCJsZW5ndGgiLCJzZXQiLCJnZXQiLCJ1bmRlZmluZWQiLCJpIiwibGVuIiwicmVzIiwiY2xlYXIiLCJzcGxpY2UiLCJrZXlzIiwidmFsdWVzIiwiaW5kZXgiLCJuZXh0IiwiZG9uZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBSSxDQUFDQSxNQUFNLENBQUNDLEVBQVosRUFBZ0I7QUFDWkQsRUFBQUEsTUFBTSxDQUFDQyxFQUFQLEdBQVksVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDdkIsUUFBSUQsQ0FBQyxLQUFLQyxDQUFWLEVBQWE7QUFDVCxhQUFPRCxDQUFDLEtBQUssQ0FBTixJQUFXLElBQUlBLENBQUosS0FBVSxJQUFJQyxDQUFoQztBQUNILEtBRkQsTUFFTztBQUNILGFBQU9ELENBQUMsS0FBS0EsQ0FBTixJQUFXQyxDQUFDLEtBQUtBLENBQXhCO0FBQ0g7QUFDSixHQU5EO0FBT0g7QUFFRDs7Ozs7Ozs7O0lBT3FCQztBQUdqQixvQkFBYUMsSUFBYixFQUFtQjtBQUFBLFNBRm5CQyxLQUVtQixHQUZYLEVBRVc7QUFDZixLQUFDRCxJQUFELEtBQVVBLElBQUksR0FBRyxFQUFqQjtBQUVBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBRUEsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFFQUYsSUFBQUEsSUFBSSxDQUFDRyxPQUFMLENBQWEsVUFBVUMsSUFBVixFQUFnQjtBQUN6QixVQUFJLENBQUNGLElBQUksQ0FBQ0csR0FBTCxDQUFTRCxJQUFJLENBQUMsQ0FBRCxDQUFiLENBQUwsRUFBd0I7QUFDcEJGLFFBQUFBLElBQUks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Q2EsQ0FBRCxDQUFMLENBQVNQLEdBQW5CO0FBQ0g7O0FBRUQsV0FBT1ksSUFBUDtBQUNIOztTQUVEQyxTQUFBLGtCQUFVO0FBQ04sUUFBSUMsS0FBSyxHQUFHLENBQVo7QUFDQSxRQUFJcEIsS0FBSyxHQUFHLEtBQUtBLEtBQWpCO0FBQ0EsV0FBTztBQUNIcUIsTUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsWUFBSXJCLEtBQUssQ0FBQ1MsTUFBTixLQUFpQixDQUFqQixJQUFzQlQsS0FBSyxDQUFDb0IsS0FBRCxDQUFMLEtBQWlCUixTQUEzQyxFQUFzRDtBQUNsRCxpQkFBTztBQUNITCxZQUFBQSxLQUFLLEVBQUVLLFNBREo7QUFFSFUsWUFBQUEsSUFBSSxFQUFFO0FBRkgsV0FBUDtBQUlIOztBQUNELGVBQU87QUFDSGYsVUFBQUEsS0FBSyxFQUFFUCxLQUFLLENBQUNvQixLQUFLLEVBQU4sQ0FBTCxDQUFlYixLQURuQjtBQUVIZSxVQUFBQSxJQUFJLEVBQUU7QUFGSCxTQUFQO0FBSUg7QUFaRSxLQUFQO0FBY0g7Ozs7OztBQUNKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuaWYgKCFPYmplY3QuaXMpIHtcbiAgICBPYmplY3QuaXMgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAgICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLyoqXG4gKiAhI2VuXG4gKiBIZWxwZXIgY2xhc3MgZm9yIEVTNSBNYXAuXG4gKiAhI3poXG4gKiBFUzUgTWFwIOi+heWKqeexu+OAglxuICogQGNsYXNzIE1hcFV0aWxzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcFV0aWxzIHtcbiAgICBkYXRhcyA9IFtdO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgICFkYXRhICYmIChkYXRhID0gW10pO1xuXG4gICAgICAgIHRoaXMuZGF0YXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghdGhhdC5oYXMoaXRlbVswXSkpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmRhdGFzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBrZXk6IGl0ZW1bMF0sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtWzFdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNpemUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgc2V0IChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgICAgIHRoaXMuZGF0YXMucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgKGtleSkge1xuICAgICAgICBsZXQgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBkYXRhcyA9IHRoaXMuZGF0YXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5pcyhrZXksIGRhdGFzW2ldLmtleSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFzW2ldLnZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBoYXMgKGtleSkge1xuICAgICAgICBsZXQgcmVzID0gZmFsc2U7XG4gICAgICAgIGxldCBkYXRhcyA9IHRoaXMuZGF0YXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5pcyhrZXksIGRhdGFzW2ldLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLmRhdGFzLmxlbmd0aCA9IDA7XG4gICAgfVxuXG4gICAgZGVsZXRlIChrZXkpIHtcbiAgICAgICAgbGV0IHJlcyA9IGZhbHNlO1xuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmRhdGFzO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZGF0YXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QuaXMoa2V5LCBkYXRhc1tpXS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICBrZXlzICgpIHtcbiAgICAgICAgbGV0IGRhdGFzID0gdGhpcy5kYXRhcztcbiAgICAgICAgbGV0IGtleXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGRhdGFzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBrZXlzLnB1c2goZGF0YXNbaV0ua2V5KTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICByZXR1cm4ga2V5cztcbiAgICB9XG5cbiAgICB2YWx1ZXMgKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgZGF0YXMgPSB0aGlzLmRhdGFzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhcy5sZW5ndGggPT09IDAgfHwgZGF0YXNbaW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBkYXRhc1tpbmRleCsrXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG59OyJdLCJzb3VyY2VSb290IjoiLyJ9