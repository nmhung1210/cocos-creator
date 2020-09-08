
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/asset-manager/builtins.js';
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

var releaseManager = require('./releaseManager');

var _require = require('./shared'),
    BuiltinBundleName = _require.BuiltinBundleName;
/**
 * @module cc.AssetManager
 */

/**
 * !#en
 * This module contains the builtin asset, it's a singleton, all member can be accessed with `cc.assetManager.builtins` 
 * 
 * !#zh
 * 此模块包含内建资源，这是一个单例，所有成员能通过 `cc.assetManager.builtins` 访问
 * 
 * @class Builtins
 */


var builtins = {
  _assets: new Cache({
    material: new Cache(),
    effect: new Cache()
  }),
  // builtin assets
  _loadBuiltins: function _loadBuiltins(name, cb) {
    var dirname = name + 's';

    var builtin = this._assets.get(name);

    return cc.assetManager.internal.loadDir(dirname, null, null, function (err, assets) {
      if (err) {
        cc.error(err.message, err.stack);
      } else {
        for (var i = 0; i < assets.length; i++) {
          var asset = assets[i];
          builtin.add(asset.name, asset.addRef());
        }
      }

      cb();
    });
  },

  /**
   * !#en
   * Initialize
   * 
   * !#zh
   * 初始化 
   * 
   * @method init
   * @param {Function} cb - Callback when finish loading built-in assets
   * 
   * @typescript
   * init (cb: () => void): void
   */
  init: function init(cb) {
    var _this = this;

    this.clear();

    if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS || !cc.assetManager.bundles.has(BuiltinBundleName.INTERNAL)) {
      return cb && cb();
    }

    this._loadBuiltins('effect', function () {
      _this._loadBuiltins('material', cb);
    });
  },

  /**
   * !#en
   * Get the built-in asset using specific type and name.
   * 
   * !#zh
   * 通过特定的类型和名称获取内建资源
   * 
   * @method getBuiltin
   * @param {string} [type] - The type of asset, such as `effect`
   * @param {string} [name] - The name of asset, such as `phong`
   * @return {Asset|Cache} Builtin-assets
   * 
   * @example
   * cc.assetManaer.builtins.getBuiltin('effect', 'phone');
   * 
   * @typescript
   * getBuiltin(type?: string, name?: string): cc.Asset | Cache<cc.Asset>
   */
  getBuiltin: function getBuiltin(type, name) {
    if (arguments.length === 0) return this._assets;else if (arguments.length === 1) return this._assets.get(type);else return this._assets.get(type).get(name);
  },

  /**
   * !#en
   * Clear all builtin assets
   * 
   * !#zh
   * 清空所有内置资源
   * 
   * @method clear
   * 
   * @typescript
   * clear(): void
   */
  clear: function clear() {
    this._assets.forEach(function (assets) {
      assets.forEach(function (asset) {
        releaseManager.tryRelease(asset, true);
      });
      assets.clear();
    });
  }
};
module.exports = builtins;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL2Fzc2V0LW1hbmFnZXIvYnVpbHRpbnMuanMiXSwibmFtZXMiOlsiQ2FjaGUiLCJyZXF1aXJlIiwicmVsZWFzZU1hbmFnZXIiLCJCdWlsdGluQnVuZGxlTmFtZSIsImJ1aWx0aW5zIiwiX2Fzc2V0cyIsIm1hdGVyaWFsIiwiZWZmZWN0IiwiX2xvYWRCdWlsdGlucyIsIm5hbWUiLCJjYiIsImRpcm5hbWUiLCJidWlsdGluIiwiZ2V0IiwiY2MiLCJhc3NldE1hbmFnZXIiLCJpbnRlcm5hbCIsImxvYWREaXIiLCJlcnIiLCJhc3NldHMiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGFjayIsImkiLCJsZW5ndGgiLCJhc3NldCIsImFkZCIsImFkZFJlZiIsImluaXQiLCJjbGVhciIsImdhbWUiLCJyZW5kZXJUeXBlIiwiUkVOREVSX1RZUEVfQ0FOVkFTIiwiYnVuZGxlcyIsImhhcyIsIklOVEVSTkFMIiwiZ2V0QnVpbHRpbiIsInR5cGUiLCJhcmd1bWVudHMiLCJmb3JFYWNoIiwidHJ5UmVsZWFzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHRCxPQUFPLENBQUMsa0JBQUQsQ0FBOUI7O2VBQzhCQSxPQUFPLENBQUMsVUFBRDtJQUE3QkUsNkJBQUFBO0FBRVI7Ozs7QUFHQTs7Ozs7Ozs7Ozs7QUFTQSxJQUFJQyxRQUFRLEdBQUc7QUFFWEMsRUFBQUEsT0FBTyxFQUFFLElBQUlMLEtBQUosQ0FBVTtBQUFFTSxJQUFBQSxRQUFRLEVBQUUsSUFBSU4sS0FBSixFQUFaO0FBQXlCTyxJQUFBQSxNQUFNLEVBQUUsSUFBSVAsS0FBSjtBQUFqQyxHQUFWLENBRkU7QUFFeUQ7QUFFcEVRLEVBQUFBLGFBSlcseUJBSUlDLElBSkosRUFJVUMsRUFKVixFQUljO0FBQ3JCLFFBQUlDLE9BQU8sR0FBR0YsSUFBSSxHQUFJLEdBQXRCOztBQUNBLFFBQUlHLE9BQU8sR0FBRyxLQUFLUCxPQUFMLENBQWFRLEdBQWIsQ0FBaUJKLElBQWpCLENBQWQ7O0FBQ0EsV0FBT0ssRUFBRSxDQUFDQyxZQUFILENBQWdCQyxRQUFoQixDQUF5QkMsT0FBekIsQ0FBaUNOLE9BQWpDLEVBQTBDLElBQTFDLEVBQWdELElBQWhELEVBQXNELFVBQUNPLEdBQUQsRUFBTUMsTUFBTixFQUFpQjtBQUMxRSxVQUFJRCxHQUFKLEVBQVM7QUFDTEosUUFBQUEsRUFBRSxDQUFDTSxLQUFILENBQVNGLEdBQUcsQ0FBQ0csT0FBYixFQUFzQkgsR0FBRyxDQUFDSSxLQUExQjtBQUNILE9BRkQsTUFHSztBQUNELGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osTUFBTSxDQUFDSyxNQUEzQixFQUFtQ0QsQ0FBQyxFQUFwQyxFQUF3QztBQUNwQyxjQUFJRSxLQUFLLEdBQUdOLE1BQU0sQ0FBQ0ksQ0FBRCxDQUFsQjtBQUNBWCxVQUFBQSxPQUFPLENBQUNjLEdBQVIsQ0FBWUQsS0FBSyxDQUFDaEIsSUFBbEIsRUFBd0JnQixLQUFLLENBQUNFLE1BQU4sRUFBeEI7QUFDSDtBQUNKOztBQUVEakIsTUFBQUEsRUFBRTtBQUNMLEtBWk0sQ0FBUDtBQWFILEdBcEJVOztBQXNCWDs7Ozs7Ozs7Ozs7OztBQWFBa0IsRUFBQUEsSUFuQ1csZ0JBbUNMbEIsRUFuQ0ssRUFtQ0Q7QUFBQTs7QUFDTixTQUFLbUIsS0FBTDs7QUFDQSxRQUFJZixFQUFFLENBQUNnQixJQUFILENBQVFDLFVBQVIsS0FBdUJqQixFQUFFLENBQUNnQixJQUFILENBQVFFLGtCQUEvQixJQUFxRCxDQUFDbEIsRUFBRSxDQUFDQyxZQUFILENBQWdCa0IsT0FBaEIsQ0FBd0JDLEdBQXhCLENBQTRCL0IsaUJBQWlCLENBQUNnQyxRQUE5QyxDQUExRCxFQUFtSDtBQUMvRyxhQUFPekIsRUFBRSxJQUFJQSxFQUFFLEVBQWY7QUFDSDs7QUFFRCxTQUFLRixhQUFMLENBQW1CLFFBQW5CLEVBQTZCLFlBQU07QUFDL0IsTUFBQSxLQUFJLENBQUNBLGFBQUwsQ0FBbUIsVUFBbkIsRUFBK0JFLEVBQS9CO0FBQ0gsS0FGRDtBQUdILEdBNUNVOztBQThDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBMEIsRUFBQUEsVUFoRVcsc0JBZ0VDQyxJQWhFRCxFQWdFTzVCLElBaEVQLEVBZ0VhO0FBQ3BCLFFBQUk2QixTQUFTLENBQUNkLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEIsT0FBTyxLQUFLbkIsT0FBWixDQUE1QixLQUNLLElBQUlpQyxTQUFTLENBQUNkLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEIsT0FBTyxLQUFLbkIsT0FBTCxDQUFhUSxHQUFiLENBQWlCd0IsSUFBakIsQ0FBUCxDQUE1QixLQUNBLE9BQU8sS0FBS2hDLE9BQUwsQ0FBYVEsR0FBYixDQUFpQndCLElBQWpCLEVBQXVCeEIsR0FBdkIsQ0FBMkJKLElBQTNCLENBQVA7QUFDUixHQXBFVTs7QUFzRVg7Ozs7Ozs7Ozs7OztBQVlBb0IsRUFBQUEsS0FsRlcsbUJBa0ZGO0FBQ0wsU0FBS3hCLE9BQUwsQ0FBYWtDLE9BQWIsQ0FBcUIsVUFBVXBCLE1BQVYsRUFBa0I7QUFDbkNBLE1BQUFBLE1BQU0sQ0FBQ29CLE9BQVAsQ0FBZSxVQUFVZCxLQUFWLEVBQWlCO0FBQzVCdkIsUUFBQUEsY0FBYyxDQUFDc0MsVUFBZixDQUEwQmYsS0FBMUIsRUFBaUMsSUFBakM7QUFDSCxPQUZEO0FBR0FOLE1BQUFBLE1BQU0sQ0FBQ1UsS0FBUDtBQUNILEtBTEQ7QUFNSDtBQXpGVSxDQUFmO0FBNEZBWSxNQUFNLENBQUNDLE9BQVAsR0FBaUJ0QyxRQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE5IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuICB3b3JsZHdpZGUsIHJveWFsdHktZnJlZSwgbm9uLWFzc2lnbmFibGUsIHJldm9jYWJsZSBhbmQgbm9uLWV4Y2x1c2l2ZSBsaWNlbnNlXG4gdG8gdXNlIENvY29zIENyZWF0b3Igc29sZWx5IHRvIGRldmVsb3AgZ2FtZXMgb24geW91ciB0YXJnZXQgcGxhdGZvcm1zLiBZb3Ugc2hhbGxcbiAgbm90IHVzZSBDb2NvcyBDcmVhdG9yIHNvZnR3YXJlIGZvciBkZXZlbG9waW5nIG90aGVyIHNvZnR3YXJlIG9yIHRvb2xzIHRoYXQnc1xuICB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiBDb2NvcyBDcmVhdG9yLlxuXG4gVGhlIHNvZnR3YXJlIG9yIHRvb2xzIGluIHRoaXMgTGljZW5zZSBBZ3JlZW1lbnQgYXJlIGxpY2Vuc2VkLCBub3Qgc29sZC5cbiBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC4gcmVzZXJ2ZXMgYWxsIHJpZ2h0cyBub3QgZXhwcmVzc2x5IGdyYW50ZWQgdG8geW91LlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNvbnN0IENhY2hlID0gcmVxdWlyZSgnLi9jYWNoZScpO1xuY29uc3QgcmVsZWFzZU1hbmFnZXIgPSByZXF1aXJlKCcuL3JlbGVhc2VNYW5hZ2VyJyk7XG5jb25zdCB7IEJ1aWx0aW5CdW5kbGVOYW1lIH0gPSByZXF1aXJlKCcuL3NoYXJlZCcpOyBcblxuLyoqXG4gKiBAbW9kdWxlIGNjLkFzc2V0TWFuYWdlclxuICovXG4vKipcbiAqICEjZW5cbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIHRoZSBidWlsdGluIGFzc2V0LCBpdCdzIGEgc2luZ2xldG9uLCBhbGwgbWVtYmVyIGNhbiBiZSBhY2Nlc3NlZCB3aXRoIGBjYy5hc3NldE1hbmFnZXIuYnVpbHRpbnNgIFxuICogXG4gKiAhI3poXG4gKiDmraTmqKHlnZfljIXlkKvlhoXlu7rotYTmupDvvIzov5nmmK/kuIDkuKrljZXkvovvvIzmiYDmnInmiJDlkZjog73pgJrov4cgYGNjLmFzc2V0TWFuYWdlci5idWlsdGluc2Ag6K6/6ZeuXG4gKiBcbiAqIEBjbGFzcyBCdWlsdGluc1xuICovXG52YXIgYnVpbHRpbnMgPSB7XG4gICAgXG4gICAgX2Fzc2V0czogbmV3IENhY2hlKHsgbWF0ZXJpYWw6IG5ldyBDYWNoZSgpLCBlZmZlY3Q6IG5ldyBDYWNoZSgpIH0pLCAvLyBidWlsdGluIGFzc2V0c1xuXG4gICAgX2xvYWRCdWlsdGlucyAobmFtZSwgY2IpIHtcbiAgICAgICAgbGV0IGRpcm5hbWUgPSBuYW1lICArICdzJztcbiAgICAgICAgbGV0IGJ1aWx0aW4gPSB0aGlzLl9hc3NldHMuZ2V0KG5hbWUpO1xuICAgICAgICByZXR1cm4gY2MuYXNzZXRNYW5hZ2VyLmludGVybmFsLmxvYWREaXIoZGlybmFtZSwgbnVsbCwgbnVsbCwgKGVyciwgYXNzZXRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXNzZXQgPSBhc3NldHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1aWx0aW4uYWRkKGFzc2V0Lm5hbWUsIGFzc2V0LmFkZFJlZigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogSW5pdGlhbGl6ZVxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDliJ3lp4vljJYgXG4gICAgICogXG4gICAgICogQG1ldGhvZCBpbml0XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgLSBDYWxsYmFjayB3aGVuIGZpbmlzaCBsb2FkaW5nIGJ1aWx0LWluIGFzc2V0c1xuICAgICAqIFxuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogaW5pdCAoY2I6ICgpID0+IHZvaWQpOiB2b2lkXG4gICAgICovXG4gICAgaW5pdCAoY2IpIHtcbiAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICBpZiAoY2MuZ2FtZS5yZW5kZXJUeXBlID09PSBjYy5nYW1lLlJFTkRFUl9UWVBFX0NBTlZBUyB8fCAhY2MuYXNzZXRNYW5hZ2VyLmJ1bmRsZXMuaGFzKEJ1aWx0aW5CdW5kbGVOYW1lLklOVEVSTkFMKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNiICYmIGNiKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sb2FkQnVpbHRpbnMoJ2VmZmVjdCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2xvYWRCdWlsdGlucygnbWF0ZXJpYWwnLCBjYik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogR2V0IHRoZSBidWlsdC1pbiBhc3NldCB1c2luZyBzcGVjaWZpYyB0eXBlIGFuZCBuYW1lLlxuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDpgJrov4fnibnlrprnmoTnsbvlnovlkozlkI3np7Dojrflj5blhoXlu7rotYTmupBcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGdldEJ1aWx0aW5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3R5cGVdIC0gVGhlIHR5cGUgb2YgYXNzZXQsIHN1Y2ggYXMgYGVmZmVjdGBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW25hbWVdIC0gVGhlIG5hbWUgb2YgYXNzZXQsIHN1Y2ggYXMgYHBob25nYFxuICAgICAqIEByZXR1cm4ge0Fzc2V0fENhY2hlfSBCdWlsdGluLWFzc2V0c1xuICAgICAqIFxuICAgICAqIEBleGFtcGxlXG4gICAgICogY2MuYXNzZXRNYW5hZXIuYnVpbHRpbnMuZ2V0QnVpbHRpbignZWZmZWN0JywgJ3Bob25lJyk7XG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRCdWlsdGluKHR5cGU/OiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiBjYy5Bc3NldCB8IENhY2hlPGNjLkFzc2V0PlxuICAgICAqL1xuICAgIGdldEJ1aWx0aW4gKHR5cGUsIG5hbWUpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLl9hc3NldHM7XG4gICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHJldHVybiB0aGlzLl9hc3NldHMuZ2V0KHR5cGUpO1xuICAgICAgICBlbHNlIHJldHVybiB0aGlzLl9hc3NldHMuZ2V0KHR5cGUpLmdldChuYW1lKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIENsZWFyIGFsbCBidWlsdGluIGFzc2V0c1xuICAgICAqIFxuICAgICAqICEjemhcbiAgICAgKiDmuIXnqbrmiYDmnInlhoXnva7otYTmupBcbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIGNsZWFyXG4gICAgICogXG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBjbGVhcigpOiB2b2lkXG4gICAgICovXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9hc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXRzKSB7XG4gICAgICAgICAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgICAgICAgICAgICByZWxlYXNlTWFuYWdlci50cnlSZWxlYXNlKGFzc2V0LCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYXNzZXRzLmNsZWFyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidWlsdGlucztcbiJdLCJzb3VyY2VSb290IjoiLyJ9