
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/renderer/memop/index.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

exports.__esModule = true;
exports.TypedArrayPool = exports.RecyclePool = exports.Pool = exports.LinkedArray = exports.FixedArray = exports.CircularPool = void 0;

var _circularPool = _interopRequireDefault(require("./circular-pool"));

exports.CircularPool = _circularPool["default"];

var _fixedArray = _interopRequireDefault(require("./fixed-array"));

exports.FixedArray = _fixedArray["default"];

var _linkedArray = _interopRequireDefault(require("./linked-array"));

exports.LinkedArray = _linkedArray["default"];

var _pool = _interopRequireDefault(require("./pool"));

exports.Pool = _pool["default"];

var _recyclePool = _interopRequireDefault(require("./recycle-pool"));

exports.RecyclePool = _recyclePool["default"];

var _typedArrayPool = _interopRequireDefault(require("./typed-array-pool"));

exports.TypedArrayPool = _typedArrayPool["default"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9yZW5kZXJlci9tZW1vcC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgZGVmYXVsdCBhcyBDaXJjdWxhclBvb2wgfSBmcm9tICcuL2NpcmN1bGFyLXBvb2wnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBGaXhlZEFycmF5IH0gZnJvbSAnLi9maXhlZC1hcnJheSc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExpbmtlZEFycmF5IH0gZnJvbSAnLi9saW5rZWQtYXJyYXknO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBQb29sIH0gZnJvbSAnLi9wb29sJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVjeWNsZVBvb2wgfSBmcm9tICcuL3JlY3ljbGUtcG9vbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFR5cGVkQXJyYXlQb29sIH0gZnJvbSAnLi90eXBlZC1hcnJheS1wb29sJzsiXSwic291cmNlUm9vdCI6Ii8ifQ==