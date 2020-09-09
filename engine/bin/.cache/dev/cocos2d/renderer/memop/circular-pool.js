
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/circular-pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var CircularPool = /*#__PURE__*/function () {
  function CircularPool(fn, size) {
    this._cursor = 0;
    this._data = new Array(size);

    for (var i = 0; i < size; ++i) {
      this._data[i] = fn();
    }
  }

  var _proto = CircularPool.prototype;

  _proto.request = function request() {
    var item = this._data[this._cursor];
    this._cursor = (this._cursor + 1) % this._data.length;
    return item;
  };

  return CircularPool;
}();

exports["default"] = CircularPool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9jaXJjdWxhci1wb29sLmpzIl0sIm5hbWVzIjpbIkNpcmN1bGFyUG9vbCIsImZuIiwic2l6ZSIsIl9jdXJzb3IiLCJfZGF0YSIsIkFycmF5IiwiaSIsInJlcXVlc3QiLCJpdGVtIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQTtBQUNuQix3QkFBWUMsRUFBWixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDcEIsU0FBS0MsT0FBTCxHQUFlLENBQWY7QUFDQSxTQUFLQyxLQUFMLEdBQWEsSUFBSUMsS0FBSixDQUFVSCxJQUFWLENBQWI7O0FBRUEsU0FBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixJQUFwQixFQUEwQixFQUFFSSxDQUE1QixFQUErQjtBQUM3QixXQUFLRixLQUFMLENBQVdFLENBQVgsSUFBZ0JMLEVBQUUsRUFBbEI7QUFDRDtBQUNGOzs7O1NBRURNLFVBQUEsbUJBQVU7QUFDUixRQUFJQyxJQUFJLEdBQUcsS0FBS0osS0FBTCxDQUFXLEtBQUtELE9BQWhCLENBQVg7QUFDQSxTQUFLQSxPQUFMLEdBQWUsQ0FBQyxLQUFLQSxPQUFMLEdBQWUsQ0FBaEIsSUFBcUIsS0FBS0MsS0FBTCxDQUFXSyxNQUEvQztBQUVBLFdBQU9ELElBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmN1bGFyUG9vbCB7XG4gIGNvbnN0cnVjdG9yKGZuLCBzaXplKSB7XG4gICAgdGhpcy5fY3Vyc29yID0gMDtcbiAgICB0aGlzLl9kYXRhID0gbmV3IEFycmF5KHNpemUpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoaXMuX2RhdGFbaV0gPSBmbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3QoKSB7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLl9kYXRhW3RoaXMuX2N1cnNvcl07XG4gICAgdGhpcy5fY3Vyc29yID0gKHRoaXMuX2N1cnNvciArIDEpICUgdGhpcy5fZGF0YS5sZW5ndGg7XG5cbiAgICByZXR1cm4gaXRlbTtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiLyJ9