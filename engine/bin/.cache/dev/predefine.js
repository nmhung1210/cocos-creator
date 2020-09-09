
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/predefine.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
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
// MACROS

/**
 * !#zh
 * 这里是一些用来判断执行环境的宏，这些宏都是全局变量，直接访问即可。<br>
 * 在项目构建时，这些宏将会被预处理并根据构建的平台剔除不需要的代码，例如
 *
 *     if (CC_DEBUG) {
 *         cc.log('debug');
 *     }
 *     else {
 *         cc.log('release');
 *     }
 *
 * 在构建后会只剩下
 *
 *     cc.log('release');
 *
 * <br>
 * 如需判断脚本是否运行于指定平台，可以用如下表达式：
 *
 *     {
 *         "编辑器":  CC_EDITOR,
 *         "编辑器 或 预览":  CC_DEV,
 *         "编辑器 或 预览 或 构建调试":  CC_DEBUG,
 *         "网页预览":  CC_PREVIEW && !CC_JSB,
 *         "模拟器预览":  CC_PREVIEW && CC_JSB,
 *         "构建调试":  CC_BUILD && CC_DEBUG,
 *         "构建发行":  CC_BUILD && !CC_DEBUG,
 *     }
 *
 * !#en
 * Here are some of the macro used to determine the execution environment, these macros are global variables, can be accessed directly.<br>
 * When the project is built, these macros will be preprocessed and discard unreachable code based on the built platform, for example:
 *
 *     if (CC_DEBUG) {
 *         cc.log('debug');
 *     }
 *     else {
 *         cc.log('release');
 *     }
 *
 * After build will become:
 *
 *     cc.log('release');
 *
 * <br>
 * To determine whether the script is running on the specified platform, you can use the following expression:
 *
 *     {
 *         "editor":  CC_EDITOR,
 *         "editor or preview":  CC_DEV,
 *         "editor or preview or build in debug mode":  CC_DEBUG,
 *         "web preview":  CC_PREVIEW && !CC_JSB,
 *         "simulator preview":  CC_PREVIEW && CC_JSB,
 *         "build in debug mode":  CC_BUILD && CC_DEBUG,
 *         "build in release mode":  CC_BUILD && !CC_DEBUG,
 *     }
 *
 * @module GLOBAL-MACROS
 */

/**
 * @property {Boolean} CC_EDITOR - Running in the editor.
 */

/**
 * @property {Boolean} CC_PREVIEW - Preview in browser or simulator.
 */

/**
 * @property {Boolean} CC_DEV - Running in the editor or preview.
 */

/**
 * @property {Boolean} CC_DEBUG - Running in the editor or preview, or build in debug mode.
 */

/**
 * @property {Boolean} CC_BUILD - Running in published project.
 */

/**
 * @property {Boolean} CC_JSB - Running in native platform (mobile app, desktop app, or simulator).
 */

/**
 * @property {Boolean} CC_TEST - Running in the engine's unit test.
 */

/**
 * @property {Boolean} CC_RUNTIME - Running in runtime environments.
 */
// window may be undefined when first load engine from editor
var _global = typeof window === 'undefined' ? global : window;
/*
 * @param defaultValue - The default value is only used in the editor or preview.
 */


function defineMacro(name, defaultValue) {
  // if "global_defs" not preprocessed by uglify, just declare them globally,
  // this may happened in release version's preview page.
  if (typeof _global[name] === 'undefined') {
    _global[name] = defaultValue;
  }
}

function defineDeprecatedMacroGetter(name, defaultValue) {
  if (typeof _global[name] === 'undefined') {
    Object.defineProperty(_global, name, {
      get: function get() {
        var recommandedUsage;

        if (name === 'CC_WECHATGAMESUB') {
          recommandedUsage = 'cc.sys.platform === cc.sys.WECHAT_GAME_SUB';
        } else if (name === 'CC_WECHATGAME') {
          recommandedUsage = 'cc.sys.platform === cc.sys.WECHAT_GAME';
        } else if (name === 'CC_QQPLAY') {
          recommandedUsage = 'cc.sys.platform === cc.sys.QQ_PLAY';
        }

        cc.warnID(1400, name, recommandedUsage);
        return defaultValue;
      }
    });
  }
}

function defined(name) {
  return typeof _global[name] === 'object';
} // ensure CC_BUILD is defined
// should not use window.CC_BUILD because we need get global_defs defined in uglify


defineMacro('CC_BUILD', false); // These default values can only be defined after building
// If you need to modify them
// please modify the `global_defs` in the option returned by `gulp/util/utils.js: getUglifyOptions`.

if (CC_BUILD) {
  _global.CC_BUILD = CC_BUILD;
  _global.CC_DEV = CC_DEV;
  _global.CC_DEBUG = CC_DEBUG;
  _global.CC_JSB = CC_JSB;
  _global.CC_NATIVERENDERER = CC_NATIVERENDERER;
  _global.CC_SUPPORT_JIT = CC_SUPPORT_JIT;
  _global.CC_PHYSICS_BUILTIN = CC_PHYSICS_BUILTIN;
  _global.CC_PHYSICS_CANNON = CC_PHYSICS_CANNON;
  _global.CC_EDITOR = CC_EDITOR;
  _global.CC_PREVIEW = CC_PREVIEW;
  _global.CC_TEST = CC_TEST;
  _global.CC_RUNTIME = CC_RUNTIME;
  _global.CC_JSB = CC_JSB;
} else {
  defineMacro('CC_DEV', true); // (CC_EDITOR && !CC_BUILD) || CC_PREVIEW || CC_TEST

  defineMacro('CC_DEBUG', true); // CC_DEV || Debug Build

  defineMacro('CC_JSB', defined('jsb'));
  defineMacro('CC_NATIVERENDERER', defined('jsb'));
  defineMacro('CC_SUPPORT_JIT', true);
  defineMacro('CC_PHYSICS_BUILTIN', false);
  defineMacro('CC_PHYSICS_CANNON', true);
  defineMacro('CC_EDITOR', defined('Editor') && defined('process') && 'electron' in process.versions);
  defineMacro('CC_PREVIEW', !CC_EDITOR);
  defineMacro('CC_TEST', defined('tap') || defined('QUnit'));
  defineMacro('CC_RUNTIME', 'function' === typeof loadRuntime);
  defineMacro('CC_JSB', defined('jsb') && !CC_RUNTIME);
} // deprecated 


var WECHATGAMESUB = !!(defined('wx') && wx.getSharedCanvas);
var WECHATGAME = !!(defined('wx') && (wx.getSystemInfoSync || wx.getSharedCanvas));
var QQPLAY = defined('bk');
defineDeprecatedMacroGetter('CC_WECHATGAMESUB', WECHATGAMESUB);
defineDeprecatedMacroGetter('CC_WECHATGAME', WECHATGAME);
defineDeprecatedMacroGetter('CC_QQPLAY', QQPLAY);

if (CC_DEV) {
  /**
   * contains internal apis for unit tests
   * @expose
   */
  cc._Test = {};
}
/**
 * @module cc
 */

/**
 * The current version of Cocos2d being used.<br/>
 * Please DO NOT remove this String, it is an important flag for bug tracking.<br/>
 * If you post a bug to forum, please attach this flag.
 * @property {String} ENGINE_VERSION
 */


var engineVersion = '2.4.1';
_global['CocosEngine'] = cc.ENGINE_VERSION = engineVersion;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvcHJlZGVmaW5lLmpzIl0sIm5hbWVzIjpbIl9nbG9iYWwiLCJ3aW5kb3ciLCJnbG9iYWwiLCJkZWZpbmVNYWNybyIsIm5hbWUiLCJkZWZhdWx0VmFsdWUiLCJkZWZpbmVEZXByZWNhdGVkTWFjcm9HZXR0ZXIiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInJlY29tbWFuZGVkVXNhZ2UiLCJjYyIsIndhcm5JRCIsImRlZmluZWQiLCJDQ19CVUlMRCIsIkNDX0RFViIsIkNDX0RFQlVHIiwiQ0NfSlNCIiwiQ0NfTkFUSVZFUkVOREVSRVIiLCJDQ19TVVBQT1JUX0pJVCIsIkNDX1BIWVNJQ1NfQlVJTFRJTiIsIkNDX1BIWVNJQ1NfQ0FOTk9OIiwiQ0NfRURJVE9SIiwiQ0NfUFJFVklFVyIsIkNDX1RFU1QiLCJDQ19SVU5USU1FIiwicHJvY2VzcyIsInZlcnNpb25zIiwibG9hZFJ1bnRpbWUiLCJXRUNIQVRHQU1FU1VCIiwid3giLCJnZXRTaGFyZWRDYW52YXMiLCJXRUNIQVRHQU1FIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJRUVBMQVkiLCJfVGVzdCIsImVuZ2luZVZlcnNpb24iLCJFTkdJTkVfVkVSU0lPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJEQTs7OztBQUdBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUdBOzs7O0FBR0E7Ozs7QUFHQTs7OztBQUdBOzs7QUFJQTtBQUNBLElBQUlBLE9BQU8sR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxNQUFoQyxHQUF5Q0QsTUFBdkQ7QUFFQTs7Ozs7QUFHQSxTQUFTRSxXQUFULENBQXNCQyxJQUF0QixFQUE0QkMsWUFBNUIsRUFBMEM7QUFDdEM7QUFDQTtBQUNBLE1BQUksT0FBT0ws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LGFBQTdDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHBzOi8vd3d3LmNvY29zLmNvbS9cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGVuZ2luZSBzb3VyY2UgY29kZSAodGhlIFwiU29mdHdhcmVcIiksIGEgbGltaXRlZCxcbiB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiBub3QgdXNlIENvY29zIENyZWF0b3Igc29mdHdhcmUgZm9yIGRldmVsb3Bpbmcgb3RoZXIgc29mdHdhcmUgb3IgdG9vbHMgdGhhdCdzXG4gdXNlZCBmb3IgZGV2ZWxvcGluZyBnYW1lcy4gWW91IGFyZSBub3QgZ3JhbnRlZCB0byBwdWJsaXNoLCBkaXN0cmlidXRlLFxuIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLy8gTUFDUk9TXG5cbi8qKlxuICogISN6aFxuICog6L+Z6YeM5piv5LiA5Lqb55So5p2l5Yik5pat5omn6KGM546v5aKD55qE5a6P77yM6L+Z5Lqb5a6P6YO95piv5YWo5bGA5Y+Y6YeP77yM55u05o6l6K6/6Zeu5Y2z5Y+v44CCPGJyPlxuICog5Zyo6aG555uu5p6E5bu65pe277yM6L+Z5Lqb5a6P5bCG5Lya6KKr6aKE5aSE55CG5bm25qC55o2u5p6E5bu655qE5bmz5Y+w5YmU6Zmk5LiN6ZyA6KaB55qE5Luj56CB77yM5L6L5aaCXG4gKlxuICogICAgIGlmIChDQ19ERUJVRykge1xuICogICAgICAgICBjYy5sb2coJ2RlYnVnJyk7XG4gKiAgICAgfVxuICogICAgIGVsc2Uge1xuICogICAgICAgICBjYy5sb2coJ3JlbGVhc2UnKTtcbiAqICAgICB9XG4gKlxuICog5Zyo5p6E5bu65ZCO5Lya5Y+q5Ymp5LiLXG4gKlxuICogICAgIGNjLmxvZygncmVsZWFzZScpO1xuICpcbiAqIDxicj5cbiAqIOWmgumcgOWIpOaWreiEmuacrOaYr+WQpui/kOihjOS6juaMh+WumuW5s+WPsO+8jOWPr+S7peeUqOWmguS4i+ihqOi+vuW8j++8mlxuICpcbiAqICAgICB7XG4gKiAgICAgICAgIFwi57yW6L6R5ZmoXCI6ICBDQ19FRElUT1IsXG4gKiAgICAgICAgIFwi57yW6L6R5ZmoIOaIliDpooTop4hcIjogIENDX0RFVixcbiAqICAgICAgICAgXCLnvJbovpHlmagg5oiWIOmihOiniCDmiJYg5p6E5bu66LCD6K+VXCI6ICBDQ19ERUJVRyxcbiAqICAgICAgICAgXCLnvZHpobXpooTop4hcIjogIENDX1BSRVZJRVcgJiYgIUNDX0pTQixcbiAqICAgICAgICAgXCLmqKHmi5/lmajpooTop4hcIjogIENDX1BSRVZJRVcgJiYgQ0NfSlNCLFxuICogICAgICAgICBcIuaehOW7uuiwg+ivlVwiOiAgQ0NfQlVJTEQgJiYgQ0NfREVCVUcsXG4gKiAgICAgICAgIFwi5p6E5bu65Y+R6KGMXCI6ICBDQ19CVUlMRCAmJiAhQ0NfREVCVUcsXG4gKiAgICAgfVxuICpcbiAqICEjZW5cbiAqIEhlcmUgYXJlIHNvbWUgb2YgdGhlIG1hY3JvIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBleGVjdXRpb24gZW52aXJvbm1lbnQsIHRoZXNlIG1hY3JvcyBhcmUgZ2xvYmFsIHZhcmlhYmxlcywgY2FuIGJlIGFjY2Vzc2VkIGRpcmVjdGx5Ljxicj5cbiAqIFdoZW4gdGhlIHByb2plY3QgaXMgYnVpbHQsIHRoZXNlIG1hY3JvcyB3aWxsIGJlIHByZXByb2Nlc3NlZCBhbmQgZGlzY2FyZCB1bnJlYWNoYWJsZSBjb2RlIGJhc2VkIG9uIHRoZSBidWlsdCBwbGF0Zm9ybSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICAgIGlmIChDQ19ERUJVRykge1xuICogICAgICAgICBjYy5sb2coJ2RlYnVnJyk7XG4gKiAgICAgfVxuICogICAgIGVsc2Uge1xuICogICAgICAgICBjYy5sb2coJ3JlbGVhc2UnKTtcbiAqICAgICB9XG4gKlxuICogQWZ0ZXIgYnVpbGQgd2lsbCBiZWNvbWU6XG4gKlxuICogICAgIGNjLmxvZygncmVsZWFzZScpO1xuICpcbiAqIDxicj5cbiAqIFRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBzY3JpcHQgaXMgcnVubmluZyBvbiB0aGUgc3BlY2lmaWVkIHBsYXRmb3JtLCB5b3UgY2FuIHVzZSB0aGUgZm9sbG93aW5nIGV4cHJlc3Npb246XG4gKlxuICogICAgIHtcbiAqICAgICAgICAgXCJlZGl0b3JcIjogIENDX0VESVRPUixcbiAqICAgICAgICAgXCJlZGl0b3Igb3IgcHJldmlld1wiOiAgQ0NfREVWLFxuICogICAgICAgICBcImVkaXRvciBvciBwcmV2aWV3IG9yIGJ1aWxkIGluIGRlYnVnIG1vZGVcIjogIENDX0RFQlVHLFxuICogICAgICAgICBcIndlYiBwcmV2aWV3XCI6ICBDQ19QUkVWSUVXICYmICFDQ19KU0IsXG4gKiAgICAgICAgIFwic2ltdWxhdG9yIHByZXZpZXdcIjogIENDX1BSRVZJRVcgJiYgQ0NfSlNCLFxuICogICAgICAgICBcImJ1aWxkIGluIGRlYnVnIG1vZGVcIjogIENDX0JVSUxEICYmIENDX0RFQlVHLFxuICogICAgICAgICBcImJ1aWxkIGluIHJlbGVhc2UgbW9kZVwiOiAgQ0NfQlVJTEQgJiYgIUNDX0RFQlVHLFxuICogICAgIH1cbiAqXG4gKiBAbW9kdWxlIEdMT0JBTC1NQUNST1NcbiAqL1xuLyoqXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IENDX0VESVRPUiAtIFJ1bm5pbmcgaW4gdGhlIGVkaXRvci5cbiAqL1xuLyoqXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IENDX1BSRVZJRVcgLSBQcmV2aWV3IGluIGJyb3dzZXIgb3Igc2ltdWxhdG9yLlxuICovXG4vKipcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gQ0NfREVWIC0gUnVubmluZyBpbiB0aGUgZWRpdG9yIG9yIHByZXZpZXcuXG4gKi9cbi8qKlxuICogQHByb3BlcnR5IHtCb29sZWFufSBDQ19ERUJVRyAtIFJ1bm5pbmcgaW4gdGhlIGVkaXRvciBvciBwcmV2aWV3LCBvciBidWlsZCBpbiBkZWJ1ZyBtb2RlLlxuICovXG4vKipcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gQ0NfQlVJTEQgLSBSdW5uaW5nIGluIHB1Ymxpc2hlZCBwcm9qZWN0LlxuICovXG4vKipcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gQ0NfSlNCIC0gUnVubmluZyBpbiBuYXRpdmUgcGxhdGZvcm0gKG1vYmlsZSBhcHAsIGRlc2t0b3AgYXBwLCBvciBzaW11bGF0b3IpLlxuICovXG4vKipcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gQ0NfVEVTVCAtIFJ1bm5pbmcgaW4gdGhlIGVuZ2luZSdzIHVuaXQgdGVzdC5cbiAqL1xuLyoqXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IENDX1JVTlRJTUUgLSBSdW5uaW5nIGluIHJ1bnRpbWUgZW52aXJvbm1lbnRzLlxuICovXG5cbi8vIHdpbmRvdyBtYXkgYmUgdW5kZWZpbmVkIHdoZW4gZmlyc3QgbG9hZCBlbmdpbmUgZnJvbSBlZGl0b3JcbnZhciBfZ2xvYmFsID0gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB3aW5kb3c7XG5cbi8qXG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIC0gVGhlIGRlZmF1bHQgdmFsdWUgaXMgb25seSB1c2VkIGluIHRoZSBlZGl0b3Igb3IgcHJldmlldy5cbiAqL1xuZnVuY3Rpb24gZGVmaW5lTWFjcm8gKG5hbWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIC8vIGlmIFwiZ2xvYmFsX2RlZnNcIiBub3QgcHJlcHJvY2Vzc2VkIGJ5IHVnbGlmeSwganVzdCBkZWNsYXJlIHRoZW0gZ2xvYmFsbHksXG4gICAgLy8gdGhpcyBtYXkgaGFwcGVuZWQgaW4gcmVsZWFzZSB2ZXJzaW9uJ3MgcHJldmlldyBwYWdlLlxuICAgIGlmICh0eXBlb2YgX2dsb2JhbFtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgX2dsb2JhbFtuYW1lXSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlZmluZURlcHJlY2F0ZWRNYWNyb0dldHRlciAobmFtZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBfZ2xvYmFsW25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2dsb2JhbCwgbmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlY29tbWFuZGVkVXNhZ2U7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdDQ19XRUNIQVRHQU1FU1VCJykge1xuICAgICAgICAgICAgICAgICAgICByZWNvbW1hbmRlZFVzYWdlID0gJ2NjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FX1NVQic7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUgPT09ICdDQ19XRUNIQVRHQU1FJykge1xuICAgICAgICAgICAgICAgICAgICByZWNvbW1hbmRlZFVzYWdlID0gJ2NjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLldFQ0hBVF9HQU1FJzsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChuYW1lID09PSAnQ0NfUVFQTEFZJykge1xuICAgICAgICAgICAgICAgICAgICByZWNvbW1hbmRlZFVzYWdlID0gJ2NjLnN5cy5wbGF0Zm9ybSA9PT0gY2Muc3lzLlFRX1BMQVknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTQwMCwgbmFtZSwgcmVjb21tYW5kZWRVc2FnZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVkIChuYW1lKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBfZ2xvYmFsW25hbWVdID09PSAnb2JqZWN0Jztcbn1cblxuLy8gZW5zdXJlIENDX0JVSUxEIGlzIGRlZmluZWRcbi8vIHNob3VsZCBub3QgdXNlIHdpbmRvdy5DQ19CVUlMRCBiZWNhdXNlIHdlIG5lZWQgZ2V0IGdsb2JhbF9kZWZzIGRlZmluZWQgaW4gdWdsaWZ5XG5kZWZpbmVNYWNybygnQ0NfQlVJTEQnLCBmYWxzZSk7XG5cbi8vIFRoZXNlIGRlZmF1bHQgdmFsdWVzIGNhbiBvbmx5IGJlIGRlZmluZWQgYWZ0ZXIgYnVpbGRpbmdcbi8vIElmIHlvdSBuZWVkIHRvIG1vZGlmeSB0aGVtXG4vLyBwbGVhc2UgbW9kaWZ5IHRoZSBgZ2xvYmFsX2RlZnNgIGluIHRoZSBvcHRpb24gcmV0dXJuZWQgYnkgYGd1bHAvdXRpbC91dGlscy5qczogZ2V0VWdsaWZ5T3B0aW9uc2AuXG5pZiAoQ0NfQlVJTEQpIHtcbiAgICBfZ2xvYmFsLkNDX0JVSUxEID0gQ0NfQlVJTEQ7XG4gICAgX2dsb2JhbC5DQ19ERVYgPSBDQ19ERVY7XG4gICAgX2dsb2JhbC5DQ19ERUJVRyA9IENDX0RFQlVHO1xuICAgIF9nbG9iYWwuQ0NfSlNCID0gQ0NfSlNCO1xuICAgIF9nbG9iYWwuQ0NfTkFUSVZFUkVOREVSRVIgPSBDQ19OQVRJVkVSRU5ERVJFUjtcbiAgICBfZ2xvYmFsLkNDX1NVUFBPUlRfSklUID0gQ0NfU1VQUE9SVF9KSVQ7XG4gICAgX2dsb2JhbC5DQ19QSFlTSUNTX0JVSUxUSU4gPSBDQ19QSFlTSUNTX0JVSUxUSU47XG4gICAgX2dsb2JhbC5DQ19QSFlTSUNTX0NBTk5PTiA9IENDX1BIWVNJQ1NfQ0FOTk9OO1xuICAgIF9nbG9iYWwuQ0NfRURJVE9SID0gQ0NfRURJVE9SO1xuICAgIF9nbG9iYWwuQ0NfUFJFVklFVyA9IENDX1BSRVZJRVc7XG4gICAgX2dsb2JhbC5DQ19URVNUID0gQ0NfVEVTVDtcbiAgICBfZ2xvYmFsLkNDX1JVTlRJTUUgPSBDQ19SVU5USU1FO1xuICAgIF9nbG9iYWwuQ0NfSlNCID0gQ0NfSlNCO1xufVxuZWxzZSB7XG4gICAgZGVmaW5lTWFjcm8oJ0NDX0RFVicsIHRydWUpOyAgICAvLyAoQ0NfRURJVE9SICYmICFDQ19CVUlMRCkgfHwgQ0NfUFJFVklFVyB8fCBDQ19URVNUXG4gICAgZGVmaW5lTWFjcm8oJ0NDX0RFQlVHJywgdHJ1ZSk7ICAvLyBDQ19ERVYgfHwgRGVidWcgQnVpbGRcbiAgICBkZWZpbmVNYWNybygnQ0NfSlNCJywgZGVmaW5lZCgnanNiJykpO1xuICAgIGRlZmluZU1hY3JvKCdDQ19OQVRJVkVSRU5ERVJFUicsIGRlZmluZWQoJ2pzYicpKTtcbiAgICBkZWZpbmVNYWNybygnQ0NfU1VQUE9SVF9KSVQnLCB0cnVlKTtcbiAgICBkZWZpbmVNYWNybygnQ0NfUEhZU0lDU19CVUlMVElOJywgZmFsc2UpO1xuICAgIGRlZmluZU1hY3JvKCdDQ19QSFlTSUNTX0NBTk5PTicsIHRydWUpO1xuICAgIGRlZmluZU1hY3JvKCdDQ19FRElUT1InLCBkZWZpbmVkKCdFZGl0b3InKSAmJiBkZWZpbmVkKCdwcm9jZXNzJykgJiYgKCdlbGVjdHJvbicgaW4gcHJvY2Vzcy52ZXJzaW9ucykpO1xuICAgIGRlZmluZU1hY3JvKCdDQ19QUkVWSUVXJywgIUNDX0VESVRPUik7XG4gICAgZGVmaW5lTWFjcm8oJ0NDX1RFU1QnLCBkZWZpbmVkKCd0YXAnKSB8fCBkZWZpbmVkKCdRVW5pdCcpKTtcbiAgICBkZWZpbmVNYWNybygnQ0NfUlVOVElNRScsICdmdW5jdGlvbicgPT09IHR5cGVvZiBsb2FkUnVudGltZSk7XG4gICAgZGVmaW5lTWFjcm8oJ0NDX0pTQicsIGRlZmluZWQoJ2pzYicpICYmICFDQ19SVU5USU1FKTtcbn1cblxuLy8gZGVwcmVjYXRlZCBcbmNvbnN0IFdFQ0hBVEdBTUVTVUIgPSAhIShkZWZpbmVkKCd3eCcpICYmIHd4LmdldFNoYXJlZENhbnZhcyk7XG5jb25zdCBXRUNIQVRHQU1FID0gISEoZGVmaW5lZCgnd3gnKSAmJiAod3guZ2V0U3lzdGVtSW5mb1N5bmMgfHwgd3guZ2V0U2hhcmVkQ2FudmFzKSk7XG5jb25zdCBRUVBMQVkgPSBkZWZpbmVkKCdiaycpO1xuZGVmaW5lRGVwcmVjYXRlZE1hY3JvR2V0dGVyKCdDQ19XRUNIQVRHQU1FU1VCJywgV0VDSEFUR0FNRVNVQik7XG5kZWZpbmVEZXByZWNhdGVkTWFjcm9HZXR0ZXIoJ0NDX1dFQ0hBVEdBTUUnLCBXRUNIQVRHQU1FKTtcbmRlZmluZURlcHJlY2F0ZWRNYWNyb0dldHRlcignQ0NfUVFQTEFZJywgUVFQTEFZKTtcblxuaWYgKENDX0RFVikge1xuICAgIC8qKlxuICAgICAqIGNvbnRhaW5zIGludGVybmFsIGFwaXMgZm9yIHVuaXQgdGVzdHNcbiAgICAgKiBAZXhwb3NlXG4gICAgICovXG4gICAgY2MuX1Rlc3QgPSB7fTtcbn1cblxuLyoqXG4gKiBAbW9kdWxlIGNjXG4gKi9cblxuLyoqXG4gKiBUaGUgY3VycmVudCB2ZXJzaW9uIG9mIENvY29zMmQgYmVpbmcgdXNlZC48YnIvPlxuICogUGxlYXNlIERPIE5PVCByZW1vdmUgdGhpcyBTdHJpbmcsIGl0IGlzIGFuIGltcG9ydGFudCBmbGFnIGZvciBidWcgdHJhY2tpbmcuPGJyLz5cbiAqIElmIHlvdSBwb3N0IGEgYnVnIHRvIGZvcnVtLCBwbGVhc2UgYXR0YWNoIHRoaXMgZmxhZy5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBFTkdJTkVfVkVSU0lPTlxuICovXG5jb25zdCBlbmdpbmVWZXJzaW9uID0gJzIuNC4xJztcbl9nbG9iYWxbJ0NvY29zRW5naW5lJ10gPSBjYy5FTkdJTkVfVkVSU0lPTiA9IGVuZ2luZVZlcnNpb247XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==