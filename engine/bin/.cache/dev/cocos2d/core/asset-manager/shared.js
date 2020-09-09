
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/shared.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

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
var Cache = require('./cache');

var Pipeline = require('./pipeline');

var assets = new Cache();
var files = new Cache();
var parsed = new Cache();
var bundles = new Cache();
var pipeline = new Pipeline('normal load', []);
var fetchPipeline = new Pipeline('fetch', []);
var transformPipeline = new Pipeline('transform url', []);
/**
 * @module cc.AssetManager
 */

var RequestType = {
  UUID: 'uuid',
  PATH: 'path',
  DIR: 'dir',
  URL: 'url',
  SCENE: 'scene'
};
/**
 * !#en
 * The builtin bundles 
 * 
 * !#zh
 * 内置 bundle
 * 
 * @enum BuiltinBundleName
 */

var BuiltinBundleName = {
  /**
   * !#en
   * The builtin bundle corresponds to 'assets/resources'.
   * 
   * !#zh
   * 内置 bundle, 对应 'assets/resources' 目录
   * 
   * @property RESOURCES
   * @readonly
   * @type {String}
   */
  RESOURCES: 'resources',

  /**
   * !#en
   * The builtin bundle corresponds to 'internal/resources'.
   * 
   * !#zh
   * 内置 bundle, 对应 'internal/resources' 目录
   * 
   * @property INTERNAL
   * @readonly
   * @type {String}
   */
  INTERNAL: 'internal',

  /**
   * !#en
   * The builtin bundle
   * 
   * !#zh
   * 内置 bundle
   * 
   * @property MAIN
   * @readonly
   * @type {String}
   */
  MAIN: 'main',

  /**
   * !#en
   * The builtin bundle, exists when Start Scene asset bundle is checked on the project building panel
   * 
   * !#zh
   * 内置 bundle, 如果构建面板开启了首场景分包，则会有 START_SCENE bundle
   * 
   * @property START_SCENE
   * @readonly
   * @type {String}
   */
  START_SCENE: 'start-scene'
};
module.exports = {
  assets: assets,
  files: files,
  parsed: parsed,
  pipeline: pipeline,
  fetchPipeline: fetchPipeline,
  transformPipeline: transformPipeline,
  RequestType: RequestType,
  bundles: bundles,
  BuiltinBundleName: BuiltinBundleName
};
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvc2hhcmVkLmpzIl0sIm5hbWVzIjpbIkNhY2hlIiwicmVxdWlyZSIsIlBpcGVsaW5lIiwiYXNzZXRzIiwiZmlsZXMiLCJwYXJzZWQiLCJidW5kbGVzIiwicGlwZWxpbmUiLCJmZXRjaFBpcGVsaW5lIiwidHJhbnNmb3JtUGlwZWxpbmUiLCJSZXF1ZXN0VHlwZSIsIlVVSUQiLCJQQVRIIiwiRElSIiwiVVJMIiwiU0NFTkUiLCJCdWlsdGluQnVuZGxlTmFtZSIsIlJFU09VUkNFUyIsIklOVEVSTkFMIiwiTUFJTiIsIlNUQVJUX1NDRU5FIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFNQyxRQUFRLEdBQUdELE9BQU8sQ0FBQyxZQUFELENBQXhCOztBQUVBLElBQUlFLE1BQU0sR0FBRyxJQUFJSCxLQUFKLEVBQWI7QUFDQSxJQUFJSSxLQUFLLEdBQUcsSUFBSUosS0FBSixFQUFaO0FBQ0EsSUFBSUssTUFBTSxHQUFHLElBQUlMLEtBQUosRUFBYjtBQUNBLElBQUlNLE9BQU8sR0FBRyxJQUFJTixLQUFKLEVBQWQ7QUFDQSxJQUFJTyxRQUFRLEdBQUcsSUFBSUwsUUFBSixDQUFhLGFBQWIsRUFBNEIsRUFBNUIsQ0FBZjtBQUNBLElBQUlNLGFBQWEsR0FBRyxJQUFJTixRQUFKLENBQWEsT0FBYixFQUFzQixFQUF0QixDQUFwQjtBQUNBLElBQUlPLGlCQUFpQixHQUFHLElBQUlQLFFBQUosQ0FBYSxlQUFiLEVBQThCLEVBQTlCLENBQXhCO0FBRUE7Ozs7QUFJQSxJQUFJUSxXQUFXLEdBQUc7QUFFZEMsRUFBQUEsSUFBSSxFQUFFLE1BRlE7QUFJZEMsRUFBQUEsSUFBSSxFQUFFLE1BSlE7QUFNZEMsRUFBQUEsR0FBRyxFQUFFLEtBTlM7QUFRZEMsRUFBQUEsR0FBRyxFQUFFLEtBUlM7QUFVZEMsRUFBQUEsS0FBSyxFQUFFO0FBVk8sQ0FBbEI7QUFhQTs7Ozs7Ozs7OztBQVNBLElBQUlDLGlCQUFpQixHQUFHO0FBQ3BCOzs7Ozs7Ozs7OztBQVdBQyxFQUFBQSxTQUFTLEVBQUUsV0FaUzs7QUFjcEI7Ozs7Ozs7Ozs7O0FBV0FDLEVBQUFBLFFBQVEsRUFBRSxVQXpCVTs7QUEyQnBCOzs7Ozs7Ozs7OztBQVdBQyxFQUFBQSxJQUFJLEVBQUUsTUF0Q2M7O0FBd0NwQjs7Ozs7Ozs7Ozs7QUFXQUMsRUFBQUEsV0FBVyxFQUFFO0FBbkRPLENBQXhCO0FBc0RBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFBRW5CLEVBQUFBLE1BQU0sRUFBTkEsTUFBRjtBQUFVQyxFQUFBQSxLQUFLLEVBQUxBLEtBQVY7QUFBaUJDLEVBQUFBLE1BQU0sRUFBTkEsTUFBakI7QUFBeUJFLEVBQUFBLFFBQVEsRUFBUkEsUUFBekI7QUFBbUNDLEVBQUFBLGFBQWEsRUFBYkEsYUFBbkM7QUFBa0RDLEVBQUFBLGlCQUFpQixFQUFqQkEsaUJBQWxEO0FBQXFFQyxFQUFBQSxXQUFXLEVBQVhBLFdBQXJFO0FBQWtGSixFQUFBQSxPQUFPLEVBQVBBLE9BQWxGO0FBQTJGVSxFQUFBQSxpQkFBaUIsRUFBakJBO0FBQTNGLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTkgWGlhbWVuIFlhamkgU29mdHdhcmUgQ28uLCBMdGQuXG5cbiBodHRwczovL3d3dy5jb2Nvcy5jb20vXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBlbmdpbmUgc291cmNlIGNvZGUgKHRoZSBcIlNvZnR3YXJlXCIpLCBhIGxpbWl0ZWQsXG4gIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuICBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gIHVzZWQgZm9yIGRldmVsb3BpbmcgZ2FtZXMuIFlvdSBhcmUgbm90IGdyYW50ZWQgdG8gcHVibGlzaCwgZGlzdHJpYnV0ZSxcbiAgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY29uc3QgQ2FjaGUgPSByZXF1aXJlKCcuL2NhY2hlJyk7XG5jb25zdCBQaXBlbGluZSA9IHJlcXVpcmUoJy4vcGlwZWxpbmUnKTtcblxudmFyIGFzc2V0cyA9IG5ldyBDYWNoZSgpO1xudmFyIGZpbGVzID0gbmV3IENhY2hlKCk7XG52YXIgcGFyc2VkID0gbmV3IENhY2hlKCk7XG52YXIgYnVuZGxlcyA9IG5ldyBDYWNoZSgpO1xudmFyIHBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCdub3JtYWwgbG9hZCcsIFtdKTtcbnZhciBmZXRjaFBpcGVsaW5lID0gbmV3IFBpcGVsaW5lKCdmZXRjaCcsIFtdKTtcbnZhciB0cmFuc2Zvcm1QaXBlbGluZSA9IG5ldyBQaXBlbGluZSgndHJhbnNmb3JtIHVybCcsIFtdKTtcblxuLyoqXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxuICovXG5cbnZhciBSZXF1ZXN0VHlwZSA9IHtcbiAgICBcbiAgICBVVUlEOiAndXVpZCcsXG5cbiAgICBQQVRIOiAncGF0aCcsXG5cbiAgICBESVI6ICdkaXInLFxuXG4gICAgVVJMOiAndXJsJyxcblxuICAgIFNDRU5FOiAnc2NlbmUnXG59O1xuXG4vKipcbiAqICEjZW5cbiAqIFRoZSBidWlsdGluIGJ1bmRsZXMgXG4gKiBcbiAqICEjemhcbiAqIOWGhee9riBidW5kbGVcbiAqIFxuICogQGVudW0gQnVpbHRpbkJ1bmRsZU5hbWVcbiAqL1xudmFyIEJ1aWx0aW5CdW5kbGVOYW1lID0ge1xuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgYnVpbHRpbiBidW5kbGUgY29ycmVzcG9uZHMgdG8gJ2Fzc2V0cy9yZXNvdXJjZXMnLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlhoXnva4gYnVuZGxlLCDlr7nlupQgJ2Fzc2V0cy9yZXNvdXJjZXMnIOebruW9lVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBSRVNPVVJDRVNcbiAgICAgKiBAcmVhZG9ubHlcbiAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAqL1xuICAgIFJFU09VUkNFUzogJ3Jlc291cmNlcycsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGJ1aWx0aW4gYnVuZGxlIGNvcnJlc3BvbmRzIHRvICdpbnRlcm5hbC9yZXNvdXJjZXMnLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlhoXnva4gYnVuZGxlLCDlr7nlupQgJ2ludGVybmFsL3Jlc291cmNlcycg55uu5b2VXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IElOVEVSTkFMXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBJTlRFUk5BTDogJ2ludGVybmFsJyxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBUaGUgYnVpbHRpbiBidW5kbGVcbiAgICAgKiBcbiAgICAgKiAhI3poXG4gICAgICog5YaF572uIGJ1bmRsZVxuICAgICAqIFxuICAgICAqIEBwcm9wZXJ0eSBNQUlOXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBNQUlOOiAnbWFpbicsXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogVGhlIGJ1aWx0aW4gYnVuZGxlLCBleGlzdHMgd2hlbiBTdGFydCBTY2VuZSBhc3NldCBidW5kbGUgaXMgY2hlY2tlZCBvbiB0aGUgcHJvamVjdCBidWlsZGluZyBwYW5lbFxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDlhoXnva4gYnVuZGxlLCDlpoLmnpzmnoTlu7rpnaLmnb/lvIDlkK/kuobpppblnLrmma/liIbljIXvvIzliJnkvJrmnIkgU1RBUlRfU0NFTkUgYnVuZGxlXG4gICAgICogXG4gICAgICogQHByb3BlcnR5IFNUQVJUX1NDRU5FXG4gICAgICogQHJlYWRvbmx5XG4gICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgKi9cbiAgICBTVEFSVF9TQ0VORTogJ3N0YXJ0LXNjZW5lJyxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBhc3NldHMsIGZpbGVzLCBwYXJzZWQsIHBpcGVsaW5lLCBmZXRjaFBpcGVsaW5lLCB0cmFuc2Zvcm1QaXBlbGluZSwgUmVxdWVzdFR5cGUsIGJ1bmRsZXMsIEJ1aWx0aW5CdW5kbGVOYW1lIH07Il0sInNvdXJjZVJvb3QiOiIvIn0=