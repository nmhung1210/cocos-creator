
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/platform/CCEnum.js';
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
var js = require('./js'); // enum

/**
 * !#en
 * Define an enum type. <br/>
 * If a enum item has a value of -1, it will be given an Integer number according to it's order in the list.<br/>
 * Otherwise it will use the value specified by user who writes the enum definition.
 *
 * !#zh
 * 定义一个枚举类型。<br/>
 * 用户可以把枚举值设为任意的整数，如果设为 -1，系统将会分配为上一个枚举值 + 1。
 *
 * @method Enum
 * @param {object} obj - a JavaScript literal object containing enum names and values, or a TypeScript enum type
 * @return {object} the defined enum type
 * @example {@link cocos2d/core/platform/CCEnum/Enum.js}
 * @typescript Enum<T>(obj: T): T
 */


function Enum(obj) {
  if ('__enums__' in obj) {
    return obj;
  }

  js.value(obj, '__enums__', null, true);
  var lastIndex = -1;
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var val = obj[key];

    if (val === -1) {
      val = ++lastIndex;
      obj[key] = val;
    } else {
      if (typeof val === 'number') {
        lastIndex = val;
      } else if (typeof val === 'string' && Number.isInteger(parseFloat(key))) {
        continue;
      }
    }

    var reverseKey = '' + val;

    if (key !== reverseKey) {
      if ((CC_EDITOR || CC_TEST) && reverseKey in obj && obj[reverseKey] !== key) {
        cc.errorID(7100, reverseKey);
        continue;
      }

      js.value(obj, reverseKey, key);
    }
  }

  return obj;
}

Enum.isEnum = function (enumType) {
  return enumType && enumType.hasOwnProperty('__enums__');
};
/**
 * @method getList
 * @param {Object} enumDef - the enum type defined from cc.Enum
 * @return {Object[]}
 * @private
 */


Enum.getList = function (enumDef) {
  if (enumDef.__enums__) return enumDef.__enums__;
  var enums = enumDef.__enums__ = [];

  for (var name in enumDef) {
    var value = enumDef[name];

    if (Number.isInteger(value)) {
      enums.push({
        name: name,
        value: value
      });
    }
  }

  enums.sort(function (a, b) {
    return a.value - b.value;
  });
  return enums;
};

if (CC_DEV) {
  // check key order in object literal
  var _TestEnum = Enum({
    ZERO: -1,
    ONE: -1,
    TWO: -1,
    THREE: -1
  });

  if (_TestEnum.ZERO !== 0 || _TestEnum.ONE !== 1 || _TestEnum.THREE !== 3) {
    cc.errorID(7101);
  }
}

module.exports = cc.Enum = Enum;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3BsYXRmb3JtL0NDRW51bS5qcyJdLCJuYW1lcyI6WyJqcyIsInJlcXVpcmUiLCJFbnVtIiwib2JqIiwidmFsdWUiLCJsYXN0SW5kZXgiLCJrZXlzIiwiT2JqZWN0IiwiaSIsImxlbmd0aCIsImtleSIsInZhbCIsIk51bWJlciIsImlzSW50ZWdlciIsInBhcnNlRmxvYXQiLCJyZXZlcnNlS2V5IiwiQ0NfRURJVE9SIiwiQ0NfVEVTVCIsImNjIiwiZXJyb3JJRCIsImlzRW51bSIsImVudW1UeXBlIiwiaGFzT3duUHJvcGVydHkiLCJnZXRMaXN0IiwiZW51bURlZiIsIl9fZW51bXNfXyIsImVudW1zIiwibmFtZSIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJDQ19ERVYiLCJfVGVzdEVudW0iLCJaRVJPIiwiT05FIiwiVFdPIiwiVEhSRUUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsRUFBRSxHQUFHQyxPQUFPLENBQUMsTUFBRCxDQUFoQixFQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsU0FBU0MsSUFBVCxDQUFlQyxHQUFmLEVBQW9CO0FBQ2hCLE1BQUksZUFBZUEsR0FBbkIsRUFBd0I7QUFDcEIsV0FBT0EsR0FBUDtBQUNIOztBQUNESCxFQUFBQSxFQUFFLENBQUNJLEtBQUgsQ0FBU0QsR0FBVCxFQUFjLFdBQWQsRUFBMkIsSUFBM0IsRUFBaUMsSUFBakM7QUFFQSxNQUFJRSxTQUFTLEdBQUcsQ0FBQyxDQUFqQjtBQUNBLE1BQUlDLElBQUksR0FBR0MsTUFBTSxDQUFDRCxJQUFQLENBQVlILEdBQVosQ0FBWDs7QUFDQSxPQUFLLElBQUlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLElBQUksQ0FBQ0csTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsUUFBSUUs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ckIsRUFBRSxDQUFDaEIsSUFBSCxHQUFVQSxJQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIGpzID0gcmVxdWlyZSgnLi9qcycpO1xuXG4vLyBlbnVtXG5cbi8qKlxuICogISNlblxuICogRGVmaW5lIGFuIGVudW0gdHlwZS4gPGJyLz5cbiAqIElmIGEgZW51bSBpdGVtIGhhcyBhIHZhbHVlIG9mIC0xLCBpdCB3aWxsIGJlIGdpdmVuIGFuIEludGVnZXIgbnVtYmVyIGFjY29yZGluZyB0byBpdCdzIG9yZGVyIGluIHRoZSBsaXN0Ljxici8+XG4gKiBPdGhlcndpc2UgaXQgd2lsbCB1c2UgdGhlIHZhbHVlIHNwZWNpZmllZCBieSB1c2VyIHdobyB3cml0ZXMgdGhlIGVudW0gZGVmaW5pdGlvbi5cbiAqXG4gKiAhI3poXG4gKiDlrprkuYnkuIDkuKrmnprkuL7nsbvlnovjgII8YnIvPlxuICog55So5oi35Y+v5Lul5oqK5p6a5Li+5YC86K6+5Li65Lu75oSP55qE5pW05pWw77yM5aaC5p6c6K6+5Li6IC0x77yM57O757uf5bCG5Lya5YiG6YWN5Li65LiK5LiA5Liq5p6a5Li+5YC8ICsgMeOAglxuICpcbiAqIEBtZXRob2QgRW51bVxuICogQHBhcmFtIHtvYmplY3R9IG9iaiAtIGEgSmF2YVNjcmlwdCBsaXRlcmFsIG9iamVjdCBjb250YWluaW5nIGVudW0gbmFtZXMgYW5kIHZhbHVlcywgb3IgYSBUeXBlU2NyaXB0IGVudW0gdHlwZVxuICogQHJldHVybiB7b2JqZWN0fSB0aGUgZGVmaW5lZCBlbnVtIHR5cGVcbiAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvcGxhdGZvcm0vQ0NFbnVtL0VudW0uanN9XG4gKiBAdHlwZXNjcmlwdCBFbnVtPFQ+KG9iajogVCk6IFRcbiAqL1xuZnVuY3Rpb24gRW51bSAob2JqKSB7XG4gICAgaWYgKCdfX2VudW1zX18nIGluIG9iaikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBqcy52YWx1ZShvYmosICdfX2VudW1zX18nLCBudWxsLCB0cnVlKTtcblxuICAgIHZhciBsYXN0SW5kZXggPSAtMTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHZhbCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9ICsrbGFzdEluZGV4O1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBsYXN0SW5kZXggPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlRmxvYXQoa2V5KSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcmV2ZXJzZUtleSA9ICcnICsgdmFsO1xuICAgICAgICBpZiAoa2V5ICE9PSByZXZlcnNlS2V5KSB7XG4gICAgICAgICAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiByZXZlcnNlS2V5IGluIG9iaiAmJiBvYmpbcmV2ZXJzZUtleV0gIT09IGtleSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoNzEwMCwgcmV2ZXJzZUtleSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBqcy52YWx1ZShvYmosIHJldmVyc2VLZXksIGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuRW51bS5pc0VudW0gPSBmdW5jdGlvbiAoZW51bVR5cGUpIHtcbiAgICByZXR1cm4gZW51bVR5cGUgJiYgZW51bVR5cGUuaGFzT3duUHJvcGVydHkoJ19fZW51bXNfXycpO1xufTtcblxuLyoqXG4gKiBAbWV0aG9kIGdldExpc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBlbnVtRGVmIC0gdGhlIGVudW0gdHlwZSBkZWZpbmVkIGZyb20gY2MuRW51bVxuICogQHJldHVybiB7T2JqZWN0W119XG4gKiBAcHJpdmF0ZVxuICovXG5FbnVtLmdldExpc3QgPSBmdW5jdGlvbiAoZW51bURlZikge1xuICAgIGlmIChlbnVtRGVmLl9fZW51bXNfXylcbiAgICAgICAgcmV0dXJuIGVudW1EZWYuX19lbnVtc19fO1xuXG4gICAgdmFyIGVudW1zID0gZW51bURlZi5fX2VudW1zX18gPSBbXTtcbiAgICBmb3IgKHZhciBuYW1lIGluIGVudW1EZWYpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZW51bURlZltuYW1lXTtcbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XG4gICAgICAgICAgICBlbnVtcy5wdXNoKHsgbmFtZSwgdmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW51bXMuc29ydCggZnVuY3Rpb24gKCBhLCBiICkgeyByZXR1cm4gYS52YWx1ZSAtIGIudmFsdWU7IH0gKTtcbiAgICByZXR1cm4gZW51bXM7XG59O1xuXG5pZiAoQ0NfREVWKSB7XG4gICAgLy8gY2hlY2sga2V5IG9yZGVyIGluIG9iamVjdCBsaXRlcmFsXG4gICAgdmFyIF9UZXN0RW51bSA9IEVudW0oe1xuICAgICAgICBaRVJPOiAtMSxcbiAgICAgICAgT05FOiAtMSxcbiAgICAgICAgVFdPOiAtMSxcbiAgICAgICAgVEhSRUU6IC0xXG4gICAgfSk7XG4gICAgaWYgKF9UZXN0RW51bS5aRVJPICE9PSAwIHx8IF9UZXN0RW51bS5PTkUgIT09IDEgfHwgX1Rlc3RFbnVtLlRIUkVFICE9PSAzKSB7XG4gICAgICAgIGNjLmVycm9ySUQoNzEwMSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNjLkVudW0gPSBFbnVtO1xuIl0sInNvdXJjZVJvb3QiOiIvIn0=