
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/assets/CCSceneAsset.js';
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

/**
 * !#en Class for scene handling.
 * !#zh 场景资源类。
 * @class SceneAsset
 * @extends Asset
 *
 */
var Scene = cc.Class({
  name: 'cc.SceneAsset',
  "extends": cc.Asset,
  properties: {
    /**
     * @property {Scene} scene
     * @default null
     */
    scene: null,

    /**
     * !#en Indicates the raw assets of this scene can be load after scene launched.
     * !#zh 指示该场景依赖的资源可否在场景切换后再延迟加载。
     * @property {Boolean} asyncLoadAssets
     * @default false
     */
    asyncLoadAssets: undefined //// backup prefab assets in editor
    //// {string} assetUuid: {cc.Node} rootInPrefab
    //_prefabDatas: {
    //    default: null,
    //    editorOnly: true
    //}

  }
});
cc.SceneAsset = Scene;
module.exports = Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0cy9DQ1NjZW5lQXNzZXQuanMiXSwibmFtZXMiOlsiU2NlbmUiLCJjYyIsIkNsYXNzIiwibmFtZSIsIkFzc2V0IiwicHJvcGVydGllcyIsInNjZW5lIiwiYXN5bmNMb2FkQXNzZXRzIiwidW5kZWZpbmVkIiwiU2NlbmVBc3NldCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkE7Ozs7Ozs7QUFPQSxJQUFJQSxLQUFLLEdBQUdDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ2pCQyxFQUFBQSxJQUFJLEVBQUUsZUFEVztBQUVqQixhQUFTRixFQUFFLENBQUNHLEtBRks7QUFJakJDLEVBQUFBLFVBQVUsRUFBRTtBQUVSOzs7O0FBSUFDLElBQUFBLEtBQUssRUFBRSxJQU5DOztBQVFSOzs7Ozs7QUFNQUMsSUFBQUEsZUFBZSxFQUFFQyxTQWRULENBZ0JSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFyQlE7QUFKSyxDQUFULENBQVo7QUE2QkFQLEVBQUUsQ0FBQ1EsVUFBSCxHQUFnQlQsS0FBaEI7QUFDQVUsTUFBTSxDQUFDQyxPQUFQLEdBQWlCWCxLQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuIENsYXNzIGZvciBzY2VuZSBoYW5kbGluZy5cbiAqICEjemgg5Zy65pmv6LWE5rqQ57G744CCXG4gKiBAY2xhc3MgU2NlbmVBc3NldFxuICogQGV4dGVuZHMgQXNzZXRcbiAqXG4gKi9cbnZhciBTY2VuZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2NlbmVBc3NldCcsXG4gICAgZXh0ZW5kczogY2MuQXNzZXQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U2NlbmV9IHNjZW5lXG4gICAgICAgICAqIEBkZWZhdWx0IG51bGxcbiAgICAgICAgICovXG4gICAgICAgIHNjZW5lOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIEluZGljYXRlcyB0aGUgcmF3IGFzc2V0cyBvZiB0aGlzIHNjZW5lIGNhbiBiZSBsb2FkIGFmdGVyIHNjZW5lIGxhdW5jaGVkLlxuICAgICAgICAgKiAhI3poIOaMh+ekuuivpeWcuuaZr+S+nei1lueahOi1hOa6kOWPr+WQpuWcqOWcuuaZr+WIh+aNouWQjuWGjeW7tui/n+WKoOi9veOAglxuICAgICAgICAgKiBAcHJvcGVydHkge0Jvb2xlYW59IGFzeW5jTG9hZEFzc2V0c1xuICAgICAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAgICAgKi9cbiAgICAgICAgYXN5bmNMb2FkQXNzZXRzOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8vLyBiYWNrdXAgcHJlZmFiIGFzc2V0cyBpbiBlZGl0b3JcbiAgICAgICAgLy8vLyB7c3RyaW5nfSBhc3NldFV1aWQ6IHtjYy5Ob2RlfSByb290SW5QcmVmYWJcbiAgICAgICAgLy9fcHJlZmFiRGF0YXM6IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgZWRpdG9yT25seTogdHJ1ZVxuICAgICAgICAvL31cbiAgICB9LFxufSk7XG5cbmNjLlNjZW5lQXNzZXQgPSBTY2VuZTtcbm1vZHVsZS5leHBvcnRzID0gU2NlbmU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==