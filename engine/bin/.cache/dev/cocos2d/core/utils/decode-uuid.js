
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/decode-uuid.js';
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
var Base64Values = require('./misc').BASE64_VALUES;

var HexChars = '0123456789abcdef'.split('');
var _t = ['', '', '', ''];

var UuidTemplate = _t.concat(_t, '-', _t, '-', _t, '-', _t, '-', _t, _t, _t);

var Indices = UuidTemplate.map(function (x, i) {
  return x === '-' ? NaN : i;
}).filter(isFinite); // fcmR3XADNLgJ1ByKhqcC5Z -> fc991dd7-0033-4b80-9d41-c8a86a702e59

module.exports = function (base64) {
  if (base64.length !== 22) {
    return base64;
  }

  UuidTemplate[0] = base64[0];
  UuidTemplate[1] = base64[1];

  for (var i = 2, j = 2; i < 22; i += 2) {
    var lhs = Base64Values[base64.charCodeAt(i)];
    var rhs = Base64Values[base64.charCodeAt(i + 1)];
    UuidTemplate[Indices[j++]] = HexChars[lhs >> 2];
    UuidTemplate[Indices[j++]] = HexChars[(lhs & 3) << 2 | rhs >> 4];
    UuidTemplate[Indices[j++]] = HexChars[rhs & 0xF];
  }

  return UuidTemplate.join('');
};

if (CC_TEST) {
  cc._Test.decodeUuid = module.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2RlY29kZS11dWlkLmpzIl0sIm5hbWVzIjpbIkJhc2U2NFZhbHVlcyIsInJlcXVpcmUiLCJCQVNFNjRfVkFMVUVTIiwiSGV4Q2hhcnMiLCJzcGxpdCIsIl90IiwiVXVpZFRlbXBsYXRlIiwiY29uY2F0IiwiSW5kaWNlcyIsIm1hcCIsIngiLCJpIiwiTmFOIiwiZmlsdGVyIiwiaXNGaW5pdGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiYmFzZTY0IiwibGVuZ3RoIiwiaiIsImxocyIsImNoYXJDb2RlQXQiLCJyaHMiLCJqb2luIiwiQ0NfVEVTVCIsImNjIiwiX1Rlc3QiLCJkZWNvZGVVdWlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsSUFBSUEsWUFBWSxHQUFHQyxPQUFPLENBQUMsUUFBRCxDQUFQLENBQWtCQyxhQUFyQzs7QUFFQSxJQUFJQyxRQUFRLEdBQUcsbUJBQW1CQyxLQUFuQixDQUF5QixFQUF6QixDQUFmO0FBRUEsSUFBSUMsRUFBRSxHQUFHLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBUyxFQUFULEVBQWEsRUFBYixDQUFUOztBQUNBLElBQUlDLFlBQVksR0FBR0QsRUFBRSxDQUFDRSxNQUFILENBQVVGLEVBQVYsRUFBYyxHQUFkLEVBQW1CQSxFQUFuQixFQUF1QixHQUF2QixFQUE0QkEsRUFBNUIsRUFBZ0MsR0FBaEMsRUFBcUNBLEVBQXJDLEVBQXlDLEdBQXpDLEVBQThDQSxFQUE5QyxFQUFrREEsRUFBbEQsRUFBc0RBLEVBQXRELENBQW5COztBQUNBLElBQUlHLE9BQU8sR0FBR0YsWUFBWSxDQUFDRyxHQUFiLENBQWlCLFVBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUFFLFNBQU9ELENBQUMsS0FBSyxHQUFOLEdBQVlFLEdBQVosR0FBa0JELENBQXpCO0FBQTZCLENBQWhFLEVBQWtFRSxNQUFsRSxDQUF5RUMsUUFBekUsQ0FBZCxFQUVBOztBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBVUMsTUFBVixFQUFrQjtBQUMvQixNQUFJQSxNQUFNLENBQUNDLE1BQVAsS0FBa0IsRUFBdEIsRUFBMEI7QUFDdEIsV0FBT0QsTUFBUDtBQUNIOztBQUNEWCxFQUFBQSxZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCVyxNQUFNLENBQUMsQ0FBRCxDQUF4QjtBQUNBWCxFQUFBQSxZQUFZLENBQUMsQ0FBRCxDQUFaLEdBQWtCVyxNQUFNLENBQUMsQ0FBRCxDQUF4Qjs7QUFDQSxPQUFLLElBQUlOLENBQUMsR0FBRyxDQUFSLEVBQVdRLENBQUMsR0FBRyxDQUFwQixFQUF1QlIsQ0FBQyxHQUFHLEVBQTNCLEVBQStCQSxDQUFDLElBQUksQ0FBcEMsRUFBdUM7QUFDbkMsUUFBSVMsR0FBRyxHQUFHcEIsWUFBWSxDQUFDaUIsTUFBTSxDQUFDSSxVQUFQLENBQWtCVixDQUFsQixDQUFELENBQXRCO0FBQ0EsUUFBSVcsR0FBRyxHQUFHdEIsWUFBWSxDQUFDaUIsTUFBTSxDQUFDSSxVQUFQLENBQWtCVixDQUFDLEdBQUcsQ0FBdEIsQ0FBRCxDQUF0QjtBQUNBTCxJQUFBQSxZQUFZLENBQUNFLE9BQU8sQ0FBQ1csQ0FBQyxFQUFGLENBQVIsQ0FBWixHQUE2QmhCLFFBQVEsQ0FBQ2lCLEdBQUcsSUFBSSxDQUFSLENBQXJDO0FBQ0FkLElBQUFBLFlBQVksQ0FBQ0UsT0FBTyxDQUFDVyxDQUFDLEVBQUYsQ0FBUixDQUFaLEdBQTZCaEIsUUFBUSxDQUFFLENBQUNpQixHQUFHLEdBQUcsQ0FBUCxLQUFhLENBQWQsR0FBbUJFLEdBQUcsSUFBSSxDQUEzQixDQUFyQztBQUNBaEIsSUFBQUEsWUFBWSxDQUFDRSxPQUFPLENBQUNXLENBQUMsRUFBRixDQUFSLENBQVosR0FBNkJoQixRQUFRLENBQUNtQixHQUFHLEdBQUcsR0FBUCxDQUFyQztBQUNIOztBQUNELFNBQU9oQixZQUFZLENBQUNpQixJQUFiLENBQWtCLEVBQWxCLENBQVA7QUFDSCxDQWREOztBQWdCQSxJQUFJQyxPQUFKLEVBQWE7QUFDVEMsRUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVNDLFVBQVQsR0FBc0JaLE1BQU0sQ0FBQ0MsT0FBN0I7QUFDSCIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxudmFyIEJhc2U2NFZhbHVlcyA9IHJlcXVpcmUoJy4vbWlzYycpLkJBU0U2NF9WQUxVRVM7XG5cbnZhciBIZXhDaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmJy5zcGxpdCgnJyk7XG5cbnZhciBfdCA9IFsnJywgJycsICcnLCAnJ107XG52YXIgVXVpZFRlbXBsYXRlID0gX3QuY29uY2F0KF90LCAnLScsIF90LCAnLScsIF90LCAnLScsIF90LCAnLScsIF90LCBfdCwgX3QpO1xudmFyIEluZGljZXMgPSBVdWlkVGVtcGxhdGUubWFwKGZ1bmN0aW9uICh4LCBpKSB7IHJldHVybiB4ID09PSAnLScgPyBOYU4gOiBpOyB9KS5maWx0ZXIoaXNGaW5pdGUpO1xuXG4vLyBmY21SM1hBRE5MZ0oxQnlLaHFjQzVaIC0+IGZjOTkxZGQ3LTAwMzMtNGI4MC05ZDQxLWM4YTg2YTcwMmU1OVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYmFzZTY0KSB7XG4gICAgaWYgKGJhc2U2NC5sZW5ndGggIT09IDIyKSB7XG4gICAgICAgIHJldHVybiBiYXNlNjQ7XG4gICAgfVxuICAgIFV1aWRUZW1wbGF0ZVswXSA9IGJhc2U2NFswXTtcbiAgICBVdWlkVGVtcGxhdGVbMV0gPSBiYXNlNjRbMV07XG4gICAgZm9yICh2YXIgaSA9IDIsIGogPSAyOyBpIDwgMjI7IGkgKz0gMikge1xuICAgICAgICB2YXIgbGhzID0gQmFzZTY0VmFsdWVzW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgdmFyIHJocyA9IEJhc2U2NFZhbHVlc1tiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICBVdWlkVGVtcGxhdGVbSW5kaWNlc1tqKytdXSA9IEhleENoYXJzW2xocyA+PiAyXTtcbiAgICAgICAgVXVpZFRlbXBsYXRlW0luZGljZXNbaisrXV0gPSBIZXhDaGFyc1soKGxocyAmIDMpIDw8IDIpIHwgcmhzID4+IDRdO1xuICAgICAgICBVdWlkVGVtcGxhdGVbSW5kaWNlc1tqKytdXSA9IEhleENoYXJzW3JocyAmIDB4Rl07XG4gICAgfVxuICAgIHJldHVybiBVdWlkVGVtcGxhdGUuam9pbignJyk7XG59O1xuXG5pZiAoQ0NfVEVTVCkge1xuICAgIGNjLl9UZXN0LmRlY29kZVV1aWQgPSBtb2R1bGUuZXhwb3J0cztcbn1cbiJdLCJzb3VyY2VSb290IjoiLyJ9