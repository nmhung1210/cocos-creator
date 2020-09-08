
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/3d/primitive/cone.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}'use strict';

exports.__esModule = true;
exports["default"] = _default;

var _cylinder = _interopRequireDefault(require("./cylinder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param {Number} radius
 * @param {Number} height
 * @param {Object} opts
 * @param {Number} opts.radialSegments
 * @param {Number} opts.heightSegments
 * @param {Boolean} opts.capped
 * @param {Number} opts.arc
 */
function _default(radius, height, opts) {
  if (radius === void 0) {
    radius = 0.5;
  }

  if (height === void 0) {
    height = 1;
  }

  if (opts === void 0) {
    opts = {
      radialSegments: 32,
      heightSegments: 1,
      capped: true,
      arc: 2.0 * Math.PI
    };
  }

  return (0, _cylinder["default"])(0, radius, height, opts);
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlLzNkL3ByaW1pdGl2ZS9jb25lLnRzIl0sIm5hbWVzIjpbInJhZGl1cyIsImhlaWdodCIsIm9wdHMiLCJyYWRpYWxTZWdtZW50cyIsImhlaWdodFNlZ21lbnRzIiwiY2FwcGVkIiwiYXJjIiwiTWF0aCIsIlBJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7OztBQVNlLGtCQUFVQSxNQUFWLEVBQXdCQyxNQUF4QixFQUFvQ0MsSUFBcEMsRUFBc0g7QUFBQSxNQUE1R0YsTUFBNEc7QUFBNUdBLElBQUFBLE1BQTRHLEdBQW5HLEdBQW1HO0FBQUE7O0FBQUEsTUFBOUZDLE1BQThGO0FBQTlGQSxJQUFBQSxNQUE4RixHQUFyRixDQUFxRjtBQUFBOztBQUFBLE1BQWxGQyxJQUFrRjtBQUFsRkEsSUFBQUEsSUFBa0YsR0FBM0U7QUFBQ0MsTUFBQUEsY0FBYyxFQUFFLEVBQWpCO0FBQXFCQyxNQUFBQSxjQUFjLEVBQUUsQ0FBckM7QUFBd0NDLE1BQUFBLE1BQU0sRUFBRSxJQUFoRDtBQUFzREMsTUFBQUEsR0FBRyxFQUFFLE1BQU1DLElBQUksQ0FBQ0M7QUFBdEUsS0FBMkU7QUFBQTs7QUFDbkksU0FBTywwQkFBUyxDQUFULEVBQVlSLE1BQVosRUFBb0JDLE1BQXBCLEVBQTRCQyxJQUE1QixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjeWxpbmRlciBmcm9tICcuL2N5bGluZGVyJztcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkaXVzXG4gKiBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQHBhcmFtIHtOdW1iZXJ9IG9wdHMucmFkaWFsU2VnbWVudHNcbiAqIEBwYXJhbSB7TnVtYmVyfSBvcHRzLmhlaWdodFNlZ21lbnRzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdHMuY2FwcGVkXG4gKiBAcGFyYW0ge051bWJlcn0gb3B0cy5hcmNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHJhZGl1cyA9IDAuNSwgaGVpZ2h0ID0gMSwgb3B0cyA9IHtyYWRpYWxTZWdtZW50czogMzIsIGhlaWdodFNlZ21lbnRzOiAxLCBjYXBwZWQ6IHRydWUsIGFyYzogMi4wICogTWF0aC5QSX0pIHtcbiAgcmV0dXJuIGN5bGluZGVyKDAsIHJhZGl1cywgaGVpZ2h0LCBvcHRzKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9