
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/gfx/misc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.isPow2 = isPow2;

function isPow2(v) {
  return !(v & v - 1) && !!v;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9nZngvbWlzYy5qcyJdLCJuYW1lcyI6WyJpc1BvdzIiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU8sU0FBU0EsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUI7QUFDeEIsU0FBTyxFQUFFQSxDQUFDLEdBQUlBLENBQUMsR0FBRyxDQUFYLEtBQW1CLENBQUMsQ0FBQ0EsQ0FBNUI7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpc1BvdzIodikge1xuICByZXR1cm4gISh2ICYgKHYgLSAxKSkgJiYgKCEhdik7XG59Il0sInNvdXJjZVJvb3QiOiIvIn0=