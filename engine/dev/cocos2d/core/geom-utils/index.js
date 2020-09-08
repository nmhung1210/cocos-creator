
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/geom-utils/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
var _exportNames = {
  enums: true,
  Triangle: true,
  Aabb: true,
  Ray: true,
  intersect: true,
  Sphere: true,
  Obb: true,
  Frustum: true,
  Line: true,
  Plane: true
};
exports.Plane = exports.Line = exports.Frustum = exports.Obb = exports.Sphere = exports.intersect = exports.Ray = exports.Aabb = exports.Triangle = exports.enums = void 0;

var _enums = _interopRequireDefault(require("./enums"));

exports.enums = _enums["default"];

var _triangle = _interopRequireDefault(require("./triangle"));

exports.Triangle = _triangle["default"];

var _aabb = _interopRequireDefault(require("./aabb"));

exports.Aabb = _aabb["default"];

var _ray = _interopRequireDefault(require("./ray"));

exports.Ray = _ray["default"];

var _intersect = _interopRequireDefault(require("./intersect"));

exports.intersect = _intersect["default"];

var _sphere = _interopRequireDefault(require("./sphere"));

exports.Sphere = _sphere["default"];

var _obb = _interopRequireDefault(require("./obb"));

exports.Obb = _obb["default"];

var _frustum = _interopRequireDefault(require("./frustum"));

exports.Frustum = _frustum["default"];

var _line = _interopRequireDefault(require("./line"));

exports.Line = _line["default"];

var _plane = _interopRequireDefault(require("./plane"));

exports.Plane = _plane["default"];

var _distance = require("./distance");

Object.keys(_distance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  exports[key] = _distance[key];
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

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
cc.geomUtils = module.exports;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2dlb20tdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOlsiY2MiLCJnZW9tVXRpbHMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQW5DQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBQSxFQUFFLENBQUNDLFNBQUgsR0FBZUMsTUFBTSxDQUFDQyxPQUF0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIGVudW1zIH0gZnJvbSAnLi9lbnVtcyc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRyaWFuZ2xlIH0gZnJvbSAnLi90cmlhbmdsZSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEFhYmIgfSBmcm9tICcuL2FhYmInO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSYXkgfSBmcm9tICcuL3JheSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGludGVyc2VjdCB9IGZyb20gJy4vaW50ZXJzZWN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU3BoZXJlIH0gZnJvbSAnLi9zcGhlcmUnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPYmIgfSBmcm9tICcuL29iYic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEZydXN0dW0gfSBmcm9tICcuL2ZydXN0dW0nO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaW5lIH0gZnJvbSAnLi9saW5lJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUGxhbmUgfSBmcm9tICcuL3BsYW5lJztcbmV4cG9ydCAqIGZyb20gJy4vZGlzdGFuY2UnO1xuXG5jYy5nZW9tVXRpbHMgPSBtb2R1bGUuZXhwb3J0czsiXSwic291cmNlUm9vdCI6Ii8ifQ==