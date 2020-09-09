
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/polyfill/misc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

if (!Math.sign) {
  Math.sign = function (x) {
    x = +x; // convert to a number

    if (x === 0 || isNaN(x)) {
      return x;
    }

    return x > 0 ? 1 : -1;
  };
}

if (!Math.log2) {
  Math.log2 = function (x) {
    return Math.log(x) * Math.LOG2E;
  };
}

if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}

if (CC_JSB || CC_RUNTIME || !console.time) {
  var Timer = window.performance || Date;

  var _timerTable = Object.create(null);

  console.time = function (label) {
    _timerTable[label] = Timer.now();
  };

  console.timeEnd = function (label) {
    var startTime = _timerTable[label];
    var duration = Timer.now() - startTime;
    console.log(label + ": " + duration + "ms");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcG9seWZpbGwvbWlzYy5qcyJdLCJuYW1lcyI6WyJNYXRoIiwic2lnbiIsIngiLCJpc05hTiIsImxvZzIiLCJsb2ciLCJMT0cyRSIsIk51bWJlciIsImlzSW50ZWdlciIsInZhbHVlIiwiaXNGaW5pdGUiLCJmbG9vciIsIkNDX0pTQiIsIkNDX1JVTlRJTUUiLCJjb25zb2xlIiwidGltZSIsIlRpbWVyIiwid2luZG93IiwicGVyZm9ybWFuY2UiLCJEYXRlIiwiX3RpbWVyVGFibGUiLCJPYmplY3QiLCJjcmVhdGUiLCJsYWJlbCIsIm5vdyIsInRpbWVFbmQiLCJzdGFydFRpbWUiLCJkdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxJQUFWLEVBQWdCO0FBQ1pELEVBQUFBLElBQUksQ0FBQ0MsSUFBTCxHQUFZLFVBQVVDLENBQVYsRUFBYTtBQUNyQkEsSUFBQUEsQ0FBQyxHQUFHLENBQUNBLENBQUwsQ0FEcUIsQ0FDYjs7QUFDUixRQUFJQSxDQUFDLEtBQUssQ0FBTixJQUFXQyxLQUFLLENBQUNELENBQUQsQ0FBcEIsRUFBeUI7QUFDckIsYUFBT0EsQ0FBUDtBQUNIOztBQUNELFdBQU9BLENBQUMsR0FBRyxDQUFKLEdBQVEsQ0FBUixHQUFZLENBQUMsQ0FBcEI7QUFDSCxHQU5EO0FBT0g7O0FBRUQsSUFBSSxDQUFDRixJQUFJLENBQUNJLElBQVYsRUFBZ0I7QUFDWkosRUFBQUEsSUFBSSxDQUFDSSxJQUFMLEdBQVksVUFBVUYsQ0FBVixFQUFhO0FBQ3JCLFdBQU9GLElBQUksQ0FBQ0ssR0FBTCxDQUFTSCxDQUFULElBQWNGLElBQUksQ0FBQ00sS0FBMUI7QUFDSCxHQUZEO0FBR0g7O0FBRUQsSUFBSSxDQUFDQyxNQUFNLENBQUNDLFNBQVosRUFBdUI7QUFDbkJELEVBQUFBLE1BQU0sQ0FBQ0MsU0FBUCxHQUFtQixVQUFVQyxLQUFWLEVBQWlCO0FBQ2hDLFdBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkMsUUFBUSxDQUFDRCxLQUFELENBQXJDLElBQWdEVCxJQUFJLENBQUNXLEtBQUwsQ0FBV0YsS0FBWCxNQUFzQkEsS0FBN0U7QUFDSCxHQUZEO0FBR0g7O0FBRUQsSUFBSUcsTUFBTSxJQUFJQyxVQUFWLElBQXdCLENBQUNDLE9BQU8sQ0FBQ0MsSUFBckMsRUFBMkM7QUFDdkMsTUFBSUMsS0FBSyxHQUFHQyxNQUFNLENBQUNDLFdBQVAsSUFBc0JDLElBQWxDOztBQUNBLE1BQUlDLFdBQVcsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUFsQjs7QUFDQVIsRUFBQUEsT0FBTyxDQUFDQyxJQUFSLEdBQWUsVUFBVVEsS0FBVixFQUFpQjtBQUM1QkgsSUFBQUEsV0FBVyxDQUFDRyxLQUFELENBQVgsR0FBcUJQLEtBQUssQ0FBQ1EsR0FBTixFQUFyQjtBQUNILEdBRkQ7O0FBR0FWLEVBQUFBLE9BQU8sQ0FBQ1csT0FBUixHQUFrQixVQUFVRixLQUFWLEVBQWlCO0FBQy9CLFFBQUlHLFNBQVMsR0FBR04sV0FBVyxDQUFDRyxLQUFELENBQTNCO0FBQ0EsUUFBSUksUUFBUSxHQUFHWCxLQUFLLENBQUNRLEdBQU4sS0FBY0UsU0FBN0I7QUFDQVosSUFBQUEsT0FBTyxDQUFDVCxHQUFSLENBQWVrQixLQUFmLFVBQXlCSSxRQUF6QjtBQUNILEdBSkQ7QUFLSCIsInNvdXJjZXNDb250ZW50IjpbImlmICghTWF0aC5zaWduKSB7XG4gICAgTWF0aC5zaWduID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgeCA9ICt4OyAvLyBjb252ZXJ0IHRvIGEgbnVtYmVyXG4gICAgICAgIGlmICh4ID09PSAwIHx8IGlzTmFOKHgpKSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCA+IDAgPyAxIDogLTE7XG4gICAgfTtcbn1cblxuaWYgKCFNYXRoLmxvZzIpIHtcbiAgICBNYXRoLmxvZzIgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gTWF0aC5sb2coeCkgKiBNYXRoLkxPRzJFO1xuICAgIH07XG59XG5cbmlmICghTnVtYmVyLmlzSW50ZWdlcikge1xuICAgIE51bWJlci5pc0ludGVnZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbiAgICB9O1xufVxuXG5pZiAoQ0NfSlNCIHx8IENDX1JVTlRJTUUgfHwgIWNvbnNvbGUudGltZSkge1xuICAgIHZhciBUaW1lciA9IHdpbmRvdy5wZXJmb3JtYW5jZSB8fCBEYXRlO1xuICAgIHZhciBfdGltZXJUYWJsZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgY29uc29sZS50aW1lID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIF90aW1lclRhYmxlW2xhYmVsXSA9IFRpbWVyLm5vdygpO1xuICAgIH07XG4gICAgY29uc29sZS50aW1lRW5kID0gZnVuY3Rpb24gKGxhYmVsKSB7XG4gICAgICAgIHZhciBzdGFydFRpbWUgPSBfdGltZXJUYWJsZVtsYWJlbF07XG4gICAgICAgIHZhciBkdXJhdGlvbiA9IFRpbWVyLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtsYWJlbH06ICR7ZHVyYXRpb259bXNgKTtcbiAgICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=