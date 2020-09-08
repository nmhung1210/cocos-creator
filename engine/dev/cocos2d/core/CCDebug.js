
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCDebug.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
var utils = require('./platform/utils');

var debugInfos = require('../../DebugInfos') || {};
var ERROR_MAP_URL = 'https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md'; // the html element displays log in web page (DebugMode.INFO_FOR_WEB_PAGE)

var logList;
/**
 * @module cc
 */

cc.log = cc.warn = cc.error = cc.assert = console.log.bind ? console.log.bind(console) : console.log;

var resetDebugSetting = function resetDebugSetting(mode) {
  // reset
  cc.log = cc.warn = cc.error = cc.assert = function () {};

  if (mode === DebugMode.NONE) return;

  if (mode > DebugMode.ERROR) {
    //log to web page
    var logToWebPage = function logToWebPage(msg) {
      if (!cc.game.canvas) return;

      if (!logList) {
        var logDiv = document.createElement("Div");
        logDiv.setAttribute("id", "logInfoDiv");
        logDiv.setAttribute("width", "200");
        logDiv.setAttribute("height", cc.game.canvas.height);
        var logDivStyle = logDiv.style;
        logDivStyle.zIndex = "99999";
        logDivStyle.position = "absolute";
        logDivStyle.top = logDivStyle.left = "0";
        logList = document.createElement("textarea");
        logList.setAttribute("rows", "20");
        logList.setAttribute("cols", "30");
        logList.setAttribute("disabled", "true");
        var logListStyle = logList.style;
        logListStyle.backgroundColor = "transparent";
        logListStyle.borderBottom = "1px solid #cccccc";
        logListStyle.borderTopWidth = logListStyle.borderLeftWidth = logListStyle.borderRightWidth = "0px";
        logListStyle.borderTopStyle = logListStyle.borderLeftStyle = logListStyle.borderRightStyle = "none";
        logListStyle.padding = "0px";
        logListStyle.margin = 0;
        logDiv.appendChild(logList);
        cc.game.canvas.parentNode.appendChild(logDiv);
      }

      logList.value = logList.value + msg + "\r\n";
      logList.scrollTop = logList.scrollHeight;
    };

    cc.error = function () {
      logToWebPage("ERROR :  " + cc.js.formatStr.apply(null, arguments));
    };

    cc.assert = function (cond, msg) {
      'use strict';

      if (!cond && msg) {
        msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
        logToWebPage("ASSERT: " + msg);
      }
    };

    if (mode !== DebugMode.ERROR_FOR_WEB_PAGE) {
      cc.warn = function () {
        logToWebPage("WARN :  " + cc.js.formatStr.apply(null, arguments));
      };
    }

    if (mode === DebugMode.INFO_FOR_WEB_PAGE) {
      cc.log = function () {
        logToWebPage(cc.js.formatStr.apply(null, arguments));
      };
    }
  } else if (console && console.log.apply) {
    //console is null when user doesn't open dev tool on IE9
    //log to console
    // For JSB
    if (!console.error) console.error = console.log;
    if (!console.warn) console.warn = console.log;
    /**
     * !#en
     * Outputs an error message to the Cocos Creator Console (editor) or Web Console (runtime).<br/>
     * - In Cocos Creator, error is red.<br/>
     * - In Chrome, error have a red icon along with red message text.<br/>
     * !#zh
     * 输出错误消息到 Cocos Creator 编辑器的 Console 或运行时页面端的 Console 中。<br/>
     * - 在 Cocos Creator 中，错误信息显示是红色的。<br/>
     * - 在 Chrome 中，错误信息有红色的图标以及红色的消息文本。<br/>
     *
     * @method error
     * @param {any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */

    if (CC_EDITOR) {
      cc.error = Editor.error;
    } else if (console.error.bind) {
      // use bind to avoid pollute call stacks
      cc.error = console.error.bind(console);
    } else {
      cc.error = CC_JSB || CC_RUNTIME ? console.error : function () {
        return console.error.apply(console, arguments);
      };
    }

    cc.assert = function (cond, msg) {
      if (!cond) {
        if (msg) {
          msg = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments));
        }

        if (CC_DEV) {
          debugger;
        }

        if (CC_TEST) {
          ok(false, msg);
        } else {
          throw new Error(msg);
        }
      }
    };
  }

  if (mode !== DebugMode.ERROR) {
    /**
     * !#en
     * Outputs a warning message to the Cocos Creator Console (editor) or Web Console (runtime).
     * - In Cocos Creator, warning is yellow.
     * - In Chrome, warning have a yellow warning icon with the message text.
     * !#zh
     * 输出警告消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。<br/>
     * - 在 Cocos Creator 中，警告信息显示是黄色的。<br/>
     * - 在 Chrome 中，警告信息有着黄色的图标以及黄色的消息文本。<br/>
     * @method warn
     * @param {any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */
    if (CC_EDITOR) {
      cc.warn = Editor.warn;
    } else if (console.warn.bind) {
      // use bind to avoid pollute call stacks
      cc.warn = console.warn.bind(console);
    } else {
      cc.warn = CC_JSB || CC_RUNTIME ? console.warn : function () {
        return console.warn.apply(console, arguments);
      };
    }
  }

  if (CC_EDITOR) {
    cc.log = Editor.log;
  } else if (mode === DebugMode.INFO) {
    /**
     * !#en Outputs a message to the Cocos Creator Console (editor) or Web Console (runtime).
     * !#zh 输出一条消息到 Cocos Creator 编辑器的 Console 或运行时 Web 端的 Console 中。
     * @method log
     * @param {String|any} msg - A JavaScript string containing zero or more substitution strings.
     * @param {any} ...subst - JavaScript objects with which to replace substitution strings within msg. This gives you additional control over the format of the output.
     */
    if (CC_JSB || CC_RUNTIME) {
      if (scriptEngineType === "JavaScriptCore") {
        // console.log has to use `console` as its context for iOS 8~9. Therefore, apply it.
        cc.log = function () {
          return console.log.apply(console, arguments);
        };
      } else {
        cc.log = console.log;
      }
    } else if (console.log.bind) {
      // use bind to avoid pollute call stacks
      cc.log = console.log.bind(console);
    } else {
      cc.log = function () {
        return console.log.apply(console, arguments);
      };
    }
  }
};

cc._throw = CC_EDITOR ? Editor.error : function (error) {
  utils.callInNextTick(function () {
    throw error;
  });
};

function getTypedFormatter(type) {
  return function () {
    var id = arguments[0];
    var msg = CC_DEBUG ? debugInfos[id] || 'unknown id' : type + " " + id + ", please go to " + ERROR_MAP_URL + "#" + id + " to see details.";

    if (arguments.length === 1) {
      return msg;
    } else if (arguments.length === 2) {
      return CC_DEBUG ? cc.js.formatStr(msg, arguments[1]) : msg + ' Arguments: ' + arguments[1];
    } else {
      var argsArray = cc.js.shiftArguments.apply(null, arguments);
      return CC_DEBUG ? cc.js.formatStr.apply(null, [msg].concat(argsArray)) : msg + ' Arguments: ' + argsArray.join(', ');
    }
  };
}

var logFormatter = getTypedFormatter('Log');

cc.logID = function () {
  cc.log(logFormatter.apply(null, arguments));
};

var warnFormatter = getTypedFormatter('Warning');

cc.warnID = function () {
  cc.warn(warnFormatter.apply(null, arguments));
};

var errorFormatter = getTypedFormatter('Error');

cc.errorID = function () {
  cc.error(errorFormatter.apply(null, arguments));
};

var assertFormatter = getTypedFormatter('Assert');

cc.assertID = function (cond) {
  'use strict';

  if (cond) {
    return;
  }

  cc.assert(false, assertFormatter.apply(null, cc.js.shiftArguments.apply(null, arguments)));
};
/**
* !#en Enum for debug modes.
* !#zh 调试模式
* @enum debug.DebugMode
* @memberof cc
 */


var DebugMode = cc.Enum({
  /**
   * !#en The debug mode none.
   * !#zh 禁止模式，禁止显示任何日志信息。
   * @property NONE
   * @type {Number}
   * @static
   */
  NONE: 0,

  /**
   * !#en The debug mode info.
   * !#zh 信息模式，在 console 中显示所有日志。
   * @property INFO
   * @type {Number}
   * @static
   */
  INFO: 1,

  /**
   * !#en The debug mode warn.
   * !#zh 警告模式，在 console 中只显示 warn 级别以上的（包含 error）日志。
   * @property WARN
   * @type {Number}
   * @static
   */
  WARN: 2,

  /**
   * !#en The debug mode error.
   * !#zh 错误模式，在 console 中只显示 error 日志。
   * @property ERROR
   * @type {Number}
   * @static
   */
  ERROR: 3,

  /**
   * !#en The debug mode info for web page.
   * !#zh 信息模式（仅 WEB 端有效），在画面上输出所有信息。
   * @property INFO_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  INFO_FOR_WEB_PAGE: 4,

  /**
   * !#en The debug mode warn for web page.
   * !#zh 警告模式（仅 WEB 端有效），在画面上输出 warn 级别以上的（包含 error）信息。
   * @property WARN_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  WARN_FOR_WEB_PAGE: 5,

  /**
   * !#en The debug mode error for web page.
   * !#zh 错误模式（仅 WEB 端有效），在画面上输出 error 信息。
   * @property ERROR_FOR_WEB_PAGE
   * @type {Number}
   * @static
   */
  ERROR_FOR_WEB_PAGE: 6
});
/**
 * !#en An object to boot the game.
 * !#zh 包含游戏主体信息并负责驱动游戏的游戏对象。
 * @class debug
 * @main
 * @static
 */

module.exports = cc.debug = {
  DebugMode: DebugMode,
  _resetDebugSetting: resetDebugSetting,

  /**
   * !#en Gets error message with the error id and possible parameters.
   * !#zh 通过 error id 和必要的参数来获取错误信息。
   * @method getError
   * @param {String} errorId
   * @param {any} [param]
   * @return {String}
   */
  getError: getTypedFormatter('ERROR'),

  /**
   * !#en Returns whether or not to display the FPS informations.
   * !#zh 是否显示 FPS 信息。
   * @method isDisplayStats
   * @return {Boolean}
   */
  isDisplayStats: function isDisplayStats() {
    return cc.profiler ? cc.profiler.isShowingStats() : false;
  },

  /**
   * !#en Sets whether display the FPS on the bottom-left corner.
   * !#zh 设置是否在左下角显示 FPS。
   * @method setDisplayStats
   * @param {Boolean} displayStats
   */
  setDisplayStats: function setDisplayStats(displayStats) {
    if (cc.profiler && cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
      displayStats ? cc.profiler.showStats() : cc.profiler.hideStats();
      cc.game.config.showFPS = !!displayStats;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDRGVidWcuanMiXSwibmFtZXMiOlsidXRpbHMiLCJyZXF1aXJlIiwiZGVidWdJbmZvcyIsIkVSUk9SX01BUF9VUkwiLCJsb2dMaXN0IiwiY2MiLCJsb2ciLCJ3YXJuIiwiZXJyb3IiLCJhc3NlcnQiLCJjb25zb2xlIiwiYmluZCIsInJlc2V0RGVidWdTZXR0aW5nIiwibW9kZSIsIkRlYnVnTW9kZSIsIk5PTkUiLCJFUlJPUiIsImxvZ1RvV2ViUGFnZSIsIm1zZyIsImdhbWUiLCJjYW52YXMiLCJsb2dEaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJoZWlnaHQiLCJsb2dEaXZTdHlsZSIsInN0eWxlIiwiekluZGV4IiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwibG9nTGlzdFN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQm90dG9tIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiYm9yZGVyVG9wU3R5bGUiLCJib3JkZXJMZWZ0U3R5bGUiLCJib3JkZXJSaWdodFN0eWxlIiwicGFkZGluZyIsIm1hcmdpbiIsImFwcGVuZENoaWxkIiwicGFyZW50Tm9kZSIsInZhbHVlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwianMiLCJmb3JtYXRTdHIiLCJhcHBseSIsImFyZ3VtZW50cyIsImNvbmQiLCJzaGlmdEFyZ3VtZW50cyIsIkVSUk9SX0ZPUl9XRUJfUEFHRSIsIklORk9fRk9SX1dFQl9QQUdFIiwiQ0NfRURJVE9SIiwiRWRpdG9yIiwiQ0NfSlNCIiwiQ0NfUlVOVElNRSIsIkNDX0RFViIsIkNDX1RFU1QiLCJvayIsIkVycm9yIiwiSU5GTyIsInNjcmlwdEVuZ2luZVR5cGUiLCJfdGhyb3ciLCJjYWxsSW5OZXh0VGljayIsImdldFR5cGVkRm9ybWF0dGVyIiwidHlwZSIsImlkIiwiQ0NfREVCVUciLCJsZW5ndGgiLCJhcmdzQXJyYXkiLCJjb25jYXQiLCJqb2luIiwibG9nRm9ybWF0dGVyIiwibG9nSUQiLCJ3YXJuRm9ybWF0dGVyIiwid2FybklEIiwiZXJyb3JGb3JtYXR0ZXIiLCJlcnJvcklEIiwiYXNzZXJ0Rm9ybWF0dGVyIiwiYXNzZXJ0SUQiLCJFbnVtIiwiV0FSTiIsIldBUk5fRk9SX1dFQl9QQUdFIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlYnVnIiwiX3Jlc2V0RGVidWdTZXR0aW5nIiwiZ2V0RXJyb3IiLCJpc0Rpc3BsYXlTdGF0cyIsInByb2ZpbGVyIiwiaXNTaG93aW5nU3RhdHMiLCJzZXREaXNwbGF5U3RhdHMiLCJkaXNwbGF5U3RhdHMiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwic2hvd1N0YXRzIiwiaGlkZVN0YXRzIiwiY29uZmlnIiwic2hvd0ZQUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsa0JBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHRCxPQUFPLENBQUMsa0JBQUQsQ0FBUCxJQUErQixFQUFsRDtBQUNBLElBQU1FLGFBQWEsR0FBRyx1RUFBdEIsRUFFQTs7QUFDQSxJQUFJQyxPQUFKO0FBRUE7Ozs7QUFJQUMsRUFBRSxDQUFDQyxHQUFILEdBQVNELEVBQUUsQ0FBQ0UsSUFBSCxHQUFVRixFQUFFLENBQUNHLEtBQUgsR0FBV0gsRUFBRSxDQUFDSSxNQUFILEdBQVlDLE9BQU8sQ0FBQ0osR0FBUixDQUFZSyxJQUFaLEdBQW1CRCxPQUFPLENBQUNKLEdBQVIsQ0FBWUssSUFBWixDQUFpQkQsT0FBakIsQ0FBbkIsR0FBK0NBLE9BQU8sQ0FBQ0osR0FBakc7O0FBRUEsSUFBSU0saUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFVQyxJQUFWLEVBQWdCO0FBQ3BDO0FBQ0FSLEVBQUFBLEVBQUUsQ0FBQ0MsR0FBSCxHQUFTRCxFQUFFLENBQUNF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SDs7QUFleEI7Ozs7OztBQU1Bd0IsRUFBQUEsY0FBYyxFQUFFLDBCQUFZO0FBQ3hCLFdBQU92RixFQUFFLENBQUN3RixRQUFILEdBQWN4RixFQUFFLENBQUN3RixRQUFILENBQVlDLGNBQVosRUFBZCxHQUE2QyxLQUFwRDtBQUNILEdBdkJ1Qjs7QUF5QnhCOzs7Ozs7QUFNQUMsRUFBQUEsZUFBZSxFQUFFLHlCQUFVQyxZQUFWLEVBQXdCO0FBQ3JDLFFBQUkzRixFQUFFLENBQUN3RixRQUFILElBQWV4RixFQUFFLENBQUNjLElBQUgsQ0FBUThFLFVBQVIsS0FBdUI1RixFQUFFLENBQUNjLElBQUgsQ0FBUStFLGtCQUFsRCxFQUFzRTtBQUNsRUYsTUFBQUEsWUFBWSxHQUFHM0YsRUFBRSxDQUFDd0YsUUFBSCxDQUFZTSxTQUFaLEVBQUgsR0FBNkI5RixFQUFFLENBQUN3RixRQUFILENBQVlPLFNBQVosRUFBekM7QUFDQS9GLE1BQUFBLEVBQUUsQ0FBQ2MsSUFBSCxDQUFRa0YsTUFBUixDQUFlQyxPQUFmLEdBQXlCLENBQUMsQ0FBQ04sWUFBM0I7QUFDSDtBQUNKO0FBcEN1QixDQUE1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3BsYXRmb3JtL3V0aWxzJyk7XG5jb25zdCBkZWJ1Z0luZm9zID0gcmVxdWlyZSgnLi4vLi4vRGVidWdJbmZvcycpIHx8IHt9O1xuY29uc3QgRVJST1JfTUFQX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vY29jb3MtY3JlYXRvci9lbmdpbmUvYmxvYi9tYXN0ZXIvRW5naW5lRXJyb3JNYXAubWQnO1xuXG4vLyB0aGUgaHRtbCBlbGVtZW50IGRpc3BsYXlzIGxvZyBpbiB3ZWIgcGFnZSAoRGVidWdNb2RlLklORk9fRk9SX1dFQl9QQUdFKVxubGV0IGxvZ0xpc3Q7XG5cbi8qKlxuICogQG1vZHVsZSBjY1xuICovXG5cbmNjLmxvZyA9IGNjLndhcm4gPSBjYy5lcnJvciA9IGNjLmFzc2VydCA9IGNvbnNvbGUubG9nLmJpbmQgPyBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpIDogY29uc29sZS5sb2c7XG5cbmxldCByZXNldERlYnVnU2V0dGluZyA9IGZ1bmN0aW9uIChtb2RlKSB7XG4gICAgLy8gcmVzZXRcbiAgICBjYy5sb2cgPSBjYy53YXJuID0gY2MuZXJyb3IgPSBjYy5hc3NlcnQgPSBmdW5jdGlvbiAoKSB7fTtcblxuICAgIGlmIChtb2RlID09PSBEZWJ1Z01vZGUuTk9ORSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKG1vZGUgPiBEZWJ1Z01vZGUuRVJST1IpIHtcbiAgICAgICAgLy9sb2cgdG8gd2ViIHBhZ2VcblxuICAgICAgICBmdW5jdGlvbiBsb2dUb1dlYlBhZ2UgKG1zZykge1xuICAgICAgICAgICAgaWYgKCFjYy5nYW1lLmNhbnZhcylcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIGlmICghbG9nTGlzdCkge1xuICAgICAgICAgICAgICAgIHZhciBsb2dEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRGl2XCIpO1xuICAgICAgICAgICAgICAgIGxvZ0Rpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImxvZ0luZm9EaXZcIik7XG4gICAgICAgICAgICAgICAgbG9nRGl2LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiMjAwXCIpO1xuICAgICAgICAgICAgICAgIGxvZ0Rpdi5zZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIiwgY2MuZ2FtZS5jYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB2YXIgbG9nRGl2U3R5bGUgPSBsb2dEaXYuc3R5bGU7XG4gICAgICAgICAgICAgICAgbG9nRGl2U3R5bGUuekluZGV4ID0gXCI5OTk5OVwiO1xuICAgICAgICAgICAgICAgIGxvZ0RpdlN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgICAgIGxvZ0RpdlN0eWxlLnRvcCA9IGxvZ0RpdlN0eWxlLmxlZnQgPSBcIjBcIjtcblxuICAgICAgICAgICAgICAgIGxvZ0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gICAgICAgICAgICAgICAgbG9nTGlzdC5zZXRBdHRyaWJ1dGUoXCJyb3dzXCIsIFwiMjBcIik7XG4gICAgICAgICAgICAgICAgbG9nTGlzdC5zZXRBdHRyaWJ1dGUoXCJjb2xzXCIsIFwiMzBcIik7XG4gICAgICAgICAgICAgICAgbG9nTGlzdC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgdmFyIGxvZ0xpc3RTdHlsZSA9IGxvZ0xpc3Quc3R5bGU7XG4gICAgICAgICAgICAgICAgbG9nTGlzdFN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcbiAgICAgICAgICAgICAgICBsb2dMaXN0U3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgI2NjY2NjY1wiO1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RTdHlsZS5ib3JkZXJUb3BXaWR0aCA9IGxvZ0xpc3RTdHlsZS5ib3JkZXJMZWZ0V2lkdGggPSBsb2dMaXN0U3R5bGUuYm9yZGVyUmlnaHRXaWR0aCA9IFwiMHB4XCI7XG4gICAgICAgICAgICAgICAgbG9nTGlzdFN0eWxlLmJvcmRlclRvcFN0eWxlID0gbG9nTGlzdFN0eWxlLmJvcmRlckxlZnRTdHlsZSA9IGxvZ0xpc3RTdHlsZS5ib3JkZXJSaWdodFN0eWxlID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgbG9nTGlzdFN0eWxlLnBhZGRpbmcgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGxvZ0xpc3RTdHlsZS5tYXJnaW4gPSAwO1xuXG4gICAgICAgICAgICAgICAgbG9nRGl2LmFwcGVuZENoaWxkKGxvZ0xpc3QpO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUuY2FudmFzLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobG9nRGl2KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbG9nTGlzdC52YWx1ZSA9IGxvZ0xpc3QudmFsdWUgKyBtc2cgKyBcIlxcclxcblwiO1xuICAgICAgICAgICAgbG9nTGlzdC5zY3JvbGxUb3AgPSBsb2dMaXN0LnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9nVG9XZWJQYWdlKFwiRVJST1IgOiAgXCIgKyBjYy5qcy5mb3JtYXRTdHIuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgICAgIGNjLmFzc2VydCA9IGZ1bmN0aW9uIChjb25kLCBtc2cpIHtcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIGlmICghY29uZCAmJiBtc2cpIHtcbiAgICAgICAgICAgICAgICBtc2cgPSBjYy5qcy5mb3JtYXRTdHIuYXBwbHkobnVsbCwgY2MuanMuc2hpZnRBcmd1bWVudHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICAgICAgbG9nVG9XZWJQYWdlKFwiQVNTRVJUOiBcIiArIG1zZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmIChtb2RlICE9PSBEZWJ1Z01vZGUuRVJST1JfRk9SX1dFQl9QQUdFKSB7XG4gICAgICAgICAgICBjYy53YXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxvZ1RvV2ViUGFnZShcIldBUk4gOiAgXCIgKyBjYy5qcy5mb3JtYXRTdHIuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChtb2RlID09PSBEZWJ1Z01vZGUuSU5GT19GT1JfV0VCX1BBR0UpIHtcbiAgICAgICAgICAgIGNjLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsb2dUb1dlYlBhZ2UoY2MuanMuZm9ybWF0U3RyLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChjb25zb2xlICYmIGNvbnNvbGUubG9nLmFwcGx5KSB7Ly9jb25zb2xlIGlzIG51bGwgd2hlbiB1c2VyIGRvZXNuJ3Qgb3BlbiBkZXYgdG9vbCBvbiBJRTlcbiAgICAgICAgLy9sb2cgdG8gY29uc29sZVxuXG4gICAgICAgIC8vIEZvciBKU0JcbiAgICAgICAgaWYgKCFjb25zb2xlLmVycm9yKSBjb25zb2xlLmVycm9yID0gY29uc29sZS5sb2c7XG4gICAgICAgIGlmICghY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4gPSBjb25zb2xlLmxvZztcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBPdXRwdXRzIGFuIGVycm9yIG1lc3NhZ2UgdG8gdGhlIENvY29zIENyZWF0b3IgQ29uc29sZSAoZWRpdG9yKSBvciBXZWIgQ29uc29sZSAocnVudGltZSkuPGJyLz5cbiAgICAgICAgICogLSBJbiBDb2NvcyBDcmVhdG9yLCBlcnJvciBpcyByZWQuPGJyLz5cbiAgICAgICAgICogLSBJbiBDaHJvbWUsIGVycm9yIGhhdmUgYSByZWQgaWNvbiBhbG9uZyB3aXRoIHJlZCBtZXNzYWdlIHRleHQuPGJyLz5cbiAgICAgICAgICogISN6aFxuICAgICAgICAgKiDovpPlh7rplJnor6/mtojmga/liLAgQ29jb3MgQ3JlYXRvciDnvJbovpHlmajnmoQgQ29uc29sZSDmiJbov5DooYzml7bpobXpnaLnq6/nmoQgQ29uc29sZSDkuK3jgII8YnIvPlxuICAgICAgICAgKiAtIOWcqCBDb2NvcyBDcmVhdG9yIOS4re+8jOmUmeivr+S/oeaBr+aYvuekuuaYr+e6ouiJsueahOOAgjxici8+XG4gICAgICAgICAqIC0g5ZyoIENocm9tZSDkuK3vvIzplJnor6/kv6Hmga/mnInnuqLoibLnmoTlm77moIfku6Xlj4rnuqLoibLnmoTmtojmga/mlofmnKzjgII8YnIvPlxuICAgICAgICAgKlxuICAgICAgICAgKiBAbWV0aG9kIGVycm9yXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBtc2cgLSBBIEphdmFTY3JpcHQgc3RyaW5nIGNvbnRhaW5pbmcgemVybyBvciBtb3JlIHN1YnN0aXR1dGlvbiBzdHJpbmdzLlxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gLi4uc3Vic3QgLSBKYXZhU2NyaXB0IG9iamVjdHMgd2l0aCB3aGljaCB0byByZXBsYWNlIHN1YnN0aXR1dGlvbiBzdHJpbmdzIHdpdGhpbiBtc2cuIFRoaXMgZ2l2ZXMgeW91IGFkZGl0aW9uYWwgY29udHJvbCBvdmVyIHRoZSBmb3JtYXQgb2YgdGhlIG91dHB1dC5cbiAgICAgICAgICovXG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIGNjLmVycm9yID0gRWRpdG9yLmVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnNvbGUuZXJyb3IuYmluZCkge1xuICAgICAgICAgICAgLy8gdXNlIGJpbmQgdG8gYXZvaWQgcG9sbHV0ZSBjYWxsIHN0YWNrc1xuICAgICAgICAgICAgY2MuZXJyb3IgPSBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5lcnJvciA9IENDX0pTQiB8fCBDQ19SVU5USU1FID8gY29uc29sZS5lcnJvciA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjYy5hc3NlcnQgPSBmdW5jdGlvbiAoY29uZCwgbXNnKSB7XG4gICAgICAgICAgICBpZiAoIWNvbmQpIHtcbiAgICAgICAgICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgICAgICAgICAgIG1zZyA9IGNjLmpzLmZvcm1hdFN0ci5hcHBseShudWxsLCBjYy5qcy5zaGlmdEFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFVikge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKENDX1RFU1QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2soZmFsc2UsIG1zZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG1vZGUgIT09IERlYnVnTW9kZS5FUlJPUikge1xuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBPdXRwdXRzIGEgd2FybmluZyBtZXNzYWdlIHRvIHRoZSBDb2NvcyBDcmVhdG9yIENvbnNvbGUgKGVkaXRvcikgb3IgV2ViIENvbnNvbGUgKHJ1bnRpbWUpLlxuICAgICAgICAgKiAtIEluIENvY29zIENyZWF0b3IsIHdhcm5pbmcgaXMgeWVsbG93LlxuICAgICAgICAgKiAtIEluIENocm9tZSwgd2FybmluZyBoYXZlIGEgeWVsbG93IHdhcm5pbmcgaWNvbiB3aXRoIHRoZSBtZXNzYWdlIHRleHQuXG4gICAgICAgICAqICEjemhcbiAgICAgICAgICog6L6T5Ye66K2m5ZGK5raI5oGv5YiwIENvY29zIENyZWF0b3Ig57yW6L6R5Zmo55qEIENvbnNvbGUg5oiW6L+Q6KGM5pe2IFdlYiDnq6/nmoQgQ29uc29sZSDkuK3jgII8YnIvPlxuICAgICAgICAgKiAtIOWcqCBDb2NvcyBDcmVhdG9yIOS4re+8jOitpuWRiuS/oeaBr+aYvuekuuaYr+m7hOiJsueahOOAgjxici8+XG4gICAgICAgICAqIC0g5ZyoIENocm9tZSDkuK3vvIzorablkYrkv6Hmga/mnInnnYDpu4ToibLnmoTlm77moIfku6Xlj4rpu4ToibLnmoTmtojmga/mlofmnKzjgII8YnIvPlxuICAgICAgICAgKiBAbWV0aG9kIHdhcm5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IG1zZyAtIEEgSmF2YVNjcmlwdCBzdHJpbmcgY29udGFpbmluZyB6ZXJvIG9yIG1vcmUgc3Vic3RpdHV0aW9uIHN0cmluZ3MuXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSAuLi5zdWJzdCAtIEphdmFTY3JpcHQgb2JqZWN0cyB3aXRoIHdoaWNoIHRvIHJlcGxhY2Ugc3Vic3RpdHV0aW9uIHN0cmluZ3Mgd2l0aGluIG1zZy4gVGhpcyBnaXZlcyB5b3UgYWRkaXRpb25hbCBjb250cm9sIG92ZXIgdGhlIGZvcm1hdCBvZiB0aGUgb3V0cHV0LlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgY2Mud2FybiA9IEVkaXRvci53YXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnNvbGUud2Fybi5iaW5kKSB7XG4gICAgICAgICAgICAvLyB1c2UgYmluZCB0byBhdm9pZCBwb2xsdXRlIGNhbGwgc3RhY2tzXG4gICAgICAgICAgICBjYy53YXJuID0gY29uc29sZS53YXJuLmJpbmQoY29uc29sZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy53YXJuID0gQ0NfSlNCIHx8IENDX1JVTlRJTUUgPyBjb25zb2xlLndhcm4gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgIGNjLmxvZyA9IEVkaXRvci5sb2c7XG4gICAgfVxuICAgIGVsc2UgaWYgKG1vZGUgPT09IERlYnVnTW9kZS5JTkZPKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIE91dHB1dHMgYSBtZXNzYWdlIHRvIHRoZSBDb2NvcyBDcmVhdG9yIENvbnNvbGUgKGVkaXRvcikgb3IgV2ViIENvbnNvbGUgKHJ1bnRpbWUpLlxuICAgICAgICAgKiAhI3poIOi+k+WHuuS4gOadoea2iOaBr+WIsCBDb2NvcyBDcmVhdG9yIOe8lui+keWZqOeahCBDb25zb2xlIOaIlui/kOihjOaXtiBXZWIg56uv55qEIENvbnNvbGUg5Lit44CCXG4gICAgICAgICAqIEBtZXRob2QgbG9nXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfGFueX0gbXNnIC0gQSBKYXZhU2NyaXB0IHN0cmluZyBjb250YWluaW5nIHplcm8gb3IgbW9yZSBzdWJzdGl0dXRpb24gc3RyaW5ncy5cbiAgICAgICAgICogQHBhcmFtIHthbnl9IC4uLnN1YnN0IC0gSmF2YVNjcmlwdCBvYmplY3RzIHdpdGggd2hpY2ggdG8gcmVwbGFjZSBzdWJzdGl0dXRpb24gc3RyaW5ncyB3aXRoaW4gbXNnLiBUaGlzIGdpdmVzIHlvdSBhZGRpdGlvbmFsIGNvbnRyb2wgb3ZlciB0aGUgZm9ybWF0IG9mIHRoZSBvdXRwdXQuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoQ0NfSlNCIHx8IENDX1JVTlRJTUUpIHtcbiAgICAgICAgICAgIGlmIChzY3JpcHRFbmdpbmVUeXBlID09PSBcIkphdmFTY3JpcHRDb3JlXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyBoYXMgdG8gdXNlIGBjb25zb2xlYCBhcyBpdHMgY29udGV4dCBmb3IgaU9TIDh+OS4gVGhlcmVmb3JlLCBhcHBseSBpdC5cbiAgICAgICAgICAgICAgICBjYy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbnNvbGUubG9nLmJpbmQpIHtcbiAgICAgICAgICAgIC8vIHVzZSBiaW5kIHRvIGF2b2lkIHBvbGx1dGUgY2FsbCBzdGFja3NcbiAgICAgICAgICAgIGNjLmxvZyA9IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuY2MuX3Rocm93ID0gQ0NfRURJVE9SID8gRWRpdG9yLmVycm9yIDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgdXRpbHMuY2FsbEluTmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGdldFR5cGVkRm9ybWF0dGVyICh0eXBlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkID0gYXJndW1lbnRzWzBdO1xuICAgICAgICB2YXIgbXNnID0gQ0NfREVCVUcgPyAoZGVidWdJbmZvc1tpZF0gfHwgJ3Vua25vd24gaWQnKSA6IGAke3R5cGV9ICR7aWR9LCBwbGVhc2UgZ28gdG8gJHtFUlJPUl9NQVBfVVJMfSMke2lkfSB0byBzZWUgZGV0YWlscy5gO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIG1zZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gQ0NfREVCVUcgPyBjYy5qcy5mb3JtYXRTdHIobXNnLCBhcmd1bWVudHNbMV0pIDpcbiAgICAgICAgICAgICAgICBtc2cgKyAnIEFyZ3VtZW50czogJyArIGFyZ3VtZW50c1sxXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBhcmdzQXJyYXkgPSBjYy5qcy5zaGlmdEFyZ3VtZW50cy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIENDX0RFQlVHID8gY2MuanMuZm9ybWF0U3RyLmFwcGx5KG51bGwsIFttc2ddLmNvbmNhdChhcmdzQXJyYXkpKSA6XG4gICAgICAgICAgICAgICAgbXNnICsgJyBBcmd1bWVudHM6ICcgKyBhcmdzQXJyYXkuam9pbignLCAnKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbnZhciBsb2dGb3JtYXR0ZXIgPSBnZXRUeXBlZEZvcm1hdHRlcignTG9nJyk7XG5jYy5sb2dJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5sb2cobG9nRm9ybWF0dGVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cykpO1xufTtcblxudmFyIHdhcm5Gb3JtYXR0ZXIgPSBnZXRUeXBlZEZvcm1hdHRlcignV2FybmluZycpO1xuY2Mud2FybklEID0gZnVuY3Rpb24gKCkge1xuICAgIGNjLndhcm4od2FybkZvcm1hdHRlci5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbn07XG5cbnZhciBlcnJvckZvcm1hdHRlciA9IGdldFR5cGVkRm9ybWF0dGVyKCdFcnJvcicpO1xuY2MuZXJyb3JJRCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYy5lcnJvcihlcnJvckZvcm1hdHRlci5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcbn07XG5cbnZhciBhc3NlcnRGb3JtYXR0ZXIgPSBnZXRUeXBlZEZvcm1hdHRlcignQXNzZXJ0Jyk7XG5jYy5hc3NlcnRJRCA9IGZ1bmN0aW9uIChjb25kKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmIChjb25kKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2MuYXNzZXJ0KGZhbHNlLCBhc3NlcnRGb3JtYXR0ZXIuYXBwbHkobnVsbCwgY2MuanMuc2hpZnRBcmd1bWVudHMuYXBwbHkobnVsbCwgYXJndW1lbnRzKSkpO1xufTtcblxuLyoqXG4qICEjZW4gRW51bSBmb3IgZGVidWcgbW9kZXMuXG4qICEjemgg6LCD6K+V5qih5byPXG4qIEBlbnVtIGRlYnVnLkRlYnVnTW9kZVxuKiBAbWVtYmVyb2YgY2NcbiAqL1xudmFyIERlYnVnTW9kZSA9IGNjLkVudW0oe1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRlYnVnIG1vZGUgbm9uZS5cbiAgICAgKiAhI3poIOemgeatouaooeW8j++8jOemgeatouaYvuekuuS7u+S9leaXpeW/l+S/oeaBr+OAglxuICAgICAqIEBwcm9wZXJ0eSBOT05FXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgTk9ORTogMCxcbiAgICAvKipcbiAgICAgKiAhI2VuIFRoZSBkZWJ1ZyBtb2RlIGluZm8uXG4gICAgICogISN6aCDkv6Hmga/mqKHlvI/vvIzlnKggY29uc29sZSDkuK3mmL7npLrmiYDmnInml6Xlv5fjgIJcbiAgICAgKiBAcHJvcGVydHkgSU5GT1xuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIElORk86IDEsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSB3YXJuLlxuICAgICAqICEjemgg6K2m5ZGK5qih5byP77yM5ZyoIGNvbnNvbGUg5Lit5Y+q5pi+56S6IHdhcm4g57qn5Yir5Lul5LiK55qE77yI5YyF5ZCrIGVycm9y77yJ5pel5b+X44CCXG4gICAgICogQHByb3BlcnR5IFdBUk5cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBXQVJOOiAyLFxuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIGRlYnVnIG1vZGUgZXJyb3IuXG4gICAgICogISN6aCDplJnor6/mqKHlvI/vvIzlnKggY29uc29sZSDkuK3lj6rmmL7npLogZXJyb3Ig5pel5b+X44CCXG4gICAgICogQHByb3BlcnR5IEVSUk9SXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgRVJST1I6IDMsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSBpbmZvIGZvciB3ZWIgcGFnZS5cbiAgICAgKiAhI3poIOS/oeaBr+aooeW8j++8iOS7hSBXRUIg56uv5pyJ5pWI77yJ77yM5Zyo55S76Z2i5LiK6L6T5Ye65omA5pyJ5L+h5oGv44CCXG4gICAgICogQHByb3BlcnR5IElORk9fRk9SX1dFQl9QQUdFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgSU5GT19GT1JfV0VCX1BBR0U6IDQsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSB3YXJuIGZvciB3ZWIgcGFnZS5cbiAgICAgKiAhI3poIOitpuWRiuaooeW8j++8iOS7hSBXRUIg56uv5pyJ5pWI77yJ77yM5Zyo55S76Z2i5LiK6L6T5Ye6IHdhcm4g57qn5Yir5Lul5LiK55qE77yI5YyF5ZCrIGVycm9y77yJ5L+h5oGv44CCXG4gICAgICogQHByb3BlcnR5IFdBUk5fRk9SX1dFQl9QQUdFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgV0FSTl9GT1JfV0VCX1BBR0U6IDUsXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgZGVidWcgbW9kZSBlcnJvciBmb3Igd2ViIHBhZ2UuXG4gICAgICogISN6aCDplJnor6/mqKHlvI/vvIjku4UgV0VCIOerr+acieaViO+8ie+8jOWcqOeUu+mdouS4iui+k+WHuiBlcnJvciDkv6Hmga/jgIJcbiAgICAgKiBAcHJvcGVydHkgRVJST1JfRk9SX1dFQl9QQUdFXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKiBAc3RhdGljXG4gICAgICovXG4gICAgRVJST1JfRk9SX1dFQl9QQUdFOiA2XG59KTtcbi8qKlxuICogISNlbiBBbiBvYmplY3QgdG8gYm9vdCB0aGUgZ2FtZS5cbiAqICEjemgg5YyF5ZCr5ri45oiP5Li75L2T5L+h5oGv5bm26LSf6LSj6amx5Yqo5ri45oiP55qE5ri45oiP5a+56LGh44CCXG4gKiBAY2xhc3MgZGVidWdcbiAqIEBtYWluXG4gKiBAc3RhdGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gY2MuZGVidWcgPSB7XG4gICAgRGVidWdNb2RlOiBEZWJ1Z01vZGUsXG5cbiAgICBfcmVzZXREZWJ1Z1NldHRpbmc6IHJlc2V0RGVidWdTZXR0aW5nLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXRzIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgZXJyb3IgaWQgYW5kIHBvc3NpYmxlIHBhcmFtZXRlcnMuXG4gICAgICogISN6aCDpgJrov4cgZXJyb3IgaWQg5ZKM5b+F6KaB55qE5Y+C5pWw5p2l6I635Y+W6ZSZ6K+v5L+h5oGv44CCXG4gICAgICogQG1ldGhvZCBnZXRFcnJvclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvcklkXG4gICAgICogQHBhcmFtIHthbnl9IFtwYXJhbV1cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0RXJyb3I6IGdldFR5cGVkRm9ybWF0dGVyKCdFUlJPUicpLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRvIGRpc3BsYXkgdGhlIEZQUyBpbmZvcm1hdGlvbnMuXG4gICAgICogISN6aCDmmK/lkKbmmL7npLogRlBTIOS/oeaBr+OAglxuICAgICAqIEBtZXRob2QgaXNEaXNwbGF5U3RhdHNcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRGlzcGxheVN0YXRzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBjYy5wcm9maWxlciA/IGNjLnByb2ZpbGVyLmlzU2hvd2luZ1N0YXRzKCkgOiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBTZXRzIHdoZXRoZXIgZGlzcGxheSB0aGUgRlBTIG9uIHRoZSBib3R0b20tbGVmdCBjb3JuZXIuXG4gICAgICogISN6aCDorr7nva7mmK/lkKblnKjlt6bkuIvop5LmmL7npLogRlBT44CCXG4gICAgICogQG1ldGhvZCBzZXREaXNwbGF5U3RhdHNcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRpc3BsYXlTdGF0c1xuICAgICAqL1xuICAgIHNldERpc3BsYXlTdGF0czogZnVuY3Rpb24gKGRpc3BsYXlTdGF0cykge1xuICAgICAgICBpZiAoY2MucHJvZmlsZXIgJiYgY2MuZ2FtZS5yZW5kZXJUeXBlICE9PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUykge1xuICAgICAgICAgICAgZGlzcGxheVN0YXRzID8gY2MucHJvZmlsZXIuc2hvd1N0YXRzKCkgOiBjYy5wcm9maWxlci5oaWRlU3RhdHMoKTtcbiAgICAgICAgICAgIGNjLmdhbWUuY29uZmlnLnNob3dGUFMgPSAhIWRpc3BsYXlTdGF0cztcbiAgICAgICAgfVxuICAgIH0sXG59Il0sInNvdXJjZVJvb3QiOiIvIn0=