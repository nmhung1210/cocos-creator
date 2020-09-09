
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var Pool = /*#__PURE__*/function () {
  function Pool() {
    this.enabled = false;
    this.count = 0;
    this.maxSize = 1024;
  }

  var _proto = Pool.prototype;

  _proto.get = function get() {};

  _proto.put = function put() {};

  _proto.clear = function clear() {};

  return Pool;
}();

exports["default"] = Pool;
cc.pool = {};

Pool.register = function (name, pool) {
  cc.pool[name] = pool;
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL3Bvb2wuanMiXSwibmFtZXMiOlsiUG9vbCIsImVuYWJsZWQiLCJjb3VudCIsIm1heFNpemUiLCJnZXQiLCJwdXQiLCJjbGVhciIsImNjIiwicG9vbCIsInJlZ2lzdGVyIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUNxQkE7O1NBQ2pCQyxVQUFVO1NBQ1ZDLFFBQVE7U0FDUkMsVUFBVTs7Ozs7U0FFVkMsTUFBQSxlQUFPLENBRU47O1NBQ0RDLE1BQUEsZUFBTyxDQUVOOztTQUNEQyxRQUFBLGlCQUFTLENBRVI7Ozs7OztBQUdMQyxFQUFFLENBQUNDLElBQUgsR0FBVSxFQUFWOztBQUVBUixJQUFJLENBQUNTLFFBQUwsR0FBZ0IsVUFBVUMsSUFBVixFQUFnQkYsSUFBaEIsRUFBc0I7QUFDbENELEVBQUFBLEVBQUUsQ0FBQ0MsSUFBSCxDQUFRRSxJQUFSLElBQWdCRixJQUFoQjtBQUNILENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvb2wge1xuICAgIGVuYWJsZWQgPSBmYWxzZTtcbiAgICBjb3VudCA9IDA7XG4gICAgbWF4U2l6ZSA9IDEwMjQ7XG5cbiAgICBnZXQgKCkge1xuXG4gICAgfVxuICAgIHB1dCAoKSB7XG5cbiAgICB9XG4gICAgY2xlYXIgKCkge1xuXG4gICAgfVxufVxuXG5jYy5wb29sID0ge307XG5cblBvb2wucmVnaXN0ZXIgPSBmdW5jdGlvbiAobmFtZSwgcG9vbCkge1xuICAgIGNjLnBvb2xbbmFtZV0gPSBwb29sO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvIn0=