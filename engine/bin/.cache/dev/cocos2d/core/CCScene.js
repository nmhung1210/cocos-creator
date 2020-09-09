
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCScene.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2015-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var NIL = function NIL() {};
/**
 * !#en
 * cc.Scene is a subclass of cc.Node that is used only as an abstract concept.<br/>
 * cc.Scene and cc.Node are almost identical with the difference that users can not modify cc.Scene manually.
 * !#zh
 * cc.Scene 是 cc.Node 的子类，仅作为一个抽象的概念。<br/>
 * cc.Scene 和 cc.Node 有点不同，用户不应直接修改 cc.Scene。
 * @class Scene
 * @extends Node
 */


cc.Scene = cc.Class({
  name: 'cc.Scene',
  "extends": require('./CCNode'),
  properties: {
    _is3DNode: {
      "default": true,
      override: true
    },

    /**
     * !#en Indicates whether all (directly or indirectly) static referenced assets of this scene are releasable by default after scene unloading.
     * !#zh 指示该场景中直接或间接静态引用到的所有资源是否默认在场景切换后自动释放。
     * @property {Boolean} autoReleaseAssets
     * @default true
     */
    autoReleaseAssets: true
  },
  ctor: function ctor() {
    this._anchorPoint.x = 0.0;
    this._anchorPoint.y = 0.0;
    this._activeInHierarchy = false;
    this._inited = !cc.game._isCloning;

    if (CC_EDITOR) {
      this._prefabSyncedInLiveReload = false;
    } // cache all depend assets for auto release


    this.dependAssets = null;
  },
  destroy: function destroy() {
    if (cc.Object.prototype.destroy.call(this)) {
      var children = this._children;

      for (var i = 0; i < children.length; ++i) {
        children[i].active = false;
      }
    }

    this._active = false;
    this._activeInHierarchy = false;
  },
  _onHierarchyChanged: NIL,
  _instantiate: null,
  _load: function _load() {
    if (!this._inited) {
      if (CC_TEST) {
        cc.assert(!this._activeInHierarchy, 'Should deactivate ActionManager and EventManager by default');
      }

      if (CC_EDITOR && this._prefabSyncedInLiveReload) {
        this._onBatchRestored();
      } else {
        this._onBatchCreated();
      }

      this._inited = true;
    }
  },
  _activate: function _activate(active) {
    active = active !== false;

    if (CC_EDITOR || CC_TEST) {
      // register all nodes to editor
      this._registerIfAttached(active);
    }

    cc.director._nodeActivator.activateNode(this, active);
  }
});
module.exports = cc.Scene;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDU2NlbmUuanMiXSwibmFtZXMiOlsiTklMIiwiY2MiLCJTY2VuZSIsIkNsYXNzIiwibmFtZSIsInJlcXVpcmUiLCJwcm9wZXJ0aWVzIiwiX2lzM0ROb2RlIiwib3ZlcnJpZGUiLCJhdXRvUmVsZWFzZUFzc2V0cyIsImN0b3IiLCJfYW5jaG9yUG9pbnQiLCJ4IiwieSIsIl9hY3RpdmVJbkhpZXJhcmNoeSIsIl9pbml0ZWQiLCJnYW1lIiwiX2lzQ2xvbmluZyIsIkNDX0VESVRPUiIsIl9wcmVmYWJTeW5jZWRJbkxpdmVSZWxvYWQiLCJkZXBlbmRBc3NldHMiLCJkZXN0cm95IiwiT2JqZWN0IiwicHJvdG90eXBlIiwiY2FsbCIsImNoaWxkcmVuIiwiX2NoaWxkcmVuIiwiaSIsImxlbmd0aCIsImFjdGl2ZSIsIl9hY3RpdmUiLCJfb25IaWVyYXJjaHlDaGFuZ2VkIiwiX2luc3RhbnRpYXRlIiwiX2xvYWQiLCJDQ19URVNUIiwiYXNzZXJ0IiwiX29uQmF0Y2hSZXN0b3JlZCIsIl9vbkJhdGNoQ3JlYXRlZCIsIl9hY3RpdmF0ZSIsIl9yZWdpc3RlcklmQXR0YWNoZWQiLCJkaXJlY3RvciIsIl9ub2RlQWN0aXZhdG9yIiwiYWN0aXZhdGVOb2RlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkEsSUFBSUEsR0FBRyxHQUFHLFNBQU5BLEdBQU0sR0FBWSxDQUFFLENBQXhCO0FBRUE7Ozs7Ozs7Ozs7OztBQVVBQyxFQUFFLENBQUNDLEtBQUgsR0FBV0QsRUFBRSxDQUFDRSxLQUFILENBQVM7QUFDaEJDLEVBQUFBLElBQUksRUFBRSxVQURVO0FBRWhCLGFBQVNDLE9BQU8sQ0FBQyxVQUFELENBRkE7QUFJaEJDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBDLE1BQUFBLFFBQVEsRUFBRTtBQUZILEtBREg7O0FBTVI7Ozs7OztBQU1BQyxJQUFBQSxpQkFBaUIsRUFBRTtBQVpYLEdBSkk7QUFtQmhCQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxTQUFLQyxZQUFMLENBQWtCQyxDQUFsQixHQUFzQixHQUF0QjtBQUNBLFNBQUtELFlBQUwsQ0FBa0JFLENBQWxCLEdBQXNCLEdBQXRCO0FBRUEsU0FBS0Msa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsQ0FBQ2QsRUFBRSxDQUFDZSxJQUFILENBQVFDLFVBQXhCOztBQUVBLFFBQUlDLFNBQUosRUFBZTtBQUNYLFdBQUtDLHlCQUFMLEdBQWlDLEtBQWpDO0FBQ0gsS0FUYSxDQVdkOzs7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0gsR0FoQ2U7QUFrQ2hCQyxFQUFBQSxPQUFPLEVBQUUsbUJBQVk7QUFDakIsUUFBSXBCLEVBQUUsQ0FBQ3FCLE1BQUgsQ0FBVUMsU0FBVixDQUFvQkYsT0FBcEIsQ0FBNEJHLElBQTVCLENBQWlDLElBQWpDLENBQUosRUFBNEM7QUFDeEMsVUFBSUMsUUFBUSxHQUFHLEtBQUtDLFNBQXBCOztBQUNBLFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUE3QixFQUFxQyxFQUFFRCxDQUF2QyxFQUEwQztBQUN0Q0YsUUFBQUEsUUFBUSxDQUFDRSxDQUFELENBQVIsQ0FBWUUsTUFBWixHQUFxQixLQUFyQjtBQUNIO0FBQ0o7O0FBQ0QsU0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxTQUFLaEIsa0JBQUwsR0FBMEIsS0FBMUI7QUFDSCxHQTNDZTtBQTZDaEJpQixFQUFBQSxtQkFBbUIsRUFBRS9CLEdBN0NMO0FBOENoQmdDLEVBQUFBLFlBQVksRUFBRyxJQTlDQztBQWdEaEJDLEVBQUFBLEtBQUssRUFBRSxpQkFBWTtBQUNmLFFBQUksQ0FBQyxLQUFLbEIsT0FBVixFQUFtQjtBQUNmLFVBQUltQixPQUFKLEVBQWE7QUFDVGpDLFFBQUFBLEVBQUUsQ0FBQ2tDLE1BQUgsQ0FBVSxDQUFDLEtBQUtyQixrQkFBaEIsRUFBb0MsNkRBQXBDO0FBQ0g7O0FBQ0QsVUFBSUksU0FBUyxJQUFJLEtBQUtDLHlCQUF0QixFQUFpRDtBQUM3QyxhQUFLaUIsZ0JBQUw7QUFDSCxPQUZELE1BR0s7QUFDRCxhQUFLQyxlQUFMO0FBQ0g7O0FBQ0QsV0FBS3RCLE9BQUwsR0FBZSxJQUFmO0FBQ0g7QUFDSixHQTdEZTtBQStEaEJ1QixFQUFBQSxTQUFTLEVBQUUsbUJBQVVULE1BQVYsRUFBa0I7QUFDekJBLElBQUFBLE1BQU0sR0FBSUEsTUFBTSxLQUFLLEtBQXJCOztBQUNBLFFBQUlYLFNBQVMsSUFBSWdCLE9BQWpCLEVBQTBCO0FBQ3RCO0FBQ0EsV0FBS0ssbUJBQUwsQ0FBeUJWLE1BQXpCO0FBQ0g7O0FBQ0Q1QixJQUFBQSxFQUFFLENBQUN1QyxRQUFILENBQVlDLGNBQVosQ0FBMkJDLFlBQTNCLENBQXdDLElBQXhDLEVBQThDYixNQUE5QztBQUNIO0FBdEVlLENBQVQsQ0FBWDtBQXlFQWMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCM0MsRUFBRSxDQUFDQyxLQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE1LTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG52YXIgTklMID0gZnVuY3Rpb24gKCkge307XG5cbi8qKlxuICogISNlblxuICogY2MuU2NlbmUgaXMgYSBzdWJjbGFzcyBvZiBjYy5Ob2RlIHRoYXQgaXMgdXNlZCBvbmx5IGFzIGFuIGFic3RyYWN0IGNvbmNlcHQuPGJyLz5cbiAqIGNjLlNjZW5lIGFuZCBjYy5Ob2RlIGFyZSBhbG1vc3QgaWRlbnRpY2FsIHdpdGggdGhlIGRpZmZlcmVuY2UgdGhhdCB1c2VycyBjYW4gbm90IG1vZGlmeSBjYy5TY2VuZSBtYW51YWxseS5cbiAqICEjemhcbiAqIGNjLlNjZW5lIOaYryBjYy5Ob2RlIOeahOWtkOexu++8jOS7heS9nOS4uuS4gOS4quaKveixoeeahOamguW/teOAgjxici8+XG4gKiBjYy5TY2VuZSDlkowgY2MuTm9kZSDmnInngrnkuI3lkIzvvIznlKjmiLfkuI3lupTnm7TmjqXkv67mlLkgY2MuU2NlbmXjgIJcbiAqIEBjbGFzcyBTY2VuZVxuICogQGV4dGVuZHMgTm9kZVxuICovXG5jYy5TY2VuZSA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnY2MuU2NlbmUnLFxuICAgIGV4dGVuZHM6IHJlcXVpcmUoJy4vQ0NOb2RlJyksXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIF9pczNETm9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIG92ZXJyaWRlOiB0cnVlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgYWxsIChkaXJlY3RseSBvciBpbmRpcmVjdGx5KSBzdGF0aWMgcmVmZXJlbmNlZCBhc3NldHMgb2YgdGhpcyBzY2VuZSBhcmUgcmVsZWFzYWJsZSBieSBkZWZhdWx0IGFmdGVyIHNjZW5lIHVubG9hZGluZy5cbiAgICAgICAgICogISN6aCDmjIfnpLror6XlnLrmma/kuK3nm7TmjqXmiJbpl7TmjqXpnZnmgIHlvJXnlKjliLDnmoTmiYDmnInotYTmupDmmK/lkKbpu5jorqTlnKjlnLrmma/liIfmjaLlkI7oh6rliqjph4rmlL7jgIJcbiAgICAgICAgICogQHByb3BlcnR5IHtCb29sZWFufSBhdXRvUmVsZWFzZUFzc2V0c1xuICAgICAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICAgICAqL1xuICAgICAgICBhdXRvUmVsZWFzZUFzc2V0czogdHJ1ZSxcbiAgICB9LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9hbmNob3JQb2ludC54ID0gMC4wO1xuICAgICAgICB0aGlzLl9hbmNob3JQb2ludC55ID0gMC4wO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2ZUluSGllcmFyY2h5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2luaXRlZCA9ICFjYy5nYW1lLl9pc0Nsb25pbmc7XG5cbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgdGhpcy5fcHJlZmFiU3luY2VkSW5MaXZlUmVsb2FkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWNoZSBhbGwgZGVwZW5kIGFzc2V0cyBmb3IgYXV0byByZWxlYXNlXG4gICAgICAgIHRoaXMuZGVwZW5kQXNzZXRzID0gbnVsbDtcbiAgICB9LFxuXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2MuT2JqZWN0LnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBfb25IaWVyYXJjaHlDaGFuZ2VkOiBOSUwsXG4gICAgX2luc3RhbnRpYXRlIDogbnVsbCxcblxuICAgIF9sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faW5pdGVkKSB7XG4gICAgICAgICAgICBpZiAoQ0NfVEVTVCkge1xuICAgICAgICAgICAgICAgIGNjLmFzc2VydCghdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHksICdTaG91bGQgZGVhY3RpdmF0ZSBBY3Rpb25NYW5hZ2VyIGFuZCBFdmVudE1hbmFnZXIgYnkgZGVmYXVsdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENDX0VESVRPUiAmJiB0aGlzLl9wcmVmYWJTeW5jZWRJbkxpdmVSZWxvYWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkJhdGNoUmVzdG9yZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQmF0Y2hDcmVhdGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9pbml0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9hY3RpdmF0ZTogZnVuY3Rpb24gKGFjdGl2ZSkge1xuICAgICAgICBhY3RpdmUgPSAoYWN0aXZlICE9PSBmYWxzZSk7XG4gICAgICAgIGlmIChDQ19FRElUT1IgfHwgQ0NfVEVTVCkge1xuICAgICAgICAgICAgLy8gcmVnaXN0ZXIgYWxsIG5vZGVzIHRvIGVkaXRvclxuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZkF0dGFjaGVkKGFjdGl2ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2MuZGlyZWN0b3IuX25vZGVBY3RpdmF0b3IuYWN0aXZhdGVOb2RlKHRoaXMsIGFjdGl2ZSk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2MuU2NlbmU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==