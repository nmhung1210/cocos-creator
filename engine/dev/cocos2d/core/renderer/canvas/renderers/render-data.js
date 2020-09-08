
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/renderer/canvas/renderers/render-data.js';
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

var RenderData = /*#__PURE__*/function () {
  function RenderData() {
    this.vertices = [];
  }

  _createClass(RenderData, [{
    key: "dataLength",
    get: function get() {
      return this.vertices.length;
    },
    set: function set(v) {
      var old = this.vertices.length;
      this.vertices.length = v;

      for (var i = old; i < v; i++) {
        this.vertices[i] = {
          x: 0.0,
          y: 0.0,
          u: 0.0,
          v: 0.0
        };
      }
    }
  }]);

  return RenderData;
}();

exports["default"] = RenderData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3JlbmRlcmVyL2NhbnZhcy9yZW5kZXJlcnMvcmVuZGVyLWRhdGEuanMiXSwibmFtZXMiOlsiUmVuZGVyRGF0YSIsInZlcnRpY2VzIiwibGVuZ3RoIiwidiIsIm9sZCIsImkiLCJ4IiwieSIsInUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQTtBQUNuQix3QkFBZTtBQUNiLFNBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDRDs7Ozt3QkFFaUI7QUFDZCxhQUFPLEtBQUtBLFFBQUwsQ0FBY0MsTUFBckI7QUFDSDtzQkFDZUMsR0FBRztBQUNqQixVQUFJQyxHQUFHLEdBQUcsS0FBS0gsUUFBTCxDQUFjQyxNQUF4QjtBQUNBLFdBQUtELFFBQUwsQ0FBY0MsTUFBZCxHQUF1QkMsQ0FBdkI7O0FBQ0EsV0FBSyxJQUFJRSxDQUFDLEdBQUdELEdBQWIsRUFBa0JDLENBQUMsR0FBR0YsQ0FBdEIsRUFBeUJFLENBQUMsRUFBMUIsRUFBOEI7QUFDMUIsYUFBS0osUUFBTCxDQUFjSSxDQUFkLElBQW1CO0FBQ2ZDLFVBQUFBLENBQUMsRUFBRSxHQURZO0FBRWZDLFVBQUFBLENBQUMsRUFBRSxHQUZZO0FBR2ZDLFVBQUFBLENBQUMsRUFBRSxHQUhZO0FBSWZMLFVBQUFBLENBQUMsRUFBRTtBQUpZLFNBQW5CO0FBTUg7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyRGF0YSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnZlcnRpY2VzID0gW107XG4gIH1cblxuICBnZXQgZGF0YUxlbmd0aCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XG4gIH1cbiAgc2V0IGRhdGFMZW5ndGggKHYpIHtcbiAgICBsZXQgb2xkID0gdGhpcy52ZXJ0aWNlcy5sZW5ndGg7XG4gICAgdGhpcy52ZXJ0aWNlcy5sZW5ndGggPSB2O1xuICAgIGZvciAobGV0IGkgPSBvbGQ7IGkgPCB2OyBpKyspIHtcbiAgICAgICAgdGhpcy52ZXJ0aWNlc1tpXSA9IHtcbiAgICAgICAgICAgIHg6IDAuMCxcbiAgICAgICAgICAgIHk6IDAuMCxcbiAgICAgICAgICAgIHU6IDAuMCxcbiAgICAgICAgICAgIHY6IDAuMCxcbiAgICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9