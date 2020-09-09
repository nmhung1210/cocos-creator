
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/CCPath.js';
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
require('../platform/CCSys');

var EXTNAME_RE = /(\.[^\.\/\?\\]*)(\?.*)?$/;
var DIRNAME_RE = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/;
var NORMALIZE_RE = /[^\.\/]+\/\.\.\//;
/**
 * !#en The module provides utilities for working with file and directory paths
 * !#zh 用于处理文件与目录的路径的模块
 * @class path
 * @static
 */

cc.path =
/** @lends cc.path# */
{
  /**
   * !#en Join strings to be a path.
   * !#zh 拼接字符串为 Path
   * @method join
   * @example {@link cocos2d/core/utils/CCPath/join.js}
   * @returns {String}
   */
  join: function join() {
    var l = arguments.length;
    var result = "";

    for (var i = 0; i < l; i++) {
      result = (result + (result === "" ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
    }

    return result;
  },

  /**
   * !#en Get the ext name of a path including '.', like '.png'.
   * !#zh 返回 Path 的扩展名，包括 '.'，例如 '.png'。
   * @method extname
   * @example {@link cocos2d/core/utils/CCPath/extname.js}
   * @param {String} pathStr
   * @returns {*}
   */
  extname: function extname(pathStr) {
    var temp = EXTNAME_RE.exec(pathStr);
    return temp ? temp[1] : '';
  },

  /**
   * !#en Get the main name of a file name
   * !#zh 获取文件名的主名称
   * @method mainFileName
   * @param {String} fileName
   * @returns {String}
   * @deprecated
   */
  mainFileName: function mainFileName(fileName) {
    if (fileName) {
      var idx = fileName.lastIndexOf(".");
      if (idx !== -1) return fileName.substring(0, idx);
    }

    return fileName;
  },

  /**
   * !#en Get the file name of a file path.
   * !#zh 获取文件路径的文件名。
   * @method basename
   * @example {@link cocos2d/core/utils/CCPath/basename.js}
   * @param {String} pathStr
   * @param {String} [extname]
   * @returns {*}
   */
  basename: function basename(pathStr, extname) {
    var index = pathStr.indexOf("?");
    if (index > 0) pathStr = pathStr.substring(0, index);
    var reg = /(\/|\\)([^\/\\]+)$/g;
    var result = reg.exec(pathStr.replace(/(\/|\\)$/, ""));
    if (!result) return pathStr;
    var baseName = result[2];
    if (extname && pathStr.substring(pathStr.length - extname.length).toLowerCase() === extname.toLowerCase()) return baseName.substring(0, baseName.length - extname.length);
    return baseName;
  },

  /**
   * !#en Get dirname of a file path.
   * !#zh 获取文件路径的目录名。
   * @method dirname
   * @example {@link cocos2d/core/utils/CCPath/dirname.js}
   * @param {String} pathStr
   * @returns {*}
   */
  dirname: function dirname(pathStr) {
    var temp = DIRNAME_RE.exec(pathStr);
    return temp ? temp[2] : '';
  },

  /**
   * !#en Change extname of a file path.
   * !#zh 更改文件路径的扩展名。
   * @method changeExtname
   * @example {@link cocos2d/core/utils/CCPath/changeExtname.js}
   * @param {String} pathStr
   * @param {String} [extname]
   * @returns {String}
   */
  changeExtname: function changeExtname(pathStr, extname) {
    extname = extname || "";
    var index = pathStr.indexOf("?");
    var tempStr = "";

    if (index > 0) {
      tempStr = pathStr.substring(index);
      pathStr = pathStr.substring(0, index);
    }

    index = pathStr.lastIndexOf(".");
    if (index < 0) return pathStr + extname + tempStr;
    return pathStr.substring(0, index) + extname + tempStr;
  },

  /**
   * !#en Change file name of a file path.
   * !#zh 更改文件路径的文件名。
   * @example {@link cocos2d/core/utils/CCPath/changeBasename.js}
   * @param {String} pathStr
   * @param {String} basename
   * @param {Boolean} [isSameExt]
   * @returns {String}
   */
  changeBasename: function changeBasename(pathStr, basename, isSameExt) {
    if (basename.indexOf(".") === 0) return this.changeExtname(pathStr, basename);
    var index = pathStr.indexOf("?");
    var tempStr = "";
    var ext = isSameExt ? this.extname(pathStr) : "";

    if (index > 0) {
      tempStr = pathStr.substring(index);
      pathStr = pathStr.substring(0, index);
    }

    index = pathStr.lastIndexOf("/");
    index = index <= 0 ? 0 : index + 1;
    return pathStr.substring(0, index) + basename + ext + tempStr;
  },
  //todo make public after verification
  _normalize: function _normalize(url) {
    var oldUrl = url = String(url); //removing all ../

    do {
      oldUrl = url;
      url = url.replace(NORMALIZE_RE, "");
    } while (oldUrl.length !== url.length);

    return url;
  },
  // The platform-specific file separator. '\\' or '/'.
  sep: cc.sys.os === cc.sys.OS_WINDOWS ? '\\' : '/',
  // @param {string} path
  stripSep: function stripSep(path) {
    return path.replace(/[\/\\]$/, '');
  }
};
module.exports = cc.path;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL0NDUGF0aC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRVhUTkFNRV9SRSIsIkRJUk5BTUVfUkUiLCJOT1JNQUxJWkVfUkUiLCJjYyIsInBhdGgiLCJqb2luIiwibCIsImFyZ3VtZW50cyIsImxlbmd0aCIsInJlc3VsdCIsImkiLCJyZXBsYWNlIiwiZXh0bmFtZSIsInBhdGhTdHIiLCJ0ZW1wIiwiZXhlYyIsIm1haW5GaWxlTmFtZSIsImZpbGVOYW1lIiwiaWR4IiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJiYXNlbmFtZSIsImluZGV4IiwiaW5kZXhPZiIsInJlZyIsImJhc2VOYW1lIiwidG9Mb3dlckNhc2UiLCJkaXJuYW1lIiwiY2hhbmdlRXh0bmFtZSIsInRlbXBTdHIiLCJjaGFuZ2VCYXNlbmFtZSIsImlzU2FtZUV4dCIsImV4dCIsIl9ub3JtYWxpemUiLCJ1cmwiLCJvbGRVcmwiLCJTdHJpbmciLCJzZXAiLCJzeXMiLCJvcyIsIk9TX1dJTkRPV1MiLCJzdHJpcFNlcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQUEsT0FBTyxDQUFDLG1CQUFELENBQVA7O0FBRUEsSUFBSUMsVUFBVSxHQUFHLDBCQUFqQjtBQUNBLElBQUlDLFVBQVUsR0FBRyxnQ0FBakI7QUFDQSxJQUFJQyxZQUFZLEdBQUcsa0JBQW5CO0FBRUE7Ozs7Ozs7QUFNQUMsRUFBRSxDQUFDQyxJQUFIO0FBQVU7QUFBc0I7QUFDNUI7Ozs7Ozs7QUFPQUMsRUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2QsUUFBSUMsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQWxCO0FBQ0EsUUFBSUMsTUFBTSxHQUFHLEVBQWI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSixDQUFwQixFQUF1QkksQ0FBQyxF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QVIsQ0FBa0IsQ0FBbEIsRUFBcUJFLEtBQXJCLElBQThCRCxRQUE5QixHQUF5Q1csR0FBekMsR0FBK0NILE9BQXREO0FBQ0gsR0EzSDJCO0FBNEg1QjtBQUNBSSxFQUFBQSxVQUFVLEVBQUUsb0JBQVVDLEdBQVYsRUFBZTtBQUN2QixRQUFJQyxNQUFNLEdBQUdELEdBQUcsR0FBR0UsTUFBTSxDQUFDRixHQUFELENBQXpCLENBRHVCLENBR3ZCOztBQUNBLE9BQUc7QUFDQ0MsTUFBQUEsTUFBTSxHQUFHRCxHQUFUO0FBQ0FBLE1BQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDdkIsT0FBSixDQUFZVCxZQUFaLEVBQTBCLEVBQTFCLENBQU47QUFDSCxLQUhELFFBR1NpQyxNQUFNLENBQUMzQixNQUFQLEtBQWtCMEIsR0FBRyxDQUFDMUIsTUFIL0I7O0FBSUEsV0FBTzBCLEdBQVA7QUFDSCxHQXRJMkI7QUF3STVCO0FBQ0FHLEVBQUFBLEdBQUcsRUFBR2xDLEVBQUUsQ0FBQ21DLEdBQUgsQ0FBT0MsRUFBUCxLQUFjcEMsRUFBRSxDQUFDbUMsR0FBSCxDQUFPRSxVQUFyQixHQUFrQyxJQUFsQyxHQUF5QyxHQXpJbkI7QUEySTVCO0FBQ0FDLEVBQUFBLFFBNUk0QixvQkE0SWxCckMsSUE1SWtCLEVBNElaO0FBQ1osV0FBT0EsSUFBSSxDQUFDTyxPQUFMLENBQWEsU0FBYixFQUF3QixFQUF4QixDQUFQO0FBQ0g7QUE5STJCLENBQWhDO0FBaUpBK0IsTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEMsRUFBRSxDQUFDQyxJQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxucmVxdWlyZSgnLi4vcGxhdGZvcm0vQ0NTeXMnKTtcblxudmFyIEVYVE5BTUVfUkUgPSAvKFxcLlteXFwuXFwvXFw/XFxcXF0qKShcXD8uKik/JC87XG52YXIgRElSTkFNRV9SRSA9IC8oKC4qKShcXC98XFxcXHxcXFxcXFxcXCkpPyguKj9cXC4uKiQpPy87XG52YXIgTk9STUFMSVpFX1JFID0gL1teXFwuXFwvXStcXC9cXC5cXC5cXC8vO1xuXG4vKipcbiAqICEjZW4gVGhlIG1vZHVsZSBwcm92aWRlcyB1dGlsaXRpZXMgZm9yIHdvcmtpbmcgd2l0aCBmaWxlIGFuZCBkaXJlY3RvcnkgcGF0aHNcbiAqICEjemgg55So5LqO5aSE55CG5paH5Lu25LiO55uu5b2V55qE6Lev5b6E55qE5qih5Z2XXG4gKiBAY2xhc3MgcGF0aFxuICogQHN0YXRpY1xuICovXG5jYy5wYXRoID0gLyoqIEBsZW5kcyBjYy5wYXRoIyAqL3tcbiAgICAvKipcbiAgICAgKiAhI2VuIEpvaW4gc3RyaW5ncyB0byBiZSBhIHBhdGguXG4gICAgICogISN6aCDmi7zmjqXlrZfnrKbkuLLkuLogUGF0aFxuICAgICAqIEBtZXRob2Qgam9pblxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2pvaW4uanN9XG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKi9cbiAgICBqb2luOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0ICsgKHJlc3VsdCA9PT0gXCJcIiA/IFwiXCIgOiBcIi9cIikgKyBhcmd1bWVudHNbaV0pLnJlcGxhY2UoLyhcXC98XFxcXFxcXFwpJC8sIFwiXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IHRoZSBleHQgbmFtZSBvZiBhIHBhdGggaW5jbHVkaW5nICcuJywgbGlrZSAnLnBuZycuXG4gICAgICogISN6aCDov5Tlm54gUGF0aCDnmoTmianlsZXlkI3vvIzljIXmi6wgJy4n77yM5L6L5aaCICcucG5nJ+OAglxuICAgICAqIEBtZXRob2QgZXh0bmFtZVxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2V4dG5hbWUuanN9XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhTdHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBleHRuYW1lOiBmdW5jdGlvbiAocGF0aFN0cikge1xuICAgICAgICB2YXIgdGVtcCA9IEVYVE5BTUVfUkUuZXhlYyhwYXRoU3RyKTtcbiAgICAgICAgcmV0dXJuIHRlbXAgPyB0ZW1wWzFdIDogJyc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IHRoZSBtYWluIG5hbWUgb2YgYSBmaWxlIG5hbWVcbiAgICAgKiAhI3poIOiOt+WPluaWh+S7tuWQjeeahOS4u+WQjeensFxuICAgICAqIEBtZXRob2QgbWFpbkZpbGVOYW1lXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZpbGVOYW1lXG4gICAgICogQHJldHVybnMge1N0cmluZ31cbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqL1xuICAgIG1haW5GaWxlTmFtZTogZnVuY3Rpb24gKGZpbGVOYW1lKSB7XG4gICAgICAgIGlmIChmaWxlTmFtZSkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IGZpbGVOYW1lLmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgICAgICAgICAgIGlmIChpZHggIT09IC0xKVxuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlTmFtZS5zdWJzdHJpbmcoMCwgaWR4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsZU5hbWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IHRoZSBmaWxlIG5hbWUgb2YgYSBmaWxlIHBhdGguXG4gICAgICogISN6aCDojrflj5bmlofku7bot6/lvoTnmoTmlofku7blkI3jgIJcbiAgICAgKiBAbWV0aG9kIGJhc2VuYW1lXG4gICAgICogQGV4YW1wbGUge0BsaW5rIGNvY29zMmQvY29yZS91dGlscy9DQ1BhdGgvYmFzZW5hbWUuanN9XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhTdHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW2V4dG5hbWVdXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgYmFzZW5hbWU6IGZ1bmN0aW9uIChwYXRoU3RyLCBleHRuYW1lKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHBhdGhTdHIuaW5kZXhPZihcIj9cIik7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHBhdGhTdHIgPSBwYXRoU3RyLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHZhciByZWcgPSAvKFxcL3xcXFxcKShbXlxcL1xcXFxdKykkL2c7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWcuZXhlYyhwYXRoU3RyLnJlcGxhY2UoLyhcXC98XFxcXCkkLywgXCJcIikpO1xuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHBhdGhTdHI7XG4gICAgICAgIHZhciBiYXNlTmFtZSA9IHJlc3VsdFsyXTtcbiAgICAgICAgaWYgKGV4dG5hbWUgJiYgcGF0aFN0ci5zdWJzdHJpbmcocGF0aFN0ci5sZW5ndGggLSBleHRuYW1lLmxlbmd0aCkudG9Mb3dlckNhc2UoKSA9PT0gZXh0bmFtZS50b0xvd2VyQ2FzZSgpKVxuICAgICAgICAgICAgcmV0dXJuIGJhc2VOYW1lLnN1YnN0cmluZygwLCBiYXNlTmFtZS5sZW5ndGggLSBleHRuYW1lLmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBiYXNlTmFtZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgZGlybmFtZSBvZiBhIGZpbGUgcGF0aC5cbiAgICAgKiAhI3poIOiOt+WPluaWh+S7tui3r+W+hOeahOebruW9leWQjeOAglxuICAgICAqIEBtZXRob2QgZGlybmFtZVxuICAgICAqIEBleGFtcGxlIHtAbGluayBjb2NvczJkL2NvcmUvdXRpbHMvQ0NQYXRoL2Rpcm5hbWUuanN9XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhTdHJcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBkaXJuYW1lOiBmdW5jdGlvbiAocGF0aFN0cikge1xuICAgICAgICB2YXIgdGVtcCA9IERJUk5BTUVfUkUuZXhlYyhwYXRoU3RyKTtcbiAgICAgICAgcmV0dXJuIHRlbXAgPyB0ZW1wWzJdIDogJyc7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQ2hhbmdlIGV4dG5hbWUgb2YgYSBmaWxlIHBhdGguXG4gICAgICogISN6aCDmm7TmlLnmlofku7bot6/lvoTnmoTmianlsZXlkI3jgIJcbiAgICAgKiBAbWV0aG9kIGNoYW5nZUV4dG5hbWVcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3V0aWxzL0NDUGF0aC9jaGFuZ2VFeHRuYW1lLmpzfVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoU3RyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IFtleHRuYW1lXVxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgY2hhbmdlRXh0bmFtZTogZnVuY3Rpb24gKHBhdGhTdHIsIGV4dG5hbWUpIHtcbiAgICAgICAgZXh0bmFtZSA9IGV4dG5hbWUgfHwgXCJcIjtcbiAgICAgICAgdmFyIGluZGV4ID0gcGF0aFN0ci5pbmRleE9mKFwiP1wiKTtcbiAgICAgICAgdmFyIHRlbXBTdHIgPSBcIlwiO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0ZW1wU3RyID0gcGF0aFN0ci5zdWJzdHJpbmcoaW5kZXgpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhTdHIuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IHBhdGhTdHIubGFzdEluZGV4T2YoXCIuXCIpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm4gcGF0aFN0ciArIGV4dG5hbWUgKyB0ZW1wU3RyO1xuICAgICAgICByZXR1cm4gcGF0aFN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpICsgZXh0bmFtZSArIHRlbXBTdHI7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAhI2VuIENoYW5nZSBmaWxlIG5hbWUgb2YgYSBmaWxlIHBhdGguXG4gICAgICogISN6aCDmm7TmlLnmlofku7bot6/lvoTnmoTmlofku7blkI3jgIJcbiAgICAgKiBAZXhhbXBsZSB7QGxpbmsgY29jb3MyZC9jb3JlL3V0aWxzL0NDUGF0aC9jaGFuZ2VCYXNlbmFtZS5qc31cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFN0clxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlbmFtZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzU2FtZUV4dF1cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgICAqL1xuICAgIGNoYW5nZUJhc2VuYW1lOiBmdW5jdGlvbiAocGF0aFN0ciwgYmFzZW5hbWUsIGlzU2FtZUV4dCkge1xuICAgICAgICBpZiAoYmFzZW5hbWUuaW5kZXhPZihcIi5cIikgPT09IDApIHJldHVybiB0aGlzLmNoYW5nZUV4dG5hbWUocGF0aFN0ciwgYmFzZW5hbWUpO1xuICAgICAgICB2YXIgaW5kZXggPSBwYXRoU3RyLmluZGV4T2YoXCI/XCIpO1xuICAgICAgICB2YXIgdGVtcFN0ciA9IFwiXCI7XG4gICAgICAgIHZhciBleHQgPSBpc1NhbWVFeHQgPyB0aGlzLmV4dG5hbWUocGF0aFN0cikgOiBcIlwiO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICB0ZW1wU3RyID0gcGF0aFN0ci5zdWJzdHJpbmcoaW5kZXgpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhTdHIuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IHBhdGhTdHIubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICBpbmRleCA9IGluZGV4IDw9IDAgPyAwIDogaW5kZXggKyAxO1xuICAgICAgICByZXR1cm4gcGF0aFN0ci5zdWJzdHJpbmcoMCwgaW5kZXgpICsgYmFzZW5hbWUgKyBleHQgKyB0ZW1wU3RyO1xuICAgIH0sXG4gICAgLy90b2RvIG1ha2UgcHVibGljIGFmdGVyIHZlcmlmaWNhdGlvblxuICAgIF9ub3JtYWxpemU6IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgdmFyIG9sZFVybCA9IHVybCA9IFN0cmluZyh1cmwpO1xuXG4gICAgICAgIC8vcmVtb3ZpbmcgYWxsIC4uL1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBvbGRVcmwgPSB1cmw7XG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShOT1JNQUxJWkVfUkUsIFwiXCIpO1xuICAgICAgICB9IHdoaWxlIChvbGRVcmwubGVuZ3RoICE9PSB1cmwubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9LFxuXG4gICAgLy8gVGhlIHBsYXRmb3JtLXNwZWNpZmljIGZpbGUgc2VwYXJhdG9yLiAnXFxcXCcgb3IgJy8nLlxuICAgIHNlcDogKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX1dJTkRPV1MgPyAnXFxcXCcgOiAnLycpLFxuXG4gICAgLy8gQHBhcmFtIHtzdHJpbmd9IHBhdGhcbiAgICBzdHJpcFNlcCAocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9bXFwvXFxcXF0kLywgJycpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2MucGF0aDsiXSwic291cmNlUm9vdCI6Ii8ifQ==