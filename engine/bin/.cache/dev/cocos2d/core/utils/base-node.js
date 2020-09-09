
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/utils/base-node.js';
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
var Flags = require('../platform/CCObject').Flags;

var misc = require('./misc');

var js = require('../platform/js');

var IdGenerater = require('../platform/id-generater');

var eventManager = require('../event-manager');

var RenderFlow = require('../renderer/render-flow');

var Destroying = Flags.Destroying;
var DontDestroy = Flags.DontDestroy;
var Deactivating = Flags.Deactivating;
var CHILD_ADDED = 'child-added';
var CHILD_REMOVED = 'child-removed';
var idGenerater = new IdGenerater('Node');

function getConstructor(typeOrClassName) {
  if (!typeOrClassName) {
    cc.errorID(3804);
    return null;
  }

  if (typeof typeOrClassName === 'string') {
    return js.getClassByName(typeOrClassName);
  }

  return typeOrClassName;
}

function findComponent(node, constructor) {
  if (constructor._sealed) {
    for (var i = 0; i < node._components.length; ++i) {
      var comp = node._components[i];

      if (comp.constructor === constructor) {
        return comp;
      }
    }
  } else {
    for (var _i = 0; _i < node._components.length; ++_i) {
      var _comp = node._components[_i];

      if (_comp instanceof constructor) {
        return _comp;
      }
    }
  }

  return null;
}

function findComponents(node, constructor, components) {
  if (constructor._sealed) {
    for (var i = 0; i < node._components.length; ++i) {
      var comp = node._components[i];

      if (comp.constructor === constructor) {
        components.push(comp);
      }
    }
  } else {
    for (var _i2 = 0; _i2 < node._components.length; ++_i2) {
      var _comp2 = node._components[_i2];

      if (_comp2 instanceof constructor) {
        components.push(_comp2);
      }
    }
  }
}

function findChildComponent(children, constructor) {
  for (var i = 0; i < children.length; ++i) {
    var node = children[i];
    var comp = findComponent(node, constructor);

    if (comp) {
      return comp;
    } else if (node._children.length > 0) {
      comp = findChildComponent(node._children, constructor);

      if (comp) {
        return comp;
      }
    }
  }

  return null;
}

function findChildComponents(children, constructor, components) {
  for (var i = 0; i < children.length; ++i) {
    var node = children[i];
    findComponents(node, constructor, components);

    if (node._children.length > 0) {
      findChildComponents(node._children, constructor, components);
    }
  }
}
/**
 * A base node for CCNode, it will:
 * - maintain scene hierarchy and active logic
 * - notifications if some properties changed
 * - define some interfaces shares between CCNode
 * - define machanisms for Enity Component Systems
 * - define prefab and serialize functions
 *
 * @class _BaseNode
 * @extends Object
 * @uses EventTarget
 * @constructor
 * @param {String} [name]
 * @private
 */


var BaseNode = cc.Class({
  name: 'cc._BaseNode',
  "extends": cc.Object,
  properties: {
    // SERIALIZABLE
    _parent: null,
    _children: [],
    _active: true,

    /**
     * @property _components
     * @type {Component[]}
     * @default []
     * @readOnly
     * @private
     */
    _components: [],

    /**
     * The PrefabInfo object
     * @property _prefab
     * @type {PrefabInfo}
     * @private
     */
    _prefab: null,

    /**
     * If true, the node is an persist node which won't be destroyed during scene transition.
     * If false, the node will be destroyed automatically when loading a new scene. Default is false.
     * @property _persistNode
     * @type {Boolean}
     * @default false
     * @private
     */
    _persistNode: {
      get: function get() {
        return (this._objFlags & DontDestroy) > 0;
      },
      set: function set(value) {
        if (value) {
          this._objFlags |= DontDestroy;
        } else {
          this._objFlags &= ~DontDestroy;
        }
      }
    },
    // API

    /**
     * !#en Name of node.
     * !#zh 该节点名称。
     * @property name
     * @type {String}
     * @example
     * node.name = "New Node";
     * cc.log("Node Name: " + node.name);
     */
    name: {
      get: function get() {
        return this._name;
      },
      set: function set(value) {
        if (CC_DEV && value.indexOf('/') !== -1) {
          cc.errorID(1632);
          return;
        }

        this._name = value;

        if (CC_JSB && CC_NATIVERENDERER) {
          this._proxy.setName(this._name);
        }
      }
    },

    /**
     * !#en The uuid for editor, will be stripped before building project.
     * !#zh 主要用于编辑器的 uuid，在编辑器下可用于持久化存储，在项目构建之后将变成自增的 id。
     * @property uuid
     * @type {String}
     * @readOnly
     * @example
     * cc.log("Node Uuid: " + node.uuid);
     */
    uuid: {
      get: function get() {
        return this._id;
      }
    },

    /**
     * !#en All children nodes.
     * !#zh 节点的所有子节点。
     * @property children
     * @type {Node[]}
     * @readOnly
     * @example
     * var children = node.children;
     * for (var i = 0; i < children.length; ++i) {
     *     cc.log("Node: " + children[i]);
     * }
     */
    children: {
      get: function get() {
        return this._children;
      }
    },

    /**
     * !#en All children nodes.
     * !#zh 节点的子节点数量。
     * @property childrenCount
     * @type {Number}
     * @readOnly
     * @example
     * var count = node.childrenCount;
     * cc.log("Node Children Count: " + count);
     */
    childrenCount: {
      get: function get() {
        return this._children.length;
      }
    },

    /**
     * !#en
     * The local active state of this node.<br/>
     * Note that a Node may be inactive because a parent is not active, even if this returns true.<br/>
     * Use {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}} if you want to check if the Node is actually treated as active in the scene.
     * !#zh
     * 当前节点的自身激活状态。<br/>
     * 值得注意的是，一个节点的父节点如果不被激活，那么即使它自身设为激活，它仍然无法激活。<br/>
     * 如果你想检查节点在场景中实际的激活状态可以使用 {{#crossLink "Node/activeInHierarchy:property"}}{{/crossLink}}。
     * @property active
     * @type {Boolean}
     * @default true
     * @example
     * node.active = false;
     */
    active: {
      get: function get() {
        return this._active;
      },
      set: function set(value) {
        value = !!value;

        if (this._active !== value) {
          this._active = value;
          var parent = this._parent;

          if (parent) {
            var couldActiveInScene = parent._activeInHierarchy;

            if (couldActiveInScene) {
              cc.director._nodeActivator.activateNode(this, value);
            }
          }
        }
      }
    },

    /**
     * !#en Indicates whether this node is active in the scene.
     * !#zh 表示此节点是否在场景中激活。
     * @property activeInHierarchy
     * @type {Boolean}
     * @example
     * cc.log("activeInHierarchy: " + node.activeInHierarchy);
     */
    activeInHierarchy: {
      get: function get() {
        return this._activeInHierarchy;
      }
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor(name) {
    this._name = name !== undefined ? name : 'New Node';
    this._activeInHierarchy = false;
    this._id = CC_EDITOR ? Editor.Utils.UuidUtils.uuid() : idGenerater.getNewId();
    cc.director._scheduler && cc.director._scheduler.enableForTarget(this);
    /**
     * Register all related EventTargets,
     * all event callbacks will be removed in _onPreDestroy
     * @property __eventTargets
     * @type {EventTarget[]}
     * @private
     */

    this.__eventTargets = [];
  },

  /** 
   * !#en The parent of the node.
   * !#zh 该节点的父节点。
   * @property {Node} parent
   * @example 
   * cc.log("Node Parent: " + node.parent);
   */

  /**
   * !#en Get parent of the node.
   * !#zh 获取该节点的父节点。
   * @method getParent
   * @return {Node}
   * @example
   * var parent = this.node.getParent();
   */
  getParent: function getParent() {
    return this._parent;
  },

  /**
   * !#en Set parent of the node.
   * !#zh 设置该节点的父节点。
   * @method setParent
   * @param {Node} value
   * @example
   * node.setParent(newNode);
   */
  setParent: function setParent(value) {
    if (this._parent === value) {
      return;
    }

    if (CC_EDITOR && cc.engine && !cc.engine.isPlaying) {
      if (_Scene.DetectConflict.beforeAddChild(this, value)) {
        return;
      }
    }

    var oldParent = this._parent;

    if (CC_DEBUG && oldParent && oldParent._objFlags & Deactivating) {
      cc.errorID(3821);
    }

    this._parent = value || null;

    this._onSetParent(value);

    if (value) {
      if (CC_DEBUG && value._objFlags & Deactivating) {
        cc.errorID(3821);
      }

      eventManager._setDirtyForNode(this);

      value._children.push(this);

      value.emit && value.emit(CHILD_ADDED, this);
      value._renderFlag |= RenderFlow.FLAG_CHILDREN;
    }

    if (oldParent) {
      if (!(oldParent._objFlags & Destroying)) {
        var removeAt = oldParent._children.indexOf(this);

        if (CC_DEV && removeAt < 0) {
          return cc.errorID(1633);
        }

        oldParent._children.splice(removeAt, 1);

        oldParent.emit && oldParent.emit(CHILD_REMOVED, this);

        this._onHierarchyChanged(oldParent);

        if (oldParent._children.length === 0) {
          oldParent._renderFlag &= ~RenderFlow.FLAG_CHILDREN;
        }
      }
    } else if (value) {
      this._onHierarchyChanged(null);
    }
  },
  // ABSTRACT INTERFACES

  /**
   * !#en
   * Properties configuration function <br/>
   * All properties in attrs will be set to the node, <br/>
   * when the setter of the node is available, <br/>
   * the property will be set via setter function.<br/>
   * !#zh 属性配置函数。在 attrs 的所有属性将被设置为节点属性。
   * @method attr
   * @param {Object} attrs - Properties to be set to node
   * @example
   * var attrs = { key: 0, num: 100 };
   * node.attr(attrs);
   */
  attr: function attr(attrs) {
    js.mixin(this, attrs);
  },
  // composition: GET

  /**
   * !#en Returns a child from the container given its uuid.
   * !#zh 通过 uuid 获取节点的子节点。
   * @method getChildByUuid
   * @param {String} uuid - The uuid to find the child node.
   * @return {Node} a Node whose uuid equals to the input parameter
   * @example
   * var child = node.getChildByUuid(uuid);
   */
  getChildByUuid: function getChildByUuid(uuid) {
    if (!uuid) {
      cc.log("Invalid uuid");
      return null;
    }

    var locChildren = this._children;

    for (var i = 0, len = locChildren.length; i < len; i++) {
      if (locChildren[i]._id === uuid) return locChildren[i];
    }

    return null;
  },

  /**
   * !#en Returns a child from the container given its name.
   * !#zh 通过名称获取节点的子节点。
   * @method getChildByName
   * @param {String} name - A name to find the child node.
   * @return {Node} a CCNode object whose name equals to the input parameter
   * @example
   * var child = node.getChildByName("Test Node");
   */
  getChildByName: function getChildByName(name) {
    if (!name) {
      cc.log("Invalid name");
      return null;
    }

    var locChildren = this._children;

    for (var i = 0, len = locChildren.length; i < len; i++) {
      if (locChildren[i]._name === name) return locChildren[i];
    }

    return null;
  },
  // composition: ADD
  addChild: function addChild(child) {
    if (CC_DEV && !(child instanceof cc._BaseNode)) {
      return cc.errorID(1634, cc.js.getClassName(child));
    }

    cc.assertID(child, 1606);
    cc.assertID(child._parent === null, 1605); // invokes the parent setter

    child.setParent(this);
  },

  /**
   * !#en
   * Inserts a child to the node at a specified index.
   * !#zh
   * 插入子节点到指定位置
   * @method insertChild
   * @param {Node} child - the child node to be inserted
   * @param {Number} siblingIndex - the sibling index to place the child in
   * @example
   * node.insertChild(child, 2);
   */
  insertChild: function insertChild(child, siblingIndex) {
    child.parent = this;
    child.setSiblingIndex(siblingIndex);
  },
  // HIERARCHY METHODS

  /**
   * !#en Get the sibling index.
   * !#zh 获取同级索引。
   * @method getSiblingIndex
   * @return {Number}
   * @example
   * var index = node.getSiblingIndex();
   */
  getSiblingIndex: function getSiblingIndex() {
    if (this._parent) {
      return this._parent._children.indexOf(this);
    } else {
      return 0;
    }
  },

  /**
   * !#en Set the sibling index of this node.
   * !#zh 设置节点同级索引。
   * @method setSiblingIndex
   * @param {Number} index
   * @example
   * node.setSiblingIndex(1);
   */
  setSiblingIndex: function setSiblingIndex(index) {
    if (!this._parent) {
      return;
    }

    if (this._parent._objFlags & Deactivating) {
      cc.errorID(3821);
      return;
    }

    var siblings = this._parent._children;
    index = index !== -1 ? index : siblings.length - 1;
    var oldIndex = siblings.indexOf(this);

    if (index !== oldIndex) {
      siblings.splice(oldIndex, 1);

      if (index < siblings.length) {
        siblings.splice(index, 0, this);
      } else {
        siblings.push(this);
      }

      this._onSiblingIndexChanged && this._onSiblingIndexChanged(index);
    }
  },

  /**
   * !#en Walk though the sub children tree of the current node.
   * Each node, including the current node, in the sub tree will be visited two times, before all children and after all children.
   * This function call is not recursive, it's based on stack.
   * Please don't walk any other node inside the walk process.
   * !#zh 遍历该节点的子树里的所有节点并按规则执行回调函数。
   * 对子树中的所有节点，包含当前节点，会执行两次回调，prefunc 会在访问它的子节点之前调用，postfunc 会在访问所有子节点之后调用。
   * 这个函数的实现不是基于递归的，而是基于栈展开递归的方式。
   * 请不要在 walk 过程中对任何其他的节点嵌套执行 walk。
   * @method walk
   * @param {Function} prefunc The callback to process node when reach the node for the first time
   * @param {_BaseNode} prefunc.target The current visiting node
   * @param {Function} postfunc The callback to process node when re-visit the node after walked all children in its sub tree
   * @param {_BaseNode} postfunc.target The current visiting node
   * @example
   * node.walk(function (target) {
   *     console.log('Walked through node ' + target.name + ' for the first time');
   * }, function (target) {
   *     console.log('Walked through node ' + target.name + ' after walked all children in its sub tree');
   * });
   */
  walk: function walk(prefunc, postfunc) {
    var BaseNode = cc._BaseNode;
    var index = 1;
    var children, child, curr, i, afterChildren;
    var stack = BaseNode._stacks[BaseNode._stackId];

    if (!stack) {
      stack = [];

      BaseNode._stacks.push(stack);
    }

    BaseNode._stackId++;
    stack.length = 0;
    stack[0] = this;
    var parent = null;
    afterChildren = false;

    while (index) {
      index--;
      curr = stack[index];

      if (!curr) {
        continue;
      }

      if (!afterChildren && prefunc) {
        // pre call
        prefunc(curr);
      } else if (afterChildren && postfunc) {
        // post call
        postfunc(curr);
      } // Avoid memory leak


      stack[index] = null; // Do not repeatly visit child tree, just do post call and continue walk

      if (afterChildren) {
        if (parent === this._parent) break;
        afterChildren = false;
      } else {
        // Children not proceeded and has children, proceed to child tree
        if (curr._children.length > 0) {
          parent = curr;
          children = curr._children;
          i = 0;
          stack[index] = children[i];
          index++;
        } // No children, then repush curr to be walked for post func
        else {
            stack[index] = curr;
            index++;
            afterChildren = true;
          }

        continue;
      } // curr has no sub tree, so look into the siblings in parent children


      if (children) {
        i++; // Proceed to next sibling in parent children

        if (children[i]) {
          stack[index] = children[i];
          index++;
        } // No children any more in this sub tree, go upward
        else if (parent) {
            stack[index] = parent;
            index++; // Setup parent walk env

            afterChildren = true;

            if (parent._parent) {
              children = parent._parent._children;
              i = children.indexOf(parent);
              parent = parent._parent;
            } else {
              // At root
              parent = null;
              children = null;
            } // ERROR


            if (i < 0) {
              break;
            }
          }
      }
    }

    stack.length = 0;
    BaseNode._stackId--;
  },
  cleanup: function cleanup() {},

  /**
   * !#en
   * Remove itself from its parent node. If cleanup is `true`, then also remove all events and actions. <br/>
   * If the cleanup parameter is not passed, it will force a cleanup, so it is recommended that you always pass in the `false` parameter when calling this API.<br/>
   * If the node orphan, then nothing happens.
   * !#zh
   * 从父节点中删除该节点。如果不传入 cleanup 参数或者传入 `true`，那么这个节点上所有绑定的事件、action 都会被删除。<br/>
   * 因此建议调用这个 API 时总是传入 `false` 参数。<br/>
   * 如果这个节点是一个孤节点，那么什么都不会发生。
   * @method removeFromParent
   * @param {Boolean} [cleanup=true] - true if all actions and callbacks on this node should be removed, false otherwise.
   * @example
   * node.removeFromParent();
   * node.removeFromParent(false);
   */
  removeFromParent: function removeFromParent(cleanup) {
    if (this._parent) {
      if (cleanup === undefined) cleanup = true;

      this._parent.removeChild(this, cleanup);
    }
  },

  /**
   * !#en
   * Removes a child from the container. It will also cleanup all running actions depending on the cleanup parameter. </p>
   * If the cleanup parameter is not passed, it will force a cleanup. <br/>
   * "remove" logic MUST only be on this method  <br/>
   * If a class wants to extend the 'removeChild' behavior it only needs <br/>
   * to override this method.
   * !#zh
   * 移除节点中指定的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
   * 如果 cleanup 参数不传入，默认为 true 表示清理。<br/>
   * @method removeChild
   * @param {Node} child - The child node which will be removed.
   * @param {Boolean} [cleanup=true] - true if all running actions and callbacks on the child node will be cleanup, false otherwise.
   * @example
   * node.removeChild(newNode);
   * node.removeChild(newNode, false);
   */
  removeChild: function removeChild(child, cleanup) {
    if (this._children.indexOf(child) > -1) {
      // If you don't do cleanup, the child's actions will not get removed and the
      if (cleanup || cleanup === undefined) {
        child.cleanup();
      } // invoke the parent setter


      child.parent = null;
    }
  },

  /**
   * !#en
   * Removes all children from the container and do a cleanup all running actions depending on the cleanup parameter. <br/>
   * If the cleanup parameter is not passed, it will force a cleanup.
   * !#zh
   * 移除节点所有的子节点，是否需要清理所有正在运行的行为取决于 cleanup 参数。<br/>
   * 如果 cleanup 参数不传入，默认为 true 表示清理。
   * @method removeAllChildren
   * @param {Boolean} [cleanup=true] - true if all running actions on all children nodes should be cleanup, false otherwise.
   * @example
   * node.removeAllChildren();
   * node.removeAllChildren(false);
   */
  removeAllChildren: function removeAllChildren(cleanup) {
    // not using detachChild improves speed here
    var children = this._children;
    if (cleanup === undefined) cleanup = true;

    for (var i = children.length - 1; i >= 0; i--) {
      var node = children[i];

      if (node) {
        // If you don't do cleanup, the node's actions will not get removed and the
        if (cleanup) node.cleanup();
        node.parent = null;
      }
    }

    this._children.length = 0;
  },

  /**
   * !#en Is this node a child of the given node?
   * !#zh 是否是指定节点的子节点？
   * @method isChildOf
   * @param {Node} parent
   * @return {Boolean} - Returns true if this node is a child, deep child or identical to the given node.
   * @example
   * node.isChildOf(newNode);
   */
  isChildOf: function isChildOf(parent) {
    var child = this;

    do {
      if (child === parent) {
        return true;
      }

      child = child._parent;
    } while (child);

    return false;
  },
  // COMPONENT

  /**
   * !#en
   * Returns the component of supplied type if the node has one attached, null if it doesn't.<br/>
   * You can also get component in the node by passing in the name of the script.
   * !#zh
   * 获取节点上指定类型的组件，如果节点有附加指定类型的组件，则返回，如果没有则为空。<br/>
   * 传入参数也可以是脚本的名称。
   * @method getComponent
   * @param {Function|String} typeOrClassName
   * @return {Component}
   * @example
   * // get sprite component
   * var sprite = node.getComponent(cc.Sprite);
   * // get custom test class
   * var test = node.getComponent("Test");
   * @typescript
   * getComponent<T extends Component>(type: {prototype: T}): T
   * getComponent(className: string): any
   */
  getComponent: function getComponent(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName);

    if (constructor) {
      return findComponent(this, constructor);
    }

    return null;
  },

  /**
   * !#en Returns all components of supplied type in the node.
   * !#zh 返回节点上指定类型的所有组件。
   * @method getComponents
   * @param {Function|String} typeOrClassName
   * @return {Component[]}
   * @example
   * var sprites = node.getComponents(cc.Sprite);
   * var tests = node.getComponents("Test");
   * @typescript
   * getComponents<T extends Component>(type: {prototype: T}): T[]
   * getComponents(className: string): any[]
   */
  getComponents: function getComponents(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName),
        components = [];

    if (constructor) {
      findComponents(this, constructor, components);
    }

    return components;
  },

  /**
   * !#en Returns the component of supplied type in any of its children using depth first search.
   * !#zh 递归查找所有子节点中第一个匹配指定类型的组件。
   * @method getComponentInChildren
   * @param {Function|String} typeOrClassName
   * @return {Component}
   * @example
   * var sprite = node.getComponentInChildren(cc.Sprite);
   * var Test = node.getComponentInChildren("Test");
   * @typescript
   * getComponentInChildren<T extends Component>(type: {prototype: T}): T
   * getComponentInChildren(className: string): any
   */
  getComponentInChildren: function getComponentInChildren(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName);

    if (constructor) {
      return findChildComponent(this._children, constructor);
    }

    return null;
  },

  /**
   * !#en Returns all components of supplied type in self or any of its children.
   * !#zh 递归查找自身或所有子节点中指定类型的组件
   * @method getComponentsInChildren
   * @param {Function|String} typeOrClassName
   * @return {Component[]}
   * @example
   * var sprites = node.getComponentsInChildren(cc.Sprite);
   * var tests = node.getComponentsInChildren("Test");
   * @typescript
   * getComponentsInChildren<T extends Component>(type: {prototype: T}): T[]
   * getComponentsInChildren(className: string): any[]
   */
  getComponentsInChildren: function getComponentsInChildren(typeOrClassName) {
    var constructor = getConstructor(typeOrClassName),
        components = [];

    if (constructor) {
      findComponents(this, constructor, components);
      findChildComponents(this._children, constructor, components);
    }

    return components;
  },
  _checkMultipleComp: (CC_EDITOR || CC_PREVIEW) && function (ctor) {
    var existing = this.getComponent(ctor._disallowMultiple);

    if (existing) {
      if (existing.constructor === ctor) {
        cc.errorID(3805, js.getClassName(ctor), this._name);
      } else {
        cc.errorID(3806, js.getClassName(ctor), this._name, js.getClassName(existing));
      }

      return false;
    }

    return true;
  },

  /**
   * !#en Adds a component class to the node. You can also add component to node by passing in the name of the script.
   * !#zh 向节点添加一个指定类型的组件类，你还可以通过传入脚本的名称来添加组件。
   * @method addComponent
   * @param {Function|String} typeOrClassName - The constructor or the class name of the component to add
   * @return {Component} - The newly added component
   * @example
   * var sprite = node.addComponent(cc.Sprite);
   * var test = node.addComponent("Test");
   * @typescript
   * addComponent<T extends Component>(type: {new(): T}): T
   * addComponent(className: string): any
   */
  addComponent: function addComponent(typeOrClassName) {
    if (CC_EDITOR && this._objFlags & Destroying) {
      cc.error('isDestroying');
      return null;
    } // get component


    var constructor;

    if (typeof typeOrClassName === 'string') {
      constructor = js.getClassByName(typeOrClassName);

      if (!constructor) {
        cc.errorID(3807, typeOrClassName);

        if (cc._RFpeek()) {
          cc.errorID(3808, typeOrClassName);
        }

        return null;
      }
    } else {
      if (!typeOrClassName) {
        cc.errorID(3804);
        return null;
      }

      constructor = typeOrClassName;
    } // check component


    if (typeof constructor !== 'function') {
      cc.errorID(3809);
      return null;
    }

    if (!js.isChildClassOf(constructor, cc.Component)) {
      cc.errorID(3810);
      return null;
    }

    if ((CC_EDITOR || CC_PREVIEW) && constructor._disallowMultiple) {
      if (!this._checkMultipleComp(constructor)) {
        return null;
      }
    } // check requirement


    var ReqComp = constructor._requireComponent;

    if (ReqComp && !this.getComponent(ReqComp)) {
      var depended = this.addComponent(ReqComp);

      if (!depended) {
        // depend conflicts
        return null;
      }
    } //// check conflict
    //
    //if (CC_EDITOR && !_Scene.DetectConflict.beforeAddComponent(this, constructor)) {
    //    return null;
    //}
    //


    var component = new constructor();
    component.node = this;

    this._components.push(component);

    if ((CC_EDITOR || CC_TEST) && cc.engine && this._id in cc.engine.attachedObjsForEditor) {
      cc.engine.attachedObjsForEditor[component._id] = component;
    }

    if (this._activeInHierarchy) {
      cc.director._nodeActivator.activateComp(component);
    }

    return component;
  },

  /**
   * This api should only used by undo system
   * @method _addComponentAt
   * @param {Component} comp
   * @param {Number} index
   * @private
   */
  _addComponentAt: CC_EDITOR && function (comp, index) {
    if (this._objFlags & Destroying) {
      return cc.error('isDestroying');
    }

    if (!(comp instanceof cc.Component)) {
      return cc.errorID(3811);
    }

    if (index > this._components.length) {
      return cc.errorID(3812);
    } // recheck attributes because script may changed


    var ctor = comp.constructor;

    if (ctor._disallowMultiple) {
      if (!this._checkMultipleComp(ctor)) {
        return;
      }
    }

    var ReqComp = ctor._requireComponent;

    if (ReqComp && !this.getComponent(ReqComp)) {
      if (index === this._components.length) {
        // If comp should be last component, increase the index because required component added
        ++index;
      }

      var depended = this.addComponent(ReqComp);

      if (!depended) {
        // depend conflicts
        return null;
      }
    }

    comp.node = this;

    this._components.splice(index, 0, comp);

    if ((CC_EDITOR || CC_TEST) && cc.engine && this._id in cc.engine.attachedObjsForEditor) {
      cc.engine.attachedObjsForEditor[comp._id] = comp;
    }

    if (this._activeInHierarchy) {
      cc.director._nodeActivator.activateComp(comp);
    }
  },

  /**
   * !#en
   * Removes a component identified by the given name or removes the component object given.
   * You can also use component.destroy() if you already have the reference.
   * !#zh
   * 删除节点上的指定组件，传入参数可以是一个组件构造函数或组件名，也可以是已经获得的组件引用。
   * 如果你已经获得组件引用，你也可以直接调用 component.destroy()
   * @method removeComponent
   * @param {String|Function|Component} component - The need remove component.
   * @deprecated please destroy the component to remove it.
   * @example
   * node.removeComponent(cc.Sprite);
   * var Test = require("Test");
   * node.removeComponent(Test);
   */
  removeComponent: function removeComponent(component) {
    if (!component) {
      cc.errorID(3813);
      return;
    }

    if (!(component instanceof cc.Component)) {
      component = this.getComponent(component);
    }

    if (component) {
      component.destroy();
    }
  },

  /**
   * @method _getDependComponent
   * @param {Component} depended
   * @return {Component}
   * @private
   */
  _getDependComponent: CC_EDITOR && function (depended) {
    for (var i = 0; i < this._components.length; i++) {
      var comp = this._components[i];

      if (comp !== depended && comp.isValid && !cc.Object._willDestroy(comp)) {
        var depend = comp.constructor._requireComponent;

        if (depend && depended instanceof depend) {
          return comp;
        }
      }
    }

    return null;
  },
  // do remove component, only used internally
  _removeComponent: function _removeComponent(component) {
    if (!component) {
      cc.errorID(3814);
      return;
    }

    if (!(this._objFlags & Destroying)) {
      var i = this._components.indexOf(component);

      if (i !== -1) {
        this._components.splice(i, 1);

        if ((CC_EDITOR || CC_TEST) && cc.engine) {
          delete cc.engine.attachedObjsForEditor[component._id];
        }
      } else if (component.node !== this) {
        cc.errorID(3815);
      }
    }
  },
  destroy: function destroy() {
    if (cc.Object.prototype.destroy.call(this)) {
      this.active = false;
    }
  },

  /**
   * !#en
   * Destroy all children from the node, and release all their own references to other objects.<br/>
   * Actual destruct operation will delayed until before rendering.
   * !#zh
   * 销毁所有子节点，并释放所有它们对其它对象的引用。<br/>
   * 实际销毁操作会延迟到当前帧渲染前执行。
   * @method destroyAllChildren
   * @example
   * node.destroyAllChildren();
   */
  destroyAllChildren: function destroyAllChildren() {
    var children = this._children;

    for (var i = 0; i < children.length; ++i) {
      children[i].destroy();
    }
  },
  _onSetParent: function _onSetParent(value) {},
  _onPostActivated: function _onPostActivated() {},
  _onBatchRestored: function _onBatchRestored() {},
  _onBatchCreated: function _onBatchCreated() {},
  _onHierarchyChanged: function _onHierarchyChanged(oldParent) {
    var newParent = this._parent;

    if (this._persistNode && !(newParent instanceof cc.Scene)) {
      cc.game.removePersistRootNode(this);

      if (CC_EDITOR) {
        cc.warnID(1623);
      }
    }

    if (CC_EDITOR || CC_TEST) {
      var scene = cc.director.getScene();
      var inCurrentSceneBefore = oldParent && oldParent.isChildOf(scene);
      var inCurrentSceneNow = newParent && newParent.isChildOf(scene);

      if (!inCurrentSceneBefore && inCurrentSceneNow) {
        // attached
        this._registerIfAttached(true);
      } else if (inCurrentSceneBefore && !inCurrentSceneNow) {
        // detached
        this._registerIfAttached(false);
      } // update prefab


      var newPrefabRoot = newParent && newParent._prefab && newParent._prefab.root;
      var myPrefabInfo = this._prefab;

      var PrefabUtils = Editor.require('scene://utils/prefab');

      if (myPrefabInfo) {
        if (newPrefabRoot) {
          if (myPrefabInfo.root !== newPrefabRoot) {
            if (myPrefabInfo.root === this) {
              // nest prefab
              myPrefabInfo.fileId || (myPrefabInfo.fileId = Editor.Utils.UuidUtils.uuid());
              PrefabUtils.checkCircularReference(myPrefabInfo.root);
            } else {
              // change prefab
              PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
              PrefabUtils.checkCircularReference(newPrefabRoot);
            }
          }
        } else if (myPrefabInfo.root === this) {
          // nested prefab to root prefab
          myPrefabInfo.fileId = ''; // root prefab doesn't have fileId
        } else {
          // detach from prefab
          PrefabUtils.unlinkPrefab(this);
        }
      } else if (newPrefabRoot) {
        // attach to prefab
        PrefabUtils.linkPrefab(newPrefabRoot._prefab.asset, newPrefabRoot, this);
        PrefabUtils.checkCircularReference(newPrefabRoot);
      } // conflict detection


      _Scene.DetectConflict.afterAddChild(this);
    }

    var shouldActiveNow = this._active && !!(newParent && newParent._activeInHierarchy);

    if (this._activeInHierarchy !== shouldActiveNow) {
      cc.director._nodeActivator.activateNode(this, shouldActiveNow);
    }
  },
  _instantiate: function _instantiate(cloned) {
    if (!cloned) {
      cloned = cc.instantiate._clone(this, this);
    }

    var thisPrefabInfo = this._prefab;

    if (CC_EDITOR && thisPrefabInfo) {
      if (this !== thisPrefabInfo.root) {
        var PrefabUtils = Editor.require('scene://utils/prefab');

        PrefabUtils.unlinkPrefab(cloned);
      }
    }

    var syncing = thisPrefabInfo && this === thisPrefabInfo.root && thisPrefabInfo.sync;

    if (syncing) {//if (thisPrefabInfo._synced) {
      //    return clone;
      //}
    } else if (CC_EDITOR && cc.engine._isPlaying) {
      cloned._name += ' (Clone)';
    } // reset and init


    cloned._parent = null;

    cloned._onBatchRestored();

    return cloned;
  },
  _registerIfAttached: (CC_EDITOR || CC_TEST) && function (register) {
    var attachedObjsForEditor = cc.engine.attachedObjsForEditor;

    if (register) {
      attachedObjsForEditor[this._id] = this;

      for (var i = 0; i < this._components.length; i++) {
        var comp = this._components[i];
        attachedObjsForEditor[comp._id] = comp;
      }

      cc.engine.emit('node-attach-to-scene', this);
    } else {
      cc.engine.emit('node-detach-from-scene', this);
      delete attachedObjsForEditor[this._id];

      for (var _i3 = 0; _i3 < this._components.length; _i3++) {
        var _comp3 = this._components[_i3];
        delete attachedObjsForEditor[_comp3._id];
      }
    }

    var children = this._children;

    for (var _i4 = 0, len = children.length; _i4 < len; ++_i4) {
      var child = children[_i4];

      child._registerIfAttached(register);
    }
  },
  _onPreDestroy: function _onPreDestroy() {
    var i, len; // marked as destroying

    this._objFlags |= Destroying; // detach self and children from editor

    var parent = this._parent;
    var destroyByParent = parent && parent._objFlags & Destroying;

    if (!destroyByParent && (CC_EDITOR || CC_TEST)) {
      this._registerIfAttached(false);
    } // destroy children


    var children = this._children;

    for (i = 0, len = children.length; i < len; ++i) {
      // destroy immediate so its _onPreDestroy can be called
      children[i]._destroyImmediate();
    } // destroy self components


    for (i = 0, len = this._components.length; i < len; ++i) {
      var component = this._components[i]; // destroy immediate so its _onPreDestroy can be called

      component._destroyImmediate();
    }

    var eventTargets = this.__eventTargets;

    for (i = 0, len = eventTargets.length; i < len; ++i) {
      var target = eventTargets[i];
      target && target.targetOff(this);
    }

    eventTargets.length = 0; // remove from persist

    if (this._persistNode) {
      cc.game.removePersistRootNode(this);
    }

    if (!destroyByParent) {
      // remove from parent
      if (parent) {
        var childIndex = parent._children.indexOf(this);

        parent._children.splice(childIndex, 1);

        parent.emit && parent.emit('child-removed', this);
      }
    }

    return destroyByParent;
  },
  onRestore: CC_EDITOR && function () {
    // check activity state
    var shouldActiveNow = this._active && !!(this._parent && this._parent._activeInHierarchy);

    if (this._activeInHierarchy !== shouldActiveNow) {
      cc.director._nodeActivator.activateNode(this, shouldActiveNow);
    }
  }
});
BaseNode.idGenerater = idGenerater; // For walk

BaseNode._stacks = [[]];
BaseNode._stackId = 0;
BaseNode.prototype._onPreDestroyBase = BaseNode.prototype._onPreDestroy;

if (CC_EDITOR) {
  BaseNode.prototype._onPreDestroy = function () {
    var destroyByParent = this._onPreDestroyBase();

    if (!destroyByParent) {
      // ensure this node can reattach to scene by undo system
      // (simulate some destruct logic to make undo system work correctly)
      this._parent = null;
    }

    return destroyByParent;
  };
}

BaseNode.prototype._onHierarchyChangedBase = BaseNode.prototype._onHierarchyChanged;

if (CC_EDITOR) {
  BaseNode.prototype._onRestoreBase = BaseNode.prototype.onRestore;
} // Define public getter and setter methods to ensure api compatibility.


var SameNameGetSets = ['parent', 'name', 'children', 'childrenCount'];
misc.propertyDefine(BaseNode, SameNameGetSets, {});

if (CC_DEV) {
  // promote debug info
  js.get(BaseNode.prototype, ' INFO ', function () {
    var path = '';
    var node = this;

    while (node && !(node instanceof cc.Scene)) {
      if (path) {
        path = node.name + '/' + path;
      } else {
        path = node.name;
      }

      node = node._parent;
    }

    return this.name + ', path: ' + path;
  });
}
/**
 * !#en
 * Note: This event is only emitted from the top most node whose active value did changed,
 * not including its child nodes.
 * !#zh
 * 注意：此节点激活时，此事件仅从最顶部的节点发出。
 * @event active-in-hierarchy-changed
 * @param {Event.EventCustom} event
 */


cc._BaseNode = module.exports = BaseNode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL3V0aWxzL2Jhc2Utbm9kZS5qcyJdLCJuYW1lcyI6WyJGbGFncyIsInJlcXVpcmUiLCJtaXNjIiwianMiLCJJZEdlbmVyYXRlciIsImV2ZW50TWFuYWdlciIsIlJlbmRlckZsb3ciLCJEZXN0cm95aW5nIiwiRG9udERlc3Ryb3kiLCJEZWFjdGl2YXRpbmciLCJDSElMRF9BRERFRCIsIkNISUxEX1JFTU9WRUQiLCJpZEdlbmVyYXRlciIsImdldENvbnN0cnVjdG9yIiwidHlwZU9yQ2xhc3NOYW1lIiwiY2MiLCJlcnJvcklEIiwiZ2V0Q2xhc3NCeU5hbWUiLCJmaW5kQ29tcG9uZW50Iiwibm9kZSIsImNvbnN0cnVjdG9yIiwiX3NlYWxlZCIsImkiLCJfY29tcG9uZW50cyIsImxlbmd0aCIsImNvbXAiLCJmaW5kQ29tcG9uZW50cyIsImNvbXBvbmVudHMiLCJwdXNoIiwiZmluZENoaWxkQ29tcG9uZW50IiwiY2hpbGRyZW4iLCJfY2hpbGRyZW4iLCJmaW5kQ2hpbGRDb21wb25lbnRzIiwiQmFzZU5vZGUiLCJDbGFzcyIsIm5hbWUiLCJPYmplY3QiLCJwcm9wZXJ0aWVzIiwiX3BhcmVudCIsIl9hY3RpdmUiLCJfcHJlZmFiIiwiX3BlcnNpc3ROb2RlIiwiZ2V0IiwiX29iakZsYWdzIiwic2V0IiwidmFsdWUiLCJfbmFtZSIsIkNDX0RFViIsImluZGV4T2YiLCJDQ19KU0IiLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9wcm94eSIsInNldE5hbWUiLCJ1dWlkIiwiX2lkIiwiY2hpbGRyZW5Db3VudCIsImFjdGl2ZSIsInBhcmVudCIsImNvdWxkQWN0aXZlSW5TY2VuZSIsIl9hY3RpdmVJbkhpZXJhcmNoeSIsImRpcmVjdG9yIiwiX25vZGVBY3RpdmF0b3IiLCJhY3RpdmF0ZU5vZGUiLCJhY3RpdmVJbkhpZXJhcmNoeSIsImN0b3IiLCJ1bmRlZmluZWQiLCJDQ19FRElUT1IiLCJFZGl0b3IiLCJVdGlscyIsIlV1aWRVdGlscyIsImdldE5ld0lkIiwiX3NjaGVkdWxlciIsImVuYWJsZUZvclRhcmdldCIsIl9fZXZlbnRUYXJnZXRzIiwiZ2V0UGFyZW50Iiwic2V0UGFyZW50IiwiZW5naW5lIiwiaXNQbGF5aW5nIiwiX1NjZW5lIiwiRGV0ZWN0Q29uZmxpY3QiLCJiZWZvcmVBZGRDaGlsZCIsIm9sZFBhcmVudCIsIkNDX0RFQlVHIiwiX29uU2V0UGFyZW50IiwiX3NldERpcnR5Rm9yTm9kZSIsImVtaXQiLCJfcmVuZGVyRmxhZyIsIkZMQUdfQ0hJTERSRU4iLCJyZW1vdmVBdCIsInNwbGljZSIsIl9vbkhpZXJhcmNoeUNoYW5nZWQiLCJhdHRyIiwiYXR0cnMiLCJtaXhpbiIsImdldENoaWxkQnlVdWlkIiwibG9nIiwibG9jQ2hpbGRyZW4iLCJsZW4iLCJnZXRDaGlsZEJ5TmFtZSIsImFkZENoaWxkIiwiY2hpbGQiLCJfQmFzZU5vZGUiLCJnZXRDbGFzc05hbWUiLCJhc3NlcnRJRCIsImluc2VydENoaWxkIiwic2libGluZ0luZGV4Iiwic2V0U2libGluZ0luZGV4IiwiZ2V0U2libGluZ0luZGV4IiwiaW5kZXgiLCJzaWJsaW5ncyIsIm9sZEluZGV4IiwiX29uU2libGluZ0luZGV4Q2hhbmdlZCIsIndhbGsiLCJwcmVmdW5jIiwicG9zdGZ1bmMiLCJjdXJyIiwiYWZ0ZXJDaGlsZHJlbiIsInN0YWNrIiwiX3N0YWNrcyIsIl9zdGFja0lkIiwiY2xlYW51cCIsInJlbW92ZUZyb21QYXJlbnQiLCJyZW1vdmVDaGlsZCIsInJlbW92ZUFsbENoaWxkcmVuIiwiaXNDaGlsZE9mIiwiZ2V0Q29tcG9uZW50IiwiZ2V0Q29tcG9uZW50cyIsImdldENvbXBvbmVudEluQ2hpbGRyZW4iLCJnZXRDb21wb25lbnRzSW5DaGlsZHJlbiIsIl9jaGVja011bHRpcGxlQ29tcCIsIkNDX1BSRVZJRVciLCJleGlzdGluZyIsIl9kaXNhbGxvd011bHRpcGxlIiwiYWRkQ29tcG9uZW50IiwiZXJyb3IiLCJfUkZwZWVrIiwiaXNDaGlsZENsYXNzT2YiLCJDb21wb25lbnQiLCJSZXFDb21wIiwiX3JlcXVpcmVDb21wb25lbnQiLCJkZXBlbmRlZCIsImNvbXBvbmVudCIsIkNDX1RFU1QiLCJhdHRhY2hlZE9ianNGb3JFZGl0b3IiLCJhY3RpdmF0ZUNvbXAiLCJfYWRkQ29tcG9uZW50QXQiLCJyZW1vdmVDb21wb25lbnQiLCJkZXN0cm95IiwiX2dldERlcGVuZENvbXBvbmVudCIsImlzVmFsaWQiLCJfd2lsbERlc3Ryb3kiLCJkZXBlbmQiLCJfcmVtb3ZlQ29tcG9uZW50IiwicHJvdG90eXBlIiwiY2FsbCIsImRlc3Ryb3lBbGxDaGlsZHJlbiIsIl9vblBvc3RBY3RpdmF0ZWQiLCJfb25CYXRjaFJlc3RvcmVkIiwiX29uQmF0Y2hDcmVhdGVkIiwibmV3UGFyZW50IiwiU2NlbmUiLCJnYW1lIiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwid2FybklEIiwic2NlbmUiLCJnZXRTY2VuZSIsImluQ3VycmVudFNjZW5lQmVmb3JlIiwiaW5DdXJyZW50U2NlbmVOb3ciLCJfcmVnaXN0ZXJJZkF0dGFjaGVkIiwibmV3UHJlZmFiUm9vdCIsInJvb3QiLCJteVByZWZhYkluZm8iLCJQcmVmYWJVdGlscyIsImZpbGVJZCIsImNoZWNrQ2lyY3VsYXJSZWZlcmVuY2UiLCJsaW5rUHJlZmFiIiwiYXNzZXQiLCJ1bmxpbmtQcmVmYWIiLCJhZnRlckFkZENoaWxkIiwic2hvdWxkQWN0aXZlTm93IiwiX2luc3RhbnRpYXRlIiwiY2xvbmVkIiwiaW5zdGFudGlhdGUiLCJfY2xvbmUiLCJ0aGlzUHJlZmFiSW5mbyIsInN5bmNpbmciLCJzeW5jIiwiX2lzUGxheWluZyIsInJlZ2lzdGVyIiwiX29uUHJlRGVzdHJveSIsImRlc3Ryb3lCeVBhcmVudCIsIl9kZXN0cm95SW1tZWRpYXRlIiwiZXZlbnRUYXJnZXRzIiwidGFyZ2V0IiwidGFyZ2V0T2ZmIiwiY2hpbGRJbmRleCIsIm9uUmVzdG9yZSIsIl9vblByZURlc3Ryb3lCYXNlIiwiX29uSGllcmFyY2h5Q2hhbmdlZEJhc2UiLCJfb25SZXN0b3JlQmFzZSIsIlNhbWVOYW1lR2V0U2V0cyIsInByb3BlcnR5RGVmaW5lIiwicGF0aCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxzQkFBRCxDQUFQLENBQWdDRCxLQUE5Qzs7QUFDQSxJQUFNRSxJQUFJLEdBQUdELE9BQU8sQ0FBQyxRQUFELENBQXBCOztBQUNBLElBQU1FLEVBQUUsR0FBR0YsT0FBTyxDQUFDLGdCQUFELENBQWxCOztBQUNBLElBQU1HLFdBQVcsR0FBR0gsT0FBTyxDQUFDLDBCQUFELENBQTNCOztBQUNBLElBQU1JLFlBQVksR0FBR0osT0FBTyxDQUFDLGtCQUFELENBQTVCOztBQUNBLElBQU1LLFVBQVUsR0FBR0wsT0FBTyxDQUFDLHlCQUFELENBQTFCOztBQUVBLElBQU1NLFVBQVUsR0FBR1AsS0FBSyxDQUFDTyxVQUF6QjtBQUNBLElBQU1DLFdBQVcsR0FBR1IsS0FBSyxDQUFDUSxXQUExQjtBQUNBLElBQU1DLFlBQVksR0FBR1QsS0FBSyxDQUFDUyxZQUEzQjtBQUVBLElBQU1DLFdBQVcsR0FBRyxhQUFwQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxlQUF0QjtBQUVBLElBQUlDLFdBQVcsR0FBRyxJQUFJUixXQUFKLENBQWdCLE1BQWhCLENBQWxCOztBQUVBLFNBQVNTLGNBQVQsQ0FBd0JDLGVBQXhCLEVBQXlDO0FBQ3JDLE1BQUksQ0FBQ0EsZUFBTCxFQUFzQjtBQUNsQkMsSUFBQUEsRUFBRSxDQUFDQyxPQUFILENBQVcsSUFBWDtBQUNBLFdBQU8sSUFBUDtBQUNIOztBQUNELE1BQUksT0FBT0YsZUFBUCxLQUEyQixRQUEvQixFQUF5QztBQUNyQyxXQUFPWCxFQUFFLENBQUNjLGNBQUgsQ0FBa0JILGVBQWxCLENBQVA7QUFDSDs7QUFFRCxTQUFPQSxlQUFQO0FBQ0g7O0FBRUQsU0FBU0ksYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkJD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ZixFQUE0QztBQUN4QyxVQUFJMEMsSUFBSixFQUFVO0FBQ05BLFFBQUFBLElBQUksR0FBR3ZMLElBQUksQ0FBQ2dCLElBQUwsR0FBWSxHQUFaLEdBQWtCdUssSUFBekI7QUFDSCxPQUZELE1BR0s7QUFDREEsUUFBQUEsSUFBSSxHQUFHdkwsSUFBSSxDQUFDZ0IsSUFBWjtBQUNIOztBQUNEaEIsTUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUNtQixPQUFaO0FBQ0g7O0FBQ0QsV0FBTyxLQUFLSCxJQUFMLEdBQVksVUFBWixHQUF5QnVLLElBQWhDO0FBQ0gsR0FiRDtBQWNIO0FBRUQ7Ozs7Ozs7Ozs7O0FBVUEzTCxFQUFFLENBQUNzRixTQUFILEdBQWVzRyxNQUFNLENBQUNDLE9BQVAsR0FBaUIzSyxRQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBGbGFncyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL0NDT2JqZWN0JykuRmxhZ3M7XG5jb25zdCBtaXNjID0gcmVxdWlyZSgnLi9taXNjJyk7XG5jb25zdCBqcyA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2pzJyk7XG5jb25zdCBJZEdlbmVyYXRlciA9IHJlcXVpcmUoJy4uL3BsYXRmb3JtL2lkLWdlbmVyYXRlcicpO1xuY29uc3QgZXZlbnRNYW5hZ2VyID0gcmVxdWlyZSgnLi4vZXZlbnQtbWFuYWdlcicpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4uL3JlbmRlcmVyL3JlbmRlci1mbG93Jyk7XG5cbmNvbnN0IERlc3Ryb3lpbmcgPSBGbGFncy5EZXN0cm95aW5nO1xuY29uc3QgRG9udERlc3Ryb3kgPSBGbGFncy5Eb250RGVzdHJveTtcbmNvbnN0IERlYWN0aXZhdGluZyA9IEZsYWdzLkRlYWN0aXZhdGluZzsgXG5cbmNvbnN0IENISUxEX0FEREVEID0gJ2NoaWxkLWFkZGVkJztcbmNvbnN0IENISUxEX1JFTU9WRUQgPSAnY2hpbGQtcmVtb3ZlZCc7XG5cbnZhciBpZEdlbmVyYXRlciA9IG5ldyBJZEdlbmVyYXRlcignTm9kZScpO1xuXG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3Rvcih0eXBlT3JDbGFzc05hbWUpIHtcbiAgICBpZiAoIXR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICBjYy5lcnJvcklEKDM4MDQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0eXBlT3JDbGFzc05hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBqcy5nZXRDbGFzc0J5TmFtZSh0eXBlT3JDbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlT3JDbGFzc05hbWU7XG59XG5cbmZ1bmN0aW9uIGZpbmRDb21wb25lbnQobm9kZSwgY29uc3RydWN0b3IpIHtcbiAgICBpZiAoY29uc3RydWN0b3IuX3NlYWxlZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NvbXBvbmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0gbm9kZS5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wLmNvbnN0cnVjdG9yID09PSBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NvbXBvbmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0gbm9kZS5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wIGluc3RhbmNlb2YgY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZENvbXBvbmVudHMobm9kZSwgY29uc3RydWN0b3IsIGNvbXBvbmVudHMpIHtcbiAgICBpZiAoY29uc3RydWN0b3IuX3NlYWxlZCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUuX2NvbXBvbmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxldCBjb21wID0gbm9kZS5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wLmNvbnN0cnVjdG9yID09PSBjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChjb21wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLl9jb21wb25lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgY29tcCA9IG5vZGUuX2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICBpZiAoY29tcCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaW5kQ2hpbGRDb21wb25lbnQoY2hpbGRyZW4sIGNvbnN0cnVjdG9yKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgbm9kZSA9IGNoaWxkcmVuW2ldO1xuICAgICAgICB2YXIgY29tcCA9IGZpbmRDb21wb25lbnQobm9kZSwgY29uc3RydWN0b3IpO1xuICAgICAgICBpZiAoY29tcCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobm9kZS5fY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29tcCA9IGZpbmRDaGlsZENvbXBvbmVudChub2RlLl9jaGlsZHJlbiwgY29uc3RydWN0b3IpO1xuICAgICAgICAgICAgaWYgKGNvbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZENoaWxkQ29tcG9uZW50cyhjaGlsZHJlbiwgY29uc3RydWN0b3IsIGNvbXBvbmVudHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBub2RlID0gY2hpbGRyZW5baV07XG4gICAgICAgIGZpbmRDb21wb25lbnRzKG5vZGUsIGNvbnN0cnVjdG9yLCBjb21wb25lbnRzKTtcbiAgICAgICAgaWYgKG5vZGUuX2NoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZpbmRDaGlsZENvbXBvbmVudHMobm9kZS5fY2hpbGRyZW4sIGNvbnN0cnVjdG9yLCBjb21wb25lbnRzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBIGJhc2Ugbm9kZSBmb3IgQ0NOb2RlLCBpdCB3aWxsOlxuICogLSBtYWludGFpbiBzY2VuZSBoaWVyYXJjaHkgYW5kIGFjdGl2ZSBsb2dpY1xuICogLSBub3RpZmljYXRpb25zIGlmIHNvbWUgcHJvcGVydGllcyBjaGFuZ2VkXG4gKiAtIGRlZmluZSBzb21lIGludGVyZmFjZXMgc2hhcmVzIGJldHdlZW4gQ0NOb2RlXG4gKiAtIGRlZmluZSBtYWNoYW5pc21zIGZvciBFbml0eSBDb21wb25lbnQgU3lzdGVtc1xuICogLSBkZWZpbmUgcHJlZmFiIGFuZCBzZXJpYWxpemUgZnVuY3Rpb25zXG4gKlxuICogQGNsYXNzIF9CYXNlTm9kZVxuICogQGV4dGVuZHMgT2JqZWN0XG4gKiBAdXNlcyBFdmVudFRhcmdldFxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgQmFzZU5vZGUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLl9CYXNlTm9kZScsXG4gICAgZXh0ZW5kczogY2MuT2JqZWN0LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBTRVJJQUxJWkFCTEVcblxuICAgICAgICBfcGFyZW50OiBudWxsLFxuICAgICAgICBfY2hpbGRyZW46IFtdLFxuXG4gICAgICAgIF9hY3RpdmU6IHRydWUsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfY29tcG9uZW50c1xuICAgICAgICAgKiBAdHlwZSB7Q29tcG9uZW50W119XG4gICAgICAgICAqIEBkZWZhdWx0IFtdXG4gICAgICAgICAqIEByZWFkT25seVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgX2NvbXBvbmVudHM6IFtdLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgUHJlZmFiSW5mbyBvYmplY3RcbiAgICAgICAgICogQHByb3BlcnR5IF9wcmVmYWJcbiAgICAgICAgICogQHR5cGUge1ByZWZhYkluZm99XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfcHJlZmFiOiBudWxsLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0cnVlLCB0aGUgbm9kZSBpcyBhbiBwZXJzaXN0IG5vZGUgd2hpY2ggd29uJ3QgYmUgZGVzdHJveWVkIGR1cmluZyBzY2VuZSB0cmFuc2l0aW9uLlxuICAgICAgICAgKiBJZiBmYWxzZSwgdGhlIG5vZGUgd2lsbCBiZSBkZXN0cm95ZWQgYXV0b21hdGljYWxseSB3aGVuIGxvYWRpbmcgYSBuZXcgc2NlbmUuIERlZmF1bHQgaXMgZmFsc2UuXG4gICAgICAgICAqIEBwcm9wZXJ0eSBfcGVyc2lzdE5vZGVcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBfcGVyc2lzdE5vZGU6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9vYmpGbGFncyAmIERvbnREZXN0cm95KSA+IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vYmpGbGFncyB8PSBEb250RGVzdHJveTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29iakZsYWdzICY9IH5Eb250RGVzdHJveTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQVBJXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gTmFtZSBvZiBub2RlLlxuICAgICAgICAgKiAhI3poIOivpeiKgueCueWQjeensOOAglxuICAgICAgICAgKiBAcHJvcGVydHkgbmFtZVxuICAgICAgICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBub2RlLm5hbWUgPSBcIk5ldyBOb2RlXCI7XG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgTmFtZTogXCIgKyBub2RlLm5hbWUpO1xuICAgICAgICAgKi9cbiAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFViAmJiB2YWx1ZS5pbmRleE9mKCcvJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMTYzMik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChDQ19KU0IgJiYgQ0NfTkFUSVZFUkVOREVSRVIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJveHkuc2V0TmFtZSh0aGlzLl9uYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiAhI2VuIFRoZSB1dWlkIGZvciBlZGl0b3IsIHdpbGwgYmUgc3RyaXBwZWQgYmVmb3JlIGJ1aWxkaW5nIHByb2plY3QuXG4gICAgICAgICAqICEjemgg5Li76KaB55So5LqO57yW6L6R5Zmo55qEIHV1aWTvvIzlnKjnvJbovpHlmajkuIvlj6/nlKjkuo7mjIHkuYXljJblrZjlgqjvvIzlnKjpobnnm67mnoTlu7rkuYvlkI7lsIblj5jmiJDoh6rlop7nmoQgaWTjgIJcbiAgICAgICAgICogQHByb3BlcnR5IHV1aWRcbiAgICAgICAgICogQHR5cGUge1N0cmluZ31cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNjLmxvZyhcIk5vZGUgVXVpZDogXCIgKyBub2RlLnV1aWQpO1xuICAgICAgICAgKi9cbiAgICAgICAgdXVpZDoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQWxsIGNoaWxkcmVuIG5vZGVzLlxuICAgICAgICAgKiAhI3poIOiKgueCueeahOaJgOacieWtkOiKgueCueOAglxuICAgICAgICAgKiBAcHJvcGVydHkgY2hpbGRyZW5cbiAgICAgICAgICogQHR5cGUge05vZGVbXX1cbiAgICAgICAgICogQHJlYWRPbmx5XG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgICAqIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICogICAgIGNjLmxvZyhcIk5vZGU6IFwiICsgY2hpbGRyZW5baV0pO1xuICAgICAgICAgKiB9XG4gICAgICAgICAqL1xuICAgICAgICBjaGlsZHJlbjoge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gQWxsIGNoaWxkcmVuIG5vZGVzLlxuICAgICAgICAgKiAhI3poIOiKgueCueeahOWtkOiKgueCueaVsOmHj+OAglxuICAgICAgICAgKiBAcHJvcGVydHkgY2hpbGRyZW5Db3VudFxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKiBAcmVhZE9ubHlcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIGNvdW50ID0gbm9kZS5jaGlsZHJlbkNvdW50O1xuICAgICAgICAgKiBjYy5sb2coXCJOb2RlIENoaWxkcmVuIENvdW50OiBcIiArIGNvdW50KTtcbiAgICAgICAgICovXG4gICAgICAgIGNoaWxkcmVuQ291bnQ6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogISNlblxuICAgICAgICAgKiBUaGUgbG9jYWwgYWN0aXZlIHN0YXRlIG9mIHRoaXMgbm9kZS48YnIvPlxuICAgICAgICAgKiBOb3RlIHRoYXQgYSBOb2RlIG1heSBiZSBpbmFjdGl2ZSBiZWNhdXNlIGEgcGFyZW50IGlzIG5vdCBhY3RpdmUsIGV2ZW4gaWYgdGhpcyByZXR1cm5zIHRydWUuPGJyLz5cbiAgICAgICAgICogVXNlIHt7I2Nyb3NzTGluayBcIk5vZGUvYWN0aXZlSW5IaWVyYXJjaHk6cHJvcGVydHlcIn19e3svY3Jvc3NMaW5rfX0gaWYgeW91IHdhbnQgdG8gY2hlY2sgaWYgdGhlIE5vZGUgaXMgYWN0dWFsbHkgdHJlYXRlZCBhcyBhY3RpdmUgaW4gdGhlIHNjZW5lLlxuICAgICAgICAgKiAhI3poXG4gICAgICAgICAqIOW9k+WJjeiKgueCueeahOiHqui6q+a/gOa0u+eKtuaAgeOAgjxici8+XG4gICAgICAgICAqIOWAvOW+l+azqOaEj+eahOaYr++8jOS4gOS4quiKgueCueeahOeItuiKgueCueWmguaenOS4jeiiq+a/gOa0u++8jOmCo+S5iOWNs+S9v+Wug+iHqui6q+iuvuS4uua/gOa0u++8jOWug+S7jeeEtuaXoOazlea/gOa0u+OAgjxici8+XG4gICAgICAgICAqIOWmguaenOS9oOaDs+ajgOafpeiKgueCueWcqOWcuuaZr+S4reWunumZheeahOa/gOa0u+eKtuaAgeWPr+S7peS9v+eUqCB7eyNjcm9zc0xpbmsgXCJOb2RlL2FjdGl2ZUluSGllcmFyY2h5OnByb3BlcnR5XCJ9fXt7L2Nyb3NzTGlua31944CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhY3RpdmVcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogbm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICovXG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb3VsZEFjdGl2ZUluU2NlbmUgPSBwYXJlbnQuX2FjdGl2ZUluSGllcmFyY2h5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdWxkQWN0aXZlSW5TY2VuZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9ub2RlQWN0aXZhdG9yLmFjdGl2YXRlTm9kZSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqICEjZW4gSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBub2RlIGlzIGFjdGl2ZSBpbiB0aGUgc2NlbmUuXG4gICAgICAgICAqICEjemgg6KGo56S65q2k6IqC54K55piv5ZCm5Zyo5Zy65pmv5Lit5r+A5rS744CCXG4gICAgICAgICAqIEBwcm9wZXJ0eSBhY3RpdmVJbkhpZXJhcmNoeVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY2MubG9nKFwiYWN0aXZlSW5IaWVyYXJjaHk6IFwiICsgbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSk7XG4gICAgICAgICAqL1xuICAgICAgICBhY3RpdmVJbkhpZXJhcmNoeToge1xuICAgICAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5IaWVyYXJjaHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gICAgICovXG4gICAgY3RvciAobmFtZSkge1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZSAhPT0gdW5kZWZpbmVkID8gbmFtZSA6ICdOZXcgTm9kZSc7XG4gICAgICAgIHRoaXMuX2FjdGl2ZUluSGllcmFyY2h5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lkID0gQ0NfRURJVE9SID8gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy51dWlkKCkgOiBpZEdlbmVyYXRlci5nZXROZXdJZCgpO1xuXG4gICAgICAgIGNjLmRpcmVjdG9yLl9zY2hlZHVsZXIgJiYgY2MuZGlyZWN0b3IuX3NjaGVkdWxlci5lbmFibGVGb3JUYXJnZXQodGhpcyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlZ2lzdGVyIGFsbCByZWxhdGVkIEV2ZW50VGFyZ2V0cyxcbiAgICAgICAgICogYWxsIGV2ZW50IGNhbGxiYWNrcyB3aWxsIGJlIHJlbW92ZWQgaW4gX29uUHJlRGVzdHJveVxuICAgICAgICAgKiBAcHJvcGVydHkgX19ldmVudFRhcmdldHNcbiAgICAgICAgICogQHR5cGUge0V2ZW50VGFyZ2V0W119XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9fZXZlbnRUYXJnZXRzID0gW107XG4gICAgfSxcbiAgICAvKiogXG4gICAgICogISNlbiBUaGUgcGFyZW50IG9mIHRoZSBub2RlLlxuICAgICAqICEjemgg6K+l6IqC54K555qE54i26IqC54K544CCXG4gICAgICogQHByb3BlcnR5IHtOb2RlfSBwYXJlbnRcbiAgICAgKiBAZXhhbXBsZSBcbiAgICAgKiBjYy5sb2coXCJOb2RlIFBhcmVudDogXCIgKyBub2RlLnBhcmVudCk7XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIEdldCBwYXJlbnQgb2YgdGhlIG5vZGUuXG4gICAgICogISN6aCDojrflj5bor6XoioLngrnnmoTniLboioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldFBhcmVudFxuICAgICAqIEByZXR1cm4ge05vZGV9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcGFyZW50ID0gdGhpcy5ub2RlLmdldFBhcmVudCgpO1xuICAgICAqL1xuICAgIGdldFBhcmVudCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHBhcmVudCBvZiB0aGUgbm9kZS5cbiAgICAgKiAhI3poIOiuvue9ruivpeiKgueCueeahOeItuiKgueCueOAglxuICAgICAqIEBtZXRob2Qgc2V0UGFyZW50XG4gICAgICogQHBhcmFtIHtOb2RlfSB2YWx1ZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5zZXRQYXJlbnQobmV3Tm9kZSk7XG4gICAgICovXG4gICAgc2V0UGFyZW50ICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fcGFyZW50ID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDQ19FRElUT1IgJiYgY2MuZW5naW5lICYmICFjYy5lbmdpbmUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICBpZiAoX1NjZW5lLkRldGVjdENvbmZsaWN0LmJlZm9yZUFkZENoaWxkKHRoaXMsIHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgb2xkUGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICBpZiAoQ0NfREVCVUcgJiYgb2xkUGFyZW50ICYmIChvbGRQYXJlbnQuX29iakZsYWdzICYgRGVhY3RpdmF0aW5nKSkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzODIxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB2YWx1ZSB8fCBudWxsO1xuXG4gICAgICAgIHRoaXMuX29uU2V0UGFyZW50KHZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChDQ19ERUJVRyAmJiAodmFsdWUuX29iakZsYWdzICYgRGVhY3RpdmF0aW5nKSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgyMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudE1hbmFnZXIuX3NldERpcnR5Rm9yTm9kZSh0aGlzKTtcbiAgICAgICAgICAgIHZhbHVlLl9jaGlsZHJlbi5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgdmFsdWUuZW1pdCAmJiB2YWx1ZS5lbWl0KENISUxEX0FEREVELCB0aGlzKTtcbiAgICAgICAgICAgIHZhbHVlLl9yZW5kZXJGbGFnIHw9IFJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2xkUGFyZW50KSB7XG4gICAgICAgICAgICBpZiAoIShvbGRQYXJlbnQuX29iakZsYWdzICYgRGVzdHJveWluZykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlQXQgPSBvbGRQYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKENDX0RFViAmJiByZW1vdmVBdCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNjLmVycm9ySUQoMTYzMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9sZFBhcmVudC5fY2hpbGRyZW4uc3BsaWNlKHJlbW92ZUF0LCAxKTtcbiAgICAgICAgICAgICAgICBvbGRQYXJlbnQuZW1pdCAmJiBvbGRQYXJlbnQuZW1pdChDSElMRF9SRU1PVkVELCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkhpZXJhcmNoeUNoYW5nZWQob2xkUGFyZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChvbGRQYXJlbnQuX2NoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRQYXJlbnQuX3JlbmRlckZsYWcgJj0gflJlbmRlckZsb3cuRkxBR19DSElMRFJFTjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX29uSGllcmFyY2h5Q2hhbmdlZChudWxsKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBBQlNUUkFDVCBJTlRFUkZBQ0VTXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUHJvcGVydGllcyBjb25maWd1cmF0aW9uIGZ1bmN0aW9uIDxici8+XG4gICAgICogQWxsIHByb3BlcnRpZXMgaW4gYXR0cnMgd2lsbCBiZSBzZXQgdG8gdGhlIG5vZGUsIDxici8+XG4gICAgICogd2hlbiB0aGUgc2V0dGVyIG9mIHRoZSBub2RlIGlzIGF2YWlsYWJsZSwgPGJyLz5cbiAgICAgKiB0aGUgcHJvcGVydHkgd2lsbCBiZSBzZXQgdmlhIHNldHRlciBmdW5jdGlvbi48YnIvPlxuICAgICAqICEjemgg5bGe5oCn6YWN572u5Ye95pWw44CC5ZyoIGF0dHJzIOeahOaJgOacieWxnuaAp+Wwhuiiq+iuvue9ruS4uuiKgueCueWxnuaAp+OAglxuICAgICAqIEBtZXRob2QgYXR0clxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRycyAtIFByb3BlcnRpZXMgdG8gYmUgc2V0IHRvIG5vZGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBhdHRycyA9IHsga2V5OiAwLCBudW06IDEwMCB9O1xuICAgICAqIG5vZGUuYXR0cihhdHRycyk7XG4gICAgICovXG4gICAgYXR0ciAoYXR0cnMpIHtcbiAgICAgICAganMubWl4aW4odGhpcywgYXR0cnMpO1xuICAgIH0sXG5cbiAgICAvLyBjb21wb3NpdGlvbjogR0VUXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYSBjaGlsZCBmcm9tIHRoZSBjb250YWluZXIgZ2l2ZW4gaXRzIHV1aWQuXG4gICAgICogISN6aCDpgJrov4cgdXVpZCDojrflj5boioLngrnnmoTlrZDoioLngrnjgIJcbiAgICAgKiBAbWV0aG9kIGdldENoaWxkQnlVdWlkXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHV1aWQgLSBUaGUgdXVpZCB0byBmaW5kIHRoZSBjaGlsZCBub2RlLlxuICAgICAqIEByZXR1cm4ge05vZGV9IGEgTm9kZSB3aG9zZSB1dWlkIGVxdWFscyB0byB0aGUgaW5wdXQgcGFyYW1ldGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgY2hpbGQgPSBub2RlLmdldENoaWxkQnlVdWlkKHV1aWQpO1xuICAgICAqL1xuICAgIGdldENoaWxkQnlVdWlkICh1dWlkKSB7XG4gICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgY2MubG9nKFwiSW52YWxpZCB1dWlkXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9jQ2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGxvY0NoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobG9jQ2hpbGRyZW5baV0uX2lkID09PSB1dWlkKVxuICAgICAgICAgICAgICAgIHJldHVybiBsb2NDaGlsZHJlbltpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIGEgY2hpbGQgZnJvbSB0aGUgY29udGFpbmVyIGdpdmVuIGl0cyBuYW1lLlxuICAgICAqICEjemgg6YCa6L+H5ZCN56ew6I635Y+W6IqC54K555qE5a2Q6IqC54K544CCXG4gICAgICogQG1ldGhvZCBnZXRDaGlsZEJ5TmFtZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gQSBuYW1lIHRvIGZpbmQgdGhlIGNoaWxkIG5vZGUuXG4gICAgICogQHJldHVybiB7Tm9kZX0gYSBDQ05vZGUgb2JqZWN0IHdob3NlIG5hbWUgZXF1YWxzIHRvIHRoZSBpbnB1dCBwYXJhbWV0ZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBjaGlsZCA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJUZXN0IE5vZGVcIik7XG4gICAgICovXG4gICAgZ2V0Q2hpbGRCeU5hbWUgKG5hbWUpIHtcbiAgICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJJbnZhbGlkIG5hbWVcIik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2NDaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbG9jQ2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsb2NDaGlsZHJlbltpXS5fbmFtZSA9PT0gbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jQ2hpbGRyZW5baV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIC8vIGNvbXBvc2l0aW9uOiBBRERcblxuICAgIGFkZENoaWxkIChjaGlsZCkge1xuXG4gICAgICAgIGlmIChDQ19ERVYgJiYgIShjaGlsZCBpbnN0YW5jZW9mIGNjLl9CYXNlTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDE2MzQsIGNjLmpzLmdldENsYXNzTmFtZShjaGlsZCkpO1xuICAgICAgICB9XG4gICAgICAgIGNjLmFzc2VydElEKGNoaWxkLCAxNjA2KTtcbiAgICAgICAgY2MuYXNzZXJ0SUQoY2hpbGQuX3BhcmVudCA9PT0gbnVsbCwgMTYwNSk7XG5cbiAgICAgICAgLy8gaW52b2tlcyB0aGUgcGFyZW50IHNldHRlclxuICAgICAgICBjaGlsZC5zZXRQYXJlbnQodGhpcyk7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIEluc2VydHMgYSBjaGlsZCB0byB0aGUgbm9kZSBhdCBhIHNwZWNpZmllZCBpbmRleC5cbiAgICAgKiAhI3poXG4gICAgICog5o+S5YWl5a2Q6IqC54K55Yiw5oyH5a6a5L2N572uXG4gICAgICogQG1ldGhvZCBpbnNlcnRDaGlsZFxuICAgICAqIEBwYXJhbSB7Tm9kZX0gY2hpbGQgLSB0aGUgY2hpbGQgbm9kZSB0byBiZSBpbnNlcnRlZFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzaWJsaW5nSW5kZXggLSB0aGUgc2libGluZyBpbmRleCB0byBwbGFjZSB0aGUgY2hpbGQgaW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuaW5zZXJ0Q2hpbGQoY2hpbGQsIDIpO1xuICAgICAqL1xuICAgIGluc2VydENoaWxkIChjaGlsZCwgc2libGluZ0luZGV4KSB7XG4gICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgIGNoaWxkLnNldFNpYmxpbmdJbmRleChzaWJsaW5nSW5kZXgpO1xuICAgIH0sXG5cbiAgICAvLyBISUVSQVJDSFkgTUVUSE9EU1xuXG4gICAgLyoqXG4gICAgICogISNlbiBHZXQgdGhlIHNpYmxpbmcgaW5kZXguXG4gICAgICogISN6aCDojrflj5blkIznuqfntKLlvJXjgIJcbiAgICAgKiBAbWV0aG9kIGdldFNpYmxpbmdJbmRleFxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbmRleCA9IG5vZGUuZ2V0U2libGluZ0luZGV4KCk7XG4gICAgICovXG4gICAgZ2V0U2libGluZ0luZGV4ICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudC5fY2hpbGRyZW4uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gU2V0IHRoZSBzaWJsaW5nIGluZGV4IG9mIHRoaXMgbm9kZS5cbiAgICAgKiAhI3poIOiuvue9ruiKgueCueWQjOe6p+e0ouW8leOAglxuICAgICAqIEBtZXRob2Qgc2V0U2libGluZ0luZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnNldFNpYmxpbmdJbmRleCgxKTtcbiAgICAgKi9cbiAgICBzZXRTaWJsaW5nSW5kZXggKGluZGV4KSB7XG4gICAgICAgIGlmICghdGhpcy5fcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BhcmVudC5fb2JqRmxhZ3MgJiBEZWFjdGl2YXRpbmcpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgyMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpYmxpbmdzID0gdGhpcy5fcGFyZW50Ll9jaGlsZHJlbjtcbiAgICAgICAgaW5kZXggPSBpbmRleCAhPT0gLTEgPyBpbmRleCA6IHNpYmxpbmdzLmxlbmd0aCAtIDE7XG4gICAgICAgIHZhciBvbGRJbmRleCA9IHNpYmxpbmdzLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gb2xkSW5kZXgpIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLnNwbGljZShvbGRJbmRleCwgMSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBzaWJsaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzaWJsaW5ncy5zcGxpY2UoaW5kZXgsIDAsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc2libGluZ3MucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uU2libGluZ0luZGV4Q2hhbmdlZCAmJiB0aGlzLl9vblNpYmxpbmdJbmRleENoYW5nZWQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gV2FsayB0aG91Z2ggdGhlIHN1YiBjaGlsZHJlbiB0cmVlIG9mIHRoZSBjdXJyZW50IG5vZGUuXG4gICAgICogRWFjaCBub2RlLCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgbm9kZSwgaW4gdGhlIHN1YiB0cmVlIHdpbGwgYmUgdmlzaXRlZCB0d28gdGltZXMsIGJlZm9yZSBhbGwgY2hpbGRyZW4gYW5kIGFmdGVyIGFsbCBjaGlsZHJlbi5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNhbGwgaXMgbm90IHJlY3Vyc2l2ZSwgaXQncyBiYXNlZCBvbiBzdGFjay5cbiAgICAgKiBQbGVhc2UgZG9uJ3Qgd2FsayBhbnkgb3RoZXIgbm9kZSBpbnNpZGUgdGhlIHdhbGsgcHJvY2Vzcy5cbiAgICAgKiAhI3poIOmBjeWOhuivpeiKgueCueeahOWtkOagkemHjOeahOaJgOacieiKgueCueW5tuaMieinhOWImeaJp+ihjOWbnuiwg+WHveaVsOOAglxuICAgICAqIOWvueWtkOagkeS4reeahOaJgOacieiKgueCue+8jOWMheWQq+W9k+WJjeiKgueCue+8jOS8muaJp+ihjOS4pOasoeWbnuiwg++8jHByZWZ1bmMg5Lya5Zyo6K6/6Zeu5a6D55qE5a2Q6IqC54K55LmL5YmN6LCD55So77yMcG9zdGZ1bmMg5Lya5Zyo6K6/6Zeu5omA5pyJ5a2Q6IqC54K55LmL5ZCO6LCD55So44CCXG4gICAgICog6L+Z5Liq5Ye95pWw55qE5a6e546w5LiN5piv5Z+65LqO6YCS5b2S55qE77yM6ICM5piv5Z+65LqO5qCI5bGV5byA6YCS5b2S55qE5pa55byP44CCXG4gICAgICog6K+35LiN6KaB5ZyoIHdhbGsg6L+H56iL5Lit5a+55Lu75L2V5YW25LuW55qE6IqC54K55bWM5aWX5omn6KGMIHdhbGvjgIJcbiAgICAgKiBAbWV0aG9kIHdhbGtcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVmdW5jIFRoZSBjYWxsYmFjayB0byBwcm9jZXNzIG5vZGUgd2hlbiByZWFjaCB0aGUgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgKiBAcGFyYW0ge19CYXNlTm9kZX0gcHJlZnVuYy50YXJnZXQgVGhlIGN1cnJlbnQgdmlzaXRpbmcgbm9kZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHBvc3RmdW5jIFRoZSBjYWxsYmFjayB0byBwcm9jZXNzIG5vZGUgd2hlbiByZS12aXNpdCB0aGUgbm9kZSBhZnRlciB3YWxrZWQgYWxsIGNoaWxkcmVuIGluIGl0cyBzdWIgdHJlZVxuICAgICAqIEBwYXJhbSB7X0Jhc2VOb2RlfSBwb3N0ZnVuYy50YXJnZXQgVGhlIGN1cnJlbnQgdmlzaXRpbmcgbm9kZVxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS53YWxrKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ1dhbGtlZCB0aHJvdWdoIG5vZGUgJyArIHRhcmdldC5uYW1lICsgJyBmb3IgdGhlIGZpcnN0IHRpbWUnKTtcbiAgICAgKiB9LCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICogICAgIGNvbnNvbGUubG9nKCdXYWxrZWQgdGhyb3VnaCBub2RlICcgKyB0YXJnZXQubmFtZSArICcgYWZ0ZXIgd2Fsa2VkIGFsbCBjaGlsZHJlbiBpbiBpdHMgc3ViIHRyZWUnKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB3YWxrIChwcmVmdW5jLCBwb3N0ZnVuYykge1xuICAgICAgICB2YXIgQmFzZU5vZGUgPSBjYy5fQmFzZU5vZGU7XG4gICAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICAgIHZhciBjaGlsZHJlbiwgY2hpbGQsIGN1cnIsIGksIGFmdGVyQ2hpbGRyZW47XG4gICAgICAgIHZhciBzdGFjayA9IEJhc2VOb2RlLl9zdGFja3NbQmFzZU5vZGUuX3N0YWNrSWRdO1xuICAgICAgICBpZiAoIXN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjayA9IFtdO1xuICAgICAgICAgICAgQmFzZU5vZGUuX3N0YWNrcy5wdXNoKHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBCYXNlTm9kZS5fc3RhY2tJZCsrO1xuXG4gICAgICAgIHN0YWNrLmxlbmd0aCA9IDA7XG4gICAgICAgIHN0YWNrWzBdID0gdGhpcztcbiAgICAgICAgdmFyIHBhcmVudCA9IG51bGw7XG4gICAgICAgIGFmdGVyQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGluZGV4KSB7XG4gICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgY3VyciA9IHN0YWNrW2luZGV4XTtcbiAgICAgICAgICAgIGlmICghY3Vycikge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFhZnRlckNoaWxkcmVuICYmIHByZWZ1bmMpIHtcbiAgICAgICAgICAgICAgICAvLyBwcmUgY2FsbFxuICAgICAgICAgICAgICAgIHByZWZ1bmMoY3Vycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhZnRlckNoaWxkcmVuICYmIHBvc3RmdW5jKSB7XG4gICAgICAgICAgICAgICAgLy8gcG9zdCBjYWxsXG4gICAgICAgICAgICAgICAgcG9zdGZ1bmMoY3Vycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEF2b2lkIG1lbW9yeSBsZWFrXG4gICAgICAgICAgICBzdGFja1tpbmRleF0gPSBudWxsO1xuICAgICAgICAgICAgLy8gRG8gbm90IHJlcGVhdGx5IHZpc2l0IGNoaWxkIHRyZWUsIGp1c3QgZG8gcG9zdCBjYWxsIGFuZCBjb250aW51ZSB3YWxrXG4gICAgICAgICAgICBpZiAoYWZ0ZXJDaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgPT09IHRoaXMuX3BhcmVudCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgYWZ0ZXJDaGlsZHJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hpbGRyZW4gbm90IHByb2NlZWRlZCBhbmQgaGFzIGNoaWxkcmVuLCBwcm9jZWVkIHRvIGNoaWxkIHRyZWVcbiAgICAgICAgICAgICAgICBpZiAoY3Vyci5fY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBjdXJyO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IGN1cnIuX2NoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbaW5kZXhdID0gY2hpbGRyZW5baV07XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5vIGNoaWxkcmVuLCB0aGVuIHJlcHVzaCBjdXJyIHRvIGJlIHdhbGtlZCBmb3IgcG9zdCBmdW5jXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW2luZGV4XSA9IGN1cnI7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgIGFmdGVyQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN1cnIgaGFzIG5vIHN1YiB0cmVlLCBzbyBsb29rIGludG8gdGhlIHNpYmxpbmdzIGluIHBhcmVudCBjaGlsZHJlblxuICAgICAgICAgICAgaWYgKGNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIC8vIFByb2NlZWQgdG8gbmV4dCBzaWJsaW5nIGluIHBhcmVudCBjaGlsZHJlblxuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFja1tpbmRleF0gPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTm8gY2hpbGRyZW4gYW55IG1vcmUgaW4gdGhpcyBzdWIgdHJlZSwgZ28gdXB3YXJkXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrW2luZGV4XSA9IHBhcmVudDtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0dXAgcGFyZW50IHdhbGsgZW52XG4gICAgICAgICAgICAgICAgICAgIGFmdGVyQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50Ll9wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gcGFyZW50Ll9wYXJlbnQuX2NoaWxkcmVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGNoaWxkcmVuLmluZGV4T2YocGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5fcGFyZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXQgcm9vdFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEVSUk9SXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgQmFzZU5vZGUuX3N0YWNrSWQtLTtcbiAgICB9LFxuXG4gICAgY2xlYW51cCAoKSB7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbW92ZSBpdHNlbGYgZnJvbSBpdHMgcGFyZW50IG5vZGUuIElmIGNsZWFudXAgaXMgYHRydWVgLCB0aGVuIGFsc28gcmVtb3ZlIGFsbCBldmVudHMgYW5kIGFjdGlvbnMuIDxici8+XG4gICAgICogSWYgdGhlIGNsZWFudXAgcGFyYW1ldGVyIGlzIG5vdCBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgYSBjbGVhbnVwLCBzbyBpdCBpcyByZWNvbW1lbmRlZCB0aGF0IHlvdSBhbHdheXMgcGFzcyBpbiB0aGUgYGZhbHNlYCBwYXJhbWV0ZXIgd2hlbiBjYWxsaW5nIHRoaXMgQVBJLjxici8+XG4gICAgICogSWYgdGhlIG5vZGUgb3JwaGFuLCB0aGVuIG5vdGhpbmcgaGFwcGVucy5cbiAgICAgKiAhI3poXG4gICAgICog5LuO54i26IqC54K55Lit5Yig6Zmk6K+l6IqC54K544CC5aaC5p6c5LiN5Lyg5YWlIGNsZWFudXAg5Y+C5pWw5oiW6ICF5Lyg5YWlIGB0cnVlYO+8jOmCo+S5iOi/meS4quiKgueCueS4iuaJgOaciee7keWumueahOS6i+S7tuOAgWFjdGlvbiDpg73kvJrooqvliKDpmaTjgII8YnIvPlxuICAgICAqIOWboOatpOW7uuiuruiwg+eUqOi/meS4qiBBUEkg5pe25oC75piv5Lyg5YWlIGBmYWxzZWAg5Y+C5pWw44CCPGJyLz5cbiAgICAgKiDlpoLmnpzov5nkuKroioLngrnmmK/kuIDkuKrlraToioLngrnvvIzpgqPkuYjku4DkuYjpg73kuI3kvJrlj5HnlJ/jgIJcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUZyb21QYXJlbnRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgYWN0aW9ucyBhbmQgY2FsbGJhY2tzIG9uIHRoaXMgbm9kZSBzaG91bGQgYmUgcmVtb3ZlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICogbm9kZS5yZW1vdmVGcm9tUGFyZW50KGZhbHNlKTtcbiAgICAgKi9cbiAgICByZW1vdmVGcm9tUGFyZW50IChjbGVhbnVwKSB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgICAgICAgIGlmIChjbGVhbnVwID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgY2xlYW51cCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQucmVtb3ZlQ2hpbGQodGhpcywgY2xlYW51cCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJlbW92ZXMgYSBjaGlsZCBmcm9tIHRoZSBjb250YWluZXIuIEl0IHdpbGwgYWxzbyBjbGVhbnVwIGFsbCBydW5uaW5nIGFjdGlvbnMgZGVwZW5kaW5nIG9uIHRoZSBjbGVhbnVwIHBhcmFtZXRlci4gPC9wPlxuICAgICAqIElmIHRoZSBjbGVhbnVwIHBhcmFtZXRlciBpcyBub3QgcGFzc2VkLCBpdCB3aWxsIGZvcmNlIGEgY2xlYW51cC4gPGJyLz5cbiAgICAgKiBcInJlbW92ZVwiIGxvZ2ljIE1VU1Qgb25seSBiZSBvbiB0aGlzIG1ldGhvZCAgPGJyLz5cbiAgICAgKiBJZiBhIGNsYXNzIHdhbnRzIHRvIGV4dGVuZCB0aGUgJ3JlbW92ZUNoaWxkJyBiZWhhdmlvciBpdCBvbmx5IG5lZWRzIDxici8+XG4gICAgICogdG8gb3ZlcnJpZGUgdGhpcyBtZXRob2QuXG4gICAgICogISN6aFxuICAgICAqIOenu+mZpOiKgueCueS4reaMh+WumueahOWtkOiKgueCue+8jOaYr+WQpumcgOimgea4heeQhuaJgOacieato+WcqOi/kOihjOeahOihjOS4uuWPluWGs+S6jiBjbGVhbnVwIOWPguaVsOOAgjxici8+XG4gICAgICog5aaC5p6cIGNsZWFudXAg5Y+C5pWw5LiN5Lyg5YWl77yM6buY6K6k5Li6IHRydWUg6KGo56S65riF55CG44CCPGJyLz5cbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNoaWxkXG4gICAgICogQHBhcmFtIHtOb2RlfSBjaGlsZCAtIFRoZSBjaGlsZCBub2RlIHdoaWNoIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgcnVubmluZyBhY3Rpb25zIGFuZCBjYWxsYmFja3Mgb24gdGhlIGNoaWxkIG5vZGUgd2lsbCBiZSBjbGVhbnVwLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBub2RlLnJlbW92ZUNoaWxkKG5ld05vZGUpO1xuICAgICAqIG5vZGUucmVtb3ZlQ2hpbGQobmV3Tm9kZSwgZmFsc2UpO1xuICAgICAqL1xuICAgIHJlbW92ZUNoaWxkIChjaGlsZCwgY2xlYW51cCkge1xuICAgICAgICBpZiAodGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkgPiAtMSkge1xuICAgICAgICAgICAgLy8gSWYgeW91IGRvbid0IGRvIGNsZWFudXAsIHRoZSBjaGlsZCdzIGFjdGlvbnMgd2lsbCBub3QgZ2V0IHJlbW92ZWQgYW5kIHRoZVxuICAgICAgICAgICAgaWYgKGNsZWFudXAgfHwgY2xlYW51cCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQuY2xlYW51cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaW52b2tlIHRoZSBwYXJlbnQgc2V0dGVyXG4gICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBjb250YWluZXIgYW5kIGRvIGEgY2xlYW51cCBhbGwgcnVubmluZyBhY3Rpb25zIGRlcGVuZGluZyBvbiB0aGUgY2xlYW51cCBwYXJhbWV0ZXIuIDxici8+XG4gICAgICogSWYgdGhlIGNsZWFudXAgcGFyYW1ldGVyIGlzIG5vdCBwYXNzZWQsIGl0IHdpbGwgZm9yY2UgYSBjbGVhbnVwLlxuICAgICAqICEjemhcbiAgICAgKiDnp7vpmaToioLngrnmiYDmnInnmoTlrZDoioLngrnvvIzmmK/lkKbpnIDopoHmuIXnkIbmiYDmnInmraPlnKjov5DooYznmoTooYzkuLrlj5blhrPkuo4gY2xlYW51cCDlj4LmlbDjgII8YnIvPlxuICAgICAqIOWmguaenCBjbGVhbnVwIOWPguaVsOS4jeS8oOWFpe+8jOm7mOiupOS4uiB0cnVlIOihqOekuua4heeQhuOAglxuICAgICAqIEBtZXRob2QgcmVtb3ZlQWxsQ2hpbGRyZW5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtjbGVhbnVwPXRydWVdIC0gdHJ1ZSBpZiBhbGwgcnVubmluZyBhY3Rpb25zIG9uIGFsbCBjaGlsZHJlbiBub2RlcyBzaG91bGQgYmUgY2xlYW51cCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuICAgICAqIG5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oZmFsc2UpO1xuICAgICAqL1xuICAgIHJlbW92ZUFsbENoaWxkcmVuIChjbGVhbnVwKSB7XG4gICAgICAgIC8vIG5vdCB1c2luZyBkZXRhY2hDaGlsZCBpbXByb3ZlcyBzcGVlZCBoZXJlXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuO1xuICAgICAgICBpZiAoY2xlYW51cCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY2xlYW51cCA9IHRydWU7XG4gICAgICAgIGZvciAodmFyIGkgPSBjaGlsZHJlbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgeW91IGRvbid0IGRvIGNsZWFudXAsIHRoZSBub2RlJ3MgYWN0aW9ucyB3aWxsIG5vdCBnZXQgcmVtb3ZlZCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgaWYgKGNsZWFudXApXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuY2xlYW51cCgpO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLmxlbmd0aCA9IDA7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gSXMgdGhpcyBub2RlIGEgY2hpbGQgb2YgdGhlIGdpdmVuIG5vZGU/XG4gICAgICogISN6aCDmmK/lkKbmmK/mjIflrproioLngrnnmoTlrZDoioLngrnvvJ9cbiAgICAgKiBAbWV0aG9kIGlzQ2hpbGRPZlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcGFyZW50XG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgdGhpcyBub2RlIGlzIGEgY2hpbGQsIGRlZXAgY2hpbGQgb3IgaWRlbnRpY2FsIHRvIHRoZSBnaXZlbiBub2RlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbm9kZS5pc0NoaWxkT2YobmV3Tm9kZSk7XG4gICAgICovXG4gICAgaXNDaGlsZE9mIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIGNoaWxkID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgaWYgKGNoaWxkID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuX3BhcmVudDtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoY2hpbGQpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIENPTVBPTkVOVFxuXG4gICAgLyoqXG4gICAgICogISNlblxuICAgICAqIFJldHVybnMgdGhlIGNvbXBvbmVudCBvZiBzdXBwbGllZCB0eXBlIGlmIHRoZSBub2RlIGhhcyBvbmUgYXR0YWNoZWQsIG51bGwgaWYgaXQgZG9lc24ndC48YnIvPlxuICAgICAqIFlvdSBjYW4gYWxzbyBnZXQgY29tcG9uZW50IGluIHRoZSBub2RlIGJ5IHBhc3NpbmcgaW4gdGhlIG5hbWUgb2YgdGhlIHNjcmlwdC5cbiAgICAgKiAhI3poXG4gICAgICog6I635Y+W6IqC54K55LiK5oyH5a6a57G75Z6L55qE57uE5Lu277yM5aaC5p6c6IqC54K55pyJ6ZmE5Yqg5oyH5a6a57G75Z6L55qE57uE5Lu277yM5YiZ6L+U5Zue77yM5aaC5p6c5rKh5pyJ5YiZ5Li656m644CCPGJyLz5cbiAgICAgKiDkvKDlhaXlj4LmlbDkuZ/lj6/ku6XmmK/ohJrmnKznmoTlkI3np7DjgIJcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBnZXQgc3ByaXRlIGNvbXBvbmVudFxuICAgICAqIHZhciBzcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAqIC8vIGdldCBjdXN0b20gdGVzdCBjbGFzc1xuICAgICAqIHZhciB0ZXN0ID0gbm9kZS5nZXRDb21wb25lbnQoXCJUZXN0XCIpO1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Q29tcG9uZW50PFQgZXh0ZW5kcyBDb21wb25lbnQ+KHR5cGU6IHtwcm90b3R5cGU6IFR9KTogVFxuICAgICAqIGdldENvbXBvbmVudChjbGFzc05hbWU6IHN0cmluZyk6IGFueVxuICAgICAqL1xuICAgIGdldENvbXBvbmVudCAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRDb21wb25lbnQodGhpcywgY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYWxsIGNvbXBvbmVudHMgb2Ygc3VwcGxpZWQgdHlwZSBpbiB0aGUgbm9kZS5cbiAgICAgKiAhI3poIOi/lOWbnuiKgueCueS4iuaMh+Wumuexu+Wei+eahOaJgOaciee7hOS7tuOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29tcG9uZW50c1xuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnRbXX1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzcHJpdGVzID0gbm9kZS5nZXRDb21wb25lbnRzKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3RzID0gbm9kZS5nZXRDb21wb25lbnRzKFwiVGVzdFwiKTtcbiAgICAgKiBAdHlwZXNjcmlwdFxuICAgICAqIGdldENvbXBvbmVudHM8VCBleHRlbmRzIENvbXBvbmVudD4odHlwZToge3Byb3RvdHlwZTogVH0pOiBUW11cbiAgICAgKiBnZXRDb21wb25lbnRzKGNsYXNzTmFtZTogc3RyaW5nKTogYW55W11cbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRzICh0eXBlT3JDbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gZ2V0Q29uc3RydWN0b3IodHlwZU9yQ2xhc3NOYW1lKSwgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBpZiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIGZpbmRDb21wb25lbnRzKHRoaXMsIGNvbnN0cnVjdG9yLCBjb21wb25lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50cztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogISNlbiBSZXR1cm5zIHRoZSBjb21wb25lbnQgb2Ygc3VwcGxpZWQgdHlwZSBpbiBhbnkgb2YgaXRzIGNoaWxkcmVuIHVzaW5nIGRlcHRoIGZpcnN0IHNlYXJjaC5cbiAgICAgKiAhI3poIOmAkuW9kuafpeaJvuaJgOacieWtkOiKgueCueS4reesrOS4gOS4quWMuemFjeaMh+Wumuexu+Wei+eahOe7hOS7tuOAglxuICAgICAqIEBtZXRob2QgZ2V0Q29tcG9uZW50SW5DaGlsZHJlblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgc3ByaXRlID0gbm9kZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIFRlc3QgPSBub2RlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oXCJUZXN0XCIpO1xuICAgICAqIEB0eXBlc2NyaXB0XG4gICAgICogZ2V0Q29tcG9uZW50SW5DaGlsZHJlbjxUIGV4dGVuZHMgQ29tcG9uZW50Pih0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFRcbiAgICAgKiBnZXRDb21wb25lbnRJbkNoaWxkcmVuKGNsYXNzTmFtZTogc3RyaW5nKTogYW55XG4gICAgICovXG4gICAgZ2V0Q29tcG9uZW50SW5DaGlsZHJlbiAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIGZpbmRDaGlsZENvbXBvbmVudCh0aGlzLl9jaGlsZHJlbiwgY29uc3RydWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuIFJldHVybnMgYWxsIGNvbXBvbmVudHMgb2Ygc3VwcGxpZWQgdHlwZSBpbiBzZWxmIG9yIGFueSBvZiBpdHMgY2hpbGRyZW4uXG4gICAgICogISN6aCDpgJLlvZLmn6Xmib7oh6rouqvmiJbmiYDmnInlrZDoioLngrnkuK3mjIflrprnsbvlnovnmoTnu4Tku7ZcbiAgICAgKiBAbWV0aG9kIGdldENvbXBvbmVudHNJbkNoaWxkcmVuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IHR5cGVPckNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0NvbXBvbmVudFtdfVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZXMgPSBub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3RzID0gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBnZXRDb21wb25lbnRzSW5DaGlsZHJlbjxUIGV4dGVuZHMgQ29tcG9uZW50Pih0eXBlOiB7cHJvdG90eXBlOiBUfSk6IFRbXVxuICAgICAqIGdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNsYXNzTmFtZTogc3RyaW5nKTogYW55W11cbiAgICAgKi9cbiAgICBnZXRDb21wb25lbnRzSW5DaGlsZHJlbiAodHlwZU9yQ2xhc3NOYW1lKSB7XG4gICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGdldENvbnN0cnVjdG9yKHR5cGVPckNsYXNzTmFtZSksIGNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgaWYgKGNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICBmaW5kQ29tcG9uZW50cyh0aGlzLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cyk7XG4gICAgICAgICAgICBmaW5kQ2hpbGRDb21wb25lbnRzKHRoaXMuX2NoaWxkcmVuLCBjb25zdHJ1Y3RvciwgY29tcG9uZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudHM7XG4gICAgfSxcblxuICAgIF9jaGVja011bHRpcGxlQ29tcDogKENDX0VESVRPUiB8fCBDQ19QUkVWSUVXKSAmJiBmdW5jdGlvbiAoY3Rvcikge1xuICAgICAgICB2YXIgZXhpc3RpbmcgPSB0aGlzLmdldENvbXBvbmVudChjdG9yLl9kaXNhbGxvd011bHRpcGxlKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmcuY29uc3RydWN0b3IgPT09IGN0b3IpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM4MDUsIGpzLmdldENsYXNzTmFtZShjdG9yKSwgdGhpcy5fbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcklEKDM4MDYsIGpzLmdldENsYXNzTmFtZShjdG9yKSwgdGhpcy5fbmFtZSwganMuZ2V0Q2xhc3NOYW1lKGV4aXN0aW5nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW4gQWRkcyBhIGNvbXBvbmVudCBjbGFzcyB0byB0aGUgbm9kZS4gWW91IGNhbiBhbHNvIGFkZCBjb21wb25lbnQgdG8gbm9kZSBieSBwYXNzaW5nIGluIHRoZSBuYW1lIG9mIHRoZSBzY3JpcHQuXG4gICAgICogISN6aCDlkJHoioLngrnmt7vliqDkuIDkuKrmjIflrprnsbvlnovnmoTnu4Tku7bnsbvvvIzkvaDov5jlj6/ku6XpgJrov4fkvKDlhaXohJrmnKznmoTlkI3np7DmnaXmt7vliqDnu4Tku7bjgIJcbiAgICAgKiBAbWV0aG9kIGFkZENvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSB0eXBlT3JDbGFzc05hbWUgLSBUaGUgY29uc3RydWN0b3Igb3IgdGhlIGNsYXNzIG5hbWUgb2YgdGhlIGNvbXBvbmVudCB0byBhZGRcbiAgICAgKiBAcmV0dXJuIHtDb21wb25lbnR9IC0gVGhlIG5ld2x5IGFkZGVkIGNvbXBvbmVudFxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogdmFyIHRlc3QgPSBub2RlLmFkZENvbXBvbmVudChcIlRlc3RcIik7XG4gICAgICogQHR5cGVzY3JpcHRcbiAgICAgKiBhZGRDb21wb25lbnQ8VCBleHRlbmRzIENvbXBvbmVudD4odHlwZToge25ldygpOiBUfSk6IFRcbiAgICAgKiBhZGRDb21wb25lbnQoY2xhc3NOYW1lOiBzdHJpbmcpOiBhbnlcbiAgICAgKi9cbiAgICBhZGRDb21wb25lbnQgKHR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpKSB7XG4gICAgICAgICAgICBjYy5lcnJvcignaXNEZXN0cm95aW5nJyk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBjb21wb25lbnRcblxuICAgICAgICB2YXIgY29uc3RydWN0b3I7XG4gICAgICAgIGlmICh0eXBlb2YgdHlwZU9yQ2xhc3NOYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc3RydWN0b3IgPSBqcy5nZXRDbGFzc0J5TmFtZSh0eXBlT3JDbGFzc05hbWUpO1xuICAgICAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwNywgdHlwZU9yQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoY2MuX1JGcGVlaygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwOCwgdHlwZU9yQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXR5cGVPckNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwNCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJ1Y3RvciA9IHR5cGVPckNsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGNvbXBvbmVudFxuXG4gICAgICAgIGlmICh0eXBlb2YgY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgwOSk7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWpzLmlzQ2hpbGRDbGFzc09mKGNvbnN0cnVjdG9yLCBjYy5Db21wb25lbnQpKSB7XG4gICAgICAgICAgICBjYy5lcnJvcklEKDM4MTApO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19QUkVWSUVXKSAmJiBjb25zdHJ1Y3Rvci5fZGlzYWxsb3dNdWx0aXBsZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9jaGVja011bHRpcGxlQ29tcChjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIHJlcXVpcmVtZW50XG5cbiAgICAgICAgdmFyIFJlcUNvbXAgPSBjb25zdHJ1Y3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgaWYgKFJlcUNvbXAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50KFJlcUNvbXApKSB7XG4gICAgICAgICAgICB2YXIgZGVwZW5kZWQgPSB0aGlzLmFkZENvbXBvbmVudChSZXFDb21wKTtcbiAgICAgICAgICAgIGlmICghZGVwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmQgY29uZmxpY3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8vIGNoZWNrIGNvbmZsaWN0XG4gICAgICAgIC8vXG4gICAgICAgIC8vaWYgKENDX0VESVRPUiAmJiAhX1NjZW5lLkRldGVjdENvbmZsaWN0LmJlZm9yZUFkZENvbXBvbmVudCh0aGlzLCBjb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgLy8gICAgcmV0dXJuIG51bGw7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vXG5cbiAgICAgICAgdmFyIGNvbXBvbmVudCA9IG5ldyBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb21wb25lbnQubm9kZSA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBpZiAoKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiBjYy5lbmdpbmUgJiYgKHRoaXMuX2lkIGluIGNjLmVuZ2luZS5hdHRhY2hlZE9ianNGb3JFZGl0b3IpKSB7XG4gICAgICAgICAgICBjYy5lbmdpbmUuYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXBvbmVudC5faWRdID0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX25vZGVBY3RpdmF0b3IuYWN0aXZhdGVDb21wKGNvbXBvbmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGFwaSBzaG91bGQgb25seSB1c2VkIGJ5IHVuZG8gc3lzdGVtXG4gICAgICogQG1ldGhvZCBfYWRkQ29tcG9uZW50QXRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZENvbXBvbmVudEF0OiBDQ19FRElUT1IgJiYgZnVuY3Rpb24gKGNvbXAsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcignaXNEZXN0cm95aW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoY29tcCBpbnN0YW5jZW9mIGNjLkNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYy5lcnJvcklEKDM4MTEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY2MuZXJyb3JJRCgzODEyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlY2hlY2sgYXR0cmlidXRlcyBiZWNhdXNlIHNjcmlwdCBtYXkgY2hhbmdlZFxuICAgICAgICB2YXIgY3RvciA9IGNvbXAuY29uc3RydWN0b3I7XG4gICAgICAgIGlmIChjdG9yLl9kaXNhbGxvd011bHRpcGxlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NoZWNrTXVsdGlwbGVDb21wKGN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBSZXFDb21wID0gY3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgaWYgKFJlcUNvbXAgJiYgIXRoaXMuZ2V0Q29tcG9uZW50KFJlcUNvbXApKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgY29tcCBzaG91bGQgYmUgbGFzdCBjb21wb25lbnQsIGluY3JlYXNlIHRoZSBpbmRleCBiZWNhdXNlIHJlcXVpcmVkIGNvbXBvbmVudCBhZGRlZFxuICAgICAgICAgICAgICAgICsraW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVwZW5kZWQgPSB0aGlzLmFkZENvbXBvbmVudChSZXFDb21wKTtcbiAgICAgICAgICAgIGlmICghZGVwZW5kZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmQgY29uZmxpY3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb21wLm5vZGUgPSB0aGlzO1xuICAgICAgICB0aGlzLl9jb21wb25lbnRzLnNwbGljZShpbmRleCwgMCwgY29tcCk7XG4gICAgICAgIGlmICgoQ0NfRURJVE9SIHx8IENDX1RFU1QpICYmIGNjLmVuZ2luZSAmJiAodGhpcy5faWQgaW4gY2MuZW5naW5lLmF0dGFjaGVkT2Jqc0ZvckVkaXRvcikpIHtcbiAgICAgICAgICAgIGNjLmVuZ2luZS5hdHRhY2hlZE9ianNGb3JFZGl0b3JbY29tcC5faWRdID0gY29tcDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkpIHtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLl9ub2RlQWN0aXZhdG9yLmFjdGl2YXRlQ29tcChjb21wKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiAhI2VuXG4gICAgICogUmVtb3ZlcyBhIGNvbXBvbmVudCBpZGVudGlmaWVkIGJ5IHRoZSBnaXZlbiBuYW1lIG9yIHJlbW92ZXMgdGhlIGNvbXBvbmVudCBvYmplY3QgZ2l2ZW4uXG4gICAgICogWW91IGNhbiBhbHNvIHVzZSBjb21wb25lbnQuZGVzdHJveSgpIGlmIHlvdSBhbHJlYWR5IGhhdmUgdGhlIHJlZmVyZW5jZS5cbiAgICAgKiAhI3poXG4gICAgICog5Yig6Zmk6IqC54K55LiK55qE5oyH5a6a57uE5Lu277yM5Lyg5YWl5Y+C5pWw5Y+v5Lul5piv5LiA5Liq57uE5Lu25p6E6YCg5Ye95pWw5oiW57uE5Lu25ZCN77yM5Lmf5Y+v5Lul5piv5bey57uP6I635b6X55qE57uE5Lu25byV55So44CCXG4gICAgICog5aaC5p6c5L2g5bey57uP6I635b6X57uE5Lu25byV55So77yM5L2g5Lmf5Y+v5Lul55u05o6l6LCD55SoIGNvbXBvbmVudC5kZXN0cm95KClcbiAgICAgKiBAbWV0aG9kIHJlbW92ZUNvbXBvbmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufENvbXBvbmVudH0gY29tcG9uZW50IC0gVGhlIG5lZWQgcmVtb3ZlIGNvbXBvbmVudC5cbiAgICAgKiBAZGVwcmVjYXRlZCBwbGVhc2UgZGVzdHJveSB0aGUgY29tcG9uZW50IHRvIHJlbW92ZSBpdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUucmVtb3ZlQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICogdmFyIFRlc3QgPSByZXF1aXJlKFwiVGVzdFwiKTtcbiAgICAgKiBub2RlLnJlbW92ZUNvbXBvbmVudChUZXN0KTtcbiAgICAgKi9cbiAgICByZW1vdmVDb21wb25lbnQgKGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoIWNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2MuZXJyb3JJRCgzODEzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIShjb21wb25lbnQgaW5zdGFuY2VvZiBjYy5Db21wb25lbnQpKSB7XG4gICAgICAgICAgICBjb21wb25lbnQgPSB0aGlzLmdldENvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBfZ2V0RGVwZW5kQ29tcG9uZW50XG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9IGRlcGVuZGVkXG4gICAgICogQHJldHVybiB7Q29tcG9uZW50fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldERlcGVuZENvbXBvbmVudDogQ0NfRURJVE9SICYmIGZ1bmN0aW9uIChkZXBlbmRlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb21wID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChjb21wICE9PSBkZXBlbmRlZCAmJiBjb21wLmlzVmFsaWQgJiYgIWNjLk9iamVjdC5fd2lsbERlc3Ryb3koY29tcCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVwZW5kID0gY29tcC5jb25zdHJ1Y3Rvci5fcmVxdWlyZUNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kICYmIGRlcGVuZGVkIGluc3RhbmNlb2YgZGVwZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuXG4gICAgLy8gZG8gcmVtb3ZlIGNvbXBvbmVudCwgb25seSB1c2VkIGludGVybmFsbHlcbiAgICBfcmVtb3ZlQ29tcG9uZW50IChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNjLmVycm9ySUQoMzgxNCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISh0aGlzLl9vYmpGbGFncyAmIERlc3Ryb3lpbmcpKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuX2NvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpO1xuICAgICAgICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKChDQ19FRElUT1IgfHwgQ0NfVEVTVCkgJiYgY2MuZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjYy5lbmdpbmUuYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXBvbmVudC5faWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbXBvbmVudC5ub2RlICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgY2MuZXJyb3JJRCgzODE1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgaWYgKGNjLk9iamVjdC5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqICEjZW5cbiAgICAgKiBEZXN0cm95IGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBub2RlLCBhbmQgcmVsZWFzZSBhbGwgdGhlaXIgb3duIHJlZmVyZW5jZXMgdG8gb3RoZXIgb2JqZWN0cy48YnIvPlxuICAgICAqIEFjdHVhbCBkZXN0cnVjdCBvcGVyYXRpb24gd2lsbCBkZWxheWVkIHVudGlsIGJlZm9yZSByZW5kZXJpbmcuXG4gICAgICogISN6aFxuICAgICAqIOmUgOavgeaJgOacieWtkOiKgueCue+8jOW5tumHiuaUvuaJgOacieWug+S7rOWvueWFtuWug+WvueixoeeahOW8leeUqOOAgjxici8+XG4gICAgICog5a6e6ZmF6ZSA5q+B5pON5L2c5Lya5bu26L+f5Yiw5b2T5YmN5bin5riy5p+T5YmN5omn6KGM44CCXG4gICAgICogQG1ldGhvZCBkZXN0cm95QWxsQ2hpbGRyZW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIG5vZGUuZGVzdHJveUFsbENoaWxkcmVuKCk7XG4gICAgICovXG4gICAgZGVzdHJveUFsbENoaWxkcmVuICgpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNoaWxkcmVuW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfb25TZXRQYXJlbnQgKHZhbHVlKSB7fSxcbiAgICBfb25Qb3N0QWN0aXZhdGVkICgpIHt9LFxuICAgIF9vbkJhdGNoUmVzdG9yZWQgKCkge30sXG4gICAgX29uQmF0Y2hDcmVhdGVkICgpIHt9LFxuXG4gICAgX29uSGllcmFyY2h5Q2hhbmdlZCAob2xkUGFyZW50KSB7XG4gICAgICAgIHZhciBuZXdQYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIGlmICh0aGlzLl9wZXJzaXN0Tm9kZSAmJiAhKG5ld1BhcmVudCBpbnN0YW5jZW9mIGNjLlNjZW5lKSkge1xuICAgICAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcyk7XG4gICAgICAgICAgICBpZiAoQ0NfRURJVE9SKSB7XG4gICAgICAgICAgICAgICAgY2Mud2FybklEKDE2MjMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKENDX0VESVRPUiB8fCBDQ19URVNUKSB7XG4gICAgICAgICAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpO1xuICAgICAgICAgICAgdmFyIGluQ3VycmVudFNjZW5lQmVmb3JlID0gb2xkUGFyZW50ICYmIG9sZFBhcmVudC5pc0NoaWxkT2Yoc2NlbmUpO1xuICAgICAgICAgICAgdmFyIGluQ3VycmVudFNjZW5lTm93ID0gbmV3UGFyZW50ICYmIG5ld1BhcmVudC5pc0NoaWxkT2Yoc2NlbmUpO1xuICAgICAgICAgICAgaWYgKCFpbkN1cnJlbnRTY2VuZUJlZm9yZSAmJiBpbkN1cnJlbnRTY2VuZU5vdykge1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaGVkXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZkF0dGFjaGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaW5DdXJyZW50U2NlbmVCZWZvcmUgJiYgIWluQ3VycmVudFNjZW5lTm93KSB7XG4gICAgICAgICAgICAgICAgLy8gZGV0YWNoZWRcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklmQXR0YWNoZWQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgcHJlZmFiXG4gICAgICAgICAgICB2YXIgbmV3UHJlZmFiUm9vdCA9IG5ld1BhcmVudCAmJiBuZXdQYXJlbnQuX3ByZWZhYiAmJiBuZXdQYXJlbnQuX3ByZWZhYi5yb290O1xuICAgICAgICAgICAgdmFyIG15UHJlZmFiSW5mbyA9IHRoaXMuX3ByZWZhYjtcbiAgICAgICAgICAgIHZhciBQcmVmYWJVdGlscyA9IEVkaXRvci5yZXF1aXJlKCdzY2VuZTovL3V0aWxzL3ByZWZhYicpO1xuICAgICAgICAgICAgaWYgKG15UHJlZmFiSW5mbykge1xuICAgICAgICAgICAgICAgIGlmIChuZXdQcmVmYWJSb290KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChteVByZWZhYkluZm8ucm9vdCAhPT0gbmV3UHJlZmFiUm9vdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15UHJlZmFiSW5mby5yb290ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmVzdCBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBteVByZWZhYkluZm8uZmlsZUlkIHx8IChteVByZWZhYkluZm8uZmlsZUlkID0gRWRpdG9yLlV0aWxzLlV1aWRVdGlscy51dWlkKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZWZhYlV0aWxzLmNoZWNrQ2lyY3VsYXJSZWZlcmVuY2UobXlQcmVmYWJJbmZvLnJvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHByZWZhYlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByZWZhYlV0aWxzLmxpbmtQcmVmYWIobmV3UHJlZmFiUm9vdC5fcHJlZmFiLmFzc2V0LCBuZXdQcmVmYWJSb290LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy5jaGVja0NpcmN1bGFyUmVmZXJlbmNlKG5ld1ByZWZhYlJvb3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG15UHJlZmFiSW5mby5yb290ID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5lc3RlZCBwcmVmYWIgdG8gcm9vdCBwcmVmYWJcbiAgICAgICAgICAgICAgICAgICAgbXlQcmVmYWJJbmZvLmZpbGVJZCA9ICcnOyAgIC8vIHJvb3QgcHJlZmFiIGRvZXNuJ3QgaGF2ZSBmaWxlSWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRldGFjaCBmcm9tIHByZWZhYlxuICAgICAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy51bmxpbmtQcmVmYWIodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3UHJlZmFiUm9vdCkge1xuICAgICAgICAgICAgICAgIC8vIGF0dGFjaCB0byBwcmVmYWJcbiAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy5saW5rUHJlZmFiKG5ld1ByZWZhYlJvb3QuX3ByZWZhYi5hc3NldCwgbmV3UHJlZmFiUm9vdCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgUHJlZmFiVXRpbHMuY2hlY2tDaXJjdWxhclJlZmVyZW5jZShuZXdQcmVmYWJSb290KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29uZmxpY3QgZGV0ZWN0aW9uXG4gICAgICAgICAgICBfU2NlbmUuRGV0ZWN0Q29uZmxpY3QuYWZ0ZXJBZGRDaGlsZCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzaG91bGRBY3RpdmVOb3cgPSB0aGlzLl9hY3RpdmUgJiYgISEobmV3UGFyZW50ICYmIG5ld1BhcmVudC5fYWN0aXZlSW5IaWVyYXJjaHkpO1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlSW5IaWVyYXJjaHkgIT09IHNob3VsZEFjdGl2ZU5vdykge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IuX25vZGVBY3RpdmF0b3IuYWN0aXZhdGVOb2RlKHRoaXMsIHNob3VsZEFjdGl2ZU5vdyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgX2luc3RhbnRpYXRlIChjbG9uZWQpIHtcbiAgICAgICAgaWYgKCFjbG9uZWQpIHtcbiAgICAgICAgICAgIGNsb25lZCA9IGNjLmluc3RhbnRpYXRlLl9jbG9uZSh0aGlzLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0aGlzUHJlZmFiSW5mbyA9IHRoaXMuX3ByZWZhYjtcbiAgICAgICAgaWYgKENDX0VESVRPUiAmJiB0aGlzUHJlZmFiSW5mbykge1xuICAgICAgICAgICAgaWYgKHRoaXMgIT09IHRoaXNQcmVmYWJJbmZvLnJvb3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgUHJlZmFiVXRpbHMgPSBFZGl0b3IucmVxdWlyZSgnc2NlbmU6Ly91dGlscy9wcmVmYWInKTtcbiAgICAgICAgICAgICAgICBQcmVmYWJVdGlscy51bmxpbmtQcmVmYWIoY2xvbmVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgc3luY2luZyA9IHRoaXNQcmVmYWJJbmZvICYmIHRoaXMgPT09IHRoaXNQcmVmYWJJbmZvLnJvb3QgJiYgdGhpc1ByZWZhYkluZm8uc3luYztcbiAgICAgICAgaWYgKHN5bmNpbmcpIHtcbiAgICAgICAgICAgIC8vaWYgKHRoaXNQcmVmYWJJbmZvLl9zeW5jZWQpIHtcbiAgICAgICAgICAgIC8vICAgIHJldHVybiBjbG9uZTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKENDX0VESVRPUiAmJiBjYy5lbmdpbmUuX2lzUGxheWluZykge1xuICAgICAgICAgICAgY2xvbmVkLl9uYW1lICs9ICcgKENsb25lKSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXNldCBhbmQgaW5pdFxuICAgICAgICBjbG9uZWQuX3BhcmVudCA9IG51bGw7XG4gICAgICAgIGNsb25lZC5fb25CYXRjaFJlc3RvcmVkKCk7XG5cbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9LFxuXG4gICAgX3JlZ2lzdGVySWZBdHRhY2hlZDogKENDX0VESVRPUiB8fCBDQ19URVNUKSAmJiBmdW5jdGlvbiAocmVnaXN0ZXIpIHtcbiAgICAgICAgdmFyIGF0dGFjaGVkT2Jqc0ZvckVkaXRvciA9IGNjLmVuZ2luZS5hdHRhY2hlZE9ianNGb3JFZGl0b3I7XG4gICAgICAgIGlmIChyZWdpc3Rlcikge1xuICAgICAgICAgICAgYXR0YWNoZWRPYmpzRm9yRWRpdG9yW3RoaXMuX2lkXSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcCA9IHRoaXMuX2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXAuX2lkXSA9IGNvbXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYy5lbmdpbmUuZW1pdCgnbm9kZS1hdHRhY2gtdG8tc2NlbmUnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNjLmVuZ2luZS5lbWl0KCdub2RlLWRldGFjaC1mcm9tLXNjZW5lJywgdGhpcyk7XG4gICAgICAgICAgICBkZWxldGUgYXR0YWNoZWRPYmpzRm9yRWRpdG9yW3RoaXMuX2lkXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBjb21wID0gdGhpcy5fY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgYXR0YWNoZWRPYmpzRm9yRWRpdG9yW2NvbXAuX2lkXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGNoaWxkLl9yZWdpc3RlcklmQXR0YWNoZWQocmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9vblByZURlc3Ryb3kgKCkge1xuICAgICAgICB2YXIgaSwgbGVuO1xuXG4gICAgICAgIC8vIG1hcmtlZCBhcyBkZXN0cm95aW5nXG4gICAgICAgIHRoaXMuX29iakZsYWdzIHw9IERlc3Ryb3lpbmc7XG5cbiAgICAgICAgLy8gZGV0YWNoIHNlbGYgYW5kIGNoaWxkcmVuIGZyb20gZWRpdG9yXG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIHZhciBkZXN0cm95QnlQYXJlbnQgPSBwYXJlbnQgJiYgKHBhcmVudC5fb2JqRmxhZ3MgJiBEZXN0cm95aW5nKTtcbiAgICAgICAgaWYgKCFkZXN0cm95QnlQYXJlbnQgJiYgKENDX0VESVRPUiB8fCBDQ19URVNUKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZkF0dGFjaGVkKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlc3Ryb3kgY2hpbGRyZW5cbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAvLyBkZXN0cm95IGltbWVkaWF0ZSBzbyBpdHMgX29uUHJlRGVzdHJveSBjYW4gYmUgY2FsbGVkXG4gICAgICAgICAgICBjaGlsZHJlbltpXS5fZGVzdHJveUltbWVkaWF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVzdHJveSBzZWxmIGNvbXBvbmVudHNcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdGhpcy5fY29tcG9uZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXMuX2NvbXBvbmVudHNbaV07XG4gICAgICAgICAgICAvLyBkZXN0cm95IGltbWVkaWF0ZSBzbyBpdHMgX29uUHJlRGVzdHJveSBjYW4gYmUgY2FsbGVkXG4gICAgICAgICAgICBjb21wb25lbnQuX2Rlc3Ryb3lJbW1lZGlhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBldmVudFRhcmdldHMgPSB0aGlzLl9fZXZlbnRUYXJnZXRzO1xuICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBldmVudFRhcmdldHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudFRhcmdldHNbaV07XG4gICAgICAgICAgICB0YXJnZXQgJiYgdGFyZ2V0LnRhcmdldE9mZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBldmVudFRhcmdldHMubGVuZ3RoID0gMDtcblxuICAgICAgICAvLyByZW1vdmUgZnJvbSBwZXJzaXN0XG4gICAgICAgIGlmICh0aGlzLl9wZXJzaXN0Tm9kZSkge1xuICAgICAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRlc3Ryb3lCeVBhcmVudCkge1xuICAgICAgICAgICAgLy8gcmVtb3ZlIGZyb20gcGFyZW50XG4gICAgICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkSW5kZXggPSBwYXJlbnQuX2NoaWxkcmVuLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICAgICAgcGFyZW50Ll9jaGlsZHJlbi5zcGxpY2UoY2hpbGRJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgcGFyZW50LmVtaXQgJiYgcGFyZW50LmVtaXQoJ2NoaWxkLXJlbW92ZWQnLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkZXN0cm95QnlQYXJlbnQ7XG4gICAgfSxcblxuICAgIG9uUmVzdG9yZTogQ0NfRURJVE9SICYmIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY2hlY2sgYWN0aXZpdHkgc3RhdGVcbiAgICAgICAgdmFyIHNob3VsZEFjdGl2ZU5vdyA9IHRoaXMuX2FjdGl2ZSAmJiAhISh0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50Ll9hY3RpdmVJbkhpZXJhcmNoeSk7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmVJbkhpZXJhcmNoeSAhPT0gc2hvdWxkQWN0aXZlTm93KSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5fbm9kZUFjdGl2YXRvci5hY3RpdmF0ZU5vZGUodGhpcywgc2hvdWxkQWN0aXZlTm93KTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcblxuQmFzZU5vZGUuaWRHZW5lcmF0ZXIgPSBpZEdlbmVyYXRlcjtcblxuLy8gRm9yIHdhbGtcbkJhc2VOb2RlLl9zdGFja3MgPSBbW11dO1xuQmFzZU5vZGUuX3N0YWNrSWQgPSAwO1xuXG5CYXNlTm9kZS5wcm90b3R5cGUuX29uUHJlRGVzdHJveUJhc2UgPSBCYXNlTm9kZS5wcm90b3R5cGUuX29uUHJlRGVzdHJveTtcbmlmIChDQ19FRElUT1IpIHtcbiAgICBCYXNlTm9kZS5wcm90b3R5cGUuX29uUHJlRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICB2YXIgZGVzdHJveUJ5UGFyZW50ID0gdGhpcy5fb25QcmVEZXN0cm95QmFzZSgpO1xuICAgICAgIGlmICghZGVzdHJveUJ5UGFyZW50KSB7XG4gICAgICAgICAgIC8vIGVuc3VyZSB0aGlzIG5vZGUgY2FuIHJlYXR0YWNoIHRvIHNjZW5lIGJ5IHVuZG8gc3lzdGVtXG4gICAgICAgICAgIC8vIChzaW11bGF0ZSBzb21lIGRlc3RydWN0IGxvZ2ljIHRvIG1ha2UgdW5kbyBzeXN0ZW0gd29yayBjb3JyZWN0bHkpXG4gICAgICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgfVxuICAgICAgIHJldHVybiBkZXN0cm95QnlQYXJlbnQ7XG4gICB9O1xufVxuXG5CYXNlTm9kZS5wcm90b3R5cGUuX29uSGllcmFyY2h5Q2hhbmdlZEJhc2UgPSBCYXNlTm9kZS5wcm90b3R5cGUuX29uSGllcmFyY2h5Q2hhbmdlZDtcblxuaWYoQ0NfRURJVE9SKSB7XG4gICAgQmFzZU5vZGUucHJvdG90eXBlLl9vblJlc3RvcmVCYXNlID0gQmFzZU5vZGUucHJvdG90eXBlLm9uUmVzdG9yZTtcbn1cblxuLy8gRGVmaW5lIHB1YmxpYyBnZXR0ZXIgYW5kIHNldHRlciBtZXRob2RzIHRvIGVuc3VyZSBhcGkgY29tcGF0aWJpbGl0eS5cbnZhciBTYW1lTmFtZUdldFNldHMgPSBbJ3BhcmVudCcsICduYW1lJywgJ2NoaWxkcmVuJywgJ2NoaWxkcmVuQ291bnQnLF07XG5taXNjLnByb3BlcnR5RGVmaW5lKEJhc2VOb2RlLCBTYW1lTmFtZUdldFNldHMsIHt9KTtcblxuaWYgKENDX0RFVikge1xuICAgIC8vIHByb21vdGUgZGVidWcgaW5mb1xuICAgIGpzLmdldChCYXNlTm9kZS5wcm90b3R5cGUsICcgSU5GTyAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXRoID0gJyc7XG4gICAgICAgIHZhciBub2RlID0gdGhpcztcbiAgICAgICAgd2hpbGUgKG5vZGUgJiYgIShub2RlIGluc3RhbmNlb2YgY2MuU2NlbmUpKSB7XG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHBhdGggPSBub2RlLm5hbWUgKyAnLycgKyBwYXRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGF0aCA9IG5vZGUubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGUgPSBub2RlLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICcsIHBhdGg6ICcgKyBwYXRoO1xuICAgIH0pO1xufVxuXG4vKipcbiAqICEjZW5cbiAqIE5vdGU6IFRoaXMgZXZlbnQgaXMgb25seSBlbWl0dGVkIGZyb20gdGhlIHRvcCBtb3N0IG5vZGUgd2hvc2UgYWN0aXZlIHZhbHVlIGRpZCBjaGFuZ2VkLFxuICogbm90IGluY2x1ZGluZyBpdHMgY2hpbGQgbm9kZXMuXG4gKiAhI3poXG4gKiDms6jmhI/vvJrmraToioLngrnmv4DmtLvml7bvvIzmraTkuovku7bku4Xku47mnIDpobbpg6jnmoToioLngrnlj5Hlh7rjgIJcbiAqIEBldmVudCBhY3RpdmUtaW4taGllcmFyY2h5LWNoYW5nZWRcbiAqIEBwYXJhbSB7RXZlbnQuRXZlbnRDdXN0b219IGV2ZW50XG4gKi9cblxuY2MuX0Jhc2VOb2RlID0gbW9kdWxlLmV4cG9ydHMgPSBCYXNlTm9kZTtcbiJdLCJzb3VyY2VSb290IjoiLyJ9