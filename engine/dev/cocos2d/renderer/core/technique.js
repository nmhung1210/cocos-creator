
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/core/technique.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var Technique = /*#__PURE__*/function () {
  function Technique(name, passes) {
    this._name = name;
    this._passes = passes;
  }

  var _proto = Technique.prototype;

  _proto.clone = function clone() {
    var passes = [];

    for (var i = 0; i < this._passes.length; i++) {
      passes.push(this._passes[i].clone());
    }

    return new Technique(this._name, passes);
  };

  _createClass(Technique, [{
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "passes",
    get: function get() {
      return this._passes;
    }
  }]);

  return Technique;
}();

exports["default"] = Technique;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9jb3JlL3RlY2huaXF1ZS5qcyJdLCJuYW1lcyI6WyJUZWNobmlxdWUiLCJuYW1lIiwicGFzc2VzIiwiX25hbWUiLCJfcGFzc2VzIiwiY2xvbmUiLCJpIiwibGVuZ3RoIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVxQkE7QUFDbkIscUJBQVlDLElBQVosRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3hCLFNBQUtDLEtBQUwsR0FBYUYsSUFBYjtBQUNBLFNBQUtHLE9BQUwsR0FBZUYsTUFBZjtBQUNEOzs7O1NBVURHLFFBQUEsaUJBQVM7QUFDUCxRQUFJSCxNQUFNLEdBQUcsRUFBYjs7QUFDQSxTQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS0YsT0FBTCxDQUFhRyxNQUFqQyxFQUF5Q0QsQ0FBQyxFQUExQyxFQUE4QztBQUM1Q0osTUFBQUEsTUFBTSxDQUFDTSxJQUFQLENBQVksS0FBS0osT0FBTCxDQUFhRSxDQUFiLEVBQWdCRCxLQUFoQixFQUFaO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFJTCxTQUFKLENBQWMsS0FBS0csS0FBbkIsRUFBMEJELE1BQTFCLENBQVA7QUFDRDs7Ozt3QkFkVztBQUNWLGFBQU8sS0FBS0MsS0FBWjtBQUNEOzs7d0JBRVk7QUFDWCxhQUFPLEtBQUtDLE9BQVo7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWNobmlxdWUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBwYXNzZXMpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9wYXNzZXMgPSBwYXNzZXM7XG4gIH1cblxuICBnZXQgbmFtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cblxuICBnZXQgcGFzc2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXNzZXM7XG4gIH1cblxuICBjbG9uZSAoKSB7XG4gICAgbGV0IHBhc3NlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fcGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwYXNzZXMucHVzaCh0aGlzLl9wYXNzZXNbaV0uY2xvbmUoKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgVGVjaG5pcXVlKHRoaXMuX25hbWUsIHBhc3Nlcyk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii8ifQ==