
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/array.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (callback) {
    var length = this.length;

    for (var i = 0; i < length; i++) {
      var element = this[i];

      if (callback.call(this, element, i, this)) {
        return element;
      }
    }

    return undefined;
  };
} // for ie 11


if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
  };
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvYXJyYXkuanMiXSwibmFtZXMiOlsiQXJyYXkiLCJpc0FycmF5IiwiYXJnIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwiZmluZCIsImNhbGxiYWNrIiwibGVuZ3RoIiwiaSIsImVsZW1lbnQiLCJ1bmRlZmluZWQiLCJpbmNsdWRlcyIsInZhbHVlIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksQ0FBQ0EsS0FBSyxDQUFDQyxPQUFYLEVBQW9CO0FBQ2hCRCxFQUFBQSxLQUFLLENBQUNDLE9BQU4sR0FBZ0IsVUFBVUMsR0FBVixFQUFlO0FBQzNCLFdBQU9DLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEJDLElBQTFCLENBQStCSixHQUEvQixNQUF3QyxnQkFBL0M7QUFDSCxHQUZEO0FBR0g7O0FBRUQsSUFBSSxDQUFDRixLQUFLLENBQUNJLFNBQU4sQ0FBZ0JHLElBQXJCLEVBQTJCO0FBQ3ZCUCxFQUFBQSxLQUFLLENBQUNJLFNBQU4sQ0FBZ0JHLElBQWhCLEdBQXVCLFVBQVVDLFFBQVYsRUFBb0I7QUFDdkMsUUFBSUMsTUFBTSxHQUFHLEtBQUtBLE1BQWxCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsTUFBcEIsRUFBNEJDLENBQUMsRUFBN0IsRUFBaUM7QUFDN0IsVUFBSUMsT0FBTyxHQUFHLEtBQUtELENBQUwsQ0FBZDs7QUFDQSxVQUFJRixRQUFRLENBQUNGLElBQVQsQ0FBYyxJQUFkLEVBQW9CSyxPQUFwQixFQUE2QkQsQ0FBN0IsRUFBZ0MsSUFBaEMsQ0FBSixFQUEyQztBQUN2QyxlQUFPQyxPQUFQO0FBQ0g7QUFDSjs7QUFFRCxXQUFPQyxTQUFQO0FBQ0gsR0FWRDtBQVdILEVBRUQ7OztBQUNBLElBQUksQ0FBQ1osS0FBSyxDQUFDSSxTQUFOLENBQWdCUyxRQUFyQixFQUErQjtBQUMzQmIsRUFBQUEsS0FBSyxDQUFDSSxTQUFOLENBQWdCUyxRQUFoQixHQUEyQixVQUFVQyxLQUFWLEVBQWlCO0FBQ3hDLFdBQU8sS0FBS0MsT0FBTCxDQUFhRCxLQUFiLE1BQXdCLENBQUMsQ0FBaEM7QUFDSCxHQUZEO0FBR0giLCJzb3VyY2VzQ29udGVudCI6WyJpZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gKGFyZykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfTtcbn1cblxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzW2ldO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrLmNhbGwodGhpcywgZWxlbWVudCwgaSwgdGhpcykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfTtcbn1cblxuLy8gZm9yIGllIDExXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmNsdWRlcykge1xuICAgIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbHVlKSAhPT0gLTE7XG4gICAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9