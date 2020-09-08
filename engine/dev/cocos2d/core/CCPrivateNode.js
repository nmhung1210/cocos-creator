
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/core/CCPrivateNode.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}/****************************************************************************
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
'use strict';

var Node = require('./CCNode');

var RenderFlow = require('./renderer/render-flow');

var HideInHierarchy = cc.Object.Flags.HideInHierarchy;
var LocalDirtyFlag = Node._LocalDirtyFlag;
var POSITION_ON = 1 << 0;
/**
 * !#en
 * Class of private entities in Cocos Creator scenes.<br/>
 * The PrivateNode is hidden in editor, and completely transparent to users.<br/>
 * It's normally used as Node's private content created by components in parent node.<br/>
 * So in theory private nodes are not children, they are part of the parent node.<br/>
 * Private node have two important characteristics:<br/>
 * 1. It has the minimum z index and cannot be modified, because they can't be displayed over real children.<br/>
 * 2. The positioning of private nodes is also special, they will consider the left bottom corner of the parent node's bounding box as the origin of local coordinates.<br/>
 *    In this way, they can be easily kept inside the bounding box.<br/>
 * Currently, it's used by RichText component and TileMap component.
 * !#zh
 * Cocos Creator 场景中的私有节点类。<br/>
 * 私有节点在编辑器中不可见，对用户透明。<br/>
 * 通常私有节点是被一些特殊的组件创建出来作为父节点的一部分而存在的，理论上来说，它们不是子节点，而是父节点的组成部分。<br/>
 * 私有节点有两个非常重要的特性：<br/>
 * 1. 它有着最小的渲染排序的 Z 轴深度，并且无法被更改，因为它们不能被显示在其他正常子节点之上。<br/>
 * 2. 它的定位也是特殊的，对于私有节点来说，父节点包围盒的左下角是它的局部坐标系原点，这个原点相当于父节点的位置减去它锚点的偏移。这样私有节点可以比较容易被控制在包围盒之中。<br/>
 * 目前在引擎中，RichText 和 TileMap 都有可能生成私有节点。
 * @class PrivateNode
 * @constructor
 * @param {String} name
 * @extends Node
 */

var PrivateNode = cc.Class({
  name: 'cc.PrivateNode',
  "extends": Node,
  properties: {
    x: {
      get: function get() {
        return this._originPos.x;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.x) {
          localPosition.x = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    y: {
      get: function get() {
        return this._originPos.y;
      },
      set: function set(value) {
        var localPosition = this._originPos;

        if (value !== localPosition.y) {
          localPosition.y = value;

          this._posDirty(true);
        }
      },
      override: true
    },
    zIndex: {
      get: function get() {
        return cc.macro.MIN_ZINDEX;
      },
      set: function set() {
        cc.warnID(1638);
      },
      override: true
    },
    showInEditor: {
      "default": false,
      editorOnly: true,
      override: true
    }
  },

  /**
   * @method constructor
   * @param {String} [name]
   */
  ctor: function ctor(name) {
    this._localZOrder = cc.macro.MIN_ZINDEX << 16;
    this._originPos = cc.v2();

    if (CC_EDITOR) {
      this._objFlags |= HideInHierarchy;
    }
  },
  _posDirty: function _posDirty(sendEvent) {
    this.setLocalDirty(LocalDirtyFlag.POSITION);
    !CC_NATIVERENDERER && (this._renderFlag |= RenderFlow.FLAG_TRANSFORM);

    if (sendEvent === true && this._eventMask & POSITION_ON) {
      this.emit(Node.EventType.POSITION_CHANGED);
    }
  },
  _updateLocalMatrix: function _updateLocalMatrix() {
    if (!this._localMatDirty) return;
    var parent = this.parent;

    if (parent) {
      // Position correction for transform calculation
      this._trs[0] = this._originPos.x - (parent._anchorPoint.x - 0.5) * parent._contentSize.width;
      this._trs[1] = this._originPos.y - (parent._anchorPoint.y - 0.5) * parent._contentSize.height;
    }

    this._super();
  },
  getPosition: function getPosition() {
    return new cc.Vec2(this._originPos);
  },
  setPosition: function setPosition(x, y) {
    if (y === undefined) {
      x = x.x;
      y = x.y;
    }

    var pos = this._originPos;

    if (pos.x === x && pos.y === y) {
      return;
    }

    pos.x = x;
    pos.y = y;

    this._posDirty(true);
  },
  setParent: function setParent(value) {
    var oldParent = this._parent;

    this._super(value);

    if (oldParent !== value) {
      if (oldParent) {
        oldParent.off(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }

      if (value) {
        value.on(Node.EventType.ANCHOR_CHANGED, this._posDirty, this);
      }
    }
  },
  // do not update order of arrival
  _updateOrderOfArrival: function _updateOrderOfArrival() {}
});
cc.js.getset(PrivateNode.prototype, "parent", PrivateNode.prototype.getParent, PrivateNode.prototype.setParent);
cc.js.getset(PrivateNode.prototype, "position", PrivateNode.prototype.getPosition, PrivateNode.prototype.setPosition);
cc.PrivateNode = module.exports = PrivateNode;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb3JlL0NDUHJpdmF0ZU5vZGUuanMiXSwibmFtZXMiOlsiTm9kZSIsInJlcXVpcmUiLCJSZW5kZXJGbG93IiwiSGlkZUluSGllcmFyY2h5IiwiY2MiLCJPYmplY3QiLCJGbGFncyIsIkxvY2FsRGlydHlGbGFnIiwiX0xvY2FsRGlydHlGbGFnIiwiUE9TSVRJT05fT04iLCJQcml2YXRlTm9kZSIsIkNsYXNzIiwibmFtZSIsInByb3BlcnRpZXMiLCJ4IiwiZ2V0IiwiX29yaWdpblBvcyIsInNldCIsInZhbHVlIiwibG9jYWxQb3NpdGlvbiIsIl9wb3NEaXJ0eSIsIm92ZXJyaWRlIiwieSIsInpJbmRleCIsIm1hY3JvIiwiTUlOX1pJTkRFWCIsIndhcm5JRCIsInNob3dJbkVkaXRvciIsImVkaXRvck9ubHkiLCJjdG9yIiwiX2xvY2FsWk9yZGVyIiwidjIiLCJDQ19FRElUT1IiLCJfb2JqRmxhZ3MiLCJzZW5kRXZlbnQiLCJzZXRMb2NhbERpcnR5IiwiUE9TSVRJT04iLCJDQ19OQVRJVkVSRU5ERVJFUiIsIl9yZW5kZXJGbGFnIiwiRkxBR19UUkFOU0ZPUk0iLCJfZXZlbnRNYXNrIiwiZW1pdCIsIkV2ZW50VHlwZSIsIlBPU0lUSU9OX0NIQU5HRUQiLCJfdXBkYXRlTG9jYWxNYXRyaXgiLCJfbG9jYWxNYXREaXJ0eSIsInBhcmVudCIsIl90cnMiLCJfYW5jaG9yUG9pbnQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsImhlaWdodCIsIl9zdXBlciIsImdldFBvc2l0aW9uIiwiVmVjMiIsInNldFBvc2l0aW9uIiwidW5kZWZpbmVkIiwicG9zIiwic2V0UGFyZW50Iiwib2xkUGFyZW50IiwiX3BhcmVudCIsIm9mZiIsIkFOQ0hPUl9DSEFOR0VEIiwib24iLCJfdXBkYXRlT3JkZXJPZkFycml2YWwiLCJqcyIsImdldHNldCIsInByb3RvdHlwZSIsImdldFBhcmVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7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RUFuRCxFQUFFLENBQUNNLFdBQUgsR0FBaUIyRCxNQUFNLENBQUNDLE9BQVAsR0FBaUI1RCxXQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IE5vZGUgPSByZXF1aXJlKCcuL0NDTm9kZScpO1xuY29uc3QgUmVuZGVyRmxvdyA9IHJlcXVpcmUoJy4vcmVuZGVyZXIvcmVuZGVyLWZsb3cnKTtcblxuY29uc3QgSGlkZUluSGllcmFyY2h5ID0gY2MuT2JqZWN0LkZsYWdzLkhpZGVJbkhpZXJhcmNoeTtcbmNvbnN0IExvY2FsRGlydHlGbGFnID0gTm9kZS5fTG9jYWxEaXJ0eUZsYWc7XG5jb25zdCBQT1NJVElPTl9PTiA9IDEgPDwgMDtcblxuLyoqXG4gKiAhI2VuXG4gKiBDbGFzcyBvZiBwcml2YXRlIGVudGl0aWVzIGluIENvY29zIENyZWF0b3Igc2NlbmVzLjxici8+XG4gKiBUaGUgUHJpdmF0ZU5vZGUgaXMgaGlkZGVuIGluIGVkaXRvciwgYW5kIGNvbXBsZXRlbHkgdHJhbnNwYXJlbnQgdG8gdXNlcnMuPGJyLz5cbiAqIEl0J3Mgbm9ybWFsbHkgdXNlZCBhcyBOb2RlJ3MgcHJpdmF0ZSBjb250ZW50IGNyZWF0ZWQgYnkgY29tcG9uZW50cyBpbiBwYXJlbnQgbm9kZS48YnIvPlxuICogU28gaW4gdGhlb3J5IHByaXZhdGUgbm9kZXMgYXJlIG5vdCBjaGlsZHJlbiwgdGhleSBhcmUgcGFydCBvZiB0aGUgcGFyZW50IG5vZGUuPGJyLz5cbiAqIFByaXZhdGUgbm9kZSBoYXZlIHR3byBpbXBvcnRhbnQgY2hhcmFjdGVyaXN0aWNzOjxici8+XG4gKiAxLiBJdCBoYXMgdGhlIG1pbmltdW0geiBpbmRleCBhbmQgY2Fubm90IGJlIG1vZGlmaWVkLCBiZWNhdXNlIHRoZXkgY2FuJ3QgYmUgZGlzcGxheWVkIG92ZXIgcmVhbCBjaGlsZHJlbi48YnIvPlxuICogMi4gVGhlIHBvc2l0aW9uaW5nIG9mIHByaXZhdGUgbm9kZXMgaXMgYWxzbyBzcGVjaWFsLCB0aGV5IHdpbGwgY29uc2lkZXIgdGhlIGxlZnQgYm90dG9tIGNvcm5lciBvZiB0aGUgcGFyZW50IG5vZGUncyBib3VuZGluZyBib3ggYXMgdGhlIG9yaWdpbiBvZiBsb2NhbCBjb29yZGluYXRlcy48YnIvPlxuICogICAgSW4gdGhpcyB3YXksIHRoZXkgY2FuIGJlIGVhc2lseSBrZXB0IGluc2lkZSB0aGUgYm91bmRpbmcgYm94Ljxici8+XG4gKiBDdXJyZW50bHksIGl0J3MgdXNlZCBieSBSaWNoVGV4dCBjb21wb25lbnQgYW5kIFRpbGVNYXAgY29tcG9uZW50LlxuICogISN6aFxuICogQ29jb3MgQ3JlYXRvciDlnLrmma/kuK3nmoTnp4HmnInoioLngrnnsbvjgII8YnIvPlxuICog56eB5pyJ6IqC54K55Zyo57yW6L6R5Zmo5Lit5LiN5Y+v6KeB77yM5a+555So5oi36YCP5piO44CCPGJyLz5cbiAqIOmAmuW4uOengeacieiKgueCueaYr+iiq+S4gOS6m+eJueauiueahOe7hOS7tuWIm+W7uuWHuuadpeS9nOS4uueItuiKgueCueeahOS4gOmDqOWIhuiAjOWtmOWcqOeahO+8jOeQhuiuuuS4iuadpeivtO+8jOWug+S7rOS4jeaYr+WtkOiKgueCue+8jOiAjOaYr+eItuiKgueCueeahOe7hOaIkOmDqOWIhuOAgjxici8+XG4gKiDnp4HmnInoioLngrnmnInkuKTkuKrpnZ7luLjph43opoHnmoTnibnmgKfvvJo8YnIvPlxuICogMS4g5a6D5pyJ552A5pyA5bCP55qE5riy5p+T5o6S5bqP55qEIFog6L205rex5bqm77yM5bm25LiU5peg5rOV6KKr5pu05pS577yM5Zug5Li65a6D5Lus5LiN6IO96KKr5pi+56S65Zyo5YW25LuW5q2j5bi45a2Q6IqC54K55LmL5LiK44CCPGJyLz5cbiAqIDIuIOWug+eahOWumuS9jeS5n+aYr+eJueauiueahO+8jOWvueS6juengeacieiKgueCueadpeivtO+8jOeItuiKgueCueWMheWbtOebkueahOW3puS4i+inkuaYr+Wug+eahOWxgOmDqOWdkOagh+ezu+WOn+eCue+8jOi/meS4quWOn+eCueebuOW9k+S6jueItuiKgueCueeahOS9jee9ruWHj+WOu+Wug+mUmueCueeahOWBj+enu+OAgui/meagt+engeacieiKgueCueWPr+S7peavlOi+g+WuueaYk+iiq+aOp+WItuWcqOWMheWbtOebkuS5i+S4reOAgjxici8+XG4gKiDnm67liY3lnKjlvJXmk47kuK3vvIxSaWNoVGV4dCDlkowgVGlsZU1hcCDpg73mnInlj6/og73nlJ/miJDnp4HmnInoioLngrnjgIJcbiAqIEBjbGFzcyBQcml2YXRlTm9kZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQGV4dGVuZHMgTm9kZVxuICovXG5sZXQgUHJpdmF0ZU5vZGUgPSBjYy5DbGFzcyh7XG4gICAgbmFtZTogJ2NjLlByaXZhdGVOb2RlJyxcbiAgICBleHRlbmRzOiBOb2RlLFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5Qb3MueDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsUG9zaXRpb24gPSB0aGlzLl9vcmlnaW5Qb3M7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBsb2NhbFBvc2l0aW9uLngpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi54ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc0RpcnR5KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB5OiB7XG4gICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vcmlnaW5Qb3MueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsUG9zaXRpb24gPSB0aGlzLl9vcmlnaW5Qb3M7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBsb2NhbFBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi55ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Bvc0RpcnR5KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB6SW5kZXg6IHtcbiAgICAgICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNjLm1hY3JvLk1JTl9aSU5ERVg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0ICgpIHtcbiAgICAgICAgICAgICAgICBjYy53YXJuSUQoMTYzOCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlcnJpZGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0luRWRpdG9yOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGVkaXRvck9ubHk6IHRydWUsXG4gICAgICAgICAgICBvdmVycmlkZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gW25hbWVdXG4gICAgICovXG4gICAgY3RvciAobmFtZSkge1xuICAgICAgICB0aGlzLl9sb2NhbFpPcmRlciA9IGNjLm1hY3JvLk1JTl9aSU5ERVggPDwgMTY7XG4gICAgICAgIHRoaXMuX29yaWdpblBvcyA9IGNjLnYyKCk7XG4gICAgICAgIGlmIChDQ19FRElUT1IpIHtcbiAgICAgICAgICAgIHRoaXMuX29iakZsYWdzIHw9IEhpZGVJbkhpZXJhcmNoeTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBfcG9zRGlydHkgKHNlbmRFdmVudCkge1xuICAgICAgICB0aGlzLnNldExvY2FsRGlydHkoTG9jYWxEaXJ0eUZsYWcuUE9TSVRJT04pO1xuICAgICAgICAhQ0NfTkFUSVZFUkVOREVSRVIgJiYgKHRoaXMuX3JlbmRlckZsYWcgfD0gUmVuZGVyRmxvdy5GTEFHX1RSQU5TRk9STSk7XG4gICAgICAgIGlmIChzZW5kRXZlbnQgPT09IHRydWUgJiYgKHRoaXMuX2V2ZW50TWFzayAmIFBPU0lUSU9OX09OKSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KE5vZGUuRXZlbnRUeXBlLlBPU0lUSU9OX0NIQU5HRUQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF91cGRhdGVMb2NhbE1hdHJpeCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbE1hdERpcnR5KSByZXR1cm47XG5cbiAgICAgICAgbGV0IHBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICAvLyBQb3NpdGlvbiBjb3JyZWN0aW9uIGZvciB0cmFuc2Zvcm0gY2FsY3VsYXRpb25cbiAgICAgICAgICAgIHRoaXMuX3Ryc1swXSA9IHRoaXMuX29yaWdpblBvcy54IC0gKHBhcmVudC5fYW5jaG9yUG9pbnQueCAtIDAuNSkgKiBwYXJlbnQuX2NvbnRlbnRTaXplLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5fdHJzWzFdID0gdGhpcy5fb3JpZ2luUG9zLnkgLSAocGFyZW50Ll9hbmNob3JQb2ludC55IC0gMC41KSAqIHBhcmVudC5fY29udGVudFNpemUuaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICB9LFxuXG4gICAgZ2V0UG9zaXRpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IGNjLlZlYzIodGhpcy5fb3JpZ2luUG9zKTtcbiAgICB9LFxuXG4gICAgc2V0UG9zaXRpb24gKHgsIHkpIHtcbiAgICAgICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgeCA9IHgueDtcbiAgICAgICAgICAgIHkgPSB4Lnk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcG9zID0gdGhpcy5fb3JpZ2luUG9zO1xuICAgICAgICBpZiAocG9zLnggPT09IHggJiYgcG9zLnkgPT09IHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwb3MueCA9IHg7XG4gICAgICAgIHBvcy55ID0geTtcbiAgICAgICAgdGhpcy5fcG9zRGlydHkodHJ1ZSk7XG4gICAgfSxcblxuICAgIHNldFBhcmVudCh2YWx1ZSkge1xuICAgICAgICBsZXQgb2xkUGFyZW50ID0gdGhpcy5fcGFyZW50O1xuICAgICAgICB0aGlzLl9zdXBlcih2YWx1ZSk7XG4gICAgICAgIGlmIChvbGRQYXJlbnQgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAob2xkUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgb2xkUGFyZW50Lm9mZihOb2RlLkV2ZW50VHlwZS5BTkNIT1JfQ0hBTkdFRCwgdGhpcy5fcG9zRGlydHksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUub24oTm9kZS5FdmVudFR5cGUuQU5DSE9SX0NIQU5HRUQsIHRoaXMuX3Bvc0RpcnR5LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBkbyBub3QgdXBkYXRlIG9yZGVyIG9mIGFycml2YWxcbiAgICBfdXBkYXRlT3JkZXJPZkFycml2YWwoKSB7fSxcbn0pO1xuXG5jYy5qcy5nZXRzZXQoUHJpdmF0ZU5vZGUucHJvdG90eXBlLCBcInBhcmVudFwiLCBQcml2YXRlTm9kZS5wcm90b3R5cGUuZ2V0UGFyZW50LCBQcml2YXRlTm9kZS5wcm90b3R5cGUuc2V0UGFyZW50KTtcbmNjLmpzLmdldHNldChQcml2YXRlTm9kZS5wcm90b3R5cGUsIFwicG9zaXRpb25cIiwgUHJpdmF0ZU5vZGUucHJvdG90eXBlLmdldFBvc2l0aW9uLCBQcml2YXRlTm9kZS5wcm90b3R5cGUuc2V0UG9zaXRpb24pO1xuXG5jYy5Qcml2YXRlTm9kZSA9IG1vZHVsZS5leHBvcnRzID0gUHJpdmF0ZU5vZGU7XG4iXSwic291cmNlUm9vdCI6Ii8ifQ==