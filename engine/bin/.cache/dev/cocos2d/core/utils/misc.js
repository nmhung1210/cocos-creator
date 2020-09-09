
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/misc.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var js = require('../platform/js');
/**
 * misc utilities
 * @class misc
 * @static
 */


var misc = {};

misc.propertyDefine = function (ctor, sameNameGetSets, diffNameGetSets) {
  function define(np, propName, getter, setter) {
    var pd = Object.getOwnPropertyDescriptor(np, propName);

    if (pd) {
      if (pd.get) np[getter] = pd.get;
      if (pd.set && setter) np[setter] = pd.set;
    } else {
      var getterFunc = np[getter];

      if (CC_DEV && !getterFunc) {
        var clsName = cc.Class._isCCClass(ctor) && js.getClassName(ctor) || ctor.name || '(anonymous class)';
        cc.warnID(5700, propName, getter, clsName);
      } else {
        js.getset(np, propName, getterFunc, np[setter]);
      }
    }
  }

  var propName,
      np = ctor.prototype;

  for (var i = 0; i < sameNameGetSets.length; i++) {
    propName = sameNameGetSets[i];
    var suffix = propName[0].toUpperCase() + propName.slice(1);
    define(np, propName, 'get' + suffix, 'set' + suffix);
  }

  for (propName in diffNameGetSets) {
    var getset = diffNameGetSets[propName];
    define(np, propName, getset[0], getset[1]);
  }
};
/**
 * @param {Number} x
 * @return {Number}
 * Constructor
 */


misc.NextPOT = function (x) {
  x = x - 1;
  x = x | x >> 1;
  x = x | x >> 2;
  x = x | x >> 4;
  x = x | x >> 8;
  x = x | x >> 16;
  return x + 1;
}; //var DirtyFlags = m.DirtyFlags = {
//    TRANSFORM: 1 << 0,
//    SIZE: 1 << 1,
//    //Visible:
//    //Color:
//    //Opacity
//    //Cache
//    //Order
//    //Text
//    //Gradient
//    ALL: (1 << 2) - 1
//};
//
//DirtyFlags.WIDGET = DirtyFlags.TRANSFORM | DirtyFlags.SIZE;


if (CC_EDITOR) {
  // use anonymous function here to ensure it will not being hoisted without CC_EDITOR
  misc.tryCatchFunctor_EDITOR = function (funcName) {
    return Function('target', 'try {\n' + '  target.' + funcName + '();\n' + '}\n' + 'catch (e) {\n' + '  cc._throw(e);\n' + '}');
  };
}

misc.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
var BASE64_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var BASE64_VALUES = new Array(123); // max char code in base64Keys

for (var i = 0; i < 123; ++i) {
  BASE64_VALUES[i] = 64;
} // fill with placeholder('=') index


for (var _i = 0; _i < 64; ++_i) {
  BASE64_VALUES[BASE64_KEYS.charCodeAt(_i)] = _i;
} // decoded value indexed by base64 char code


misc.BASE64_VALUES = BASE64_VALUES; // set value to map, if key exists, push to array

misc.pushToMap = function (map, key, value, pushFront) {
  var exists = map[key];

  if (exists) {
    if (Array.isArray(exists)) {
      if (pushFront) {
        exists.push(exists[0]);
        exists[0] = value;
      } else {
        exists.push(value);
      }
    } else {
      map[key] = pushFront ? [value, exists] : [exists, value];
    }
  } else {
    map[key] = value;
  }
};
/**
 * !#en Clamp a value between from and to.
 * !#zh
 * 限定浮点数的最大最小值。<br/>
 * 数值大于 max_inclusive 则返回 max_inclusive。<br/>
 * 数值小于 min_inclusive 则返回 min_inclusive。<br/>
 * 否则返回自身。
 * @method clampf
 * @param {Number} value
 * @param {Number} min_inclusive
 * @param {Number} max_inclusive
 * @return {Number}
 * @example
 * var v1 = cc.misc.clampf(20, 0, 20); // 20;
 * var v2 = cc.misc.clampf(-1, 0, 20); //  0;
 * var v3 = cc.misc.clampf(10, 0, 20); // 10;
 */


misc.clampf = function (value, min_inclusive, max_inclusive) {
  if (min_inclusive > max_inclusive) {
    var temp = min_inclusive;
    min_inclusive = max_inclusive;
    max_inclusive = temp;
  }

  return value < min_inclusive ? min_inclusive : value < max_inclusive ? value : max_inclusive;
};
/**
 * !#en Clamp a value between 0 and 1.
 * !#zh 限定浮点数的取值范围为 0 ~ 1 之间。
 * @method clamp01
 * @param {Number} value
 * @return {Number}
 * @example
 * var v1 = cc.misc.clamp01(20);  // 1;
 * var v2 = cc.misc.clamp01(-1);  // 0;
 * var v3 = cc.misc.clamp01(0.5); // 0.5;
 */


misc.clamp01 = function (value) {
  return value < 0 ? 0 : value < 1 ? value : 1;
};
/**
 * Linear interpolation between 2 numbers, the ratio sets how much it is biased to each end
 * @method lerp
 * @param {Number} a number A
 * @param {Number} b number B
 * @param {Number} r ratio between 0 and 1
 * @return {Number}
 * @example {@link cocos2d/core/platform/CCMacro/lerp.js}
 */


misc.lerp = function (a, b, r) {
  return a + (b - a) * r;
};
/**
 * converts degrees to radians
 * @param {Number} angle
 * @return {Number}
 * @method degreesToRadians
 */


misc.degreesToRadians = function (angle) {
  return angle * cc.macro.RAD;
};
/**
 * converts radians to degrees
 * @param {Number} angle
 * @return {Number}
 * @method radiansToDegrees
 */


misc.radiansToDegrees = function (angle) {
  return angle * cc.macro.DEG;
};

cc.misc = module.exports = misc;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL21pc2MuanMiXSwibmFtZXMiOlsianMiLCJyZXF1aXJlIiwibWlzYyIsInByb3BlcnR5RGVmaW5lIiwiY3RvciIsInNhbWVOYW1lR2V0U2V0cyIsImRpZmZOYW1lR2V0U2V0cyIsImRlZmluZSIsIm5wIiwicHJvcE5hbWUiLCJnZXR0ZXIiLCJzZXR0ZXIiLCJwZCIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImdldCIsInNldCIsImdldHRlckZ1bmMiLCJDQ19ERVYiLCJjbHNOYW1lIiwiY2MiLCJDbGFzcyIsIl9pc0NDQ2xhc3MiLCJnZXRDbGFzc05hbWUiLCJuYW1lIiwid2FybklEIiwiZ2V0c2V0IiwicHJvdG90eXBlIiwiaSIsImxlbmd0aCIsInN1ZmZpeCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJOZXh0UE9UIiwieCIsIkNDX0VESVRPUiIsInRyeUNhdGNoRnVuY3Rvcl9FRElUT1IiLCJmdW5jTmFtZSIsIkZ1bmN0aW9uIiwiQlVJTFRJTl9DTEFTU0lEX1JFIiwiQkFTRTY0X0tFWVMiLCJCQVNFNjRfVkFMVUVTIiwiQXJyYXkiLCJjaGFyQ29kZUF0IiwicHVzaFRvTWFwIiwibWFwIiwia2V5IiwidmFsdWUiLCJwdXNoRnJvbnQiLCJleGlzdHMiLCJpc0FycmF5IiwicHVzaCIsImNsYW1wZiIsIm1pbl9pbmNsdXNpdmUiLCJtYXhfaW5jbHVzaXZlIiwidGVtcCIsImNsYW1wMDEiLCJsZXJwIiwiYSIsImIiLCJyIiwiZGVncmVlc1RvUmFkaWFucyIsImFuZ2xlIiwibWFjcm8iLCJSQUQiLCJyYWRpYW5zVG9EZWdyZWVzIiwiREVHIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLElBQUlBLEVBQUUsR0FBR0MsT0FBTyxDQUFDLGdCQUFELENBQWhCO0FBRUE7Ozs7Ozs7QUFLQSxJQUFJQyxJQUFJLEdBQUcsRUFBWDs7QUFFQUEsSUFBSSxDQUFDQyxjQUFMLEdBQXNCLFVBQVVDLElBQVYsRUFBZ0JDLGVBQWhCLEVBQWlDQyxlQUFqQyxFQUFrRDtBQUNwRSxXQUFTQyxNQUFULENBQWlCQyxFQUFqQixFQUFxQkMsUUFBckIsRUFBK0JDLE1BQS9CLEVBQXVDQyxNQUF2QyxFQUErQztBQUMzQyxRQUFJQyxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NOLEVBQWhDLEVBQW9DQyxRQUFwQyxDQUFUOztBQUNBLFFBQUlHLEVBQUosRUFBUTtBQUNKLFVBQUlBLEVBQUUsQ0FBQ0csR0FBUCxFQUFZUCxFQUFFLENBQUNFLE1BQUQsQ0FBRixHQUFhRSxFQUFFLENBQUNHLEdBQWhCO0FBQ1osVUFBSUgsRUFBRSxDQUFDSSxHQUFILElBQVVMLE1BQWQsRUFBc0JILEVBQUUsQ0FBQ0csTUFBRCxDQUFGLEdBQWFDLEVBQUUsQ0FBQ0ksR0FBaEI7QUFDekIsS0FIRCxNQUlLO0FBQ0QsVUFBSUMsVUFBVSxHQUFHVCxFQUFFLENBQUNFLE1BQUQsQ0FBbkI7O0FBQ0EsVUFBSVEsTUFBTSxJQUFJLENBQUNELFVBQWYsRUFBMkI7QUFDdkIsWUFBSUUsT0FBTyxHQUFJQyxFQUFFLENBQUNDLEtBQUgsQ0FBU0MsVUFBVCxDQUFvQmxCLElBQXBCLEtBQTZCSixFQUFFLENBQUN1QixZQUFILENBQWdCbkIsSUFBaEIsQ0FBOUIsSUFDQUEsSUFBSSxDQUFDb0IsSUFETCxJQUVBLG1CQUZkO0FBR0FKLFFBQUFBLEVBQUUsQ0FBQ0ssTUFBSCxDQUFVLElBQVYsRUFBZ0JoQixRQUFoQixFQUEwQkMsTUFBMUIsRUFBa0NTLE9BQWxDO0FBQ0gsT0FMRCxNQU1LO0FBQ0RuQixRQUFBQSxFQUFFLENBQUMwQixNQUFILENBQVVsQixFQUFWLEVBQWNDLFFBQWQsRUFBd0JRLFVBQXhCLEVBQW9DVCxFQUFFLENBQUNHLE1BQUQsQ0FBdEM7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsTUFBSUYsUUFBSjtBQUFBLE1BQWNELEVBQUUsR0FBR0osSUFBSSxDQUFDdUIsU0FBeEI7O0FBQ0EsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdkIsZUFBZSxDQUFDd0IsTUFBcEMsRUFBNENELENBQUMsRUFBN0MsRUFBaUQ7QUFDN0NuQixJQUFBQSxRQUFRLEdBQUdKLGVBQWUsQ0FBQ3VCLENBQUQsQ0FBMUI7QUFDQSxRQUFJRSxNQUFNLEdBQUdyQixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlzQixXQUFaLEtBQTRCdEIsUUFBUSxDQUFDdUIsS0FBVCxDQUFlLENBQWYsQ0FBekM7QUFDQXpCLElBQUFBLE1BQU0sQ0FBQ0MsRUFBRCxFQUFLQyxRQUFMLEVBQWUsUUFBUXFCLE1BQXZCLEVBQStCLFFBQVFBLE1BQXZDLENBQU47QUFDSDs7QUFDRCxPQUFLckIsUUFBTCxJQUFpQkgsZUFBakIsRUFBa0M7QUFDOUIsUUFBSW9CLE1BQU0sR0FBR3BCLGVBQWUsQ0FBQ0csUUFBRCxDQUE1QjtBQUNBRixJQUFBQSxNQUFNLENBQUNDLEVBQUQsRUFBS0MsUUFBTCxFQUFlaUIsTUFBTSxDQUFDLENBQUQsQ0FBckIsRUFBMEJBLE1BQU0sQ0FBQyxDQUFELENBQWhDLENBQU47QUFDSDtBQUNKLENBOUJEO0FBZ0NBOzs7Ozs7O0FBS0F4QixJQUFJLENBQUMrQixPQUFMLEdBQWUsVUFBVUMsQ0FBVixFQUFhO0FBQ3hCQSxFQUFBQSxDQUFDLEdBQUdBLENBQUMsR0FBRyxDQUFSO0FBQ0FBLEVBQUFBLENBQUMsR0FBR0EsQ0FBQyxHQUFJQSxDQUFDLElBQUksQ0FBZDtBQUNBQSxFQUFBQSxDQUFDLEdBQUdBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLENBQWQ7QUFDQUEsRUFBQUEsQ0FBQyxHQUFHQSxDQUFDLEdBQUlBLENBQUMsSUFBSSxDQUFkO0FBQ0FBLEVBQUFBLENBQUMsR0FBR0EsQ0FBQyxHQUFJQSxDQUFDLElBQUksQ0FBZDtBQUNBQSxFQUFBQSxDQUFDLEdBQUdBLENBQUMsR0FBSUEsQ0FBQyxJQUFJLEVBQWQ7QUFDQSxTQUFPQSxDQUFDLEdBQUcsQ0FBWDtBQUNILENBUkQsRUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQSxJQUFJQyxTQUFKLEVBQWU7QUFDWDtBQUVBakMsRUFBQUEsSUFBSSxDQUFDa0Msc0JBQUwsR0FBOEIsVUFBVUMsUUFBVixFQUFvQjtBQUM5QyxXQUFPQyxRQUFRLENBQUMsUUFBRCxFQUNYLFlBQ0EsV0FEQSxHQUNjRCxRQURkLEdBQ3lCLE9BRHpCLEdBRUEsS0FGQSxHQUdBLGVBSEEsR0FJQSxtQkFKQSxHQUtBLEdBTlcsQ0FBZjtBQU9ILEdBUkQ7QUFTSDs7QUFFRG5DLElBQUksQ0FBQ3FDLGtCQUFMLEdBQTBCLGlDQUExQjtBQUdBLElBQUlDLFdBQVcsR0FBRyxtRUFBbEI7QUFDQSxJQUFJQyxhQUFhLEdBQUcsSUFBSUMsS0FBSixDQUFVLEdBQVYsQ0FBcEIsRUFBb0M7O0FBQ3BDLEtBQUssSUFBSWQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxHQUFwQixFQUF5QixFQUFFQSxDQUEzQjtBQUE4QmEsRUFBQUEsYUFBYSxDQUFDYixDQUFELENBQWIsR0FBbUIsRUFBbkI7QUFBOUIsRUFBcUQ7OztBQUNyRCxLQUFLLElBQUlBLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsRUFBcEIsRUFBd0IsRUFBRUEsRUFBMUI7QUFBNkJhLEVBQUFBLGFBQWEsQ0FBQ0QsV0FBVyxDQUFDRyxVQUFaLENBQXVCZixFQUF2QixDQUFELENBQWIsR0FBMkNBLEVBQTNDO0FBQTdCLEVBRUE7OztBQUNBMUIsSUFBSSxDQUFDdUMsYUFBTCxHQUFxQkEsYUFBckIsRUFFQTs7QUFDQXZDLElBQUksQ0FBQzBDLFNBQUwsR0FBaUIsVUFBVUMsR0FBVixFQUFlQyxHQUFmLEVBQW9CQyxLQUFwQixFQUEyQkMsU0FBM0IsRUFBc0M7QUFDbkQsTUFBSUMsTUFBTSxHQUFHSixHQUFHLENBQUNDLEdBQUQsQ0FBaEI7O0FBQ0EsTUFBSUcsTUFBSixFQUFZO0FBQ1IsUUFBSVAsS0FBSyxDQUFDUSxPQUFOLENBQWNELE1BQWQsQ0FBSixFQUEyQjtBQUN2QixVQUFJRCxTQUFKLEVBQWU7QUFDWEMsUUFBQUEsTUFBTSxDQUFDRSxJQUFQLENBQVlGLE1BQU0sQ0FBQyxDQUFELENBQWxCO0FBQ0FBLFFBQUFBLE1BQU0sQ0FBQyxDQUFELENBQU4sR0FBWUYsS0FBWjtBQUNILE9BSEQsTUFJSztBQUNERSxRQUFBQSxNQUFNLENBQUNFLElBQVAsQ0FBWUosS0FBWjtBQUNIO0FBQ0osS0FSRCxNQVNLO0FBQ0RGLE1BQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVlFLFNBQVMsR0FBRyxDQUFDRCxLQUFELEVBQVFFLE1BQVIsQ0FBSCxHQUFxQixDQUFDQSxNQUFELEVBQVNGLEtBQVQsQ0FBMUM7QUFDSDtBQUNKLEdBYkQsTUFjSztBQUNERixJQUFBQSxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFXQyxLQUFYO0FBQ0g7QUFDSixDQW5CRDtBQXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQTdDLElBQUksQ0FBQ2tELE1BQUwsR0FBYyxVQUFVTCxLQUFWLEVBQWlCTSxhQUFqQixFQUFnQ0MsYUFBaEMsRUFBK0M7QUFDekQsTUFBSUQsYUFBYSxHQUFHQyxhQUFwQixFQUFtQztBQUMvQixRQUFJQyxJQUFJLEdBQUdGLGFBQVg7QUFDQUEsSUFBQUEsYUFBYSxHQUFHQyxhQUFoQjtBQUNBQSxJQUFBQSxhQUFhLEdBQUdDLElBQWhCO0FBQ0g7O0FBQ0QsU0FBT1IsS0FBSyxHQUFHTSxhQUFSLEdBQXdCQSxhQUF4QixHQUF3Q04sS0FBSyxHQUFHTyxhQUFSLEdBQXdCUCxLQUF4QixHQUFnQ08sYUFBL0U7QUFDSCxDQVBEO0FBU0E7Ozs7Ozs7Ozs7Ozs7QUFXQXBELElBQUksQ0FBQ3NELE9BQUwsR0FBZSxVQUFVVCxLQUFWLEVBQWlCO0FBQzVCLFNBQU9BLEtBQUssR0FBRyxDQUFSLEdBQVksQ0FBWixHQUFnQkEsS0FBSyxHQUFHLENBQVIsR0FBWUEsS0FBWixHQUFvQixDQUEzQztBQUNILENBRkQ7QUFJQTs7Ozs7Ozs7Ozs7QUFTQTdDLElBQUksQ0FBQ3VELElBQUwsR0FBWSxVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CO0FBQzNCLFNBQU9GLENBQUMsR0FBRyxDQUFDQyxDQUFDLEdBQUdELENBQUwsSUFBVUUsQ0FBckI7QUFDSCxDQUZEO0FBSUE7Ozs7Ozs7O0FBTUExRCxJQUFJLENBQUMyRCxnQkFBTCxHQUF3QixVQUFVQyxLQUFWLEVBQWlCO0FBQ3JDLFNBQU9BLEtBQUssR0FBRzFDLEVBQUUsQ0FBQzJDLEtBQUgsQ0FBU0MsR0FBeEI7QUFDSCxDQUZEO0FBSUE7Ozs7Ozs7O0FBTUE5RCxJQUFJLENBQUMrRCxnQkFBTCxHQUF3QixVQUFVSCxLQUFWLEVBQWlCO0FBQ3JDLFNBQU9BLEtBQUssR0FBRzFDLEVBQUUsQ0FBQzJDLEtBQUgsQ0FBU0csR0FBeEI7QUFDSCxDQUZEOztBQUlBOUMsRUFBRSxDQUFDbEIsSUFBSCxHQUFVaUUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEUsSUFBM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuIENvcHlyaWdodCAoYykgMjAxMy0yMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiAgd29ybGR3aWRlLCByb3lhbHR5LWZyZWUsIG5vbi1hc3NpZ25hYmxlLCByZXZvY2FibGUgYW5kIG5vbi1leGNsdXNpdmUgbGljZW5zZVxuIHRvIHVzZSBDb2NvcyBDcmVhdG9yIHNvbGVseSB0byBkZXZlbG9wIGdhbWVzIG9uIHlvdXIgdGFyZ2V0IHBsYXRmb3Jtcy4gWW91IHNoYWxsXG4gIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiAgdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuICBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgQ29jb3MgQ3JlYXRvci5cblxuIFRoZSBzb2Z0d2FyZSBvciB0b29scyBpbiB0aGlzIExpY2Vuc2UgQWdyZWVtZW50IGFyZSBsaWNlbnNlZCwgbm90IHNvbGQuXG4gWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuIHJlc2VydmVzIGFsbCByaWdodHMgbm90IGV4cHJlc3NseSBncmFudGVkIHRvIHlvdS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbnZhciBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5cbi8qKlxuICogbWlzYyB1dGlsaXRpZXNcbiAqIEBjbGFzcyBtaXNjXG4gKiBAc3RhdGljXG4gKi9cbnZhciBtaXNjID0ge307XG5cbm1pc2MucHJvcGVydHlEZWZpbmUgPSBmdW5jdGlvbiAoY3Rvciwgc2FtZU5hbWVHZXRTZXRzLCBkaWZmTmFtZUdldFNldHMpIHtcbiAgICBmdW5jdGlvbiBkZWZpbmUgKG5wLCBwcm9wTmFtZSwgZ2V0dGVyLCBzZXR0ZXIpIHtcbiAgICAgICAgdmFyIHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihucCwgcHJvcE5hbWUpO1xuICAgICAgICBpZiAocGQpIHtcbiAgICAgICAgICAgIGlmIChwZC5nZXQpIG5wW2dldHRlcl0gPSBwZC5nZXQ7XG4gICAgICAgICAgICBpZiAocGQuc2V0ICYmIHNldHRlcikgbnBbc2V0dGVyXSA9IHBkLnNldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBnZXR0ZXJGdW5jID0gbnBbZ2V0dGVyXTtcbiAgICAgICAgICAgIGlmIChDQ19ERVYgJiYgIWdldHRlckZ1bmMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xzTmFtZSA9IChjYy5DbGFzcy5faXNDQ0NsYXNzKGN0b3IpICYmIGpzLmdldENsYXNzTmFtZShjdG9yKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0b3IubmFtZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJyhhbm9ueW1vdXMgY2xhc3MpJztcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoNTcwMCwgcHJvcE5hbWUsIGdldHRlciwgY2xzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBqcy5nZXRzZXQobnAsIHByb3BOYW1lLCBnZXR0ZXJGdW5jLCBucFtzZXR0ZXJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgcHJvcE5hbWUsIG5wID0gY3Rvci5wcm90b3R5cGU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzYW1lTmFtZUdldFNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvcE5hbWUgPSBzYW1lTmFtZUdldFNldHNbaV07XG4gICAgICAgIHZhciBzdWZmaXggPSBwcm9wTmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoMSk7XG4gICAgICAgIGRlZmluZShucCwgcHJvcE5hbWUsICdnZXQnICsgc3VmZml4LCAnc2V0JyArIHN1ZmZpeCk7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gZGlmZk5hbWVHZXRTZXRzKSB7XG4gICAgICAgIHZhciBnZXRzZXQgPSBkaWZmTmFtZUdldFNldHNbcHJvcE5hbWVdO1xuICAgICAgICBkZWZpbmUobnAsIHByb3BOYW1lLCBnZXRzZXRbMF0sIGdldHNldFsxXSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHJldHVybiB7TnVtYmVyfVxuICogQ29uc3RydWN0b3JcbiAqL1xubWlzYy5OZXh0UE9UID0gZnVuY3Rpb24gKHgpIHtcbiAgICB4ID0geCAtIDE7XG4gICAgeCA9IHggfCAoeCA+PiAxKTtcbiAgICB4ID0geCB8ICh4ID4+IDIpO1xuICAgIHggPSB4IHwgKHggPj4gNCk7XG4gICAgeCA9IHggfCAoeCA+PiA4KTtcbiAgICB4ID0geCB8ICh4ID4+IDE2KTtcbiAgICByZXR1cm4geCArIDE7XG59O1xuXG4vL3ZhciBEaXJ0eUZsYWdzID0gbS5EaXJ0eUZsYWdzID0ge1xuLy8gICAgVFJBTlNGT1JNOiAxIDw8IDAsXG4vLyAgICBTSVpFOiAxIDw8IDEsXG4vLyAgICAvL1Zpc2libGU6XG4vLyAgICAvL0NvbG9yOlxuLy8gICAgLy9PcGFjaXR5XG4vLyAgICAvL0NhY2hlXG4vLyAgICAvL09yZGVyXG4vLyAgICAvL1RleHRcbi8vICAgIC8vR3JhZGllbnRcbi8vICAgIEFMTDogKDEgPDwgMikgLSAxXG4vL307XG4vL1xuLy9EaXJ0eUZsYWdzLldJREdFVCA9IERpcnR5RmxhZ3MuVFJBTlNGT1JNIHwgRGlydHlGbGFncy5TSVpFO1xuXG5pZiAoQ0NfRURJVE9SKSB7XG4gICAgLy8gdXNlIGFub255bW91cyBmdW5jdGlvbiBoZXJlIHRvIGVuc3VyZSBpdCB3aWxsIG5vdCBiZWluZyBob2lzdGVkIHdpdGhvdXQgQ0NfRURJVE9SXG5cbiAgICBtaXNjLnRyeUNhdGNoRnVuY3Rvcl9FRElUT1IgPSBmdW5jdGlvbiAoZnVuY05hbWUpIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKCd0YXJnZXQnLFxuICAgICAgICAgICAgJ3RyeSB7XFxuJyArXG4gICAgICAgICAgICAnICB0YXJnZXQuJyArIGZ1bmNOYW1lICsgJygpO1xcbicgK1xuICAgICAgICAgICAgJ31cXG4nICtcbiAgICAgICAgICAgICdjYXRjaCAoZSkge1xcbicgK1xuICAgICAgICAgICAgJyAgY2MuX3Rocm93KGUpO1xcbicgK1xuICAgICAgICAgICAgJ30nKTtcbiAgICB9O1xufVxuXG5taXNjLkJVSUxUSU5fQ0xBU1NJRF9SRSA9IC9eKD86Y2N8ZHJhZ29uQm9uZXN8c3B8Y2NzZylcXC4uKy87XG5cblxudmFyIEJBU0U2NF9LRVlTID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcbnZhciBCQVNFNjRfVkFMVUVTID0gbmV3IEFycmF5KDEyMyk7IC8vIG1heCBjaGFyIGNvZGUgaW4gYmFzZTY0S2V5c1xuZm9yIChsZXQgaSA9IDA7IGkgPCAxMjM7ICsraSkgQkFTRTY0X1ZBTFVFU1tpXSA9IDY0OyAvLyBmaWxsIHdpdGggcGxhY2Vob2xkZXIoJz0nKSBpbmRleFxuZm9yIChsZXQgaSA9IDA7IGkgPCA2NDsgKytpKSBCQVNFNjRfVkFMVUVTW0JBU0U2NF9LRVlTLmNoYXJDb2RlQXQoaSldID0gaTtcblxuLy8gZGVjb2RlZCB2YWx1ZSBpbmRleGVkIGJ5IGJhc2U2NCBjaGFyIGNvZGVcbm1pc2MuQkFTRTY0X1ZBTFVFUyA9IEJBU0U2NF9WQUxVRVM7XG5cbi8vIHNldCB2YWx1ZSB0byBtYXAsIGlmIGtleSBleGlzdHMsIHB1c2ggdG8gYXJyYXlcbm1pc2MucHVzaFRvTWFwID0gZnVuY3Rpb24gKG1hcCwga2V5LCB2YWx1ZSwgcHVzaEZyb250KSB7XG4gICAgdmFyIGV4aXN0cyA9IG1hcFtrZXldO1xuICAgIGlmIChleGlzdHMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXhpc3RzKSkge1xuICAgICAgICAgICAgaWYgKHB1c2hGcm9udCkge1xuICAgICAgICAgICAgICAgIGV4aXN0cy5wdXNoKGV4aXN0c1swXSk7XG4gICAgICAgICAgICAgICAgZXhpc3RzWzBdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGlzdHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtYXBba2V5XSA9IChwdXNoRnJvbnQgPyBbdmFsdWUsIGV4aXN0c10gOiBbZXhpc3RzLCB2YWx1ZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBtYXBba2V5XSA9IHZhbHVlO1xuICAgIH1cbn07XG5cbi8qKlxuICogISNlbiBDbGFtcCBhIHZhbHVlIGJldHdlZW4gZnJvbSBhbmQgdG8uXG4gKiAhI3poXG4gKiDpmZDlrprmta7ngrnmlbDnmoTmnIDlpKfmnIDlsI/lgLzjgII8YnIvPlxuICog5pWw5YC85aSn5LqOIG1heF9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1heF9pbmNsdXNpdmXjgII8YnIvPlxuICog5pWw5YC85bCP5LqOIG1pbl9pbmNsdXNpdmUg5YiZ6L+U5ZueIG1pbl9pbmNsdXNpdmXjgII8YnIvPlxuICog5ZCm5YiZ6L+U5Zue6Ieq6Lqr44CCXG4gKiBAbWV0aG9kIGNsYW1wZlxuICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gKiBAcGFyYW0ge051bWJlcn0gbWluX2luY2x1c2l2ZVxuICogQHBhcmFtIHtOdW1iZXJ9IG1heF9pbmNsdXNpdmVcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBleGFtcGxlXG4gKiB2YXIgdjEgPSBjYy5taXNjLmNsYW1wZigyMCwgMCwgMjApOyAvLyAyMDtcbiAqIHZhciB2MiA9IGNjLm1pc2MuY2xhbXBmKC0xLCAwLCAyMCk7IC8vICAwO1xuICogdmFyIHYzID0gY2MubWlzYy5jbGFtcGYoMTAsIDAsIDIwKTsgLy8gMTA7XG4gKi9cbm1pc2MuY2xhbXBmID0gZnVuY3Rpb24gKHZhbHVlLCBtaW5faW5jbHVzaXZlLCBtYXhfaW5jbHVzaXZlKSB7XG4gICAgaWYgKG1pbl9pbmNsdXNpdmUgPiBtYXhfaW5jbHVzaXZlKSB7XG4gICAgICAgIHZhciB0ZW1wID0gbWluX2luY2x1c2l2ZTtcbiAgICAgICAgbWluX2luY2x1c2l2ZSA9IG1heF9pbmNsdXNpdmU7XG4gICAgICAgIG1heF9pbmNsdXNpdmUgPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUgPCBtaW5faW5jbHVzaXZlID8gbWluX2luY2x1c2l2ZSA6IHZhbHVlIDwgbWF4X2luY2x1c2l2ZSA/IHZhbHVlIDogbWF4X2luY2x1c2l2ZTtcbn07XG5cbi8qKlxuICogISNlbiBDbGFtcCBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMS5cbiAqICEjemgg6ZmQ5a6a5rWu54K55pWw55qE5Y+W5YC86IyD5Zu05Li6IDAgfiAxIOS5i+mXtOOAglxuICogQG1ldGhvZCBjbGFtcDAxXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBleGFtcGxlXG4gKiB2YXIgdjEgPSBjYy5taXNjLmNsYW1wMDEoMjApOyAgLy8gMTtcbiAqIHZhciB2MiA9IGNjLm1pc2MuY2xhbXAwMSgtMSk7ICAvLyAwO1xuICogdmFyIHYzID0gY2MubWlzYy5jbGFtcDAxKDAuNSk7IC8vIDAuNTtcbiAqL1xubWlzYy5jbGFtcDAxID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgMCA/IDAgOiB2YWx1ZSA8IDEgPyB2YWx1ZSA6IDE7XG59O1xuXG4vKipcbiAqIExpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gMiBudW1iZXJzLCB0aGUgcmF0aW8gc2V0cyBob3cgbXVjaCBpdCBpcyBiaWFzZWQgdG8gZWFjaCBlbmRcbiAqIEBtZXRob2QgbGVycFxuICogQHBhcmFtIHtOdW1iZXJ9IGEgbnVtYmVyIEFcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIG51bWJlciBCXG4gKiBAcGFyYW0ge051bWJlcn0gciByYXRpbyBiZXR3ZWVuIDAgYW5kIDFcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvcGxhdGZvcm0vQ0NNYWNyby9sZXJwLmpzfVxuICovXG5taXNjLmxlcnAgPSBmdW5jdGlvbiAoYSwgYiwgcikge1xuICAgIHJldHVybiBhICsgKGIgLSBhKSAqIHI7XG59O1xuXG4vKipcbiAqIGNvbnZlcnRzIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICogQHBhcmFtIHtOdW1iZXJ9IGFuZ2xlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAbWV0aG9kIGRlZ3JlZXNUb1JhZGlhbnNcbiAqL1xubWlzYy5kZWdyZWVzVG9SYWRpYW5zID0gZnVuY3Rpb24gKGFuZ2xlKSB7XG4gICAgcmV0dXJuIGFuZ2xlICogY2MubWFjcm8uUkFEO1xufTtcblxuLyoqXG4gKiBjb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQG1ldGhvZCByYWRpYW5zVG9EZWdyZWVzXG4gKi9cbm1pc2MucmFkaWFuc1RvRGVncmVlcyA9IGZ1bmN0aW9uIChhbmdsZSkge1xuICAgIHJldHVybiBhbmdsZSAqIGNjLm1hY3JvLkRFRztcbn07XG5cbmNjLm1pc2MgPSBtb2R1bGUuZXhwb3J0cyA9IG1pc2M7Il0sInNvdXJjZVJvb3QiOiIvIn0=