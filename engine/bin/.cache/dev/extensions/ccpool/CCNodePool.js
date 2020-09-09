
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/extensions/ccpool/CCNodePool.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2016 Chukong Technologies Inc.
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

/**
 * !#en
 *  cc.NodePool is the cache pool designed for node type.<br/>
 *  It can helps you to improve your game performance for objects which need frequent release and recreate operations<br/>
 *
 * It's recommended to create cc.NodePool instances by node type, the type corresponds to node type in game design, not the class, 
 * for example, a prefab is a specific node type. <br/>
 * When you create a node pool, you can pass a Component which contains `unuse`, `reuse` functions to control the content of node.<br/>
 *
 * Some common use case is :<br/>
 *      1. Bullets in game (die very soon, massive creation and recreation, no side effect on other objects)<br/>
 *      2. Blocks in candy crash (massive creation and recreation)<br/>
 *      etc...
 * !#zh
 * cc.NodePool 是用于管理节点对象的对象缓存池。<br/>
 * 它可以帮助您提高游戏性能，适用于优化对象的反复创建和销毁<br/>
 * 以前 cocos2d-x 中的 cc.pool 和新的节点事件注册系统不兼容，因此请使用 cc.NodePool 来代替。
 *
 * 新的 NodePool 需要实例化之后才能使用，每种不同的节点对象池需要一个不同的对象池实例，这里的种类对应于游戏中的节点设计，一个 prefab 相当于一个种类的节点。<br/>
 * 在创建缓冲池时，可以传入一个包含 unuse, reuse 函数的组件类型用于节点的回收和复用逻辑。<br/>
 *
 * 一些常见的用例是：<br/>
 *      1.在游戏中的子弹（死亡很快，频繁创建，对其他对象无副作用）<br/>
 *      2.糖果粉碎传奇中的木块（频繁创建）。
 *      等等....
 * @class NodePool
 */

/**
 * !#en
 * Constructor for creating a pool for a specific node template (usually a prefab). You can pass a component (type or name) argument for handling event for reusing and recycling node.
 * !#zh
 * 使用构造函数来创建一个节点专用的对象池，您可以传递一个组件类型或名称，用于处理节点回收和复用时的事件逻辑。
 * @method constructor
 * @param {Function|String} [poolHandlerComp] !#en The constructor or the class name of the component to control the unuse/reuse logic. !#zh 处理节点回收和复用事件逻辑的组件类型或名称。
 * @example
 *  properties: {
 *    template: cc.Prefab
 *  },
 *  onLoad () {
      // MyTemplateHandler is a component with 'unuse' and 'reuse' to handle events when node is reused or recycled.
 *    this.myPool = new cc.NodePool('MyTemplateHandler');
 *  }
 * @typescript
 * constructor(poolHandlerComp?: {prototype: Component}|string)
 */
cc.NodePool = function (poolHandlerComp) {
  /**
   * !#en The pool handler component, it could be the class name or the constructor.
   * !#zh 缓冲池处理组件，用于节点的回收和复用逻辑，这个属性可以是组件类名或组件的构造函数。
   * @property poolHandlerComp
   * @type {Function|String}
   */
  this.poolHandlerComp = poolHandlerComp;
  this._pool = [];
};

cc.NodePool.prototype = {
  constructor: cc.NodePool,

  /**
   * !#en The current available size in the pool
   * !#zh 获取当前缓冲池的可用对象数量
   * @method size
   * @return {Number}
   */
  size: function size() {
    return this._pool.length;
  },

  /**
   * !#en Destroy all cached nodes in the pool
   * !#zh 销毁对象池中缓存的所有节点
   * @method clear
   */
  clear: function clear() {
    var count = this._pool.length;

    for (var i = 0; i < count; ++i) {
      this._pool[i].destroy();
    }

    this._pool.length = 0;
  },

  /**
   * !#en Put a new Node into the pool.
   * It will automatically remove the node from its parent without cleanup.
   * It will also invoke unuse method of the poolHandlerComp if exist.
   * !#zh 向缓冲池中存入一个不再需要的节点对象。
   * 这个函数会自动将目标节点从父节点上移除，但是不会进行 cleanup 操作。
   * 这个函数会调用 poolHandlerComp 的 unuse 函数，如果组件和函数都存在的话。
   * @method put
   * @param {Node} obj
   * @example
   *   let myNode = cc.instantiate(this.template);
   *   this.myPool.put(myNode);
   */
  put: function put(obj) {
    if (obj && this._pool.indexOf(obj) === -1) {
      // Remove from parent, but don't cleanup
      obj.removeFromParent(false); // Invoke pool handler

      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.unuse) {
        handler.unuse();
      }

      this._pool.push(obj);
    }
  },

  /**
   * !#en Get a obj from pool, if no available object in pool, null will be returned.
   * This function will invoke the reuse function of poolHandlerComp if exist.
   * !#zh 获取对象池中的对象，如果对象池没有可用对象，则返回空。
   * 这个函数会调用 poolHandlerComp 的 reuse 函数，如果组件和函数都存在的话。
   * @method get
   * @param {any} ...params - !#en Params to pass to 'reuse' method in poolHandlerComp !#zh 向 poolHandlerComp 中的 'reuse' 函数传递的参数
   * @return {Node|null}
   * @example
   *   let newNode = this.myPool.get();
   */
  get: function get() {
    var last = this._pool.length - 1;

    if (last < 0) {
      return null;
    } else {
      // Pop the last object in pool
      var obj = this._pool[last];
      this._pool.length = last; // Invoke pool handler

      var handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null;

      if (handler && handler.reuse) {
        handler.reuse.apply(handler, arguments);
      }

      return obj;
    }
  }
};
module.exports = cc.NodePool;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvZXh0ZW5zaW9ucy9jY3Bvb2wvQ0NOb2RlUG9vbC5qcyJdLCJuYW1lcyI6WyJjYyIsIk5vZGVQb29sIiwicG9vbEhhbmRsZXJDb21wIiwiX3Bvb2wiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsInNpemUiLCJsZW5ndGgiLCJjbGVhciIsImNvdW50IiwiaSIsImRlc3Ryb3kiLCJwdXQiLCJvYmoiLCJpbmRleE9mIiwicmVtb3ZlRnJvbVBhcmVudCIsImhhbmRsZXIiLCJnZXRDb21wb25lbnQiLCJ1bnVzZSIsInB1c2giLCJnZXQiLCJsYXN0IiwicmV1c2UiLCJhcHBseSIsImFyZ3VtZW50cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBQSxFQUFFLENBQUNDLFFBQUgsR0FBYyxVQUFVQyxlQUFWLEVBQTJCO0FBQ3JDOzs7Ozs7QUFNQSxPQUFLQSxlQUFMLEdBQXVCQSxlQUF2QjtBQUNBLE9BQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0gsQ0FURDs7QUFVQUgsRUFBRSxDQUFDQyxRQUFILENBQVlHLFNBQVosR0FBd0I7QUFDcEJDLEVBQUFBLFdBQVcsRUFBRUwsRUFBRSxDQUFDQyxRQURJOztBQUdwQjs7Ozs7O0FBTUFLLEVBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFdBQU8sS0FBS0gsS0FBTCxDQUFXSSxNQUFsQjtBQUNILEdBWG1COztBQWFwQjs7Ozs7QUFLQUMsRUFBQUEsS0FBSyxFQUFFLGlCQUFZO0FBQ2YsUUFBSUMsS0FBSyxHQUFHLEtBQUtOLEtBQUwsQ0FBV0ksTUFBdkI7O0FBQ0EsU0FBSyxJQUFJRyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxLQUFwQixFQUEyQixFQUFFQyxDQUE3QixFQUFnQztBQUM1QixXQUFLUCxLQUFMLENBQVdPLENBQVgsRUFBY0MsT0FBZDtBQUNIOztBQUNELFNBQUtSLEtBQUwsQ0FBV0ksTUFBWCxHQUFvQixDQUFwQjtBQUNILEdBeEJtQjs7QUEwQnBCOzs7Ozs7Ozs7Ozs7O0FBYUFLLEVBQUFBLEdBQUcsRUFBRSxhQUFVQyxHQUFWLEVBQWU7QUFDaEIsUUFBSUEsR0FBRyxJQUFJLEtBQUtWLEtBQUwsQ0FBV1csT0FBWCxDQUFtQkQsR0FBbkIsTUFBNEIsQ0FBQyxDQUF4QyxFQUEyQztBQUN2QztBQUNBQSxNQUFBQSxHQUFHLENBQUNFLGdCQUFKLENBQXFCLEtBQXJCLEVBRnVDLENBSXZDOztBQUNBLFVBQUlDLE9BQU8sR0FBRyxLQUFLZCxlQUFMLEdBQXVCVyxHQUFHLENBQUNJLFlBQUosQ0FBaUIsS0FBS2YsZUFBdEIsQ0FBdkIsR0FBZ0UsSUFBOUU7O0FBQ0EsVUFBSWMsT0FBTyxJQUFJQSxPQUFPLENBQUNFLEtBQXZCLEVBQThCO0FBQzFCRixRQUFBQSxPQUFPLENBQUNFLEtBQVI7QUFDSDs7QUFFRCxXQUFLZixLQUFMLENBQVdnQixJQUFYLENBQWdCTixHQUFoQjtBQUNIO0FBQ0osR0FwRG1COztBQXNEcEI7Ozs7Ozs7Ozs7O0FBV0FPLEVBQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsUUFBSUMsSUFBSSxHQUFHLEtBQUtsQixLQUFMLENBQVdJLE1BQVgsR0FBa0IsQ0FBN0I7O0FBQ0EsUUFBSWMsSUFBSSxHQUFHLENBQVgsRUFBYztBQUNWLGFBQU8sSUFBUDtBQUNILEtBRkQsTUFHSztBQUNEO0FBQ0EsVUFBSVIsR0FBRyxHQUFHLEtBQUtWLEtBQUwsQ0FBV2tCLElBQVgsQ0FBVjtBQUNBLFdBQUtsQixLQUFMLENBQVdJLE1BQVgsR0FBb0JjLElBQXBCLENBSEMsQ0FLRDs7QUFDQSxVQUFJTCxPQUFPLEdBQUcsS0FBS2QsZUFBTCxHQUF1QlcsR0FBRyxDQUFDSSxZQUFKLENBQWlCLEtBQUtmLGVBQXRCLENBQXZCLEdBQWdFLElBQTlFOztBQUNBLFVBQUljLE9BQU8sSUFBSUEsT0FBTyxDQUFDTSxLQUF2QixFQUE4QjtBQUMxQk4sUUFBQUEsT0FBTyxDQUFDTSxLQUFSLENBQWNDLEtBQWQsQ0FBb0JQLE9BQXBCLEVBQTZCUSxTQUE3QjtBQUNIOztBQUNELGFBQU9YLEdBQVA7QUFDSDtBQUNKO0FBbEZtQixDQUF4QjtBQXFGQVksTUFBTSxDQUFDQyxPQUFQLEdBQWlCMUIsRUFBRSxDQUFDQyxRQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE2IENodWtvbmcgVGVjaG5vbG9naWVzIEluYy5cbiBDb3B5cmlnaHQgKGMpIDIwMTctMjAxOCBYaWFtZW4gWWFqaSBTb2Z0d2FyZSBDby4sIEx0ZC5cblxuIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZ1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuLyoqXG4gKiAhI2VuXG4gKiAgY2MuTm9kZVBvb2wgaXMgdGhlIGNhY2hlIHBvb2wgZGVzaWduZWQgZm9yIG5vZGUgdHlwZS48YnIvPlxuICogIEl0IGNhbiBoZWxwcyB5b3UgdG8gaW1wcm92ZSB5b3VyIGdhbWUgcGVyZm9ybWFuY2UgZm9yIG9iamVjdHMgd2hpY2ggbmVlZCBmcmVxdWVudCByZWxlYXNlIGFuZCByZWNyZWF0ZSBvcGVyYXRpb25zPGJyLz5cbiAqXG4gKiBJdCdzIHJlY29tbWVuZGVkIHRvIGNyZWF0ZSBjYy5Ob2RlUG9vbCBpbnN0YW5jZXMgYnkgbm9kZSB0eXBlLCB0aGUgdHlwZSBjb3JyZXNwb25kcyB0byBub2RlIHR5cGUgaW4gZ2FtZSBkZXNpZ24sIG5vdCB0aGUgY2xhc3MsIFxuICogZm9yIGV4YW1wbGUsIGEgcHJlZmFiIGlzIGEgc3BlY2lmaWMgbm9kZSB0eXBlLiA8YnIvPlxuICogV2hlbiB5b3UgY3JlYXRlIGEgbm9kZSBwb29sLCB5b3UgY2FuIHBhc3MgYSBDb21wb25lbnQgd2hpY2ggY29udGFpbnMgYHVudXNlYCwgYHJldXNlYCBmdW5jdGlvbnMgdG8gY29udHJvbCB0aGUgY29udGVudCBvZiBub2RlLjxici8+XG4gKlxuICogU29tZSBjb21tb24gdXNlIGNhc2UgaXMgOjxici8+XG4gKiAgICAgIDEuIEJ1bGxldHMgaW4gZ2FtZSAoZGllIHZlcnkgc29vbiwgbWFzc2l2ZSBjcmVhdGlvbiBhbmQgcmVjcmVhdGlvbiwgbm8gc2lkZSBlZmZlY3Qgb24gb3RoZXIgb2JqZWN0cyk8YnIvPlxuICogICAgICAyLiBCbG9ja3MgaW4gY2FuZHkgY3Jhc2ggKG1hc3NpdmUgY3JlYXRpb24gYW5kIHJlY3JlYXRpb24pPGJyLz5cbiAqICAgICAgZXRjLi4uXG4gKiAhI3poXG4gKiBjYy5Ob2RlUG9vbCDmmK/nlKjkuo7nrqHnkIboioLngrnlr7nosaHnmoTlr7nosaHnvJPlrZjmsaDjgII8YnIvPlxuICog5a6D5Y+v5Lul5biu5Yqp5oKo5o+Q6auY5ri45oiP5oCn6IO977yM6YCC55So5LqO5LyY5YyW5a+56LGh55qE5Y+N5aSN5Yib5bu65ZKM6ZSA5q+BPGJyLz5cbiAqIOS7peWJjSBjb2NvczJkLXgg5Lit55qEIGNjLnBvb2wg5ZKM5paw55qE6IqC54K55LqL5Lu25rOo5YaM57O757uf5LiN5YW85a6577yM5Zug5q2k6K+35L2/55SoIGNjLk5vZGVQb29sIOadpeS7o+abv+OAglxuICpcbiAqIOaWsOeahCBOb2RlUG9vbCDpnIDopoHlrp7kvovljJbkuYvlkI7miY3og73kvb/nlKjvvIzmr4/np43kuI3lkIznmoToioLngrnlr7nosaHmsaDpnIDopoHkuIDkuKrkuI3lkIznmoTlr7nosaHmsaDlrp7kvovvvIzov5nph4znmoTnp43nsbvlr7nlupTkuo7muLjmiI/kuK3nmoToioLngrnorr7orqHvvIzkuIDkuKogcHJlZmFiIOebuOW9k+S6juS4gOS4quenjeexu+eahOiKgueCueOAgjxici8+XG4gKiDlnKjliJvlu7rnvJPlhrLmsaDml7bvvIzlj6/ku6XkvKDlhaXkuIDkuKrljIXlkKsgdW51c2UsIHJldXNlIOWHveaVsOeahOe7hOS7tuexu+Wei+eUqOS6juiKgueCueeahOWbnuaUtuWSjOWkjeeUqOmAu+i+keOAgjxici8+XG4gKlxuICog5LiA5Lqb5bi46KeB55qE55So5L6L5piv77yaPGJyLz5cbiAqICAgICAgMS7lnKjmuLjmiI/kuK3nmoTlrZDlvLnvvIjmrbvkuqHlvojlv6vvvIzpopHnuYHliJvlu7rvvIzlr7nlhbbku5blr7nosaHml6Dlia/kvZznlKjvvIk8YnIvPlxuICogICAgICAyLuezluaenOeyieeijuS8oOWlh+S4reeahOacqOWdl++8iOmikee5geWIm+W7uu+8ieOAglxuICogICAgICDnrYnnrYkuLi4uXG4gKiBAY2xhc3MgTm9kZVBvb2xcbiAqL1xuXG4vKipcbiAqICEjZW5cbiAqIENvbnN0cnVjdG9yIGZvciBjcmVhdGluZyBhIHBvb2wgZm9yIGEgc3BlY2lmaWMgbm9kZSB0ZW1wbGF0ZSAodXN1YWxseSBhIHByZWZhYikuIFlvdSBjYW4gcGFzcyBhIGNvbXBvbmVudCAodHlwZSBvciBuYW1lKSBhcmd1bWVudCBmb3IgaGFuZGxpbmcgZXZlbnQgZm9yIHJldXNpbmcgYW5kIHJlY3ljbGluZyBub2RlLlxuICogISN6aFxuICog5L2/55So5p6E6YCg5Ye95pWw5p2l5Yib5bu65LiA5Liq6IqC54K55LiT55So55qE5a+56LGh5rGg77yM5oKo5Y+v5Lul5Lyg6YCS5LiA5Liq57uE5Lu257G75Z6L5oiW5ZCN56ew77yM55So5LqO5aSE55CG6IqC54K55Zue5pS25ZKM5aSN55So5pe255qE5LqL5Lu26YC76L6R44CCXG4gKiBAbWV0aG9kIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gW3Bvb2xIYW5kbGVyQ29tcF0gISNlbiBUaGUgY29uc3RydWN0b3Igb3IgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBjb250cm9sIHRoZSB1bnVzZS9yZXVzZSBsb2dpYy4gISN6aCDlpITnkIboioLngrnlm57mlLblkozlpI3nlKjkuovku7bpgLvovpHnmoTnu4Tku7bnsbvlnovmiJblkI3np7DjgIJcbiAqIEBleGFtcGxlXG4gKiAgcHJvcGVydGllczoge1xuICogICAgdGVtcGxhdGU6IGNjLlByZWZhYlxuICogIH0sXG4gKiAgb25Mb2FkICgpIHtcbiAgICAgIC8vIE15VGVtcGxhdGVIYW5kbGVyIGlzIGEgY29tcG9uZW50IHdpdGggJ3VudXNlJyBhbmQgJ3JldXNlJyB0byBoYW5kbGUgZXZlbnRzIHdoZW4gbm9kZSBpcyByZXVzZWQgb3IgcmVjeWNsZWQuXG4gKiAgICB0aGlzLm15UG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnTXlUZW1wbGF0ZUhhbmRsZXInKTtcbiAqICB9XG4gKiBAdHlwZXNjcmlwdFxuICogY29uc3RydWN0b3IocG9vbEhhbmRsZXJDb21wPzoge3Byb3RvdHlwZTogQ29tcG9uZW50fXxzdHJpbmcpXG4gKi9cbmNjLk5vZGVQb29sID0gZnVuY3Rpb24gKHBvb2xIYW5kbGVyQ29tcCkge1xuICAgIC8qKlxuICAgICAqICEjZW4gVGhlIHBvb2wgaGFuZGxlciBjb21wb25lbnQsIGl0IGNvdWxkIGJlIHRoZSBjbGFzcyBuYW1lIG9yIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgKiAhI3poIOe8k+WGsuaxoOWkhOeQhue7hOS7tu+8jOeUqOS6juiKgueCueeahOWbnuaUtuWSjOWkjeeUqOmAu+i+ke+8jOi/meS4quWxnuaAp+WPr+S7peaYr+e7hOS7tuexu+WQjeaIlue7hOS7tueahOaehOmAoOWHveaVsOOAglxuICAgICAqIEBwcm9wZXJ0eSBwb29sSGFuZGxlckNvbXBcbiAgICAgKiBAdHlwZSB7RnVuY3Rpb258U3RyaW5nfVxuICAgICAqL1xuICAgIHRoaXMucG9vbEhhbmRsZXJDb21wID0gcG9vbEhhbmRsZXJDb21wO1xuICAgIHRoaXMuX3Bvb2wgPSBbXTtcbn07XG5jYy5Ob2RlUG9vbC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IGNjLk5vZGVQb29sLFxuXG4gICAgLyoqXG4gICAgICogISNlbiBUaGUgY3VycmVudCBhdmFpbGFibGUgc2l6ZSBpbiB0aGUgcG9vbFxuICAgICAqICEjemgg6I635Y+W5b2T5YmN57yT5Yay5rGg55qE5Y+v55So5a+56LGh5pWw6YePXG4gICAgICogQG1ldGhvZCBzaXplXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHNpemU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvb2wubGVuZ3RoO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIERlc3Ryb3kgYWxsIGNhY2hlZCBub2RlcyBpbiB0aGUgcG9vbFxuICAgICAqICEjemgg6ZSA5q+B5a+56LGh5rGg5Lit57yT5a2Y55qE5omA5pyJ6IqC54K5XG4gICAgICogQG1ldGhvZCBjbGVhclxuICAgICAqL1xuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3VudCA9IHRoaXMuX3Bvb2wubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuX3Bvb2xbaV0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Bvb2wubGVuZ3RoID0gMDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBQdXQgYSBuZXcgTm9kZSBpbnRvIHRoZSBwb29sLlxuICAgICAqIEl0IHdpbGwgYXV0b21hdGljYWxseSByZW1vdmUgdGhlIG5vZGUgZnJvbSBpdHMgcGFyZW50IHdpdGhvdXQgY2xlYW51cC5cbiAgICAgKiBJdCB3aWxsIGFsc28gaW52b2tlIHVudXNlIG1ldGhvZCBvZiB0aGUgcG9vbEhhbmRsZXJDb21wIGlmIGV4aXN0LlxuICAgICAqICEjemgg5ZCR57yT5Yay5rGg5Lit5a2Y5YWl5LiA5Liq5LiN5YaN6ZyA6KaB55qE6IqC54K55a+56LGh44CCXG4gICAgICog6L+Z5Liq5Ye95pWw5Lya6Ieq5Yqo5bCG55uu5qCH6IqC54K55LuO54i26IqC54K55LiK56e76Zmk77yM5L2G5piv5LiN5Lya6L+b6KGMIGNsZWFudXAg5pON5L2c44CCXG4gICAgICog6L+Z5Liq5Ye95pWw5Lya6LCD55SoIHBvb2xIYW5kbGVyQ29tcCDnmoQgdW51c2Ug5Ye95pWw77yM5aaC5p6c57uE5Lu25ZKM5Ye95pWw6YO95a2Y5Zyo55qE6K+d44CCXG4gICAgICogQG1ldGhvZCBwdXRcbiAgICAgKiBAcGFyYW0ge05vZGV9IG9ialxuICAgICAqIEBleGFtcGxlXG4gICAgICogICBsZXQgbXlOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50ZW1wbGF0ZSk7XG4gICAgICogICB0aGlzLm15UG9vbC5wdXQobXlOb2RlKTtcbiAgICAgKi9cbiAgICBwdXQ6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKG9iaiAmJiB0aGlzLl9wb29sLmluZGV4T2Yob2JqKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBmcm9tIHBhcmVudCwgYnV0IGRvbid0IGNsZWFudXBcbiAgICAgICAgICAgIG9iai5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gSW52b2tlIHBvb2wgaGFuZGxlclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLnBvb2xIYW5kbGVyQ29tcCA/IG9iai5nZXRDb21wb25lbnQodGhpcy5wb29sSGFuZGxlckNvbXApIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyICYmIGhhbmRsZXIudW51c2UpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnVudXNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3Bvb2wucHVzaChvYmopO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gR2V0IGEgb2JqIGZyb20gcG9vbCwgaWYgbm8gYXZhaWxhYmxlIG9iamVjdCBpbiBwb29sLCBudWxsIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGludm9rZSB0aGUgcmV1c2UgZnVuY3Rpb24gb2YgcG9vbEhhbmRsZXJDb21wIGlmIGV4aXN0LlxuICAgICAqICEjemgg6I635Y+W5a+56LGh5rGg5Lit55qE5a+56LGh77yM5aaC5p6c5a+56LGh5rGg5rKh5pyJ5Y+v55So5a+56LGh77yM5YiZ6L+U5Zue56m644CCXG4gICAgICog6L+Z5Liq5Ye95pWw5Lya6LCD55SoIHBvb2xIYW5kbGVyQ29tcCDnmoQgcmV1c2Ug5Ye95pWw77yM5aaC5p6c57uE5Lu25ZKM5Ye95pWw6YO95a2Y5Zyo55qE6K+d44CCXG4gICAgICogQG1ldGhvZCBnZXRcbiAgICAgKiBAcGFyYW0ge2FueX0gLi4ucGFyYW1zIC0gISNlbiBQYXJhbXMgdG8gcGFzcyB0byAncmV1c2UnIG1ldGhvZCBpbiBwb29sSGFuZGxlckNvbXAgISN6aCDlkJEgcG9vbEhhbmRsZXJDb21wIOS4reeahCAncmV1c2UnIOWHveaVsOS8oOmAkueahOWPguaVsFxuICAgICAqIEByZXR1cm4ge05vZGV8bnVsbH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqICAgbGV0IG5ld05vZGUgPSB0aGlzLm15UG9vbC5nZXQoKTtcbiAgICAgKi9cbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxhc3QgPSB0aGlzLl9wb29sLmxlbmd0aC0xO1xuICAgICAgICBpZiAobGFzdCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUG9wIHRoZSBsYXN0IG9iamVjdCBpbiBwb29sXG4gICAgICAgICAgICB2YXIgb2JqID0gdGhpcy5fcG9vbFtsYXN0XTtcbiAgICAgICAgICAgIHRoaXMuX3Bvb2wubGVuZ3RoID0gbGFzdDtcblxuICAgICAgICAgICAgLy8gSW52b2tlIHBvb2wgaGFuZGxlclxuICAgICAgICAgICAgdmFyIGhhbmRsZXIgPSB0aGlzLnBvb2xIYW5kbGVyQ29tcCA/IG9iai5nZXRDb21wb25lbnQodGhpcy5wb29sSGFuZGxlckNvbXApIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChoYW5kbGVyICYmIGhhbmRsZXIucmV1c2UpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnJldXNlLmFwcGx5KGhhbmRsZXIsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYy5Ob2RlUG9vbDsiXSwic291cmNlUm9vdCI6Ii8ifQ==