
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/index.js';
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
// PREDEFINE
// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;
/**
 * !#en
 * The main namespace of Cocos2d-JS, all engine core classes, functions, properties and constants are defined in this namespace.
 * !#zh
 * Cocos 引擎的主要命名空间，引擎代码中所有的类，函数，属性和常量都在这个命名空间中定义。
 * @module cc
 * @main cc
 */


_global.cc = _global.cc || {}; // For internal usage

cc.internal = cc.internal || {};

require('./predefine'); // polyfills


require('./polyfill/string');

require('./polyfill/misc');

require('./polyfill/array');

require('./polyfill/object');

require('./polyfill/array-buffer');

require('./polyfill/number');

if (!(CC_EDITOR && Editor.isMainProcess)) {
  require('./polyfill/typescript');
}

require('./cocos2d/core/predefine'); // LOAD COCOS2D ENGINE CODE


if (!(CC_EDITOR && Editor.isMainProcess)) {
  require('./cocos2d');
} // LOAD EXTENDS


require('./extends');

if (CC_EDITOR) {
  if (Editor.isMainProcess) {
    Editor.versions['cocos2d'] = require('./package').version;
  }
}

module.exports = _global.cc;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvaW5kZXguanMiXSwibmFtZXMiOlsiX2dsb2JhbCIsIndpbmRvdyIsImdsb2JhbCIsImNjIiwiaW50ZXJuYWwiLCJyZXF1aXJlIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiaXNNYWluUHJvY2VzcyIsInZlcnNpb25zIiwidmVyc2lvbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQTtBQUVBO0FBQ0EsSUFBSUEsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NDLE1BQWhDLEdBQXlDRCxNQUF2RDtBQUVBOzs7Ozs7Ozs7O0FBUUFELE9BQU8sQ0FBQ0csRUFBUixHQUFhSCxPQUFPLENBQUNHLEVBQVIsSUFBYyxFQUEzQixFQUVBOztBQUNBQSxFQUFFLENBQUNDLFFBQUgsR0FBY0QsRUFBRSxDQUFDQyxRQUFILElBQWUsRUFBN0I7O0FBRUFDLE9BQU8sQ0FBQyxhQUFELENBQVAsRUFFQTs7O0FBQ0FBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMsaUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLGtCQUFELENBQVA7O0FBQ0FBLE9BQU8sQ0FBQyxtQkFBRCxDQUFQOztBQUNBQSxPQUFPLENBQUMseUJBQUQsQ0FBUDs7QUFDQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBQ0EsSUFBSSxFQUFFQyxTQUFTLElBQUlDLE1BQU0sQ0FBQ0MsYUFBdEIsQ0FBSixFQUEwQztBQUN0Q0gsRUFBQUEsT0FBTyxDQUFDLHVCQUFELENBQVA7QUFDSDs7QUFFREEsT0FBTyxDQUFDLDBCQUFELENBQVAsRUFFQTs7O0FBRUEsSUFBSSxFQUFFQyxTQUFTLElBQUlDLE1BQU0sQ0FBQ0MsYUFBdEIsQ0FBSixFQUEwQztBQUN0Q0gsRUFBQUEsT0FBTyxDQUFDLFdBQUQsQ0FBUDtBQUNILEVBRUQ7OztBQUVBQSxPQUFPLENBQUMsV0FBRCxDQUFQOztBQUVBLElBQUlDLFNBQUosRUFBZTtBQUNYLE1BQUlDLE1BQU0sQ0FBQ0MsYUFBWCxFQUEwQjtBQUN0QkQsSUFBQUEsTUFBTSxDQUFDRSxRQUFQLENBQWdCLFNBQWhCLElBQTZCSixPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCSyxPQUFsRDtBQUNIO0FBQ0o7O0FBRURDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQlosT0FBTyxDQUFDRyxFQUF6QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLy8gUFJFREVGSU5FXG5cbi8vIHdpbmRvdyBtYXkgYmUgdW5kZWZpbmVkIHdoZW4gZmlyc3QgbG9hZCBlbmdpbmUgZnJvbSBlZGl0b3JcbnZhciBfZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbi8qKlxuICogISNlblxuICogVGhlIG1haW4gbmFtZXNwYWNlIG9mIENvY29zMmQtSlMsIGFsbCBlbmdpbmUgY29yZSBjbGFzc2VzLCBmdW5jdGlvbnMsIHByb3BlcnRpZXMgYW5kIGNvbnN0YW50cyBhcmUgZGVmaW5lZCBpbiB0aGlzIG5hbWVzcGFjZS5cbiAqICEjemhcbiAqIENvY29zIOW8leaTjueahOS4u+imgeWRveWQjeepuumXtO+8jOW8leaTjuS7o+eggeS4reaJgOacieeahOexu++8jOWHveaVsO+8jOWxnuaAp+WSjOW4uOmHj+mDveWcqOi/meS4quWRveWQjeepuumXtOS4reWumuS5ieOAglxuICogQG1vZHVsZSBjY1xuICogQG1haW4gY2NcbiAqL1xuX2dsb2JhbC5jYyA9IF9nbG9iYWwuY2MgfHwge307XG5cbi8vIEZvciBpbnRlcm5hbCB1c2FnZVxuY2MuaW50ZXJuYWwgPSBjYy5pbnRlcm5hbCB8fCB7fTtcblxucmVxdWlyZSgnLi9wcmVkZWZpbmUnKTtcblxuLy8gcG9seWZpbGxzXG5yZXF1aXJlKCcuL3BvbHlmaWxsL3N0cmluZycpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbC9taXNjJyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxsL2FycmF5Jyk7XG5yZXF1aXJlKCcuL3BvbHlmaWxsL29iamVjdCcpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbC9hcnJheS1idWZmZXInKTtcbnJlcXVpcmUoJy4vcG9seWZpbGwvbnVtYmVyJyk7XG5pZiAoIShDQ19FRElUT1IgJiYgRWRpdG9yLmlzTWFpblByb2Nlc3MpKSB7XG4gICAgcmVxdWlyZSgnLi9wb2x5ZmlsbC90eXBlc2NyaXB0Jyk7XG59XG5cbnJlcXVpcmUoJy4vY29jb3MyZC9jb3JlL3ByZWRlZmluZScpO1xuXG4vLyBMT0FEIENPQ09TMkQgRU5HSU5FIENPREVcblxuaWYgKCEoQ0NfRURJVE9SICYmIEVkaXRvci5pc01haW5Qcm9jZXNzKSkge1xuICAgIHJlcXVpcmUoJy4vY29jb3MyZCcpO1xufVxuXG4vLyBMT0FEIEVYVEVORFNcblxucmVxdWlyZSgnLi9leHRlbmRzJyk7XG5cbmlmIChDQ19FRElUT1IpIHtcbiAgICBpZiAoRWRpdG9yLmlzTWFpblByb2Nlc3MpIHtcbiAgICAgICAgRWRpdG9yLnZlcnNpb25zWydjb2NvczJkJ10gPSByZXF1aXJlKCcuL3BhY2thZ2UnKS52ZXJzaW9uO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2xvYmFsLmNjOyJdLCJzb3VyY2VSb290IjoiLyJ9