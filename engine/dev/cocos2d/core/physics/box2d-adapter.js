
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/physics/box2d-adapter.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

var box2d = require('../../../external/box2d/box2d');

window.b2 = {};

for (var key in box2d) {
  if (key.indexOf('b2_') !== -1) {
    continue;
  }

  var newKey = key.replace('b2', '');
  b2[newKey] = box2d[key];
}

b2.maxPolygonVertices = 8;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BoeXNpY3MvYm94MmQtYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJib3gyZCIsInJlcXVpcmUiLCJ3aW5kb3ciLCJiMiIsImtleSIsImluZGV4T2YiLCJuZXdLZXkiLCJyZXBsYWNlIiwibWF4UG9seWdvblZlcnRpY2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsK0JBQUQsQ0FBbkI7O0FBRUFDLE1BQU0sQ0FBQ0MsRUFBUCxHQUFZLEVBQVo7O0FBRUEsS0FBSyxJQUFJQyxHQUFULElBQWdCSixLQUFoQixFQUF1QjtBQUNuQixNQUFJSSxHQUFHLENBQUNDLE9BQUosQ0FBWSxLQUFaLE1BQXVCLENBQUMsQ0FBNUIsRUFBK0I7QUFDM0I7QUFDSDs7QUFDRCxNQUFJQyxNQUFNLEdBQUdGLEdBQUcsQ0FBQ0csT0FBSixDQUFZLElBQVosRUFBa0IsRUFBbEIsQ0FBYjtBQUNBSixFQUFBQSxFQUFFLENBQUNHLE1BQUQsQ0FBRixHQUFhTixLQUFLLENBQUNJLEdBQUQsQ0FBbEI7QUFDSDs7QUFFREQsRUFBRSxDQUFDSyxrQkFBSCxHQUF3QixDQUF4QiIsInNvdXJjZXNDb250ZW50IjpbImxldCBib3gyZCA9IHJlcXVpcmUoJy4uLy4uLy4uL2V4dGVybmFsL2JveDJkL2JveDJkJyk7XG5cbndpbmRvdy5iMiA9IHt9O1xuXG5mb3IgKHZhciBrZXkgaW4gYm94MmQpIHtcbiAgICBpZiAoa2V5LmluZGV4T2YoJ2IyXycpICE9PSAtMSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbGV0IG5ld0tleSA9IGtleS5yZXBsYWNlKCdiMicsICcnKTtcbiAgICBiMltuZXdLZXldID0gYm94MmRba2V5XTtcbn1cblxuYjIubWF4UG9seWdvblZlcnRpY2VzID0gODtcbiJdLCJzb3VyY2VSb290IjoiLyJ9